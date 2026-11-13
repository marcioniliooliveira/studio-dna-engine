/**
 * src/motion/archetype-classifier.js
 * 
 * Studio DNA Engine v3.0 — JEV 2.0 Archetype Classifier
 * 
 * Classifies raw CSS declarations, DOM markup structures, and motion parameters
 * into the 4-dimensional kinetic taxonomy with scored confidence.
 */

'use strict';

const {
  KineticArchetype,
  TriggerVector,
  PerceptualCriticality,
  PhysicalRegime,
  getDefaultTaxonomyForArchetype,
  validateKineticTaxonomy
} = require('./taxonomy');

/**
 * Weighted classification patterns for archetypes.
 */
const ARCHETYPE_PATTERNS = [
  {
    archetype: KineticArchetype.MAGNETIC_RAIL,
    patterns: [
      /overflow-x\s*:\s*(?:scroll|auto|hidden)/i,
      /transform\s*:\s*translateX/i,
      /pin-spacer|horizontal-rail|track-container|scroll-rail/i,
      /data-section\s*=\s*["'][^"']*(?:work|gallery|rail|slider|carousel)[^"']*["']/i,
      /\.work-horizontal|\.rail-track|\.horizontal-slider/i
    ],
    weight: 25
  },
  {
    archetype: KineticArchetype.REVEAL_MASK,
    patterns: [
      /clip-path\s*:\s*(?:inset|polygon|rect|circle)/i,
      /mask-image\s*:\s*/i,
      /overflow\s*:\s*hidden(?=[\s\S]*?(?:h[1-6]|span|title|headline|char|word))/i,
      /split-text|char-mask|word-mask|text-reveal/i,
      /data-split-text|data-reveal/i
    ],
    weight: 25
  },
  {
    archetype: KineticArchetype.DEPTH_FLOAT,
    patterns: [
      /perspective\s*:\s*[\d]+px/i,
      /transform-style\s*:\s*preserve-3d/i,
      /translateZ|rotateX|rotateY/i,
      /parallax|orbit|depth-layer|3d-tilt/i,
      /data-depth|data-parallax/i
    ],
    weight: 25
  },
  {
    archetype: KineticArchetype.TACTILE_TRIGGER,
    patterns: [
      /:hover(?=[\s\S]*?(?:scale|transform|translateY|brightness))/i,
      /:active(?=[\s\S]*?(?:scale|transform))/i,
      /cursor\s*:\s*pointer/i,
      /btn|button|cta-link|magnetic-button|ripple/i,
      /data-button|data-trigger|data-action/i
    ],
    weight: 20
  },
  {
    archetype: KineticArchetype.ACCORDION_FLOW,
    patterns: [
      /details(?:\s|>)|summary(?:\s|>)/i,
      /accordion|collapse-panel|faq-item/i,
      /grid-template-rows\s*:\s*0fr/i,
      /max-height\s*:\s*(?:0|none)/i
    ],
    weight: 25
  },
  {
    archetype: KineticArchetype.STAGGERED_GRID,
    patterns: [
      /display\s*:\s*grid/i,
      /animation-delay\s*:\s*calc/i,
      /stagger|card-grid|stagger-item/i,
      /data-stagger/i
    ],
    weight: 20
  }
];

/**
 * Classifies the kinetic archetype from static styles, markup, and identifiers.
 * 
 * @param {object} input
 * @param {string} [input.styles=''] Scoped or extracted CSS styles
 * @param {string} [input.domHtml=''] HTML markup of the section
 * @param {string} [input.capsuleSlug=''] Slug or identifier of the capsule
 * @param {object} [input.springParams] Inferred spring parameters { zeta, omegaN }
 * @param {string} [input.bezierString] Inferred or explicit cubic-bezier string
 * @returns {object} Classified taxonomy contract { archetype, trigger, criticality, physicalRegime, confidence, indicators }
 */
function classifyKineticArchetype(input = {}) {
  const styles = input.styles || '';
  const domHtml = input.domHtml || '';
  const capsuleSlug = input.capsuleSlug || '';
  const corpus = `${capsuleSlug}\n${styles}\n${domHtml}`;

  const scores = {};
  const matchedIndicators = {};

  for (const group of ARCHETYPE_PATTERNS) {
    let score = 0;
    const matches = [];

    for (const pattern of group.patterns) {
      if (pattern.test(corpus)) {
        score += group.weight;
        matches.push(pattern.source);
      }
    }

    scores[group.archetype] = score;
    matchedIndicators[group.archetype] = matches;
  }

  // Sort archetypes by score descending
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const best = sorted[0];

  let selectedArchetype = KineticArchetype.TACTILE_TRIGGER;
  let maxScore = 0;

  if (best && best[1] > 0) {
    selectedArchetype = best[0];
    maxScore = best[1];
  } else if (/rail|work|gallery|horizontal/i.test(capsuleSlug)) {
    selectedArchetype = KineticArchetype.MAGNETIC_RAIL;
    maxScore = 30;
  }

  // Compute confidence bounded in [0.25, 0.99]
  const confidence = Math.min(0.99, Math.max(0.25, parseFloat((maxScore / 75).toFixed(2))));

  // Derive trigger vector
  let trigger = TriggerVector.SCROLL_LINKED;
  if (/pointer|cursor|hover|mousemove|tactile/i.test(corpus) && selectedArchetype === KineticArchetype.TACTILE_TRIGGER) {
    trigger = TriggerVector.POINTER_PROXIMITY;
  } else if (/modal|tab|dialog|toggle|collapse|accordion/i.test(corpus) || selectedArchetype === KineticArchetype.ACCORDION_FLOW) {
    trigger = TriggerVector.STATE_DISCRETE;
  } else if (/infinite|loop|orbit|standing-wave/i.test(corpus)) {
    trigger = TriggerVector.TIME_CONTINUOUS;
  } else {
    trigger = getDefaultTaxonomyForArchetype(selectedArchetype).trigger;
  }

  // Derive perceptual criticality
  let criticality = getDefaultTaxonomyForArchetype(selectedArchetype).criticality;
  if (/ambient|bg|backdrop|starfield|particles/i.test(capsuleSlug)) {
    criticality = PerceptualCriticality.AMBIENT;
  } else if (/hero|main|headline|primary|work/i.test(capsuleSlug)) {
    criticality = PerceptualCriticality.PRIMARY;
  }

  // Derive physical regime from spring/bezier physics if available
  let physicalRegime = getDefaultTaxonomyForArchetype(selectedArchetype).physicalRegime;
  if (input.springParams && typeof input.springParams.zeta === 'number') {
    const zeta = input.springParams.zeta;
    if (Math.abs(zeta - 1.0) <= 0.1) {
      physicalRegime = PhysicalRegime.CRITICALLY_DAMPED_SPRING;
    } else if (zeta < 0.9) {
      physicalRegime = PhysicalRegime.UNDERDAMPED_SPRING;
    } else {
      physicalRegime = PhysicalRegime.OVERDAMPED_SPRING;
    }
  } else if (input.bezierString) {
    physicalRegime = PhysicalRegime.CUBIC_BEZIER_SPLINE;
  }

  const contract = {
    archetype: selectedArchetype,
    trigger,
    criticality,
    physicalRegime,
    confidence,
    indicators: matchedIndicators[selectedArchetype] || []
  };

  validateKineticTaxonomy(contract);

  return contract;
}

module.exports = {
  classifyKineticArchetype,
  ARCHETYPE_PATTERNS
};
