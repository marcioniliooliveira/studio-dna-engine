/**
 * test/challenger-m3-stress.test.js
 *
 * Empirical Adversarial Stress Test Suite for Milestone 3 (F10-F16 / R2 live data integration).
 * Executed by challenger_m3_v3_2.
 *
 * Focus areas:
 * 1. /api/v3/analytics/kpi response formats, zero state, and numerical edge cases (0 runs, NaN tokens, negative costs, extreme values).
 * 2. /api/v3/runs pagination with invalid page numbers (page=-1, page=999999, limit=0, limit=1000, injection strings).
 * 3. /api/v3/files/content directory traversal attempts (relative, encoded, double-encoded, absolute, null-byte).
 * 4. Empty state banner and corrupted artifact robustness in dnastudio UI view layer.
 */

'use strict';

const { describe, test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const { startPreviewServer } = require('../src/server/preview-server');
const { buildDashboardHtml } = require('../src/server/views/dnastudio-dashboard');
const HybridRepository = require('../src/persistence/hybrid-repository');
const { validate21stDevTokens } = require('./e2e/r1-r5-harness');

describe('Milestone 3 Empirical Challenger Stress Suite (challenger_m3_v3_2)', () => {
  let server;
  let baseUrl;
  let tempBaseDir;
  let hybridRepo;

  before(async () => {
    tempBaseDir = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger_m3_stress_'));
    const copiasDir = path.join(tempBaseDir, 'copias');
    const clientesDir = path.join(tempBaseDir, 'clientes');
    fs.mkdirSync(copiasDir, { recursive: true });
    fs.mkdirSync(clientesDir, { recursive: true });

    // Seed mock client with valid assets
    const validClientDir = path.join(clientesDir, 'valid-client');
    fs.mkdirSync(path.join(validClientDir, 'site'), { recursive: true });
    fs.writeFileSync(path.join(validClientDir, 'brand-spec.json'), JSON.stringify({ brand: 'Valid Client' }));
    fs.writeFileSync(path.join(validClientDir, 'DNA.md'), '# Valid DNA');
    fs.writeFileSync(path.join(validClientDir, 'site', 'index.html'), '<html><body>Valid Client Site</body></html>');

    // Seed mock clone with binary asset
    const validCloneDir = path.join(copiasDir, 'valid-clone');
    fs.mkdirSync(path.join(validCloneDir, 'site', 'assets'), { recursive: true });
    fs.writeFileSync(path.join(validCloneDir, 'site', 'index.html'), '<html><body>Valid Clone</body></html>');
    fs.writeFileSync(path.join(validCloneDir, 'site', 'assets', 'sample.png'), Buffer.from('FAKE_PNG_BINARY_DATA', 'utf8'));

    server = startPreviewServer({
      port: 0,
      silent: true,
      rootDir: tempBaseDir,
      copiasDir,
      clientesDir,
      dbPath: ':memory:',
      docBasePath: path.join(tempBaseDir, 'documents'),
      enableMutations: true,
      mutationToken: 'challenger-test-token'
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

  // =========================================================================
  // Challenge 1: /api/v3/analytics/kpi Response Formats & Numerical Edge Cases
  // =========================================================================
  describe('Challenge 1: /api/v3/analytics/kpi Response Formats & Edge Cases', () => {
    test('1.1 Zero runs state: Returns HTTP 200 with strictly formatted zeroes and no NaNs or nulls', async () => {
      const res = await fetch(`${baseUrl}/api/v3/analytics/kpi`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.equal(data.totalRuns, 0, 'totalRuns must be 0');
      assert.equal(data.passedRuns, 0, 'passedRuns must be 0');
      assert.equal(data.failedRuns, 0, 'failedRuns must be 0');
      assert.equal(data.runningRuns, 0, 'runningRuns must be 0');
      assert.equal(data.passRate, 0, 'passRate must be 0 (no division by zero producing NaN)');
      assert.equal(data.averageAuditScore, 0, 'averageAuditScore must be 0');
      assert.equal(data.totalTokens, 0, 'totalTokens must be 0');
      assert.equal(data.totalCostUsd, 0, 'totalCostUsd must be 0');

      // Verify strict types
      for (const field of ['totalRuns', 'passedRuns', 'failedRuns', 'runningRuns', 'passRate', 'averageAuditScore', 'totalTokens', 'totalCostUsd']) {
        assert.equal(typeof data[field], 'number', `${field} must be a number`);
        assert.ok(!Number.isNaN(data[field]), `${field} must not be NaN`);
        assert.ok(Number.isFinite(data[field]), `${field} must be finite`);
      }
    });

    test('1.2 Adversarial input handling: NaN tokens, negative costs, and extreme values', async () => {
      // Start run and complete with NaN tokens & negative cost
      const run1 = await hybridRepo.startAnalysisRun({
        siteSlug: 'valid-client',
        targetUrl: 'https://valid.client.test',
        mode: 'standard'
      });

      // Complete with non-standard values: outputTokens as NaN, negative cost
      await hybridRepo.completeAnalysisRun(run1.runId, {
        status: 'passed',
        outputTokens: NaN,
        costUsd: -12.34567,
        rawScrapePayload: { note: 'adversarial test payload' }
      });

      const res = await fetch(`${baseUrl}/api/v3/analytics/kpi`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.equal(data.totalRuns, 1);
      assert.equal(data.passedRuns, 1);
      assert.equal(data.passRate, 100);
      // outputTokens: NaN sanitized to 0
      assert.equal(data.totalTokens, 0);
      assert.ok(!Number.isNaN(data.totalTokens), 'totalTokens must not be NaN');
      assert.equal(data.totalCostUsd, -12.3457); // rounded to 4 decimals

      // Second run with large token count and normal cost
      const run2 = await hybridRepo.startAnalysisRun({
        siteSlug: 'valid-client',
        targetUrl: 'https://valid.client.test/2',
        mode: 'standard'
      });
      await hybridRepo.completeAnalysisRun(run2.runId, {
        status: 'failed',
        outputTokens: 2500000,
        costUsd: 15.50
      });

      const res2 = await fetch(`${baseUrl}/api/v3/analytics/kpi`);
      assert.equal(res2.status, 200);
      const data2 = await res2.json();

      assert.equal(data2.totalRuns, 2);
      assert.equal(data2.passedRuns, 1);
      assert.equal(data2.failedRuns, 1);
      assert.equal(data2.passRate, 50); // 1 / 2 = 50%
      assert.equal(data2.totalTokens, 2500000);
      assert.equal(data2.totalCostUsd, 3.1543); // -12.34567 + 15.50 = 3.15433 -> 3.1543
    });

    test('1.3 Direct SQL corrupted row injection resilience', async () => {
      // Inject row with NULL outputTokens and NULL costUsd directly into SQLite
      hybridRepo.sqliteEngine.run(
        `INSERT INTO analysis_runs (id, siteId, siteSlug, targetUrl, mode, status, outputTokens, costUsd, createdAt)
         VALUES ('corrupt-row-1', NULL, 'corrupt-slug', 'https://corrupt.test', 'test', 'passed', NULL, NULL, datetime('now'))`
      );

      const res = await fetch(`${baseUrl}/api/v3/analytics/kpi`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.ok(data.totalRuns >= 3);
      assert.ok(!Number.isNaN(data.totalTokens), 'totalTokens must not be NaN despite NULL in database');
      assert.ok(!Number.isNaN(data.totalCostUsd), 'totalCostUsd must not be NaN despite NULL in database');
      assert.equal(typeof data.totalTokens, 'number');
      assert.equal(typeof data.totalCostUsd, 'number');
    });
  });

  // =========================================================================
  // Challenge 2: /api/v3/runs Pagination & Query Boundary Defense
  // =========================================================================
  describe('Challenge 2: /api/v3/runs Pagination with Invalid Page Numbers & Injections', () => {
    test('2.1 Negative page numbers clamp safely to page 1 (HTTP 200)', async () => {
      const res = await fetch(`${baseUrl}/api/v3/runs?page=-1&limit=10`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.equal(data.pagination.page, 1, 'page=-1 must clamp to page 1');
      assert.equal(data.pagination.offset, 0, 'offset must be 0');
      assert.ok(data.runs.length > 0);
    });

    test('2.2 page=0 clamps safely to page 1 (HTTP 200)', async () => {
      const res = await fetch(`${baseUrl}/api/v3/runs?page=0&limit=10`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.pagination.page, 1, 'page=0 must clamp to page 1');
      assert.equal(data.pagination.offset, 0);
    });

    test('2.3 Non-numeric page parameter handles gracefully without server crash (HTTP 200)', async () => {
      for (const invalidPage of ['abc', 'null', 'undefined']) {
        const res = await fetch(`${baseUrl}/api/v3/runs?page=${invalidPage}&limit=10`);
        assert.equal(res.status, 200, `page=${invalidPage} must return HTTP 200`);
        const data = await res.json();
        assert.equal(data.success, true);
        assert.ok(Array.isArray(data.runs), 'runs must be an array');
      }
    });

    test('2.4 Extreme page number (page=999999) returns HTTP 200 with empty runs array and correct total', async () => {
      const res = await fetch(`${baseUrl}/api/v3/runs?page=999999&limit=10`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.equal(data.runs.length, 0, 'Out-of-range page must return empty runs array');
      assert.ok(data.total > 0, 'Total runs must be accurate');
      assert.equal(data.pagination.page, 999999);
      assert.equal(data.pagination.offset, (999999 - 1) * 10);
    });

    test('2.5 Limit boundary clamping: limit=0 clamps to min 1, limit=1000 clamps to max 100', async () => {
      // limit=0 -> clamped to 1
      const resZero = await fetch(`${baseUrl}/api/v3/runs?limit=0`);
      assert.equal(resZero.status, 200);
      const dataZero = await resZero.json();
      assert.equal(dataZero.pagination.limit, 1, 'limit=0 must clamp to min 1');
      assert.equal(dataZero.runs.length, 1);

      // limit=-50 -> clamped to 1
      const resNeg = await fetch(`${baseUrl}/api/v3/runs?limit=-50`);
      assert.equal(resNeg.status, 200);
      const dataNeg = await resNeg.json();
      assert.equal(dataNeg.pagination.limit, 1, 'limit=-50 must clamp to min 1');

      // limit=1000 -> clamped to 100
      const resMax = await fetch(`${baseUrl}/api/v3/runs?limit=1000`);
      assert.equal(resMax.status, 200);
      const dataMax = await resMax.json();
      assert.equal(dataMax.pagination.limit, 100, 'limit=1000 must clamp to max 100');
    });

    test('2.6 SQL injection attempt in sortBy and sortOrder parameters handled safely without error or injection', async () => {
      const maliciousSort = encodeURIComponent("createdAt; DROP TABLE analysis_runs; --");
      const maliciousOrder = encodeURIComponent("ASC; SELECT * FROM sites; --");

      const res = await fetch(`${baseUrl}/api/v3/runs?sortBy=${maliciousSort}&sortOrder=${maliciousOrder}`);
      assert.equal(res.status, 200, 'SQL injection attempt must not crash server');
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.runs));

      // Verify table was NOT dropped
      const checkTable = hybridRepo.sqliteEngine.get("SELECT name FROM sqlite_master WHERE type='table' AND name='analysis_runs'");
      assert.ok(checkTable, 'analysis_runs table must still exist intact');
    });
  });

  // =========================================================================
  // Challenge 3: /api/v3/files/content Directory Traversal Defense
  // =========================================================================
  describe('Challenge 3: /api/v3/files/content Directory Traversal Defense', () => {
    test('3.1 Missing path query parameter returns HTTP 400', async () => {
      const res = await fetch(`${baseUrl}/api/v3/files/content`);
      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.match(data.error, /path.*required/i);
    });

    test('3.2 Simple path traversal attempts (../../) return HTTP 400', async () => {
      const traversalVectors = [
        '../../package.json',
        '../../../etc/passwd',
        '..\\..\\package.json',
        'clientes/../../package.json',
        'copias/../package.json',
        'copias/../../package.json',
        'projetos/../../package.json'
      ];

      for (const vector of traversalVectors) {
        const res = await fetch(`${baseUrl}/api/v3/files/content?path=${encodeURIComponent(vector)}`);
        assert.equal(res.status, 400, `Vector "${vector}" must be rejected with HTTP 400`);
        const data = await res.json();
        assert.equal(data.success, false);
        assert.match(data.error, /unsafe path/i);
      }
    });

    test('3.3 URI-encoded and double-encoded traversal attempts (%2e%2e%2f, %252e%252e%252f) return HTTP 400', async () => {
      const encodedVectors = [
        '%2e%2e%2f%2e%2e%2fpackage.json',
        '%2e%2e/%2e%2e/package.json',
        '..%2f..%2fpackage.json',
        '%252e%252e%252f%252e%252e%252fpackage.json', // double encoded
        'clientes/%2e%2e/%2e%2e/package.json'
      ];

      for (const vector of encodedVectors) {
        // Send raw in URL query
        const res = await fetch(`${baseUrl}/api/v3/files/content?path=${vector}`);
        assert.equal(res.status, 400, `Encoded vector "${vector}" must be rejected with HTTP 400`);
        const data = await res.json();
        assert.equal(data.success, false);
        assert.match(data.error, /unsafe path/i);
      }
    });

    test('3.4 Null-byte injection attempts return HTTP 400', async () => {
      const nullVectors = [
        'clientes/valid-client/DNA.md\0.jpg',
        'copias/valid-clone/site/index.html%00.txt'
      ];

      for (const vector of nullVectors) {
        const res = await fetch(`${baseUrl}/api/v3/files/content?path=${encodeURIComponent(vector)}`);
        assert.equal(res.status, 400, `Null byte vector must be rejected with HTTP 400`);
        const data = await res.json();
        assert.equal(data.success, false);
      }
    });

    test('3.5 Non-existent safe path returns HTTP 404', async () => {
      const res = await fetch(`${baseUrl}/api/v3/files/content?path=clientes/valid-client/ghost-file.txt`);
      assert.equal(res.status, 404);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.match(data.error, /file not found/i);
    });

    test('3.6 Legitimate text and binary files serve with correct metadata and HTTP 200', async () => {
      // Text file
      const textRes = await fetch(`${baseUrl}/api/v3/files/content?path=clientes/valid-client/DNA.md`);
      assert.equal(textRes.status, 200);
      const textData = await textRes.json();
      assert.equal(textData.success, true);
      assert.equal(textData.isBinary, false);
      assert.equal(textData.content, '# Valid DNA');
      assert.equal(textData.type, 'md');

      // Binary file
      const binRes = await fetch(`${baseUrl}/api/v3/files/content?path=copias/valid-clone/site/assets/sample.png`);
      assert.equal(binRes.status, 200);
      const binData = await binRes.json();
      assert.equal(binData.success, true);
      assert.equal(binData.isBinary, true);
      assert.equal(binData.type, 'png');
      assert.equal(Buffer.from(binData.base64, 'base64').toString('utf8'), 'FAKE_PNG_BINARY_DATA');
    });
  });

  // =========================================================================
  // Challenge 4: Empty State Banner & Corrupted Artifact Robustness
  // =========================================================================
  describe('Challenge 4: Empty State Banner & Corrupted Artifact UI Robustness', () => {
    test('4.1 Zero copias and zero clientes: renders empty-state-banner with instructional guidance', () => {
      const html = buildDashboardHtml([], []);

      assert.ok(html.includes('<div class="empty-state-banner">'), 'Must render empty-state-banner container');
      assert.match(html, /No clones or analysis runs available/i, 'Must include descriptive empty state notice');
      assert.match(html, /bin\/cli\.js/i, 'Must provide actionable CLI instructions');
      assert.equal(/alert\s*\(/i.test(html), false, 'Must have zero blocking alert dialogs');
      assert.equal(/confirm\s*\(/i.test(html), false, 'Must have zero blocking confirm dialogs');

      // Token compliance
      const tokenResult = validate21stDevTokens(html);
      assert.equal(tokenResult.valid, true);
      assert.equal(tokenResult.score, 1.0);
    });

    test('4.2 Incomplete or corrupted client folder: renders Incomplete Artifact badge', () => {
      const tempFixtures = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger_corrupt_'));
      try {
        // Create an incomplete/corrupted client directory (no site/index.html, no DNA.md, no dna-ir.json)
        const corruptedSlug = 'broken-client-xyz';
        const clientPath = path.join(tempFixtures, corruptedSlug);
        fs.mkdirSync(clientPath, { recursive: true });
        fs.writeFileSync(path.join(clientPath, 'corrupted_scratch.log'), 'error on extraction');

        const html = buildDashboardHtml([], [corruptedSlug], { clientesDir: tempFixtures });

        assert.ok(html.includes('Incomplete Artifact'), 'Corrupted directory must display Incomplete Artifact badge');
        assert.ok(html.includes('badge-warning'), 'Incomplete Artifact must use badge-warning class');
        assert.ok(html.includes(corruptedSlug), 'Client slug must be displayed');
        assert.doesNotMatch(html, /TypeError|ReferenceError/i, 'Rendering corrupted client must not throw or produce JS errors in markup');
      } finally {
        fs.rmSync(tempFixtures, { recursive: true, force: true });
      }
    });

    test('4.3 Valid client directory renders Experimental badge and no unverified readiness claims', () => {
      const tempFixtures = fs.mkdtempSync(path.join(os.tmpdir(), 'challenger_valid_'));
      try {
        const slug = 'solid-client';
        const clientPath = path.join(tempFixtures, slug);
        fs.mkdirSync(path.join(clientPath, 'site'), { recursive: true });
        fs.writeFileSync(path.join(clientPath, 'site', 'index.html'), '<html><body>Hello</body></html>');
        fs.writeFileSync(path.join(clientPath, 'DNA.md'), '# Solid DNA');

        const html = buildDashboardHtml([], [slug], { clientesDir: tempFixtures });

        assert.ok(html.includes('badge-experimental'), 'Valid client must show badge-experimental');
        assert.match(html, /Experimental/, 'Valid client must display Experimental badge text');
        assert.doesNotMatch(html, /Incomplete Artifact/, 'Valid client must not have Incomplete Artifact badge');
        // AGENTS.md truth protocol
        assert.doesNotMatch(
          html,
          /Producao Isolada|ICM Ready|pronto para deploy/i,
          'Must not contain unverified marketing claims of production readiness'
        );
      } finally {
        fs.rmSync(tempFixtures, { recursive: true, force: true });
      }
    });
  });
});
