/**
 * Impeccable Quality Gate (Tier 4 Quality Gate - TASK-V3-04)
 * 
 * Inspects frontend screens for AI visual anti-patterns and craft-floor violations.
 * Supports:
 * - Zero-tolerance rules (dark-glow, nested-cards, overused-font, bounce-easing)
 * - Craft-Floor Detectors:
 *   - Cor & Atmosfera: untinted-gray-black, muddy-opacity-gradient
 *   - Ornamentação & Cards: side-tab-accent-stripe, thick-card-border, icon-tile-stack
 *   - Copywriting Bilíngue: numbered-section-kicker, em-dash-overuse, aphoristic-cadence, fabricated-stat-tile
 *   - Tipografia & Ergonomia: excessive-line-length, missing-tabular-nums, sub-44px-touch-target
 * - Creative Freedom & Governance:
 *   - surfaceMode: Persuade | Operate | Read | Experience
 *   - artisticWaivers: scoped waivers approved by composition_agent or human_art_director
 */

'use strict';

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ZERO_TOLERANCE_RULES = [
  'dark-glow',
  'nested-cards',
  'overused-font',
  'bounce-easing'
];

const CRAFT_FLOOR_RULES = [
  'untinted-gray-black',
  'muddy-opacity-gradient',
  'side-tab-accent-stripe',
  'thick-card-border',
  'icon-tile-stack',
  'numbered-section-kicker',
  'em-dash-overuse',
  'aphoristic-cadence',
  'fabricated-stat-tile',
  'excessive-line-length',
  'missing-tabular-nums',
  'sub-44px-touch-target'
];

const OVERUSED_FONTS = new Set([
  'space grotesk',
  'plus jakarta sans',
  'inter',
  'roboto',
  'fraunces',
  'geist',
  'geist sans',
  'geist mono',
  'open sans',
  'lato',
  'montserrat',
  'arial',
  'helvetica',
  'recoleta'
]);

class ImpeccableGate {
  /**
   * Run Impeccable Quality Gate against a Playwright Page instance or HTML string.
   * @param {import('playwright').Page|string} pageOrHtml
   * @param {object} options
   * @returns {Promise<{ passed: boolean, violations: string[], appliedWaivers: object[], summary: object }>}
   */
  static async run(pageOrHtml, options = {}) {
    const zeroToleranceRules = options.zeroToleranceRules || ZERO_TOLERANCE_RULES;
    const bundlePath = options.browserBundlePath || path.resolve(__dirname, '../../scripts/detect-antipatterns-browser.js');

    // Case 1: Playwright Page instance
    if (pageOrHtml && typeof pageOrHtml.evaluate === 'function') {
      return ImpeccableGate.auditPage(pageOrHtml, { ...options, zeroToleranceRules, bundlePath });
    }

    // Case 2: HTML string or file path
    let htmlContent = pageOrHtml;
    if (typeof pageOrHtml === 'string' && fs.existsSync(pageOrHtml) && pageOrHtml.endsWith('.html')) {
      htmlContent = fs.readFileSync(pageOrHtml, 'utf8');
    }

    if (typeof htmlContent !== 'string') {
      return {
        passed: false,
        violations: ['[impeccable-gate] Entrada inválida fornecida: esperado Playwright Page ou string HTML'],
        appliedWaivers: [],
        summary: { totalFindings: 1, zeroToleranceViolations: 1, breakdown: { error: 1 }, findings: [], appliedWaivers: [] }
      };
    }

    // If browser is available and not disabled via options.staticOnly, use Playwright for 100% computed fidelity
    if (options.staticOnly !== true) {
      try {
        const { chromium } = require('playwright');
        const browser = await chromium.launch({ headless: true });
        try {
          const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
          await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
          return await ImpeccableGate.auditPage(page, { ...options, zeroToleranceRules, bundlePath, htmlContent });
        } finally {
          await browser.close();
        }
      } catch (e) {
        // Fallback to static analysis if Playwright cannot be launched
      }
    }

    // Fallback: Static Cheerio analysis
    return ImpeccableGate.auditHtmlStatic(htmlContent, { ...options, zeroToleranceRules });
  }

