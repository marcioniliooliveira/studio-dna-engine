# scheduling-6

> **Category:** Scheduling (`scheduling`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/scheduling/scheduling-6](https://pro.reactbits.dev/docs/app-ui/scheduling/scheduling-6)  
> **Native Viewport:** `1280px × 720px`

Week timeline with an hour rail

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`scheduling-6.jsx`](./scheduling-6.jsx) (minHeight: `720px`, hooks: `disconnect`, `duration`, `from`, `observe`, `push`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`scheduling-6.sorbet.jsx`](./scheduling-6.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 173 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 184 |
| **Buttons** | 22 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Today`
- `8 – 12 June 2026`
- `Day`
- `Week`
- `New`
- `Mon 8`
- `Tue 9`
- `Wed 10`
- `Thu 11`
- `Fri 12`
- `Standup`
- `Roadmap shaping 11:00 am`
- `1:1 with Nadia 10:00 am`
- `Vendor call 10:30 am`
- `Design critique 2:00 pm`
- `Mobile QA handoff 9:30 am`
- `All-hands 1:00 pm`
- `Hiring panel 11:00 am`
- `Platform retro 3:00 pm`
- `Focus block 9:00 am`
- `Customer demo 2:00 pm`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 183)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10568i6` | `@layer utilities` | `container-type: inline-size;` |
| `rb105fkjj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb10713pn` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1209do9` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb121o28o` | `@layer utilities` | `height: 60px;` |
| `rb125ncls` | `@layer utilities` | `border-right-style: var(--tw-border-style); border-right-width: 1px;` |
| `rb129b6l5` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb12jjvco` | `@layer utilities` | `text-align: left;` |
| `rb1339zo2` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb13qnyjz` | `@layer utilities` | `align-items: flex-end;` |
| `rb13tkyrm` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb141gb93` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb14ctt6w` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb14dr3bv` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb14qy4of` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb14vg5d9` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb14wuzj7` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
| `rb150ohhm` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb15967o4` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb15ms8mr` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*5);` |
| `rb15pnsph` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb15yfcal` | `@layer utilities` | `z-index: 10;` |
| `rb163ncmg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb167qlrw` | `@layer utilities` | `opacity: 1;` |
| `rb16utcg7` | `@layer utilities` | `height: calc(var(--spacing)*.5);` |
| `rb17g5lpm` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb17n1yd6` | `@layer utilities` | `background-color: currentcolor;` |
| `rb17pjnp6` | `@layer utilities` | `cursor: not-allowed;` |
| `rb18cisp0` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb18rsy81` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb19qnab6` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb19v91qd` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1a9d0xh` | `@layer utilities` | `flex-direction: column;` |
| `rb1an0j0y` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1b65y40` | `@layer utilities` | `display: inline-flex;` |
| `rb1b780ep` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1bho9bv` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1bilc3i` | `@layer utilities` | `margin: calc(var(--spacing)*1);` |
| `rb1c0e3k4` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1ci7kbu` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1d17un5` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1d86b7j` | `@layer utilities` | `align-items: stretch;` |
| `rb1djt8w6` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1emgt72` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1epdf7u` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1eucpb5` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1eutiyq` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1ev5ca5` | `@layer utilities` | `display: grid;` |
| `rb1exwe2` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1fov252` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1ge6rh9` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1gh0jk7` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb1ghf45z` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1gqv3f7` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1gun78u` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1hwwq1h` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1i12aoc` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1ic2788` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1it9oah` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1iulm6j` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1iwy4ev` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1j0qagq` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1jryj0g` | `@layer utilities` | `cursor: grab;` |
| `rb1kc4bf` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1keckau` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1l77syr` | `@layer utilities` | `cursor: pointer;` |
| `rb1lcqu78` | `@layer utilities` | `top: calc(var(--spacing)*-1.5);` |
| `rb1lm2792` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1m6kysk` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1me64rn` | `@layer utilities` | `height: calc(var(--spacing)*3);` |
| `rb1mem2z5` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1mkko36` | `@layer utilities` | `-webkit-box-orient: vertical; display: -webkit-box; overflow: hidden;` |
| `rb1mqjzfo` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1n3nqz2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1na282x` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1nmf86c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1o1nwe1` | `@layer utilities` | `background-color: oklch(0.31 0.06 195);` |
| `rb1o23qxh` | `@layer utilities` | `height: calc(var(--spacing)*5);` |
