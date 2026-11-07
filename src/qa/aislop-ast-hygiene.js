'use strict';

/**
 * AI-Slop AST Hygiene (TASK-V3-04)
 * 
 * Static AST and regex hygiene analyzer for frontend source code and inline scripts.
 * Enforces zero-tolerance for:
 * 1. Empty catch blocks: catch (e) {} (silent error swallowing)
 * 2. Truncation and laziness comments: // ... rest of code, /* TODO * /, etc.
 * 3. Duplicate inline SVGs: >= 3 identical inline SVGs (should use <use> / components)
 * 4. High cyclomatic complexity: functions with complexity > 15
 */

const cheerio = require('cheerio');

// Regex patterns for truncation comments
const TRUNCATION_COMMENT_PATTERNS = [
  /\/\/\s*\.\.\.\s*(?:rest|remaining|restando)/i,
  /\/\/\s*(?:rest|remaining)\s+of\s+(?:code|implementation|file)/i,
  /\/\*\s*TODO(?::|\s+implement|\s*\*\/|\s*$).*/i,
  /\/\/\s*TODO\b/i,
  /\/\*\s*(?:rest|remaining)\s+(?:code|implementation)\s+unchanged\s*\*\//i
];

class AISlopAstHygiene {
  /**
   * Audits JavaScript/TypeScript source code.
   * @param {string} sourceCode
   * @param {string} [filePath='anonymous.js']
   * @returns {{ passed: boolean, violations: Array<{ ruleId: string, message: string, file: string, line?: number, snippet?: string }> }}
   */
  static auditSource(sourceCode, filePath = 'anonymous.js') {
    if (!sourceCode || typeof sourceCode !== 'string') {
      return { passed: true, violations: [] };
    }

    const violations = [];
    const lines = sourceCode.split('\n');

    // 1. Detect empty catch blocks
    // Matches catch (...) {} or catch {} with only optional whitespace/comments inside
    const emptyCatchRegex = /catch\s*(?:\([^)]*\))?\s*\{\s*(?:\/\/[^\n]*|\/\*[\s\S]*?\*\/|\s)*\}/g;
    let match;
    while ((match = emptyCatchRegex.exec(sourceCode)) !== null) {
      const lineNo = sourceCode.slice(0, match.index).split('\n').length;
      violations.push({
        ruleId: 'empty-catch-block',
        message: 'Empty catch block detected (silent error swallowing)',
        file: filePath,
        line: lineNo,
        snippet: match[0]
      });
    }

    // 2. Detect truncation comments
    lines.forEach((lineText, idx) => {
      for (const pattern of TRUNCATION_COMMENT_PATTERNS) {
        if (pattern.test(lineText)) {
          violations.push({
            ruleId: 'truncation-comment',
            message: 'AI truncation or unfinished code comment detected: "' + lineText.trim() + '"',
            file: filePath,
            line: idx + 1,
            snippet: lineText.trim()
          });
          break;
        }
      }
    });

    // 3. Detect cyclomatic complexity > 15
    const complexityFindings = this._analyzeCyclomaticComplexity(sourceCode, filePath);
    violations.push(...complexityFindings);

    return {
      passed: violations.length === 0,
      violations
    };
  }

  /**
   * Audits HTML content for inline SVGs and embedded scripts.
   * @param {string} htmlContent
   * @param {string} [filePath='index.html']
   * @returns {{ passed: boolean, violations: Array<{ ruleId: string, message: string, file: string, detail?: string }> }}
   */
  static auditHtml(htmlContent, filePath = 'index.html') {
    if (!htmlContent || typeof htmlContent !== 'string') {
      return { passed: true, violations: [] };
    }

    const violations = [];
    const $ = cheerio.load(htmlContent, { decodeEntities: false });

    // 1. Detect duplicate inline SVGs (>= 3 identical)
    const svgMap = new Map();
    $('svg').each((_, el) => {
      const rawSvg = $(el).html() || '';
      const normalized = rawSvg.replace(/\s+/g, ' ').trim();
      if (normalized.length > 20) {
        const count = (svgMap.get(normalized) || 0) + 1;
        svgMap.set(normalized, count);
      }
    });

    for (const [svgContent, count] of svgMap.entries()) {
      if (count >= 3) {
        violations.push({
          ruleId: 'duplicate-inline-svg',
          message: 'Duplicate inline SVG detected ' + count + ' times; extract into a shared symbol or component',
          file: filePath,
          detail: svgContent.slice(0, 80)
        });
      }
    }

    // 2. Audit embedded <script> tags for code hygiene
    $('script:not([src])').each((_, el) => {
      const scriptCode = $(el).html() || '';
      if (scriptCode.trim().length > 0) {
        const scriptReport = this.auditSource(scriptCode, filePath + ':<script>');
        violations.push(...scriptReport.violations);
      }
    });

    return {
      passed: violations.length === 0,
      violations
    };
  }

  /**
   * Calculates McCabe cyclomatic complexity: 1 + number of branching decision points.
   * Decision points: if, for, while, case, catch, &&, ||, ??, ternary ?
   */
  static _analyzeCyclomaticComplexity(sourceCode, filePath) {
    const findings = [];

    const funcRegex = /(?:function\s+([a-zA-Z0-9_$]+)?\s*\([^)]*\)|(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[a-zA-Z0-9_$]+)\s*=>)\s*\{/g;
    let match;

    while ((match = funcRegex.exec(sourceCode)) !== null) {
      const funcName = match[1] || match[2] || 'anonymous';
      const startIndex = match.index + match[0].length;
      
      let braceDepth = 1;
      let endIndex = startIndex;
      while (braceDepth > 0 && endIndex < sourceCode.length) {
        const char = sourceCode[endIndex];
        if (char === '{') braceDepth++;
        else if (char === '}') braceDepth--;
        endIndex++;
      }

      const body = sourceCode.slice(startIndex, endIndex);
      
      let complexity = 1;
      
      const ifMatches = body.match(/\bif\s*\(/g) || [];
      complexity += ifMatches.length;

      const forMatches = body.match(/\bfor\s*\(/g) || [];
      complexity += forMatches.length;

      const whileMatches = body.match(/\bwhile\s*\(/g) || [];
      complexity += whileMatches.length;

      const caseMatches = body.match(/\bcase\s+[^:]+:/g) || [];
      complexity += caseMatches.length;

      const catchMatches = body.match(/\bcatch\s*(?:\([^)]*\))?\s*\{/g) || [];
      complexity += catchMatches.length;

      const logicalMatches = body.match(/&&|\|\||\?\?/g) || [];
      complexity += logicalMatches.length;

      const ternaryMatches = body.match(/\?(?!\.|\?)[^:]*:/g) || [];
      complexity += ternaryMatches.length;

      if (complexity > 15) {
        const lineNo = sourceCode.slice(0, match.index).split('\n').length;
        findings.push({
          ruleId: 'cyclomatic-complexity',
          message: 'Function "' + funcName + '" has cyclomatic complexity of ' + complexity + ' (threshold: 15)',
          file: filePath,
          line: lineNo,
          complexity
        });
      }
    }

    return findings;
  }
}

module.exports = {
  AISlopAstHygiene,
  TRUNCATION_COMMENT_PATTERNS
};
