# app-shell-1

> **Category:** App Shell (`app-shell`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/app-shell/app-shell-1](https://pro.reactbits.dev/docs/app-ui/app-shell/app-shell-1)  
> **Native Viewport:** `1280px × 720px`

Sidebar app with an overview screen

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`app-shell-1.jsx`](./app-shell-1.jsx) (minHeight: `720px`, hooks: `disconnect`, `focus`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`app-shell-1.sorbet.jsx`](./app-shell-1.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 523 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 263 |
| **Buttons** | 5 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 17 |
| **SVGs / Canvases** | 13 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Shipments`
- `DO Devon Okafor Dispatch lead`
- `Search shipments`
- `Book shipment`
- `Active shipments`
- `Reference`
- `Consignee`
- `Carrier`
- `Status`
- `ETA`
- `Value`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 254)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1079y6y` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb10hf7sz` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb11377ge` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb114uaql` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb119mr03` | `@layer utilities` | `container-type: inline-size;` |
| `rb11bds3x` | `@layer utilities` | `width: 24%;` |
| `rb11bvfb2` | `@layer utilities` | `transition-property: transform, translate, scale, rotate; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function` |
| `rb11cqoh8` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb11n95vl` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb11t5cwt` | `@layer utilities` | `color: oklch(0.49 0.1 68);` |
| `rb11ti8ky` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1246nw1` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1275m8a` | `@layer utilities` | `height: calc(var(--spacing)*10);` |
| `rb12h57x9` | `@layer utilities` | `height: calc(var(--spacing)*11);` |
| `rb12hob9u` | `@layer utilities` | `animation: var(--animate-spin);` |
| `rb12qieak` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb12sgksd` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1342i6s` | `@layer utilities` | `padding-top: calc(var(--spacing)*.5);` |
| `rb13b1q4x` | `@layer utilities › @media (min-width: 40rem)` | `display: flex;` |
| `rb13vkdzp` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1413q4b` | `@layer utilities` | `display: inline-flex;` |
| `rb141tmc9` | `@layer utilities` | `cursor: not-allowed;` |
| `rb14r1qxm` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb153m5ho` | `@layer utilities` | `grid-template-rows: 1fr;` |
| `rb158s7sz` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb15ftsj8` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 0px;` |
| `rb15fznj4` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb15mcx5j` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb15qmetl` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb15ua66z` | `@layer utilities` | `column-gap: calc(var(--spacing)*1);` |
| `rb15v8ubx` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb162snzc` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1649rvy` | `@layer utilities` | `column-gap: calc(var(--spacing)*2);` |
| `rb16fmhkj` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb16slk42` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb16soxe6` | `@layer utilities` | `rotate: 90deg;` |
| `rb16zbhj8` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1782b5i` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb17dq5pw` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb17fhbvk` | `@layer utilities` | `scale: 0.98;` |
| `rb17s0ved` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb184he1n` | `@layer utilities` | `table-layout: fixed;` |
| `rb18h4267` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb19qwc5` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1a4myll` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1anvo2` | `@layer utilities` | `align-items: center;` |
| `rb1bmrsro` | `@layer utilities` | `position: relative;` |
| `rb1bvkc2h` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1bxnreg` | `@layer utilities` | `margin-inline: calc(var(--spacing)*-1);` |
| `rb1c7h26s` | `@layer utilities › @container (min-width: 28rem)` | `grid-template-columns: none;` |
| `rb1cesixf` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1cnsnxg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1cq2z8b` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1cwx5cf` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1d3xa9h` | `@layer utilities` | `transition-property: background-color, color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transiti` |
| `rb1d9arcu` | `@layer utilities` | `cursor: pointer;` |
| `rb1ddx9gk` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1de3m9k` | `@layer utilities` | `display: none;` |
| `rb1dpkigq` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-900); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1e50flx` | `@layer utilities` | `color: oklch(0.8 0.13 68);` |
| `rb1e9fuzq` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1fi5plr` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1fj6f48` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*4);` |
| `rb1fmfij6` | `@layer utilities` | `--tw-tracking: -.01em; letter-spacing: -0.01em;` |
| `rb1fmhte` | `@layer utilities` | `padding-left: calc(var(--spacing)*1);` |
| `rb1fo6x4b` | `@layer utilities` | `--tw-border-spacing-x: calc(var(--spacing)*0); --tw-border-spacing-y: calc(var(--spacing)*0); border-spacing: var(--tw-border-spacing-x)var(` |
| `rb1gc81xr` | `@layer utilities › @media (min-width: 48rem)` | `display: table;` |
| `rb1gprtvq` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1gvba8j` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb1gxm80` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb1h5avxi` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb1haqai3` | `@layer utilities` | `display: flex;` |
| `rb1hh3mz1` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*3);` |
| `rb1ilufjk` | `@layer utilities` | `align-items: baseline;` |
| `rb1irsar5` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1iw5ar7` | `@layer utilities` | `white-space: nowrap;` |
| `rb1iwfi8i` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1j3w7uo` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*4);` |
