# Project: studio-dna v2.5 Autonomous Front-End Framework Evolution

## Architecture
studio-dna v2.5 is an autonomous, deterministic front-end framework evolution integrating mathematical layout integrity, Impeccable's anti-slop craft floor, finite state machines (Zag.js/XState), 2nd-order analytical spring dynamics, GPU texture compression (KTX2/Basis Universal), visual saliency cognitive vision, and adverse hardware resiliency under Playwright CDP.

```
┌──────────────────────────────────────────────────────────────┐
│ M1: Impeccable Quality Gate & Surface Sanitization (R1)      │
│ • scripts/detect-antipatterns.mjs + browser evaluator        │
│ • src/qa/impeccable-gate.js integrated into Tier 4 QA Gate   │
│ • Sanitization of JumpPlay active screens (0 slop tells)     │
│ • Flatten 26 nested-cards in #cotacao-b2b & remove halos    │
└──────────────────────────────┬───────────────────────────────┘
                               │ Clean Craft Floor & Gate [DONE]
                               ▼
┌──────────────────────────────────────────────────────────────┐
│ M2: Zag/XState FSM Form Primitives & A11y (R2)               │
│ • src/fsm/core/machine.js (deterministic micro-statechart)   │
│ • src/fsm/core/connect.js (Zag-style DOM ARIA bindings)      │
│ • src/forms/b2b-quote-machine.js & checkout-machine.js       │
│ • src/forms/masks.js (dynamic CNPJ/CPF modulo 11, CEP)       │
│ • src/forms/draft-storage.js (localStorage with 24h TTL)     │
│ • WCAG 2.2 AA & keyboard navigation compliance               │
└──────────────────────────────┬───────────────────────────────┘
                               │ Deterministic State Machine [DONE]
                               ▼
┌──────────────────────────────────────────────────────────────┐
│ M3: 2nd-Order Spring Dynamics & Haptic Physics (R3)          │
│ • src/physics/spring-dynamics.js (\ddot{x}+2\zeta\omega_n\dot{x}+\omega_n^2x=0)│
│ • Closed-form solutions (underdamped, critical, overdamped)   │
│ • C¹ velocity continuity hand-off (v₀ = v_drag)              │
│ • Prefers-reduced-motion strict 0px overshoot clamp (\zeta≥1)│
│ • src/physics/haptic-engine.js (Vibration API pulses)        │
└──────────────────────────────┬───────────────────────────────┘
                               │ Analytical Motion & Tactile Feedback [DONE]
                               ▼
┌──────────────────────────────────────────────────────────────┐
│ M4: GPU Texture Pipeline & Visual Saliency Oracle (R4)       │
│ • src/assets3d/texture-compressor.js (KTX2 UASTC/ETC1S)      │
│ • VRAM compliance auditor (Total VRAM <= 16MB)               │
│ • src/qa/visual-saliency-oracle.js (500ms glance attention)  │
│ • Score_CTA >= 0.18 and DistractionRatio <= 0.35             │
└──────────────────────────────┬───────────────────────────────┘
                               │ Certified GPU Assets & Optical Prominence [DONE]
                               ▼
┌──────────────────────────────────────────────────────────────┐
│ M5: Adverse Hardware Stress Suite & Final Gate (R5)          │
│ • test/stress/adverse-hardware-stress.test.js                │
│ • CDP 6x CPU throttling (Emulation.setCPUThrottlingRate)     │
│ • 30fps rAF clamping (Safari Low Power Mode simulation)      │
│ • WebGL context loss/recovery (WEBGL_lose_context)           │
│ • Full E2E & Unit Test Battery (100% pass)                   │
│ • Forensic Integrity Audit (CLEAN - zero cheating)           │
└──────────────────────────────────────────────────────────────┘
                               │ Final Release Gate [PASSED]
```

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Impeccable Quality Gate Integration | Integrates `detect-antipatterns.mjs` as Tier 4 Quality Gate in `src/qa/` rejecting all 17 surface anti-patterns | M1 | Survey R1 |
| 2 | JumpPlay Screen Sanitization | Surgically removes 26 nested-cards, radioactive halos, overused fonts, and pulsing dots from JumpPlay screens | M1 | Survey R1 |
| 3 | Core Finite State Machine Engine | Pure vanilla JS hierarchical deterministic state machine engine (`src/fsm/core/machine.js`) | M2 | Survey R2 |
| 4 | Zag.js-Style DOM A11y Connector | Connects FSM states and context to DOM attributes (`aria-invalid`, `aria-busy`, `disabled`, `data-state`) | M2 | Survey R2 |
| 5 | B2B Quote & Checkout Form Machines | Complete statecharts for JumpPlay quotation and checkout with latency watchdog and submission control | M2 | Survey R2 |
| 6 | Adaptive Input Masking Engine | Dynamic masking maintaining cursor position with modulo 11 check-digit verification for Brazilian CNPJ/CPF & CEP | M2 | Survey R2 |
| 7 | LocalStorage Draft Persistence | Auto-saving form draft state with 24-hour TTL and seamless restoration upon page reload | M2 | Survey R2 |
| 8 | WCAG 2.2 AA & Keyboard Navigation | Full keyboard operability (Tab order, focus rings $\ge 3:1$) and zero accessibility violations | M2 | Survey R2 / AC |
| 9 | Analytical 2nd-Order Spring Dynamics | Closed-form ODE solution for damped physical harmonic motion across underdamped, critical, and overdamped modes | M3 | Survey R3 |
| 10 | Velocity Continuity Hand-off | Transfers pointer drag velocity directly to initial spring velocity ($v_0 = v_{\text{drag}}$) ensuring $C^1$ continuity | M3 | Survey R3 |
| 11 | Zero-Overshoot Reduced-Motion Clamp | Strictly clamps damping $\zeta \ge 1.0$ and guarantees $0\text{px}$ overshoot when `prefers-reduced-motion` is active | M3 | Survey R3 / AC |
| 12 | Multi-Tier Vibration API Engine | Haptic pulses for detents (12ms), releases (8ms), limits (22ms), and errors (double buzz) via `navigator.vibrate` | M3 | Survey R3 |
| 13 | KTX2 Basis Universal Texture Pipeline | Transcodes 3D textures to KTX2 UASTC/ETC1S, guaranteeing total GPU VRAM $\le 16\text{MB}$ | M4 | Survey R4 / AC |
| 14 | 500ms Visual Saliency Attention Oracle | Simulates human ocular fixation in first 500ms, asserting $\text{Score}_{\text{CTA}} \ge 0.18$ and filtering AI distractions ($\le 0.35$) | M4 | Survey R4 |
| 15 | 6x CPU Throttling Stress Scenario | Playwright CDP simulation of entry-level chipset via `Emulation.setCPUThrottlingRate`, ensuring latency $< 16.6\text{ms}$ | M5 | Survey R5 |
| 16 | 30fps rAF Clamp Stress Scenario | Simulates Safari Low Power Mode by clamping rAF to 30Hz, verifying normalized $\Delta t$ settling parity | M5 | Survey R5 |
| 17 | WebGL Context Lost & Restored Test | Simulates GPU eviction via `WEBGL_lose_context`, verifying zero crash, UI responsiveness, and automatic rehydration | M5 | Survey R5 / AC |
| 18 | Unified Test Battery & Forensic Audit | Executes complete test suite (277 baseline + 106 v2.5 + 36 challenger tests) and independent forensic audit | M5 | Survey AC |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Impeccable Quality Gate & JumpPlay Sanitization | R1: `scripts/detect-antipatterns.mjs`, `src/qa/impeccable-gate.js`, sanitization of JumpPlay screens | none | DONE (13/13 unit tests pass) |
| M2 | Zag/XState FSM Form Primitives & Accessibility | R2: `src/fsm/core/machine.js`, `src/fsm/core/connect.js`, `src/forms/`, masks, draft storage, WCAG | none | DONE (26/26 unit tests pass) |
| M3 | Analytical Spring Dynamics & Haptic Engine | R3: `src/physics/spring-dynamics.js`, `src/physics/haptic-engine.js`, closed-form ODE, reduced motion | none | DONE (35/35 unit tests pass) |
| M4 | GPU Texture Pipeline & Visual Saliency Oracle | R4: `src/assets3d/texture-compressor.js`, `src/qa/visual-saliency-oracle.js`, VRAM <= 16MB | none | DONE (13/13 unit tests pass) |
| M5 | Adverse Hardware Stress Suite & Final Verification | R5: `test/stress/adverse-hardware-stress.test.js`, CDP throttling, 30fps rAF, WebGL loss, Full Gate | M1..M4 | DONE (19/19 stress + 36/36 challenger pass) |

