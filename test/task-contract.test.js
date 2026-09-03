'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { validateTaskPackage, validateTaskResult } = require('../src/orchestration/task-contract');

test('validates and clones a scoped task package', () => {
  const source = { version: 1, runId: 'r', taskId: 't', clientScope: 'client-a', input: { prompt: 'fix' } };
  const result = validateTaskPackage(source); result.input.prompt = 'changed';
  assert.equal(source.input.prompt, 'fix');
});
test('rejects task packages without scope or plain input', () => {
  assert.throws(() => validateTaskPackage({ version: 1, runId: 'r', taskId: 't', input: {} }), /clientScope/);
  assert.throws(() => validateTaskPackage({ version: 1, runId: 'r', taskId: 't', clientScope: 'c', input: [] }), /input/);
});
test('validates passed and failed task results', () => {
  assert.equal(validateTaskResult({ version: 1, runId: 'r', taskId: 't', clientScope: 'c', status: 'passed', output: {} }).status, 'passed');
  assert.throws(() => validateTaskResult({ version: 1, runId: 'r', taskId: 't', clientScope: 'c', status: 'passed' }), /output/);
  assert.throws(() => validateTaskResult({ version: 1, runId: 'r', taskId: 't', clientScope: 'c', status: 'running' }), /status/);
});
