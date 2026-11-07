/**
 * test/e2e/challenger-m6-tier5-coverage.test.js
 *
 * Tier 5: Adversarial Hardening & Boundary Stress Test Battery.
 * Milestone 6 Phase 2 Quality Gate.
 *
 * Scope of Adversarial Verification:
 * 1. Persistence Layer:
 *    - SQLite WAL concurrency under 25+ parallel async transactions with savepoints
 *    - Foreign key constraints (CASCADE and SET NULL) integrity
 *    - Nested savepoint rollback isolation (inner rollback leaves outer intact)
 *    - DocumentStore crash safety & atomic writes under heavy concurrent contention
 *    - DocumentStore path traversal rejection, NTFS ADS stream defense, and illegal char sanitization
 *    - DocumentStore deep dot-notation query filtering & prototype pollution immunization
 * 2. Preview Server & Control Panel REST API:
 *    - /api/v3/runs: Extreme pagination fuzzing (page < 0, page > 1e6, limit clamping, NaN, SQLi)
 *    - /api/v3/runs/:runId: Non-existent IDs, invalid characters, raw AST document payload retrieval
 *    - /api/v3/clients/:slug/audits: Malicious slug injection & path traversal attempts (HTTP 400)
 *    - /api/v3/files/content: Comprehensive directory traversal battery (encoded, double-encoded, null-byte, OS-level)
 *    - /api/v3/admin/sync: HTTP method gating (GET rejected, POST authorized)
 *    - Authorization & Header gating: timing-safe Bearer comparison, body size limits (>64KB -> 413), malformed JSON (400)
 * 3. DevOps Pipeline & Container Security:
 *    - Multi-stage Dockerfile AST: unprivileged 'pwuser' enforcement, exposed port 4000, persistent volume declarations
 *    - Container healthcheck probe mechanics with deterministic exit code semantics
 *    - GitHub Actions CI/CD workflow DAG dependency sequencing (lint -> test -> docker-build) and strict concurrency
 * 4. Repository & Client Isolation Invariants:
 *    - Zero modifications to reference evidence (`copias/`) and client files (`clientes/`)
 *
 * Runner: node:test + node:assert/strict (zero external runtime dependencies)
 */

'use strict';

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const fsp = fs.promises;
const path = require('node:path');
const http = require('node:http');
const os = require('node:os');
const crypto = require('node:crypto');
const { execSync } = require('node:child_process');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const SqliteEngine = require('../../src/persistence/sqlite-engine');
const DocumentStore = require('../../src/persistence/document-store');
const HybridRepository = require('../../src/persistence/hybrid-repository');
const { handleV3Persistence } = require('../../src/server/routes/v3-persistence');
const {
  isMutationAuthorized,
  readJsonBody,
  assertSafeSlug,
  resolveStaticPath,
  isPrivateOrLocalIp
} = require('../../src/server/security');

// ============================================================================
// Helper: Ephemeral HTTP Server for REST API testing
// ============================================================================

class EphemeralApiServer {
  constructor(options = {}) {
    this.hybridRepo = options.hybridRepo;
    this.rootDir = options.rootDir || PROJECT_ROOT;
    this.copiasDir = options.copiasDir || path.join(this.rootDir, 'copias');
    this.clientesDir = options.clientesDir || path.join(this.rootDir, 'clientes');
    this.server = null;
    this.port = null;
    this.sockets = new Set();
  }

  async start() {
    return new Promise((resolve, reject) => {
      this.server = http.createServer(async (req, res) => {
        const urlObj = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);
        const pathname = urlObj.pathname;

        const handled = await handleV3Persistence(req, res, pathname, {
          hybridRepo: this.hybridRepo,
          rootDir: this.rootDir,
          copiasDir: this.copiasDir,
          clientesDir: this.clientesDir,
          urlObj
        });

        if (!handled) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Route not found' }));
        }
      });

      this.server.on('connection', sock => {
        this.sockets.add(sock);
        sock.on('close', () => this.sockets.delete(sock));
      });

      this.server.listen(0, '127.0.0.1', () => {
        this.port = this.server.address().port;
        resolve(`http://127.0.0.1:${this.port}`);
      });

      this.server.on('error', reject);
    });
  }

  async stop() {
    return new Promise(resolve => {
      for (const sock of this.sockets) {
        sock.destroy();
      }
      this.sockets.clear();
      if (this.server) {
        this.server.close(() => resolve());
      } else {
        resolve();
      }
    });
  }
}

