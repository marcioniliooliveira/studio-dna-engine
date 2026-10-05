# Studio DNA Component Reference Pipeline (CRP) — Test Infrastructure Specification (TEST_INFRA.md)

## 1. Executive Summary & Philosophy

The Studio DNA Component Reference Pipeline (CRP) is an evidence-driven interface intelligence engine that acquires external UI component references, decomposes them into normalized ComponentDNA Intermediate Representation (IR), clusters them into reusable Archetypes, and synthesizes clean-room implementations for React and Hub Generative UI without source code contamination.

To ensure non-negotiable verification, deterministic fidelity, and zero intellectual property leakage, this test infrastructure is designed following the **Dual-Track Testing Methodology**:
- **Track A (Opaque-Box Requirement-Driven)**: Tiers 1 through 4 verify specification adherence, input/output contracts, boundary tolerance, pairwise integration, and end-to-end multi-agent workloads without reliance on private implementation details.
- **Track B (Implementation Hardening & Quality Gates)**: Tier 5 adversarial stress testing, clean-room leakage detection, anti-slop verification, and mathematical precision bounds.

This infrastructure is engineered with **Progressive Testability**: every test in `test/crp-e2e-suite.test.js` is executable via `node --test test/crp-e2e-suite.test.js` across all development phases (Milestones M1 through M7). Completed modules are verified strictly against authoritative specifications; pending milestone deliverables activate automatically as parallel worker tracks deliver features.

---

## 2. Feature Inventory & Milestone Traceability Matrix

The pipeline comprises 12 primary features spanning Milestones M1 to M7:

| # | Feature Name | Specification / Requirement | Milestone | Primary Modules | Authoritative Contract |
|---|--------------|-----------------------------|-----------|-----------------|------------------------|
| **F01** | Canonical IR JSON Schemas | Draft 2020-12 schemas compile cleanly under AJV with 0 errors | M1 | `schemas/*.schema.json` | `schemas/component_dna.v1.schema.json`, `component_archetype.v1.schema.json`, `reference_manifest.v1.schema.json`, `component_certification.v1.schema.json` |
| **F02** | Canonical Tripartite Fixtures | Planes AI Chat, Arc Agent Run, Beautiful UI Approval Card validate against schema | M1 | `copias/**/dna.json` | `schemas/component_dna.v1.schema.json` |
| **F03** | Universal Deterministic Browser Capture Engine | Playwright + CDP capture with time freezing, font normalization, AOM extraction, SHA-256 delta = 0 | M2 | `src/core/deterministic-capture-engine.js` | SHA-256 bit-for-bit reproducibility |
| **F04** | Motion Reverse Engineering & NLLS Spring Fitting | 60fps sampling, non-linear least squares fitting $c, k, m$ (< 5% error), cubic-bezier fitting | M2 | `src/intelligence/motion-reverse-engine.js` | Damped harmonic oscillator equation $x(t) = 1 - e^{-\zeta \omega_0 t} \cos(\omega_d t)$ |
| **F05** | Tree Edit Distance & Graph Similarity Engine | Zhang-Shasha TED on semantic role trees, transition matrix isomorphism, similarity $\ge 0.80$ | M3 | `src/intelligence/similarity-engine.js` | Composite score: 60% semantic anatomy, 40% state transition isomorphism |
| **F06** | Archetype Mining Engine | Merges convergent components into canonical Vault Archetype schema | M3 | `src/intelligence/archetype-miner.js` | `schemas/component_archetype.v1.schema.json` |
| **F07** | Strict Clean-Room Compiler & Target Synthesis | Isolated synthesis of React TSX and Hub GenUI JSON specs with zero `copias/` access | M4 | `src/generators/clean-room-compiler.js`, `src/icm/context-isolation-guardian.js` | `ContextIsolationGuardian` sandboxing |
| **F08** | Hub Agent Runtime Integration | Real server-backed state machine binding ApprovalGate & ConversationalShell to runtime events | M5 | `src/runtime/hub-agent-runtime.js` | Runtime events: `agent.tool.request_approval`, action diffs, `agent.run.stream` |
| **F09** | 6 Mandatory Quality Gates | Box-Diff ($\le 2\text{px}$), Motion Timing ($\le 16\text{ms}$), A11y (axe-core = 0), Anti-Slop, Clean-Room Leakage, Structural | M6 | `src/qa/unified-crp-quality-gates.js` | 6 gate verification reports |
| **F10** | Schema-Compliant Certification Record | `issueCertificationRecord` strictly adheres to `component_certification.v1.schema.json` | M6 | `src/qa/unified-crp-quality-gates.js` | `schemas/component_certification.v1.schema.json` |
| **F11** | Tripartite Vertical Slice Acceptance Test | Full end-to-end pipeline certified in `test/crp-pipeline.test.js` | M6 | `test/crp-pipeline.test.js` | All 6 gates return status `CERTIFIED` |
| **F12** | Comprehensive E2E Verification & Adversarial Hardening | Dual Track Tiers 1-4 + Tier 5 adversarial stress testing | M7 | `test/crp-e2e-suite.test.js` | 100% pass across all operational gates |

