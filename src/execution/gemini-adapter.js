'use strict';

const { validateTaskPackage } = require('../orchestration/task-contract');

function createGeminiAdapter(options = {}) {
  if (typeof options.apiKey !== 'string' || !options.apiKey) throw new TypeError('apiKey is required');
  const fetchImpl = options.fetch || globalThis.fetch;
  if (typeof fetchImpl !== 'function') throw new TypeError('fetch is required');
  const model = options.model || 'gemini-3.7-flash';
  const endpoint = options.endpoint || `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const clientScope = options.clientScope;

  async function invoke(source) {
    const task = validateTaskPackage(source);
    if (clientScope && task.clientScope !== clientScope) throw new Error('task clientScope does not match adapter clientScope');
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': options.apiKey },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: JSON.stringify(task.input) }] }] })
    });
    if (!response.ok) {
      const detail = typeof response.text === 'function' ? await response.text() : '';
      const error = new Error(`Gemini request failed (${response.status}): ${detail}`);
      error.code = 'GEMINI_HTTP_ERROR'; error.status = response.status; throw error;
    }
    const payload = await response.json();
    const text = payload && payload.candidates && payload.candidates[0] && payload.candidates[0].content && payload.candidates[0].content.parts && payload.candidates[0].content.parts[0] && payload.candidates[0].content.parts[0].text;
    if (typeof text !== 'string' || !text.trim()) { const error = new Error('Gemini response has no candidate text'); error.code = 'GEMINI_RESPONSE_INVALID'; throw error; }
    let output;
    try { output = JSON.parse(text); } catch { output = text; }
    const usage = payload.usageMetadata || {};
    return { output, usage: { inputTokens: Number.isSafeInteger(usage.promptTokenCount) ? usage.promptTokenCount : 0, outputTokens: Number.isSafeInteger(usage.candidatesTokenCount) ? usage.candidatesTokenCount : 0 } };
  }
  return { invoke, model };
}

module.exports = { createGeminiAdapter };
