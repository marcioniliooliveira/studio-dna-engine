/**
 * test/preview-server-v3-api.test.js
 *
 * Integration test suite for preview-server /api/v3/* REST persistence endpoints.
 */

'use strict';

const { describe, test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { startPreviewServer } = require('../src/server/preview-server');

describe('Preview Server v3 Persistence REST API Suite', () => {
  let server;
  let baseUrl;
  let tempBaseDir;
  let hybridRepo;

  before(async () => {
    tempBaseDir = fs.mkdtempSync(path.join(os.tmpdir(), 'studio_dna_server_api_test_'));
    const copiasDir = path.join(tempBaseDir, 'copias');
    const clientesDir = path.join(tempBaseDir, 'clientes');
    fs.mkdirSync(copiasDir, { recursive: true });
    fs.mkdirSync(clientesDir, { recursive: true });

    // Seed mock client
    const mockClientDir = path.join(clientesDir, 'acme-test');
    fs.mkdirSync(mockClientDir, { recursive: true });
    fs.writeFileSync(path.join(mockClientDir, 'brand-spec.json'), JSON.stringify({ brand: 'Acme Test' }));
    fs.writeFileSync(path.join(mockClientDir, 'DNA.md'), '# Acme DNA');
    fs.mkdirSync(path.join(mockClientDir, 'site'), { recursive: true });
    fs.writeFileSync(path.join(mockClientDir, 'site', 'index.html'), '<html><body>Acme</body></html>');

    server = startPreviewServer({
      port: 0,
      silent: true,
      rootDir: tempBaseDir,
      copiasDir,
      clientesDir,
      dbPath: ':memory:',
      docBasePath: path.join(tempBaseDir, 'documents'),
      enableMutations: true,
      mutationToken: 'test-mutation-secret'
    });

    await new Promise(resolve => server.on('listening', resolve));
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;
    hybridRepo = server.hybridRepo;
    await hybridRepo.init();
  });

  after(async () => {
    if (server) {
      await new Promise(resolve => server.close(resolve));
    }
    if (tempBaseDir && fs.existsSync(tempBaseDir)) {
      try {
        fs.rmSync(tempBaseDir, { recursive: true, force: true });
      } catch (_) {}
    }
  });

  test('GET /api/v3/analytics/kpi returns structured dashboard metrics', async () => {
    const res = await fetch(`${baseUrl}/api/v3/analytics/kpi`);
    assert.equal(res.status, 200);
    const data = await res.json();

    assert.equal(data.success, true);
    assert.equal(typeof data.totalRuns, 'number');
    assert.equal(typeof data.passRate, 'number');
    assert.equal(typeof data.averageAuditScore, 'number');
  });

  test('POST /api/v3/admin/sync rejects unauthorized mutation and executes when authorized', async () => {
    // 1. Unauthorized request without Bearer token -> HTTP 403
    const unauthRes = await fetch(`${baseUrl}/api/v3/admin/sync`, { method: 'POST' });
    assert.equal(unauthRes.status, 403);

    // 2. Authorized request with Bearer token -> HTTP 200
    const res = await fetch(`${baseUrl}/api/v3/admin/sync`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer test-mutation-secret'
      }
    });
    assert.equal(res.status, 200);
    const data = await res.json();

    assert.equal(data.success, true);
    assert.ok(data.sitesCount >= 1);
  });

  test('GET /api/v3/clients lists indexed client projects', async () => {
    const res = await fetch(`${baseUrl}/api/v3/clients`);
    assert.equal(res.status, 200);
    const data = await res.json();

    assert.equal(data.success, true);
    assert.ok(data.count >= 1);
    const acme = data.clients.find(c => c.slug === 'acme-test');
    assert.ok(acme);
    assert.equal(acme.hasBrandSpec, true);
    assert.equal(acme.hasDna, true);
  });

  test('GET /api/v3/runs, GET /api/v3/runs/:runId, and GET /api/v3/runs/:runId/raw serve runs and documents', async () => {
    // Seed run via repo
    const run = await hybridRepo.startAnalysisRun({
      siteSlug: 'acme-test',
      targetUrl: 'https://acme.test',
      mode: 'test-mode'
    });

    const rawAst = { root: 'html', count: 15, tokens: { color: '#ff0000' } };
    await hybridRepo.completeAnalysisRun(run.runId, {
      status: 'passed',
      outputTokens: 1200,
      costUsd: 0.024,
      rawScrapePayload: rawAst
    });

    await hybridRepo.recordQualityAudit({
      runId: run.runId,
      siteSlug: 'acme-test',
      auditType: 'quality-gate',
      passed: true,
      score: 95.0,
      metrics: { score: 95 }
    });

    // 1. List runs
    const listRes = await fetch(`${baseUrl}/api/v3/runs?siteSlug=acme-test`);
    assert.equal(listRes.status, 200);
    const listData = await listRes.json();
    assert.equal(listData.success, true);
    assert.ok(listData.runs.length >= 1);
    assert.equal(listData.pagination.page, 1);

    // 2. Run details
    const detailRes = await fetch(`${baseUrl}/api/v3/runs/${run.runId}`);
    assert.equal(detailRes.status, 200);
    const detailData = await detailRes.json();
    assert.equal(detailData.success, true);
    assert.equal(detailData.id, run.runId);
    assert.equal(detailData.status, 'passed');
    assert.equal(detailData.audits.length, 1);
    assert.equal(detailData.audits[0].score, 95.0);
    assert.ok(detailData.rawDocument);
    assert.deepEqual(detailData.rawDocument.payload, rawAst);

    // 3. Raw payload document endpoint
    const rawRes = await fetch(`${baseUrl}/api/v3/runs/${run.runId}/raw`);
    assert.equal(rawRes.status, 200);
    const rawData = await rawRes.json();
    assert.equal(rawData.success, true);
    assert.deepEqual(rawData.payload, rawAst);

    // 4. Client audits endpoint
    const auditsRes = await fetch(`${baseUrl}/api/v3/clients/acme-test/audits`);
    assert.equal(auditsRes.status, 200);
    const auditsData = await auditsRes.json();
    assert.equal(auditsData.success, true);
    assert.equal(auditsData.siteSlug, 'acme-test');
    assert.ok(auditsData.count >= 1);
  });

  test('GET /api/v3/files/tree and GET /api/v3/files/content serve asset files securely', async () => {
    const treeRes = await fetch(`${baseUrl}/api/v3/files/tree?base=clientes`);
    assert.equal(treeRes.status, 200);
    const treeData = await treeRes.json();
    assert.equal(treeData.success, true);
    assert.ok(Array.isArray(treeData.files));
    assert.ok(treeData.files.length >= 1);

    const targetFile = treeData.files.find(f => f.path.includes('DNA.md'));
    assert.ok(targetFile);

    const contentRes = await fetch(`${baseUrl}/api/v3/files/content?path=clientes/${targetFile.path}`);
    assert.equal(contentRes.status, 200);
    const contentData = await contentRes.json();
    assert.equal(contentData.success, true);
    assert.equal(contentData.content, '# Acme DNA');
    assert.equal(contentData.isBinary, false);

    // Security: reject path traversal
    const hackRes = await fetch(`${baseUrl}/api/v3/files/content?path=../../package.json`);
    assert.ok(hackRes.status === 400 || hackRes.status === 403 || hackRes.status === 404);
  });
});
