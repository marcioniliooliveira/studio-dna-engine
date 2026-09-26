'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { hashCanonical } = require('../shared/canonical-json');
const { readJsonFile, writeJsonAtomic } = require('./file-store');
const { validateContinuityState } = require('./contracts');

function createError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function createStateStore({ filename, ledger, clock = () => new Date().toISOString() }) {
  if (typeof filename !== 'string' || !filename) throw new TypeError('filename is required');
  if (!ledger || typeof ledger.appendEvent !== 'function' || typeof ledger.verifyChain !== 'function') {
    throw new TypeError('ledger with appendEvent and verifyChain is required');
  }
  if (typeof clock !== 'function') throw new TypeError('clock must be a function');
  const absolute = path.resolve(filename);

  function assertLedgerBinding(state) {
    const events = ledger.verifyChain();
    if (events.length === 0 || state.lastEventHash !== events.at(-1).eventHash) {
      throw createError('STATE_LEDGER_MISMATCH', 'state is not bound to the latest ledger event');
    }
  }

  function load() {
    if (!fs.existsSync(absolute)) throw createError('STATE_UNINITIALIZED', 'continuity state has not been initialized');
    const state = validateContinuityState(readJsonFile(absolute));
    assertLedgerBinding(state);
    return state;
  }

  function initialize(input) {
    if (fs.existsSync(absolute)) throw createError('STATE_ALREADY_INITIALIZED', 'continuity state already exists');
    const initial = validateContinuityState(input);
    if (ledger.verifyChain().length !== 0) throw createError('STATE_LEDGER_NOT_EMPTY', 'initial state requires an empty event ledger');
    const event = ledger.appendEvent({
      type: 'state-initialized',
      payload: { revision: initial.revision, stateHash: hashCanonical(initial) }
    });
    const state = validateContinuityState({ ...initial, lastEventHash: event.eventHash, updatedAt: clock() });
    writeJsonAtomic(absolute, state);
    return state;
  }

  function compareAndSwap(expectedRevision, transform) {
    if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 0) throw new TypeError('expectedRevision must be a non-negative safe integer');
    if (typeof transform !== 'function') throw new TypeError('transform must be a function');
    const current = load();
    if (current.revision !== expectedRevision) {
      throw createError('STATE_REVISION_CONFLICT', `expected revision ${expectedRevision}, found ${current.revision}`);
    }
    const proposed = transform(JSON.parse(JSON.stringify(current)));
    const preliminary = validateContinuityState({
      ...proposed,
      revision: current.revision + 1,
      updatedAt: clock(),
      lastEventHash: current.lastEventHash
    });
    const event = ledger.appendEvent({
      type: 'state-updated',
      payload: {
        previousRevision: current.revision,
        nextRevision: preliminary.revision,
        stateHash: hashCanonical(preliminary)
      }
    });
    const state = validateContinuityState({ ...preliminary, lastEventHash: event.eventHash });
    writeJsonAtomic(absolute, state);
    return state;
  }

  return { compareAndSwap, filename: absolute, initialize, load };
}

module.exports = { createStateStore };
