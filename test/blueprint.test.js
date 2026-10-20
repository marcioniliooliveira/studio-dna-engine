'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { validateBlueprint } = require('../src/orchestration/blueprint');

const valid = () => ({
  version: 1,
  runId: 'run-1',
  clientScope: 'client-a',
  budget: { maxRetries: 2 },
  allowedTools: ['read-file'],
  allowedGates: ['quality'],
  tasks: [
    { id: 'extract', dependsOn: [], allowedTools: ['read-file'], allowedGates: ['quality'] },
    { id: 'build', dependsOn: ['extract'], allowedTools: [], allowedGates: [] }
  ]
});

test('accepts a version 1 acyclic blueprint and returns a defensive copy', () => {
  const source = valid();
  const result = validateBlueprint(source);
  assert.deepEqual(result, source);
  assert.notStrictEqual(result, source);
  result.tasks[0].id = 'mutated';
  assert.equal(source.tasks[0].id, 'extract');
});

test('rejects missing identity, scope, version and tasks', () => {
  for (const field of ['version', 'runId', 'clientScope', 'tasks']) {
    const blueprint = valid();
    delete blueprint[field];
    assert.throws(() => validateBlueprint(blueprint), new RegExp(field));
  }
  assert.throws(() => validateBlueprint({ ...valid(), version: 2 }), /version/);
});

test('rejects duplicate, unknown and unsafe values', () => {
  assert.throws(() => validateBlueprint({ ...valid(), tasks: [{ id: 'x' }, { id: 'x' }] }), /unique|duplicate/i);
  assert.throws(() => validateBlueprint({ ...valid(), unexpected: true }), /unknown|unexpected/i);
  assert.throws(() => validateBlueprint({ ...valid(), runId: '' }), /runId/);
  assert.throws(() => validateBlueprint({ ...valid(), allowedTools: 'read-file' }), /allowedTools/);
  assert.throws(() => validateBlueprint({ ...valid(), budget: { maxRetries: -1 } }), /maxRetries/);
  assert.throws(() => validateBlueprint({ ...valid(), budget: { maxRetries: 1.2 } }), /maxRetries/);
  assert.throws(() => validateBlueprint({ ...valid(), metadata: undefined }), /unknown|metadata/i);
});

test('rejects missing dependencies and cyclic dependencies', () => {
  assert.throws(() => validateBlueprint({ ...valid(), tasks: [{ id: 'a', dependsOn: ['missing'] }] }), /depend/i);
  assert.throws(() => validateBlueprint({
    ...valid(),
    tasks: [{ id: 'a', dependsOn: ['b'] }, { id: 'b', dependsOn: ['a'] }]
  }), /cycl/i);
});

test('rejects non-plain objects and invalid task fields', () => {
  assert.throws(() => validateBlueprint(new Date()), /plain|object/i);
  assert.throws(() => validateBlueprint({ ...valid(), tasks: [{ id: 'x', dependsOn: 'a' }] }), /dependsOn/);
  assert.throws(() => validateBlueprint({ ...valid(), tasks: [{ id: 'x', allowedGates: [1] }] }), /allowedGates/);
  const cyclic = valid();
  cyclic.self = cyclic;
  assert.throws(() => validateBlueprint(cyclic), /unknown|JSON|cycle/i);
  const symbolic = valid();
  symbolic[Symbol('unsafe')] = true;
  assert.throws(() => validateBlueprint(symbolic), /unsafe|JSON/i);
});
