# command-menu-3

> **Category:** Command Menu (`command-menu`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/command-menu/command-menu-3](https://pro.reactbits.dev/docs/app-ui/command-menu/command-menu-3)  
> **Native Viewport:** `1280px × 640px`

Search palette with inline previews

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`command-menu-3.jsx`](./command-menu-3.jsx) (minHeight: `640px`, hooks: `disconnect`, `focus`, `getElementById`, `observe`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`command-menu-3.sorbet.jsx`](./command-menu-3.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 142 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 207 |
| **Buttons** | 14 |
| **Inputs / Textareas / Selects** | 1 / 0 / 2 |
| **Tables / Dialogs / Links** | 0 / 1 / 0 |
| **SVGs / Canvases** | 11 / 0 |
| **ARIA Roles** | `dialog`, `combobox`, `radiogroup`, `radio`, `listbox`, `option` |

### Visible Headings & Interactive Labels
- `Search docs, people, workflows ⌘K`
- `Search everything`
- `All`
- `Docs`
- `People`
- `Workflows`
- `Launch readiness review Runbook Aurora mobile 2.4`
- `Checkout latency postmortem Incident 4821`
- `Rollback procedure for staged deploys Runbook Platform`
- `Priya Anand Staff engineer Release`
- `Marcus Reed Senior engineer Reliability`
- `Staged deploy to production Runs on merge to main`
- `Rotate signing keys Runs weekly, Mondays`
- `Nightly database backup Runs daily, 02:00 UTC`
- `Launch readiness review`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 204)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb108v3us` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1091b4e` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb10hlee6` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb11ioj2y` | `@layer utilities` | `z-index: 40;` |
| `rb11sm2ug` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb125gp3k` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb12o33e8` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
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
| `rb160a9iv` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb161982f` | `@layer utilities` | `width: calc(var(--spacing)*80);` |
| `rb164pkjh` | `@layer utilities` | `overflow-y: auto;` |
| `rb1681jj9` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1686d3f` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*4);` |
| `rb16k9gwt` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1);` |
| `rb16udhoq` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb179mdmw` | `@layer utilities` | `width: calc(100% - 2rem);` |
| `rb17bdxjy` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb17ldp94` | `@layer utilities` | `padding-top: calc(var(--spacing)*1.5);` |
| `rb17pyoqr` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb17vd4xw` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1840cmq` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb18d6xe7` | `@layer utilities` | `flex-shrink: 0;` |
| `rb191dyhh` | `@layer utilities` | `left: 50%;` |
| `rb19frnj6` | `@layer utilities` | `white-space: nowrap;` |
| `rb1ahjmj5` | `@layer utilities` | `background-color: oklch(0.3 0.045 195);` |
| `rb1aq3mrc` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1aw8oxi` | `@layer utilities` | `color: oklch(0.38 0.062 195);` |
| `rb1aw9673` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1b0qjek` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1b8cxa2` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb1bivepv` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1bnrb21` | `@layer utilities` | `min-height: calc(var(--spacing)*8);` |
| `rb1bp6zxx` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb1bvdql5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1c544ak` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1cjq4sn` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1cmt97e` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1cqtija` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1dfo6zn` | `@layer utilities › @media (min-width: 40rem)` | `flex-shrink: 0;` |
| `rb1dlfr2j` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1dnt8sf` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1duxebh` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1dvo4lt` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1e9vyas` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*4);` |
| `rb1eaulge` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1epmxoq` | `@layer utilities` | `min-height: calc(var(--spacing)*5);` |
| `rb1fdvlyj` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1ft1qua` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1fuv6kj` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1g4dl2c` | `@layer utilities › @media (min-width: 40rem)` | `display: block;` |
| `rb1habfuh` | `@layer utilities` | `min-height: 640px;` |
| `rb1hlud2p` | `@layer utilities` | `inset: calc(var(--spacing)*0);` |
| `rb1i6cxxa` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb1i9bsb` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1ikfe95` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1jar5ol` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1jfwt9i` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1jgz92v` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1jix6ku` | `@layer utilities` | `text-align: left;` |
| `rb1jlr9bs` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1jt6e5x` | `@layer utilities` | `align-items: center;` |
| `rb1k2t1m4` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1kc97s2` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1kj268v` | `@layer utilities` | `padding-block: calc(var(--spacing)*1.5);` |
| `rb1kq1twe` | `@layer utilities` | `opacity: 1;` |
