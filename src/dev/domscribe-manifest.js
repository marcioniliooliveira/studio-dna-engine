/**
 * src/dev/domscribe-manifest.js
 *
 * Deterministic AST Instrumentation inspired by patchorbit/domscribe.
 * Injects data-ds (<8-char hex hash>) and data-dna-line (<startLine>) during dev/audit,
 * generating .domscribe/manifest.jsonl for sub-400ms delta verification and Click-to-MCP.
 */

'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');

/**
 * Computes a deterministic 8-character hex identifier
 * @param {string} filePath Relative file path
 * @param {string} tagName HTML tag name
 * @param {string} slotOrIndexKey Slot identifier or index key
 * @returns {string} 8-character hex hash
 */
function computeStableDataDs(filePath, tagName, slotOrIndexKey) {
  const normalizedPath = (filePath || 'site/index.html').replace(/\\/g, '/');
  const normalizedTag = (tagName || 'div').toLowerCase();
  const raw = `${normalizedPath}::${normalizedTag}::${slotOrIndexKey}`;
  return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 8);
}

/**
 * Instruments HTML with data-ds and data-dna-line and extracts manifest entries
 * @param {string} htmlSource Raw HTML source
 * @param {string} relativeFilePath Relative path to the file
 * @returns {{ instrumentedHtml: string, manifestEntries: Array<object> }}
 */
function instrumentHtmlForDomscribe(htmlSource, relativeFilePath = 'site/index.html') {
  if (!htmlSource || typeof htmlSource !== 'string') {
    return { instrumentedHtml: '', manifestEntries: [] };
  }

  const isFragment = !/<html/i.test(htmlSource) && !/<body/i.test(htmlSource) && !/<!doctype/i.test(htmlSource);
  const $ = cheerio.load(htmlSource, {
    sourceCodeLocationInfo: true,
    decodeEntities: false
  });

  const manifestEntries = [];
  let structuralIndex = 0;

  const STRUCTURAL_SELECTOR = 'section, header, footer, main, article, form, [data-kinetic-slot], [data-slot], [data-slot-bind], h1, h2, h3, button, a';

  $(STRUCTURAL_SELECTOR).each((_, el) => {
    structuralIndex++;
    const startLine = el.sourceCodeLocation?.startLine || 1;
    const endLine = el.sourceCodeLocation?.endLine || startLine;

    const slotId =
      $(el).attr('data-kinetic-slot') ||
      $(el).attr('data-slot') ||
      $(el).attr('data-slot-bind') ||
      $(el).attr('id') ||
      `idx-${structuralIndex}`;

    const existingDs = $(el).attr('data-ds');
    const dataDs = existingDs || computeStableDataDs(relativeFilePath, el.tagName, `${slotId}@${startLine}`);
    
    $(el).attr('data-ds', dataDs);
    $(el).attr('data-dna-line', String(startLine));

    const selector = $(el).attr('id')
      ? `${el.tagName.toLowerCase()}#${$(el).attr('id')}`
      : `[data-ds="${dataDs}"]`;

    manifestEntries.push({
      id: dataDs,
      file: relativeFilePath.replace(/\\/g, '/'),
      tagName: el.tagName.toLowerCase(),
      slotId,
      selector,
      startLine,
      endLine
    });
  });

  const instrumentedHtml = isFragment ? ($('body').html() || $.html()) : $.html();

  return {
    instrumentedHtml,
    manifestEntries
  };
}

/**
 * Persists the manifest in JSONL format (.domscribe/manifest.jsonl)
 * @param {string} projectRoot Root directory of the project
 * @param {Array<object>} manifestEntries Array of manifest entries
 * @returns {string} Absolute path to written manifest file
 */
function writeDomscribeManifest(projectRoot, manifestEntries = []) {
  const dir = path.join(projectRoot, '.domscribe');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, 'manifest.jsonl');
  const lines = manifestEntries.map(entry => JSON.stringify(entry)).join('\n') + (manifestEntries.length > 0 ? '\n' : '');
  fs.writeFileSync(filePath, lines, 'utf8');
  return filePath;
}

/**
 * Reads manifest entries from .domscribe/manifest.jsonl
 * @param {string} projectRoot Root directory or path to manifest file
 * @returns {Array<object>} Parsed entries
 */
function readDomscribeManifest(projectRoot) {
  let filePath = projectRoot;
  if (!filePath.endsWith('.jsonl')) {
    filePath = path.join(projectRoot, '.domscribe', 'manifest.jsonl');
  }

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

/**
 * Resolves an element from the manifest by its data-ds identifier
 * @param {string} projectRoot Root directory of the project
 * @param {string} dataDsId 8-character data-ds ID
 * @returns {object|null} Matched entry or null
 */
function resolveElementFromManifest(projectRoot, dataDsId) {
  if (!dataDsId) return null;
  const entries = readDomscribeManifest(projectRoot);
  for (const entry of entries) {
    if (entry.id === dataDsId) {
      return entry;
    }
  }
  return null;
}

/**
 * Strips instrumentation attributes (data-ds, data-dna-line) for production bundle
 * @param {string} htmlSource Raw HTML source
 * @returns {string} Clean HTML without instrumentation attributes
 */
function stripDomscribeAttributesForProduction(htmlSource) {
  if (!htmlSource || typeof htmlSource !== 'string') return '';
  const isFragment = !/<html/i.test(htmlSource) && !/<body/i.test(htmlSource) && !/<!doctype/i.test(htmlSource);
  const $ = cheerio.load(htmlSource, { decodeEntities: false });

  $('[data-ds], [data-dna-line]').each((_, el) => {
    $(el).removeAttr('data-ds');
    $(el).removeAttr('data-dna-line');
  });

  return isFragment ? ($('body').html() || $.html()) : $.html();
}

module.exports = {
  computeStableDataDs,
  instrumentHtmlForDomscribe,
  writeDomscribeManifest,
  readDomscribeManifest,
  resolveElementFromManifest,
  stripDomscribeAttributesForProduction
};
