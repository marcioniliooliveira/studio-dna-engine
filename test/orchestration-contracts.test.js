const test = require('node:test');
const assert = require('node:assert/strict');
const { parseBlueprintWire } = require('../src/orchestration/contracts');

function validBlueprint() {
  return {
    v: 1,
    rid: 'run-001',
    cid: 'piloto-elyse-luxe',
    ctx: [{ id: 'ctx-1', sha: 'a'.repeat(64), p: 'clientes/piloto-elyse-luxe/DNA.md' }],
    nd: [{
      id: 'n1', k: 'build', dep: [], in: ['ctx-1'], out: ['site'],
      p: ['clientes/piloto-elyse-luxe/site/index.html'],
      ni: false,
      tl: ['pipeline.build'], b: { it: 20000, ot: 4000, usd: 0.08, try: 2 },
      g: ['core-runtime']
    }],
    b: { usd: 1.5, sol: 1, rp: 0 }
  };
}

test('expands a compact blueprint into readable internal names', () => {
  const blueprint = parseBlueprintWire(validBlueprint());

  assert.equal(blueprint.runId, 'run-001');
  assert.equal(blueprint.nodes[0].kind, 'build');
  assert.equal(blueprint.nodes[0].budget.maxAttempts, 2);
  assert.equal(blueprint.budget.maxSolCalls, 1);
});

test('rejects blueprint wire payloads that break the compact contract', () => {
  const cases = [
    ['unknown keys', (blueprint) => { blueprint.extra = true; }],
    ['zero node budgets', (blueprint) => { blueprint.nd[0].b.usd = 0; }],
    ['four node attempts', (blueprint) => { blueprint.nd[0].b.try = 4; }],
    ['missing node paths', (blueprint) => { blueprint.nd[0].p = []; }],
    ['missing node gates', (blueprint) => { blueprint.nd[0].g = []; }],
    ['unsafe client IDs', (blueprint) => { blueprint.cid = '../other-client'; }]
  ];

  for (const [name, mutate] of cases) {
    const blueprint = validBlueprint();
    mutate(blueprint);
    assert.throws(() => parseBlueprintWire(blueprint), undefined, name);
  }
});
