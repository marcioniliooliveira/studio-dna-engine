# wizard-2

> **Category:** Wizard (`wizard`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/wizard/wizard-2](https://pro.reactbits.dev/docs/app-ui/wizard/wizard-2)  
> **Native Viewport:** `1280px × 720px`

Full-screen wizard with a progress bar

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`wizard-2.jsx`](./wizard-2.jsx) (minHeight: `720px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`wizard-2.sorbet.jsx`](./wizard-2.sorbet.jsx) (minHeight: `820px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 128 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 211 |
| **Buttons** | 7 |
| **Inputs / Textareas / Selects** | 7 / 0 / 3 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 12 / 0 |
| **ARIA Roles** | `progressbar`, `combobox` |

### Visible Headings & Interactive Labels
- `Send invoice`
- `Customer details`
- `Customer`
- `Tax ID`
- `Invoice number`
- `PO reference`
- `Terms`
- `Issue date`
- `Due date`
- `Currency`
- `USD`
- `Payment terms`
- `Net 14`
- `Collection`
- `ACH transfer`
- `Billing address`
- `Save draft`
- `Next step`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 211)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1045xnn` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb10o551l` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb114b5ss` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb11do6ca` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb11m53nc` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb11pdj1u` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb11w3eqq` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1224u29` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb12c9937` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb12ps2l2` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb12s8rym` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.07);` |
| `rb140y5dt` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb144oppk` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb14h9jzk` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb14wyzum` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb15jx0fr` | `@layer utilities` | `padding-block: calc(var(--spacing)*6);` |
| `rb15twm4q` | `@layer utilities` | `padding-block: calc(var(--spacing)*5);` |
| `rb163w7tp` | `@layer utilities` | `padding-block: calc(var(--spacing)*4);` |
| `rb165765e` | `@layer utilities` | `border-right-style: var(--tw-border-style); border-right-width: 1px;` |
| `rb16oswhf` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb16up9va` | `@layer utilities` | `max-width: 240px;` |
| `rb183lui1` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb18dyxg3` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb18kk6v3` | `@layer utilities` | `cursor: text;` |
| `rb18lvug1` | `@layer utilities` | `opacity: 0;` |
| `rb18o5bk1` | `@layer utilities` | `scale: 0.98;` |
| `rb19cfhmh` | `@layer utilities` | `cursor: pointer;` |
| `rb19eu4r5` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1a8c8k6` | `@layer utilities` | `row-gap: calc(var(--spacing)*4);` |
| `rb1avj46e` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1b10hum` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1b6xfei` | `@layer utilities` | `margin-block: calc(var(--spacing)*6);` |
| `rb1byhq48` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1c28nxn` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1c9td5p` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1crmbms` | `@layer utilities` | `user-select: none;` |
| `rb1dg4w7c` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1e667r` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1e8mkfq` | `@layer utilities` | `min-height: 720px;` |
| `rb1edlqwt` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1ens7cz` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1ez93ik` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1f1u0f7` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fadran` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1fc9p0s` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1fgbfuv` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1flez4w` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb1fqb1ju` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1fsg921` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1g0an8t` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1g86cr` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1g8pndk` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1gas56c` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1h7q1if` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1hnmpum` | `@layer utilities › @media (min-width: 40rem)` | `grid-template-columns: repeat(2, minmax(0px, 1fr));` |
| `rb1i6v331` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1itfswr` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1j2hldg` | `@layer utilities` | `justify-content: space-between;` |
| `rb1j6ra6s` | `@layer utilities` | `overflow: hidden;` |
| `rb1jl9v41` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1jnrkos` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1jwixvh` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1kf7qwo` | `@layer utilities` | `min-width: calc(var(--spacing)*40);` |
| `rb1kfvbg4` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1kr45uq` | `@layer utilities` | `white-space: nowrap;` |
| `rb1l0gtgo` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1l7k92f` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1lc1x3w` | `@layer utilities › @media (min-width: 40rem)` | `display: flex;` |
| `rb1lggwxj` | `@layer utilities` | `display: none;` |
| `rb1lrrrsg` | `@layer utilities` | `display: flex;` |
| `rb1m4m23p` | `@layer utilities` | `justify-content: center;` |
| `rb1mw3o12` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1n2psde` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1nchf8f` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1nkwx6r` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1nmhlw4` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1o45ob8` | `@layer utilities` | `color-scheme: dark;` |
| `rb1o9tlpp` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
