const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { DependencyGraph } = require('../src/constraints/graph.js');
const { resolveTypographySafeArea } = require('../src/constraints/typography.js');
const { resolveBackgroundProductContrast } = require('../src/constraints/contrast.js');
const { resolveViewportCameraRig, resolveCollectionGeometry } = require('../src/constraints/geometry.js');
const { resolveMotionReducedScaling } = require('../src/constraints/motion.js');
const { resolvePerformanceFpsTier } = require('../src/constraints/performance.js');
const {
  ConstraintEngine,
  calcAPCA,
  searchMonotonicContrast,
  fontLookupAPCA,
  solveOptimalScrimOpacity
} = require('../src/constraints/engine.js');

test('DependencyGraph: builds DAG, detects dependencies and topological order', () => {
  const graph = new DependencyGraph();
  graph.addNode('typography.scale', { type: 'number' });
  graph.addNode('headline.boundingBox', { type: 'box' });
  graph.addNode('hero.safeArea', { type: 'area' });

  graph.addEdge('typography.scale', 'headline.boundingBox', 'scales-box');
  graph.addEdge('headline.boundingBox', 'hero.safeArea', 'contains-box');

  const order = graph.topologicalSort();
  assert.deepEqual(order, ['typography.scale', 'headline.boundingBox', 'hero.safeArea']);
  assert.deepEqual(graph.getDependents('typography.scale'), ['headline.boundingBox']);
  assert.deepEqual(graph.getDependencies('hero.safeArea'), ['headline.boundingBox']);
});

test('DependencyGraph: detects and throws on circular dependency', () => {
  const graph = new DependencyGraph();
  graph.addNode('A', {});
  graph.addNode('B', {});
  graph.addEdge('A', 'B', 'rule1');
  graph.addEdge('B', 'A', 'rule2');

  assert.throws(() => graph.topologicalSort(), /cycle detected/i);
});

test('C1 Typography ↔ SafeArea Constraint: compresses scale when headline exceeds container', () => {
  const longText = 'a revolutionary ultra-wide high-polyphony dynamic spatial modular synthesizer for professional acoustic performances';
  const containerWidthPx = 320;
  const initialFontSizePx = 36;
  const maxCh = 22;

  const result = resolveTypographySafeArea(longText, initialFontSizePx, containerWidthPx, maxCh);
  assert.equal(result.compensated, true, 'Must indicate compensation occurred');
  assert.ok(result.compensatedFontSizePx < initialFontSizePx, 'Compensated font size must be smaller than initial');
  assert.ok(result.compensatedFontSizePx >= 14, 'Must not shrink below minimum readable scale (14px)');
  assert.equal(result.recommendedWrap, 'balance', 'Must recommend balanced wrapping');
});

test('C2 Background ↔ Product Lighting Constraint: compensates rim light when background gets brighter', () => {
  const darkResult = resolveBackgroundProductContrast('#0c0d0e', 1.0);
  assert.equal(darkResult.valid, true);
  assert.equal(darkResult.compensatedRimLight, 1.0, 'Baseline dark background requires 1.0 rim light');

  const brightResult = resolveBackgroundProductContrast('#666e75', 1.0);
  assert.equal(brightResult.valid, true);
  assert.ok(brightResult.compensatedRimLight > 1.0, 'Bright background must elevate rim light to preserve edge contrast');
  assert.ok(brightResult.contrastRatio >= 4.5, 'Must maintain minimum contrast ratio >= 4.5:1');

  const glareResult = resolveBackgroundProductContrast('#ffffff', 1.0);
  assert.equal(glareResult.valid, false, 'Must reject pure white glare background on black anodized product');
  assert.match(glareResult.reason, /contrast/i);
});

