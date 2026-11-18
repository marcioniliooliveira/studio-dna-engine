# filtering-2

> **Category:** Filtering (`filtering`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/filtering/filtering-2](https://pro.reactbits.dev/docs/app-ui/filtering/filtering-2)  
> **Native Viewport:** `1280px × 760px`

Filter drawer with a live count

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`filtering-2.jsx`](./filtering-2.jsx) (minHeight: `760px`, hooks: `disconnect`, `key`, `left`, `observe`, `preventDefault`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`, `width`)
- **Sorbet Source:** [`filtering-2.sorbet.jsx`](./filtering-2.sorbet.jsx) (minHeight: `760px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 132 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 215 |
| **Buttons** | 13 |
| **Inputs / Textareas / Selects** | 10 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 11 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `slider` |

### Visible Headings & Interactive Labels
- `Filters`
- `Clear all`
- `Discipline`
- `All`
- `Road`
- `Gravel`
- `Mountain`
- `City`
- `Frame size`
- `48 cm 0`
- `51 cm 5`
- `54 cm 6`
- `56 cm 5`
- `58 cm 2`
- `Price`
- `Condition`
- `Like new`
- `Excellent`
- `Good`
- `Fair`
- `Groupset`
- `Shimano 105 4`
- `Shimano GRX 3`
- `Shimano Deore 6`
- `SRAM Rival 3`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 210)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1011vt4` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb10aljdk` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb10yk7s1` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb129t26x` | `@layer utilities` | `cursor: pointer;` |
| `rb136tr0g` | `@layer utilities` | `padding: calc(var(--spacing)*8);` |
| `rb13ysnc1` | `@layer utilities` | `--tw-shadow: 0 0 0 2px var(--tw-shadow-color,var(--color-neutral-900)); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(-` |
| `rb13zr7wc` | `@layer utilities` | `transition-property: background-color, color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transiti` |
| `rb142m6p3` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb14wnqvs` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb14xrowf` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb15rhbjy` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb15vgsvz` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb15ypry6` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb165lmkl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb167mxcy` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb16fi7y0` | `@layer utilities` | `margin-inline: calc(var(--spacing)*-2);` |
| `rb16xakmc` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb16xdl6q` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb176twx` | `@layer utilities` | `transition-property: background-color, border-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-tran` |
| `rb17d9kf` | `@layer utilities` | `flex-shrink: 0;` |
| `rb17stt8` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb185kjde` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb18wi2bj` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb19gr4k5` | `@layer utilities` | `outline-offset: 2px;` |
| `rb19z0vg3` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1a4cev8` | `@layer utilities` | `user-select: none;` |
| `rb1abukid` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1agc6p9` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1avbsso` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1ckf24v` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1d4qphl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1d6rs8u` | `@layer utilities` | `opacity: 1;` |
| `rb1daw3rr` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1dsb58d` | `@layer utilities` | `--tw-shadow: 0 0 0 2px var(--tw-shadow-color,white);` |
| `rb1en78qr` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1ep4rlp` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
| `rb1fr42pu` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1fzrpw` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1gdlv87` | `@layer utilities` | `opacity: 0.4;` |
| `rb1gijhg4` | `@layer utilities` | `flex-grow: 1;` |
| `rb1gosa7s` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1h0fphx` | `@layer utilities` | `align-items: center;` |
| `rb1h39jdt` | `@layer utilities` | `margin-inline-start: auto;` |
| `rb1h872pv` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1hqxlpp` | `@layer utilities` | `top: 50%;` |
| `rb1hs6a3t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1jgcpwj` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1jiftls` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1jp8fhk` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1kxy43s` | `@layer utilities` | `display: block;` |
| `rb1l46unk` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1lyg78t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1m9m77r` | `@layer utilities` | `opacity: 0.4;` |
| `rb1mew63n` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1n12jra` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.4);` |
| `rb1nmtino` | `@layer utilities` | `overflow: hidden;` |
| `rb1o2uwxf` | `@layer utilities` | `max-width: 100%;` |
| `rb1pjicf9` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1pwb47k` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1pzovka` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*3);` |
| `rb1q0gx9j` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1q2mz3m` | `@layer utilities` | `min-height: 760px;` |
| `rb1qagiyi` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1qamrne` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1qkg4nh` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1qnezbr` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1r9dm0o` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1rxdcit` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1rxrusq` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1sddzci` | `@layer utilities` | `cursor: grabbing;` |
| `rb1sjpprc` | `@layer utilities` | `cursor: progress;` |
| `rb1sm3i8m` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.4);` |
| `rb1syopuy` | `@layer utilities` | `padding-block: calc(var(--spacing)*5);` |
| `rb1szc9ef` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb1t8objx` | `@layer utilities` | `padding-block: calc(var(--spacing)*4);` |
| `rb1tftx0p` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1tgo0rd` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1tiqdq2` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
