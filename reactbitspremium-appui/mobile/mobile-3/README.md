# mobile-3

> **Category:** Mobile (`mobile`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/mobile/mobile-3](https://pro.reactbits.dev/docs/app-ui/mobile/mobile-3)  
> **Native Viewport:** `1280px × 680px`

Dock that morphs into a search field

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`mobile-3.jsx`](./mobile-3.jsx) (minHeight: `680px`, hooks: `icon`, `id`, `label`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`mobile-3.sorbet.jsx`](./mobile-3.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 81 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 95 |
| **Buttons** | 5 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 10 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- _None captured_

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 94)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb100uwkn` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb101iuv0` | `@layer utilities` | `max-width: 390px;` |
| `rb10tld6l` | `@layer utilities` | `align-items: center;` |
| `rb11l208t` | `@layer utilities` | `flex-direction: row;` |
| `rb11sl374` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb137jr96` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb13qhkn4` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb14d2hq1` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb14vwr1n` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb15fvyfl` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb17b5cp1` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb17e80ww` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb17gbeug` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1alwkuq` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1azdcgt` | `@layer utilities` | `border-radius: 28px;` |
| `rb1chkxy1` | `@layer utilities` | `inset: calc(var(--spacing)*0);` |
| `rb1d1op06` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1debhct` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1eb4dfo` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1fjxrkw` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1fuu45t` | `@layer utilities` | `cursor: pointer;` |
| `rb1iribep` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1j3i474` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jksbjr` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1lbl0vw` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1lz44a2` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*28);` |
| `rb1mg4hov` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*5);` |
| `rb1mxn4p1` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1nyxy2t` | `@layer utilities` | `overflow-y: auto;` |
| `rb1puh1rs` | `@layer utilities` | `align-items: flex-start;` |
| `rb1pz109a` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1pzlrvw` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1qud80c` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1rj3jg5` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1sakxt6` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1t2clkp` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1t8u3os` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1thgshu` | `@layer utilities` | `z-index: 40;` |
| `rb1uzgnfv` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1wqixo0` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1y4rxv3` | `@layer utilities` | `position: relative;` |
| `rb1yc2knk` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb2a6stx` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb2q6bi` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb4pyygz` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb50hwfe` | `@layer utilities` | `border-right-style: var(--tw-border-style); border-right-width: 1px;` |
| `rb6pcc2l` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb6tumjx` | `@layer utilities` | `height: 100%;` |
| `rb6wkv4r` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb6x9xh9` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb7ux2am` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb7yykh6` | `@layer utilities` | `pointer-events: auto;` |
| `rb8dcxhp` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb8oqg57` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb8uwkn` | `@layer utilities` | `flex-shrink: 0;` |
| `rb98ccpb` | `@layer utilities` | `width: 1px;` |
| `rbam60bh` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rbb8sumq` | `@layer utilities` | `border-radius: inherit;` |
| `rbcewfue` | `@layer utilities` | `display: inline-flex;` |
| `rbduge3k` | `@layer utilities` | `margin-top: calc(var(--spacing)*2.5);` |
| `rbduq3u1` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rbffeqyk` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rbfhtima` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rbfmmwt5` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rbhkswz7` | `@layer utilities` | `width: calc(var(--spacing)*11); height: calc(var(--spacing)*11);` |
| `rbhrbm6t` | `@layer utilities` | `min-height: 680px;` |
| `rbhsvtug` | `@layer utilities` | `display: flex;` |
| `rbii67ke` | `@layer utilities` | `--tw-shadow: 0 12px 24px -12px var(--tw-shadow-color,#0009); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-of` |
| `rbikzfsk` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rbj08zi4` | `@layer utilities` | `width: auto;` |
| `rbjrdrzt` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rbkps75m` | `@layer utilities` | `height: calc(var(--spacing)*6);` |
| `rbljwhcj` | `@layer utilities` | `padding: calc(var(--spacing)*1);` |
| `rbm88qpu` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rbmdvafg` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rbmi8cet` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rbmnuw4f` | `@layer utilities` | `padding: calc(var(--spacing)*5);` |
| `rbmxmiks` | `@layer utilities` | `user-select: none;` |
