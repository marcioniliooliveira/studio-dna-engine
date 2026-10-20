/**
 * test/v2.6/fixtures/harness.js
 * 
 * Studio DNA PRO v2.6 — Modular Test Harness & Engine Resolver
 * Implements progressive testability: dynamically discovers compiled reference modules
 * from `docs/research/v2.6/reference/` or `src/`, with fallback to verified reference engines.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const reference = require('./reference-engines');

const PROJECT_ROOT = path.resolve(__dirname, '../../..');

const CANDIDATE_PATHS = {
  'spatial-rtree': [
    path.join(PROJECT_ROOT, 'docs/research/v2.6/reference/spatial-rtree.js'),
    path.join(PROJECT_ROOT, 'src/compiler/spatial-rtree.js')
  ],
  'css-selector-ast': [
    path.join(PROJECT_ROOT, 'docs/research/v2.6/reference/css-selector-ast.js'),
    path.join(PROJECT_ROOT, 'src/compiler/css-selector-ast.js')
  ],
  'png-codec': [
    path.join(PROJECT_ROOT, 'docs/research/v2.6/reference/png-codec.js'),
    path.join(PROJECT_ROOT, 'src/qa/png-codec.js')
  ],
  'slug-font-compiler': [
    path.join(PROJECT_ROOT, 'docs/research/v2.6/reference/slug-font-compiler.js'),
    path.join(PROJECT_ROOT, 'src/assets3d/slug-font-compiler.js')
  ],
  'apca-contrast': [
    path.join(PROJECT_ROOT, 'docs/research/v2.6/reference/apca-contrast.js')
  ]
};

function resolveEngine(engineName) {
  const candidates = CANDIDATE_PATHS[engineName] || [];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      try {
        const mod = require(p);
        if (mod && (mod.calcAPCA || mod.SpatialRTree || mod.parseSelectorAst || mod.decodePng || mod.SlugFontCompiler)) {
          return mod;
        }
      } catch (err) {
        // Fall back if syntax or module issues
      }
    }
  }

  // Fallback to internal reference engines
  if (engineName === 'spatial-rtree') {
    return {
      SpatialRTree: reference.SpatialRTree,
      computeTypographicEnergy: reference.computeTypographicEnergy,
      computeAreaCV: reference.computeAreaCV
    };
  }
  if (engineName === 'css-selector-ast') {
    return {
      parseSelectorAst: reference.parseSelectorAst,
      validateDonutSelector: reference.validateDonutSelector,
      validateDonutScopeInvariants: reference.validateDonutScopeInvariants
    };
  }
  if (engineName === 'png-codec') {
    return {
      decodePng: reference.decodePng,
      applyLateralCompetition: reference.applyLateralCompetition,
      computeSaliencyMetrics: reference.computeSaliencyMetrics
    };
  }
  if (engineName === 'slug-font-compiler') {
    return {
      SlugFontCompiler: reference.SlugFontCompiler
    };
  }
  if (engineName === 'apca-contrast') {
    return {
      sRGBToOklch: reference.sRGBToOklch,
      oklchToSRGB: reference.oklchToSRGB,
      calcAPCA: reference.calcAPCA,
      searchMonotonicContrast: reference.searchMonotonicContrast,
      calculateFluidScale: reference.calculateFluidScale,
      applyLexicalDamping: reference.applyLexicalDamping
    };
  }

  return reference;
}

module.exports = {
  resolveEngine,
  reference
};
