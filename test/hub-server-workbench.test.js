const test = require('node:test');
const assert = require('node:assert/strict');
const { startPreviewServer } = require('../src/server/preview-server');

function listen(server) {
  return new Promise((resolve) => {
    if (server.listening) {
      resolve(server.address().port);
      return;
    }
    server.once('listening', () => resolve(server.address().port));
  });
}

function close(server) {
  return new Promise((resolve) => server.close(() => resolve()));
}

test('Hub GenUI Workbench & Server API: exposes 8 components, DraggableWidgetGrid state, and interactive mutations', async (t) => {
  const token = 'hub-test-secret-token';
  const server = startPreviewServer({
    port: 0,
    silent: true,
    enableMutations: true,
    mutationToken: token
  });
  t.after(() => close(server));

  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;

  // 1. Dashboard HTML includes Hub GenUI & Bento Grid tab
  const dashRes = await fetch(`${baseUrl}/`);
  assert.equal(dashRes.status, 200);
  const dashHtml = await dashRes.text();
  assert.ok(dashHtml.includes('tab-hub-genui'));
  assert.ok(dashHtml.includes('DraggableWidgetGrid (21st.dev)'));

  // 2. GET /api/hub/components returns all 8 canonical components & initial Bento Grid
  const catalogRes = await fetch(`${baseUrl}/api/hub/components`);
  assert.equal(catalogRes.status, 200);
  const catalogData = await catalogRes.json();
  assert.equal(catalogData.success, true);
  assert.equal(catalogData.totalComponents, 8);
  assert.equal(catalogData.grid.widgets.length, 4);

  // 3. GET /api/hub/components/DraggableWidgetGrid returns TSX + GenUI spec
  const compRes = await fetch(`${baseUrl}/api/hub/components/DraggableWidgetGrid`);
  assert.equal(compRes.status, 200);
  const compData = await compRes.json();
  assert.equal(compData.archetypeId, 'DraggableWidgetGrid');
  assert.ok(compData.reactTsx.includes('export const DraggableWidgetGrid'));
  assert.equal(compData.genUiSpec.layout.type, 'bento-draggable-grid');

  // 4. POST /api/hub/widget-grid reorders and resizes widgets with SHA-256 signature
  const reorderRes = await fetch(`${baseUrl}/api/hub/widget-grid`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      action: 'reorder',
      sourceWidgetId: 'w-timeline',
      targetWidgetId: 'w-approval',
      principalId: 'operator-live'
    })
  });
  assert.equal(reorderRes.status, 200);
  const reorderData = await reorderRes.json();
  assert.equal(reorderData.topic, 'agent.genui.layout_updated');
  assert.deepEqual(reorderData.orderedIds.slice(0, 2), ['w-timeline', 'w-approval']);
  assert.match(reorderData.signature, /^[a-f0-9]{64}$/);

  const resizeRes = await fetch(`${baseUrl}/api/hub/widget-grid`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      action: 'resize',
      widgetId: 'w-approval',
      newSpan: '2x2',
      principalId: 'operator-live'
    })
  });
  assert.equal(resizeRes.status, 200);
  const resizeData = await resizeRes.json();
  assert.equal(resizeData.topic, 'agent.genui.widget_resized');
  assert.equal(resizeData.newSpan, '2x2');

  // 5. POST /api/hub/ingest-registry parses npx shadcn@latest add command
  const ingestRes = await fetch(`${baseUrl}/api/hub/ingest-registry`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      commandOrUrl: 'npx shadcn@latest add "https://21st.dev/r/carolinaraulino/draggable-widget-grid"',
      payload: { name: 'draggable-widget-grid', dependencies: ['framer-motion'] }
    })
  });
  assert.equal(ingestRes.status, 200);
  const ingestData = await ingestRes.json();
  assert.equal(ingestData.manifest.componentId, 'carolinaraulino-draggable-widget-grid');
});
