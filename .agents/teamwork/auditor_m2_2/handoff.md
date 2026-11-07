# Forensic Audit Report: Milestone 2 (R3: Hybrid Persistence Layer)

**Auditor**: `auditor_m2_2` (Forensic Auditor: critic, specialist, auditor)  
**Milestone**: Milestone 2 (Requirement R3: Hybrid Persistence Layer: SQLite + NoSQL Document Store)  
**Branch Under Audit**: `integration/staging-consolidated-v3`  
**Commit Under Audit**: `ebda3bc` ("feat(persistence): implement hybrid sqlite and nosql persistence layer with REST API")  
**Target Recipient**: Parent Orchestrator (`780aafaf-d682-4c48-89cb-4f692b944cff`)  
**Date**: 2026-11-06T16:56:00Z  
**Profile**: General Project (Development Integrity Mode per `ORIGINAL_REQUEST.md`)  
**Verdict**: **CLEAN**

---

## Forensic Audit Summary

| Check # | Forensic Verification Check | Scope | Verdict | Evidence Summary |
|---------|-----------------------------|-------|---------|------------------|
| 1 | Prohibited Pattern: Hardcoded Test Results | `src/persistence/*`, `src/server/*` | **PASS** | Zero hardcoded responses or dummy PASS strings found. |
| 2 | Prohibited Pattern: Facade / Dummy Implementations | All 6 candidate files | **PASS** | Genuine logic throughout; no `return <constant>` or stubs. |
| 3 | Prohibited Pattern: Fabricated Outputs / Logs | Workspace | **PASS** | No pre-populated test output logs or fabricated artifacts. |
| 4 | Prohibited Pattern: Self-Certifying Test Fakes | `test/persistence-*.test.js` | **PASS** | Tests assert against real SQLite DB and disk file operations. |
| 5 | Genuine SQLite Engine Execution | `src/persistence/sqlite-engine.js` | **PASS** | Uses native `node:sqlite` (`DatabaseSync`), WAL mode, foreign keys, transactions. |
| 6 | Genuine DocumentStore Disk Persistence | `src/persistence/document-store.js` | **PASS** | Atomically writes `.json` files to disk under `data/documents/<collection>/`. |
| 7 | Invariant Check: `copias/` Reference Immutability | `copias/` tree | **PASS** | `git status --porcelain copias/` reports 0 modifications or deletions. |
| 8 | Invariant Check: `clientes/` Tree Integrity | `clientes/` tree | **PASS** | `git status --porcelain clientes/` reports 0 modifications or deletions. |
| 9 | Invariant Check: 0 Merge Conflict Markers | `src/`, `test/`, `scripts/` | **PASS** | Zero git conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) in code. |
| 10 | Independent Test Suite Execution | 5 suites (190 test cases) | **PASS** | 100% passing across E2E (54/54), milestones (79/79), persistence (44/44), challenger (13/13). |

---

## 1. Observation

Direct forensic examination and execution in the active workspace yielded the following empirical evidence:

### 1.1 Source Code Static Analysis (`observed`)
All 6 candidate source files and 4 dedicated test suites committed in `ebda3bc` were inspected:

1. `src/persistence/sqlite-engine.js` (264 lines):
   - Genuine SQLite relational persistence engine leveraging Node.js 24 native `node:sqlite` (`DatabaseSync`).
   - Line 14: `const { DatabaseSync } = require('node:sqlite');`
   - Lines 58–65: Configures PRAGMAs (`WAL`, `busy_timeout = 5000`, `foreign_keys = ON`, `synchronous = NORMAL`, `temp_store = MEMORY`, `cache_size = -64000`).
   - Lines 68–124: Defines authentic relational schema DDL (`sites`, `analysis_runs` with `ON DELETE SET NULL`, `quality_audits` with `ON DELETE CASCADE`, `file_catalog`) and 7 indexes (`idx_runs_slug`, `idx_runs_status`, `idx_audits_runId`, `idx_files_slug`, `idx_runs_created`, `idx_audits_slug`, `idx_files_path`).
   - Lines 141–243: Genuine prepared statement caching (`Map`), `exec`, `run`, `get`, `all`, and transaction management supporting sync/async executions with nested savepoints (`sp_${currentDepth}`).
   - Lines 262–263: Dual CommonJS export (`module.exports = SqliteEngine; module.exports.SqliteEngine = SqliteEngine;`).

