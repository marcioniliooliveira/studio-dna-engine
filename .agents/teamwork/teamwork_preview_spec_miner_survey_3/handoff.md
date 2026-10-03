# Specification & Acceptance Criteria Mining Report

**Agent**: Specification Miner (Survey Step 0)  
**Working Directory**: `C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_spec_miner_survey_3`  
**Authoritative Sources**:
1. `C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md`
2. `C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_spec_miner_survey_3\DISPATCH.md`
3. Repository Codebase: `src/qa/`, `src/core/`, `src/pro/`, `src/pipeline/`, `src/constraints/`, `src/generators/`, `test/`, `design-vault/`, `reactbitspremium/`

---

## 1. Executive Summary

This report establishes the authoritative, verified specification and acceptance criteria framework derived directly from `ORIGINAL_REQUEST.md` and confirmed against the implementation reality of `studio-dna-engine` (v2.0.0).

The system is a high-fidelity front-end generation and transmutation engine that ingests reference URLs (Awwwards/Godly) alongside client brand specifications. Its mission is to deterministically produce 3D, kinetic web applications with zero layout defects, zero aesthetic degradation (anti-slop), guaranteed continuous 60fps rendering fidelity on desktop and mobile devices, and dual compilation targets: ultra-fast static HTML with CSS `@scope` for Edge CDNs, and Next.js 15 App Router React Server Components (RSC) with Client Islands.

---

## 2. Formal Functional Requirements (R1 – R4)

### R1. Decompilador Semântico de Referências Web
- **Definition & Objective**:
  Automated pipeline that ingests an arbitrary high-tech reference URL, connects via the Chrome DevTools Protocol (CDP) in a headless Chromium instance, intercepts kinetic timelines and runtime event listeners directly from browser memory, and extracts a sanitized, dependency-free semantic HTML/CSS/asset skeleton devoid of analytics, telemetry, or external tracker scripts.
- **Strict Boundaries**:
  - *Ingestion Scope*: Accepts standard HTTP/HTTPS URLs. Runs in isolated Chromium browser contexts with `--disable-web-security` and origin uncoupling to inspect dynamic DOM structures.
  - *CDP Memory Interception*:
    - Listens to CDP domains: `DOM`, `DOMDebugger`, `Runtime`, `Network`.
    - Maps all active DOM listeners (`mousemove`, `pointermove`, `scroll`, `wheel`, `click`) via `DOMDebugger.getEventListeners`.
    - Sniffs active WebGL/Canvas contexts by hooking `HTMLCanvasElement.prototype.getContext` and `OffscreenCanvas.prototype.getContext` to enforce `preserveDrawingBuffer = true`.
    - Captures in-memory GLSL shaders (vertex and fragment) via hooked `WebGLRenderingContext.prototype.shaderSource`.
    - Traps ephemeral in-memory 3D models and blobs created via `URL.createObjectURL`.
    - Deserializes GSAP timelines via `window.ScrollTrigger.getAll()` (trigger element, start, end, scrub, pin, toggleActions) and `window.gsap.globalTimeline.getChildren()` (tweens, durations, eases, stagger, coordinate deltas).
  - *Sanitization & Neutralization*:
    - Blocks and strips tracking and telemetry domains (`google-analytics.com`, `googletagmanager.com`, `hotjar.com`, `connect.facebook.net`, `clarity.ms`, `segment.io`, `mixpanel.com`, `amplitude.com`, `fullstory.com`).
    - Strips preloader curtain traps (`.preloader`, `.loader`, `[data-curtain]`, `#transition-overlay`) to prevent blackscreen initialization lockups.
    - Neutralizes hostile overflow (`overflow: hidden` on ancestors) to preserve standard `position: sticky`.
    - Rewrites remote CDN URLs to relative local disk paths (`./assets/vendor/...`) and updates `<script type="importmap">`.
- **Expected Inputs**:
  - `url`: Valid HTTP/HTTPS URL string.
  - `mode`: Extraction mode (`'all' | 'clone' | 'dna' | 'ui'`).
- **Expected Outputs**:
  - `skeleton.html`: Sanitized, tracker-free DOM structure with standardized CSS classes and semantic tags.
  - `tokens.json`: Compiled Design DNA tokens (color palette, typography scales, spacing, shadows, easing curves).
  - `assets/`: Localized bundle containing images, fonts, 3D models (`.glb`/`.gltf`), audio, and WebAssembly decoders.
  - `dna-ir.json` / `timelines.json`: Deserialized kinetic timelines, scroll triggers, and capability graph.
- **Error Behavior**:
  - Target URL unreachable or non-200 HTTP status $\to$ Terminate with structured HTTP error code and message; leave workspace unmutated.
  - Memory timeout during CDP handshake ($> 30\text{s}$) $\to$ Log failed probe and trigger fallback recovery using static Cheerio scrape.

---

