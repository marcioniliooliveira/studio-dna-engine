# navbar-8

> **Category:** Navbar (`navbar`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/navbar/navbar-8](https://pro.reactbits.dev/docs/app-ui/navbar/navbar-8)  
> **Native Viewport:** `1280px × 400px`

Tab bar with an animated pill

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`navbar-8.jsx`](./navbar-8.jsx) (minHeight: `400px`, hooks: `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`navbar-8.sorbet.jsx`](./navbar-8.sorbet.jsx) (minHeight: `400px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 78 |
| **Max DOM Depth** | 7 |
| **Atomic/Scoped Classes** | 152 |
| **Buttons** | 13 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 9 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `All 248`
- `Open 46`
- `In review 12`
- `Done 190`
- `Filter`
- `Display`
- `Export`
- `Retry failed webhooks after backoff Nadia V. 12m`
- `Split checkout bundle by route Marcus S. 1h`
- `Backfill invoice tax regions Priya R. 3h`
- `Rotate signing keys for Harbor Coffee Tom A. 6h`
- `Trim onboarding email sequence Elena M. 1d`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 148)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb106ji9j` | `@layer utilities › @media (min-width: 48rem)` | `opacity: 1;` |
| `rb10n4s7x` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb10skrcv` | `@layer utilities` | `min-height: 400px;` |
| `rb118p0do` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb11gklx0` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb11u3k3r` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb12fhtxx` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb12fjvio` | `@layer utilities` | `user-select: none;` |
| `rb13lp7y8` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb13mj2cx` | `@layer utilities` | `width: calc(var(--spacing)*8);` |
| `rb144euhy` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb14j1khp` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb14nenhp` | `@layer utilities` | `min-height: calc(var(--spacing)*8);` |
| `rb1535dlk` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb15d4zaj` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb15x46oh` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1);` |
| `rb16jknk5` | `@layer utilities` | `scale: 0.98;` |
| `rb16kys27` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb16r2zre` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb17o6cc` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb18bpz5e` | `@layer utilities` | `width: fit-content;` |
| `rb18g6zv0` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb18suny9` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb190678y` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb19boa3l` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb19gi9rn` | `@layer utilities` | `padding-block: calc(var(--spacing)*1.5);` |
| `rb1aqdeq2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1c8he36` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1cemfon` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1chcmme` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1cjqf41` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1cute18` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1d5c6z1` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1dhu84q` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1ekry2g` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1f9bhqy` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1fuy78w` | `@layer utilities` | `z-index: 20;` |
| `rb1gxfu9g` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1hp00e` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1j08inh` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1lnemyx` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1lpglug` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1m1fdkc` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1mmb35i` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1mqimjy` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
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
| `rb1uda0c7` | `@layer utilities` | `margin-inline-start: calc(var(--spacing)*.5);` |
| `rb1vath37` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1vbc636` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1vkg9j5` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1wm3ia7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1xhl6bp` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1xupqe3` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1yl0e24` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1ypax43` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1yqffny` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb2cu7yz` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb2lhetx` | `@layer utilities` | `align-items: stretch;` |
| `rb30dp65` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb3kf94u` | `@layer utilities › @media (min-width: 40rem)` | `display: inline;` |
| `rb3sl7pa` | `@layer utilities` | `position: absolute;` |
| `rb3ydsv` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb4pk533` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb4v3ne6` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb57s8lg` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb58hih9` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb5krttb` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb5to8k9` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
