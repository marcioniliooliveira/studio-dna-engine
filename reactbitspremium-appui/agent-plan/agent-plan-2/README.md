# agent-plan-2

> **Category:** Agent Plan (`agent-plan`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/agent-plan/agent-plan-2](https://pro.reactbits.dev/docs/app-ui/agent-plan/agent-plan-2)  
> **Native Viewport:** `1280px × 640px`

Editable plan before execution

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`agent-plan-2.jsx`](./agent-plan-2.jsx) (minHeight: `640px`, hooks: `disconnect`, `focus`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`agent-plan-2.sorbet.jsx`](./agent-plan-2.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 171 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 178 |
| **Buttons** | 29 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 29 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Review the plan`
- `Add`
- `Start 8 steps`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 175)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10dn7j6` | `@layer utilities` | `opacity: 0;` |
| `rb111h8gi` | `@layer utilities` | `padding-block: calc(var(--spacing)*1.5);` |
| `rb116cihz` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb119gnm4` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb11jld7z` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb11jpczq` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb12p123t` | `@layer utilities` | `cursor: default;` |
| `rb12zupbr` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb138e0v` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb13b58n` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb13tyiwl` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb14adlas` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb14ibhke` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb14nt8wo` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb14xsuln` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb15ipeq6` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb16rs2dr` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb16up5d9` | `@layer utilities › @media (min-width: 40rem)` | `display: block;` |
| `rb17jy6ll` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb17wrneh` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb180t08p` | `@layer utilities` | `text-align: left;` |
| `rb182cmhm` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb18asvw4` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb18k32xc` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb18kbftc` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb18us3a2` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb194roz1` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb19dtp8o` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1a12lfu` | `@layer utilities` | `place-items: center;` |
| `rb1adeow2` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1am944v` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1ayb5wv` | `@layer utilities` | `user-select: none;` |
| `rb1banwsy` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1cfwlxg` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1chgoi9` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1dga8k9` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1dkhgfl` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb1e91mm5` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1eg34eu` | `@layer utilities` | `min-height: 640px;` |
| `rb1ek0u9g` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb1eoywhn` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1fl2g5k` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1flv4q5` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1fp7meg` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1go1j34` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1gph0yn` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb1hylpc0` | `@layer utilities` | `pointer-events: none;` |
| `rb1igmwss` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1is5non` | `@layer utilities` | `width: calc(var(--spacing)*7);` |
| `rb1ivukfc` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1j3dyh6` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1jbxyul` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1kfeeqx` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1klptab` | `@layer utilities` | `width: 100%;` |
| `rb1l0cwws` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1lodo6z` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1lsj77f` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1m1k3ch` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1mawd4s` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1n7let` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb1oqy4bo` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1ow1ouq` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1p9fnnj` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1q3vcib` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1q7vq2n` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1qp6vu9` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1qwj63b` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1rcvde3` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1rfmhuv` | `@layer utilities` | `position: absolute;` |
| `rb1rgbml2` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1rn1ipa` | `@layer utilities` | `display: none;` |
| `rb1rnmwtp` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1rnxpsg` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1s6u6h0` | `@layer utilities` | `padding: calc(var(--spacing)*1);` |
| `rb1t8qxl9` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1te2wcg` | `@layer utilities` | `cursor: pointer;` |
| `rb1u0rkvs` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1u7au52` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
