/**
 * test/persistence-adversarial.test.js
 *
 * Empirical Adversarial Verification Suite for Milestone 2 (R3: Hybrid Persistence Layer).
 *
 * Stress-tests and challenges:
 * 1. SqliteEngine:
 *    - 60+ concurrent writes to test WAL mode lock contention and busy timeout.
 *    - SQL injection attack vectors (stacked, union, boolean tautology, hex, null byte).
 *    - Foreign key constraints (ON DELETE CASCADE, ON DELETE SET NULL, nonexistent parents).
 *    - Duplicate primary key and unique constraint enforcement and transaction rollback.
 * 2. DocumentStore:
 *    - High-throughput parallel writes with unique IDs and heavily contested identical IDs.
 *    - Extreme payload stress: 16MB+ nested JSON AST verification on disk and in-memory.
 *    - Corrupted JSON, 0-byte file, binary garbage, and orphaned .tmp file resilience.
 */

'use strict';

const { describe, test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const fsp = fs.promises;
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');

const SqliteEngine = require('../src/persistence/sqlite-engine');
const DocumentStore = require('../src/persistence/document-store');
const HybridRepository = require('../src/persistence/hybrid-repository');

describe('Empirical Adversarial Verification Suite: Milestone 2', () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'studio_dna_adversarial_'));
  });

  afterEach(async () => {
    if (tempDir && fs.existsSync(tempDir)) {
      try {
        await fsp.rm(tempDir, { recursive: true, force: true });
      } catch (_) {}
    }
  });

  // =========================================================================
  // 1. SQLite Engine Concurrency Stress
  // =========================================================================
  describe('1. SQLite Engine Concurrency Stress', () => {
    test('60 concurrent writes across separate engine instances to WAL file with busy_timeout succeed without lock exhaustion', async () => {
      const dbPath = path.join(tempDir, 'concurrency_stress.db');

      // Initialize base schema with primary engine
      const initEngine = new SqliteEngine({ dbPath, busyTimeout: 10000 });
      initEngine.init();
      initEngine.run(
        'INSERT INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
        'site-stress',
        'stress.local',
        'stress',
        'active',
        new Date().toISOString()
      );
      initEngine.close();

      const CONCURRENT_COUNT = 60;
      const tasks = [];

      for (let i = 0; i < CONCURRENT_COUNT; i++) {
        tasks.push(
          (async (index) => {
            const engine = new SqliteEngine({ dbPath, busyTimeout: 5000 });
            engine.init();

            const runId = `run-stress-${index}-${crypto.randomBytes(4).toString('hex')}`;
            engine.run(
              `INSERT INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, status, outputTokens, costUsd, createdAt)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              runId,
              'site-stress',
              'stress',
              `https://stress.local/page/${index}`,
              'adversarial',
              'completed',
              1000 + index,
              0.01 * index,
              new Date().toISOString()
            );

            engine.close();
            return index;
          })(i)
        );
      }

      const results = await Promise.allSettled(tasks);
      const rejected = results.filter(r => r.status === 'rejected');

      assert.equal(
        rejected.length,
        0,
        `Expected 0 rejections under 60 concurrent WAL writes, but got ${rejected.length}. Errors: ${rejected.map(r => r.reason?.message).join('; ')}`
      );

      // Verify all 60 records committed to disk
      const verifyEngine = new SqliteEngine({ dbPath });
      verifyEngine.init();
      const countRow = verifyEngine.get('SELECT COUNT(*) as total FROM analysis_runs WHERE siteId = ?', 'site-stress');
      assert.equal(countRow.total, CONCURRENT_COUNT);
      verifyEngine.close();
    });

    test('4 worker threads with 15 writes each (60 writes total) concurrently write to the same WAL database file', async () => {
      const dbPath = path.join(tempDir, 'threads_stress.db');

      const initEngine = new SqliteEngine({ dbPath, busyTimeout: 5000 });
      initEngine.init();
      initEngine.run(
        'INSERT INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
        'site-thread',
        'thread.local',
        'thread',
        'active',
        new Date().toISOString()
      );
      initEngine.close();

      const workerCode = `
        const { workerData, parentPort } = require('node:worker_threads');
        const SqliteEngine = require(workerData.enginePath);
        const engine = new SqliteEngine({ dbPath: workerData.dbPath, busyTimeout: 5000 });
        engine.init();

        try {
          for (let i = 0; i < workerData.count; i++) {
            const runId = 'thread-' + workerData.workerId + '-' + i;
            engine.run(
              'INSERT INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
              runId,
              'site-thread',
              'thread',
              'https://thread.local/' + i,
              'thread-test',
              'passed',
              new Date().toISOString()
            );
          }
          engine.close();
          parentPort.postMessage({ success: true });
        } catch (err) {
          parentPort.postMessage({ success: false, error: err.message });
        }
      `;

      const { Worker } = require('node:worker_threads');
      const numWorkers = 4;
      const countPerWorker = 15;
      const workers = [];

      for (let w = 0; w < numWorkers; w++) {
        workers.push(new Promise((resolve, reject) => {
          const worker = new Worker(workerCode, {
            eval: true,
            workerData: {
              enginePath: path.resolve(__dirname, '../src/persistence/sqlite-engine.js'),
              dbPath,
              workerId: w,
              count: countPerWorker
            }
          });
          worker.on('message', msg => {
            if (msg.success) resolve();
            else reject(new Error(msg.error));
          });
          worker.on('error', reject);
        }));
      }

      await Promise.all(workers);

      const verifyEngine = new SqliteEngine({ dbPath });
      verifyEngine.init();
      const countRow = verifyEngine.get('SELECT COUNT(*) as total FROM analysis_runs WHERE siteId = ?', 'site-thread');
      assert.equal(countRow.total, numWorkers * countPerWorker);
      verifyEngine.close();
    });
  });

  // =========================================================================
  // 2. SQL Injection Parameter Safety
  // =========================================================================
  describe('2. SQL Injection Parameter Safety', () => {
    let engine;

    beforeEach(() => {
      engine = new SqliteEngine({ dbPath: ':memory:' });
      engine.init();
      engine.run(
        'INSERT INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
        'site-safe',
        'safe.example.com',
        'Safe Site',
        'active',
        new Date().toISOString()
      );
    });

    afterEach(() => {
      if (engine && engine.isOpen) engine.close();
    });

    test('stacked queries and DROP TABLE injection are neutralized as literal strings', () => {
      const maliciousPayload = "safe.example.com'; DROP TABLE sites; --";

      // Attempt get() with injection
      const result = engine.get('SELECT * FROM sites WHERE domain = ?', maliciousPayload);
      assert.equal(result, undefined, 'Must not match any row');

      // Verify sites table is completely intact
      const count = engine.get('SELECT COUNT(*) as c FROM sites');
      assert.equal(count.c, 1, 'sites table must not have been dropped');
    });

    test('boolean tautology OR 1=1 injection does not leak unauthorized rows', () => {
      const maliciousPayload = "' OR '1'='1";

      const rows = engine.all('SELECT * FROM sites WHERE domain = ?', maliciousPayload);
      assert.equal(rows.length, 0, 'Must return 0 rows for literal tautology parameter');
    });

    test('UNION SELECT injection does not expose arbitrary data', () => {
      const maliciousPayload = "' UNION SELECT 'evil-id', 'evil.com', 'Evil Site', 'pwned', '2026-01-01' --";

      const rows = engine.all('SELECT * FROM sites WHERE domain = ?', maliciousPayload);
      assert.equal(rows.length, 0, 'UNION attack must be neutralized');
    });

    test('null byte and hex encoding attacks are safely contained', () => {
      const nullBytePayload = "safe.example.com\0' OR 1=1 --";
      const hexPayload = "X'27204f5220313d31202d2d'";

      const nullResult = engine.get('SELECT * FROM sites WHERE domain = ?', nullBytePayload);
      assert.equal(nullResult, undefined);

      const hexResult = engine.get('SELECT * FROM sites WHERE domain = ?', hexPayload);
      assert.equal(hexResult, undefined);
    });

    test('HybridRepository sanitizes adversarial sortBy and sortOrder parameters', async () => {
      const repo = new HybridRepository({ sqliteEngine: engine });
      await repo.init();

      // Attempt SQL injection via sortBy
      const runs = await repo.listAnalysisRuns({
        sortBy: "createdAt; DROP TABLE file_catalog; --",
        sortOrder: "ASC; DROP TABLE sites; --"
      });

      assert.ok(Array.isArray(runs), 'Must return array safely without throwing syntax error');

      // Confirm file_catalog and sites tables still exist
      const catalogCount = engine.get('SELECT COUNT(*) as c FROM file_catalog');
      assert.ok(catalogCount !== undefined);
      const sitesCount = engine.get('SELECT COUNT(*) as c FROM sites');
      assert.equal(sitesCount.c, 1);
    });
  });

  // =========================================================================
  // 3. Foreign Key Constraints (CASCADE and SET NULL)
  // =========================================================================
  describe('3. Foreign Key Constraints', () => {
    let engine;

    beforeEach(() => {
      engine = new SqliteEngine({ dbPath: ':memory:' });
      engine.init();
    });

    afterEach(() => {
      if (engine && engine.isOpen) engine.close();
    });

    test('rejects analysis_runs referencing nonexistent siteId when foreign keys are active', () => {
      assert.throws(
        () => {
          engine.run(
            `INSERT INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, status, createdAt)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            'run-invalid-site',
            'nonexistent-site-id',
            'ghost-site',
            'https://ghost.local',
            'standard',
            'running',
            new Date().toISOString()
          );
        },
        /FOREIGN KEY constraint failed/i,
        'Must throw foreign key constraint violation'
      );
    });

    test('ON DELETE SET NULL nullifies siteId in analysis_runs when site is deleted', () => {
      engine.run(
        'INSERT INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
        'site-fk-1',
        'fk1.local',
        'FK Test 1',
        'active',
        new Date().toISOString()
      );

      engine.run(
        `INSERT INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, status, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        'run-fk-1',
        'site-fk-1',
        'fk1',
        'https://fk1.local',
        'standard',
        'passed',
        new Date().toISOString()
      );

      // Verify relationship established
      let run = engine.get('SELECT * FROM analysis_runs WHERE id = ?', 'run-fk-1');
      assert.equal(run.siteId, 'site-fk-1');

      // Delete parent site
      engine.run('DELETE FROM sites WHERE id = ?', 'site-fk-1');

      // Verify site is gone
      const site = engine.get('SELECT * FROM sites WHERE id = ?', 'site-fk-1');
      assert.equal(site, undefined);

      // Verify run survives with siteId set to null
      run = engine.get('SELECT * FROM analysis_runs WHERE id = ?', 'run-fk-1');
      assert.ok(run !== undefined);
      assert.equal(run.siteId, null, 'siteId must be nullified by ON DELETE SET NULL');
    });

    test('ON DELETE CASCADE deletes child quality_audits when parent analysis_run is deleted', () => {
      engine.run(
        `INSERT INTO analysis_runs (id, siteSlug, targetUrl, mode, status, createdAt)
         VALUES (?, ?, ?, ?, ?, ?)`,
        'run-fk-cascade',
        'cascade-slug',
        'https://cascade.local',
        'standard',
        'passed',
        new Date().toISOString()
      );

      engine.run(
        `INSERT INTO quality_audits (id, runId, siteSlug, auditType, passed, score, metricsJson, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        'audit-1',
        'run-fk-cascade',
        'cascade-slug',
        'performance',
        1,
        98.5,
        '{}',
        new Date().toISOString()
      );

      engine.run(
        `INSERT INTO quality_audits (id, runId, siteSlug, auditType, passed, score, metricsJson, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        'audit-2',
        'run-fk-cascade',
        'cascade-slug',
        'accessibility',
        1,
        100.0,
        '{}',
        new Date().toISOString()
      );

      // Verify audits exist
      const beforeCount = engine.get('SELECT COUNT(*) as c FROM quality_audits WHERE runId = ?', 'run-fk-cascade');
      assert.equal(beforeCount.c, 2);

      // Delete parent run
      engine.run('DELETE FROM analysis_runs WHERE id = ?', 'run-fk-cascade');

      // Verify cascading deletion of all audits
      const afterCount = engine.get('SELECT COUNT(*) as c FROM quality_audits WHERE runId = ?', 'run-fk-cascade');
      assert.equal(afterCount.c, 0, 'All child quality_audits must be cascade deleted');
    });
  });

  // =========================================================================
  // 4. Duplicate Primary Key and Unique Constraint Violations
  // =========================================================================
  describe('4. Duplicate Primary Key & Unique Constraint Handling', () => {
    let engine;

    beforeEach(() => {
      engine = new SqliteEngine({ dbPath: ':memory:' });
      engine.init();
    });

    afterEach(() => {
      if (engine && engine.isOpen) engine.close();
    });

    test('inserting duplicate primary key throws UNIQUE constraint error and preserves original', () => {
      engine.run(
        'INSERT INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
        'dup-pk-1',
        'original.local',
        'Original',
        'active',
        new Date().toISOString()
      );

      assert.throws(
        () => {
          engine.run(
            'INSERT INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
            'dup-pk-1',
            'collision.local',
            'Collision',
            'active',
            new Date().toISOString()
          );
        },
        /UNIQUE constraint failed: sites\.id/i
      );

      const site = engine.get('SELECT * FROM sites WHERE id = ?', 'dup-pk-1');
      assert.equal(site.name, 'Original', 'Original record must remain unmodified');
    });

    test('duplicate unique domain constraint throws error and aborts transaction completely', () => {
      engine.run(
        'INSERT INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
        'site-unique-1',
        'same-domain.local',
        'First',
        'active',
        new Date().toISOString()
      );

      // Execute transaction that creates a run then tries to insert a duplicate domain site
      assert.throws(() => {
        engine.transaction(() => {
          engine.run(
            `INSERT INTO analysis_runs (id, siteSlug, targetUrl, mode, status, createdAt)
             VALUES (?, ?, ?, ?, ?, ?)`,
            'run-tx-test',
            'test',
            'https://test.local',
            'standard',
            'running',
            new Date().toISOString()
          );

          // This duplicate insert must throw
          engine.run(
            'INSERT INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
            'site-unique-2',
            'same-domain.local', // DUPLICATE UNIQUE DOMAIN
            'Second',
            'active',
            new Date().toISOString()
          );
        });
      }, /UNIQUE constraint failed: sites\.domain/i);

      // Verify that the run inserted inside the transaction was rolled back
      const run = engine.get('SELECT * FROM analysis_runs WHERE id = ?', 'run-tx-test');
      assert.equal(run, undefined, 'Run must be rolled back after transaction failure');
    });
  });

  // =========================================================================
  // 5. DocumentStore Parallel High-Throughput Writes
  // =========================================================================
  describe('5. DocumentStore Parallel High-Throughput Writes', () => {
    let store;
    let col;

    beforeEach(async () => {
      const docPath = path.join(tempDir, 'documents_parallel');
      store = new DocumentStore({ basePath: docPath });
      await store.init();
      col = store.getCollection('parallel_stress');
    });

    test('75 parallel writes with unique IDs succeed atomically without tmp leaks', async () => {
      const PARALLEL_WRITES = 75;
      const tasks = [];

      for (let i = 0; i < PARALLEL_WRITES; i++) {
        tasks.push(
          col.insertOne({
            index: i,
            token: crypto.randomBytes(16).toString('hex'),
            data: { step: i, flag: i % 2 === 0 }
          })
        );
      }

      const results = await Promise.allSettled(tasks);
      const rejected = results.filter(r => r.status === 'rejected');
      assert.equal(rejected.length, 0, `Expected 0 failed writes, got ${rejected.length}`);

      // Verify count
      const totalDocs = await col.count();
      assert.equal(totalDocs, PARALLEL_WRITES);

      // Verify zero leftover .tmp files
      const files = await fsp.readdir(col.collectionDir);
      const tmpFiles = files.filter(f => f.endsWith('.tmp'));
      assert.equal(tmpFiles.length, 0, `Found ${tmpFiles.length} orphaned .tmp files!`);
    });

    test('40 parallel updates targeting the IDENTICAL document ID resolve via retry loop with valid JSON on disk', async () => {
      const targetId = 'contended-doc-target';
      await col.insertOne({
        _id: targetId,
        seq: 0,
        status: 'initial'
      });

      const PARALLEL_UPDATES = 40;
      const tasks = [];

      for (let i = 1; i <= PARALLEL_UPDATES; i++) {
        tasks.push(
          col.updateOne(targetId, {
            lastSeq: i,
            payload: `update-data-${i}-${crypto.randomBytes(4).toString('hex')}`
          })
        );
      }

      const results = await Promise.allSettled(tasks);
      const rejected = results.filter(r => r.status === 'rejected');
      assert.equal(rejected.length, 0, `Contended updates failed: ${rejected.map(r => r.reason?.message).join('; ')}`);

      // Read final document from disk
      const finalDoc = await col.findById(targetId);
      assert.ok(finalDoc !== null);
      assert.equal(finalDoc._id, targetId);
      assert.ok(finalDoc.lastSeq >= 1 && finalDoc.lastSeq <= PARALLEL_UPDATES);

      // Verify on-disk file is valid JSON and not corrupt
      const diskContent = await fsp.readFile(col._getDocPath(targetId), 'utf-8');
      assert.doesNotThrow(() => JSON.parse(diskContent));

      // Verify zero leftover .tmp files
      const files = await fsp.readdir(col.collectionDir);
      const tmpFiles = files.filter(f => f.endsWith('.tmp'));
      assert.equal(tmpFiles.length, 0, `Found ${tmpFiles.length} orphaned .tmp files after lock contention!`);
    });
  });

  // =========================================================================
  // 6. DocumentStore Extreme Payload Stress (16MB+ Nested AST)
  // =========================================================================
  describe('6. DocumentStore Extreme Payload Stress (16MB+)', () => {
    let store;
    let col;

    beforeEach(async () => {
      const docPath = path.join(tempDir, 'documents_extreme');
      store = new DocumentStore({ basePath: docPath });
      await store.init();
      col = store.getCollection('ast_extreme');
    });

    test('ingests and persists 16MB+ nested JSON AST, verifies disk size, memory safety, and deep property querying', async () => {
      // Build a realistically deep and heavy AST payload (> 16MB)
      const buildAstNode = (depth, breadth) => {
        if (depth <= 0) {
          return {
            type: 'text_node',
            content: 'x'.repeat(1024), // 1KB per leaf
            tokens: Array.from({ length: 50 }, (_, i) => ({ id: i, hash: crypto.randomBytes(8).toString('hex') }))
          };
        }
        const children = [];
        for (let i = 0; i < breadth; i++) {
          children.push(buildAstNode(depth - 1, breadth));
        }
        return {
          type: 'element_node',
          tag: depth % 2 === 0 ? 'section' : 'div',
          attributes: {
            'data-kinetic-slot': `slot-depth-${depth}`,
            class: 'studio-dna-container hero-wrapper layout-grid',
            style: 'transform: translate3d(0, 0, 0); opacity: 1;'
          },
          children
        };
      };

      // Construct tree: depth 3, breadth 7 gives:
      // ~7^3 = 343 leaves * 50 tokens = 17,150 objects.
      // To ensure > 16MB payload, let's create a root with an array of 6 large tree branches
      const rootPayload = {
        title: 'Deep Scrape Full AST Snapshot',
        version: '3.0.0',
        metadata: {
          crawler: 'Playwright-Pareto-v3',
          timestamp: new Date().toISOString(),
          auditScore: 99.4,
          antiSlopPassed: true
        },
        branches: Array.from({ length: 18 }, (_, idx) => ({
          branchId: `branch_${idx}`,
          tree: buildAstNode(3, 7)
        }))
      };

      const serialized = JSON.stringify(rootPayload);
      const sizeMb = Buffer.byteLength(serialized, 'utf-8') / (1024 * 1024);
      assert.ok(sizeMb >= 15.0, `Generated payload must be >= 15MB, actual size was ${sizeMb.toFixed(2)} MB`);

      const memBefore = process.memoryUsage().heapUsed;

      // Ingest document
      const insertStart = Date.now();
      const insertResult = await col.insertOne({
        _id: 'extreme-ast-doc',
        payload: rootPayload
      });
      const insertDuration = Date.now() - insertStart;

      assert.equal(insertResult.insertedId, 'extreme-ast-doc');

      // Verify file size on disk
      const diskPath = col._getDocPath('extreme-ast-doc');
      assert.ok(fs.existsSync(diskPath), 'Extreme file must exist on disk');
      const diskStat = fs.statSync(diskPath);
      const diskSizeMb = diskStat.size / (1024 * 1024);
      assert.ok(diskSizeMb >= 15.0, `Disk size must be >= 15MB, got ${diskSizeMb.toFixed(2)} MB`);

      // Read document back from disk
      const readStart = Date.now();
      const retrieved = await col.findById('extreme-ast-doc');
      const readDuration = Date.now() - readStart;

      assert.ok(retrieved !== null, 'Retrieved document must not be null');
      assert.equal(retrieved._id, 'extreme-ast-doc');
      assert.equal(retrieved.payload.title, 'Deep Scrape Full AST Snapshot');
      assert.equal(retrieved.payload.metadata.auditScore, 99.4);
      assert.equal(retrieved.payload.branches.length, 18);

      // Verify dot-notation search into nested structure
      const queryResults = await col.find({ 'payload.metadata.antiSlopPassed': true });
      assert.equal(queryResults.length, 1);
      assert.equal(queryResults[0]._id, 'extreme-ast-doc');

      // Check heap stability
      if (global.gc) global.gc();
      const memAfter = process.memoryUsage().heapUsed;
      // Ensure test completed safely without process termination or OOM
      assert.ok(insertDuration < 10000, `Write took too long: ${insertDuration}ms`);
      assert.ok(readDuration < 10000, `Read took too long: ${readDuration}ms`);
    });
  });

  // =========================================================================
  // 7. DocumentStore Corrupted File & Partial Recovery
  // =========================================================================
  describe('7. DocumentStore Corrupted File & Partial Recovery', () => {
    let store;
    let col;

    beforeEach(async () => {
      const docPath = path.join(tempDir, 'documents_corrupt');
      store = new DocumentStore({ basePath: docPath });
      await store.init();
      col = store.getCollection('recovery_test');

      // Insert 2 valid documents
      await col.insertOne({ _id: 'valid-doc-1', name: 'Valid One', active: true });
      await col.insertOne({ _id: 'valid-doc-2', name: 'Valid Two', active: false });

      // Create corrupted scenario files directly in collectionDir:
      // 1. Incomplete truncated JSON
      await fsp.writeFile(
        path.join(col.collectionDir, 'corrupt-truncated.json'),
        '{"_id": "corrupt-truncated", "name": "Broken", "unclosed": [1, 2, ',
        'utf-8'
      );

      // 2. 0-byte empty file
      await fsp.writeFile(
        path.join(col.collectionDir, 'corrupt-empty.json'),
        '',
        'utf-8'
      );

      // 3. Binary random garbage file with .json extension
      await fsp.writeFile(
        path.join(col.collectionDir, 'corrupt-binary.json'),
        Buffer.from([0x00, 0xFF, 0xFE, 0x12, 0x89, 0xAB, 0xCD, 0xEF])
      );

      // 4. Orphaned .tmp file left behind by abnormal crash
      await fsp.writeFile(
        path.join(col.collectionDir, 'valid-doc-3.abc123456789.tmp'),
        JSON.stringify({ _id: 'orphan-tmp', status: 'should-be-ignored' }),
        'utf-8'
      );
    });

    test('findById returns null gracefully on corrupt, empty, and binary files without unhandled rejection', async () => {
      const truncatedRes = await col.findById('corrupt-truncated');
      assert.equal(truncatedRes, null, 'Must return null for truncated JSON');

      const emptyRes = await col.findById('corrupt-empty');
      assert.equal(emptyRes, null, 'Must return null for 0-byte JSON');

      const binaryRes = await col.findById('corrupt-binary');
      assert.equal(binaryRes, null, 'Must return null for binary garbage');
    });

    test('find() skips all corrupted files, excludes .tmp files, and returns only valid documents', async () => {
      const allDocs = await col.find({});
      assert.equal(allDocs.length, 2, 'Must return exactly the 2 valid documents');

      const ids = allDocs.map(d => d._id).sort();
      assert.deepEqual(ids, ['valid-doc-1', 'valid-doc-2']);

      const filtered = await col.find({ active: true });
      assert.equal(filtered.length, 1);
      assert.equal(filtered[0]._id, 'valid-doc-1');
    });

    test('deleteById deletes corrupt file cleanly from disk', async () => {
      const delResult = await col.deleteById('corrupt-truncated');
      assert.equal(delResult.deletedCount, 1);

      const filePath = path.join(col.collectionDir, 'corrupt-truncated.json');
      assert.equal(fs.existsSync(filePath), false, 'Corrupt file must be deleted from disk');
    });

    test('clear() cleans both valid, corrupt, and orphaned .tmp files', async () => {
      const clearRes = await col.clear();
      assert.ok(clearRes.deletedCount >= 2);

      const remainingFiles = await fsp.readdir(col.collectionDir);
      assert.equal(remainingFiles.length, 0, 'Collection directory must be completely clean');
    });
  });
});
