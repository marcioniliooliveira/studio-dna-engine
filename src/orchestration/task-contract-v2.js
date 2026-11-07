'use strict';

const fs = require('node:fs');
const net = require('node:net');
const path = require('node:path');
const { PolicyViolationError, assertIndependentVerifier } = require('./policy-enforcer');

const STYLE_A_TASK_KEYS = new Set([
  'schemaVersion', 'runId', 'clientScope', 'taskId', 'role', 'actorId', 'dependsOn',
  'mutatesWorkspace', 'readAllowlist', 'writeAllowlist', 'allowedTools', 'allowedGates',
  'networkPolicy', 'budget', 'inputs', 'requiredOutputs', 'requiredVerifierRole'
]);
const STYLE_B_REQUIRED_KEYS = new Set([
  'id', 'schemaVersion', 'role', 'actorId', 'clientScope', 'surfaceMode',
  'readAllowlist', 'writeAllowlist', 'allowedTools', 'allowedGates',
  'verificationCommand', 'maxRefinementAttempts'
]);
const STYLE_B_OPTIONAL_KEYS = new Set(['builderActorId', 'artisticWaivers']);
const STYLE_B_ALL_KEYS = new Set([...STYLE_B_REQUIRED_KEYS, ...STYLE_B_OPTIONAL_KEYS]);

const BUDGET_KEYS = new Set(['maxAttempts', 'timeoutMs', 'maxFilesChanged', 'maxAddedLines']);
const INPUT_KEYS = new Set(['path', 'sha256']);
const NETWORK_POLICY_KEYS = new Set(['mode', 'hosts']);

const STYLE_A_ROLES = new Set([
  'orchestrator', 'reference_researcher', 'content_analyst', 'art_direction_agent',
  'composition_agent', 'implementation_agent', 'visual_critic_agent', 'technical_verifier_agent'
]);
const STYLE_B_ROLES = new Set([
  'reference_curator', 'brand_analyst', 'content_analyst', 'composition_agent',
  'implementation_agent', 'technical_verifier_agent', 'visual_critic_agent', 'release_gatekeeper'
]);
const VERIFIER_ROLES = new Set(['technical_verifier_agent', 'visual_critic_agent']);
const SURFACE_MODES = new Set(['Persuade', 'Operate', 'Read', 'Experience']);
const WAIVER_ROLES = new Set(['composition_agent', 'human_art_director']);

const PLACEHOLDER = /tbd|todo/i;
const SHA256 = /^sha256:[0-9a-f]{64}$/;
const SPECIAL_HOST_ZONES = ['localhost', 'local', 'invalid', 'test', 'example', 'example.com', 'example.net', 'example.org', 'home.arpa', 'onion'];

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

function assertScopedPaths(values, location, workspaceRoot, clientScope, prefixes, { isWrite = false } = {}) {
  assertStringArray(values, location, { nonEmpty: !isWrite });
  for (const contractPath of values) {
    assertContractPath(contractPath, `${location} item`, workspaceRoot);

    // Cross-client check
    if (clientScope && clientScope !== 'global') {
      const clientMatch = contractPath.match(/^clientes\/([^/]+)/);
      if (clientMatch && clientMatch[1] !== clientScope) {
        throw new PolicyViolationError(
          `POLICY_CROSS_CLIENT_PATH: ${location} contains a path outside permitted clientScope "${clientScope}": "${contractPath}"`,
          'POLICY_CROSS_CLIENT_PATH'
        );
      }
    }

    // Read-only copias / design-vault check
    if (isWrite) {
      if (contractPath === 'copias' || contractPath.startsWith('copias/') || contractPath.startsWith('copias/**') || contractPath === 'design-vault' || contractPath.startsWith('design-vault/')) {
        throw new PolicyViolationError(
          `POLICY_READONLY_COPIAS: ${location} cannot target copias or design-vault: "${contractPath}"`,
          'POLICY_READONLY_COPIAS'
        );
      }
    }

    if (prefixes && !isWithinScope(contractPath, prefixes)) {
      throw new TypeError(`${location} contains a path outside its permitted scope`);
    }
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
  return !SPECIAL_HOST_ZONES.some(zone => host === zone || host.endsWith(`.${zone}`));
}

function deepFreeze(value, seen = new Set()) {
  if (value === null || typeof value !== 'object' || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) deepFreeze(value[key], seen);
  return Object.freeze(value);
}

function validateStyleAContract(input, root) {
  assertExactKeys(input, STYLE_A_TASK_KEYS, 'task contract');
  if (input.schemaVersion !== 2) throw new TypeError('schemaVersion must be 2');
  for (const key of ['runId', 'clientScope', 'taskId', 'actorId']) assertIdentifier(input[key], key);
  if (!STYLE_A_ROLES.has(input.role)) throw new TypeError('role is invalid');
  if (!VERIFIER_ROLES.has(input.requiredVerifierRole)) throw new TypeError('requiredVerifierRole is invalid');
  assertStringArray(input.dependsOn, 'dependsOn');
  if (typeof input.mutatesWorkspace !== 'boolean') throw new TypeError('mutatesWorkspace must be boolean');
  assertBudget(input.budget);
  assertNetworkPolicy(input.networkPolicy);

  const clientPrefix = `clientes/${input.clientScope}/`;
  const runPrefix = `runs/${input.runId}/`;
  assertScopedPaths(input.readAllowlist, 'readAllowlist', root, input.clientScope, [clientPrefix, runPrefix, 'copias/']);
  assertScopedPaths(input.writeAllowlist, 'writeAllowlist', root, input.clientScope, [clientPrefix, runPrefix], { isWrite: true });
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
    if (output.startsWith('copias/') || output === 'copias') {
      throw new PolicyViolationError(`POLICY_READONLY_COPIAS: requiredOutputs cannot target copias: "${output}"`, 'POLICY_READONLY_COPIAS');
    }
    if (!isWithinScope(output, [clientPrefix, runPrefix])) throw new TypeError(`requiredOutputs[${index}] is outside the write scope`);
    if (!isCovered(output, input.writeAllowlist)) throw new TypeError(`requiredOutputs[${index}] is not covered by writeAllowlist`);
  }
}

