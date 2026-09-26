'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { canonicalize, hashCanonical } = require('../src/shared/canonical-json');
const {
  SCHEMAS,
  generateContinuitySchemas,
  validateCapabilityReport,
  validateContinuityState,
  validateEvidenceManifest,
  validateExecutionTask,
  validateHumanDecision,
  validateRoadmap,
  validateTaskResultV2
} = require('../src/continuity/contracts');

const HASH_A = `sha256:${'a'.repeat(64)}`;
const HASH_B = `sha256:${'b'.repeat(64)}`;
const HASH_C = `sha256:${'c'.repeat(64)}`;
const ISO = '2026-09-26T12:00:00.000Z';

function validContinuityState(overrides = {}) {
  return {
    schemaVersion: 2,
    contractKind: 'continuity-state',
    revision: 0,
    projectStatus: 'experimental',
    activeProgramId: 'program-a',
    activeWaveId: null,
    lastEventHash: HASH_A,
    updatedAt: ISO,
    nextEligibleTaskIds: ['CONT-002'],
    blockedReasonCodes: [],
    ...overrides
  };
}

function validRoadmap(overrides = {}) {
  return {
    schemaVersion: 2,
    contractKind: 'roadmap',
    roadmapId: 'studio-dna-continuity',
    specHash: HASH_A,
    programs: [{ id: 'program-a', state: 'in-progress' }],
    nodes: [{
      id: 'CONT-002',
      programId: 'program-a',
      type: 'agent-task',
      state: 'ready',
      dependsOn: [],
      taskPath: 'continuity/tasks/program-a/CONT-002.json',
      requiredCapabilities: ['filesystem.patch', 'nodejs'],
      humanAuthorityId: null,
      blockedReasonCode: null
    }],
    ...overrides
  };
}

function validExecutionTask(overrides = {}) {
  return {
    schemaVersion: 2,
    contractKind: 'execution-task',
    taskId: 'CONT-002',
    programId: 'program-a',
    waveId: 'continuity-core',
    state: 'ready',
    dependsOn: [],
    role: 'builder',
    requiredCapabilities: ['filesystem.patch', 'nodejs'],
    inputs: [{ path: 'PROJECT_STATUS.md', sha256: HASH_A, purpose: 'status-evidence' }],
    authority: {
      readAllowlist: ['PROJECT_STATUS.md', 'src/orchestration/**'],
      writeAllowlist: ['src/continuity/contracts.js', 'test/continuity-contracts.test.js'],
      network: { mode: 'deny', hosts: [] }
    },
    requirements: [{ id: 'REQ-CONT-002', kind: 'behavior', assertion: 'reject unknown contract fields' }],
    commands: {
      red: 'node --test test/continuity-contracts.test.js',
      verify: 'node --test test/continuity-contracts.test.js test/task-contract.test.js test/blueprint.test.js'
    },
    budget: { maxAttempts: 2, timeoutMs: 600000, maxFilesChanged: 11 },
    failurePolicy: {
      ambiguity: 'blocked',
      missingInput: 'blocked',
      policyViolation: 'failed-no-retry',
      acceptanceFailure: 'failed'
    },
    expectedArtifacts: [{ path: 'schemas/v2/continuity-state.schema.json', mediaType: 'application/schema+json' }],
    ...overrides
  };
}

function validTaskResult(overrides = {}) {
  return {
    schemaVersion: 2,
    contractKind: 'task-result',
    runId: 'run-001',
    taskId: 'CONT-002',
    attempt: 1,
    actor: { actorId: 'gemini-builder-1', role: 'builder', harnessId: 'gemini-ide' },
    status: 'produced',
    taskHash: HASH_A,
    inputManifestHash: HASH_B,
    outputManifestHash: HASH_C,
    changedPaths: ['schemas/v2/continuity-state.schema.json'],
    evidenceIds: ['evidence-001'],
    usage: { inputTokens: 123, outputTokens: 456, durationMs: 789 },
    error: null,
    ...overrides
  };
}

function validEvidenceManifest(overrides = {}) {
  return {
    schemaVersion: 2,
    contractKind: 'evidence-manifest',
    evidenceId: 'evidence-001',
    epistemicStatus: 'observed',
    artifactHash: HASH_A,
    sourceEvidenceIds: [],
    producerActorId: 'browser-auditor-1',
    createdAt: ISO,
    payloadPath: 'continuity/evidence/evidence-001.json',
    reason: null,
    ...overrides
  };
}

function validHumanDecision(overrides = {}) {
  const unsigned = {
    schemaVersion: 2,
    contractKind: 'human-decision',
    decisionId: 'decision-001',
    authorityId: 'owner-1',
    nodeId: 'CONT-002',
    taskHash: HASH_A,
    artifactHash: HASH_B,
    decision: 'approve',
    decidedAt: ISO
  };
  return {
    ...unsigned,
    signature: {
      algorithm: 'Ed25519',
      keyId: 'owner-key-1',
      signedPayload: canonicalize(unsigned),
      signatureBase64: 'AA=='
    },
    ...overrides
  };
}