2. `src/persistence/document-store.js` (466 lines):
   - Genuine schemaless NoSQL collection store persisting files under `data/documents/<collection>/<id>.json`.
   - Lines 27–49: Directory traversal security guards (`validateCollectionName` with `/^[a-zA-Z0-9_-]+$/` and `validateDocumentId`).
   - Lines 123–145: Atomic write protocol via `.tmp` write and atomic `rename` with 5-iteration retry loop for transient Windows file locks (`EPERM`/`EBUSY`).
   - Lines 153–381: Authentic collection CRUD methods (`insertOne`, `insertMany`, `findById`, `find`, `count`, `updateOne`, `deleteById`, `clear`).
   - Lines 58–99: Dynamic query filtering supporting dot-notation (`tokens.primary`), exact values, array inclusion, and predicate functions.
   - Lines 386–461: Root `DocumentStore` directory manager and collection factory.

3. `src/persistence/hybrid-repository.js` (328 lines):
   - Authentic persistence coordinator uniting relational records in `SqliteEngine` with deep unstructured AST payloads in `DocumentStore`.
   - Lines 66–101: `startAnalysisRun()` creates site records and registers running analysis runs.
   - Lines 114–138: `completeAnalysisRun()` persists raw scrape payloads into `'scrape_payloads'` collection and stores `documentRef` in SQLite.
   - Lines 152–178: `recordQualityAudit()` persists raw audit reports into `'audit_reports'` collection and stores `rawReportRef` in SQLite.
   - Lines 191–236: Filtered, sorted, and paginated run queries (`listAnalysisRuns`, `countAnalysisRuns`).
   - Lines 243–266: `getRunDetails()` executes a genuine join across SQLite relational rows, quality audits, and DocumentStore raw JSON payloads.
   - Lines 272–292: `getDashboardAnalytics()` aggregates real-time KPI metrics (`totalRuns`, `passedRuns`, `failedRuns`, `runningRuns`, `passRate`, `averageAuditScore`, `totalTokens`, `totalCostUsd`).

4. `src/persistence/sync-ingestor.js` (261 lines):
   - Idempotently scans historical directories (`copias/` and `clientes/`) to index legacy sites, runs, audits, and files.
   - Lines 50–79, 106, 115, 148, 175–183, 233–236: Uses strictly read-only filesystem primitives (`fs.existsSync`, `fs.readdirSync`, `fs.statSync`, `fs.readFileSync`). Zero write operations to source directories.

5. `src/server/routes/v3-persistence.js` (280 lines) & `src/server/preview-server.js`:
   - Exposes 9 genuine REST endpoints under `/api/v3/*` (`/analytics/kpi`, `/runs`, `/runs/:runId`, `/runs/:runId/raw`, `/clients`, `/clients/:slug/audits`, `/files/tree`, `/files/content`, `/admin/sync`).
   - Preview server integrates `HybridRepository`, exposes `server.hybridRepo`, binds `server.on('close')` cleanup, and requires Bearer token authentication for `/api/v3/admin/sync`.

### 1.2 Git Commit & Workspace Verification (`observed`)
- **Git Commit Check**:
  ```powershell
  git rev-parse HEAD
  ```
  *Output*: `ebda3bc5ba9f650021163a4f7c5d135eb46f7f4a`
- **Git Invariant Check (`copias/` and `clientes/`)**:
  ```powershell
  git status --porcelain copias/
  git status --porcelain clientes/
  ```
  *Output*: Empty (0 lines). Proves zero modifications, zero deletions, and zero untracked file additions in reference directories.
