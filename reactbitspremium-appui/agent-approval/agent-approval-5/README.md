# agent-approval-5

> **Category:** Agent Approval (`agent-approval`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/agent-approval/agent-approval-5](https://pro.reactbits.dev/docs/app-ui/agent-approval/agent-approval-5)  
> **Native Viewport:** `1280px × 560px`

Approval banner with a cost estimate

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`agent-approval-5.jsx`](./agent-approval-5.jsx) (minHeight: `560px`, hooks: `useEffect`, `useState`)
- **Sorbet Source:** [`agent-approval-5.sorbet.jsx`](./agent-approval-5.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 35 |
| **Max DOM Depth** | 7 |
| **Atomic/Scoped Classes** | 145 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 1 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Run the Q4 demand forecast: about 40 minutes and up to $18 in model usage`
- `Show request`
- `Reject`
- `Approve`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 144)

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
| `rb167wgcw` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb17hb5ku` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb17o75ya` | `@layer utilities` | `height: 100%;` |
| `rb17z5m3u` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb183kgqv` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb186pnx0` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb18urlmy` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1953m48` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb1968ir9` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1augodu` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1axsnvx` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1b3hka0` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1b9h5nh` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1bklw9k` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1c85mop` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1ci58do` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1cpix6i` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1cs4u2n` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1d4xxk5` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1dof5ug` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1e2ys9y` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1g2vvdl` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1g90cmw` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1gq1l8u` | `@layer utilities › @media (min-width: 40rem)` | `align-items: baseline;` |
| `rb1gu0gdb` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1h6416o` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1i7onfc` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*1);` |
| `rb1ipkz0b` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1j0dwua` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb1j2hycp` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1jsjbfu` | `@layer utilities` | `justify-content: center;` |
| `rb1k5c7dp` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb1kcjvja` | `@layer utilities` | `align-items: center;` |
| `rb1ksv1e7` | `@layer utilities` | `white-space: nowrap;` |
| `rb1lrx2d5` | `@layer utilities` | `user-select: none;` |
| `rb1lyx9ag` | `@layer utilities` | `padding-top: calc(var(--spacing)*3);` |
| `rb1m620s0` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1mg90i2` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1miwgoe` | `@layer utilities` | `padding-top: calc(var(--spacing)*1);` |
| `rb1n487ox` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1nq6lfq` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1oq1pcj` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1oxb2n8` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb1psb52e` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1q03y44` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1qet06z` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1rdfvd6` | `@layer utilities` | `cursor: pointer;` |
| `rb1s6xi95` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1s9hlr2` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1sqycip` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1t1psn` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1tk93c9` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1ts9e4` | `@layer utilities` | `scale: 0.98;` |
| `rb1tv3zup` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb1um662p` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1usvqp8` | `@layer utilities` | `max-width: var(--container-lg);` |
| `rb1v94rws` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1vcijki` | `@layer utilities › @media (min-width: 40rem)` | `display: grid;` |
| `rb1vecvsv` | `@layer utilities › @media (min-width: 40rem)` | `min-width: calc(var(--spacing)*0);` |
| `rb1w4gg83` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.07);` |
| `rb1wnopuh` | `@layer utilities` | `justify-content: space-between;` |
| `rb1x5zgnz` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb2dil4x` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb3lfvpn` | `@layer utilities` | `margin-left: auto;` |
| `rb4hhoy5` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb5tuhql` | `@layer utilities` | `position: absolute;` |
| `rb6h436m` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb8af5z` | `@layer utilities` | `display: inline-flex;` |
| `rb8rtl4z` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rbaaha9` | `@layer utilities` | `justify-content: flex-end;` |
