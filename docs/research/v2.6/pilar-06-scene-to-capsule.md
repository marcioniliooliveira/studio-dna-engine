# Pillar 6: Scene-to-Capsule Subtree Slicing

**Document ID:** `DOC-RESEARCH-V26-PILAR-06`  
**System:** Studio DNA PRO v2.6 (`studio-dna-engine`)  
**Status:** Implementation-Grade Architectural Specification  
**Classification:** `[observed]` (codebase tests), `[documented]` (W3C standards & CDP specifications), `[inferred]` (mathematical derivations)

---

## 1. Executive Summary & Resolution of Limitation L1

In Studio DNA PRO v2.5, the semantic cloner (`src/core/cloner.js`) attempted section extraction by identifying candidate DOM containers and creating an unisolated directory `copias/<slug>/site/sections/` (`[observed]`). This exhibited three severe architectural failure modes, classified as **Limitation L1**:

1. **Unscoped Cascading Bleed (`[observed]` in `src/core/cloner.js:648-670`):**
   Sections were exported as full HTML documents embedding the original page's global stylesheets (`${cssLinksHtml}`) and complete global inline stylesheets (`<style>${result.inlineStyles}</style>`). When a section was re-embedded into a target client site, its styles either bled destructively into the host DOM or were overridden by host reset styles.
2. **Custom Property Disconnection (`[observed]`):**
   CSS rules referencing custom properties (e.g. `var(--theme-accent)`) broke when extracted because the variables were declared at higher ancestor levels (`:root`, `html`, `body`), which were omitted from the section slice.
3. **Kinetic Disconnection (`[observed]`):**
   GSAP animations, ScrollTrigger instances, and WebGL canvases were bound globally in monolithic bundles without selector isolation, rendering extracted sections static or causing JavaScript runtime exceptions when target elements were detached.

Pillar 6 resolves Limitation L1 by establishing a deterministic **Scene-to-Capsule Subtree Slicing Pipeline** that extracts isolated, self-contained capsules into `design-vault/capsules/<capsuleSlug>/` containing:
- `manifest.json`: Capsule entry points and metadata.
- `capsule.html`: Semantic, unmasked skeleton with declared `[data-kinetic-slot]` anchors.
- `scoped.styles.css`: CSS stylesheet re-anchored via W3C `@scope` with an automated fallback.
- `dna-ir.json`: Token definitions, closed custom properties, APCA constraints, and kinetic parameters.
- `assets/`: Localized, hashed fonts, textures, and geometry buffers.

---

## 2. Closed CDP CSS Extraction Architecture

Let $T(r_k) = (V, E)$ be the DOM subtree rooted at node $r_k$, where $V = \{v_1, v_2, \dots, v_n\}$ represents all element nodes within the section.

The extraction pipeline operates via an active Chrome DevTools Protocol (CDP) session (`page.context().newCDPSession(page)`):

```
[ Active CDP Session ]
        │
        ├── 1. DOM.getDocument({ depth: -1, pierce: true })
        ├── 2. DOM.querySelector({ nodeId, selector: r_k })
        ├── 3. Enumerate Subtree Nodes V(r_k) via DFS
        │
        ├── 4. For each node v_i in V(r_k):
        │       ├── CSS.getMatchedStylesForNode({ nodeId: v_i })
        │       └── CSS.getComputedStyleForNode({ nodeId: v_i })
        │
        ├── 5. Normalize Cascade Order & Specificity Tuples (a, b, c)
        └── 6. Transitive Dependency Collection:
                ├── Filter @keyframes by active animation-name references
                └── Filter @font-face by active font-family declarations
```

### 2.1 Cascade & Matched Style Normalization

For every node $v_i \in V(r_k)$:
1. `CSS.getMatchedStylesForNode` returns:
   - `matchedCSSRules`: List of author rule matches.
   - `pseudoElements`: Rule matches for `::before`, `::after`, `::placeholder`, `::marker`.
   - `inherited`: Rule entries inherited from ancestors outside $T(r_k)$.
   - `cssKeyframesRules`: Keyframe blocks referenced by active animations.
2. User-agent default styles are filtered out unless explicitly overridden by author rules.
3. Media and container query boundaries (`@media (...)`, `@container (...)`) surrounding matched rules are preserved intact.

