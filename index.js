const { loadConfig } = require('./src/config');
const { getSiteSlug, normalizeUrl } = require('./src/utils/helpers');
const { detectSiteType } = require('./src/core/detector');
const { cloneSite } = require('./src/core/cloner');
const { extractDesignDna } = require('./src/core/dna-extractor');
const { extractUiUx } = require('./src/core/ui-ux-extractor');
const { generateStyleguide } = require('./src/generators/styleguide');
const { generateMasterSpec } = require('./src/generators/spec-generator');
const { generateAssetManifest } = require('./src/generators/asset-manifest-generator');
const { generatePromptCatalog } = require('./src/generators/prompt-builder');
const { generateTailwindConfig } = require('./src/generators/tailwind-generator');
const { startPreviewServer } = require('./src/server/preview-server');
const { createPipelineRunner } = require('./src/pipeline/pipeline-runner');
const { AdvancedAssetInterceptor } = require('./src/pro/advanced-asset-interceptor');
const { UniversalAssetNormalizer } = require('./src/pro/universal-asset-normalizer');
const { UniversalScrollDirector } = require('./src/pro/universal-scroll-director');
const { waitForHydrationSettled } = require('./src/utils/hydration-barrier');
const {
  generateTranslationPrompt,
  validateAiTranslationResponse
} = require('./src/generators/prompt-template-generator');

const pipelineRunner = createPipelineRunner({
  loadConfig,
  getSiteSlug,
  normalizeUrl,
  detectSiteType,
  cloneSite,
  extractDesignDna,
  extractUiUx,
  generateStyleguide,
  generateMasterSpec,
  generateAssetManifest,
  generatePromptCatalog,
  createAssetNormalizer: options => new UniversalAssetNormalizer(options)
});

async function runPipeline(options = {}) {
  const result = await pipelineRunner.run(options);
  console.log(`Pipeline completed: ${result.masterFolder}`);
  console.log(`Evidence: ${result.statusPath}`);
  return result;
}

module.exports = {
  detectSiteType,
  cloneSite,
  runPipeline,
  extractUiUx,
  extractDesignDna,
  generateStyleguide,
  generateMasterSpec,
  generateAssetManifest,
  generateTailwindConfig,
  startPreviewServer,
  loadConfig,
  AdvancedAssetInterceptor,
  UniversalAssetNormalizer,
  UniversalScrollDirector,
  waitForHydrationSettled,
  generateTranslationPrompt,
  validateAiTranslationResponse
};
