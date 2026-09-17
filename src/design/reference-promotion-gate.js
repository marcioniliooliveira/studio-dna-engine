const { z } = require('zod');
const crypto = require('node:crypto');
const { canonicalize, hashCanonical } = require('./canonical-json');
const { ROLES, USAGE_INTENTS, hashReferenceCandidate, validateReferenceCandidate } = require('./reference-candidate-contract');
const { compareOrdinal, validateReferenceQualification } = require('./reference-qualification');
const { validateReferenceProbe } = require('./reference-probe-contract');

const SHA256 = /^sha256:[a-f0-9]{64}$/;
const CanonicalIsoDateSchema = z.iso.datetime({ offset: true }).regex(/\.\d{3}Z$/).refine(value => new Date(value).toISOString() === value, {
  message: 'must be a canonical ISO date'
});

const HumanReferenceDecisionPayloadSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('human-reference-decision'),
  clientScope: z.string().min(1),
  status: z.enum(['approved', 'rejected']),
  candidateId: z.string().min(1),
  roles: z.array(z.enum(ROLES)).min(1).meta({ uniqueItems: true }),
  usageIntent: z.enum(USAGE_INTENTS),
  actorId: z.string().min(1),
  decidedAt: CanonicalIsoDateSchema,
  candidateHash: z.string().regex(SHA256),
  qualificationHash: z.string().regex(SHA256),
  probeHash: z.string().regex(SHA256)
}).strict();

const Base64SignatureSchema = z.string().min(1).refine(value => {
  try {
    return Buffer.from(value, 'base64').toString('base64') === value;
  } catch {
    return false;
  }
}, { message: 'must be a canonical base64 signature' });

const HumanReferenceDecisionSchema = HumanReferenceDecisionPayloadSchema.extend({
  signedPayload: z.string().min(1),
  keyId: z.string().min(1),
  algorithm: z.literal('ed25519'),
  signature: Base64SignatureSchema
}).strict();

const ReferencePromotionSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('reference-promotion'),
  candidateId: z.string().min(1),
  clientScope: z.string().min(1),
  candidateHash: z.string().regex(SHA256),
  qualificationHash: z.string().regex(SHA256),
  probeHash: z.string().regex(SHA256),
  roles: z.array(z.enum(ROLES)).min(1).meta({ uniqueItems: true }),
  usageIntent: z.enum(USAGE_INTENTS),
  decision: HumanReferenceDecisionSchema,
  promotionHash: z.string().regex(SHA256)
}).strict();

function validateRegisteredCandidate(input) {
  canonicalize(input);
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('candidate must be an object');
  const expectedKeys = new Set([
    'schemaVersion', 'contractKind', 'candidateId', 'clientScope', 'sourceType', 'roles', 'usageIntent', 'provenance',
    'lifecycle', 'registeredAt', 'candidateHash'
  ]);
  if (Object.keys(input).some(key => !expectedKeys.has(key))) throw new TypeError('candidate contains unknown fields');
  const { lifecycle, registeredAt, candidateHash, ...candidate } = input;
  const validated = validateReferenceCandidate(candidate);
  if (lifecycle !== 'quarantined') throw new TypeError('candidate lifecycle must be quarantined');
  if (!CanonicalIsoDateSchema.safeParse(registeredAt).success) throw new TypeError('candidate registeredAt must be a canonical ISO date');
  if (typeof candidateHash !== 'string' || !SHA256.test(candidateHash)) throw new TypeError('candidateHash must be a sha256 hash');
  if (candidateHash !== hashReferenceCandidate(validated)) throw new TypeError('candidateHash does not match the validated Task 1 candidate');
  return { ...validated, lifecycle, registeredAt, candidateHash };
}

function trustedPublicKeyFor(keyId, options) {
  const trustedPublicKeys = options && options.trustedPublicKeys;
  if (!trustedPublicKeys || typeof trustedPublicKeys !== 'object' || Array.isArray(trustedPublicKeys)) {
    throw new TypeError('trusted public-key map is required');
  }
  const key = trustedPublicKeys instanceof Map
    ? trustedPublicKeys.get(keyId)
    : Object.hasOwn(trustedPublicKeys, keyId) ? trustedPublicKeys[keyId] : undefined;
  if (!key) throw new TypeError(`trusted key not found: ${keyId}`);
  let publicKey;
  try {
    publicKey = key instanceof crypto.KeyObject ? key : crypto.createPublicKey(key);
  } catch {
    throw new TypeError(`trusted key is not a valid public key: ${keyId}`);
  }
  if (publicKey.type !== 'public') throw new TypeError(`trusted key must be a public key: ${keyId}`);
  if (publicKey.asymmetricKeyType !== 'ed25519') {
    throw new TypeError(`trusted key must be Ed25519: ${keyId}`);
  }
  return publicKey;
}

