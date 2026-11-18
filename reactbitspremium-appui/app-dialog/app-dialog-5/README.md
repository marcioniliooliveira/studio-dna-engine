# app-dialog-5

> **Category:** App Dialog (`app-dialog`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/app-dialog/app-dialog-5](https://pro.reactbits.dev/docs/app-ui/app-dialog/app-dialog-5)  
> **Native Viewport:** `1280px × 640px`

Side drawer with an unsaved guard

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`app-dialog-5.jsx`](./app-dialog-5.jsx) (minHeight: `640px`, hooks: `disconnect`, `focus`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`app-dialog-5.sorbet.jsx`](./app-dialog-5.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 48 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 252 |
| **Buttons** | 6 |
| **Inputs / Textareas / Selects** | 1 / 1 / 1 |
| **Tables / Dialogs / Links** | 0 / 1 / 0 |
| **SVGs / Canvases** | 2 / 0 |
| **ARIA Roles** | `dialog`, `combobox`, `switch` |

### Visible Headings & Interactive Labels
- `Edit alert rule`
- `Deliver to`
- `Slack`
- `Trigger threshold`
- `Note`
- `Rule enabled Turn off to pause without deleting.`
- `Cancel`
- `Save changes`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 251)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1039ooh` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb108w38z` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb10vwoj8` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb11d81b8` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb11il5jx` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb12am124` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb12iw823` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb12vncy8` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb138twkf` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb13g9piv` | `@layer utilities` | `--tw-inset-ring-color: #17171780;` |
| `rb13kx19x` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb13z0tnn` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb14qp0g3` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb15ci1q9` | `@layer utilities` | `height: 100%;` |
| `rb15cyu4i` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb15myfth` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb15vq1e6` | `@layer utilities › @media (hover: hover)` | `--tw-inset-ring-color: var(--color-neutral-100);` |
| `rb15wq189` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb15zzd8h` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb166g24z` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb16cjt1m` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb16k58po` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb16r28qu` | `@layer utilities` | `width: calc(var(--spacing)*9);` |
| `rb178tctp` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb17ap387` | `@layer utilities` | `max-width: var(--container-md);` |
| `rb18laagx` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb18lokau` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb18sud1u` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb19hjnfu` | `@layer utilities` | `--tw-shadow: 0 12px 24px -12px var(--tw-shadow-color,#0009); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-of` |
| `rb19pinl5` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1a4ondb` | `@layer utilities` | `display: grid;` |
| `rb1apj53w` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1bki8qt` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1bpmd5p` | `@layer utilities` | `scale: 0.98;` |
| `rb1c2nqnf` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1c2wlnc` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1crotrp` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1cystd6` | `@layer utilities › @media (min-width: 40rem)` | `max-width: var(--container-sm);` |
| `rb1da478w` | `@layer utilities` | `resize: none;` |
| `rb1dc1tjr` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.4);` |
| `rb1driszp` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1e2l8j5` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1e4flyw` | `@layer utilities` | `cursor: default;` |
| `rb1ebpjza` | `@layer utilities` | `--tw-shadow: 0 12px 24px -12px var(--tw-shadow-color,#0003);` |
| `rb1eydfwd` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1f2ki1l` | `@layer utilities` | `align-items: center;` |
| `rb1f7t37e` | `@layer utilities` | `width: fit-content;` |
| `rb1f9kvjr` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1fungmk` | `@layer utilities` | `grid-column-start: 1;` |
| `rb1gq4l7` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1h5mppe` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1h90m9k` | `@layer utilities` | `color-scheme: dark;` |
| `rb1hery3x` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1hq1c7v` | `@layer utilities` | `cursor: text;` |
| `rb1hwfzta` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1i09l13` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1i5cjzq` | `@layer utilities` | `--tw-inset-ring-color: #17171766;` |
| `rb1i888j2` | `@layer utilities › @media (hover: hover)` | `--tw-inset-ring-color: var(--color-neutral-900);` |
| `rb1ieounh` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1ig2lwc` | `@layer utilities` | `min-width: calc(var(--spacing)*40);` |
| `rb1igfyn5` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1io1cuc` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1is9r81` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1j37c4p` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*14);` |
| `rb1jaytu7` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1jkedf1` | `@layer utilities` | `bottom: calc(var(--spacing)*4);` |
| `rb1jpxy2w` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1kavxd6` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1kkniou` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1knzfg4` | `@layer utilities` | `min-width: calc(var(--spacing)*48);` |
| `rb1komgn4` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1kpd0sa` | `@layer utilities` | `visibility: hidden;` |
| `rb1l6v3fd` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1lgdwjd` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1ljit1z` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1lrdpi0` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1m3huko` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1md9c9w` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.4);` |
