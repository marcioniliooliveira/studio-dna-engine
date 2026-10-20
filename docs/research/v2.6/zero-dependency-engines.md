# Zero-Dependency Core Micro-Engines & Codebase Repairs

**Document ID:** `DOC-RESEARCH-V26-ZERO-DEP-ENGINES`  
**System:** Studio DNA PRO v2.6 (`studio-dna-engine`)  
**Status:** Implementation-Grade Architectural Specification  
**Classification:** `[observed]` (codebase tests), `[documented]` (ISO, W3C, TTF, & Node.js 24 standards), `[inferred]` (mathematical derivations)

---

## 1. Executive Summary & Zero-Dependency Mandate

Studio DNA PRO v2.6 expands the autonomous front-end engine under a strict zero-dependency mandate: **no external packages may be installed beyond the existing `package-lock.json`** (`[documented]` Requirement R6).

Inspection of the runtime environment (`[observed]` in `explorer_survey_1`):
- **Node.js Version:** `v24.15.0`.
- **Module System:** CommonJS (`"type": "commonjs"`).
- **Available Built-ins:** `node:sqlite` (`DatabaseSync`), `node:zlib` (`inflateSync`), `node:crypto` (`createHash`), `node:test`, `node:assert/strict`.
- **Installed Packages Available:** `postcss` (`^8.5.26`), `zod` (`^4.4.3`), `cheerio` (`^1.2.0`), `three` (`^0.161.0`), `gsap` (`^3.12.5`), `playwright` (`^1.41.0`).
- **Forbidden / Uninstalled Libraries:** `opentype.js`, `rbush`, `postcss-selector-parser`, and `pngjs` are completely absent from `package-lock.json` (`[observed]`).

To satisfy this mandate, Studio DNA PRO v2.6 specifies and provides four zero-dependency pure JavaScript micro-engines and repairs for three critical core codebase defects (L5, L7, L8).

---

## 2. Master Equation Index (Equations 1–32)

The 32 closed-form equations underpinning Studio DNA PRO v2.6 are indexed below:

