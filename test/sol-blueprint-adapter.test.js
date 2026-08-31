const test = require('node:test');
const assert = require('node:assert/strict');
const { createSolBlueprintAdapter } = require('../src/orchestration/sol-blueprint-adapter');

function validWire({ rid = 'run-001', cid = 'piloto-elyse-luxe' } = {}) {
  return {
    v: 1,
    rid,
    cid,
    ctx: [{ id: 'ctx-1', sha: 'a'.repeat(64), p: `clientes/${cid}/DNA.md` }],
    nd: [{
      id: 'n1', k: 'build', dep: [], in: ['ctx-1'], out: ['site'],
      p: [`clientes/${cid}/site/index.html`], ni: false, tl: ['pipeline.build'],
      b: { it: 20000, ot: 4000, usd: 0.08, try: 1 }, g: ['core-runtime']
    }],
    b: { usd: 1.5, sol: 1, rp: 0 }
  };
}

function createFakeResponses(output) {
  const requests = [];
  return {
    requests,
    create: async (request) => {
      requests.push(request);
      return { output_text: typeof output === 'function' ? output(request) : output };
    }
  };
}

const manifest = [{ id: 'ctx-1', sha: 'a'.repeat(64), p: 'clientes/piloto-elyse-luxe/DNA.md' }];
const runBudget = { usd: 1.5, sol: 1, rp: 0 };
const blueprintPolicy = {
  allowedTools: new Set(['pipeline.build']),
  allowedGates: new Set(['core-runtime']),
  runBudgetUsd: 1.5
};

test('makes one structured request and returns the normalized blueprint', async () => {
  const responsesClient = createFakeResponses(JSON.stringify(validWire()));
  const adapter = createSolBlueprintAdapter({
    responsesClient,
    staticInstructions: 'Plan only from the supplied manifest.',
    blueprintPolicy
  });

  const blueprint = await adapter.plan({
    runId: 'run-001', clientId: 'piloto-elyse-luxe', contextManifest: manifest, runBudget
  });

  assert.equal(responsesClient.requests.length, 1);
  assert.equal(blueprint.runId, 'run-001');
  assert.equal(blueprint.nodes[0].kind, 'build');
  assert.equal(blueprint.context[0].sha256, 'a'.repeat(64));
  assert.deepEqual(blueprint.usage, undefined);
  assert.equal(responsesClient.requests[0].model, 'gpt-5.6-sol');
  assert.equal(responsesClient.requests[0].text.format.type, 'json_schema');
});

test('rejects invalid model output without retrying', async () => {
  const responsesClient = createFakeResponses('I cannot produce a blueprint.');
  const adapter = createSolBlueprintAdapter({
    responsesClient, staticInstructions: 'Return JSON only.', blueprintPolicy
  });

  await assert.rejects(
    adapter.plan({ runId: 'run-001', clientId: 'piloto-elyse-luxe', contextManifest: manifest, runBudget }),
    (error) => error && error.code === 'BLUEPRINT_OUTPUT_INVALID'
  );
  assert.equal(responsesClient.requests.length, 1);
});

test('keeps the static prefix byte-identical and isolates each dynamic manifest', async () => {
  const responsesClient = createFakeResponses((request) => {
    const input = JSON.parse(request.input.at(-1).content);
    const wire = validWire({ rid: input.rid, cid: input.cid });
    wire.ctx = input.ctx;
    wire.nd[0].in = [input.ctx[0].id];
    wire.b = input.b;
    return JSON.stringify(wire);
  });
  const staticInstructions = 'Plan only from the supplied manifest.';
  const adapter = createSolBlueprintAdapter({ responsesClient, staticInstructions, blueprintPolicy });

  await adapter.plan({ runId: 'run-001', clientId: 'piloto-elyse-luxe', contextManifest: manifest, runBudget });
  await adapter.plan({
    runId: 'run-002',
    clientId: 'piloto-elyse-luxe',
    contextManifest: [{ id: 'ctx-2', sha: 'b'.repeat(64), p: 'clientes/piloto-elyse-luxe/content.json' }],
    runBudget: { usd: 1.2, sol: 1, rp: 1 }
  });

  const [first, second] = responsesClient.requests;
  assert.equal(JSON.stringify(first.input[0]), JSON.stringify(second.input[0]));
  assert.notEqual(JSON.stringify(first.input.at(-1)), JSON.stringify(second.input.at(-1)));
  assert.deepEqual(JSON.parse(first.input.at(-1).content), {
    rid: 'run-001', cid: 'piloto-elyse-luxe', ctx: manifest, b: runBudget
  });
  assert.equal(JSON.stringify(first.input).includes('unavailable DNA body'), false);
});

test('rejects a model blueprint that changes the trusted envelope or policy scope', async () => {
  const untrustedWire = validWire({ rid: 'run-999' });
  untrustedWire.nd[0].tl = ['evil.tool'];
  untrustedWire.nd[0].g = ['evil-gate'];
  const responsesClient = createFakeResponses(JSON.stringify(untrustedWire));
  const adapter = createSolBlueprintAdapter({
    responsesClient, staticInstructions: 'Return JSON only.', blueprintPolicy
  });

  await assert.rejects(
    adapter.plan({ runId: 'run-001', clientId: 'piloto-elyse-luxe', contextManifest: manifest, runBudget }),
    (error) => error && error.code === 'BLUEPRINT_OUTPUT_INVALID'
  );
  assert.equal(responsesClient.requests.length, 1);
});

test('rejects a model blueprint whose run ID differs from the requested run', async () => {
  const responsesClient = createFakeResponses(JSON.stringify(validWire({ rid: 'run-999' })));
  const adapter = createSolBlueprintAdapter({
    responsesClient, staticInstructions: 'Return JSON only.', blueprintPolicy
  });

  await assert.rejects(
    adapter.plan({ runId: 'run-001', clientId: 'piloto-elyse-luxe', contextManifest: manifest, runBudget }),
    (error) => error && error.code === 'BLUEPRINT_OUTPUT_INVALID'
  );
  assert.equal(responsesClient.requests.length, 1);
});
