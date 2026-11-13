/**
 * test/challenger-m1-css-bugs.test.js
 * 
 * Empirical Challenger Bug Verification Suite: CSS Selector AST & Donut Scope
 * Asserts and verifies the remediation of the 5 concrete failure modes discovered during adversarial testing.
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  parseSelectorAst,
  parseSelectorContract,
  validateDonutSelector,
  validateStrictDonutScope
} = require('../src/css/css-selector-ast.js');

test('Adversarial Defect 1: Comma splitting inside functional pseudo-classes (:where, :is)', () => {
  // W3C Selectors 4: :where() always contributes [0, 0, 0] specificity regardless of arguments.
  // W3C Selectors 4: :is() contributes the maximum specificity of its arguments ([1, 0, 0]).
  const whereContract = parseSelectorContract(':where(#id, .class)');
  const isContract = parseSelectorContract(':is(#id, .class)');

  console.log('[Defect 1 Observation] :where(#id, .class) AST selectors:', whereContract.ast.selectors.map(s => s.raw));
  console.log('[Defect 1 Observation] :where(#id, .class) Specificity:', whereContract.specificity);
  console.log('[Defect 1 Observation] :is(#id, .class) Specificity:', isContract.specificity);

  // VERIFICATION OF REMEDIATION:
  // 1. Selector is intact without comma splitting inside parentheses
  assert.equal(whereContract.ast.selectors.length, 1, 'Remediation verified: selector list intact inside parentheses');
  assert.equal(whereContract.ast.selectors[0].raw, ':where(#id, .class)');

  // 2. Specificity calculation adheres to W3C Selectors 4
  assert.deepEqual(whereContract.specificity, [0, 0, 0], 'Remediation verified: :where() yielded [0, 0, 0]');
  assert.deepEqual(isContract.specificity, [1, 0, 0], 'Remediation verified: :is(#id, .class) yielded [1, 0, 0]');
});

test('Adversarial Defect 2: Comma splitting inside attribute selectors [data-val="a,b"]', () => {
  const contract = parseSelectorContract('[data-val="a,b"]');

  console.log('[Defect 2 Observation] [data-val="a,b"] AST selectors:', contract.ast.selectors.map(s => s.raw));
  console.log('[Defect 2 Observation] [data-val="a,b"] Specificity:', contract.specificity);

  // VERIFICATION OF REMEDIATION:
  // Attribute selector with comma in string value is preserved as 1 intact selector
  assert.equal(contract.ast.selectors.length, 1, 'Remediation verified: intact inside quoted attribute value');
  assert.equal(contract.ast.selectors[0].raw, '[data-val="a,b"]');
  assert.deepEqual(contract.specificity, [0, 1, 0], 'Remediation verified: attribute specificity is [0, 1, 0]');
});

test('Adversarial Defect 3: Regex balance failure on nested functional pseudo-classes :not(:not(.cls))', () => {
  const contract = parseSelectorContract(':not(:not(.cls))');

  console.log('[Defect 3 Observation] :not(:not(.cls)) Specificity:', contract.specificity);

  // VERIFICATION OF REMEDIATION:
  // W3C specificity for :not(:not(.cls)) is [0, 1, 0] (single class).
  // Balanced parentheses extraction properly unwinds nested functional pseudo-classes.
  assert.deepEqual(contract.specificity, [0, 1, 0], 'Remediation verified: nested :not produced [0, 1, 0]');
});

test('Adversarial Defect 4: False positive root leak detection on component classes (.html, div.body)', () => {
  const classHtml = parseSelectorContract('.html');
  const idBody = parseSelectorContract('#body');
  const divBody = parseSelectorContract('div.body');

  console.log('[Defect 4 Observation] .html hasRootLeak:', classHtml.hasRootLeak);
  console.log('[Defect 4 Observation] #body hasRootLeak:', idBody.hasRootLeak);
  console.log('[Defect 4 Observation] div.body hasRootLeak:', divBody.hasRootLeak);

  // VERIFICATION OF REMEDIATION:
  // .html and div.body are component classes, NOT root element targets.
  assert.equal(classHtml.hasRootLeak, false, 'Remediation verified: .html not flagged as root leak');
  assert.equal(idBody.hasRootLeak, false, 'Remediation verified: #body not flagged as root leak');
  assert.equal(divBody.hasRootLeak, false, 'Remediation verified: div.body not flagged as root leak');

  // Consequence in validateStrictDonutScope:
  const scopeCss = `
    @scope (.capsule) to ([data-capsule-slot]) {
      div.body {
        color: #333333;
      }
    }
  `;
  const validation = validateStrictDonutScope(scopeCss);
  assert.equal(validation.valid, true, 'Remediation verified: valid component styling accepted in donut scope');
  assert.equal(validation.violations.length, 0);
});

test('Adversarial Defect 5: False positive slot violation on ancestor queries (:has)', () => {
  const result = validateDonutSelector('div:has([data-capsule-slot]) > span', 'data-capsule-slot');

  console.log('[Defect 5 Observation] div:has([data-capsule-slot]) > span compliant:', result.compliant);
  console.log('[Defect 5 Observation] Violations:', result.violations);

  // VERIFICATION OF REMEDIATION:
  // 'div:has([data-capsule-slot]) > span' styles 'span' which is a child of 'div', NOT inside the slot.
  assert.equal(result.compliant, true, 'Remediation verified: ancestor :has() query not flagged as slot piercing');
  assert.equal(result.violations.length, 0);
});
