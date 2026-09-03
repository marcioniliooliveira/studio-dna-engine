'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { scheduleBlueprint } = require('../src/orchestration/dag-scheduler');

const blueprint = () => ({ version: 1, runId: 'run-1', clientScope: 'client-a', tasks: [
  { id: 'z', dependsOn: ['a'] }, { id: 'a', dependsOn: [] }, { id: 'b', dependsOn: [] }
] });

test('scheduler executes ready tasks in deterministic batches and passes dependency outputs', async () => {
  const calls = [];
  const result = await scheduleBlueprint(blueprint(), async (task, context) => {
    calls.push(task.id);
    return task.id === 'a' ? { value: 2 } : { deps: Object.keys(context.dependencies) };
  });
  assert.deepEqual(calls, ['a', 'b', 'z']);
  assert.deepEqual(result.outputs.z, { deps: ['a'] });
  assert.deepEqual(result.completed, ['a', 'b', 'z']);
});

test('scheduler stops dependent work after a task fails and reports the failure', async () => {
  const calls = [];
  await assert.rejects(scheduleBlueprint(blueprint(), async task => {
    calls.push(task.id);
    if (task.id === 'a') throw new Error('broken');
    return true;
  }), error => error.code === 'DAG_TASK_FAILED' && error.taskId === 'a');
  assert.deepEqual(calls, ['a', 'b']);
});

test('scheduler requires an independent verifier before releasing task output', async () => {
  const verified = [];
  await assert.rejects(scheduleBlueprint(blueprint(), async task => ({ id: task.id }), {
    verifyTask: async task => {
      verified.push(task.id);
      return task.id !== 'b';
    }
  }), error => error.code === 'DAG_VERIFICATION_FAILED' && error.taskId === 'b');
  assert.deepEqual(verified, ['a', 'b']);
});
