const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');
const { createOrchestrator } = require('../bin/orchestrator');
const { createArtifactRegistry } = require('../src/orchestration/artifact-registry');
const { createToolCatalog } = require('../src/execution/tool-catalog');
const { createGeminiApiAdapter } = require('../src/execution/gemini-api-adapter');
const { createResultVerifier } = require('../src/execution/result-verifier');
const { UnifiedQualityGate } = require('../src/qa/unified-quality-gate');

const fixturePath = path.join(__dirname, 'fixtures', 'gemini-executor', 'broken-site', 'index.html');
const sitePath = 'clientes/client-alpha/site/index.html';
const contextPath = 'clientes/client-alpha/DNA.md';

function setupFixture() {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gemini-executor-e2e-'));
  const siteDir = path.join(rootDir, 'clientes', 'client-alpha', 'site');
  fs.mkdirSync(siteDir, { recursive: true });
  fs.writeFileSync(path.join(siteDir, 'index.html'), fs.readFileSync(fixturePath, 'utf8'), 'utf8');
  fs.writeFileSync(path.join(rootDir, 'clientes', 'client-alpha', 'DNA.md'), '# Fixture DNA\n', 'utf8');
  return { rootDir, siteDir, indexFile: path.join(siteDir, 'index.html') };
}

function blueprint({ maxUsd = 0.25 } = {}) {
  return {
    runId: 'run-001', clientId: 'client-alpha',
    context: [{ id: 'dna', sha256: 'a'.repeat(64), path: contextPath }],
    nodes: [{
      id: 'fix-missing-script', kind: 'fix', dependencies: [], inputs: ['dna'], outputs: ['site'], paths: [sitePath],
      needsInput: false, nonInteractive: true, service: 'standard', humanApprovalEdge: false,
      toolLabels: ['context.lines', 'patch.apply'], gates: ['core-runtime'],
      budget: { maxInputTokens: 500, maxOutputTokens: 200, maxUsd, maxAttempts: 3 }
    }],
    budget: { maxUsd, maxSolCalls: 1, maxReplans: 0 }
  };
}

function taskResult(task, artifact) {
  return {
    v: 1, rid: task.rid, cid: task.cid, nid: task.nid, st: 'ok',
    art: [{ id: 'site', sha: artifact.sha256 }], chg: [sitePath],
    use: { it: 12, ct: 0, ot: 8 }, err: null
  };
}

async function auditEvidence({ rootDir, siteDir, runRef, candidateArtifact, artifactRegistry }) {
  const report = await UnifiedQualityGate.auditSite({ siteDir, clientSlug: 'client-alpha', headless: true });
  const core = report.gates;
  const payload = {
    reportId: 'fixture-runtime-qa', status: report.status, artifactSha256: candidateArtifact.sha256,
    gates: {
      antiSlop: core.antiSlop,
      console: { passed: core.console.passed, errorsCount: core.console.errors.length },
      network: { passed: core.network.passed, failedRequestsCount: core.network.failures.length },
      structural: { passed: core.structural.passed, brokenImagesCount: core.structural.brokenImages.length },
      security: { passed: true }, semantic: { passed: true }, dna: { passed: true }, visual: { passed: true },
      accessibility: { passed: true }, performance: { passed: true }
    },
    ...(report.passed ? {} : { message: 'core runtime gate failed' })
  };
  const reportArtifact = artifactRegistry.putJson({
    runId: runRef.runId, clientId: 'client-alpha', type: 'qa-report', value: payload, sources: [candidateArtifact]
  });
  return { ...artifactRegistry.read(reportArtifact).value, reportArtifact };
}

function runtimeGate({ siteDir }) {
  return async () => {
    const report = await UnifiedQualityGate.auditSite({ siteDir, clientSlug: 'client-alpha', headless: true });
    return { passed: report.passed, evidence: { status: report.status, network: report.gates.network } };
  };
}

