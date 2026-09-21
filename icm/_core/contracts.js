/**
 * ICM (Interpretable Context Methodology) — Stage Contracts & Schema Definitions
 * 
 * Este módulo define os contratos formais para cada um dos 5 estágios canônicos.
 * Garante que nenhum agente opere com inputs incompletos ou viole o isolamento de contexto.
 */

const STAGES = {
  STAGE_01_REFERENCE_SELECTION: '01-reference-selection',
  STAGE_02_BRAND_SPEC: '02-brand-spec',
  STAGE_03_SLOT_COMPOSITION: '03-slot-composition',
  STAGE_04_BUILD_COMPILATION: '04-build-compilation',
  STAGE_05_QUALITY_GATE: '05-quality-gate'
};

const STAGE_CONTRACTS = {
  [STAGES.STAGE_01_REFERENCE_SELECTION]: {
    name: 'Seleção de Referência Estrutural',
    requiredInputs: ['briefing'],
    optionalInputs: ['niche', 'targetAudience'],
    forbiddenPatterns: [
      /node_modules/,
      /\.git/,
      /\.env/
    ],
    outputFiles: ['reference-selection.json'],
    validateOutput(data) {
      if (!data || typeof data !== 'object') return { valid: false, error: 'Output deve ser um objeto JSON' };
      if (!data.selectedRefSlug) return { valid: false, error: 'selectedRefSlug é obrigatório' };
      if (typeof data.compatibilityScore !== 'number' || data.compatibilityScore < 0 || data.compatibilityScore > 100) {
        return { valid: false, error: 'compatibilityScore deve ser um número entre 0 e 100' };
      }
      return { valid: true };
    }
  },

  [STAGES.STAGE_02_BRAND_SPEC]: {
    name: 'Especificação de Marca & DNA Lock',
    requiredInputs: ['brandName', 'selectedRefSlug', 'tokens'],
    optionalInputs: ['toneOfVoice', 'niche', 'whatsapp', 'palette'],
    forbiddenPatterns: [
      /node_modules/,
      /\.git/,
      /\.env/
    ],
    outputFiles: ['brand-spec.json', 'DNA.md'],
    validateOutput(data) {
      if (!data || typeof data !== 'object') return { valid: false, error: 'Output deve ser um objeto JSON' };
      if (!data.brandName) return { valid: false, error: 'brandName é obrigatório' };
      if (!data.colors || !data.colors.primary) return { valid: false, error: 'colors.primary é obrigatório' };
      return { valid: true };
    }
  },

  [STAGES.STAGE_03_SLOT_COMPOSITION]: {
    name: 'Composição de Conteúdo & Anti-Slop',
    requiredInputs: ['brandSpec', 'referenceSlots'],
    optionalInputs: ['customCopy'],
    forbiddenPatterns: [
      /node_modules/,
      /\.git/,
      /\.env/
    ],
    outputFiles: ['content-slots.json'],
    validateOutput(data, referenceSlots = {}) {
      if (!data || typeof data !== 'object') return { valid: false, error: 'Output deve ser um objeto JSON de slots' };
      
      const errors = [];
      const slots = data.slots || data;

      // Anti-slop: verificar se há resíduos óbvios ou slots vazios
      for (const [key, value] of Object.entries(slots)) {
        if (typeof value === 'string') {
          if (value.trim().length === 0) {
            errors.push(`Slot vazio detectado: "${key}"`);
          }
          if (/(lorem ipsum|placeholder|sample text|sua empresa aqui)/i.test(value)) {
            errors.push(`Slop/Placeholder detectado no slot "${key}": "${value}"`);
          }
        }
      }

      if (errors.length > 0) {
        return { valid: false, error: errors.join('; ') };
      }

      return { valid: true };
    }
  },

  [STAGES.STAGE_04_BUILD_COMPILATION]: {
    name: 'Compilação Determinística de Artefato',
    requiredInputs: ['skeletonHtmlPath', 'contentSlotsPath', 'brandSpecPath', 'outputPath'],
    optionalInputs: ['options'],
    forbiddenPatterns: [
      /^clientes\/(?!active-client\/).+/
    ],
    outputFiles: ['index.html'],
    validateOutput(outputHtml) {
      if (typeof outputHtml !== 'string' || outputHtml.length < 100) {
        return { valid: false, error: 'Artefato HTML gerado é inválido ou muito curto' };
      }
      if (!outputHtml.includes('<!DOCTYPE html>') && !outputHtml.includes('<html')) {
        return { valid: false, error: 'Artefato HTML gerado não possui estrutura de documento válida' };
      }
      return { valid: true };
    }
  },

  [STAGES.STAGE_05_QUALITY_GATE]: {
    name: 'Quality Gate & Auditoria Independente',
    requiredInputs: ['sitePath'],
    optionalInputs: ['dnaPath'],
    forbiddenPatterns: [],
    outputFiles: ['linter-report.json'],
    validateOutput(report) {
      if (!report || typeof report !== 'object') return { valid: false, error: 'Relatório de auditoria inválido' };
      const jsErrors = report.jsErrors || 0;
      const brokenImages = report.brokenImages || 0;
      
      return {
        valid: jsErrors === 0 && brokenImages === 0,
        passed: jsErrors === 0 && brokenImages === 0,
        jsErrors,
        brokenImages,
        error: (jsErrors > 0 || brokenImages > 0) ? `Quality gate falhou: ${jsErrors} erros JS, ${brokenImages} imagens 404` : null
      };
    }
  }
};

module.exports = {
  STAGES,
  STAGE_CONTRACTS
};
