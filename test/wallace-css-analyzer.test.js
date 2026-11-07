'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  analyzeCssWallaceInvariants,
  calculateSelectorComplexity,
  calculateDeclarationUniquenessRatio
} = require('../src/compiler/wallace-css-analyzer');

test('analyzeCssWallaceInvariants blocks !important outside accessibility utilities', () => {
  const badCss = `
    .hero-title {
      font-size: 48px !important;
      color: #FFFFFF;
    }
  `;

  const result = analyzeCssWallaceInvariants(badCss);
  assert.equal(result.valid, false);
  const impViolation = result.violations.find(v => v.type === 'banned-important');
  assert.ok(impViolation, 'Should report banned-important violation');
  assert.match(impViolation.message, /!important is prohibited/i);
});

test('analyzeCssWallaceInvariants permits !important inside prefers-reduced-motion', () => {
  const a11yCss = `
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `;

  const result = analyzeCssWallaceInvariants(a11yCss);
  const impViolations = result.violations.filter(v => v.type === 'banned-important');
  assert.equal(impViolations.length, 0, 'Accessibility !important inside prefers-reduced-motion should be allowed');
});

test('analyzeCssWallaceInvariants validates donut scope invariants and blocks piercing', () => {
  const piercingCss = `
    @scope (.kinetic-stage) to ([data-kinetic-slot]) {
      .kinetic-stage [data-kinetic-slot] h1 {
        color: #00F0FF;
      }
      [data-kinetic-slot] > .slot-inner {
        padding: 16px;
      }
    }
  `;

  const result = analyzeCssWallaceInvariants(piercingCss);
  assert.equal(result.valid, false);
  const donutViolations = result.violations.filter(v => v.type === 'donut-piercing');
  assert.ok(donutViolations.length >= 1, 'Should detect donut-piercing violations');
});

test('calculateSelectorComplexity measures selector complexity correctly', () => {
  // Simple selectors <= 5
  assert.ok(calculateSelectorComplexity('.btn') <= 5);
  assert.ok(calculateSelectorComplexity('.nav > .item') <= 5);
  assert.ok(calculateSelectorComplexity('header.main nav.menu ul.list > li.item') <= 5);

  // Overly complex selector > 5
  const complex = 'div.container > section.hero .content-wrap ul.items + li.item:hover a.btn > span.label';
  const score = calculateSelectorComplexity(complex);
  assert.ok(score > 5, `Expected complexity > 5, got ${score}`);
});

test('analyzeCssWallaceInvariants blocks selectors exceeding max-selector-complexity', () => {
  const complexCss = `
    div.container > section.hero .content-wrap ul.items + li.item:hover a.btn > span.label {
      color: #FFFFFF;
    }
  `;

  const result = analyzeCssWallaceInvariants(complexCss, { maxSelectorComplexity: 5 });
  assert.equal(result.valid, false);
  const complexityViolation = result.violations.find(v => v.type === 'max-selector-complexity');
  assert.ok(complexityViolation, 'Should report max-selector-complexity violation');
});

test('calculateDeclarationUniquenessRatio computes ratio accurately', () => {
  // All unique declarations -> 1.0
  const uniqueDecls = [
    { prop: 'color', value: '#fff' },
    { prop: 'background', value: '#000' },
    { prop: 'margin', value: '16px' }
  ];
  assert.equal(calculateDeclarationUniquenessRatio(uniqueDecls), 1.0);

  // Heavily duplicated declarations
  const repeatedDecls = [
    { prop: 'color', value: '#fff' },
    { prop: 'color', value: '#fff' },
    { prop: 'color', value: '#fff' },
    { prop: 'color', value: '#fff' }
  ];
  assert.equal(calculateDeclarationUniquenessRatio(repeatedDecls), 0.25);
});

test('analyzeCssWallaceInvariants flags declaration uniqueness ratio below threshold', () => {
  // Repeating the same declaration multiple times to drag ratio below 0.66
  const repetitiveCss = `
    .a { color: #FFFFFF; background: #000000; }
    .b { color: #FFFFFF; background: #000000; }
    .c { color: #FFFFFF; background: #000000; }
    .d { color: #FFFFFF; background: #000000; }
  `;

  const result = analyzeCssWallaceInvariants(repetitiveCss, { minDeclarationUniquenessRatio: 0.66 });
  assert.equal(result.valid, false);
  const ratioViolation = result.violations.find(v => v.type === 'min-declaration-uniqueness-ratio');
  assert.ok(ratioViolation, 'Should report low uniqueness ratio violation');
});

test('analyzeCssWallaceInvariants detects duplicate selectors', () => {
  const dupCss = `
    .card-title {
      font-size: 24px;
      color: #FFFFFF;
    }

    .card-body {
      padding: 16px;
    }

    .card-title {
      font-weight: 700;
    }
  `;

  const result = analyzeCssWallaceInvariants(dupCss);
  assert.equal(result.valid, false);
  const dupViolation = result.violations.find(v => v.type === 'duplicate-selector');
  assert.ok(dupViolation, 'Should detect duplicate-selector violation');
  assert.match(dupViolation.message, /\.card-title/);
});

test('analyzeCssWallaceInvariants detects orphan CSS variables (unused and undefined)', () => {
  const orphanCss = `
    :root {
      --declared-and-used: #00F0FF;
      --orphan-unused-var: #FF0055;
    }

    .hero {
      color: var(--declared-and-used);
      background-color: var(--undefined-ghost-var);
    }
  `;

  const result = analyzeCssWallaceInvariants(orphanCss);
  assert.equal(result.valid, false);

  const undefinedViolation = result.violations.find(v => v.type === 'undefined-custom-property');
  assert.ok(undefinedViolation, 'Should report undefined-custom-property for --undefined-ghost-var');

  const unusedViolation = result.violations.find(v => v.type === 'unused-custom-property');
  assert.ok(unusedViolation, 'Should report unused-custom-property for --orphan-unused-var');
});

test('analyzeCssWallaceInvariants enforces token budgets (maxUniqueColors, maxUniqueFontSizes)', () => {
  const sprawlingCss = `
    .c1 { color: #111111; font-size: 10px; }
    .c2 { color: #222222; font-size: 12px; }
    .c3 { color: #333333; font-size: 14px; }
    .c4 { color: #444444; font-size: 16px; }
    .c5 { color: #555555; font-size: 18px; }
    .c6 { color: #666666; font-size: 20px; }
  `;

  const result = analyzeCssWallaceInvariants(sprawlingCss, {
    maxUniqueColors: 4,
    maxUniqueFontSizes: 4
  });

  assert.equal(result.valid, false);
  assert.ok(result.violations.some(v => v.type === 'max-unique-colors'));
  assert.ok(result.violations.some(v => v.type === 'max-unique-font-sizes'));
});

test('analyzeCssWallaceInvariants runs in under 80ms', () => {
  const css = `
    :root {
      --primary: #00F0FF;
      --bg: #02040A;
    }
    .hero {
      color: var(--primary);
      background: var(--bg);
      font-size: 32px;
      padding: 16px;
    }
    .footer {
      color: var(--primary);
      padding: 24px;
    }
  `;

  // Warmup JIT
  analyzeCssWallaceInvariants(css);

  const start = performance.now();
  const result = analyzeCssWallaceInvariants(css);
  const duration = performance.now() - start;

  assert.equal(result.valid, true);
  assert.ok(duration < 120, `Execution took ${duration.toFixed(2)}ms, expected < 120ms`);
});
