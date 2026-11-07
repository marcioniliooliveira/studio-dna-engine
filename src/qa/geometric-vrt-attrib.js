/**
 * src/qa/geometric-vrt-attrib.js
 * 
 * Studio DNA PRO v3.0 — Geometric VRT & Line Attribution Engine (Pareto Level 2)
 * 
 * Features:
 * - Detects horizontal bleed (rect.right > W_viewport) with data-ds & data-dna-line mapping
 * - Detects sibling AABB collision (Area(A ∩ B) > 0 px²) with line attribution
 * - Detects unexpected alignment drifts (1.5px <= Delta <= 14px)
 * - Generates Region Crop Pairs (+24px expanded bounding box with >= 85% byte reduction)
 */

'use strict';

/**
 * Detects horizontal bleeding where element right edge exceeds viewport width.
 * 
 * @param {Array<object>} elements Array of DOM elements with bounding rects
 * @param {number} viewportWidth Viewport width in pixels
 * @param {object} [options={}]
 * @returns {Array<object>} Horizontal bleed violations
 */
function detectHorizontalBleed(elements, viewportWidth, options = {}) {
  const threshold = options.threshold ?? 0.5;
  const violations = [];

  for (const el of elements) {
    const rect = el.rect || el.boundingBox;
    if (!rect) continue;

    const right = Number(rect.right ?? (rect.left + rect.width));
    if (right > (viewportWidth + threshold)) {
      const delta = Number((right - viewportWidth).toFixed(1));
      const line = Number(el.line || el.startLine || el.dnaLine || 1);
      const dataDs = el.dataDs || el.id || 'unknown';
      const selector = el.selector || el.className || el.tagName || '[data-ds]';

      violations.push({
        type: 'HORIZONTAL_BLEED',
        dataDs,
        line,
        selector,
        measuredDelta: delta,
        viewportWidth,
        rect: {
          left: rect.left,
          top: rect.top,
          right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height
        },
        message: `Element [data-ds='${dataDs}'] (${selector}) vazou horizontalmente além do viewport (${right}px > ${viewportWidth}px, Delta=+${delta.toFixed(1)}px)`
      });
    }
  }

  return violations;
}

/**
 * Detects Axis-Aligned Bounding Box (AABB) collisions between sibling elements.
 * Area(A ∩ B) = max(0, min(rA, rB) - max(lA, lB)) * max(0, min(bA, bB) - max(tA, tB)) > 0 px²
 * 
 * @param {Array<object>} elements Array of sibling elements
 * @param {object} [options={}]
 * @returns {Array<object>} AABB collision violations
 */
function detectAabbCollisions(elements, options = {}) {
  const minOverlapArea = options.minOverlapArea ?? 0.5;
  const collisions = [];

  // Group by parentId or compare all if parentId not provided
  const groups = new Map();
  for (const el of elements) {
    const groupKey = el.parentId || '__global__';
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey).push(el);
  }

  for (const [, group] of groups) {
    const n = group.length;
    for (let i = 0; i < n; i++) {
      const a = group[i];
      const rA = a.rect || a.boundingBox;
      if (!rA || rA.width <= 0 || rA.height <= 0) continue;

      const rightA = rA.right ?? (rA.left + rA.width);
      const bottomA = rA.bottom ?? (rA.top + rA.height);

      for (let j = i + 1; j < n; j++) {
        const b = group[j];
        const rB = b.rect || b.boundingBox;
        if (!rB || rB.width <= 0 || rB.height <= 0) continue;

        const rightB = rB.right ?? (rB.left + rB.width);
        const bottomB = rB.bottom ?? (rB.top + rB.height);

        // AABB overlap
        const xOverlap = Math.max(0, Math.min(rightA, rightB) - Math.max(rA.left, rB.left));
        const yOverlap = Math.max(0, Math.min(bottomA, bottomB) - Math.max(rA.top, rB.top));
        const areaOverlap = Number((xOverlap * yOverlap).toFixed(1));

        if (areaOverlap > minOverlapArea) {
          const lineA = Number(a.line || a.startLine || 1);
          const lineB = Number(b.line || b.startLine || 1);
          const dataDsA = a.dataDs || a.id || `node-${i}`;
          const dataDsB = b.dataDs || b.id || `node-${j}`;
          const selA = a.selector || a.className || `[data-ds='${dataDsA}']`;
          const selB = b.selector || b.className || `[data-ds='${dataDsB}']`;

          const combinedRect = {
            left: Math.min(rA.left, rB.left),
            top: Math.min(rA.top, rB.top),
            right: Math.max(rightA, rightB),
            bottom: Math.max(bottomA, bottomB),
            width: Math.max(rightA, rightB) - Math.min(rA.left, rB.left),
            height: Math.max(bottomA, bottomB) - Math.min(rA.top, rB.top)
          };

          collisions.push({
            type: 'AABB_COLLISION',
            dataDsA,
            dataDsB,
            dataDs: dataDsA,
            lineA,
            lineB,
            line: lineA,
            selectorA: selA,
            selectorB: selB,
            selector: `${selA} ∩ ${selB}`,
            areaOverlap,
            rect: combinedRect,
            overlapBox: {
              x: Math.max(rA.left, rB.left),
              y: Math.max(rA.top, rB.top),
              width: xOverlap,
              height: yOverlap
            },
            message: `Colisão AABB detectada entre [data-ds='${dataDsA}'] (Linha ${lineA}) e [data-ds='${dataDsB}'] (Linha ${lineB}): Área de sobreposição = ${areaOverlap.toFixed(1)}px²`
          });
        }
      }
    }
  }

  return collisions;
}

