# billing-4

> **Category:** Billing (`billing`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/billing/billing-4](https://pro.reactbits.dev/docs/app-ui/billing/billing-4)  
> **Native Viewport:** `1280px × 800px`

Failed payment recovery queue

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`billing-4.jsx`](./billing-4.jsx) (minHeight: `800px`, hooks: `Fragment`, `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`billing-4.sorbet.jsx`](./billing-4.sorbet.jsx) (minHeight: `800px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 355 |
| **Max DOM Depth** | 15 |
| **Atomic/Scoped Classes** | 226 |
| **Buttons** | 16 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 21 / 0 |
| **ARIA Roles** | `presentation` |

### Visible Headings & Interactive Labels
- `Recovery queue`
- `Rules`
- `Export`
- `Retry due`
- `Past due subscriptions`
- `Manage playbooks`
- `Customer`
- `Status`
- `Billing`
- `Owner`
- `Amount`
- `Next retry`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 216)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10dxb5t` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb116xg7t` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb117drzt` | `@layer utilities` | `opacity: 0;` |
| `rb1197idm` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb12etnik` | `@layer utilities › @media (min-width: 48rem)` | `opacity: 0;` |
| `rb12igm5l` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb12omix` | `@layer utilities` | `transition-property: transform, translate, scale, rotate; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function` |
| `rb136n8ax` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb13cqk2a` | `@layer utilities › @media (min-width: 40rem)` | `padding-left: calc(var(--spacing)*0);` |
| `rb13waky7` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1411vgh` | `@layer utilities` | `animation: var(--animate-spin);` |
| `rb14eb5za` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb14p0eoe` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1589z27` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb15off9x` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb16d0z6q` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb16gtsr5` | `@layer utilities` | `border-collapse: separate;` |
| `rb16xj5em` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb17d1c4c` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb17e4lwy` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-flow: column;` |
| `rb17f3h5` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb18bbzmo` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb18fhfw4` | `@layer utilities › @media (min-width: 40rem)` | `align-items: flex-start;` |
| `rb18lblbn` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb18ytz3s` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb19dk4m9` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb19im93g` | `@layer utilities` | `height: 1lh;` |
| `rb19jkab3` | `@layer utilities` | `min-height: 800px;` |
| `rb19n3pxl` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb19vrwz5` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*4);` |
| `rb19vu00g` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `animation: auto ease 0s 1 normal none running none;` |
| `rb1a1modn` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1a2mtq8` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1a63j50` | `@layer utilities` | `overflow-x: auto;` |
| `rb1aacilu` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1apcut` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1bmb9fu` | `@layer utilities` | `white-space: nowrap;` |
| `rb1bp8vx0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1brljxp` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1buidzo` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1bydshi` | `@layer utilities` | `font-size: 32px; line-height: 36px;` |
| `rb1ckro0n` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1e0do3k` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb1e787v1` | `@layer utilities` | `height: 100%;` |
| `rb1ef042b` | `@layer utilities` | `display: grid;` |
| `rb1efwzsg` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1ejxkew` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1epo6gh` | `@layer utilities` | `cursor: pointer;` |
| `rb1etxc3v` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1fa9dp9` | `@layer utilities` | `align-items: center;` |
| `rb1fdwjht` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1fkisrm` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb1fopzdv` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1fuiegl` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1fxjvl1` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1g2s19b` | `@layer utilities` | `opacity: 0.4;` |
| `rb1gb9khg` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1gcbd7c` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1go21fd` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1gwakla` | `@layer utilities` | `column-gap: calc(var(--spacing)*1);` |
| `rb1h73cf0` | `@layer utilities` | `overflow: hidden;` |
| `rb1h9w10j` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1hdddn8` | `@layer utilities` | `background-color: oklch(0.8 0.152 68);` |
| `rb1hikl8e` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1hkd0nc` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1hmqtlk` | `@layer utilities` | `min-width: 820px;` |
| `rb1i1lipn` | `@layer utilities › @media (min-width: 48rem)` | `opacity: 1;` |
| `rb1icwuka` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1iqgz23` | `@layer utilities` | `align-items: baseline;` |
| `rb1j6c9fb` | `@layer utilities` | `pointer-events: none;` |
| `rb1je7w3d` | `@layer utilities` | `color: oklch(0.51 0.18 26);` |
| `rb1jqwg40` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1k2rdlt` | `@layer utilities › @media (min-width: 40rem)` | `flex-direction: row;` |
| `rb1kh51y` | `@layer utilities` | `text-align: left;` |
| `rb1kqh31z` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb1kz9xox` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1l509zw` | `@layer utilities` | `justify-content: space-between;` |
| `rb1lq8390` | `@layer utilities` | `z-index: 20;` |
