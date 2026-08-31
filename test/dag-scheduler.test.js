const test = require('node:test');
const assert = require('node:assert/strict');
const { createDagScheduler } = require('../src/orchestration/dag-scheduler');

function node(id, dependencies = []) {
  return {
    id,
    kind: 'build',
    dependencies,
    inputs: ['ctx-1'],
    outputs: [`${id}-output`],
    paths: ['clientes/client-alpha/site/index.html'],
    needsInput: false,
    toolLabels: ['pipeline.build'],
    budget: { maxInputTokens: 1, maxOutputTokens: 1, maxUsd: 0.1, maxAttempts: 1 },
    gates: ['core-runtime']
  };
}

function blueprint(nodes) {
  return {
    runId: 'run-001',
    clientId: 'client-alpha',
    context: [{ id: 'ctx-1', sha256: 'a'.repeat(64), path: 'clientes/client-alpha/DNA.md' }],
    nodes,
    budget: { maxUsd: 1, maxSolCalls: 1, maxReplans: 0 }
  };
}

function createMemoryRunStore() {
  const events = [];
  const costs = [];
  return {
    events,
    costs,
    loadRun: () => ({ state: { runId: 'run-001', clientId: 'client-alpha' }, events, costs, totals: { usd: costs.some((entry) => entry.data.usd === null) ? null : costs.reduce((sum, entry) => sum + entry.data.usd, 0) } }),
    appendEvent: (_runRef, event) => events.push(event),
    appendCost: (_runRef, cost) => costs.push({ data: cost })
  };
}

function successfulResult(taskPackage) {
  return {
    v: 1, rid: taskPackage.runId, cid: taskPackage.clientId, nid: taskPackage.node.id,
    st: 'ok', art: [], chg: [], use: { it: 1, ct: 1, ot: 1 }, err: null
  };
}

test('executes ready nodes in deterministic topological order', async () => {
  const order = [];
  const runStore = createMemoryRunStore();
  const scheduler = createDagScheduler({
    executors: { build: { identity: 'builder', execute: async (taskPackage) => { order.push(taskPackage.node.id); return successfulResult(taskPackage); } } },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => ({ passed: true }) },
    runStore,
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });

  await scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: blueprint([node('n3', ['n1']), node('n2', ['n1']), node('n1')]) });

  assert.deepEqual(order, ['n1', 'n2', 'n3']);
});

test('records verification rejection instead of passing an executor-reported success', async () => {
  const runStore = createMemoryRunStore();
  const scheduler = createDagScheduler({
    executors: { build: { identity: 'builder', execute: async (taskPackage) => successfulResult(taskPackage) } },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => ({ passed: false, evidence: { gate: 'core-runtime' } }) },
    runStore,
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });

  const result = await scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: blueprint([node('n1')]) });

  assert.deepEqual(result.failedNodeIds, ['n1']);
  assert.deepEqual(runStore.events.at(-1), {
    type: 'TASK_FAILED',
    data: { nodeId: 'n1', code: 'VERIFICATION_REJECTED', evidence: { gate: 'core-runtime' } }
  });
});

test('rejects over-budget work before invoking its executor', async () => {
  let executions = 0;
  const runStore = createMemoryRunStore();
  const scheduler = createDagScheduler({
    executors: { build: { identity: 'builder', execute: async (taskPackage) => { executions += 1; return successfulResult(taskPackage); } } },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => ({ passed: true }) },
    runStore,
    budgetGovernor: { authorize: () => ({ allowed: false, reservedUsd: 0.2, reason: 'NODE_BUDGET_EXCEEDS_REMAINING' }) }
  });

  await scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: blueprint([node('n1')]) });

  assert.equal(executions, 0);
  assert.deepEqual(runStore.events.at(-1), {
    type: 'TASK_FAILED',
    data: { nodeId: 'n1', code: 'NODE_BUDGET_EXCEEDS_REMAINING', evidence: null }
  });
});

test('resumes from persisted passed nodes without executing them again', async () => {
  const order = [];
  const runStore = createMemoryRunStore();
  runStore.events.push({ type: 'TASK_PASSED', data: { nodeId: 'n1', evidence: null } });
  const scheduler = createDagScheduler({
    executors: { build: { identity: 'builder', execute: async (taskPackage) => { order.push(taskPackage.node.id); return successfulResult(taskPackage); } } },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => ({ passed: true }) },
    runStore,
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });

  await scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: blueprint([node('n1'), node('n2', ['n1'])]) });

  assert.deepEqual(order, ['n2']);
});

