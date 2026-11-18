# onboarding-6

> **Category:** Onboarding (`onboarding`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/onboarding/onboarding-6](https://pro.reactbits.dev/docs/app-ui/onboarding/onboarding-6)  
> **Native Viewport:** `1280px × 560px`

Setup complete summary with next steps

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`onboarding-6.jsx`](./onboarding-6.jsx) (minHeight: `560px`, hooks: none)
- **Sorbet Source:** [`onboarding-6.sorbet.jsx`](./onboarding-6.sorbet.jsx) (minHeight: `580px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 28 |
| **Max DOM Depth** | 6 |
| **Atomic/Scoped Classes** | 110 |
| **Buttons** | 2 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 2 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Your workspace is ready`
- `Open workspace`
- `Take the two-minute tour`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 107)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb11sni92` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb13fz5p5` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb13wowbr` | `@layer utilities` | `align-items: center;` |
| `rb13yi204` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb15jlfjl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb167ne0k` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb16jx2sy` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb18ehpqa` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb19f8cl8` | `@layer utilities` | `white-space: nowrap;` |
| `rb1ak72s1` | `@layer utilities` | `margin-block: auto;` |
| `rb1awbg6z` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1bbeonn` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb1birygc` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1bo1v79` | `@layer utilities` | `max-width: 340px;` |
| `rb1cqx8tq` | `@layer utilities` | `user-select: none;` |
| `rb1e0leh` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb1ejntls` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1etnfar` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1foljff` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1gak3ay` | `@layer utilities` | `justify-content: space-between;` |
| `rb1gd67u1` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1grb2fc` | `@layer utilities` | `max-width: 420px;` |
| `rb1gtcvus` | `@layer utilities` | `width: 100%;` |
| `rb1hfbicb` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1hz8j56` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1ibaknk` | `@layer utilities` | `display: inline-flex;` |
| `rb1ijl2e` | `@layer utilities` | `display: flex;` |
| `rb1j3qrfj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1jvmay` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1kkwv31` | `@layer utilities` | `align-items: baseline;` |
| `rb1ldaxsv` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1ltsenr` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1lyf18j` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1msyg16` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1mz81rl` | `@layer utilities` | `position: relative;` |
| `rb1oqgx12` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1owf093` | `@layer utilities` | `justify-content: center;` |
| `rb1qmt0lb` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1qy2si2` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb1rxks30` | `@layer utilities` | `text-align: center;` |
| `rb1tsza8o` | `@layer utilities` | `text-align: left;` |
| `rb1uitrav` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1uv5pa3` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1vyjie2` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1w8zuep` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1wkjukg` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1wujg9f` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb1yborb2` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1ylx6qi` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1ypl9qj` | `@layer utilities` | `scale: 0.98;` |
| `rb21skm1` | `@layer utilities` | `pointer-events: none;` |
| `rb2nl9m` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb3nge0q` | `@layer utilities` | `cursor: progress;` |
| `rb3sq10d` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb4pahk6` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb534d6s` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb5osd4f` | `@layer utilities` | `--tw-tracking: -.01em; letter-spacing: -0.01em;` |
| `rb6rqhbi` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb7cq18g` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb8q7dab` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb9znhw7` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rba2pfcz` | `@layer utilities` | `cursor: pointer;` |
| `rbae8ee6` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rbag1ik0` | `@layer utilities` | `margin-inline: auto;` |
| `rbalyxn3` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rbbdhzb5` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rbbtm3a2` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rbc82m1z` | `@layer utilities` | `overflow-y: auto;` |
| `rbcyrzd0` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rbd2yeev` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rbdkldnt` | `@layer utilities` | `opacity: 0.4;` |
| `rbdmxlst` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rbejt4fu` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rbeyrk27` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rbfwn1th` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rbhsu64u` | `@layer utilities` | `overflow: hidden;` |
| `rbiaguf5` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rbie039c` | `@layer utilities` | `position: absolute;` |
