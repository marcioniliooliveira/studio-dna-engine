# tool-calls-2

> **Category:** Tool Calls (`tool-calls`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/tool-calls/tool-calls-2](https://pro.reactbits.dev/docs/app-ui/tool-calls/tool-calls-2)  
> **Native Viewport:** `1280px × 640px`

Tool call list with retry states

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`tool-calls-2.jsx`](./tool-calls-2.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`tool-calls-2.sorbet.jsx`](./tool-calls-2.sorbet.jsx) (minHeight: `760px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 163 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 179 |
| **Buttons** | 6 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 12 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Tool activity`
- `Stop`
- `All`
- `Running`
- `Failed`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 176)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10o5us3` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb110wxj4` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1130tod` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1185261` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb11b6vfv` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb11bl1g1` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb11ij738` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb124jstw` | `@layer utilities` | `animation: var(--animate-spin);` |
| `rb12dfy66` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb13dryzi` | `@layer utilities` | `align-items: stretch;` |
| `rb13gbjeo` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb13r6rdp` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb141yoxm` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb156xbcl` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb15dtkd2` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb176atvn` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb176pkvf` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1807umg` | `@layer utilities` | `align-items: center;` |
| `rb189iaoc` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb18eh9rz` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb18h19na` | `@layer utilities` | `min-width: 6ch;` |
| `rb18yv4gz` | `@layer utilities` | `background-color: oklch(0.945 0.027 26 / 0.4);` |
| `rb19fz37q` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb19qogbz` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb19weqkh` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1bgk0hx` | `@layer utilities` | `width: calc(var(--spacing)*12);` |
| `rb1bielb6` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1bs165n` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1c2jark` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1cq0c60` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1djni2a` | `@layer utilities` | `flex-direction: column;` |
| `rb1e2bw2m` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1emvprc` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1f0owo7` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1f69sjo` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1f9facb` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1ft5awd` | `@layer utilities` | `width: fit-content;` |
| `rb1g2uw3a` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb1h4xj3` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1hma0lk` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1hxwwe3` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1hzxvom` | `@layer utilities` | `border-top-color: rgba(0, 0, 0, 0);` |
| `rb1iihi8p` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1j8i2ai` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1kdjcl4` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1kq9on9` | `@layer utilities` | `display: flex;` |
| `rb1ls7h0h` | `@layer utilities` | `display: inline-flex;` |
| `rb1m175b` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1m1qkyy` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1mw8s3v` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1mxcmeu` | `@layer utilities` | `margin-inline-start: auto;` |
| `rb1nc7k8d` | `@layer utilities › @media (hover: hover)` | `background-color: oklch(0.945 0.027 26 / 0.6);` |
| `rb1nl081x` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1osk1dx` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1p0cudr` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1p1np7a` | `@layer utilities` | `text-align: right;` |
| `rb1pjddz7` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1qxbeg2` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1r69alj` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1r7b051` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1rgftl7` | `@layer utilities` | `align-items: flex-start;` |
| `rb1rkoimb` | `@layer utilities` | `width: calc(var(--spacing)*7);` |
| `rb1rsyp2f` | `@layer utilities` | `align-content: center;` |
| `rb1rt07od` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1s0vqoc` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1sqtdmm` | `@layer utilities` | `overflow-y: auto;` |
| `rb1svt6cs` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1sz2eeb` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1tbtrtp` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1tf0hxg` | `@layer utilities` | `cursor: pointer;` |
| `rb1tggrrz` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1tpeyo` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1tq71gn` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb1udw3qd` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1uks57l` | `@layer utilities › @media (min-width: 40rem)` | `display: block;` |
| `rb1vwq6dy` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1w6h9w` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1wcuk3t` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
