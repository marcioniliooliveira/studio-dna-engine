# Milestone 2 Exploration Report: SQLite Engine & Relational Schema Blueprint

## 1. Observation

### 1.1 Runtime Environment & Native `node:sqlite` Capabilities
- **Runtime Version (`observed`)**: Node.js `v24.15.0` (executed `node -v`).
- **Module Structure (`observed`)**: `require('node:sqlite')` exports:
  - Classes: `DatabaseSync`, `StatementSync`, `Session`
  - Utilities: `constants`, `backup`
- **`DatabaseSync.prototype` Methods (`observed`)**:
  - `open`, `close`, `prepare`, `exec`, `function`, `createTagStore`, `location`, `aggregate`, `createSession`, `applyChangeset`, `enableLoadExtension`, `enableDefensive`, `loadExtension`, `setAuthorizer`
  - Notably, `DatabaseSync` does *not* provide a built-in `transaction(fn)` wrapper method.
- **`StatementSync.prototype` Methods (`observed`)**:
  - `iterate`, `all`, `get`, `run`, `columns`, `setAllowBareNamedParameters`, `setAllowUnknownNamedParameters`, `setReadBigInts`, `setReturnArrays`
  - `stmt.run(...params)` returns `{ changes: number, lastInsertRowid: number | bigint }`.
  - `stmt.get(...params)` returns `[Object: null prototype]` or `undefined` when no record matches.
  - `stmt.all(...params)` returns an array of objects `[ [Object: null prototype], ... ]`.
  - Prepared statements are reusable across multiple queries. Calling `stmt.run()` after `db.close()` throws `Error: statement has been finalized` with code `ERR_SQLITE_ERROR`.
- **File System Prerequisite (`observed`)**: When calling `new DatabaseSync(filePath)` where the directory of `filePath` does not exist, SQLite throws `Error: unable to open database file`. The parent directory must be recursively created beforehand (`fs.mkdirSync(dir, { recursive: true })`).

### 1.2 PRAGMA Behavior (`observed`)
- **WAL Mode**:
  - Disk DB: `PRAGMA journal_mode = WAL;` returns `{ journal_mode: 'wal' }` and creates `.db-wal` and `.db-shm` companion files.
  - In-Memory DB (`:memory:`): `PRAGMA journal_mode = WAL;` returns `{ journal_mode: 'memory' }`.
- **Busy Timeout**:
  - `PRAGMA busy_timeout = 5000;` returns `{ timeout: 5000 }`.
  - In concurrent asynchronous write load (50 parallel writes), `busy_timeout = 5000` prevents `SQLITE_BUSY` errors (`TC-R3-T2-01`).
- **Foreign Keys**:
  - SQLite disables foreign key constraints by default (`PRAGMA foreign_keys` returns `{ foreign_keys: 0 }`).
  - Running `PRAGMA foreign_keys = ON;` returns `{ foreign_keys: 1 }`.
  - `ON DELETE SET NULL` on `analysis_runs.siteId` nullifies the foreign key when the parent site in `sites` is deleted.
  - `ON DELETE CASCADE` on `quality_audits.runId` automatically deletes child audits when an analysis run in `analysis_runs` is deleted.
- **Performance Pragmas**:
  - `PRAGMA synchronous = NORMAL;`, `PRAGMA temp_store = MEMORY;`, and `PRAGMA cache_size = -64000;` execute cleanly without syntax or operational errors in Node 24.

