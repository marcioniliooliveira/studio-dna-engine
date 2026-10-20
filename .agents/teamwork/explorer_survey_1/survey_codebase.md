# Codebase Survey & Dependency Audit: Studio DNA PRO v2.6

**Document ID:** `survey_codebase.md`  
**Author:** `explorer_survey_1` (teamwork_preview_explorer)  
**Parent Task:** `orchestrator_8` (`0182b98b-f0b8-4ba3-b638-72cd13600fd3`)  
**Date:** 2026-10-19  
**Status:** COMPLETE — Zero Implementation (Read-Only Investigation)  
**Truth Protocol:** Strictly labeled per `AGENTS.md` (`[observed]`, `[documented]`, `[inferred]`).

---

## 1. Executive Summary

This survey provides runtime-verified, file-by-file evidence across the existing `studio-dna-engine` repository to ground the Deep Research and Architectural Specification for Studio DNA PRO v2.6.

Key outcomes:
1. **Dependency Constraints:** Confirmed `node` runtime is `v24.15.0` `[observed]`. Confirmed `postcss` is installed (`^8.5.26`), while `opentype.js`, `rbush`, `postcss-selector-parser`, and `pngjs` are completely absent from `package.json` and `package-lock.json` `[observed]`. All core micro-engines must be zero-dependency pure JavaScript (Node.js 24+ CommonJS).
2. **Repairs Identified (L5, L7, L8):** Exact failure mechanisms, line numbers, and root causes isolated for `src/pro/universal-asset-normalizer.js` (corrupted CSS nesting at lines 152–174), `src/compiler/kinetic-grammar-schema.js` (regex blind spots on direct child combinators `>` and attribute selectors in `validateDonutScopeInvariants`), and `src/orchestration/dag-scheduler.js` (unconstrained concurrent execution without write-lock intersection checks).
3. **Pillars 1–5 Connection Points (L1, L6, L3, L2, Vault Layout):** Mapped exact integration surfaces across `src/core/cloner.js` (empty `sections/` directory), `src/components/WorkStage/` (hardcoded projects and tokens in `referenceData.ts`, unprojected proxy buttons in `WorkStage.tsx`), `src/constraints/contrast.js` (legacy WCAG 2.1 masquerading as APCA and hardcoded `ConstraintEngine`), `src/generators/hud-projector.js` (OP-XY hardcoded DOM selectors and fake APCA formula), and the `copias/` / `design-vault/` layout.

---

## 2. Dependency Audit & Zero-Dependency Lockfile Verification

### 2.1 Runtime Environment
- **Node.js Version:** `v24.15.0` (Verified via `node -v`) `[observed]`.
- **Module System:** CommonJS (`"type": "commonjs"` in `package.json:57`) `[observed]`.
- **Native Node 24 Capabilities Available:**
  - `node:sqlite` (`DatabaseSync` for ACID HUD state and WAL transaction logging) `[observed]`.
  - `node:zlib` (`inflateSync`, `deflateSync` for native PNG chunk decompression) `[observed]`.
  - `node:crypto` (`createHash`, `randomBytes`) `[observed]`.
  - `node:test` and `node:assert/strict` `[observed]`.

### 2.2 Installed Dependencies Inventory (`package.json`)
Lines 58–75 in `package.json` define:
```json
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.30.0",
    "@react-three/drei": "^9.99.0",
    "@react-three/fiber": "^8.15.16",
    "@types/three": "^0.161.2",
    "cheerio": "^1.2.0",
    "gsap": "^3.12.5",
    "playwright": "^1.41.0",
    "postcss": "^8.5.26",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.161.0",
    "vitest": "^5.0.5",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@playwright/test": "^1.41.0"
  }
```

