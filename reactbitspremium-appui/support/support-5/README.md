# support-5

> **Category:** Support (`support`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/support/support-5](https://pro.reactbits.dev/docs/app-ui/support/support-5)  
> **Native Viewport:** `1280px × 640px`

Request list with status pills

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`support-5.jsx`](./support-5.jsx) (minHeight: `640px`, hooks: `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`support-5.sorbet.jsx`](./support-5.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 121 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 196 |
| **Buttons** | 10 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 8 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Your requests`
- `New request`
- `All`
- `Open`
- `Resolved`
- `Search your requests`
- `#4171 Two invoices issued for March Billing and plans Wei Chen 2 replies Open Yesterday`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 193)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb107neyx` | `@layer utilities` | `height: calc(var(--spacing)*6);` |
| `rb10w8q7u` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb10wyprg` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb11642zy` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb11o7s9n` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb12b3le8` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb12inm54` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb12n7kem` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb12v2ss6` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb12zjfwn` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1481wdh` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb14h7v6z` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb14o73sq` | `@layer utilities` | `overflow-y: auto;` |
| `rb150tsv` | `@layer utilities` | `cursor: not-allowed;` |
| `rb167d5yc` | `@layer utilities` | `cursor: not-allowed;` |
| `rb16m73er` | `@layer utilities` | `display: block;` |
| `rb1708qw0` | `@layer utilities` | `cursor: pointer;` |
| `rb177t96c` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb17ag0bo` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb17is3fx` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1802l2o` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb186iwem` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb18nvzoy` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb18q1xip` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb18qm6t6` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1905n46` | `@layer utilities` | `flex-direction: column;` |
| `rb19rm1u` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb19t320d` | `@layer utilities` | `flex-shrink: 0;` |
| `rb19y2lrb` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1a6jwt9` | `@layer utilities` | `display: inline-flex;` |
| `rb1bfs0mo` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1d2l30h` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb1dbdea1` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1dgtden` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1do86q3` | `@layer utilities › @media (min-width: 40rem)` | `display: flex;` |
| `rb1e7z7xd` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1efaxm4` | `@layer utilities` | `align-items: center;` |
| `rb1f2mcvc` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1fhlr87` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1fr06d8` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1gc9wnt` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1gsfsdc` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1hts6o8` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-900); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1i0wrta` | `@layer utilities` | `display: none;` |
| `rb1i4qfdq` | `@layer utilities` | `position: relative;` |
| `rb1ijrplb` | `@layer utilities` | `width: calc(var(--spacing)*14);` |
| `rb1izb95n` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1jed8pk` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1jpy8ri` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1jwz2rt` | `@layer utilities` | `cursor: default;` |
| `rb1kse54` | `@layer utilities › @media (min-width: 40rem)` | `text-align: right;` |
| `rb1kx1ckc` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1lt5bt9` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1lxm23z` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1mf7f7t` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1mh536q` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb1n9sipz` | `@layer utilities` | `align-items: flex-start;` |
| `rb1nh40ys` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1nmea3v` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1o63ld3` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1pillq8` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1pjs5kr` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb1qhku03` | `@layer utilities` | `width: 100%;` |
| `rb1qv0qgi` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1qyq01z` | `@layer utilities` | `position: absolute;` |
| `rb1rdwk37` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb1rg55d7` | `@layer utilities` | `overflow: hidden;` |
| `rb1rlus2j` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1rsh3dp` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1rxwzm9` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1sk1ytm` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1sm9j53` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1t2ahl8` | `@layer utilities` | `cursor: text;` |
| `rb1tgta9u` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1ttwirc` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1);` |
| `rb1u8fban` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1ubiq6l` | `@layer utilities` | `color-scheme: dark;` |
| `rb1udvq5a` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
