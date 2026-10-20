const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');

// Requirement: test that secure HTTP MCP server enforces auth, SSRF protection, and SSE messaging
const {
  validateScrapeUrlSecurity,
  createSecureHttpServer
} = require('../src/mcp/transports/http-server');

const TEST_TOKEN = 'test-secret-token-12345';

test('HTTP Suite 1: SSRF Guard validates URLs and rejects private/loopback targets', () => {
  // Public valid URLs
  assert.equal(validateScrapeUrlSecurity('https://awwwards.com'), 'https://awwwards.com/');
  assert.equal(validateScrapeUrlSecurity('https://godly.website/'), 'https://godly.website/');
  assert.equal(validateScrapeUrlSecurity('http://example.com/project'), 'http://example.com/project');

  // SSRF attack vectors
  assert.throws(() => validateScrapeUrlSecurity('http://localhost:4000'), /SSRF violation/);
  assert.throws(() => validateScrapeUrlSecurity('http://127.0.0.1:8080'), /SSRF violation/);
  assert.throws(() => validateScrapeUrlSecurity('http://192.168.1.1/admin'), /SSRF violation/);
  assert.throws(() => validateScrapeUrlSecurity('http://10.0.0.5/api'), /SSRF violation/);
  assert.throws(() => validateScrapeUrlSecurity('http://172.16.0.1'), /SSRF violation/);
  assert.throws(() => validateScrapeUrlSecurity('http://169.254.169.254/latest/meta-data'), /SSRF violation/);
  assert.throws(() => validateScrapeUrlSecurity('file:///etc/passwd'), /Invalid protocol/);
  assert.throws(() => validateScrapeUrlSecurity('javascript:alert(1)'), /Invalid protocol/);
});

test('HTTP Suite 2: Secure Server rejects unauthenticated requests with 401', async () => {
  const { server, port } = await createSecureHttpServer({
    port: 0, // dynamic port
    authToken: TEST_TOKEN
  });

  try {
    // 1. Request with no auth header
    const resNoAuth = await makeRequest(`http://127.0.0.1:${port}/sse`);
    assert.equal(resNoAuth.statusCode, 401, 'Request with no auth must return 401');

    // 2. Request with wrong auth header
    const resWrongAuth = await makeRequest(`http://127.0.0.1:${port}/sse`, {
      headers: { Authorization: 'Bearer wrong-token' }
    });
    assert.equal(resWrongAuth.statusCode, 401, 'Request with invalid token must return 401');
  } finally {
    await server.close();
  }
});

test('HTTP Suite 3: Health check endpoint returns status ok', async () => {
  const { server, port } = await createSecureHttpServer({
    port: 0,
    authToken: TEST_TOKEN
  });

  try {
    const res = await makeRequest(`http://127.0.0.1:${port}/health`);
    assert.equal(res.statusCode, 200);
    const body = JSON.parse(res.body);
    assert.equal(body.status, 'ok');
    assert.ok(body.toolsCount >= 10);
  } finally {
    await server.close();
  }
});

test('HTTP Suite 4: Authenticated SSE handshake and session initialization', async () => {
  const { server, port } = await createSecureHttpServer({
    port: 0,
    authToken: TEST_TOKEN
  });

  try {
    // Connect to /sse with Bearer token
    const sseRes = await new Promise((resolve, reject) => {
      const req = http.get(
        `http://127.0.0.1:${port}/sse`,
        { headers: { Authorization: `Bearer ${TEST_TOKEN}` } },
        (res) => {
          let chunkReceived = '';
          res.on('data', chunk => {
            chunkReceived += chunk.toString();
            if (chunkReceived.includes('endpoint')) {
              req.destroy();
              resolve({ statusCode: res.statusCode, data: chunkReceived });
            }
          });
          res.on('error', reject);
        }
      );
      req.on('error', reject);
    });

    assert.equal(sseRes.statusCode, 200);
    assert.ok(sseRes.data.includes('endpoint'), 'SSE stream must deliver endpoint event');
  } finally {
    await server.close();
  }
});

// Helper for HTTP requests
function makeRequest(urlStr, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const req = http.request(
      url,
      {
        method: options.method || 'GET',
        headers: options.headers || {}
      },
      (res) => {
        let body = '';
        res.on('data', chunk => { body += chunk; });
        res.on('end', () => resolve({ statusCode: res.statusCode, body }));
      }
    );
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}
