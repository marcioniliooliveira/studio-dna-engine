# Jev Motion Foundation

## Goal

Make motion behavior evidence-backed, Jev-classified and independently verified before Gemini is allowed to modify a motion-bearing section.

## Tasks

- [ ] Freeze two raw reference fixtures with distinct reveals and an intentionally broken counterpart. Verify: each capture has source, environment and asset hashes.
- [ ] Add a non-mutating motion candidate collector for CSS, GSAP/Webflow/WAAPI, DOM identity and runtime geometry. Verify: repeated collection returns the same canonical JSON.
- [ ] Split universal normalization into evidence capture, preview recovery and client compilation modes. Verify: evidence mode never changes source HTML; recovery emits a reversible patch manifest.
- [ ] Define and validate `motion-contract` with targets, states, dependencies, criticality and reduced-motion behavior. Verify: unknown fields, ambiguous targets and missing evidence IDs fail closed.
- [ ] Add Jev adapter in shadow mode to classify motion role, criticality, capture state and preservation policy. Verify: Jev output cannot mutate files or change gate status.
- [ ] Implement a Playwright motion replay verifier for declared initial, progress and final states. Verify: a removed reveal fails even when the final screenshot is visible.
- [ ] Bind the selected motion-contract slice to the V2 execution task, input manifest and post-execution diff. Verify: Gemini result is rejected when a required motion target or dependency is removed.
- [ ] Run a two-reference calibration pilot and record Jev prediction versus verifier outcome. Verify: low-confidence or conflicting cases become `human-review-required`.

## Done When

- [ ] A clone cannot be accepted solely because its final frame is visible.
- [ ] Every required reveal has a hash-bound contract and replay evidence.
- [ ] Jev routes uncertainty without becoming the source of truth.
