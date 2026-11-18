# analytics-10

> **Category:** Analytics (`analytics`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/analytics/analytics-10](https://pro.reactbits.dev/docs/app-ui/analytics/analytics-10)  
> **Native Viewport:** `1280px × 560px`

Radial goal gauges

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`analytics-10.jsx`](./analytics-10.jsx) (minHeight: `560px`, hooks: `height`, `left`, `top`, `useMemo`, `useRef`, `useState`, `width`)
- **Sorbet Source:** [`analytics-10.sorbet.jsx`](./analytics-10.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 54 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 136 |
| **Buttons** | 7 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `button` |

### Visible Headings & Interactive Labels
- `Quarterly goals`
- `Q1`
- `Q2`
- `Q3`
- `Q4`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 132)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10btz2z` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
| `rb10puehu` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1130axy` | `@layer utilities` | `min-height: 560px;` |
| `rb11ghz0s` | `@layer utilities` | `width: fit-content;` |
| `rb11mxlqi` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb12pxq10` | `@layer utilities` | `white-space: nowrap;` |
| `rb13j9awi` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb13t56bl` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb145ulle` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb149l481` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb15epeuv` | `@layer utilities` | `align-items: stretch;` |
| `rb15fkrw4` | `@layer utilities` | `text-align: center;` |
| `rb15qyqp3` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
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
| `rb1d2cwwq` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1dccilp` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1desym6` | `@layer utilities` | `padding: calc(var(--spacing)*8);` |
| `rb1dtjm6o` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1enfnix` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1fphr0y` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1g134rs` | `@layer utilities` | `position: absolute;` |
| `rb1h8te4z` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1hoa3v1` | `@layer utilities` | `max-width: 100%;` |
| `rb1i1f1z6` | `@layer utilities` | `align-items: flex-start;` |
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
| `rb1o4wrhw` | `@layer utilities` | `gap: calc(var(--spacing)*6);` |
| `rb1ogcr7v` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1oz8st9` | `@layer utilities` | `z-index: 70;` |
| `rb1ppaqoj` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1rq2bs0` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1s319kx` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1s8i9t3` | `@layer utilities` | `opacity: 0;` |
| `rb1t77bf0` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1tcbjik` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1tkz7gw` | `@layer utilities` | `--tw-shadow: 0 12px 24px -12px var(--tw-shadow-color,#0009); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-of` |
| `rb1u81vc2` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1vdcdpi` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1vg0jam` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1w9lffd` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1wo4pxr` | `@layer utilities` | `align-items: center;` |
| `rb1xqnrz3` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1ym20vu` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb23uyrm` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb27vd6j` | `@layer utilities › @media (min-width: 40rem)` | `grid-template-columns: repeat(3, minmax(0px, 1fr));` |
| `rb2ab1sv` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb2aewlh` | `@layer utilities` | `display: grid;` |
| `rb2e1fmr` | `@layer utilities` | `justify-content: safe center;` |
| `rb2h8n2n` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb3qp4on` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb3u7p4c` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb3z69ym` | `@layer utilities` | `display: flex;` |
| `rb43s8in` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb5t541o` | `@layer utilities` | `fill: rgba(245, 245, 245, 0.05);` |
| `rb61nux9` | `@layer utilities` | `--tw-duration: .16s; transition-duration: 0.16s;` |
| `rb66neym` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb6g6odt` | `@layer utilities` | `grid-template-columns: repeat(1, minmax(0px, 1fr));` |
| `rb6kvol6` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb784ptv` | `@layer utilities` | `height: 100%;` |
