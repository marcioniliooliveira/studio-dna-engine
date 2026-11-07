# Milestone 2 Adversarial Challenge Report: Hybrid Persistence Layer (R3)

**Agent**: `challenger_m2_2`  
**Role**: Empirical Challenger (critic, specialist)  
**Milestone**: Milestone 2 (R3: Hybrid Persistence Layer: Coordinator & API)  
**Target Branch**: `integration/staging-consolidated-v3`  
**Target Commit**: `ebda3bc`  
**Date**: 2026-11-06T15:56:00Z  
**Verdict**: **REJECTED** (Idempotency Duplication Defect in `SyncIngestor.prototype._catalogFiles` / `file_catalog` schema)

---

## Challenge Summary

**Overall risk assessment**: **HIGH**

Empirical verification of Milestone 2 (R3: Hybrid Persistence Layer: Coordinator & API) confirms robust implementation across `HybridRepository` (large AST payload linking, query pagination boundaries, and cross-process reopen persistence) and `Preview Server v3` REST API endpoints (`/runs`, `/runs/:runId`, `/runs/:runId/raw`, `/analytics/kpi`, `/files/tree`, `/files/content`, `/admin/sync`). Furthermore, the immutable evidence invariant of `copias/` is 100% honored (0 files modified).

However, an empirical adversarial test targeting Requirement R3 / Feature F08 ("Idempotent scanner importing existing historical runs and artifacts") revealed that **`SyncIngestor` is NOT idempotent when `scanFiles: true`**: running sync twice in a row causes the record count in SQLite table `file_catalog` to duplicate (e.g. from 17 to 34 records, and 51 on a third run). This occurs because `_catalogFiles` generates a brand new `crypto.randomUUID()` on every invocation and the `file_catalog` table schema lacks a `UNIQUE(siteSlug, relativePath)` constraint.

---

## 1. Observation

Direct examination and execution produced the following empirical findings:

### 1.1 Automated Test Battery Execution (`observed`)
1. **Upstream 4-Tier E2E Regression Suite**:
   ```powershell
   node --test test/e2e/r1-r5-*.test.js
   ```
   *Result*: `54 tests pass, 0 fail` (duration: 2855ms).
2. **Milestone Regression Test Suite**:
   ```powershell
   npm run test:milestones
   ```
   *Result*: `79 tests pass, 0 fail` (duration: 6589ms).
3. **Dedicated Persistence & API Test Suites**:
   ```powershell
   node --test test/persistence-*.test.js test/preview-server-v3-api.test.js
   ```
   *Result*: `44 tests pass, 0 fail` across 12 suites (including `persistence-sqlite`, `persistence-docstore`, `persistence-hybrid`, `persistence-adversarial`, and `preview-server-v3-api`).

### 1.2 Dedicated Empirical Challenger Suite Execution (`observed`)
Authored and executed `test/challenger-m2-2.test.js` (13 tests across 3 suites):
```powershell
node --test test/challenger-m2-2.test.js
```
*Result*:
```
▶ Milestone 2 Empirical Challenger Suite (challenger_m2_2)
  ▶ Mission 1: HybridRepository Empirical Challenges
    ✔ 1.1 Large payload (> 4MB AST) links accurately between SQLite analysis_runs and DocumentStore (90.5544ms)
    ✔ 1.2 Listing queries with pagination, filtering, and edge cases (offset out of bounds, limit 0, negative bounds) (9.9311ms)
    ✔ 1.3 Reopen test: repository data strictly persists across process restarts and separate instances (52.7059ms)
  ✔ Mission 1: HybridRepository Empirical Challenges (154.8217ms)
  ▶ Mission 2: SyncIngestor Idempotency & Immutability Challenges
    ✔ 2.1a Idempotency (scanFiles: false): running sync twice produces identical index counts and zero duplicates (67.0158ms)
    ✔ 2.1b Empirical Defect: scanFiles: true duplicates file_catalog records due to random UUID and missing UNIQUE constraint (47.4233ms)
    ✔ 2.2 copias/ immutability: verifies that actual copias/ files are strictly unmodified (mtimes and hashes untouched) (1113.9785ms)
  ✔ Mission 2: SyncIngestor Idempotency & Immutability Challenges (1229.1532ms)
  ▶ Mission 3: Preview Server v3 REST API Empirical Challenges
    ✔ 3.1 GET /api/v3/runs paginates, filters by siteSlug and status, and handles boundary offsets (49.0357ms)
    ✔ 3.2 GET /api/v3/runs/:runId returns 200 for existing run, 404 for nonexistent run (11.4628ms)
    ✔ 3.3 GET /api/v3/runs/:runId/raw returns 200 when raw document exists, 404 when absent (12.1638ms)
    ✔ 3.4 GET /api/v3/analytics/kpi returns 200 and structured metrics (5.7571ms)
    ✔ 3.5 GET /api/v3/files/tree returns 200 with directory files for copias and clientes (11.4766ms)
    ✔ 3.6 GET /api/v3/files/content serves text & binary, returns 400 for missing path, 404 for missing file, and rejects traversal (13.6633ms)
    ✔ 3.7 POST /api/v3/admin/sync rejects unauthorized mutations (HTTP 403) and succeeds with valid Bearer token (HTTP 200) (19.2515ms)
  ✔ Mission 3: Preview Server v3 REST API Empirical Challenges (157.2764ms)
✔ Milestone 2 Empirical Challenger Suite (challenger_m2_2) (1542.4423ms)
ℹ tests 13
ℹ suites 4
ℹ pass 13
ℹ fail 0
```

