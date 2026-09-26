'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const test = require('node:test');
const { canonicalize, hashCanonical } = require('../src/shared/canonical-json');
const {
  applyHumanDecision,
  selectReadyNodes,
  transitionNode,
  validateRoadmapSemantics
} = require('../src/continuity/roadmap-engine');

const HASH_A = `sha256:${'a'.repeat(64)}`;
const HASH_B = `sha256:${'b'.repeat(64)}`;

function capabilityReport(ids) {
  const unsigned = {
    schemaVersion: 2,
    contractKind: 'capability-report',
    harnessId: 'local',
    harnessVersion: '1.0.0',
    observedAt: '2026-09-26T12:00:00.000Z',
    capabilities: ids.sort().map(id => ({ id, status: 'observed', evidenceIds: ['evidence-001'] }))
  };
  return { ...unsigned, reportHash: hashCanonical(unsigned) };
}

function node(id, overrides = {}) {
  return {
    id,
    programId: 'program-a',
    type: 'agent-task',
    state: 'ready',
    dependsOn: [],
    taskPath: `continuity/tasks/${id}.json`,
    requiredCapabilities: ['filesystem.patch'],
    humanAuthorityId: null,
    blockedReasonCode: null,
    ...overrides
  };
}

function roadmap(nodes, overrides = {}) {
  return {
    schemaVersion: 2,
    contractKind: 'roadmap',
    roadmapId: 'roadmap-1',
    specHash: HASH_A,
    programs: [{ id: 'program-a', state: 'in-progress' }],
    nodes: [...nodes].sort((left, right) => left.id.localeCompare(right.id)),
    ...overrides
  };
}

function signedDecision(privateKey, overrides = {}) {
  const unsigned = {
    schemaVersion: 2,
    contractKind: 'human-decision',
    decisionId: 'decision-001',
    authorityId: 'owner-1',
    nodeId: 'gate-1',
    taskHash: HASH_A,
    artifactHash: HASH_B,
    decision: 'approve',
    decidedAt: '2026-09-26T12:00:00.000Z',
    ...overrides
  };
  const signedPayload = canonicalize(unsigned);
  return {
    ...unsigned,
    signature: {
      algorithm: 'Ed25519',
      keyId: 'owner-key-1',
      signedPayload,
      signatureBase64: crypto.sign(null, Buffer.from(signedPayload), privateKey).toString('base64')
    }
  };
}

test('roadmap semantics reject unknown dependencies and cycles', () => {
  assert.throws(() => validateRoadmapSemantics(roadmap([
    node('a-node', { dependsOn: ['missing-node'] })
  ])), error => error.code === 'ROADMAP_UNKNOWN_DEPENDENCY');
  assert.throws(() => validateRoadmapSemantics(roadmap([
    node('a-node', { dependsOn: ['b-node'] }),
    node('b-node', { dependsOn: ['a-node'] })
  ])), error => error.code === 'ROADMAP_CYCLE');
});

test('missing capabilities block only their dependent branch', () => {
  const ready = selectReadyNodes({
    roadmap: roadmap([
      node('browser-node', { requiredCapabilities: ['browser.cdp'] }),
      node('file-node')
    ]),
    capabilityReports: [capabilityReport(['filesystem.patch'])],
    taskExists: () => true
  });
  assert.deepEqual(ready.map(item => item.id), ['file-node']);
});

test('only a verifier can pass a task and agents cannot approve human gates', () => {
  const taskRoadmap = roadmap([node('task-1')]);
  const running = transitionNode({ roadmap: taskRoadmap, nodeId: 'task-1', toState: 'running', actor: { actorId: 'builder-1', role: 'builder' } });
  const produced = transitionNode({ roadmap: running, nodeId: 'task-1', toState: 'produced', actor: { actorId: 'builder-1', role: 'builder' } });
  const verifying = transitionNode({ roadmap: produced, nodeId: 'task-1', toState: 'verifying', actor: { actorId: 'builder-1', role: 'builder' } });
  assert.throws(() => transitionNode({ roadmap: verifying, nodeId: 'task-1', toState: 'passed', actor: { actorId: 'builder-1', role: 'builder' } }), error => error.code === 'ROADMAP_VERIFIER_REQUIRED');
  assert.equal(transitionNode({ roadmap: verifying, nodeId: 'task-1', toState: 'passed', actor: { actorId: 'verifier-1', role: 'verifier' } }).nodes[0].state, 'passed');

  const gateRoadmap = roadmap([node('gate-1', {
    type: 'human-gate',
    state: 'human-review-required',
    taskPath: null,
    humanAuthorityId: 'owner-1'
  })]);
  assert.throws(() => transitionNode({ roadmap: gateRoadmap, nodeId: 'gate-1', toState: 'approved', actor: { actorId: 'builder-1', role: 'builder' } }), error => error.code === 'ROADMAP_HUMAN_DECISION_REQUIRED');
});

test('verified human decisions bind the exact authority, task and artifact before approval', () => {
  const pair = crypto.generateKeyPairSync('ed25519');
  const gateRoadmap = roadmap([node('gate-1', {
    type: 'human-gate',
    state: 'human-review-required',
    taskPath: null,
    humanAuthorityId: 'owner-1'
  })]);
  const approved = applyHumanDecision({
    roadmap: gateRoadmap,
    decision: signedDecision(pair.privateKey),
    trustedPublicKeys: { 'owner-key-1': pair.publicKey },
    taskHash: HASH_A,
    artifactHash: HASH_B
  });
  assert.equal(approved.nodes[0].state, 'approved');
  assert.throws(() => applyHumanDecision({
    roadmap: gateRoadmap,
    decision: signedDecision(pair.privateKey, { authorityId: 'someone-else' }),
    trustedPublicKeys: { 'owner-key-1': pair.publicKey },
    taskHash: HASH_A,
    artifactHash: HASH_B
  }), /signedPayload|authority/i);
});
