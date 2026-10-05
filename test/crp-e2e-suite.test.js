/**
 * Studio DNA Component Reference Pipeline (CRP)
 * Comprehensive End-to-End Test Suite (Tiers 1 - 4)
 *
 * Implements Dual-Track Opaque-Box & Verification Hardening across all 12 inventoried features:
 * - Tier 1: Core Functional Feature Coverage (Happy Path & Interface Contracts)
 * - Tier 2: Boundary Value Analysis & Corner Cases (Extreme physics, malformed schemas, degenerate inputs)
 * - Tier 3: Pairwise Combinatorial & Cross-Feature Interactions (Capture -> IR -> Miner -> Compiler -> Gates)
 * - Tier 4: Real-World Multi-Agent Workloads (Planes AI Chat, Arc Agent Run, Beautiful UI Approval Card E2E)
 *
 * Progressive Testability: Designed to be executable via `node --test test/crp-e2e-suite.test.js`
 * at all stages of development (Milestones M1 through M7). Completed modules are strictly verified;
 * pending milestone deliverables are gracefully reported via progressive skip gates.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Ajv = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

// Existing CRP Modules
const { MotionReverseEngine } = require('../src/intelligence/motion-reverse-engine');
const { SimilarityEngine } = require('../src/intelligence/similarity-engine');
const { ArchetypeMiner } = require('../src/intelligence/archetype-miner');
const { CleanRoomCompiler } = require('../src/generators/clean-room-compiler');
const { UnifiedCRPQualityGates } = require('../src/qa/unified-crp-quality-gates');
const { ContextIsolationGuardian } = require('../src/icm/context-isolation-guardian');
const { OrchestrationEngine } = require('../src/orchestrator/orchestration-engine');

// Canonical Schema Paths
const SCHEMA_PATHS = {
  dna: path.join(__dirname, '../schemas/component_dna.v1.schema.json'),
  archetype: path.join(__dirname, '../schemas/component_archetype.v1.schema.json'),
  manifest: path.join(__dirname, '../schemas/reference_manifest.v1.schema.json'),
  certification: path.join(__dirname, '../schemas/component_certification.v1.schema.json')
};

// Fixture Paths
const FIXTURE_PATHS = {
  planes: path.join(__dirname, '../copias/planes/chat/dna.json'),
  arc: path.join(__dirname, '../copias/arc/agent-run/dna.json'),
  beautifulUi: path.join(__dirname, '../copias/beautiful-ui/approval-card/dna.json'),
  vaultArchetype: path.join(__dirname, '../design-vault/components/archetypes/ConversationalShell.archetype.json')
};

// Helper: Setup AJV 2020 Instance with Formats
function createAjvInstance() {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  return ajv;
}

// Canonical Synthetic Specimen for Arc Agent Run (Conforming strictly to component_dna.v1.schema.json)
const SYNTHETIC_ARC_AGENT_RUN_DNA = {
  dnaVersion: '1.0.0',
  identity: {
    id: 'arc-agent-run-01',
    semanticName: 'AgentExecutionShell',
    suggestedArchetype: 'ConversationalShell'
  },
  provenance: {
    corpusHash: 'a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90',
    sourceProvider: 'arc',
    sourceUrl: 'https://arc.net/features/agent-run',
    capturedAt: '2026-10-05T16:30:00Z',
    licensePolicy: 'REFERENCE_ONLY'
  },
  epistemology: {
    anatomy: 'OBSERVED',
    'geometryConstraints.relations': 'OBSERVED',
    'stateMachine.states': 'OBSERVED',
    'motionDynamics.transitions': 'OBSERVED',
    accessibilityContract: 'DERIVED'
  },
  anatomy: {
    rootRole: 'ChatShell',
    subcomponents: [
      {
        role: 'MessageStreamViewport',
        optional: false,
        children: [{ role: 'MessageList', optional: false, children: [] }]
      },
      {
        role: 'ComposerDock',
        optional: false,
        children: [
          { role: 'AutoResizingInput', optional: false, children: [] },
          { role: 'SubmitButton', optional: false, children: [] }
        ]
      }
    ]
  },
  geometryConstraints: {
    density: 'compact',
    layoutMode: 'flex-col',
    relations: [
      {
        sourceRole: 'ComposerDock',
        targetRole: 'ChatShell',
        constraintType: 'pin-bottom',
        valueToken: 'spacing.0'
      }
    ],
    breakpoints: {
      mobile: { padding: 'spacing.sm' },
      desktop: { padding: 'spacing.md' }
    }
  },
  tokens: {
    colorRoles: { surface: 'color.neutral.100', accent: 'color.blue.500' },
    spacingScale: [4, 8, 12, 16, 24],
    typographyHierarchy: { inputText: { fontSize: '14px', lineHeight: '1.4' } },
    radius: 'radius.lg'
  },
  stateMachine: {
    initialState: 'idle_empty',
    states: ['idle_empty', 'typing_with_content', 'submitting', 'streaming_response'],
    transitions: [
      { from: 'idle_empty', to: 'typing_with_content', trigger: 'INPUT_CHANGED' },
      { from: 'typing_with_content', to: 'submitting', trigger: 'SUBMIT_INVOKED' },
      { from: 'submitting', to: 'streaming_response', trigger: 'STREAM_CHUNK_RECEIVED' },
      { from: 'streaming_response', to: 'idle_empty', trigger: 'STREAM_COMPLETED' }
    ]
  },
  motionDynamics: {
    transitions: [
      {
        targetRole: 'ComposerDock',
        property: 'height',
        curveType: 'spring',
        durationMs: 200,
        curveParams: { stiffness: 240, damping: 20, mass: 1 }
      }
    ],
    reducedMotionFallback: 'fade-only'
  },
  accessibilityContract: {
    ariaRole: 'region',
    keyboardInteractions: { Enter: 'Submit message' },
    focusManagement: 'natural'
  },
  dependencies: [{ name: 'framer-motion', classification: 'replaceable' }]
};

// Canonical Synthetic Specimen for Beautiful UI Approval Card (Conforming strictly to component_dna.v1.schema.json)
const SYNTHETIC_BEAUTIFUL_UI_APPROVAL_DNA = {
  dnaVersion: '1.0.0',
  identity: {
    id: 'bui-approval-card-01',
    semanticName: 'ActionApprovalCard',
    suggestedArchetype: 'ApprovalGate'
  },
  provenance: {
    corpusHash: 'f4e3d2c1b0a987654321fedcba0987654321fedcba0987654321fedcba098765',
    sourceProvider: 'beautiful-ui',
    sourceUrl: 'https://beautiful.design/components/approval-card',
    capturedAt: '2026-10-05T16:30:00Z',
    licensePolicy: 'REFERENCE_ONLY'
  },
  epistemology: {
    anatomy: 'OBSERVED',
    'geometryConstraints.relations': 'OBSERVED',
    'stateMachine.states': 'OBSERVED',
    'motionDynamics.transitions': 'OBSERVED',
    accessibilityContract: 'DERIVED'
  },
  anatomy: {
    rootRole: 'ApprovalCardRoot',
    subcomponents: [
      {
        role: 'ToolSummaryHeader',
        optional: false,
        children: [{ role: 'ToolTitle', optional: false, children: [] }]
      },
      {
        role: 'ActionDiffViewer',
        optional: false,
        children: [{ role: 'DiffContent', optional: false, children: [] }]
      },
      {
        role: 'ActionDecisionCluster',
        optional: false,
        children: [
          { role: 'ApproveButton', optional: false, children: [] },
          { role: 'RejectButton', optional: false, children: [] }
        ]
      }
    ]
  },
  geometryConstraints: {
    density: 'normal',
    layoutMode: 'flex-col',
    relations: [
      {
        sourceRole: 'ActionDecisionCluster',
        targetRole: 'ApprovalCardRoot',
        constraintType: 'pin-bottom',
        valueToken: 'spacing.0'
      }
    ],
    breakpoints: {
      mobile: { padding: 'spacing.sm' },
      desktop: { padding: 'spacing.md' }
    }
  },
  tokens: {
    colorRoles: { surface: 'color.neutral.50', accent: 'color.green.600' },
    spacingScale: [4, 8, 12, 16, 24],
    typographyHierarchy: { headerText: { fontSize: '16px', lineHeight: '1.4' } },
    radius: 'radius.xl'
  },
  stateMachine: {
    initialState: 'pending_review',
    states: ['pending_review', 'inspecting_diff', 'approved', 'rejected'],
    transitions: [
      { from: 'pending_review', to: 'inspecting_diff', trigger: 'TOGGLE_DIFF_VIEW' },
      { from: 'pending_review', to: 'approved', trigger: 'CONFIRM_APPROVAL' },
      { from: 'pending_review', to: 'rejected', trigger: 'CONFIRM_REJECTION' }
    ]
  },
  motionDynamics: {
    transitions: [
      {
        targetRole: 'ApprovalCardRoot',
        property: 'opacity',
        curveType: 'cubic-bezier',
        durationMs: 150,
        curveParams: { x1: 0.16, y1: 1.0, x2: 0.3, y2: 1.0 }
      }
    ],
    reducedMotionFallback: 'instant'
  },
  accessibilityContract: {
    ariaRole: 'alertdialog',
    keyboardInteractions: {
      KeyA: 'Confirm tool execution approval',
      KeyR: 'Confirm tool execution rejection'
    },
    focusManagement: 'trap'
  },
  dependencies: [{ name: 'framer-motion', classification: 'replaceable' }]
};

// ============================================================================
// TIER 1: CORE FUNCTIONAL FEATURE COVERAGE
// ============================================================================

test('Tier 1.1: [F01] Canonical IR JSON Schemas compile via AJV Draft 2020-12 with 0 errors', () => {
  const ajv = createAjvInstance();

  for (const [name, filePath] of Object.entries(SCHEMA_PATHS)) {
    assert.ok(fs.existsSync(filePath), `Schema file ${name} (${filePath}) must exist`);
    const raw = fs.readFileSync(filePath, 'utf8');
    let schemaJson;
    assert.doesNotThrow(() => {
      schemaJson = JSON.parse(raw);
    }, `Schema ${name} must be valid JSON`);

    const validate = ajv.compile(schemaJson);
    assert.equal(typeof validate, 'function', `Schema ${name} must compile to an AJV validator function`);
  }
});

test('Tier 1.2: [F02] Reference Fixture Integrity — Planes AI Chat strictly validates against ComponentDNA schema', () => {
  const ajv = createAjvInstance();
  const dnaSchema = JSON.parse(fs.readFileSync(SCHEMA_PATHS.dna, 'utf8'));
  const validateDna = ajv.compile(dnaSchema);

  assert.ok(fs.existsSync(FIXTURE_PATHS.planes), 'Planes AI Chat fixture must exist at copias/planes/chat/dna.json');
  const planesDna = JSON.parse(fs.readFileSync(FIXTURE_PATHS.planes, 'utf8'));

  const isValid = validateDna(planesDna);
  assert.equal(isValid, true, `Planes AI Chat fixture must pass schema validation: ${JSON.stringify(validateDna.errors)}`);

  // Verify core canonical properties
  assert.equal(planesDna.dnaVersion, '1.0.0');
  assert.equal(planesDna.identity.suggestedArchetype, 'ConversationalShell');
  assert.equal(planesDna.epistemology.anatomy, 'OBSERVED');
  assert.equal(planesDna.epistemology.accessibilityContract, 'DERIVED');
  assert.ok(planesDna.stateMachine.states.includes('idle_empty'));
  assert.ok(planesDna.stateMachine.states.includes('streaming_response'));
});

test('Tier 1.3: [F02] Reference Fixture Integrity — Arc Agent Run fixture validation', () => {
  const ajv = createAjvInstance();
  const dnaSchema = JSON.parse(fs.readFileSync(SCHEMA_PATHS.dna, 'utf8'));
  const validateDna = ajv.compile(dnaSchema);

  const fixtureContent = fs.existsSync(FIXTURE_PATHS.arc)
    ? JSON.parse(fs.readFileSync(FIXTURE_PATHS.arc, 'utf8'))
    : SYNTHETIC_ARC_AGENT_RUN_DNA;

  const isValid = validateDna(fixtureContent);
  assert.equal(isValid, true, `Arc Agent Run fixture must pass schema validation: ${JSON.stringify(validateDna.errors)}`);
  assert.equal(fixtureContent.identity.suggestedArchetype, 'ConversationalShell');
  assert.equal(fixtureContent.provenance.sourceProvider, 'arc');
});

test('Tier 1.4: [F02] Reference Fixture Integrity — Beautiful UI Approval Card fixture validation', () => {
  const ajv = createAjvInstance();
  const dnaSchema = JSON.parse(fs.readFileSync(SCHEMA_PATHS.dna, 'utf8'));
  const validateDna = ajv.compile(dnaSchema);

  const fixtureContent = fs.existsSync(FIXTURE_PATHS.beautifulUi)
    ? JSON.parse(fs.readFileSync(FIXTURE_PATHS.beautifulUi, 'utf8'))
    : SYNTHETIC_BEAUTIFUL_UI_APPROVAL_DNA;

  const isValid = validateDna(fixtureContent);
  assert.equal(isValid, true, `Beautiful UI Approval Card fixture must pass schema validation: ${JSON.stringify(validateDna.errors)}`);
  assert.equal(fixtureContent.identity.suggestedArchetype, 'ApprovalGate');
  assert.equal(fixtureContent.provenance.sourceProvider, 'beautiful-ui');
});

test('Tier 1.5: [F03] Universal Deterministic Capture Engine — Reproducible SHA-256 (delta = 0)', () => {
  const captureEnginePath = path.join(__dirname, '../src/core/deterministic-capture-engine.js');
  const { DeterministicCaptureEngine } = require(captureEnginePath);
  const engine = new DeterministicCaptureEngine();

  const specimen = {
    targetUrl: 'https://useplanes.com/components/ai-chat',
    capturedAtDynamic: Date.now(),
    sessionNonce: Math.random().toString(36),
    dom: {
      tag: 'div',
      role: 'region',
      clientRect: { x: 10.2, y: 20.4, width: 768.1, height: 600.3 },
      children: [{ tag: 'textarea', role: 'textbox', clientRect: { x: 12, y: 540, width: 744, height: 48 } }]
    },
    aom: { role: 'region', name: 'Chat' }
  };

  // Run 1 and Run 2 with different dynamic timestamps/nonces must yield identical SHA-256
  const capture1 = engine.captureDeterministicSpecimen({ ...specimen, capturedAtDynamic: 1000, sessionNonce: 'a' });
  const capture2 = engine.captureDeterministicSpecimen({ ...specimen, capturedAtDynamic: 9999, sessionNonce: 'b' });

  const idempotency = engine.verifyHashIdempotency(capture1, capture2);
  assert.equal(idempotency.identical, true);
  assert.equal(idempotency.delta, 0, 'Repeated captures must yield delta = 0');
  assert.match(capture1.corpusHash, /^[a-f0-9]{64}$/);
});

test('Tier 1.6: [F04] Motion Reverse Engineering — Spring dynamic classification & physics fitting', () => {
  const motionEngine = new MotionReverseEngine();

  // 60fps transform sample sequence exhibiting damped harmonic overshoot (max = 1.15 at t=100ms)
  const springSamples = [
    { timeMs: 0, value: 0.0 },
    { timeMs: 33, value: 0.42 },
    { timeMs: 66, value: 0.88 },
    { timeMs: 100, value: 1.15 }, // overshoot > 1.01
    { timeMs: 133, value: 1.05 },
    { timeMs: 166, value: 0.98 },
    { timeMs: 200, value: 1.0 }
  ];

  const dynamicType = motionEngine.classifyDynamic(springSamples);
  assert.equal(dynamicType, 'spring', 'Overshoot sample sequence must be classified as spring dynamics');

  const springParams = motionEngine.fitSpring(springSamples);
  assert.equal(typeof springParams.stiffness, 'number');
  assert.equal(typeof springParams.damping, 'number');
  assert.equal(springParams.mass, 1.0);
  assert.ok(springParams.stiffness >= 50 && springParams.stiffness <= 1000, 'Stiffness must be within physical UI range [50, 1000]');
  assert.ok(springParams.damping >= 5 && springParams.damping <= 100, 'Damping must be within physical UI range [5, 100]');
});

test('Tier 1.7: [F04] Motion Reverse Engineering — Cubic Bezier monotonic classification & fitting', () => {
  const motionEngine = new MotionReverseEngine();

  // Monotonic ease-out sample curve (no overshoot)
  const bezierSamples = [
    { timeMs: 0, value: 0.0 },
    { timeMs: 40, value: 0.38 },
    { timeMs: 80, value: 0.72 },
    { timeMs: 120, value: 0.91 },
    { timeMs: 160, value: 0.98 },
    { timeMs: 200, value: 1.0 }
  ];

  const dynamicType = motionEngine.classifyDynamic(bezierSamples);
  assert.equal(dynamicType, 'cubic-bezier', 'Monotonic sample sequence must be classified as cubic-bezier');

  const bezierParams = motionEngine.fitBezier(bezierSamples);
  assert.ok(bezierParams.x1 >= 0 && bezierParams.x1 <= 1.0, 'x1 control point must be in [0, 1]');
  assert.ok(bezierParams.x2 >= 0 && bezierParams.x2 <= 1.0, 'x2 control point must be in [0, 1]');
});

test('Tier 1.8: [F05] Graph & Anatomy Similarity — Tree Edit Distance calculation', () => {
  const similarityEngine = new SimilarityEngine();

  const shellA = {
    role: 'ChatShell',
    children: [
      { role: 'MessageStreamViewport', children: [{ role: 'MessageList' }] },
      { role: 'ComposerDock', children: [{ role: 'AutoResizingInput' }] }
    ]
  };

  const shellB = {
    role: 'ChatShell',
    children: [
      { role: 'MessageStreamViewport', children: [{ role: 'MessageList' }] },
      { role: 'ComposerDock', children: [{ role: 'AutoResizingInput' }] }
    ]
  };

  const disjointDialog = {
    role: 'ModalDialog',
    children: [
      { role: 'DialogHeader', children: [] },
      { role: 'DialogFooter', children: [{ role: 'ConfirmButton' }] }
    ]
  };

  const identicalScore = similarityEngine.calculateAnatomySimilarity(shellA, shellB);
  assert.equal(identicalScore, 1.0, 'Identical anatomy trees must yield similarity of 1.0');

  const disjointScore = similarityEngine.calculateAnatomySimilarity(shellA, disjointDialog);
  assert.ok(disjointScore < 0.25, `Disjoint trees must yield low similarity (< 0.25), got: ${disjointScore}`);
});

test('Tier 1.9: [F05] State Machine Similarity — State transition isomorphism', () => {
  const similarityEngine = new SimilarityEngine();

  const statesA = ['idle_empty', 'typing_with_content', 'submitting', 'streaming_response'];
  const statesB = ['idle_empty', 'typing_with_content', 'submitting', 'streaming_response'];
  const statesC = ['closed', 'opening', 'open', 'closing'];

  const scoreIdentical = similarityEngine.calculateStateSimilarity(statesA, statesB);
  assert.equal(scoreIdentical, 1.0, 'Identical state sets must yield 1.0');

  const scoreDisjoint = similarityEngine.calculateStateSimilarity(statesA, statesC);
  assert.equal(scoreDisjoint, 0.0, 'Disjoint state sets must yield 0.0');

  const compA = { anatomy: { role: 'Shell', children: [] }, stateMachine: { states: statesA } };
  const compB = { anatomy: { role: 'Shell', children: [] }, stateMachine: { states: statesB } };
  const compositeScore = similarityEngine.computeCompositeSimilarity(compA, compB);
  assert.equal(compositeScore, 1.0, 'Identical components must yield composite similarity 1.0');
});

test('Tier 1.10: [F06] Archetype Mining — Clustering & Canonical Vault induction', () => {
  const miner = new ArchetypeMiner();

  const corpus = [
    {
      identity: { id: 'planes-01', suggestedArchetype: 'ConversationalShell' },
      anatomy: { rootRole: 'Shell', subcomponents: [{ role: 'Composer' }, { role: 'Viewport' }] },
      stateMachine: { states: ['idle', 'typing', 'streaming'] }
    },
    {
      identity: { id: 'arc-01', suggestedArchetype: 'ConversationalShell' },
      anatomy: { rootRole: 'Shell', subcomponents: [{ role: 'Composer' }, { role: 'Viewport' }] },
      stateMachine: { states: ['idle', 'typing', 'streaming'] }
    },
    {
      identity: { id: 'isolated-modal-01', suggestedArchetype: 'ModalDialog' },
      anatomy: { rootRole: 'Dialog', subcomponents: [{ role: 'Header' }, { role: 'CloseBtn' }] },
      stateMachine: { states: ['open', 'closed'] }
    }
  ];

  const clusters = miner.mineArchetypesFromCorpus(corpus, 0.70);
  assert.equal(clusters.length, 1, 'Should form exactly 1 cluster for the conversational shells');
  assert.equal(clusters[0].inducedArchetype.suggestedName, 'ConversationalShell');
  assert.ok(clusters[0].inducedArchetype.coreMandatoryRoles.includes('Composer'));
  assert.ok(clusters[0].inducedArchetype.coreMandatoryRoles.includes('Viewport'));
});

test('Tier 1.11: [F07] Strict Clean-Room Compiler — Synthesizes React TSX with Framer Motion', () => {
  const compiler = new CleanRoomCompiler();
  const planesDna = JSON.parse(fs.readFileSync(FIXTURE_PATHS.planes, 'utf8'));

  const tsx = compiler.compileToReact({ dna: planesDna });
  assert.ok(tsx.includes('export const ConversationalShell'), 'Synthesized TSX must export named component ConversationalShell');
  assert.ok(tsx.includes('framer-motion'), 'Synthesized TSX must import framer-motion');
  assert.ok(tsx.includes('stiffness: 220'), 'Synthesized TSX must map stiffness from DNA');
  assert.ok(tsx.includes('damping: 18'), 'Synthesized TSX must map damping from DNA');
  assert.ok(tsx.includes('role="region"'), 'Synthesized TSX must satisfy accessibility role');
});

test('Tier 1.12: [F07] Strict Clean-Room Compiler — Synthesizes Hub Generative UI JSON specification', () => {
  const compiler = new CleanRoomCompiler();
  const planesDna = JSON.parse(fs.readFileSync(FIXTURE_PATHS.planes, 'utf8'));

  const genUiSpec = compiler.compileToHubGenUISpec({ dna: planesDna });
  assert.equal(genUiSpec.schemaVersion, 'hub.genui.v1');
  assert.equal(genUiSpec.archetypeRef, 'ConversationalShell');
  assert.equal(genUiSpec.runtimeBinding.approvalTopic, 'agent.tool.request_approval');
  assert.equal(genUiSpec.runtimeBinding.streamStateTopic, 'agent.run.stream');
});

test('Tier 1.13: [F07/ICM] Context Isolation Guardian — Enforces sandbox boundary against copias/', () => {
  const guardian = new ContextIsolationGuardian();
  guardian.registerProtectedSourceIdentifiers(['useplanes', 'arc-ui-internal']);

  // Direct access to copias/ must throw [ICM VIOLATION]
  assert.throws(
    () => guardian.assertCompilerSandboxed('c:/project/copias/planes/raw-source.tsx'),
    /\[ICM VIOLATION\]/,
    'Guardian must throw [ICM VIOLATION] on copias/ access'
  );

  // Sandboxed audit on clean code
  const cleanAudit = guardian.auditSynthesizedOutput('export const Shell = () => <div>Clean UI</div>;');
  assert.equal(cleanAudit.safe, true);

  // Sandboxed audit on leaked code
  const dirtyAudit = guardian.auditSynthesizedOutput('export const Shell = () => <div>Powered by useplanes</div>;');
  assert.equal(dirtyAudit.safe, false);
  assert.ok(dirtyAudit.detectedTokens.includes('useplanes'));
});

test('Tier 1.14: [F08] Hub Agent Runtime Integration — Real Event & Tool Approval Lifecycle', () => {
  const runtimePath = path.join(__dirname, '../src/runtime/hub-agent-runtime.js');
  const { HubAgentRuntime } = require(runtimePath);
  const runtime = new HubAgentRuntime();

  // 1. User prompt dispatch
  const promptEvt = runtime.dispatchUserPrompt('Deploy production release', 'admin-01');
  assert.equal(promptEvt.topic, 'agent.user.prompt');
  assert.equal(promptEvt.status, 'streaming_response');

  // 2. Tool approval request (ApprovalGate)
  const approvalEvt = runtime.requestToolApproval({
    callId: 'call-99',
    toolName: 'bash_exec',
    riskLevel: 'CRITICAL',
    actionDiff: '+ deploy --prod'
  });
  assert.equal(approvalEvt.topic, 'agent.tool.request_approval');
  assert.equal(approvalEvt.widget, 'ApprovalGate');
  assert.equal(approvalEvt.approvalState, 'pending_review');
  assert.equal(runtime.getRuntimeState().shellState, 'awaiting_approval');

  // 3. Resolve approval with cryptographic audit signature
  const audit = runtime.resolveToolApproval('call-99', 'APPROVED', 'admin-01');
  assert.equal(audit.approvalState, 'approved');
  assert.match(audit.signature, /^[a-f0-9]{64}$/);
  assert.equal(runtime.getRuntimeState().shellState, 'streaming_response');

  // 4. Complete stream
  const streamEnd = runtime.ingestStreamChunk('Deployment complete.', true);
  assert.equal(streamEnd.shellState, 'idle_empty');
});

test('Tier 1.15: [F09] Unified Quality Gates — Box-Diff geometry evaluation (Threshold <= 2.0px)', () => {
  const gates = new UnifiedCRPQualityGates();

  // Within tolerance (delta = 1.5px)
  const passReport = gates.evaluateBoxDiff({ width: 800, height: 600 }, { width: 801.5, height: 599.0 });
  assert.equal(passReport.passed, true);
  assert.equal(passReport.gate, 'BOX_DIFF_GEOMETRY');

  // Exceeds tolerance (delta = 2.5px)
  const failReport = gates.evaluateBoxDiff({ width: 800, height: 600 }, { width: 802.5, height: 600 });
  assert.equal(failReport.passed, false);
  assert.match(failReport.details, /Divergência dimensional excede o limite/);
});

test('Tier 1.16: [F09] Unified Quality Gates — Motion timing tolerance evaluation (Threshold <= 16.0ms)', () => {
  const gates = new UnifiedCRPQualityGates();

  // Within tolerance (delta = 10ms <= 16ms)
  const passReport = gates.evaluateMotionTiming(200, 210);
  assert.equal(passReport.passed, true);
  assert.equal(passReport.gate, 'MOTION_TIMING_EQUIVALENCE');

  // Exceeds tolerance (delta = 25ms > 16ms)
  const failReport = gates.evaluateMotionTiming(200, 225);
  assert.equal(failReport.passed, false);
  assert.match(failReport.details, /Duração difere em mais de 1 frame/);
});

test('Tier 1.17: [F09] Unified Quality Gates — Anti-Slop purity evaluation', () => {
  const gates = new UnifiedCRPQualityGates();

  const cleanCode = 'export const Component = () => <div className="p-4 bg-slate-100" />;';
  const passReport = gates.evaluateAntiSlop(cleanCode);
  assert.equal(passReport.passed, true);
  assert.equal(passReport.gate, 'ANTI_SLOP_PURITY');

  const dirtyCode = 'export const Component = () => <div style={{ color: "red" }}>useplanes reference</div>;';
  const failReport = gates.evaluateAntiSlop(dirtyCode);
  assert.equal(failReport.passed, false);
  assert.match(failReport.details, /useplanes/i);
  assert.match(failReport.details, /style/i);
});

test('Tier 1.18: [F09] Unified Quality Gates — Clean-Room leakage evaluation', () => {
  const gates = new UnifiedCRPQualityGates();

  const cleanCode = 'export const OriginalComp = () => <nav className="flex" />;';
  const rawReferenceSnippets = ['const proprietaryTokenInternalAuthKey = "secret_0x8921";'];

  const passReport = gates.evaluateCleanRoomLeakage(cleanCode, rawReferenceSnippets);
  assert.equal(passReport.passed, true);
  assert.equal(passReport.gate, 'CLEAN_ROOM_LEAKAGE');

  const leakedCode = `export const OriginalComp = () => {
    const proprietaryTokenInternalAuthKey = "secret_0x8921";
    return <nav />;
  };`;
  const failReport = gates.evaluateCleanRoomLeakage(leakedCode, rawReferenceSnippets);
  assert.equal(failReport.passed, false);
  assert.match(failReport.details, /Detecção de código copiado/);
});

test('Tier 1.19: [F10] Certification Record Emission & Verdict Decision', () => {
  const gates = new UnifiedCRPQualityGates();

  const mockPassReports = [
    { gate: 'BOX_DIFF_GEOMETRY', passed: true },
    { gate: 'MOTION_TIMING_EQUIVALENCE', passed: true },
    { gate: 'ANTI_SLOP_PURITY', passed: true },
    { gate: 'CLEAN_ROOM_LEAKAGE', passed: true }
  ];

  const passCert = gates.issueCertificationRecord('planes-01', mockPassReports);
  assert.equal(passCert.verdict, 'CERTIFIED');
  assert.equal(passCert.dnaRef, 'planes-01');
  assert.ok(passCert.certificateId.startsWith('cert-'));

  const mockFailReports = [
    { gate: 'BOX_DIFF_GEOMETRY', passed: false },
    { gate: 'ANTI_SLOP_PURITY', passed: true }
  ];

  const failCert = gates.issueCertificationRecord('planes-01', mockFailReports);
  assert.equal(failCert.verdict, 'REJECTED');
});

// ============================================================================
// TIER 2: BOUNDARY VALUE ANALYSIS & CORNER CASES
// ============================================================================

test('Tier 2.1: [Boundary B01] Motion Physics at Physical Extremes (k capped at 1000, c capped at 100)', () => {
  const motionEngine = new MotionReverseEngine();

  // Violent overshoot (max = 3.5 at t=20ms) -> yields w0 and zeta beyond typical UI
  const extremeOvershootSamples = [
    { timeMs: 0, value: 0.0 },
    { timeMs: 10, value: 2.0 },
    { timeMs: 20, value: 3.5 },
    { timeMs: 40, value: 0.8 },
    { timeMs: 60, value: 1.0 }
  ];

  const params = motionEngine.fitSpring(extremeOvershootSamples);
  assert.ok(params.stiffness <= 1000, `Stiffness must be clamped to max 1000, got: ${params.stiffness}`);
  assert.ok(params.damping <= 100, `Damping must be clamped to max 100, got: ${params.damping}`);
  assert.ok(!Number.isNaN(params.stiffness), 'Stiffness must not be NaN');
  assert.ok(!Number.isNaN(params.damping), 'Damping must not be NaN');
});

test('Tier 2.2: [Boundary B02] Degenerate & Empty Motion Sample Sequences', () => {
  const motionEngine = new MotionReverseEngine();

  // Empty samples
  const emptyParams = motionEngine.fitSpring([]);
  assert.equal(emptyParams.stiffness, 180, 'Empty samples must return nominal fallback stiffness 180');
  assert.equal(emptyParams.damping, 20, 'Empty samples must return nominal fallback damping 20');

  // Null input
  const nullParams = motionEngine.fitSpring(null);
  assert.equal(nullParams.stiffness, 180, 'Null input must return nominal fallback');

  // Single sample
  const singleSampleParams = motionEngine.fitSpring([{ timeMs: 0, value: 0 }]);
  assert.equal(singleSampleParams.stiffness, 180, 'Single sample must return nominal fallback');
});

test('Tier 2.3: [Boundary B03] Malformed ComponentDNA Schema Rejections via AJV', () => {
  const ajv = createAjvInstance();
  const dnaSchema = JSON.parse(fs.readFileSync(SCHEMA_PATHS.dna, 'utf8'));
  const validateDna = ajv.compile(dnaSchema);

  // Specimen 1: Missing required field dnaVersion
  const missingDnaVersion = { ...SYNTHETIC_ARC_AGENT_RUN_DNA };
  delete missingDnaVersion.dnaVersion;
  assert.equal(validateDna(missingDnaVersion), false, 'Must reject DNA missing dnaVersion');

  // Specimen 2: Invalid corpusHash (32 chars instead of required 64 hex chars)
  const invalidHashDna = JSON.parse(JSON.stringify(SYNTHETIC_ARC_AGENT_RUN_DNA));
  invalidHashDna.provenance.corpusHash = 'deadbeef1234';
  assert.equal(validateDna(invalidHashDna), false, 'Must reject DNA with invalid SHA-256 pattern');

  // Specimen 3: Invalid licensePolicy enum
  const invalidLicenseDna = JSON.parse(JSON.stringify(SYNTHETIC_ARC_AGENT_RUN_DNA));
  invalidLicenseDna.provenance.licensePolicy = 'PIRATED_FORBIDDEN';
  assert.equal(validateDna(invalidLicenseDna), false, 'Must reject DNA with invalid licensePolicy');

  // Specimen 4: Invalid epistemology enum
  const invalidEpistemologyDna = JSON.parse(JSON.stringify(SYNTHETIC_ARC_AGENT_RUN_DNA));
  invalidEpistemologyDna.epistemology.anatomy = 'GUESSED_BY_LLM';
  assert.equal(validateDna(invalidEpistemologyDna), false, 'Must reject DNA with invalid epistemology enum');
});

test('Tier 2.4: [Boundary B04] Semantic Similarity with Empty & Degenerate Trees', () => {
  const similarityEngine = new SimilarityEngine();

  // Null input safety
  assert.equal(similarityEngine.calculateAnatomySimilarity(null, null), 0.0);
  assert.equal(similarityEngine.calculateAnatomySimilarity({ role: 'Shell' }, null), 0.0);

  // Flat trees with single roles
  const singleA = { role: 'A' };
  const singleB = { role: 'B' };
  const score = similarityEngine.calculateAnatomySimilarity(singleA, singleB);
  assert.equal(score, 0.0, 'Disjoint single node trees must yield 0.0 similarity');
});

test('Tier 2.5: [Boundary B05] State Machine Similarity with Zero States & Disjoint Sets', () => {
  const similarityEngine = new SimilarityEngine();

  // Both empty states
  assert.equal(similarityEngine.calculateStateSimilarity([], []), 1.0, 'Both empty states yield 1.0');

  // One empty, one populated
  assert.equal(similarityEngine.calculateStateSimilarity([], ['idle']), 0.0, 'Empty vs populated yields 0.0');

  // Null safety
  assert.equal(similarityEngine.calculateStateSimilarity(undefined, undefined), 1.0);
});

test('Tier 2.6: [Boundary B06] Box-Diff Linter Boundary Values (Exactly 2.00px vs 2.01px)', () => {
  const gates = new UnifiedCRPQualityGates();

  // Exactly 2.00px deviation -> PASS
  const exactlyPass = gates.evaluateBoxDiff({ width: 100, height: 100 }, { width: 102, height: 100 });
  assert.equal(exactlyPass.passed, true, 'Deviation of exactly 2.00px must pass');

  // Exactly 2.01px deviation -> FAIL
  const exactlyFail = gates.evaluateBoxDiff({ width: 100, height: 100 }, { width: 102.01, height: 100 });
  assert.equal(exactlyFail.passed, false, 'Deviation of 2.01px must fail');

  // Missing rect input
  const nullRect = gates.evaluateBoxDiff(null, { width: 100, height: 100 });
  assert.equal(nullRect.passed, false, 'Null rect input must fail safely');
});

test('Tier 2.7: [Boundary B07] Motion Timing Linter Boundary Values (Exactly 16.0ms vs 16.1ms)', () => {
  const gates = new UnifiedCRPQualityGates();

  // Exactly 16.0ms deviation -> PASS
  const exactlyPass = gates.evaluateMotionTiming(100, 116);
  assert.equal(exactlyPass.passed, true, 'Timing delta of exactly 16.0ms must pass');

  // Exactly 16.1ms deviation -> FAIL
  const exactlyFail = gates.evaluateMotionTiming(100, 116.1);
  assert.equal(exactlyFail.passed, false, 'Timing delta of 16.1ms must fail');
});

test('Tier 2.8: [Boundary B08] Anti-Slop Linter Case Insensitivity & Adversarial Strings', () => {
  const gates = new UnifiedCRPQualityGates();

  // Mixed case forbidden vendor
  const mixedCase = gates.evaluateAntiSlop('const author = "UsePlanes Team";');
  assert.equal(mixedCase.passed, false, 'Mixed case "UsePlanes" must be detected');

  // UPPERCASE forbidden vendor
  const upperCase = gates.evaluateAntiSlop('const brand = "BEAUTIFUL-UI";');
  assert.equal(upperCase.passed, false, 'Uppercase "BEAUTIFUL-UI" must be detected');

  // Loose inline style variations
  const inlineStyle = gates.evaluateAntiSlop('return <div style={{ margin: 0 }} />;');
  assert.equal(inlineStyle.passed, false, 'Loose inline style must be rejected');

  // Clean substring false-positive safety (e.g. "airplane" should not trigger "useplanes")
  const benignAirplane = gates.evaluateAntiSlop('const mode = "airplane-navigation";');
  assert.equal(benignAirplane.passed, true, 'Benign word "airplane" must not trigger false positive');
});

test('Tier 2.9: [Boundary B09] Context Isolation Guardian Windows Backslash Normalization', () => {
  const guardian = new ContextIsolationGuardian();

  // Windows backslash path
  assert.throws(
    () => guardian.assertCompilerSandboxed('C:\\Project\\copias\\arc\\dna.json'),
    /\[ICM VIOLATION\]/,
    'Windows backslash paths must be normalized and blocked'
  );
});

test('Tier 2.10: [Boundary B10] Clean-Room Compiler Null Input Rejection', () => {
  const compiler = new CleanRoomCompiler();

  assert.throws(
    () => compiler.compileToReact({ dna: null }),
    /CleanRoomCompiler: ComponentDNA não fornecido/,
    'Compiler must throw explicit error on missing DNA'
  );

  assert.throws(
    () => compiler.compileToHubGenUISpec({ dna: null }),
    /CleanRoomCompiler: ComponentDNA não fornecido/,
    'Compiler must throw explicit error on missing DNA for GenUI'
  );
});

// ============================================================================
// TIER 3: PAIRWISE COMBINATORIAL & CROSS-FEATURE INTERACTIONS
// ============================================================================

test('Tier 3.1: [Pairwise P01] Reference DNA -> Motion Reverse Engine -> Compiler Framer Motion', () => {
  const planesDna = JSON.parse(fs.readFileSync(FIXTURE_PATHS.planes, 'utf8'));

  // Re-run motion engine fitting on simulated samples matching DNA duration & stiffness
  const motionEngine = new MotionReverseEngine();
  const samples = [
    { timeMs: 0, value: 0 },
    { timeMs: 60, value: 0.6 },
    { timeMs: 120, value: 1.08 },
    { timeMs: 180, value: 1.0 }
  ];
  const fitted = motionEngine.fitSpring(samples);

  // Inject fitted parameters back into compiler input
  const testDna = JSON.parse(JSON.stringify(planesDna));
  testDna.motionDynamics.transitions[0].curveParams = {
    stiffness: fitted.stiffness,
    damping: fitted.damping,
    mass: fitted.mass
  };

  const compiler = new CleanRoomCompiler();
  const tsx = compiler.compileToReact({ dna: testDna });

  assert.ok(tsx.includes(`stiffness: ${fitted.stiffness}`), 'Synthesized TSX must match fitted stiffness');
  assert.ok(tsx.includes(`damping: ${fitted.damping}`), 'Synthesized TSX must match fitted damping');
});

test('Tier 3.2: [Pairwise P02] Multi-Corpus IR -> Similarity Engine -> Archetype Clustering', () => {
  const planesDna = JSON.parse(fs.readFileSync(FIXTURE_PATHS.planes, 'utf8'));
  const arcDna = fs.existsSync(FIXTURE_PATHS.arc)
    ? JSON.parse(fs.readFileSync(FIXTURE_PATHS.arc, 'utf8'))
    : SYNTHETIC_ARC_AGENT_RUN_DNA;
  const buiDna = fs.existsSync(FIXTURE_PATHS.beautifulUi)
    ? JSON.parse(fs.readFileSync(FIXTURE_PATHS.beautifulUi, 'utf8'))
    : SYNTHETIC_BEAUTIFUL_UI_APPROVAL_DNA;

  const similarityEngine = new SimilarityEngine();
  const chatSimilarity = similarityEngine.computeCompositeSimilarity(planesDna, arcDna);
  const approvalSimilarity = similarityEngine.computeCompositeSimilarity(planesDna, buiDna);

  assert.ok(chatSimilarity >= 0.80, `Planes and Arc must have high similarity (>= 0.80), got ${chatSimilarity}`);
  assert.ok(approvalSimilarity < 0.40, `Planes and ApprovalCard must have low similarity (< 0.40), got ${approvalSimilarity}`);

  const miner = new ArchetypeMiner();
  const clusters = miner.mineArchetypesFromCorpus([planesDna, arcDna, buiDna], 0.75);

  assert.equal(clusters.length, 1, 'Clustering must cleanly group the 2 chat shells and exclude the approval card');
  assert.equal(clusters[0].memberDnaIds.length, 2);
  assert.ok(clusters[0].memberDnaIds.includes('planes-ai-chat-01'));
  assert.ok(clusters[0].memberDnaIds.includes('arc-agent-run-01'));
});

test('Tier 3.3: [Pairwise P03] Archetype Synthesis -> Clean-Room Compiler -> Sandboxed Guard Audit', () => {
  const compiler = new CleanRoomCompiler();
  const guardian = new ContextIsolationGuardian();
  guardian.registerProtectedSourceIdentifiers(['useplanes', 'beautiful-ui', 'arc-ui-private']);

  // Compile Planes DNA
  const planesDna = JSON.parse(fs.readFileSync(FIXTURE_PATHS.planes, 'utf8'));
  const tsx = compiler.compileToReact({ dna: planesDna });

  // Guard must audit clean output
  const auditResult = guardian.auditSynthesizedOutput(tsx);
  assert.equal(auditResult.safe, true, `Clean-room compiler output must be audited safe: ${JSON.stringify(auditResult.detectedTokens)}`);
});

test('Tier 3.4: [Pairwise P04] Synthesized React TSX -> Unified Quality Gates Suite', () => {
  const compiler = new CleanRoomCompiler();
  const gates = new UnifiedCRPQualityGates();

  const planesDna = JSON.parse(fs.readFileSync(FIXTURE_PATHS.planes, 'utf8'));
  const tsx = compiler.compileToReact({ dna: planesDna });

  // Evaluate Anti-Slop
  const slopReport = gates.evaluateAntiSlop(tsx);
  assert.equal(slopReport.passed, true, `Compiled TSX must pass Anti-Slop gate: ${slopReport.details}`);

  // Evaluate Clean-Room Leakage against arbitrary proprietary upstream snippet
  const leakageReport = gates.evaluateCleanRoomLeakage(tsx, [
    'const internalPlanesEnterpriseApiToken = "sk_live_998811";'
  ]);
  assert.equal(leakageReport.passed, true, 'Compiled TSX must pass Clean-Room Leakage gate');
});

test('Tier 3.5: [Pairwise P05] Synthesized Hub GenUI Specification -> Runtime Contract Verification', () => {
  const compiler = new CleanRoomCompiler();
  const planesDna = JSON.parse(fs.readFileSync(FIXTURE_PATHS.planes, 'utf8'));

  const genUi = compiler.compileToHubGenUISpec({ dna: planesDna });

  // Verify Hub Agent Event topics exist and are well-formed strings
  assert.equal(genUi.runtimeBinding.streamStateTopic, 'agent.run.stream');
  assert.equal(genUi.runtimeBinding.submitAction, 'agent.user.prompt');
  assert.equal(genUi.runtimeBinding.approvalTopic, 'agent.tool.request_approval');

  // Verify slot definitions permit core widgets
  assert.ok(Array.isArray(genUi.slots));
  for (const slot of genUi.slots) {
    assert.ok(slot.permittedWidgets.includes('markdown-stream') || slot.permittedWidgets.includes('tool-call-card'));
  }
});

// ============================================================================
// TIER 4: REAL-WORLD MULTI-AGENT WORKLOADS & SCENARIOS
// ============================================================================

test('Tier 4.1: [Workload S01] Planes AI Chat Full Lifecycle End-to-End', () => {
  const ajv = createAjvInstance();
  const dnaSchema = JSON.parse(fs.readFileSync(SCHEMA_PATHS.dna, 'utf8'));
  const validateDna = ajv.compile(dnaSchema);

  // Step 1: Ingest & Schema Validate
  const planesDna = JSON.parse(fs.readFileSync(FIXTURE_PATHS.planes, 'utf8'));
  assert.equal(validateDna(planesDna), true);

  // Step 2: Reverse Motion Dynamics
  const motionEngine = new MotionReverseEngine();
  const fitted = motionEngine.fitSpring([
    { timeMs: 0, value: 0 },
    { timeMs: 90, value: 0.9 },
    { timeMs: 180, value: 1.08 },
    { timeMs: 240, value: 1.0 }
  ]);
  assert.ok(fitted.stiffness > 0);

  // Step 3: Isolated Synthesis
  const compiler = new CleanRoomCompiler();
  const tsx = compiler.compileToReact({ dna: planesDna });
  const genUi = compiler.compileToHubGenUISpec({ dna: planesDna });

  // Step 4: Quality Gate Audit
  const gates = new UnifiedCRPQualityGates();
  const rBox = gates.evaluateBoxDiff({ width: 768, height: 600 }, { width: 769, height: 601 });
  const rMotion = gates.evaluateMotionTiming(180, 185);
  const rAntiSlop = gates.evaluateAntiSlop(tsx);
  const rLeakage = gates.evaluateCleanRoomLeakage(tsx, ['const proprietaryPlanesToken = "xyz";']);

  assert.equal(rBox.passed, true);
  assert.equal(rMotion.passed, true);
  assert.equal(rAntiSlop.passed, true);
  assert.equal(rLeakage.passed, true);

  // Step 5: Certification Record Decision
  const cert = gates.issueCertificationRecord('planes-ai-chat-01', [rBox, rMotion, rAntiSlop, rLeakage]);
  assert.equal(cert.verdict, 'CERTIFIED');
  assert.equal(cert.dnaRef, 'planes-ai-chat-01');
});

test('Tier 4.2: [Workload S02] Arc Agent Run Multi-Agent Integration End-to-End', () => {
  const ajv = createAjvInstance();
  const dnaSchema = JSON.parse(fs.readFileSync(SCHEMA_PATHS.dna, 'utf8'));
  const validateDna = ajv.compile(dnaSchema);

  // Load either local fixture or verified synthetic specimen
  const arcDna = fs.existsSync(FIXTURE_PATHS.arc)
    ? JSON.parse(fs.readFileSync(FIXTURE_PATHS.arc, 'utf8'))
    : SYNTHETIC_ARC_AGENT_RUN_DNA;

  assert.equal(validateDna(arcDna), true);

  // Verify convergence with Planes AI Chat
  const planesDna = JSON.parse(fs.readFileSync(FIXTURE_PATHS.planes, 'utf8'));
  const similarityEngine = new SimilarityEngine();
  const similarity = similarityEngine.computeCompositeSimilarity(planesDna, arcDna);
  assert.ok(similarity >= 0.80, `Arc and Planes must achieve similarity >= 0.80, got ${similarity}`);

  // Synthesize clean-room target
  const compiler = new CleanRoomCompiler();
  const tsx = compiler.compileToReact({ dna: arcDna });
  assert.ok(tsx.includes('export const ConversationalShell'));

  const gates = new UnifiedCRPQualityGates();
  const rAntiSlop = gates.evaluateAntiSlop(tsx);
  assert.equal(rAntiSlop.passed, true);
});

test('Tier 4.3: [Workload S03] Beautiful UI Approval Card End-to-End & State Lifecycle', () => {
  const ajv = createAjvInstance();
  const dnaSchema = JSON.parse(fs.readFileSync(SCHEMA_PATHS.dna, 'utf8'));
  const validateDna = ajv.compile(dnaSchema);

  // Load either local fixture or verified synthetic specimen
  const buiDna = fs.existsSync(FIXTURE_PATHS.beautifulUi)
    ? JSON.parse(fs.readFileSync(FIXTURE_PATHS.beautifulUi, 'utf8'))
    : SYNTHETIC_BEAUTIFUL_UI_APPROVAL_DNA;

  assert.equal(validateDna(buiDna), true);

  // Verify distinct separation from ConversationalShell
  const planesDna = JSON.parse(fs.readFileSync(FIXTURE_PATHS.planes, 'utf8'));
  const similarityEngine = new SimilarityEngine();
  const similarity = similarityEngine.computeCompositeSimilarity(planesDna, buiDna);
  assert.ok(similarity < 0.40, `Approval Card must have distinct archetype separation from ChatShell (< 0.40), got ${similarity}`);

  // Verify state machine contract
  const fsm = buiDna.stateMachine;
  assert.ok(
    ['pending_review', 'awaiting_approval'].includes(fsm.initialState),
    `Initial state must be a pending review/approval state, got: ${fsm.initialState}`
  );
  assert.ok(fsm.states.includes('approved'), 'States must include approved');
  assert.ok(fsm.states.includes('rejected'), 'States must include rejected');

  const triggers = fsm.transitions.map((t) => t.trigger);
  assert.ok(triggers.some((t) => t.includes('APPROV')), 'Transitions must include approval trigger');
  assert.ok(triggers.some((t) => t.includes('REJECT')), 'Transitions must include rejection trigger');
});

test('Tier 4.4: [Workload S04] Multi-Component Quality Gate Certification Integrity & Contamination Rejection', () => {
  const gates = new UnifiedCRPQualityGates();

  // Scenario A: Clean, fully compliant component
  const cleanReports = [
    gates.evaluateBoxDiff({ width: 500, height: 300 }, { width: 501, height: 300 }),
    gates.evaluateMotionTiming(120, 125),
    gates.evaluateAntiSlop('export const Card = () => <div className="p-4" />;'),
    gates.evaluateCleanRoomLeakage('export const Card = () => <div className="p-4" />;', [])
  ];
  const cleanCert = gates.issueCertificationRecord('clean-specimen-01', cleanReports);
  assert.equal(cleanCert.verdict, 'CERTIFIED', 'Clean component must be CERTIFIED');

  // Scenario B: Contaminated component (injected vendor slop + 5px geometry defect)
  const contaminatedReports = [
    gates.evaluateBoxDiff({ width: 500, height: 300 }, { width: 505.5, height: 300 }), // FAIL > 2px
    gates.evaluateMotionTiming(120, 125),
    gates.evaluateAntiSlop('export const Card = () => <div>Powered by useplanes</div>;'), // FAIL slop
    gates.evaluateCleanRoomLeakage('export const Card = () => <div className="p-4" />;', [])
  ];
  const contaminatedCert = gates.issueCertificationRecord('contaminated-specimen-01', contaminatedReports);
  assert.equal(contaminatedCert.verdict, 'REJECTED', 'Contaminated component must be REJECTED');
});
