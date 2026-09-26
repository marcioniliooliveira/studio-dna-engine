'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const test = require('node:test');
const { canonicalize } = require('../src/shared/canonical-json');
const { verifyHumanDecision } = require('../src/continuity/human-decision-authority');

const HASH_A = `sha256:${'a'.repeat(64)}`;
const HASH_B = `sha256:${'b'.repeat(64)}`;

function signedDecision(privateKey, overrides = {}) {
  const unsigned = {
    schemaVersion: 2,
    contractKind: 'human-decision',
    decisionId: 'decision-001',
    authorityId: 'owner-1',
    nodeId: 'gate-1',
    taskHash: HASH_A,
    artifactHash: HASH_B,
    decision: 'approve',
    decidedAt: '2026-09-26T12:00:00.000Z',
    ...overrides
  };
  const signedPayload = canonicalize(unsigned);
  return {
    ...unsigned,
    signature: {
      algorithm: 'Ed25519',
      keyId: 'owner-key-1',
      signedPayload,
      signatureBase64: crypto.sign(null, Buffer.from(signedPayload), privateKey).toString('base64')
    }
  };
}

test('human decisions require a trusted key and an unchanged canonical payload', () => {
  const pair = crypto.generateKeyPairSync('ed25519');
  const decision = signedDecision(pair.privateKey);
  assert.equal(verifyHumanDecision({ decision, trustedPublicKeys: { 'owner-key-1': pair.publicKey } }), true);

  const wrong = crypto.generateKeyPairSync('ed25519');
  assert.throws(() => verifyHumanDecision({ decision, trustedPublicKeys: { 'owner-key-1': wrong.publicKey } }), error => error.code === 'HUMAN_SIGNATURE_INVALID');
  assert.throws(() => verifyHumanDecision({
    decision: { ...decision, artifactHash: HASH_A },
    trustedPublicKeys: { 'owner-key-1': pair.publicKey }
  }), /signedPayload/i);
  assert.throws(() => verifyHumanDecision({ decision, trustedPublicKeys: {} }), error => error.code === 'HUMAN_KEY_UNTRUSTED');
});
