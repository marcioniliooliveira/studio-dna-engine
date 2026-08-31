const { TaskResultWire } = require('./contracts');

function schedulerError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function completedNodeIds(events) {
  return new Set(events.filter((event) => event.type === 'TASK_PASSED').map((event) => event.data.nodeId));
}

function failedNodeIds(events) {
  return new Set(events.filter((event) => event.type === 'TASK_FAILED').map((event) => event.data.nodeId));
}

function unknownReservations(events, costs) {
  const costNodeIds = new Set(costs.filter((entry) => entry.data.usd === null).map((entry) => entry.data.nid));
  return events
    .filter((event) => event.type === 'TASK_AUTHORIZED' && costNodeIds.has(event.data.nodeId))
    .reduce((sum, event) => sum + event.data.reservedUsd, 0);
}

function readyNodes(nodes, passed, failed) {
  return nodes
    .filter((node) => !passed.has(node.id) && !failed.has(node.id))
    .filter((node) => node.dependencies.every((dependency) => passed.has(dependency)))
    .sort((left, right) => left.id.localeCompare(right.id));
}

function assertExecutionCaps(blueprint, events) {
  if (blueprint.budget.maxSolCalls !== 1 || blueprint.budget.maxReplans > 1) {
    throw schedulerError('RUN_CAP_INVALID', 'Blueprint violates Sol or replan caps');
  }
  const solCalls = events.filter((event) => event.type === 'SOL_CALL_RECORDED').length;
  const replans = events.filter((event) => event.type === 'REPLAN_APPROVED').length;
  if (solCalls > blueprint.budget.maxSolCalls || replans > blueprint.budget.maxReplans) {
    throw schedulerError('RUN_CAP_EXCEEDED', 'Persisted run evidence exceeds Sol or replan caps');
  }
  for (const node of blueprint.nodes) {
    if (!Number.isInteger(node.budget.maxAttempts) || node.budget.maxAttempts < 1 || node.budget.maxAttempts > 3) {
      throw schedulerError('NODE_ATTEMPT_CAP_INVALID', `Node ${node.id} violates the attempt cap`);
    }
  }
}

function taskPackage(runRef, blueprint, node) {
  return { runId: runRef.runId, clientId: blueprint.clientId, node, context: blueprint.context };
}

function reservationCostEvent(runRef, node, reservedUsd) {
  return {
    v: 1, rid: runRef.runId, nid: node.id, m: 'budget-reservation', svc: 'ide',
    it: null, ct: null, ot: null, ms: 0, try: 1, usd: reservedUsd, est: true
  };
}

function verifierPassed(verification) {
  return verification === true || verification?.passed === true;
}

function matchesTaskPackage(result, task) {
  return result.rid === task.runId && result.cid === task.clientId && result.nid === task.node.id;
}

function assertRunIdentity(run, runRef, blueprint) {
  if (
    run.state?.runId !== runRef.runId
    || run.state?.clientId !== blueprint.clientId
    || blueprint.runId !== runRef.runId
  ) {
    throw schedulerError('RUN_BLUEPRINT_IDENTITY_MISMATCH', 'Blueprint is not bound to the durable run identity');
  }
}

function isIndependentExecutor(executor, verifier) {
  return typeof executor?.identity === 'string'
    && typeof verifier.identity === 'string'
    && executor.identity !== verifier.identity
    && verifier.independent === true;
}

function nextBlockedNode(nodes, passed, failed) {
  return nodes
    .filter((node) => !passed.has(node.id) && !failed.has(node.id))
    .sort((left, right) => left.id.localeCompare(right.id))[0];
}

function createDagScheduler({ executors, verifier, runStore, budgetGovernor }) {
  if (!executors || !verifier || typeof verifier.verify !== 'function' || !runStore || !budgetGovernor) {
    throw new TypeError('executors, verifier, runStore, and budgetGovernor are required');
  }

  async function execute({ runRef, blueprint }) {
    const run = runStore.loadRun(runRef);
    assertRunIdentity(run, runRef, blueprint);
    assertExecutionCaps(blueprint, run.events);
    const passed = completedNodeIds(run.events);
    const failed = failedNodeIds(run.events);
    const executedNodeIds = [];

    while (true) {
      const node = readyNodes(blueprint.nodes, passed, failed)[0];
      if (!node) {
        const blockedNode = nextBlockedNode(blueprint.nodes, passed, failed);
        if (!blockedNode) break;
        const dependencyIds = blockedNode.dependencies.filter((dependency) => !passed.has(dependency));
        const code = dependencyIds.some((dependency) => failed.has(dependency))
          ? 'DEPENDENCY_FAILED'
          : 'DEPENDENCY_UNRESOLVED';
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: blockedNode.id, code, evidence: { dependencyIds } } });
        failed.add(blockedNode.id);
        continue;
      }
      const currentRun = runStore.loadRun(runRef);
      assertRunIdentity(currentRun, runRef, blueprint);
      const executor = executors[node.kind];
      if (!executor || typeof executor.execute !== 'function') {
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: 'EXECUTOR_UNAVAILABLE', evidence: null } });
        failed.add(node.id);
        continue;
      }
      if (!isIndependentExecutor(executor, verifier)) {
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: 'EXECUTOR_VERIFIER_NOT_INDEPENDENT', evidence: null } });
        failed.add(node.id);
        continue;
      }
      const authorization = budgetGovernor.authorize(node, {
        usd: currentRun.totals.usd,
        reservedUsd: unknownReservations(currentRun.events, currentRun.costs)
      });
      if (!authorization.allowed) {
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: authorization.reason, evidence: null } });
        failed.add(node.id);
        continue;
      }

      runStore.appendEvent(runRef, { type: 'TASK_AUTHORIZED', data: { nodeId: node.id, reservedUsd: authorization.reservedUsd } });
      runStore.appendCost(runRef, reservationCostEvent(runRef, node, authorization.reservedUsd));

      const packageForNode = taskPackage(runRef, blueprint, node);
      let result;
      try {
        result = TaskResultWire.parse(await executor.execute(packageForNode));
      } catch (error) {
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: 'EXECUTOR_EXCEPTION', evidence: { message: error.message } } });
        failed.add(node.id);
        continue;
      }
      if (!matchesTaskPackage(result, packageForNode)) {
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: 'TASK_RESULT_IDENTITY_MISMATCH', evidence: null } });
        failed.add(node.id);
        continue;
      }
      if (result.st !== 'ok') {
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: 'EXECUTOR_REPORTED_FAILURE', evidence: result.err } });
        failed.add(node.id);
        continue;
      }

      let verification;
      try {
        verification = await verifier.verify({ taskPackage: packageForNode, result });
      } catch (error) {
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: 'VERIFIER_EXCEPTION', evidence: { message: error.message } } });
        failed.add(node.id);
        continue;
      }
      if (!verifierPassed(verification)) {
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: 'VERIFICATION_REJECTED', evidence: verification?.evidence || null } });
        failed.add(node.id);
        continue;
      }
      runStore.appendEvent(runRef, { type: 'TASK_PASSED', data: { nodeId: node.id, evidence: verification?.evidence || null } });
      passed.add(node.id);
      executedNodeIds.push(node.id);
    }
    return { passedNodeIds: [...passed].sort(), failedNodeIds: [...failed].sort(), executedNodeIds };
  }

  return { execute };
}

module.exports = { createDagScheduler };
