const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { CostEventWire } = require('./contracts');
const { assertSafeSlug } = require('../server/security');

function runStoreError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function isPlainObject(value) {
  const prototype = value && typeof value === 'object' && Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function assertJsonSafe(value, ancestors = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number' && Number.isFinite(value)) return;
  if (!value || typeof value !== 'object' || ancestors.has(value)) {
    throw runStoreError('RUN_EVENT_INVALID', 'Run data must contain only JSON-safe values');
  }
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index += 1) {
        if (!Object.hasOwn(value, index)) throw runStoreError('RUN_EVENT_INVALID', 'Run data must contain only JSON-safe values');
        assertJsonSafe(value[index], ancestors);
      }
      if (Object.getOwnPropertyNames(value).length !== value.length + 1 || Object.getOwnPropertySymbols(value).length) {
        throw runStoreError('RUN_EVENT_INVALID', 'Run data must contain only JSON-safe values');
      }
      return;
    }
    if (!isPlainObject(value) || Object.getOwnPropertySymbols(value).length) {
      throw runStoreError('RUN_EVENT_INVALID', 'Run data must contain only JSON-safe values');
    }
    for (const key of Object.keys(value)) assertJsonSafe(value[key], ancestors);
    if (Object.getOwnPropertyNames(value).length !== Object.keys(value).length) {
      throw runStoreError('RUN_EVENT_INVALID', 'Run data must contain only JSON-safe values');
    }
  } finally {
    ancestors.delete(value);
  }
}

function sortJson(value) {
  if (Array.isArray(value)) return value.map(sortJson);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortJson(value[key])]));
  }
  return value;
}

function hashEntry({ seq, at, type, data, prev }) {
  return crypto.createHash('sha256').update(JSON.stringify(sortJson({ seq, at, type, data, prev }))).digest('hex');
}

function normalizeRunRef(runRef) {
  const runId = typeof runRef === 'string' ? runRef : runRef && runRef.runId;
  return { runId: assertSafeSlug(runId) };
}

function validateEvent(event) {
  if (!isPlainObject(event) || Object.keys(event).length !== 2 || !Object.hasOwn(event, 'type') || !Object.hasOwn(event, 'data') ||
    typeof event.type !== 'string' || !/^[A-Z][A-Z0-9_]*$/.test(event.type)) {
    throw runStoreError('RUN_EVENT_INVALID', 'Run event must contain a compact type and data payload');
  }
  assertJsonSafe(event.data);
  return { type: event.type, data: event.data };
}

function validateCost(runId, costEvent) {
  if (!isPlainObject(costEvent)) throw runStoreError('RUN_COST_INVALID', 'Cost event must be an object');
  const normalized = { ...costEvent };
  if (Object.hasOwn(normalized, 'estimated') && !Object.hasOwn(normalized, 'est')) {
    normalized.est = normalized.estimated;
    delete normalized.estimated;
  }
  let cost;
  try {
    cost = CostEventWire.parse(normalized);
  } catch (error) {
    throw runStoreError('RUN_COST_INVALID', 'Cost event does not match the compact cost contract');
  }
  if (cost.rid !== runId) throw runStoreError('RUN_COST_RUN_MISMATCH', 'Cost event belongs to a different run');
  return cost;
}

