# navbar-12

> **Category:** Navbar (`navbar`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/navbar/navbar-12](https://pro.reactbits.dev/docs/app-ui/navbar/navbar-12)  
> **Native Viewport:** `1280px × 480px`

Floating navbar that lifts on scroll

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`navbar-12.jsx`](./navbar-12.jsx) (minHeight: `480px`, hooks: `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`navbar-12.sorbet.jsx`](./navbar-12.sorbet.jsx) (minHeight: `480px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 38 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 126 |
| **Buttons** | 6 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 1 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Product`
- `Customers`
- `Pricing`
- `Docs`
- `Get started`
- `One workspace for the whole release`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 125)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10jwy63` | `@layer utilities` | `opacity: 0.4;` |
| `rb10n4s7x` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb10xhwdy` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb11gklx0` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb12fhtxx` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb12fjvio` | `@layer utilities` | `user-select: none;` |
| `rb13ibt57` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb13lp7y8` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb14j1khp` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb14yp42e` | `@layer utilities` | `max-width: 52ch;` |
| `rb15d4zaj` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb15tcyra` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb16jknk5` | `@layer utilities` | `scale: 0.98;` |
| `rb16r2zre` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1712lgd` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb176dn10` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb19boa3l` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb19ppbmv` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1bluux2` | `@layer utilities` | `pointer-events: auto;` |
| `rb1c8he36` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1chcmme` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1cute18` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1d5c6z1` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1dhu84q` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1dlklxs` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1dvk7mr` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1emheuw` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1fukap7` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb1fuy78w` | `@layer utilities` | `z-index: 20;` |
| `rb1g4i3jh` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*10);` |
| `rb1g91hs` | `@layer utilities › @media (min-width: 40rem)` | `display: flex;` |
| `rb1h2wzgq` | `@layer utilities` | `padding: calc(var(--spacing)*1.5);` |
| `rb1hp00e` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1ilwy46` | `@layer utilities` | `border-radius: inherit;` |
| `rb1j2q1s0` | `@layer utilities` | `padding-top: calc(var(--spacing)*24);` |
| `rb1jpmhb` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1kq6ojo` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
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
| `rb1wm3ia7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1x2dulw` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1xhl6bp` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1xtajv4` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1xupqe3` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1yl0e24` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1ypax43` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1yqffny` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb2rt5i8` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb30dp65` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb31sr77` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb3sl7pa` | `@layer utilities` | `position: absolute;` |
| `rb5krttb` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb5x2ell` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb6m8tzd` | `@layer utilities` | `height: 100%;` |
| `rb6saw3z` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb78xboe` | `@layer utilities` | `margin-left: auto;` |
| `rb7lm1ej` | `@layer utilities` | `flex-direction: column;` |
| `rb7ojx22` | `@layer utilities › @media (min-width: 40rem)` | `padding-top: calc(var(--spacing)*4);` |
| `rb7xewsf` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb83cso2` | `@layer utilities` | `display: inline-flex;` |
| `rb868wku` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb90k5va` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb9pouij` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rbb05ik5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rbb9j9ej` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rbbgq50g` | `@layer utilities` | `height: 110px;` |
