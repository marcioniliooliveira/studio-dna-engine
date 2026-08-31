const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const assert = require('node:assert/strict');
const { createOrchestrator, main } = require('../bin/orchestrator');
const { createArtifactRegistry } = require('../src/orchestration/artifact-registry');

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

function nonexistentCandidateArtifact() {
  return {
    id: 'b'.repeat(64), sha256: 'b'.repeat(64), runId: 'run-001', clientId: 'client-alpha', type: 'site',
    relativePath: `client-alpha/run-001/artifacts/site/${'b'.repeat(64)}.json`
  };
}

function fixtureQaEvidence() {
  return fixtureQaEvidenceFor('b'.repeat(64));
}

function fixtureQaEvidenceFor(artifactSha256) {
  return {
    reportId: 'fixture-qa', status: 'candidate', artifactSha256,
    reportArtifact: {
      id: 'c'.repeat(64), sha256: 'c'.repeat(64), runId: 'run-001', clientId: 'client-alpha', type: 'qa-report',
      relativePath: `client-alpha/run-001/artifacts/qa-report/${'c'.repeat(64)}.json`
    },
    gates: {
      security: { passed: true }, semantic: { passed: true }, dna: { passed: true },
      visual: { passed: true }, accessibility: { passed: true }, performance: { passed: true }
    }
  };
}

function registeredCandidateArtifact({ runRef, blueprint, artifactRegistry }) {
  return artifactRegistry.putJson({
    runId: runRef.runId,
    clientId: blueprint.clientId,
    type: 'site',
    value: { fixture: 'candidate' },
    sources: ['n2']
  });
}

function registeredQaEvidence({ runRef, blueprint, candidateArtifact, artifactRegistry }) {
  const payload = fixtureQaEvidenceFor(candidateArtifact.sha256);
  delete payload.reportArtifact;
  const reportArtifact = artifactRegistry.putJson({
    runId: runRef.runId,
    clientId: blueprint.clientId,
    type: 'qa-report',
    value: payload,
    sources: [candidateArtifact]
  });
  return { ...payload, reportArtifact };
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
    candidateArtifact: registeredCandidateArtifact,
    qaEvidence: registeredQaEvidence,
    approver: 'fixture-approver'
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

test('does not finalize a failed DAG when the run is resumed', async () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchestration-failed-dag-'));
  let candidateCalls = 0;
  const options = {
    rootDir,
    planner: { async plan() { return fixtureBlueprint(); } },
    executors: {
      build: {
        identity: 'fixture-script-executor',
        async execute(taskPackage) {
          if (taskPackage.node.id === 'n1') throw new Error('build failed');
          return successfulResult(taskPackage);
        }
      }
    },
    verifier: { identity: 'fixture-independent-verifier', independent: true, async verify() { return { passed: true }; } },
    runIdFactory: () => 'run-001',
    readManifest: () => [{ id: 'ctx-1', sha: 'a'.repeat(64), p: 'clientes/client-alpha/DNA.md' }],
    blueprintPolicy: { allowedTools: new Set(['pipeline.build']), allowedGates: new Set(['core-runtime']), runBudgetUsd: 1 },
    candidateArtifact: async () => { candidateCalls += 1; return nonexistentCandidateArtifact(); },
    qaEvidence: fixtureQaEvidence,
    approver: 'fixture-approver'
  };

  const failed = await createOrchestrator(options).execute(['start', '--client', 'client-alpha', '--context', 'fixture.json']);
  assert.equal(failed.state, 'failed');
  await assert.rejects(
    createOrchestrator(options).execute(['resume', '--run', 'run-001']),
    (error) => error.code === 'CLI_RESUME_INVALID_STATE'
  );
  assert.equal(candidateCalls, 0);

  const inspected = await createOrchestrator(options).execute(['inspect', '--run', 'run-001']);
  assert.deepEqual(inspected.events.filter((event) => event.type === 'TASK_FAILED').map((event) => event.data.code), [
    'EXECUTOR_EXCEPTION'
  ]);
  assert.equal(inspected.events.some((event) => event.type === 'QA_EVIDENCE_RECORDED'), false);
});

