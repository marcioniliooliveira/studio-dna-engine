# authentication-6

> **Category:** Authentication (`authentication`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/authentication/authentication-6](https://pro.reactbits.dev/docs/app-ui/authentication/authentication-6)  
> **Native Viewport:** `1280px × 560px`

Six-digit code entry

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`authentication-6.jsx`](./authentication-6.jsx) (minHeight: `560px`, hooks: `l`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`authentication-6.sorbet.jsx`](./authentication-6.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 41 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 154 |
| **Buttons** | 4 |
| **Inputs / Textareas / Selects** | 6 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 2 / 0 |
| **ARIA Roles** | `group` |

### Visible Headings & Interactive Labels
- `Verify it is you`
- `Verify and continue`
- `Resend in 0:27`
- `Use a recovery code`
- `Back to sign in`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 153)

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
| `rb12so69k` | `@layer utilities` | `min-height: 560px;` |
| `rb12t9ach` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb13ouby0` | `@layer utilities` | `color-scheme: dark;` |
| `rb13tpiph` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb13vomze` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb13zb5pi` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb13zrwij` | `@layer utilities` | `cursor: text;` |
| `rb140moeb` | `@layer utilities` | `cursor: not-allowed;` |
| `rb148yiho` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb15kthlc` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb171xst4` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb181l757` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb185as4h` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb18mq3dz` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb197h97g` | `@layer utilities` | `display: flex;` |
| `rb1ac68r` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb1acx4ln` | `@layer utilities` | `min-height: calc(var(--spacing)*6);` |
| `rb1awkv4i` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1b2idrt` | `@layer utilities` | `justify-content: center;` |
| `rb1bbhpys` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1bhkvlv` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1bt3qoi` | `@layer utilities` | `max-width: 420px;` |
| `rb1by4jjp` | `@layer utilities` | `max-width: 60ch;` |
| `rb1c1x0t2` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb1c5xcu6` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1cjpkcz` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1dafqjq` | `@layer utilities` | `text-align: center;` |
| `rb1dddeo6` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1dlaw0g` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1dy8ew8` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1e9ehvd` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1eiobrt` | `@layer utilities` | `align-items: center;` |
| `rb1ekp353` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1ett1qs` | `@layer utilities` | `padding: calc(var(--spacing)*8);` |
| `rb1fssl15` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1g6tvs0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1gegltj` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1glr9qb` | `@layer utilities` | `flex-direction: column;` |
| `rb1hd3oj1` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1hdzcyh` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1i3p7b2` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1i8fe22` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1jdis57` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1jwt4pf` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb1kpmefg` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb1l9rb6c` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1lha5tz` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1ludyt5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1nkzkh6` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1nmeofs` | `@layer utilities` | `cursor: default;` |
| `rb1nnm0jd` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1nwtwdf` | `@layer utilities` | `pointer-events: none;` |
| `rb1oo9z6f` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1p7sun0` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1parjtc` | `@layer utilities` | `overflow: hidden;` |
| `rb1pu7pf6` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1qcspvq` | `@layer utilities › @media (hover: hover)` | `text-decoration-thickness: 2px;` |
| `rb1qfs9gq` | `@layer utilities` | `text-underline-offset: 4px;` |
| `rb1quxvaa` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1qvjdht` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1qz6f30` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1rlc8f8` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1so846b` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1t1o3zo` | `@layer utilities` | `cursor: progress;` |
| `rb1u62h2l` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1ubdmp` | `@layer utilities` | `margin-top: calc(var(--spacing)*6);` |
| `rb1uqp984` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1vkp4z2` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1wql2ll` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1wwlj29` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1x4gqe7` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1y27kv0` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
