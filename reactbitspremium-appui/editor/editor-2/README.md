# editor-2

> **Category:** Editor (`editor`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/editor/editor-2](https://pro.reactbits.dev/docs/app-ui/editor/editor-2)  
> **Native Viewport:** `1280px × 680px`

Markdown with write and preview modes

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`editor-2.jsx`](./editor-2.jsx) (minHeight: `680px`, hooks: `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`editor-2.sorbet.jsx`](./editor-2.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 76 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 131 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 0 / 1 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `streaming-meter.md`
- `Write`
- `Split`
- `Preview`
- `Migrating to the streaming meter`
- `What changes`
- `Rollout`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 130)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10anan4` | `@layer utilities` | `overflow: hidden;` |
| `rb10i7wwu` | `@layer utilities` | `white-space: nowrap;` |
| `rb10uigk3` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb112xtsf` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb13fqu49` | `@layer utilities` | `overflow-y: auto;` |
| `rb14iuwis` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb162j88p` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb16u19d4` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb16zg63j` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb17lzhso` | `@layer utilities` | `--tw-leading: 1; line-height: 1;` |
| `rb17yp20y` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb189kb3o` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb18k2gl6` | `@layer utilities` | `font-size: 13px; line-height: 20px;` |
| `rb18o4gao` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb19b9r8g` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb19bwbkx` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb19iy95h` | `@layer utilities` | `opacity: 0;` |
| `rb19mttf7` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1af4v9l` | `@layer utilities` | `width: calc(var(--spacing)*1.5); height: calc(var(--spacing)*1.5);` |
| `rb1aq65ni` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1asv68d` | `@layer utilities` | `align-items: stretch;` |
| `rb1avalt5` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1b0elzl` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1bnicfg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1ciw893` | `@layer utilities › @media (min-width: 48rem)` | `display: flex;` |
| `rb1ckwl8k` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1crixy4` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1cwddad` | `@layer utilities` | `padding-top: calc(var(--spacing)*1);` |
| `rb1dab1fc` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1eb8no` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb1fcntw0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1gxak09` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1iha7wq` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1lyfyox` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1m3tdqb` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1mk1ghe` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1mxpyau` | `@layer utilities` | `border-right-style: var(--tw-border-style); border-right-width: 1px;` |
| `rb1n7natj` | `@layer utilities` | `gap: calc(var(--spacing)*2.5);` |
| `rb1p6qypb` | `@layer utilities` | `padding-block: 1px;` |
| `rb1pcpo96` | `@layer utilities` | `font-size: 0.9em;` |
| `rb1qxtp2e` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb1rdjlee` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1rr5es2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1ryi68a` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1sddg8v` | `@layer utilities` | `display: grid;` |
| `rb1uessc6` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1ufv0k1` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
| `rb1v6ggwx` | `@layer utilities` | `--tw-translate-y: calc(calc(1/2*100%)*-1);` |
| `rb1vhpsk3` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1vwghvc` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1wd5ewv` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1xeicy1` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1xj2aa3` | `@layer utilities` | `overflow-wrap: anywhere;` |
| `rb1xz9j0f` | `@layer utilities` | `font-style: italic;` |
| `rb1ygw9zi` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1yso628` | `@layer utilities` | `justify-content: space-between;` |
| `rb1yxr6yf` | `@layer utilities` | `text-align: right;` |
| `rb209gpc` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb32kssz` | `@layer utilities` | `flex-shrink: 0;` |
| `rb355yp5` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb42ly1p` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb4denn9` | `@layer utilities` | `cursor: pointer;` |
| `rb4tcpqk` | `@layer utilities` | `display: flex;` |
| `rb5en310` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb5krqcu` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb6879vg` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb68ipym` | `@layer utilities` | `max-width: 640px;` |
| `rb7bjjst` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb7cvnm1` | `@layer utilities` | `justify-content: center;` |
| `rb7mapl8` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb7ow3e2` | `@layer utilities` | `width: fit-content;` |
| `rb7w8l6m` | `@layer utilities` | `--tw-font-weight: var(--font-weight-medium); font-weight: var(--font-weight-medium);` |
| `rb8gl6ub` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb8y4d9y` | `@layer utilities` | `width: 100%;` |
| `rbam7mx3` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rbare8vv` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rbb4giqk` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rbbqkk74` | `@layer utilities` | `resize: none;` |
