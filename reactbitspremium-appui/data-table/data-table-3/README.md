# data-table-3

> **Category:** Data Table (`data-table`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/data-table/data-table-3](https://pro.reactbits.dev/docs/app-ui/data-table/data-table-3)  
> **Native Viewport:** `1280px × 640px`

Table with inline cell editing

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`data-table-3.jsx`](./data-table-3.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`data-table-3.sorbet.jsx`](./data-table-3.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 221 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 136 |
| **Buttons** | 18 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 18 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Budget allocation`
- `Workstream`
- `Owner`
- `Status`
- `Hours`
- `Rate`
- `Total`
- `38`
- `$145`
- `22`
- `$160`
- `44`
- `$135`
- `31`
- `$150`
- `27`
- `$140`
- `19`
- `$165`
- `52`
- `$155`
- `34`
- `29`
- `$170`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 134)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb104y8cz` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb10mo8x7` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb11uyn8i` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb12jfiya` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb13os83z` | `@layer utilities` | `width: calc(var(--spacing)*20);` |
| `rb15bzf7p` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb15iga1d` | `@layer utilities` | `overflow: auto;` |
| `rb166dqn` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb16lyc6f` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb17pzpgs` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb18incu` | `@layer utilities` | `display: block;` |
| `rb192dbpd` | `@layer utilities › @media (min-width: 48rem)` | `opacity: 1;` |
| `rb1ac7s7c` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1b9hctv` | `@layer utilities` | `height: calc(var(--spacing)*10);` |
| `rb1btgk7t` | `@layer utilities` | `height: calc(var(--spacing)*12);` |
| `rb1c7rd6o` | `@layer utilities` | `vertical-align: middle;` |
| `rb1cdfrlr` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb1ceafas` | `@layer utilities` | `max-width: 280px;` |
| `rb1cmh5k6` | `@layer utilities` | `width: 160px;` |
| `rb1cqhuar` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1cu1ik2` | `@layer utilities` | `align-items: flex-start;` |
| `rb1ddrell` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1dv4g8i` | `@layer utilities` | `justify-content: space-between;` |
| `rb1e62hyg` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1ebbyz3` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1f4prpi` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1fs288l` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fyhrwv` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1fyk6qa` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1fzv4vn` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1ggz0a4` | `@layer utilities` | `width: 100%;` |
| `rb1gnst8y` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1gpfhz1` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1gxye8l` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1h03nzy` | `@layer utilities` | `z-index: 20;` |
| `rb1hkwp6x` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1hshg0n` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 0px;` |
| `rb1huawwf` | `@layer utilities` | `border-collapse: separate;` |
| `rb1j97kdn` | `@layer utilities` | `min-height: 640px;` |
| `rb1j9gx58` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1jpuagg` | `@layer utilities` | `text-align: left;` |
| `rb1khydb9` | `@layer utilities` | `text-align: right;` |
| `rb1kzn6lj` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1l9avsd` | `@layer utilities` | `mask-image: linear-gradient(90deg, rgb(0, 0, 0) calc(100% - 24px), rgba(0, 0, 0, 0));` |
| `rb1lm2p12` | `@layer utilities › @media (min-width: 48rem) › @media (hover: hover)` | `opacity: 1;` |
| `rb1lzgb50` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1mc4vhx` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1mhvolj` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1mpw61y` | `@layer utilities` | `user-select: none;` |
| `rb1nf5m6f` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1nh3fo3` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1npqae7` | `@layer utilities` | `align-items: center;` |
| `rb1o0a5n1` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1qf267i` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*6);` |
| `rb1rtbf2s` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1tdi8kz` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1trzcyo` | `@layer utilities` | `color: oklch(0.49 0.1 68);` |
| `rb1u7yoqb` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1uc5yc9` | `@layer utilities` | `padding-inline-end: 13px;` |
| `rb1v0m6tj` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1v5ntzm` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1ve889h` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1vukxan` | `@layer utilities` | `justify-content: center;` |
| `rb1vy606z` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1wyr902` | `@layer utilities` | `cursor: progress;` |
| `rb1xjh1rw` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1xqte9o` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1y4585g` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb2rt6sp` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb2utp2g` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb2z9yl3` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb4guqws` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb4se84l` | `@layer utilities` | `width: 116px;` |
| `rb55cet9` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*4);` |
| `rb5cenoc` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb5dgezc` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb5toygx` | `@layer utilities` | `min-width: 760px;` |
| `rb5uzs66` | `@layer utilities` | `display: flex;` |
