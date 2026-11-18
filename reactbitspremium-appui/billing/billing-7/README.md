# billing-7

> **Category:** Billing (`billing`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/billing/billing-7](https://pro.reactbits.dev/docs/app-ui/billing/billing-7)  
> **Native Viewport:** `1280px × 800px`

Usage and overage with allowances

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`billing-7.jsx`](./billing-7.jsx) (minHeight: `800px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`billing-7.sorbet.jsx`](./billing-7.sorbet.jsx) (minHeight: `800px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 111 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 186 |
| **Buttons** | 4 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 5 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `presentation` |

### Visible Headings & Interactive Labels
- `Usage and overages`
- `This cycle`
- `Last cycle`
- `Cycle to date`
- `Metered entitlements`
- `Set an alert`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 177)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb116xg7t` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb117drzt` | `@layer utilities` | `opacity: 0;` |
| `rb1197idm` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb12igm5l` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb145dlxj` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb14eb5za` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb14p0eoe` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1589z27` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb15off9x` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb16d0z6q` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb16wtc7z` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb16xj5em` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb17d1c4c` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb17e4lwy` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-flow: column;` |
| `rb17f3h5` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb18bbzmo` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb18cziv3` | `@layer utilities › @media (min-width: 40rem)` | `align-items: baseline;` |
| `rb18fhfw4` | `@layer utilities › @media (min-width: 40rem)` | `align-items: flex-start;` |
| `rb18lblbn` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb18ytz3s` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb194v3ts` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb19dk4m9` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb19jkab3` | `@layer utilities` | `min-height: 800px;` |
| `rb19ml3fk` | `@layer utilities` | `flex-shrink: 0;` |
| `rb19n3pxl` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1a1modn` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1a2mtq8` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1a9ahx0` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb1akc4at` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb1bmb9fu` | `@layer utilities` | `white-space: nowrap;` |
| `rb1bp8vx0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1brljxp` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1cgle7b` | `@layer utilities` | `background-color: oklch(0.652 0.219 26);` |
| `rb1ckro0n` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1e0do3k` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb1e787v1` | `@layer utilities` | `height: 100%;` |
| `rb1ef042b` | `@layer utilities` | `display: grid;` |
| `rb1ejxkew` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1epo6gh` | `@layer utilities` | `cursor: pointer;` |
| `rb1etxc3v` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1fa9dp9` | `@layer utilities` | `align-items: center;` |
| `rb1fdwjht` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1fopzdv` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1fxjvl1` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1g4xbzy` | `@layer utilities` | `width: calc(var(--spacing)*10);` |
| `rb1gb9khg` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1gcbd7c` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1gkhhvz` | `@layer utilities` | `background-color: oklch(0.652 0.219 26);` |
| `rb1gmaywb` | `@layer utilities` | `column-gap: calc(var(--spacing)*2);` |
| `rb1go21fd` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1gwakla` | `@layer utilities` | `column-gap: calc(var(--spacing)*1);` |
| `rb1h73cf0` | `@layer utilities` | `overflow: hidden;` |
| `rb1h9w10j` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1hdddn8` | `@layer utilities` | `background-color: oklch(0.8 0.152 68);` |
| `rb1hikl8e` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1hkd0nc` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1hvh8t` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb1ia8l25` | `@layer utilities` | `column-gap: calc(var(--spacing)*4);` |
| `rb1iqgz23` | `@layer utilities` | `align-items: baseline;` |
| `rb1j1dkdb` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1j6c9fb` | `@layer utilities` | `pointer-events: none;` |
| `rb1je7w3d` | `@layer utilities` | `color: oklch(0.51 0.18 26);` |
| `rb1jqwg40` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1k2rdlt` | `@layer utilities › @media (min-width: 40rem)` | `flex-direction: row;` |
| `rb1kqh31z` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb1l509zw` | `@layer utilities` | `justify-content: space-between;` |
| `rb1ly2wdh` | `@layer utilities` | `overflow-y: auto;` |
| `rb1lypal9` | `@layer utilities` | `justify-content: center;` |
| `rb1m3ee9n` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1m64wz0` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1m6dwh8` | `@layer utilities` | `user-select: none;` |
| `rb1mlrtl8` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1n2t6he` | `@layer utilities` | `color: oklch(0.8 0.13 68);` |
| `rb1ncd5cq` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1nf6er6` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1o4m9mz` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1o7neml` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1ou8h8b` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
