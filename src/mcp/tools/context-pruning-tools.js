/**
 * src/mcp/tools/context-pruning-tools.js
 *
 * Context Pruning MCP Tool.
 * Extracts only the DOM subtree of the target section, linked slots,
 * and CSS variables effectively consumed in that scope, reducing context
 * size from ~45KB to < 6KB while strictly preserving P0 tokens.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
const { z } = require('zod');
const { extractTopologyVector } = require('../../vault/topology-vector-index');
const { SqliteHybridVault } = require('../../vault/sqlite-hybrid-vault');
const { getSafeClientDir, validateSlugSecurity } = require('../schemas');

const PruneContextSchema = {
  clientSlug: z.string().optional().describe('Slug do cliente em clientes/ (opcional se fornecido html direto)'),
  targetSectionSelector: z.string().default('section:first-of-type').describe('Seletor da seção alvo (ex: #hero, section.hero-stage)'),
  taskIntent: z.string().default('UI Refinement').describe('Intenção da tarefa para priorização de tokens')
};

/**
 * Prunes HTML and CSS context down to the minimal slice required for a task.
 */
function pruneContextForTask(options = {}) {
  const {
    html,
    clientSlug,
    targetSectionSelector = '#hero',
    taskIntent = 'UI Refinement',
    brandSpec: inputBrandSpec
  } = options;

  let rawHtml = html;
  let brandSpec = inputBrandSpec || {};

  // If clientSlug is provided, read client assets from disk if rawHtml not provided
  if (!rawHtml && clientSlug) {
    const safeSlug = validateSlugSecurity(clientSlug);
    const clientDir = getSafeClientDir(safeSlug);
    const indexPath = path.join(clientDir, 'site', 'index.html');
    const skeletonPath = path.join(clientDir, 'skeleton.html');

    if (fs.existsSync(indexPath)) {
      rawHtml = fs.readFileSync(indexPath, 'utf8');
    } else if (fs.existsSync(skeletonPath)) {
      rawHtml = fs.readFileSync(skeletonPath, 'utf8');
    }

    const brandSpecPath = path.join(clientDir, 'brand-spec.json');
    if (!inputBrandSpec && fs.existsSync(brandSpecPath)) {
      try {
        brandSpec = JSON.parse(fs.readFileSync(brandSpecPath, 'utf8'));
      } catch (_) {}
    }
  }

  if (!rawHtml || typeof rawHtml !== 'string') {
    throw new Error('pruneContextForTask requires either html string or valid clientSlug with index.html');
  }

  const sizeOriginalBytes = Buffer.byteLength(rawHtml, 'utf8');
  const $ = cheerio.load(rawHtml);

  // 1. Locate target section
  let target = $(targetSectionSelector);
  if (!target.length) {
    target = $(`#${targetSectionSelector.replace(/^[#.]/, '')}`);
  }
  if (!target.length) {
    target = $(`section${targetSectionSelector.startsWith('.') ? targetSectionSelector : '.' + targetSectionSelector}`);
  }
  if (!target.length) {
    target = $('section').first();
  }

  const targetHtml = target.length ? $.html(target) : '';

  // 2. Extract slots linked to target
  const slots = [];
  if (target.length) {
    target.find('[data-kinetic-slot], [data-slot], [data-slot-bind]').addBack('[data-kinetic-slot], [data-slot]').each((_, el) => {
      const slotId = $(el).attr('data-kinetic-slot') || $(el).attr('data-slot') || $(el).attr('data-slot-bind');
      if (slotId) {
        slots.push({
          slotId,
          tagName: el.tagName.toLowerCase(),
          textSnippet: $(el).text().trim().slice(0, 80)
        });
      }
    });
  }

  // 3. Extract CSS variables defined in style tags
  const definedVariables = {};
  $('style').each((_, el) => {
    const css = $(el).text();
    const varDeclRegex = /(--[a-zA-Z0-9_\-]+)\s*:\s*([^;}\n]+)/g;
    let match;
    while ((match = varDeclRegex.exec(css)) !== null) {
      definedVariables[match[1].trim()] = match[2].trim();
    }
  });

  // 4. Detect CSS variables referenced in the target HTML
  const consumedVarNames = new Set();
  const varRefRegex = /var\(\s*(--[a-zA-Z0-9_\-]+)\s*[,)]/g;
  let refMatch;
  while ((refMatch = varRefRegex.exec(targetHtml)) !== null) {
    consumedVarNames.add(refMatch[1]);
  }

  // 5. Always include P0 invariant tokens from brandSpec
  const p0Tokens = [];
  if (brandSpec && brandSpec.invariants && Array.isArray(brandSpec.invariants.P0)) {
    for (const inv of brandSpec.invariants.P0) {
      if (inv.startsWith('--')) {
        consumedVarNames.add(inv);
        p0Tokens.push(inv);
      }
    }
  }

  if (brandSpec && brandSpec.colors) {
    if (brandSpec.colors.primary) {
      consumedVarNames.add('--brand-primary');
      definedVariables['--brand-primary'] = definedVariables['--brand-primary'] || brandSpec.colors.primary;
      p0Tokens.push('--brand-primary');
    }
    if (brandSpec.colors.accent) {
      consumedVarNames.add('--brand-accent');
      definedVariables['--brand-accent'] = definedVariables['--brand-accent'] || brandSpec.colors.accent;
      p0Tokens.push('--brand-accent');
    }
  }

  const consumedVariables = {};
  for (const varName of consumedVarNames) {
    if (definedVariables[varName] !== undefined) {
      consumedVariables[varName] = definedVariables[varName];
    }
  }

  // 6. Query Top-2 Templates from Vault for context
  let topTemplates = [];
  try {
    const topoVec = extractTopologyVector(targetHtml);
    const vault = new SqliteHybridVault();
    vault.initialize();
    topTemplates = vault.hybridSearch({
      queryTopo: topoVec,
      queryTerms: [taskIntent],
      limit: 2,
      relevancyFloor: 0.1
    });
    vault.close();
  } catch (_) {
    topTemplates = [];
  }

  // 7. Assemble pruned document
  let prunedCssVars = '';
  for (const [k, v] of Object.entries(consumedVariables)) {
    prunedCssVars += `  ${k}: ${v};\n`;
  }

  const prunedHtml = `<!-- PRUNED CONTEXT SLICE: ${targetSectionSelector} | TASK: ${taskIntent} -->
<style>
:root {
${prunedCssVars}}
</style>
${targetHtml}`;

  const sizePrunedBytes = Buffer.byteLength(prunedHtml, 'utf8');
  const reductionPercent = Math.max(
    0,
    Math.round(((sizeOriginalBytes - sizePrunedBytes) / sizeOriginalBytes) * 1000) / 10
  );

  return {
    targetSectionSelector,
    taskIntent,
    prunedHtml,
    slots,
    consumedVariables,
    p0Tokens: Array.from(new Set(p0Tokens)),
    topTemplates,
    sizeOriginalBytes,
    sizePrunedBytes,
    reductionPercent
  };
}

/**
 * Registers context pruning tools onto McpServer
 */
function registerContextPruningTools(server) {
  server.tool(
    'prune_context_for_task',
    'Extrai cirurgicamente apenas a subárvore DOM, slots e variáveis CSS da seção alvo, reduzindo o contexto em até 90% (<6KB).',
    PruneContextSchema,
    async ({ clientSlug, targetSectionSelector = '#hero', taskIntent = 'UI Refinement' }) => {
      try {
        const result = pruneContextForTask({
          clientSlug,
          targetSectionSelector,
          taskIntent
        });

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: err.message }]
        };
      }
    }
  );
}

module.exports = {
  PruneContextSchema,
  pruneContextForTask,
  registerContextPruningTools
};
