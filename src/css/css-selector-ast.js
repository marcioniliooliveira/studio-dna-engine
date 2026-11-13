/**
 * src/css/css-selector-ast.js
 * 
 * Studio DNA Engine v3.0 — Analytical CSS Selector AST & Donut Scope Micro-Engine
 * Feature: Zero-dependency W3C Selector Parser, Specificity Tuple [a, b, c], and Strict Donut Scope Validator
 * 
 * Capabilities:
 * - Recursive selector tokenizer and AST builder without external dependencies
 * - W3C Selectors Level 3/4 specificity calculation tuple [a, b, c]
 * - Root leak detection (:root, html, body, and unconstrained universal '*')
 * - Donut scope boundary isolation enforcement: @scope ... to ([data-capsule-slot])
 * - Detection of child (>) and descendant (' ') penetrations into slot interior
 * - Permissive boundary self-styling: [data-capsule-slot], [data-capsule-slot]:hover
 * - Preserves backward compatibility with v2.6 research prototype API
 */

'use strict';

/**
 * Splits a selector list by top-level commas, respecting parentheses, brackets, and quotes.
 * 
 * @param {string} str Cleaned selector string
 * @returns {Array<string>}
 */
function splitTopLevelSelectors(str) {
  const parts = [];
  let current = '';
  let inBracket = 0;
  let inParen = 0;
  let inQuote = null;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const prev = i > 0 ? str[i - 1] : '';

    if (inQuote) {
      current += char;
      if (char === inQuote && prev !== '\\') {
        inQuote = null;
      }
    } else if (char === '"' || char === "'") {
      inQuote = char;
      current += char;
    } else if (char === '(') {
      inParen++;
      current += char;
    } else if (char === ')') {
      inParen = Math.max(0, inParen - 1);
      current += char;
    } else if (char === '[') {
      inBracket++;
      current += char;
    } else if (char === ']') {
      inBracket = Math.max(0, inBracket - 1);
      current += char;
    } else if (char === ',' && inBracket === 0 && inParen === 0) {
      if (current.trim()) {
        parts.push(current.trim());
      }
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    parts.push(current.trim());
  }

  return parts;
}

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

  const rawSelectors = splitTopLevelSelectors(clean);
  const parsedSelectors = [];

  for (const sel of rawSelectors) {
    const tokens = [];
    let current = '';
    let inBracket = 0;
    let inParen = 0;
    let inQuote = null;

    for (let i = 0; i < sel.length; i++) {
      const char = sel[i];
      const prev = i > 0 ? sel[i - 1] : '';

      if (inQuote) {
        current += char;
        if (char === inQuote && prev !== '\\') {
          inQuote = null;
        }
      } else if (char === '"' || char === "'") {
        inQuote = char;
        current += char;
      } else if (char === '(') {
        inParen++;
        current += char;
      } else if (char === ')') {
        inParen = Math.max(0, inParen - 1);
        current += char;
      } else if (char === '[') {
        inBracket++;
        current += char;
      } else if (char === ']') {
        inBracket = Math.max(0, inBracket - 1);
        current += char;
      } else if (inBracket === 0 && inParen === 0 && (char === '>' || char === '+' || char === '~')) {
        if (current.trim()) {
          tokens.push({ type: 'compound', value: current.trim() });
        }
        tokens.push({ type: 'combinator', value: char });
        current = '';
      } else if (inBracket === 0 && inParen === 0 && /\s/.test(char)) {
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
 * Extracts functional pseudo-classes with balanced parentheses, tracking quotes and brackets.
 * 
 * @param {string} text
 * @returns {Array<{ start: number, end: number, raw: string, name: string, inner: string }>}
 */
function extractBalancedFunctionalPseudos(text) {
  const results = [];
  let i = 0;
  let inBracket = 0;
  let inQuote = null;

  while (i < text.length) {
    const ch = text[i];
    const prev = i > 0 ? text[i - 1] : '';

    if (inQuote) {
      if (ch === inQuote && prev !== '\\') {
        inQuote = null;
      }
      i++;
      continue;
    }

    if (ch === '"' || ch === "'") {
      inQuote = ch;
      i++;
      continue;
    }

    if (ch === '[') {
      inBracket++;
      i++;
      continue;
    }

    if (ch === ']') {
      inBracket = Math.max(0, inBracket - 1);
      i++;
      continue;
    }

    if (inBracket === 0 && ch === ':') {
      // Skip pseudo-elements (::before, ::after, etc.)
      if (text[i + 1] === ':') {
        i += 2;
        continue;
      }
      const match = text.slice(i).match(/^:([a-zA-Z0-9_-]+)\(/);
      if (match) {
        const start = i;
        const name = match[1];
        let parenDepth = 1;
        let innerBracket = 0;
        let innerQuote = null;
        let j = i + match[0].length;

        while (j < text.length && parenDepth > 0) {
          const pch = text[j];
          const pprev = j > 0 ? text[j - 1] : '';

          if (innerQuote) {
            if (pch === innerQuote && pprev !== '\\') {
              innerQuote = null;
            }
          } else if (pch === '"' || pch === "'") {
            innerQuote = pch;
          } else if (pch === '[') {
            innerBracket++;
          } else if (pch === ']') {
            innerBracket = Math.max(0, innerBracket - 1);
          } else if (innerBracket === 0) {
            if (pch === '(') {
              parenDepth++;
            } else if (pch === ')') {
              parenDepth--;
            }
          }
          j++;
        }

        if (parenDepth === 0) {
          const raw = text.slice(start, j);
          const inner = raw.slice(match[0].length, -1).trim();
          results.push({ start, end: j, raw, name, inner });
          i = j;
          continue;
        }
      }
    }
    i++;
  }
  return results;
}

/**
 * Strips specified functional pseudo-classes (e.g. :has(...), :not(...)) from a compound selector string,
 * taking balanced parentheses and quotes into account.
 * 
 * @param {string} compound
 * @param {Array<string>} pseudoNames Array of pseudo-class names to strip, e.g. ['has', 'not']
 * @returns {string}
 */
function stripFunctionalPseudos(compound, pseudoNames = ['has', 'not']) {
  if (!compound || typeof compound !== 'string') return '';
  const pseudos = extractBalancedFunctionalPseudos(compound);
  if (pseudos.length === 0) return compound;

  let result = compound;
  for (let k = pseudos.length - 1; k >= 0; k--) {
    const fp = pseudos[k];
    if (pseudoNames.includes(fp.name)) {
      result = result.slice(0, fp.start) + ' ' + result.slice(fp.end);
    }
  }
  return result;
}

/**
 * Computes specificity tuple [a, b, c] for a single compound token.
 * 
 * @param {string} compound
 * @returns {[number, number, number]}
 */
function computeCompoundSpecificity(compound) {
  let a = 0;
  let b = 0;
  let c = 0;

  if (!compound || compound === '*' || compound === ':scope') {
    return [0, 0, 0];
  }

  let text = compound;

  // 1. Extract and handle functional pseudo-classes :class(...) with balanced parens FIRST
  const functionalPseudos = extractBalancedFunctionalPseudos(text);
  if (functionalPseudos.length > 0) {
    for (let k = functionalPseudos.length - 1; k >= 0; k--) {
      const fp = functionalPseudos[k];
      if (fp.name === 'where') {
        // :where() adds [0, 0, 0]
      } else if (fp.name === 'not' || fp.name === 'is' || fp.name === 'has') {
        const [ia, ib, ic] = computeSelectorSpecificity(fp.inner);
        a += ia;
        b += ib;
        c += ic;
      } else {
        b += 1;
      }
      text = text.slice(0, fp.start) + ' '.repeat(fp.end - fp.start) + text.slice(fp.end);
    }
  }

  // 2. Extract and count attribute selectors [attr...]
  const attrMatches = text.match(/\[[^\]]+\]/g);
  if (attrMatches) {
    b += attrMatches.length;
    text = text.replace(/\[[^\]]+\]/g, ' ');
  }

  // 3. Extract and count pseudo-elements ::element or legacy :element
  const pseudoElemMatches = text.match(/::[a-zA-Z0-9_-]+|:(?:before|after|first-line|first-letter)\b/g);
  if (pseudoElemMatches) {
    c += pseudoElemMatches.length;
    text = text.replace(/::[a-zA-Z0-9_-]+|:(?:before|after|first-line|first-letter)\b/g, ' ');
  }

  // 4. Simple pseudo-classes :hover, :focus, etc.
  const simplePseudos = text.match(/:[a-zA-Z0-9_-]+/g);
  if (simplePseudos) {
    for (const sp of simplePseudos) {
      if (sp === ':scope') continue;
      b += 1;
    }
    text = text.replace(/:[a-zA-Z0-9_-]+/g, ' ');
  }

  // 5. Extract and count IDs (#id)
  const idMatches = text.match(/#[a-zA-Z0-9_-]+/g);
  if (idMatches) {
    a += idMatches.length;
    text = text.replace(/#[a-zA-Z0-9_-]+/g, ' ');
  }

  // 6. Extract and count classes (.class)
  const classMatches = text.match(/\.[a-zA-Z0-9_-]+/g);
  if (classMatches) {
    b += classMatches.length;
    text = text.replace(/\.[a-zA-Z0-9_-]+/g, ' ');
  }

  // 7. Remaining words are element tag names
  const tagMatches = text.match(/[a-zA-Z0-9_-]+/g);
  if (tagMatches) {
    for (const tag of tagMatches) {
      if (tag !== '*' && tag !== '_') {
        c += 1;
      }
    }
  }

  return [a, b, c];
}

/**
 * Computes the specificity tuple [a, b, c] for an entire selector or selector list.
 * For selector lists, returns the maximum specificity across all branches.
 * 
 * @param {string} selectorText
 * @returns {[number, number, number]}
 */
function computeSelectorSpecificity(selectorText) {
  const ast = parseSelectorAst(selectorText);
  if (ast.selectors.length === 0) return [0, 0, 0];

  let maxTuple = [0, 0, 0];
  let maxWeight = -1;

  for (const sel of ast.selectors) {
    let a = 0;
    let b = 0;
    let c = 0;
    for (const tok of sel.tokens) {
      if (tok.type === 'compound') {
        const [ca, cb, cc] = computeCompoundSpecificity(tok.value);
        a += ca;
        b += cb;
        c += cc;
      }
    }
    const weight = a * 10000 + b * 100 + c;
    if (weight > maxWeight) {
      maxWeight = weight;
      maxTuple = [a, b, c];
    }
  }

  return maxTuple;
}

/**
 * Determines whether a selector leaks to the global document root (:root, html, body)
 * or starts with an unconstrained universal selector '*'.
 * 
 * @param {string} selectorText
 * @param {object} ast
 * @returns {boolean}
 */
function detectRootLeak(selectorText, ast) {
  if (!selectorText || typeof selectorText !== 'string') return false;
  if (!ast || !ast.selectors || ast.selectors.length === 0) {
    ast = parseSelectorAst(selectorText);
  }

  for (const sel of ast.selectors) {
    if (!sel.tokens || sel.tokens.length === 0) continue;

    // 1. Unconstrained universal selector '*' at the beginning of the selector
    const firstTok = sel.tokens[0];
    if (firstTok.type === 'compound') {
      const firstVal = firstTok.value;
      if (firstVal === '*' || /^\*(?:[.#\[:]|$)/.test(firstVal)) {
        return true;
      }
    }

    // 2. Token-aware inspection of compounds
    for (const tok of sel.tokens) {
      if (tok.type !== 'compound') continue;

      const val = tok.value;

      // Check for :root pseudo-class (outside attribute brackets)
      // Strip attribute selectors first so [data-root=":root"] doesn't false-trigger
      const withoutAttrs = val.replace(/\[[^\]]*\]/g, ' ');
      if (/(?:^|[^a-zA-Z0-9_-]):root(?![a-zA-Z0-9_-])/.test(withoutAttrs)) {
        return true;
      }

      // Check if element type/tag selector is 'html' or 'body'
      // A tag selector MUST appear at the beginning of the compound selector (not preceded by . or # or :)
      if (/^(?:html|body)(?:[.#\[:]|$)/.test(val)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Analyzes a CSS selector and returns its AST, W3C specificity [a, b, c], and scope safety contract.
 * 
 * @param {string} selectorText
 * @returns {{ ast: Object, specificity: [number, number, number], hasRootLeak: boolean }}
 */
function parseSelectorContract(selectorText) {
  const ast = parseSelectorAst(selectorText);
  const specificity = computeSelectorSpecificity(selectorText);
  const hasRootLeak = detectRootLeak(selectorText, ast);

  return {
    ast,
    specificity,
    hasRootLeak
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

  const boundaryRegex = new RegExp(`\\[\\s*${boundaryAttr}\\s*(?:[=\\~\\|\\^\\$\\*]?=\\s*[^\\]]*)?\\s*\\]`);

  for (const sel of ast.selectors) {
    if (sel.raw.includes(`:not([${boundaryAttr}] *)`) || sel.raw.includes(`:not([${boundaryAttr}])`)) {
      continue;
    }

    const tokens = sel.tokens;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'compound') {
        // Strip :has(...) and :not(...) arguments before testing boundary attribute
        const strippedValue = stripFunctionalPseudos(tokens[i].value, ['has', 'not']);
        if (boundaryRegex.test(strippedValue)) {
          if (i + 1 < tokens.length) {
            const nextTok = tokens[i + 1];
            if (nextTok.type === 'combinator' && (nextTok.value === ' ' || nextTok.value === '>')) {
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

  const rulePattern = /([^{}]+)\{/g;
  let match;
  while ((match = rulePattern.exec(cleanCss)) !== null) {
    const rawSelector = match[1].trim();
    if (rawSelector.startsWith('@')) continue;

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

/**
 * Validates an entire stylesheet or @scope block against strict donut scope rules:
 * checks for root leaks (:root, html, body, unconstrained *) and slot penetration.
 * 
 * @param {string} cssText Raw CSS stylesheet or @scope block string
 * @param {string} [boundaryAttr='data-capsule-slot'] Slot boundary attribute name
 * @returns {{ valid: boolean, compliant: boolean, violations: Array<{ selector: string, reason: string, line?: number }> }}
 */
function validateStrictDonutScope(cssText, boundaryAttr = 'data-capsule-slot') {
  if (!cssText || typeof cssText !== 'string' || !cssText.trim()) {
    return { valid: true, compliant: true, violations: [] };
  }

  const violations = [];
  const cleanCss = cssText.replace(/\/\*[\s\S]*?\*\//g, '');

  const rulePattern = /([^{}]+)\{/g;
  let match;

  while ((match = rulePattern.exec(cleanCss)) !== null) {
    const rawSelector = match[1].trim();
    if (!rawSelector) continue;

    // Skip at-rule containers like @media, @keyframes, @scope definitions
    if (rawSelector.startsWith('@media') || rawSelector.startsWith('@keyframes') ||
        rawSelector.startsWith('@supports') || rawSelector.startsWith('@container') ||
        rawSelector.startsWith('@scope')) {
      continue;
    }

    const lineNumber = cssText.slice(0, match.index).split('\n').length;
    const branches = splitTopLevelSelectors(rawSelector);

    for (const sel of branches) {
      // 1. Root leakage validation
      const contract = parseSelectorContract(sel);
      if (contract.hasRootLeak) {
        violations.push({
          selector: sel,
          reason: `Root leakage: selector '${sel}' targets global root/html/body or unconstrained universal '*'`,
          line: lineNumber
        });
      }

      // 2. Boundary slot penetration validation
      const slotValidation = validateDonutSelector(sel, boundaryAttr);
      if (!slotValidation.compliant) {
        for (const v of slotValidation.violations) {
          violations.push({
            selector: sel,
            reason: v,
            line: lineNumber
          });
        }
      }

      // Also verify default kinetic slot attribute if different
      if (boundaryAttr !== 'data-kinetic-slot' && sel.includes('data-kinetic-slot')) {
        const kineticValidation = validateDonutSelector(sel, 'data-kinetic-slot');
        if (!kineticValidation.compliant) {
          for (const v of kineticValidation.violations) {
            violations.push({
              selector: sel,
              reason: v,
              line: lineNumber
            });
          }
        }
      }
    }
  }

  const isValid = violations.length === 0;
  return {
    valid: isValid,
    compliant: isValid,
    violations
  };
}

module.exports = {
  parseSelectorContract,
  validateStrictDonutScope,
  parseSelectorAst,
  validateDonutSelector,
  validateDonutScopeInvariants
};
