const test = require('node:test');
const assert = require('node:assert/strict');
const {
  createWorkflowMachine,
  createWorkflowActor
} = require('../src/orchestration/workflow-machine');

const initialContext = {
  runId: 'run-001',
  clientId: 'piloto-elyse-luxe',
  planVersion: 1,
  attempts: 0,
  candidateArtifact: null,
  blockingEvidence: null
};

function startActor() {
  const actor = createWorkflowActor(createWorkflowMachine(initialContext));
  actor.start();
  return actor;
}

function fullQaEvidence() {
  return {
    reportId: 'untrusted-display-id',
    status: 'candidate',
    artifactSha256: 'a'.repeat(64),
    reportArtifact: artifactRef('e'.repeat(64), initialContext.clientId, initialContext.runId, 'qa-report'),
    gates: {
      antiSlop: { passed: true },
      console: { passed: true, errorsCount: 0 },
      network: { passed: true, failedRequestsCount: 0 },
      structural: { passed: true, brokenImagesCount: 0 }
    }
  };
}

function artifactRef(sha256 = 'a'.repeat(64), clientId = initialContext.clientId, runId = initialContext.runId, type = 'site') {
  return {
    id: sha256,
    sha256,
    runId,
    clientId,
    type,
    relativePath: `${clientId}/${runId}/artifacts/${type}/${sha256}.json`
  };
}

function advanceToVerifying(actor) {
  actor.send({ type: 'CONTEXT_FROZEN' });
  actor.send({ type: 'PLAN_REQUESTED' });
  actor.send({ type: 'BLUEPRINT_ACCEPTED' });
  actor.send({ type: 'EXECUTION_STARTED' });
  actor.send({ type: 'EXECUTION_COMPLETED', candidateArtifact: artifactRef() });
  assert.equal(actor.getSnapshot().value, 'verifying');
}

test('moves through the explicit workflow lifecycle only after persisted full-QA evidence', () => {
  const actor = startActor();

  actor.send({ type: 'CONTEXT_FROZEN' });
  assert.equal(actor.getSnapshot().value, 'context_ready');
  actor.send({ type: 'PLAN_REQUESTED' });
  assert.equal(actor.getSnapshot().value, 'planning');
  actor.send({ type: 'BLUEPRINT_ACCEPTED' });
  assert.equal(actor.getSnapshot().value, 'tasks_ready');
  actor.send({ type: 'EXECUTION_STARTED' });
  assert.equal(actor.getSnapshot().value, 'executing');
  actor.send({ type: 'EXECUTION_COMPLETED', candidateArtifact: artifactRef() });
  assert.equal(actor.getSnapshot().value, 'verifying');

  actor.send({ type: 'FULL_QA_PASSED', evidence: fullQaEvidence() });
  assert.equal(actor.getSnapshot().value, 'candidate');
  assert.deepEqual(actor.getSnapshot().context.qaEvidence, fullQaEvidence());

  actor.send({ type: 'FINAL_APPROVED' });
  assert.equal(actor.getSnapshot().value, 'candidate');
  actor.send({ type: 'FINAL_APPROVAL_REQUESTED' });
  assert.equal(actor.getSnapshot().value, 'awaiting_final_approval');
  actor.send({ type: 'FINAL_APPROVED' });
  assert.equal(actor.getSnapshot().value, 'verified');
});

test('requires a complete persisted QA report before candidate promotion', () => {
  const actor = startActor();
  advanceToVerifying(actor);

  actor.send({ type: 'FULL_QA_PASSED', evidence: { status: 'candidate', gates: { antiSlop: { passed: true } } } });

  assert.equal(actor.getSnapshot().value, 'verifying');
});

test('rejects an artifact that belongs to another client before verification', () => {
  const actor = startActor();
  actor.send({ type: 'CONTEXT_FROZEN' });
  actor.send({ type: 'PLAN_REQUESTED' });
  actor.send({ type: 'BLUEPRINT_ACCEPTED' });
  actor.send({ type: 'EXECUTION_STARTED' });

  actor.send({ type: 'EXECUTION_COMPLETED', candidateArtifact: artifactRef('d'.repeat(64), 'other-client') });

  assert.equal(actor.getSnapshot().value, 'executing');
});

