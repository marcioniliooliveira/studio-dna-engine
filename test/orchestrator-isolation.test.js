'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { scheduleBlueprint } = require('../src/orchestration/dag-scheduler');
const { ExecutionLedger } = require('../src/orchestration/execution-ledger');
const { assertPathAccess, assertIndependentVerifier } = require('../src/orchestration/policy-enforcer');

test('serializes conflicting parallel write tasks and logs WRITE_LOCK_SERIALIZED in ledger', async () => {
  const ledger = new ExecutionLedger();
  const runId = 'isolation-run-1';
  ledger.createRun({
    runId,
    taskId: 'orchestrator-isolation-test',
    model: 'test-model',
    inputTokens: 0,
    outputTokens: 0,
    retries: 0,
    status: 'running',
    gates: {},
    artifactHash: 'pending'
  });

  const blueprint = {
    version: 1,
    runId,
    clientScope: 'silvio-iwata',
    tasks: [
      {
        id: 'task-a',
        dependsOn: [],
        writeAllowlist: ['clientes/silvio-iwata/site/**']
      },
      {
        id: 'task-b',
        dependsOn: [],
        writeAllowlist: ['clientes/silvio-iwata/site/index.html']
      }
    ]
  };

  const executionOrder = [];
  let concurrentExecutions = 0;
  let maxConcurrent = 0;

  const result = await scheduleBlueprint(blueprint, async (task) => {
    concurrentExecutions++;
    maxConcurrent = Math.max(maxConcurrent, concurrentExecutions);
    executionOrder.push(task.id);
    await new Promise(r => setTimeout(r, 20));
    concurrentExecutions--;
    return { executed: task.id };
  }, { ledger, runId });

  assert.equal(maxConcurrent, 1, 'Conflicting write tasks must not execute concurrently');
  assert.deepEqual(result.completed, ['task-a', 'task-b']);

  const run = ledger.getRun(runId);
  const serializedEvents = run.events.filter(e => e.type === 'WRITE_LOCK_SERIALIZED');
  assert.equal(serializedEvents.length >= 1, true, 'Must log WRITE_LOCK_SERIALIZED event');
  assert.equal(serializedEvents[0].taskId, 'task-b');
  assert.equal(serializedEvents[0].conflictingTaskId, 'task-a');
});

test('allows non-conflicting parallel tasks to run concurrently without WRITE_LOCK_SERIALIZED', async () => {
  const ledger = new ExecutionLedger();
  const runId = 'isolation-run-2';
  ledger.createRun({
    runId,
    taskId: 'orchestrator-concurrency-test',
    model: 'test-model',
    inputTokens: 0,
    outputTokens: 0,
    retries: 0,
    status: 'running',
    gates: {},
    artifactHash: 'pending'
  });

  const blueprint = {
    version: 1,
    runId,
    clientScope: 'global',
    tasks: [
      {
        id: 'task-client-a',
        dependsOn: [],
        writeAllowlist: ['clientes/client-a/output/**']
      },
      {
        id: 'task-client-b',
        dependsOn: [],
        writeAllowlist: ['clientes/client-b/output/**']
      }
    ]
  };

  let maxConcurrent = 0;
  let active = 0;

  const result = await scheduleBlueprint(blueprint, async (task) => {
    active++;
    maxConcurrent = Math.max(maxConcurrent, active);
    await new Promise(r => setTimeout(r, 30));
    active--;
    return { ok: true };
  }, { ledger, runId });

  assert.equal(maxConcurrent, 2, 'Non-conflicting tasks should run in parallel in the same batch');
  assert.deepEqual(result.completed.sort(), ['task-client-a', 'task-client-b']);

  const run = ledger.getRun(runId);
  const serializedEvents = run.events.filter(e => e.type === 'WRITE_LOCK_SERIALIZED');
  assert.equal(serializedEvents.length, 0, 'No WRITE_LOCK_SERIALIZED event should be recorded');
});

test('orchestrator policy enforcer blocks illegal operations inside task execution', async () => {
  const clientContract = {
    id: 'TASK-V3-01-A',
    schemaVersion: 2,
    role: 'implementation_agent',
    actorId: 'agent-1',
    clientScope: 'client-a',
    surfaceMode: 'Operate',
    readAllowlist: ['clientes/client-a/**', 'copias/**'],
    writeAllowlist: ['clientes/client-a/site/**'],
    allowedTools: ['fs.read', 'fs.write'],
    allowedGates: ['unit_test_gate'],
    verificationCommand: 'node --test',
    maxRefinementAttempts: 3
  };

  // Cross-client access blocked
  assert.throws(() => {
    assertPathAccess(clientContract, 'clientes/client-b/secret.json', 'read');
  }, (err) => err.code === 'POLICY_CROSS_CLIENT_PATH');

  // Copias write blocked
  assert.throws(() => {
    assertPathAccess(clientContract, 'copias/manifest.json', 'write');
  }, (err) => err.code === 'POLICY_READONLY_COPIAS');

  // Verifier segregation enforced
  const verifierContract = {
    ...clientContract,
    role: 'technical_verifier_agent',
    actorId: 'agent-verifier',
    builderActorId: 'agent-verifier'
  };

  assert.throws(() => {
    assertIndependentVerifier(verifierContract);
  }, (err) => err.code === 'POLICY_VERIFIER_SEGREGATION');
});