test('persists executor exception evidence as a failed node', async () => {
  const runStore = createMemoryRunStore();
  const scheduler = createDagScheduler({
    executors: { build: { identity: 'builder', execute: async () => { throw new Error('executor offline'); } } },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => ({ passed: true }) },
    runStore,
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });

  const result = await scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: blueprint([node('n1')]) });

  assert.deepEqual(result.failedNodeIds, ['n1']);
  assert.deepEqual(runStore.events.at(-1), {
    type: 'TASK_FAILED',
    data: { nodeId: 'n1', code: 'EXECUTOR_EXCEPTION', evidence: { message: 'executor offline' } }
  });
});

test('persists verifier exception evidence as a failed node', async () => {
  const runStore = createMemoryRunStore();
  const scheduler = createDagScheduler({
    executors: { build: { identity: 'builder', execute: async (taskPackage) => successfulResult(taskPackage) } },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => { throw new Error('verifier unavailable'); } },
    runStore,
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });

  const result = await scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: blueprint([node('n1')]) });

  assert.deepEqual(result.failedNodeIds, ['n1']);
  assert.deepEqual(runStore.events.at(-1), {
    type: 'TASK_FAILED',
    data: { nodeId: 'n1', code: 'VERIFIER_EXCEPTION', evidence: { message: 'verifier unavailable' } }
  });
});

test('fails closed before executing a node with more than three allowed attempts', async () => {
  let executions = 0;
  const invalidNode = node('n1');
  invalidNode.budget.maxAttempts = 4;
  const scheduler = createDagScheduler({
    executors: { build: { identity: 'builder', execute: async (taskPackage) => { executions += 1; return successfulResult(taskPackage); } } },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => ({ passed: true }) },
    runStore: createMemoryRunStore(),
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });

  await assert.rejects(
    scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: blueprint([invalidNode]) }),
    (error) => error.code === 'NODE_ATTEMPT_CAP_INVALID'
  );
  assert.equal(executions, 0);
});

test('rejects an executor result that is bound to another node', async () => {
  const runStore = createMemoryRunStore();
  const scheduler = createDagScheduler({
    executors: { build: { identity: 'builder', execute: async (taskPackage) => ({ ...successfulResult(taskPackage), nid: 'n2' }) } },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => ({ passed: true }) },
    runStore,
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });

  const result = await scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: blueprint([node('n1')]) });

  assert.deepEqual(result.failedNodeIds, ['n1']);
  assert.deepEqual(runStore.events.at(-1), {
    type: 'TASK_FAILED',
    data: { nodeId: 'n1', code: 'TASK_RESULT_IDENTITY_MISMATCH', evidence: null }
  });
  assert.equal(runStore.costs[0].data.usd, 0.1);
  assert.equal(runStore.costs[0].data.est, true);
});

test('rejects executor changes outside the active client and node paths', async () => {
  let verifierCalls = 0;
  const runStore = createMemoryRunStore();
  const scheduler = createDagScheduler({
    executors: {
      build: {
        identity: 'builder',
        execute: async (taskPackage) => ({
          ...successfulResult(taskPackage),
          chg: ['clientes/client-beta/site/index.html']
        })
      }
    },
    verifier: {
      identity: 'quality-gate', independent: true,
      verify: async () => { verifierCalls += 1; return { passed: true }; }
    },
    runStore,
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });

  const result = await scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: blueprint([node('n1')]) });

  assert.deepEqual(result.failedNodeIds, ['n1']);
  assert.equal(verifierCalls, 0);
  assert.equal(runStore.events.at(-1).data.code, 'TASK_RESULT_SCOPE_VIOLATION');
});

