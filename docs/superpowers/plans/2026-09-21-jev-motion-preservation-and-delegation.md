# Jev Motion Preservation and Safe Gemini Delegation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve reference motion as verifiable evidence, use Jev to classify and route that evidence, and delegate bounded implementation work to Gemini with an independently verified result.

**Architecture:** The pipeline captures immutable raw evidence before any normalization. Deterministic extractors produce motion candidates from DOM, CSS, AST and runtime states. Jev classifies those candidates in shadow mode and emits a hash-bound `motion-contract`; it does not mutate files or approve builds. The contract is consumed by the V2 delegation kernel, which prepares a Gemini exchange, verifies the actual diff and runs motion/runtime/visual gates.

**Tech Stack:** Node.js 20 CommonJS, Playwright/CDP, PostCSS, Node `crypto`/`fs`, existing Node test runner and task-contract V2. SWC is an optional JavaScript evidence adapter after the deterministic collector is green. Pixelmatch/SSIM are later visual-proof adapters. Python/OpenCV and Rust/Lightning CSS are not core dependencies in this slice.

**Spec:** `docs/superpowers/specs/2026-09-16-design-capability-orchestration-v2-design.md`, `docs/DESIGN_CAPABILITY_ROADMAP_V2.md`, `jev-motion-foundation.md`

## Global Constraints

- Raw reference evidence and `copias/` remain immutable.
- Evidence capture must not invoke normalization, generic unlock CSS or UniversalScrollDirector.
- Jev remains advisory until its predictions are correlated with independent runtime outcomes.
- A final visible frame never proves that a reveal executed.
- Unknown targets, missing dependencies and conflicting evidence produce `blocked` or `human-review-required`.
- Every artifact is bound to canonical JSON and SHA-256 hashes.
- Gemini receives only the selected task slice, inputs, acceptance IDs and motion-contract slice.
- Filesystem IDE execution remains soft-enforced until the actual diff guard and policy boundary pass.
- Builder and verifier actor IDs must differ.
- Total implementation attempts are limited to three; a fourth attempt is blocked.
- Preview and test code must not mutate a real client workspace.

## Review Focus

- **Final-frame false positive:** a reveal removed from the candidate still appears visible at the end; Task 6 must fail it using intermediate state evidence.
- **SplitText/fragmentation loss:** removing `aria-hidden` wrappers changes motion topology while preserving text; Task 3 and Task 6 must compare structural fingerprints.
- **Dependency readiness:** GSAP, ScrollTrigger, fonts or observers are unavailable during capture; Task 2 must classify the state as unresolved instead of accepting a partial snapshot.
- **Cross-scope/stale execution:** a Gemini result belongs to another task, client or input hash; Task 7 must reject it before gates run.
- **Non-reproducible execution:** environment, viewport, storage or clock changes alter results; Task 1 and Task 9 must compare canonical manifests across repeated runs.

### Task 1: Truth baseline and isolated motion fixtures

**Files:**
- Create: `test/fixtures/motion-reference/basic-reveal/index.html`
- Create: `test/fixtures/motion-reference/gsap-split-reveal/index.html`
- Create: `test/fixtures/motion-reference/removed-reveal/index.html`
- Create: `src/motion/capture-environment.js`
- Create: `test/motion-capture-environment.test.js`
- Modify: `PROJECT_STATUS.md` only after fresh commands produce evidence

**Interfaces:**
- Produces: `createCaptureEnvironment(options): CaptureEnvironment`
- Produces: `CaptureEnvironment.contextOptions(): BrowserContextOptions`
- Produces: `CaptureEnvironment.manifest(): CaptureEnvironmentManifest`

- [ ] **Step 1: Write failing tests for fixed viewport, DPR, locale, timezone, reduced-motion and empty storage.**
- [ ] **Step 2: Run `node --test test/motion-capture-environment.test.js` and confirm the missing module failure.**
- [ ] **Step 3: Implement `createCaptureEnvironment` with explicit defaults and no wall-clock value in the canonical manifest.**
- [ ] **Step 4: Add fixtures that contain a CSS reveal, a SplitText-like wrapper reveal and a deliberately removed reveal.**
- [ ] **Step 5: Run the focused test twice and compare canonical manifests.**
- [ ] **Step 6: Run the current focused orchestration tests; do not update project status from stale documentation.**
- [ ] **Step 7: Commit with `test(motion): freeze deterministic reveal fixtures`.**

