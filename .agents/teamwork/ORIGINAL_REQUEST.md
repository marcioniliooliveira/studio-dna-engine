# Original User Request

## 2026-10-05T19:32:46Z

Build, integrate, and verify the Studio DNA Component Reference Pipeline (CRP): an evidence-driven interface intelligence engine that acquires external UI component references, decomposes them into normalized ComponentDNA IR, clusters them into reusable Archetypes, and synthesizes verified clean-room implementations for React and Hub Generative UI without source code contamination.

Working directory: c:\Users\USER\Documents\scraper e extracor\studio-dna-engine
Integrity mode: development

## Requirements

### R1. Canonical Intermediate Representation (IR) Schemas & Fixtures
Maintain and validate strict JSON Schemas (Draft 2020-12) for ComponentDNA (anatomy, relative geometry constraints, FSM state machine, 60fps motion dynamics, and strict epistemological confidence mapping: OBSERVED, DERIVED, INFERRED, UNKNOWN), ComponentArchetype, ReferenceManifest, and CertificationRecord. Ensure all schemas compile via AJV with 0 errors.

### R2. Universal Acquisition & Deterministic Capture Engine
Implement and expand the deterministic browser capture engine using Playwright and the Chrome DevTools Protocol (CDP) that freezes time, eliminates subpixel font anti-aliasing variations, intercepts animations, and extracts normalized DOM, CSS Typed OM, bounding client rects, and accessibility trees (AOM) with reproducible SHA-256 content hashes (delta = 0 across runs).

### R3. Motion Reverse Engineering & Physics Fitting
Implement a motion analysis module that samples CSS transforms at 60fps during transitions and uses non-linear least squares regression to calculate damping (c), stiffness (k), and mass (m) for spring dynamics, and control points (x1, y1, x2, y2) for cubic-bezier curves.

### R4. Archetype Mining & Graph Similarity Engine
Implement an automated archetype clustering engine that measures multidimensional similarity using Tree Edit Distance (TED) on semantic role trees and state transition matrix isomorphism, merging convergent components into canonical Vault Archetypes without vendor-specific code.

### R5. Strict Clean-Room Compiler & Target Synthesis
Implement a synthesis compiler that operates with zero read permissions over raw reference copies (copias/). The compiler consumes exclusively ComponentDNA or Archetypes and emits:
1. Native, accessible, production-ready React TSX with Tailwind and Framer Motion.
2. Declarative Hub Generative UI JSON specifications.

### R6. Executable Multi-Dimensional Quality Gate Suite
Implement and execute the automated verification harness with the 6 mandatory gates:
1. Structural integrity (TypeScript/Node syntax valid).
2. Box-Diff Linter (max deviation <= 2.0px).
3. Motion Timing Equivalence (delta <= 16.0ms).
4. Accessibility Conformance (axe-core = 0 violations, full keyboard navigation, prefers-reduced-motion support).
5. Anti-Slop Purity (zero vendor names, zero placeholders, zero loose inline styles).
6. Clean-Room Leakage (zero consecutive lines or hashes from upstream references).

### R7. Hub Agent Runtime Integration
Bind the synthesized components (such as ApprovalGate and ConversationalShell) to real Hub Agent runtime events (tool approval requests, action diffs, and stream tokens) with zero mocks and real server-backed states.

## Acceptance Criteria

### Canonical Schemas & Fixtures
- [ ] All schemas compile via AJV with zero errors.
- [ ] Fixtures for Planes AI Chat, Arc Agent Run, and Beautiful UI Approval Card validate against component_dna.v1.schema.json.

### Capture & Motion Determinism
- [ ] Running the deterministic capture engine twice on the same reference yields identical SHA-256 hashes (delta = 0).
- [ ] The motion reverse engine reconstructs spring physics parameters (stiffness/damping) with < 5% error on a known synthetic transition.

### Archetype Convergence & Similarity
- [ ] The similarity engine computes composite scores >= 0.80 between Planes AI Chat and Arc Agent Run, correctly clustering them into 'ConversationalShell'.

### Clean-Room & Quality Gate Execution
- [ ] The compiler emits original TSX and GenUI specs without accessing copias/.
- [ ] The full tripartite vertical slice passes in test/crp-pipeline.test.js with all 6 Quality Gates passing with status CERTIFIED.

## Follow-up — 2026-10-05T20:17:19Z

System server restarted. Please resume immediately from your current state:
1. Revive the orchestrator `dbadde34-0d7d-469a-abac-7c43019a623f` (working directory: `c:\Users\USER\Documents\scraper e extracor\studio-dna-engine\.agents\teamwork\orchestrator_1`) by sending it a message to inspect `progress.md`, collect/restart the M1 Verification Gate reviewers/auditors if needed, and proceed through Milestones M2, M3, M4, M5, M6, and M7 until 100% of `test/crp-e2e-suite.test.js` and `test/crp-pipeline.test.js` pass with zero skips and full certification.
2. Re-enable your monitoring crons (Progress Reporting and Liveness Check) if they were stopped by the restart.

