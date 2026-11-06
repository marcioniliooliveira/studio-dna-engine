const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');
const { createArtifactRegistry } = require('../src/orchestration/artifact-registry');

function loadVerifier() {
  try {
    return require('../src/execution/result-verifier').createResultVerifier;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') return undefined;
    throw error;
  }
}

function taskPackage(gates = ['qa.core']) {
  return {
    v: 1,
    rid: 'run-001',
    cid: 'client-alpha',
    nid: 'build-site',
    out: [],
    g: gates,
    p: []
  };
}

function taskResult(overrides = {}) {
  return {
    v: 1,
    rid: 'run-001',
    cid: 'client-alpha',
    nid: 'build-site',
    st: 'ok',
    art: [],
    chg: [],
    use: { it: 1, ct: 1, ot: 1 },
    err: null,
    ...overrides
  };
}

function withRegistry(t) {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'result-verifier-'));
  t.after(() => fs.rmSync(rootDir, { recursive: true, force: true }));
  return { rootDir, artifactRegistry: createArtifactRegistry({ rootDir, now: () => 0 }) };
}

test('rejects an executor self-certification when its declared core gate fails', async (t) => {
  const createResultVerifier = loadVerifier();
  assert.equal(typeof createResultVerifier, 'function');
  const { artifactRegistry } = withRegistry(t);
  const verifier = createResultVerifier({
    gateCatalog: {
      'qa.core': async () => ({ passed: false, evidence: { consoleErrors: 1 } })
    },
    artifactRegistry
  });

  const verification = await verifier.verify({
    taskPackage: taskPackage(),
    taskResult: taskResult({ st: 'ok' })
  });

  assert.equal(verification.passed, false);
  assert.deepEqual(verification.gateResults, [{ id: 'qa.core', passed: false, evidence: { consoleErrors: 1 } }]);
  assert.notEqual(verification.passed, taskResult({ st: 'ok' }).st === 'ok');
});

test('rejects command-shaped executor results and runs only package-declared gates', async (t) => {
  const createResultVerifier = loadVerifier();
  assert.equal(typeof createResultVerifier, 'function');
  const { artifactRegistry } = withRegistry(t);
  const called = [];
  const verifier = createResultVerifier({
    gateCatalog: {
      'qa.core': async () => { called.push('qa.core'); return { passed: true, evidence: { report: 'core' } }; },
      'test.focused': async () => { called.push('test.focused'); return { passed: true, evidence: { report: 'focused' } }; }
    },
    artifactRegistry
  });

  const malformed = await verifier.verify({
    taskPackage: taskPackage(['qa.core']),
    taskResult: taskResult({ cmd: 'powershell Remove-Item -Recurse -Force .' })
  });
  assert.equal(malformed.passed, false);
  assert.equal(malformed.gateResults[0].evidence.code, 'TASK_RESULT_SCHEMA_INVALID');
  assert.equal(malformed.evidence.verifierArtifact.type, 'verification');
  assert.deepEqual(called, []);

  const verification = await verifier.verify({ taskPackage: taskPackage(['qa.core']), taskResult: taskResult() });
  assert.equal(verification.passed, true);
  assert.deepEqual(called, ['qa.core']);
});

test('fails artifact integrity before running any gate when an executor artifact changes', async (t) => {
  const createResultVerifier = loadVerifier();
  assert.equal(typeof createResultVerifier, 'function');
  const { rootDir, artifactRegistry } = withRegistry(t);
  const candidate = artifactRegistry.putJson({
    runId: 'run-001', clientId: 'client-alpha', type: 'site', value: { version: 1 }, sources: []
  });
  fs.writeFileSync(path.join(rootDir, candidate.relativePath), '{"sources":[],"value":{"version":2}}', 'utf8');
  let gateCalls = 0;
  const verifier = createResultVerifier({
    gateCatalog: {
      'qa.core': async () => { gateCalls += 1; return { passed: true, evidence: {} }; }
    },
    artifactRegistry
  });

  const verification = await verifier.verify({
    taskPackage: { ...taskPackage(), out: ['site'] },
    taskResult: taskResult({ art: [{ id: 'site', sha: candidate.sha256 }] })
  });

  assert.equal(verification.passed, false);
  assert.equal(verification.gateResults[0].id, 'artifact.hash');
  assert.equal(verification.gateResults[0].passed, false);
  assert.equal(verification.gateResults[0].evidence.code, 'ARTIFACT_HASH_MISMATCH');
  assert.equal(verification.gateResults[0].evidence.artifactId, 'site');
  assert.equal(verification.gateResults[0].evidence.artifactRef.type, 'site');
  assert.deepEqual(verification.artifactRefs, []);
  assert.equal(verification.evidence.verifierArtifact.type, 'verification');
  assert.equal(gateCalls, 0);
});

test('rejects missing and duplicate declared output artifacts before any gate runs', async (t) => {
  const createResultVerifier = loadVerifier();
  const { artifactRegistry } = withRegistry(t);
  const candidate = artifactRegistry.putJson({
    runId: 'run-001', clientId: 'client-alpha', type: 'site', value: { version: 1 }, sources: []
  });
  let gateCalls = 0;
  const verifier = createResultVerifier({
    gateCatalog: { 'qa.core': async () => { gateCalls += 1; return { passed: true }; } },
    artifactRegistry
  });
  const packageForSite = { ...taskPackage(), out: ['site'] };

  for (const art of [[], [{ id: 'site', sha: candidate.sha256 }, { id: 'site', sha: candidate.sha256 }]]) {
    const verification = await verifier.verify({ taskPackage: packageForSite, taskResult: taskResult({ art }) });
    assert.equal(verification.passed, false);
    assert.deepEqual(verification.gateResults, [{
      id: 'artifact.manifest', passed: false, evidence: { code: 'TASK_RESULT_OUTPUTS_INVALID' }
    }]);
    assert.equal(verification.evidence.verifierArtifact.type, 'verification');
  }
  assert.equal(gateCalls, 0);
});

test('preserves verified and claimed artifact references when a later output hash fails', async (t) => {
  const createResultVerifier = loadVerifier();
  const { rootDir, artifactRegistry } = withRegistry(t);
  const first = artifactRegistry.putJson({
    runId: 'run-001', clientId: 'client-alpha', type: 'first', value: { version: 1 }, sources: []
  });
  const second = artifactRegistry.putJson({
    runId: 'run-001', clientId: 'client-alpha', type: 'second', value: { version: 1 }, sources: []
  });
  fs.writeFileSync(path.join(rootDir, second.relativePath), '{"sources":[],"value":{"version":2}}', 'utf8');
  const verifier = createResultVerifier({
    gateCatalog: { 'qa.core': async () => ({ passed: true }) },
    artifactRegistry
  });
  const verification = await verifier.verify({
    taskPackage: { ...taskPackage(), out: ['first', 'second'] },
    taskResult: taskResult({ art: [{ id: 'first', sha: first.sha256 }, { id: 'second', sha: second.sha256 }] })
  });

  assert.deepEqual(verification.artifactRefs, [first]);
  const persisted = artifactRegistry.read(verification.evidence.verifierArtifact);
  assert.deepEqual(persisted.sources, [first, second]);
  assert.deepEqual(persisted.value.gateResults[0].evidence.artifactRef, second);
});
