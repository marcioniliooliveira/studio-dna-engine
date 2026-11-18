# data-table-1

> **Category:** Data Table (`data-table`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/data-table/data-table-1](https://pro.reactbits.dev/docs/app-ui/data-table/data-table-1)  
> **Native Viewport:** `1280px × 640px`

Table with filters and column toggles

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`data-table-1.jsx`](./data-table-1.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`data-table-1.sorbet.jsx`](./data-table-1.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 295 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 228 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 7 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Accounts`
- `Export`
- `Search accounts`
- `All plans`
- `Enterprise`
- `Scale`
- `Growth`
- `Columns`
- `Account`
- `Owner`
- `Plan`
- `Status`
- `Region`
- `MRR`
- `Renewal`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 223)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb104n97` | `@layer utilities` | `--tw-gradient-position: to left;` |
| `rb104y8cz` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb10mo8x7` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb112gn09` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb11uyn8i` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb11wmjxf` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb12h4zsu` | `@layer utilities` | `scrollbar-width: none;` |
| `rb12ib5p4` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb12jfiya` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12ytr0d` | `@layer utilities` | `display: none;` |
| `rb13eioze` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb13mto3e` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.16);` |
| `rb143600o` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb144te3j` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*1);` |
| `rb14qy8m2` | `@layer utilities › @media (min-width: 48rem)` | `display: table;` |
| `rb14wui6y` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb15bzf7p` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb15cy15` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb15iga1d` | `@layer utilities` | `overflow: auto;` |
| `rb15ry6e1` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb162eyjf` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb166dqn` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb16lyc6f` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb16ttrwj` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb17eves6` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb17pzpgs` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb18incu` | `@layer utilities` | `display: block;` |
| `rb18v8g8q` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb19lusfy` | `@layer utilities` | `overflow-x: auto;` |
| `rb19zc7z7` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1ac7s7c` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1azxw0m` | `@layer utilities` | `order: 9999;` |
| `rb1b9hctv` | `@layer utilities` | `height: calc(var(--spacing)*10);` |
| `rb1btgk7t` | `@layer utilities` | `height: calc(var(--spacing)*12);` |
| `rb1c7rd6o` | `@layer utilities` | `vertical-align: middle;` |
| `rb1cbnas1` | `@layer utilities` | `inset-block: calc(var(--spacing)*0);` |
| `rb1cdfrlr` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb1ceafas` | `@layer utilities` | `max-width: 280px;` |
| `rb1cqhuar` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1cu1ik2` | `@layer utilities` | `align-items: flex-start;` |
| `rb1ddrell` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1dg8178` | `@layer utilities` | `margin-left: auto;` |
| `rb1dv4g8i` | `@layer utilities` | `justify-content: space-between;` |
| `rb1e62hyg` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1ebbyz3` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1ekrk76` | `@layer utilities` | `color-scheme: dark;` |
| `rb1f4prpi` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1fs288l` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fyhrwv` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1fyk6qa` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1fzv4vn` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1ggz0a4` | `@layer utilities` | `width: 100%;` |
| `rb1gm0c5j` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb1gnst8y` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1gpfhz1` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1gxye8l` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1gze05l` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-900); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1h03nzy` | `@layer utilities` | `z-index: 20;` |
| `rb1h9srdl` | `@layer utilities › @media (min-width: 40rem)` | `margin-inline: calc(var(--spacing)*0);` |
| `rb1hkwp6x` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1hr1lv0` | `@layer utilities` | `right: calc(var(--spacing)*0);` |
| `rb1hshg0n` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 0px;` |
| `rb1huawwf` | `@layer utilities` | `border-collapse: separate;` |
| `rb1j425g6` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1j97kdn` | `@layer utilities` | `min-height: 640px;` |
| `rb1j9gx58` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1jaeo4l` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1jpi912` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jpuagg` | `@layer utilities` | `text-align: left;` |
| `rb1khydb9` | `@layer utilities` | `text-align: right;` |
| `rb1knuyr0` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1kzn6lj` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1l91zgo` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1l9avsd` | `@layer utilities` | `mask-image: linear-gradient(90deg, rgb(0, 0, 0) calc(100% - 24px), rgba(0, 0, 0, 0));` |
| `rb1lurq22` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1lzgb50` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1m5bbsk` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb1m760ak` | `@layer utilities` | `transition-property: background-color, border-color, color, scale, outline-color; transition-timing-function: var(--tw-ease,var(--default-tr` |
