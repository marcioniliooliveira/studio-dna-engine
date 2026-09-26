'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { normalizePath } = require('./diff-guard');

function sha256File(filename) {
  return `sha256:${crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex')}`;
}

function assertExistingParentInside(root, relativePath) {
  const rootReal = fs.realpathSync(root);
  const parent = path.dirname(path.join(root, ...relativePath.split('/')));
  const parentReal = fs.realpathSync(parent);
  if (parentReal !== rootReal && !parentReal.startsWith(rootReal + path.sep)) {
    throw new Error(`manifest path escapes workspace: ${relativePath}`);
  }
}

function createWorkspaceManifest({ workspaceRoot, runGit }) {
  if (typeof workspaceRoot !== 'string' || !workspaceRoot) throw new TypeError('workspaceRoot is required');
  if (typeof runGit !== 'function') throw new TypeError('runGit is required');
  const root = path.resolve(workspaceRoot);
  const output = runGit(['ls-files', '--cached', '--others', '--exclude-standard', '-z']);
  const listedPaths = (Buffer.isBuffer(output) ? output.toString('utf8') : String(output)).split('\0').filter(Boolean);
  const files = listedPaths.map(rawPath => {
    const relativePath = normalizePath(rawPath);
    const filename = path.join(root, ...relativePath.split('/'));
    assertExistingParentInside(root, relativePath);
    const stat = fs.lstatSync(filename);
    if (stat.isSymbolicLink()) return { path: relativePath, kind: 'symlink', target: fs.readlinkSync(filename) };
    if (!stat.isFile()) throw new Error(`manifest entry is not a regular file or symlink: ${relativePath}`);
    return { path: relativePath, kind: 'file', sha256: sha256File(filename) };
  }).sort((left, right) => left.path.localeCompare(right.path));
  return { workspaceRoot: root, files, dirtyPaths: [] };
}

module.exports = { createWorkspaceManifest };