test('fixture-only Gemini repair routes a scoped package through independent runtime verification into a candidate ledger', async (t) => {
  const fixture = setupFixture();
  t.after(() => fs.rmSync(fixture.rootDir, { recursive: true, force: true }));
  const beforePatch = await UnifiedQualityGate.auditSite({ siteDir: fixture.siteDir, clientSlug: 'client-alpha', headless: true });
  assert.equal(beforePatch.gates.network.passed, false);
  assert.equal(beforePatch.gates.network.failures[0].status, 404);

  const artifactRegistry = createArtifactRegistry({ rootDir: fixture.rootDir });
  let candidate;
  const tools = createToolCatalog([
    {
      id: 'context.lines', description: 'Read relevant indexed lines only.', pathFields: ['path'],
      inputSchema: { type: 'object', properties: { path: { type: 'string' }, start: { type: 'integer' }, end: { type: 'integer' } }, required: ['path', 'start', 'end'], additionalProperties: false },
      handler: ({ path: requestedPath, start, end }) => fs.readFileSync(path.join(fixture.rootDir, ...requestedPath.split('/')), 'utf8')
        .split(/\r?\n/).slice(start - 1, end).join('\n')
    },
    {
      id: 'patch.apply', description: 'Remove the known failing local request.', pathFields: ['path'],
      inputSchema: { type: 'object', properties: { path: { type: 'string' } }, required: ['path'], additionalProperties: false },
      handler: ({ path: requestedPath }, task) => {
        const absolute = path.join(fixture.rootDir, ...requestedPath.split('/'));
        const repaired = fs.readFileSync(absolute, 'utf8').replace(/\s*<script src="\/missing\.js"><\/script>/, '');
        fs.writeFileSync(absolute, repaired, 'utf8');
        candidate = artifactRegistry.putJson({ runId: task.rid, clientId: task.cid, type: 'site', value: { html: repaired }, sources: [] });
        return { path: requestedPath, artifact: candidate.sha256 };
      }
    }
  ]);
  const requests = [];
  let modelCalls = 0;
  const client = { models: { generateContent: async (request) => {
    requests.push(request);
    modelCalls += 1;
    if (modelCalls === 1) return { functionCalls: [{ id: 'lines-1', name: 'context.lines', args: { path: sitePath, start: 1, end: 8 } }], usageMetadata: { promptTokenCount: 4, cachedContentTokenCount: 0, candidatesTokenCount: 1 } };
    if (modelCalls === 2) return { functionCalls: [{ id: 'patch-1', name: 'patch.apply', args: { path: sitePath } }], usageMetadata: { promptTokenCount: 4, cachedContentTokenCount: 0, candidatesTokenCount: 1 } };
    return { text: JSON.stringify(taskResult(JSON.parse(request.contents[0].parts[0].text).task, candidate)), usageMetadata: { promptTokenCount: 4, cachedContentTokenCount: 0, candidatesTokenCount: 6 } };
  } } };
  const adapter = createGeminiApiAdapter({ client, toolCatalog: tools });
  let plannerCalls = 0;
  let routedExecutions = 0;
  const plan = blueprint();
  const orchestrator = createOrchestrator({
    rootDir: fixture.rootDir,
    planner: { async plan() { plannerCalls += 1; return plan; } },
    executionAdapters: { forNode: () => ({
      identity: adapter.identity, model: adapter.model, service: adapter.service,
      async execute(task) { routedExecutions += 1; return adapter.execute(task); }
    }) },
    verifier: createResultVerifier({ gateCatalog: { 'core-runtime': runtimeGate(fixture) }, artifactRegistry }),
    runIdFactory: () => 'run-001',
    readManifest: () => [{ id: 'dna', sha: 'a'.repeat(64), p: contextPath }],
    blueprintPolicy: { allowedTools: new Set(['context.lines', 'patch.apply']), allowedGates: new Set(['core-runtime']), runBudgetUsd: 0.25 },
    candidateArtifact: () => candidate,
    qaEvidence: (args) => auditEvidence({ ...fixture, ...args }),
    approver: 'fixture-approver'
  });

  const result = await orchestrator.execute(['start', '--client', 'client-alpha', '--context', 'fixture.json']);
  const persisted = await orchestrator.execute(['inspect', '--run', 'run-001']);

  assert.equal(result.state, 'candidate');
  assert.equal(plannerCalls, 1, 'the single M2 architect-plan call is inherited, not repeated');
  assert.equal(routedExecutions, 1);
  assert.equal(modelCalls, 3, 'two bounded tool turns and one structured result');
  assert.equal(persisted.costs.length, 2, 'one reservation and one Gemini cost event');
  assert.deepEqual(persisted.costs[1].data, { v: 1, rid: 'run-001', nid: 'fix-missing-script', m: adapter.model, svc: 'standard', it: 12, ct: 0, ot: 8, ms: persisted.costs[1].data.ms, try: 3, usd: null, est: false });
  assert.equal(persisted.events.filter((event) => event.type === 'REPAIR_AUTHORIZED').length, 0);
  assert.equal(persisted.events.filter((event) => event.type === 'QA_EVIDENCE_RECORDED').length, 1);
  assert.equal(fs.readFileSync(fixture.indexFile, 'utf8').includes('/missing.js'), false);
  for (const request of requests) {
    const prompt = JSON.parse(request.contents[0].parts[0].text);
    assert.deepEqual(Object.keys(prompt).sort(), ['context', 'task', 'tools']);
    assert.deepEqual(prompt.tools.map((tool) => tool.id), ['context.lines', 'patch.apply']);
    assert.deepEqual(prompt.task.p, [sitePath]);
    assert.equal(JSON.stringify(prompt).includes('node_modules'), false);
    assert.equal(JSON.stringify(prompt).includes('copias/'), false);
  }
});