// ============================================================================
// Suite 1: Persistence Concurrency, Crash Safety & ACID Invariants (R3)
// ============================================================================

describe('Suite 1: Persistence Concurrency, Crash Safety & ACID Invariants (R3)', () => {
  let tmpDbDir;
  let tmpDbPath;
  let tmpDocDir;

  before(() => {
    tmpDbDir = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger_m6_db_'));
    tmpDbPath = path.join(tmpDbDir, 'test_concurrency.db');
    tmpDocDir = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger_m6_docs_'));
  });

  after(() => {
    try { fs.rmSync(tmpDbDir, { recursive: true, force: true }); } catch (_) {}
    try { fs.rmSync(tmpDocDir, { recursive: true, force: true }); } catch (_) {}
  });

  test('TC-T5-01: SQLite WAL High-Concurrency Stress under 25 parallel async transactions', async () => {
    const engine = new SqliteEngine({ dbPath: tmpDbPath, busyTimeout: 5000 });
    engine.init();

    // Verify WAL mode is active
    const journalMode = engine.get('PRAGMA journal_mode;');
    assert.strictEqual(journalMode.journal_mode.toLowerCase(), 'wal', 'Journal mode must be WAL');

    const concurrencyCount = 25;
    const taskPromises = [];

    for (let i = 0; i < concurrencyCount; i++) {
      taskPromises.push(
        engine.transaction(async () => {
          const siteId = `site-stress-${i}`;
          const runId = `run-stress-${i}`;
          const auditId = `audit-stress-${i}`;
          const now = new Date().toISOString();

          // Write site
          engine.run(
            'INSERT OR REPLACE INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)',
            siteId,
            `stress-${i}.local`,
            `stress-${i}`,
            'active',
            now
          );

          // Write run
          engine.run(
            'INSERT INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, model, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            runId,
            siteId,
            `stress-${i}`,
            `https://stress-${i}.local`,
            'stress-wal',
            'pareto-v3',
            'passed',
            now
          );

          // Write audit
          engine.run(
            'INSERT INTO quality_audits (id, runId, siteSlug, auditType, passed, score, metricsJson, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            auditId,
            runId,
            `stress-${i}`,
            'anti-slop',
            1,
            98.5,
            JSON.stringify({ iteration: i, score: 98.5 }),
            now
          );

          return { i, runId };
        })
      );
    }

    const results = await Promise.all(taskPromises);
    assert.strictEqual(results.length, concurrencyCount, 'All 25 parallel transactions must resolve');

    // Verify all records were persisted
    const siteCount = engine.get("SELECT COUNT(*) as c FROM sites WHERE id LIKE 'site-stress-%'");
    const runCount = engine.get("SELECT COUNT(*) as c FROM analysis_runs WHERE id LIKE 'run-stress-%'");
    const auditCount = engine.get("SELECT COUNT(*) as c FROM quality_audits WHERE id LIKE 'audit-stress-%'");

    assert.strictEqual(siteCount.c, concurrencyCount, 'All sites must be written without loss');
    assert.strictEqual(runCount.c, concurrencyCount, 'All runs must be written without loss');
    assert.strictEqual(auditCount.c, concurrencyCount, 'All audits must be written without loss');

    engine.close();
  });

  test('TC-T5-02: SQLite Foreign Key Constraints & Cascading Deletions', () => {
    const engine = new SqliteEngine({ dbPath: tmpDbPath });
    engine.init();

    // Verify foreign keys are enabled
    const fk = engine.get('PRAGMA foreign_keys;');
    assert.strictEqual(Number(fk.foreign_keys), 1, 'Foreign keys must be strictly enabled');

    // Insert test graph
    const siteId = 'site-cascade-test';
    const runId = 'run-cascade-test';
    const auditId = 'audit-cascade-test';
    const now = new Date().toISOString();

    engine.run('INSERT INTO sites (id, domain, name, status, createdAt) VALUES (?, ?, ?, ?, ?)', siteId, 'cascade.local', 'cascade', 'active', now);
    engine.run('INSERT INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, model, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', runId, siteId, 'cascade', 'https://cascade.local', 'm', 'm', 'passed', now);
    engine.run('INSERT INTO quality_audits (id, runId, siteSlug, auditType, passed, score, metricsJson, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', auditId, runId, 'cascade', 'audit', 1, 100, '{}', now);

    // Deleting run must CASCADE delete quality_audits
    engine.run('DELETE FROM analysis_runs WHERE id = ?', runId);
    const auditCheck = engine.get('SELECT * FROM quality_audits WHERE id = ?', auditId);
    assert.strictEqual(auditCheck, undefined, 'quality_audits must be deleted via ON DELETE CASCADE');

    // Re-insert run and test ON DELETE SET NULL for sites
    engine.run('INSERT INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, model, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', runId, siteId, 'cascade', 'https://cascade.local', 'm', 'm', 'passed', now);
    engine.run('DELETE FROM sites WHERE id = ?', siteId);
    const runCheck = engine.get('SELECT siteId FROM analysis_runs WHERE id = ?', runId);
    assert.strictEqual(runCheck.siteId, null, 'analysis_runs.siteId must become null via ON DELETE SET NULL');

    engine.close();
  });

  test('TC-T5-03: SQLite Nested Savepoint Rollback Isolation', () => {
    const engine = new SqliteEngine({ dbPath: tmpDbPath });
    engine.init();

    const outerRunId = 'run-outer-tx';
    const innerRunId = 'run-inner-failed';
    const now = new Date().toISOString();

    engine.transaction(() => {
      // Outer transaction write
      engine.run(
        'INSERT INTO analysis_runs (id, siteSlug, targetUrl, mode, model, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
        outerRunId, 'outer-slug', 'https://outer.local', 'm', 'm', 'passed', now
      );

      // Inner savepoint write that fails and is caught
      try {
        engine.transaction(() => {
          engine.run(
            'INSERT INTO analysis_runs (id, siteSlug, targetUrl, mode, model, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
            innerRunId, 'inner-slug', 'https://inner.local', 'm', 'm', 'failed', now
          );
          throw new Error('Synthetic failure inside inner savepoint');
        });
      } catch (err) {
        assert.ok(err.message.includes('Synthetic failure'), 'Inner error caught');
      }
    });

    // Outer record must exist; inner record must have rolled back
    const outerRecord = engine.get('SELECT * FROM analysis_runs WHERE id = ?', outerRunId);
    const innerRecord = engine.get('SELECT * FROM analysis_runs WHERE id = ?', innerRunId);

    assert.ok(outerRecord, 'Outer transaction write must be committed');
    assert.strictEqual(innerRecord, undefined, 'Inner savepoint write must be rolled back');

    engine.close();
  });

  test('TC-T5-04: DocumentStore High-Contention Atomic Writes (30 concurrent updates to single document)', async () => {
    const docStore = new DocumentStore({ basePath: tmpDocDir });
    await docStore.init();

    const col = docStore.getCollection('high_contention');
    const targetDocId = 'shared-document-stress';

    // Initial insert
    await col.insertOne({ _id: targetDocId, count: 0, updates: [] });

    const numParallelWrites = 30;
    const writePromises = [];

    for (let i = 1; i <= numParallelWrites; i++) {
      writePromises.push(
        col.updateOne(targetDocId, {
          latestWriter: `worker-${i}`,
          timestamp: Date.now()
        })
      );
    }

    const results = await Promise.all(writePromises);
    assert.strictEqual(results.length, numParallelWrites, 'All concurrent writes must complete');

    // Verify document on disk is valid, non-empty JSON
    const finalDoc = await col.findById(targetDocId);
    assert.ok(finalDoc, 'Final document must exist');
    assert.strictEqual(finalDoc._id, targetDocId, 'Document ID must be preserved');
    assert.ok(finalDoc.latestWriter.startsWith('worker-'), 'Final document must have valid writer attribute');

    // Raw file inspection: verify zero .tmp files left behind
    const files = await fsp.readdir(path.join(tmpDocDir, 'high_contention'));
    const tmpFiles = files.filter(f => f.includes('.tmp'));
    assert.strictEqual(tmpFiles.length, 0, 'No leftover .tmp files must remain after atomic writes');
  });

  test('TC-T5-05: DocumentStore Path Traversal & Windows NTFS Reserved Character Defense', async () => {
    const docStore = new DocumentStore({ basePath: tmpDocDir });
    await docStore.init();

    const col = docStore.getCollection('security_defense');

    const maliciousIds = [
      '../../secret',
      '..\\..\\windows\\win.ini',
      'foo/bar',
      'foo\\bar',
      'payload.json:stream',
      'bad<char>',
      'pipe|character',
      'question?mark',
      'asterisk*wildcard',
      'quote"test',
      'null\x00byte'
    ];

    for (const badId of maliciousIds) {
      // 1. insertOne must throw
      await assert.rejects(
        async () => {
          await col.insertOne({ _id: badId, payload: 'malicious' });
        },
        /Invalid document ID/i,
        `Document ID "${badId}" must be rejected by insertOne`
      );

      // 2. findById must safely return null without throwing or traversing
      const res = await col.findById(badId);
      assert.strictEqual(res, null, `findById with "${badId}" must return null`);

      // 3. deleteById must safely return { deletedCount: 0 }
      const del = await col.deleteById(badId);
      assert.strictEqual(del.deletedCount, 0, `deleteById with "${badId}" must return deletedCount: 0`);
    }

    // Malicious collection name test
    assert.throws(
      () => docStore.getCollection('../escape_dir'),
      /Invalid collection name/i,
      'Path traversal in collection name must be rejected'
    );
  });

  test('TC-T5-06: DocumentStore Dot-Notation Query Filtering & Prototype Pollution Defense', async () => {
    const docStore = new DocumentStore({ basePath: tmpDocDir });
    await docStore.init();
    const col = docStore.getCollection('dot_query_test');

    await col.insertOne({
      _id: 'doc-complex-1',
      site: 'alpha',
      metrics: {
        scores: {
          performance: { lcp: 1200, score: 98 },
          accessibility: 100
        },
        tags: ['fast', 'pwa']
      }
    });

    await col.insertOne({
      _id: 'doc-complex-2',
      site: 'beta',
      metrics: {
        scores: {
          performance: { lcp: 3500, score: 65 },
          accessibility: 90
        },
        tags: ['legacy']
      }
    });

    // 1. Deep dot-notation match
    const fastDocs = await col.find({ 'metrics.scores.performance.lcp': 1200 });
    assert.strictEqual(fastDocs.length, 1);
    assert.strictEqual(fastDocs[0]._id, 'doc-complex-1');

    // 2. Missing intermediate path does not crash and returns 0 matches
    const nonExistent = await col.find({ 'metrics.missing.deep.property': 'value' });
    assert.strictEqual(nonExistent.length, 0);

    // 3. Primitive value in path does not crash
    const primitiveTraverse = await col.find({ 'metrics.scores.accessibility.nested': 123 });
    assert.strictEqual(primitiveTraverse.length, 0);

    // 4. Prototype pollution keys in filter are safe
    const protoQuery = await col.find({ '__proto__.polluted': true });
    assert.strictEqual(protoQuery.length, 0);
    assert.strictEqual(Object.prototype.polluted, undefined, 'Global Object prototype must NOT be polluted');
  });
});