- **Merge Conflict Markers Scan**:
  Grep search for `<<<<<<<` across `src/`, `test/`, `scripts/`:
  - `src/`: 0 matches
  - `scripts/`: 0 matches
  - `test/`: 2 matches in `test/e2e/r1-r5-harness.js` (string literals inside test assertions verifying conflict detection logic). 0 real conflict markers.

### 1.3 Independent Execution of Project Test Suites (`observed`)

1. **Syntax Audit (`node scripts/audit-syntax.js`)**:
   - Total files checked: 449
   - Passed: 446 (All `src/`, `scripts/`, `bin/`, `icm/`, and persistence modules passed syntax check with exit code 0)
   - Failed: 3 (Known ESM syntax fixture files in `test/fixtures/context-index/`: `anonymous-default.js`, `mixed-exports.js`, `sample.js`)

2. **Dedicated Persistence & API Unit Test Suite (`node --test test/persistence-*.test.js test/preview-server-v3-api.test.js`)**:
   - Tests: 44
   - Suites: 12
   - Pass: 44
   - Fail: 0
   - Duration: 6703ms

3. **4-Tier E2E Regression Suite (`node --test test/e2e/r1-r5-*.test.js`)**:
   - Tests: 54
   - Suites: 20
   - Pass: 54
   - Fail: 0
   - Duration: 2647ms

4. **Upstream Milestone Test Suite (`npm run test:milestones`)**:
   - Tests: 79
   - Suites: 10
   - Pass: 79
   - Fail: 0
   - Duration: 6729ms

5. **Empirical Challenger Suite (`node --test test/challenger-m2-2.test.js`)**:
   - Tests: 13
   - Suites: 4
   - Pass: 13
   - Fail: 0
   - Duration: 2732ms

6. **Candidate Engine Dynamic Resolution**:
   ```powershell
   node -e "const { resolveSqliteEngine, resolveDocumentStore, resolveHybridRepository } = require('./test/e2e/r1-r5-harness'); console.log(resolveSqliteEngine().constructor.name, resolveDocumentStore().constructor.name, resolveHybridRepository().constructor.name);"
   ```
   *Output*: `SqliteEngine DocumentStore HybridRepository`

---

## 2. Logic Chain

1. **Integrity Mode Ground Truth**:
   - Per `ORIGINAL_REQUEST.md` line 8, the project integrity mode is explicitly set to `development`.
   - Under Development Mode, the forensic mandate is to catch fabricated outputs, hardcoded mock results, shortcut facades, and corrupted invariants.

2. **Absence of Prohibited Patterns**:
   - **Pattern 1 (Hardcoded test results)**: Detailed code inspection of `src/persistence/sqlite-engine.js`, `document-store.js`, `hybrid-repository.js`, `sync-ingestor.js`, and `v3-persistence.js` revealed zero hardcoded responses tailored to specific test inputs.
   - **Pattern 2 (Facade implementations)**: Functions perform authentic computations — opening SQLite database handles, compiling SQL DDL, executing prepared statements, writing atomic files to disk, and parsing JSON streams.
   - **Pattern 3 (Fabricated outputs)**: No pre-populated logs or attestation files exist to deceive the test runner.
   - **Pattern 4 (Self-certifying tests)**: The dedicated test suites run genuine assertions against dynamic SQLite memory/disk instances and disk directories, validating foreign key cascades, transaction rollbacks, dot-notation filtering, and atomic file cleanup.

3. **Preservation of Invariants**:
   - `copias/` and `clientes/` were validated via git porcelain status. Both remain pristine (0 files modified or deleted), strictly upholding the immutable reference evidence rule from `AGENTS.md`.

4. **Dynamic Engine Supresession**:
   - The test harness dynamically resolves candidate classes from `src/persistence/` rather than falling back to reference mocks, proving that the candidate code itself executes during E2E runs.

---

## 3. Caveats & Hardening Recommendations

While the work product is completely authentic and free of integrity violations, empirical stress testing surfaced two specific implementation edge cases that should be scheduled for hardening in subsequent maintenance or Milestone 4:

1. **Concurrency PRAGMA Initialization Order in `SqliteEngine` (`observed`)**:
   - *File*: `src/persistence/sqlite-engine.js`, lines 58–61:
     ```javascript
     if (!isMemory) {
       this.db.exec('PRAGMA journal_mode = WAL;');
     }
     this.db.exec(`PRAGMA busy_timeout = ${this.busyTimeout};`);
     ```
   - *Risk*: `PRAGMA busy_timeout` is executed **after** `PRAGMA journal_mode = WAL;`. When multiple external processes or worker threads open a disk-based SQLite database while another process holds an active write transaction, executing `journal_mode = WAL;` with SQLite's default zero busy-timeout can throw `ERR_SQLITE_ERROR: database is locked`.
   - *Recommendation*: Invert the sequence so that `PRAGMA busy_timeout = ${this.busyTimeout};` is executed immediately after `new DatabaseSync(this.dbPath);` before any other PRAGMA or DDL statement.

2. **`file_catalog` Duplicate Rows on Resync When `scanFiles: true` (`observed`)**:
   - *File*: `src/persistence/sync-ingestor.js`, line 243, and `src/persistence/sqlite-engine.js`, lines 107–115.
   - *Observation*: `_catalogFiles()` generates a new `crypto.randomUUID()` on every invocation, and the `file_catalog` table schema lacks a `UNIQUE(siteSlug, relativePath)` constraint. Consequently, running `syncAll({ scanFiles: true })` multiple times causes `file_catalog` row counts to multiply (N, 2N, 3N...). Note that `scanFiles: false` (the default) is completely idempotent (0 duplicate sites, runs, or audits).
   - *Recommendation*: Add `UNIQUE(siteSlug, relativePath)` to `file_catalog` schema, or check for existence before inserting.

---

## 4. Conclusion

**Verdict**: **CLEAN**

Milestone 2 (R3: Hybrid Persistence Layer) implements all required functionality authentically and genuinely:
- Native `node:sqlite` (`DatabaseSync`) executes real relational queries, transactions, savepoints, and schema constraints.
- `DocumentStore` executes real file-per-document disk persistence with atomic writes and directory traversal protections.
- `HybridRepository` coordinates relational records and document payloads seamlessly.
- `SyncIngestor` safely indexes historical clones without mutating `copias/` or `clientes/`.
- REST API v3 routes operate correctly on `preview-server.js`.
- All 190 automated test cases across 5 independent test suites pass with 0 failures.
- Zero merge conflict markers and zero integrity violations exist in the work product.

The work product committed in `ebda3bc` on branch `integration/staging-consolidated-v3` is **ACCEPTED** from an integrity standpoint.

---

## 5. Verification Method

To independently reproduce the forensic verification:

1. **Verify Git Commit and Tree Status**:
   ```powershell
   git rev-parse HEAD
   git status --porcelain copias/
   git status --porcelain clientes/
   ```
   *Expected Output*: Commit `ebda3bc...`, with zero changes in `copias/` and `clientes/`.

2. **Verify Dynamic Engine Resolution**:
   ```powershell
   node -e "const { resolveSqliteEngine, resolveDocumentStore, resolveHybridRepository } = require('./test/e2e/r1-r5-harness'); console.log(resolveSqliteEngine().constructor.name, resolveDocumentStore().constructor.name, resolveHybridRepository().constructor.name);"
   ```
   *Expected Output*: `SqliteEngine DocumentStore HybridRepository`

3. **Run Dedicated Persistence Unit Tests**:
   ```powershell
   node --test test/persistence-*.test.js test/preview-server-v3-api.test.js
   ```
   *Expected Output*: 44 pass, 0 fail.

4. **Run 4-Tier E2E Regression Suite**:
   ```powershell
   node --test test/e2e/r1-r5-*.test.js
   ```
   *Expected Output*: 54 pass, 0 fail.

5. **Run Upstream Milestone Tests**:
   ```powershell
   npm run test:milestones
   ```
   *Expected Output*: 79 pass, 0 fail.

6. **Run Empirical Challenger Tests**:
   ```powershell
   node --test test/challenger-m2-2.test.js
   ```
   *Expected Output*: 13 pass, 0 fail.