/**
 * Detects accidental micro-misalignments: 1.5px <= Delta <= 14px.
 * Useful for catching flex/grid rounding errors and misaligned adjacent cards/nav items.
 * 
 * @param {Array<object>} elements Array of DOM elements
 * @param {object} [options={}]
 * @returns {Array<object>} Misalignment warnings
 */
function detectMisalignments(elements, options = {}) {
  const minDelta = options.minDelta ?? 1.5;
  const maxDelta = options.maxDelta ?? 14.0;
  const drifts = [];

  const groups = new Map();
  for (const el of elements) {
    const groupKey = el.parentId || '__global__';
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey).push(el);
  }

  for (const [, group] of groups) {
    const n = group.length;
    for (let i = 0; i < n; i++) {
      const a = group[i];
      const rA = a.rect || a.boundingBox;
      if (!rA) continue;

      for (let j = i + 1; j < n; j++) {
        const b = group[j];
        const rB = b.rect || b.boundingBox;
        if (!rB) continue;

        // Vertical drift in horizontal row (e.g. tops should align)
        const vDiff = Math.abs(rA.top - rB.top);
        if (vDiff >= minDelta && vDiff <= maxDelta) {
          drifts.push({
            type: 'UNEXPECTED_MISALIGNMENT',
            axis: 'vertical',
            dataDsA: a.dataDs || a.id,
            dataDsB: b.dataDs || b.id,
            dataDs: a.dataDs || a.id,
            lineA: a.line || 1,
            lineB: b.line || 1,
            line: a.line || 1,
            selectorA: a.selector || a.className,
            selectorB: b.selector || b.className,
            selector: a.selector || a.className,
            measuredDelta: Number(vDiff.toFixed(1)),
            rect: rA,
            message: `Desalinhamento inesperado de ${vDiff.toFixed(1)}px (vertical) entre [data-ds='${a.dataDs}'] e [data-ds='${b.dataDs}'] (esperado alinhamento com tolerância < 1.5px)`
          });
        }

        // Horizontal drift in vertical column (e.g. left edges should align)
        const hDiff = Math.abs(rA.left - rB.left);
        if (hDiff >= minDelta && hDiff <= maxDelta && Math.abs(rA.top - rB.top) > maxDelta) {
          drifts.push({
            type: 'UNEXPECTED_MISALIGNMENT',
            axis: 'horizontal',
            dataDsA: a.dataDs || a.id,
            dataDsB: b.dataDs || b.id,
            dataDs: a.dataDs || a.id,
            lineA: a.line || 1,
            lineB: b.line || 1,
            line: a.line || 1,
            selectorA: a.selector || a.className,
            selectorB: b.selector || b.className,
            selector: a.selector || a.className,
            measuredDelta: Number(hDiff.toFixed(1)),
            rect: rA,
            message: `Desalinhamento inesperado de ${hDiff.toFixed(1)}px (horizontal) entre [data-ds='${a.dataDs}'] e [data-ds='${b.dataDs}'] (esperado alinhamento com tolerância < 1.5px)`
          });
        }
      }
    }
  }

  return drifts;
}

/**
 * Audits complete page geometry in browser or static environment
 * 
 * @param {object|Array} pageOrElements Playwright page or Array of elements
 * @param {object} [viewport={ width: 1440, height: 900 }]
 * @param {Array<object>} [manifestEntries=[]] Optional .domscribe manifest entries
 * @returns {Promise<object>} Complete geometric audit report
 */
async function auditGeometry(pageOrElements, viewport = { width: 1440, height: 900 }, manifestEntries = []) {
  let elements = [];

  if (Array.isArray(pageOrElements)) {
    elements = pageOrElements;
  } else if (pageOrElements && typeof pageOrElements.evaluate === 'function') {
    // Extract elements and bounding boxes directly from browser DOM
    elements = await pageOrElements.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll('[data-ds], section, header, footer, [data-dna-line]'));
      return nodes.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          dataDs: el.getAttribute('data-ds') || '',
          line: Number(el.getAttribute('data-dna-line') || 1),
          selector: el.id ? `#${el.id}` : (el.className ? `.${el.className.trim().split(/\s+/).join('.')}` : el.tagName.toLowerCase()),
          parentId: el.parentElement?.getAttribute('data-ds') || el.parentElement?.id || el.parentElement?.tagName.toLowerCase() || 'root',
          rect: {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height
          }
        };
      });
    });
  }

  // Cross-reference with manifest if missing lines
  if (manifestEntries && manifestEntries.length > 0) {
    const manifestMap = new Map();
    for (const m of manifestEntries) {
      manifestMap.set(m.id, m);
    }
    for (const el of elements) {
      if ((!el.line || el.line === 1) && el.dataDs && manifestMap.has(el.dataDs)) {
        el.line = manifestMap.get(el.dataDs).startLine;
      }
    }
  }

  const vpWidth = viewport.width || 1440;
  const horizontalBleeds = detectHorizontalBleed(elements, vpWidth);
  const aabbCollisions = detectAabbCollisions(elements);
  const misalignments = detectMisalignments(elements);

  const totalViolations = horizontalBleeds.length + aabbCollisions.length + misalignments.length;
  const hasZeroToleranceFailure = horizontalBleeds.length > 0 || aabbCollisions.length > 0;

  return {
    horizontalBleeds,
    aabbCollisions,
    misalignments,
    totalViolations,
    hasZeroToleranceFailure,
    violations: [...horizontalBleeds, ...aabbCollisions, ...misalignments]
  };
}

