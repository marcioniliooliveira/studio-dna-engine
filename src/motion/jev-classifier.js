/**
 * src/motion/jev-classifier.js
 * 
 * Studio DNA Engine v3.0 — JEV 2.0 Kinetic Classifier & Progressive Skill Generator
 * 
 * Mathematical & Architectural Foundations:
 * - 4-Dimensional Orthogonal Taxonomy: Archetype, Trigger, Criticality, and Physical Regime.
 * - Layer 1 (Physical Truth): Discrete trajectory parameterization using fitEasingToMultiSegmentBezier,
 *   canonical named easing mapping, and harmonic spring parameter identification (zeta, omegaN).
 * - Layer 2 (Adaptive Parametric Skill): Conversion of fixed pixel offsets to responsive calc(...)
 *   formulas pegged to --scale, Zag/XState-style interruption FSM with killTweensOf and Escape reset.
 * - Progressive Disclosure: Operational manifesto strictly < 60 lines.
 */

'use strict';

const { fitEasingToMultiSegmentBezier } = require('../kinetic/bezier-fitter');
const { identifySystem } = require('../physics/inverse-system-id');

const {
  KineticArchetype,
  TriggerVector,
  PerceptualCriticality,
  PhysicalRegime,
  validateKineticTaxonomy,
  getDefaultTaxonomyForArchetype
} = require('./taxonomy');

const { classifyKineticArchetype, ARCHETYPE_PATTERNS } = require('./archetype-classifier');
const { getFsmContractForArchetype, UNIVERSAL_SAFETY_TRANSITIONS } = require('./fsm-registry');
const { generateProgressiveSkillMarkdown } = require('./skill-generator');

// Standard CSS and GSAP named easing mapping to W3C cubic-bezier
const NAMED_EASINGS = {
  'power1.in': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  'power1.out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  'power1.inOut': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  'power2.in': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  'power2.out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  'power2.inOut': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  'power3.in': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  'power3.out': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  'power3.inOut': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  'power4.in': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  'power4.out': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  'power4.inOut': 'cubic-bezier(0.77, 0, 0.175, 1)',
  'expo.in': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  'expo.out': 'cubic-bezier(0.19, 1, 0.22, 1)',
  'expo.inOut': 'cubic-bezier(1, 0, 0, 1)',
  'sine.in': 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  'sine.out': 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  'sine.inOut': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  'ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
  'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
  'linear': 'cubic-bezier(0, 0, 1, 1)'
};

/**
 * Parses a CSS cubic-bezier(x1, y1, x2, y2) string into 4 control points.
 * 
 * @param {string} bezierStr CSS cubic-bezier string
 * @returns {Array<[number, number]>} Array of 4 control points
 */
function parseCubicBezierString(bezierStr) {
  const match = bezierStr.match(/cubic-bezier\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\)/);
  if (!match) {
    return [[0, 0], [0, 0], [1, 1], [1, 1]];
  }
  const x1 = parseFloat(match[1]);
  const y1 = parseFloat(match[2]);
  const x2 = parseFloat(match[3]);
  const y2 = parseFloat(match[4]);
  return [[0, 0], [x1, y1], [x2, y2], [1, 1]];
}

/**
 * Layer 1: Physical Truth Curve Fitting.
 * 
 * @param {object} options
 * @param {Array<object|Array<number>>} [options.samples] Trajectory samples [{t, val}] or [[t, val]]
 * @param {string} [options.namedEasing] Named easing keyword
 * @param {string} [options.cssCubicBezier] Explicit cubic-bezier string
 * @param {number} [options.durationMs=450] Duration in milliseconds
 * @param {number} [options.delayMs=0] Delay in milliseconds
 * @returns {object} Layer 1 physical truth contract
 */
function fitPhysicalTruthCurve(options = {}) {
  let controlPoints = null;
  let beziers = [];
  let cssCubicBezier = null;
  let durationMs = options.durationMs || 450;
  let delayMs = options.delayMs || 0;
  let harmonicSpring = null;

  // 1. If trajectory samples are provided
  if (Array.isArray(options.samples) && options.samples.length >= 4) {
    try {
      const normalizedSamples = options.samples.map(s => {
        if (Array.isArray(s)) return [s[0], s[1]];
        return [s.t || s.time || 0, s.val || s.value || s.x || 0];
      });

      const fitResult = fitEasingToMultiSegmentBezier(normalizedSamples, 0.05);
      if (fitResult && fitResult.length >= 4) {
        controlPoints = fitResult.slice(0, 4);
        beziers = [controlPoints];
        cssCubicBezier = `cubic-bezier(${controlPoints[1][0].toFixed(3)}, ${controlPoints[1][1].toFixed(3)}, ${controlPoints[2][0].toFixed(3)}, ${controlPoints[2][1].toFixed(3)})`;
      }
    } catch (e) {
      // Fallback on curve fit failure
    }

    // Attempt harmonic system identification
    try {
      const sysIdResult = identifySystem(options.samples, { dt: 0.016 });
      if (sysIdResult) {
        harmonicSpring = {
          zeta: sysIdResult.zeta || 0.85,
          omegaN: sysIdResult.omegaN || 12.0
        };
      }
    } catch (e) {
      // Fallback
    }
  }

  // 2. If explicit named easing, cubic-bezier provided, or fallback on degenerate samples
  if (!cssCubicBezier) {
    if (options.namedEasing && NAMED_EASINGS[options.namedEasing]) {
      cssCubicBezier = NAMED_EASINGS[options.namedEasing];
    } else if (options.cssCubicBezier) {
      cssCubicBezier = options.cssCubicBezier;
    } else {
      cssCubicBezier = NAMED_EASINGS['power3.out'];
    }
    controlPoints = parseCubicBezierString(cssCubicBezier);
    beziers = [controlPoints];
  }

  if (!harmonicSpring) {
    harmonicSpring = {
      zeta: 0.85,
      omegaN: 12.0
    };
  }

  return {
    curveType: 'cubic-bezier',
    cssCubicBezier,
    controlPoints,
    beziers,
    durationMs,
    delayMs,
    harmonicSpring
  };
}

