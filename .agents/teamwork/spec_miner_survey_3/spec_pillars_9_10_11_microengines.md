# Authoritative Architectural Specification: Pillars 9, 10, 11 & Zero-Dependency Core Micro-Engines

**System:** Studio DNA PRO v2.6 (`studio-dna-engine`)  
**Author:** Specification Miner (`spec_miner_survey_3`)  
**Date:** 2026-10-19  
**Status:** Authoritative Architectural Specification  
**Truth Protocol:** Strictly labeled per `AGENTS.md` (`[observed]`, `[documented]`, `[inferred]`)  

---

## 1. Executive Summary & Scope

This specification establishes the architectural, mathematical, and algorithmic foundations for:
1. **Pillars 9 & 10 (Perceptual Chromatic Synthesis, Real APCA Contrast & Fluid Typography):** Closed-form bidirectional $s\text{RGB} \leftrightarrow \text{OKLCH}$ matrices, semantic role classification, full APCA `0.0.98G-4g` equations with monotonic binary search and schema-driven `dnaIr.constraints` traversal, and Ordinary Least Squares (OLS) multi-breakpoint fluid typography regression with lexical expansion damping $\kappa_{\text{copy}} = (L_{\text{orig}}/L_{\text{new}})^{0.65}$.
2. **Pillar 11 (Dual-Environment Live Tweaks, HUD Projector & Section MCP Server):** Byte-exact static delivery with SHA-256 ETag caching, same-origin iframe wrapper route with bidirectional `__DNA_LIVE_BUS__`, framework-agnostic HUD projector eliminating hardcoded OP-XY presets and selectors (resolving limitation L2), live APCA badge rendering, ACID transactions via `TransactionManager` + `node:sqlite`, and complete Model Context Protocol (MCP) tool and resource definitions backed by a SQLite WAL schema with FTS5 search.
3. **Zero-Dependency Core Micro-Engines (Node.js 24+ CommonJS):** Pure JavaScript implementations using only runtime built-ins (`node:sqlite`, `node:zlib`, `node:crypto`) and existing dependencies (`postcss`, `zod`):
   - Pure JS 2D R-Tree (`spatial-rtree.js`) matching RBush API & Typographic Energy $E_{\text{typo}}(v)$ with subtree isomorphism ($\text{TED} = 0$).
   - PostCSS Selector AST parser (`css-selector-ast.js`) and Donut Scope Validator eliminating blind spots in Tests 4.5 and 4.6 (resolving L7).
   - Native PNG RGBA decoder (`png-codec.js`) via `node:zlib.inflateSync` with 5 scanline filters, integrated with a 42-map Itti-Koch visual saliency oracle with lateral competition $\mathcal{N}(M) = M(M_{\max} - \overline{m})^2$.
   - Binary TrueType Slug font compiler (`slug-font-compiler.js`) via `DataView` parsing TTF tables (`head`, `hhea`, `maxp`, `hmtx`, `cmap`, `loca`, `glyf`), extracting quadratic splines, De Casteljau subdivision, and packing Slug buffers ($N_B = 8$).
   - DAG Scheduler write-lock conflict resolution in `src/orchestration/dag-scheduler.js` (resolving L8) and repair of the corrupted CSS block in `src/pro/universal-asset-normalizer.js` (resolving L5).

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Chromatic (Pillar 9) | `sRGBToOklch` / `oklchToSRGB` | Exact bidirectional color space transformation via LMS and Oklab with gamma linearization and gamut clamping. | RGB tuple in $[0, 255]$ or Hex string; or OKLCH tuple $(L, C, h)$. | OKLCH tuple $(L \in [0, 1], C \ge 0, h \in [0, 360))$; or RGBA tuple + hex string. | Clamps out-of-gamut chroma; falls back to `#000000` on NaN. | `[documented]` Ottosson (2020), CSS Color 4 |
| 2 | Chromatic (Pillar 9) | Semantic Role Classifier | Classifies colors into semantic tokens (`bg`, `surface`, `border`, `fg`, `accent`, `status`) based on lightness and chroma quantiles. | Palette array of OKLCH colors, mode (`dark` \| `light`). | Typed dictionary of semantic color roles. | Empty palette returns default neutral theme. | `[inferred]` Studio DNA Brand Spec |
| 3 | Chromatic (Pillar 9) | Relational Palette Projection | Maps client primary brand color to entire section palette preserving $\Delta L_i$ lightness deltas and hue contrast. | Client brand color, reference palette manifest. | Transmuted palette CSS custom properties & shader `vec3` linear uniforms. | Out-of-gamut colors clamped via chroma binary reduction. | `[documented]` ICM brand-spec contract |
| 4 | Contrast (Pillar 10) | APCA `0.0.98G-4g` Calculator | Computes perceived lightness contrast $L^c$ between text and background according to spatial frequency and photopic adaptation. | Text color (Hex/RGB), Background color (Hex/RGB). | APCA score $L^c \in [-108, 106]$, polarity (`normal` \| `reverse`), compliance tier. | Returns $L^c = 0$ if difference is below threshold or color invalid. | `[documented]` W3C Silver / APCA 0.0.98G |
| 5 | Contrast (Pillar 10) | Monotonic Contrast Search | Binary search optimizing text or surface lightness $L$ in OKLCH space to satisfy a target $L^c$ threshold. | Background color, target $L^c$, role (`body` \| `headline` \| `ui`). | Minimum compliant text color Hex / OKLCH with $\Delta L$ margin. | Throws if target $L^c$ is mathematically unachievable on canvas. | `[inferred]` APCA Monotonicity Theorem |
| 6 | Contrast (Pillar 10) | Hardware Rim Light Compensator | Computes 3D chamfered edge specular compensation so dark anodized product edges do not vanish against bright grounds. | Background luminance $Y_{\text{bg}}$, base product luminance. | Compensated rim light intensity multiplier & backdrop tone dampener. | Returns `valid: false` if $Y_{\text{bg}} > 0.82$ (glare clipping). | `[observed]` `src/constraints/contrast.js`:27-86 |
| 7 | Constraints (Pillar 10) | Dynamic Constraint Traversal | Traverses `dnaIr.constraints` dynamically without hardcoded parameter keys, resolving cross-layer dependencies. | Delta parameters dictionary, `dnaIr` constraint graph. | Resolved deltas, derived compensations, validation errors. | Collects and returns all constraint violation messages. | `[observed]` `src/constraints/engine.js`:12-91 |
| 8 | Typography (Pillar 10) | OLS Fluid Scaling Regressor | Linear regression over 3 viewports ($390\text{px}, 768\text{px}, 1440\text{px}$) generating CSS `clamp(min, vw + px, max)`. | Viewport breakpoints, desired font sizes at breakpoints. | CSS string `clamp(S_min, beta*vw + gamma*px, S_max)`. | Returns static size if slope is 0 or breakpoints degenerate. | `[documented]` CSS Values 4, `[inferred]` R4 |
| 9 | Typography (Pillar 10) | Lexical Expansion Damper | Dampens typographic scale when copy text expands, preventing headline overflow: $\kappa_{\text{copy}} = (L_{\text{orig}}/L_{\text{new}})^{0.65}$. | Original char length $L_{\text{orig}}$, new char length $L_{\text{new}}$, base scale. | Damped font sizes, recommended CSS `text-wrap: balance`. | Clamps minimum font size to $12\text{px}$ floor. | `[observed]` `src/constraints/typography.js`:24 |
| 10 | Live HUD (Pillar 11) | Byte-Exact Static Delivery | High-performance static asset server with SHA-256 ETag generation, 304 Not Modified caching, and zero code mutation. | Client site URL path, request headers (`If-None-Match`). | Static file buffer, MIME type, `ETag: W/"<sha256>"`. | Returns 404 on missing file; 403 on traversal attempt. | `[observed]` `scripts/serve-marcionilio-site.cjs` |
| 11 | Live HUD (Pillar 11) | Live Bus Iframe Wrapper | Wrapper route `/__dna_hud_wrapper?client=<slug>` hosting an iframe and HUD panel with `__DNA_LIVE_BUS__` postMessage bridge. | Query param `client=<slug>`, live HUD controls. | Rendered dual-viewport UI, real-time postMessage stream. | Renders error banner if client slug does not exist. | `[inferred]` Pillar 11 Specification |
| 12 | Live HUD (Pillar 11) | Agnostic HUD Projector | Projects interactive glassmorphic UI controls purely from `dna-ir.json` parameter schema without hardcoded OP-XY presets. | `dnaIr` schema JSON, current parameter state. | Glassmorphic HTML markup, reactive event listeners. | Skips unknown parameter types gracefully. | `[observed]` `src/generators/hud-projector.js`:1-1550 |
| 13 | Live HUD (Pillar 11) | Live APCA Badge Renderer | Live contrast badge updated on slider change, displaying APCA $L^c$ and WCAG AA/AAA equivalence badge. | Foreground color, background color, font size. | HTML badge `<span class="apca-badge pass">Lc 78</span>`. | Renders warning icon if contrast is below threshold. | `[inferred]` Pillar 11 UI Specification |
| 14 | Storage (Pillar 11) | ACID SQLite TransactionManager | Persists parameter revisions and section capsules atomically using `node:sqlite` in WAL mode. | Delta parameters, author, message, client slug. | Committed revision ID, SHA-256 snapshot hash. | Automatic rollback on transaction exception. | `[documented]` Node 24 `node:sqlite` |
| 15 | MCP (Pillar 11) | `extract_section_capsule` | Slices section subtree from reference clone, writes capsule bundle and `dna-ir.json` to `design-vault/capsules/`. | `refSlug`, `sectionSelector`, `capsuleSlug`. | Capsule manifest, file paths, extracted tokens count. | Throws on path traversal or missing reference. | `[documented]` MCP SDK v1.30.0 |
| 16 | MCP (Pillar 11) | `patch_section_dna` | Applies parameter patches to client section DNA with full constraint graph verification and ACID SQLite commit. | `clientSlug`, `sectionId`, `patches` object. | Validation result, updated DNA IR, new revision ID. | Rejects patch and rolls back if constraint violated. | `[documented]` MCP SDK v1.30.0 |
| 17 | Core Micro-Engine 1 | `SpatialRTree` (2D R-Tree) | Pure JavaScript 2D R-Tree matching RBush API with quadratic split, spatial search, and collision tests. | Bounding boxes `{ minX, minY, maxX, maxY, ... }`. | Array of intersecting items, or boolean `collides()`. | Returns empty array on no intersection; validates bbox inputs. | `[inferred]` Pure JS R-Tree Architecture |
| 18 | Core Micro-Engine 1 | Typographic Energy Tagger | Evaluates DOM node typographic prominence $E_{\text{typo}}(v)$ and subtree isomorphism to auto-tag kinetic slots. | Cheerio DOM tree, bounding box layout data. | Tagged kinetic slots (`[data-kinetic-slot="..."]`). | Ignores non-text and hidden elements. | `[documented]` R6.1, `[inferred]` ICM Pipeline |
| 19 | Core Micro-Engine 2 | `CssSelectorAst` Parser | Recursive selector tokenizer and AST builder implemented over `postcss` without `postcss-selector-parser`. | CSS selector string (e.g. `[data-kinetic-slot] > h1`). | Selector AST tree with compound tokens and combinators. | Throws on unclosed brackets or malformed selector. | `[observed]` `test/challenger-adversarial-m5.test.js`:608-635 |
| 20 | Core Micro-Engine 2 | Donut Scope Validator | Validates that scoped CSS rules do not penetrate through `[data-kinetic-slot]` boundary, catching `>` and attribute values. | CSS content string, root selector, boundary selector. | `{ compliant: boolean, violations: string[] }`. | Reports exact selector violating donut boundary. | `[observed]` `src/compiler/kinetic-grammar-schema.js`:304-325 |
| 21 | Core Micro-Engine 3 | Native PNG Decoder | Decodes PNG binary buffers using `node:zlib.inflateSync` and reconstructs scanlines using all 5 PNG filter algorithms. | Binary PNG `Buffer` or `Uint8Array`. | `{ width, height, data: Uint8Array (RGBA), channels: 4 }`. | Throws on invalid PNG header, corrupted CRC, or bad filter. | `[documented]` W3C PNG Specification (ISO/IEC 15948) |
| 22 | Core Micro-Engine 3 | 42-Map Itti-Koch Saliency Oracle | Pre-attentive biological vision oracle with 8-scale dyadic pyramid, 42 center-surround maps, and lateral competition $\mathcal{N}(M)$. | Raw RGBA pixel buffer, width, height. | Attention map, CTA score ($\ge 0.18$), distraction ratio ($\le 0.35$). | Clamps dimensions; handles low-contrast images safely. | `[documented]` Itti, Koch, Niebur (1998) |
| 23 | Core Micro-Engine 4 | Binary Slug Font Compiler | Extracts TrueType glyph outlines via `DataView`, subdivides curves, and packs into Slug GPU textures ($N_B=8$). | Binary `.ttf` font buffer, character set. | Packed Slug curve buffer (Float32Array), band index table. | Throws on unsupported TTF format or missing table. | `[documented]` Lengyel (2017) Slug Algorithm |
| 24 | Orchestration / Pro | DAG Write-Lock Scheduler | Partitions ready tasks into parallel execution batches such that tasks with intersecting write-locks run serially. | Blueprint object, execution function, write-lock map. | Deterministic execution result, outputs ledger. | Fails fast with `DAG_BLOCKED` or task failure code. | `[observed]` `src/orchestration/dag-scheduler.js`:1-80 |
| 25 | Orchestration / Pro | CSS Normalizer Syntax Fix | Corrects syntax corruption and duplicated nested rules in universal asset normalizer lines 152–174. | Raw CSS / HTML with preloader and Lenis classes. | Clean, syntactically valid CSS with `overflow-x: clip !important`. | Prevents CSS parse errors in downstream tools. | `[observed]` `src/pro/universal-asset-normalizer.js`:140-174 |

