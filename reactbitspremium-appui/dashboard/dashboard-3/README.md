# dashboard-3

> **Category:** Dashboard (`dashboard`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-3](https://pro.reactbits.dev/docs/app-ui/dashboard/dashboard-3)  
> **Native Viewport:** `1280px × 720px`

Widget grid with mixed card sizes

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`dashboard-3.jsx`](./dashboard-3.jsx) (minHeight: `720px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`dashboard-3.sorbet.jsx`](./dashboard-3.sorbet.jsx) (minHeight: `740px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 167 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 154 |
| **Buttons** | 4 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 26 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Web analytics`
- `Sessions, last 14 days`
- `Top pages`
- `Devices`
- `Signup funnel`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 144)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb100rzgt` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb10eh8jg` | `@layer utilities` | `justify-content: center;` |
| `rb10g55ag` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb10oc371` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb11emfi3` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb11ntp4d` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb11svz3a` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb11xka0v` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb11yjn5d` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12achc8` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb12jhjy8` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb12qc4sn` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb13ke9p8` | `@layer utilities` | `pointer-events: none;` |
| `rb13tbfkp` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb147ewul` | `@layer utilities` | `text-align: left;` |
| `rb14sok7j` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb14wdnv7` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb156rqx9` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb15w7n9n` | `@layer utilities` | `cursor: progress;` |
| `rb16sotks` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb174ue89` | `@layer utilities` | `white-space: nowrap;` |
| `rb176o9ja` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb17a0d` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb17k13zv` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb189iiv6` | `@layer utilities` | `position: relative;` |
| `rb18y0nhx` | `@layer utilities` | `height: calc(var(--spacing)*1.5);` |
| `rb19jgpk6` | `@layer utilities` | `scale: 0.98;` |
| `rb1ah80js` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1b0mqpg` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1bgl4cb` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1c6guq7` | `@layer utilities` | `fill: var(--color-neutral-900);` |
| `rb1doo0iz` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1eg1xl6` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fkqrxi` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1flhw2f` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb1ipnnop` | `@layer utilities` | `width: calc(var(--spacing)*16);` |
| `rb1jxpd4l` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1l83qb3` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb1maxg1f` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1mue17x` | `@layer utilities` | `margin-top: auto;` |
| `rb1n1vbeh` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1odxosq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1om2a3n` | `@layer utilities › @container (min-width: 28rem)` | `grid-column: auto;` |
| `rb1ouww15` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1pavm3u` | `@layer utilities` | `display: grid;` |
| `rb1pavrt1` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1pbe9oe` | `@layer utilities` | `align-items: flex-end;` |
| `rb1q0jo1f` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1q1vib3` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1q3ffcc` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1q4kixj` | `@layer utilities` | `display: block;` |
| `rb1q5q7aa` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1rs9r5w` | `@layer utilities` | `text-wrap: pretty;` |
| `rb1rwf5w7` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1rygvw8` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb1sfwe6i` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1t3ubz` | `@layer utilities` | `overflow: hidden;` |
| `rb1u0qyrq` | `@layer utilities` | `width: calc(var(--spacing)*4);` |
| `rb1u3xa2q` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1vvac5c` | `@layer utilities › @media (min-width: 64rem)` | `grid-template-columns: repeat(4, minmax(0px, 1fr));` |
| `rb1w632sx` | `@layer utilities` | `display: inline-flex;` |
| `rb1wf7xpn` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1xdknzv` | `@layer utilities` | `user-select: none;` |
| `rb1xuhcnp` | `@layer utilities` | `fill: var(--color-neutral-100);` |
| `rb1xukv1e` | `@layer utilities` | `flex-direction: column;` |
| `rb1y41gbd` | `@layer utilities` | `min-height: 720px;` |
| `rb1ygwlhn` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1ypl3as` | `@layer utilities` | `cursor: pointer;` |
| `rb20n180` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb21tp20` | `@layer utilities` | `outline-offset: 2px;` |
| `rb258ffj` | `@layer utilities` | `width: 100%;` |
| `rb2hqk66` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb2nttxc` | `@layer utilities` | `height: 100%;` |
| `rb32as7y` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb33gm2e` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb3cadwx` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb3hur2g` | `@layer utilities` | `align-self: center;` |
| `rb3odyy8` | `@layer utilities` | `stroke: var(--color-neutral-100);` |