### 2.3 Verification of Forbidden / Absent Packages in `package-lock.json`
Searched `package-lock.json` for external libraries commonly used for spatial indexing, font parsing, selector ASTs, and image decoding:
- **`opentype.js`:** 0 results in `package-lock.json` `[observed]`. Forbidden as external dependency.
- **`rbush`:** 0 results in `package-lock.json` `[observed]`. Forbidden as external dependency.
- **`postcss-selector-parser`:** 0 results in `package-lock.json` `[observed]`. Forbidden as external dependency.
- **`pngjs`:** 0 results in `package-lock.json` `[observed]`. Forbidden as external dependency.

### 2.4 Architectural Implication for v2.6 Zero-Dependency Micro-Engines
- `[documented]` Requirement R6 mandates:
  1. Pure JS 2D R-Tree matching the `RBush` API (`src/compiler/spatial-rtree.js`).
  2. Recursive PostCSS selector AST parser (`src/compiler/css-selector-ast.js`) utilizing installed `postcss` (`^8.5.26`) without `postcss-selector-parser`.
  3. Native PNG RGBA decoder (`src/qa/png-codec.js`) utilizing built-in `node:zlib` (`inflateSync` + 5 scanline reconstruction filters: None, Sub, Up, Average, Paeth).
  4. Binary TrueType font compiler (`src/assets3d/slug-font-compiler.js`) using native `DataView` over `.ttf` SFNT tables (`cmap`, `head`, `hhea`, `hmtx`, `loca`, `glyf`).

---

## 3. Deep Inspection of the 3 Repair Targets

### 3.1 Target 1: `src/pro/universal-asset-normalizer.js` (Limitation L5 — Corrupted CSS Block)
- **File:** `src/pro/universal-asset-normalizer.js` `[observed]`.
- **Method:** `static getUniversalUnlockCss()` (starts line 36) `[observed]`.
- **Faulty Code Section:** Lines 142–174:
```css
142:       /* 3. Prevenção de Bloqueio de Scroll por Classes de Preloader/Lenis mantendo position: sticky */
143:       html {
144:         overflow-x: clip !important;
145:         overflow-y: auto !important;
146:         height: auto !important;
147:       }
148:       body {
149:         overflow-x: clip !important;
150:         overflow-y: visible !important;
151:         height: auto !important;
152:       }
153:       }
154:       html.lenis-stopped, 
155:       body.lenis-stopped, 
156:       html.is-loading, 
157:       body.is-loading,
158:       body.no-scroll {
159:         overflow: auto !important;
160:         overflow-x: clip !important;
161:       /* 3. Prevenção de Bloqueio de Scroll por Classes de Preloader/Lenis mantendo position: sticky */
162:       html {
163:         overflow-x: clip !important;
164:         overflow-y: auto !important;
165:         height: auto !important;
166:       }
167:       body {
168:         overflow-x: clip !important;
169:         overflow-y: visible !important;
170:         height: auto !important;
171:       }
172:         height: auto !important;
173:       }
```

- **Root Cause Analysis:**
  1. `[observed]` Line 153 contains an orphaned closing brace `}` with no matching opening brace.
  2. `[observed]` Lines 154–158 open selector `html.lenis-stopped, ... {`. Immediately inside this ruleset, lines 161–171 re-declare `/* 3. Prevenção... */ html { ... } body { ... }` nested directly inside the outer rule block.
  3. `[observed]` Line 172 leaves a dangling declaration `height: auto !important;` before closing on line 173.
  4. `[inferred]` This occurred due to an accidental duplicate paste during a merge conflict resolution.
- **Impact:**
  - When injected into `<style id="universal-unlock-css">`, any standards-compliant CSS parser (such as PostCSS or browser CSSOM parser) throws a syntax error or discards subsequent rules (lines 175–200, which govern `.fixed`, `header`, `img`, `video`, and dark mode reveal states).
- **Exact Proposed Replacement Block:**
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

