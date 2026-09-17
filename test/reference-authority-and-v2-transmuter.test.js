const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { canonicalize, hashCanonical } = require('../src/design/canonical-json');
const { qualifyReferenceCandidate } = require('../src/design/reference-qualification');
const { promoteReference, validateReferencePromotion } = require('../src/design/reference-promotion-gate');
const { buildReferencePortfolio, validateReferencePortfolio } = require('../src/design/reference-portfolio');
const { transmuteClient } = require('../src/pipeline/transmuter');

const ARTIFACT_HASH = 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const keyPair = crypto.generateKeyPairSync('ed25519');
const trustedPublicKeys = { 'reviewer-key-1': keyPair.publicKey };

function signDecision(payload, overrides = {}) {
  const signedPayload = canonicalize(payload);
  return {
    ...payload,
    signedPayload,
    keyId: 'reviewer-key-1',
    algorithm: 'ed25519',
    signature: crypto.sign(null, Buffer.from(signedPayload), keyPair.privateKey).toString('base64'),
    ...overrides
  };
}

function makePromotion(candidateId, roles) {
  const candidateWithoutHash = {
    schemaVersion: 2, contractKind: 'reference-candidate', candidateId, clientScope: 'client-a',
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
    schemaVersion: 2, contractKind: 'reference-probe', candidateId, clientScope: 'client-a',
    candidateHash: candidate.candidateHash, qualificationHash: qualification.qualificationHash,
    artifactHash: ARTIFACT_HASH, acceptancePassRatio: 1, p0Failures: 0, pairwiseQualityDelta: 1,
    attempts: 1, inputTokens: 1, outputTokens: 1, durationMs: 1, evidenceIds: ['evidence-001']
  };
  const probe = { ...probeWithoutHash, probeHash: hashCanonical(probeWithoutHash) };
  const canonicalRoles = [...roles].sort();
  const decision = signDecision({
    schemaVersion: 2, contractKind: 'human-reference-decision', clientScope: 'client-a', status: 'approved',
    candidateId, roles: canonicalRoles, usageIntent: 'code-candidate', actorId: 'reviewer-001', decidedAt: '2026-09-16T12:30:00.000Z', candidateHash: candidate.candidateHash,
    qualificationHash: qualification.qualificationHash, probeHash: probe.probeHash
  });
  return promoteReference({ candidate, qualification, probe, humanDecision: decision }, { trustedPublicKeys });
}

test('canonical JSON rejects arrays whose prototype was altered', () => {
  const array = ['safe'];
  Object.setPrototypeOf(array, { map: () => ['"forged"'] });
  assert.throws(() => canonicalize(array), /Non-JSON-safe array/i);
});

test('promotion authority rejects forged signatures, unknown keys, altered decisions, and self-hashed forgeries', () => {
  const promotion = makePromotion('candidate-a', ['composition']);
  assert.throws(() => validateReferencePromotion(promotion), /trusted public-key map/i);
  assert.deepEqual(validateReferencePromotion(promotion, { trustedPublicKeys }), promotion);

  const forgedSignature = structuredClone(promotion);
  forgedSignature.decision.signature = Buffer.alloc(64).toString('base64');
  const { promotionHash: forgedPromotionHash, ...forgedWithoutHash } = forgedSignature;
  forgedSignature.promotionHash = hashCanonical(forgedWithoutHash);
  assert.throws(() => validateReferencePromotion(forgedSignature, { trustedPublicKeys }), /signature/i);

  const unknownKey = structuredClone(promotion);
  unknownKey.decision.keyId = 'unknown';
  assert.throws(() => validateReferencePromotion(unknownKey, { trustedPublicKeys }), /trusted key/i);

  const alteredDecision = structuredClone(promotion);
  alteredDecision.decision.actorId = 'attacker';
  assert.throws(() => validateReferencePromotion(alteredDecision, { trustedPublicKeys }), /signed payload/i);

  const selfHashedForgery = structuredClone(promotion);
  selfHashedForgery.usageIntent = 'asset-candidate';
  const { promotionHash, ...withoutHash } = selfHashedForgery;
  selfHashedForgery.promotionHash = hashCanonical(withoutHash);
  assert.throws(() => validateReferencePromotion(selfHashedForgery, { trustedPublicKeys }), /decision does not match/i);

  const rsaKeyPair = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
  const wrongAlgorithmKey = structuredClone(promotion);
  wrongAlgorithmKey.decision.keyId = 'rsa-key';
  const { signedPayload, keyId, algorithm, signature, ...payload } = wrongAlgorithmKey.decision;
  wrongAlgorithmKey.decision.signedPayload = canonicalize(payload);
  wrongAlgorithmKey.decision.signature = crypto.sign(null, Buffer.from(wrongAlgorithmKey.decision.signedPayload), rsaKeyPair.privateKey).toString('base64');
  const { promotionHash: oldPromotionHash, ...wrongAlgorithmWithoutHash } = wrongAlgorithmKey;
  wrongAlgorithmKey.promotionHash = hashCanonical(wrongAlgorithmWithoutHash);
  assert.throws(
    () => validateReferencePromotion(wrongAlgorithmKey, { trustedPublicKeys: { 'rsa-key': rsaKeyPair.publicKey } }),
    /Ed25519/i
  );
});

