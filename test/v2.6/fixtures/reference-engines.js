/**
 * test/v2.6/fixtures/reference-engines.js
 * 
 * Studio DNA PRO v2.6 — Zero-Dependency Core Reference Micro-Engines
 * Strictly derived from W3C standards and authoritative architectural specifications:
 * - spec_pillars_6_7_8.md (Pillars 6, 7, 8)
 * - spec_pillars_9_10_11_microengines.md (Pillars 9, 10, 11, R6.1-R6.4)
 * - Node.js 24+ CommonJS with zero external dependencies outside package-lock.json
 */

'use strict';

const zlib = require('node:zlib');

// ============================================================================
// 1. R6.1: Pure JS 2D R-Tree (SpatialRTree) & Typographic Energy
// ============================================================================

class SpatialRTree {
  constructor(maxEntries = 9) {
    this.maxEntries = Math.max(4, maxEntries);
    this.minEntries = Math.max(2, Math.ceil(this.maxEntries * 0.4));
    this.root = { leaf: true, entries: [], bbox: null };
  }

  static bbox(minX, minY, maxX, maxY) {
    return { minX, minY, maxX, maxY };
  }

  static intersects(a, b) {
    return (
      a.minX <= b.maxX &&
      a.maxX >= b.minX &&
      a.minY <= b.maxY &&
      a.maxY >= b.minY
    );
  }

  static union(a, b) {
    return {
      minX: Math.min(a.minX, b.minX),
      minY: Math.min(a.minY, b.minY),
      maxX: Math.max(a.maxX, b.maxX),
      maxY: Math.max(a.maxY, b.maxY)
    };
  }

  static area(b) {
    return Math.max(0, b.maxX - b.minX) * Math.max(0, b.maxY - b.minY);
  }

  static calcBBox(node) {
    if (!node.entries || node.entries.length === 0) return null;
    const getBox = (e) => e.bbox || e;
    let b = { ...getBox(node.entries[0]) };
    for (let i = 1; i < node.entries.length; i++) {
      b = SpatialRTree.union(b, getBox(node.entries[i]));
    }
    return b;
  }

  insert(item) {
    if (item.minX === undefined || item.minY === undefined ||
        item.maxX === undefined || item.maxY === undefined) {
      throw new Error('SpatialRTree.insert requires { minX, minY, maxX, maxY }');
    }
    const minX = Math.min(item.minX, item.maxX);
    const minY = Math.min(item.minY, item.maxY);
    const maxX = Math.max(item.minX, item.maxX);
    const maxY = Math.max(item.minY, item.maxY);

    const normalized = {
      minX,
      minY,
      maxX,
      maxY,
      id: item.id,
      data: item.data !== undefined ? item.data : { ...item, minX, minY, maxX, maxY }
    };

    const path = [];
    let node = this.root;

    // 1. ChooseSubtree
    while (!node.leaf) {
      path.push(node);
      let bestChild = node.entries[0];
      let bestEnlargement = Infinity;
      let bestArea = Infinity;

      for (let i = 0; i < node.entries.length; i++) {
        const child = node.entries[i];
        const unionBox = SpatialRTree.union(child.bbox, normalized);
        const childArea = SpatialRTree.area(child.bbox);
        const enlargement = SpatialRTree.area(unionBox) - childArea;

        if (enlargement < bestEnlargement || (enlargement === bestEnlargement && childArea < bestArea)) {
          bestEnlargement = enlargement;
          bestArea = childArea;
          bestChild = child;
        }
      }
      node = bestChild;
    }

    // 2. Insert into leaf
    node.entries.push(normalized);
    node.bbox = SpatialRTree.calcBBox(node);

    // 3. Handle split if overflow
    if (node.entries.length > this.maxEntries) {
      this._split(path, node);
    } else {
      // Adjust bounding boxes upwards
      for (let i = path.length - 1; i >= 0; i--) {
        path[i].bbox = SpatialRTree.calcBBox(path[i]);
      }
    }
  }

