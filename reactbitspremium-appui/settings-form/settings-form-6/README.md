# settings-form-6

> **Category:** Settings Form (`settings-form`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/settings-form/settings-form-6](https://pro.reactbits.dev/docs/app-ui/settings-form/settings-form-6)  
> **Native Viewport:** `1280px × 640px`

Danger zone with confirmations

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`settings-form-6.jsx`](./settings-form-6.jsx) (minHeight: `640px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useRef`, `useState`)
- **Sorbet Source:** [`settings-form-6.sorbet.jsx`](./settings-form-6.sorbet.jsx) (minHeight: `640px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 58 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 186 |
| **Buttons** | 4 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 0 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Danger zone`
- `Workspace controls`
- `Transfer`
- `Archive workspace`
- `Type northwind to confirm`
- `Cancel`
- `Delete this workspace`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 181)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb109v177` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb10ywfah` | `@layer utilities` | `padding-block: 1px;` |
| `rb11kxez4` | `@layer utilities` | `font-size: 0.9em;` |
| `rb11le3hc` | `@layer utilities › @media (hover: hover)` | `border-color: oklch(0.51 0.18 26);` |
| `rb123d6c1` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1313vub` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb133kun5` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb13ojvp9` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb13pob85` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb13xlw63` | `@layer utilities` | `max-width: 60ch;` |
| `rb13yks1w` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb148mi8e` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb14kx0wt` | `@layer utilities` | `display: grid;` |
| `rb14n2l1s` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb14v5x1v` | `@layer utilities` | `--tw-translate-y: calc(calc(1/2*100%)*-1);` |
| `rb15kffa4` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb15wduwg` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb165cw9s` | `@layer utilities` | `margin-inline: auto;` |
| `rb166dglf` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb166vndw` | `@layer utilities` | `width: fit-content;` |
| `rb16didr2` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb16onqv2` | `@layer utilities` | `user-select: none;` |
| `rb16pro8s` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb17emri4` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb18894eo` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb18k9ywa` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb18rhwnf` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1929z2c` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb19ig59i` | `@layer utilities` | `cursor: default;` |
| `rb1aereej` | `@layer utilities` | `color: oklch(0.51 0.18 26);` |
| `rb1b8sxdm` | `@layer utilities` | `color-scheme: dark;` |
| `rb1bfri9x` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1cceta5` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1d1vna7` | `@layer utilities › @media (min-width: 40rem)` | `justify-content: flex-end;` |
| `rb1d7nee6` | `@layer utilities` | `flex-direction: column-reverse;` |
| `rb1dnihmz` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1dp9vsd` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1drzstm` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1dxx7bv` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1e7u9c2` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1eapi97` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb1elmi2j` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1etuypn` | `@layer utilities` | `scale: 0.98;` |
| `rb1fq669` | `@layer utilities` | `position: relative;` |
| `rb1friixj` | `@layer utilities` | `align-items: center;` |
| `rb1gipczs` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1gnf25z` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1gxfhkb` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1h0lg14` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1hal1q3` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb1hj2dmh` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1hpr4r8` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1i50ic6` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1ikjmgs` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1irs1je` | `@layer utilities` | `cursor: progress;` |
| `rb1itqsr` | `@layer utilities` | `height: 100%;` |
| `rb1j0mbbi` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1jigx96` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1jll033` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1ki6yfe` | `@layer utilities` | `align-items: flex-start;` |
| `rb1kqjdni` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1lhdrtj` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb1loafqh` | `@layer utilities` | `pointer-events: none;` |
| `rb1lta49u` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1mdgsyb` | `@layer utilities` | `cursor: pointer;` |
| `rb1mp7vge` | `@layer utilities › @media (min-width: 40rem)` | `width: auto;` |
| `rb1n5qpn8` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb1nhlqsn` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1p6m0n6` | `@layer utilities` | `min-width: calc(var(--spacing)*0);` |
| `rb1p98s9f` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1pzany` | `@layer utilities` | `padding-block: calc(var(--spacing)*3);` |
| `rb1qceehl` | `@layer utilities` | `--tw-gradient-from: var(--color-white); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient-from)` |
| `rb1qcxmz` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb1qfmzg1` | `@layer utilities` | `border-color: oklch(0.6 0.236 26);` |
| `rb1r388ok` | `@layer utilities` | `width: 100%;` |
| `rb1rfvic6` | `@layer utilities › @media (min-width: 40rem)` | `padding-inline: calc(var(--spacing)*6);` |
| `rb1ssgq3u` | `@layer utilities` | `padding-bottom: calc(var(--spacing)*4);` |
| `rb1t0xk3b` | `@layer utilities` | `justify-content: center;` |
