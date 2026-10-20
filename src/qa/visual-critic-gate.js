/**
 * src/qa/visual-critic-gate.js
 * 
 * Studio DNA PRO v2.6 — Calibrated Visual Critic Quality Gate
 * 
 * Enforces:
 * - 7 Mandatory Visual Dimensions: hierarquia, composicao, tipografia, cor, assets, originalidade_contextual, movimento
 * - Full SHA-256 screenshot binding against captureManifest
 * - Rejection of unanchored critiques (missing region or rationale)
 * - Strict gating: Automatic approval requires score >= 4 in ALL 7 dimensions with 0 critical flags
 */

'use strict';

const REQUIRED_DIMENSIONS = [
  'hierarquia',
  'composicao',
  'tipografia',
  'cor',
  'assets',
  'originalidade_contextual',
  'movimento'
];

/**
 * Evaluates visual critique against capture manifest and quality rubric.
 * 
 * @param {object} params
 * @param {object} params.captureManifest Generated manifest from captureVisualMatrix
 * @param {object} [params.visualAcceptance] Optional threshold overrides
 * @param {object} params.critique Evaluator visual critique object
 * @returns {{ approved: boolean, overallScore: number, dimensions: object, violations: Array<string>, criticalFailures: Array<string> }}
 */
function evaluateVisualCritique({ captureManifest, visualAcceptance = {}, critique }) {
  const violations = [];
  const criticalFailures = [];

  if (!critique || typeof critique !== 'object') {
    return {
      approved: false,
      overallScore: 0,
      dimensions: {},
      violations: ['Critique payload must be a non-empty object'],
      criticalFailures: ['Missing critique']
    };
  }

  const manifestMap = new Map();
  if (captureManifest && Array.isArray(captureManifest.captures)) {
    for (const c of captureManifest.captures) {
      manifestMap.set(c.id, c.hash);
    }
  }

  const dimensions = critique.dimensions || {};
  let totalScore = 0;
  let evaluatedCount = 0;

  for (const dimKey of REQUIRED_DIMENSIONS) {
    const dim = dimensions[dimKey];
    if (!dim) {
      violations.push(`Missing mandatory dimension '${dimKey}' in critique`);
      criticalFailures.push(`Incomplete critique: missing ${dimKey}`);
      continue;
    }

    // 1. Score validation (integer 1 to 5)
    if (!Number.isInteger(dim.score) || dim.score < 1 || dim.score > 5) {
      violations.push(`Dimension '${dimKey}' has invalid score ${dim.score} (must be integer 1-5)`);
    } else {
      totalScore += dim.score;
      evaluatedCount++;
    }

    // 2. Rationale validation
    if (!dim.rationale || typeof dim.rationale !== 'string' || dim.rationale.trim().length < 5) {
      violations.push(`Dimension '${dimKey}' lacks substantive rationale/justification`);
    }

    // 3. Region validation (x, y, width, height)
    if (!dim.region || typeof dim.region !== 'object' ||
        typeof dim.region.x !== 'number' || typeof dim.region.y !== 'number' ||
        typeof dim.region.width !== 'number' || typeof dim.region.height !== 'number' ||
        dim.region.width <= 0 || dim.region.height <= 0) {
      violations.push(`Dimension '${dimKey}' missing valid pixel coordinate region`);
    }

    // 4. Manifest binding & SHA-256 verification
    if (!dim.screenshotId || typeof dim.screenshotId !== 'string') {
      violations.push(`Dimension '${dimKey}' missing target screenshotId`);
    } else if (manifestMap.size > 0) {
      const expectedHash = manifestMap.get(dim.screenshotId);
      if (!expectedHash) {
        violations.push(`Dimension '${dimKey}' references unknown screenshotId '${dim.screenshotId}'`);
      } else if (dim.screenshotHash !== expectedHash) {
        violations.push(`Dimension '${dimKey}' has divergent screenshotHash (expected ${expectedHash}, got ${dim.screenshotHash})`);
      }
    }

    // 5. Critical check
    if (dim.critical === true) {
      criticalFailures.push(`Dimension '${dimKey}' flagged as critical failure: ${dim.rationale}`);
    } else if (dim.score < 3) {
      criticalFailures.push(`Dimension '${dimKey}' scored unacceptably low (${dim.score}/5)`);
    }
  }

  const overallScore = evaluatedCount > 0 ? Number((totalScore / evaluatedCount).toFixed(2)) : 0;
  const minRequiredScore = visualAcceptance.minDimensionScore || 4;

  // Auto-approval condition: all 7 dimensions score >= minRequiredScore (4), 0 violations, 0 critical failures
  const allDimensionsPass = evaluatedCount === REQUIRED_DIMENSIONS.length &&
    REQUIRED_DIMENSIONS.every(k => dimensions[k] && dimensions[k].score >= minRequiredScore);

  const approved = allDimensionsPass && violations.length === 0 && criticalFailures.length === 0;

  return {
    approved,
    overallScore,
    dimensions,
    violations,
    criticalFailures
  };
}

module.exports = {
  REQUIRED_DIMENSIONS,
  evaluateVisualCritique
};
