const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  registerReferenceCandidate,
  listReferenceCandidates
} = require('../src/design/reference-candidate-registry');

function makeGitCandidate(overrides = {}) {
  return {
    schemaVersion: 2,
    contractKind: 'reference-candidate',
    candidateId: 'reference-001',
    clientScope: 'client-a',
    sourceType: 'git-repository',
    roles: ['composition'],
    usageIntent: 'code-candidate',
    provenance: {
      canonicalUri: 'https://github.com/example/reference',
      commit: '0123456789abcdef0123456789abcdef01234567',
      license: {
        spdxId: 'MIT',
        evidenceUri: 'https://github.com/example/reference/blob/main/LICENSE'
      }
    },
    ...overrides
  };
}

test('registers a valid Git candidate as quarantined', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'reference-candidate-'));
  const registryPath = path.join(directory, 'registry.json');

  try {
    const registered = registerReferenceCandidate({
      registryPath,
      candidate: makeGitCandidate(),
      now: '2026-09-16T12:00:00.000Z'
    });

    assert.equal(registered.lifecycle, 'quarantined');
    assert.equal(registered.registeredAt, '2026-09-16T12:00:00.000Z');
    assert.match(registered.candidateHash, /^sha256:[a-f0-9]{64}$/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('rejects discovery attempts to self-approve derived fields', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'reference-candidate-'));

  try {
    assert.throws(() => registerReferenceCandidate({
      registryPath: path.join(directory, 'registry.json'),
      candidate: makeGitCandidate({ lifecycle: 'approved' }),
      now: '2026-09-16T12:00:00.000Z'
    }));
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('enforces provenance by source type and usage intent', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'reference-candidate-'));
  const registryPath = path.join(directory, 'registry.json');

  try {
    assert.throws(() => registerReferenceCandidate({
      registryPath,
      candidate: makeGitCandidate({ provenance: { canonicalUri: 'https://example.test/repo' } }),
      now: '2026-09-16T12:00:00.000Z'
    }));
    assert.throws(() => registerReferenceCandidate({
      registryPath,
      candidate: makeGitCandidate({
        candidateId: 'page-001',
        sourceType: 'web-page',
        usageIntent: 'inspiration-only',
        provenance: { canonicalUri: 'https://example.test/page', contentSha256: 'sha256:abcdef' }
      }),
      now: '2026-09-16T12:00:00.000Z'
    }));
    assert.throws(() => registerReferenceCandidate({
      registryPath,
      candidate: makeGitCandidate({
        candidateId: 'capture-001',
        sourceType: 'local-capture',
        usageIntent: 'code-candidate',
        provenance: {
          canonicalUri: 'file:///capture.png',
          contentSha256: 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
        }
      }),
      now: '2026-09-16T12:00:00.000Z'
    }));
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('rejects empty or duplicate roles, missing scope, and unknown fields', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'reference-candidate-'));
  const registryPath = path.join(directory, 'registry.json');

  try {
    for (const candidate of [
      makeGitCandidate({ roles: [] }),
      makeGitCandidate({ roles: ['composition', 'composition'] }),
      makeGitCandidate({ clientScope: '' }),
      makeGitCandidate({ unexpected: true })
    ]) {
      assert.throws(() => registerReferenceCandidate({
        registryPath,
        candidate,
        now: '2026-09-16T12:00:00.000Z'
      }));
    }
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('rejects duplicate identifiers and isolates listing by client scope', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'reference-candidate-'));
  const registryPath = path.join(directory, 'registry.json');
  const now = '2026-09-16T12:00:00.000Z';

  try {
    registerReferenceCandidate({ registryPath, candidate: makeGitCandidate(), now });
    registerReferenceCandidate({
      registryPath,
      candidate: makeGitCandidate({ candidateId: 'global-001', clientScope: 'global' }),
      now
    });
    registerReferenceCandidate({
      registryPath,
      candidate: makeGitCandidate({ candidateId: 'client-b-001', clientScope: 'client-b' }),
      now
    });

    assert.throws(() => registerReferenceCandidate({ registryPath, candidate: makeGitCandidate(), now }));
    assert.deepEqual(
      listReferenceCandidates({ registryPath, clientScope: 'client-a' }).map(({ candidateId }) => candidateId),
      ['global-001', 'reference-001']
    );
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
