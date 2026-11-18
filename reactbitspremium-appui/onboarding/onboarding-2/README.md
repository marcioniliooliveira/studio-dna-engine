# onboarding-2

> **Category:** Onboarding (`onboarding`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/onboarding/onboarding-2](https://pro.reactbits.dev/docs/app-ui/onboarding/onboarding-2)  
> **Native Viewport:** `1280px × 720px`

Six-step vertical stepper

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`onboarding-2.jsx`](./onboarding-2.jsx) (minHeight: `720px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`onboarding-2.sorbet.jsx`](./onboarding-2.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 65 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 159 |
| **Buttons** | 7 |
| **Inputs / Textareas / Selects** | 2 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 0 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `1 Profile , current Basic profile details.`
- `2 Role Tune starter views.`
- `3 Source Optional discovery signal.`
- `4 Workspace Name the workspace.`
- `5 Goals Pick first workflows.`
- `6 Invite Add teammates.`
- `Set up your profile`
- `Full name`
- `Job title`
- `Continue`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 157)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb11prmex` | `@layer utilities › @media (min-width: 64rem)` | `display: flex;` |
| `rb1202243` | `@layer utilities` | `border-color: var(--color-neutral-900);` |
| `rb12chd0s` | `@layer utilities` | `min-height: 720px;` |
| `rb12l6s8f` | `@layer utilities` | `opacity: 0;` |
| `rb13fz5p5` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb13wowbr` | `@layer utilities` | `align-items: center;` |
| `rb13yhy2e` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb13yi204` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb148e5q2` | `@layer utilities › @media (min-width: 64rem)` | `margin-top: calc(var(--spacing)*0);` |
| `rb14dovab` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb14ih9e2` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb14kjj6s` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb14zaxbl` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb15jlfjl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb167ne0k` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb16jx2sy` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb17hn33m` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb17xhya2` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb18ehpqa` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb18eo45y` | `@layer utilities` | `cursor: default;` |
| `rb19f8cl8` | `@layer utilities` | `white-space: nowrap;` |
| `rb1a1fhmd` | `@layer utilities` | `place-items: center;` |
| `rb1awbg6z` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1bbeonn` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb1bc9u6h` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1bdpdbv` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1bfukgd` | `@layer utilities` | `display: grid;` |
| `rb1birygc` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1coj93e` | `@layer utilities` | `color-scheme: dark;` |
| `rb1cqx8tq` | `@layer utilities` | `user-select: none;` |
| `rb1dthhac` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1e1ru11` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb1ejntls` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1etnfar` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1ewqibv` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1foljff` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1g65l79` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb1ga0o0g` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1gtcvus` | `@layer utilities` | `width: 100%;` |
| `rb1haddhc` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1ht5cz6` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1hz8j56` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1ibaknk` | `@layer utilities` | `display: inline-flex;` |
| `rb1ijl2e` | `@layer utilities` | `display: flex;` |
| `rb1kthkt6` | `@layer utilities` | `max-width: 440px;` |
| `rb1ldaxsv` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1lejm5g` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1ltsenr` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1mo4u5g` | `@layer utilities` | `padding-top: calc(var(--spacing)*4);` |
| `rb1msyg16` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1mz81rl` | `@layer utilities` | `position: relative;` |
| `rb1oqgx12` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1owf093` | `@layer utilities` | `justify-content: center;` |
| `rb1pj8wo3` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb1q017h7` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb1qcnhuu` | `@layer utilities › @media (min-width: 64rem)` | `display: none;` |
| `rb1qy2si2` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb1tbfe0r` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1tep0yt` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1tsza8o` | `@layer utilities` | `text-align: left;` |
| `rb1txoe1y` | `@layer utilities` | `display: block;` |
| `rb1uitrav` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1uv5pa3` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1vyjie2` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1w8zuep` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1wtkeyj` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1wujg9f` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb1wy76lc` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1x4j1ye` | `@layer utilities` | `padding-inline: calc(var(--spacing)*6);` |
| `rb1xb1gzl` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1xyhv1b` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1);` |
| `rb1xzssf` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb1y0c71v` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*10);` |
| `rb1y61fch` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-900); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1yborb2` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1yih2f9` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1ypl9qj` | `@layer utilities` | `scale: 0.98;` |
| `rb21skm1` | `@layer utilities` | `pointer-events: none;` |
