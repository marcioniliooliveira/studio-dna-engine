const { TaskResultWire, CostEventWire } = require('../orchestration/contracts');
const { z } = require('zod');

const DEFAULT_MODEL = 'gemini-3.7-flash';

function executionError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function resultSchema() {
  return z.toJSONSchema(TaskResultWire);
}

function assertPackageBinding(result, taskPackage) {
  if (result.rid !== taskPackage.rid || result.cid !== taskPackage.cid || result.nid !== taskPackage.nid) {
    throw executionError('TASK_RESULT_SCOPE_MISMATCH', 'Task result does not belong to the active task package');
  }
  const outputs = new Set(taskPackage.out);
  const paths = new Set(taskPackage.p);
  if (result.art.some((artifact) => !outputs.has(artifact.id))) {
    throw executionError('TASK_RESULT_ARTIFACT_SCOPE_VIOLATION', 'Task result contains an undeclared artifact');
  }
  if (result.chg.some((changedPath) => !paths.has(changedPath))) {
    throw executionError('TASK_RESULT_CHANGE_SCOPE_VIOLATION', 'Task result changes a path outside the task scope');
  }
}

function parseResponse(response) {
  const text = typeof response?.text === 'function' ? response.text() : response?.text;
  if (typeof text !== 'string') throw executionError('GEMINI_RESULT_INVALID', 'Gemini response does not contain structured JSON');
  try {
    return TaskResultWire.parse(JSON.parse(text));
  } catch {
    throw executionError('TASK_RESULT_INVALID', 'Gemini response does not match TaskResultWire');
  }
}

function functionCalls(response) {
  if (Array.isArray(response?.functionCalls)) return response.functionCalls;
  return response?.candidates?.[0]?.content?.parts
    ?.filter((part) => part.functionCall)
    .map((part) => part.functionCall) || [];
}

function usageFor(metadata) {
  const source = metadata || {};
  return {
    inputTokens: Number.isInteger(source.promptTokenCount) ? source.promptTokenCount : null,
    cachedTokens: Number.isInteger(source.cachedContentTokenCount) ? source.cachedContentTokenCount : null,
    outputTokens: Number.isInteger(source.candidatesTokenCount) ? source.candidatesTokenCount : null,
    thinkingTokens: Number.isInteger(source.thoughtsTokenCount) ? source.thoughtsTokenCount : null,
    usd: null,
    estimated: false
  };
}

function requestServiceTier(service) {
  return service === 'batch' ? 'deferred' : service;
}

function createGeminiApiAdapter({
  client, toolCatalog, model = DEFAULT_MODEL, service = 'standard', timeoutMs = 30000, maxToolCalls = 8, now = Date.now
} = {}) {
  if (!client?.models || typeof client.models.generateContent !== 'function' || !toolCatalog
    || typeof toolCatalog.resolve !== 'function' || typeof toolCatalog.invoke !== 'function'
    || typeof model !== 'string' || model.length === 0 || !Number.isInteger(timeoutMs) || timeoutMs < 1
    || !['standard', 'batch', 'flex'].includes(service) || !Number.isInteger(maxToolCalls) || maxToolCalls < 0 || typeof now !== 'function') {
    throw new TypeError('client, toolCatalog, model, service, timeoutMs, maxToolCalls, and now are required');
  }

  async function generate(request, attempts) {
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      const controller = new AbortController();
      let timer;
      try {
        const timedOut = new Promise((_, reject) => {
          timer = setTimeout(() => {
            controller.abort();
            reject(executionError('GEMINI_TIMEOUT', 'Gemini request timed out'));
          }, timeoutMs);
          timer.unref?.();
        });
        const response = await Promise.race([
          client.models.generateContent({ ...request, config: { ...request.config, abortSignal: controller.signal } }),
          timedOut
        ]);
        return { response, attempts: attempt };
      } catch (error) {
        lastError = error;
        if (error.code === 'GEMINI_TIMEOUT') throw error;
      } finally {
        clearTimeout(timer);
      }
    }
    throw lastError;
  }

  async function execute(taskPackage) {
    const tools = toolCatalog.resolve(taskPackage.tl, taskPackage);
    const prompt = { task: structuredClone(taskPackage), context: structuredClone(taskPackage.ctx || {}), tools };
    const declarations = tools.map((tool) => ({ name: tool.id, description: tool.description, parametersJsonSchema: tool.inputSchema }));
    const config = {
      responseMimeType: 'application/json', responseJsonSchema: resultSchema(), serviceTier: requestServiceTier(service),
      tools: [{ functionDeclarations: declarations }]
    };
    let contents = [{ role: 'user', parts: [{ text: JSON.stringify(prompt) }] }];
    const startedAt = now();
    let toolCallCount = 0;
    let attemptCount = 0;
    let response;

    while (true) {
      const generated = await generate({ model, contents, config }, taskPackage.b.try);
      response = generated.response;
      attemptCount += generated.attempts;
      const calls = functionCalls(response);
      if (calls.length === 0) break;
      if (toolCallCount + calls.length > maxToolCalls) {
        throw executionError('TASK_TOOL_BUDGET_EXCEEDED', 'Gemini requested more tool calls than the task permits');
      }
      toolCallCount += calls.length;
      const responses = await Promise.all(calls.map(async (call) => ({
        functionResponse: { id: call.id, name: call.name, response: { output: await toolCatalog.invoke(call.name, call.args || {}, taskPackage) } }
      })));
      contents = contents.concat({ role: 'user', parts: responses });
    }

    const result = parseResponse(response);
    assertPackageBinding(result, taskPackage);
    const usage = usageFor(response.usageMetadata);
    const elapsed = Math.max(0, now() - startedAt);
    const costEvent = CostEventWire.parse({
      v: 1, rid: result.rid, nid: result.nid, m: model, svc: service,
      it: usage.inputTokens, ct: usage.cachedTokens, ot: usage.outputTokens,
      ms: elapsed, try: attemptCount, usd: usage.usd, est: usage.estimated
    });
    return { result, usage, costEvent };
  }

  return Object.freeze({ identity: 'gemini-api', service, execute });
}

module.exports = { createGeminiApiAdapter, DEFAULT_MODEL };
