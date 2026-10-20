/**
 * AST Content Injector & Semantic Transmuter (Cheerio AST Engine)
 * 
 * Replaces naive regex-based replacement with a strict AST-based pipeline:
 * 1. Parses HTML into a structured DOM tree via Cheerio.
 * 2. Injects brand copy, assets, metadata and style overrides safely.
 * 3. Enforces Character Budgeting Guard (+/- 25% budget).
 * 4. Enforces Anti-Slop Scanner (blocks AI meta-language in client UI).
 * 5. Guarantees GSAP, Lenis, and Webflow classes/attributes stay intact.
 * 6. Slot Array Repeater: Clones archetypes and safely scales variable cardinality collections.
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
 * Transmuta coleções com cardinalidade variável via Slot Array Repeater.
 * Clona o nó arquétipo da coleção, vincula os campos semânticos e remove nós excedentes,
 * garantindo fidelidade de layout e zero geração estocástica de DOM.
 *
 * @param {import('cheerio').CheerioAPI} $
 * @param {Object} collectionsData Mapa de coleções { [collectionKey]: { containerSelector?, itemSelector?, items: [], min?, max? } }
 * @param {Object} [options]
 */
function transmuteCollectionSlots($, collectionsData, options = { enforceAntiSlop: true }) {
  if (!collectionsData || typeof collectionsData !== 'object') return;

  for (const [collectionKey, config] of Object.entries(collectionsData)) {
    const containerSelector = config.containerSelector || `[data-slot-repeat="${collectionKey}"]`;
    let $container = $(containerSelector);

    if ($container.length === 0) {
      $container = $(`[data-slot-repeat]`);
      if ($container.length === 0) continue;
    }

    const targetContainer = $container.first();
    const itemSelector = config.itemSelector || '[data-slot-item]';

    let $archetype = targetContainer.find(itemSelector).first();
    if ($archetype.length === 0) {
      $archetype = targetContainer.children().first();
    }

    if ($archetype.length === 0) {
      console.warn(`⚠️ [AST Transmuter] Nenhum arquétipo encontrado para coleção "${collectionKey}" em "${containerSelector}"`);
      continue;
    }

    const archetypeHtml = $.html($archetype);
    let items = Array.isArray(config.items) ? config.items : [];

    // Limites de contrato min/max
    const minAttr = targetContainer.attr('data-slot-min');
    const maxAttr = targetContainer.attr('data-slot-max');
    const minLimit = config.min !== undefined ? config.min : (minAttr ? parseInt(minAttr, 10) : 0);
    const maxLimit = config.max !== undefined ? config.max : (maxAttr ? parseInt(maxAttr, 10) : Infinity);

    if (items.length < minLimit) {
      console.warn(`⚠️ [AST Transmuter] Coleção "${collectionKey}" abaixo do limite mínimo (${items.length} < ${minLimit})`);
    }
    if (items.length > maxLimit) {
      console.warn(`⚠️ [AST Transmuter] Coleção "${collectionKey}" truncada para limite máximo (${items.length} -> ${maxLimit})`);
      items = items.slice(0, maxLimit);
    }

    // Esvazia os filhos repetíveis do container
    targetContainer.empty();

    items.forEach((itemData, idx) => {
      const $item = $(archetypeHtml);

      if (typeof itemData === 'string') {
        if (options.enforceAntiSlop) validateAntiSlop(itemData, `${collectionKey}[${idx}]`);
        const $bindTarget = $item.find('[data-slot-bind]').first();
        if ($bindTarget.length > 0) {
          $bindTarget.text(itemData);
        } else {
          $item.text(itemData);
        }
      } else if (typeof itemData === 'object' && itemData !== null) {
        // 1. Data binding explícito por atributo data-slot-bind="fieldName"
        $item.find('[data-slot-bind]').each((_, el) => {
          const $el = $(el);
          const field = $el.attr('data-slot-bind');
          if (field && itemData[field] !== undefined) {
            const val = itemData[field];
            if (options.enforceAntiSlop && typeof val === 'string') {
              validateAntiSlop(val, `${collectionKey}[${idx}].${field}`);
            }
            $el.text(String(val));
          }
        });

        // 2. Data binding de atributos: data-slot-attr-alt, data-slot-attr-src, data-slot-attr-href
        const elementAttrs = ['src', 'alt', 'href', 'title', 'aria-label', 'target'];
        for (const attrName of elementAttrs) {
          $item.find(`[data-slot-attr-${attrName}]`).each((_, el) => {
            const $el = $(el);
            const field = $el.attr(`data-slot-attr-${attrName}`);
            if (field && itemData[field] !== undefined) {
              const val = itemData[field];
              if (attrName === 'alt' && options.enforceAntiSlop && typeof val === 'string') {
                validateAntiSlop(val, `${collectionKey}[${idx}].${field}`);
              }
              $el.attr(attrName, String(val));
            }
          });
        }

        // 3. Fallback semântico heurístico para propriedades padrão
        for (const [k, v] of Object.entries(itemData)) {
          if (k === 'title' || k === 'name' || k === 'heading') {
            const $heading = $item.find('h1, h2, h3, h4, h5, h6, .title, .heading, [data-title]').first();
            if ($heading.length > 0 && !$heading.attr('data-slot-bind')) {
              if (options.enforceAntiSlop && typeof v === 'string') validateAntiSlop(v, `${collectionKey}[${idx}].${k}`);
              $heading.text(String(v));
            }
          } else if (k === 'price' || k === 'tag' || k === 'badge') {
            const $badge = $item.find('.price, .tag, .badge, [data-price]').first();
            if ($badge.length > 0 && !$badge.attr('data-slot-bind')) {
              if (options.enforceAntiSlop && typeof v === 'string') validateAntiSlop(v, `${collectionKey}[${idx}].${k}`);
              $badge.text(String(v));
            }
          } else if (k === 'description' || k === 'desc' || k === 'subtitle') {
            const $desc = $item.find('p, .desc, .description, [data-desc]').first();
            if ($desc.length > 0 && !$desc.attr('data-slot-bind')) {
              if (options.enforceAntiSlop && typeof v === 'string') validateAntiSlop(v, `${collectionKey}[${idx}].${k}`);
              $desc.text(String(v));
            }
          } else if (k === 'image' || k === 'img' || k === 'src') {
            const $img = $item.find('img, [data-img]').first();
            if ($img.length > 0 && !$img.attr('data-slot-attr-src')) {
              $img.attr('src', String(v));
            }
          } else if (k === 'alt') {
            const $img = $item.find('img').first();
            if ($img.length > 0 && !$img.attr('data-slot-attr-alt')) {
              $img.attr('alt', String(v));
            }
          } else if (k === 'link' || k === 'href') {
            const $link = $item.is('a') ? $item : $item.find('a').first();
            if ($link.length > 0 && !$link.attr('data-slot-attr-href')) {
              $link.attr('href', String(v));
            }
          }
        }

        // 4. Overrides explícitos de atributos se fornecido itemData.attr
        if (itemData.attr && typeof itemData.attr === 'object') {
          for (const [attrName, attrVal] of Object.entries(itemData.attr)) {
            $item.attr(attrName, String(attrVal));
          }
        }
      }

      $item.attr('data-slot-index', String(idx));
      targetContainer.append($item);
    });

    targetContainer.attr('data-rendered-count', String(items.length));
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
      let elements = parentSelector ? $(parentSelector).find(itemSelector) : $(itemSelector);

      if (elements.length > 0 && items && items.length > 0) {
        // Se a lista do cliente tiver mais itens do que o template, clona o arquétipo
        if (items.length > elements.length) {
          const $parent = parentSelector ? $(parentSelector) : $(elements[0]).parent();
          const $archetype = $(elements[elements.length - 1]);
          const needCount = items.length - elements.length;
          for (let i = 0; i < needCount; i++) {
            const $clone = $archetype.clone();
            $parent.append($clone);
          }
          elements = parentSelector ? $(parentSelector).find(itemSelector) : $(itemSelector);
        } else if (items.length < elements.length) {
          // Se o cliente tiver menos itens, remove elementos excedentes
          for (let i = items.length; i < elements.length; i++) {
            $(elements[i]).remove();
          }
          elements = parentSelector ? $(parentSelector).find(itemSelector) : $(itemSelector);
        }
      }

      if (items) {
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
  }

  // 3.1 Transmutação Declarativa de Coleções (Slot Array Repeater)
  if (brandSpec.collections) {
    transmuteCollectionSlots($, brandSpec.collections, options);
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
  transmuteCollectionSlots,
  validateAntiSlop,
  validateCharacterBudget,
  BANNED_AI_SLOP_KEYWORDS
};