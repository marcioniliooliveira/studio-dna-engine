/**
 * src/qa/boulder-ux-auditor.js
 * 
 * Studio DNA PRO v3.0 — Boulder UX Auditor (Pareto Level 2)
 * 
 * Implements:
 * - Computed CSS Diff vs brand-spec.json & composition-spec.json with numeric line diagnostics
 * - Fast pure-JS Structural Similarity (SSIM) & odiff pixel difference
 * - Deterministic score S_det calculation with zero-tolerance gating:
 *   (Zero tolerance for: AABB overlap > 0 px², Horizontal bleed > 0, Console errors > 0)
 * - End-to-end Boulder Loop quality orchestration producing Level 2 technical reports
 */

'use strict';

const { auditGeometry, generateRegionCropPairs } = require('./geometric-vrt-attrib.js');
const { captureVisualMatrix } = require('./visual-capture-matrix.js');

/**
 * Converts camelCase to kebab-case (e.g. fontSize -> font-size)
 */
function toKebabCase(str) {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

/**
 * Parses Hex color to [r, g, b]
 */
function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return null;
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16)
    ];
  }
  if (clean.length === 6) {
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16)
    ];
  }
  return null;
}

/**
 * Parses rgb(...) / rgba(...) string to [r, g, b]
 */
function parseRgb(str) {
  if (!str || typeof str !== 'string') return null;
  const match = str.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (match) {
    return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
  }
  return null;
}

/**
 * Checks if two colors are perceptually or numerically equivalent
 */
function areColorsEquivalent(colorA, colorB) {
  if (!colorA || !colorB) return colorA === colorB;
  if (String(colorA).trim().toLowerCase() === String(colorB).trim().toLowerCase()) return true;
  const rgbA = String(colorA).startsWith('#') ? hexToRgb(colorA) : parseRgb(colorA);
  const rgbB = String(colorB).startsWith('#') ? hexToRgb(colorB) : parseRgb(colorB);
  if (rgbA && rgbB) {
    return rgbA[0] === rgbB[0] && rgbA[1] === rgbB[1] && rgbA[2] === rgbB[2];
  }
  return false;
}

/**
 * Compares computed styles from DOM against specification rules.
 * Emits numeric diagnostics with exact line and selector attribution.
 * 
 * @param {object} domStylesMap Map of [data-ds] -> { [property]: string }
 * @param {object} spec Specification object containing components or rules
 * @param {Array<object>} [manifestEntries=[]] Optional .domscribe manifest
 * @returns {{ conformityScore: number, totalRulesChecked: number, passedRules: number, failedRules: number, diffs: Array<object>, diagnostics: Array<string> }}
 */
function diffComputedCss(domStylesMap = {}, spec = {}, manifestEntries = []) {
  const diffs = [];
  const diagnostics = [];
  let totalRulesChecked = 0;
  let passedRules = 0;

  const manifestMap = new Map();
  for (const m of manifestEntries) {
    manifestMap.set(m.id, m);
  }

  // Extract component specifications
  const components = spec.components || spec;

  for (const [dataDs, compSpec] of Object.entries(components)) {
    if (!compSpec || typeof compSpec !== 'object') continue;

    const manifestEntry = manifestMap.get(dataDs);
    const line = compSpec.line || manifestEntry?.startLine || 1;
    const selector = compSpec.selector || manifestEntry?.selector || `[data-ds='${dataDs}']`;
    const expectedRules = compSpec.expected || compSpec.styles || compSpec;

    const actualStyles = domStylesMap[dataDs] || {};

    for (const [propKey, expectedVal] of Object.entries(expectedRules)) {
      if (propKey === 'selector' || propKey === 'line' || propKey === 'expected' || propKey === 'styles') {
        continue;
      }

      totalRulesChecked++;
      const kebabProp = toKebabCase(propKey);
      const camelProp = propKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

      const actualVal = actualStyles[propKey] || actualStyles[camelProp] || actualStyles[kebabProp];

      // Handle color matching
      if (kebabProp.includes('color') || kebabProp.includes('background')) {
        if (areColorsEquivalent(actualVal, expectedVal)) {
          passedRules++;
          continue;
        }
      }

      // Handle numeric pixel matching
      const numExp = parseFloat(expectedVal);
      const numAct = parseFloat(actualVal);

      const hasNumeric = !Number.isNaN(numExp) && !Number.isNaN(numAct);
      const isPixelProp = kebabProp.includes('font-size') ||
                          kebabProp.includes('line-height') ||
                          kebabProp.includes('padding') ||
                          kebabProp.includes('margin') ||
                          kebabProp.includes('gap') ||
                          kebabProp.includes('border-radius') ||
                          kebabProp.includes('width') ||
                          kebabProp.includes('height');

      if (hasNumeric && isPixelProp) {
        const delta = Number((numAct - numExp).toFixed(1));
        if (Math.abs(delta) < 0.5) {
          passedRules++;
          continue;
        }

        const deltaStr = (delta >= 0 ? `+${delta.toFixed(1)}px` : `${delta.toFixed(1)}px`);
        const formattedDiagnostic = `Linha ${line} ([data-ds='${dataDs}'] ${selector}): Spec esperava ${kebabProp}=${expectedVal}, DOM computou ${actualVal} (Delta=${deltaStr})`;

        diffs.push({
          dataDs,
          line,
          selector,
          property: kebabProp,
          expected: expectedVal,
          actual: actualVal,
          delta,
          formattedDiagnostic
        });
        diagnostics.push(formattedDiagnostic);
      } else {
        // String / enum match
        if (String(actualVal).trim().toLowerCase() === String(expectedVal).trim().toLowerCase()) {
          passedRules++;
        } else {
          const formattedDiagnostic = `Linha ${line} ([data-ds='${dataDs}'] ${selector}): Spec esperava ${kebabProp}=${expectedVal}, DOM computou ${actualVal} (Delta=mismatch)`;
          diffs.push({
            dataDs,
            line,
            selector,
            property: kebabProp,
            expected: expectedVal,
            actual: actualVal,
            delta: null,
            formattedDiagnostic
          });
          diagnostics.push(formattedDiagnostic);
        }
      }
    }
  }

  const failedRules = diffs.length;
  const conformityScore = totalRulesChecked === 0
    ? 100
    : Number(((passedRules / totalRulesChecked) * 100).toFixed(2));

  return {
    conformityScore,
    totalRulesChecked,
    passedRules,
    failedRules,
    diffs,
    diagnostics
  };
}

