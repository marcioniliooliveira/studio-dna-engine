# scheduling-4

> **Category:** Scheduling (`scheduling`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/scheduling/scheduling-4](https://pro.reactbits.dev/docs/app-ui/scheduling/scheduling-4)  
> **Native Viewport:** `1280px × 640px`

Deadline picker with quick presets

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`scheduling-4.jsx`](./scheduling-4.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`scheduling-4.sorbet.jsx`](./scheduling-4.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 142 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 170 |
| **Buttons** | 60 |
| **Inputs / Textareas / Selects** | 0 / 0 / 1 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 9 / 0 |
| **ARIA Roles** | `combobox`, `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Today Tuesday`
- `Tomorrow Wednesday`
- `Later this week Thursday`
- `Next week Mon, Jul 6`
- `No date Clear deadline`
- `June 2026`
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

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 170)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb105fkjj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb10713pn` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb10mt28y` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb10pz4q0` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*2);` |
| `rb11jxxsx` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*1);` |
| `rb12jjvco` | `@layer utilities` | `text-align: left;` |
| `rb1339zo2` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb141gb93` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb14dr3bv` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb14qy4of` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb150ohhm` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb15967o4` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb15pnsph` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb163ncmg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb167qlrw` | `@layer utilities` | `opacity: 1;` |
| `rb17fxk1d` | `@layer utilities` | `margin-block: auto;` |
| `rb17g5lpm` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb17pjnp6` | `@layer utilities` | `cursor: not-allowed;` |
| `rb17s4kya` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1890otv` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb18b7z76` | `@layer utilities › @media (min-width: 40rem)` | `grid-template-columns: 1fr 150px;` |
| `rb18cisp0` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb197sy4z` | `@layer utilities` | `min-height: 280px;` |
| `rb19v91qd` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1a9d0xh` | `@layer utilities` | `flex-direction: column;` |
| `rb1actnpn` | `@layer utilities › @media (min-width: 40rem)` | `min-height: calc(var(--spacing)*0);` |
| `rb1an0j0y` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1b65y40` | `@layer utilities` | `display: inline-flex;` |
| `rb1b780ep` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1b9g8kg` | `@layer utilities` | `max-width: 600px;` |
| `rb1bho9bv` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1c0e3k4` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1ci7kbu` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1d17un5` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1deb4hy` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb1djt8w6` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1dx04u0` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1emgt72` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1epdf7u` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1eucpb5` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1ev5ca5` | `@layer utilities` | `display: grid;` |
| `rb1exwe2` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1g473k8` | `@layer utilities` | `min-width: 100%;` |
| `rb1ge6rh9` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1gqv3f7` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1gun78u` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1hwdn0r` | `@layer utilities` | `padding-top: calc(var(--spacing)*1);` |
| `rb1hwwq1h` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1i12aoc` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1ic2788` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1igcuep` | `@layer utilities` | `padding-top: calc(var(--spacing)*3);` |
| `rb1iulm6j` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1iwy4ev` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1j0qagq` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1kc4bf` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1keckau` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1ksg5jg` | `@layer utilities` | `text-align: center;` |
| `rb1l77syr` | `@layer utilities` | `cursor: pointer;` |
| `rb1m6kysk` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1mem2z5` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1mh1jkf` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1mqjzfo` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1n3nqz2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1na282x` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1ni4jjj` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb1nmf86c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1o19hd4` | `@layer utilities` | `justify-items: center;` |
| `rb1o2twin` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1ogvf8` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1ovdiuv` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1ow2k0e` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1oycvfx` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1p8gvtg` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1retejb` | `@layer utilities` | `align-self: center;` |
| `rb1skcd7r` | `@layer utilities` | `justify-content: center;` |
| `rb1smrgio` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1uap2oi` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1uj6ni2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
