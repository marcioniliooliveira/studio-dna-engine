/**
 * docs/research/v2.6/reference/css-selector-ast.js
 * 
 * Studio DNA PRO v2.6 — Zero-Dependency Core Reference Micro-Engine
 * Feature: PostCSS Selector AST & Donut Scope Guard (R6.2, Pillar 6, Limitation L7)
 * 
 * Resolves Limitation L7:
 * - Replaces fragile regex checking with a recursive selector tokenizer and AST builder
 * - Catches child combinator piercing: [data-kinetic-slot] > h1 (Test 4.5)
 * - Catches attribute value descendant piercing: [data-kinetic-slot="hero-title"] h1 (Test 4.6)
 * - Permits legitimate boundary self-styling: [data-kinetic-slot], [data-kinetic-slot]:hover
 * - Enforces Theorem 1 (Donut Scope Boundary Isolation)
 * - Zero external dependencies (no postcss-selector-parser required)
 */

'use strict';

/**
 * Parses a CSS selector string into a structured AST.
 * 
 * @param {string} selectorString Raw CSS selector or selector list
 * @returns {{ type: 'selector_list', selectors: Array<{ raw: string, tokens: Array<{ type: 'compound'|'combinator', value: string }> }> }}
 */
function parseSelectorAst(selectorString) {
  if (!selectorString || typeof selectorString !== 'string') {
    return { type: 'selector_list', selectors: [] };
  }

  // Strip CSS comments safely
  const clean = selectorString.replace(/\/\*[\s\S]*?\*\//g, '').trim();
  if (!clean) return { type: 'selector_list', selectors: [] };

  const rawSelectors = clean.split(',').map(s => s.trim()).filter(Boolean);
  const parsedSelectors = [];

  for (const sel of rawSelectors) {
    const tokens = [];
    let current = '';
    let inBracket = 0;

    for (let i = 0; i < sel.length; i++) {
      const char = sel[i];

      if (char === '[') {
        inBracket++;
        current += char;
      } else if (char === ']') {
        inBracket = Math.max(0, inBracket - 1);
        current += char;
      } else if (inBracket === 0 && (char === '>' || char === '+' || char === '~')) {
        if (current.trim()) {
          tokens.push({ type: 'compound', value: current.trim() });
        }
        tokens.push({ type: 'combinator', value: char });
        current = '';
      } else if (inBracket === 0 && /\s/.test(char)) {
        // Lookahead to see if subsequent non-whitespace is an explicit combinator (>, +, ~)
        let j = i;
        while (j < sel.length && /\s/.test(sel[j])) j++;
        if (j < sel.length && (sel[j] === '>' || sel[j] === '+' || sel[j] === '~')) {
          if (current.trim()) {
            tokens.push({ type: 'compound', value: current.trim() });
          }
          current = '';
          i = j - 1;
        } else {
          if (current.trim()) {
            tokens.push({ type: 'compound', value: current.trim() });
            tokens.push({ type: 'combinator', value: ' ' });
            current = '';
          }
          i = j - 1;
        }
      } else {
        current += char;
      }
    }

    if (current.trim()) {
      tokens.push({ type: 'compound', value: current.trim() });
    }

    parsedSelectors.push({
      raw: sel,
      tokens
    });
  }

  return {
    type: 'selector_list',
    selectors: parsedSelectors
  };
}

/**
 * Validates a selector against Donut Scope boundary penetration rules.
 * 
 * @param {string} selectorString Single or comma-separated selector string
 * @param {string} [boundaryAttr='data-kinetic-slot'] The slot boundary attribute
 * @returns {{ compliant: boolean, violations: Array<string> }}
 */
function validateDonutSelector(selectorString, boundaryAttr = 'data-kinetic-slot') {
  if (!selectorString || typeof selectorString !== 'string' || !selectorString.trim()) {
    return { compliant: true, violations: [] };
  }

  const ast = parseSelectorAst(selectorString);
  const violations = [];

  // Match [data-kinetic-slot] with optional attribute value and arbitrary whitespace inside brackets
  const boundaryRegex = new RegExp(`\\[\\s*${boundaryAttr}\\s*(?:[=\\~\\|\\^\\$\\*]?=\\s*[^\\]]*)?\\s*\\]`);

  for (const sel of ast.selectors) {
    // If the entire selector is guarded by a negative isolation guard, it cannot match slot contents
    if (sel.raw.includes(`:not([${boundaryAttr}] *)`) || sel.raw.includes(`:not([${boundaryAttr}])`)) {
      continue;
    }

    const tokens = sel.tokens;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'compound' && boundaryRegex.test(tokens[i].value)) {
        // If compound itself is within a :not(...) guard, skip
        if (tokens[i].value.startsWith(':not(')) continue;

        // Check if followed by descendant (' ') or child ('>') combinator
        if (i + 1 < tokens.length) {
          const nextTok = tokens[i + 1];
          if (nextTok.type === 'combinator' && (nextTok.value === ' ' || nextTok.value === '>')) {
            // Check if there is a subsequent compound targeting elements inside the slot
            if (i + 2 < tokens.length && tokens[i + 2].type === 'compound') {
              violations.push(
                `Donut boundary violation: '${sel.raw}' penetrates slot interior via combinator '${nextTok.value}' into '${tokens[i + 2].value}'`
              );
            }
          }
        }
      }
    }
  }

  return {
    compliant: violations.length === 0,
    violations
  };
}

/**
 * Validates an entire stylesheet string against Donut Scope boundary invariants.
 * 
 * @param {string} cssContent Raw CSS stylesheet string
 * @param {string} [boundaryAttr='data-kinetic-slot'] The slot boundary attribute
 * @returns {{ compliant: boolean, violations: Array<string> }}
 */
function validateDonutScopeInvariants(cssContent, boundaryAttr = 'data-kinetic-slot') {
  const violations = [];
  const cleanCss = (cssContent || '').replace(/\/\*[\s\S]*?\*\//g, '');

  // Extract rule selectors using block matching
  const rulePattern = /([^{}]+)\{/g;
  let match;
  while ((match = rulePattern.exec(cleanCss)) !== null) {
    const rawSelector = match[1].trim();
    if (rawSelector.startsWith('@')) continue; // Skip @media, @keyframes, @scope definitions

    const validation = validateDonutSelector(rawSelector, boundaryAttr);
    if (!validation.compliant) {
      violations.push(...validation.violations);
    }
  }

  return {
    compliant: violations.length === 0,
    violations
  };
}

module.exports = {
  parseSelectorAst,
  validateDonutSelector,
  validateDonutScopeInvariants
};