| Eq. # | Mathematical Formulation | Description | Primary Chapter | Source File |
|---|---|---|---|---|
| **Eq. 1** | $\mathcal{V}_{\text{used}}(r_k) = \bigcup_{v \in T(r_k)} \bigcup_{d \in \mathcal{D}(v)} \text{ExtractVars}(d.\text{value})$ | Custom Property Used Variable Set | Pillar 6 | `pilar-06-scene-to-capsule.md` |
| **Eq. 2** | $\mathcal{V}_{\text{defined}}(r_k) = \bigcup_{v \in T(r_k)} \{ p \in \text{Properties}(d) \mid d \in \mathcal{D}(v) \land p \text{ starts with } \text{"--"} \}$ | Custom Property Defined Variable Set | Pillar 6 | `pilar-06-scene-to-capsule.md` |
| **Eq. 3** | $\mathcal{V}_{\text{free}}(r_k) = \mathcal{V}_{\text{used}}(r_k) \setminus \mathcal{V}_{\text{defined}}(r_k)$ | Free (Inherited) Custom Property Set | Pillar 6 | `pilar-06-scene-to-capsule.md` |
| **Eq. 4** | $V^*(\nu) = \text{getComputedStyle}(r_k).\text{getPropertyValue}(\nu)$ | Boundary Computed Value Capture | Pillar 6 | `pilar-06-scene-to-capsule.md` |
| **Eq. 5** | $\mathcal{C}(r_k) = \{ (\nu, V^*(\nu)) \mid \nu \in \mathcal{V}_{\text{free}}(r_k) \}$ | Inherited Custom Property Closure | Pillar 6 | `pilar-06-scene-to-capsule.md` |
| **Eq. 6a–h** | $M_{\text{in}} = \mu_{\text{expand}} v_{\text{height}}, \ M_{\text{hold}} = \mu_{\text{hold}} v_{\text{height}}, \ M_{\text{out}} = \mu_{\text{exit}} v_{\text{height}}, \ U = h + \sum M$ | Scroll Allocation Intervals | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 7** | $p_{\text{portal}}(s) = \text{piecewise linear progress } \in [0, 1]$ | Normalized Portal Expansion Signal | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 8** | $p_{\text{ribbon}}(s) = \text{piecewise linear progress } \in [0, 1]$ | Normalized Ribbon Scroll Signal | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 9** | $\phi_k(s) \in \{\text{IDLE}, \text{PORTAL\_EXPAND}, \text{RIBBON\_BROWSE}, \text{PORTAL\_EXIT}, \text{RESUME}\}$ | Discrete Lifecycle Phase Indicator | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 10a–b** | $v_k^{(t)} = \alpha_v v_{\text{raw}}^{(t)} + (1 - \alpha_v) v_k^{(t-\Delta t)}$ | EMA Damped Instantaneous Velocity | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 11** | $\text{clip-path: polygon}(x_1\text{px} \ y_1\text{px}, \dots, x_1\text{px} \ y_2\text{px})$ | Sibling Portal Dynamic Optical Mask | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 12** | $x_{\text{base}} = (i - i_{\text{center}}) \cdot \text{stride} + \text{offset}_{\text{ribbon}}$ | 3D Ribbon Card Base World Center | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 13a–b** | $\mathbf{v}_{\text{local}}^{(k)} = [\pm W_c/2, \pm H_c/2, 0]^T$ | Card Quad Local Vertex Offsets | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 14** | $q(x_k) = \frac{x_k}{\max(u_{\text{sheetW}}, 10^{-4})} u_{\text{sheetT}} + \text{SHEET\_SHIFT}$ | Normalized Ribbon Coordinate | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 15** | $\text{shape}(q) = [(1 - q^2)(1 - u_{\text{sheetC}}) + \sin(\pi q) u_{\text{sheetC}}] e^{-\text{TAIL} \cdot q^2}$ | Longitudinal Ribbon Curvature | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 16** | $\text{shapeSlope}(q) = \frac{d}{dq}\text{shape}(q)$ | Curvature Derivative / Slope | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 17** | $\theta_{\text{roll}}(x_k) = \frac{\text{SHEET\_BANK} \cdot \text{shapeSlope}(q)}{\pi} u_{\text{sheetC}} u_{\text{sheetP}} + \theta_{\text{twist}}$ | Roll Rotation Angle | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 18a–b** | $y'_k = y_k \cos \theta - z_k \sin \theta, \ z'_k = y_k \sin \theta + z_k \cos \theta$ | X-Axis Vertex Rotation | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 19a–b** | $z''_k = z'_k - u_{\text{sheetD}} \text{shape}(q) u_{\text{sheetP}}, \ y''_k = y'_k + \text{perturbations}$ | Depth Displacement & Wave Perturbations | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 20** | $\mathbf{P}_{\text{deformed}}^{(k)} = [x_k, y''_k, z''_k, 1]^T \in \mathbb{R}^4$ | Homogeneous Deformed 3D Vertex | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 21** | $\mathbf{M}_{\text{VP}} = \mathbf{P} \cdot \mathbf{V}$ | Camera View-Projection Matrix | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 22** | $\mathbf{P}_{\text{clip}}^{(k)} = \mathbf{M}_{\text{VP}} \cdot \mathbf{P}_{\text{deformed}}^{(k)}$ | Homogeneous Clip-Space Coordinate | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 23** | $x_{\text{ndc}} = x_{\text{clip}} / w_{\text{clip}}, \ y_{\text{ndc}} = y_{\text{clip}} / w_{\text{clip}}$ | Normalized Device Coordinates (NDC) | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 24a–b** | $X_{\text{screen}} = \frac{x_{\text{ndc}} + 1}{2} W_{\text{vp}}, \ Y_{\text{screen}} = \frac{1 - y_{\text{ndc}}}{2} H_{\text{vp}}$ | Viewport Pixel Projection Coordinates | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 25a–e** | $x_{\min} = \min X_k, \ x_{\max} = \max X_k, \ w = x_{\max} - x_{\min}, \ h = y_{\max} - y_{\min}$ | Exact 2D AABB for Proxy Buttons | Pillar 7 | `pilar-07-universal-envelope-scrollbus.md` |
| **Eq. 26** | $DPR = \min(\text{window.devicePixelRatio} \parallel 1.0, 2.0)$ | Clamped Device Pixel Ratio | Pillar 8 | `pilar-08-webgl-virtualization.md` |
| **Eq. 27a–d** | $x_{\text{gl}} = \lfloor rect.left \cdot DPR \rfloor, \ y_{\text{gl}} = \lfloor (H_{\text{vp}} - rect.bottom) \cdot DPR \rfloor$ | Y-Inverted OpenGL Framebuffer Coordinates | Pillar 8 | `pilar-08-webgl-virtualization.md` |
| **Eq. 28** | $rect.left \le X_p \le rect.right \ \land \ rect.top \le Y_p \le rect.bottom$ | Virtual Viewport Bounding Condition | Pillar 8 | `pilar-08-webgl-virtualization.md` |
| **Eq. 29a–b** | $x_{\text{cam}} = \frac{X_p - rect.left}{rect.width} \cdot 2 - 1, \ y_{\text{cam}} = -\left(\frac{Y_p - rect.top}{rect.height} \cdot 2 - 1\right)$ | Virtual Camera NDC Screen Remapping | Pillar 8 | `pilar-08-webgl-virtualization.md` |
| **Eq. 30a–e** | $s\text{RGB} \xrightarrow{\text{invEOTF}} \text{linRGB} \xrightarrow{\mathbf{M}_1} \text{LMS} \xrightarrow{\sqrt[3]{\cdot}} \text{LMS}' \xrightarrow{\mathbf{M}_2} \text{Oklab} \to \text{OKLCH}$ | Forward $s\text{RGB} \to \text{OKLCH}$ Conversion | Pillar 9 | `pilar-09-oklch-color-synthesis.md` |
| **Eq. 31a–e** | $\text{OKLCH} \to \text{Oklab} \xrightarrow{\mathbf{M}_2^{-1}} \text{LMS}' \xrightarrow{(\cdot)^3} \text{LMS} \xrightarrow{\mathbf{M}_1^{-1}} \text{linRGB} \xrightarrow{\text{EOTF}} s\text{RGB}$ | Inverse $\text{OKLCH} \to s\text{RGB}$ Conversion | Pillar 9 | `pilar-09-oklch-color-synthesis.md` |
| **Eq. 32a–f** | $Y = \mathbf{w}^T \mathbf{C}_{\text{lin}}, \ Y_{\text{clamped}} = f(Y), \ S_{\text{apca}} = (Y_{\text{bg}}^{\alpha} - Y_{\text{txt}}^{\beta}) \cdot 1.14, \ L^c = g(S)$ | Authoritative APCA 0.0.98G-4g | Pillar 10 | `pilar-10-apca-fluid-typography.md` |

