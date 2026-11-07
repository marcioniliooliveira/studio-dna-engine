'use strict';

const { TaskResultWire } = require('./contracts');
const { isDeepStrictEqual } = require('node:util');

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

function isWaitingForExternalResult(events, nodeId) {
  return events.filter((event) => (
    (event.type === 'TASK_WAITING' || event.type === 'TASK_PASSED' || event.type === 'TASK_FAILED')
    && event.data.nodeId === nodeId
  )).at(-1)?.type === 'TASK_WAITING';
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

function dependencyArtifacts(events, runRef, blueprint, node) {
  const dependencyIds = new Set(node.dependencies);
  const producers = new Map(blueprint.nodes.map((producer) => [producer.id, producer]));
  return events
    .filter((event) => event.type === 'TASK_PASSED' && dependencyIds.has(event.data.nodeId))
    .flatMap((event) => {
      const authorizedOutputIds = new Set(producers.get(event.data.nodeId)?.outputs || []);
      return (event.data.artifacts || [])
        .filter((artifact) => authorizedOutputIds.has(artifact.id))
        .map((artifact) => ({
          runId: runRef.runId,
          clientId: blueprint.clientId,
          nodeId: event.data.nodeId,
          id: artifact.id,
          sha: artifact.sha
        }));
    });
}

function taskPackage(runRef, blueprint, node, events) {
  const inputIds = new Set(node.inputs);
  return {
    runId: runRef.runId,
    clientId: blueprint.clientId,
    node,
    context: blueprint.context.filter((entry) => inputIds.has(entry.id)),
    dependencyArtifacts: dependencyArtifacts(events, runRef, blueprint, node)
  };
}

function verifierTaskPackage(task) {
  return {
    rid: task.runId,
    cid: task.clientId,
    nid: task.node.id,
    out: [...task.node.outputs],
    g: [...task.node.gates],
    p: [...task.node.paths]
  };
}

function changesStayWithinNodeScope(changedPaths, blueprint, node) {
  const clientPrefix = `clientes/${blueprint.clientId}/`;
  const allowedPaths = new Set(node.paths);
  return changedPaths.every((changedPath) =>
    changedPath.startsWith(clientPrefix) &&
    !changedPath.includes('\\') &&
    !changedPath.split('/').includes('..') &&
    allowedPaths.has(changedPath)
  );
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

function acceptedBlueprintFor(events) {
  const blueprint = events.find((event) => event.type === 'BLUEPRINT_ACCEPTED')?.data?.blueprint;
  if (!blueprint) throw schedulerError('RUN_BLUEPRINT_MISSING', 'Run has no accepted blueprint');
  return blueprint;
}

function declarationsAreUnique(blueprint) {
  if (!Array.isArray(blueprint?.nodes) || blueprint.nodes.length === 0) return false;
  const nodeIds = new Set();
  const outputIds = new Set();
  for (const node of blueprint.nodes) {
    if (nodeIds.has(node.id) || !Array.isArray(node.outputs) || node.outputs.length === 0) return false;
    nodeIds.add(node.id);
    for (const outputId of node.outputs) {
      if (outputIds.has(outputId)) return false;
      outputIds.add(outputId);
    }
  }
  return true;
}

function blueprintMetadata(blueprint) {
  const { nodes, ...metadata } = blueprint;
  return metadata;
}

function bindAcceptedBlueprint(run, runRef, callerBlueprint) {
  assertRunIdentity(run, runRef, callerBlueprint);
  const acceptedBlueprint = acceptedBlueprintFor(run.events);
  assertRunIdentity(run, runRef, acceptedBlueprint);
  if (!declarationsAreUnique(acceptedBlueprint)) {
    throw schedulerError('RUN_ACCEPTED_BLUEPRINT_INVALID', 'Accepted blueprint has ambiguous producer declarations');
  }
  if (!declarationsAreUnique(callerBlueprint) ||
    !isDeepStrictEqual(blueprintMetadata(callerBlueprint), blueprintMetadata(acceptedBlueprint))) {
    throw schedulerError('RUN_BLUEPRINT_DRIFT', 'Caller blueprint differs from the accepted blueprint');
  }
  const acceptedNodes = new Map(acceptedBlueprint.nodes.map((node) => [node.id, node]));
  const executionNodes = callerBlueprint.nodes.map((node) => acceptedNodes.get(node.id));
  if (executionNodes.some((node, index) => !node || !isDeepStrictEqual(node, callerBlueprint.nodes[index]))) {
    throw schedulerError('RUN_BLUEPRINT_DRIFT', 'Caller blueprint differs from the accepted blueprint');
  }
  return {
    acceptedBlueprint,
    executionBlueprint: { ...acceptedBlueprint, nodes: executionNodes }
  };
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
    const { acceptedBlueprint, executionBlueprint } = bindAcceptedBlueprint(run, runRef, blueprint);
    assertExecutionCaps(acceptedBlueprint, run.events);
    const passed = completedNodeIds(run.events);
    const failed = failedNodeIds(run.events);
    const executedNodeIds = [];

    while (true) {
      const node = readyNodes(executionBlueprint.nodes, passed, failed)[0];
      if (!node) {
        const blockedNode = nextBlockedNode(executionBlueprint.nodes, passed, failed);
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
      assertRunIdentity(currentRun, runRef, acceptedBlueprint);
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
      const packageForNode = taskPackage(runRef, acceptedBlueprint, node, currentRun.events);
      let result;
      let execution;
      try {
        const waiting = isWaitingForExternalResult(currentRun.events, node.id);
        if (!waiting) {
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
        }
        if (waiting && typeof executor.collectResult !== 'function') {
          throw schedulerError('EXECUTOR_COLLECTION_UNAVAILABLE', 'Waiting executor cannot collect its external result');
        }
        execution = waiting
          ? await executor.collectResult(packageForNode)
          : await executor.execute(packageForNode);
        if (execution?.status === 'awaiting_external_result') {
          const waiting = {
            status: execution.status,
            nodeId: node.id,
            packagePath: execution.packagePath,
            resultPath: execution.resultPath
          };
          runStore.appendEvent(runRef, { type: 'TASK_WAITING', data: waiting });
          return { passedNodeIds: [...passed].sort(), failedNodeIds: [...failed].sort(), executedNodeIds, waiting };
        }
      } catch (error) {
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: error.code || 'EXECUTOR_EXCEPTION', evidence: { message: error.message } } });
        failed.add(node.id);
        continue;
      }
      try {
        result = TaskResultWire.parse(execution);
      } catch {
        let verification;
        try {
          verification = await verifier.verify({ taskPackage: verifierTaskPackage(packageForNode), taskResult: execution });
        } catch (error) {
          runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: 'VERIFIER_EXCEPTION', evidence: { message: error.message } } });
          failed.add(node.id);
          continue;
        }
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: 'VERIFICATION_REJECTED', evidence: verification?.evidence || null } });
        failed.add(node.id);
        continue;
      }
      let verification;
      try {
        verification = await verifier.verify({ taskPackage: verifierTaskPackage(packageForNode), taskResult: result });
      } catch (error) {
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: 'VERIFIER_EXCEPTION', evidence: { message: error.message } } });
        failed.add(node.id);
        continue;
      }
      const rejectionCode = !matchesTaskPackage(result, packageForNode)
        ? 'TASK_RESULT_IDENTITY_MISMATCH'
        : result.st !== 'ok'
          ? 'EXECUTOR_REPORTED_FAILURE'
          : !changesStayWithinNodeScope(result.chg, acceptedBlueprint, node)
            ? 'TASK_RESULT_SCOPE_VIOLATION'
            : null;
      if (rejectionCode) {
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: rejectionCode, evidence: verification?.evidence || null } });
        failed.add(node.id);
        continue;
      }
      if (!verifierPassed(verification)) {
        runStore.appendEvent(runRef, { type: 'TASK_FAILED', data: { nodeId: node.id, code: 'VERIFICATION_REJECTED', evidence: verification?.evidence || null } });
        failed.add(node.id);
        continue;
      }
      runStore.appendEvent(runRef, {
        type: 'TASK_PASSED',
        data: { nodeId: node.id, evidence: verification?.evidence || null, artifacts: result.art }
      });
      passed.add(node.id);
      executedNodeIds.push(node.id);
    }
    return { passedNodeIds: [...passed].sort(), failedNodeIds: [...failed].sort(), executedNodeIds };
  }

  return { execute };
}

