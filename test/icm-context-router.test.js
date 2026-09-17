const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { ContextRouter } = require('../icm/_core/context-router');
const { STAGES, STAGE_CONTRACTS } = require('../icm/_core/contracts');
const { canonicalize, hashCanonical } = require('../src/design/canonical-json');
const { qualifyReferenceCandidate } = require('../src/design/reference-qualification');
const { promoteReference } = require('../src/design/reference-promotion-gate');
const { buildReferencePortfolio } = require('../src/design/reference-portfolio');
const keyPair = crypto.generateKeyPairSync('ed25519');
const trustedPublicKeys = { 'reviewer-key-1': keyPair.publicKey };

function makeTrustedPromotion() {
  const candidateWithoutHash = { schemaVersion: 2, contractKind: 'reference-candidate', candidateId: 'reference-001', clientScope: 'cliente-a', sourceType: 'git-repository', roles: ['composition'], usageIntent: 'code-candidate', provenance: { canonicalUri: 'https://github.com/example/reference-001', commit: '0123456789abcdef0123456789abcdef01234567', license: { spdxId: 'MIT', evidenceUri: 'https://github.com/example/license' } } };
  const candidate = { ...candidateWithoutHash, lifecycle: 'quarantined', registeredAt: '2026-09-16T12:00:00.000Z', candidateHash: hashCanonical(candidateWithoutHash) };
  const qualification = qualifyReferenceCandidate({ candidate, rubricVersion: 'v1', signals: Object.fromEntries(['creativeMerit', 'extractability', 'clientFit', 'runtimeQuality', 'provenanceConfidence', 'risk'].map(name => [name, { value: name === 'risk' ? 20 : 80, evidenceIds: ['evidence-001'] }])), evidence: { 'evidence-001': { sourceHash: 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', path: 'audit/report.json' } } });
  const probeWithoutHash = { schemaVersion: 2, contractKind: 'reference-probe', candidateId: candidate.candidateId, clientScope: candidate.clientScope, candidateHash: candidate.candidateHash, qualificationHash: qualification.qualificationHash, artifactHash: 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', acceptancePassRatio: 1, p0Failures: 0, pairwiseQualityDelta: 1, attempts: 1, inputTokens: 100, outputTokens: 200, durationMs: 300, evidenceIds: ['evidence-001'] };
  const probe = { ...probeWithoutHash, probeHash: hashCanonical(probeWithoutHash) };
  const decisionPayload = { schemaVersion: 2, contractKind: 'human-reference-decision', clientScope: candidate.clientScope, status: 'approved', candidateId: candidate.candidateId, roles: ['composition'], usageIntent: 'code-candidate', actorId: 'reviewer-001', decidedAt: '2026-09-16T12:30:00.000Z', candidateHash: candidate.candidateHash, qualificationHash: qualification.qualificationHash, probeHash: probe.probeHash };
  const signedPayload = canonicalize(decisionPayload);
  return promoteReference({ candidate, qualification, probe, humanDecision: { ...decisionPayload, signedPayload, keyId: 'reviewer-key-1', algorithm: 'ed25519', signature: crypto.sign(null, Buffer.from(signedPayload), keyPair.privateKey).toString('base64') } }, { trustedPublicKeys });
}

function makePortfolio(clientScope = 'cliente-a') {
  const withoutHash = {
    schemaVersion: 2,
    contractKind: 'reference-portfolio',
    clientScope,
    requiredRoles: ['composition'],
    sources: [{
      candidateId: 'reference-001',
      promotionHash: 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
      roles: ['composition']
    }]
  };
  return { ...withoutHash, portfolioHash: hashCanonical(withoutHash) };
}

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

test('ICM Stage 01 blocks raw copies even when the reference is selected', () => {
  const router = new ContextRouter();
  const res = router.validateContextAccess(STAGES.STAGE_01_REFERENCE_SELECTION, ['copias/selected-ref/index.html'], { selectedRefSlug: 'selected-ref' });
  assert.equal(res.allowed, false);
  assert.ok(res.violations.some(v => v.includes('Raw reference access')));
});

test('ICM Stage 01 preserves V1 validation and fails closed for V2 without trusted promotions', () => {
  const contract = STAGE_CONTRACTS[STAGES.STAGE_01_REFERENCE_SELECTION];
  assert.equal(contract.validateOutput({ selectedRefSlug: 'reference-001', compatibilityScore: 92 }).valid, true);
  assert.equal(contract.validateOutput({
    schemaVersion: 2, selectedRefSlug: 'reference-001', compatibilityScore: 92,
    referencePortfolio: makePortfolio('cliente-a')
  }, { activeClientSlug: 'cliente-a' }).valid, false);
});

test('ICM Stage 01 accepts V2 only with a matching trusted promotion context', () => {
  const contract = STAGE_CONTRACTS[STAGES.STAGE_01_REFERENCE_SELECTION];
  const promotion = makeTrustedPromotion();
  const referencePortfolio = buildReferencePortfolio({ clientScope: 'cliente-a', requiredRoles: ['composition'], promotions: [promotion], assignments: [{ candidateId: 'reference-001', roles: ['composition'] }] }, { trustedPublicKeys });
  assert.equal(contract.validateOutput({ schemaVersion: 2, selectedRefSlug: 'reference-001', compatibilityScore: 92, referencePortfolio }, { activeClientSlug: 'cliente-a', promotions: [promotion], trustedPublicKeys }).valid, true);
});

test('ICM Stage 01 rejects missing, forged, and client-mismatched V2 portfolios', () => {
  const contract = STAGE_CONTRACTS[STAGES.STAGE_01_REFERENCE_SELECTION];
  const valid = makePortfolio('cliente-a');
  for (const output of [
    { schemaVersion: 2, selectedRefSlug: 'reference-001', compatibilityScore: 92 },
    { schemaVersion: 2, selectedRefSlug: 'reference-001', compatibilityScore: 92, referencePortfolio: { ...valid, portfolioHash: 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef' } },
    { schemaVersion: 2, selectedRefSlug: 'reference-001', compatibilityScore: 92, referencePortfolio: valid, extra: true },
    { schemaVersion: 3, selectedRefSlug: 'reference-001', compatibilityScore: 92, referencePortfolio: valid }
  ]) {
    assert.equal(contract.validateOutput(output, { activeClientSlug: 'cliente-b' }).valid, false);
  }
});

test('ICM Stage 01 routes only the active client portfolio artifact', () => {
  const router = new ContextRouter();
  assert.deepEqual(router.resolveStageInputs(STAGES.STAGE_01_REFERENCE_SELECTION, { clientSlug: 'cliente-a' }), {
    clientBriefing: 'clientes/cliente-a/briefing.json',
    referencePortfolio: 'clientes/cliente-a/references/reference-portfolio.json'
  });
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