/**
 * Layer 2: Adaptive Parametric Skill Parameterization.
 * 
 * @param {object} options
 * @param {string} [options.scaleVarName='--scale'] CSS custom property name
 * @param {string} [options.capsuleSlug='capsule'] Capsule identifier
 * @returns {object} Layer 2 adaptive skill contract
 */
function parameterizeAdaptiveSkill(options = {}) {
  const scaleVarName = options.scaleVarName || '--scale';
  const capsuleSlug = options.capsuleSlug || 'capsule';

  return {
    scaleVarName,
    fluidMathExpression: `calc(-1 * var(${scaleVarName}))`,
    relativeTransforms: {
      arrow: {
        resting: `translate(calc(-1 * var(${scaleVarName})), calc(1 * var(${scaleVarName}))) scale(0.6)`,
        active: 'translate(0) scale(1)',
        origin: 'left bottom'
      }
    },
    interruptionFsm: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            HOVER_ENTER: 'crossfading'
          }
        },
        crossfading: {
          action: 'killTweensOf(previousTarget)',
          on: {
            EXPAND_READY: 'active',
            HOVER_LEAVE: 'resetting',
            ESCAPE: 'idle',
            BLUR: 'idle'
          }
        },
        active: {
          on: {
            HOVER_LEAVE: 'resetting',
            ESCAPE: 'idle',
            BLUR: 'idle'
          }
        },
        resetting: {
          on: {
            RESET_DONE: 'idle',
            HOVER_ENTER: 'crossfading',
            ESCAPE: 'idle',
            BLUR: 'idle'
          }
        }
      },
      resilienceHandlers: {
        escapeKey: "window.addEventListener('keydown', e => { if (e.key === 'Escape') send('ESCAPE'); })",
        windowBlur: "window.addEventListener('blur', () => send('BLUR'))"
      }
    },
    reducedMotionRule: `@media (prefers-reduced-motion: reduce) {\n  [data-capsule-id="${capsuleSlug}"] * {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n    transform: none !important;\n    scroll-behavior: auto !important;\n  }\n}`
  };
}

/**
 * Progressive Disclosure SKILL.md Generator (< 60 lines).
 * 
 * @param {object} params
 * @param {string} params.capsuleSlug
 * @param {object} params.physicalTruth
 * @param {object} params.adaptiveSkill
 * @param {object} [params.taxonomy]
 * @param {object} [params.fsmContract]
 * @returns {string} Markdown text strictly < 60 lines
 */
function generateSkillMarkdown(params = {}) {
  const slug = params.capsuleSlug || 'capsule-kinetic-skill';
  const pt = params.physicalTruth || {};
  const as = params.adaptiveSkill || {};
  const tax = params.taxonomy || {
    archetype: 'magnetic-rail',
    trigger: 'scroll-linked',
    criticality: 'primary',
    physicalRegime: 'cubic-bezier-spline'
  };

  const lines = [
    `# Kinetic Skill: ${slug}`,
    `> Archetype: **${tax.archetype}** | Trigger: **${tax.trigger}** | Criticality: **${tax.criticality}** | Regime: **${tax.physicalRegime}**`,
    ``,
    `## 1. UX Intent`,
    `- Tactile list item hover tracking with responsive directional arrow indicator.`,
    `- Pattern: \`${tax.archetype}\` driven by \`${tax.trigger}\` (Priority: \`${tax.criticality}\`).`,
    `- Smooth continuity: switching items crossfades without flashing placeholder backdrop.`,
    ``,
    `## 2. Physical Truth & Curves`,
    `- Trajectory: ${pt.cssCubicBezier || 'cubic-bezier(0.215, 0.61, 0.355, 1)'} (Schneider fit).`,
    `- Duration: ${pt.durationMs || 450}ms | Opacity fade: 300ms ease-out.`,
    `- Damping: Underdamped rapid settling without overshoot (zeta = ${pt.harmonicSpring?.zeta ?? 0.85}).`,
    ``,
    `## 3. Parametric Adaptive Math`,
    `- Arrow rest: \`translate(calc(-1 * var(${as.scaleVarName || '--scale'})), calc(1 * var(${as.scaleVarName || '--scale'}))) scale(0.6)\`.`,
    `- Arrow active: \`translate(0) scale(1)\` | Origin: left bottom.`,
    `- Scale token: Fluid calc(100vw / 144) on desktop, calc(100vw / 39) on mobile.`,
    ``,
    `## 4. Interruption FSM & Resilience`,
    `- States: idle -> crossfading -> active -> resetting.`,
    `- Overlap prevention: killTweensOf(previousTarget) before triggering new expand.`,
    `- Emergency reset: Escape keydown or window blur instantly restores idle state.`,
    ``,
    `## 5. Accessibility & Reduced Motion`,
    `- Rule: @media (prefers-reduced-motion: reduce) forces 0.01ms duration and transform: none.`,
    `- Instant swap: Visual state toggles immediately without vestibular disorientation.`
  ];

  const content = lines.join('\n');
  const totalLines = content.split('\n').length;

  if (totalLines >= 60) {
    throw new Error(`SKILL.md violation: generated document has ${totalLines} lines (strictly required < 60)`);
  }

  return content;
}

