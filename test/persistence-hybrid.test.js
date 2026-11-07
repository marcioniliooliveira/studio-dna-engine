/**
 * test/persistence-hybrid.test.js
 *
 * Dedicated unit and integration tests for HybridRepository and SyncIngestor.
 */

'use strict';

const { describe, test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const HybridRepository = require('../src/persistence/hybrid-repository');
const { HybridRepository: NamedHybridRepo } = require('../src/persistence/hybrid-repository');
const SyncIngestor = require('../src/persistence/sync-ingestor');

describe('HybridRepository & SyncIngestor Suite', () => {
  let tempDir;
  let repo;

  beforeEach(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'studio_dna_hybrid_test_'));
    const dbPath = path.join(tempDir, 'test.db');
    const docBasePath = path.join(tempDir, 'documents');
    repo = new HybridRepository({ dbPath, docBasePath });
    await repo.init();
  });

  afterEach(() => {
    if (repo) {
      repo.close();
    }
    if (tempDir && fs.existsSync(tempDir)) {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (_) {}
    }
  });

  test('dual export exports HybridRepository properly', () => {
    assert.equal(typeof HybridRepository, 'function');
    assert.equal(HybridRepository, NamedHybridRepo);
  });

  test('executes complete run lifecycle with raw document payload', async () => {
    const startRes = await repo.startAnalysisRun({
      siteSlug: 'acme-corp',
      targetUrl: 'https://acme.example.com',
      mode: 'kinetic-full',
      model: 'gpt-4o'
    });
    assert.ok(startRes.runId);
    assert.equal(startRes.status, 'running');

    const rawPayload = {
      domain: 'acme-corp',
      domNodes: 450,
      tokens: { primary: '#3b82f6', bg: '#0f172a' }
    };

    const compRes = await repo.completeAnalysisRun(startRes.runId, {
      status: 'passed',
      outputTokens: 2500,
      costUsd: 0.05,
      artifactHash: 'hash-1234',
      rawScrapePayload: rawPayload
    });
    assert.equal(compRes.status, 'passed');
    assert.ok(compRes.documentRef);

    const auditRes = await repo.recordQualityAudit({
      runId: startRes.runId,
      siteSlug: 'acme-corp',
      auditType: '38-variable-anti-slop',
      passed: true,
      score: 97.5,
      metrics: { antiSlop: 98, apca: 97 },
      rawReport: { verdict: 'clean', verified: true }
    });
    assert.ok(auditRes.auditId);
    assert.equal(auditRes.passed, true);
    assert.equal(auditRes.score, 97.5);

    // Retrieve joined details
    const details = await repo.getRunDetails(startRes.runId);
    assert.ok(details);
    assert.equal(details.siteSlug, 'acme-corp');
    assert.equal(details.status, 'passed');
    assert.equal(details.outputTokens, 2500);
    assert.equal(details.costUsd, 0.05);
    assert.equal(details.audits.length, 1);
    assert.equal(details.audits[0].score, 97.5);
    assert.equal(details.audits[0].passed, 1);
    assert.deepEqual(details.audits[0].metrics, { antiSlop: 98, apca: 97 });
    assert.ok(details.rawDocument);
    assert.deepEqual(details.rawDocument.payload, rawPayload);
  });

  test('listAnalysisRuns and countAnalysisRuns support filtering, sorting, and pagination', async () => {
    await repo.startAnalysisRun({ siteSlug: 'site-alpha', targetUrl: 'http://alpha.com' });
    const runBeta = await repo.startAnalysisRun({ siteSlug: 'site-beta', targetUrl: 'http://beta.com' });
    const runGamma = await repo.startAnalysisRun({ siteSlug: 'site-gamma', targetUrl: 'http://gamma.com' });

    await repo.completeAnalysisRun(runBeta.runId, { status: 'passed' });
    await repo.completeAnalysisRun(runGamma.runId, { status: 'failed' });

    // Count
    assert.equal(await repo.countAnalysisRuns(), 3);
    assert.equal(await repo.countAnalysisRuns({ status: 'passed' }), 1);
    assert.equal(await repo.countAnalysisRuns({ siteSlug: 'site-alpha' }), 1);

    // Filter
    const passedRuns = await repo.listAnalysisRuns({ status: 'passed' });
    assert.equal(passedRuns.length, 1);
    assert.equal(passedRuns[0].siteSlug, 'site-beta');

    // Pagination
    const page1 = await repo.listAnalysisRuns({ limit: 2, offset: 0 });
    assert.equal(page1.length, 2);
  });

  test('getDashboardAnalytics aggregates KPI metrics correctly', async () => {
    const run1 = await repo.startAnalysisRun({ siteSlug: 's1', targetUrl: 'http://s1.com' });
    const run2 = await repo.startAnalysisRun({ siteSlug: 's2', targetUrl: 'http://s2.com' });
    const run3 = await repo.startAnalysisRun({ siteSlug: 's3', targetUrl: 'http://s3.com' });

    await repo.completeAnalysisRun(run1.runId, { status: 'passed', outputTokens: 1000, costUsd: 0.02 });
    await repo.completeAnalysisRun(run2.runId, { status: 'passed', outputTokens: 2000, costUsd: 0.04 });
    await repo.completeAnalysisRun(run3.runId, { status: 'failed', outputTokens: 500, costUsd: 0.01 });

    await repo.recordQualityAudit({ runId: run1.runId, siteSlug: 's1', auditType: 'a', passed: true, score: 90 });
    await repo.recordQualityAudit({ runId: run2.runId, siteSlug: 's2', auditType: 'a', passed: true, score: 100 });

    const analytics = await repo.getDashboardAnalytics();
    assert.equal(analytics.totalRuns, 3);
    assert.equal(analytics.passedRuns, 2);
    assert.equal(analytics.failedRuns, 1);
    assert.equal(analytics.passRate, 66.67);
    assert.equal(analytics.averageAuditScore, 95.0);
    assert.equal(analytics.totalTokens, 3500);
    assert.equal(analytics.totalCostUsd, 0.07);
  });

  test('SyncIngestor indexes simulated filesystem idempotently without mutating source files', async () => {
    const copiasDir = path.join(tempDir, 'copias');
    const clientesDir = path.join(tempDir, 'clientes');

    // Create a mock clone directory
    const mockClone = path.join(copiasDir, 'mock-site');
    fs.mkdirSync(mockClone, { recursive: true });
    fs.writeFileSync(path.join(mockClone, 'SITE_TYPE.json'), JSON.stringify({ targetUrl: 'https://mock.com' }));
    fs.writeFileSync(path.join(mockClone, 'audit-report.json'), JSON.stringify({ score: 92.5, passed: true }));
    fs.mkdirSync(path.join(mockClone, 'site'), { recursive: true });
    fs.writeFileSync(path.join(mockClone, 'site', 'index.html'), '<html><body>Hello Mock</body></html>');

    // Create a mock client directory
    const mockClient = path.join(clientesDir, 'mock-client');
    fs.mkdirSync(mockClient, { recursive: true });
    fs.writeFileSync(path.join(mockClient, 'brand-spec.json'), JSON.stringify({ brand: 'Mock' }));

    const ingestor = new SyncIngestor({
      hybridRepo: repo,
      rootDir: tempDir,
      copiasDir,
      clientesDir
    });

    // 1st Sync run
    const res1 = await ingestor.syncAll({ scanFiles: true });
    assert.ok(res1.sitesCount >= 2);
    assert.ok(res1.runsCount >= 2);
    assert.ok(res1.auditsCount >= 1);
    assert.ok(res1.filesCount >= 2);

    // Verify sites in SQLite
    const sites = repo.sqliteEngine.all('SELECT * FROM sites');
    assert.equal(sites.length, 2);

    // 2nd Sync run (idempotency verification)
    const res2 = await ingestor.syncAll({ scanFiles: true });
    assert.equal(res2.sitesCount, 0, 'Subsequent sync should not recreate sites');
    assert.equal(res2.runsCount, 0, 'Subsequent sync should not recreate runs');

    // Source files must be unchanged (read-only invariant)
    const htmlContent = fs.readFileSync(path.join(mockClone, 'site', 'index.html'), 'utf-8');
    assert.equal(htmlContent, '<html><body>Hello Mock</body></html>');
  });
});
