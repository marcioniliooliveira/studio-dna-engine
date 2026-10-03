/**
 * src/evaluators/typesafe-jury.js
 * 
 * Type-Safe Design Jury & System One Decision Evaluator (Jev Paradigm)
 * Part of "The Stochastic Ceiling" Deterministic-Evolutionary Framework.
 * 
 * Evaluates telemetry summaries using strictly bounded, type-safe decision schemas
 * without unconstrained natural language token generation.
 */

'use strict';

const EffortMetric = Object.freeze({
  LAZY_DEFAULT: "Model defaulted to standard, low-effort styling blocks or purple/blue gradients.",
  STRUCTURALLY_FLAWED: "Model produced layout collisions, overlapping bounding boxes, or broken timelines.",
  HIGH_COMPLEXITY: "Model successfully executed complex, asymmetric layout math and responsive structures."
});

const MotionQuality = Object.freeze({
  PERFECT: "The layout flows smoothly across all viewport step intervals without clipping.",
  TOO_FAST: "The asset scales or animates before text containers clear the viewport.",
  OVERLAPPING: "Text blocks or visual containers collide during active scroll ticks."
});

/**
 * Validates a decision object against the LayoutDecisionSchema.
 * 
 * @param {Object} decision
 * @returns {boolean}
 */
function validateLayoutDecision(decision) {
  if (!decision || typeof decision !== 'object') {
    throw new TypeError('LayoutDecision must be a plain object');
  }

  const effortKeys = Object.keys(EffortMetric);
  if (!effortKeys.includes(decision.architectural_effort)) {
    throw new TypeError(`Invalid architectural_effort: "${decision.architectural_effort}". Must be one of: ${effortKeys.join(', ')}`);
  }

  const motionKeys = Object.keys(MotionQuality);
  if (!motionKeys.includes(decision.kinetic_flow)) {
    throw new TypeError(`Invalid kinetic_flow: "${decision.kinetic_flow}". Must be one of: ${motionKeys.join(', ')}`);
  }

  if (typeof decision.taste_rating !== 'number' || decision.taste_rating < 0 || decision.taste_rating > 100) {
    throw new TypeError(`taste_rating must be a number between 0 and 100, got: ${decision.taste_rating}`);
  }

  if (typeof decision.should_mutate_parameters !== 'boolean') {
    throw new TypeError('should_mutate_parameters must be a boolean');
  }

  if (typeof decision.is_production_ready !== 'boolean') {
    throw new TypeError('is_production_ready must be a boolean');
  }

  if (decision.is_production_ready && (decision.taste_rating < 85 || decision.architectural_effort !== 'HIGH_COMPLEXITY' || decision.kinetic_flow !== 'PERFECT')) {
    throw new Error('Inconsistency: is_production_ready requires taste_rating >= 85, HIGH_COMPLEXITY, and PERFECT kinetic_flow');
  }

  return true;
}

/**
 * System One Decision Evaluator
 * Interprets telemetry summary matrices into a type-safe decision.
 * 
 * @param {Object} telemetryResult Output from KineticTelemetryExtractor.captureTelemetry
 * @param {Object} [options]
 * @returns {Object} Validated LayoutDecisionSchema object
 */
function evaluateWithJury(telemetryResult, options = {}) {
  if (!telemetryResult || !telemetryResult.summary) {
    throw new Error('Valid telemetryResult with summary is required for jury evaluation');
  }

  const decision = telemetryResult.decision;
  validateLayoutDecision(decision);

  return {
    architectural_effort: decision.architectural_effort,
    kinetic_flow: decision.kinetic_flow,
    taste_rating: decision.taste_rating,
    should_mutate_parameters: decision.should_mutate_parameters,
    is_production_ready: decision.is_production_ready,
    metadata: {
      totalFramesCaptured: telemetryResult.summary.totalFramesCaptured,
      maxOverlapArea: telemetryResult.summary.maxOverlapArea,
      overlappingFramesCount: telemetryResult.summary.overlappingFramesCount,
      evaluatedAt: new Date().toISOString()
    }
  };
}

module.exports = {
  EffortMetric,
  MotionQuality,
  validateLayoutDecision,
  evaluateWithJury
};
