const { z } = require('zod');
const { canonicalize, hashCanonical } = require('./canonical-json');

const SOURCE_TYPES = [
  'git-repository', 'web-page', 'uploaded-image', 'local-capture',
  'figma-file', 'penpot-file', 'design-system', 'client-asset'
];
const ROLES = [
  'composition', 'typography', 'motion', 'material', 'image-treatment',
  'interaction', 'conversion', 'accessibility', 'code-pattern'
];
const USAGE_INTENTS = ['inspiration-only', 'code-candidate', 'asset-candidate'];
const SHA256 = /^sha256:[a-f0-9]{64}$/;
const GIT_COMMIT = /^[a-f0-9]{40}$/;

const LicenseSchema = z.object({
  spdxId: z.string().min(1),
  evidenceUri: z.string().url()
}).strict();

const ProvenanceBaseSchema = z.object({
  canonicalUri: z.string().url(),
  commit: z.string().regex(GIT_COMMIT).optional(),
  license: LicenseSchema.optional(),
  capturedAt: z.iso.datetime({ offset: true }).optional(),
  contentSha256: z.string().regex(SHA256).optional()
}).strict();

const RolesSchema = z.array(z.enum(ROLES)).min(1).refine(roles => new Set(roles).size === roles.length, {
  message: 'roles must not contain duplicates'
}).meta({ uniqueItems: true });

const CandidateBaseSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('reference-candidate'),
  candidateId: z.string().min(1),
  clientScope: z.string().min(1),
  roles: RolesSchema
}).strict();

const GitProvenanceSchema = ProvenanceBaseSchema.extend({
  commit: z.string().regex(GIT_COMMIT),
  license: LicenseSchema
}).strict();
const WebProvenanceSchema = ProvenanceBaseSchema.extend({
  capturedAt: z.iso.datetime({ offset: true }),
  contentSha256: z.string().regex(SHA256)
}).strict();
const ContentProvenanceSchema = ProvenanceBaseSchema.extend({
  contentSha256: z.string().regex(SHA256)
}).strict();
const LicensedWebProvenanceSchema = WebProvenanceSchema.extend({ license: LicenseSchema }).strict();
const LicensedContentProvenanceSchema = ContentProvenanceSchema.extend({ license: LicenseSchema }).strict();
const NonCodeIntentSchema = z.enum(['inspiration-only', 'asset-candidate']);
const OtherSourceTypeSchema = z.enum(SOURCE_TYPES.filter(type => type !== 'git-repository' && type !== 'web-page'));

function candidateVariant(sourceType, usageIntent, provenance) {
  return CandidateBaseSchema.extend({ sourceType, usageIntent, provenance }).strict();
}

const ReferenceCandidateSchema = z.union([
  candidateVariant(z.literal('git-repository'), z.enum(USAGE_INTENTS), GitProvenanceSchema),
  candidateVariant(z.literal('web-page'), NonCodeIntentSchema, WebProvenanceSchema),
  candidateVariant(z.literal('web-page'), z.literal('code-candidate'), LicensedWebProvenanceSchema),
  candidateVariant(OtherSourceTypeSchema, NonCodeIntentSchema, ContentProvenanceSchema),
  candidateVariant(OtherSourceTypeSchema, z.literal('code-candidate'), LicensedContentProvenanceSchema)
]);

function validateReferenceCandidate(input) {
  canonicalize(input);
  return ReferenceCandidateSchema.parse(input);
}

function hashReferenceCandidate(input) {
  return hashCanonical(validateReferenceCandidate(input));
}

function generateReferenceCandidateJsonSchema() {
  return z.toJSONSchema(ReferenceCandidateSchema);
}

module.exports = {
  SOURCE_TYPES,
  ROLES,
  USAGE_INTENTS,
  ReferenceCandidateSchema,
  generateReferenceCandidateJsonSchema,
  hashReferenceCandidate,
  validateReferenceCandidate
};
