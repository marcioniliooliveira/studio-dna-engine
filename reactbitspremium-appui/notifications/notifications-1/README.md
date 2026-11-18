# notifications-1

> **Category:** Notifications (`notifications`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/notifications/notifications-1](https://pro.reactbits.dev/docs/app-ui/notifications/notifications-1)  
> **Native Viewport:** `1280px × 680px`

Notification center grouped by day

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`notifications-1.jsx`](./notifications-1.jsx) (minHeight: `680px`, hooks: `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`notifications-1.sorbet.jsx`](./notifications-1.sorbet.jsx) (minHeight: `760px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 202 |
| **Max DOM Depth** | 13 |
| **Atomic/Scoped Classes** | 164 |
| **Buttons** | 20 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 25 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Notifications`
- `Mark all read`
- `All 8`
- `Unread 4`
- `Mentions 2`
- `Today`
- `Yesterday`
- `Earlier`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 161)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10eklq` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb116mkm9` | `@layer utilities` | `cursor: progress;` |
| `rb11pudir` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb120j430` | `@layer utilities` | `overflow-y: auto;` |
| `rb1249qyj` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb12f9879` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb13981a6` | `@layer utilities` | `height: calc(var(--spacing)*5);` |
| `rb13z9eyu` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb13zk7hs` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb14a23fd` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb14ix44o` | `@layer utilities` | `align-items: stretch;` |
| `rb14mzefw` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb15e2xrh` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb15k1f4u` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb15ow51` | `@layer utilities` | `padding-top: calc(var(--spacing)*4);` |
| `rb15peaas` | `@layer utilities` | `flex-direction: column;` |
| `rb15yi0t6` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb16ozhpo` | `@layer utilities` | `justify-content: flex-end;` |
| `rb16xbg8s` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb177uqr0` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb17bf4s0` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb17iyry9` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb186lvfs` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb18zcqxu` | `@layer utilities` | `padding-block: calc(var(--spacing)*4);` |
| `rb19fpiol` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb19gek42` | `@layer utilities` | `pointer-events: none;` |
| `rb19lfpua` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb19pe2pm` | `@layer utilities` | `height: 100%;` |
| `rb1a1ui1c` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1a2wxe3` | `@layer utilities` | `text-align: left;` |
| `rb1a39gh1` | `@layer utilities` | `position: absolute;` |
| `rb1ajnxgh` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1b9wq2d` | `@layer utilities` | `overflow: hidden;` |
| `rb1bcbk2n` | `@layer utilities` | `display: flex;` |
| `rb1cnuhfp` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1cx6r7` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1dlmxpl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1feh47q` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1ffrf6d` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1fjdpws` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1g2mzvk` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1hcyexh` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1hdx20k` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1hic4hb` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1j04tum` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb1j0n6r6` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1ja4fjl` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1jawbo3` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1jk418k` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1jupyqv` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jznyw9` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1kzosnd` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1lh66zw` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb1neniih` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*2);` |
| `rb1othgk5` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1pv11za` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1q1xbdv` | `@layer utilities` | `opacity: 1;` |
| `rb1qaylye` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1qnhutj` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1qsze9a` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1r24zs9` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1rjcdn6` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1s8qq2m` | `@layer utilities › @media (hover: hover)` | `opacity: 1;` |
| `rb1sjttgu` | `@layer utilities` | `gap: calc(var(--spacing)*2.5);` |
| `rb1skt0f0` | `@layer utilities` | `opacity: 1;` |
| `rb1ujurrk` | `@layer utilities` | `top: 50%;` |
| `rb1vnb747` | `@layer utilities` | `white-space: nowrap;` |
| `rb1w5o6v8` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1w5ydua` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1whwoyu` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
| `rb1x23j4g` | `@layer utilities` | `height: 18px;` |
| `rb1xk8g5m` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb24ss0v` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb302fct` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb4twv3w` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb51jtg8` | `@layer utilities` | `opacity: 0;` |
| `rb5wbw0i` | `@layer utilities` | `justify-content: center;` |
| `rb5x95xd` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
