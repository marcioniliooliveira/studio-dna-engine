'use strict';

const path = require('node:path');
const assert = require('node:assert/strict');
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

const { SpatialRTree, computeTypographicEnergy, computeAreaCV } = require(path.join(PROJECT_ROOT, 'docs/research/v2.6/reference/spatial-rtree'));
const { parseSelectorAst, validateDonutSelector, validateDonutScopeInvariants } = require(path.join(PROJECT_ROOT, 'docs/research/v2.6/reference/css-selector-ast'));
const { decodePng, applyLateralCompetition, computeSaliencyMetrics } = require(path.join(PROJECT_ROOT, 'docs/research/v2.6/reference/png-codec'));
const { SlugFontCompiler } = require(path.join(PROJECT_ROOT, 'docs/research/v2.6/reference/slug-font-compiler'));
const { sRGBToOklch, oklchToSRGB, calcAPCA, searchMonotonicContrast, calculateFluidScale, applyLexicalDamping } = require(path.join(PROJECT_ROOT, 'docs/research/v2.6/reference/apca-contrast'));
const { UniversalScrollBus, projectPointToScreen, evaluateSheetCpuTwin } = require(path.join(PROJECT_ROOT, 'test/v2.6/fixtures/reference-engines'));

console.log('--- 1. Testing SpatialRTree Adversarial Cases ---');
const tree = new SpatialRTree(4);
// Insert 100 identical boxes (coincident geometry)
for (let i = 0; i < 100; i++) {
  tree.insert({ minX: 10, minY: 10, maxX: 20, maxY: 20, id: `coincident-${i}` });
}
assert.equal(tree.all().length, 100, 'All coincident boxes must be stored');
const hitsCoincident = tree.search({ minX: 15, minY: 15, maxX: 15, maxY: 15 });
assert.equal(hitsCoincident.length, 100, 'Search should find all 100 coincident boxes');
console.log('SpatialRTree coincident boxes: PASS');

console.log('--- 2. Testing CSS Selector AST Adversarial Cases ---');
// Direct child combinator
assert.equal(validateDonutSelector('[data-kinetic-slot] > h1').compliant, false);
// Descendant combinator with attribute value
assert.equal(validateDonutSelector('[data-kinetic-slot="hero"] span').compliant, false);
// Pseudo-class self styling
assert.equal(validateDonutSelector('[data-kinetic-slot]:hover').compliant, true);
// Sibling styling (outside slot)
assert.equal(validateDonutSelector('[data-kinetic-slot] + .sibling').compliant, true);
// Sibling with child combinator on sibling outside slot
assert.equal(validateDonutSelector('[data-kinetic-slot] + .sibling > .inner').compliant, true);
// Complex piercing inside nested rules
assert.equal(validateDonutScopeInvariants(`
  .stage {
    [data-kinetic-slot="title"] > h2 { color: blue; }
  }
`).compliant, false);
console.log('CSS Selector AST adversarial cases: PASS');

console.log('--- 3. Testing APCA Contrast Adversarial Cases ---');
// W3C Canonical Pair: Black on White -> ~106.0
const lNorm = calcAPCA('#000000', '#ffffff');
assert.ok(lNorm >= 105.0 && lNorm <= 107.5, `Normal polarity Lc expected ~106, got ${lNorm}`);

// W3C Canonical Pair: White on Black -> ~-108.0
const lRev = calcAPCA('#ffffff', '#000000');
assert.ok(lRev <= -106.5 && lRev >= -109.5, `Reverse polarity Lc expected ~-108, got ${lRev}`);

// Zero contrast (identical colors)
assert.equal(calcAPCA('#123456', '#123456'), 0.0);

// Extreme light on extreme light
assert.equal(calcAPCA('#fafafa', '#fbfbfb'), 0.0);

// Monotonic search convergence
const solved = searchMonotonicContrast('#000000', 90.0, 'body');
const achieved = Math.abs(calcAPCA(solved.hex, '#000000'));
assert.ok(Math.abs(achieved - 90.0) < 1.0, `Achieved ${achieved} should be close to 90.0`);
console.log('APCA Contrast adversarial cases: PASS');

console.log('--- 4. Testing UniversalScrollBus Adversarial Cases ---');
const bus = new UniversalScrollBus({
  viewportHeight: 1000,
  muExpand: 1.0,
  muHold: 2.0,
  muExit: 1.0,
  prePinDistance: 0
});
// t1 = 0, t2 = 1000, t3 = 3000, t4 = 4000
const p0 = bus.calculatePhases(0);
assert.equal(p0.phase, 'PORTAL_EXPAND');
assert.equal(p0.pPortal, 0);

const pMid = bus.calculatePhases(2000);
assert.equal(pMid.phase, 'RIBBON_BROWSE');
assert.equal(pMid.pPortal, 1.0);
assert.equal(pMid.pRibbon, 0.5);

const pExit = bus.calculatePhases(3500);
assert.equal(pExit.phase, 'PORTAL_EXIT');
assert.equal(pExit.pPortal, 0.5);
assert.equal(pExit.pRibbon, 1.0);

const pPast = bus.calculatePhases(5000);
assert.equal(pPast.phase, 'RESUME');
assert.equal(pPast.pPortal, 0.0);
assert.equal(pPast.pRibbon, 1.0);
console.log('UniversalScrollBus adversarial cases: PASS');

console.log('--- 5. Testing Codebase Repairs Regression ---');
// Universal Asset Normalizer CSS
const normalizerPath = path.join(PROJECT_ROOT, 'src/pro/universal-asset-normalizer.js');
const normalizerContent = require('node:fs').readFileSync(normalizerPath, 'utf8');
assert.ok(!normalizerContent.includes('overflow-y: visible !important;\r\n      }\r\n      }'), 'Stray brace eliminated');
assert.ok(normalizerContent.includes('overflow-x: clip !important;'), 'Contains overflow-x clip');

// DAG Scheduler writeLocks
const { pathsIntersect, tasksConflict } = require(path.join(PROJECT_ROOT, 'src/orchestration/dag-scheduler'));
assert.equal(pathsIntersect('src/a.js', 'src/a.js'), true);
assert.equal(pathsIntersect('src/a.js', 'src/b.js'), false);
assert.equal(pathsIntersect('src/**', 'src/nested/file.js'), true);
assert.equal(pathsIntersect('dist/*', 'src/index.js'), false);

const task1 = { id: 't1', writeAllowlist: ['src/components/**'] };
const task2 = { id: 't2', writeAllowlist: ['src/components/WorkStage.tsx'] };
const task3 = { id: 't3', writeAllowlist: ['src/compiler/**'] };
assert.equal(tasksConflict(task1, task2), true, 'Conflicting writes must be flagged');
assert.equal(tasksConflict(task1, task3), false, 'Disjoint writes must not conflict');
console.log('Codebase Repairs regression: PASS');

console.log('\n>>> ALL ADVERSARIAL STRESS TESTS PASSED SUCCESSFULLY! <<<');
