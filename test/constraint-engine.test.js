const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { DependencyGraph } = require('../src/constraints/graph.js');
const { resolveTypographySafeArea } = require('../src/constraints/typography.js');
const { resolveBackgroundProductContrast } = require('../src/constraints/contrast.js');
const { resolveViewportCameraRig } = require('../src/constraints/geometry.js');
const { resolveMotionReducedScaling } = require('../src/constraints/motion.js');
const { resolvePerformanceFpsTier } = require('../src/constraints/performance.js');
const { ConstraintEngine } = require('../src/constraints/engine.js');

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
  // Long headline that would overflow 22ch container
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
  // Dark background test (baseline)
  const darkResult = resolveBackgroundProductContrast('#0c0d0e', 1.0);
  assert.equal(darkResult.valid, true);
  assert.equal(darkResult.compensatedRimLight, 1.0, 'Baseline dark background requires 1.0 rim light');

  // Lighter background test (e.g., steel gray #666e75)
  const brightResult = resolveBackgroundProductContrast('#666e75', 1.0);
  assert.equal(brightResult.valid, true);
  assert.ok(brightResult.compensatedRimLight > 1.0, 'Bright background must elevate rim light to preserve edge contrast');
  assert.ok(brightResult.contrastRatio >= 4.5, 'Must maintain minimum contrast ratio >= 4.5:1');

  // Extreme glare background that cannot be reconciled safely
  const glareResult = resolveBackgroundProductContrast('#ffffff', 1.0);
  assert.equal(glareResult.valid, false, 'Must reject pure white glare background on black anodized product');
  assert.match(glareResult.reason, /contrast/i);
});

test('C3 Viewport ↔ Camera Rig Constraint: recalculates FOV and camera distance in mobile portrait', () => {
  // Desktop 16:9
  const desktop = resolveViewportCameraRig(1440 / 900, 24, 2.4);
  assert.equal(desktop.portrait, false);
  assert.equal(desktop.fov, 24);
  assert.equal(desktop.distance, 2.4);

  // Mobile portrait 9:19.5 (390x844)
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
  // High FPS (60fps)
  const tierHigh = resolvePerformanceFpsTier(58);
  assert.equal(tierHigh.tier, 'HIGH');
  assert.equal(tierHigh.fbmNoiseActive, true);
  assert.equal(tierHigh.bloomActive, true);

  // Medium FPS (40fps)
  const tierMed = resolvePerformanceFpsTier(40);
  assert.equal(tierMed.tier, 'MEDIUM');
  assert.equal(tierMed.fbmNoiseActive, true);
  assert.equal(tierMed.bloomActive, false);

  // Low FPS (20fps)
  const tierLow = resolvePerformanceFpsTier(20);
  assert.equal(tierLow.tier, 'LOW');
  assert.equal(tierLow.fbmNoiseActive, false, 'Must disable heavy FBM noise shader on low FPS');
  assert.equal(tierLow.bloomActive, false);
  assert.equal(tierLow.barsActive, true, 'Must preserve 16 tone bars intact without dropping frames');
});

test('ConstraintEngine: resolves full delta with dependency propagation and derived compensations', () => {
  const opxyIr = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'dna-ir.json'), 'utf8'));
  const engine = new ConstraintEngine(opxyIr);

  // Propose delta: change background color to steel gray
  const delta = {
    'hero.surface.ambientDarkness': '#555d64',
    'hero.copy.claim': 'a synthesizer, a sampler and a sequencer. one instrument, all black and machined in precision steel.'
  };

  const resolution = engine.resolveDelta(delta);
  assert.equal(resolution.valid, true, `Resolution must be valid: ${resolution.errors?.join(', ') || ''}`);
  assert.equal(resolution.resolvedDelta['hero.surface.ambientDarkness'], '#555d64');
  
  // Verify derived compensations were generated automatically by the constraint engine
  const derivedParams = Object.keys(resolution.derivedCompensations);
  assert.ok(derivedParams.includes('hero.product.rimLightCompensation'), 'Must generate rim light compensation');
  assert.ok(resolution.derivedCompensations['hero.product.rimLightCompensation'] > 1.0);
});
