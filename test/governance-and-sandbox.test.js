const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { ExecutionLedger } = require('../src/orchestration/execution-ledger');
const { scheduleBlueprint } = require('../src/orchestration/dag-scheduler');
const { createGeminiIdeAdapter } = require('../src/execution/gemini-ide-adapter');

test('ExecutionLedger: atomic recordTokenUsage reducer aggregates concurrent token deltas without lost updates', () => {
  const ledger = new ExecutionLedger();
  const run = ledger.createRun({
    runId: 'run-atomic-test',
    taskId: 'transmute',
    model: 'gemini-2.5-pro',
    status: 'running',
    inputTokens: 100,
    outputTokens: 50,
    retries: 0,
    gates: {},
    artifactHash: 'sha256:1111'
  });

  // Simulate two concurrent task completions reporting token deltas
  ledger.recordTokenUsage('run-atomic-test', 350, 120);
  ledger.recordTokenUsage('run-atomic-test', 200, 80);

  const updatedRun = ledger.getRun('run-atomic-test');
  assert.equal(updatedRun.inputTokens, 100 + 350 + 200); // 650
  assert.equal(updatedRun.outputTokens, 50 + 120 + 80);  // 250
});

test('ExecutionLedger: appendChainedEvent creates tamper-evident cryptographic hash chain', () => {
  const ledger = new ExecutionLedger();
  ledger.createRun({
    runId: 'run-chain-test',
    taskId: 'audit',
    model: 'gemini-2.5-pro',
    status: 'running',
    inputTokens: 0,
    outputTokens: 0,
    retries: 0,
    gates: {},
    artifactHash: 'sha256:2222'
  });

  ledger.appendChainedEvent('run-chain-test', { step: 1, action: 'clone' });
  ledger.appendChainedEvent('run-chain-test', { step: 2, action: 'transmute' });
  ledger.appendChainedEvent('run-chain-test', { step: 3, action: 'verify' });

  const verification = ledger.verifyEventChain('run-chain-test');
  assert.equal(verification.valid, true);
  assert.equal(verification.eventCount, 3);

  // Simulate malicious ledger tampering: modify an event payload
  const run = ledger.getRun('run-chain-test');
  run.events[1].action = 'tampered-action';
  // Re-verify tampered run by loading into a new ledger instance
  const tamperedLedger = new ExecutionLedger({
    version: 1,
    runs: [run]
  });
  const tamperedCheck = tamperedLedger.verifyEventChain('run-chain-test');
  assert.equal(tamperedCheck.valid, false, 'Tampered event must fail chain verification');
});

test('DAG Scheduler: enforces verifier segregation and blocks self-attestation', async () => {
  const blueprint = {
    version: 1,
    runId: 'run-segregation',
    clientScope: 'client-secure',
    tasks: [
      { id: 'task-impl', actorId: 'agent-alice', dependsOn: [] }
    ]
  };

  // Alice tries to verify her own task output: MUST throw DAG_VERIFIER_SEGREGATION_VIOLATION
  await assert.rejects(
    scheduleBlueprint(blueprint, async () => ({ code: 'generated' }), {
      verifierActorId: 'agent-alice',
      verifyTask: async () => true
    }),
    error => error.code === 'DAG_VERIFIER_SEGREGATION_VIOLATION'
  );

  // Bob (independent verifier) verifies Alice's task: PASSES
  const result = await scheduleBlueprint(blueprint, async () => ({ code: 'generated' }), {
    verifierActorId: 'agent-bob',
    verifyTask: async () => true
  });
  assert.deepEqual(result.completed, ['task-impl']);
});

test('Gemini IDE Adapter: isolates tasks in hierarchical directories and prevents flat collisions', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'gemini-hierarchical-'));
  const adapter = createGeminiIdeAdapter({ directory });

  const taskA = { version: 1, runId: 'run-101', taskId: 'ast-task', clientScope: 'client-alpha', input: { p: 1 } };
  const taskB = { version: 1, runId: 'run-102', taskId: 'ast-task', clientScope: 'client-beta', input: { p: 2 } };

  assert.throws(() => adapter.invoke(taskA), error => error.code === 'GEMINI_IDE_PENDING');
  assert.throws(() => adapter.invoke(taskB), error => error.code === 'GEMINI_IDE_PENDING');

  // Verify scoped directories were created separately for alpha and beta despite identical taskId
  const pathA = path.join(directory, 'runs', 'run-101', 'client-alpha', 'ast-task', 'attempt-1', 'task-package.json');
  const pathB = path.join(directory, 'runs', 'run-102', 'client-beta', 'ast-task', 'attempt-1', 'task-package.json');
  assert.ok(fs.existsSync(pathA), 'Client Alpha scoped path must exist');
  assert.ok(fs.existsSync(pathB), 'Client Beta scoped path must exist');

  // Provide result to Alpha's scoped path
  const resultPathA = path.join(directory, 'runs', 'run-101', 'client-alpha', 'ast-task', 'attempt-1', 'task-result.json');
  fs.writeFileSync(resultPathA, JSON.stringify({ ...taskA, status: 'passed', output: { client: 'alpha-done' } }));

  // Invoke Alpha succeeds, Beta still pending
  assert.deepEqual(adapter.invoke(taskA), { output: { client: 'alpha-done' }, usage: {} });
  assert.throws(() => adapter.invoke(taskB), error => error.code === 'GEMINI_IDE_PENDING');

  // Cleanup
  fs.rmSync(directory, { recursive: true, force: true });
});
