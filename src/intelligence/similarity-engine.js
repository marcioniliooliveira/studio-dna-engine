/**
 * Component & Graph Similarity Engine
 * Calcula similaridade anatômica e comportamental entre componentes.
 */

class SimilarityEngine {
  /**
   * Distância de Edição em Árvores Semânticas (Zhang-Shasha simplificado).
   * Retorna índice de 0.0 (disjuntas) a 1.0 (idênticas).
   * @param {{role: string, children?: any[]}} treeA
   * @param {{role: string, children?: any[]}} treeB
   */
  calculateAnatomySimilarity(treeA, treeB) {
    if (!treeA || !treeB) return 0.0;
    const rolesA = this.flattenRoles(treeA);
    const rolesB = this.flattenRoles(treeB);

    const setA = new Set(rolesA);
    const setB = new Set(rolesB);

    const intersection = new Set([...setA].filter((x) => setB.has(x)));
    const union = new Set([...setA, ...setB]);

    if (union.size === 0) return 1.0;

    const jaccard = intersection.size / union.size;
    const rootMatch = treeA.role === treeB.role ? 0.3 : 0.0;

    return Math.min(1.0, Number((jaccard * 0.7 + rootMatch).toFixed(3)));
  }

  /**
   * Similaridade entre Matrizes de Transição de Estado da FSM
   * @param {string[]} statesA
   * @param {string[]} statesB
   */
  calculateStateSimilarity(statesA = [], statesB = []) {
    const setA = new Set(statesA);
    const setB = new Set(statesB);
    const commonStates = [...setA].filter((s) => setB.has(s));
    const maxLen = Math.max(setA.size, setB.size);
    if (maxLen === 0) return 1.0;
    return Number((commonStates.length / maxLen).toFixed(3));
  }

  /**
   * Escore Combinado de Similaridade
   * 60% anatomia estrutural, 40% comportamento operacional
   */
  computeCompositeSimilarity(compA, compB) {
    if (!compA || !compB) return 0.0;
    const sAnatomy = this.calculateAnatomySimilarity(compA.anatomy, compB.anatomy);
    const sState = this.calculateStateSimilarity(
      compA.stateMachine?.states || [],
      compB.stateMachine?.states || []
    );
    return Number((sAnatomy * 0.6 + sState * 0.4).toFixed(3));
  }

  flattenRoles(node) {
    if (!node) return [];
    const roles = [node.role || node.rootRole || 'UnknownRole'];
    const children = node.children || node.subcomponents || [];
    for (const child of children) {
      roles.push(...this.flattenRoles(child));
    }
    return roles;
  }
}

module.exports = { SimilarityEngine };
