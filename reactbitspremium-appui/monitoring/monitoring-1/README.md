# monitoring-1

> **Category:** Monitoring (`monitoring`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-1](https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-1)  
> **Native Viewport:** `1280px × 760px`

Platform health with an incident feed

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`monitoring-1.jsx`](./monitoring-1.jsx) (minHeight: `760px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`monitoring-1.sorbet.jsx`](./monitoring-1.sorbet.jsx) (minHeight: `760px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 129 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 206 |
| **Buttons** | 8 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 10 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `img` |

### Visible Headings & Interactive Labels
- `Platform health`
- `1h`
- `24h`
- `7d`
- `Request throughput`
- `Incident activity`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 197)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb101mxwl` | `@layer utilities` | `display: grid;` |
| `rb104zntu` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb10e4yaq` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb10gpql2` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb10ntzeq` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb10t3kd4` | `@layer utilities` | `grid-column: 1 / -1;` |
| `rb110jdld` | `@layer utilities` | `border-top-color: rgba(0, 0, 0, 0);` |
| `rb113qazb` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb11tdqur` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb128m1jd` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb12bk80i` | `@layer utilities` | `cursor: crosshair;` |
| `rb13mv59b` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb13xff4c` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1460m8m` | `@layer utilities` | `user-select: none;` |
| `rb14n1ph2` | `@layer utilities` | `overflow: hidden;` |
| `rb152w7rw` | `@layer utilities` | `fill: rgba(245, 245, 245, 0.05);` |
| `rb15hzbnc` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-flow: column;` |
| `rb17gdgg2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb18fx1vr` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb18o0jxz` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb18r3wr2` | `@layer utilities` | `display: flex;` |
| `rb18rvux1` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb196wv46` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb198axor` | `@layer utilities` | `min-height: 280px;` |
| `rb19b2o0o` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb19oggq4` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb19qrhtt` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb19sro2n` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1afbc8c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1bcm6hv` | `@layer utilities` | `height: 100%;` |
| `rb1bqm5pf` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1brkbg2` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1c4vf9o` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1ccchv1` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1colow3` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1ctweqq` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1d2vvm6` | `@layer utilities › @container (min-width: 28rem)` | `grid-column: auto;` |
| `rb1d9ao0e` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1dsaw1n` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1dt3so` | `@layer utilities` | `padding: calc(var(--spacing)*.75);` |
| `rb1dym5b9` | `@layer utilities` | `align-items: baseline;` |
| `rb1e3eanr` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb1e4bo8h` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1e74cpk` | `@layer utilities` | `min-height: 760px;` |
| `rb1e7mfwh` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1f4tdag` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1f9wio8` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1fesyzf` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1feucr4` | `@layer utilities` | `color: oklch(0.49 0.1 68);` |
| `rb1fiz18p` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1fr5afl` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1fys6dd` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1gz28m5` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1j0avve` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1j1bps1` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jzu34x` | `@layer utilities` | `stroke: var(--color-neutral-100);` |
| `rb1jzwxz` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1kd9osn` | `@layer utilities` | `opacity: 0;` |
| `rb1knaj8j` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1kzuk6q` | `@layer utilities › @media (min-width: 64rem)` | `min-height: calc(var(--spacing)*0);` |
| `rb1l3jiy0` | `@layer utilities` | `display: inline-flex;` |
| `rb1lktqe` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1lobhee` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1lofz1b` | `@layer utilities` | `inset: calc(var(--spacing)*0);` |
| `rb1lvgxvn` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1mgsgrk` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*2);` |
| `rb1n6xfa` | `@layer utilities` | `color: oklch(0.76 0.14 26);` |
| `rb1n9niog` | `@layer utilities` | `min-height: 180px;` |
| `rb1nb0hq8` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1omafwf` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1oqzwj1` | `@layer utilities` | `stroke: rgba(245, 245, 245, 0.05);` |
| `rb1pc1bcr` | `@layer utilities` | `border-color: currentcolor;` |
| `rb1pqbtlu` | `@layer utilities` | `justify-content: space-between;` |
| `rb1so154d` | `@layer utilities` | `max-width: 100%;` |
| `rb1ss5b1e` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1t1txyy` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1t7ql03` | `@layer utilities` | `scale: 0.98;` |
| `rb1t8njiv` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