test('C3 Viewport ↔ Camera Rig Constraint: recalculates FOV and camera distance in mobile portrait', () => {
  const desktop = resolveViewportCameraRig(1440 / 900, 24, 2.4);
  assert.equal(desktop.portrait, false);
  assert.equal(desktop.fov, 24);
  assert.equal(desktop.distance, 2.4);

  const mobile = resolveViewportCameraRig(390 / 844, 24, 2.4);
  assert.equal(mobile.portrait, true);
  assert.ok(mobile.fov > 24, 'Portrait FOV must be wider to keep product and claims visible');
  assert.ok(mobile.distance > 2.4, 'Camera must pull back slightly to prevent clipping');
  assert.ok(mobile.safeAreaOffset > 0, 'Safe area offset must be provided for top navigation and claims');
});

test('C4 Motion ↔ Reduced Motion Constraint: dampens kinetic energy when prefers-reduced-motion is true', () => {
  const normalMotion = resolveMotionReducedScaling(false, 0.12, 0.8);
  assert.equal(normalMotion.damp, 0.12);
  assert.equal(normalMotion.enableFbmDrift, true);

  const reducedMotion = resolveMotionReducedScaling(true, 0.12, 0.8);
  assert.equal(reducedMotion.damp, 1.0, 'Reduced motion must snap camera with immediate damping');
  assert.equal(reducedMotion.duration, 0.01, 'Durations must collapse to near zero');
  assert.equal(reducedMotion.enableFbmDrift, false, 'Drifting background shaders must freeze');
  assert.equal(reducedMotion.allowTranslations, false, 'Translational bounce must be disabled');
});

test('C5 Performance ↔ Rendering Tier Constraint: falls back gracefully on low FPS', () => {
  const tierHigh = resolvePerformanceFpsTier(58);
  assert.equal(tierHigh.tier, 'HIGH');
  assert.equal(tierHigh.fbmNoiseActive, true);
  assert.equal(tierHigh.bloomActive, true);

  const tierMed = resolvePerformanceFpsTier(40);
  assert.equal(tierMed.tier, 'MEDIUM');
  assert.equal(tierMed.fbmNoiseActive, true);
  assert.equal(tierMed.bloomActive, false);

  const tierLow = resolvePerformanceFpsTier(20);
  assert.equal(tierLow.tier, 'LOW');
  assert.equal(tierLow.fbmNoiseActive, false, 'Must disable heavy FBM noise shader on low FPS');
  assert.equal(tierLow.bloomActive, false);
  assert.equal(tierLow.barsActive, true, 'Must preserve 16 tone bars intact without dropping frames');
});

test('C6 Collection Cardinality ↔ Layout Geometry Constraint: adapts layout mode and scroll pin budget', () => {
  // Small collection: 3 items (within archetype benchmark)
  const small = resolveCollectionGeometry(3, 3);
  assert.equal(small.layoutMode, 'static-grid');
  assert.equal(small.columns, 3);
  assert.equal(small.scrollPinMultiplier, 1.0);
  assert.equal(small.paginationRequired, false);

  // Medium collection: 6 items (horizontal slider pinned via ScrollTrigger)
  const medium = resolveCollectionGeometry(6, 3);
  assert.equal(medium.layoutMode, 'horizontal-slider');
  assert.equal(medium.columns, 6);
  assert.ok(medium.scrollPinMultiplier > 1.0, 'Must extend scroll pin multiplier for 6 items');
  assert.equal(medium.paginationRequired, false);

  // Large collection: 14 items (paginated / virtualized)
  const large = resolveCollectionGeometry(14, 3);
  assert.equal(large.layoutMode, 'paginated-virtual-slider');
  assert.equal(large.columns, 4);
  assert.equal(large.paginationRequired, true);
  assert.equal(large.pages, 4);
});