  /**
   * Audit a live Playwright page using detect-antipatterns-browser.js bundle + craft-floor checks
   */
  static async auditPage(page, options = {}) {
    const zeroToleranceRules = options.zeroToleranceRules || ZERO_TOLERANCE_RULES;
    const surfaceMode = options.surfaceMode || 'Operate';
    const artisticWaivers = options.artisticWaivers || [];
    const bundlePath = options.bundlePath || path.resolve(__dirname, '../../scripts/detect-antipatterns-browser.js');

    const isLoaded = await page.evaluate(() => typeof window.impeccableDetect === 'function');
    if (!isLoaded) {
      if (!fs.existsSync(bundlePath)) {
        throw new Error(`Impeccable browser detector bundle não encontrado em: ${bundlePath}`);
      }
      const bundleCode = fs.readFileSync(bundlePath, 'utf8');
      await page.addScriptTag({ content: bundleCode });
    }

    const rawFindings = await page.evaluate((opts) => {
      if (typeof window.impeccableDetect === 'function') {
        return window.impeccableDetect({ visualContrast: false, ...opts });
      }
      return [];
    }, options.evalOptions || {});

    const flattened = [];

    for (const item of rawFindings) {
      if (Array.isArray(item.findings)) {
        for (const f of item.findings) {
          const ruleType = f.type || f.id;
          flattened.push({
            selector: item.selector || item.tagName || 'unknown',
            type: ruleType,
            category: f.category || 'slop',
            severity: f.severity || 'warning',
            detail: f.detail || f.snippet || '',
            name: f.name || ruleType,
            description: f.description || '',
            dataDs: item.dataDs || null
          });
        }
      }
    }

    // Also run static craft floor checks if htmlContent is available
    if (options.htmlContent) {
      const staticReport = ImpeccableGate.auditHtmlStatic(options.htmlContent, { ...options, staticOnly: true });
      // Merge unique findings from static craft-floor checks
      for (const sf of staticReport.summary.findings) {
        if (CRAFT_FLOOR_RULES.includes(sf.type) && !flattened.some(b => b.type === sf.type && b.selector === sf.selector)) {
          flattened.push(sf);
        }
      }
    }

    // Process waivers
    const { filteredFindings, appliedWaivers } = ImpeccableGate.processWaivers(
      flattened,
      artisticWaivers,
      surfaceMode
    );

    const counts = {};
    for (const f of filteredFindings) {
      counts[f.type] = (counts[f.type] || 0) + 1;
    }

    const violations = [];
    const zeroToleranceViolations = [];

    for (const f of filteredFindings) {
      if (zeroToleranceRules.includes(f.type)) {
        const msg = `[Tier 4: ${f.type}] ${f.detail || f.name} at <${f.selector}>`;
        violations.push(msg);
        zeroToleranceViolations.push(f);
      }
    }

    const passed = zeroToleranceViolations.length === 0;

    return {
      passed,
      violations,
      appliedWaivers,
      summary: {
        totalFindings: filteredFindings.length,
        zeroToleranceViolations: zeroToleranceViolations.length,
        breakdown: counts,
        findings: filteredFindings,
        appliedWaivers,
        surfaceMode
      }
    };
  }

