'use strict';

const path = require('node:path');

function commandOutput(runCommand, args) {
  const value = runCommand(args);
  return Buffer.isBuffer(value) ? value.toString('utf8') : String(value);
}

function parseDirtyPaths(porcelain) {
  const records = porcelain.split('\0').filter(Boolean);
  const paths = [];
  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    if (record.length < 4) throw new Error('invalid Git porcelain record');
    const status = record.slice(0, 2);
    paths.push(record.slice(3));
    if (status.includes('R') || status.includes('C')) index += 1;
  }
  return [...new Set(paths)].sort();
}

function auditBaseline({ workspaceRoot, runCommand }) {
  if (typeof workspaceRoot !== 'string' || !workspaceRoot) throw new TypeError('workspaceRoot is required');
  if (typeof runCommand !== 'function') throw new TypeError('runCommand is required');

  const requestedRoot = path.resolve(workspaceRoot);
  const gitRoot = path.resolve(commandOutput(runCommand, ['rev-parse', '--show-toplevel']).trim());
  const branch = commandOutput(runCommand, ['branch', '--show-current']).trim();
  const head = commandOutput(runCommand, ['rev-parse', 'HEAD']).trim();
  const dirtyPaths = parseDirtyPaths(commandOutput(runCommand, ['status', '--porcelain=v1', '-z']));
  const headCommittedAt = commandOutput(runCommand, ['log', '-1', '--format=%cI']).trim();

  if (gitRoot !== requestedRoot) throw new Error('workspaceRoot must be the Git worktree root');
  if (!/^[a-f0-9]{40}$/.test(head)) throw new Error('Git HEAD must be a full SHA-1 hash');
  if (!headCommittedAt) throw new Error('Git HEAD commit timestamp is required');

  return {
    epistemicStatus: 'observed',
    workspaceRoot: gitRoot,
    branch: branch || null,
    head,
    headCommittedAt,
    dirtyPaths,
    claims: {
      fullSuiteCurrent: false,
      reason: 'No test command is executed by a baseline audit.'
    }
  };
}

module.exports = { auditBaseline, parseDirtyPaths };
