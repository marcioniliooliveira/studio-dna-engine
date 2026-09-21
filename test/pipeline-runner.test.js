const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { createPipelineRunner } = require('../src/pipeline/pipeline-runner');

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
