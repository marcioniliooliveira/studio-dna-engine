# Milestone 2 Adversarial Challenge Report: Hybrid Persistence Layer (R3)

**Agent**: `challenger_m2_1`  
**Role**: Empirical Challenger (critic, specialist)  
**Milestone**: Milestone 2 (R3: Hybrid Persistence Layer)  
**Target Branch**: `integration/staging-consolidated-v3`  
**Target Commit**: `ebda3bc`  
**Date**: 2026-11-06T15:53:00Z  
**Verdict**: **REJECTED** (Critical Concurrency Defect in `SqliteEngine.prototype.init`)

---

## Challenge Summary

**Overall risk assessment**: **HIGH**

While the core functionality of Milestone 2 (native SQLite DDL, Embedded DocumentStore, HybridRepository coordinator, SyncIngestor, and REST API v3) is impressively constructed and passes all baseline test suites (54/54 E2E tests, 79/79 milestone tests, and 25/25 unit tests), an empirical adversarial stress test revealed a **critical concurrency race condition** in `src/persistence/sqlite-engine.js`:

When multiple worker threads or processes initialize the database concurrently while write transactions are occurring, SQLite throws an unhandled `ERR_SQLITE_ERROR: database is locked` error. The root cause is an inverted PRAGMA initialization sequence where `PRAGMA journal_mode = WAL;` is executed **before** `PRAGMA busy_timeout = ${this.busyTimeout};`, executing with SQLite's default zero busy-timeout.

---

## 1. Observation

### 1.1 Baseline Test Suite Executions (`observed`)
1. **E2E 4-Tier Test Suite**:
   ```powershell
   node --test test/e2e/r1-r5-*.test.js
   ```
   Output: `54 tests pass, 0 fail` (duration: 2707ms).
2. **Milestone Regression Test Suite**:
   ```powershell
   npm run test:milestones
   ```
   Output: `79 tests pass, 0 fail` (duration: 6337ms).
3. **Dedicated Persistence & API Test Suites**:
   ```powershell
   node --test test/persistence-*.test.js test/preview-server-v3-api.test.js
   ```
   Output: `25 tests pass, 0 fail` (duration: 1478ms).

### 1.2 Adversarial Stress Test Execution (`observed`)
An empirical adversarial test suite was authored and executed in the project test directory at `test/persistence-adversarial.test.js` (19 test cases across 8 suites).

Command:
```powershell
node --test test/persistence-adversarial.test.js
```

