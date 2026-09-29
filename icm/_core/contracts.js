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

/**
 * Validador formal do Capability Graph
 */
function validateCapabilityGraph(capabilities) {
  if (!capabilities || typeof capabilities !== 'object' || Array.isArray(capabilities)) {
    return { valid: false, error: 'capabilities deve ser um objeto' };
  }
  for (const [key, cap] of Object.entries(capabilities)) {
    if (!cap || typeof cap !== 'object') {
      return { valid: false, error: `Capability '${key}' deve ser um objeto` };
    }
    if (typeof cap.active !== 'boolean') {
      return { valid: false, error: `Capability '${key}.active' deve ser booleano` };
    }
    if (typeof cap.confidence !== 'number' || cap.confidence < 0.0 || cap.confidence > 1.0) {
      return { valid: false, error: `Capability '${key}.confidence' deve ser um número entre 0.0 e 1.0` };
    }
  }
  return { valid: true };
}

/**
 * Validador formal do DNA Intermediate Representation (DNA-IR)
 */
function validateDnaIr(ir) {
  if (!ir || typeof ir !== 'object' || Array.isArray(ir)) {
    return { valid: false, error: 'DNA IR deve ser um objeto JSON' };
  }

  const required = [
    'schemaVersion',
    'specimen',
    'capabilities',
    'sections',
    'parameters',
    'bindings',
    'constraints',
    'invariants'
  ];

  for (const field of required) {
    if (ir[field] === undefined) {
      return { valid: false, error: `Campo obrigatório ausente: '${field}'` };
    }
  }

  if (typeof ir.schemaVersion !== 'string' || !/^\d+\.\d+\.\d+$/.test(ir.schemaVersion)) {
    return { valid: false, error: 'schemaVersion inválido, esperado semver (ex: "0.1.0")' };
  }

  if (typeof ir.specimen !== 'string' || !ir.specimen.trim()) {
    return { valid: false, error: 'specimen deve ser uma string identificadora' };
  }

  // Validação de Capabilities
  const capResult = validateCapabilityGraph(ir.capabilities);
  if (!capResult.valid) return capResult;

  if (!Array.isArray(ir.sections)) {
    return { valid: false, error: 'sections deve ser um array' };
  }

  if (!Array.isArray(ir.parameters)) {
    return { valid: false, error: 'parameters deve ser um array' };
  }

  const coupledPattern = /(threejs|three\.js|gsap|spline|react|vue)/i;
  const validCategories = new Set(['geometry', 'typography', 'surface', 'motion', 'content', 'composition', 'interaction', 'audio', 'responsive', 'performance']);
  const validTypes = new Set(['FontSpec', 'ColorHex', 'ColorGradient', 'NumberRange', 'LengthClamp', 'TokenRef', 'AssetRef', 'FrequencyHz', 'StringText', 'Boolean', 'Enum']);
  const validMutabilities = new Set(['invariant', 'mutable', 'derived', 'locked']);

  for (const param of ir.parameters) {
    if (!param.id || !param.category || !param.type || param.value === undefined || !param.mutability) {
      return { valid: false, error: `Parâmetro inválido ou incompleto: ${param.id || 'desconhecido'}` };
    }
    if (coupledPattern.test(param.id)) {
      return { valid: false, error: `Canonical parameter ID '${param.id}' must be framework-neutral and cannot contain implementation library names` };
    }
    if (!validCategories.has(param.category)) {
      return { valid: false, error: `Categoria '${param.category}' inválida no parâmetro '${param.id}'` };
    }
    if (!validTypes.has(param.type)) {
      return { valid: false, error: `Tipo '${param.type}' inválido no parâmetro '${param.id}'` };
    }
    if (!validMutabilities.has(param.mutability)) {
      return { valid: false, error: `Mutabilidade '${param.mutability}' inválida no parâmetro '${param.id}'` };
    }
    if (param.confidence !== undefined && (typeof param.confidence !== 'number' || param.confidence < 0 || param.confidence > 1)) {
      return { valid: false, error: `Confidence fora dos limites (0.0..1.0) no parâmetro '${param.id}'` };
    }
  }

  if (!Array.isArray(ir.bindings)) {
    return { valid: false, error: 'bindings deve ser um array' };
  }

  const validAdapters = new Set(['css', 'dom', 'three', 'gsap', 'audio', 'shader', 'generic-js']);
  for (const binding of ir.bindings) {
    if (!binding.paramId || !binding.adapter || !binding.target || !binding.property) {
      return { valid: false, error: `Binding incompleto para '${binding.paramId || 'desconhecido'}'` };
    }
    if (!validAdapters.has(binding.adapter)) {
      return { valid: false, error: `Adapter '${binding.adapter}' inválido no binding de '${binding.paramId}'` };
    }
  }

  if (!Array.isArray(ir.constraints)) {
    return { valid: false, error: 'constraints deve ser um array' };
  }

  const validConstraintTypes = new Set(['hard', 'adaptive', 'invariant']);
  for (const c of ir.constraints) {
    if (!c.id || !c.type || !c.source || !c.target || !c.rule) {
      return { valid: false, error: `Constraint incompleta '${c.id || 'desconhecida'}'` };
    }
    if (!validConstraintTypes.has(c.type)) {
      return { valid: false, error: `Tipo de constraint '${c.type}' inválido em '${c.id}'` };
    }
  }

  if (!Array.isArray(ir.invariants)) {
    return { valid: false, error: 'invariants deve ser um array' };
  }

  for (const inv of ir.invariants) {
    if (!inv.id || !inv.description) {
      return { valid: false, error: `Invariant incompleta '${inv.id || 'desconhecida'}'` };
    }
  }

  return { valid: true };
}

module.exports = {
  STAGES,
  STAGE_CONTRACTS,
  validateCapabilityGraph,
  validateDnaIr
};

