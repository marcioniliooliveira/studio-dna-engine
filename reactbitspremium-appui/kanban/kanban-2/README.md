# kanban-2

> **Category:** Kanban (`kanban`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/kanban/kanban-2](https://pro.reactbits.dev/docs/app-ui/kanban/kanban-2)  
> **Native Viewport:** `1280px × 680px`

Swimlane board with collapsible lanes

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`kanban-2.jsx`](./kanban-2.jsx) (minHeight: `680px`, hooks: `col`, `getBoundingClientRect`, `id`, `index`, `lane`, `left`, `name`, `querySelectorAll`, `top`, `useCallback`, `useMemo`, `useRef`, `useState`, `width`)
- **Sorbet Source:** [`kanban-2.sorbet.jsx`](./kanban-2.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 225 |
| **Max DOM Depth** | 14 |
| **Atomic/Scoped Classes** | 154 |
| **Buttons** | 15 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 14 / 0 |
| **ARIA Roles** | `button` |

### Visible Headings & Interactive Labels
- `Workstreams`
- `Collapse all`
- `Billing & invoicing`
- `Identity`
- `Platform reliability`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 149)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10ow25s` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
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
| `rb13pn9kl` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb141sohe` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb14a9l43` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb14ka0tb` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb14q78ss` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb14ujj89` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb15fry94` | `@layer utilities` | `padding: calc(var(--spacing)*1);` |
| `rb15vwcu9` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb15ytw5c` | `@layer utilities` | `rotate: 90deg;` |
| `rb165uire` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb16ki0t1` | `@layer utilities` | `width: fit-content;` |
| `rb17ksj40` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb18tjjs7` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb191tvic` | `@layer utilities` | `pointer-events: none;` |
| `rb193xqoj` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb19r5gda` | `@layer utilities` | `margin-right: calc(var(--spacing)*-.5);` |
| `rb1asf85t` | `@layer utilities` | `white-space: nowrap;` |
| `rb1awuhhq` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb1b7fdsn` | `@layer utilities` | `width: 100%;` |
| `rb1bufb3h` | `@layer utilities` | `padding-top: calc(var(--spacing)*6);` |
| `rb1cboxml` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1dccrpq` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1ddni71` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1dli1x1` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1dpcski` | `@layer utilities` | `display: grid;` |
| `rb1exj78z` | `@layer utilities` | `min-height: 92px;` |
| `rb1f307jn` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1gguf09` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1gntm80` | `@layer utilities` | `align-items: center;` |
| `rb1hg5stp` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1hnji3l` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1j8eykh` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1jk4ck3` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1jvy3ar` | `@layer utilities` | `cursor: progress;` |
| `rb1k0rhbn` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1k7eqqq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1lrkrrf` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*2);` |
| `rb1ls15x8` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1mi327j` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1mi5rla` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1mvj6jb` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*6);` |
| `rb1n9ipog` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1nehe3a` | `@layer utilities` | `align-items: flex-end;` |
| `rb1nfidx9` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*4);` |
| `rb1ntvlo0` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1oye479` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1qdpe1n` | `@layer utilities` | `max-width: calc(100% + 16px);` |
| `rb1qmre10` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1s2xfdb` | `@layer utilities` | `margin-inline: calc(var(--spacing)*-2);` |
| `rb1s82feo` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1ss1msm` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1t218hl` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1tgp4ek` | `@layer utilities` | `cursor: pointer;` |
| `rb1ud02ja` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1v1jghp` | `@layer utilities` | `display: flex;` |
| `rb1w5ny3f` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1w6ti4d` | `@layer utilities` | `z-index: 20;` |
| `rb1wjubdn` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1wlp5rl` | `@layer utilities` | `align-self: flex-start;` |
| `rb1wyvd7u` | `@layer utilities` | `position: relative;` |
| `rb1wzj4cj` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1x3tirl` | `@layer utilities` | `padding-inline: calc(var(--spacing)*6);` |
| `rb1xxsbui` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1xy73il` | `@layer utilities` | `margin-left: auto;` |
| `rb1y4t8t0` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1y7rxjh` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
