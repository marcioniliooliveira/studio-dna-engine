'use strict';

const fs = require('node:fs');
const net = require('node:net');
const path = require('node:path');

const TASK_KEYS = new Set([
  'schemaVersion', 'runId', 'clientScope', 'taskId', 'role', 'actorId', 'dependsOn',
  'mutatesWorkspace', 'readAllowlist', 'writeAllowlist', 'allowedTools', 'allowedGates',
  'networkPolicy', 'budget', 'inputs', 'requiredOutputs', 'requiredVerifierRole'
]);
const BUDGET_KEYS = new Set(['maxAttempts', 'timeoutMs', 'maxFilesChanged', 'maxAddedLines']);
const INPUT_KEYS = new Set(['path', 'sha256']);
const NETWORK_POLICY_KEYS = new Set(['mode', 'hosts']);
const ROLES = new Set([
  'orchestrator', 'reference_researcher', 'content_analyst', 'art_direction_agent',
  'composition_agent', 'implementation_agent', 'visual_critic_agent', 'technical_verifier_agent'
]);
const VERIFIER_ROLES = new Set(['technical_verifier_agent', 'visual_critic_agent']);
const PLACEHOLDER = /tbd|todo/i;
const SHA256 = /^sha256:[0-9a-f]{64}$/;
const SPECIAL_HOST_SUFFIXES = ['.localhost', '.local', '.test', '.example', '.example.com', '.invalid', '.onion', '.home.arpa'];

function isPlainObject(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function assertJsonSafe(value, location, seen = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new TypeError(`${location} must contain JSON-safe values`);
    return;
  }
  if (typeof value !== 'object') throw new TypeError(`${location} must contain JSON-safe values`);
  if (seen.has(value)) throw new TypeError(`${location} contains a cycle`);
  if (!Array.isArray(value) && !isPlainObject(value)) throw new TypeError(`${location} must contain plain JSON objects`);

  seen.add(value);
  const keys = Reflect.ownKeys(value);
  for (const key of keys) {
    if (typeof key !== 'string') throw new TypeError(`${location} must contain JSON-safe values`);
    if (Array.isArray(value) && key === 'length') continue;
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || !descriptor.enumerable || !Object.hasOwn(descriptor, 'value')) {
      throw new TypeError(`${location} must contain JSON-safe values`);
    }
    if (Array.isArray(value) && (!/^(0|[1-9]\d*)$/.test(key) || Number(key) >= value.length)) {
      throw new TypeError(`${location} must contain JSON-safe values`);
    }
    assertJsonSafe(descriptor.value, `${location}.${key}`, seen);
  }
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      if (!Object.hasOwn(value, index)) throw new TypeError(`${location} must contain JSON-safe values`);
    }
  }
  seen.delete(value);
}

function assertExactKeys(object, allowed, location) {
  for (const key of Reflect.ownKeys(object)) {
    if (typeof key !== 'string' || !allowed.has(key)) throw new TypeError(`${location} contains unknown field: ${String(key)}`);
  }
  for (const key of allowed) {
    if (!Object.hasOwn(object, key)) throw new TypeError(`${location}.${key} is required`);
  }
}

function assertIdentifier(value, location) {
  if (typeof value !== 'string' || value.trim() === '' || PLACEHOLDER.test(value)) {
    throw new TypeError(`${location} must be a non-empty string without placeholders`);
  }
}

function assertStringArray(value, location, { nonEmpty = false } = {}) {
  if (!Array.isArray(value) || (nonEmpty && value.length === 0)) {
    throw new TypeError(`${location} must be a${nonEmpty ? ' non-empty' : 'n'} array`);
  }
  const seen = new Set();
  for (const item of value) {
    assertIdentifier(item, `${location} item`);
    if (seen.has(item)) throw new TypeError(`${location} must contain unique strings`);
    seen.add(item);
  }
}

function assertWorkspaceRoot(workspaceRoot) {
  if (typeof workspaceRoot !== 'string' || !path.isAbsolute(workspaceRoot)) {
    throw new TypeError('workspaceRoot must be an absolute existing directory');
  }
  let stats;
  try {
    stats = fs.statSync(workspaceRoot);
  } catch {
    throw new TypeError('workspaceRoot must be an absolute existing directory');
  }
  if (!stats.isDirectory()) throw new TypeError('workspaceRoot must be an absolute existing directory');
  return path.resolve(workspaceRoot);
}

function assertContractPath(value, location, workspaceRoot) {
  if (typeof value !== 'string' || value.trim() === '') throw new TypeError(`${location} must be a non-empty relative path`);
  if (value.includes('\\') || path.isAbsolute(value) || /^[A-Za-z]:/.test(value)) {
    throw new TypeError(`${location} must be a relative slash-delimited path`);
  }
  const segments = value.split('/');
  if (segments.some(segment => segment === '' || segment === '.' || segment === '..' || segment.includes('<') || segment.includes('>') || PLACEHOLDER.test(segment))) {
    throw new TypeError(`${location} contains an invalid path segment`);
  }
  const globIndex = segments.indexOf('**');
  if ((globIndex !== -1 && (globIndex !== segments.length - 1 || globIndex === 0)) || segments.some(segment => segment !== '**' && /[*?\[\]{}]/.test(segment))) {
    throw new TypeError(`${location} permits only a terminal /** glob`);
  }
  if (globIndex === -1) {
    const resolved = path.resolve(workspaceRoot, ...segments);
    const relative = path.relative(workspaceRoot, resolved);
    if (relative === '' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
      throw new TypeError(`${location} escapes workspaceRoot`);
    }
  }
  return value;
}

