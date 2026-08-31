const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const assert = require('node:assert/strict');
const { createOrchestrator, main } = require('../bin/orchestrator');

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

function fixtureCandidateArtifact() {
  return {
    id: 'b'.repeat(64), sha256: 'b'.repeat(64), runId: 'run-001', clientId: 'client-alpha', type: 'site',
    relativePath: `client-alpha/run-001/artifacts/site/${'b'.repeat(64)}.json`
  };
}

function fixtureQaEvidence() {
  return {
    reportId: 'fixture-qa', status: 'candidate', artifactSha256: 'b'.repeat(64),
    reportArtifact: {
      id: 'c'.repeat(64), sha256: 'c'.repeat(64), runId: 'run-001', clientId: 'client-alpha', type: 'qa-report',
      relativePath: `client-alpha/run-001/artifacts/qa-report/${'c'.repeat(64)}.json`
    },
    gates: {
      antiSlop: { passed: true }, console: { passed: true, errorsCount: 0 },
      network: { passed: true, failedRequestsCount: 0 }, structural: { passed: true, brokenImagesCount: 0 }
    }
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
    },
    candidateArtifact: fixtureCandidateArtifact,
    qaEvidence: fixtureQaEvidence
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

test('requires artifact-bound QA before a recorded approver can advance the persisted workflow', async () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchestration-approval-'));
  const options = {
    rootDir,
    planner: { async plan() { return fixtureBlueprint(); } },
    executors: { build: { identity: 'fixture-script-executor', async execute(taskPackage) { return successfulResult(taskPackage); } } },
    verifier: { identity: 'fixture-independent-verifier', independent: true, async verify() { return { passed: true }; } },
    runIdFactory: () => 'run-001',
    readManifest: () => [{ id: 'ctx-1', sha: 'a'.repeat(64), p: 'clientes/client-alpha/DNA.md' }],
    blueprintPolicy: { allowedTools: new Set(['pipeline.build']), allowedGates: new Set(['core-runtime']), runBudgetUsd: 1 },
    approver: 'fixture-approver',
    candidateArtifact: fixtureCandidateArtifact,
    qaEvidence: fixtureQaEvidence
  };
  const firstProcess = createOrchestrator(options);
  await firstProcess.execute(['start', '--client', 'client-alpha', '--context', 'fixture.json']);
  const candidate = await createOrchestrator(options).execute(['resume', '--run', 'run-001']);
  assert.equal(candidate.state, 'candidate');

  const approvalProcess = createOrchestrator(options);
  await assert.rejects(
    approvalProcess.execute(['approve', '--run', 'run-001', '--event', 'final-approved']),
    (error) => error.code === 'CLI_EVENT_INVALID_STATE'
  );
  await approvalProcess.execute(['approve', '--run', 'run-001', '--event', 'final-approval-requested']);
  const verified = await approvalProcess.execute(['approve', '--run', 'run-001', '--event', 'final-approved']);
  assert.equal(verified.state, 'verified');
  const inspected = await approvalProcess.execute(['inspect', '--run', 'run-001']);
  assert.deepEqual(inspected.events.filter((event) => event.type === 'APPROVAL_RECORDED').map((event) => event.data), [
    { actor: 'fixture-approver', event: 'FINAL_APPROVAL_REQUESTED' },
    { actor: 'fixture-approver', event: 'FINAL_APPROVED' }
  ]);
  assert.equal(inspected.events.at(-1).type, 'WORKFLOW_SNAPSHOT');
  await assert.rejects(
    approvalProcess.execute(['resume', '--run', 'run-001']),
    (error) => error.code === 'CLI_RESUME_INVALID_STATE'
  );
});

test('composes an injected fixture command without a model key', async () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchestration-main-'));
  const output = [];
  const code = await main(
    ['start', '--client', 'client-alpha', '--context', 'fixture.json'],
    { stdout: { write: (line) => output.push(line) }, stderr: { write: () => {} } },
    {
      rootDir,
      planner: { async plan() { return fixtureBlueprint(); } },
      executors: { build: { identity: 'fixture-script-executor', async execute(taskPackage) { return successfulResult(taskPackage); } } },
      verifier: { identity: 'fixture-independent-verifier', independent: true, async verify() { return { passed: true }; } },
      runIdFactory: () => 'run-001',
      readManifest: () => [{ id: 'ctx-1', sha: 'a'.repeat(64), p: 'clientes/client-alpha/DNA.md' }],
      blueprintPolicy: { allowedTools: new Set(['pipeline.build']), allowedGates: new Set(['core-runtime']), runBudgetUsd: 1 },
      candidateArtifact: fixtureCandidateArtifact,
      qaEvidence: fixtureQaEvidence
    }
  );
  assert.equal(code, 0);
  assert.deepEqual(JSON.parse(output[0]), { runId: 'run-001', state: 'paused', validatedBeforeExecution: true });
});
