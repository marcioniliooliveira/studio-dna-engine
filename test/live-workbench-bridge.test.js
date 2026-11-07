'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');

const { startPreviewServer } = require('../src/server/preview-server');
const { createStudioDnaMcpServer } = require('../src/mcp/index');
const {
  extractSelectionPayload,
  applyDirectionHotSwap,
  applyImpeccableVerb,
  calculateParetoScore,
  DIRECTIONS,
  IMPECCABLE_VERBS
} = require('../src/dev/dev-hud');

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
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-dna-workbench-'));
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

test('Suite 1: POST /__dna_live_select registers selection and persists cache', async () => {
  const fixture = await createFixtureServer({
    'clientes/alpha-test/site/index.html': '<html><body><section data-ds="f4e3d2c1">Hello</section></body></html>'
  });

  const payload = {
    clientSlug: 'alpha-test',
    dataDs: 'f4e3d2c1',
    line: 1,
    tagName: 'section',
    selector: '[data-ds="f4e3d2c1"]',
    computedStyles: {
      color: 'rgb(250, 250, 249)',
      backgroundColor: 'rgb(3, 5, 8)'
    },
    boundingBox: {
      top: 0,
      left: 0,
      width: 1200,
      height: 600
    },
    activeScopeVars: {
      '--primary': '#38bdf8'
    },
    telemetry: {
      fps: 60,
      scrollVelocity: 0
    }
  };

  const postRes = await requestTo(fixture.port, '/__dna_live_select', {
    method: 'POST',
    body: payload
  });

  assert.equal(postRes.statusCode, 200);
  assert.equal(postRes.body.ok, true);
  assert.equal(postRes.body.clientSlug, 'alpha-test');
  assert.equal(postRes.body.dataDs, 'f4e3d2c1');

  // Verify disk cache in .domscribe
  const cachePath = path.join(fixture.rootDir, '.domscribe', 'live-selection-alpha-test.json');
  assert.ok(fs.existsSync(cachePath), 'Cache file must be created in .domscribe/');
  const cachedData = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  assert.equal(cachedData.dataDs, 'f4e3d2c1');

  // GET /__dna_live_select/alpha-test
  const getRes = await requestTo(fixture.port, '/__dna_live_select/alpha-test');
  assert.equal(getRes.statusCode, 200);
  assert.equal(getRes.body.ok, true);
  assert.equal(getRes.body.dataDs, 'f4e3d2c1');

  await fixture.close();
});

test('Suite 2: /__dna_live_select rejects path traversal and invalid payloads', async () => {
  const fixture = await createFixtureServer();

  // Traversal in POST
  const postTraversal = await requestTo(fixture.port, '/__dna_live_select', {
    method: 'POST',
    body: {
      clientSlug: '../../outside',
      dataDs: 'test1234'
    }
  });
  assert.equal(postTraversal.statusCode, 400);

  // Missing clientSlug in POST
  const postMissing = await requestTo(fixture.port, '/__dna_live_select', {
    method: 'POST',
    body: {
      dataDs: 'test1234'
    }
  });
  assert.equal(postMissing.statusCode, 400);

  // Traversal in GET
  const getTraversal = await requestTo(fixture.port, '/__dna_live_select/%2e%2e/passwd');
  assert.equal(getTraversal.statusCode, 400);

  // 404 for unknown client
  const getNotFound = await requestTo(fixture.port, '/__dna_live_select/unknown-client-slug');
  assert.equal(getNotFound.statusCode, 404);

  await fixture.close();
});