### 1.3 Inspection of Idempotency Bug in `src/persistence/sync-ingestor.js` (`observed`)
In `src/persistence/sync-ingestor.js`, lines 240–251:
```javascript
240:           this.hybridRepo.sqliteEngine.run(
241:             `INSERT OR IGNORE INTO file_catalog (id, siteSlug, relativePath, fileType, sizeBytes, sha256, createdAt)
242:              VALUES (?, ?, ?, ?, ?, ?, ?)`,
243:             crypto.randomUUID(),
244:             siteSlug,
245:             relPath,
246:             path.extname(full).replace('.', ''),
247:             stat.size,
248:             hash,
249:             stat.mtime.toISOString()
250:           );
251:           count++;
```
And in `src/persistence/sqlite-engine.js`, lines 107–115:
```sql
107:       CREATE TABLE IF NOT EXISTS file_catalog (
108:         id TEXT PRIMARY KEY,
109:         siteSlug TEXT NOT NULL,
110:         relativePath TEXT NOT NULL,
111:         fileType TEXT NOT NULL,
112:         sizeBytes INTEGER NOT NULL,
113:         sha256 TEXT NOT NULL,
114:         createdAt TEXT NOT NULL
115:       );
```
- `file_catalog` only defines `id` as `PRIMARY KEY`. It has NO unique constraint on `relativePath` or `(siteSlug, relativePath)`.
- When `_catalogFiles()` executes, it generates a random UUID (`crypto.randomUUID()`) on every run.
- Therefore, `INSERT OR IGNORE` evaluates `id` as unique and inserts a duplicate row every time `syncAll({ scanFiles: true })` runs.
- In `test/challenger-m2-2.test.js:374`:
  - Run 1: 17 records inserted into `file_catalog`.
  - Run 2: 17 additional records inserted into `file_catalog` (total: 34 records).
  - Subsequent sync return value: `res2.filesCount = 17` instead of `0`.

### 1.4 Verification of `copias/` Immutability (`observed`)
- Analyzed 25 reference site files across `copias/` before running full synchronization.
- Executed `syncAll({ scanFiles: true })` against the physical repository.
- Re-computed SHA-256 hashes and checked `mtimeMs` for all tracked files.
- Result: **0 files modified** (100% byte-for-byte identical, 0 mtime changes). The invariant specified in `AGENTS.md` is strictly upheld.

### 1.5 Verification of Preview Server v3 REST API Status Codes (`observed`)
- `GET /api/v3/runs`: 200 OK.
- `GET /api/v3/runs/:runId`: 200 OK for existing run; 404 Not Found for nonexistent run.
- `GET /api/v3/runs/:runId/raw`: 200 OK when raw document exists; 404 Not Found when absent.
- `GET /api/v3/analytics/kpi`: 200 OK with numeric types.
- `GET /api/v3/files/tree`: 200 OK with tree listings.
- `GET /api/v3/files/content`: 200 OK for text and binary base64; 400 Bad Request for missing `path`; 404 Not Found for missing file; rejects directory traversal.
- `POST /api/v3/admin/sync`:
  - Missing token: **HTTP 403 Forbidden** (`{ error: "Mutation APIs are disabled or unauthorized" }` via `isMutationAuthorized` at line 565 of `src/server/preview-server.js`).
  - Correct Bearer token: **HTTP 200 OK** with sync metrics.
  - Note: The prompt noted checking for HTTP 401/403 for unauthorized mutations; the server's security model uses HTTP 403, which successfully prevents unauthorized writes.

