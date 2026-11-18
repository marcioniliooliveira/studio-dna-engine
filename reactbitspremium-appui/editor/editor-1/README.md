# editor-1

> **Category:** Editor (`editor`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/editor/editor-1](https://pro.reactbits.dev/docs/app-ui/editor/editor-1)  
> **Native Viewport:** `1280px × 680px`

Rich text editor with a toolbar

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`editor-1.jsx`](./editor-1.jsx) (minHeight: `680px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`editor-1.sorbet.jsx`](./editor-1.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 64 |
| **Max DOM Depth** | 7 |
| **Atomic/Scoped Classes** | 142 |
| **Buttons** | 8 |
| **Inputs / Textareas / Selects** | 1 / 1 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 8 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Paragraph`
- `Bold`
- `Italic`
- `Strikethrough`
- `Inline code`
- `Link`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 142)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10anan4` | `@layer utilities` | `overflow: hidden;` |
| `rb10i7wwu` | `@layer utilities` | `white-space: nowrap;` |
| `rb11293f5` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb112xtsf` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb113zeis` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1166hux` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb13fqu49` | `@layer utilities` | `overflow-y: auto;` |
| `rb13fv2ls` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb14hd93l` | `@layer utilities` | `margin-top: calc(var(--spacing)*6);` |
| `rb1507cqv` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb158nctg` | `@layer utilities` | `cursor: progress;` |
| `rb163i4ly` | `@layer utilities` | `margin-left: auto;` |
| `rb16j90y8` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb16u19d4` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb16zg63j` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1763oht` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb178103n` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb17yp20y` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb183kobu` | `@layer utilities` | `text-align: left;` |
| `rb18nds9d` | `@layer utilities` | `--tw-gradient-position: to left;` |
| `rb18o4gao` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb192urt` | `@layer utilities` | `outline-offset: 2px;` |
| `rb19bwbkx` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb19iy95h` | `@layer utilities` | `opacity: 0;` |
| `rb19mttf7` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1avalt5` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1b0elzl` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1bf9t73` | `@layer utilities` | `--tw-gradient-position: to right;` |
| `rb1ckwl8k` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1cs7ijq` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1cysp67` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1dab1fc` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1ey9p5k` | `@layer utilities` | `overflow-x: auto;` |
| `rb1eypgna` | `@layer utilities › @media (min-width: 40rem)` | `display: inline;` |
| `rb1fcntw0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1grtfq6` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1gxak09` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1h2g1ii` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1iha7wq` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1ipc2gq` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*8);` |
| `rb1ln3513` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1lyfyox` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1m3tdqb` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1mk1ghe` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1mxpyau` | `@layer utilities` | `border-right-style: var(--tw-border-style); border-right-width: 1px;` |
| `rb1mynu02` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1nhp5os` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb1njghy8` | `@layer utilities` | `scrollbar-width: none;` |
| `rb1ovvure` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1p3b0bo` | `@layer utilities` | `font-size: 24px; line-height: 28px;` |
| `rb1qtc7vf` | `@layer utilities` | `width: 1px;` |
| `rb1r8ceu5` | `@layer utilities` | `padding-right: calc(var(--spacing)*3);` |
| `rb1rdjlee` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1rebdtl` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1rldnec` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1rr5es2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1ryi68a` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1t6hnn9` | `@layer utilities` | `--tw-tracking: -.01em; letter-spacing: -0.01em;` |
| `rb1ubs7jh` | `@layer utilities` | `scale: 0.98;` |
| `rb1uessc6` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1uitj5p` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1uw40pp` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1vwghvc` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1wfipon` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1wuj5k3` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1xohyn0` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb1yag1m` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb1ygw9zi` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1yug01z` | `@layer utilities` | `display: none;` |
| `rb209gpc` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb27r0kg` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb32kssz` | `@layer utilities` | `flex-shrink: 0;` |
| `rb42ly1p` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb4denn9` | `@layer utilities` | `cursor: pointer;` |
| `rb4tcpqk` | `@layer utilities` | `display: flex;` |
| `rb6879vg` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb7bjjst` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb7cvnm1` | `@layer utilities` | `justify-content: center;` |
