# feedback-6

> **Category:** Feedback (`feedback`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/feedback/feedback-6](https://pro.reactbits.dev/docs/app-ui/feedback/feedback-6)  
> **Native Viewport:** `1280px × 640px`

Insights with sentiment and themes

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`feedback-6.jsx`](./feedback-6.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`feedback-6.sorbet.jsx`](./feedback-6.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 169 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 156 |
| **Buttons** | 3 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 9 / 0 |
| **ARIA Roles** | `radiogroup`, `radio`, `img` |

### Visible Headings & Interactive Labels
- `Feedback insights`
- `30 days`
- `90 days`
- `12 months`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 149)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb114xh06` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb11tfia3` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb11wdswo` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb11yyx88` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb12quka9` | `@layer utilities` | `max-width: 100%;` |
| `rb12sjaad` | `@layer utilities` | `width: 6px; height: 6px;` |
| `rb1331ajy` | `@layer utilities` | `justify-content: space-between;` |
| `rb136gn7b` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb139lzy6` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb13fz4ps` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb13iqw8f` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb155shjf` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb15dwckl` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb15l9gy1` | `@layer utilities › @container (min-width: 28rem)` | `grid-template-columns: none;` |
| `rb15wkkeq` | `@layer utilities` | `container-type: inline-size;` |
| `rb16bymu` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb16hm0h1` | `@layer utilities` | `pointer-events: none;` |
| `rb1768107` | `@layer utilities` | `cursor: pointer;` |
| `rb17m3i0g` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb17vr29g` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-flow: column;` |
| `rb18cxfcp` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb18gp4w` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb18mx11o` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb199jp21` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb19belpv` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb19g3oza` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1bbxkvj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1c1omao` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1c3t7j8` | `@layer utilities` | `grid-column: 1 / -1;` |
| `rb1cnkd1i` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1dmah8r` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1dp8kuk` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-columns: minmax(0px, 1fr);` |
| `rb1e0dbry` | `@layer utilities › @media (min-width: 40rem)` | `justify-content: space-between;` |
| `rb1egc14k` | `@layer utilities` | `grid-template-columns: repeat(2, minmax(0px, 1fr));` |
| `rb1ewpuro` | `@layer utilities` | `column-gap: calc(var(--spacing)*1);` |
| `rb1gfo842` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1ghkrr8` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1gisq8k` | `@layer utilities` | `display: inline-flex;` |
| `rb1h2nhjn` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1h2s1s6` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1hikji2` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb1j0kgt7` | `@layer utilities` | `align-items: stretch;` |
| `rb1jiyw4h` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1jns3fl` | `@layer utilities` | `transition-property: width; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var(-` |
| `rb1jqxpx8` | `@layer utilities › @media (min-width: 64rem)` | `grid-template-columns: 1fr 320px;` |
| `rb1kjlmkb` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1km0aup` | `@layer utilities` | `flex-direction: column;` |
| `rb1lfylff` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb1lpplou` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1lwm74l` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1mdutv1` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1mvlvpa` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1nfd7xx` | `@layer utilities` | `position: relative;` |
| `rb1nmy0xt` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1o1dddm` | `@layer utilities` | `display: block;` |
| `rb1ozxg9m` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1p2izpn` | `@layer utilities` | `overflow-y: auto;` |
| `rb1pwqaeq` | `@layer utilities` | `overflow: hidden;` |
| `rb1qdqmln` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1qnywlt` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1qv6ai` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1qyjksz` | `@layer utilities › @media (min-width: 40rem)` | `align-items: center;` |
| `rb1rqjeok` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1rtjf30` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.07);` |
| `rb1s0j0dj` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1s4dwq2` | `@layer utilities` | `display: flex;` |
| `rb1sdimgy` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1sqx03g` | `@layer utilities` | `height: calc(var(--spacing)*2);` |
| `rb1thh18u` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1tkvt6d` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb1tqk5yg` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1vit116` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1vkkduo` | `@layer utilities` | `white-space: nowrap;` |
| `rb1vnrr3b` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1wijpj1` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1xrfr98` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb1ysseb3` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb21jibf` | `@layer utilities` | `opacity: 0;` |
