# navbar-14

> **Category:** Navbar (`navbar`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/navbar/navbar-14](https://pro.reactbits.dev/docs/app-ui/navbar/navbar-14)  
> **Native Viewport:** `1280px × 480px`

Article header with reading progress

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`navbar-14.jsx`](./navbar-14.jsx) (minHeight: `480px`, hooks: `offsetTop`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`navbar-14.sorbet.jsx`](./navbar-14.sorbet.jsx) (minHeight: `480px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 60 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 106 |
| **Buttons** | 5 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 5 / 0 |
| **ARIA Roles** | `status` |

### Visible Headings & Interactive Labels
- `Contents`
- `Error budgets that actually change behaviour`
- `Error budgets are a scheduling tool`
- `Pick the window before the target`
- `Alert on burn rate, not on breach`
- `Review the objective, not just the misses`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 106)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10n4s7x` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb11gklx0` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb12fhtxx` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb12fjvio` | `@layer utilities` | `user-select: none;` |
| `rb13lp7y8` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb14j1khp` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1535dlk` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb16jknk5` | `@layer utilities` | `scale: 0.98;` |
| `rb16r2zre` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1712lgd` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb176dn10` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb17c8l34` | `@layer utilities` | `padding-block: calc(var(--spacing)*7);` |
| `rb19boa3l` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb19ppbmv` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1aqdeq2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1c8he36` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1cemfon` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1chcmme` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1cute18` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1d5c6z1` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1dhu84q` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1dvk7mr` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1e8k0d7` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb1emheuw` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1fuy78w` | `@layer utilities` | `z-index: 20;` |
| `rb1gj5f4s` | `@layer utilities` | `font-size: 24px; line-height: 28px;` |
| `rb1hmrhrg` | `@layer utilities` | `display: block;` |
| `rb1hp00e` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1lnemyx` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1m1fdkc` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1mmb35i` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1o0p2ns` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
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
| `rb1uuj7pk` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb1vkg9j5` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1vxgs03` | `@layer utilities` | `height: 90px;` |
| `rb1wm3ia7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1xupqe3` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1yl0e24` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1yqffny` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb30dp65` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb31sr77` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb3kf94u` | `@layer utilities › @media (min-width: 40rem)` | `display: inline;` |
| `rb3sl7pa` | `@layer utilities` | `position: absolute;` |
| `rb49c1ux` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb4v3ne6` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb5x2ell` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb6m8tzd` | `@layer utilities` | `height: 100%;` |
| `rb6saw3z` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb7lm1ej` | `@layer utilities` | `flex-direction: column;` |
| `rb83cso2` | `@layer utilities` | `display: inline-flex;` |
| `rb90k5va` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rbb05ik5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rbb9j9ej` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rbc4i9zf` | `@layer utilities` | `pointer-events: none;` |
| `rbfe2f3w` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rbfrk0s6` | `@layer utilities` | `white-space: nowrap;` |
| `rbg3rhw7` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*3);` |
| `rbgpgc72` | `@layer utilities` | `width: 100%;` |
| `rbi153xx` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rbingzyi` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rbip0ki8` | `@layer utilities` | `cursor: not-allowed;` |
| `rbjjhzjq` | `@layer utilities` | `margin-top: calc(var(--spacing)*7);` |
| `rbk8uyuk` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rbkngebm` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rbkxg00l` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rbnenco2` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rbnkcw4c` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rbnwpq49` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
