# paywall-3

> **Category:** Paywall (`paywall`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/paywall/paywall-3](https://pro.reactbits.dev/docs/app-ui/paywall/paywall-3)  
> **Native Viewport:** `1280px × 560px`

Three-plan comparison with a toggle

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`paywall-3.jsx`](./paywall-3.jsx) (minHeight: `560px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`paywall-3.sorbet.jsx`](./paywall-3.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 88 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 178 |
| **Buttons** | 6 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 11 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Choose a plan to continue`
- `Monthly`
- `Yearly`
- `Your current plan`
- `Choose Pro`
- `Choose Scale`
- `Compare every feature`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 171)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb103fuvy` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb10bjkkq` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb10y28wj` | `@layer utilities` | `max-height: 300px;` |
| `rb12awbrn` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb12suhn` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb133yjbh` | `@layer utilities` | `grid-column: 1 / -1;` |
| `rb13n7rzs` | `@layer utilities › @media (min-width: 40rem)` | `flex-direction: row;` |
| `rb13ug8ss` | `@layer utilities › @media (min-width: 40rem)` | `align-self: auto;` |
| `rb14s8djn` | `@layer utilities` | `column-gap: calc(var(--spacing)*1);` |
| `rb1579vnh` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb15ahonm` | `@layer utilities` | `height: calc(var(--spacing)*5);` |
| `rb15beifr` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb15o155o` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb16g4mlj` | `@layer utilities` | `flex-shrink: 0;` |
| `rb16ofp4h` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb170llah` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1789xp1` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb17gsd8o` | `@layer utilities` | `flex-shrink: 0;` |
| `rb17oyg03` | `@layer utilities` | `display: flex;` |
| `rb17v1fyq` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb183qvy3` | `@layer utilities` | `align-self: flex-start;` |
| `rb18fpuag` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb18xhdhm` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb18zp1oe` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb19179n0` | `@layer utilities` | `text-decoration-thickness: 1px;` |
| `rb19qrmzj` | `@layer utilities` | `height: 1lh;` |
| `rb1a64l79` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1a7eew0` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1alhns` | `@layer utilities` | `max-width: 100%;` |
| `rb1b2dc4t` | `@layer utilities` | `min-height: 560px;` |
| `rb1b2qdkw` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1c0nw9w` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1cpn4mk` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1czmqbj` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1d9mc0i` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1deojex` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1dez15y` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1dlj2bg` | `@layer utilities` | `position: relative;` |
| `rb1dwp9fr` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1ec6u8` | `@layer utilities` | `flex-direction: column;` |
| `rb1ek30d4` | `@layer utilities` | `scale: 0.98;` |
| `rb1equ9cd` | `@layer utilities` | `text-underline-offset: 4px;` |
| `rb1evj4un` | `@layer utilities` | `grid-template-columns: repeat(2, minmax(0px, 1fr));` |
| `rb1f70fq` | `@layer utilities` | `opacity: 0.4;` |
| `rb1fh1rx4` | `@layer utilities › @container (min-width: 28rem)` | `grid-row: span 5 / span 5;` |
| `rb1go8xez` | `@layer utilities` | `white-space: nowrap;` |
| `rb1h71rs6` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1hmy72s` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1hv4lg7` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1hy9r0s` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1hz4xid` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1ice690` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1ivu4d` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jsdw36` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-900); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1k43rf5` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1kuab7k` | `@layer utilities` | `max-width: 900px;` |
| `rb1liwt91` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb1luz0f2` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1ngyf5r` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1obojkv` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1odjn6f` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb1ouh91n` | `@layer utilities` | `container-type: inline-size;` |
| `rb1qn9eeu` | `@layer utilities › @container (min-width: 28rem)` | `grid-template-rows: subgrid;` |
| `rb1qv8al9` | `@layer utilities` | `user-select: none;` |
| `rb1qvt6yw` | `@layer utilities` | `align-items: baseline;` |
| `rb1rd8f9r` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1ro9wz8` | `@layer utilities › @media (min-width: 40rem)` | `align-items: center;` |
| `rb1s8own6` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1txp3lc` | `@layer utilities` | `overflow-y: auto;` |
| `rb1u3lxl7` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1u5n6u2` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1wc4ffw` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1wirsho` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1wyyuth` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1x3z2yd` | `@layer utilities` | `cursor: progress;` |
| `rb1x73w72` | `@layer utilities` | `justify-content: center;` |
| `rb1x84nrt` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1ycms89` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-columns: minmax(0px, 1fr);` |
