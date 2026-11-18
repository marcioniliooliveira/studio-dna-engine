# comments-2

> **Category:** Comments (`comments`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/comments/comments-2](https://pro.reactbits.dev/docs/app-ui/comments/comments-2)  
> **Native Viewport:** `1280px × 640px`

Inline annotations with a comments rail

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`comments-2.jsx`](./comments-2.jsx) (minHeight: `640px`, hooks: `author`, `body`, `disconnect`, `id`, `noteId`, `observe`, `quote`, `text`, `time`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`comments-2.sorbet.jsx`](./comments-2.sorbet.jsx) (minHeight: `660px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 88 |
| **Max DOM Depth** | 15 |
| **Atomic/Scoped Classes** | 162 |
| **Buttons** | 10 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 4 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Service commitment draft`
- `We target 99.9 percent uptime`
- `The guarantee applies in every supported region`
- `Resolve`
- `Show in text`
- `Resolved`
- `Review`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 159)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb104bfva` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb10ls5b4` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb10soat7` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb117f4s2` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb119gai8` | `@layer utilities` | `min-height: 640px;` |
| `rb12beuhs` | `@layer utilities` | `justify-content: safe center;` |
| `rb12cdb1n` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12gp0ir` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb12xo90y` | `@layer utilities` | `justify-content: center;` |
| `rb130meyh` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb13rtol7` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb148mhnj` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb14pvhkc` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*2);` |
| `rb14zv39b` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*3);` |
| `rb15ctwyi` | `@layer utilities` | `height: 100%;` |
| `rb15hxapa` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb15juan9` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb15wybaf` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb16mqgr1` | `@layer utilities › @media (min-width: 64rem)` | `display: none;` |
| `rb176kctq` | `@layer utilities` | `overscroll-behavior: contain;` |
| `rb17z7wkn` | `@layer utilities` | `margin-inline: auto;` |
| `rb18bhypy` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb199v5y9` | `@layer utilities › @media (min-width: 64rem)` | `max-height: none;` |
| `rb1aengf8` | `@layer utilities` | `scale: 0.98;` |
| `rb1ahv9d4` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1ajlzjl` | `@layer utilities` | `user-select: none;` |
| `rb1aqyukr` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1aruv23` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1b1ugr2` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1c6c5rk` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1cfsh7x` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb1dv0kas` | `@layer utilities › @media (min-width: 64rem)` | `grid-template-columns: minmax(0px, 1fr) 320px;` |
| `rb1fbfhz3` | `@layer utilities` | `display: flex;` |
| `rb1fdeltx` | `@layer utilities` | `position: absolute;` |
| `rb1ftd6w5` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1g3csl4` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb1geo3bm` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1gez32k` | `@layer utilities` | `overflow-y: auto;` |
| `rb1h12q42` | `@layer utilities` | `pointer-events: none;` |
| `rb1hq2mq7` | `@layer utilities` | `display: inline-flex;` |
| `rb1hwnmgl` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1i5z42z` | `@layer utilities` | `text-align: left;` |
| `rb1iaz270` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*8);` |
| `rb1ifbayq` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1ircwj0` | `@layer utilities` | `max-width: 100%;` |
| `rb1j57h8p` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb1j8h86c` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1jloptm` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb1jugeju` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2.5);` |
| `rb1l9s6k0` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1n1frhe` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1nbese6` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1nt776k` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1ohejx3` | `@layer utilities` | `max-height: 380px;` |
| `rb1ouvfsd` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.16);` |
| `rb1owxep3` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1pc8jhm` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1pvesni` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1pywf7z` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1r7mtp6` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1rrnm4a` | `@layer utilities` | `margin-top: calc(var(--spacing)*1.5);` |
| `rb1rs40jr` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1rumkhl` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1rvoeoc` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb1taifng` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1tcht2w` | `@layer utilities` | `text-decoration-style: solid;` |
| `rb1tf9ihe` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb1ttv0qd` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1tuhn1e` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1u69l9e` | `@layer utilities` | `width: 24px; height: 24px;` |
| `rb1ulo1a9` | `@layer utilities` | `text-decoration-style: dotted;` |
| `rb1v6d95x` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1vikhj5` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1w6uinw` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1w9zieq` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1widbwe` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1wlxp8z` | `@layer utilities` | `padding: calc(var(--spacing)*6);` |
| `rb1x90n8h` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
