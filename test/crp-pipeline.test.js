/**
 * Test Suite: Component Reference Pipeline (CRP) End-to-End
 * Validação TDD dos módulos de Inteligência, Compilador Clean-Room, Quality Gates e Orquestrador.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { MotionReverseEngine } = require('../src/intelligence/motion-reverse-engine');
const { SimilarityEngine } = require('../src/intelligence/similarity-engine');
const { ArchetypeMiner } = require('../src/intelligence/archetype-miner');
const { CleanRoomCompiler } = require('../src/generators/clean-room-compiler');
const { UnifiedCRPQualityGates } = require('../src/qa/unified-crp-quality-gates');
const { ContextIsolationGuardian } = require('../src/icm/context-isolation-guardian');
const { OrchestrationEngine } = require('../src/orchestrator/orchestration-engine');

test('CRP Suite: 1. Schemas e Fixture de ComponentDNA existem e são válidos', () => {
  const schemaPath = path.join(__dirname, '../schemas/component_dna.v1.schema.json');
  const fixturePath = path.join(__dirname, '../copias/planes/chat/dna.json');

  assert.ok(fs.existsSync(schemaPath), 'Schema ComponentDNA v1 deve existir');
  assert.ok(fs.existsSync(fixturePath), 'Fixture copias/planes/chat/dna.json deve existir');

  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

  assert.equal(schema.title, 'ComponentDNA');
  assert.equal(fixture.dnaVersion, '1.0.0');
  assert.equal(fixture.identity.suggestedArchetype, 'ConversationalShell');
  assert.equal(fixture.epistemology.anatomy, 'OBSERVED');
});

test('CRP Suite: 2. Motion Reverse Engine classifica molas e ajusta parâmetros físicos', () => {
  const motionEngine = new MotionReverseEngine();

  // Amostras com overshoot (característica física de mola)
  const springSamples = [
    { timeMs: 0, value: 0 },
    { timeMs: 40, value: 0.35 },
    { timeMs: 80, value: 0.78 },
    { timeMs: 120, value: 1.08 }, // overshoot
    { timeMs: 160, value: 0.98 },
    { timeMs: 200, value: 1.0 }
  ];

  const dynamicType = motionEngine.classifyDynamic(springSamples);
  assert.equal(dynamicType, 'spring', 'Deve classificar como mola devido ao overshoot');

  const springParams = motionEngine.fitSpring(springSamples);
  assert.ok(springParams.stiffness >= 50, 'Stiffness deve ser positivo e relevante');
  assert.ok(springParams.damping >= 5, 'Damping deve ser positivo e amortecer');

  // Amostras monótonas (Bezier ease-out)
  const bezierSamples = [
    { timeMs: 0, value: 0 },
    { timeMs: 50, value: 0.4 },
    { timeMs: 100, value: 0.75 },
    { timeMs: 150, value: 0.95 },
    { timeMs: 200, value: 1.0 }
  ];

  assert.equal(motionEngine.classifyDynamic(bezierSamples), 'cubic-bezier');
  const bezierParams = motionEngine.fitBezier(bezierSamples);
  assert.ok(bezierParams.x1 >= 0 && bezierParams.x2 <= 1.0);
});

test('CRP Suite: 3. Similarity Engine calcula concordância anatômica e de estados', () => {
  const similarity = new SimilarityEngine();

  const compA = {
    anatomy: { role: 'ChatShell', children: [{ role: 'Composer', children: [] }] },
    stateMachine: { states: ['idle', 'typing', 'streaming'] }
  };

  const compB = {
    anatomy: { role: 'ChatShell', children: [{ role: 'Composer', children: [] }] },
    stateMachine: { states: ['idle', 'typing', 'streaming'] }
  };

  const score = similarity.computeCompositeSimilarity(compA, compB);
  assert.equal(score, 1.0, 'Componentes idênticos devem ter score 1.0');

  const compC = {
    anatomy: { role: 'ModalDialog', children: [{ role: 'CloseBtn', children: [] }] },
    stateMachine: { states: ['open', 'closed'] }
  };

  const scoreDisjoint = similarity.computeCompositeSimilarity(compA, compC);
  assert.ok(scoreDisjoint < 0.3, 'Componentes disjuntos devem ter score baixo');
});

test('CRP Suite: 4. Archetype Miner induz arquétipo canônico a partir de cluster', () => {
  const miner = new ArchetypeMiner();

  const dnas = [
    {
      identity: { id: 'planes-01', suggestedArchetype: 'ConversationalShell' },
      anatomy: { rootRole: 'Shell', subcomponents: [{ role: 'Composer' }, { role: 'Viewport' }] },
      stateMachine: { states: ['idle', 'typing', 'streaming'] }
    },
    {
      identity: { id: 'arc-01', suggestedArchetype: 'ConversationalShell' },
      anatomy: { rootRole: 'Shell', subcomponents: [{ role: 'Composer' }, { role: 'Viewport' }] },
      stateMachine: { states: ['idle', 'typing', 'streaming'] }
    }
  ];

  const clusters = miner.mineArchetypesFromCorpus(dnas, 0.70);
  assert.equal(clusters.length, 1, 'Deve formar exatamente 1 cluster');
  assert.equal(clusters[0].inducedArchetype.suggestedName, 'ConversationalShell');
  assert.ok(clusters[0].inducedArchetype.coreMandatoryRoles.includes('Composer'));
});

test('CRP Suite: 5. Clean-Room Compiler sintetiza React TSX e Hub GenUI', () => {
  const compiler = new CleanRoomCompiler();
  const fixturePath = path.join(__dirname, '../copias/planes/chat/dna.json');
  const dna = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

  const tsx = compiler.compileToReact({ dna });
  assert.ok(tsx.includes('export const ConversationalShell'), 'Deve exportar o componente correto');
  assert.ok(tsx.includes('framer-motion'), 'Deve integrar física de animação');
  assert.ok(tsx.includes('role="region"'), 'Deve manter acessibilidade');

  const genUI = compiler.compileToHubGenUISpec({ dna });
  assert.equal(genUI.schemaVersion, 'hub.genui.v1');
  assert.equal(genUI.archetypeRef, 'ConversationalShell');
  assert.equal(genUI.runtimeBinding.approvalTopic, 'agent.tool.request_approval');
});

test('CRP Suite: 6. Unified Quality Gates avalia geometria, timing, pureza e emite certificado', () => {
  const gates = new UnifiedCRPQualityGates();

  const rBox = gates.evaluateBoxDiff(
    { width: 768, height: 600 },
    { width: 769, height: 601 } // delta 1px (<= 2px pass)
  );
  assert.equal(rBox.passed, true);

  const rMotion = gates.evaluateMotionTiming(180, 190); // delta 10ms (<= 16ms pass)
  assert.equal(rMotion.passed, true);

  const cleanCode = 'export const Component = () => <div className="p-4 bg-white" />;';
  const rAntiSlop = gates.evaluateAntiSlop(cleanCode);
  assert.equal(rAntiSlop.passed, true);

  const rLeakage = gates.evaluateCleanRoomLeakage(cleanCode, ['const useplanesInternalToken = "xyz";']);
  assert.equal(rLeakage.passed, true);

  const cert = gates.issueCertificationRecord('planes-ai-chat-01', [rBox, rMotion, rAntiSlop, rLeakage]);
  assert.equal(cert.verdict, 'CERTIFIED');
  assert.ok(cert.certificateId.startsWith('cert-'));
});

test('CRP Suite: 7. Context Isolation Guardian bloqueia acesso direto a copias/ e detecta leakage', () => {
  const guardian = new ContextIsolationGuardian();
  guardian.registerProtectedSourceIdentifiers(['useplanes', 'arc-ui-private']);

  // Tentativa de acesso deve lançar erro fatal
  assert.throws(
    () => guardian.assertCompilerSandboxed('src/copias/planes/raw-source.tsx'),
    /\[ICM VIOLATION\]/
  );

  // Verificação de vazamento
  const cleanCode = 'export const Shell = () => <div>Hello</div>;';
  const auditClean = guardian.auditSynthesizedOutput(cleanCode);
  assert.equal(auditClean.safe, true);

  const dirtyCode = 'export const Shell = () => <div>Powered by useplanes</div>;';
  const auditDirty = guardian.auditSynthesizedOutput(dirtyCode);
  assert.equal(auditDirty.safe, false);
  assert.ok(auditDirty.detectedTokens.includes('useplanes'));
});

test('CRP Suite: 8. Orchestration Engine controla dependências DAG e bloqueia promoção prematura', () => {
  const engine = new OrchestrationEngine();

  engine.registerPackage({
    taskId: 'CRP-M0',
    milestone: 'M0',
    dependencies: [],
    evidenceRequired: ['governance.json']
  });

  engine.registerPackage({
    taskId: 'CRP-M1',
    milestone: 'M1',
    dependencies: ['CRP-M0'],
    evidenceRequired: ['schemas.json']
  });

  const state1 = engine.getStateSnapshot();
  assert.equal(state1.packages['CRP-M0'].status, 'READY');
  assert.equal(state1.packages['CRP-M1'].status, 'BLOCKED');

  // Concluir CRP-M0
  const completed = engine.completePackage('CRP-M0', ['governance.json']);
  assert.equal(completed, true);

  const state2 = engine.getStateSnapshot();
  assert.equal(state2.packages['CRP-M0'].status, 'DONE');
  assert.equal(state2.packages['CRP-M1'].status, 'READY');
  assert.equal(engine.canPromoteMilestone('M0'), true);
  assert.equal(engine.canPromoteMilestone('M1'), false);
});
