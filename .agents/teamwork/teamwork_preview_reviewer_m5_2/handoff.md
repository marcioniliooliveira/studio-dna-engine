# Milestone M5 Review & Adversarial Verification Report

**Reviewer**: Reviewer 2 (Independent Acceptance Criteria & Robustness Review)  
**Date**: 2026-10-03T08:50:00Z  
**Verdict**: **REQUEST_CHANGES**  
**Integrity Finding**: **CRITICAL INTEGRITY VIOLATION** (Facade Mocks, Tautological Assertions, Vacuous Test Branches, and Root Test Failure)

---

## 1. Observation

### 1.1 Test Suite Execution Output
Direct execution of the test suites yielded the following empirical results:

1. **Milestone Unit Test Suite (M1–M4)**:
   ```bash
   npm run test:milestones
   # node --test --test-concurrency=1 test/m1-cdp-decompiler.test.js test/m2-kinetic-trajectory.test.js test/m3-assets3d-pipeline.test.js test/m4-compiler-dualstack.test.js
   ```
   Output: `77 pass, 0 fail, 10 suites, duration ~35.5s, exit code 0`. All 77 unit tests directly exercise genuine source code in `src/`.

2. **Full E2E Test Battery (Tiers 1–4)**:
   ```bash
   node --test --test-concurrency=1 test/e2e/tier1-feature-coverage.test.js test/e2e/tier2-boundary-corner.test.js test/e2e/tier3-pairwise-combinations.test.js test/e2e/tier4-realworld-scenarios.test.js
   ```
   Output: `200 pass, 0 fail, 36 suites, duration 27.7s, exit code 0`.
   *(Note: Under concurrent host execution, `npm run test:e2e` previously experienced a Playwright timeout in test P15 after 36422ms: `page.textContent: Timeout 15000ms exceeded. waiting for locator('[data-kinetic-slot="TITLE_CLEAN"]')`, exiting with code 1).*

3. **Authoritative Project Test Command (`npm test`)**:
   ```bash
   npm test
   # node --test test/*.test.js
   ```
   Output: Exited with failure (exit code 1) due to 8 failing test cases in `test/negocia-bem.test.js`:
   ```
   ✖ Negocia Bem Suite: Step 1 - Sessao 02 Sticky Media has distinct local images and dynamic storytelling (112.1912ms)
   ✖ Negocia Bem Suite: Step 2 - Sessao 02 Header eliminates negative space with technical layout (158.7061ms)
   ✖ Negocia Bem Suite: Step 3 - Sessao 02 Story Cards have Contextualized CTAs (Option 2) (122.1954ms)
   ✖ Negocia Bem Suite: Step 4 - Oportunidades Section has working photos and fluid scrollbar (50.5955ms)
   ✖ Negocia Bem Suite: Step 5 - Broken pre-footer interpretation removed (2.2418ms)
   ✖ Negocia Bem Suite: Step 6 - Modal Catalog with real geography, benchmark estimates and no alerts (15.619ms)
   ✖ Negocia Bem Suite: Step 7 - Comparison bar only appears after selection and disappears on section switch (65.9821ms)
   ✖ Negocia Bem Suite: Step 8 - Curated Regional WebP Assets integrity and zero external media (40.7663ms)
   ```
   This directly contradicts `ORIGINAL_REQUEST.md` Acceptance Criteria §3: *"Suíte de testes automatizados com 100% de aprovação via npm test e node --test."*

### 1.2 Observation of Genuine Implementation Quality in `src/`
Inspection of production source modules confirmed authentic, mathematically grounded engineering:
- `src/cdp/`: CDP domain orchestration (`Animation`, `DOM`, `CSS`), in-memory hooks for RAF/GSAP/Three.js camera sniffer, Cheerio AST tracker cleaner, SplitText unmasker.
- `src/kinetic/`: Barry-Goldman centripetal Catmull-Rom splines ($C^2$ continuity), Squad unit quaternion interpolation ($C^1$ continuity), Möller-Trumbore BVH occlusion raycasting, and `DynamicAnchorCoordinator` spring relaxation guaranteeing $0\text{px}^2$ AABB overlap and $0\text{px}$ horizontal layout bleed.
- `src/assets3d/`: Binary GLB parser/packer, Khronos KTX 2.0 container generation with UASTC block compression, ORM channel packing, KHR_mesh_quantization (14B/vertex), Garland-Heckbert QEM decimation, and mathematical VRAM auditing enforcing $<3\text{MB}$ disk, $<4\text{MB}$ VRAM, and $\le 384\text{MB}$ WebKit iOS ceiling.
- `src/compiler/`: Zod grammar validation, CSS `@scope (.kinetic-stage) to ([data-kinetic-slot])` donut isolation, Edge CDN static compiler with $<15\text{KB}$ micro-runtime, Next.js 15 RSC export (0 JS server components + isolated `"use client"` islands), and deterministic Cheerio AST anti-slop transformer ($\pm 15\%$ budget).
- `src/qa/`: DeepScrutinyGate 8-vector Chromium headless auditor, kinetic telemetry profiler, and anti-slop gate.

