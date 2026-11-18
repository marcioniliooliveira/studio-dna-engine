# ai-chat-2

> **Category:** AI Chat (`ai-chat`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/ai-chat/ai-chat-2](https://pro.reactbits.dev/docs/app-ui/ai-chat/ai-chat-2)  
> **Native Viewport:** `1280px × 640px`

Chat with a code and document panel

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`ai-chat-2.jsx`](./ai-chat-2.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`ai-chat-2.sorbet.jsx`](./ai-chat-2.sorbet.jsx) (minHeight: `660px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 78 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 204 |
| **Buttons** | 11 |
| **Inputs / Textareas / Selects** | 0 / 1 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 6 / 0 |
| **ARIA Roles** | `status`, `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Build assistant`
- `pricing-table.tsx Open in panel`
- `Regenerate`
- `Code`
- `Document`
- `v3`
- `v2`
- `v1`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 198)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1028ysq` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb10fic6o` | `@layer utilities` | `flex: 1 1 auto;` |
| `rb10xe5tf` | `@layer utilities` | `padding-block: calc(var(--spacing)*6);` |
| `rb116nvh2` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb121cklb` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb125royg` | `@layer utilities` | `max-width: calc(100% + 16px);` |
| `rb12bc6aa` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb12pzfmr` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1340huo` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb13d7hv4` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(100% 0 0)),var(--rb-accent,oklch(100% 0 0)));` |
| `rb140rmq6` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb14pnpre` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb14w34qt` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb15qfac6` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1604ft5` | `@layer utilities` | `overscroll-behavior: contain;` |
| `rb1717bhn` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb17dz7le` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb17zn37p` | `@layer utilities` | `min-height: 640px;` |
| `rb18igy25` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb18p26ml` | `@layer utilities` | `padding-top: calc(var(--spacing)*1);` |
| `rb18qsipz` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1933mgm` | `@layer utilities › @media (min-width: 64rem)` | `flex-direction: row;` |
| `rb19icgy3` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb19kef2u` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb19quw9w` | `@layer utilities` | `display: flex;` |
| `rb19tlul5` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb19vwv2l` | `@layer utilities` | `max-width: 65ch;` |
| `rb1aamih4` | `@layer utilities` | `resize: none;` |
| `rb1ahhqse` | `@layer utilities` | `position: absolute;` |
| `rb1akkheg` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*6);` |
| `rb1anmcjh` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1asqgfj` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1bx6bbm` | `@layer utilities` | `width: fit-content;` |
| `rb1c00sx1` | `@layer utilities` | `scale: 0.98;` |
| `rb1ctizrw` | `@layer utilities` | `cursor: progress;` |
| `rb1cvg0dt` | `@layer utilities` | `justify-content: center;` |
| `rb1djxts8` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1e0h2fv` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1erqikb` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1ev5s1v` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1f1q49a` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb1f87wc0` | `@layer utilities` | `user-select: none;` |
| `rb1f99biw` | `@layer utilities` | `overflow: hidden;` |
| `rb1fbppy9` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1g49380` | `@layer utilities` | `overflow-x: auto;` |
| `rb1ga107e` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1gaxsbq` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1grghj5` | `@layer utilities` | `white-space: pre-wrap;` |
| `rb1h10sy1` | `@layer utilities` | `min-width: 6ch;` |
| `rb1h7gne` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1hfkwsp` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1j3p9eg` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1jcmwm` | `@layer utilities` | `margin-top: auto;` |
| `rb1jgu0a1` | `@layer utilities` | `height: 100%;` |
| `rb1jqw0j` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1jr62tx` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1k4bhyb` | `@layer utilities › @media (min-width: 64rem)` | `width: calc(var(--spacing)*96);` |
| `rb1kwej0k` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1l5j0im` | `@layer utilities` | `max-width: 85%;` |
| `rb1lblni9` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1lldqk1` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1lmntap` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1lukfwp` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1mgkryz` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1n3phq7` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1ngndee` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1oarbpo` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1oc09pf` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1piobff` | `@layer utilities` | `position: relative;` |
| `rb1q393o5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1q412b2` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1q6mp3z` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1qc19ze` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1qmgns7` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1qtmbak` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1qx4rdu` | `@layer utilities` | `font-size: 13px; line-height: 20px;` |
| `rb1r481tl` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1r5cp52` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