test('ConstraintEngine: resolves full delta with dependency propagation and derived compensations', () => {
  const opxyIr = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'dna-ir.json'), 'utf8'));
  const engine = new ConstraintEngine(opxyIr);

  const delta = {
    'hero.surface.ambientDarkness': '#555d64',
    'hero.copy.claim': 'a synthesizer, a sampler and a sequencer. one instrument, all black and machined in precision steel.',
    'collection.cardinality': 7
  };

  const resolution = engine.resolveDelta(delta);
  assert.equal(resolution.valid, true, `Resolution must be valid: ${resolution.errors?.join(', ') || ''}`);
  assert.equal(resolution.resolvedDelta['hero.surface.ambientDarkness'], '#555d64');
  
  const derivedParams = Object.keys(resolution.derivedCompensations);
  assert.ok(derivedParams.includes('hero.product.rimLightCompensation'), 'Must generate rim light compensation');
  assert.ok(resolution.derivedCompensations['hero.product.rimLightCompensation'] > 1.0);

  // Verify C6 derived compensations
  assert.equal(resolution.derivedCompensations['collection.layoutMode'], 'horizontal-slider');
  assert.equal(resolution.derivedCompensations['collection.columns'], 7);
  assert.ok(resolution.derivedCompensations['collection.scrollPinMultiplier'] > 1.0);
});

test('APCA 0.0.98G-4g: evaluates psychophysical contrast across polarities and black level glare', () => {
  // W3C reference: black on white gives Lc ~ +106
  const bow = calcAPCA('#000000', '#ffffff');
  assert.ok(bow >= 105 && bow <= 107.5, `BoW contrast should be ~106, got ${bow}`);

  // W3C reference: white on black gives Lc ~ -108
  const wob = calcAPCA('#ffffff', '#000000');
  assert.ok(wob <= -106.5 && wob >= -109.5, `WoB contrast should be ~-108, got ${wob}`);

  // Low contrast glare / soft-clip
  const lowContrast = calcAPCA('#777777', '#777777');
  assert.equal(lowContrast, 0.0, 'Identical colors must evaluate to 0 contrast');
});

test('fontLookupAPCA: maps APCA contrast scores to compliant font sizes and weights', () => {
  const fluent = fontLookupAPCA(78, 400);
  assert.equal(fluent.compliant, true);
  assert.equal(fluent.minFontSizePx, 16);
  assert.equal(fluent.rating, 'fluent-body');

  const headline = fontLookupAPCA(62, 700);
  assert.equal(headline.compliant, true);
  assert.equal(headline.minFontSizePx, 18);
  assert.equal(headline.rating, 'sub-heading');

  const fail = fontLookupAPCA(12, 400);
  assert.equal(fail.compliant, false);
  assert.equal(fail.rating, 'inadmissible');
});

test('solveOptimalScrimOpacity: computes minimal overlay opacity for white text on light backgrounds', () => {
  // Light gray background #e5e5e5 with white text #ffffff has very poor contrast
  const unassisted = Math.abs(calcAPCA('#ffffff', '#e5e5e5'));
  assert.ok(unassisted < 25, `Unassisted contrast should be poor (got ${unassisted})`);

  // Solve scrim with target Lc = 60
  const scrim = solveOptimalScrimOpacity('#ffffff', '#e5e5e5', { targetLc: 60 });
  assert.equal(scrim.solved, true);
  assert.ok(scrim.opacity > 0.3 && scrim.opacity < 0.7, `Optimal opacity should be mid-range, got ${scrim.opacity}`);
  assert.ok(scrim.achievedLc >= 60, `Achieved Lc (${scrim.achievedLc}) must meet or exceed target 60`);

  // If text already has high contrast (e.g. white on #050505), opacity must be 0
  const noScrim = solveOptimalScrimOpacity('#ffffff', '#050505', { targetLc: 60 });
  assert.equal(noScrim.solved, true);
  assert.equal(noScrim.opacity, 0.0);
  assert.equal(noScrim.cssScrim, 'transparent');
});

test('searchMonotonicContrast: solves compliant text hex in OKLCH converging to target Lc', () => {
  const darkBg = '#121214';
  const targetLc = 75;
  const result = searchMonotonicContrast(darkBg, targetLc, 'body');
  assert.ok(result?.hex);

  const achieved = Math.abs(calcAPCA(result.hex, darkBg));
  assert.ok(Math.abs(achieved - targetLc) < 1.0, `Achieved Lc (${achieved}) must be within 1.0 of target`);
});