### 3.2 Target 2: `src/compiler/kinetic-grammar-schema.js` (Limitation L7 — Blind Spots in `validateDonutScopeInvariants`)
- **File:** `src/compiler/kinetic-grammar-schema.js` `[observed]`.
- **Function:** `validateDonutScopeInvariants(cssContent)` (lines 304–325) `[observed]`.
- **Existing Implementation:**
```javascript
304: function validateDonutScopeInvariants(cssContent) {
305:   const violations = [];
306:   const cleanCss = (cssContent || '').replace(/\/\*[\s\S]*?\*\//g, '');
307: 
308:   // Check for piercing selectors: e.g. [data-kinetic-slot] .child or [data-kinetic-slot] > *
309:   const piercingPattern = /\[data-kinetic-slot\]\s+[a-zA-Z0-9_.*#\-[\]]+/g;
310:   let match;
311:   while ((match = piercingPattern.exec(cleanCss)) !== null) {
312:     violations.push(`Donut piercing violation: selector '${match[0]}' penetrates slot boundary`);
313:   }
314: 
315:   // Check for global selector leakages attempting to style slots without scope
316:   const slotChildOverride = /\.kinetic-stage\s+\[data-kinetic-slot\]\s+[a-zA-Z0-9_.*#\-[\]]+/g;
317:   while ((match = slotChildOverride.exec(cssContent)) !== null) {
318:     violations.push(`Donut boundary override violation: '${match[0]}' breaches slot isolation`);
319:   }
320: 
321:   return {
322:     compliant: violations.length === 0,
323:     violations
324:   };
325: }
```

- **Observed Vulnerability Proof in `test/challenger-adversarial-m5.test.js`:**
  - `[observed]` **Test 4.5 (lines 608–621):**
    ```javascript
    test('4.5 Validator Blind Spot 1: Direct child combinator (>) is NOT caught by current validator regex', () => {
      const childAttackCss = `
        [data-kinetic-slot] > h1 {
          transform: rotate(45deg);
        }
      `;
      const validation = validateDonutScopeInvariants(childAttackCss);
      assert.equal(validation.compliant, true, 'CONFIRMED VULNERABILITY: validator blind spot on child combinator (>)');
    });
    ```
    The regex character class `[a-zA-Z0-9_.*#\-[\]]+` does NOT contain `>`. The regex fails to match `[data-kinetic-slot] > h1`, returning `compliant: true` despite a direct child boundary breach!
  - `[observed]` **Test 4.6 (lines 623–635):**
    ```javascript
    test('4.6 Validator Blind Spot 2: Attribute value selector ([data-kinetic-slot="val"] h1) is NOT caught', () => {
      const attrAttackCss = `
        [data-kinetic-slot="hero-title"] h1 {
          color: red !important;
        }
      `;
      const validation = validateDonutScopeInvariants(attrAttackCss);
      assert.equal(validation.compliant, true, 'CONFIRMED VULNERABILITY: validator blind spot on attribute values');
    });
    ```
    The regex expects literal `\[data-kinetic-slot\]` followed by whitespace `\s+`. When an attribute value selector is used (e.g. `[data-kinetic-slot="hero-title"]`), it does not match `\[data-kinetic-slot\]\s+`, allowing malicious child styles to penetrate completely unflagged!
  - `[observed]` **Test 4.7 (lines 637–645):**
    ```javascript
    test('4.7 Valid slot self-styling is permitted and does not penetrate children', () => {
      const legitimateCss = `
        [data-kinetic-slot] { all: unset; display: block; }
        [data-kinetic-slot][data-slot-type="heading"] { font-size: 2rem; }
      `;
      const validation = validateDonutScopeInvariants(legitimateCss);
      assert.equal(validation.compliant, true);
    });
    ```
    Self-styling of the boundary node itself (`[data-kinetic-slot]` or compound `[data-kinetic-slot][data-slot-type="..."]`) must remain legal.
