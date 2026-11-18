# monitoring-6

> **Category:** Monitoring (`monitoring`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-6](https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-6)  
> **Native Viewport:** `1280px × 600px`

Uptime grid with daily status bars

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`monitoring-6.jsx`](./monitoring-6.jsx) (minHeight: `600px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`monitoring-6.sorbet.jsx`](./monitoring-6.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 644 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 158 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 6 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `img` |

### Visible Headings & Interactive Labels
- `All systems operational`
- `30d`
- `60d`
- `90d`
- `API`
- `Dashboard`
- `Payments`
- `Webhooks`
- `Search`
- `Asset CDN`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 154)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb101mxwl` | `@layer utilities` | `display: grid;` |
| `rb104zntu` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb10ntzeq` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb113qazb` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb11tdqur` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb13mv59b` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1460m8m` | `@layer utilities` | `user-select: none;` |
| `rb14n1ph2` | `@layer utilities` | `overflow: hidden;` |
| `rb14vhg46` | `@layer utilities` | `grid-column-start: 1;` |
| `rb16we4px` | `@layer utilities` | `background-color: oklch(0.652 0.219 26);` |
| `rb17gdgg2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb17mynn8` | `@layer utilities` | `opacity: 1;` |
| `rb18fx1vr` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb18o0jxz` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb18r3wr2` | `@layer utilities` | `display: flex;` |
| `rb196wv46` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1981fb0` | `@layer utilities` | `visibility: hidden;` |
| `rb19b2o0o` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb19qrhtt` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb19sro2n` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb19vr5c2` | `@layer utilities` | `margin-inline: calc(var(--spacing)*-2);` |
| `rb1afbc8c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1bcm6hv` | `@layer utilities` | `height: 100%;` |
| `rb1byiiub` | `@layer utilities` | `padding-top: calc(var(--spacing)*1);` |
| `rb1c4vf9o` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1colow3` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1d9ao0e` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1dsaw1n` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1e3eanr` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb1e4bo8h` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1e5r1kf` | `@layer utilities` | `transition-property: transform, translate, scale, rotate; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function` |
| `rb1e7mfwh` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1efe1sq` | `@layer utilities › @media not all and (min-width: 40rem)` | `flex-basis: 100%;` |
| `rb1f4tdag` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1fesyzf` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1fiz18p` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1fys6dd` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1gz28m5` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1j0avve` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1j1bps1` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jt2mmw` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1k70ap2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1kcib6w` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1kd9osn` | `@layer utilities` | `opacity: 0;` |
| `rb1knaj8j` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1l3jiy0` | `@layer utilities` | `display: inline-flex;` |
| `rb1lktqe` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1lvgxvn` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1mqs2gj` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*3);` |
| `rb1mv7csb` | `@layer utilities` | `min-height: calc(var(--spacing)*8);` |
| `rb1omafwf` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1oyvea0` | `@layer utilities` | `margin-inline: auto;` |
| `rb1p0ovcw` | `@layer utilities` | `justify-self: flex-end;` |
| `rb1pqbtlu` | `@layer utilities` | `justify-content: space-between;` |
| `rb1qb948a` | `@layer utilities › @media (min-width: 40rem)` | `gap: 2px;` |
| `rb1r6wbjr` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1sb7v54` | `@layer utilities` | `grid-row-start: 1;` |
| `rb1so154d` | `@layer utilities` | `max-width: 100%;` |
| `rb1t1txyy` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1t8njiv` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1ti0gt3` | `@layer utilities` | `max-width: 1000px;` |
| `rb1tp283s` | `@layer utilities` | `position: absolute;` |
| `rb1u2yyxx` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1vtsfo9` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1vwjsw2` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1y99ts2` | `@layer utilities` | `background-color: oklch(0.8 0.152 68);` |
| `rb1ykkvxw` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1yu1hr2` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb20mtwh` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb251rxf` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb295a48` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb3zalkd` | `@layer utilities` | `rotate: 90deg;` |
| `rb4bv0d8` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb5pe1ut` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb5xcbhg` | `@layer utilities` | `white-space: nowrap;` |
| `rb6ady2u` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb6o4wma` | `@layer utilities` | `gap: 1px;` |
| `rb76mjsc` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
