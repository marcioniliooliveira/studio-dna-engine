# forms-3

> **Category:** Forms (`forms`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/forms/forms-3](https://pro.reactbits.dev/docs/app-ui/forms/forms-3)  
> **Native Viewport:** `1280px × 1120px`

Booking form with a line items table

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`forms-3.jsx`](./forms-3.jsx) (minHeight: `1120px`, hooks: `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`forms-3.sorbet.jsx`](./forms-3.sorbet.jsx) (minHeight: `1120px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 272 |
| **Max DOM Depth** | 13 |
| **Atomic/Scoped Classes** | 234 |
| **Buttons** | 16 |
| **Inputs / Textareas / Selects** | 11 / 0 / 10 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 17 / 0 |
| **ARIA Roles** | `combobox` |

### Visible Headings & Interactive Labels
- `New freight booking`
- `Consignor`
- `Account`
- `Northwind Traders`
- `Booking reference`
- `Tax identifier`
- `Booking contact`
- `Route and terms`
- `Pickup date`
- `Delivery date`
- `Incoterm`
- `DAP, delivered at place`
- `Service level`
- `Standard groupage`
- `Currency`
- `EUR, euro`
- `Cargo lines`
- `Palletised dry goods`
- `5% reduced`
- `Remove line`
- `Temperature-controlled`
- `12% standard`
- `Machinery and parts`
- `18% elevated`
- `Add line`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 230)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb109eg9o` | `@layer utilities` | `display: flex;` |
| `rb10a24nw` | `@layer utilities` | `cursor: pointer;` |
| `rb10fkfig` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb10pqjs2` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb115ukz9` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb117wnhx` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb118v662` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb11hfmk7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb11huf4z` | `@layer utilities › @media (min-width: 48rem)` | `grid-row-start: auto;` |
| `rb11i59ru` | `@layer utilities` | `width: fit-content;` |
| `rb11s5mly` | `@layer utilities` | `opacity: 0;` |
| `rb12ohqle` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb12wgshg` | `@layer utilities` | `cursor: progress;` |
| `rb14d05u4` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb14fux24` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb14pusz9` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb14r2pqs` | `@layer utilities` | `flex-direction: column-reverse;` |
| `rb15038g4` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb152wxwq` | `@layer utilities` | `display: inline-flex;` |
| `rb15b2suy` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb15sshvq` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb16jcuu2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb16uc924` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*3);` |
| `rb175rt0z` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb178eejg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb17frepy` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb17pr0ex` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb17zqm3w` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb188a12h` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb18cctbc` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb18f8efw` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb18jpthu` | `@layer utilities` | `gap: calc(var(--spacing)*6);` |
| `rb197hnyd` | `@layer utilities › @media (min-width: 40rem)` | `min-height: calc(var(--spacing)*11);` |
| `rb19q75fe` | `@layer utilities` | `grid-row-start: 1;` |
| `rb1a9eha1` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1aeu4oh` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1ah349n` | `@layer utilities` | `cursor: text;` |
| `rb1bh17hl` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb1c87gx5` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1codv5p` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1d4zkt8` | `@layer utilities` | `min-width: calc(var(--spacing)*40);` |
| `rb1druwp` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1ds1cgm` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*3);` |
| `rb1e35yz7` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1e8crg0` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1emj477` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1eqnvmy` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1f82wdq` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1gk0h8e` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1gw6sxs` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb1gwftgf` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1h1dbuc` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1h3p2dz` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1h6pgpp` | `@layer utilities` | `scale: 0.98;` |
| `rb1h9cvlt` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1hg60bq` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb1hl5cmh` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1hovl8y` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1io8mj3` | `@layer utilities` | `display: grid;` |
| `rb1iqjvjt` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1j1bbcj` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1j2hn9y` | `@layer utilities` | `position: absolute;` |
| `rb1j8ic60` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1jjp38d` | `@layer utilities` | `grid-column: span 2 / span 2;` |
| `rb1js1b08` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1kfajew` | `@layer utilities › @media (min-width: 48rem)` | `display: grid;` |
| `rb1kj1dzk` | `@layer utilities` | `overflow: hidden;` |
| `rb1kpho1k` | `@layer utilities` | `height: 100%;` |
| `rb1kxb4jq` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1l8gy9z` | `@layer utilities` | `width: 100%;` |
| `rb1le6l6v` | `@layer utilities › @media (min-width: 48rem)` | `grid-column: span 1 / span 1;` |
| `rb1ly3p9j` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1n08sju` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1nksauy` | `@layer utilities` | `visibility: hidden;` |
| `rb1o4wj6s` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb1o6rkw7` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1oew4vr` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb1omvbuc` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