test('Suite 3: POST /__dna_live_approve records H02 event into ExecutionLedger & human-decision.json', async () => {
  const fixture = await createFixtureServer({
    'clientes/beta-brand/site/index.html': '<html><body>Hero</body></html>'
  });

  const approvePayload = {
    clientSlug: 'beta-brand',
    directionId: 'T03B',
    approvedByRole: 'art_director',
    sha256: 'sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789'
  };

  const approveRes = await requestTo(fixture.port, '/__dna_live_approve', {
    method: 'POST',
    body: approvePayload
  });

  assert.equal(approveRes.statusCode, 200);
  assert.equal(approveRes.body.ok, true);
  assert.equal(approveRes.body.directionId, 'T03B');
  assert.equal(approveRes.body.gate, 'H02');
  assert.equal(approveRes.body.approved, true);

  // Verify human-decision.json in client dir
  const decisionPath = path.join(fixture.clientesDir, 'beta-brand', 'human-decision.json');
  assert.ok(fs.existsSync(decisionPath), 'human-decision.json must be written');
  const decision = JSON.parse(fs.readFileSync(decisionPath, 'utf8'));
  assert.equal(decision.selectedDirection, 'T03B');
  assert.equal(decision.gate, 'H02');

  // Verify EXECUTION_LEDGER.json in client dir
  const ledgerPath = path.join(fixture.clientesDir, 'beta-brand', 'EXECUTION_LEDGER.json');
  assert.ok(fs.existsSync(ledgerPath), 'EXECUTION_LEDGER.json must exist');
  const ledgerData = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
  const run = ledgerData.runs[0];
  assert.ok(run, 'Ledger must have a run');
  assert.equal(run.gates.H02.approved, true);
  const h02Event = run.events.find(e => e.gate === 'H02');
  assert.ok(h02Event, 'Must have recorded H02 event in ledger');

  // Traversal rejected
  const traversalRes = await requestTo(fixture.port, '/__dna_live_approve', {
    method: 'POST',
    body: {
      clientSlug: '../escaped',
      directionId: 'T03B'
    }
  });
  assert.equal(traversalRes.statusCode, 400);

  await fixture.close();
});

test('Suite 4: MCP dynamic resource client://{slug}/live-selection resolves correctly', async () => {
  const server = createStudioDnaMcpServer();
  const template = server._registeredResourceTemplates['client-live-selection'];

  assert.ok(template, 'Resource template client-live-selection must be registered');
  assert.equal(typeof template.readCallback, 'function');

  // Test traversal rejection
  await assert.rejects(
    async () => {
      await template.readCallback(
        new URL('client://../../unsafe/live-selection'),
        { slug: '../../unsafe' }
      );
    },
    /Invalid slug/
  );

  // Test resolution when no selection exists
  const fallbackRes = await template.readCallback(
    new URL('client://unselected-client/live-selection'),
    { slug: 'unselected-client' }
  );
  assert.equal(fallbackRes.contents[0].uri, 'client://unselected-client/live-selection');
  assert.equal(fallbackRes.contents[0].mimeType, 'application/json');
  const fallbackData = JSON.parse(fallbackRes.contents[0].text);
  assert.equal(fallbackData.clientSlug, 'unselected-client');

  // Test resolution when cache exists
  const testSlug = 'negocia-bem';
  const domscribeDir = path.resolve(__dirname, '../.domscribe');
  if (!fs.existsSync(domscribeDir)) fs.mkdirSync(domscribeDir, { recursive: true });
  const cacheFile = path.join(domscribeDir, `live-selection-${testSlug}.json`);
  fs.writeFileSync(cacheFile, JSON.stringify({
    clientSlug: testSlug,
    dataDs: '88776655',
    tagName: 'main',
    selector: 'main#app'
  }, null, 2), 'utf8');

  try {
    const successRes = await template.readCallback(
      new URL(`client://${testSlug}/live-selection`),
      { slug: testSlug }
    );
    const parsed = JSON.parse(successRes.contents[0].text);
    assert.equal(parsed.clientSlug, testSlug);
    assert.equal(parsed.dataDs, '88776655');
  } finally {
    if (fs.existsSync(cacheFile)) fs.unlinkSync(cacheFile);
  }
});

