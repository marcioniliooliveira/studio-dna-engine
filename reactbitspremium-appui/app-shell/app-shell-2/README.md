# app-shell-2

> **Category:** App Shell (`app-shell`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/app-shell/app-shell-2](https://pro.reactbits.dev/docs/app-ui/app-shell/app-shell-2)  
> **Native Viewport:** `1280px × 720px`

Icon rail with a swapping nav pane

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`app-shell-2.jsx`](./app-shell-2.jsx) (minHeight: `720px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`app-shell-2.sorbet.jsx`](./app-shell-2.sorbet.jsx) (minHeight: `800px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 265 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 176 |
| **Buttons** | 20 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 18 |
| **SVGs / Canvases** | 7 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `MK`
- `K Kestrel Freight 24 members`
- `Shipments`
- `New shipment`
- `All shipments`
- `Halvorsen Cold Chain Logistics AB KF-40218 Newark → Montréal 14 Mar In transit`
- `Brightwater Foods KF-40211 Savannah → Atlanta 13 Mar Delivered`
- `Ardent Medical Supply KF-40207 Houston → El Paso 14 Mar Delayed`
- `Corriveau Frères Distribution KF-40233 Detroit → Windsor 15 Mar Customs hold`
- `Pinewood Building Products KF-40199 Portland → Boise 12 Mar Delivered`
- `Northgate Appliance KF-40241 Chicago → Omaha Awaiting pickup`
- `Lakeshore Beverage Co. KF-40188 Milwaukee → Fargo 16 Mar In transit`
- `Sable & Finch Furnishings KF-40250 Charlotte → Richmond 15 Mar Failed delivery`
- `Tamarack Paper Mills KF-40176 Duluth → Sioux Falls 13 Mar Delivered`
- `Ridgeline Auto Parts KF-40262 Reno → Sacramento 16 Mar In transit`
- `Meridian Home Goods KF-40255 Tampa → Mobile 17 Mar Awaiting pickup`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 172)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1079y6y` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb10ivl0p` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb11377ge` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb114uaql` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb11n6euc` | `@layer utilities` | `height: calc(var(--spacing)*12);` |
| `rb11n95vl` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb11t5cwt` | `@layer utilities` | `color: oklch(0.49 0.1 68);` |
| `rb11ti8ky` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1246nw1` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb12h57x9` | `@layer utilities` | `height: calc(var(--spacing)*11);` |
| `rb12qieak` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb12sgksd` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb13vkdzp` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1413q4b` | `@layer utilities` | `display: inline-flex;` |
| `rb141tmc9` | `@layer utilities` | `cursor: not-allowed;` |
| `rb158s7sz` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb15mcx5j` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb15mw4f` | `@layer utilities` | `padding-left: calc(var(--spacing)*2);` |
| `rb15qmetl` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb15v8ubx` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb162snzc` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb16e9dkx` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb16l8pgc` | `@layer utilities` | `padding-block: calc(var(--spacing)*1.5);` |
| `rb16slk42` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb16zbhj8` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1782b5i` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb17fhbvk` | `@layer utilities` | `scale: 0.98;` |
| `rb17s0ved` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb19qwc5` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1anvo2` | `@layer utilities` | `align-items: center;` |
| `rb1bmrsro` | `@layer utilities` | `position: relative;` |
| `rb1bvkc2h` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1c8tupd` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb1cesixf` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1cnsnxg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1co1gog` | `@layer utilities` | `max-width: 100%;` |
| `rb1cwx5cf` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1d3xa9h` | `@layer utilities` | `transition-property: background-color, color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transiti` |
| `rb1d9arcu` | `@layer utilities` | `cursor: pointer;` |
| `rb1ddx9gk` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1de3m9k` | `@layer utilities` | `display: none;` |
| `rb1dpkigq` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-900); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1e50flx` | `@layer utilities` | `color: oklch(0.8 0.13 68);` |
| `rb1e9fuzq` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1fi5plr` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1fmfij6` | `@layer utilities` | `--tw-tracking: -.01em; letter-spacing: -0.01em;` |
| `rb1fv9b8k` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1ga6jiv` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1ghlxxt` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1haqai3` | `@layer utilities` | `display: flex;` |
| `rb1ilufjk` | `@layer utilities` | `align-items: baseline;` |
| `rb1irsar5` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1iw5ar7` | `@layer utilities` | `white-space: nowrap;` |
| `rb1iwfi8i` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1je6fqp` | `@layer utilities` | `padding-top: calc(var(--spacing)*4);` |
| `rb1jeg1ph` | `@layer utilities` | `padding-right: calc(var(--spacing)*2);` |
| `rb1jhhydv` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb1l5fkjp` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1lchqm1` | `@layer utilities` | `width: calc(var(--spacing)*14);` |
| `rb1lrf9xu` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1map5d3` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1mo34vc` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1mrk539` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1n4t7rr` | `@layer utilities` | `margin-top: auto;` |
| `rb1nm8d5p` | `@layer utilities` | `cursor: progress;` |
| `rb1og4bd3` | `@layer utilities` | `min-height: 720px;` |
| `rb1omtbpe` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1oo3zux` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1ot9lvd` | `@layer utilities › @media (min-width: 64rem)` | `display: none;` |
| `rb1pcx5ig` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb1pczbzg` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1pqr8m8` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1pyj4e4` | `@layer utilities` | `margin-inline-start: auto;` |
| `rb1q07yi3` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb1q52qam` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1qa0ij` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1qf8ueu` | `@layer utilities` | `justify-content: center;` |
| `rb1qzgb0m` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