  /**
   * Static Cheerio analysis with full Craft-Floor & Zero-Tolerance detectors
   */
  static auditHtmlStatic(htmlContent, options = {}) {
    const zeroToleranceRules = options.zeroToleranceRules || ZERO_TOLERANCE_RULES;
    const surfaceMode = options.surfaceMode || 'Operate';
    const artisticWaivers = options.artisticWaivers || [];
    const findings = [];
    const $ = cheerio.load(htmlContent, { decodeEntities: false });

    // Helper to format selector and capture data-ds
    const getSelectorInfo = (el) => {
      const $el = $(el);
      const tag = el.tagName ? el.tagName.toLowerCase() : 'element';
      const id = $el.attr('id') ? '#' + $el.attr('id') : '';
      const cls = $el.attr('class') ? '.' + $el.attr('class').trim().split(/\s+/).slice(0, 2).join('.') : '';
      const dataDs = $el.attr('data-ds') || $el.closest('[data-ds]').attr('data-ds') || null;
      return {
        selector: `${tag}${id}${cls}`,
        dataDs
      };
    };

    // ────────────────────────────────────────────────────────────────────────
    // 1. Zero-Tolerance Base Rules
    // ────────────────────────────────────────────────────────────────────────

    // 1.1 Overused Fonts in links and styles
    const links = $('link[href*="fonts.googleapis.com"]').attr('href') || '';
    for (const font of OVERUSED_FONTS) {
      const slug = font.replace(/\s+/g, '+');
      if (new RegExp(`family=${slug.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}`, 'i').test(links)) {
        findings.push({
          selector: 'link[rel="stylesheet"]',
          type: 'overused-font',
          detail: `Google Fonts contains overused font: "${font}"`,
          dataDs: null
        });
      }
    }

    const stylesText = $('style').text() + ' ' + ($('html').attr('style') || '');
    for (const font of OVERUSED_FONTS) {
      const fontRegex = new RegExp(`['"]?${font.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}['"]?`, 'i');
      if (/font-family\s*:[^;]+/.test(stylesText)) {
        const matches = stylesText.match(/font-family\s*:[^;]+/gi) || [];
        for (const m of matches) {
          if (fontRegex.test(m)) {
            findings.push({
              selector: 'style',
              type: 'overused-font',
              detail: `font-family declares overused font: "${font}"`,
              dataDs: null
            });
            break;
          }
        }
      }
    }

    // 1.2 Pulsing Dot (animate-ping)
    if (/\banimate-ping\b/.test(htmlContent)) {
      $('[class*="animate-ping"]').each((_, el) => {
        const info = getSelectorInfo(el);
        findings.push({
          selector: info.selector,
          type: 'pulsing-dot',
          detail: 'animate-ping pulsing dot detected',
          dataDs: info.dataDs
        });
      });
    }

    // 1.3 Dark Glow / hard chromatic drop shadow
    if (/shadow-\[[^\]]*#1677FF\]/.test(htmlContent)) {
      $('[class*="#1677FF"]').each((_, el) => {
        const info = getSelectorInfo(el);
        findings.push({
          selector: info.selector,
          type: 'dark-glow',
          detail: 'Hard neon chromatic drop shadow detected (#1677FF)',
          dataDs: info.dataDs
        });
      });
    }

    // 1.4 Bounce Easing
    if (/\banimate-bounce\b|cubic-bezier\([^)]*(?:1\.[2-9]|[2-9]\.)/.test(htmlContent)) {
      findings.push({
        selector: 'body',
        type: 'bounce-easing',
        detail: 'Bounce animation or overshoot cubic-bezier detected',
        dataDs: null
      });
    }

    // 1.5 Nested Cards
    const cardLikeSelector = '[class*="rounded-"][class*="bg-"], [class*="border"][class*="rounded-"]';
    $(cardLikeSelector).each((_, el) => {
      const $el = $(el);
      const tag = el.tagName.toLowerCase();
      if (['input', 'select', 'textarea', 'button', 'a', 'span', 'p'].includes(tag)) return;
      const parentCard = $el.parents(cardLikeSelector).first();
      if (parentCard.length > 0) {
        const parentTag = parentCard.get(0).tagName.toLowerCase();
        if (!['input', 'select', 'textarea', 'button', 'body', 'html'].includes(parentTag)) {
          const info = getSelectorInfo(el);
          findings.push({
            selector: info.selector,
            type: 'nested-cards',
            detail: `Nested card container inside <${parentTag}>`,
            dataDs: info.dataDs
          });
        }
      }
    });

    // ────────────────────────────────────────────────────────────────────────
    // 2. Craft-Floor Detectors (TASK-V3-04)
    // ────────────────────────────────────────────────────────────────────────

    // 2.1 Cor & Atmosfera: untinted-gray-black (S = 0% neutral black/gray)
    $('[style*="background"], [class*="bg-black"], [class*="bg-neutral-"], [class*="bg-zinc-"]').each((_, el) => {
      const $el = $(el);
      const style = $el.attr('style') || '';
      const cls = $el.attr('class') || '';

      const isUntintedHex = /background(?:-color)?\s*:\s*#(?:000000|000|111111|111|222222|222|333333|333)\b/i.test(style);
      const isUntintedRgb = /background(?:-color)?\s*:\s*rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)/i.test(style) ||
        /background(?:-color)?\s*:\s*rgb\(\s*17\s*,\s*17\s*,\s*17\s*\)/i.test(style);
      const isUntintedClass = /\b(?:bg-black|bg-neutral-950|bg-zinc-950)\b/.test(cls);

      if (isUntintedHex || isUntintedRgb || isUntintedClass) {
        const info = getSelectorInfo(el);
        findings.push({
          selector: info.selector,
          type: 'untinted-gray-black',
          detail: 'Untinted neutral black/gray (S=0%) background detected without brand hue tint',
          dataDs: info.dataDs
        });
      }
    });

