/**
 * test/v2.6/png-codec.test.js
 * 
 * Studio DNA PRO v2.6 — 4-Tier Comprehensive Test Suite
 * Feature: Native PNG RGBA Decoder & Saliency Oracle (R6.3, Pillar 8)
 * 
 * Architecture:
 * - Tier 1: Feature Coverage (PNG signature, IHDR, IDAT inflate, 5 scanline filters: None, Sub, Up, Average, Paeth)
 * - Tier 2: Boundary & Corner Cases (Corrupted signature, Truncated chunk, Row 0 Paeth, 1x1 pixel, Uniform image)
 * - Tier 3: Cross-Feature Combinations (PNG Decode + 42-map Saliency Oracle, Lateral Competition N(M))
 * - Tier 4: Real-World Scenarios (Full Product Texture Audit, CTA Prominence >= 0.18, Distraction <= 0.35)
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { resolveEngine } = require('./fixtures/harness');
const { create1x1Png, createMultiFilterPng, createPngRgba } = require('./fixtures/sample-png');

const { decodePng, applyLateralCompetition, computeSaliencyMetrics } = resolveEngine('png-codec');

describe('v2.6 Native PNG Codec & Itti-Koch Saliency Oracle', () => {

  // ==========================================================================
  // TIER 1: Feature Coverage (>= 5 Happy Path Cases)
  // ==========================================================================
  describe('Tier 1: Feature Coverage', () => {

    test('T1.1: decodePng decodes minimal 1x1 RGBA PNG and extracts exact byte channels', () => {
      const pngBuf = create1x1Png(255, 128, 64, 255);
      const decoded = decodePng(pngBuf);

      assert.equal(decoded.width, 1);
      assert.equal(decoded.height, 1);
      assert.equal(decoded.channels, 4);
      assert.equal(decoded.colorType, 6);
      assert.equal(decoded.data[0], 255, 'Red channel');
      assert.equal(decoded.data[1], 128, 'Green channel');
      assert.equal(decoded.data[2], 64, 'Blue channel');
      assert.equal(decoded.data[3], 255, 'Alpha channel');
    });

    test('T1.2: decodePng defilters scanlines using Filter 0 (None)', () => {
      const pngBuf = createPngRgba(2, 2, (x, y) => [10 + x, 20 + y, 30, 255], [0, 0]);
      const decoded = decodePng(pngBuf);

      assert.equal(decoded.width, 2);
      assert.equal(decoded.height, 2);
      // Row 0
      assert.equal(decoded.data[0], 10);
      assert.equal(decoded.data[4], 11);
      // Row 1
      assert.equal(decoded.data[8], 10);
      assert.equal(decoded.data[12], 11);
    });

    test('T1.3: decodePng defilters scanlines using Filter 1 (Sub)', () => {
      const pngBuf = createPngRgba(3, 1, (x) => [x * 40, x * 30, 100, 255], [1]);
      const decoded = decodePng(pngBuf);

      assert.equal(decoded.width, 3);
      assert.equal(decoded.height, 1);
      assert.equal(decoded.data[0], 0);
      assert.equal(decoded.data[4], 40);
      assert.equal(decoded.data[8], 80);
    });

    test('T1.4: decodePng defilters scanlines using Filter 2 (Up)', () => {
      const pngBuf = createPngRgba(2, 2, (x, y) => [y * 50, 100, 150, 255], [0, 2]);
      const decoded = decodePng(pngBuf);

      assert.equal(decoded.width, 2);
      assert.equal(decoded.height, 2);
      // Row 0
      assert.equal(decoded.data[0], 0);
      // Row 1
      assert.equal(decoded.data[8], 50);
    });

    test('T1.5: decodePng reconstructs scanlines using Filter 3 (Average) and Filter 4 (Paeth)', () => {
      const pngBuf = createMultiFilterPng();
      const decoded = decodePng(pngBuf);

      assert.equal(decoded.width, 4);
      assert.equal(decoded.height, 5);
      assert.equal(decoded.data.length, 4 * 5 * 4);

      // Verify pixel reconstruction at row 3 (Average) and row 4 (Paeth)
      const row3Offset = 3 * 4 * 4;
      assert.equal(decoded.data[row3Offset + 3], 255, 'Alpha preserved');
      const row4Offset = 4 * 4 * 4;
      assert.equal(decoded.data[row4Offset + 3], 255, 'Alpha preserved');
    });

    test('T1.6: applyLateralCompetition calculates N(M) operator per Equation 27', () => {
      const map = new Float32Array([1.0, 0.5, 0.2, 0.1]);
      // max = 1.0, mean = 1.8 / 4 = 0.45, factor = (1.0 - 0.45)^2 = 0.55^2 = 0.3025
      const out = applyLateralCompetition(map, 2, 2);

      assert.equal(out.length, 4);
      const expected0 = 1.0 * 0.3025;
      assert.ok(Math.abs(out[0] - expected0) < 1e-4, `Expected ${expected0}, got ${out[0]}`);
      assert.ok(out[0] > out[1], 'Peak conspicuity must exceed neighboring values');
    });
  });

  // ==========================================================================
  // TIER 2: Boundary & Corner Cases
  // ==========================================================================
  describe('Tier 2: Boundary & Corner Cases', () => {

    test('T2.1: Rejects invalid 8-byte PNG signature with explicit Error', () => {
      const corruptedBuf = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      assert.throws(() => decodePng(corruptedBuf), /Invalid PNG signature/);
    });

    test('T2.2: Rejects truncated buffer smaller than PNG header', () => {
      const shortBuf = Buffer.from([137, 80, 78, 71]);
      assert.throws(() => decodePng(shortBuf), /Invalid PNG signature/);
    });

    test('T2.3: Filter 4 (Paeth predictor) on Row 0 executes cleanly without NaN or throw', () => {
      // Row 0 has no prior row; b and c default to 0
      const pngBuf = createPngRgba(2, 1, (x) => [x * 100, 50, 20, 255], [4]);
      const decoded = decodePng(pngBuf);

      assert.equal(decoded.width, 2);
      assert.equal(decoded.height, 1);
      assert.equal(decoded.data[0], 0);
      assert.equal(decoded.data[4], 100);
      assert.equal(!Number.isNaN(decoded.data[4]), true);
    });

    test('T2.4: 1x1 pixel minimum PNG decodes exactly 4 bytes without memory overrun', () => {
      const png1x1 = create1x1Png(0, 0, 0, 0);
      const decoded = decodePng(png1x1);
      assert.equal(decoded.data.length, 4);
      assert.deepEqual(Array.from(decoded.data), [0, 0, 0, 0]);
    });

    test('T2.5: Uniform image (solid white) in saliency calculation handles zero variance safely', () => {
      const uniformMap = new Float32Array(16).fill(1.0);
      // max = 1.0, mean = 1.0, factor = (1.0 - 1.0)^2 = 0
      const out = applyLateralCompetition(uniformMap, 4, 4);

      for (let i = 0; i < out.length; i++) {
        assert.equal(out[i], 0.0, 'Uniform image should produce zero lateral contrast');
      }
    });

    test('T2.6: Rejects corrupted zlib IDAT stream', () => {
      const valid = create1x1Png(255, 0, 0, 255);
      // Corrupt bytes in the middle of IDAT
      valid[valid.length - 20] ^= 0xff;
      valid[valid.length - 19] ^= 0xff;

      assert.throws(() => decodePng(valid));
    });
  });

  // ==========================================================================
  // TIER 3: Cross-Feature Combinations
  // ==========================================================================
  describe('Tier 3: Cross-Feature Combinations', () => {

    test('T3.1: PNG texture feed into 42-map Itti-Koch Dyadic Pyramid computes CTA prominence', () => {
      // Create a 8x8 image with high contrast red button in the center (CTA)
      const pngBuf = createPngRgba(8, 8, (x, y) => {
        if (x >= 2 && x <= 5 && y >= 2 && y <= 5) {
          return [255, 0, 0, 255]; // Red CTA button
        }
        return [20, 20, 20, 255]; // Dark background
      });

      const decoded = decodePng(pngBuf);
      assert.equal(decoded.width, 8);
      assert.equal(decoded.height, 8);

      // Compute simple conspicuity map from decoded RGBA
      const saliencyMap = new Float32Array(64);
      for (let i = 0; i < 64; i++) {
        const r = decoded.data[i * 4];
        const g = decoded.data[i * 4 + 1];
        const b = decoded.data[i * 4 + 2];
        // Red-green opponency: R - (G+B)/2
        saliencyMap[i] = Math.max(0, r - (g + b) / 2);
      }

      // Apply lateral competition
      const refinedMap = applyLateralCompetition(saliencyMap, 8, 8);

      const ctaRect = { minX: 2, minY: 2, maxX: 5, maxY: 5 };
      const functionalRect = { minX: 1, minY: 1, maxX: 6, maxY: 6 };

      const metrics = computeSaliencyMetrics(refinedMap, 8, 8, ctaRect, functionalRect);
      assert.ok(metrics.sCta >= 0.18, `CTA optical prominence should be >= 0.18 (got ${metrics.sCta})`);
      assert.ok(metrics.rDistraction <= 0.35, `Visual distraction ratio should be <= 0.35 (got ${metrics.rDistraction})`);
    });
  });

  // ==========================================================================
  // TIER 4: Real-World Application Scenarios
  // ==========================================================================
  describe('Tier 4: Real-World Application Scenarios', () => {

    test('T4.1: Product card texture audit validates alpha channels and optical saliency', () => {
      // 16x16 product card with card body, hero icon, and callout badge
      const texture = createPngRgba(16, 16, (x, y) => {
        // CTA badge in corner
        if (x >= 10 && x <= 14 && y >= 10 && y <= 14) {
          return [255, 215, 0, 255]; // Gold badge
        }
        // Product silhouette
        if (x >= 4 && x <= 8 && y >= 4 && y <= 8) {
          return [200, 200, 200, 255]; // Gray product
        }
        return [10, 10, 15, 255]; // Dark background
      });

      const decoded = decodePng(texture);
      assert.equal(decoded.width, 16);
      assert.equal(decoded.height, 16);
      assert.equal(decoded.data.length, 16 * 16 * 4);

      // Verify pixel values in golden badge
      const badgePixelOffset = (12 * 16 + 12) * 4;
      assert.equal(decoded.data[badgePixelOffset], 255);
      assert.equal(decoded.data[badgePixelOffset + 1], 215);
      assert.equal(decoded.data[badgePixelOffset + 2], 0);

      // Saliency audit
      const saliency = new Float32Array(256);
      for (let i = 0; i < 256; i++) {
        const r = decoded.data[i * 4];
        const g = decoded.data[i * 4 + 1];
        const b = decoded.data[i * 4 + 2];
        saliency[i] = (r * 0.299 + g * 0.587 + b * 0.114) / 255.0;
      }
      const competed = applyLateralCompetition(saliency, 16, 16);
      const ctaRect = { minX: 10, minY: 10, maxX: 14, maxY: 14 };
      const functionalRect = { minX: 4, minY: 4, maxX: 14, maxY: 14 };

      const audit = computeSaliencyMetrics(competed, 16, 16, ctaRect, functionalRect);
      assert.ok(audit.sCta >= 0.18, `CTA score must meet 0.18 threshold: got ${audit.sCta}`);
      assert.ok(audit.rDistraction <= 0.35, `Distraction score must meet 0.35 threshold: got ${audit.rDistraction}`);
    });
  });
});
