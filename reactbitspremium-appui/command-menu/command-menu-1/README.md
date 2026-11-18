# command-menu-1

> **Category:** Command Menu (`command-menu`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/command-menu/command-menu-1](https://pro.reactbits.dev/docs/app-ui/command-menu/command-menu-1)  
> **Native Viewport:** `1280px × 560px`

Command palette with grouped results

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`command-menu-1.jsx`](./command-menu-1.jsx) (minHeight: `560px`, hooks: `bottom`, `disconnect`, `focus`, `observe`, `top`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`command-menu-1.sorbet.jsx`](./command-menu-1.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 125 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 164 |
| **Buttons** | 12 |
| **Inputs / Textareas / Selects** | 1 / 0 / 2 |
| **Tables / Dialogs / Links** | 0 / 1 / 0 |
| **SVGs / Canvases** | 13 / 0 |
| **ARIA Roles** | `dialog`, `combobox`, `listbox`, `group`, `option` |

### Visible Headings & Interactive Labels
- `Search or run a command ⌘K`
- `Search or run a command`
- `Launch readiness review Opened 6 minutes ago 1`
- `Incident 4821, checkout latency Opened yesterday 2`
- `Q3 roadmap draft Opened 2 days ago 3`
- `Release overview G O`
- `Runbooks and docs G D`
- `Team directory G P`
- `Workspace settings G S`
- `Invite a teammate Send a workspace invite by email I`
- `Schedule a launch review Hold a slot with product and infra S`
- `Rotate an API key Retire a key and issue a replacement R`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 164)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1091b4e` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb10hlee6` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb11ioj2y` | `@layer utilities` | `z-index: 40;` |
| `rb11sm2ug` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb125gp3k` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb12sv6xv` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb12w38wm` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb13cl1i6` | `@layer utilities` | `width: fit-content;` |
| `rb13tmdij` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb149xewd` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb14cvui` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb14nl6lg` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb14sp26c` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb156bgfy` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb158v95s` | `@layer utilities` | `max-height: calc(100% - 4rem);` |
| `rb15bztd7` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb15gb24x` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb15qantw` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb15rqlp7` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb164pkjh` | `@layer utilities` | `overflow-y: auto;` |
| `rb1681jj9` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1686d3f` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*4);` |
| `rb16k9gwt` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1);` |
| `rb16udhoq` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb179mdmw` | `@layer utilities` | `width: calc(100% - 2rem);` |
| `rb17bdxjy` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb17vd4xw` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1840cmq` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb18d6xe7` | `@layer utilities` | `flex-shrink: 0;` |
| `rb191dyhh` | `@layer utilities` | `left: 50%;` |
| `rb19frnj6` | `@layer utilities` | `white-space: nowrap;` |
| `rb1aw9673` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1b0qjek` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1bivepv` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1bnrb21` | `@layer utilities` | `min-height: calc(var(--spacing)*8);` |
| `rb1bvdql5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1c544ak` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1cmt97e` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1cqtija` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1dfx57v` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*1);` |
| `rb1dlfr2j` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1dnt8sf` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1duxebh` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1dvo4lt` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1e4vodb` | `@layer utilities` | `top: 12%;` |
| `rb1eaulge` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1epmxoq` | `@layer utilities` | `min-height: calc(var(--spacing)*5);` |
| `rb1fdvlyj` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1ft1qua` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1fucgys` | `@layer utilities` | `min-height: 560px;` |
| `rb1hlud2p` | `@layer utilities` | `inset: calc(var(--spacing)*0);` |
| `rb1i9bsb` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1ikfe95` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1jar5ol` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1jfwt9i` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1jix6ku` | `@layer utilities` | `text-align: left;` |
| `rb1jlr9bs` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1jt6e5x` | `@layer utilities` | `align-items: center;` |
| `rb1k2t1m4` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1kc97s2` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1kj268v` | `@layer utilities` | `padding-block: calc(var(--spacing)*1.5);` |
| `rb1kq1twe` | `@layer utilities` | `opacity: 1;` |
| `rb1krsm1i` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb1l8q437` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1m2n6mb` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1mnd4rp` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1nkt5c4` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb1ooh8pv` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1p636zv` | `@layer utilities` | `max-height: min(76%, 100% - 4rem);` |
| `rb1p8gg3t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1ptji52` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1qjprp` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1r6407u` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring` |
| `rb1rw5wpk` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.25);` |
| `rb1ry75lr` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1s1fup` | `@layer utilities` | `scale: 0.98;` |
| `rb1sm6c1i` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1ta2heo` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
