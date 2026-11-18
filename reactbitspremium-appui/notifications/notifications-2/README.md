# notifications-2

> **Category:** Notifications (`notifications`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/notifications/notifications-2](https://pro.reactbits.dev/docs/app-ui/notifications/notifications-2)  
> **Native Viewport:** `1280px × 620px`

Toast stack that expands on hover

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`notifications-2.jsx`](./notifications-2.jsx) (minHeight: `620px`, hooks: `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`notifications-2.sorbet.jsx`](./notifications-2.sorbet.jsx) (minHeight: `620px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 32 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 101 |
| **Buttons** | 5 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Toast notifications`
- `Success`
- `Error`
- `Info`
- `Progress`
- `Clear all`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 101)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb116mkm9` | `@layer utilities` | `cursor: progress;` |
| `rb11dfqg` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb11pudir` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb11x3x51` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb12f9879` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb12p8tw8` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb14a23fd` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb14mzefw` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1543c2i` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb156yltu` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb15k1f4u` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb15peaas` | `@layer utilities` | `flex-direction: column;` |
| `rb177uqr0` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1784lc7` | `@layer utilities` | `max-width: 420px;` |
| `rb17bf4s0` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb17leqgz` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb19gek42` | `@layer utilities` | `pointer-events: none;` |
| `rb19pe2pm` | `@layer utilities` | `height: 100%;` |
| `rb1a1ui1c` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1a39gh1` | `@layer utilities` | `position: absolute;` |
| `rb1b9wq2d` | `@layer utilities` | `overflow: hidden;` |
| `rb1bcbk2n` | `@layer utilities` | `display: flex;` |
| `rb1c0uuv9` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb1cnuhfp` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1dlmxpl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1feh47q` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1ffrf6d` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1g2mzvk` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1h781nm` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1hcyexh` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1hdx20k` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1hic4hb` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1hvmpe0` | `@layer utilities` | `right: calc(var(--spacing)*5);` |
| `rb1j0n6r6` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1ja4fjl` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1jawbo3` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1jk418k` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1jznyw9` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1m5xefu` | `@layer utilities` | `margin-inline-end: auto;` |
| `rb1qaylye` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1qnhutj` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1qsze9a` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1rjcdn6` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1vnb747` | `@layer utilities` | `white-space: nowrap;` |
| `rb1w5ydua` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1zpzke` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb2bpybh` | `@layer utilities` | `bottom: calc(var(--spacing)*5);` |
| `rb2fbg7b` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb3ctrb7` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb5wbw0i` | `@layer utilities` | `justify-content: center;` |
| `rb6eouf6` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb6uxn47` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb6z6nvm` | `@layer utilities` | `min-height: 620px;` |
| `rb7v498x` | `@layer utilities` | `user-select: none;` |
| `rb8k7qys` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb8mbs94` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb9uak54` | `@layer utilities` | `position: relative;` |
| `rba6vt6b` | `@layer utilities` | `left: calc(var(--spacing)*5);` |
| `rbazk9cb` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rbc707mk` | `@layer utilities` | `flex-shrink: 0;` |
| `rbcp799a` | `@layer utilities` | `align-items: center;` |
| `rbcprgbr` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rbdhva51` | `@layer utilities` | `cursor: not-allowed;` |
| `rbf1n41b` | `@layer utilities` | `display: inline-flex;` |
| `rbfd9a74` | `@layer utilities` | `display: grid;` |
| `rbg6k79j` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rbgm7vua` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rbh5orz4` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rbhijydk` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rbis7bpb` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rbivff5p` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rbjzaf2e` | `@layer utilities` | `padding: calc(var(--spacing)*5);` |
| `rbkatap7` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rbkjg9bl` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rbm55rdl` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rbnaslfo` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rbnjciqh` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rbnldgwt` | `@layer utilities` | `width: 100%;` |
