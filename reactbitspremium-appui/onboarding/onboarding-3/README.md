# onboarding-3

> **Category:** Onboarding (`onboarding`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/onboarding/onboarding-3](https://pro.reactbits.dev/docs/app-ui/onboarding/onboarding-3)  
> **Native Viewport:** `1280px × 640px`

Getting started checklist with progress

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`onboarding-3.jsx`](./onboarding-3.jsx) (minHeight: `640px`, hooks: `useState`)
- **Sorbet Source:** [`onboarding-3.sorbet.jsx`](./onboarding-3.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 82 |
| **Max DOM Depth** | 7 |
| **Atomic/Scoped Classes** | 143 |
| **Buttons** | 0 |
| **Inputs / Textareas / Selects** | 6 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 6 |
| **SVGs / Canvases** | 12 / 0 |
| **ARIA Roles** | `progressbar` |

### Visible Headings & Interactive Labels
- `Get set up`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 139)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb115vrc0` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb11bwrs` | `@layer utilities › @media not all and (min-width: 40rem)` | `flex-basis: calc(100% - 2rem);` |
| `rb11sni92` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb12l6s8f` | `@layer utilities` | `opacity: 0;` |
| `rb13fz5p5` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb13wowbr` | `@layer utilities` | `align-items: center;` |
| `rb13yi204` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb140zpi` | `@layer utilities` | `margin-top: calc(var(--spacing)*5);` |
| `rb155frui` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb15jlfjl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb15nch8t` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb167ne0k` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb16hdgc9` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.5);` |
| `rb16jx2sy` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb16n0zc5` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb17jursv` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb17l8x7p` | `@layer utilities` | `max-width: 100%;` |
| `rb19f8cl8` | `@layer utilities` | `white-space: nowrap;` |
| `rb19y1ey4` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb1awujjr` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1bbeonn` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb1birygc` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1cqcdtb` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1cqx8tq` | `@layer utilities` | `user-select: none;` |
| `rb1dthhac` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1e0leh` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb1eagbbj` | `@layer utilities › @media not all and (min-width: 40rem)` | `margin-inline-start: calc(var(--spacing)*8);` |
| `rb1ejntls` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1etnfar` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1fd5xrf` | `@layer utilities` | `text-decoration-line: line-through;` |
| `rb1foljff` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1g2ipyx` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1gd67u1` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1gtcvus` | `@layer utilities` | `width: 100%;` |
| `rb1h1oihl` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1hfbicb` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1hz8j56` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1ibaknk` | `@layer utilities` | `display: inline-flex;` |
| `rb1ijl2e` | `@layer utilities` | `display: flex;` |
| `rb1ix2kve` | `@layer utilities` | `opacity: 1;` |
| `rb1j3qrfj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1jhsb5c` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.4);` |
| `rb1jvhmiv` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1jvmay` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1kkwv31` | `@layer utilities` | `align-items: baseline;` |
| `rb1ldaxsv` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1ltsenr` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1lyf18j` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1mevg38` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb1msyg16` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1mz81rl` | `@layer utilities` | `position: relative;` |
| `rb1osmb15` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1ow6msy` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1owf093` | `@layer utilities` | `justify-content: center;` |
| `rb1qmt0lb` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1qrl98i` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb1r50r0w` | `@layer utilities › @media (hover: hover)` | `border-color: var(--color-neutral-900);` |
| `rb1rl5sw3` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb1tsza8o` | `@layer utilities` | `text-align: left;` |
| `rb1txoe1y` | `@layer utilities` | `display: block;` |
| `rb1uitrav` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1uv5pa3` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1uzokuq` | `@layer utilities` | `-webkit-box-orient: vertical; display: -webkit-box; overflow: hidden;` |
| `rb1vyjie2` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1wkjukg` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1wn59t3` | `@layer utilities` | `transition-property: background-color, border-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-tran` |
| `rb1yborb2` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1yih2f9` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1ylx6qi` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1ypl9qj` | `@layer utilities` | `scale: 0.98;` |
| `rb21skm1` | `@layer utilities` | `pointer-events: none;` |
| `rb2fpq8g` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.07);` |
| `rb3nge0q` | `@layer utilities` | `cursor: progress;` |
| `rb3sq10d` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb4pahk6` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb534d6s` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb6rqhbi` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb6uf8md` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