  _split(path, node) {
    const [group1, group2] = this._quadraticSplit(node.entries);
    node.entries = group1;
    node.bbox = SpatialRTree.calcBBox(node);

    const newNode = {
      leaf: node.leaf,
      entries: group2,
      bbox: null
    };
    newNode.bbox = SpatialRTree.calcBBox(newNode);

    if (node === this.root) {
      // Create new root
      this.root = {
        leaf: false,
        entries: [node, newNode],
        bbox: SpatialRTree.union(node.bbox, newNode.bbox)
      };
      return;
    }

    const parent = path[path.length - 1];
    parent.entries.push(newNode);
    parent.bbox = SpatialRTree.calcBBox(parent);

    if (parent.entries.length > this.maxEntries) {
      this._split(path.slice(0, -1), parent);
    } else {
      for (let i = path.length - 2; i >= 0; i--) {
        path[i].bbox = SpatialRTree.calcBBox(path[i]);
      }
    }
  }

  _quadraticSplit(entries) {
    let maxDeadSpace = -Infinity;
    let seed1 = 0;
    let seed2 = 1;

    // Pick Seeds
    for (let i = 0; i < entries.length - 1; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const u = SpatialRTree.union(entries[i].bbox || entries[i], entries[j].bbox || entries[j]);
        const deadSpace = SpatialRTree.area(u) - SpatialRTree.area(entries[i].bbox || entries[i]) - SpatialRTree.area(entries[j].bbox || entries[j]);
        if (deadSpace > maxDeadSpace) {
          maxDeadSpace = deadSpace;
          seed1 = i;
          seed2 = j;
        }
      }
    }

    const group1 = [entries[seed1]];
    const group2 = [entries[seed2]];
    let bbox1 = { ...(entries[seed1].bbox || entries[seed1]) };
    let bbox2 = { ...(entries[seed2].bbox || entries[seed2]) };

    const remaining = entries.filter((_, idx) => idx !== seed1 && idx !== seed2);

    while (remaining.length > 0) {
      if (group1.length + remaining.length === this.minEntries) {
        group1.push(...remaining);
        break;
      }
      if (group2.length + remaining.length === this.minEntries) {
        group2.push(...remaining);
        break;
      }

      const item = remaining.pop();
      const itemBox = item.bbox || item;
      const u1 = SpatialRTree.union(bbox1, itemBox);
      const u2 = SpatialRTree.union(bbox2, itemBox);
      const d1 = SpatialRTree.area(u1) - SpatialRTree.area(bbox1);
      const d2 = SpatialRTree.area(u2) - SpatialRTree.area(bbox2);

      if (d1 < d2) {
        group1.push(item);
        bbox1 = u1;
      } else if (d2 < d1) {
        group2.push(item);
        bbox2 = u2;
      } else {
        if (group1.length <= group2.length) {
          group1.push(item);
          bbox1 = u1;
        } else {
          group2.push(item);
          bbox2 = u2;
        }
      }
    }

    return [group1, group2];
  }

  load(items) {
    if (!Array.isArray(items)) return;
    for (const item of items) {
      this.insert(item);
    }
  }

  search(bbox) {
    if (!bbox) return [];
    const normalized = {
      minX: Math.min(bbox.minX, bbox.maxX),
      minY: Math.min(bbox.minY, bbox.maxY),
      maxX: Math.max(bbox.minX, bbox.maxX),
      maxY: Math.max(bbox.minY, bbox.maxY)
    };

    const results = [];
    const stack = [this.root];

    while (stack.length > 0) {
      const node = stack.pop();
      if (!node.bbox || !SpatialRTree.intersects(node.bbox, normalized)) {
        continue;
      }
      for (let i = 0; i < node.entries.length; i++) {
        const entry = node.entries[i];
        const entryBox = entry.bbox || entry;
        if (SpatialRTree.intersects(entryBox, normalized)) {
          if (node.leaf) {
            results.push(entry.data !== undefined ? entry.data : entry);
          } else {
            stack.push(entry);
          }
        }
      }
    }

    return results;
  }

  collides(bbox) {
    return this.search(bbox).length > 0;
  }

  all() {
    const results = [];
    const stack = [this.root];
    while (stack.length > 0) {
      const node = stack.pop();
      if (node.leaf) {
        for (const entry of node.entries) {
          results.push(entry.data !== undefined ? entry.data : entry);
        }
      } else {
        for (const entry of node.entries) {
          stack.push(entry);
        }
      }
    }
    return results;
  }
}