test('an undeclared Gemini tool call is rejected before it can escape the node package', async () => {
  const task = { v: 1, rid: 'run-001', cid: 'client-alpha', nid: 'fix-missing-script', k: 'fix', need: false, ni: true, svc: 'standard', ha: false, in: [], p: [sitePath], out: ['site'], tl: ['context.lines'], g: ['core-runtime'], b: { it: 10, ot: 10, usd: 0.1, try: 1 } };
  const tools = createToolCatalog([
    { id: 'context.lines', description: 'Read local lines.', pathFields: ['path'], inputSchema: { type: 'object', properties: { path: { type: 'string' } }, required: ['path'], additionalProperties: false }, handler: () => '' },
    { id: 'qa.core', description: 'Run core QA.', pathFields: ['path'], inputSchema: { type: 'object', properties: { path: { type: 'string' } }, required: ['path'], additionalProperties: false }, handler: () => ({}) }
  ]);
  const client = { models: { generateContent: async () => ({ functionCalls: [{ id: 'forbidden-1', name: 'qa.core', args: { path: sitePath } }] }) } };
  await assert.rejects(() => createGeminiApiAdapter({ client, toolCatalog: tools }).execute(task), (error) => error.code === 'TOOL_UNDECLARED');
});

test('a repeated broken fixture repair requires human intervention', async (t) => {
  const fixture = setupFixture();
  t.after(() => fs.rmSync(fixture.rootDir, { recursive: true, force: true }));
  const artifactRegistry = createArtifactRegistry({ rootDir: fixture.rootDir });
  const initial = artifactRegistry.putJson({
    runId: 'run-001', clientId: 'client-alpha', type: 'site', value: { html: fs.readFileSync(fixture.indexFile, 'utf8') }, sources: ['fix-missing-script']
  });
  const failedQaEvidence = ({ runRef, candidateArtifact }) => {
    const payload = { reportId: 'broken-runtime-qa', status: 'failed', artifactSha256: candidateArtifact.sha256, message: 'network request /missing.js returned 404', gates: { network: { passed: false } } };
    const reportArtifact = artifactRegistry.putJson({ runId: runRef.runId, clientId: 'client-alpha', type: 'qa-report', value: payload, sources: [candidateArtifact] });
    return { ...payload, reportArtifact };
  };
  let repairCalls = 0;
  const orchestrator = createOrchestrator({
    rootDir: fixture.rootDir,
    planner: { async plan() { const plan = blueprint(); plan.budget.maxUsd = 1; return plan; } },
    executionAdapters: { forNode: () => ({ identity: 'gemini-api', model: 'gemini-3.7-flash', service: 'standard', async execute(task) { return { result: taskResult(task, initial), costEvent: { v: 1, rid: task.rid, nid: task.nid, m: 'gemini-3.7-flash', svc: 'standard', it: 10, ct: 0, ot: 5, ms: 1, try: 1, usd: 0.01, est: false } }; } }) },
    verifier: { identity: 'independent-fixture-verifier', independent: true, async verify() { return { passed: true }; } },
    runIdFactory: () => 'run-001', readManifest: () => [{ id: 'dna', sha: 'a'.repeat(64), p: contextPath }],
    blueprintPolicy: { allowedTools: new Set(['context.lines', 'patch.apply']), allowedGates: new Set(['core-runtime']), runBudgetUsd: 1 },
    candidateArtifact: () => initial, qaEvidence: failedQaEvidence,
    repairCandidate: ({ runRef, blueprint: accepted, previousArtifact, blockingEvidence }) => {
      repairCalls += 1;
      return artifactRegistry.putJson({ runId: runRef.runId, clientId: accepted.clientId, type: 'site', value: { html: 'still broken' }, sources: [previousArtifact, blockingEvidence.failureArtifact, blockingEvidence.verifierArtifact] });
    },
    approver: 'fixture-approver'
  });
  assert.equal((await orchestrator.execute(['start', '--client', 'client-alpha', '--context', 'fixture.json'])).state, 'repairing');
  assert.equal((await orchestrator.execute(['resume', '--run', 'run-001'])).state, 'repairing');
  assert.equal((await orchestrator.execute(['resume', '--run', 'run-001'])).state, 'human_intervention');
  assert.equal(repairCalls, 1);
  const persisted = await orchestrator.execute(['inspect', '--run', 'run-001']);
  assert.equal(persisted.events.filter((event) => event.type === 'REPAIR_AUTHORIZED').length, 1);
  assert.equal(persisted.events.find((event) => event.type === 'REPAIR_BLOCKED').data.decision, 'human_intervention');
});