test('rejects a nonexistent candidate artifact before invoking QA', async () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchestration-missing-candidate-'));
  let qaCalls = 0;
  const options = {
    rootDir,
    planner: { async plan() { return fixtureBlueprint(); } },
    executors: { build: { identity: 'fixture-script-executor', async execute(taskPackage) { return successfulResult(taskPackage); } } },
    verifier: { identity: 'fixture-independent-verifier', independent: true, async verify() { return { passed: true }; } },
    runIdFactory: () => 'run-001',
    readManifest: () => [{ id: 'ctx-1', sha: 'a'.repeat(64), p: 'clientes/client-alpha/DNA.md' }],
    blueprintPolicy: { allowedTools: new Set(['pipeline.build']), allowedGates: new Set(['core-runtime']), runBudgetUsd: 1 },
    candidateArtifact: nonexistentCandidateArtifact,
    qaEvidence: () => { qaCalls += 1; return fixtureQaEvidence(); },
    approver: 'fixture-approver'
  };

  await createOrchestrator(options).execute(['start', '--client', 'client-alpha', '--context', 'fixture.json']);
  const result = await createOrchestrator(options).execute(['resume', '--run', 'run-001']);

  assert.equal(result.state, 'failed');
  assert.equal(qaCalls, 0);
});

test('rejects QA evidence that differs from its durable registry report', async () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchestration-forged-qa-'));
  const registry = createArtifactRegistry({ rootDir });
  const candidate = registry.putJson({
    runId: 'run-001', clientId: 'client-alpha', type: 'site', value: { build: 'candidate' }, sources: ['n2']
  });
  const durablePayload = { ...fixtureQaEvidenceFor(candidate.sha256) };
  delete durablePayload.reportArtifact;
  const reportArtifact = registry.putJson({
    runId: 'run-001', clientId: 'client-alpha', type: 'qa-report', value: durablePayload, sources: [candidate]
  });
  const options = {
    rootDir,
    planner: { async plan() { return fixtureBlueprint(); } },
    executors: { build: { identity: 'fixture-script-executor', async execute(taskPackage) { return successfulResult(taskPackage); } } },
    verifier: { identity: 'fixture-independent-verifier', independent: true, async verify() { return { passed: true }; } },
    runIdFactory: () => 'run-001',
    readManifest: () => [{ id: 'ctx-1', sha: 'a'.repeat(64), p: 'clientes/client-alpha/DNA.md' }],
    blueprintPolicy: { allowedTools: new Set(['pipeline.build']), allowedGates: new Set(['core-runtime']), runBudgetUsd: 1 },
    candidateArtifact: () => candidate,
    qaEvidence: () => ({ ...durablePayload, reportId: 'forged-report-id', reportArtifact }),
    approver: 'fixture-approver'
  };

  await createOrchestrator(options).execute(['start', '--client', 'client-alpha', '--context', 'fixture.json']);
  const result = await createOrchestrator(options).execute(['resume', '--run', 'run-001']);

  assert.equal(result.state, 'repairing');
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
    candidateArtifact: registeredCandidateArtifact,
    qaEvidence: registeredQaEvidence
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
      candidateArtifact: registeredCandidateArtifact,
      qaEvidence: registeredQaEvidence,
      approver: 'fixture-approver'
    }
  );
  assert.equal(code, 0);
  assert.deepEqual(JSON.parse(output[0]), { runId: 'run-001', state: 'paused', validatedBeforeExecution: true });
});

