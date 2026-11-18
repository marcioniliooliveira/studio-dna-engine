# onboarding-4

> **Category:** Onboarding (`onboarding`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/onboarding/onboarding-4](https://pro.reactbits.dev/docs/app-ui/onboarding/onboarding-4)  
> **Native Viewport:** `1280px × 640px`

Use case picker with option tiles

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`onboarding-4.jsx`](./onboarding-4.jsx) (minHeight: `640px`, hooks: `useState`)
- **Sorbet Source:** [`onboarding-4.sorbet.jsx`](./onboarding-4.sorbet.jsx) (minHeight: `660px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 46 |
| **Max DOM Depth** | 6 |
| **Atomic/Scoped Classes** | 160 |
| **Buttons** | 6 |
| **Inputs / Textareas / Selects** | 6 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 0 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `What will you use this for first?`
- `Plan a roadmap Quarterly themes, dated milestones and a view leadership can read.`
- `Run sprints Cycles, capacity and a board that clears itself every two weeks.`
- `Triage requests One intake queue for bugs, questions and customer escalations.`
- `Write things down Specs and decision records that stay attached to the work.`
- `Automate handoffs Move work between teams without anyone chasing a status update.`
- `Report on delivery Cycle time, throughput and where things actually get stuck.`
- `Just me`
- `2–10`
- `11–50`
- `50+`
- `Back`
- `Continue`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 160)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb102nh9q` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb10jxnt8` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb115vrc0` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb11sni92` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb13fz5p5` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb13wowbr` | `@layer utilities` | `align-items: center;` |
| `rb13yi204` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb14ih9e2` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb155frui` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb15jlfjl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb167ne0k` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb16hdgc9` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.5);` |
| `rb16jx2sy` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb17l8x7p` | `@layer utilities` | `max-width: 100%;` |
| `rb17u0rj3` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb18ehpqa` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb18l6hzt` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb19f8cl8` | `@layer utilities` | `white-space: nowrap;` |
| `rb19y1ey4` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb1aaamzo` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 5px;` |
| `rb1ak72s1` | `@layer utilities` | `margin-block: auto;` |
| `rb1awbg6z` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1awujjr` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1bbeonn` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb1bfukgd` | `@layer utilities` | `display: grid;` |
| `rb1birygc` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1coa15b` | `@layer utilities` | `inset-inline-end: calc(var(--spacing)*4);` |
| `rb1cqx8tq` | `@layer utilities` | `user-select: none;` |
| `rb1dthhac` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1e1ru11` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb1ejntls` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1foljff` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1g3wci5` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1gd67u1` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1gtcvus` | `@layer utilities` | `width: 100%;` |
| `rb1haz17r` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb1hfbicb` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1htwc9j` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.4);` |
| `rb1hz8j56` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1ibaknk` | `@layer utilities` | `display: inline-flex;` |
| `rb1ijl2e` | `@layer utilities` | `display: flex;` |
| `rb1j3qrfj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1jhn5ex` | `@layer utilities` | `grid-template-columns: repeat(1, minmax(0px, 1fr));` |
| `rb1jhsb5c` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.4);` |
| `rb1jizbgk` | `@layer utilities` | `padding-right: calc(var(--spacing)*6);` |
| `rb1jvhmiv` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1jvmay` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1ldaxsv` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1ltsenr` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1lyf18j` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1msyg16` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1mz81rl` | `@layer utilities` | `position: relative;` |
| `rb1oqgx12` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1osmb15` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1owf093` | `@layer utilities` | `justify-content: center;` |
| `rb1qmt0lb` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1qy2si2` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb1r50r0w` | `@layer utilities › @media (hover: hover)` | `border-color: var(--color-neutral-900);` |
| `rb1rr4kex` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1rwv8rj` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb1saqm6x` | `@layer utilities` | `top: calc(var(--spacing)*4);` |
| `rb1tsza8o` | `@layer utilities` | `text-align: left;` |
| `rb1uitrav` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1vyjie2` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1w25uz2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1w8zuep` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1wn59t3` | `@layer utilities` | `transition-property: background-color, border-color, box-shadow, outline-color; transition-timing-function: var(--tw-ease,var(--default-tran` |
| `rb1wujg9f` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb1xzssf` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb1yborb2` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1yih2f9` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1ylx6qi` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1ypl9qj` | `@layer utilities` | `scale: 0.98;` |
| `rb21skm1` | `@layer utilities` | `pointer-events: none;` |
| `rb27zehe` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb2nl9m` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb2zoxme` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb351bjl` | `@layer utilities` | `color: var(--color-neutral-100);` |
