# forms-1

> **Category:** Forms (`forms`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/forms/forms-1](https://pro.reactbits.dev/docs/app-ui/forms/forms-1)  
> **Native Viewport:** `1280px × 840px`

Record form with a completion meter

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`forms-1.jsx`](./forms-1.jsx) (minHeight: `840px`, hooks: `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`forms-1.sorbet.jsx`](./forms-1.sorbet.jsx) (minHeight: `880px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 152 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 254 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 7 / 0 / 2 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 14 / 0 |
| **ARIA Roles** | `combobox`, `switch` |

### Visible Headings & Interactive Labels
- `Survey deployment`
- `Survey title`
- `Station code Grid reference from the standing station register.`
- `Vessel`
- `Deployment First day gear enters the water.`
- `Recovery`
- `Daily start`
- `Methods`
- `Sediment traps`
- `Lead crew`
- `Coastal survey team`
- `Data release`
- `Institute and partners`
- `Embargo`
- `Station photo`
- `Remove`
- `Revert`
- `Saved`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 252)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb109eg9o` | `@layer utilities` | `display: flex;` |
| `rb10a24nw` | `@layer utilities` | `cursor: pointer;` |
| `rb10fkfig` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb10pqjs2` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb10twxhm` | `@layer utilities` | `height: calc(var(--spacing)*1.5);` |
| `rb115ukz9` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb117wnhx` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb118v662` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb11hfmk7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb11i59ru` | `@layer utilities` | `width: fit-content;` |
| `rb11i9xqd` | `@layer utilities` | `--tw-inset-ring-color: transparent;` |
| `rb11s5mly` | `@layer utilities` | `opacity: 0;` |
| `rb1231z68` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb12ohqle` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb12wgshg` | `@layer utilities` | `cursor: progress;` |
| `rb14d05u4` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb14fux24` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb14pusz9` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb14r2pqs` | `@layer utilities` | `flex-direction: column-reverse;` |
| `rb14yl0do` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb15038g4` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb152wxwq` | `@layer utilities` | `display: inline-flex;` |
| `rb15b2suy` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb15sshvq` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb161fe6c` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb16bz2p1` | `@layer utilities` | `min-height: calc(var(--spacing)*8);` |
| `rb16im1u5` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb16jcuu2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb175rt0z` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb17frepy` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb17hxefo` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb17sdlxe` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.07);` |
| `rb17zqm3w` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb186h9tk` | `@layer utilities` | `width: calc(var(--spacing)*16);` |
| `rb188a12h` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb18f8efw` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb18l5al5` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb18mcf0b` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb197hnyd` | `@layer utilities › @media (min-width: 40rem)` | `min-height: calc(var(--spacing)*11);` |
| `rb19q75fe` | `@layer utilities` | `grid-row-start: 1;` |
| `rb19uevze` | `@layer utilities` | `width: calc(var(--spacing)*10);` |
| `rb1a7x2hf` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb1a8f8jo` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1a9eha1` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1aeu4oh` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1ah349n` | `@layer utilities` | `cursor: text;` |
| `rb1bh17hl` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb1c87gx5` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1codv5p` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1d4zkt8` | `@layer utilities` | `min-width: calc(var(--spacing)*40);` |
| `rb1druwp` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1e35yz7` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1emj477` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1eqnvmy` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1f82wdq` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1ghg7mk` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1gk0h8e` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1gwftgf` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1h3p2dz` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1h6pgpp` | `@layer utilities` | `scale: 0.98;` |
| `rb1h9cvlt` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1hl5cmh` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1hovl8y` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1hx8tvf` | `@layer utilities` | `transition-property: translate, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); tran` |
| `rb1io8mj3` | `@layer utilities` | `display: grid;` |
| `rb1iqjvjt` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1j1bbcj` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1j2hn9y` | `@layer utilities` | `position: absolute;` |
| `rb1j83x5s` | `@layer utilities › @media (min-width: 40rem)` | `padding-top: calc(var(--spacing)*2);` |
| `rb1j8ic60` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1js1b08` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1kj1dzk` | `@layer utilities` | `overflow: hidden;` |
| `rb1kkwqvk` | `@layer utilities` | `width: calc(var(--spacing)*5); height: calc(var(--spacing)*5);` |
| `rb1kpho1k` | `@layer utilities` | `height: 100%;` |
| `rb1kuwckj` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1kxb4jq` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1kzet16` | `@layer utilities` | `transition-property: background-color, border-color, color, scale, outline-color; transition-timing-function: var(--tw-ease,var(--default-tr` |
| `rb1l8gy9z` | `@layer utilities` | `width: 100%;` |
