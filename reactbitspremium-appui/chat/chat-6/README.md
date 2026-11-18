# chat-6

> **Category:** Chat (`chat`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/chat/chat-6](https://pro.reactbits.dev/docs/app-ui/chat/chat-6)  
> **Native Viewport:** `1280px × 680px`

Live stream chat with badges

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`chat-6.jsx`](./chat-6.jsx) (minHeight: `680px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`chat-6.sorbet.jsx`](./chat-6.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 115 |
| **Max DOM Depth** | 9 |
| **Atomic/Scoped Classes** | 189 |
| **Buttons** | 11 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 5 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Live: designing dense interfaces`
- `Follow`
- `Send a message to the stream`
- `In the room`
- `Rowan Diaz`
- `Junie Park`
- `Sam Ottoline`
- `kestrel`
- `mattlives`
- `aurelia`
- `tinyhaus`
- `devon.b`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 186)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb102cd0x` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb10jcdaj` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb10vcurc` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb11gndch` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb11sav7e` | `@layer utilities` | `display: none;` |
| `rb134vwg8` | `@layer utilities` | `gap: calc(var(--spacing)*2.5);` |
| `rb137elnl` | `@layer utilities › @media (min-width: 64rem)` | `min-height: calc(var(--spacing)*0);` |
| `rb146znu3` | `@layer utilities` | `cursor: progress;` |
| `rb15adrfm` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb15d2c41` | `@layer utilities` | `display: inline-flex;` |
| `rb15izg3j` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb15mqzoz` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb162rqok` | `@layer utilities` | `cursor: pointer;` |
| `rb16r62u2` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb16simgw` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb16u19vm` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb180bn8b` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb187hb3y` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb194oc6i` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb19a0yr4` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb19tjsul` | `@layer utilities` | `border-radius: inherit;` |
| `rb1a64cwb` | `@layer utilities` | `position: absolute;` |
| `rb1aka9uu` | `@layer utilities` | `margin-right: calc(var(--spacing)*1.5);` |
| `rb1ar4jxh` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb1b6e1oh` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1bx19wi` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1cb5oac` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1d1xiqk` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1d5ubzc` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1eazv3b` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1ecq0l8` | `@layer utilities` | `pointer-events: none;` |
| `rb1edwidb` | `@layer utilities` | `width: 100%;` |
| `rb1ffgj73` | `@layer utilities` | `overflow: hidden;` |
| `rb1fnemir` | `@layer utilities` | `transition-property: background-color, color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transiti` |
| `rb1g06noo` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1g0a7cj` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1g7sdlo` | `@layer utilities` | `justify-content: center;` |
| `rb1gn0t88` | `@layer utilities` | `align-items: center;` |
| `rb1gsa78q` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1h4w98s` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1hdce4r` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1hfkh0f` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1hm0wlf` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb1hovgmq` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1i25diq` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1i603zd` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb1ikhs92` | `@layer utilities` | `padding: calc(var(--spacing)*3);` |
| `rb1inl69s` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1iuhdy1` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb1ivapab` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb1jeglbz` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1jhasj8` | `@layer utilities` | `min-height: 440px;` |
| `rb1jr19m9` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1juk1ck` | `@layer utilities` | `width: 20px; height: 20px;` |
| `rb1kbx55c` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1kzurt2` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1l9qv1` | `@layer utilities` | `width: fit-content;` |
| `rb1loz68u` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1lpbj8b` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1n5p5g3` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1n9yb35` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1okcmqd` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1oymxgy` | `@layer utilities › @media (min-width: 64rem)` | `grid-template-columns: 1fr 220px;` |
| `rb1pk4gaf` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1rht18q` | `@layer utilities` | `display: grid;` |
| `rb1s1iyt1` | `@layer utilities` | `background-image: linear-gradient(180deg,var(--rb-accent,oklch(20.5% 0 0)),var(--rb-accent,oklch(20.5% 0 0)));` |
| `rb1s35dei` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1t42nto` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1to1ouh` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1toqqiy` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1tzx0nq` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1u5r8e7` | `@layer utilities` | `flex: 1 1 auto;` |
| `rb1uv79yo` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1uxkg3v` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1v9rieb` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1vdv14l` | `@layer utilities` | `min-height: calc(var(--spacing)*5);` |
| `rb1vg2kkb` | `@layer utilities` | `align-items: flex-start;` |
| `rb1vovlm5` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
