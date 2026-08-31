const test = require('node:test');
const assert = require('node:assert/strict');
const { createToolCatalog } = require('../src/execution/tool-catalog');

function definition(id, description = `${id} description`) {
  return {
    id,
    description,
    inputSchema: {
      type: 'object',
      properties: { path: { type: 'string' } },
      required: ['path'],
      additionalProperties: false
    },
    handler: ({ path }) => ({ path })
  };
}

function definitions() {
  return [
    definition('context.summary'),
    definition('context.symbol'),
    definition('context.lines'),
    definition('patch.apply'),
    definition('test.focused'),
    definition('qa.core')
  ];
}

test('resolves only requested compact model definitions', () => {
  const catalog = createToolCatalog(definitions());

  const resolved = catalog.resolve(['context.summary', 'patch.apply']);
  const serialized = JSON.stringify(resolved);

  assert.deepEqual(resolved.map((tool) => tool.id), ['context.summary', 'patch.apply']);
  assert.equal(serialized.includes('context.symbol'), false);
  assert.equal(serialized.includes('context.lines'), false);
  assert.equal(serialized.includes('test.focused'), false);
  assert.equal(serialized.includes('qa.core'), false);
  assert.equal(serialized.includes('handler'), false);
  assert.ok(catalog.definitionBytes(['context.summary', 'patch.apply']) > 0);
});

test('fails closed before invoking an unknown or undeclared tool', async () => {
  let calls = 0;
  const catalog = createToolCatalog([{
    ...definition('context.summary'),
    handler: () => { calls += 1; }
  }]);
  const scope = { tl: ['context.summary'], p: ['clientes/piloto-elyse-luxe/DNA.md'] };

  await assert.rejects(
    () => catalog.invoke('unknown.tool', { path: 'clientes/piloto-elyse-luxe/DNA.md' }, scope),
    (error) => error.code === 'TOOL_UNKNOWN'
  );
  await assert.rejects(
    () => catalog.invoke('context.summary', { path: 'clientes/piloto-elyse-luxe/DNA.md' }, { ...scope, tl: [] }),
    (error) => error.code === 'TOOL_UNDECLARED'
  );
  assert.equal(calls, 0);
});

test('fails closed before invoking a read outside task allowed paths', async () => {
  let calls = 0;
  const catalog = createToolCatalog([{
    ...definition('context.summary'),
    handler: () => { calls += 1; }
  }]);

  await assert.rejects(
    () => catalog.invoke('context.summary', { path: 'clientes/outro-cliente/DNA.md' }, {
      tl: ['context.summary'],
      p: ['clientes/piloto-elyse-luxe/DNA.md']
    }),
    (error) => error.code === 'TOOL_PATH_FORBIDDEN'
  );
  assert.equal(calls, 0);
});

test('rejects duplicate IDs and arguments outside a strict schema', async () => {
  assert.throws(
    () => createToolCatalog([definition('context.summary'), definition('context.summary')]),
    (error) => error.code === 'TOOL_DUPLICATE_ID'
  );

  let calls = 0;
  const catalog = createToolCatalog([{
    ...definition('context.summary'),
    handler: () => { calls += 1; }
  }]);

  await assert.rejects(
    () => catalog.invoke('context.summary', {
      path: 'clientes/piloto-elyse-luxe/DNA.md',
      command: 'powershell Get-ChildItem'
    }, { tl: ['context.summary'], p: ['clientes/piloto-elyse-luxe/DNA.md'] }),
    (error) => error.code === 'TOOL_ARGUMENTS_INVALID'
  );
  assert.equal(calls, 0);
});
