'use strict';

/**
 * Canonical Anti-Slop Dictionaries & Slot Validation Helpers
 *
 * Single source of truth shared across Compiler, QA Gates, CRP Gates, and AST Injectors.
 */

const BANNED_SLOP_PATTERNS = Object.freeze([
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
  /\bseja\s+bem-vindo\s+ao\s+nosso\s+site\b/i,
  /\b(?:não\s+é\s+(?:apenas|só)|não\s+se\s+trata\s+de)\s+[^.,;!?]+,\s*(?:mas\s+sim|é)\b/i,
  /\b(?:it'?s\s+not\s+(?:just|only)|not\s+just)\s+[^.,;!?]+,\s*it'?s\b/i
]);

const UNFILLED_SLOT_REGEX = /\{SLOT_[A-Z0-9_\-]+\}/g;

// Attributes that must never be stripped during AST transformation
const KINETIC_ATTR_REGEX = /^data-(kinetic|scroll|speed|lag|anchor|deep-scrutiny|stage|scope|slot)/i;

/**
 * Returns the first banned slop match in text, or null if clean.
 *
 * @param {string} text
 * @returns {{ matched: string, pattern: RegExp } | null}
 */
function findBannedSlopMatch(text) {
  if (!text || typeof text !== 'string') return null;
  for (const pattern of BANNED_SLOP_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      return { matched: match[0], pattern };
    }
  }
  return null;
}

/**
 * Returns unique unfilled `{SLOT_...}` placeholders found in HTML or text.
 *
 * @param {string} content
 * @returns {string[]}
 */
function findUnfilledSlots(content) {
  if (!content || typeof content !== 'string') return [];
  const matches = content.match(new RegExp(UNFILLED_SLOT_REGEX.source, 'g'));
  return matches ? Array.from(new Set(matches)) : [];
}

module.exports = {
  BANNED_SLOP_PATTERNS,
  UNFILLED_SLOT_REGEX,
  KINETIC_ATTR_REGEX,
  findBannedSlopMatch,
  findUnfilledSlots
};
