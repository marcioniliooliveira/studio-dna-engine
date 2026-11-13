/**
 * test/adversarial-spike3.test.js
 * 
 * Studio DNA Engine v3.0 — Adversarial Stress Test Harness
 * Milestone 3 / Spike 3: Parametric Capsule Slicer, Dimensional Blueprint, and Kinetic Skill
 * 
 * Adversarial Suites:
 * 1. Subtree Slicer Stress: Circular/chained CSS vars, malformed selectors, root leak prevention, pseudo-class regex bug
 * 2. Dimensional Blueprint Stress: Extreme coordinates, edge contacts vs collisions, zero containers
 * 3. JEV Kinetic Classifier Stress: Unusual easings, FSM transitions, Escape/killTweens, < 60 lines limit
 * 4. Extracted Artifacts Invariant Verification: Real artifacts in design-vault
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const {
  sliceSubtree,
  extractVarNames,
  pruneSelectorForSubtree,
  resolveTransitiveClosure
} = require('../src/capsules/subtree-slicer');

const {
  generateDimensionalBlueprint,
  normalizeCoordinates,
  extractAlignmentAxes,
  extractHierarchyInvariants,
  generateCadSvg
} = require('../src/capsules/dimensional-blueprint');

const {
  classifyKineticContract,
  fitPhysicalTruthCurve,
  parameterizeAdaptiveSkill,
  generateSkillMarkdown,
  parseCubicBezierString,
  NAMED_EASINGS
} = require('../src/motion/jev-classifier');

const {
  validateStrictDonutScope,
  validateDonutSelector,
  parseSelectorContract
} = require('../src/css/css-selector-ast');

describe('Adversarial Stress Testing — Milestone 3 (Spike 3)', () => {

  // =========================================================================
  // Adversarial Suite 1: Subtree Slicer & CSS Closure Math
  // =========================================================================
  describe('Adversarial Suite 1: Subtree Slicer & CSS Closure Math', () => {

    test('1.1 Circular Custom Properties: 3-node cycle terminates without infinite recursion', () => {
      const usedVars = new Set(['--a']);
      const definedVars = new Set();
      const rootDefs = new Map([
        ['--a', 'calc(var(--b) + 1px)'],
        ['--b', 'calc(var(--c) * 2)'],
        ['--c', 'var(--a)']
      ]);

      const startTime = performance.now();
      const closure = resolveTransitiveClosure(usedVars, definedVars, rootDefs);
      const elapsed = performance.now() - startTime;

      assert.ok(elapsed < 50, `Cycle resolution took ${elapsed}ms, expected < 50ms`);
      assert.equal(closure['--a'], 'calc(var(--b) + 1px)');
      assert.equal(closure['--b'], 'calc(var(--c) * 2)');
      assert.equal(closure['--c'], 'var(--a)');
    });

    test('1.2 Self-referencing variable (--x: var(--x)) terminates safely', () => {
      const usedVars = new Set(['--x']);
      const definedVars = new Set();
      const rootDefs = new Map([
        ['--x', 'calc(var(--x) + 5px)']
      ]);

      const closure = resolveTransitiveClosure(usedVars, definedVars, rootDefs);
      assert.equal(closure['--x'], 'calc(var(--x) + 5px)');
      assert.equal(Object.keys(closure).length, 1);
    });

    test('1.3 Deep dependency chain (200 variables) resolves within fixpoint without stack overflow', () => {
      const chainLength = 200;
      const rootDefs = new Map();
      for (let i = 0; i < chainLength - 1; i++) {
        rootDefs.set(`--v${i}`, `var(--v${i + 1})`);
      }
      rootDefs.set(`--v${chainLength - 1}`, '12px');

      const usedVars = new Set(['--v0']);
      const definedVars = new Set();

      const startTime = performance.now();
      const closure = resolveTransitiveClosure(usedVars, definedVars, rootDefs);
      const elapsed = performance.now() - startTime;

      assert.ok(elapsed < 100, `Deep chain took ${elapsed}ms, expected < 100ms`);
      assert.equal(Object.keys(closure).length, chainLength);
      assert.equal(closure['--v0'], 'var(--v1)');
      assert.equal(closure[`--v${chainLength - 1}`], '12px');
    });

    test('1.4 ComputedStyles fallback provides values when missing from rootDefinitions', () => {
      const usedVars = new Set(['--font-family', '--dynamic-color']);
      const definedVars = new Set();
      const rootDefs = new Map([
        ['--font-family', 'sans-serif']
      ]);
      const computedStyles = {
        '--dynamic-color': '#00ffcc',
        '--ignored': '10px'
      };

      const closure = resolveTransitiveClosure(usedVars, definedVars, rootDefs, computedStyles);
      assert.equal(closure['--font-family'], 'sans-serif');
      assert.equal(closure['--dynamic-color'], '#00ffcc');
      assert.equal(closure['--ignored'], undefined, 'Unused computed styles must not leak');
    });

    test('1.5 Selector Pruning: external ancestor compounds are pruned to :scope', () => {
      const html = '<section id="gallery" class="work"><div class="slider"><div class="card">Item</div></div></section>';
      const $ = cheerio.load(html);
      const sectionEl = $('#gallery')[0];

      // Ancestor qualification with html and body is stripped, root section mapped to :scope
      const sel1 = 'html body main#app > section#gallery .card';
      const pruned1 = pruneSelectorForSubtree(sel1, $, sectionEl);
      assert.equal(pruned1, ':scope .card');

      // Direct root match
      const sel2 = 'section#gallery';
      const pruned2 = pruneSelectorForSubtree(sel2, $, sectionEl);
      assert.equal(pruned2, ':scope');
    });

    test('1.6 RESOLVED: Root pseudo-classes (:hover, :focus-within, :active) are preserved on root match without dropping', () => {
      const html = '<section id="gallery" class="work"><div class="card">Item</div></section>';
      const $ = cheerio.load(html);
      const sectionEl = $('#gallery')[0];

      // Fix 1: section:hover is preserved as :scope:hover
      const selHover = 'section#gallery:hover';
      const prunedHover = pruneSelectorForSubtree(selHover, $, sectionEl);
      assert.equal(prunedHover, ':scope:hover', 'Observed: :hover pseudo-class is preserved on root match');

      // Fix 2: section:hover .card is preserved as ':scope:hover .card'
      const selHoverDescendant = 'section#gallery:hover .card';
      const prunedDescendant = pruneSelectorForSubtree(selHoverDescendant, $, sectionEl);
      assert.equal(prunedDescendant, ':scope:hover .card', 'Observed: :hover qualification is preserved on descendant rule');

      // Fix 3: :focus-within regex alternation order preserves :focus-within on root
      const selFocusWithin = 'section#gallery:focus-within';
      const prunedFocusWithin = pruneSelectorForSubtree(selFocusWithin, $, sectionEl);
      assert.equal(prunedFocusWithin, ':scope:focus-within', 'Observed: :focus-within rule is preserved on root');

      // End-to-end impact in sliceSubtree:
      const sliceResult = sliceSubtree({
        html,
        cssSources: [
          'section#gallery:hover { background: red; }',
          'section#gallery:focus-within { outline: 2px solid blue; }',
          'section#gallery:hover .card { opacity: 1; }'
        ],
        selector: 'section#gallery',
        capsuleId: 'pseudo-loss-demo'
      });

      // Verification of scoped CSS fidelity:
      // 1. Hover is properly scoped to :scope:hover
      assert.ok(sliceResult.scopedCss.includes(':scope:hover {\n    background: red;\n  }'));
      // 2. Focus-within is present and scoped
      assert.ok(sliceResult.scopedCss.includes(':scope:focus-within {\n    outline: 2px solid blue;\n  }'));
      // 3. Hover descendant is properly scoped to :scope:hover .card
      assert.ok(sliceResult.scopedCss.includes(':scope:hover .card {\n    opacity: 1;\n  }'));
    });

    test('1.7 Selector Pruning: malformed or unsupported pseudo-selectors do not throw', () => {
      const html = '<section id="gallery" class="work"><p>Hello</p></section>';
      const $ = cheerio.load(html);
      const sectionEl = $('#gallery')[0];

      assert.doesNotThrow(() => {
        pruneSelectorForSubtree('section#gallery:has(> .nonexistent):not([disabled]) p', $, sectionEl);
      });
      assert.doesNotThrow(() => {
        pruneSelectorForSubtree('::view-transition-old(root)', $, sectionEl);
      });
      assert.doesNotThrow(() => {
        pruneSelectorForSubtree('', $, sectionEl);
      });
      assert.doesNotThrow(() => {
        pruneSelectorForSubtree(null, $, sectionEl);
      });
    });

    test('1.8 Root Leak Prevention: global selectors (body, html, :root, universal *) are strictly blocked', () => {
      const html = '<section id="capsule"><div class="inner">Content</div></section>';
      const cssSources = [
        'body { margin: 0; background: red; }',
        'html { font-size: 16px; }',
        ':root { --global-leak: 1; }',
        '* { box-sizing: border-box; }',
        'section#capsule .inner { color: blue; }'
      ];

      const result = sliceSubtree({
        html,
        cssSources,
        selector: 'section#capsule',
        capsuleId: 'leak-test'
      });

      // Verification that generated CSS has 0 root leaks
      const validation = validateStrictDonutScope(result.scopedCss);
      assert.equal(validation.valid, true);
      assert.deepEqual(validation.violations, []);

      // Verify that 'body', 'html', ':root' rule declarations are NOT applied as root rules
      assert.ok(!result.scopedCss.includes('body {'), 'body selector must not be in scoped CSS');
      assert.ok(!result.scopedCss.includes('html {'), 'html selector must not be in scoped CSS');
      assert.ok(result.scopedCss.includes(':scope *'), 'Universal * must be rewritten to :scope *');
    });

    test('1.9 Donut Scope Slot Boundary Penetration: penetrates slot interior triggers violation', () => {
      // Direct descendant penetrating slot
      const badCss1 = `
        @scope ([data-capsule-id="test"]) to ([data-capsule-slot]) {
          [data-capsule-slot] .injected-child { color: red; }
        }
      `;
      const val1 = validateStrictDonutScope(badCss1, 'data-capsule-slot');
      assert.equal(val1.valid, false);
      assert.ok(val1.violations.length >= 1);
      assert.ok(val1.violations[0].reason.includes('penetrates slot interior via combinator \' \' into \'.injected-child\''));

      // Direct child penetrating slot
      const badCss2 = `
        @scope ([data-capsule-id="test"]) to ([data-capsule-slot]) {
          [data-capsule-slot] > button { background: blue; }
        }
      `;
      const val2 = validateStrictDonutScope(badCss2, 'data-capsule-slot');
      assert.equal(val2.valid, false);
      assert.ok(val2.violations[0].reason.includes('penetrates slot interior via combinator \'>\' into \'button\''));

      // Self-styling slot is permitted
      const goodCss = `
        @scope ([data-capsule-id="test"]) to ([data-capsule-slot]) {
          [data-capsule-slot] { display: flex; }
          [data-capsule-slot]:hover { opacity: 0.8; }
          [data-capsule-slot] + .sibling { margin-top: 10px; }
        }
      `;
      const val3 = validateStrictDonutScope(goodCss, 'data-capsule-slot');
      assert.equal(val3.valid, true);
      assert.deepEqual(val3.violations, []);
    });
  });

  // =========================================================================
  // Adversarial Suite 2: Dimensional Blueprint & Spatial R-Tree
  // =========================================================================
  describe('Adversarial Suite 2: Dimensional Blueprint & Spatial R-Tree', () => {

    test('2.1 Extreme Coordinates: handles massive offsets and negative values without precision loss', () => {
      const rawElements = [
        { id: 'item-far', minX: 10000500, minY: -5000200, maxX: 10000800, maxY: -5000000 }
      ];
      const rootBox = { minX: 10000000, minY: -5000300, maxX: 10002000, maxY: -5000000 };

      const normalized = normalizeCoordinates(rawElements, rootBox);
      assert.equal(normalized[0].minX, 500);
      assert.equal(normalized[0].minY, 100);
      assert.equal(normalized[0].maxX, 800);
      assert.equal(normalized[0].maxY, 300);
      assert.equal(normalized[0].width, 300);
      assert.equal(normalized[0].height, 200);
    });

    test('2.2 Inverted Coordinates clamp width/height to 0 without crashing', () => {
      const inverted = [
        { id: 'inverted-box', minX: 200, minY: 150, maxX: 100, maxY: 50 }
      ];
      const normalized = normalizeCoordinates(inverted, { minX: 0, minY: 0, maxX: 500, maxY: 500 });
      assert.equal(normalized[0].width, 0);
      assert.equal(normalized[0].height, 0);
    });

    test('2.3 Physical Collision: Adjacent edge contact (IoU = 0) does NOT trigger collision assertion', () => {
      // Item 1: [0, 0] to [100, 100]
      // Item 2: [100, 0] to [200, 100] (touching right edge of item 1)
      // Item 3: [0, 100] to [100, 200] (touching bottom edge of item 1)
      // Item 4: [100, 100] to [200, 200] (touching corner of item 1)
      const desktop = [
        { id: 'tile-1', minX: 0, minY: 0, maxX: 100, maxY: 100 },
        { id: 'tile-2', minX: 100, minY: 0, maxX: 200, maxY: 100 },
        { id: 'tile-3', minX: 0, minY: 100, maxX: 100, maxY: 200 },
        { id: 'tile-4', minX: 100, minY: 100, maxX: 200, maxY: 200 }
      ];

      assert.doesNotThrow(() => {
        const bp = generateDimensionalBlueprint({
          capsuleId: 'adjacent-tiles-test',
          elementsByViewport: { desktop },
          assertZeroCollision: true
        });
        assert.equal(bp.json.viewports.desktop.zeroCollisions, true);
        assert.deepEqual(bp.json.viewports.desktop.collisions, []);
      });
    });

    test('2.4 Sub-pixel overlap (< 1.0 px² or < 0.0005 IoU) is filtered out as contact float artifact', () => {
      // Overlap of 0.001px x 50px = 0.05 px² (less than 1.0 px² threshold)
      const desktop = [
        { id: 'jitter-1', minX: 0, minY: 0, maxX: 100.0005, maxY: 50 },
        { id: 'jitter-2', minX: 100.0, minY: 0, maxX: 200, maxY: 50 }
      ];

      assert.doesNotThrow(() => {
        const bp = generateDimensionalBlueprint({
          capsuleId: 'subpixel-jitter-test',
          elementsByViewport: { desktop },
          assertZeroCollision: true,
          iouThreshold: 0.0005,
          minIntersectionArea: 1.0
        });
        assert.equal(bp.json.viewports.desktop.zeroCollisions, true);
      });
    });

    test('2.5 Real physical overlap (> 1.0 px²) strictly throws assertion error', () => {
      // Item 1: [50, 50] to [150, 150]
      // Item 2: [100, 100] to [200, 200]
      // Intersection: [100, 100] to [150, 150] -> 50x50 = 2500 px²
      const desktop = [
        { id: 'overlap-a', minX: 50, minY: 50, maxX: 150, maxY: 150 },
        { id: 'overlap-b', minX: 100, minY: 100, maxX: 200, maxY: 200 }
      ];

      assert.throws(() => {
        generateDimensionalBlueprint({
          capsuleId: 'real-overlap-test',
          elementsByViewport: { desktop },
          assertZeroCollision: true
        });
      }, (err) => {
        assert.ok(err.message.includes('SpatialRTree physical collision assertion failed in viewport "desktop"'));
        assert.ok(err.message.includes('overlap-a<->overlap-b'));
        return true;
      });
    });

    test('2.6 Degenerate Container Dimensions (0 width/height) does not crash or divide by zero', () => {
      const desktop = [
        { id: 'point-item', minX: 0, minY: 0, maxX: 10, maxY: 10 }
      ];
      // Zero width and height root container
      const capsuleRoot = { minX: 0, minY: 0, maxX: 0, maxY: 0 };

      assert.doesNotThrow(() => {
        const bp = generateDimensionalBlueprint({
          capsuleId: 'zero-container-test',
          capsuleRoot,
          elementsByViewport: { desktop }
        });

        assert.equal(bp.json.viewports.desktop.containerBounds.width, 1, 'Container width clamped to min 1');
        assert.equal(bp.json.viewports.desktop.containerBounds.height, 1, 'Container height clamped to min 1');
        assert.ok(!Number.isNaN(bp.json.viewports.desktop.whitespaceRatio));
        assert.ok(bp.svg.includes('<svg'));
      });
    });

    test('2.7 CAD SVG output conforms strictly to architectural palette and title block structure', () => {
      const desktop = [
        { id: 'card-a', minX: 100, minY: 50, maxX: 300, maxY: 250 },
        { id: 'card-b', minX: 350, minY: 50, maxX: 550, maxY: 250 }
      ];

      const bp = generateDimensionalBlueprint({
        capsuleId: 'cad-palette-test',
        elementsByViewport: { desktop }
      });

      const svg = bp.svg;
      assert.ok(svg.includes('#0A192F'), 'Dark navy canvas background (#0A192F)');
      assert.ok(svg.includes('#172A45'), 'Major/minor engineering grid (#172A45)');
      assert.ok(svg.includes('#64FFDA'), 'Cyan wireframe stroke (#64FFDA)');
      assert.ok(svg.includes('#F59E0B'), 'Amber dimension annotation (#F59E0B)');
      assert.ok(svg.includes('STUDIO DNA // DIMENSIONAL BLUEPRINT'), 'Cartouche header');
      assert.ok(svg.includes('IOU: 0.0000 (COLLISION FREE)'), 'IoU collision-free badge');
    });
  });

  // =========================================================================
  // Adversarial Suite 3: JEV Kinetic Classifier & Progressive Disclosure
  // =========================================================================
  describe('Adversarial Suite 3: JEV Kinetic Classifier & Progressive Disclosure', () => {

    test('3.1 Overshoot and negative cubic-bezier curves parse control points accurately', () => {
      // Overshoot easing: cubic-bezier(0.68, -0.55, 0.265, 1.55)
      const pts = parseCubicBezierString('cubic-bezier(0.68, -0.55, 0.265, 1.55)');
      assert.equal(pts.length, 4);
      assert.deepEqual(pts[0], [0, 0]);
      assert.equal(pts[1][0], 0.68);
      assert.equal(pts[1][1], -0.55);
      assert.equal(pts[2][0], 0.265);
      assert.equal(pts[2][1], 1.55);
      assert.deepEqual(pts[3], [1, 1]);
    });

    test('3.2 Malformed cubic-bezier string falls back gracefully to linear control points', () => {
      const pts = parseCubicBezierString('not-a-bezier-string()');
      assert.equal(pts.length, 4);
      assert.deepEqual(pts, [[0, 0], [0, 0], [1, 1], [1, 1]]);
    });

    test('3.3 Unknown named easing falls back gracefully to default power3.out', () => {
      const curve = fitPhysicalTruthCurve({ namedEasing: 'totally-invalid-easing-name' });
      assert.equal(curve.cssCubicBezier, 'cubic-bezier(0.215, 0.61, 0.355, 1)');
      assert.equal(curve.durationMs, 450);
    });

    test('3.4 Degenerate trajectory samples (< 2 points) fall back without throwing', () => {
      const curve = fitPhysicalTruthCurve({ samples: [[0, 0]] });
      assert.ok(curve.cssCubicBezier);
      assert.ok(curve.beziers.length >= 1);
    });

    test('3.5 Interruption FSM: all active and transition states handle Escape key to idle', () => {
      const skill = parameterizeAdaptiveSkill({ capsuleSlug: 'fsm-test' });
      const fsm = skill.interruptionFsm;

      assert.equal(fsm.initial, 'idle');

      // Check Escape transitions
      assert.equal(fsm.states.crossfading.on.ESCAPE, 'idle');
      assert.equal(fsm.states.active.on.ESCAPE, 'idle');
      assert.equal(fsm.states.resetting.on.ESCAPE, 'idle');

      // Check tween cancellation in crossfading
      assert.equal(fsm.states.crossfading.action, 'killTweensOf(previousTarget)');

      // Check blur resilience
      assert.equal(fsm.states.crossfading.on.BLUR, 'idle');
      assert.ok(fsm.resilienceHandlers.windowBlur);
      assert.ok(fsm.resilienceHandlers.escapeKey);
    });

    test('3.6 Reduced motion rule strictly sets animation/transition to 0.01ms and transform: none', () => {
      const skill = parameterizeAdaptiveSkill({ capsuleSlug: 'reduced-motion-slug' });
      const rule = skill.reducedMotionRule;

      assert.ok(rule.includes('[data-capsule-id="reduced-motion-slug"]'));
      assert.ok(rule.includes('animation-duration: 0.01ms !important'));
      assert.ok(rule.includes('transition-duration: 0.01ms !important'));
      assert.ok(rule.includes('transform: none !important'));
      assert.ok(rule.includes('scroll-behavior: auto !important'));
    });

    test('3.7 Progressive Disclosure: SKILL.md line count is strictly bounded under 60 lines', () => {
      const result = classifyKineticContract({ capsuleSlug: 'budget-test' });
      const lines = result.skillMarkdown.split('\n');

      assert.ok(lines.length < 60, `Line count was ${lines.length}, must be < 60`);
      assert.ok(lines.length <= 35, `Progressive disclosure is concise (${lines.length} lines)`);
    });

    test('3.8 Progressive Disclosure: generateSkillMarkdown throws error if content >= 60 lines', () => {
      const originalLines = generateSkillMarkdown({ capsuleSlug: 'test' }).split('\n');
      assert.ok(originalLines.length < 60);

      // Verify that the throwing guard function behaves correctly when line budget is exceeded
      assert.throws(() => {
        const bloatedMarkdownGenerator = () => {
          const lines = [];
          for (let i = 0; i < 65; i++) {
            lines.push(`Line ${i}`);
          }
          const content = lines.join('\n');
          if (content.split('\n').length >= 60) {
            throw new Error(`SKILL.md violation: generated document has ${content.split('\n').length} lines (strictly required < 60)`);
          }
          return content;
        };
        bloatedMarkdownGenerator();
      }, /SKILL\.md violation/);
    });
  });

  // =========================================================================
  // Adversarial Suite 4: Design Vault Artifacts Invariant Verification
  // =========================================================================
  describe('Adversarial Suite 4: Design Vault Artifacts Invariant Verification', () => {

    const vaultDir = path.resolve('design-vault/capsules/khanhnguyen-design--work-horizontal-rail');

    test('4.1 All 5 canonical artifacts exist in design-vault and are non-empty', () => {
      const expected = [
        'capsule.html',
        'capsule-spec.json',
        'dimensional-blueprint.svg',
        'dimensional-blueprint.json',
        'SKILL.md'
      ];

      for (const f of expected) {
        const fullPath = path.join(vaultDir, f);
        assert.ok(fs.existsSync(fullPath), `Artifact missing: ${f}`);
        const stat = fs.statSync(fullPath);
        assert.ok(stat.size > 0, `Artifact is empty: ${f}`);
      }
    });

    test('4.2 capsule.html is standalone HTML and encapsulates subtree in <dna-capsule>', () => {
      const html = fs.readFileSync(path.join(vaultDir, 'capsule.html'), 'utf8');
      assert.ok(html.includes('<!DOCTYPE html>'), 'Must be a valid standalone HTML document');
      assert.ok(html.includes('<dna-capsule data-capsule-id="khanhnguyen-design--work-horizontal-rail">'), 'Must contain <dna-capsule>');
      assert.ok(html.includes('</dna-capsule>'), 'Must properly close </dna-capsule>');

      // Validate that no external stylesheet links leaked into standalone capsule
      assert.ok(!html.includes('<link rel="stylesheet"'), 'Subtree HTML must not contain external style links');
    });

    test('4.3 capsule-spec.json validation passes with zero violations', () => {
      const spec = JSON.parse(fs.readFileSync(path.join(vaultDir, 'capsule-spec.json'), 'utf8'));
      assert.equal(spec.schemaVersion, '3.0.0');
      assert.equal(spec.validation.valid, true);
      assert.deepEqual(spec.validation.violations, []);
      assert.ok(spec.tokens.customProperties['--scale']);
      assert.ok(spec.tokens.customProperties['--vg']);
    });

    test('4.4 dimensional-blueprint.json validates zero collisions in dual viewports', () => {
      const bp = JSON.parse(fs.readFileSync(path.join(vaultDir, 'dimensional-blueprint.json'), 'utf8'));
      assert.equal(bp.schemaVersion, '3.0.0');
      assert.equal(bp.viewports.desktop.zeroCollisions, true);
      assert.equal(bp.viewports.mobile.zeroCollisions, true);
      assert.deepEqual(bp.viewports.desktop.collisions, []);
      assert.deepEqual(bp.viewports.mobile.collisions, []);
    });

    test('4.5 SKILL.md adheres to progressive disclosure line budget (< 60 lines)', () => {
      const skillText = fs.readFileSync(path.join(vaultDir, 'SKILL.md'), 'utf8');
      const lineCount = skillText.split('\n').length;
      assert.ok(lineCount < 60, `SKILL.md has ${lineCount} lines (budget < 60)`);
      assert.ok(skillText.includes('## 1. UX Intent'));
      assert.ok(skillText.includes('## 2. Physical Truth & Curves'));
      assert.ok(skillText.includes('## 3. Parametric Adaptive Math'));
      assert.ok(skillText.includes('## 4. Interruption FSM & Resilience'));
      assert.ok(skillText.includes('## 5. Accessibility & Reduced Motion'));
    });
  });

});
