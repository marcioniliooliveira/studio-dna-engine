# dashboard-1

> **Category:** Dashboard (`dashboard`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-1](https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-1)  
> **Native Viewport:** `1280px × 640px`

Metric cards with sparklines

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`dashboard-1.jsx`](./dashboard-1.jsx) (minHeight: `640px`, hooks: `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`dashboard-1.sorbet.jsx`](./dashboard-1.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 101 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 134 |
| **Buttons** | 1 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 16 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Revenue`
- `Last 6 months`
- `Net revenue by month`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 128)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10eh8jg` | `@layer utilities` | `justify-content: center;` |
| `rb10g55ag` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb11emfi3` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb12achc8` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb12jhjy8` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb12qc4sn` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1330d0x` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb13ke9p8` | `@layer utilities` | `pointer-events: none;` |
| `rb147ewul` | `@layer utilities` | `text-align: left;` |
| `rb14sok7j` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb14wdnv7` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb156rqx9` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb174ue89` | `@layer utilities` | `white-space: nowrap;` |
| `rb17a0d` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb17z8qes` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb188zx26` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb189iiv6` | `@layer utilities` | `position: relative;` |
| `rb199uxoc` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1b0mqpg` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1b94t4d` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1c6guq7` | `@layer utilities` | `fill: var(--color-neutral-900);` |
| `rb1c9jmdh` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb1d5j8m` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1doo0iz` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1eaj8ig` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1fkqrxi` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1ipnnop` | `@layer utilities` | `width: calc(var(--spacing)*16);` |
| `rb1j9mv2n` | `@layer utilities` | `width: calc(var(--spacing)*10);` |
| `rb1kqn3j7` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1lwz2py` | `@layer utilities` | `text-align: right;` |
| `rb1m494hx` | `@layer utilities` | `max-width: 64px;` |
| `rb1maxg1f` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1mue17x` | `@layer utilities` | `margin-top: auto;` |
| `rb1n1vbeh` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1novgia` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1nzvc4w` | `@layer utilities` | `margin-block: calc(var(--spacing)*-2);` |
| `rb1odxosq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1om2a3n` | `@layer utilities › @container (min-width: 28rem)` | `grid-column: auto;` |
| `rb1p3sfha` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1pavm3u` | `@layer utilities` | `display: grid;` |
| `rb1pavrt1` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1pbe9oe` | `@layer utilities` | `align-items: flex-end;` |
| `rb1q0jo1f` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1q3ffcc` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1q4kixj` | `@layer utilities` | `display: block;` |
| `rb1qnemqa` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1rs9r5w` | `@layer utilities` | `text-wrap: pretty;` |
| `rb1rwf5w7` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1sfwe6i` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1t3ubz` | `@layer utilities` | `overflow: hidden;` |
| `rb1w632sx` | `@layer utilities` | `display: inline-flex;` |
| `rb1wf7xpn` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1xdknzv` | `@layer utilities` | `user-select: none;` |
| `rb1xff2yd` | `@layer utilities` | `text-align: center;` |
| `rb1xuhcnp` | `@layer utilities` | `fill: var(--color-neutral-100);` |
| `rb1xukv1e` | `@layer utilities` | `flex-direction: column;` |
| `rb1ygwlhn` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1ypl3as` | `@layer utilities` | `cursor: pointer;` |
| `rb258ffj` | `@layer utilities` | `width: 100%;` |
| `rb2nttxc` | `@layer utilities` | `height: 100%;` |
| `rb32as7y` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb33gm2e` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb39ji59` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb3cadwx` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb3hur2g` | `@layer utilities` | `align-self: center;` |
| `rb3odyy8` | `@layer utilities` | `stroke: var(--color-neutral-100);` |
| `rb3w9lav` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb42klo6` | `@layer utilities` | `align-items: baseline;` |
| `rb42scui` | `@layer utilities › @container (min-width: 13rem)` | `display: block;` |
| `rb4brnjv` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb4gu2sn` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb4m5nm8` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb5bkur3` | `@layer utilities` | `stroke: rgba(245, 245, 245, 0.08);` |
| `rb5kbbfd` | `@layer utilities` | `grid-template-columns: repeat(2, minmax(0px, 1fr));` |
| `rb65jnu0` | `@layer utilities` | `stroke: rgba(245, 245, 245, 0.05);` |
| `rb66uukl` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-flow: column;` |
| `rb695zcm` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb6a39s2` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
