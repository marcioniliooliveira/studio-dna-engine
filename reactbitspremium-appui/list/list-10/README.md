# list-10

> **Category:** List (`list`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/list/list-10](https://pro.reactbits.dev/docs/app-ui/list/list-10)  
> **Native Viewport:** `1280px × 560px`

Runbook checklist with progress

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`list-10.jsx`](./list-10.jsx) (minHeight: `560px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`list-10.sorbet.jsx`](./list-10.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 127 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 152 |
| **Buttons** | 0 |
| **Inputs / Textareas / Selects** | 8 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 8 |
| **SVGs / Canvases** | 16 / 0 |
| **ARIA Roles** | `progressbar` |

### Visible Headings & Interactive Labels
- `Checkout latency spike: SEV2`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 148)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb103hvuf` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb10w2x2` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb11d4l69` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb11x4nir` | `@layer utilities` | `max-width: 720px;` |
| `rb1246soy` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb12anyio` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb12f9lg6` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12ydtnn` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1311ksy` | `@layer utilities` | `padding: calc(var(--spacing)*8);` |
| `rb135k3xg` | `@layer utilities` | `position: absolute;` |
| `rb139dvfa` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb139qys3` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb13nw88v` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*4);` |
| `rb13rmkce` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb13wqvan` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb14oz6ys` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb14pa5bh` | `@layer utilities` | `flex-shrink: 0;` |
| `rb16vibvw` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.4);` |
| `rb17fh8mg` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb17t31w9` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb17xydq` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb19wcvcm` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1a1z7s4` | `@layer utilities` | `appearance: none;` |
| `rb1a3lber` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1a5cp41` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1adblhk` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1ankisp` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1b07qnj` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1bget6i` | `@layer utilities` | `display: flex;` |
| `rb1bnuzy3` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1buv4sl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1ct19o2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1cwmibi` | `@layer utilities` | `justify-content: space-between;` |
| `rb1dy58ls` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb1ei4fzq` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb1f0pmfz` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1fgkcks` | `@layer utilities` | `text-align: left;` |
| `rb1gg0brq` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1gjq3hk` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb1i4u931` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1i8pkx` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1id6xbq` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1in6j0p` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1irsqrc` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1jpauj2` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1juc2gj` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb1kf20cf` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1l4s76e` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1le8i5q` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1li9omd` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb1mujmlb` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1ng6wh6` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1ngqaqq` | `@layer utilities` | `overflow: hidden;` |
| `rb1nopqqj` | `@layer utilities` | `overflow-y: auto;` |
| `rb1nv07y7` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb1o5nz7o` | `@layer utilities` | `display: inline-flex;` |
| `rb1od6ooo` | `@layer utilities` | `opacity: 1;` |
| `rb1of41mp` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1ohla8e` | `@layer utilities` | `opacity: 1;` |
| `rb1oiq4fg` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.07);` |
| `rb1oneu6e` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1opyp2b` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1p434y2` | `@layer utilities` | `display: block;` |
| `rb1pm5ls8` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1prfx8w` | `@layer utilities` | `opacity: 1;` |
| `rb1pxfs40` | `@layer utilities` | `white-space: nowrap;` |
| `rb1rgniel` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1sp1pfy` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1tvx9ty` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1tx8hsz` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1typ7yw` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1uq8nhn` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1vlrsli` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1vwiman` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1vzazik` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1wnibuf` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1xcf00d` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-900); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1xoud2l` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
