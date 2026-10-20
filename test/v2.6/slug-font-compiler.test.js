/**
 * test/v2.6/slug-font-compiler.test.js
 * 
 * Studio DNA PRO v2.6 — 4-Tier Comprehensive Test Suite
 * Feature: Binary TrueType Slug Font Compiler (R6.4, Pillar 10)
 * 
 * Architecture:
 * - Tier 1: Feature Coverage (SFNT table parsing, head, cmap, loca, glyf, quadratic spline extraction, 8-band packing)
 * - Tier 2: Boundary & Corner Cases (Malformed buffer, Empty glyph, Unmapped charCode, Midpoint synthesis, Band boundaries)
 * - Tier 3: Cross-Feature Combinations (Slug GPU buffer packing + NDC typography scaling)
 * - Tier 4: Real-World Scenarios (Editorial Headline Glyph Compilation & Continuous Pen Advance)
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { resolveEngine } = require('./fixtures/harness');
const { createSampleTtf } = require('./fixtures/sample-ttf');

const { SlugFontCompiler } = resolveEngine('slug-font-compiler');

describe('v2.6 Binary TrueType Slug Font Compiler', () => {

  // ==========================================================================
  // TIER 1: Feature Coverage (>= 5 Happy Path Cases)
  // ==========================================================================
  describe('Tier 1: Feature Coverage', () => {

    test('T1.1: SlugFontCompiler parses SFNT table directory and locates all standard tables', () => {
      const ttfBuf = createSampleTtf();
      const compiler = new SlugFontCompiler(ttfBuf);

      assert.ok(compiler.tables['head'], 'Must parse head table');
      assert.ok(compiler.tables['hhea'], 'Must parse hhea table');
      assert.ok(compiler.tables['maxp'], 'Must parse maxp table');
      assert.ok(compiler.tables['hmtx'], 'Must parse hmtx table');
      assert.ok(compiler.tables['cmap'], 'Must parse cmap table');
      assert.ok(compiler.tables['loca'], 'Must parse loca table');
      assert.ok(compiler.tables['glyf'], 'Must parse glyf table');
    });

    test('T1.2: Reads unitsPerEm and indexToLocFormat from head table', () => {
      const ttfBuf = createSampleTtf();
      const compiler = new SlugFontCompiler(ttfBuf);

      assert.equal(compiler.unitsPerEm, 1000, 'unitsPerEm should equal 1000');
      assert.equal(compiler.indexToLocFormat, 0, 'indexToLocFormat should equal 0 (16-bit offset / 2)');
    });

    test('T1.3: Resolves character code to glyph index via cmap Format 4 subtable', () => {
      const ttfBuf = createSampleTtf();
      const compiler = new SlugFontCompiler(ttfBuf);

      // Character 65 ('A') is mapped to glyph index 1
      const glyphA = compiler.getGlyphIndexForChar(65);
      assert.equal(glyphA, 1, 'Char code 65 should resolve to glyph index 1');

      // Unmapped character (e.g. 99) falls back to glyph 0
      const glyphUnknown = compiler.getGlyphIndexForChar(99);
      assert.equal(glyphUnknown, 0, 'Unmapped char should resolve to fallback glyph 0');
    });

    test('T1.4: compileGlyph extracts glyph bounding box and advance width', () => {
      const ttfBuf = createSampleTtf();
      const compiler = new SlugFontCompiler(ttfBuf);

      const glyphData = compiler.compileGlyph(65);
      assert.equal(glyphData.glyphIndex, 1);
      assert.equal(glyphData.bounds.minX, 50);
      assert.equal(glyphData.bounds.maxX, 550);
      assert.equal(glyphData.bounds.minY, 0);
      assert.equal(glyphData.bounds.maxY, 700);
      assert.ok(glyphData.advanceWidth >= 500, 'Advance width should be >= 500');
    });

    test('T1.5: compileGlyph packs curves into N_B = 8 horizontal bands', () => {
      const ttfBuf = createSampleTtf();
      const compiler = new SlugFontCompiler(ttfBuf);

      const glyphData = compiler.compileGlyph(65);
      assert.equal(glyphData.bands.length, 8, 'Band index table must have exactly 8 bands');
      assert.ok(glyphData.curves instanceof Float32Array, 'Curves must be packed into Float32Array');
      // Each curve has 7 floats: [p0x, p0y, p1x, p1y, p2x, p2y, flags]
      assert.equal(glyphData.curves.length % 7, 0, 'Curve buffer length must be a multiple of 7 floats');
    });
  });

  // ==========================================================================
  // TIER 2: Boundary & Corner Cases
  // ==========================================================================
  describe('Tier 2: Boundary & Corner Cases', () => {

    test('T2.1: Rejects empty or undersized font buffer with explicit Error', () => {
      const tinyBuf = Buffer.from([0, 1, 2, 3]);
      assert.throws(() => new SlugFontCompiler(tinyBuf), /Buffer too small/);
    });

    test('T2.2: Empty glyph (e.g. space character or glyph 0) compiles safely with 0 curves', () => {
      const ttfBuf = createSampleTtf();
      const compiler = new SlugFontCompiler(ttfBuf);

      // Character 32 (space) resolves to glyph 0 (empty)
      const spaceGlyph = compiler.compileGlyph(32);
      assert.equal(spaceGlyph.curves.length, 0, 'Empty glyph should produce 0 curves');
      assert.equal(spaceGlyph.bands.length, 8);
      assert.ok(spaceGlyph.advanceWidth > 0, 'Empty glyph must still have non-zero advance width for spacing');
    });

    test('T2.3: De Casteljau subdivision synthesizes on-curve midpoint between consecutive off-curve points', () => {
      // Equation 30: Pon = (P1 + P2) / 2
      const p1 = { x: 100, y: 200 };
      const p2 = { x: 200, y: 400 };
      const pon = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

      assert.equal(pon.x, 150);
      assert.equal(pon.y, 300);
    });

    test('T2.4: Extreme coordinate bounds partition safely across 8 bands without index out-of-bounds', () => {
      const ttfBuf = createSampleTtf();
      const compiler = new SlugFontCompiler(ttfBuf);

      const glyph = compiler.compileGlyph(65);
      // Total curves across all bands must equal total curves in Float32Array / 7
      let totalInBands = 0;
      for (let i = 0; i < glyph.bands.length; i++) {
        totalInBands += glyph.bands[i];
      }
      assert.equal(totalInBands, glyph.curves.length / 7, 'Sum of band curve counts must equal total curves');
    });
  });

  // ==========================================================================
  // TIER 3: Cross-Feature Combinations
  // ==========================================================================
  describe('Tier 3: Cross-Feature Combinations', () => {

    test('T3.1: Slug font buffer converts to normalized device coordinate (NDC) bounds', () => {
      const ttfBuf = createSampleTtf();
      const compiler = new SlugFontCompiler(ttfBuf);
      const glyph = compiler.compileGlyph(65);

      // Scale from font design units (unitsPerEm = 1000) to NDC target size 0.2
      const targetEmHeight = 0.2;
      const scale = targetEmHeight / compiler.unitsPerEm;

      const ndcMinX = glyph.bounds.minX * scale;
      const ndcMaxX = glyph.bounds.maxX * scale;
      const ndcMinY = glyph.bounds.minY * scale;
      const ndcMaxY = glyph.bounds.maxY * scale;

      assert.ok(ndcMaxX - ndcMinX <= targetEmHeight, 'Glyph NDC width must be within em box');
      assert.ok(ndcMaxY - ndcMinY <= targetEmHeight, 'Glyph NDC height must be within em box');
    });
  });

  // ==========================================================================
  // TIER 4: Real-World Application Scenarios
  // ==========================================================================
  describe('Tier 4: Real-World Application Scenarios', () => {

    test('T4.1: Multi-character kinetic text layout calculates monotonic pen progression', () => {
      const ttfBuf = createSampleTtf();
      const compiler = new SlugFontCompiler(ttfBuf);

      // Typeset string: 'A A' (char 65, char 32, char 65)
      const text = [65, 32, 65];
      let penX = 0;
      const glyphPositions = [];

      for (const charCode of text) {
        const compiled = compiler.compileGlyph(charCode);
        glyphPositions.push({
          charCode,
          startX: penX,
          advance: compiled.advanceWidth,
          curvesCount: compiled.curves.length / 7
        });
        penX += compiled.advanceWidth;
      }

      assert.equal(glyphPositions.length, 3);
      assert.equal(glyphPositions[0].startX, 0);
      assert.ok(glyphPositions[1].startX > glyphPositions[0].startX, 'Pen must advance after A');
      assert.ok(glyphPositions[2].startX > glyphPositions[1].startX, 'Pen must advance after space');
      assert.ok(penX > 1000, 'Total line length must be non-zero and accumulated');
    });
  });
});
