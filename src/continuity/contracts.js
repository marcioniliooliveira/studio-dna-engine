'use strict';

const path = require('node:path');
const { z } = require('zod');
const { canonicalize, hashCanonical } = require('../shared/canonical-json');
const { writeJsonAtomic } = require('./file-store');

const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;
const BASE64_PATTERN = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
const TASK_STATES = [
  'draft', 'ready', 'running', 'produced', 'verifying',
  'passed', 'failed', 'blocked', 'human-review-required',
  'approved', 'closed'
];
const NODE_TYPES = ['agent-task', 'human-gate', 'external-input'];
const EPISTEMIC_STATUSES = ['observed', 'derived', 'inferred', 'unknown'];
const ACTOR_ROLES = ['architect', 'researcher', 'builder', 'verifier', 'human'];
const PROJECT_STATUSES = ['experimental', 'candidate', 'verified', 'production'];
const PROGRAM_STATUSES = ['planned', 'in-progress', 'blocked', 'complete'];
const FAILURE_OUTCOMES = ['blocked', 'failed', 'failed-no-retry', 'human-review-required'];

const Sha256 = z.string().regex(SHA256_PATTERN, 'must be a sha256 hash');
const Base64 = z.string().min(4).regex(BASE64_PATTERN, 'must be valid base64');
const Identifier = z.string().min(1);
const IsoDatetime = z.iso.datetime({ offset: true });
const SafeInteger = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
const TaskState = z.enum(TASK_STATES);
const NodeType = z.enum(NODE_TYPES);
const EpistemicStatus = z.enum(EPISTEMIC_STATUSES);
const ActorRole = z.enum(ACTOR_ROLES);
const ProjectStatus = z.enum(PROJECT_STATUSES);

const WorkspacePath = z.string().min(1).refine(value => {
  if (path.isAbsolute(value) || value.includes(':')) return false;
  return !value.split(/[\\/]+/).includes('..');
}, 'path must be workspace-relative');

function sortedUniqueStrings(label) {
  return z.array(Identifier).refine(items => isSortedUnique(items), `${label} must be unique and canonically sorted`);
}

function canonicalObjectList(schema, key, label) {
  return z.array(schema).refine(items => isSortedUnique(items.map(item => item[key])), `${label} must be unique and canonically sorted by ${key}`);
}

function isSortedUnique(items) {
  return items.every((item, index) => index === 0 || items[index - 1] < item);
}

const ContinuityStateSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('continuity-state'),
  revision: SafeInteger,
  projectStatus: ProjectStatus,
  activeProgramId: Identifier,
  activeWaveId: Identifier.nullable(),
  lastEventHash: Sha256,
  updatedAt: IsoDatetime,
  nextEligibleTaskIds: sortedUniqueStrings('nextEligibleTaskIds'),
  blockedReasonCodes: sortedUniqueStrings('blockedReasonCodes')
}).strict();

const ProgramSchema = z.object({
  id: Identifier,
  state: z.enum(PROGRAM_STATUSES)
}).strict();

const RoadmapNodeSchema = z.object({
  id: Identifier,
  programId: Identifier,
  type: NodeType,
  state: TaskState,
  dependsOn: sortedUniqueStrings('dependsOn'),
  taskPath: WorkspacePath.nullable(),
  requiredCapabilities: sortedUniqueStrings('requiredCapabilities'),
  humanAuthorityId: Identifier.nullable(),
  blockedReasonCode: Identifier.nullable()
}).strict().superRefine((node, context) => {
  if (node.type === 'human-gate' && !node.humanAuthorityId) {
    context.addIssue({ code: 'custom', path: ['humanAuthorityId'], message: 'humanAuthorityId is required for human-gate nodes' });
  }
  if (node.type === 'human-gate' && node.taskPath !== null) {
    context.addIssue({ code: 'custom', path: ['taskPath'], message: 'human-gate taskPath must be null' });
  }
  if (node.type === 'agent-task' && !node.taskPath) {
    context.addIssue({ code: 'custom', path: ['taskPath'], message: 'agent-task taskPath is required' });
  }
});

const RoadmapSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('roadmap'),
  roadmapId: Identifier,
  specHash: Sha256,
  programs: canonicalObjectList(ProgramSchema, 'id', 'programs').min(1),
  nodes: canonicalObjectList(RoadmapNodeSchema, 'id', 'nodes')
}).strict();

const TaskInputSchema = z.object({
  path: WorkspacePath,
  sha256: Sha256,
  purpose: Identifier
}).strict();

