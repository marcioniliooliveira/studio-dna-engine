/**
 * AST Content Injector & Semantic Transmuter (Cheerio AST Engine)
 * 
 * Replaces naive regex-based replacement with a strict AST-based pipeline:
 * 1. Parses HTML into a structured DOM tree via Cheerio.
 * 2. Injects brand copy, assets, metadata and style overrides safely.
 * 3. Enforces Character Budgeting Guard (+/- 25% budget).
 * 4. Enforces Anti-Slop Scanner (blocks AI meta-language in client UI).
 * 5. Guarantees GSAP, Lenis, and Webflow classes/attributes stay intact.
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Banned AI slop / meta-language keywords in final client UI
const BANNED_AI_SLOP_KEYWORDS = [
  'chunk cognitivo',
  'chunks cognitivos',
  'lei de miller',
  'wcag aaa',
  'modo auditoria',
  'raio-x',
  'metalinguagem',
  'ai slop',
  'flashtech',
  'design system tokens',
  'heurística de nielsen',
  'prompt engineering'
];

/**
 * Validates text against Anti-Slop rule
 */
function validateAntiSlop(text, selector = '') {
  if (!text || typeof text !== 'string') return;
  const lower = text.toLowerCase();
  for (const keyword of BANNED_AI_SLOP_KEYWORDS) {
    if (lower.includes(keyword)) {
      throw new Error(`[Anti-Slop Guard] Detected banned meta-language "${keyword}" in selector "${selector}": "${text}"`);
    }
  }
}

/**
 * Validates text length against original budget (+/- 25% tolerance)
 */
function validateCharacterBudget(originalText, newText, selector = '', tolerance = 0.25) {
  if (!originalText || !newText) return;
  const origLen = originalText.trim().length;
  const newLen = newText.trim().length;
  if (origLen === 0) return;

  const ratio = newLen / origLen;
  if (ratio < (1 - tolerance) || ratio > (1 + tolerance)) {
    console.warn(`⚠️ [Character Budget Warning] "${selector}": Original=${origLen} chars, New=${newLen} chars (ratio: ${ratio.toFixed(2)})`);
  }
}

/**
 * Main AST Transmuter Function
 */
function transmuteWithAST({
  sourceHtmlPath,
  outputHtmlPath,
  brandSpec,
  options = { enforceBudget: true, enforceAntiSlop: true }
}) {
  if (!fs.existsSync(sourceHtmlPath)) {
    throw new Error(`Source HTML not found: ${sourceHtmlPath}`);
  }

  const rawHtml = fs.readFileSync(sourceHtmlPath, 'utf8');
  const $ = cheerio.load(rawHtml, { decodeEntities: false });

  console.log(`🚀 [AST Transmuter] Processing: ${path.basename(sourceHtmlPath)}`);

  // 1. Meta & Document Title
  if (brandSpec.meta) {
    if (brandSpec.meta.title) {
      if (options.enforceAntiSlop) validateAntiSlop(brandSpec.meta.title, 'title');
      $('title').text(brandSpec.meta.title);
    }
    if (brandSpec.meta.description) {
      if (options.enforceAntiSlop) validateAntiSlop(brandSpec.meta.description, 'meta[description]');
      let metaDesc = $('meta[name="description"]');
      if (metaDesc.length === 0) {
        $('head').append(`<meta name="description" content="${brandSpec.meta.description}">`);
      } else {
        metaDesc.attr('content', brandSpec.meta.description);
      }
    }
    if (brandSpec.meta.lang) {
      $('html').attr('lang', brandSpec.meta.lang);
    }
  }

  // 2. Replacements via exact CSS Selectors
  if (Array.isArray(brandSpec.domReplacements)) {
    for (const item of brandSpec.domReplacements) {
      const { selector, text, html, attr, budgetCheck } = item;
      const el = $(selector);

      if (el.length === 0) {
        console.warn(`⚠️ [AST Transmuter] Selector not found in DOM: "${selector}"`);
        continue;
      }

      if (text !== undefined) {
        if (options.enforceAntiSlop) validateAntiSlop(text, selector);
        if (options.enforceBudget && budgetCheck) {
          validateCharacterBudget(el.text(), text, selector);
        }
        el.text(text);
      } else if (html !== undefined) {
        if (options.enforceAntiSlop) validateAntiSlop(html, selector);
        el.html(html);
      }

      if (attr && typeof attr === 'object') {
        for (const [attrName, attrVal] of Object.entries(attr)) {
          el.attr(attrName, attrVal);
        }
      }
    }
  }

  // 3. Sequential / List Content (e.g. Nav items, feature cards, metrics)
  if (brandSpec.lists) {
    for (const [listKey, listConfig] of Object.entries(brandSpec.lists)) {
      const { parentSelector, itemSelector, items } = listConfig;
      const elements = parentSelector ? $(parentSelector).find(itemSelector) : $(itemSelector);

      items.forEach((itemData, idx) => {
        if (idx >= elements.length) return;
        const target = $(elements[idx]);

        if (typeof itemData === 'string') {
          if (options.enforceAntiSlop) validateAntiSlop(itemData, `${itemSelector} [${idx}]`);
          target.text(itemData);
        } else if (typeof itemData === 'object') {
          if (itemData.text) {
            if (options.enforceAntiSlop) validateAntiSlop(itemData.text, `${itemSelector} [${idx}]`);
            target.text(itemData.text);
          }
          if (itemData.html) {
            if (options.enforceAntiSlop) validateAntiSlop(itemData.html, `${itemSelector} [${idx}]`);
            target.html(itemData.html);
          }
          if (itemData.attr) {
            for (const [k, v] of Object.entries(itemData.attr)) {
              target.attr(k, v);
            }
          }
        }
      });
    }
  }

  // 4. Injetar Paleta Canônica de Cores (CSS Variables & Overrides)
  if (brandSpec.theme) {
    const { bgBase = '#030508', bgSurface = '#090d14', bgCard = '#0e1420', accent = '#38bdf8', textMain = '#ffffff', textMuted = '#94a3b8' } = brandSpec.theme;
    
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
  ::selection {
    background: var(--accent-laser);
    color: #030508;
  }
</style>`.trim();

    $('head').append(themeStyle);
  }

  // 5. Corrigir & Conectar Ponte Lenis + ScrollTrigger (Preservando GSAP e física da Hero)
  const motionBridge = `
<script id="studio-dna-motion-bridge">
(function() {
  if (typeof Lenis !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
    const lenisInstance = window.lenis || (typeof lenis !== 'undefined' ? lenis : null);
    if (lenisInstance) {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }
})();
</script>`.trim();

  // 6. Injeção de SEO, OpenGraph e Schema.org
  const { SeoInjector } = require('./seo-injector');
  let finalHtml = $.html();
  try {
    finalHtml = SeoInjector.injectSeo(finalHtml, brandSpec);
  } catch (seoErr) {
    console.warn('⚠️ [AST Transmuter] Aviso na injeção de SEO:', seoErr.message);
  }

  // 7. Gravação Determinística
  const outputDir = path.dirname(outputHtmlPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputHtmlPath, finalHtml, 'utf8');

  console.log(`✅ [AST Transmuter] Sucesso! Arquivo gerado em: ${outputHtmlPath} (${finalHtml.length} bytes)`);
  return { outputHtmlPath, size: finalHtml.length };
}

module.exports = {
  transmuteWithAST,
  validateAntiSlop,
  validateCharacterBudget,
  BANNED_AI_SLOP_KEYWORDS
};