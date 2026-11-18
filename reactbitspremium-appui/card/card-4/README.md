# card-4

> **Category:** Cards (`card`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/card/card-4](https://pro.reactbits.dev/docs/app-ui/card/card-4)  
> **Native Viewport:** `1280px × 560px`

Agenda cards with an RSVP row

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`card-4.jsx`](./card-4.jsx) (minHeight: `560px`, hooks: `useState`)
- **Sorbet Source:** [`card-4.sorbet.jsx`](./card-4.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 140 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 109 |
| **Buttons** | 12 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 12 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Going to Roadmap review`
- `Decline Roadmap review`
- `Going to Platform standup`
- `Decline Platform standup`
- `Going to Design critique`
- `Decline Design critique`
- `Going to Pricing working group`
- `Decline Pricing working group`
- `Going to Sprint retrospective`
- `Decline Sprint retrospective`
- `Going to Customer onsite prep`
- `Decline Customer onsite prep`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 109)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb11lj7p7` | `@layer utilities` | `cursor: pointer;` |
| `rb11rbgh1` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb11xabpd` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb11yiuhy` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb12iq0es` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb137uwb0` | `@layer utilities › @media (min-width: 80rem)` | `grid-template-columns: repeat(2, minmax(0px, 1fr));` |
| `rb13owaqh` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb13vlxu5` | `@layer utilities` | `max-width: 100%;` |
| `rb15fuain` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb177705o` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb17kyyir` | `@layer utilities` | `height: 100%;` |
| `rb17wpfd1` | `@layer utilities` | `display: grid;` |
| `rb18a2h06` | `@layer utilities` | `overflow: hidden;` |
| `rb18vxs2w` | `@layer utilities` | `position: absolute;` |
| `rb190zypi` | `@layer utilities` | `user-select: none;` |
| `rb19lgsq6` | `@layer utilities` | `display: flex;` |
| `rb19xocig` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1a59zbg` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1amp2sh` | `@layer utilities` | `pointer-events: none;` |
| `rb1b131ly` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1bkcaba` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1bmpkni` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb1ciiy93` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1crfd6z` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1d3getm` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1dd3349` | `@layer utilities` | `grid-row: span 2 / span 2;` |
| `rb1diqf2z` | `@layer utilities` | `grid-template-columns: auto 1fr;` |
| `rb1e6umsm` | `@layer utilities` | `min-height: 560px;` |
| `rb1eavntf` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1fc8zfa` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1fnlmtu` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1fuet7y` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1gm9emp` | `@layer utilities` | `opacity: 0.4;` |
| `rb1gn3mr6` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb1gw6a1e` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1h3idb3` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1hm7oxw` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1ia9lna` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb1jpc815` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb1kep7qw` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1lkwss7` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1lyf3aa` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1mpq7j6` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1myhynu` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb1nhevol` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1p81n3y` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1p8goja` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1pgrpa2` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1qlbmn6` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1ssnpia` | `@layer utilities` | `cursor: progress;` |
| `rb1xrcm06` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1y2m48u` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb22g4xr` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb3jyic1` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb3xfyz3` | `@layer utilities` | `align-items: center;` |
| `rb4qpmuv` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb6gvt5f` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb74vhor` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb7jsx9x` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb9g7ymu` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb9k04rh` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb9tb9iw` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb9to9z8` | `@layer utilities` | `white-space: nowrap;` |
| `rbab9shb` | `@layer utilities` | `overflow-y: auto;` |
| `rbbje8v` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rbc0rwqm` | `@layer utilities` | `width: calc(var(--spacing)*16);` |
| `rbci3l9j` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rbcuw87t` | `@layer utilities` | `position: relative;` |
| `rbd0b9a7` | `@layer utilities` | `justify-content: center;` |
| `rbd1q0kw` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rbe57k2` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rbeajnlj` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rbeg6a8c` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rbeimbrt` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rbg37gg3` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rbgu3wyn` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rbhzlrjc` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rbjoxtze` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.16);` |
