const test = require('node:test');
const assert = require('node:assert/strict');
const {
  validateBlueprint,
  BlueprintValidationError
} = require('../src/orchestration/blueprint-validator');

function policy() {
  return {
    allowedTools: new Set(['pipeline.build', 'pipeline.verify']),
    allowedGates: new Set(['core-runtime']),
    runBudgetUsd: 1
  };
}

function validBlueprint() {
  return {
    version: 1,
    runId: 'run-001',
    clientId: 'piloto-elyse-luxe',
    context: [{
      id: 'ctx-dna',
      sha256: 'a'.repeat(64),
      path: 'clientes/piloto-elyse-luxe/DNA.md'
    }],
    nodes: [
      {
        id: 'n1',
        kind: 'extract',
        dependencies: [],
        inputs: ['ctx-dna'],
        outputs: ['facts'],
        paths: ['clientes/piloto-elyse-luxe/content.md'],
        needsInput: false,
        toolLabels: ['pipeline.build'],
        budget: { maxInputTokens: 100, maxOutputTokens: 100, maxUsd: 0.1, maxAttempts: 1 },
        gates: ['core-runtime']
      },
      {
        id: 'n2',
        kind: 'build',
        dependencies: ['n1'],
        inputs: ['ctx-dna'],
        outputs: ['site'],
        paths: ['clientes/piloto-elyse-luxe/site/index.html'],
        needsInput: false,
        toolLabels: ['pipeline.build'],
        budget: { maxInputTokens: 100, maxOutputTokens: 100, maxUsd: 0.1, maxAttempts: 1 },
        gates: ['core-runtime']
      },
      {
        id: 'n3',
        kind: 'verify',
        dependencies: ['n2'],
        inputs: ['ctx-dna'],
        outputs: ['report'],
        paths: ['clientes/piloto-elyse-luxe/reports/quality.json'],
        needsInput: false,
        toolLabels: ['pipeline.verify'],
        budget: { maxInputTokens: 100, maxOutputTokens: 100, maxUsd: 0.1, maxAttempts: 1 },
        gates: ['core-runtime']
      }
    ],
    budget: { maxUsd: 0.5, maxSolCalls: 1, maxReplans: 0 }
  };
}

function violationsFor(blueprint) {
  assert.throws(
    () => validateBlueprint(blueprint, policy()),
    (error) => {
      assert.ok(error instanceof BlueprintValidationError);
      return true;
    }
  );

  try {
    validateBlueprint(blueprint, policy());
  } catch (error) {
    return error.violations;
  }
}

test('rejects every node participating in a dependency cycle', () => {
  const blueprint = validBlueprint();
  blueprint.nodes[0].dependencies = ['n2'];
  blueprint.nodes[1].dependencies = ['n1'];

  const violations = violationsFor(blueprint);

  assert.ok(violations.some((violation) => violation.code === 'DAG_CYCLE'));
});

test('rejects node paths outside the selected client', () => {
  const blueprint = validBlueprint();
  blueprint.nodes[1].paths = ['clientes/outro-cliente/DNA.md'];

  const violations = violationsFor(blueprint);

  assert.ok(violations.some((violation) => violation.code === 'CROSS_CLIENT_INPUT'));
});

test('returns the same valid three-node DAG', () => {
  const blueprint = validBlueprint();

  assert.strictEqual(validateBlueprint(blueprint, policy()), blueprint);
});

test('rejects node budgets that exceed blueprint and policy run budgets', () => {
  const blueprint = validBlueprint();
  blueprint.nodes[0].budget.maxUsd = 0.4;
  blueprint.nodes[1].budget.maxUsd = 0.4;
  blueprint.nodes[2].budget.maxUsd = 0.4;

  const violations = violationsFor(blueprint);

  assert.ok(violations.some((violation) => violation.code === 'RUN_BUDGET_EXCEEDED'));
});