test('filters node context and passes only verified direct-dependency artifacts', async () => {
  const packages = [];
  const runStore = createMemoryRunStore();
  runStore.events.push({
    type: 'TASK_PASSED',
    data: { nodeId: 'unrelated', evidence: null, artifacts: [{ id: 'other-output', sha: 'f'.repeat(64) }] }
  });
  const first = node('n1');
  const second = node('n2', ['n1']);
  const plan = blueprint([first, second]);
  plan.context.push({ id: 'ctx-secret', sha256: 'b'.repeat(64), path: 'clientes/client-alpha/secret.md' });
  const scheduler = createDagScheduler({
    executors: {
      build: {
        identity: 'builder',
        execute: async (taskPackage) => {
          packages.push(taskPackage);
          return {
            ...successfulResult(taskPackage),
            art: taskPackage.node.id === 'n1'
              ? [{ id: 'n1-output', sha: 'c'.repeat(64) }]
              : []
          };
        }
      }
    },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => ({ passed: true }) },
    runStore,
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });

  await scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: plan });

  assert.deepEqual(packages[0].context.map((entry) => entry.id), ['ctx-1']);
  assert.deepEqual(packages[0].dependencyArtifacts, []);
  assert.deepEqual(packages[1].context.map((entry) => entry.id), ['ctx-1']);
  assert.deepEqual(packages[1].dependencyArtifacts, [{
    runId: 'run-001', clientId: 'client-alpha', nodeId: 'n1', id: 'n1-output', sha: 'c'.repeat(64)
  }]);
});

test('records the reserved cost when an authorized executor throws', async () => {
  const runStore = createMemoryRunStore();
  const scheduler = createDagScheduler({
    executors: { build: { identity: 'builder', execute: async () => { throw new Error('executor offline'); } } },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => ({ passed: true }) },
    runStore,
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });

  await scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: blueprint([node('n1')]) });

  assert.deepEqual(runStore.costs.map((entry) => entry.data), [{
    v: 1, rid: 'run-001', nid: 'n1', m: 'budget-reservation', svc: 'ide',
    it: null, ct: null, ot: null, ms: 0, try: 1, usd: 0.1, est: true
  }]);
});

test('rejects a blueprint not bound to the durable run identity before executor entry', async () => {
  let executions = 0;
  const scheduler = createDagScheduler({
    executors: { build: { identity: 'builder', execute: async (taskPackage) => { executions += 1; return successfulResult(taskPackage); } } },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => ({ passed: true }) },
    runStore: createMemoryRunStore(),
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });
  const invalidBlueprint = blueprint([node('n1')]);
  invalidBlueprint.clientId = 'other-client';

  await assert.rejects(
    scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: invalidBlueprint }),
    (error) => error.code === 'RUN_BLUEPRINT_IDENTITY_MISMATCH'
  );
  assert.equal(executions, 0);
});

test('rejects an executor that is not independent from the verifier', async () => {
  let executions = 0;
  const scheduler = createDagScheduler({
    executors: { build: { identity: 'quality-gate', execute: async (taskPackage) => { executions += 1; return successfulResult(taskPackage); } } },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => ({ passed: true }) },
    runStore: createMemoryRunStore(),
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });

  const result = await scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: blueprint([node('n1')]) });

  assert.deepEqual(result.failedNodeIds, ['n1']);
  assert.equal(executions, 0);
  assert.equal(result.passedNodeIds.length, 0);
});

test('records descendants as blocked when their dependency fails', async () => {
  const runStore = createMemoryRunStore();
  const scheduler = createDagScheduler({
    executors: { build: { identity: 'builder', execute: async () => { throw new Error('executor offline'); } } },
    verifier: { identity: 'quality-gate', independent: true, verify: async () => ({ passed: true }) },
    runStore,
    budgetGovernor: { authorize: () => ({ allowed: true, reservedUsd: 0.1, reason: 'BUDGET_OK' }) }
  });

  const result = await scheduler.execute({ runRef: { runId: 'run-001' }, blueprint: blueprint([node('n1'), node('n2', ['n1']), node('n3', ['n2'])]) });

  assert.deepEqual(result.failedNodeIds, ['n1', 'n2', 'n3']);
  assert.deepEqual(runStore.events.slice(-2), [
    { type: 'TASK_FAILED', data: { nodeId: 'n2', code: 'DEPENDENCY_FAILED', evidence: { dependencyIds: ['n1'] } } },
    { type: 'TASK_FAILED', data: { nodeId: 'n3', code: 'DEPENDENCY_FAILED', evidence: { dependencyIds: ['n2'] } } }
  ]);
});
