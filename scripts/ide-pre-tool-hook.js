#!/usr/bin/env node
/**
 * IDE Pre-Tool Hook (Studio DNA Engine v3.0 - Level 0 Pareto Funnel)
 * 
 * Intercepts tool execution requests in Claude Code and Cursor:
 * - Validates path access against policy-enforcer.js.
 * - Blocks writes to immutable copias/ or design-vault/ (POLICY_READONLY_COPIAS).
 * - Blocks cross-client file access (POLICY_CROSS_CLIENT_PATH).
 * - Enforces writeAllowlist and readAllowlist.
 * 
 * Exit codes:
 * - Exit 0: Allowed (outputs {} to stdout).
 * - Exit 2: Blocked by security policy (emits error reason to stderr).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { assertPathAccess, normalizePath, PolicyViolationError } = require('../src/orchestration/policy-enforcer');

// Synchronously read all data from stdin if available
function readStdinSync() {
  try {
    return fs.readFileSync(0, 'utf-8');
  } catch {
    return '';
  }
}

function parseInput() {
  let targetPath = null;
  let mode = 'write';
  let toolName = 'Edit';
  let contract = null;

  // 1. Try reading stdin JSON
  const rawStdin = readStdinSync();
  if (rawStdin && rawStdin.trim() !== '') {
    try {
      const data = JSON.parse(rawStdin);
      targetPath =
        data.tool_input?.file_path ||
        data.tool_input?.path ||
        data.tool_input?.targetPath ||
        data.input?.file_path ||
        data.input?.path ||
        data.args?.path ||
        data.args?.file_path ||
        data.path ||
        data.targetPath;

      toolName = data.tool_name || data.tool || data.toolName || toolName;
      if (data.mode) mode = data.mode;
      if (data.contract) contract = data.contract;
    } catch {
      // Non-JSON stdin, ignore
    }
  }

  // 2. Fall back to CLI arguments
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--path' || args[i] === '-p' || args[i] === '--file' || args[i] === '-f') {
      targetPath = args[++i];
    } else if (args[i] === '--mode' || args[i] === '-m') {
      mode = args[++i];
    } else if (args[i] === '--tool' || args[i] === '-t') {
      toolName = args[++i];
    } else if (!args[i].startsWith('-') && !targetPath) {
      targetPath = args[i];
    }
  }

  // Determine mode from toolName if not explicitly set
  if (toolName) {
    const t = toolName.toLowerCase();
    if (t.includes('read') || t.includes('grep') || t.includes('search')) {
      mode = 'read';
    } else if (t.includes('write') || t.includes('edit') || t.includes('patch') || t.includes('delete')) {
      mode = 'write';
    }
  }

  return { targetPath, mode, toolName, contract };
}

function resolveActiveContract(explicitContract, targetPath) {
  if (explicitContract) return explicitContract;

  // Check environment variables
  if (process.env.STUDIO_DNA_CONTRACT) {
    try {
      return JSON.parse(process.env.STUDIO_DNA_CONTRACT);
    } catch {}
  }

  if (process.env.STUDIO_DNA_CONTRACT_PATH && fs.existsSync(process.env.STUDIO_DNA_CONTRACT_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(process.env.STUDIO_DNA_CONTRACT_PATH, 'utf-8'));
    } catch {}
  }

  // Infer client scope from targetPath if it targets clientes/<slug>/
  let inferredClientScope = 'global';
  if (targetPath) {
    const norm = normalizePath(targetPath);
    const clientMatch = norm.match(/^clientes\/([^/]+)/);
    if (clientMatch) {
      inferredClientScope = clientMatch[1];
    }
  }

  // Default fail-safe policy contract
  return {
    id: 'TASK-IDE-GUARD',
    schemaVersion: 2,
    role: 'implementation_agent',
    actorId: 'ide-hook-agent',
    clientScope: inferredClientScope,
    readAllowlist: [
      '**'
    ],
    writeAllowlist: [
      `clientes/${inferredClientScope}/**`,
      'src/**',
      'scripts/**',
      'test/**',
      'schemas/**',
      '.claude/**',
      '.cursor/**',
      '.domscribe/**'
    ],
    allowedTools: ['fs.read', 'fs.write', 'Edit', 'Write', 'Read', 'Bash', 'node.test']
  };
}

function main() {
  const { targetPath, mode, toolName, contract: explicitContract } = parseInput();

  // If no targetPath provided, hook passes cleanly (e.g. non-file tools)
  if (!targetPath) {
    process.stdout.write('{}\n');
    process.exit(0);
  }

  const contract = resolveActiveContract(explicitContract, targetPath);

  try {
    assertPathAccess(contract, targetPath, mode);
    // Approved
    process.stdout.write('{}\n');
    process.exit(0);
  } catch (err) {
    const isPolicyError = err instanceof PolicyViolationError || err.code?.startsWith('POLICY_');
    const errorCode = err.code || 'POLICY_VIOLATION';
    process.stderr.write(`[IDE Pre-Tool Hook ERROR] ${errorCode}: ${err.message}\n`);
    // Exit code 2 blocks execution in Claude Code and Cursor
    process.exit(2);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  parseInput,
  resolveActiveContract,
  main
};