function createRunStore({ rootDir, now = Date.now }) {
  if (typeof rootDir !== 'string' || rootDir.length === 0) throw new TypeError('rootDir is required');

  function runDirectory(runRef) {
    const { runId } = normalizeRunRef(runRef);
    const root = path.resolve(rootDir);
    const destination = path.resolve(root, runId);
    if (!destination.startsWith(`${root}${path.sep}`)) throw runStoreError('RUN_PATH_ESCAPE', 'Run path escapes the store root');
    return { runId, destination };
  }

  function pathsFor(runRef) {
    const { runId, destination } = runDirectory(runRef);
    return {
      runId,
      directory: destination,
      events: path.join(destination, 'events.jsonl'),
      costs: path.join(destination, 'costs.jsonl'),
      snapshot: path.join(destination, 'snapshot.json')
    };
  }

  function writeAndSync(filePath, content, flag = 'w') {
    const descriptor = fs.openSync(filePath, flag, 0o600);
    try {
      fs.writeFileSync(descriptor, content, 'utf8');
      fs.fsyncSync(descriptor);
    } finally {
      fs.closeSync(descriptor);
    }
  }

  function readLedger(filePath, expectedType) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content) return [];
    const lines = content.endsWith('\n') ? content.slice(0, -1).split('\n') : content.split('\n');
    let previousHash = null;
    return lines.map((line, index) => {
      let entry;
      try {
        entry = JSON.parse(line);
      } catch (error) {
        throw runStoreError('RUN_LEDGER_CORRUPT', `${expectedType} ledger contains invalid JSON`);
      }
      const expectedSequence = index + 1;
      if (!isPlainObject(entry) || Object.keys(entry).length !== 6 || entry.seq !== expectedSequence ||
        !Number.isFinite(entry.at) || typeof entry.type !== 'string' || !Object.hasOwn(entry, 'data') ||
        entry.prev !== previousHash || typeof entry.hash !== 'string' || !/^[a-f0-9]{64}$/.test(entry.hash)) {
        throw runStoreError('RUN_LEDGER_CORRUPT', `${expectedType} ledger entry is malformed`);
      }
      try {
        assertJsonSafe(entry.data);
      } catch (error) {
        throw runStoreError('RUN_LEDGER_CORRUPT', `${expectedType} ledger data is invalid`);
      }
      if (hashEntry(entry) !== entry.hash) throw runStoreError('RUN_LEDGER_CORRUPT', `${expectedType} ledger hash chain does not match`);
      previousHash = entry.hash;
      return entry;
    });
  }

  function totalsFor(costs) {
    const fields = ['it', 'ct', 'ot', 'usd'];
    const totals = { it: 0, ct: 0, ot: 0, usd: 0, ms: 0, count: costs.length, estimated: false };
    for (const entry of costs) {
      const cost = entry.data;
      for (const field of fields) {
        if (totals[field] !== null) totals[field] = cost[field] === null ? null : totals[field] + cost[field];
      }
      totals.ms += cost.ms;
      totals.estimated ||= cost.est;
    }
    return totals;
  }

  function snapshotFor(state, events, costs) {
    return { v: 1, state, eventCount: events.length, costCount: costs.length, totals: totalsFor(costs) };
  }

  function writeSnapshot(filePath, snapshot) {
    const temporary = `${filePath}.${process.pid}.${now()}.tmp`;
    writeAndSync(temporary, JSON.stringify(snapshot), 'wx');
    try {
      fs.renameSync(temporary, filePath);
    } finally {
      if (fs.existsSync(temporary)) fs.rmSync(temporary, { force: true });
    }
  }

  function loadRun(runRef) {
    const filePaths = pathsFor(runRef);
    if (!fs.existsSync(filePaths.snapshot)) throw runStoreError('RUN_NOT_FOUND', 'Run does not exist');
    let snapshot;
    try {
      snapshot = JSON.parse(fs.readFileSync(filePaths.snapshot, 'utf8'));
    } catch (error) {
      throw runStoreError('RUN_LEDGER_CORRUPT', 'Run snapshot contains invalid JSON');
    }
    if (!isPlainObject(snapshot) || snapshot.v !== 1 || !Object.hasOwn(snapshot, 'state')) {
      throw runStoreError('RUN_LEDGER_CORRUPT', 'Run snapshot is malformed');
    }
    assertJsonSafe(snapshot.state);
    const events = readLedger(filePaths.events, 'Event');
    const costs = readLedger(filePaths.costs, 'Cost');
    for (const entry of events) validateEvent({ type: entry.type, data: entry.data });
    for (const entry of costs) validateCost(filePaths.runId, entry.data);
    return { runRef: { runId: filePaths.runId }, state: snapshot.state, events, costs, totals: totalsFor(costs) };
  }

  function createRun(initialState) {
    if (!isPlainObject(initialState) || Object.hasOwn(initialState, 'conversation')) {
      throw runStoreError('RUN_INITIAL_STATE_INVALID', 'Initial state must be an object without conversation data');
    }
    const { runId } = normalizeRunRef(initialState);
    assertJsonSafe(initialState);
    const filePaths = pathsFor({ runId });
    fs.mkdirSync(rootDir, { recursive: true });
    try {
      fs.mkdirSync(filePaths.directory);
    } catch (error) {
      if (error.code === 'EEXIST') throw runStoreError('RUN_ALREADY_EXISTS', 'Run already exists');
      throw error;
    }
    try {
      writeAndSync(filePaths.events, '', 'wx');
      writeAndSync(filePaths.costs, '', 'wx');
      writeSnapshot(filePaths.snapshot, snapshotFor(initialState, [], []));
    } catch (error) {
      fs.rmSync(filePaths.directory, { recursive: true, force: true });
      throw error;
    }
    return { runId };
  }

  function append(runRef, filePath, kind, type, data) {
    const run = loadRun(runRef);
    const entries = kind === 'event' ? run.events : run.costs;
    const previous = entries.at(-1);
    const entry = { seq: entries.length + 1, at: now(), type, data, prev: previous ? previous.hash : null };
    entry.hash = hashEntry(entry);
    writeAndSync(filePath, `${JSON.stringify(entry)}\n`, 'a');
    const events = kind === 'event' ? [...run.events, entry] : run.events;
    const costs = kind === 'cost' ? [...run.costs, entry] : run.costs;
    writeSnapshot(pathsFor(runRef).snapshot, snapshotFor(run.state, events, costs));
    return entry;
  }

  function appendEvent(runRef, event) {
    const filePaths = pathsFor(runRef);
    const validated = validateEvent(event);
    return append(runRef, filePaths.events, 'event', validated.type, validated.data);
  }

  function appendCost(runRef, costEvent) {
    const filePaths = pathsFor(runRef);
    const cost = validateCost(filePaths.runId, costEvent);
    return append(runRef, filePaths.costs, 'cost', 'COST_RECORDED', cost);
  }

  return { createRun, appendEvent, appendCost, loadRun };
}

module.exports = { createRunStore };