function validateSignedHumanDecision(input, options) {
  canonicalize(input);
  const decision = HumanReferenceDecisionSchema.parse(input);
  const { signedPayload, keyId, algorithm, signature, ...payload } = decision;
  if (signedPayload !== canonicalize(payload)) throw new TypeError('decision signed payload does not match decision content');
  const publicKey = trustedPublicKeyFor(keyId, options);
  try {
    if (!crypto.verify(null, Buffer.from(signedPayload), publicKey, Buffer.from(signature, 'base64'))) {
      throw new TypeError('decision signature is invalid');
    }
  } catch (error) {
    if (error instanceof TypeError) throw error;
    throw new TypeError('decision signature could not be verified');
  }
  return decision;
}

function promoteReference(input, options = {}) {
  canonicalize(input);
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('promotion input must be an object');
  const keys = Object.keys(input).sort(compareOrdinal);
  if (keys.join(',') !== 'candidate,humanDecision,probe,qualification') throw new TypeError('promotion input contains unknown or missing fields');
  const candidate = validateRegisteredCandidate(input.candidate);
  const qualification = validateReferenceQualification(input.qualification);
  const probe = validateReferenceProbe(input.probe);
  const decision = validateSignedHumanDecision(input.humanDecision, options);

  if (qualification.candidateId !== candidate.candidateId || qualification.clientScope !== candidate.clientScope ||
    qualification.candidateHash !== candidate.candidateHash) throw new TypeError('qualification does not match candidate');
  const candidateRoles = [...candidate.roles].sort(compareOrdinal);
  if (qualification.roles.length !== candidateRoles.length || qualification.roles.some((role, index) => role !== candidateRoles[index])) {
    throw new TypeError('qualification roles do not match candidate');
  }
  if (probe.candidateId !== candidate.candidateId || probe.clientScope !== candidate.clientScope ||
    probe.candidateHash !== candidate.candidateHash || probe.qualificationHash !== qualification.qualificationHash) {
    throw new TypeError('probe does not match candidate and qualification');
  }
  if (probe.evidenceIds.some(id => !Object.hasOwn(qualification.evidence, id))) {
    throw new TypeError('probe references unknown evidence ID');
  }
  if (decision.clientScope !== candidate.clientScope || decision.candidateId !== candidate.candidateId ||
    decision.usageIntent !== candidate.usageIntent || decision.roles.length !== candidateRoles.length ||
    decision.roles.some((role, index) => role !== candidateRoles[index]) || decision.candidateHash !== candidate.candidateHash ||
    decision.qualificationHash !== qualification.qualificationHash || decision.probeHash !== probe.probeHash) {
    throw new TypeError('human decision does not match evidence chain');
  }
  if (decision.status !== 'approved') throw new TypeError('human decision must be approved');
  if (probe.p0Failures !== 0) throw new TypeError('promotion requires zero P0 failures');
  if (probe.acceptancePassRatio !== 1) throw new TypeError('promotion requires acceptancePassRatio of 1');
  if (probe.pairwiseQualityDelta <= 0) throw new TypeError('promotion requires positive pairwiseQualityDelta');

  const promotion = {
    schemaVersion: 2,
    contractKind: 'reference-promotion',
    candidateId: candidate.candidateId,
    clientScope: candidate.clientScope,
    candidateHash: candidate.candidateHash,
    qualificationHash: qualification.qualificationHash,
    probeHash: probe.probeHash,
    roles: candidateRoles,
    usageIntent: candidate.usageIntent,
    decision
  };
  promotion.promotionHash = hashCanonical(promotion);
  return validateReferencePromotion(promotion, options);
}

function validateReferencePromotion(input, options = {}) {
  canonicalize(input);
  const promotion = ReferencePromotionSchema.parse(input);
  const sortedRoles = [...promotion.roles].sort(compareOrdinal);
  if (promotion.roles.some((role, index) => role !== sortedRoles[index]) || new Set(promotion.roles).size !== promotion.roles.length) {
    throw new TypeError('roles must be unique and canonically ordered');
  }
  const decision = validateSignedHumanDecision(promotion.decision, options);
  if (decision.status !== 'approved' || decision.clientScope !== promotion.clientScope || decision.candidateId !== promotion.candidateId ||
    decision.usageIntent !== promotion.usageIntent || decision.roles.length !== promotion.roles.length ||
    decision.roles.some((role, index) => role !== promotion.roles[index]) ||
    decision.candidateHash !== promotion.candidateHash || decision.qualificationHash !== promotion.qualificationHash ||
    decision.probeHash !== promotion.probeHash) {
    throw new TypeError('decision does not match promotion evidence chain');
  }
  const { promotionHash, ...withoutHash } = promotion;
  if (promotionHash !== hashCanonical(withoutHash)) throw new TypeError('promotionHash does not match promotion content');
  return promotion;
}

function generateReferencePromotionJsonSchema() {
  return z.toJSONSchema(ReferencePromotionSchema);
}

module.exports = {
  HumanReferenceDecisionSchema,
  HumanReferenceDecisionPayloadSchema,
  ReferencePromotionSchema,
  generateReferencePromotionJsonSchema,
  promoteReference,
  validateReferencePromotion,
  validateSignedHumanDecision
};
