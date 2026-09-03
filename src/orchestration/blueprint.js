'use strict';

const { validateTaskContractV2 } = require('./task-contract-v2');

const BLUEPRINT_KEYS = new Set(['version', 'runId', 'clientScope', 'tasks', 'budget', 'allowedTools', 'allowedGates']);
const TASK_KEYS = new Set(['id', 'dependsOn', 'budget', 'allowedTools', 'allowedGates', 'input']);
const BUDGET_KEYS = new Set(['maxRetries']);

function isPlainObject(value) {
  if (value === null || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function assertJsonSafe(value, path, seen = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new TypeError(`${path} must contain JSON-safe values`);
    return;
  }
  if (typeof value !== 'object') throw new TypeError(`${path} must contain JSON-safe values`);
  if (seen.has(value)) throw new TypeError(`${path} contains a cycle`);
  seen.add(value);
  if (Array.isArray(value)) {
    for (const key of Reflect.ownKeys(value)) {
      if (key !== 'length' && (typeof key !== 'string' || !/^\d+$/.test(key))) {
        throw new TypeError(`${path} must contain JSON-safe values`);
      }
    }
    value.forEach((v, i) => assertJsonSafe(v, `${path}[${i}]`, seen));
  }
  else {
    if (!isPlainObject(value)) throw new TypeError(`${path} must be a plain JSON object`);
    for (const key of Reflect.ownKeys(value)) {
      if (typeof key !== 'string') throw new TypeError(`${path} must contain JSON-safe values`);
      assertJsonSafe(value[key], `${path}.${key}`, seen);
    }
  }
  seen.delete(value);
}

function assertKeys(object, allowed, path) {
  for (const key of Reflect.ownKeys(object)) {
    if (typeof key !== 'string') throw new TypeError(`${path} contains an unsafe key`);
    if (!allowed.has(key)) throw new TypeError(`${path} contains unknown field: ${key}`);
  }
}

function assertString(value, path) {
  if (typeof value !== 'string' || value.trim() === '') throw new TypeError(`${path} must be a non-empty string`);
}

function assertStringArray(value, path) {
  if (!Array.isArray(value)) throw new TypeError(`${path} must be an array`);
  const seen = new Set();
  for (const item of value) {
    assertString(item, `${path} item`);
    if (seen.has(item)) throw new TypeError(`${path} must contain unique strings`);
    seen.add(item);
  }
}

function validateBudget(value, path) {
  if (value === undefined) return;
  if (!isPlainObject(value)) throw new TypeError(`${path} must be a plain object`);
  assertKeys(value, BUDGET_KEYS, path);
  if (value.maxRetries !== undefined && (!Number.isSafeInteger(value.maxRetries) || value.maxRetries < 0)) {
    throw new TypeError(`${path}.maxRetries must be a non-negative safe integer`);
  }
}

function validateBlueprint(input) {
  assertJsonSafe(input, 'blueprint');
  if (!isPlainObject(input)) throw new TypeError('blueprint must be a plain JSON object');
  assertKeys(input, BLUEPRINT_KEYS, 'blueprint');
  if (input.version !== 1) throw new TypeError('blueprint.version must be 1');
  assertString(input.runId, 'blueprint.runId');
  assertString(input.clientScope, 'blueprint.clientScope');
  if (!Array.isArray(input.tasks) || input.tasks.length === 0) throw new TypeError('blueprint.tasks must be a non-empty array');
  validateBudget(input.budget, 'blueprint.budget');
  if (input.allowedTools !== undefined) assertStringArray(input.allowedTools, 'blueprint.allowedTools');
  if (input.allowedGates !== undefined) assertStringArray(input.allowedGates, 'blueprint.allowedGates');

  const ids = new Set();
  for (const [index, task] of input.tasks.entries()) {
    const path = `blueprint.tasks[${index}]`;
    if (!isPlainObject(task)) throw new TypeError(`${path} must be a plain object`);
    assertKeys(task, TASK_KEYS, path);
    assertString(task.id, `${path}.id`);
    if (ids.has(task.id)) throw new TypeError(`task ids must be unique: ${task.id}`);
    ids.add(task.id);
    if (task.dependsOn !== undefined) assertStringArray(task.dependsOn, `${path}.dependsOn`);
    validateBudget(task.budget, `${path}.budget`);
    if (task.allowedTools !== undefined) assertStringArray(task.allowedTools, `${path}.allowedTools`);
    if (task.allowedGates !== undefined) assertStringArray(task.allowedGates, `${path}.allowedGates`);
    if (task.input !== undefined) assertJsonSafe(task.input, `${path}.input`);
  }
  for (const task of input.tasks) {
    for (const dependency of task.dependsOn || []) {
      if (!ids.has(dependency)) throw new TypeError(`task ${task.id} depends on unknown task: ${dependency}`);
    }
  }
  const state = new Map();
  const byId = new Map(input.tasks.map(task => [task.id, task]));
  function visit(id) {
    if (state.get(id) === 1) throw new TypeError(`task dependency graph contains a cycle at: ${id}`);
    if (state.get(id) === 2) return;
    state.set(id, 1);
    for (const dep of byId.get(id).dependsOn || []) visit(dep);
    state.set(id, 2);
  }
  for (const id of ids) visit(id);
  return JSON.parse(JSON.stringify(input));
}

module.exports = { validateBlueprint, validateTaskContractV2 };
