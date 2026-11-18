# filtering-3

> **Category:** Filtering (`filtering`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/filtering/filtering-3](https://pro.reactbits.dev/docs/app-ui/filtering/filtering-3)  
> **Native Viewport:** `1280px × 900px`

Query builder driving a live table

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`filtering-3.jsx`](./filtering-3.jsx) (minHeight: `900px`, hooks: `disconnect`, `kind`, `label`, `observe`, `operators`, `options`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`filtering-3.sorbet.jsx`](./filtering-3.sorbet.jsx) (minHeight: `960px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 265 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 233 |
| **Buttons** | 10 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Deal pipeline`
- `All deals`
- `My deals`
- `Late stage`
- `High value`
- `Add filter`
- `Stage is not Lost`
- `Deal value greater than $10,000`
- `Clear all`
- `Deal`
- `Stage`
- `Owner`
- `Value`
- `Prob.`
- `Close`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 232)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1011vt4` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb10aljdk` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb111eh89` | `@layer utilities` | `content: var(--tw-content); inset: calc(var(--spacing)*0);` |
| `rb129t26x` | `@layer utilities` | `cursor: pointer;` |
| `rb14wnqvs` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb14xrowf` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb15g32lw` | `@layer utilities` | `min-width: 150px;` |
| `rb15oq697` | `@layer utilities` | `padding: calc(var(--spacing)*1);` |
| `rb15rhbjy` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb15vgsvz` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb165lmkl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb167mxcy` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb16hrtq1` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb16xakmc` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb171gvyo` | `@layer utilities` | `align-items: flex-start;` |
| `rb172o6q2` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb177p23s` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb17d9kf` | `@layer utilities` | `flex-shrink: 0;` |
| `rb17stt8` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb17zd6kw` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline-start: calc(var(--spacing)*5);` |
| `rb185kjde` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb18ngfsw` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb18wi2bj` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb19gr4k5` | `@layer utilities` | `outline-offset: 2px;` |
| `rb19z0vg3` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1a4cev8` | `@layer utilities` | `user-select: none;` |
| `rb1a6jse8` | `@layer utilities` | `--tw-border-spacing-x: calc(var(--spacing)*0); --tw-border-spacing-y: calc(var(--spacing)*0); border-spacing: var(--tw-border-spacing-x)var(` |
| `rb1aavk9p` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1abukid` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1agc6p9` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1avbsso` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1b5oyit` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1ckf24v` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1d4qphl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1duvb5p` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1en78qr` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1ep4rlp` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
| `rb1f8ok3x` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1fijk0t` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb1fr42pu` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1ghbz12` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1h0fphx` | `@layer utilities` | `align-items: center;` |
| `rb1h872pv` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1hrqy1o` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1hs6a3t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1hyeyzl` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1jgcpwj` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1jiftls` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1jp8fhk` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1kkrfum` | `@layer utilities` | `vertical-align: middle;` |
| `rb1kkxgmj` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1kxy43s` | `@layer utilities` | `display: block;` |
| `rb1l46unk` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1ln849i` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1lxbdjp` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1lyg78t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1lzwqft` | `@layer utilities` | `border-collapse: separate;` |
| `rb1mew63n` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1mud9qs` | `@layer utilities` | `cursor: default;` |
| `rb1n487j4` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1n89nw9` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1nmtino` | `@layer utilities` | `overflow: hidden;` |
| `rb1o2uwxf` | `@layer utilities` | `max-width: 100%;` |
| `rb1ofz1gg` | `@layer utilities` | `content: var(--tw-content); outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1pmr9cx` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1qagiyi` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1qamrne` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1qkg4nh` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1qnezbr` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1qnv7uy` | `@layer utilities` | `border-radius: inherit;` |
| `rb1r9dm0o` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1rsgq2` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1rxrusq` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1ryhwjn` | `@layer utilities` | `text-align: right;` |
| `rb1s7v9rd` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1sjpprc` | `@layer utilities` | `cursor: progress;` |
| `rb1tbp1vq` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1tfro8u` | `@layer utilities` | `margin-inline: auto;` |
