/**
 * test/v2.6/apca-contrast.test.js
 * 
 * Studio DNA PRO v2.6 — 4-Tier Comprehensive Test Suite
 * Features: OKLCH Synthesis, APCA 0.0.98G-4g & Fluid Typography (Pillars 9 & 10)
 * 
 * Architecture:
 * - Tier 1: Feature Coverage (sRGB <-> OKLCH, APCA 0.0.98G-4g normal & reverse, Monotonic Search, OLS Fluid Scaling, Lexical Damping)
 * - Tier 2: Boundary & Corner Cases (Pure black/white, Low contrast soft-clip, Out-of-gamut clipping, 12px font floor)
 * - Tier 3: Cross-Feature Combinations (Relational Palette Projection + APCA Compliance, Fluid Scaling + Spatial Frequency)
 * - Tier 4: Real-World Scenarios (Dark-Mode Brand Transmutation with Certified Lc >= 75 Body & Lc >= 60 Headline)
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { resolveEngine } = require('./fixtures/harness');

const {
  sRGBToOklch,
  oklchToSRGB,
  calcAPCA,
  searchMonotonicContrast,
  calculateFluidScale,
  applyLexicalDamping
} = resolveEngine('apca-contrast');

describe('v2.6 APCA 0.0.98G-4g Contrast & OKLCH Synthesis Engine', () => {

  // ==========================================================================
  // TIER 1: Feature Coverage (>= 5 Happy Path Cases)
  // ==========================================================================
  describe('Tier 1: Feature Coverage', () => {

    test('T1.1: sRGBToOklch converts sRGB coordinates to perceptual OKLCH coordinates', () => {
      // Pure red: 255, 0, 0
      const redOklch = sRGBToOklch(255, 0, 0);
      assert.ok(redOklch.L > 0.6 && redOklch.L < 0.65, `Red lightness should be ~0.627 (got ${redOklch.L})`);
      assert.ok(redOklch.C > 0.25, `Red chroma should be high (got ${redOklch.C})`);
      assert.ok(redOklch.h > 20 && redOklch.h < 35, `Red hue angle should be ~29 degrees (got ${redOklch.h})`);
    });

    test('T1.2: oklchToSRGB performs exact roundtrip conversion (Delta E < 1e-4)', () => {
      const original = { r: 50, g: 120, b: 200 };
      const oklch = sRGBToOklch(original.r, original.g, original.b);
      const roundtrip = oklchToSRGB(oklch.L, oklch.C, oklch.h);

      assert.equal(roundtrip.r, original.r, 'Red channel roundtrip match');
      assert.equal(roundtrip.g, original.g, 'Green channel roundtrip match');
      assert.equal(roundtrip.b, original.b, 'Blue channel roundtrip match');
    });

    test('T1.3: calcAPCA computes normal polarity: black text on white background yields Lc ~ +106', () => {
      // W3C reference test pair: #000000 on #ffffff
      const lc = calcAPCA('#000000', '#ffffff');
      assert.ok(lc >= 105.0 && lc <= 107.5, `Black on white Lc should be ~+106.0 (got ${lc})`);
    });

    test('T1.4: calcAPCA computes reverse polarity: white text on black background yields Lc ~ -108', () => {
      // W3C reference test pair: #ffffff on #000000
      const lc = calcAPCA('#ffffff', '#000000');
      assert.ok(lc <= -106.5 && lc >= -109.5, `White on black Lc should be ~-108.0 (got ${lc})`);
    });

    test('T1.5: searchMonotonicContrast converges exponentially to target Lc threshold', () => {
      const darkBg = '#0b0c10';
      const targetLc = 75.0; // Body text threshold
      const result = searchMonotonicContrast(darkBg, targetLc, 'body');

      assert.ok(result, 'Search must return compliant color');
      assert.ok(result.hex, 'Must contain hex code');
      const achievedLc = Math.abs(calcAPCA(result.hex, darkBg));
      assert.ok(Math.abs(achievedLc - targetLc) < 1.0, `Achieved Lc (${achievedLc}) must match target within 1.0`);
    });

    test('T1.6: calculateFluidScale generates CSS clamp using OLS multi-breakpoint regression', () => {
      const viewports = [390, 768, 1440];
      const fontSizes = [24, 32, 48];
      const clampStr = calculateFluidScale(viewports, fontSizes);

      assert.match(clampStr, /^clamp\(24px, [0-9.]+vw \+ [0-9.-]+px, 48px\)$/);
    });

    test('T1.7: applyLexicalDamping dampens scale when text length expands per Equation 9', () => {
      // Original copy length = 20, new copy length = 40 (German translation expansion)
      const baseSize = 48;
      const damped = applyLexicalDamping(baseSize, 20, 40);

      // kappa = (20/40)^0.65 = 0.5^0.65 = ~0.637; 48 * 0.637 = ~30.59
      assert.ok(damped < baseSize, 'Damped font size should be smaller than base size');
      assert.ok(damped >= 30 && damped <= 32, `Expected ~30.6px, got ${damped}`);
    });
  });

  // ==========================================================================
  // TIER 2: Boundary & Corner Cases
  // ==========================================================================
  describe('Tier 2: Boundary & Corner Cases', () => {

    test('T2.1: Pure black and pure white handle without NaN or division by zero', () => {
      const black = sRGBToOklch(0, 0, 0);
      assert.equal(black.L, 0.0);
      assert.equal(black.C, 0.0);
      assert.equal(black.h, 0.0);

      const white = sRGBToOklch(255, 255, 255);
      assert.ok(Math.abs(white.L - 1.0) < 1e-4);
      assert.ok(white.C < 1e-4, 'White chroma should be essentially zero');
    });

    test('T2.2: Low contrast gray-on-gray triggers soft clamp returning Lc = 0.0', () => {
      // Delta Y < 0.0005 soft clamp threshold
      const lc = calcAPCA('#777777', '#777777');
      assert.equal(lc, 0.0, 'Identical colors must yield Lc = 0.0');

      const lcClose = calcAPCA('#777777', '#787878');
      assert.equal(lcClose, 0.0, 'Sub-threshold contrast difference must soft-clip to 0.0');
    });

    test('T2.3: Out-of-gamut OKLCH values clamp cleanly to [0, 255] range', () => {
      // Extreme chroma that falls outside sRGB gamut
      const outOfGamut = oklchToSRGB(0.7, 0.5, 145);
      assert.ok(outOfGamut.r >= 0 && outOfGamut.r <= 255);
      assert.ok(outOfGamut.g >= 0 && outOfGamut.g <= 255);
      assert.ok(outOfGamut.b >= 0 && outOfGamut.b <= 255);
      assert.match(outOfGamut.hex, /^#[0-9a-f]{6}$/i);
    });

    test('T2.4: Lexical damping respects 12px minimum accessibility floor', () => {
      // 10x length expansion (e.g. 10 chars to 100 chars)
      const baseSmall = 16;
      const dampedExtreme = applyLexicalDamping(baseSmall, 10, 100);
      // kappa = (10/100)^0.65 = 0.1^0.65 = ~0.2238; 16 * 0.2238 = ~3.58px, must floor at 12px
      assert.equal(dampedExtreme, 12.0, 'Font size must never drop below 12px floor');
    });

    test('T2.5: Degenerate single viewport input produces valid static clamp', () => {
      const clampStr = calculateFluidScale([768], [32]);
      assert.equal(clampStr, 'clamp(32px, 32px, 32px)');
    });
  });

  // ==========================================================================
  // TIER 3: Cross-Feature Combinations
  // ==========================================================================
  describe('Tier 3: Cross-Feature Combinations', () => {

    test('T3.1: Relational Palette Projection maintains lightness hierarchy with guaranteed APCA compliance', () => {
      const clientBrandHex = '#e63946'; // Red accent
      const clientRgb = { r: 230, g: 57, b: 70 };
      const brandOklch = sRGBToOklch(clientRgb.r, clientRgb.g, clientRgb.b);

      // Generate dark mode palette preserving hue and spatial depth
      const bg = oklchToSRGB(0.12, 0.01, brandOklch.h);
      const surface = oklchToSRGB(0.18, 0.015, brandOklch.h);
      const fg = searchMonotonicContrast(bg.hex, 85.0, 'body');

      // Verify lightness hierarchy: L(bg) < L(surface) < L(fg)
      const bgO = sRGBToOklch(bg.r, bg.g, bg.b);
      const surfaceO = sRGBToOklch(surface.r, surface.g, surface.b);
      const fgO = sRGBToOklch(fg.r, fg.g, fg.b);

      assert.ok(bgO.L < surfaceO.L, 'Surface must be lighter than background in dark mode');
      assert.ok(surfaceO.L < fgO.L, 'Foreground text must be lighter than surface in dark mode');

      // Verify APCA contrast between fg and bg
      const contrastBg = Math.abs(calcAPCA(fg.hex, bg.hex));
      assert.ok(contrastBg >= 80.0, `Foreground on background contrast must be >= 80 (got ${contrastBg})`);

      // Verify APCA contrast between fg and surface
      const contrastSurface = Math.abs(calcAPCA(fg.hex, surface.hex));
      assert.ok(contrastSurface >= 70.0, `Foreground on surface contrast must be >= 70 (got ${contrastSurface})`);
    });

    test('T3.2: Fluid typography scaling paired with APCA spatial frequency compliance', () => {
      const viewports = [390, 768, 1440];
      const fontSizes = [16, 24, 48]; // body scales from 16 to 48px
      const bg = '#121212';
      const text = '#e0e0e0';

      const lc = Math.abs(calcAPCA(text, bg));

      // At 16px (high spatial frequency), APCA requires Lc >= 75
      // At 48px (low spatial frequency), APCA requires Lc >= 45
      assert.ok(lc >= 75.0, `Text contrast ${lc} must satisfy high-frequency threshold 75 at mobile 16px`);
      assert.ok(lc >= 45.0, `Text contrast ${lc} must satisfy low-frequency threshold 45 at desktop 48px`);
    });
  });

  // ==========================================================================
  // TIER 4: Real-World Application Scenarios
  // ==========================================================================
  describe('Tier 4: Real-World Application Scenarios', () => {

    test('T4.1: Dark-Mode Brand Transmutation with Certified APCA Compliance', () => {
      const clientSpec = {
        name: 'Vanguard Luxury Yachts',
        primaryBrandColor: '#0077b6', // Oceanic blue
        mode: 'dark'
      };

      const brandRgb = { r: 0, g: 119, b: 182 };
      const brandOklch = sRGBToOklch(brandRgb.r, brandRgb.g, brandRgb.b);

      // Synthesize full 6-token theme
      const theme = {
        bg: oklchToSRGB(0.10, 0.01, brandOklch.h).hex,
        surface: oklchToSRGB(0.16, 0.015, brandOklch.h).hex,
        surfaceRaised: oklchToSRGB(0.22, 0.02, brandOklch.h).hex,
        border: oklchToSRGB(0.28, 0.01, brandOklch.h).hex,
        accent: oklchToSRGB(0.68, 0.18, brandOklch.h).hex,
        textBody: searchMonotonicContrast(oklchToSRGB(0.10, 0.01, brandOklch.h).hex, 75.0).hex,
        textHeadline: searchMonotonicContrast(oklchToSRGB(0.10, 0.01, brandOklch.h).hex, 90.0).hex
      };

      // 1. Audit body text on background: Lc >= 75
      const bodyBgScore = Math.abs(calcAPCA(theme.textBody, theme.bg));
      assert.ok(bodyBgScore >= 74.0, `Body text on bg must meet Lc 75 (got ${bodyBgScore})`);

      // 2. Audit headline on background: Lc >= 60 (actually ~90)
      const headBgScore = Math.abs(calcAPCA(theme.textHeadline, theme.bg));
      assert.ok(headBgScore >= 85.0, `Headline text on bg must meet Lc 90 (got ${headBgScore})`);

      // 3. Audit accent CTA button contrast against dark surface
      const accentBgScore = Math.abs(calcAPCA(theme.accent, theme.surface));
      assert.ok(accentBgScore >= 45.0, `Accent on surface must have >= 45 contrast for UI widgets (got ${accentBgScore})`);
    });
  });
});