---

## 3. Limitation Resolution Matrix (L1 through L9)

| # | Limitation ID | Observed Codebase Defect | Resolving Pillar / Micro-Engine | Verification Evidence |
|---|---|---|---|---|
| 1 | **L1: Cloner Empty `sections/`** | `src/core/cloner.js:165` unconditionally created `sections/` while missing non-semantic containers and exporting unscoped HTML | **Pillar 6:** Scene-to-Capsule Subtree Slicing | Closed CDP extraction with Inherited Custom Property Closure $\mathcal{C}(r_k)$ and AST prefix pruning into `design-vault/capsules/`. |
| 2 | **L2: HUD OP-XY Presets & Fake APCA** | `src/generators/hud-projector.js:1384-1530` hardcoded presets (`swiss`, `tokyo`) and multiplied WCAG ratio by 10 | **Pillar 11:** Dual HUD & Section MCP Server | Agnostic HUD projector driven strictly by `dna-ir.json` parameters + legitimate APCA badge renderer + SQLite WAL. |
| 3 | **L3: Legacy WCAG 2.1 Contrast** | `src/constraints/contrast.js:39` used $(L_1+0.05)/(L_2+0.05)$ and hardcoded product luminance $0.012$ | **Pillar 10:** APCA Contrast & Fluid Typography | Complete APCA 0.0.98G-4g equations + monotonic binary search + dynamic `dnaIr.constraints` traversal. |
| 4 | **L4: Static Colors & Typography** | `src/components/WorkStage/referenceData.ts` hardcoded hex swatches and fixed font dimensions | **Pillars 9 & 10:** OKLCH & Fluid Typography | OKLCH relational palette projection ($\Delta L_i$ preservation) + OLS multi-breakpoint regression with lexical damping $\kappa_{\text{copy}}$. |
| 5 | **L5: Malformed CSS in Normalizer** | `src/pro/universal-asset-normalizer.js:152-174` contained stray closing brace and duplicated nested rules | **Micro-Engine Repair M2** | Verbatim replacement block (lines 142–174) restoring valid CSSOM syntax without duplicate nesting. |
| 6 | **L6: Hardcoded WorkStage 3D** | `src/components/WorkStage/WorkStage.tsx` used rough CSS percentage bounds for proxies, causing $40\text{px}$ drift and wheel deadlock | **Pillar 7:** Universal `<dna-capsule>` & ScrollBus | Five Physical Laws of `<dna-capsule>`, Sibling Portal Mount, Sub-pixel NDC projection ($\epsilon \le 0.5\text{px}$), and `UniversalScrollBus`. |
| 7 | **L7: Donut Scope Blind Spots** | `src/compiler/kinetic-grammar-schema.js:309` regex missed child combinator `>` (Test 4.5) and attribute selectors (Test 4.6) | **Micro-Engine R6.2:** `css-selector-ast.js` | Recursive selector parser over PostCSS detecting descendant penetrations while permitting boundary self-styling. |
| 8 | **L8: DAG Scheduler Concurrency Conflict** | `src/orchestration/dag-scheduler.js:33` ran all ready tasks concurrently with zero write-lock intersection checks | **Micro-Engine R6.5 & Blueprint** | Write-lock intersection algorithm with glob containment partitioning batches by disjoint write sets. |
| 9 | **L9: 62 Throwaway Scripts** | Ad-hoc scripts under `scripts/` spawned due to lack of interactive runtime parameter modification | **Pillar 11:** Section MCP Server | Standardized MCP tools (`extract_section_capsule`, `patch_section_dna`) backed by SQLite WAL database. |

