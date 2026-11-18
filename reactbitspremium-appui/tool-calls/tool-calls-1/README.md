# tool-calls-1

> **Category:** Tool Calls (`tool-calls`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/tool-calls/tool-calls-1](https://pro.reactbits.dev/docs/app-ui/tool-calls/tool-calls-1)  
> **Native Viewport:** `1280px × 640px`

Tool call card with arguments and result

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`tool-calls-1.jsx`](./tool-calls-1.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`tool-calls-1.sorbet.jsx`](./tool-calls-1.sorbet.jsx) (minHeight: `700px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 145 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 154 |
| **Buttons** | 13 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 13 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Tool calls`
- `Stop`
- `read_file 38ms Done`
- `grep 112ms Done`
- `list_dir 12ms Done`
- `read_file 41ms Done`
- `run_tests 2.30s Failed`
- `read_deploys 88ms Done`
- `git_blame 64ms Done`
- `fetch_dashboard 210ms Done`
- `read_config 22ms Done`
- `query_logs 173ms Done`
- `list_owners Running`
- `search_incidents Streaming`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 149)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10k72of` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb110wxj4` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1185261` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb11b6vfv` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb11bl1g1` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb11ij738` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb124jstw` | `@layer utilities` | `animation: var(--animate-spin);` |
| `rb12dfy66` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb13gbjeo` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb13r6rdp` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb141yoxm` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb156xbcl` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb15dtkd2` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb176atvn` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb1807umg` | `@layer utilities` | `align-items: center;` |
| `rb189iaoc` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb18eh9rz` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb18h19na` | `@layer utilities` | `min-width: 6ch;` |
| `rb19fz37q` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb19qogbz` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb19weqkh` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1bielb6` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1bs165n` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb1c2jark` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1cq0c60` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1dbi2hi` | `@layer utilities` | `column-gap: calc(var(--spacing)*8);` |
| `rb1djni2a` | `@layer utilities` | `flex-direction: column;` |
| `rb1dwxte3` | `@layer utilities` | `white-space: pre;` |
| `rb1ehwm1k` | `@layer utilities` | `rotate: 90deg;` |
| `rb1emvprc` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1f0owo7` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1f69sjo` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1g2uw3a` | `@layer utilities` | `transition-property: background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-dura` |
| `rb1gk6lr4` | `@layer utilities` | `padding-top: calc(var(--spacing)*1);` |
| `rb1hma0lk` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1hxwwe3` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb1hzxvom` | `@layer utilities` | `border-top-color: rgba(0, 0, 0, 0);` |
| `rb1iihi8p` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1itjlzs` | `@layer utilities` | `max-height: calc(var(--spacing)*40);` |
| `rb1itp3sj` | `@layer utilities` | `padding-block: calc(var(--spacing)*1);` |
| `rb1j3ophi` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb1j8i2ai` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1kdjcl4` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb1kq9on9` | `@layer utilities` | `display: flex;` |
| `rb1ls7h0h` | `@layer utilities` | `display: inline-flex;` |
| `rb1mw8s3v` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1mxcmeu` | `@layer utilities` | `margin-inline-start: auto;` |
| `rb1osk1dx` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1p0cudr` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1pjddz7` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1qxbeg2` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1r69alj` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1r7b051` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1rgftl7` | `@layer utilities` | `align-items: flex-start;` |
| `rb1rt07od` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1s0vqoc` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1s8dmkw` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*3);` |
| `rb1sqtdmm` | `@layer utilities` | `overflow-y: auto;` |
| `rb1svt6cs` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1sz2eeb` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1tbtrtp` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb1tf0hxg` | `@layer utilities` | `cursor: pointer;` |
| `rb1tggrrz` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb1vwq6dy` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1wx8or6` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1xbwp30` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1xvvwgy` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1xwqezy` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #17171708;` |
| `rb1xxui3v` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1ynx57k` | `@layer utilities` | `transition-property: transform, translate, scale, rotate; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function` |
| `rb1yxvvcc` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb25gi0p` | `@layer utilities` | `align-self: flex-start;` |
| `rb2keo59` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `animation: auto ease 0s 1 normal none running none;` |
| `rb2u8bg9` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb2ucwem` | `@layer utilities` | `color: oklch(0.51 0.18 26);` |
| `rb3hyn2l` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb3iko4h` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
| `rb3s90mb` | `@layer utilities` | `max-width: calc(100% + 16px);` |
