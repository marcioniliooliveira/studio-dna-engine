const test = require('node:test');
const assert = require('node:assert/strict');
const Ajv2020 = require('ajv/dist/2020');
const { hashCanonical } = require('../src/design/canonical-json');

const {
  qualifyReferenceCandidate,
  generateReferenceQualificationJsonSchema,
  validateReferenceQualification
} = require('../src/design/reference-qualification');
const { selectParetoCandidates } = require('../src/design/reference-pareto-selector');
const referenceQualificationSchema = require('../schemas/v2/reference-qualification.schema.json');

const HASH = 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

function makeCandidate(overrides = {}) {
  const registered = {
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
    candidateHash: HASH,
    ...overrides
  };
  if (!Object.hasOwn(overrides, 'candidateHash')) {
    const { lifecycle, registeredAt, candidateHash, ...candidate } = registered;
    registered.candidateHash = hashCanonical(candidate);
  }
  return registered;
}

function makeScores(overrides = {}) {
  return {
    creativeMerit: { value: 80, evidenceIds: ['evidence-001'] },
    extractability: { value: 70, evidenceIds: ['evidence-001'] },
    clientFit: { value: 75, evidenceIds: ['evidence-001'] },
    runtimeQuality: { value: 85, evidenceIds: ['evidence-001'] },
    provenanceConfidence: { value: 90, evidenceIds: ['evidence-001'] },
    risk: { value: 20, evidenceIds: ['evidence-001'] },
    ...overrides
  };
}

function makeEvidence(overrides = {}) {
  return { 'evidence-001': { sourceHash: HASH, path: 'audit/report.json', ...overrides } };
}

test('rejects scores outside integer bounds', () => {
  assert.throws(() => qualifyReferenceCandidate({
    candidate: makeCandidate(),
    rubricVersion: 'v1',
    signals: makeScores({ creativeMerit: { value: 101, evidenceIds: ['evidence-001'] } }),
    evidence: makeEvidence()
  }));
});

test('rejects score evidence IDs that do not resolve to supplied evidence', () => {
  assert.throws(() => qualifyReferenceCandidate({
    candidate: makeCandidate(),
    rubricVersion: 'v1',
    signals: makeScores({ creativeMerit: { value: 80, evidenceIds: ['missing-evidence'] } }),
    evidence: makeEvidence()
  }), /evidence/i);
});

test('rejects popularity fields and candidate lifecycle escalation', () => {
  assert.throws(() => qualifyReferenceCandidate({
    candidate: makeCandidate(), rubricVersion: 'v1',
    signals: { ...makeScores(), stars: 100000 }, evidence: makeEvidence()
  }));
  assert.throws(() => qualifyReferenceCandidate({
    candidate: makeCandidate({ lifecycle: 'approved' }), rubricVersion: 'v1',
    signals: makeScores(), evidence: makeEvidence()
  }), /quarantined/);
});

test('rejects unknown and non-JSON-safe qualification inputs', () => {
  const unsafeScores = makeScores();
  Object.defineProperty(unsafeScores, 'hidden', { value: true, enumerable: false });
  assert.throws(() => qualifyReferenceCandidate({
    candidate: makeCandidate({ catalogRank: 1 }), rubricVersion: 'v1', signals: makeScores(), evidence: makeEvidence()
  }));
  assert.throws(() => qualifyReferenceCandidate({
    candidate: makeCandidate(), rubricVersion: 'v1', signals: unsafeScores, evidence: makeEvidence()
  }), /Non-JSON-safe/);
});

test('returns a stable canonical qualification with sorted evidence and evidence IDs', () => {
  const first = qualifyReferenceCandidate({
    candidate: makeCandidate(), rubricVersion: 'v1',
    signals: makeScores({ creativeMerit: { value: 80, evidenceIds: ['evidence-002', 'evidence-001'] } }),
    evidence: { 'evidence-002': { sourceHash: HASH, path: 'audit/second.json' }, ...makeEvidence() }
  });
  const second = qualifyReferenceCandidate({
    candidate: makeCandidate(), rubricVersion: 'v1',
    signals: makeScores({ creativeMerit: { value: 80, evidenceIds: ['evidence-001', 'evidence-002'] } }),
    evidence: { ...makeEvidence(), 'evidence-002': { sourceHash: HASH, path: 'audit/second.json' } }
  });

  assert.deepEqual(first, second);
  assert.deepEqual(Object.keys(first.evidence), ['evidence-001', 'evidence-002']);
  assert.deepEqual(first.scores.creativeMerit.evidenceIds, ['evidence-001', 'evidence-002']);
  assert.match(first.qualificationHash, /^sha256:[a-f0-9]{64}$/);
});

