/**
 * Deterministic AST Anti-Slop Transformer (Requirement R4)
 * 
 * Cheerio-based AST transformer enforcing:
 * 1. Zero AI slop keywords (lorem ipsum, chunk cognitivo, metalinguagem, modo auditoria, raio-x, etc.)
 * 2. Zero brand residual leaks from reference sites
 * 3. Zero unmapped {SLOT_...} template placeholders
 * 4. Strict character budgeting: length deviation <= +-15% relative to reference archetype
 * 5. Deterministic AST replacement with 100% preservation of kinetic attributes
 */

'use strict';

const cheerio = require('cheerio');
const crypto = require('node:crypto');

// ============================================================================
// 1. Slop & Brand Leak Banned Patterns
// ============================================================================

const BANNED_SLOP_PATTERNS = [
  /\blorem\s+ipsum\b/i,
  /\bsample\s+text\b/i,
  /\bsua\s+empresa\s+aqui\b/i,
  /\bchunk\s+cognitivo\b/i,
  /\bmetalinguagem\b/i,
  /\bprompt\s+engineering\b/i,
  /\braio-x\b/i,
  /\bmodo\s+auditoria\b/i,
  /\binsert\s+text\b/i,
  /\bplaceholder\s+text\b/i,
  /\bas\s+an\s+ai\b/i,
  /\bchatgpt\b/i,
  /\bseja\s+bem-vindo\s+ao\s+nosso\s+site\b/i
];

const UNFILLED_SLOT_REGEX = /\{SLOT_[A-Z0-9_\-]+\}/g;

// Attributes that must never be stripped during AST transformation
const KINETIC_ATTR_REGEX = /^data-(kinetic|scroll|speed|lag|anchor|deep-scrutiny|stage|scope|slot)/i;

// ============================================================================
// 2. AntiSlopTransformer Class
// ============================================================================

class AntiSlopTransformer {
  /**
   * @param {Object} options
   * @param {Object} [options.brandSpec] Client brand details (brandName, meta, theme)
   * @param {Object} [options.contentSlots] Map of slot IDs to replacement text/html
   * @param {Object} [options.referenceSlots] Reference slot content or lengths for budget calculation
   * @param {Array<string|RegExp>} [options.originalBrandKeywords] Reference brand names to catch leaks
   * @param {number} [options.budgetTolerance] Allowed character deviation (default: 0.15 = +-15%)
   * @param {boolean} [options.strict] Whether budget or slop failures mark passed=false (default: true)
   */
  constructor(options = {}) {
    this.brandSpec = options.brandSpec || {};
    this.contentSlots = options.contentSlots || {};
    this.referenceSlots = options.referenceSlots || {};
    this.originalBrandKeywords = options.originalBrandKeywords || [];
    this.budgetTolerance = options.budgetTolerance !== undefined ? options.budgetTolerance : 0.15;
    this.strict = options.strict !== undefined ? options.strict : true;
  }

