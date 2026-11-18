# navbar-7

> **Category:** Navbar (`navbar`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/navbar/navbar-7](https://pro.reactbits.dev/docs/app-ui/navbar/navbar-7)  
> **Native Viewport:** `1280px × 480px`

Two-tier dashboard header

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`navbar-7.jsx`](./navbar-7.jsx) (minHeight: `480px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`navbar-7.sorbet.jsx`](./navbar-7.sorbet.jsx) (minHeight: `520px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 66 |
| **Max DOM Depth** | 7 |
| **Atomic/Scoped Classes** | 201 |
| **Buttons** | 14 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 1 |
| **SVGs / Canvases** | 6 / 0 |
| **ARIA Roles** | `tablist`, `tab`, `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Growth workspace`
- `RK`
- `Overview`
- `Revenue`
- `Customers`
- `Usage`
- `Reports`
- `Feedback`
- `MRR`
- `Expansion`
- `Churn`
- `Revenue MRR`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 195)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1011lnt` | `@layer utilities` | `content: var(--tw-content); bottom: calc(var(--spacing)*0);` |
| `rb10n4s7x` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb10rbi25` | `@layer utilities` | `height: calc(var(--spacing)*10);` |
| `rb10xhwdy` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb112bev1` | `@layer utilities` | `align-items: flex-end;` |
| `rb11gklx0` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb11u3k3r` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb12fhtxx` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb12fjvio` | `@layer utilities` | `user-select: none;` |
| `rb12oybay` | `@layer utilities` | `right: calc(var(--spacing)*0);` |
| `rb13lp7y8` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb13mj2cx` | `@layer utilities` | `width: calc(var(--spacing)*8);` |
| `rb144euhy` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb14bxiuw` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb14j1khp` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb14n2cpy` | `@layer utilities` | `grid-template-columns: repeat(2, minmax(0px, 1fr));` |
| `rb14nenhp` | `@layer utilities` | `min-height: calc(var(--spacing)*8);` |
| `rb1535dlk` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb15d4zaj` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb15tcyra` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb16jknk5` | `@layer utilities` | `scale: 0.98;` |
| `rb16kys27` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb16r2zre` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1754oi8` | `@layer utilities` | `margin-bottom: -1px;` |
| `rb1767wc3` | `@layer utilities` | `width: 1px;` |
| `rb176dn10` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb17ommei` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb18bpz5e` | `@layer utilities` | `width: fit-content;` |
| `rb18g6zv0` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb18suny9` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb19boa3l` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb19gi9rn` | `@layer utilities` | `padding-block: calc(var(--spacing)*1.5);` |
| `rb1a5837k` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1aqdeq2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1as00mw` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1bwq26o` | `@layer utilities › @container (min-width: 28rem)` | `grid-column: auto;` |
| `rb1c8he36` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1cemfon` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1chcmme` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1cute18` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1d5c6z1` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1dhu84q` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1dvk7mr` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1ekry2g` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1emheuw` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1ez248r` | `@layer utilities › @container (min-width: 28rem)` | `grid-template-columns: none;` |
| `rb1f9bhqy` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1fuy78w` | `@layer utilities` | `z-index: 20;` |
| `rb1gxtyu1` | `@layer utilities` | `content: var(--tw-content); height: calc(var(--spacing)*.5);` |
| `rb1h84j4a` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline-start: calc(var(--spacing)*3);` |
| `rb1hdxtgk` | `@layer utilities` | `margin-left: calc(var(--spacing)*1);` |
| `rb1hp00e` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1ilwy46` | `@layer utilities` | `border-radius: inherit;` |
| `rb1jpmhb` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1k1sxyn` | `@layer utilities` | `left: calc(var(--spacing)*0);` |
| `rb1lnemyx` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1lpglug` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1m1fdkc` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1mdgmk9` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline-end: calc(var(--spacing)*4);` |
| `rb1mmb35i` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1mnwmwz` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1mob5ho` | `@layer utilities` | `position: sticky;` |
| `rb1mqimjy` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1o0p2ns` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1pdkfvd` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1ptqku9` | `@layer utilities` | `align-items: center;` |
| `rb1pvcrq7` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1qngxyc` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1qpkysb` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1qzexrx` | `@layer utilities` | `opacity: 0;` |
| `rb1qzkkha` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1r1oruk` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1r9k669` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1r9y1e5` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1rskrlm` | `@layer utilities` | `grid-column: 1 / -1;` |
| `rb1t9l6kx` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1u69ykb` | `@layer utilities` | `position: relative;` |
| `rb1ucslsh` | `@layer utilities` | `outline-offset: 2px;` |
