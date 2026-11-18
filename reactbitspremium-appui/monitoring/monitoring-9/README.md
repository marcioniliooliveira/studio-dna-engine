# monitoring-9

> **Category:** Monitoring (`monitoring`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-9](https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-9)  
> **Native Viewport:** `1280px × 800px`

Live run queue grouped by state

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`monitoring-9.jsx`](./monitoring-9.jsx) (minHeight: `800px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`monitoring-9.sorbet.jsx`](./monitoring-9.sorbet.jsx) (minHeight: `800px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 367 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 227 |
| **Buttons** | 18 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 39 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Run queue`
- `Search runs`
- `Attention`
- `Collapse groups`
- `New run`
- `Running 5 Live executions streaming steps right now`
- `Waiting 4 Queued behind approvals, rate limits or schedules`
- `Failed 3 Stopped runs awaiting retry or escalation`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 223)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb104zntu` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb10e4yaq` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb10gpql2` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb10ntzeq` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb10vl4ak` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb110jdld` | `@layer utilities` | `border-top-color: rgba(0, 0, 0, 0);` |
| `rb113qazb` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb11aojnz` | `@layer utilities` | `column-gap: calc(var(--spacing)*4);` |
| `rb11tdqur` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb128m1jd` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb13mv59b` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb13t4qo3` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb13xff4c` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1460m8m` | `@layer utilities` | `user-select: none;` |
| `rb14n1ph2` | `@layer utilities` | `overflow: hidden;` |
| `rb14x0jk1` | `@layer utilities › @media (min-width: 40rem)` | `max-width: 300px;` |
| `rb15u7vra` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb15ummu0` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb15wj6ah` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1698caa` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb17gdgg2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb17mynn8` | `@layer utilities` | `opacity: 1;` |
| `rb1886wz7` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb18fx1vr` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb18o0jxz` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb18r3wr2` | `@layer utilities` | `display: flex;` |
| `rb18rvux1` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb193v5hh` | `@layer utilities` | `min-height: 800px;` |
| `rb196wv46` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb197t972` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb19b2o0o` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb19oggq4` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb19sro2n` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb19xqcem` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1afbc8c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1amm3n1` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1bcm6hv` | `@layer utilities` | `height: 100%;` |
| `rb1bqm5pf` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1brkbg2` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1c4vf9o` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1c7rwe5` | `@layer utilities` | `padding-block: calc(var(--spacing)*1.5);` |
| `rb1ccchv1` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1colow3` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1ctweqq` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1dsaw1n` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1dym5b9` | `@layer utilities` | `align-items: baseline;` |
| `rb1e4bo8h` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1e5r1kf` | `@layer utilities` | `transition-property: transform, translate, scale, rotate; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function` |
| `rb1efe1sq` | `@layer utilities › @media not all and (min-width: 40rem)` | `flex-basis: 100%;` |
| `rb1f4tdag` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1f9wio8` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1fesyzf` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1fr5afl` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1fys6dd` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1gfmcx6` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1gyzmdx` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1gz28m5` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1hnkim` | `@layer utilities` | `cursor: default;` |
| `rb1j0avve` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1jwob9k` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1jzu34x` | `@layer utilities` | `stroke: var(--color-neutral-100);` |
| `rb1jzwxz` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1k70ap2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1kd9osn` | `@layer utilities` | `opacity: 0;` |
| `rb1knaj8j` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1l3jiy0` | `@layer utilities` | `display: inline-flex;` |
| `rb1l552ie` | `@layer utilities` | `stroke: rgba(245, 245, 245, 0.08);` |
| `rb1lb6ur7` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1lktqe` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1lobhee` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1lozrlu` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1lvgxvn` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1mdu836` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1mfto42` | `@layer utilities › @media (min-width: 80rem)` | `display: block;` |
| `rb1mnug5m` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1mv7csb` | `@layer utilities` | `min-height: calc(var(--spacing)*8);` |
| `rb1n6xfa` | `@layer utilities` | `color: oklch(0.76 0.14 26);` |
| `rb1nb0hq8` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
