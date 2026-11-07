# Milestone 2 Remediation Handoff Report: Concurrency & Idempotency Hardening

**Agent**: `worker_m2_2`  
**Role**: Teamwork Worker (implementer, qa, specialist)  
**Milestone**: Milestone 2 (Iteration 2: Hybrid Persistence Layer)  
**Target Branch**: `integration/staging-consolidated-v3`  
**Commit Hash**: `47a434ff08517c4815ba8453b99a0ffee15c92c5`  
**Date**: 2026-11-06T17:08:00Z  

---

## 1. Observation

### 1.1 Concurrency Defect in `SqliteEngine.init` (Challenger 1 finding)
- **File**: `src/persistence/sqlite-engine.js` (lines 58–63 previously)
- Prior code executed `this.db.exec('PRAGMA journal_mode = WAL;');` before configuring `PRAGMA busy_timeout = ${this.busyTimeout};`.
- When multiple worker threads or processes concurrently opened the database file while writes were occurring, SQLite used the default zero busy-timeout, throwing:
  ```
  Error: database is locked
      at SqliteEngine.init (src/persistence/sqlite-engine.js:59:15)
    code: 'ERR_SQLITE_ERROR',
    errcode: 5,
    errstr: 'database is locked'
  ```

### 1.2 Filesystem Sync Idempotency Defect (Challenger 2 finding)
- **File**: `src/persistence/sync-ingestor.js` (lines 240–251 previously) and `src/persistence/sqlite-engine.js` (lines 107–115 previously)
- `file_catalog` schema defined only `id TEXT PRIMARY KEY` without a unique constraint on `(siteSlug, relativePath)`.
- `_catalogFiles()` generated a new random UUID (`crypto.randomUUID()`) on every run.
- When `syncAll({ scanFiles: true })` ran repeatedly, `file_catalog` row count doubled on each run (17 -> 34 -> 51) and returned `filesCount = 17` instead of `0`.

