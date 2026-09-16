const { z } = require('zod');
const { canonicalize, hashCanonical } = require('./canonical-json');
const { ROLES, hashReferenceCandidate, validateReferenceCandidate } = require('./reference-candidate-contract');

const SCORE_NAMES = [
  'creativeMerit', 'extractability', 'clientFit', 'runtimeQuality', 'provenanceConfidence', 'risk'
];
const SHA256 = /^sha256:[a-f0-9]{64}$/;

const EvidenceRecordSchema = z.object({
  sourceHash: z.string().min(1),
  path: z.string().min(1)
}).strict();

const EvidenceSchema = z.record(z.string().min(1), EvidenceRecordSchema).meta({ minProperties: 1 }).refine(evidence => Object.keys(evidence).length > 0, {
  message: 'evidence must not be empty'
});

const ScoreSchema = z.object({
  value: z.number().int().min(0).max(100),
  evidenceIds: z.array(z.string().min(1)).min(1).meta({ uniqueItems: true }).refine(ids => new Set(ids).size === ids.length, {
    message: 'evidenceIds must not contain duplicates'
  })
}).strict();

const ScoresSchema = z.object(Object.fromEntries(SCORE_NAMES.map(name => [name, ScoreSchema]))).strict();

const ReferenceQualificationSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('reference-qualification'),
  candidateId: z.string().min(1),
  clientScope: z.string().min(1),
  candidateHash: z.string().regex(SHA256),
  roles: z.array(z.enum(ROLES)).min(1).refine(roles => new Set(roles).size === roles.length, {
    message: 'roles must not contain duplicates'
  }).meta({ uniqueItems: true }),
  lifecycle: z.literal('quarantined'),
  rubricVersion: z.string().min(1),
  scores: ScoresSchema,
  evidence: EvidenceSchema,
  qualificationHash: z.string().regex(SHA256)
}).strict();

function registeredCandidate(input) {
  canonicalize(input);
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('candidate must be an object');
  const { lifecycle, registeredAt, candidateHash, ...candidate } = input;
  const expectedKeys = new Set([
    'schemaVersion', 'contractKind', 'candidateId', 'clientScope', 'sourceType', 'roles', 'usageIntent', 'provenance',
    'lifecycle', 'registeredAt', 'candidateHash'
  ]);
  if (Object.keys(input).some(key => !expectedKeys.has(key))) throw new TypeError('candidate contains unknown fields');
  const validatedCandidate = validateReferenceCandidate(candidate);
  if (lifecycle !== 'quarantined') throw new TypeError('candidate lifecycle must be quarantined');
  const canonicalRegisteredAt = z.iso.datetime({ offset: true }).safeParse(registeredAt);
  if (!canonicalRegisteredAt.success || new Date(registeredAt).toISOString() !== registeredAt) {
    throw new TypeError('candidate registeredAt must be a canonical ISO date');
  }
  if (typeof candidateHash !== 'string' || !SHA256.test(candidateHash)) throw new TypeError('candidateHash must be a sha256 hash');
  if (candidateHash !== hashReferenceCandidate(validatedCandidate)) {
    throw new TypeError('candidateHash does not match the validated Task 1 candidate');
  }
  return { ...validatedCandidate, lifecycle, registeredAt, candidateHash };
}

function qualifyReferenceCandidate(input) {
  canonicalize(input);
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('qualification input must be an object');
  const keys = Object.keys(input).sort(compareOrdinal);
  if (keys.join(',') !== 'candidate,evidence,rubricVersion,signals') throw new TypeError('qualification input contains unknown or missing fields');
  const candidate = registeredCandidate(input.candidate);
  if (typeof input.rubricVersion !== 'string' || input.rubricVersion.length === 0) {
    throw new TypeError('rubricVersion is required');
  }
  const scores = ScoresSchema.parse(input.signals);
  const evidence = EvidenceSchema.parse(input.evidence);
  for (const [name, score] of Object.entries(scores)) {
    for (const evidenceId of score.evidenceIds) {
      if (!Object.hasOwn(evidence, evidenceId)) throw new TypeError(`${name} references unknown evidence ID: ${evidenceId}`);
    }
  }

  const qualification = {
    schemaVersion: 2,
    contractKind: 'reference-qualification',
    candidateId: candidate.candidateId,
    clientScope: candidate.clientScope,
    candidateHash: candidate.candidateHash,
    roles: [...candidate.roles].sort(compareOrdinal),
    lifecycle: 'quarantined',
    rubricVersion: input.rubricVersion,
    scores: Object.fromEntries(SCORE_NAMES.map(name => [name, {
      value: scores[name].value,
      evidenceIds: [...scores[name].evidenceIds].sort(compareOrdinal)
    }])),
    evidence: Object.fromEntries(Object.entries(evidence).sort(([left], [right]) => compareOrdinal(left, right)))
  };
  qualification.qualificationHash = hashCanonical(qualification);
  return validateReferenceQualification(qualification);
}

function generateReferenceQualificationJsonSchema() {
  return z.toJSONSchema(ReferenceQualificationSchema);
}

function validateReferenceQualification(input) {
  canonicalize(input);
  const qualification = ReferenceQualificationSchema.parse(input);
  for (const [name, score] of Object.entries(qualification.scores)) {
    assertCanonicalOrder(score.evidenceIds, `${name}.evidenceIds`);
    for (const evidenceId of score.evidenceIds) {
      if (!Object.hasOwn(qualification.evidence, evidenceId)) throw new TypeError(`${name} references unknown evidence ID: ${evidenceId}`);
    }
  }
  assertCanonicalOrder(qualification.roles, 'roles');
  const { qualificationHash, ...withoutHash } = qualification;
  if (qualificationHash !== hashCanonical(withoutHash)) throw new TypeError('qualificationHash does not match qualification content');
  return qualification;
}

function assertCanonicalOrder(items, label) {
  const sorted = [...items].sort(compareOrdinal);
  if (items.some((item, index) => item !== sorted[index])) {
    throw new TypeError(`${label} must use canonical lexicographic order`);
  }
}

function compareOrdinal(left, right) {
  if (left === right) return 0;
  return left < right ? -1 : 1;
}

module.exports = {
  SCORE_NAMES,
  compareOrdinal,
  ReferenceQualificationSchema,
  generateReferenceQualificationJsonSchema,
  qualifyReferenceCandidate,
  validateReferenceQualification
};