    // 2.2 Cor & Atmosfera: muddy-opacity-gradient (fading to transparent)
    $('[style*="gradient"], [class*="to-transparent"]').each((_, el) => {
      const $el = $(el);
      const style = $el.attr('style') || '';
      const cls = $el.attr('class') || '';

      const hasTransparentGradient = /(?:linear|radial|conic)-gradient\([^)]*(?:,\s*transparent\b|\bto\s+transparent\b|rgba\([^)]*,\s*0\)|#[0-9a-fA-F]{3,8}00\b)/i.test(style) ||
        /\bto-transparent\b/.test(cls);

      if (hasTransparentGradient) {
        const info = getSelectorInfo(el);
        findings.push({
          selector: info.selector,
          type: 'muddy-opacity-gradient',
          detail: 'Gradient fades to transparent causing grayish muddy desaturation in sRGB',
          dataDs: info.dataDs
        });
      }
    });

    // 2.3 Ornamentação & Cards: side-tab-accent-stripe (border-left >= 3px on rounded card)
    $('[class*="rounded-"], [style*="border-radius"]').each((_, el) => {
      const $el = $(el);
      const style = $el.attr('style') || '';
      const cls = $el.attr('class') || '';

      const isRounded = /rounded-(?:md|lg|xl|2xl|3xl)/.test(cls) ||
        /border-radius\s*:\s*(?:[6-9]|\d{2,})\s*px/i.test(style);
      if (!isRounded) return;

      const hasThickBorderLeft = /border-l-(?:4|8|\[[3-9]px\]|\[\d{2,}px\])/.test(cls) ||
        /border-left(?:-width)?\s*:\s*(?:[3-9]|\d{2,})\s*px/i.test(style);

      if (hasThickBorderLeft) {
        const info = getSelectorInfo(el);
        findings.push({
          selector: info.selector,
          type: 'side-tab-accent-stripe',
          detail: 'Thick accent border-left (>= 3px) on rounded card clashes with corner radius',
          dataDs: info.dataDs
        });
      }
    });

