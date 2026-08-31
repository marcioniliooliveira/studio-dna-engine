const test = require('node:test');
const assert = require('node:assert/strict');
const { createGeminiApiAdapter } = require('../src/execution/gemini-api-adapter');

function taskPackage() {
  return {
    v: 1, rid: 'run-001', cid: 'piloto-elyse-luxe', nid: 'verify-site', k: 'verify', ni: true,
    in: [{ id: 'facts', sha: 'a'.repeat(64) }],
    p: ['clientes/piloto-elyse-luxe/site/index.html'], out: ['report'],
    tl: ['context.summary', 'qa.core'], g: ['core-runtime'],
    b: { it: 100, ot: 50, usd: 0.1, try: 2 },
    ctx: { summary: 'Only this progressively disclosed context is available.' }
  };
}

function taskResult(overrides = {}) {
  return {
    v: 1, rid: 'run-001', cid: 'piloto-elyse-luxe', nid: 'verify-site', st: 'ok',
    art: [{ id: 'report', sha: 'b'.repeat(64) }],
    chg: ['clientes/piloto-elyse-luxe/site/index.html'],
    use: { it: null, ct: null, ot: null }, err: null, ...overrides
  };
}

function toolCatalog() {
  return {
    resolve: (ids) => ids.map((id) => ({
      v: 1, id, description: `${id} description`,
      inputSchema: { type: 'object', properties: {}, additionalProperties: false }
    })),
    invoke: async (id, args, scope) => ({ id, args, paths: scope.p })
  };
}

test('sends only the scoped package, disclosed context, node tools, and TaskResultWire schema', async () => {
  const requests = [];
  const client = { models: { generateContent: async (request) => {
    requests.push(request);
    return {
      text: JSON.stringify(taskResult()),
      usageMetadata: { promptTokenCount: 11, cachedContentTokenCount: 3, candidatesTokenCount: 7 }
    };
  } } };
  const adapter = createGeminiApiAdapter({ client, toolCatalog: toolCatalog(), now: () => 1000 });

  const executed = await adapter.execute(taskPackage());
  const request = requests[0];
  const prompt = JSON.parse(request.contents[0].parts[0].text);

  assert.equal(adapter.identity, 'gemini-api');
  assert.equal(request.model, 'gemini-3.7-flash');
  assert.deepEqual(Object.keys(prompt).sort(), ['context', 'task', 'tools']);
  assert.deepEqual(prompt.task, taskPackage());
  assert.deepEqual(prompt.context, taskPackage().ctx);
  assert.deepEqual(prompt.tools.map((tool) => tool.id), ['context.summary', 'qa.core']);
  assert.equal(JSON.stringify(request).includes('conversationHistory'), false);
  assert.equal(request.config.responseMimeType, 'application/json');
  assert.equal(request.config.responseJsonSchema.additionalProperties, false);
  assert.equal(request.config.responseJsonSchema.properties.rid.type, 'string');
  assert.equal(request.config.responseJsonSchema.properties.art.items.additionalProperties, false);
  assert.equal(request.config.responseJsonSchema.properties.use.additionalProperties, false);
  assert.deepEqual(executed.result, taskResult());
  assert.deepEqual(executed.usage, { inputTokens: 11, cachedTokens: 3, outputTokens: 7, thinkingTokens: null, usd: null, estimated: false });
  assert.deepEqual(executed.costEvent, {
    v: 1, rid: 'run-001', nid: 'verify-site', m: 'gemini-3.7-flash', svc: 'standard',
    it: 11, ct: 3, ot: 7, ms: 0, try: 1, usd: null, est: false
  });
});

test('rejects a malformed or package-unbound model result locally', async () => {
  const client = { models: { generateContent: async () => ({ text: JSON.stringify(taskResult({ cid: 'other-client' })) }) } };
  const adapter = createGeminiApiAdapter({ client, toolCatalog: toolCatalog() });

  await assert.rejects(() => adapter.execute(taskPackage()), (error) => error.code === 'TASK_RESULT_SCOPE_MISMATCH');
});

test('rejects a tool call beyond the task tool budget without another model call', async () => {
  let modelCalls = 0;
  const client = { models: { generateContent: async () => {
    modelCalls += 1;
    if (modelCalls === 1) {
      return { functionCalls: [
        { name: 'context.summary', args: {} }, { name: 'qa.core', args: {} }
      ] };
    }
    return { functionCalls: [{ name: 'context.summary', args: {} }] };
  } } };
  const adapter = createGeminiApiAdapter({ client, toolCatalog: toolCatalog(), maxToolCalls: 2 });

  await assert.rejects(() => adapter.execute(taskPackage()), (error) => error.code === 'TASK_TOOL_BUDGET_EXCEEDED');
  assert.equal(modelCalls, 2);
});
