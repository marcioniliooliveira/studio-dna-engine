# filtering-9

> **Category:** Filtering (`filtering`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/filtering/filtering-9](https://pro.reactbits.dev/docs/app-ui/filtering/filtering-9)  
> **Native Viewport:** `1280px × 880px`

Cuisine pills with rating filters

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`filtering-9.jsx`](./filtering-9.jsx) (minHeight: `880px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`filtering-9.sorbet.jsx`](./filtering-9.sorbet.jsx) (minHeight: `880px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 323 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 187 |
| **Buttons** | 29 |
| **Inputs / Textareas / Selects** | 0 / 0 / 1 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 21 / 0 |
| **ARIA Roles** | `status`, `radiogroup`, `radio`, `group`, `checkbox`, `combobox` |

### Visible Headings & Interactive Labels
- `Order in tonight`
- `All 18`
- `Pizza 2`
- `Sushi 2`
- `Burgers 2`
- `Thai 2`
- `Mexican 2`
- `Indian 1`
- `Ramen 1`
- `Salads 1`
- `Korean 1`
- `Mediterranean 1`
- `BBQ 1`
- `Vietnamese 1`
- `Dessert 1`
- `Any`
- `3.5+`
- `4.0+`
- `4.5+`
- `$`
- `$$`
- `$$$`
- `$$$$`
- `Any delivery time`
- `Vegetarian`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 187)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1011vt4` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb10aljdk` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb11m9ci0` | `@layer utilities › @media not all and (min-width: 40rem)` | `display: none;` |
| `rb129t26x` | `@layer utilities` | `cursor: pointer;` |
| `rb14xrowf` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb15el9a7` | `@layer utilities` | `min-height: 880px;` |
| `rb15oq697` | `@layer utilities` | `padding: calc(var(--spacing)*1);` |
| `rb15rhbjy` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb15vgsvz` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb165lmkl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb167mxcy` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb172o6q2` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb17d9kf` | `@layer utilities` | `flex-shrink: 0;` |
| `rb17stt8` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb185kjde` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb18amgl4` | `@layer utilities` | `right: calc(var(--spacing)*2);` |
| `rb18oiarh` | `@layer utilities` | `width: calc(var(--spacing)*8);` |
| `rb18ulnz2` | `@layer utilities` | `right: calc(var(--spacing)*0);` |
| `rb18wi2bj` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb18yqzca` | `@layer utilities` | `fill: currentcolor;` |
| `rb19d7ze0` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb19gr4k5` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1a4cev8` | `@layer utilities` | `user-select: none;` |
| `rb1abukid` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1agc6p9` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1atbb0e` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*1.5);` |
| `rb1avbsso` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1bro3rs` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1c4ic41` | `@layer utilities › @media (min-width: 40rem)` | `grid-template-columns: repeat(3, minmax(0px, 1fr));` |
| `rb1ckf24v` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1d4qphl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1d6rs8u` | `@layer utilities` | `opacity: 1;` |
| `rb1df2h9r` | `@layer utilities` | `row-gap: calc(var(--spacing)*3);` |
| `rb1dkvpgq` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb1dz1onp` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1e4ncsb` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1en78qr` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1ep4rlp` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
| `rb1f8ok3x` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1fci8fa` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1fr42pu` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1gaqymo` | `@layer utilities` | `aspect-ratio: 3 / 2;` |
| `rb1ghbz12` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1h0fphx` | `@layer utilities` | `align-items: center;` |
| `rb1h872pv` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1hrqy1o` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1hs6a3t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1jgcpwj` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1jiftls` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1koyngb` | `@layer utilities` | `display: grid;` |
| `rb1ku3rx7` | `@layer utilities` | `margin-inline-start: calc(var(--spacing)*.5);` |
| `rb1l46unk` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1ln849i` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1lyg78t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1m9m77r` | `@layer utilities` | `opacity: 0.4;` |
| `rb1mew63n` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1n487j4` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1n8lwgk` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1nmtino` | `@layer utilities` | `overflow: hidden;` |
| `rb1o2uwxf` | `@layer utilities` | `max-width: 100%;` |
| `rb1piljk6` | `@layer utilities` | `width: 180px;` |
| `rb1q0gx9j` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1qagiyi` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1qamrne` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1qkg4nh` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1qnezbr` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1r153ts` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1rxrusq` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1s4djec` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1sjpprc` | `@layer utilities` | `cursor: progress;` |
| `rb1tbp1vq` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1tfro8u` | `@layer utilities` | `margin-inline: auto;` |
| `rb1tiqdq2` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1tsl27p` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1tuljrv` | `@layer utilities` | `display: none;` |
| `rb1u31xu7` | `@layer utilities` | `flex-direction: column;` |
| `rb1uigkc4` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb1v5ab50` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
