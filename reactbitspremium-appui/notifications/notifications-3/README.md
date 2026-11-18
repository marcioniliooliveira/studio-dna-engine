# notifications-3

> **Category:** Notifications (`notifications`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/notifications/notifications-3](https://pro.reactbits.dev/docs/app-ui/notifications/notifications-3)  
> **Native Viewport:** `1280px × 680px`

Delivery preferences with quiet hours

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`notifications-3.jsx`](./notifications-3.jsx) (minHeight: `680px`, hooks: `key`, `label`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`notifications-3.sorbet.jsx`](./notifications-3.sorbet.jsx) (minHeight: `840px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 173 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 188 |
| **Buttons** | 40 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | `switch` |

### Visible Headings & Interactive Labels
- `Notification preferences`
- `None`
- `All`
- `Mon`
- `Tue`
- `Wed`
- `Thu`
- `Fri`
- `Sat`
- `Sun`
- `Reset`
- `Save preferences`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 183)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10eklq` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb116mkm9` | `@layer utilities` | `cursor: progress;` |
| `rb11dfqg` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb11dlov4` | `@layer utilities` | `grid-template-columns: 1fr repeat(3, 48px);` |
| `rb11lr57q` | `@layer utilities` | `transition-property: translate, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); tran` |
| `rb11pudir` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb11x3x51` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb120j430` | `@layer utilities` | `overflow-y: auto;` |
| `rb12f9879` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb12p8tw8` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb12z8fl7` | `@layer utilities` | `height: calc(var(--spacing)*6);` |
| `rb13981a6` | `@layer utilities` | `height: calc(var(--spacing)*5);` |
| `rb13n4c8n` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb13z9eyu` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb14a23fd` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb14hx1vf` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb14mzefw` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb155hye8` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.4);` |
| `rb156yltu` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb15e2xrh` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb15k1f4u` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb15ow51` | `@layer utilities` | `padding-top: calc(var(--spacing)*4);` |
| `rb15peaas` | `@layer utilities` | `flex-direction: column;` |
| `rb16dxvga` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb177uqr0` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb17iyry9` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb17leqgz` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb17t3ov1` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb18pxsui` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2.5);` |
| `rb18ycoq4` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb18zcqxu` | `@layer utilities` | `padding-block: calc(var(--spacing)*4);` |
| `rb19136ui` | `@layer utilities` | `transition-property: background-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-` |
| `rb1960rbh` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.16);` |
| `rb19gek42` | `@layer utilities` | `pointer-events: none;` |
| `rb19lfpua` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb19pe2pm` | `@layer utilities` | `height: 100%;` |
| `rb1a1ui1c` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1a39gh1` | `@layer utilities` | `position: absolute;` |
| `rb1ar0diu` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.8);` |
| `rb1b9wq2d` | `@layer utilities` | `overflow: hidden;` |
| `rb1bcbk2n` | `@layer utilities` | `display: flex;` |
| `rb1bsjsmg` | `@layer utilities` | `z-index: 10;` |
| `rb1c0uuv9` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb1cm2rm1` | `@layer utilities` | `transition-property: background-color, border-color, color, scale, outline-color; transition-timing-function: var(--tw-ease,var(--default-tr` |
| `rb1cnuhfp` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1cszegb` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.4);` |
| `rb1de2uhq` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.4);` |
| `rb1dlmxpl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1e02f6d` | `@layer utilities › @media (min-width: 40rem)` | `padding-right: calc(var(--spacing)*4);` |
| `rb1feh47q` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1ffrf6d` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1g2mzvk` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1h781nm` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1hcyexh` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1hdx20k` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1hic4hb` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1i2itig` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4.5);` |
| `rb1ig5tmn` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb1ihsqjx` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1j04tum` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb1j0n6r6` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1ja4fjl` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1jawbo3` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1jk418k` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1ju3mxj` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1jznyw9` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1k9pw66` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb1km5jst` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1l3h86i` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1lh66zw` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb1neniih` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*2);` |
| `rb1ntko6l` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1nympwf` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*4);` |
| `rb1othgk5` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1pbii2d` | `@layer utilities › @media (hover: hover)` | `--tw-inset-ring-color: var(--color-neutral-900);` |
| `rb1q13kz4` | `@layer utilities` | `--tw-inset-ring-color: #f5f5f580;` |
| `rb1q1xbdv` | `@layer utilities` | `opacity: 1;` |
| `rb1qaylye` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