### Task 2: Non-mutating evidence capture

**Files:**
- Create: `src/motion/raw-evidence-capture.js`
- Create: `src/motion/readiness-contract.js`
- Test: `test/raw-evidence-capture.test.js`
- Modify: `src/core/cloner.js` only to expose a capture-only path; do not change the legacy output path in this task

**Interfaces:**
- Produces: `captureRawEvidence({ url, outputDir, environment, readiness }): Promise<RawEvidenceManifest>`
- Produces: `validateReadinessContract(input): ReadinessContract`
- Produces: `waitForReadiness(page, contract): Promise<ReadinessEvidence>`

- [ ] **Step 1: Write a failing test proving capture does not call `UniversalAssetNormalizer.applyUniversalFixes` or mutate the source fixture.**
- [ ] **Step 2: Write a failing test for readiness based on `document.fonts.ready`, image decode, a declared app-ready signal and bounded DOM silence.**
- [ ] **Step 3: Implement capture-only browser context creation through `createCaptureEnvironment`.**
- [ ] **Step 4: Persist raw HTML, linked CSS/JS references, runtime dependency observations, screenshots and environment metadata with hashes.**
- [ ] **Step 5: Return `unresolvedDependencies` when a required resource fails; never silently continue as verified.**
- [ ] **Step 6: Run the fixture twice and assert identical structural hashes excluding explicit timestamps.**
- [ ] **Step 7: Commit with `feat(motion): add immutable raw evidence capture`.**

### Task 3: Deterministic motion candidate extraction

**Files:**
- Create: `src/motion/motion-candidate-extractor.js`
- Create: `src/motion/dom-fingerprint.js`
- Create: `src/motion/css-motion-extractor.js`
- Test: `test/motion-candidate-extractor.test.js`

**Interfaces:**
- Produces: `extractMotionCandidates({ rawEvidence }): MotionCandidate[]`
- Produces: `fingerprintTarget(target): StructuralFingerprint`
- Produces: `extractCssMotion(cssText): CssMotionEvidence[]`

- [ ] **Step 1: Write failing fixtures for CSS keyframes, `opacity`/transform transitions, GSAP `from`/`fromTo`, ScrollTrigger, IntersectionObserver and reduced-motion rules.**
- [ ] **Step 2: Write a failing test requiring target identity, trigger, properties, dependency and evidence references for each candidate.**
- [ ] **Step 3: Implement CSS extraction with PostCSS and source-location references; do not use regex as the primary CSS parser.**
- [ ] **Step 4: Implement deterministic DOM/runtime candidate joining using selector, role, text and ancestor fingerprints.**
- [ ] **Step 5: Emit `unknown` when static evidence cannot be correlated with runtime evidence.**
- [ ] **Step 6: Run the collector twice and assert canonical candidate ordering and hashes.**
- [ ] **Step 7: Commit with `feat(motion): extract evidence-backed motion candidates`.**

### Task 4: Motion contract and preservation policy

**Files:**
- Create: `src/motion/motion-contract.js`
- Create: `schemas/v2/motion-contract.schema.json`
- Test: `test/motion-contract.test.js`

**Interfaces:**
- Produces: `validateMotionContract(input): MotionContract`
- Produces: `compileMotionContract({ candidates, jevDecisions, artifactHashes }): MotionContract`
- Produces: `selectMotionSlice(contract, taskPurpose): MotionContractSlice`

- [ ] **Step 1: Write failing tests for missing target identity, missing evidence IDs, invalid states, unresolved dependencies and contradictory preservation policies.**
- [ ] **Step 2: Define the closed unions `motionRole`, `criticality`, `captureState` and `preservationPolicy`.**
- [ ] **Step 3: Implement canonical sorting, strict unknown-field rejection and SHA-256 contract hashing.**
- [ ] **Step 4: Require reduced-motion behavior for every required motion target.**
- [ ] **Step 5: Implement purpose slices for `reference-analysis`, `direction-board`, `gemini-implementation` and `motion-verification`.**
- [ ] **Step 6: Run contract tests and prove an ambiguous target becomes `blocked`.**
- [ ] **Step 7: Commit with `feat(motion): add hash-bound motion contracts`.**

