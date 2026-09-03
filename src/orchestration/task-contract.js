'use strict';

function plain(value) { return value && typeof value === 'object' && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype; }
function safe(value, seen = new Set()) {
  if (value === null || ['string', 'boolean'].includes(typeof value)) return;
  if (typeof value === 'number') { if (!Number.isFinite(value)) throw new TypeError('payload must be JSON-safe'); return; }
  if (!value || typeof value !== 'object' || seen.has(value)) throw new TypeError('payload must be JSON-safe');
  if (!Array.isArray(value) && !plain(value)) throw new TypeError('payload must contain plain objects');
  seen.add(value); for (const key of Reflect.ownKeys(value)) { if (typeof key !== 'string') throw new TypeError('payload must be JSON-safe'); safe(value[key], seen); } seen.delete(value);
}
function validateTaskPackage(input) {
  if (!plain(input)) throw new TypeError('task package must be a plain object');
  safe(input);
  for (const key of ['runId', 'taskId', 'clientScope']) if (typeof input[key] !== 'string' || !input[key]) throw new TypeError(`${key} is required`);
  if (input.version !== 1) throw new TypeError('task package version must be 1');
  if (!plain(input.input)) throw new TypeError('task package input is required');
  return JSON.parse(JSON.stringify(input));
}
function validateTaskResult(input) {
  if (!plain(input)) throw new TypeError('task result must be a plain object');
  safe(input);
  for (const key of ['runId', 'taskId', 'clientScope', 'status']) if (typeof input[key] !== 'string' || !input[key]) throw new TypeError(`${key} is required`);
  if (input.version !== 1) throw new TypeError('task result version must be 1');
  if (!['passed', 'failed'].includes(input.status)) throw new TypeError('task result status is invalid');
  if (input.status === 'passed' && input.output === undefined) throw new TypeError('passed task result requires output');
  return JSON.parse(JSON.stringify(input));
}
module.exports = { validateTaskPackage, validateTaskResult };