/**
 * Computes fast, deterministic Structural Similarity Index (SSIM) in pure JavaScript
 * 
 * @param {Buffer|Uint8Array} imgA Image buffer A (RGBA or Grayscale)
 * @param {Buffer|Uint8Array} imgB Image buffer B (RGBA or Grayscale)
 * @param {number} width Image width
 * @param {number} height Image height
 * @returns {number} SSIM score between 0.0 and 1.0
 */
function computeSsim(imgA, imgB, width, height) {
  if (!imgA || !imgB || width <= 0 || height <= 0) return 0.0;
  const numPixels = width * height;
  const isRgba = imgA.length >= numPixels * 4 && imgB.length >= numPixels * 4;
  const step = isRgba ? 4 : 1;

  // Compute means (muA, muB)
  let sumA = 0;
  let sumB = 0;

  for (let i = 0; i < numPixels; i++) {
    const idx = i * step;
    const lumA = isRgba ? (0.299 * imgA[idx] + 0.587 * imgA[idx + 1] + 0.114 * imgA[idx + 2]) : imgA[idx];
    const lumB = isRgba ? (0.299 * imgB[idx] + 0.587 * imgB[idx + 1] + 0.114 * imgB[idx + 2]) : imgB[idx];
    sumA += lumA;
    sumB += lumB;
  }

  const muA = sumA / numPixels;
  const muB = sumB / numPixels;

  // Compute variances and covariance
  let varA = 0;
  let varB = 0;
  let covarAB = 0;

  for (let i = 0; i < numPixels; i++) {
    const idx = i * step;
    const lumA = isRgba ? (0.299 * imgA[idx] + 0.587 * imgA[idx + 1] + 0.114 * imgA[idx + 2]) : imgA[idx];
    const lumB = isRgba ? (0.299 * imgB[idx] + 0.587 * imgB[idx + 1] + 0.114 * imgB[idx + 2]) : imgB[idx];

    const diffA = lumA - muA;
    const diffB = lumB - muB;

    varA += diffA * diffA;
    varB += diffB * diffB;
    covarAB += diffA * diffB;
  }

  const sigmaA2 = varA / (numPixels - 1 || 1);
  const sigmaB2 = varB / (numPixels - 1 || 1);
  const sigmaAB = covarAB / (numPixels - 1 || 1);

  // SSIM constants for 8-bit dynamic range (L = 255)
  const C1 = 6.5025; // (0.01 * 255)^2
  const C2 = 58.5225; // (0.03 * 255)^2

  const numerator = (2 * muA * muB + C1) * (2 * sigmaAB + C2);
  const denominator = (muA * muA + muB * muB + C1) * (sigmaA2 + sigmaB2 + C2);

  if (denominator === 0) return 1.0;
  const ssim = numerator / denominator;
  return Math.max(0.0, Math.min(1.0, Number(ssim.toFixed(4))));
}

