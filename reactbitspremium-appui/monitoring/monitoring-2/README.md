# monitoring-2

> **Category:** Monitoring (`monitoring`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-2](https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-2)  
> **Native Viewport:** `1280px × 640px`

Live metric stream with a threshold

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`monitoring-2.jsx`](./monitoring-2.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`monitoring-2.sorbet.jsx`](./monitoring-2.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 63 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 170 |
| **Buttons** | 4 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `img` |

### Visible Headings & Interactive Labels
- `Live stream`
- `Requests`
- `p99 latency`
- `Errors`
- `Pause`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 164)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb101mxwl` | `@layer utilities` | `display: grid;` |
| `rb10e4yaq` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb10gpql2` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb10ntzeq` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb10t3kd4` | `@layer utilities` | `grid-column: 1 / -1;` |
| `rb110jdld` | `@layer utilities` | `border-top-color: rgba(0, 0, 0, 0);` |
| `rb113qazb` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb11tdqur` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb13mv59b` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb13o0ox2` | `@layer utilities` | `flex-grow: 1;` |
| `rb13xff4c` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1460m8m` | `@layer utilities` | `user-select: none;` |
| `rb14ipdu5` | `@layer utilities` | `margin-inline-start: calc(var(--spacing)*.5);` |
| `rb14n1ph2` | `@layer utilities` | `overflow: hidden;` |
| `rb152w7rw` | `@layer utilities` | `fill: rgba(245, 245, 245, 0.05);` |
| `rb15hzbnc` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-flow: column;` |
| `rb17gdgg2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb18fx1vr` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb18o0jxz` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb18r3wr2` | `@layer utilities` | `display: flex;` |
| `rb18rvux1` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb18wl4qa` | `@layer utilities` | `stroke-width: 2px;` |
| `rb196wv46` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb19b2o0o` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb19qrhtt` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb19sro2n` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1afbc8c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1bcm6hv` | `@layer utilities` | `height: 100%;` |
| `rb1bqm5pf` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1brkbg2` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1c4vf9o` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1ccchv1` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1ctweqq` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1d2vvm6` | `@layer utilities › @container (min-width: 28rem)` | `grid-column: auto;` |
| `rb1d9ao0e` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1dt3so` | `@layer utilities` | `padding: calc(var(--spacing)*.75);` |
| `rb1dym5b9` | `@layer utilities` | `align-items: baseline;` |
| `rb1e3eanr` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb1e4bo8h` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1e6vc1` | `@layer utilities` | `stroke: var(--color-white);` |
| `rb1e7mfwh` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1eetms` | `@layer utilities` | `fill: var(--color-neutral-900);` |
| `rb1f4tdag` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1f9wio8` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1fesyzf` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1fiz18p` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1fr5afl` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1fys6dd` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1j0avve` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1j1bps1` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jzu34x` | `@layer utilities` | `stroke: var(--color-neutral-100);` |
| `rb1knaj8j` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1l3jiy0` | `@layer utilities` | `display: inline-flex;` |
| `rb1lktqe` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1lofz1b` | `@layer utilities` | `inset: calc(var(--spacing)*0);` |
| `rb1omafwf` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1oqzwj1` | `@layer utilities` | `stroke: rgba(245, 245, 245, 0.05);` |
| `rb1oyvea0` | `@layer utilities` | `margin-inline: auto;` |
| `rb1pc1bcr` | `@layer utilities` | `border-color: currentcolor;` |
| `rb1pqbtlu` | `@layer utilities` | `justify-content: space-between;` |
| `rb1so154d` | `@layer utilities` | `max-width: 100%;` |
| `rb1ss5b1e` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1t7ql03` | `@layer utilities` | `scale: 0.98;` |
| `rb1t8njiv` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1tp283s` | `@layer utilities` | `position: absolute;` |
| `rb1ty3jz1` | `@layer utilities` | `stroke: rgba(23, 23, 23, 0.05);` |
| `rb1u2yyxx` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1vr5wka` | `@layer utilities` | `font-size: 40px; line-height: 44px;` |
| `rb1vtsfo9` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1vwjsw2` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1wzjdi4` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1x8nl9t` | `@layer utilities` | `stroke: var(--color-neutral-900);` |
| `rb1xte7eq` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb1yi43f0` | `@layer utilities` | `fill: rgba(23, 23, 23, 0.05);` |
| `rb1ykkvxw` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1yu1hr2` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb20mtwh` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb295a48` | `@layer utilities` | `flex: 1 1 0%;` |
