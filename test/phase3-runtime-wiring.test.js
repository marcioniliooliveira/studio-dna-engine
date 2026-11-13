'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function createMockRes() {
  const res = {
    statusCode: null,
    headers: {},
    body: '',
    writeHead(code, headers) {
      res.statusCode = code;
      res.headers = headers || {};
    },
    end(payload) {
      res.body = payload || '';
    }
  };
  return res;
}

test('Phase 3 (Spatial): auditLayoutCollisions detects sibling overlap via SpatialRTree and skips DOM ancestors and fixed/sticky boxes', () => {
  const geometry = require('../src/constraints/geometry');
  assert.equal(typeof geometry.auditLayoutCollisions, 'function');

  const boxes = [
    // Wrapper <main> containing sibling sections (indices 1 and 2)
    { index: 0, id: 'main-0', tag: 'main', left: 0, top: 0, width: 1200, height: 1000, right: 1200, bottom: 1000, position: 'relative', ancestorIndices: [] },
    // Sibling 1 overlaps Sibling 2
    { index: 1, id: 'sec-1', tag: 'section', left: 0, top: 100, width: 600, height: 400, right: 600, bottom: 500, position: 'relative', ancestorIndices: [0] },
    { index: 2, id: 'sec-2', tag: 'section', left: 400, top: 300, width: 600, height: 400, right: 1000, bottom: 700, position: 'relative', ancestorIndices: [0] },
    // Sticky header overlapping sec-1 geometrically must be skipped
    { index: 3, id: 'hdr-sticky', tag: 'header', left: 0, top: 0, width: 1200, height: 120, right: 1200, bottom: 120, position: 'sticky', ancestorIndices: [] }
  ];

  const audit = geometry.auditLayoutCollisions(boxes);
  assert.equal(audit.analyzedCount, 3);
  assert.equal(audit.skippedFixedOrStickyCount, 1);
  assert.equal(audit.collisionsCount, 1);
  assert.equal(audit.collisions[0].a, 'sec-1');
  assert.equal(audit.collisions[0].b, 'sec-2');
  assert.ok(audit.collisions[0].intersectionArea > 0);
  assert.ok(audit.gapsCount >= 1);
});

test('Phase 3 (QA Gate): UnifiedQualityGate emits diagnostic gates.spatialLayout without failing report.passed', async () => {
  const { UnifiedQualityGate } = require('../src/qa/unified-quality-gate');
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'phase3-qagate-'));
  const siteDir = path.join(tmpRoot, 'site');
  fs.mkdirSync(siteDir, { recursive: true });

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Spatial QA Test</title></head>
<body style="margin:0;padding:0;min-height:1200px;background:#fff;color:#111;">
  <main style="position:relative;width:1200px;height:900px;">
    <section id="hero" style="position:absolute;left:0;top:0;width:800px;height:400px;">Hero</section>
    <section id="overlap" style="position:absolute;left:100px;top:250px;width:800px;height:400px;">Overlap</section>
  </main>
