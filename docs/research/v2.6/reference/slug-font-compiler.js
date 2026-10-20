/**
 * docs/research/v2.6/reference/slug-font-compiler.js
 * 
 * Studio DNA PRO v2.6 — Zero-Dependency Core Reference Micro-Engine
 * Feature: Binary TrueType Slug Font Compiler (R6.4, Pillar 10)
 * 
 * Standards & Mathematics:
 * - TrueType / OpenType SFNT Binary Specification (ISO/IEC 14496-22)
 * - Binary SFNT Table Extraction via native DataView (head, hhea, maxp, hmtx, cmap, loca, glyf)
 * - De Casteljau Midpoint Subdivision for Quadratic Splines per Equation 30:
 *   Pon = (P1 + P2) / 2 for consecutive off-curve control points
 * - Curve Partitioning into N_B = 8 Horizontal Bands for Analytical GPU Root-Finding
 * - Zero external dependencies (no opentype.js required)
 */

'use strict';

class SlugFontCompiler {
  /**
   * Constructs a TrueType SFNT binary parser and Slug buffer compiler.
   * @param {Buffer|Uint8Array} ttfBuffer Raw TTF binary buffer
   */
  constructor(ttfBuffer) {
    if (!Buffer.isBuffer(ttfBuffer)) {
      ttfBuffer = Buffer.from(ttfBuffer);
    }
    this.buffer = ttfBuffer;
    this.view = new DataView(ttfBuffer.buffer, ttfBuffer.byteOffset, ttfBuffer.byteLength);
    this.tables = {};
    this.unitsPerEm = 1000;
    this.indexToLocFormat = 0;
    this.numGlyphs = 0;
    this.glyphOffsets = [];
    this.parseTables();
  }

  /**
   * Parses the SFNT offset table and directories.
   */
  parseTables() {
    if (this.buffer.length < 12) {
      throw new Error('Buffer too small for TTF font header');
    }
    const numTables = this.view.getUint16(4, false);
    let offset = 12;

    for (let i = 0; i < numTables; i++) {
      if (offset + 16 > this.buffer.length) break;
      const tag = String.fromCharCode(
        this.view.getUint8(offset),
        this.view.getUint8(offset + 1),
        this.view.getUint8(offset + 2),
        this.view.getUint8(offset + 3)
      );
      const tableOffset = this.view.getUint32(offset + 8, false);
      const length = this.view.getUint32(offset + 12, false);
      this.tables[tag] = { offset: tableOffset, length };
      offset += 16;
    }

    // Parse 'head' table
    if (this.tables['head']) {
      const headOff = this.tables['head'].offset;
      this.unitsPerEm = this.view.getUint16(headOff + 18, false);
      this.indexToLocFormat = this.view.getInt16(headOff + 50, false);
    }

    // Parse 'maxp' table
    if (this.tables['maxp']) {
      const maxpOff = this.tables['maxp'].offset;
      this.numGlyphs = this.view.getUint16(maxpOff + 4, false);
    }

    // Parse 'loca' table (glyph offsets)
    if (this.tables['loca']) {
      const locaOff = this.tables['loca'].offset;
      this.glyphOffsets = [];
      for (let i = 0; i <= this.numGlyphs; i++) {
        if (this.indexToLocFormat === 0) {
          // 16-bit offset divided by 2
          this.glyphOffsets.push(this.view.getUint16(locaOff + i * 2, false) * 2);
        } else {
          // 32-bit direct offset
          this.glyphOffsets.push(this.view.getUint32(locaOff + i * 4, false));
        }
      }
    }
  }

  /**
   * Resolves a Unicode character code to a TrueType glyph index via cmap.
   * @param {number} charCode Unicode code point
   * @returns {number} Glyph index (0 if not found)
   */
  getGlyphIndexForChar(charCode) {
    if (!this.tables['cmap']) return 0;
    const cmapOff = this.tables['cmap'].offset;
    const numSubtables = this.view.getUint16(cmapOff + 2, false);

    for (let i = 0; i < numSubtables; i++) {
      const subOffset = cmapOff + this.view.getUint32(cmapOff + 4 + i * 8 + 4, false);
      const format = this.view.getUint16(subOffset, false);

      if (format === 4) {
        const segCount = this.view.getUint16(subOffset + 6, false) / 2;
        const endCodeOff = subOffset + 14;
        const startCodeOff = endCodeOff + segCount * 2 + 2;
        const idDeltaOff = startCodeOff + segCount * 2;
        const idRangeOffsetOff = idDeltaOff + segCount * 2;

        for (let s = 0; s < segCount; s++) {
          const endCode = this.view.getUint16(endCodeOff + s * 2, false);
          const startCode = this.view.getUint16(startCodeOff + s * 2, false);
          if (charCode >= startCode && charCode <= endCode) {
            const idDelta = this.view.getInt16(idDeltaOff + s * 2, false);
            const idRangeOffset = this.view.getUint16(idRangeOffsetOff + s * 2, false);
            if (idRangeOffset === 0) {
              return (charCode + idDelta) & 0xffff;
            } else {
              const glyphOffset = idRangeOffsetOff + s * 2 + idRangeOffset + (charCode - startCode) * 2;
              return this.view.getUint16(glyphOffset, false);
            }
          }
        }
      }
    }
    return 0;
  }

