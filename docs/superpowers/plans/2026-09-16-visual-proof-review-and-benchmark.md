# Visual Proof, Review Console and Benchmark Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prove that an implemented interface matches the approved intent, behaves correctly across states and is preferred over the previous pipeline.

**Architecture:** A declarative state driver captures an immutable visual matrix from one artifact hash. Deterministic comparison runs before advisory model critique. A local review console presents references, directions, evidence and pairwise choices; only signed human decisions can approve an implementation golden or release.

**Tech Stack:** Node.js 20+, CommonJS, Playwright, Pixelmatch, SSIM implementation selected during dependency review, plain local HTML/CSS/JavaScript, SHA-256, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-16-design-capability-orchestration-v2-design.md`

## Global Constraints

- QA, preview and approval use the same immutable artifact tree hash.
- Intent goldens and implementation goldens are different artifact types.
- Baselines cannot be updated by builders or visual critics.
- Interaction states are declared; the capture engine never guesses selectors or actions.
- A visual critic is advisory and read-only.
- Human review is required for taste, baseline update and release.
- The benchmark definition is frozen before V2 outputs are generated.

---

### Task 1: Freeze V1 benchmark artifacts

**Files:**
- Create: `src/benchmark/benchmark-contract.js`
- Create: `schemas/v2/design-benchmark.schema.json`
- Create: `benchmarks/design-capability-v1/manifest.json`
- Create: `scripts/capture-design-baseline.js`
- Test: `test/design-benchmark-contract.test.js`

**Interfaces:**
- Produces: `validateBenchmarkDefinition(input): DesignBenchmarkDefinition`
- Produces command: `node scripts/capture-design-baseline.js --definition <path>`

- [ ] **Step 1: Write a failing test requiring fixed briefs, clients, reference IDs, viewports, states and scoring weights**
- [ ] **Step 2: Reject scoring weights that do not total 100 and definitions that identify pipeline labels to reviewers**
- [ ] **Step 3: Implement the contract and baseline capture command without mutating client sites**
- [ ] **Step 4: Capture one SCALEX hero fixture and one structurally different fixture**
- [ ] **Step 5: Hash every input, screenshot and report into the benchmark manifest**
- [ ] **Step 6: Run focused tests and repeat capture to verify manifest stability excluding explicit timestamps**
- [ ] **Step 7: Commit with `test(benchmark): freeze design capability baseline`**

### Task 2: Declarative interaction-state contract

**Files:**
- Create: `src/qa/interaction-state-contract.js`
- Create: `src/qa/state-driver.js`
- Create: `schemas/v2/interaction-state.schema.json`
- Test: `test/interaction-state-driver.test.js`
- Create fixtures: `test/fixtures/interaction-states/`

**Interfaces:**
- Produces: `validateInteractionState(input): InteractionState`
- Produces: `driveState(page, state): Promise<StateEvidence>`

- [ ] **Step 1: Write failing tests for click, keyboard, scroll-progress, focus and reduced-motion steps**
- [ ] **Step 2: Reject arbitrary JavaScript strings and selectors outside the active artifact**
- [ ] **Step 3: Implement a closed action enum with preconditions and postconditions**
- [ ] **Step 4: Record reached selectors, focus target, scroll position and state hash**
- [ ] **Step 5: Run the focused test with menu-open and modal-open fixtures**
- [ ] **Step 6: Commit with `feat(qa): add declarative visual state driver`**

### Task 3: Immutable visual capture matrix

**Files:**
- Create: `src/qa/visual-capture-matrix.js`
- Modify: `src/qa/visual-regression.js`
- Test: `test/visual-capture-matrix.test.js`

**Interfaces:**
- Produces: `captureVisualMatrix({ siteDir, artifactManifest, matrix, outputDir }): Promise<VisualCaptureManifest>`

- [ ] **Step 1: Write a failing test for desktop, tablet landscape, tablet portrait and mobile captures**
- [ ] **Step 2: Write a failing test that changes the artifact during capture and expects `ARTIFACT_CHANGED_DURING_CAPTURE`**
- [ ] **Step 3: Implement deterministic font readiness, image decode, animation control and state driving**
- [ ] **Step 4: Store viewport, device scale, state, screenshot hash, artifact hash and contract hash per capture**
- [ ] **Step 5: Replace fixed waits in `visual-regression.js` with readiness and state contracts**
- [ ] **Step 6: Run the focused test twice and compare capture manifests**
- [ ] **Step 7: Commit with `feat(qa): capture immutable multi-state visual matrix`**

### Task 4: Deterministic visual comparator

**Files:**
- Create: `src/qa/visual-comparator.js`
- Create: `src/qa/region-comparator.js`
- Test: `test/visual-comparator.test.js`
- Create fixtures: `test/fixtures/visual-comparator/`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `compareImplementationGolden({ expected, actual, regions, thresholds }): VisualComparison`
- Produces: `compareIntentGolden({ intent, actual, zoneContract }): IntentComparison`

- [ ] **Step 1: Evaluate Pixelmatch and one maintained SSIM package; document license, bundle impact and API in the commit message**
- [ ] **Step 2: Write failing fixtures for exact match, one-pixel regression, major layout drift and allowed dynamic region**
- [ ] **Step 3: Implement implementation-golden comparison with diff image and threshold report**
- [ ] **Step 4: Implement intent comparison using normalized regions, typography and token checks rather than global pixel equality**
- [ ] **Step 5: Require per-region thresholds and reject a global threshold that hides a failed CTA or headline region**
- [ ] **Step 6: Run focused tests and confirm diff artifacts are written only to temporary test directories**
- [ ] **Step 7: Commit with `feat(qa): add deterministic visual comparison`**

### Task 5: Accessibility, typography and motion evidence

**Files:**
- Create: `src/qa/accessibility-gate.js`
- Create: `src/qa/typography-gate.js`
- Create: `src/qa/motion-keyframe-gate.js`
- Test: `test/design-experience-gates.test.js`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `auditAccessibility(page, contract): Promise<GateResult>`
- Produces: `auditTypography(page, contract): Promise<GateResult>`
- Produces: `auditMotionKeyframes(page, contract): Promise<GateResult>`

- [ ] **Step 1: Add `axe-core` after recording its license and exact version**
- [ ] **Step 2: Write failing tests for missing focus return, inaccessible dialog, wrong font, clipped text and reduced-motion violation**
- [ ] **Step 3: Implement accessibility checks plus project-specific focus and touch-target assertions**
- [ ] **Step 4: Record computed family, size, weight, line-height, letter-spacing, line count and clipping per selector**
- [ ] **Step 5: Capture motion at progress `0`, `0.25`, `0.5`, `0.75`, `1` and validate only declared transform/opacity changes**
- [ ] **Step 6: Run focused tests in Chromium and require zero flaky retries**
- [ ] **Step 7: Commit with `feat(qa): prove accessibility typography and motion`**

### Task 6: Advisory visual critic gate

**Files:**
- Create: `src/qa/visual-critique-contract.js`
- Create: `src/qa/visual-critic-gate.js`
- Create: `schemas/v2/visual-critique.schema.json`
- Test: `test/visual-critic-gate-v2.test.js`

**Interfaces:**
- Produces: `evaluateVisualCritique({ captureManifest, designContract, critique }): AdvisoryVisualResult`

- [ ] **Step 1: Write failing tests requiring screenshot hash, region coordinates, dimension, severity, rationale and confidence for each finding**
- [ ] **Step 2: Reject critiques for unknown captures, stale artifacts or the critic's own output**
- [ ] **Step 3: Limit dimensions to hierarchy, composition, typography, color, assets, contextual originality and motion**
- [ ] **Step 4: Return `pass`, `fail` or `uncertain` as advisory status without creating a release approval**
- [ ] **Step 5: Add calibrated positive, median and negative fixtures**
- [ ] **Step 6: Run focused tests and commit with `feat(qa): add localized advisory visual critique`**

### Task 7: Unified evidence gate V2

**Files:**
- Create: `src/qa/unified-quality-gate-v2.js`
- Test: `test/unified-quality-gate-v2.test.js`
- Create fixtures: `test/fixtures/unified-gate-v2/`

**Interfaces:**
- Produces: `auditArtifactV2({ artifactManifest, designContract, acceptanceContract }): Promise<UnifiedEvidenceReport>`

- [ ] **Step 1: Write a failing test where every individual gate passes but one report references a different artifact hash**
- [ ] **Step 2: Write a failing test where deterministic gates pass but human implementation-golden approval is absent**
- [ ] **Step 3: Execute gates in fail-closed order and freeze the artifact during verification**
- [ ] **Step 4: Mark deterministic status, advisory visual status and human decision as separate fields**
- [ ] **Step 5: Invalidate all prior evidence when artifact or design contract hash changes**
- [ ] **Step 6: Run V2 and existing V1 quality-gate tests**
- [ ] **Step 7: Commit with `feat(qa): bind visual evidence to one artifact`**

### Task 8: Local Design Review Console

**Files:**
- Create: `src/review-console/server.js`
- Create: `src/review-console/review-store.js`
- Create: `src/review-console/public/index.html`
- Create: `src/review-console/public/styles.css`
- Create: `src/review-console/public/app.js`
- Create: `bin/review-console.js`
- Test: `test/review-console.integration.test.js`
- Modify: `package.json`

**Interfaces:**
- Produces command: `npm run review:design -- --run <runId> --port <port>`
- Produces loopback API for reads, comments and signed decisions

- [ ] **Step 1: Write integration tests proving the server binds only to `127.0.0.1` and rejects path traversal**
- [ ] **Step 2: Create a read-only view of references, three directions, desktop/mobile captures, motion states and diff heatmaps**
- [ ] **Step 3: Add region-anchored comments, preserve/reject controls and pairwise selection**
- [ ] **Step 4: Send approvals through `human-approval.js`; never accept a raw status string from the browser**
- [ ] **Step 5: Display artifact, contract and screenshot hashes next to every decision**
- [ ] **Step 6: Run integration and preview-server security tests**
- [ ] **Step 7: Commit with `feat(review): add local design approval console`**

### Task 9: Blind V1-versus-V2 benchmark runner

**Files:**
- Create: `src/benchmark/pairwise-randomizer.js`
- Create: `src/benchmark/score-calculator.js`
- Create: `scripts/run-design-capability-benchmark.js`
- Test: `test/design-capability-benchmark.test.js`

**Interfaces:**
- Produces command: `node scripts/run-design-capability-benchmark.js --definition <path> --v1 <manifest> --v2 <manifest>`
- Produces: `DesignCapabilityBenchmarkReport`

- [ ] **Step 1: Write failing tests for anonymized ordering, complete reviewer coverage and fixed scoring weights**
- [ ] **Step 2: Write a failing test proving a runtime P0 failure cannot be offset by high taste scores**
- [ ] **Step 3: Implement deterministic randomization seeded by benchmark ID without exposing pipeline identity**
- [ ] **Step 4: Calculate pairwise preference, reference alignment, coherence, originality, responsive quality, runtime and performance**
- [ ] **Step 5: Require at least 70% V2 preference and zero P0 failures for the pilot promotion recommendation**
- [ ] **Step 6: Run the benchmark unit tests and a fixture-only dry run**
- [ ] **Step 7: Commit with `test(benchmark): measure design capability improvement`**

### Task 10: SCALEX vertical-slice pilot

**Files:**
- Create: `scripts/run-scalex-design-v2-pilot.js`
- Create: `test/scalex-design-v2-pilot.test.js`
- Create run artifacts under: `clientes/flashtech-caso-04-growth/orchestration/v2/`
- Modify: `PROJECT_STATUS.md` only after fresh evidence exists

**Interfaces:**
- Produces command: `node scripts/run-scalex-design-v2-pilot.js --section hero`

- [ ] **Step 1: Write an end-to-end test using fixture model outputs for three directions and one implementation result**
- [ ] **Step 2: Prove an out-of-scope Gemini edit, stale golden, fourth attempt and unsigned approval all fail for distinct reasons**
- [ ] **Step 3: Run the pilot through contracts, direction decision, Gemini exchange, diff guard, capture matrix and evidence gate**
- [ ] **Step 4: Run the pilot twice from clean checkouts and compare canonical artifacts**
- [ ] **Step 5: Run `npm test` and require zero failures**
- [ ] **Step 6: Run the blind comparison against the frozen SCALEX baseline**
- [ ] **Step 7: Update `PROJECT_STATUS.md` with observed scope, commands and results; do not generalize beyond the hero pilot**
- [ ] **Step 8: Commit with `test(design): prove SCALEX V2 visual workflow`**

## Completion criteria

- Capture states and comparisons are reproducible.
- Intent and implementation goldens have different contracts and purposes.
- Deterministic failures cannot be overruled by subjective scores.
- Critic findings are localized and advisory.
- Creator/client decisions bind to exact hashes.
- The V2 pipeline demonstrates preference over the frozen V1 baseline rather than merely passing tests.

