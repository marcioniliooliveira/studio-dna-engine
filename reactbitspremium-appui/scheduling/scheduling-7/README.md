# scheduling-7

> **Category:** Scheduling (`scheduling`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/scheduling/scheduling-7](https://pro.reactbits.dev/docs/app-ui/scheduling/scheduling-7)  
> **Native Viewport:** `1280px × 640px`

Booking page with a time slot grid

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`scheduling-7.jsx`](./scheduling-7.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`scheduling-7.sorbet.jsx`](./scheduling-7.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 95 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 156 |
| **Buttons** | 18 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Intro call`
- `Pick a day`
- `Mon 8 6 free`
- `Tue 9 2 free`
- `Wed 10 9 free`
- `Thu 11 Full`
- `Fri 12 4 free`
- `Sat 13 Full`
- `Mon 15 7 free`
- `Tue 16 5 free`
- `Times on June 10`
- `09:00`
- `09:30`
- `10:00`
- `10:30`
- `11:00`
- `11:30`
- `13:00`
- `13:30`
- `14:00`
- `Confirm`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-2xl`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 155)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb105fkjj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb10713pn` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb10be4yr` | `@layer utilities › @media (min-width: 40rem)` | `grid-template-columns: repeat(3, minmax(0px, 1fr));` |
| `rb1339zo2` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb141gb93` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb14dr3bv` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb14qy4of` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb150ohhm` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb15967o4` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb15pnsph` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb167qlrw` | `@layer utilities` | `opacity: 1;` |
| `rb17g5lpm` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb17pjnp6` | `@layer utilities` | `cursor: not-allowed;` |
| `rb18cisp0` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1a9d0xh` | `@layer utilities` | `flex-direction: column;` |
| `rb1b65y40` | `@layer utilities` | `display: inline-flex;` |
| `rb1b780ep` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1bho9bv` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1c0e3k4` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1ci7kbu` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1d17un5` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1deb4hy` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb1djt8w6` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1dx04u0` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1ea1qzd` | `@layer utilities` | `inset-block: calc(var(--spacing)*0);` |
| `rb1epdf7u` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1eucpb5` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1ev5ca5` | `@layer utilities` | `display: grid;` |
| `rb1exwe2` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1fov252` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1ge6rh9` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1ghf45z` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1gqv3f7` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1hwwq1h` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1hyhk15` | `@layer utilities` | `left: calc(var(--spacing)*0);` |
| `rb1i12aoc` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1ioq2to` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb1iqcg3o` | `@layer utilities` | `padding-top: calc(var(--spacing)*4);` |
| `rb1iwy4ev` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1kc4bf` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1keckau` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1kij8cd` | `@layer utilities` | `--tw-gradient-position: to right;` |
| `rb1kn0b0y` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1l2ifqb` | `@layer utilities` | `--tw-gradient-position: to left;` |
| `rb1l77syr` | `@layer utilities` | `cursor: pointer;` |
| `rb1m6kysk` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1mqjzfo` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1na282x` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1nmf86c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1ntpjjn` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb1ogvf8` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1ovdiuv` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1ow2k0e` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1p8gvtg` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1q7bzbm` | `@layer utilities` | `border-radius: var(--rb-r-2xl,14px);` |
| `rb1rbu1wv` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1skcd7r` | `@layer utilities` | `justify-content: center;` |
| `rb1smrgio` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1srxu85` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*2.5);` |
| `rb1t3egyu` | `@layer utilities` | `scrollbar-width: none;` |
| `rb1tkhry6` | `@layer utilities` | `width: 72px;` |
| `rb1uap2oi` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1uj6ni2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1wbd1ni` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1wudud7` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1wzcxei` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1x6y215` | `@layer utilities` | `opacity: 0.4;` |
| `rb1yt4xof` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1yxgzh8` | `@layer utilities` | `white-space: nowrap;` |
| `rb1yzho9m` | `@layer utilities` | `justify-content: space-between;` |
| `rb2fydti` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb371e0k` | `@layer utilities` | `right: calc(var(--spacing)*0);` |
| `rb37l7mz` | `@layer utilities` | `scale: 0.98;` |
| `rb3gb9cx` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb3kjxjn` | `@layer utilities` | `min-height: 640px;` |
| `rb3prjyv` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb3yt47a` | `@layer utilities` | `overflow-x: auto;` |
| `rb49qrct` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