function validateStyleBContract(input, root) {
  for (const key of Reflect.ownKeys(input)) {
    if (typeof key !== 'string' || !STYLE_B_ALL_KEYS.has(key)) {
      throw new TypeError(`task contract contains unknown field: ${String(key)}`);
    }
  }
  for (const key of STYLE_B_REQUIRED_KEYS) {
    if (!Object.hasOwn(input, key)) {
      throw new TypeError(`task contract.${key} is required`);
    }
  }

  if (typeof input.id !== 'string' || !/^TASK-V3-[0-9]{2}(-[A-Z0-9]+)?$/.test(input.id)) {
    throw new TypeError('id must match pattern ^TASK-V3-[0-9]{2}(-[A-Z0-9]+)?$');
  }
  if (input.schemaVersion !== 2) throw new TypeError('schemaVersion must be 2');
  if (!STYLE_B_ROLES.has(input.role)) throw new TypeError(`role is invalid: ${input.role}`);
  assertIdentifier(input.actorId, 'actorId');
  if (input.actorId.length < 3) throw new TypeError('actorId must be at least 3 characters');

  if (input.builderActorId !== undefined) {
    assertIdentifier(input.builderActorId, 'builderActorId');
  }

  if (typeof input.clientScope !== 'string' || !/^(global|[a-z0-9-]+)$/.test(input.clientScope)) {
    throw new TypeError('clientScope must match pattern ^(global|[a-z0-9-]+)$');
  }

  if (typeof input.surfaceMode !== 'string' || !SURFACE_MODES.has(input.surfaceMode)) {
    throw new TypeError(`surfaceMode is invalid: ${input.surfaceMode}`);
  }

  const clientScope = input.clientScope;
  const prefixes = clientScope === 'global' ? null : [`clientes/${clientScope}/`, 'copias/'];
  assertScopedPaths(input.readAllowlist, 'readAllowlist', root, clientScope, prefixes);

  const writePrefixes = clientScope === 'global' ? null : [`clientes/${clientScope}/`];
  assertScopedPaths(input.writeAllowlist, 'writeAllowlist', root, clientScope, writePrefixes, { isWrite: true });

  assertStringArray(input.allowedTools, 'allowedTools');
  assertStringArray(input.allowedGates, 'allowedGates');

  if (typeof input.verificationCommand !== 'string' || input.verificationCommand.trim().length < 5) {
    throw new TypeError('verificationCommand must be a string with at least 5 characters');
  }

  if (!Number.isSafeInteger(input.maxRefinementAttempts) || input.maxRefinementAttempts < 1 || input.maxRefinementAttempts > 3) {
    throw new TypeError('maxRefinementAttempts must be an integer between 1 and 3');
  }

  if (input.artisticWaivers !== undefined) {
    if (!Array.isArray(input.artisticWaivers)) throw new TypeError('artisticWaivers must be an array');
    for (const [idx, waiver] of input.artisticWaivers.entries()) {
      const loc = `artisticWaivers[${idx}]`;
      if (!isPlainObject(waiver)) throw new TypeError(`${loc} must be a plain object`);
      const waiverKeys = new Set(['dataDs', 'ruleId', 'reason', 'approvedByRole']);
      assertExactKeys(waiver, waiverKeys, loc);
      if (typeof waiver.dataDs !== 'string' || !/^[a-f0-9]{8}$/.test(waiver.dataDs)) {
        throw new TypeError(`${loc}.dataDs must be an 8-character hex string`);
      }
      assertIdentifier(waiver.ruleId, `${loc}.ruleId`);
      if (typeof waiver.reason !== 'string' || waiver.reason.trim().length < 10) {
        throw new TypeError(`${loc}.reason must be at least 10 characters`);
      }
      if (!WAIVER_ROLES.has(waiver.approvedByRole)) {
        throw new TypeError(`${loc}.approvedByRole must be composition_agent or human_art_director`);
      }
    }
  }

  // Verifier segregation check
  if (['technical_verifier_agent', 'visual_critic_agent'].includes(input.role)) {
    assertIndependentVerifier(input);
  }
}

function validateTaskContractV2(input, workspaceRoot = process.cwd()) {
  const root = assertWorkspaceRoot(workspaceRoot);
  assertJsonSafe(input, 'task contract');
  if (!isPlainObject(input)) throw new TypeError('task contract must be a plain JSON object');

  const isStyleB = input.id !== undefined || input.surfaceMode !== undefined || input.verificationCommand !== undefined;

  if (isStyleB) {
    validateStyleBContract(input, root);
  } else {
    validateStyleAContract(input, root);
  }

  return deepFreeze(JSON.parse(JSON.stringify(input)));
}

module.exports = { validateTaskContractV2, PolicyViolationError };
