const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { ShadcnRegistryAdapter } = require('../src/acquisition/adapters/shadcn-registry-adapter');
const { CleanRoomCompiler } = require('../src/generators/clean-room-compiler');
const { UnifiedCRPQualityGates } = require('../src/qa/unified-crp-quality-gates');
const { HubAgentRuntime } = require('../src/runtime/hub-agent-runtime');
const { ReferenceAdoptionRegistry } = require('../src/hub/adoption-registry');
const { HubTokenAndAssetBridge } = require('../src/hub/token-and-asset-bridge');
const { StudioToHubExporter } = require('../src/hub/hub-exporter');

const ROOT = path.resolve(__dirname, '..');
const WIDGET_GRID_DNA_PATH = path.join(ROOT, 'copias/21st-dev/draggable-widget-grid/dna.json');
const VAULT_ARCHETYPES_DIR = path.join(ROOT, 'design-vault/components/archetypes');

test('ShadcnRegistryAdapter: parses npx shadcn@latest add command for 21st.dev draggable-widget-grid', () => {
  const adapter = new ShadcnRegistryAdapter();
  const cmd = 'npx shadcn@latest add "https://21st.dev/r/carolinaraulino/draggable-widget-grid"';
  const parsed = adapter.parseRegistryInput(cmd);

  assert.equal(parsed.provider, '21st.dev');
  assert.equal(parsed.namespace, 'carolinaraulino');
  assert.equal(parsed.slug, 'draggable-widget-grid');
  assert.equal(parsed.registryUrl, 'https://21st.dev/r/carolinaraulino/draggable-widget-grid');

  const manifest = adapter.ingestRegistryPayload(cmd, {
    name: 'draggable-widget-grid',
    dependencies: ['framer-motion', 'lucide-react'],
    files: [{ path: 'components/ui/draggable-widget-grid.tsx', content: 'export const Grid = () => null;' }]
  });

  assert.equal(manifest.componentId, 'carolinaraulino-draggable-widget-grid');
  assert.match(manifest.corpusHash, /^[a-f0-9]{64}$/);
});

test('Design Vault: all 8 canonical archetypes exist and are valid JSON', () => {
  const expected = [
    'ConversationalShell.archetype.json',
    'ApprovalGate.archetype.json',
    'ExecutionTimeline.archetype.json',
    'DraggableWidgetGrid.archetype.json',
    'PromptComposer.archetype.json',
    'ToolCallDisclosure.archetype.json',
    'ReasoningSummary.archetype.json',
    'ArtifactPreview.archetype.json'
  ];

  for (const file of expected) {
    const fullPath = path.join(VAULT_ARCHETYPES_DIR, file);
    assert.ok(fs.existsSync(fullPath), `Missing archetype file: ${file}`);
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    assert.ok(typeof data.archetypeId === 'string' && data.archetypeId.length > 0);
    const hasSlots =
      (Array.isArray(data.mandatorySlots) && data.mandatorySlots.length >= 2) ||
      (Array.isArray(data.canonicalAnatomy?.slots) && data.canonicalAnatomy.slots.length >= 2);
    assert.ok(hasSlots, `Archetype ${file} must define canonical slots`);
  }
});

test('CleanRoomCompiler: compiles DraggableWidgetGrid DNA into interactive React TSX and Hub GenUI Spec', () => {
  const dna = JSON.parse(fs.readFileSync(WIDGET_GRID_DNA_PATH, 'utf-8'));
  const compiler = new CleanRoomCompiler();

  const reactTsx = compiler.compileToReact({ dna });
  assert.ok(reactTsx.includes('export const DraggableWidgetGrid'));
  assert.ok(reactTsx.includes("export type WidgetSpan = '1x1' | '2x1' | '1x2' | '2x2'"));
  assert.ok(reactTsx.includes('handleSwap'));
  assert.ok(reactTsx.includes('cycleSpan'));
  assert.ok(reactTsx.includes('stiffness: 300'));
  assert.ok(reactTsx.includes('damping: 28'));

  const genUiSpec = compiler.compileToHubGenUISpec({ dna });
  assert.equal(genUiSpec.schemaVersion, 'hub.genui.v1');
  assert.equal(genUiSpec.archetypeRef, 'DraggableWidgetGrid');
  assert.equal(genUiSpec.layout.type, 'bento-draggable-grid');
  assert.equal(genUiSpec.layout.props.allowReorder, true);
  assert.equal(genUiSpec.layout.props.allowSpanResize, true);
  assert.deepEqual(genUiSpec.layout.props.supportedSpans, ['1x1', '2x1', '1x2', '2x2']);
  assert.equal(genUiSpec.runtimeBinding.reorderActionTopic, 'agent.genui.layout_updated');
});

