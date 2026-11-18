# file-manager-4

> **Category:** File Manager (`file-manager`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/file-manager/file-manager-4](https://pro.reactbits.dev/docs/app-ui/file-manager/file-manager-4)  
> **Native Viewport:** `1280px × 640px`

Upload manager with per-file progress

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`file-manager-4.jsx`](./file-manager-4.jsx) (minHeight: `640px`, hooks: `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`file-manager-4.sorbet.jsx`](./file-manager-4.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 113 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 175 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 14 / 0 |
| **ARIA Roles** | `progressbar` |

### Visible Headings & Interactive Labels
- `Upload to Spring Campaign`
- `Drop files here or click to browse Up to 2 GB per file. Images, video, PDF and archives.`
- `Cancel all`
- `Clear completed`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 172)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb101skg8` | `@layer utilities › @media (hover: hover)` | `background-color: oklch(0.29 0.06 26 / 0.6);` |
| `rb105i51x` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb107wky7` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb10oetj8` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb11104zz` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb116uvs` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb11cg34j` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb11mfoti` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb123fcwq` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb13zo4kc` | `@layer utilities` | `margin-inline: auto;` |
| `rb14q46e6` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb14y84nr` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb151wgyl` | `@layer utilities` | `padding-top: calc(var(--spacing)*3);` |
| `rb152gmef` | `@layer utilities` | `outline-offset: 2px;` |
| `rb15rlhww` | `@layer utilities` | `width: 100%;` |
| `rb15x94b` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb16yfogj` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb17dgiw6` | `@layer utilities` | `cursor: not-allowed;` |
| `rb17ievuh` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb18t5vi4` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.07);` |
| `rb1948yae` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb19uudvl` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1a30w5b` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1assqem` | `@layer utilities` | `cursor: progress;` |
| `rb1avad1h` | `@layer utilities` | `pointer-events: none;` |
| `rb1ay5b2r` | `@layer utilities` | `justify-content: center;` |
| `rb1b9xw94` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1bxr0w` | `@layer utilities` | `background-color: oklch(0.945 0.027 26 / 0.4);` |
| `rb1ce8koi` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1ch96ad` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*1);` |
| `rb1djmmpl` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1dz7ksa` | `@layer utilities` | `background-color: var(--color-white);` |
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
| `rb1j2j8cq` | `@layer utilities` | `display: flex;` |
| `rb1j5q0nz` | `@layer utilities` | `min-height: 640px;` |
| `rb1jil4b2` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1k0p8vs` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1k7acg0` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1k8ott7` | `@layer utilities` | `overflow-y: auto;` |
| `rb1kt48ao` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1met3hd` | `@layer utilities` | `background-color: oklch(0.652 0.219 26);` |
| `rb1mmesze` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1mtbjsb` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1n4ixci` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1o4gnbt` | `@layer utilities` | `align-items: baseline;` |
| `rb1ps45vx` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1psjmog` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1pt799s` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1qswf1y` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb1s0yzyl` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1sginkv` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1tbsc49` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1u1dbjj` | `@layer utilities` | `scale: 0.98;` |
| `rb1ups9mo` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb1ux2ilv` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1vbexjv` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1vk9arr` | `@layer utilities` | `color: oklch(0.51 0.18 26);` |
| `rb1vtord0` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb1wysoc7` | `@layer utilities` | `cursor: pointer;` |
| `rb1x1eyt2` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1xab9ey` | `@layer utilities` | `user-select: none;` |
| `rb1xufk8y` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1xybwwa` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1y6ywx0` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
