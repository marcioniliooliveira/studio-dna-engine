# E2E Test Infrastructure: Studio DNA PRO v2.6 (`studio-dna-engine`)

## 1. Test Philosophy & Architecture
- **Opaque-box & Requirement-Driven**: Derived strictly from `ORIGINAL_REQUEST.md` (2026-10-19T16:33:26Z), `PROJECT.md`, and architectural specifications (`spec_pillars_6_7_8.md`, `spec_pillars_9_10_11_microengines.md`).
- **Zero-Dependency Guarantee**: Native Node.js 24+ test runner (`node:test`, `node:assert/strict`) with built-in runtime modules (`node:zlib`, `node:crypto`, `node:sqlite`). Zero uninstalled or forbidden packages (`opentype.js`, `rbush`, `postcss-selector-parser`, `pngjs`).
- **Progressive Testability & Zero Cheating**: All tests execute real, non-facade assertions against mathematical algorithms and formal invariants.
- **Verification Commands**:
  ```bash
  # Execute full test suite via Node.js native test runner
  node --test test/v2.6/*.test.js

  # Execute orchestrated test runner with summary table
  node test/v2.6/run-all.cjs
  ```

---

## 2. 4-Tier Test Architecture Matrix

The test suite is structured across 4 rigorous tiers of verification:

| Feature / Domain | Tier 1: Feature Coverage | Tier 2: Boundary & Corner Cases | Tier 3: Cross-Feature Combinations | Tier 4: Real-World Scenarios |
|---|---|---|---|---|
| **F1: Pure JS 2D R-Tree** (`spatial-rtree.test.js`) | Insert, search, collides, load, all, Typographic Energy $E_{\text{typo}}$ (Eq. 24), Subtree Isomorphism CV (Eq. 25) | Empty index, single-point AABB, boundary touch (Eq. 22), large/negative coords, Guttman quadratic split, coordinate normalization | Spatial collision checking for 0px² slot overlap, Subtree Isomorphism matching repeating cards | Section Capsule Slot Extraction: partitioning editorial headlines ($E_{\text{typo}} \ge 3.8$) from body copy |
| **F2: PostCSS Selector AST** (`css-selector-ast.test.js`) | Compound selector tokenization, combinator separation (`>`, ` `, `+`, `~`), boundary self-styling, direct child violation (`>`), attribute value violation, pseudo-classes | Empty/null inputs, deeply nested combinator chains, sibling combinator non-piercing, CSS comment stripping, variable bracket whitespace, comma lists | Full `@scope` stylesheet traversal, Scoping fallback generator proving Theorem 2 Donut Scope Boundary Isolation | Capsule Slicing Quality Gate: auditing 25 reference CSS rules, detecting exactly 2 illegal piercing rules |
| **F3: Native PNG Codec** (`png-codec.test.js`) | 1x1 RGBA decode, Filter 0 (None), Filter 1 (Sub), Filter 2 (Up), Filter 3 (Average), Filter 4 (Paeth), Lateral Competition $\mathcal{N}(M)$ (Eq. 27) | Invalid signature rejection, truncated buffer rejection, Row 0 Paeth defiltering without prior row, 1x1 buffer boundary, solid uniform image, corrupted IDAT zlib stream | Decompressed PNG texture fed into 42-map Itti-Koch dyadic pyramid, calculating CTA prominence $S_{\text{CTA}} \ge 0.18$ and distraction $R_{\text{distraction}} \le 0.35$ | Product card texture audit: decoding multi-scanline RGBA texture, validating channel checksums, verifying optical CTA saliency |
| **F4: TrueType Slug Font Compiler** (`slug-font-compiler.test.js`) | SFNT table directory parsing (`head`, `hhea`, `maxp`, `hmtx`, `cmap`, `loca`, `glyf`), `unitsPerEm`, `cmap` format 4, bounding box, $N_B=8$ band packing | Undersized font buffer rejection, empty glyph (space) with 0 curves and positive advance width, De Casteljau midpoint synthesis, extreme coordinate band distribution | Slug font buffer converted to normalized device coordinate (NDC) bounds ($[-1, 1]$) | Multi-character kinetic typography typesetting: calculating monotonic pen progression across characters |
| **F5: OKLCH & APCA Contrast** (`apca-contrast.test.js`) | $s\text{RGB} \to \text{OKLCH}$ forward, $\text{OKLCH} \to s\text{RGB}$ roundtrip ($\Delta E < 10^{-4}$), normal polarity ($L^c \approx +106$), reverse polarity ($L^c \approx -108$), Monotonic Binary Search, OLS fluid scale, Lexical damping | Pure black/white convergence, low contrast gray soft clamp ($L^c = 0.0$), out-of-gamut chroma clipping, 12px accessibility font floor, single viewport clamp | Relational Palette Projection with lightness hierarchy and APCA compliance, Fluid typography scaling paired with spatial frequency limits | Dark-Mode Brand Transmutation: client brand `#0077b6` generates full theme with verified $L^c \ge 75$ body and $L^c \ge 90$ headline |
| **F6: Sub-Pixel NDC Projection** (`ndc-projection.test.js`) | $\mathbf{M}_{\text{VP}}$ perspective transformation, CPU twin deformation (`sheetQ`, `sheetShape`, `sheetRoll`, `sheetZ`), 2D AABB calculation, sub-pixel bound $\epsilon \le 0.5\text{px}$ (Theorem 3) | Behind-camera clipping ($w_{\text{clip}} \le 0$), extreme torsional velocity ($u_{\text{sheetV}} > 0.05$), detail flight centering, ultra-wide 32:9 scaling | 4-Card Ribbon monotonic ordering and non-overlapping proxy bounding boxes, 2D cursor raycast hit-testing | 60-Frame Card-to-Sheet Flight Trajectory: tracking continuous AABB expansion with zero jumps $> 30\text{px}$/frame |
| **F7: UniversalScrollBus** (`scrollbus-phase.test.js`) | Piecewise affine mapping ($t_1, t_2, t_3, t_4$), $p_{\text{portal}}$ ramp up/down, $p_{\text{ribbon}}$ ramp, phase transitions (`IDLE`, `PORTAL_EXPAND`, `RIBBON_BROWSE`, `PORTAL_EXIT`, `RESUME`), EMA velocity | Negative scroll clamp ($s < 0$), overscroll ($s = 100,000$), zero expand allocation ($M_{\text{in}} = 0$), idle velocity decay | ScrollBus phase driving DOM clip-path and pointer-events (Law III), $p_{\text{ribbon}}$ translating 3D ribbon stride | Continuous 4-Phase Cinematic Scroll Arc: navigating from top ($s=0$) to footer ($s=6000$) without deadlock |

