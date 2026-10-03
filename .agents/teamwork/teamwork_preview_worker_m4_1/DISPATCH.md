# Dispatch: Worker M4 — Kinetic Grammar & Dual-Stack Compiler

**Target**: C:\Users\wd\Documents\playwright-scraper
**Working Directory**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m4_1
**Authoritative Request**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
**Project Scope Document**: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
**Architecture Survey Report**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_explorer_survey_2\handoff.md
**M1 Completed Handoff**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m1_1\handoff.md
**M2 Completed Handoff**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m2_1\handoff.md
**M3 Completed Handoff**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m3_1\handoff.md

**Write Ownership (Exclusively owned files)**:
- `src/compiler/kinetic-grammar-schema.js`
- `src/compiler/edge-static-compiler.js`
- `src/compiler/nextjs-rsc-compiler.js`
- `src/compiler/anti-slop-transformer.js`
- `test/m4-compiler-dualstack.test.js`

**Mandatory Integrity Warning**:
> DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

**Objective**:
Implement Requirement R4 per the architecture and contracts in `PROJECT.md`:
1. `src/compiler/kinetic-grammar-schema.js`:
   - Zod schema for declarative kinetic composition grammar: stage boundaries, kinetic primitives (HeroCinematicStage, HorizontalPinRail, InteractiveBento, ThreeJsCanvasStage, StickyStoryChapters), slots (`[data-kinetic-slot]`), and asset references.
   - Enforces donut scoping invariants via CSS `@scope (.kinetic-stage) to ([data-kinetic-slot])`.
2. `src/compiler/edge-static-compiler.js`:
   - Compiles composition spec into standalone Edge CDN directory (`dist/edge-cdn/`):
     * `index.html` (semantic HTML5, zero hydration delay, inlined critical `@scope` styles, W3C `overflow-x: clip !important`).
     * `styles.css` (modern scoped CSS with `@scope (.kinetic-stage) to ([data-kinetic-slot])` and automatic fallback prefixing).
     * `runtime/kinetic-micro.js` (<15KB micro-runtime loader for Three.js/KTX2 canvas and Lenis/scroll synchronization).
     * Localized asset references (`assets/`).
3. `src/compiler/nextjs-rsc-compiler.js`:
   - Compiles composition spec into Next.js 15 App Router directory (`dist/nextjs15/`):
     * `app/layout.tsx` (Root layout, fonts, viewport metadata, OpenGraph, JSON-LD Schema).
     * `app/page.tsx` (Server Component orchestrating section hierarchy).
     * `components/server/KineticSection.tsx` (RSC emitting semantic HTML5 `<section>` with 0 client JS bundle footprint).
     * `components/client/KineticSceneIsland.tsx` (`"use client"` island for WebGL canvas, DPR scaling, KTX2 streaming).
     * `components/client/OpticalAnchorIsland.tsx` (`"use client"` island for dynamic SVG leader lines and spatial badge positioning).
     * `components/client/ScrollControllerIsland.tsx` (`"use client"` Lenis smooth scroll bridge).
4. `src/compiler/anti-slop-transformer.js`:
   - Deterministic AST transformer (Cheerio-based, zero free-string LLM generation).
   - Enforces zero AI slop keywords (`lorem ipsum`, `chunk cognitivo`, `metalinguagem`, `modo auditoria`, `raio-x`).
   - Enforces zero brand residual leaks from reference sites.
   - Enforces zero unmapped `{SLOT_...}` template placeholders.
   - Enforces strict character budgeting: length deviation $\le \pm 15\%$ relative to reference archetype.
5. `test/m4-compiler-dualstack.test.js`:
   - Comprehensive unit test validating grammar schema, Edge CDN compilation, Next.js 15 RSC export, and Anti-Slop enforcement.
   - Run verification via `node --test test/m4-compiler-dualstack.test.js`.
6. Document commands, code layout, and test results in `handoff.md` and send message to parent.


## 2026-10-03T07:41:21Z
You are Worker M4 for Requirement R4.
Your working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m4_1
Authoritative user request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
Project Scope Document: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
Your dispatch instructions: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m4_1\DISPATCH.md

You MUST read ORIGINAL_REQUEST.md first.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Exclusively owned files to implement:
- src/compiler/kinetic-grammar-schema.js
- src/compiler/edge-static-compiler.js
- src/compiler/nextjs-rsc-compiler.js
- src/compiler/anti-slop-transformer.js
- test/m4-compiler-dualstack.test.js

Implement all modules according to PROJECT.md contracts (Zod grammar schema, CSS @scope donut isolation to ([data-kinetic-slot]), Edge CDN static compiler with <15KB micro-runtime, Next.js 15 App Router RSC compiler with 0-bundle server components and isolated 'use client' islands, Cheerio deterministic AST anti-slop transformer with +-15% character budget).
Run verification via node --test test/m4-compiler-dualstack.test.js.
Write your handoff report to C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m4_1\handoff.md with test outputs, and send a message to parent when completed.
