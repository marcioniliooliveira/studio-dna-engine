# forms-2

> **Category:** Forms (`forms`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/forms/forms-2](https://pro.reactbits.dev/docs/app-ui/forms/forms-2)  
> **Native Viewport:** `1280px × 1280px`

Two-column form with radio cards

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`forms-2.jsx`](./forms-2.jsx) (minHeight: `1280px`, hooks: `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`forms-2.sorbet.jsx`](./forms-2.sorbet.jsx) (minHeight: `1340px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 174 |
| **Max DOM Depth** | 13 |
| **Atomic/Scoped Classes** | 222 |
| **Buttons** | 6 |
| **Inputs / Textareas / Selects** | 9 / 1 / 2 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 16 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `combobox` |

### Visible Headings & Interactive Labels
- `Submit a session`
- `The session`
- `Session title`
- `Abstract`
- `Format`
- `Conference talk Single speaker, main stage`
- `Hands-on workshop Laptops required, capped room`
- `Lightning slot Back-to-back, no questions`
- `Track`
- `Instrumentation`
- `Audience level`
- `Intermediate`
- `Speaker`
- `Name as printed`
- `Contact address`
- `Affiliation Optional`
- `Room requirements`
- `HDMI capture from my own laptop`
- `Audio playback through the house system`
- `Bench space for hardware demonstration`
- `Live captioning`
- `Before you submit`
- `I agree to the session being recorded and published to the archive.`
- `Submit proposal`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 217)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb109eg9o` | `@layer utilities` | `display: flex;` |
| `rb10fkfig` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb10vfev6` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.4);` |
| `rb115ukz9` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb117wnhx` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb118v662` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb11cigjn` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb11hfmk7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb11i59ru` | `@layer utilities` | `width: fit-content;` |
| `rb11wa44u` | `@layer utilities` | `appearance: none;` |
| `rb12sr5t1` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb12wgshg` | `@layer utilities` | `cursor: progress;` |
| `rb1307nou` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb135gmmj` | `@layer utilities` | `min-height: 800px;` |
| `rb14d05u4` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb14fux24` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb14pusz9` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb15038g4` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb152wxwq` | `@layer utilities` | `display: inline-flex;` |
| `rb15b2suy` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb15sshvq` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb16ad1o6` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*5);` |
| `rb16bz2p1` | `@layer utilities` | `min-height: calc(var(--spacing)*8);` |
| `rb16jcuu2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb16wqkjm` | `@layer utilities` | `field-sizing: content;` |
| `rb178eejg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb17frepy` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb17pr0ex` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb17zqm3w` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb188a12h` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb18cctbc` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb18f8efw` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb18jpthu` | `@layer utilities` | `gap: calc(var(--spacing)*6);` |
| `rb19mu86d` | `@layer utilities` | `transition-property: background-color, border-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-tran` |
| `rb19q75fe` | `@layer utilities` | `grid-row-start: 1;` |
| `rb1a8f8jo` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1aeu4oh` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1ah349n` | `@layer utilities` | `cursor: text;` |
| `rb1c87gx5` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1codv5p` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1d4zkt8` | `@layer utilities` | `min-width: calc(var(--spacing)*40);` |
| `rb1d838c` | `@layer utilities` | `margin-inline: calc(var(--spacing)*-2);` |
| `rb1dmtthv` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb1druwp` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1e35yz7` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1emj477` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1eqnvmy` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1f82wdq` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1fcwed0` | `@layer utilities` | `min-width: calc(var(--spacing)*48);` |
| `rb1g1y899` | `@layer utilities › @media (min-width: 64rem)` | `grid-template-columns: minmax(0px, 1fr) 300px;` |
| `rb1gk0h8e` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1gne4vz` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1gwftgf` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1h1dbuc` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1h6pgpp` | `@layer utilities` | `scale: 0.98;` |
| `rb1h9cvlt` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1hovl8y` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1io8mj3` | `@layer utilities` | `display: grid;` |
| `rb1iqjvjt` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1j1bbcj` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1j2hn9y` | `@layer utilities` | `position: absolute;` |
| `rb1j8ic60` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1js1b08` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1kcorco` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1kj1dzk` | `@layer utilities` | `overflow: hidden;` |
| `rb1kuwckj` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1lgaj51` | `@layer utilities` | `opacity: 0;` |
| `rb1mazheu` | `@layer utilities` | `margin-left: auto;` |
| `rb1mbt00` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1n08sju` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1njctcy` | `@layer utilities` | `opacity: 1;` |
| `rb1nksauy` | `@layer utilities` | `visibility: hidden;` |
| `rb1nxc9zp` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1oew4vr` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb1omvbuc` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1ou2x5s` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1ox4c1v` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1p6lixz` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