### 2.2 Transitive Keyframes and Font-Face Extraction

1. **Transitive Keyframes (`[documented]`):**
   Let $\mathcal{D}(v)$ be the set of declarations active on $v \in T(r_k)$. The set of required keyframe animations is:
   $$\mathcal{K}_{\text{used}} = \left\{ \text{name} \mid \exists d \in \mathcal{D}(v) : d.\text{property} \in \{\text{'animation'}, \text{'animation-name'}\} \land \text{name} \in \text{Tokens}(d.\text{value}) \right\}$$
   Only keyframes matching $\mathcal{K}_{\text{used}}$ are extracted into `scoped.styles.css`.
2. **Transitive Font-Face (`[documented]`):**
   $$\mathcal{F}_{\text{used}} = \left\{ \text{family} \mid \exists d \in \mathcal{D}(v) : d.\text{property} = \text{'font-family'} \land \text{family} \in \text{Tokens}(d.\text{value}) \right\}$$
   For every font in $\mathcal{F}_{\text{used}}$, the corresponding `@font-face` binary is downloaded, hashed (`<sha256>.woff2`), and written to `assets/fonts/` with rewritten local relative URLs.

---

## 3. Inherited Custom Property Closure Formula

### 3.1 Closed-Form Equations (Equations 1–5)

To guarantee that CSS variables declared outside the extracted subtree do not fail when the capsule is isolated, the engine captures the exact closure of free variables:

Let $\text{ExtractVars}(\text{decl.value})$ be the operator extracting all custom property identifiers referenced inside `var(--identifier, fallback)` expressions across all matched declarations in $T(r_k)$:

$$\text{Eq. 1:} \quad \mathcal{V}_{\text{used}}(r_k) = \bigcup_{v \in T(r_k)} \bigcup_{d \in \mathcal{D}(v)} \text{ExtractVars}(d.\text{value})$$

Let $\mathcal{V}_{\text{defined}}(r_k)$ be the set of all custom properties explicitly declared within $T(r_k)$ (either on the root $r_k$ or on any of its internal descendants):

$$\text{Eq. 2:} \quad \mathcal{V}_{\text{defined}}(r_k) = \bigcup_{v \in T(r_k)} \left\{ p \in \text{Properties}(d) \mid d \in \mathcal{D}(v) \land p \text{ starts with } \text{"--"} \right\}$$

The set of free (unbound, inherited) custom property variables that leak into or depend upon outer ancestral scopes is defined by the set difference:

$$\text{Eq. 3:} \quad \mathcal{V}_{\text{free}}(r_k) = \mathcal{V}_{\text{used}}(r_k) \setminus \mathcal{V}_{\text{defined}}(r_k)$$

For every free variable $\nu \in \mathcal{V}_{\text{free}}(r_k)$, its resolved computed value $V^*(\nu)$ at the section root boundary $r_k$ is captured via CDP `CSS.getComputedStyleForNode` or runtime `window.getComputedStyle`:

$$\text{Eq. 4:} \quad V^*(\nu) = \text{getComputedStyle}(r_k).\text{getPropertyValue}(\nu)$$

The **Inherited Custom Property Closure** $\mathcal{C}(r_k)$ is defined as the finite set of key-value pairs:

$$\text{Eq. 5:} \quad \mathcal{C}(r_k) = \left\{ (\nu, V^*(\nu)) \mid \nu \in \mathcal{V}_{\text{free}}(r_k) \right\}$$

### 3.2 Injection Architecture

The closure $\mathcal{C}(r_k)$ is injected into two target locations:
1. **In `scoped.styles.css`**: Under the `:scope` pseudo-class:
   ```css
   @scope ([data-dna-capsule="hero-showcase"]) {
     :scope {
       /* Inherited Custom Property Closure C(r_k) */
       --theme-accent: #0f172a;
       --font-heading: "PP Editorial Old", serif;
       --section-padding: 80px;
       --surface-elevation: 0 20px 40px rgba(0, 0, 0, 0.08);
     }
   }
   ```
2. **In `dna-ir.json`**: Under `tokens.customProperties` as mutable parameters bound to the HUD projector and MCP patch tools.

---

## 4. Formal Invariance Theorem 1: Custom Property Completeness & Isolation

