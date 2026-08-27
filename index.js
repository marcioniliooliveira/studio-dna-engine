const fs = require('fs');
const path = require('path');

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
const { startPreviewServer } = require('./src/server/preview-server');

/**
 * Executa o Pipeline mestre completo ou modular
 */
async function runPipeline(options = {}) {
  const url = normalizeUrl(options.url || 'https://grotesk-zero-45.aura.build/');
  const mode = options.mode || 'all';
  const config = loadConfig(options);
  const siteName = getSiteSlug(url);

  const baseFolder = path.resolve(config.outputDir);
  const masterFolder = path.join(baseFolder, siteName);
  const siteFolder = path.join(masterFolder, 'site');
  const designSystemFolder = path.join(masterFolder, 'design-system');
  const uiUxFolder = path.join(masterFolder, 'ui-ux');

  fs.mkdirSync(siteFolder, { recursive: true });
  fs.mkdirSync(designSystemFolder, { recursive: true });
  fs.mkdirSync(uiUxFolder, { recursive: true });

  console.log(`\n🚀 ========================================================`);
  console.log(`   INICIANDO MASTER PIPELINE PARA: ${url}`);
  console.log(`   DESTINO: ${masterFolder}`);
  console.log(`   MODO: ${mode} | HEADLESS: ${config.headless}`);
  console.log(`========================================================\n`);

  // 0. Detecção de Framework e Tipo de Site
  const siteInfo = await detectSiteType(url, config);

  console.log(`\n📊 ════════════════════════════════════════════════════`);
  console.log(`   RELATÓRIO DE DETECÇÃO`);
  console.log(`   Framework: ${siteInfo.framework}`);
  console.log(`   Modo de Clonagem: ${siteInfo.cloneMode}`);
  console.log(`   Fidelidade Estimada: ${siteInfo.cloneCapacity}%`);
  if (siteInfo.warning) {
    console.log(`\n   ⚠️  ${siteInfo.warning}`);
  }
  console.log(`════════════════════════════════════════════════════\n`);

  fs.writeFileSync(
    path.join(masterFolder, 'SITE_TYPE.json'),
    JSON.stringify({
      url,
      framework: siteInfo.framework,
      siteType: siteInfo.siteType,
      cloneMode: siteInfo.cloneMode,
      estimatedFidelity: `${siteInfo.cloneCapacity}%`,
      warning: siteInfo.warning,
      detectedAt: new Date().toISOString()
    }, null, 2)
  );

  // 1. Clonagem Bruta de HTML & Assets (se 'all' ou 'clone')
  if (mode === 'all' || mode === 'clone') {
    console.log(`📌 [ETAPA 1/4] Clonando site (${siteInfo.framework}) com assets e mídias...`);
    try {
      await cloneSite(url, config);
    } catch (err) {
      console.warn('⚠️ Alerta na clonagem bruta (prosseguindo para extração de design):', err.message);
    }

    const assetsFontsDir = path.join(masterFolder, 'site', 'assets', 'fonts');
    const rootFontsDir = path.join(masterFolder, 'fonts');
    if (fs.existsSync(assetsFontsDir) && !fs.existsSync(rootFontsDir)) {
      fs.cpSync(assetsFontsDir, rootFontsDir, { recursive: true });
      console.log('✅ Fontes copiadas para /fonts/ (compatível com @font-face de path absoluto)');
    }

    // 1.1 Saneamento e Normalização Global de Assets (Universal Asset Normalizer)
    if (fs.existsSync(siteFolder)) {
      try {
        const { UniversalAssetNormalizer } = require('./src/pro/universal-asset-normalizer');
        const normalizer = new UniversalAssetNormalizer({
          siteDir: siteFolder,
          siteUrl: url,
          extractionDir: path.join(masterFolder, '01-extraction')
        });
        await normalizer.normalizeAll();
      } catch (err) {
        console.warn('⚠️ Alerta na normalização global de assets:', err.message);
      }
    }
  }

  // 2. Extração de Design DNA & Compilação de Styleguide
  let dna = null;
  if (mode === 'all' || mode === 'dna') {
    console.log('\n📌 [ETAPA 2/4] Extraindo Design DNA & compilando Design System...');
    try {
      dna = await extractDesignDna(url, designSystemFolder, config);
      generateStyleguide(dna, path.join(designSystemFolder, 'design-system.html'));
    } catch (err) {
      console.warn('⚠️ Alerta na geração do Design System:', err.message);
    }
  }

  // 3. Particularidades UI/UX, Animações e Snippets
  let uiUxData = null;
  if (mode === 'all' || mode === 'ui') {
    console.log('\n📌 [ETAPA 3/4] Extraindo Animações GSAP, ScrollTrigger & Micro-interações...');
    try {
      uiUxData = await extractUiUx(url, uiUxFolder, config);
    } catch (err) {
      console.warn('⚠️ Alerta na extração de UI/UX:', err.message);
    }
  }

  // 4. Compilação do MASTER_SPEC.md para IA
  if (mode === 'all' || mode === 'dna') {
    console.log('\n📌 [ETAPA 4/4] Compilando MASTER_SPEC.md para uso por IAs...');
    if (!dna) {
      const dnaPath = path.join(designSystemFolder, 'design_dna.json');
      if (fs.existsSync(dnaPath)) {
        try { dna = JSON.parse(fs.readFileSync(dnaPath, 'utf8')); } catch (e) {}
      }
    }

    generateMasterSpec({
      url,
      siteName,
      siteInfo,
      dna,
      uiUxData,
      outputPath: path.join(masterFolder, 'MASTER_SPEC.md')
    });

    // 4.1. Geração do Manifesto de Substituição Limpa de Assets & Catálogo de Prompts
    try {
      if (fs.existsSync(siteFolder)) {
        const manifest = generateAssetManifest({
          siteDir: siteFolder,
          siteUrl: url,
          outputPath: path.join(masterFolder, 'assets-manifest.json')
        });

        generatePromptCatalog({
          manifestOrPath: manifest,
          outputPath: path.join(masterFolder, 'AI_PROMPTS.md')
        });
      }
    } catch (err) {
      console.warn('⚠️ Alerta na geração dos Assets e Prompts:', err.message);
    }
  }

  console.log(`\n🎉 ========================================================`);
  console.log(`   PIPELINE CONCLUÍDO COM SUCESSO!`);
  console.log(`   Framework: ${siteInfo.framework} | Modo: ${siteInfo.cloneMode}`);
  console.log(`   Pasta Master: ${masterFolder}`);
  console.log(`   - Detecção:    copias/${siteName}/SITE_TYPE.json`);
  console.log(`   - Design Sys:  copias/${siteName}/design-system/`);
  console.log(`   - UI/UX:       copias/${siteName}/ui-ux/`);
  console.log(`   - Master Spec: copias/${siteName}/MASTER_SPEC.md`);
  console.log(`   - Assets Map:  copias/${siteName}/assets-manifest.json`);
  console.log(`   - AI Prompts:  copias/${siteName}/AI_PROMPTS.md`);
  console.log(`========================================================\n`);

  return {
    masterFolder,
    siteInfo,
    dna,
    uiUxData
  };
}

const { AdvancedAssetInterceptor } = require('./src/pro/advanced-asset-interceptor');
const { UniversalAssetNormalizer } = require('./src/pro/universal-asset-normalizer');
const { UniversalScrollDirector } = require('./src/pro/universal-scroll-director');
const { waitForHydrationSettled } = require('./src/utils/hydration-barrier');
const { generateTranslationPrompt, validateAiTranslationResponse } = require('./src/generators/prompt-template-generator');

module.exports = {
  detectSiteType,
  cloneSite,
  runPipeline,
  extractUiUx,
  extractDesignDna,
  generateStyleguide,
  generateMasterSpec,
  generateAssetManifest,
  startPreviewServer,
  loadConfig,
  AdvancedAssetInterceptor,
  UniversalAssetNormalizer,
  UniversalScrollDirector,
  waitForHydrationSettled,
  generateTranslationPrompt,
  validateAiTranslationResponse
};
