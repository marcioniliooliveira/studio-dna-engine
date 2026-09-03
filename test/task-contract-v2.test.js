'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { validateTaskContractV2 } = require('../src/orchestration/task-contract-v2');

const workspaceRoot = path.resolve(__dirname, '..');
const hash = 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

function valid() {
  return {
    schemaVersion: 2,
    runId: 'run-1',
    clientScope: 'client-a',
    taskId: 'compose-homepage',
    role: 'composition_agent',
    actorId: 'agent-1',
    dependsOn: ['research-1'],
    mutatesWorkspace: true,
    readAllowlist: ['clientes/client-a/content/**', 'runs/run-1/brief.json', 'copias/**'],
    writeAllowlist: ['clientes/client-a/output/**', 'runs/run-1/artifacts/**'],
    allowedTools: ['read-file', 'write-file'],
    allowedGates: ['quality'],
    networkPolicy: 'deny',
    budget: { maxAttempts: 2, timeoutMs: 30_000, maxFilesChanged: 4, maxAddedLines: 300 },
    inputs: [{ path: 'clientes/client-a/content/brief.json', sha256: hash }],
    requiredOutputs: ['clientes/client-a/output/page.html'],
    requiredVerifierRole: 'technical_verifier_agent'
  };
}

test('accepts a complete scoped contract and returns a deeply frozen defensive JSON copy', () => {
  const source = valid();
  const result = validateTaskContractV2(source, workspaceRoot);

  assert.deepEqual(result, source);
  assert.notStrictEqual(result, source);
  assert.notStrictEqual(result.budget, source.budget);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.budget), true);
  assert.equal(Object.isFrozen(result.inputs), true);
  assert.equal(Object.isFrozen(result.inputs[0]), true);
  assert.throws(() => { result.budget.maxAttempts = 3; }, TypeError);
  assert.throws(() => { result.inputs.push({ path: 'copias/x', sha256: hash }); }, TypeError);
  assert.equal(source.budget.maxAttempts, 2);
});

test('accepts every assigned task role and every permitted read scope', () => {
  const roles = [
    'orchestrator',
    'reference_researcher',
    'content_analyst',
    'art_direction_agent',
    'composition_agent',
    'implementation_agent',
    'visual_critic_agent',
    'technical_verifier_agent'
  ];
  for (const role of roles) {
    const contract = valid();
    contract.role = role;
    contract.inputs = [
      { path: 'clientes/client-a/content/brief.json', sha256: hash },
      { path: 'runs/run-1/brief.json', sha256: hash },
      { path: 'copias/reference.html', sha256: hash }
    ];
    assert.equal(validateTaskContractV2(contract, workspaceRoot).role, role);
  }
});

test('accepts run-scoped outputs and a hostname allowlist', () => {
  const contract = valid();
  contract.requiredOutputs = ['runs/run-1/artifacts/manifest.json'];
  contract.networkPolicy = { mode: 'allowlist', hosts: ['api.openai.com', 'cdn.cloudflare.com'] };

  assert.deepEqual(validateTaskContractV2(contract, workspaceRoot).networkPolicy, contract.networkPolicy);
});

test('rejects missing required fields and unknown fields', () => {
  for (const field of ['schemaVersion', 'runId', 'clientScope', 'budget', 'inputs', 'requiredOutputs']) {
    const contract = valid();
    delete contract[field];
    assert.throws(() => validateTaskContractV2(contract, workspaceRoot), new RegExp(field));
  }
  assert.throws(() => validateTaskContractV2({ ...valid(), unexpected: true }, workspaceRoot), /unknown|unexpected/i);
});

test('rejects unsupported schema values, roles, verifier roles, and invalid workspace roots', () => {
  assert.throws(() => validateTaskContractV2({ ...valid(), schemaVersion: 1 }, workspaceRoot), /schemaVersion/);
  assert.throws(() => validateTaskContractV2({ ...valid(), role: 'builder' }, workspaceRoot), /role/);
  assert.throws(() => validateTaskContractV2({ ...valid(), requiredVerifierRole: 'builder' }, workspaceRoot), /requiredVerifierRole/);
  assert.throws(() => validateTaskContractV2(valid(), 'relative-root'), /workspaceRoot/);
  assert.throws(() => validateTaskContractV2(valid(), path.join(workspaceRoot, 'does-not-exist')), /workspaceRoot/);
});