## Interface Contracts

### M1 (Impeccable Gate) Contract
```js
interface ImpeccableGateResult {
  passed: boolean;
  violations: Array<{
    antipattern: string;
    category: 'slop' | 'quality';
    snippet: string;
    line?: number;
    element?: string;
  }>;
  summary: { slopCount: number; qualityCount: number; totalCount: number };
}
```

### M2 (FSM Forms) Contract
```js
interface FormMachineInstance {
  state: 'idle' | 'validating' | 'submitting' | 'error' | 'success';
  context: {
    values: Record<string, any>;
    displayValues: Record<string, string>;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    isValid: boolean;
    isSubmitting: boolean;
    latency: { startedAt: number | null; elapsedMs: number; isDelayed: boolean };
  };
  send(event: { type: string; [key: string]: any }): void;
  subscribe(listener: (state: any) => void): () => void;
}
```

### M3 (Spring Dynamics) Contract
```js
interface SpringDynamicsEvaluator {
  evaluate(tSeconds: number): {
    position: number;
    velocity: number;
    isSettled: boolean;
  };
}
```

### M4 (Visual Saliency) Contract
```js
interface SaliencyAnalysisResult {
  scoreCta: number; // must be >= 0.18
  distractionRatio: number; // must be <= 0.35
  ctaAttentionRank: number; // must be <= 2
  passed: boolean;
}
```