const { validateBlueprint } = require('./blueprint');

function normalizePath(p) {
  if (typeof p !== 'string') return '';
  return p.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/+$/, '');
}

function pathsIntersect(p1, p2) {
  if (p1 === p2) return true;
  const n1 = normalizePath(p1);
  const n2 = normalizePath(p2);
  if (n1 === n2) return true;

  const isGlob1 = n1.endsWith('/**') || n1.endsWith('/*');
  const isGlob2 = n2.endsWith('/**') || n2.endsWith('/*');

  const base1 = n1.endsWith('/**') ? n1.slice(0, -3) : (n1.endsWith('/*') ? n1.slice(0, -2) : n1);
  const base2 = n2.endsWith('/**') ? n2.slice(0, -3) : (n2.endsWith('/*') ? n2.slice(0, -2) : n2);

  if (base1 === '' || base1 === '.' || base2 === '' || base2 === '.') return true;

  if (base1 === base2) return true;
  if (base2.startsWith(base1 + '/')) return true;
  if (base1.startsWith(base2 + '/')) return true;

  return false;
}

function getTaskWriteLocks(task) {
  if (!task) return [];
  if (task.mutatesWorkspace === false) return [];
  if (Array.isArray(task.writeAllowlist)) return task.writeAllowlist;
  if (Array.isArray(task.writeLocks)) return task.writeLocks;
  if (Array.isArray(task.writes)) return task.writes;
  if (task.input && task.input.mutatesWorkspace === false) return [];
  if (task.input && Array.isArray(task.input.writeAllowlist)) return task.input.writeAllowlist;
  if (task.input && Array.isArray(task.input.writeLocks)) return task.input.writeLocks;
  if (task.input && Array.isArray(task.input.writes)) return task.input.writes;
  if (typeof task.writeScope === 'string') return [task.writeScope];
  return [];
}

