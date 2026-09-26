'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { createEventLedger } = require('../src/continuity/event-ledger');
const { createStateStore } = require('../src/continuity/state-store');
const { createEvidenceStore } = require('../src/continuity/evidence-store');

const HASH_A = `sha256:${'a'.repeat(64)}`;

function makeClock() {
  let tick = 0;
  return () => `2026-09-26T12:00:0${tick++}.000Z`;
}

function validState(overrides = {}) {
  return {
    schemaVersion: 2,
    contractKind: 'continuity-state',
    revision: 0,
    projectStatus: 'experimental',
    activeProgramId: 'program-a',
    activeWaveId: null,
    lastEventHash: `sha256:${'0'.repeat(64)}`,
    updatedAt: '2026-09-26T12:00:00.000Z',
    nextEligibleTaskIds: [],
    blockedReasonCodes: [],
    ...overrides
  };
}

function validEvidence(overrides = {}) {
  return {
    schemaVersion: 2,
    contractKind: 'evidence-manifest',
    evidenceId: 'evidence-001',
    epistemicStatus: 'observed',
    artifactHash: HASH_A,
    sourceEvidenceIds: [],
    producerActorId: 'auditor-1',
    createdAt: '2026-09-26T12:00:00.000Z',
    payloadPath: 'continuity/evidence/evidence-001.json',
    reason: null,
    ...overrides
  };
}

test('hash-linked events reject edited history and wrong previous hashes', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'continuity-ledger-'));
  try {
    const filename = path.join(root, 'events.json');
    const ledger = createEventLedger({ filename, clock: makeClock() });
    const first = ledger.appendEvent({ type: 'state-initialized', payload: { revision: 0 } });
    const second = ledger.appendEvent({ type: 'state-updated', payload: { revision: 1 } });
    assert.equal(first.previousHash, `sha256:${'0'.repeat(64)}`);
    assert.equal(second.previousHash, first.eventHash);
    assert.equal(ledger.verifyChain().length, 2);

    const events = JSON.parse(fs.readFileSync(filename, 'utf8'));
    events[1].payload.revision = 99;
    fs.writeFileSync(filename, JSON.stringify(events), 'utf8');
    assert.throws(() => ledger.verifyChain(), error => error.code === 'EVENT_HASH_MISMATCH');

    events[1].payload.revision = 1;
    events[1].previousHash = HASH_A;
    fs.writeFileSync(filename, JSON.stringify(events), 'utf8');
    assert.throws(() => ledger.verifyChain(), error => error.code === 'EVENT_PREVIOUS_HASH_MISMATCH');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('compareAndSwap rejects stale writers and binds state to the latest ledger event', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'continuity-state-'));
  try {
    const clock = makeClock();
    const ledger = createEventLedger({ filename: path.join(root, 'events.json'), clock });
    const store = createStateStore({ filename: path.join(root, 'state.json'), ledger, clock });
    const initial = store.initialize(validState());
    const updated = store.compareAndSwap(initial.revision, state => ({ ...state, activeWaveId: 'wave-1' }));
    assert.equal(updated.revision, 1);
    assert.equal(updated.activeWaveId, 'wave-1');
    assert.equal(updated.lastEventHash, ledger.verifyChain().at(-1).eventHash);
    assert.throws(() => store.compareAndSwap(initial.revision, state => state), error => error.code === 'STATE_REVISION_CONFLICT');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('evidence is content-addressed and rejects replacement at an existing identity', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'continuity-evidence-'));
  try {
    const store = createEvidenceStore({ directory: root });
    const stored = store.put(validEvidence());
    assert.deepEqual(store.get(stored.manifestHash), validEvidence());
    fs.writeFileSync(stored.filename, JSON.stringify(validEvidence({ evidenceId: 'forged' })), 'utf8');
    assert.throws(() => store.put(validEvidence()), error => error.code === 'EVIDENCE_REPLACEMENT');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
