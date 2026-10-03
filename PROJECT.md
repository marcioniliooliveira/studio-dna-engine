# Project: High-Fidelity Front-End Generation and Transmutation System

## Architecture
The system is an automated, deterministic front-end generation and transmutation engine that ingests reference URLs from Awwwards and client brand specifications, producing kinetic, 3D websites with 0px² layout overlap, zero aesthetic degradation (anti-slop), guaranteed continuous 60fps rendering across desktop and mobile, and dual compilation to static Edge CDN HTML and Next.js 15 App Router RSC.

```
[Reference URL]
       │
       ▼ (CDP Interception & Sanitization)
┌────────────────────────────────────────────────────────┐
│ M1: src/cdp/                                           │
│ • KineticTimelineInterceptor (Animation, DOM, CSS)     │
│ • RuntimeHookInjector (RAF, GSAP, WebGL camera)        │
│ • TrackerSanitizer (CDP network block + AST strip)     │
│ • SemanticSkeletonNormalizer (unmask, local assets)    │
└──────────────────────────┬─────────────────────────────┘
                           │ Sanitized Skeleton & Kinetic IR
                           ▼
┌────────────────────────────────────────────────────────┐
│ M2: src/kinetic/                                       │
│ • TrajectorySolver (\vec{C}(s) Catmull-Rom / Squad)    │
│ • OpticalAnchorTracker (NDC projection, BVH/Normal)    │
│ • AnchorCoordinator (SVG leader lines, 0px² AABB)      │
│ • AdaptiveConstraints (C3 Viewport FOV, C4 Motion)     │
└──────────────────────────┬─────────────────────────────┘
                           │ Trajectory Function & Anchor Points
                           ▼
┌────────────────────────────────────────────────────────┐
│ M3: src/assets3d/                                      │
│ • GltfOptimizerPipeline (@gltf-transform decimate)     │
│ • TextureCompressor (KTX2 / ASTC_4x4 / ORM packed)     │
│ • MeshQuantizer (KHR_mesh_quantization 14B/vertex)     │
│ • VramAuditor (<4MB mesh VRAM, <3MB disk, Safari limit)│
└──────────────────────────┬─────────────────────────────┘
                           │ Optimized Assets (<1.7MB, <3.6MB VRAM)
                           ▼
┌────────────────────────────────────────────────────────┐
│ M4: src/compiler/                                      │
│ • KineticGrammarSchema (Zod stage & slot primitives)   │
│ • EdgeStaticCompiler (CSS @scope + <15KB micro-runtime)│
│ • NextJsRscCompiler (Next 15 RSC + "use client" island)│
│ • AntiSlopTransformer (Deterministic AST, ±15% budget) │
└──────────────────────────┬─────────────────────────────┘
                           │ Dual Production Builds
                           ▼
┌────────────────────────────────────────────────────────┐
│ M5: Final Milestone & Verification                     │
│ • E2E Test Suite (Tiers 1-4: 100% pass via npm test)   │
│ • DeepScrutinyGate (8 vectors, 0px² AABB, 0px bleed)   │
│ • Tier 5 Adversarial Coverage Hardening                │
│ • Forensic Integrity Audit (Zero cheating / clean)     │
└────────────────────────────────────────────────────────┘
```

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | CDP Ingestion & Session Manager | Intercepts Animation, DOM, CSS, Performance domains via CDP session | M1 | Survey R1 |
| 2 | In-Memory Kinetic Hook Injector | Pre-injects RAF delta measurement, GSAP ticker hook, and WebGL camera matrix sniffer | M1 | Survey R1 |
| 3 | 3-Tier Tracker Sanitizer | Strips analytics, trackers, pixels via CDP network block, global stubs, Cheerio/PostCSS AST | M1 | Survey R1 |
| 4 | Semantic Skeleton Normalizer | Neutralizes hostile overflow, unmasks SplitText, strips preloader traps, localizes CDN assets | M1 | Survey R1 |
| 5 | Orbital Camera Trajectory Solver | Computes continuous \vec{C}(s) via Centripetal Catmull-Rom C² splines & Squad C¹ quaternions | M2 | Survey R2 |
| 6 | Dynamic Optical Anchor Tracker | Projects 3D world points to 2D NDC screen coordinates with normal back-face and BVH culling | M2 | Survey R2 |
| 7 | Viewport & Motion Adaptation Rig | C3 mobile portrait FOV/distance compensation (+0.15m safe area) & C4 reduced motion damping | M2 | Survey R2 |
| 8 | Dynamic SVG Leader Line Coordinator | Coordinates animated SVG paths and DOM annotation badges with AABB spring relaxation (0px² overlap) | M2 | Survey R2 |
| 9 | 3D Mesh Decimator & Quantizer | Decimates geometry, welds coincident vertices, applies KHR_mesh_quantization (14B/vertex) & Meshopt | M3 | Survey R3 |
| 10 | GPU Texture Compressor | Transcodes textures to KTX2 Basis Universal (ASTC_4x4 / UASTC 1B/px) & packs ORM (AO/Rough/Metal) | M3 | Survey R3 |
| 11 | VRAM & Disk Compliance Auditor | Mathematically validates mesh VRAM < 4MB, disk < 3MB, and iOS WebKit peak scene <= 384MB | M3 | Survey R3 |
| 12 | Modular Kinetic Composition Grammar | Defines declarative kinetic primitives schema with CSS @scope donut isolation to ([data-kinetic-slot]) | M4 | Survey R4 |
| 13 | Edge CDN Static Compiler | Exports standalone HTML5 + scoped CSS + <15KB micro-runtime Three.js/KTX2 loader for Edge CDNs | M4 | Survey R4 |
| 14 | Next.js 15 App Router RSC Compiler | Exports Next 15 App Router directory (layout.tsx, page.tsx, static RSC sections + client islands) | M4 | Survey R4 |
| 15 | Deterministic AST Anti-Slop Transformer | Enforces zero AI slop, zero brand leaks, zero raw slot placeholders, and character budgets ±15% | M4 | Survey R4 |
| 16 | E2E Test Harness & Unified Runner | Test runner with standalone preview server orchestration across 1440x900 & 390x844 viewports | E2E Track | Survey AC-3.1 |
| 17 | Tiers 1-4 Test Suite | Feature coverage, BVA/edge cases, pairwise interactions, real-world application scenarios | E2E Track | Survey AC |
| 18 | DeepScrutinyGate 3D Contract & Collision Gate | Evaluates AABB text overlap 0px², 0px horizontal bleed, and declared 3D front/back matrix3d pairs | M5 | Survey AC-1 |
| 19 | Inertial Scroll Performance Profiler | Validates continuous >= 58fps inertial scroll with frame render duration <= 16.6ms | M5 | Survey AC-2 |
| 20 | Tier 5 Adversarial Coverage Hardening | White-box source analysis, adversarial boundary tests, and zero-slop verification | M5 | Survey AC |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | CDP Semantic Decompiler & Sanitizer | R1: `src/cdp/` (interceptor, hook injector, sanitizer, normalizer) | none | DONE (11/11 unit tests pass) |
| M2 | Kinetic Trajectory & Optical Anchors | R2: `src/kinetic/` (trajectory solver, anchor tracker, coordinator, adaptive rigs) | none | DONE (22/22 unit tests pass) |
| M3 | Ultralight 3D Mobile Assets Pipeline | R3: `src/assets3d/` (gltf optimizer, texture compressor, quantizer, vram auditor) | none | DONE (16/16 unit tests pass) |
| M4 | Kinetic Grammar & Dual-Stack Compiler | R4: `src/compiler/` (kinetic grammar, edge compiler, nextjs compiler, anti-slop) | M1, M2, M3 contracts | DONE (28/28 unit tests pass) |
| E2E | E2E Testing Track | Test infra, runner, Tiers 1-4 test suite, `TEST_READY.md` publication | none | DONE (TEST_READY.md published, 196 E2E tests) |
| M5 | Final Milestone: 100% E2E & Tier 5 Hardening | Phase 1: 100% E2E test pass; Phase 2: Tier 5 adversarial hardening + Forensic Audit | M1..M4, E2E Track | IN_PROGRESS |

