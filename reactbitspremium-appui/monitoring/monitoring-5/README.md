# monitoring-5

> **Category:** Monitoring (`monitoring`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-5](https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-5)  
> **Native Viewport:** `1280px × 680px`

Live log tail with level filters

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`monitoring-5.jsx`](./monitoring-5.jsx) (minHeight: `680px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`monitoring-5.sorbet.jsx`](./monitoring-5.sorbet.jsx) (minHeight: `700px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 203 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 219 |
| **Buttons** | 33 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Live tail`
- `Follow`
- `Pause`
- `All`
- `Error`
- `Warn`
- `Info`
- `Debug`
- `Filter log lines`
- `09:04:00 info api-gateway GET /v2/orders 200 in 42ms`
- `09:04:07 debug catalog-api cache warm complete for tenant 4821`
- `09:04:14 warn invoice-worker vendor responded 503, scheduling retry 2 of 5`
- `09:04:21 info payments-edge charge authorised for ORD-99214`
- `09:04:28 error payments-edge charge timed out after 8s, releasing the hold`
- `09:04:35 info search-api reindex batch 18/64 committed`
- `09:04:42 debug edge-proxy upstream health probe ok`
- `09:04:49 warn search-api embeddings index read latency 1.9s`
- `09:04:56 info api-gateway GET /v2/orders 200 in 42ms`
- `09:05:03 debug catalog-api cache warm complete for tenant 4821`
- `09:05:10 warn invoice-worker vendor responded 503, scheduling retry 2 of 5`
- `09:05:17 info payments-edge charge authorised for ORD-99214`
- `09:05:24 error payments-edge charge timed out after 8s, releasing the hold`
- `09:05:31 info search-api reindex batch 18/64 committed`
- `09:05:38 debug edge-proxy upstream health probe ok`
- `09:05:45 warn search-api embeddings index read latency 1.9s`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 219)

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
| `rb11tdqur` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb128m1jd` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb13mv59b` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb13t4qo3` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb13xff4c` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1460m8m` | `@layer utilities` | `user-select: none;` |
| `rb14n1ph2` | `@layer utilities` | `overflow: hidden;` |
| `rb15u7vra` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb15ummu0` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb15wj6ah` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb17gdgg2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb17mynn8` | `@layer utilities` | `opacity: 1;` |
| `rb1886wz7` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb18fx1vr` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb18o0jxz` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb18r3wr2` | `@layer utilities` | `display: flex;` |
| `rb18rvux1` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb196wv46` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb197t972` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb19b2o0o` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb19qrhtt` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb19sro2n` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
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
| `rb1d9ao0e` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1dsaw1n` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1e3eanr` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb1e4bo8h` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1e7mfwh` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1efe1sq` | `@layer utilities › @media not all and (min-width: 40rem)` | `flex-basis: 100%;` |
| `rb1ekdcwk` | `@layer utilities` | `padding-block: 5px;` |
| `rb1f4tdag` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1f9wio8` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1fesyzf` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1feucr4` | `@layer utilities` | `color: oklch(0.49 0.1 68);` |
| `rb1fiz18p` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1fr5afl` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1fys6dd` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1gfmcx6` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1gyzmdx` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1gz28m5` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1hnkim` | `@layer utilities` | `cursor: default;` |
| `rb1j0avve` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1j1bps1` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jt2mmw` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1jwob9k` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1jyqtvo` | `@layer utilities` | `background-color: oklch(0.945 0.027 26 / 0.4);` |
| `rb1k70ap2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1kcib6w` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1kd9osn` | `@layer utilities` | `opacity: 0;` |
| `rb1knaj8j` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1l3jiy0` | `@layer utilities` | `display: inline-flex;` |
| `rb1lb6ur7` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1lflv78` | `@layer utilities › @media (min-width: 40rem)` | `max-width: 280px;` |
| `rb1lktqe` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1lobhee` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1lvgxvn` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1mg5g3y` | `@layer utilities` | `background-color: oklch(0.29 0.06 26 / 0.4);` |
| `rb1mnug5m` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1n6xfa` | `@layer utilities` | `color: oklch(0.76 0.14 26);` |
| `rb1nb0hq8` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1nuvmh9` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb1nvgqif` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
