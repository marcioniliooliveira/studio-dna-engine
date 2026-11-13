/**
 * src/motion/skill-generator.js
 * 
 * Studio DNA Engine v3.0 — JEV 2.0 Progressive Skill Markdown Generator
 * 
 * Generates an operational, agent-readable SKILL.md strictly constrained
 * under the 60-line progressive disclosure budget.
 */

'use strict';

/**
 * Generates the progressive disclosure SKILL.md.
 * 
 * @param {object} options
 * @param {string} options.capsuleSlug Capsule identifier
 * @param {object} options.taxonomy Taxonomy contract { archetype, trigger, criticality, physicalRegime }
 * @param {object} options.physicalTruth Layer 1 physical truth object
 * @param {object} options.adaptiveSkill Layer 2 adaptive skill object
 * @param {object} options.fsmContract FSM configuration object
 * @returns {string} Emitted markdown strictly < 60 lines
 */
function generateProgressiveSkillMarkdown(options = {}) {
  const capsuleSlug = options.capsuleSlug || 'capsule';
  const taxonomy = options.taxonomy || {
    archetype: 'magnetic-rail',
    trigger: 'scroll-linked',
    criticality: 'primary',
    physicalRegime: 'cubic-bezier-spline'
  };
  const physicalTruth = options.physicalTruth || {};
  const adaptiveSkill = options.adaptiveSkill || {};
  const fsm = options.fsmContract || {};

  const bezierStr = physicalTruth.cssCubicBezier || 'cubic-bezier(0.215, 0.61, 0.355, 1)';
  const duration = physicalTruth.durationMs || 450;
  const scaleVar = adaptiveSkill.scaleVarName || '--scale';
  const fluidMath = adaptiveSkill.fluidMathExpression || `calc(-1 * var(${scaleVar}))`;

  const lines = [
    `# Skill: ${capsuleSlug} Kinetic Contract`,
    `> Archetype: **${taxonomy.archetype}** | Trigger: **${taxonomy.trigger}** | Criticality: **${taxonomy.criticality}** | Regime: **${taxonomy.physicalRegime}**`,
    ``,
    `## 1. UX Intent & Archetype`,
    `- Pattern: \`${taxonomy.archetype}\` driven by \`${taxonomy.trigger}\` (Priority: \`${taxonomy.criticality}\`).`,
    `- Dynamic Model: \`${taxonomy.physicalRegime}\` enforcing seamless input tracking.`,
    ``,
    `## 2. Physical Truth & Curve Parameters`,
    `- Curve: \`${bezierStr}\` (duration: \`${duration}ms\`).`,
    `- Control Points: \`${JSON.stringify(physicalTruth.controlPoints || [[0,0],[0.21,0.61],[0.35,1],[1,1]])}\`.`,
    `- Damping: \`zeta: ${physicalTruth.harmonicSpring?.zeta ?? 0.85}\`, \`omegaN: ${physicalTruth.harmonicSpring?.omegaN ?? 12.0} rad/s\`.`,
    ``,
    `## 3. Parametric Adaptive Math`,
    `- Fluid Transform: \`translateX(${fluidMath})\`.`,
    `- Rule: Peg rigid pixel offsets to \`var(${scaleVar})\` to preserve viewport proportionality.`,
    ``,
    `## 4. Zag/XState Interruption FSM & Reduced Motion`,
    `- States: \`${Object.keys(fsm.states || { idle: 1, tracking: 1, crossfading: 1, settling: 1 }).join(', ')}\`.`,
    `- Invariants: \`killTweensOf()\` on crossfade; \`Escape\` and \`window.blur\` force reset to \`idle\`.`,
    `- Accessibility: \`@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transform: none !important; } }\`.`
  ];

  const content = lines.join('\n');
  const lineCount = lines.length;

  if (lineCount >= 60) {
    throw new Error(`Progressive disclosure constraint violated: SKILL.md has ${lineCount} lines (strictly < 60 required)`);
  }

  return content;
}

module.exports = {
  generateProgressiveSkillMarkdown
};
