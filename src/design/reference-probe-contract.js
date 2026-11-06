const { z } = require('zod');
const { canonicalize, hashCanonical } = require('./canonical-json');
const { compareOrdinal } = require('./reference-qualification');

const SHA256 = /^sha256:[a-f0-9]{64}$/;

const ReferenceProbeSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('reference-probe'),
  candidateId: z.string().min(1),
  clientScope: z.string().min(1),
  candidateHash: z.string().regex(SHA256),
  qualificationHash: z.string().regex(SHA256),
  artifactHash: z.string().regex(SHA256),
  acceptancePassRatio: z.number().min(0).max(1),
  p0Failures: z.number().int().min(0),
  pairwiseQualityDelta: z.number().int().min(-100).max(100),
  attempts: z.number().int().min(1).max(3),
  inputTokens: z.number().int().min(0),
  outputTokens: z.number().int().min(0),
  durationMs: z.number().int().min(0),
  evidenceIds: z.array(z.string().min(1)).min(1).meta({ uniqueItems: true }).refine(ids => new Set(ids).size === ids.length, {
    message: 'evidenceIds must not contain duplicates'
  }),
  probeHash: z.string().regex(SHA256)
}).strict();
const ReferenceProbeInputSchema = ReferenceProbeSchema.extend({ probeHash: z.string().regex(SHA256).optional() }).strict();

function validateReferenceProbe(input) {
  canonicalize(input);
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('probe must be an object');
  const parsed = ReferenceProbeInputSchema.parse(input);
  const { probeHash: suppliedProbeHash, ...withoutHash } = parsed;
  const probe = { ...withoutHash, evidenceIds: [...withoutHash.evidenceIds].sort(compareOrdinal) };
  const expectedHash = hashCanonical(probe);
  const probeHash = suppliedProbeHash === undefined ? expectedHash : suppliedProbeHash;
  if (probeHash !== expectedHash) throw new TypeError('probeHash does not match probe content');
  return ReferenceProbeSchema.parse({ ...probe, probeHash });
}

function generateReferenceProbeJsonSchema() {
  return z.toJSONSchema(ReferenceProbeSchema);
}

module.exports = {
  ReferenceProbeSchema,
  generateReferenceProbeJsonSchema,
  validateReferenceProbe
};
