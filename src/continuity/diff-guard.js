'use strict';

const fs = require('node:fs');
const path = require('node:path');

function normalizePath(value) {
  if (typeof value !== 'string' || !value || value.includes('\0') || value.includes(':') || path.isAbsolute(value)) {
    throw new TypeError('workspace path must be a non-empty relative path without ADS syntax');
  }
  const normalized = value.replaceAll('\\', '/');
  if (normalized.split('/').some(part => !part || part === '.' || part === '..')) {
    throw new TypeError('workspace path must not contain traversal or empty segments');
  }
  return normalized;
}

function isAllowed(candidate, allowlist) {
  if (!Array.isArray(allowlist)) throw new TypeError('allowlist must be an array');
  return allowlist.some(entry => {
    if (typeof entry !== 'string') return false;
    const normalized = entry.replaceAll('\\', '/');
    return normalized.endsWith('/') ? candidate.startsWith(normalized) : candidate === normalized;
  });
}

function assertExactExistingCasing(root, candidate) {
  let current = root;
  for (const part of candidate.split('/')) {
    if (!fs.existsSync(current)) return;
    const names = fs.readdirSync(current);
    const alias = names.find(name => name.toLocaleLowerCase() === part.toLocaleLowerCase());
    if (alias && alias !== part) throw new Error(`workspace path casing does not match ${alias}`);
    current = path.join(current, part);
  }
}

function assertExistingAncestorInside(root, candidate) {
  const rootReal = fs.realpathSync(root);
  let current = path.join(root, ...candidate.split('/'));
  while (!fs.existsSync(current)) {
    const parent = path.dirname(current);
    if (parent === current) throw new Error('no existing workspace ancestor');
    current = parent;
  }
  const ancestorReal = fs.realpathSync(current);
  if (ancestorReal !== rootReal && !ancestorReal.startsWith(rootReal + path.sep)) {
    throw new Error('workspace path escapes through a link or junction');
  }
}

function assertAllowedWorkspacePath({ workspaceRoot, candidate, allowlist }) {
  if (typeof workspaceRoot !== 'string' || !workspaceRoot) throw new TypeError('workspaceRoot is required');
  const normalized = normalizePath(candidate);
  if (!isAllowed(normalized, allowlist)) throw new Error(`workspace path is not allowlisted: ${normalized}`);
  const root = path.resolve(workspaceRoot);
  assertExactExistingCasing(root, normalized);
  assertExistingAncestorInside(root, normalized);
  return normalized;
}

function mapFiles(manifest) {
  if (!manifest || !Array.isArray(manifest.files)) throw new TypeError('manifest.files is required');
  const files = new Map();
  for (const entry of manifest.files) {
    if (!entry || typeof entry !== 'object' || typeof entry.path !== 'string' || typeof entry.kind !== 'string') {
      throw new TypeError('manifest file entry is invalid');
    }
    const filePath = normalizePath(entry.path);
    if (files.has(filePath)) throw new Error(`duplicate manifest path ${filePath}`);
    files.set(filePath, entry);
  }
  return files;
}

function entryChanged(before, after) {
  return before.kind !== after.kind || before.sha256 !== after.sha256 || before.target !== after.target;
}

function verifyWorkspaceDiff({ before, after, task }) {
  const beforeFiles = mapFiles(before);
  const afterFiles = mapFiles(after);
  if (!task || !task.authority || !task.budget) throw new TypeError('task authority and budget are required');
  const added = [];
  const modified = [];
  const deleted = [];
  for (const [filePath, entry] of afterFiles) {
    if (!beforeFiles.has(filePath)) added.push(filePath);
    else if (entryChanged(beforeFiles.get(filePath), entry)) modified.push(filePath);
  }
  for (const filePath of beforeFiles.keys()) if (!afterFiles.has(filePath)) deleted.push(filePath);
  const changedPaths = [...added, ...modified, ...deleted].sort();
  const violations = [];
  for (const filePath of changedPaths) {
    if (!isAllowed(filePath, task.authority.writeAllowlist)) violations.push({ code: 'WRITE_PATH_UNAUTHORIZED', path: filePath });
  }
  if (!Number.isSafeInteger(task.budget.maxFilesChanged) || task.budget.maxFilesChanged < 0) {
    throw new TypeError('task budget maxFilesChanged must be a non-negative safe integer');
  }
  if (changedPaths.length > task.budget.maxFilesChanged) {
    violations.push({ code: 'MAX_FILES_CHANGED_EXCEEDED', path: null });
  }
  return { added: added.sort(), modified: modified.sort(), deleted: deleted.sort(), changedPaths, violations };
}

module.exports = { assertAllowedWorkspacePath, normalizePath, verifyWorkspaceDiff };
