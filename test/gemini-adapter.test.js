'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { createGeminiAdapter } = require('../src/execution/gemini-adapter');

const pkg = { version: 1, runId: 'r', taskId: 't', clientScope: 'client-a', input: { prompt: 'return JSON' } };

test('normalizes Gemini structured response and usage metadata', async () => {
  const adapter = createGeminiAdapter({ apiKey: 'secret', fetch: async (url, init) => {
    assert.match(url, /gemini-3\.7-flash/);
    assert.equal(init.headers['x-goog-api-key'], 'secret');
    return { ok: true, json: async () => ({ candidates: [{ content: { parts: [{ text: '{"ok":true}' }] } }], usageMetadata: { promptTokenCount: 12, candidatesTokenCount: 4 } }) };
  }});
  const result = await adapter.invoke(pkg);
  assert.deepEqual(result.output, { ok: true });
  assert.deepEqual(result.usage, { inputTokens: 12, outputTokens: 4 });
});

test('fails closed on HTTP and malformed provider responses', async () => {
  const http = createGeminiAdapter({ apiKey: 'x', fetch: async () => ({ ok: false, status: 429, text: async () => 'rate limited' }) });
  await assert.rejects(http.invoke(pkg), error => error.code === 'GEMINI_HTTP_ERROR');
  const malformed = createGeminiAdapter({ apiKey: 'x', fetch: async () => ({ ok: true, json: async () => ({ candidates: [] }) }) });
  await assert.rejects(malformed.invoke(pkg), error => error.code === 'GEMINI_RESPONSE_INVALID');
});

test('rejects missing credentials and cross-client package scope', async () => {
  assert.throws(() => createGeminiAdapter({}), /apiKey/);
  const adapter = createGeminiAdapter({ apiKey: 'x', clientScope: 'client-a', fetch: async () => ({ ok: true, json: async () => ({ candidates: [{ content: { parts: [{ text: '{}' }] } }] }) }) });
  await assert.rejects(adapter.invoke({ ...pkg, clientScope: 'client-b' }), /clientScope/);
});
