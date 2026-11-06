const test = require('node:test');
const assert = require('node:assert/strict');
const { fingerprintFailure } = require('../src/execution/error-fingerprint');
const { decideRepair } = require('../src/execution/repair-controller');

const node = { id: 'repair-homepage', budget: { maxAttempts: 3, maxUsd: 1 } };
const runId = 'run-001';

function artifactRef(type, hash) {
  return {
    id: hash, sha256: hash, runId, clientId: 'client-alpha', type,
    relativePath: `client-alpha/${runId}/artifacts/${type}/${hash}.json`
  };
}

function evidenceFixture(overrides = {}) {
  const base = {
    gate: 'runtime.console',
    files: ['clientes/acme/site/index.html'],
    message: 'ReferenceError at line 42'
  };
  const fingerprint = fingerprintFailure(base);
  const verifierArtifact = artifactRef('qa-report', 'a'.repeat(64));
  const failureArtifact = artifactRef('failure-delta', 'b'.repeat(64));
  const failureDelta = {
    fp: fingerprint,
    gate: base.gate,
    files: base.files,
    diffHash: 'c'.repeat(64),
    summary: base.message
  };
  return {
    evidence: {
      ...base,
      runId,
      fingerprint,
      verifierArtifact,
      failureArtifact,
      failureDelta,
      ...overrides
    },
    artifactRegistry: {
      read(ref) {
        if (ref.id === verifierArtifact.id) {
          return { value: { status: 'failed', gates: { console: { passed: false } } }, sources: [] };
        }
        if (ref.id === failureArtifact.id) {
          return {
            value: { runId, fingerprint, verifierArtifact, delta: failureDelta },
            sources: [verifierArtifact]
          };
        }
        throw new Error('unknown artifact');
      }
    }
  };
}

test('requires human intervention after a repeated failure fingerprint even while attempts remain', () => {
  const { evidence, artifactRegistry } = evidenceFixture();
  const fp = fingerprintFailure(evidence);

  assert.equal(decideRepair({
    runId,
    node,
    attempts: 1,
    previousFingerprints: [fp],
    evidence,
    remainingBudget: 1,
    artifactRegistry
  }), 'human_intervention');
});

test('blocks repair without a new evidence artifact', () => {
  const { evidence, artifactRegistry } = evidenceFixture({ failureArtifact: null });
  assert.equal(decideRepair({
    runId,
    node,
    attempts: 0,
    previousFingerprints: [],
    evidence,
    remainingBudget: 1,
    artifactRegistry
  }), 'human_intervention');
});

test('blocks repair when a failure artifact is not sourced from verifier evidence', () => {
  const fixture = evidenceFixture();
  fixture.artifactRegistry.read = (ref) => ref.id === fixture.evidence.verifierArtifact.id
    ? { value: { status: 'failed' }, sources: [] }
    : {
        value: {
          runId,
          fingerprint: fixture.evidence.fingerprint,
          verifierArtifact: fixture.evidence.verifierArtifact,
          delta: fixture.evidence.failureDelta
        },
        sources: []
      };

  assert.equal(decideRepair({
    runId,
    node,
    attempts: 0,
    previousFingerprints: [],
    evidence: fixture.evidence,
    remainingBudget: 1,
    artifactRegistry: fixture.artifactRegistry
  }), 'human_intervention');
});

test('orders repair decisions by repeat, attempts, budget, then retry', () => {
  const { evidence, artifactRegistry } = evidenceFixture();
  const fp = fingerprintFailure(evidence);
  const decide = (overrides) => decideRepair({
    runId, node, attempts: 1, previousFingerprints: [], evidence,
    remainingBudget: 1, artifactRegistry, ...overrides
  });

  assert.equal(decide({ attempts: 3, previousFingerprints: [fp], remainingBudget: 0 }), 'human_intervention');
  assert.equal(decide({ attempts: 3 }), 'human_intervention');
  assert.equal(decide({ remainingBudget: 0 }), 'budget_blocked');
  assert.equal(decide({}), 'retry');
});

test('fails closed when attempt or budget inputs are missing or non-finite', () => {
  const { evidence, artifactRegistry } = evidenceFixture();
  const decide = (overrides) => decideRepair({
    runId, node, attempts: 0, previousFingerprints: [], evidence,
    remainingBudget: 1, artifactRegistry, ...overrides
  });

  for (const attempts of [undefined, null, Number.NaN, Number.POSITIVE_INFINITY, -1, 0.5]) {
    assert.equal(decide({ attempts }), 'human_intervention', `attempts=${attempts}`);
  }
  for (const maxAttempts of [undefined, null, Number.NaN, Number.POSITIVE_INFINITY, 0, 0.5]) {
    assert.equal(decide({ node: { id: 'repair-homepage', budget: { maxAttempts, maxUsd: 1 } } }), 'human_intervention', `maxAttempts=${maxAttempts}`);
  }
  for (const remainingBudget of [undefined, null, Number.NaN, Number.POSITIVE_INFINITY, -1]) {
    assert.equal(decide({ remainingBudget }), 'budget_blocked', `remainingBudget=${remainingBudget}`);
  }
  for (const maxUsd of [undefined, null, Number.NaN, Number.POSITIVE_INFINITY, 0, -1]) {
    assert.equal(decide({ node: { id: 'repair-homepage', budget: { maxAttempts: 3, maxUsd } } }), 'budget_blocked', `maxUsd=${maxUsd}`);
  }
});
