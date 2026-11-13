'use strict';

/**
 * test/mcp-live-selection.test.js
 *
 * Validates the Live-MCP Bidirectional Bridge (Spike 2) MCP Server Integration:
 * 1. MCP Dynamic Resource client://{slug}/live-selection Resolution Priority & Security
 * 2. Tool update_selected_element Input Validation & Security
 * 3. Strict Donut Scope Validation Guard
 * 4. APCA Perceptual Contrast Evaluation Guard
 * 5. Surgical Cheerio DOM Mutation & Atomic Persistence
 * 6. Connected MCP Client Handshake via InMemoryTransport
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { InMemoryTransport } = require('@modelcontextprotocol/sdk/inMemory.js');

const { createStudioDnaMcpServer } = require('../src/mcp/index');
const { UpdateSelectedElementSchema, getSafeClientDir } = require('../src/mcp/schemas');
const { setLiveSelection, getLiveSelection, writeJsonAtomicSync } = require('../src/server/preview-server');

const TEST_SLUG = 'test-live-bridge';
const ROOT_DIR = path.resolve(__dirname, '..');
const TEST_CLIENT_DIR = path.join(ROOT_DIR, 'clientes', TEST_SLUG);

function setupTestFixture() {
  cleanupTestFixture();
  const siteDir = path.join(TEST_CLIENT_DIR, 'site');
  const dnaDir = path.join(TEST_CLIENT_DIR, '.dna');
  fs.mkdirSync(siteDir, { recursive: true });
  fs.mkdirSync(dnaDir, { recursive: true });

  const initialHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Live Test Client</title>
</head>
<body>
  <header id="main-header" data-ds="hdr-1111" data-capsule-id="hero-capsule">
    <h1 data-ds="h1-2222" data-slot="title">Original Title</h1>
    <button id="cta" data-ds="btn-3333" class="btn-primary">Original Button</button>
  </header>
</body>
</html>`;

  fs.writeFileSync(path.join(siteDir, 'index.html'), initialHtml, 'utf8');

  const initialSelection = {
    clientSlug: TEST_SLUG,
    dsId: 'btn-3333',
    dataDs: 'btn-3333',
    sourceLineRange: '9-9',
    line: 9,
    capsuleId: 'hero-capsule',
    tagName: 'button',
    selector: 'button#cta',
    outerHTML: '<button id="cta" data-ds="btn-3333" class="btn-primary">Original Button</button>',
    boundingBox: { x: 50, y: 100, width: 120, height: 40, top: 100, left: 50, viewportWidth: 1440, viewportHeight: 900 },
    computedStyles: {
      display: 'inline-block',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      color: 'rgb(255, 255, 255)',
      backgroundColor: 'rgb(10, 10, 15)'
    },
    timestamp: Date.now()
  };

  writeJsonAtomicSync(path.join(dnaDir, 'live-selection.json'), initialSelection);
  return { siteDir, dnaDir, initialSelection };
}

function cleanupTestFixture() {
  if (fs.existsSync(TEST_CLIENT_DIR)) {
    try {
      fs.rmSync(TEST_CLIENT_DIR, { recursive: true, force: true });
    } catch (_) {}
  }
  const rootLegacy = path.join(ROOT_DIR, '.domscribe', `live-selection-${TEST_SLUG}.json`);
  if (fs.existsSync(rootLegacy)) {
    try {
      fs.unlinkSync(rootLegacy);
    } catch (_) {}
  }
  setLiveSelection(TEST_SLUG, null);
}

test('MCP Suite 1: MCP Dynamic Resource client://{slug}/live-selection Resolution Priority & Security', async () => {
  setupTestFixture();
  const server = createStudioDnaMcpServer();
  const template = server._registeredResourceTemplates['client-live-selection'];
  assert.ok(template && template.readCallback, 'client-live-selection resource template must exist');

  try {
    // 1. Priority 1: Primary .dna/live-selection.json on disk
    const res1 = await template.readCallback(
      new URL(`client://${TEST_SLUG}/live-selection`),
      { slug: TEST_SLUG }
    );
    assert.ok(res1.contents && res1.contents.length > 0);
    const parsed1 = JSON.parse(res1.contents[0].text);
    assert.equal(parsed1.dsId, 'btn-3333');
    assert.equal(parsed1.capsuleId, 'hero-capsule');

    // 2. Priority 2: In-memory store when disk file is deleted
    const diskPath = path.join(TEST_CLIENT_DIR, '.dna', 'live-selection.json');
    fs.unlinkSync(diskPath);
    setLiveSelection(TEST_SLUG, {
      clientSlug: TEST_SLUG,
      dsId: 'mem-9999',
      dataDs: 'mem-9999',
      source: 'in-memory'
    });

    const res2 = await template.readCallback(
      new URL(`client://${TEST_SLUG}/live-selection`),
      { slug: TEST_SLUG }
    );
    const parsed2 = JSON.parse(res2.contents[0].text);
    assert.equal(parsed2.dsId, 'mem-9999');

    // 3. Priority 3: Legacy cache on disk when memory is cleared
    setLiveSelection(TEST_SLUG, null);
    const rootLegacy = path.join(ROOT_DIR, '.domscribe', `live-selection-${TEST_SLUG}.json`);
    if (fs.existsSync(rootLegacy)) fs.unlinkSync(rootLegacy);
    const legacyPath = path.join(TEST_CLIENT_DIR, '.domscribe', 'live-selection.json');
    writeJsonAtomicSync(legacyPath, {
      clientSlug: TEST_SLUG,
      dsId: 'legacy-8888',
      dataDs: 'legacy-8888'
    });

    const res3 = await template.readCallback(
      new URL(`client://${TEST_SLUG}/live-selection`),
      { slug: TEST_SLUG }
    );
    const parsed3 = JSON.parse(res3.contents[0].text);
    assert.equal(parsed3.dsId, 'legacy-8888');

    if (fs.existsSync(legacyPath)) fs.unlinkSync(legacyPath);

    // 4. Fallback when no selection exists
    const res4 = await template.readCallback(
      new URL('client://ghost-client-xyz/live-selection'),
      { slug: 'ghost-client-xyz' }
    );
    const parsed4 = JSON.parse(res4.contents[0].text);
    assert.equal(parsed4.clientSlug, 'ghost-client-xyz');
    assert.equal(parsed4.status, 'no_selection');

    // 5. Security: Path traversal rejection
    await assert.rejects(
      async () => {
        await template.readCallback(
          new URL('client://../../etc/passwd/live-selection'),
          { slug: '../../etc/passwd' }
        );
      },
      /Invalid slug/
    );
  } finally {
    cleanupTestFixture();
  }
});

test('MCP Suite 2: Tool update_selected_element Input Validation & Security', async () => {
  setupTestFixture();
  const server = createStudioDnaMcpServer();
  const tool = server._registeredTools['update_selected_element'];
  assert.ok(tool && tool.handler, 'update_selected_element tool must be registered');

  try {
    // 1. Path traversal slug
    const resTraversal = await tool.handler({
      slug: '../../malicious',
      dsId: 'btn-3333',
      updatedHtml: '<button>Test</button>'
    });
    assert.equal(resTraversal.isError, true);
    assert.match(resTraversal.content[0].text, /Invalid slug/);

    // 2. Non-existent client
    const resNoClient = await tool.handler({
      slug: 'non-existent-client-404',
      dsId: 'btn-3333',
      updatedHtml: '<button>Test</button>'
    });
    assert.equal(resNoClient.isError, true);
    assert.match(resNoClient.content[0].text, /Cliente não encontrado/);

    // 3. Neither updatedHtml nor updatedScopedCss provided
    const resEmpty = await tool.handler({
      slug: TEST_SLUG,
      dsId: 'btn-3333'
    });
    assert.equal(resEmpty.isError, true);
    assert.match(resEmpty.content[0].text, /At least one of updatedHtml or updatedScopedCss must be provided/);

    // 4. Element data-ds not found in HTML
    const resNotFound = await tool.handler({
      slug: TEST_SLUG,
      dsId: 'btn-missing-9999',
      updatedHtml: '<button>Test</button>'
    });
    assert.equal(resNotFound.isError, true);
    assert.match(resNotFound.content[0].text, /Element with data-ds="btn-missing-9999" not found/);
  } finally {
    cleanupTestFixture();
  }
});

test('MCP Suite 3: Strict Donut Scope Validation Guard', async () => {
  setupTestFixture();
  const server = createStudioDnaMcpServer();
  const tool = server._registeredTools['update_selected_element'];

  try {
    // 1. Rejects root leak (:root)
    const resRoot = await tool.handler({
      slug: TEST_SLUG,
      dsId: 'btn-3333',
      updatedScopedCss: ':root { --accent: #ff0000; }'
    });
    assert.equal(resRoot.isError, true);
    assert.match(resRoot.content[0].text, /Strict Donut Scope Violation/);
    assert.match(resRoot.content[0].text, /Root leakage/);

    // 2. Rejects slot interior penetration ([data-capsule-slot] .descendant)
    const resSlot = await tool.handler({
      slug: TEST_SLUG,
      dsId: 'btn-3333',
      updatedScopedCss: '[data-capsule-slot] .child { font-size: 18px; }'
    });
    assert.equal(resSlot.isError, true);
    assert.match(resSlot.content[0].text, /Strict Donut Scope Violation/);
    assert.match(resSlot.content[0].text, /penetrates slot interior/);

    // 3. Accepts valid strictly scoped CSS
    const resValid = await tool.handler({
      slug: TEST_SLUG,
      dsId: 'btn-3333',
      updatedScopedCss: '@scope (.hero-capsule) to ([data-capsule-slot]) { button { padding: 16px; } }'
    });
    assert.equal(resValid.isError, undefined);
    const parsed = JSON.parse(resValid.content[0].text);
    assert.equal(parsed.status, 'success');
    assert.equal(parsed.mutatedCss, true);
  } finally {
    cleanupTestFixture();
  }
});

test('MCP Suite 4: APCA Perceptual Contrast Evaluation Guard', async () => {
  setupTestFixture();
  const server = createStudioDnaMcpServer();
  const tool = server._registeredTools['update_selected_element'];

  try {
    // 1. Rejects low-contrast colors (|Lc| < 15), e.g. #777777 on #787878
    const resLowContrast = await tool.handler({
      slug: TEST_SLUG,
      dsId: 'btn-3333',
      updatedScopedCss: '@scope (.hero-capsule) { button { color: #777777; background-color: #787878; } }'
    });
    assert.equal(resLowContrast.isError, true);
    assert.match(resLowContrast.content[0].text, /APCA Contrast Violation/);
    assert.match(resLowContrast.content[0].text, /below minimum threshold/);

    // 2. Rejects text color that clashes with context background (from live-selection.json: rgb(10, 10, 15))
    // #121216 on rgb(10, 10, 15) is very low contrast (|Lc| < 5)
    const resContextClash = await tool.handler({
      slug: TEST_SLUG,
      dsId: 'btn-3333',
      updatedScopedCss: '@scope (.hero-capsule) { button { color: #121216; } }'
    });
    assert.equal(resContextClash.isError, true);
    assert.match(resContextClash.content[0].text, /APCA Contrast Violation/);

    // 3. Accepts high-contrast compliant text (e.g. #ffffff on rgb(10, 10, 15), |Lc| > 90)
    const resHighContrast = await tool.handler({
      slug: TEST_SLUG,
      dsId: 'btn-3333',
      updatedScopedCss: '@scope (.hero-capsule) { button { color: #ffffff; background-color: #0a0a0f; } }'
    });
    assert.equal(resHighContrast.isError, undefined);
    const parsed = JSON.parse(resHighContrast.content[0].text);
    assert.equal(parsed.status, 'success');

    // 4. Passes safely without error when non-color properties are updated
    const resNonColor = await tool.handler({
      slug: TEST_SLUG,
      dsId: 'btn-3333',
      updatedScopedCss: '@scope (.hero-capsule) { button { font-size: 20px; gap: 8px; } }'
    });
    assert.equal(resNonColor.isError, undefined);
  } finally {
    cleanupTestFixture();
  }
});

test('MCP Suite 5: Surgical Cheerio DOM Mutation & Atomic Persistence', async () => {
  setupTestFixture();
  const server = createStudioDnaMcpServer();
  const tool = server._registeredTools['update_selected_element'];

  try {
    const updatedFragment = '<button id="cta" class="btn-mutated-brand">Deploy Contract</button>';
    const updatedCss = '@scope (#main-header) { .btn-mutated-brand { border-radius: 9999px; } }';

    const res = await tool.handler({
      slug: TEST_SLUG,
      dsId: 'btn-3333',
      updatedHtml: updatedFragment,
      updatedScopedCss: updatedCss
    });

    assert.equal(res.isError, undefined);
    const resultObj = JSON.parse(res.content[0].text);
    assert.equal(resultObj.status, 'success');
    assert.equal(resultObj.dsId, 'btn-3333');
    assert.equal(resultObj.mutatedHtml, true);
    assert.equal(resultObj.mutatedCss, true);

    // Verify HTML on disk
    const htmlPath = path.join(TEST_CLIENT_DIR, 'site', 'index.html');
    const mutatedHtml = fs.readFileSync(htmlPath, 'utf8');

    // Must preserve data-ds on updated element
    assert.ok(mutatedHtml.includes('data-ds="btn-3333"'), 'Mutated HTML must preserve data-ds attribute');
    assert.ok(mutatedHtml.includes('btn-mutated-brand'), 'Mutated HTML must contain new class');
    assert.ok(mutatedHtml.includes('Deploy Contract'), 'Mutated HTML must contain new inner text');

    // Must inject <style id="dna-live-scoped-css">
    assert.ok(mutatedHtml.includes('<style id="dna-live-scoped-css">'), 'Must inject scoped style element');
    assert.ok(mutatedHtml.includes('border-radius: 9999px'), 'Scoped style must contain injected CSS');

    // Verify .dna/live-selection.json on disk
    const dnaPath = path.join(TEST_CLIENT_DIR, '.dna', 'live-selection.json');
    assert.ok(fs.existsSync(dnaPath));
    const liveSelection = JSON.parse(fs.readFileSync(dnaPath, 'utf8'));
    assert.equal(liveSelection.dsId, 'btn-3333');
    assert.ok(liveSelection.outerHTML.includes('Deploy Contract'));

    // Verify memory store updated in preview-server
    const memorySelection = getLiveSelection(TEST_SLUG);
    assert.ok(memorySelection);
    assert.equal(memorySelection.dsId, 'btn-3333');
  } finally {
    cleanupTestFixture();
  }
});

test('MCP Suite 6: Connected MCP Client Handshake via InMemoryTransport', async () => {
  setupTestFixture();
  const server = createStudioDnaMcpServer();

  const client = new Client(
    { name: 'studio-dna-live-tester', version: '1.0.0' },
    { capabilities: {} }
  );

  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport)
  ]);

  try {
    // 1. Verify update_selected_element is advertised in listTools()
    const toolsRes = await client.listTools();
    const toolNames = toolsRes.tools.map(t => t.name);
    assert.ok(toolNames.includes('update_selected_element'), 'update_selected_element must be in advertised tools');

    // 2. Read live selection resource via client
    const res = await client.readResource({ uri: `client://${TEST_SLUG}/live-selection` });
    assert.ok(res.contents && res.contents.length > 0);
    const parsed = JSON.parse(res.contents[0].text);
    assert.equal(parsed.dsId, 'btn-3333');

    // 3. Call tool update_selected_element via client
    const toolCallRes = await client.callTool({
      name: 'update_selected_element',
      arguments: {
        slug: TEST_SLUG,
        dsId: 'btn-3333',
        updatedHtml: '<button id="cta" class="client-tested">Connected OK</button>'
      }
    });

    assert.equal(toolCallRes.isError, undefined);
    assert.ok(toolCallRes.content && toolCallRes.content.length > 0);
    const toolResult = JSON.parse(toolCallRes.content[0].text);
    assert.equal(toolResult.status, 'success');
    assert.equal(toolResult.dsId, 'btn-3333');

    // Verify file updated
    const mutated = fs.readFileSync(path.join(TEST_CLIENT_DIR, 'site', 'index.html'), 'utf8');
    assert.ok(mutated.includes('Connected OK'));
    assert.ok(mutated.includes('data-ds="btn-3333"'));
  } finally {
    await client.close();
    cleanupTestFixture();
  }
});
