# billing-5

> **Category:** Billing (`billing`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/billing/billing-5](https://pro.reactbits.dev/docs/app-ui/billing/billing-5)  
> **Native Viewport:** `1280px × 680px`

Change plan with a proration preview

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`billing-5.jsx`](./billing-5.jsx) (minHeight: `680px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`billing-5.sorbet.jsx`](./billing-5.sorbet.jsx) (minHeight: `740px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 121 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 192 |
| **Buttons** | 2 |
| **Inputs / Textareas / Selects** | 4 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 5 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Change plan`
- `Starter Core billing for small teams getting started. $29 /seat`
- `Growth Current Usage analytics and seat management. $89 /seat`
- `Scale Most picked SSO, audit exports, and priority support. $249 /seat`
- `Enterprise Procurement review and account governance. $399 /seat`
- `Proration`
- `Cancel`
- `Continue`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 190)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb116xg7t` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb117drzt` | `@layer utilities` | `opacity: 0;` |
| `rb1197idm` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb12d9v4c` | `@layer utilities` | `-webkit-box-orient: vertical; display: -webkit-box; overflow: hidden;` |
| `rb12igm5l` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1307mnj` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb136n8ax` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb13pc96l` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb13waky7` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb145pwlv` | `@layer utilities` | `margin-inline-start: calc(var(--spacing)*.5);` |
| `rb14eb5za` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb14p0eoe` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1589z27` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb15off9x` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb16d0z6q` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb16xj5em` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb17d1c4c` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb17f3h5` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb17gv8cv` | `@layer utilities` | `display: none;` |
| `rb18bbzmo` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb18lblbn` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb18ocbkm` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.4);` |
| `rb19dk4m9` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb19im93g` | `@layer utilities` | `height: 1lh;` |
| `rb19n3pxl` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb19vh5pt` | `@layer utilities` | `max-width: 980px;` |
| `rb1a1modn` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1a2mtq8` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1aacilu` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1akc4at` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb1apcut` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1b7jinp` | `@layer utilities` | `min-height: 680px;` |
| `rb1bmb9fu` | `@layer utilities` | `white-space: nowrap;` |
| `rb1bp8vx0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1brljxp` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1bsgrg0` | `@layer utilities` | `height: 1px;` |
| `rb1buidzo` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1bydshi` | `@layer utilities` | `font-size: 32px; line-height: 36px;` |
| `rb1ckro0n` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1e787v1` | `@layer utilities` | `height: 100%;` |
| `rb1ef042b` | `@layer utilities` | `display: grid;` |
| `rb1efwzsg` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1epo6gh` | `@layer utilities` | `cursor: pointer;` |
| `rb1etxc3v` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1f0mt55` | `@layer utilities` | `transition-property: background-color, border-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-tran` |
| `rb1fa9dp9` | `@layer utilities` | `align-items: center;` |
| `rb1faj72n` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1fdwjht` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1fopzdv` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1fuiegl` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1fxjvl1` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1fydqst` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.4);` |
| `rb1g2s19b` | `@layer utilities` | `opacity: 0.4;` |
| `rb1gb9khg` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1gcbd7c` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1go21fd` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1h73cf0` | `@layer utilities` | `overflow: hidden;` |
| `rb1h9w10j` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1hikl8e` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1iqgz23` | `@layer utilities` | `align-items: baseline;` |
| `rb1j6c9fb` | `@layer utilities` | `pointer-events: none;` |
| `rb1jboq6s` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1jnkqeu` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.4);` |
| `rb1jqwg40` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1kh51y` | `@layer utilities` | `text-align: left;` |
| `rb1l509zw` | `@layer utilities` | `justify-content: space-between;` |
| `rb1lhtetc` | `@layer utilities` | `min-width: calc(var(--spacing)*4);` |
| `rb1lrt0ib` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb1ly2wdh` | `@layer utilities` | `overflow-y: auto;` |
| `rb1lypal9` | `@layer utilities` | `justify-content: center;` |
| `rb1m3615a` | `@layer utilities › @media (hover: hover)` | `border-color: var(--color-neutral-900);` |
| `rb1m3ee9n` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1m6dwh8` | `@layer utilities` | `user-select: none;` |
| `rb1mlrtl8` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1ncd5cq` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1nf6er6` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1o7neml` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1ou8h8b` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
