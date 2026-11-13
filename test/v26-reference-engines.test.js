/**
 * test/v26-reference-engines.test.js
 * 
 * Verification Test Suite for Promoted Micro-Engines:
 * - SpatialRTree (STR Bulk Packing, Collision Detection, Dimensional Gaps)
 * - CSS Selector AST (parseSelectorContract, validateStrictDonutScope)
 * 
 * Running directly against production src/ tree.
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const {
  SpatialRTree,
  computeTypographicEnergy,
  computeAreaCV
} = require('../src/spatial/spatial-rtree');

const {
  parseSelectorContract,
  validateStrictDonutScope,
  parseSelectorAst,
  validateDonutSelector,
  validateDonutScopeInvariants
} = require('../src/css/css-selector-ast');

describe('Milestone 1 — Promoted Analytical Micro-Engines (src/)', () => {

  // ==========================================================================
  // 1. SpatialRTree Engine
  // ==========================================================================
  describe('SpatialRTree Engine', () => {

    test('1.1: STR bulk loading (load) with 25 items constructs balanced index with zero false negatives', () => {
      const tree = new SpatialRTree(4);
      const items = [];

      // 5x5 grid of elements
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          const idx = row * 5 + col;
          items.push({
            minX: col * 100,
            minY: row * 80,
            maxX: col * 100 + 60,
            maxY: row * 80 + 50,
            id: `card-${idx}`
          });
        }
      }

      tree.load(items);

      // Total count
      const all = tree.all();
      assert.equal(all.length, 25, 'All 25 items must be present in tree');

      // Root bounding box must encompass all elements [0, 0, 460, 370]
      assert.equal(tree.root.bbox.minX, 0);
      assert.equal(tree.root.bbox.minY, 0);
      assert.equal(tree.root.bbox.maxX, 460);
      assert.equal(tree.root.bbox.maxY, 370);
      assert.equal(tree.root.leaf, false, 'Tree root should be internal node for 25 items (M=4)');

      // Point search every item with zero false negatives
      for (const it of items) {
        const hits = tree.search({
          minX: it.minX + 1,
          minY: it.minY + 1,
          maxX: it.maxX - 1,
          maxY: it.maxY - 1
        });
        assert.equal(hits.length, 1, `Must find item ${it.id}`);
        assert.equal(hits[0].id, it.id);
      }
    });

    test('1.2: load() corner cases: empty array and single-item array', () => {
      const emptyTree = new SpatialRTree(4);
      emptyTree.load([]);
      assert.deepEqual(emptyTree.all(), []);

      const singleTree = new SpatialRTree(4);
      singleTree.load([{ minX: 10, minY: 20, maxX: 30, maxY: 40, id: 'solo' }]);
      assert.equal(singleTree.all().length, 1);
      assert.equal(singleTree.root.leaf, true);
      assert.equal(singleTree.root.bbox.minX, 10);
      assert.equal(singleTree.root.bbox.maxX, 30);
    });

    test('1.3: findCollisions() detects physical overlapping pairs (IoU > 0) and ignores touching edges', () => {
      const tree = new SpatialRTree(9);

      // Box A: [0, 0, 100, 100]
      // Box B: [20, 20, 80, 80] (inside A: intersection [20, 20, 80, 80], area = 3600)
      // Box C: [100, 0, 200, 100] (touches A edge at x=100, disjoint from B since maxX_B = 80 < 100)
      // Box D: [300, 300, 400, 400] (disjoint)
      tree.load([
        { minX: 0, minY: 0, maxX: 100, maxY: 100, id: 'box-a' },
        { minX: 20, minY: 20, maxX: 80, maxY: 80, id: 'box-b' },
        { minX: 100, minY: 0, maxX: 200, maxY: 100, id: 'box-c' },
        { minX: 300, minY: 300, maxX: 400, maxY: 400, id: 'box-d' }
      ]);

      const collisions = tree.findCollisions();
      assert.equal(collisions.length, 1, 'Only Box A and Box B have physical overlap');
      assert.equal(collisions[0].a, 'box-a');
      assert.equal(collisions[0].b, 'box-b');
      assert.equal(collisions[0].intersectionArea, 3600);

      // Union area = 10000 + 3600 - 3600 = 10000. IoU = 3600 / 10000 = 0.36
      assert.equal(collisions[0].iou, 0.36);
    });

    test('1.4: computeDimensionalGaps() calculates axial distances and ratios to container', () => {
      const tree = new SpatialRTree(9);

      // Container: [0, 0, 1000, 600]
      // Child 1: [100, 50, 300, 200]
      // Child 2: [400, 50, 600, 200] (gap along X: 400 - 300 = 100px, ratio = 100 / 1000 = 0.1)
      // Child 3: [700, 50, 900, 200] (gap along X: 700 - 600 = 100px, ratio = 0.1)
      // Child 4: [100, 300, 900, 500] (gap along Y: 300 - 200 = 100px, ratio = 100 / 600 = 0.1667)
      tree.load([
        { minX: 0, minY: 0, maxX: 1000, maxY: 600, id: 'hero-section' },
        { minX: 100, minY: 50, maxX: 300, maxY: 200, id: 'card-1', parentId: 'hero-section' },
        { minX: 400, minY: 50, maxX: 600, maxY: 200, id: 'card-2', parentId: 'hero-section' },
        { minX: 700, minY: 50, maxX: 900, maxY: 200, id: 'card-3', parentId: 'hero-section' },
        { minX: 100, minY: 300, maxX: 900, maxY: 500, id: 'card-bottom', parentId: 'hero-section' }
      ]);

      const gaps = tree.computeDimensionalGaps('hero-section');
      assert.ok(gaps.length > 0, 'Must produce dimensional gaps');

      const xGaps = gaps.filter(g => g.axis === 'x');
      assert.ok(xGaps.length >= 2, 'Should detect horizontal gaps between cards');
      assert.equal(xGaps[0].from, 'card-1');
      assert.equal(xGaps[0].to, 'card-2');
      assert.equal(xGaps[0].distancePx, 100);
      assert.equal(xGaps[0].ratioToContainer, 0.1);

      const yGaps = gaps.filter(g => g.axis === 'y');
      assert.ok(yGaps.length >= 1, 'Should detect vertical gap to bottom card');
      const bottomGap = yGaps.find(g => g.to === 'card-bottom');
      assert.ok(bottomGap, 'Must include vertical gap to card-bottom');
      assert.equal(bottomGap.distancePx, 100);
      assert.equal(bottomGap.ratioToContainer, 0.1667);
    });

    test('1.5: computeTypographicEnergy and computeAreaCV retain exact mathematical behavior', () => {
      const eHero = computeTypographicEnergy(64, 800, 6400, 800, 100);
      assert.ok(eHero > 5.0, 'Large headline should have high typographic energy');

      const cvIdentical = computeAreaCV([500, 500, 500, 500]);
      assert.equal(cvIdentical, 0.0);

      const cvVariant = computeAreaCV([100, 200, 400, 800]);
      assert.ok(cvVariant > 0.5);
    });

    test('1.6: findCollisions() handles missing id without self-collision and detects collisions with duplicate IDs', () => {
      // Disjoint items missing id must report 0 collisions
      const disjointTree = new SpatialRTree(4);
      disjointTree.load([
        { minX: 0, minY: 0, maxX: 50, maxY: 50 },
        { minX: 200, minY: 200, maxX: 300, maxY: 300 }
      ]);
      const disjointCollisions = disjointTree.findCollisions();
      assert.equal(disjointCollisions.length, 0, 'Disjoint items missing id must not trigger collisions');

      // Overlapping items missing id receive symmetric deterministic IDs
      const overlapTree = new SpatialRTree(4);
      overlapTree.load([
        { minX: 0, minY: 0, maxX: 100, maxY: 100 },
        { minX: 50, minY: 50, maxX: 150, maxY: 150 }
      ]);
      const overlapCollisions = overlapTree.findCollisions();
      assert.equal(overlapCollisions.length, 1);
      assert.equal(overlapCollisions[0].a, 'item-0');
      assert.equal(overlapCollisions[0].b, 'item-1');
      assert.ok(overlapCollisions[0].iou > 0);

      // Overlapping items sharing identical id do not suppress collision detection
      const dupTree = new SpatialRTree(4);
      dupTree.load([
        { minX: 0, minY: 0, maxX: 100, maxY: 100, id: 'dup-slot' },
        { minX: 50, minY: 50, maxX: 150, maxY: 150, id: 'dup-slot' }
      ]);
      const dupCollisions = dupTree.findCollisions();
      assert.equal(dupCollisions.length, 1, 'Distinct items with identical IDs must still detect collision');
      assert.equal(dupCollisions[0].a, 'dup-slot');
      assert.equal(dupCollisions[0].b, 'dup-slot');
    });
  });

  // ==========================================================================
  // 2. CSS Selector AST Micro-Engine
  // ==========================================================================
  describe('CSS Selector AST Micro-Engine', () => {

    test('2.1: parseSelectorContract calculates W3C specificity tuple [a, b, c]', () => {
      // ID selector: #hero -> [1, 0, 0]
      const rId = parseSelectorContract('#hero');
      assert.deepEqual(rId.specificity, [1, 0, 0]);

      // Class + attribute + pseudo-class: .btn[type="submit"]:hover -> [0, 3, 0]
      const rClasses = parseSelectorContract('.btn[type="submit"]:hover');
      assert.deepEqual(rClasses.specificity, [0, 3, 0]);

      // Type + pseudo-element: h1::before -> [0, 0, 2]
      const rType = parseSelectorContract('h1::before');
      assert.deepEqual(rType.specificity, [0, 0, 2]);

      // Complex compound: nav.site-nav > ul.menu li.item#active:hover::after
      // a: #active (1)
      // b: .site-nav, .menu, .item, :hover (4)
      // c: nav, ul, li, ::after (4)
      const rComplex = parseSelectorContract('nav.site-nav > ul.menu li.item#active:hover::after');
      assert.deepEqual(rComplex.specificity, [1, 4, 4]);

      // Selector list: h1, #main-heading -> takes maximum specificity [1, 0, 0]
      const rList = parseSelectorContract('h1, #main-heading');
      assert.deepEqual(rList.specificity, [1, 0, 0]);
    });

    test('2.2: parseSelectorContract flags hasRootLeak for :root, html, body, and unconstrained *', () => {
      assert.equal(parseSelectorContract(':root').hasRootLeak, true);
      assert.equal(parseSelectorContract(':root > .app').hasRootLeak, true);
      assert.equal(parseSelectorContract('html').hasRootLeak, true);
      assert.equal(parseSelectorContract('html.dark-theme').hasRootLeak, true);
      assert.equal(parseSelectorContract('body').hasRootLeak, true);
      assert.equal(parseSelectorContract('body.fullscreen > main').hasRootLeak, true);
      assert.equal(parseSelectorContract('*').hasRootLeak, true);
      assert.equal(parseSelectorContract('* > div').hasRootLeak, true);
      assert.equal(parseSelectorContract('*.global-pill').hasRootLeak, true);

      // Scoped selectors must NOT flag root leak
      assert.equal(parseSelectorContract('.capsule-root *').hasRootLeak, false);
      assert.equal(parseSelectorContract('[data-capsule-id="hero"] *').hasRootLeak, false);
      assert.equal(parseSelectorContract(':scope *').hasRootLeak, false);
      assert.equal(parseSelectorContract('.hero-banner h1').hasRootLeak, false);
    });

    test('2.3: validateStrictDonutScope passes legitimate scoped CSS without leakage or penetration', () => {
      const scopedCss = `
        @scope ([data-capsule-id="hero"]) to ([data-capsule-slot]) {
          :scope {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
          }
          .hero-banner {
            background-color: var(--color-surface);
          }
          .hero-title {
            font-size: clamp(2rem, 5vw, 4rem);
          }
          /* Legitimate self-styling on boundary slot container */
          [data-capsule-slot] {
            position: relative;
          }
          [data-capsule-slot]:hover {
            opacity: 0.95;
          }
        }
      `;

      const result = validateStrictDonutScope(scopedCss, 'data-capsule-slot');
      assert.equal(result.valid, true);
      assert.equal(result.compliant, true);
      assert.equal(result.violations.length, 0);
    });

    test('2.4: validateStrictDonutScope flags root leakage and slot penetration violations', () => {
      const contaminatedCss = `
        @scope ([data-capsule-id="features"]) to ([data-capsule-slot]) {
          /* Violation 1: Root leak to body */
          body {
            background: #000;
          }

          /* Violation 2: Unconstrained universal */
          * {
            box-sizing: border-box;
          }

          /* Legitimate rule */
          .feature-card {
            border-radius: 8px;
          }

          /* Violation 3: Child penetrator into slot interior */
          [data-capsule-slot] > h3 {
            color: #ff0000;
          }

          /* Violation 4: Descendant penetrator into slot interior */
          [data-capsule-slot="actions"] button.primary {
            display: none;
          }
        }
      `;

      const result = validateStrictDonutScope(contaminatedCss, 'data-capsule-slot');
      assert.equal(result.valid, false);
      assert.equal(result.compliant, false);
      assert.equal(result.violations.length, 4, 'Must identify all 4 distinct violations');

      const reasons = result.violations.map(v => v.reason).join('\n');
      assert.match(reasons, /Root leakage.*body/);
      assert.match(reasons, /Root leakage.*\*/);
      assert.match(reasons, /penetrates slot interior.*>/);
      assert.ok(result.violations.some(v => v.reason.includes('actions') && v.reason.includes('penetrates slot interior')));
    });

    test('2.5: Remediated CSS AST features: stateful comma splitting, balanced pseudos, component classes, and ancestor :has()', () => {
      // 1. Stateful comma splitting inside functional pseudo-classes (:where, :is)
      const whereContract = parseSelectorContract(':where(#id, .class)');
      assert.equal(whereContract.ast.selectors.length, 1, 'Functional pseudo must not be split on commas');
      assert.deepEqual(whereContract.specificity, [0, 0, 0], ':where() specificity is always [0, 0, 0]');

      const isContract = parseSelectorContract(':is(#id, .class)');
      assert.equal(isContract.ast.selectors.length, 1);
      assert.deepEqual(isContract.specificity, [1, 0, 0], ':is(#id, .class) takes max argument specificity [1, 0, 0]');

      // 2. Comma splitting inside quoted attribute selectors
      const attrContract = parseSelectorContract('[data-val="a,b"]');
      assert.equal(attrContract.ast.selectors.length, 1, 'Attribute selector must not be split on comma in quotes');
      assert.deepEqual(attrContract.specificity, [0, 1, 0]);

      // 3. Balanced parentheses for nested functional pseudo-classes
      const nestedContract = parseSelectorContract(':not(:not(.cls))');
      assert.deepEqual(nestedContract.specificity, [0, 1, 0], 'Nested :not must balance parentheses and evaluate to [0, 1, 0]');

      // 4. Token-aware root leak detection for component classes/IDs
      assert.equal(parseSelectorContract('.html').hasRootLeak, false, '.html class is not a root leak');
      assert.equal(parseSelectorContract('#body').hasRootLeak, false, '#body id is not a root leak');
      assert.equal(parseSelectorContract('div.body').hasRootLeak, false, 'div.body is not a root leak');
      assert.equal(parseSelectorContract('span.html').hasRootLeak, false, 'span.html is not a root leak');

      // validateStrictDonutScope passes legitimate div.body rule
      const componentScopedCss = `
        @scope (.capsule) to ([data-capsule-slot]) {
          div.body {
            color: #333333;
          }
          :is(h1, h2) {
            margin: 0;
          }
        }
      `;
      const compResult = validateStrictDonutScope(componentScopedCss, 'data-capsule-slot');
      assert.equal(compResult.valid, true, 'Legitimate div.body and :is(h1, h2) in donut scope must be valid');
      assert.equal(compResult.violations.length, 0);

      // 5. Ancestor :has([data-capsule-slot]) does not trigger slot piercing violation
      const hasSlotResult = validateDonutSelector('div:has([data-capsule-slot]) > span', 'data-capsule-slot');
      assert.equal(hasSlotResult.compliant, true, 'div:has([slot]) > span must not be flagged as slot penetration');
      assert.equal(hasSlotResult.violations.length, 0);
    });
  });
});