### R2. Extrator de Trajetória Cinética & Âncoras Espaciais Dinâmicas
- **Definition & Objective**:
  Decoupling motion engine that analyzes media sequences or 3D real-time scenes, extracts the continuous orbital camera trajectory function $\vec{C}(s)$, and projects 3D spatial points of interest onto 2D HTML coordinates, dynamically anchoring technical callout lines, annotations, and badges during inertial scrolling.
- **Strict Boundaries**:
  - *Camera Trajectory Function $\vec{C}(s)$*:
    - Parameterized by normalized scroll progress $s \in [0, 1]$ or scroll offset $y \in [0, Y_{\max}]$.
    - State vector: $\vec{C}(s) = \left( \vec{P}_{\text{cam}}(s), \vec{T}_{\text{target}}(s), \text{FOV}(s), \theta_{\text{roll}}(s) \right) \in \mathbb{R}^3 \times \mathbb{R}^3 \times \mathbb{R} \times \mathbb{R}$.
    - Interpolated smoothly between authored key stations (e.g., Hero perspective $\to$ Top-down overview $\to$ Macro exploded view) using critically damped following or Hermite splines to hide stepping artifacts.
  - *Optical Projection & Spatial Anchoring*:
    - Computes 3D world coordinate $\vec{P}_{\text{world}}$ of product interest points (e.g., buttons, ports, volume encoders, hinge mechanisms).
    - Transforms $\vec{P}_{\text{world}}$ to Normalized Device Coordinates (NDC) using the camera view and projection matrices:
      $$\vec{P}_{\text{ndc}} = \mathbf{M}_{\text{proj}}(s) \cdot \mathbf{M}_{\text{view}}(s) \cdot \begin{pmatrix} \vec{P}_{\text{world}} \\ 1 \end{pmatrix}$$
    - Converts NDC to screen pixels:
      $$X_{\text{screen}} = \left( \frac{\vec{P}_{\text{ndc}}.x + 1}{2} \right) \cdot W_{\text{viewport}}, \quad Y_{\text{screen}} = \left( \frac{1 - \vec{P}_{\text{ndc}}.y}{2} \right) \cdot H_{\text{viewport}}$$
    - Anchors SVG `<line>` / `<path>` elements from $(X_{\text{screen}}, Y_{\text{screen}})$ to the corresponding HTML annotation container during RAF-driven scroll updates.
  - *Viewport & Accessibility Constraint Adaptations*:
    - **C3 Viewport Adaptation**: In portrait viewports ($W/H < 1.0$, such as mobile 390x844), automatically compensates by expanding base FOV ($24^\circ \to 38^\circ$), pulling camera distance back by $1.35\times$, and applying downward safe-area translation (+0.15m).
    - **C4 Reduced Motion Adaptation**: When `prefers-reduced-motion: true`, overrides continuous trajectory with instant camera snapping (`damp: 1.0`, `duration: 0.01`), disables background noise/drift shaders, and disables spring translations.
- **Expected Inputs**:
  - Real-time 3D scene (Three.js/WebGL) or pre-rendered frame sequence.
  - Scroll telemetry stream from inertial driver (Lenis / ScrollTrigger).
  - Authored interest point metadata (node names or 3D coordinates).
- **Expected Outputs**:
  - Continuous trajectory evaluator function `camera.update(scrollY)`.
  - Screen coordinate telemetry stream $(X, Y)$ for each anchored interest point.
  - Dynamic SVG leader line overlay markup synchronized at 60fps.
- **Error Behavior**:
  - Target point occluded (behind camera $\vec{P}_{\text{ndc}}.z > 1.0$ or facing away from view direction) $\to$ Smoothly fade line opacity to 0 (`opacity = 0`); do not produce negative coordinates or DOM reflows.
  - WebGL context lost $\to$ Gracefully fallback to high-resolution 2D image sequence with static spatial anchors.

---

### R3. Pipeline de Assets 3D Ultraleves para Mobile
- **Definition & Objective**:
  Automated geometric optimization and compression conveyor that ingests high-poly CAD models or photographic product scans and outputs production 3D assets with total file size under 3MB and GPU VRAM footprint under 4MB, strictly compatible with WebKit / Mobile Safari GPU and memory limits.
- **Strict Boundaries**:
  - *Disk Size Constraint*: Complete 3D model asset bundle (geometry, materials, textures, animations) $\le 3.0\text{MB}$ ($3,145,728\text{ bytes}$).
  - *Mesh VRAM Footprint*: Active GPU buffer allocation for vertex attributes, indices, and uniform buffers $\le 4.0\text{MB}$ ($4,194,304\text{ bytes}$).
  - *Geometry Processing*:
    - Surface mesh decimation and normal simplification preserving silhouette curvature.
    - Draco WebAssembly geometry compression (`draco_decoder.wasm`, `positionBits: 14`, `normalBits: 10`, `texCoordBits: 12`).
    - Quantization and index buffer strip optimization via Meshopt.
  - *Texture Optimization & Compression*:
    - Format: KTX2 / Basis Universal GPU compressed textures (ASTC for iOS WebKit; ETC2/BC7 for Desktop).
    - Resolution limit: Max texture size $1024 \times 1024\text{px}$ on mobile; $2048 \times 2048\text{px}$ on desktop.
    - Elimination of uncompressed PNG/JPG textures inside GLB containers.
  - *Safari iOS / WebKit Safety*:
    - WebKit iOS imposes strict per-tab memory limits (terminating tabs exceeding 384MB–512MB total VRAM).
    - The pipeline enforces cumulative scene VRAM budget $\le 384\text{MB}$ under peak draw call conditions.
