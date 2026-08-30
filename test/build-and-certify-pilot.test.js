const test = require('node:test');
const assert = require('node:assert/strict');

const {
  assertCoreQualityGatesPassed,
  runPilotMain
} = require('../scripts/build-and-certify-pilot');

test('rejects a pilot quality report when core gates fail', () => {
  assert.throws(
    () => assertCoreQualityGatesPassed({ passed: false, status: 'failed' }),
    /Pilot quality gates failed/
  );
});

test('sets a nonzero exit code when the pilot runner rejects', async () => {
  const runtime = { exitCode: 0 };
  const reportedErrors = [];
  const failure = new Error('candidate audit failed');

  await runPilotMain({
    runPilot: async () => {
      throw failure;
    },
    runtime,
    reportError: error => reportedErrors.push(error)
  });

  assert.equal(runtime.exitCode, 1);
  assert.deepEqual(reportedErrors, [failure]);
});