    // 2.4 Ornamentação & Cards: thick-card-border (border-width >= 2px on rounded card)
    $('[class*="rounded-"], [style*="border-radius"]').each((_, el) => {
      const $el = $(el);
      const tag = el.tagName.toLowerCase();
      if (['input', 'textarea', 'button', 'select'].includes(tag)) return;

      const style = $el.attr('style') || '';
      const cls = $el.attr('class') || '';

      const isRounded = /rounded-(?:md|lg|xl|2xl|3xl)/.test(cls) ||
        /border-radius\s*:\s*(?:[6-9]|\d{2,})\s*px/i.test(style);
      if (!isRounded) return;

      const hasThickBorder = /border-(?:2|4|8|\[2px\]|\[3px\]|\[4px\])/.test(cls) ||
        /(?:^|;)\s*border(?:-width)?\s*:\s*(?:[2-9]|\d{2,})\s*px/i.test(style);

      if (hasThickBorder) {
        const info = getSelectorInfo(el);
        findings.push({
          selector: info.selector,
          type: 'thick-card-border',
          detail: 'Thick border (>= 2px) on rounded card creates clunky AI-generated container',
          dataDs: info.dataDs
        });
      }
    });

    // 2.5 Ornamentação & Cards: icon-tile-stack (icon-in-colored-box above title and text in >= 3 cols)
    $('div, section, ul').each((_, container) => {
      const $c = $(container);
      const cls = $c.attr('class') || '';
      const isMultiCol = /\b(?:grid-cols-[3-9]|grid-cols-1[0-2])\b/.test(cls);

      const children = $c.children().toArray();
      if (children.length >= 3 && isMultiCol) {
        let matchingCols = 0;
        for (const child of children) {
          const $child = $(child);
          const iconBox = $child.find('[class*="icon"], [class*="bg-"][class*="rounded"], svg, i').first();
          const heading = $child.find('h1, h2, h3, h4, h5, h6, [class*="font-bold"]').first();
          const paragraph = $child.find('p, [class*="text-"]').first();

          if (iconBox.length && heading.length && paragraph.length) {
            // Check that icon is vertically above heading
            matchingCols++;
          }
        }

        if (matchingCols >= 3) {
          const info = getSelectorInfo(container);
          findings.push({
            selector: info.selector,
            type: 'icon-tile-stack',
            detail: 'Icon-in-a-colored-box stacked above title and text in 3+ columns is a generic AI template',
            dataDs: info.dataDs
          });
        }
      }
    });

    // 2.6 Copywriting: numbered-section-kicker ('01 /', '02 —')
    $('*').each((_, el) => {
      const $el = $(el);
      if (['script', 'style', 'code', 'pre'].includes(el.tagName.toLowerCase())) return;

      // Only check elements with direct text
      const directText = $el.clone().children().remove().end().text().trim();
      if (/^\s*0\d\s*[/—–\-]\s*/i.test(directText)) {
        const info = getSelectorInfo(el);
        findings.push({
          selector: info.selector,
          type: 'numbered-section-kicker',
          detail: `Decorative numbered section kicker detected: "${directText.slice(0, 30)}"`,
          dataDs: info.dataDs
        });
      }
    });

    // 2.7 Copywriting: em-dash-overuse (> 2 em-dashes in same copy block)
    $('p, h1, h2, h3, h4, h5, h6, [data-slot]').each((_, el) => {
      const text = $(el).text();
      const emDashMatches = text.match(/—|--|&mdash;/g) || [];
      if (emDashMatches.length > 2) {
        const info = getSelectorInfo(el);
        findings.push({
          selector: info.selector,
          type: 'em-dash-overuse',
          detail: `Em-dash overuse: ${emDashMatches.length} em-dashes detected in single copy block`,
          dataDs: info.dataDs
        });
      }
    });

