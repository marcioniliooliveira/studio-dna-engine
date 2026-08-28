const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const net = require('node:net');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');

const { startPreviewServer } = require('../src/server/preview-server');

let server;
let port;

function requestTo(targetPort, pathname, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: '127.0.0.1',
      port: targetPort,
      path: pathname,
      method: options.method || 'GET',
      headers: { connection: 'close', ...(options.headers || {}) }
    }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body: Buffer.concat(chunks).toString('utf8')
      }));
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function request(pathname, options) {
  return requestTo(port, pathname, options);
}

async function createFixtureServer(files, options = {}) {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-dna-preview-'));
  for (const [relativePath, content] of Object.entries(files)) {
    const destination = path.join(fixtureRoot, relativePath);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, content, 'utf8');
  }

  const fixtureServer = startPreviewServer({ port: 0, rootDir: fixtureRoot, ...options, silent: true });
  await once(fixtureServer, 'listening');
  return {
    rootDir: fixtureRoot,
    server: fixtureServer,
    port: fixtureServer.address().port,
    async close() {
      await new Promise(resolve => fixtureServer.close(resolve));
      fs.rmSync(fixtureRoot, { recursive: true, force: true });
    }
  };
}

test.before(async () => {
  const probe = net.createServer();
  probe.listen(0, '127.0.0.1');
  await once(probe, 'listening');
  port = probe.address().port;
  await new Promise(resolve => probe.close(resolve));

  server = startPreviewServer({ port, silent: true });
  await once(server, 'listening');
});

test.after(async () => {
  if (server) await new Promise(resolve => server.close(resolve));
});

test('preview server listens only on the loopback interface', () => {
  assert.equal(server.address().address, '127.0.0.1');
});

test('preview server rejects encoded traversal before reading a file', async () => {
  const response = await request('/clientes/%2e%2e/package.json');

  assert.equal(response.statusCode, 400);
  assert.doesNotMatch(response.body, /studio-dna-engine/);
});

test('preview server serves static files from an explicit root directory', async () => {
  const fixture = await createFixtureServer({
    'clientes/alpha/site/probe.txt': 'fixture-root'
  });
  const response = await requestTo(fixture.port, '/clientes/alpha/site/probe.txt');
  await fixture.close();

  assert.equal(response.statusCode, 200);
  assert.equal(response.body, 'fixture-root');
});

test('preview server does not recover a missing asset from another client', async () => {
  const fixture = await createFixtureServer({
    'clientes/alpha/site/index.html': '<!doctype html><title>Alpha</title>',
    'clientes/beta/site/assets/shared-secret.txt': 'beta-only'
  });
  const response = await requestTo(fixture.port, '/clientes/alpha/site/assets/shared-secret.txt', {
    headers: { referer: `http://127.0.0.1:${fixture.port}/clientes/alpha/site/index.html` }
  });
  await fixture.close();

  assert.equal(response.statusCode, 404);
  assert.doesNotMatch(response.body, /beta-only/);
});

test('preview server does not add wildcard CORS to static client assets', async () => {
  const fixture = await createFixtureServer({
    'clientes/alpha/site/probe.txt': 'client-asset'
  });
  const response = await requestTo(fixture.port, '/clientes/alpha/site/probe.txt');
  await fixture.close();

  assert.equal(response.statusCode, 200);
  assert.equal(response.headers['access-control-allow-origin'], undefined);
});

test('preview server disables mutation APIs unless explicitly enabled', async () => {
  const fixture = await createFixtureServer({});
  const response = await requestTo(fixture.port, '/api/save-brand-spec', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ slug: 'alpha', colors: { primary: '#000000' } })
  });
  const specWasCreated = fs.existsSync(path.join(fixture.rootDir, 'clientes', 'alpha', 'brand-spec.json'));
  await fixture.close();

  assert.equal(response.statusCode, 403);
  assert.equal(specWasCreated, false);
});

test('dashboard presents client builds as experimental rather than production-ready', async () => {
  const fixture = await createFixtureServer({
    'clientes/alpha/site/index.html': '<!doctype html><title>Alpha</title>'
  });
  const response = await requestTo(fixture.port, '/');
  await fixture.close();

  assert.equal(response.statusCode, 200);
  assert.match(response.body, /Experimental/);
  assert.doesNotMatch(response.body, /Producao Isolada|ICM Ready|pronto para deploy/i);
});

test('preview server limits authenticated mutation request bodies', async () => {
  const fixture = await createFixtureServer({}, {
    enableMutations: true,
    mutationToken: 'test-secret'
  });
  const response = await requestTo(fixture.port, '/api/save-brand-spec', {
    method: 'POST',
    headers: {
      authorization: 'Bearer test-secret',
      'content-type': 'application/json'
    },
    body: JSON.stringify({ slug: 'alpha', colors: { value: 'x'.repeat(70 * 1024) } })
  });
  await fixture.close();

  assert.equal(response.statusCode, 413);
});

test('preview server rejects path-like client slugs in mutation payloads', async () => {
  const fixture = await createFixtureServer({}, {
    enableMutations: true,
    mutationToken: 'test-secret'
  });
  const response = await requestTo(fixture.port, '/api/save-brand-spec', {
    method: 'POST',
    headers: {
      authorization: 'Bearer test-secret',
      'content-type': 'application/json'
    },
    body: JSON.stringify({ slug: '../escape', colors: { primary: '#000000' } })
  });
  const escapedSpec = fs.existsSync(path.join(fixture.rootDir, 'escape', 'brand-spec.json'));
  await fixture.close();

  assert.equal(response.statusCode, 400);
  assert.equal(escapedSpec, false);
});

test('site metadata API rejects encoded traversal slugs', async () => {
  const fixture = await createFixtureServer({
    'MASTER_SPEC.md': 'fixture-root-secret'
  });
  const response = await requestTo(fixture.port, '/api/site/%2e%2e');
  await fixture.close();

  assert.equal(response.statusCode, 400);
  assert.doesNotMatch(response.body, /fixture-root-secret/);
});

test('preview server blocks extraction requests to local network targets', async () => {
  const pipeline = require('../index');
  const originalRunPipeline = pipeline.runPipeline;
  let pipelineCalls = 0;
  pipeline.runPipeline = async () => { pipelineCalls += 1; };

  const fixture = await createFixtureServer({}, {
    enableMutations: true,
    mutationToken: 'test-secret'
  });
  const response = await requestTo(fixture.port, '/api/extract', {
    method: 'POST',
    headers: {
      authorization: 'Bearer test-secret',
      'content-type': 'application/json'
    },
    body: JSON.stringify({ url: 'http://127.0.0.1:4000' })
  });
  await new Promise(resolve => setImmediate(resolve));
  await fixture.close();
  pipeline.runPipeline = originalRunPipeline;

  assert.equal(response.statusCode, 403);
  assert.equal(pipelineCalls, 0);
});
