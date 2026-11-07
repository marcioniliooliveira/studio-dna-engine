const assert = require('assert');
const { CleanRoomCompiler } = require('../../../src/generators/clean-room-compiler');
const { UnifiedCRPQualityGates } = require('../../../src/qa/unified-crp-quality-gates');
const { HubComponentCatalog } = require('../../../src/hub/component-catalog');
const { StudioToHubExporter } = require('../../../src/hub/hub-exporter');

console.log('[Audit] Testing CleanRoomCompiler...');
const compiler = new CleanRoomCompiler();
const dnaMock = {
  identity: { suggestedArchetype: 'DraggableWidgetGrid', semanticName: 'DraggableWidgetGrid' },
  stateMachine: { states: ['idle_locked', 'edit_mode', 'dragging_active'], initialState: 'idle_locked' },
  geometryConstraints: { layoutMode: 'grid' },
  motionDynamics: { transitions: [{ curveParams: { stiffness: 250, damping: 20, mass: 1 } }] },
  provenance: { corpusHash: 'test-hash-123' }
};

const reactCode = compiler.compileToReact({ dna: dnaMock });
assert.ok(reactCode.includes('export const DraggableWidgetGrid'), 'Should generate DraggableWidgetGrid component');
assert.ok(reactCode.includes('framer-motion'), 'Should import framer-motion');
assert.ok(reactCode.includes('test-hash-123'), 'Should include provenance hash');
console.log('[Audit] CleanRoomCompiler.compileToReact: OK');

const genUiSpec = compiler.compileToHubGenUISpec({ dna: dnaMock });
assert.strictEqual(genUiSpec.schemaVersion, 'hub.genui.v1');
assert.strictEqual(genUiSpec.archetypeRef, 'DraggableWidgetGrid');
assert.strictEqual(genUiSpec.layout.type, 'bento-draggable-grid');
console.log('[Audit] CleanRoomCompiler.compileToHubGenUISpec: OK');

console.log('[Audit] Testing UnifiedCRPQualityGates...');
const gates = new UnifiedCRPQualityGates();

const boxPass = gates.evaluateBoxDiff({ width: 100, height: 100 }, { width: 101, height: 100.5 });
assert.strictEqual(boxPass.passed, true);
const boxFail = gates.evaluateBoxDiff({ width: 100, height: 100 }, { width: 105, height: 100 });
assert.strictEqual(boxFail.passed, false);
console.log('[Audit] UnifiedCRPQualityGates.evaluateBoxDiff: OK');

const motionPass = gates.evaluateMotionTiming(300, 310);
assert.strictEqual(motionPass.passed, true);
const motionFail = gates.evaluateMotionTiming(300, 325);
assert.strictEqual(motionFail.passed, false);
console.log('[Audit] UnifiedCRPQualityGates.evaluateMotionTiming: OK');

const slopClean = gates.evaluateAntiSlop('const a = 1;');
assert.strictEqual(slopClean.passed, true);
const slopDirty = gates.evaluateAntiSlop('const bad = "TODO: implement";');
assert.strictEqual(slopDirty.passed, false);
console.log('[Audit] UnifiedCRPQualityGates.evaluateAntiSlop: OK');

const leakClean = gates.evaluateCleanRoomLeakage('const a = 1;', ['some proprietary line of code that is long enough']);
assert.strictEqual(leakClean.passed, true);
const leakDirty = gates.evaluateCleanRoomLeakage('contains some proprietary line of code that is long enough here', ['some proprietary line of code that is long enough']);
assert.strictEqual(leakDirty.passed, false);
console.log('[Audit] UnifiedCRPQualityGates.evaluateCleanRoomLeakage: OK');

console.log('[Audit] Testing HubComponentCatalog...');
const catalog = new HubComponentCatalog();
const archetypes = catalog.listArchetypes();
assert.strictEqual(archetypes.length, 8, 'Must discover exactly 8 archetypes');
for (const arch of archetypes) {
  assert.ok(arch.archetypeId, 'Archetype must have archetypeId');
  assert.ok(arch.filePath, 'Archetype must have filePath');
  assert.ok(arch.raw, 'Archetype must have raw JSON');
}
console.log('[Audit] HubComponentCatalog.listArchetypes: OK (8 archetypes)');

console.log('[Audit] Testing StudioToHubExporter...');
const exporter = new StudioToHubExporter();
assert.ok(exporter, 'StudioToHubExporter instantiable');
console.log('[Audit] StudioToHubExporter: OK');

console.log('[Audit] ALL LOGIC AUDIT CHECKS PASSED EMPIRICALLY');
