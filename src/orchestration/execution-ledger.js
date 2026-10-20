'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const VERSION = 1;

function clone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function assertNonNegativeInteger(value, field) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${field} must be a non-negative safe integer`);
  }
}

function assertJsonSafe(value, seen = new WeakSet(), root = true) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new TypeError('event must be JSON-safe');
    return;
  }
  if (typeof value !== 'object' && typeof value !== 'undefined') {
    throw new TypeError('event must be JSON-safe');
  }
  if (typeof value === 'undefined') throw new TypeError('event must be JSON-safe');
  if (seen.has(value)) throw new TypeError('event must be JSON-safe');
  if (!Array.isArray(value) && ![Object.prototype, null].includes(Object.getPrototypeOf(value))) {
    throw new TypeError('event must be a plain JSON object (JSON-safe)');
  }
  if (Reflect.ownKeys(value).some(key => typeof key === 'symbol')) {
    throw new TypeError('event must be JSON-safe');
  }
  seen.add(value);
  if (Array.isArray(value)) {
    value.forEach(item => assertJsonSafe(item, seen, false));
  } else {
    for (const [key, item] of Object.entries(value)) {
      if (typeof key !== 'string') throw new TypeError('event must be JSON-safe');
      assertJsonSafe(item, seen, false);
    }
  }
  seen.delete(value);
}

function validateRun(input) {
  if (!input || typeof input !== 'object') throw new TypeError('run must be an object');
  for (const field of ['runId', 'taskId', 'model']) {
    if (typeof input[field] !== 'string' || input[field].trim() === '') {
      throw new TypeError(`${field} must be a non-empty string`);
    }
  }
  for (const field of ['inputTokens', 'outputTokens', 'retries']) {
    assertNonNegativeInteger(input[field], field);
  }
  if (typeof input.status !== 'string' || input.status.trim() === '') {
    throw new TypeError('status must be a non-empty string');
  }
  if (!input.gates || typeof input.gates !== 'object' || Array.isArray(input.gates)) {
    throw new TypeError('gates must be an object');
  }
  assertJsonSafe(input.gates);
  if (typeof input.artifactHash !== 'string' || input.artifactHash.trim() === '') {
    throw new TypeError('artifactHash must be a non-empty string');
  }
  if (input.inputHash !== undefined && (typeof input.inputHash !== 'string' || input.inputHash.trim() === '')) {
    throw new TypeError('inputHash must be a non-empty string');
  }
}

class ExecutionLedger {
  constructor(snapshot) {
    if (arguments.length === 0) {
      this._runs = new Map();
      return;
    }
    if (!snapshot || typeof snapshot !== 'object' || Array.isArray(snapshot)) {
      throw new TypeError('snapshot runs must be an array');
    }
    if (snapshot.version !== VERSION) throw new Error(`unsupported ledger version: ${snapshot.version}`);
    if (!Array.isArray(snapshot.runs)) throw new TypeError('snapshot runs must be an array');
    this._runs = new Map();
    for (const run of snapshot.runs) {
      validateRun(run);
      if (!Array.isArray(run.events)) throw new TypeError('snapshot events must be an array');
      if (this._runs.has(run.runId)) throw new Error(`duplicate runId: ${run.runId}`);
      run.events.forEach(event => assertJsonSafe(event));
      this._runs.set(run.runId, clone(run));
    }
  }

  createRun(input) {
    validateRun(input);
    if (this._runs.has(input.runId)) throw new Error(`runId already exists: ${input.runId}`);
    const run = clone({ ...input, events: [] });
    this._runs.set(run.runId, run);
    return clone(run);
  }

  appendEvent(runId, event) {
    if (typeof runId !== 'string' || runId.trim() === '') throw new TypeError('runId must be a non-empty string');
    if (event === undefined) throw new TypeError('event must be JSON-safe');
    if (!event || typeof event !== 'object' || Array.isArray(event)) throw new TypeError('event must be an object and JSON-safe');
    assertJsonSafe(event);
    const current = this._runs.get(runId);
    if (!current) throw new Error(`unknown runId: ${runId}`);
    const next = clone({ ...current, events: [...current.events, clone(event)] });
    this._runs.set(runId, next);
    return clone(next);
  }

  appendChainedEvent(runId, event) {
    if (typeof runId !== 'string' || runId.trim() === '') throw new TypeError('runId must be a non-empty string');
    if (event === undefined) throw new TypeError('event must be JSON-safe');
    if (!event || typeof event !== 'object' || Array.isArray(event)) throw new TypeError('event must be an object and JSON-safe');
    assertJsonSafe(event);
    const current = this._runs.get(runId);
    if (!current) throw new Error(`unknown runId: ${runId}`);

    const lastEvent = current.events[current.events.length - 1];
    const prevHash = (lastEvent && lastEvent._chain && lastEvent._chain.hash)
      ? lastEvent._chain.hash
      : 'sha256:0000000000000000000000000000000000000000000000000000000000000000';

    const rawPayload = JSON.stringify({ prevHash, payload: event });
    const hash = 'sha256:' + crypto.createHash('sha256').update(rawPayload).digest('hex');

    const chainedEvent = {
      ...clone(event),
      _chain: {
        prevHash,
        hash,
        timestamp: Date.now()
      }
    };

    const next = clone({ ...current, events: [...current.events, chainedEvent] });
    this._runs.set(runId, next);
    return clone(next);
  }

  verifyEventChain(runId) {
    const run = this._runs.get(runId);
    if (!run) throw new Error(`unknown runId: ${runId}`);
    let expectedPrevHash = 'sha256:0000000000000000000000000000000000000000000000000000000000000000';
    for (let i = 0; i < run.events.length; i++) {
      const ev = run.events[i];
      if (!ev._chain) continue;
      if (ev._chain.prevHash !== expectedPrevHash) {
        return { valid: false, brokenIndex: i, reason: `prevHash mismatch at event index ${i}` };
      }
      const clonePayload = { ...ev };
      delete clonePayload._chain;
      const expectedHash = 'sha256:' + crypto.createHash('sha256').update(JSON.stringify({ prevHash: expectedPrevHash, payload: clonePayload })).digest('hex');
      if (ev._chain.hash !== expectedHash) {
        return { valid: false, brokenIndex: i, reason: `hash tampered at event index ${i}` };
      }
      expectedPrevHash = ev._chain.hash;
    }
    return { valid: true, eventCount: run.events.length };
  }

  updateRun(runId, patch) {
    if (typeof runId !== 'string' || runId.trim() === '') throw new TypeError('runId must be a non-empty string');
    if (!patch || typeof patch !== 'object' || Array.isArray(patch)) throw new TypeError('run patch must be an object');
    const mutableFields = new Set(['status', 'completedAt', 'inputTokens', 'outputTokens', 'retries', 'gates', 'artifactHash', 'inputHash']);
    for (const key of Object.keys(patch)) {
      if (!mutableFields.has(key)) throw new TypeError(`run field is immutable: ${key}`);
    }
    assertJsonSafe(patch);
    const current = this._runs.get(runId);
    if (!current) throw new Error(`unknown runId: ${runId}`);
    const next = clone({ ...current, ...patch, events: current.events });
    validateRun(next);
    this._runs.set(runId, next);
    return clone(next);
  }

  recordTokenUsage(runId, deltaInput = 0, deltaOutput = 0) {
    if (typeof runId !== 'string' || runId.trim() === '') throw new TypeError('runId must be a non-empty string');
    assertNonNegativeInteger(deltaInput, 'deltaInput');
    assertNonNegativeInteger(deltaOutput, 'deltaOutput');
    const current = this._runs.get(runId);
    if (!current) throw new Error(`unknown runId: ${runId}`);
    const next = clone({
      ...current,
      inputTokens: current.inputTokens + deltaInput,
      outputTokens: current.outputTokens + deltaOutput,
      events: current.events
    });
    validateRun(next);
    this._runs.set(runId, next);
    return clone(next);
  }

  getRun(runId) {
    return clone(this._runs.get(runId));
  }

  serialize() {
    return JSON.stringify({ version: VERSION, runs: Array.from(this._runs.values()).map(clone) });
  }

  save(filename) {
    const absolute = path.resolve(filename);
    const temporary = `${absolute}.${process.pid}.${Date.now()}.tmp`;
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    try {
      fs.writeFileSync(temporary, this.serialize(), 'utf8');
      fs.renameSync(temporary, absolute);
    } finally {
      if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
    }
  }

  static load(filename) {
    const snapshot = JSON.parse(fs.readFileSync(path.resolve(filename), 'utf8'));
    return new ExecutionLedger(snapshot);
  }
}

module.exports = { ExecutionLedger };
