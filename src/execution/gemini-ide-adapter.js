'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { validateTaskPackage, validateTaskResult } = require('../orchestration/task-contract');

function createGeminiIdeAdapter(options = {}) {
  if (!options.directory) throw new TypeError('directory is required');
  const directory = path.resolve(options.directory);
  const intervalMs = options.intervalMs ?? 250;
  const timeoutMs = options.timeoutMs ?? 300000;
  if (!Number.isSafeInteger(intervalMs) || intervalMs < 1) throw new TypeError('intervalMs must be positive');
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < intervalMs) throw new TypeError('timeoutMs must be >= intervalMs');

  function getPaths(task) {
    const flatPackage = path.join(directory, `${task.taskId}.task-package.json`);
    const flatResult = path.join(directory, `${task.taskId}.task-result.json`);

    // Scoped hierarchical path for run and client isolation
    const attempt = task.attempt || 1;
    const scopedDir = path.join(directory, 'runs', task.runId, task.clientScope, task.taskId, `attempt-${attempt}`);
    const scopedPackage = path.join(scopedDir, 'task-package.json');
    const scopedResult = path.join(scopedDir, 'task-result.json');

    return { flatPackage, flatResult, scopedDir, scopedPackage, scopedResult };
  }

  function atomicWriteJson(targetPath, data) {
    const parentDir = path.dirname(targetPath);
    fs.mkdirSync(parentDir, { recursive: true });
    const nonce = crypto.randomBytes(6).toString('hex');
    const temporary = `${targetPath}.${process.pid}.${Date.now()}.${nonce}.tmp`;
    fs.writeFileSync(temporary, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(temporary, targetPath);
  }

  function exchange(source) {
    const task = validateTaskPackage(source);
    const { flatPackage, flatResult, scopedPackage, scopedResult } = getPaths(task);

    // Atomically write both scoped and flat package for maximum compatibility
    atomicWriteJson(flatPackage, task);
    atomicWriteJson(scopedPackage, task);

    // Check if result is available in scoped location or flat location
    let targetResultPath = null;
    if (fs.existsSync(scopedResult)) {
      targetResultPath = scopedResult;
    } else if (fs.existsSync(flatResult)) {
      targetResultPath = flatResult;
    }

    if (!targetResultPath) {
      const error = new Error(`Gemini IDE result is pending for task ${task.taskId}`);
      error.code = 'GEMINI_IDE_PENDING';
      throw error;
    }

    const rawResult = fs.readFileSync(targetResultPath, 'utf8');
    const result = validateTaskResult(JSON.parse(rawResult));

    if (result.runId !== task.runId || result.taskId !== task.taskId || result.clientScope !== task.clientScope) {
      const error = new Error('Gemini IDE result identity does not match task package');
      error.code = 'GEMINI_IDE_SCOPE_MISMATCH';
      throw error;
    }

    if (result.status === 'failed') {
      const error = new Error(result.error && result.error.message ? result.error.message : 'Gemini IDE task failed');
      error.code = 'GEMINI_IDE_TASK_FAILED';
      throw error;
    }

    return { output: result.output, usage: result.usage || {} };
  }

  async function waitForResult(source) {
    const task = validateTaskPackage(source);
    const started = Date.now();
    while (true) {
      try {
        return exchange(task);
      } catch (error) {
        if (error.code !== 'GEMINI_IDE_PENDING') throw error;
        if (Date.now() - started >= timeoutMs) {
          const timeout = new Error(`Gemini IDE result timed out for task ${task.taskId}`);
          timeout.code = 'GEMINI_IDE_TIMEOUT';
          throw timeout;
        }
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }
    }
  }

  return {
    invoke: exchange,
    waitForResult,
    directory,
    atomicWriteJson
  };
}

module.exports = { createGeminiIdeAdapter };
