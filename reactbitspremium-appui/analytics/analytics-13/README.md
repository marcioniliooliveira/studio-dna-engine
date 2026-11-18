# analytics-13

> **Category:** Analytics (`analytics`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/analytics/analytics-13](https://pro.reactbits.dev/docs/app-ui/analytics/analytics-13)  
> **Native Viewport:** `1280px × 640px`

Candlestick chart with volume

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`analytics-13.jsx`](./analytics-13.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`analytics-13.sorbet.jsx`](./analytics-13.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 208 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 143 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `img` |

### Visible Headings & Interactive Labels
- `30D`
- `90D`
- `1Y`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 142)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10btz2z` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
| `rb10puehu` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb11ghz0s` | `@layer utilities` | `width: fit-content;` |
| `rb11mxlqi` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb12pxq10` | `@layer utilities` | `white-space: nowrap;` |
| `rb13j9awi` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb13t56bl` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb145ulle` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb149l481` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb14efkqe` | `@layer utilities` | `stroke: rgba(23, 23, 23, 0.66);` |
| `rb15epeuv` | `@layer utilities` | `align-items: stretch;` |
| `rb16m0rhl` | `@layer utilities` | `fill: rgba(23, 23, 23, 0.66);` |
| `rb16qx0uu` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb17m3539` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb17sxrm8` | `@layer utilities` | `overflow: visible;` |
| `rb1a12t0h` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1acihdu` | `@layer utilities` | `justify-content: space-between;` |
| `rb1aogtna` | `@layer utilities` | `overflow: hidden;` |
| `rb1b4cd38` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1bdwmkb` | `@layer utilities` | `cursor: pointer;` |
| `rb1boewfv` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb1byj2s9` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1dccilp` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1desym6` | `@layer utilities` | `padding: calc(var(--spacing)*8);` |
| `rb1dk9eh1` | `@layer utilities` | `gap: calc(var(--spacing)*2.5);` |
| `rb1dtjm6o` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1e210j0` | `@layer utilities` | `font-size: 12px;` |
| `rb1enfnix` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1fphr0y` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1g134rs` | `@layer utilities` | `position: absolute;` |
| `rb1h8te4z` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1havkn4` | `@layer utilities` | `display: inline-block;` |
| `rb1hoa3v1` | `@layer utilities` | `max-width: 100%;` |
| `rb1i1f1z6` | `@layer utilities` | `align-items: flex-start;` |
| `rb1i4qwkb` | `@layer utilities` | `min-height: 640px;` |
| `rb1icg3et` | `@layer utilities` | `align-items: baseline;` |
| `rb1it720` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1ixuf9t` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1j7u9ee` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb1jceew2` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1kf9rhz` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1kwhe4` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1ky0on9` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1kyjlfw` | `@layer utilities` | `--tw-shadow: 0 12px 24px -12px var(--tw-shadow-color,#0003);` |
| `rb1m1lmos` | `@layer utilities` | `width: 100%;` |
| `rb1mrm6f0` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1naxyez` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1notwkk` | `@layer utilities` | `translate: var(--tw-translate-x)var(--tw-translate-y);` |
| `rb1od5fud` | `@layer utilities` | `text-align: right;` |
| `rb1ogcr7v` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1oz8st9` | `@layer utilities` | `z-index: 70;` |
| `rb1ppaqoj` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1q9voa8` | `@layer utilities` | `vertical-align: middle;` |
| `rb1r5l47k` | `@layer utilities` | `column-gap: calc(var(--spacing)*1);` |
| `rb1rmq0zq` | `@layer utilities` | `stroke: rgba(245, 245, 245, 0.66);` |
| `rb1rpkbli` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1rq2bs0` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1rxjc0e` | `@layer utilities` | `display: block;` |
| `rb1rzjxah` | `@layer utilities` | `column-gap: calc(var(--spacing)*2);` |
| `rb1s319kx` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1s8i9t3` | `@layer utilities` | `opacity: 0;` |
| `rb1t77bf0` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1tcbjik` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1tkz7gw` | `@layer utilities` | `--tw-shadow: 0 12px 24px -12px var(--tw-shadow-color,#0009); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-of` |
| `rb1u81vc2` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1v4y6bd` | `@layer utilities` | `fill: rgba(245, 245, 245, 0.66);` |
| `rb1vdcdpi` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1vg0jam` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1w9lffd` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1wknr6j` | `@layer utilities` | `grid-template-columns: auto 1fr;` |
| `rb1wo4pxr` | `@layer utilities` | `align-items: center;` |
| `rb1xqnrz3` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1ym20vu` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb23uyrm` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb2ab1sv` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb2aewlh` | `@layer utilities` | `display: grid;` |
| `rb2b3j5p` | `@layer utilities` | `stroke: rgba(23, 23, 23, 0.05);` |
| `rb2e1fmr` | `@layer utilities` | `justify-content: safe center;` |
