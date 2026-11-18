# prompt-input-5

> **Category:** Prompt Input (`prompt-input`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/prompt-input/prompt-input-5](https://pro.reactbits.dev/docs/app-ui/prompt-input/prompt-input-5)  
> **Native Viewport:** `1280px × 560px`

Prompt input with file uploads

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`prompt-input-5.jsx`](./prompt-input-5.jsx) (minHeight: `560px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`prompt-input-5.sorbet.jsx`](./prompt-input-5.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 69 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 179 |
| **Buttons** | 7 |
| **Inputs / Textareas / Selects** | 0 / 1 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 10 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Drag files here, or browse`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 176)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1044kvm` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1135dys` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb127mkse` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb12r2we1` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1349ccg` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*6);` |
| `rb13adujz` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb13ntik3` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb13op8sq` | `@layer utilities` | `display: inline-flex;` |
| `rb13sr24i` | `@layer utilities` | `margin-inline: auto;` |
| `rb14djoid` | `@layer utilities` | `color: oklch(0.51 0.18 26);` |
| `rb14srdep` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb14sxpdx` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb15eb70g` | `@layer utilities` | `background-color: oklch(0.29 0.06 26 / 0.4);` |
| `rb16pgfo8` | `@layer utilities` | `min-height: 560px;` |
| `rb17oqeg8` | `@layer utilities` | `user-select: none;` |
| `rb17pt1d8` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1867pa4` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb18stmiy` | `@layer utilities › @media (hover: hover)` | `background-color: oklch(0.29 0.06 26 / 0.6);` |
| `rb194judl` | `@layer utilities › @media (min-width: 40rem)` | `width: calc(var(--spacing)*24);` |
| `rb19chnuk` | `@layer utilities` | `display: flex;` |
| `rb1a9sifq` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1aa4dmu` | `@layer utilities` | `width: 100%;` |
| `rb1adkt46` | `@layer utilities` | `background-color: oklch(0.945 0.027 26 / 0.4);` |
| `rb1adt7rw` | `@layer utilities` | `align-items: flex-start;` |
| `rb1avab0a` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1axmc5n` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1bcwisj` | `@layer utilities` | `z-index: 10;` |
| `rb1bo4j2y` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1boemwi` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1bxbapr` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1cg1tzo` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1cod9ic` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1czwc80` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1d1pcky` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.07);` |
| `rb1d47g7h` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1d4d9xk` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1dg29hp` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1ducgc0` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb1eiyhl1` | `@layer utilities` | `min-height: calc(var(--spacing)*8);` |
| `rb1fcxany` | `@layer utilities` | `min-height: calc(var(--spacing)*5);` |
| `rb1fsna4u` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1fsnj8i` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1g0mm14` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1gz5dl1` | `@layer utilities` | `opacity: 0;` |
| `rb1i0wjlk` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1i8ciqx` | `@layer utilities` | `overflow-y: auto;` |
| `rb1ilrj4c` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1ivr4tb` | `@layer utilities` | `height: calc(var(--spacing)*9);` |
| `rb1jktrky` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.07);` |
| `rb1jnez33` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1jvo5pa` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1k1reb4` | `@layer utilities` | `overflow: hidden;` |
| `rb1k2hab5` | `@layer utilities` | `padding-block: calc(var(--spacing)*3.5);` |
| `rb1kkrnkn` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1knehz1` | `@layer utilities` | `scale: 0.98;` |
| `rb1kpfp37` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1l3nyd3` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb1lr36z1` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1m4tra1` | `@layer utilities` | `justify-content: center;` |
| `rb1nqyjt2` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1nvmge4` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1o7mres` | `@layer utilities` | `display: block;` |
| `rb1osjpcn` | `@layer utilities` | `gap: calc(var(--spacing)*2.5);` |
| `rb1p4lhr7` | `@layer utilities` | `flex-direction: column;` |
| `rb1qpo26x` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1r561zl` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1r5bbmt` | `@layer utilities` | `min-width: 3rem;` |
| `rb1r6c037` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb1ryne8h` | `@layer utilities` | `overscroll-behavior: contain;` |
| `rb1skar0n` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1t1ynsk` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1ue7tue` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb1uizcby` | `@layer utilities` | `white-space: nowrap;` |
| `rb1vra4dr` | `@layer utilities` | `padding: calc(var(--spacing)*1);` |
| `rb1w3quhl` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1y1p574` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1y537fn` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1y9eq6c` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