### Theorem 1 Statement
*Let $T(r_k)$ be an arbitrary DOM subtree with CSS declaration set $\mathcal{D}$. If $T(r_k)$ is extracted and evaluated in an empty document context where the Inherited Custom Property Closure $\mathcal{C}(r_k)$ is declared on $r_k$, then for every node $v \in T(r_k)$ and every CSS property $p \in \text{Properties}(\mathcal{D}(v))$, the computed value $\text{Computed}(v, p)$ in the isolated context is identical to $\text{Computed}(v, p)$ in the original document.*

### Proof
Let $d \in \mathcal{D}(v)$ be an arbitrary declaration on node $v \in T(r_k)$ whose value depends on custom properties $\mathcal{V}_d = \{\nu_1, \nu_2, \dots, \nu_m\} \subseteq \mathcal{V}_{\text{used}}(r_k)$.

For each variable $\nu_i \in \mathcal{V}_d$, exactly one of two exhaustive cases holds:
- **Case 1: $\nu_i \in \mathcal{V}_{\text{defined}}(r_k)$:**
  By definition of $\mathcal{V}_{\text{defined}}(r_k)$ (Eq. 2), $\nu_i$ is declared on some node $u \in T(r_k)$ where $u$ is either an ancestor of $v$ or $v$ itself. Because $T(r_k)$ is extracted with its internal parent-child relationships intact, $u$ remains an ancestor of $v$ in the isolated document. By the W3C CSS Cascading and Inheritance Level 5 specification, declarations within $T(r_k)$ cascade identically.
- **Case 2: $\nu_i \in \mathcal{V}_{\text{free}}(r_k)$:**
  By definition of $\mathcal{V}_{\text{free}}(r_k)$ (Eq. 3), $\nu_i$ is not declared anywhere within $T(r_k)$. In the original document, the value of $\nu_i$ at node $v$ was inherited down the DOM hierarchy from the nearest ancestor $w \notin T(r_k)$. Because $r_k$ is the sole ancestor of $v$ inside $T(r_k)$ that bridges to the external document, the inherited value at $v$ equals the inherited value at $r_k$:
  $$\text{Value}_{\text{orig}}(v, \nu_i) = \text{Value}_{\text{orig}}(r_k, \nu_i) = V^*(\nu_i)$$
  In the isolated context, $\nu_i$ is explicitly declared on $r_k$ with value $V^*(\nu_i)$ via $\mathcal{C}(r_k)$. Since no intermediate node $u$ between $r_k$ and $v$ declares $\nu_i$ (by Case 2 hypothesis), the value cascades unhindered from $r_k$ to $v$:
  $$\text{Value}_{\text{isolated}}(v, \nu_i) = V^*(\nu_i) = \text{Value}_{\text{orig}}(v, \nu_i)$$

Because all referenced variables resolve to identical values, every `var(...)` expression evaluates identically. Consequently, every computed value $\text{Computed}(v, p)$ in the isolated document is identical to that in the original document. $\blacksquare$

---

## 5. AST Ancestor Prefix Pruning & Donut Scope Partitioning

### 5.1 Problem Definition
In reference sites, CSS selectors targeting elements inside section $r_k$ frequently include external ancestral qualifiers, e.g.:
```css
html.lenis body.dark-mode #app .hero-container .hero-title
```
When section $r_k$ (`.hero-container`) is placed inside a capsule `<div data-dna-capsule="<slug>">`, the ancestor selector fails because `body.dark-mode #app` is absent from the host document.

### 5.2 Partitioning Algorithm
Let $S$ be a complex selector decomposed into $m$ compound selector segments separated by combinators $c_j \in \{\text{' '}, \text{'>'}, \text{'+'}, \text{'~'}\}$:
$$S = s_1 \ c_1 \ s_2 \ c_2 \ \dots \ c_{m-1} \ s_m$$

The algorithm executed by `src/compiler/css-selector-ast.js` partitions $S$:
1. Parse $S$ into structured tokens using PostCSS.
2. Search for index $j \in \{1, \dots, m\}$ such that segment $s_j$ matches section root $r_k$ (by tag, ID, or class).
3. If no segment explicitly matches $r_k$, locate the first segment $s_k$ that matches any element inside $T(r_k)$.
4. Partition the selector into:
   - External Ancestor Prefix: $S_{\text{anc}} = s_1 \ c_1 \ \dots \ c_{j-1}$
   - Local Subtree Selector: $S_{\text{local}} = s_j \ c_j \ \dots \ s_m$
