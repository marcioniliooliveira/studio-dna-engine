# feedback-1

> **Category:** Feedback (`feedback`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/feedback/feedback-1](https://pro.reactbits.dev/docs/app-ui/feedback/feedback-1)  
> **Native Viewport:** `1280px × 560px`

In-app feedback widget with screenshots

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`feedback-1.jsx`](./feedback-1.jsx) (minHeight: `560px`, hooks: `useState`)
- **Sorbet Source:** [`feedback-1.sorbet.jsx`](./feedback-1.sorbet.jsx) (minHeight: `560px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 45 |
| **Max DOM Depth** | 7 |
| **Atomic/Scoped Classes** | 164 |
| **Buttons** | 7 |
| **Inputs / Textareas / Selects** | 0 / 1 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 5 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Send feedback`
- `Idea`
- `Issue`
- `Praise`
- `Your feedback`
- `Screenshot attached`
- `Cancel`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 164)

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
| `rb11yyx88` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb12quka9` | `@layer utilities` | `max-width: 100%;` |
| `rb1331ajy` | `@layer utilities` | `justify-content: space-between;` |
| `rb13pyqer` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb155shjf` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb15c1k4f` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb16heavq` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb16hm0h1` | `@layer utilities` | `pointer-events: none;` |
| `rb1768107` | `@layer utilities` | `cursor: pointer;` |
| `rb17rson1` | `@layer utilities` | `padding-top: calc(var(--spacing)*3);` |
| `rb17sy7yr` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1);` |
| `rb17yzquh` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb182es1q` | `@layer utilities` | `resize: none;` |
| `rb182xtnq` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb18cxfcp` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb18gp4w` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb18mx11o` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb18pkho3` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb199jp21` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb19belpv` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb19g3oza` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1azg0e5` | `@layer utilities` | `opacity: 0.4;` |
| `rb1bbxkvj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1c1omao` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1cacdw5` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb1cnkd1i` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1dfcgv4` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1dmah8r` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1dwn7jw` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1gfo842` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1ghkrr8` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1gisq8k` | `@layer utilities` | `display: inline-flex;` |
| `rb1h2nhjn` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1h2s1s6` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1hikji2` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb1iecvlx` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1ipoylg` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1j0kgt7` | `@layer utilities` | `align-items: stretch;` |
| `rb1jiyw4h` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1kjlmkb` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1km0aup` | `@layer utilities` | `flex-direction: column;` |
| `rb1l24sid` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1lfylff` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb1lpplou` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1lwm74l` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1m08uw7` | `@layer utilities` | `max-height: calc(var(--spacing)*40);` |
| `rb1mdusy8` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1mdutv1` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1nfd7xx` | `@layer utilities` | `position: relative;` |
| `rb1nlju7j` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1nmy0xt` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1nt4my8` | `@layer utilities` | `field-sizing: content;` |
| `rb1p2izpn` | `@layer utilities` | `overflow-y: auto;` |
| `rb1pwqaeq` | `@layer utilities` | `overflow: hidden;` |
| `rb1qdqmln` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1qv6ai` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1rmylbk` | `@layer utilities` | `height: calc(var(--spacing)*6);` |
| `rb1rqjeok` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1s0j0dj` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1s4dwq2` | `@layer utilities` | `display: flex;` |
| `rb1sdimgy` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1ski7rh` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1ss6i9o` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1sxihjb` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1tqk5yg` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1v67o4e` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1vit116` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1vkkduo` | `@layer utilities` | `white-space: nowrap;` |
| `rb1w1aaw0` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1w3mjfs` | `@layer utilities` | `--tw-shadow: 0 12px 24px -12px var(--tw-shadow-color,#0003);` |
| `rb1wijpj1` | `@layer utilities` | `transform-origin: 0px 0px;` |
