# settings-form-3

> **Category:** Settings Form (`settings-form`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/settings-form/settings-form-3](https://pro.reactbits.dev/docs/app-ui/settings-form/settings-form-3)  
> **Native Viewport:** `1280px × 800px`

Preferences with switches and radios

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`settings-form-3.jsx`](./settings-form-3.jsx) (minHeight: `800px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useId`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`settings-form-3.sorbet.jsx`](./settings-form-3.sorbet.jsx) (minHeight: `800px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 98 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 237 |
| **Buttons** | 7 |
| **Inputs / Textareas / Selects** | 4 / 0 / 2 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 3 / 0 |
| **ARIA Roles** | `radiogroup`, `combobox`, `switch` |

### Visible Headings & Interactive Labels
- `Preferences`
- `Workspace preferences`
- `System`
- `Light`
- `Dark`
- `Density`
- `Cozy`
- `Language`
- `English`
- `Play notification sounds A short chime when something needs your attention.`
- `Cancel`
- `Save changes`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-r-xs`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 231)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb102c34g` | `@layer utilities` | `gap: calc(var(--spacing)*1.5);` |
| `rb106g2h5` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.5);` |
| `rb11aawp6` | `@layer utilities` | `justify-content: space-between;` |
| `rb1232w5m` | `@layer utilities › @media not all and (min-width: 40rem)` | `flex-direction: column;` |
| `rb123d6c1` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb126ox54` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb12mxbbj` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1313vub` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb13hkcti` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb13pob85` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb13xlw63` | `@layer utilities` | `max-width: 60ch;` |
| `rb147518s` | `@layer utilities › @media (hover: hover)` | `--tw-inset-ring-color: var(--color-neutral-100);` |
| `rb148mi8e` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb14kx0wt` | `@layer utilities` | `display: grid;` |
| `rb14n2l1s` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb15kffa4` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb15rdtw0` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.4);` |
| `rb15wduwg` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb165cw9s` | `@layer utilities` | `margin-inline: auto;` |
| `rb166dglf` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb166vndw` | `@layer utilities` | `width: fit-content;` |
| `rb16didr2` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb16j33j` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb16l3g9p` | `@layer utilities` | `border-color: rgba(0, 0, 0, 0);` |
| `rb16onqv2` | `@layer utilities` | `user-select: none;` |
| `rb16pro8s` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb16qcnzd` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb16rdu7w` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb17bpr0h` | `@layer utilities` | `--tw-inset-ring-color: #17171780;` |
| `rb17emri4` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb17kbh2a` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb185ln91` | `@layer utilities` | `transition-property: color, background-color, border-color, box-shadow, outline-color, opacity, scale; transition-timing-function: var(--tw-` |
| `rb18894eo` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb18bvryf` | `@layer utilities` | `border-color: rgba(245, 245, 245, 0.4);` |
| `rb18k9ywa` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb18rhwnf` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1927owl` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1929z2c` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb19nr0ge` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1aeji8k` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 5px;` |
| `rb1afrp1e` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1aqb2k9` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.4);` |
| `rb1c1dgy7` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb1ccra39` | `@layer utilities › @media (min-width: 40rem)` | `margin-inline-end: auto;` |
| `rb1d7nee6` | `@layer utilities` | `flex-direction: column-reverse;` |
| `rb1dnihmz` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1dp9vsd` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb1drzstm` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1dxx7bv` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1e7u9c2` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1erw0es` | `@layer utilities` | `min-height: calc(var(--spacing)*5);` |
| `rb1etuypn` | `@layer utilities` | `scale: 0.98;` |
| `rb1fq669` | `@layer utilities` | `position: relative;` |
| `rb1friixj` | `@layer utilities` | `align-items: center;` |
| `rb1gipczs` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1gnf25z` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1gnfolo` | `@layer utilities` | `opacity: 1;` |
| `rb1gxfhkb` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1h0lg14` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1hal1q3` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb1hhe91v` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1hj2dmh` | `@layer utilities` | `--tw-shadow: inset 0 1px 2px var(--tw-shadow-color,#0006); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offs` |
| `rb1hpr4r8` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1huy009` | `@layer utilities` | `transition-property: border-color, box-shadow; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transit` |
| `rb1hwccm2` | `@layer utilities` | `opacity: 1;` |
| `rb1i50ic6` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1ikjmgs` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1irs1je` | `@layer utilities` | `cursor: progress;` |
| `rb1itqsr` | `@layer utilities` | `height: 100%;` |
| `rb1j0mbbi` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1j4pe8w` | `@layer utilities › @media (hover: hover)` | `border-color: var(--color-neutral-900);` |
| `rb1jcld6n` | `@layer utilities` | `height: calc(var(--spacing)*7);` |
| `rb1jigx96` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1jll033` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1jwkkkl` | `@layer utilities` | `height: calc(var(--spacing)*5);` |
| `rb1jwyj6a` | `@layer utilities` | `padding-inline: calc(var(--spacing)*1.5);` |
| `rb1ki6yfe` | `@layer utilities` | `align-items: flex-start;` |
| `rb1kqjdni` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
