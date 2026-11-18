# notifications-5

> **Category:** Notifications (`notifications`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/notifications/notifications-5](https://pro.reactbits.dev/docs/app-ui/notifications/notifications-5)  
> **Native Viewport:** `1280px × 620px`

Inline banners for every status

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`notifications-5.jsx`](./notifications-5.jsx) (minHeight: `620px`, hooks: `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`notifications-5.sorbet.jsx`](./notifications-5.sorbet.jsx) (minHeight: `700px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 99 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 153 |
| **Buttons** | 13 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 12 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `System messages`
- `Restore all`
- `Read the notice`
- `Update card`
- `Remind me later`
- `Show details`
- `Retry failed`
- `View DNS`
- `Increase limit`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 151)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10eklq` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb10j30y1` | `@layer utilities` | `align-items: flex-start;` |
| `rb1111yea` | `@layer utilities` | `transition-property: transform, translate, scale, rotate; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function` |
| `rb1123r0f` | `@layer utilities` | `background-color: oklch(0.8 0.152 68);` |
| `rb116mkm9` | `@layer utilities` | `cursor: progress;` |
| `rb11pudir` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb120j430` | `@layer utilities` | `overflow-y: auto;` |
| `rb12f9879` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb12p8tw8` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb13z9eyu` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb14a23fd` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb14d6g22` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb14mzefw` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb14tj0kp` | `@layer utilities` | `row-gap: calc(var(--spacing)*2);` |
| `rb156yltu` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb15k1f4u` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb15peaas` | `@layer utilities` | `flex-direction: column;` |
| `rb15qt5ga` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb15yi0t6` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb16xbg8s` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb177uqr0` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb17d862w` | `@layer utilities` | `margin-top: calc(var(--spacing)*-1);` |
| `rb17ekzpl` | `@layer utilities` | `text-underline-offset: 4px;` |
| `rb17iyry9` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb17leqgz` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb18zcqxu` | `@layer utilities` | `padding-block: calc(var(--spacing)*4);` |
| `rb19ekggu` | `@layer utilities` | `max-width: 68ch;` |
| `rb19gek42` | `@layer utilities` | `pointer-events: none;` |
| `rb19lfpua` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb19pe2pm` | `@layer utilities` | `height: 100%;` |
| `rb19zoq2j` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.07);` |
| `rb1a1ui1c` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1a2wxe3` | `@layer utilities` | `text-align: left;` |
| `rb1a39gh1` | `@layer utilities` | `position: absolute;` |
| `rb1b9wq2d` | `@layer utilities` | `overflow: hidden;` |
| `rb1bcbk2n` | `@layer utilities` | `display: flex;` |
| `rb1cnuhfp` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1cx6r7` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1dlmxpl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1eawcca` | `@layer utilities` | `rotate: 90deg;` |
| `rb1ekcwe9` | `@layer utilities` | `color: oklch(0.49 0.1 68);` |
| `rb1feh47q` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1ffrf6d` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1fjdpws` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1g2mzvk` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1h781nm` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1hcyexh` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1hdx20k` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1hic4hb` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1j04tum` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb1j0n6r6` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1ja4fjl` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1jawbo3` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1jk418k` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1ju3mxj` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1jupyqv` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jznyw9` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1othgk5` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1q1xbdv` | `@layer utilities` | `opacity: 1;` |
| `rb1qaylye` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1qnhutj` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1qsze9a` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1rjcdn6` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1rnj984` | `@layer utilities` | `max-width: 320px;` |
| `rb1vnb747` | `@layer utilities` | `white-space: nowrap;` |
| `rb1w5o6v8` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1w5ydua` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1xbnz0p` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb1xj493p` | `@layer utilities` | `background-color: oklch(0.8 0.152 68);` |
| `rb2fbg7b` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb2pb1wa` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb2zanl9` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb302fct` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb48vkrs` | `@layer utilities` | `column-gap: calc(var(--spacing)*4);` |
| `rb4twv3w` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb51jtg8` | `@layer utilities` | `opacity: 0;` |
| `rb5wbw0i` | `@layer utilities` | `justify-content: center;` |
| `rb5x95xd` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
