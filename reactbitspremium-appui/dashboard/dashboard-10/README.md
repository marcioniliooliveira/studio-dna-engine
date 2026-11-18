# dashboard-10

> **Category:** Dashboard (`dashboard`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-10](https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-10)  
> **Native Viewport:** `1280px × 800px`

Metric explorer with one large chart

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`dashboard-10.jsx`](./dashboard-10.jsx) (minHeight: `800px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`dashboard-10.sorbet.jsx`](./dashboard-10.sorbet.jsx) (minHeight: `880px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 236 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 182 |
| **Buttons** | 10 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 8 / 0 |
| **ARIA Roles** | `tablist`, `tab`, `application` |

### Visible Headings & Interactive Labels
- `Calls 79,090`
- `Avg. duration 2:51`
- `Total credits 31,422 credits`
- `Credits per call 4.30 credits`
- `Total LLM cost $7,818`
- `Avg. LLM cost $229.00`
- `Open report`
- `Busiest agents`
- `Integrations`
- `Manage`
- `Connect`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 179)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb100rzgt` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb106da8v` | `@layer utilities` | `content: var(--tw-content); inset-inline: calc(var(--spacing)*0);` |
| `rb10eh8jg` | `@layer utilities` | `justify-content: center;` |
| `rb10g55ag` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb11emfi3` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb11kd4vc` | `@layer utilities › @media not all and (min-width: 64rem)` | `overflow-y: auto;` |
| `rb11ntp4d` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb11svz3a` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb11yjn5d` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12achc8` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb12jhjy8` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb12qc4sn` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1330d0x` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb139uvos` | `@layer utilities` | `inset-block: calc(var(--spacing)*0);` |
| `rb13ke9p8` | `@layer utilities` | `pointer-events: none;` |
| `rb13qj790` | `@layer utilities` | `min-height: 800px;` |
| `rb13tbfkp` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb147ewul` | `@layer utilities` | `text-align: left;` |
| `rb14q28im` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb14sok7j` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb14wdnv7` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb156rqx9` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb15w7n9n` | `@layer utilities` | `cursor: progress;` |
| `rb16sotks` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1725ydj` | `@layer utilities` | `transition-property: color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb174ue89` | `@layer utilities` | `white-space: nowrap;` |
| `rb176o9ja` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb17a0d` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb17k13zv` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb189iiv6` | `@layer utilities` | `position: relative;` |
| `rb18ni1s` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb19jgpk6` | `@layer utilities` | `scale: 0.98;` |
| `rb1ah80js` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1alvg2u` | `@layer utilities` | `content: var(--tw-content); background-color: rgba(0, 0, 0, 0);` |
| `rb1ayqzx0` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1b0mqpg` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1bgl4cb` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1bxnlst` | `@layer utilities` | `height: 224px;` |
| `rb1dkjrx8` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1doo0iz` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1dsbyrl` | `@layer utilities › @media (min-width: 64rem)` | `min-height: calc(var(--spacing)*0);` |
| `rb1dt7f1d` | `@layer utilities` | `fill: rgba(245, 245, 245, 0.05);` |
| `rb1eaj8ig` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1eg1xl6` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fkqrxi` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1h02mgq` | `@layer utilities` | `content: var(--tw-content); background-color: var(--color-neutral-100);` |
| `rb1hf8idz` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1j8jji6` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1jtm2gl` | `@layer utilities` | `width: calc(var(--spacing)*12);` |
| `rb1jxpd4l` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1l48gea` | `@layer utilities` | `content: var(--tw-content); height: calc(var(--spacing)*.5);` |
| `rb1lg2ukc` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1lol39d` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1lwz2py` | `@layer utilities` | `text-align: right;` |
| `rb1maxg1f` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1mm1qry` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1mw1cgx` | `@layer utilities` | `width: calc(var(--spacing)*9); height: calc(var(--spacing)*9);` |
| `rb1n4w94c` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1);` |
| `rb1novgia` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1nyv279` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1odxosq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1ouww15` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1p2k1ap` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1pavm3u` | `@layer utilities` | `display: grid;` |
| `rb1pavrt1` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1pbe9oe` | `@layer utilities` | `align-items: flex-end;` |
| `rb1pmj8on` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*4);` |
| `rb1q0jo1f` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1q3ffcc` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1q5q7aa` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1qnemqa` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1rbt7l9` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1rwf5w7` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1scwoph` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1sfwe6i` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1t3ubz` | `@layer utilities` | `overflow: hidden;` |
| `rb1tmei22` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb1ts1126` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