Verbatim execution result:
```
▶ Empirical Adversarial Verification Suite: Milestone 2
  ▶ 1. SQLite Engine Concurrency Stress
    ✔ 60 concurrent writes across separate engine instances to WAL file with busy_timeout succeed without lock exhaustion (677.7266ms)
    ✖ 4 worker threads with 15 writes each (60 writes total) concurrently write to the same WAL database file (174.4713ms)
  ✖ 1. SQLite Engine Concurrency Stress (816.6325ms)
  ▶ 2. SQL Injection Parameter Safety
    ✔ stacked queries and DROP TABLE injection are neutralized as literal strings (4.8987ms)
    ✔ boolean tautology OR 1=1 injection does not leak unauthorized rows (3.2695ms)
    ✔ UNION SELECT injection does not expose arbitrary data (3.9958ms)
    ✔ null byte and hex encoding attacks are safely contained (3.2437ms)
    ✔ HybridRepository sanitizes adversarial sortBy and sortOrder parameters (4.5579ms)
  ✔ 2. SQL Injection Parameter Safety (20.8376ms)
  ▶ 3. Foreign Key Constraints
    ✔ rejects analysis_runs referencing nonexistent siteId when foreign keys are active (3.9842ms)
    ✔ ON DELETE SET NULL nullifies siteId in analysis_runs when site is deleted (3.3823ms)
    ✔ ON DELETE CASCADE deletes child quality_audits when parent analysis_run is deleted (3.2122ms)
  ✔ 3. Foreign Key Constraints (11.0389ms)
  ▶ 4. Duplicate Primary Key & Unique Constraint Handling
    ✔ inserting duplicate primary key throws UNIQUE constraint error and preserves original (4.4988ms)
    ✔ duplicate unique domain constraint throws error and aborts transaction completely (3.9211ms)
  ✔ 4. Duplicate Primary Key & Unique Constraint Handling (8.7334ms)
  ▶ 5. DocumentStore Parallel High-Throughput Writes
    ✔ 75 parallel writes with unique IDs succeed atomically without tmp leaks (70.5248ms)
    ✔ 40 parallel updates targeting the IDENTICAL document ID resolve via retry loop with valid JSON on disk (171.4427ms)
  ✔ 5. DocumentStore Parallel High-Throughput Writes (242.2869ms)
  ▶ 6. DocumentStore Extreme Payload Stress (16MB+)
    ✔ ingests and persists 16MB+ nested JSON AST, verifies disk size, memory safety, and deep property querying (3563.519ms)
  ✔ 6. DocumentStore Extreme Payload Stress (16MB+) (3563.7665ms)
  ▶ 7. DocumentStore Corrupted File & Partial Recovery
    ✔ findById returns null gracefully on corrupt, empty, and binary files without unhandled rejection (19.1578ms)
    ✔ find() skips all corrupted files, excludes .tmp files, and returns only valid documents (37.6913ms)
    ✔ deleteById deletes corrupt file cleanly from disk (11.905ms)
    ✔ clear() cleans both valid, corrupt, and orphaned .tmp files (13.9807ms)
  ✔ 7. DocumentStore Corrupted File & Partial Recovery (83.2505ms)
✖ Empirical Adversarial Verification Suite: Milestone 2 (4747.9323ms)
ℹ tests 19
ℹ suites 8
ℹ pass 18
ℹ fail 1
```

Verbatim failure traceback:
```
✖ 4 worker threads with 15 writes each (60 writes total) concurrently write to the same WAL database file (174.4713ms)
  C:\Users\wd\Documents\playwright-scraper\src\persistence\sqlite-engine.js:59
        this.db.exec('PRAGMA journal_mode = WAL;');
                ^
  
  Error: database is locked
      at SqliteEngine.init (C:\Users\wd\Documents\playwright-scraper\src\persistence\sqlite-engine.js:59:15)
      at [worker eval]:6:12
      ...
    code: 'ERR_SQLITE_ERROR',
    errcode: 5,
    errstr: 'database is locked'
```

### 1.3 Inspection of Code at Fault (`observed`)
In `src/persistence/sqlite-engine.js`, lines 57–66:
```javascript
57:    // Apply PRAGMAs
58:    if (!isMemory) {
59:      this.db.exec('PRAGMA journal_mode = WAL;');
60:    }
61:    this.db.exec(`PRAGMA busy_timeout = ${this.busyTimeout};`);
62:    this.db.exec('PRAGMA foreign_keys = ON;');
63:    this.db.exec('PRAGMA synchronous = NORMAL;');
64:    this.db.exec('PRAGMA temp_store = MEMORY;');
65:    this.db.exec('PRAGMA cache_size = -64000;');
```

### 1.4 Controlled Proof of Root Cause & Fix (`observed`)
When `PRAGMA busy_timeout` is executed as the very first PRAGMA before `PRAGMA journal_mode = WAL;`:
- All 4 worker threads complete with 0 errors.
- All 60/60 concurrent writes successfully commit to the WAL database file.
- Total runs inserted equals 60.

---

## 2. Logic Chain

