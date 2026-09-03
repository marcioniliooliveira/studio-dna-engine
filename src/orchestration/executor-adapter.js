'use strict';

/**
 * Provider-neutral executor boundary. A Gemini/OpenAI adapter only needs to
 * implement invoke(payload) and return { output, usage }.
 */
function createExecutor(options = {}) {
  if (typeof options.invoke !== 'function') throw new TypeError('invoke must be a function');
  if (!options.ledger || typeof options.ledger.appendEvent !== 'function') throw new TypeError('ledger is required');
  if (typeof options.runId !== 'string' || !options.runId) throw new TypeError('runId must be a non-empty string');
  const maxRetries = options.maxRetries ?? 0;
  if (!Number.isSafeInteger(maxRetries) || maxRetries < 0) throw new TypeError('maxRetries must be a non-negative safe integer');

  async function execute(task) {
    let attempt = 0;
    while (true) {
      try {
        const result = await options.invoke(task);
        const usage = result && result.usage ? result.usage : {};
        const inputTokens = Number.isSafeInteger(usage.inputTokens) && usage.inputTokens >= 0 ? usage.inputTokens : 0;
        const outputTokens = Number.isSafeInteger(usage.outputTokens) && usage.outputTokens >= 0 ? usage.outputTokens : 0;
        const run = options.ledger.getRun(options.runId);
        options.ledger.updateRun(options.runId, {
          inputTokens: run.inputTokens + inputTokens,
          outputTokens: run.outputTokens + outputTokens
        });
        options.ledger.appendEvent(options.runId, {
          type: 'executor', status: 'completed', taskId: task && task.id ? String(task.id) : 'anonymous',
          attempt, inputTokens, outputTokens
        });
        return result && Object.prototype.hasOwnProperty.call(result, 'output') ? result.output : result;
      } catch (error) {
        if (attempt < maxRetries) {
          attempt += 1;
          const run = options.ledger.getRun(options.runId);
          options.ledger.updateRun(options.runId, { retries: run.retries + 1 });
          options.ledger.appendEvent(options.runId, {
            type: 'executor', status: 'retry', taskId: task && task.id ? String(task.id) : 'anonymous',
            attempt, error: { name: error.name || 'Error', message: error.message || String(error) }
          });
          continue;
        }
        options.ledger.appendEvent(options.runId, {
          type: 'executor', status: 'failed', taskId: task && task.id ? String(task.id) : 'anonymous',
          attempt, error: { name: error.name || 'Error', message: error.message || String(error) }
        });
        throw error;
      }
    }
  }

  return { execute };
}

module.exports = { createExecutor };