// Typographic energy function Eq. 24
function computeTypographicEnergy(fontSize, fontWeight, area, width, height) {
  const ws = 0.45;
  const ww = 0.25;
  const wa = 0.20;
  const wr = 0.10;
  const sizeRatio = fontSize / 16.0;
  const weightRatio = fontWeight / 400.0;
  const areaTerm = Math.log(1.0 + Math.max(0, area));
  const aspectTerm = height > 0 ? (width / height) : 1.0;

  return ws * (sizeRatio * sizeRatio) +
         ww * weightRatio +
         wa * areaTerm +
         wr * aspectTerm;
}

// Subtree Isomorphism CV area Eq. 25
function computeAreaCV(areas) {
  if (!areas || areas.length === 0) return 0;
  const mean = areas.reduce((s, a) => s + a, 0) / areas.length;
  if (mean === 0) return 0;
  const variance = areas.reduce((s, a) => s + Math.pow(a - mean, 2), 0) / areas.length;
  const std = Math.sqrt(variance);
  return std / mean;
}

// ============================================================================
// 2. R6.2: PostCSS Selector AST & Donut Scope Validator
// ============================================================================

function parseSelectorAst(selectorString) {
  if (!selectorString || typeof selectorString !== 'string') {
    return { type: 'selector_list', selectors: [] };
  }

  // Strip CSS comments
  const clean = selectorString.replace(/\/\*[\s\S]*?\*\//g, '').trim();
  if (!clean) return { type: 'selector_list', selectors: [] };

  const rawSelectors = clean.split(',').map(s => s.trim()).filter(Boolean);
  const parsedSelectors = [];

  for (const sel of rawSelectors) {
    const tokens = [];
    // Tokenize complex selector into compounds and combinators ('>', '+', '~', ' ')
    let current = '';
    let inBracket = 0;

    for (let i = 0; i < sel.length; i++) {
      const char = sel[i];
      if (char === '[') inBracket++;
      else if (char === ']') inBracket = Math.max(0, inBracket - 1);

      if (inBracket === 0 && (char === '>' || char === '+' || char === '~')) {
        if (current.trim()) tokens.push({ type: 'compound', value: current.trim() });
        tokens.push({ type: 'combinator', value: char });
        current = '';
      } else if (inBracket === 0 && /\s/.test(char)) {
        // Lookahead to see if next non-whitespace is combinator
        let j = i;
        while (j < sel.length && /\s/.test(sel[j])) j++;
        if (j < sel.length && (sel[j] === '>' || sel[j] === '+' || sel[j] === '~')) {
          if (current.trim()) tokens.push({ type: 'compound', value: current.trim() });
          current = '';
          i = j - 1;
        } else {
          if (current.trim()) {
            tokens.push({ type: 'compound', value: current.trim() });
            tokens.push({ type: 'combinator', value: ' ' });
            current = '';
          }
          i = j - 1;
        }
      } else {
        current += char;
      }
    }
    if (current.trim()) {
      tokens.push({ type: 'compound', value: current.trim() });
    }

    parsedSelectors.push({
      raw: sel,
      tokens
    });
  }

  return {
    type: 'selector_list',
    selectors: parsedSelectors
  };
}

function validateDonutSelector(selectorString, boundaryAttr = 'data-kinetic-slot') {
  const ast = parseSelectorAst(selectorString);
  const violations = [];

  // Match [data-kinetic-slot] with any spacing around attribute name and operators
  const boundaryRegex = new RegExp(`\\[\\s*${boundaryAttr}\\s*(?:[=\\~\\|\\^\\$\\*]?=\\s*[^\\]]*)?\\s*\\]`);

  for (const sel of ast.selectors) {
    // If the entire selector is guarded by :not([data-kinetic-slot] *), it's a negative guard
    if (sel.raw.includes(`:not([${boundaryAttr}] *)`) || sel.raw.includes(`:not([${boundaryAttr}])`)) {
      continue;
    }

    const tokens = sel.tokens;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'compound' && boundaryRegex.test(tokens[i].value)) {
        // If compound is inside :not(...), it is an exclusion, not a piercing rule
        if (tokens[i].value.startsWith(':not(')) continue;

        // Found boundary token. Check if followed by descendant or child combinator
        if (i + 1 < tokens.length) {
          const nextTok = tokens[i + 1];
          if (nextTok.type === 'combinator' && (nextTok.value === ' ' || nextTok.value === '>')) {
            // Check if there is a subsequent compound targeting inside the slot
            if (i + 2 < tokens.length && tokens[i + 2].type === 'compound') {
              violations.push(
                `Donut boundary violation: '${sel.raw}' penetrates slot interior via combinator '${nextTok.value}' into '${tokens[i + 2].value}'`
              );
            }
          }
        }
      }
    }
  }

  return {
    compliant: violations.length === 0,
    violations
  };
}

