# authentication-11

> **Category:** Authentication (`authentication`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/authentication/authentication-11](https://pro.reactbits.dev/docs/app-ui/authentication/authentication-11)  
> **Native Viewport:** `1280px × 640px`

Workspace picker with invitations

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`authentication-11.jsx`](./authentication-11.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`authentication-11.sorbet.jsx`](./authentication-11.sorbet.jsx) (minHeight: `660px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 93 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 183 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Sign out`
- `Pick a workspace`
- `NO Northwind Operations 412 membersAdmin`
- `ND Northwind Design 38 membersEditor`
- `AF Ardent Freight 1,284 membersContractor`
- `KD Kestrel Data Platform 96 membersViewer`
- `AP Aurelia Product Studio Invitation 24 membersInvited by Mina Park`
- `HL Harbour Logistics Consortium Invitation 3,410 membersInvited by Daniel Osei`
- `Create a workspace Start fresh and invite your team later`
- `Open Northwind Operations`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 182)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb105q01f` | `@layer utilities` | `opacity: 0.4;` |
| `rb10fu7t7` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb10j51t4` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb11uuni7` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb12hsfq` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb12t9ach` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb13ouby0` | `@layer utilities` | `color-scheme: dark;` |
| `rb13tpiph` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb13vomze` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb13zb5pi` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb13zrwij` | `@layer utilities` | `cursor: text;` |
| `rb140moeb` | `@layer utilities` | `cursor: not-allowed;` |
| `rb16auwwg` | `@layer utilities` | `-webkit-box-orient: vertical; display: -webkit-box; overflow: hidden;` |
| `rb171xst4` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb181l757` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb18mq3dz` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb197h97g` | `@layer utilities` | `display: flex;` |
| `rb1a903xw` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1ac68r` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb1awkv4i` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1b0scbb` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1b2idrt` | `@layer utilities` | `justify-content: center;` |
| `rb1bbhpys` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1bhkvlv` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1bonkrl` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1c1x0t2` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb1c5xcu6` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1cjh9kg` | `@layer utilities › @media (min-width: 40rem)` | `height: 312px;` |
| `rb1cjpkcz` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1d5vfky` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb1dafqjq` | `@layer utilities` | `text-align: center;` |
| `rb1dddeo6` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1dlaw0g` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1dy8ew8` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1e9ehvd` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1eiobrt` | `@layer utilities` | `align-items: center;` |
| `rb1ekp353` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1f0dlsh` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*1);` |
| `rb1fnfca8` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1fssl15` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1g6tvs0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1g9duay` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1gegltj` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1glr9qb` | `@layer utilities` | `flex-direction: column;` |
| `rb1hd3oj1` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1hdzcyh` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1i1xj10` | `@layer utilities` | `max-width: 480px;` |
| `rb1i3p7b2` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1i8fe22` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1j033fm` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*3);` |
| `rb1jdis57` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1jopgck` | `@layer utilities` | `width: calc(var(--spacing)*10); height: calc(var(--spacing)*10);` |
| `rb1jwt4pf` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb1kic6d0` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1kpmefg` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb1kulds8` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1l5g47m` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1l9rb6c` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1lha5tz` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1lipqsy` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb1ludyt5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1nkzkh6` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1nmeofs` | `@layer utilities` | `cursor: default;` |
| `rb1nnm0jd` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1nwtwdf` | `@layer utilities` | `pointer-events: none;` |
| `rb1oo9z6f` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1ow136t` | `@layer utilities` | `opacity: 0;` |
| `rb1p7sun0` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1parjtc` | `@layer utilities` | `overflow: hidden;` |
| `rb1plu5qf` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1pu7pf6` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1q0exnc` | `@layer utilities` | `margin-inline-start: calc(var(--spacing)*2);` |
| `rb1qiuz6d` | `@layer utilities` | `height: 256px;` |
| `rb1qvjdht` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1qz6f30` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1rlc8f8` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1shlgzd` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1so846b` | `@layer utilities` | `flex-shrink: 0;` |