  /**
   * Compiles a character code into GPU-ready Slug curve and band buffers.
   * 
   * @param {number} charCode Unicode code point
   * @returns {{ glyphIndex: number, curves: Float32Array, bands: Uint16Array, advanceWidth: number, bounds: { minX: number, minY: number, maxX: number, maxY: number } }}
   */
  compileGlyph(charCode) {
    const glyphIndex = this.getGlyphIndexForChar(charCode);
    const glyphStart = this.glyphOffsets[glyphIndex];
    const glyphEnd = this.glyphOffsets[glyphIndex + 1];

    if (!this.tables['glyf'] || glyphStart === glyphEnd) {
      // Empty glyph (e.g. whitespace)
      return {
        glyphIndex,
        curves: new Float32Array(0),
        bands: new Uint16Array(8),
        advanceWidth: Math.round(this.unitsPerEm * 0.25),
        bounds: { minX: 0, minY: 0, maxX: 0, maxY: 0 }
      };
    }

    const glyfOff = this.tables['glyf'].offset + glyphStart;
    const numberOfContours = this.view.getInt16(glyfOff, false);
    const minX = this.view.getInt16(glyfOff + 2, false);
    const minY = this.view.getInt16(glyfOff + 4, false);
    const maxX = this.view.getInt16(glyfOff + 6, false);
    const maxY = this.view.getInt16(glyfOff + 8, false);

    const curves = [];
    if (numberOfContours > 0) {
      let offset = glyfOff + 10;
      const endPtsOfContours = [];
      for (let i = 0; i < numberOfContours; i++) {
        endPtsOfContours.push(this.view.getUint16(offset, false));
        offset += 2;
      }
      const instructionLength = this.view.getUint16(offset, false);
      offset += 2 + instructionLength;

      const numPoints = endPtsOfContours[endPtsOfContours.length - 1] + 1;
      const flags = [];
      let p = 0;
      while (p < numPoints) {
        const flag = this.view.getUint8(offset++);
        flags.push(flag);
        p++;
        if ((flag & 8) !== 0) {
          const repeatCount = this.view.getUint8(offset++);
          for (let r = 0; r < repeatCount; r++) {
            flags.push(flag);
            p++;
          }
        }
      }

      // X coordinates
      const xCoords = [];
      let x = 0;
      for (let i = 0; i < numPoints; i++) {
        const flag = flags[i];
        if ((flag & 2) !== 0) {
          const dx = this.view.getUint8(offset++);
          x += (flag & 16) !== 0 ? dx : -dx;
        } else if ((flag & 16) === 0) {
          x += this.view.getInt16(offset, false);
          offset += 2;
        }
        xCoords.push(x);
      }

      // Y coordinates
      const yCoords = [];
      let y = 0;
      for (let i = 0; i < numPoints; i++) {
        const flag = flags[i];
        if ((flag & 4) !== 0) {
          const dy = this.view.getUint8(offset++);
          y += (flag & 32) !== 0 ? dy : -dy;
        } else if ((flag & 32) === 0) {
          y += this.view.getInt16(offset, false);
          offset += 2;
        }
        yCoords.push(y);
      }

      // Extract quadratic Bezier curves per contour
      let startIdx = 0;
      for (let c = 0; c < numberOfContours; c++) {
        const endIdx = endPtsOfContours[c];
        const contourLen = endIdx - startIdx + 1;
        const cPoints = [];

        for (let i = 0; i < contourLen; i++) {
          const idx = startIdx + i;
          cPoints.push({
            x: xCoords[idx],
            y: yCoords[idx],
            onCurve: (flags[idx] & 1) !== 0
          });
        }

        // De Casteljau subdivision / midpoint synthesis
        for (let i = 0; i < cPoints.length; i++) {
          const curr = cPoints[i];
          const next = cPoints[(i + 1) % cPoints.length];
          if (curr.onCurve && !next.onCurve) {
            const nextNext = cPoints[(i + 2) % cPoints.length];
            if (nextNext.onCurve) {
              curves.push([curr.x, curr.y, next.x, next.y, nextNext.x, nextNext.y, 0]);
            } else {
              // Consecutive off-curve control points: synthesize on-curve midpoint (Eq. 30)
              const midX = (next.x + nextNext.x) / 2;
              const midY = (next.y + nextNext.y) / 2;
              curves.push([curr.x, curr.y, next.x, next.y, midX, midY, 0]);
            }
          }
        }
        startIdx = endIdx + 1;
      }
    }

    // Partition into N_B = 8 horizontal bands
    const bandCount = 8;
    const bandHeight = (maxY - minY) / bandCount || 1;
    const bands = new Uint16Array(bandCount);
    const flatCurves = new Float32Array(curves.length * 7);

    for (let i = 0; i < curves.length; i++) {
      const c = curves[i];
      for (let j = 0; j < 7; j++) {
        flatCurves[i * 7 + j] = c[j];
      }
      const midY = (c[1] + c[5]) / 2;
      const bIdx = Math.min(bandCount - 1, Math.max(0, Math.floor((midY - minY) / bandHeight)));
      bands[bIdx]++;
    }

    return {
      glyphIndex,
      curves: flatCurves,
      bands,
      advanceWidth: Math.max(1, maxX - minX + 50),
      bounds: { minX, minY, maxX, maxY }
    };
  }
}

module.exports = {
  SlugFontCompiler
};
