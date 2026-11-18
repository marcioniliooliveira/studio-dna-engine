# navbar-6

> **Category:** Navbar (`navbar`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/navbar/navbar-6](https://pro.reactbits.dev/docs/app-ui/navbar/navbar-6)  
> **Native Viewport:** `1280px × 480px`

App bar with search and notifications

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`navbar-6.jsx`](./navbar-6.jsx) (minHeight: `480px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`navbar-6.sorbet.jsx`](./navbar-6.sorbet.jsx) (minHeight: `480px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 65 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 172 |
| **Buttons** | 5 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 1 |
| **SVGs / Canvases** | 7 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Search Northwind`
- `New`
- `4`
- `EM`
- `Today`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 169)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10jwy63` | `@layer utilities` | `opacity: 0.4;` |
| `rb10xhwdy` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb111gsne` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb111jth2` | `@layer utilities` | `min-height: calc(var(--spacing)*5);` |
| `rb11gklx0` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb12fhtxx` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb12fjvio` | `@layer utilities` | `user-select: none;` |
| `rb13g2knu` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb13ibt57` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb13lp7y8` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb14j1khp` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb14qvp8` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb14zn8f3` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb15d4zaj` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb15tcyra` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb15ug4aq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb15x46oh` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1);` |
| `rb1682lbs` | `@layer utilities` | `padding-inline: 4px;` |
| `rb16jknk5` | `@layer utilities` | `scale: 0.98;` |
| `rb16r2zre` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb176dn10` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb188bczd` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb18bpz5e` | `@layer utilities` | `width: fit-content;` |
| `rb18q6ljz` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb19boa3l` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb19zkved` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1aqdeq2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1as00mw` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1b3l0ty` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1c8he36` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1cemfon` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1chcmme` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1cjqf41` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1d4w1jy` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1d5iogh` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb1dhu84q` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1elfapf` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1emheuw` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1fuy78w` | `@layer utilities` | `z-index: 20;` |
| `rb1fwukel` | `@layer utilities` | `top: calc(var(--spacing)*-.5);` |
| `rb1ga32cq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1gd1sfz` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1gvvq14` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1h0wtz7` | `@layer utilities` | `cursor: text;` |
| `rb1h23a25` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb1hp00e` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1ilwy46` | `@layer utilities` | `border-radius: inherit;` |
| `rb1j7cjgg` | `@layer utilities` | `color-scheme: dark;` |
| `rb1jgb704` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1kcx7dm` | `@layer utilities` | `max-width: 420px;` |
| `rb1kq6ojo` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1l0qkol` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1lnemyx` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1lwc541` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1lxxsa4` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1m1fdkc` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1mmb35i` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1n7wn4b` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1o0p2ns` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1out292` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1pdkfvd` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1pjvsep` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb1ptqku9` | `@layer utilities` | `align-items: center;` |
| `rb1pvcrq7` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1qngxyc` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1qpkysb` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1qzkkha` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1r1oruk` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1rn4hjl` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1slgm0m` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1st3yky` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1t9l6kx` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1thtgg0` | `@layer utilities` | `cursor: default;` |
| `rb1u69ykb` | `@layer utilities` | `position: relative;` |
| `rb1ucpj95` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1ucslsh` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1vkg9j5` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1wm3ia7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
