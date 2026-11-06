function createBudgetGovernor(runBudget) {
  if (!runBudget || !Number.isFinite(runBudget.maxUsd) || runBudget.maxUsd <= 0) {
    throw new TypeError('runBudget.maxUsd must be a positive number');
  }

  function authorize(node, accumulatedUsage = {}) {
    const reservedUsd = node?.budget?.maxUsd;
    if (!Number.isFinite(reservedUsd) || reservedUsd <= 0) {
      throw new TypeError('node.budget.maxUsd must be a positive number');
    }

    const knownUsd = accumulatedUsage.usd;
    const unknownReservation = accumulatedUsage.reservedUsd || 0;
    const hasUnknownUsage = knownUsd === null || knownUsd === undefined;
    const spentUsd = hasUnknownUsage ? 0 : knownUsd;
    if (!Number.isFinite(spentUsd) || !Number.isFinite(unknownReservation) || unknownReservation < 0) {
      throw new TypeError('accumulated usage must contain finite USD values');
    }

    const remainingUsd = runBudget.maxUsd - spentUsd - unknownReservation;
    if (reservedUsd > remainingUsd) {
      return { allowed: false, reservedUsd, reason: 'NODE_BUDGET_EXCEEDS_REMAINING' };
    }
    return {
      allowed: true,
      reservedUsd,
      reason: hasUnknownUsage ? 'USAGE_UNKNOWN_RESERVE_MAX' : 'BUDGET_OK'
    };
  }

  return { authorize };
}

module.exports = { createBudgetGovernor };
