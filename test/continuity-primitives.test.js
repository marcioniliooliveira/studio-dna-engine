'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { hashCanonical } = require('../src/shared/canonical-json');
const { readJsonFile, writeJsonAtomic } = require('../src/continuity/file-store');

test('canonical hash is stable across object key order', () => {
  assert.equal(hashCanonical({ b: 2, a: 1 }), hashCanonical({ a: 1, b: 2 }));
});

test('atomic JSON write leaves only the destination', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'continuity-store-'));
  const target = path.join(root, 'state.json');
  writeJsonAtomic(target, { schemaVersion: 2, revision: 1 });
  assert.deepEqual(readJsonFile(target), { revision: 1, schemaVersion: 2 });
  assert.deepEqual(fs.readdirSync(root), ['state.json']);
  fs.rmSync(root, { recursive: true, force: true });
});
