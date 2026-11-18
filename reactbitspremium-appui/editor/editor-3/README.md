# editor-3

> **Category:** Editor (`editor`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/editor/editor-3](https://pro.reactbits.dev/docs/app-ui/editor/editor-3)  
> **Native Viewport:** `1280px × 680px`

Code editor with tabs and a minimap

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`editor-3.jsx`](./editor-3.jsx) (minHeight: `680px`, hooks: `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`editor-3.sorbet.jsx`](./editor-3.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 438 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 158 |
| **Buttons** | 7 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 8 / 0 |
| **ARIA Roles** | `tablist`, `tab`, `tabpanel`, `presentation` |

### Visible Headings & Interactive Labels
- `meter.ts Unsaved`
- `ledger.ts`
- `types.ts`
- `Run`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 157)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10anan4` | `@layer utilities` | `overflow: hidden;` |
| `rb10dl681` | `@layer utilities` | `content: var(--tw-content); bottom: calc(var(--spacing)*0);` |
| `rb10i7wwu` | `@layer utilities` | `white-space: nowrap;` |
| `rb113zeis` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1166hux` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb12nk5x2` | `@layer utilities` | `content: var(--tw-content); position: absolute;` |
| `rb134ryhw` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb13fv2ls` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb14iuwis` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb14jwqsh` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*8);` |
| `rb1522mp8` | `@layer utilities` | `align-items: flex-start;` |
| `rb158nctg` | `@layer utilities` | `cursor: progress;` |
| `rb15sywig` | `@layer utilities` | `--tw-shadow: inset 0 -1px 0 var(--tw-shadow-color,#f5f5f514);` |
| `rb163i4ly` | `@layer utilities` | `margin-left: auto;` |
| `rb16c81q` | `@layer utilities` | `transition-property: color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb16fi26p` | `@layer utilities` | `content: var(--tw-content); height: calc(var(--spacing)*.5);` |
| `rb16j90y8` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb16u19d4` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb17yp20y` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb189kb3o` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb18k2gl6` | `@layer utilities` | `font-size: 13px; line-height: 20px;` |
| `rb18nds9d` | `@layer utilities` | `--tw-gradient-position: to left;` |
| `rb192urt` | `@layer utilities` | `outline-offset: 2px;` |
| `rb19bwbkx` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb19iy95h` | `@layer utilities` | `opacity: 0;` |
| `rb19mttf7` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb19tg21a` | `@layer utilities` | `width: 52px;` |
| `rb19v1yaj` | `@layer utilities` | `overflow: auto;` |
| `rb1b0elzl` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1bf9t73` | `@layer utilities` | `--tw-gradient-position: to right;` |
| `rb1cawzjl` | `@layer utilities` | `column-gap: calc(var(--spacing)*4);` |
| `rb1crgr7c` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1cysp67` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1d1gcwb` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1dpyxzv` | `@layer utilities` | `margin-inline-end: calc(var(--spacing)*-1.5);` |
| `rb1dvhcq0` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1e5gyez` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1eb8no` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb1ey9p5k` | `@layer utilities` | `overflow-x: auto;` |
| `rb1fcntw0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1gdy3sr` | `@layer utilities › @media (min-width: 64rem)` | `display: flex;` |
| `rb1grtfq6` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1gw4f6u` | `@layer utilities` | `white-space: pre;` |
| `rb1gxak09` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1h2g1ii` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1hapw2i` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1hdxakk` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1iha7wq` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1jaer87` | `@layer utilities` | `content: var(--tw-content); background-color: rgba(0, 0, 0, 0);` |
| `rb1ln3513` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1lyfyox` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1m3tdqb` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1mk1ghe` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1mxpyau` | `@layer utilities` | `border-right-style: var(--tw-border-style); border-right-width: 1px;` |
| `rb1mynu02` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1n9j4h` | `@layer utilities` | `content: var(--tw-content); background-color: var(--color-neutral-900);` |
| `rb1nhp5os` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb1njghy8` | `@layer utilities` | `scrollbar-width: none;` |
| `rb1oaucn` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb1ovvure` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1qtc7vf` | `@layer utilities` | `width: 1px;` |
| `rb1qvb76g` | `@layer utilities` | `height: 2px;` |
| `rb1qxtp2e` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb1r8ceu5` | `@layer utilities` | `padding-right: calc(var(--spacing)*3);` |
| `rb1rebdtl` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1rmr04p` | `@layer utilities` | `top: 50%;` |
| `rb1rr5es2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1ryi68a` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1u0jbw3` | `@layer utilities` | `z-index: 10;` |
| `rb1u52nax` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1ubs7jh` | `@layer utilities` | `scale: 0.98;` |
| `rb1uessc6` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1ueynkk` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1uitj5p` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1uw40pp` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1v6ggwx` | `@layer utilities` | `--tw-translate-y: calc(calc(1/2*100%)*-1);` |
| `rb1v9pqjd` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1vwghvc` | `@layer utilities` | `cursor: not-allowed;` |