function validateDonutScopeInvariants(cssContent, boundaryAttr = 'data-kinetic-slot') {
  const violations = [];
  const cleanCss = (cssContent || '').replace(/\/\*[\s\S]*?\*\//g, '');

  // Extract rule selectors using block matching
  const rulePattern = /([^{}]+)\{/g;
  let match;
  while ((match = rulePattern.exec(cleanCss)) !== null) {
    const rawSelector = match[1].trim();
    if (rawSelector.startsWith('@')) continue; // Skip @media, @keyframes, @scope definitions

    const validation = validateDonutSelector(rawSelector, boundaryAttr);
    if (!validation.compliant) {
      violations.push(...validation.violations);
    }
  }

  return {
    compliant: violations.length === 0,
    violations
  };
}

// ============================================================================
// 3. R6.3: Native PNG RGBA Decoder & Saliency Oracle
// ============================================================================

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

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
    offset += 8 + length + 4; // skip length, type, data, crc

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

  // Channels count
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

    // Convert row into RGBA output
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

// Lateral competition operator Eq. 27
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

// Saliency metrics Eq. 28, 29
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

// ============================================================================
// 4. R6.4: Binary TrueType Slug Font Compiler
// ============================================================================

class SlugFontCompiler {
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

    // Parse 'head'
    if (this.tables['head']) {
      const headOff = this.tables['head'].offset;
      this.unitsPerEm = this.view.getUint16(headOff + 18, false);
      this.indexToLocFormat = this.view.getInt16(headOff + 50, false);
    }

    // Parse 'maxp'
    if (this.tables['maxp']) {
      const maxpOff = this.tables['maxp'].offset;
      this.numGlyphs = this.view.getUint16(maxpOff + 4, false);
    }

    // Parse 'loca'
    if (this.tables['loca']) {
      const locaOff = this.tables['loca'].offset;
      this.glyphOffsets = [];
      for (let i = 0; i <= this.numGlyphs; i++) {
        if (this.indexToLocFormat === 0) {
          this.glyphOffsets.push(this.view.getUint16(locaOff + i * 2, false) * 2);
        } else {
          this.glyphOffsets.push(this.view.getUint32(locaOff + i * 4, false));
        }
      }
    }
  }

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

  compileGlyph(charCode) {
    const glyphIndex = this.getGlyphIndexForChar(charCode);
    const glyphStart = this.glyphOffsets[glyphIndex];
    const glyphEnd = this.glyphOffsets[glyphIndex + 1];

    if (!this.tables['glyf'] || glyphStart === glyphEnd) {
      // Empty glyph (e.g. space)
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

    // If compound or simple, extract contours
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

        // De Casteljau / on-curve point midpoint synthesis
        for (let i = 0; i < cPoints.length; i++) {
          const curr = cPoints[i];
          const next = cPoints[(i + 1) % cPoints.length];
          if (curr.onCurve && !next.onCurve) {
            const nextNext = cPoints[(i + 2) % cPoints.length];
            if (nextNext.onCurve) {
              curves.push([curr.x, curr.y, next.x, next.y, nextNext.x, nextNext.y, 0]);
            } else {
              const midX = (next.x + nextNext.x) / 2;
              const midY = (next.y + nextNext.y) / 2;
              curves.push([curr.x, curr.y, next.x, next.y, midX, midY, 0]);
            }
          }
        }
        startIdx = endIdx + 1;
      }
    }

    // Partition into 8 bands
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

// ============================================================================
// 5. Pillars 9 & 10: OKLCH Synthesis & APCA 0.0.98G-4g
// ============================================================================

// sRGB to OKLCH Forward Transformation (Eq. 1 - 5)
function sRGBToOklch(r, g, b) {
  // Linearize sRGB
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const rLin = lin(r / 255.0);
  const gLin = lin(g / 255.0);
  const bLin = lin(b / 255.0);

  // M1: linear sRGB -> LMS
  const l = 0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin;
  const m = 0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin;
  const s = 0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin;

  // Non-linear cube root
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  // M2: LMS -> Oklab
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const bOklab = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  // Oklab -> OKLCH
  let C = Math.hypot(a, bOklab);
  let h = (Math.atan2(bOklab, a) * 180.0) / Math.PI;
  if (h < 0) h += 360.0;
  if (C < 1e-6) {
    C = 0.0;
    h = 0.0; // achromatic
  }

  return { L, C, h };
}

// OKLCH to sRGB Inverse Transformation (Eq. 6 - 10)
function oklchToSRGB(L, C, h) {
  const hRad = (h * Math.PI) / 180.0;
  const a = C * Math.cos(hRad);
  const bOklab = C * Math.sin(hRad);

  // M2^-1: Oklab -> LMS
  const l_ = L + 0.3963377774 * a + 0.2158037573 * bOklab;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bOklab;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * bOklab;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  // M1^-1: LMS -> linear sRGB
  const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  // Gamma encode
  const encode = (c) =>
    c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(0, c), 1.0 / 2.4) - 0.055;

  const rClamped = Math.max(0, Math.min(1, encode(rLin)));
  const gClamped = Math.max(0, Math.min(1, encode(gLin)));
  const bClamped = Math.max(0, Math.min(1, encode(bLin)));

  const rByte = Math.round(rClamped * 255.0);
  const gByte = Math.round(gClamped * 255.0);
  const bByte = Math.round(bClamped * 255.0);

  const toHex = (n) => n.toString(16).padStart(2, '0');
  const hex = `#${toHex(rByte)}${toHex(gByte)}${toHex(bByte)}`;

  return { r: rByte, g: gByte, b: bByte, hex };
}

function parseColorToRgb(color) {
  if (typeof color === 'string') {
    let hex = color.trim().replace('#', '');
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }
  if (Array.isArray(color)) {
    return { r: color[0], g: color[1], b: color[2] };
  }
  return color;
}

// APCA 0.0.98G-4g Contrast Engine (Eq. 11 - 14b)
function calcAPCA(textColor, backgroundColor) {
  const txt = parseColorToRgb(textColor);
  const bg = parseColorToRgb(backgroundColor);

  // Linearize
  const lin = (c) => Math.pow(c / 255.0, 2.4);
  const rTxt = lin(txt.r), gTxt = lin(txt.g), bTxt = lin(txt.b);
  const rBg = lin(bg.r), gBg = lin(bg.g), bBg = lin(bg.b);

  // Photopic luminance Y (Eq. 11)
  const yTxt = 0.2126729 * rTxt + 0.7151522 * gTxt + 0.0721750 * bTxt;
  const yBg = 0.2126729 * rBg + 0.7151522 * gBg + 0.0721750 * bBg;

  // Black-level soft clamp (Eq. 12)
  const clampY = (y) => (y > 0.022 ? y : y + Math.pow(0.022 - y, 1.414));
  const yTxtClamped = clampY(yTxt);
  const yBgClamped = clampY(yBg);

  if (Math.abs(yBgClamped - yTxtClamped) < 0.0005) {
    return 0.0;
  }

  let sApca = 0.0;
  let Lc = 0.0;

  if (yBgClamped >= yTxtClamped) {
    // Normal polarity (dark text on light bg)
    sApca = (Math.pow(yBgClamped, 0.56) - Math.pow(yTxtClamped, 0.57)) * 1.14;
    Lc = sApca < 0.1 ? 0.0 : (sApca - 0.027) * 100.0;
  } else {
    // Reverse polarity (light text on dark bg)
    sApca = (Math.pow(yBgClamped, 0.65) - Math.pow(yTxtClamped, 0.62)) * 1.14;
    Lc = Math.abs(sApca) < 0.1 ? 0.0 : (sApca + 0.027) * 100.0;
  }

  return Lc;
}

// Monotonic binary search for target APCA contrast (Theorem 2)
function searchMonotonicContrast(bgColor, targetLc, role = 'body') {
  const bg = parseColorToRgb(bgColor);
  const bgOklch = sRGBToOklch(bg.r, bg.g, bg.b);

  let low = 0.0;
  let high = 1.0;
  let bestColor = null;
  let bestDiff = Infinity;

  // In dark mode (reverse polarity), target text is lighter
  for (let iter = 0; iter < 24; iter++) {
    const midL = (low + high) / 2.0;
    const candidate = oklchToSRGB(midL, 0.02, bgOklch.h);
    const score = Math.abs(calcAPCA(candidate.hex, bgColor));

    const diff = Math.abs(score - targetLc);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestColor = candidate;
    }

    if (score < targetLc) {
      low = midL; // Need more lightness
    } else {
      high = midL; // Can afford less lightness
    }
  }

  return bestColor;
}