- **Architectural Solution for v2.6:**
  - Build `src/compiler/css-selector-ast.js` using `postcss` to parse CSS rules into selector tokens.
  - Implement recursive selector analysis:
    - Identify tokens matching boundary predicate: `[data-kinetic-slot]` or `[data-kinetic-slot="..."]`.
    - Detect any downstream combinators (` `, `>`, `+`, `~`, `||`) followed by any compound selector targeting child/descendant nodes.
    - Flag as violation if any descendant target is present while permitting self-selectors (`[data-kinetic-slot]`, `[data-kinetic-slot="x"]`, `[data-kinetic-slot].active`).
  - Refactor `validateDonutScopeInvariants()` to use this AST parser, eliminating the regex blind spots and turning Tests 4.5 and 4.6 from "confirmed vulnerability passes" into active violation guards.

---

### 3.3 Target 3: `src/orchestration/dag-scheduler.js` (Limitation L8 — Write-Lock Intersection Algorithm)
- **File:** `src/orchestration/dag-scheduler.js` `[observed]`.
- **Function:** `scheduleBlueprint(source, executeTask, options)` `[observed]`.
- **Current Scheduling Loop (lines 20–33):**
```javascript
20:   while (pending.size) {
21:     if (completed.length >= maxTasks) {
22:       const error = new Error('DAG task budget exhausted');
23:       error.code = 'DAG_BUDGET_EXCEEDED';
24:       throw error;
25:     }
26:     const ready = [...pending].filter(id => (tasks.get(id).dependsOn || []).every(dep => completed.includes(dep))).sort();
27:     if (!ready.length) {
28:       const error = new Error('DAG has unresolved dependencies');
29:       error.code = 'DAG_BLOCKED';
30:       throw error;
31:     }
32:     const batch = ready.map(id => tasks.get(id));
33:     const results = await Promise.all(batch.map(async task => { ...
```

- **Identified Failure Mode:**
  1. `[observed]` `ready` selects ALL pending tasks whose `dependsOn` lists are satisfied.
  2. `[observed]` `batch = ready.map(id => tasks.get(id))` places all ready tasks into a single concurrent batch.
  3. `[observed]` `Promise.all` executes every task in the batch concurrently.
  4. `[observed]` There is ZERO check on whether tasks write to overlapping file systems, workspaces, or shared output resources!
- **Specification Contract in `design-quality-orchestrator-roadmap.md`:**
  - Line 197 `[documented]`:
    > *"o scheduler executa em paralelo somente tarefas read-only ou tarefas com `writeAllowlist` disjuntas; `builderActorId !== verifierActorId` é obrigatório."*
  - Line 199 `[documented]`:
    > *"Criar teste que fornece dois nós prontos com escrita em `clientes/a/site/**`; o segundo não pode iniciar antes do primeiro terminar."*
  - Line 200 `[documented]`:
    > *"Criar teste que fornece nós com escritas disjuntas em `runs/x/a.json` e `runs/x/b.json`; ambos devem iniciar no mesmo batch."*
- **Discovered Schema Conflict in `src/orchestration/blueprint.js`:**
  - `[observed]` In `src/orchestration/blueprint.js` lines 5–7:
    ```javascript
    const TASK_KEYS = new Set(['id', 'dependsOn', 'budget', 'allowedTools', 'allowedGates', 'input', 'actorId', 'role', 'requiredVerifierRole']);
    ```
  - `[inferred]` If a task in a blueprint provides `writeAllowlist` at the root task level, `validateBlueprint` will reject it: `blueprint.tasks[0] contains unknown field: writeAllowlist`.
  - Therefore, `TASK_KEYS` must be extended to include `'writeAllowlist'`, or `writeAllowlist` must be recognized both on `task.writeAllowlist` and inside `task.input.writeAllowlist` or `task.writes`.
