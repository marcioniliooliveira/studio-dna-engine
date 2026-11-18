# editor-5

> **Category:** Editor (`editor`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/editor/editor-5](https://pro.reactbits.dev/docs/app-ui/editor/editor-5)  
> **Native Viewport:** `1280px × 680px`

Long document reader with an outline

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`editor-5.jsx`](./editor-5.jsx) (minHeight: `680px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`editor-5.sorbet.jsx`](./editor-5.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 71 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 139 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 2 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Access ledger`
- `Immutability`
- `Retention`
- `Export`
- `Reading the ledger`
- `Filters`
- `Rate limits`
- `Toggle outline`
- `Focus`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 137)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10anan4` | `@layer utilities` | `overflow: hidden;` |
| `rb10i7wwu` | `@layer utilities` | `white-space: nowrap;` |
| `rb113zeis` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1166hux` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb134ryhw` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb13fqu49` | `@layer utilities` | `overflow-y: auto;` |
| `rb1507cqv` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb158nctg` | `@layer utilities` | `cursor: progress;` |
| `rb162j88p` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb16u19d4` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb16zg63j` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1763oht` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb177c3br` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb178103n` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb17mips4` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb17rrt7j` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*10);` |
| `rb17yp20y` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb183kobu` | `@layer utilities` | `text-align: left;` |
| `rb18o4gao` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb192urt` | `@layer utilities` | `outline-offset: 2px;` |
| `rb19bwbkx` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb19iy95h` | `@layer utilities` | `opacity: 0;` |
| `rb19mttf7` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1avalt5` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1b0elzl` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1cs7ijq` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1cuw6xj` | `@layer utilities` | `column-gap: calc(var(--spacing)*2);` |
| `rb1dab1fc` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1eb8no` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb1fcntw0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1grtfq6` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1gxak09` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1iha7wq` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1j01ttl` | `@layer utilities` | `height: 52px;` |
| `rb1ln3513` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1lyfyox` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1m3tdqb` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1mg123u` | `@layer utilities` | `transition-property: background-color, border-color, color, scale, outline-color; transition-timing-function: var(--tw-ease,var(--default-tr` |
| `rb1mk1ghe` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1mxpyau` | `@layer utilities` | `border-right-style: var(--tw-border-style); border-right-width: 1px;` |
| `rb1p3b0bo` | `@layer utilities` | `font-size: 24px; line-height: 28px;` |
| `rb1r7fbjp` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1rdjlee` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1rldnec` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1rr5es2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1ryi68a` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1t6hnn9` | `@layer utilities` | `--tw-tracking: -.01em; letter-spacing: -0.01em;` |
| `rb1ubs7jh` | `@layer utilities` | `scale: 0.98;` |
| `rb1uc4tbr` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1uessc6` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1ueynkk` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1uitj5p` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1uw40pp` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1vu1fz4` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb1vwghvc` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1wfipon` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1x4ir92` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1ygw9zi` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb209gpc` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb32kssz` | `@layer utilities` | `flex-shrink: 0;` |
| `rb42ly1p` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb4b5qnt` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb4denn9` | `@layer utilities` | `cursor: pointer;` |
| `rb4swpop` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb4tcpqk` | `@layer utilities` | `display: flex;` |
| `rb5dtxr5` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb5en310` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb6879vg` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb7bjjst` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb7cvnm1` | `@layer utilities` | `justify-content: center;` |
| `rb7jh7o` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb7mapl8` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb8y4d9y` | `@layer utilities` | `width: 100%;` |
| `rb9ecmgx` | `@layer utilities` | `cursor: default;` |
| `rbare8vv` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rbblbadw` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rbcpau7d` | `@layer utilities` | `align-items: center;` |
| `rbd86t` | `@layer utilities` | `padding-block: calc(var(--spacing)*8);` |
