/**
 * Hub Reference Adoption Registry
 * Controla o ciclo de vida de adoção de referências externas (ADAPT_REACT, COMPOSE_GENUI, REJECT)
 * exigindo certificação formal pelo UnifiedCRPQualityGates antes da publicação no Hub.
 */

class ReferenceAdoptionRegistry {
  constructor() {
    this.decisions = new Map();
  }

  /**
   * Registra uma decisão de adoção para um componente/arquétipo no Hub
   * @param {{
   *   referenceId: string,
   *   archetypeId: string,
   *   decision: 'ADAPT_REACT' | 'COMPOSE_GENUI' | 'ADAPT_BOTH' | 'REJECT',
   *   certificationRecord: any,
   *   rationale?: string
   * }} payload
   */
  registerAdoptionDecision(payload) {
    if (!payload || !payload.referenceId || !payload.archetypeId || !payload.decision) {
      throw new Error('ReferenceAdoptionRegistry: Payload de adoção incompleto');
    }

    const validDecisions = ['ADAPT_REACT', 'COMPOSE_GENUI', 'ADAPT_BOTH', 'REJECT'];
    if (!validDecisions.includes(payload.decision)) {
      throw new Error(`ReferenceAdoptionRegistry: Decisão inválida (${payload.decision})`);
    }

    const verdict = payload.certificationRecord?.verdict || payload.certificationRecord?.overallVerdict;
    const certId = payload.certificationRecord?.certificateId || payload.certificationRecord?.certificationId || null;

    if (payload.decision !== 'REJECT') {
      if (!payload.certificationRecord || verdict !== 'CERTIFIED') {
        throw new Error(
          `ReferenceAdoptionRegistry: Componente ${payload.referenceId} não possui certificado CERTIFIED válido para adoção no Hub`
        );
      }
    }

    const record = {
      referenceId: payload.referenceId,
      archetypeId: payload.archetypeId,
      decision: payload.decision,
      certificationId: certId,
      overallVerdict: verdict || 'REJECTED',
      rationale: payload.rationale || 'Adoção validada via Clean-Room Pipeline',
      registeredAt: new Date().toISOString()
    };

    this.decisions.set(payload.referenceId, record);
    return record;
  }

  getDecision(referenceId) {
    return this.decisions.get(referenceId) || null;
  }

  listAdoptedComponents() {
    return Array.from(this.decisions.values()).filter((d) => d.decision !== 'REJECT');
  }
}

module.exports = { ReferenceAdoptionRegistry };
