const test = require('node:test');
const assert = require('node:assert/strict');
const { ExecutionLedger } = require('../src/orchestration/execution-ledger');
const { createExecutor } = require('../src/orchestration/executor-adapter');

function ledgerWithRun() {
  const ledger = new ExecutionLedger();
  ledger.createRun({
    runId: 'run-executor', taskId: 'task-1', model: 'gemini-3.7-flash',
    inputTokens: 0, outputTokens: 0, retries: 0, status: 'running', gates: {}, artifactHash: 'pending'
  });
  return ledger;
}

test('executor records usage and completion event from a provider result', async () => {
  const ledger = ledgerWithRun();
  const executor = createExecutor({
    model: 'gemini-3.7-flash', ledger, runId: 'run-executor',
    invoke: async () => ({ output: { ok: true }, usage: { inputTokens: 11, outputTokens: 7 } })
  });
  const result = await executor.execute({ id: 'step-1', prompt: 'compact' });
  const run = ledger.getRun('run-executor');
  assert.deepEqual(result, { ok: true });
  assert.equal(run.inputTokens, 11);
  assert.equal(run.outputTokens, 7);
  assert.equal(run.retries, 0);
  assert.equal(run.events.at(-1).type, 'executor');
  assert.equal(run.events.at(-1).status, 'completed');
});

test('executor retries transient provider failures and records retry count', async () => {
  const ledger = ledgerWithRun();
  let attempts = 0;
  const executor = createExecutor({
    ledger, runId: 'run-executor', maxRetries: 1,
    invoke: async () => {
      attempts += 1;
      if (attempts === 1) throw new Error('temporary');
      return { output: 'ok', usage: { inputTokens: 2, outputTokens: 1 } };
    }
  });
  assert.equal(await executor.execute({ id: 'step-2' }), 'ok');
  assert.equal(attempts, 2);
  assert.equal(ledger.getRun('run-executor').retries, 1);
});

test('executor fails after retry budget and preserves error telemetry', async () => {
  const ledger = ledgerWithRun();
  const executor = createExecutor({ ledger, runId: 'run-executor', maxRetries: 1, invoke: async () => { throw new Error('down'); } });
  await assert.rejects(executor.execute({ id: 'step-3' }), /down/);
  const run = ledger.getRun('run-executor');
  assert.equal(run.retries, 1);
  assert.equal(run.events.at(-1).status, 'failed');
});
