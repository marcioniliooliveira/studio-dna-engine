# forms-10

> **Category:** Forms (`forms`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/forms/forms-10](https://pro.reactbits.dev/docs/app-ui/forms/forms-10)  
> **Native Viewport:** `1280px × 1080px`

Guest survey with a 0 to 10 scale

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`forms-10.jsx`](./forms-10.jsx) (minHeight: `1080px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`forms-10.sorbet.jsx`](./forms-10.sorbet.jsx) (minHeight: `1080px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 173 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 239 |
| **Buttons** | 13 |
| **Inputs / Textareas / Selects** | 27 / 0 / 1 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 7 / 0 |
| **ARIA Roles** | `combobox`, `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `How was your stay`
- `Property visited *`
- `Select a property`
- `Reservation reference`
- `How likely are you to recommend us to a friend *`
- `0`
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
- `The room was clean and well kept: Poor`
- `The room was clean and well kept: Fair`
- `The room was clean and well kept: Good`
- `The room was clean and well kept: Very good`
- `The room was clean and well kept: Excellent`
- `Check-in and check-out were smooth: Poor`
- `Check-in and check-out were smooth: Fair`
- `Check-in and check-out were smooth: Good`
- `Check-in and check-out were smooth: Very good`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 236)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb109eg9o` | `@layer utilities` | `display: flex;` |
| `rb10fkfig` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb10pqjs2` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb10twxhm` | `@layer utilities` | `height: calc(var(--spacing)*1.5);` |
| `rb10vfev6` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.4);` |
| `rb115ukz9` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb117wnhx` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb118v662` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb11cigjn` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb11hfmk7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb11i59ru` | `@layer utilities` | `width: fit-content;` |
| `rb11wa44u` | `@layer utilities` | `appearance: none;` |
| `rb1231z68` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb12ohqle` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb12wgshg` | `@layer utilities` | `cursor: progress;` |
| `rb14d05u4` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb14fux24` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb14pusz9` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb15038g4` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb152wxwq` | `@layer utilities` | `display: inline-flex;` |
| `rb15b2suy` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb15sshvq` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb15yhart` | `@layer utilities` | `width: calc(var(--spacing)*28);` |
| `rb16jcuu2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb16q87a9` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb17frepy` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb17pr0ex` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb17sdlxe` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.07);` |
| `rb17zqm3w` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb188a12h` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb18f8efw` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb19mu86d` | `@layer utilities` | `transition-property: background-color, border-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-tran` |
| `rb1a7x2hf` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb1a9eha1` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1aeu4oh` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1ah349n` | `@layer utilities` | `cursor: text;` |
| `rb1c87gx5` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1cidvhk` | `@layer utilities` | `overflow-x: auto;` |
| `rb1codv5p` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1cq9ctc` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1d4zkt8` | `@layer utilities` | `min-width: calc(var(--spacing)*40);` |
| `rb1druwp` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1e35yz7` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1ec0juk` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*5);` |
| `rb1emj477` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1eqnvmy` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1f82wdq` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1gk0h8e` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1gne4vz` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1gwftgf` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1h1dbuc` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1h3p2dz` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1h6pgpp` | `@layer utilities` | `scale: 0.98;` |
| `rb1h9cvlt` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1hl5cmh` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1hovl8y` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1ifqogh` | `@layer utilities` | `grid-column: span 6 / span 6;` |
| `rb1io8mj3` | `@layer utilities` | `display: grid;` |
| `rb1iqjvjt` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1j1bbcj` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1j2hn9y` | `@layer utilities` | `position: absolute;` |
| `rb1j8ic60` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1jah9x8` | `@layer utilities` | `min-width: 460px;` |
| `rb1jrqyau` | `@layer utilities` | `text-align: center;` |
| `rb1js1b08` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1kj1dzk` | `@layer utilities` | `overflow: hidden;` |
| `rb1kuwckj` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1kxb4jq` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1lgaj51` | `@layer utilities` | `opacity: 0;` |
| `rb1ly3p9j` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1m4eq2v` | `@layer utilities` | `max-width: 100%;` |
| `rb1mbt00` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1mg6eb8` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1n08sju` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1njctcy` | `@layer utilities` | `opacity: 1;` |
| `rb1nkxbsu` | `@layer utilities` | `padding-block: calc(var(--spacing)*5);` |
| `rb1nuwxht` | `@layer utilities` | `padding-block: calc(var(--spacing)*4);` |
| `rb1nxc9zp` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
