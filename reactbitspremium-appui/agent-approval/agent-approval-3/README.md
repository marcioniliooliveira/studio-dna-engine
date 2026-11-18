# agent-approval-3

> **Category:** Agent Approval (`agent-approval`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/agent-approval/agent-approval-3](https://pro.reactbits.dev/docs/app-ui/agent-approval/agent-approval-3)  
> **Native Viewport:** `1280px × 640px`

Batch approval queue with risk badges

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`agent-approval-3.jsx`](./agent-approval-3.jsx) (minHeight: `640px`, hooks: `disconnect`, `id`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`agent-approval-3.sorbet.jsx`](./agent-approval-3.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 82 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 162 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 1 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Approvals`
- `Show request`
- `Reject`
- `Approve`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `accordion-flow` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 158)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb11ejkre` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb12956pi` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb12h13pl` | `@layer utilities` | `cursor: progress;` |
| `rb12jcbof` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb12kl551` | `@layer utilities` | `margin-inline: calc(var(--spacing)*-2);` |
| `rb12y3e8v` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb14s65g1` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1677kkn` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb16eodwc` | `@layer utilities` | `text-align: right;` |
| `rb17hb5ku` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb17o75ya` | `@layer utilities` | `height: 100%;` |
| `rb17z5m3u` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb183kgqv` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb186pnx0` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb18urlmy` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1944duu` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1953m48` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb1968ir9` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb19f37t7` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb1abjofj` | `@layer utilities › @media (min-width: 40rem)` | `display: block;` |
| `rb1augodu` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1avnezi` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1axsnvx` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1b3hka0` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1b9h5nh` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1bklw9k` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1by5j1s` | `@layer utilities` | `opacity: 0;` |
| `rb1c85mop` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1ci58do` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1cpix6i` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1cs4u2n` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1d4xxk5` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1dof5ug` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1e2ys9y` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1e3x8cc` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1frh64i` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb1g2vvdl` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1g90cmw` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1gu0gdb` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1h09t81` | `@layer utilities` | `align-items: flex-start;` |
| `rb1h6416o` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1i7onfc` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*1);` |
| `rb1ipkz0b` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1j0dwua` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb1j2hycp` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1jadij9` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1jm9c6r` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb1jsjbfu` | `@layer utilities` | `justify-content: center;` |
| `rb1kcjvja` | `@layer utilities` | `align-items: center;` |
| `rb1ksv1e7` | `@layer utilities` | `white-space: nowrap;` |
| `rb1lrx2d5` | `@layer utilities` | `user-select: none;` |
| `rb1lyx9ag` | `@layer utilities` | `padding-top: calc(var(--spacing)*3);` |
| `rb1m620s0` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1mg90i2` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1n487ox` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1naxog6` | `@layer utilities` | `overscroll-behavior: contain;` |
| `rb1nq6lfq` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1oebw6u` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1oq1pcj` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1oxb2n8` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb1psb52e` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1q03y44` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1qet06z` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1r4pobs` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1rdfvd6` | `@layer utilities` | `cursor: pointer;` |
| `rb1rxwmna` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1s6xi95` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1s9hlr2` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1sqycip` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1t1psn` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1t8lajq` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1tk93c9` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1tq1u9t` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1ts9e4` | `@layer utilities` | `scale: 0.98;` |
| `rb1tv3zup` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb1um662p` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1v94rws` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1x5zgnz` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
