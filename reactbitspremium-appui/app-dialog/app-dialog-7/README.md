# app-dialog-7

> **Category:** App Dialog (`app-dialog`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/app-dialog/app-dialog-7](https://pro.reactbits.dev/docs/app-ui/app-dialog/app-dialog-7)  
> **Native Viewport:** `1280px × 560px`

Menus, submenus and shortcuts

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`app-dialog-7.jsx`](./app-dialog-7.jsx) (minHeight: `560px`, hooks: `activeElement`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`app-dialog-7.sorbet.jsx`](./app-dialog-7.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 58 |
| **Max DOM Depth** | 7 |
| **Atomic/Scoped Classes** | 134 |
| **Buttons** | 7 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 1 / 0 |
| **SVGs / Canvases** | 8 / 0 |
| **ARIA Roles** | `dialog`, `menu`, `menuitem`, `separator` |

### Visible Headings & Interactive Labels
- `Report actions`
- `Rename report ⌘R`
- `Duplicate ⌘D`
- `Export as`
- `Copy link ⌘⇧C`
- `Move to archive`
- `Delete report`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 134)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10vwoj8` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb13p17yo` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb13reitd` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb15ci1q9` | `@layer utilities` | `height: 100%;` |
| `rb15cyu4i` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb178tctp` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb17y396j` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb18sud1u` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb19hjnfu` | `@layer utilities` | `--tw-shadow: 0 12px 24px -12px var(--tw-shadow-color,#0009); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-of` |
| `rb19pinl5` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1a07lb0` | `@layer utilities` | `max-width: min(480px, -2rem + 100vw);` |
| `rb1axvfwx` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1bdyjyq` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1bpmd5p` | `@layer utilities` | `scale: 0.98;` |
| `rb1c0veup` | `@layer utilities` | `overscroll-behavior: contain;` |
| `rb1cqgmcl` | `@layer utilities` | `min-height: calc(var(--spacing)*8);` |
| `rb1crotrp` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1cystd6` | `@layer utilities › @media (min-width: 40rem)` | `max-width: var(--container-sm);` |
| `rb1dr84yw` | `@layer utilities` | `background-color: oklch(0.945 0.027 26);` |
| `rb1e2l8j5` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1ebpjza` | `@layer utilities` | `--tw-shadow: 0 12px 24px -12px var(--tw-shadow-color,#0003);` |
| `rb1enh133` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1f2ki1l` | `@layer utilities` | `align-items: center;` |
| `rb1f4wj3p` | `@layer utilities` | `margin-inline-start: auto;` |
| `rb1f9kvjr` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1gq4l7` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1gusqpz` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1hery3x` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1huw61k` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1io1cuc` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1jkedf1` | `@layer utilities` | `bottom: calc(var(--spacing)*4);` |
| `rb1kkniou` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1knzfg4` | `@layer utilities` | `min-width: calc(var(--spacing)*48);` |
| `rb1komgn4` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1lgdwjd` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1ljit1z` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1m3huko` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1n1dckq` | `@layer utilities › @media (min-width: 40rem)` | `left: auto;` |
| `rb1nn63f1` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1oemoan` | `@layer utilities` | `margin-block: calc(var(--spacing)*1);` |
| `rb1p03tmw` | `@layer utilities` | `user-select: none;` |
| `rb1qgpuj6` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb1r22hii` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1rg9r9` | `@layer utilities` | `width: calc(var(--spacing)*60);` |
| `rb1rz6p97` | `@layer utilities` | `padding-block: calc(var(--spacing)*1.5);` |
| `rb1s6bt8r` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1sf1g19` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1snepbo` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1suxsng` | `@layer utilities` | `background-color: rgba(10, 10, 10, 0.6);` |
| `rb1td3jvu` | `@layer utilities` | `display: inline-flex;` |
| `rb1uiiua5` | `@layer utilities` | `margin: 1px;` |
| `rb1vjth1v` | `@layer utilities` | `position: relative;` |
| `rb1vo0bmv` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1vzjfse` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1xaooea` | `@layer utilities` | `translate: var(--tw-translate-x)var(--tw-translate-y);` |
| `rb1xauoy8` | `@layer utilities` | `overflow: hidden;` |
| `rb1xl7tkj` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb3hs50j` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb4av1yo` | `@layer utilities` | `z-index: 60;` |
| `rb4y7bk4` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb5779x` | `@layer utilities` | `background-color: oklch(0.29 0.06 26);` |
| `rb5cr92s` | `@layer utilities` | `height: 1px;` |
| `rb5ngtbn` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb5ppa4g` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb5qf6ub` | `@layer utilities` | `flex-shrink: 0;` |
| `rb5wq3no` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.25);` |
| `rb63ljxq` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb6fc443` | `@layer utilities` | `overflow-x: hidden;` |
| `rb6m25vy` | `@layer utilities` | `white-space: nowrap;` |
| `rb6rislb` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb6w8lzj` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*4);` |
| `rb79kswu` | `@layer utilities` | `z-index: 40;` |
| `rb7mpz96` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb8xlkkn` | `@layer utilities` | `z-index: 50;` |
| `rba1ycfk` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rba51pay` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rbanrw00` | `@layer utilities` | `top: calc(50% + 28px);` |
| `rbaubc1` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
