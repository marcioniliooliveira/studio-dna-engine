# file-manager-3

> **Category:** File Manager (`file-manager`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/file-manager/file-manager-3](https://pro.reactbits.dev/docs/app-ui/file-manager/file-manager-3)  
> **Native Viewport:** `1280px × 720px`

File browser with a detail panel

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`file-manager-3.jsx`](./file-manager-3.jsx) (minHeight: `720px`, hooks: `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`file-manager-3.sorbet.jsx`](./file-manager-3.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 160 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 188 |
| **Buttons** | 10 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 11 / 0 |
| **ARIA Roles** | `status` |

### Visible Headings & Interactive Labels
- `Client Deliverables`
- `Northwind key visual.png PNG 12.4 MB`
- `Brand guidelines.pdf PDF 8.1 MB`
- `Launch film master.mp4 MP4 1.2 GB`
- `Typography specimen.pdf PDF 2.6 MB`
- `Packaging mock.png PNG 9.8 MB`
- `Northwind key visual.png`
- `Download`
- `Details`
- `Shared with`
- `Restricted to invited people`
- `Activity`
- `Make a copy`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 183)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb107wky7` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb10oetj8` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb11104zz` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb112ghfk` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb116uvs` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb11cg34j` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb11mfoti` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb123fcwq` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb12qe3le` | `@layer utilities` | `margin-top: calc(var(--spacing)*5);` |
| `rb130dpad` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb14q46e6` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb152gmef` | `@layer utilities` | `outline-offset: 2px;` |
| `rb15rlhww` | `@layer utilities` | `width: 100%;` |
| `rb15x94b` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb16yfogj` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb17dgiw6` | `@layer utilities` | `cursor: not-allowed;` |
| `rb17ievuh` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb19uudvl` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1a30w5b` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1ah3hny` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1ar33cx` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1assqem` | `@layer utilities` | `cursor: progress;` |
| `rb1avad1h` | `@layer utilities` | `pointer-events: none;` |
| `rb1ay5b2r` | `@layer utilities` | `justify-content: center;` |
| `rb1b7eq4p` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1b9xw94` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1ce8koi` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1cexbvi` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1cld43u` | `@layer utilities` | `margin-inline-start: calc(var(--spacing)*2);` |
| `rb1cmg36u` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1djmmpl` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1dz7ksa` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1eupjfk` | `@layer utilities` | `min-height: 720px;` |
| `rb1f0zdf8` | `@layer utilities` | `position: absolute;` |
| `rb1f1sr69` | `@layer utilities` | `flex-direction: column;` |
| `rb1f62hj3` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1f8xiwi` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1fjbfu7` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb1fksw8s` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1ghexi5` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1gr9cpq` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1h63y36` | `@layer utilities` | `overflow: hidden;` |
| `rb1ha7t84` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1hdiqan` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1hk7ex3` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1hqpwin` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1i46mb1` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1iveapk` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1iya427` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1j2j8cq` | `@layer utilities` | `display: flex;` |
| `rb1jil4b2` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1k0p8vs` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1k7acg0` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1k8ott7` | `@layer utilities` | `overflow-y: auto;` |
| `rb1kt48ao` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1mmesze` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1mtbjsb` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1mvnt4x` | `@layer utilities` | `gap: calc(var(--spacing)*2.5);` |
| `rb1n4ixci` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1o4gnbt` | `@layer utilities` | `align-items: baseline;` |
| `rb1o625zw` | `@layer utilities › @media (min-width: 64rem)` | `grid-template-columns: 1fr 320px;` |
| `rb1ps45vx` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1psjmog` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1pt799s` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1qswf1y` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb1s0yzyl` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1sginkv` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1t8fri7` | `@layer utilities` | `width: calc(var(--spacing)*1.5); height: calc(var(--spacing)*1.5);` |
| `rb1tbsc49` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1u1dbjj` | `@layer utilities` | `scale: 0.98;` |
| `rb1ups9mo` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb1ux2ilv` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1v5w7bi` | `@layer utilities` | `justify-content: flex-start;` |
| `rb1vbexjv` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1vg9b2l` | `@layer utilities` | `width: 28px; height: 28px;` |
| `rb1vtord0` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb1wysoc7` | `@layer utilities` | `cursor: pointer;` |
| `rb1x1eyt2` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
