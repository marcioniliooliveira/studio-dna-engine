# dashboard-5

> **Category:** Dashboard (`dashboard`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-5](https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-5)  
> **Native Viewport:** `1280px × 720px`

Usage dashboard with quota meters

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`dashboard-5.jsx`](./dashboard-5.jsx) (minHeight: `720px`, hooks: none)
- **Sorbet Source:** [`dashboard-5.sorbet.jsx`](./dashboard-5.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 95 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 133 |
| **Buttons** | 1 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 6 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Usage`
- `Upgrade plan`
- `Included this month`
- `Build minutes burn-down`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 133)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb100rzgt` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb10eh8jg` | `@layer utilities` | `justify-content: center;` |
| `rb10g55ag` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb10oc371` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb11emfi3` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb12achc8` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb12jhjy8` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb12qc4sn` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb13ke9p8` | `@layer utilities` | `pointer-events: none;` |
| `rb14p2f2j` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb14sok7j` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb14wdnv7` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb156rqx9` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb15w7n9n` | `@layer utilities` | `cursor: progress;` |
| `rb174ue89` | `@layer utilities` | `white-space: nowrap;` |
| `rb17a0d` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb188utvi` | `@layer utilities` | `height: calc(var(--spacing)*.5);` |
| `rb189iiv6` | `@layer utilities` | `position: relative;` |
| `rb18y0nhx` | `@layer utilities` | `height: calc(var(--spacing)*1.5);` |
| `rb194rg8a` | `@layer utilities` | `background-color: oklch(0.652 0.219 26);` |
| `rb19jgpk6` | `@layer utilities` | `scale: 0.98;` |
| `rb1b0mqpg` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1chqflv` | `@layer utilities` | `color: oklch(0.8 0.13 68);` |
| `rb1d1wdw3` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1dbqntc` | `@layer utilities` | `padding-top: calc(var(--spacing)*1);` |
| `rb1doo0iz` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1eg1xl6` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1flhw2f` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb1fq3s51` | `@layer utilities` | `stroke: rgba(245, 245, 245, 0.66);` |
| `rb1h5c8wz` | `@layer utilities` | `background-color: oklch(0.8 0.152 68);` |
| `rb1j9mv2n` | `@layer utilities` | `width: calc(var(--spacing)*10);` |
| `rb1jxpd4l` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1lfsg91` | `@layer utilities` | `background-color: oklch(0.8 0.152 68);` |
| `rb1lwz2py` | `@layer utilities` | `text-align: right;` |
| `rb1maxg1f` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1n1vbeh` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1nmiy0` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb1nzvc4w` | `@layer utilities` | `margin-block: calc(var(--spacing)*-2);` |
| `rb1odxosq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1pavm3u` | `@layer utilities` | `display: grid;` |
| `rb1pavrt1` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1q0jo1f` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1q3ffcc` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1q4kixj` | `@layer utilities` | `display: block;` |
| `rb1r0d96y` | `@layer utilities` | `margin-top: 1px;` |
| `rb1rh3cxo` | `@layer utilities` | `opacity: 0.4;` |
| `rb1rwf5w7` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1rygvw8` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb1sfwe6i` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1t3ubz` | `@layer utilities` | `overflow: hidden;` |
| `rb1u0qyrq` | `@layer utilities` | `width: calc(var(--spacing)*4);` |
| `rb1uket6s` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1w632sx` | `@layer utilities` | `display: inline-flex;` |
| `rb1wf7xpn` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1xdknzv` | `@layer utilities` | `user-select: none;` |
| `rb1xhsrns` | `@layer utilities` | `background-color: oklch(0.652 0.219 26);` |
| `rb1xku9hf` | `@layer utilities` | `overflow: visible;` |
| `rb1xl2ql7` | `@layer utilities` | `color: oklch(0.49 0.1 68);` |
| `rb1xt7k05` | `@layer utilities › @media (min-width: 64rem)` | `grid-template-columns: repeat(3, minmax(0px, 1fr));` |
| `rb1xukv1e` | `@layer utilities` | `flex-direction: column;` |
| `rb1y41gbd` | `@layer utilities` | `min-height: 720px;` |
| `rb1ygwlhn` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1ypl3as` | `@layer utilities` | `cursor: pointer;` |
| `rb21tp20` | `@layer utilities` | `outline-offset: 2px;` |
| `rb258ffj` | `@layer utilities` | `width: 100%;` |
| `rb2hqk66` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb2nttxc` | `@layer utilities` | `height: 100%;` |
| `rb32as7y` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb33gm2e` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb3cadwx` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb3odyy8` | `@layer utilities` | `stroke: var(--color-neutral-100);` |
| `rb3w9lav` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb42klo6` | `@layer utilities` | `align-items: baseline;` |
| `rb4brnjv` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb4grbe8` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb4gu2sn` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb4m5nm8` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb4qcicg` | `@layer utilities` | `grid-template-columns: repeat(1, minmax(0px, 1fr));` |
