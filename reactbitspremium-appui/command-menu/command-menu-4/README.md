# command-menu-4

> **Category:** Command Menu (`command-menu`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/command-menu/command-menu-4](https://pro.reactbits.dev/docs/app-ui/command-menu/command-menu-4)  
> **Native Viewport:** `1280px × 400px`

Action menu that collects arguments

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`command-menu-4.jsx`](./command-menu-4.jsx) (minHeight: `400px`, hooks: `disconnect`, `focus`, `observe`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`command-menu-4.sorbet.jsx`](./command-menu-4.sorbet.jsx) (minHeight: `400px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 42 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 204 |
| **Buttons** | 4 |
| **Inputs / Textareas / Selects** | 1 / 0 / 1 |
| **Tables / Dialogs / Links** | 0 / 1 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | `dialog` |

### Visible Headings & Interactive Labels
- `Run an action ⌘K`
- `Invite a teammate`
- `Email address`
- `Role`
- `Review`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 204)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1091b4e` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb10hlee6` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1149rvn` | `@layer utilities` | `max-width: var(--container-md);` |
| `rb11ioj2y` | `@layer utilities` | `z-index: 40;` |
| `rb11sm2ug` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb125gp3k` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb12sv6xv` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb12w38wm` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb13cl1i6` | `@layer utilities` | `width: fit-content;` |
| `rb13j1z1o` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb13tmdij` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb149xewd` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb14cvui` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb14giq9z` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb14nl6lg` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb14sp26c` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb156bgfy` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb158v95s` | `@layer utilities` | `max-height: calc(100% - 4rem);` |
| `rb15bztd7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb15y6reg` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*5);` |
| `rb160a9iv` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb164pkjh` | `@layer utilities` | `overflow-y: auto;` |
| `rb1681jj9` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb16k9gwt` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1);` |
| `rb16m3s3u` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb16ssmt` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb16udhoq` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb179mdmw` | `@layer utilities` | `width: calc(100% - 2rem);` |
| `rb17vd4xw` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb18d6xe7` | `@layer utilities` | `flex-shrink: 0;` |
| `rb191dyhh` | `@layer utilities` | `left: 50%;` |
| `rb19frnj6` | `@layer utilities` | `white-space: nowrap;` |
| `rb1aw9673` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1azqr4d` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1b0qjek` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1b2905b` | `@layer utilities` | `cursor: text;` |
| `rb1bivepv` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1bmwx2h` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1bvdql5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1c544ak` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1cd7gmj` | `@layer utilities` | `right: calc(var(--spacing)*3);` |
| `rb1cmt97e` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1cqtija` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1d7q3b6` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1ddtn3g` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb1duxebh` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1dvo4lt` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1e0urwi` | `@layer utilities` | `appearance: none;` |
| `rb1e4vodb` | `@layer utilities` | `top: 12%;` |
| `rb1e9vyas` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*4);` |
| `rb1eaulge` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1epmxoq` | `@layer utilities` | `min-height: calc(var(--spacing)*5);` |
| `rb1fdvlyj` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1fj4qft` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1fo6e1b` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb1ft1qua` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1fu7xwn` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1g2x1pz` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1g6di0` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1hlud2p` | `@layer utilities` | `inset: calc(var(--spacing)*0);` |
| `rb1i6cyoj` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1i9bsb` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1ikfe95` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1ipj260` | `@layer utilities` | `min-width: calc(var(--spacing)*40);` |
| `rb1it25bs` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1jar5ol` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1jfwt9i` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1jix6ku` | `@layer utilities` | `text-align: left;` |
| `rb1jlr9bs` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1jt6e5x` | `@layer utilities` | `align-items: center;` |
| `rb1kfewm4` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1kq1twe` | `@layer utilities` | `opacity: 1;` |
| `rb1krsm1i` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb1kxfj6g` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1l8q437` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1m2n6mb` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1m9sljx` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1md6lek` | `@layer utilities` | `margin-left: calc(var(--spacing)*-1.5);` |
