const { TaskResultWire } = require('../orchestration/contracts');

function adapterError(message) {
  return new TypeError(message);
}

function assertModelAdapter(adapter) {
  if (!adapter || typeof adapter.identity !== 'string' || adapter.identity.length === 0) {
    throw adapterError('A model adapter requires a non-empty identity');
  }
  if (typeof adapter.execute !== 'function') {
    throw adapterError('A model adapter requires execute(taskPackage)');
  }
  return adapter;
}

function parseTaskResult(result) {
  return TaskResultWire.parse(result);
}

module.exports = { assertModelAdapter, parseTaskResult };
