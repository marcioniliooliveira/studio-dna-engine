/**
 * test/challenger-m2-3.test.js
 *
 * Empirical Adversarial Challenger Suite for Milestone 2 Remediation (Iteration 2).
 * Executed by challenger_m2_3.
 *
 * Deeply challenges:
 * 1. Concurrency & PRAGMA Ordering:
 *    - 8 concurrent worker threads continuously initializing SqliteEngine and writing simultaneously under heavy load.
 *    - Interleaved concurrent async transactions on the SAME SqliteEngine instance with nested savepoints and intentional inner rollbacks.
 * 2. Ingestion Idempotency & Catalog Uniqueness:
 *    - 5x sequential syncAll({ scanFiles: true }) executions: strictly 0 duplicate rows and filesCount: 0 on runs 2..5.
 *    - Strict enforcement of UNIQUE(siteSlug, relativePath) constraint on raw INSERT.
 *    - File modification detection: update in-place without row count change or duplicate creation.
 * 3. Windows NTFS Reserved Characters:
 *    - Exhaustive rejection of NTFS reserved characters (<, >, :, ", |, ?, *, control chars, ADS syntax) in DocumentStore.
 */

'use strict';

const { describe, test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const fsp = fs.promises;
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { Worker } = require('node:worker_threads');

const SqliteEngine = require('../src/persistence/sqlite-engine');
const DocumentStore = require('../src/persistence/document-store');
const HybridRepository = require('../src/persistence/hybrid-repository');
const SyncIngestor = require('../src/persistence/sync-ingestor');

describe('Empirical Adversarial Verification Suite (challenger_m2_3)', () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger_m2_3_'));
  });

  afterEach(async () => {
    if (tempDir && fs.existsSync(tempDir)) {
      try {
        await fsp.rm(tempDir, { recursive: true, force: true });
      } catch (_) {}
    }
  });

  // =========================================================================
  // Challenge 1: Concurrency & PRAGMA Ordering Stress
  // =========================================================================
  describe('Challenge 1: Concurrency & PRAGMA Ordering Stress', () => {
    test('1.1 8 concurrent worker threads repeatedly initialize SqliteEngine and execute transactions simultaneously without database locked error', async () => {
      const dbPath = path.join(tempDir, 'worker_concurrency.db');

      // Bootstrap db
      const boot = new SqliteEngine({ dbPath, busyTimeout: 10000 });
      boot.init();
      boot.run('INSERT INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
        'site-root', 'root.local', 'Root', 'active', new Date().toISOString());
      boot.close();

      const workerCode = `
        const { workerData, parentPort } = require('node:worker_threads');
        const SqliteEngine = require(workerData.enginePath);

        async function run() {
          try {
            for (let iter = 0; iter < workerData.iterations; iter++) {
              // Intentionally instantiate fresh engine on each iteration to stress PRAGMA busy_timeout ordering
              const engine = new SqliteEngine({ dbPath: workerData.dbPath, busyTimeout: 10000 });
              engine.init();

              engine.transaction(() => {
                const runId = 'w' + workerData.workerId + '-iter-' + iter + '-' + Math.random().toString(36).slice(2, 6);
                engine.run(
                  'INSERT INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
                  runId,
                  'site-root',
                  'root',
                  'https://root.local/' + runId,
                  'stress',
                  'passed',
                  new Date().toISOString()
                );
              });

              engine.close();
            }
            parentPort.postMessage({ success: true });
          } catch (err) {
            parentPort.postMessage({ success: false, error: err.message, stack: err.stack });
          }
        }
        run();
      `;

      const numWorkers = 8;
      const iterationsPerWorker = 10;
      const workers = [];

      for (let w = 0; w < numWorkers; w++) {
        workers.push(new Promise((resolve, reject) => {
          const worker = new Worker(workerCode, {
            eval: true,
            workerData: {
              enginePath: path.resolve(__dirname, '../src/persistence/sqlite-engine.js'),
              dbPath,
              workerId: w,
              iterations: iterationsPerWorker
            }
          });
          worker.on('message', msg => {
            if (msg.success) resolve();
            else reject(new Error(`Worker ${w} failed: ${msg.error}\n${msg.stack}`));
          });
          worker.on('error', reject);
        }));
      }

      await Promise.all(workers);

      // Verify all rows written
      const verifyEngine = new SqliteEngine({ dbPath });
      verifyEngine.init();
      const totalRuns = verifyEngine.get('SELECT COUNT(*) as total FROM analysis_runs WHERE siteId = ?', 'site-root');
      assert.equal(totalRuns.total, numWorkers * iterationsPerWorker);
      verifyEngine.close();
    });

    test('1.2 Concurrent async transaction() calls with nested savepoints and inner rollbacks serialize without deadlock', async () => {
      const engine = new SqliteEngine({ dbPath: ':memory:' }).init();
      const now = new Date().toISOString();

      engine.run('INSERT INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
        'site-tx', 'tx.local', 'Tx Site', 'active', now);

      const logs = [];

      // Launch 5 concurrent async transactions on the SAME instance
      const p1 = engine.transaction(async () => {
        logs.push('p1-start');
        await new Promise(r => setTimeout(r, 20));
        engine.run('INSERT INTO analysis_runs (id, siteSlug, targetUrl, mode, status, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
          'run-p1', 'tx', 'https://tx.local/p1', 'async', 'passed', now);

        // Nested savepoint with success
        engine.transaction(() => {
          engine.run('INSERT INTO quality_audits (id, runId, siteSlug, auditType, passed, score, metricsJson, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            'audit-p1-1', 'run-p1', 'tx', 'sec', 1, 99.0, '{}', now);
        });

        // Nested savepoint with handled error rollback
        try {
          engine.transaction(() => {
            engine.run('INSERT INTO quality_audits (id, runId, siteSlug, auditType, passed, score, metricsJson, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
              'audit-p1-fail', 'run-p1', 'tx', 'perf', 0, 10.0, '{}', now);
            throw new Error('Inner rollback simulated');
          });
        } catch (e) {
          logs.push('p1-inner-caught');
        }

        logs.push('p1-end');
        return 'res1';
      });

      const p2 = engine.transaction(async () => {
        logs.push('p2-start');
        await new Promise(r => setTimeout(r, 10));
        engine.run('INSERT INTO analysis_runs (id, siteSlug, targetUrl, mode, status, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
          'run-p2', 'tx', 'https://tx.local/p2', 'async', 'passed', now);
        logs.push('p2-end');
        return 'res2';
      });

      const p3 = engine.transaction(async () => {
        logs.push('p3-start');
        await new Promise(r => setTimeout(r, 5));
        engine.run('INSERT INTO analysis_runs (id, siteSlug, targetUrl, mode, status, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
          'run-p3', 'tx', 'https://tx.local/p3', 'async', 'passed', now);
        logs.push('p3-end');
        return 'res3';
      });

      const [r1, r2, r3] = await Promise.all([p1, p2, p3]);
      assert.equal(r1, 'res1');
      assert.equal(r2, 'res2');
      assert.equal(r3, 'res3');

      // Verify serialization order
      assert.deepEqual(logs, [
        'p1-start', 'p1-inner-caught', 'p1-end',
        'p2-start', 'p2-end',
        'p3-start', 'p3-end'
      ]);

      // Verify data state: run-p1, run-p2, run-p3 exist; audit-p1-1 exists; audit-p1-fail was rolled back
      const runs = engine.all('SELECT id FROM analysis_runs ORDER BY id');
      assert.deepEqual(runs.map(r => r.id), ['run-p1', 'run-p2', 'run-p3']);

      const audits = engine.all('SELECT id FROM quality_audits ORDER BY id');
      assert.deepEqual(audits.map(a => a.id), ['audit-p1-1']);

      engine.close();
    });
  });

  // =========================================================================
  // Challenge 2: Ingestion Idempotency & Catalog Uniqueness
  // =========================================================================
  describe('Challenge 2: Ingestion Idempotency & Catalog Uniqueness', () => {
    test('2.1 syncAll({ scanFiles: true }) executed 5 times maintains identical row count and produces 0 duplicates', async () => {
      const dbPath = path.join(tempDir, 'idempotency_5x.db');
      const docPath = path.join(tempDir, 'idempotency_5x_docs');

      const repo = new HybridRepository({ dbPath, docBasePath: docPath });
      await repo.init();

      const mockCopias = path.join(tempDir, 'mock_copias');
      const mockClientes = path.join(tempDir, 'mock_clientes');
      fs.mkdirSync(mockCopias, { recursive: true });
      fs.mkdirSync(mockClientes, { recursive: true });

      // Create 2 copias sites with files
      for (const slug of ['copia-alpha', 'copia-beta']) {
        const dir = path.join(mockCopias, slug);
        fs.mkdirSync(path.join(dir, 'site'), { recursive: true });
        fs.writeFileSync(path.join(dir, 'site', 'index.html'), `<html>${slug}</html>`);
        fs.writeFileSync(path.join(dir, 'SITE_TYPE.json'), JSON.stringify({ targetUrl: `https://${slug}.com` }));
        fs.writeFileSync(path.join(dir, 'audit-report.json'), JSON.stringify({ score: 95.0, passed: true }));
      }

      // Create 1 cliente site with files
      const clDir = path.join(mockClientes, 'cliente-one');
      fs.mkdirSync(path.join(clDir, 'site'), { recursive: true });
      fs.writeFileSync(path.join(clDir, 'site', 'index.html'), '<html>Cliente</html>');
      fs.writeFileSync(path.join(clDir, 'DNA.md'), '# DNA');
      fs.writeFileSync(path.join(clDir, 'brand-spec.json'), '{"brand": "one"}');

      const ingestor = new SyncIngestor({
        hybridRepo: repo,
        copiasDir: mockCopias,
        clientesDir: mockClientes,
        rootDir: tempDir
      });

      // Run 1: Initial ingest
      const run1 = await ingestor.syncAll({ scanFiles: true });
      assert.ok(run1.filesCount > 0, 'Run 1 must catalog files');
      const expectedFilesCount = run1.filesCount;

      const initialDbCount = repo.sqliteEngine.get('SELECT COUNT(*) as c FROM file_catalog').c;
      assert.equal(initialDbCount, expectedFilesCount);

      // Runs 2 to 5: Must return filesCount: 0 and DB count must remain strictly constant
      for (let runIdx = 2; runIdx <= 5; runIdx++) {
        const runN = await ingestor.syncAll({ scanFiles: true });
        assert.equal(runN.filesCount, 0, `Run ${runIdx} must return filesCount: 0`);
        assert.equal(runN.sitesCount, 0, `Run ${runIdx} must return sitesCount: 0`);
        assert.equal(runN.runsCount, 0, `Run ${runIdx} must return runsCount: 0`);
        assert.equal(runN.auditsCount, 0, `Run ${runIdx} must return auditsCount: 0`);

        const currentDbCount = repo.sqliteEngine.get('SELECT COUNT(*) as c FROM file_catalog').c;
        assert.equal(currentDbCount, initialDbCount, `Run ${runIdx} must not change file_catalog row count`);
      }

      repo.close();
    });

    test('2.2 Raw direct duplicate INSERT into file_catalog violates UNIQUE(siteSlug, relativePath)', () => {
      const engine = new SqliteEngine({ dbPath: ':memory:' }).init();
      const now = new Date().toISOString();

      engine.run(
        'INSERT INTO file_catalog (id, siteSlug, relativePath, fileType, sizeBytes, sha256, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
        'file-1', 'test-site', 'site/index.html', 'html', 100, 'hash1', now
      );

      // Attempting to insert a duplicate (siteSlug, relativePath) with a different ID must throw UNIQUE constraint error
      assert.throws(() => {
        engine.run(
          'INSERT INTO file_catalog (id, siteSlug, relativePath, fileType, sizeBytes, sha256, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
          'file-2', 'test-site', 'site/index.html', 'html', 100, 'hash1', now
        );
      }, /UNIQUE constraint failed: file_catalog\.siteSlug, file_catalog\.relativePath/i);

      engine.close();
    });

    test('2.3 Modified file content updates file_catalog record in-place without duplicating row count', async () => {
      const dbPath = path.join(tempDir, 'mod_sync.db');
      const docPath = path.join(tempDir, 'mod_sync_docs');

      const repo = new HybridRepository({ dbPath, docBasePath: docPath });
      await repo.init();

      const mockClientes = path.join(tempDir, 'mod_clientes');
      const siteDir = path.join(mockClientes, 'mod-site');
      fs.mkdirSync(path.join(siteDir, 'site'), { recursive: true });
      const htmlPath = path.join(siteDir, 'site', 'index.html');
      fs.writeFileSync(htmlPath, '<html>Original Content</html>');

      const ingestor = new SyncIngestor({
        hybridRepo: repo,
        copiasDir: path.join(tempDir, 'nonexistent_copias'),
        clientesDir: mockClientes,
        rootDir: tempDir
      });

      // Run 1
      const res1 = await ingestor.syncAll({ scanFiles: true });
      assert.equal(res1.filesCount, 1);
      const originalRecord = repo.sqliteEngine.get('SELECT * FROM file_catalog WHERE siteSlug = ?', 'mod-site');
      assert.ok(originalRecord);
      const originalSha = originalRecord.sha256;

      // Modify file content
      fs.writeFileSync(htmlPath, '<html>MODIFIED Content with longer byte length</html>');

      // Run 2: Sync again
      const res2 = await ingestor.syncAll({ scanFiles: true });
      assert.equal(res2.filesCount, 0, 'Updated existing file does not count as new file');

      // Verify row count is STILL 1
      const count = repo.sqliteEngine.get('SELECT COUNT(*) as c FROM file_catalog WHERE siteSlug = ?', 'mod-site').c;
      assert.equal(count, 1, 'Row count must stay 1');

      // Verify record was updated in-place
      const updatedRecord = repo.sqliteEngine.get('SELECT * FROM file_catalog WHERE siteSlug = ?', 'mod-site');
      assert.equal(updatedRecord.id, originalRecord.id, 'ID must be preserved');
      assert.notEqual(updatedRecord.sha256, originalSha, 'SHA-256 must be updated');
      assert.ok(updatedRecord.sizeBytes > originalRecord.sizeBytes, 'sizeBytes must be updated');

      repo.close();
    });
  });

  // =========================================================================
  // Challenge 3: Windows NTFS Reserved Characters
  // =========================================================================
  describe('Challenge 3: Windows NTFS Reserved Characters', () => {
    test('3.1 DocumentStore rejects all NTFS reserved characters (<, >, :, ", |, ?, *, control chars)', async () => {
      const docPath = path.join(tempDir, 'ntfs_docs');
      const store = new DocumentStore({ basePath: docPath });
      await store.init();
      const col = store.getCollection('ntfs_test');

      const reservedChars = [':', '<', '>', '"', '|', '?', '*', '\x00', '\x1F', '\x0A'];

      for (const char of reservedChars) {
        const invalidId = `doc${char}test`;
        await assert.rejects(
          async () => {
            await col.insertOne({ _id: invalidId, test: true });
          },
          /Windows NTFS reserved characters/i,
          `Must reject ID containing character "${char}" (charCode: ${char.charCodeAt(0)})`
        );
      }
    });

    test('3.2 DocumentStore rejects Alternate Data Stream (ADS) syntax and colon paths', async () => {
      const docPath = path.join(tempDir, 'ads_docs');
      const store = new DocumentStore({ basePath: docPath });
      await store.init();
      const col = store.getCollection('ads_test');

      const adsIds = [
        'doc.json:hidden_stream',
        'report::$DATA',
        'test:zone.identifier',
        'C:drive_prefix'
      ];

      for (const adsId of adsIds) {
        await assert.rejects(
          async () => {
            await col.insertOne({ _id: adsId, payload: 'malicious' });
          },
          /Invalid document ID.*not permitted/i,
          `Must reject ADS ID: ${adsId}`
        );

        // findById gracefully returns null for invalid IDs
        const found = await col.findById(adsId);
        assert.equal(found, null, `findById must return null for invalid ADS ID: ${adsId}`);

        // deleteById returns deletedCount: 0
        const del = await col.deleteById(adsId);
        assert.equal(del.deletedCount, 0);
      }
    });

    test('3.3 Valid IDs (UUIDs, hashes, dashes, underscores, dots) succeed cleanly', async () => {
      const docPath = path.join(tempDir, 'valid_docs');
      const store = new DocumentStore({ basePath: docPath });
      await store.init();
      const col = store.getCollection('valid_test');

      const validIds = [
        crypto.randomUUID(),
        'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        'run_2026-11-06_v1.0.0',
        'doc-abc_123.xyz'
      ];

      for (const id of validIds) {
        const ins = await col.insertOne({ _id: id, val: id });
        assert.equal(ins.insertedId, id);

        const found = await col.findById(id);
        assert.ok(found);
        assert.equal(found.val, id);
      }

      assert.equal(await col.count(), validIds.length);
    });
  });
});
