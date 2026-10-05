/**
 * Agente 0: Orchestration Engine
 * Gerencia a máquina de estados do programa, avalia dependências DAG
 * e bloqueia promoções que não cumpram com as evidências exigidas.
 */

class OrchestrationEngine {
  constructor() {
    this.state = {
      currentMilestone: 'M0',
      packages: {},
      blockedReasons: {}
    };
  }

  registerPackage(pkg) {
    this.state.packages[pkg.taskId] = {
      status: 'BLOCKED',
      dependencies: [],
      evidenceRequired: [],
      evidencePaths: [],
      ...pkg
    };
    this.evaluateDAG();
  }

  evaluateDAG() {
    for (const [id, pkg] of Object.entries(this.state.packages)) {
      if (pkg.status === 'DONE') continue;

      const unmetDeps = pkg.dependencies.filter(
        (depId) => this.state.packages[depId]?.status !== 'DONE'
      );

      if (unmetDeps.length === 0) {
        pkg.status = pkg.status === 'IN_PROGRESS' ? 'IN_PROGRESS' : 'READY';
        delete this.state.blockedReasons[id];
      } else {
        pkg.status = 'BLOCKED';
        this.state.blockedReasons[id] = `Aguardando conclusão de dependências: ${unmetDeps.join(', ')}`;
      }
    }
  }

  completePackage(taskId, evidencePaths = []) {
    const pkg = this.state.packages[taskId];
    if (!pkg) throw new Error(`Tarefa ${taskId} não registrada`);

    if (evidencePaths.length < pkg.evidenceRequired.length) {
      this.state.blockedReasons[taskId] = `Evidências insuficientes. Exigidas: ${pkg.evidenceRequired.length}, Fornecidas: ${evidencePaths.length}`;
      return false;
    }

    pkg.status = 'DONE';
    pkg.evidencePaths = evidencePaths;
    this.evaluateDAG();
    return true;
  }

  canPromoteMilestone(milestone) {
    const milestonePkgs = Object.values(this.state.packages).filter((p) => p.milestone === milestone);
    return milestonePkgs.length > 0 && milestonePkgs.every((p) => p.status === 'DONE');
  }

  getStateSnapshot() {
    return JSON.parse(JSON.stringify(this.state));
  }
}

module.exports = { OrchestrationEngine };
