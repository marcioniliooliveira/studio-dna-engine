const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { createGeminiIdeAdapter } = require('../src/execution/gemini-ide-adapter');

async function makeExchangeDir(t) {
  const exchangeDir = await fs.mkdtemp(path.join(os.tmpdir(), 'gemini-ide-exchange-'));
  t.after(() => fs.rm(exchangeDir, { recursive: true, force: true }));
  return exchangeDir;
}

function taskPackage() {
  return {
    v: 1,
    rid: 'run-001',
    cid: 'piloto-elyse-luxe',
    nid: 'build-site',
    k: 'build',
    ni: false,
    in: [{ id: 'facts', sha: 'a'.repeat(64) }],
    p: ['clientes/piloto-elyse-luxe/site/index.html'],
    out: ['site'],
    tl: ['patch.apply'],
    g: ['core-runtime'],
    b: { it: 100, ot: 50, usd: 0.1, try: 2 },
    ctx: { summary: 'Only this structural summary is disclosed.' }
  };
}

function taskResult(overrides = {}) {
  return {
    v: 1,
    rid: 'run-001',
    cid: 'piloto-elyse-luxe',
    nid: 'build-site',
    st: 'ok',
    art: [{ id: 'site', sha: 'b'.repeat(64) }],
    chg: ['clientes/piloto-elyse-luxe/site/index.html'],
    use: { it: null, ct: null, ot: null },
    err: null,
    ...overrides
  };
}

test('exports a compact task package atomically into its isolated run and node directory', async (t) => {
  const exchangeDir = await makeExchangeDir(t);
  const adapter = createGeminiIdeAdapter({ exchangeDir, now: () => 1700000000000 });

  const pending = await adapter.execute(taskPackage());
  const packagePath = path.join(exchangeDir, 'run-001', 'build-site', 'task-package.json');
  const serialized = await fs.readFile(packagePath, 'utf8');
  const exported = JSON.parse(serialized);

  assert.deepEqual(pending, { status: 'awaiting_external_result', packagePath });
  assert.deepEqual(Object.keys(exported), ['v', 'rid', 'cid', 'nid', 'k', 'ni', 'in', 'p', 'out', 'tl', 'g', 'b', 'ctx']);
  assert.equal(serialized.includes('conversation'), false);
  assert.equal(serialized.includes('Only this structural summary is disclosed.'), true);
  assert.equal(serialized.includes('private source that was not summarized'), false);
  assert.equal((await fs.readdir(path.dirname(packagePath))).some((entry) => entry.includes('.tmp')), false);
});

test('rejects malformed, out-of-scope, and package-unbound IDE results', async (t) => {
  const exchangeDir = await makeExchangeDir(t);
  const adapter = createGeminiIdeAdapter({ exchangeDir });
  await adapter.execute(taskPackage());
  const resultPath = path.join(exchangeDir, 'run-001', 'build-site', 'task-result.json');

  await fs.writeFile(resultPath, 'The task is done.', 'utf8');
  await assert.rejects(
    () => adapter.collectResult('run-001', 'build-site'),
    (error) => error.code === 'TASK_RESULT_INVALID'
  );

  await fs.writeFile(resultPath, JSON.stringify(taskResult({ cid: 'outro-cliente' })), 'utf8');
  await assert.rejects(
    () => adapter.collectResult('run-001', 'build-site'),
    (error) => error.code === 'TASK_RESULT_SCOPE_MISMATCH'
  );

  const packagePath = path.join(exchangeDir, 'run-001', 'build-site', 'task-package.json');
  const tampered = JSON.parse(await fs.readFile(packagePath, 'utf8'));
  tampered.ctx.summary = 'Tampered summary';
  await fs.writeFile(packagePath, JSON.stringify(tampered), 'utf8');
  await fs.writeFile(resultPath, JSON.stringify(taskResult()), 'utf8');
  await assert.rejects(
    () => adapter.collectResult('run-001', 'build-site'),
    (error) => error.code === 'TASK_PACKAGE_BINDING_MISMATCH'
  );
});

test('returns TaskResultWire plus unknown IDE cost evidence without polling or retries', async (t) => {
  const exchangeDir = await makeExchangeDir(t);
  const adapter = createGeminiIdeAdapter({ exchangeDir, now: () => 1700000000000 });
  const task = taskPackage();
  const pending = await adapter.execute(task);
  const resultPath = path.join(exchangeDir, 'run-001', 'build-site', 'task-result.json');
  await fs.writeFile(resultPath, JSON.stringify(taskResult()), 'utf8');

  const collected = await adapter.collectResult('run-001', 'build-site');

  assert.deepEqual(collected.result, taskResult());
  assert.deepEqual(collected.usage, { inputTokens: null, outputTokens: null, usd: null, estimated: false });
  assert.equal(collected.costEvent.svc, 'ide');
  assert.equal(collected.costEvent.it, null);
  assert.equal(collected.costEvent.ct, null);
  assert.equal(collected.costEvent.ot, null);
  assert.equal(collected.costEvent.usd, null);
  assert.equal(collected.costEvent.est, false);
  assert.equal(collected.costEvent.ms, 0);
  assert.equal(collected.costEvent.try, 1);
  assert.equal(pending.status, 'awaiting_external_result');
  assert.equal(crypto.createHash('sha256').update(await fs.readFile(resultPath)).digest('hex').length, 64);
});

test('preserves token metadata supplied by the IDE result', async (t) => {
  const exchangeDir = await makeExchangeDir(t);
  const adapter = createGeminiIdeAdapter({ exchangeDir });
  await adapter.execute(taskPackage());
  const resultPath = path.join(exchangeDir, 'run-001', 'build-site', 'task-result.json');
  await fs.writeFile(resultPath, JSON.stringify(taskResult({ use: { it: 21, ct: 8, ot: 13 } })), 'utf8');

  const collected = await adapter.collectResult('run-001', 'build-site');

  assert.deepEqual(collected.usage, { inputTokens: 21, outputTokens: 13, usd: null, estimated: false });
  assert.equal(collected.costEvent.it, 21);
  assert.equal(collected.costEvent.ct, 8);
  assert.equal(collected.costEvent.ot, 13);
  assert.equal(collected.costEvent.usd, null);
  assert.equal(collected.costEvent.est, false);
});