  /**
   * Transforms HTML content by injecting slots, stripping brand leaks,
   * detecting slop, verifying character budgets, and checking unfilled placeholders.
   * 
   * @param {string} htmlContent
   * @returns {Object} { html, passed, violations, replacedSlotsCount, stats }
   */
  transform(htmlContent) {
    if (!htmlContent || typeof htmlContent !== 'string') {
      return {
        html: htmlContent || '',
        passed: false,
        violations: ['HTML content is empty or not a string'],
        replacedSlotsCount: 0,
        stats: {
          slopMatches: 0,
          residualMatches: 0,
          unfilledSlots: 0,
          budgetViolations: 0,
          characterDeviations: []
        }
      };
    }

    const violations = [];
    const stats = {
      slopMatches: 0,
      residualMatches: 0,
      unfilledSlots: 0,
      budgetViolations: 0,
      characterDeviations: []
    };

    // Load into Cheerio AST (preserving entities and casing)
    const $ = cheerio.load(htmlContent, {
      decodeEntities: false,
      xmlMode: false
    });

    let replacedSlotsCount = 0;

    // 1. Process and inject content slots
    // Format A: In-DOM placeholders like {SLOT_HERO_TITLE}
    // Format B: Dedicated elements with [data-kinetic-slot="HERO_TITLE"]
    for (const [rawKey, rawValue] of Object.entries(this.contentSlots)) {
      const cleanKey = rawKey.replace(/^SLOT_/, '');
      const placeholderPattern = new RegExp(`\\{SLOT_${cleanKey}\\}`, 'g');
      const replacementStr = typeof rawValue === 'string' ? rawValue : JSON.stringify(rawValue);

      // Check character budget for this slot
      this._evaluateSlotBudget(cleanKey, replacementStr, stats, violations);

      // Replace in text nodes & attributes
      let matchedInDoc = false;

      // Replace in data-kinetic-slot elements
      const slotElement = $(`[data-kinetic-slot="${cleanKey}"], [data-kinetic-slot="${rawKey}"]`);
      if (slotElement.length > 0) {
        slotElement.each((_, el) => {
          const $el = $(el);
          // Preserve all existing kinetic attributes
          const preservedAttrs = {};
          for (const attr of Object.keys(el.attribs || {})) {
            if (KINETIC_ATTR_REGEX.test(attr)) {
              preservedAttrs[attr] = el.attribs[attr];
            }
          }

          // If content contains tags, set html; otherwise set text
          if (/<[a-z][\s\S]*>/i.test(replacementStr)) {
            $el.html(replacementStr);
          } else {
            $el.text(replacementStr);
          }

          // Restore preserved attributes
          for (const [k, v] of Object.entries(preservedAttrs)) {
            $el.attr(k, v);
          }
          $el.attr('data-kinetic-slot-transmuted', 'true');
        });
        matchedInDoc = true;
        replacedSlotsCount++;
      }

      // Replace in raw text nodes containing {SLOT_...}
      $('*').contents().each((_, node) => {
        if (node.nodeType === 3 && node.data && placeholderPattern.test(node.data)) {
          node.data = node.data.replace(placeholderPattern, replacementStr);
          matchedInDoc = true;
          replacedSlotsCount++;
        }
      });

      // Replace in attributes (title, alt, aria-label, etc.)
      $('*').each((_, el) => {
        for (const [attrName, attrVal] of Object.entries(el.attribs || {})) {
          if (typeof attrVal === 'string' && placeholderPattern.test(attrVal)) {
            $(el).attr(attrName, attrVal.replace(placeholderPattern, replacementStr));
            matchedInDoc = true;
          }
        }
      });
    }

    // 2. Deterministic Brand Residual Replacement & Leak Detection
    if (this.brandSpec.brandName && this.originalBrandKeywords.length > 0) {
      this._replaceAndDetectBrandResiduals($, stats, violations);
    }

    // 3. Scan for banned AI Slop patterns in rendered text and attributes
    this._scanForSlopPatterns($, stats, violations);

    // 4. Scan for any remaining unfilled {SLOT_...} placeholders
    this._scanForUnfilledSlots($, stats, violations);

    const transformedHtml = $.html();

    const passed = violations.length === 0;

    return {
      html: transformedHtml,
      passed,
      violations,
      replacedSlotsCount,
      stats
    };
  }

  /**
   * Non-mutating audit on HTML content.
   */
  audit(htmlContent) {
    return this.transform(htmlContent);
  }

  // ==========================================================================
  // Private Helper Methods
  // ==========================================================================

  /**
   * Evaluates character budget compliance (deviation <= +-15%).
   */
  _evaluateSlotBudget(slotKey, actualContent, stats, violations) {
    let targetLength = null;

    // Check referenceSlots
    if (this.referenceSlots[slotKey] !== undefined) {
      const ref = this.referenceSlots[slotKey];
      targetLength = typeof ref === 'number' ? ref : (typeof ref === 'string' ? ref.length : null);
    } else if (this.referenceSlots[`SLOT_${slotKey}`] !== undefined) {
      const ref = this.referenceSlots[`SLOT_${slotKey}`];
      targetLength = typeof ref === 'number' ? ref : (typeof ref === 'string' ? ref.length : null);
    }

    if (targetLength !== null && targetLength > 0) {
      const actualLen = actualContent.length;
      const deviation = Math.abs(actualLen - targetLength) / targetLength;
      const deviationPercent = Math.round(deviation * 1000) / 10; // e.g. 14.5%

      stats.characterDeviations.push({
        slotId: slotKey,
        target: targetLength,
        actual: actualLen,
        deviationPercent
      });

      if (deviation > this.budgetTolerance) {
        stats.budgetViolations++;
        const msg = `Character budget violation on slot '${slotKey}': target=${targetLength}, actual=${actualLen}, deviation=${deviationPercent}% (allowed +- ${Math.round(this.budgetTolerance * 100)}%)`;
        violations.push(msg);
      }
    }
  }

