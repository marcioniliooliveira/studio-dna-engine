const test = require('node:test');
const assert = require('node:assert/strict');
const Ajv2020 = require('ajv/dist/2020');
const { hashCanonical } = require('../src/design/canonical-json');
const { qualifyReferenceCandidate } = require('../src/design/reference-qualification');
const {
  validateReferenceProbe,
  generateReferenceProbeJsonSchema
} = require('../src/design/reference-probe-contract');
const {
  promoteReference,
  generateReferencePromotionJsonSchema
} = require('../src/design/reference-promotion-gate');
const probeSchema = require('../schemas/v2/reference-probe.schema.json');
const promotionSchema = require('../schemas/v2/reference-promotion.schema.json');

const ARTIFACT_HASH = 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

function makeCandidate(overrides = {}) {
  const candidate = {
    schemaVersion: 2,
    contractKind: 'reference-candidate',
    candidateId: 'reference-001',
    clientScope: 'client-a',
    sourceType: 'git-repository',
    roles: ['composition'],
    usageIntent: 'code-candidate',
    provenance: {
      canonicalUri: 'https://github.com/example/reference',
      commit: '0123456789abcdef0123456789abcdef01234567',
      license: { spdxId: 'MIT', evidenceUri: 'https://github.com/example/reference/blob/main/LICENSE' }
    },
    lifecycle: 'quarantined',
    registeredAt: '2026-09-16T12:00:00.000Z',
    ...overrides
  };
  const { lifecycle, registeredAt, candidateHash, ...unregistered } = candidate;
  return { ...candidate, candidateHash: candidateHash || hashCanonical(unregistered) };
}

function makeQualification(candidate = makeCandidate()) {
  return qualifyReferenceCandidate({
    candidate,
    rubricVersion: 'v1',
    signals: {
      creativeMerit: { value: 80, evidenceIds: ['evidence-001'] },
      extractability: { value: 70, evidenceIds: ['evidence-001'] },
      clientFit: { value: 75, evidenceIds: ['evidence-001'] },
      runtimeQuality: { value: 85, evidenceIds: ['evidence-001'] },
      provenanceConfidence: { value: 90, evidenceIds: ['evidence-001'] },
      risk: { value: 20, evidenceIds: ['evidence-001'] }
    },
    evidence: { 'evidence-001': { sourceHash: ARTIFACT_HASH, path: 'audit/report.json' } }
  });
}

function makeProbe(candidate = makeCandidate(), qualification = makeQualification(candidate), overrides = {}) {
  const probe = {
    schemaVersion: 2,
    contractKind: 'reference-probe',
    candidateId: candidate.candidateId,
    clientScope: candidate.clientScope,
    candidateHash: candidate.candidateHash,
    qualificationHash: qualification.qualificationHash,
    artifactHash: ARTIFACT_HASH,
    acceptancePassRatio: 1,
    p0Failures: 0,
    pairwiseQualityDelta: 1,
    attempts: 1,
    inputTokens: 100,
    outputTokens: 200,
    durationMs: 300,
    evidenceIds: ['evidence-001'],
    ...overrides
  };
  const { probeHash, ...withoutHash } = probe;
  return { ...probe, probeHash: probeHash || hashCanonical(withoutHash) };
}

function makeDecision(candidate, qualification, probe, overrides = {}) {
  return {
    schemaVersion: 2,
    contractKind: 'human-reference-decision',
    clientScope: candidate.clientScope,
    status: 'approved',
    actorId: 'reviewer-001',
    decidedAt: '2026-09-16T12:30:00.000Z',
    candidateHash: candidate.candidateHash,
    qualificationHash: qualification.qualificationHash,
    probeHash: probe.probeHash,
    ...overrides
  };
}

test('validates every probe metric and derives a deterministic canonical probe hash', () => {
  const candidate = makeCandidate();
  const qualification = makeQualification(candidate);
  const first = validateReferenceProbe(makeProbe(candidate, qualification));
  const second = validateReferenceProbe(makeProbe(candidate, qualification));

  assert.deepEqual(first, second);
  assert.match(first.probeHash, /^sha256:[a-f0-9]{64}$/);
  assert.equal(first.acceptancePassRatio, 1);
  assert.equal(first.p0Failures, 0);
  assert.equal(first.pairwiseQualityDelta, 1);
  assert.equal(first.attempts, 1);
  assert.equal(first.inputTokens, 100);
  assert.equal(first.outputTokens, 200);
  assert.equal(first.durationMs, 300);
});

test('rejects probe unknown fields, invalid metrics, and unordered duplicate evidence IDs', () => {
  const candidate = makeCandidate();
  const qualification = makeQualification(candidate);
  for (const overrides of [
    { unexpected: true }, { acceptancePassRatio: 1.1 }, { p0Failures: -1 },
    { pairwiseQualityDelta: 101 }, { attempts: 4 }, { inputTokens: -1 },
    { outputTokens: 1.5 }, { durationMs: -1 }, { evidenceIds: ['z', 'a'] },
    { evidenceIds: ['evidence-001', 'evidence-001'] }
  ]) {
    assert.throws(() => validateReferenceProbe(makeProbe(candidate, qualification, overrides)));
  }
});

