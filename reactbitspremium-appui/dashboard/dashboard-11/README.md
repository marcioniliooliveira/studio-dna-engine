# dashboard-11

> **Category:** Dashboard (`dashboard`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-11](https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-11)  
> **Native Viewport:** `1280px × 800px`

Staffing board with a demand chart

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`dashboard-11.jsx`](./dashboard-11.jsx) (minHeight: `800px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`dashboard-11.sorbet.jsx`](./dashboard-11.sorbet.jsx) (minHeight: `820px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 438 |
| **Max DOM Depth** | 15 |
| **Atomic/Scoped Classes** | 244 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 19 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Export`
- `Coverage review`
- `Crew lead`
- `Coverage`
- `Relief`
- `Handoffs`
- `Status`
- `Demand mix`
- `Action queue`
- `Review`
- `Invite`
- `Assign`
- `Sync`
- `Fill`
- `Check`
- `Open`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 234)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb100rzgt` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb10eh8jg` | `@layer utilities` | `justify-content: center;` |
| `rb10g55ag` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb10oc371` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb11ce4bs` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb11emfi3` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb11kd4vc` | `@layer utilities › @media not all and (min-width: 64rem)` | `overflow-y: auto;` |
| `rb11svz3a` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb11xka0v` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb11yjn5d` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12achc8` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb12jhjy8` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb12qc4sn` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1330d0x` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb13ke9p8` | `@layer utilities` | `pointer-events: none;` |
| `rb13qj790` | `@layer utilities` | `min-height: 800px;` |
| `rb13tbfkp` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb147ewul` | `@layer utilities` | `text-align: left;` |
| `rb14p2f2j` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb14sok7j` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb14wdnv7` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb153nmsk` | `@layer utilities` | `width: 112px;` |
| `rb156rqx9` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb15w7n9n` | `@layer utilities` | `cursor: progress;` |
| `rb16sotks` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb174ue89` | `@layer utilities` | `white-space: nowrap;` |
| `rb176o9ja` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb17a0d` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb17a1iaw` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb17k13zv` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb188utvi` | `@layer utilities` | `height: calc(var(--spacing)*.5);` |
| `rb189iiv6` | `@layer utilities` | `position: relative;` |
| `rb194rg8a` | `@layer utilities` | `background-color: oklch(0.652 0.219 26);` |
| `rb19jgpk6` | `@layer utilities` | `scale: 0.98;` |
| `rb1ah80js` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1al3h8e` | `@layer utilities` | `color: oklch(0.51 0.18 26);` |
| `rb1ayqzx0` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1b0mqpg` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1bgl4cb` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1chqflv` | `@layer utilities` | `color: oklch(0.8 0.13 68);` |
| `rb1d1wdw3` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1d485f5` | `@layer utilities` | `top: calc(var(--spacing)*10);` |
| `rb1doo0iz` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1dsbyrl` | `@layer utilities › @media (min-width: 64rem)` | `min-height: calc(var(--spacing)*0);` |
| `rb1e04yhk` | `@layer utilities` | `height: 108px;` |
| `rb1eaj8ig` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1eg1xl6` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1egjxge` | `@layer utilities › @media (min-width: 64rem)` | `grid-template-columns: minmax(0px, 1fr) 320px;` |
| `rb1fkqrxi` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1flhw2f` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb1fpaxt2` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1g1jvmy` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1h5c8wz` | `@layer utilities` | `background-color: oklch(0.8 0.152 68);` |
| `rb1h7565j` | `@layer utilities › @media (min-width: 40rem)` | `display: table-cell;` |
| `rb1hf8idz` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1hjx31a` | `@layer utilities` | `z-index: 10;` |
| `rb1ixsjj9` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*4);` |
| `rb1j8jji6` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1jxpd4l` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1lfsg91` | `@layer utilities` | `background-color: oklch(0.8 0.152 68);` |
| `rb1lg2ukc` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1lwz2py` | `@layer utilities` | `text-align: right;` |
| `rb1maxg1f` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1mm1qry` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1ms65ua` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*4);` |
| `rb1mue17x` | `@layer utilities` | `margin-top: auto;` |
| `rb1mvfs4r` | `@layer utilities` | `height: 2px;` |
| `rb1mw19bv` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1mw1cgx` | `@layer utilities` | `width: calc(var(--spacing)*9); height: calc(var(--spacing)*9);` |
| `rb1nmiy0` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb1nn6qo8` | `@layer utilities` | `align-self: stretch;` |
| `rb1novgia` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1nv3hom` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 0px;` |
| `rb1odxosq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1om2a3n` | `@layer utilities › @container (min-width: 28rem)` | `grid-column: auto;` |
| `rb1ouww15` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1p2k1ap` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1pavm3u` | `@layer utilities` | `display: grid;` |