</body>
</html>`;
  fs.writeFileSync(path.join(siteDir, 'index.html'), html, 'utf8');

  try {
    const report = await UnifiedQualityGate.auditSite({ siteDir, headless: true });
    assert.ok(report.gates.spatialLayout, 'report.gates.spatialLayout must exist');
    assert.equal(report.gates.spatialLayout.diagnosticOnly, true);
    assert.equal(report.gates.spatialLayout.passed, false);
    assert.ok(report.gates.spatialLayout.collisionsCount >= 1);
    assert.equal(report.passed, true, 'diagnosticOnly spatialLayout collision must not fail report.passed');
  } finally {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
});

test('Phase 3 (JEV Motion): ui-ux-extractor enriches ui_ux_features with JEV motionContract', () => {
  const extractor = require('../src/core/ui-ux-extractor');
  assert.equal(typeof extractor.enrichUiFeaturesWithMotionContract, 'function');

  const rawFeatures = {
    gsap: {
      detected: true,
      hasScrollTrigger: true,
      scrollTriggerInstances: 3,
      timelines: [
        { duration: 0.75, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', props: { y: 40, opacity: 0 } }
      ]
    },
    lenis: { detected: true },
    cssEffects: {
      keyframes: [{ name: 'revealUp', rule: '@keyframes revealUp { from { opacity: 0 } to { opacity: 1 } }' }]
    },
    webglCanvas: { canvasCount: 0, shadersCount: 0 }
  };

  const enriched = extractor.enrichUiFeaturesWithMotionContract(rawFeatures, { capsuleSlug: 'test-capsule' });
  assert.ok(enriched.motionContract, 'motionContract must be populated');
  assert.equal(enriched.motionContract.capsuleSlug, 'test-capsule');
  assert.equal(enriched.motionContract.schemaVersion, '3.0.0');
  assert.ok(enriched.motionContract.taxonomy && enriched.motionContract.taxonomy.archetype);
  assert.ok(enriched.motionContract.fsmContract);
  assert.ok(enriched.motionContract.layer1_physicalTruth);
  assert.ok(enriched.motionContract.layer2_adaptiveSkill);

  const srcText = fs.readFileSync(path.join(__dirname, '..', 'src', 'core', 'ui-ux-extractor.js'), 'utf8');
  assert.match(srcText, /enrichUiFeaturesWithMotionContract\s*\(/);
});

test('Phase 3 (V2 Diff Truth Protocol): GET /api/v2/preview/diff/:slug never hardcodes matched when unverified and reads qa-reports when present', async () => {
  const { handleV2Audit } = require('../src/server/routes/v2-audit');
  const tmpClientes = fs.mkdtempSync(path.join(os.tmpdir(), 'phase3-diff-'));
  const slugUnverified = 'unverified-client';
  const slugObserved = 'observed-client';

  try {
    fs.mkdirSync(path.join(tmpClientes, slugUnverified, 'site'), { recursive: true });
    fs.writeFileSync(path.join(tmpClientes, slugUnverified, 'site', 'index.html'), '<html></html>', 'utf8');

    const resUnverified = createMockRes();
    const handled1 = await handleV2Audit(
      { method: 'GET' },
      resUnverified,
      `/api/v2/preview/diff/${slugUnverified}`,
      { clientesDir: tmpClientes }
    );
    assert.equal(handled1, true);
    assert.equal(resUnverified.statusCode, 200);
    const bodyUnverified = JSON.parse(resUnverified.body).diff;
    assert.equal(bodyUnverified.truthStatus, 'unverified');
    assert.equal(bodyUnverified.viewports.length, 3);
    for (const vp of bodyUnverified.viewports) {
      assert.equal(vp.status, 'unverified');
      assert.equal(vp.pixelDifferencePct, null);
    }

    fs.mkdirSync(path.join(tmpClientes, slugObserved, 'site'), { recursive: true });
    fs.writeFileSync(path.join(tmpClientes, slugObserved, 'site', 'index.html'), '<html></html>', 'utf8');
    fs.mkdirSync(path.join(tmpClientes, slugObserved, 'qa-reports'), { recursive: true });
    fs.writeFileSync(
      path.join(tmpClientes, slugObserved, 'qa-reports', 'preview-diff.json'),
      JSON.stringify({
        viewports: [
          { name: 'Desktop', width: 1440, height: 900, status: 'matched', pixelDifferencePct: 0.012 },
          { name: 'Tablet', width: 768, height: 1024, status: 'drifted', pixelDifferencePct: 1.85 },
          { name: 'Mobile', width: 375, height: 812, status: 'matched', pixelDifferencePct: 0.03 }
        ]
      }),
      'utf8'
    );

    const resObserved = createMockRes();
    const handled2 = await handleV2Audit(
      { method: 'GET' },
      resObserved,
      `/api/v2/preview/diff/${slugObserved}`,
      { clientesDir: tmpClientes }
    );
    assert.equal(handled2, true);
    assert.equal(resObserved.statusCode, 200);
    const bodyObserved = JSON.parse(resObserved.body).diff;
    assert.equal(bodyObserved.truthStatus, 'observed');
    assert.equal(bodyObserved.viewports[0].status, 'matched');
    assert.equal(bodyObserved.viewports[0].pixelDifferencePct, 0.012);
    assert.equal(bodyObserved.viewports[1].status, 'drifted');
    assert.equal(bodyObserved.viewports[1].pixelDifferencePct, 1.85);
  } finally {
    fs.rmSync(tmpClientes, { recursive: true, force: true });
  }
});
