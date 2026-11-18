# forms-9

> **Category:** Forms (`forms`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/forms/forms-9](https://pro.reactbits.dev/docs/app-ui/forms/forms-9)  
> **Native Viewport:** `1280px × 800px`

Opening hours with per-day intervals

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`forms-9.jsx`](./forms-9.jsx) (minHeight: `800px`, hooks: `disconnect`, `from`, `observe`, `to`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`forms-9.sorbet.jsx`](./forms-9.sorbet.jsx) (minHeight: `800px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 368 |
| **Max DOM Depth** | 13 |
| **Atomic/Scoped Classes** | 219 |
| **Buttons** | 50 |
| **Inputs / Textareas / Selects** | 1 / 0 / 23 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 43 / 0 |
| **ARIA Roles** | `combobox`, `switch` |

### Visible Headings & Interactive Labels
- `Opening hours`
- `Time zone`
- `Chicago (GMT-06:00)`
- `Copy Monday to weekdays`
- `8:00 AM`
- `12:00 PM`
- `Remove time range`
- `1:00 PM`
- `6:00 PM`
- `Add hours`
- `7:00 PM`
- `5:00 PM`
- `9:00 AM`
- `Accept bookings on public holidays`
- `Reset`
- `Save hours`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 213)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb109eg9o` | `@layer utilities` | `display: flex;` |
| `rb10fkfig` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb10pqjs2` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb10vfev6` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.4);` |
| `rb115ukz9` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb117wnhx` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb118v662` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb11cigjn` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb11hfmk7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb11i59ru` | `@layer utilities` | `width: fit-content;` |
| `rb11i9xqd` | `@layer utilities` | `--tw-inset-ring-color: transparent;` |
| `rb11wa44u` | `@layer utilities` | `appearance: none;` |
| `rb1231z68` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb12ohqle` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb12wgshg` | `@layer utilities` | `cursor: progress;` |
| `rb135gmmj` | `@layer utilities` | `min-height: 800px;` |
| `rb14d05u4` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb14pusz9` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb14yl0do` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb15038g4` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb152wxwq` | `@layer utilities` | `display: inline-flex;` |
| `rb15b2suy` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb16im1u5` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb16jcuu2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb17frepy` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb17pr0ex` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb17zqm3w` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb188a12h` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb18f8efw` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb19acj3h` | `@layer utilities` | `width: calc(var(--spacing)*24);` |
| `rb19mu86d` | `@layer utilities` | `transition-property: background-color, border-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-tran` |
| `rb1a9eha1` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1aeu4oh` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1c87gx5` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1cq9ctc` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1d4zkt8` | `@layer utilities` | `min-width: calc(var(--spacing)*40);` |
| `rb1druwp` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1em05jj` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*4);` |
| `rb1eqnvmy` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1f82wdq` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1ghg7mk` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1gk0h8e` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1gne4vz` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1gwftgf` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1h3p2dz` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1h6pgpp` | `@layer utilities` | `scale: 0.98;` |
| `rb1h9cvlt` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1heutqg` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1hl5cmh` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1hovl8y` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1hx8tvf` | `@layer utilities` | `transition-property: translate, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); tran` |
| `rb1j1bbcj` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1j2hn9y` | `@layer utilities` | `position: absolute;` |
| `rb1j8ic60` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1js1b08` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1kj1dzk` | `@layer utilities` | `overflow: hidden;` |
| `rb1kuwckj` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1kxb4jq` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1lgaj51` | `@layer utilities` | `opacity: 0;` |
| `rb1ly3p9j` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1mazheu` | `@layer utilities` | `margin-left: auto;` |
| `rb1mbt00` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1mk4x3b` | `@layer utilities` | `--tw-inset-ring-color: #f5f5f580;` |
| `rb1n08sju` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1njctcy` | `@layer utilities` | `opacity: 1;` |
| `rb1nuwxht` | `@layer utilities` | `padding-block: calc(var(--spacing)*4);` |
| `rb1nxc9zp` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1o4wj6s` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb1o6rkw7` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1ou2x5s` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1p3rxzm` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1p6lixz` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1pam7ev` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1pnnctf` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb1pulest` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1px3z18` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb1q3epyz` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1q8ngy5` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3.5);` |
