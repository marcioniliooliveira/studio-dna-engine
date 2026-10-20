/**
 * test/v2.6/run-all.cjs
 * 
 * Studio DNA PRO v2.6 — Master Test Suite Runner
 * Executes all 4-Tier verification test suites under test/v2.6/
 * Generates structured console output and exits with code 0 on 100% pass.
 */

'use strict';

const { spawnSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');

const TEST_DIR = __dirname;
const TEST_FILES = [
  'spatial-rtree.test.js',
  'css-selector-ast.test.js',
  'png-codec.test.js',
  'slug-font-compiler.test.js',
  'apca-contrast.test.js',
  'ndc-projection.test.js',
  'scrollbus-phase.test.js'
];

console.log('='.repeat(80));
console.log(' STUDIO DNA PRO v2.6 — 4-TIER COMPREHENSIVE TEST SUITE RUNNER');
console.log(' Zero-Dependency Native Node.js Test Execution (node:test)');
console.log('='.repeat(80));
console.log(`Directory: ${TEST_DIR}`);
console.log(`Total Suites: ${TEST_FILES.length}\n`);

let totalPassed = 0;
let totalFailed = 0;
let totalSuitesPassed = 0;
let totalSuitesFailed = 0;
const results = [];

const startTime = Date.now();

for (const file of TEST_FILES) {
  const filePath = path.join(TEST_DIR, file);
  const suiteStart = Date.now();

  process.stdout.write(`• Running ${file.padEnd(30)} `);

  const proc = spawnSync(process.execPath, ['--test', filePath], {
    encoding: 'utf8',
    env: process.env
  });

  const duration = Date.now() - suiteStart;
  const passed = proc.status === 0;

  // Extract test count from stdout
  const testsMatch = proc.stdout.match(/ℹ tests\s+(\d+)/);
  const passMatch = proc.stdout.match(/ℹ pass\s+(\d+)/);
  const failMatch = proc.stdout.match(/ℹ fail\s+(\d+)/);

  const testCount = testsMatch ? parseInt(testsMatch[1], 10) : 0;
  const passCount = passMatch ? parseInt(passMatch[1], 10) : 0;
  const failCount = failMatch ? parseInt(failMatch[1], 10) : (passed ? 0 : 1);

  totalPassed += passCount;
  totalFailed += failCount;

  if (passed) {
    totalSuitesPassed++;
    console.log(`[\x1b[32mPASS\x1b[0m] (${passCount}/${testCount} tests, ${duration}ms)`);
  } else {
    totalSuitesFailed++;
    console.log(`[\x1b[31mFAIL\x1b[0m] (${failCount} failures, ${duration}ms)`);
    console.error(proc.stderr || proc.stdout);
  }

  results.push({
    file,
    passed,
    testCount,
    passCount,
    failCount,
    duration
  });
}

const totalDuration = Date.now() - startTime;

console.log('\n' + '='.repeat(80));
console.log(' SUMMARY MATRIX: STUDIO DNA PRO v2.6 TEST SUITE');
console.log('='.repeat(80));
console.log(
  'Suite File'.padEnd(32) +
  'Status'.padEnd(12) +
  'Tests'.padEnd(10) +
  'Pass'.padEnd(10) +
  'Fail'.padEnd(10) +
  'Duration'
);
console.log('-'.repeat(80));

for (const r of results) {
  const statusStr = r.passed ? '\x1b[32mPASSED\x1b[0m' : '\x1b[31mFAILED\x1b[0m';
  console.log(
    r.file.padEnd(32) +
    statusStr.padEnd(20) +
    String(r.testCount).padEnd(10) +
    String(r.passCount).padEnd(10) +
    String(r.failCount).padEnd(10) +
    `${r.duration}ms`
  );
}

console.log('-'.repeat(80));
console.log(`Suites:  ${totalSuitesPassed} passed, ${totalSuitesFailed} failed, ${TEST_FILES.length} total`);
console.log(`Tests:   ${totalPassed} passed, ${totalFailed} failed, ${totalPassed + totalFailed} total`);
console.log(`Duration: ${totalDuration}ms`);
console.log('='.repeat(80));

if (totalFailed > 0 || totalSuitesFailed > 0) {
  console.error('\n✖ One or more test suites failed.');
  process.exit(1);
} else {
  console.log('\n✔ 100% of tests passed with zero errors. All invariants verified.');
  process.exit(0);
}
