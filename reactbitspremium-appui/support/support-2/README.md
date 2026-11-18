# support-2

> **Category:** Support (`support`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/support/support-2](https://pro.reactbits.dev/docs/app-ui/support/support-2)  
> **Native Viewport:** `1280px × 800px`

Ticket form with article suggestions

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`support-2.jsx`](./support-2.jsx) (minHeight: `800px`, hooks: `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`support-2.sorbet.jsx`](./support-2.sorbet.jsx) (minHeight: `840px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 109 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 240 |
| **Buttons** | 12 |
| **Inputs / Textareas / Selects** | 1 / 1 / 2 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 7 / 0 |
| **ARIA Roles** | `combobox`, `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Open a ticket`
- `Area`
- `Reports and exports`
- `Workspace`
- `Northwind Production`
- `Subject`
- `Scheduled export arrives with no rows`
- `Export runs but the file never lands in storage`
- `Column order changes between runs`
- `Low`
- `Normal`
- `Urgent`
- `What happened?`
- `Attach files`
- `Save draft`
- `Submit ticket`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 234)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10w8q7u` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb10wyprg` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb11642zy` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb11hypzh` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb11o7s9n` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb11r1puy` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb12b3le8` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb12inm54` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb12v2ss6` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb12zjfwn` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb141fa65` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb14h7v6z` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb14o73sq` | `@layer utilities` | `overflow-y: auto;` |
| `rb150tsv` | `@layer utilities` | `cursor: not-allowed;` |
| `rb167d5yc` | `@layer utilities` | `cursor: not-allowed;` |
| `rb16m73er` | `@layer utilities` | `display: block;` |
| `rb16qnh2x` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1708qw0` | `@layer utilities` | `cursor: pointer;` |
| `rb173aaaa` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb177t96c` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb17ag0bo` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb17is3fx` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb17k7n8x` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb17utg9h` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1802l2o` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb186iwem` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb18joq9k` | `@layer utilities` | `min-height: 800px;` |
| `rb18q1xip` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb18qm6t6` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1905n46` | `@layer utilities` | `flex-direction: column;` |
| `rb19rm1u` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb19t320d` | `@layer utilities` | `flex-shrink: 0;` |
| `rb19y2lrb` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1a6jwt9` | `@layer utilities` | `display: inline-flex;` |
| `rb1aq87d3` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1bsm105` | `@layer utilities` | `min-height: 76px;` |
| `rb1c3qigo` | `@layer utilities` | `margin-inline-end: calc(var(--spacing)*-1.5);` |
| `rb1dbdea1` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1dbzihv` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1dgtden` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1e7z7xd` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1efaxm4` | `@layer utilities` | `align-items: center;` |
| `rb1f2jf3g` | `@layer utilities` | `height: fit-content;` |
| `rb1f2mcvc` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1fhlr87` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1fr06d8` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1fzbg8w` | `@layer utilities › @media (min-width: 40rem)` | `justify-content: flex-end;` |
| `rb1g4ij0c` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1gc9wnt` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1hyjt0r` | `@layer utilities` | `transition-property: background-color, border-color, color, scale, outline-color; transition-timing-function: var(--tw-ease,var(--default-tr` |
| `rb1i4qfdq` | `@layer utilities` | `position: relative;` |
| `rb1izb95n` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb1jed8pk` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1jpy8ri` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1jqrh2g` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1jwz2rt` | `@layer utilities` | `cursor: default;` |
| `rb1kx1ckc` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1lt5bt9` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1m5b4d8` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1m7b3bi` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1m8x3d8` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb1mf7f7t` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1mh536q` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb1mkwbet` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1n9sipz` | `@layer utilities` | `align-items: flex-start;` |
| `rb1nh40ys` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1nmea3v` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1o63ld3` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1p7iy9p` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1pillq8` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1pjs5kr` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb1pl6syw` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1pyfljb` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1qhku03` | `@layer utilities` | `width: 100%;` |
| `rb1qtjb0g` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1qyq01z` | `@layer utilities` | `position: absolute;` |
| `rb1r2x59k` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2.5);` |
| `rb1rdwk37` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
