# wizard-6

> **Category:** Wizard (`wizard`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/wizard/wizard-6](https://pro.reactbits.dev/docs/app-ui/wizard/wizard-6)  
> **Native Viewport:** `1280px × 640px`

Running step with per-task states

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`wizard-6.jsx`](./wizard-6.jsx) (minHeight: `640px`, hooks: `useEffect`, `useState`)
- **Sorbet Source:** [`wizard-6.sorbet.jsx`](./wizard-6.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 66 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 123 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | `progressbar` |

### Visible Headings & Interactive Labels
- `Migrating workspace`
- `Review`
- `Cancel migration`
- `Run in background`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 120)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1045xnn` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb10o551l` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb11m53nc` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb11pdj1u` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb11w3eqq` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1224u29` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb12c9937` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb12ps2l2` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb12s8rym` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.07);` |
| `rb130dsse` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb144oppk` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb145yzyw` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb14h9jzk` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb1560jep` | `@layer utilities` | `border-color: var(--color-neutral-900);` |
| `rb15twm4q` | `@layer utilities` | `padding-block: calc(var(--spacing)*5);` |
| `rb163w7tp` | `@layer utilities` | `padding-block: calc(var(--spacing)*4);` |
| `rb16oswhf` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb18o5bk1` | `@layer utilities` | `scale: 0.98;` |
| `rb19cfhmh` | `@layer utilities` | `cursor: pointer;` |
| `rb19eu4r5` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1ae25o3` | `@layer utilities` | `border-top-color: rgba(0, 0, 0, 0);` |
| `rb1avj46e` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1byhq48` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1c9td5p` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1crmbms` | `@layer utilities` | `user-select: none;` |
| `rb1e667r` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1edlqwt` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1ens7cz` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1ez93ik` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1f1u0f7` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1g0an8t` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1g86cr` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1gas56c` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1i0xwcz` | `@layer utilities` | `align-items: baseline;` |
| `rb1j2hldg` | `@layer utilities` | `justify-content: space-between;` |
| `rb1j4ynjt` | `@layer utilities` | `animation: var(--animate-spin);` |
| `rb1j6ra6s` | `@layer utilities` | `overflow: hidden;` |
| `rb1jwixvh` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1kr45uq` | `@layer utilities` | `white-space: nowrap;` |
| `rb1l0gtgo` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1lrrrsg` | `@layer utilities` | `display: flex;` |
| `rb1m4m23p` | `@layer utilities` | `justify-content: center;` |
| `rb1msf9ck` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb1mw3o12` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1nkwx6r` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1of9du0` | `@layer utilities` | `width: calc(var(--spacing)*2.5); height: calc(var(--spacing)*2.5);` |
| `rb1qfqxi6` | `@layer utilities` | `margin-inline: auto;` |
| `rb1qgl2b8` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb1qvohnr` | `@layer utilities` | `place-items: center;` |
| `rb1rsmsyi` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1ryw5lw` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1sdijn9` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1snsmwd` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1spxm72` | `@layer utilities` | `color: oklch(0.49 0.1 68);` |
| `rb1u5r2ao` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1u6ymyh` | `@layer utilities` | `min-height: 640px;` |
| `rb1ubqcv7` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb1udwpqu` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1utakvj` | `@layer utilities` | `flex-direction: column;` |
| `rb1v4vsjs` | `@layer utilities` | `cursor: progress;` |
| `rb1vznz11` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb1wu3yx` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1xhiio1` | `@layer utilities` | `border-color: var(--color-neutral-100);` |
| `rb1xmf1ig` | `@layer utilities` | `display: block;` |
| `rb1y4ip9a` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1ymrpi9` | `@layer utilities` | `border-color: currentcolor;` |
| `rb1ynotni` | `@layer utilities` | `display: inline-flex;` |
| `rb25v1n5` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb357bxy` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb3vchex` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb42mcmt` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb46jprq` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb5bbbw2` | `@layer utilities` | `width: 100%;` |
| `rb5tf0ji` | `@layer utilities` | `display: inline-block;` |
| `rb750ks0` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb7qx5o5` | `@layer utilities` | `align-items: center;` |
| `rb85qw` | `@layer utilities` | `padding-inline: calc(var(--spacing)*6);` |
| `rb88skjc` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
