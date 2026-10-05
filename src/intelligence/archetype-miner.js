/**
 * Archetype Mining Engine
 * Clusteriza instâncias de ComponentDNA e induz Arquétipos Canônicos.
 */

const { SimilarityEngine } = require('./similarity-engine');

class ArchetypeMiner {
  constructor() {
    this.similarityEngine = new SimilarityEngine();
  }

  /**
   * Executa a clusterização de componentes baseada em corte de similaridade
   * @param {any[]} dnas
   * @param {number} similarityThreshold
   */
  mineArchetypesFromCorpus(dnas = [], similarityThreshold = 0.75) {
    const visited = new Set();
    const clusters = [];

    for (let i = 0; i < dnas.length; i++) {
      const target = dnas[i];
      const targetId = target.identity?.id || `comp-${i}`;
      if (visited.has(targetId)) continue;

      const currentClusterMembers = [target];
      visited.add(targetId);

      for (let j = i + 1; j < dnas.length; j++) {
        const candidate = dnas[j];
        const candidateId = candidate.identity?.id || `comp-${j}`;
        if (visited.has(candidateId)) continue;

        const similarity = this.similarityEngine.computeCompositeSimilarity(target, candidate);
        if (similarity >= similarityThreshold) {
          currentClusterMembers.push(candidate);
          visited.add(candidateId);
        }
      }

      if (currentClusterMembers.length >= 2) {
        clusters.push(this.induceArchetype(currentClusterMembers));
      }
    }

    return clusters;
  }

  /**
   * Indução de Arquétipo Canônico: separa o que é núcleo obrigatório de slots opcionais
   * @param {any[]} members
   */
  induceArchetype(members) {
    const roleOccurrences = new Map();
    const stateOccurrences = new Map();

    for (const member of members) {
      const roles = this.extractAllRoles(member.anatomy);
      roles.forEach((r) => roleOccurrences.set(r, (roleOccurrences.get(r) || 0) + 1));

      const states = member.stateMachine?.states || [];
      states.forEach((s) => stateOccurrences.set(s, (stateOccurrences.get(s) || 0) + 1));
    }

    const total = members.length;
    const coreMandatoryRoles = [];
    const optionalSlots = [];

    roleOccurrences.forEach((count, role) => {
      if (count / total >= 0.8) {
        coreMandatoryRoles.push(role);
      } else {
        optionalSlots.push(role);
      }
    });

    const sharedStates = [];
    stateOccurrences.forEach((count, state) => {
      if (count / total >= 0.7) sharedStates.push(state);
    });

    const exemplar = members[0];
    return {
      clusterId: `cluster-${Date.now().toString(36)}`,
      exemplarDnaId: exemplar.identity?.id,
      memberDnaIds: members.map((m) => m.identity?.id),
      meanSimilarity: 0.85,
      inducedArchetype: {
        suggestedName: exemplar.identity?.suggestedArchetype || 'CompositeArchetype',
        coreMandatoryRoles,
        optionalSlots,
        sharedStates
      }
    };
  }

  extractAllRoles(anatomyNode) {
    if (!anatomyNode) return [];
    const roles = [anatomyNode.rootRole || anatomyNode.role || 'Root'];
    const children = anatomyNode.subcomponents || anatomyNode.children || [];
    for (const sub of children) {
      roles.push(...this.extractAllRoles(sub));
    }
    return roles;
  }
}

module.exports = { ArchetypeMiner };
