# navbar-1

> **Category:** Navbar (`navbar`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/navbar/navbar-1](https://pro.reactbits.dev/docs/app-ui/navbar/navbar-1)  
> **Native Viewport:** `1280px × 480px`

Project header with sliding tab underline

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`navbar-1.jsx`](./navbar-1.jsx) (minHeight: `480px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`navbar-1.sorbet.jsx`](./navbar-1.sorbet.jsx) (minHeight: `480px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 76 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 172 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 2 |
| **SVGs / Canvases** | 8 / 0 |
| **ARIA Roles** | `tablist`, `tab` |

### Visible Headings & Interactive Labels
- `Checkout Flow`
- `Discussion 3`
- `Tasks`
- `Timeline`
- `Files`
- `Overview`
- `In progress`
- `In review`
- `Done`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 167)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1011lnt` | `@layer utilities` | `content: var(--tw-content); bottom: calc(var(--spacing)*0);` |
| `rb10jwy63` | `@layer utilities` | `opacity: 0.4;` |
| `rb112bev1` | `@layer utilities` | `align-items: flex-end;` |
| `rb11gklx0` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb12fhtxx` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb12fjvio` | `@layer utilities` | `user-select: none;` |
| `rb12oybay` | `@layer utilities` | `right: calc(var(--spacing)*0);` |
| `rb13ibt57` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb13lp7y8` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb13mj2cx` | `@layer utilities` | `width: calc(var(--spacing)*8);` |
| `rb144euhy` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb14df1sq` | `@layer utilities` | `min-height: calc(var(--spacing)*9);` |
| `rb14j1khp` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb14nenhp` | `@layer utilities` | `min-height: calc(var(--spacing)*8);` |
| `rb14zn8f3` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb1535dlk` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb15d4zaj` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb15tcyra` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb15tig8n` | `@layer utilities` | `min-width: 18px;` |
| `rb16jknk5` | `@layer utilities` | `scale: 0.98;` |
| `rb16r2zre` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1754oi8` | `@layer utilities` | `margin-bottom: -1px;` |
| `rb1767wc3` | `@layer utilities` | `width: 1px;` |
| `rb17ommei` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb17tac70` | `@layer utilities › @media (min-width: 64rem)` | `grid-template-columns: repeat(3, minmax(0px, 1fr));` |
| `rb17w7sh2` | `@layer utilities` | `padding-block: calc(var(--spacing)*5);` |
| `rb18bpz5e` | `@layer utilities` | `width: fit-content;` |
| `rb18q6ljz` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb19boa3l` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1a5837k` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1aclzq1` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1aqdeq2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1bp0xkf` | `@layer utilities` | `gap: calc(var(--spacing)*2.5);` |
| `rb1c8he36` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1cemfon` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1chcmme` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1cjqf41` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1dhu84q` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1dlklxs` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1ekry2g` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1emheuw` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1g91hs` | `@layer utilities › @media (min-width: 40rem)` | `display: flex;` |
| `rb1gvvq14` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1gxtyu1` | `@layer utilities` | `content: var(--tw-content); height: calc(var(--spacing)*.5);` |
| `rb1hp00e` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1i7wmjh` | `@layer utilities` | `margin-left: calc(var(--spacing)*2);` |
| `rb1ilwy46` | `@layer utilities` | `border-radius: inherit;` |
| `rb1jpmhb` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1judn5o` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1k1sxyn` | `@layer utilities` | `left: calc(var(--spacing)*0);` |
| `rb1kq6ojo` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1lnemyx` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1m1fdkc` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1mmb35i` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1mnwmwz` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
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
| `rb1slgm0m` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1t9l6kx` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1u69ykb` | `@layer utilities` | `position: relative;` |
| `rb1ucslsh` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1vkg9j5` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1vrd9e9` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1w4yy24` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1wm3ia7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1x2dulw` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1xhl6bp` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1xtajv4` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1xupqe3` | `@layer utilities` | `flex-shrink: 0;` |
