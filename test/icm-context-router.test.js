const test = require('node:test');
const assert = require('node:assert/strict');
const { ContextRouter } = require('../icm/_core/context-router');
const { STAGES, STAGE_CONTRACTS } = require('../icm/_core/contracts');

test('ICM ContextRouter blocks cross-client file access', () => {
  const router = new ContextRouter();

  const res = router.validateContextAccess(STAGES.STAGE_02_BRAND_SPEC, [
    'clientes/cliente-b/brand-spec.json'
  ], {
    activeClientSlug: 'cliente-a'
  });

  assert.equal(res.allowed, false);
  assert.ok(res.violations.some(v => v.includes('Cross-client access violado')));
});

test('ICM ContextRouter allows access to active client files', () => {
  const router = new ContextRouter();

  const res = router.validateContextAccess(STAGES.STAGE_02_BRAND_SPEC, [
    'clientes/cliente-a/brand-spec.json'
  ], {
    activeClientSlug: 'cliente-a'
  });

  assert.equal(res.allowed, true);
  assert.equal(res.violations.length, 0);
});

test('ICM ContextRouter blocks unselected reference access', () => {
  const router = new ContextRouter();

  const res = router.validateContextAccess(STAGES.STAGE_03_SLOT_COMPOSITION, [
    'copias/unselected-ref/index.html'
  ], {
    selectedRefSlug: 'selected-ref'
  });

  assert.equal(res.allowed, false);
  assert.ok(res.violations.some(v => v.includes('Unselected reference access')));
});

test('ICM Stage Contract validates reference selection output', () => {
  const contract = STAGE_CONTRACTS[STAGES.STAGE_01_REFERENCE_SELECTION];

  const invalidRes = contract.validateOutput({});
  assert.equal(invalidRes.valid, false);

  const validRes = contract.validateOutput({
    selectedRefSlug: 'elyse-residence-dev-webflow-io',
    compatibilityScore: 92
  });
  assert.equal(validRes.valid, true);
});

test('ICM Stage Contract validates content slots against anti-slop rules', () => {
  const contract = STAGE_CONTRACTS[STAGES.STAGE_03_SLOT_COMPOSITION];

  const slopRes = contract.validateOutput({
    heroTitle: 'Lorem Ipsum Dolor Sit Amet',
    ctaButton: 'Clique Aqui'
  });
  assert.equal(slopRes.valid, false);
  assert.ok(slopRes.error.includes('Slop/Placeholder detectado'));

  const cleanRes = contract.validateOutput({
    heroTitle: 'Tecnologia Avançada para sua Empresa',
    ctaButton: 'Solicitar Orçamento'
  });
  assert.equal(cleanRes.valid, true);
});