test('rejects empty and placeholder identifiers, tools, gates, and duplicate arrays', () => {
  for (const field of ['runId', 'clientScope', 'taskId', 'actorId']) {
    assert.throws(() => validateTaskContractV2({ ...valid(), [field]: 'TODO' }, workspaceRoot), new RegExp(field));
  }
  assert.throws(() => validateTaskContractV2({ ...valid(), allowedTools: [] }, workspaceRoot), /allowedTools/);
  assert.throws(() => validateTaskContractV2({ ...valid(), allowedGates: [] }, workspaceRoot), /allowedGates/);
  assert.throws(() => validateTaskContractV2({ ...valid(), requiredOutputs: [] }, workspaceRoot), /requiredOutputs/);
  assert.throws(() => validateTaskContractV2({ ...valid(), dependsOn: ['a', 'a'] }, workspaceRoot), /dependsOn/);
  assert.throws(() => validateTaskContractV2({ ...valid(), allowedTools: ['read-file', 'read-file'] }, workspaceRoot), /allowedTools/);
  assert.throws(() => validateTaskContractV2({ ...valid(), allowedGates: ['quality', 'quality'] }, workspaceRoot), /allowedGates/);
  assert.throws(() => validateTaskContractV2({ ...valid(), taskId: '' }, workspaceRoot), /taskId/);
});

test('rejects empty and duplicate path allowlists and required outputs', () => {
  assert.throws(() => validateTaskContractV2({ ...valid(), readAllowlist: [] }, workspaceRoot), /readAllowlist/);
  assert.throws(() => validateTaskContractV2({ ...valid(), writeAllowlist: [] }, workspaceRoot), /writeAllowlist/);
  assert.throws(() => validateTaskContractV2({ ...valid(), readAllowlist: ['copias/**', 'copias/**'] }, workspaceRoot), /readAllowlist/);
  assert.throws(() => validateTaskContractV2({ ...valid(), writeAllowlist: ['clientes/client-a/output/**', 'clientes/client-a/output/**'] }, workspaceRoot), /writeAllowlist/);
  assert.throws(() => validateTaskContractV2({ ...valid(), requiredOutputs: ['clientes/client-a/output/page.html', 'clientes/client-a/output/page.html'] }, workspaceRoot), /requiredOutputs/);
});

test('rejects invalid mutation flags and strict budget shapes', () => {
  assert.throws(() => validateTaskContractV2({ ...valid(), mutatesWorkspace: 'yes' }, workspaceRoot), /mutatesWorkspace/);
  assert.throws(() => validateTaskContractV2({ ...valid(), budget: { ...valid().budget, maxAttempts: 4 } }, workspaceRoot), /maxAttempts/);
  assert.throws(() => validateTaskContractV2({ ...valid(), budget: { ...valid().budget, timeoutMs: 0 } }, workspaceRoot), /timeoutMs/);
  assert.throws(() => validateTaskContractV2({ ...valid(), budget: { ...valid().budget, maxFilesChanged: 1.5 } }, workspaceRoot), /maxFilesChanged/);
  assert.throws(() => validateTaskContractV2({ ...valid(), budget: { ...valid().budget, maxAddedLines: Number.MAX_SAFE_INTEGER + 1 } }, workspaceRoot), /maxAddedLines/);
  assert.throws(() => validateTaskContractV2({ ...valid(), budget: { ...valid().budget, extra: true } }, workspaceRoot), /unknown|extra/i);
});

test('rejects invalid input records and hashes', () => {
  const missingHash = valid();
  missingHash.inputs = [{ path: 'clientes/client-a/content/brief.json' }];
  assert.throws(() => validateTaskContractV2(missingHash, workspaceRoot), /sha256/);
  const extraField = valid();
  extraField.inputs = [{ path: 'clientes/client-a/content/brief.json', sha256: hash, extra: true }];
  assert.throws(() => validateTaskContractV2(extraField, workspaceRoot), /unknown|extra/i);
  const uppercaseHash = valid();
  uppercaseHash.inputs = [{ path: 'clientes/client-a/content/brief.json', sha256: `sha256:${'A'.repeat(64)}` }];
  assert.throws(() => validateTaskContractV2(uppercaseHash, workspaceRoot), /sha256/);
});

