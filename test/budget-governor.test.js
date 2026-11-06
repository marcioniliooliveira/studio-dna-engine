const test = require('node:test');
const assert = require('node:assert/strict');
const { createBudgetGovernor } = require('../src/orchestration/budget-governor');

const node = (maxUsd) => ({ budget: { maxUsd, maxAttempts: 1 } });

test('rejects a node whose maximum cost exceeds the remaining run budget', () => {
  const governor = createBudgetGovernor({ maxUsd: 1, maxSolCalls: 1, maxReplans: 0 });

  assert.deepEqual(governor.authorize(node(0.6), { usd: 0.5 }), {
    allowed: false,
    reservedUsd: 0.6,
    reason: 'NODE_BUDGET_EXCEEDS_REMAINING'
  });
});

test('reserves the full node budget when accumulated usage is unknown', () => {
  const governor = createBudgetGovernor({ maxUsd: 1, maxSolCalls: 1, maxReplans: 0 });

  assert.deepEqual(governor.authorize(node(0.6), { usd: null }), {
    allowed: true,
    reservedUsd: 0.6,
    reason: 'USAGE_UNKNOWN_RESERVE_MAX'
  });
});