## Interface Contracts

### M1 (CDP Decompiler) ↔ M2 (Kinetic Trajectory) & M4 (Compiler)
- **KineticTimelineIR**:
  ```ts
  interface KineticTimelineIR {
    sourceUrl: string;
    viewport: { width: number; height: number; dpr: number };
    cssAnimations: Array<{
      id: string;
      targetSelector: string;
      type: 'CSSAnimation' | 'CSSTransition' | 'WebAnimation';
      durationMs: number;
      delayMs: number;
      easing: string;
      keyframes: Array<{ offset: number; properties: Record<string, string> }>;
    }>;
    gsapTimelines: Array<{
      triggerSelector?: string;
      startBound?: string;
      endBound?: string;
      scrub: boolean | number;
      pin: boolean | string;
      tweens: Array<{ targetSelector: string; duration: number; ease: string; vars: Record<string, any> }>;
    }>;
    webglRenders: Array<{
      canvasSelector: string;
      cameraFov: number;
      cameraTrajectorySamples: Array<{
        scrollProgress: number; // s in [0, 1]
        position: [number, number, number];
        target: [number, number, number];
        quaternion: [number, number, number, number];
      }>;
    }>;
    sanitizationReport: { blockedRequestsCount: number; strippedScriptsCount: number; isClean: boolean };
  }
  ```

