# Orchestration Plan — studio-dna v2.5 Evolution

## Objective
Deliver full research, calibration, and evolution of the autonomous front-end framework studio-dna v2.5 meeting all requirements R1-R5 and acceptance criteria defined under `ORIGINAL_REQUEST.md ## 2026-10-04T20:14:18Z`:
- R1: Impeccable detect-antipatterns.mjs integration as Quality Gate (Tier 4) & sanitization of active screens (JumpPlay), eliminating 17 anti-patterns (dark-glow, nested-cards, overused-font, bounce-easing).
- R2: Finite State Machine (FSM) primitives for form flows (checkout / B2B quote) with deterministic inline validation, adaptive masks, latency feedback, draft recovery.
- R3: Haptic physics engine & analytical springs (2nd-order ODE \ddot{x} + 2\zeta\omega_n\dot{x} + \omega_n^2 x = 0) in vanilla JS with drag, drawers, Vibration API, velocity continuity, and prefers-reduced-motion fallback.
- R4: GPU texture pipeline (KTX2 / Basis Universal via gltf-transform) maintaining VRAM <= 16MB & visual saliency attention prediction oracle (500ms attention window).
- R5: Adverse hardware stress test suite via Playwright CDP (CPU throttled 6x, rAF 30fps Safari Low Power Mode, WebGL context lost/restored events).

## Phase 0: Survey & Requirements Mining
- Dispatch 3 parallel survey agents:
  - `explorer_survey_1`: Codebase & Asset Landscape Explorer (map existing studio-dna structure, JumpPlay screens, dependencies, packages, scripts, existing test suites).
  - `explorer_survey_2`: Architecture & Physics/FSM Feasibility Explorer (map FSM architecture, spring dynamics math formulation, gltf-transform/KTX2 tooling, Playwright CDP throttling mechanisms).
  - `spec_miner_survey_3`: Spec & Quality Gate Miner (deep-dive into detect-antipatterns.mjs, axe-core WCAG 2.2 AA rules, 17 anti-patterns catalog, VRAM/rAF acceptance criteria).
- Synthesize findings into updated `PROJECT.md` and `TEST_INFRA.md`.

## Phase 1: Architecture & Milestones Definition
- Formalize Feature Inventory (covering all R1-R5 features).
- Define milestones:
  - M1: Impeccable Quality Gate & JumpPlay Surface Sanitization (R1)
  - M2: Zag/XState-inspired Form FSM Layer & Accessibility (R2)
  - M3: Analytical Spring Dynamics & Haptic Physics Engine (R3)
  - M4: KTX2/Basis Texture Pipeline & Visual Saliency Oracle (R4)
  - M5: Adverse Hardware Stress Suite, E2E Verification & Forensic Integrity Gate (R5 + E2E integration)

## Phase 2: Dual Track Execution
- Implementation Track: Dispatch dedicated Workers for milestones M1..M5.
- E2E Testing Track: Dispatch Test Writers to construct independent Tiers 1-4 tests and adverse hardware simulations, publishing `TEST_READY.md`.

## Phase 3: Gate Verification & Adversarial Hardening
- Run Reviewers, Challengers, and Forensic Integrity Auditor.
- Pass criteria: 100% tests pass, zero regressions, all Reviewers APPROVE, Challengers confirm empirical validity, Auditor CLEAN (zero cheating/facades).

## Phase 4: Final Synthesis & Victory Report
- Deliver victory report to parent caller via `send_message`.