## Code Layout
```
src/
├── cdp/                               # M1 CDP Decompiler & Sanitizer (baseline)
├── kinetic/                           # M2 Kinetic Trajectory & Optical Anchors (baseline)
├── assets3d/                          # M3 3D Assets Pipeline & KTX2 Transcoder (M4)
├── compiler/                          # M4 Kinetic Grammar & Dual-Stack Compiler (baseline)
├── fsm/                               # M2 Finite State Machine Architecture
│   ├── core/
│   │   ├── machine.js                 # Micro-FSM core engine
│   │   └── connect.js                 # DOM ARIA connector
├── forms/                             # M2 Form Flows & Validations
│   ├── b2b-quote-machine.js           # JumpPlay B2B Quote state machine
│   ├── checkout-machine.js            # In-site Checkout state machine
│   ├── masks.js                       # Adaptive masks & Modulo 11 check digits
│   └── draft-storage.js               # LocalStorage draft persistence manager
├── physics/                           # M3 Analytical Physics Engine
│   ├── spring-dynamics.js             # 2nd-order ODE analytical closed-form engine
│   └── haptic-engine.js               # Multi-tier Vibration API coordinator
├── qa/                                # Quality Gates & Oracles
│   ├── unified-quality-gate.js        # Multi-tier Quality Gate orchestrator
│   ├── anti-slop-gate.js              # Lexical anti-slop gate
│   ├── impeccable-gate.js             # Tier 4 Impeccable anti-pattern detector
│   └── visual-saliency-oracle.js      # 500ms ocular fixation & CTA attention oracle
scripts/
│   ├── detect-antipatterns.mjs        # Impeccable anti-pattern CLI
│   └── detect-antipatterns-browser.js # Standalone browser anti-pattern bundle
clientes/
└── jumpflex-home-evolution/
    └── JumpPlay — Family Reveal & Kinetic Range.html # Active JumpPlay screen
test/
├── m1-impeccable-sanitization.test.js  # M1 unit test suite (13 tests)
├── m2-fsm-forms.test.js                # M2 unit test suite (26 tests)
├── m3-spring-dynamics.test.js          # M3 unit test suite (35 tests)
├── m4-gpu-saliency.test.js             # M4 unit test suite (13 tests)
└── stress/
    ├── adverse-hardware-stress.test.js # M5 adverse hardware stress suite (19 tests)
    └── challenger-empirical.test.js    # Challenger 1 empirical test battery (21 tests)
```