### 1.3 Harness & Test Suite Contracts
- **Test File Locations (`documented`)**:
  - `test/e2e/r1-r5-harness.js`: Lines 161–241 define `ReferenceSqliteEngine` contract.
  - `test/e2e/r1-r5-harness.js`: Lines 450–463 define dynamic resolver:
    ```javascript
    function resolveSqliteEngine(options = {}) {
      const candidatePath = path.join(PROJECT_ROOT, 'src/persistence/sqlite-engine.js');
      if (fs.existsSync(candidatePath)) {
        try {
          const CandidateEngine = require(candidatePath);
          const EngineClass = CandidateEngine.SqliteEngine || CandidateEngine;
          if (typeof EngineClass === 'function') {
            return new EngineClass(options);
          }
        } catch (_) {}
      }
      return new ReferenceSqliteEngine(options);
    }
    ```
  - `test/e2e/r1-r5-tier1-feature-coverage.test.js`:
    - `TC-R3-T1-01`: Asserts existence of tables `analysis_runs`, `quality_audits`, `file_catalog`, and `sites`.
    - `TC-R3-T1-02`: Asserts `sqlite.db.prepare(...).run()`, `.get()`, and `.all()`.
  - `test/e2e/r1-r5-tier2-boundary-corner.test.js`:
    - `TC-R3-T2-01`: Asserts 50 concurrent writes via `sqlite.db.prepare(...).run()`.
    - `TC-R3-T2-02`: Asserts SQL injection immunity via prepared statements (`' OR '1'='1' --`).
    - `TC-R3-T2-04`: Asserts duplicate primary key insertion throws `/UNIQUE constraint failed|PRIMARY KEY/`.
  - `test/e2e/r1-r5-tier3-pairwise-combinations.test.js`:
    - `TC-R3-T3-01`: Asserts file persistence across separate engine connections (`sqliteReopen`).

---

## 2. Logic Chain

1. **Contract Interoperability (`inferred`)**:
   - `test/e2e/r1-r5-harness.js` checks for `src/persistence/sqlite-engine.js`.
   - The tests interact directly with `sqlite.db.prepare(...)` as well as lifecycle methods (`init()`, `close()`).
   - Therefore, `SqliteEngine` must expose the underlying `DatabaseSync` instance as `this.db`, and must export both `{ SqliteEngine }` and default `module.exports = SqliteEngine`.

2. **Schema & Index Invariant Matching (`inferred`)**:
   - `TC-R3-T1-01` verifies 4 tables in `sqlite_master`: `sites`, `analysis_runs`, `quality_audits`, and `file_catalog`.
   - Indexes explicitly defined in `r1-r5-harness.js` are:
     - `idx_runs_slug` on `analysis_runs(siteSlug)`
     - `idx_runs_status` on `analysis_runs(status)`
     - `idx_audits_runId` on `quality_audits(runId)`
     - `idx_files_slug` on `file_catalog(siteSlug)`
   - Additional performance indexes (`idx_runs_created` for sorting/pagination, `idx_audits_slug` for per-client queries, and `idx_files_path` for file lookups) provide optimization without breaking any contract.

3. **Transaction Architecture (`inferred`)**:
   - Because `node:sqlite` lacks a built-in transaction helper and disallows nested `BEGIN` statements (`cannot start a transaction within a transaction`), a robust engine implementation must manage transaction depth.
   - Using `BEGIN IMMEDIATE` at depth 0 avoids concurrent write lock upgrade deadlocks.
   - Using `SAVEPOINT sp_<depth>` at depth > 0 enables true nested transaction rollbacks.
   - Supporting both synchronous functions and Promise-returning functions allows safe usage in async repositories (`HybridRepository`).

4. **Lifecycle & Statement Caching (`inferred`)**:
   - Re-compiling SQL strings repeatedly on high-traffic REST endpoints (`/api/v3/runs`, `/api/v3/analytics/kpi`) introduces unnecessary overhead.
   - An internal statement cache (`Map<string, StatementSync>`) speeds up queries while ensuring all statements are cleared upon `close()`.

---

## 3. Caveats

- **Active Tests Status (`documented`)**: Currently, all 27 tests across Tier 1 through Tier 4 pass because the test harness falls back to `ReferenceSqliteEngine`. When `src/persistence/sqlite-engine.js` is created, it will immediately supersede the reference engine.
- **Node.js Native SQLite Stability (`documented`)**: `node:sqlite` is stable in Node 24.15.0 and zero external packages (`better-sqlite3`, `sqlite3`) are required or should be installed.
- **Read-Only Explorer Scope (`documented`)**: This report does not modify production code in `src/`. The complete blueprint below is ready for implementation by the builder/worker assigned to Milestone 2.

---

