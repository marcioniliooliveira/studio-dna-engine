# agent-activity-4

> **Category:** Agent Activity (`agent-activity`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/agent-activity/agent-activity-4](https://pro.reactbits.dev/docs/app-ui/agent-activity/agent-activity-4)  
> **Native Viewport:** `1280px × 640px`

Run history table with re-run actions

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`agent-activity-4.jsx`](./agent-activity-4.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`agent-activity-4.sorbet.jsx`](./agent-activity-4.sorbet.jsx) (minHeight: `700px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 527 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 151 |
| **Buttons** | 28 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 28 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Run history`
- `Run`
- `Status`
- `Duration`
- `Cost`
- `Started`
- `Actions`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `accordion-flow` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 147)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10whlm7` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb11kc9xs` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb11oeo0f` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1287z1m` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb138m2b6` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb13eu2j4` | `@layer utilities › @media (min-width: 48rem)` | `opacity: 1;` |
| `rb13iko3k` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb13ny4yw` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb14srl3h` | `@layer utilities` | `display: inline-flex;` |
| `rb16w10o4` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb174k3qa` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb177lzhq` | `@layer utilities` | `border-collapse: separate;` |
| `rb17g0822` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb17gb5uv` | `@layer utilities` | `cursor: progress;` |
| `rb17jd45t` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb17jt6sq` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb17pztr1` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb18ld6sk` | `@layer utilities › @media (min-width: 48rem) › @media (hover: hover)` | `opacity: 1;` |
| `rb199shzo` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb1ao7we6` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*4);` |
| `rb1asz4vi` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1b1r3n2` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1c5vtwi` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1d9o5tm` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1dao8s` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1dvq3rm` | `@layer utilities` | `color: oklch(0.51 0.18 26);` |
| `rb1e5y9y9` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1e8szw7` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1ejgbh7` | `@layer utilities` | `overflow: hidden;` |
| `rb1g85wbk` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb1gfuxhy` | `@layer utilities` | `flex-direction: column;` |
| `rb1gfyram` | `@layer utilities` | `position: relative;` |
| `rb1gthvh7` | `@layer utilities` | `width: calc(var(--spacing)*7); height: calc(var(--spacing)*7);` |
| `rb1hd1ghu` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1jpoqu1` | `@layer utilities › @media (min-width: 48rem)` | `opacity: 0;` |
| `rb1jv1q2h` | `@layer utilities` | `background-color: oklch(0.29 0.06 26 / 0.4);` |
| `rb1k4eg4s` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1k7eva3` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1kibrrz` | `@layer utilities › @media (hover: hover)` | `background-color: oklch(0.29 0.06 26 / 0.6);` |
| `rb1kq65rk` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1lfv9g1` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1li1827` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1lkhd27` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1lv80jw` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1mhmdh7` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1mzj9v3` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1n740ce` | `@layer utilities` | `display: none;` |
| `rb1nnni7l` | `@layer utilities` | `z-index: 20;` |
| `rb1o2f8qy` | `@layer utilities` | `text-align: right;` |
| `rb1o33qbu` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb1opuukw` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1ov6lun` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1owtt2p` | `@layer utilities › @media (min-width: 40rem)` | `gap: calc(var(--spacing)*4);` |
| `rb1pbo9ve` | `@layer utilities` | `z-index: 10;` |
| `rb1r1nsr` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1r36pnq` | `@layer utilities` | `min-height: 640px;` |
| `rb1rwu8u7` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1si7tt2` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1t1xv5n` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1tb2maa` | `@layer utilities` | `width: 12%;` |
| `rb1tkok0a` | `@layer utilities` | `max-width: 100%;` |
| `rb1v7lm7s` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1vlbx6z` | `@layer utilities` | `vertical-align: middle;` |
| `rb1w84pxa` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1wdszf6` | `@layer utilities` | `scale: 0.98;` |
| `rb1xucqjj` | `@layer utilities` | `user-select: none;` |
| `rb1yakua4` | `@layer utilities` | `height: 100%;` |
| `rb1yampd5` | `@layer utilities` | `text-align: left;` |
| `rb1ydtisj` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb2e05tg` | `@layer utilities` | `height: calc(var(--spacing)*10);` |
| `rb2lmk76` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb2nzrif` | `@layer utilities` | `height: calc(var(--spacing)*11);` |
| `rb3dg8lv` | `@layer utilities` | `width: 100%;` |
| `rb3eg7ph` | `@layer utilities` | `--tw-border-spacing-x: calc(var(--spacing)*0); --tw-border-spacing-y: calc(var(--spacing)*0); border-spacing: var(--tw-border-spacing-x)var(` |
| `rb433z2k` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb4ai71n` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb4x2wwn` | `@layer utilities` | `align-items: flex-start;` |
| `rb513d1x` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