  /**
   * Deterministically replaces reference brand keywords and flags residual leaks.
   */
  _replaceAndDetectBrandResiduals($, stats, violations) {
    const targetBrand = this.brandSpec.brandName;

    for (const kw of this.originalBrandKeywords) {
      const escapedKw = typeof kw === 'string' ? kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : kw.source;
      const regex = new RegExp(`\\b${escapedKw}\\b`, 'gi');

      // Check text nodes in body, title, meta
      $('body, head title, meta[name="description"]').each((_, container) => {
        $(container).find('*').addBack().contents().each((_, node) => {
          if (node.nodeType === 3 && node.data && regex.test(node.data)) {
            // Replace with target brand
            node.data = node.data.replace(regex, targetBrand);
            stats.residualMatches++;
          }
        });
      });

      // Check image alt and title attributes
      $('img[alt], [title], [aria-label]').each((_, el) => {
        const alt = $(el).attr('alt');
        if (alt && regex.test(alt)) {
          $(el).attr('alt', alt.replace(regex, targetBrand));
          stats.residualMatches++;
        }
        const title = $(el).attr('title');
        if (title && regex.test(title)) {
          $(el).attr('title', title.replace(regex, targetBrand));
          stats.residualMatches++;
        }
      });
    }

    // Secondary verification: verify no residual leaked in visible headings
    for (const kw of this.originalBrandKeywords) {
      const escapedKw = typeof kw === 'string' ? kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : kw.source;
      const strictRegex = new RegExp(`\\b${escapedKw}\\b`, 'i');

      $('h1, h2, h3, h4, h5, h6, title').each((_, el) => {
        const text = $(el).text();
        if (strictRegex.test(text)) {
          stats.residualMatches++;
          violations.push(`Brand residual leak detected in heading <${el.tagName}>: contains reference '${kw}'`);
        }
      });
    }
  }

  /**
   * Scans text nodes and visible elements for AI slop patterns.
   */
  _scanForSlopPatterns($, stats, violations) {
    // Collect all visible text nodes
    $('body, head title, meta[name="description"]').each((_, container) => {
      $(container).find('*').addBack().contents().each((_, node) => {
        if (node.nodeType === 3 && node.data) {
          const text = node.data;
          for (const pattern of BANNED_SLOP_PATTERNS) {
            if (pattern.test(text)) {
              stats.slopMatches++;
              violations.push(`AI slop pattern detected: ${pattern.toString()} found in text: "${text.trim().substring(0, 60)}"`);
            }
          }
        }
      });
    });

    // Also check attributes
    $('*').each((_, el) => {
      for (const [attrName, attrVal] of Object.entries(el.attribs || {})) {
        if (typeof attrVal === 'string' && ['alt', 'title', 'aria-label', 'placeholder'].includes(attrName)) {
          for (const pattern of BANNED_SLOP_PATTERNS) {
            if (pattern.test(attrVal)) {
              stats.slopMatches++;
              violations.push(`AI slop pattern in attribute [${attrName}]: ${pattern.toString()} in "${attrVal.substring(0, 40)}"`);
            }
          }
        }
      }
    });
  }

  /**
   * Scans for unfilled {SLOT_...} tokens.
   */
  _scanForUnfilledSlots($, stats, violations) {
    const rawHtml = $.html();
    let match;
    const regex = new RegExp(UNFILLED_SLOT_REGEX);

    while ((match = regex.exec(rawHtml)) !== null) {
      stats.unfilledSlots++;
      violations.push(`Unfilled template slot placeholder detected: '${match[0]}'`);
    }
  }

  // ==========================================================================
  // Static Utility Methods
  // ==========================================================================

  /**
   * Checks a string for AI slop patterns.
   */
  static checkSlop(text) {
    if (!text || typeof text !== 'string') return { hasSlop: false, matches: [] };
    const matches = [];
    for (const pattern of BANNED_SLOP_PATTERNS) {
      if (pattern.test(text)) {
        matches.push(pattern.toString());
      }
    }
    return {
      hasSlop: matches.length > 0,
      matches
    };
  }

  /**
   * Checks character budget deviation.
   */
  static checkBudget(actualLen, targetLen, tolerance = 0.15) {
    if (!targetLen || targetLen <= 0) return { compliant: true, deviation: 0 };
    const deviation = Math.abs(actualLen - targetLen) / targetLen;
    return {
      compliant: deviation <= tolerance,
      deviation,
      deviationPercent: Math.round(deviation * 1000) / 10,
      minAllowed: Math.round(targetLen * (1 - tolerance)),
      maxAllowed: Math.round(targetLen * (1 + tolerance))
    };
  }

  /**
   * Computes SHA-256 hash for idempotency checking.
   */
  static computeHash(content) {
    return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
  }

  /**
   * Helper to deterministically pad or trim text within +-15% budget.
   */
  static fitToBudget(text, targetLen, tolerance = 0.15) {
    if (!text || !targetLen) return text;
    const minLen = Math.round(targetLen * (1 - tolerance));
    const maxLen = Math.round(targetLen * (1 + tolerance));

    if (text.length > maxLen) {
      // Trim at last word boundary before maxLen
      const trimmed = text.substring(0, maxLen);
      const lastSpace = trimmed.lastIndexOf(' ');
      if (lastSpace > minLen) {
        return trimmed.substring(0, lastSpace);
      }
      return trimmed;
    }

    return text;
  }
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  AntiSlopTransformer,
  BANNED_SLOP_PATTERNS,
  UNFILLED_SLOT_REGEX,
  KINETIC_ATTR_REGEX
};
