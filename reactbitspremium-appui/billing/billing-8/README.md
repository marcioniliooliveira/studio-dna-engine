# billing-8

> **Category:** Billing (`billing`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/billing/billing-8](https://pro.reactbits.dev/docs/app-ui/billing/billing-8)  
> **Native Viewport:** `1280px × 800px`

Invoice detail with a timeline

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`billing-8.jsx`](./billing-8.jsx) (minHeight: `800px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`billing-8.sorbet.jsx`](./billing-8.sorbet.jsx) (minHeight: `820px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 176 |
| **Max DOM Depth** | 13 |
| **Atomic/Scoped Classes** | 185 |
| **Buttons** | 4 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `INV-20437`
- `PDF`
- `Send reminder`
- `Description`
- `Qty`
- `Rate`
- `Amount`
- `Charge now`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 178)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10dxb5t` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb116xg7t` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb117drzt` | `@layer utilities` | `opacity: 0;` |
| `rb1197idm` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb12igm5l` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb136n8ax` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb13waky7` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb14eb5za` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb14p0eoe` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1589z27` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb15off9x` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb16d0z6q` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb16gtsr5` | `@layer utilities` | `border-collapse: separate;` |
| `rb16xj5em` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb17d1c4c` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb18fhfw4` | `@layer utilities › @media (min-width: 40rem)` | `align-items: flex-start;` |
| `rb18ytz3s` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb19dk4m9` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb19jkab3` | `@layer utilities` | `min-height: 800px;` |
| `rb19n3pxl` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb19vrwz5` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*4);` |
| `rb19z9lsi` | `@layer utilities` | `padding-block: calc(var(--spacing)*5);` |
| `rb1a1modn` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1a2mtq8` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1a63j50` | `@layer utilities` | `overflow-x: auto;` |
| `rb1bmb9fu` | `@layer utilities` | `white-space: nowrap;` |
| `rb1bp8vx0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1brljxp` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1buidzo` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1ckro0n` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1e787v1` | `@layer utilities` | `height: 100%;` |
| `rb1ef042b` | `@layer utilities` | `display: grid;` |
| `rb1efwzsg` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1ejxkew` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1epo6gh` | `@layer utilities` | `cursor: pointer;` |
| `rb1etxc3v` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1fa9dp9` | `@layer utilities` | `align-items: center;` |
| `rb1fdwjht` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1fopzdv` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1fxjvl1` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1g2s19b` | `@layer utilities` | `opacity: 0.4;` |
| `rb1gb9khg` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1gcbd7c` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1gehluj` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1go21fd` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1gwakla` | `@layer utilities` | `column-gap: calc(var(--spacing)*1);` |
| `rb1h73cf0` | `@layer utilities` | `overflow: hidden;` |
| `rb1h9w10j` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1hikl8e` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1hkd0nc` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1hq9do7` | `@layer utilities` | `column-gap: calc(var(--spacing)*6);` |
| `rb1iqgz23` | `@layer utilities` | `align-items: baseline;` |
| `rb1j6c9fb` | `@layer utilities` | `pointer-events: none;` |
| `rb1jqwg40` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1k2rdlt` | `@layer utilities › @media (min-width: 40rem)` | `flex-direction: row;` |
| `rb1kh51y` | `@layer utilities` | `text-align: left;` |
| `rb1kz9xox` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1l509zw` | `@layer utilities` | `justify-content: space-between;` |
| `rb1ly2wdh` | `@layer utilities` | `overflow-y: auto;` |
| `rb1lypal9` | `@layer utilities` | `justify-content: center;` |
| `rb1m3ee9n` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1m64wz0` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1m6dwh8` | `@layer utilities` | `user-select: none;` |
| `rb1mlrtl8` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1n19a1i` | `@layer utilities` | `vertical-align: middle;` |
| `rb1ncd5cq` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1nf6er6` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1o7neml` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1ou8h8b` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1p6eobz` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb1r67w13` | `@layer utilities` | `flex-direction: column;` |
| `rb1rbvicr` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1rctce8` | `@layer utilities` | `margin-top: calc(var(--spacing)*2.5);` |
| `rb1ritxp0` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1rt865a` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1rvx11` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1rxi51j` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1s24mh4` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
