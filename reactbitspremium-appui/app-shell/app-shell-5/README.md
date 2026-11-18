# app-shell-5

> **Category:** App Shell (`app-shell`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/app-shell/app-shell-5](https://pro.reactbits.dev/docs/app-ui/app-shell/app-shell-5)  
> **Native Viewport:** `1280px × 720px`

Triage frame with list and reading panes

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`app-shell-5.jsx`](./app-shell-5.jsx) (minHeight: `720px`, hooks: `disconnect`, `focus`, `observe`, `ownerDocument`, `querySelectorAll`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`app-shell-5.sorbet.jsx`](./app-shell-5.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 233 |
| **Max DOM Depth** | 13 |
| **Atomic/Scoped Classes** | 241 |
| **Buttons** | 29 |
| **Inputs / Textareas / Selects** | 1 / 0 / 1 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 17 / 0 |
| **ARIA Roles** | `tooltip`, `radiogroup`, `radio`, `listbox`, `presentation`, `option` |

### Visible Headings & Interactive Labels
- `Unread`
- `IR`
- `Inbox`
- `Search conversations`
- `All`
- `Assigned`
- `Escalated`
- `Tomás Ferreira Signed carrier agreement Mon Unread`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 235)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1079y6y` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb10hf7sz` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb11377ge` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb114uaql` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1246nw1` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb12qieak` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb12sgksd` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1413q4b` | `@layer utilities` | `display: inline-flex;` |
| `rb141tmc9` | `@layer utilities` | `cursor: not-allowed;` |
| `rb14g9wli` | `@layer utilities` | `--tw-translate-y: calc(calc(1/2*100%)*-1);` |
| `rb14r1qxm` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb158s7sz` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb15fznj4` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb15qmetl` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb162snzc` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb16cs9ob` | `@layer utilities` | `width: calc(var(--spacing)*9); height: calc(var(--spacing)*9);` |
| `rb16e9dkx` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb16fmhkj` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb16slk42` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb16zaix8` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb16zbhj8` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb172u15r` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1782b5i` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb17bm4kj` | `@layer utilities` | `width: fit-content;` |
| `rb17dq5pw` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb17fhbvk` | `@layer utilities` | `scale: 0.98;` |
| `rb17oq6zx` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb17s0ved` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb18h4267` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb19m6msk` | `@layer utilities` | `--tw-duration: .16s; transition-duration: 0.16s;` |
| `rb19qwc5` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1a4myll` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1anvo2` | `@layer utilities` | `align-items: center;` |
| `rb1b02o4o` | `@layer utilities` | `z-index: 70;` |
| `rb1bjmagv` | `@layer utilities` | `margin-left: auto;` |
| `rb1bmrsro` | `@layer utilities` | `position: relative;` |
| `rb1bvkc2h` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1c8tupd` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb1cesixf` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1co1gog` | `@layer utilities` | `max-width: 100%;` |
| `rb1cq2z8b` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1cud70d` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1cwx5cf` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1d3xa9h` | `@layer utilities` | `transition-property: background-color, color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transiti` |
| `rb1d9arcu` | `@layer utilities` | `cursor: pointer;` |
| `rb1ddx9gk` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1de3m9k` | `@layer utilities` | `display: none;` |
| `rb1dpkigq` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-900); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1dw7hq8` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1e9fuzq` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1ed35yh` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb1ex8l9q` | `@layer utilities` | `margin-left: calc(var(--spacing)*2);` |
| `rb1fi5plr` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1fv9b8k` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1g1o5pt` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb1gc8lp` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1gg3ctj` | `@layer utilities` | `opacity: 1;` |
| `rb1ghlxxt` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1gu5qwt` | `@layer utilities` | `margin-inline: calc(var(--spacing)*3);` |
| `rb1gxm80` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb1h5avxi` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb1haqai3` | `@layer utilities` | `display: flex;` |
| `rb1hh3mz1` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*3);` |
| `rb1hs29rv` | `@layer utilities` | `max-width: calc(var(--spacing)*64);` |
| `rb1hz9p0f` | `@layer utilities` | `margin-top: calc(var(--spacing)*5);` |
| `rb1i99ape` | `@layer utilities` | `margin-top: calc(var(--spacing)*6);` |
| `rb1ilufjk` | `@layer utilities` | `align-items: baseline;` |
| `rb1irsar5` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1iw5ar7` | `@layer utilities` | `white-space: nowrap;` |
| `rb1iwfi8i` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1j6chf9` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1jhhydv` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb1k13wpf` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1l1tfph` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb1l5fkjp` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1lchqm1` | `@layer utilities` | `width: calc(var(--spacing)*14);` |
| `rb1lcmccr` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1m61auk` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
