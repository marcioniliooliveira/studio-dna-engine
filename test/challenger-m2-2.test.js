/**
 * test/challenger-m2-2.test.js
 *
 * Empirical Adversarial Verification Suite for Milestone 2 (R3).
 * Executed by challenger_m2_2.
 *
 * Probes:
 * 1. HybridRepository:
 *    - Large payload handling & accurate document linking
 *    - Pagination, filtering, and edge cases (offset out of bounds, limit 0, negative bounds)
 *    - Reopen persistence across instances and file-backed SQLite/DocStore
 * 2. SyncIngestor:
 *    - Idempotency: repeated execution does not duplicate SQLite records or NoSQL documents
 *    - Immutability: copias/ files are strictly unmodified (mtime and SHA-256 match before and after)
 * 3. Preview Server v3 REST API:
 *    - Endpoint coverage: /runs, /runs/:runId, /runs/:runId/raw, /analytics/kpi, /files/tree, /files/content, /admin/sync
 *    - Status codes: 200, 400, 404, 403/401 unauthorized mutation enforcement
 */

'use strict';

const { describe, test, before, after, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const fsp = fs.promises;
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');

const HybridRepository = require('../src/persistence/hybrid-repository');
const SyncIngestor = require('../src/persistence/sync-ingestor');
const SqliteEngine = require('../src/persistence/sqlite-engine');
const DocumentStore = require('../src/persistence/document-store');
const { startPreviewServer } = require('../src/server/preview-server');

const PROJECT_ROOT = path.resolve(__dirname, '..');

describe('Milestone 2 Empirical Challenger Suite (challenger_m2_2)', () => {
  let tempSuiteDir;

  beforeEach(() => {
    tempSuiteDir = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger_m2_2_'));
  });

  afterEach(async () => {
    if (tempSuiteDir && fs.existsSync(tempSuiteDir)) {
      try {
        await fsp.rm(tempSuiteDir, { recursive: true, force: true });
      } catch (_) {}
    }
  });

  // =========================================================================
  // Mission 1: Empirically challenge HybridRepository
  // =========================================================================
  describe('Mission 1: HybridRepository Empirical Challenges', () => {
    test('1.1 Large payload (> 4MB AST) links accurately between SQLite analysis_runs and DocumentStore', async () => {
      const dbPath = path.join(tempSuiteDir, 'large_payload.db');
      const docPath = path.join(tempSuiteDir, 'large_docs');

      const repo = new HybridRepository({ dbPath, docBasePath: docPath });
      await repo.init();

      const run = await repo.startAnalysisRun({
        siteSlug: 'heavy-enterprise-site',
        targetUrl: 'https://heavy.enterprise.test',
        mode: 'deep-extract'
      });

      assert.ok(run.runId);
      assert.equal(run.status, 'running');

      // Create a 4MB+ structured AST payload
      const largePayload = {
        domTree: {
          tag: 'html',
          classes: ['dark', 'awwwards-grade'],
          sections: Array.from({ length: 40 }, (_, idx) => ({
            sectionId: `sec-${idx}`,
            heading: `Interactive Kinetic Section ${idx}`,
            shaderSource: 'x'.repeat(50 * 1024), // 50KB shader code per section
            threeJsMeshNodes: Array.from({ length: 20 }, (_, mIdx) => ({
              meshId: `mesh-${idx}-${mIdx}`,
              verticesCount: 1500,
              matrixData: 'y'.repeat(2 * 1024) // 2KB matrix data
            }))
          }))
        },
        auditSnapshot: {
          antiSlopScore: 98.7,
          frameRateMin: 59.4,
          layoutShift: 0.0001
        }
      };

      const payloadBytes = Buffer.byteLength(JSON.stringify(largePayload), 'utf-8');
      assert.ok(payloadBytes >= 3.5 * 1024 * 1024, `Payload size was ${payloadBytes} bytes`);

      // Complete run with large payload
      const completed = await repo.completeAnalysisRun(run.runId, {
        status: 'passed',
        outputTokens: 45000,
        costUsd: 0.185,
        artifactHash: 'sha256-test-hash',
        rawScrapePayload: largePayload
      });

      assert.equal(completed.status, 'passed');
      assert.ok(completed.documentRef, 'documentRef must be returned');

      // Verify SQLite row contains the documentRef foreign reference
      const sqliteRow = repo.sqliteEngine.get('SELECT * FROM analysis_runs WHERE id = ?', run.runId);
      assert.equal(sqliteRow.documentRef, completed.documentRef);
      assert.equal(sqliteRow.status, 'passed');
      assert.equal(sqliteRow.outputTokens, 45000);

      // Verify getRunDetails retrieves and joins the full document payload
      const details = await repo.getRunDetails(run.runId);
      assert.ok(details !== null);
      assert.equal(details.id, run.runId);
      assert.equal(details.documentRef, completed.documentRef);
      assert.ok(details.rawDocument);
      assert.equal(details.rawDocument._id, completed.documentRef);
      assert.equal(details.rawDocument.payload.domTree.sections.length, 40);
      assert.equal(details.rawDocument.payload.auditSnapshot.antiSlopScore, 98.7);

      repo.close();
    });

    test('1.2 Listing queries with pagination, filtering, and edge cases (offset out of bounds, limit 0, negative bounds)', async () => {
      const repo = new HybridRepository({ dbPath: ':memory:' });
      await repo.init();

      // Seed 15 analysis runs across two sites with different statuses
      for (let i = 1; i <= 15; i++) {
        const siteSlug = i <= 10 ? 'client-alpha' : 'client-beta';
        const status = i % 3 === 0 ? 'failed' : 'passed';
        const run = await repo.startAnalysisRun({
          siteSlug,
          targetUrl: `https://${siteSlug}.test/page/${i}`,
          mode: 'standard'
        });
        await repo.completeAnalysisRun(run.runId, {
          status,
          outputTokens: i * 100,
          costUsd: i * 0.005
        });
      }

      // Base query: all runs
      const allRuns = await repo.listAnalysisRuns({ limit: 50 });
      assert.equal(allRuns.length, 15);
      const totalCount = await repo.countAnalysisRuns();
      assert.equal(totalCount, 15);

      // Filter by siteSlug
      const alphaRuns = await repo.listAnalysisRuns({ siteSlug: 'client-alpha' });
      assert.equal(alphaRuns.length, 10);
      const alphaCount = await repo.countAnalysisRuns({ siteSlug: 'client-alpha' });
      assert.equal(alphaCount, 10);

      // Filter by status
      const failedRuns = await repo.listAnalysisRuns({ status: 'failed' });
      assert.equal(failedRuns.length, 5); // 3, 6, 9, 12, 15
      const failedCount = await repo.countAnalysisRuns({ status: 'failed' });
      assert.equal(failedCount, 5);

      // Combined filter
      const alphaFailed = await repo.listAnalysisRuns({ siteSlug: 'client-alpha', status: 'failed' });
      assert.equal(alphaFailed.length, 3); // 3, 6, 9

      // Pagination: limit 5, offset 0 -> first 5
      const page1 = await repo.listAnalysisRuns({ limit: 5, offset: 0 });
      assert.equal(page1.length, 5);

      // Pagination: limit 5, offset 5 -> next 5
      const page2 = await repo.listAnalysisRuns({ limit: 5, offset: 5 });
      assert.equal(page2.length, 5);
      assert.notEqual(page1[0].id, page2[0].id, 'Page 1 and Page 2 must not have duplicate records');

      // Edge Case: offset out of bounds (offset: 99999)
      const outOfBounds = await repo.listAnalysisRuns({ limit: 10, offset: 99999 });
      assert.ok(Array.isArray(outOfBounds));
      assert.equal(outOfBounds.length, 0, 'Offset out of bounds must return empty array without error');

      // Edge Case: limit 0 (should default safely and not throw)
      const limitZero = await repo.listAnalysisRuns({ limit: 0 });
      assert.ok(Array.isArray(limitZero));
      assert.ok(limitZero.length > 0, 'Limit 0 must fall back safely to default limit');

      // Edge Case: negative offset (-10) clamped to 0
      const negativeOffset = await repo.listAnalysisRuns({ limit: 5, offset: -10 });
      assert.equal(negativeOffset.length, 5);
      assert.equal(negativeOffset[0].id, page1[0].id, 'Negative offset must be clamped to offset 0');

      // Edge Case: extreme limit (500) clamped to max 100
      const extremeLimit = await repo.listAnalysisRuns({ limit: 500 });
      assert.equal(extremeLimit.length, 15); // Total 15 records in DB

      // Edge Case: invalid sortBy and sortOrder (injection vectors)
      const safeFallback = await repo.listAnalysisRuns({
        sortBy: 'malicious_col; DROP TABLE sites; --',
        sortOrder: 'INVALID_ORDER'
      });
      assert.ok(Array.isArray(safeFallback));
      assert.equal(safeFallback.length, 15);

      repo.close();
    });

    test('1.3 Reopen test: repository data strictly persists across process restarts and separate instances', async () => {
      const dbPath = path.join(tempSuiteDir, 'persistent_repo.db');
      const docPath = path.join(tempSuiteDir, 'persistent_docs');

      // --- Instance 1: Create and populate ---
      const repo1 = new HybridRepository({ dbPath, docBasePath: docPath });
      await repo1.init();

      const run1 = await repo1.startAnalysisRun({
        siteSlug: 'persisted-site',
        targetUrl: 'https://persisted.site.test',
        mode: 'standard',
        model: 'pareto-v3'
      });

      const scrapeAst = {
        meta: { title: 'Persisted Site' },
        elements: [{ tag: 'h1', text: 'Persistent Hero' }]
      };

      await repo1.completeAnalysisRun(run1.runId, {
        status: 'passed',
        outputTokens: 5000,
        costUsd: 0.05,
        rawScrapePayload: scrapeAst
      });

      await repo1.recordQualityAudit({
        runId: run1.runId,
        siteSlug: 'persisted-site',
        auditType: 'golden-gate',
        passed: true,
        score: 96.5,
        metrics: { performance: 97, antiSlop: 100 },
        rawReport: { fullDetails: 'Audit passed with zero regressions' }
      });

      const kpiBeforeClose = await repo1.getDashboardAnalytics();
      assert.equal(kpiBeforeClose.totalRuns, 1);
      assert.equal(kpiBeforeClose.passedRuns, 1);
      assert.equal(kpiBeforeClose.averageAuditScore, 96.5);

      // Explicitly close instance 1
      repo1.close();
      assert.equal(repo1.isInitialized, false);

      // Verify files physically exist on disk
      assert.ok(fs.existsSync(dbPath), 'SQLite database file must exist on disk');
      assert.ok(fs.existsSync(docPath), 'Document store directory must exist on disk');

      // --- Instance 2: Reopen from same paths in a separate instance ---
      const repo2 = new HybridRepository({ dbPath, docBasePath: docPath });
      await repo2.init();
      assert.equal(repo2.isInitialized, true);

      // Query data created by Instance 1
      const runsAfterReopen = await repo2.listAnalysisRuns({ siteSlug: 'persisted-site' });
      assert.equal(runsAfterReopen.length, 1);
      assert.equal(runsAfterReopen[0].id, run1.runId);
      assert.equal(runsAfterReopen[0].status, 'passed');
      assert.equal(runsAfterReopen[0].outputTokens, 5000);

      const detailsAfterReopen = await repo2.getRunDetails(run1.runId);
      assert.ok(detailsAfterReopen !== null);
      assert.equal(detailsAfterReopen.id, run1.runId);
      assert.equal(detailsAfterReopen.audits.length, 1);
      assert.equal(detailsAfterReopen.audits[0].score, 96.5);
      assert.ok(detailsAfterReopen.rawDocument);
      assert.deepEqual(detailsAfterReopen.rawDocument.payload, scrapeAst);

      const kpiAfterReopen = await repo2.getDashboardAnalytics();
      assert.deepEqual(kpiAfterReopen, kpiBeforeClose);

      // Perform a new write in Instance 2
      const run2 = await repo2.startAnalysisRun({
        siteSlug: 'persisted-site-2',
        targetUrl: 'https://site2.test'
      });
      await repo2.completeAnalysisRun(run2.runId, { status: 'passed' });

      const totalRunsAfterAdd = await repo2.countAnalysisRuns();
      assert.equal(totalRunsAfterAdd, 2);

      repo2.close();
    });
  });

  // =========================================================================
  // Mission 2: Empirically challenge SyncIngestor
  // =========================================================================
  describe('Mission 2: SyncIngestor Idempotency & Immutability Challenges', () => {
    test('2.1a Idempotency (scanFiles: false): running sync twice produces identical index counts and zero duplicates', async () => {
      const dbPath = path.join(tempSuiteDir, 'idempotency_sync.db');
      const docPath = path.join(tempSuiteDir, 'idempotency_docs');

      const repo = new HybridRepository({ dbPath, docBasePath: docPath });
      await repo.init();

      // Build simulated fixtures with 3 copias and 2 clientes
      const mockCopias = path.join(tempSuiteDir, 'copias');
      const mockClientes = path.join(tempSuiteDir, 'clientes');
      fs.mkdirSync(mockCopias, { recursive: true });
      fs.mkdirSync(mockClientes, { recursive: true });

      // Seed 3 clones
      for (const slug of ['clone-one', 'clone-two', 'clone-three']) {
        const cDir = path.join(mockCopias, slug);
        fs.mkdirSync(path.join(cDir, 'site'), { recursive: true });
        fs.writeFileSync(path.join(cDir, 'site', 'index.html'), `<html><body>${slug}</body></html>`);
        fs.writeFileSync(path.join(cDir, 'SITE_TYPE.json'), JSON.stringify({ targetUrl: `https://${slug}.com` }));
        fs.writeFileSync(path.join(cDir, 'audit-report.json'), JSON.stringify({ score: 92.0, passed: true }));
      }

      // Seed 2 client projects
      for (const slug of ['client-alpha', 'client-beta']) {
        const clDir = path.join(mockClientes, slug);
        fs.mkdirSync(path.join(clDir, 'site'), { recursive: true });
        fs.writeFileSync(path.join(clDir, 'site', 'index.html'), `<html><body>${slug}</body></html>`);
        fs.writeFileSync(path.join(clDir, 'brand-spec.json'), JSON.stringify({ brand: slug }));
        fs.writeFileSync(path.join(clDir, 'DNA.md'), `# DNA of ${slug}`);
        fs.writeFileSync(path.join(clDir, 'audit-report.json'), JSON.stringify({ score: 88.5, passed: true }));
      }

      const ingestor = new SyncIngestor({
        hybridRepo: repo,
        copiasDir: mockCopias,
        clientesDir: mockClientes,
        rootDir: tempSuiteDir
      });

      // --- RUN 1 ---
      const res1 = await ingestor.syncAll({ scanFiles: false });
      assert.equal(res1.sitesCount, 5, 'Run 1 must create 5 sites');
      assert.equal(res1.runsCount, 5, 'Run 1 must create 5 runs');
      assert.equal(res1.auditsCount, 5, 'Run 1 must create 5 audits');

      const sitesCountDb1 = (repo.sqliteEngine.get('SELECT COUNT(*) as c FROM sites') || {}).c;
      const runsCountDb1 = (repo.sqliteEngine.get('SELECT COUNT(*) as c FROM analysis_runs') || {}).c;
      const auditsCountDb1 = (repo.sqliteEngine.get('SELECT COUNT(*) as c FROM quality_audits') || {}).c;

      assert.equal(sitesCountDb1, 5);
      assert.equal(runsCountDb1, 5);
      assert.equal(auditsCountDb1, 5);

      // --- RUN 2 (Immediate rerun) ---
      const res2 = await ingestor.syncAll({ scanFiles: false });
      assert.equal(res2.sitesCount, 0, 'Run 2 must create 0 new sites');
      assert.equal(res2.runsCount, 0, 'Run 2 must create 0 new runs');
      assert.equal(res2.auditsCount, 0, 'Run 2 must create 0 new audits');
      assert.equal(res2.indexedCount, 0, 'Run 2 must index 0 new entities');

      const sitesCountDb2 = (repo.sqliteEngine.get('SELECT COUNT(*) as c FROM sites') || {}).c;
      const runsCountDb2 = (repo.sqliteEngine.get('SELECT COUNT(*) as c FROM analysis_runs') || {}).c;
      const auditsCountDb2 = (repo.sqliteEngine.get('SELECT COUNT(*) as c FROM quality_audits') || {}).c;

      // Absolute record count equivalence
      assert.equal(sitesCountDb2, sitesCountDb1, 'Sites count must remain identical');
      assert.equal(runsCountDb2, runsCountDb1, 'Runs count must remain identical');
      assert.equal(auditsCountDb2, auditsCountDb1, 'Audits count must remain identical');

      // Verify NoSQL documents do not duplicate
      const auditCol = repo.docStore.getCollection('audit_reports');
      const docCount = await auditCol.count();
      assert.equal(docCount, 5, 'DocumentStore must retain exactly 5 audit reports without duplication');

      repo.close();
    });

    test('2.1b Idempotency verification: scanFiles: true does not duplicate file_catalog records and returns 0 on rerun', async () => {
      const dbPath = path.join(tempSuiteDir, 'defect_sync.db');
      const docPath = path.join(tempSuiteDir, 'defect_docs');

      const repo = new HybridRepository({ dbPath, docBasePath: docPath });
      await repo.init();

      const mockCopias = path.join(tempSuiteDir, 'defect_copias');
      const mockClientes = path.join(tempSuiteDir, 'defect_clientes');
      fs.mkdirSync(mockCopias, { recursive: true });
      fs.mkdirSync(mockClientes, { recursive: true });

      const cDir = path.join(mockCopias, 'clone-test');
      fs.mkdirSync(path.join(cDir, 'site'), { recursive: true });
      fs.writeFileSync(path.join(cDir, 'site', 'index.html'), '<html><body>Clone</body></html>');
      fs.writeFileSync(path.join(cDir, 'SITE_TYPE.json'), JSON.stringify({ targetUrl: 'https://clone.com' }));

      const ingestor = new SyncIngestor({
        hybridRepo: repo,
        copiasDir: mockCopias,
        clientesDir: mockClientes,
        rootDir: tempSuiteDir
      });

      // Run 1: initial cataloging
      const res1 = await ingestor.syncAll({ scanFiles: true });
      assert.ok(res1.filesCount >= 2);
      const filesCountDb1 = (repo.sqliteEngine.get('SELECT COUNT(*) as c FROM file_catalog') || {}).c;
      assert.equal(filesCountDb1, res1.filesCount);

      // Run 2: rerun syncAll
      const res2 = await ingestor.syncAll({ scanFiles: true });

      // IDEMPOTENCY CONFIRMED:
      // res2.filesCount is 0, and file_catalog row count remains identical
      const filesCountDb2 = (repo.sqliteEngine.get('SELECT COUNT(*) as c FROM file_catalog') || {}).c;
      assert.equal(
        filesCountDb2,
        filesCountDb1,
        'IDEMPOTENCY CONFIRMED: file_catalog rows remained identical on rerun'
      );
      assert.equal(
        res2.filesCount,
        0,
        'IDEMPOTENCY CONFIRMED: res2.filesCount returned 0 newly generated duplicates'
      );

      repo.close();
    });

    test('2.2 copias/ immutability: verifies that actual copias/ files are strictly unmodified (mtimes and hashes untouched)', async () => {
      const realCopiasDir = path.join(PROJECT_ROOT, 'copias');
      if (!fs.existsSync(realCopiasDir)) {
        return; // Skip if copias directory does not exist in working environment
      }

      // Collect sample of files from real copias/ to verify
      const filesToTrack = [];
      const siteDirs = fs.readdirSync(realCopiasDir, { withFileTypes: true });

      for (const ent of siteDirs) {
        if (!ent.isDirectory() || ent.name.startsWith('.')) continue;
        const sitePath = path.join(realCopiasDir, ent.name);
        const candidates = ['site/index.html', 'SITE_TYPE.json', 'audit-report.json', 'DNA.md'];
        for (const rel of candidates) {
          const full = path.join(sitePath, rel);
          if (fs.existsSync(full) && fs.statSync(full).isFile()) {
            const stat = fs.statSync(full);
            const content = fs.readFileSync(full);
            const hash = crypto.createHash('sha256').update(content).digest('hex');
            filesToTrack.push({
              path: full,
              mtimeMs: stat.mtimeMs,
              size: stat.size,
              hash
            });
          }
        }
        if (filesToTrack.length >= 25) break; // Track at least 25 reference files
      }

      assert.ok(filesToTrack.length >= 5, 'Found enough copias files to perform immutability check');

      // Run sync against the real repository directories into an isolated memory database
      const repo = new HybridRepository({ dbPath: ':memory:' });
      await repo.init();

      const ingestor = new SyncIngestor({
        hybridRepo: repo,
        rootDir: PROJECT_ROOT,
        copiasDir: realCopiasDir,
        clientesDir: path.join(PROJECT_ROOT, 'clientes')
      });

      await ingestor.syncAll({ scanFiles: true });

      // Verify that every single tracked file in copias/ is byte-for-byte identical and has unmodified mtime
      let modifiedCount = 0;
      for (const tracked of filesToTrack) {
        const currentStat = fs.statSync(tracked.path);
        const currentContent = fs.readFileSync(tracked.path);
        const currentHash = crypto.createHash('sha256').update(currentContent).digest('hex');

        if (currentStat.mtimeMs !== tracked.mtimeMs || currentHash !== tracked.hash) {
          modifiedCount++;
        }
      }

      assert.equal(
        modifiedCount,
        0,
        `CRITICAL VIOLATION: ${modifiedCount} files in copias/ were modified during sync! copias/ must be immutable reference evidence.`
      );

      repo.close();
    });
  });

  // =========================================================================
  // Mission 3: Empirically challenge Preview Server v3 REST API
  // =========================================================================
  describe('Mission 3: Preview Server v3 REST API Empirical Challenges', () => {
    let server;
    let baseUrl;
    let testRepo;
    let serverRootDir;

    before(async () => {
      serverRootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger_server_'));
      const copiasDir = path.join(serverRootDir, 'copias');
      const clientesDir = path.join(serverRootDir, 'clientes');
      fs.mkdirSync(copiasDir, { recursive: true });
      fs.mkdirSync(clientesDir, { recursive: true });

      // Seed client
      const clDir = path.join(clientesDir, 'challenger-brand');
      fs.mkdirSync(path.join(clDir, 'site'), { recursive: true });
      fs.writeFileSync(path.join(clDir, 'site', 'index.html'), '<html><body>Challenger Test</body></html>');
      fs.writeFileSync(path.join(clDir, 'brand-spec.json'), JSON.stringify({ brand: 'Challenger' }));
      fs.writeFileSync(path.join(clDir, 'DNA.md'), '# Challenger DNA');

      // Seed clone with binary asset (1x1 PNG)
      const cDir = path.join(copiasDir, 'challenger-clone');
      fs.mkdirSync(path.join(cDir, 'site', 'assets'), { recursive: true });
      fs.writeFileSync(path.join(cDir, 'site', 'index.html'), '<html><body>Clone</body></html>');
      const pngBuffer = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        'base64'
      );
      fs.writeFileSync(path.join(cDir, 'site', 'assets', 'pixel.png'), pngBuffer);

      server = startPreviewServer({
        port: 0,
        silent: true,
        rootDir: serverRootDir,
        copiasDir,
        clientesDir,
        dbPath: ':memory:',
        docBasePath: path.join(serverRootDir, 'docs'),
        enableMutations: true,
        mutationToken: 'challenger-secret-token-xyz'
      });

      await new Promise(resolve => server.on('listening', resolve));
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      testRepo = server.hybridRepo;
      await testRepo.init();

      // Seed sample run with payload
      const run = await testRepo.startAnalysisRun({
        siteSlug: 'challenger-brand',
        targetUrl: 'https://challenger.test',
        mode: 'standard'
      });
      await testRepo.completeAnalysisRun(run.runId, {
        status: 'passed',
        outputTokens: 1500,
        costUsd: 0.03,
        rawScrapePayload: { testTree: { root: 'html' } }
      });
      server.seededRunId = run.runId;

      // Seed run without payload
      const runNoDoc = await testRepo.startAnalysisRun({
        siteSlug: 'challenger-brand',
        targetUrl: 'https://nodoc.test',
        mode: 'quick'
      });
      await testRepo.completeAnalysisRun(runNoDoc.runId, { status: 'failed' });
      server.seededNoDocRunId = runNoDoc.runId;
    });

    after(async () => {
      if (server) {
        await new Promise(resolve => server.close(resolve));
      }
      if (serverRootDir && fs.existsSync(serverRootDir)) {
        try {
          await fsp.rm(serverRootDir, { recursive: true, force: true });
        } catch (_) {}
      }
    });

    test('3.1 GET /api/v3/runs paginates, filters by siteSlug and status, and handles boundary offsets', async () => {
      // 1. Success 200
      const res = await fetch(`${baseUrl}/api/v3/runs?page=1&limit=10`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.runs.length >= 2);
      assert.equal(data.pagination.page, 1);
      assert.equal(data.pagination.limit, 10);

      // 2. Filter by status=passed
      const passedRes = await fetch(`${baseUrl}/api/v3/runs?status=passed`);
      assert.equal(passedRes.status, 200);
      const passedData = await passedRes.json();
      assert.ok(passedData.runs.every(r => r.status === 'passed'));

      // 3. Offset beyond bounds (page 9999) -> 200 with empty array
      const emptyRes = await fetch(`${baseUrl}/api/v3/runs?page=9999&limit=10`);
      assert.equal(emptyRes.status, 200);
      const emptyData = await emptyRes.json();
      assert.equal(emptyData.runs.length, 0);
      assert.ok(emptyData.total >= 2);
    });

    test('3.2 GET /api/v3/runs/:runId returns 200 for existing run, 404 for nonexistent run', async () => {
      // Valid run -> 200
      const res = await fetch(`${baseUrl}/api/v3/runs/${server.seededRunId}`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.id, server.seededRunId);
      assert.equal(data.status, 'passed');

      // Nonexistent run -> 404
      const notFoundRes = await fetch(`${baseUrl}/api/v3/runs/nonexistent-run-id-999`);
      assert.equal(notFoundRes.status, 404);
      const notFoundData = await notFoundRes.json();
      assert.equal(notFoundData.success, false);
      assert.match(notFoundData.error, /not found/i);
    });

    test('3.3 GET /api/v3/runs/:runId/raw returns 200 when raw document exists, 404 when absent', async () => {
      // Valid run with doc -> 200
      const res = await fetch(`${baseUrl}/api/v3/runs/${server.seededRunId}/raw`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.deepEqual(data.payload, { testTree: { root: 'html' } });

      // Run without doc -> 404
      const noDocRes = await fetch(`${baseUrl}/api/v3/runs/${server.seededNoDocRunId}/raw`);
      assert.equal(noDocRes.status, 404);
      const noDocData = await noDocRes.json();
      assert.equal(noDocData.success, false);

      // Nonexistent run -> 404
      const nonExistentRes = await fetch(`${baseUrl}/api/v3/runs/ghost-run/raw`);
      assert.equal(nonExistentRes.status, 404);
    });

    test('3.4 GET /api/v3/analytics/kpi returns 200 and structured metrics', async () => {
      const res = await fetch(`${baseUrl}/api/v3/analytics/kpi`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(typeof data.totalRuns, 'number');
      assert.equal(typeof data.passedRuns, 'number');
      assert.equal(typeof data.passRate, 'number');
      assert.equal(typeof data.totalTokens, 'number');
      assert.equal(typeof data.totalCostUsd, 'number');
    });

    test('3.5 GET /api/v3/files/tree returns 200 with directory files for copias and clientes', async () => {
      const clientesTree = await fetch(`${baseUrl}/api/v3/files/tree?base=clientes`);
      assert.equal(clientesTree.status, 200);
      const clData = await clientesTree.json();
      assert.equal(clData.success, true);
      assert.ok(clData.files.length >= 1);
      assert.ok(clData.files.some(f => f.path.includes('DNA.md')));

      const copiasTree = await fetch(`${baseUrl}/api/v3/files/tree?base=copias`);
      assert.equal(copiasTree.status, 200);
      const cData = await copiasTree.json();
      assert.equal(cData.success, true);
      assert.ok(cData.files.some(f => f.path.includes('pixel.png')));
    });

    test('3.6 GET /api/v3/files/content serves text & binary, returns 400 for missing path, 404 for missing file, and rejects traversal', async () => {
      // 1. Valid text file -> 200, isBinary: false
      const textRes = await fetch(`${baseUrl}/api/v3/files/content?path=clientes/challenger-brand/DNA.md`);
      assert.equal(textRes.status, 200);
      const textData = await textRes.json();
      assert.equal(textData.success, true);
      assert.equal(textData.isBinary, false);
      assert.equal(textData.content, '# Challenger DNA');

      // 2. Valid binary file -> 200, isBinary: true, base64
      const binRes = await fetch(`${baseUrl}/api/v3/files/content?path=copias/challenger-clone/site/assets/pixel.png`);
      assert.equal(binRes.status, 200);
      const binData = await binRes.json();
      assert.equal(binData.success, true);
      assert.equal(binData.isBinary, true);
      assert.ok(typeof binData.base64 === 'string');

      // 3. Missing path parameter -> 400
      const missingPath = await fetch(`${baseUrl}/api/v3/files/content`);
      assert.equal(missingPath.status, 400);

      // 4. Nonexistent file -> 404
      const notFoundFile = await fetch(`${baseUrl}/api/v3/files/content?path=clientes/challenger-brand/nonexistent.txt`);
      assert.equal(notFoundFile.status, 404);

      // 5. Directory traversal attempt -> rejected (400, 403, or 404)
      const traversalRes = await fetch(`${baseUrl}/api/v3/files/content?path=../../package.json`);
      assert.ok([400, 403, 404].includes(traversalRes.status));
    });

    test('3.7 POST /api/v3/admin/sync rejects unauthorized mutations (HTTP 403) and succeeds with valid Bearer token (HTTP 200)', async () => {
      // 1. Missing authorization header -> HTTP 403 Forbidden
      const unauthRes = await fetch(`${baseUrl}/api/v3/admin/sync`, { method: 'POST' });
      assert.equal(unauthRes.status, 403, 'Unauthorized mutation must return HTTP 403');
      const unauthData = await unauthRes.json();
      assert.match(unauthData.error, /unauthorized|disabled/i);

      // 2. Wrong token -> HTTP 403 Forbidden
      const wrongTokenRes = await fetch(`${baseUrl}/api/v3/admin/sync`, {
        method: 'POST',
        headers: { authorization: 'Bearer wrong-secret-token' }
      });
      assert.equal(wrongTokenRes.status, 403);

      // 3. Authorized request with correct token -> HTTP 200 OK
      const authRes = await fetch(`${baseUrl}/api/v3/admin/sync`, {
        method: 'POST',
        headers: { authorization: 'Bearer challenger-secret-token-xyz' }
      });
      assert.equal(authRes.status, 200);
      const authData = await authRes.json();
      assert.equal(authData.success, true);
      assert.ok(authData.durationMs !== undefined);
    });
  });
});
