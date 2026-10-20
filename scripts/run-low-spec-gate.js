#!/usr/bin/env node
/**
 * scripts/run-low-spec-gate.js
 * 
 * Studio DNA PRO v2.6 — Deterministic Low-Spec Quality Gate
 * 
 * Execution Profile:
 * - Stage 1: Pure Node.js linear algebra, AST, Vault, APCA, Shader Slicer and FSM tests
 *   Sequential execution (--test-concurrency=1), <100MB RAM, <2s runtime.
 * - Stage 2 (Optional, triggered by --with-browser): Playwright single-worker E2E suite.
 */

'use strict';

const { spawnSync } = require('node:child_process');
const path = require('node:path');

const STAGE_1_TEST_SUITES = [
  'test/vault-integrity.test.js',
  'test/transmuter-and-anti-slop.test.js',
  'test/components/hero-motion.test.js',
  'test/components/jumpflex-transmutation.test.js',
  'test/kinetic/bezier-fitter.test.js',
  'test/physics/inverse-system-id.test.js',
  'test/constraint-engine.test.js',
  'test/assets3d/shader-slicer.test.js',
  'test/m4-compiler-dualstack.test.js',
  'test/challenger-adversarial-m5.test.js',
  'test/m2-fsm-forms.test.js',
  'test/visual-critic-and-refinement.test.js',
  'test/server-security.test.js',
  'test/preview-server.integration.test.js'
];

function runLowSpecGate() {
  const startTime = Date.now();
  console.log('================================================================');
  console.log('🚀 STUDIO DNA PRO v2.6 — LOW-SPEC QUALITY GATE');
  console.log('   Strict Resource Containment Profile (Workers: 1, Zero Brute-Force)');
  console.log('================================================================\n');

  console.log(`[Stage 1] Executing ${STAGE_1_TEST_SUITES.length} Pure Node.js suites in series...`);
  
  const args = ['--test', '--test-concurrency=1', ...STAGE_1_TEST_SUITES];
  const nodeResult = spawnSync(process.execPath, args, {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
    env: { ...process.env, NODE_ENV: 'test' }
  });

  const durationMs = Date.now() - startTime;
  const memUsage = process.memoryUsage();
  const heapMb = (memUsage.heapUsed / (1024 * 1024)).toFixed(1);

  if (nodeResult.status !== 0) {
    console.error(`\n❌ [Stage 1 FAILED] Exit code: ${nodeResult.status}`);
    process.exit(nodeResult.status || 1);
  }

  console.log(`\n✔ [Stage 1 PASSED] 100% Suites passed in ${(durationMs / 1000).toFixed(2)}s (Heap: ${heapMb} MB)`);

  const withBrowser = process.argv.includes('--with-browser');
  if (withBrowser) {
    console.log('\n[Stage 2] Executing Playwright E2E with strict single-worker (--workers=1)...');
    const pwArgs = ['playwright', 'test', 'tests/e2e/work-stage.spec.ts', '--workers=1'];
    const pwResult = spawnSync('npx', pwArgs, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
      shell: true
    });

    if (pwResult.status !== 0) {
      console.error(`\n❌ [Stage 2 FAILED] Browser E2E failed`);
      process.exit(pwResult.status || 1);
    }
    console.log('\n✔ [Stage 2 PASSED] Browser E2E verified with workers: 1');
  }

  console.log('\n================================================================');
  console.log('🏆 LOW-SPEC QUALITY GATE: ALL CONTRACTS SATISFIED deterministically!');
  console.log('================================================================\n');
}

if (require.main === module) {
  runLowSpecGate();
}

module.exports = { runLowSpecGate, STAGE_1_TEST_SUITES };