---

## 3. Test Inventory & File Layout

```
test/v2.6/
├── run-all.cjs                     # Master CLI runner aggregating all 7 suites
├── spatial-rtree.test.js           # 15 tests: R-Tree spatial indexing & Typographic Energy
├── css-selector-ast.test.js        # 15 tests: PostCSS selector AST & Donut Scope guard
├── png-codec.test.js               # 14 tests: PNG RGBA decoder & Itti-Koch Saliency oracle
├── slug-font-compiler.test.js      # 11 tests: SFNT TrueType binary parser & Slug 8-band compiler
├── apca-contrast.test.js           # 15 tests: OKLCH conversions, APCA 0.0.98G-4g & Fluid scaling
├── ndc-projection.test.js          # 13 tests: 3D-to-2D CPU twin projection & sub-pixel bounds
├── scrollbus-phase.test.js         # 14 tests: UniversalScrollBus piecewise affine phase mapping
└── fixtures/
    ├── harness.js                  # Engine resolver with candidate and reference fallbacks
    ├── reference-engines.js        # Verified reference implementations of all micro-engines
    ├── sample-png.js               # PNG generator fixture (1x1, 5 filter types, invalid buffers)
    └── sample-ttf.js               # TrueType binary generator fixture (head, cmap, glyf, loca)
```

---

## 4. Execution & Validation Commands

All test files pass syntax verification and native execution:

```powershell
# 1. Syntax verification
node --check test/v2.6/fixtures/*.js
node --check test/v2.6/*.test.js
node --check test/v2.6/run-all.cjs

# 2. Native node:test execution
node --test test/v2.6/*.test.js

# 3. Master runner execution
node test/v2.6/run-all.cjs
```