---

## 4. Core Micro-Engine R6.1: Pure JS 2D R-Tree (`spatial-rtree.js`) & Typographic Energy

To eliminate external dependency `rbush` while providing sub-millisecond collision detection for spatial layouts:

### 4.1 Bounding Box Equations & Quadratic Split (Equations 22–23)
Let bounding box $A = (\min_x, \min_y, \max_x, \max_y)$.  
Two bounding boxes $A$ and $B$ intersect if and only if:
$$\text{Eq. 22:} \quad \text{intersects}(A, B) \iff (A.\min_x \le B.\max_x \land A.\max_x \ge B.\min_x \land A.\min_y \le B.\max_y \land A.\max_y \ge B.\min_y)$$

Enlargement area cost when inserting bounding box $E$ into node $N$:
$$\text{Eq. 23:} \quad \Delta \text{Area}(N, E) = \text{Area}(N \cup E) - \text{Area}(N)$$

The Guttman Quadratic Split partitions overflowing nodes ($M = 9, m = 4$) by finding seed pairs maximizing dead space:
$$d(e_1, e_2) = \text{Area}(e_1 \cup e_2) - \text{Area}(e_1) - \text{Area}(e_2)$$
and distributing remaining items to minimize area enlargement.

### 4.2 Typographic Energy Function $E_{\text{typo}}(v)$ (Equations 24–25)
To automatically tag kinetic slots from unannotated DOM nodes:
$$\text{Eq. 24:} \quad E_{\text{typo}}(v) = w_s \left( \frac{F_{\text{size}}}{16} \right)^2 + w_w \left( \frac{F_{\text{weight}}}{400} \right) + w_a \log(1 + A_v) + w_r \left( \frac{W_v}{H_v} \right)$$
where $w_s = 0.45, w_w = 0.25, w_a = 0.20, w_r = 0.10$. Elements with $E_{\text{typo}}(v) \ge 3.8$ are identified as primary editorial headlines.

