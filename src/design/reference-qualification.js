const { z } = require('zod');
const { canonicalize, hashCanonical } = require('./canonical-json');
const { ROLES, validateReferenceCandidate } = require('./reference-candidate-contract');

const SCORE_NAMES = [
  'creativeMerit', 'extractability', 'clientFit', 'runtimeQuality', 'provenanceConfidence', 'risk'
];
const SHA256 = /^sha256:[a-f0-9]{64}$/;

const EvidenceSchema = z.object({
  id: z.string().min(1),
  sourceHash: z.string().min(1),
  path: z.string().min(1)
}).strict();

const ScoreSchema = z.object({
  value: z.number().int().min(0).max(100),
  evidenceIds: z.array(z.string().min(1)).min(1).refine(ids => new Set(ids).size === ids.length, {
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
  evidence: z.array(EvidenceSchema).min(1).refine(items => new Set(items.map(item => item.id)).size === items.length, {
    message: 'evidence IDs must be unique'
  }),
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
  if (typeof registeredAt !== 'string' || Number.isNaN(Date.parse(registeredAt))) {
    throw new TypeError('candidate registeredAt must be an ISO date');
  }
  if (typeof candidateHash !== 'string' || !SHA256.test(candidateHash)) throw new TypeError('candidateHash must be a sha256 hash');
  return { ...validatedCandidate, lifecycle, registeredAt, candidateHash };
}

function qualifyReferenceCandidate(input) {
  canonicalize(input);
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('qualification input must be an object');
  const keys = Object.keys(input).sort();
  if (keys.join(',') !== 'candidate,evidence,rubricVersion,signals') throw new TypeError('qualification input contains unknown or missing fields');
  const candidate = registeredCandidate(input.candidate);
  if (typeof input.rubricVersion !== 'string' || input.rubricVersion.length === 0) {
    throw new TypeError('rubricVersion is required');
  }
  const scores = ScoresSchema.parse(input.signals);
  const evidence = z.array(EvidenceSchema).min(1).parse(input.evidence);
  const evidenceIds = new Set();
  for (const item of evidence) {
    if (evidenceIds.has(item.id)) throw new TypeError(`duplicate evidence ID: ${item.id}`);
    evidenceIds.add(item.id);
  }
  for (const [name, score] of Object.entries(scores)) {
    for (const evidenceId of score.evidenceIds) {
      if (!evidenceIds.has(evidenceId)) throw new TypeError(`${name} references unknown evidence ID: ${evidenceId}`);
    }
  }

  const qualification = {
    schemaVersion: 2,
    contractKind: 'reference-qualification',
    candidateId: candidate.candidateId,
    clientScope: candidate.clientScope,
    candidateHash: candidate.candidateHash,
    roles: [...candidate.roles].sort(),
    lifecycle: 'quarantined',
    rubricVersion: input.rubricVersion,
    scores: Object.fromEntries(SCORE_NAMES.map(name => [name, {
      value: scores[name].value,
      evidenceIds: [...scores[name].evidenceIds].sort()
    }])),
    evidence: [...evidence].sort((left, right) => left.id.localeCompare(right.id))
  };
  qualification.qualificationHash = hashCanonical(qualification);
  return ReferenceQualificationSchema.parse(qualification);
}

function generateReferenceQualificationJsonSchema() {
  return z.toJSONSchema(ReferenceQualificationSchema);
}

function validateReferenceQualification(input) {
  canonicalize(input);
  const qualification = ReferenceQualificationSchema.parse(input);
  const evidenceIds = new Set(qualification.evidence.map(item => item.id));
  for (const [name, score] of Object.entries(qualification.scores)) {
    for (const evidenceId of score.evidenceIds) {
      if (!evidenceIds.has(evidenceId)) throw new TypeError(`${name} references unknown evidence ID: ${evidenceId}`);
    }
  }
  const { qualificationHash, ...withoutHash } = qualification;
  if (qualificationHash !== hashCanonical(withoutHash)) throw new TypeError('qualificationHash does not match qualification content');
  return qualification;
}

module.exports = {
  SCORE_NAMES,
  ReferenceQualificationSchema,
  generateReferenceQualificationJsonSchema,
  qualifyReferenceCandidate,
  validateReferenceQualification
};
