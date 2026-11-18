# list-4

> **Category:** List (`list`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/list/list-4](https://pro.reactbits.dev/docs/app-ui/list/list-4)  
> **Native Viewport:** `1280px × 640px`

Reorderable publishing queue

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`list-4.jsx`](./list-4.jsx) (minHeight: `640px`, hooks: `author`, `id`, `title`, `useEffect`, `useMemo`, `useRef`, `useState`, `words`)
- **Sorbet Source:** [`list-4.sorbet.jsx`](./list-4.sorbet.jsx) (minHeight: `700px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 155 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 118 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 9 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Publishing queue`
- `Reset order`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 115)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10w2x2` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb11d4l69` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb11x4nir` | `@layer utilities` | `max-width: 720px;` |
| `rb12ydtnn` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1311ksy` | `@layer utilities` | `padding: calc(var(--spacing)*8);` |
| `rb135k3xg` | `@layer utilities` | `position: absolute;` |
| `rb139dvfa` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb13rmkce` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb13wqvan` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb14oz6ys` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb14pa5bh` | `@layer utilities` | `flex-shrink: 0;` |
| `rb17fh8mg` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb17r7ve8` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb17t31w9` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb19wcvcm` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1a3lber` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1adblhk` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1ankisp` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1b07qnj` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1bget6i` | `@layer utilities` | `display: flex;` |
| `rb1buv4sl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1cwmibi` | `@layer utilities` | `justify-content: space-between;` |
| `rb1d9yvwn` | `@layer utilities` | `justify-content: safe center;` |
| `rb1ei4fzq` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb1fgkcks` | `@layer utilities` | `text-align: left;` |
| `rb1fw2ggl` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb1gjq3hk` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb1i4u931` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1irsqrc` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1ix64po` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1jfzlqv` | `@layer utilities` | `width: calc(var(--spacing)*4);` |
| `rb1l4s76e` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1mujmlb` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1ng6wh6` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1ngqaqq` | `@layer utilities` | `overflow: hidden;` |
| `rb1nopqqj` | `@layer utilities` | `overflow-y: auto;` |
| `rb1nqxfxt` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1o5nz7o` | `@layer utilities` | `display: inline-flex;` |
| `rb1oneu6e` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1plqqx4` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb1pm5ls8` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1pxfs40` | `@layer utilities` | `white-space: nowrap;` |
| `rb1rgniel` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1rv9r95` | `@layer utilities` | `touch-action: none;` |
| `rb1tvx9ty` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1tx8hsz` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1typ7yw` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1uq8nhn` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1vlrsli` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1vwiman` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1vzazik` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1xoud2l` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1yzl0m9` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb2r5dai` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb3158ho` | `@layer utilities` | `padding-right: calc(var(--spacing)*2);` |
| `rb3fq1f9` | `@layer utilities` | `pointer-events: none;` |
| `rb3ml7ru` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb3rj9pf` | `@layer utilities` | `justify-content: center;` |
| `rb3v41kl` | `@layer utilities` | `padding-right: calc(var(--spacing)*1);` |
| `rb59dbn0` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb5r04p3` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*10);` |
| `rb5stozm` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb66qz7f` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb6e7n5v` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb6egb5b` | `@layer utilities` | `min-height: 640px;` |
| `rb6uhybd` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb7mdpuj` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb95yie7` | `@layer utilities` | `height: 100%;` |
| `rb9iyqeo` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb9ojww0` | `@layer utilities` | `width: 100%;` |
| `rba2ewn3` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rba59b1g` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rbaf8wqf` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rbb7grob` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rbbezzy9` | `@layer utilities` | `padding-block: 0px;` |
| `rbbhhfxs` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rbbl8l2h` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rbdxbgwf` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
