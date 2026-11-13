/**
 * src/motion/taxonomy.js
 * 
 * Studio DNA Engine v3.0 — JEV 2.0 Multidimensional Kinetic Taxonomy
 * 
 * Defines the 4-dimensional orthogonal classification model for motion systems:
 * 1. KineticArchetype (UX Intent & Structural Pattern)
 * 2. TriggerVector (Input Vector & Causality)
 * 3. PerceptualCriticality (Cognitive Weight & Rendering Budget)
 * 4. PhysicalRegime (Dynamic Governing System)
 */

'use strict';

/**
 * 1. Kinetic Archetype: The structural UX and layout pattern of the motion.
 */
const KineticArchetype = Object.freeze({
  MAGNETIC_RAIL: 'magnetic-rail',       // Horizontal track, inertial snap, pinned rail
  REVEAL_MASK: 'reveal-mask',           // Clip-path / overflow split-text or curtain reveal
  DEPTH_FLOAT: 'depth-float',           // Z-axis parallax, 3D tilt, perspective orbit
  TACTILE_TRIGGER: 'tactile-trigger',   // Elastic button, press feedback, magnetic hover
  ACCORDION_FLOW: 'accordion-flow',     // Collapsible layout re-flow, height expansion
  STAGGERED_GRID: 'staggered-grid'      // Grid entry, staggered card cascading
});

/**
 * 2. Trigger Vector: The causal input vector initiating or driving the motion.
 */
const TriggerVector = Object.freeze({
  SCROLL_LINKED: 'scroll-linked',       // Driven 1:1 or with inertial lag by scroll progress
  POINTER_PROXIMITY: 'pointer-proximity', // Euclidean distance or hover cursor tracking
  STATE_DISCRETE: 'state-discrete',     // Triggered on route change, click, or tab toggle
  TIME_CONTINUOUS: 'time-continuous'    // Standing wave, ambient loop, tick-based RAF
});

/**
 * 3. Perceptual Criticality: The cognitive weight and performance priority.
 */
const PerceptualCriticality = Object.freeze({
  PRIMARY: 'primary',     // Center of visual attention; 60/120fps transform/opacity mandatory
  SECONDARY: 'secondary', // Contextual support; secondary CTA or badge microinteraction
  AMBIENT: 'ambient'      // Atmospheric backdrop; immediately degradable on low-spec hardware
});

/**
 * 4. Physical Regime: The underlying mathematical model governing the trajectory.
 */
const PhysicalRegime = Object.freeze({
  CRITICALLY_DAMPED_SPRING: 'critically-damped-spring', // zeta = 1.0; fastest arrival without overshoot
  UNDERDAMPED_SPRING: 'underdamped-spring',             // zeta < 1.0; elastic oscillation with harmonic rebound
  OVERDAMPED_SPRING: 'overdamped-spring',               // zeta > 1.0; heavy sluggish arrival
  CUBIC_BEZIER_SPLINE: 'cubic-bezier-spline',           // Parametric time-to-value bezier curve (P0..P3)
  LINEAR_DECAY: 'linear-decay'                          // Constant velocity deceleration
});

/**
 * Validates a kinetic taxonomy contract object.
 * 
 * @param {object} contract Kinetic contract containing the 4 dimensions
 * @returns {{ valid: boolean, errors: Array<string> }}
 */
function validateKineticTaxonomy(contract) {
  const errors = [];

  if (!contract || typeof contract !== 'object') {
    return { valid: false, errors: ['Taxonomy contract must be a non-null object'] };
  }

  const validArchetypes = Object.values(KineticArchetype);
  if (!validArchetypes.includes(contract.archetype)) {
    errors.push(`Invalid archetype "${contract.archetype}". Expected one of: ${validArchetypes.join(', ')}`);
  }

  const validTriggers = Object.values(TriggerVector);
  if (!validTriggers.includes(contract.trigger)) {
    errors.push(`Invalid trigger "${contract.trigger}". Expected one of: ${validTriggers.join(', ')}`);
  }

  const validCriticalities = Object.values(PerceptualCriticality);
  if (!validCriticalities.includes(contract.criticality)) {
    errors.push(`Invalid criticality "${contract.criticality}". Expected one of: ${validCriticalities.join(', ')}`);
  }

  const validRegimes = Object.values(PhysicalRegime);
  if (!validRegimes.includes(contract.physicalRegime)) {
    errors.push(`Invalid physicalRegime "${contract.physicalRegime}". Expected one of: ${validRegimes.join(', ')}`);
  }

  if (typeof contract.confidence === 'number') {
    if (contract.confidence < 0 || contract.confidence > 1) {
      errors.push(`Confidence score must be between 0 and 1, got ${contract.confidence}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Returns default taxonomy matrix defaults for a given archetype.
 * 
 * @param {string} archetype KineticArchetype value
 * @returns {object} Default taxonomy tuple
 */
function getDefaultTaxonomyForArchetype(archetype) {
  switch (archetype) {
    case KineticArchetype.MAGNETIC_RAIL:
      return {
        archetype: KineticArchetype.MAGNETIC_RAIL,
        trigger: TriggerVector.SCROLL_LINKED,
        criticality: PerceptualCriticality.PRIMARY,
        physicalRegime: PhysicalRegime.CUBIC_BEZIER_SPLINE
      };
    case KineticArchetype.REVEAL_MASK:
      return {
        archetype: KineticArchetype.REVEAL_MASK,
        trigger: TriggerVector.SCROLL_LINKED,
        criticality: PerceptualCriticality.PRIMARY,
        physicalRegime: PhysicalRegime.CUBIC_BEZIER_SPLINE
      };
    case KineticArchetype.DEPTH_FLOAT:
      return {
        archetype: KineticArchetype.DEPTH_FLOAT,
        trigger: TriggerVector.POINTER_PROXIMITY,
        criticality: PerceptualCriticality.AMBIENT,
        physicalRegime: PhysicalRegime.UNDERDAMPED_SPRING
      };
    case KineticArchetype.TACTILE_TRIGGER:
      return {
        archetype: KineticArchetype.TACTILE_TRIGGER,
        trigger: TriggerVector.POINTER_PROXIMITY,
        criticality: PerceptualCriticality.SECONDARY,
        physicalRegime: PhysicalRegime.CRITICALLY_DAMPED_SPRING
      };
    case KineticArchetype.ACCORDION_FLOW:
      return {
        archetype: KineticArchetype.ACCORDION_FLOW,
        trigger: TriggerVector.STATE_DISCRETE,
        criticality: PerceptualCriticality.PRIMARY,
        physicalRegime: PhysicalRegime.CUBIC_BEZIER_SPLINE
      };
    case KineticArchetype.STAGGERED_GRID:
      return {
        archetype: KineticArchetype.STAGGERED_GRID,
        trigger: TriggerVector.SCROLL_LINKED,
        criticality: PerceptualCriticality.PRIMARY,
        physicalRegime: PhysicalRegime.CUBIC_BEZIER_SPLINE
      };
    default:
      return {
        archetype: KineticArchetype.TACTILE_TRIGGER,
        trigger: TriggerVector.STATE_DISCRETE,
        criticality: PerceptualCriticality.SECONDARY,
        physicalRegime: PhysicalRegime.CUBIC_BEZIER_SPLINE
      };
  }
}

module.exports = {
  KineticArchetype,
  TriggerVector,
  PerceptualCriticality,
  PhysicalRegime,
  validateKineticTaxonomy,
  getDefaultTaxonomyForArchetype
};
