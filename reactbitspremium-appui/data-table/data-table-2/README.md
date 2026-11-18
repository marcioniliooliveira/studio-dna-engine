# data-table-2

> **Category:** Data Table (`data-table`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/data-table/data-table-2](https://pro.reactbits.dev/docs/app-ui/data-table/data-table-2)  
> **Native Viewport:** `1280px × 640px`

Table with bulk actions and pagination

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`data-table-2.jsx`](./data-table-2.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`data-table-2.sorbet.jsx`](./data-table-2.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 230 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 204 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 11 / 0 / 1 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 17 / 0 |
| **ARIA Roles** | `combobox` |

### Visible Headings & Interactive Labels
- `Outgoing payments`
- `Hold`
- `Export`
- `Vendor`
- `Owner`
- `Status`
- `Amount`
- `Due`
- `10`
- `1`
- `2`
- `3`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 201)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb104y8cz` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb10mo8x7` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb10x3yv4` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb11gbp2k` | `@layer utilities` | `outline-color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb11gxiwo` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.4);` |
| `rb12jfiya` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12x6tlw` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb14wui6y` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb15gf7gn` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb15iga1d` | `@layer utilities` | `overflow: auto;` |
| `rb15luqb5` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb166dqn` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb16lyc6f` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb179lagq` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb17h287s` | `@layer utilities › @media (hover: hover)` | `border-color: var(--color-neutral-100);` |
| `rb17me4c8` | `@layer utilities` | `margin-left: -1px;` |
| `rb17pzpgs` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb18incu` | `@layer utilities` | `display: block;` |
| `rb19194fh` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb19aq3gi` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb19b8cbg` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb19q2sjz` | `@layer utilities` | `transition-property: background-color, border-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-tran` |
| `rb1ac7s7c` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1alt8lw` | `@layer utilities` | `opacity: 1;` |
| `rb1at3er5` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1b9hctv` | `@layer utilities` | `height: calc(var(--spacing)*10);` |
| `rb1btgk7t` | `@layer utilities` | `height: calc(var(--spacing)*12);` |
| `rb1c7rd6o` | `@layer utilities` | `vertical-align: middle;` |
| `rb1cdfrlr` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb1cmh5k6` | `@layer utilities` | `width: 160px;` |
| `rb1cqhuar` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1cu1ik2` | `@layer utilities` | `align-items: flex-start;` |
| `rb1ddrell` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1dg8178` | `@layer utilities` | `margin-left: auto;` |
| `rb1dkwjs1` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1dv4g8i` | `@layer utilities` | `justify-content: space-between;` |
| `rb1e4vte2` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1ebbyz3` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1ebe0co` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(255, 255, 255, 0.16);` |
| `rb1f4prpi` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1fs288l` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fs5g9e` | `@layer utilities` | `opacity: 1;` |
| `rb1fyhrwv` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1fyk6qa` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1fzv4vn` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1ggz0a4` | `@layer utilities` | `width: 100%;` |
| `rb1gnst8y` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1gxye8l` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1h03nzy` | `@layer utilities` | `z-index: 20;` |
| `rb1hkwp6x` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1hkx3t2` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1hshg0n` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 0px;` |
| `rb1huawwf` | `@layer utilities` | `border-collapse: separate;` |
| `rb1i4a9v9` | `@layer utilities` | `align-items: baseline;` |
| `rb1inp8ss` | `@layer utilities` | `visibility: hidden;` |
| `rb1j97kdn` | `@layer utilities` | `min-height: 640px;` |
| `rb1jcgzye` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.1);` |
| `rb1jpi912` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jpuagg` | `@layer utilities` | `text-align: left;` |
| `rb1k1dr8q` | `@layer utilities` | `min-width: calc(var(--spacing)*40);` |
| `rb1kemg7x` | `@layer utilities › @media (hover: hover)` | `z-index: 10;` |
| `rb1khydb9` | `@layer utilities` | `text-align: right;` |
| `rb1kzn6lj` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1l9avsd` | `@layer utilities` | `mask-image: linear-gradient(90deg, rgb(0, 0, 0) calc(100% - 24px), rgba(0, 0, 0, 0));` |
| `rb1lfo76c` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1lk6m95` | `@layer utilities` | `margin-left: calc(var(--spacing)*0);` |
| `rb1lzgb50` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1m5bbsk` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb1m5ekh9` | `@layer utilities` | `padding-block: calc(var(--spacing)*1.5);` |
| `rb1m8z9mb` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.28);` |
| `rb1mc4vhx` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1mpw61y` | `@layer utilities` | `user-select: none;` |
| `rb1nf5m6f` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1npqae7` | `@layer utilities` | `align-items: center;` |
| `rb1nyj4ma` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1nzix1y` | `@layer utilities` | `max-width: 260px;` |
| `rb1o0a5n1` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1pnzvjp` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