Card collection slicing matches repeating items with Tree Edit Distance $\text{TED} = 0$ and area coefficient of variation:
$$\text{Eq. 25:} \quad \text{CV}_{\text{area}} = \frac{\sigma_{\text{area}}}{\mu_{\text{area}}} \le 0.15$$

---

## 5. Core Micro-Engine R6.2: PostCSS Selector AST Parser (`css-selector-ast.js`)

To resolve **Limitation L7** without requiring uninstalled `postcss-selector-parser`, `src/compiler/css-selector-ast.js` implements a recursive selector parser built directly over `postcss` (`^8.5.26`).

### 5.1 Architecture & Tokenizer
The parser decomposes selector strings into sequences of compound selectors and combinators:
- Compound: `[data-kinetic-slot]`, `h1`, `.card-title`.
- Combinators: ` ` (descendant), `>` (child), `+` (adjacent sibling), `~` (general sibling).

### 5.2 Donut Scope Validation Invariant
Let $\mathcal{B}$ be the slot boundary attribute `[data-kinetic-slot]`.
A selector chain $C_1 \circ_1 C_2 \dots \circ_{k-1} C_k$ is flagged as a boundary violation if:
$$\exists i < k \quad \text{such that } C_i \text{ matches } \mathcal{B} \quad \land \quad \circ_i \in \{\text{' '}, \text{'>'}\}$$

This catches:
- `[data-kinetic-slot] > h1` (Test 4.5 — child combinator `>`).
- `[data-kinetic-slot="hero-title"] h1` (Test 4.6 — attribute value selector).
While permitting self-styling:
- `[data-kinetic-slot] { display: block; }` (Test 4.7 — boundary self-selector).

---

## 6. Core Micro-Engine R6.3: Native PNG RGBA Decoder (`png-codec.js`) & Saliency Oracle

To eliminate external dependencies like `pngjs` or `image-size`, `png-codec.js` decodes PNG images using Node's built-in `node:zlib.inflateSync`.

### 6.1 PNG Scanline Defiltering & Paeth Predictor (Equation 26)
After inflating `IDAT` chunks, the byte stream is reconstructed across $H$ scanlines using the 5 standard PNG filter algorithms (None, Sub, Up, Average, Paeth). For Paeth (Filter 4):
$$\text{Eq. 26:} \quad \begin{cases}
p = a + b - c \\
pa = |p - a|, \quad pb = |p - b|, \quad pc = |p - c| \\
\text{PaethPredictor} = \begin{cases} a, & \text{if } pa \le pb \land pa \le pc \\ b, & \text{if } pb \le pc \\ c, & \text{otherwise} \end{cases}
\end{cases}$$

### 6.2 42-Map Itti-Koch Saliency Oracle & Lateral Competition (Equation 27)
The visual saliency engine constructs an 8-scale Gaussian pyramid $\sigma \in \{0, \dots, 8\}$ across Intensity (6 maps), Color Opponency (12 maps), and Orientation (24 maps), totaling **42 feature maps**.
Each feature map undergoes non-linear lateral inhibition:
$$\text{Eq. 27:} \quad \mathcal{N}(M) = M \cdot (M_{\max} - \bar{m})^2$$
where $M_{\max} = \max_{(x,y)} M(x,y)$ and $\bar{m}$ is the average of all local maxima. Maps are summed into a Master Saliency Map predicting the user's focal fixation during the first $500\text{ms}$.