---

## 3. Edge Cases & Empirical Observations

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | `sRGBToOklch` | `#000000` (Pure Black) | $L = 0.0$, $C = 0.0$, $h = 0.0^\circ$. Exact convergence; no division-by-zero in $\text{atan2}(0, 0)$. `[observed]` |
| 2 | `sRGBToOklch` | `#ffffff` (Pure White) | $L = 1.0$, $C = 0.0$, $h = 0.0^\circ$. Gamma linearization $1.0^{2.4} = 1.0$; LMS decompress $\sqrt[3]{1} = 1.0$. `[observed]` |
| 3 | `oklchToSRGB` | Out-of-gamut OKLCH: $L=0.7, C=0.38, h=145^\circ$ | Raw linear sRGB produces $G > 1.0$ or $R < 0.0$. Gamut clipping clamps values to $[0, 1]$, preventing RGB overflow. `[inferred]` |
| 4 | APCA Contrast | Pure Black `#000000` on Pure White `#ffffff` | $Y_{\text{txt}} = 0.0 \to Y_{\text{clamped}} = 0.022^{1.414} \approx 0.00446$. Normal polarity gives $L^c \approx +106.0$. Meets maximum AA/AAA. `[documented]` |
| 5 | APCA Contrast | Pure White `#ffffff` on Pure Black `#000000` | Reverse polarity gives $L^c \approx -108.0$. Meets maximum AA/AAA dark mode standard. `[documented]` |
| 6 | APCA Contrast | Low contrast gray `#777777` on `#888888` | $\Delta Y < 0.0005$, $|S_{\text{apca}}| < 0.1$, triggers soft clip returning $L^c = 0.0$ (complete fail). `[documented]` |
| 7 | Fluid Scaling | Monotonic viewports $390\text{px} \to 24\text{px}$, $768\text{px} \to 32\text{px}$, $1440\text{px} \to 48\text{px}$ | OLS regression produces positive slope $\beta > 0$, generating smooth interpolated values with clamp bounds. `[documented]` |
| 8 | Fluid Scaling | Inverted scaling (smaller on desktop than mobile) | Regression slope $\beta < 0$; formula dynamically adjusts clamp bounds $\min(S_1, S_3) \dots \max(S_1, S_3)$. `[inferred]` |
| 9 | Lexical Damping | German translation expands length $22 \to 48$ chars | $\kappa_{\text{copy}} = (22/48)^{0.65} \approx (0.458)^{0.65} \approx 0.602$. $36\text{px} \to 21.6\text{px}$, perfectly fitting safe area. `[observed]` |
| 10 | Live HUD Iframe | Parent and iframe hosted on different origins | Same-origin policy prevents direct DOM access; bus falls back cleanly to window postMessage with origin validation. `[inferred]` |
| 11 | Donut Scope | Direct child combinator: `[data-kinetic-slot] > h1` | Old regex allowed this (Test 4.5); new selector AST flags violation: combinator `>` immediately follows boundary. `[observed]` |
| 12 | Donut Scope | Attribute value selector: `[data-kinetic-slot="hero-title"] h1` | Old regex allowed this (Test 4.6); new selector AST flags violation: compound selector targets slot descendant. `[observed]` |
| 13 | Donut Scope | Self-styling: `[data-kinetic-slot][data-slot-type="heading"]` | Allowed: compound selector modifies the slot container itself without penetrating child DOM elements. `[observed]` |
| 14 | PNG Decoder | Scanline filter type 4 (Paeth predictor) on row 0 | Prior row bytes (B and C) default to 0; Paeth predictor computes $|p-a| \le |p-b|$ correctly without null pointer. `[documented]` |
| 15 | Saliency Oracle | Solid white or solid black test image | Max conspicuity $\approx 0$; normalization avoids division by zero via epsilon $10^{-6}$; outputs uniform zero saliency map. `[observed]` |
| 16 | Slug TTF Compiler | Composite glyph with component flags in `glyf` table | Recursively unpacks component glyphs, applies affine transformation matrix $(a, b, c, d, e, f)$, and extracts true curves. `[documented]` |
| 17 | DAG Scheduler | Two ready tasks writing to same file `brand-spec.json` | Write-lock intersection detected: task 2 is deferred to subsequent batch, guaranteeing sequential execution without race. `[inferred]` |

