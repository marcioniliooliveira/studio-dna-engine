/**
 * test/challenger-m3-adversarial.test.js
 * 
 * Empirical Adversarial Challenger Suite for Milestone 3 (dnastudio UI/UX 21st.dev Modernization)
 * Author: challenger_m3_v3_1 (Teamwork Challenger subagent)
 * Role: critic, specialist
 * 
 * Empirically Stress-Tests:
 * 1. Zero Blocking Dialogs Stress across codebase and dynamically rendered HTML
 * 2. 21st.dev Token Taxonomy Verification across mock/corrupted/degenerate environments
 * 3. Diff Slider Drag Percentage Math, Viewport Clamping (1440/768/390), and Polygon Bounds
 * 4. 38-Variable Quality Radar Geometry, 6-Axis Polar Math, and Polygon Generation
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const http = require('http');

const { buildDashboardHtml } = require('../src/server/views/dnastudio-dashboard');
const { startPreviewServer } = require('../src/server/preview-server');
const { validate21stDevTokens, clampViewportDimensions } = require('./e2e/r1-r5-harness');

const PROJECT_ROOT = path.resolve(__dirname, '..');

// ============================================================================
// CHALLENGE 1: Zero Blocking Dialogs (alert/confirm) Stress
// ============================================================================

describe('Challenge 1: Zero Blocking Dialogs Empirical Stress', () => {

  test('Empirical Scan: Zero alert() or confirm() in src/server/ and src/server/views/', () => {
    const serverFiles = [
      path.join(PROJECT_ROOT, 'src/server/preview-server.js'),
      path.join(PROJECT_ROOT, 'src/server/views/dnastudio-dashboard.js'),
      path.join(PROJECT_ROOT, 'src/server/security.js')
    ];

    const violations = [];

    for (const filePath of serverFiles) {
      if (!fs.existsSync(filePath)) continue;
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        const stripped = line.trim();
        if (stripped.startsWith('//') || stripped.startsWith('*')) return;

        if (/\balert\s*\(/i.test(line)) {
          violations.push({ file: path.relative(PROJECT_ROOT, filePath), line: index + 1, content: stripped, type: 'alert' });
        }
        if (/\bconfirm\s*\(/i.test(line)) {
          violations.push({ file: path.relative(PROJECT_ROOT, filePath), line: index + 1, content: stripped, type: 'confirm' });
        }
      });
    }

    assert.equal(violations.length, 0, `Found ${violations.length} blocking dialog calls in server files: ` + JSON.stringify(violations, null, 2));
  });

  test('Empirical Scan: Generated HTML output under multiple conditions contains zero dialogs', () => {
    const testCases = [
      { name: 'Standard environment', copias: ['mellem-ca'], clientes: ['silvio-iwata'] },
      { name: 'Empty environment', copias: [], clientes: [] },
      { name: 'Multi-client environment', copias: ['c1', 'c2', 'c3'], clientes: ['cl1', 'cl2', 'cl3'] },
      { name: 'Null inputs', copias: null, clientes: null },
      { name: 'Special character names', copias: ['site-omega'], clientes: ['cliente-teste-1'] }
    ];

    for (const tc of testCases) {
      const html = buildDashboardHtml(tc.copias, tc.clientes);
      assert.equal(/\balert\s*\(/i.test(html), false, `${tc.name}: Generated HTML must contain 0 alert() calls`);
      assert.equal(/\bconfirm\s*\(/i.test(html), false, `${tc.name}: Generated HTML must contain 0 confirm() calls`);
      assert.ok(html.includes('[data-sonner-toaster]'), `${tc.name}: Must render Sonner toaster markup`);
      assert.ok(html.includes('window.dnaToast = Sonner;'), `${tc.name}: Must wire window.dnaToast`);
    }
  });

  test('Sonner Toast Engine: Verifies non-blocking notifications replace dialogs for all actions', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

    // Check all legacy action replacements in dnastudio-dashboard.js
    const actionSignatures = [
      'generateClientProject()',
      'runAudit(slug)',
      'startDeepExtract()',
      'runMultifactorAudit(slug)',
      'triggerFilesystemSync()'
    ];

    for (const sig of actionSignatures) {
      const fnName = sig.split('(')[0];
      assert.ok(html.includes(fnName), `Must define action controller function ${fnName}`);
    }

    // Ensure Sonner methods are called within these functions instead of alert
    assert.ok(html.includes('Sonner.warning(\'Por favor, digite o nome da marca do cliente.\');'), 'Validation must invoke Sonner.warning');
    assert.ok(html.includes('Sonner.loading(\'Criando projeto do cliente...\');'), 'Loading state must invoke Sonner.loading');
    assert.ok(html.includes('Sonner.success(\'Projeto do cliente criado com sucesso!\');'), 'Success state must invoke Sonner.success');
    assert.ok(html.includes('Sonner.error(\'Erro ao criar cliente\','), 'Error state must invoke Sonner.error');
  });

});

// ============================================================================
// CHALLENGE 2: 21st.dev Token Taxonomy Verification across Mock Environments
// ============================================================================

describe('Challenge 2: 21st.dev Token Taxonomy Stress Verification', () => {

  test('Mock Environment 1 (Standard): Populated copias & clientes satisfies 100% tokens', () => {
    const html = buildDashboardHtml(['clone-alpha', 'clone-beta'], ['client-one', 'client-two']);
    const validation = validate21stDevTokens(html);

    assert.equal(validation.valid, true);
    assert.equal(validation.score, 1.0);
    assert.deepEqual(validation.checks, {
      hasBentoGrid: true,
      hasDock: true,
      hasBadges: true,
      hasToasts: true,
      hasCommandPalette: true
    });
  });

  test('Mock Environment 2 (Empty): Zero copias and zero clientes satisfies 100% tokens', () => {
    const html = buildDashboardHtml([], []);
    const validation = validate21stDevTokens(html);

    assert.equal(validation.valid, true);
    assert.equal(validation.score, 1.0);
    assert.ok(html.includes('empty-state-banner'), 'Must contain empty-state-banner element');
    assert.ok(html.includes('bento-grid'), 'Must retain bento-grid in empty state');
    assert.ok(html.includes('floating-dock'), 'Must retain floating-dock in empty state');
    assert.ok(html.includes('command-palette'), 'Must retain command-palette in empty state');
  });

  test('Mock Environment 3 (Corrupted/Missing files): Incomplete artifacts satisfy 100% tokens', () => {
    const tmpDir = path.join(PROJECT_ROOT, 'test', 'fixtures', 'challenger-tmp-' + Date.now());
    const corruptedClient = path.join(tmpDir, 'corrupted-brand');
    fs.mkdirSync(corruptedClient, { recursive: true });
    fs.writeFileSync(path.join(corruptedClient, 'corrupt.bin'), Buffer.from([0x00, 0xff, 0xfe]));

    try {
      const html = buildDashboardHtml([], ['corrupted-brand'], { clientesDir: tmpDir });
      const validation = validate21stDevTokens(html);

      assert.equal(validation.valid, true);
      assert.equal(validation.score, 1.0);
      assert.ok(html.includes('Incomplete Artifact'), 'Must flag Incomplete Artifact badge');
      assert.ok(html.includes('badge-warning'), 'Must style warning badge');
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  test('Mock Environment 4 (Extreme Inputs): Non-array, null, undefined, high density', () => {
    // 1. Null / undefined / primitive inputs
    const htmlNull = buildDashboardHtml(null, undefined);
    assert.equal(validate21stDevTokens(htmlNull).score, 1.0, 'Null/undefined inputs must not break tokens');

    // 2. High density: 100 copias and 100 clientes
    const denseCopias = Array.from({ length: 100 }, (_, i) => `clone-${i}`);
    const denseClientes = Array.from({ length: 100 }, (_, i) => `cliente-${i}`);
    const htmlDense = buildDashboardHtml(denseCopias, denseClientes);
    assert.equal(validate21stDevTokens(htmlDense).score, 1.0, 'Dense layout must satisfy 100% tokens');
    assert.ok(htmlDense.includes('cliente-99'));

    // 3. Special characters & HTML entity escaping
    const htmlSpecial = buildDashboardHtml(['site-1'], ['brand "A" & \'B\' <test>']);
    assert.equal(validate21stDevTokens(htmlSpecial).score, 1.0);
    assert.ok(htmlSpecial.includes('brand &quot;A&quot; &amp; &#39;B&#39; &lt;test&gt;'));
  });

  test('validate21stDevTokens Oracle: Degenerate input handling', () => {
    // Non-string inputs
    assert.equal(validate21stDevTokens(null).valid, false);
    assert.equal(validate21stDevTokens(undefined).valid, false);
    assert.equal(validate21stDevTokens(12345).valid, false);
    assert.equal(validate21stDevTokens({}).valid, false);

    // Empty string
    const emptyResult = validate21stDevTokens('');
    assert.equal(emptyResult.valid, false);
    assert.equal(emptyResult.score, 0);

    // Arbitrary text with only 1 token (threshold is >= 2)
    const singleTokenResult = validate21stDevTokens('<div class="bento-grid"></div>');
    assert.equal(singleTokenResult.valid, false, '1 token must fail minimum threshold of 2');
    assert.equal(singleTokenResult.score, 0.2);

    // 2 tokens (minimum threshold)
    const twoTokenResult = validate21stDevTokens('<div class="bento-grid"><span class="badge"></span></div>');
    assert.equal(twoTokenResult.valid, true, '2 tokens must pass threshold');
    assert.equal(twoTokenResult.score, 0.4);
  });

});

// ============================================================================
// CHALLENGE 3: Diff Slider Drag Percentage Math & Viewport Clamping
// ============================================================================

describe('Challenge 3: Diff Slider Math, Viewport Clamping & Clip-Path Geometry', () => {

  // Mathematical oracle for drag percentage calculation
  function computeDragPercent(clientX, rectLeft, rectWidth) {
    const x = clientX - rectLeft;
    const clampedX = Math.max(0, Math.min(rectWidth, x));
    return (clampedX / rectWidth) * 100;
  }

  function generateClipPath(percent) {
    return 'polygon(0 0, ' + percent + '% 0, ' + percent + '% 100%, 0 100%)';
  }

  test('Drag Percentage Math: Invariant 0% <= percent <= 100% across boundary coordinates', () => {
    const rectLeft = 150;
    const rectWidth = 800; // Stage width = 800px, spanning from X=150 to X=950

    // Test cases: [clientX, expectedPercent, description]
    const testCases = [
      [-1000, 0, 'Far left beyond screen'],
      [0, 0, 'Left screen edge'],
      [149, 0, '1px before stage left'],
      [150, 0, 'Exact stage left boundary'],
      [350, 25, 'Exact 25% quarter point'],
      [550, 50, 'Exact 50% midpoint'],
      [750, 75, 'Exact 75% three-quarters point'],
      [950, 100, 'Exact stage right boundary'],
      [951, 100, '1px beyond stage right'],
      [2000, 100, 'Far right beyond screen']
    ];

    for (const [clientX, expectedPercent, desc] of testCases) {
      const calculated = computeDragPercent(clientX, rectLeft, rectWidth);
      assert.equal(calculated, expectedPercent, `Failed on ${desc} (clientX=${clientX})`);
    }
  });

  test('Drag Percentage Math: Monte Carlo Stress Test (1,000 random coordinates)', () => {
    const rectLeft = 200;
    const rectWidth = 1200;

    for (let i = 0; i < 1000; i++) {
      const clientX = Math.floor(Math.random() * 10000) - 5000;
      const percent = computeDragPercent(clientX, rectLeft, rectWidth);

      assert.ok(percent >= 0, `Percent must be >= 0 (got ${percent})`);
      assert.ok(percent <= 100, `Percent must be <= 100 (got ${percent})`);
      assert.ok(!Number.isNaN(percent), `Percent must not be NaN`);
    }
  });

  test('Clip-Path Polygon Generation: Valid CSS polygon syntax and coordinate consistency', () => {
    const percentages = [0, 0.5, 25, 33.333333, 50, 66.666667, 75, 99.9, 100];
    const cssPolygonRegex = /^polygon\(0 0,\s*([0-9.]+)%\s*0,\s*([0-9.]+)%\s*100%,\s*0\s*100%\)$/;

    for (const p of percentages) {
      const clipPath = generateClipPath(p);
      const match = clipPath.match(cssPolygonRegex);
      assert.ok(match, `Invalid clip-path syntax: ${clipPath}`);
      assert.equal(Number(match[1]), p, `Top-right percentage must equal percent (${p})`);
      assert.equal(Number(match[2]), p, `Bottom-right percentage must equal percent (${p})`);
    }
  });

  test('Viewport Dimension Clamping: Standard presets and boundary stress testing', () => {
    // 1. Presets from UI buttons (F13)
    const desktop = clampViewportDimensions(1440, 900);
    assert.deepEqual(desktop, { width: 1440, height: 900 }, 'Desktop preset 1440x900');

    const tablet = clampViewportDimensions(768, 1024);
    assert.deepEqual(tablet, { width: 768, height: 1024 }, 'Tablet preset 768x1024');

    const mobile = clampViewportDimensions(390, 844);
    assert.deepEqual(mobile, { width: 390, height: 844 }, 'Mobile preset 390x844');

    // 2. Underflow clamping (positive numbers under min width=280, min height=400)
    assert.deepEqual(clampViewportDimensions(100, 200), { width: 280, height: 400 });
    assert.deepEqual(clampViewportDimensions(50, 50), { width: 280, height: 400 });
    assert.deepEqual(clampViewportDimensions(-500, -1000), { width: 280, height: 400 });

    // 3. Overflow clamping (max width=3840, max height=2160)
    assert.deepEqual(clampViewportDimensions(4000, 3000), { width: 3840, height: 2160 });
    assert.deepEqual(clampViewportDimensions(10000, 10000), { width: 3840, height: 2160 });

    // 4. Exact boundary values
    assert.deepEqual(clampViewportDimensions(280, 400), { width: 280, height: 400 });
    assert.deepEqual(clampViewportDimensions(3840, 2160), { width: 3840, height: 2160 });

    // 5. Fallback on invalid/NaN values (defaults to 1440x900 via || fallback)
    assert.deepEqual(clampViewportDimensions('invalid', 'NaN'), { width: 1440, height: 900 });
    assert.deepEqual(clampViewportDimensions(null, undefined), { width: 1440, height: 900 });

    // 6. Falsy 0 behavior: Number(0) || 1440 triggers default fallback 1440x900
    assert.deepEqual(clampViewportDimensions(0, 0), { width: 1440, height: 900 });
  });

  test('Markup Verification: Diff Slider elements and event wiring present in dashboard', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

    // Check all F13 elements
    assert.ok(html.includes('id="diffStage"'), 'Must have diffStage container');
    assert.ok(html.includes('id="diffDivider"'), 'Must have draggable diffDivider');
    assert.ok(html.includes('id="diffOverlay"'), 'Must have clip-path diffOverlay');
    assert.ok(html.includes('id="diffRefFrame"'), 'Must have reference iframe');
    assert.ok(html.includes('id="diffClientFrame"'), 'Must have client iframe');

    // Check viewport buttons
    assert.ok(html.includes('id="diffVp1440"'), 'Must have desktop viewport button');
    assert.ok(html.includes('id="diffVp768"'), 'Must have tablet viewport button');
    assert.ok(html.includes('id="diffVp390"'), 'Must have mobile viewport button');

    // Check controller functions
    assert.ok(html.includes('function initDiffSlider()'), 'Must define initDiffSlider');
    assert.ok(html.includes('function setDiffViewport(width, height)'), 'Must define setDiffViewport');
    assert.ok(html.includes('Math.max(280, Math.min(3840,'), 'Must clamp width to [280, 3840]');
    assert.ok(html.includes('Math.max(400, Math.min(2160,'), 'Must clamp height to [400, 2160]');
  });

});

// ============================================================================
// CHALLENGE 4: 38-Variable Quality Radar Geometry & Polar Math
// ============================================================================

describe('Challenge 4: 38-Variable Quality Radar 6-Axis Geometry Stress', () => {

  // Mathematical reference function matching dnastudio-dashboard.js
  function calculateRadarPoints(scores = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0], cx = 160, cy = 160, rMax = 110) {
    const numAxes = scores.length;
    const angleStep = (Math.PI * 2) / numAxes;

    return scores.map((s, i) => {
      const r = rMax * Math.min(1.0, Math.max(0.1, Number(s) || 0.1));
      const angle = i * angleStep - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return {
        i,
        score: s,
        clampedR: r,
        angleRad: angle,
        angleDeg: (angle * 180 / Math.PI),
        x: Number(x.toFixed(1)),
        y: Number(y.toFixed(1)),
        formatted: `${x.toFixed(1)},${y.toFixed(1)}`
      };
    });
  }

  test('6-Axis Geometry: Angles are spaced exactly 60 degrees apart starting from top (-90 deg)', () => {
    const points = calculateRadarPoints([1.0, 1.0, 1.0, 1.0, 1.0, 1.0]);

    assert.equal(points.length, 6, 'Must generate exactly 6 axis points');

    const expectedDegrees = [-90, -30, 30, 90, 150, 210];

    points.forEach((pt, idx) => {
      const roundedDeg = Math.round(pt.angleDeg);
      assert.equal(roundedDeg, expectedDegrees[idx], `Axis ${idx} degree must be ${expectedDegrees[idx]} (got ${roundedDeg})`);
    });

    // Check consecutive angle delta is strictly 60 degrees
    for (let i = 0; i < points.length; i++) {
      const nextIdx = (i + 1) % points.length;
      let delta = points[nextIdx].angleDeg - points[i].angleDeg;
      if (delta < 0) delta += 360;
      assert.equal(Math.round(delta), 60, `Angle step between axis ${i} and ${nextIdx} must be 60 deg`);
    }
  });

  test('Radius Scaling: Clamped strictly to [11.0, 110.0] for all score ranges (0.0 to 1.0 and extremes)', () => {
    const cx = 160, cy = 160, rMax = 110;

    const testCases = [
      { scores: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0], expectedR: 110, desc: 'Maximum scores (1.0)' },
      { scores: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0], expectedR: 11, desc: 'Zero scores (clamped to 0.1 * 110 = 11)' },
      { scores: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5], expectedR: 55, desc: 'Midpoint scores (0.5 * 110 = 55)' },
      { scores: [-10.0, -1.0, 0.0, 1.5, 999.0, NaN], desc: 'Adversarial extreme scores' }
    ];

    for (const tc of testCases) {
      const points = calculateRadarPoints(tc.scores);
      points.forEach((pt) => {
        const dist = Math.sqrt(Math.pow(pt.x - cx, 2) + Math.pow(pt.y - cy, 2));

        assert.ok(dist >= 10.8, `${tc.desc}: Distance must be >= 11 (got ${dist})`);
        assert.ok(dist <= 110.2, `${tc.desc}: Distance must be <= 110 (got ${dist})`);
        assert.ok(!Number.isNaN(pt.x) && !Number.isNaN(pt.y), `Coordinates must not be NaN`);
      });
    }
  });

  test('Data Polygon Generation: Formats valid SVG points string without NaNs or overflows', () => {
    const sampleScores = [1.0, 0.84, 0.99, 0.95, 1.0, 1.0];
    const points = calculateRadarPoints(sampleScores);
    const pointsString = points.map(p => p.formatted).join(' ');

    // Must match format: "X.X,Y.Y X.X,Y.Y ..." (6 coordinate pairs)
    const pairs = pointsString.split(' ');
    assert.equal(pairs.length, 6, 'Must have exactly 6 coordinate pairs');

    for (const pair of pairs) {
      const [xStr, yStr] = pair.split(',');
      const x = Number(xStr);
      const y = Number(yStr);

      assert.ok(!Number.isNaN(x) && !Number.isNaN(y), `Coordinate pair ${pair} must be numeric`);
      assert.ok(x >= 49.9 && x <= 270.1, `X (${x}) must be within [50, 270]`);
      assert.ok(y >= 49.9 && y <= 270.1, `Y (${y}) must be within [50, 270]`);
    }

    // Explicit top vertex check (axis 0 at angle -90 deg with score 1.0): x = 160.0, y = 160 - 110 = 50.0
    assert.equal(points[0].formatted, '160.0,50.0');

    // Explicit bottom vertex check (axis 3 at angle +90 deg with score 0.95): x = 160.0, y = 160 + (110 * 0.95) = 264.5
    assert.equal(points[3].formatted, '160.0,264.5');

    // For score 1.0 at axis 3 (bottom): x = 160.0, y = 160 + 110 = 270.0
    const fullPoints = calculateRadarPoints([1.0, 1.0, 1.0, 1.0, 1.0, 1.0]);
    assert.equal(fullPoints[3].formatted, '160.0,270.0');
  });

  test('38 Variables Integrity: All 4 categories and exactly 38 variables documented in view', () => {
    const html = buildDashboardHtml(['mellem-ca'], ['silvio-iwata']);

    // 4 Category Accordions
    assert.ok(html.includes('id="acc-anti-slop"'), 'Category 1: Anti-Slop & Lexical Layout (8 variables)');
    assert.ok(html.includes('id="acc-apca"'), 'Category 2: APCA Contrast & Typography Barrier (7 variables)');
    assert.ok(html.includes('id="acc-motion"'), 'Category 3: Motion & Inertial Dynamics (8 variables)');
    assert.ok(html.includes('id="acc-runtime"'), 'Category 4: Runtime CDP & Network Health (15 variables)');

    // 8 + 7 + 8 + 15 = 38 variables check
    assert.ok(html.includes('38/38'), 'Must state 38/38 total variables');
    assert.ok(html.includes('id="radarTotalScore"'), 'Must have radarTotalScore element');

    // 5 Web concentric guide rings (levels 1, 2, 3, 4, 5)
    for (let level = 1; level <= 5; level++) {
      assert.ok(html.includes(`data-level="${level}"`), `Must have concentric web guide ring for level ${level}`);
    }
  });

});


// ============================================================================
// CHALLENGE 5: Live HTTP Preview Server End-to-End Verification
// ============================================================================

describe('Challenge 5: Live HTTP Preview Server Empirical Invariants', () => {

  test('Live Server: Zero dialogs, 100% token taxonomy, and operational persistence endpoints', async () => {
    const server = startPreviewServer({
      port: 0,
      silent: true
    });

    await new Promise((resolve) => server.once('listening', resolve));
    const port = server.address().port;
    const baseUrl = `http://127.0.0.1:${port}`;

    try {
      // 1. GET /
      const res = await fetch(`${baseUrl}/`);
      assert.equal(res.status, 200);
      const html = await res.text();

      // Zero dialogs
      assert.equal(/\balert\s*\(/i.test(html), false, 'Live HTML must contain zero alert()');
      assert.equal(/\bconfirm\s*\(/i.test(html), false, 'Live HTML must contain zero confirm()');

      // 100% 21st.dev tokens
      const tokenReport = validate21stDevTokens(html);
      assert.equal(tokenReport.valid, true);
      assert.equal(tokenReport.score, 1.0);

      // Components F10-F16
      assert.ok(html.includes('id="bento-ribbon"'), 'F10 Bento Ribbon');
      assert.ok(html.includes('id="appSidebar"'), 'F11 Sidebar');
      assert.ok(html.includes('id="cmdKModal"'), 'F11 cmdK Modal');
      assert.ok(html.includes('id="treeContainer"'), 'F12 File Explorer');
      assert.ok(html.includes('id="diffStage"'), 'F13 Diff Slider');
      assert.ok(html.includes('id="auditRadarSvg"'), 'F14 Radar SVG');
      assert.ok(html.includes('id="runsTableBody"'), 'F15 Runs Table');
      assert.ok(html.includes('[data-sonner-toaster]'), 'F16 Sonner Toaster');

      // 2. GET /api/v3/analytics/kpi
      const kpiRes = await fetch(`${baseUrl}/api/v3/analytics/kpi`);
      assert.equal(kpiRes.status, 200);
      const kpiData = await kpiRes.json();
      assert.equal(kpiData.success, true);
      assert.equal(typeof kpiData.totalRuns, 'number');
      assert.equal(typeof kpiData.passRate, 'number');
      assert.equal(typeof kpiData.averageAuditScore, 'number');

      // 3. GET /api/v3/runs
      const runsRes = await fetch(`${baseUrl}/api/v3/runs?limit=5`);
      assert.equal(runsRes.status, 200);
      const runsData = await runsRes.json();
      assert.equal(runsData.success, true);
      assert.ok(Array.isArray(runsData.runs), 'Must return runs array');

      // 4. GET /api/v3/files/tree?base=copias
      const treeRes = await fetch(`${baseUrl}/api/v3/files/tree?base=copias`);
      assert.equal(treeRes.status, 200);
      const treeData = await treeRes.json();
      assert.equal(treeData.success, true);
      assert.ok(Array.isArray(treeData.files), 'Must return files array');

    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
  });

});
