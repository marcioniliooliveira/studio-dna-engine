/**
 * test/dnastudio-modern-ui.test.js
 * 
 * Comprehensive Verification Suite for dnastudio 21st.dev UI/UX Modernization (M3 / F10-F16)
 * Validates:
 * - 21st.dev token taxonomy (bento-grid, floating-dock, badges, sonner, command-palette)
 * - Zero blocking alert()/confirm() calls
 * - Empty state banner on zero items
 * - Experimental and Incomplete Artifact badge enforcement
 * - Prohibition of unverified production readiness claims
 * - Complete presence of F10–F16 component hooks and client scripts
 * - Live HTTP preview server integration
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const http = require('http');

const { buildDashboardHtml } = require('../src/server/views/dnastudio-dashboard');
const { startPreviewServer } = require('../src/server/preview-server');
const { validate21stDevTokens, clampViewportDimensions } = require('./e2e/r1-r5-harness');

describe('dnastudio Modern UI/UX Component & Contract Verification Suite (M3 / F10-F16)', () => {

  test('F10–F16: buildDashboardHtml satisfies 100% of 21st.dev design tokens', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);
    const validation = validate21stDevTokens(html);

    assert.equal(validation.valid, true, 'HTML must be valid per 21st.dev criteria');
    assert.equal(validation.checks.hasBentoGrid, true, 'Must include bento-grid token');
    assert.equal(validation.checks.hasDock, true, 'Must include floating-dock token');
    assert.equal(validation.checks.hasBadges, true, 'Must include badge/status-pill token');
    assert.equal(validation.checks.hasToasts, true, 'Must include toast/sonner token');
    assert.equal(validation.checks.hasCommandPalette, true, 'Must include command-palette token');
    assert.equal(validation.score, 1, 'Token coverage must be 5/5 (100%)');
  });

  test('Invariant: Zero blocking alert() or confirm() dialogs in dashboard markup or scripts', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

    // Check for any literal alert( or confirm( calls
    const hasAlert = /alert\s*\(/i.test(html);
    const hasConfirm = /confirm\s*\(/i.test(html);

    assert.equal(hasAlert, false, 'Dashboard must have zero alert() calls');
    assert.equal(hasConfirm, false, 'Dashboard must have zero confirm() calls');
    assert.ok(html.includes('[data-sonner-toaster]'), 'Must include Sonner toaster element');
    assert.ok(html.includes('window.dnaToast = Sonner;'), 'Must export window.dnaToast');
  });

  test('Governance & Truth Protocol: Experimental badge on client builds & no unverified readiness claims', () => {
    const html = buildDashboardHtml([], ['silvio-iwata-imobiliaria']);

    // Must show Experimental badge
    assert.match(html, /Experimental/, 'Client builds must display Experimental badge');
    assert.ok(html.includes('badge-experimental'), 'Must use badge-experimental CSS token');

    // Strict prohibition of unverified claims (AGENTS.md)
    assert.doesNotMatch(
      html,
      /Producao Isolada|ICM Ready|pronto para deploy/i,
      'Must NOT contain forbidden marketing claims of production readiness'
    );
  });

  test('Boundary: Empty state renders empty-state-banner when zero items exist', () => {
    const emptyHtml = buildDashboardHtml([], []);
    assert.ok(emptyHtml.includes('empty-state-banner'), 'Empty state must render empty-state-banner element');
    assert.match(emptyHtml, /No clones or analysis runs available/i);
    assert.doesNotMatch(emptyHtml, /TypeError|ReferenceError/i);
  });

  test('Boundary: Corrupted/incomplete client folder renders Incomplete Artifact badge', () => {
    const tmpDir = path.join(__dirname, 'fixtures', 'tmp-corrupted-client-' + Date.now());
    const clientDir = path.join(tmpDir, 'corrupted-brand');
    fs.mkdirSync(clientDir, { recursive: true });
    // Write incomplete files (no index.html and no dna.json)
    fs.writeFileSync(path.join(clientDir, 'scratch.txt'), 'corrupted');

    try {
      const html = buildDashboardHtml([], ['corrupted-brand'], { clientesDir: tmpDir });
      assert.ok(html.includes('Incomplete Artifact'), 'Must render Incomplete Artifact badge for incomplete directory');
      assert.ok(html.includes('badge-warning'), 'Must use badge-warning class');
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  test('F10: Bento Metric Ribbon includes 4 KPI cards and real-time SVG sparklines', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

    assert.ok(html.includes('id="bento-ribbon"'), 'Must have bento-ribbon container');
    assert.ok(html.includes('id="kpi-total-runs"'), 'Must have total runs metric');
    assert.ok(html.includes('id="kpi-pass-rate"'), 'Must have pass rate metric');
    assert.ok(html.includes('id="kpi-tokens"'), 'Must have token volume metric');
    assert.ok(html.includes('id="kpi-anti-slop"'), 'Must have Anti-Slop metric');
    assert.ok(html.includes('id="sparkline-runs"'), 'Must have runs SVG sparkline');
    assert.ok(html.includes('id="sparkline-pass"'), 'Must have pass rate SVG sparkline');
    assert.ok(html.includes('Verified v3.0'), 'Must include Verified v3.0 status pill');
    assert.ok(html.includes('Inertial FPS'), 'Must include Inertial FPS metric');
    assert.ok(html.includes('APCA Contrast'), 'Must include APCA Contrast metric');
  });

  test('F11: Collapsible Sidebar, Floating Dock & ⌘K Command Palette', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

    // Sidebar
    assert.ok(html.includes('id="appSidebar"'), 'Must have collapsible sidebar');
    assert.ok(html.includes('toggleSidebar()'), 'Must have sidebar toggle logic');
    assert.ok(html.includes('tab-overview'), 'Must have overview navigation tab');
    assert.ok(html.includes('tab-runs'), 'Must have historical runs tab');
    assert.ok(html.includes('tab-files'), 'Must have artifact explorer tab');
    assert.ok(html.includes('tab-diff'), 'Must have visual diff tab');
    assert.ok(html.includes('tab-radar'), 'Must have 38-var radar tab');

    // Floating Dock
    assert.ok(html.includes('class="floating-dock dock-nav"'), 'Must have floating dock element');
    assert.ok(html.includes('dock-btn'), 'Must have dock action buttons');

    // ⌘K Modal
    assert.ok(html.includes('id="cmdKModal"'), 'Must have cmdK modal container');
    assert.ok(html.includes('id="cmdKInput"'), 'Must have cmdK search input');
    assert.ok(html.includes('id="cmdKResultsList"'), 'Must have cmdK results list');
  });

  test('F12: Interactive File & Artifact Explorer with split-pane layout', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

    assert.ok(html.includes('id="treeContainer"'), 'Must have file tree container');
    assert.ok(html.includes('id="previewContentArea"'), 'Must have preview content area');
    assert.ok(html.includes('id="previewFilePath"'), 'Must have preview path display');
    assert.ok(html.includes('setTreeBase(\'copias\')'), 'Must have tree base switcher for copias');
    assert.ok(html.includes('setTreeBase(\'clientes\')'), 'Must have tree base switcher for clientes');
    assert.ok(html.includes('copyCurrentPreviewContent()'), 'Must have copy preview content helper');
  });

  test('F13: Visual Before/After Diff Slider with 1440/768/390 viewport switcher', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

    assert.ok(html.includes('id="diffStage"'), 'Must have diff stage element');
    assert.ok(html.includes('id="diffRefFrame"'), 'Must have reference iframe');
    assert.ok(html.includes('id="diffClientFrame"'), 'Must have client iframe');
    assert.ok(html.includes('id="diffDivider"'), 'Must have draggable divider');
    assert.ok(html.includes('id="diffOverlay"'), 'Must have clip-path overlay');
    assert.ok(html.includes('setDiffViewport(1440, 900)'), 'Must support 1440px desktop viewport');
    assert.ok(html.includes('setDiffViewport(768, 1024)'), 'Must support 768px tablet viewport');
    assert.ok(html.includes('setDiffViewport(390, 844)'), 'Must support 390px mobile viewport');

    // Normalization check
    const vp = clampViewportDimensions(1440, 900);
    assert.equal(vp.width, 1440);
    assert.equal(vp.height, 900);
  });

  test('F14: 38-Variable Multi-Factor Quality Radar with SVG polygon & 4 accordions', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

    assert.ok(html.includes('id="auditRadarSvg"'), 'Must have radar SVG element');
    assert.ok(html.includes('id="radarDataPolygon"'), 'Must have data polygon');
    assert.ok(html.includes('web-polygon'), 'Must have web concentric guides');
    assert.ok(html.includes('id="acc-anti-slop"'), 'Must have Anti-Slop accordion (8 variables)');
    assert.ok(html.includes('id="acc-apca"'), 'Must have APCA accordion (7 variables)');
    assert.ok(html.includes('id="acc-motion"'), 'Must have Motion accordion (8 variables)');
    assert.ok(html.includes('id="acc-runtime"'), 'Must have Runtime CDP accordion (15 variables)');
    assert.ok(html.includes('id="radarTotalScore"'), 'Must display 38/38 total score');
  });

  test('F15: Sortable Historical Runs Table & Slide-Over Sheet Inspector', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

    assert.ok(html.includes('id="runsTableBody"'), 'Must have runs table body');
    assert.ok(html.includes('sortRuns(\'id\')'), 'Must support sorting by id');
    assert.ok(html.includes('sortRuns(\'siteSlug\')'), 'Must support sorting by siteSlug');
    assert.ok(html.includes('sortRuns(\'outputTokens\')'), 'Must support sorting by outputTokens');
    assert.ok(html.includes('id="sheetDrawer"'), 'Must have slide-over sheet drawer');
    assert.ok(html.includes('data-vaul-drawer'), 'Must have Vaul drawer attribute');
    assert.ok(html.includes('id="sheetRawJsonCode"'), 'Must display raw JSON payload');
  });

  test('Live Preview Server Integration: Serves modernized dnastudio on GET / and /index.html', async () => {
    const server = startPreviewServer({
      port: 0,
      silent: true
    });

    await new Promise((resolve) => server.once('listening', resolve));
    const port = server.address().port;

    try {
      // 1. Query root /
      const res = await fetch(`http://127.0.0.1:${port}/`);
      assert.equal(res.status, 200, 'Root route must return HTTP 200');
      const html = await res.text();

      assert.ok(html.includes('Studio DNA - dnastudio Command Center'), 'Must have modernized page title');
      assert.ok(html.includes('dnastudio Production Hub'), 'Must have header hub label');
      assert.ok(html.includes('viewport'), 'Must have viewport tag');

      // 2. Validate tokens from live response
      const tokens = validate21stDevTokens(html);
      assert.equal(tokens.valid, true, 'Live HTML must satisfy 21st.dev tokens');
      assert.equal(tokens.score, 1, 'Live HTML must score 100% on tokens');

      // 3. Query /index.html
      const resIndex = await fetch(`http://127.0.0.1:${port}/index.html`);
      assert.equal(resIndex.status, 200, '/index.html must return HTTP 200');
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('Remediation Item 1: runMultifactorAudit targets canonical /api/v2/audit/:slug endpoint', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);
    assert.ok(html.includes('/api/v2/audit/\' + encodeURIComponent(slug)'), 'Must call canonical /api/v2/audit/:slug route');
    assert.equal(html.includes('/api/v2/audit/multifactor/'), false, 'Must NOT contain legacy /multifactor/ prefix in audit call');
  });

  test('Remediation Item 2: Dynamic radar polygon computation and score updates', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);
    assert.ok(html.includes('sAntiSlop'), 'Must dynamically calculate sAntiSlop');
    assert.ok(html.includes('sContrast'), 'Must dynamically calculate sContrast');
    assert.ok(html.includes('sMotion'), 'Must dynamically calculate sMotion');
    assert.ok(html.includes('sVram'), 'Must dynamically calculate sVram');
    assert.ok(html.includes('sConsole'), 'Must dynamically calculate sConsole');
    assert.ok(html.includes('sNetwork'), 'Must dynamically calculate sNetwork');
    assert.ok(html.includes('updateRadarData([sAntiSlop, sContrast, sMotion, sVram, sConsole, sNetwork])'), 'Must pass dynamic scores array to updateRadarData');
    assert.ok(html.includes('radarTotalScore'), 'Must update radarTotalScore element');
    assert.ok(html.includes('radarStatusText'), 'Must update radarStatusText element');
  });

  test('Remediation Item 3: Mutation token attachment and 403 read-only warning toast across actions', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);
    assert.ok(html.includes('function getAuthHeaders'), 'Must define getAuthHeaders helper');
    assert.ok(html.includes('headers[\'Authorization\'] = \'Bearer \' + token'), 'Must attach Authorization Bearer token');

    const warningMsg = 'Modo somente-leitura ativo. Mutações administrativas estão desabilitadas.';
    const occurrences = (html.match(/Modo somente-leitura ativo\. Mutações administrativas estão desabilitadas\./g) || []).length;
    assert.ok(occurrences >= 4, `Must handle 403 warning across at least 4 actions (found ${occurrences})`);
  });

  test('Remediation Item 4: Mobile media query collapses sidebar to 68px and DOMContentLoaded collapses <= 768px', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);
    assert.ok(html.includes('@media (max-width: 768px)'), 'Must have 768px media query');
    assert.ok(html.includes('.app-sidebar { width: 68px !important; }'), 'Must set .app-sidebar width to 68px in mobile media query');
    assert.ok(html.includes('window.innerWidth <= 768'), 'Must check window.innerWidth <= 768 on load');
    assert.ok(html.includes('sb.setAttribute(\'data-collapsed\', \'true\')'), 'Must set data-collapsed on mobile load');
  });

  test('Remediation Item 5: JSON bootstrap in __DNA_BOOTSTRAP__ safely escapes </script> tags', () => {
    const maliciousHtml = buildDashboardHtml(
      ['malicious-clone</script><script>alert("xss")</script>'],
      ['evil-client</script><script>window.pwned=true;</script>']
    );

    assert.ok(maliciousHtml.includes('<script id="__DNA_BOOTSTRAP__">'), 'Must include __DNA_BOOTSTRAP__ script id');
    const bootstrapMatch = maliciousHtml.match(/<script id="__DNA_BOOTSTRAP__">([\s\S]*?)<\/script>/);
    assert.ok(bootstrapMatch, 'Must find valid closing tag for bootstrap script');
    const scriptBody = bootstrapMatch[1];
    assert.equal(scriptBody.includes('</script>'), false, 'Script body must NOT contain unescaped </script>');
    assert.ok(scriptBody.includes('<\\/script>'), 'Must escape script tags to <\\/script>');
  });

  test('Live Preview Server: POST /api/v2/audit/:slug returns HTTP 200 with dynamic audit data', async () => {
    const server = startPreviewServer({
      port: 0,
      silent: true,
      enableMutations: true,
      mutationToken: 'test-m3-secret'
    });

    await new Promise((resolve) => server.once('listening', resolve));
    const port = server.address().port;

    try {
      // 1. Unauthorized attempt returns 403
      const unauthRes = await fetch(`http://127.0.0.1:${port}/api/v2/audit/silvio-iwata-imobiliaria`, {
        method: 'POST'
      });
      assert.equal(unauthRes.status, 403, 'Unauthorized mutation must return 403');

      // 2. Authorized attempt returns 200 with audit payload
      const authRes = await fetch(`http://127.0.0.1:${port}/api/v2/audit/silvio-iwata-imobiliaria`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer test-m3-secret' }
      });
      assert.equal(authRes.status, 200, 'Authorized audit must return 200');
      const data = await authRes.json();
      assert.equal(data.success, true);
      assert.ok(data.audit, 'Must return audit object');
      assert.ok(typeof data.audit.score === 'string', 'Must include audit score');
      assert.ok(typeof data.audit.status === 'string', 'Must include audit status');
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
  });

});