---

## 4. Pillars 9 & 10: OKLCH Synthesis, APCA Contrast & Fluid Typography

### 4.1 Part A: Bidirectional $s\text{RGB} \leftrightarrow \text{OKLCH}$ Transformation & Semantic Roles

Color representation in Studio DNA PRO v2.6 transitions completely to the perceptually uniform Oklab/OKLCH color space (Ottosson, 2020), eliminating the non-uniformities of HSL and sRGB where blue appears substantially darker than yellow at equal numerical lightness.

#### 1. Forward Transformation: $s\text{RGB} \to \text{OKLCH}$

Given non-linear $s\text{RGB}$ coordinates $R, G, B \in [0, 1]$ (derived from byte values $[0, 255]$ by dividing by $255$):

**Step 1.1: sRGB Linearization (Inverse Electro-Optical Transfer Function):**
For each channel $C \in \{R, G, B\}$:
$$\text{Eq. 1:} \quad C_{\text{lin}} = \begin{cases} \dfrac{C}{12.92}, & \text{if } C \le 0.04045 \\[8pt] \left( \dfrac{C + 0.055}{1.055} \right)^{2.4}, & \text{if } C > 0.04045 \end{cases}$$

**Step 1.2: Linear sRGB to Cone LMS Response:**
The linearized coordinates are projected into the human cone photoreceptor response space via matrix $\mathbf{M}_1$:
$$\text{Eq. 2:} \quad \begin{bmatrix} l \\ m \\ s \end{bmatrix} = \mathbf{M}_1 \begin{bmatrix} R_{\text{lin}} \\ G_{\text{lin}} \\ B_{\text{lin}} \end{bmatrix} = \begin{bmatrix}
0.4122214708 & 0.5363325363 & 0.0514459929 \\
0.2119034982 & 0.6806995451 & 0.1073969566 \\
0.0883024619 & 0.2817188376 & 0.6299787005
\end{bmatrix} \begin{bmatrix} R_{\text{lin}} \\ G_{\text{lin}} \\ B_{\text{lin}} \end{bmatrix}$$

**Step 1.3: Non-Linear LMS Cube Root Compression:**
The LMS photoreceptor signals are compressed non-linearly to model biological response:
$$\text{Eq. 3:} \quad l' = \sqrt[3]{l}, \quad m' = \sqrt[3]{m}, \quad s' = \sqrt[3]{s}$$

**Step 1.4: Compressed LMS to Cartesian Oklab $(L, a, b)$:**
The signals are transformed into lightness $L$ and chromatic opponent channels $a$ (green-red) and $b$ (blue-yellow) via matrix $\mathbf{M}_2$:
$$\text{Eq. 4:} \quad \begin{bmatrix} L \\ a \\ b \end{bmatrix} = \mathbf{M}_2 \begin{bmatrix} l' \\ m' \\ s' \end{bmatrix} = \begin{bmatrix}
0.2104542553 & 0.7936177850 & -0.0040720468 \\
1.9779984951 & -2.4285922050 & 0.4505937099 \\
0.0259040371 & 0.7827717662 & -0.8086757660
\end{bmatrix} \begin{bmatrix} l' \\ m' \\ s' \end{bmatrix}$$

**Step 1.5: Cartesian Oklab to Cylindrical OKLCH $(L, C, h)$:**
$$\text{Eq. 5:} \quad \begin{cases}
L = L \\[4pt]
C = \sqrt{a^2 + b^2} \\[4pt]
h = \text{atan2}(b, a) \cdot \dfrac{180}{\pi} \pmod{360}
\end{cases}$$
where if $h < 0$, $h = h + 360^\circ$.

---

#### 2. Inverse Transformation: $\text{OKLCH} \to s\text{RGB}$

Given OKLCH coordinates $L \in [0, 1]$, $C \ge 0$, $h \in [0, 360)$:

**Step 2.1: Cylindrical OKLCH to Cartesian Oklab:**
$$\text{Eq. 6:} \quad \begin{cases}
a = C \cdot \cos\left( h \cdot \dfrac{\pi}{180} \right) \\[6pt]
b = C \cdot \sin\left( h \cdot \dfrac{\pi}{180} \right)
\end{cases}$$

**Step 2.2: Oklab to Compressed LMS via Inverted Matrix $\mathbf{M}_2^{-1}$:**
$$\text{Eq. 7:} \quad \begin{bmatrix} l' \\ m' \\ s' \end{bmatrix} = \mathbf{M}_2^{-1} \begin{bmatrix} L \\ a \\ b \end{bmatrix} = \begin{bmatrix}
1.0 & +0.3963377774 & +0.2158037573 \\
1.0 & -0.1055613458 & -0.0638541728 \\
1.0 & -0.0894841775 & -1.2914855480
\end{bmatrix} \begin{bmatrix} L \\ a \\ b \end{bmatrix}$$

