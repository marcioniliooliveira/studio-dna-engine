/**
 * docs/research/v2.6/reference/png-codec.js
 * 
 * Studio DNA PRO v2.6 — Zero-Dependency Core Reference Micro-Engine
 * Feature: Native PNG RGBA Decoder & Saliency Oracle (R6.3, Pillar 8)
 * 
 * Standards & Mathematics:
 * - ISO/IEC 15948:2004 / W3C Portable Network Graphics (PNG) Specification (Second Edition)
 * - Complete 5 Scanline Filter Defiltering (None, Sub, Up, Average, Paeth per Equation 26)
 * - Built-in decompression via node:zlib (inflateSync)
 * - 42-Map Itti-Koch biological vision lateral competition operator N(M) per Equation 27
 * - Saliency metrics: CTA prominence s_CTA >= 0.18 and distraction ratio R_distraction <= 0.35 (Eq. 28, 29)
 * - Zero external dependencies (no pngjs or image-size required)
 */

'use strict';

const zlib = require('node:zlib');

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

/**
 * Paeth Predictor algorithm per PNG specification (Equation 26).
 * Computes base linear predictor p = a + b - c and returns the nearest neighbor.
 * 
 * @param {number} a Left byte
 * @param {number} b Above byte
 * @param {number} c Upper-left byte
 * @returns {number} Predicted byte value
 */
function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

/**
 * Decodes a binary PNG buffer into an uncompressed RGBA pixel array.
 * 
 * @param {Buffer|Uint8Array} buffer Input binary PNG data
 * @returns {{ width: number, height: number, data: Uint8Array, channels: number, colorType: number }}
 */
function decodePng(buffer) {
  if (!Buffer.isBuffer(buffer)) {
    buffer = Buffer.from(buffer);
  }
  if (buffer.length < 8 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error('Invalid PNG signature');
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idatChunks = [];

  while (offset < buffer.length) {
    if (offset + 8 > buffer.length) break;
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString('ascii');
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    offset += 8 + length + 4; // skip length (4), type (4), data (length), CRC (4)

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      if (bitDepth !== 8) {
        throw new Error(`Unsupported bit depth: ${bitDepth}. Only 8-bit supported.`);
      }
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      break;
    }
  }

  if (width === 0 || height === 0) {
    throw new Error('Missing or invalid IHDR in PNG');
  }

  // Channels count based on color type:
  // 0: Grayscale (1), 2: RGB (3), 3: Indexed (1), 4: Gray+Alpha (2), 6: RGBA (4)
  let channels = 4;
  if (colorType === 0) channels = 1;
  else if (colorType === 2) channels = 3;
  else if (colorType === 6) channels = 4;
  else {
    throw new Error(`Unsupported color type: ${colorType}`);
  }

  const compressedData = Buffer.concat(idatChunks);
  const decompressed = zlib.inflateSync(compressedData);

  const bytesPerPixel = channels;
  const rowBytes = width * bytesPerPixel;
  const expectedLength = height * (1 + rowBytes);

  if (decompressed.length < expectedLength) {
    throw new Error(`Decompressed data length mismatch: expected ${expectedLength}, got ${decompressed.length}`);
  }

  const rawPixels = new Uint8Array(width * height * 4);
  let srcOffset = 0;
  const priorRow = new Uint8Array(rowBytes);
  const currentRow = new Uint8Array(rowBytes);

  for (let y = 0; y < height; y++) {
    const filterType = decompressed[srcOffset++];

    for (let x = 0; x < rowBytes; x++) {
      const filt = decompressed[srcOffset++];
      const a = x >= bytesPerPixel ? currentRow[x - bytesPerPixel] : 0;
      const b = priorRow[x];
      const c = x >= bytesPerPixel ? priorRow[x - bytesPerPixel] : 0;

      let recon = 0;
      switch (filterType) {
        case 0: // None
          recon = filt;
          break;
        case 1: // Sub
          recon = (filt + a) & 0xff;
          break;
        case 2: // Up
          recon = (filt + b) & 0xff;
          break;
        case 3: // Average
          recon = (filt + Math.floor((a + b) / 2)) & 0xff;
          break;
        case 4: // Paeth
          recon = (filt + paethPredictor(a, b, c)) & 0xff;
          break;
        default:
          throw new Error(`Unknown PNG filter type: ${filterType}`);
      }
      currentRow[x] = recon;
    }

    // Convert row data into standard 4-channel RGBA output
    for (let x = 0; x < width; x++) {
      const dstIdx = (y * width + x) * 4;
      if (channels === 4) {
        rawPixels[dstIdx] = currentRow[x * 4];
        rawPixels[dstIdx + 1] = currentRow[x * 4 + 1];
        rawPixels[dstIdx + 2] = currentRow[x * 4 + 2];
        rawPixels[dstIdx + 3] = currentRow[x * 4 + 3];
      } else if (channels === 3) {
        rawPixels[dstIdx] = currentRow[x * 3];
        rawPixels[dstIdx + 1] = currentRow[x * 3 + 1];
        rawPixels[dstIdx + 2] = currentRow[x * 3 + 2];
        rawPixels[dstIdx + 3] = 255;
      } else if (channels === 1) {
        const val = currentRow[x];
        rawPixels[dstIdx] = val;
        rawPixels[dstIdx + 1] = val;
        rawPixels[dstIdx + 2] = val;
        rawPixels[dstIdx + 3] = 255;
      }
    }

    priorRow.set(currentRow);
  }

  return {
    width,
    height,
    data: rawPixels,
    channels: 4,
    colorType
  };
}

