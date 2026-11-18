# ai-usage-4

> **Category:** AI Usage (`ai-usage`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/ai-usage/ai-usage-4](https://pro.reactbits.dev/docs/app-ui/ai-usage/ai-usage-4)  
> **Native Viewport:** `1280px × 640px`

Per-seat usage list with spend caps

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`ai-usage-4.jsx`](./ai-usage-4.jsx) (minHeight: `640px`, hooks: `useMemo`, `useState`)
- **Sorbet Source:** [`ai-usage-4.sorbet.jsx`](./ai-usage-4.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 118 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 169 |
| **Buttons** | 4 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 1 / 0 |
| **ARIA Roles** | `tablist`, `tab` |

### Visible Headings & Interactive Labels
- `Usage by member`
- `All teams`
- `Platform`
- `Support`
- `Research`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 166)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10271t3` | `@layer utilities` | `content: var(--tw-content); background-color: var(--color-neutral-100);` |
| `rb11fbco1` | `@layer utilities` | `max-width: 100%;` |
| `rb11mgsfa` | `@layer utilities` | `color-scheme: dark;` |
| `rb11nauga` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb11npiv8` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb11tkdgo` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb11xp4k7` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb12hoby5` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb12rfuor` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb13egh3l` | `@layer utilities` | `display: none;` |
| `rb13gx8nv` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb14fjwa9` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb14oh2ts` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb14rtcce` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb14yajaf` | `@layer utilities` | `justify-content: safe center;` |
| `rb15itxh` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb15k3s1c` | `@layer utilities` | `white-space: nowrap;` |
| `rb15ounx9` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb15ucere` | `@layer utilities` | `user-select: none;` |
| `rb16b2bsa` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb16q2g7j` | `@layer utilities` | `min-height: 640px;` |
| `rb16qhje8` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb16vcqdf` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb171zyel` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb174e8x2` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb18kosuj` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb190ag1g` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*3);` |
| `rb19e66uy` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb19lvzf4` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb19slky4` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb19xx69x` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb19yrbag` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb1aks9r3` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1aund2k` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.07);` |
| `rb1clz8bb` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb1dc42ez` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1ddnvx2` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1de2o6i` | `@layer utilities` | `width: calc(var(--spacing)*16);` |
| `rb1dh2ogm` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1dtpldu` | `@layer utilities` | `overflow: hidden;` |
| `rb1dyougi` | `@layer utilities` | `scrollbar-width: none;` |
| `rb1ebnq9j` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1ei7dyc` | `@layer utilities` | `width: calc(var(--spacing)*32);` |
| `rb1fqiwpv` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1g0cxoo` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1gai43t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1grknl6` | `@layer utilities` | `display: block;` |
| `rb1he4es0` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1hwyqzl` | `@layer utilities` | `flex-direction: column;` |
| `rb1hx0f2w` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb1i0w0jw` | `@layer utilities` | `margin-inline: auto;` |
| `rb1i17is` | `@layer utilities` | `min-height: 320px;` |
| `rb1ig20yx` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1ihut5k` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1iob0w6` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1j0ytus` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb1j8uxd7` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1juxmxp` | `@layer utilities` | `padding: calc(var(--spacing)*1);` |
| `rb1jz4icu` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1l5uoth` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1l93024` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.07);` |
| `rb1mi1i7q` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1mxskfa` | `@layer utilities` | `background-color: oklch(0.8 0.152 68);` |
| `rb1n5rbb7` | `@layer utilities` | `justify-content: center;` |
| `rb1nqrkt9` | `@layer utilities` | `cursor: text;` |
| `rb1nqtmb8` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1ombiup` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb1r5cral` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1s0mds9` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1s2sfvq` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1sh3zof` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1shrgyw` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1sp2cg7` | `@layer utilities` | `cursor: pointer;` |
| `rb1syssxt` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb1t1qb35` | `@layer utilities` | `content: var(--tw-content); background-color: rgba(0, 0, 0, 0);` |
| `rb1tzs47s` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1u4n42u` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb1uk7lhc` | `@layer utilities` | `transition-property: color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