function tasksConflict(taskA, taskB) {
  const locksA = getTaskWriteLocks(taskA);
  const locksB = getTaskWriteLocks(taskB);
  if (!locksA.length || !locksB.length) return false;
  for (const pA of locksA) {
    for (const pB of locksB) {
      if (pathsIntersect(pA, pB)) return true;
    }
  }
  return false;
}

/** Execute a validated blueprint in deterministic, dependency-aware batches. */
async function scheduleBlueprint(source, executeTask, options = {}) {
  if (typeof executeTask !== 'function') throw new TypeError('executeTask must be a function');
  if (options.verifyTask !== undefined && typeof options.verifyTask !== 'function') throw new TypeError('verifyTask must be a function');
  const blueprint = validateBlueprint(source);
  const tasks = new Map(blueprint.tasks.map(task => [task.id, task]));
  const outputs = Object.create(null);
  const completed = [];
  const pending = new Set(tasks.keys());
  const maxTasks = options.maxTasks ?? tasks.size;
  if (!Number.isSafeInteger(maxTasks) || maxTasks < 1) throw new TypeError('maxTasks must be a positive safe integer');
  const record = (event) => {
    if (options.ledger) options.ledger.appendEvent(options.runId || blueprint.runId, { type: 'dag-task', ...event });
  };

  while (pending.size) {
    if (completed.length >= maxTasks) {
      const error = new Error('DAG task budget exhausted');
      error.code = 'DAG_BUDGET_EXCEEDED';
      throw error;
    }
    const ready = [...pending].filter(id => (tasks.get(id).dependsOn || []).every(dep => completed.includes(dep))).sort();
    if (!ready.length) {
      const error = new Error('DAG has unresolved dependencies');
      error.code = 'DAG_BLOCKED';
      throw error;
    }
    const batch = [];
    for (const id of ready) {
      const candidateTask = tasks.get(id);
      const conflictingTask = batch.find(batchedTask => tasksConflict(candidateTask, batchedTask));
      if (conflictingTask) {
        if (options.ledger) {
          options.ledger.appendEvent(options.runId || blueprint.runId, {
            type: 'WRITE_LOCK_SERIALIZED',
            taskId: candidateTask.id,
            conflictingTaskId: conflictingTask.id,
            writeLocks: getTaskWriteLocks(candidateTask),
            conflictingLocks: getTaskWriteLocks(conflictingTask)
          });
        }
      } else {
        batch.push(candidateTask);
      }
    }
    const results = await Promise.all(batch.map(async task => {
      try {
        record({ taskId: task.id, status: 'started' });
        const dependencies = Object.fromEntries((task.dependsOn || []).map(id => [id, outputs[id]]));
        const output = await executeTask(task, { blueprint, dependencies, clientScope: blueprint.clientScope });
        if (options.verifyTask) {
          const verifierActorId = options.verifierActorId || (options.verifyContext && options.verifyContext.actorId);
          if (task.actorId && verifierActorId && task.actorId === verifierActorId) {
            const error = new Error(`DAG task "${task.id}" violated verifier segregation: actor "${task.actorId}" cannot verify its own task`);
            error.code = 'DAG_VERIFIER_SEGREGATION_VIOLATION';
            error.taskId = task.id;
            throw error;
          }
          const verified = await options.verifyTask(task, output, {
            blueprint,
            dependencies,
            clientScope: blueprint.clientScope,
            verifierActorId
          });
          if (verified !== true) {
            const error = new Error(`DAG task "${task.id}" failed verification`);
            error.code = 'DAG_VERIFICATION_FAILED';
            error.taskId = task.id;
            throw error;
          }
        }
        record({ taskId: task.id, status: 'passed' });
        return { task, output };
      } catch (cause) {
        record({ taskId: task.id, status: 'failed', error: { name: cause.name || 'Error', message: cause.message || String(cause) } });
        if (cause && (cause.code === 'DAG_VERIFICATION_FAILED' || cause.code === 'DAG_TASK_FAILED' || cause.code === 'DAG_VERIFIER_SEGREGATION_VIOLATION')) throw cause;
        const error = new Error(`DAG task "${task.id}" failed: ${cause.message}`, { cause });
        error.code = 'DAG_TASK_FAILED';
        error.taskId = task.id;
        throw error;
      }
    }));
    for (const { task, output } of results) {
      outputs[task.id] = output;
      pending.delete(task.id);
      completed.push(task.id);
    }
  }
  return { runId: blueprint.runId, clientScope: blueprint.clientScope, completed, outputs };
}

module.exports = {
  createDagScheduler,
  scheduleBlueprint,
  pathsIntersect,
  tasksConflict,
  getTaskWriteLocks
};
