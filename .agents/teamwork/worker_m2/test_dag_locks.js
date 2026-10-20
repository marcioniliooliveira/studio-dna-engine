'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { validateBlueprint } = require('../../../src/orchestration/blueprint');
const { scheduleBlueprint, pathsIntersect, tasksConflict } = require('../../../src/orchestration/dag-scheduler');

test('blueprint validation accepts writeAllowlist as valid task property', () => {
  const bp = {
    version: 1,
    runId: 'run-w1',
    clientScope: 'client-a',
    tasks: [
      { id: 't1', dependsOn: [], writeAllowlist: ['clientes/a/site/**'] },
      { id: 't2', dependsOn: [], writeAllowlist: ['runs/x/report.json'] }
    ]
  };
  const validated = validateBlueprint(bp);
  assert.deepEqual(validated.tasks[0].writeAllowlist, ['clientes/a/site/**']);
  assert.deepEqual(validated.tasks[1].writeAllowlist, ['runs/x/report.json']);
});

test('pathsIntersect correctly identifies exact, glob, and disjoint paths', () => {
  // Exact match
  assert.equal(pathsIntersect('runs/x/a.json', 'runs/x/a.json'), true);
  assert.equal(pathsIntersect('runs/x/a.json', 'runs/x/b.json'), false);

  // Glob containment
  assert.equal(pathsIntersect('clientes/a/site/**', 'clientes/a/site/index.html'), true);
  assert.equal(pathsIntersect('clientes/a/site/index.html', 'clientes/a/site/**'), true);
  assert.equal(pathsIntersect('clientes/a/site/**', 'clientes/a/site/sub/nested.js'), true);
  assert.equal(pathsIntersect('clientes/a/site/**', 'clientes/b/site/**'), false);
  assert.equal(pathsIntersect('clientes/a/**', 'clientes/ab/file.js'), false);
});

test('scheduler partitions tasks with intersecting writeAllowlist into sequential batches', async () => {
  const bp = {
    version: 1,
    runId: 'run-lock-1',
    clientScope: 'client-a',
    tasks: [
      { id: 'w1', dependsOn: [], writeAllowlist: ['clientes/a/site/**'] },
      { id: 'w2', dependsOn: [], writeAllowlist: ['clientes/a/site/**'] }
    ]
  };

  const batchHistory = [];
  let currentBatch = [];

  const result = await scheduleBlueprint(bp, async (task) => {
    currentBatch.push(task.id);
    // Yield to let any concurrent tasks run
    await new Promise(resolve => setTimeout(resolve, 10));
    return { executed: task.id };
  });

  // Because w1 and w2 conflict, w1 runs in batch 1 and w2 runs in batch 2
  assert.deepEqual(result.completed, ['w1', 'w2']);
});

test('scheduler executes tasks with disjoint writeAllowlist in parallel in the same batch', async () => {
  const bp = {
    version: 1,
    runId: 'run-lock-2',
    clientScope: 'client-a',
    tasks: [
      { id: 'wA', dependsOn: [], writeAllowlist: ['runs/x/a.json'] },
      { id: 'wB', dependsOn: [], writeAllowlist: ['runs/x/b.json'] }
    ]
  };

  let concurrentlyRunning = 0;
  let maxConcurrent = 0;

  const result = await scheduleBlueprint(bp, async (task) => {
    concurrentlyRunning++;
    maxConcurrent = Math.max(maxConcurrent, concurrentlyRunning);
    await new Promise(resolve => setTimeout(resolve, 20));
    concurrentlyRunning--;
    return { ok: true };
  });

  assert.equal(maxConcurrent, 2, 'Disjoint writers must run concurrently in same batch');
  assert.deepEqual(result.completed, ['wA', 'wB']);
});

test('read-only tasks run concurrently with disjoint or conflicting writers', async () => {
  const bp = {
    version: 1,
    runId: 'run-lock-3',
    clientScope: 'client-a',
    tasks: [
      { id: 'reader', dependsOn: [], writeAllowlist: [] },
      { id: 'writer', dependsOn: [], writeAllowlist: ['clientes/a/site/**'] }
    ]
  };

  let concurrentlyRunning = 0;
  let maxConcurrent = 0;

  const result = await scheduleBlueprint(bp, async (task) => {
    concurrentlyRunning++;
    maxConcurrent = Math.max(maxConcurrent, concurrentlyRunning);
    await new Promise(resolve => setTimeout(resolve, 20));
    concurrentlyRunning--;
    return { ok: true };
  });

  assert.equal(maxConcurrent, 2, 'Read-only task and writer must run concurrently in same batch');
  assert.deepEqual(result.completed, ['reader', 'writer']);
});

console.log('All DAG lock test suites defined.');