function isWithinScope(contractPath, prefixes) {
  return prefixes.some(prefix => contractPath.startsWith(prefix));
}

function assertScopedPaths(values, location, workspaceRoot, prefixes) {
  assertStringArray(values, location, { nonEmpty: true });
  for (const contractPath of values) {
    assertContractPath(contractPath, `${location} item`, workspaceRoot);
    if (!isWithinScope(contractPath, prefixes)) throw new TypeError(`${location} contains a path outside its permitted scope`);
  }
}

function isCovered(target, allowlist) {
  return allowlist.some(allowed => {
    if (allowed === target) return true;
    return allowed.endsWith('/**') && target.startsWith(allowed.slice(0, -2));
  });
}

function assertBudget(budget) {
  if (!isPlainObject(budget)) throw new TypeError('budget must be a plain object');
  assertExactKeys(budget, BUDGET_KEYS, 'budget');
  for (const key of BUDGET_KEYS) {
    if (!Number.isSafeInteger(budget[key]) || budget[key] <= 0) {
      throw new TypeError(`budget.${key} must be a positive safe integer`);
    }
  }
  if (budget.maxAttempts > 3) throw new TypeError('budget.maxAttempts must be between 1 and 3');
}

function assertNetworkPolicy(policy) {
  if (policy === 'deny') return;
  if (!isPlainObject(policy)) throw new TypeError('networkPolicy must be deny or an allowlist object');
  assertExactKeys(policy, NETWORK_POLICY_KEYS, 'networkPolicy');
  if (policy.mode !== 'allowlist') throw new TypeError('networkPolicy.mode must be allowlist');
  if (!Array.isArray(policy.hosts) || policy.hosts.length === 0) throw new TypeError('networkPolicy.hosts must be a non-empty array');
  const seen = new Set();
  for (const host of policy.hosts) {
    if (!isPublicDnsHostname(host) || seen.has(host)) throw new TypeError('networkPolicy.hosts must contain unique public lowercase DNS hostnames');
    seen.add(host);
  }
}

function isPublicDnsHostname(host) {
  if (typeof host !== 'string' || host.length === 0 || host.length > 253 || net.isIP(host) !== 0) return false;
  if (!/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/.test(host)) return false;
  return host !== 'localhost' && !SPECIAL_HOST_SUFFIXES.some(suffix => host.endsWith(suffix));
}

function deepFreeze(value, seen = new Set()) {
  if (value === null || typeof value !== 'object' || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) deepFreeze(value[key], seen);
  return Object.freeze(value);
}

function validateTaskContractV2(input, workspaceRoot) {
  const root = assertWorkspaceRoot(workspaceRoot);
  assertJsonSafe(input, 'task contract');
  if (!isPlainObject(input)) throw new TypeError('task contract must be a plain JSON object');
  assertExactKeys(input, TASK_KEYS, 'task contract');
  if (input.schemaVersion !== 2) throw new TypeError('schemaVersion must be 2');
  for (const key of ['runId', 'clientScope', 'taskId', 'actorId']) assertIdentifier(input[key], key);
  if (!ROLES.has(input.role)) throw new TypeError('role is invalid');
  if (!VERIFIER_ROLES.has(input.requiredVerifierRole)) throw new TypeError('requiredVerifierRole is invalid');
  assertStringArray(input.dependsOn, 'dependsOn');
  if (typeof input.mutatesWorkspace !== 'boolean') throw new TypeError('mutatesWorkspace must be boolean');
  assertBudget(input.budget);
  assertNetworkPolicy(input.networkPolicy);

  const clientPrefix = `clientes/${input.clientScope}/`;
  const runPrefix = `runs/${input.runId}/`;
  assertScopedPaths(input.readAllowlist, 'readAllowlist', root, [clientPrefix, runPrefix, 'copias/']);
  assertScopedPaths(input.writeAllowlist, 'writeAllowlist', root, [clientPrefix, runPrefix]);
  assertStringArray(input.allowedTools, 'allowedTools', { nonEmpty: true });
  assertStringArray(input.allowedGates, 'allowedGates', { nonEmpty: true });
  assertStringArray(input.requiredOutputs, 'requiredOutputs', { nonEmpty: true });

  if (!Array.isArray(input.inputs)) throw new TypeError('inputs must be an array');
  for (const [index, record] of input.inputs.entries()) {
    const location = `inputs[${index}]`;
    if (!isPlainObject(record)) throw new TypeError(`${location} must be a plain object`);
    assertExactKeys(record, INPUT_KEYS, location);
    assertContractPath(record.path, `${location}.path`, root);
    if (!isWithinScope(record.path, [clientPrefix, runPrefix, 'copias/'])) throw new TypeError(`${location}.path is outside the read scope`);
    if (!SHA256.test(record.sha256)) throw new TypeError(`${location}.sha256 must be a lowercase SHA-256 digest`);
    if (!isCovered(record.path, input.readAllowlist)) throw new TypeError(`${location}.path is not covered by readAllowlist`);
  }
  for (const [index, output] of input.requiredOutputs.entries()) {
    assertContractPath(output, `requiredOutputs[${index}]`, root);
    if (!isWithinScope(output, [clientPrefix, runPrefix])) throw new TypeError(`requiredOutputs[${index}] is outside the write scope`);
    if (!isCovered(output, input.writeAllowlist)) throw new TypeError(`requiredOutputs[${index}] is not covered by writeAllowlist`);
  }

  return deepFreeze(JSON.parse(JSON.stringify(input)));
}

module.exports = { validateTaskContractV2 };