    // 2.8 Copywriting: aphoristic-cadence ('Não é apenas X, é Y' / 'It's not just X, it's Y')
    $('p, h1, h2, h3, h4, h5, h6').each((_, el) => {
      const text = $(el).text();
      const ptAphorism = /(?:^|\s)(?:não\s+é\s+(?:apenas|só)|não\s+se\s+trata\s+de)\s+[^.,;!?]+,\s*(?:mas\s+sim|é)(?:\s|[.,;!?]|$)/iu.test(text);
      const enAphorism = /\b(?:it'?s\s+not\s+(?:just|only)|not\s+just)\s+[^.,;!?]+,\s*it'?s\b/i.test(text);

      if (ptAphorism || enAphorism) {
        const info = getSelectorInfo(el);
        findings.push({
          selector: info.selector,
          type: 'aphoristic-cadence',
          detail: `Aphoristic cadence copy detected: "${text.trim().slice(0, 60)}"`,
          dataDs: info.dataDs
        });
      }
    });

    // 2.9 Copywriting: fabricated-stat-tile ('+247%', '99.9%' without source)
    $('[class*="stat"], [class*="metric"], [data-metric]').each((_, el) => {
      const $el = $(el);
      const text = $el.text();
      const statPattern = /(?:\+\d{2,4}%|\d{2,3}(?:\.\d+)?%|\d+x\b)/i;

      if (statPattern.test(text)) {
        // Check for source citation
        const hasSource = $el.find('cite, small, [data-source]').length > 0 ||
          /\b(?:fonte|source|benchmark|pesquisa|dados|segundo)\b/i.test(text) ||
          Boolean($el.attr('data-source'));

        if (!hasSource) {
          const info = getSelectorInfo(el);
          findings.push({
            selector: info.selector,
            type: 'fabricated-stat-tile',
            detail: `Fabricated or unsourced stat tile detected: "${text.trim().slice(0, 40)}"`,
            dataDs: info.dataDs
          });
        }
      }
    });

    // 2.10 Tipografia & Ergonomia: excessive-line-length (p without max-width <= 75ch)
    $('p').each((_, el) => {
      const $el = $(el);
      const text = $el.text().trim();
      if (text.length > 80) {
        const style = $el.attr('style') || '';
        const cls = $el.attr('class') || '';
        const parentStyle = $el.parent().attr('style') || '';
        const parentCls = $el.parent().attr('class') || '';

        const hasMaxWidth = /max-width\s*:\s*(?:[1-6]\d{2}px|7[0-5]ch|[1-4]\drem)/i.test(style) ||
          /max-width\s*:\s*(?:[1-6]\d{2}px|7[0-5]ch|[1-4]\drem)/i.test(parentStyle) ||
          /\bmax-w-(?:prose|xs|sm|md|lg|xl|2xl|\[75ch\]|ch)\b/.test(cls) ||
          /\bmax-w-(?:prose|xs|sm|md|lg|xl|2xl|\[75ch\]|ch)\b/.test(parentCls);

        if (!hasMaxWidth) {
          const info = getSelectorInfo(el);
          findings.push({
            selector: info.selector,
            type: 'excessive-line-length',
            detail: `Paragraph exceeds 80 characters (${text.length} chars) without max-width <= 75ch constraint`,
            dataDs: info.dataDs
          });
        }
      }
    });

    // 2.11 Tipografia & Ergonomia: missing-tabular-nums (prices without tabular-nums)
    $('[class*="price"], .font-bold').each((_, el) => {
      const $el = $(el);
      const text = $el.text().trim();
      const hasPrice = /(?:R\$\s*[\d.,]+|\$\s*[\d.,]+|€\s*[\d.,]+|£\s*[\d.,]+|\bUSD\s*[\d.,]+)/i.test(text);

      if (hasPrice) {
        const style = $el.attr('style') || '';
        const cls = $el.attr('class') || '';
        const hasTabularNums = /font-variant-numeric\s*:\s*tabular-nums/i.test(style) ||
          /\btabular-nums\b/.test(cls);

        if (!hasTabularNums) {
          const info = getSelectorInfo(el);
          findings.push({
            selector: info.selector,
            type: 'missing-tabular-nums',
            detail: `Price or numerical metric "${text}" missing "font-variant-numeric: tabular-nums"`,
            dataDs: info.dataDs
          });
        }
      }
    });

    // 2.12 Tipografia & Ergonomia: sub-44px-touch-target (buttons/links with min(W, H) < 44px)
    $('button, a[href], [role="button"]').each((_, el) => {
      const $el = $(el);
      const style = $el.attr('style') || '';
      const cls = $el.attr('class') || '';

      const wMatch = style.match(/width\s*:\s*(\d+)px/i);
      const hMatch = style.match(/height\s*:\s*(\d+)px/i);

      let isSub44 = false;
      if (wMatch && parseInt(wMatch[1], 10) < 44) isSub44 = true;
      if (hMatch && parseInt(hMatch[1], 10) < 44) isSub44 = true;
      if (/\b(?:h-[1-9]|h-10|w-[1-9]|w-10)\b/.test(cls) && !/\b(?:min-h-\[44px\]|min-w-\[44px\])\b/.test(cls)) {
        isSub44 = true;
      }

      if (isSub44) {
        const info = getSelectorInfo(el);
        findings.push({
          selector: info.selector,
          type: 'sub-44px-touch-target',
          detail: 'Clickable touch target has min(W, H) < 44px ergonomic floor',
          dataDs: info.dataDs
        });
      }
    });

    // ────────────────────────────────────────────────────────────────────────
    // 3. Process Artistic Waivers & Surface Mode
    // ────────────────────────────────────────────────────────────────────────
    const { filteredFindings, appliedWaivers } = ImpeccableGate.processWaivers(
      findings,
      artisticWaivers,
      surfaceMode
    );

    const counts = {};
    for (const f of filteredFindings) {
      counts[f.type] = (counts[f.type] || 0) + 1;
    }

    const violations = [];
    const zeroToleranceViolations = [];

    for (const f of filteredFindings) {
      if (zeroToleranceRules.includes(f.type)) {
        violations.push(`[Tier 4: ${f.type}] ${f.detail} at <${f.selector}>`);
        zeroToleranceViolations.push(f);
      }
    }

    const passed = zeroToleranceViolations.length === 0;

    return {
      passed,
      violations,
      appliedWaivers,
      summary: {
        totalFindings: filteredFindings.length,
        zeroToleranceViolations: zeroToleranceViolations.length,
        breakdown: counts,
        findings: filteredFindings,
        appliedWaivers,
        surfaceMode
      }
    };
  }

