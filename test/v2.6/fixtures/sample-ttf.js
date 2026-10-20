/**
 * test/v2.6/fixtures/sample-ttf.js
 * 
 * Standalone Minimal TrueType (SFNT) Binary Font Generator
 * Generates valid TrueType font buffers for unit testing binary table parsers
 * and Slug font compilers with zero external dependencies.
 */

'use strict';

function align4(n) {
  return (n + 3) & ~3;
}

function calculateTableChecksum(buffer, offset, length) {
  let sum = 0;
  const count = align4(length) / 4;
  for (let i = 0; i < count; i++) {
    const val = offset + i * 4 + 4 <= buffer.length ? buffer.readUInt32BE(offset + i * 4) : 0;
    sum = (sum + val) >>> 0;
  }
  return sum;
}

function createSampleTtf() {
  // We construct a minimal 2-glyph TrueType font:
  // Glyph 0: .notdef (empty)
  // Glyph 1: 'A' (character code 65) with 1 triangle contour: (50, 0), (300, 700), (550, 0)
  // All tables 4-byte aligned.

  // 1. Table: 'head' (54 bytes)
  const headData = Buffer.alloc(54);
  headData.writeUInt32BE(0x00010000, 0); // version 1.0
  headData.writeUInt32BE(0x00010000, 4); // fontRevision 1.0
  headData.writeUInt32BE(0x00000000, 8); // checkSumAdjustment (0 for now)
  headData.writeUInt32BE(0x5f0f3cf5, 12); // magicNumber
  headData.writeUInt16BE(0x0003, 16); // flags
  headData.writeUInt16BE(1000, 18); // unitsPerEm = 1000
  // dates: 8 bytes created, 8 bytes modified = 16 bytes
  headData.writeInt16BE(0, 36); // xMin
  headData.writeInt16BE(0, 38); // yMin
  headData.writeInt16BE(600, 40); // xMax
  headData.writeInt16BE(700, 42); // yMax
  headData.writeUInt16BE(0, 44); // macStyle
  headData.writeUInt16BE(8, 46); // lowestRecPPEM
  headData.writeInt16BE(2, 48); // fontDirectionHint
  headData.writeInt16BE(0, 50); // indexToLocFormat: 0 = 16-bit offsets (div by 2)
  headData.writeInt16BE(0, 52); // glyphDataFormat

  // 2. Table: 'hhea' (36 bytes)
  const hheaData = Buffer.alloc(36);
  hheaData.writeUInt32BE(0x00010000, 0); // version 1.0
  hheaData.writeInt16BE(800, 4); // ascender
  hheaData.writeInt16BE(-200, 6); // descender
  hheaData.writeInt16BE(0, 8); // lineGap
  hheaData.writeUInt16BE(600, 10); // advanceWidthMax
  hheaData.writeInt16BE(0, 12); // minLeftSideBearing
  hheaData.writeInt16BE(0, 14); // minRightSideBearing
  hheaData.writeInt16BE(600, 16); // xMaxExtent
  hheaData.writeInt16BE(1, 18); // caretSlopeRise
  hheaData.writeInt16BE(0, 20); // caretSlopeRun
  hheaData.writeInt16BE(0, 22); // caretOffset
  hheaData.writeUInt16BE(2, 34); // numberOfHMetrics = 2

  // 3. Table: 'maxp' (32 bytes)
  const maxpData = Buffer.alloc(32);
  maxpData.writeUInt32BE(0x00010000, 0); // version 1.0
  maxpData.writeUInt16BE(2, 4); // numGlyphs = 2
  maxpData.writeUInt16BE(3, 6); // maxPoints = 3
  maxpData.writeUInt16BE(1, 8); // maxContours = 1

  // 4. Table: 'hmtx' (8 bytes: 2 metrics * 4 bytes)
  const hmtxData = Buffer.alloc(8);
  // glyph 0 (.notdef)
  hmtxData.writeUInt16BE(250, 0); // advanceWidth
  hmtxData.writeInt16BE(0, 2); // lsb
  // glyph 1 ('A')
  hmtxData.writeUInt16BE(600, 4); // advanceWidth
  hmtxData.writeInt16BE(50, 6); // lsb

  // 5. Table: 'glyf'
  // Glyph 0: length 0
  // Glyph 1:
  // numberOfContours = 1 (2 bytes)
  // xMin = 50, yMin = 0, xMax = 550, maxY = 700 (8 bytes)
  // endPtsOfContours[0] = 2 (2 bytes)
  // instructionLength = 0 (2 bytes)
  // flags: 3 points, all on-curve (1), x-short positive (2+16=18), y-short positive (4+32=36)
  // point 0: (50, 0)
  // point 1: dx = 250, dy = 700
  // point 2: dx = 250, dy = -700
  // Let's write simple 16-bit coordinates for clarity:
  // flags: [1, 1, 1] (3 bytes, flags: 1 on-curve, no byte compression)
  // xCoords: 50 (int16), 300-50 = 250 (int16), 550-300 = 250 (int16)
  // yCoords: 0 (int16), 700 (int16), -700 (int16)
  const glyfHeader = Buffer.alloc(14);
  glyfHeader.writeInt16BE(1, 0); // numberOfContours
  glyfHeader.writeInt16BE(50, 2); // xMin
  glyfHeader.writeInt16BE(0, 4); // yMin
  glyfHeader.writeInt16BE(550, 6); // xMax
  glyfHeader.writeInt16BE(700, 8); // maxY
  glyfHeader.writeUInt16BE(2, 10); // endPtsOfContours[0] = 2 (points 0, 1, 2)
  glyfHeader.writeUInt16BE(0, 12); // instructionLength = 0

  const glyfFlags = Buffer.from([1, 1, 1]); // 3 points, on-curve, non-compact coords
  const glyfCoords = Buffer.alloc(12);
  glyfCoords.writeInt16BE(50, 0); // x0
  glyfCoords.writeInt16BE(250, 2); // x1 (delta)
  glyfCoords.writeInt16BE(250, 4); // x2 (delta)
  glyfCoords.writeInt16BE(0, 6); // y0
  glyfCoords.writeInt16BE(700, 8); // y1 (delta)
  glyfCoords.writeInt16BE(-700, 10); // y2 (delta)

  const glyph1Data = Buffer.concat([glyfHeader, glyfFlags, glyfCoords]);
  const glyfData = glyph1Data; // glyph 0 is at offset 0 with 0 length

  // 6. Table: 'loca' (indexToLocFormat = 0, so 16-bit offset / 2)
  // numGlyphs = 2, so 3 entries: offset0=0, offset1=0, offset2=glyfData.length
  const locaData = Buffer.alloc(6);
  locaData.writeUInt16BE(0, 0); // glyph 0 offset = 0
  locaData.writeUInt16BE(0, 2); // glyph 1 offset = 0 (glyph 0 has length 0)
  locaData.writeUInt16BE(Math.ceil(glyfData.length / 2), 4); // glyph 2 offset

  // 7. Table: 'cmap' (Format 4 subtable mapping char 65 -> glyph 1)
  // subtable header: format=4, length=32, language=0, segCountX2=4, searchRange=4, entrySelector=1, rangeShift=0
  // endCode: [65, 0xFFFF] (4 bytes)
  // reservedPad: 0 (2 bytes)
  // startCode: [65, 0xFFFF] (4 bytes)
  // idDelta: [1 - 65 = -64, 1] (4 bytes)
  // idRangeOffset: [0, 0] (4 bytes)
  const cmapSub4 = Buffer.alloc(32);
  cmapSub4.writeUInt16BE(4, 0); // format
  cmapSub4.writeUInt16BE(32, 2); // length
  cmapSub4.writeUInt16BE(0, 4); // language
  cmapSub4.writeUInt16BE(4, 6); // segCountX2
  cmapSub4.writeUInt16BE(4, 8); // searchRange
  cmapSub4.writeUInt16BE(1, 10); // entrySelector
  cmapSub4.writeUInt16BE(0, 12); // rangeShift
  cmapSub4.writeUInt16BE(65, 14); // endCode[0]
  cmapSub4.writeUInt16BE(0xffff, 16); // endCode[1]
  cmapSub4.writeUInt16BE(0, 18); // reservedPad
  cmapSub4.writeUInt16BE(65, 20); // startCode[0]
  cmapSub4.writeUInt16BE(0xffff, 22); // startCode[1]
  cmapSub4.writeInt16BE(-64, 24); // idDelta[0] (65 + (-64) = 1)
  cmapSub4.writeInt16BE(1, 26); // idDelta[1]
  cmapSub4.writeUInt16BE(0, 28); // idRangeOffset[0]
  cmapSub4.writeUInt16BE(0, 30); // idRangeOffset[1]

  const cmapHeader = Buffer.alloc(12);
  cmapHeader.writeUInt16BE(0, 0); // version
  cmapHeader.writeUInt16BE(1, 2); // numSubtables = 1
  cmapHeader.writeUInt16BE(3, 4); // platformID = 3 (Windows)
  cmapHeader.writeUInt16BE(1, 6); // encodingID = 1 (Unicode BMP)
  cmapHeader.writeUInt32BE(12, 8); // subtable offset = 12

  const cmapData = Buffer.concat([cmapHeader, cmapSub4]);

  // Combine tables into SFNT structure
  const rawTables = [
    { tag: 'cmap', data: cmapData },
    { tag: 'glyf', data: glyfData },
    { tag: 'head', data: headData },
    { tag: 'hhea', data: hheaData },
    { tag: 'hmtx', data: hmtxData },
    { tag: 'loca', data: locaData },
    { tag: 'maxp', data: maxpData }
  ];

  // Sort tables alphabetically by tag per OpenType spec
  rawTables.sort((a, b) => a.tag.localeCompare(b.tag));

  const numTables = rawTables.length;
  const headerSize = 12 + numTables * 16;
  let currentOffset = headerSize;

  const tableHeaders = [];
  const tableBodies = [];

  for (const t of rawTables) {
    const alignedLen = align4(t.data.length);
    const paddedData = Buffer.alloc(alignedLen);
    t.data.copy(paddedData, 0);

    const checkSum = calculateTableChecksum(paddedData, 0, paddedData.length);

    const entry = Buffer.alloc(16);
    entry.write(t.tag, 0, 4, 'ascii');
    entry.writeUInt32BE(checkSum, 4);
    entry.writeUInt32BE(currentOffset, 8);
    entry.writeUInt32BE(t.data.length, 12);

    tableHeaders.push(entry);
    tableBodies.push(paddedData);
    currentOffset += alignedLen;
  }

  // SFNT Header
  const sfntHeader = Buffer.alloc(12);
  sfntHeader.writeUInt32BE(0x00010000, 0); // sfntVersion
  sfntHeader.writeUInt16BE(numTables, 4);
  sfntHeader.writeUInt16BE(64, 6); // searchRange
  sfntHeader.writeUInt16BE(2, 8); // entrySelector
  sfntHeader.writeUInt16BE(48, 10); // rangeShift

  return Buffer.concat([sfntHeader, ...tableHeaders, ...tableBodies]);
}

module.exports = {
  createSampleTtf
};
