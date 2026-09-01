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

function modelContentForToolCalls(response, calls) {
  const content = response?.candidates?.[0]?.content;
  if (content?.role === 'model' && Array.isArray(content.parts) && content.parts.some((part) => part.functionCall)) {
    return structuredClone(content);
  }
  return { role: 'model', parts: calls.map((functionCall) => ({ functionCall: structuredClone(functionCall) })) };
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

function aggregateUsage(responses, hasUnknownAttempt) {
  const usages = responses.map((response) => usageFor(response?.usageMetadata));
  function total(field) {
    if (hasUnknownAttempt || usages.some((usage) => usage[field] === null)) return null;
    return usages.reduce((sum, usage) => sum + usage[field], 0);
  }
  return {
    inputTokens: total('inputTokens'),
    cachedTokens: total('cachedTokens'),
    outputTokens: total('outputTokens'),
    thinkingTokens: total('thinkingTokens'),
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

  async function generate(request, state, maxAttempts) {
    let lastError;
    while (state.attemptCount < maxAttempts) {
      state.attemptCount += 1;
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
        state.responses.push(response);
        return response;
      } catch (error) {
        lastError = error;
        state.hasUnknownAttempt = true;
        if (error.code === 'GEMINI_TIMEOUT') throw error;
      } finally {
        clearTimeout(timer);
      }
    }
    if (lastError) throw lastError;
    throw executionError('TASK_ATTEMPT_BUDGET_EXCEEDED', 'Task attempt budget was exhausted before another model turn');
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
    const state = { attemptCount: 0, responses: [], hasUnknownAttempt: false };
    let response;

    function evidence() {
      const usage = aggregateUsage(state.responses, state.hasUnknownAttempt);
      return {
        usage,
        costEvent: CostEventWire.parse({
          v: 1, rid: taskPackage.rid, nid: taskPackage.nid, m: model, svc: service,
          it: usage.inputTokens, ct: usage.cachedTokens, ot: usage.outputTokens,
          ms: Math.max(0, now() - startedAt), try: state.attemptCount, usd: usage.usd, est: usage.estimated
        })
      };
    }

    try {
      while (true) {
        response = await generate({ model, contents, config }, state, taskPackage.b.try);
        const calls = functionCalls(response);
        if (calls.length === 0) break;
        if (toolCallCount + calls.length > maxToolCalls) {
          throw executionError('TASK_TOOL_BUDGET_EXCEEDED', 'Gemini requested more tool calls than the task permits');
        }
        toolCallCount += calls.length;
        const responses = await Promise.all(calls.map(async (call) => ({
          functionResponse: { id: call.id, name: call.name, response: { output: await toolCatalog.invoke(call.name, call.args || {}, taskPackage) } }
        })));
        contents = contents.concat(
          modelContentForToolCalls(response, calls),
          { role: 'user', parts: responses }
        );
      }

      const result = parseResponse(response);
      assertPackageBinding(result, taskPackage);
      return { result, ...evidence() };
    } catch (error) {
      if (state.attemptCount > 0) Object.assign(error, evidence());
      throw error;
    }
  }

  return Object.freeze({ identity: 'gemini-api', model, service, execute });
}

module.exports = { createGeminiApiAdapter, DEFAULT_MODEL };
