# Project: Studio DNA PRO v2.6 Deep Research and Architectural Specification

## Architecture
Studio DNA PRO v2.6 expands the autonomous front-end engine (`studio-dna-engine`) by linking existing Pillars 1–5 to new Pillars 6–11 with zero external dependencies outside `package-lock.json` (Node.js 24+ CommonJS).

```
               [Studio DNA PRO v2.6 Architecture]
                              │
     ┌────────────────────────┼────────────────────────┐
     │                        │                        │
[Pillars 1–5: Core Engine] [Pillars 6–8: Extraction & Virtualization] [Pillars 9–11: Perception & MCP]
- CDP Decompiler (P1)      - Scene-to-Capsule Slicing (P6)            - OKLCH Synthesis (P9)
- Kinetic Trajectory (P2)  - Universal <dna-capsule> Envelope (P7)    - APCA 0.0.98G-4g & Typo (P10)
- 3D Assets (P3)           - WebGL Scissor Multiplexer (P8)           - Dual HUD & MCP Server (P11)
- Kinetic Grammar (P4)
- AABB/VRAM Safety (P5)
                              │
                              ▼
            [Zero-Dependency Core Micro-Engines]
- Pure JS 2D R-Tree (spatial-rtree.js)
- PostCSS Selector AST & Donut Scope Guard (css-selector-ast.js)
- Native zlib PNG RGBA Decoder & Saliency (png-codec.js)
- Binary TrueType Slug Font Compiler (slug-font-compiler.js)
- DAG Concurrency Write-Lock Scheduler & CSS Normalizer Repair
```

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Pillar 6: Scene-to-Capsule Subtree Slicing | Closed CDP CSS extraction, inherited custom property closure, AST ancestor prefix pruning `@scope`, associative kinetic slicing | M1 | survey (spec_miner_survey_2) |
| F2 | Pillar 7: Universal `<dna-capsule>` & ScrollBus | UniversalScrollBus piecewise affine mapping, Five Physical Laws of `<dna-capsule>`, sub-pixel NDC projection $\mathbf{M}_{\text{VP}}$ ($\epsilon \le 0.5\text{px}$) | M1 | survey (spec_miner_survey_2) |
| F3 | Pillar 8: WebGL Context Virtualization | Dual rendering architecture: rAF hibernation + shared canvas scissor multiplexer with Y-inverted coordinates | M1 | survey (spec_miner_survey_2) |
| F4 | Pillars 9 & 10: OKLCH & APCA Contrast | Bidirectional $s\text{RGB} \leftrightarrow \text{OKLCH}$ matrices, full APCA `0.0.98G-4g`, monotonic binary search, fluid scaling regression + lexical damping $\kappa_{\text{copy}}$ | M1 | survey (spec_miner_survey_3) |
| F5 | Pillar 11: Dual HUD & Section MCP Server | Byte-exact static delivery route, wrapper route with `__DNA_LIVE_BUS__`, agnostic HUD projector, SQLite WAL schema, MCP tools & resources | M1 | survey (spec_miner_survey_3) |
| F6 | Zero-Dependency Engine Chapter | Comprehensive documentation of pure JS micro-engines, proofs, and zero-dependency guarantees | M1 | survey (spec_miner_survey_3) |
| F7 | L5 Repair: Asset Normalizer CSS | Clean replacement of lines 142–174 in `src/pro/universal-asset-normalizer.js` removing syntax corruption | M2 | survey (explorer_survey_1) |
| F8 | L7 Repair: Donut Scope Validator | Implement boundary combinator enforcement in `src/compiler/kinetic-grammar-schema.js` resolving Tests 4.5 and 4.6 | M2 | survey (explorer_survey_1) |
| F9 | L8 Repair: DAG Scheduler Write-Locks | Implement write-lock intersection algorithm in `src/orchestration/dag-scheduler.js` and extend `blueprint.js` | M2 | survey (explorer_survey_1) |
| F10 | R6.1 Engine: Pure JS 2D R-Tree | Complete CommonJS implementation in `docs/research/v2.6/reference/spatial-rtree.js` with quadratic split and typographic energy | M3 | survey (spec_miner_survey_3) |
| F11 | R6.2 Engine: PostCSS Selector AST | Complete CommonJS implementation in `docs/research/v2.6/reference/css-selector-ast.js` parsing selector AST over PostCSS | M3 | survey (spec_miner_survey_3) |
| F12 | R6.3 Engine: Native PNG Codec | Complete CommonJS implementation in `docs/research/v2.6/reference/png-codec.js` with `node:zlib` and 5 scanline filters | M3 | survey (spec_miner_survey_3) |
| F13 | R6.4 Engine: Slug Font Compiler | Complete CommonJS implementation in `docs/research/v2.6/reference/slug-font-compiler.js` parsing TTF tables and packing buffers | M3 | survey (spec_miner_survey_3) |
| F14 | E2E & Unit Test Suite Creation | Executable test suite in `test/v2.6/` covering all micro-engines and contrast/projection mathematics | Test Track | survey (ORIGINAL_REQUEST) |
| F15 | Final Verification & Hardening | Pass 100% of test suite in `test/v2.6/` + adversarial coverage hardening + forensic integrity audit | M4 | survey (ORIGINAL_REQUEST) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Architectural Research Chapters | `docs/research/v2.6/pilar-06-scene-to-capsule.md` through `pilar-11-dual-hud-mcp.md` and `zero-dependency-engines.md` | Survey complete | DONE |
| M2 | Core Codebase Repairs | Repaired blocks for `universal-asset-normalizer.js` (L5), `kinetic-grammar-schema.js` (L7), `dag-scheduler.js` (L8) and `blueprint.js` | none | DONE |
| M3 | Reference Micro-Engines | Self-contained CommonJS implementations in `docs/research/v2.6/reference/` (`spatial-rtree.js`, `css-selector-ast.js`, `png-codec.js`, `slug-font-compiler.js`) | M1, M2 | DONE |
| Test Track | E2E Test Suite Creation | Test runner, fixtures, and comprehensive tests in `test/v2.6/` (Tiers 1–4) publishing `TEST_READY.md` | none | DONE |
| M4 | Final Milestone & Verification | 100% pass of `test/v2.6/` suite, adversarial stress-testing, and forensic integrity audit | M1, M2, M3, Test Track | DONE |