test('keeps checked-in schema deterministic and rejects invalid qualification at runtime and schema', () => {
  assert.deepEqual(referenceQualificationSchema, generateReferenceQualificationJsonSchema());
  const invalid = qualifyReferenceCandidate({
    candidate: makeCandidate(), rubricVersion: 'v1', signals: makeScores(), evidence: makeEvidence()
  });
  invalid.scores.risk.value = 101;
  const validate = new Ajv2020({ strict: false, allErrors: true, validateFormats: false }).compile(referenceQualificationSchema);

  assert.throws(() => qualifyReferenceCandidate({
    candidate: makeCandidate(), rubricVersion: 'v1', signals: makeScores({ risk: { value: 101, evidenceIds: ['evidence-001'] } }), evidence: makeEvidence()
  }));
  assert.equal(validate(invalid), false, JSON.stringify(validate.errors));
});

function makeQualification(candidateId, roles, scoreOverrides = {}) {
  return qualifyReferenceCandidate({
    candidate: makeCandidate({ candidateId, roles }),
    rubricVersion: 'v1', signals: makeScores(scoreOverrides), evidence: makeEvidence()
  });
}

test('selects non-dominated candidates per role and retains incomparable candidates', () => {
  const dominated = makeQualification('alpha', ['composition']);
  const dominant = makeQualification('bravo', ['composition'], {
    creativeMerit: { value: 90, evidenceIds: ['evidence-001'] },
    extractability: { value: 90, evidenceIds: ['evidence-001'] },
    clientFit: { value: 90, evidenceIds: ['evidence-001'] },
    runtimeQuality: { value: 90, evidenceIds: ['evidence-001'] },
    provenanceConfidence: { value: 90, evidenceIds: ['evidence-001'] },
    risk: { value: 10, evidenceIds: ['evidence-001'] }
  });
  const incomparable = makeQualification('charlie', ['composition'], {
    creativeMerit: { value: 95, evidenceIds: ['evidence-001'] }, risk: { value: 40, evidenceIds: ['evidence-001'] }
  });

  const selection = selectParetoCandidates({
    qualifications: [incomparable, dominated, dominant], requiredRoles: ['composition'], maxCandidates: 2
  });
  assert.deepEqual(selection, {
    requiredRoles: ['composition'],
    candidateIds: ['bravo', 'charlie'],
    byRole: { composition: ['bravo', 'charlie'] }
  });
});

test('applies dominance only within each shared required role', () => {
  const composition = makeQualification('alpha', ['composition']);
  const typography = makeQualification('bravo', ['typography'], {
    creativeMerit: { value: 100, evidenceIds: ['evidence-001'] },
    extractability: { value: 100, evidenceIds: ['evidence-001'] },
    clientFit: { value: 100, evidenceIds: ['evidence-001'] },
    runtimeQuality: { value: 100, evidenceIds: ['evidence-001'] },
    provenanceConfidence: { value: 100, evidenceIds: ['evidence-001'] },
    risk: { value: 0, evidenceIds: ['evidence-001'] }
  });
  const selection = selectParetoCandidates({
    qualifications: [typography, composition], requiredRoles: ['typography', 'composition'], maxCandidates: 2
  });
  assert.deepEqual(selection.byRole, { composition: ['alpha'], typography: ['bravo'] });
  assert.deepEqual(selection.candidateIds, ['alpha', 'bravo']);
});

test('throws when the cap cannot retain coverage for every required role', () => {
  assert.throws(() => selectParetoCandidates({
    qualifications: [
      makeQualification('alpha', ['composition']),
      makeQualification('bravo', ['typography'])
    ],
    requiredRoles: ['composition', 'typography'], maxCandidates: 1
  }), /coverage.*cap/i);
});

