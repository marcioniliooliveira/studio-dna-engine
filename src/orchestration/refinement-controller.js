/**
 * src/orchestration/refinement-controller.js
 * 
 * Studio DNA PRO v2.6 — Bounded Visual Refinement Controller
 * 
 * Invariants:
 * - Trava estrita de 3 tentativas: attempt >= 3 returns human_review_required (never infinite loop)
 * - Only verified QA findings enter the refinement prompt
 * - Any refinement action invalidates prior QA gate certificates
 */

'use strict';

const MAX_REFINEMENT_ATTEMPTS = 3;

/**
 * Plans next refinement task or escalates to human review.
 * 
 * @param {object} params
 * @param {number} params.attempt Current attempt number (1-based)
 * @param {Array<string|object>} params.findings Verified findings from QA / verifier gates
 * @param {string} [params.priorArtifactHash] SHA-256 of the artifact being refined
 * @returns {object} RefinementTask or HumanReviewRequired
 */
function planRefinement({ attempt = 1, findings = [], priorArtifactHash }) {
  const normalizedFindings = (findings || []).map(f => typeof f === 'string' ? f : f.message || JSON.stringify(f));

  if (attempt >= MAX_REFINEMENT_ATTEMPTS) {
    return {
      action: 'human_review_required',
      attempt,
      maxAttempts: MAX_REFINEMENT_ATTEMPTS,
      reason: `Automated refinement limit (${MAX_REFINEMENT_ATTEMPTS} attempts) reached without meeting quality threshold`,
      targetHash: priorArtifactHash,
      unresolvedFindings: normalizedFindings
    };
  }

  // Format concrete actionable remediation tasks for the builder agent
  const tasks = normalizedFindings.map((finding, idx) => ({
    id: `remedy_task_${attempt}_${idx + 1}`,
    finding,
    suggestedFix: deriveRemedyGuidance(finding)
  }));

  return {
    action: 'refinement_task',
    attempt: attempt + 1,
    maxAttempts: MAX_REFINEMENT_ATTEMPTS,
    targetHash: priorArtifactHash,
    invalidatedGates: [
      'visual-critic',
      'visual-regression',
      'unified-quality-gate'
    ],
    tasks
  };
}

function deriveRemedyGuidance(finding) {
  const fLower = (finding || '').toLowerCase();
  if (fLower.includes('contrast') || fLower.includes('apca')) {
    return 'Adjust typography color or apply optimal scrim layer opacity to satisfy APCA threshold';
  }
  if (fLower.includes('tipografia') || fLower.includes('font')) {
    return 'Re-scale fluid clamp boundaries or adjust font-weight to prevent overflow';
  }
  if (fLower.includes('movimento') || fLower.includes('motion')) {
    return 'Review spring physics damping or Catmull-Rom knots to eliminate kinetic jitter';
  }
  return 'Review section tokens and visual layout rules to remediate flagged defect';
}

module.exports = {
  MAX_REFINEMENT_ATTEMPTS,
  planRefinement
};
