#!/usr/bin/env node
const { assertSafeSlug } = require('../src/server/security');
const { createRunStore } = require('../src/orchestration/run-store');
const { validateBlueprint } = require('../src/orchestration/blueprint-validator');
const { createBudgetGovernor } = require('../src/orchestration/budget-governor');
const { createDagScheduler } = require('../src/orchestration/dag-scheduler');
const { createWorkflowMachine, createWorkflowActor } = require('../src/orchestration/workflow-machine');
const { createArtifactRegistry } = require('../src/orchestration/artifact-registry');
const { CostEventWire } = require('../src/orchestration/contracts');
const { buildTaskPackage } = require('../src/execution/task-package-builder');
const { createExecutionAdapters } = require('../src/execution/service-router');
const { isDeepStrictEqual } = require('node:util');

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

function dagExecutionStatus(run, blueprint) {
  const passed = new Set(run.events.filter((event) => event.type === 'TASK_PASSED').map((event) => event.data.nodeId));
  const failed = run.events.some((event) => event.type === 'TASK_FAILED');
  return {
    failed,
    complete: !failed && blueprint.nodes.every((node) => passed.has(node.id))
  };
}

function isBoundRegistryRef(ref, runRef, clientId, type) {
  return ref && ref.id === ref.sha256 && ref.runId === runRef.runId &&
    ref.clientId === clientId && ref.type === type;
}

function qaReportPayload(evidence) {
  if (!evidence || typeof evidence !== 'object' || Array.isArray(evidence)) return null;
  const payload = { ...evidence };
  delete payload.reportArtifact;
  return payload;
}

