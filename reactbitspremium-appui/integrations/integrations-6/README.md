# integrations-6

> **Category:** Integrations (`integrations`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/integrations/integrations-6](https://pro.reactbits.dev/docs/app-ui/integrations/integrations-6)  
> **Native Viewport:** `1280px × 680px`

Sync status with per-source progress

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`integrations-6.jsx`](./integrations-6.jsx) (minHeight: `680px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`integrations-6.sorbet.jsx`](./integrations-6.sorbet.jsx) (minHeight: `800px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 145 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 160 |
| **Buttons** | 6 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 8 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Sync status`
- `Sync all`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 153)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10lygza` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-columns: minmax(0px, 1fr);` |
| `rb11gma0c` | `@layer utilities` | `width: calc(var(--spacing)*2.5); height: calc(var(--spacing)*2.5);` |
| `rb12icfih` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb12pmyus` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `animation: auto ease 0s 1 normal none running none;` |
| `rb12wuez1` | `@layer utilities` | `scale: 0.98;` |
| `rb153qot1` | `@layer utilities` | `border-color: currentcolor;` |
| `rb159nneq` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb15qq5nj` | `@layer utilities` | `display: grid;` |
| `rb15xytqy` | `@layer utilities` | `display: inline-flex;` |
| `rb16zt8a` | `@layer utilities` | `border-radius: 3.40282e+38px;` |
| `rb170j0fd` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1841m4h` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb19byc49` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb19gyxmq` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb19l9j4n` | `@layer utilities` | `text-align: right;` |
| `rb19q72fm` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1a06o4l` | `@layer utilities` | `padding-inline: calc(var(--spacing)*5);` |
| `rb1angm55` | `@layer utilities` | `overflow-y: auto;` |
| `rb1c1of41` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1caqp6y` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb1cav3ra` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1di8bmk` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1dm0xf3` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1dynhp3` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1dzbvb1` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1e2r4s4` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1egq5aw` | `@layer utilities` | `user-select: none;` |
| `rb1euvz6a` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1faeqb6` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1femm71` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1fk0kt8` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1fyq284` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1g04qvb` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb1gfscg9` | `@layer utilities` | `align-items: center;` |
| `rb1giw1nz` | `@layer utilities` | `border-top-color: rgba(0, 0, 0, 0);` |
| `rb1grcqri` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1gs8oil` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1gzzp2p` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1hn2dy2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1hsy0q4` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb1hvpn3k` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1i9a4a2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1im0eaa` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1izknjo` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1kmhujj` | `@layer utilities › @media (min-width: 40rem)` | `display: none;` |
| `rb1kt97vu` | `@layer utilities` | `display: inline-block;` |
| `rb1l1nipp` | `@layer utilities` | `margin-top: 1px;` |
| `rb1losgfq` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1m3w7ap` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1m9r1r8` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1mtq956` | `@layer utilities` | `column-gap: calc(var(--spacing)*1);` |
| `rb1n5acln` | `@layer utilities` | `margin-top: calc(var(--spacing)*4);` |
| `rb1nz95ok` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb1o8la7g` | `@layer utilities` | `display: flex;` |
| `rb1oaokbo` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb1oetr15` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1oj8d2i` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb1phyncd` | `@layer utilities` | `animation: var(--animate-spin);` |
| `rb1q6dgdf` | `@layer utilities` | `position: relative;` |
| `rb1qcnbt0` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1s6adhy` | `@layer utilities` | `width: 100%;` |
| `rb1sc689m` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1sxgc0g` | `@layer utilities` | `color: oklch(0.76 0.14 26);` |
| `rb1tbbir` | `@layer utilities` | `flex-direction: column;` |
| `rb1tinfgu` | `@layer utilities` | `grid-template-columns: repeat(2, minmax(0px, 1fr));` |
| `rb1u0h1as` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1vsi9ub` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1wbrgdv` | `@layer utilities` | `pointer-events: none;` |
| `rb1wy3jns` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1x50izp` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1xplm7e` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1y9eyn7` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1yw6hqe` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb2hzhtn` | `@layer utilities` | `background-color: oklch(0.652 0.219 26);` |
| `rb32mnvw` | `@layer utilities` | `width: 100%; height: 100%;` |
| `rb34ivzq` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-flow: column;` |
| `rb3v6b8j` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb4926bn` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