test('requires a durable QA report artifact owned by the active run and client', () => {
  const actor = startActor();
  advanceToVerifying(actor);
  const forgedEvidence = fullQaEvidence();
  forgedEvidence.reportArtifact.clientId = 'other-client';

  actor.send({ type: 'FULL_QA_PASSED', evidence: forgedEvidence });

  assert.equal(actor.getSnapshot().value, 'verifying');
});

test('rejects traversal-like run and client IDs before creating a workflow', () => {
  assert.throws(
    () => createWorkflowMachine({ ...initialContext, runId: '../run-001' }),
    /unsafe slug/i
  );
  assert.throws(
    () => createWorkflowMachine({ ...initialContext, clientId: 'client/other' }),
    /unsafe slug/i
  );
});

test('routes the third QA block to human intervention after two bounded repairs', () => {
  const actor = startActor();
  advanceToVerifying(actor);

  actor.send({ type: 'QA_BLOCKED', evidence: { reportId: 'qa-1', status: 'failed' } });
  assert.equal(actor.getSnapshot().value, 'repairing');
  assert.equal(actor.getSnapshot().context.attempts, 1);
  actor.send({ type: 'REPAIR_COMPLETED' });
  assert.equal(actor.getSnapshot().value, 'executing');
  actor.send({ type: 'EXECUTION_COMPLETED', candidateArtifact: artifactRef('b'.repeat(64)) });

  actor.send({ type: 'QA_BLOCKED', evidence: { reportId: 'qa-2', status: 'failed' } });
  assert.equal(actor.getSnapshot().value, 'repairing');
  assert.equal(actor.getSnapshot().context.attempts, 2);
  actor.send({ type: 'REPAIR_COMPLETED' });
  actor.send({ type: 'EXECUTION_COMPLETED', candidateArtifact: artifactRef('c'.repeat(64)) });

  actor.send({ type: 'QA_BLOCKED', evidence: { reportId: 'qa-3', status: 'failed' } });
  assert.equal(actor.getSnapshot().value, 'human_intervention');
  assert.equal(actor.getSnapshot().context.attempts, 2);
  assert.deepEqual(actor.getSnapshot().context.blockingEvidence, { reportId: 'qa-3', status: 'failed' });
});

test('restores a serializable persisted snapshot without re-running prior events', () => {
  const actor = startActor();
  advanceToVerifying(actor);
  const snapshot = actor.getPersistedSnapshot();
  assert.doesNotThrow(() => JSON.stringify(snapshot));

  const restored = createWorkflowActor(createWorkflowMachine(initialContext), snapshot);
  restored.start();
  assert.equal(restored.getSnapshot().value, 'verifying');
  restored.send({ type: 'FULL_QA_PASSED', evidence: fullQaEvidence() });
  assert.equal(restored.getSnapshot().value, 'candidate');
});

test('rejects forged candidate and verified snapshots without an artifact-bound QA proof', () => {
  const actor = startActor();
  advanceToVerifying(actor);
  actor.send({ type: 'FULL_QA_PASSED', evidence: fullQaEvidence() });
  const candidate = actor.getPersistedSnapshot();
  candidate.context.candidateArtifact.clientId = 'other-client';

  assert.throws(
    () => createWorkflowActor(createWorkflowMachine(initialContext), candidate),
    /snapshot/i
  );

  const verified = actor.getPersistedSnapshot();
  verified.value = 'verified';
  verified.context.qaEvidence = null;
  assert.throws(
    () => createWorkflowActor(createWorkflowMachine(initialContext), verified),
    /snapshot/i
  );
});

test('rejects a restored promoted snapshot with a forged QA report reference', () => {
  const actor = startActor();
  advanceToVerifying(actor);
  actor.send({ type: 'FULL_QA_PASSED', evidence: fullQaEvidence() });
  const candidate = actor.getPersistedSnapshot();
  candidate.context.qaEvidence.reportArtifact.relativePath = 'other-client/run-001/artifacts/qa-report/evidence.json';

  assert.throws(
    () => createWorkflowActor(createWorkflowMachine(initialContext), candidate),
    /snapshot/i
  );
});