/**
 * Lateral competition operator N(M) per Equation 27:
 * N(M) = M * (M_max - m_mean)^2
 * Suppresses background clutter while amplifying isolated peak conspicuity.
 * 
 * @param {Float32Array|Array<number>} map Raw feature conspicuity map
 * @param {number} width Map width
 * @param {number} height Map height
 * @returns {Float32Array} Competed feature map
 */
function applyLateralCompetition(map, width, height) {
  let max = -Infinity;
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    if (map[i] > max) max = map[i];
    sum += map[i];
  }
  const mean = sum / (map.length || 1);
  const factor = Math.pow(Math.max(0, max - mean), 2);

  const result = new Float32Array(map.length);
  for (let i = 0; i < map.length; i++) {
    result[i] = map[i] * factor;
  }
  return result;
}

/**
 * Computes biological visual saliency metrics per Equations 28 & 29:
 * - CTA Optical Prominence Score: s_CTA = integral(CTA) / integral(Total) >= 0.18
 * - Visual Distraction Ratio: R_distraction = integral(NonFunctional) / integral(Functional) <= 0.35
 * 
 * @param {Float32Array} saliencyMap Competed saliency map
 * @param {number} width Image width
 * @param {number} height Image height
 * @param {{ minX: number, minY: number, maxX: number, maxY: number }} ctaRect Bounding box of primary CTA
 * @param {{ minX: number, minY: number, maxX: number, maxY: number }} functionalRect Bounding box of functional zone
 * @returns {{ sCta: number, rDistraction: number, totalSaliency: number }}
 */
function computeSaliencyMetrics(saliencyMap, width, height, ctaRect, functionalRect) {
  let totalSaliency = 0;
  let ctaSaliency = 0;
  let functionalSaliency = 0;
  let nonFunctionalSaliency = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const val = saliencyMap[idx] || 0;
      totalSaliency += val;

      const inCta = ctaRect && x >= ctaRect.minX && x <= ctaRect.maxX && y >= ctaRect.minY && y <= ctaRect.maxY;
      if (inCta) ctaSaliency += val;

      const inFunc = functionalRect && x >= functionalRect.minX && x <= functionalRect.maxX && y >= functionalRect.minY && y <= functionalRect.maxY;
      if (inFunc) {
        functionalSaliency += val;
      } else {
        nonFunctionalSaliency += val;
      }
    }
  }

  const sCta = totalSaliency > 0 ? (ctaSaliency / totalSaliency) : 0;
  const rDistraction = functionalSaliency > 0 ? (nonFunctionalSaliency / functionalSaliency) : 0;

  return {
    sCta,
    rDistraction,
    totalSaliency
  };
}

module.exports = {
  paethPredictor,
  decodePng,
  applyLateralCompetition,
  computeSaliencyMetrics
};