1. **Premise 1**: SQLite connections default to `busy_timeout = 0`. Any statement requiring a lock will immediately fail with `SQLITE_BUSY` (`database is locked`) if another connection holds an active write lock.
2. **Premise 2**: In `src/persistence/sqlite-engine.js:59`, `this.db.exec('PRAGMA journal_mode = WAL;')` is executed before line 61 (`this.db.exec('PRAGMA busy_timeout = ...');`).
3. **Step 1 (Observation 1.2 & 1.3)**: Under real multi-worker or multi-process concurrency (e.g. parallel background scrape workers, worker threads, or cluster processes), worker connections invoke `engine.init()`. While one connection is in the middle of executing write transactions, concurrent workers attempt line 59.
4. **Step 2**: Because `busy_timeout` has not yet been set on the new connection, SQLite does not wait up to the configured 5000ms; it aborts immediately with `ERR_SQLITE_ERROR: database is locked`.
5. **Step 3 (Observation 1.4)**: Inverting lines 59 and 61 so that `PRAGMA busy_timeout` runs before `PRAGMA journal_mode = WAL;` allows SQLite's internal busy handler to wait for active writes to complete, eliminating all lock errors and allowing 100% of concurrent writes to pass.
6. **Conclusion**: Milestone 2 cannot be confirmed for production until this defect in `src/persistence/sqlite-engine.js` is corrected by the worker agent.

---

## 3. Detailed Challenges & Findings

### [CRITICAL] Challenge 1: PRAGMA Execution Order Race Condition in `SqliteEngine.prototype.init`
- **Assumption Challenged**: Configuring `busyTimeout` in options guarantees that concurrent connections will wait up to `busyTimeout` (5000ms) during initialization.
- **Attack Scenario**: 4 worker threads concurrently calling `engine.init()` and writing records to the same file database (`threads_stress.db`).
- **Blast Radius**: Unhandled process/worker crash during concurrent job startup. Any scraper worker or CLI command executed while the server or another worker is writing to SQLite crashes with `database is locked`.
- **Mitigation**: Move line 61 (`this.db.exec('PRAGMA busy_timeout = ...');`) to line 58, immediately before `if (!isMemory) { this.db.exec('PRAGMA journal_mode = WAL;'); }`.

### [PASSED] Challenge 2: SQL Injection Parameter Safety
- **Attack Vectors Tested**:
  1. Stacked queries: `safe.example.com'; DROP TABLE sites; --`
  2. Boolean tautology bypass: `' OR '1'='1`
  3. UNION SELECT data leakage: `' UNION SELECT 'evil-id', 'evil.com', 'Evil Site', 'pwned', '2026-01-01' --`
  4. Null-byte truncation: `safe.example.com\0' OR 1=1 --`
  5. Hex encoding: `X'27204f5220313d31202d2d'`
  6. Dynamic SQL injection via `HybridRepository.prototype.listAnalysisRuns({ sortBy, sortOrder })`.
- **Result**: ALL 6 ATTACK VECTORS NEUTRALIZED. Parameter binding in `node:sqlite` treats inputs strictly as literals. Whitelist in `hybrid-repository.js:193` falls back to `'createdAt' DESC` when malicious identifiers are supplied.

### [PASSED] Challenge 3: Foreign Key Constraint Invariants
- **Scenarios Tested**:
  1. Inserting `analysis_runs` with nonexistent `siteId`: correctly rejected with `FOREIGN KEY constraint failed`.
  2. Deleting parent `sites` record: `ON DELETE SET NULL` properly nullified `siteId` on dependent `analysis_runs` while preserving run records.
  3. Deleting parent `analysis_runs` record: `ON DELETE CASCADE` deleted all associated `quality_audits` records.
- **Result**: 100% compliant with relational invariants.

### [PASSED] Challenge 4: Duplicate Primary Key & Unique Constraints
- **Scenarios Tested**:
  1. Duplicate `sites.id`: throws `UNIQUE constraint failed: sites.id` and preserves original record.
  2. Duplicate unique `domain`: throws `UNIQUE constraint failed: sites.domain`.
  3. Transaction rollback on constraint failure: transaction fully rolls back without leaving dangling partial records.
- **Result**: 100% compliant.

### [PASSED] Challenge 5: DocumentStore High-Throughput & Rename Race
- **Scenarios Tested**:
  1. 75 parallel writes with unique IDs: all 75 written atomically, 0 orphaned `.tmp` files.
  2. 40 parallel updates targeting the IDENTICAL document ID: Windows NTFS file locking contention resolved via 5x retry loop; final document on disk parsed as valid JSON with 0 orphaned `.tmp` files.
