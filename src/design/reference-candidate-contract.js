const { z } = require('zod');
const { canonicalize } = require('./canonical-json');

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

const ProvenanceSchema = z.object({
  canonicalUri: z.string().url(),
  commit: z.string().regex(GIT_COMMIT).optional(),
  license: LicenseSchema.optional(),
  capturedAt: z.iso.datetime({ offset: true }).optional(),
  contentSha256: z.string().regex(SHA256).optional()
}).strict();

const ReferenceCandidateSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('reference-candidate'),
  candidateId: z.string().min(1),
  clientScope: z.string().min(1),
  sourceType: z.enum(SOURCE_TYPES),
  roles: z.array(z.enum(ROLES)).min(1).refine(roles => new Set(roles).size === roles.length, {
    message: 'roles must not contain duplicates'
  }),
  usageIntent: z.enum(USAGE_INTENTS),
  provenance: ProvenanceSchema
}).strict().superRefine((candidate, context) => {
  const { provenance } = candidate;
  const add = (message) => context.addIssue({ code: 'custom', path: ['provenance'], message });

  if (candidate.sourceType === 'git-repository') {
    if (!provenance.commit) add('git-repository requires commit');
    if (!provenance.license) add('git-repository requires license evidence');
  } else if (candidate.sourceType === 'web-page') {
    if (!provenance.capturedAt) add('web-page requires capturedAt');
    if (!provenance.contentSha256) add('web-page requires contentSha256');
  } else if (!provenance.contentSha256) {
    add(`${candidate.sourceType} requires contentSha256`);
  }

  if (candidate.usageIntent === 'code-candidate' && !provenance.license) {
    add('code-candidate requires license evidence');
  }
});

function validateReferenceCandidate(input) {
  canonicalize(input);
  return ReferenceCandidateSchema.parse(input);
}

module.exports = {
  SOURCE_TYPES,
  ROLES,
  USAGE_INTENTS,
  ReferenceCandidateSchema,
  validateReferenceCandidate
};
