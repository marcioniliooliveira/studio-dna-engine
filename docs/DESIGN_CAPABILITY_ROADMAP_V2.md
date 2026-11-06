# Design Capability Roadmap V2

> Safety boundary (documented 2026-09-16): the legacy transmuter must not consume V2 reference selections or raw `copias/` content. V2 raw transmutation remains blocked until a Reference Packet compiler exists and the promotion decision is signed by a trusted Ed25519 key.

## Goal

Increase observable design quality first, while building only the orchestration controls required to delegate the work safely and precisely to Gemini.

## Critical path

```text
Truth baseline
→ Motion evidence
→ Jev shadow classification
→ Jev-calibrated routing
→ Delegation kernel
→ Qualified reference packet
→ Three approved directions
→ Gemini implementation
→ Visual and motion proof
→ Design registry and review console
→ Blind benchmark
```

## Milestone 0 — Freeze the baseline

**Perceptible impact:** none immediately; makes improvement provable.

- Capture current SCALEX hero and one additional client at desktop, tablet and mobile.
- Record runtime, geometry, accessibility and current human assessment.
- Hash content, contracts, screenshots and implementation artifacts.
- Define the pairwise comparison sheet before V2 generates anything.
- Require a fresh green test baseline before accepting new capability claims.
- Label any preview endpoint, mocked metric or hard-coded direction as `prototype`, never as runtime evidence.

**Exit gate:** the old pipeline can be rerun or its exact artifacts can be compared without ambiguity; no accepted baseline report contains simulated cost, diff, direction or approval data.

## Milestone 1 — Motion truth and Jev foundation

**Perceptible impact:** preserves the behaviors that make a high-end reference feel intentional instead of retaining only its final screenshot.

- Freeze raw DOM, CSS, JavaScript, assets and runtime state before any clone repair or normalization.
- Replace generic motion cleanup with three explicit modes: immutable evidence capture, reversible preview recovery and contract-bound client compilation.
- Extract deterministic motion candidates from DOM, CSS, runtime geometry, GSAP/Webflow/WAAPI state and declared interaction events.
- Capture declared states: `initial`, `ready`, progress `0/25/50/75/100`, hover/focus where applicable and `prefers-reduced-motion`.
- Introduce a hash-bound `motion-contract` containing target identity, trigger, trajectory, dependencies, criticality and preservation policy.
- Introduce Jev as a structured classifier over those facts: `motionRole`, `criticality`, `captureState`, `preservationPolicy`, `confidenceRaw` and evidence IDs.
- Run Jev in shadow mode: it may classify and route review, but cannot mutate, approve or discard motion evidence.
- Record Jev prediction versus independent runtime outcome to calibrate each capability before it gains routing authority.

**Exit gate:** two references with materially different reveals produce reproducible motion contracts; an intentionally removed reveal fails independently; an uncertain Jev result becomes `blocked` or `human-review-required`, never an invented repair.

## Milestone 2 — Surgical delegation kernel

**Perceptible impact:** fewer unintended changes and much closer first-pass implementation.

- Add contract and result V2 schemas.
- Reject vague, conflicting or incomplete normative requirements.
- Add canonical hashes, artifact manifests and actual diff verification.
- Distinguish hard and soft enforcement.
- Run Gemini IDE tasks only in isolated worktrees.
- Pass only selected context slices to Gemini.
- Require every implementation task that touches motion to consume the selected `motion-contract` and preserve its artifact hash.

**Exit gate:** a deliberately ambiguous task is blocked before dispatch, and a result that edits one undeclared file is rejected independently of Gemini's self-report.

Implementation plan: `docs/superpowers/plans/2026-09-16-surgical-delegation-kernel.md`.

## Milestone 3A — Reference discovery and qualification

**Perceptible impact:** better raw material reaches the design process without asking the creator to curate the internet manually.

- Discover candidates through read-only adapters rather than granting external catalogs execution authority.
- Quarantine every external candidate and bind it to canonical identity, immutable revision, license evidence and hashes.
- Score creative merit, extractability, client fit, runtime quality, provenance and risk as separate dimensions.
- Select non-dominated candidates by role instead of using popularity or one opaque aggregate score.
- Run bounded probe builds and require measured improvement plus explicit human approval before promotion.
- Keep MCP as an optional adapter around a local domain core; an MCP listing is never treated as proof of quality or safety.

