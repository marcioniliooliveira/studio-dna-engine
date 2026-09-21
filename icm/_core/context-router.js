/**
 * ICM (Interpretable Context Methodology) — Context Router & Boundary Guard
 * 
 * Garante que agentes e sub-processos leiam apenas os arquivos estritamente autorizados,
 * prevenindo vazamento de contexto entre clientes e evitando consumo excessivo de tokens.
 */

const path = require('path');
const { STAGES, STAGE_CONTRACTS } = require('./contracts');

class ContextRouter {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = path.resolve(projectRoot);
  }

  /**
   * Valida se um conjunto de caminhos de leitura respeita as restrições do estágio.
   */
  validateContextAccess(stageName, filePaths = [], options = {}) {
    const { activeClientSlug, selectedRefSlug } = options;
    const contract = STAGE_CONTRACTS[stageName];

    if (!contract) {
      throw new Error(`[ICM] Estágio desconhecido: "${stageName}"`);
    }

    const violations = [];

    for (const rawPath of filePaths) {
      const normalizedPath = path.relative(this.projectRoot, path.resolve(this.projectRoot, rawPath)).replace(/\\/g, '/');

      // 1. Verificar vazamento entre clientes
      if (normalizedPath.startsWith('clientes/')) {
        const parts = normalizedPath.split('/');
        const clientInPath = parts[1];
        if (activeClientSlug && clientInPath !== activeClientSlug) {
          violations.push(`Cross-client access violado: Tentativa de ler "${normalizedPath}" enquanto o cliente ativo é "${activeClientSlug}"`);
        }
      }

      // 2. Verificar leitura não autorizada de cópias brutas
      if (normalizedPath.startsWith('copias/')) {
        const parts = normalizedPath.split('/');
        const refInPath = parts[1];
        if (selectedRefSlug && refInPath !== selectedRefSlug) {
          violations.push(`Unselected reference access: Tentativa de ler "${normalizedPath}" enquanto a referência ativa é "${selectedRefSlug}"`);
        }
      }

      // 3. Verificar padrões proibidos específicos do contrato
      for (const pattern of contract.forbiddenPatterns || []) {
        if (pattern.test(normalizedPath)) {
          violations.push(`Padrão proibido pelo estágio ${stageName}: "${normalizedPath}"`);
        }
      }
    }

    return {
      allowed: violations.length === 0,
      violations
    };
  }

  /**
   * Retorna os caminhos canônicos e restritos que um estágio deve carregar.
   */
  resolveStageInputs(stageName, options = {}) {
    const { clientSlug, refSlug } = options;

    switch (stageName) {
      case STAGES.STAGE_01_REFERENCE_SELECTION:
        return {
          vaultIndex: 'design-vault/INDEX.json',
          clientBriefing: clientSlug ? `clientes/${clientSlug}/briefing.json` : null
        };

      case STAGES.STAGE_02_BRAND_SPEC:
        return {
          referenceTokens: refSlug ? `design-vault/${refSlug}/tokens.json` : null,
          brandTemplate: refSlug ? `design-vault/${refSlug}/brand-spec.template.json` : null,
          clientSpec: clientSlug ? `clientes/${clientSlug}/brand-spec.json` : null
        };

      case STAGES.STAGE_03_SLOT_COMPOSITION:
        return {
          referenceSlots: refSlug ? `design-vault/${refSlug}/content-slots.json` : null,
          clientBrandSpec: clientSlug ? `clientes/${clientSlug}/brand-spec.json` : null
        };

      case STAGES.STAGE_04_BUILD_COMPILATION:
        return {
          skeletonHtml: refSlug ? `design-vault/${refSlug}/skeleton.html` : null,
          contentSlots: clientSlug ? `clientes/${clientSlug}/content-slots.json` : null,
          brandSpec: clientSlug ? `clientes/${clientSlug}/brand-spec.json` : null,
          targetOutput: clientSlug ? `clientes/${clientSlug}/site/index.html` : null
        };

      case STAGES.STAGE_05_QUALITY_GATE:
        return {
          sitePath: clientSlug ? `clientes/${clientSlug}/site/index.html` : null,
          dnaPath: clientSlug ? `clientes/${clientSlug}/DNA.md` : null
        };

      default:
        throw new Error(`[ICM] Estágio não mapeado: ${stageName}`);
    }
  }
}

module.exports = {
  ContextRouter
};
