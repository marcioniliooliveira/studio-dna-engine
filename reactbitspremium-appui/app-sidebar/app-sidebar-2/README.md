# app-sidebar-2

> **Category:** App Sidebar (`app-sidebar`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/app-sidebar/app-sidebar-2](https://pro.reactbits.dev/docs/app-ui/app-sidebar/app-sidebar-2)  
> **Native Viewport:** `1280px × 640px`

Icon rail with hover flyouts

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`app-sidebar-2.jsx`](./app-sidebar-2.jsx) (minHeight: `640px`, hooks: `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`app-sidebar-2.sorbet.jsx`](./app-sidebar-2.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 84 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 72 |
| **Buttons** | 12 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 11 / 0 |
| **ARIA Roles** | `list` |

### Visible Headings & Interactive Labels
- `TS`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 72 of 72)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10hrkh5` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb10kmm8m` | `@layer utilities` | `height: 100%;` |
| `rb10w47ys` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb115nxwl` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb136yleg` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb13db9r1` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb16f7zkc` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb16j8mxa` | `@layer utilities` | `cursor: pointer;` |
| `rb176tbgt` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb179rgsl` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb187eqpt` | `@layer utilities` | `position: absolute;` |
| `rb196li0y` | `@layer utilities` | `align-items: center;` |
| `rb19cb1ln` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb19fcwup` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb19yt3op` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1ajw9tx` | `@layer utilities` | `transition-property: background-color, color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transiti` |
| `rb1bhty9k` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1dniks5` | `@layer utilities` | `border-right-style: var(--tw-border-style); border-right-width: 1px;` |
| `rb1ex4oq8` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1g8cnr1` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1gj9h4x` | `@layer utilities` | `overflow: hidden;` |
| `rb1h3rtkl` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1hlpd3r` | `@layer utilities` | `text-align: left;` |
| `rb1k35163` | `@layer utilities` | `display: inline-flex;` |
| `rb1ky1jlh` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1l7isom` | `@layer utilities` | `pointer-events: none;` |
| `rb1m6737l` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1mnx029` | `@layer utilities` | `width: 100%;` |
| `rb1n61i57` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1nia9oq` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1p7ea14` | `@layer utilities` | `flex-direction: column;` |
| `rb1pu260b` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1q1nvcd` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1qa3s6s` | `@layer utilities` | `position: relative;` |
| `rb1r0nchd` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1u85gds` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1vgrah9` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1whtv3f` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1wqyxeq` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1wyo81t` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1xv794p` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb3r6u9g` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb4o0f0c` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rbbrjuvm` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rbbrpe4z` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rbcesity` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rbgxg3wj` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rbhuh5cv` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rbin854h` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rbis36t8` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rbj77cif` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rbjekx2e` | `@layer utilities` | `justify-content: center;` |
| `rbjh6y7e` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rbkp3b2n` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rbl7irmb` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rbn82nag` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rbnsp9xr` | `@layer utilities` | `flex-shrink: 0;` |
| `rbnyp0iv` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rbqgfm3u` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rbsgn2t2` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rbv84uc5` | `@layer utilities` | `user-select: none;` |
| `rbvfltmj` | `@layer utilities` | `display: flex;` |
| `rbvzw0d3` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rbw3r1hw` | `@layer utilities` | `min-height: 640px;` |
| `rbw6jvd5` | `@layer utilities` | `width: calc(var(--spacing)*14);` |
| `rbwnh06` | `@layer utilities` | `outline-offset: 2px;` |
| `rbx8gue0` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rbxkgwpx` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rbxueymz` | `@layer utilities` | `border-radius: inherit;` |
| `rbzbgjmr` | `@layer utilities` | `background-color: var(--color-white);` |
