# scheduling-1

> **Category:** Scheduling (`scheduling`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/scheduling/scheduling-1](https://pro.reactbits.dev/docs/app-ui/scheduling/scheduling-1)  
> **Native Viewport:** `1280px × 720px`

Month calendar beside a day agenda

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`scheduling-1.jsx`](./scheduling-1.jsx) (minHeight: `720px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`scheduling-1.sorbet.jsx`](./scheduling-1.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 232 |
| **Max DOM Depth** | 14 |
| **Atomic/Scoped Classes** | 187 |
| **Buttons** | 36 |
| **Inputs / Textareas / Selects** | 0 / 0 / 3 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 18 / 0 |
| **ARIA Roles** | `combobox`, `img` |

### Visible Headings & Interactive Labels
- `June`
- `2026`
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`
- `13`
- `14`
- `15`
- `16`
- `17`
- `18`
- `19`
- `20`
- `21`
- `22`
- `23`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 181)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb105fkjj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb10713pn` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb10whxfu` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb10zyqez` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*3);` |
| `rb11jxxsx` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*1);` |
| `rb129b6l5` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb12dwqvu` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*4);` |
| `rb12jjvco` | `@layer utilities` | `text-align: left;` |
| `rb1339zo2` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb141gb93` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb14ayjf8` | `@layer utilities` | `visibility: hidden;` |
| `rb14dr3bv` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb14qy4of` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb150ohhm` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb15967o4` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb163ncmg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb17g5lpm` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb17n1yd6` | `@layer utilities` | `background-color: currentcolor;` |
| `rb17pjnp6` | `@layer utilities` | `cursor: not-allowed;` |
| `rb18cisp0` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb19l9g1e` | `@layer utilities` | `top: calc(var(--spacing)*1);` |
| `rb19v91qd` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1a9d0xh` | `@layer utilities` | `flex-direction: column;` |
| `rb1an0j0y` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1b65y40` | `@layer utilities` | `display: inline-flex;` |
| `rb1b780ep` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1bjot4y` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1byjvax` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1c0e3k4` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1ci7kbu` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1d17un5` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1d7u2e5` | `@layer utilities › @media (min-width: 64rem)` | `grid-template-columns: 336px 1fr;` |
| `rb1deb4hy` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb1djt8w6` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1emgt72` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1enbo8p` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1eodr9h` | `@layer utilities` | `display: none;` |
| `rb1epdf7u` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1eucpb5` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1eutiyq` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1ev5ca5` | `@layer utilities` | `display: grid;` |
| `rb1exwe2` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1fh4edo` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1fkrydi` | `@layer utilities › @media (min-width: 40rem)` | `display: block;` |
| `rb1fyf6aj` | `@layer utilities` | `max-width: var(--container-5xl);` |
| `rb1g473k8` | `@layer utilities` | `min-width: 100%;` |
| `rb1ge6rh9` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1ghf45z` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1gqv3f7` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1gun78u` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1hwwq1h` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1i12aoc` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1ic2788` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1ioq2to` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb1iqcg3o` | `@layer utilities` | `padding-top: calc(var(--spacing)*4);` |
| `rb1iulm6j` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1iwy4ev` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1j0qagq` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1kc4bf` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1keckau` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1kn0b0y` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1ksg5jg` | `@layer utilities` | `text-align: center;` |
| `rb1l77syr` | `@layer utilities` | `cursor: pointer;` |
| `rb1m6kysk` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1mem2z5` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1mqjzfo` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1n3nqz2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1na282x` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1nad6vy` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1nmf86c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1o19hd4` | `@layer utilities` | `justify-items: center;` |
| `rb1o23qxh` | `@layer utilities` | `height: calc(var(--spacing)*5);` |
| `rb1ovdiuv` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1ow2k0e` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1oycvfx` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1p8gvtg` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1rbu1wv` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1retejb` | `@layer utilities` | `align-self: center;` |
