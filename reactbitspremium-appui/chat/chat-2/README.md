# chat-2

> **Category:** Chat (`chat`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/chat/chat-2](https://pro.reactbits.dev/docs/app-ui/chat/chat-2)  
> **Native Viewport:** `1280px × 680px`

Direct messages with read receipts

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`chat-2.jsx`](./chat-2.jsx) (minHeight: `680px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`chat-2.sorbet.jsx`](./chat-2.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 133 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 205 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 2 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 7 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Search conversations`
- `SA Sofia Alvarez , online 09:41 Sent the revised copy deck 2 unread`
- `MB Marcus Bell , online 09:12 Works for me, let's ship it`
- `PN Priya Nandakumar Yesterday Photo`
- `WC Wei Chen Yesterday I'll pick this up Monday`
- `TG Tomás Guerrero Tue Thanks for the review`
- `Sofia Alvarez`
- `Message Sofia Alvarez`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 204)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb102cd0x` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb10jcdaj` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb10vcurc` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb11gndch` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb11iaw16` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb11sav7e` | `@layer utilities` | `display: none;` |
| `rb11xmqz0` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb121lyww` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb134vwg8` | `@layer utilities` | `gap: calc(var(--spacing)*2.5);` |
| `rb138owpj` | `@layer utilities` | `justify-content: flex-start;` |
| `rb146dl8y` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb146znu3` | `@layer utilities` | `cursor: progress;` |
| `rb149yinq` | `@layer utilities` | `max-width: 100%;` |
| `rb1594bgt` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb15adrfm` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb15d2c41` | `@layer utilities` | `display: inline-flex;` |
| `rb15f65g6` | `@layer utilities` | `align-items: baseline;` |
| `rb15mqzoz` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb162rqok` | `@layer utilities` | `cursor: pointer;` |
| `rb169a8ub` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb16r62u2` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb16t9g89` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb16u19vm` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb180bn8b` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb190fgxl` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb194oc6i` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb19a0yr4` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb19poedi` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb19tjsul` | `@layer utilities` | `border-radius: inherit;` |
| `rb1a64cwb` | `@layer utilities` | `position: absolute;` |
| `rb1a7k4d7` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*3);` |
| `rb1ar4jxh` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb1b6e1oh` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1b848s6` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1d1xiqk` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1e0j1zu` | `@layer utilities` | `overflow-wrap: anywhere;` |
| `rb1ecq0l8` | `@layer utilities` | `pointer-events: none;` |
| `rb1edwidb` | `@layer utilities` | `width: 100%;` |
| `rb1ffgj73` | `@layer utilities` | `overflow: hidden;` |
| `rb1fnt6ol` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1g06noo` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1g0a7cj` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1g0yec2` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1g7sdlo` | `@layer utilities` | `justify-content: center;` |
| `rb1gn0t88` | `@layer utilities` | `align-items: center;` |
| `rb1gqujra` | `@layer utilities` | `white-space: pre-wrap;` |
| `rb1gsa78q` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1h4w98s` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1h6k649` | `@layer utilities` | `margin-inline: auto;` |
| `rb1hdce4r` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1hfkh0f` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1hm0wlf` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb1hovgmq` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1hw0iae` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb1i603zd` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb1ikhs92` | `@layer utilities` | `padding: calc(var(--spacing)*3);` |
| `rb1inl69s` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1iuhdy1` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb1ivapab` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb1jeglbz` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1kbx55c` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1kzurt2` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1l9qv1` | `@layer utilities` | `width: fit-content;` |
| `rb1loz68u` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1lpbj8b` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1n5p5g3` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1okcmqd` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1pk4gaf` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1pv5soa` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1rht18q` | `@layer utilities` | `display: grid;` |
| `rb1rni92` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb1s1iyt1` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb1sppcb9` | `@layer utilities` | `cursor: default;` |
| `rb1to1ouh` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1toqqiy` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1tzx0nq` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1u5r8e7` | `@layer utilities` | `flex: 1 1 auto;` |
| `rb1uv79yo` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
