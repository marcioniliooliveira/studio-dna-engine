# authentication-3

> **Category:** Authentication (`authentication`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/authentication/authentication-3](https://pro.reactbits.dev/docs/app-ui/authentication/authentication-3)  
> **Native Viewport:** `1280px × 640px`

Split sign-in with a customer quote

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`authentication-3.jsx`](./authentication-3.jsx) (minHeight: `640px`, hooks: `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`authentication-3.sorbet.jsx`](./authentication-3.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 82 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 189 |
| **Buttons** | 12 |
| **Inputs / Textareas / Selects** | 2 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 6 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Sign in`
- `Work email`
- `Password`
- `Forgot password?`
- `Google`
- `Apple`
- `GitHub`
- `Create an account`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 187)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb105q01f` | `@layer utilities` | `opacity: 0.4;` |
| `rb10j51t4` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb11b6u27` | `@layer utilities` | `--tw-duration: .16s; transition-duration: 0.16s;` |
| `rb11uuni7` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb12t9ach` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb13a69et` | `@layer utilities` | `width: 20px;` |
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
| `rb1c5xcu6` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1cjpkcz` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1cv5p0j` | `@layer utilities` | `font-size: 16px; line-height: 22px;` |
| `rb1d6zyp1` | `@layer utilities` | `max-width: 360px;` |
| `rb1dddeo6` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1dlaw0g` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1dy8ew8` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1e0zg2m` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1e9ehvd` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1eiobrt` | `@layer utilities` | `align-items: center;` |
| `rb1ekp353` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1f0dlsh` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*1);` |
| `rb1fssl15` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1g6tvs0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1g9duay` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1gegltj` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1glr9qb` | `@layer utilities` | `flex-direction: column;` |
| `rb1hd3oj1` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1hdzcyh` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1hgv8pa` | `@layer utilities` | `width: 44%;` |
| `rb1i3p7b2` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1i8fe22` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1j033fm` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*3);` |
| `rb1jdis57` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1jopgck` | `@layer utilities` | `width: calc(var(--spacing)*10); height: calc(var(--spacing)*10);` |
| `rb1jwt4pf` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb1kpmefg` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb1l2bdqy` | `@layer utilities` | `column-gap: calc(var(--spacing)*1);` |
| `rb1l5g47m` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1l9rb6c` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1lha5tz` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1ludyt5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1mty4sp` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1nkzkh6` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1nmeofs` | `@layer utilities` | `cursor: default;` |
| `rb1nnm0jd` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1nwtwdf` | `@layer utilities` | `pointer-events: none;` |
| `rb1nxwjkl` | `@layer utilities` | `width: calc(var(--spacing)*2); height: calc(var(--spacing)*2);` |
| `rb1o6am0` | `@layer utilities` | `height: calc(var(--spacing)*4);` |
| `rb1oo9z6f` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1p7sun0` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1parjtc` | `@layer utilities` | `overflow: hidden;` |
| `rb1plu5qf` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1pu7pf6` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1qcspvq` | `@layer utilities › @media (hover: hover)` | `text-decoration-thickness: 2px;` |
| `rb1qfs9gq` | `@layer utilities` | `text-underline-offset: 4px;` |
| `rb1quxvaa` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1qvjdht` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1qz6f30` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1rlc8f8` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1rmbfgv` | `@layer utilities` | `display: grid;` |
| `rb1so846b` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1t1o3zo` | `@layer utilities` | `cursor: progress;` |
