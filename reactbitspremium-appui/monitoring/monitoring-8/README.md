# monitoring-8

> **Category:** Monitoring (`monitoring`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-8](https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-8)  
> **Native Viewport:** `1280px × 720px`

Response times with a latency histogram

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`monitoring-8.jsx`](./monitoring-8.jsx) (minHeight: `720px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`monitoring-8.sorbet.jsx`](./monitoring-8.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 187 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 161 |
| **Buttons** | 21 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 9 / 0 |
| **ARIA Roles** | `img` |

### Visible Headings & Interactive Labels
- `Response times`
- `Latency distribution`
- `Route`
- `Req/s`
- `p50`
- `p90`
- `p99`
- `Errors`
- `POST /v2/checkout`
- `POST /v2/invoices`
- `GET /v2/search`
- `POST /v2/webhooks`
- `PUT /v2/profile`
- `GET /v2/orders`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 154)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb101mxwl` | `@layer utilities` | `display: grid;` |
| `rb104zntu` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb10gpql2` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb10ntzeq` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb10qpca1` | `@layer utilities` | `column-gap: calc(var(--spacing)*2);` |
| `rb10t3kd4` | `@layer utilities` | `grid-column: 1 / -1;` |
| `rb113qazb` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb11tdqur` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1269evc` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb13mv59b` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1460m8m` | `@layer utilities` | `user-select: none;` |
| `rb14n1ph2` | `@layer utilities` | `overflow: hidden;` |
| `rb15hzbnc` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-flow: column;` |
| `rb16cpa0i` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb16we4px` | `@layer utilities` | `background-color: oklch(0.652 0.219 26);` |
| `rb17gdgg2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb18fx1vr` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb18o0jxz` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb18r3wr2` | `@layer utilities` | `display: flex;` |
| `rb18srm2y` | `@layer utilities` | `--tw-border-spacing-x: calc(var(--spacing)*0); --tw-border-spacing-y: calc(var(--spacing)*0); border-spacing: var(--tw-border-spacing-x)var(` |
| `rb196wv46` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb19b2o0o` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb19sro2n` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1a1s29z` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*4);` |
| `rb1ab1v3b` | `@layer utilities` | `align-items: flex-end;` |
| `rb1afbc8c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1attnzr` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1b4d94l` | `@layer utilities › @media (min-width: 48rem)` | `display: table-cell;` |
| `rb1bcm6hv` | `@layer utilities` | `height: 100%;` |
| `rb1c4vf9o` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1d2vvm6` | `@layer utilities › @container (min-width: 28rem)` | `grid-column: auto;` |
| `rb1dsaw1n` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1dt3so` | `@layer utilities` | `padding: calc(var(--spacing)*.75);` |
| `rb1dym5b9` | `@layer utilities` | `align-items: baseline;` |
| `rb1e4bo8h` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1f4tdag` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1f70b80` | `@layer utilities` | `vertical-align: middle;` |
| `rb1fesyzf` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1fys6dd` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1gz28m5` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1i6c2sh` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb1j0avve` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1k70ap2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1kd9osn` | `@layer utilities` | `opacity: 0;` |
| `rb1knaj8j` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1l3jiy0` | `@layer utilities` | `display: inline-flex;` |
| `rb1lktqe` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1m5g09f` | `@layer utilities` | `height: 120px;` |
| `rb1n6xfa` | `@layer utilities` | `color: oklch(0.76 0.14 26);` |
| `rb1nww164` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb1omafwf` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1oyvea0` | `@layer utilities` | `margin-inline: auto;` |
| `rb1pbr1fh` | `@layer utilities` | `width: 88px;` |
| `rb1pqbtlu` | `@layer utilities` | `justify-content: space-between;` |
| `rb1qfk2c4` | `@layer utilities` | `text-align: center;` |
| `rb1r6wbjr` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1t1txyy` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1t8njiv` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1tp283s` | `@layer utilities` | `position: absolute;` |
| `rb1u2yyxx` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1vjz2mi` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1vtsfo9` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1vy85xb` | `@layer utilities` | `border-collapse: separate;` |
| `rb1xte7eq` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb1ykkvxw` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1yu1hr2` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb251rxf` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb295a48` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb2ma6vq` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb4bv0d8` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb5625mg` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-columns: minmax(0px, 1fr);` |
| `rb5f70mz` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb5g713m` | `@layer utilities` | `margin-inline: calc(var(--spacing)*-1.5);` |
| `rb5ny0vr` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb5xcbhg` | `@layer utilities` | `white-space: nowrap;` |
| `rb6ady2u` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb6cqkg5` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb711xhu` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
