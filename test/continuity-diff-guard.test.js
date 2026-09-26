'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { assertAllowedWorkspacePath, verifyWorkspaceDiff } = require('../src/continuity/diff-guard');
const { createWorkspaceManifest } = require('../src/continuity/workspace-manifest');

function manifest(files, dirtyPaths = []) {
  return {
    workspaceRoot: path.resolve('C:/workspace'),
    files: Object.entries(files).map(([filePath, sha256]) => ({ path: filePath, kind: 'file', sha256 })),
    dirtyPaths
  };
}

function taskAllowing(writeAllowlist, maxFilesChanged = 10) {
  return { authority: { writeAllowlist }, budget: { maxFilesChanged } };
}

test('unchanged pre-existing dirt is not attributed to the executor', () => {
  const verification = verifyWorkspaceDiff({
    before: manifest({ 'task.txt': 'sha256:b', 'user-owned.txt': 'sha256:a' }, ['user-owned.txt']),
    after: manifest({ 'task.txt': 'sha256:c', 'user-owned.txt': 'sha256:a' }),
    task: taskAllowing(['task.txt'])
  });
  assert.deepEqual(verification.changedPaths, ['task.txt']);
  assert.deepEqual(verification.violations, []);
});

test('diff guard attributes additions, modifications and deletions and rejects changed dirty paths', () => {
  const verification = verifyWorkspaceDiff({
    before: manifest({ 'delete.txt': 'sha256:a', 'dirty.txt': 'sha256:b', 'modify.txt': 'sha256:c' }, ['dirty.txt']),
    after: manifest({ 'add.txt': 'sha256:d', 'dirty.txt': 'sha256:e', 'modify.txt': 'sha256:f' }),
    task: taskAllowing(['add.txt', 'delete.txt', 'modify.txt'])
  });
  assert.deepEqual(verification.added, ['add.txt']);
  assert.deepEqual(verification.modified, ['dirty.txt', 'modify.txt']);
  assert.deepEqual(verification.deleted, ['delete.txt']);
  assert.deepEqual(verification.violations, [{ code: 'WRITE_PATH_UNAUTHORIZED', path: 'dirty.txt' }]);
});

test('diff guard enforces the file-change budget', () => {
  const verification = verifyWorkspaceDiff({
    before: manifest({}),
    after: manifest({ 'one.txt': 'sha256:a', 'two.txt': 'sha256:b' }),
    task: taskAllowing(['one.txt', 'two.txt'], 1)
  });
  assert.ok(verification.violations.some(violation => violation.code === 'MAX_FILES_CHANGED_EXCEEDED'));
});

test('path authority rejects traversal, ADS, absolute paths, case aliases and escaping links', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'continuity-path-'));
  const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'continuity-outside-'));
  try {
    fs.writeFileSync(path.join(root, 'Exact.txt'), 'ok');
    assert.equal(assertAllowedWorkspacePath({ workspaceRoot: root, candidate: 'Exact.txt', allowlist: ['Exact.txt'] }), 'Exact.txt');
    for (const candidate of ['../outside.txt', path.join(outside, 'outside.txt'), 'Exact.txt:stream', 'exact.txt']) {
      assert.throws(() => assertAllowedWorkspacePath({ workspaceRoot: root, candidate, allowlist: ['Exact.txt'] }));
    }
    const link = path.join(root, 'escape');
    try {
      fs.symlinkSync(outside, link, 'junction');
      assert.throws(() => assertAllowedWorkspacePath({ workspaceRoot: root, candidate: 'escape/new.txt', allowlist: ['escape/'] }));
    } catch (error) {
      if (error.code !== 'EPERM' && error.code !== 'EACCES') throw error;
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
    fs.rmSync(outside, { recursive: true, force: true });
  }
});

test('workspace manifest uses only Git-listed files and hashes regular entries', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'continuity-manifest-'));
  try {
    fs.writeFileSync(path.join(root, 'tracked.txt'), 'content');
    const calls = [];
    const result = createWorkspaceManifest({
      workspaceRoot: root,
      runGit(args) {
        calls.push(args);
        return 'tracked.txt\0';
      }
    });
    assert.deepEqual(calls, [['ls-files', '--cached', '--others', '--exclude-standard', '-z']]);
    assert.equal(result.files[0].path, 'tracked.txt');
    assert.match(result.files[0].sha256, /^sha256:/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
