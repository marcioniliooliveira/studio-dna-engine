# Task Assignment: Worker M3 (Reference Micro-Engines)

You are worker_m3 (teamwork_preview_worker).
Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3
Parent: orchestrator_8 (0182b98b-f0b8-4ba3-b638-72cd13600fd3)

Read ORIGINAL_REQUEST.md at: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (under ## 2026-10-19T16:33:26Z).
Read PROJECT.md at: c:\Users\wd\Documents\playwright-scraper\PROJECT.md.
Read the research specifications and reference designs in:
- docs/research/v2.6/zero-dependency-engines.md
- docs/research/v2.6/pilar-06-scene-to-capsule.md
- docs/research/v2.6/pilar-09-oklch-color-synthesis.md
- docs/research/v2.6/pilar-10-apca-fluid-typography.md
- .agents/teamwork/spec_miner_survey_3/spec_pillars_9_10_11_microengines.md

## Write Ownership
You EXCLUSIVELY own all files in `docs/research/v2.6/reference/`:
1. `docs/research/v2.6/reference/spatial-rtree.js` (Pure JS 2D R-Tree matching RBush API + Typographic Energy E_typo)
2. `docs/research/v2.6/reference/css-selector-ast.js` (PostCSS recursive selector parser & Donut Scope validator)
3. `docs/research/v2.6/reference/png-codec.js` (Native zlib PNG decoder with 5 filters & 42-map Itti-Koch saliency)
4. `docs/research/v2.6/reference/slug-font-compiler.js` (Binary TrueType SFNT table parser & Slug buffer generator)
5. `docs/research/v2.6/reference/apca-contrast.js` (Somers APCA 0.0.98G-4g + bidirectional sRGB <-> OKLCH)

Do NOT modify any files outside `docs/research/v2.6/reference/` and your working directory.

## Implementation Requirements
- Fully functional, zero-dependency CommonJS modules (Node.js 24+).
- Absolutely NO uninstalled packages (`rbush`, `opentype.js`, `postcss-selector-parser`, `pngjs` are forbidden).
- Every module must be non-stubbed, completely implemented, and export clean CommonJS APIs.
- Syntax verification via `node --check` on every file.
- Must satisfy all interface contracts defined in `PROJECT.md § Interface Contracts`.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

When complete, verify syntax, write handoff.md, and send completion message.

## 2026-10-19T17:09:00Z
You are worker_m3.
Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3
Read your task assignment in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3\DISPATCH.md and the authoritative request in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (under ## 2026-10-19T16:33:26Z).
Read PROJECT.md at c:\Users\wd\Documents\playwright-scraper\PROJECT.md.

Read the specifications and reference designs in:
- docs/research/v2.6/zero-dependency-engines.md
- docs/research/v2.6/pilar-06-scene-to-capsule.md
- docs/research/v2.6/pilar-09-oklch-color-synthesis.md
- docs/research/v2.6/pilar-10-apca-fluid-typography.md
- .agents/teamwork/spec_miner_survey_3/spec_pillars_9_10_11_microengines.md

Implement the complete, functional, zero-dependency CommonJS modules in docs/research/v2.6/reference/:
1. docs/research/v2.6/reference/spatial-rtree.js (matching RBush API + Typographic Energy E_typo)
2. docs/research/v2.6/reference/css-selector-ast.js (PostCSS selector AST & Donut Scope validator)
3. docs/research/v2.6/reference/png-codec.js (node:zlib native PNG decoder with 5 filters & 42-map Itti-Koch saliency)
4. docs/research/v2.6/reference/slug-font-compiler.js (Binary TrueType SFNT DataView parser & Slug buffer generator)
5. docs/research/v2.6/reference/apca-contrast.js (APCA 0.0.98G-4g + bidirectional sRGB <-> OKLCH)

Verify syntax with node --check on all 5 files.
Do NOT import any uninstalled packages (opentype.js, rbush, postcss-selector-parser, pngjs).

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Document implementation and verification in handoff.md and notify orchestrator.