test('rejects externally supplied qualifications with unresolved score evidence', () => {
  const invalid = makeQualification('alpha', ['composition']);
  invalid.scores.risk.evidenceIds = ['missing-evidence'];
  assert.throws(() => selectParetoCandidates({
    qualifications: [invalid], requiredRoles: ['composition'], maxCandidates: 1
  }), /evidence/i);
});

test('rejects registered candidates whose candidate hash does not match the Task 1 projection', () => {
  assert.throws(() => qualifyReferenceCandidate({
    candidate: makeCandidate({ candidateHash: HASH }), rubricVersion: 'v1', signals: makeScores(), evidence: makeEvidence()
  }), /candidateHash/i);
});

test('rejects non-ISO registeredAt values accepted by Date.parse', () => {
  assert.throws(() => qualifyReferenceCandidate({
    candidate: makeCandidate({ registeredAt: 'September 16, 2026' }), rubricVersion: 'v1', signals: makeScores(), evidence: makeEvidence()
  }), /registeredAt/i);
});

test('schema and runtime reject duplicate score evidence IDs and unknown evidence record fields', () => {
  const qualification = makeQualification('alpha', ['composition']);
  const duplicateScoreEvidence = structuredClone(qualification);
  duplicateScoreEvidence.scores.risk.evidenceIds.push('evidence-001');
  const unknownEvidenceField = structuredClone(qualification);
  unknownEvidenceField.evidence['evidence-001'].untrusted = true;
  const validate = new Ajv2020({ strict: false, allErrors: true, validateFormats: false }).compile(referenceQualificationSchema);

  for (const invalid of [duplicateScoreEvidence, unknownEvidenceField]) {
    assert.throws(() => validateReferenceQualification(invalid));
    assert.equal(validate(invalid), false, JSON.stringify(validate.errors));
  }
});

test('rejects externally supplied qualifications that are hashed but not canonically ordered', () => {
  const qualification = qualifyReferenceCandidate({
    candidate: makeCandidate({ roles: ['typography', 'composition'] }), rubricVersion: 'v1',
    signals: makeScores({ creativeMerit: { value: 80, evidenceIds: ['evidence-002', 'evidence-001'] } }),
    evidence: { ...makeEvidence(), 'evidence-002': { sourceHash: HASH, path: 'audit/second.json' } }
  });
  qualification.roles.reverse();
  qualification.scores.creativeMerit.evidenceIds.reverse();
  const { qualificationHash, ...withoutHash } = qualification;
  qualification.qualificationHash = hashCanonical(withoutHash);

  assert.throws(() => validateReferenceQualification(qualification), /canonical/i);
});

test('rejects array evidence and treats evidence identifiers as strict object keys', () => {
  assert.throws(() => qualifyReferenceCandidate({
    candidate: makeCandidate(), rubricVersion: 'v1', signals: makeScores(),
    evidence: [{ id: 'evidence-001', sourceHash: HASH, path: 'audit/report.json' }]
  }));
  assert.throws(() => qualifyReferenceCandidate({
    candidate: makeCandidate(), rubricVersion: 'v1', signals: makeScores(),
    evidence: makeEvidence({ untrusted: true })
  }));
});

test('produces an ordinally ordered mixed-case Unicode qualification accepted by Pareto selection', () => {
  const qualification = qualifyReferenceCandidate({
    candidate: makeCandidate({ candidateId: 'B', roles: ['typography', 'composition'] }), rubricVersion: 'v1',
    signals: makeScores({ creativeMerit: { value: 80, evidenceIds: ['é', 'a', 'B'] } }),
    evidence: {
      'evidence-001': { sourceHash: HASH, path: 'audit/default.json' },
      'é': { sourceHash: HASH, path: 'audit/unicode.json' },
      a: { sourceHash: HASH, path: 'audit/lowercase.json' },
      B: { sourceHash: HASH, path: 'audit/uppercase.json' }
    }
  });

  assert.doesNotThrow(() => validateReferenceQualification(qualification));
  assert.deepEqual(qualification.scores.creativeMerit.evidenceIds, ['B', 'a', 'é']);
  assert.deepEqual(selectParetoCandidates({
    qualifications: [qualification], requiredRoles: ['composition'], maxCandidates: 1
  }).candidateIds, ['B']);
});
