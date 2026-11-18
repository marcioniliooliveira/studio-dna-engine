# app-sidebar-3

> **Category:** App Sidebar (`app-sidebar`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/app-sidebar/app-sidebar-3](https://pro.reactbits.dev/docs/app-ui/app-sidebar/app-sidebar-3)  
> **Native Viewport:** `1280px × 640px`

Sidebar with a workspace switcher

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`app-sidebar-3.jsx`](./app-sidebar-3.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`app-sidebar-3.sorbet.jsx`](./app-sidebar-3.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 121 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 163 |
| **Buttons** | 1 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 11 |
| **SVGs / Canvases** | 13 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `N Northwind Logistics Enterprise`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 162)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb109rilf` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb10cq56g` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb10es32g` | `@layer utilities` | `overflow-y: auto;` |
| `rb10hrkh5` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb10kmm8m` | `@layer utilities` | `height: 100%;` |
| `rb10w47ys` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb115nxwl` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb11dpnup` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb11v6w0l` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb125blg9` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb12ecame` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb12zfjwc` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb136iowt` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb136yleg` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb13db9r1` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb14psc4m` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb15nioe9` | `@layer utilities` | `padding-top: calc(var(--spacing)*4);` |
| `rb15p9dk3` | `@layer utilities` | `white-space: nowrap;` |
| `rb15x7i0d` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb16f7zkc` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb16j8mxa` | `@layer utilities` | `cursor: pointer;` |
| `rb176tbgt` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb17897r8` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb179rgsl` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb187eqpt` | `@layer utilities` | `position: absolute;` |
| `rb18hbucg` | `@layer utilities` | `mask-image: linear-gradient(90deg, rgb(0, 0, 0) calc(100% - 24px), rgba(0, 0, 0, 0));` |
| `rb18tkg06` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb18vamh` | `@layer utilities` | `margin-right: calc(var(--spacing)*1);` |
| `rb196li0y` | `@layer utilities` | `align-items: center;` |
| `rb19cb1ln` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb19fcwup` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb19o62wi` | `@layer utilities` | `cursor: text;` |
| `rb19yt3op` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1ajw9tx` | `@layer utilities` | `transition-property: background-color, color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transiti` |
| `rb1amnnhx` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1b4wu2o` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1b5xsda` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1bhjl7y` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb1bhty9k` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1bs4b3n` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb1bzkymb` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb1cvhlot` | `@layer utilities` | `height: calc(var(--spacing)*11);` |
| `rb1dniks5` | `@layer utilities` | `border-right-style: var(--tw-border-style); border-right-width: 1px;` |
| `rb1ex4oq8` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1f5iq7v` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1g8cnr1` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1ghkji5` | `@layer utilities` | `display: block;` |
| `rb1gj9h4x` | `@layer utilities` | `overflow: hidden;` |
| `rb1gxct3u` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1h3rtkl` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1h3spgp` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1hlpd3r` | `@layer utilities` | `text-align: left;` |
| `rb1i6ww2g` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1jm8e1p` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1k35163` | `@layer utilities` | `display: inline-flex;` |
| `rb1ky1jlh` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1l7isom` | `@layer utilities` | `pointer-events: none;` |
| `rb1m6737l` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1m6poyz` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1mfh59a` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1mnx029` | `@layer utilities` | `width: 100%;` |
| `rb1n61i57` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1ncpme5` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*3);` |
| `rb1nia9oq` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1njrsfe` | `@layer utilities` | `margin-block: auto;` |
| `rb1ok0ccy` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1p7ea14` | `@layer utilities` | `flex-direction: column;` |
| `rb1pfkthm` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1pu260b` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1q1nvcd` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1qa3s6s` | `@layer utilities` | `position: relative;` |
| `rb1qtu64j` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1r0nchd` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1rbwdao` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1s72qev` | `@layer utilities` | `opacity: 1;` |
| `rb1sgijfj` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1szcsjq` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1t3el4n` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