- **Write-Lock Intersection Logic Required:**
  Two paths $P_1, P_2$ intersect if:
  1. Exact match: $P_1 = P_2$.
  2. Terminal glob containment: if $P_1$ ends in `/**`, and $P_2$ starts with $P_1 \setminus \text{'/**'}$.
  3. Reciprocal glob containment: if $P_2$ ends in `/**`, and $P_1$ starts with $P_2 \setminus \text{'/**'}$.
  4. Read-only tasks: tasks with empty `writeAllowlist` (or `mutatesWorkspace === false`) do not conflict with each other or with disjoint writers.
  The batch partitioning must select a maximal independent set of non-conflicting tasks for the concurrent `Promise.all`, leaving overlapping tasks in `pending` for subsequent batches.

---

## 4. Inspection of Existing Pillars 1–5 Connection Points

### 4.1 Connection Point 1: `src/core/cloner.js` (Limitation L1 — Empty `sections/` Directory)
- **File:** `src/core/cloner.js` `[observed]`.
- **Line 160:** `const sectionsDir = path.join(siteFolder, 'sections');` `[observed]`.
- **Line 165:** `fs.mkdirSync(sectionsDir, { recursive: true });` `[observed]`.
- **Analysis:**
  - `fs.mkdirSync(sectionsDir, { recursive: true })` creates `sections/` on disk unconditionally before the page even opens.
  - In lines 440–472, `getTopLevelSections()` inspects `header, nav, section, footer, main, article`, then builder sections, then kids of `#root`/`#__next`.
  - For sites with non-semantic div structures, canvas-only viewports, or SPA wrappers where child bounding boxes are $< 50\text{px}$, `result.sectionData` is evaluated as `[]`.
  - Lines 648–670 (`result.sectionData.forEach(...)`) never execute.
  - Result: `sections/` remains on disk as a ghost/empty directory (Limitation L1).
  - Furthermore, when `sectionData` is written, line 656–660 shows it writes a complete HTML document that references ALL stylesheets (`${cssLinksHtml}`), the entire global `<style>${result.inlineStyles}</style>`, and all scripts! It has no style scoping, no token extraction, and no kinetic isolation.
- **Connection to Pillar 6 (Scene-to-Capsule Subtree Slicing):**
  - Resolves L1 by replacing cloner's heuristic `document.querySelectorAll` with a deterministic CDP extraction pipeline:
    1. CDP CSS subtree extraction (`DOM.getDocument`, `CSS.getMatchedStylesForNode`, `CSS.getComputedStyleForNode`).
    2. Inherited custom property closure (resolving free CSS variables and injecting them into `:scope`).
    3. AST ancestor prefix pruning and `@scope ([data-dna-capsule="<slug>"]) to ([data-kinetic-slot])` generation.
    4. Slicing into self-contained capsules in `design-vault/capsules/<capsuleSlug>/`.

---

### 4.2 Connection Point 2: `src/components/WorkStage/` (Limitation L6 — Hardcoded References, Uniforms & Portals)
- **Directory:** `src/components/WorkStage/` `[observed]`.
- **Files Inspected:**
  1. `referenceData.ts`:
     - Lines 14–28: `BRAND_TOKENS` hardcodes Marcionilio Oliveira's specific hex colors (`#262220`, `#FAF9F6`, `#3A3632`, `#b8b3ac`, etc.) `[observed]`.
     - Lines 33–82: `REFERENCE_PROJECTS` hardcodes 4 specific client projects (`evo-money`, `plant-tag`, `swisshaus`, `betahaus`) with hardcoded webp thumbnails `[observed]`.
     - Lines 84–90: `JESPER_CANONICAL_ASSETS` hardcodes specific local asset paths `[observed]`.
  2. `WorkStage.tsx`:
     - Lines 610–696: Renders DOM proxy buttons with static CSS bounds (`width: '28vw'`, `height: '52vh'`, `gap: '3vw'`) in a fixed flexbox container, instead of projecting from the 3D transformed card corners `[observed]`.
     - Lines 83–130: Initializes `window.__WORK_STAGE__` with an ad-hoc mutable object lacking formal schema validation `[observed]`.
     - Lines 133–195: Attaches direct `wheel` and `touch` listeners onto `window`, causing interaction conflicts with Lenis and horizontal scroll rails `[observed]`.
     - Lines 608–697 & 700–780: Mounts DOM portals directly to `document.body` or `document.getElementById('work-detail-panel-root')` `[observed]`.
