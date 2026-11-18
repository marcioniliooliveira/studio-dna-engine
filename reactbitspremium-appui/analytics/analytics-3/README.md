# analytics-3

> **Category:** Analytics (`analytics`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/analytics/analytics-3](https://pro.reactbits.dev/docs/app-ui/analytics/analytics-3)  
> **Native Viewport:** `1280px × 640px`

Grouped bar chart with a tooltip

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`analytics-3.jsx`](./analytics-3.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`analytics-3.sorbet.jsx`](./analytics-3.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 38 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 99 |
| **Buttons** | 2 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | `img` |

### Visible Headings & Interactive Labels
- `This year`
- `Last year`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** Standard CSS / Inherited
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 96)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10puehu` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb13j9awi` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb13t56bl` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb145ulle` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb14efkqe` | `@layer utilities` | `stroke: rgba(23, 23, 23, 0.66);` |
| `rb17m3539` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb19ssnhj` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb1acihdu` | `@layer utilities` | `justify-content: space-between;` |
| `rb1aogtna` | `@layer utilities` | `overflow: hidden;` |
| `rb1b4cd38` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1bdwmkb` | `@layer utilities` | `cursor: pointer;` |
| `rb1befaqw` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1bgvqrd` | `@layer utilities` | `padding: calc(var(--spacing)*1);` |
| `rb1d2cwwq` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1desym6` | `@layer utilities` | `padding: calc(var(--spacing)*8);` |
| `rb1dk9eh1` | `@layer utilities` | `gap: calc(var(--spacing)*2.5);` |
| `rb1g134rs` | `@layer utilities` | `position: absolute;` |
| `rb1h8te4z` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1havkn4` | `@layer utilities` | `display: inline-block;` |
| `rb1i1f1z6` | `@layer utilities` | `align-items: flex-start;` |
| `rb1i4qwkb` | `@layer utilities` | `min-height: 640px;` |
| `rb1icg3et` | `@layer utilities` | `align-items: baseline;` |
| `rb1ixuf9t` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1kf9rhz` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1kwhe4` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1lpjeau` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1m1lmos` | `@layer utilities` | `width: 100%;` |
| `rb1mrm6f0` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1n0ycq0` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1naxyez` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1nux5sx` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1ppaqoj` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1q9voa8` | `@layer utilities` | `vertical-align: middle;` |
| `rb1r5l47k` | `@layer utilities` | `column-gap: calc(var(--spacing)*1);` |
| `rb1rmq0zq` | `@layer utilities` | `stroke: rgba(245, 245, 245, 0.66);` |
| `rb1rzjxah` | `@layer utilities` | `column-gap: calc(var(--spacing)*2);` |
| `rb1t77bf0` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1tcbjik` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1txksna` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1u81vc2` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1vdcdpi` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1vrfvf5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1w9lffd` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1wo4pxr` | `@layer utilities` | `align-items: center;` |
| `rb1xqnrz3` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb23uyrm` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb27vd6j` | `@layer utilities › @media (min-width: 40rem)` | `grid-template-columns: repeat(3, minmax(0px, 1fr));` |
| `rb2aewlh` | `@layer utilities` | `display: grid;` |
| `rb2e1fmr` | `@layer utilities` | `justify-content: safe center;` |
| `rb2vavpz` | `@layer utilities` | `width: calc(var(--spacing)*2); height: calc(var(--spacing)*2);` |
| `rb3qp4on` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb3z69ym` | `@layer utilities` | `display: flex;` |
| `rb43s8in` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb4liuzp` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb5b5ovh` | `@layer utilities` | `margin-inline-start: calc(var(--spacing)*.5);` |
| `rb5t541o` | `@layer utilities` | `fill: rgba(245, 245, 245, 0.05);` |
| `rb66neym` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb6g6odt` | `@layer utilities` | `grid-template-columns: repeat(1, minmax(0px, 1fr));` |
| `rb6kvol6` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb74vbr9` | `@layer utilities` | `align-self: center;` |
| `rb784ptv` | `@layer utilities` | `height: 100%;` |
| `rbac2wzj` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rbaga6hr` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rbbtgox8` | `@layer utilities` | `fill: rgba(23, 23, 23, 0.05);` |
| `rbbwymdy` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rbcnsqn8` | `@layer utilities` | `fill: var(--color-neutral-900);` |
| `rbcnz2vq` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rbcpo54f` | `@layer utilities` | `overflow-y: auto;` |
| `rbdhxvyn` | `@layer utilities` | `padding-block: calc(var(--spacing)*4);` |
| `rbdm15ub` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rbe4smfc` | `@layer utilities` | `display: inline-flex;` |
| `rbgi8mtd` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rbgsx3sq` | `@layer utilities` | `font-size: 40px; line-height: 44px;` |
| `rbhc7fwa` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rbj4grua` | `@layer utilities` | `cursor: crosshair;` |
| `rbjn8wy` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rbk01kwp` | `@layer utilities` | `position: relative;` |
| `rbl7187l` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
