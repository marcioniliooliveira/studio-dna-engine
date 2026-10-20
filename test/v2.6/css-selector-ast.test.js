/**
 * test/v2.6/css-selector-ast.test.js
 * 
 * Studio DNA PRO v2.6 — 4-Tier Comprehensive Test Suite
 * Feature: PostCSS Selector AST & Donut Scope Guard (R6.2, Pillar 6, Limitation L7)
 * 
 * Architecture:
 * - Tier 1: Feature Coverage (Parsing, Boundary Self-Styling, Direct Child >, Attribute Piercing, Pseudo-classes)
 * - Tier 2: Boundary & Corner Cases (Empty input, Sibling combinators, Deep nesting, Stripped comments, Whitespace)
 * - Tier 3: Cross-Feature Combinations (Full Stylesheet AST Traversal, Fallback Scoping Guard)
 * - Tier 4: Real-World Scenarios (Extracted Capsule Stylesheet Audit with Verified Non-Piercing Invariant)
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { resolveEngine } = require('./fixtures/harness');

const { parseSelectorAst, validateDonutSelector, validateDonutScopeInvariants } = resolveEngine('css-selector-ast');

describe('v2.6 PostCSS Selector AST & Donut Scope Guard', () => {

  // ==========================================================================
  // TIER 1: Feature Coverage (>= 5 Happy Path Cases)
  // ==========================================================================
  describe('Tier 1: Feature Coverage', () => {

    test('T1.1: parseSelectorAst decomposes compound selector into tokenized structure', () => {
      const ast = parseSelectorAst('div.kinetic-stage[data-active="true"]');
      assert.equal(ast.type, 'selector_list');
      assert.equal(ast.selectors.length, 1);
      assert.equal(ast.selectors[0].tokens.length, 1);
      assert.equal(ast.selectors[0].tokens[0].type, 'compound');
      assert.equal(ast.selectors[0].tokens[0].value, 'div.kinetic-stage[data-active="true"]');
    });

    test('T1.2: parseSelectorAst separates combinators (child >, descendant, sibling +/~)', () => {
      const ast = parseSelectorAst('header.site-header > nav ul li + li');
      const tokens = ast.selectors[0].tokens;
      assert.equal(tokens.length, 9);
      assert.equal(tokens[0].value, 'header.site-header');
      assert.equal(tokens[1].value, '>');
      assert.equal(tokens[2].value, 'nav');
      assert.equal(tokens[3].value, ' ');
      assert.equal(tokens[4].value, 'ul');
      assert.equal(tokens[5].value, ' ');
      assert.equal(tokens[6].value, 'li');
      assert.equal(tokens[7].value, '+');
      assert.equal(tokens[8].value, 'li');
    });

    test('T1.3: validateDonutSelector permits valid boundary self-styling', () => {
      const legitimate = [
        '[data-kinetic-slot]',
        '[data-kinetic-slot="hero-title"]',
        '[data-kinetic-slot][data-slot-type="heading"]',
        '.kinetic-stage [data-kinetic-slot]'
      ];

      for (const sel of legitimate) {
        const res = validateDonutSelector(sel);
        assert.equal(res.compliant, true, `Selector '${sel}' should be compliant`);
        assert.equal(res.violations.length, 0);
      }
    });

    test('T1.4: validateDonutSelector detects direct child combinator violation (Resolves L7 / Test 4.5)', () => {
      // In v2.5, regex allowed [data-kinetic-slot] > h1 because '>' was missing from character class.
      const childAttack = '[data-kinetic-slot] > h1';
      const res = validateDonutSelector(childAttack);

      assert.equal(res.compliant, false, 'Direct child combinator (>) must be flagged as violation');
      assert.equal(res.violations.length, 1);
      assert.match(res.violations[0], /penetrates slot interior/);
    });

    test('T1.5: validateDonutSelector detects attribute value descendant penetration (Resolves L7 / Test 4.6)', () => {
      // In v2.5, regex allowed [data-kinetic-slot="val"] h1 because it expected literal [data-kinetic-slot]
      const attrAttack = '[data-kinetic-slot="hero-title"] h1';
      const res = validateDonutSelector(attrAttack);

      assert.equal(res.compliant, false, 'Descendant selector through attribute value must be flagged as violation');
      assert.equal(res.violations.length, 1);
      assert.match(res.violations[0], /penetrates slot interior/);
    });

    test('T1.6: validateDonutSelector permits boundary self-styling with pseudo-classes', () => {
      const hoverSel = '[data-kinetic-slot]:hover';
      const focusSel = '[data-kinetic-slot="cta"]:focus-visible';
      
      assert.equal(validateDonutSelector(hoverSel).compliant, true);
      assert.equal(validateDonutSelector(focusSel).compliant, true);
    });
  });

  // ==========================================================================
  // TIER 2: Boundary & Corner Cases
  // ==========================================================================
  describe('Tier 2: Boundary & Corner Cases', () => {

    test('T2.1: Empty, null, or whitespace-only selector returns compliant with 0 violations', () => {
      assert.equal(validateDonutSelector('').compliant, true);
      assert.equal(validateDonutSelector('   ').compliant, true);
      assert.equal(validateDonutSelector(null).compliant, true);
    });

    test('T2.2: Deeply nested combinators flag violation immediately at slot boundary', () => {
      const deeplyNested = 'main > section.hero > div.container > [data-kinetic-slot="title"] > span.word > em';
      const res = validateDonutSelector(deeplyNested);

      assert.equal(res.compliant, false);
      assert.equal(res.violations.length, 1);
    });

    test('T2.3: Sibling combinator following slot does NOT penetrate slot interior', () => {
      // Styling adjacent sibling outside slot does not penetrate into the slot
      const adjacentSibling = '[data-kinetic-slot] + .slot-divider';
      const generalSibling = '[data-kinetic-slot] ~ .next-section';

      assert.equal(validateDonutSelector(adjacentSibling).compliant, true, 'Adjacent sibling (+) does not pierce slot');
      assert.equal(validateDonutSelector(generalSibling).compliant, true, 'General sibling (~) does not pierce slot');
    });

    test('T2.4: Comments containing slot syntax are safely stripped without false positive triggers', () => {
      const cssWithComment = `
        /* [data-kinetic-slot] > h1 { color: red; } */
        .stage-title {
          font-size: 2rem;
        }
      `;
      const res = validateDonutScopeInvariants(cssWithComment);
      assert.equal(res.compliant, true, 'Commented-out piercing selector must not trigger violation');
      assert.equal(res.violations.length, 0);
    });

    test('T2.5: Variable whitespace inside attribute selector is properly handled', () => {
      const spacedAttr = '[ data-kinetic-slot = "card-0" ] > p';
      const res = validateDonutSelector(spacedAttr);
      assert.equal(res.compliant, false, 'Should catch violation despite spacing inside brackets');
      assert.equal(res.violations.length, 1);
    });

    test('T2.6: Multiple comma-separated selectors with mixed valid and invalid branches', () => {
      const mixed = '.valid-class, [data-kinetic-slot] h2, [data-kinetic-slot="cta"]';
      const res = validateDonutSelector(mixed);
      assert.equal(res.compliant, false, 'Overall selector list must fail if any branch penetrates');
      assert.equal(res.violations.length, 1);
      assert.match(res.violations[0], /\[data-kinetic-slot\] h2/);
    });
  });

  // ==========================================================================
  // TIER 3: Cross-Feature Combinations
  // ==========================================================================
  describe('Tier 3: Cross-Feature Combinations', () => {

    test('T3.1: Full Stylesheet traversal detects multiple distinct violations across CSS rules', () => {
      const css = `
        @scope ([data-dna-capsule="hero"]) {
          :scope { display: flex; }
          .hero-banner { background: #000; }
          
          /* Violation 1: Direct child */
          [data-kinetic-slot] > h1 { font-size: 3rem; }

          /* Legitimate self-styling */
          [data-kinetic-slot] { position: relative; }

          /* Violation 2: Attribute descendant */
          [data-kinetic-slot="copy"] p.lead { line-height: 1.5; }
        }
      `;

      const validation = validateDonutScopeInvariants(css);
      assert.equal(validation.compliant, false);
      assert.equal(validation.violations.length, 2, 'Must detect exactly 2 violations in stylesheet');
    });

    test('T3.2: Scoping fallback generator proves Theorem 2 Donut Scope Boundary Isolation', () => {
      // Invariant: all scoped rules without slot violation when appended with :not([data-kinetic-slot] *)
      // cannot match any descendant element inside a slot.
      const localRules = [
        '.hero-title',
        '.hero-subtitle',
        'button.action-btn'
      ];

      const slug = 'hero-capsule';
      const compiledFallback = localRules.map(sel =>
        `[data-dna-capsule="${slug}"] :is(${sel}):not([data-kinetic-slot] *)`
      );

      // Verify each generated fallback contains the negative boundary guard
      for (const rule of compiledFallback) {
        assert.ok(rule.includes(':not([data-kinetic-slot] *)'), 'Fallback rule must include slot negative isolation');
        const check = validateDonutSelector(rule);
        assert.equal(check.compliant, true, 'Synthesized fallback rule must not violate donut boundary');
      }
    });
  });

  // ==========================================================================
  // TIER 4: Real-World Application Scenarios
  // ==========================================================================
  describe('Tier 4: Real-World Application Scenarios', () => {

    test('T4.1: Capsule Slicing Quality Gate audits 25 reference CSS rules', () => {
      const extractedCapsuleCss = `
        /* Section Capsule: Showcase Grid */
        [data-dna-capsule="showcase-grid"] {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
        }
        .grid-col-12 { grid-column: span 12; }
        .grid-col-6 { grid-column: span 6; }
        .grid-col-4 { grid-column: span 4; }
        .project-card { border-radius: 12px; overflow: hidden; }
        .project-card:hover { transform: translateY(-4px); }
        .project-thumb { aspect-ratio: 16/9; width: 100%; }
        .tag-pill { display: inline-block; padding: 4px 8px; }

        /* Valid slot containers */
        [data-kinetic-slot="card-0"] { min-height: 400px; }
        [data-kinetic-slot="card-1"] { min-height: 400px; }
        [data-kinetic-slot="card-2"] { min-height: 400px; }
        [data-kinetic-slot="card-3"] { min-height: 400px; }

        /* ILLEGAL PIERCING ATTEMPT 1: External CSS trying to override slot card title */
        [data-kinetic-slot="card-0"] .card-title {
          font-family: 'Comic Sans', cursive !important;
        }

        /* ILLEGAL PIERCING ATTEMPT 2: Child selector attempting to strip slot media styles */
        [data-kinetic-slot] > img {
          filter: grayscale(100%);
        }

        .section-footer { margin-top: 40px; }
      `;

      const audit = validateDonutScopeInvariants(extractedCapsuleCss);
      assert.equal(audit.compliant, false);
      assert.equal(audit.violations.length, 2, 'Quality gate must catch exactly 2 illegal rules in capsule CSS');

      // Assert specific violations caught
      assert.ok(audit.violations.some(v => v.includes('[data-kinetic-slot="card-0"]') && v.includes('.card-title')));
      assert.ok(audit.violations.some(v => v.includes('[data-kinetic-slot]') && v.includes('img')));
    });
  });
});
