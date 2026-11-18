# wizard-3

> **Category:** Wizard (`wizard`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/wizard/wizard-3](https://pro.reactbits.dev/docs/app-ui/wizard/wizard-3)  
> **Native Viewport:** `1280px × 720px`

Plan step with an invoice preview

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`wizard-3.jsx`](./wizard-3.jsx) (minHeight: `720px`, hooks: `useState`)
- **Sorbet Source:** [`wizard-3.sorbet.jsx`](./wizard-3.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 106 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 169 |
| **Buttons** | 5 |
| **Inputs / Textareas / Selects** | 3 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 1 / 0 |
| **ARIA Roles** | `radiogroup` |

### Visible Headings & Interactive Labels
- `Billing upgrade`
- `1 Plan , current`
- `2 Seats`
- `3 Payment`
- `4 Review`
- `Plan`
- `Team Workspace controls for growing product teams. $49/seat/mo`
- `Business Recommended SAML, audit exports, and priority support. $72/seat/mo`
- `Enterprise Procurement review and account governance. $96/seat/mo`
- `Invoice preview`
- `Next`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 165)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1045xnn` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb10o551l` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb114b5ss` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb11earhr` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb11m53nc` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb11pdj1u` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb11w3eqq` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1224u29` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1289kko` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb12c9937` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb12ps2l2` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb130dsse` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb144oppk` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb145yzyw` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb14fylnv` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb14h9jzk` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb14py7cu` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb1560jep` | `@layer utilities` | `border-color: var(--color-neutral-900);` |
| `rb15twm4q` | `@layer utilities` | `padding-block: calc(var(--spacing)*5);` |
| `rb163w7tp` | `@layer utilities` | `padding-block: calc(var(--spacing)*4);` |
| `rb18o5bk1` | `@layer utilities` | `scale: 0.98;` |
| `rb19cfhmh` | `@layer utilities` | `cursor: pointer;` |
| `rb19eu4r5` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1aoypew` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1bma911` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1bpu5rr` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1byhq48` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1c9td5p` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1crmbms` | `@layer utilities` | `user-select: none;` |
| `rb1cu2952` | `@layer utilities › @media (hover: hover)` | `border-color: var(--color-neutral-900);` |
| `rb1djj7qn` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb1e667r` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1e8mkfq` | `@layer utilities` | `min-height: 720px;` |
| `rb1ecd12z` | `@layer utilities` | `gap: calc(var(--spacing)*5);` |
| `rb1edlqwt` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1ez93ik` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1f1u0f7` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fc9p0s` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1fgbfuv` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1fqb1ju` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1g0an8t` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1g8f1pa` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1g8pndk` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1gas56c` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1h25gud` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1h9yfpx` | `@layer utilities` | `padding-block: calc(var(--spacing)*3.5);` |
| `rb1he1hog` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1i0xwcz` | `@layer utilities` | `align-items: baseline;` |
| `rb1j2hldg` | `@layer utilities` | `justify-content: space-between;` |
| `rb1j6ra6s` | `@layer utilities` | `overflow: hidden;` |
| `rb1jmpz55` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb1jwixvh` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1kfvbg4` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1kr45uq` | `@layer utilities` | `white-space: nowrap;` |
| `rb1kuommx` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1l0gtgo` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1led9sm` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1lggwxj` | `@layer utilities` | `display: none;` |
| `rb1lrrrsg` | `@layer utilities` | `display: flex;` |
| `rb1m4m23p` | `@layer utilities` | `justify-content: center;` |
| `rb1m61miv` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1mdp7ri` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.4);` |
| `rb1msf9ck` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb1pa9h1j` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb1pzgjgi` | `@layer utilities` | `appearance: none;` |
| `rb1qdxig4` | `@layer utilities › @media (min-width: 40rem)` | `display: block;` |
| `rb1qfqxi6` | `@layer utilities` | `margin-inline: auto;` |
| `rb1quxqu0` | `@layer utilities` | `min-width: calc(var(--spacing)*4);` |
| `rb1qvohnr` | `@layer utilities` | `place-items: center;` |
| `rb1r2vs86` | `@layer utilities › @media (hover: hover)` | `border-color: var(--color-neutral-100);` |
| `rb1r4xciz` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb1rsmsyi` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1ryw5lw` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1sdijn9` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1smftfx` | `@layer utilities` | `padding-top: calc(var(--spacing)*5);` |
| `rb1snsmwd` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1sz7n1z` | `@layer utilities` | `opacity: 0.4;` |
| `rb1t0w6x1` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