### M2 (Kinetic Trajectory) ↔ M4 (Compiler)
- **Trajectory & Anchor Contract**:
  ```ts
  interface TrajectoryEvaluator {
    evaluate(s: number): {
      position: [number, number, number];
      target: [number, number, number];
      up: [number, number, number];
      fov: number;
    };
  }
  interface OpticalAnchor {
    id: string;
    worldPoint: [number, number, number];
    normal: [number, number, number];
    title: string;
    description: string;
    safeArea: { xMin: number; xMax: number; yMin: number; yMax: number };
  }
  ```

### M3 (3D Pipeline) ↔ M4 (Compiler)
- **Asset Manifest Contract**:
  ```ts
  interface OptimizedAssetManifest {
    modelPath: string; // relative path to .glb
    diskSizeBytes: number; // strictly < 3,145,728 bytes
    vramFootprintBytes: number; // strictly < 4,194,304 bytes
    geometryBytes: number;
    textureBytes: number;
    textureCompression: 'KTX2_ASTC' | 'KTX2_UASTC';
    meshQuantization: boolean; // KHR_mesh_quantization: true
    meshoptCompression: boolean; // KHR_meshopt_compression: true
    isWebKitCertified: boolean;
  }
  ```

### M4 (Compiler) ↔ Outputs
- **Dual-Stack Targets**:
  - `dist/edge-cdn/`: `index.html`, `styles.css` (enclosing `@scope (.kinetic-stage) to ([data-kinetic-slot])`), `runtime/kinetic-micro.js`, `assets/`.
  - `dist/nextjs15/`: `app/layout.tsx`, `app/page.tsx`, `components/server/KineticSection.tsx` (RSC, 0 client JS), `components/client/KineticSceneIsland.tsx` ("use client"), `components/client/OpticalAnchorIsland.tsx` ("use client").

## Code Layout
```
src/
├── cdp/
│   ├── kinetic-timeline-interceptor.js
│   ├── runtime-hook-injector.js
│   ├── tracker-sanitizer.js
│   └── semantic-skeleton-normalizer.js
├── kinetic/
│   ├── trajectory-solver.js
│   ├── optical-anchor-tracker.js
│   ├── dynamic-anchor-coordinator.js
│   └── adaptive-constraints.js
├── assets3d/
│   ├── gltf-optimizer-pipeline.js
│   ├── texture-compressor.js
│   ├── mesh-quantizer.js
│   └── vram-auditor.js
├── compiler/
│   ├── kinetic-grammar-schema.js
│   ├── edge-static-compiler.js
│   ├── nextjs-rsc-compiler.js
│   └── anti-slop-transformer.js
├── qa/
│   ├── deep-scrutiny-gate.js
│   ├── kinetic-telemetry-extractor.js
│   └── anti-slop-gate.js
└── test/
    ├── e2e/
    │   ├── runner.js
    │   ├── tier1-feature-coverage.test.js
    │   ├── tier2-boundary-corner.test.js
    │   ├── tier3-cross-feature.test.js
    │   └── tier4-realworld-scenarios.test.js
    └── ...
```
