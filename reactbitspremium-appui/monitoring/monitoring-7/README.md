# monitoring-7

> **Category:** Monitoring (`monitoring`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-7](https://pro.reactbits.dev/docs/app-ui/monitoring/monitoring-7)  
> **Native Viewport:** `1280px × 720px`

Fleet table with utilization meters

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`monitoring-7.jsx`](./monitoring-7.jsx) (minHeight: `720px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`monitoring-7.sorbet.jsx`](./monitoring-7.sorbet.jsx) (minHeight: `760px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 322 |
| **Max DOM Depth** | 14 |
| **Atomic/Scoped Classes** | 222 |
| **Buttons** | 13 |
| **Inputs / Textareas / Selects** | 1 / 0 / 1 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 6 / 0 |
| **ARIA Roles** | `combobox`, `progressbar` |

### Visible Headings & Interactive Labels
- `Fleet`
- `Region`
- `All regions`
- `Search hosts`
- `Node`
- `Status`
- `CPU`
- `Memory`
- `Disk`
- `Uptime`
- `api-eu-02 API eu-west-1 Critical CPU 91% Memory 78% Disk 41% 34d`
- `worker-eu-01 Worker eu-west-1 Healthy CPU 58% Memory 71% Disk 55% 12d`
- `db-primary Database eu-west-1 Warning CPU 52% Memory 84% Disk 66% 128d`
- `api-eu-01 API eu-west-1 Healthy CPU 44% Memory 62% Disk 38% 34d`
- `worker-us-01 Worker us-east-1 Warning CPU 36% Memory 49% Disk 87% 61d`
- `edge-ap-01 Edge ap-south-1 Healthy CPU 29% Memory 41% Disk 22% 9d`
- `db-replica-01 Database us-east-1 Healthy CPU 21% Memory 47% Disk 64% 128d`
- `cache-eu-01 Cache eu-west-1 Healthy CPU 18% Memory 33% Disk 12% 77d`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 220)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb101mxwl` | `@layer utilities` | `display: grid;` |
| `rb104b5x2` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb104zntu` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb10gpql2` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb10ntzeq` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb10vl4ak` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb113qazb` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb11tdqur` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1269evc` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb128m1jd` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb12d1vdm` | `@layer utilities` | `min-width: calc(var(--spacing)*40);` |
| `rb12g0x6y` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb13mv59b` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb13t4qo3` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb13xff4c` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1460m8m` | `@layer utilities` | `user-select: none;` |
| `rb14n1ph2` | `@layer utilities` | `overflow: hidden;` |
| `rb15u7vra` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb15ummu0` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb15wj6ah` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb16cpa0i` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb16oqbg7` | `@layer utilities › @media (min-width: 80rem)` | `width: 132px;` |
| `rb16vwwk4` | `@layer utilities` | `white-space: normal;` |
| `rb16we4px` | `@layer utilities` | `background-color: oklch(0.652 0.219 26);` |
| `rb17f227i` | `@layer utilities` | `display: block;` |
| `rb17gdgg2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb17mhuwo` | `@layer utilities` | `width: 148px;` |
| `rb1886wz7` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb18fx1vr` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb18o0jxz` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb18r3wr2` | `@layer utilities` | `display: flex;` |
| `rb18srm2y` | `@layer utilities` | `--tw-border-spacing-x: calc(var(--spacing)*0); --tw-border-spacing-y: calc(var(--spacing)*0); border-spacing: var(--tw-border-spacing-x)var(` |
| `rb196wv46` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb197t972` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb1981fb0` | `@layer utilities` | `visibility: hidden;` |
| `rb19b2o0o` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb19sro2n` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1a1s29z` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*4);` |
| `rb1afbc8c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1amm3n1` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1attnzr` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1b4d94l` | `@layer utilities › @media (min-width: 48rem)` | `display: table-cell;` |
| `rb1bcm6hv` | `@layer utilities` | `height: 100%;` |
| `rb1c4vf9o` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1ctweqq` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1dsaw1n` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1dym5b9` | `@layer utilities` | `align-items: baseline;` |
| `rb1e4bo8h` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1f4tdag` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1f70b80` | `@layer utilities` | `vertical-align: middle;` |
| `rb1fesyzf` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1feucr4` | `@layer utilities` | `color: oklch(0.49 0.1 68);` |
| `rb1fr4b6d` | `@layer utilities › @media (min-width: 48rem)` | `width: 104px;` |
| `rb1fys6dd` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1gfmcx6` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1gyzmdx` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1gz28m5` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1hnkim` | `@layer utilities` | `cursor: default;` |
| `rb1j0avve` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1jeg6n2` | `@layer utilities › @media (min-width: 80rem)` | `display: table-cell;` |
| `rb1jt2mmw` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1jwob9k` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1k70ap2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1kcgvl6` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1kcib6w` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1kd9osn` | `@layer utilities` | `opacity: 0;` |
| `rb1knaj8j` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1l3jiy0` | `@layer utilities` | `display: inline-flex;` |
| `rb1l8kzer` | `@layer utilities › @media (min-width: 64rem)` | `display: block;` |
| `rb1lb6ur7` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1lktqe` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1mb39wq` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1mfto42` | `@layer utilities › @media (min-width: 80rem)` | `display: block;` |
| `rb1mnug5m` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1mpx6qu` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1mqs2gj` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*3);` |
| `rb1n6xfa` | `@layer utilities` | `color: oklch(0.76 0.14 26);` |
| `rb1nuvmh9` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
