# feedback-3

> **Category:** Feedback (`feedback`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/feedback/feedback-3](https://pro.reactbits.dev/docs/app-ui/feedback/feedback-3)  
> **Native Viewport:** `1280px × 560px`

Star rating with reason chips

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`feedback-3.jsx`](./feedback-3.jsx) (minHeight: `560px`, hooks: `useState`)
- **Sorbet Source:** [`feedback-3.sorbet.jsx`](./feedback-3.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 42 |
| **Max DOM Depth** | 7 |
| **Atomic/Scoped Classes** | 155 |
| **Buttons** | 11 |
| **Inputs / Textareas / Selects** | 0 / 1 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 5 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `How was the support you received?`
- `Took too long`
- `Had to repeat myself`
- `Answer was unclear`
- `Not actually solved`
- `Add a comment`
- `No thanks`
- `Send rating`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 155)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10186hm` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb114xh06` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb11br9d3` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb11ioroq` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb11tfia3` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb11wdswo` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb11xauxf` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb12au06i` | `@layer utilities` | `min-height: 76px;` |
| `rb12quka9` | `@layer utilities` | `max-width: 100%;` |
| `rb13fz4ps` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb13gd0i6` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.16);` |
| `rb13pyqer` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb13sv6xg` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb153wqvm` | `@layer utilities` | `margin-top: calc(var(--spacing)*5);` |
| `rb15c1k4f` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb15dwckl` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb16heavq` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb16hm0h1` | `@layer utilities` | `pointer-events: none;` |
| `rb16qlgh3` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb1768107` | `@layer utilities` | `cursor: pointer;` |
| `rb17d2ri3` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb17yzquh` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb182es1q` | `@layer utilities` | `resize: none;` |
| `rb18cxfcp` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb18jclzj` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb18mx11o` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb18pkho3` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb199jp21` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb19belpv` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb19g3oza` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb19hlxqo` | `@layer utilities` | `transition-property: background-color, border-color, color, scale, outline-color; transition-timing-function: var(--tw-ease,var(--default-tr` |
| `rb19q3664` | `@layer utilities` | `margin-inline: auto;` |
| `rb19sudhw` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb1acler2` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1amfgfr` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1azg0e5` | `@layer utilities` | `opacity: 0.4;` |
| `rb1bbxkvj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1c1omao` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1cacdw5` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb1dfcgv4` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1dmah8r` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1dwn7jw` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1edhsu` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1fgp25m` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1g0vrx6` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1gery1j` | `@layer utilities` | `justify-content: safe center;` |
| `rb1gfo842` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1gisq8k` | `@layer utilities` | `display: inline-flex;` |
| `rb1h2nhjn` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1h2s1s6` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1ipoylg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1jiyw4h` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1km0aup` | `@layer utilities` | `flex-direction: column;` |
| `rb1lpplou` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1mdusy8` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1mdutv1` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1n46zyr` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1nb5x2r` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1nfd7xx` | `@layer utilities` | `position: relative;` |
| `rb1nlju7j` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1nmy0xt` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1nt4my8` | `@layer utilities` | `field-sizing: content;` |
| `rb1o1dddm` | `@layer utilities` | `display: block;` |
| `rb1oiskwl` | `@layer utilities` | `opacity: 0.4;` |
| `rb1p2izpn` | `@layer utilities` | `overflow-y: auto;` |
| `rb1pwqaeq` | `@layer utilities` | `overflow: hidden;` |
| `rb1qdqmln` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1rdqt00` | `@layer utilities` | `max-height: 256px;` |
| `rb1rqjeok` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1rt2lki` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1rwy70j` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb1s4dwq2` | `@layer utilities` | `display: flex;` |
| `rb1ski7rh` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1sxihjb` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1tqk5yg` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1ud688z` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1ugn0tc` | `@layer utilities` | `text-align: center;` |
| `rb1v67o4e` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
