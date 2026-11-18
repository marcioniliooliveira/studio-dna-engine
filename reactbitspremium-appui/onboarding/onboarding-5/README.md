# onboarding-5

> **Category:** Onboarding (`onboarding`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/onboarding/onboarding-5](https://pro.reactbits.dev/docs/app-ui/onboarding/onboarding-5)  
> **Native Viewport:** `1280px × 640px`

Invite teammates with role selects

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`onboarding-5.jsx`](./onboarding-5.jsx) (minHeight: `640px`, hooks: `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`onboarding-5.sorbet.jsx`](./onboarding-5.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 55 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 171 |
| **Buttons** | 8 |
| **Inputs / Textareas / Selects** | 3 / 0 / 2 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 6 / 0 |
| **ARIA Roles** | `status`, `combobox` |

### Visible Headings & Interactive Labels
- `Invite your team`
- `Copy`
- `Email address`
- `Role`
- `Admin`
- `Member`
- `Add another`
- `Skip for now`
- `Send 1 invitation`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 168)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb115vrc0` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb11sni92` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb124gshq` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb12juvp7` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb133ajn0` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb13fz5p5` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb13wowbr` | `@layer utilities` | `align-items: center;` |
| `rb13yhy2e` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb13yi204` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb14dovab` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb14ih9e2` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb14zaxbl` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb15jlfjl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb167ne0k` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb16jx2sy` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb18ehpqa` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb18eo45y` | `@layer utilities` | `cursor: default;` |
| `rb19f8cl8` | `@layer utilities` | `white-space: nowrap;` |
| `rb1ak72s1` | `@layer utilities` | `margin-block: auto;` |
| `rb1awbg6z` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1bbeonn` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb1bdpdbv` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1bfucmg` | `@layer utilities` | `min-width: 100%;` |
| `rb1birygc` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1cj4y54` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1coj93e` | `@layer utilities` | `color-scheme: dark;` |
| `rb1cqx8tq` | `@layer utilities` | `user-select: none;` |
| `rb1dthhac` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1ejntls` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1etnfar` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1ewqibv` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1foljff` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1g65l79` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
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
| `rb1iq4ngv` | `@layer utilities` | `align-items: flex-end;` |
| `rb1j3qrfj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1jjb9rs` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1jvhmiv` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1jvmay` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1kwxf2r` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1ldaxsv` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1lehxzp` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1lntbvy` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1ltsenr` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1lyf18j` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1msyg16` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1mz81rl` | `@layer utilities` | `position: relative;` |
| `rb1oqgx12` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1osmb15` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1owf093` | `@layer utilities` | `justify-content: center;` |
| `rb1pj8wo3` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb1pqkhfi` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1q017h7` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb1qmt0lb` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1qy2si2` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb1rark0u` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1s2fm31` | `@layer utilities` | `max-width: 560px;` |
| `rb1tbfe0r` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1tsza8o` | `@layer utilities` | `text-align: left;` |
| `rb1uv5pa3` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1vyjie2` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1w8zuep` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1wkjukg` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1wujg9f` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb1wy76lc` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1xb1gzl` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1xzssf` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb1y8hgqa` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1yborb2` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