  /**
   * Filters findings by approved artistic waivers.
   * Only composition_agent and human_art_director roles are authorized to waive rules.
   */
  static processWaivers(findings, artisticWaivers = [], surfaceMode = 'Operate') {
    const appliedWaivers = [];
    
    // In Persuade and Experience modes, composition_agent and human_art_director can sign waivers.
    // In Operate and Read modes, only human_art_director is authorized.
    const authorizedRoles = (surfaceMode === 'Persuade' || surfaceMode === 'Experience')
      ? ['composition_agent', 'human_art_director']
      : ['human_art_director'];

    const validWaivers = (artisticWaivers || []).filter(w => {
      return w && w.dataDs && w.ruleId && authorizedRoles.includes(w.approvedByRole);
    });

    const filteredFindings = [];

    for (const finding of findings) {
      let isWaived = false;

      for (const waiver of validWaivers) {
        if (waiver.ruleId === finding.type) {
          const matchDataDs = finding.dataDs && finding.dataDs === waiver.dataDs;
          const matchSelector = finding.selector && finding.selector.includes(waiver.dataDs);

          if (matchDataDs || matchSelector) {
            isWaived = true;
            appliedWaivers.push({
              dataDs: waiver.dataDs,
              ruleId: waiver.ruleId,
              reason: waiver.reason,
              approvedByRole: waiver.approvedByRole,
              suppressedFinding: finding
            });
            break;
          }
        }
      }

      if (!isWaived) {
        filteredFindings.push(finding);
      }
    }

    return { filteredFindings, appliedWaivers };
  }
}

/**
 * Asynchronous Quality Gate entry point function.
 */
async function runImpeccableGate(pageOrHtml, options = {}) {
  return ImpeccableGate.run(pageOrHtml, options);
}

module.exports = {
  ImpeccableGate,
  runImpeccableGate,
  ZERO_TOLERANCE_RULES,
  CRAFT_FLOOR_RULES,
  OVERUSED_FONTS
};
