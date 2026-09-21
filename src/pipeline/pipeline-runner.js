const fs = require('node:fs');
const path = require('node:path');

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
      try {
        fs.renameSync(temporaryPath, statusPath);
      } catch {
        fs.copyFileSync(temporaryPath, statusPath);
        try { fs.unlinkSync(temporaryPath); } catch (_) {}
      }
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

      try {
        const result = await operation();
        stage.status = 'passed';
        stage.completedAt = new Date().toISOString();
        persistStatus();
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
        throw new PipelineStageError(name, cause);
      }
    }

    persistStatus();

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