### Task 5: Jev classifier and calibration ledger

**Files:**
- Create: `src/jev/jev-classifier.js`
- Create: `src/jev/jev-contract.js`
- Create: `src/jev/jev-calibration-ledger.js`
- Create: `schemas/v2/jev-decision.schema.json`
- Test: `test/jev-classifier.test.js`
- Test: `test/jev-calibration-ledger.test.js`

**Interfaces:**
- Produces: `classifyMotionCandidate(candidate, context): JevDecision`
- Produces: `validateJevDecision(input): JevDecision`
- Produces: `recordJevOutcome({ decision, observedOutcome }): CalibrationRecord`
- Produces: `summarizeJevCalibration(records): CalibrationSummary`

- [ ] **Step 1: Write failing table-driven tests for `entry-reveal`, `scroll-scrub`, `pin`, `parallax`, `hover`, `loader`, `decorative` and `unknown`.**
- [ ] **Step 2: Require every Jev decision to reference candidate evidence and declare `confidenceRaw` without treating it as calibrated probability.**
- [ ] **Step 3: Implement the first Jev adapter as a deterministic rules/classification boundary; keep any model-backed adapter behind the same interface.**
- [ ] **Step 4: Force `unknown`, contradictory or low-evidence decisions to `human-review-required`.**
- [ ] **Step 5: Implement append-only calibration records pairing Jev output with Playwright-verified outcome.**
- [ ] **Step 6: Add shadow-mode tests proving Jev cannot edit files, change a gate result or approve a contract.**
- [ ] **Step 7: Commit with `feat(jev): classify motion in shadow mode`.**

### Task 6: Motion replay verifier and quality gate

**Files:**
- Create: `src/qa/motion-replay-verifier.js`
- Create: `src/qa/motion-preservation-gate.js`
- Test: `test/motion-replay-verifier.test.js`
- Test: `test/motion-preservation-gate.test.js`

**Interfaces:**
- Produces: `replayMotionContract({ page, contract }): Promise<MotionReplayEvidence>`
- Produces: `auditMotionPreservation({ source, candidate, contract }): MotionGateResult`

- [ ] **Step 1: Write a failing test where candidate final opacity is `1` but the required intermediate transition is absent.**
- [ ] **Step 2: Implement state driving for `initial`, declared progress values, hover/focus and reduced motion without arbitrary sleeps.**
- [ ] **Step 3: Record computed opacity, transform, clip/mask, bounding boxes, trigger state and loaded dependencies per state.**
- [ ] **Step 4: Compare source and candidate fingerprints by target identity, allowed transformation and state trajectory.**
- [ ] **Step 5: Fail on removed required targets, unresolved dependencies, stuck hidden nodes or unauthorized extra timelines.**
- [ ] **Step 6: Run all motion fixtures twice and require equal canonical evidence hashes.**
- [ ] **Step 7: Commit with `feat(qa): verify motion trajectory and preservation`.**

### Task 7: V2 Gemini bridge and actual diff enforcement

**Files:**
- Create: `src/orchestration/artifact-manifest-v2.js`
- Create: `src/orchestration/worktree-diff-guard-v2.js`
- Create: `src/execution/gemini-ide-bridge-v2.js`
- Create: `src/orchestration/workflow-orchestrator-v2.js`
- Modify: `bin/orchestrator.js`
- Modify: `src/execution/gemini-ide-adapter.js`
- Test: `test/gemini-ide-bridge-v2.test.js`
- Test: `test/orchestrator-v2-adversarial.test.js`

**Interfaces:**
- Produces: `prepareExchange({ task, workspaceRoot, exchangeDir }): PreparedExchange`
- Produces: `consumeExchange({ prepared, resultPath }): VerifiedTaskResult`
- Produces: `verifyDeclaredDiff({ before, after, writeAllowlist, limits }): DiffVerification`
- Produces: `runWorkflowV2(options): Promise<WorkflowV2Result>`
- Produces CLI: `studio-dna orchestrate v2 prepare|inspect|consume|verify|approve`