**Exit gate:** an untrusted candidate cannot enter a Reference Pack until provenance, qualification, probe evidence and human approval all match the promoted artifact hashes.

Implementation plan: `docs/superpowers/plans/2026-09-16-reference-discovery-qualification.md`.

## Milestone 3B — Reference intelligence and design grammar

**Perceptible impact:** stronger hierarchy, less generic composition and better understanding of why a reference works.

- Compile source-specific provenance.
- Extract layout, typography, materials, image strategy, motion and responsive behavior.
- Build a role-scoped Reference Pack.
- Include only Jev-classified, runtime-correlated motion evidence; never a generic reconstructed animation as if it came from the reference.
- Introduce DTCG-compatible token layers.
- Create the first framework-neutral design recipes.

**Exit gate:** an agent can explain and reconstruct the reference's relationships without loading the complete raw clone or copying its client identity.

Implementation plan: `docs/superpowers/plans/2026-09-16-reference-design-intelligence.md`.

## Milestone 4 — Direction boards and approved goldens

**Perceptible impact:** this is the first major visible quality jump.

- Convert the questionnaire into `design-intent`.
- Generate three structurally distinct directions in one architect pass.
- Render two or three boards for each critical section.
- Compare directions pairwise.
- Make motion intent explicit: preserve, adapt, simplify or prohibit each motion role before implementation.
- Freeze the selected intent golden and compile the implementation contract.

**Exit gate:** the creator can point to visible, material differences between A/B/C and approve a direction without reading code or relying on adjectives.

## Milestone 5 — Gemini vertical-slice implementation

**Perceptible impact:** approved visual intent survives translation into browser code.

- Implement only one SCALEX section first.
- Dispatch the contract through the Gemini IDE bridge.
- Reject out-of-scope changes.
- Run geometry, token, responsive, motion and runtime checks.
- Send Gemini the frozen design contract, motion-contract slice and acceptance IDs; never raw generic animation instructions.
- Permit at most three total attempts using failure deltas.

**Exit gate:** the selected hero is implemented with the same content, hierarchy and design tokens, and the verifier—not Gemini—proves the result.

## Milestone 6 — Visual evidence and taste gate

**Perceptible impact:** regressions and mediocre executions stop advancing.

- Add interaction-state capture contracts.
- Implement Pixelmatch, SSIM, region geometry and typography comparison.
- Add motion replay comparison before global visual similarity: required targets must traverse their declared states and reduced-motion fallback must remain readable.
- Separate intent golden from implementation golden.
- Add advisory visual critique with localized findings.
- Require human approval for the implementation golden.

**Exit gate:** every accepted visual claim points to a screenshot, measured region, test result or signed human decision for the same artifact hash.

Implementation plan: `docs/superpowers/plans/2026-09-16-visual-proof-review-and-benchmark.md`.

## Milestone 7 — Advanced UI/UX capability

**Perceptible impact:** richer structures become reusable without forcing every client into the same visual system.

- Expand the registry across compositions, typography, materials, image treatments and motion.
- Add HTML and React adapters only where required.
- Introduce component state fixtures and responsive transformations.
- Record when a pattern must not be used.
- Integrate Penpot as an optional bidirectional visual adapter.

**Exit gate:** at least three different client archetypes use shared engineering recipes while remaining visually distinguishable.

## Milestone 8 — Review console and empirical benchmark

**Perceptible impact:** creator and client understand, compare and approve results faster.

- Present references, directions, viewports and diffs locally.
- Read all directions, costs, visual metrics and approvals from hash-bound artifacts; the console must show `unavailable` rather than fabricated values.
- Anchor comments to visual regions.
- Generate signed decisions from the UI.
- Run blind V1-versus-V2 comparisons.
- Record quality, cost and attempts to approval.

**Exit gate:** V2 wins at least 70% of pairwise comparisons over the frozen baseline with no P0 failures.

## Priority rule

Infrastructure work is admitted only when it unlocks one of the following observable outcomes:

1. better reference comprehension;
2. greater direction diversity;
3. higher implementation fidelity;
4. fewer ambiguous repairs;
5. stronger human preference;
6. lower cost per approved result.
7. preservation of verified interaction and motion behavior.

Anything else remains outside this roadmap.
