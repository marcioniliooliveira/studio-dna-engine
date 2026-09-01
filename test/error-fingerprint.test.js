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
