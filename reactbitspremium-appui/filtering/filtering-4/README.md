# filtering-4

> **Category:** Filtering (`filtering`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/filtering/filtering-4](https://pro.reactbits.dev/docs/app-ui/filtering/filtering-4)  
> **Native Viewport:** `1280px × 920px`

Log explorer with a volume chart

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`filtering-4.jsx`](./filtering-4.jsx) (minHeight: `920px`, hooks: `label`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`, `value`)
- **Sorbet Source:** [`filtering-4.sorbet.jsx`](./filtering-4.sorbet.jsx) (minHeight: `920px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 338 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 209 |
| **Buttons** | 6 |
| **Inputs / Textareas / Selects** | 1 / 0 / 1 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | `combobox`, `group` |

### Visible Headings & Interactive Labels
- `Log explorer`
- `Services`
- `Last 4 hours`
- `Debug 8`
- `Info 21`
- `Warn 8`
- `Error 5`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 206)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10aljdk` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb11gfgjo` | `@layer utilities › @media (min-width: 40rem)` | `display: block;` |
| `rb11wmefq` | `@layer utilities › @media (hover: hover)` | `background-color: oklch(0.29 0.06 26 / 0.6);` |
| `rb129t26x` | `@layer utilities` | `cursor: pointer;` |
| `rb12n19kq` | `@layer utilities` | `background-color: oklch(0.945 0.027 26 / 0.4);` |
| `rb12nulrc` | `@layer utilities › @media (hover: hover)` | `background-color: oklch(0.945 0.027 26 / 0.6);` |
| `rb13aglve` | `@layer utilities` | `width: 52px;` |
| `rb145ak3l` | `@layer utilities` | `min-width: 100%;` |
| `rb15rhbjy` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb15vgsvz` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb165lmkl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb167mxcy` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb16hrtq1` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb16iozc4` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb16xakmc` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb171gvyo` | `@layer utilities` | `align-items: flex-start;` |
| `rb172o6q2` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb177p23s` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb17d9kf` | `@layer utilities` | `flex-shrink: 0;` |
| `rb17stt8` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb185kjde` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb18vtpic` | `@layer utilities` | `background-color: oklch(0.29 0.06 26 / 0.4);` |
| `rb18wi2bj` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb19d7ze0` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb19gr4k5` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1a4cev8` | `@layer utilities` | `user-select: none;` |
| `rb1aavk9p` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1abukid` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1agc6p9` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1avbsso` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1bro3rs` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1ckf24v` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1d4qphl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1d6rs8u` | `@layer utilities` | `opacity: 1;` |
| `rb1e4ncsb` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1en78qr` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1f8ok3x` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1fijk0t` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb1fr42pu` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1ghbz12` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1h0fphx` | `@layer utilities` | `align-items: center;` |
| `rb1h872pv` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1hrqy1o` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1hs6a3t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1hyeyzl` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1i943ut` | `@layer utilities` | `gap: 3px;` |
| `rb1ilh6m` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.07);` |
| `rb1j0dbh8` | `@layer utilities` | `width: 168px;` |
| `rb1jgcpwj` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1jiftls` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1jjmknu` | `@layer utilities` | `color: oklch(0.8 0.13 68);` |
| `rb1jp8fhk` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1ku3rx7` | `@layer utilities` | `margin-inline-start: calc(var(--spacing)*.5);` |
| `rb1kxy43s` | `@layer utilities` | `display: block;` |
| `rb1l46unk` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1ln849i` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1lxbdjp` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1lyg78t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1mud9qs` | `@layer utilities` | `cursor: default;` |
| `rb1mukntt` | `@layer utilities › @media (min-width: 40rem)` | `width: 280px;` |
| `rb1n1iuxj` | `@layer utilities` | `display: none;` |
| `rb1n487j4` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1nmtino` | `@layer utilities` | `overflow: hidden;` |
| `rb1o2uwxf` | `@layer utilities` | `max-width: 100%;` |
| `rb1owznz2` | `@layer utilities` | `font-size: 13px; line-height: 20px;` |
| `rb1pmr9cx` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1qagiyi` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1qamrne` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1qkg4nh` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1r153ts` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1rsgq2` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1s4djec` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1sjpprc` | `@layer utilities` | `cursor: progress;` |
| `rb1tbp1vq` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1tfro8u` | `@layer utilities` | `margin-inline: auto;` |
| `rb1tsl27p` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1u31xu7` | `@layer utilities` | `flex-direction: column;` |
| `rb1uigkc4` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