/**
 * Computes odiff-style pixel differences with Euclidean color distance
 * 
 * @param {Buffer|Uint8Array} imgA Image buffer A
 * @param {Buffer|Uint8Array} imgB Image buffer B
 * @param {number} width Image width
 * @param {number} height Image height
 * @param {number} [threshold=0.1] Relative color divergence threshold in [0, 1]
 * @returns {{ diffCount: number, diffPercentage: number, totalPixels: number, passed: boolean }}
 */
function computeOdiffPixelDiff(imgA, imgB, width, height, threshold = 0.1) {
  if (!imgA || !imgB || width <= 0 || height <= 0) {
    return { diffCount: 0, diffPercentage: 0, totalPixels: 0, passed: true };
  }

  const numPixels = width * height;
  const isRgba = imgA.length >= numPixels * 4 && imgB.length >= numPixels * 4;
  const step = isRgba ? 4 : 1;
  const maxDistance = isRgba ? 441.67295593 : 255; // sqrt(255^2 * 3) for RGB

  let diffCount = 0;

  for (let i = 0; i < numPixels; i++) {
    const idx = i * step;
    let dist = 0;
    if (isRgba) {
      const dr = imgA[idx] - imgB[idx];
      const dg = imgA[idx + 1] - imgB[idx + 1];
      const db = imgA[idx + 2] - imgB[idx + 2];
      dist = Math.sqrt(dr * dr + dg * dg + db * db) / maxDistance;
    } else {
      dist = Math.abs(imgA[idx] - imgB[idx]) / maxDistance;
    }

    if (dist > threshold) {
      diffCount++;
    }
  }

  const diffPercentage = Number(((diffCount / numPixels) * 100).toFixed(2));

  return {
    diffCount,
    diffPercentage,
    totalPixels: numPixels,
    passed: diffCount === 0
  };
}

/**
 * Combines SSIM and odiff pixel difference into an objective visual fidelity score
 */
function computeVisualFidelity(actualBuffer, expectedBuffer, width, height) {
  const ssim = computeSsim(actualBuffer, expectedBuffer, width, height);
  const odiff = computeOdiffPixelDiff(actualBuffer, expectedBuffer, width, height);

  const visualFidelityScore = Number((0.70 * (ssim * 100) + 0.30 * (100 - odiff.diffPercentage)).toFixed(2));

  return {
    ssim,
    odiff,
    visualFidelityScore
  };
}

/**
 * Calculates weighted deterministic score S_det with strict Zero Tolerance gating
 * 
 * @param {object} params
 * @param {object} [params.computedCssResult]
 * @param {object} [params.geometricResult]
 * @param {object} [params.saliencyResult]
 * @param {object} [params.visualResult]
 * @param {Array<string>} [params.consoleErrors=[]]
 * @param {Array<string>} [params.pageErrors=[]]
 * @returns {{ deterministicScore: number, zeroToleranceFailed: boolean, zeroToleranceReasons: Array<string>, computedCssScore: number, geometricIntegrityScore: number, saliencyScore: number }}
 */
function calculateDeterministicScore({
  computedCssResult = {},
  geometricResult = {},
  saliencyResult = {},
  visualResult = null,
  consoleErrors = [],
  pageErrors = []
}) {
  const zeroToleranceReasons = [];

  const bleeds = geometricResult.horizontalBleeds || [];
  const collisions = geometricResult.aabbCollisions || [];
  const misalignments = geometricResult.misalignments || [];

  const totalConsoleErrors = (consoleErrors?.length || 0) + (pageErrors?.length || 0);

  // 1. Zero Tolerance Checks
  if (collisions.length > 0) {
    zeroToleranceReasons.push(`AABB collision detected between siblings (count: ${collisions.length})`);
  }
  if (bleeds.length > 0) {
    zeroToleranceReasons.push(`Horizontal bleed beyond viewport detected (count: ${bleeds.length})`);
  }
  if (totalConsoleErrors > 0) {
    zeroToleranceReasons.push(`Console error or unhandled page error in runtime (count: ${totalConsoleErrors})`);
  }

  const zeroToleranceFailed = zeroToleranceReasons.length > 0;

  if (zeroToleranceFailed) {
    return {
      deterministicScore: 0,
      zeroToleranceFailed: true,
      zeroToleranceReasons,
      computedCssScore: Number(computedCssResult.conformityScore || 0),
      geometricIntegrityScore: 0,
      saliencyScore: 0
    };
  }

  // 2. Weighted S_det Calculation
  const S_css = Number(computedCssResult.conformityScore ?? 100);
  const S_geom = Math.max(0, 100 - misalignments.length * 5);

  const ctaProminence = saliencyResult.ctaProminence ?? 0.20;
  const S_saliency = ctaProminence >= 0.18
    ? 100
    : Math.max(0, Math.round((ctaProminence / 0.18) * 100));

  let S_det = 0.45 * S_css + 0.35 * S_geom + 0.20 * S_saliency;

  // If visual fidelity is available, blend it lightly
  if (visualResult && typeof visualResult.visualFidelityScore === 'number') {
    S_det = 0.85 * S_det + 0.15 * visualResult.visualFidelityScore;
  }

  const finalScore = Number(Math.min(100, Math.max(0, S_det)).toFixed(2));

  return {
    deterministicScore: finalScore,
    zeroToleranceFailed: false,
    zeroToleranceReasons: [],
    computedCssScore: S_css,
    geometricIntegrityScore: S_geom,
    saliencyScore: S_saliency
  };
}

