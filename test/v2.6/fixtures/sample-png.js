/**
 * test/v2.6/fixtures/sample-png.js
 * 
 * Standalone PNG Binary Generator for Unit and Integration Testing
 * Generates valid and adversarial PNG byte buffers with zero external dependencies.
 */

'use strict';

const zlib = require('node:zlib');

// CRC32 table
const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC_TABLE[n] = c >>> 0;
}

function crc32(buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buffer.length; i++) {
    c = CRC_TABLE[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcTarget = Buffer.concat([typeBuf, data]);
  const crcVal = crc32(crcTarget);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

/**
 * Creates a valid RGBA PNG buffer with specified filter types per scanline.
 */
function createPngRgba(width, height, pixelFn, filterTypes = null) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR data (13 bytes)
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8-bit depth
  ihdrData[9] = 6; // RGBA color type
  ihdrData[10] = 0; // deflate
  ihdrData[11] = 0; // standard filter
  ihdrData[12] = 0; // non-interlaced

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Generate raw uncompressed scanlines
  const rowBytes = width * 4;
  const rawScanlines = Buffer.alloc(height * (1 + rowBytes));
  let offset = 0;

  const prevRow = Buffer.alloc(rowBytes);

  for (let y = 0; y < height; y++) {
    const filter = filterTypes && filterTypes[y] !== undefined ? filterTypes[y] : 0;
    rawScanlines[offset++] = filter;

    const currentRow = Buffer.alloc(rowBytes);
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x, y);
      const pxOff = x * 4;
      currentRow[pxOff] = r;
      currentRow[pxOff + 1] = g;
      currentRow[pxOff + 2] = b;
      currentRow[pxOff + 3] = a;
    }

    // Apply forward filter if requested
    for (let i = 0; i < rowBytes; i++) {
      const orig = currentRow[i];
      const a = i >= 4 ? currentRow[i - 4] : 0;
      const b = prevRow[i];
      const c = i >= 4 ? prevRow[i - 4] : 0;

      let filteredByte = orig;
      if (filter === 1) { // Sub
        filteredByte = (orig - a) & 0xff;
      } else if (filter === 2) { // Up
        filteredByte = (orig - b) & 0xff;
      } else if (filter === 3) { // Average
        filteredByte = (orig - Math.floor((a + b) / 2)) & 0xff;
      } else if (filter === 4) { // Paeth
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        filteredByte = (orig - pr) & 0xff;
      }

      rawScanlines[offset++] = filteredByte;
    }

    currentRow.copy(prevRow);
  }

  const idatCompressed = zlib.deflateSync(rawScanlines);
  const idatChunk = createChunk('IDAT', idatCompressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

/**
 * Creates a minimal 1x1 RGBA PNG buffer.
 */
function create1x1Png(r = 255, g = 0, b = 0, a = 255) {
  return createPngRgba(1, 1, () => [r, g, b, a], [0]);
}

/**
 * Creates a 4x4 RGBA PNG with 5 distinct scanline filters (None, Sub, Up, Average, Paeth).
 */
function createMultiFilterPng() {
  return createPngRgba(
    4,
    5,
    (x, y) => [x * 50 + 10, y * 40 + 20, (x + y) * 20, 255],
    [0, 1, 2, 3, 4] // tests all 5 filters
  );
}

module.exports = {
  createPngRgba,
  create1x1Png,
  createMultiFilterPng,
  createChunk
};
