const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { ExecutionLedger } = require('../src/orchestration/execution-ledger');

function sampleRun(overrides = {}) {
  return {
    runId: 'run-2026-09-01-001',
    taskId: 'repair-scalex-assets',
    model: 'gemini-3.7-flash',
    status: 'running',
    inputTokens: 1800,
    outputTokens: 620,
    retries: 0,
    gates: { unified: 'passed', scrutiny: 'pending' },
    artifactHash: 'sha256:abc123',
    ...overrides
  };
}

test('creates a run with stable identifiers and execution metadata', () => {
  const ledger = new ExecutionLedger();
  const run = ledger.createRun(sampleRun());

  assert.equal(run.runId, 'run-2026-09-01-001');
  assert.equal(run.taskId, 'repair-scalex-assets');
  assert.equal(run.model, 'gemini-3.7-flash');
  assert.equal(run.inputTokens, 1800);
  assert.equal(run.outputTokens, 620);
  assert.equal(run.artifactHash, 'sha256:abc123');
  assert.deepEqual(run.gates, { unified: 'passed', scrutiny: 'pending' });
});

test('appends immutable events without mutating prior records', () => {
  const ledger = new ExecutionLedger();
  const run = ledger.createRun(sampleRun());
  const before = JSON.parse(JSON.stringify(run));

  const updated = ledger.appendEvent(run.runId, {
    type: 'gate',
    status: 'passed',
    gate: 'scrutiny'
  });

  assert.deepEqual(run, before);
  assert.equal(updated.events.length, 1);
  assert.deepEqual(updated.events[0], {
    type: 'gate',
    status: 'passed',
    gate: 'scrutiny'
  });
  assert.equal(ledger.getRun(run.runId).events.length, 1);
});

test('rejects malformed or negative token and retry data', () => {
  const ledger = new ExecutionLedger();
  for (const field of ['inputTokens', 'outputTokens', 'retries']) {
    assert.throws(() => ledger.createRun(sampleRun({ [field]: -1 })), /non-negative.*integer/);
    assert.throws(() => ledger.createRun(sampleRun({ [field]: 1.5 })), /non-negative.*integer/);
  }
  assert.throws(() => ledger.createRun(sampleRun({ inputTokens: '1800' })), /non-negative.*integer/);
  assert.throws(() => ledger.createRun(sampleRun({ runId: '' })), /runId/);
  assert.throws(() => ledger.createRun(sampleRun({ inputTokens: Number.MAX_SAFE_INTEGER + 1 })), /non-negative safe integer/);
});

test('rejects malformed snapshots instead of coercing missing collections', () => {
  assert.throws(() => new ExecutionLedger({}), /version/);
  assert.throws(() => new ExecutionLedger({ version: 1, runs: {} }), /runs/);
  assert.throws(() => new ExecutionLedger({ version: 1, runs: [sampleRun()] }), /events/);
  assert.throws(() => new ExecutionLedger({ version: 1, runs: [{ ...sampleRun(), events: {} }] }), /events/);
  assert.throws(() => new ExecutionLedger({ version: 99, runs: [] }), /version/);
  assert.throws(() => new ExecutionLedger({ version: undefined, runs: [] }), /version/);
  assert.throws(() => new ExecutionLedger({ version: 1, runs: [{ ...sampleRun(), events: [new Date()] }] }), /plain JSON object/);
});

test('rejects events containing values that cannot be represented in JSON', () => {
  const ledger = new ExecutionLedger();
  const run = ledger.createRun(sampleRun());
  assert.throws(() => ledger.appendEvent(run.runId, undefined), /JSON-safe/);
  assert.throws(() => ledger.appendEvent(run.runId, { value: undefined }), /JSON-safe/);
  assert.throws(() => ledger.appendEvent(run.runId, { value: Infinity }), /JSON-safe/);
  assert.throws(() => ledger.appendEvent(run.runId, { value: () => {} }), /JSON-safe/);
  assert.throws(() => ledger.appendEvent(run.runId, new Date()), /plain JSON object/);
  assert.throws(() => ledger.appendEvent(run.runId, { value: new Map() }), /plain JSON object/);
  assert.throws(() => ledger.appendEvent(run.runId, { value: new Set() }), /plain JSON object/);
  const symbol = Symbol('metadata');
  const symbolic = { type: 'event' };
  symbolic[symbol] = 'hidden';
  assert.throws(() => ledger.appendEvent(run.runId, symbolic), /JSON-safe/);
  assert.throws(() => ledger.createRun(sampleRun({ gates: { result: new Date() } })), /JSON-safe/);
});

test('serializes compact JSON and reloads persisted runs', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-dna-ledger-'));
  try {
    const filename = path.join(directory, 'execution-ledger.json');
    const ledger = new ExecutionLedger();
    ledger.createRun(sampleRun());
    ledger.appendEvent('run-2026-09-01-001', { type: 'model', status: 'completed' });

    const serialized = ledger.serialize();
    assert.equal(serialized.includes('\n'), false);
    ledger.save(filename);
    const restored = ExecutionLedger.load(filename);
    assert.deepEqual(restored.getRun('run-2026-09-01-001'), ledger.getRun('run-2026-09-01-001'));
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('updateRun only permits mutable execution fields', () => {
  const ledger = new ExecutionLedger();
  ledger.createRun({
    runId: 'run-1', taskId: 'task-1', model: 'pipeline-runner',
    inputTokens: 0, outputTokens: 0, retries: 0, status: 'running', gates: {}, artifactHash: 'sha256:x'
  });
  ledger.updateRun('run-1', { status: 'completed', completedAt: '2026-09-01T00:00:00.000Z' });
  assert.equal(ledger.getRun('run-1').status, 'completed');
  for (const field of ['runId', 'taskId', 'model', 'events']) {
    assert.throws(() => ledger.updateRun('run-1', { [field]: 'changed' }), /immutable/);
  }
});
