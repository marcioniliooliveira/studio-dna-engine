# wizard-7

> **Category:** Wizard (`wizard`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/wizard/wizard-7](https://pro.reactbits.dev/docs/app-ui/wizard/wizard-7)  
> **Native Viewport:** `1280px × 480px`

Modal wizard with one question per step

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`wizard-7.jsx`](./wizard-7.jsx) (minHeight: `480px`, hooks: `useState`)
- **Sorbet Source:** [`wizard-7.sorbet.jsx`](./wizard-7.sorbet.jsx) (minHeight: `540px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 46 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 146 |
| **Buttons** | 8 |
| **Inputs / Textareas / Selects** | 4 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | `radiogroup` |

### Visible Headings & Interactive Labels
- `2`
- `3`
- `4`
- `5`
- `Where do you ship to?`
- `Domestic only`
- `Europe`
- `Worldwide`
- `Not sure yet`
- `Continue`
- `Skip and use defaults`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 143)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1045xnn` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb10o551l` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb114b5ss` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb11m53nc` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb11w3eqq` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1224u29` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb12c9937` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb144oppk` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb14py7cu` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb1560jep` | `@layer utilities` | `border-color: var(--color-neutral-900);` |
| `rb15d313z` | `@layer utilities` | `padding-block: calc(var(--spacing)*1.5);` |
| `rb18dyxg3` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb18o5bk1` | `@layer utilities` | `scale: 0.98;` |
| `rb19cfhmh` | `@layer utilities` | `cursor: pointer;` |
| `rb19eu4r5` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1aea95l` | `@layer utilities › @media (hover: hover)` | `text-decoration-line: underline;` |
| `rb1aoypew` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1bma911` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1bpu5rr` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1byhq48` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1c28nxn` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1c9td5p` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1crmbms` | `@layer utilities` | `user-select: none;` |
| `rb1cu2952` | `@layer utilities › @media (hover: hover)` | `border-color: var(--color-neutral-900);` |
| `rb1e667r` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1edlqwt` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1ez93ik` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1f1u0f7` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fc9p0s` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1fgbfuv` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1fqb1ju` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1g0an8t` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1g8pndk` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1gas56c` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1h25gud` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1iyzvot` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*10);` |
| `rb1j2hldg` | `@layer utilities` | `justify-content: space-between;` |
| `rb1j6ra6s` | `@layer utilities` | `overflow: hidden;` |
| `rb1jmpz55` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb1jwixvh` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1kfvbg4` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1kr45uq` | `@layer utilities` | `white-space: nowrap;` |
| `rb1kuommx` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1l0gtgo` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1led9sm` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1lrrrsg` | `@layer utilities` | `display: flex;` |
| `rb1m4m23p` | `@layer utilities` | `justify-content: center;` |
| `rb1mdp7ri` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.4);` |
| `rb1n2psde` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1pa9h1j` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb1pzgjgi` | `@layer utilities` | `appearance: none;` |
| `rb1qfqxi6` | `@layer utilities` | `margin-inline: auto;` |
| `rb1qvohnr` | `@layer utilities` | `place-items: center;` |
| `rb1r2vs86` | `@layer utilities › @media (hover: hover)` | `border-color: var(--color-neutral-100);` |
| `rb1rsmsyi` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1ryw5lw` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1sdijn9` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1snsmwd` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1sz7n1z` | `@layer utilities` | `opacity: 0.4;` |
| `rb1t0w6x1` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1t8zxl3` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1uqgt33` | `@layer utilities` | `margin-block: auto;` |
| `rb1utakvj` | `@layer utilities` | `flex-direction: column;` |
| `rb1v4vsjs` | `@layer utilities` | `cursor: progress;` |
| `rb1w9nkq0` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1wu3yx` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1x59kjw` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1xhiio1` | `@layer utilities` | `border-color: var(--color-neutral-100);` |
| `rb1xhxu6t` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.4);` |
| `rb1xi7668` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1y4ip9a` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1ynotni` | `@layer utilities` | `display: inline-flex;` |
| `rb1yz2a2h` | `@layer utilities` | `min-height: calc(var(--spacing)*8);` |
| `rb2pu913` | `@layer utilities` | `min-height: calc(var(--spacing)*6);` |
| `rb3dyvm4` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb3vchex` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb42mcmt` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb46jprq` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