## 4. Conclusion & Concrete Blueprint

### 4.1 Schema DDL Specification

```sql
-- Table 1: sites (indexed clients and scrape targets)
CREATE TABLE IF NOT EXISTS sites (
  id TEXT PRIMARY KEY,
  domain TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

-- Table 2: analysis_runs (execution tracking, cost, tokens, and document links)
CREATE TABLE IF NOT EXISTS analysis_runs (
  id TEXT PRIMARY KEY,
  siteId TEXT,
  siteSlug TEXT NOT NULL,
  targetUrl TEXT NOT NULL,
  mode TEXT NOT NULL,
  model TEXT,
  status TEXT NOT NULL,
  outputTokens INTEGER DEFAULT 0,
  costUsd REAL DEFAULT 0.0,
  artifactHash TEXT,
  documentRef TEXT,
  createdAt TEXT NOT NULL,
  completedAt TEXT,
  FOREIGN KEY(siteId) REFERENCES sites(id) ON DELETE SET NULL
);

-- Table 3: quality_audits (multi-factor audit scores, radar metrics, and reports)
CREATE TABLE IF NOT EXISTS quality_audits (
  id TEXT PRIMARY KEY,
  runId TEXT NOT NULL,
  siteSlug TEXT NOT NULL,
  auditType TEXT NOT NULL,
  passed INTEGER NOT NULL,
  score REAL NOT NULL,
  metricsJson TEXT NOT NULL,
  rawReportRef TEXT,
  createdAt TEXT NOT NULL,
  FOREIGN KEY(runId) REFERENCES analysis_runs(id) ON DELETE CASCADE
);

-- Table 4: file_catalog (file inventory with sha256 and byte sizes)
CREATE TABLE IF NOT EXISTS file_catalog (
  id TEXT PRIMARY KEY,
  siteSlug TEXT NOT NULL,
  relativePath TEXT NOT NULL,
  fileType TEXT NOT NULL,
  sizeBytes INTEGER NOT NULL,
  sha256 TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

-- Required Performance Indexes
CREATE INDEX IF NOT EXISTS idx_runs_slug ON analysis_runs(siteSlug);
CREATE INDEX IF NOT EXISTS idx_runs_status ON analysis_runs(status);
CREATE INDEX IF NOT EXISTS idx_audits_runId ON quality_audits(runId);
CREATE INDEX IF NOT EXISTS idx_files_slug ON file_catalog(siteSlug);

-- Recommended Optimization Indexes
CREATE INDEX IF NOT EXISTS idx_runs_created ON analysis_runs(createdAt DESC);
CREATE INDEX IF NOT EXISTS idx_audits_slug ON quality_audits(siteSlug);
CREATE INDEX IF NOT EXISTS idx_files_path ON file_catalog(relativePath);
```

### 4.2 Proposed Implementation for `src/persistence/sqlite-engine.js`

