# agent-plan-4

> **Category:** Agent Plan (`agent-plan`)  
> **Domain:** AI & Agent Surfaces  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/agent-plan/agent-plan-4](https://pro.reactbits.dev/docs/app-ui/agent-plan/agent-plan-4)  
> **Native Viewport:** `1280px × 480px`

Plan versus actual comparison

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`agent-plan-4.jsx`](./agent-plan-4.jsx) (minHeight: `480px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`agent-plan-4.sorbet.jsx`](./agent-plan-4.sorbet.jsx) (minHeight: `480px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 88 |
| **Max DOM Depth** | 10 |
| **Atomic/Scoped Classes** | 129 |
| **Buttons** | 0 |
| **Inputs / Textareas / Selects** | 0 / 0 / 0 |
| **Tables / Dialogs / Links** | 1 / 0 / 0 |
| **SVGs / Canvases** | 0 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Plan vs actual`
- `Step`
- `Duration`
- `Planned`
- `Actual`
- `Drift`
- `Read the billing contract notes`
- `Map the entitlement resolver`
- `Patch the tier lookup fallback`
- `Add a renewal-grace test`
- `Summarize the handoff`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 122)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10dn7j6` | `@layer utilities` | `opacity: 0;` |
| `rb10ruajt` | `@layer utilities` | `table-layout: fixed;` |
| `rb116cihz` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb119gnm4` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb11ul8xz` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb12z85n9` | `@layer utilities` | `--tw-border-spacing-x: calc(var(--spacing)*0); --tw-border-spacing-y: calc(var(--spacing)*0); border-spacing: var(--tw-border-spacing-x)var(` |
| `rb1408996` | `@layer utilities` | `text-align: right;` |
| `rb14ac1ou` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb17br9rp` | `@layer utilities` | `column-gap: calc(var(--spacing)*1);` |
| `rb17jy6ll` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.08);` |
| `rb17wrneh` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb180t08p` | `@layer utilities` | `text-align: left;` |
| `rb18kbftc` | `@layer utilities` | `border-radius: var(--rb-r-sm,6px);` |
| `rb18us3a2` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb194roz1` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb1adyx5f` | `@layer utilities` | `background-color: var(--color-neutral-100);` |
| `rb1am944v` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1ayb5wv` | `@layer utilities` | `user-select: none;` |
| `rb1banwsy` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1cbz37v` | `@layer utilities` | `border-bottom-style: var(--tw-border-style); border-bottom-width: 1px;` |
| `rb1dga8k9` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb1ecb6yd` | `@layer utilities` | `grid-template-columns: repeat(2, minmax(0px, 1fr));` |
| `rb1fp7meg` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1gph0yn` | `@layer utilities › @media (min-width: 40rem)` | `padding: calc(var(--spacing)*6);` |
| `rb1hmbzla` | `@layer utilities` | `left: calc(var(--spacing)*0);` |
| `rb1hylpc0` | `@layer utilities` | `pointer-events: none;` |
| `rb1igmwss` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1isde41` | `@layer utilities` | `background-color: currentcolor;` |
| `rb1iw0to7` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-columns: minmax(0px, 1fr);` |
| `rb1jsdopa` | `@layer utilities › @media (min-width: 40rem)` | `width: calc(var(--spacing)*20);` |
| `rb1klptab` | `@layer utilities` | `width: 100%;` |
| `rb1l0p2p0` | `@layer utilities` | `height: calc(var(--spacing)*10);` |
| `rb1lby7se` | `@layer utilities` | `width: 38%;` |
| `rb1lsj77f` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1mawd4s` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1n7let` | `@layer utilities` | `margin-top: calc(var(--spacing)*1);` |
| `rb1ov2lzz` | `@layer utilities` | `grid-column: 1 / -1;` |
| `rb1ow1ouq` | `@layer utilities` | `--tw-gradient-position: to bottom;` |
| `rb1ps2ir3` | `@layer utilities` | `width: calc(var(--spacing)*14);` |
| `rb1q7vq2n` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1qbwyku` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*4);` |
| `rb1qiae4c` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1qtxti9` | `@layer utilities › @container (min-width: 28rem)` | `grid-auto-flow: column;` |
| `rb1rcvde3` | `@layer utilities` | `padding: calc(var(--spacing)*4);` |
| `rb1rfmhuv` | `@layer utilities` | `position: absolute;` |
| `rb1rn1ipa` | `@layer utilities` | `display: none;` |
| `rb1rnxpsg` | `@layer utilities` | `--tw-gradient-position: to top;` |
| `rb1s0ntjz` | `@layer utilities › @container (min-width: 28rem)` | `grid-column: auto;` |
| `rb1tu910g` | `@layer utilities` | `inset-block: calc(var(--spacing)*0);` |
| `rb1ura1j0` | `@layer utilities` | `height: calc(var(--spacing)*1);` |
| `rb1uwf5zl` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb1ve14uq` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1vpi8qk` | `@layer utilities` | `min-height: 480px;` |
| `rb1vpls` | `@layer utilities` | `flex-wrap: wrap;` |
| `rb1x96grr` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1xkzz1q` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1ygcm4t` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb20bm1z` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb27r4rp` | `@layer utilities` | `color: var(--color-white);` |
| `rb2katfx` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*3);` |
| `rb2wr9ov` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb4j02d4` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb60acl0` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb63e69q` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb6xczcn` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb7ng0p7` | `@layer utilities` | `overflow: hidden;` |
| `rb8abog6` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*4);` |
| `rb92ybhs` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rba42se` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rbaizjbp` | `@layer utilities` | `white-space: nowrap;` |
| `rbarlply` | `@layer utilities` | `flex-direction: column;` |
| `rbc1fpld` | `@layer utilities` | `container-type: inline-size;` |
| `rbcbbxss` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rbck5zs2` | `@layer utilities` | `width: 1px;` |
| `rbck94nj` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rbd05uqn` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rbdg9cne` | `@layer utilities` | `align-items: baseline;` |
| `rbdiw1cb` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.08);` |
