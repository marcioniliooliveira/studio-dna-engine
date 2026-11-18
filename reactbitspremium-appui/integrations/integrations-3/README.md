# integrations-3

> **Category:** Integrations (`integrations`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/integrations/integrations-3](https://pro.reactbits.dev/docs/app-ui/integrations/integrations-3)  
> **Native Viewport:** `1280px × 680px`

API key table with row actions

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`integrations-3.jsx`](./integrations-3.jsx) (minHeight: `680px`, hooks: `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`integrations-3.sorbet.jsx`](./integrations-3.sorbet.jsx) (minHeight: `680px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 195 |
| **Max DOM Depth** | 13 |
| **Atomic/Scoped Classes** | 201 |
| **Buttons** | 17 |
| **Inputs / Textareas / Selects** | 4 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 21 / 0 |
| **ARIA Roles** | `status` |

### Visible Headings & Interactive Labels
- `API keys`
- `Create key`
- `Name`
- `Key`
- `Scope`
- `Created`
- `Last used`
- `Rotate`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 200)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10aflyp` | `@layer utilities` | `--tw-gradient-position: to left;` |
| `rb10x5gpg` | `@layer utilities` | `width: 296px;` |
| `rb10yreb0` | `@layer utilities` | `--tw-border-spacing-x: calc(var(--spacing)*0); --tw-border-spacing-y: calc(var(--spacing)*0); border-spacing: var(--tw-border-spacing-x)var(` |
| `rb11i5pjg` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*2);` |
| `rb12icfih` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb12wuez1` | `@layer utilities` | `scale: 0.98;` |
| `rb132bmwf` | `@layer utilities` | `--tw-gradient-position: to right;` |
| `rb13aj2zn` | `@layer utilities` | `opacity: 0.4;` |
| `rb13enuad` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb14nm41x` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 0px;` |
| `rb159nneq` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb159sc0c` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb15xytqy` | `@layer utilities` | `display: inline-flex;` |
| `rb16bkve7` | `@layer utilities` | `width: 28px; height: 28px;` |
| `rb170j0fd` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb17fv9rd` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1829g9s` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1841m4h` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb18c91yr` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb18yegrh` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb19byc49` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb19gyxmq` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb19l9j4n` | `@layer utilities` | `text-align: right;` |
| `rb19q72fm` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1a2pjhd` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1a4lw5p` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1bg5ysl` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1c1of41` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1caqp6y` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb1cav3ra` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1cmaa8l` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1d91k2v` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1di8bmk` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1dm0xf3` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1dynhp3` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1dzbvb1` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1e2r4s4` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1e55gjp` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb1egq5aw` | `@layer utilities` | `user-select: none;` |
| `rb1els08o` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1euvz6a` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1ew6c3f` | `@layer utilities` | `height: calc(var(--spacing)*5);` |
| `rb1faeqb6` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1fcnnz4` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1femm71` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1fg5jhd` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb1fk0kt8` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1gfscg9` | `@layer utilities` | `align-items: center;` |
| `rb1grcqri` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1gs8oil` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1gx56vr` | `@layer utilities` | `left: calc(var(--spacing)*0);` |
| `rb1gzzp2p` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1hn2dy2` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1hsy0q4` | `@layer utilities` | `border-top-style: var(--tw-border-style); border-top-width: 1px;` |
| `rb1hvpn3k` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1i6vre` | `@layer utilities` | `width: fit-content;` |
| `rb1i9a4a2` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1iela9f` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1im0eaa` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1iqzov5` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1izknjo` | `@layer utilities` | `font-size: 20px; line-height: 24px;` |
| `rb1jdekep` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jqn8jm` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1jzac61` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb1kfi3s4` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1kr1f42` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1lnjky0` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb1losgfq` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1m3w7ap` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1m9r1r8` | `@layer utilities` | `column-gap: calc(var(--spacing)*3);` |
| `rb1mh32qx` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1mjjr0o` | `@layer utilities` | `cursor: default;` |
| `rb1mxsvre` | `@layer utilities` | `text-align: left;` |
| `rb1nkslp0` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1nlgsst` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*4);` |
| `rb1nz95ok` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb1o8la7g` | `@layer utilities` | `display: flex;` |
| `rb1oaokbo` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
