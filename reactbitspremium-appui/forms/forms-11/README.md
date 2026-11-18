# forms-11

> **Category:** Forms (`forms`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/forms/forms-11](https://pro.reactbits.dev/docs/app-ui/forms/forms-11)  
> **Native Viewport:** `1280px × 680px`

Create environment dialog

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`forms-11.jsx`](./forms-11.jsx) (minHeight: `680px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`forms-11.sorbet.jsx`](./forms-11.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 69 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 265 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 1 / 1 / 2 |
| **Tables / Dialogs / Links** | 0 / 1 / 0 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | `dialog`, `radiogroup`, `radio`, `combobox`, `switch` |

### Visible Headings & Interactive Labels
- `New environment`
- `Close`
- `Preview`
- `Staging`
- `Production`
- `Name *`
- `Region`
- `US East (N. Virginia)`
- `Copy variables from`
- `Start with no variables`
- `Description`
- `Cancel`
- `Create environment`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 264)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb109eg9o` | `@layer utilities` | `display: flex;` |
| `rb10fkfig` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb10pqjs2` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb10rywb4` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb115ukz9` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb117wnhx` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb118v662` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb11hfmk7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb11i59ru` | `@layer utilities` | `width: fit-content;` |
| `rb11i9xqd` | `@layer utilities` | `--tw-inset-ring-color: transparent;` |
| `rb1231z68` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb12ohqle` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb12sr5t1` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb12wfg7t` | `@layer utilities` | `min-height: 680px;` |
| `rb12wgshg` | `@layer utilities` | `cursor: progress;` |
| `rb13a79dt` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb144kftv` | `@layer utilities` | `min-height: 80px;` |
| `rb14d05u4` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb14fux24` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb14pusz9` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb14q1754` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb14yl0do` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb15038g4` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb152wxwq` | `@layer utilities` | `display: inline-flex;` |
| `rb15b2suy` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb15sshvq` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb16im1u5` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb16jcuu2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb16wqkjm` | `@layer utilities` | `field-sizing: content;` |
| `rb178eejg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb17frepy` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb17zqm3w` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb188a12h` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb18f8efw` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb18hcmga` | `@layer utilities` | `--tw-shadow: 0 12px 24px -12px var(--tw-shadow-color,#0009); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-of` |
| `rb18jpthu` | `@layer utilities` | `gap: calc(var(--spacing)*6);` |
| `rb18jvw8t` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1a9eha1` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1aeu4oh` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1ah349n` | `@layer utilities` | `cursor: text;` |
| `rb1biqaul` | `@layer utilities` | `max-height: 440px;` |
| `rb1c87gx5` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1codv5p` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1cq9ctc` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1d4zkt8` | `@layer utilities` | `min-width: calc(var(--spacing)*40);` |
| `rb1dkqmmq` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb1druwp` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1e35yz7` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1emj477` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1eqnvmy` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1f82wdq` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1fcwed0` | `@layer utilities` | `min-width: calc(var(--spacing)*48);` |
| `rb1ghg7mk` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1gk0h8e` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1gwftgf` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1h3p2dz` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1h66emr` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1h6pgpp` | `@layer utilities` | `scale: 0.98;` |
| `rb1h9cvlt` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1heutqg` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1hl5cmh` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1hovl8y` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1hx8tvf` | `@layer utilities` | `transition-property: translate, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); tran` |
| `rb1iqjvjt` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1j1bbcj` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1j2hn9y` | `@layer utilities` | `position: absolute;` |
| `rb1j8ic60` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1j97iy6` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1js1b08` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1jyj1rg` | `@layer utilities` | `max-height: calc(100% - 4rem);` |
| `rb1k86uc3` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1kcorco` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1kj1dzk` | `@layer utilities` | `overflow: hidden;` |
| `rb1kupgn9` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1kuwckj` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1l4vy9i` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb1lgaj51` | `@layer utilities` | `opacity: 0;` |
| `rb1llffug` | `@layer utilities` | `max-height: 100%;` |