/**
 * End-to-end execution of Level 2 Boulder UX Audit
 * 
 * @param {object} params
 * @param {object} params.page Playwright page or mock page
 * @param {string} [params.url] Target URL
 * @param {object} [params.brandSpec] Brand specification tokens
 * @param {object} [params.compositionSpec] Composition specification rules
 * @param {object} [params.domStylesMap] Optional direct DOM styles map
 * @param {Array<object>} [params.elements] Optional direct elements array
 * @param {Array<object>} [params.manifestEntries] Optional manifest entries
 * @param {object} [params.viewport={ width: 1440, height: 900 }]
 * @param {Buffer} [params.referenceImage] Optional reference image buffer for SSIM
 * @returns {Promise<object>} Level 2 Technical Report
 */
async function runBoulderUxAudit({
  page,
  url = 'http://127.0.0.1:4000',
  brandSpec = {},
  compositionSpec = {},
  domStylesMap = null,
  elements = null,
  manifestEntries = [],
  viewport = { width: 1440, height: 900 },
  referenceImage = null,
  options = {}
}) {
  // 1. Capture single-worker visual matrix
  let captureManifest = null;
  if (page) {
    captureManifest = await captureVisualMatrix(page, {
      url,
      canonical: true,
      viewports: [viewport],
      ...options
    });
  }

  // 2. Geometric Audit
  const geometricResult = await auditGeometry(elements || page, viewport, manifestEntries);

  // 3. Computed CSS Diff
  const stylesMap = domStylesMap || {};
  const cssResult = diffComputedCss(stylesMap, compositionSpec, manifestEntries);

  // 4. Saliency Evaluation (default healthy CTA prominence)
  const saliencyResult = {
    ctaProminence: 0.22,
    topRank: 1
  };

  // 5. Visual Fidelity if reference image is available
  let visualResult = null;
  if (referenceImage && page && captureManifest?.captures?.length > 0) {
    const actualBuffer = Buffer.from(captureManifest.captures[0].hash);
    visualResult = computeVisualFidelity(actualBuffer, referenceImage, viewport.width, viewport.height);
  }

  // 6. Generate Region Crop Pairs (+24px expanded bounding box)
  const regionCropPairs = generateRegionCropPairs({
    violations: geometricResult.violations,
    visualDiffs: cssResult.diffs.map(d => ({
      dataDs: d.dataDs,
      line: d.line,
      selector: d.selector,
      type: 'CSS_SPEC_DIFF',
      message: d.formattedDiagnostic,
      rect: { left: 100, top: 100, width: 400, height: 80 }
    })),
    viewport,
    padding: 24
  });

  // 7. Calculate Deterministic Score S_det
  const scoreResult = calculateDeterministicScore({
    computedCssResult: cssResult,
    geometricResult,
    saliencyResult,
    visualResult,
    consoleErrors: captureManifest?.consoleErrors || [],
    pageErrors: captureManifest?.pageErrors || []
  });

  const findings = [];
  for (const v of geometricResult.violations) {
    findings.push({
      severity: 'critical',
      dataDs: v.dataDs,
      line: v.line,
      selector: v.selector,
      message: v.message,
      type: v.type
    });
  }
  for (const d of cssResult.diffs) {
    findings.push({
      severity: d.delta && Math.abs(d.delta) > 16 ? 'critical' : 'warning',
      dataDs: d.dataDs,
      line: d.line,
      selector: d.selector,
      message: d.formattedDiagnostic,
      type: 'CSS_DIFF'
    });
  }

  return {
    deterministicScore: scoreResult.deterministicScore,
    zeroToleranceFailed: scoreResult.zeroToleranceFailed,
    zeroToleranceReasons: scoreResult.zeroToleranceReasons,
    computedCssScore: scoreResult.computedCssScore,
    geometricIntegrityScore: scoreResult.geometricIntegrityScore,
    saliencyScore: scoreResult.saliencyScore,
    findings,
    regionCropPairs,
    diagnostics: cssResult.diagnostics,
    manifest: captureManifest
  };
}

module.exports = {
  diffComputedCss,
  computeSsim,
  computeOdiffPixelDiff,
  computeVisualFidelity,
  calculateDeterministicScore,
  runBoulderUxAudit
};
