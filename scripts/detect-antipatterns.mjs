#!/usr/bin/env node

/**
 * Anti-Pattern Detector for Impeccable (Adapted for studio-dna v3.0 / playwright-scraper)
 * Copyright (c) 2026 Paul Bakaus / studio-dna
 * SPDX-License-Identifier: Apache-2.0
 */

import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

// Authoritative impeccable detector upstream path
const UPSTREAM_DETECTOR_URL = 'file:///C:/Users/wd/.gemini/config/skills/impeccable/scripts/detector/detect-antipatterns.mjs';

export const CRAFT_FLOOR_RULES = [
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

export {
  ANTIPATTERNS,
  RULE_ENGINE_SUPPORT,
  getAntipattern,
  getRulesForCategory,
  getRuleEngineSupport,
  SAFE_TAGS,
  BORDER_SAFE_TAGS,
  OVERUSED_FONTS,
  GENERIC_FONTS,
  KNOWN_SERIF_FONTS,
  isNeutralColor,
  parseRgb,
  relativeLuminance,
  contrastRatio,
  parseGradientColors,
  hasChroma,
  getHue,
  colorToHex,
  isFullPage,
  checkElementBorders,
  checkElementMotion,
  checkElementGlow,
  checkPageTypography,
  checkPageLayout,
  checkHtmlPatterns,
  createDetectorProfile,
  summarizeDetectorProfile,
  parseDesignFrontmatter,
  normalizeDesignSystem,
  loadDesignSystemForCwd,
  checkSourceDesignSystem,
  collectStaticDesignSystemFindings,
  detectHtml,
  detectUrl,
  createBrowserDetector,
  detectText,
  extractStyleBlocks,
  extractCSSinJS,
  walkDir,
  hasScannableExtension,
  SCANNABLE_EXTENSIONS,
  SKIP_DIRS,
  buildImportGraph,
  resolveImport,
  detectFrameworkConfig,
  isPortListening,
  FRAMEWORK_CONFIGS,
  formatFindings,
  detectCli
} from 'file:///C:/Users/wd/.gemini/config/skills/impeccable/scripts/detector/detect-antipatterns.mjs';

import { detectCli } from 'file:///C:/Users/wd/.gemini/config/skills/impeccable/scripts/detector/detect-antipatterns.mjs';

const isMainModule = process.argv[1]?.endsWith('detect-antipatterns.mjs') ||
  process.argv[1]?.endsWith('detect-antipatterns.mjs/');

if (isMainModule) {
  detectCli();
}
