# dashboard-6

> **Category:** Dashboard (`dashboard`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-6](https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-6)  
> **Native Viewport:** `1280px × 800px`

Analytics overview with comparison mode

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`dashboard-6.jsx`](./dashboard-6.jsx) (minHeight: `800px`, hooks: `disconnect`, `key`, `label`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`dashboard-6.sorbet.jsx`](./dashboard-6.sorbet.jsx) (minHeight: `860px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 155 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 159 |
| **Buttons** | 4 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 16 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `switch`, `region` |

### Visible Headings & Interactive Labels
- `Channels`
- `Views`
- `Signups`
- `Revenue`
- `Channel`
- `Change`
- `Trend`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 158)

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
| `rb11u0hnf` | `@layer utilities › @media (min-width: 40rem)` | `padding-left: calc(var(--spacing)*6);` |
| `rb11yjn5d` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12qc4sn` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb13ke9p8` | `@layer utilities` | `pointer-events: none;` |
| `rb13qj790` | `@layer utilities` | `min-height: 800px;` |
| `rb147ewul` | `@layer utilities` | `text-align: left;` |
| `rb14eep8w` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb14sok7j` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb14wdnv7` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb156rqx9` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb16sotks` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb174ue89` | `@layer utilities` | `white-space: nowrap;` |
| `rb176o9ja` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb17a0d` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb189iiv6` | `@layer utilities` | `position: relative;` |
| `rb18jiqur` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.4);` |
| `rb1906ijd` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1ah80js` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1b0mqpg` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1bgl4cb` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1bnf781` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1doo0iz` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1eaj8ig` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1eg1xl6` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fhmtqg` | `@layer utilities` | `--tw-inset-ring-color: #17171780;` |
| `rb1fkqrxi` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1flhw2f` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb1fpaxt2` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1fq3s51` | `@layer utilities` | `stroke: rgba(245, 245, 245, 0.66);` |
| `rb1fvwbdh` | `@layer utilities` | `z-index: 20;` |
| `rb1g1jvmy` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1g3ld4u` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.8);` |
| `rb1g7zwqc` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb1h1co7h` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1h7565j` | `@layer utilities › @media (min-width: 40rem)` | `display: table-cell;` |
| `rb1i7oyg1` | `@layer utilities` | `--tw-inset-ring-color: #f5f5f566;` |
| `rb1iflm3w` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1ipnnop` | `@layer utilities` | `width: calc(var(--spacing)*16);` |
| `rb1j8jji6` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1jxpd4l` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1khnnnw` | `@layer utilities` | `transition-property: background-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-` |
| `rb1li3c02` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1lmvqcj` | `@layer utilities` | `--tw-inset-ring-color: #17171766;` |
| `rb1lwz2py` | `@layer utilities` | `text-align: right;` |
| `rb1maxg1f` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1ms65ua` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*4);` |
| `rb1n1vbeh` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1novgia` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1nv3hom` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 0px;` |
| `rb1odxosq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1ouww15` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1ozi9sn` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb1p64cqy` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1p7ur6w` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1pavrt1` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1ph6q2x` | `@layer utilities` | `position: sticky;` |
| `rb1pqk2cg` | `@layer utilities` | `height: calc(var(--spacing)*9);` |
| `rb1q0jo1f` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1q4kixj` | `@layer utilities` | `display: block;` |
| `rb1q5q7aa` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1qkvhua` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1qpbo06` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1r3q66m` | `@layer utilities` | `align-items: stretch;` |
| `rb1rwf5w7` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1sfwe6i` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1t2fao4` | `@layer utilities` | `height: calc(var(--spacing)*5);` |
| `rb1t2thmz` | `@layer utilities › @media (min-width: 40rem)` | `padding-right: calc(var(--spacing)*6);` |
| `rb1t3ubz` | `@layer utilities` | `overflow: hidden;` |
| `rb1tkbncr` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1u0uuxp` | `@layer utilities` | `--tw-translate-x: calc(var(--spacing)*4); translate: var(--tw-translate-x)var(--tw-translate-y);` |
| `rb1u1ifjd` | `@layer utilities` | `opacity: 1;` |
| `rb1v385bw` | `@layer utilities` | `transition-property: translate, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); tran` |