test('persists malformed QA as a bounded repair state and recovers without re-running completed nodes', async () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchestration-qa-repair-'));
  const executorCalls = [];
  let repairAttempt = false;
  let repairedArtifact;
  const options = {
    rootDir,
    planner: { async plan() { return fixtureBlueprint(); } },
    executors: { build: { identity: 'fixture-script-executor', async execute(taskPackage) { executorCalls.push(taskPackage.node.id); return successfulResult(taskPackage); } } },
    verifier: { identity: 'fixture-independent-verifier', independent: true, async verify() { return { passed: true }; } },
    runIdFactory: () => 'run-001',
    readManifest: () => [{ id: 'ctx-1', sha: 'a'.repeat(64), p: 'clientes/client-alpha/DNA.md' }],
    blueprintPolicy: { allowedTools: new Set(['pipeline.build']), allowedGates: new Set(['core-runtime']), runBudgetUsd: 1 },
    candidateArtifact: registeredCandidateArtifact,
    qaEvidence: (parameters) => repairAttempt ? registeredQaEvidence(parameters) : { status: 'candidate' },
    repairCandidate: async ({ runRef, blueprint, previousArtifact, artifactRegistry }) => {
      repairedArtifact = artifactRegistry.putJson({
        runId: runRef.runId,
        clientId: blueprint.clientId,
        type: 'site',
        value: { fixture: 'repaired-candidate' },
        sources: [previousArtifact]
      });
      return repairedArtifact;
    },
    approver: 'fixture-approver'
  };
  const process = createOrchestrator(options);
  await process.execute(['start', '--client', 'client-alpha', '--context', 'fixture.json']);
  const blocked = await process.execute(['resume', '--run', 'run-001']);
  assert.equal(blocked.state, 'repairing');
  const persisted = await process.execute(['inspect', '--run', 'run-001']);
  assert.equal(persisted.state, 'repairing');
  assert.equal(persisted.events.some((event) => event.type === 'QA_BLOCKED'), true);

  repairAttempt = true;
  const recovered = await createOrchestrator(options).execute(['resume', '--run', 'run-001']);
  assert.equal(recovered.state, 'candidate');
  assert.deepEqual(executorCalls, ['n1', 'n2']);
  const repaired = await createOrchestrator(options).execute(['inspect', '--run', 'run-001']);
  assert.equal(
    repaired.events.filter((event) => event.type === 'WORKFLOW_SNAPSHOT').at(-1).data.snapshot.context.candidateArtifact.sha256,
    repairedArtifact.sha256
  );
});

test('moves a QA-blocked run to human intervention when no repair action is injected', async () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchestration-no-repair-'));
  const options = {
    rootDir,
    planner: { async plan() { return fixtureBlueprint(); } },
    executors: { build: { identity: 'fixture-script-executor', async execute(taskPackage) { return successfulResult(taskPackage); } } },
    verifier: { identity: 'fixture-independent-verifier', independent: true, async verify() { return { passed: true }; } },
    runIdFactory: () => 'run-001',
    readManifest: () => [{ id: 'ctx-1', sha: 'a'.repeat(64), p: 'clientes/client-alpha/DNA.md' }],
    blueprintPolicy: { allowedTools: new Set(['pipeline.build']), allowedGates: new Set(['core-runtime']), runBudgetUsd: 1 },
    candidateArtifact: registeredCandidateArtifact,
    qaEvidence: () => ({ status: 'candidate' }),
    approver: 'fixture-approver'
  };
  const process = createOrchestrator(options);
  await process.execute(['start', '--client', 'client-alpha', '--context', 'fixture.json']);
  assert.equal((await process.execute(['resume', '--run', 'run-001'])).state, 'repairing');
  assert.equal((await process.execute(['resume', '--run', 'run-001'])).state, 'human_intervention');
});

test('rejects missing approver and invalid external adapter configuration before command execution', async () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchestration-config-'));
  assert.throws(
    () => createOrchestrator({ rootDir }),
    (error) => error.code === 'CLI_CONFIGURATION_INVALID'
  );
  const output = [];
  const originalModule = process.env.ORCHESTRATOR_ADAPTER_MODULE;
  process.env.ORCHESTRATOR_ADAPTER_MODULE = path.join(rootDir, 'missing-adapters.cjs');
  try {
    const code = await main(['inspect', '--run', 'run-001'], {
      stdout: { write: () => {} }, stderr: { write: (line) => output.push(line) }
    });
    assert.equal(code, 1);
    assert.match(output[0], /^CLI_CONFIGURATION_INVALID:/);
  } finally {
    if (originalModule === undefined) delete process.env.ORCHESTRATOR_ADAPTER_MODULE;
    else process.env.ORCHESTRATOR_ADAPTER_MODULE = originalModule;
  }
});
