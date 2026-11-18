# ai-chat-8

> **Category:** AI Chat (`ai-chat`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/ai-chat/ai-chat-8](https://pro.reactbits.dev/docs/app-ui/ai-chat/ai-chat-8)  
> **Native Viewport:** `1280px × 480px`

Voice composer with a live transcript

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`ai-chat-8.jsx`](./ai-chat-8.jsx) (minHeight: `480px`, hooks: `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`ai-chat-8.sorbet.jsx`](./ai-chat-8.sorbet.jsx) (minHeight: `480px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 76 |
| **Max DOM Depth** | 8 |
| **Atomic/Scoped Classes** | 131 |
| **Buttons** | 5 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 7 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Voice message`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 131)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb116nvh2` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb11sccqn` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb12ed4t8` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb12pzfmr` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb13d7hv4` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb140rmq6` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb14zgude` | `@layer utilities` | `transition-property: background-color, border-color, color, scale, outline-color; transition-timing-function: var(--tw-ease,var(--default-tr` |
| `rb15qfac6` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1682ujb` | `@layer utilities` | `min-height: 480px;` |
| `rb16fz834` | `@layer utilities` | `height: 1lh;` |
| `rb1717bhn` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb17dz7le` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb18hf7rg` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `animation: auto ease 0s 1 normal none running none;` |
| `rb19kef2u` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb19quw9w` | `@layer utilities` | `display: flex;` |
| `rb1a24dvl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1ahhqse` | `@layer utilities` | `position: absolute;` |
| `rb1anmcjh` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1c00sx1` | `@layer utilities` | `scale: 0.98;` |
| `rb1ccst8s` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1cqejya` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1ctizrw` | `@layer utilities` | `cursor: progress;` |
| `rb1cvg0dt` | `@layer utilities` | `justify-content: center;` |
| `rb1dar4wc` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1dh5ajm` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb1djxts8` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1dns3sf` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb1e0h2fv` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1eko3dw` | `@layer utilities` | `width: calc(var(--spacing)*2.5); height: calc(var(--spacing)*2.5);` |
| `rb1ev5s1v` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1f87wc0` | `@layer utilities` | `user-select: none;` |
| `rb1f99biw` | `@layer utilities` | `overflow: hidden;` |
| `rb1fbn5ob` | `@layer utilities` | `max-width: var(--container-lg);` |
| `rb1fbppy9` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1gaxsbq` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1hfkwsp` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1jgu0a1` | `@layer utilities` | `height: 100%;` |
| `rb1jqw0j` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1jr62tx` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1jruf9e` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1k0ue9e` | `@layer utilities` | `display: inline-block;` |
| `rb1k6wpfv` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb1kwej0k` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1lblni9` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1lldqk1` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1n3jov4` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*8);` |
| `rb1n3phq7` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1oarbpo` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1piobff` | `@layer utilities` | `position: relative;` |
| `rb1ps5kc2` | `@layer utilities` | `max-width: calc(var(--spacing)*40);` |
| `rb1q393o5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1q412b2` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1qytl6l` | `@layer utilities` | `border-color: currentcolor;` |
| `rb1r481tl` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1r5cp52` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1r5w4px` | `@layer utilities` | `border-radius: 2px;` |
| `rb1rrd7jy` | `@layer utilities` | `margin-left: auto;` |
| `rb1salxbv` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1shyomt` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2.5);` |
| `rb1ssixna` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1u64adc` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.16);` |
| `rb1ue7z8g` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1uqbjy4` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1v0fdi4` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1vrzit1` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1x2xiwj` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1xyaz75` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1ywyx2t` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1z2dxg` | `@layer utilities` | `align-items: flex-start;` |
| `rb268tk4` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb2j6wz` | `@layer utilities` | `margin-inline-end: calc(var(--spacing)*-1.5);` |
| `rb2v163` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb34ovf8` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb3mrj23` | `@layer utilities` | `flex-direction: column;` |
| `rb3wet5y` | `@layer utilities` | `width: calc(var(--spacing)*1);` |
| `rb4ugf6p` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb5hihww` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb727gku` | `@layer utilities` | `flex: 1 1 0%;` |
