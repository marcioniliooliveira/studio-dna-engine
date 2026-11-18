# monitoring-10

> **Category:** Monitoring (`monitoring`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-10](https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-10)  
> **Native Viewport:** `1280px × 640px`

Error budgets with a burn-down chart

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`monitoring-10.jsx`](./monitoring-10.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`monitoring-10.sorbet.jsx`](./monitoring-10.sorbet.jsx) (minHeight: `700px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 116 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 168 |
| **Buttons** | 8 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 2 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `img`, `progressbar` |

### Visible Headings & Interactive Labels
- `Service level objectives`
- `7d`
- `30d`
- `90d`
- `Checkout availability error budget`
- `Checkout availability Target 99.9% current 99.62% 12% budget left 4.2× Budget critical`
- `API latency Target 99% current 99.24% 64% budget left 1.1× Healthy`
- `Search freshness Target 99.5% current 99.44% 38% budget left 1.9× Burning fast`
- `Webhook delivery Target 99.9% current 99.97% 88% budget left 0.4× Healthy`
- `Dashboard uptime Target 99.95% current 99.99% 92% budget left 0.2× Healthy`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 165)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb104zntu` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb10gpql2` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb10ntzeq` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb10qpca1` | `@layer utilities` | `column-gap: calc(var(--spacing)*2);` |
| `rb113qazb` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb11tdqur` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb12g0x6y` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb13mv59b` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1460m8m` | `@layer utilities` | `user-select: none;` |
| `rb14n1ph2` | `@layer utilities` | `overflow: hidden;` |
| `rb152w7rw` | `@layer utilities` | `fill: rgba(245, 245, 245, 0.05);` |
| `rb16eqdx5` | `@layer utilities` | `width: 112px;` |
| `rb16we4px` | `@layer utilities` | `background-color: oklch(0.652 0.219 26);` |
| `rb17f227i` | `@layer utilities` | `display: block;` |
| `rb17gdgg2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb17mynn8` | `@layer utilities` | `opacity: 1;` |
| `rb18fx1vr` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb18o0jxz` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb18r3wr2` | `@layer utilities` | `display: flex;` |
| `rb196wv46` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb19b2o0o` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb19oggq4` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb19qrhtt` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb19sro2n` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1afbc8c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1bcm6hv` | `@layer utilities` | `height: 100%;` |
| `rb1c4vf9o` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1colow3` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1d9ao0e` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1dsaw1n` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1dym5b9` | `@layer utilities` | `align-items: baseline;` |
| `rb1e3eanr` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb1e4bo8h` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1e7mfwh` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1f4tdag` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1fesyzf` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1feucr4` | `@layer utilities` | `color: oklch(0.49 0.1 68);` |
| `rb1fiz18p` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1fys6dd` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1g6ssa5` | `@layer utilities › @media not all and (min-width: 48rem)` | `display: none;` |
| `rb1gsqzga` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb1gz28m5` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1j0avve` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1j1bps1` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jzwxz` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1k70ap2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1kd9osn` | `@layer utilities` | `opacity: 0;` |
| `rb1knaj8j` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1l3jiy0` | `@layer utilities` | `display: inline-flex;` |
| `rb1lktqe` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1lvgxvn` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1mb39wq` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1mbyme8` | `@layer utilities` | `width: 140px;` |
| `rb1n6xfa` | `@layer utilities` | `color: oklch(0.76 0.14 26);` |
| `rb1omafwf` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1oqzwj1` | `@layer utilities` | `stroke: rgba(245, 245, 245, 0.05);` |
| `rb1oyvea0` | `@layer utilities` | `margin-inline: auto;` |
| `rb1pqbtlu` | `@layer utilities` | `justify-content: space-between;` |
| `rb1r6wbjr` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1s19pq6` | `@layer utilities › @media (min-width: 40rem)` | `display: block;` |
| `rb1so154d` | `@layer utilities` | `max-width: 100%;` |
| `rb1t1txyy` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1t5jv40` | `@layer utilities` | `width: 52px;` |
| `rb1t8njiv` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1ti0gt3` | `@layer utilities` | `max-width: 1000px;` |
| `rb1tp283s` | `@layer utilities` | `position: absolute;` |
| `rb1ty3jz1` | `@layer utilities` | `stroke: rgba(23, 23, 23, 0.05);` |
| `rb1u2yyxx` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1vtsfo9` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1vwjsw2` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1y99ts2` | `@layer utilities` | `background-color: oklch(0.8 0.152 68);` |
| `rb1yi43f0` | `@layer utilities` | `fill: rgba(23, 23, 23, 0.05);` |
| `rb1ykkvxw` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1yu1hr2` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb20mtwh` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb251rxf` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb295a48` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb2ma6vq` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
