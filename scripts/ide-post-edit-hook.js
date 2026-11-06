#!/usr/bin/env node
/**
 * IDE Post-Edit Hook (Studio DNA Engine v3.0 - Level 0 Pareto Funnel)
 * 
 * Runs synchronously on every file edit in Claude Code & Cursor:
 * - Runs Strict Token AST Linter (Delta E < 2.0, 4px scale, Tailwind arbitrary classes).
 * - Runs Wallace CSS Analyzer (zero !important outside a11y, donut @scope isolation, complexity <= 5, token budgets).
 * - Hard execution budget: < 80 ms in pure Node.js (zero browser).
 * 
 * Exit codes:
 * - Exit 0: Compliant (outputs {} to stdout).
 * - Exit 2: Design token or CSS invariant violation (emits exact lines and suggestions to stderr).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { lintStrictDesignTokens } = require('../src/compiler/strict-token-linter');
const { analyzeCssWallaceInvariants } = require('../src/compiler/wallace-css-analyzer');
const { validateDonutScopeInvariants } = require('../src/compiler/kinetic-grammar-schema');

function readStdinSync() {
  try {
    return fs.readFileSync(0, 'utf-8');
  } catch {
    return '';
  }
}

function parseTargetFilePath() {
  // 1. Check CLI args
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' || args[i] === '-f' || args[i] === '--path' || args[i] === '-p') {
      return args[++i];
    } else if (!args[i].startsWith('-')) {
      return args[i];
    }
  }

  // 2. Check stdin JSON
  const rawStdin = readStdinSync();
  if (rawStdin && rawStdin.trim() !== '') {
    try {
      const data = JSON.parse(rawStdin);
      return (
        data.tool_input?.file_path ||
        data.tool_input?.path ||
        data.input?.file_path ||
        data.input?.path ||
        data.file_path ||
        data.path ||
        data.targetPath
      );
    } catch {
      // Ignore
    }
  }

  return null;
}

function findBrandSpecForPath(targetPath) {
  if (!targetPath) return null;
  const absPath = path.resolve(targetPath);
  let currentDir = path.dirname(absPath);

  // Traverse up to find brand-spec.json within the workspace
  while (currentDir && currentDir !== path.parse(currentDir).root) {
    const candidate = path.join(currentDir, 'brand-spec.json');
    if (fs.existsSync(candidate)) {
      try {
        return JSON.parse(fs.readFileSync(candidate, 'utf-8'));
      } catch {
        return null;
      }
    }
    const parent = path.dirname(currentDir);
    if (parent === currentDir) break;
    currentDir = parent;
  }

  return null;
}

function main() {
  const startTime = performance.now();
  const targetFilePath = parseTargetFilePath();

  // If no file path or non-existent, exit 0 cleanly
  if (!targetFilePath || !fs.existsSync(targetFilePath)) {
    process.stdout.write('{}\n');
    process.exit(0);
  }

  const ext = path.extname(targetFilePath).toLowerCase();
  const supportedExts = ['.html', '.htm', '.css', '.jsx', '.tsx', '.js', '.mjs'];
  if (!supportedExts.includes(ext)) {
    process.stdout.write('{}\n');
    process.exit(0);
  }

  let content;
  try {
    content = fs.readFileSync(targetFilePath, 'utf-8');
  } catch (err) {
    process.stderr.write(`[IDE Post-Edit Hook ERROR] Could not read file: ${err.message}\n`);
    process.exit(2);
  }

  const brandSpec = findBrandSpecForPath(targetFilePath);
  const allViolations = [];

  // 1. Strict Token Linting (Tailwind, 4px scale, chromatic Delta E)
  const tokenResult = lintStrictDesignTokens(content, { brandSpec, filePath: targetFilePath });
  if (!tokenResult.valid) {
    for (const v of tokenResult.violations) {
      allViolations.push({
        source: 'TokenLinter',
        line: v.line || 1,
        type: v.type,
        message: v.message,
        suggestion: v.suggestion
      });
    }
  }

  // 2. Wallace CSS Analyzer
  if (ext === '.css') {
    const wallaceResult = analyzeCssWallaceInvariants(content, { brandSpec, filePath: targetFilePath });
    if (!wallaceResult.valid) {
      for (const v of wallaceResult.violations) {
        allViolations.push({
          source: 'WallaceCSS',
          line: v.line || 1,
          type: v.type,
          message: v.message,
          suggestion: v.suggestion
        });
      }
    }

    const donutResult = validateDonutScopeInvariants(content);
    if (!donutResult.compliant) {
      for (const v of donutResult.violations) {
        allViolations.push({
          source: 'DonutScope',
          line: 1,
          type: 'donut-piercing',
          message: v,
          suggestion: 'Do not penetrate [data-kinetic-slot] boundaries with child combinators.'
        });
      }
    }
  } else if (ext === '.html' || ext === '.htm') {
    // Extract inline <style> tags
    const styleTagRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
    let styleMatch;
    while ((styleMatch = styleTagRegex.exec(content)) !== null) {
      const styleContent = styleMatch[1];
      const wallaceResult = analyzeCssWallaceInvariants(styleContent, { brandSpec, filePath: targetFilePath });
      if (!wallaceResult.valid) {
        for (const v of wallaceResult.violations) {
          allViolations.push({
            source: 'WallaceCSS',
            line: v.line || 1,
            type: v.type,
            message: v.message,
            suggestion: v.suggestion
          });
        }
      }
    }
  }

  const durationMs = performance.now() - startTime;

  if (allViolations.length > 0) {
    process.stderr.write(`[IDE Post-Edit Hook VIOLATION] ${targetFilePath} failed Level 0 checks in ${durationMs.toFixed(1)}ms:\n`);
    for (const v of allViolations) {
      process.stderr.write(`  • Line ${v.line} [${v.source}:${v.type}]: ${v.message}\n`);
      if (v.suggestion) {
        process.stderr.write(`    ↳ Fix: ${v.suggestion}\n`);
      }
    }
    // Block with exit 2
    process.exit(2);
  }

  // Approved
  process.stdout.write('{}\n');
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = {
  parseTargetFilePath,
  findBrandSpecForPath,
  main
};
