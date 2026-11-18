# chat-3

> **Category:** Chat (`chat`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/chat/chat-3](https://pro.reactbits.dev/docs/app-ui/chat/chat-3)  
> **Native Viewport:** `1280px × 800px`

Social thread with nested replies

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`chat-3.jsx`](./chat-3.jsx) (minHeight: `800px`, hooks: `useRef`, `useState`)
- **Sorbet Source:** [`chat-3.sorbet.jsx`](./chat-3.sorbet.jsx) (minHeight: `800px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 90 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 155 |
| **Buttons** | 12 |
| **Inputs / Textareas / Selects** | 0 / 1 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 7 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `24`
- `41`
- `318`
- `Post a reply`
- `Reply`
- `Most recent`
- `42`
- `17`
- `9`
- `Show 21 more replies`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 154)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb109crlk` | `@layer utilities` | `column-gap: calc(var(--spacing)*2);` |
| `rb10vcurc` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1175jo4` | `@layer utilities` | `min-height: 800px;` |
| `rb134vwg8` | `@layer utilities` | `gap: calc(var(--spacing)*2.5);` |
| `rb13a6dj0` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb146znu3` | `@layer utilities` | `cursor: progress;` |
| `rb15adrfm` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb15d2c41` | `@layer utilities` | `display: inline-flex;` |
| `rb15f65g6` | `@layer utilities` | `align-items: baseline;` |
| `rb15izg3j` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb15mqzoz` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb15zan5c` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb162rqok` | `@layer utilities` | `cursor: pointer;` |
| `rb169a8ub` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb16r62u2` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb16simgw` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb16t9g89` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb180bn8b` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb187hb3y` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb194oc6i` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb19tjsul` | `@layer utilities` | `border-radius: inherit;` |
| `rb1a64cwb` | `@layer utilities` | `position: absolute;` |
| `rb1ar4jxh` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb1cb5oac` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1eazv3b` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1ecq0l8` | `@layer utilities` | `pointer-events: none;` |
| `rb1edwidb` | `@layer utilities` | `width: 100%;` |
| `rb1ffgj73` | `@layer utilities` | `overflow: hidden;` |
| `rb1fnt6ol` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1frtz2j` | `@layer utilities` | `height: calc(var(--spacing)*11);` |
| `rb1g06noo` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1g0a7cj` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1g7sdlo` | `@layer utilities` | `justify-content: center;` |
| `rb1gn0t88` | `@layer utilities` | `align-items: center;` |
| `rb1gsa78q` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1h4w98s` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1h6k649` | `@layer utilities` | `margin-inline: auto;` |
| `rb1hdce4r` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1hfkh0f` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1hm0wlf` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb1hovgmq` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1ikhs92` | `@layer utilities` | `padding: calc(var(--spacing)*3);` |
| `rb1inl69s` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1ivapab` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb1jeglbz` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1kzurt2` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1loz68u` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1n5p5g3` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1okcmqd` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1pk4gaf` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1s1iyt1` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb1s35dei` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1t42nto` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1to1ouh` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1toqqiy` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1u5r8e7` | `@layer utilities` | `flex: 1 1 auto;` |
| `rb1uv79yo` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1v9rieb` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1vdv14l` | `@layer utilities` | `min-height: calc(var(--spacing)*5);` |
| `rb1vg2kkb` | `@layer utilities` | `align-items: flex-start;` |
| `rb1vovlm5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1w1eli3` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1xndbiv` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1xwxxou` | `@layer utilities` | `overflow-y: auto;` |
| `rb2fvjtq` | `@layer utilities` | `flex-shrink: 0;` |
| `rb2la8sh` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb3wxyun` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb3x9r9m` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb4e74zk` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb61yl0p` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb7ejcm0` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb7kta43` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb7qa6p8` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb7yijzy` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb88i5ox` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb8e5tut` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb8fjvt4` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb8riidd` | `@layer utilities` | `min-height: calc(var(--spacing)*12);` |
