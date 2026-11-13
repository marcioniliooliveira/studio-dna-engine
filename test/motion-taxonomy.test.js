/**
 * test/motion-taxonomy.test.js
 * 
 * Studio DNA Engine v3.0 — JEV 2.0 Multidimensional Kinetic Taxonomy Test Suite
 * 
 * Verifies:
 * 1. Taxonomy Enums & Schema Validator
 * 2. Archetype Classifier across 6 Kinetic Archetypes
 * 3. Zag/XState FSM Registry & Universal Invariants (Preemption, Escape, Blur)
 * 4. Progressive Skill Generator (< 60 lines constraint)
 * 5. Full Pipeline & Backward Compatibility
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const {
  KineticArchetype,
  TriggerVector,
  PerceptualCriticality,
  PhysicalRegime,
  validateKineticTaxonomy,
  getDefaultTaxonomyForArchetype
} = require('../src/motion/taxonomy');

const {
  classifyKineticArchetype
} = require('../src/motion/archetype-classifier');

const {
  getFsmContractForArchetype,
  UNIVERSAL_SAFETY_TRANSITIONS
} = require('../src/motion/fsm-registry');

const {
  generateProgressiveSkillMarkdown
} = require('../src/motion/skill-generator');

const {
  classifyKineticContract,
  fitPhysicalTruthCurve,
  parameterizeAdaptiveSkill,
  generateSkillMarkdown
} = require('../src/motion/jev-classifier');

describe('JEV 2.0 Multidimensional Kinetic Taxonomy', () => {

  // =========================================================================
  // Group 1: Taxonomy Enums & Validation
  // =========================================================================
  describe('Group 1: Taxonomy Enums & Validation', () => {
    test('1.1 Enums contain valid frozen values across 4 dimensions', () => {
      assert.equal(KineticArchetype.MAGNETIC_RAIL, 'magnetic-rail');
      assert.equal(KineticArchetype.REVEAL_MASK, 'reveal-mask');
      assert.equal(KineticArchetype.DEPTH_FLOAT, 'depth-float');
      assert.equal(KineticArchetype.TACTILE_TRIGGER, 'tactile-trigger');
      assert.equal(KineticArchetype.ACCORDION_FLOW, 'accordion-flow');
      assert.equal(KineticArchetype.STAGGERED_GRID, 'staggered-grid');

      assert.equal(TriggerVector.SCROLL_LINKED, 'scroll-linked');
      assert.equal(TriggerVector.POINTER_PROXIMITY, 'pointer-proximity');
      assert.equal(TriggerVector.STATE_DISCRETE, 'state-discrete');
      assert.equal(TriggerVector.TIME_CONTINUOUS, 'time-continuous');

      assert.equal(PerceptualCriticality.PRIMARY, 'primary');
      assert.equal(PerceptualCriticality.SECONDARY, 'secondary');
      assert.equal(PerceptualCriticality.AMBIENT, 'ambient');

      assert.equal(PhysicalRegime.CRITICALLY_DAMPED_SPRING, 'critically-damped-spring');
      assert.equal(PhysicalRegime.UNDERDAMPED_SPRING, 'underdamped-spring');
      assert.equal(PhysicalRegime.OVERDAMPED_SPRING, 'overdamped-spring');
      assert.equal(PhysicalRegime.CUBIC_BEZIER_SPLINE, 'cubic-bezier-spline');
    });

    test('1.2 validateKineticTaxonomy approves complete and compliant contract', () => {
      const contract = {
        archetype: KineticArchetype.MAGNETIC_RAIL,
        trigger: TriggerVector.SCROLL_LINKED,
        criticality: PerceptualCriticality.PRIMARY,
        physicalRegime: PhysicalRegime.CUBIC_BEZIER_SPLINE,
        confidence: 0.92
      };

      const result = validateKineticTaxonomy(contract);
      assert.equal(result.valid, true);
      assert.equal(result.errors.length, 0);
    });

    test('1.3 validateKineticTaxonomy catches invalid or missing dimensions', () => {
      const invalidContract = {
        archetype: 'non-existent-archetype',
        trigger: 'random-trigger',
        criticality: 'ultra',
        physicalRegime: 'quantum-oscillator',
        confidence: 1.5
      };

      const result = validateKineticTaxonomy(invalidContract);
      assert.equal(result.valid, false);
      assert.ok(result.errors.length >= 4);
      assert.ok(result.errors.some(e => e.includes('Invalid archetype')));
      assert.ok(result.errors.some(e => e.includes('Confidence score must be between 0 and 1')));
    });

    test('1.4 getDefaultTaxonomyForArchetype provides valid defaults for all archetypes', () => {
      for (const arch of Object.values(KineticArchetype)) {
        const def = getDefaultTaxonomyForArchetype(arch);
        const val = validateKineticTaxonomy(def);
        assert.equal(val.valid, true, `Default taxonomy for ${arch} must be valid`);
      }
    });
  });

  // =========================================================================
  // Group 2: Archetype Classifier
  // =========================================================================
  describe('Group 2: Archetype Classifier', () => {
    test('2.1 Classifies magnetic-rail from horizontal scroll and pin-spacer patterns', () => {
      const input = {
        styles: `
          .work-horizontal { overflow-x: scroll; display: flex; }
          .pin-spacer { transform: translateX(-5760px); }
        `,
        capsuleSlug: 'khanhnguyen-design--work-horizontal-rail'
      };

      const result = classifyKineticArchetype(input);
      assert.equal(result.archetype, KineticArchetype.MAGNETIC_RAIL);
      assert.equal(result.trigger, TriggerVector.SCROLL_LINKED);
      assert.equal(result.criticality, PerceptualCriticality.PRIMARY);
      assert.ok(result.confidence > 0.5);
    });

    test('2.2 Classifies reveal-mask from clip-path and split-text headline markup', () => {
      const input = {
        styles: `
          .hero-headline { overflow: hidden; clip-path: inset(0 0 0 0); }
          .char-mask { transform: translateY(100%); }
        `,
        domHtml: '<h1 class="hero-headline" data-split-text="chars">Transform Future</h1>',
        capsuleSlug: 'acme--hero-text-reveal'
      };

      const result = classifyKineticArchetype(input);
      assert.equal(result.archetype, KineticArchetype.REVEAL_MASK);
      assert.equal(result.trigger, TriggerVector.SCROLL_LINKED);
      assert.equal(result.criticality, PerceptualCriticality.PRIMARY);
      assert.ok(result.confidence >= 0.5);
    });

    test('2.3 Classifies depth-float from 3D perspective and parallax attributes', () => {
      const input = {
        styles: `
          .card-3d { perspective: 1000px; transform-style: preserve-3d; }
          .layer { transform: translateZ(50px) rotateX(15deg); }
        `,
        capsuleSlug: 'backdrop-3d-orbit-depth'
      };

      const result = classifyKineticArchetype(input);
      assert.equal(result.archetype, KineticArchetype.DEPTH_FLOAT);
      assert.equal(result.criticality, PerceptualCriticality.AMBIENT);
      assert.ok(result.confidence >= 0.5);
    });

    test('2.4 Classifies tactile-trigger from button hover and scale transitions', () => {
      const input = {
        styles: `
          .btn-primary:hover { transform: scale(1.05); filter: brightness(1.2); }
          .btn-primary:active { transform: scale(0.95); }
          .btn-primary { cursor: pointer; transition: transform 0.2s ease; }
        `,
        capsuleSlug: 'submit-action-button'
      };

      const result = classifyKineticArchetype(input);
      assert.equal(result.archetype, KineticArchetype.TACTILE_TRIGGER);
      assert.equal(result.trigger, TriggerVector.POINTER_PROXIMITY);
      assert.equal(result.criticality, PerceptualCriticality.SECONDARY);
    });

    test('2.5 Inferred harmonic spring parameters guide physicalRegime', () => {
      // Underdamped spring (zeta = 0.5)
      const inputUnderdamped = {
        styles: '.work-horizontal { transform: translateX(0); }',
        springParams: { zeta: 0.5, omegaN: 14 }
      };
      const resUnder = classifyKineticArchetype(inputUnderdamped);
      assert.equal(resUnder.physicalRegime, PhysicalRegime.UNDERDAMPED_SPRING);

      // Critically damped spring (zeta = 1.0)
      const inputCrit = {
        styles: '.btn { cursor: pointer; }',
        springParams: { zeta: 1.02, omegaN: 18 }
      };
      const resCrit = classifyKineticArchetype(inputCrit);
      assert.equal(resCrit.physicalRegime, PhysicalRegime.CRITICALLY_DAMPED_SPRING);
    });
  });

  // =========================================================================
  // Group 3: Zag/XState FSM Registry
  // =========================================================================
  describe('Group 3: Zag/XState FSM Registry', () => {
    test('3.1 Generates magnetic-rail FSM with preemption and clamp bounds', () => {
      const fsm = getFsmContractForArchetype(KineticArchetype.MAGNETIC_RAIL, {
        capsuleSlug: 'khanhnguyen-work',
        scaleVarName: '--scale'
      });

      assert.equal(fsm.id, 'khanhnguyen-work-magnetic-rail-fsm');
      assert.equal(fsm.initial, 'idle');
      assert.ok(fsm.states.tracking);
      assert.ok(fsm.states.crossfading);
      assert.ok(fsm.states.settling);
      assert.ok(fsm.states.crossfading.entry.includes('killTweensOf'));
      assert.equal(fsm.invariants.preemptible, true);
    });

    test('3.2 Universal safety transitions: ESCAPE, WINDOW_BLUR, REDUCED_MOTION present in all states', () => {
      for (const arch of Object.values(KineticArchetype)) {
        const fsm = getFsmContractForArchetype(arch, { capsuleSlug: 'test-capsule' });
        for (const [stateName, stateDef] of Object.entries(fsm.states)) {
          assert.ok(stateDef.on.ESCAPE, `${arch} state ${stateName} must handle ESCAPE`);
          assert.equal(stateDef.on.ESCAPE.target, 'idle');
          assert.ok(stateDef.on.WINDOW_BLUR, `${arch} state ${stateName} must handle WINDOW_BLUR`);
          assert.equal(stateDef.on.WINDOW_BLUR.target, 'idle');
        }
      }
    });
  });

  // =========================================================================
  // Group 4: Progressive Skill Markdown Generator
  // =========================================================================
  describe('Group 4: Progressive Skill Markdown Generator', () => {
    test('4.1 Emits complete markdown with all 4 sections strictly under 60 lines', () => {
      const taxonomy = {
        archetype: KineticArchetype.MAGNETIC_RAIL,
        trigger: TriggerVector.SCROLL_LINKED,
        criticality: PerceptualCriticality.PRIMARY,
        physicalRegime: PhysicalRegime.CUBIC_BEZIER_SPLINE
      };

      const physicalTruth = {
        cssCubicBezier: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        durationMs: 450,
        harmonicSpring: { zeta: 0.85, omegaN: 12.0 }
      };

      const adaptiveSkill = {
        scaleVarName: '--scale',
        fluidMathExpression: 'calc(-1 * var(--scale))'
      };

      const fsmContract = getFsmContractForArchetype(KineticArchetype.MAGNETIC_RAIL);

      const markdown = generateProgressiveSkillMarkdown({
        capsuleSlug: 'khanhnguyen-work',
        taxonomy,
        physicalTruth,
        adaptiveSkill,
        fsmContract
      });

      const lines = markdown.split('\n');
      assert.ok(lines.length < 60, `Markdown must be strictly < 60 lines, got ${lines.length}`);
      assert.ok(lines.length >= 15, `Markdown must contain substantive sections, got ${lines.length}`);
      assert.ok(markdown.includes('UX Intent & Archetype'));
      assert.ok(markdown.includes('Physical Truth & Curve Parameters'));
      assert.ok(markdown.includes('Parametric Adaptive Math'));
      assert.ok(markdown.includes('Zag/XState Interruption FSM'));
      assert.ok(markdown.includes('prefers-reduced-motion'));
    });
  });

  // =========================================================================
  // Group 5: Integrated Pipeline & Backward Compatibility
  // =========================================================================
  describe('Group 5: Integrated Pipeline & Backward Compatibility', () => {
    test('5.1 classifyKineticContract synthesizes complete JEV 2.0 contract and retains backward compatibility', () => {
      const result = classifyKineticContract({
        styles: `
          section[data-section="home-work"] { overflow-x: scroll; }
          .track { transform: translateX(calc(-1 * var(--scale))); transition: transform 0.45s cubic-bezier(0.215, 0.61, 0.355, 1); }
        `,
        capsuleSlug: 'khanhnguyen-design--work-horizontal-rail',
        scaleVarName: '--scale'
      });

      // Backward compatible fields
      assert.ok(result.physicalTruth);
      assert.ok(result.adaptiveSkill);
      assert.ok(result.motionContract);
      assert.ok(result.skillMarkdown);

      // JEV 2.0 fields
      assert.ok(result.taxonomy);
      assert.equal(result.taxonomy.archetype, KineticArchetype.MAGNETIC_RAIL);
      assert.equal(result.taxonomy.trigger, TriggerVector.SCROLL_LINKED);
      assert.equal(result.taxonomy.criticality, PerceptualCriticality.PRIMARY);
      assert.ok(result.fsmContract);
      assert.ok(result.fsmContract.states.tracking);

      // Markdown line budget constraint
      const markdownLines = result.skillMarkdown.split('\n');
      assert.ok(markdownLines.length < 60, `Skill markdown must have < 60 lines, got ${markdownLines.length}`);

      // Motion contract schema structure
      assert.equal(result.motionContract.schemaVersion, '3.0.0');
      assert.equal(result.motionContract.taxonomy.archetype, KineticArchetype.MAGNETIC_RAIL);
    });
  });
});
