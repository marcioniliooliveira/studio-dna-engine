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
    reportId: 'qa-report-001',
    status: 'candidate',
    gates: {
      antiSlop: { passed: true },
      console: { passed: true, errorsCount: 0 },
      network: { passed: true, failedRequestsCount: 0 },
      structural: { passed: true, brokenImagesCount: 0 }
    }
  };
}

function advanceToVerifying(actor) {
  actor.send({ type: 'CONTEXT_FROZEN' });
  actor.send({ type: 'PLAN_REQUESTED' });
  actor.send({ type: 'BLUEPRINT_ACCEPTED' });
  actor.send({ type: 'EXECUTION_STARTED' });
  actor.send({ type: 'EXECUTION_COMPLETED', candidateArtifact: { id: 'artifact-001', sha256: 'a'.repeat(64) } });
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
  actor.send({ type: 'EXECUTION_COMPLETED', candidateArtifact: { id: 'artifact-001', sha256: 'a'.repeat(64) } });
  assert.equal(actor.getSnapshot().value, 'verifying');

  actor.send({ type: 'FULL_QA_PASSED', evidence: fullQaEvidence() });
  assert.equal(actor.getSnapshot().value, 'candidate');

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

test('routes the third QA block to human intervention after two bounded repairs', () => {
  const actor = startActor();
  advanceToVerifying(actor);

  actor.send({ type: 'QA_BLOCKED', evidence: { reportId: 'qa-1', status: 'failed' } });
  assert.equal(actor.getSnapshot().value, 'repairing');
  assert.equal(actor.getSnapshot().context.attempts, 1);
  actor.send({ type: 'REPAIR_COMPLETED' });
  assert.equal(actor.getSnapshot().value, 'executing');
  actor.send({ type: 'EXECUTION_COMPLETED', candidateArtifact: { id: 'artifact-002', sha256: 'b'.repeat(64) } });

  actor.send({ type: 'QA_BLOCKED', evidence: { reportId: 'qa-2', status: 'failed' } });
  assert.equal(actor.getSnapshot().value, 'repairing');
  assert.equal(actor.getSnapshot().context.attempts, 2);
  actor.send({ type: 'REPAIR_COMPLETED' });
  actor.send({ type: 'EXECUTION_COMPLETED', candidateArtifact: { id: 'artifact-003', sha256: 'c'.repeat(64) } });

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
