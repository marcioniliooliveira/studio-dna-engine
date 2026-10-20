/**
 * Impeccable Quality Gate (Tier 4 Quality Gate)
 * 
 * Inspects frontend screens for AI visual anti-patterns using the Impeccable
 * detection engine (detect-antipatterns-browser.js / static Cheerio analysis).
 * 
 * Enforces zero-tolerance (0 violations) for critical surface tells:
 * - dark-glow (zero-offset chromatic halos / radioactive glows)
 * - nested-cards (cards nested inside cards)
 * - overused-font (AI monoculture fonts like Space Grotesk, Plus Jakarta Sans)
 * - bounce-easing (overshoot spring / bounce easing)
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ZERO_TOLERANCE_RULES = [
  'dark-glow',
  'nested-cards',
  'overused-font',
  'bounce-easing'
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
   * @returns {Promise<{ passed: boolean, violations: string[], summary: object }>}
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
        summary: { totalFindings: 1, zeroToleranceViolations: 1, breakdown: { error: 1 }, findings: [] }
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
          return await ImpeccableGate.auditPage(page, { ...options, zeroToleranceRules, bundlePath });
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
   * Audit a live Playwright page using detect-antipatterns-browser.js bundle
   */
  static async auditPage(page, options = {}) {
    const zeroToleranceRules = options.zeroToleranceRules || ZERO_TOLERANCE_RULES;
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
    const counts = {};

    for (const item of rawFindings) {
      if (Array.isArray(item.findings)) {
        for (const f of item.findings) {
          const ruleType = f.type || f.id;
          counts[ruleType] = (counts[ruleType] || 0) + 1;
          flattened.push({
            selector: item.selector || item.tagName || 'unknown',
            type: ruleType,
            category: f.category || 'slop',
            severity: f.severity || 'warning',
            detail: f.detail || f.snippet || '',
            name: f.name || ruleType,
            description: f.description || ''
          });
        }
      }
    }

    // Filter zero tolerance violations
    const violations = [];
    const zeroToleranceViolations = [];

    for (const f of flattened) {
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
      summary: {
        totalFindings: flattened.length,
        zeroToleranceViolations: zeroToleranceViolations.length,
        breakdown: counts,
        findings: flattened
      }
    };
  }

  /**
   * Static Cheerio analysis fallback
   */
  static auditHtmlStatic(htmlContent, options = {}) {
    const zeroToleranceRules = options.zeroToleranceRules || ZERO_TOLERANCE_RULES;
    const findings = [];
    const counts = {};
    const $ = cheerio.load(htmlContent);

    // 1. Check for overused fonts in links, styles, and font-family
    const links = $('link[href*="fonts.googleapis.com"]').attr('href') || '';
    for (const font of OVERUSED_FONTS) {
      const slug = font.replace(/\s+/g, '+');
      const direct = font.replace(/\s+/g, ' ');
      if (new RegExp(`family=${slug.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}`, 'i').test(links)) {
        findings.push({
          selector: 'link[rel="stylesheet"]',
          type: 'overused-font',
          detail: `Google Fonts contains overused font: "${font}"`
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
              detail: `font-family declares overused font: "${font}"`
            });
            break;
          }
        }
      }
    }

    // 2. Check for pulsing-dot (animate-ping)
    if (/\banimate-ping\b/.test(htmlContent)) {
      $('[class*="animate-ping"]').each((_, el) => {
        findings.push({
          selector: el.tagName + (el.attribs.class ? '.' + el.attribs.class.split(' ').slice(0, 2).join('.') : ''),
          type: 'pulsing-dot',
          detail: 'animate-ping pulsing dot detected'
        });
      });
    }

    // 3. Check for dark-glow / hard neon drop shadows
    if (/shadow-\[[^\]]*#1677FF\]/.test(htmlContent)) {
      $('[class*="#1677FF"]').each((_, el) => {
        findings.push({
          selector: el.tagName + (el.attribs.id ? '#' + el.attribs.id : ''),
          type: 'dark-glow',
          detail: 'Hard neon chromatic drop shadow detected (#1677FF)'
        });
      });
    }

    // 4. Check for bounce easing
    if (/\banimate-bounce\b|cubic-bezier\([^)]*(?:1\.[2-9]|[2-9]\.)/.test(htmlContent)) {
      findings.push({
        selector: 'body',
        type: 'bounce-easing',
        detail: 'Bounce animation or overshoot cubic-bezier detected'
      });
    }

    // 5. Check for nested cards
    const cardLikeSelector = '[class*="rounded-"][class*="bg-"], [class*="border"][class*="rounded-"]';
    $(cardLikeSelector).each((_, el) => {
      const $el = $(el);
      const tag = el.tagName.toLowerCase();
      if (['input', 'select', 'textarea', 'button', 'a', 'span', 'p'].includes(tag)) return;
      const parentCard = $el.parents(cardLikeSelector).first();
      if (parentCard.length > 0) {
        const parentTag = parentCard.get(0).tagName.toLowerCase();
        if (!['input', 'select', 'textarea', 'button', 'body', 'html'].includes(parentTag)) {
          findings.push({
            selector: tag + ($el.attr('id') ? '#' + $el.attr('id') : ''),
            type: 'nested-cards',
            detail: `Nested card container inside <${parentTag}>`
          });
        }
      }
    });

    for (const f of findings) {
      counts[f.type] = (counts[f.type] || 0) + 1;
    }

    const violations = [];
    const zeroToleranceViolations = [];

    for (const f of findings) {
      if (zeroToleranceRules.includes(f.type)) {
        violations.push(`[Tier 4: ${f.type}] ${f.detail} at <${f.selector}>`);
        zeroToleranceViolations.push(f);
      }
    }

    const passed = zeroToleranceViolations.length === 0;

    return {
      passed,
      violations,
      summary: {
        totalFindings: findings.length,
        zeroToleranceViolations: zeroToleranceViolations.length,
        breakdown: counts,
        findings
      }
    };
  }
}

/**
 * Asynchronous Quality Gate entry point function as specified in R1.
 */
async function runImpeccableGate(pageOrHtml, options = {}) {
  return ImpeccableGate.run(pageOrHtml, options);
}

module.exports = {
  ImpeccableGate,
  runImpeccableGate,
  ZERO_TOLERANCE_RULES,
  OVERUSED_FONTS
};
