'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { hashCanonical, canonicalize } = require('../shared/canonical-json');
const { readJsonFile, writeJsonAtomic } = require('./file-store');

const ZERO_HASH = `sha256:${'0'.repeat(64)}`;
const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;

function createError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function createEventLedger({ filename, clock = () => new Date().toISOString() }) {
  if (typeof filename !== 'string' || !filename) throw new TypeError('filename is required');
  if (typeof clock !== 'function') throw new TypeError('clock must be a function');
  const absolute = path.resolve(filename);

  function loadEvents() {
    if (!fs.existsSync(absolute)) return [];
    const events = readJsonFile(absolute);
    if (!Array.isArray(events)) throw createError('EVENT_LEDGER_INVALID', 'event ledger must contain an array');
    return events;
  }

  function verifyChain() {
    const events = loadEvents();
    let previousHash = ZERO_HASH;
    events.forEach((event, index) => {
      canonicalize(event);
      const expectedKeys = ['eventHash', 'occurredAt', 'payload', 'previousHash', 'sequence', 'type'];
      if (Object.keys(event).sort().join(',') !== expectedKeys.join(',')) {
        throw createError('EVENT_INVALID', `event ${index} has invalid fields`);
      }
      if (!Number.isSafeInteger(event.sequence) || event.sequence !== index) {
        throw createError('EVENT_SEQUENCE_INVALID', `event ${index} has an invalid sequence`);
      }
      if (typeof event.occurredAt !== 'string' || !event.occurredAt || typeof event.type !== 'string' || !event.type) {
        throw createError('EVENT_INVALID', `event ${index} has invalid identity`);
      }
      if (!SHA256_PATTERN.test(event.previousHash) || !SHA256_PATTERN.test(event.eventHash)) {
        throw createError('EVENT_INVALID', `event ${index} has invalid hashes`);
      }
      if (event.previousHash !== previousHash) {
        throw createError('EVENT_PREVIOUS_HASH_MISMATCH', `event ${index} does not reference the previous event`);
      }
      const { eventHash, ...unsigned } = event;
      if (eventHash !== hashCanonical(unsigned)) {
        throw createError('EVENT_HASH_MISMATCH', `event ${index} hash does not match its content`);
      }
      previousHash = event.eventHash;
    });
    return JSON.parse(JSON.stringify(events));
  }

  function appendEvent({ type, payload }) {
    if (typeof type !== 'string' || !type) throw new TypeError('event type is required');
    canonicalize(payload);
    const events = verifyChain();
    const event = {
      sequence: events.length,
      occurredAt: clock(),
      type,
      payload,
      previousHash: events.length === 0 ? ZERO_HASH : events.at(-1).eventHash
    };
    if (typeof event.occurredAt !== 'string' || !event.occurredAt) throw new TypeError('clock must return a timestamp string');
    event.eventHash = hashCanonical(event);
    writeJsonAtomic(absolute, [...events, event]);
    return JSON.parse(JSON.stringify(event));
  }

  return { appendEvent, filename: absolute, verifyChain };
}

module.exports = { ZERO_HASH, createEventLedger };
