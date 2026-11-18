# notifications-6

> **Category:** Notifications (`notifications`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/notifications/notifications-6](https://pro.reactbits.dev/docs/app-ui/notifications/notifications-6)  
> **Native Viewport:** `1280px × 560px`

Bell with a notifications popover

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`notifications-6.jsx`](./notifications-6.jsx) (minHeight: `560px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`notifications-6.sorbet.jsx`](./notifications-6.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 29 |
| **Max DOM Depth** | 7 |
| **Atomic/Scoped Classes** | 106 |
| **Buttons** | 2 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 3 |
| **SVGs / Canvases** | 2 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `3`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 106)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb116mkm9` | `@layer utilities` | `cursor: progress;` |
| `rb1249qyj` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb12ahi02` | `@layer utilities › @media (min-width: 40rem)` | `position: relative;` |
| `rb12f9879` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb13981a6` | `@layer utilities` | `height: calc(var(--spacing)*5);` |
| `rb13km88u` | `@layer utilities` | `min-width: 16px;` |
| `rb14hx1vf` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb14j9odd` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb14le6fz` | `@layer utilities` | `margin-left: calc(var(--spacing)*1);` |
| `rb14mzefw` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb15peaas` | `@layer utilities` | `flex-direction: column;` |
| `rb15yi0t6` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb16dxvga` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb177uqr0` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb17iyry9` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb198pwtc` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb19fpiol` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb19gek42` | `@layer utilities` | `pointer-events: none;` |
| `rb19pe2pm` | `@layer utilities` | `height: 100%;` |
| `rb1a1ui1c` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1a39gh1` | `@layer utilities` | `position: absolute;` |
| `rb1b9wq2d` | `@layer utilities` | `overflow: hidden;` |
| `rb1bcbk2n` | `@layer utilities` | `display: flex;` |
| `rb1cnuhfp` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1ffrf6d` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1fjdpws` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1g6g3zd` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1gsiq47` | `@layer utilities` | `border-radius: inherit;` |
| `rb1hcyexh` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1hdx20k` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1ihsqjx` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1ja4fjl` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1jawbo3` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1jupyqv` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1kwhpei` | `@layer utilities` | `height: 16px;` |
| `rb1lg8to3` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1qaylye` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1qnhutj` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1qsze9a` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1rjcdn6` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1spvaty` | `@layer utilities` | `width: 28px; height: 28px;` |
| `rb1tcvzxr` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1vnb747` | `@layer utilities` | `white-space: nowrap;` |
| `rb1w5ydua` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1xr56nr` | `@layer utilities` | `padding-inline: 4px;` |
| `rb302fct` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb4twv3w` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb5wbw0i` | `@layer utilities` | `justify-content: center;` |
| `rb5ww0id` | `@layer utilities › @media (min-width: 40rem)` | `display: flex;` |
| `rb7v498x` | `@layer utilities` | `user-select: none;` |
| `rb8k7qys` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb8mbs94` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb9uak54` | `@layer utilities` | `position: relative;` |
| `rbac5dpe` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rbc707mk` | `@layer utilities` | `flex-shrink: 0;` |
| `rbcp799a` | `@layer utilities` | `align-items: center;` |
| `rbcprgbr` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rbdhva51` | `@layer utilities` | `cursor: not-allowed;` |
| `rbeefws3` | `@layer utilities` | `text-align: center;` |
| `rbexnn06` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rbf1n41b` | `@layer utilities` | `display: inline-flex;` |
| `rbfpljsh` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rbgkoppw` | `@layer utilities` | `display: none;` |
| `rbgm7vua` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rbgrlzdd` | `@layer utilities` | `min-height: 560px;` |
| `rbh5orz4` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rbhijydk` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rbhpjnxw` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rbintag5` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rbiuwehz` | `@layer utilities` | `width: fit-content;` |
| `rbivff5p` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rbjpatdf` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rbkatap7` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rbkjg9bl` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rbkxivm7` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rbm55rdl` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rbmhm6oh` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rbnaslfo` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