- **Expected Inputs**:
  - Uncompressed 3D model file (`.glb`, `.gltf`, `.fbx`, `.obj`) or multi-view product photogrammetry.
  - Target optimization profile (`mobile-safari` | `desktop-high`).
- **Expected Outputs**:
  - Optimized `.glb` asset with embedded Draco compression ($< 3\text{MB}$).
  - VRAM utilization audit report certifying geometry buffer $< 4\text{MB}$ and total scene $< 384\text{MB}$.
  - Asset manifest entry with SHA-256 integrity hash.
- **Error Behavior**:
  - Model cannot be decimated below 3MB without silhouette distortion $> 2\%$ $\to$ Emit decimation warning, split into multi-LOD tiers (`lod-0`, `lod-1`), and serve low-poly base asset on mobile viewports.
  - Draco decoder loading failure $\to$ Fallback to uncompressed LOD-1 mesh; log warning in telemetry.

---

### R4. Gramática de Composição Cinética & Compilador Dual-Stack
- **Definition & Objective**:
  A modular architectural grammar that replaces rigid fixed page templates with decoupled, self-contained kinetic primitives encapsulated by native CSS `@scope`, accompanied by a dual-stack compiler exporting both ultra-fast static HTML for Edge CDNs and Next.js 15 App Router React Server Components (RSC) with Client Islands.
- **Strict Boundaries**:
  - *Modular Kinetic Primitives*:
    - Discrete composable building blocks: Hero Cinematic Stage, Horizontal Pin Rail, Interactive Bento Cards, 3D Product Canvas, Sticky Storytelling Chapters, Technical Spec Accordion, Interactive Floating Dock.
    - Each primitive is isolated and declarative; primitives communicate only via standard DOM custom events or data-attributes.
  - *Style Encapsulation via CSS `@scope`*:
    - Every primitive is enclosed in native `@scope (.primitive-selector)` rules, guaranteeing zero style bleed into sibling components or global selectors without needing runtime CSS-in-JS libraries.
    - Universal W3C baseline reset: `html, body { overflow-x: clip !important; width: 100% !important; max-width: 100vw !important; }`.
  - *Dual-Stack Output Targets*:
    - **Target 1: Static Edge CDN (`dist/edge-cdn/`)**:
      - Single-file or modular static HTML5/ESM distribution.
      - HTTP 206 Partial Content video streaming and self-healing local asset proxy.
      - Zero client-side JS hydration delay (instant First Contentful Paint $< 0.4\text{s}$).
    - **Target 2: Next.js 15 App Router (`dist/nextjs15/`)**:
      - Directory layout conforming to Next.js 15 App Router conventions (`app/page.tsx`, `app/layout.tsx`, `components/`).
      - React Server Components (RSC) for layout, metadata, SEO, and static typography.
      - Explicit Client Islands (`'use client'`) for interactive kinetic components (Three.js canvas, GSAP ScrollTrigger controllers, interactive sliders, Lenis smooth scroll provider).
  - *Zero Autoregressive Slop Enforcement*:
    - No unstructured AI string generation of HTML or CSS.
    - All code synthesis is performed through deterministic AST transformers (Cheerio AST manipulation, template AST cloning, typed Zod schemas) and strict JSON contracts (`composition-spec.json`, `DNA.md`).
- **Expected Inputs**:
  - Composition specification (`composition-spec.json`).
  - Client Brand Spec (`brand-spec.json`) and verified content slots (`content-slots.json`).
  - Target stack configuration (`target: 'edge-cdn' | 'nextjs15' | 'dual'`).
- **Expected Outputs**:
  - Compiled Edge CDN directory: `index.html`, scoped CSS files, localized assets.
  - Compiled Next.js 15 project: TypeScript components, typed props, RSC page wrapper, Client Islands.
  - Dual-stack consistency certification proving identical visual and layout fidelity across both outputs.
- **Error Behavior**:
  - Slot missing from client specification $\to$ Strict error in build gate; do not emit raw fallback placeholders like `{SLOT_...}` or lorem ipsum.
  - CSS `@scope` syntax unsupported in target environment $\to$ Transpiler automatically falls back to scoped attribute selectors (`[data-scope="..."]`) without breaking styling.

---

## 3. Authoritative Acceptance Criteria & Verification Matrix

### Criterion 1: Integridade Física & Ausência de Colisões (Physical Integrity)

