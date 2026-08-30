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

test('ICM Stage 05 rejects a network failure in the nested quality report', () => {
  const contract = STAGE_CONTRACTS[STAGES.STAGE_05_QUALITY_GATE];
  const result = contract.validateOutput({
    status: 'failed',
    gates: {
      antiSlop: { passed: true },
      console: { passed: true, errorsCount: 0 },
      network: { passed: false, failedRequestsCount: 1 },
      structural: { passed: true, brokenImagesCount: 0 }
    }
  });

  assert.equal(result.valid, false);
  assert.equal(result.passed, false);
  assert.equal(result.networkFailures, 1);
  assert.match(result.error, /network/i);
});

test('ICM Stage 05 accepts a candidate with all nested runtime gates passed', () => {
  const contract = STAGE_CONTRACTS[STAGES.STAGE_05_QUALITY_GATE];
  const result = contract.validateOutput({
    status: 'candidate',
    gates: {
      antiSlop: { passed: true },
      console: { passed: true, errorsCount: 0 },
      network: { passed: true, failedRequestsCount: 0 },
      structural: { passed: true, brokenImagesCount: 0 }
    }
  });

  assert.equal(result.valid, true);
  assert.equal(result.passed, true);
  assert.equal(result.jsErrors, 0);
  assert.equal(result.brokenImages, 0);
  assert.equal(result.networkFailures, 0);
  assert.equal(result.error, null);
});

test('ICM Stage 05 rejects an incomplete nested quality report', () => {
  const contract = STAGE_CONTRACTS[STAGES.STAGE_05_QUALITY_GATE];
  const result = contract.validateOutput({
    status: 'candidate',
    gates: {
      antiSlop: { passed: true },
      console: { passed: true, errorsCount: 0 }
    }
  });

  assert.equal(result.valid, false);
  assert.equal(result.passed, false);
  assert.match(result.error, /incompleto/i);
});