// OLS Fluid scaling regressor
function calculateFluidScale(viewports, sizes) {
  // viewports: [390, 768, 1440], sizes: [24, 32, 48]
  const n = viewports.length;
  if (n < 2) return `clamp(${sizes[0]}px, ${sizes[0]}px, ${sizes[0]}px)`;

  const xMean = viewports.reduce((s, v) => s + v, 0) / n;
  const yMean = sizes.reduce((s, v) => s + v, 0) / n;

  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (viewports[i] - xMean) * (sizes[i] - yMean);
    den += Math.pow(viewports[i] - xMean, 2);
  }

  const slope = den === 0 ? 0 : num / den;
  const intercept = yMean - slope * xMean;

  const vwVal = (slope * 100).toFixed(3);
  const pxVal = intercept.toFixed(2);
  const minSize = Math.min(...sizes);
  const maxSize = Math.max(...sizes);

  return `clamp(${minSize}px, ${vwVal}vw + ${pxVal}px, ${maxSize}px)`;
}

// Lexical expansion damping Eq. 9
function applyLexicalDamping(baseSize, originalLen, newLen) {
  if (!originalLen || !newLen || newLen <= originalLen) return baseSize;
  const kappa = Math.pow(originalLen / newLen, 0.65);
  const damped = baseSize * kappa;
  return Math.max(12.0, damped); // 12px floor
}