- **Connection to Pillar 7 (Universal `<dna-capsule>` Envelope, Sibling Portal Mount & UniversalScrollBus):**
  - Resolves L6 by:
    1. Replacing hardcoded `REFERENCE_PROJECTS` with declarative slot hydration (`data-capsule-slots`).
    2. Formalizing the Five Physical Laws of `<dna-capsule>` (Sibling Portal Mount with `[data-capsule-anchor]` in normal flow + `[data-capsule-stage]` in fixed inset 0 with dynamic `clip-path: inset(...)`).
    3. Replacing window wheel interception with `UniversalScrollBus` (piecewise affine phase mapping converting scroll to normalized signals $(p_{\text{portal}}, p_{\text{ribbon}}, v_k, \phi_k)$).
    4. Implementing sub-pixel NDC-to-Viewport matrix projection ($\mathbf{M}_{\text{VP}} = \mathbf{P} \cdot \mathbf{V}$) to position proxy buttons with bounding box error $\le 0.5\text{px}$.

---

### 4.3 Connection Point 3: `src/constraints/contrast.js` & `engine.js` (Limitation L3 — Legacy WCAG & Dynamic Constraints)
- **File:** `src/constraints/contrast.js` `[observed]`.
- **Implementation Inspection:**
  - Line 39: Implements legacy WCAG 2.1 formula: `(l1 + 0.05) / (l2 + 0.05)` `[observed]`.
  - Line 37: Hardcodes black anodized aluminum product luminance `productL = 0.012` `[observed]`.
  - Line 46: Hardcodes glare cutoff `bgL > 0.82` `[observed]`.
  - Lacks APCA power equations, spatial frequency models, and contrast polarity distinctions `[observed]`.
- **File:** `src/constraints/engine.js` `[observed]`.
  - Line 17: `this.constraints = dnaIr?.constraints || [];` is parsed but never dynamically iterated `[observed]`.
  - Lines 25–83: Contains six hardcoded `if (resolvedDelta['hero....'])` branches `[observed]`.
  - Cannot evaluate arbitrary constraint graphs or non-hero sections `[observed]`.
- **Connection to Pillars 9 & 10 (APCA Contrast, OKLCH Perceptual Space & Fluid Typography):**
  - Resolves L3 by:
    1. Replacing legacy WCAG 2.1 with complete APCA `0.0.98G-4g` engine (`revBG=0.65`, `revTXT=0.62`, `blkThrs=0.022`, `blkClmp=1.414`).
    2. Bidirectional $s\text{RGB} \leftrightarrow \text{OKLCH}$ matrix transformations preserving perceptual lightness $\Delta L$.
    3. Refactoring `ConstraintEngine` to traverse arbitrary constraint graphs declared in `dnaIr.constraints`.

---

