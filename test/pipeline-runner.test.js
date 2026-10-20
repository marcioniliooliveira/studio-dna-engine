const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { createPipelineRunner } = require('../src/pipeline/pipeline-runner');
const { ExecutionLedger } = require('../src/orchestration/execution-ledger');

function createFixture(overrides = {}) {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-dna-pipeline-'));
  const calls = [];
  const dependencies = {
    loadConfig: options => ({ outputDir, headless: true, ...options }),
    normalizeUrl: url => url,
    getSiteSlug: () => 'reference-site',
    detectSiteType: async () => {
      calls.push('detect');
      return { framework: 'static', siteType: 'marketing', cloneMode: 'static', cloneCapacity: 80 };
    },
    cloneSite: async () => { calls.push('clone'); },
    createAssetNormalizer: () => ({ normalizeAll: async () => { calls.push('normalize'); } }),
    extractDesignDna: async () => { calls.push('dna'); return { colors: {} }; },
    extractUiUx: async () => { calls.push('ui'); return { motion: {} }; },
    generateStyleguide: () => { calls.push('styleguide'); },
    generateMasterSpec: () => { calls.push('master-spec'); },
    generateAssetManifest: () => { calls.push('asset-manifest'); return { assets: [] }; },
    generatePromptCatalog: () => { calls.push('prompt-catalog'); },
    ...overrides
  };

  return {
    outputDir,
    calls,
    runner: createPipelineRunner(dependencies),
    cleanup: () => fs.rmSync(outputDir, { recursive: true, force: true })
  };
}

test('pipeline fails closed and persists the stage that failed', async () => {
  const fixture = createFixture({
    cloneSite: async () => {
      fixture.calls.push('clone');
      throw new Error('clone exploded');
    }
  });

  await assert.rejects(
    fixture.runner.run({ url: 'https://example.com', mode: 'clone' }),
    error => error.code === 'PIPELINE_STAGE_FAILED' && error.stage === 'clone'
  );

  const status = JSON.parse(fs.readFileSync(
    path.join(fixture.outputDir, 'reference-site', 'PIPELINE_STATUS.json'),
    'utf8'
  ));

  assert.equal(status.status, 'failed');
  assert.deepEqual(status.stages.map(stage => [stage.name, stage.status]), [
    ['detect', 'passed'],
    ['clone', 'failed']
  ]);
  assert.deepEqual(fixture.calls, ['detect', 'clone']);
  fixture.cleanup();
});

test('pipeline reports completed only after every selected stage passes', async () => {
  const fixture = createFixture();
  const result = await fixture.runner.run({ url: 'https://example.com', mode: 'clone' });
  const status = JSON.parse(fs.readFileSync(result.statusPath, 'utf8'));

  assert.equal(result.status, 'completed');
  assert.equal(status.status, 'completed');
  assert.deepEqual(status.stages.map(stage => [stage.name, stage.status]), [
    ['detect', 'passed'],
    ['clone', 'passed'],
    ['normalize-assets', 'passed']
  ]);
  assert.deepEqual(fixture.calls, ['detect', 'clone', 'normalize']);
  fixture.cleanup();
});

test('pipeline rejects unknown modes before starting work', async () => {
  const fixture = createFixture();

  await assert.rejects(
    fixture.runner.run({ url: 'https://example.com', mode: 'wishful' }),
    error => error.code === 'INVALID_PIPELINE_MODE'
  );
  assert.deepEqual(fixture.calls, []);
  fixture.cleanup();
});

test('pipeline records an execution ledger when opted in', async () => {
  const fixture = createFixture();
  const result = await fixture.runner.run({
    url: 'https://example.com',
    mode: 'clone',
    recordExecution: true,
    model: 'gemini-3.7-flash',
    inputTokens: 12,
    outputTokens: 8,
    retries: 1
  });

  const ledgerPath = path.join(fixture.outputDir, 'reference-site', 'EXECUTION_LEDGER.json');
  const ledger = ExecutionLedger.load(ledgerPath);
  const runs = JSON.parse(ledger.serialize()).runs;
  assert.equal(runs.length, 1);
  assert.equal(runs[0].model, 'gemini-3.7-flash');
  assert.equal(runs[0].status, 'completed');
  assert.equal(runs[0].inputTokens, 12);
  assert.equal(runs[0].outputTokens, 8);
  assert.equal(runs[0].retries, 1);
  assert.match(runs[0].artifactHash, /^sha256:[0-9a-f]{64}$/);
  assert.match(runs[0].inputHash, /^sha256:[0-9a-f]{64}$/);
  assert.match(runs[0].artifactHash, /^sha256:[0-9a-f]{64}$/);
  assert.notEqual(runs[0].inputHash, runs[0].artifactHash);
  assert.deepEqual(runs[0].events.filter(event => event.type).map(event => [event.type, event.stage, event.status]), [
    ['stage', 'detect', 'started'],
    ['stage', 'detect', 'passed'],
    ['stage', 'clone', 'started'],
    ['stage', 'clone', 'passed'],
    ['stage', 'normalize-assets', 'started'],
    ['stage', 'normalize-assets', 'passed']
  ]);
  fixture.cleanup();
});

