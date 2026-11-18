# navbar-4

> **Category:** Navbar (`navbar`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/navbar/navbar-4](https://pro.reactbits.dev/docs/app-ui/navbar/navbar-4)  
> **Native Viewport:** `1280px × 560px`

Marketing header with dropdown panels

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`navbar-4.jsx`](./navbar-4.jsx) (minHeight: `560px`, hooks: `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`navbar-4.sorbet.jsx`](./navbar-4.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 38 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 130 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 5 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Product`
- `Company`
- `One workspace for the whole release`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 130)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10jwy63` | `@layer utilities` | `opacity: 0.4;` |
| `rb10n4s7x` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb10xhwdy` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb11gklx0` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb11u3k3r` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb12fhtxx` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb12fjvio` | `@layer utilities` | `user-select: none;` |
| `rb13ibt57` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb14j1khp` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb15tcyra` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb16jknk5` | `@layer utilities` | `scale: 0.98;` |
| `rb16kys27` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb16r2zre` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1767wc3` | `@layer utilities` | `width: 1px;` |
| `rb176dn10` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb18suny9` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb19boa3l` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb19ppbmv` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1a23rf3` | `@layer utilities` | `max-width: 560px;` |
| `rb1aqdeq2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1az6wah` | `@layer utilities` | `margin-inline: calc(var(--spacing)*2);` |
| `rb1b7hhrp` | `@layer utilities` | `max-width: 720px;` |
| `rb1bi2mhp` | `@layer utilities` | `padding-block: calc(var(--spacing)*8);` |
| `rb1c5d9bd` | `@layer utilities` | `height: 120px;` |
| `rb1c8he36` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1chcmme` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1cute18` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1d5c6z1` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1dhu84q` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1dvk7mr` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1emheuw` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1f9bhqy` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1fuy78w` | `@layer utilities` | `z-index: 20;` |
| `rb1hp00e` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1kcx7dm` | `@layer utilities` | `max-width: 420px;` |
| `rb1kq6ojo` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1lnemyx` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1lpglug` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1m1fdkc` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1mmb35i` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1o0p2ns` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1orhh5d` | `@layer utilities › @media (min-width: 48rem)` | `display: block;` |
| `rb1pdkfvd` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1ptqku9` | `@layer utilities` | `align-items: center;` |
| `rb1pvcrq7` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1qngxyc` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1qzkkha` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1r1oruk` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1r9y1e5` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1t9l6kx` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1u69ykb` | `@layer utilities` | `position: relative;` |
| `rb1ucslsh` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1vbc636` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1vrh8dg` | `@layer utilities › @media (min-width: 48rem)` | `display: none;` |
| `rb1wm3ia7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1x2dulw` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1xhl6bp` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1xtajv4` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1xupqe3` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1y2ovzi` | `@layer utilities` | `text-align: center;` |
| `rb1yl0e24` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1ypax43` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1yqffny` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb30dp65` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb31sr77` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb3sl7pa` | `@layer utilities` | `position: absolute;` |
| `rb3ydsv` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb4v3ne6` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb5x2ell` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb64r179` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb6m8tzd` | `@layer utilities` | `height: 100%;` |
| `rb6saw3z` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb6xiegy` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb78xboe` | `@layer utilities` | `margin-left: auto;` |
| `rb7cc4t4` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb7lm1ej` | `@layer utilities` | `flex-direction: column;` |
| `rb83cso2` | `@layer utilities` | `display: inline-flex;` |
| `rb8t8nyn` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
