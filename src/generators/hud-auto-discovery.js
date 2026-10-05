/**
 * STUDIO DNA ENGINE — HUD Auto-Discovery Scanner
 * Scans stylesheets and DOM to dynamically extract CSS custom properties,
 * typography tokens, and interactive component hooks without requiring rigid static schemas.
 */

const cheerio = require('cheerio');

/**
 * Extracts and classifies CSS custom properties (--*) from raw CSS text
 * @param {string} cssContent
 * @returns {{ colors: Array, numbers: Array, fonts: Array, other: Array }}
 */
function extractCssTokensFromText(cssContent) {
  const result = {
    colors: [],
    numbers: [],
    fonts: [],
    other: []
  };

  if (!cssContent || typeof cssContent !== 'string') {
    return result;
  }

  const propRegex = /(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
  let match;
  const seen = new Set();

  while ((match = propRegex.exec(cssContent)) !== null) {
    const prop = match[1].trim();
    const rawVal = match[2].trim();

    if (seen.has(prop)) continue;
    seen.add(prop);

    // 1. Cores (Hex, RGB, RGBA, HSL, HSLA, named keywords)
    const isColor = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(rawVal) ||
      /^rgba?\(/i.test(rawVal) ||
      /^hsla?\(/i.test(rawVal) ||
      /(color|bg|background|accent|fill|stroke|surface|text)/i.test(prop);

    if (isColor && !rawVal.includes('url(') && !rawVal.includes('var(')) {
      result.colors.push({
        prop,
        value: rawVal,
        label: formatLabel(prop)
      });
      continue;
    }

    // 2. Fontes (contém aspas, sans-serif, serif, mono, display)
    const isFont = /(font|family|sans|mono|serif)/i.test(prop) ||
      /(sans-serif|monospace|serif|system-ui)/i.test(rawVal);

    if (isFont) {
      result.fonts.push({
        prop,
        value: rawVal,
        label: formatLabel(prop)
      });
      continue;
    }

    // 3. Numéricos (px, rem, em, %, s, ms, deg, ou float/int puro)
    const numMatch = rawVal.match(/^([+-]?[0-9]*\.?[0-9]+)\s*(px|rem|em|%|vh|vw|s|ms|deg)?$/i);
    if (numMatch) {
      const numValue = parseFloat(numMatch[1]);
      const unit = numMatch[2] || '';
      result.numbers.push({
        prop,
        value: rawVal,
        numValue,
        unit,
        label: formatLabel(prop)
      });
      continue;
    }

    // 4. Outros tokens
    result.other.push({
      prop,
      value: rawVal,
      label: formatLabel(prop)
    });
  }

  return result;
}

/**
 * Scans an HTML document for editable slots, headings and canvas animation stages
 * @param {string} htmlContent
 * @returns {Object}
 */
function scanDomForTuningPoints(htmlContent) {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return { headings: [], slots: [], sequences: [] };
  }

  const $ = cheerio.load(htmlContent);
  const headings = [];
  const slots = [];
  const sequences = [];

  $('h1, h2, [data-editable]').each((idx, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    if (text.length > 0 && text.length < 150) {
      headings.push({
        tag: el.tagName.toLowerCase(),
        selector: el.attribs.id ? `#${el.attribs.id}` : `${el.tagName.toLowerCase()}:nth-of-type(${idx + 1})`,
        text
      });
    }
  });

  $('[data-mascot-slot], [data-slot]').each((_, el) => {
    const $el = $(el);
    slots.push({
      name: $el.attr('data-mascot-slot') || $el.attr('data-slot'),
      selector: el.attribs.id ? `#${el.attribs.id}` : `[data-mascot-slot="${$el.attr('data-mascot-slot')}"]`
    });
  });

  $('[data-sequence-canvas], [data-sequence]').each((_, el) => {
    const $el = $(el);
    sequences.push({
      type: 'canvas-scrubber',
      selector: el.attribs.id ? `#${el.attribs.id}` : '[data-sequence-canvas]',
      path: $el.attr('data-sequence-canvas-img-path') || ''
    });
  });

  return { headings, slots, sequences };
}

function formatLabel(prop) {
  return prop
    .replace(/^--/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

module.exports = {
  extractCssTokensFromText,
  scanDomForTuningPoints,
  formatLabel
};
