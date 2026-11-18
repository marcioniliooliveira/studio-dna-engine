# data-table-4

> **Category:** Data Table (`data-table`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/data-table/data-table-4](https://pro.reactbits.dev/docs/app-ui/data-table/data-table-4)  
> **Native Viewport:** `1280px × 640px`

Table with expandable rows

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`data-table-4.jsx`](./data-table-4.jsx) (minHeight: `640px`, hooks: `Fragment`, `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`data-table-4.sorbet.jsx`](./data-table-4.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 179 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 184 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 10 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Overnight checks`
- `Search checks`
- `Expand`
- `Check`
- `Owner`
- `Result`
- `Duration`
- `Checked`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 183)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb104y8cz` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb10mo8x7` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb112gn09` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb11wmjxf` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb121ryde` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb12ib5p4` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb12jfiya` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12qhfl2` | `@layer utilities` | `color: oklch(0.76 0.14 26);` |
| `rb12x6tlw` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb143600o` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb144te3j` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*1);` |
| `rb14wui6y` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb15cy15` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb15iga1d` | `@layer utilities` | `overflow: auto;` |
| `rb162eyjf` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb166dqn` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb16lyc6f` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb16ttrwj` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb1775mfn` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb177hvcj` | `@layer utilities` | `padding-top: calc(var(--spacing)*1);` |
| `rb17pzpgs` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb18incu` | `@layer utilities` | `display: block;` |
| `rb19b8cbg` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb19zc7z7` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1ac7s7c` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1b9hctv` | `@layer utilities` | `height: calc(var(--spacing)*10);` |
| `rb1btgk7t` | `@layer utilities` | `height: calc(var(--spacing)*12);` |
| `rb1c7rd6o` | `@layer utilities` | `vertical-align: middle;` |
| `rb1cdfrlr` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb1cqhuar` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1cu1ik2` | `@layer utilities` | `align-items: flex-start;` |
| `rb1dcjoax` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline-end: calc(var(--spacing)*6);` |
| `rb1ddrell` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1e62hyg` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1ebbyz3` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1ekrk76` | `@layer utilities` | `color-scheme: dark;` |
| `rb1f4prpi` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1fs288l` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fyhrwv` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1fzv4vn` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1g4pj44` | `@layer utilities › @media (hover: hover)` | `background-color: oklch(0.29 0.06 26 / 0.6);` |
| `rb1ggz0a4` | `@layer utilities` | `width: 100%;` |
| `rb1gm0c5j` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb1gnst8y` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1gxye8l` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1h03nzy` | `@layer utilities` | `z-index: 20;` |
| `rb1hkwp6x` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1hshg0n` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 0px;` |
| `rb1huawwf` | `@layer utilities` | `border-collapse: separate;` |
| `rb1i17nym` | `@layer utilities › @media (hover: hover)` | `background-color: oklch(0.945 0.027 26 / 0.6);` |
| `rb1j97kdn` | `@layer utilities` | `min-height: 640px;` |
| `rb1jaeo4l` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1jpuagg` | `@layer utilities` | `text-align: left;` |
| `rb1khydb9` | `@layer utilities` | `text-align: right;` |
| `rb1knuyr0` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1kzn6lj` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1l4d7j` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*0);` |
| `rb1l91zgo` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1l9avsd` | `@layer utilities` | `mask-image: linear-gradient(90deg, rgb(0, 0, 0) calc(100% - 24px), rgba(0, 0, 0, 0));` |
| `rb1lurq22` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1lzgb50` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1m5ekh9` | `@layer utilities` | `padding-block: calc(var(--spacing)*1.5);` |
| `rb1mbab2o` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1mc4vhx` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1mgsgeq` | `@layer utilities › @media (min-width: 40rem)` | `width: calc(var(--spacing)*56);` |
| `rb1mpw61y` | `@layer utilities` | `user-select: none;` |
| `rb1nf5m6f` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1npqae7` | `@layer utilities` | `align-items: center;` |
| `rb1ntqs28` | `@layer utilities` | `width: 52px;` |
| `rb1o0a5n1` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1p8yxyy` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1q46gli` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1qf267i` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*6);` |
| `rb1rdpu8u` | `@layer utilities` | `background-color: oklch(0.29 0.06 26 / 0.4);` |
| `rb1rtbf2s` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1rykacr` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1t1bozg` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1tdi8kz` | `@layer utilities` | `--tw-gradient-position: to top;` |