test('promotion rejects forged links, insufficient evidence, invalid human decisions, and cross-client inputs', () => {
  const candidate = makeCandidate();
  const qualification = makeQualification(candidate);
  const probe = makeProbe(candidate, qualification);
  const decision = makeDecision(candidate, qualification, probe);
  const probeWithDecision = overrides => {
    const changedProbe = makeProbe(candidate, qualification, overrides);
    return [changedProbe, makeDecision(candidate, qualification, changedProbe)];
  };
  const [p0Probe, p0Decision] = probeWithDecision({ p0Failures: 1 });
  const [ratioProbe, ratioDecision] = probeWithDecision({ acceptancePassRatio: 0.99 });
  const [deltaProbe, deltaDecision] = probeWithDecision({ pairwiseQualityDelta: 0 });
  const [attemptsProbe, attemptsDecision] = probeWithDecision({ attempts: 4 });
  const [missingEvidenceProbe, missingEvidenceDecision] = probeWithDecision({ evidenceIds: ['missing-evidence'] });
  const cases = [
    [makeCandidate({ candidateHash: ARTIFACT_HASH }), qualification, probe, decision],
    [candidate, qualification, p0Probe, p0Decision],
    [candidate, qualification, ratioProbe, ratioDecision],
    [candidate, qualification, deltaProbe, deltaDecision],
    [candidate, qualification, attemptsProbe, attemptsDecision],
    [candidate, qualification, probe, makeDecision(candidate, qualification, probe, { status: 'rejected' })],
    [candidate, qualification, probe, makeDecision(candidate, qualification, probe, { decidedAt: '2026-09-16T12:30:00Z' })],
    [candidate, qualification, missingEvidenceProbe, missingEvidenceDecision],
    [candidate, qualification, probe, makeDecision(candidate, qualification, probe, { clientScope: 'client-b' })]
  ];
  for (const [badCandidate, badQualification, badProbe, badDecision] of cases) {
    assert.throws(() => promoteReference({
      candidate: badCandidate, qualification: badQualification, probe: badProbe, humanDecision: badDecision
    }));
  }
});

test('promotion rejects a qualification with roles not held by its candidate', () => {
  const candidate = makeCandidate({ roles: ['composition', 'typography'] });
  const qualification = makeQualification(candidate);
  qualification.roles = ['composition'];
  const { qualificationHash, ...withoutHash } = qualification;
  qualification.qualificationHash = hashCanonical(withoutHash);
  const probe = makeProbe(candidate, qualification);

  assert.throws(() => promoteReference({
    candidate, qualification, probe, humanDecision: makeDecision(candidate, qualification, probe)
  }), /roles/i);
});

test('promotes only an approved exact evidence chain without raw candidate content', () => {
  const candidate = makeCandidate();
  const qualification = makeQualification(candidate);
  const probe = makeProbe(candidate, qualification);
  const promotion = promoteReference({
    candidate, qualification, probe, humanDecision: makeDecision(candidate, qualification, probe)
  });

  assert.deepEqual(promotion.roles, ['composition']);
  assert.equal(promotion.usageIntent, 'code-candidate');
  assert.equal(promotion.candidateHash, candidate.candidateHash);
  assert.equal(promotion.qualificationHash, qualification.qualificationHash);
  assert.equal(promotion.probeHash, probe.probeHash);
  assert.deepEqual(promotion.decision, { actorId: 'reviewer-001', decidedAt: '2026-09-16T12:30:00.000Z' });
  assert.equal(Object.hasOwn(promotion, 'provenance'), false);
  assert.equal(Object.hasOwn(promotion, 'evidence'), false);
  assert.match(promotion.promotionHash, /^sha256:[a-f0-9]{64}$/);
});

test('runtime and checked-in JSON Schemas reject representative invalid payloads deterministically', () => {
  assert.deepEqual(probeSchema, generateReferenceProbeJsonSchema());
  assert.deepEqual(promotionSchema, generateReferencePromotionJsonSchema());
  const candidate = makeCandidate();
  const qualification = makeQualification(candidate);
  const invalidProbe = makeProbe(candidate, qualification, { attempts: 4 });
  const probeValidate = new Ajv2020({ strict: false, allErrors: true, validateFormats: false }).compile(probeSchema);
  assert.throws(() => validateReferenceProbe(invalidProbe));
  assert.equal(probeValidate(invalidProbe), false, JSON.stringify(probeValidate.errors));

  const promotion = promoteReference({
    candidate, qualification, probe: makeProbe(candidate, qualification),
    humanDecision: makeDecision(candidate, qualification, makeProbe(candidate, qualification))
  });
  promotion.decision.actorId = '';
  const promotionValidate = new Ajv2020({ strict: false, allErrors: true, validateFormats: false }).compile(promotionSchema);
  assert.equal(promotionValidate(promotion), false, JSON.stringify(promotionValidate.errors));

  const invalidRolePromotion = structuredClone(promoteReference({
    candidate, qualification, probe: makeProbe(candidate, qualification),
    humanDecision: makeDecision(candidate, qualification, makeProbe(candidate, qualification))
  }));
  invalidRolePromotion.roles = ['untrusted-role'];
  assert.equal(promotionValidate(invalidRolePromotion), false, JSON.stringify(promotionValidate.errors));

  const noncanonicalPromotion = structuredClone(promoteReference({
    candidate, qualification, probe: makeProbe(candidate, qualification),
    humanDecision: makeDecision(candidate, qualification, makeProbe(candidate, qualification))
  }));
  noncanonicalPromotion.decision.decidedAt = '2026-09-16T12:30:00Z';
  assert.equal(promotionValidate(noncanonicalPromotion), false, JSON.stringify(promotionValidate.errors));
});
