/**
 * Challenger M1-2 Empirical Verification & Stress Test Suite
 * Validates:
 * 1. Downstream Similarity Clustering (ConversationalShell >= 0.80)
 * 2. Downstream ApprovalGate Synthesis & Runtime Binding
 * 3. Empirical Detection of SimilarityEngine rootRole evaluation bug
 * 4. Cross-compatibility between fixtures and downstream engines
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Ajv2020 = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

const ROOT_DIR = path.resolve(__dirname, '..');
const SCHEMAS_DIR = path.join(ROOT_DIR, 'schemas');
const COPIAS_DIR = path.join(ROOT_DIR, 'copias');

const { SimilarityEngine } = require('../src/intelligence/similarity-engine');
const { ArchetypeMiner } = require('../src/intelligence/archetype-miner');
const { CleanRoomCompiler } = require('../src/generators/clean-room-compiler');
const { UnifiedCRPQualityGates } = require('../src/qa/unified-crp-quality-gates');
const { ContextIsolationGuardian } = require('../src/icm/context-isolation-guardian');

const dnaSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'component_dna.v1.schema.json'), 'utf8'));
const planesFixture = JSON.parse(fs.readFileSync(path.join(COPIAS_DIR, 'planes', 'chat', 'dna.json'), 'utf8'));
const arcFixture = JSON.parse(fs.readFileSync(path.join(COPIAS_DIR, 'arc', 'agent-run', 'dna.json'), 'utf8'));
const buiFixture = JSON.parse(fs.readFileSync(path.join(COPIAS_DIR, 'beautiful-ui', 'approval-card', 'dna.json'), 'utf8'));

describe('CHALLENGER M1-2: Downstream Similarity Clustering (ConversationalShell)', () => {
  const similarityEngine = new SimilarityEngine();
  const miner = new ArchetypeMiner();

  it('empirically verifies planes and arc achieve composite similarity >= 0.80', () => {
    const anatomySim = similarityEngine.calculateAnatomySimilarity(planesFixture.anatomy, arcFixture.anatomy);
    const stateSim = similarityEngine.calculateStateSimilarity(planesFixture.stateMachine.states, arcFixture.stateMachine.states);
    const compositeSim = similarityEngine.computeCompositeSimilarity(planesFixture, arcFixture);

    assert.ok(compositeSim >= 0.80, `Expected composite similarity >= 0.80, got ${compositeSim}`);
    assert.equal(anatomySim, 1.0, `Expected identical anatomy roles, got ${anatomySim}`);
    assert.equal(stateSim, 1.0, `Expected identical state lists, got ${stateSim}`);
    assert.equal(compositeSim, 1.0, `Expected composite similarity 1.0, got ${compositeSim}`);
  });

  it('empirically verifies clustering correctly merges planes and arc into ConversationalShell', () => {
    const clusters = miner.mineArchetypesFromCorpus([planesFixture, arcFixture, buiFixture], 0.80);

    assert.equal(clusters.length, 1, 'Must produce exactly 1 cluster for ConversationalShell');
    const cluster = clusters[0];
    assert.equal(cluster.inducedArchetype.suggestedName, 'ConversationalShell');
    assert.equal(cluster.memberDnaIds.length, 2);
    assert.ok(cluster.memberDnaIds.includes('planes-ai-chat-01'));
    assert.ok(cluster.memberDnaIds.includes('arc-agent-run-01'));

    // Check mandatory core roles
    const mandatoryRoles = cluster.inducedArchetype.coreMandatoryRoles;
    assert.ok(mandatoryRoles.includes('ChatShell'));
    assert.ok(mandatoryRoles.includes('MessageStreamViewport'));
    assert.ok(mandatoryRoles.includes('MessageList'));
    assert.ok(mandatoryRoles.includes('ComposerDock'));
    assert.ok(mandatoryRoles.includes('AutoResizingInput'));
    assert.ok(mandatoryRoles.includes('SubmitButton'));

    // Check shared states
    const sharedStates = cluster.inducedArchetype.sharedStates;
    assert.ok(sharedStates.includes('idle_empty'));
    assert.ok(sharedStates.includes('typing_with_content'));
    assert.ok(sharedStates.includes('submitting'));
    assert.ok(sharedStates.includes('streaming_response'));
  });

  it('empirically verifies bui-approval-card-01 is isolated from ConversationalShell', () => {
    const compositePlanesBui = similarityEngine.computeCompositeSimilarity(planesFixture, buiFixture);
    const compositeArcBui = similarityEngine.computeCompositeSimilarity(arcFixture, buiFixture);

    assert.ok(compositePlanesBui < 0.40, `Planes vs BUI similarity must be < 0.40, got ${compositePlanesBui}`);
    assert.ok(compositeArcBui < 0.40, `Arc vs BUI similarity must be < 0.40, got ${compositeArcBui}`);
  });
});

describe('CHALLENGER M1-2: ApprovalGate Synthesis Viability & Runtime Contracts', () => {
  const compiler = new CleanRoomCompiler();
  const gates = new UnifiedCRPQualityGates();
  const guardian = new ContextIsolationGuardian();

  guardian.registerProtectedSourceIdentifiers(['useplanes', 'beautiful-ui', 'arc-ui-private']);

  it('synthesizes production React TSX for ApprovalGate with correct state machine and accessibility', () => {
    const tsx = compiler.compileToReact({ dna: buiFixture });

    // Component name and exports
    assert.ok(tsx.includes('export const ApprovalGate: React.FC<ApprovalGateProps>'), 'Must export ApprovalGate');
    assert.ok(tsx.includes("export type ComponentState = 'pending_review' | 'inspecting_diff' | 'approved' | 'rejected'"));
    assert.ok(tsx.includes("status = 'pending_review'"), 'Initial state must be pending_review');

    // Accessibility and motion physics
    assert.ok(tsx.includes('role="alertdialog"'), 'Must maintain alertdialog ARIA role');
    assert.ok(tsx.includes('stiffness: 260'), 'Must maintain fitted stiffness');
    assert.ok(tsx.includes('damping: 22'), 'Must maintain fitted damping');
    assert.ok(tsx.includes('mass: 1'), 'Must maintain fitted mass');

    // Quality gate pass
    const antiSlopReport = gates.evaluateAntiSlop(tsx);
    assert.equal(antiSlopReport.passed, true, `Must pass anti-slop: ${antiSlopReport.details}`);

    const leakageReport = gates.evaluateCleanRoomLeakage(tsx, ['const proprietaryApprovalSnippet = "leak";']);
    assert.equal(leakageReport.passed, true);

    const audit = guardian.auditSynthesizedOutput(tsx);
    assert.equal(audit.safe, true, `Synthesized code must not contain vendor tokens: ${JSON.stringify(audit.detectedTokens)}`);
  });

  it('synthesizes Hub GenUI specification with all subcomponent slots and event bindings', () => {
    const genUi = compiler.compileToHubGenUISpec({ dna: buiFixture });

    assert.equal(genUi.schemaVersion, 'hub.genui.v1');
    assert.equal(genUi.archetypeRef, 'ApprovalGate');
    assert.equal(genUi.layout.props.density, 'normal');

    const slotRoles = genUi.slots.map((s) => s.role);
    assert.ok(slotRoles.includes('ToolSummaryHeader'), 'Must include ToolSummaryHeader slot');
    assert.ok(slotRoles.includes('ActionDiffViewer'), 'Must include ActionDiffViewer slot');
    assert.ok(slotRoles.includes('ActionDecisionCluster'), 'Must include ActionDecisionCluster slot');

    assert.equal(genUi.runtimeBinding.approvalTopic, 'agent.tool.request_approval');
    assert.equal(genUi.runtimeBinding.streamStateTopic, 'agent.run.stream');
    assert.equal(genUi.runtimeBinding.submitAction, 'agent.user.prompt');
  });
});

describe('CHALLENGER M1-2: Vulnerability Audit (SimilarityEngine rootRole vs role)', () => {
  const similarityEngine = new SimilarityEngine();

  it('AUDIT FINDING: SimilarityEngine evaluates treeA.role === treeB.role; when both use rootRole, tree.role is undefined === undefined (true)', () => {
    // Construct two completely disjoint components that both define rootRole
    const disjointA = { rootRole: 'CompletelyDifferentAlpha', subcomponents: [] };
    const disjointB = { rootRole: 'CompletelyDifferentBeta', subcomponents: [] };

    const score = similarityEngine.calculateAnatomySimilarity(disjointA, disjointB);

    // Because treeA.role is undefined and treeB.role is undefined:
    // undefined === undefined -> true -> rootMatch awards 0.3!
    // True score should be 0.0 because intersection is empty and root roles differ!
    assert.equal(
      score,
      0.3,
      'Documents the flaw in SimilarityEngine: awarding 0.3 to disjoint components when rootRole is used'
    );
  });
});