---

## 3. Four-Tier Test Architecture (Dual Track)

```
========================================================================================
                              STUDIO DNA CRP TEST HARNESS
========================================================================================
 [TIER 1: Core Functional Feature Coverage]
    ├── F01: AJV Schema 2020-12 Compilation (4/4 schemas)
    ├── F02: Tripartite Reference Fixture Integrity & Validation
    ├── F03: Universal Capture Engine Determinism & Bit-for-Bit Hash
    ├── F04: Motion Dynamics Classification & Parameter Fitting (Spring/Bezier)
    ├── F05: Semantic Tree Edit Distance & State Matrix Isomorphism
    ├── F06: Archetype Clustering & Vault Induction
    ├── F07: Clean-Room Compiler Synthesis (React TSX & Hub GenUI Spec)
    ├── F08: Hub Agent Runtime Event Binding & State Transitions
    ├── F09: Quality Gate Execution (Box-Diff, Timing, Slop, Leakage)
    └── F10: Canonical Certification Record Emission

 [TIER 2: Boundary Value Analysis & Corner Cases]
    ├── B01: Extreme Motion Physics (k -> 0, k -> 1000, c -> 0, c -> 100)
    ├── B02: Empty/Null Component Inputs & Degradation Resilience
    ├── B03: Malformed Schema Rejections & AJV Error Reporting
    ├── B04: Disjoint Semantic Anatomy Trees (0.0 Similarity Bounds)
    ├── B05: Zero-Transition FSM Graphs & Single-State Edge Cases
    ├── B06: Negative & Fractional Geometry Rects in Box-Diff Linter
    └── B07: Anti-Slop Boundary Cases (Substrings, False-Positive Tokens)

 [TIER 3: Pairwise Combinatorial & Cross-Feature Integration]
    ├── P01: Capture Engine -> Canonical IR Pipeline Pass-Through
    ├── P02: Multi-Corpus IR -> Archetype Miner -> Schema Verification
    ├── P03: Archetype -> Clean-Room Compiler -> Context Isolation Guardian
    ├── P04: Compiler TSX Output -> Quality Gates Evaluation
    └── P05: Hub GenUI Spec -> Hub Agent Runtime Event Dispatcher

 [TIER 4: Real-World Multi-Agent Workloads & Scenarios]
    ├── S01: Workload 1: Planes AI Chat End-to-End Pipeline
    ├── S02: Workload 2: Arc Agent Run End-to-End Pipeline
    └── S03: Workload 3: Beautiful UI Approval Card End-to-End Pipeline
========================================================================================
```

---

## 4. Test Design Methodology: Category-Partition & Boundary Analysis

### 4.1 Category-Partition Specifications

#### Category C1: Canonical Schemas (F01)
- **Partitions**:
  - Valid Draft 2020-12 schema object
  - Missing `$schema` or `$id`
  - Unsupported keyword or invalid regex pattern
- **Expected Results**: Valid schemas compile with AJV 2020 and 0 errors; invalid schemas throw during compilation.

#### Category C2: Motion Samples (F04)
- **Partitions**:
  - Overshoot sequence ($v_{\max} > 1.01$): classified as `spring`
  - Monotonic curve ($0 \le v \le 1.0$): classified as `cubic-bezier`
  - Underdamped oscillation ($\zeta < 1.0$): fitted $k \in [10, 1000]$, $c \in [1, 100]$
  - Degenerate/empty sample set: graceful fallback to default parameters ($k=180, c=20$)
  - Inverted / negative values ($v < -0.01$): classified as `spring`

#### Category C3: Semantic Role Anatomy (F05, F06)
- **Partitions**:
  - Identical anatomy trees: Similarity = 1.0
  - Completely disjoint role vocabularies: Similarity < 0.20
  - Overlapping subtrees with differing roots: Partial similarity ($0.40 \le s \le 0.80$)
  - Multi-component corpus: Cluster size $\ge 2$ triggers canonical archetype induction

#### Category C4: Clean-Room Compilation & Isolation (F07)
- **Partitions**:
  - Compliant ComponentDNA: Emits valid TSX with typed props, framer-motion, accessible ARIA roles
  - Illegal file access targeting `copias/`: Throws `[ICM VIOLATION]`
  - Output containing proprietary tokens (`useplanes`, `arc-ui`): Flagged by `ContextIsolationGuardian`
  - Clean synthesized output: Passes `auditSynthesizedOutput` with `safe: true`

