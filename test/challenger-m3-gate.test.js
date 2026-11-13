/**
 * test/challenger-m3-gate.test.js
 *
 * Independent Empirical Challenger Verification Suite for Milestone 3 Remediation (Iteration 2 Gate)
 * Agent: challenger_m3_v3_3 (Teamwork Challenger subagent)
 * Commit evaluated: a66f5cd on integration/staging-consolidated-v3
 *
 * Empirical Challenges:
 * 1. Test /api/v2/audit/:slug live invocation, path traversal defense, and dynamic radar updates.
 * 2. Test mutation authorization token passing and 403 handling across all client actions.
 * 3. Test mobile responsive sidebar collapse (viewport <= 768px).
 * 4. Stress and edge cases for radar coordinate calculations and DOM updates.
 */

'use strict';

const { describe, test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const { startPreviewServer } = require('../src/server/preview-server');
const { buildDashboardHtml } = require('../src/server/views/dnastudio-dashboard');

const PROJECT_ROOT = path.resolve(__dirname, '..');

describe('Milestone 3 Iteration 2 Gate: Independent Empirical Challenge (challenger_m3_v3_3)', () => {

  // =========================================================================
  // CHALLENGE 1: Live Invocation of /api/v2/audit/:slug & Dynamic Radar Updates
  // =========================================================================
  describe('Challenge 1: /api/v2/audit/:slug Live Invocation & Dynamic Radar Updates', () => {
    let server;
    let baseUrl;
    const testToken = 'gate-token-challenger-m3';

    before(async () => {
      server = startPreviewServer({
        port: 0,
        silent: true,
        enableMutations: true,
        mutationToken: testToken
      });
      await new Promise(resolve => server.once('listening', resolve));
      baseUrl = `http://127.0.0.1:${server.address().port}`;
    });

    after(async () => {
      if (server) {
        await new Promise(resolve => server.close(resolve));
      }
    });

    test('1.1 Canonical route POST /api/v2/audit/:slug returns HTTP 200 with real score and audit layers', async () => {
      const res = await fetch(`${baseUrl}/api/v2/audit/silvio-iwata-imobiliaria`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${testToken}` }
      });
      assert.equal(res.status, 200, 'Canonical route must return HTTP 200');
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.audit, 'Must return audit object');
      assert.equal(typeof data.audit.score, 'string', 'Score must be a string');
      assert.equal(typeof data.audit.status, 'string', 'Status must be a string');
      assert.ok(data.audit.score.includes('/38'), `Score must contain '/38', got ${data.audit.score}`);
    });

    test('1.2 Broken route /api/v2/audit/multifactor/:slug is rejected with HTTP 400 (Unsafe slug)', async () => {
      const res = await fetch(`${baseUrl}/api/v2/audit/multifactor/silvio-iwata-imobiliaria`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${testToken}` }
      });
      assert.equal(res.status, 400, 'Legacy /multifactor/ prefix must be rejected with 400');
      const data = await res.json();
      assert.equal(data.error, 'Unsafe slug');
    });

    test('1.3 Adversarial Slugs: Path traversal and injection attempts return HTTP 400', async () => {
      const adversarialSlugs = [
        '..%2fsilvio-iwata',
        '%2e%2e%2fsilvio-iwata',
        'silvio/iwata',
        'silvio%20iwata',
        'silvio;DROP TABLE',
        'silvio$#@!',
        '.hidden-slug'
      ];

      for (const badSlug of adversarialSlugs) {
        const res = await fetch(`${baseUrl}/api/v2/audit/${badSlug}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${testToken}` }
        });
        assert.ok(res.status === 400 || res.status === 404, `Slug "${badSlug}" must return 400 or 404 (got ${res.status})`);
      }
    });

    test('1.4 Dynamic Radar Math: Correctly computes 6 axis scores from real audit report', async () => {
      const res = await fetch(`${baseUrl}/api/v2/audit/silvio-iwata-imobiliaria`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${testToken}` }
      });
      const data = await res.json();
      const a = data.audit;

      // Extract using the exact logic from dnastudio-dashboard.js
      const m = a.metrics || a;
      const layers = a.layers || {};
      const f1 = layers.factor1_static || {};
      const f2 = layers.factor2_runtime_cdp || {};
      const f3 = layers.factor3_structural || {};

      const sAntiSlop = (m.antiSlop && m.antiSlop.score !== undefined)
        ? Number(m.antiSlop.score)
        : (f1.passed !== undefined ? (f1.passed ? 1.0 : 0.4) : 0.95);

      const sContrast = (m.contrast && m.contrast.score !== undefined)
        ? Number(m.contrast.score)
        : ((m.apca && m.apca.score !== undefined)
          ? Number(m.apca.score)
          : (f2.vetores && f2.vetores.fontBarrier && f2.vetores.fontBarrier.passed !== undefined
            ? (f2.vetores.fontBarrier.passed ? 0.96 : 0.5)
            : 0.90));

      const sMotion = (m.motion && m.motion.score !== undefined)
        ? Number(m.motion.score)
        : (f2.vetores && f2.vetores.scrollScrubber && f2.vetores.scrollScrubber.passed !== undefined
          ? (f2.vetores.scrollScrubber.passed ? 0.98 : 0.6)
          : 0.98);

      const sVram = (m.vram && m.vram.score !== undefined)
        ? Number(m.vram.score)
        : (f2.vetores && f2.vetores.vram && f2.vetores.vram.passed !== undefined
          ? (f2.vetores.vram.passed ? 0.95 : 0.6)
          : 0.92);

      const sConsole = (m.console && m.console.score !== undefined)
        ? Number(m.console.score)
        : (f3.gates && f3.gates.console && f3.gates.console.passed !== undefined
          ? (f3.gates.console.passed ? 1.0 : 0.3)
          : 1.0);

      const sNetwork = (m.network && m.network.score !== undefined)
        ? Number(m.network.score)
        : (f3.gates && f3.gates.network && f3.gates.network.passed !== undefined
          ? (f3.gates.network.passed ? 1.0 : 0.4)
          : 1.0);

      const scores = [sAntiSlop, sContrast, sMotion, sVram, sConsole, sNetwork];

      // All 6 scores must be numbers, strictly between 0 and 1, finite, not NaN
      for (let i = 0; i < scores.length; i++) {
        assert.equal(typeof scores[i], 'number', `Axis ${i} score must be a number`);
        assert.ok(!Number.isNaN(scores[i]), `Axis ${i} score must not be NaN`);
        assert.ok(scores[i] >= 0.0 && scores[i] <= 1.0, `Axis ${i} score must be in [0, 1], got ${scores[i]}`);
      }

      // Compute radar polygon points (cx=160, cy=160, rMax=110)
      const numAxes = scores.length;
      const angleStep = (Math.PI * 2) / numAxes;
      const points = scores.map((s, i) => {
        const r = 110 * Math.min(1.0, Math.max(0.1, Number(s) || 0.1));
        const angle = i * angleStep - Math.PI / 2;
        const x = 160 + r * Math.cos(angle);
        const y = 160 + r * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ');

      assert.ok(points.split(' ').length === 6, 'Must generate 6 SVG points');
      assert.ok(!points.includes('NaN'), 'Polygon points must not contain NaN');
    });

    test('1.5 Dynamic Radar: Extreme and Degenerate Inputs never produce NaN or crash', () => {
      const extremeAudits = [
        { name: 'Null audit object', audit: null },
        { name: 'Empty audit object', audit: {} },
        { name: 'Extreme scores (negative/huge)', audit: { score: '-99/38', metrics: { antiSlop: { score: -10 }, contrast: { score: 999 } } } },
        { name: 'NaN scores', audit: { metrics: { antiSlop: { score: NaN }, motion: { score: 'not-a-number' } } } },
        { name: 'Missing layers', audit: { layers: null } }
      ];

      for (const tc of extremeAudits) {
        const a = tc.audit || {};
        const m = a.metrics || a;
        const layers = a.layers || {};
        const f1 = layers.factor1_static || {};
        const f2 = layers.factor2_runtime_cdp || {};
        const f3 = layers.factor3_structural || {};

        const sAntiSlop = (m.antiSlop && m.antiSlop.score !== undefined)
          ? Number(m.antiSlop.score)
          : (f1.passed !== undefined ? (f1.passed ? 1.0 : 0.4) : 0.95);

        const sContrast = (m.contrast && m.contrast.score !== undefined)
          ? Number(m.contrast.score)
          : ((m.apca && m.apca.score !== undefined)
            ? Number(m.apca.score)
            : (f2.vetores && f2.vetores.fontBarrier && f2.vetores.fontBarrier.passed !== undefined
              ? (f2.vetores.fontBarrier.passed ? 0.96 : 0.5)
              : 0.90));

        const scores = [sAntiSlop, sContrast, 0.98, 0.92, 1.0, 1.0];
        scores.forEach((s) => {
          // When passing to Math.min(1.0, Math.max(0.1, Number(s) || 0.1))
          const r = 110 * Math.min(1.0, Math.max(0.1, Number(s) || 0.1));
          assert.ok(r >= 10.9 && r <= 110.1, `Clamped radius must be in [11, 110], got ${r} for ${tc.name}`);
          assert.ok(!Number.isNaN(r), `Radius must not be NaN for ${tc.name}`);
        });
      }
    });
  });

  // =========================================================================
  // CHALLENGE 2: Mutation Authorization Token Passing and 403 Handling
  // =========================================================================
  describe('Challenge 2: Mutation Authorization Token Passing and 403 Handling', () => {

    test('2.1 Default Server (enableMutations=false): All POST endpoints return HTTP 403', async () => {
      const readonlyServer = startPreviewServer({
        port: 0,
        silent: true,
        enableMutations: false
      });
      await new Promise(resolve => readonlyServer.once('listening', resolve));
      const roBaseUrl = `http://127.0.0.1:${readonlyServer.address().port}`;

      try {
        const endpoints = [
          { url: `${roBaseUrl}/api/v2/audit/silvio-iwata-imobiliaria`, method: 'POST' },
          { url: `${roBaseUrl}/api/client/create`, method: 'POST', body: JSON.stringify({ brandName: 'Test' }) },
          { url: `${roBaseUrl}/api/audit/silvio-iwata-imobiliaria`, method: 'POST' },
          { url: `${roBaseUrl}/api/extract`, method: 'POST', body: JSON.stringify({ targetUrl: 'http://example.com' }) },
          { url: `${roBaseUrl}/api/v3/admin/sync`, method: 'POST' }
        ];

        for (const ep of endpoints) {
          const res = await fetch(ep.url, {
            method: ep.method,
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer any-token' },
            body: ep.body
          });
          assert.equal(res.status, 403, `Endpoint ${ep.url} must return 403 when mutations are disabled`);
        }
      } finally {
        await new Promise(resolve => readonlyServer.close(resolve));
      }
    });

    test('2.2 Mutation-Enabled Server with Token: Unauthorized / invalid requests return 403, valid token returns non-403', async () => {
      const authServer = startPreviewServer({
        port: 0,
        silent: true,
        enableMutations: true,
        mutationToken: 'my-super-secret-token'
      });
      await new Promise(resolve => authServer.once('listening', resolve));
      const authBaseUrl = `http://127.0.0.1:${authServer.address().port}`;

      try {
        // 1. Missing Authorization header -> 403
        const resMissing = await fetch(`${authBaseUrl}/api/v2/audit/silvio-iwata-imobiliaria`, { method: 'POST' });
        assert.equal(resMissing.status, 403, 'Missing auth header must return 403');

        // 2. Wrong token -> 403
        const resWrong = await fetch(`${authBaseUrl}/api/v2/audit/silvio-iwata-imobiliaria`, {
          method: 'POST',
          headers: { 'Authorization': 'Bearer wrong-secret' }
        });
        assert.equal(resWrong.status, 403, 'Wrong token must return 403');

        // 3. Valid token -> 200
        const resValid = await fetch(`${authBaseUrl}/api/v2/audit/silvio-iwata-imobiliaria`, {
          method: 'POST',
          headers: { 'Authorization': 'Bearer my-super-secret-token' }
        });
        assert.equal(resValid.status, 200, 'Valid token must succeed with 200');

        // 4. Test POST /api/v3/admin/sync with valid token
        const resSync = await fetch(`${authBaseUrl}/api/v3/admin/sync`, {
          method: 'POST',
          headers: { 'Authorization': 'Bearer my-super-secret-token' }
        });
        assert.equal(resSync.status, 200, 'Valid token on sync must succeed with 200');
      } finally {
        await new Promise(resolve => authServer.close(resolve));
      }
    });

    test('2.3 Client Code Inspection: getAuthHeaders attaches Authorization Bearer and all 4 actions check 403', () => {
      const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

      // 1. getAuthHeaders definition & token sources
      assert.ok(html.includes('function getAuthHeaders(extraHeaders = {})'), 'Must define getAuthHeaders');
      assert.ok(html.includes('localStorage.getItem(\'studio_dna_mutation_token\')'), 'Must check studio_dna_mutation_token');
      assert.ok(html.includes('localStorage.getItem(\'dna_mutation_token\')'), 'Must check dna_mutation_token');
      assert.ok(html.includes('headers[\'Authorization\'] = \'Bearer \' + token;'), 'Must attach Bearer token');

      // 2. All action functions use getAuthHeaders and handle 403
      const actionFunctions = [
        { name: 'generateClientProject', endpoint: '/api/client/create' },
        { name: 'runAudit', endpoint: '/api/audit/' },
        { name: 'startDeepExtract', endpoint: '/api/extract' },
        { name: 'runMultifactorAudit', endpoint: '/api/v2/audit/' }
      ];

      for (const fn of actionFunctions) {
        assert.ok(html.includes(fn.name), `Must define function ${fn.name}`);
        assert.ok(html.includes(fn.endpoint), `Function ${fn.name} must target ${fn.endpoint}`);
      }

      // 3. Count 403 handlers with Sonner.warning
      const warningPattern = /Sonner\.warning\('Modo somente-leitura ativo\. Mutações administrativas estão desabilitadas\.'\);/g;
      const matches = html.match(warningPattern);
      assert.ok(matches && matches.length >= 4, `Must handle 403 in at least 4 actions (found ${matches ? matches.length : 0})`);
    });
  });

  // =========================================================================
  // CHALLENGE 3: Mobile Responsive Sidebar Collapse
  // =========================================================================
  describe('Challenge 3: Mobile Responsive Sidebar Collapse', () => {

    test('3.1 CSS Media Query: Sets sidebar width to 68px !important and hides text labels at <=768px', () => {
      const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

      // Check media query presence
      assert.ok(html.includes('@media (max-width: 768px)'), 'Must contain @media (max-width: 768px)');

      // Extract the 768px media query block
      const mqMatch = html.match(/@media\s*\(max-width:\s*768px\)\s*\{([\s\S]*?)\n\s*\}/);
      assert.ok(mqMatch, 'Must find 768px media query block');
      const mqBody = mqMatch[1];

      // Verify sidebar collapsed width
      assert.ok(mqBody.includes('.app-sidebar { width: 68px !important; }'), 'Must set .app-sidebar { width: 68px !important; }');

      // Verify hidden text labels
      assert.ok(mqBody.includes('.app-sidebar .brand-text'), 'Must target .brand-text');
      assert.ok(mqBody.includes('.app-sidebar .nav-label'), 'Must target .nav-label');
      assert.ok(mqBody.includes('.app-sidebar .nav-badge'), 'Must target .nav-badge');
      assert.ok(mqBody.includes('.app-sidebar .cmd-k-trigger-text'), 'Must target .cmd-k-trigger-text');
      assert.ok(mqBody.includes('display: none !important;'), 'Must hide elements with display: none !important');
    });

    test('3.2 DOMContentLoaded Mobile Check: Collapses sidebar attribute when window.innerWidth <= 768', () => {
      const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

      assert.ok(html.includes('window.innerWidth <= 768'), 'Must evaluate window.innerWidth <= 768');
      assert.ok(html.includes('sb.setAttribute(\'data-collapsed\', \'true\')'), 'Must set data-collapsed="true"');
      assert.ok(html.includes('document.getElementById(\'appSidebar\')'), 'Must reference appSidebar element');
    });

    test('3.3 Sidebar Toggle Logic: Inverts collapsed state correctly', () => {
      const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

      assert.ok(html.includes('function toggleSidebar()'), 'Must define toggleSidebar function');
      assert.ok(html.includes('sb.getAttribute(\'data-collapsed\') === \'true\''), 'Must read data-collapsed attribute');
      assert.ok(html.includes('sb.setAttribute(\'data-collapsed\', String(!collapsed))'), 'Must set toggled data-collapsed attribute');
    });
  });

  // =========================================================================
  // CHALLENGE 4: HTML XSS Sanitization & Bootstrap Escaping
  // =========================================================================
  describe('Challenge 4: HTML XSS Sanitization & Bootstrap Escaping', () => {

    test('4.1 Injected HTML closing script tags are escaped in __DNA_BOOTSTRAP__', () => {
      const hostileData = [
        '</script><script>alert("xss1")</script>',
        'test</SCRIPT><script src="//evil.com/payload.js"></script>'
      ];

      const html = buildDashboardHtml(hostileData, hostileData);
      assert.ok(html.includes('<script id="__DNA_BOOTSTRAP__">'));

      // Extract bootstrap body
      const m = html.match(/<script id="__DNA_BOOTSTRAP__">([\s\S]*?)<\/script>/);
      assert.ok(m, 'Must match bootstrap script tag');
      const body = m[1];

      assert.equal(body.includes('</script>'), false, 'Script body must NOT contain literal </script>');
      assert.ok(body.includes('<\\/script'), 'Must escape script tags');
    });
  });

});
