/**
 * STUDIO DNA ENGINE — Mutation Resolver & Locality Analyzer
 * Resolves declarative localized edits, validates mutation budgets, and ensures high locality score (L >= 0.70).
 */

const { ConstraintEngine } = require('../constraints/engine.js');

/**
 * Validates a proposed mutation list against a locality budget
 * @param {Array<{ paramId: string, section?: string, targetValue?: any }>} deltas
 * @param {{ maxChangedParams?: number, maxSectionsTouched?: number }} budget
 * @returns {{ valid: boolean, code?: string, reason?: string }}
 */
function validateMutationBudget(deltas, budget = {}) {
  const maxChangedParams = budget.maxChangedParams !== undefined ? budget.maxChangedParams : 5;
  const maxSectionsTouched = budget.maxSectionsTouched !== undefined ? budget.maxSectionsTouched : 2;

  if (!Array.isArray(deltas) || deltas.length === 0) {
    return { valid: true };
  }

  if (deltas.length > maxChangedParams) {
    return {
      valid: false,
      code: 'BUDGET_EXCEEDED',
      reason: `Proposal exceeds maxChangedParams budget: requested ${deltas.length}, max permitted ${maxChangedParams}`
    };
  }

  const sectionsTouched = new Set();
  deltas.forEach(d => {
    if (d.section) {
      sectionsTouched.add(d.section);
    } else if (d.paramId) {
      const parts = d.paramId.split('.');
      if (parts.length > 1) sectionsTouched.add(parts[0]);
    }
  });

  if (sectionsTouched.size > maxSectionsTouched) {
    return {
      valid: false,
      code: 'BUDGET_EXCEEDED',
      reason: `Proposal exceeds maxSectionsTouched: touches ${sectionsTouched.size} sections (max permitted ${maxSectionsTouched}): ${Array.from(sectionsTouched).join(', ')}`
    };
  }

  return { valid: true };
}

/**
 * Computes Edit Locality Score L = 1 - (affectedNodes / totalNodes)
 * @param {number} affectedNodesCount
 * @param {number} totalNodesCount
 * @param {number} threshold
 * @returns {{ score: number, isLocal: boolean, affectedNodesCount: number, totalNodesCount: number }}
 */
function computeLocalityScore(affectedNodesCount, totalNodesCount, threshold = 0.70) {
  if (totalNodesCount <= 0) {
    return { score: 1.0, isLocal: true, affectedNodesCount, totalNodesCount };
  }
  const ratio = affectedNodesCount / totalNodesCount;
  const score = Math.max(0, Math.min(1.0, 1.0 - ratio));
  const rounded = Number(score.toFixed(2));
  return {
    score: rounded,
    isLocal: rounded >= threshold,
    affectedNodesCount,
    totalNodesCount
  };
}

/**
 * Mutation Resolver
 */
class MutationResolver {
  constructor(dnaIr) {
    this.dnaIr = dnaIr;
    this.engine = new ConstraintEngine();
  }

  /**
   * Resolves a mutation proposal against current DNA IR
   * @param {Object} state - Target DNA IR state
   * @param {Object} mutationPayload - Delta payload
   * @returns {{ valid: boolean, draftState: Object, compensations: Array, error?: string }}
   */
  resolve(state, mutationPayload) {
    const deltas = mutationPayload.deltas || [];
    const invariants = state.invariants || [];

    // 1. Check if any delta attacks an invariant
    for (const delta of deltas) {
      const param = (state.parameters || []).find(p => p.id === delta.paramId);
      if (param && param.mutability === 'immutable') {
        return {
          valid: false,
          error: `Invariant violation: Parameter ${delta.paramId} is immutable and cannot be altered`
        };
      }

      // Check against invariant statements
      for (const inv of invariants) {
        const text = typeof inv === 'string' ? inv : (inv.description || inv.id || '');
        if (text.includes(delta.paramId) && (text.includes('never') || text.includes('lock'))) {
          return {
            valid: false,
            error: `Invariant constraint violation: "${text}" forbids mutating ${delta.paramId}`
          };
        }
      }
      if (mutationPayload.invariants) {
        for (const inv of mutationPayload.invariants) {
          const text = typeof inv === 'string' ? inv : (inv.description || inv.id || '');
          if (text.includes(delta.paramId)) {
            return {
              valid: false,
              error: `Invariant violation: ${text}`
            };
          }
        }
      }
    }

    // 2. Resolve via ConstraintEngine
    const engine = new ConstraintEngine(state);
    const deltaMap = {};
    deltas.forEach(d => {
      deltaMap[d.paramId] = d.value;
    });

    const engineResult = engine.resolveDelta(deltaMap);
    if (!engineResult.valid) {
      return {
        valid: false,
        error: `Constraint engine rejection: ${(engineResult.errors || []).join('; ') || 'Constraint violation'}`
      };
    }

    // 3. Apply deltas to cloned state
    const draftState = JSON.parse(JSON.stringify(state));
    for (const delta of deltas) {
      const p = (draftState.parameters || []).find(x => x.id === delta.paramId);
      if (p) {
        p.value = delta.value;
      }
    }

    return {
      valid: true,
      draftState,
      compensations: engineResult.derivedCompensations || {}
    };
  }
}

module.exports = {
  MutationResolver,
  validateMutationBudget,
  computeLocalityScore
};
