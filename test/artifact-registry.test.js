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

test('does not replace a destination created while publishing', (t) => {
  const { registry } = withRegistry(t);
  const originalLinkSync = fs.linkSync;
  t.after(() => { fs.linkSync = originalLinkSync; });

  fs.linkSync = (source, destination) => {
    fs.writeFileSync(destination, 'concurrent-content');
    return originalLinkSync(source, destination);
  };

  assert.throws(
    () => registry.putJson({
      runId: 'run-001', clientId: 'client-alpha', type: 'blueprint', value: { ok: true }, sources: []
    }),
    (error) => error.code === 'ARTIFACT_HASH_MISMATCH'
  );
});

test('rejects artifact directories that resolve through a client symlink', (t) => {
  const { registry, rootDir } = withRegistry(t);
  const externalDir = fs.mkdtempSync(path.join(os.tmpdir(), 'artifact-registry-external-'));
  const clientDir = path.join(rootDir, 'client-alpha');
  fs.symlinkSync(externalDir, clientDir, 'junction');
  t.after(() => fs.rmSync(externalDir, { recursive: true, force: true }));

  assert.throws(
    () => registry.putJson({
      runId: 'run-001', clientId: 'client-alpha', type: 'blueprint', value: { ok: true }, sources: []
    }),
    (error) => error.code === 'ARTIFACT_PATH_ESCAPE'
  );
  assert.deepEqual(fs.readdirSync(externalDir), []);
});

test('rejects non-JSON-safe values before creating artifact directories', (t) => {
  const cases = [
    ['undefined', { value: undefined }],
    ['function', { value: () => {} }],
    ['symbol', { value: Symbol('token') }],
    ['nonfinite number', { value: Number.NaN }],
    ['nested undefined', { value: { nested: undefined } }]
  ];

  for (const [name, input] of cases) {
    const { registry, rootDir } = withRegistry(t);
    assert.throws(
      () => registry.putJson({ runId: 'run-001', clientId: 'client-alpha', type: 'blueprint', sources: [], ...input }),
      /JSON-safe/i,
      name
    );
    assert.deepEqual(fs.readdirSync(rootDir), [], name);
  }
});
