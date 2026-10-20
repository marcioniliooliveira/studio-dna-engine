const fs = require('fs');
const path = require('path');
const schemas = require('../schemas');

const { getSafeVaultDir } = schemas;
const QueryVaultSchema = schemas.QueryVaultSchema || schemas.queryDesignVaultSchema;

function loadEasings() {
  const easingsPath = getSafeVaultDir('01-motion-physics/easings.json');
  if (fs.existsSync(easingsPath)) {
    try {
      return JSON.parse(fs.readFileSync(easingsPath, 'utf8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function loadTypography() {
  const typoPath = getSafeVaultDir('04-typography/curated-pairings.json');
  if (fs.existsSync(typoPath)) {
    try {
      return JSON.parse(fs.readFileSync(typoPath, 'utf8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function loadComponents() {
  let effects = [];
  try {
    const effectRegistry = require('../../registry/effect-registry');
    effects = Array.from(effectRegistry.effects.values());
  } catch (e) {}

  let vaultIndex = {};
  const indexPath = getSafeVaultDir('INDEX.json');
  if (fs.existsSync(indexPath)) {
    try {
      vaultIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    } catch (e) {}
  }

  return {
    effects,
    patterns: vaultIndex.patterns || [],
    templates: vaultIndex.templates || []
  };
}

function registerVaultTools(server) {
  // Tool 1: Consultar Design Vault (Easings, Typography, Components & Templates)
  server.tool(
    'query_design_vault',
    'Consulta padrões de design de alta fidelidade curados no Design Vault: curvas de easing matemáticas, pares tipográficos editoriais, componentes UI e templates.',
    QueryVaultSchema,
    async ({ category = 'all' }) => {
      try {
        let vaultData = null;

        if (category === 'easings') {
          const easings = loadEasings();
          const items = easings.easings || easings;
          const totalCount = Object.keys(items).length;
          vaultData = {
            category: 'easings',
            totalCount,
            items,
            easings
          };
        } else if (category === 'typography') {
          const typography = loadTypography();
          const items = typography.pairings || typography;
          const totalCount = Array.isArray(items) ? items.length : Object.keys(items).length;
          vaultData = {
            category: 'typography',
            totalCount,
            items,
            typography
          };
        } else if (category === 'components') {
          const components = loadComponents();
          const totalCount = components.effects.length + components.patterns.length + components.templates.length;
          vaultData = {
            category: 'components',
            totalCount,
            items: components,
            components
          };
        } else {
          // 'all'
          const easings = loadEasings();
          const typography = loadTypography();
          const components = loadComponents();
          const totalCount = Object.keys(easings.easings || easings).length +
            (typography.pairings ? typography.pairings.length : 0) +
            (components.effects.length + components.patterns.length + components.templates.length);

          vaultData = {
            category: 'all',
            totalCount,
            items: {
              easings: easings.easings || easings,
              typography: typography.pairings || typography,
              components
            },
            easings,
            typography,
            components
          };
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(vaultData, null, 2)
          }]
        };
      } catch (error) {
        return {
          isError: true,
          content: [{ type: 'text', text: error.message }]
        };
      }
    }
  );
}

module.exports = { registerVaultTools };
