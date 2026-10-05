# E2E Test Infra: studio-dna v2.5 Autonomous Front-End Framework

## Test Philosophy
- Opaque-box, requirement-driven testing covering the visual craft floor, finite state machines, analytical ODE dynamics, GPU texture budgets, and adverse hardware resilience.
- Multi-tier systematic coverage:
  - **Milestone Suites (Unit / Domain)**: `test/m1-impeccable-sanitization.test.js`, `test/m2-fsm-forms.test.js`, `test/m3-spring-dynamics.test.js`, `test/m4-gpu-saliency.test.js`.
  - **Hardware Stress Suite**: `test/stress/adverse-hardware-stress.test.js` (CPU 6x throttling, 30fps rAF clamping, WebGL context loss).
  - **Baseline Suites**: 277 existing tests across M1..M4 compilers and E2E tiers 1-4 (zero regressions).

## Feature Inventory & Test Coverage
| # | Feature | Scope | Target Test Suite |
|---|---------|-------|-------------------|
| 1 | Impeccable Quality Gate Integration | Tier 4 Gate detects all 17 anti-patterns | `test/m1-impeccable-sanitization.test.js` |
| 2 | JumpPlay Screen Sanitization | 0 occurrences of nested-cards, dark-glow, overused-font, bounce-easing | `test/m1-impeccable-sanitization.test.js` |
| 3 | Core Finite State Machine Engine | Deterministic state transitions, guards, actions | `test/m2-fsm-forms.test.js` |
| 4 | Zag-Style DOM A11y Connector | aria-invalid, aria-busy, disabled, data-state | `test/m2-fsm-forms.test.js` |
| 5 | B2B Quote & Checkout Machines | JumpPlay quotation flow, submission latency | `test/m2-fsm-forms.test.js` |
| 6 | Adaptive Input Masking & Modulo 11 | Brazilian CNPJ/CPF modulo 11, dynamic phone/CEP | `test/m2-fsm-forms.test.js` |
| 7 | LocalStorage Draft Persistence | 24h TTL, auto-save debounce, draft restore | `test/m2-fsm-forms.test.js` |
| 8 | WCAG 2.2 AA & Keyboard Navigation | Tab focus order, contrast >= 3:1, zero a11y faults | `test/m2-fsm-forms.test.js` |
| 9 | Analytical 2nd-Order Spring Dynamics | Closed-form ODE solutions across 3 regimes | `test/m3-spring-dynamics.test.js` |
| 10 | Velocity Continuity Hand-off | C¹ continuity (v₀ = v_drag) at release | `test/m3-spring-dynamics.test.js` |
| 11 | Reduced-Motion Zero-Overshoot | \zeta >= 1.0, 0px positional overshoot | `test/m3-spring-dynamics.test.js` |
| 12 | Multi-Tier Vibration API Engine | Haptic pulse patterns (12ms, 8ms, 22ms, error buzz) | `test/m3-spring-dynamics.test.js` |
| 13 | KTX2 Texture Pipeline & VRAM Budget | Total VRAM <= 16MB across scene models | `test/m4-gpu-saliency.test.js` |
| 14 | 500ms Visual Saliency Attention Oracle | Score_CTA >= 0.18, DistractionRatio <= 0.35 | `test/m4-gpu-saliency.test.js` |
| 15 | 6x CPU Throttling Stress Scenario | Latency < 16.6ms under 6x CPU throttling | `test/stress/adverse-hardware-stress.test.js` |
| 16 | 30fps rAF Clamp Stress Scenario | Normalized Δt settling parity at 30fps vs 60fps | `test/stress/adverse-hardware-stress.test.js` |
| 17 | WebGL Context Lost & Restored Test | Zero unhandled exception, automatic rehydration | `test/stress/adverse-hardware-stress.test.js` |
| 18 | Unified Test Battery & Forensic Audit | 100% pass across all suites with zero cheating | M5 Gate Battery |

## Test Runner Commands
```bash
# Run Milestone Suites for studio-dna v2.5:
node --test test/m1-impeccable-sanitization.test.js test/m2-fsm-forms.test.js test/m3-spring-dynamics.test.js test/m4-gpu-saliency.test.js

# Run Hardware Stress Suite:
node --test test/stress/adverse-hardware-stress.test.js

# Run Baseline Canonical Suite (regression prevention):
npm test
```
