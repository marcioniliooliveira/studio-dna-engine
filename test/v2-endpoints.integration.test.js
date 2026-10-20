const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { startPreviewServer } = require('../src/server/preview-server');

function makeRequest({ port, path: reqPath, method = 'GET', body = null, headers = {} }) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port,
      path: reqPath,
      method,
      headers: Object.assign({}, headers)
    };

    if (body) {
      const data = typeof body === 'string' ? body : JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = http.request(options, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(raw); } catch(e) {}
        resolve({ statusCode: res.statusCode, headers: res.headers, raw, json });
      });
    });

    req.on('error', reject);
    if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body));
    req.end();
  });
}

test('V2 Endpoints: Orchestration, Vault, Review and Decisions integration', async () => {
  const port = 4099;
  const token = 'test-mutation-secret';
  const authHeaders = { authorization: `Bearer ${token}` };

  const server = startPreviewServer({
    port,
    enableMutations: true,
    mutationToken: token,
    rootDir: path.resolve(__dirname, '..')
  });

  await new Promise(r => setTimeout(r, 200));

  try {
    // 1. GET /api/v2/vault/references
    const resVault = await makeRequest({ port, path: '/api/v2/vault/references' });
    assert.equal(resVault.statusCode, 200);
    assert.equal(resVault.json.success, true);
    assert.ok(Array.isArray(resVault.json.references));

    // 2. GET /api/v2/vault/tokens/governance
    const resTokens = await makeRequest({ port, path: '/api/v2/vault/tokens/governance' });
    assert.equal(resTokens.statusCode, 200);
    assert.equal(resTokens.json.rules.variablesCount, 38);

    // 3. POST /api/v2/orchestrate/run
    const resRun = await makeRequest({
      port,
      path: '/api/v2/orchestrate/run',
      method: 'POST',
      headers: authHeaders,
      body: { clientSlug: 'piloto-elyse-luxe' }
    });
    assert.equal(resRun.statusCode, 202);
    assert.equal(resRun.json.success, true);
    const runId = resRun.json.runId;
    assert.ok(runId);

    // 4. GET /api/v2/orchestrate/status/:runId
    const resStatus = await makeRequest({ port, path: `/api/v2/orchestrate/status/${runId}` });
    assert.equal(resStatus.statusCode, 200);
    assert.equal(resStatus.json.record.runId, runId);
    assert.equal(resStatus.json.record.status, 'scheduled');

    // 5. GET /api/v2/ledger/:runId
    const resLedger = await makeRequest({ port, path: `/api/v2/ledger/${runId}` });
    assert.equal(resLedger.statusCode, 200);
    assert.equal(resLedger.json.ledger.runId, runId);
    assert.ok(resLedger.json.ledger.tokens.tokensIn > 0);

    // 6. GET /api/v2/directions/piloto-elyse-luxe
    const resDirs = await makeRequest({ port, path: '/api/v2/directions/piloto-elyse-luxe' });
    assert.equal(resDirs.statusCode, 200);
    assert.equal(resDirs.json.directions.length, 3);
    assert.equal(resDirs.json.directions[0].directionId, 'A');
    assert.equal(resDirs.json.directions[1].directionId, 'B');
    assert.equal(resDirs.json.directions[2].directionId, 'C');

    // 7. POST /api/v2/decisions
    const resDec = await makeRequest({
      port,
      path: '/api/v2/decisions',
      method: 'POST',
      headers: authHeaders,
      body: {
        clientSlug: 'piloto-elyse-luxe',
        selectedDirection: 'A',
        approver: 'architect-lead'
      }
    });
    assert.equal(resDec.statusCode, 200);
    assert.equal(resDec.json.decision.selectedDirection, 'A');
    assert.equal(resDec.json.decision.status, 'approved-frozen');

    // 8. GET /api/v2/preview/diff/piloto-elyse-luxe
    const resDiff = await makeRequest({ port, path: '/api/v2/preview/diff/piloto-elyse-luxe' });
    assert.equal(resDiff.statusCode, 200);
    assert.equal(resDiff.json.diff.viewports.length, 3);
    assert.equal(resDiff.json.diff.viewports[0].width, 1440);
    assert.equal(resDiff.json.diff.viewports[1].width, 768);
    assert.equal(resDiff.json.diff.viewports[2].width, 375);

  } finally {
    server.close();
  }
});
