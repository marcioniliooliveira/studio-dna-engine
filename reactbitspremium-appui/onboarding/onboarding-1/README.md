# onboarding-1

> **Category:** Onboarding (`onboarding`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/onboarding/onboarding-1](https://pro.reactbits.dev/docs/app-ui/onboarding/onboarding-1)  
> **Native Viewport:** `1280px × 640px`

Profile setup with a live preview

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`onboarding-1.jsx`](./onboarding-1.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`onboarding-1.sorbet.jsx`](./onboarding-1.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 60 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 211 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 3 / 0 / 1 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | `combobox` |

### Visible Headings & Interactive Labels
- `Set up your profile`
- `Upload photo`
- `Full name *`
- `Job title`
- `Timezone`
- `Berlin (GMT+1)`
- `Send me product updates and workspace tips.`
- `Continue`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 206)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb106po6o` | `@layer utilities` | `border-radius: inherit;` |
| `rb11prmex` | `@layer utilities › @media (min-width: 64rem)` | `display: flex;` |
| `rb12l6s8f` | `@layer utilities` | `opacity: 0;` |
| `rb133ajn0` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb13bamgb` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb13fz5p5` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb13wowbr` | `@layer utilities` | `align-items: center;` |
| `rb13yhy2e` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb13yi204` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb14dovab` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb14ih9e2` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb14zaxbl` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb155frui` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb15jlfjl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb15nch8t` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb167ne0k` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb16hdgc9` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.5);` |
| `rb16jx2sy` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb17hn33m` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb17jursv` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb17xhya2` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb18ehpqa` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb18eo45y` | `@layer utilities` | `cursor: default;` |
| `rb19f8cl8` | `@layer utilities` | `white-space: nowrap;` |
| `rb19y1ey4` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb1awbg6z` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1bbeonn` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb1bc9u6h` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1bdpdbv` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1bfucmg` | `@layer utilities` | `min-width: 100%;` |
| `rb1bfukgd` | `@layer utilities` | `display: grid;` |
| `rb1birygc` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1cj4y54` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1coj93e` | `@layer utilities` | `color-scheme: dark;` |
| `rb1cqcdtb` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1cqx8tq` | `@layer utilities` | `user-select: none;` |
| `rb1dthhac` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1ejntls` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1etnfar` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1ewqibv` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1fdmmop` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1foljff` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1g2ipyx` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1g65l79` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb1g7lfrm` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb1ga0o0g` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1gak3ay` | `@layer utilities` | `justify-content: space-between;` |
| `rb1gd67u1` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1gtcvus` | `@layer utilities` | `width: 100%;` |
| `rb1haddhc` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1hfbicb` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1ht5cz6` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1hz8j56` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1ibaknk` | `@layer utilities` | `display: inline-flex;` |
| `rb1ijl2e` | `@layer utilities` | `display: flex;` |
| `rb1inocc0` | `@layer utilities` | `grid-template-columns: repeat(2, minmax(0px, 1fr));` |
| `rb1ix2kve` | `@layer utilities` | `opacity: 1;` |
| `rb1j3qrfj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1jhsb5c` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.4);` |
| `rb1jvhmiv` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1jvmay` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1kwxf2r` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1ldaxsv` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1lehxzp` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1ltsenr` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1lyf18j` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1msyg16` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1mz81rl` | `@layer utilities` | `position: relative;` |
| `rb1o073g` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb1oqgx12` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1osmb15` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1owf093` | `@layer utilities` | `justify-content: center;` |
| `rb1pj8wo3` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb1pqkhfi` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1q017h7` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb1q1b8qw` | `@layer utilities › @media (min-width: 64rem)` | `max-width: 46%;` |
| `rb1qmt0lb` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1qy2si2` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
