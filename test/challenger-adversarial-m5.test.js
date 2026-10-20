/**
 * test/challenger-adversarial-m5.test.js
 * 
 * Challenger 1: Empirical Verification & Stress Testing Harness for Milestone M5
 * 
 * Adversarially probes:
 * 1. AABB overlap spring-relaxation & hard pass under extreme card clustering & perturbation.
 * 2. Catmull-Rom splines knot spacing extremes and quaternion interpolation near antipodal poles.
 * 3. Texture VRAM calculations vs uncompressed formats (22.4MB decompression trap).
 * 4. CSS @scope donut scoping against piercing selectors & linter audit.
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

// M2 Modules
const {
  DynamicAnchorCoordinator,
  computeAABBOverlapArea,
  computeTotalOverlapArea
} = require('../src/kinetic/dynamic-anchor-coordinator');

const {
  TrajectorySolver,
  slerp,
  squad,
  evaluateCentripetalCatmullRom,
  computeNormalizedScroll,
  quatNormalize,
  quatNorm
} = require('../src/kinetic/trajectory-solver');

// M3 Modules
const {
  VramAuditor,
  calculateTextureVram,
  calculateGeometryVram,
  calculateCanvasBackbufferVram,
  auditAsset,
  auditSceneVram,
  BYTES_PER_PIXEL_TABLE,
  MAX_ASSET_DISK_BYTES,
  MAX_ASSET_VRAM_BYTES,
  WEBKIT_GPU_CEILING_BYTES
} = require('../src/assets3d/vram-auditor');

const {
  packOrmChannels,
  compressToKtx2,
  compareFormatFootprint
} = require('../src/assets3d/texture-compressor');

// M4 Modules
const {
  EdgeStaticCompiler,
  generateScopedCss
} = require('../src/compiler/edge-static-compiler');

const {
  validateCompositionGrammar,
  generateDonutScopeRule,
  validateDonutScopeInvariants
} = require('../src/compiler/kinetic-grammar-schema');

// ============================================================================
// SUITE 1: Extreme Card Clustering & AABB Overlap Under Perturbation
// ============================================================================

test.describe('Suite 1 [Challenger]: Extreme Card Clustering & AABB Overlap', () => {

  test('1.1 Extreme desktop clustering: 10 cards at exact same coordinate (720, 450)', () => {
    const coordinator = new DynamicAnchorCoordinator({ cardWidth: 180, cardHeight: 64, gap: 12 });
    const viewport = { width: 1440, height: 900 };

    // 10 cards with identical coordinates at screen center
    const anchors = Array.from({ length: 10 }, (_, i) => ({
      id: `cluster_card_${i}`,
      title: `Feature ${i}`,
      description: `Description for feature ${i}`,
      screen: { x: 720, y: 450 },
      cardWidth: 180,
      cardHeight: 64,
      visible: true
    }));

    const result = coordinator.coordinate(anchors, viewport);

    assert.equal(result.cards.length, 10, 'All 10 cards must be coordinated');
    assert.equal(result.totalOverlapArea, 0, `Total overlap must be strictly 0px² under extreme clustering, got: ${result.totalOverlapArea}`);

    // Pairwise overlap double-check
    for (let i = 0; i < result.cards.length; i++) {
      for (let j = i + 1; j < result.cards.length; j++) {
        const overlap = computeAABBOverlapArea(result.cards[i].rect, result.cards[j].rect);
        assert.equal(overlap, 0, `Pair (${i}, ${j}) must have 0px² overlap`);
      }
    }

    // Zero bleed check
    for (const card of result.cards) {
      assert.ok(card.x >= coordinator.safeMarginX, `card.x (${card.x}) >= safeMarginX (${coordinator.safeMarginX})`);
      assert.ok(card.x + card.width <= viewport.width - coordinator.safeMarginX, `card right (${card.x + card.width}) <= safe width`);
      assert.ok(card.y >= coordinator.safeMarginY, `card.y (${card.y}) >= safeMarginY (${coordinator.safeMarginY})`);
      assert.ok(card.y + card.height <= viewport.height - coordinator.safeMarginY, `card bottom (${card.y + card.height}) <= safe height`);
    }
  });

  test('1.2 Corner boundary clustering: 8 cards tightly packed in top-left safe area (25, 25)', () => {
    const coordinator = new DynamicAnchorCoordinator({ cardWidth: 180, cardHeight: 64, gap: 12, safeMarginX: 20, safeMarginY: 20 });
    const viewport = { width: 1440, height: 900 };

    const anchors = Array.from({ length: 8 }, (_, i) => ({
      id: `corner_card_${i}`,
      screen: { x: 25 + i * 0.001, y: 25 + i * 0.001 },
      cardWidth: 180,
      cardHeight: 64,
      visible: true
    }));

    const result = coordinator.coordinate(anchors, viewport);

    assert.equal(result.totalOverlapArea, 0, `Corner cluster overlap must be 0px², got: ${result.totalOverlapArea}`);

    for (const card of result.cards) {
      assert.ok(card.x >= 20, `card.x (${card.x}) must respect left margin 20`);
      assert.ok(card.x + card.width <= 1440 - 20, `card right edge must respect right margin`);
      assert.ok(card.y >= 20, `card.y (${card.y}) must respect top margin 20`);
      assert.ok(card.y + card.height <= 900 - 20, `card bottom edge must respect bottom margin`);
    }
  });

  test('1.3 Micro-perturbation cluster: 12 cards with epsilon jitter (dx=1e-5, dy=1e-5)', () => {
    const coordinator = new DynamicAnchorCoordinator({ cardWidth: 160, cardHeight: 50, gap: 10 });
    const viewport = { width: 1440, height: 900 };

    const anchors = Array.from({ length: 12 }, (_, i) => ({
      id: `jitter_card_${i}`,
      screen: { x: 500 + i * 1e-5, y: 400 + i * 1e-5 },
      cardWidth: 160,
      cardHeight: 50,
      visible: true
    }));

    const result = coordinator.coordinate(anchors, viewport);

    assert.equal(result.totalOverlapArea, 0, `Epsilon jitter cluster must resolve to 0px² overlap, got: ${result.totalOverlapArea}`);
  });

  test('1.4 Mobile viewport (390x844): 8 cards clustered near center (195, 422)', () => {
    const coordinator = new DynamicAnchorCoordinator({ cardWidth: 180, cardHeight: 64, gap: 12, safeMarginX: 16, safeMarginY: 20 });
    const viewport = { width: 390, height: 844 };

    // 8 cards fit vertically: 8 * (64 + 12) = 608 <= 804 usable height
    const anchors = Array.from({ length: 8 }, (_, i) => ({
      id: `mobile_card_${i}`,
      screen: { x: 195, y: 422 },
      cardWidth: 180,
      cardHeight: 64,
      visible: true
    }));

    const result = coordinator.coordinate(anchors, viewport);

    assert.equal(result.totalOverlapArea, 0, `Mobile 8-card cluster must achieve strictly 0px² overlap, got: ${result.totalOverlapArea}`);

    // Verify 0px horizontal layout bleed on mobile (scrollWidth <= clientWidth)
    for (const card of result.cards) {
      assert.ok(card.x >= 16, `Mobile card.x (${card.x}) >= 16px safe margin`);
      assert.ok(card.x + card.width <= 390 - 16, `Mobile card right (${card.x + card.width}) <= 374px (0px horizontal bleed)`);
    }
  });

  test('1.5 Mobile viewport saturation boundary analysis: N=10 cards (theoretical vertical capacity limit)', () => {
    const coordinator = new DynamicAnchorCoordinator({ cardWidth: 180, cardHeight: 64, gap: 12, safeMarginX: 16, safeMarginY: 20 });
    const viewport = { width: 390, height: 844 };

    // 10 cards on 390x844: Usable vertical space = 844 - 40 = 804px.
    // 10 cards * 64px = 640px + 9 gaps * 12px = 108px -> total 748px <= 804px.
    const anchors = Array.from({ length: 10 }, (_, i) => ({
      id: `mobile_sat_${i}`,
      screen: { x: 195, y: 400 + i * 2 },
      cardWidth: 180,
      cardHeight: 64,
      visible: true
    }));

    const result = coordinator.coordinate(anchors, viewport);

    assert.equal(result.cards.length, 10);
    assert.equal(result.totalOverlapArea, 0, `Mobile 10-card saturation cluster must have 0px² overlap, got: ${result.totalOverlapArea}`);
  });

  test('1.6 Collinear alignment: 8 cards along identical Y coordinate (y=350)', () => {
    const coordinator = new DynamicAnchorCoordinator({ cardWidth: 180, cardHeight: 64, gap: 12 });
    const viewport = { width: 1440, height: 900 };

    const anchors = Array.from({ length: 8 }, (_, i) => ({
      id: `collinear_card_${i}`,
      screen: { x: 200 + i * 40, y: 350 }, // heavily overlapping horizontally
      cardWidth: 180,
      cardHeight: 64,
      visible: true
    }));

    const result = coordinator.coordinate(anchors, viewport);

    assert.equal(result.totalOverlapArea, 0, `Collinear cards must resolve to 0px² overlap, got: ${result.totalOverlapArea}`);
  });

  test('1.7 Heterogeneous card dimensions: cards from 100x40 to 320x100 overlapping at center', () => {
    const coordinator = new DynamicAnchorCoordinator({ gap: 16 });
    const viewport = { width: 1440, height: 900 };

    const sizes = [
      { w: 100, h: 40 },
      { w: 320, h: 100 },
      { w: 200, h: 60 },
      { w: 150, h: 80 },
      { w: 280, h: 70 },
      { w: 180, h: 50 }
    ];

    const anchors = sizes.map((s, i) => ({
      id: `hetero_card_${i}`,
      screen: { x: 700, y: 450 },
      cardWidth: s.w,
      cardHeight: s.h,
      visible: true
    }));

    const result = coordinator.coordinate(anchors, viewport);

    assert.equal(result.totalOverlapArea, 0, `Heterogeneous size cards must resolve to 0px² overlap, got: ${result.totalOverlapArea}`);
  });
});

// ============================================================================
// SUITE 2: Catmull-Rom Splines & Quaternion Interpolation at Antipodal Poles
// ============================================================================

test.describe('Suite 2 [Challenger]: Catmull-Rom Splines & Antipodal Quaternions', () => {

  test('2.1 Antipodal Quaternions under Slerp: q1 = -q0 on S^3', () => {
    // In quaternion space S^3, q and -q represent the exact same 3D orientation.
    const q0 = [0, 0, 0, 1];
    const q1 = [0, 0, 0, -1]; // exact antipodal

    const testT = [0.0, 0.25, 0.5, 0.75, 1.0];
    for (const t of testT) {
      const interp = slerp(q0, q1, t);

      // Verify no NaNs or Infs
      for (let c = 0; c < 4; c++) {
        assert.ok(Number.isFinite(interp[c]), `Component ${c} must be finite at t=${t}, got ${interp[c]}`);
      }

      // Verify strict unit norm
      const norm = quatNorm(interp);
      assert.ok(Math.abs(norm - 1.0) < 1e-6, `Norm must be 1.0 at t=${t}, got ${norm}`);
    }
  });

  test('2.2 Arbitrary orientation antipodal: q1 = -q0 for non-identity orientation', () => {
    // Arbitrary 3D orientation
    const axis = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];
    const angle = Math.PI * 0.7; // ~126 degrees
    const sinA = Math.sin(angle / 2);
    const cosA = Math.cos(angle / 2);
    const q0 = quatNormalize([axis[0] * sinA, axis[1] * sinA, axis[2] * sinA, cosA]);
    const q1 = [-q0[0], -q0[1], -q0[2], -q0[3]]; // antipodal

    for (let t = 0; t <= 1; t += 0.1) {
      const interp = slerp(q0, q1, t);
      assert.ok(Number.isFinite(interp[0]) && Number.isFinite(interp[1]) && Number.isFinite(interp[2]) && Number.isFinite(interp[3]));
      assert.ok(Math.abs(quatNorm(interp) - 1.0) < 1e-6);
    }
  });

  test('2.3 180-degree rotation (orthogonal on S^3, dot = 0)', () => {
    // 180° rotation around X-axis
    const q0 = [0, 0, 0, 1]; // identity
    const q1 = [1, 0, 0, 0]; // 180 deg around X (w = cos(pi/2) = 0)

    for (let t = 0; t <= 1; t += 0.2) {
      const interp = slerp(q0, q1, t);
      assert.ok(Number.isFinite(interp[0]) && Number.isFinite(interp[3]));
      assert.ok(Math.abs(quatNorm(interp) - 1.0) < 1e-6);
    }
  });

  test('2.4 Numerical threshold transition: near-antipodal perturb dot ~ -0.99999', () => {
    const q0 = [0, 0, 0, 1];
    // Slightly perturbed from [0, 0, 0, -1]
    const q1 = quatNormalize([1e-6, 1e-6, 0, -0.999999999]);

    for (let t = 0; t <= 1; t += 0.2) {
      const interp = slerp(q0, q1, t);
      assert.ok(Number.isFinite(interp[0]) && Number.isFinite(interp[3]));
      assert.ok(Math.abs(quatNorm(interp) - 1.0) < 1e-6);
    }
  });

  test('2.5 Squad interpolation through antipodal keyframe sequence', () => {
    const keyframes = [
      { scrollProgress: 0.0, position: [0, 0, 5], target: [0, 0, 0], quaternion: [0, 0, 0, 1] },
      { scrollProgress: 0.33, position: [0, 2, 4], target: [0, 0, 0], quaternion: [0, 0, 0, -1] }, // antipodal
      { scrollProgress: 0.66, position: [2, 0, 4], target: [0, 0, 0], quaternion: [1, 0, 0, 0] },  // 180 deg
      { scrollProgress: 1.0, position: [0, 0, 5], target: [0, 0, 0], quaternion: [-1, 0, 0, 0] }  // antipodal to prev
    ];

    const solver = new TrajectorySolver({ keyframes });

    // Sample dense curve
    const samples = solver.sampleCurve(100);
    assert.equal(samples.length, 100);

    for (const sample of samples) {
      const q = sample.quaternion;
      assert.ok(Number.isFinite(q[0]) && Number.isFinite(q[1]) && Number.isFinite(q[2]) && Number.isFinite(q[3]),
        `Quaternion components must be finite at s=${sample.s}`);
      const norm = quatNorm(q);
      assert.ok(Math.abs(norm - 1.0) < 1e-5, `Quaternion norm must be 1.0 at s=${sample.s}, got ${norm}`);
    }
  });

  test('2.6 Catmull-Rom knot spacing extremes: coincident knots and micro-spacing (1e-12)', () => {
    const p0 = [0, 0, 0];
    const p1 = [0, 0, 0]; // coincident with p0
    const p2 = [1e-12, 0, 0]; // micro-knot
    const p3 = [1, 0, 0];

    for (let u = 0; u <= 1; u += 0.25) {
      const pt = evaluateCentripetalCatmullRom(p0, p1, p2, p3, u, 0.5);
      assert.ok(Number.isFinite(pt[0]) && Number.isFinite(pt[1]) && Number.isFinite(pt[2]),
        `Interpolated point must be finite at u=${u}`);
    }
  });

  test('2.7 Catmull-Rom knot spacing extremes: massive distance ratio (1e-5 vs 1e6)', () => {
    const p0 = [0, 0, 0];
    const p1 = [1e-5, 0, 0];
    const p2 = [1e6, 0, 0];
    const p3 = [1e6 + 1e-5, 0, 0];

    for (let u = 0; u <= 1; u += 0.25) {
      const pt = evaluateCentripetalCatmullRom(p0, p1, p2, p3, u, 0.5);
      assert.ok(Number.isFinite(pt[0]) && Number.isFinite(pt[1]) && Number.isFinite(pt[2]),
        `Macro-scale knot point must be finite at u=${u}`);
    }
  });

  test('2.8 Numerical acceleration boundedness across non-uniform knot spacing', () => {
    const keyframes = [
      { scrollProgress: 0.0, position: [0, 0, 5], target: [0, 0, 0] },
      { scrollProgress: 0.001, position: [0.1, 0, 5], target: [0, 0, 0] }, // tight knot
      { scrollProgress: 0.8, position: [5, 5, 5], target: [0, 0, 0] },   // wide knot
      { scrollProgress: 1.0, position: [0, 0, 5], target: [0, 0, 0] }
    ];

    const solver = new TrajectorySolver({ keyframes });

    // Check acceleration at interior points
    for (const s of [0.0005, 0.01, 0.2, 0.5, 0.85, 0.99]) {
      const acc = solver.getAcceleration(s);
      assert.ok(Number.isFinite(acc.positionAcceleration[0]));
      assert.ok(Number.isFinite(acc.positionAcceleration[1]));
      assert.ok(Number.isFinite(acc.positionAcceleration[2]));
    }
  });
});

// ============================================================================
// SUITE 3: Texture VRAM Calculations vs Uncompressed Formats & Traps
// ============================================================================

test.describe('Suite 3 [Challenger]: Texture VRAM Calculations vs Uncompressed Formats', () => {

  test('3.1 Mathematical precision of calculateTextureVram across all formats', () => {
    const w = 1024;
    const h = 1024;
    const pixels = w * h; // 1,048,576
    const mipFactor = 1.3333;

    // KTX2 ASTC (1.0 byte/px)
    const ktx2Vram = calculateTextureVram(w, h, 'KTX2_ASTC', { hasMipmaps: true });
    const expectedKtx2 = Math.round(pixels * 1.0 * mipFactor); // 1,398,066
    assert.equal(ktx2Vram, expectedKtx2);

    // KTX2 ETC1S (0.5 byte/px)
    const etc1sVram = calculateTextureVram(w, h, 'KTX2_ETC1S', { hasMipmaps: true });
    assert.equal(etc1sVram, Math.round(pixels * 0.5 * mipFactor));

    // PNG / JPEG / WEBP / RGBA8 (4.0 bytes/px)
    const pngVram = calculateTextureVram(w, h, 'PNG', { hasMipmaps: true });
    const expectedPng = Math.round(pixels * 4.0 * mipFactor); // 5,592,266
    assert.equal(pngVram, expectedPng);
    // Integer rounding difference bounded to <= 2 bytes
    assert.ok(Math.abs(pngVram - expectedKtx2 * 4) <= 2, 'PNG must equal 4x KTX2 within 2 bytes rounding');

    // RGB8 / RGB_UNCOMPRESSED (must evaluate to 4.0 bytes/px due to mobile GPU texel alignment)
    const rgbVram = calculateTextureVram(w, h, 'RGB8', { hasMipmaps: true });
    assert.equal(rgbVram, pngVram, 'RGB8 must align to 4.0 bytes/px in GPU VRAM');

    const rgbUncompVram = calculateTextureVram(w, h, 'RGB_UNCOMPRESSED', { hasMipmaps: true });
    assert.equal(rgbUncompVram, pngVram, 'RGB_UNCOMPRESSED must align to 4.0 bytes/px in GPU VRAM');
  });

  test('3.2 The 22.4MB Uncompressed PNG Decompression Trap: 2048x2048 PNG vs KTX2', () => {
    const comparison = compareFormatFootprint(2048, 2048);

    // Uncompressed 2048x2048 PNG expands to 22,368,993 bytes (22.37 decimal MB / 21.33 MiB)
    assert.equal(comparison.uncompressedPng.bytesPerPixel, 4.0);
    assert.ok(comparison.uncompressedPng.vramBytes > 22 * 1000 * 1000, '2048x2048 PNG VRAM must exceed 22 decimal MB (22,000,000B)');
    assert.equal(comparison.uncompressedPng.exceeds4MbLimit, true, 'Must flag 4MB limit breach');

    // KTX2 ASTC (1.0 byte/px)
    assert.equal(comparison.ktx2Astc.bytesPerPixel, 1.0);
    assert.equal(comparison.ktx2Astc.vramSavingsRatio, '4.0');

    // Clamped 1024x1024 KTX2
    assert.ok(comparison.clamped1024Ktx2.vramBytes < 1.5 * 1024 * 1024);
    assert.equal(comparison.clamped1024Ktx2.fitsUnderBudget, true, 'Clamped KTX2 fits comfortably under 4MB');
  });

  test('3.3 Adversarial asset audit: 300KB PNG disk file blowing up VRAM to 22.4MB', () => {
    // A deceiving asset: tiny file on disk (300KB), but contains a 2048x2048 uncompressed PNG
    const adversarialAsset = {
      diskSizeBytes: 300 * 1024, // 300KB (< 3MB limit) - passes disk audit!
      meshQuantization: true,
      geometry: {
        vertexCount: 10000,
        bytesPerVertex: 14,
        triangleCount: 15000
      },
      textures: [
        { width: 2048, height: 2048, format: 'PNG', hasMipmaps: true }
      ]
    };

    const report = auditAsset(adversarialAsset);

    // MUST be rejected due to VRAM explosion
    assert.equal(report.passed, false, 'Asset with 2048x2048 PNG must fail audit');
    assert.equal(report.isWebKitCertified, false);

    const vramViolation = report.violations.find(v => v.rule === 'MAX_ASSET_VRAM');
    assert.ok(vramViolation, 'Must record MAX_ASSET_VRAM violation');
    assert.ok(vramViolation.actual > 22 * 1000 * 1000, 'Actual VRAM must be > 22 million bytes (22.4MB trap)');

    const uncompWarning = report.warnings.find(w => w.rule === 'UNCOMPRESSED_TEXTURE_DETECTED');
    assert.ok(uncompWarning, 'Must record UNCOMPRESSED_TEXTURE_DETECTED warning');
  });

  test('3.4 Converted KTX2 version passes all budgets with high margin', () => {
    const compliantAsset = {
      diskSizeBytes: 300 * 1024,
      meshQuantization: true,
      geometry: {
        vertexCount: 10000,
        bytesPerVertex: 14,
        triangleCount: 15000
      },
      textures: [
        { width: 1024, height: 1024, format: 'KTX2_ASTC', hasMipmaps: true }
      ]
    };

    const report = auditAsset(compliantAsset);

    assert.equal(report.passed, true, 'KTX2 asset must pass audit');
    assert.equal(report.isWebKitCertified, true);
    assert.equal(report.violations.length, 0);
    assert.ok(report.vramFootprintBytes < 1.7 * 1024 * 1024, 'Total VRAM must be < 1.7MB');
  });

  test('3.5 Mobile Safari WebKit Scene Ceiling (<= 384MB) with 50 compliant assets and Retina backbuffer', () => {
    // 50 assets of 1.6MB VRAM each = 80MB
    const assets = Array.from({ length: 50 }, () => ({
      diskSizeBytes: 200 * 1024,
      meshQuantization: true,
      geometry: { vertexCount: 5000, bytesPerVertex: 14, triangleCount: 8000 },
      textures: [{ width: 1024, height: 1024, format: 'KTX2_ASTC', hasMipmaps: true }]
    }));

    const sceneReport = auditSceneVram({
      viewport: { width: 390, height: 844, dpr: 3 }, // iPhone Retina 3x
      overheadBufferBytes: 16 * 1024 * 1024,
      assets
    });

    assert.equal(sceneReport.passed, true);
    assert.equal(sceneReport.isWithinWebKitCeiling, true);
    assert.ok(sceneReport.totalSceneVramBytes < 150 * 1024 * 1024, 'Scene VRAM well under 384MB ceiling');
  });

  test('3.6 WebKit Scene Ceiling violation triggered when uncompressed assets exceed 384MB', () => {
    // 20 assets with 2048x2048 PNGs = 20 * 22.4MB = 448MB > 384MB!
    const heavyAssets = Array.from({ length: 20 }, () => ({
      diskSizeBytes: 500 * 1024,
      textures: [{ width: 2048, height: 2048, format: 'PNG', hasMipmaps: true }]
    }));

    const sceneReport = auditSceneVram({
      viewport: { width: 390, height: 844, dpr: 3 },
      assets: heavyAssets
    });

    assert.equal(sceneReport.passed, false);
    assert.equal(sceneReport.isWithinWebKitCeiling, false);
    const ceilingViolation = sceneReport.violations.find(v => v.rule === 'WEBKIT_GPU_CEILING_EXCEEDED');
    assert.ok(ceilingViolation, 'Must record WEBKIT_GPU_CEILING_EXCEEDED');
  });

  test('3.7 Edge case dimensions: non-power-of-two (1920x1080) and 1x1 mipmaps', () => {
    const npotVram = calculateTextureVram(1920, 1080, 'KTX2_ASTC', { hasMipmaps: true });
    assert.ok(npotVram > 0);
    assert.equal(npotVram, Math.round(1920 * 1080 * 1.0 * 1.3333));

    const unitVram = calculateTextureVram(1, 1, 'KTX2_ASTC', { hasMipmaps: false });
    assert.equal(unitVram, 1);
  });
});

// ============================================================================
// SUITE 4: CSS @scope Donut Scoping Against Piercing Selectors
// ============================================================================

test.describe('Suite 4 [Challenger]: CSS @scope Donut Scoping & Piercing Attacks', () => {

  const compliantSpec = {
    schemaVersion: '2.0.0',
    brandSpec: {
      brandName: 'Challenger Brand',
      theme: { bgBase: '#000000', accent: '#ff0055' },
      meta: { title: 'Challenger Title', description: 'Testing donut scoping resilience' }
    },
    stages: [
      {
        id: 'hero-stage',
        type: 'HeroCinematicStage',
        slots: [
          { slotId: 'hero-title', slotType: 'heading', targetSelector: '[data-kinetic-slot="hero-title"]', content: 'Resilient Design' },
          { slotId: 'hero-body', slotType: 'text', targetSelector: '[data-kinetic-slot="hero-body"]', content: 'Protected slot copy' }
        ]
      }
    ]
  };

  test('4.1 EdgeStaticCompiler produces valid @scope rule structure', () => {
    const compiler = new EdgeStaticCompiler();
    const result = compiler.compile(compliantSpec);

    assert.equal(result.success, true);
    const css = result.files['styles.css'];

    // Verify @scope rule exists and wraps .kinetic-stage to [data-kinetic-slot]
    assert.ok(css.includes('@scope (.kinetic-stage) to ([data-kinetic-slot])'), 'Must include exact donut scoping rule');
    assert.ok(css.includes('@supports not (scope: default)'), 'Must include non-@scope fallback');

    // Invariant validation: compiler generated CSS passes clean check
    const validation = validateDonutScopeInvariants(css);
    assert.equal(validation.compliant, true, 'Compiler generated styles.css must be compliant');
  });

  test('4.2 Invariant Validator Linter: verifies comment-stripping behavior on inline comments', () => {
    // When cleanCss strips comments, inline references to [data-kinetic-slot] */ are safely ignored
    const cssWithComment = `
      /* Invariant check: styles do not pierce [data-kinetic-slot] */
      @scope (.kinetic-stage) to ([data-kinetic-slot]) {
        .inner { color: red; }
      }
    `;

    const validation = validateDonutScopeInvariants(cssWithComment);
    assert.equal(validation.compliant, true, 'Comments must not trigger false-positive piercing violation');
    assert.equal(validation.violations.length, 0);
  });

  test('4.3 Penetration attack: descendant selector attempting to pierce slot boundary', () => {
    const maliciousCss = `
      @scope (.kinetic-stage) to ([data-kinetic-slot]) {
        .stage-inner { display: block; }
      }
      /* Piercing attack */
      [data-kinetic-slot] h1 {
        color: yellow !important;
      }
    `;

    const validation = validateDonutScopeInvariants(maliciousCss);
    assert.equal(validation.compliant, false, 'Must flag descendant piercing selector');
    assert.ok(validation.violations.some(v => v.includes('Donut piercing violation')));
  });

  test('4.4 Penetration attack: compound selector piercing into slot child', () => {
    const maliciousCss = `
      .kinetic-stage [data-kinetic-slot] .kinetic-child {
        font-size: 99px;
      }
    `;

    const validation = validateDonutScopeInvariants(maliciousCss);
    assert.equal(validation.compliant, false, 'Must flag compound selector penetration');
  });

  test('4.5 Validator Blind Spot 1: Direct child combinator (>) is caught and flagged as piercing', () => {
    // Attack using direct child: [data-kinetic-slot] > h1
    const childAttackCss = `
      [data-kinetic-slot] > h1 {
        transform: rotate(45deg);
      }
    `;

    const validation = validateDonutScopeInvariants(childAttackCss);
    assert.equal(validation.compliant, false, 'Must flag direct child combinator (>) piercing');
    assert.ok(validation.violations.length > 0);
  });

  test('4.6 Validator Blind Spot 2: Attribute value selector ([data-kinetic-slot="val"] h1) is caught and flagged', () => {
    // Attack using attribute value: [data-kinetic-slot="hero-title"] h1
    const attrAttackCss = `
      [data-kinetic-slot="hero-title"] h1 {
        color: red !important;
      }
    `;

    const validation = validateDonutScopeInvariants(attrAttackCss);
    assert.equal(validation.compliant, false, 'Must flag attribute value selector piercing');
    assert.ok(validation.violations.length > 0);
  });

  test('4.7 Valid slot self-styling is permitted and does not penetrate children', () => {
    const legitimateCss = `
      [data-kinetic-slot] {
        all: unset;
        display: block;
      }
      [data-kinetic-slot][data-slot-type="heading"] {
        font-size: 2rem;
      }
    `;

    const validation = validateDonutScopeInvariants(legitimateCss);
    assert.equal(validation.compliant, true, 'Legitimate self-styling on the slot element itself must pass');
  });

  test('4.8 Micro-runtime budget constraint (<15KB) under compiler execution', () => {
    const compiler = new EdgeStaticCompiler();
    const result = compiler.compile(compliantSpec);

    assert.ok(result.runtimeSizeBytes < 15 * 1024, `Runtime size (${result.runtimeSizeBytes}B) strictly < 15KB (15360B)`);
  });
});