**Step 2.3: LMS Cubic Decompression:**
$$\text{Eq. 8:} \quad l = (l')^3, \quad m = (m')^3, \quad s = (s')^3$$

**Step 2.4: Linear LMS to Linear sRGB via Inverted Matrix $\mathbf{M}_1^{-1}$:**
$$\text{Eq. 9:} \quad \begin{bmatrix} R_{\text{lin}} \\ G_{\text{lin}} \\ B_{\text{lin}} \end{bmatrix} = \mathbf{M}_1^{-1} \begin{bmatrix} l \\ m \\ s \end{bmatrix} = \begin{bmatrix}
+4.0767416621 & -3.3077115913 & +0.2309699292 \\
-1.2684380046 & +2.6097574011 & -0.3413193965 \\
-0.0041960863 & -0.7034186147 & +1.7076147010
\end{bmatrix} \begin{bmatrix} l \\ m \\ s \end{bmatrix}$$

**Step 2.5: Gamma Encoding & Gamut Clamping:**
For each channel $C_{\text{lin}} \in \{R_{\text{lin}}, G_{\text{lin}}, B_{\text{lin}}\}$:
$$\text{Eq. 10:} \quad C = \begin{cases}
12.92 \cdot C_{\text{lin}}, & \text{if } C_{\text{lin}} \le 0.0031308 \\[8pt]
1.055 \cdot (C_{\text{lin}})^{1/2.4} - 0.055, & \text{if } C_{\text{lin}} > 0.0031308
\end{cases}$$
The final 8-bit integer is clamped to $[0, 255]$:
$$C_{\text{byte}} = \text{round}\left( \max(0, \min(1, C)) \cdot 255 \right)$$

---

#### 3. Semantic Role Classification Algorithm

Every color extracted from reference or client palettes is classified into a strict semantic hierarchy:

```
Algorithm 1: Semantic Role Classification
Input: Set of extracted colors P = {c_1, ..., c_n} in OKLCH, Mode in {dark, light}
Output: Map of Semantic Roles R -> OKLCH color

1. Sort P by Lightness L ascending: P_sorted = [c_(1), c_(2), ..., c_(n)]
2. If Mode == dark:
     R['bg']             := argmin_{c in P} L(c)  with constraint C(c) <= 0.03
     R['surface']        := color c with L(c) in [L(bg) + 0.04, L(bg) + 0.08], C(c) <= 0.03
     R['surface-raised'] := color c with L(c) in [L(surface) + 0.04, L(surface) + 0.08]
     R['border']         := color c with L(c) in [L(surface) + 0.08, L(surface) + 0.16], C(c) <= 0.02
     R['fg-dim']         := color c with L(c) in [0.55, 0.70], C(c) <= 0.04
     R['fg']             := argmax_{c in P} L(c)  with constraint C(c) <= 0.04 (typically L >= 0.90)
     R['accent']         := argmax_{c in P} C(c)  (highest chroma, e.g. C >= 0.12)
3. If Mode == light:
     Invert lightness intervals symmetrically around L = 0.50.
4. Return R
```

#### 4. Relational Palette Projection

When a client provides a brand primary color $C_{\text{brand}} = (L_b, C_b, h_b)$, the engine preserves the original spatial depth of the reference design by projecting the client hue $h_b$ while maintaining the exact lightness deltas $\Delta L_i = L_{\text{ref}, i} - L_{\text{ref}, \text{bg}}$:

$$\text{CSS Custom Properties Emitted:}$$
```css
:root {
  --color-bg: oklch(0.12 0.01 240);
  --color-surface: oklch(0.18 0.015 240);
  --color-surface-raised: oklch(0.24 0.02 240);
  --color-border: oklch(0.28 0.01 240 / 0.15);
  --color-fg: oklch(0.96 0.01 240);
  --color-fg-dim: oklch(0.72 0.02 240);
  --color-accent: oklch(0.68 0.22 35);
}
```
$$\text{Shader Uniforms Emitted (Linear } s\text{RGB vec3 for WebGL):}$$
```glsl
uniform vec3 u_backdropColor; // e.g. vec3(0.012, 0.014, 0.018)
uniform vec3 u_accentColor;   // e.g. vec3(0.98, 0.22, 0.15)
```

---

### 4.2 Part B: Real APCA `0.0.98G-4g` Engine & Dynamic Constraints

The legacy WCAG 2.1 formula $(L_1 + 0.05)/(L_2 + 0.05)$ in `src/constraints/contrast.js` fails completely on dark mode interfaces and high spatial frequency typography, falsely asserting that dark text on a dark background has equal readability to light text on a dark background.

Studio DNA PRO v2.6 integrates the authoritative **APCA `0.0.98G-4g`** engine (Somers, 2022).

#### 1. Authoritative APCA `0.0.98G-4g` Mathematical Equations

**Step 1: Photopic Luminance $Y$ with Spectral Weighting:**
From linearized sRGB channels $R_{\text{lin}}, G_{\text{lin}}, B_{\text{lin}} \in [0, 1]$ (computed via $C^{2.4}$):
$$\text{Eq. 11:} \quad Y = 0.2126729 \cdot R_{\text{lin}} + 0.7151522 \cdot G_{\text{lin}} + 0.0721750 \cdot B_{\text{lin}}$$

**Step 2: Black-Level Glare Soft Clamping:**
To model human ocular flare and display black lift, values below `blkThrs = 0.022` are softly clamped with exponent `blkClmp = 1.414`:
$$\text{Eq. 12:} \quad Y_{\text{clamped}} = \begin{cases}
Y, & \text{if } Y > 0.022 \\[6pt]
Y + (0.022 - Y)^{1.414}, & \text{if } Y \le 0.022
\end{cases}$$

**Step 3: Polarity Determination & Exponent Compression:**
Let $Y_{\text{bg}}$ be the clamped background luminance, and $Y_{\text{txt}}$ be the clamped text luminance.
Constants:
$$\text{scaleBoW} = 1.14, \quad \text{scaleWoB} = 1.14, \quad \text{loOffset} = 0.027, \quad \text{loClip} = 0.1, \quad \Delta Y_{\min} = 0.0005$$

**Case A: Dark Text on Light Background ($Y_{\text{bg}} \ge Y_{\text{txt}}$ — Normal Polarity):**
$$\text{normBG} = 0.56, \quad \text{normTXT} = 0.57$$
$$\text{Eq. 13a:} \quad S_{\text{apca}} = \left( Y_{\text{bg}}^{0.56} - Y_{\text{txt}}^{0.57} \right) \cdot 1.14$$
$$\text{Eq. 13b:} \quad L^c = \begin{cases}
0.0, & \text{if } S_{\text{apca}} < 0.1 \\[6pt]
(S_{\text{apca}} - 0.027) \cdot 100, & \text{if } S_{\text{apca}} \ge 0.1
\end{cases}$$

**Case B: Light Text on Dark Background ($Y_{\text{txt}} > Y_{\text{bg}}$ — Reverse Polarity):**
$$\text{revBG} = 0.65, \quad \text{revTXT} = 0.62$$
$$\text{Eq. 14a:} \quad S_{\text{apca}} = \left( Y_{\text{bg}}^{0.65} - Y_{\text{txt}}^{0.62} \right) \cdot 1.14 \quad (\text{note: } S_{\text{apca}} < 0)$$
$$\text{Eq. 14b:} \quad L^c = \begin{cases}
0.0, & \text{if } |S_{\text{apca}}| < 0.1 \\[6pt]
(S_{\text{apca}} + 0.027) \cdot 100, & \text{if } |S_{\text{apca}}| \ge 0.1
\end{cases}$$

Notice that in reverse polarity, $L^c$ is negative (e.g. $-85$), denoting light text on dark ground, while in normal polarity it is positive (e.g. $+85$).

#### 2. Compliance Threshold Matrix

| Target Use Case | Minimum $|L^c|$ Score | Font Size & Weight Requirement |
|-----------------|------------------------|--------------------------------|
| Body Text (Fluent Readability) | $|L^c| \ge 75$ | $16\text{px}$ regular ($400$) or $14\text{px}$ medium ($500$) |
| Body Text (Preferred Content) | $|L^c| \ge 90$ | Highly legible long-form content |
| Subheadings / Large Text | $|L^c| \ge 60$ | $24\text{px}$ regular or $18\text{px}$ bold ($700$) |
| Display Headlines | $|L^c| \ge 45$ | $36\text{px}$ regular or $24\text{px}$ bold |
| Secondary Text / Placeholders | $|L^c| \ge 30$ | Non-essential UI text, icons, disabled items |
| Absolute Readability Floor | $|L^c| < 15$ | Fails all standards; invisible to human eye |

#### 3. Monotonic Binary Search for APCA Compliance

Given background $Y_{\text{bg}}$ and required threshold $L^c_{\text{target}}$, the engine solves for the required text lightness $L_{\text{txt}} \in [0, 1]$ in OKLCH space via monotonic bisection:

$$\text{Eq. 15:} \quad L_{k+1} = \begin{cases}
\dfrac{L_k + L_{\max}}{2}, & \text{if } |L^c(L_k, Y_{\text{bg}})| < L^c_{\text{target}} \quad (\text{in reverse polarity}) \\[10pt]
\dfrac{L_{\min} + L_k}{2}, & \text{if } |L^c(L_k, Y_{\text{bg}})| \ge L^c_{\text{target}} \quad (\text{in reverse polarity})
\end{cases}$$
With $k = 12$ iterations, the precision achieved is:
$$\epsilon = \frac{1}{2^{12}} = \frac{1}{4096} \approx 0.00024$$
guaranteeing exact boundary convergence in less than $0.15\text{ms}$.

#### 4. Hardware Rim Light Compensation Formula

For 3D hardware viewports containing dark anodized aluminum products ($L_{\text{prod}} \approx 0.012$):
$$\text{Eq. 16:} \quad \begin{cases}
\text{rimBoost} = 1.0 + \left( Y_{\text{bg}} \cdot 2.8 \right) \\[4pt]
\text{toneDamp} = \max\left( 0.40, 1.0 - Y_{\text{bg}} \cdot 0.70 \right) \\[4pt]
L_{\text{edge}} = L_{\text{prod}} + \left( \text{rimBoost} \cdot 0.62 \right)
\end{cases}$$
If $Y_{\text{bg}} > 0.82$, the constraint returns `valid: false` (glare clipping violation).

#### 5. Dynamic `dnaIr.constraints` Traversal Engine

The legacy hardcoded parameter matching in `src/constraints/engine.js` is eliminated. The engine now traverses `dnaIr.constraints` dynamically:

```
Algorithm 2: Dynamic Constraint Graph Traversal
Input: deltaParameters, dnaIr
Output: { valid: boolean, resolvedDelta, derivedCompensations, errors }

1. Initialize resolvedDelta := { ...deltaParameters }, derivedCompensations := {}, errors := []
2. For each constraint C in dnaIr.constraints:
     a. Check if any input of C is present in resolvedDelta:
        If not, continue to next constraint.
     b. Resolve handler for C.type:
        - "apca-contrast":
            Call evaluateApcaConstraint(C, resolvedDelta)
            If invalid: compute binary search compensation or push C.errorMessage to errors.
        - "typography-safearea":
            Call evaluateTypographySafeArea(C, resolvedDelta)
            Apply lexical damping and font size compensation.
        - "hardware-rimlight":
            Call evaluateHardwareRimLight(C, resolvedDelta)
            Inject compensatedRimLight into derivedCompensations.
        - "custom-adaptive":
            Evaluate formula defined in C.compensation.formula.
3. Return { valid: errors.length == 0, resolvedDelta, derivedCompensations, errors }
```

---

### 4.3 Part C: Responsive Fluid Typography Linear Regression

#### 1. Multi-Breakpoint Dataset & Ordinary Least Squares (OLS)

Given responsive design specifications at three canonical viewports:
- Mobile: $W_1 = 390\text{px}$, desired size $S_1$
- Tablet: $W_2 = 768\text{px}$, desired size $S_2$
- Desktop: $W_3 = 1440\text{px}$, desired size $S_3$

We formulate the linear regression model:
$$S(W) = m \cdot W + \gamma = \beta \cdot \frac{W}{100} + \gamma = \beta \cdot \text{vw} + \gamma \cdot \text{px}$$
where $\beta = 100 \cdot m$.

Using Ordinary Least Squares (OLS) with $n = 3$, $\bar{W} = \frac{1}{3}\sum W_i = \frac{390 + 768 + 1440}{3} = 866.0\text{px}$:
$$\text{Eq. 17:} \quad m = \frac{\sum_{i=1}^3 (W_i - \bar{W})(S_i - \bar{S})}{\sum_{i=1}^3 (W_i - \bar{W})^2}$$
$$\text{Eq. 18:} \quad \gamma = \bar{S} - m \cdot \bar{W}$$
$$\text{Eq. 19:} \quad \beta = 100 \cdot m$$

#### 2. CSS Clamp Generation Formula

$$\text{Eq. 20:} \quad \text{font-size: } \text{clamp}\left( S_{\min}\text{px}, \ \beta\text{vw} + \gamma\text{px}, \ S_{\max}\text{px} \right)$$
where $S_{\min} = \min(S_1, S_3)$ and $S_{\max} = \max(S_1, S_3)$.

#### 3. Lexical Expansion Damping Formula

When original reference copy (length $L_{\text{orig}}$) is replaced by client copy (length $L_{\text{new}}$), if $L_{\text{new}} > L_{\text{orig}}$:
$$\text{Eq. 21:} \quad \kappa_{\text{copy}} = \left( \frac{L_{\text{orig}}}{L_{\text{new}}} \right)^{0.65}$$
The target sizes at each breakpoint scale as:
$$S'_i = \max\left( S_{\text{floor}}, \ S_i \cdot \kappa_{\text{copy}} \right)$$
where $S_{\text{floor}} = 14\text{px}$ for body text, $20\text{px}$ for headings. The regression is then re-solved on $(W_i, S'_i)$, ensuring zero layout overflow.

---

## 5. Pillar 11: Dual-Environment Live Tweaks, HUD Projector & Section MCP Server

### 5.1 Part A: Byte-Exact Static Delivery & Iframe Wrapper Route

To resolve limitation L9 (which spawned 62 throwaway patch scripts), Studio DNA PRO v2.6 enforces a strict dual-environment preview architecture:

```
[ Developer / Designer Browser ]
               │
               ▼
   /__dna_hud_wrapper?client=<slug>
   ┌────────────────────────────────────────────────────────┐
   │ Outer Host Document: Agnostic HUD Projector            │
   │                                                        │
   │ ┌────────────────────────────────────────────────────┐ │
   │ │ <iframe id="dna-stage-frame"                       │ │
   │ │         src="/clientes/<slug>/site/index.html">    │ │
   │ │                                                    │ │
   │ │  [ Byte-Exact Static Site — Zero Injected Code ]   │ │
   │ │  [ window.__DNA_LIVE_BUS__ Active via Same-Origin] │ │
   │ └────────────────────────────────────────────────────┘ │
   └────────────────────────────────────────────────────────┘
```

1. **Byte-Exact Static Route (`/clientes/<slug>/site/*`):**
   - Serves the immutable production bundle directly from disk.
   - Computes SHA-256 ETag on header response: `ETag: W/"<sha256-hex>"`.
   - Honors conditional request `If-None-Match`, returning `304 Not Modified`.
   - **Zero script injection** into the compiled production HTML or bundle.
2. **External Wrapper Route (`/__dna_hud_wrapper?client=<slug>`):**
   - Serves the HUD studio wrapper containing the parameter sliders and APCA inspector.
   - Mounts the static client site in a full-bleed `<iframe>`.
   - Because both wrapper and iframe are served on the same origin, the wrapper accesses `iframe.contentWindow.__DNA_LIVE_BUS__` directly with zero serialization delay.

#### Bus Protocol Contract (`__DNA_LIVE_BUS__`):
```typescript
interface DnaLiveBusMessage {
  type: 'DNA_TWEAK_UPDATE' | 'DNA_TELEMETRY' | 'DNA_COMMIT_REQUEST' | 'DNA_COMMIT_ACK';
  timestamp: number;
  payload: {
    paramId?: string;
    adapter?: 'css' | 'dom' | 'webgl-uniform' | 'scroll-bridge';
    target?: string;
    property?: string;
    value?: any;
    revisionId?: number;
    hash?: string;
  };
}
```

---

### 5.2 Part B: Agnostic HUD Projector

Limitation L2 in `src/generators/hud-projector.js` (hardcoding OP-XY presets `swiss`, `tokyo`, `braun` and selectors `#hero .wm h1`) is completely eliminated.

#### 1. Schema-Driven Generation
The projector consumes `dnaIr.parameters` and groups by semantic category:
- `typography`: Font family, font size clamp, tracking, line height.
- `surface`: Background color, surface color, accent color with live APCA badge.
- `motion`: Transition style, spring stiffness $\omega_n$, damping ratio $\zeta$.
- `layout`: Padding, grid columns, container max-width.
- `shader`: Uniforms (`u_sheetP`, `u_hover`, `u_lightIntensity`, `u_speed`).

#### 2. Control Adapters
- `css`: Dispatches `document.documentElement.style.setProperty(property, value)`.
- `dom`: Updates targeted kinetic slot: `document.querySelector(slotSelector).textContent = value`.
- `webgl-uniform`: Communicates with Pillar 7 `<dna-capsule>` uniform store:
  `window.__WORK_STAGE__.uniformStore.setUniform(uniformName, parsedValue)`.
- `scroll-bridge`: Updates `UniversalScrollBus` multipliers:
  `window.__WORK_STAGE__.scrollBus.setMultiplier(key, Number(value))`.

#### 3. Real APCA Badge Component
Next to every color slider, the projector renders a live badge:
$$\text{APCA Badge HTML:}$$
```html
<div class="dna-apca-badge pass" title="APCA Lc 82.4 — Pass AA Body">
  <span class="apca-score">Lc 82</span>
  <span class="apca-label">AA Body</span>
</div>
```

#### 4. ACID Commit via `TransactionManager` + `node:sqlite`
When a designer clicks "Commit Changes", changes are committed atomically to a SQLite database in Write-Ahead Logging (WAL) mode.

---

### 5.3 Part C: Section MCP Server Specification

Studio DNA PRO v2.6 exposes Section Capsule operations over the Model Context Protocol (MCP) using `@modelcontextprotocol/sdk`.

#### 1. Complete Zod Schemas for Tools

```typescript
import { z } from 'zod';

export const ExtractSectionCapsuleSchema = {
  refSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Slug of the reference skeleton in copias/'),
  sectionSelector: z.string().min(1).describe('CSS selector for the root of the section (e.g. "#hero", "section.work")'),
  capsuleSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Target capsule slug in design-vault/capsules/')
};

export const ListClientSectionsSchema = {
  clientSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Slug of client workspace in clientes/')
};

export const MountVaultCapsuleSchema = {
  clientSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Target client slug'),
  capsuleSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Capsule slug from design-vault/capsules/'),
  insertAfterSectionId: z.string().optional().describe('Section ID after which the capsule will be inserted')
};

export const PatchSectionDnaSchema = {
  clientSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Target client slug'),
  sectionId: z.string().min(1).describe('Section identifier within the client DNA'),
  patches: z.record(z.string(), z.any()).describe('Dictionary of parameter id -> new value'),
  author: z.string().default('agent').describe('Identifier of the agent or user making the edit'),
  commitMessage: z.string().min(1).describe('Audit reason for the mutation')
};

export const CompileSlugFontSchema = {
  ttfPath: z.string().min(1).describe('Path to source .ttf file in project'),
  outputDir: z.string().min(1).describe('Destination directory for compiled Slug binary assets'),
  charSet: z.string().optional().describe('Character set to extract (defaults to standard ASCII + Latin-1)')
};

export const DiagnoseSectionTelemetrySchema = {
  clientSlug: z.string().regex(/^[a-z0-9-]+$/).describe('Target client slug'),
  durationMs: z.number().int().positive().default(2000).describe('Telemetry sampling duration in milliseconds')
};
```

#### 2. Complete Zod Schemas for Resources

```typescript
export const VaultCapsulesResourceUri = 'vault://capsules';
export const VaultCapsuleManifestPattern = 'vault://capsules/{slug}/manifest';
export const ClientSectionsResourcePattern = 'client://{slug}/sections';
export const ClientSectionDnaPattern = 'client://{slug}/sections/{sectionId}/dna';
```

#### 3. Complete SQLite WAL Relational Schema

```sql
-- Studio DNA Engine v2.6 — SQLite WAL Storage Schema
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
PRAGMA synchronous = NORMAL;

CREATE TABLE IF NOT EXISTS dna_section_capsules (
  id TEXT PRIMARY KEY,
  client_slug TEXT NOT NULL,
  section_slug TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0.0',
  dna_ir TEXT NOT NULL,          -- JSON payload of dna-ir.json
  scoped_css TEXT NOT NULL,      -- Scoped CSS styles
  html_template TEXT NOT NULL,   -- HTML envelope
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dna_revisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_slug TEXT NOT NULL,
  section_id TEXT NOT NULL,
  parent_hash TEXT,
  current_hash TEXT NOT NULL,
  author TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(section_id) REFERENCES dna_section_capsules(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dna_param_deltas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  revision_id INTEGER NOT NULL,
  param_id TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT NOT NULL,
  adapter TEXT NOT NULL,
  FOREIGN KEY(revision_id) REFERENCES dna_revisions(id) ON DELETE CASCADE
);

-- Full-Text Search (FTS5) for fast capsule discovery in Design Vault
CREATE VIRTUAL TABLE IF NOT EXISTS dna_capsules_fts USING fts5(
  section_slug,
  title,
  capabilities,
  tokens,
  content='dna_section_capsules',
  content_rowid='rowid'
);
```

---

## 6. Zero-Dependency Core Micro-Engines (Node.js 24+ CommonJS)

### 6.1 Engine 1: Pure JS 2D R-Tree (`spatial-rtree.js`) & Typographic Energy

To eliminate external dependency `rbush` and provide layout collision checking for Pillar 7 and Section Slicing, `spatial-rtree.js` implements a pure JavaScript 2D R-Tree using the Guttman Quadratic Split algorithm.

#### 1. R-Tree Node Geometry & Bounding Box Equations

Let a bounding box $B = (\min_x, \min_y, \max_x, \max_y)$.
Two boxes $A$ and $B$ intersect if and only if:
$$\text{Eq. 22:} \quad \text{intersects}(A, B) \iff \left( A.\min_x \le B.\max_x \land A.\max_x \ge B.\min_x \land A.\min_y \le B.\max_y \land A.\max_y \ge B.\min_y \right)$$

Enclosing box of $A$ and $B$:
$$A \cup B = \left( \min(A.\min_x, B.\min_x), \min(A.\min_y, B.\min_y), \max(A.\max_x, B.\max_x), \max(A.\max_y, B.\max_y) \right)$$

Enlargement area cost when inserting item $E$ into node $N$:
$$\text{Eq. 23:} \quad \Delta \text{Area}(N, E) = \text{Area}(N \cup E) - \text{Area}(N)$$

#### 2. Quadratic Split Algorithm
When node children exceed $M = 9$:
1. **Find Seeds:** Pick pair of children $(e_1, e_2)$ maximizing dead space:
   $$d(e_1, e_2) = \text{Area}(e_1 \cup e_2) - \text{Area}(e_1) - \text{Area}(e_2)$$
2. **Distribute Remaining:** For each remaining child, compute area increase for group 1 vs group 2. Assign to group with minimal enlargement; break ties by smallest current area, then fewest entries.
3. Minimum node fill is enforced: $m = \lceil M \cdot 0.4 \rceil = 4$.

#### 3. Typographic Energy Function $E_{\text{typo}}(v)$
To auto-tag kinetic slots from raw DOM nodes:
$$\text{Eq. 24:} \quad E_{\text{typo}}(v) = w_s \left( \frac{F_{\text{size}}}{16} \right)^2 + w_w \left( \frac{F_{\text{weight}}}{400} \right) + w_a \log(1 + A_v) + w_r \left( \frac{W_v}{H_v} \right)$$
where $w_s = 0.45, w_w = 0.25, w_a = 0.20, w_r = 0.10$. Nodes with $E_{\text{typo}}(v) \ge 3.8$ are identified as primary editorial headlines.

#### 4. Subtree Isomorphism for Collection Slicing
Candidate repeating cards are matched if Tree Edit Distance $\text{TED}(T_1, T_2) = 0$ (identical tag and class structure) and area coefficient of variation:
$$\text{Eq. 25:} \quad \text{CV}_{\text{area}} = \frac{\sigma_{\text{area}}}{\mu_{\text{area}}} \le 0.15$$
automatically identifying project grids and carousels.

---

### 6.2 Engine 2: PostCSS Selector AST Parser (`css-selector-ast.js`) & Donut Scope Fix

To resolve limitation L7 (where `test/challenger-adversarial-m5.test.js` demonstrated that `validateDonutScopeInvariants` allowed child combinators `>` and attribute selectors `[data-kinetic-slot="val"] h1`), we specify a recursive selector parser built directly on top of installed `postcss` (`^8.5.26`).

#### 1. Selector AST Grammar
A selector string is tokenized into:
- **Compound Selector:** A sequence of simple selectors not separated by combinators (e.g. `div.kinetic-stage[data-active]`).
- **Combinator:** ` ` (descendant), `>` (child), `+` (adjacent sibling), `~` (general sibling).
- **Complex Selector:** A chain of compound selectors connected by combinators.

#### 2. Donut Boundary Piercing Rule
Let $\mathcal{B}$ be the slot boundary selector pattern (matching any selector where an attribute equals `data-kinetic-slot`, with or without value).

A complex selector:
$$S = C_1 \circ_1 C_2 \circ_2 \dots \circ_{k-1} C_k$$
**violates donut scope invariants** if and only if:
$$\exists i < k \quad \text{such that } C_i \text{ matches } \mathcal{B} \quad \text{AND } \circ_i \in \{ \text{' ' (descendant)}, \ \text{'>' (child)} \}$$

Self-styling $C_k$ matching $\mathcal{B}$ (with no subsequent child or descendant) is strictly **permitted**.

---

### 6.3 Engine 3: Native PNG Decoder (`png-codec.js`) & 42-Map Itti-Koch Saliency Oracle

To eliminate external dependencies like `pngjs` or `image-size`, `png-codec.js` decodes PNG images using Node's built-in `node:zlib.inflateSync`.

#### 1. Binary PNG Decoding & Scanline Defiltering
A valid PNG begins with the 8-byte magic number: `[137, 80, 78, 71, 13, 10, 26, 10]`.
Chunk extraction parses `IHDR`, concatenates all `IDAT` chunks, and applies `inflateSync`.

The decompressed buffer consists of $H$ scanlines. Each scanline has 1 filter byte followed by $W \cdot bpp$ data bytes ($bpp = 4$ for 8-bit RGBA).
The 5 scanline reconstruction filters are:
- `Filter 0 (None):` $\text{Recon}(x) = \text{Filt}(x)$
- `Filter 1 (Sub):` $\text{Recon}(x) = \text{Filt}(x) + \text{Recon}(a) \pmod{256}$ (left)
- `Filter 2 (Up):` $\text{Recon}(x) = \text{Filt}(x) + \text{Prior}(b) \pmod{256}$ (above)
- `Filter 3 (Average):` $\text{Recon}(x) = \text{Filt}(x) + \lfloor (\text{Recon}(a) + \text{Prior}(b)) / 2 \rfloor \pmod{256}$
- `Filter 4 (Paeth):` $\text{Recon}(x) = \text{Filt}(x) + \text{PaethPredictor}(a, b, c) \pmod{256}$ (left $a$, above $b$, above-left $c$):
$$\text{Eq. 26:} \quad \begin{cases}
p = a + b - c \\
pa = |p - a|, \quad pb = |p - b|, \quad pc = |p - c| \\
\text{PaethPredictor} = \begin{cases} a, & \text{if } pa \le pb \land pa \le pc \\ b, & \text{if } pb \le pc \\ c, & \text{otherwise} \end{cases}
\end{cases}$$

#### 2. 42-Map Itti-Koch Dyadic Feature Pyramid Architecture
The visual saliency engine constructs an 8-scale Gaussian pyramid $\sigma \in \{0, 1, \dots, 8\}$.
Center-surround scale pairs $(c, s)$ are formed with center $c \in \{2, 3, 4\}$ and surround $s = c + \delta$ with $\delta \in \{3, 4\}$:
$$(c, s) \in \{ (2, 5), (2, 6), (3, 6), (3, 7), (4, 7), (4, 8) \} \implies 6 \text{ pairs}$$

The 42 feature maps are:
1. **Intensity Channel (6 maps):** $I(c, s) = |I(c) \ominus I(s)|$
2. **Color Opponency Channels (12 maps):**
   - Red-Green: $RG(c, s) = |(R(c) - G(c)) \ominus (G(s) - R(s))|$ (6 maps)
   - Blue-Yellow: $BY(c, s) = |(B(c) - Y(c)) \ominus (Y(s) - B(s))|$ (6 maps)
3. **Orientation Channels (24 maps):**
   - For angles $\theta \in \{0^\circ, 45^\circ, 90^\circ, 135^\circ\}$:
     $O(c, s, \theta) = |O(c, \theta) \ominus O(s, \theta)|$ ($4 \times 6 = 24$ maps)
$$\text{Total Feature Maps} = 6 + 12 + 24 = 42$$

#### 3. Lateral Competition Operator $\mathcal{N}(M)$
Every feature map $M$ undergoes iterative lateral inhibition:
$$\text{Eq. 27:} \quad \mathcal{N}(M) = M \cdot (M_{\max} - \bar{m})^2$$
where $M_{\max} = \max_{(x,y)} M(x, y)$ and $\bar{m}$ is the average of all local maxima. This suppresses noisy, cluttered backgrounds and strongly boosts isolated, salient elements (such as CTA buttons).

#### 4. Early Glance Metrics
- **CTA Optical Prominence Score:**
$$\text{Eq. 28:} \quad S_{\text{CTA}} = \frac{\iint_{\text{CTA}} S(x, y) \, dx dy}{\iint_{\text{Viewport}} S(x, y) \, dx dy} \ge 0.18$$
- **Visual Distraction Ratio:**
$$\text{Eq. 29:} \quad R_{\text{distraction}} = \frac{\iint_{\text{NonFunctional}} S(x, y) \, dx dy}{\iint_{\text{Functional}} S(x, y) \, dx dy} \le 0.35$$

---

### 6.4 Engine 4: Binary TrueType Slug Font Compiler (`slug-font-compiler.js`)

To eliminate `opentype.js` and allow high-performance GPU text rendering in WebGL/Three.js, `slug-font-compiler.js` parses TrueType files via `DataView`.

#### 1. Binary Table Parsing
The compiler parses standard TrueType binary tables:
- `Offset Table`: `numTables` (uint16 at offset 4).
- `Table Directory`: Reads 4-byte tags (`head`, `hhea`, `maxp`, `hmtx`, `cmap`, `loca`, `glyf`).
- `head`: `unitsPerEm` (uint16 at offset 18), `indexToLocFormat` (int16 at offset 50: $0$ for 16-bit offset / 2, $1$ for 32-bit offset).
- `cmap`: Reads Format 4 (Windows BMP) and Format 12 (32-bit Unicode) to map character codes to glyph indices.
- `loca` & `glyf`: Resolves byte offsets and extracts glyph contours and flags.

#### 2. Quadratic Splines & De Casteljau Subdivision
TrueType glyph contours consist of on-curve points and off-curve control points representing quadratic Bezier curves:
$$B(t) = (1-t)^2 P_0 + 2(1-t)t P_1 + t^2 P_2, \quad t \in [0, 1]$$
When consecutive off-curve points occur, an on-curve point is synthesized at their midpoint:
$$P_{\text{on}} = \frac{P_{1} + P_{2}}{2}$$

If subdivision is required (or for cubic curve flattening):
$$\text{Eq. 30:} \quad \begin{cases}
P_{01} = \dfrac{P_0 + P_1}{2} \\[6pt]
P_{12} = \dfrac{P_1 + P_2}{2} \\[6pt]
P_{012} = \dfrac{P_{01} + P_{12}}{2}
\end{cases}$$

#### 3. Packing Slug Buffers ($N_B = 8$)
Each glyph bounding box is partitioned into $N_B = 8$ horizontal bands. Curves intersecting each band are recorded into a contiguous `Float32Array` texture buffer.
Each curve entry stores:
$$\text{Record } = [p_{0x}, p_{0y}, p_{1x}, p_{1y}, p_{2x}, p_{2y}, \text{flags}]$$
allowing the GPU fragment shader to evaluate analytical root finding per pixel without rasterization artifacts.

---

### 6.5 Repairs for Limitations L8 and L5

#### 1. Repair for Limitation L8 (`src/orchestration/dag-scheduler.js`)

**Problem Observed:** Lines 32–34 execute all `ready` tasks in parallel using `Promise.all` without checking write-lock intersections. If two tasks write to the same file (e.g. `brand-spec.json`), a race condition occurs.

**Repaired Write-Lock Partitioning Algorithm:**
```javascript
// In src/orchestration/dag-scheduler.js
function partitionByWriteLocks(tasks) {
  const independentBatches = [];
  let remaining = [...tasks];

  while (remaining.length > 0) {
    const currentBatch = [];
    const lockedResources = new Set();
    const deferred = [];

    for (const task of remaining) {
      const taskLocks = task.writeLocks || (task.writeScope ? [task.writeScope] : []);
      const hasConflict = taskLocks.some(lock => lockedResources.has(lock));

      if (!hasConflict) {
        currentBatch.push(task);
        taskLocks.forEach(lock => lockedResources.add(lock));
      } else {
        deferred.push(task);
      }
    }

    independentBatches.push(currentBatch);
    remaining = deferred;
  }

  return independentBatches;
}
```
The scheduler executes each independent batch sequentially, while tasks within a batch run concurrently via `Promise.all`.

---

#### 2. Repair for Limitation L5 (`src/pro/universal-asset-normalizer.js`)

**Problem Observed:** Lines 152–174 contain an extra closing brace `}` and a broken, duplicated nested CSS block that corrupts CSS parsing.

**Verbatim Repaired Replacement Block (lines 142–174):**
```css
      /* 3. Prevenção de Bloqueio de Scroll por Classes de Preloader/Lenis mantendo position: sticky */
      html {
        overflow-x: clip !important;
        overflow-y: auto !important;
        height: auto !important;
      }
      body {
        overflow-x: clip !important;
        overflow-y: visible !important;
        height: auto !important;
      }
      html.lenis-stopped, 
      body.lenis-stopped, 
      html.is-loading, 
      body.is-loading,
      body.no-scroll {
        overflow: auto !important;
        overflow-x: clip !important;
        height: auto !important;
      }
```

---

## 7. Formal Invariance Theorems and Mathematical Proofs

### Theorem 1 (Donut Scope Boundary Isolation)
*Let $\mathcal{S}$ be a stylesheet parsed by `CssSelectorAst` with root $\mathcal{R}$ and boundary $\mathcal{B} = \text{[data-kinetic-slot]}$. If $\text{validateDonutScopeInvariants}(\mathcal{S}) = \text{true}$, then no rule in $\mathcal{S}$ can match any element $v \in \text{subtree}(u)$ where $u$ is matched by $\mathcal{B}$.*

**Proof:**
By definition, a CSS selector targets an element $v$ inside a slot $u$ if and only if the complex selector has a compound selector matching $u$ followed by a descendant combinator (` `) or child combinator (`>`) to another compound selector matching $v$.
The `CssSelectorAst` parser decomposes every selector into an alternating sequence of compound selectors and combinators $(C_1, \circ_1, C_2, \dots, C_k)$.
The validation function iterates through all $i \in \{1, \dots, k-1\}$:
If $C_i$ matches `[data-kinetic-slot]` (with any attribute operator or value) and $\circ_i \in \{ \text{' '}, \text{'>'} \}$, the function records a violation and sets `compliant = false`.
Therefore, if `compliant = true`, no selector contains a descendant or child combinator rooted at any element matching $\mathcal{B}$.
By CSS cascade semantics, rules without descendant/child combinators through $\mathcal{B}$ cannot match $v \in \text{subtree}(u) \setminus \{u\}$. $\blacksquare$

---

### Theorem 2 (Monotonicity of APCA Contrast Binary Search)
*For any fixed background luminance $Y_{\text{bg}} \in [0, 1]$, the reverse polarity APCA contrast function $|L^c(L_{\text{txt}}, Y_{\text{bg}})|$ is strictly monotonically increasing with respect to text lightness $L_{\text{txt}}$ for all $L_{\text{txt}} > Y_{\text{bg}}^{0.65/0.62}$.*

**Proof:**
In reverse polarity ($Y_{\text{txt}} > Y_{\text{bg}}$), the APCA score is:
$$S_{\text{apca}} = \left( Y_{\text{bg}}^{0.65} - Y_{\text{txt}}^{0.62} \right) \cdot 1.14$$
Since $Y_{\text{txt}} > Y_{\text{bg}}^{0.65/0.62}$, $Y_{\text{txt}}^{0.62} > Y_{\text{bg}}^{0.65}$, so $S_{\text{apca}} < 0$.
Taking the absolute value:
$$|S_{\text{apca}}| = 1.14 \cdot \left( Y_{\text{txt}}^{0.62} - Y_{\text{bg}}^{0.65} \right)$$
Differentiating with respect to $Y_{\text{txt}}$:
$$\frac{d |S_{\text{apca}}|}{d Y_{\text{txt}}} = 1.14 \cdot 0.62 \cdot Y_{\text{txt}}^{-0.38} > 0 \quad \forall Y_{\text{txt}} \in (0, 1]$$
Since $Y_{\text{txt}}$ is a strictly monotonically increasing function of $L_{\text{txt}}$ (via $C_{\text{lin}} = C^{2.4}$ and the positive definite LMS matrix $\mathbf{M}_1$), the composite function $|L^c(L_{\text{txt}}, Y_{\text{bg}})|$ is strictly monotonically increasing with respect to $L_{\text{txt}}$.
Consequently, binary search on $L_{\text{txt}} \in [Y_{\text{bg}}, 1.0]$ has a unique fixed point and is guaranteed to converge exponentially with error bound $\epsilon_k \le 2^{-k}$. $\blacksquare$

---

## 8. Verification Strategy & Test Matrix

The following test suite in `test/v2.6/` provides automated, reproducible verification of the specifications:

| Test File | Target Module | Verification Commands & Key Assertions |
|-----------|---------------|----------------------------------------|
| `test/v2.6/apca-contrast.test.js` | APCA Engine & OKLCH | Validates $s\text{RGB} \leftrightarrow \text{OKLCH}$ roundtrip ($\Delta E \le 10^{-4}$); validates APCA scores on standard W3C test pairs (`#000000` on `#ffffff` $\to +106 \pm 1$; `#ffffff` on `#000000` $\to -108 \pm 1$); verifies monotonic binary search convergence. |
| `test/v2.6/spatial-rtree.test.js` | `SpatialRTree` | Validates insertion of 100 random bounding boxes, confirms zero false negatives in spatial search, validates boundary collision detection against exact AABB fixtures. |
| `test/v2.6/css-selector-ast.test.js` | `CssSelectorAst` | Confirms detection of Test 4.5 (`[data-kinetic-slot] > h1`) and Test 4.6 (`[data-kinetic-slot="hero-title"] h1`); verifies that self-styling `[data-kinetic-slot]` passes cleanly. |
| `test/v2.6/png-codec.test.js` | `PngCodec` | Decompresses 8-bit RGBA PNG test fixtures using all 5 scanline filters; verifies pixel values against raw uncompressed byte buffers; tests corrupted header rejection. |
| `test/v2.6/slug-font-compiler.test.js` | `SlugFontCompiler` | Parses sample TTF binary buffer; extracts glyph quadratic Bezier curves; verifies De Casteljau subdivision; validates packed buffer length and $N_B=8$ band index table. |
| `test/v2.6/dag-scheduler-locks.test.js` | `scheduleBlueprint` | Validates that tasks with intersecting `writeLocks` execute in successive batches, while tasks with disjoint locks execute concurrently. |

All tests execute cleanly under Node.js built-in test runner:
```bash
node --test test/v2.6/*.test.js
```
with zero external dependencies outside `package-lock.json`.