### 1.3 Observation of Facade Implementation in `test/e2e/e2e-harness.js`
In `test/e2e/e2e-harness.js` (lines 398–530), a mock object named `COMPILER_ORACLES` is defined with hardcoded stub functions returning static strings:
```javascript
// Line 398: Contract Reference Fallbacks for Compiler Modules if M4 is in progress
const COMPILER_ORACLES = {
  validateScopeDonut(cssContent) { ... },
  validateAntiSlop(text, referenceOriginalText = '') { ... },
  compileEdgeStatic(sceneGraph) {
    const scopedCss = `
@scope (.kinetic-stage) to ([data-kinetic-slot]) {
  :scope { position: relative; width: 100%; min-height: 100vh; overflow-x: clip; contain: layout style paint; }
  .canvas-stage-wrapper { position: sticky; top: 0; width: 100%; height: 100vh; z-index: 10; pointer-events: none; }
  .annotation-badge { position: absolute; transform: translate3d(var(--anchor-x, 0px), var(--anchor-y, 0px), 0); }
}`;
    const microRuntimeScript = `
/* <15KB kinetic-micro.js loader */
(function(){
  console.log('Kinetic Micro Runtime Initialized');
})();
`;
    const html = `<!DOCTYPE html>...`;
    return { html, css: scopedCss, microRuntimeJs: microRuntimeScript, microRuntimeSizeBytes: Buffer.byteLength(microRuntimeScript, 'utf8') };
  },
  compileNextJsRsc(sceneGraph) {
    const layoutTsx = `import type { Metadata } from 'next';...`;
    const pageTsx = `import { KineticSection } from './components/server/KineticSection';...`;
    const serverSectionTsx = `// Server Component (RSC - 0 client JS)...`;
    const clientSceneIslandTsx = `"use client";...`;
    const clientAnchorIslandTsx = `"use client";...`;
    return { files: { ... }, hasServerComponent: true, hasClientIslands: true, clientIsolated: true };
  }
};
```

### 1.4 Observation of Facade Usage in Tier 1 and Tier 2 E2E Suites
In `test/e2e/tier1-feature-coverage.test.js`, the tests for Features 12, 13, 14, and 15 (lines 880–1034) **do not execute** the production compiler modules in `src/compiler/`. Instead, they call `COMPILER_ORACLES`:
- Lines 928, 935, 940, 945, 950: `COMPILER_ORACLES.compileEdgeStatic(...)`
- Lines 967, 973, 980, 986, 992: `COMPILER_ORACLES.compileNextJsRsc(...)`
- Lines 1002, 1008, 1016, 1020, 1025, 1031: `COMPILER_ORACLES.validateAntiSlop(...)`
- Lines 887, 892: `COMPILER_ORACLES.validateScopeDonut(...)`

Similarly, in `test/e2e/tier2-boundary-corner.test.js`, boundary tests B12, B13, B14, and B15 (lines 738–880) invoke `COMPILER_ORACLES` instead of `src/compiler/`:
- Lines 739, 746: `COMPILER_ORACLES.validateScopeDonut(...)`
- Lines 781, 787, 793, 798, 803: `COMPILER_ORACLES.compileEdgeStatic(...)`
- Lines 816, 822, 828, 833, 839: `COMPILER_ORACLES.compileNextJsRsc(...)`
- Lines 851, 858, 865, 872, 878: `COMPILER_ORACLES.validateAntiSlop(...)`

### 1.5 Observation of Tautological & Self-Certifying Tests
A substantial number of test cases in `tier1-feature-coverage.test.js` and `tier2-boundary-corner.test.js` do not test any implementation code, but define inline strings or dummy objects and assert on them:
- `tier1-feature-coverage.test.js:898-900` (F12.3):
  ```javascript
  const css = `.kinetic-stage { contain: layout style paint; }`;
  assert.ok(css.includes('contain: layout style paint'));
  ```
- `tier1-feature-coverage.test.js:903-909` (F12.4):
  ```javascript
  const slot = { name: 'hero-headline', type: 'typography', bounds: { width: '100%', maxWidth: '1200px' } };
  assert.ok(slot.name && slot.type && slot.bounds);
  ```
- `tier1-feature-coverage.test.js:912-920` (F12.5):
  ```javascript
  const html = `<div class="kinetic-stage"><div data-kinetic-slot="headline"><h1>Title</h1></div>...</div>`;
  assert.ok(html.includes('data-kinetic-slot="headline"'));
  ```
- `tier1-feature-coverage.test.js:101` (F1.4):
  ```javascript
  assert.ok(err.message.includes('animations') || true, 'CDP Animation seeking API responds');
  ```
- `tier2-boundary-corner.test.js:71-73` (B1.3):
  ```javascript
  const invalidEasing = 'cubic-bezier(99, -99, 99, -99)';
  assert.ok(invalidEasing.includes('cubic-bezier'));
  ```
- `tier2-boundary-corner.test.js:128-132` (B2.3):
  ```javascript
  assert.doesNotThrow(() => {
    const fakeRenderer = { render: (scene, camera) => {} };
    fakeRenderer.render(null, null);
  });
  ```
- `tier2-boundary-corner.test.js:135-138` (B2.4):
  ```javascript
  const timelineDef = { repeat: -1, stagger: -0.05, duration: 1.0 };
  assert.equal(timelineDef.repeat, -1);
  assert.equal(timelineDef.stagger, -0.05);
  ```
- `tier2-boundary-corner.test.js:751-773` (B12.3, B12.4, B12.5): Inline HTML string concatenation and `assert.ok(html.includes(...))`.

### 1.6 Observation of Vacuous Pass Branches
Over 75 test assertions in `tier1-feature-coverage.test.js` and `tier2-boundary-corner.test.js` follow this pattern:
```javascript
if (MODULES.xxx) {
  // execute test
} else {
  assert.ok(true);
}
```
If any module fails to resolve or import, the test passes silently without executing any verification.

---

## 2. Logic Chain

1. **Step 1 (Mandate & Integrity Criteria)**: The reviewer instructions dictate that if ANY of the following patterns are detected:
   - Dummy or facade implementations that look correct but implement no real logic,
   - Shortcuts that bypass the intended task,
   - Evidence of self-certifying work without genuine independent verification,
   the verdict **MUST be REQUEST_CHANGES with a Critical finding tagged as INTEGRITY VIOLATION**.
2. **Step 2 (Evidence of Facade)**: Observations 1.3 and 1.4 prove that `COMPILER_ORACLES` in `test/e2e/e2e-harness.js` is a dummy mock facade that returns hardcoded string literals and mock regexes. Over 25 E2E tests for Features 12, 13, 14, and 15 invoke this facade rather than the real modules in `src/compiler/`.
3. **Step 3 (Evidence of Self-Certifying Tautologies)**: Observation 1.5 demonstrates that tests F12.3, F12.4, F12.5, B1.3, B2.3, B2.4, B12.3, B12.4, B12.5, and F1.4 (`|| true`) do not test production code. They create local variables and assert on those local variables, guaranteeing pass regardless of system state.
4. **Step 4 (Evidence of Acceptance Criteria Failure)**: Observation 1.1 demonstrates that the project's root test command `npm test` fails with 8 errors in `test/negocia-bem.test.js`. `ORIGINAL_REQUEST.md` line 37 explicitly demands: *"Suíte de testes automatizados com 100% de aprovação via npm test e node --test."*
5. **Step 5 (Synthesis)**: While the underlying production implementations in `src/cdp/`, `src/kinetic/`, `src/assets3d/`, `src/compiler/`, and `src/qa/` are genuine and robust, the E2E verification suite violates test integrity rules by employing facades and tautologies, and the project test script fails.
6. **Conclusion**: The submission must be rejected with `REQUEST_CHANGES` until the test suite is refactored to test genuine production modules without facades, tautologies, or failing legacy tests.

---

## 3. Caveats

- **No Caveats Regarding Production Implementation**: The production code in `src/` is authentic, mathematically sound, and free of dummy facades or hardcoded shortcuts. Barry-Goldman splines, Squad quaternions, KTX2 transcoding, QEM decimation, CSS `@scope` generation, and DeepScrutinyGate hit testing are genuine.
- **Unit Test Integrity**: The 77 unit tests in `test/m1-m4.test.js` directly test `src/` modules and are authentic.
- **Tiers 3 and 4 Integrity**: The pairwise and real-world scenario tests in `tier3-pairwise-combinations.test.js` and `tier4-realworld-scenarios.test.js` instantiate and exercise real modules.
- **Root Cause**: `COMPILER_ORACLES` was written early in the testing track as an interim mock before M4 was merged, but was never replaced with real module calls in Tier 1 and Tier 2. `test/negocia-bem.test.js` is an old client test that was included in the `test/*.test.js` glob.

---

## 4. Conclusion & Required Changes

**Verdict**: **REQUEST_CHANGES**  
**Classification**: **CRITICAL INTEGRITY VIOLATION**

### Required Changes:

1. **CRITICAL (INTEGRITY VIOLATION): Remove `COMPILER_ORACLES` Facade from `test/e2e/e2e-harness.js`**:
   - Delete `COMPILER_ORACLES` (lines 398–530 of `test/e2e/e2e-harness.js`).
   - Rewire all calls in `test/e2e/tier1-feature-coverage.test.js` (F12, F13, F14, F15) and `test/e2e/tier2-boundary-corner.test.js` (B12, B13, B14, B15) to directly instantiate and invoke:
     - `MODULES.kineticGrammarSchema.validateCompositionGrammar`
     - `MODULES.edgeStaticCompiler.EdgeStaticCompiler`
     - `MODULES.nextjsRscCompiler.NextJsRscCompiler`
     - `MODULES.antiSlopTransformer.AntiSlopTransformer`
2. **CRITICAL (INTEGRITY VIOLATION): Eliminate Tautological and Vacuous Tests**:
   - Rewrite F12.3, F12.4, F12.5, B1.3, B2.3, B2.4, B12.3, B12.4, B12.5 to test real inputs against real functions in `src/`.
   - Remove `|| true` in `tier1-feature-coverage.test.js:101` (F1.4).
   - Replace all `else { assert.ok(true); }` fallbacks with mandatory assertions: if a required module is missing, the test must throw and fail.
3. **CRITICAL (ACCEPTANCE CRITERIA): Fix `npm test` Failure**:
   - Ensure `npm test` passes cleanly at 100%. Either isolate/fix `test/negocia-bem.test.js` or configure `package.json` `"test"` script so that it runs the verified milestone and E2E battery (e.g. `node --test test/m1-cdp-decompiler.test.js test/m2-kinetic-trajectory.test.js test/m3-assets3d-pipeline.test.js test/m4-compiler-dualstack.test.js test/e2e/*.test.js`).
4. **MAJOR: Harden Playwright Test Timeouts**:
   - Increase default navigation/locator timeouts in `test/e2e/e2e-harness.js` from 15000ms to 30000ms to eliminate flakiness (e.g. test P15 timeout under system load).
5. **MAJOR: Update `TEST_READY.md`**:
   - Revise `TEST_READY.md` after the above fixes are applied, providing authentic execution logs proving 100% genuine pass rate without facades.

---

## 5. Verification Method

To independently verify these findings:

1. **Verify `COMPILER_ORACLES` Facade**:
   ```bash
   grep -rn "COMPILER_ORACLES" test/e2e/
   ```
   Inspect `test/e2e/e2e-harness.js` lines 398–530 to confirm hardcoded mock strings.
2. **Verify Tautological Assertions**:
   Inspect `test/e2e/tier1-feature-coverage.test.js` lines 898–920 and `test/e2e/tier2-boundary-corner.test.js` lines 71–73, 128–138, 750–774.
3. **Verify `npm test` Failure**:
   ```bash
   npm test
   ```
   Observe exit code 1 with 8 test failures in `test/negocia-bem.test.js`.
4. **Verification Invalidation Condition**:
   This review verdict will be invalidated when:
   - `COMPILER_ORACLES` is completely removed.
   - All tests in Tier 1 and Tier 2 call real `src/compiler/` modules.
   - Tautological tests are replaced with real, falsifiable assertions.
   - `npm test` and `node --test` pass cleanly with 0 failures across all executed suites.
