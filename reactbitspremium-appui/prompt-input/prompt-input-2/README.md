# prompt-input-2

> **Category:** Prompt Input (`prompt-input`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/prompt-input/prompt-input-2](https://pro.reactbits.dev/docs/app-ui/prompt-input/prompt-input-2)  
> **Native Viewport:** `1280px × 400px`

Prompt box with model and tool toggles

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`prompt-input-2.jsx`](./prompt-input-2.jsx) (minHeight: `400px`, hooks: `disconnect`, `observe`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`prompt-input-2.sorbet.jsx`](./prompt-input-2.sorbet.jsx) (minHeight: `400px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 24 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 126 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 0 / 1 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Atlas`
- `Search`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 126)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1044kvm` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb11n4lcq` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb127mkse` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb12egxl1` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1349ccg` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*6);` |
| `rb13adujz` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb13ntik3` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb13op8sq` | `@layer utilities` | `display: inline-flex;` |
| `rb13sr24i` | `@layer utilities` | `margin-inline: auto;` |
| `rb15lzkk1` | `@layer utilities` | `max-width: 9rem;` |
| `rb16zt2hh` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb17oqeg8` | `@layer utilities` | `user-select: none;` |
| `rb17pt1d8` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1867pa4` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb19chnuk` | `@layer utilities` | `display: flex;` |
| `rb1a9sifq` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1aa4dmu` | `@layer utilities` | `width: 100%;` |
| `rb1avab0a` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1axmc5n` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1bxbapr` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1cg1tzo` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1cod9ic` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1d47g7h` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1dg29hp` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1fcxany` | `@layer utilities` | `min-height: calc(var(--spacing)*5);` |
| `rb1fsna4u` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1g0mm14` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1i0wjlk` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1jvo5pa` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1k1reb4` | `@layer utilities` | `overflow: hidden;` |
| `rb1k2hab5` | `@layer utilities` | `padding-block: calc(var(--spacing)*3.5);` |
| `rb1k9p5a6` | `@layer utilities` | `height: calc(var(--spacing)*6);` |
| `rb1knehz1` | `@layer utilities` | `scale: 0.98;` |
| `rb1kpfp37` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1lr36z1` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1m4tra1` | `@layer utilities` | `justify-content: center;` |
| `rb1nqyjt2` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1ntolbp` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1nvmge4` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1o7mres` | `@layer utilities` | `display: block;` |
| `rb1osjpcn` | `@layer utilities` | `gap: calc(var(--spacing)*2.5);` |
| `rb1p4lhr7` | `@layer utilities` | `flex-direction: column;` |
| `rb1r561zl` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1skar0n` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1t1ynsk` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1ue7tue` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb1uizcby` | `@layer utilities` | `white-space: nowrap;` |
| `rb1wsgeh` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1wsn5xy` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2.5);` |
| `rb1y1p574` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1y537fn` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1y62qq1` | `@layer utilities` | `min-width: 4.5rem;` |
| `rb1yxdnh9` | `@layer utilities` | `max-height: calc(var(--spacing)*40);` |
| `rb28zlur` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb2c8351` | `@layer utilities` | `cursor: pointer;` |
| `rb2di0p3` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb2gy5yt` | `@layer utilities` | `padding-top: calc(var(--spacing)*1);` |
| `rb2jvyoh` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb3empjn` | `@layer utilities` | `opacity: 0.4;` |
| `rb3pudic` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb3x4y5u` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb4elp3t` | `@layer utilities` | `outline-offset: 2px;` |
| `rb4p0uka` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb57v9cy` | `@layer utilities` | `field-sizing: content;` |
| `rb5byn2f` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb6w92q3` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb7bu8j6` | `@layer utilities` | `min-height: 52px;` |
| `rb876bkp` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb8thsz2` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb8vaxe` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb8xl466` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb99wuhf` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb9ibxm9` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rbb0rsf8` | `@layer utilities` | `background-color: var(--color-white);` |
| `rbbjuad8` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rbc5urzk` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rbd8bq9d` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rbdhfc9j` | `@layer utilities` | `min-height: 400px;` |
