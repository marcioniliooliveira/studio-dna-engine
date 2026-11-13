/**
 * test/contrast-apca.test.js
 * 
 * Verification Test Suite for Unified APCA, OKLCH, Scrim Solver, and Fluid Typography
 * Running directly against production src/constraints/contrast.js
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const {
  parseColorToRgb,
  hexToRgb,
  rgbToHex,
  getRelativeLuminance,
  sRGBToOklch,
  oklchToSRGB,
  calcAPCA,
  searchMonotonicContrast,
  fontLookupAPCA,
  solveOptimalScrimOpacity,
  resolveBackgroundProductContrast,
  calculateFluidScale,
  applyLexicalDamping
} = require('../src/constraints/contrast');

describe('Milestone 1 — Unified APCA & Scrim Contrast Engine (src/constraints/contrast.js)', () => {

  // ==========================================================================
  // 1. APCA 0.0.98G-4g Lightness Contrast
  // ==========================================================================
  describe('APCA 0.0.98G-4g Perceptual Contrast', () => {

    test('1.1: calcAPCA evaluates normal polarity (Black text on White background) Lc ~ +106', () => {
      const lc = calcAPCA('#000000', '#ffffff');
      assert.ok(lc >= 105.0 && lc <= 107.5, `Black on white Lc should be ~+106.0 (got ${lc})`);
    });

    test('1.2: calcAPCA evaluates reverse polarity (White text on Black background) Lc ~ -108', () => {
      const lc = calcAPCA('#ffffff', '#000000');
      assert.ok(lc <= -106.5 && lc >= -109.5, `White on black Lc should be ~-108.0 (got ${lc})`);
    });

    test('1.3: calcAPCA soft clamps small luminance differences to 0.0', () => {
      assert.equal(calcAPCA('#777777', '#777777'), 0.0);
      assert.equal(calcAPCA('#777777', '#787878'), 0.0);
    });

    test('1.4: fontLookupAPCA maps contrast and font weight to typography guidance', () => {
      const highContrast = fontLookupAPCA(95, 400);
      assert.equal(highContrast.compliant, true);
      assert.equal(highContrast.rating, 'preferred');
      assert.equal(highContrast.minFontSizePx, 14);

      const lowContrast = fontLookupAPCA(10, 400);
      assert.equal(lowContrast.compliant, false);
      assert.equal(lowContrast.rating, 'inadmissible');
    });
  });

  // ==========================================================================
  // 2. OKLCH Perceptually Uniform Space
  // ==========================================================================
  describe('OKLCH Gamut Transformations', () => {

    test('2.1: sRGBToOklch and oklchToSRGB perform roundtrip color space conversion', () => {
      const original = { r: 64, g: 128, b: 220 };
      const oklch = sRGBToOklch(original.r, original.g, original.b);
      const back = oklchToSRGB(oklch.L, oklch.C, oklch.h);

      assert.equal(back.r, original.r);
      assert.equal(back.g, original.g);
      assert.equal(back.b, original.b);
      assert.match(back.hex, /^#[0-9a-f]{6}$/i);
    });

    test('2.2: Extreme black and white coordinates handle without NaN or division by zero', () => {
      const black = sRGBToOklch(0, 0, 0);
      assert.equal(black.L, 0.0);
      assert.equal(black.C, 0.0);

      const white = sRGBToOklch(255, 255, 255);
      assert.ok(Math.abs(white.L - 1.0) < 1e-4);
      assert.ok(white.C < 1e-4);
    });

    test('2.3: searchMonotonicContrast converges exponentially to target Lc threshold', () => {
      const darkBg = '#120824';
      const targetLc = 75.0; // Body text threshold
      const result = searchMonotonicContrast(darkBg, targetLc, 'body');

      assert.ok(result);
      assert.ok(result.hex);
      const achievedLc = Math.abs(calcAPCA(result.hex, darkBg));
      assert.ok(Math.abs(achievedLc - targetLc) < 1.0, `Achieved Lc (${achievedLc}) must match target (${targetLc}) within 1.0`);
    });
  });

  // ==========================================================================
  // 3. Analytical Scrim Solver (Dual-Signature Support)
  // ==========================================================================
  describe('solveOptimalScrimOpacity', () => {

    test('3.1: 4-argument signature: (textRgb, backdropWorstCaseRgb, scrimRgb, targetLc)', () => {
      // Light text on medium-light backdrop needing dark scrim
      const textRgb = [255, 255, 255];
      const backdropRgb = [180, 180, 180];
      const scrimRgb = [0, 0, 0];
      const targetLc = 65;

      const result = solveOptimalScrimOpacity(textRgb, backdropRgb, scrimRgb, targetLc);

      assert.equal(result.achievable, true);
      assert.equal(result.solved, true);
      assert.ok(result.alpha > 0 && result.alpha <= 1.0);
      assert.equal(result.alpha, result.opacity);
      assert.ok(result.resultingLc >= targetLc - 0.5);
      assert.equal(result.resultingLc, result.achievedLc);
      assert.match(result.cssScrim, /^rgba\(0,\s*0,\s*0,\s*[0-9.]+\)$/);
      assert.match(result.compositeColor, /^#[0-9a-f]{6}$/i);
    });

    test('3.2: 3-argument signature: (textColor, bgColor, options = { targetLc, scrimColor })', () => {
      const textColor = '#ffffff';
      const bgColor = '#a0a0a0';
      const options = { targetLc: 60, scrimColor: '#000000' };

      const result = solveOptimalScrimOpacity(textColor, bgColor, options);

      assert.equal(result.achievable, true);
      assert.equal(result.solved, true);
      assert.ok(result.alpha > 0);
      assert.equal(result.scrimColor, '#000000');
      assert.ok(result.resultingLc >= 59.5);
    });

    test('3.3: Returns alpha === 0.0 and cssScrim === "transparent" when initial contrast already meets target', () => {
      // Pure white text on pure black background: initial Lc ~ 108 >= target 60
      const result = solveOptimalScrimOpacity('#ffffff', '#000000', { targetLc: 60 });

      assert.equal(result.achievable, true);
      assert.equal(result.solved, true);
      assert.equal(result.alpha, 0.0);
      assert.equal(result.opacity, 0.0);
      assert.equal(result.cssScrim, 'transparent');
      assert.ok(result.resultingLc >= 106.0);
    });
  });

  // ==========================================================================
  // 4. Fluid Typography & Lexical Damping
  // ==========================================================================
  describe('Fluid Typography & Lexical Damping', () => {

    test('4.1: calculateFluidScale generates CSS clamp using OLS multi-breakpoint regression', () => {
      const viewports = [390, 768, 1440];
      const fontSizes = [24, 32, 48];
      const clampStr = calculateFluidScale(viewports, fontSizes);

      assert.match(clampStr, /^clamp\(24px, [0-9.]+vw \+ [0-9.-]+px, 48px\)$/);
    });

    test('4.2: calculateFluidScale handles single-breakpoint degenerate input', () => {
      const clampStr = calculateFluidScale([768], [32]);
      assert.equal(clampStr, 'clamp(32px, 32px, 32px)');
    });

    test('4.3: applyLexicalDamping dampens font size when copy expands but preserves 12px accessibility floor', () => {
      // Moderate expansion: 20 chars -> 40 chars
      const baseSize = 48;
      const damped = applyLexicalDamping(baseSize, 20, 40);
      assert.ok(damped < baseSize);
      assert.ok(damped >= 30 && damped <= 32);

      // Extreme expansion (10 chars -> 200 chars) must never drop below 12px
      const extremeDamped = applyLexicalDamping(16, 10, 200);
      assert.equal(extremeDamped, 12.0);

      // No expansion or shorter copy preserves original base size
      assert.equal(applyLexicalDamping(24, 50, 40), 24);
      assert.equal(applyLexicalDamping(24, 50, 50), 24);
    });
  });
});
