# dashboard-7

> **Category:** Dashboard (`dashboard`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-7](https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-7)  
> **Native Viewport:** `1280px × 640px`

Dashboard loading and empty states

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`dashboard-7.jsx`](./dashboard-7.jsx) (minHeight: `640px`, hooks: `key`, `label`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`dashboard-7.sorbet.jsx`](./dashboard-7.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 68 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 133 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 5 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `region` |

### Visible Headings & Interactive Labels
- `Recurring revenue`
- `Ready`
- `Loading`
- `Empty`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 127)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb100rzgt` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb10eh8jg` | `@layer utilities` | `justify-content: center;` |
| `rb10g55ag` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb10g7fo` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb10xgk07` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb11emfi3` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb12achc8` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb12jhjy8` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb12qc4sn` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb13ke9p8` | `@layer utilities` | `pointer-events: none;` |
| `rb14eep8w` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb14sok7j` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb14wdnv7` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb156rqx9` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb174ue89` | `@layer utilities` | `white-space: nowrap;` |
| `rb17a0d` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb189iiv6` | `@layer utilities` | `position: relative;` |
| `rb1b0mqpg` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1bnf781` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1doo0iz` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1dt7f1d` | `@layer utilities` | `fill: rgba(245, 245, 245, 0.05);` |
| `rb1fkqrxi` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1g7zwqc` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb1h1co7h` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1hvbsvd` | `@layer utilities` | `font-size: 40px; line-height: 44px;` |
| `rb1iflm3w` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1j8jji6` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1j9mv2n` | `@layer utilities` | `width: calc(var(--spacing)*10);` |
| `rb1jxpd4l` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1lwz2py` | `@layer utilities` | `text-align: right;` |
| `rb1maxg1f` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1mue17x` | `@layer utilities` | `margin-top: auto;` |
| `rb1n1vbeh` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1novgia` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1nzvc4w` | `@layer utilities` | `margin-block: calc(var(--spacing)*-2);` |
| `rb1odxosq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1om2a3n` | `@layer utilities › @container (min-width: 28rem)` | `grid-column: auto;` |
| `rb1ozi9sn` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb1pavm3u` | `@layer utilities` | `display: grid;` |
| `rb1pavrt1` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1q0jo1f` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1q3ffcc` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1qpbo06` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1r3q66m` | `@layer utilities` | `align-items: stretch;` |
| `rb1rs9r5w` | `@layer utilities` | `text-wrap: pretty;` |
| `rb1rwf5w7` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1sfwe6i` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1t3ubz` | `@layer utilities` | `overflow: hidden;` |
| `rb1tkbncr` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1w632sx` | `@layer utilities` | `display: inline-flex;` |
| `rb1wf7xpn` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1xdknzv` | `@layer utilities` | `user-select: none;` |
| `rb1xukv1e` | `@layer utilities` | `flex-direction: column;` |
| `rb1ygwlhn` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1ypl3as` | `@layer utilities` | `cursor: pointer;` |
| `rb258ffj` | `@layer utilities` | `width: 100%;` |
| `rb2i7at2` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb2nttxc` | `@layer utilities` | `height: 100%;` |
| `rb32as7y` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb33gm2e` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb3cadwx` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb3hur2g` | `@layer utilities` | `align-self: center;` |
| `rb3odyy8` | `@layer utilities` | `stroke: var(--color-neutral-100);` |
| `rb3w9lav` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb42klo6` | `@layer utilities` | `align-items: baseline;` |
| `rb4brnjv` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb4gu2sn` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb4m5nm8` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb5bkur3` | `@layer utilities` | `stroke: rgba(245, 245, 245, 0.08);` |
| `rb5g4gp5` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb5kbbfd` | `@layer utilities` | `grid-template-columns: repeat(2, minmax(0px, 1fr));` |
| `rb65jnu0` | `@layer utilities` | `stroke: rgba(245, 245, 245, 0.05);` |
| `rb66uukl` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-flow: column;` |
| `rb695zcm` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb69c53e` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb6a39s2` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb73y8h7` | `@layer utilities` | `position: absolute;` |
| `rb90dl6k` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
