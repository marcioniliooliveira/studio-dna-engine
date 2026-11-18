# file-manager-1

> **Category:** File Manager (`file-manager`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/file-manager/file-manager-1](https://pro.reactbits.dev/docs/app-ui/file-manager/file-manager-1)  
> **Native Viewport:** `1280px × 800px`

Drive explorer with a folder tree

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`file-manager-1.jsx`](./file-manager-1.jsx) (minHeight: `800px`, hooks: `children`, `id`, `map`, `name`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`file-manager-1.sorbet.jsx`](./file-manager-1.sorbet.jsx) (minHeight: `860px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 521 |
| **Max DOM Depth** | 15 |
| **Atomic/Scoped Classes** | 295 |
| **Buttons** | 50 |
| **Inputs / Textareas / Selects** | 14 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 72 / 0 |
| **ARIA Roles** | `progressbar`, `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Halcyon Drive`
- `New folder`
- `Upload`
- `My Drive`
- `Client Deliverables`
- `Northwind Rebrand`
- `Harbor Coffee`
- `Brand Library`
- `Spring Campaign`
- `Studio Operations`
- `Shared with me`
- `Recent`
- `Starred`
- `Bin`
- `Search files`
- `Name`
- `Size`
- `Modified`
- `Owner`
- `Actions`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 292)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb105i51x` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb107wky7` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb10oetj8` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb11104zz` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb116m397` | `@layer utilities` | `--tw-content: ""; content: var(--tw-content);` |
| `rb116uvs` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb11cg34j` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb11hrkab` | `@layer utilities` | `border-collapse: separate;` |
| `rb123fcwq` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb12nimud` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb130dpad` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb13dlgxm` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb13qflfr` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb144hotd` | `@layer utilities` | `rotate: 90deg;` |
| `rb1491tt9` | `@layer utilities` | `cursor: text;` |
| `rb152gmef` | `@layer utilities` | `outline-offset: 2px;` |
| `rb15foz9v` | `@layer utilities › @media (min-width: 64rem)` | `grid-template-columns: 248px 1fr;` |
| `rb15lafar` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb15rlhww` | `@layer utilities` | `width: 100%;` |
| `rb15x94b` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb15xm5in` | `@layer utilities` | `content: var(--tw-content); border-radius: var(--rb-r-sm,6px);` |
| `rb168po11` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb16auy7w` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.4);` |
| `rb16dq3yf` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb16yfogj` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1740vcu` | `@layer utilities` | `background-color: oklch(0.8 0.152 68);` |
| `rb17dgiw6` | `@layer utilities` | `cursor: not-allowed;` |
| `rb17ievuh` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb180tbdb` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb18j42wp` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb18t5vi4` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.07);` |
| `rb1948yae` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb19d52w2` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb19iuvzf` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb19nvy31` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb19uudvl` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb19x8389` | `@layer utilities` | `min-height: 800px;` |
| `rb1a30w5b` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1ajek9x` | `@layer utilities › @media (min-width: 64rem)` | `display: flex;` |
| `rb1asoi3l` | `@layer utilities` | `display: none;` |
| `rb1assqem` | `@layer utilities` | `cursor: progress;` |
| `rb1avad1h` | `@layer utilities` | `pointer-events: none;` |
| `rb1ay5b2r` | `@layer utilities` | `justify-content: center;` |
| `rb1b3z67a` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1b7eq4p` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1b9xw94` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1bndrgo` | `@layer utilities` | `text-underline-offset: 4px;` |
| `rb1c3c8mz` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1ce8koi` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1cmg36u` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1csrr20` | `@layer utilities` | `width: fit-content;` |
| `rb1d74suo` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1dhku57` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*1);` |
| `rb1dhtja3` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*4);` |
| `rb1djmmpl` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1dz7ksa` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1ekkp0` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1evk37a` | `@layer utilities › @media (min-width: 40rem)` | `display: table-cell;` |
| `rb1evrjqy` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb1f0zdf8` | `@layer utilities` | `position: absolute;` |
| `rb1f1sr69` | `@layer utilities` | `flex-direction: column;` |
| `rb1f62hj3` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1f8xiwi` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1fjbfu7` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb1fksw8s` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1ftf4x2` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb1fzzs2j` | `@layer utilities` | `transition-property: transform, translate, scale, rotate; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function` |
| `rb1g6j71h` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1ghexi5` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1h63y36` | `@layer utilities` | `overflow: hidden;` |
| `rb1ha7t84` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1hdiqan` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1hk7ex3` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1hqpwin` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1hxhehd` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*4);` |
| `rb1hyvhux` | `@layer utilities` | `text-decoration-thickness: 1px;` |
| `rb1i1o9ha` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1i46mb1` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