#### Category C5: Quality Gate Tolerances (F09, F10)
- **Partitions**:
  - Box-Diff: $\Delta \le 2.0\text{px}$ $\rightarrow$ `passed: true`; $\Delta > 2.0\text{px}$ $\rightarrow$ `passed: false`
  - Motion Timing: $\Delta \le 16.0\text{ms}$ $\rightarrow$ `passed: true`; $\Delta > 16.0\text{ms}$ $\rightarrow$ `passed: false`
  - Anti-Slop: Zero prohibited patterns $\rightarrow$ `passed: true`; presence of `useplanes` or `style={{` $\rightarrow$ `passed: false`
  - Clean-Room Leakage: 0 matching upstream lines $\rightarrow$ `passed: true`; $>0$ matching lines $\rightarrow$ `passed: false`

---

## 5. Pairwise Combinatorial Test Matrix (Tier 3)

| Test ID | Factor 1: Input Source | Factor 2: Intelligence Layer | Factor 3: Synthesis Target | Factor 4: Quality Gate Verdict |
|---------|------------------------|------------------------------|----------------------------|--------------------------------|
| **P-01** | Planes AI Chat Fixture | Spring Parameter Fitting | React TSX (Tailwind/Motion)| `CERTIFIED` |
| **P-02** | Arc Agent Run Fixture | Bezier Parameter Fitting | Hub GenUI Specification | `CERTIFIED` |
| **P-03** | Beautiful UI Approval | State Isomorphism Check | React TSX (ApprovalGate) | `CERTIFIED` |
| **P-04** | Multi-Fixture Corpus | Archetype Clustering | Archetype Vault Storage | `CERTIFIED` |
| **P-05** | Dirty/Leaked Reference | None (Compiler Sandboxed) | Synthesized TSX | `REJECTED` (ICM Violation) |

---

## 6. Real-World Application Workloads (Tier 4)

### Workload S01: Planes AI Chat End-to-End
1. Ingest `copias/planes/chat/dna.json`.
2. Validate against `component_dna.v1.schema.json`.
3. Extract motion dynamics: verify spring curve parameters ($k=220, c=18, m=1$).
4. Compile to clean-room React TSX: verify `ConversationalShell`, zero proprietary tokens, framer-motion spring config.
5. Compile to Hub GenUI JSON: verify topic `agent.tool.request_approval` and slots.
6. Evaluate against Quality Gates: Box-Diff $\le 2\text{px}$, Timing $\le 16\text{ms}$, Anti-Slop = true, Leakage = true.

### Workload S02: Arc Agent Run End-to-End
1. Ingest `copias/arc/agent-run/dna.json`.
2. Verify composite similarity with Planes AI Chat $\ge 0.80$.
3. Induce canonical `ConversationalShell` archetype with shared mandatory roles.
4. Verify archetype conformance to `component_archetype.v1.schema.json`.

### Workload S03: Beautiful UI Approval Card End-to-End
1. Ingest `copias/beautiful-ui/approval-card/dna.json`.
2. Synthesize `ApprovalGate` component and GenUI schema.
3. Simulate Hub Agent runtime lifecycle:
   - Initial state: `awaiting_approval`
   - Event: `agent.tool.request_approval` payload with action diff
   - User action: `APPROVE` transition to `executing`
   - User action: `REJECT` transition to `cancelled`
4. Confirm state machine contract holds across all transitions.

---

## 7. Progressive Milestone Gate Architecture

The test suite incorporates progressive capability discovery:

```javascript
function requiresMilestone(milestone, featureDescription, condition) {
  if (!condition) {
    return {
      run: false,
      reason: `[PROGRESSIVE GATE] ${featureDescription} is scheduled for Milestone ${milestone} and not yet available in environment.`
    };
  }
  return { run: true };
}
```

When a milestone is pending or actively in development:
- The runner reports a clean `skip` with the exact milestone linkage.
- Total exit code remains `0` (clean CI build).
- Once the milestone worker writes the implementation, the test automatically executes without modifying test code!

---

## 8. Test Execution Commands & Environment

- **Direct Runner Command**:
  ```bash
  node --test test/crp-e2e-suite.test.js
  ```
- **Verbose Spec Reporter**:
  ```bash
  node --test --test-reporter=spec test/crp-e2e-suite.test.js
  ```
- **Tripartite Slice Acceptance**:
  ```bash
  node --test test/crp-pipeline.test.js
  ```
- **Full Test Suite**:
  ```bash
  npm test
  ```

---

## 9. Test Integrity Invariants

1. **Zero Facade Testing**: Every test asserts observable state, schema validation return codes, or mathematical equality. No tests pass trivially without exercising code.
2. **Deterministic Physics**: Motion parameter tests verify mathematical relations derived from damped harmonic oscillations, not hardcoded arbitrary values.
3. **Clean-Room Enforcement**: Strict assertion that tests never bypass `ContextIsolationGuardian` or load files from unauthorized directories.
