# billing-3

> **Category:** Billing (`billing`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/billing/billing-3](https://pro.reactbits.dev/docs/app-ui/billing/billing-3)  
> **Native Viewport:** `1280px × 800px`

New invoice wizard

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`billing-3.jsx`](./billing-3.jsx) (minHeight: `800px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`billing-3.sorbet.jsx`](./billing-3.sorbet.jsx) (minHeight: `880px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 154 |
| **Max DOM Depth** | 13 |
| **Atomic/Scoped Classes** | 218 |
| **Buttons** | 6 |
| **Inputs / Textareas / Selects** | 7 / 0 / 3 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 9 / 0 |
| **ARIA Roles** | `combobox` |

### Visible Headings & Interactive Labels
- `New invoice`
- `Customer`
- `Tax ID`
- `Invoice number`
- `PO reference`
- `Terms`
- `Issue date`
- `Due date`
- `Currency`
- `USD`
- `Payment terms`
- `Net 14`
- `Collection`
- `ACH transfer`
- `Billing address`
- `Save draft`
- `Next step`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 218)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10a46eg` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb10jmn5l` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb116xg7t` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb117drzt` | `@layer utilities` | `opacity: 0;` |
| `rb1197idm` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb12igm5l` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1307mnj` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb136n8ax` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb13waky7` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb145sayl` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*1);` |
| `rb14eb5za` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb14p0eoe` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1589z27` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb15off9x` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb168y744` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb16d0z6q` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb16xj5em` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb17d1c4c` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb17dzvzb` | `@layer utilities` | `position: absolute;` |
| `rb17gv8cv` | `@layer utilities` | `display: none;` |
| `rb18bbzmo` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb18izx9t` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb18lblbn` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb19dk4m9` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb19g9w7k` | `@layer utilities` | `min-width: calc(var(--spacing)*40);` |
| `rb19imrb7` | `@layer utilities` | `width: 100%;` |
| `rb19jkab3` | `@layer utilities` | `min-height: 800px;` |
| `rb19n3pxl` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1a1modn` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1a2mtq8` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1a5rio4` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb1a7pmfq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1aacilu` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1akc4at` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb1apcut` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1bcqh5h` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1bmb9fu` | `@layer utilities` | `white-space: nowrap;` |
| `rb1bp8vx0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1brljxp` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1bsgrg0` | `@layer utilities` | `height: 1px;` |
| `rb1buidzo` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1ckro0n` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1dc8sxt` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1e787v1` | `@layer utilities` | `height: 100%;` |
| `rb1ef042b` | `@layer utilities` | `display: grid;` |
| `rb1efwzsg` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1epo6gh` | `@layer utilities` | `cursor: pointer;` |
| `rb1etxc3v` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1fa9dp9` | `@layer utilities` | `align-items: center;` |
| `rb1fdwjht` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1fopzdv` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1fuiegl` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1fxjvl1` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1g2s19b` | `@layer utilities` | `opacity: 0.4;` |
| `rb1gb9khg` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1gcbd7c` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1go21fd` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1gvrp5r` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1h73cf0` | `@layer utilities` | `overflow: hidden;` |
| `rb1h9w10j` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1hbk6kc` | `@layer utilities` | `color-scheme: dark;` |
| `rb1hikl8e` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1i08zd6` | `@layer utilities` | `column-gap: calc(var(--spacing)*5);` |
| `rb1icwuka` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1j6c9fb` | `@layer utilities` | `pointer-events: none;` |
| `rb1jqwg40` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1k89vau` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1kb15wv` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1kh51y` | `@layer utilities` | `text-align: left;` |
| `rb1kyx8vy` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1l509zw` | `@layer utilities` | `justify-content: space-between;` |
| `rb1lbs58g` | `@layer utilities` | `cursor: pointer;` |
| `rb1lhtetc` | `@layer utilities` | `min-width: calc(var(--spacing)*4);` |
| `rb1lrt0ib` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb1lsky` | `@layer utilities` | `margin-top: calc(var(--spacing)*7);` |
| `rb1ly2wdh` | `@layer utilities` | `overflow-y: auto;` |
| `rb1lyirb4` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1lypal9` | `@layer utilities` | `justify-content: center;` |
