'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createGeminiIdeAdapter } = require('../src/execution/gemini-ide-adapter');

test('writes task package atomically and consumes matching IDE result', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'gemini-ide-'));
  const adapter = createGeminiIdeAdapter({ directory });
  const task = { version: 1, runId: 'r', taskId: 't', clientScope: 'c', input: { prompt: 'x' } };
  assert.throws(() => adapter.invoke(task), error => error.code === 'GEMINI_IDE_PENDING');
  fs.writeFileSync(path.join(directory, 't.task-result.json'), JSON.stringify({ ...task, status: 'passed', output: { ok: true }, usage: { inputTokens: 3, outputTokens: 2 } }));
  assert.deepEqual(adapter.invoke(task), { output: { ok: true }, usage: { inputTokens: 3, outputTokens: 2 } });
  fs.rmSync(directory, { recursive: true, force: true });
});

test('waits for a result with a bounded timeout', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'gemini-ide-wait-'));
  const adapter = createGeminiIdeAdapter({ directory, intervalMs: 5, timeoutMs: 100 });
  const task = { version: 1, runId: 'r', taskId: 't', clientScope: 'c', input: { prompt: 'x' } };
  setTimeout(() => fs.writeFileSync(path.join(directory, 't.task-result.json'), JSON.stringify({ ...task, status: 'passed', output: 'ok' })), 15);
  assert.deepEqual(await adapter.waitForResult(task), { output: 'ok', usage: {} });
  fs.rmSync(directory, { recursive: true, force: true });
});
