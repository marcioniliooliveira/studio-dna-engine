'use strict';

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

  if (!isGlob1 && !isGlob2) {
    return false;
  }

  if (isGlob1) {
    if (base1 === '' || base1 === '.') return true;
    if (base2 === base1 || base2.startsWith(base1 + '/')) return true;
  }

  if (isGlob2) {
    if (base2 === '' || base2 === '.') return true;
    if (base1 === base2 || base1.startsWith(base2 + '/')) return true;
  }

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
      const conflictsWithBatch = batch.some(batchedTask => tasksConflict(candidateTask, batchedTask));
      if (!conflictsWithBatch) {
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

module.exports = { scheduleBlueprint, pathsIntersect, tasksConflict, getTaskWriteLocks };
