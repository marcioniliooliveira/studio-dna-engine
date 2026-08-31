const test = require('node:test');
const assert = require('node:assert/strict');
const { selectService, createExecutionAdapters } = require('../src/execution/service-router');

test('routes immediate and interactive work to Standard', () => {
  assert.equal(selectService({ kind: 'fix', nonInteractive: true, dependencies: [] }), 'standard');
  assert.equal(selectService({ kind: 'render', nonInteractive: false, dependencies: [] }), 'standard');
  assert.equal(selectService({ kind: 'extract', nonInteractive: true, dependencies: ['facts'] }), 'standard');
  assert.equal(selectService({ kind: 'verify', nonInteractive: true, dependencies: [], humanApprovalEdge: true }), 'standard');
});

test('permits Batch and Flex only for non-interactive extract or verify nodes with no approval edge', () => {
  assert.equal(selectService({ kind: 'extract', nonInteractive: true, dependencies: [], service: 'batch' }), 'batch');
  assert.equal(selectService({ kind: 'verify', nonInteractive: true, dependencies: [], service: 'flex' }), 'flex');
  assert.equal(selectService({ kind: 'build', nonInteractive: true, dependencies: [], service: 'batch' }), 'standard');
});

test('uses Gemini IDE without a key and never constructs another paid adapter', () => {
  let apiFactoryCalls = 0;
  const ideAdapter = { identity: 'gemini-ide' };
  const adapters = createExecutionAdapters({
    environment: {},
    createGeminiIdeAdapter: () => ideAdapter,
    createGeminiApiAdapter: () => { apiFactoryCalls += 1; return { identity: 'gemini-api' }; }
  });

  assert.equal(adapters.default.identity, 'gemini-ide');
  assert.equal(apiFactoryCalls, 0);
});

test('binds each selected service to its API adapter', () => {
  const services = [];
  const adapters = createExecutionAdapters({
    environment: { GEMINI_API_KEY: 'test-key' },
    Gemini: class { constructor({ apiKey }) { assert.equal(apiKey, 'test-key'); } },
    toolCatalog: {},
    createGeminiApiAdapter: (options) => { services.push(options.service); return { identity: options.service }; }
  });

  assert.equal(adapters.forNode({ kind: 'extract', nonInteractive: true, dependencies: [], service: 'batch' }).identity, 'batch');
  assert.equal(adapters.forNode({ kind: 'verify', nonInteractive: true, dependencies: [], service: 'flex' }).identity, 'flex');
  assert.deepEqual(services, ['standard', 'batch', 'flex']);
});
