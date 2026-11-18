# filtering-1

> **Category:** Filtering (`filtering`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/filtering/filtering-1](https://pro.reactbits.dev/docs/app-ui/filtering/filtering-1)  
> **Native Viewport:** `1280px × 940px`

Faceted product filters with swatches

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`filtering-1.jsx`](./filtering-1.jsx) (minHeight: `940px`, hooks: `key`, `left`, `preventDefault`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`, `width`)
- **Sorbet Source:** [`filtering-1.sorbet.jsx`](./filtering-1.sorbet.jsx) (minHeight: `980px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 284 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 212 |
| **Buttons** | 11 |
| **Inputs / Textareas / Selects** | 9 / 0 / 1 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 11 / 0 |
| **ARIA Roles** | `combobox`, `slider` |

### Visible Headings & Interactive Labels
- `Stoneware`
- `Filters`
- `Featured`
- `Category`
- `Dinnerware 5`
- `Drinkware 5`
- `Vases 3`
- `Planters 3`
- `Serveware 2`
- `Price`
- `Glaze`
- `Size`
- `Small`
- `Medium`
- `Large`
- `Maker`
- `Kilnhouse 6`
- `Muro Studio 4`
- `Terra & Ash 4`
- `Nine Fields 4`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 207)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10aljdk` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb10yk7s1` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb129t26x` | `@layer utilities` | `cursor: pointer;` |
| `rb13ysnc1` | `@layer utilities` | `--tw-shadow: 0 0 0 2px var(--tw-shadow-color,var(--color-neutral-900)); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(-` |
| `rb13zr7wc` | `@layer utilities` | `transition-property: background-color, color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transiti` |
| `rb142m6p3` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb14wnqvs` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb15d16ja` | `@layer utilities › @media (min-width: 48rem)` | `flex-direction: row;` |
| `rb15oq697` | `@layer utilities` | `padding: calc(var(--spacing)*1);` |
| `rb15rhbjy` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb15vgsvz` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb165lmkl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb167mxcy` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb16fi7y0` | `@layer utilities` | `margin-inline: calc(var(--spacing)*-2);` |
| `rb16xdl6q` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb172o6q2` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb176twx` | `@layer utilities` | `transition-property: background-color, border-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-tran` |
| `rb179h10x` | `@layer utilities` | `margin-inline: calc(var(--spacing)*-1);` |
| `rb17d9kf` | `@layer utilities` | `flex-shrink: 0;` |
| `rb17stt8` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb185kjde` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb19d7ze0` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb19gr4k5` | `@layer utilities` | `outline-offset: 2px;` |
| `rb19z0vg3` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1a4cev8` | `@layer utilities` | `user-select: none;` |
| `rb1abukid` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1agc6p9` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1atbb0e` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*1.5);` |
| `rb1avbsso` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1bro3rs` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1c0o80e` | `@layer utilities` | `min-height: 940px;` |
| `rb1c4ic41` | `@layer utilities › @media (min-width: 40rem)` | `grid-template-columns: repeat(3, minmax(0px, 1fr));` |
| `rb1ckf24v` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1d4qphl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1da6gis` | `@layer utilities › @media (min-width: 48rem)` | `width: 240px;` |
| `rb1daw3rr` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1dsb58d` | `@layer utilities` | `--tw-shadow: 0 0 0 2px var(--tw-shadow-color,white);` |
| `rb1duvb5p` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1e4ncsb` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1en78qr` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1f8ok3x` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1fr42pu` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1ghbz12` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1gijhg4` | `@layer utilities` | `flex-grow: 1;` |
| `rb1h0fphx` | `@layer utilities` | `align-items: center;` |
| `rb1h39jdt` | `@layer utilities` | `margin-inline-start: auto;` |
| `rb1h872pv` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1hqxlpp` | `@layer utilities` | `top: 50%;` |
| `rb1hrqy1o` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1hs6a3t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1jgcpwj` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1jiftls` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1jp8fhk` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1koyngb` | `@layer utilities` | `display: grid;` |
| `rb1kxy43s` | `@layer utilities` | `display: block;` |
| `rb1l46unk` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1ln849i` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1lyg78t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1n12jra` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.4);` |
| `rb1n1iuxj` | `@layer utilities` | `display: none;` |
| `rb1n487j4` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1nmtino` | `@layer utilities` | `overflow: hidden;` |
| `rb1o2uwxf` | `@layer utilities` | `max-width: 100%;` |
| `rb1p6i46m` | `@layer utilities` | `gap: calc(var(--spacing)*6);` |
| `rb1pjicf9` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1pwb47k` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1qagiyi` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1qamrne` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1qkg4nh` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1r153ts` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1r9dm0o` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1rxdcit` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1s4djec` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1sddzci` | `@layer utilities` | `cursor: grabbing;` |
| `rb1sjpprc` | `@layer utilities` | `cursor: progress;` |
| `rb1sm3i8m` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.4);` |
| `rb1spl5i` | `@layer utilities` | `grid-template-columns: repeat(6, minmax(0px, 1fr));` |
| `rb1syopuy` | `@layer utilities` | `padding-block: calc(var(--spacing)*5);` |
