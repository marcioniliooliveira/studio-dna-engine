'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { ExecutionLedger } = require('./execution-ledger');
const { validateBlueprint } = require('./blueprint');
const { scheduleBlueprint } = require('./dag-scheduler');
const { createExecutor } = require('./../orchestration/executor-adapter');

function hash(value) { return `sha256:${crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex')}`; }

async function runWorkflow(options = {}) {
  const blueprint = validateBlueprint(options.blueprint);
  if (typeof options.invoke !== 'function') throw new TypeError('invoke is required');
  if (typeof options.verify !== 'function') throw new TypeError('verify is required');
  const ledger = options.ledger || new ExecutionLedger();
  const runId = blueprint.runId;
  if (!ledger.getRun(runId)) ledger.createRun({ runId, taskId: `workflow:${runId}`, model: options.model || 'gemini-3.7-flash', inputTokens: 0, outputTokens: 0, retries: 0, status: 'running', gates: {}, artifactHash: 'pending', inputHash: hash(blueprint) });
  const emit = event => { if (typeof options.onEvent === 'function') options.onEvent(event); };
  const executor = createExecutor({ ledger, runId, invoke: options.invoke, maxRetries: blueprint.budget && blueprint.budget.maxRetries || 0 });
  try {
    const result = await scheduleBlueprint(blueprint, task => executor.execute({ ...task, input: task.input || {} }), {
      verifyTask: (task, output, context) => options.verify(task, output, context), ledger, runId
    });
    ledger.updateRun(runId, { status: 'completed', completedAt: new Date().toISOString() });
    if (options.ledgerPath) ledger.save(path.resolve(options.ledgerPath));
    const run = ledger.getRun(runId);
    run.events.forEach(emit);
    return { ...result, status: run.status, inputTokens: run.inputTokens, outputTokens: run.outputTokens, retries: run.retries, ledger };
  } catch (error) {
    ledger.updateRun(runId, { status: 'failed', completedAt: new Date().toISOString() });
    if (options.ledgerPath) { fs.mkdirSync(path.dirname(path.resolve(options.ledgerPath)), { recursive: true }); ledger.save(path.resolve(options.ledgerPath)); }
    throw error;
  }
}

module.exports = { runWorkflow };
