# feedback-4

> **Category:** Feedback (`feedback`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/feedback/feedback-4](https://pro.reactbits.dev/docs/app-ui/feedback/feedback-4)  
> **Native Viewport:** `1280px × 640px`

Feature request board with votes

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`feedback-4.jsx`](./feedback-4.jsx) (minHeight: `640px`, hooks: `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`feedback-4.sorbet.jsx`](./feedback-4.sorbet.jsx) (minHeight: `740px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 113 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 194 |
| **Buttons** | 9 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 12 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Feature requests`
- `New request`
- `Top`
- `New`
- `Shipped`
- `Search requests`
- `342`
- `Dark mode for shared dashboards`
- `214`
- `Schedule exports to a Google Sheet`
- `187`
- `Row-level permissions on shared views`
- `128`
- `Webhook retries with a dead letter queue`
- `96`
- `Undo a bulk edit`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 191)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10186hm` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb114xh06` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb11br9d3` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb11tfia3` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb11wdswo` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb11xauxf` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb11yyx88` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb12quka9` | `@layer utilities` | `max-width: 100%;` |
| `rb13fz4ps` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb13gd0i6` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.16);` |
| `rb13iqw8f` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb13pyqer` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb13zyc3q` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb155shjf` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb15dwckl` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb15r2413` | `@layer utilities › @media (min-width: 40rem)` | `width: 240px;` |
| `rb16heavq` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb16hm0h1` | `@layer utilities` | `pointer-events: none;` |
| `rb16qlgh3` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb1768107` | `@layer utilities` | `cursor: pointer;` |
| `rb17yzquh` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb186qowu` | `@layer utilities › @media (min-width: 40rem)` | `gap: calc(var(--spacing)*4);` |
| `rb18cxfcp` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb18gp4w` | `@layer utilities` | `border-radius: var(--rb-r-xs,4px);` |
| `rb18mx11o` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb18pkho3` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb199jp21` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb19belpv` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb19g3oza` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb19hlxqo` | `@layer utilities` | `transition-property: background-color, border-color, color, scale, outline-color; transition-timing-function: var(--tw-ease,var(--default-tr` |
| `rb19q3664` | `@layer utilities` | `margin-inline: auto;` |
| `rb19sudhw` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb19th7h` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1a6lw7t` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1adnxar` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb1azg0e5` | `@layer utilities` | `opacity: 0.4;` |
| `rb1bbxkvj` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1c1omao` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1cacdw5` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb1ckyfx5` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1cnkd1i` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1dmah8r` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1dwn7jw` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1e0dbry` | `@layer utilities › @media (min-width: 40rem)` | `justify-content: space-between;` |
| `rb1e7ip27` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1g0vrx6` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1gfo842` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1ghkrr8` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1gisq8k` | `@layer utilities` | `display: inline-flex;` |
| `rb1h2nhjn` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1h2s1s6` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1hikji2` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb1ibm22b` | `@layer utilities` | `animation: var(--animate-spin);` |
| `rb1j0kgt7` | `@layer utilities` | `align-items: stretch;` |
| `rb1j2oaqv` | `@layer utilities` | `border-color: oklch(0.652 0.219 26);` |
| `rb1jiyw4h` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1k6gtrb` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb1keyzpb` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1km0aup` | `@layer utilities` | `flex-direction: column;` |
| `rb1l24sid` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1lfylff` | `@layer utilities` | `--tw-shadow: 0 1px 2px var(--tw-shadow-color,#0000001a); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset` |
| `rb1loxpv3` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1lpplou` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1lwm74l` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1mdusy8` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb1mdutv1` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1mvlvpa` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1n46zyr` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1nfd7xx` | `@layer utilities` | `position: relative;` |
| `rb1nmy0xt` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1p2izpn` | `@layer utilities` | `overflow-y: auto;` |
| `rb1pwqaeq` | `@layer utilities` | `overflow: hidden;` |
| `rb1qdqmln` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1qnywlt` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1qv6ai` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1qyjksz` | `@layer utilities › @media (min-width: 40rem)` | `align-items: center;` |
| `rb1r6ophr` | `@layer utilities` | `border-color: currentcolor;` |
| `rb1rqjeok` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
