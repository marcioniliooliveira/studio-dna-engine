# app-dialog-1

> **Category:** App Dialog (`app-dialog`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/app-dialog/app-dialog-1](https://pro.reactbits.dev/docs/app-ui/app-dialog/app-dialog-1)  
> **Native Viewport:** `1280px × 560px`

Standard dialog with a footer

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`app-dialog-1.jsx`](./app-dialog-1.jsx) (minHeight: `560px`, hooks: `disconnect`, `focus`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`app-dialog-1.sorbet.jsx`](./app-dialog-1.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 57 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 167 |
| **Buttons** | 4 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 1 / 0 |
| **SVGs / Canvases** | 1 / 0 |
| **ARIA Roles** | `dialog` |

### Visible Headings & Interactive Labels
- `Change plan`
- `Apply plan change`
- `Cancel`
- `Apply change`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 164)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1039ooh` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb108w38z` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb10vwoj8` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb11p3hx7` | `@layer utilities` | `overflow-wrap: anywhere;` |
| `rb12iw823` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb12vncy8` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb13dm3t1` | `@layer utilities` | `text-decoration-line: line-through;` |
| `rb13reitd` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb13z0tnn` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb14qp0g3` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb15ci1q9` | `@layer utilities` | `height: 100%;` |
| `rb15cyu4i` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb15myfth` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb15wq189` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb178tctp` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb17ap387` | `@layer utilities` | `max-width: var(--container-md);` |
| `rb18baory` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb18laagx` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb18sud1u` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb19hjnfu` | `@layer utilities` | `--tw-shadow: 0 12px 24px -12px var(--tw-shadow-color,#0009); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-of` |
| `rb19pinl5` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1axvfwx` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1bpmd5p` | `@layer utilities` | `scale: 0.98;` |
| `rb1crotrp` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1cystd6` | `@layer utilities › @media (min-width: 40rem)` | `max-width: var(--container-sm);` |
| `rb1driszp` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1e2l8j5` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1ebpjza` | `@layer utilities` | `--tw-shadow: 0 12px 24px -12px var(--tw-shadow-color,#0003);` |
| `rb1eowks8` | `@layer utilities` | `max-height: 100%;` |
| `rb1eydfwd` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1f2ki1l` | `@layer utilities` | `align-items: center;` |
| `rb1f9kvjr` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1gq4l7` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1gusqpz` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1h5mppe` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1hery3x` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1i09l13` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1ieounh` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1igfyn5` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1io1cuc` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1is9r81` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1j37c4p` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*14);` |
| `rb1jah8mk` | `@layer utilities` | `max-height: calc(100% - 4rem);` |
| `rb1jaytu7` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1jkedf1` | `@layer utilities` | `bottom: calc(var(--spacing)*4);` |
| `rb1jkjlwy` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb1jpxy2w` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1kkniou` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1komgn4` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1lgdwjd` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1ljit1z` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1lrdpi0` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1m3huko` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1n1dckq` | `@layer utilities › @media (min-width: 40rem)` | `left: auto;` |
| `rb1n7hl5l` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1oj9m2d` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1oy3uql` | `@layer utilities › @media (min-width: 40rem)` | `flex-direction: row;` |
| `rb1p03tmw` | `@layer utilities` | `user-select: none;` |
| `rb1qgpuj6` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb1r22hii` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1rbzgn4` | `@layer utilities` | `justify-content: space-between;` |
| `rb1spgan5` | `@layer utilities` | `inset-inline-end: calc(var(--spacing)*4);` |
| `rb1suxsng` | `@layer utilities` | `background-color: rgba(10, 10, 10, 0.6);` |
| `rb1td3jvu` | `@layer utilities` | `display: inline-flex;` |
| `rb1tt7gwm` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1vjth1v` | `@layer utilities` | `position: relative;` |
| `rb1vo0bmv` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1vzjfse` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1w1dpk8` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1xauoy8` | `@layer utilities` | `overflow: hidden;` |
| `rb1xl7tkj` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1yjaloo` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb3g089o` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb4av1yo` | `@layer utilities` | `z-index: 60;` |
| `rb5m4jrw` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb5ppa4g` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb5qf6ub` | `@layer utilities` | `flex-shrink: 0;` |
| `rb5wq3no` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.25);` |
