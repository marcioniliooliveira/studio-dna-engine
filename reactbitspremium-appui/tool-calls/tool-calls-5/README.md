# tool-calls-5

> **Category:** Tool Calls (`tool-calls`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/tool-calls/tool-calls-5](https://pro.reactbits.dev/docs/app-ui/tool-calls/tool-calls-5)  
> **Native Viewport:** `1280px × 560px`

Code run card with output tabs

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`tool-calls-5.jsx`](./tool-calls-5.jsx) (minHeight: `560px`, hooks: `count`, `disconnect`, `id`, `label`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`tool-calls-5.sorbet.jsx`](./tool-calls-5.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 34 |
| **Max DOM Depth** | 7 |
| **Atomic/Scoped Classes** | 142 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 1 / 0 |
| **ARIA Roles** | `status`, `tablist`, `tab`, `tabpanel` |

### Visible Headings & Interactive Labels
- `Command output`
- `stdout`
- `stderr 1`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 142)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb110wxj4` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb11b6vfv` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb12dfy66` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb13gbjeo` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb13n0fx1` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb13r6rdp` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb141yoxm` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb14p7v1f` | `@layer utilities` | `margin-inline-end: 1ch;` |
| `rb14wjd6p` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb151zhg4` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb156xbcl` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb15dtkd2` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb176atvn` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb1807umg` | `@layer utilities` | `align-items: center;` |
| `rb189iaoc` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb19fz37q` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb19hz00s` | `@layer utilities` | `overflow: auto;` |
| `rb19ifojv` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb19weqkh` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1a341t1` | `@layer utilities` | `right: calc(var(--spacing)*0);` |
| `rb1bs165n` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1c2jark` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1cq0c60` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1djni2a` | `@layer utilities` | `flex-direction: column;` |
| `rb1dquxr3` | `@layer utilities` | `overflow-x: auto;` |
| `rb1dwxte3` | `@layer utilities` | `white-space: pre;` |
| `rb1ehtoc2` | `@layer utilities` | `content: var(--tw-content); height: calc(var(--spacing)*.5);` |
| `rb1emvprc` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1epijgc` | `@layer utilities` | `inset-block: calc(var(--spacing)*0);` |
| `rb1f69sjo` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1fxrm23` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1g2eia6` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1h3sv40` | `@layer utilities` | `content: var(--tw-content); bottom: calc(var(--spacing)*0);` |
| `rb1h4xj3` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1he5eu1` | `@layer utilities` | `padding-top: calc(var(--spacing)*2);` |
| `rb1hma0lk` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1hxwwe3` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1iihi8p` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1iw03ca` | `@layer utilities` | `content: var(--tw-content); background-color: var(--color-neutral-100);` |
| `rb1j8i2ai` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1jf4ij3` | `@layer utilities` | `content: var(--tw-content); inset-inline: calc(var(--spacing)*0);` |
| `rb1kdjcl4` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1kq9on9` | `@layer utilities` | `display: flex;` |
| `rb1ls7h0h` | `@layer utilities` | `display: inline-flex;` |
| `rb1m175b` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1m1qkyy` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1mw8s3v` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1nl081x` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1osk1dx` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1p0cudr` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1p16070` | `@layer utilities` | `content: var(--tw-content); background-color: var(--color-neutral-900);` |
| `rb1pjddz7` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1qdc724` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1);` |
| `rb1qxbeg2` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1r69alj` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1r7b051` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1rgwjae` | `@layer utilities` | `--tw-gradient-position: to right;` |
| `rb1rt07od` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1s0vqoc` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1sz2eeb` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1t3vxyz` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1tbtrtp` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1tf0hxg` | `@layer utilities` | `cursor: pointer;` |
| `rb1tggrrz` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1tq71gn` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb1udw3qd` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1v6jcmy` | `@layer utilities` | `width: calc(var(--spacing)*8);` |
| `rb1vwq6dy` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1wcuk3t` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1wwejh2` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1wx8or6` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1xbwp30` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1xwqqvr` | `@layer utilities` | `transition-property: color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb1xxui3v` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1yom7bo` | `@layer utilities` | `--tw-gradient-position: to left;` |
| `rb1yxvvcc` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb2u8bg9` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb38bgox` | `@layer utilities` | `scrollbar-width: none;` |
