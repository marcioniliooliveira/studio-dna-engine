const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');
const { createArtifactRegistry } = require('../src/orchestration/artifact-registry');

function withRegistry(t) {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'artifact-registry-'));
  t.after(() => fs.rmSync(rootDir, { recursive: true, force: true }));
  return { rootDir, registry: createArtifactRegistry({ rootDir, now: () => 0 }) };
}

test('reuses the same reference for equivalent JSON and changes it when content changes', (t) => {
  const { registry } = withRegistry(t);
  const first = registry.putJson({
    runId: 'run-001', clientId: 'client-alpha', type: 'blueprint',
    value: { beta: 2, alpha: { z: true, a: 1 } }, sources: ['ctx-1']
  });
  const second = registry.putJson({
    runId: 'run-001', clientId: 'client-alpha', type: 'blueprint',
    value: { alpha: { a: 1, z: true }, beta: 2 }, sources: ['ctx-1']
  });
  const changed = registry.putJson({
    runId: 'run-001', clientId: 'client-alpha', type: 'blueprint',
    value: { alpha: { a: 1, z: false }, beta: 2 }, sources: ['ctx-1']
  });

  assert.deepEqual(second, first);
  assert.notEqual(changed.sha256, first.sha256);
  assert.deepEqual(registry.read(first), {
    sources: ['ctx-1'],
    value: { alpha: { a: 1, z: true }, beta: 2 }
  });
});

test('rejects a reference presented by a different client', (t) => {
  const { registry } = withRegistry(t);
  const ref = registry.putJson({
    runId: 'run-001', clientId: 'client-alpha', type: 'blueprint', value: { ok: true }, sources: []
  });

  assert.throws(
    () => registry.read({ ...ref, clientId: 'client-beta' }),
    (error) => error.code === 'ARTIFACT_CLIENT_MISMATCH'
  );
});

test('detects stored artifact corruption', (t) => {
  const { registry, rootDir } = withRegistry(t);
  const ref = registry.putJson({
    runId: 'run-001', clientId: 'client-alpha', type: 'blueprint', value: { ok: true }, sources: []
  });
  fs.writeFileSync(path.join(rootDir, ref.relativePath), '{"value":{"ok":false},"sources":[]}');

  assert.throws(
    () => registry.verify(ref),
    (error) => error.code === 'ARTIFACT_HASH_MISMATCH'
  );
});

test('rejects unsafe slugs before creating artifact directories', (t) => {
  const { registry, rootDir } = withRegistry(t);

  assert.throws(
    () => registry.putJson({
      runId: 'run-001', clientId: '../client', type: 'blueprint', value: { ok: true }, sources: []
    }),
    /unsafe slug/i
  );
  assert.deepEqual(fs.readdirSync(rootDir), []);
});
