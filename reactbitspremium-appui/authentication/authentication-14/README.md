# authentication-14

> **Category:** Authentication (`authentication`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/authentication/authentication-14](https://pro.reactbits.dev/docs/app-ui/authentication/authentication-14)  
> **Native Viewport:** `1280px × 720px`

Sign-in approval challenge

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`authentication-14.jsx`](./authentication-14.jsx) (minHeight: `720px`, hooks: `useState`)
- **Sorbet Source:** [`authentication-14.sorbet.jsx`](./authentication-14.sorbet.jsx) (minHeight: `760px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 61 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 126 |
| **Buttons** | 2 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Approve this sign-in`
- `Yes, that was me`
- `No, secure my account`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 121)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb105q01f` | `@layer utilities` | `opacity: 0.4;` |
| `rb10ckjs` | `@layer utilities` | `margin-top: calc(var(--spacing)*5);` |
| `rb10j51t4` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb11b6u27` | `@layer utilities` | `--tw-duration: .16s; transition-duration: 0.16s;` |
| `rb11uuni7` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb12oqnjt` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*10);` |
| `rb12t9ach` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb13zb5pi` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb15kthlc` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb171xst4` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb185as4h` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb18mq3dz` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb197h97g` | `@layer utilities` | `display: flex;` |
| `rb1ac68r` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb1asutdm` | `@layer utilities` | `color: oklch(0.49 0.1 68);` |
| `rb1b2idrt` | `@layer utilities` | `justify-content: center;` |
| `rb1bt3qoi` | `@layer utilities` | `max-width: 420px;` |
| `rb1c1x0t2` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb1dlaw0g` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1dy8ew8` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1e9ehvd` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1ede8w5` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1eiobrt` | `@layer utilities` | `align-items: center;` |
| `rb1ekp353` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1ett1qs` | `@layer utilities` | `padding: calc(var(--spacing)*8);` |
| `rb1fxpbsy` | `@layer utilities` | `min-height: 720px;` |
| `rb1g6tvs0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1gegltj` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1glr9qb` | `@layer utilities` | `flex-direction: column;` |
| `rb1h4gx9d` | `@layer utilities` | `width: calc(var(--spacing)*20);` |
| `rb1hd3oj1` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1i3p7b2` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1i8fe22` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1jdis57` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1kic6d0` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1l5g47m` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1l9rb6c` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1lipqsy` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb1ludyt5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1nnm0jd` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1nwtwdf` | `@layer utilities` | `pointer-events: none;` |
| `rb1oo9z6f` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1p7sun0` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1parjtc` | `@layer utilities` | `overflow: hidden;` |
| `rb1qvjdht` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1rlc8f8` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1so846b` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1t1o3zo` | `@layer utilities` | `cursor: progress;` |
| `rb1uqp984` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1vkp4z2` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1wql2ll` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1x4gqe7` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1xcyxtj` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb1y27kv0` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1yg9fx8` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb2o6ocj` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb2oa6pm` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb2qmfb5` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb2y9sel` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb3d4zz0` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb4gv380` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb5a9okk` | `@layer utilities` | `display: block;` |
| `rb5pfo8q` | `@layer utilities` | `text-align: left;` |
| `rb6aacum` | `@layer utilities` | `white-space: nowrap;` |
| `rb6g97n1` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb77eqtr` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb80e9n7` | `@layer utilities` | `position: relative;` |
| `rb8vbnns` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb8xefcj` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb9qmr0l` | `@layer utilities` | `cursor: pointer;` |
| `rb9r8u6x` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rba5vwzk` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rbck84gu` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rbd0a9yy` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rbdc9xd5` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rbdp22mq` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rbdwzq7i` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rbfks5eu` | `@layer utilities` | `width: 100%;` |