---

## 7. Core Micro-Engine R6.4: Binary TrueType Slug Font Compiler (`slug-font-compiler.js`)

To enable high-performance GPU text rendering without `opentype.js`, `slug-font-compiler.js` parses TrueType files via native `DataView`.

### 7.1 Binary SFNT Table Extraction
The compiler parses:
- `head`: `unitsPerEm`, `indexToLocFormat` ($0$ for 16-bit, $1$ for 32-bit offset).
- `cmap`: Formats 4 and 12 character-to-glyph index mappings.
- `loca` & `glyf`: Resolves glyph contour coordinates and flags.

### 7.2 De Casteljau Subdivision (Equation 30)
Consecutive off-curve points have midpoints synthesized as on-curve vertices:
$$P_{\text{on}} = \frac{P_1 + P_2}{2}$$
Subdivision evaluates:
$$\text{Eq. 30:} \quad P_{01} = \frac{P_0 + P_1}{2}, \quad P_{12} = \frac{P_1 + P_2}{2}, \quad P_{012} = \frac{P_{01} + P_{12}}{2}$$

Curves are packed into $N_B = 8$ horizontal band textures with 7-float records $[p_{0x}, p_{0y}, p_{1x}, p_{1y}, p_{2x}, p_{2y}, \text{flags}]$ for analytical GPU root finding.

---

## 8. Codebase Repairs (Limitations L8 and L5)

### 8.1 Repair for Limitation L8 (`src/orchestration/dag-scheduler.js`)

**Problem Observed:** Lines 32–34 execute all `ready` tasks concurrently without checking write-lock intersections (`[observed]`).

**Repaired Algorithm:**
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
      const hasConflict = taskLocks.some(lock => {
        for (const activeLock of lockedResources) {
          if (activeLock === lock) return true;
          if (activeLock.endsWith('/**') && lock.startsWith(activeLock.slice(0, -3))) return true;
          if (lock.endsWith('/**') && activeLock.startsWith(lock.slice(0, -3))) return true;
        }
        return false;
      });

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
The scheduler executes each batch sequentially, while tasks within a batch execute concurrently via `Promise.all`.
In `src/orchestration/blueprint.js`, `TASK_KEYS` is extended to include `'writeLocks'` and `'writeAllowlist'`.

---

### 8.2 Repair for Limitation L5 (`src/pro/universal-asset-normalizer.js`)

**Problem Observed:** Lines 152–174 contain an extra closing brace `}` and a broken, duplicated nested CSS block (`[observed]`).

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

## 9. Verification Matrix

| Target Engine / Repair | Verification Test File | Expected Result |
|---|---|---|
| `SpatialRTree` | `test/v2.6/spatial-rtree.test.js` | 100 random bounding boxes inserted; zero false negatives; collision tests pass. |
| `CssSelectorAst` | `test/v2.6/css-selector-ast.test.js` | Flags Test 4.5 (`>`) and Test 4.6 (`[attr="val"]`); allows self-styling. |
| `PngCodec` | `test/v2.6/png-codec.test.js` | Decompresses 8-bit RGBA PNG with 5 scanline filters; matches raw uncompressed buffer. |
| `SlugFontCompiler` | `test/v2.6/slug-font-compiler.test.js` | Extracts TTF glyph outlines; packs $N_B = 8$ band buffers. |
| DAG Write-Lock Scheduler | `test/v2.6/dag-scheduler-locks.test.js` | Conflicting write tasks run in successive batches; disjoint tasks run in parallel. |
| Asset Normalizer CSS | `test/v2.6/repairs-regression.test.js` | PostCSS parses output without syntax errors; Lenis classes unlock overflow. |