### 4.4 Connection Point 4: `src/generators/hud-projector.js` (Limitation L2 — Hardcoded OP-XY Presets & Faux APCA)
- **File:** `src/generators/hud-projector.js` `[observed]`.
- **Implementation Inspection:**
  - **Faux APCA Calculation (lines 1375–1388):**
    ```javascript
    const lum1 = 0.2126 * pBg.r + 0.7152 * pBg.g + 0.0722 * pBg.b;
    const lum2 = 0.2126 * pFg.r + 0.7152 * pFg.g + 0.0722 * pFg.b;
    const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
    const lc = Math.round(ratio * 10);
    badge.textContent = 'APCA Lc ' + lc + ' ✓';
    ```
    `[observed]` This is NOT APCA! It computes the WCAG 2.1 contrast ratio and multiplies by 10, branding the badge as "APCA Lc".
  - **Hardcoded Teenage Engineering OP-XY Selectors:**
    - Line 1422–1425:
      ```javascript
      if (e.target.closest('#hero .wm h1, #nav .wm')) targetParam = 'hero.copy.brand';
      else if (e.target.closest('#hero .claim')) targetParam = 'hero.copy.claim';
      else if (e.target.closest('#strip .stack')) targetParam = 'strip.copy.caption';
      else if (e.target.closest('#strip h2')) targetParam = 'strip.copy.headline';
      ```
    - Line 1454–1455: `(id === 'hero' && ...) || (id === 'strip' && ...)` `[observed]`.
    - Line 1462: `document.querySelectorAll('#hero, #strip, #macro, #engines, #seq, #connect, #flip, #close')` `[observed]`.
    - Line 1489: `if (window.OPXY && window.OPXY.backdrop && window.OPXY.backdrop.bars)` `[observed]`.
    - Line 1530: `document.querySelectorAll('.dna-gooey-reveal, #hero .claim, #engines h2, #seq h2, #close h2')` `[observed]`.
- **Connection to Pillar 11 (Dual-Environment Live Tweaks, HUD Projector & Section MCP Server):**
  - Resolves L2 by:
    1. Fully removing OP-XY selectors and hardcoded three.js object references.
    2. Implementing framework-agnostic `webgl-uniform` and `scroll-bridge` adapters driven strictly by `dna-ir.json`.
    3. Rendering legitimate APCA `0.0.98G-4g` contrast badges.
    4. Establishing an ACID commit pipeline backed by `node:sqlite` WAL transactions.

---

### 4.5 Connection Point 5: Layout of `copias/` and Structure of `design-vault/`
- **`copias/` Layout `[observed]`:**
  - Contains 35 cloned site directories (e.g. `jesperlandberg-com`, `op-xy-76-aura-build`, `khanhnguyen-design`, `elyse-residence-dev-webflow-io`, `apple-com`).
  - Standard internal directory structure:
    ```
    copias/<slug>/
    ├── site/
    │   ├── index.html
    │   ├── assets/
    │   ├── sections/        <-- Often empty or full-document copies (L1)
    │   └── styles/
    ├── assets-manifest.json
    └── ...
    ```
  - `[documented]` Under `AGENTS.md`, `copias/` is **strictly immutable reference evidence**. No tools or processes may modify or write into `copias/`.
- **`design-vault/` Structure `[observed]`:**
  - Currently contains:
    - `00-governance/` (anti-slop rules)
    - `01-motion-physics/` (`easings.json`)
    - `02-3d-experiments/` (`cylindrical-spinner.js`)
    - `04-typography/` (`curated-pairings.json`)
    - Template folders: `bymonolog-com/`, `elyse-residence-dev-webflow-io/`, `khanhnguyen-design/`, `op-xy-76-aura-build/`
    - `INDEX.json` (Vault tier registry)
  - `[observed]` The directory `design-vault/capsules/` **does not exist yet**.
- **Connection to Pillars 6 and 11:**
  - Pillar 6 establishes `design-vault/capsules/<capsuleSlug>/` containing extracted modular capsules (`scoped.styles.css`, `template.html`, `dna-ir.json`, `assets/`, `manifest.json`).
  - Pillar 11 provides MCP tools (`extract_section_capsule`, `list_client_sections`, `mount_vault_capsule`) and MCP resources (`vault://capsules`, `vault://capsules/{slug}/manifest`) that expose these capsules to external AI agents.

---

## 5. Synthesis: Traceability Matrix (Pillars 1–5 vs Pillars 6–11)

