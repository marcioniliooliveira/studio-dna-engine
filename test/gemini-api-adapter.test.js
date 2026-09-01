const test = require('node:test');
const assert = require('node:assert/strict');
const { createGeminiApiAdapter } = require('../src/execution/gemini-api-adapter');

function taskPackage() {
  return {
    v: 1, rid: 'run-001', cid: 'piloto-elyse-luxe', nid: 'verify-site', k: 'verify',
    need: false, ni: true, svc: 'standard', ha: false,
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

  await assert.rejects(() => adapter.execute(taskPackage()), (error) => {
    assert.equal(error.code, 'TASK_TOOL_BUDGET_EXCEEDED');
    assert.equal(error.costEvent.try, 2);
    assert.equal(error.costEvent.m, 'gemini-3.7-flash');
    return true;
  });
  assert.equal(modelCalls, 2);
});

test('preserves the model function call in the SDK conversation before its function response', async () => {
  const requests = [];
  const functionCall = { id: 'call-001', name: 'context.summary', args: {} };
  const modelContent = { role: 'model', parts: [{ functionCall }] };
  const client = { models: { generateContent: async (request) => {
    requests.push(request);
    if (requests.length === 1) {
      return {
        candidates: [{ content: modelContent }],
        usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 3 }
      };
    }
    return {
      text: JSON.stringify(taskResult()),
      usageMetadata: { promptTokenCount: 5, candidatesTokenCount: 7 }
    };
  } } };

  const executed = await createGeminiApiAdapter({ client, toolCatalog: toolCatalog() }).execute(taskPackage());

  assert.deepEqual(requests[1].contents.slice(1), [
    modelContent,
    {
      role: 'user',
      parts: [{
        functionResponse: {
          id: 'call-001',
          name: 'context.summary',
          response: {
            output: {
              id: 'context.summary', args: {}, paths: ['clientes/piloto-elyse-luxe/site/index.html']
            }
          }
        }
      }]
    }
  ]);
  assert.equal(requests.length, 2);
  assert.deepEqual(executed.usage, {
    inputTokens: 15, cachedTokens: null, outputTokens: 10, thinkingTokens: null, usd: null, estimated: false
  });
  assert.equal(executed.costEvent.try, 2);
});

test('aborts a timed-out API request and does not start a retry before it settles', async () => {
  let calls = 0;
  let aborted = false;
  const client = { models: { generateContent: async (request) => {
    calls += 1;
    return new Promise((_, reject) => request.config.abortSignal.addEventListener('abort', () => {
      aborted = request.config.abortSignal.aborted;
      reject(new Error('request aborted'));
    }, { once: true }));
  } } };
  const adapter = createGeminiApiAdapter({ client, toolCatalog: toolCatalog(), timeoutMs: 5 });

  await assert.rejects(() => adapter.execute(taskPackage()), (error) => {
    assert.equal(error.code, 'GEMINI_TIMEOUT');
    assert.deepEqual(error.costEvent, {
      v: 1, rid: 'run-001', nid: 'verify-site', m: 'gemini-3.7-flash', svc: 'standard',
      it: null, ct: null, ot: null, ms: error.costEvent.ms, try: 1, usd: null, est: false
    });
    return true;
  });
  assert.equal(aborted, true);
  assert.equal(calls, 1);
});

test('binds the selected Flex or Batch service to requests and cost evidence', async () => {
  const requests = [];
  const client = { models: { generateContent: async (request) => {
    requests.push(request);
    return { text: JSON.stringify(taskResult()) };
  } } };

  const flex = await createGeminiApiAdapter({ client, toolCatalog: toolCatalog(), service: 'flex' }).execute(taskPackage());
  const batch = await createGeminiApiAdapter({ client, toolCatalog: toolCatalog(), service: 'batch' }).execute(taskPackage());

  assert.equal(requests[0].config.serviceTier, 'flex');
  assert.equal(requests[1].config.serviceTier, 'deferred');
  assert.equal(flex.costEvent.svc, 'flex');
  assert.equal(batch.costEvent.svc, 'batch');
  assert.equal(flex.costEvent.try, 1);
});

test('records the actual successful retry attempt in cost evidence', async () => {
  let calls = 0;
  const client = { models: { generateContent: async () => {
    calls += 1;
    if (calls === 1) throw new Error('temporary transport failure');
    return { text: JSON.stringify(taskResult()) };
  } } };
  const executed = await createGeminiApiAdapter({ client, toolCatalog: toolCatalog() }).execute(taskPackage());

  assert.equal(calls, 2);
  assert.equal(executed.costEvent.try, 2);
});

test('enforces one attempt cap across transport retries and model tool turns', async () => {
  let calls = 0;
  const client = { models: { generateContent: async () => {
    calls += 1;
    if (calls === 1) throw new Error('temporary transport failure');
    return {
      functionCalls: [{ name: 'context.summary', args: {} }],
      usageMetadata: { promptTokenCount: 9, candidatesTokenCount: 2 }
    };
  } } };
  const adapter = createGeminiApiAdapter({ client, toolCatalog: toolCatalog() });

  await assert.rejects(() => adapter.execute(taskPackage()), (error) => {
    assert.equal(error.code, 'TASK_ATTEMPT_BUDGET_EXCEEDED');
    assert.equal(error.costEvent.try, 2);
    return true;
  });
  assert.equal(calls, 2);
});

test('aggregates usage across every model call in a tool conversation', async () => {
  let calls = 0;
  const client = { models: { generateContent: async () => {
    calls += 1;
    if (calls === 1) {
      return {
        functionCalls: [{ name: 'context.summary', args: {} }],
        usageMetadata: { promptTokenCount: 10, cachedContentTokenCount: 2, candidatesTokenCount: 3, thoughtsTokenCount: 1 }
      };
    }
    return {
      text: JSON.stringify(taskResult()),
      usageMetadata: { promptTokenCount: 5, cachedContentTokenCount: 1, candidatesTokenCount: 7, thoughtsTokenCount: 2 }
    };
  } } };
  const packageWithAttempts = taskPackage();
  packageWithAttempts.b.try = 2;

  const executed = await createGeminiApiAdapter({ client, toolCatalog: toolCatalog() }).execute(packageWithAttempts);

  assert.deepEqual(executed.usage, {
    inputTokens: 15, cachedTokens: 3, outputTokens: 10, thinkingTokens: 3, usd: null, estimated: false
  });
  assert.equal(executed.costEvent.try, 2);
});

test('attaches cost evidence when a charged response is malformed or out of scope', async () => {
  const cases = [
    ['TASK_RESULT_INVALID', { text: '{not-json', usageMetadata: { promptTokenCount: 4 } }],
    ['TASK_RESULT_SCOPE_MISMATCH', { text: JSON.stringify(taskResult({ cid: 'other-client' })), usageMetadata: { promptTokenCount: 6 } }]
  ];

  for (const [code, response] of cases) {
    const client = { models: { generateContent: async () => response } };
    await assert.rejects(
      () => createGeminiApiAdapter({ client, toolCatalog: toolCatalog() }).execute(taskPackage()),
      (error) => {
        assert.equal(error.code, code);
        assert.equal(error.costEvent.try, 1);
        assert.equal(error.costEvent.it, response.usageMetadata.promptTokenCount);
        return true;
      }
    );
  }
});
