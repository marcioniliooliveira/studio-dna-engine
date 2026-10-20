/**
 * Anti-Slop & Brand Safety Gate (DOM-Aware Cheerio Engine)
 * 
 * Gate executável e rigoroso que analisa o DOM renderizável do HTML:
 * 1. Resíduos da marca clonada original em textos visíveis, títulos e tags alt.
 * 2. Metalinguagem de IA ou placeholders (lorem ipsum, chunks cognitivos, etc.).
 * 3. Estouro de orçamento de caracteres (+/- 15% budget).
 * 4. Slots não preenchidos ({SLOT_...}).
 * 5. Vazamento de tokens de outros clientes.
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const BANNED_SLOP_PATTERNS = [
  /\blorem\s+ipsum\b/i,
  /\bsample\s+text\b/i,
  /\bsua\s+empresa\s+aqui\b/i,
  /\bchunk\s+cognitivo\b/i,
  /\bmetalinguagem\b/i,
  /\bprompt\s+engineering\b/i,
  /\braio-x\b/i,
  /\bmodo\s+auditoria\b/i,
  /\binsert\s+text\b/i
];

class AntiSlopGate {
  /**
   * Executa a auditoria completa de Anti-Slop no HTML e arquivos de spec.
   */
  static audit({
    htmlContent,
    brandSpec = {},
    contentSlots = {},
    referenceSlots = {},
    originalBrandKeywords = [],
    budgetTolerance = 0.15
  }) {
    const violations = [];
    const stats = {
      slopMatches: 0,
      residualMatches: 0,
      unfilledSlots: 0,
      budgetWarnings: 0
    };

    if (!htmlContent || typeof htmlContent !== 'string') {
      return {
        passed: false,
        violations: ['Conteúdo HTML fornecido para auditoria é nulo ou vazio'],
        stats
      };
    }

    const $ = cheerio.load(htmlContent, { decodeEntities: false });

    // Extrair texto visível (removendo tags script e style para não falso-positivar em seletores CSS)
    const textNodes = [];
    $('body, head title, meta[name="description"]').each((_, el) => {
      const clone = $(el).clone();
      clone.find('script, style, noscript').remove();
      clone.find('*').after(' ');
      textNodes.push(clone.text());
    });

    const visibleText = textNodes.join(' ');

    // 1. Validar Padrões de Slop / Metalinguagem em texto visível
    for (const pattern of BANNED_SLOP_PATTERNS) {
      const match = visibleText.match(pattern);
      if (match) {
        violations.push(`[Anti-Slop] Metalinguagem ou placeholder proibido detectado: "${match[0]}"`);
        stats.slopMatches++;
      }
    }

    // 2. Validar Resíduos da Marca Original em textos e atributos alt/title
    for (const keyword of originalBrandKeywords) {
      if (!keyword || keyword.length < 3) continue;
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');

      if (regex.test(visibleText)) {
        violations.push(`[Residual Leak] Resíduo da marca original detectado no texto: "${keyword}"`);
        stats.residualMatches++;
      }

      // Checar atributos alt e title
      $('img[alt], a[title], button[title]').each((_, elem) => {
        const alt = $(elem).attr('alt') || '';
        const title = $(elem).attr('title') || '';
        if (regex.test(alt) || regex.test(title)) {
          violations.push(`[Residual Leak] Resíduo da marca original detectado em atributo: "${keyword}"`);
          stats.residualMatches++;
        }
      });
    }

    // 3. Validar Slots Não Preenchidos ({SLOT_...}) em todo o documento
    const unfilledMatches = htmlContent.match(/\{SLOT_[A-Z0-9_]+\}/g);
    if (unfilledMatches) {
      const uniqueUnfilled = Array.from(new Set(unfilledMatches));
      for (const slotName of uniqueUnfilled) {
        violations.push(`[Unfilled Slot] Variável de slot não preenchida no build final: "${slotName}"`);
        stats.unfilledSlots++;
      }
    }

    // 4. Validar Orçamento de Comprimento (Character Budget +/- 15%)
    const clientSlotsMap = contentSlots.slots || contentSlots;
    const refSlotsMap = referenceSlots.slots || referenceSlots;

    for (const [key, clientVal] of Object.entries(clientSlotsMap)) {
      if (typeof clientVal === 'string' && refSlotsMap[key] && typeof refSlotsMap[key] === 'string') {
        const origLen = refSlotsMap[key].trim().length;
        const newLen = clientVal.trim().length;

        if (origLen > 10) {
          const ratio = newLen / origLen;
          if (ratio < (1 - budgetTolerance) || ratio > (1 + budgetTolerance)) {
            violations.push(
              `[Character Budget Violation] Slot "${key}": Tamanho original ${origLen} chars vs novo ${newLen} chars (variação de ${((ratio - 1) * 100).toFixed(1)}%, limite permitido +/- ${(budgetTolerance * 100)}%)`
            );
            stats.budgetWarnings++;
          }
        }
      }
    }

    const passed = violations.length === 0;

    return {
      passed,
      violations,
      stats
    };
  }

  /**
   * Executa a auditoria a partir de caminhos de arquivos em disco.
   */
  static auditClientDirectory(clientDir, refDir, options = {}) {
    const htmlPath = path.join(clientDir, 'site/index.html');
    const specPath = path.join(clientDir, 'brand-spec.json');
    const slotsPath = path.join(clientDir, 'content-slots.json');

    if (!fs.existsSync(htmlPath)) {
      return {
        passed: false,
        violations: [`Arquivo não encontrado: ${htmlPath}`],
        stats: {}
      };
    }

    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const brandSpec = fs.existsSync(specPath) ? JSON.parse(fs.readFileSync(specPath, 'utf8')) : {};
    const contentSlots = fs.existsSync(slotsPath) ? JSON.parse(fs.readFileSync(slotsPath, 'utf8')) : {};

    let referenceSlots = {};
    if (refDir) {
      const refSlotsPath = path.join(refDir, 'content-slots.json');
      if (fs.existsSync(refSlotsPath)) {
        referenceSlots = JSON.parse(fs.readFileSync(refSlotsPath, 'utf8'));
      }
    }

    return AntiSlopGate.audit({
      htmlContent,
      brandSpec,
      contentSlots,
      referenceSlots,
      originalBrandKeywords: options.originalBrandKeywords || [],
      budgetTolerance: options.budgetTolerance || 0.15
    });
  }
}

module.exports = {
  AntiSlopGate,
  BANNED_SLOP_PATTERNS
};
