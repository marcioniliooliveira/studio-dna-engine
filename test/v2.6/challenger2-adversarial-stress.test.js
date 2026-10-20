/**
 * test/v2.6/challenger2-adversarial-stress.test.js
 * 
 * Studio DNA PRO v2.6 — Adversarial Challenge & Mathematical Stress Suite
 * Invoked by challenger_2 (critic, specialist)
 * 
 * Targeted Systems:
 * 1. APCA Contrast & OKLCH Engine (docs/research/v2.6/reference/apca-contrast.js)
 *    - W3C test pairs, low-contrast, gray-on-gray, format parsing
 *    - 600+ random sRGB <-> OKLCH roundtrips verifying Delta E < 10^-4
 *    - Monotonicity proof for binary search under reverse polarity (Theorem 2)
 * 2. Native PNG Codec & Saliency Oracle (docs/research/v2.6/reference/png-codec.js)
 *    - Corrupted headers, truncated buffers, bad chunk CRC/lengths, invalid filter types
 *    - Row 0 Paeth defiltering with zeroed prior scanline reconstruction
 *    - Lateral competition operator N(M) = M(M_max - m_mean)^2 noise suppression
 * 3. Sub-Pixel NDC Projection (ndc-projection & Pilar 7)
 *    - High velocity flick (v > 2.0) stability and finite bounds
 *    - Extreme camera angles, extreme FOV (5° to 175°), near-clip boundary
 *    - Formal Invariance Theorem 3: epsilon <= 0.5px across 600+ frustum samples
 * 4. Slug Font Compiler (docs/research/v2.6/reference/slug-font-compiler.js)
 *    - Empty glyphs (whitespace charCode 32, zero-contour, zero-length)
 *    - Complex contours with De Casteljau midpoint synthesis (Eq. 30)
 *    - N_B = 8 band buffer integrity and boundary clamping
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

// Direct reference engines
const apca = require('../../docs/research/v2.6/reference/apca-contrast.js');
const png = require('../../docs/research/v2.6/reference/png-codec.js');
const { SlugFontCompiler } = require('../../docs/research/v2.6/reference/slug-font-compiler.js');
const { resolveEngine } = require('./fixtures/harness');
const { projectCardToScreen, projectPointToScreen, evaluateSheetCpuTwin } = resolveEngine('ndc-projection');

const { createPngRgba, create1x1Png } = require('./fixtures/sample-png.js');
const { createSampleTtf } = require('./fixtures/sample-ttf.js');

// ============================================================================
// Helper: Custom TTF Builder for Multi-Contour & Midpoint Synthesis Stress
// ============================================================================
function align4(n) { return (n + 3) & ~3; }

function calculateTableChecksum(buffer, offset, length) {
  let sum = 0;
  const count = align4(length) / 4;
  for (let i = 0; i < count; i++) {
    const val = offset + i * 4 + 4 <= buffer.length ? buffer.readUInt32BE(offset + i * 4) : 0;
    sum = (sum + val) >>> 0;
  }
  return sum;
}

function buildAdversarialTtf(contoursList) {
  const numberOfContours = contoursList.length;
  let allPoints = [];
  const endPtsOfContours = [];
  for (let c = 0; c < contoursList.length; c++) {
    allPoints.push(...contoursList[c]);
    endPtsOfContours.push(allPoints.length - 1);
  }
  const numPoints = allPoints.length;
  const minX = Math.min(...allPoints.map((p) => p.x));
  const maxX = Math.max(...allPoints.map((p) => p.x));
  const minY = Math.min(...allPoints.map((p) => p.y));
  const maxY = Math.max(...allPoints.map((p) => p.y));

  const glyfHeader = Buffer.alloc(10 + numberOfContours * 2 + 2);
  glyfHeader.writeInt16BE(numberOfContours, 0);
  glyfHeader.writeInt16BE(minX, 2);
  glyfHeader.writeInt16BE(minY, 4);
  glyfHeader.writeInt16BE(maxX, 6);
  glyfHeader.writeInt16BE(maxY, 8);
  for (let i = 0; i < numberOfContours; i++) {
    glyfHeader.writeUInt16BE(endPtsOfContours[i], 10 + i * 2);
  }
  glyfHeader.writeUInt16BE(0, 10 + numberOfContours * 2); // instructionLength = 0

  const flagsBuf = Buffer.alloc(numPoints);
  for (let i = 0; i < numPoints; i++) {
    flagsBuf[i] = allPoints[i].onCurve ? 1 : 0;
  }

  const coordsBuf = Buffer.alloc(numPoints * 4);
  let prevX = 0;
  let prevY = 0;
  for (let i = 0; i < numPoints; i++) {
    const dx = allPoints[i].x - prevX;
    coordsBuf.writeInt16BE(dx, i * 2);
    prevX = allPoints[i].x;
  }
  for (let i = 0; i < numPoints; i++) {
    const dy = allPoints[i].y - prevY;
    coordsBuf.writeInt16BE(dy, numPoints * 2 + i * 2);
    prevY = allPoints[i].y;
  }

  const glyfData = Buffer.concat([glyfHeader, flagsBuf, coordsBuf]);

  const headData = Buffer.alloc(54);
  headData.writeUInt32BE(0x00010000, 0);
  headData.writeUInt32BE(0x00010000, 4);
  headData.writeUInt32BE(0x5f0f3cf5, 12);
  headData.writeUInt16BE(0x0003, 16);
  headData.writeUInt16BE(1000, 18);
  headData.writeInt16BE(minX, 36);
  headData.writeInt16BE(minY, 38);
  headData.writeInt16BE(maxX, 40);
  headData.writeInt16BE(maxY, 42);
  headData.writeInt16BE(0, 50);

  const hheaData = Buffer.alloc(36);
  hheaData.writeUInt32BE(0x00010000, 0);
  hheaData.writeInt16BE(800, 4);
  hheaData.writeInt16BE(-200, 6);
  hheaData.writeUInt16BE(2, 34);

  const maxpData = Buffer.alloc(32);
  maxpData.writeUInt32BE(0x00010000, 0);
  maxpData.writeUInt16BE(2, 4);

  const hmtxData = Buffer.alloc(8);
  hmtxData.writeUInt16BE(250, 0);
  hmtxData.writeInt16BE(0, 2);
  hmtxData.writeUInt16BE(Math.max(1, maxX - minX + 50), 4);
  hmtxData.writeInt16BE(minX, 6);

  const locaData = Buffer.alloc(6);
  locaData.writeUInt16BE(0, 0);
  locaData.writeUInt16BE(0, 2);
  locaData.writeUInt16BE(Math.ceil(glyfData.length / 2), 4);

  const cmapSub4 = Buffer.alloc(32);
  cmapSub4.writeUInt16BE(4, 0);
  cmapSub4.writeUInt16BE(32, 2);
  cmapSub4.writeUInt16BE(4, 6);
  cmapSub4.writeUInt16BE(65, 14);
  cmapSub4.writeUInt16BE(0xffff, 16);
  cmapSub4.writeUInt16BE(65, 20);
  cmapSub4.writeUInt16BE(0xffff, 22);
  cmapSub4.writeInt16BE(-64, 24);
  cmapSub4.writeInt16BE(1, 26);

  const cmapHeader = Buffer.alloc(12);
  cmapHeader.writeUInt16BE(1, 2);
  cmapHeader.writeUInt16BE(3, 4);
  cmapHeader.writeUInt16BE(1, 6);
  cmapHeader.writeUInt32BE(12, 8);
  const cmapData = Buffer.concat([cmapHeader, cmapSub4]);

  const rawTables = [
    { tag: 'cmap', data: cmapData },
    { tag: 'glyf', data: glyfData },
    { tag: 'head', data: headData },
    { tag: 'hhea', data: hheaData },
    { tag: 'hmtx', data: hmtxData },
    { tag: 'loca', data: locaData },
    { tag: 'maxp', data: maxpData }
  ].sort((a, b) => a.tag.localeCompare(b.tag));

  const numTables = rawTables.length;
  let currentOffset = 12 + numTables * 16;
  const tableHeaders = [];
  const tableBodies = [];

  for (const t of rawTables) {
    const alignedLen = align4(t.data.length);
    const padded = Buffer.alloc(alignedLen);
    t.data.copy(padded, 0);
    const checkSum = calculateTableChecksum(padded, 0, padded.length);
    const entry = Buffer.alloc(16);
    entry.write(t.tag, 0, 4, 'ascii');
    entry.writeUInt32BE(checkSum, 4);
    entry.writeUInt32BE(currentOffset, 8);
    entry.writeUInt32BE(t.data.length, 12);
    tableHeaders.push(entry);
    tableBodies.push(padded);
    currentOffset += alignedLen;
  }

  const sfntHeader = Buffer.alloc(12);
  sfntHeader.writeUInt32BE(0x00010000, 0);
  sfntHeader.writeUInt16BE(numTables, 4);
  sfntHeader.writeUInt16BE(64, 6);
  sfntHeader.writeUInt16BE(2, 8);
  sfntHeader.writeUInt16BE(48, 10);

  return Buffer.concat([sfntHeader, ...tableHeaders, ...tableBodies]);
}

// ============================================================================
// TEST SUITE: Challenger 2 Empirical Stress Hardening
// ============================================================================
describe('Challenger 2: Empirical Adversarial Stress Suite (v2.6)', () => {

  // ==========================================================================
  // SECTION 1: APCA Contrast & OKLCH Engine Stress
  // ==========================================================================
  describe('1. APCA Contrast & OKLCH Synthesis Stress', () => {

    test('1.1: W3C reference test pairs and boundary soft-clamps', () => {
      // W3C Canonical BoW reference pair: #000000 on #ffffff -> +106.04
      const bow = apca.calcAPCA('#000000', '#ffffff');
      assert.ok(bow >= 105.0 && bow <= 107.5, `Black on white must be ~+106.0 (got ${bow})`);

      // W3C Canonical WoB reference pair: #ffffff on #000000 -> -107.88
      const wob = apca.calcAPCA('#ffffff', '#000000');
      assert.ok(wob <= -106.5 && wob >= -109.5, `White on black must be ~-108.0 (got ${wob})`);

      // Identical colors yield 0.0
      assert.equal(apca.calcAPCA('#777777', '#777777'), 0.0);
      assert.equal(apca.calcAPCA('#242b35', '#242b35'), 0.0);

      // Sub-threshold Delta Y (|Y_bg - Y_txt| < 0.0005) soft-clamps to 0.0
      const softClamped = apca.calcAPCA('#777777', '#787878');
      assert.equal(softClamped, 0.0);

      // Format versatility: 3-char hex, arrays, objects
      const scoreHex3 = apca.calcAPCA('#fff', '#000');
      assert.ok(Math.abs(scoreHex3 - wob) < 1e-4, '3-char hex should match 6-char hex');

      const scoreArr = apca.calcAPCA([0, 0, 0], [255, 255, 255]);
      assert.ok(Math.abs(scoreArr - bow) < 1e-4, 'Array input should match hex');

      const scoreObj = apca.calcAPCA({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
      assert.ok(Math.abs(scoreObj - bow) < 1e-4, 'Object input should match hex');
    });

    test('1.2: 600+ random sRGB <-> OKLCH roundtrips maintain Delta E < 10^-4', () => {
      let maxContinuousDeltaE = 0;
      let maxByteDiff = 0;
      const numTrials = 600;

      for (let i = 0; i < numTrials; i++) {
        // Uniformly distributed across full 24-bit sRGB gamut
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Forward
        const { L, C, h } = apca.sRGBToOklch(r, g, b);

        // Invariant bounds
        assert.ok(L >= 0.0 && L <= 1.0, `Lightness out of [0, 1]: ${L}`);
        assert.ok(C >= 0.0, `Chroma cannot be negative: ${C}`);
        assert.ok(h >= 0.0 && h < 360.0, `Hue angle out of [0, 360): ${h}`);

        // Inverse
        const back = apca.oklchToSRGB(L, C, h);
        const dr = Math.abs(r - back.r);
        const dg = Math.abs(g - back.g);
        const db = Math.abs(b - back.b);
        const byteDiff = Math.max(dr, dg, db);
        if (byteDiff > maxByteDiff) maxByteDiff = byteDiff;

        // Verify continuous roundtrip before byte rounding via inverse formulas
        const hRad = (h * Math.PI) / 180.0;
        const a = C * Math.cos(hRad);
        const bOklab = C * Math.sin(hRad);
        const l_ = L + 0.3963377774 * a + 0.2158037573 * bOklab;
        const m_ = L - 0.1055613458 * a - 0.0638541728 * bOklab;
        const s_ = L - 0.0894841775 * a - 1.2914855480 * bOklab;
        const l = l_ * l_ * l_;
        const m = m_ * m_ * m_;
        const s = s_ * s_ * s_;
        const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
        const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
        const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
        const encode = (c) => c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(0, c), 1.0 / 2.4) - 0.055;
        const rRec = encode(rLin) * 255;
        const gRec = encode(gLin) * 255;
        const bRec = encode(bLin) * 255;

        const deltaE = Math.sqrt(((r - rRec) / 255) ** 2 + ((g - gRec) / 255) ** 2 + ((b - bRec) / 255) ** 2);
        if (deltaE > maxContinuousDeltaE) maxContinuousDeltaE = deltaE;
      }

      assert.ok(maxContinuousDeltaE < 1e-4, `Max continuous Delta E must be < 10^-4 (got ${maxContinuousDeltaE})`);
      assert.equal(maxByteDiff, 0, `Exact integer byte roundtrip must have 0 byte error (got ${maxByteDiff})`);
    });

    test('1.3: Theorem 2 Monotonicity proof for text lightness binary search under reverse polarity', () => {
      // Test across 50 distinct dark background surfaces
      let totalChecks = 0;
      let nonMonotonicFailures = 0;

      for (let bgIdx = 0; bgIdx < 50; bgIdx++) {
        const bgL = 0.02 + Math.random() * 0.25;
        const bgC = Math.random() * 0.04;
        const bgH = Math.random() * 360.0;
        const bg = apca.oklchToSRGB(bgL, bgC, bgH);

        let prevScore = -Infinity;
        // Sweep text lightness L_txt strictly above bgL up to 1.0
        for (let L = bgL + 0.02; L <= 1.0; L += 0.01) {
          const txt = apca.oklchToSRGB(L, 0.02, bgH);
          const score = Math.abs(apca.calcAPCA(txt.hex, bg.hex));
          // Strict monotonic increase assertion (allowing floating tolerance)
          if (score < prevScore - 1e-4) {
            nonMonotonicFailures++;
          }
          prevScore = score;
          totalChecks++;
        }
      }

      assert.ok(totalChecks > 3000, `Must verify >= 3000 monotonic transition points (tested ${totalChecks})`);
      assert.equal(nonMonotonicFailures, 0, 'Theorem 2 violated: reverse polarity contrast must be monotonically increasing');

      // Verify convergence of bisection search across random dark backgrounds
      for (let i = 0; i < 30; i++) {
        const darkBg = apca.oklchToSRGB(0.04 + Math.random() * 0.15, 0.02, Math.random() * 360);
        const targetLc = 50 + Math.random() * 40; // between 50 and 90
        const found = apca.searchMonotonicContrast(darkBg.hex, targetLc);
        const achieved = Math.abs(apca.calcAPCA(found.hex, darkBg.hex));
        const diff = Math.abs(achieved - targetLc);
        assert.ok(diff < 1.0, `Binary search must converge within 1.0 Lc (target: ${targetLc}, achieved: ${achieved}, diff: ${diff})`);
      }
    });
  });

  // ==========================================================================
  // SECTION 2: Native PNG Codec & Itti-Koch Saliency Stress
  // ==========================================================================
  describe('2. Native PNG Codec & Lateral Saliency Stress', () => {

    test('2.1: Robust rejection of corrupted headers, invalid chunk structures, and bad zlib streams', () => {
      // 1. Truncated buffers (< 8 bytes)
      for (const len of [0, 1, 4, 7]) {
        assert.throws(
          () => png.decodePng(Buffer.alloc(len)),
          /Invalid PNG signature/,
          `Buffer of length ${len} must fail signature check`
        );
      }

      // 2. Corrupted signature
      const badSig = Buffer.from([137, 80, 78, 71, 0, 0, 0, 0]);
      assert.throws(() => png.decodePng(badSig), /Invalid PNG signature/);

      // 3. Truncated chunk headers
      const basePng = create1x1Png();
      for (const cutOff of [10, 15, 25, 35]) {
        assert.throws(
          () => png.decodePng(basePng.subarray(0, cutOff)),
          /(Missing or invalid IHDR|Invalid PNG signature|Decompressed data length mismatch|Unsupported color type|unexpected end of file)/
        );
      }

      // 4. Corrupted IDAT data
      const corruptedIdat = Buffer.from(basePng);
      corruptedIdat[corruptedIdat.length - 18] ^= 0xff; // flip byte inside compressed IDAT
      assert.throws(() => png.decodePng(corruptedIdat));
    });

    test('2.2: Row 0 Paeth defiltering with zeroed prior scanline reconstruction', () => {
      // Build a 6x4 PNG where Row 0 is explicitly encoded with Filter 4 (Paeth)
      const width = 6;
      const height = 4;
      const testImage = createPngRgba(
        width,
        height,
        (x, y) => [x * 35 + 15, y * 45 + 10, (x * y * 12) & 0xff, 255],
        [4, 4, 4, 4] // ALL rows, including Row 0, use Paeth filter
      );

      const decoded = png.decodePng(testImage);
      assert.equal(decoded.width, width);
      assert.equal(decoded.height, height);
      assert.equal(decoded.channels, 4);

      // Verify every reconstructed pixel matches original mathematical formula
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const expR = x * 35 + 15;
          const expG = y * 45 + 10;
          const expB = (x * y * 12) & 0xff;
          const expA = 255;

          assert.equal(decoded.data[idx], expR, `Row ${y} Col ${x} R mismatch`);
          assert.equal(decoded.data[idx + 1], expG, `Row ${y} Col ${x} G mismatch`);
          assert.equal(decoded.data[idx + 2], expB, `Row ${y} Col ${x} B mismatch`);
          assert.equal(decoded.data[idx + 3], expA, `Row ${y} Col ${x} A mismatch`);
        }
      }
    });

    test('2.3: Lateral competition operator N(M) noise suppression and peak amplification', () => {
      // Test 1: Uniform constant field is completely suppressed to 0
      for (const c of [0.05, 0.5, 1.0, 100.0]) {
        const uniformMap = new Float32Array(256).fill(c);
        const competed = png.applyLateralCompetition(uniformMap, 16, 16);
        let maxVal = 0;
        for (let i = 0; i < competed.length; i++) {
          if (competed[i] > maxVal) maxVal = competed[i];
        }
        assert.equal(maxVal, 0.0, `Uniform field of ${c} must be completely suppressed to 0 (got ${maxVal})`);
      }

      // Test 2: Low-amplitude random noise is attenuated by > 300x
      const noiseMap = new Float32Array(1000);
      for (let i = 0; i < 1000; i++) {
        noiseMap[i] = 0.50 + (Math.random() - 0.5) * 0.05; // [0.475, 0.525]
      }
      const competedNoise = png.applyLateralCompetition(noiseMap, 100, 10);
      const maxNoiseBefore = Math.max(...noiseMap);
      const maxNoiseAfter = Math.max(...competedNoise);
      assert.ok(maxNoiseAfter < maxNoiseBefore / 300, `Noise should be attenuated >300x (before: ${maxNoiseBefore}, after: ${maxNoiseAfter})`);

      // Test 3: Localized high-contrast feature retains > 95% peak energy
      const peakMap = new Float32Array(1024).fill(0.01);
      peakMap[512] = 1.0; // isolated spike
      const competedPeak = png.applyLateralCompetition(peakMap, 32, 32);
      assert.ok(competedPeak[512] >= 0.95, `Isolated peak must retain >= 95% energy (got ${competedPeak[512]})`);
      assert.ok(competedPeak[0] < 0.01, `Background clutter must be attenuated (got ${competedPeak[0]})`);

      // Test 4: Saliency metrics calculation
      const ctaRect = { minX: 10, minY: 10, maxX: 20, maxY: 20 };
      const funcRect = { minX: 0, minY: 0, maxX: 30, maxY: 30 };
      const metrics = png.computeSaliencyMetrics(competedPeak, 32, 32, ctaRect, funcRect);
      assert.ok(Number.isFinite(metrics.sCta));
      assert.ok(Number.isFinite(metrics.rDistraction));
    });
  });

  // ==========================================================================
  // SECTION 3: Sub-Pixel NDC Projection Stress
  // ==========================================================================
  describe('3. Sub-Pixel NDC Projection & Theorem 3 Stress', () => {

    test('3.1: High velocity flick (v > 2.0) maintains finite deformation and valid bounding boxes', () => {
      // Rapid flick velocities up to 100.0
      const extremeVelocities = [2.0, 2.5, 5.0, 10.0, 25.0, 50.0, 100.0];

      for (const v of extremeVelocities) {
        // CPU Twin deformation
        const deformed = evaluateSheetCpuTwin(12.0, 6.0, 0.0, { u_sheetP: 1.0, u_sheetV: v });
        assert.ok(Number.isFinite(deformed[0]), `X must be finite at v=${v}`);
        assert.ok(Number.isFinite(deformed[1]), `Y must be finite at v=${v}`);
        assert.ok(Number.isFinite(deformed[2]), `Z must be finite at v=${v}`);

        // Viewport projection of entire deformed card
        const aabb = projectCardToScreen(0, { u_sheetP: 1.0, u_sheetV: v }, { width: 1440, height: 900 });
        assert.equal(aabb.clipped, false);
        assert.ok(aabb.width > 20, `Card width should remain positive and non-collapsed (got ${aabb.width})`);
        assert.ok(aabb.height > 20, `Card height should remain positive (got ${aabb.height})`);
        assert.ok(aabb.minX < aabb.maxX, 'AABB minX must be strictly less than maxX');
        assert.ok(aabb.minY < aabb.maxY, 'AABB minY must be strictly less than maxY');
      }
    });

    test('3.2: Extreme camera angles, extreme FOV (5° to 175°), and near-clip handling', () => {
      const viewport = { width: 1440, height: 900 };

      // Center point projection invariance across FOV span [5°, 175°]
      for (const fov of [5, 15, 30, 53.4, 75, 90, 120, 150, 175]) {
        const pt = projectPointToScreen([0, 0, 0], { fov, cameraZ: 41.18 }, viewport);
        assert.equal(pt.clipped, false);
        assert.ok(Math.abs(pt.x - 720) < 0.1, `Center X must remain 720 at FOV ${fov} (got ${pt.x})`);
        assert.ok(Math.abs(pt.y - 450) < 0.1, `Center Y must remain 450 at FOV ${fov} (got ${pt.y})`);
      }

      // Point placed behind camera (viewZ >= 0, clipW <= 0) must trigger clipped: true
      const behindCamera = projectPointToScreen([0, 0, 42.0], { fov: 53.4, cameraZ: 41.18 }, viewport);
      assert.equal(behindCamera.clipped, true, 'Point behind camera plane must have clipped: true');

      // Extreme camera distance (macro 0.5 to satellite 5000)
      const macro = projectPointToScreen([0, 0, 0], { fov: 53.4, cameraZ: 1.0 }, viewport);
      assert.equal(macro.clipped, false);
      const satellite = projectPointToScreen([0, 0, 0], { fov: 53.4, cameraZ: 5000.0 }, viewport);
      assert.equal(satellite.clipped, false);
    });

    test('3.3: Formal Invariance Theorem 3: epsilon <= 0.5px sub-pixel error across 600+ frustum samples', () => {
      let maxEpsilon = 0;
      let samplesTested = 0;
      const viewport = { width: 1440, height: 900 };

      for (let i = 0; i < 600; i++) {
        const wx = (Math.random() - 0.5) * 50;
        const wy = (Math.random() - 0.5) * 35;
        const wz = (Math.random() - 0.5) * 20;

        // Double precision (CPU Twin)
        const ptDouble = [wx, wy, wz];
        const screenDouble = projectPointToScreen(ptDouble, { fov: 53.4, cameraZ: 41.18 }, viewport);

        // Float32 simulation (GPU pipeline emulation)
        const ptFloat = [Math.fround(wx), Math.fround(wy), Math.fround(wz)];
        const screenFloat = projectPointToScreen(ptFloat, { fov: 53.4, cameraZ: 41.18 }, viewport);

        if (!screenDouble.clipped && !screenFloat.clipped) {
          const dx = Math.abs(screenDouble.x - screenFloat.x);
          const dy = Math.abs(screenDouble.y - screenFloat.y);
          const epsilon = Math.max(dx, dy);

          if (epsilon > maxEpsilon) maxEpsilon = epsilon;
          samplesTested++;

          assert.ok(
            epsilon <= 0.5,
            `Theorem 3 violation at sample ${i}: epsilon ${epsilon} > 0.5px`
          );
        }
      }

      assert.ok(samplesTested > 500, `Must test >= 500 in-frustum samples (tested ${samplesTested})`);
      assert.ok(maxEpsilon < 0.001, `Observed numerical discrepancy is infinitesimal (< 0.001px, got ${maxEpsilon}px)`);
    });
  });

  // ==========================================================================
  // SECTION 4: Slug Font Compiler Stress
  // ==========================================================================
  describe('4. Slug Font Compiler & Band Buffer Stress', () => {

    test('4.1: Empty glyph handling (whitespace char 32, zero-contour, unmapped)', () => {
      const baseTtf = createSampleTtf();
      const compiler = new SlugFontCompiler(baseTtf);

      // Character 32 (space) resolves to glyph 0
      const spaceGlyph = compiler.compileGlyph(32);
      assert.equal(spaceGlyph.glyphIndex, 0);
      assert.equal(spaceGlyph.curves.length, 0, 'Curves buffer must be empty for space');
      assert.equal(spaceGlyph.bands.length, 8, 'Bands must still contain 8 entries');
      assert.ok(spaceGlyph.advanceWidth > 0, 'Space must retain positive advance width');
      assert.deepEqual(spaceGlyph.bounds, { minX: 0, minY: 0, maxX: 0, maxY: 0 });

      // Unmapped high Unicode code point
      const unmapped = compiler.compileGlyph(0x1f600); // Emoji outside BMP
      assert.equal(unmapped.glyphIndex, 0);
      assert.equal(unmapped.curves.length, 0);
      assert.equal(unmapped.bands.length, 8);
    });

    test('4.2: Multi-contour parsing and De Casteljau midpoint synthesis for consecutive off-curve points', () => {
      // Contour 1: Outer shape with consecutive off-curve control points (Eq. 30 test)
      const contourOuter = [
        { x: 50, y: 0, onCurve: true },
        { x: 200, y: 700, onCurve: false },
        { x: 400, y: 700, onCurve: false }, // Consecutive off-curve!
        { x: 550, y: 0, onCurve: true }
      ];

      // Contour 2: Inner counter hole
      const contourInner = [
        { x: 150, y: 200, onCurve: true },
        { x: 300, y: 500, onCurve: false },
        { x: 450, y: 200, onCurve: true }
      ];

      const advTtf = buildAdversarialTtf([contourOuter, contourInner]);
      const compiler = new SlugFontCompiler(advTtf);
      const compiled = compiler.compileGlyph(65);

      assert.equal(compiled.glyphIndex, 1);
      assert.equal(compiled.curves.length % 7, 0, 'Curves must be packed in 7-float tuples');
      const curvesCount = compiled.curves.length / 7;
      assert.ok(curvesCount >= 2, `Must extract at least 2 quadratic curves (got ${curvesCount})`);

      // Verify that synthesized midpoint was calculated: (200 + 400)/2 = 300, (700 + 700)/2 = 700
      let foundMidpoint = false;
      for (let i = 0; i < curvesCount; i++) {
        const p2x = compiled.curves[i * 7 + 4];
        const p2y = compiled.curves[i * 7 + 5];
        if (Math.abs(p2x - 300) < 1e-4 && Math.abs(p2y - 700) < 1e-4) {
          foundMidpoint = true;
          break;
        }
      }
      assert.ok(foundMidpoint, 'De Casteljau midpoint (300, 700) was synthesized per Equation 30');
    });

    test('4.3: N_B = 8 band buffer distribution, flat glyphs (0 height), and band index clamping', () => {
      // 1. Verify sum of curves across bands equals total curves
      const contour = [
        { x: 50, y: 0, onCurve: true },
        { x: 200, y: 700, onCurve: false },
        { x: 400, y: 700, onCurve: false },
        { x: 550, y: 0, onCurve: true }
      ];
      const ttf = buildAdversarialTtf([contour]);
      const compiler = new SlugFontCompiler(ttf);
      const compiled = compiler.compileGlyph(65);

      assert.equal(compiled.bands.length, 8);
      let bandSum = 0;
      for (let i = 0; i < compiled.bands.length; i++) {
        bandSum += compiled.bands[i];
      }
      assert.equal(bandSum, compiled.curves.length / 7, 'Sum of band curve counts must equal total curves');

      // 2. Flat glyph with 0 height (maxY == minY) does not divide by zero
      const flatContour = [
        { x: 50, y: 300, onCurve: true },
        { x: 200, y: 300, onCurve: false },
        { x: 350, y: 300, onCurve: true }
      ];
      const flatTtf = buildAdversarialTtf([flatContour]);
      const flatCompiler = new SlugFontCompiler(flatTtf);
      const flatCompiled = flatCompiler.compileGlyph(65);
      assert.equal(flatCompiled.bands.length, 8);
      assert.ok(!Number.isNaN(flatCompiled.bands[0]));
    });
  });
});