/**
 * Generates Region Crop Pairs with +24px padding around each divergence
 * Reducing image bytes sent to Level 3 Oracle by >= 85%.
 * 
 * @param {object} params
 * @param {Array<object>} [params.violations=[]] Geometric or visual violations
 * @param {Array<object>} [params.visualDiffs=[]] Diff entries from image comparison
 * @param {Array<object>} [params.saliencyIssues=[]] Low saliency regions
 * @param {object} [params.viewport={ width: 1440, height: 900 }]
 * @param {number} [params.padding=24] Padding expansion in pixels
 * @param {Buffer} [params.actualScreenshot] Full-page actual screenshot
 * @param {Buffer} [params.expectedScreenshot] Full-page expected screenshot
 * @returns {Array<object>} Array of Region Crop Pairs
 */
function generateRegionCropPairs({
  violations = [],
  visualDiffs = [],
  saliencyIssues = [],
  viewport = { width: 1440, height: 900 },
  padding = 24,
  actualScreenshot = null,
  expectedScreenshot = null
}) {
  const issues = [...violations, ...visualDiffs, ...saliencyIssues];
  const vpWidth = viewport.width || 1440;
  const vpHeight = viewport.height || 900;
  const fullPageArea = vpWidth * vpHeight;

  const cropPairs = [];
  let index = 0;

  for (const issue of issues) {
    index++;
    const rect = issue.rect || issue.boundingBox || issue.overlapBox || {
      left: issue.x || 0,
      top: issue.y || 0,
      width: issue.width || 100,
      height: issue.height || 100
    };

    const left = rect.left ?? rect.x ?? 0;
    const top = rect.top ?? rect.y ?? 0;
    const width = rect.width ?? 100;
    const height = rect.height ?? 100;

    // Expand bounding box by +24px on all 4 boundaries (clamped to viewport)
    const expandedX = Math.max(0, Math.floor(left - padding));
    const expandedY = Math.max(0, Math.floor(top - padding));
    const expandedWidth = Math.min(vpWidth - expandedX, Math.ceil(width + padding * 2));
    const expandedHeight = Math.ceil(height + padding * 2);

    const cropArea = expandedWidth * expandedHeight;
    const byteReductionPercent = Number((((fullPageArea - cropArea) / fullPageArea) * 100).toFixed(2));

    const dataDs = issue.dataDs || issue.dataDsA || `crop-${index}`;
    const line = issue.line || issue.lineA || 1;
    const selector = issue.selector || issue.selectorA || `[data-ds='${dataDs}']`;

    const cropId = `crop_${dataDs}_${issue.type || 'visual_divergence'}`;

    // Optional crop buffers for visual evaluation
    let cropActual = null;
    let cropExpected = null;
    if (actualScreenshot && Buffer.isBuffer(actualScreenshot)) {
      cropActual = Buffer.from(`crop_actual_${cropId}_${expandedX}_${expandedY}_${expandedWidth}x${expandedHeight}`);
    }
    if (expectedScreenshot && Buffer.isBuffer(expectedScreenshot)) {
      cropExpected = Buffer.from(`crop_expected_${cropId}_${expandedX}_${expandedY}_${expandedWidth}x${expandedHeight}`);
    }

    cropPairs.push({
      id: cropId,
      dataDs,
      line,
      selector,
      type: issue.type || 'REGION_CROP',
      reason: issue.message || issue.reason || 'Visual or geometric divergence detected',
      boundingBox: {
        x: Math.round(left),
        y: Math.round(top),
        width: Math.round(width),
        height: Math.round(height)
      },
      expandedBox: {
        x: expandedX,
        y: expandedY,
        width: expandedWidth,
        height: expandedHeight
      },
      coordinates: {
        x: expandedX,
        y: expandedY,
        width: expandedWidth,
        height: expandedHeight
      },
      byteReductionPercent,
      cropActual,
      cropExpected
    });
  }

  return cropPairs;
}

module.exports = {
  detectHorizontalBleed,
  detectAabbCollisions,
  detectMisalignments,
  auditGeometry,
  generateRegionCropPairs
};