// ============================================================================
// 6. Pillar 7: UniversalScrollBus & Sub-Pixel NDC Projection
// ============================================================================

class UniversalScrollBus {
  constructor(options = {}) {
    this.vHeight = options.viewportHeight || 900;
    this.muExpand = options.muExpand !== undefined ? options.muExpand : 1.0;
    this.muHold = options.muHold !== undefined ? options.muHold : 2.5;
    this.muExit = options.muExit !== undefined ? options.muExit : 1.0;
    this.alphaV = options.alphaVelocity !== undefined ? options.alphaVelocity : 0.3;

    this.mIn = this.muExpand * this.vHeight;
    this.mHold = this.muHold * this.vHeight;
    this.mOut = this.muExit * this.vHeight;

    this.t1 = options.prePinDistance || 0;
    this.t2 = this.t1 + this.mIn;
    this.t3 = this.t2 + this.mHold;
    this.t4 = this.t3 + this.mOut;
    this.totalTravel = this.t4;

    this.prevScroll = 0;
    this.prevVelocity = 0;
  }

  calculatePhases(s, dt = 16.67) {
    // 1. Normalized Portal Expansion Progress (Eq. 7)
    let pPortal = 0;
    if (s < this.t1) {
      pPortal = 0;
    } else if (s < this.t2) {
      pPortal = this.mIn > 0 ? (s - this.t1) / this.mIn : 1.0;
    } else if (s <= this.t3) {
      pPortal = 1.0;
    } else if (s <= this.t4) {
      pPortal = this.mOut > 0 ? 1.0 - (s - this.t3) / this.mOut : 0;
    } else {
      pPortal = 0;
    }

    // 2. Normalized Ribbon Scroll Progress (Eq. 8)
    let pRibbon = 0;
    if (s < this.t2) {
      pRibbon = 0;
    } else if (s <= this.t3) {
      pRibbon = this.mHold > 0 ? (s - this.t2) / this.mHold : 1.0;
    } else {
      pRibbon = 1.0;
    }

    // 3. Discrete Phase (Eq. 9)
    let phase = 'IDLE';
    if (s < this.t1) phase = 'IDLE';
    else if (s < this.t2) phase = 'PORTAL_EXPAND';
    else if (s <= this.t3) phase = 'RIBBON_BROWSE';
    else if (s <= this.t4) phase = 'PORTAL_EXIT';
    else phase = 'RESUME';

    // 4. Velocity with EMA (Eq. 10a, 10b)
    const vRaw = dt > 0 ? (s - this.prevScroll) / dt : 0;
    const velocity = this.alphaV * vRaw + (1 - this.alphaV) * this.prevVelocity;

    this.prevScroll = s;
    this.prevVelocity = velocity;

    return {
      pPortal: Math.min(1.0, Math.max(0.0, pPortal)),
      pRibbon: Math.min(1.0, Math.max(0.0, pRibbon)),
      phase,
      velocity
    };
  }
}

