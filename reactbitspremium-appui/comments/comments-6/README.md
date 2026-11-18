# comments-6

> **Category:** Comments (`comments`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/comments/comments-6](https://pro.reactbits.dev/docs/app-ui/comments/comments-6)  
> **Native Viewport:** `1280px × 640px`

Canvas pins linked to a notes rail

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`comments-6.jsx`](./comments-6.jsx) (minHeight: `640px`, hooks: `author`, `body`, `disconnect`, `id`, `left`, `observe`, `time`, `top`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`comments-6.sorbet.jsx`](./comments-6.sorbet.jsx) (minHeight: `700px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 89 |
| **Max DOM Depth** | 13 |
| **Atomic/Scoped Classes** | 226 |
| **Buttons** | 10 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Pricing page v7`
- `1`
- `2`
- `3`
- `Resolve`
- `Locate pin`
- `Reply to pin 1`
- `Send`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 222)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb104bfva` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb117f4s2` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb119gai8` | `@layer utilities` | `min-height: 640px;` |
| `rb128cxsm` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb12a8ui6` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb12beuhs` | `@layer utilities` | `justify-content: safe center;` |
| `rb12cdb1n` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12cxm5k` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb12gp0ir` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb12xo90y` | `@layer utilities` | `justify-content: center;` |
| `rb130meyh` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb13dg6uw` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*1);` |
| `rb13rtol7` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb13ugxb5` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb13ul81e` | `@layer utilities` | `min-width: calc(var(--spacing)*5);` |
| `rb148mhnj` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb14vxluy` | `@layer utilities › @media (min-width: 64rem)` | `width: 300px;` |
| `rb14zv39b` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*3);` |
| `rb15ctwyi` | `@layer utilities` | `height: 100%;` |
| `rb15hxapa` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb17z7wkn` | `@layer utilities` | `margin-inline: auto;` |
| `rb18bhypy` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb199v5y9` | `@layer utilities › @media (min-width: 64rem)` | `max-height: none;` |
| `rb1aengf8` | `@layer utilities` | `scale: 0.98;` |
| `rb1ahv9d4` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1ajlzjl` | `@layer utilities` | `user-select: none;` |
| `rb1aqyukr` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1aruv23` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1b1ugr2` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1c4ri6o` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb1c6c5rk` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1cfsh7x` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb1cnbeef` | `@layer utilities › @media (min-width: 64rem)` | `flex-direction: row;` |
| `rb1cu0soi` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1dpoe8v` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1el0e6d` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1f2fupt` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1fbfhz3` | `@layer utilities` | `display: flex;` |
| `rb1fdeltx` | `@layer utilities` | `position: absolute;` |
| `rb1fmpwjo` | `@layer utilities` | `top: 14%;` |
| `rb1ftd6w5` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1g2vzzn` | `@layer utilities` | `inset-inline: 14%;` |
| `rb1g3csl4` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb1gdcea3` | `@layer utilities` | `height: calc(var(--spacing)*6);` |
| `rb1geo3bm` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1gez32k` | `@layer utilities` | `overflow-y: auto;` |
| `rb1gnbzz2` | `@layer utilities` | `height: calc(var(--spacing)*5);` |
| `rb1h12q42` | `@layer utilities` | `pointer-events: none;` |
| `rb1h7b7d0` | `@layer utilities` | `height: calc(var(--spacing)*3);` |
| `rb1hbznv8` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1hhat1z` | `@layer utilities` | `height: calc(var(--spacing)*2);` |
| `rb1hq2mq7` | `@layer utilities` | `display: inline-flex;` |
| `rb1hwnmgl` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1i7dyet` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1iaz270` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*8);` |
| `rb1ifbayq` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1igcauv` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1ircwj0` | `@layer utilities` | `max-width: 100%;` |
| `rb1j57h8p` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb1j8h86c` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1jloptm` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb1ju2rwj` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1jugeju` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2.5);` |
| `rb1k8sa9n` | `@layer utilities` | `width: calc(var(--spacing)*12);` |
| `rb1kqpcyy` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1ksrhnl` | `@layer utilities` | `width: calc(var(--spacing)*10);` |
| `rb1l1gftd` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*3);` |
| `rb1l9s6k0` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1lcqp1j` | `@layer utilities` | `width: calc(var(--spacing)*16);` |
| `rb1lmc5d5` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1lwpwfh` | `@layer utilities` | `width: calc(var(--spacing)*14);` |
| `rb1m04j2c` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb1m70fg8` | `@layer utilities` | `bottom: 5%;` |
| `rb1mwu8ei` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1n1frhe` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1nbese6` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1nt776k` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1ouvfsd` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.16);` |
