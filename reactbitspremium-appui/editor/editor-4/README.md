# editor-4

> **Category:** Editor (`editor`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/editor/editor-4](https://pro.reactbits.dev/docs/app-ui/editor/editor-4)  
> **Native Viewport:** `1280px × 680px`

Suggestion review side panel

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`editor-4.jsx`](./editor-4.jsx) (minHeight: `680px`, hooks: `after`, `before`, `id`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`editor-4.sorbet.jsx`](./editor-4.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 95 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 157 |
| **Buttons** | 10 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 7 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Streaming meter rollout`
- `should probably be rolled out slowly`
- `a drift of under 0.5%`
- `customers on the bigger plans`
- `Accept all`
- `Accept`
- `Dismiss`
- `Resolve`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 152)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1081n5w` | `@layer utilities` | `padding-block: calc(var(--spacing)*.5);` |
| `rb10anan4` | `@layer utilities` | `overflow: hidden;` |
| `rb10i7wwu` | `@layer utilities` | `white-space: nowrap;` |
| `rb112xtsf` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb113zeis` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb11nfrir` | `@layer utilities` | `width: 24px; height: 24px;` |
| `rb12f0cbb` | `@layer utilities` | `padding-inline: calc(var(--spacing)*.5);` |
| `rb13fqu49` | `@layer utilities` | `overflow-y: auto;` |
| `rb13fv2ls` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb14da1v` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb14rcusk` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb158nctg` | `@layer utilities` | `cursor: progress;` |
| `rb15bc26i` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb15lbnvh` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb162j88p` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb16j90y8` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb16u19d4` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb16zg63j` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb178103n` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb17yp20y` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb183kobu` | `@layer utilities` | `text-align: left;` |
| `rb186dfgm` | `@layer utilities › @media (min-width: 64rem)` | `width: 336px;` |
| `rb187z9tz` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb18o4gao` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb192urt` | `@layer utilities` | `outline-offset: 2px;` |
| `rb19bwbkx` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb19iy95h` | `@layer utilities` | `opacity: 0;` |
| `rb19mttf7` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1ad9yz3` | `@layer utilities › @media (min-width: 64rem)` | `margin-inline-end: calc(var(--spacing)*0);` |
| `rb1avalt5` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1b0elzl` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1bnicfg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1ckwl8k` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1crgr7c` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1crixy4` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1cysp67` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1dab1fc` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1dvhcq0` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1fcntw0` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1grtfq6` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1gxak09` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1h2g1ii` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1hapw2i` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1i076bw` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1iha7wq` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1ipc2gq` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*8);` |
| `rb1j01ttl` | `@layer utilities` | `height: 52px;` |
| `rb1kh40l4` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1l11zwz` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb1ln3513` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1lyfyox` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1m3tdqb` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1mk1ghe` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1mynu02` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1oop1ug` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1ovvure` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1p06f6a` | `@layer utilities` | `white-space: normal;` |
| `rb1qow4gj` | `@layer utilities` | `padding: calc(var(--spacing)*2.5);` |
| `rb1qxtp2e` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb1rebdtl` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1rr5es2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1ryi68a` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1s6kha8` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1t6hnn9` | `@layer utilities` | `--tw-tracking: -.01em; letter-spacing: -0.01em;` |
| `rb1u2jikj` | `@layer utilities` | `opacity: 0.4;` |
| `rb1ubs7jh` | `@layer utilities` | `scale: 0.98;` |
| `rb1uessc6` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1uitj5p` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1uw40pp` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1vu1fz4` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb1vwghvc` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1wfipon` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1wuj5k3` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1x4ir92` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1yag1m` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb1ygw9zi` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1yso628` | `@layer utilities` | `justify-content: space-between;` |
| `rb209gpc` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