// ============================================================================
// Suite 2: Preview Server & Control Panel REST API Adversarial Fuzzing (R2 & R3)
// ============================================================================

describe('Suite 2: Preview Server & Control Panel REST API Adversarial Fuzzing (R2 & R3)', () => {
  let hybridRepo;
  let apiServer;
  let baseUrl;
  let seededRunId;

  before(async () => {
    hybridRepo = new HybridRepository({ dbPath: ':memory:' });
    await hybridRepo.init();

    // Seed test run with raw AST payload
    const start = await hybridRepo.startAnalysisRun({
      siteSlug: 'challenger-test-brand',
      targetUrl: 'https://challenger-test.com',
      mode: 'standard',
      model: 'pareto-v3'
    });
    seededRunId = start.runId;

    await hybridRepo.completeAnalysisRun(seededRunId, {
      status: 'passed',
      outputTokens: 4500,
      costUsd: 0.045,
      rawScrapePayload: {
        astNodes: 120,
        kineticGrammar: { stages: 4 },
        title: 'Challenger Test Payload'
      }
    });

    await hybridRepo.recordQualityAudit({
      runId: seededRunId,
      siteSlug: 'challenger-test-brand',
      auditType: 'tier5-adversarial',
      passed: true,
      score: 99.4,
      metrics: { antiSlop: 100, memoryVramMb: 2.1 }
    });

    apiServer = new EphemeralApiServer({ hybridRepo });
    baseUrl = await apiServer.start();
  });

  after(async () => {
    if (apiServer) await apiServer.stop();
    if (hybridRepo) hybridRepo.close();
  });

  test('TC-T5-07: /api/v3/runs Extreme Pagination & SQL Injection Defense', async () => {
    // 1. Extreme negative and zero pages
    const resNeg = await fetch(`${baseUrl}/api/v3/runs?page=-50&limit=-10`);
    assert.strictEqual(resNeg.status, 200, 'Negative page/limit must return HTTP 200 with fallback');
    const dataNeg = await resNeg.json();
    assert.strictEqual(dataNeg.pagination.page, 1, 'Negative page must clamp to 1');
    assert.strictEqual(dataNeg.pagination.limit, 1, 'Negative limit must clamp to 1');

    // 2. Gigantic page number returns empty array gracefully
    const resHuge = await fetch(`${baseUrl}/api/v3/runs?page=99999999&limit=20`);
    assert.strictEqual(resHuge.status, 200);
    const dataHuge = await resHuge.json();
    assert.strictEqual(dataHuge.runs.length, 0, 'Out-of-bounds page must return empty runs array');

    // 3. Limit clamped to maximum 100
    const resLimitClamped = await fetch(`${baseUrl}/api/v3/runs?limit=999999`);
    assert.strictEqual(resLimitClamped.status, 200);
    const dataClamped = await resLimitClamped.json();
    assert.strictEqual(dataClamped.pagination.limit, 100, 'Limit must be clamped to max 100');

    // 4. NaN / non-numeric page parameter
    const resNan = await fetch(`${baseUrl}/api/v3/runs?page=notanumber&limit=abc`);
    assert.strictEqual(resNan.status, 200);
    const dataNan = await resNan.json();
    assert.strictEqual(dataNan.success, true);
    assert.ok(Array.isArray(dataNan.runs));

    // 5. SQL Injection payloads in sortBy and sortOrder
    const sqliSort = encodeURIComponent("createdAt; DROP TABLE analysis_runs; --");
    const sqliOrder = encodeURIComponent("ASC; SELECT 1;");
    const resSqli = await fetch(`${baseUrl}/api/v3/runs?sortBy=${sqliSort}&sortOrder=${sqliOrder}`);
    assert.strictEqual(resSqli.status, 200, 'SQL injection in sort parameters must be neutralized');

    // Verify table analysis_runs was NOT dropped
    const verifyRuns = await fetch(`${baseUrl}/api/v3/runs`);
    const verifyData = await verifyRuns.json();
    assert.strictEqual(verifyData.success, true);
    assert.ok(verifyData.total >= 1, 'Table must remain intact');
  });

  test('TC-T5-08: /api/v3/runs/:runId and /api/v3/runs/:runId/raw Edge-Case IDs', async () => {
    // 1. Existing run retrieval
    const resExist = await fetch(`${baseUrl}/api/v3/runs/${seededRunId}`);
    assert.strictEqual(resExist.status, 200);
    const dataExist = await resExist.json();
    assert.strictEqual(dataExist.id, seededRunId);
    assert.strictEqual(dataExist.audits.length, 1);

    // 2. Existing raw payload retrieval
    const resRaw = await fetch(`${baseUrl}/api/v3/runs/${seededRunId}/raw`);
    assert.strictEqual(resRaw.status, 200);
    const dataRaw = await resRaw.json();
    assert.strictEqual(dataRaw.payload.astNodes, 120);

    // 3. Non-existent UUID
    const resGhost = await fetch(`${baseUrl}/api/v3/runs/${crypto.randomUUID()}`);
    assert.strictEqual(resGhost.status, 404);
    const dataGhost = await resGhost.json();
    assert.strictEqual(dataGhost.success, false);

    // 4. Malformed / special characters ID
    const resBadId = await fetch(`${baseUrl}/api/v3/runs/%20%20unknown%20%20/raw`);
    assert.strictEqual(resBadId.status, 404);
  });

  test('TC-T5-09: /api/v3/clients/:slug/audits Malicious Slug Rejection', async () => {
    const maliciousSlugs = [
      '../escape',
      '..%2f..%2fpasswd',
      'has spaces in slug',
      'UPPERCASE_CLIENT',
      'slug;drop table sites;',
      'slug<script>alert(1)</script>',
      'negocia-bem/../admin'
    ];

    for (const badSlug of maliciousSlugs) {
      const encoded = encodeURIComponent(badSlug);
      const res = await fetch(`${baseUrl}/api/v3/clients/${encoded}/audits`);
      assert.strictEqual(
        res.status,
        400,
        `Malicious slug "${badSlug}" must be rejected with HTTP 400 Bad Request`
      );
      const body = await res.json();
      assert.strictEqual(body.success, false);
      assert.ok(body.error.includes('Unsafe slug') || body.error.includes('Unsafe path'));
    }
  });

  test('TC-T5-10: /api/v3/files/content Comprehensive Directory Traversal Battery', async () => {
    const traversalVectors = [
      '../../package.json',
      '../../../package.json',
      '..\\..\\package.json',
      '%2e%2e%2fpackage.json',
      '%2e%2e%5cpackage.json',
      '%252e%252e%252fpackage.json',
      'clientes/negocia-bem/../../../package.json',
      'copias/../../package.json',
      '/etc/passwd',
      'C:\\Windows\\win.ini',
      'clientes/negocia-bem/site/index.html%00.png'
    ];

    for (const vector of traversalVectors) {
      const res = await fetch(`${baseUrl}/api/v3/files/content?path=${encodeURIComponent(vector)}`);
      assert.ok(
        res.status === 400 || res.status === 404,
        `Traversal vector "${vector}" must be rejected with 400 or 404, got ${res.status}`
      );
      const body = await res.json();
      assert.strictEqual(body.success, false);
    }
  });

  test('TC-T5-11: /api/v3/admin/sync HTTP Method Gating', async () => {
    // GET request must be rejected / not handled as sync route
    const resGet = await fetch(`${baseUrl}/api/v3/admin/sync`, { method: 'GET' });
    assert.strictEqual(resGet.status, 404, 'GET on /api/v3/admin/sync must return 404');

    // POST request must be processed
    const resPost = await fetch(`${baseUrl}/api/v3/admin/sync`, { method: 'POST' });
    assert.strictEqual(resPost.status, 200, 'POST on /api/v3/admin/sync must return 200');
    const bodyPost = await resPost.json();
    assert.strictEqual(bodyPost.success, true);
    assert.ok(bodyPost.message.includes('Filesystem synchronization completed'));
  });

  test('TC-T5-12: Control Panel API Mutation Authorization & Timing-Safe Security', async () => {
    const validSecret = 'super-secret-m6-key-12345';

    // 1. Missing header
    assert.strictEqual(
      isMutationAuthorized({ headers: {} }, { enabled: true, token: validSecret }),
      false,
      'Missing header must be rejected'
    );

    // 2. Non-Bearer scheme
    assert.strictEqual(
      isMutationAuthorized({ headers: { authorization: `Basic ${validSecret}` } }, { enabled: true, token: validSecret }),
      false,
      'Basic auth must be rejected'
    );

    // 3. Bearer with incorrect token of same length
    const wrongSameLength = 'x'.repeat(validSecret.length);
    assert.strictEqual(
      isMutationAuthorized({ headers: { authorization: `Bearer ${wrongSameLength}` } }, { enabled: true, token: validSecret }),
      false,
      'Incorrect token of same length must be rejected'
    );

    // 4. Bearer with incorrect token of different length
    assert.strictEqual(
      isMutationAuthorized({ headers: { authorization: 'Bearer short' } }, { enabled: true, token: validSecret }),
      false,
      'Incorrect token of different length must be rejected'
    );

    // 5. Valid token
    assert.strictEqual(
      isMutationAuthorized({ headers: { authorization: `Bearer ${validSecret}` } }, { enabled: true, token: validSecret }),
      true,
      'Valid token must be accepted'
    );

    // 6. JSON body parsing size limit (>64KB)
    const { Readable } = require('node:stream');
    const oversizedBuffer = Buffer.alloc(70 * 1024, 'a');
    const streamOver = Readable.from([oversizedBuffer]);
    await assert.rejects(
      async () => {
        await readJsonBody(streamOver, { limitBytes: 64 * 1024 });
      },
      err => err.statusCode === 413,
      'Oversized body must throw 413'
    );

    // 7. Malformed JSON parsing
    const malformedStream = Readable.from([Buffer.from('{ "broken": json ')]);
    await assert.rejects(
      async () => {
        await readJsonBody(malformedStream);
      },
      err => err.statusCode === 400,
      'Malformed JSON must throw 400'
    );
  });
});

