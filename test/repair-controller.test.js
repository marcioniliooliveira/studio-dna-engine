const test = require('node:test');
const assert = require('node:assert/strict');
const { fingerprintFailure } = require('../src/execution/error-fingerprint');
const { decideRepair } = require('../src/execution/repair-controller');

const node = { id: 'repair-homepage', budget: { maxAttempts: 3, maxUsd: 1 } };
const evidence = { gate: 'runtime.console', files: ['clientes/acme/site/index.html'], message: 'ReferenceError at line 42', newArtifact: { id: 'qa-report', sha: 'a'.repeat(64) } };

test('requires human intervention after a repeated failure fingerprint even while attempts remain', () => {
  const fp = fingerprintFailure(evidence);

  assert.equal(decideRepair({
    node,
    attempts: 1,
    previousFingerprints: [fp],
    evidence,
    remainingBudget: 1
  }), 'human_intervention');
});

test('blocks repair without a new evidence artifact', () => {
  assert.equal(decideRepair({
    node,
    attempts: 0,
    previousFingerprints: [],
    evidence: { ...evidence, newArtifact: null },
    remainingBudget: 1
  }), 'human_intervention');
});

test('blocks repair when evidence artifact lacks immutable hash provenance', () => {
  assert.equal(decideRepair({
    node,
    attempts: 0,
    previousFingerprints: [],
    evidence: { ...evidence, newArtifact: { id: 'qa-report' } },
    remainingBudget: 1
  }), 'human_intervention');
});

test('orders repair decisions by repeat, attempts, budget, then retry', () => {
  const fp = fingerprintFailure(evidence);

  assert.equal(decideRepair({ node, attempts: 3, previousFingerprints: [fp], evidence, remainingBudget: 0 }), 'human_intervention');
  assert.equal(decideRepair({ node, attempts: 3, previousFingerprints: [], evidence, remainingBudget: 1 }), 'human_intervention');
  assert.equal(decideRepair({ node, attempts: 1, previousFingerprints: [], evidence, remainingBudget: 0 }), 'budget_blocked');
  assert.equal(decideRepair({ node, attempts: 1, previousFingerprints: [], evidence, remainingBudget: 1 }), 'retry');
});
