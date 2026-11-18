# mobile-4

> **Category:** Mobile (`mobile`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/mobile/mobile-4](https://pro.reactbits.dev/docs/app-ui/mobile/mobile-4)  
> **Native Viewport:** `1280px × 680px`

Bottom bar with a navigation sheet

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`mobile-4.jsx`](./mobile-4.jsx) (minHeight: `680px`, hooks: `icon`, `id`, `label`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`mobile-4.sorbet.jsx`](./mobile-4.sorbet.jsx) (minHeight: `700px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 104 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 90 |
| **Buttons** | 10 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 10 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Northwind Order 4192 Packed 3 items`
- `Cedar Labs Order 4188 In transit 1 item`
- `Harbor Coffee Order 4181 Delivered 5 items`
- `Alder Group Order 4174 Delivered 2 items`
- `Meridian Order 4169 Delivered 4 items`
- `Northwind Order 4162 Returned 1 item`
- `Home`
- `Orders`
- `Messages`
- `More`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 89)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb100uwkn` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb101iuv0` | `@layer utilities` | `max-width: 390px;` |
| `rb10tld6l` | `@layer utilities` | `align-items: center;` |
| `rb11sl374` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb137jr96` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb13qhkn4` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb14d2hq1` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb14vwr1n` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb15fvyfl` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb15ldcx9` | `@layer utilities` | `outline-offset: 2px;` |
| `rb17b5cp1` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb17e80ww` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb17gbeug` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1alwkuq` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1as2shi` | `@layer utilities` | `text-align: left;` |
| `rb1azdcgt` | `@layer utilities` | `border-radius: 28px;` |
| `rb1chkxy1` | `@layer utilities` | `inset: calc(var(--spacing)*0);` |
| `rb1debhct` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1dknmq5` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1eb4dfo` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1fjxrkw` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1fuu45t` | `@layer utilities` | `cursor: pointer;` |
| `rb1in8vye` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*24);` |
| `rb1iribep` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1j3i474` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jksbjr` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1jr2gaj` | `@layer utilities` | `max-width: 100%;` |
| `rb1lbl0vw` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1m3y863` | `@layer utilities` | `align-items: baseline;` |
| `rb1nhpp5v` | `@layer utilities` | `min-height: 48px;` |
| `rb1nyxy2t` | `@layer utilities` | `overflow-y: auto;` |
| `rb1pz109a` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1pzlrvw` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1q6ffky` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3.5);` |
| `rb1qud80c` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1rj3jg5` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1sakxt6` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1t2clkp` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1wqixo0` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1wtibtg` | `@layer utilities` | `z-index: 20;` |
| `rb1y4rxv3` | `@layer utilities` | `position: relative;` |
| `rb1yc2knk` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb2a6stx` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb2q6bi` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb3cka9k` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb4pyygz` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb5lx0ql` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb6g7yqh` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb6pcc2l` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb6tumjx` | `@layer utilities` | `height: 100%;` |
| `rb6wkv4r` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb6x9xh9` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb7ux2am` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb8dcxhp` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb8oqg57` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb8uwkn` | `@layer utilities` | `flex-shrink: 0;` |
| `rbam60bh` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rbb8sumq` | `@layer utilities` | `border-radius: inherit;` |
| `rbcewfue` | `@layer utilities` | `display: inline-flex;` |
| `rbduq3u1` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rbfhtima` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rbfmmwt5` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rbhrbm6t` | `@layer utilities` | `min-height: 680px;` |
| `rbhsvtug` | `@layer utilities` | `display: flex;` |
| `rbikzfsk` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rbjrdrzt` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rbly950v` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rbm3voqh` | `@layer utilities` | `padding: calc(var(--spacing)*3);` |
| `rbm88qpu` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rbmi8cet` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rbmnuw4f` | `@layer utilities` | `padding: calc(var(--spacing)*5);` |
| `rbmxmiks` | `@layer utilities` | `user-select: none;` |
| `rbneezy8` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rbnfepc7` | `@layer utilities` | `flex-direction: column;` |
| `rbns43sa` | `@layer utilities` | `width: 100%;` |
| `rbocw8ne` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rbozq35o` | `@layer utilities` | `overflow: hidden;` |
| `rbrjth1a` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
