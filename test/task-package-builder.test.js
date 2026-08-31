const test = require('node:test');
const assert = require('node:assert/strict');
const { buildTaskPackage } = require('../src/execution/task-package-builder');

function blueprint() {
  return {
    runId: 'run-001',
    clientId: 'piloto-elyse-luxe',
    context: [
      { id: 'ctx-dna', sha256: 'a'.repeat(64), path: 'clientes/piloto-elyse-luxe/DNA.md' },
      { id: 'ctx-secret', sha256: 'b'.repeat(64), path: 'clientes/piloto-elyse-luxe/private.md' }
    ],
    conversationHistory: [{ role: 'user', content: 'never disclose this' }],
    nodes: [
      { id: 'extract-facts', outputs: ['facts', 'alpha', 'zeta'] },
      node()
    ]
  };
}

function node() {
  return {
    id: 'build-site',
    kind: 'build',
    nonInteractive: false,
    dependencies: ['extract-facts'],
    inputs: ['ctx-dna'],
    outputs: ['site'],
    paths: ['clientes/piloto-elyse-luxe/site/index.html'],
    toolLabels: ['patch.apply', 'test.focused'],
    gates: ['core-runtime'],
    budget: { maxInputTokens: 100, maxOutputTokens: 50, maxUsd: 0.1, maxAttempts: 2 }
  };
}

test('builds a frozen compact package scoped to one node', () => {
  const plan = blueprint();
  const packageForNode = buildTaskPackage({
    blueprint: plan,
    node: node(),
    artifacts: [{ id: 'facts', sha256: 'c'.repeat(64), nodeId: 'extract-facts' }],
    contextSummary: { ignored: 'the compact wire only carries references' }
  });

  assert.deepEqual(packageForNode, {
    v: 1,
    rid: 'run-001',
    cid: 'piloto-elyse-luxe',
    nid: 'build-site',
    k: 'build',
    ni: false,
    in: [{ id: 'facts', sha: 'c'.repeat(64) }],
    p: ['clientes/piloto-elyse-luxe/site/index.html'],
    out: ['site'],
    tl: ['patch.apply', 'test.focused'],
    g: ['core-runtime'],
    b: { it: 100, ot: 50, usd: 0.1, try: 2 }
  });
  assert.ok(Object.isFrozen(packageForNode));
  assert.ok(Object.isFrozen(packageForNode.in));
  assert.equal(JSON.stringify(packageForNode).includes('conversationHistory'), false);
  assert.equal(JSON.stringify(packageForNode).includes('ctx-secret'), false);
  assert.equal(JSON.stringify(packageForNode).includes('nodes'), false);
});

test('serializes equivalent packages deterministically', () => {
  const plan = blueprint();
  const first = buildTaskPackage({
    blueprint: plan,
    node: node(),
    artifacts: [
      { id: 'zeta', sha256: 'e'.repeat(64) },
      { id: 'alpha', sha256: 'd'.repeat(64) }
    ]
  });
  const second = buildTaskPackage({
    blueprint: structuredClone(plan),
    node: node(),
    artifacts: [
      { id: 'alpha', sha256: 'd'.repeat(64) },
      { id: 'zeta', sha256: 'e'.repeat(64) }
    ]
  });

  assert.equal(JSON.stringify(first), JSON.stringify(second));
});

test('fails closed for paths, artifacts, gates, and attempts outside the node scope', () => {
  const cases = [
    {
      name: 'cross-client path',
      mutate: (current) => { current.paths = ['clientes/outro-cliente/file.js']; },
      code: 'TASK_PACKAGE_PATH_INVALID'
    },
    {
      name: 'undeclared artifact',
      artifacts: [{ id: 'secret', sha256: 'd'.repeat(64) }],
      code: 'TASK_PACKAGE_ARTIFACT_UNDECLARED'
    },
    {
      name: 'empty gates',
      mutate: (current) => { current.gates = []; },
      code: 'TASK_PACKAGE_GATES_INVALID'
    },
    {
      name: 'empty tool allowlist',
      mutate: (current) => { current.toolLabels = []; },
      code: 'TASK_PACKAGE_TOOLS_INVALID'
    },
    {
      name: 'duplicate tool allowlist entry',
      mutate: (current) => { current.toolLabels = ['patch.apply', 'patch.apply']; },
      code: 'TASK_PACKAGE_TOOLS_INVALID'
    },
    {
      name: 'attempt cap',
      mutate: (current) => { current.budget.maxAttempts = 4; },
      code: 'TASK_PACKAGE_BUDGET_INVALID'
    }
  ];

  for (const scenario of cases) {
    const plan = blueprint();
    const current = plan.nodes.find((candidate) => candidate.id === 'build-site');
    scenario.mutate?.(current);
    assert.throws(
      () => buildTaskPackage({
        blueprint: plan,
        node: current,
        artifacts: scenario.artifacts || [{ id: 'facts', sha256: 'c'.repeat(64) }]
      }),
      (error) => error.code === scenario.code,
      scenario.name
    );
  }
});

test('rejects a node that is not bound to the accepted blueprint', () => {
  const plan = blueprint();
  const forged = node();
  forged.toolLabels = ['patch.apply', 'qa.core'];

  assert.throws(
    () => buildTaskPackage({
      blueprint: plan,
      node: forged,
      artifacts: [{ id: 'facts', sha256: 'c'.repeat(64) }]
    }),
    (error) => error.code === 'TASK_PACKAGE_NODE_UNBOUND'
  );
});
