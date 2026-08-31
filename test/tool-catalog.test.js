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
    pathFields: ['path'],
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
  const taskPackage = { tl: ['context.summary', 'patch.apply'], p: ['clientes/piloto-elyse-luxe/DNA.md'] };

  const resolved = catalog.resolve(['context.summary', 'patch.apply'], taskPackage);
  const serialized = JSON.stringify(resolved);

  assert.deepEqual(resolved.map((tool) => tool.id), ['context.summary', 'patch.apply']);
  assert.equal(serialized.includes('context.symbol'), false);
  assert.equal(serialized.includes('context.lines'), false);
  assert.equal(serialized.includes('test.focused'), false);
  assert.equal(serialized.includes('qa.core'), false);
  assert.equal(serialized.includes('handler'), false);
  assert.ok(catalog.definitionBytes(['context.summary', 'patch.apply'], taskPackage) > 0);
});

test('does not expose a registered tool absent from the active task package', () => {
  const catalog = createToolCatalog(definitions());

  assert.throws(
    () => catalog.resolve(['context.summary', 'qa.core'], {
      tl: ['context.summary'],
      p: ['clientes/piloto-elyse-luxe/DNA.md']
    }),
    (error) => error.code === 'TOOL_UNDECLARED'
  );
});

test('rejects conflicting long-form scope aliases before the handler runs', async () => {
  let calls = 0;
  const catalog = createToolCatalog([{
    ...definition('context.summary'),
    handler: () => { calls += 1; }
  }]);

  await assert.rejects(
    () => catalog.invoke('context.summary', { path: 'clientes/outro-cliente/private.md' }, {
      tl: ['context.summary'],
      p: ['clientes/piloto-elyse-luxe/DNA.md'],
      toolIds: ['context.summary'],
      allowedPaths: ['clientes/outro-cliente/private.md']
    }),
    (error) => error.code === 'TOOL_SCOPE_ALIAS_FORBIDDEN'
  );
  assert.equal(calls, 0);
});

test('rejects matching long-form scope aliases before the handler runs', async () => {
  let calls = 0;
  const catalog = createToolCatalog([{
    ...definition('context.summary'),
    handler: () => { calls += 1; }
  }]);
  const path = 'clientes/piloto-elyse-luxe/DNA.md';

  await assert.rejects(
    () => catalog.invoke('context.summary', { path }, {
      tl: ['context.summary'],
      p: [path],
      toolIds: ['context.summary'],
      allowedPaths: [path]
    }),
    (error) => error.code === 'TOOL_SCOPE_ALIAS_FORBIDDEN'
  );
  assert.equal(calls, 0);
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

test('uses declared nested path validators before handler invocation', async () => {
  let calls = 0;
  const catalog = createToolCatalog([{
    id: 'context.symbol',
    description: 'read one symbol',
    inputSchema: {
      type: 'object',
      properties: {
        sourcePath: { type: 'string' },
        options: {
          type: 'object',
          properties: { alternate: { type: 'string' } },
          required: ['alternate'],
          additionalProperties: false
        }
      },
      required: ['sourcePath', 'options'],
      additionalProperties: false
    },
    pathFields: ['sourcePath', 'options.alternate'],
    handler: () => { calls += 1; }
  }]);

  await assert.rejects(
    () => catalog.invoke('context.symbol', {
      sourcePath: 'clientes/piloto-elyse-luxe/DNA.md',
      options: { alternate: '../other-client/private.md' }
    }, {
      tl: ['context.symbol'],
      p: ['clientes/piloto-elyse-luxe/DNA.md']
    }),
    (error) => error.code === 'TOOL_PATH_FORBIDDEN'
  );
  assert.equal(calls, 0);
});

test('rejects a schema with an undeclared path-bearing property', () => {
  assert.throws(
    () => createToolCatalog([{
      ...definition('context.lines'),
      inputSchema: {
        type: 'object',
        properties: { sourcePath: { type: 'string' } },
        required: ['sourcePath'],
        additionalProperties: false
      },
      pathFields: []
    }]),
    (error) => error.code === 'TOOL_PATH_SCHEMA_INVALID'
  );
});

test('rejects object-array path schemas without item selector support', () => {
  let calls = 0;
  assert.throws(
    () => createToolCatalog([{
      id: 'context.lines',
      description: 'read several files',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string' },
          documents: {
            type: 'array',
            items: {
              type: 'object',
              properties: { label: { type: 'string' } },
              required: ['label'],
              additionalProperties: false
            }
          }
        },
        required: ['path', 'documents'],
        additionalProperties: false
      },
      pathFields: ['path'],
      handler: () => { calls += 1; }
    }]),
    (error) => error.code === 'TOOL_PATH_SCHEMA_INVALID'
  );
  assert.equal(calls, 0);
});

test('rejects object arrays nested inside array items', () => {
  assert.throws(
    () => createToolCatalog([{
      id: 'context.lines',
      description: 'read nested batches',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string' },
          batches: {
            type: 'array',
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: { label: { type: 'string' } },
                required: ['label'],
                additionalProperties: false
              }
            }
          }
        },
        required: ['path', 'batches'],
        additionalProperties: false
      },
      pathFields: ['path'],
      handler: () => undefined
    }]),
    (error) => error.code === 'TOOL_PATH_SCHEMA_INVALID'
  );
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
