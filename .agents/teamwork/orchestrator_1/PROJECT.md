# Project: Studio DNA Component Reference Pipeline (CRP)

## Architecture
Studio DNA Component Reference Pipeline (CRP) is an evidence-driven interface intelligence engine that acquires external UI component references, decomposes them into normalized ComponentDNA IR, clusters them into reusable Archetypes, and synthesizes verified clean-room implementations for React and Hub Generative UI without source code contamination.

### Architecture Layers & Data Flow
1. **Acquisition Layer (`src/core/`, `src/pro/`)**:
   - `DeterministicCaptureEngine`: Playwright + CDP browser capture with time-freezing (`Date.now`, `performance.now`), font subpixel normalization, CSS Typed OM, bounding client rects, and Accessibility Tree (AOM) extraction. Produces bit-for-bit reproducible SHA-256 hashes (delta = 0).
2. **Intermediate Representation Layer (`schemas/`, `copias/`)**:
   - Canonical Draft 2020-12 JSON Schemas: `ComponentDNA`, `ComponentArchetype`, `ReferenceManifest`, `CertificationRecord`.
   - Tripartite reference corpus: Planes AI Chat, Arc Agent Run, Beautiful UI Approval Card.
3. **Intelligence & Mining Layer (`src/intelligence/`)**:
   - `MotionReverseEngine`: 60fps transform sampler, non-linear least squares (NLLS) regression fitting spring dynamics ($c, k, m$) with < 5% parameter error, and cubic-bezier Newton-Raphson fitting.
   - `SimilarityEngine`: Tree Edit Distance (Zhang-Shasha) on semantic role trees, and state transition matrix isomorphism.
   - `ArchetypeMiner`: Graph clustering engine producing schema-valid `ComponentArchetype` Vault entries.
4. **Synthesis Layer (`src/generators/`, `src/icm/`)**:
   - `CleanRoomCompiler`: Operates with zero read permissions over `copias/` enforced by `ContextIsolationGuardian`. Consumes exclusively ComponentDNA or Archetypes; synthesizes React TSX (Tailwind + Framer Motion) and Hub Generative UI JSON specifications for `ConversationalShell` and `ApprovalGate`.
5. **Runtime Integration Layer (`src/runtime/`)**:
   - `HubAgentRuntime`: Real server-backed state machine binding synthesized components to real Hub Agent events (`agent.tool.request_approval`, action diffs, `agent.run.stream`) with zero mocks.
6. **Verification Layer (`src/qa/`, `test/`)**:
   - `UnifiedCRPQualityGates`: Evaluates 6 mandatory gates (Structural, Box-Diff, Motion Timing, Accessibility, Anti-Slop, Clean-Room Leakage) and emits AJV-valid `CertificationRecord`.
   - `test/crp-pipeline.test.js`: Tripartite vertical slice certified E2E.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Canonical IR JSON Schemas | Draft 2020-12 schemas for ComponentDNA, ComponentArchetype, ReferenceManifest, CertificationRecord compiled via AJV with 0 errors | M1 | R1 |
| 2 | Canonical Tripartite Fixtures | Validated fixtures for Planes AI Chat, Arc Agent Run, and Beautiful UI Approval Card | M1 | R1, Acceptance |
| 3 | Universal Deterministic Browser Capture Engine | Playwright + CDP capture with time-freezing, font rendering flags, AOM extraction, and reproducible SHA-256 (delta = 0) | M2 | R2, Acceptance |
| 4 | Motion Reverse Engineering & NLLS Spring Fitting | 60fps sampling, non-linear least squares regression fitting $c, k, m$ (< 5% error) and cubic-bezier control points | M2 | R3, Acceptance |
| 5 | Tree Edit Distance & Graph Similarity Engine | Zhang-Shasha TED on semantic role trees and transition matrix isomorphism (Planes AI Chat & Arc Agent Run similarity >= 0.80) | M3 | R4, Acceptance |
| 6 | Archetype Mining Engine | Merges convergent components into canonical Vault Archetypes conforming to `component_archetype.v1.schema.json` | M3 | R4 |
| 7 | Strict Clean-Room Compiler & Target Synthesis | Isolated synthesis of React TSX (Tailwind + Framer Motion) and Hub GenUI JSON specs for ConversationalShell and ApprovalGate with zero copias/ access | M4 | R5, Acceptance |
| 8 | Hub Agent Runtime Integration | Real server-backed runtime binding ApprovalGate and ConversationalShell to real events (tool approval, diffs, stream tokens) with zero mocks | M5 | R7 |
| 9 | 6 Mandatory Quality Gates | Structural Integrity, Box-Diff (<=2px), Motion Timing (<=16ms), Accessibility (axe-core=0, keyboard, reduced-motion), Anti-Slop, Clean-Room Leakage | M6 | R6 |
| 10 | Schema-Compliant Certification Record | `issueCertificationRecord` output strictly adheres to `schemas/component_certification.v1.schema.json` | M6 | R6 |
| 11 | Tripartite Vertical Slice Test Suite | `test/crp-pipeline.test.js` executing full pipeline with all 6 Quality Gates passing with status CERTIFIED | M6 | Acceptance |
| 12 | Comprehensive E2E Verification & Adversarial Hardening | Tier 1-4 requirement-driven opaque-box tests + Tier 5 adversarial stress testing | M7 | Dual Track |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Canonical IR Schemas & Reference Fixtures | Validate 4 schemas via AJV 2020; provide and validate Planes AI Chat, Arc Agent Run, Beautiful UI Approval Card fixtures | None | DONE |
| M2 | Deterministic Capture Engine & Motion Reverse Engineering | Implement `DeterministicCaptureEngine` (delta=0 hash) and NLLS spring physics (<5% error) in `MotionReverseEngine` | M1 | IN_PROGRESS |
| M3 | Archetype Mining & Graph Similarity Engine | Implement Tree Edit Distance and Transition Matrix Isomorphism in `SimilarityEngine`; schema-compliant Archetype synthesis in `ArchetypeMiner` | M1 | PLANNED |
| M4 | Strict Clean-Room Compiler & Target Synthesis | Implement isolated React TSX & Hub GenUI synthesis for ConversationalShell and ApprovalGate with `ContextIsolationGuardian` | M1, M3 | PLANNED |
| M5 | Hub Agent Runtime Integration | Implement `HubAgentRuntime` server-backed state machine binding ApprovalGate and ConversationalShell to real events | M4 | PLANNED |
| M6 | Multi-Dimensional Quality Gate Suite & Tripartite Acceptance | Implement all 6 quality gates in `UnifiedCRPQualityGates`, schema-valid certification, and certify tripartite vertical slice in `test/crp-pipeline.test.js` | M1-M5 | PLANNED |
| M7 | Comprehensive E2E Verification & Adversarial Hardening | Execute dual-track E2E verification test harness and adversarial white-box coverage hardening | M6 | PLANNED |