// ============================================================================
// Suite 3: DevOps Container Security & CI/CD Pipeline Invariants (R5)
// ============================================================================

describe('Suite 3: DevOps Container Security & CI/CD Pipeline Invariants (R5)', () => {
  const dockerfilePath = path.join(PROJECT_ROOT, 'Dockerfile');
  const composePath = path.join(PROJECT_ROOT, 'docker-compose.yml');
  const ciWorkflowPath = path.join(PROJECT_ROOT, '.github/workflows/ci.yml');
  const dockerignorePath = path.join(PROJECT_ROOT, '.dockerignore');

  test('TC-T5-13: Production Dockerfile Multi-Stage AST & Unprivileged User Enforcement', () => {
    assert.ok(fs.existsSync(dockerfilePath), 'Dockerfile must exist');
    const content = fs.readFileSync(dockerfilePath, 'utf-8');

    // 1. Multi-stage build structure
    const fromMatches = [...content.matchAll(/^FROM\s+([^\s]+)\s+AS\s+([^\s]+)/gim)];
    assert.strictEqual(fromMatches.length, 2, 'Dockerfile must contain exactly 2 named stages');
    assert.strictEqual(fromMatches[0][2].toLowerCase(), 'builder', 'First stage must be named builder');
    assert.strictEqual(fromMatches[1][2].toLowerCase(), 'runner', 'Second stage must be named runner');

    // 2. Unprivileged user
    const userMatch = content.match(/^USER\s+([^\s]+)/m);
    assert.ok(userMatch, 'Dockerfile must contain USER directive');
    assert.strictEqual(userMatch[1], 'pwuser', 'Container must run as unprivileged pwuser');
    assert.ok(!content.includes('USER root\n'), 'Root user must not be final executing user');

    // 3. Port exposure
    assert.ok(/^EXPOSE\s+4000/m.test(content), 'Port 4000 must be exposed');

    // 4. Volume declarations for data persistence
    const volumeMatch = content.match(/^VOLUME\s+\[(.*)\]/m);
    assert.ok(volumeMatch, 'VOLUME directive must be present');
    assert.ok(volumeMatch[1].includes('/app/copias'), 'VOLUME must declare /app/copias');
    assert.ok(volumeMatch[1].includes('/app/data'), 'VOLUME must declare /app/data');

    // 5. Production dependencies in builder
    assert.ok(content.includes('npm ci --omit=dev'), 'Builder must omit devDependencies');
  });

  test('TC-T5-14: Docker Healthcheck Probe Exit Code Mechanics', () => {
    const content = fs.readFileSync(dockerfilePath, 'utf-8');
    const healthcheckMatch = content.match(/^HEALTHCHECK\s+(.+)$/m);
    assert.ok(healthcheckMatch, 'HEALTHCHECK directive must be defined');

    const directive = healthcheckMatch[1];
    assert.ok(directive.includes('--interval='), 'Healthcheck must define interval');
    assert.ok(directive.includes('--timeout='), 'Healthcheck must define timeout');
    assert.ok(directive.includes('--start-period='), 'Healthcheck must define start-period');
    assert.ok(directive.includes('/api/v3/analytics/kpi'), 'Healthcheck must probe /api/v3/analytics/kpi');
    assert.ok(directive.includes('r.statusCode === 200 ? 0 : 1'), 'Healthcheck must exit 0 on 200, 1 on non-200');
    assert.ok(directive.includes("on('error', () => process.exit(1))"), 'Healthcheck must exit 1 on socket error');
  });

  test('TC-T5-15: Docker Compose & .dockerignore Strict Isolation Invariants', () => {
    // Docker Compose verification
    assert.ok(fs.existsSync(composePath), 'docker-compose.yml must exist');
    const composeContent = fs.readFileSync(composePath, 'utf-8');
    assert.ok(composeContent.includes('4000:4000'), 'Compose must map port 4000:4000');
    assert.ok(composeContent.includes('./copias:/app/copias'), 'Compose must map copias volume');
    assert.ok(composeContent.includes('./data:/app/data'), 'Compose must map data volume');

    // .dockerignore verification
    assert.ok(fs.existsSync(dockerignorePath), '.dockerignore must exist');
    const ignoreContent = fs.readFileSync(dockerignorePath, 'utf-8');
    const ignoredPatterns = ignoreContent.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

    assert.ok(ignoredPatterns.some(p => p.includes('.git')), '.dockerignore must exclude .git');
    assert.ok(ignoredPatterns.some(p => p.includes('node_modules')), '.dockerignore must exclude node_modules');
    assert.ok(ignoredPatterns.some(p => p.includes('.agents')), '.dockerignore must exclude .agents');
    assert.ok(ignoredPatterns.some(p => p.includes('.env')), '.dockerignore must exclude .env');
  });

  test('TC-T5-16: GitHub Actions Workflow Topological DAG Integrity', () => {
    assert.ok(fs.existsSync(ciWorkflowPath), 'ci.yml workflow must exist');
    const content = fs.readFileSync(ciWorkflowPath, 'utf-8');

    // 1. Concurrency cancellation
    assert.ok(content.includes('concurrency:'), 'Workflow must specify concurrency');
    assert.ok(content.includes('cancel-in-progress: true'), 'Redundant builds must be canceled');

    // 2. Restricted permissions
    assert.ok(content.includes('permissions:'), 'Workflow must define permissions');
    assert.ok(content.includes('contents: read'), 'Workflow must restrict permissions to contents: read');

    // 3. Job DAG: lint -> test -> docker-build
    assert.ok(content.includes('lint:'), 'Workflow must have lint job');
    assert.ok(content.includes('test:'), 'Workflow must have test job');
    assert.ok(content.includes('docker-build:'), 'Workflow must have docker-build job');

    assert.ok(/needs:\s*lint/m.test(content), 'test job must depend on lint');
    assert.ok(/needs:\s*\[lint,\s*test\]/m.test(content), 'docker-build job must depend on [lint, test]');

    // 4. Matrix testing across Node 20 and 24
    assert.ok(content.includes('node-version: [20.x, 24.x]'), 'Test matrix must include Node 20 and Node 24');

    // 5. Playwright system dependencies
    assert.ok(content.includes('npx playwright install --with-deps chromium'), 'CI must install Playwright Chromium with deps');
  });
});

