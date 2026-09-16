const test = require('node:test');
const assert = require('node:assert/strict');
const Ajv2020 = require('ajv/dist/2020');
const { hashCanonical } = require('../src/design/canonical-json');
const { qualifyReferenceCandidate } = require('../src/design/reference-qualification');
const { promoteReference } = require('../src/design/reference-promotion-gate');
const {
  buildReferencePortfolio,
  validateReferencePortfolio,
  generateReferencePortfolioJsonSchema
} = require('../src/design/reference-portfolio');
const portfolioSchema = require('../schemas/v2/reference-portfolio.schema.json');

const ARTIFACT_HASH = 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

function makePromotion(candidateId, roles, clientScope = 'client-a') {
  const candidateWithoutHash = {
    schemaVersion: 2, contractKind: 'reference-candidate', candidateId, clientScope,
    sourceType: 'git-repository', roles, usageIntent: 'code-candidate',
    provenance: {
      canonicalUri: `https://github.com/example/${candidateId}`,
      commit: '0123456789abcdef0123456789abcdef01234567',
      license: { spdxId: 'MIT', evidenceUri: 'https://github.com/example/license' }
    }
  };
  const candidate = {
    ...candidateWithoutHash, lifecycle: 'quarantined', registeredAt: '2026-09-16T12:00:00.000Z',
    candidateHash: hashCanonical(candidateWithoutHash)
  };
  const qualification = qualifyReferenceCandidate({
    candidate, rubricVersion: 'v1',
    signals: Object.fromEntries(['creativeMerit', 'extractability', 'clientFit', 'runtimeQuality', 'provenanceConfidence', 'risk'].map(name => [name, { value: name === 'risk' ? 20 : 80, evidenceIds: ['evidence-001'] }])),
    evidence: { 'evidence-001': { sourceHash: ARTIFACT_HASH, path: 'audit/report.json' } }
  });
  const probeWithoutHash = {
    schemaVersion: 2, contractKind: 'reference-probe', candidateId, clientScope,
    candidateHash: candidate.candidateHash, qualificationHash: qualification.qualificationHash,
    artifactHash: ARTIFACT_HASH, acceptancePassRatio: 1, p0Failures: 0,
    pairwiseQualityDelta: 1, attempts: 1, inputTokens: 100, outputTokens: 200,
    durationMs: 300, evidenceIds: ['evidence-001']
  };
  const probe = { ...probeWithoutHash, probeHash: hashCanonical(probeWithoutHash) };
  return promoteReference({
    candidate, qualification, probe,
    humanDecision: {
      schemaVersion: 2, contractKind: 'human-reference-decision', clientScope, status: 'approved',
      actorId: 'reviewer-001', decidedAt: '2026-09-16T12:30:00.000Z',
      candidateHash: candidate.candidateHash, qualificationHash: qualification.qualificationHash, probeHash: probe.probeHash
    }
  });
}

test('builds a deterministic portfolio from one through five approved sources with separate role contributions', () => {
  const promotions = [
    makePromotion('candidate-c', ['motion']),
    makePromotion('candidate-a', ['composition', 'typography']),
    makePromotion('candidate-b', ['interaction'])
  ];
  const input = { clientScope: 'client-a', requiredRoles: ['typography', 'interaction', 'composition'], promotions };
  const first = buildReferencePortfolio(input);
  const second = buildReferencePortfolio({ ...input, promotions: [...promotions].reverse() });

  assert.deepEqual(first.requiredRoles, ['composition', 'interaction', 'typography']);
  assert.deepEqual(first.sources.map(source => [source.candidateId, source.roles]), [
    ['candidate-a', ['composition', 'typography']], ['candidate-b', ['interaction']]
  ]);
  assert.equal(first.sources.length, 2);
  assert.deepEqual(first, second);
  assert.match(first.portfolioHash, /^sha256:[a-f0-9]{64}$/);
});

