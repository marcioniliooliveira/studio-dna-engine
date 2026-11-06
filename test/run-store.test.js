const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');
const { createRunStore } = require('../src/orchestration/run-store');

function withStore(t) {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'run-store-'));
  t.after(() => fs.rmSync(rootDir, { recursive: true, force: true }));
  return { rootDir, store: createRunStore({ rootDir, now: () => 123456789 }) };
}

function createRun(store) {
  return store.createRun({ runId: 'run-001', clientId: 'client-alpha', phase: 'draft' });
}

function ideCost(overrides = {}) {
  return {
    v: 1, rid: 'run-001', nid: 'n1', m: 'gemini-ide', svc: 'ide',
    it: null, ct: null, ot: null, ms: 42, try: 1, usd: null, estimated: false,
    ...overrides
  };
}

test('restores persisted run state and events without a conversation field', (t) => {
  const { rootDir, store } = withStore(t);
  const runRef = createRun(store);
  store.appendEvent(runRef, { type: 'CONTEXT_FROZEN', data: { manifest: 'ctx-sha' } });
  store.appendEvent(runRef, { type: 'BLUEPRINT_ACCEPTED', data: { planVersion: 1 } });

  const restored = createRunStore({ rootDir, now: () => 123456789 }).loadRun(runRef);

  assert.deepEqual(restored.state, { runId: 'run-001', clientId: 'client-alpha', phase: 'draft' });
  assert.deepEqual(restored.events.map((entry) => entry.type), ['CONTEXT_FROZEN', 'BLUEPRINT_ACCEPTED']);
  assert.equal(Object.hasOwn(restored, 'conversation'), false);
});

test('preserves unknown IDE USD cost as null after reload', (t) => {
  const { rootDir, store } = withStore(t);
  const runRef = createRun(store);
  store.appendCost(runRef, ideCost());

  const restored = createRunStore({ rootDir, now: () => 123456789 }).loadRun(runRef);

  assert.equal(restored.costs[0].data.usd, null);
  assert.equal(restored.costs[0].data.est, false);
  assert.equal(restored.totals.usd, null);
});

test('rejects a run whose event ledger was tampered with', (t) => {
  const { rootDir, store } = withStore(t);
  const runRef = createRun(store);
  store.appendEvent(runRef, { type: 'CONTEXT_FROZEN', data: { manifest: 'ctx-sha' } });
  const eventPath = path.join(rootDir, 'run-001', 'events.jsonl');
  fs.writeFileSync(eventPath, fs.readFileSync(eventPath, 'utf8').replace('ctx-sha', 'tampered'));

  assert.throws(
    () => createRunStore({ rootDir }).loadRun(runRef),
    (error) => error.code === 'RUN_LEDGER_CORRUPT'
  );
});

for (const [field, tamper] of [
  ['state', (snapshot) => { snapshot.state.phase = 'published'; }],
  ['eventCount', (snapshot) => { snapshot.eventCount += 1; }],
  ['costCount', (snapshot) => { snapshot.costCount += 1; }],
  ['totals', (snapshot) => { snapshot.totals.usd = 999; }]
]) {
  test(`rejects a snapshot with a tampered ${field}`, (t) => {
    const { rootDir, store } = withStore(t);
    const runRef = createRun(store);
    store.appendEvent(runRef, { type: 'CONTEXT_FROZEN', data: { manifest: 'ctx-sha' } });
    store.appendCost(runRef, ideCost({ usd: 0.02, estimated: true }));
    const snapshotPath = path.join(rootDir, 'run-001', 'snapshot.json');
    const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
    tamper(snapshot);
    fs.writeFileSync(snapshotPath, JSON.stringify(snapshot));

    assert.throws(
      () => createRunStore({ rootDir }).loadRun(runRef),
      (error) => error.code === 'RUN_LEDGER_CORRUPT'
    );
  });
}

test('fails closed when another store owns the run mutation lock', (t) => {
  const { rootDir, store } = withStore(t);
  const runRef = createRun(store);
  fs.mkdirSync(path.join(rootDir, 'run-001', '.run-store.lock'));

  assert.throws(
    () => createRunStore({ rootDir }).appendEvent(runRef, { type: 'CONTEXT_FROZEN', data: {} }),
    (error) => error.code === 'RUN_BUSY'
  );
});

test('attempts to sync the run directory after replacing a snapshot', (t) => {
  const { rootDir, store } = withStore(t);
  const originalOpenSync = fs.openSync;
  const runDirectory = path.join(rootDir, 'run-001');
  let directoryOpenAttempts = 0;
  fs.openSync = (filePath, ...args) => {
    if (filePath === runDirectory) {
      directoryOpenAttempts += 1;
      const error = new Error('directory fsync unsupported in this test');
      error.code = 'EINVAL';
      throw error;
    }
    return originalOpenSync(filePath, ...args);
  };
  t.after(() => { fs.openSync = originalOpenSync; });

  const runRef = createRun(store);
  store.appendEvent(runRef, { type: 'CONTEXT_FROZEN', data: {} });

  assert.ok(directoryOpenAttempts >= 1);
});

test('attempts to sync the store root parent after creating it', (t) => {
  const temporaryParent = fs.mkdtempSync(path.join(os.tmpdir(), 'run-store-parent-'));
  t.after(() => fs.rmSync(temporaryParent, { recursive: true, force: true }));
  const rootDir = path.join(temporaryParent, 'new-store-root');
  const originalOpenSync = fs.openSync;
  let parentOpenAttempts = 0;
  fs.openSync = (filePath, ...args) => {
    if (filePath === temporaryParent) {
      parentOpenAttempts += 1;
      const error = new Error('directory fsync unsupported in this test');
      error.code = 'EINVAL';
      throw error;
    }
    return originalOpenSync(filePath, ...args);
  };
  t.after(() => { fs.openSync = originalOpenSync; });

  createRunStore({ rootDir }).createRun({ runId: 'run-001', clientId: 'client-alpha', phase: 'draft' });

  assert.ok(parentOpenAttempts >= 1);
});

test('uses monotonic cost sequences that are isolated per run', (t) => {
  const { store } = withStore(t);
  const firstRun = createRun(store);
  const secondRun = store.createRun({ runId: 'run-002', clientId: 'client-alpha', phase: 'draft' });

  const first = store.appendCost(firstRun, ideCost());
  const second = store.appendCost(firstRun, ideCost({ nid: 'n2', try: 2, usd: 0.02, estimated: true }));
  const isolated = store.appendCost(secondRun, ideCost({ rid: 'run-002' }));

  assert.deepEqual([first.seq, second.seq, isolated.seq], [1, 2, 1]);
  assert.equal(store.loadRun(firstRun).totals.usd, null);
});