// Sub-pixel NDC-to-Viewport projection (Eq. 12 - 25)
function evaluateSheetCpuTwin(x, y, z, params = {}) {
  const {
    u_sheetW = 22.0,
    u_sheetD = 3.2,
    u_sheetT = 0.9,
    u_sheetC = 1.0,
    u_sheetP = 1.0,
    u_sheetV = 0.0
  } = params;

  let wx = x;
  let wy = y;
  let wz = z;

  // Normalized coordinate q (Eq. 14)
  const q = (wx / Math.max(u_sheetW, 1e-4)) * u_sheetT - 0.2;

  // Longitudinal shape and slope (Eq. 15, 16)
  const shape = ((1.0 - q * q) * (1.0 - u_sheetC) + Math.sin(Math.PI * q) * u_sheetC) * Math.exp(-q * q);
  const slope = ((-2.0 * q * (1.0 + (1.0 - q * q))) * (1.0 - u_sheetC) +
    (Math.PI * Math.cos(Math.PI * q) - 2.0 * q * Math.sin(Math.PI * q)) * u_sheetC) * Math.exp(-q * q);

  // Roll angle (Eq. 17)
  const thetaRoll = ((-0.16 * slope) / Math.PI) * u_sheetC * u_sheetP;

  // X-axis rotation (Eq. 18a, 18b)
  const cosR = Math.cos(thetaRoll);
  const sinR = Math.sin(thetaRoll);
  const ny = wy * cosR - wz * sinR;
  const nz = wy * sinR + wz * cosR;
  wy = ny;
  wz = nz;

  // Depth displacement (Eq. 19a)
  wz -= u_sheetD * shape * u_sheetP;
  wy += 0.03 * wx * u_sheetP;

  return [wx, wy, wz];
}

