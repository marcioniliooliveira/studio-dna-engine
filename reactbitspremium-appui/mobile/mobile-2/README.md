# mobile-2

> **Category:** Mobile (`mobile`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/mobile/mobile-2](https://pro.reactbits.dev/docs/app-ui/mobile/mobile-2)  
> **Native Viewport:** `1280px × 680px`

Action button that fans out actions

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`mobile-2.jsx`](./mobile-2.jsx) (minHeight: `680px`, hooks: `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`mobile-2.sorbet.jsx`](./mobile-2.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 87 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 129 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 9 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Send the Northwind renewal quote Due today`
- `Review Cedar Labs onboarding notes Due today`
- `Approve the refund for order 4192 Tomorrow`
- `Draft the Q3 pipeline summary Thursday`
- `Call Harbor Coffee about seat count Friday`
- `Close out the Meridian pilot checklist Friday`
- `Update the Q3 forecast assumptions Next week`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 127)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb100uwkn` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb1012wcf` | `@layer utilities` | `opacity: 0.4;` |
| `rb101iuv0` | `@layer utilities` | `max-width: 390px;` |
| `rb10tld6l` | `@layer utilities` | `align-items: center;` |
| `rb11sl374` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb12oer3j` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.5);` |
| `rb12oowm2` | `@layer utilities` | `min-height: 56px;` |
| `rb12t2yrt` | `@layer utilities` | `scale: 0.98;` |
| `rb137jr96` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb13qhkn4` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb143y97l` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb14d2hq1` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb14vwr1n` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb15cxqy1` | `@layer utilities` | `align-items: flex-end;` |
| `rb15jfjww` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb15ldcx9` | `@layer utilities` | `outline-offset: 2px;` |
| `rb15r1e1o` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb177b27l` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb17b5cp1` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb17e80ww` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb17f2llp` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.4);` |
| `rb1a25m5f` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1alwkuq` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1as2shi` | `@layer utilities` | `text-align: left;` |
| `rb1azdcgt` | `@layer utilities` | `border-radius: 28px;` |
| `rb1buec4` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1cf7it1` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1d1op06` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1db3d7t` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1dknmq5` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1fjxrkw` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1fuu45t` | `@layer utilities` | `cursor: pointer;` |
| `rb1gn9r4m` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 5px;` |
| `rb1i7hd50` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb1iribep` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1j3i474` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jksbjr` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1jr2gaj` | `@layer utilities` | `max-width: 100%;` |
| `rb1lbh8il` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1lbl0vw` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1ljp486` | `@layer utilities` | `bottom: calc(var(--spacing)*5);` |
| `rb1lz44a2` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*28);` |
| `rb1m3y863` | `@layer utilities` | `align-items: baseline;` |
| `rb1nyxy2t` | `@layer utilities` | `overflow-y: auto;` |
| `rb1o2srse` | `@layer utilities › @media (hover: hover)` | `border-color: var(--color-neutral-100);` |
| `rb1pz109a` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1pzlrvw` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1qud80c` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1raapv8` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1rd6r0l` | `@layer utilities` | `right: calc(var(--spacing)*5);` |
| `rb1rj3jg5` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1sakxt6` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1se422i` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1t2clkp` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1thgshu` | `@layer utilities` | `z-index: 40;` |
| `rb1ubwnek` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1v9uc5r` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb1vup772` | `@layer utilities › @media (hover: hover)` | `border-color: var(--color-neutral-900);` |
| `rb1w5v0a0` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1wqixo0` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1wwqlr8` | `@layer utilities › @media (hover: hover)` | `opacity: 1;` |
| `rb1y4rxv3` | `@layer utilities` | `position: relative;` |
| `rb1yc2knk` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1ygexe` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1yqpsqc` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1z00wls` | `@layer utilities` | `cursor: progress;` |
| `rb2a6stx` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb2q6bi` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb5lx0ql` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb5rj8tm` | `@layer utilities` | `white-space: nowrap;` |
| `rb602nv2` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb6f1sc8` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb6g7yqh` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb6pcc2l` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb6s6l0k` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb6tumjx` | `@layer utilities` | `height: 100%;` |
| `rb6wkv4r` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb6x9xh9` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