| ID | Requirement | Formal Threshold | Verification Metric | Validation Procedure | Failure Condition |
|---|---|---|---|---|---|
| **AC-1.1** | AABB Text Collision | **AABB Overlap = 0px²** in 100% of scroll frames | $\text{OverlapArea} = \max(0, \Delta x) \cdot \max(0, \Delta y)$ for all non-inert visible text pairs | Playwright CDP frame-by-frame sampling ($y \in [0, Y_{\max}]$, step $\le 50\text{px}$) across viewports: Desktop ($1440 \times 900$) and Mobile ($390 \times 844$) via `KineticTelemetryExtractor`. | Any undeclared text pair with $\text{OverlapArea} > 0\text{px}^2$ (calibrated $> 20\text{px}^2$ in software rasterizer). |
| **AC-1.2** | Horizontal Scroll Bleeding | **Zero Bleed**: $\text{scrollWidth} \le \text{clientWidth}$ | $\max(0, \text{scrollWidth} - \text{clientWidth}) == 0$ on mobile ($390 \times 844$ and $375 \times 812$) | Evaluate `document.documentElement.scrollWidth` vs `window.innerWidth`. Force programmatic scroll `window.scrollTo(500, 0)` and measure resulting `window.scrollX`. | $\text{scrollWidth} > \text{clientWidth} + 1\text{px}$ or $\text{window.scrollX} > 0$. |
| **AC-1.3** | 3D Declared Pairs Overlap | **Zero Collisions** outside explicit 3D pair contracts | `data-deep-scrutiny-overlap-group` matching + complementary `front`/`back` roles + active `matrix3d` | `DeepScrutinyGate` Vector 1: Check elements and nearest wrapper ancestors for 3D overlap contract attributes and `matrix3d` computed transform. | Overlapping elements sharing a group without `matrix3d` transform, or overlapping elements without contract attributes. |
| **AC-1.4** | Interactive State Leaks | **0 Stuck Hover Leaks** | Opacity and visibility of hover-only absolute layers in resting state | `DeepScrutinyGate` Vector 2: Inspect `.is-absolute`, `.primary-btn-text.is-absolute`, `.nav-link-text.is-absolute`. | Any hover layer displaying `opacity > 0.1` and `visibility !== 'hidden'` while page is in resting state without pointer interaction. |
| **AC-1.5** | Anchor & Link Integrity | **0 Broken Anchors** | Every `a[href^="#"]` maps to valid DOM element | `DeepScrutinyGate` Vector 5: Query all `a[href]` and verify `document.getElementById(href.substring(1)) !== null`. | Target ID missing from DOM. |
| **AC-1.6** | Sticky Container Integrity | **0 Broken Sticky Ancestors** | Ancestors of sticky elements must have `overflow: visible` or `overflow: clip` | `DeepScrutinyGate` Vector 6: Traverse parent elements of all `position: sticky` nodes. Offending overflow ($ox, oy \notin \{\text{'visible'}, \text{'clip'}\}$) forbidden unless marked `data-scroll-container`. | Ancestor element clipping or trapping sticky scroll flow. |
| **AC-1.7** | Click Target Protection | **0 Click Hijacking Layers** | `document.elementFromPoint(cx, cy)` matches intended interactive element | `DeepScrutinyGate` Vector 7: Calculate centroid of buttons, links, and forms; perform DOM hit-testing. | Invisible div or overlay intercepting click events. |
| **AC-1.8** | Dynamic Section Invariance | **0 Sticky Section Bleed** | Sticky elements in section $S_i$ must not invade subsequent section $S_{i+1}$ | `DeepScrutinyGate` Vector 8 (`ScrollScrubber`): Step through full scroll height at 250px intervals. | Sticky pin element remaining visible or overlapping subsequent section content. |

---

### Criterion 2: Performance e Hardware (Performance & Hardware)

| ID | Requirement | Formal Threshold | Verification Metric | Validation Procedure | Failure Condition |
|---|---|---|---|---|---|
| **AC-2.1** | Continuous Framerate | **Framerate $\ge 58\text{fps}$** | Frame render duration $\Delta t \le 16.67\text{ms}$; zero drops $> 16.6\text{ms}$ | Playwright continuous inertial scroll trace in Chromium and WebKit measuring timestamp deltas between consecutive `requestAnimationFrame` invocations over $3000\text{px}$ scroll path. | Any recorded frame delta $> 33.3\text{ms}$ (dropping below 30fps) or average scroll frame rate $< 58\text{fps}$. |
| **AC-2.2** | Mobile Safari 3D VRAM | **VRAM $\le 384\text{MB}$** | Total GPU allocated texture and geometry buffer memory on iOS WebKit | WebGL memory estimator: $\text{VRAM}_{\text{tex}} = \sum (w \cdot h \cdot \text{bpp} \cdot 1.33) + \text{Buffers}$; WebKit CDP profiling. | Total estimated VRAM $> 384\text{MB}$ or browser crash/tab reload event triggered. |
| **AC-2.3** | Single 3D Mesh Disk Size | **Disk Size $< 3\text{MB}$** | File size of optimized `.glb` on disk | Node.js `fs.statSync(modelPath).size < 3 * 1024 * 1024`. | Single model file $\ge 3\text{MB}$. |
| **AC-2.4** | Single 3D Mesh VRAM | **VRAM Footprint $< 4\text{MB}$** | GPU buffer allocation for vertices, normals, UVs, indices | GLTF mesh parser summing vertex buffer byte lengths. | Geometry buffer size $\ge 4\text{MB}$. |
| **AC-2.5** | Initial Asset Bundle Size | **Total Bundle $\le 5\text{MB}$** | Sum of all initial page payload files (HTML + critical CSS + JS + 3D assets + fonts) | Playwright network monitor tracking all transferred bytes during initial page load up to `load` event. | Cumulative transfer size $> 5.0\text{MB}$ ($5,242,880\text{ bytes}$). |

