# app-sidebar-7

> **Category:** App Sidebar (`app-sidebar`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/app-sidebar/app-sidebar-7](https://pro.reactbits.dev/docs/app-ui/app-sidebar/app-sidebar-7)  
> **Native Viewport:** `1280px × 720px`

Full app shell with sidebar and header

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`app-sidebar-7.jsx`](./app-sidebar-7.jsx) (minHeight: `720px`, hooks: `activeElement`, `addEventListener`, `disconnect`, `observe`, `removeEventListener`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`app-sidebar-7.sorbet.jsx`](./app-sidebar-7.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 139 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 120 |
| **Buttons** | 1 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 14 |
| **SVGs / Canvases** | 15 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- _None captured_

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 119)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb109rilf` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb10cq56g` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb10es32g` | `@layer utilities` | `overflow-y: auto;` |
| `rb10hrkh5` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb10kmm8m` | `@layer utilities` | `height: 100%;` |
| `rb10veyy0` | `@layer utilities` | `display: none;` |
| `rb10w47ys` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb115nxwl` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb12ecame` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb136yleg` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb13cu3id` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb13db9r1` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb15nioe9` | `@layer utilities` | `padding-top: calc(var(--spacing)*4);` |
| `rb15p9dk3` | `@layer utilities` | `white-space: nowrap;` |
| `rb16f7zkc` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb16j8mxa` | `@layer utilities` | `cursor: pointer;` |
| `rb176tbgt` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb179rgsl` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb187eqpt` | `@layer utilities` | `position: absolute;` |
| `rb18hbucg` | `@layer utilities` | `mask-image: linear-gradient(90deg, rgb(0, 0, 0) calc(100% - 24px), rgba(0, 0, 0, 0));` |
| `rb19043u1` | `@layer utilities › @media (min-width: 64rem)` | `display: none;` |
| `rb196li0y` | `@layer utilities` | `align-items: center;` |
| `rb19cb1ln` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb19fcwup` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb19yt3op` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1aid0gg` | `@layer utilities` | `scale: 0.98;` |
| `rb1ajw9tx` | `@layer utilities` | `transition-property: background-color, color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transiti` |
| `rb1bezpky` | `@layer utilities › @media (min-width: 64rem)` | `display: flex;` |
| `rb1bhjl7y` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb1bhty9k` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1bzkymb` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb1cvhlot` | `@layer utilities` | `height: calc(var(--spacing)*11);` |
| `rb1dniks5` | `@layer utilities` | `border-right-style: var(--tw-border-style); border-right-width: 1px;` |
| `rb1ex4oq8` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1fmrr1z` | `@layer utilities` | `min-height: 720px;` |
| `rb1g8cnr1` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1ghkji5` | `@layer utilities` | `display: block;` |
| `rb1gj9h4x` | `@layer utilities` | `overflow: hidden;` |
| `rb1gxct3u` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1h3rtkl` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1h3spgp` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1hlpd3r` | `@layer utilities` | `text-align: left;` |
| `rb1i4wrly` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1i6ww2g` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1ib9y45` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1k35163` | `@layer utilities` | `display: inline-flex;` |
| `rb1ky1jlh` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1l7isom` | `@layer utilities` | `pointer-events: none;` |
| `rb1m6737l` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1mnx029` | `@layer utilities` | `width: 100%;` |
| `rb1n61i57` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1nia9oq` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1ok0ccy` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1oz4m2n` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1p7ea14` | `@layer utilities` | `flex-direction: column;` |
| `rb1pu260b` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1q1nvcd` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1qa3s6s` | `@layer utilities` | `position: relative;` |
| `rb1r0nchd` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1rbwdao` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1s72qev` | `@layer utilities` | `opacity: 1;` |
| `rb1sgijfj` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1u85gds` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1vgrah9` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1whtv3f` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1wqyxeq` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1wyo81t` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1xv794p` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1xy3ei0` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1ylflkc` | `@layer utilities` | `margin-inline-start: auto;` |
| `rb3r6u9g` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb5fd7ca` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-900); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb5z1h6d` | `@layer utilities` | `padding-right: calc(var(--spacing)*2);` |
| `rb73bq7b` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rbac3e30` | `@layer utilities` | `opacity: 0;` |
| `rbbrjuvm` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rbbrpe4z` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rbcesity` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
