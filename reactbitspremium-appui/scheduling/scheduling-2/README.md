# scheduling-2

> **Category:** Scheduling (`scheduling`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/scheduling/scheduling-2](https://pro.reactbits.dev/docs/app-ui/scheduling/scheduling-2)  
> **Native Viewport:** `1280px × 480px`

Compact time range picker

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`scheduling-2.jsx`](./scheduling-2.jsx) (minHeight: `480px`, hooks: `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`scheduling-2.sorbet.jsx`](./scheduling-2.sorbet.jsx) (minHeight: `480px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 53 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 171 |
| **Buttons** | 15 |
| **Inputs / Textareas / Selects** | 0 / 0 / 2 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | `combobox`, `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Start`
- `09:00`
- `End`
- `10:00`
- `15 min`
- `30 min`
- `45 min`
- `1 hour`
- `90 min`
- `2 hours`
- `3 hours`
- `Half day`
- `Full day`
- `Custom`
- `Cancel`
- `Apply`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 171)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb105fkjj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb10whxfu` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb11zbr4l` | `@layer utilities › @media (min-width: 40rem)` | `grid-template-columns: repeat(5, minmax(0px, 1fr));` |
| `rb1209do9` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb12jjvco` | `@layer utilities` | `text-align: left;` |
| `rb1339zo2` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb141gb93` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb14ctt6w` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb14dr3bv` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb14qy4of` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb14vg5d9` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb14wuzj7` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
| `rb14zk7g8` | `@layer utilities` | `overflow: visible;` |
| `rb150ohhm` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb15967o4` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb15pnsph` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb163ncmg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb17fxk1d` | `@layer utilities` | `margin-block: auto;` |
| `rb17g5lpm` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb17pjnp6` | `@layer utilities` | `cursor: not-allowed;` |
| `rb18cisp0` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb18rsy81` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1a9d0xh` | `@layer utilities` | `flex-direction: column;` |
| `rb1b65y40` | `@layer utilities` | `display: inline-flex;` |
| `rb1b780ep` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1bho9bv` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1bjot4y` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1byjvax` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1c0e3k4` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1ct45gh` | `@layer utilities` | `max-width: 520px;` |
| `rb1d17un5` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1d86b7j` | `@layer utilities` | `align-items: stretch;` |
| `rb1djt8w6` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1dx04u0` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1emgt72` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1enbo8p` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1epdf7u` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1eucpb5` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1ev5ca5` | `@layer utilities` | `display: grid;` |
| `rb1exwe2` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1fh4edo` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1fov252` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1g473k8` | `@layer utilities` | `min-width: 100%;` |
| `rb1ge6rh9` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1gh0jk7` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb1ghf45z` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1hwwq1h` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1ic2788` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1it9oah` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1iwy4ev` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1kc4bf` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1keckau` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1kn0b0y` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1l77syr` | `@layer utilities` | `cursor: pointer;` |
| `rb1lm2792` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1m6kysk` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1mem2z5` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1mqjzfo` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1nad6vy` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1ni4jjj` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb1nmf86c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1o29bb9` | `@layer utilities` | `max-width: 100%;` |
| `rb1ogvf8` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1ovdiuv` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1ow2k0e` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1p8gvtg` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1skcd7r` | `@layer utilities` | `justify-content: center;` |
| `rb1smrgio` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1u9x2j7` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*10);` |
| `rb1uj6ni2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1ukoodh` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1umvj9n` | `@layer utilities` | `justify-content: safe center;` |
| `rb1wbd1ni` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1wruhx4` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1wudud7` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1wzcxei` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1x6y215` | `@layer utilities` | `opacity: 0.4;` |
| `rb1ydy2io` | `@layer utilities` | `flex: 1 1 0%;` |
