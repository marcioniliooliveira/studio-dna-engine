# navbar-9

> **Category:** Navbar (`navbar`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/navbar/navbar-9](https://pro.reactbits.dev/docs/app-ui/navbar/navbar-9)  
> **Native Viewport:** `1280px × 560px`

Store navbar with a mini cart

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`navbar-9.jsx`](./navbar-9.jsx) (minHeight: `560px`, hooks: `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`navbar-9.sorbet.jsx`](./navbar-9.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 56 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 118 |
| **Buttons** | 7 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 4 |
| **SVGs / Canvases** | 7 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Brewing`
- `Beans`
- `3`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 118)

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
| `rb14zn8f3` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb15d4zaj` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1682lbs` | `@layer utilities` | `padding-inline: 4px;` |
| `rb16jknk5` | `@layer utilities` | `scale: 0.98;` |
| `rb16r2zre` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb176dn10` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb17jn691` | `@layer utilities` | `margin: calc(var(--spacing)*2);` |
| `rb17ym83h` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb18bpz5e` | `@layer utilities` | `width: fit-content;` |
| `rb19boa3l` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1aqdeq2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1as00mw` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1c8he36` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1cemfon` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1chcmme` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1cpx8hp` | `@layer utilities` | `padding: calc(var(--spacing)*3);` |
| `rb1cute18` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1d5c6z1` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1dhu84q` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1dvk7mr` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1emheuw` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1fuy78w` | `@layer utilities` | `z-index: 20;` |
| `rb1fwukel` | `@layer utilities` | `top: calc(var(--spacing)*-.5);` |
| `rb1gjz0dn` | `@layer utilities` | `margin-left: calc(var(--spacing)*4);` |
| `rb1gvvq14` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1gxfu9g` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1hp00e` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1kes35b` | `@layer utilities › @media (min-width: 48rem)` | `display: flex;` |
| `rb1lnemyx` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1m1fdkc` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1mmb35i` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1o0p2ns` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1pdkfvd` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1ptqku9` | `@layer utilities` | `align-items: center;` |
| `rb1pvcrq7` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1qngxyc` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1qpkysb` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1qzkkha` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1r1oruk` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1r9k669` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1r9y1e5` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1t9l6kx` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1u69ykb` | `@layer utilities` | `position: relative;` |
| `rb1ucslsh` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1vkg9j5` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1vrh8dg` | `@layer utilities › @media (min-width: 48rem)` | `display: none;` |
| `rb1wm3ia7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1xhl6bp` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1xupqe3` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1y2ovzi` | `@layer utilities` | `text-align: center;` |
| `rb1yl0e24` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1ypax43` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1yqffny` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1z0qr9w` | `@layer utilities` | `right: calc(var(--spacing)*-.5);` |
| `rb30dp65` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb31sr77` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb3sl7pa` | `@layer utilities` | `position: absolute;` |
| `rb4v3ne6` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb4yp55z` | `@layer utilities` | `display: grid;` |
| `rb5krttb` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb5x2ell` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb63odtw` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb64r179` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb6m8tzd` | `@layer utilities` | `height: 100%;` |
| `rb6saw3z` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb78xboe` | `@layer utilities` | `margin-left: auto;` |
| `rb7lm1ej` | `@layer utilities` | `flex-direction: column;` |
| `rb7xewsf` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb83cso2` | `@layer utilities` | `display: inline-flex;` |
| `rb8trxn6` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb90k5va` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb9fwz0g` | `@layer utilities` | `min-height: 560px;` |