```javascript
/**
 * src/persistence/sqlite-engine.js
 * 
 * Native SQLite Relational Persistence Engine.
 * Built with Node 24 native `node:sqlite` (DatabaseSync).
 * Supports WAL mode, foreign keys, busy timeout, prepared statement caching,
 * and nested transaction management via savepoints.
 * 
 * Conforms strictly to ORIGINAL_REQUEST.md and PROJECT.md (Requirement R3, Feature F05).
 */

'use strict';

const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const DEFAULT_DB_PATH = process.env.STUDIO_DNA_DB || path.join(PROJECT_ROOT, 'data/studio_dna.db');

class SqliteEngine {
  /**
   * @param {Object} [options]
   * @param {string} [options.dbPath] - Database path (':memory:' or filesystem path)
   * @param {number} [options.busyTimeout] - Busy timeout in ms (default: 5000)
   */
  constructor(options = {}) {
    this.dbPath = options.dbPath !== undefined ? options.dbPath : DEFAULT_DB_PATH;
    this.busyTimeout = Number(options.busyTimeout) || 5000;
    this.db = null;
    this.isInitialized = false;
    this._statements = new Map();
    this._txDepth = 0;
  }

  /**
   * Initializes database connection, pragmas, schema DDL, and indexes.
   * Idempotent: safe to call multiple times.
   * @returns {SqliteEngine} this instance
   */
  init() {
    if (this.isInitialized && this.db) {
      return this;
    }

    // Ensure parent directory exists for file-based databases
    const isMemory = this.dbPath === ':memory:' || this.dbPath.startsWith('file::memory:');
    if (!isMemory) {
      const targetDir = path.dirname(path.resolve(this.dbPath));
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
    }

    this.db = new DatabaseSync(this.dbPath);

    // Apply PRAGMAs
    if (!isMemory) {
      this.db.exec('PRAGMA journal_mode = WAL;');
    }
    this.db.exec(`PRAGMA busy_timeout = ${this.busyTimeout};`);
    this.db.exec('PRAGMA foreign_keys = ON;');
    this.db.exec('PRAGMA synchronous = NORMAL;');
    this.db.exec('PRAGMA temp_store = MEMORY;');
    this.db.exec('PRAGMA cache_size = -64000;');

    // Apply Schema DDL
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sites (
        id TEXT PRIMARY KEY,
        domain TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS analysis_runs (
        id TEXT PRIMARY KEY,
        siteId TEXT,
        siteSlug TEXT NOT NULL,
        targetUrl TEXT NOT NULL,
        mode TEXT NOT NULL,
        model TEXT,
        status TEXT NOT NULL,
        outputTokens INTEGER DEFAULT 0,
        costUsd REAL DEFAULT 0.0,
        artifactHash TEXT,
        documentRef TEXT,
        createdAt TEXT NOT NULL,
        completedAt TEXT,
        FOREIGN KEY(siteId) REFERENCES sites(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS quality_audits (
        id TEXT PRIMARY KEY,
        runId TEXT NOT NULL,
        siteSlug TEXT NOT NULL,
        auditType TEXT NOT NULL,
        passed INTEGER NOT NULL,
        score REAL NOT NULL,
        metricsJson TEXT NOT NULL,
        rawReportRef TEXT,
        createdAt TEXT NOT NULL,
        FOREIGN KEY(runId) REFERENCES analysis_runs(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS file_catalog (
        id TEXT PRIMARY KEY,
        siteSlug TEXT NOT NULL,
        relativePath TEXT NOT NULL,
        fileType TEXT NOT NULL,
        sizeBytes INTEGER NOT NULL,
        sha256 TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_runs_slug ON analysis_runs(siteSlug);
      CREATE INDEX IF NOT EXISTS idx_runs_status ON analysis_runs(status);
      CREATE INDEX IF NOT EXISTS idx_audits_runId ON quality_audits(runId);
      CREATE INDEX IF NOT EXISTS idx_files_slug ON file_catalog(siteSlug);
      CREATE INDEX IF NOT EXISTS idx_runs_created ON analysis_runs(createdAt DESC);
      CREATE INDEX IF NOT EXISTS idx_audits_slug ON quality_audits(siteSlug);
      CREATE INDEX IF NOT EXISTS idx_files_path ON file_catalog(relativePath);
    `);

    this.isInitialized = true;
    return this;
  }

  _assertOpen() {
    if (!this.db) {
      throw new Error('Database is not initialized or has been closed. Call init() first.');
    }
  }

  /**
   * Prepares and caches an SQL statement.
   * @param {string} sql
   * @returns {import('node:sqlite').StatementSync}
   */
  prepare(sql) {
    this._assertOpen();
    let stmt = this._statements.get(sql);
    if (!stmt) {
      stmt = this.db.prepare(sql);
      this._statements.set(sql, stmt);
    }
    return stmt;
  }

  /**
   * Executes arbitrary SQL string without parameters.
   * @param {string} sql
   */
  exec(sql) {
    this._assertOpen();
    return this.db.exec(sql);
  }

  /**
   * Executes a prepared statement with parameters (INSERT/UPDATE/DELETE).
   * @param {string} sql
   * @param  {...any} params
   * @returns {{ changes: number, lastInsertRowid: number | bigint }}
   */
  run(sql, ...params) {
    return this.prepare(sql).run(...params);
  }

  /**
   * Fetches the first matching row.
   * @param {string} sql
   * @param  {...any} params
   * @returns {Object|undefined}
   */
  get(sql, ...params) {
    return this.prepare(sql).get(...params);
  }

  /**
   * Fetches all matching rows.
   * @param {string} sql
   * @param  {...any} params
   * @returns {Array<Object>}
   */
  all(sql, ...params) {
    return this.prepare(sql).all(...params);
  }

  /**
   * Executes fn inside an immediate transaction or nested savepoint.
   * Supports both synchronous functions and async Promise-returning functions.
   * @param {Function} fn
   * @returns {any} Result of fn
   */
  transaction(fn) {
    this._assertOpen();
    const currentDepth = this._txDepth;
    this._txDepth++;
    const spName = `sp_${currentDepth}`;

    if (currentDepth === 0) {
      this.db.exec('BEGIN IMMEDIATE');
    } else {
      this.db.exec(`SAVEPOINT ${spName}`);
    }

    try {
      const res = fn();
      if (res && typeof res.then === 'function') {
        return res.then(
          val => {
            if (currentDepth === 0) this.db.exec('COMMIT');
            else this.db.exec(`RELEASE ${spName}`);
            return val;
          },
          err => {
            if (currentDepth === 0) this.db.exec('ROLLBACK');
            else this.db.exec(`ROLLBACK TO ${spName}`);
            throw err;
          }
        ).finally(() => {
          this._txDepth--;
        });
      }

      if (currentDepth === 0) {
        this.db.exec('COMMIT');
      } else {
        this.db.exec(`RELEASE ${spName}`);
      }
      this._txDepth--;
      return res;
    } catch (err) {
      if (currentDepth === 0) {
        this.db.exec('ROLLBACK');
      } else {
        this.db.exec(`ROLLBACK TO ${spName}`);
      }
      this._txDepth--;
      throw err;
    }
  }

  /**
   * Closes the database and finalizes cached statements.
   */
  close() {
    this._statements.clear();
    if (this.db) {
      this.db.close();
      this.db = null;
    }
    this.isInitialized = false;
  }

  get isOpen() {
    return Boolean(this.db);
  }
}