test('Suite 5: extractSelectionPayload correctly reads DOM element with data-ds', () => {
  // Mock element hierarchy
  const mockChild = {
    tagName: 'BUTTON',
    id: 'cta-btn',
    getAttribute(attr) {
      if (attr === 'data-ds') return 'btn12345';
      if (attr === 'data-dna-line') return '42';
      return null;
    },
    closest(sel) {
      if (sel === '[data-ds]') return this;
      return null;
    },
    getBoundingClientRect() {
      return { top: 100, left: 200, width: 160, height: 48, x: 200, y: 100 };
    }
  };

  const mockWindow = {
    location: { pathname: '/clientes/elyse-luxe/site/index.html' },
    getComputedStyle(el) {
      return {
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(56, 189, 248)',
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '24px',
        display: 'inline-flex',
        position: 'relative',
        padding: '12px 24px',
        margin: '0px',
        opacity: '1'
      };
    },
    __DNA_TELEMETRY__: { fps: 59.8, worker: 'single-worker' }
  };

  const payload = extractSelectionPayload(mockChild, mockWindow);
  assert.equal(payload.clientSlug, 'elyse-luxe');
  assert.equal(payload.dataDs, 'btn12345');
  assert.equal(payload.line, 42);
  assert.equal(payload.tagName, 'button');
  assert.equal(payload.selector, 'button#cta-btn');
  assert.equal(payload.computedStyles.backgroundColor, 'rgb(56, 189, 248)');
  assert.equal(payload.boundingBox.width, 160);
  assert.equal(payload.telemetry.fps, 59.8);
});

test('Suite 6: Hot-swap of 3 directions and 7 Impeccable verbs mutate styles', () => {
  const mockStyles = {};
  const mockDoc = {
    documentElement: {
      style: {
        setProperty(k, v) { mockStyles[k] = v; },
        getPropertyValue(k) { return mockStyles[k] || ''; }
      },
      setAttribute(k, v) { this[k] = v; }
    },
    body: {
      classList: {
        classes: new Set(),
        add(c) { this.classes.add(c); },
        remove(c) { this.classes.delete(c); },
        contains(c) { return this.classes.has(c); }
      }
    }
  };

  // Test 3 Directions
  assert.ok(DIRECTIONS.T03A, 'T03A direction must be defined');
  assert.ok(DIRECTIONS.T03B, 'T03B direction must be defined');
  assert.ok(DIRECTIONS.T03C, 'T03C direction must be defined');

  // Hot-swap T03A
  applyDirectionHotSwap('T03A', mockDoc);
  assert.equal(mockDoc.documentElement['data-direction'], 'T03A');
  assert.equal(mockStyles['--bg-base'], '#030508');

  // Hot-swap T03B
  applyDirectionHotSwap('T03B', mockDoc);
  assert.equal(mockDoc.documentElement['data-direction'], 'T03B');
  assert.equal(mockStyles['--bg-base'], '#0a0a0a');

  // Hot-swap T03C
  applyDirectionHotSwap('T03C', mockDoc);
  assert.equal(mockDoc.documentElement['data-direction'], 'T03C');
  assert.equal(mockStyles['--bg-base'], '#07080a');

  // Test 7 Impeccable Verbs
  const expectedVerbs = ['bolder', 'quieter', 'distill', 'typeset', 'polish', 'animate', 'harden'];
  for (const verb of expectedVerbs) {
    assert.ok(IMPECCABLE_VERBS.includes(verb), `Verb ${verb} must be in IMPECCABLE_VERBS`);
    const result = applyImpeccableVerb(verb, mockDoc);
    assert.equal(result.verb, verb);
    assert.equal(result.ok, true);
  }

  // Test Pareto Score 70/30 calculation
  const score = calculateParetoScore({
    apcaLc: 82.5,
    ittiKochSaliency: 0.88,
    zeroOverlapAABB: true,
    performanceScore: 95
  });
  assert.ok(score >= 0 && score <= 100, 'Score must be between 0 and 100');
  assert.ok(score >= 80, 'Score should reflect strong metrics');
});
