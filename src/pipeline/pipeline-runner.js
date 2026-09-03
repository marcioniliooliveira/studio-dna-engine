const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { ExecutionLedger } = require('../orchestration/execution-ledger');

const VALID_MODES = new Set(['all', 'clone', 'dna', 'ui']);

class PipelineStageError extends Error {
  constructor(stage, cause) {
    super(`Pipeline stage "${stage}" failed: ${cause.message}`, { cause });
    this.name = 'PipelineStageError';
    this.code = 'PIPELINE_STAGE_FAILED';
    this.stage = stage;
  }
}

function createPipelineRunner(dependencies) {
  const requiredDependencies = [
    'loadConfig',
    'normalizeUrl',
    'getSiteSlug',
    'detectSiteType',
    'cloneSite',
    'createAssetNormalizer',
    'extractDesignDna',
    'extractUiUx',
    'generateStyleguide',
    'generateMasterSpec',
    'generateAssetManifest',
    'generatePromptCatalog'
  ];

  for (const dependency of requiredDependencies) {
    if (typeof dependencies[dependency] !== 'function') {
      throw new TypeError(`Missing pipeline dependency: ${dependency}`);
    }
  }

  async function run(options = {}) {
    const mode = options.mode || 'all';
    if (!VALID_MODES.has(mode)) {
      const error = new Error(`Unknown pipeline mode: ${mode}`);
      error.code = 'INVALID_PIPELINE_MODE';
      throw error;
    }

    const url = dependencies.normalizeUrl(options.url || 'https://grotesk-zero-45.aura.build/');
    const config = dependencies.loadConfig(options);
    const siteName = dependencies.getSiteSlug(url);
    const masterFolder = path.join(path.resolve(config.outputDir), siteName);
    const siteFolder = path.join(masterFolder, 'site');
    const designSystemFolder = path.join(masterFolder, 'design-system');
    const uiUxFolder = path.join(masterFolder, 'ui-ux');
    const statusPath = path.join(masterFolder, 'PIPELINE_STATUS.json');
    const recordExecution = options.recordExecution === true;
    const ledgerPath = recordExecution
      ? path.resolve(options.ledgerPath || path.join(masterFolder, 'EXECUTION_LEDGER.json'))
      : null;

    fs.mkdirSync(siteFolder, { recursive: true });
    fs.mkdirSync(designSystemFolder, { recursive: true });
    fs.mkdirSync(uiUxFolder, { recursive: true });

    const pipelineStatus = {
      schemaVersion: 1,
      status: 'running',
      url,
      siteName,
      mode,
      startedAt: new Date().toISOString(),
      completedAt: null,
      stages: []
    };

    function persistStatus() {
      const temporaryPath = `${statusPath}.tmp`;
      fs.writeFileSync(temporaryPath, JSON.stringify(pipelineStatus, null, 2));
      fs.renameSync(temporaryPath, statusPath);
    }

    const ledger = recordExecution
      ? (fs.existsSync(ledgerPath) ? ExecutionLedger.load(ledgerPath) : new ExecutionLedger())
      : null;
    const runId = recordExecution
      ? `pipeline-${siteName}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`
      : null;
    const inputHash = recordExecution
      ? `sha256:${crypto.createHash('sha256').update(JSON.stringify({ url, siteName, mode })).digest('hex')}`
      : null;
    // The input hash identifies the requested work; the artifact hash is
    // computed only after the selected stages have materialized their output.
    // Failed runs retain an explicit pending marker instead of claiming an
    // artifact that was never finalized.
    let artifactHash = recordExecution ? 'pending' : null;
    function hashArtifacts() {
      const hash = crypto.createHash('sha256');
      const files = [];
      function collect(folder) {
        for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
          const absolute = path.join(folder, entry.name);
          if (entry.isDirectory()) collect(absolute);
          else if (entry.name !== 'EXECUTION_LEDGER.json' && entry.name !== 'PIPELINE_STATUS.json') {
            files.push(absolute);
          }
        }
      }
      collect(masterFolder);
      files.sort().forEach(file => {
        hash.update(path.relative(masterFolder, file).replaceAll(path.sep, '/'));
        hash.update('\0');
        hash.update(fs.readFileSync(file));
        hash.update('\0');
      });
      return `sha256:${hash.digest('hex')}`;
    }
    function persistLedger() {
      if (ledger) ledger.save(ledgerPath);
    }
    function recordEvent(event) {
      if (!ledger) return;
      ledger.appendEvent(runId, { at: new Date().toISOString(), ...event });
      persistLedger();
    }

    async function runStage(name, operation) {
      const stage = {
        name,
        status: 'running',
        startedAt: new Date().toISOString(),
        completedAt: null
      };
      pipelineStatus.stages.push(stage);
      persistStatus();
      recordEvent({ type: 'stage', stage: name, status: 'started' });

      try {
        const result = await operation();
        stage.status = 'passed';
        stage.completedAt = new Date().toISOString();
        persistStatus();
        recordEvent({ type: 'stage', stage: name, status: 'passed' });
        return result;
      } catch (cause) {
        stage.status = 'failed';
        stage.completedAt = new Date().toISOString();
        stage.error = {
          name: cause.name || 'Error',
          message: cause.message || String(cause)
        };
        pipelineStatus.status = 'failed';
        pipelineStatus.completedAt = stage.completedAt;
        persistStatus();
        recordEvent({ type: 'stage', stage: name, status: 'failed', error: stage.error });
        if (ledger) {
          ledger.updateRun(runId, { status: 'failed', completedAt: stage.completedAt });
          persistLedger();
        }
        throw new PipelineStageError(name, cause);
      }
    }

    persistStatus();
    if (ledger) {
      ledger.createRun({
        runId,
        taskId: `pipeline:${siteName}`,
        model: options.model || 'pipeline-runner',
        inputTokens: options.inputTokens || 0,
        outputTokens: options.outputTokens || 0,
        retries: options.retries || 0,
        status: 'running',
        gates: {},
        artifactHash,
        inputHash
      });
      persistLedger();
    }

    let siteInfo;
    let dna = null;
    let uiUxData = null;

    siteInfo = await runStage('detect', async () => {
      const detected = await dependencies.detectSiteType(url, config);
      fs.writeFileSync(
        path.join(masterFolder, 'SITE_TYPE.json'),
        JSON.stringify({
          url,
          framework: detected.framework,
          siteType: detected.siteType,
          cloneMode: detected.cloneMode,
          estimatedFidelity: `${detected.cloneCapacity}%`,
          warning: detected.warning,
          detectedAt: new Date().toISOString()
        }, null, 2)
      );
      return detected;
    });

    if (mode === 'all' || mode === 'clone') {
      await runStage('clone', () => dependencies.cloneSite(url, config));
      await runStage('normalize-assets', async () => {
        const normalizer = dependencies.createAssetNormalizer({
          siteDir: siteFolder,
          siteUrl: url,
          extractionDir: path.join(masterFolder, '01-extraction')
        });
        await normalizer.normalizeAll();

        const assetsFontsDir = path.join(siteFolder, 'assets', 'fonts');
        const rootFontsDir = path.join(masterFolder, 'fonts');
        if (fs.existsSync(assetsFontsDir) && !fs.existsSync(rootFontsDir)) {
          fs.cpSync(assetsFontsDir, rootFontsDir, { recursive: true });
        }
      });
    }

    if (mode === 'all' || mode === 'dna') {
      dna = await runStage('extract-design-dna', () => (
        dependencies.extractDesignDna(url, designSystemFolder, config)
      ));
      await runStage('generate-styleguide', () => (
        dependencies.generateStyleguide(dna, path.join(designSystemFolder, 'design-system.html'))
      ));
    }

    if (mode === 'all' || mode === 'ui') {
      uiUxData = await runStage('extract-ui-ux', () => (
        dependencies.extractUiUx(url, uiUxFolder, config)
      ));
    }

    if (mode === 'all' || mode === 'dna') {
      await runStage('generate-master-spec', () => dependencies.generateMasterSpec({
        url,
        siteName,
        siteInfo,
        dna,
        uiUxData,
        outputPath: path.join(masterFolder, 'MASTER_SPEC.md')
      }));

      const manifest = await runStage('generate-asset-manifest', () => (
        dependencies.generateAssetManifest({
          siteDir: siteFolder,
          siteUrl: url,
          outputPath: path.join(masterFolder, 'assets-manifest.json')
        })
      ));
      await runStage('generate-prompt-catalog', () => dependencies.generatePromptCatalog({
        manifestOrPath: manifest,
        outputPath: path.join(masterFolder, 'AI_PROMPTS.md')
      }));
    }

    pipelineStatus.status = 'completed';
    pipelineStatus.completedAt = new Date().toISOString();
    persistStatus();
    if (ledger) {
      artifactHash = hashArtifacts();
      ledger.updateRun(runId, { status: 'completed', completedAt: pipelineStatus.completedAt });
      ledger.updateRun(runId, { artifactHash });
      persistLedger();
    }

    return {
      status: pipelineStatus.status,
      statusPath,
      stages: pipelineStatus.stages,
      masterFolder,
      siteInfo,
      dna,
      uiUxData
    };
  }

  return { run };
}

module.exports = {
  VALID_MODES,
  PipelineStageError,
  createPipelineRunner
};