test('rejects absolute, escaping, malformed, placeholder, and unauthorized paths', () => {
  const cases = [
    '/clientes/client-a/content/brief.json',
    'C:/clientes/client-a/content/brief.json',
    'clientes/client-a/../client-b/brief.json',
    'clientes//client-a/content/brief.json',
    'clientes/client-a/./content/brief.json',
    'clientes\\client-a\\content\\brief.json',
    'clientes/client-a/content/*.json',
    'clientes/client-a/content/**/brief.json',
    'clientes/client-a/content/TBD.json'
  ];
  for (const value of cases) {
    const contract = valid();
    contract.readAllowlist = [value];
    assert.throws(() => validateTaskContractV2(contract, workspaceRoot), /path|allowlist|read/i, value);
  }
  const unauthorizedRead = valid();
  unauthorizedRead.readAllowlist = ['clientes/client-b/content/**'];
  assert.throws(() => validateTaskContractV2(unauthorizedRead, workspaceRoot), /readAllowlist/);
});

test('rejects writes outside the client or run scope and treats copias as read-only', () => {
  for (const output of ['clientes/client-b/output/page.html', 'copias/derived/page.html', 'elsewhere/page.html']) {
    const contract = valid();
    contract.requiredOutputs = [output];
    contract.writeAllowlist = [output];
    assert.throws(() => validateTaskContractV2(contract, workspaceRoot), /writeAllowlist|requiredOutputs|path/i, output);
  }
});

test('requires inputs and required outputs to be covered by their allowlists', () => {
  const uncoveredInput = valid();
  uncoveredInput.readAllowlist = ['clientes/client-a/content/other.json'];
  assert.throws(() => validateTaskContractV2(uncoveredInput, workspaceRoot), /input|readAllowlist|cover/i);

  const uncoveredOutput = valid();
  uncoveredOutput.writeAllowlist = ['clientes/client-a/output/other.html'];
  assert.throws(() => validateTaskContractV2(uncoveredOutput, workspaceRoot), /requiredOutputs|writeAllowlist|cover/i);
});

test('rejects unsafe JSON values, non-plain objects, and cycles', () => {
  assert.throws(() => validateTaskContractV2({ ...valid(), metadata: undefined }, workspaceRoot), /unknown|JSON|unsafe/i);
  const withDate = valid();
  withDate.networkPolicy = new Date();
  assert.throws(() => validateTaskContractV2(withDate, workspaceRoot), /plain|JSON|unsafe/i);
  const cyclic = valid();
  cyclic.inputs.push(cyclic);
  assert.throws(() => validateTaskContractV2(cyclic, workspaceRoot), /cycle|JSON|unsafe/i);
  const symbolic = valid();
  symbolic[Symbol('unsafe')] = true;
  assert.throws(() => validateTaskContractV2(symbolic, workspaceRoot), /JSON|unsafe/i);
});

test('rejects network policies outside the deny or hostname allowlist forms', () => {
  const blockedZones = [
    'localhost', 'service.localhost',
    'local', 'service.local',
    'invalid', 'service.invalid',
    'test', 'service.test',
    'example', 'service.example',
    'example.com', 'service.example.com',
    'example.net', 'service.example.net',
    'example.org', 'service.example.org',
    'home.arpa', 'service.home.arpa',
    'onion', 'service.onion'
  ];
  for (const policy of [
    'allow',
    { mode: 'allowlist', hosts: [] },
    { mode: 'allowlist', hosts: ['api.openai.com', 'api.openai.com'] },
    { mode: 'allowlist', hosts: ['HTTPS://api.openai.com'] },
    { mode: 'allowlist', hosts: ['api.openai.com:443'] },
    { mode: 'allowlist', hosts: ['api.openai.com/path'] },
    { mode: 'allowlist', hosts: ['*.openai.com'] },
    { mode: 'allowlist', hosts: ['127.0.0.1'] },
    { mode: 'allowlist', hosts: ['API.openai.com'] },
    { mode: 'allowlist', hosts: ['api.openai.com'], extra: true }
  ]) {
    assert.throws(() => validateTaskContractV2({ ...valid(), networkPolicy: policy }, workspaceRoot), /networkPolicy|host/i);
  }
  for (const host of blockedZones) {
    assert.throws(() => validateTaskContractV2({ ...valid(), networkPolicy: { mode: 'allowlist', hosts: [host] } }, workspaceRoot), /networkPolicy|host/i, host);
  }
});