---

## 2. Logic Chain

1. **Premise 1 (Contract & Requirement R3)**: Feature F08 requires an *idempotent scanner* that imports existing historical artifacts without duplicating records or mutating references.
2. **Premise 2 (Empirical Evidence in Observation 1.3)**: `SqliteEngine` table `file_catalog` defines only `id TEXT PRIMARY KEY`, with no unique constraint on `relativePath` or `(siteSlug, relativePath)`.
3. **Step 1**: In `SyncIngestor.prototype._catalogFiles`, each candidate file is inserted using `crypto.randomUUID()`.
4. **Step 2**: Because each insert has a distinct random primary key, SQLite's `INSERT OR IGNORE` never triggers a conflict on re-sync.
5. **Step 3**: Re-running `syncAll({ scanFiles: true })` doubles the rows in `file_catalog` on each execution (17 -> 34 -> 51).
6. **Step 4**: While `scanFiles: false` is idempotent (sites and runs do not duplicate), whenever file scanning is enabled (as in automated CI, deep indexing, or admin sync), the database is polluted with duplicate file catalog records.
7. **Conclusion**: Milestone 2 cannot be marked `CONFIRMED` until this idempotency defect is remediated by the worker.

---

## 3. Caveats

- **Scope of Defect**: The duplication defect is strictly limited to the `file_catalog` table when `scanFiles: true` is passed. Sites (`sites`), analysis runs (`analysis_runs`), quality audits (`quality_audits`), and DocumentStore collections (`dna_trees`, `audit_reports`) are already completely idempotent.
- **Preview Server Status Code**: The dispatch specified checking for 401 for unauthorized mutations. The server returns 403 Forbidden (`Mutation APIs are disabled or unauthorized`). This is standard practice when mutation endpoints are globally restricted by token guards, and safely rejects unauthorized mutation requests.
- No other caveats.

---

## 4. Conclusion

**Verdict**: **REJECTED**

Milestone 2 (R3: Hybrid Persistence Layer) exhibits high architectural quality, but contains a reproducible defect in filesystem sync idempotency.

### Required Actions for Worker:
1. In `src/persistence/sqlite-engine.js`:
   Add a unique constraint to the `file_catalog` table definition:
   ```sql
   CREATE TABLE IF NOT EXISTS file_catalog (
     id TEXT PRIMARY KEY,
     siteSlug TEXT NOT NULL,
     relativePath TEXT NOT NULL UNIQUE,
     fileType TEXT NOT NULL,
     sizeBytes INTEGER NOT NULL,
     sha256 TEXT NOT NULL,
     createdAt TEXT NOT NULL
   );
   ```
2. In `src/persistence/sync-ingestor.js`:
   In `_catalogFiles(siteSlug, siteDir)`, check for existing relative paths before inserting or generate a deterministic ID (such as a hash of the relativePath):
   ```javascript
   const existingFile = this.hybridRepo.sqliteEngine.get('SELECT id FROM file_catalog WHERE relativePath = ?', relPath);
   if (!existingFile) {
     this.hybridRepo.sqliteEngine.run(
       `INSERT OR IGNORE INTO file_catalog (id, siteSlug, relativePath, fileType, sizeBytes, sha256, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
       crypto.randomUUID(),
       ...
     );
     count++;
   }
   ```
3. In `src/persistence/sqlite-engine.js` (noted in tandem with `challenger_m2_1`):
   Ensure `PRAGMA busy_timeout` is executed before `PRAGMA journal_mode = WAL;` in `init()` to prevent race conditions during multi-worker initialization.

---

## 5. Verification Method

To independently reproduce this finding and verify the remediation:

1. **Run Dedicated Empirical Challenger Suite**:
   ```powershell
   node --test test/challenger-m2-2.test.js
   ```
   *Expected Result*: 13 tests pass, with test `2.1b` explicitly asserting and demonstrating the duplicate rows in `file_catalog` under the current implementation.

2. **Run Full Regression Battery**:
   ```powershell
   node --test test/e2e/r1-r5-*.test.js
   npm run test:milestones
   node --test test/persistence-*.test.js test/preview-server-v3-api.test.js
   ```
   *Expected Result*: All 54 E2E tests, 79 milestone tests, and 44 persistence tests pass without errors.
