# BRIEFING — 2026-10-03T07:22:00Z

## Mission
Survey technical architecture, feasibility, interfaces, and module boundaries for requirements R1-R4 (CDP kinetic interception, continuous orbital camera & optical tracking, 3D ultralight pipeline, kinetic composition grammar & dual-stack compiler).

## 🔒 My Identity
- Archetype: explorer
- Roles: [explorer, synthesis]
- Working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_explorer_survey_2
- Original parent: 7f17d6be-3ed5-4772-a1bc-f856778ab425
- Milestone: step_0_survey

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Produce comprehensive findings in handoff.md with 5-component structure
- Address R1, R2, R3, R4 in depth: CDP timelines & sanitization, orbital camera \vec{C}(s) & optical anchors, 3D <3MB/<4MB VRAM pipeline, CSS @scope & dual-stack compiler

## Current Parent
- Conversation ID: 7f17d6be-3ed5-4772-a1bc-f856778ab425
- Updated: 2026-10-03T07:22:00Z

## Investigation State
- **Explored paths**: `ORIGINAL_REQUEST.md`, `package.json`, `src/qa/kinetic-telemetry-extractor.js`, `src/qa/deep-scrutiny-gate.js`, `src/qa/anti-slop-gate.js`, `src/core/cloner.js`, `src/core/dna-extractor.js`, `src/generators/hud-projector.js`, `src/runtime/scroll-resilience-runtime.js`, `src/constraints/geometry.js`, `test/kinetic-telemetry-extractor.test.js`.
- **Key findings**:
  1. R1 (CDP kinetic timeline & sanitization): CDP session enables `Animation.enable`, `CSS.getMatchedStylesForNode`, `DOM.getBoxModel`, `Performance.enable`. JS-driven loops (GSAP ticker, RAF, Three.js render) require in-memory hook injection (`Page.addScriptToEvaluateOnNewDocument`). Tracker sanitization requires 3-layer defense: network request blocking (`Network.setBlockedURLs`), global mock stubs (`gtag`, `fbq`), and Cheerio/PostCSS AST sanitization.
  2. R2 (Orbital camera \vec{C}(s) & optical anchors): Trajectory modeled via spherical coordinates with centripetal Catmull-Rom splines ($C^2$ continuous) and Squad unit quaternion interpolation ($C^1$ smooth orientation). World-to-screen projection $\vec{X}_{\text{screen}} = \text{Viewport}(\mathbf{P}(s) \cdot \mathbf{V}(s) \cdot \vec{X}_w)$ with normal back-face culling ($\vec{n}_w \cdot \vec{v}_{\text{ray}} \le 0$) and BVH raycast occlusion testing. Dynamic SVG leader lines bind to HTML annotations guarded by AABB non-overlap relaxation.
  3. R3 (3D ultralight pipeline): Strict <3MB disk and <4MB VRAM constraints require GPU-native compressed textures (KTX2 / Basis Universal UASTC/ASTC). Uncompressed PNG/JPEG expands to $W \times H \times 4 \times 1.33$ bytes in VRAM, causing a single 2K texture to consume 22.4MB VRAM (instant failure). Packing AO+Roughness+Metalness into a single 512x512 KTX2 ORM map (0.33MB) and 1024x1024 BaseColor/Normal KTX2 (1.33MB each) keeps texture VRAM to 2.99MB. Geometry quantized to 14 bytes/vertex (`KHR_mesh_quantization`) + Meshopt compression yields ~0.59MB VRAM and ~150KB disk size. Total VRAM ~3.58MB (<4MB), total disk ~1.4MB (<3MB).
  4. R4 (Kinetic grammar & dual-stack compiler): CSS `@scope (.kinetic-primitive) to ([data-kinetic-slot])` prevents style/kinetic bleed into content. Dual-stack compiler exports: Target A (Static HTML + modern CSS + minimal 15KB micro-runtime for Edge CDN), Target B (Next.js 15 App Router with RSC for static layouts/copy and `"use client"` islands for Three.js canvas and optical anchor scrubber).
- **Unexplored areas**: None for survey scope. Synthesizing into handoff.md.

## Key Decisions Made
- Formulate concrete mathematical models for camera trajectory and projection.
- Quantify exact GPU VRAM equations proving how to satisfy the <4MB VRAM limit via KTX2 and mesh quantization.
- Specify exact TypeScript/JavaScript contracts for all 4 subsystems.

## Artifact Index
- DISPATCH.md — Dispatch instructions and history
- BRIEFING.md — Persistent working memory
- progress.md — Liveness heartbeat
- handoff.md — Comprehensive 5-component handoff report