---

### Criterion 3: Verificação Automatizada (Automated Verification)

| ID | Requirement | Formal Threshold | Verification Metric | Validation Procedure | Failure Condition |
|---|---|---|---|---|---|
| **AC-3.1** | Automated Test Pass | **100% Pass Rate** | Zero failing tests, zero skipped tests, zero unhandled rejections | Run full project test suite via `npm test` (`node --test test/*.test.js`). | Any test failure, assertion error, unhandled promise rejection, or exit code $\neq 0$. |
| **AC-3.2** | Zero Autoregressive Slop | **Zero AI Meta-Language** | 0 occurrences of banned slop patterns in rendered DOM | `AntiSlopGate.audit` and `ASTInjector.validateAntiSlop`: Scan visible text nodes and metadata against `BANNED_SLOP_PATTERNS` (`lorem ipsum`, `chunk cognitivo`, `metalinguagem`, `modo auditoria`, `raio-x`, `prompt engineering`, `sua empresa aqui`). | Any matched slop keyword detected in visible text. |
| **AC-3.3** | Zero Unfilled Templates | **0 Template Placeholders** | 0 occurrences of `{SLOT_...}` or unmapped slot strings | Regex scan `/\{SLOT_[A-Z0-9_]+\}/g` over final compiled HTML. | Any raw slot marker present in production HTML. |
| **AC-3.4** | Zero Brand Residuals | **0 Prior Brand Mentions** | 0 keyword occurrences of reference site brand names | Case-insensitive token scan across text nodes, `<title>`, meta tags, `img[alt]`, and `a[title]` for original reference brand keywords. | Residual reference brand name found in client build. |
| **AC-3.5** | Character Budgeting | **Budget Deviation $\le \pm 15\%$** | $0.85 \le \frac{\text{length}(\text{newCopy})}{\text{length}(\text{refCopy})} \le 1.15$ | `AntiSlopGate` comparing slot string character counts between client spec and reference archetype for all slots $> 10\text{ chars}$. | Any slot deviating by $> 15\%$ from reference baseline. |
| **AC-3.6** | Deterministic Synthesis | **Zero Free-String Generation** | AST-based DOM mutation with strict schema validation | Code synthesis validated against Zod schemas and processed exclusively through Cheerio AST nodes; zero LLM free-text HTML output. | Unstructured string concatenations or syntax invalidity. |

---

