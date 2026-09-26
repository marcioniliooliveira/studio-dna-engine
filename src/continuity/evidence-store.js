'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { canonicalize, hashCanonical } = require('../shared/canonical-json');
const { readJsonFile, writeTextAtomic } = require('./file-store');
const { validateEvidenceManifest } = require('./contracts');

const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;

function createError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function createEvidenceStore({ directory }) {
  if (typeof directory !== 'string' || !directory) throw new TypeError('directory is required');
  const absolute = path.resolve(directory);

  function filenameFor(manifestHash) {
    if (!SHA256_PATTERN.test(manifestHash)) throw new TypeError('manifestHash must be a sha256 hash');
    return path.join(absolute, `${manifestHash.slice('sha256:'.length)}.json`);
  }

  function put(input) {
    const manifest = validateEvidenceManifest(input);
    const manifestHash = hashCanonical(manifest);
    const filename = filenameFor(manifestHash);
    const bytes = canonicalize(manifest);
    if (fs.existsSync(filename)) {
      if (fs.readFileSync(filename, 'utf8') !== bytes) {
        throw createError('EVIDENCE_REPLACEMENT', `evidence ${manifestHash} has different existing bytes`);
      }
      return { filename, manifestHash };
    }
    writeTextAtomic(filename, bytes);
    return { filename, manifestHash };
  }

  function get(manifestHash) {
    const filename = filenameFor(manifestHash);
    if (!fs.existsSync(filename)) throw createError('EVIDENCE_NOT_FOUND', `evidence ${manifestHash} was not found`);
    const manifest = validateEvidenceManifest(readJsonFile(filename));
    if (hashCanonical(manifest) !== manifestHash) {
      throw createError('EVIDENCE_HASH_MISMATCH', `evidence ${manifestHash} does not match its stored content`);
    }
    return manifest;
  }

  return { directory: absolute, get, put };
}

module.exports = { createEvidenceStore };
