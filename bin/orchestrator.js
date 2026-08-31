#!/usr/bin/env node
const { assertSafeSlug } = require('../src/server/security');
const { createRunStore } = require('../src/orchestration/run-store');
const { validateBlueprint } = require('../src/orchestration/blueprint-validator');
const { createBudgetGovernor } = require('../src/orchestration/budget-governor');
const { createDagScheduler } = require('../src/orchestration/dag-scheduler');
const { createWorkflowMachine, createWorkflowActor } = require('../src/orchestration/workflow-machine');

function cliError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function parseArguments(argv) {
  const [command, ...tokens] = argv;
  const values = {};
  for (let index = 0; index < tokens.length; index += 2) {
    const key = tokens[index];
    const value = tokens[index + 1];
    if (!key || !key.startsWith('--') || value === undefined || Object.hasOwn(values, key)) {
      throw cliError('CLI_ARGUMENT_INVALID', 'Command arguments must be named options with values');
    }
    values[key] = value;
  }
  return { command, values };
}

function assertCommandArguments(command, values) {
  const expected = {
    start: ['--client', '--context'],
    inspect: ['--run'],
    approve: ['--run', '--event'],
    resume: ['--run']
  }[command];
  if (!expected) throw cliError('CLI_COMMAND_UNKNOWN', 'Unknown orchestration command');
  if (Object.keys(values).length !== expected.length || expected.some((key) => !values[key])) {
    throw cliError('CLI_ARGUMENT_INVALID', 'Command requires its documented arguments');
  }
  try {
    if (values['--client']) assertSafeSlug(values['--client']);
    if (values['--run']) assertSafeSlug(values['--run']);
  } catch (error) {
    throw cliError('CLI_ARGUMENT_INVALID', 'Client and run identifiers must be safe slugs');
  }
}

function normalizeManifest(manifest, clientId) {
  if (!Array.isArray(manifest) || manifest.length === 0) {
    throw cliError('CLI_CONTEXT_INVALID', 'Context manifest must contain at least one entry');
  }
  return manifest.map((entry) => {
    const id = String(entry?.id || '');
    const sha = String(entry?.sha || entry?.sha256 || '');
    const manifestPath = String(entry?.p || entry?.path || '');
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || !/^[a-f0-9]{64}$/.test(sha) ||
      !new RegExp(`^clientes/${clientId}/`).test(manifestPath) || manifestPath.includes('\\') || manifestPath.split('/').includes('..')) {
      throw cliError('CLI_CONTEXT_INVALID', 'Context manifest is outside the selected client scope');
    }
    return { id, sha256: sha, path: manifestPath };
  });
}

function blueprintFor(run) {
  const entry = run.events.find((event) => event.type === 'BLUEPRINT_ACCEPTED');
  if (!entry?.data?.blueprint) throw cliError('RUN_BLUEPRINT_MISSING', 'Run has no persisted blueprint');
  return entry.data.blueprint;
}

function initialWorkflowContext(runId, clientId) {
  return { runId, clientId, planVersion: 1, attempts: 0, candidateArtifact: null, blockingEvidence: null };
}

function workflowSnapshotFor(run) {
  const entry = run.events.filter((event) => event.type === 'WORKFLOW_SNAPSHOT').at(-1);
  if (!entry?.data?.snapshot) throw cliError('RUN_WORKFLOW_SNAPSHOT_MISSING', 'Run has no persisted workflow snapshot');
  return entry.data.snapshot;
}

function workflowActorFor(run) {
  const machine = createWorkflowMachine(initialWorkflowContext(run.state.runId, run.state.clientId));
  const actor = createWorkflowActor(machine, workflowSnapshotFor(run));
  actor.start();
  return actor;
}

function persistWorkflow(runStore, runRef, actor) {
  const snapshot = JSON.parse(JSON.stringify(actor.getPersistedSnapshot()));
  runStore.appendEvent(runRef, { type: 'WORKFLOW_SNAPSHOT', data: { snapshot } });
}