const NetworkAuthoritySchema = z.object({
  mode: z.enum(['deny', 'allowlist']),
  hosts: sortedUniqueStrings('network.hosts')
}).strict().superRefine((network, context) => {
  if (network.mode === 'deny' && network.hosts.length > 0) {
    context.addIssue({ code: 'custom', path: ['hosts'], message: 'deny network mode cannot declare hosts' });
  }
});

const TaskAuthoritySchema = z.object({
  readAllowlist: sortedUniqueStrings('readAllowlist').pipe(z.array(WorkspacePath)),
  writeAllowlist: sortedUniqueStrings('writeAllowlist').pipe(z.array(WorkspacePath)),
  network: NetworkAuthoritySchema
}).strict();

const RequirementSchema = z.object({
  id: Identifier,
  kind: z.enum(['behavior', 'security', 'evidence', 'human-gate']),
  assertion: Identifier
}).strict();

const CommandSchema = z.object({
  red: Identifier,
  verify: Identifier
}).strict();

const BudgetSchema = z.object({
  maxAttempts: SafeInteger.min(1),
  timeoutMs: SafeInteger.min(1),
  maxFilesChanged: SafeInteger
}).strict();

const FailurePolicySchema = z.object({
  ambiguity: z.enum(FAILURE_OUTCOMES),
  missingInput: z.enum(FAILURE_OUTCOMES),
  policyViolation: z.enum(FAILURE_OUTCOMES),
  acceptanceFailure: z.enum(FAILURE_OUTCOMES)
}).strict();

const ExpectedArtifactSchema = z.object({
  path: WorkspacePath,
  mediaType: Identifier
}).strict();

const ExecutionTaskSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('execution-task'),
  taskId: Identifier,
  programId: Identifier,
  waveId: Identifier,
  state: TaskState,
  dependsOn: sortedUniqueStrings('dependsOn'),
  role: ActorRole,
  requiredCapabilities: sortedUniqueStrings('requiredCapabilities'),
  inputs: canonicalObjectList(TaskInputSchema, 'path', 'inputs'),
  authority: TaskAuthoritySchema,
  requirements: canonicalObjectList(RequirementSchema, 'id', 'requirements'),
  commands: CommandSchema,
  budget: BudgetSchema,
  failurePolicy: FailurePolicySchema,
  expectedArtifacts: canonicalObjectList(ExpectedArtifactSchema, 'path', 'expectedArtifacts')
}).strict();

const ResultActorSchema = z.object({
  actorId: Identifier,
  role: ActorRole,
  harnessId: Identifier
}).strict();

const UsageSchema = z.object({
  inputTokens: SafeInteger,
  outputTokens: SafeInteger,
  durationMs: SafeInteger
}).strict();

const ResultErrorSchema = z.object({
  code: Identifier,
  message: Identifier,
  evidenceIds: sortedUniqueStrings('error.evidenceIds')
}).strict();

const TaskResultSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('task-result'),
  runId: Identifier,
  taskId: Identifier,
  attempt: SafeInteger.min(1),
  actor: ResultActorSchema,
  status: z.enum(['produced', 'failed', 'blocked']),
  taskHash: Sha256,
  inputManifestHash: Sha256,
  outputManifestHash: Sha256.nullable(),
  changedPaths: sortedUniqueStrings('changedPaths').pipe(z.array(WorkspacePath)),
  evidenceIds: sortedUniqueStrings('evidenceIds'),
  usage: UsageSchema,
  error: ResultErrorSchema.nullable()
}).strict().superRefine((result, context) => {
  if (result.status === 'produced' && !result.outputManifestHash) {
    context.addIssue({ code: 'custom', path: ['outputManifestHash'], message: 'produced results require outputManifestHash' });
  }
  if (result.status !== 'produced' && !result.error) {
    context.addIssue({ code: 'custom', path: ['error'], message: 'failed and blocked results require error' });
  }
});

const EvidenceManifestSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('evidence-manifest'),
  evidenceId: Identifier,
  epistemicStatus: EpistemicStatus,
  artifactHash: Sha256,
  sourceEvidenceIds: sortedUniqueStrings('sourceEvidenceIds'),
  producerActorId: Identifier,
  createdAt: IsoDatetime,
  payloadPath: WorkspacePath,
  reason: Identifier.nullable()
}).strict().superRefine((evidence, context) => {
  if (evidence.epistemicStatus === 'observed' && evidence.sourceEvidenceIds.length > 0) {
    context.addIssue({ code: 'custom', path: ['sourceEvidenceIds'], message: 'observed evidence cannot cite sourceEvidenceIds' });
  }
  if (['derived', 'inferred'].includes(evidence.epistemicStatus) && evidence.sourceEvidenceIds.length === 0) {
    context.addIssue({ code: 'custom', path: ['sourceEvidenceIds'], message: 'derived and inferred evidence require sourceEvidenceIds' });
  }
  if (evidence.epistemicStatus === 'unknown' && !evidence.reason) {
    context.addIssue({ code: 'custom', path: ['reason'], message: 'unknown evidence requires a reason' });
  }
  if (evidence.epistemicStatus !== 'unknown' && evidence.reason !== null) {
    context.addIssue({ code: 'custom', path: ['reason'], message: 'only unknown evidence can include a reason' });
  }
});