test('pipeline writes execution ledger to an explicit custom path', async () => {
  const fixture = createFixture();
  const customPath = path.join(fixture.outputDir, 'ledger', 'custom.json');
  await fixture.runner.run({ url: 'https://example.com', mode: 'clone', recordExecution: true, ledgerPath: customPath });
  assert.equal(fs.existsSync(customPath), true);
  assert.equal(fs.existsSync(path.join(fixture.outputDir, 'reference-site', 'EXECUTION_LEDGER.json')), false);
  fixture.cleanup();
});

test('pipeline appends runs without overwriting an existing ledger', async () => {
  const fixture = createFixture();
  const customPath = path.join(fixture.outputDir, 'ledger.json');
  await fixture.runner.run({ url: 'https://example.com', mode: 'clone', recordExecution: true, ledgerPath: customPath });
  await fixture.runner.run({ url: 'https://example.com', mode: 'clone', recordExecution: true, ledgerPath: customPath });
  const runs = JSON.parse(ExecutionLedger.load(customPath).serialize()).runs;
  assert.equal(runs.length, 2);
  assert.notEqual(runs[0].runId, runs[1].runId);
  fixture.cleanup();
});

test('pipeline records a distinct artifact hash when generated output changes', async () => {
  let revision = 0;
  let fixture;
  fixture = createFixture({
    cloneSite: async () => {
      revision += 1;
      fs.writeFileSync(path.join(fixture.outputDir, 'reference-site', 'generated.txt'), `revision-${revision}`);
    }
  });
  const customPath = path.join(fixture.outputDir, 'ledger.json');
  await fixture.runner.run({ url: 'https://example.com', mode: 'clone', recordExecution: true, ledgerPath: customPath });
  await fixture.runner.run({ url: 'https://example.com', mode: 'clone', recordExecution: true, ledgerPath: customPath });
  const runs = JSON.parse(ExecutionLedger.load(customPath).serialize()).runs;
  assert.equal(runs[0].inputHash, runs[1].inputHash);
  assert.notEqual(runs[0].artifactHash, runs[1].artifactHash);
  fixture.cleanup();
});

test('pipeline persists a failed ledger event before PipelineStageError', async () => {
  const fixture = createFixture({
    cloneSite: async () => { throw new Error('clone exploded'); }
  });

  await assert.rejects(
    fixture.runner.run({ url: 'https://example.com', mode: 'clone', recordExecution: true }),
    error => error.code === 'PIPELINE_STAGE_FAILED' && error.stage === 'clone'
  );

  const ledgerPath = path.join(fixture.outputDir, 'reference-site', 'EXECUTION_LEDGER.json');
  const runs = JSON.parse(ExecutionLedger.load(ledgerPath).serialize()).runs;
  assert.equal(runs.length, 1);
  assert.equal(runs[0].status, 'failed');
  assert.deepEqual(runs[0].events.filter(event => event.type).map(event => [event.type, event.stage, event.status]), [
    ['stage', 'detect', 'started'],
    ['stage', 'detect', 'passed'],
    ['stage', 'clone', 'started'],
    ['stage', 'clone', 'failed']
  ]);
  fixture.cleanup();
});

test('pipeline preserves legacy behavior when execution recording is disabled', async () => {
  const fixture = createFixture();
  const result = await fixture.runner.run({ url: 'https://example.com', mode: 'clone' });
  assert.equal(fs.existsSync(path.join(fixture.outputDir, 'reference-site', 'EXECUTION_LEDGER.json')), false);
  assert.equal(result.status, 'completed');
  fixture.cleanup();
});