module.exports = { SqliteEngine };
module.exports.SqliteEngine = SqliteEngine;
```

---

## 5. Verification Method

### 5.1 Independent Test Commands
1. **Local Blueprint Simulation**:
   ```powershell
   node .agents/teamwork/explorer_m2_1/test-sqlite-engine-blueprint.js
   ```
   *Expected Result*: All 7 test phases pass (in-memory DDL, CRUD, sync transactions, async transactions, cascade/set null foreign keys, direct `db` property compatibility, and file-based WAL re-open).
2. **Tier 1 Feature Coverage Test**:
   ```powershell
   node --test test/e2e/r1-r5-tier1-feature-coverage.test.js
   ```
   *Expected Result*: 27 passed, 0 failed.
3. **Tier 2 Boundary & Concurrency Test**:
   ```powershell
   node --test test/e2e/r1-r5-tier2-boundary-corner.test.js
   ```
   *Expected Result*: 50 concurrent writes (`TC-R3-T2-01`), injection neutralization (`TC-R3-T2-02`), and duplicate PK error (`TC-R3-T2-04`) pass.
4. **Tier 3 Pairwise Combinations Test**:
   ```powershell
   node --test test/e2e/r1-r5-tier3-pairwise-combinations.test.js
   ```
   *Expected Result*: Reopening persistent volume SQLite file (`TC-R3-T3-01`) passes.

### 5.2 Invalidation Conditions
- Any changes that alter the 4 primary table names (`sites`, `analysis_runs`, `quality_audits`, `file_catalog`) or required index names (`idx_runs_slug`, `idx_runs_status`, `idx_audits_runId`, `idx_files_slug`).
- Removing `this.db` property exposure on `SqliteEngine` (which would break direct harness and repository queries).
- Omitting `fs.mkdirSync` before initializing file-based databases in new paths.