const SignatureSchema = z.object({
  algorithm: z.literal('Ed25519'),
  keyId: Identifier,
  signedPayload: Identifier,
  signatureBase64: Base64
}).strict();

const HumanDecisionUnsignedSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('human-decision'),
  decisionId: Identifier,
  authorityId: Identifier,
  nodeId: Identifier,
  taskHash: Sha256,
  artifactHash: Sha256,
  decision: z.enum(['approve', 'reject', 'request-changes']),
  decidedAt: IsoDatetime
}).strict();

const HumanDecisionSchema = HumanDecisionUnsignedSchema.extend({
  signature: SignatureSchema
}).strict().superRefine((decision, context) => {
  const { signature, ...unsigned } = decision;
  if (signature.signedPayload !== canonicalize(unsigned)) {
    context.addIssue({ code: 'custom', path: ['signature', 'signedPayload'], message: 'signedPayload must equal the canonical unsigned decision' });
  }
});

const CapabilitySchema = z.object({
  id: Identifier,
  status: z.enum(['observed', 'unverified', 'unavailable']),
  evidenceIds: sortedUniqueStrings('capability.evidenceIds')
}).strict();

const CapabilityReportUnsignedSchema = z.object({
  schemaVersion: z.literal(2),
  contractKind: z.literal('capability-report'),
  harnessId: Identifier,
  harnessVersion: Identifier,
  observedAt: IsoDatetime,
  capabilities: canonicalObjectList(CapabilitySchema, 'id', 'capabilities')
}).strict();

const CapabilityReportSchema = CapabilityReportUnsignedSchema.extend({
  reportHash: Sha256
}).strict().superRefine((report, context) => {
  const { reportHash, ...unsigned } = report;
  if (reportHash !== hashCanonical(unsigned)) {
    context.addIssue({ code: 'custom', path: ['reportHash'], message: 'reportHash does not match canonical capability report content' });
  }
});

const SCHEMAS = Object.freeze({
  'continuity-state': ContinuityStateSchema,
  roadmap: RoadmapSchema,
  'execution-task': ExecutionTaskSchema,
  'task-result': TaskResultSchema,
  'evidence-manifest': EvidenceManifestSchema,
  'human-decision': HumanDecisionSchema,
  'capability-report': CapabilityReportSchema
});

function validate(schema, input) {
  canonicalize(input);
  return schema.parse(input);
}

function validateContinuityState(input) { return validate(ContinuityStateSchema, input); }
function validateRoadmap(input) { return validate(RoadmapSchema, input); }
function validateExecutionTask(input) { return validate(ExecutionTaskSchema, input); }
function validateEvidenceManifest(input) { return validate(EvidenceManifestSchema, input); }
function validateHumanDecision(input) { return validate(HumanDecisionSchema, input); }
function validateCapabilityReport(input) { return validate(CapabilityReportSchema, input); }

function validateTaskResultV2(input, options = {}) {
  const result = validate(TaskResultSchema, input);
  if (options.verifierActorId && options.verifierActorId === result.actor.actorId) {
    throw new TypeError('builder and verifier actor identities must be independent');
  }
  return result;
}

function generateContinuitySchemas(outputDirectory) {
  const directory = path.resolve(outputDirectory);
  return Object.entries(SCHEMAS).map(([kind, schema]) => {
    const filename = path.join(directory, `${kind}.schema.json`);
    const jsonSchema = JSON.parse(JSON.stringify(z.toJSONSchema(schema)));
    writeJsonAtomic(filename, jsonSchema);
    return filename;
  });
}

module.exports = {
  ACTOR_ROLES,
  EPISTEMIC_STATUSES,
  NODE_TYPES,
  PROJECT_STATUSES,
  TASK_STATES,
  SCHEMAS,
  generateContinuitySchemas,
  validateCapabilityReport,
  validateContinuityState,
  validateEvidenceManifest,
  validateExecutionTask,
  validateHumanDecision,
  validateRoadmap,
  validateTaskResultV2
};