test('rejects missing coverage, duplicate sources, excessive sources, cross-client and forged promotions', () => {
  const composition = makePromotion('candidate-a', ['composition']);
  const typography = makePromotion('candidate-b', ['typography']);
  const interaction = makePromotion('candidate-c', ['interaction']);
  const motion = makePromotion('candidate-d', ['motion']);
  const material = makePromotion('candidate-e', ['material']);
  const extra = makePromotion('candidate-f', ['image-treatment']);
  const cases = [
    { clientScope: 'client-a', requiredRoles: ['composition', 'typography'], promotions: [composition] },
    { clientScope: 'client-a', requiredRoles: ['composition'], promotions: [composition, composition] },
    { clientScope: 'client-a', requiredRoles: ['composition'], promotions: [composition, makePromotion('candidate-duplicate-role', ['composition'])] },
    { clientScope: 'client-a', requiredRoles: ['composition', 'typography', 'interaction', 'motion', 'material', 'image-treatment'], promotions: [composition, typography, interaction, motion, material, extra] },
    { clientScope: 'client-a', requiredRoles: ['composition'], promotions: [makePromotion('other', ['composition'], 'client-b')] },
    { clientScope: 'client-a', requiredRoles: ['composition'], promotions: [{ ...composition, promotionHash: ARTIFACT_HASH }] }
  ];
  for (const input of cases) assert.throws(() => buildReferencePortfolio(input));
});

test('rejects assignments outside promotion evidence and unknown portfolio fields', () => {
  const composition = makePromotion('candidate-a', ['composition']);
  const portfolio = buildReferencePortfolio({ clientScope: 'client-a', requiredRoles: ['composition'], promotions: [composition] });
  assert.throws(() => validateReferencePortfolio({ ...portfolio, extra: true }, { promotions: [composition] }), /unrecognized key/i);
  assert.throws(() => validateReferencePortfolio({
    ...portfolio, sources: [{ ...portfolio.sources[0], roles: ['typography'] }]
  }, { promotions: [composition] }), /source roles do not exactly match trusted promotion evidence/i);
  const validateSchema = new Ajv2020({ strict: false, allErrors: true }).compile(portfolioSchema);
  assert.deepEqual(portfolioSchema, generateReferencePortfolioJsonSchema());
  assert.equal(validateSchema({ ...portfolio, extra: true }), false, JSON.stringify(validateSchema.errors));
  assert.equal(validateSchema({ ...portfolio, requiredRoles: ['composition', 'composition'] }), false, JSON.stringify(validateSchema.errors));
});

test('requires trusted promotions to authorize a self-hashed portfolio source', () => {
  const promotion = makePromotion('candidate-a', ['composition']);
  const portfolio = buildReferencePortfolio({ clientScope: 'client-a', requiredRoles: ['composition'], promotions: [promotion] });
  assert.throws(() => validateReferencePortfolio(portfolio));
  assert.throws(() => validateReferencePortfolio(portfolio, { promotions: [] }));
  assert.throws(() => validateReferencePortfolio(portfolio, { promotions: [makePromotion('candidate-b', ['composition'])] }));
  assert.deepEqual(validateReferencePortfolio(portfolio, { promotions: [promotion] }), portfolio);
});

test('retains exactly one and exactly five trusted sources at portfolio boundaries', () => {
  const one = makePromotion('candidate-a', ['composition']);
  const five = [
    one, makePromotion('candidate-b', ['typography']), makePromotion('candidate-c', ['interaction']),
    makePromotion('candidate-d', ['motion']), makePromotion('candidate-e', ['material'])
  ];
  assert.equal(buildReferencePortfolio({ clientScope: 'client-a', requiredRoles: ['composition'], promotions: [one] }).sources.length, 1);
  assert.equal(buildReferencePortfolio({ clientScope: 'client-a', requiredRoles: ['composition', 'typography', 'interaction', 'motion', 'material'], promotions: five }).sources.length, 5);
});