## 4. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|---|---|---|---|---|---|---|
| 1 | Scraping & CDP | `mapEventListenersWithCDP` | Inspects live DOM event listeners registered via JS across interactive selectors (`button`, `a`, `nav`, canvas, magnetic elements) using CDP `DOMDebugger`. | Playwright `page` instance | Map of listeners categorized by `mouseMove`, `scroll`, `click`, `wheel` | Silent fallback if CDP session fails | `src/pro/cdp-listener-mapper.js:5` |
| 2 | Timeline Ingestion | `extractGsapTimelines` | Deserializes active GSAP `ScrollTrigger` instances and global timeline tweens, extracting triggers, start/end bounds, scrub, pin, eases, and animatable property deltas. | Runtime `window` object | Structured object with `scrollTriggers[]` and `tweens[]` | Returns `{ detected: false }` if GSAP is absent | `src/pro/gsap-reverser.js:4` |
| 3 | Asset Sniffing | `ADVANCED_PRELOAD_SNIFFER_SCRIPT` | Injected pre-load script that forces `preserveDrawingBuffer = true`, captures GLSL shaders, hooks `OffscreenCanvas`, and intercepts ephemeral model blobs via `URL.createObjectURL`. | Browser context pre-initialization | In-memory `__ICM_REGISTRY__` with shaders, canvases, and base64 blobs | Catches errors per context; prevents tainted canvas | `src/pro/advanced-asset-interceptor.js:9` |
| 4 | Asset Normalization | `UniversalAssetNormalizer` | Sanitizes cloned sites, strips preloader curtains, unmasks SplitText lines, localizes CDN assets, resolves `@2x` density variants, and sets video fast-start streaming. | Site directory path, original URL | Localized, unlocked static web bundle ready for preview | Logs network failures, skips missing optional media | `src/pro/universal-asset-normalizer.js:19` |
| 5 | Quality Gate | `DeepScrutinyGate.audit` | Evaluates 8 strict visual and functional vectors: AABB text collision, stuck hover state, English language leaks, mobile layout bleed, anchor integrity, sticky integrity, click hijacking, and scroll scrubbing. | `siteDir`, `viewports[]`, `headless` | Structured audit report with boolean `passed` and detailed findings per vector | Throws error if directory does not exist; records fail status on violation | `src/qa/deep-scrutiny-gate.js:63` |
| 6 | 3D Overlap Contract | Declared 3D Overlap Pairs | Permits text overlap only when declared via `data-deep-scrutiny-overlap-group` and complementary `front`/`back` roles with genuine `matrix3d` transforms. | DOM nodes with overlap contract attributes | Zero-collision pass in AABB vector for valid 3D pairs | Rejects undeclared overlaps or 3D pairs lacking `matrix3d` depth | `src/qa/deep-scrutiny-gate.js:182` |
| 7 | Motion Telemetry | `KineticTelemetryExtractor` | Samples scroll frames continuously, calculating sub-pixel AABB bounding boxes, 3D matrix transforms, and kinetic flow metrics across desktop and mobile. | `siteDir` or `url`, `viewports`, `scrollRange`, `selectors` | Timelines, summary metrics, and analytical decision schema | Rejects execution if neither URL nor siteDir provided | `src/qa/kinetic-telemetry-extractor.js:56` |
| 8 | Analytical Jury | `TypeSafeJury` | Strictly validates layout decisions against typed schema (`EffortMetric`, `MotionQuality`, `taste_rating` 0–100, `is_production_ready`). | Telemetry extraction result | Validated jury verdict object | Throws validation error on schema boundary violation | `src/evaluators/typesafe-jury.js` |
| 9 | Brand Safety | `AntiSlopGate.audit` | Scans rendered HTML DOM for banned AI meta-language, original brand residual leaks, unfilled `{SLOT_...}` placeholders, and character budget deviations ($\pm 15\%$). | `htmlContent`, `brandSpec`, `contentSlots`, `referenceSlots` | Report with boolean `passed`, violation list, and stats | Fails gate if HTML is empty or any violation found | `src/qa/anti-slop-gate.js:28` |
| 10 | AST Mutation | `ASTInjector` & `SlotArrayRepeater` | Transmutes HTML DOM using Cheerio; clones archetype elements for dynamic collections, clamping items to `data-slot-min`/`max` boundaries without stochastic DOM generation. | Cheerio instance `$`, collection config | Transmuted HTML with bound fields and sanitized text | Throws error on banned meta-language; warns on budget breach | `src/generators/ast-injector.js:70` |
| 11 | Viewport Adaptation | `resolveViewportCameraRig` (C3) | Adapts 3D camera FOV, distance, and safe-area translation for portrait viewports ($W/H < 1.0$) to avoid geometry clipping. | `aspectRatio`, `baseFov`, `baseDistance` | Compensated FOV ($24^\circ \to 38^\circ$), distance ($d \times 1.35$), safe-area offset (+0.15m) | Gracefully handles extreme portrait ratios | `src/constraints/geometry.js:6` |
| 12 | Motion Accessibility | `resolveMotionReducedScaling` (C4) | Scales kinetic velocity, damping, and drift when user requests `prefers-reduced-motion: true`. | `prefersReducedMotion` boolean | Damp snapped to 1.0, duration 0.01s, zero drift, zero translation overshoot | Returns standard damping if reduced motion false | `src/constraints/motion.js:6` |
| 13 | Performance Fallback | `resolvePerformanceFpsTier` (C5) | Monitors runtime FPS and gracefully disables heavy shaders (FBM procedural noise, bloom, bokeh) when FPS drops below 50 or 30, keeping essential design invariants. | `observedFps` number | Tier (`HIGH`, `MEDIUM`, `LOW`) with active shader pass flags | Degrades gracefully; never breaks DOM layout | `src/constraints/performance.js:6` |
| 14 | Collection Geometry | `resolveCollectionGeometry` (C6) | Adjusts layout mode between static grid ($\le 3$), horizontal scroll rail ($4..8$), and paginated slider ($> 8$) based on item cardinality. | `cardinality`, `archetypeMax` | Layout mode, column count, scroll pin multiplier, pagination requirements | Clamps negative or non-numeric inputs to minimum 1 | `src/constraints/geometry.js:36` |
| 15 | Style Encapsulation | CSS `@scope` Normalizer | Isolates component primitive styles using native CSS `@scope` blocks, preventing global rule collisions while enforcing W3C `overflow-x: clip`. | Component CSS string | Scoped stylesheet block | Falls back to attribute scoping if `@scope` unsupported | `src/pipeline/transmuter.js:73` |
| 16 | Dual-Stack Output | Dual-Stack Exporter | Generates twin builds: standalone static Edge CDN HTML/ESM bundle and Next.js 15 App Router directory with RSC and Client Islands. | Validated composition spec | Edge CDN directory and Next.js 15 project structure | Aborts build on AST syntax or schema violation | `HANDOFF.md:72` |
| 17 | Local Preview Server | `preview-server.js` | Embedded HTTP server supporting HTTP 206 Partial Content (Range requests for background video/audio) and self-healing 404 proxy from origin CDN. | Port number, root directory | Local streaming server on port 4000 | Proxies missing assets; logs 404 if CDN unreachable | `src/server/preview-server.js` |
| 18 | Tool Orchestration | `src/mcp-server.js` | Exposes 4 MCP tools (`scrape_and_extract_dna`, `create_client_project`, `inject_content_slots`, `run_quality_gate_audit`) and 2 resources (`vault://easings`, `vault://typography`). | JSON-RPC tool invocations | Structured execution results or error objects | Returns structured JSON-RPC error responses | `src/mcp-server.js:18` |