function validCapabilityReport(overrides = {}) {
  const unsigned = {
    schemaVersion: 2,
    contractKind: 'capability-report',
    harnessId: 'gemini-ide',
    harnessVersion: '1.0.0',
    observedAt: ISO,
    capabilities: [{ id: 'filesystem.patch', status: 'observed', evidenceIds: ['evidence-001'] }]
  };
  return { ...unsigned, reportHash: hashCanonical(unsigned), ...overrides };
}

test('validates one canonical fixture for every continuity contract', () => {
  assert.deepEqual(validateContinuityState(validContinuityState()), validContinuityState());
  assert.deepEqual(validateRoadmap(validRoadmap()), validRoadmap());
  assert.deepEqual(validateExecutionTask(validExecutionTask()), validExecutionTask());
  assert.deepEqual(validateTaskResultV2(validTaskResult()), validTaskResult());
  assert.deepEqual(validateEvidenceManifest(validEvidenceManifest()), validEvidenceManifest());
  assert.deepEqual(validateHumanDecision(validHumanDecision()), validHumanDecision());
  assert.deepEqual(validateCapabilityReport(validCapabilityReport()), validCapabilityReport());
});

test('rejects unknown fields, malformed hashes, invalid states, and non-canonical identifier arrays', () => {
  assert.throws(() => validateContinuityState({ ...validContinuityState(), extra: true }), /unrecognized|unknown/i);
  assert.throws(() => validateContinuityState(validContinuityState({ lastEventHash: 'sha256:not-a-hash' })), /invalid|sha256/i);
  assert.throws(() => validateRoadmap(validRoadmap({ nodes: [{ ...validRoadmap().nodes[0], state: 'invented' }] })), /invalid|option/i);
  assert.throws(() => validateExecutionTask(validExecutionTask({ requiredCapabilities: ['nodejs', 'filesystem.patch'] })), /canonically sorted|unique/i);
  assert.throws(() => validateTaskResultV2(validTaskResult({ evidenceIds: ['evidence-001', 'evidence-001'] })), /canonically sorted|unique/i);
});

test('task rejects ambiguous authority and paths outside the workspace', () => {
  assert.throws(() => validateExecutionTask({ ...validExecutionTask(), instructions: 'make it premium' }), /unrecognized|unknown/i);
  assert.throws(() => validateExecutionTask(validExecutionTask({
    authority: { ...validExecutionTask().authority, writeAllowlist: ['../outside'] }
  })), /workspace-relative/i);
  assert.throws(() => validateExecutionTask(validExecutionTask({
    inputs: [{ ...validExecutionTask().inputs[0], path: 'C:\\outside.json' }]
  })), /workspace-relative/i);
});

test('enforces human authority, result ownership, and evidence provenance cross-fields', () => {
  assert.throws(() => validateRoadmap(validRoadmap({ nodes: [{
    ...validRoadmap().nodes[0],
    type: 'human-gate',
    taskPath: null,
    humanAuthorityId: null
  }] })), /humanAuthorityId/i);
  assert.throws(() => validateTaskResultV2(validTaskResult(), { verifierActorId: 'gemini-builder-1' }), /independent|collision/i);
  assert.throws(() => validateTaskResultV2(validTaskResult({ outputManifestHash: null })), /outputManifestHash/i);
  assert.throws(() => validateTaskResultV2(validTaskResult({ status: 'failed', outputManifestHash: null, error: null })), /error/i);
  assert.throws(() => validateEvidenceManifest(validEvidenceManifest({ epistemicStatus: 'derived', sourceEvidenceIds: [] })), /sourceEvidenceIds/i);
  assert.throws(() => validateEvidenceManifest(validEvidenceManifest({ epistemicStatus: 'unknown', reason: null })), /reason/i);
  assert.throws(() => validateHumanDecision(validHumanDecision({
    signature: { ...validHumanDecision().signature, signatureBase64: 'not base64??' }
  })), /base64/i);
});

test('generates deterministic JSON schemas for every contract', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'continuity-schemas-'));
  try {
    const first = generateContinuitySchemas(root);
    const firstBytes = Object.fromEntries(first.map(filename => [path.basename(filename), fs.readFileSync(filename, 'utf8')]));
    const second = generateContinuitySchemas(root);
    const secondBytes = Object.fromEntries(second.map(filename => [path.basename(filename), fs.readFileSync(filename, 'utf8')]));
    assert.deepEqual(Object.keys(SCHEMAS).sort(), [
      'capability-report', 'continuity-state', 'evidence-manifest', 'execution-task',
      'human-decision', 'roadmap', 'task-result'
    ]);
    assert.deepEqual(firstBytes, secondBytes);
    assert.deepEqual(Object.keys(firstBytes).sort(), [
      'capability-report.schema.json', 'continuity-state.schema.json', 'evidence-manifest.schema.json',
      'execution-task.schema.json', 'human-decision.schema.json', 'roadmap.schema.json', 'task-result.schema.json'
    ]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
