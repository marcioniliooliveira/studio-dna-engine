/**
 * Deterministic Site Transmuter Engine
 * 
 * Executa a transmutação mecânica e idempotente do esqueleto de referência para o cliente,
 * gerando a spec intermediária (composition-spec.json) e o manifesto de build (build-manifest.json).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cheerio = require('cheerio');
const { SeoInjector } = require('../generators/seo-injector');

function computeHash(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

/**
 * Monta a especificação intermediária de composição.
 */
function createCompositionSpec({
  refSlug,
  brandSpec,
  contentSlots,
  options = {}
}) {
  return {
    version: '2.0.0',
    createdAt: new Date().toISOString(),
    refSlug,
    brandName: brandSpec.brandName,
    theme: brandSpec.theme || {},
    meta: brandSpec.meta || {},
    slots: contentSlots.slots || contentSlots,
    options: {
      enforceBudget: options.enforceBudget ?? true,
      enforceAntiSlop: options.enforceAntiSlop ?? true,
      tolerance: options.tolerance ?? 0.15
    }
  };
}

/**
 * Transmuta o esqueleto deterministicamente.
 */
function runDeterministicTransmutation({
  skeletonPath,
  compositionSpec,
  outputPath,
  clientDir
}) {
  if (!fs.existsSync(skeletonPath)) {
    throw new Error(`Esqueleto de referência não encontrado: ${skeletonPath}`);
  }

  const skeletonRaw = fs.readFileSync(skeletonPath, 'utf8');
  const skeletonHash = computeHash(skeletonRaw);

  const $ = cheerio.load(skeletonRaw, { decodeEntities: false });

  // 1. Injetar Meta e Título
  if (compositionSpec.meta) {
    if (compositionSpec.meta.title) {
      $('title').text(compositionSpec.meta.title);
    }
    if (compositionSpec.meta.description) {
      let metaDesc = $('meta[name="description"]');
      if (metaDesc.length === 0) {
        $('head').append(`<meta name="description" content="${compositionSpec.meta.description}">`);
      } else {
        metaDesc.attr('content', compositionSpec.meta.description);
      }
    }
    if (compositionSpec.meta.lang) {
      $('html').attr('lang', compositionSpec.meta.lang);
    }
  }

  // 2. Injetar Slots de Conteúdo ({SLOT_...} ou seletores)
  let currentHtml = $.html();
  let replacedSlotsCount = 0;

  const slots = compositionSpec.slots || {};
  for (const [key, value] of Object.entries(slots)) {
    if (typeof value === 'string' || typeof value === 'number') {
      const slotPlaceholder = `{SLOT_${key.toUpperCase()}}`;
      if (currentHtml.includes(slotPlaceholder)) {
        currentHtml = currentHtml.split(slotPlaceholder).join(String(value));
        replacedSlotsCount++;
      }
    }
  }

  // Recarregar DOM para overrides de tema e SEO
  const $final = cheerio.load(currentHtml, { decodeEntities: false });

  // 3. Injetar Paleta de Cores e Estilo do Tema
  if (compositionSpec.theme) {
    const {
      bgBase = '#080807',
      bgSurface = '#121210',
      bgCard = '#181816',
      accent = '#C5A880',
      textMain = '#F5F5F0',
      textMuted = '#A0A09A'
    } = compositionSpec.theme;

    const themeStyle = `
<style id="studio-dna-theme-override">
  :root {
    --bg-base: ${bgBase};
    --bg-surface: ${bgSurface};
    --bg-card: ${bgCard};
    --card-border: rgba(255, 255, 255, 0.08);
    --accent-laser: ${accent};
    --text-main: ${textMain};
    --text-muted: ${textMuted};
  }
  body {
    background-color: var(--bg-base) !important;
    color: var(--text-main) !important;
  }
</style>`.trim();

    $final('head').append(themeStyle);
  }

  // 4. Injeção de SEO & OpenGraph
  let finalHtml = $final.html();
  try {
    finalHtml = SeoInjector.injectSeo(finalHtml, compositionSpec);
  } catch (err) {
    // Non-fatal
  }

  const outputHash = computeHash(finalHtml);

  // 5. Gravar artefato do site
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, finalHtml, 'utf8');

  // 6. Gravar composition-spec.json e build-manifest.json na pasta do cliente
  if (clientDir) {
    if (!fs.existsSync(clientDir)) {
      fs.mkdirSync(clientDir, { recursive: true });
    }

    const specPath = path.join(clientDir, 'composition-spec.json');
    fs.writeFileSync(specPath, JSON.stringify(compositionSpec, null, 2), 'utf8');

    const manifest = {
      version: '2.0.0',
      builtAt: new Date().toISOString(),
      refSlug: compositionSpec.refSlug,
      brandName: compositionSpec.brandName,
      inputHashes: {
        skeleton: skeletonHash,
        compositionSpec: computeHash(JSON.stringify(compositionSpec))
      },
      outputHash,
      outputPath: path.relative(process.cwd(), outputPath).replace(/\\/g, '/'),
      replacedSlotsCount,
      outputSize: Buffer.byteLength(finalHtml, 'utf8')
    };

    const manifestPath = path.join(clientDir, 'build-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

    return {
      outputPath,
      outputHash,
      replacedSlotsCount,
      manifest
    };
  }

  return {
    outputPath,
    outputHash,
    replacedSlotsCount
  };
}

module.exports = {
  createCompositionSpec,
  runDeterministicTransmutation,
  computeHash
};
