# data-table-7

> **Category:** Data Table (`data-table`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/data-table/data-table-7](https://pro.reactbits.dev/docs/app-ui/data-table/data-table-7)  
> **Native Viewport:** `1280px × 640px`

Table empty, loading and error states

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`data-table-7.jsx`](./data-table-7.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`data-table-7.sorbet.jsx`](./data-table-7.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 131 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 129 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 0 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Connected sources`
- `Loading`
- `Empty`
- `Error`
- `Source`
- `Owner`
- `Status`
- `Records`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 128)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb104y8cz` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb10xjrhn` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
| `rb1118nt0` | `@layer utilities` | `width: 180px;` |
| `rb11gs928` | `@layer utilities` | `width: calc(var(--spacing)*32);` |
| `rb12brk2d` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb12jfiya` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12k8oqh` | `@layer utilities` | `width: calc(var(--spacing)*40);` |
| `rb12kqnu4` | `@layer utilities` | `width: calc(var(--spacing)*36);` |
| `rb12kttc3` | `@layer utilities` | `width: calc(var(--spacing)*24);` |
| `rb12x6tlw` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb135qd5a` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb13o73id` | `@layer utilities` | `width: calc(var(--spacing)*44);` |
| `rb13os83z` | `@layer utilities` | `width: calc(var(--spacing)*20);` |
| `rb14s5ia9` | `@layer utilities` | `width: calc(var(--spacing)*48);` |
| `rb15wp1nr` | `@layer utilities` | `width: calc(var(--spacing)*28);` |
| `rb166dqn` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb16vv2jj` | `@layer utilities` | `overflow-y: auto;` |
| `rb17pzpgs` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb18incu` | `@layer utilities` | `display: block;` |
| `rb18l7zat` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1ac7s7c` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1ay9ntr` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1b9hctv` | `@layer utilities` | `height: calc(var(--spacing)*10);` |
| `rb1btgk7t` | `@layer utilities` | `height: calc(var(--spacing)*12);` |
| `rb1c7rd6o` | `@layer utilities` | `vertical-align: middle;` |
| `rb1cdfrlr` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb1ddrell` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1dg8178` | `@layer utilities` | `margin-left: auto;` |
| `rb1ebbyz3` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1f4prpi` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1fs288l` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fyhrwv` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1fzv4vn` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1ggz0a4` | `@layer utilities` | `width: 100%;` |
| `rb1gnst8y` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1gxye8l` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1h03nzy` | `@layer utilities` | `z-index: 20;` |
| `rb1hkwp6x` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1hshg0n` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 0px;` |
| `rb1huawwf` | `@layer utilities` | `border-collapse: separate;` |
| `rb1j97kdn` | `@layer utilities` | `min-height: 640px;` |
| `rb1jggtpv` | `@layer utilities` | `height: 0.7em;` |
| `rb1jpuagg` | `@layer utilities` | `text-align: left;` |
| `rb1khydb9` | `@layer utilities` | `text-align: right;` |
| `rb1kzn6lj` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1lzgb50` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1m5bbsk` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb1mc4vhx` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1mpw61y` | `@layer utilities` | `user-select: none;` |
| `rb1npqae7` | `@layer utilities` | `align-items: center;` |
| `rb1o0a5n1` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1qf267i` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*6);` |
| `rb1qxfiq1` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1rgnon1` | `@layer utilities` | `max-width: 100%;` |
| `rb1rtbf2s` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1s4qxzy` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1tdi8kz` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1v0m6tj` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1v5ntzm` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1vds0vk` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1vukxan` | `@layer utilities` | `justify-content: center;` |
| `rb1xjh1rw` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1xqte9o` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1y4585g` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb24x76d` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb2qz967` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb2utp2g` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb2yw09a` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb2z9yl3` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb4guqws` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb552w4m` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb55cet9` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*4);` |
| `rb5dgezc` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb5uzs66` | `@layer utilities` | `display: flex;` |
| `rb63w09o` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb6cdiry` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb6ta4ru` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb6ulsgo` | `@layer utilities` | `position: absolute;` |