---

## 5. Edge Cases & Boundary Conditions

| # | Feature | Input / Boundary Condition | Observed / Documented Behavior |
|---|---|---|---|
| 1 | DeepScrutinyGate AABB Overlap | Software rendering in Linux CI (SwiftShader / LLVMpipe) | Software rasterizer causes sub-pixel font anti-aliasing jitter. Gate detects renderer profile via WebGL debug info and applies adaptive optical calibration ($\epsilon_x = 2.0$, $\epsilon_y = 1.0$, threshold area $= 60\text{px}^2$ vs $20\text{px}^2$ on GPU) to avoid false-positive failures. |
| 2 | DeepScrutinyGate 3D Overlap | Elements have `data-deep-scrutiny-overlap-group` but NO `matrix3d` transform | Gate rejects group as non-3D overlap collision, failing Vector 1 because 3D contract requires genuine spatial depth (`matrix3d` in computed style). |
| 3 | DeepScrutinyGate 3D Overlap | 3D contract declared on wrapper ancestors rather than leaf text elements | Gate recursively traverses parent elements via `getOverlapContract`, successfully inheriting group and role down to leaf text nodes without false alarms. |
| 4 | Mobile Layout Bleed | Page with wide fixed container on mobile viewport (375px / 390px) | Gate forces programmatic scroll `window.scrollTo(500, 0)`. If `actualHorizontalScroll > 0` or `scrollWidth > innerWidth + 1`, records horizontal leak and identifies culprit element classes. |
| 5 | Anti-Slop Gate Budget | Client copy 35% longer than reference text | Gate computes length ratio $1.35 > 1.15$ ($> 15\%$ tolerance), flags `[Character Budget Violation]`, and fails gate unless explicit override is provided. |
| 6 | Slot Array Repeater | Client specifies 5 items for a collection configured with `data-slot-max="3"` | Repeater clamps collection to exactly 3 items, pruning excess items to preserve physical layout geometry and prevent overflow. |
| 7 | Slot Array Repeater | Client specifies 1 item for a collection configured with `data-slot-min="2"` | Repeater enforces minimum constraint, cloning archetype to maintain layout symmetry and visual weight. |
| 8 | C3 Viewport Adaptation | Extreme ultra-wide desktop ($21:9$, aspect ratio $2.33$) | Viewport camera rig sets `portrait = false`, applies base FOV ($24^\circ$) and base distance ($2.4\text{m}$) with zero vertical offset. |
| 9 | C4 Reduced Motion | OS setting `prefers-reduced-motion: reduce` active | Kinetic engine forces instant camera snapping (`damp: 1.0`), freezes FBM smoke shader drift, and eliminates staggered keyframe transitions. |
| 10 | C5 Performance Fallback | Runtime framerate drops to 24fps on low-end mobile | Constraint engine detects $< 30\text{fps}$, degrades to `LOW` tier: disables volumetric FBM procedural noise, bloom pass, and bokeh pass, but preserves physical geometry and design invariants. |
| 11 | Kinetic Telemetry Extractor | Neither selector A nor selector B matches any DOM element | Extractor creates a baseline document metrics frame (`overlapArea = 0`, `has3dMatrix = false`) without crashing or aborting the run. |
| 12 | TypeSafe Jury | Telemetry reports `architectural_effort = 'STRUCTURALLY_FLAWED'` but `is_production_ready = true` | `validateLayoutDecision` throws schema inconsistency error: production ready strictly requires `HIGH_COMPLEXITY`, `PERFECT` kinetic flow, and `taste_rating >= 85`. |

---

## 6. Handoff Protocol (5 Components)

