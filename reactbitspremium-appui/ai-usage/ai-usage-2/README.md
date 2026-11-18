# ai-usage-2

> **Category:** AI Usage (`ai-usage`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/ai-usage/ai-usage-2](https://pro.reactbits.dev/docs/app-ui/ai-usage/ai-usage-2)  
> **Native Viewport:** `1280px × 560px`

Spend by model table with share bars

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`ai-usage-2.jsx`](./ai-usage-2.jsx) (minHeight: `560px`, hooks: `useMemo`, `useState`)
- **Sorbet Source:** [`ai-usage-2.sorbet.jsx`](./ai-usage-2.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 176 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 135 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 12 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `presentation` |

### Visible Headings & Interactive Labels
- `Spend by model`
- `Cost`
- `Requests`
- `Tokens`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 132)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb101mflb` | `@layer utilities` | `max-width: 940px;` |
| `rb113qbha` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb11fbco1` | `@layer utilities` | `max-width: 100%;` |
| `rb11npiv8` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb11tkdgo` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb11xp4k7` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb12rfuor` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb13egh3l` | `@layer utilities` | `display: none;` |
| `rb13gx8nv` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb14oh2ts` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb14rtcce` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb14yajaf` | `@layer utilities` | `justify-content: safe center;` |
| `rb15itxh` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb15k3s1c` | `@layer utilities` | `white-space: nowrap;` |
| `rb15ounx9` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb15ucere` | `@layer utilities` | `user-select: none;` |
| `rb16b2bsa` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb171zyel` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb174e8x2` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb18u6zh0` | `@layer utilities` | `column-gap: calc(var(--spacing)*1);` |
| `rb19e66uy` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb19lvzf4` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb19slky4` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb19yrbag` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb1a9p2x5` | `@layer utilities` | `align-self: center;` |
| `rb1aund2k` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.07);` |
| `rb1b7hxjl` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1bemkgi` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1dc42ez` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1dtpldu` | `@layer utilities` | `overflow: hidden;` |
| `rb1eifgud` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1epzlru` | `@layer utilities` | `min-height: 560px;` |
| `rb1f0v9bp` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1g0cxoo` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1gai43t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1grknl6` | `@layer utilities` | `display: block;` |
| `rb1grm39` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1hctnpx` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1he4es0` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1hwyqzl` | `@layer utilities` | `flex-direction: column;` |
| `rb1hx0f2w` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb1hyj4cs` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1i0w0jw` | `@layer utilities` | `margin-inline: auto;` |
| `rb1ihut5k` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1il8eok` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1jz4icu` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1k522wr` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1k6zod2` | `@layer utilities` | `background-color: currentcolor;` |
| `rb1kwj64q` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1l5uoth` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1l93024` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.07);` |
| `rb1lt27g2` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1mi1i7q` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1n5rbb7` | `@layer utilities` | `justify-content: center;` |
| `rb1ngw3t4` | `@layer utilities` | `width: fit-content;` |
| `rb1ob6pj0` | `@layer utilities › @media (min-width: 40rem)` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1ohq3ez` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb1ombiup` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb1p393s8` | `@layer utilities › @media (min-width: 40rem)` | `row-gap: calc(var(--spacing)*0);` |
| `rb1s2sfvq` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1shrgyw` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1sp2cg7` | `@layer utilities` | `cursor: pointer;` |
| `rb1syssxt` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb1t2kj7d` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1tzs47s` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1u4n42u` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb1ulfnyb` | `@layer utilities › @media (min-width: 40rem)` | `align-items: center;` |
| `rb1uqar10` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1vgvapw` | `@layer utilities` | `position: absolute;` |
| `rb1w2wznv` | `@layer utilities › @media (min-width: 40rem)` | `column-gap: calc(var(--spacing)*4);` |
| `rb1x56gm6` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1xktpji` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1yal72r` | `@layer utilities` | `align-items: center;` |
| `rb1ybjsph` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb23i9pf` | `@layer utilities › @media (min-width: 40rem)` | `grid-template-columns: minmax(0px, 1.6fr) repeat(3, minmax(0px, 0.8fr)) 72px minmax(0px, 0.8fr) 56px;` |
| `rb281ha3` | `@layer utilities` | `overflow-y: auto;` |
| `rb2a136j` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb2qulkj` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
