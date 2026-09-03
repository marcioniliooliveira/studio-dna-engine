'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { runWorkflow } = require('../src/orchestration/workflow-orchestrator');

const blueprint = () => ({ version: 1, runId: 'workflow-1', clientScope: 'client-a', budget: { maxRetries: 1 }, tasks: [
  { id: 'prepare', dependsOn: [], input: { action: 'prepare' } },
  { id: 'verify', dependsOn: ['prepare'], input: { action: 'verify' } }
] });

test('runs a blueprint through executor, verifier and ledger lifecycle', async () => {
  const events = [];
  const result = await runWorkflow({ blueprint: blueprint(), invoke: async task => ({ output: { task: task.id }, usage: { inputTokens: 2, outputTokens: 1 } }), verify: async () => true, onEvent: event => events.push(event) });
  assert.deepEqual(result.completed, ['prepare', 'verify']);
  assert.equal(result.status, 'completed');
  assert.equal(result.inputTokens, 4);
  assert.equal(result.outputTokens, 2);
  assert.ok(events.some(event => event.status === 'passed'));
});

test('fails and records lifecycle when verification rejects a task', async () => {
  await assert.rejects(runWorkflow({ blueprint: blueprint(), invoke: async task => ({ output: task.id }), verify: async task => task.id !== 'prepare' }), error => error.code === 'DAG_VERIFICATION_FAILED');
});
