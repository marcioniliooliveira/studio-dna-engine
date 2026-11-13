'use strict';

/**
 * test/preview-server-workbench.test.js
 *
 * Validates the Live-MCP Bidirectional Bridge (Spike 2) Preview Server & Workbench:
 * 1. Component Workbench 302 Redirect & Default Parameters
 * 2. Workbench HTML Injection (skipIntro and __WORKBENCH_TARGET__)
 * 3. Atomic Write Helper writeJsonAtomicSync Resilience & Anti-Race
 * 4. POST /__dna_live_select Atomic Persistence to .dna/live-selection.json & Mirrored Fallback
 * 5. GET /__dna_live_select/:slug Disk Fallback & Security
 * 6. Hot-Swap Server-Sent Events (SSE) & Notification Channel
 * 7. HybridRepository Live Selection Synchronization
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');

const {
  startPreviewServer,
  writeJsonAtomicSync,
  getLiveSelection,
  setLiveSelection
} = require('../src/server/preview-server');
const HybridRepository = require('../src/persistence/hybrid-repository');

function requestTo(targetPort, pathname, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: '127.0.0.1',
      port: targetPort,
      path: pathname,
      method: options.method || 'GET',
      headers: {
        connection: 'close',
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const bodyStr = Buffer.concat(chunks).toString('utf8');
        let parsed = null;
        try {
          parsed = JSON.parse(bodyStr);
        } catch (_) {
          parsed = null;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          rawBody: bodyStr,
          body: parsed
        });
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function createFixtureServer(files = {}, options = {}) {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-dna-pw-workbench-'));
  for (const [relativePath, content] of Object.entries(files)) {
    const destination = path.join(fixtureRoot, relativePath);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, content, 'utf8');
  }

  const fixtureServer = startPreviewServer({
    port: 0,
    rootDir: fixtureRoot,
    clientesDir: path.join(fixtureRoot, 'clientes'),
    ...options,
    silent: true
  });
  await once(fixtureServer, 'listening');

  return {
    rootDir: fixtureRoot,
    clientesDir: path.join(fixtureRoot, 'clientes'),
    server: fixtureServer,
    port: fixtureServer.address().port,
    async close() {
      await new Promise(resolve => fixtureServer.close(resolve));
      fs.rmSync(fixtureRoot, { recursive: true, force: true });
    }
  };
}

test('Suite 1: Component Workbench 302 Redirect & Default Parameters', async () => {
  const fixture = await createFixtureServer();

  // Test custom client and target
  const resCustom = await requestTo(fixture.port, '/workbench?client=alpha-brand&target=ds-cta-99');
  assert.equal(resCustom.statusCode, 302);
  assert.equal(
    resCustom.headers.location,
    '/clientes/alpha-brand/site/index.html?workbench=ds-cta-99&skipIntro=1'
  );

  // Test defaults
  const resDefault = await requestTo(fixture.port, '/workbench');
  assert.equal(resDefault.statusCode, 302);
  assert.equal(
    resDefault.headers.location,
    '/clientes/marcionilio-oliveira/site/index.html?workbench=WorkStage&skipIntro=1'
  );

  await fixture.close();
});

test('Suite 2: Workbench HTML Injection (skipIntro and __WORKBENCH_TARGET__)', async () => {
  const sampleHtml = `<!DOCTYPE html><html><head><title>Test</title></head><body class="loading preloader-active"><div id="preloader">Loading...</div><h1>App</h1></body></html>`;
  const fixture = await createFixtureServer({
    'clientes/sample-app/site/index.html': sampleHtml
  });

  const res = await requestTo(fixture.port, '/clientes/sample-app/site/index.html?workbench=ds-hero-1&skipIntro=1');
  assert.equal(res.statusCode, 200);
  assert.ok(res.rawBody.includes('__DNA_WORKBENCH_SKIP_INTRO__'), 'Must inject skip intro script block');
  assert.ok(res.rawBody.includes('window.__SKIP_INTRO__ = true;'), 'Must set __SKIP_INTRO__ flag');
  assert.ok(res.rawBody.includes('window.__WORKBENCH_TARGET__ = "ds-hero-1";'), 'Must set target dsId');
  assert.ok(res.rawBody.includes("classList.remove('loading', 'preloader-active')"), 'Must remove preloader classes');

  await fixture.close();
});

test('Suite 3: writeJsonAtomicSync writes atomically and leaves zero .tmp artifacts', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'atomic-sync-test-'));
  try {
    const targetFile = path.join(tempDir, 'nested/subdir/active-selection.json');

    // 1. First write creates nested directories
    writeJsonAtomicSync(targetFile, { initial: true, count: 1 });
    assert.ok(fs.existsSync(targetFile), 'Target file must exist');
    const firstRead = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
    assert.equal(firstRead.count, 1);

    // 2. Overwrite atomically 50 times in rapid sequence
    for (let i = 2; i <= 50; i++) {
      writeJsonAtomicSync(targetFile, { initial: false, count: i });
      const readBack = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
      assert.equal(readBack.count, i);
    }

    // 3. Verify no lingering .tmp files
    const allFiles = fs.readdirSync(path.dirname(targetFile));
    const tmpFiles = allFiles.filter(f => f.endsWith('.tmp'));
    assert.equal(tmpFiles.length, 0, 'No temporary files must linger in target directory');
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('Suite 4: POST /__dna_live_select atomic persistence to .dna/live-selection.json & mirrored fallback', async () => {
  const fixture = await createFixtureServer({
    'clientes/delta-corp/site/index.html': '<html><body><section data-ds="sec9876">Section</section></body></html>'
  });

  const livePayload = {
    clientSlug: 'delta-corp',
    dsId: 'sec9876',
    dataDs: 'sec9876',
    sourceLineRange: '10-25',
    line: 10,
    capsuleId: 'capsule-hero-section',
    tagName: 'section',
    outerHTML: '<section data-ds="sec9876" data-capsule-id="capsule-hero-section">Section</section>',
    boundingBox: {
      x: 50,
      y: 120,
      width: 1140,
      height: 480,
      viewportWidth: 1440,
      viewportHeight: 900
    },
    computedStyles: {
      display: 'block',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '-0.01em',
      color: 'rgb(240, 240, 240)',
      backgroundColor: 'rgb(10, 10, 15)',
      padding: '40px',
      gap: '16px'
    },
    kineticTelemetry: {
      fps: 60,
      scrollVelocity: 0,
      activeTracesCount: 2
    }
  };

  const postRes = await requestTo(fixture.port, '/__dna_live_select', {
    method: 'POST',
    body: livePayload
  });

  assert.equal(postRes.statusCode, 200);
  assert.equal(postRes.body.ok, true);
  assert.equal(postRes.body.clientSlug, 'delta-corp');
  assert.equal(postRes.body.dsId, 'sec9876');
  assert.equal(postRes.body.dataDs, 'sec9876');

  // Verify primary v3.0 destination: clientes/<slug>/.dna/live-selection.json
  const primaryDnaPath = path.join(fixture.clientesDir, 'delta-corp', '.dna', 'live-selection.json');
  assert.ok(fs.existsSync(primaryDnaPath), 'Primary selection file in .dna/ must exist');
  const primaryData = JSON.parse(fs.readFileSync(primaryDnaPath, 'utf8'));
  assert.equal(primaryData.dsId, 'sec9876');
  assert.equal(primaryData.capsuleId, 'capsule-hero-section');
  assert.equal(primaryData.sourceLineRange, '10-25');
  assert.equal(primaryData.computedStyles.fontFamily, 'Inter, sans-serif');

  // Verify mirrored client fallback: clientes/<slug>/.domscribe/live-selection.json
  const clientDomscribePath = path.join(fixture.clientesDir, 'delta-corp', '.domscribe', 'live-selection.json');
  assert.ok(fs.existsSync(clientDomscribePath), 'Mirrored client .domscribe/ file must exist');

  // Verify mirrored root fallback: .domscribe/live-selection-<slug>.json
  const rootDomscribePath = path.join(fixture.rootDir, '.domscribe', 'live-selection-delta-corp.json');
  assert.ok(fs.existsSync(rootDomscribePath), 'Mirrored root .domscribe/ file must exist');

  // In-memory verification
  const inMemory = getLiveSelection('delta-corp');
  assert.ok(inMemory, 'getLiveSelection must return selection from memory');
  assert.equal(inMemory.dsId, 'sec9876');

  await fixture.close();
});

test('Suite 5: GET /__dna_live_select/:slug disk fallback & security', async () => {
  const fixture = await createFixtureServer();

  // 1. Manually write to .dna/ without touching memory
  const manualDnaPath = path.join(fixture.clientesDir, 'cold-client', '.dna', 'live-selection.json');
  writeJsonAtomicSync(manualDnaPath, {
    clientSlug: 'cold-client',
    dsId: 'cold-1122',
    dataDs: 'cold-1122',
    tagName: 'div'
  });

  // Query GET: should fall back to disk
  const getRes = await requestTo(fixture.port, '/__dna_live_select/cold-client');
  assert.equal(getRes.statusCode, 200);
  assert.equal(getRes.body.ok, true);
  assert.equal(getRes.body.dsId, 'cold-1122');

  // 2. Query unknown client
  const notFoundRes = await requestTo(fixture.port, '/__dna_live_select/ghost-client');
  assert.equal(notFoundRes.statusCode, 404);

  // 3. Query directory traversal
  const traversalRes = await requestTo(fixture.port, '/__dna_live_select/%2e%2e%2f%2e%2e%2fetc');
  assert.equal(traversalRes.statusCode, 400);

  await fixture.close();
});

test('Suite 6: Hot-Swap Server-Sent Events (SSE) & Notification Channel', async () => {
  const fixture = await createFixtureServer();

  // Connect to SSE stream
  const sseReq = http.request({
    host: '127.0.0.1',
    port: fixture.port,
    path: '/__dna_live_events?client=sse-client',
    headers: { Accept: 'text/event-stream' }
  });

  const sseChunks = [];
  const ssePromise = new Promise((resolve) => {
    sseReq.on('response', (res) => {
      assert.equal(res.statusCode, 200);
      assert.equal(res.headers['content-type'], 'text/event-stream; charset=utf-8');
      res.on('data', chunk => {
        sseChunks.push(chunk.toString('utf8'));
        if (sseChunks.join('').includes('event: hotswap')) {
          resolve(sseChunks.join(''));
        }
      });
    });
  });
  sseReq.end();

  // Allow SSE client to register
  await new Promise(r => setTimeout(r, 60));

  // Dispatch notification via POST /__dna_live_notify
  const notifyRes = await requestTo(fixture.port, '/__dna_live_notify', {
    method: 'POST',
    body: {
      clientSlug: 'sse-client',
      dsId: 'hot-99',
      updatedHtml: '<button data-ds="hot-99">Updated</button>',
      updatedScopedCss: '@scope (.hot-99) { button { color: red; } }'
    }
  });
  assert.equal(notifyRes.statusCode, 200);
  assert.equal(notifyRes.body.notified, true);

  // Await SSE message
  const sseOutput = await ssePromise;
  assert.ok(sseOutput.includes('event: hotswap'), 'Must receive hotswap event');
  assert.ok(sseOutput.includes('"dsId":"hot-99"'), 'Payload must include updated dsId');

  sseReq.destroy();
  await fixture.close();
});

test('Suite 7: HybridRepository Live Selection Synchronization', async () => {
  const fixture = await createFixtureServer();
  assert.ok(fixture.server.hybridRepo, 'server.hybridRepo must be initialized');

  const repo = fixture.server.hybridRepo;
  repo.setLiveSelection('sync-client', {
    clientSlug: 'sync-client',
    dsId: 'synced-77',
    dataDs: 'synced-77',
    tagName: 'header'
  });

  const retrieved = repo.getLiveSelection('sync-client');
  assert.ok(retrieved, 'Must retrieve live selection from HybridRepository');
  assert.equal(retrieved.dsId, 'synced-77');

  await fixture.close();
});
