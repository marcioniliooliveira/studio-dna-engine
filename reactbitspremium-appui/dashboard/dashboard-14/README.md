# dashboard-14

> **Category:** Dashboard (`dashboard`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-14](https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-14)  
> **Native Viewport:** `1280px × 720px`

Service board with a detail view

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`dashboard-14.jsx`](./dashboard-14.jsx) (minHeight: `720px`, hooks: `disconnect`, `label`, `observe`, `spark`, `tone`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`dashboard-14.sorbet.jsx`](./dashboard-14.sorbet.jsx) (minHeight: `800px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 247 |
| **Max DOM Depth** | 14 |
| **Atomic/Scoped Classes** | 229 |
| **Buttons** | 12 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 17 / 0 |
| **ARIA Roles** | `application` |

### Visible Headings & Interactive Labels
- `Service health`
- `Refresh`
- `Checkout API core/checkout eu-west-1 Healthy`
- `Ledger writer core/ledger eu-west-1 Degraded`
- `Media pipeline media/encode us-east-2 Healthy`
- `Search index search/index us-east-2 Healthy`
- `Webhook relay core/relay ap-south-1 Failing`
- `Identity gateway core/identity eu-west-1 Healthy`
- `Notification fan-out growth/notify us-east-2 Degraded`
- `Billing sync core/billing eu-west-1 Healthy`
- `Asset CDN edge media/edge global Healthy`
- `Ledger writer`
- `Logs`
- `Roll back`
- `Throughput`
- `Recent activity`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 225)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb100rzgt` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb105st6f` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*1.5);` |
| `rb10eh8jg` | `@layer utilities` | `justify-content: center;` |
| `rb10g55ag` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb116a9hy` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb11c1mtb` | `@layer utilities › @media (min-width: 40rem)` | `display: inline-flex;` |
| `rb11ce4bs` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb11emfi3` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb11kd4vc` | `@layer utilities › @media not all and (min-width: 64rem)` | `overflow-y: auto;` |
| `rb11lkasr` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb11ntp4d` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb11svz3a` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb11yjn5d` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12achc8` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb12jhjy8` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb12kz3rh` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb12qc4sn` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1330d0x` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb13817bm` | `@layer utilities › @media (min-width: 64rem)` | `grid-template-columns: 320px minmax(0px, 1fr);` |
| `rb13ke9p8` | `@layer utilities` | `pointer-events: none;` |
| `rb13tbfkp` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb147ewul` | `@layer utilities` | `text-align: left;` |
| `rb14p2f2j` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb14sok7j` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb14wdnv7` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb156rqx9` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb15840rc` | `@layer utilities` | `min-height: 130px;` |
| `rb15w7n9n` | `@layer utilities` | `cursor: progress;` |
| `rb16sotks` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb174ue89` | `@layer utilities` | `white-space: nowrap;` |
| `rb176o9ja` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb17a0d` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb17k13zv` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb17nd4qx` | `@layer utilities` | `color-scheme: dark;` |
| `rb189iiv6` | `@layer utilities` | `position: relative;` |
| `rb18ni1s` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb19jgpk6` | `@layer utilities` | `scale: 0.98;` |
| `rb1a694qn` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1ah80js` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1al3h8e` | `@layer utilities` | `color: oklch(0.51 0.18 26);` |
| `rb1ayqzx0` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1b0mqpg` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1bgl4cb` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1c9jmdh` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb1chqflv` | `@layer utilities` | `color: oklch(0.8 0.13 68);` |
| `rb1d1wdw3` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1doo0iz` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1dsbyrl` | `@layer utilities › @media (min-width: 64rem)` | `min-height: calc(var(--spacing)*0);` |
| `rb1dt7f1d` | `@layer utilities` | `fill: rgba(245, 245, 245, 0.05);` |
| `rb1dvpv7a` | `@layer utilities` | `padding-top: calc(var(--spacing)*3);` |
| `rb1eaj8ig` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1eg1xl6` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fkqrxi` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1fr9x51` | `@layer utilities` | `margin-inline-start: calc(var(--spacing)*2);` |
| `rb1h9uxdf` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*2);` |
| `rb1hf8idz` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1hjuj2e` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*1);` |
| `rb1ixsjj9` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*4);` |
| `rb1j8jji6` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1jl2yq4` | `@layer utilities` | `row-gap: calc(var(--spacing)*.5);` |
| `rb1jxpd4l` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1kuwpa4` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1kxy0on` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1le85df` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb1lg2ukc` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1maxg1f` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1mbm5aa` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1n1vbeh` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1n4w94c` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1);` |
| `rb1nmiy0` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb1novgia` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1nyv279` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1odxosq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1ouww15` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1p2k1ap` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1pavm3u` | `@layer utilities` | `display: grid;` |
| `rb1pavrt1` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1pbe9oe` | `@layer utilities` | `align-items: flex-end;` |
