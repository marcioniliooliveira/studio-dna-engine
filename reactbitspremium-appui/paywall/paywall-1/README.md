# paywall-1

> **Category:** Paywall (`paywall`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/paywall/paywall-1](https://pro.reactbits.dev/docs/app-ui/paywall/paywall-1)  
> **Native Viewport:** `1280px × 640px`

Article lock with a membership card

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`paywall-1.jsx`](./paywall-1.jsx) (minHeight: `640px`, hooks: none)
- **Sorbet Source:** [`paywall-1.sorbet.jsx`](./paywall-1.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 35 |
| **Max DOM Depth** | 7 |
| **Atomic/Scoped Classes** | 121 |
| **Buttons** | 2 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `What a database migration actually costs`
- `Keep reading with a membership`
- `Become a member: $9/mo`
- `I already have an account`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 119)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10bjkkq` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb12jihi1` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb12suhn` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb13n7rzs` | `@layer utilities › @media (min-width: 40rem)` | `flex-direction: row;` |
| `rb1527z8m` | `@layer utilities` | `column-gap: calc(var(--spacing)*2);` |
| `rb1579vnh` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb15beifr` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb15o155o` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb16ofp4h` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb170llah` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb17gsd8o` | `@layer utilities` | `flex-shrink: 0;` |
| `rb17oyg03` | `@layer utilities` | `display: flex;` |
| `rb17v1fyq` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb18fpuag` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb18xhdhm` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb18zp1oe` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1a64l79` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1a7eew0` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1b2qdkw` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1c0nw9w` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1czmqbj` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1deojex` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1dlj2bg` | `@layer utilities` | `position: relative;` |
| `rb1dwp9fr` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1ec6u8` | `@layer utilities` | `flex-direction: column;` |
| `rb1ek30d4` | `@layer utilities` | `scale: 0.98;` |
| `rb1f2k7ol` | `@layer utilities` | `display: block;` |
| `rb1f70fq` | `@layer utilities` | `opacity: 0.4;` |
| `rb1fssyfj` | `@layer utilities` | `max-height: 92px;` |
| `rb1go8xez` | `@layer utilities` | `white-space: nowrap;` |
| `rb1h71rs6` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1hmy72s` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1hv4lg7` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1hy9r0s` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1hz4xid` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1j8wnsv` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1k43rf5` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1khdf8e` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb1lhu9fw` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1liwt91` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb1luz0f2` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1ngyf5r` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1obojkv` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1odjn6f` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb1oxiukd` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1qv8al9` | `@layer utilities` | `user-select: none;` |
| `rb1ro9wz8` | `@layer utilities › @media (min-width: 40rem)` | `align-items: center;` |
| `rb1s8own6` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1txp3lc` | `@layer utilities` | `overflow-y: auto;` |
| `rb1u5n6u2` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1wirsho` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1wyyuth` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1x3z2yd` | `@layer utilities` | `cursor: progress;` |
| `rb1x73w72` | `@layer utilities` | `justify-content: center;` |
| `rb2eo2w3` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb2uphlu` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb2zny4g` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb3rv5ji` | `@layer utilities` | `outline-offset: 2px;` |
| `rb54m4ci` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb56a0bv` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb5q97pt` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb608tes` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb6lvrhf` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb7cqvea` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb7raho6` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb8c0dqm` | `@layer utilities › @media (min-width: 40rem)` | `margin-top: calc(var(--spacing)*4);` |
| `rb8dwg1q` | `@layer utilities` | `pointer-events: none;` |
| `rb8lzzfl` | `@layer utilities › @media (min-width: 40rem)` | `margin-top: calc(var(--spacing)*5);` |
| `rb8qk9ii` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb8t9hla` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb91t49a` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb920jn2` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb9ttoqn` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb9ya8j3` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rba0eyos` | `@layer utilities` | `min-height: 640px;` |
| `rbaa9jm1` | `@layer utilities` | `width: 100%;` |
| `rbb0mbo7` | `@layer utilities` | `font-size: 24px; line-height: 28px;` |
| `rbbswesh` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
