# app-shell-9

> **Category:** App Shell (`app-shell`)  
> **Domain:** App Chrome & Navigation  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/app-shell/app-shell-9](https://pro.reactbits.dev/docs/app-ui/app-shell/app-shell-9)  
> **Native Viewport:** `1280px × 720px`

AI chat frame with thread history

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`app-shell-9.jsx`](./app-shell-9.jsx) (minHeight: `720px`, hooks: `disconnect`, `focus`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`app-shell-9.sorbet.jsx`](./app-shell-9.sorbet.jsx) (minHeight: `720px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 237 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 212 |
| **Buttons** | 28 |
| **Inputs / Textareas / Selects** | 0 / 1 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 33 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `New chat`
- `Atlas 4`
- `Wren`
- `Orbit`
- `Quarterly revenue summary Atlas 4 12 messages`
- `Quarterly revenue summary`
- `Refactor auth middleware`
- `Lisbon trip itinerary`
- `Launch checklist draft`
- `Explain vector search`
- `Optimise a slow SQL query`
- `Favourites 2`
- `Templates 5`
- `History`
- `Clear history`
- `Share chat`
- `How can I help?`
- `Message Halden`
- `Search`
- `Draft an email`
- `Summarise a file`
- `Write a function`
- `Plan a trip`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 211)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb1079y6y` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb10hf7sz` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb114uaql` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb11n95vl` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1246nw1` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb12h57x9` | `@layer utilities` | `height: calc(var(--spacing)*11);` |
| `rb12qieak` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1413q4b` | `@layer utilities` | `display: inline-flex;` |
| `rb141tmc9` | `@layer utilities` | `cursor: not-allowed;` |
| `rb15048ci` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.5);` |
| `rb158s7sz` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb15qmetl` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb15st2ad` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb15v8ubx` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb162snzc` | `@layer utilities` | `width: calc(var(--spacing)*8); height: calc(var(--spacing)*8);` |
| `rb16slk42` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb16zbhj8` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb17bm4kj` | `@layer utilities` | `width: fit-content;` |
| `rb17fhbvk` | `@layer utilities` | `scale: 0.98;` |
| `rb17s0ved` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb181udmq` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb19qwc5` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1ahami7` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1anvo2` | `@layer utilities` | `align-items: center;` |
| `rb1bgj07e` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb1bjmagv` | `@layer utilities` | `margin-left: auto;` |
| `rb1bmrsro` | `@layer utilities` | `position: relative;` |
| `rb1bvkc2h` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1ccts6m` | `@layer utilities › @media (min-width: 40rem)` | `display: none;` |
| `rb1cq2z8b` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1cwx5cf` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1d3xa9h` | `@layer utilities` | `transition-property: background-color, color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transiti` |
| `rb1d9arcu` | `@layer utilities` | `cursor: pointer;` |
| `rb1de3m9k` | `@layer utilities` | `display: none;` |
| `rb1dpkigq` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-900); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1e4fu46` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb1e9fuzq` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1ex8l9q` | `@layer utilities` | `margin-left: calc(var(--spacing)*2);` |
| `rb1fi5plr` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1fmfij6` | `@layer utilities` | `--tw-tracking: -.01em; letter-spacing: -0.01em;` |
| `rb1fmlu79` | `@layer utilities` | `resize: none;` |
| `rb1g1o5pt` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb1haqai3` | `@layer utilities` | `display: flex;` |
| `rb1hfahmh` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb1hpa3bg` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb1i99ape` | `@layer utilities` | `margin-top: calc(var(--spacing)*6);` |
| `rb1ikh8mk` | `@layer utilities` | `padding-right: calc(var(--spacing)*1);` |
| `rb1inkxbt` | `@layer utilities` | `height: 60px;` |
| `rb1irsar5` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1iw5ar7` | `@layer utilities` | `white-space: nowrap;` |
| `rb1iwfi8i` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1j6chf9` | `@layer utilities` | `background-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1j7icow` | `@layer utilities` | `padding: calc(var(--spacing)*3);` |
| `rb1je6fqp` | `@layer utilities` | `padding-top: calc(var(--spacing)*4);` |
| `rb1jhahf` | `@layer utilities › @media (min-width: 40rem)` | `display: inline;` |
| `rb1jodtg9` | `@layer utilities` | `width: calc(var(--spacing)*72);` |
| `rb1jy5n4n` | `@layer utilities` | `padding-top: calc(var(--spacing)*2);` |
| `rb1k13wpf` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1k858tm` | `@layer utilities` | `padding-top: calc(var(--spacing)*1);` |
| `rb1lcmccr` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1map5d3` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1mo34vc` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1mrk539` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb1nm8d5p` | `@layer utilities` | `cursor: progress;` |
| `rb1og4bd3` | `@layer utilities` | `min-height: 720px;` |
| `rb1ohcj` | `@layer utilities` | `padding-left: calc(var(--spacing)*6);` |
| `rb1omtbpe` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1oo3zux` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1ot9lvd` | `@layer utilities › @media (min-width: 64rem)` | `display: none;` |
| `rb1pczbzg` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1pqr8m8` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1pv967t` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a);` |
| `rb1pyj4e4` | `@layer utilities` | `margin-inline-start: auto;` |
| `rb1q07yi3` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb1q52qam` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1qa0ij` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1qf8ueu` | `@layer utilities` | `justify-content: center;` |
| `rb1qzgb0m` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