test('an over-budget task never calls Gemini', async (t) => {
  const fixture = setupFixture();
  t.after(() => fs.rmSync(fixture.rootDir, { recursive: true, force: true }));
  let geminiCalls = 0;
  const overBudgetPlan = blueprint();
  overBudgetPlan.budget.maxUsd = 0.1;
  const orchestrator = createOrchestrator({
    rootDir: fixture.rootDir, planner: { async plan() { return overBudgetPlan; } },
    executionAdapters: { forNode: () => ({ identity: 'gemini-api', model: 'gemini-3.7-flash', service: 'standard', async execute() { geminiCalls += 1; } }) },
    verifier: { identity: 'independent-fixture-verifier', independent: true, async verify() { return { passed: true }; } },
    runIdFactory: () => 'run-001', readManifest: () => [{ id: 'dna', sha: 'a'.repeat(64), p: contextPath }],
    blueprintPolicy: { allowedTools: new Set(['context.lines', 'patch.apply']), allowedGates: new Set(['core-runtime']), runBudgetUsd: 0.25 },
    candidateArtifact: () => { throw new Error('must not produce a candidate'); }, qaEvidence: () => { throw new Error('must not audit'); }, approver: 'fixture-approver'
  });
  await assert.rejects(() => orchestrator.execute(['start', '--client', 'client-alpha', '--context', 'fixture.json']), (error) => error.name === 'BlueprintValidationError');
  assert.equal(geminiCalls, 0);
});
