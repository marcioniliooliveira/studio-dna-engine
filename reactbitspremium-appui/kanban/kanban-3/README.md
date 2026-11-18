# kanban-3

> **Category:** Kanban (`kanban`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/kanban/kanban-3](https://pro.reactbits.dev/docs/app-ui/kanban/kanban-3)  
> **Native Viewport:** `1280px × 680px`

Regroupable board by status or owner

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`kanban-3.jsx`](./kanban-3.jsx) (minHeight: `680px`, hooks: `filter`, `getBoundingClientRect`, `index`, `indexOf`, `left`, `length`, `querySelectorAll`, `top`, `useCallback`, `useId`, `useMemo`, `useRef`, `useState`, `value`, `width`)
- **Sorbet Source:** [`kanban-3.sorbet.jsx`](./kanban-3.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 194 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 138 |
| **Buttons** | 12 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 9 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `button` |

### Visible Headings & Interactive Labels
- `Northwind roadmap`
- `Status`
- `Assignee`
- `Priority`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 135)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10ow25s` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb10x8aa` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb11syhj7` | `@layer utilities` | `cursor: not-allowed;` |
| `rb11u6ugb` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb122u2mn` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb12imw8w` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb12kq8wj` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb12olnh9` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*8);` |
| `rb12rya2c` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb12tzafq` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb13bxhga` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb13cgftt` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb13oiv93` | `@layer utilities` | `overflow: hidden;` |
| `rb141sohe` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb14a9l43` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb14ka0tb` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb14q78ss` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb15fry94` | `@layer utilities` | `padding: calc(var(--spacing)*1);` |
| `rb15vwcu9` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb15y6n9z` | `@layer utilities` | `overflow-x: auto;` |
| `rb16ki0t1` | `@layer utilities` | `width: fit-content;` |
| `rb17iqhue` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb17ksj40` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb191tvic` | `@layer utilities` | `pointer-events: none;` |
| `rb193xqoj` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb19r5gda` | `@layer utilities` | `margin-right: calc(var(--spacing)*-.5);` |
| `rb1asf85t` | `@layer utilities` | `white-space: nowrap;` |
| `rb1awuhhq` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb1b7fdsn` | `@layer utilities` | `width: 100%;` |
| `rb1bufb3h` | `@layer utilities` | `padding-top: calc(var(--spacing)*6);` |
| `rb1cboxml` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1cfsz07` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1dccrpq` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1dli1x1` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1gguf09` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1gntm80` | `@layer utilities` | `align-items: center;` |
| `rb1hdjx3a` | `@layer utilities` | `align-items: stretch;` |
| `rb1hg5stp` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1hnji3l` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1jgerj3` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1jk4ck3` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1k0rhbn` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1k7eqqq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1mi327j` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1mi5rla` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1mvj6jb` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*6);` |
| `rb1nehe3a` | `@layer utilities` | `align-items: flex-end;` |
| `rb1nfidx9` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*4);` |
| `rb1oh5s7n` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1oye479` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1ratwp` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1s82feo` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1ss1msm` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1t218hl` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1tgp4ek` | `@layer utilities` | `cursor: pointer;` |
| `rb1ud02ja` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1v0vlf2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1v1jghp` | `@layer utilities` | `display: flex;` |
| `rb1v2ynqx` | `@layer utilities` | `overflow-y: hidden;` |
| `rb1vys3js` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1w5ny3f` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1wjubdn` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1wyvd7u` | `@layer utilities` | `position: relative;` |
| `rb1wzj4cj` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1x3tirl` | `@layer utilities` | `padding-inline: calc(var(--spacing)*6);` |
| `rb1xxsbui` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1xy73il` | `@layer utilities` | `margin-left: auto;` |
| `rb1y4t8t0` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1y7rxjh` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb2itbd0` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb4mp60w` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb603jhx` | `@layer utilities` | `text-align: left;` |
| `rb6r4h17` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb7of4es` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
| `rb7phbpg` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb87iwk8` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb90vygp` | `@layer utilities` | `min-width: max-content;` |
| `rb9ustmx` | `@layer utilities` | `display: inline-flex;` |
