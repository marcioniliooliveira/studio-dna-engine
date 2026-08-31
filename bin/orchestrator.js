#!/usr/bin/env node
const { assertSafeSlug } = require('../src/server/security');
const { createRunStore } = require('../src/orchestration/run-store');
const { validateBlueprint } = require('../src/orchestration/blueprint-validator');
const { createBudgetGovernor } = require('../src/orchestration/budget-governor');
const { createDagScheduler } = require('../src/orchestration/dag-scheduler');

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

function runState(run, blueprint) {
  if (run.events.some((event) => event.type === 'FINAL_APPROVED')) return 'verified';
  if (run.events.some((event) => event.type === 'FINAL_APPROVAL_REQUESTED')) return 'awaiting_final_approval';
  if (run.events.some((event) => event.type === 'RUN_CANDIDATE')) return 'candidate';
  if (run.events.some((event) => event.type === 'TASK_FAILED')) return 'failed';
  const passed = new Set(run.events.filter((event) => event.type === 'TASK_PASSED').map((event) => event.data.nodeId));
  return passed.size === blueprint.nodes.length ? 'candidate' : 'paused';
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
  blueprintPolicy
} = {}) {
  if (typeof rootDir !== 'string' || rootDir.length === 0) throw new TypeError('rootDir is required');
  const runStore = createRunStore({ rootDir });

  function requirePlanner() {
    if (!planner || typeof planner.plan !== 'function') {
      throw cliError('CLI_COMPOSITION_UNAVAILABLE', 'A planner adapter must be injected for start');
    }
    if (!executors || !verifier || !blueprintPolicy || typeof runIdFactory !== 'function' || typeof readManifest !== 'function') {
      throw cliError('CLI_COMPOSITION_UNAVAILABLE', 'Execution adapters must be injected by the composition root');
    }
  }

  async function executeOne(runRef, blueprint) {
    const run = runStore.loadRun(runRef);
    const node = nextReadyNode(run, blueprint);
    if (!node) return runState(run, blueprint);
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
    const state = runState(after, blueprint);
    if (state === 'candidate' && !after.events.some((event) => event.type === 'RUN_CANDIDATE')) {
      runStore.appendEvent(runRef, { type: 'RUN_CANDIDATE', data: {} });
    } else if (state === 'paused') {
      runStore.appendEvent(runRef, { type: 'RUN_PAUSED', data: { nodeId: node.id } });
    }
    return runState(runStore.loadRun(runRef), blueprint);
  }

  async function start(values) {
    requirePlanner();
    const clientId = values['--client'];
    const runId = assertSafeSlug(runIdFactory());
    const contextManifest = normalizeManifest(await readManifest(values['--context'], clientId), clientId);
    runStore.createRun({ runId, clientId, contextManifest });
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
      const state = await executeOne({ runId }, blueprint);
      return { runId, state, validatedBeforeExecution: true };
    } catch (error) {
      throw error;
    }
  }

  async function inspect(values) {
    const run = runStore.loadRun({ runId: values['--run'] });
    return { runId: run.runRef.runId, state: runState(run, blueprintFor(run)), events: run.events, costs: run.costs, totals: run.totals };
  }

  async function resume(values) {
    requirePlanner();
    const runRef = { runId: values['--run'] };
    const run = runStore.loadRun(runRef);
    const blueprint = blueprintFor(run);
    const state = await executeOne(runRef, blueprint);
    const current = runStore.loadRun(runRef);
    return { runId: runRef.runId, state, costs: current.costs };
  }

  async function approve(values) {
    const event = values['--event'];
    const runRef = { runId: values['--run'] };
    const run = runStore.loadRun(runRef);
    const state = runState(run, blueprintFor(run));
    const transitions = {
      'final-approval-requested': ['candidate', 'FINAL_APPROVAL_REQUESTED'],
      'final-approved': ['awaiting_final_approval', 'FINAL_APPROVED']
    };
    const transition = transitions[event];
    if (!transition) throw cliError('CLI_EVENT_UNKNOWN', 'Unknown approval event');
    if (state !== transition[0]) throw cliError('CLI_EVENT_INVALID_STATE', 'Approval event is not valid for the current run state');
    runStore.appendEvent(runRef, { type: transition[1], data: {} });
    return { runId: runRef.runId, state: runState(runStore.loadRun(runRef), blueprintFor(run)) };
  }

  async function execute(argv) {
    const { command, values } = parseArguments(argv);
    assertCommandArguments(command, values);
    return ({ start, inspect, approve, resume })[command](values);
  }

  return { execute };
}

async function main(argv = process.argv.slice(2), io = process) {
  try {
    const rootDir = process.env.ORCHESTRATOR_ROOT || require('node:path').resolve('.orchestration', 'runs');
    const result = await createOrchestrator({ rootDir }).execute(argv);
    io.stdout.write(`${JSON.stringify(result)}\n`);
    return 0;
  } catch (error) {
    io.stderr.write(`${error.code || 'CLI_ERROR'}: ${error.message}\n`);
    return error.code === 'CLI_ARGUMENT_INVALID' || error.code === 'CLI_COMMAND_UNKNOWN' ? 2 : 1;
  }
}

if (require.main === module) main().then((code) => { process.exitCode = code; });

module.exports = { createOrchestrator, main, parseArguments };