- **Result**: 100% compliant.

### [PASSED] Challenge 6: Extreme 16MB+ Nested JSON AST Payload
- **Scenarios Tested**:
  1. Ingestion of a 17.04 MB deeply nested JSON AST tree (18 tree branches, depth 3, breadth 7, 17,000+ objects).
  2. Disk persistence: verified 17.04 MB on disk.
  3. Retrieval fidelity: `findById` recovered exact structure, arrays, and properties.
  4. Querying: `find({'payload.metadata.antiSlopPassed': true})` successfully traversed the deep tree.
  5. Memory safety: V8 heap remained stable without memory leak or OOM crash.
- **Result**: 100% compliant.

### [PASSED] Challenge 7: DocumentStore Corruption Resilience
- **Scenarios Tested**:
  1. Truncated/unclosed JSON file (`corrupt-truncated.json`).
  2. 0-byte file (`corrupt-empty.json`).
  3. Binary random garbage file (`corrupt-binary.json`).
  4. Orphaned `.tmp` file (`*.tmp`).
- **Behaviors Verified**:
  - `findById` returns `null` safely without unhandled exception.
  - `find({})` skips all 3 corrupted files, ignores `.tmp` files, and returns only valid documents.
  - `deleteById` unlinks corrupted files cleanly.
  - `clear()` purges valid, corrupt, and `.tmp` files completely.
- **Result**: 100% compliant.

---

## 4. Caveats

- **Single-Threaded Shared Connection vs Multi-Worker**: In a single Node.js process using a single shared `SqliteEngine` connection, `PRAGMA busy_timeout` ordering does not fail because `init()` is only called once. The bug strictly manifests when multiple processes or worker threads open the database file simultaneously (such as parallel scrape ingestion or cluster workers).
- **Adversarial Test Script Location**: `test/persistence-adversarial.test.js` is committed directly to the project test directory (`test/`) in strict compliance with the workspace convention banning test files inside `.agents/teamwork/`.
- No other caveats.

---

## 5. Conclusion

**Verdict**: **REJECTED**

Milestone 2 (R3: Hybrid Persistence Layer) cannot be marked as complete until the critical concurrency defect in `src/persistence/sqlite-engine.js` is remediated by the worker agent:

**Required Action for Worker**:
In `src/persistence/sqlite-engine.js`, reorder the PRAGMA execution in `init()`:
```javascript
// BEFORE (Buggy):
if (!isMemory) {
  this.db.exec('PRAGMA journal_mode = WAL;');
}
this.db.exec(`PRAGMA busy_timeout = ${this.busyTimeout};`);

// AFTER (Fixed):
this.db.exec(`PRAGMA busy_timeout = ${this.busyTimeout};`);
if (!isMemory) {
  this.db.exec('PRAGMA journal_mode = WAL;');
}
```

Once this 1-line reordering is applied, `test/persistence-adversarial.test.js` passes 19/19 (100%), and Milestone 2 can be promoted to `CONFIRMED`.

---

## 6. Verification Method

To reproduce the bug and verify the fix:

1. **Execute the Empirical Adversarial Suite (Current State - FAILS)**:
   ```powershell
   node --test test/persistence-adversarial.test.js
   ```
   *Expected Failure*: Suite 1 fails at `✖ 4 worker threads with 15 writes each (60 writes total) concurrently write to the same WAL database file` with `Error: database is locked at SqliteEngine.init:59:15`.

2. **Verify Fix**:
   Move `PRAGMA busy_timeout` above `PRAGMA journal_mode = WAL;` in `src/persistence/sqlite-engine.js`.
   Re-run:
   ```powershell
   node --test test/persistence-adversarial.test.js
   ```
   *Expected Result*: 19 passed, 0 failed.

3. **Verify All Upstream Suites**:
   ```powershell
   node --test test/e2e/r1-r5-*.test.js
   npm run test:milestones
   node --test test/persistence-*.test.js test/preview-server-v3-api.test.js
   ```
   *Expected Result*: All tests pass (54/54, 79/79, 44/44).