// ============================================================================
// Suite 4: Repository, Copy, and Client Isolation Invariants
// ============================================================================

describe('Suite 4: Repository, Copy, and Client Isolation Invariants', () => {
  test('TC-T5-17: Reference Evidence (copias/) and Client Workspace (clientes/) Zero-Mutation Guarantee', () => {
    // Execute git diff relative to HEAD for copias/ and clientes/
    const copiasDiff = execSync('git diff HEAD copias/', { cwd: PROJECT_ROOT, encoding: 'utf-8' });
    assert.strictEqual(copiasDiff.trim(), '', 'copias/ must have strictly 0 lines of diff relative to HEAD');

    const clientesDiff = execSync('git diff HEAD clientes/', { cwd: PROJECT_ROOT, encoding: 'utf-8' });
    assert.strictEqual(clientesDiff.trim(), '', 'clientes/ must have strictly 0 lines of diff relative to HEAD');
  });

  test('TC-T5-18: End-to-End Hybrid Ingestion and Analytics Aggregate Calculation', async () => {
    const memRepo = new HybridRepository({ dbPath: ':memory:' });
    await memRepo.init();

    // 1. Ingest run 1 (passed)
    const run1 = await memRepo.startAnalysisRun({ siteSlug: 'site-alpha', targetUrl: 'https://alpha.com' });
    await memRepo.completeAnalysisRun(run1.runId, {
      status: 'passed',
      outputTokens: 2500,
      costUsd: 0.025,
      rawScrapePayload: { site: 'alpha', score: 95 }
    });
    await memRepo.recordQualityAudit({
      runId: run1.runId,
      siteSlug: 'site-alpha',
      auditType: 'radar-38',
      passed: true,
      score: 95.0
    });

    // 2. Ingest run 2 (failed)
    const run2 = await memRepo.startAnalysisRun({ siteSlug: 'site-beta', targetUrl: 'https://beta.com' });
    await memRepo.completeAnalysisRun(run2.runId, {
      status: 'failed',
      outputTokens: 1500,
      costUsd: 0.015,
      rawScrapePayload: { site: 'beta', score: 40 }
    });
    await memRepo.recordQualityAudit({
      runId: run2.runId,
      siteSlug: 'site-beta',
      auditType: 'radar-38',
      passed: false,
      score: 40.0
    });

    // 3. Verify KPI calculations
    const kpi = await memRepo.getDashboardAnalytics();
    assert.strictEqual(kpi.totalRuns, 2, 'Total runs must be 2');
    assert.strictEqual(kpi.passedRuns, 1, 'Passed runs must be 1');
    assert.strictEqual(kpi.failedRuns, 1, 'Failed runs must be 1');
    assert.strictEqual(kpi.passRate, 50.0, 'Pass rate must be 50.0%');
    assert.strictEqual(kpi.totalTokens, 4000, 'Total tokens must be 2500 + 1500 = 4000');
    assert.strictEqual(kpi.totalCostUsd, 0.04, 'Total cost must be 0.025 + 0.015 = 0.04');
    assert.strictEqual(kpi.averageAuditScore, 67.5, 'Average score must be (95 + 40) / 2 = 67.5');

    memRepo.close();
  });
});