/**
 * Main entry point for JEV kinetic classification.
 * 
 * @param {object} options
 * @param {Array<object>} [options.traces] Recorded CDP animation trajectory traces
 * @param {object|string} [options.styles] Inline or extracted CSS styles
 * @param {string} [options.domHtml] DOM markup of the section
 * @param {string} [options.scaleVarName='--scale'] CSS custom property name for scaling
 * @param {string} [options.capsuleSlug='capsule'] Unique capsule identifier
 * @returns {object} Combined kinetic contract, taxonomy, FSM, motion-contract.json and SKILL.md
 */
function classifyKineticContract(options = {}) {
  const capsuleSlug = options.capsuleSlug || 'capsule';
  const scaleVarName = options.scaleVarName || '--scale';

  let samples = null;
  let namedEasing = 'power3.out';
  let cssCubicBezier = 'cubic-bezier(0.22, 1, 0.36, 1)';
  let durationMs = 450;

  // Extract from traces if available
  if (Array.isArray(options.traces) && options.traces.length > 0) {
    samples = options.traces;
  }

  // Parse styles if string
  if (typeof options.styles === 'string') {
    const cbMatch = options.styles.match(/cubic-bezier\([^)]+\)/);
    if (cbMatch) {
      cssCubicBezier = cbMatch[0];
    }
    const durMatch = options.styles.match(/(\d+(?:\.\d+)?)s/);
    if (durMatch) {
      durationMs = parseFloat(durMatch[1]) * 1000;
    }
  }

  // Layer 1: Physical Truth
  const physicalTruth = fitPhysicalTruthCurve({
    samples,
    namedEasing,
    cssCubicBezier,
    durationMs
  });

  // Multidimensional Taxonomy Classification (JEV 2.0)
  const taxonomy = classifyKineticArchetype({
    styles: options.styles,
    domHtml: options.domHtml,
    capsuleSlug,
    springParams: physicalTruth.harmonicSpring,
    bezierString: physicalTruth.cssCubicBezier
  });

  // Archetype-tailored Zag/XState FSM
  const fsmContract = getFsmContractForArchetype(taxonomy.archetype, {
    capsuleSlug,
    scaleVarName
  });

  // Layer 2: Adaptive Skill
  const adaptiveSkill = parameterizeAdaptiveSkill({
    scaleVarName,
    capsuleSlug
  });

  // Progressive SKILL.md (< 60 lines)
  const skillMarkdown = generateSkillMarkdown({
    capsuleSlug,
    physicalTruth,
    adaptiveSkill,
    taxonomy,
    fsmContract
  });

  // Machine-readable motion-contract.json
  const motionContract = {
    schemaVersion: '3.0.0',
    capsuleSlug,
    generatedAt: new Date().toISOString(),
    taxonomy,
    fsmContract,
    layer1_physicalTruth: physicalTruth,
    layer2_adaptiveSkill: adaptiveSkill
  };

  return {
    capsuleSlug,
    taxonomy,
    fsmContract,
    physicalTruth,
    adaptiveSkill,
    motionContract,
    skillMarkdown
  };
}

module.exports = {
  classifyKineticContract,
  fitPhysicalTruthCurve,
  parameterizeAdaptiveSkill,
  generateSkillMarkdown,
  generateProgressiveSkillMarkdown,
  parseCubicBezierString,
  NAMED_EASINGS,
  KineticArchetype,
  TriggerVector,
  PerceptualCriticality,
  PhysicalRegime,
  classifyKineticArchetype,
  getFsmContractForArchetype,
  validateKineticTaxonomy,
  getDefaultTaxonomyForArchetype,
  ARCHETYPE_PATTERNS,
  UNIVERSAL_SAFETY_TRANSITIONS
};
