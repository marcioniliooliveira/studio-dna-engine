/**
 * Wallace CSS Analyzer (Level 0 Pareto Funil)
 * 
 * Inspired by @projectwallace/css-analyzer + OneRedOak/claude-code-plugins.
 * Audits CSS AST in pure Node.js in < 80ms:
 * 1. Zero !important outside accessibility utilities (prefers-reduced-motion).
 * 2. Donut scope isolation @scope (.kinetic-stage) to ([data-kinetic-slot]) - TASK-C1.
 * 3. Selector complexity (max-selector-complexity <= 5).
 * 4. Declaration uniqueness ratio (min-declaration-uniqueness-ratio >= 0.66).
 * 5. Token budgets (maxUniqueColors, maxUniqueFontSizes).
 * 6. Duplicate selectors and orphan CSS variables (unused or undefined).
 */

'use strict';

const postcss = require('postcss');
const { validateDonutScopeInvariants } = require('../css/css-selector-ast');

// Regex for CSS colors
const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const FUNCTIONAL_COLOR_REGEX = /\b(?:rgb|rgba|hsl|hsla|oklch|oklab)\([^)]+\)/gi;
const VAR_USAGE_REGEX = /\bvar\(\s*(--[a-zA-Z0-9_-]+)/g;

/**
 * Calculates selector complexity by measuring compound selector depth,
 * following the standard Wallace CSS Analyzer metric.
 *
 * @param {string} selector
 * @returns {number}
 */
function calculateSelectorComplexity(selector) {
  if (!selector || typeof selector !== 'string') return 0;

  // If selector list (comma-separated), return the maximum complexity among them
  const selectors = selector.split(',');
  if (selectors.length > 1) {
    return Math.max(...selectors.map(s => calculateSelectorComplexity(s.trim())));
  }

  let s = selector.trim();
  // Strip comments
  s = s.replace(/\/\*[\s\S]*?\*\//g, '');
  if (!s) return 0;

  // Split on combinators: >, +, ~, or descendant whitespace
  const compoundSelectors = s.split(/\s*[>+~]\s*|\s+/).filter(Boolean);
  return compoundSelectors.length;
}

/**
 * Calculates declaration uniqueness ratio:
 * uniqueDeclarations / totalDeclarations.
 *
 * @param {Array<{ prop: string, value: string }>} declarations
 * @returns {number} Float in [0, 1]
 */
function calculateDeclarationUniquenessRatio(declarations) {
  if (!declarations || declarations.length === 0) return 1.0;

  const set = new Set();
  for (const decl of declarations) {
    const key = `${(decl.prop || '').trim().toLowerCase()}:${(decl.value || '').trim().toLowerCase()}`;
    set.add(key);
  }

  return set.size / declarations.length;
}

/**
 * Checks if a declaration is enclosed in an accessibility at-rule,
 * specifically @media (prefers-reduced-motion: ...)
 */
function isInsideAccessibilityAtRule(node) {
  let parent = node.parent;
  while (parent) {
    if (parent.type === 'atrule' && parent.name.toLowerCase() === 'media') {
      const params = (parent.params || '').toLowerCase();
      if (params.includes('prefers-reduced-motion') || params.includes('forced-colors') || params.includes('prefers-contrast')) {
        return true;
      }
    }
    parent = parent.parent;
  }
  return false;
}

/**
 * Audits CSS content against Wallace invariants and Studio DNA Engine constraints.
 *
 * @param {string} cssContent Raw CSS stylesheet string
 * @param {object} [options]
 * @param {number} [options.maxSelectorComplexity=5]
 * @param {number} [options.minDeclarationUniquenessRatio=0.66]
 * @param {number} [options.maxUniqueColors]
 * @param {number} [options.maxUniqueFontSizes]
 * @param {string} [options.filePath]
 * @returns {{ valid: boolean, metrics: object, violations: Array<object> }}
 */
function analyzeCssWallaceInvariants(cssContent, options = {}) {
  const violations = [];
  const metrics = {
    totalRules: 0,
    totalDeclarations: 0,
    uniqueDeclarationsCount: 0,
    declarationUniquenessRatio: 1.0,
    uniqueColors: [],
    uniqueFontSizes: [],
    maxComplexityFound: 0
  };

  if (!cssContent || typeof cssContent !== 'string' || cssContent.trim() === '') {
    return { valid: true, metrics, violations };
  }

  const maxSelectorComplexity = options.maxSelectorComplexity !== undefined ? options.maxSelectorComplexity : 5;
  const minDeclarationUniquenessRatio = options.minDeclarationUniquenessRatio !== undefined ? options.minDeclarationUniquenessRatio : 0.66;
  const maxUniqueColors = options.maxUniqueColors;
  const maxUniqueFontSizes = options.maxUniqueFontSizes;

  // 1. Donut Scope Invariant Check
  const donutCheck = validateDonutScopeInvariants(cssContent);
  if (!donutCheck.compliant) {
    for (const v of donutCheck.violations) {
      violations.push({
        type: 'donut-piercing',
        message: v,
        suggestion: 'Ensure selectors within @scope (.kinetic-stage) to ([data-kinetic-slot]) do not penetrate slot boundaries.'
      });
    }
  }

  // Parse CSS with PostCSS
  let root;
  try {
    root = postcss.parse(cssContent);
  } catch (err) {
    violations.push({
      type: 'css-parse-error',
      message: `CSS syntax parse error: ${err.message}`,
      line: err.line || 1
    });
    return { valid: false, metrics, violations };
  }

  const declarationsList = [];
  const declaredVariables = new Map(); // varName -> line
  const usedVariables = new Set();
  const selectorMap = new Map(); // selector -> count
  const colorsSet = new Set();
  const fontSizesSet = new Set();

  // 2. Walk AST
  root.walk(node => {
    // Check rules
    if (node.type === 'rule') {
      metrics.totalRules++;
      const selector = node.selector.trim();
      const line = node.source?.start?.line || 1;

      // Duplicate selector detection (at same scope level)
      const count = selectorMap.get(selector) || 0;
      selectorMap.set(selector, count + 1);
      if (count === 1) {
        violations.push({
          type: 'duplicate-selector',
          line,
          selector,
          message: `Duplicate selector '${selector}' detected on line ${line}. Consolidate declarations into a single rule.`,
          suggestion: 'Consolidate multiple rules for the same selector.'
        });
      }

      // Selector complexity check
      const complexity = calculateSelectorComplexity(selector);
      if (complexity > metrics.maxComplexityFound) {
        metrics.maxComplexityFound = complexity;
      }
      if (complexity > maxSelectorComplexity) {
        violations.push({
          type: 'max-selector-complexity',
          line,
          selector,
          complexity,
          maxAllowed: maxSelectorComplexity,
          message: `Selector '${selector}' has complexity ${complexity}, which exceeds maximum allowable complexity of ${maxSelectorComplexity}.`,
          suggestion: 'Refactor selector into flatter utility classes or BEM naming.'
        });
      }
    }

    // Check declarations
    if (node.type === 'decl') {
      metrics.totalDeclarations++;
      const prop = node.prop.trim();
      const value = node.value.trim();
      const line = node.source?.start?.line || 1;

      declarationsList.push({ prop, value });

      // Check !important outside accessibility utilities
      if (node.important) {
        const isA11y = isInsideAccessibilityAtRule(node);
        if (!isA11y) {
          const ruleSelector = node.parent && node.parent.type === 'rule' ? node.parent.selector : 'at-rule';
          violations.push({
            type: 'banned-important',
            line,
            selector: ruleSelector,
            prop,
            value,
            message: `!important is prohibited outside accessibility utilities (prefers-reduced-motion). Found at selector: '${ruleSelector}', declaration: '${prop}: ${value} !important'`,
            suggestion: 'Remove !important and resolve specificity via Cascade Layers (@layer) or @scope.'
          });
        }
      }

      // Track CSS variables
      if (prop.startsWith('--')) {
        declaredVariables.set(prop, line);
      }

      // Track variable usage
      let varMatch;
      const varUsageRegex = new RegExp(VAR_USAGE_REGEX);
      while ((varMatch = varUsageRegex.exec(value)) !== null) {
        usedVariables.add(varMatch[1]);
      }

      // Track font sizes
      if (prop.toLowerCase() === 'font-size') {
        fontSizesSet.add(value.toLowerCase());
      }

      // Track colors
      const hexes = value.match(HEX_COLOR_REGEX);
      if (hexes) {
        for (const h of hexes) colorsSet.add(h.toLowerCase());
      }
      const funcColors = value.match(FUNCTIONAL_COLOR_REGEX);
      if (funcColors) {
        for (const fc of funcColors) colorsSet.add(fc.toLowerCase());
      }
    }
  });

  // 3. Compute declaration uniqueness ratio
  metrics.uniqueDeclarationsCount = new Set(declarationsList.map(d => `${d.prop}:${d.value}`)).size;
  metrics.declarationUniquenessRatio = calculateDeclarationUniquenessRatio(declarationsList);

  if (metrics.declarationUniquenessRatio < minDeclarationUniquenessRatio && metrics.totalDeclarations >= 4) {
    violations.push({
      type: 'min-declaration-uniqueness-ratio',
      ratio: metrics.declarationUniquenessRatio,
      threshold: minDeclarationUniquenessRatio,
      message: `Declaration uniqueness ratio ${metrics.declarationUniquenessRatio.toFixed(2)} is below minimum threshold ${minDeclarationUniquenessRatio}.`,
      suggestion: 'Consolidate repetitive declaration sets into shared utility classes or variables.'
    });
  }

  // 4. Token Budgets
  metrics.uniqueColors = Array.from(colorsSet);
  metrics.uniqueFontSizes = Array.from(fontSizesSet);

  if (maxUniqueColors !== undefined && metrics.uniqueColors.length > maxUniqueColors) {
    violations.push({
      type: 'max-unique-colors',
      count: metrics.uniqueColors.length,
      maxAllowed: maxUniqueColors,
      message: `Unique colors count (${metrics.uniqueColors.length}) exceeds budget of ${maxUniqueColors}.`,
      suggestion: 'Reduce palette fragmentation by reusing designated design tokens.'
    });
  }

  if (maxUniqueFontSizes !== undefined && metrics.uniqueFontSizes.length > maxUniqueFontSizes) {
    violations.push({
      type: 'max-unique-font-sizes',
      count: metrics.uniqueFontSizes.length,
      maxAllowed: maxUniqueFontSizes,
      message: `Unique font sizes count (${metrics.uniqueFontSizes.length}) exceeds budget of ${maxUniqueFontSizes}.`,
      suggestion: 'Align font sizes to the modular typographic scale defined in brand-spec.json.'
    });
  }

  // 5. Orphan CSS Variables Check
  // Check for undefined custom properties
  for (const usedVar of usedVariables) {
    if (!declaredVariables.has(usedVar)) {
      violations.push({
        type: 'undefined-custom-property',
        variable: usedVar,
        message: `Custom property '${usedVar}' is used via var() but never declared in the stylesheet.`,
        suggestion: `Declare '${usedVar}' in :root or ensure the design token provider imports it.`
      });
    }
  }

  // Check for declared but unused custom properties
  for (const [declaredVar, line] of declaredVariables.entries()) {
    if (!usedVariables.has(declaredVar)) {
      violations.push({
        type: 'unused-custom-property',
        line,
        variable: declaredVar,
        message: `Custom property '${declaredVar}' is declared on line ${line} but never consumed.`,
        suggestion: `Remove orphan variable '${declaredVar}' or wire it to a CSS declaration.`
      });
    }
  }

  return {
    valid: violations.length === 0,
    metrics,
    violations
  };
}

module.exports = {
  calculateSelectorComplexity,
  calculateDeclarationUniquenessRatio,
  analyzeCssWallaceInvariants
};
