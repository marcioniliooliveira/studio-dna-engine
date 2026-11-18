# list-6

> **Category:** List (`list`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/list/list-6](https://pro.reactbits.dev/docs/app-ui/list/list-6)  
> **Native Viewport:** `1280px × 640px`

Webhook delivery log with payloads

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`list-6.jsx`](./list-6.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`list-6.sorbet.jsx`](./list-6.sorbet.jsx) (minHeight: `740px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 280 |
| **Max DOM Depth** | 11 |
| **Atomic/Scoped Classes** | 185 |
| **Buttons** | 20 |
| **Inputs / Textareas / Selects** | 0 / 0 / 1 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 17 / 0 |
| **ARIA Roles** | `combobox`, `radiogroup`, `radio` |

### Visible Headings & Interactive Labels
- `Webhook deliveries`
- `All endpoints`
- `All`
- `Delivered`
- `Failed`
- `invoice.finalized hooks.northwind.ioattempt 1 200 OK 142 ms`
- `Replay delivery`
- `customer.subscription.updated api.brightledger.comattempt 1 202 Accepted 318 ms`
- `payout.paid hooks.meridian.appattempt 3 500 Server Error 1.24 s`
- `charge.refunded hooks.northwind.ioattempt 1 200 OK 96 ms`
- `customer.created ingest.parcelworks.devattempt 1 201 Created 204 ms`
- `invoice.payment_failed api.brightledger.comattempt 2 204 No Content 173 ms`
- `checkout.session.completed hooks.meridian.appattempt 5 Timed out 30.00 s`
- `account.updated ingest.parcelworks.devattempt 1 200 OK 128 ms`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 179)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb10w2x2` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `transition-property: none;` |
| `rb11d4l69` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb11x4nir` | `@layer utilities` | `max-width: 720px;` |
| `rb1246soy` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb129y7s0` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb12f9lg6` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb12iinpc` | `@layer utilities` | `right: calc(var(--spacing)*0);` |
| `rb12k62d1` | `@layer utilities` | `color: var(--color-neutral-900);` |
| `rb12ydtnn` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1311ksy` | `@layer utilities` | `padding: calc(var(--spacing)*8);` |
| `rb135k3xg` | `@layer utilities` | `position: absolute;` |
| `rb139dvfa` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb13nw88v` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*4);` |
| `rb13rmkce` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb13wqvan` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb13xn3gq` | `@layer utilities` | `--tw-outline-style: none; outline-style: none;` |
| `rb14oz6ys` | `@layer utilities` | `padding: calc(var(--spacing)*2);` |
| `rb14pa5bh` | `@layer utilities` | `flex-shrink: 0;` |
| `rb17fh8mg` | `@layer utilities` | `outline-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb17r7ve8` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb17t31w9` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb18p02ju` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb19wcvcm` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb1a3lber` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.12);` |
| `rb1adblhk` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1ankisp` | `@layer utilities` | `border-color: rgba(23, 23, 23, 0.1);` |
| `rb1b07qnj` | `@layer utilities` | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;` |
| `rb1b111ha` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1bget6i` | `@layer utilities` | `display: flex;` |
| `rb1buv4sl` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.14);` |
| `rb1ct19o2` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1cwmibi` | `@layer utilities` | `justify-content: space-between;` |
| `rb1d9yvwn` | `@layer utilities` | `justify-content: safe center;` |
| `rb1fgkcks` | `@layer utilities` | `text-align: left;` |
| `rb1fx22e5` | `@layer utilities` | `scrollbar-width: thin;` |
| `rb1g44df7` | `@layer utilities` | `width: calc(var(--spacing)*8);` |
| `rb1gjq3hk` | `@layer utilities` | `min-height: calc(var(--spacing)*14);` |
| `rb1gllws4` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1i4u931` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1i4x1lt` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1i98qvq` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1id6xbq` | `@layer utilities` | `padding-inline: calc(var(--spacing)*2);` |
| `rb1in6j0p` | `@layer utilities` | `padding-inline: calc(var(--spacing)*3);` |
| `rb1irsqrc` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1ix64po` | `@layer utilities` | `padding-inline: calc(var(--spacing)*4);` |
| `rb1jfm2i3` | `@layer utilities` | `align-items: stretch;` |
| `rb1k2ws6a` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1k6js52` | `@layer utilities` | `transition-property: background-color, color, outline-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-funct` |
| `rb1kf20cf` | `@layer utilities` | `--tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)var(--tw-` |
| `rb1kk5uih` | `@layer utilities` | `text-align: right;` |
| `rb1l4s76e` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1moj66x` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1mujmlb` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1mxwoud` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-900);` |
| `rb1ng6wh6` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1ngqaqq` | `@layer utilities` | `overflow: hidden;` |
| `rb1nopqqj` | `@layer utilities` | `overflow-y: auto;` |
| `rb1o5lqlm` | `@layer utilities` | `flex-shrink: 0;` |
| `rb1o5nz7o` | `@layer utilities` | `display: inline-flex;` |
| `rb1oneu6e` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1opyp2b` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1p2pbte` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1p434y2` | `@layer utilities` | `display: block;` |
| `rb1p8t3ru` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1plqqx4` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb1pm5ls8` | `@layer utilities` | `font-variant-numeric: var(--tw-ordinal,)var(--tw-slashed-zero,)var(--tw-numeric-figure,)var(--tw-numeric-spacing,)var(--tw-numeric-fraction,` |
| `rb1pxfs40` | `@layer utilities` | `white-space: nowrap;` |
| `rb1q8uf1x` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1rgniel` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1s0lflb` | `@layer utilities` | `height: 56px;` |
| `rb1s8vzh1` | `@layer utilities › @media (hover: hover)` | `color: var(--color-neutral-100);` |
| `rb1t1g8by` | `@layer utilities` | `align-items: flex-start;` |
| `rb1tvx9ty` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #17171708;` |
| `rb1tx8hsz` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1typ7yw` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1uq8nhn` | `@layer utilities` | `row-gap: calc(var(--spacing)*1);` |
| `rb1v4ngdk` | `@layer utilities` | `width: fit-content;` |
| `rb1va7uvl` | `@layer utilities` | `row-gap: calc(var(--spacing)*3);` |