### 1. Observation
- Directly inspected `ORIGINAL_REQUEST.md` (39 lines) defining R1–R4, Physical Integrity, Performance & Hardware, and Automated Verification criteria.
- Directly inspected `src/qa/deep-scrutiny-gate.js` (596 lines), verifying 8 scrutiny vectors and the exact 3D declared pairs contract using `data-deep-scrutiny-overlap-group`, `data-deep-scrutiny-overlap-role`, and `matrix3d(`.
- Directly inspected `src/qa/kinetic-telemetry-extractor.js` (324 lines), verifying dual-viewport sampling at 1440x900 and 390x844, step-by-step scroll frame capture, sub-pixel AABB bounding box calculation, and TypeSafe Jury analytical decisions.
- Directly inspected `src/qa/anti-slop-gate.js` (182 lines) and `src/generators/ast-injector.js` (409 lines), verifying `BANNED_SLOP_PATTERNS`, character budgeting guard ($\pm 15\%$), and the Slot Array Repeater.
- Directly inspected `src/constraints/` (geometry, motion, performance, contrast, typography), verifying mathematical adaptation functions for FOV/distance scaling, reduced motion, and rendering tier fallbacks.
- Executed `npm test` (`node --test test/*.test.js`). Directly observed in task log:
  - 8/8 DeepScrutinyGate falsifiability tests passed (`deep-scrutiny-falsifiability.test.js:15-92`).
  - All KineticTelemetry tests passed (`kinetic-telemetry-extractor.test.js:24-95`).
  - AST Repeater, DAG Scheduler, Constraint Engine, DNA IR Schema, and HUD tests passed.
  - Test run encountered failures in `test/negocia-bem.test.js` (lines 113–120 in log) due to out-of-sync local markup in `clientes/negocia-bem/site/index.html`, and hangs in E2E tests (`opxy-presets-e2e.test.js:11`) that expect the local preview server to be running on port 4000.

### 2. Logic Chain
1. *From ORIGINAL_REQUEST.md to Requirements Hierarchy*: The user request mandates high-fidelity 60fps kinetic generation with zero layout defects and dual compilation. This translates to four strict foundational engines (R1 Decompiler, R2 Kinetic Extractor, R3 3D Asset Pipeline, R4 Dual-Stack Grammar).
2. *From Physical Integrity Criteria to Implementation*: The criteria demand AABB Overlap = 0px² at 1440x900 and 390x844, zero horizontal scroll bleed, and zero undeclared 3D collisions. In the codebase, `DeepScrutinyGate` and `KineticTelemetryExtractor` directly implement these checks using Playwright CDP frame sampling and the `data-deep-scrutiny-overlap-*` contract.
3. *From Hardware Criteria to Asset Constraints*: The criteria demand $\le 384\text{MB}$ VRAM on iOS, $\ge 58\text{fps}$ continuous scroll, $< 3\text{MB}$ mesh weight, $< 4\text{MB}$ mesh VRAM, and $\le 5\text{MB}$ total bundle. These parameters directly bound the 3D pipeline (Draco WASM, KTX2, vertex decimation) and the C5 performance fallback tier.
4. *From Automated Verification to Quality Gates*: 100% test pass and zero AI slop require AST-based deterministic DOM manipulation (`ASTInjector`, `SlotArrayRepeater`) and multi-gate validation (`UnifiedQualityGate`, `AntiSlopGate`).
5. *From Current Test Run Observation to Test Suite Action*: The test run failure in `negocia-bem.test.js` and port 4000 dependency in `opxy-presets-e2e.test.js` prove that achieving the acceptance criterion of "100% test pass via npm test" requires starting the preview server or wrapping E2E tests in ephemeral server harnesses, and updating the client markup in `clientes/negocia-bem/site/index.html`.

### 3. Caveats
- No product implementation was altered during this survey (strictly conforming to the read-only rule of the Spec Miner).
- The 384MB VRAM threshold for Safari iOS is an architectural limit imposed by WebKit memory watchdogs; hardware validation on real physical iOS devices requires Web Inspector remote debugging or emulation harnesses.
- Full E2E test execution of `opxy-presets-e2e.test.js` requires the preview server (`node bin/cli.js --preview --port 4000`) running concurrently.

### 4. Conclusion
All functional requirements (R1, R2, R3, R4) and acceptance criteria from `ORIGINAL_REQUEST.md` have been fully probed, mined, and formalized into rigorous contracts, mathematical boundaries, test scenarios, and error specifications. The repository possesses the core QA and constraint engines (`DeepScrutinyGate`, `KineticTelemetryExtractor`, `AntiSlopGate`, `ConstraintEngine`), but requires the dual-stack compiler with native CSS `@scope` and Next.js 15 RSC export, mobile 3D asset decimation pipeline, and E2E preview-server test resilience to achieve full 100% conformance.

### 5. Verification Method
- **DeepScrutinyGate Falsifiability**:
  `node --test test/deep-scrutiny-falsifiability.test.js`
- **Kinetic Telemetry & TypeSafe Jury**:
  `node --test test/kinetic-telemetry-extractor.test.js`
- **Anti-Slop & AST Mutation**:
  `node --test test/ast-injector-cardinality.test.js`
  `node --test test/transmuter-and-anti-slop.test.js`
- **Constraint Engine Verification**:
  `node --test test/constraint-engine.test.js`
- **Full Test Suite Verification**:
  Ensure preview server is running (`npm run preview` in separate process), then execute:
  `npm test`