function nextReadyNode(run, blueprint) {
  const passed = new Set(run.events.filter((event) => event.type === 'TASK_PASSED').map((event) => event.data.nodeId));
  const failed = new Set(run.events.filter((event) => event.type === 'TASK_FAILED').map((event) => event.data.nodeId));
  return blueprint.nodes
    .filter((node) => !passed.has(node.id) && !failed.has(node.id) && node.dependencies.every((dependency) => passed.has(dependency)))
    .sort((left, right) => left.id.localeCompare(right.id))[0] || null;
}

function createOrchestrator({
  rootDir,
  planner,
  executors,
  verifier,
  runIdFactory,
  readManifest,
  blueprintPolicy,
  candidateArtifact,
  qaEvidence,
  repairCandidate,
  approver
} = {}) {
  if (typeof rootDir !== 'string' || rootDir.length === 0) throw new TypeError('rootDir is required');
  let approverId;
  try {
    approverId = assertSafeSlug(approver);
  } catch (error) {
    throw cliError('CLI_CONFIGURATION_INVALID', 'A safe approver slug must be injected by the composition root');
  }
  const runStore = createRunStore({ rootDir });

  function requireStartDependencies() {
    if (!planner || typeof planner.plan !== 'function') {
      throw cliError('CLI_COMPOSITION_UNAVAILABLE', 'A planner adapter must be injected for start');
    }
    if (!executors || !verifier || !blueprintPolicy || typeof runIdFactory !== 'function' || typeof readManifest !== 'function') {
      throw cliError('CLI_COMPOSITION_UNAVAILABLE', 'Execution adapters must be injected by the composition root');
    }
  }

  function requireExecutionDependencies() {
    if (!executors || !verifier || !blueprintPolicy || typeof candidateArtifact !== 'function' || typeof qaEvidence !== 'function') {
      throw cliError('CLI_COMPOSITION_UNAVAILABLE', 'Execution adapters must be injected by the composition root');
    }
  }

  async function finalizeCandidate(runRef, blueprint, actor) {
    try {
      let artifact = actor.getSnapshot().context.candidateArtifact;
      if (artifact === null) artifact = await candidateArtifact({ runRef, blueprint });
      actor.send({ type: 'EXECUTION_COMPLETED', candidateArtifact: artifact });
      if (actor.getSnapshot().value !== 'verifying') throw new TypeError('Candidate artifact was rejected by the workflow');
      const evidence = await qaEvidence({ runRef, blueprint, candidateArtifact: artifact });
      runStore.appendEvent(runRef, { type: 'QA_EVIDENCE_RECORDED', data: { evidence } });
      actor.send({ type: 'FULL_QA_PASSED', evidence });
      if (actor.getSnapshot().value === 'candidate') {
        persistWorkflow(runStore, runRef, actor);
        return 'candidate';
      }
      throw new TypeError('Full-QA evidence is not bound to the candidate artifact');
    } catch (error) {
      const evidence = { reportId: `${runRef.runId}-qa-evidence`, status: 'failed' };
      runStore.appendEvent(runRef, { type: 'QA_BLOCKED', data: { evidence } });
      actor.send({ type: 'QA_BLOCKED', evidence });
      persistWorkflow(runStore, runRef, actor);
      return actor.getSnapshot().value;
    }
  }

  function requireHumanIntervention(runRef, actor, reportId) {
    const evidence = { reportId, status: 'failed' };
    runStore.appendEvent(runRef, { type: 'REPAIR_BLOCKED', data: { evidence } });
    actor.send({ type: 'HUMAN_INTERVENTION_REQUIRED', evidence });
    persistWorkflow(runStore, runRef, actor);
    return actor.getSnapshot().value;
  }

  async function executeOne(runRef, blueprint, actor) {
    requireExecutionDependencies();
    const run = runStore.loadRun(runRef);
    const node = nextReadyNode(run, blueprint);
    if (!node) return actor.getSnapshot().value === 'executing'
      ? finalizeCandidate(runRef, blueprint, actor)
      : actor.getSnapshot().value;
    const nodeExecutors = Object.fromEntries(Object.entries(executors).map(([kind, executor]) => [kind, {
      identity: executor.identity,
      async execute(taskPackage) {
        const result = await executor.execute(taskPackage);
        runStore.appendCost(runRef, {
          v: 1, rid: runRef.runId, nid: taskPackage.node.id, m: executor.identity, svc: 'ide',
          it: result.use?.it ?? null, ct: result.use?.ct ?? null, ot: result.use?.ot ?? null,
          ms: 0, try: 1, usd: null, est: false
        });
        return result;
      }
    }]));
    const scheduler = createDagScheduler({
      executors: nodeExecutors,
      verifier,
      runStore,
      budgetGovernor: createBudgetGovernor(blueprint.budget)
    });
    await scheduler.execute({ runRef, blueprint: { ...blueprint, nodes: [node] } });
    const after = runStore.loadRun(runRef);
    const pending = nextReadyNode(after, blueprint);
    if (!pending && !after.events.some((event) => event.type === 'TASK_FAILED')) {
      return finalizeCandidate(runRef, blueprint, actor);
    } else if (pending) {
      runStore.appendEvent(runRef, { type: 'RUN_PAUSED', data: { nodeId: node.id } });
    }
    persistWorkflow(runStore, runRef, actor);
    return pending ? 'paused' : actor.getSnapshot().value;
  }

  async function start(values) {
    requireStartDependencies();
    const clientId = values['--client'];
    const runId = assertSafeSlug(runIdFactory());
    const contextManifest = normalizeManifest(await readManifest(values['--context'], clientId), clientId);
    runStore.createRun({ ...initialWorkflowContext(runId, clientId), contextManifest });
    try {
      const blueprint = await planner.plan({
        runId,
        clientId,
        contextManifest: contextManifest.map(({ id, sha256, path: manifestPath }) => ({ id, sha: sha256, p: manifestPath })),
        runBudget: { usd: blueprintPolicy.runBudgetUsd, sol: 1, rp: 0 }
      });
      if (blueprint.runId !== runId || blueprint.clientId !== clientId) {
        throw cliError('BLUEPRINT_IDENTITY_MISMATCH', 'Blueprint identity does not match the created run');
      }
      validateBlueprint(blueprint, blueprintPolicy);
      runStore.appendEvent({ runId }, { type: 'SOL_CALL_RECORDED', data: {} });
      runStore.appendEvent({ runId }, { type: 'BLUEPRINT_ACCEPTED', data: { blueprint } });
      const actor = createWorkflowActor(createWorkflowMachine(initialWorkflowContext(runId, clientId)));
      actor.start();
      actor.send({ type: 'CONTEXT_FROZEN' });
      actor.send({ type: 'PLAN_REQUESTED' });
      actor.send({ type: 'BLUEPRINT_ACCEPTED' });
      actor.send({ type: 'EXECUTION_STARTED' });
      persistWorkflow(runStore, { runId }, actor);
      const state = await executeOne({ runId }, blueprint, actor);
      return { runId, state, validatedBeforeExecution: true };
    } catch (error) {
      throw error;
    }
  }

  async function inspect(values) {
    const run = runStore.loadRun({ runId: values['--run'] });
    return { runId: run.runRef.runId, state: workflowActorFor(run).getSnapshot().value, events: run.events, costs: run.costs, totals: run.totals };
  }

  async function resume(values) {
    const runRef = { runId: values['--run'] };
    const run = runStore.loadRun(runRef);
    const blueprint = blueprintFor(run);
    const actor = workflowActorFor(run);
    if (actor.getSnapshot().value === 'repairing') {
      const previousArtifact = actor.getSnapshot().context.candidateArtifact;
      if (typeof repairCandidate !== 'function' || previousArtifact === null) {
        return { runId: runRef.runId, state: requireHumanIntervention(runRef, actor, `${runRef.runId}-repair-unavailable`), costs: runStore.loadRun(runRef).costs };
      }
      let repairedArtifact;
      try {
        repairedArtifact = await repairCandidate({
          runRef,
          blueprint,
          previousArtifact,
          blockingEvidence: actor.getSnapshot().context.blockingEvidence
        });
      } catch (error) {
        return { runId: runRef.runId, state: requireHumanIntervention(runRef, actor, `${runRef.runId}-repair-failed`), costs: runStore.loadRun(runRef).costs };
      }
      if (!repairedArtifact || repairedArtifact.sha256 === previousArtifact.sha256) {
        return { runId: runRef.runId, state: requireHumanIntervention(runRef, actor, `${runRef.runId}-repair-unchanged`), costs: runStore.loadRun(runRef).costs };
      }
      actor.send({ type: 'REPAIR_COMPLETED' });
      actor.send({ type: 'EXECUTION_COMPLETED', candidateArtifact: repairedArtifact });
      if (actor.getSnapshot().value !== 'verifying') {
        return { runId: runRef.runId, state: requireHumanIntervention(runRef, actor, `${runRef.runId}-repair-invalid`), costs: runStore.loadRun(runRef).costs };
      }
      const state = await finalizeCandidate(runRef, blueprint, actor);
      const current = runStore.loadRun(runRef);
      return { runId: runRef.runId, state, costs: current.costs };
    } else if (actor.getSnapshot().value !== 'executing') {
      throw cliError('CLI_RESUME_INVALID_STATE', 'Only executing runs may be resumed');
    }
    const state = await executeOne(runRef, blueprint, actor);
    const current = runStore.loadRun(runRef);
    return { runId: runRef.runId, state, costs: current.costs };
  }

  async function approve(values) {
    const event = values['--event'];
    const runRef = { runId: values['--run'] };
    const run = runStore.loadRun(runRef);
    const actor = workflowActorFor(run);
    const state = actor.getSnapshot().value;
    const transitions = {
      'final-approval-requested': ['candidate', 'FINAL_APPROVAL_REQUESTED'],
      'final-approved': ['awaiting_final_approval', 'FINAL_APPROVED']
    };
    const transition = transitions[event];
    if (!transition) throw cliError('CLI_EVENT_UNKNOWN', 'Unknown approval event');
    if (state !== transition[0]) throw cliError('CLI_EVENT_INVALID_STATE', 'Approval event is not valid for the current run state');
    actor.send({ type: transition[1] });
    if (actor.getSnapshot().value === state) throw cliError('CLI_EVENT_INVALID_STATE', 'Approval event was rejected by the workflow');
    runStore.appendEvent(runRef, { type: 'APPROVAL_RECORDED', data: { actor: approverId, event: transition[1] } });
    persistWorkflow(runStore, runRef, actor);
    return { runId: runRef.runId, state: actor.getSnapshot().value };
  }

  async function execute(argv) {
    const { command, values } = parseArguments(argv);
    assertCommandArguments(command, values);
    return ({ start, inspect, approve, resume })[command](values);
  }

  return { execute };
}

async function main(argv = process.argv.slice(2), io = process, dependencies = {}) {
  try {
    const parsed = parseArguments(argv);
    assertCommandArguments(parsed.command, parsed.values);
    const rootDir = process.env.ORCHESTRATOR_ROOT || require('node:path').resolve('.orchestration', 'runs');
    const adapterModule = process.env.ORCHESTRATOR_ADAPTER_MODULE;
    let configured = {};
    if (adapterModule) {
      try {
        configured = require(require('node:path').resolve(adapterModule));
      } catch (error) {
        throw cliError('CLI_CONFIGURATION_INVALID', 'Configured orchestration adapter module could not be loaded');
      }
    }
    const result = await createOrchestrator({ rootDir, ...configured, ...dependencies }).execute(argv);
    io.stdout.write(`${JSON.stringify(result)}\n`);
    return 0;
  } catch (error) {
    io.stderr.write(`${error.code || 'CLI_ERROR'}: ${error.message}\n`);
    return error.code === 'CLI_ARGUMENT_INVALID' || error.code === 'CLI_COMMAND_UNKNOWN' ? 2 : 1;
  }
}

if (require.main === module) main().then((code) => { process.exitCode = code; });

module.exports = { createOrchestrator, main, parseArguments };