5. Prune $S_{\text{anc}}$ completely.
6. If $s_j$ targets $r_k$, rewrite $s_j \to \text{":scope"}$.
7. Wrap in W3C `@scope`:

```css
@scope ([data-dna-capsule="<slug>"]) to ([data-kinetic-slot]) {
  :scope {
    position: relative;
    width: 100%;
  }

  .hero-title {
    font-size: clamp(2rem, 5vw, 4.5rem);
    line-height: 1.1;
  }
}
```

### 5.3 Fallback Architecture (`@supports not (scope: default)`)
For environments lacking native `@scope` support:
1. Every pruned selector $S_{\text{pruned}}$ is prefixed with the capsule attribute:
   $$S_{\text{fallback}} = \text{"[data-dna-capsule=\""} + \text{slug} + \text{"\"] "} + S_{\text{pruned}}$$
2. Slot boundary isolation is enforced using `:is(...)` and `:not([data-kinetic-slot] *)`:
   $$S_{\text{isolated}} = \text{"[data-dna-capsule=\""} + \text{slug} + \text{"\"] :is("} + S_{\text{pruned}} + \text{"):not([data-kinetic-slot] *)"}$$

```css
@supports not (scope: default) {
  [data-dna-capsule="hero-showcase"] .hero-title:not([data-kinetic-slot] *) {
    font-size: clamp(2rem, 5vw, 4.5rem);
    line-height: 1.1;
  }
}
```

---

## 6. Formal Invariance Theorem 2: Donut Scope Boundary Non-Piercing Invariant

### Theorem 2 Statement
*Let $C$ be a capsule stylesheet compiled with root boundary selector $[data-dna-capsule="<slug>"]$ and hole boundary selector $[data-kinetic-slot]$. For any DOM element $u$ that is a descendant of an element $s$ matching $[data-kinetic-slot]$, no rule in $C$ can match $u$.*

### Proof
We evaluate the two execution branches:

1. **Branch A: Native W3C `@scope (Root) to (Hole)`:**
   Per the W3C CSS Cascading and Inheritance Level 5 § 6.5 (Scoping):
   The scope of a `@scope (A) to (B)` rule is defined as the set of elements that are descendants of an element matching $A$, excluding elements that match $B$ and all descendants of elements matching $B$.
   By hypothesis, $u$ is a descendant of $s$, and $s$ matches $[data-kinetic-slot] = B$.
   Therefore, $u \in \text{Descendants}(s)$, so $u$ is strictly excluded from the scope of rule $C$. No rule inside the `@scope` block can match $u$.

2. **Branch B: Fallback Selector `:not([data-kinetic-slot] *)`:**
   In the fallback stylesheet, every selector targeting descendants concludes with the predicate:
   $$\mathcal{P}(x) \equiv :not([data-kinetic-slot] \ *)$$
   By hypothesis, element $u$ is a descendant of $s$, where $s$ possesses attribute `data-kinetic-slot`.
   Consequently, the complex selector `[data-kinetic-slot] *` matches $u$.
   Evaluating the negation predicate:
   $$\mathcal{P}(u) \equiv \neg(\text{matches}([data-kinetic-slot] \ *, \ u)) \equiv \neg(\text{true}) \equiv \text{false}$$
   Because $\mathcal{P}(u)$ evaluates to `false`, the entire selector fails to match element $u$.

In both branches, no rule in $C$ can match $u$. The slot boundary is strictly impenetrable. $\blacksquare$

---

## 7. Associative Kinetic Slicing

Kinetic timeline interceptors (`src/cdp/kinetic-timeline-interceptor.js`) capture page-level animation timelines, GSAP tweens, and WebGL render calls (`[observed]`).

The Associative Kinetic Slicer filters and binds animations to the capsule:

1. **GSAP Tweens & Timelines:**
   Let $\mathcal{W} = \{w_1, w_2, \dots, w_k\}$ be the set of captured tweens from `window.__KINETIC_HOOK_DATA__.gsap.tweens`.
   For each tween $w_i$:
   - Target element $e_i = w_i.\text{target}$.
   - If $r_k.\text{contains}(e_i)$ evaluates to `true`:
     - Rewrite target selector relative to capsule: $S_{\text{rel}} = \text{GetRelativeSelector}(r_k, e_i)$.
     - Serialize parameters (`duration`, `ease`, `vars`) into `dna-ir.json.kinetic.tweens`.
2. **ScrollTrigger Filtering:**
   For each trigger $st \in \text{ScrollTriggers}$:
   - If $r_k.\text{contains}(st.\text{trigger})$:
     - Bind trigger to capsule `UniversalScrollBus` progress phase.
     - Set `scroller: "[data-dna-capsule=\"" + slug + "\"]"`.
3. **WebGL Canvas Association:**
   Compute the Intersection over Union (IoU) of the section bounding box and canvas:
   $$\text{IoU}(\text{Box}(r_k), \text{Box}(\text{canvas})) = \frac{\text{Area}(\text{Box}(r_k) \cap \text{Box}(\text{canvas}))}{\text{Area}(\text{Box}(r_k) \cup \text{Box}(\text{canvas}))}$$
   If $\text{IoU} > 0$ or $\text{Area}(\text{Box}(r_k) \cap \text{Box}(\text{canvas})) \ge 0.5 \cdot \text{Area}(\text{Box}(\text{canvas}))$, the canvas is associated with the capsule, and its shader uniforms (`u_sheetP`, `u_hover`, `u_white`) and geometry buffers are extracted.

---

## 8. Complete Zod Schema for Capsule Manifest & Slot Contract

```typescript
import { z } from 'zod';

export const CapsuleSlotSchema = z.object({
  slotId: z.string().min(1).regex(/^[a-z0-9_-]+$/),
  slotType: z.enum(['text', 'heading', 'rich-text', 'image', 'video', 'badge', 'button', 'canvas']),
  targetSelector: z.string().min(1),
  characterBudget: z.object({
    target: z.number().int().positive(),
    tolerance: z.number().min(0).max(1).default(0.15)
  }).optional(),
  content: z.union([z.string(), z.record(z.string(), z.any())]).optional()
});

export const UniversalScrollBusConfigSchema = z.object({
  muExpand: z.number().positive().default(1.0),
  muHold: z.number().positive().default(2.5),
  muExit: z.number().positive().default(1.0),
  velocityAlpha: z.number().min(0.01).max(1.0).default(0.15),
  overscrollElasticity: z.number().min(0).max(1).default(0.35)
});

export const CapsuleManifestSchema = z.object({
  schemaVersion: z.literal('2.6.0'),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  category: z.enum(['hero', 'work-stage', 'bento', 'story-rail', 'footer']),
  entryHtml: z.string().default('capsule.html'),
  scopedCss: z.string().default('scoped.styles.css'),
  tokens: z.object({
    customProperties: z.record(z.string(), z.string()),
    oklchPalette: z.record(z.string(), z.string()).optional()
  }),
  scrollBus: UniversalScrollBusConfigSchema,
  slots: z.array(CapsuleSlotSchema),
  kinetic: z.object({
    tweens: z.array(z.record(z.string(), z.any())).default([]),
    scrollTriggers: z.array(z.record(z.string(), z.any())).default([]),
    webgl: z.object({
      canvasSelector: z.string().default('canvas'),
      shaderUniforms: z.record(z.string(), z.any()).default({}),
      cameraTrajectory: z.array(z.record(z.string(), z.any())).default([])
    }).optional()
  })
});
```

---

## 9. Verification Strategy

1. **Custom Property Closure Test:** `test/v2.6/custom-property-closure.test.js` loads a test DOM with external CSS variables, runs `extractCustomPropertyClosure`, and verifies that $\mathcal{V}_{\text{free}}$ resolves and renders identically in an isolated iframe.
2. **Donut Scope Isolation Test:** `test/v2.6/css-selector-ast.test.js` tests scoped rules against elements inside `[data-kinetic-slot]`, asserting 0 style leaks.
3. **CDP Extraction Test:** `test/v2.6/scene-to-capsule.test.js` validates full extraction on `copias/jesperlandberg-com` and `copias/op-xy-76-aura-build`.
