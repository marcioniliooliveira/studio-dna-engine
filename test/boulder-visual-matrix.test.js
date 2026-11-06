/**
 * test/boulder-visual-matrix.test.js
 *
 * Test suite for Pareto Level 2 Boulder Loop (TASK-V3-06):
 * - Deterministic single-worker Chromium capture & immediate rejection on console error
 * - Geometric line attribution: horizontal bleed & sibling AABB collision with data-ds & data-dna-line
 * - Numeric computed CSS diff against brand-spec.json & composition-spec.json
 * - Region Crop Pairs extraction (+24px expanded bounding box with >= 85% byte reduction)
 * - Deterministic score S_det calculation and zeroToleranceFailed flag
 * - Fast pure-JS SSIM + odiff pixel comparison
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const {
  CANONICAL_VIEWPORTS,
  CANONICAL_COLOR_SCHEMES,
  CANONICAL_STATES,
  captureVisualMatrix,
  freezeDeterministicTime
} = require('../src/qa/visual-capture-matrix.js');

const {
  detectHorizontalBleed,
  detectAabbCollisions,
  detectMisalignments,
  auditGeometry,
  generateRegionCropPairs
} = require('../src/qa/geometric-vrt-attrib.js');

const {
  diffComputedCss,
  computeSsim,
  computeOdiffPixelDiff,
  computeVisualFidelity,
  calculateDeterministicScore,
  runBoulderUxAudit
} = require('../src/qa/boulder-ux-auditor.js');

// Mock page generator for single-worker Chromium tests
function createMockChromiumPage(options = {}) {
  const resizeHistory = [];
  const mediaHistory = [];
  const evalHistory = [];
  const listeners = {
    console: [],
    pageerror: [],
    requestfailed: []
  };

  const page = {
    resizeHistory,
    mediaHistory,
    evalHistory,
    listeners,
    on(event, handler) {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(handler);
    },
    emit(event, payload) {
      if (listeners[event]) {
        for (const handler of listeners[event]) {
          handler(payload);
        }
      }
    },
    async setViewportSize(size) {
      resizeHistory.push(size);
    },
    async emulateMedia(media) {
      mediaHistory.push(media);
    },
    async evaluate(fn, arg) {
      evalHistory.push({ fn: fn.toString(), arg });
      if (options.evalReturn) {
        return typeof options.evalReturn === 'function' ? options.evalReturn(fn, arg) : options.evalReturn;
      }
      return null;
    },
    async content() {
      return options.htmlContent || '<html><body><main data-ds="root"></main></body></html>';
    },
    async screenshot() {
      const idx = resizeHistory.length;
      return Buffer.from(`mock_screenshot_${idx}_${Date.now()}`);
    }
  };

  return page;
}

// ---------------------------------------------------------------------------
// 1. Single-Worker Deterministic Capture & Console Error Rejection
// ---------------------------------------------------------------------------
test('TASK-V3-06: captureVisualMatrix sweeps canonical matrix reusing 1 page context', async () => {
  const mockPage = createMockChromiumPage({
    htmlContent: '<div data-ds="hero" data-dna-line="42">Hero</div>'
  });

  const manifest = await captureVisualMatrix(mockPage, {
    canonical: true,
    url: 'http://127.0.0.1:4000/piloto-elyse-luxe'
  });

  assert.equal(manifest.matrixMode, 'canonical-pareto-v3');
  // 3 viewports: 1440x900, 768x1024, 390x844
  assert.equal(mockPage.resizeHistory.length, 3);
  assert.equal(mockPage.resizeHistory[0].width, 1440);
  assert.equal(mockPage.resizeHistory[1].width, 768);
  assert.equal(mockPage.resizeHistory[2].width, 390);

  // Both light and dark schemes tested
  const lightEmulations = mockPage.mediaHistory.filter(m => m.colorScheme === 'light');
  const darkEmulations = mockPage.mediaHistory.filter(m => m.colorScheme === 'dark');
  assert.ok(lightEmulations.length > 0, 'Must emulate light scheme');
  assert.ok(darkEmulations.length > 0, 'Must emulate dark scheme');

  // Time freezing verified
  const reducedMotionEmulations = mockPage.mediaHistory.filter(m => m.reducedMotion === 'reduce');
  assert.ok(reducedMotionEmulations.length > 0, 'Must enforce reduced motion');

  // Immutable HTML SHA-256 bound
  assert.match(manifest.htmlSha256, /^[a-f0-9]{64}$/);
  assert.equal(manifest.consoleErrors.length, 0);
  assert.equal(manifest.zeroToleranceFailed, false);
});

test('TASK-V3-06: captureVisualMatrix immediately flags zeroToleranceFailed on console error or page error', async () => {
  const mockPage = createMockChromiumPage();

  // Schedule runtime error during capture
  let captureCallCount = 0;
  const originalSetViewport = mockPage.setViewportSize;
  mockPage.setViewportSize = async (size) => {
    await originalSetViewport(size);
    captureCallCount++;
    if (captureCallCount === 2) {
      mockPage.emit('console', {
        type: () => 'error',
        text: () => 'Uncaught TypeError: Cannot read properties of undefined (reading "initThree")'
      });
      mockPage.emit('pageerror', new Error('WebGL Context Lost'));
    }
  };

  const manifest = await captureVisualMatrix(mockPage, {
    canonical: true,
    url: 'http://127.0.0.1:4000/error-test'
  });

  assert.equal(manifest.zeroToleranceFailed, true, 'Zero tolerance MUST trigger on console error');
  assert.equal(manifest.consoleErrors.length, 1);
  assert.equal(manifest.pageErrors.length, 1);
  assert.match(manifest.consoleErrors[0], /Cannot read properties of undefined/);
  assert.match(manifest.pageErrors[0], /WebGL Context Lost/);
});

// ---------------------------------------------------------------------------
// 2. Geometric Line Attribution (Horizontal Bleed & Sibling AABB Collision)
// ---------------------------------------------------------------------------
test('TASK-V3-06: detectHorizontalBleed flags elements with rect.right > W_viewport and maps to line', () => {
  const elements = [
    {
      dataDs: '11aa22bb',
      line: 35,
      selector: '.kinetic-slider',
      rect: { left: 0, top: 200, width: 1460, height: 400, right: 1460, bottom: 600 }
    },
    {
      dataDs: '33cc44dd',
      line: 80,
      selector: '.container-constrained',
      rect: { left: 40, top: 700, width: 1200, height: 300, right: 1240, bottom: 1000 }
    }
  ];

  const viewportWidth = 1440;
  const violations = detectHorizontalBleed(elements, viewportWidth);

  assert.equal(violations.length, 1);
  assert.equal(violations[0].type, 'HORIZONTAL_BLEED');
  assert.equal(violations[0].dataDs, '11aa22bb');
  assert.equal(violations[0].line, 35);
  assert.equal(violations[0].measuredDelta, 20.0);
  assert.match(violations[0].message, /vazou horizontalmente além do viewport/);
});

test('TASK-V3-06: detectAabbCollisions flags sibling elements with Area(A ∩ B) > 0 px²', () => {
  const elements = [
    {
      dataDs: 'card0001',
      line: 110,
      selector: '.pricing-card-a',
      parentId: 'grid-row',
      rect: { left: 100, top: 300, width: 300, height: 250, right: 400, bottom: 550 }
    },
    {
      dataDs: 'card0002',
      line: 145,
      selector: '.pricing-card-b',
      parentId: 'grid-row',
      // Overlaps by 20px horizontally and 250px vertically: 20 * 250 = 5000 px²
      rect: { left: 380, top: 300, width: 300, height: 250, right: 680, bottom: 550 }
    },
    {
      dataDs: 'card0003',
      line: 180,
      selector: '.pricing-card-c',
      parentId: 'grid-row',
      rect: { left: 700, top: 300, width: 300, height: 250, right: 1000, bottom: 550 }
    }
  ];

  const collisions = detectAabbCollisions(elements);

  assert.equal(collisions.length, 1);
  assert.equal(collisions[0].type, 'AABB_COLLISION');
  assert.equal(collisions[0].dataDsA, 'card0001');
  assert.equal(collisions[0].dataDsB, 'card0002');
  assert.equal(collisions[0].lineA, 110);
  assert.equal(collisions[0].lineB, 145);
  assert.equal(collisions[0].areaOverlap, 5000);
});

test('TASK-V3-06: detectMisalignments flags accidental drifts between 1.5px and 14px', () => {
  const elements = [
    {
      dataDs: 'navItem1',
      line: 22,
      selector: '.nav-link-1',
      parentId: 'main-nav',
      rect: { left: 100, top: 20, width: 80, height: 40, right: 180, bottom: 60 }
    },
    {
      dataDs: 'navItem2',
      line: 26,
      selector: '.nav-link-2',
      parentId: 'main-nav',
      // Accidental vertical drift of 4px
      rect: { left: 200, top: 24, width: 80, height: 40, right: 280, bottom: 64 }
    }
  ];

  const drifts = detectMisalignments(elements);

  assert.equal(drifts.length, 1);
  assert.equal(drifts[0].type, 'UNEXPECTED_MISALIGNMENT');
  assert.equal(drifts[0].axis, 'vertical');
  assert.equal(drifts[0].measuredDelta, 4.0);
  assert.equal(drifts[0].dataDsA, 'navItem1');
  assert.equal(drifts[0].dataDsB, 'navItem2');
});

// ---------------------------------------------------------------------------
// 3. Computed CSS Diff vs Spec with Numeric Diagnostics
// ---------------------------------------------------------------------------
test('TASK-V3-06: diffComputedCss emits numeric diagnostics matching spec format', () => {
  const domStylesMap = {
    '8f3a19c2': {
      fontSize: '48px',
      lineHeight: '56px',
      color: 'rgb(26, 26, 26)',
      paddingTop: '24px'
    },
    '7b2c99a1': {
      fontSize: '18px',
      lineHeight: '28px',
      color: 'rgb(100, 100, 100)'
    }
  };

  const spec = {
    components: {
      '8f3a19c2': {
        selector: '.hero-title',
        line: 42,
        expected: {
          fontSize: '72px',
          lineHeight: '80px',
          color: '#1a1a1a',
          paddingTop: '24px'
        }
      },
      '7b2c99a1': {
        selector: '.hero-subtitle',
        line: 48,
        expected: {
          fontSize: '18px',
          lineHeight: '28px',
          color: '#646464'
        }
      }
    }
  };

  const result = diffComputedCss(domStylesMap, spec);

  assert.equal(result.failedRules, 2, 'fontSize and lineHeight diverge on 8f3a19c2');
  assert.equal(result.passedRules, 5, '5 rules match (color, paddingTop on title; fontSize, lineHeight, color on subtitle)');

  // Exact required diagnostic string format:
  // "Linha 42 ([data-ds='8f3a19c2'] .hero-title): Spec esperava font-size=72px, DOM computou 48px (Delta=-24.0px)"
  const fontSizeDiff = result.diffs.find(d => d.property === 'fontSize' || d.property === 'font-size');
  assert.ok(fontSizeDiff, 'Must record fontSize diff');
  assert.equal(fontSizeDiff.dataDs, '8f3a19c2');
  assert.equal(fontSizeDiff.line, 42);
  assert.equal(fontSizeDiff.delta, -24.0);
  assert.equal(
    fontSizeDiff.formattedDiagnostic,
    "Linha 42 ([data-ds='8f3a19c2'] .hero-title): Spec esperava font-size=72px, DOM computou 48px (Delta=-24.0px)"
  );
});

// ---------------------------------------------------------------------------
// 4. Region Crop Pairs Extraction (+24px Expanded Bounding Box & 85% Reduction)
// ---------------------------------------------------------------------------
test('TASK-V3-06: generateRegionCropPairs expands bounding box by +24px and achieves >= 85% byte reduction', () => {
  const violations = [
    {
      type: 'AABB_COLLISION',
      dataDs: 'btn_hero',
      line: 55,
      selector: '.primary-cta',
      rect: { left: 200, top: 400, width: 180, height: 50, right: 380, bottom: 450 },
      reason: 'CTA overlap with background ornament'
    }
  ];

  const viewport = { width: 1440, height: 900 };
  const cropPairs = generateRegionCropPairs({
    violations,
    viewport,
    padding: 24
  });

  assert.equal(cropPairs.length, 1);
  const crop = cropPairs[0];

  // Box expansion: x = 200 - 24 = 176, y = 400 - 24 = 376
  // width = 180 + 48 = 228, height = 50 + 48 = 98
  assert.equal(crop.expandedBox.x, 176);
  assert.equal(crop.expandedBox.y, 376);
  assert.equal(crop.expandedBox.width, 228);
  assert.equal(crop.expandedBox.height, 98);

  // Byte / Area reduction:
  // Full: 1440 * 900 = 1,296,000 px²
  // Crop: 228 * 98 = 22,344 px²
  // Reduction: (1,296,000 - 22,344) / 1,296,000 = 98.27% >= 85%
  assert.ok(crop.byteReductionPercent >= 85.0, `Expected >= 85% reduction, got ${crop.byteReductionPercent}%`);
});

// ---------------------------------------------------------------------------
// 5. Deterministic Score S_det & Zero Tolerance Gating
// ---------------------------------------------------------------------------
test('TASK-V3-06: calculateDeterministicScore strictly sets S_det=0 on zero tolerance violation', () => {
  // Case A: AABB collision > 0
  const scoreA = calculateDeterministicScore({
    geometricResult: {
      horizontalBleeds: [],
      aabbCollisions: [{ areaOverlap: 120 }],
      misalignments: []
    },
    computedCssResult: { conformityScore: 100 },
    saliencyResult: { ctaProminence: 0.25 },
    consoleErrors: []
  });

  assert.equal(scoreA.zeroToleranceFailed, true);
  assert.equal(scoreA.deterministicScore, 0);
  assert.match(scoreA.zeroToleranceReasons[0], /AABB collision/i);

  // Case B: Horizontal bleed > 0
  const scoreB = calculateDeterministicScore({
    geometricResult: {
      horizontalBleeds: [{ measuredDelta: 15 }],
      aabbCollisions: [],
      misalignments: []
    },
    computedCssResult: { conformityScore: 100 },
    saliencyResult: { ctaProminence: 0.25 },
    consoleErrors: []
  });

  assert.equal(scoreB.zeroToleranceFailed, true);
  assert.equal(scoreB.deterministicScore, 0);
  assert.match(scoreB.zeroToleranceReasons[0], /Horizontal bleed/i);

  // Case C: Console error > 0
  const scoreC = calculateDeterministicScore({
    geometricResult: {
      horizontalBleeds: [],
      aabbCollisions: [],
      misalignments: []
    },
    computedCssResult: { conformityScore: 100 },
    saliencyResult: { ctaProminence: 0.25 },
    consoleErrors: ['Uncaught ReferenceError: Foo is not defined']
  });

  assert.equal(scoreC.zeroToleranceFailed, true);
  assert.equal(scoreC.deterministicScore, 0);
  assert.match(scoreC.zeroToleranceReasons[0], /Console error/i);
});

test('TASK-V3-06: calculateDeterministicScore calculates weighted S_det >= 90 for compliant artifact', () => {
  const score = calculateDeterministicScore({
    geometricResult: {
      horizontalBleeds: [],
      aabbCollisions: [],
      misalignments: []
    },
    computedCssResult: { conformityScore: 98 },
    saliencyResult: { ctaProminence: 0.22, topRank: 1 },
    consoleErrors: [],
    pageErrors: []
  });

  assert.equal(score.zeroToleranceFailed, false);
  assert.ok(score.deterministicScore >= 90, `Expected S_det >= 90, got ${score.deterministicScore}`);
});

// ---------------------------------------------------------------------------
// 6. Fast Pure-JS SSIM & Odiff Pixel Comparison
// ---------------------------------------------------------------------------
test('TASK-V3-06: computeSsim and computeOdiffPixelDiff provide deterministic visual comparison', () => {
  const width = 100;
  const height = 100;
  const size = width * height;

  // Image A: flat gray
  const bufA = Buffer.alloc(size * 4, 128);
  // Image B: identical to A
  const bufB = Buffer.alloc(size * 4, 128);
  // Image C: slight noise
  const bufC = Buffer.from(bufA);
  for (let i = 0; i < 200; i += 4) {
    bufC[i] = 200;
  }

  // Identical images must have SSIM = 1.0 and 0 diff pixels
  const ssimIdentical = computeSsim(bufA, bufB, width, height);
  assert.ok(Math.abs(ssimIdentical - 1.0) < 0.001, `Identical SSIM must be 1.0, got ${ssimIdentical}`);

  const diffIdentical = computeOdiffPixelDiff(bufA, bufB, width, height);
  assert.equal(diffIdentical.diffCount, 0);
  assert.equal(diffIdentical.diffPercentage, 0);

  // Divergent image
  const ssimDivergent = computeSsim(bufA, bufC, width, height);
  assert.ok(ssimDivergent < 1.0, 'Divergent images must have SSIM < 1.0');

  const diffDivergent = computeOdiffPixelDiff(bufA, bufC, width, height);
  assert.ok(diffDivergent.diffCount > 0);
  assert.ok(diffDivergent.diffPercentage > 0);
});

// ---------------------------------------------------------------------------
// 7. Full Boulder Loop End-to-End Orchestration
// ---------------------------------------------------------------------------
test('TASK-V3-06: runBoulderUxAudit executes full pipeline and produces structured technical report', async () => {
  const mockPage = createMockChromiumPage({
    htmlContent: '<div data-ds="8f3a19c2" data-dna-line="42" class="hero-title">Title</div>'
  });

  const report = await runBoulderUxAudit({
    page: mockPage,
    url: 'http://127.0.0.1:4000/piloto',
    brandSpec: {
      colors: { primary: '#1a1a1a' }
    },
    compositionSpec: {
      components: {
        '8f3a19c2': {
          selector: '.hero-title',
          line: 42,
          expected: { fontSize: '48px', color: '#1a1a1a' }
        }
      }
    },
    domStylesMap: {
      '8f3a19c2': { fontSize: '48px', color: 'rgb(26, 26, 26)' }
    },
    elements: [
      {
        dataDs: '8f3a19c2',
        line: 42,
        selector: '.hero-title',
        rect: { left: 100, top: 100, width: 800, height: 60, right: 900, bottom: 160 }
      }
    ],
    viewport: { width: 1440, height: 900 }
  });

  assert.ok(report);
  assert.equal(typeof report.deterministicScore, 'number');
  assert.equal(report.zeroToleranceFailed, false);
  assert.ok(report.deterministicScore >= 90);
  assert.ok(Array.isArray(report.regionCropPairs));
  assert.ok(Array.isArray(report.findings));
  assert.ok(Array.isArray(report.diagnostics));
});
