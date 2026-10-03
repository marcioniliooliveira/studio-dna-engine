# E2E Test Infra: High-Fidelity Front-End Generation and Transmutation System

## Test Philosophy
- Opaque-box, requirement-driven. Derived strictly from `ORIGINAL_REQUEST.md` and user-facing specifications without coupling to internal private methods.
- Methodology: 4-Tier systematic coverage:
  - **Tier 1**: Feature Coverage (>=5 per feature)
  - **Tier 2**: Boundary & Corner Cases (>=5 per feature)
  - **Tier 3**: Cross-Feature Combinations (Pairwise coverage)
  - **Tier 4**: Real-World Application Scenarios (End-to-end user workflows)

## Feature Inventory
| # | Feature | Source (Requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | CDP Ingestion & Session Manager | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 2 | In-Memory Kinetic Hook Injector | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 3 | 3-Tier Tracker Sanitizer | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 4 | Semantic Skeleton Normalizer | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 5 | Orbital Camera Trajectory Solver \vec{C}(s) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 6 | Dynamic Optical Anchor Tracker | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 7 | Viewport & Motion Adaptation Rig | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 8 | Dynamic SVG Leader Line Coordinator | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 9 | 3D Mesh Decimator & Quantizer | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 10 | GPU Texture Compressor (KTX2 / ASTC) | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 11 | VRAM & Disk Compliance Auditor | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 12 | Modular Kinetic Composition Grammar (@scope) | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |
| 13 | Edge CDN Static Compiler | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |
| 14 | Next.js 15 App Router RSC Compiler | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |
| 15 | Deterministic AST Anti-Slop Transformer | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |
| 16 | DeepScrutinyGate 3D Declared Pairs & Collision | Acceptance Criteria §1 | 5 | 5 | ✓ |
| 17 | Continuous 58+ fps Inertial Scroll Profiler | Acceptance Criteria §2 | 5 | 5 | ✓ |

## Test Architecture
- **Test Runner**: Node native test runner (`node --test test/e2e/*.test.js`) executed with standalone ephemeral preview server support.
- **Pass/Fail Semantics**: Exit code 0, 0 unhandled promise rejections, 0 assertion errors, 100% test pass.
- **Viewports Tested**:
  - Desktop: 1440x900
  - Mobile: 390x844 (iOS Retina iPhone viewport)
- **Directory Layout**:
  ```
  test/
  ├── e2e/
  │   ├── e2e-harness.js                     # Test harness & ephemeral server manager
  │   ├── tier1-feature-coverage.test.js     # Tier 1 tests (>= 85 test cases)
  │   ├── tier2-boundary-corner.test.js      # Tier 2 tests (>= 85 test cases)
  │   ├── tier3-pairwise-combinations.test.js# Tier 3 tests (>= 17 test cases)
  │   └── tier4-realworld-scenarios.test.js  # Tier 4 tests (>= 9 test cases)
  ```

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Full Awwwards Reference Cloned & Decompiled | F1, F2, F3, F4 | High |
| 2 | 3D Product Presentation with Dynamic Optical Callouts | F5, F6, F7, F8, F16 | High |
| 3 | Mobile Safari Viewport Ingestion & Scroll Invariance | F6, F7, F8, F11, F16, F17 | High |
| 4 | Mobile CAD Model Decimation to <3MB & <4MB VRAM | F9, F10, F11 | High |
| 5 | Edge CDN Deployment with CSS @scope Zero-Bleed | F12, F13, F15, F16 | Medium |
| 6 | Next.js 15 App Router RSC Export & Hydration Isolation | F12, F14, F15 | High |
| 7 | High-Inertia Scroll 60fps Profiling on WebKit | F5, F8, F16, F17 | High |
| 8 | Anti-Slop & Brand Transmutation Validation | F3, F4, F15 | Medium |
| 9 | Dual-Stack Parity Gate (Edge CDN vs Next.js 15) | F13, F14, F15, F16 | High |

## Coverage Thresholds
- **Tier 1**: ≥ 5 per feature (17 features × 5 = 85 test cases)
- **Tier 2**: ≥ 5 per feature (17 features × 5 = 85 test cases)
- **Tier 3**: ≥ 17 pairwise interaction test cases
- **Tier 4**: ≥ 9 realistic application scenarios
- **Total Minimum Target**: ≥ 196 test cases
