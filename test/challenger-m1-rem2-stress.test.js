/**
 * test/challenger-m1-rem2-stress.test.js
 * 
 * Empirical Adversarial Challenger: Spike 1 Remediation Invariant Stress Harness
 * Targeting:
 * 1. Deeply nested & cross-nested functional pseudo-classes (:where, :is, :not, :has)
 * 2. Complex quoted strings & escaped characters in attribute selectors
 * 3. Token-aware root leak detection boundary & edge cases
 * 4. Slot boundary penetration vs container queries
 * 5. SpatialRTree findCollisions() identity invariants & ID variety
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const {
  parseSelectorAst,
  parseSelectorContract,
  validateDonutSelector,
  validateStrictDonutScope
} = require('../src/css/css-selector-ast.js');

const {
  SpatialRTree
} = require('../src/spatial/spatial-rtree.js');

describe('Empirical Adversarial Stress Harness — Spike 1 Remediation', () => {

  // ==========================================================================
  // Section 1: Complex Nested Functional Pseudo-Classes Specificity
  // ==========================================================================
  describe('1. Complex Nested Functional Pseudo-Classes Specificity', () => {

    test('1.1 :where() zeroes specificity even when wrapping high-specificity selectors', () => {
      // :where(#very-specific, .many.classes, div > p) -> must strictly be [0, 0, 0]
      const contract1 = parseSelectorContract(':where(#main, .btn.primary, div > p)');
      assert.deepEqual(contract1.specificity, [0, 0, 0]);

      // Nested :where(:is(#main, .btn)) -> must still be [0, 0, 0]
      const contract2 = parseSelectorContract(':where(:is(#main, .btn))');
      assert.deepEqual(contract2.specificity, [0, 0, 0]);

      // Deeply nested :where(:not(:is(#id))) -> [0, 0, 0]
      const contract3 = parseSelectorContract(':where(:not(:is(#id)))');
      assert.deepEqual(contract3.specificity, [0, 0, 0]);
    });

    test('1.2 :is() unwraps and selects maximum branch specificity across nested pseudos', () => {
      // :is(:where(#id), .card) -> :where is [0,0,0], .card is [0,1,0] -> max is [0,1,0]
      const contract1 = parseSelectorContract(':is(:where(#id), .card)');
      assert.deepEqual(contract1.specificity, [0, 1, 0]);

      // :is(:is(:is(#deep-id))) -> [1, 0, 0]
      const contract2 = parseSelectorContract(':is(:is(:is(#deep-id)))');
      assert.deepEqual(contract2.specificity, [1, 0, 0]);

      // Compound with :is and other selectors: div.card:is(#id, p)
      // div.card is [0, 1, 1], :is(#id, p) max is #id [1, 0, 0] -> total [1, 1, 1]
      const contract3 = parseSelectorContract('div.card:is(#id, p)');
      assert.deepEqual(contract3.specificity, [1, 1, 1]);
    });

    test('1.3 :not() propagates inner specificity accurately through nesting', () => {
      // :not(:where(#id)) -> [0, 0, 0]
      const contract1 = parseSelectorContract(':not(:where(#id))');
      assert.deepEqual(contract1.specificity, [0, 0, 0]);

      // :not(:is(#hero, .lead)) -> max is #hero [1, 0, 0]
      const contract2 = parseSelectorContract(':not(:is(#hero, .lead))');
      assert.deepEqual(contract2.specificity, [1, 0, 0]);

      // Triple nested :not(:not(:not(.cls))) -> [0, 1, 0]
      const contract3 = parseSelectorContract(':not(:not(:not(.cls)))');
      assert.deepEqual(contract3.specificity, [0, 1, 0]);
    });

    test('1.4 :has() correctly computes inner selector specificity including combinators', () => {
      // a:has(> img.avatar) -> a is [0, 0, 1], > img.avatar is [0, 1, 1] -> total [0, 1, 2]
      const contract1 = parseSelectorContract('a:has(> img.avatar)');
      assert.deepEqual(contract1.specificity, [0, 1, 2]);

      // section:has(#hero, .banner) -> section is [0, 0, 1], max is #hero [1, 0, 0] -> total [1, 0, 1]
      const contract2 = parseSelectorContract('section:has(#hero, .banner)');
      assert.deepEqual(contract2.specificity, [1, 0, 1]);
    });

    test('1.5 [UNRESOLVED DEFECT]: Attribute and pseudo-element specificity leakage inside :where() and :is()', () => {
      // W3C Selectors 4: :where() specificity is strictly [0, 0, 0], even with attributes or pseudo-elements
      const whereAttr = parseSelectorContract(':where([attr])');
      assert.deepEqual(whereAttr.specificity, [0, 0, 0], 'W3C: :where([attr]) must be [0, 0, 0]');

      const wherePseudo = parseSelectorContract(':where(::before)');
      assert.deepEqual(wherePseudo.specificity, [0, 0, 0], 'W3C: :where(::before) must be [0, 0, 0]');

      const isMultiAttr = parseSelectorContract(':is([attr], .class)');
      assert.deepEqual(isMultiAttr.specificity, [0, 1, 0], 'W3C: :is([attr], .class) max specificity is [0, 1, 0]');
    });
  });

  // ==========================================================================
  // Section 2: Quoted Strings, Brackets, and Escapes in Attributes
  // ==========================================================================
  describe('2. Quoted Strings, Brackets, and Escapes in Attributes', () => {

    test('2.1 Attributes containing commas, brackets, parens, and colons in quotes', () => {
      // Attribute value contains parens and pseudo lookalike: [data-expr=":is(a, b)"]
      const contract1 = parseSelectorContract('[data-expr=":is(a, b)"]');
      assert.equal(contract1.ast.selectors.length, 1);
      assert.deepEqual(contract1.specificity, [0, 1, 0]);

      // Attribute value contains square brackets: [data-match="[test]"]
      const contract2 = parseSelectorContract('[data-match="[test]"]');
      assert.equal(contract2.ast.selectors.length, 1);
      assert.deepEqual(contract2.specificity, [0, 1, 0]);

      // Single quoted attribute with comma: [data-items='one, two, three']
      const contract3 = parseSelectorContract("[data-items='one, two, three']");
      assert.equal(contract3.ast.selectors.length, 1);
      assert.deepEqual(contract3.specificity, [0, 1, 0]);
    });

    test('2.2 Attribute selector inside functional pseudo-class argument', () => {
      // :is([data-val="a,b"], .fallback)
      const contract = parseSelectorContract(':is([data-val="a,b"], .fallback)');
      assert.equal(contract.ast.selectors.length, 1);
      // Both branches contribute b=1 -> max is [0, 1, 0]
      assert.deepEqual(contract.specificity, [0, 1, 0]);
    });

    test('2.3 Combinator parsing preserves quoted strings with spaces', () => {
      // div[title="hello world"] > span
      const ast = parseSelectorAst('div[title="hello world"] > span');
      assert.equal(ast.selectors.length, 1);
      assert.equal(ast.selectors[0].tokens.length, 3);
      assert.equal(ast.selectors[0].tokens[0].value, 'div[title="hello world"]');
      assert.equal(ast.selectors[0].tokens[1].value, '>');
      assert.equal(ast.selectors[0].tokens[2].value, 'span');
    });
  });

  // ==========================================================================
  // Section 3: Token-Aware Root Leak Detection Invariants
  // ==========================================================================
  describe('3. Token-Aware Root Leak Detection Invariants', () => {

    test('3.1 True root leaks are caught unconditionally', () => {
      assert.equal(parseSelectorContract(':root').hasRootLeak, true);
      assert.equal(parseSelectorContract(':root > div').hasRootLeak, true);
      assert.equal(parseSelectorContract('html').hasRootLeak, true);
      assert.equal(parseSelectorContract('html.theme-dark').hasRootLeak, true);
      assert.equal(parseSelectorContract('html[data-theme="dark"]').hasRootLeak, true);
      assert.equal(parseSelectorContract('body').hasRootLeak, true);
      assert.equal(parseSelectorContract('body > main').hasRootLeak, true);
      assert.equal(parseSelectorContract('*').hasRootLeak, true);
      assert.equal(parseSelectorContract('* > .child').hasRootLeak, true);
      assert.equal(parseSelectorContract('*:hover').hasRootLeak, true);
    });

    test('3.2 Component classes, IDs, and attributes matching root keywords are NOT flagged', () => {
      assert.equal(parseSelectorContract('.html').hasRootLeak, false);
      assert.equal(parseSelectorContract('.html-editor').hasRootLeak, false);
      assert.equal(parseSelectorContract('.body').hasRootLeak, false);
      assert.equal(parseSelectorContract('.body-wrapper').hasRootLeak, false);
      assert.equal(parseSelectorContract('#html').hasRootLeak, false);
      assert.equal(parseSelectorContract('#body').hasRootLeak, false);
      assert.equal(parseSelectorContract('div.body').hasRootLeak, false);
      assert.equal(parseSelectorContract('span.html').hasRootLeak, false);
      assert.equal(parseSelectorContract('[data-role="body"]').hasRootLeak, false);
      assert.equal(parseSelectorContract('[data-target=":root"]').hasRootLeak, false);
    });

    test('3.3 Scoped universal selectors are NOT flagged as root leaks', () => {
      assert.equal(parseSelectorContract('.capsule *').hasRootLeak, false);
      assert.equal(parseSelectorContract(':scope *').hasRootLeak, false);
      assert.equal(parseSelectorContract('div > *').hasRootLeak, false);
    });
  });

  // ==========================================================================
  // Section 4: Donut Scope Boundary Piercing vs Container Queries
  // ==========================================================================
  describe('4. Donut Scope Boundary Piercing vs Container Queries', () => {

    test('4.1 Container queries (:has) targeting container are compliant', () => {
      const res1 = validateDonutSelector('div:has([data-capsule-slot]) > span', 'data-capsule-slot');
      assert.equal(res1.compliant, true);
      assert.equal(res1.violations.length, 0);

      const res2 = validateDonutSelector('.parent:has(> [data-capsule-slot])', 'data-capsule-slot');
      assert.equal(res2.compliant, true);
    });

    test('4.2 Penetrations into slot interior via > or space are caught', () => {
      const resChild = validateDonutSelector('[data-capsule-slot] > p', 'data-capsule-slot');
      assert.equal(resChild.compliant, false);
      assert.ok(resChild.violations.length >= 1);

      const resDesc = validateDonutSelector('[data-capsule-slot] p', 'data-capsule-slot');
      assert.equal(resDesc.compliant, false);
      assert.ok(resDesc.violations.length >= 1);

      const resDeep = validateDonutSelector('div [data-capsule-slot] > span.inner', 'data-capsule-slot');
      assert.equal(resDeep.compliant, false);
      assert.ok(resDeep.violations.length >= 1);
    });

    test('4.3 Slot self-styling and sibling combinators are compliant', () => {
      assert.equal(validateDonutSelector('[data-capsule-slot]', 'data-capsule-slot').compliant, true);
      assert.equal(validateDonutSelector('[data-capsule-slot]:hover', 'data-capsule-slot').compliant, true);
      assert.equal(validateDonutSelector('[data-capsule-slot]::before', 'data-capsule-slot').compliant, true);
      assert.equal(validateDonutSelector('[data-capsule-slot] + .sibling', 'data-capsule-slot').compliant, true);
      assert.equal(validateDonutSelector('[data-capsule-slot] ~ .sibling', 'data-capsule-slot').compliant, true);
    });

    test('4.4 validateStrictDonutScope handles multi-rule stylesheet with mixed valid and invalid rules', () => {
      const css = `
        @scope (.capsule) to ([data-capsule-slot]) {
          div.body { color: blue; }
          .card:has([data-capsule-slot]) > h2 { font-size: 20px; }
          [data-capsule-slot] { display: block; }
          [data-capsule-slot] > h1 { color: red; } /* VIOLATION 1: slot penetration */
          body { margin: 0; } /* VIOLATION 2: root leak */
        }
      `;

      const result = validateStrictDonutScope(css, 'data-capsule-slot');
      assert.equal(result.valid, false);
      assert.equal(result.violations.length, 2);
      assert.ok(result.violations.some(v => v.selector.includes('body')));
      assert.ok(result.violations.some(v => v.selector.includes('[data-capsule-slot] > h1')));
    });
  });

  // ==========================================================================
  // Section 5: SpatialRTree findCollisions() Identity & ID Variety
  // ==========================================================================
  describe('5. SpatialRTree findCollisions() Identity & ID Variety', () => {

    test('5.1 Disjoint items without id property yield exactly 0 collisions', () => {
      const tree = new SpatialRTree(4);
      // 10 items in a row, each 50px wide with 10px gaps, none have an 'id' property
      const items = [];
      for (let i = 0; i < 10; i++) {
        items.push({
          minX: i * 60,
          minY: 0,
          maxX: i * 60 + 50,
          maxY: 50
        });
      }
      tree.load(items);

      const collisions = tree.findCollisions();
      assert.equal(collisions.length, 0, 'Disjoint items missing id must never report false collisions');
    });

    test('5.2 Distinct items with identical duplicate IDs are detected on real overlap', () => {
      const tree = new SpatialRTree(4);
      // 4 items sharing id = 'shared-id', with items 0 and 1 overlapping, items 2 and 3 disjoint
      tree.load([
        { minX: 0, minY: 0, maxX: 100, maxY: 100, id: 'shared-id' },
        { minX: 50, minY: 50, maxX: 150, maxY: 150, id: 'shared-id' },
        { minX: 500, minY: 500, maxX: 600, maxY: 600, id: 'shared-id' },
        { minX: 700, minY: 700, maxX: 800, maxY: 800, id: 'shared-id' }
      ]);

      const collisions = tree.findCollisions();
      assert.equal(collisions.length, 1, 'Must detect the single overlapping pair despite identical IDs');
      assert.equal(collisions[0].a, 'shared-id');
      assert.equal(collisions[0].b, 'shared-id');
      assert.ok(collisions[0].iou > 0);
    });

    test('5.3 Falsy IDs (0, false, empty string) are stringified and handled correctly', () => {
      const tree = new SpatialRTree(4);
      tree.load([
        { minX: 0, minY: 0, maxX: 100, maxY: 100, id: 0 },
        { minX: 50, minY: 50, maxX: 150, maxY: 150, id: 1 },
        { minX: 300, minY: 300, maxX: 400, maxY: 400, id: false },
        { minX: 350, minY: 350, maxX: 450, maxY: 450, id: '' }
      ]);

      const collisions = tree.findCollisions();
      assert.equal(collisions.length, 2);

      // Pair 1: id: 0 and id: 1
      const c1 = collisions.find(c => (c.a === '0' && c.b === '1') || (c.a === '1' && c.b === '0'));
      assert.ok(c1, 'Collision between numeric 0 and 1 must be found');

      // Pair 2: id: false and id: ''
      const c2 = collisions.find(c => (c.a === '' && c.b === 'false') || (c.a === 'false' && c.b === ''));
      assert.ok(c2, 'Collision between false and empty string must be found');
    });

    test('5.4 Symmetrical pairwise collision detection without duplicate inversions', () => {
      const tree = new SpatialRTree(4);
      // 3 mutually overlapping items A, B, C: must report AB, AC, BC (exactly 3 collisions)
      tree.load([
        { minX: 0, minY: 0, maxX: 100, maxY: 100, id: 'box-A' },
        { minX: 20, minY: 20, maxX: 120, maxY: 120, id: 'box-B' },
        { minX: 40, minY: 40, maxX: 140, maxY: 140, id: 'box-C' }
      ]);

      const collisions = tree.findCollisions();
      assert.equal(collisions.length, 3, 'Must report exactly 3 unique pairwise collisions');

      const pairs = collisions.map(c => `${c.a}:::${c.b}`).sort();
      assert.deepEqual(pairs, ['box-A:::box-B', 'box-A:::box-C', 'box-B:::box-C']);
    });
  });
});
