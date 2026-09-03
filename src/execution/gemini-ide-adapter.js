'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { validateTaskPackage, validateTaskResult } = require('../orchestration/task-contract');

function createGeminiIdeAdapter(options = {}) {
  if (!options.directory) throw new TypeError('directory is required');
  const directory = path.resolve(options.directory);
  const intervalMs = options.intervalMs ?? 250;
  const timeoutMs = options.timeoutMs ?? 300000;
  if (!Number.isSafeInteger(intervalMs) || intervalMs < 1) throw new TypeError('intervalMs must be positive');
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < intervalMs) throw new TypeError('timeoutMs must be >= intervalMs');
  function exchange(source) {
    const task = validateTaskPackage(source);
    const packagePath = path.join(directory, `${task.taskId}.task-package.json`);
    const resultPath = path.join(directory, `${task.taskId}.task-result.json`);
    fs.mkdirSync(directory, { recursive: true });
    const temporary = `${packagePath}.${process.pid}.tmp`;
    fs.writeFileSync(temporary, JSON.stringify(task));
    fs.renameSync(temporary, packagePath);
    if (!fs.existsSync(resultPath)) {
      const error = new Error(`Gemini IDE result is pending for task ${task.taskId}`);
      error.code = 'GEMINI_IDE_PENDING';
      throw error;
    }
    const result = validateTaskResult(JSON.parse(fs.readFileSync(resultPath, 'utf8')));
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
      try { return exchange(task); } catch (error) {
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
  return { invoke: exchange, waitForResult, directory };
}

module.exports = { createGeminiIdeAdapter };