| Area / Limitation | Existing Baseline (Observed) | Target Pillar in v2.6 | Resolution & Architectural Link |
|---|---|---|---|
| **L1: Cloner Empty `sections/`** | `src/core/cloner.js:165` unconditionally `mkdirSync`; non-semantic sites leave empty folder | **Pillar 6:** Scene-to-Capsule Subtree Slicing | Closed CDP CSS extraction + Custom property closure into `design-vault/capsules/<capsuleSlug>/` |
| **L2: HUD OP-XY Presets** | `src/generators/hud-projector.js:1454-1530` hardcodes OP-XY DOM IDs and `window.OPXY` | **Pillar 11:** Dual HUD & Section MCP Server | Agnostic HUD projector driven strictly by `dna-ir.json` parameters + `node:sqlite` WAL |
| **L3: Legacy WCAG Contrast** | `src/constraints/contrast.js:39` uses WCAG 2.1; `hud-projector.js:1384` multiplies by 10 | **Pillars 9 & 10:** APCA & OKLCH Color Space | Mathematical APCA `0.0.98G-4g` engine + OKLCH relational palette projection |
| **L4: Static Typography & Color** | `src/components/WorkStage/referenceData.ts` hardcodes fonts & hex colors | **Pillars 9 & 10:** Fluid Typography & OKLCH | Dynamic `clamp(S_min, beta*vw + gamma*px, S_max)` with lexical expansion damping $\kappa_{\text{copy}}$ |
| **L5: Malformed CSS in Normalizer** | `src/pro/universal-asset-normalizer.js:152-174` contains duplicate nested rules & stray braces | **Pillar 11 & Micro-Engine Repair** | Clean replacement ruleset restoring valid CSSOM parsing |
| **L6: Hardcoded WorkStage** | `src/components/WorkStage/WorkStage.tsx` hardcodes 4 projects, rough proxies, and window wheel | **Pillar 7:** Universal `<dna-capsule>` & ScrollBus | Five physical laws of `<dna-capsule>`, sibling portal mount, sub-pixel NDC projection, and `UniversalScrollBus` |
| **L7: Donut Scope Blind Spots** | `src/compiler/kinetic-grammar-schema.js:309` regex fails on `>` (Test 4.5) and `[attr="val"]` (Test 4.6) | **Pillar 6 & Micro-Engine R6.2** | `src/compiler/css-selector-ast.js` recursive AST parser over `postcss` enforcing boundary invariants |
| **L8: DAG Scheduler Write-Locks** | `src/orchestration/dag-scheduler.js:33` runs all ready tasks concurrently without write checks | **Micro-Engine R6.5 & Blueprint** | Write-lock intersection algorithm with glob containment partitioning batches by disjoint write sets |
| **L9: 62 Throwaway Scripts** | Ad-hoc scripts under `scripts/` created for single-use validations | **Pillar 11:** Section MCP Server | Unified STDIO/HTTP MCP tools & resources backed by SQLite WAL database |
| **Zero-Dependency Guarantee** | `package.json` lacks `rbush`, `opentype.js`, `postcss-selector-parser`, `pngjs` | **Micro-Engines R6.1–R6.4** | Pure JS R-Tree, PostCSS selector AST parser, native zlib PNG decoder, and binary TTF font compiler |

---

## 6. Verification and Readiness Assessment

1. **Syntax Integrity of Existing Codebase:** All observed files parse and load under Node.js 24 without syntax errors except the isolated CSS string literal in `universal-asset-normalizer.js`.
2. **Test Baseline:** Existing unit and adversarial test suites (`test/m1-cdp-decompiler.test.js`, `test/challenger-adversarial-m5.test.js`, `test/dag-scheduler.test.js`, `test/importmap-and-resilience-normalizer.test.js`) reliably reproduce both passing baselines and documented vulnerabilities.
3. **No Uninstalled Packages Needed:** The architectural path forward requires ZERO new `npm install` packages, fulfilling the core constraint of the v2.6 specification.

---
*Report certified by `explorer_survey_1` on 2026-10-19.*
