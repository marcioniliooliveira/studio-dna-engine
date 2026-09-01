const test = require('node:test');
const assert = require('node:assert/strict');
const { fingerprintFailure, createFailureDelta } = require('../src/execution/error-fingerprint');

test('fingerprints failures identically after removing volatile ports, timestamps, and worktree prefixes', () => {
  const first = {
    gate: 'runtime.console',
    files: ['clientes/acme/site/index.html'],
    message: '2026-08-30T10:11:12.123Z Error at http://127.0.0.1:4173 in C:\\work\\repo\\.worktrees\\run-a\\clientes\\acme\\site\\index.html:42'
  };
  const second = {
    gate: 'runtime.console',
    files: ['clientes/acme/site/index.html'],
    message: '2026-09-01T22:33:44.999Z Error at http://127.0.0.1:55219 in D:\\agents\\workspace\\.worktrees\\run-b\\clientes\\acme\\site\\index.html:42'
  };

  assert.equal(fingerprintFailure(first), fingerprintFailure(second));
  assert.match(fingerprintFailure(first), /^[a-f0-9]{64}$/);
});

test('distinguishes failure fingerprints by gate, affected file, and line', () => {
  const base = { gate: 'runtime.console', files: ['clientes/acme/site/index.html'], message: 'ReferenceError at line 42' };

  assert.notEqual(fingerprintFailure(base), fingerprintFailure({ ...base, gate: 'network' }));
  assert.notEqual(fingerprintFailure(base), fingerprintFailure({ ...base, files: ['clientes/acme/site/app.js'] }));
  assert.notEqual(fingerprintFailure(base), fingerprintFailure({ ...base, message: 'ReferenceError at line 43' }));
});

test('creates a bounded failure delta without retaining the full log', () => {
  const log = Array.from({ length: 10000 }, (_, index) => `noise ${index}`);
  log.splice(5000, 0, 'runtime.console: ReferenceError: hero is not defined', 'clientes/acme/site/index.html:42', 'diff: +const hero = window.hero');
  const evidence = {
    gate: 'runtime.console',
    files: ['clientes/acme/site/index.html'],
    message: 'ReferenceError: hero is not defined',
    log: log.join('\n'),
    diff: '+const hero = window.hero\n-console.log(hero)'
  };

  const delta = createFailureDelta(evidence);

  assert.deepEqual(Object.keys(delta).sort(), ['diffHash', 'files', 'fp', 'gate', 'summary']);
  assert.equal(delta.gate, 'runtime.console');
  assert.deepEqual(delta.files, ['clientes/acme/site/index.html']);
  assert.match(delta.fp, /^[a-f0-9]{64}$/);
  assert.match(delta.diffHash, /^[a-f0-9]{64}$/);
  assert.match(delta.summary, /ReferenceError: hero is not defined/);
  assert.ok(delta.summary.split('\n').length <= 40);
  assert.equal(delta.summary.includes('noise 0'), false);
  assert.equal(delta.summary.includes('noise 9999'), false);
});

test('redacts credentials before fingerprinting and bounds delta bytes, characters, and lines', () => {
  const secretA = 'sk-live-' + 'a'.repeat(20000);
  const secretB = 'sk-live-' + 'b'.repeat(20000);
  const evidenceFor = (secret) => ({
    gate: 'runtime.console',
    files: ['clientes/acme/site/index.html'],
    message: `Authorization: Bearer ${secret}`,
    log: Array.from({ length: 1000 }, (_, index) => (
      `runtime.console line ${index} api_key=${secret}`
    )).join('\n'),
    diff: `+const password = "${secret}";`
  });

  const first = createFailureDelta(evidenceFor(secretA));
  const second = createFailureDelta(evidenceFor(secretB));

  assert.equal(first.fp, second.fp);
  assert.equal(first.diffHash, second.diffHash);
  assert.equal(first.summary.includes(secretA), false);
  assert.match(first.summary, /<redacted>/i);
  assert.ok(first.summary.split('\n').length <= 40);
  assert.ok(first.summary.length <= 8192);
  assert.ok(Buffer.byteLength(first.summary, 'utf8') <= 16384);
});
