'use strict';

const crypto = require('node:crypto');
const { validateHumanDecision } = require('./contracts');

function createError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function verifyHumanDecision({ decision, trustedPublicKeys }) {
  const validated = validateHumanDecision(decision);
  if (!trustedPublicKeys || typeof trustedPublicKeys !== 'object' || Array.isArray(trustedPublicKeys)) {
    throw new TypeError('trustedPublicKeys must be an object');
  }
  const publicKey = trustedPublicKeys[validated.signature.keyId];
  if (!Object.hasOwn(trustedPublicKeys, validated.signature.keyId) || !publicKey) {
    throw createError('HUMAN_KEY_UNTRUSTED', `no trusted key for ${validated.signature.keyId}`);
  }
  const valid = crypto.verify(
    null,
    Buffer.from(validated.signature.signedPayload, 'utf8'),
    publicKey,
    Buffer.from(validated.signature.signatureBase64, 'base64')
  );
  if (!valid) throw createError('HUMAN_SIGNATURE_INVALID', 'human decision signature is invalid');
  return true;
}

module.exports = { verifyHumanDecision };