## Interface Contracts
### Schemas ↔ Pipeline Modules
- `ComponentDNA`:
  ```typescript
  interface ComponentDNA {
    dnaVersion: string;
    identity: { id: string; semanticName: string; suggestedArchetype: string };
    provenance: { corpusHash: string; sourceProvider: string; sourceUrl: string; capturedAt: string; licensePolicy: string };
    anatomy: { rootRole: string; subcomponents: Array<{ role: string; optional?: boolean; children?: any[] }> };
    relativeGeometryConstraints?: any;
    stateMachine?: { states: string[]; initialState: string; transitions: Array<{ from: string; to: string; trigger: string }> };
    motionDynamics?: { dynamicType: 'spring' | 'bezier' | 'inert'; parameters: any };
    epistemologicalConfidence: { confidenceLevel: 'OBSERVED' | 'DERIVED' | 'INFERRED' | 'UNKNOWN'; sources: string[] };
  }
  ```
- `ComponentArchetype`:
  ```typescript
  interface ComponentArchetype {
    schemaVersion: string;
    archetypeId: string;
    purpose: string;
    canonicalAnatomy: { rootRole: string; mandatoryRoles: string[]; optionalSlots: string[] };
    stateContract: { canonicalStates: string[]; validTransitions: Array<{ from: string; to: string; trigger: string }> };
    motionPrinciples: { primaryDynamic: 'spring' | 'bezier' | 'inert'; nominalConfig: any };
    accessibilityStandard: { requiredAriaRoles: string[]; keyboardInteractions: string[]; liveRegions?: string[] };
    knownImplementations: Array<{ dnaId: string; provider: string; similarityScore: number }>;
    confidenceScore: number;
  }
  ```
- `CertificationRecord`:
  ```typescript
  interface CertificationRecord {
    schemaVersion: string;
    targetComponentId: string;
    certifiedAt: string;
    status: 'CERTIFIED' | 'REJECTED' | 'CONDITIONAL';
    gatesSummary: {
      structural: boolean;
      visual: boolean;
      interaction: boolean;
      motion: boolean;
      antiSlop: boolean;
      leakage: boolean;
    };
    gateDetails?: any;
  }
  ```

## Code Layout
- `schemas/`: Draft 2020-12 canonical schemas
- `copias/`: Reference corpora (`planes/chat/dna.json`, `arc/agent-run/dna.json`, `beautiful-ui/approval-card/dna.json`)
- `design-vault/components/archetypes/`: Canonical archetypes
- `src/core/deterministic-capture-engine.js`: Universal deterministic Playwright/CDP capture engine
- `src/intelligence/motion-reverse-engine.js`: Motion analysis & NLLS spring fitting
- `src/intelligence/similarity-engine.js`: Tree Edit Distance & state graph isomorphism
- `src/intelligence/archetype-miner.js`: Archetype mining & synthesis
- `src/generators/clean-room-compiler.js`: Clean-room React TSX & Hub GenUI synthesis
- `src/runtime/hub-agent-runtime.js`: Real Hub Agent runtime event bindings
- `src/qa/unified-crp-quality-gates.js`: 6 mandatory quality gates
- `src/icm/context-isolation-guardian.js`: Clean-room sandboxing enforcement
- `test/crp-pipeline.test.js`: Tripartite vertical slice acceptance test
- `test/crp-e2e-suite.test.js`: Comprehensive dual-track E2E verification suite
