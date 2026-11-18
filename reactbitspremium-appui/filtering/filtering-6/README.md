# filtering-6

> **Category:** Filtering (`filtering`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/filtering/filtering-6](https://pro.reactbits.dev/docs/app-ui/filtering/filtering-6)  
> **Native Viewport:** `1280px × 920px`

Candidate search by skills and pay

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`filtering-6.jsx`](./filtering-6.jsx) (minHeight: `920px`, hooks: `key`, `left`, `preventDefault`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`, `width`)
- **Sorbet Source:** [`filtering-6.sorbet.jsx`](./filtering-6.sorbet.jsx) (minHeight: `960px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 428 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 275 |
| **Buttons** | 4 |
| **Inputs / Textareas / Selects** | 5 / 0 / 2 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 24 / 0 |
| **ARIA Roles** | `status`, `combobox`, `slider`, `switch` |

### Visible Headings & Interactive Labels
- `Candidate pool`
- `Filters`
- `Best match`
- `Skills`
- `Seniority`
- `Junior 2`
- `Mid-level 4`
- `Senior 6`
- `Staff / Principal 4`
- `Compensation`
- `Location & remote`
- `Any location`
- `Remote only`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 268)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10aljdk` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb10cf0rj` | `@layer utilities › @media not all and (min-width: 40rem)` | `grid-column-end: 4;` |
| `rb10gqbmr` | `@layer utilities` | `row-gap: calc(var(--spacing)*.5);` |
| `rb10yk7s1` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb129t26x` | `@layer utilities` | `cursor: pointer;` |
| `rb132tdig` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.4);` |
| `rb13ysnc1` | `@layer utilities` | `--tw-shadow: 0 0 0 2px var(--tw-shadow-color,var(--color-neutral-900)); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(-` |
| `rb13zr7wc` | `@layer utilities` | `transition-property: background-color, color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transiti` |
| `rb142m6p3` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb144ebot` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.8);` |
| `rb14wnqvs` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb15d16ja` | `@layer utilities › @media (min-width: 48rem)` | `flex-direction: row;` |
| `rb15g6iyl` | `@layer utilities` | `column-gap: calc(var(--spacing)*3.5);` |
| `rb15oq697` | `@layer utilities` | `padding: calc(var(--spacing)*1);` |
| `rb15rhbjy` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb15vgsvz` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb165lmkl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb166iush` | `@layer utilities` | `width: 248px;` |
| `rb167mxcy` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb16fi7y0` | `@layer utilities` | `margin-inline: calc(var(--spacing)*-2);` |
| `rb16hrtq1` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb16iozc4` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb171gvyo` | `@layer utilities` | `align-items: flex-start;` |
| `rb172o6q2` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb176twx` | `@layer utilities` | `transition-property: background-color, border-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-tran` |
| `rb177p23s` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb17d9kf` | `@layer utilities` | `flex-shrink: 0;` |
| `rb17eiomb` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.4);` |
| `rb17stt8` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb185kjde` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb18eip2i` | `@layer utilities` | `width: calc(var(--spacing)*9);` |
| `rb18ngfsw` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb19d7ze0` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb19gr4k5` | `@layer utilities` | `outline-offset: 2px;` |
| `rb19z0vg3` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1a4cev8` | `@layer utilities` | `user-select: none;` |
| `rb1aavk9p` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1abukid` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1avbsso` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1bro3rs` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1c237vx` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1c4u5i2` | `@layer utilities › @media (min-width: 48rem)` | `width: 260px;` |
| `rb1ckf24v` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1d4qphl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1daw3rr` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1dsb58d` | `@layer utilities` | `--tw-shadow: 0 0 0 2px var(--tw-shadow-color,white);` |
| `rb1e4ncsb` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1en78qr` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1f8ok3x` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1fijk0t` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb1fr42pu` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1fzyo18` | `@layer utilities` | `--tw-translate-x: calc(var(--spacing)*4); translate: var(--tw-translate-x)var(--tw-translate-y);` |
| `rb1ghbz12` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1gijhg4` | `@layer utilities` | `flex-grow: 1;` |
| `rb1h0fphx` | `@layer utilities` | `align-items: center;` |
| `rb1h39jdt` | `@layer utilities` | `margin-inline-start: auto;` |
| `rb1h872pv` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1hqxlpp` | `@layer utilities` | `top: 50%;` |
| `rb1hrqy1o` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1hs6a3t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1hyeyzl` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1jgcpwj` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1jm66dk` | `@layer utilities` | `min-width: 80px;` |
| `rb1jp8fhk` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1jv4e5n` | `@layer utilities` | `gap: calc(var(--spacing)*2.5);` |
| `rb1koyngb` | `@layer utilities` | `display: grid;` |
| `rb1kxy43s` | `@layer utilities` | `display: block;` |
| `rb1l46unk` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1l4bhq0` | `@layer utilities` | `grid-template-columns: auto minmax(0px, 1fr) auto;` |
| `rb1ln849i` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1lxbdjp` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1mud9qs` | `@layer utilities` | `cursor: default;` |
| `rb1n12jra` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.4);` |
| `rb1n1iuxj` | `@layer utilities` | `display: none;` |
| `rb1n487j4` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1n8lwgk` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1nmtino` | `@layer utilities` | `overflow: hidden;` |
| `rb1ob1u9h` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(100% 0 0));` |
