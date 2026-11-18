# forms-4

> **Category:** Forms (`forms`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/forms/forms-4](https://pro.reactbits.dev/docs/app-ui/forms/forms-4)  
> **Native Viewport:** `1280px × 720px`

Inline edit property panel

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`forms-4.jsx`](./forms-4.jsx) (minHeight: `720px`, hooks: `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`forms-4.sorbet.jsx`](./forms-4.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 145 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 152 |
| **Buttons** | 11 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 21 / 0 |
| **ARIA Roles** | `button`, `switch` |

### Visible Headings & Interactive Labels
- `Equipment record`
- `Add note`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 148)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb109eg9o` | `@layer utilities` | `display: flex;` |
| `rb10pqjs2` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb117wnhx` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb11i59ru` | `@layer utilities` | `width: fit-content;` |
| `rb11i9xqd` | `@layer utilities` | `--tw-inset-ring-color: transparent;` |
| `rb1231z68` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb12ohqle` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb12wgshg` | `@layer utilities` | `cursor: progress;` |
| `rb14yl0do` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb15038g4` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb152wxwq` | `@layer utilities` | `display: inline-flex;` |
| `rb15b2suy` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb16im1u5` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb16jcuu2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb175rt0z` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb178eejg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb17frepy` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb17pr0ex` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb18cctbc` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1a8f8jo` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1a9eha1` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1aeu4oh` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1c87gx5` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1dmtthv` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb1druwp` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1e8crg0` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1eqnvmy` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1f82wdq` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1ghg7mk` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1h3p2dz` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1h6pgpp` | `@layer utilities` | `scale: 0.98;` |
| `rb1h9cvlt` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1hl5cmh` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1hovl8y` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1hx8tvf` | `@layer utilities` | `transition-property: translate, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); tran` |
| `rb1io8mj3` | `@layer utilities` | `display: grid;` |
| `rb1j2hn9y` | `@layer utilities` | `position: absolute;` |
| `rb1kj1dzk` | `@layer utilities` | `overflow: hidden;` |
| `rb1kuwckj` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1kxb4jq` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1ly3p9j` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1mazheu` | `@layer utilities` | `margin-left: auto;` |
| `rb1mk4x3b` | `@layer utilities` | `--tw-inset-ring-color: #f5f5f580;` |
| `rb1o4wj6s` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb1p3rxzm` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1p6lixz` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1pam7ev` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1ptxd6s` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1pulest` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1qlsz9d` | `@layer utilities` | `max-width: 760px;` |
| `rb1qphy3x` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1r76in0` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1riq7xz` | `@layer utilities` | `--tw-inset-ring-color: #17171780;` |
| `rb1s7c8d0` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb1sxq3s1` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1tnw7fj` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1tu029j` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1usn4z1` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1v1thy1` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb1vn7afl` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.8);` |
| `rb1vzs8lb` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1w00cde` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb1whboik` | `@layer utilities › @media (min-width: 40rem)` | `justify-content: space-between;` |
| `rb1wk88oy` | `@layer utilities` | `min-height: 720px;` |
| `rb1xmj0ru` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1xnxyj8` | `@layer utilities` | `padding: calc(var(--spacing)*8);` |
| `rb1y0f6re` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1y117is` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1ybnebd` | `@layer utilities` | `justify-content: center;` |
| `rb1ymhhwh` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.8);` |
| `rb2cq3xd` | `@layer utilities` | `transition-property: background-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-` |
| `rb2ua48h` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb35x592` | `@layer utilities` | `--tw-inset-ring-color: #f5f5f566;` |
| `rb38soar` | `@layer utilities` | `flex-direction: column;` |
| `rb3qu7v3` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb3x7gem` | `@layer utilities › @media (hover: hover)` | `--tw-inset-ring-color: var(--color-neutral-100);` |
| `rb4e5rc6` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb4onngw` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