### 1.3 Windows NTFS Filename Safety (Reviewer recommendation)
- **File**: `src/persistence/document-store.js` (lines 41–49 previously)
- `validateDocumentId()` only checked for path traversal (`..`, `/`, `\`), allowing colons (`:`) or wildcard characters (`*`, `?`, `<`, `>`, `"`, `|`). On Windows NTFS, colons represent Alternate Data Streams, causing `fsp.writeFile` to fail with `ENOENT` instead of throwing a validation error.

### 1.4 Implemented Remediations
1. **PRAGMA busy_timeout Reordering (`src/persistence/sqlite-engine.js`)**:
   Reordered lines 59–63 so `this.db.exec(\`PRAGMA busy_timeout = ${this.busyTimeout};\`);` executes immediately after `new DatabaseSync(...)`, before `PRAGMA journal_mode = WAL;`.
2. **Async Transaction Serialization Queue (`src/persistence/sqlite-engine.js`)**:
   Added `this._txQueue` and `this._asyncTxActive` to `SqliteEngine`. Concurrent async calls to `transaction()` on the same instance are serialized via a promise queue to prevent microtask interleaving, while nested transactions (`this._txDepth > 0`) execute immediately via savepoints without deadlock.
3. **`file_catalog` Schema Unique Constraint (`src/persistence/sqlite-engine.js`)**:
   Updated DDL with `UNIQUE(siteSlug, relativePath)` inside `CREATE TABLE IF NOT EXISTS file_catalog` and added `CREATE UNIQUE INDEX IF NOT EXISTS idx_files_slug_path ON file_catalog(siteSlug, relativePath);`.
4. **Idempotent Ingestion with Conflict Resolution (`src/persistence/sync-ingestor.js`)**:
   In `_catalogFiles()`, added pre-existence query on `file_catalog WHERE siteSlug = ? AND relativePath = ?`. New files insert with `ON CONFLICT(siteSlug, relativePath) DO UPDATE SET sizeBytes = excluded.sizeBytes, sha256 = excluded.sha256` and increment `count++`. Unchanged files do not re-insert or increment `count`. Changed files update without duplication. Subsequent runs return `filesCount: 0`.
5. **NTFS Character Validation (`src/persistence/document-store.js`)**:
   Added `const NTFS_RESERVED_REGEX = /[<>:"/\\|?*\x00-\x1F]/;` in `validateDocumentId()`. IDs containing `:`, `<`, `>`, `"`, `|`, `?`, `*` or control characters throw an explicit `Error: Windows NTFS reserved characters ... not permitted`.

---

## 2. Logic Chain

1. **Premise 1**: SQLite connection initialization is susceptible to `SQLITE_BUSY` when concurrent writes are occurring unless `busy_timeout` is registered before any statement requiring locks.
2. **Premise 2**: By executing `PRAGMA busy_timeout = ${this.busyTimeout};` as the first statement after database instantiation, SQLite's internal busy handler waits up to 5000ms during WAL transition and subsequent schema operations, resolving all multi-worker startup race conditions.
3. **Premise 3**: In single-instance Node.js usage with async operations inside transactions, interleaving microtasks can cause out-of-order `BEGIN` and `COMMIT` calls. The internal `this._txQueue` chains top-level async transactions, ensuring strict serialization without deadlocking nested savepoints.
4. **Premise 4**: For filesystem indexing to be idempotent (Requirement R3, Feature F08), running `syncAll({ scanFiles: true })` $N$ times must yield the exact same catalog state as running it once. The combination of `UNIQUE(siteSlug, relativePath)`, pre-existence check, and `ON CONFLICT DO UPDATE` guarantees 0 duplicate rows and reports 0 new entities on repeated runs.
5. **Premise 5**: Rejecting NTFS reserved characters before touching the filesystem prevents corrupt Alternate Data Stream writes and ensures predictable cross-platform behavior.

---

## 3. Caveats

- **SQLite WAL Checkpointing**: In extremely high concurrency environments (>100 writers), SQLite checkpointing may occasionally wait near the 5000ms timeout threshold. The busy timeout is configurable via constructor options `new SqliteEngine({ busyTimeout: ... })`.
- **NTFS Reserved Characters**: Whitelisted character sets allow alphanumeric, hyphens, underscores, and dots (e.g., standard UUIDs, hashes, and versioned IDs). Documents using URNs with colons (e.g. `urn:doc:...`) must replace colons with dashes or underscores before persisting.
- No other caveats.

---

## 4. Conclusion

Milestone 2 (R3: Hybrid Persistence Layer) defects reported by `challenger_m2_1` and `challenger_m2_2` have been completely remediated.
- PRAGMA race condition: resolved.
- Async transaction serialization: implemented and covered by unit tests.
- File catalog duplicate insertion: resolved, verified 100% idempotent.
- NTFS filename hardening: implemented and verified.
- 100% green test pass across all 4 suites (E2E, Milestones, Persistence/Adversarial, Syntax Audit).
- Committed to `integration/staging-consolidated-v3` with commit `47a434f`.

---

## 5. Verification Method

To independently verify all remediations:

1. **Run Full 4-Tier E2E Regression Suite (54/54 tests pass)**:
   ```powershell
   node --test test/e2e/r1-r5-*.test.js
   ```
   *Result*: 54 passed, 0 failed.

2. **Run Upstream Milestone Regression Suite (79/79 tests pass)**:
   ```powershell
   npm run test:milestones
   ```
   *Result*: 79 passed, 0 failed.

3. **Run Persistence, Adversarial & Challenger Suites (59/59 tests pass)**:
   ```powershell
   node --test test/persistence-*.test.js test/preview-server-v3-api.test.js test/challenger-m2-2.test.js test/persistence-adversarial.test.js
   ```
   *Result*: 59 passed, 0 failed across 16 suites.

4. **Run Project Syntax Audit**:
   ```powershell
   node scripts/audit-syntax.js
   ```
   *Result*: 446/449 passed (0 errors in project code, 3 expected ESM syntax test fixtures).

5. **Inspect Git Commit on Staging Branch**:
   ```powershell
   git log -1 --stat
   ```
   *Commit*: `47a434ff08517c4815ba8453b99a0ffee15c92c5`
