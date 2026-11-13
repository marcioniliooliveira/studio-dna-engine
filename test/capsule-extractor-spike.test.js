/**
 * test/capsule-extractor-spike.test.js
 * 
 * Studio DNA Engine v3.0 — Comprehensive Spike 3 Verification Suite
 * Milestone 3: Parametric Capsule Slicer, Dimensional Blueprint & JEV Kinetic Skill
 * 
 * Groups:
 * 1. Subtree Slicer unit tests (closure math, transitive dependencies, donut @scope)
 * 2. Dimensional Blueprint unit tests (spatial normalization, IoU = 0 collision proof, CAD SVG)
 * 3. JEV Kinetic Classifier unit tests (Schneider bezier fitting, relative math, FSM, SKILL.md < 60 lines)
 * 4. End-to-end extraction against copias/khanhnguyen-design verifying all 5 canonical artifacts
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const { sliceSubtree, extractVarNames, pruneSelectorForSubtree, resolveTransitiveClosure } = require('../src/capsules/subtree-slicer');
const { generateDimensionalBlueprint, normalizeCoordinates, extractAlignmentAxes, extractHierarchyInvariants, generateCadSvg } = require('../src/capsules/dimensional-blueprint');
const { classifyKineticContract, fitPhysicalTruthCurve, parameterizeAdaptiveSkill, generateSkillMarkdown, parseCubicBezierString, NAMED_EASINGS } = require('../src/motion/jev-classifier');
const { extractCapsule } = require('../scripts/extract-capsule-spike');
const { validateStrictDonutScope } = require('../src/css/css-selector-ast');

describe('Milestone 3 / Spike 3: Parametric Capsule Slicer, Dimensional Blueprint & Kinetic Skill', () => {

  // =========================================================================
  // Group 1: Subtree Slicer Unit Tests
  // =========================================================================
  describe('Group 1: Subtree Slicer Unit Tests', () => {

    test('1.1 extractVarNames() extracts custom property names correctly', () => {
      const vars = extractVarNames('calc(4.8 * var(--scale)) var(--vg, 10px) var(--text-2xl)');
      assert.deepEqual(vars, ['--scale', '--vg', '--text-2xl']);
    });

    test('1.2 resolveTransitiveClosure() computes transitive dependency closure until fixpoint', () => {
      const usedVars = new Set(['--portrait-top', '--cta-fs']);
      const definedVars = new Set(['--local-transform']);
      const rootDefs = new Map([
        ['--portrait-top', 'calc(100% - var(--vg) - var(--portrait-h))'],
        ['--vg', 'calc(4.8 * var(--scale))'],
        ['--portrait-h', 'calc(39.2 * var(--scale))'],
        ['--scale', 'calc(100vw / 144)'],
        ['--cta-fs', 'calc(2.3 * var(--scale))'],
        ['--unrelated', '20px']
      ]);

      const closure = resolveTransitiveClosure(usedVars, definedVars, rootDefs);

      assert.ok(closure['--portrait-top']);
      assert.ok(closure['--vg']);
      assert.ok(closure['--portrait-h']);
      assert.ok(closure['--scale']);
      assert.ok(closure['--cta-fs']);
      assert.equal(closure['--unrelated'], undefined, 'Unrelated root variables must not leak into closure');
      assert.equal(closure['--scale'], 'calc(100vw / 144)');
    });

    test('1.3 pruneSelectorForSubtree() removes external ancestors and rewrites root to :scope', () => {
      const html = '<section id="hero" class="relative"><div class="container"><h1 class="title">Hello</h1></div></section>';
      const $ = cheerio.load(html);
      const sectionEl = $('#hero')[0];

      // Ancestor qualified selector
      const sel1 = 'html.dark body main section#hero .title';
      const pruned1 = pruneSelectorForSubtree(sel1, $, sectionEl);
      assert.equal(pruned1, ':scope .title');

      // Direct root match
      const sel2 = 'section#hero.relative';
      const pruned2 = pruneSelectorForSubtree(sel2, $, sectionEl);
      assert.equal(pruned2, ':scope');

      // Descendant match
      const sel3 = '.container > .title';
      const pruned3 = pruneSelectorForSubtree(sel3, $, sectionEl);
      assert.ok(pruned3 === '.container>.title' || pruned3 === '.container > .title');

      // External unrelated selector
      const sel4 = 'footer.site-footer a.nav-link';
      const pruned4 = pruneSelectorForSubtree(sel4, $, sectionEl);
      assert.equal(pruned4, '');

      // Root match with pseudo-classes preserved (:hover, :focus-within)
      const sel5 = 'section#hero.relative:hover';
      const pruned5 = pruneSelectorForSubtree(sel5, $, sectionEl);
      assert.equal(pruned5, ':scope:hover');

      const sel6 = 'section#hero:focus-within .title';
      const pruned6 = pruneSelectorForSubtree(sel6, $, sectionEl);
      assert.equal(pruned6, ':scope:focus-within .title');
    });

    test('1.4 pruneSelectorForSubtree() rewrites bare universal * to :scope * preventing root leak', () => {
      const html = '<section id="hero"><div><span>Text</span></div></section>';
      const $ = cheerio.load(html);
      const sectionEl = $('#hero')[0];

      const pruned = pruneSelectorForSubtree('*', $, sectionEl);
      assert.equal(pruned, ':scope *');
    });

    test('1.5 sliceSubtree() produces isolated @scope CSS, closure tokens, and passes validateStrictDonutScope', () => {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            :root {
              --scale: calc(100vw / 144);
              --spacing: calc(0.4 * var(--scale));
              --unused: red;
            }
            body section.work {
              background: #fff;
              padding: var(--spacing);
            }
            section.work .item {
              transform: scale(var(--scale));
            }
          </style>
        </head>
        <body>
          <section class="work" aria-label="Work Section">
            <div class="item">Item 1</div>
            <div data-capsule-slot="actions">
              <button>Click</button>
            </div>
          </section>
        </body>
        </html>
      `;

      const css = `
        :root { --scale: calc(100vw / 144); --spacing: calc(0.4 * var(--scale)); --unused: red; }
        body section.work { background: #fff; padding: var(--spacing); }
        section.work .item { transform: scale(var(--scale)); }
      `;

      const result = sliceSubtree({
        html,
        cssSources: [css],
        selector: 'section.work',
        capsuleId: 'test-capsule'
      });

      assert.equal(result.capsuleId, 'test-capsule');
      assert.ok(result.html.includes('<dna-capsule data-capsule-id="test-capsule">'));
      assert.ok(result.html.includes('</dna-capsule>'));
      assert.ok(result.scopedCss.includes('@scope ([data-capsule-id="test-capsule"]) to ([data-capsule-slot])'));
      assert.ok(result.scopedCss.includes('@supports not (scope: default)'));
      assert.equal(result.closure.resolvedValues['--unused'], undefined);
      assert.ok(result.closure.resolvedValues['--scale']);
      assert.ok(result.closure.resolvedValues['--spacing']);
      assert.equal(result.spec.slots.length, 1);
      assert.equal(result.spec.slots[0].name, 'actions');

      // Validation
      assert.equal(result.validation.valid, true);
      assert.deepEqual(result.validation.violations, []);
    });

    test('1.6 sliceSubtree() handles alias mapping for work-horizontal', () => {
      const html = `
        <section data-section="home-work" class="work-panel">
          <h1>Work</h1>
        </section>
      `;

      const result = sliceSubtree({
        html,
        cssSources: ['section[data-section="home-work"] { color: blue; }'],
        selector: 'section.work-horizontal',
        capsuleId: 'alias-test'
      });

      assert.equal(result.capsuleId, 'alias-test');
      assert.ok(result.html.includes('data-section="home-work"'));
    });
  });

  // =========================================================================
  // Group 2: Dimensional Blueprint Unit Tests
  // =========================================================================
  describe('Group 2: Dimensional Blueprint Unit Tests', () => {

    test('2.1 normalizeCoordinates() localizes element bounding boxes relative to section root origin', () => {
      const rawElements = [
        { id: 'heading', minX: 5760 + 128, minY: 48, maxX: 5760 + 278, maxY: 80 },
        { id: 'list', minX: 5760 + 1244, minY: 48, maxX: 5760 + 1856, maxY: 468 }
      ];
      const rootBox = { minX: 5760, minY: 0, maxX: 5760 + 1920, maxY: 900 };

      const normalized = normalizeCoordinates(rawElements, rootBox);

      assert.equal(normalized.length, 2);
      assert.equal(normalized[0].minX, 128);
      assert.equal(normalized[0].minY, 48);
      assert.equal(normalized[0].maxX, 278);
      assert.equal(normalized[0].width, 150);
      assert.equal(normalized[1].minX, 1244);
      assert.equal(normalized[1].minY, 48);
      assert.equal(normalized[1].maxX, 1856);
      assert.equal(normalized[1].width, 612);
    });

    test('2.2 extractAlignmentAxes() clusters converging boundaries', () => {
      const elements = [
        { id: 'col1-top', minX: 128, minY: 48, maxX: 400, maxY: 100 },
        { id: 'col1-bottom', minX: 128, minY: 600, maxX: 400, maxY: 800 },
        { id: 'col2-top', minX: 1200, minY: 48, maxX: 1800, maxY: 100 }
      ];

      const axes = extractAlignmentAxes(elements, 1920, 900);
      assert.ok(axes.vertical.length >= 1);
      assert.ok(axes.horizontal.length >= 1);

      const left128 = axes.vertical.find(a => Math.abs(a.coordPx - 128) < 1);
      assert.ok(left128, 'Should detect left alignment at x=128');
      assert.deepEqual(left128.elements.sort(), ['col1-bottom', 'col1-top']);

      const top48 = axes.horizontal.find(a => Math.abs(a.coordPx - 48) < 1);
      assert.ok(top48, 'Should detect horizontal top alignment at y=48');
      assert.deepEqual(top48.elements.sort(), ['col1-top', 'col2-top']);
    });

    test('2.3 extractHierarchyInvariants() computes whitespace and font size ratio', () => {
      const elements = [
        { id: 'heading', fontSize: 32, width: 200, height: 50 },
        { id: 'body', fontSize: 16, width: 400, height: 100 }
      ];
      // Container: 1000 x 500 = 500,000 px²
      // Occupied: 10,000 + 40,000 = 50,000 px²
      // Whitespace: (500,000 - 50,000) / 500,000 = 0.9000

      const hierarchy = extractHierarchyInvariants(elements, 1000, 500);
      assert.equal(hierarchy.whitespaceRatio, 0.9);
      assert.equal(hierarchy.hierarchyRatios.length, 1);
      assert.equal(hierarchy.hierarchyRatios[0].ratio, 2.0);
    });

    test('2.4 generateDimensionalBlueprint() loads dual viewports and asserts IoU = 0', () => {
      const desktop = [
        { id: 'item-1', minX: 50, minY: 50, maxX: 200, maxY: 100 },
        { id: 'item-2', minX: 250, minY: 50, maxX: 400, maxY: 100 }
      ];
      const mobile = [
        { id: 'item-1', minX: 20, minY: 20, maxX: 350, maxY: 80 },
        { id: 'item-2', minX: 20, minY: 100, maxX: 350, maxY: 160 }
      ];

      const blueprint = generateDimensionalBlueprint({
        capsuleId: 'collision-free-test',
        title: 'Collision Free Test',
        elementsByViewport: { desktop, mobile },
        assertZeroCollision: true
      });

      assert.equal(blueprint.json.viewports.desktop.zeroCollisions, true);
      assert.equal(blueprint.json.viewports.mobile.zeroCollisions, true);
      assert.ok(blueprint.svg.includes('COLLISION FREE'));
      assert.ok(blueprint.svg.includes('#0A192F'));
    });

    test('2.5 generateDimensionalBlueprint() throws when overlapping elements are detected', () => {
      const desktop = [
        { id: 'overlap-1', minX: 100, minY: 100, maxX: 300, maxY: 300 },
        { id: 'overlap-2', minX: 200, minY: 200, maxX: 400, maxY: 400 }
      ];

      assert.throws(() => {
        generateDimensionalBlueprint({
          capsuleId: 'collision-throw-test',
          elementsByViewport: { desktop },
          assertZeroCollision: true
        });
      }, /SpatialRTree physical collision assertion failed/);
    });

    test('2.6 generateCadSvg() emits dark navy architectural drawing with title block cartouche', () => {
      const elements = [
        { id: 'card-1', minX: 100, minY: 100, maxX: 400, maxY: 300, fontSize: 18 }
      ];

      const blueprint = generateDimensionalBlueprint({
        capsuleId: 'cartouche-test',
        elementsByViewport: { desktop: elements }
      });

      const svg = blueprint.svg;
      assert.ok(svg.includes('#0A192F'), 'Background');
      assert.ok(svg.includes('#172A45'), 'Grid');
      assert.ok(svg.includes('#64FFDA'), 'Wireframe');
      assert.ok(svg.includes('#F59E0B'), 'Dimensions');
      assert.ok(svg.includes('STUDIO DNA // DIMENSIONAL BLUEPRINT'));
      assert.ok(svg.includes('CAPSULE: cartouche-test'));
    });
  });

  // =========================================================================
  // Group 3: JEV Kinetic Classifier Unit Tests
  // =========================================================================
  describe('Group 3: JEV Kinetic Classifier Unit Tests', () => {

    test('3.1 fitPhysicalTruthCurve() canonicalizes named easings', () => {
      const curve1 = fitPhysicalTruthCurve({ namedEasing: 'power3.out' });
      assert.equal(curve1.cssCubicBezier, 'cubic-bezier(0.215, 0.61, 0.355, 1)');

      const curve2 = fitPhysicalTruthCurve({ namedEasing: 'expo.out' });
      assert.equal(curve2.cssCubicBezier, 'cubic-bezier(0.19, 1, 0.22, 1)');

      const curve3 = fitPhysicalTruthCurve({ namedEasing: 'ease-out' });
      assert.equal(curve3.cssCubicBezier, 'cubic-bezier(0, 0, 0.2, 1)');
    });

    test('3.2 fitPhysicalTruthCurve() fits trajectory samples via Schneider algorithm', () => {
      const samples = [
        [0.0, 0.0],
        [0.2, 0.45],
        [0.4, 0.75],
        [0.6, 0.90],
        [0.8, 0.98],
        [1.0, 1.0]
      ];

      const curve = fitPhysicalTruthCurve({ samples });
      assert.ok(curve.cssCubicBezier.startsWith('cubic-bezier('));
      assert.ok(curve.beziers.length >= 1);
    });

    test('3.3 parseCubicBezierString() extracts 4 control points', () => {
      const pts = parseCubicBezierString('cubic-bezier(0.22, 1, 0.36, 1)');
      assert.equal(pts.length, 4);
      assert.deepEqual(pts[0], [0, 0]);
      assert.deepEqual(pts[1], [0.22, 1]);
      assert.deepEqual(pts[2], [0.36, 1]);
      assert.deepEqual(pts[3], [1, 1]);
    });

    test('3.4 parameterizeAdaptiveSkill() generates fluid relative math pegged to --scale', () => {
      const skill = parameterizeAdaptiveSkill({
        scaleVarName: '--scale',
        capsuleSlug: 'test-capsule'
      });

      assert.ok(skill.relativeTransforms.arrow.resting.includes('calc(-1 * var(--scale))'));
      assert.ok(skill.relativeTransforms.arrow.resting.includes('calc(1 * var(--scale))'));
      assert.equal(skill.relativeTransforms.arrow.active, 'translate(0) scale(1)');
    });

    test('3.5 parameterizeAdaptiveSkill() models interruption FSM with killTweensOf and Escape reset', () => {
      const skill = parameterizeAdaptiveSkill({ capsuleSlug: 'test-capsule' });
      const fsm = skill.interruptionFsm;

      assert.equal(fsm.initial, 'idle');
      assert.ok(fsm.states.idle);
      assert.ok(fsm.states.crossfading);
      assert.ok(fsm.states.active);
      assert.ok(fsm.states.resetting);
      assert.equal(fsm.states.crossfading.action, 'killTweensOf(previousTarget)');
      assert.ok(fsm.states.crossfading.on.ESCAPE, 'idle');
      assert.ok(fsm.resilienceHandlers.escapeKey.includes('Escape'));
    });

    test('3.6 parameterizeAdaptiveSkill() emits prefers-reduced-motion override', () => {
      const skill = parameterizeAdaptiveSkill({ capsuleSlug: 'test-capsule' });
      assert.ok(skill.reducedMotionRule.includes('@media (prefers-reduced-motion: reduce)'));
      assert.ok(skill.reducedMotionRule.includes('transition-duration: 0.01ms !important'));
      assert.ok(skill.reducedMotionRule.includes('transform: none !important'));
    });

    test('3.7 generateSkillMarkdown() generates document strictly < 60 lines with required sections', () => {
      const physicalTruth = fitPhysicalTruthCurve({ namedEasing: 'power3.out', durationMs: 450 });
      const adaptiveSkill = parameterizeAdaptiveSkill({ scaleVarName: '--scale', capsuleSlug: 'test-capsule' });

      const md = generateSkillMarkdown({
        capsuleSlug: 'test-capsule',
        physicalTruth,
        adaptiveSkill
      });

      const lineCount = md.split('\n').length;
      assert.ok(lineCount < 60, `Line count was ${lineCount}, expected < 60`);
      assert.ok(md.includes('## 1. UX Intent'));
      assert.ok(md.includes('## 2. Physical Truth & Curves'));
      assert.ok(md.includes('## 3. Parametric Adaptive Math'));
      assert.ok(md.includes('## 4. Interruption FSM & Resilience'));
      assert.ok(md.includes('## 5. Accessibility & Reduced Motion'));
    });

    test('3.8 classifyKineticContract() synthesizes full kinetic contract and machine-readable JSON', () => {
      const result = classifyKineticContract({
        styles: 'transition: opacity .3s ease-out, transform .45s cubic-bezier(.22, 1, .36, 1);',
        capsuleSlug: 'test-capsule'
      });

      assert.equal(result.capsuleSlug, 'test-capsule');
      assert.ok(result.motionContract);
      assert.equal(result.motionContract.schemaVersion, '3.0.0');
      assert.ok(result.skillMarkdown);
      assert.ok(result.skillMarkdown.split('\n').length < 60);
    });
  });

  // =========================================================================
  // Group 4: End-to-End Extraction Pipeline
  // =========================================================================
  describe('Group 4: End-to-End Capsule Extraction against copias/khanhnguyen-design', () => {

    const outDir = path.resolve('design-vault/capsules/khanhnguyen-design--work-horizontal-rail');

    test('4.1 extractCapsule() executes successfully and produces all 5 canonical artifacts', async () => {
      const result = await extractCapsule({
        source: 'copias/khanhnguyen-design',
        selector: 'section[data-section="home-work"]',
        out: outDir,
        capsuleId: 'khanhnguyen-design--work-horizontal-rail'
      });

      assert.equal(result.capsuleId, 'khanhnguyen-design--work-horizontal-rail');
      assert.equal(result.validation.valid, true);
      assert.equal(result.zeroCollisions, true);
      assert.ok(result.skillLines < 60);

      // Verify all 5 files exist on disk
      const expectedFiles = [
        'capsule.html',
        'capsule-spec.json',
        'dimensional-blueprint.svg',
        'dimensional-blueprint.json',
        'SKILL.md'
      ];

      for (const file of expectedFiles) {
        const filePath = path.join(outDir, file);
        assert.ok(fs.existsSync(filePath), `Expected artifact ${file} must exist on disk`);
        const stats = fs.statSync(filePath);
        assert.ok(stats.size > 0, `Artifact ${file} must not be empty`);
      }
    });

    test('4.2 capsule.html is valid, wrapped in <dna-capsule>, and contains strict @scope styles', () => {
      const htmlContent = fs.readFileSync(path.join(outDir, 'capsule.html'), 'utf8');
      assert.ok(htmlContent.includes('<dna-capsule data-capsule-id="khanhnguyen-design--work-horizontal-rail">'));
      assert.ok(htmlContent.includes('@scope ([data-capsule-id="khanhnguyen-design--work-horizontal-rail"])'));
      assert.ok(htmlContent.includes('--scale:'));
      assert.ok(htmlContent.includes('--vg:'));
    });

    test('4.3 capsule-spec.json conforms to schema 3.0.0 and includes complete custom property closure', () => {
      const spec = JSON.parse(fs.readFileSync(path.join(outDir, 'capsule-spec.json'), 'utf8'));
      assert.equal(spec.schemaVersion, '3.0.0');
      assert.equal(spec.slug, 'khanhnguyen-design--work-horizontal-rail');
      assert.ok(spec.tokens.customProperties['--scale']);
      assert.ok(spec.closure.free.length > 0);
      assert.equal(spec.validation.valid, true);
      assert.deepEqual(spec.validation.violations, []);
    });

    test('4.4 dimensional-blueprint.json proves zero physical collisions in dual viewports', () => {
      const bp = JSON.parse(fs.readFileSync(path.join(outDir, 'dimensional-blueprint.json'), 'utf8'));
      assert.equal(bp.schemaVersion, '3.0.0');
      assert.ok(bp.viewports.desktop);
      assert.ok(bp.viewports.mobile);
      assert.equal(bp.viewports.desktop.zeroCollisions, true);
      assert.deepEqual(bp.viewports.desktop.collisions, []);
      assert.equal(bp.viewports.mobile.zeroCollisions, true);
      assert.deepEqual(bp.viewports.mobile.collisions, []);
      assert.ok(bp.viewports.desktop.spacing.length > 0);
    });

    test('4.5 dimensional-blueprint.svg is valid CAD vector drawing with cartouche', () => {
      const svg = fs.readFileSync(path.join(outDir, 'dimensional-blueprint.svg'), 'utf8');
      assert.ok(svg.startsWith('<?xml') || svg.includes('<svg'));
      assert.ok(svg.includes('#0A192F'));
      assert.ok(svg.includes('#64FFDA'));
      assert.ok(svg.includes('#F59E0B'));
      assert.ok(svg.includes('STUDIO DNA // DIMENSIONAL BLUEPRINT'));
      assert.ok(svg.includes('COLLISION FREE'));
    });

    test('4.6 SKILL.md is strictly under 60 lines and contains all required sections', () => {
      const skillText = fs.readFileSync(path.join(outDir, 'SKILL.md'), 'utf8');
      const lines = skillText.split('\n');
      assert.ok(lines.length < 60, `SKILL.md has ${lines.length} lines, expected < 60`);
      assert.ok(skillText.includes('## 1. UX Intent'));
      assert.ok(skillText.includes('## 2. Physical Truth & Curves'));
      assert.ok(skillText.includes('## 3. Parametric Adaptive Math'));
      assert.ok(skillText.includes('## 4. Interruption FSM & Resilience'));
      assert.ok(skillText.includes('## 5. Accessibility & Reduced Motion'));
    });
  });

});
