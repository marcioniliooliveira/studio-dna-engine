# comments-1

> **Category:** Comments (`comments`)  
> **Domain:** Collaboration, Content & Support  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/comments/comments-1](https://pro.reactbits.dev/docs/app-ui/comments/comments-1)  
> **Native Viewport:** `1280px × 640px`

Threaded comments with reactions

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`comments-1.jsx`](./comments-1.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`comments-1.sorbet.jsx`](./comments-1.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 115 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 201 |
| **Buttons** | 12 |
| **Inputs / Textareas / Selects** | 0 / 1 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 9 / 0 |
| **ARIA Roles** | `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Migration plan feedback`
- `Newest`
- `Oldest`
- `5`
- `Reply`
- `2`
- `1`
- `Write a comment`
- `Comment`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 197)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb104bfva` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb104kax1` | `@layer utilities` | `--tw-shadow: 0 0 0 1px var(--tw-shadow-color,#ffffff29),0 1px 2px var(--tw-shadow-color,#0000004d); box-shadow: var(--tw-inset-shadow),var(-` |
| `rb10gurpi` | `@layer utilities` | `background-color: var(--color-neutral-700);` |
| `rb10ls5b4` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb10soat7` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb117f4s2` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb119gai8` | `@layer utilities` | `min-height: 640px;` |
| `rb11pymuf` | `@layer utilities` | `min-height: calc(var(--spacing)*12);` |
| `rb12a8ui6` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb12beuhs` | `@layer utilities` | `justify-content: safe center;` |
| `rb12cdb1n` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12fhxtz` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb12gp0ir` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `--tw-scale-x: 100%; --tw-scale-y: 100%; --tw-scale-z: 100%; scale: var(--tw-scale-x)var(--tw-scale-y);` |
| `rb12xo90y` | `@layer utilities` | `justify-content: center;` |
| `rb130meyh` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb13rtol7` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.09);` |
| `rb13ugxb5` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(100% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb148mhnj` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb14o0pb5` | `@layer utilities` | `resize: none;` |
| `rb14zv39b` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*3);` |
| `rb15ctwyi` | `@layer utilities` | `height: 100%;` |
| `rb15hxapa` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb15juan9` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb15wybaf` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb166xwze` | `@layer utilities` | `margin-top: calc(var(--spacing)*2);` |
| `rb16gxiod` | `@layer utilities` | `margin-top: calc(var(--spacing)*3);` |
| `rb16lkkvz` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb17z7wkn` | `@layer utilities` | `margin-inline: auto;` |
| `rb18bhypy` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb18hjmmg` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb19sms4i` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb1aengf8` | `@layer utilities` | `scale: 0.98;` |
| `rb1ahv9d4` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb1ajlzjl` | `@layer utilities` | `user-select: none;` |
| `rb1aqyukr` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, scale, filter; transition-timing-function: var(--tw-e` |
| `rb1aruv23` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1b1ugr2` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb1c6c5rk` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1cyct96` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*1.5);` |
| `rb1dpoe8v` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1f2fupt` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1f8hh1l` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1fbfhz3` | `@layer utilities` | `display: flex;` |
| `rb1fdeltx` | `@layer utilities` | `position: absolute;` |
| `rb1ftd6w5` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1g3csl4` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb1g7rncq` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1geo3bm` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1gez32k` | `@layer utilities` | `overflow-y: auto;` |
| `rb1h12q42` | `@layer utilities` | `pointer-events: none;` |
| `rb1hq2mq7` | `@layer utilities` | `display: inline-flex;` |
| `rb1hwnmgl` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1ifbayq` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1ircwj0` | `@layer utilities` | `max-width: 100%;` |
| `rb1j57h8p` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb1j8h86c` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1j92cxg` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1ju2rwj` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1jugeju` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2.5);` |
| `rb1k7rmil` | `@layer utilities` | `field-sizing: content;` |
| `rb1l9s6k0` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1lmc5d5` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb1mwu8ei` | `@layer utilities` | `--tw-shadow: inset 0 2px 0 -1px var(--tw-shadow-color,#fff3),inset 0 -2px 0 -1px var(--tw-shadow-color,#0000004d),inset 0 0 0 1px var(--tw-s` |
| `rb1mz8e3n` | `@layer utilities` | `min-height: calc(var(--spacing)*5);` |
| `rb1n1frhe` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1n97zsm` | `@layer utilities` | `min-height: calc(var(--spacing)*6);` |
| `rb1nbese6` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1nj7lhl` | `@layer utilities` | `min-height: calc(var(--spacing)*7);` |
| `rb1oh0t3i` | `@layer utilities` | `max-height: calc(var(--spacing)*40);` |
| `rb1ouvfsd` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.16);` |
| `rb1owxep3` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1p0gz7c` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1pc8jhm` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1pvesni` | `@layer utilities` | `font-size: 16px; line-height: 20px;` |
| `rb1pywf7z` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb1q557fg` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb1qhu8` | `@layer utilities` | `max-width: 720px;` |
| `rb1r7mtp6` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