- [ ] **Step 1: Write adversarial tests for ambiguous task, cross-client input, stale result, undeclared file, changed input hash, builder/verifier collision and fourth attempt.**
- [ ] **Step 2: Implement canonical tree manifests and actual added/removed/modified file accounting.**
- [ ] **Step 3: Make the bridge write task, selected contract slices and input manifest atomically.**
- [ ] **Step 4: Require result `taskHash`, `inputManifestHash`, actor identity and independent diff evidence.**
- [ ] **Step 5: Connect CLI `start` to prepare and `consume` to the real workflow; status-only transitions cannot claim execution.**
- [ ] **Step 6: Run the motion-preservation gate after Gemini output and before any approval.**
- [ ] **Step 7: Run focused bridge/orchestrator tests and the existing task, ledger and adapter tests.**
- [ ] **Step 8: Commit with `feat(orchestrator): enforce verifiable Gemini motion tasks`.**

### Task 8: Specialized parser and visual adapters

**Files:**
- Create: `src/motion/js-ast-evidence-adapter.js`
- Create: `src/qa/visual-region-comparator.js`
- Create: `test/js-ast-evidence-adapter.test.js`
- Create: `test/visual-region-comparator.test.js`
- Modify: `package.json` and `package-lock.json` only after benchmark evidence

**Interfaces:**
- Produces: `extractJsMotionEvidence({ source, filename }): JsMotionEvidence[]`
- Produces: `compareVisualRegions({ source, candidate, regions, thresholds }): VisualRegionResult`

- [ ] **Step 1: Establish a benchmark proving regex/static scans miss a fixture's dynamic import, GSAP call or event topology.**
- [ ] **Step 2: Add `@swc/core` only if the benchmark shows a real evidence gap; parse JS/TS without executing captured code.**
- [ ] **Step 3: Correlate AST facts with runtime candidates; AST presence alone cannot mark behavior as verified.**
- [ ] **Step 4: Add Pixelmatch/SSIM only for regions where motion replay and geometry cannot answer the question; record license and version.**
- [ ] **Step 5: Keep Python/OpenCV and Rust/Lightning CSS outside the core until a corpus benchmark demonstrates a missing capability or bottleneck.**
- [ ] **Step 6: Run adapter fixtures twice and compare canonical evidence.**
- [ ] **Step 7: Commit with `feat(evidence): add measured AST and visual adapters`.**

### Task 9: SCALEX/21Oaks pilot and promotion evidence

**Files:**
- Create: `scripts/run-jev-motion-pilot.js`
- Create: `test/jev-motion-pilot.test.js`
- Create artifacts under: `clientes/flashtech-caso-04-growth/orchestration/jev-motion/` and `clientes/negocia-bem/orchestration/jev-motion/`
- Modify: `PROJECT_STATUS.md` only after fresh pilot evidence

**Interfaces:**
- Produces command: `node scripts/run-jev-motion-pilot.js --reference <path> --candidate <path>`
- Produces: `JevMotionPilotReport`

- [ ] **Step 1: Run the pilot on two distinct references and a deliberately broken candidate.**
- [ ] **Step 2: Verify raw, candidate, Jev, replay and gate artifacts all reference the same hashes.**
- [ ] **Step 3: Confirm the broken candidate fails even if its final screenshot is visually visible.**
- [ ] **Step 4: Confirm uncertain Jev output requires review and cannot dispatch a repair automatically.**
- [ ] **Step 5: Run the pilot twice from clean worktrees and compare stable artifacts.**
- [ ] **Step 6: Record actual execution time, browser cost, model tokens, attempts and human interventions.**
- [ ] **Step 7: Update `PROJECT_STATUS.md` with observed results and limitations only.**
- [ ] **Step 8: Commit with `test(jev): prove motion-preserving vertical slice`.**

## Completion Criteria

- A required reveal cannot disappear while the candidate still passes only because its final frame is visible.
- Jev decisions are small, hash-bound, evidence-linked and independently calibrated.
- Jev cannot mutate files or approve releases.
- Gemini receives a bounded motion slice and its actual diff is independently verified.
- V2 CLI commands represent real lifecycle transitions, not simulated execution.
- Reference, candidate, contract, runtime and visual evidence share one immutable artifact lineage.
- SWC, Pixelmatch/SSIM and other specialized stacks are added only behind measured capability gates.