test('HubAgentRuntime: manages DraggableWidgetGrid state, reordering, span resizing, and locked protection', () => {
  const runtime = new HubAgentRuntime();
  const initRes = runtime.initializeWidgetGrid('workspace-bento-1', [
    { id: 'w-approval', title: 'Approval Gate', widgetType: 'ApprovalGate', span: '2x1', locked: false },
    { id: 'w-timeline', title: 'Execution Timeline', widgetType: 'ExecutionTimeline', span: '1x2', locked: false },
    { id: 'w-security', title: 'Security Monitor', widgetType: 'metric-card', span: '1x1', locked: true }
  ]);

  assert.equal(initRes.topic, 'agent.genui.layout_state');
  assert.equal(initRes.widgets.length, 3);

  const reorderRes = runtime.reorderWidgetGrid('workspace-bento-1', 'w-timeline', 'w-approval', 'operator-01');
  assert.equal(reorderRes.topic, 'agent.genui.layout_updated');
  assert.deepEqual(reorderRes.orderedIds, ['w-timeline', 'w-approval', 'w-security']);
  assert.match(reorderRes.signature, /^[a-f0-9]{64}$/);

  const resizeRes = runtime.resizeWidgetSpan('workspace-bento-1', 'w-approval', '2x2', 'operator-01');
  assert.equal(resizeRes.topic, 'agent.genui.widget_resized');
  assert.equal(resizeRes.newSpan, '2x2');

  // Locked widget must reject reorder, resize, or removal
  assert.throws(
    () => runtime.reorderWidgetGrid('workspace-bento-1', 'w-security', 'w-timeline', 'operator-01'),
    /widgets bloqueados/
  );
  assert.throws(
    () => runtime.removeWidgetFromGrid('workspace-bento-1', 'w-security', 'operator-01'),
    /está bloqueado/
  );

  const removeRes = runtime.removeWidgetFromGrid('workspace-bento-1', 'w-timeline', 'operator-01');
  assert.equal(removeRes.topic, 'agent.genui.widget_removed');
  assert.deepEqual(removeRes.remainingIds, ['w-approval', 'w-security']);
});

test('Hub Integration Bridge: certifies, registers adoption, sanitizes assets, and exports DraggableWidgetGrid bundle', () => {
  const dna = JSON.parse(fs.readFileSync(WIDGET_GRID_DNA_PATH, 'utf-8'));
  const compiler = new CleanRoomCompiler();
  const gates = new UnifiedCRPQualityGates();
  const registry = new ReferenceAdoptionRegistry();
  const exporter = new StudioToHubExporter();

  const synthesizedCode = compiler.compileToReact({ dna });

  const reports = [
    gates.evaluateBoxDiff({ width: 960, height: 640 }, { width: 960, height: 640 }),
    gates.evaluateMotionTiming(220, 220),
    gates.evaluateAntiSlop(synthesizedCode),
    gates.evaluateCleanRoomLeakage(synthesizedCode, ['const secretProprietary21stCode = "do_not_copy_this_line";'])
  ];

  const componentId = dna.componentId || dna.identity.id || dna.identity.componentId;
  const certRecord = gates.issueCertificationRecord(componentId, reports);
  assert.equal(certRecord.verdict, 'CERTIFIED');

  const adoption = registry.registerAdoptionDecision({
    referenceId: componentId,
    archetypeId: 'DraggableWidgetGrid',
    decision: 'ADAPT_BOTH',
    certificationRecord: certRecord,
    rationale: 'Interactive Bento Grid for Hub GenUI and React Dashboard'
  });

  assert.equal(adoption.decision, 'ADAPT_BOTH');

  const bundle = exporter.exportComponentBundle({
    dna,
    certificationRecord: certRecord,
    adoptionDecision: adoption,
    svgAssets: {
      dragHandleIcon: '<svg class="proprietary-21st" data-secret="123"><circle cx="6" cy="6" r="2" fill="#ff0055" /></svg>'
    }
  });

  assert.equal(bundle.bundleVersion, 'hub.bundle.v1');
  assert.equal(bundle.archetypeRef, 'DraggableWidgetGrid');
  assert.ok(bundle.sanitizedAssets.dragHandleIcon.includes('fill="currentColor"'));
  assert.ok(!bundle.sanitizedAssets.dragHandleIcon.includes('data-secret'));
  assert.ok(!bundle.sanitizedAssets.dragHandleIcon.includes('proprietary-21st'));
  assert.match(bundle.certification.bundleHash, /^sha256:[a-f0-9]{64}$/);
});

test('HubComponentCatalog: materializes and grants direct access to all 8 canonical components (.tsx + .genui.json)', () => {
  const { HubComponentCatalog } = require('../src/hub/component-catalog');
  const catalog = new HubComponentCatalog();

  const manifest = catalog.materializeAllToDisk();
  assert.equal(manifest.totalComponents, 8);

  const expectedArchetypes = [
    'ConversationalShell',
    'ApprovalGate',
    'ExecutionTimeline',
    'DraggableWidgetGrid',
    'PromptComposer',
    'ToolCallDisclosure',
    'ReasoningSummary',
    'ArtifactPreview'
  ];

  for (const archId of expectedArchetypes) {
    const comp = catalog.getComponent(archId);
    assert.equal(comp.archetypeId, archId);
    assert.ok(fs.existsSync(comp.tsxPath), `Missing materialized TSX for ${archId}`);
    assert.ok(fs.existsSync(comp.genUiPath), `Missing materialized GenUI JSON for ${archId}`);
    assert.ok(comp.reactTsx.includes(`export const ${archId}`));
    assert.equal(comp.genUiSpec.schemaVersion, 'hub.genui.v1');
  }
});
