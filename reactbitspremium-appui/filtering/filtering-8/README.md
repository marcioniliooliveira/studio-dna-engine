# filtering-8

> **Category:** Filtering (`filtering`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/filtering/filtering-8](https://pro.reactbits.dev/docs/app-ui/filtering/filtering-8)  
> **Native Viewport:** `1280px × 960px`

Flight filters with time ranges

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`filtering-8.jsx`](./filtering-8.jsx) (minHeight: `960px`, hooks: `key`, `left`, `preventDefault`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`, `width`)
- **Sorbet Source:** [`filtering-8.sorbet.jsx`](./filtering-8.sorbet.jsx) (minHeight: `1000px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 474 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 238 |
| **Buttons** | 18 |
| **Inputs / Textareas / Selects** | 9 / 0 / 1 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 22 / 0 |
| **ARIA Roles** | `status`, `combobox`, `radiogroup`, `slider`, `switch` |

### Visible Headings & Interactive Labels
- `San Francisco to New York`
- `Filters`
- `Cheapest`
- `Stops`
- `Any number of stops 15`
- `Nonstop only 7`
- `1 stop or fewer 12`
- `2 stops or fewer 15`
- `Departure time`
- `Duration`
- `Airlines`
- `Northwind from $231`
- `Silverline from $176`
- `Apex Air from $214`
- `Cascade from $167`
- `Meridian from $256`
- `Baggage`
- `Carry-on included 9 fares with a free cabin bag`
- `Select`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 231)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10aljdk` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb10yk7s1` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb129t26x` | `@layer utilities` | `cursor: pointer;` |
| `rb132tdig` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.4);` |
| `rb13ysnc1` | `@layer utilities` | `--tw-shadow: 0 0 0 2px var(--tw-shadow-color,var(--color-neutral-900)); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(-` |
| `rb13zr7wc` | `@layer utilities` | `transition-property: background-color, color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transiti` |
| `rb142m6p3` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb144ebot` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.8);` |
| `rb14wnqvs` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb15d16ja` | `@layer utilities › @media (min-width: 48rem)` | `flex-direction: row;` |
| `rb15rhbjy` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb15vgsvz` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb15vz9rq` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb165lmkl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb167mxcy` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb16fi7y0` | `@layer utilities` | `margin-inline: calc(var(--spacing)*-2);` |
| `rb16iozc4` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb172o6q2` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb176twx` | `@layer utilities` | `transition-property: background-color, border-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-tran` |
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
| `rb1abukid` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1avbsso` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1bro3rs` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1c237vx` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1c4u5i2` | `@layer utilities › @media (min-width: 48rem)` | `width: 260px;` |
| `rb1c9nvam` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 5px;` |
| `rb1ckf24v` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1cydtk8` | `@layer utilities` | `flex-basis: calc(var(--spacing)*24);` |
| `rb1d4qphl` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1daw3rr` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1df2h9r` | `@layer utilities` | `row-gap: calc(var(--spacing)*3);` |
| `rb1dgrf45` | `@layer utilities` | `width: 40px; height: 40px;` |
| `rb1dsb58d` | `@layer utilities` | `--tw-shadow: 0 0 0 2px var(--tw-shadow-color,white);` |
| `rb1e4ncsb` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1en78qr` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1f8ok3x` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1fr42pu` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1fzyo18` | `@layer utilities` | `--tw-translate-x: calc(var(--spacing)*4); translate: var(--tw-translate-x)var(--tw-translate-y);` |
| `rb1ghbz12` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1gijhg4` | `@layer utilities` | `flex-grow: 1;` |
| `rb1h0fphx` | `@layer utilities` | `align-items: center;` |
| `rb1h39jdt` | `@layer utilities` | `margin-inline-start: auto;` |
| `rb1h872pv` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1hb013d` | `@layer utilities` | `--tw-tracking: -.01em; letter-spacing: -0.01em;` |
| `rb1hqxlpp` | `@layer utilities` | `top: 50%;` |
| `rb1hrqy1o` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1hs6a3t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1j5mqfz` | `@layer utilities` | `font-size: 16px; line-height: 22px;` |
| `rb1jgcpwj` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1jp8fhk` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1kxy43s` | `@layer utilities` | `display: block;` |
| `rb1l46unk` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1lm35xs` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1ln849i` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1mq5d2d` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1muf0qd` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.4);` |
| `rb1n12jra` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.4);` |
| `rb1n1iuxj` | `@layer utilities` | `display: none;` |
| `rb1n487j4` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1nmtino` | `@layer utilities` | `overflow: hidden;` |
| `rb1ob1u9h` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1omiwso` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb1p6i46m` | `@layer utilities` | `gap: calc(var(--spacing)*6);` |
| `rb1pjicf9` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1pyolx1` | `@layer utilities` | `transition-property: background-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-` |
| `rb1qagiyi` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1qamrne` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1qkg4nh` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1qnv7uy` | `@layer utilities` | `border-radius: inherit;` |