function projectPointToScreen(worldPoint, cameraParams, viewport) {
  const { fov = 53.4, cameraZ = 41.18 } = cameraParams;
  const { width, height } = viewport;

  const aspect = width / height;
  const fovRad = (fov * Math.PI) / 180.0;
  const top = Math.tan(fovRad / 2.0);
  const right = top * aspect;

  // Camera lookAt from [0, 0, cameraZ] to [0, 0, 0]
  const viewX = worldPoint[0];
  const viewY = worldPoint[1];
  const viewZ = worldPoint[2] - cameraZ; // looking down -Z

  // Perspective projection
  const clipW = -viewZ;
  if (clipW <= 0.001) {
    return { x: -9999, y: -9999, clipped: true };
  }

  const clipX = (viewX / (right * clipW));
  const clipY = (viewY / (top * clipW));

  // Viewport mapping (Eq. 24a, 24b)
  const screenX = ((clipX + 1.0) / 2.0) * width;
  const screenY = ((1.0 - clipY) / 2.0) * height;

  return { x: screenX, y: screenY, clipped: false };
}

function projectCardToScreen(cardIndex, params = {}, viewport = { width: 1440, height: 900 }) {
  const cardW = 24.0;
  const cardH = 24.0;
  const stride = 18.5;
  const ribbonOffset = params.ribbonOffset || 0.0;
  const baseX = (cardIndex - 1.5) * stride + ribbonOffset;

  const localCorners = [
    [-cardW / 2.0, -cardH / 2.0, 0],
    [cardW / 2.0, -cardH / 2.0, 0],
    [cardW / 2.0, cardH / 2.0, 0],
    [-cardW / 2.0, cardH / 2.0, 0]
  ];

  const screenPoints = [];
  for (const corner of localCorners) {
    const undeformed = [baseX + corner[0], corner[1], corner[2]];
    const deformed = evaluateSheetCpuTwin(undeformed[0], undeformed[1], undeformed[2], params);
    const screen = projectPointToScreen(deformed, { fov: 53.4, cameraZ: 41.18 }, viewport);
    screenPoints.push(screen);
  }

  const validPoints = screenPoints.filter((p) => !p.clipped);
  if (validPoints.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0, clipped: true };
  }

  const minX = Math.min(...validPoints.map((p) => p.x));
  const maxX = Math.max(...validPoints.map((p) => p.x));
  const minY = Math.min(...validPoints.map((p) => p.y));
  const maxY = Math.max(...validPoints.map((p) => p.y));

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
    points: validPoints,
    clipped: false
  };
}

module.exports = {
  SpatialRTree,
  computeTypographicEnergy,
  computeAreaCV,
  parseSelectorAst,
  validateDonutSelector,
  validateDonutScopeInvariants,
  decodePng,
  applyLateralCompetition,
  computeSaliencyMetrics,
  SlugFontCompiler,
  sRGBToOklch,
  oklchToSRGB,
  calcAPCA,
  searchMonotonicContrast,
  calculateFluidScale,
  applyLexicalDamping,
  UniversalScrollBus,
  evaluateSheetCpuTwin,
  projectCardToScreen,
  projectPointToScreen
};
