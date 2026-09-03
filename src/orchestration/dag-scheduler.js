'use strict';

const { validateBlueprint } = require('./blueprint');

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
    const batch = ready.map(id => tasks.get(id));
    const results = await Promise.all(batch.map(async task => {
      try {
        record({ taskId: task.id, status: 'started' });
        const dependencies = Object.fromEntries((task.dependsOn || []).map(id => [id, outputs[id]]));
        const output = await executeTask(task, { blueprint, dependencies, clientScope: blueprint.clientScope });
        if (options.verifyTask) {
          const verified = await options.verifyTask(task, output, { blueprint, dependencies, clientScope: blueprint.clientScope });
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
        if (cause && (cause.code === 'DAG_VERIFICATION_FAILED' || cause.code === 'DAG_TASK_FAILED')) throw cause;
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

module.exports = { scheduleBlueprint };