test('explicit portfolio assignments authorize disjoint roles from overlapping promotions exactly once', () => {
  const first = makePromotion('candidate-a', ['composition', 'typography']);
  const second = makePromotion('candidate-b', ['typography', 'motion']);
  const input = {
    clientScope: 'client-a', requiredRoles: ['composition', 'typography', 'motion'], promotions: [first, second],
    assignments: [
      { candidateId: 'candidate-a', roles: ['composition'] },
      { candidateId: 'candidate-b', roles: ['motion', 'typography'] }
    ]
  };
  const portfolio = buildReferencePortfolio(input, { trustedPublicKeys });
  assert.deepEqual(validateReferencePortfolio(portfolio, { promotions: [first, second], trustedPublicKeys }), portfolio);
  for (const assignments of [
    [{ candidateId: 'candidate-a', roles: ['composition', 'typography'] }, { candidateId: 'candidate-b', roles: ['typography', 'motion'] }],
    [{ candidateId: 'candidate-a', roles: ['composition'] }, { candidateId: 'candidate-b', roles: ['motion'] }],
    [{ candidateId: 'candidate-a', roles: ['motion'] }, { candidateId: 'candidate-b', roles: ['typography'] }]
  ]) {
    assert.throws(() => buildReferencePortfolio({ ...input, assignments }, { trustedPublicKeys }));
  }
});

test('V2 transmutation rejects a malicious selected reference before raw reference access', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'transmuter-v2-block-'));
  const client = path.join(root, 'clientes', 'client-a');
  fs.mkdirSync(client, { recursive: true });
  fs.mkdirSync(path.join(root, 'copias', 'private-reference'), { recursive: true });
  fs.writeFileSync(path.join(root, 'copias', 'private-reference', 'index.html'), '<p>secret</p>');
  fs.writeFileSync(path.join(client, 'reference-selection.json'), JSON.stringify({ schemaVersion: 2, selectedRefSlug: '../private-reference' }));
  const originalCwd = process.cwd();
  const monitoredMethods = ['readFileSync', 'existsSync', 'readdirSync', 'statSync', 'copyFileSync'];
  const originals = Object.fromEntries(monitoredMethods.map(name => [name, fs[name]]));
  const originalPathJoin = path.join;
  const rawAccesses = [];
  for (const name of monitoredMethods) {
    fs[name] = function monitoredAccess(...args) {
      if (args.some(value => String(value).includes(`${path.sep}copias${path.sep}`))) rawAccesses.push(name);
      return originals[name].apply(this, args);
    };
  }
  path.join = function monitoredJoin(...args) {
    if (args.includes('copias')) rawAccesses.push('path.join');
    return originalPathJoin(...args);
  };
  process.chdir(root);
  try {
    await assert.rejects(transmuteClient('client-a'));
    assert.deepEqual(rawAccesses, []);
  } finally {
    process.chdir(originalCwd);
    path.join = originalPathJoin;
    Object.assign(fs, originals);
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('V1 transmutation still reads the selected legacy reference and writes the client artifact', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'transmuter-v1-compatible-'));
  const client = path.join(root, 'clientes', 'client-a');
  const reference = path.join(root, 'copias', 'legacy-reference');
  fs.mkdirSync(client, { recursive: true });
  fs.mkdirSync(reference, { recursive: true });
  fs.writeFileSync(path.join(reference, 'index.html'), '<!doctype html><html><head></head><body><h1>{SLOT_HERO_TITLE}</h1></body></html>');
  fs.writeFileSync(path.join(client, 'reference-selection.json'), JSON.stringify({ selectedRefSlug: 'legacy-reference', compatibilityScore: 100 }));
  fs.writeFileSync(path.join(client, 'content-slots.json'), JSON.stringify({ HERO_TITLE: 'Legacy path remains available' }));
  const originalCwd = process.cwd();
  process.chdir(root);
  try {
    const result = await transmuteClient('client-a');
    assert.equal(fs.existsSync(result.outputPath), true);
    assert.match(fs.readFileSync(result.outputPath, 'utf8'), /Legacy path remains available/);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(root, { recursive: true, force: true });
  }
});
