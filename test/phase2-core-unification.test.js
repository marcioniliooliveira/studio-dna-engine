'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

describe('Phase 2: Core Unification & Client Eviction Regression Suite', () => {
  describe('1. Donut Scope AST Unification (kinetic-grammar-schema + wallace-css-analyzer -> css-selector-ast)', () => {
    const schema = require('../src/compiler/kinetic-grammar-schema');
    const ast = require('../src/css/css-selector-ast');
    const wallace = require('../src/compiler/wallace-css-analyzer');

    test('sibling combinators (+, ~) after boundary selector are compliant', () => {
      const css = `
        [data-kinetic-slot="x"] + div { margin-top: 10px; }
        [data-kinetic-slot] ~ p { opacity: 0.8; }
      `;
      const astRes = ast.validateDonutScopeInvariants(css);
      const schemaRes = schema.validateDonutScopeInvariants(css);
      assert.equal(astRes.compliant, true);
      assert.equal(schemaRes.compliant, true, 'Schema facade must match AST and permit sibling combinators');
    });

    test('custom boundaryAttr is honored rather than hardcoded to data-kinetic-slot', () => {
      const css = `[data-capsule-slot] .inner { color: red; }`;
      const schemaRes = schema.validateDonutScopeInvariants(css, 'data-capsule-slot');
      assert.equal(schemaRes.compliant, false, 'Custom boundaryAttr must catch slot interior piercing');
      assert.ok(schemaRes.violations.length >= 1);
    });

    test('functional pseudo-class wrapping :is([data-kinetic-slot]) h1 is caught', () => {
      const css = `:is([data-kinetic-slot]) h1 { color: red; }`;
      const schemaRes = schema.validateDonutScopeInvariants(css);
      assert.equal(schemaRes.compliant, false);
      assert.ok(schemaRes.violations.some((v) => v.includes('Donut piercing violation')));

      const wallaceRes = wallace.analyzeCssWallaceInvariants(css);
      assert.equal(wallaceRes.valid, false);
      assert.ok(wallaceRes.violations.some((v) => v.type === 'donut-piercing'));
    });

    test('wallace-css-analyzer does not false-positive on sibling combinators', () => {
      const css = `[data-kinetic-slot="x"] + div { margin: 8px; }`;
      const wallaceRes = wallace.analyzeCssWallaceInvariants(css);
      assert.equal(wallaceRes.valid, true);
      assert.equal(wallaceRes.violations.filter((v) => v.type === 'donut-piercing').length, 0);
    });
  });

  describe('2. Anti-Slop Canonical Dictionary & Helpers Unification', () => {
    test('src/shared/anti-slop-patterns.js exists and is shared across Gate and Transformer', () => {
      const sharedPath = path.join(ROOT, 'src/shared/anti-slop-patterns.js');
      assert.equal(fs.existsSync(sharedPath), true, 'Canonical shared anti-slop module must exist');

      const shared = require('../src/shared/anti-slop-patterns');
      const gateMod = require('../src/qa/anti-slop-gate');
      const transformerMod = require('../src/compiler/anti-slop-transformer');

      assert.strictEqual(gateMod.BANNED_SLOP_PATTERNS, shared.BANNED_SLOP_PATTERNS);
      assert.strictEqual(transformerMod.BANNED_SLOP_PATTERNS, shared.BANNED_SLOP_PATTERNS);
      assert.equal(typeof shared.findBannedSlopMatch, 'function');
      assert.equal(typeof shared.findUnfilledSlots, 'function');
    });

    test('AntiSlopGate detects full canonical slop patterns and hyphenated unfilled slots', () => {
      const { AntiSlopGate } = require('../src/qa/anti-slop-gate');
      const htmlContent = `<!DOCTYPE html><html><body><main>
        <p>As an AI language model, welcome.</p>
        <span>{SLOT_HERO-CTA}</span>
      </main></body></html>`;

      const report = AntiSlopGate.audit({ htmlContent });
      assert.equal(report.passed, false);
      assert.ok(report.stats.slopMatches >= 1, 'Must catch canonical slop pattern "as an ai"');
      assert.ok(report.stats.unfilledSlots >= 1, 'Must catch hyphenated unfilled slot "{SLOT_HERO-CTA}"');
    });

    test('UnifiedCRPQualityGates enforces shared canonical anti-slop patterns', () => {
      const { UnifiedCRPQualityGates } = require('../src/qa/unified-crp-quality-gates');
      const gates = new UnifiedCRPQualityGates();
      const res = gates.evaluateAntiSlop('Seja bem-vindo ao nosso site com ChatGPT');
      assert.equal(res.passed, false);
    });

    test('ast-injector validateAntiSlop rejects shared canonical slop patterns', () => {
      const { validateAntiSlop } = require('../src/generators/ast-injector');
      assert.throws(() => validateAntiSlop('Texto gerado ChatGPT', 'h1'));
    });
  });

  describe('3. Client-Specific Code Eviction from Core src/', () => {
    test('scalex-ast-transformer is moved out of src/pipeline/ into scripts/', () => {
      const legacyPath = path.join(ROOT, 'src/pipeline/scalex-ast-transformer.js');
      const targetPath = path.join(ROOT, 'scripts/scalex-ast-transformer.js');

      assert.equal(fs.existsSync(legacyPath), false, 'Client-specific SCALEX script must not live in src/pipeline/');
      assert.equal(fs.existsSync(targetPath), true, 'SCALEX script must reside in scripts/scalex-ast-transformer.js');

      const mod = require('../scripts/scalex-ast-transformer');
      assert.equal(typeof mod.transformScalexSite, 'function');
    });
  });
});