function createOrchestrator({
  rootDir,
  planner,
  executors,
  executionAdapters,
  serviceRouter,
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
  const artifactRegistry = createArtifactRegistry({ rootDir });
  if ((executors && (executionAdapters || serviceRouter)) || (executionAdapters && serviceRouter)) {
    throw cliError('CLI_CONFIGURATION_INVALID', 'Execution composition is ambiguous');
  }
  const routedExecutionAdapters = executionAdapters || serviceRouter;

  function requireStartDependencies() {
    if (!planner || typeof planner.plan !== 'function') {
      throw cliError('CLI_COMPOSITION_UNAVAILABLE', 'A planner adapter must be injected for start');
    }
    if ((!executors && !routedExecutionAdapters) || !verifier || !blueprintPolicy || typeof runIdFactory !== 'function' || typeof readManifest !== 'function') {
      throw cliError('CLI_COMPOSITION_UNAVAILABLE', 'Execution adapters must be injected by the composition root');
    }
  }

  function requireExecutionDependencies() {
    if ((!executors && !routedExecutionAdapters) || !verifier || !blueprintPolicy || typeof candidateArtifact !== 'function' || typeof qaEvidence !== 'function') {
      throw cliError('CLI_COMPOSITION_UNAVAILABLE', 'Execution adapters must be injected by the composition root');
    }
  }

  function routedExecutorFor(node) {
    const executor = typeof routedExecutionAdapters?.forNode === 'function'
      ? routedExecutionAdapters.forNode(node)
      : routedExecutionAdapters?.default;
    if (!executor || typeof executor.identity !== 'string' || typeof executor.model !== 'string'
      || !['standard', 'batch', 'flex', 'ide'].includes(executor.service) || typeof executor.execute !== 'function') {
      throw cliError('CLI_COMPOSITION_UNAVAILABLE', 'Service router must provide an executable adapter for each node');
    }
    return executor;
  }

  async function finalizeCandidate(runRef, blueprint, actor) {
    try {
      let artifact = actor.getSnapshot().context.candidateArtifact;
      if (artifact === null) artifact = await candidateArtifact({ runRef, blueprint, artifactRegistry });
      if (!isBoundRegistryRef(artifact, runRef, blueprint.clientId, 'site')) {
        throw new TypeError('Candidate artifact is not bound to this run and client');
      }
      artifactRegistry.verify(artifact);
      actor.send({ type: 'EXECUTION_COMPLETED', candidateArtifact: artifact });
      if (actor.getSnapshot().value !== 'verifying') throw new TypeError('Candidate artifact was rejected by the workflow');
      const evidence = await qaEvidence({ runRef, blueprint, candidateArtifact: artifact, artifactRegistry });
      if (!isBoundRegistryRef(evidence?.reportArtifact, runRef, blueprint.clientId, 'qa-report')) {
        throw new TypeError('QA report artifact is not bound to this run and client');
      }
      const storedReport = artifactRegistry.verify(evidence.reportArtifact);
      if (!isDeepStrictEqual(storedReport.value, qaReportPayload(evidence)) ||
        !Array.isArray(storedReport.sources) ||
        !storedReport.sources.some((source) => isDeepStrictEqual(source, artifact))) {
        throw new TypeError('QA evidence does not match its candidate-bound registry report');
      }
      runStore.appendEvent(runRef, { type: 'QA_EVIDENCE_RECORDED', data: { evidence } });
      actor.send({ type: 'FULL_QA_PASSED', evidence });
      if (actor.getSnapshot().value === 'candidate') {
        persistWorkflow(runStore, runRef, actor);
        return 'candidate';
      }
      throw new TypeError('Full-QA evidence is not bound to the candidate artifact');
    } catch (error) {
      if (actor.getSnapshot().value === 'executing') {
        runStore.appendEvent(runRef, { type: 'CANDIDATE_REJECTED', data: { code: error.code || 'CANDIDATE_INVALID' } });
        actor.send({ type: 'WORKFLOW_FAILED' });
        persistWorkflow(runStore, runRef, actor);
        return actor.getSnapshot().value;
      }
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
    if (!node) {
      const status = dagExecutionStatus(run, blueprint);
      if (status.complete && actor.getSnapshot().value === 'executing') {
        return { state: await finalizeCandidate(runRef, blueprint, actor) };
      }
      if (actor.getSnapshot().value === 'executing') actor.send({ type: 'WORKFLOW_FAILED' });
      persistWorkflow(runStore, runRef, actor);
      return { state: actor.getSnapshot().value };
    }
    const nodeExecutors = executors
      ? Object.fromEntries(Object.entries(executors).map(([kind, executor]) => [kind, {
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
      }]))
      : (() => {
        const executor = routedExecutorFor(node);
        function appendAdapterCost(taskPackage, rawCost) {
          let costEvent;
          try {
            costEvent = CostEventWire.parse(rawCost);
          } catch {
            throw cliError('EXECUTOR_COST_PROVENANCE_MISMATCH', 'Adapter cost event is malformed');
          }
          if (costEvent.rid !== runRef.runId || costEvent.nid !== taskPackage.node.id
            || costEvent.m !== executor.model || costEvent.svc !== executor.service
            || costEvent.try > taskPackage.node.budget.maxAttempts) {
            throw cliError('EXECUTOR_COST_PROVENANCE_MISMATCH', 'Adapter cost event does not match the selected adapter and task');
          }
          runStore.appendCost(runRef, costEvent);
        }
        return {
          [node.kind]: {
            identity: executor.identity,
            async execute(taskPackage) {
              const packageForAdapter = buildTaskPackage({
                blueprint,
                node: taskPackage.node,
                artifacts: taskPackage.dependencyArtifacts
              });
              const currentRun = runStore.loadRun(runRef);
              const waiting = currentRun.events.filter((event) => (
                (event.type === 'TASK_WAITING' || event.type === 'TASK_PASSED' || event.type === 'TASK_FAILED')
                && event.data.nodeId === node.id
              )).at(-1)?.type === 'TASK_WAITING';
              let executed;
              try {
                if (waiting) {
                  if (typeof executor.collectResult !== 'function') {
                    throw cliError('CLI_COMPOSITION_UNAVAILABLE', 'Waiting adapter must support controlled result collection');
                  }
                  executed = await executor.collectResult(runRef.runId, node.id);
                } else {
                  executed = await executor.execute(packageForAdapter);
                }
              } catch (error) {
                if (error?.costEvent) appendAdapterCost(taskPackage, error.costEvent);
                throw error;
              }
              if (executed?.status === 'awaiting_external_result') return executed;
              appendAdapterCost(taskPackage, executed?.costEvent);
              return executed.result;
            }
          }
        };
      })();
    const scheduler = createDagScheduler({
      executors: nodeExecutors,
      verifier,
      runStore,
      budgetGovernor: createBudgetGovernor(blueprint.budget)
    });
    const scheduled = await scheduler.execute({ runRef, blueprint: { ...blueprint, nodes: [node] } });
    if (scheduled.waiting) {
      runStore.appendEvent(runRef, { type: 'RUN_PAUSED', data: { nodeId: node.id, reason: 'awaiting_external_result' } });
      persistWorkflow(runStore, runRef, actor);
      return { state: 'paused', waiting: scheduled.waiting };
    }
    const after = runStore.loadRun(runRef);
    const status = dagExecutionStatus(after, blueprint);
    const pending = nextReadyNode(after, blueprint);
    if (status.complete) {
      return { state: await finalizeCandidate(runRef, blueprint, actor) };
    } else if (status.failed) {
      actor.send({ type: 'WORKFLOW_FAILED' });
    } else if (pending) {
      runStore.appendEvent(runRef, { type: 'RUN_PAUSED', data: { nodeId: node.id } });
    }
    persistWorkflow(runStore, runRef, actor);
    return { state: pending && !status.failed ? 'paused' : actor.getSnapshot().value };
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
      const execution = await executeOne({ runId }, blueprint, actor);
      return { runId, ...execution, validatedBeforeExecution: true };
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
          blockingEvidence: actor.getSnapshot().context.blockingEvidence,
          artifactRegistry
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
    const execution = await executeOne(runRef, blueprint, actor);
    const current = runStore.loadRun(runRef);
    return { runId: runRef.runId, ...execution, costs: current.costs };
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
    const composition = { rootDir, ...configured, ...dependencies };
    if (composition.executionAdapterConfig) {
      if (composition.executors || composition.executionAdapters || composition.serviceRouter) {
        throw cliError('CLI_CONFIGURATION_INVALID', 'Execution adapter config conflicts with an injected execution implementation');
      }
      composition.executionAdapters = createExecutionAdapters(composition.executionAdapterConfig);
      delete composition.executionAdapterConfig;
    }
    const result = await createOrchestrator(composition).execute(argv);
    io.stdout.write(`${JSON.stringify(result)}\n`);
    return 0;
  } catch (error) {
    io.stderr.write(`${error.code || 'CLI_ERROR'}: ${error.message}\n`);
    return error.code === 'CLI_ARGUMENT_INVALID' || error.code === 'CLI_COMMAND_UNKNOWN' ? 2 : 1;
  }
}

if (require.main === module) main().then((code) => { process.exitCode = code; });

module.exports = { createOrchestrator, main, parseArguments };