## Interface Contracts

### 1. Pure JS 2D R-Tree (`spatial-rtree.js`)
- `class SpatialRTree(maxEntries = 9)`
  - `insert(item)`: Item `{ minX, minY, maxX, maxY, [id, data] }`
  - `load(items)`: Bulk load items
  - `search(bbox)`: Returns items intersecting `{ minX, minY, maxX, maxY }`
  - `collides(bbox)`: Returns boolean indicating intersection
  - `all()`: Returns all leaf items

### 2. PostCSS Selector AST (`css-selector-ast.js`)
- `function parseSelectorAst(selectorString)`: Returns structured AST node
- `function validateDonutSelector(selectorString, boundaryAttr = 'data-kinetic-slot')`:
  - Returns `{ compliant: boolean, violations: string[] }`
  - Compliant for boundary self-selectors (`[data-kinetic-slot]`, `[data-kinetic-slot="val"]`)
  - Non-compliant for descendant penetration (`[data-kinetic-slot] h1`, `[data-kinetic-slot] > h1`, `[data-kinetic-slot="val"] .inner`)

### 3. Native PNG Codec (`png-codec.js`)
- `function decodePng(buffer)`:
  - Input: Node.js `Buffer` containing valid PNG data
  - Returns: `{ width: number, height: number, data: Uint8Array, channels: number, colorType: number }`
  - Handles filter types: 0 (None), 1 (Sub), 2 (Up), 3 (Average), 4 (Paeth) via `node:zlib.inflateSync`

### 4. Binary TrueType Slug Font Compiler (`slug-font-compiler.js`)
- `class SlugFontCompiler`
  - `constructor(ttfBuffer)`: Takes Node.js `Buffer` of TrueType font
  - `parseTables()`: Parses `head`, `hhea`, `hmtx`, `cmap`, `loca`, `glyf`
  - `compileGlyph(charCode)`: Returns `{ curves: Float32Array, bands: Uint16Array, advanceWidth, bounds }`

### 5. UniversalScrollBus Contract
- Global scroll $s \in [0, U]$ maps to $(p_{\text{portal}}, p_{\text{ribbon}}, \phi_k, v_k)$
- $\mu_{\text{expand}} = 1.0, \mu_{\text{hold}} = 2.5, \mu_{\text{exit}} = 1.0$ defined in `dna-ir.json`

## Code Layout
- Research Documentation: `docs/research/v2.6/`
  - `pilar-06-scene-to-capsule.md`
  - `pilar-07-universal-envelope-scrollbus.md`
  - `pilar-08-webgl-virtualization.md`
  - `pilar-09-oklch-color-synthesis.md`
  - `pilar-10-apca-fluid-typography.md`
  - `pilar-11-dual-hud-mcp.md`
  - `zero-dependency-engines.md`
- Reference Implementations: `docs/research/v2.6/reference/`
  - `spatial-rtree.js`
  - `css-selector-ast.js`
  - `png-codec.js`
  - `slug-font-compiler.js`
  - `apca-contrast.js`
- Core Codebase Repairs:
  - `src/pro/universal-asset-normalizer.js` (L5)
  - `src/compiler/kinetic-grammar-schema.js` (L7)
  - `src/orchestration/dag-scheduler.js` (L8)
  - `src/orchestration/blueprint.js`
- Test Suite: `test/v2.6/`
  - `spatial-rtree.test.js`
  - `css-selector-ast.test.js`
  - `png-codec.test.js`
  - `slug-font-compiler.test.js`
  - `apca-contrast.test.js`
  - `repairs-regression.test.js`
