const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const assert = require('node:assert/strict');
const { createOrchestrator } = require('../bin/orchestrator');

const repositoryRoot = path.resolve(__dirname, '..');
const cliPath = path.join(repositoryRoot, 'bin', 'orchestrator.js');

function runCli(args, rootDir) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repositoryRoot,
    encoding: 'utf8',
    env: { ...process.env, ORCHESTRATOR_ROOT: rootDir }
  });
}

test('rejects incomplete or unsafe start arguments before creating state', () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchestrator-cli-'));
  const missing = runCli(['start', '--client', 'client-alpha'], rootDir);
  const unsafe = runCli(['start', '--client', '../other', '--context', 'manifest.json'], rootDir);

  assert.equal(missing.status, 2);
  assert.match(missing.stderr, /CLI_ARGUMENT_INVALID/);
  assert.equal(unsafe.status, 2);
  assert.match(unsafe.stderr, /CLI_ARGUMENT_INVALID/);
  assert.deepEqual(fs.readdirSync(rootDir), []);
});

function fixtureBlueprint() {
  return {
    runId: 'run-001',
    clientId: 'client-alpha',
    context: [{ id: 'ctx-1', sha256: 'a'.repeat(64), path: 'clientes/client-alpha/DNA.md' }],
    nodes: [
      {
        id: 'n1', kind: 'build', dependencies: [], inputs: ['ctx-1'], outputs: ['first'],
        paths: ['clientes/client-alpha/site/first.html'], needsInput: false, toolLabels: ['pipeline.build'],
        budget: { maxInputTokens: 10, maxOutputTokens: 10, maxUsd: 0.1, maxAttempts: 1 }, gates: ['core-runtime']
      },
      {
        id: 'n2', kind: 'build', dependencies: ['n1'], inputs: ['ctx-1'], outputs: ['second'],
        paths: ['clientes/client-alpha/site/second.html'], needsInput: false, toolLabels: ['pipeline.build'],
        budget: { maxInputTokens: 10, maxOutputTokens: 10, maxUsd: 0.1, maxAttempts: 1 }, gates: ['core-runtime']
      }
    ],
    budget: { maxUsd: 1, maxSolCalls: 1, maxReplans: 0 }
  };
}

function successfulResult(taskPackage) {
  return {
    v: 1, rid: taskPackage.runId, cid: taskPackage.clientId, nid: taskPackage.node.id,
    st: 'ok', art: [], chg: [], use: { it: null, ct: null, ot: null }, err: null
  };
}

test('plans once, pauses, resumes only pending work, and remains a candidate', async () => {
  assert.equal(typeof createOrchestrator, 'function');
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchestration-e2e-'));
  const sol = { calls: 0, async plan() { this.calls += 1; return fixtureBlueprint(); } };
  const executorCalls = [];
  const executor = {
    identity: 'fixture-script-executor',
    async execute(taskPackage) {
      executorCalls.push(taskPackage.node.id);
      return successfulResult(taskPackage);
    }
  };
  const verifier = {
    identity: 'fixture-independent-verifier',
    independent: true,
    async verify() { return { passed: true, evidence: { fixture: true } }; }
  };
  const options = {
    rootDir,
    planner: sol,
    executors: { build: executor },
    verifier,
    runIdFactory: () => 'run-001',
    readManifest: () => [{
      id: 'ctx-1', sha: 'a'.repeat(64), p: 'clientes/client-alpha/DNA.md', sourceContents: 'do-not-persist'
    }],
    blueprintPolicy: {
      allowedTools: new Set(['pipeline.build']),
      allowedGates: new Set(['core-runtime']),
      runBudgetUsd: 1
    }
  };

  const firstProcess = createOrchestrator(options);
  const paused = await firstProcess.execute(['start', '--client', 'client-alpha', '--context', 'fixture.json']);
  assert.equal(sol.calls, 1);
  assert.deepEqual(executorCalls, ['n1']);
  assert.equal(paused.state, 'paused');
  assert.equal(paused.validatedBeforeExecution, true);

  const inspected = await firstProcess.execute(['inspect', '--run', 'run-001']);
  assert.equal(JSON.stringify(inspected).includes('do-not-persist'), false);
  assert.equal(JSON.stringify(inspected).includes('Plan only'), false);

  const secondProcess = createOrchestrator(options);
  const candidate = await secondProcess.execute(['resume', '--run', 'run-001']);
  assert.equal(sol.calls, 1);
  assert.deepEqual(executorCalls, ['n1', 'n2']);
  assert.equal(candidate.state, 'candidate');
  assert.notEqual(candidate.state, 'verified');
  assert.equal(candidate.costs.some((entry) => entry.data.usd === null), true);
});
