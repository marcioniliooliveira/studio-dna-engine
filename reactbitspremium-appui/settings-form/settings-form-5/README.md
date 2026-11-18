# settings-form-5

> **Category:** Settings Form (`settings-form`)  
> **Domain:** Forms, Modals, Auth & Workflows  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/settings-form/settings-form-5](https://pro.reactbits.dev/docs/app-ui/settings-form/settings-form-5)  
> **Native Viewport:** `1280px × 800px`

API keys with reveal and rotate

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`settings-form-5.jsx`](./settings-form-5.jsx) (minHeight: `800px`, hooks: `Fragment`, `disconnect`, `observe`, `useCallback`, `useEffect`, `useRef`, `useState`)
- **Sorbet Source:** [`settings-form-5.sorbet.jsx`](./settings-form-5.sorbet.jsx) (minHeight: `820px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 112 |
| **Max DOM Depth** | 12 |
| **Atomic/Scoped Classes** | 199 |
| **Buttons** | 13 |
| **Inputs / Textareas / Selects** | 3 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 10 / 0 |
| **ARIA Roles** | `status`, `switch` |

### Visible Headings & Interactive Labels
- `API keys`
- `Create key`
- `Secret keys`
- `Integrations`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `pointer-proximity` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 194)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb109v177` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb11aawp6` | `@layer utilities` | `justify-content: space-between;` |
| `rb123d6c1` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb12mxbbj` | `@layer utilities` | `background-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb1313vub` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb133kun5` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb13hkcti` | `@layer utilities` | `--tw-shadow: inset 0 0 0 1px var(--tw-shadow-color,var(--rb-accent,oklch(20.5% 0 0))),inset 0 1px 2px var(--tw-shadow-color,#0000006b);` |
| `rb13ojvp9` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb13pob85` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb13xlw63` | `@layer utilities` | `max-width: 60ch;` |
| `rb13yks1w` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb147518s` | `@layer utilities › @media (hover: hover)` | `--tw-inset-ring-color: var(--color-neutral-100);` |
| `rb147g1jb` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*1);` |
| `rb148mi8e` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb149t5kb` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.08);` |
| `rb14n2l1s` | `@layer utilities` | `flex: 1 1 0%;` |
| `rb15kffa4` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-950); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb15wduwg` | `@layer utilities` | `gap: calc(var(--spacing)*2);` |
| `rb165cw9s` | `@layer utilities` | `margin-inline: auto;` |
| `rb166dglf` | `@layer utilities` | `gap: calc(var(--spacing)*3);` |
| `rb16didr2` | `@layer utilities` | `margin-inline: calc(var(--spacing)*1);` |
| `rb16j33j` | `@layer utilities` | `background-color: var(--rb-accent-fg,oklch(20.5% 0 0));` |
| `rb16onqv2` | `@layer utilities` | `user-select: none;` |
| `rb16pro8s` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb16qcnzd` | `@layer utilities` | `gap: calc(var(--spacing)*1);` |
| `rb17bpr0h` | `@layer utilities` | `--tw-inset-ring-color: #17171780;` |
| `rb17emri4` | `@layer utilities` | `margin-top: calc(var(--spacing)*.5);` |
| `rb17kbh2a` | `@layer utilities` | `gap: calc(var(--spacing)*4);` |
| `rb18894eo` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb18k9ywa` | `@layer utilities` | `background-color: var(--color-neutral-50);` |
| `rb1929z2c` | `@layer utilities` | `--tw-ease: cubic-bezier(.2,0,0,1); transition-timing-function: cubic-bezier(0.2, 0, 0, 1);` |
| `rb19ig59i` | `@layer utilities` | `cursor: default;` |
| `rb1a7mcmu` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*3);` |
| `rb1afrp1e` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb1aqb2k9` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.4);` |
| `rb1b8sxdm` | `@layer utilities` | `color-scheme: dark;` |
| `rb1bfri9x` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1c1dgy7` | `@layer utilities` | `padding: calc(var(--spacing)*.5);` |
| `rb1cceta5` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1dnihmz` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1drzstm` | `@layer utilities` | `cursor: not-allowed;` |
| `rb1dxx7bv` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb1e7u9c2` | `@layer utilities` | `inset-inline: calc(var(--spacing)*0);` |
| `rb1eapi97` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb1elmi2j` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.05);` |
| `rb1erw0es` | `@layer utilities` | `min-height: calc(var(--spacing)*5);` |
| `rb1etuypn` | `@layer utilities` | `scale: 0.98;` |
| `rb1fq669` | `@layer utilities` | `position: relative;` |
| `rb1friixj` | `@layer utilities` | `align-items: center;` |
| `rb1gipczs` | `@layer utilities` | `padding-block: calc(var(--spacing)*2.5);` |
| `rb1gnf25z` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*0);` |
| `rb1gxfhkb` | `@layer utilities` | `border-style: var(--tw-border-style); border-width: 1px;` |
| `rb1h0lg14` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1hal1q3` | `@layer utilities` | `min-height: calc(var(--spacing)*11);` |
| `rb1hhe91v` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1hpr4r8` | `@layer utilities` | `margin-bottom: calc(var(--spacing)*1);` |
| `rb1i50ic6` | `@layer utilities` | `background-color: var(--color-white);` |
| `rb1ikjmgs` | `@layer utilities` | `--tw-font-weight: var(--font-weight-normal); font-weight: var(--font-weight-normal);` |
| `rb1irs1je` | `@layer utilities` | `cursor: progress;` |
| `rb1itqsr` | `@layer utilities` | `height: 100%;` |
| `rb1j0mbbi` | `@layer utilities` | `--tw-tracking: -.015em; letter-spacing: -0.015em;` |
| `rb1jigx96` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb1jll033` | `@layer utilities` | `color: rgba(245, 245, 245, 0.8);` |
| `rb1jwkkkl` | `@layer utilities` | `height: calc(var(--spacing)*5);` |
| `rb1ki6yfe` | `@layer utilities` | `align-items: flex-start;` |
| `rb1kkhr3z` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb1kqjdni` | `@layer utilities` | `height: calc(var(--spacing)*8);` |
| `rb1lhdrtj` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb1loafqh` | `@layer utilities` | `pointer-events: none;` |
| `rb1lta49u` | `@layer utilities` | `color: rgba(23, 23, 23, 0.4);` |
| `rb1mcmpec` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb1mdgsyb` | `@layer utilities` | `cursor: pointer;` |
| `rb1mvvlv5` | `@layer utilities › @media (hover: hover)` | `--tw-brightness: brightness(110%);` |
| `rb1n5qpn8` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb1n6v0kj` | `@layer utilities` | `width: calc(var(--spacing)*6); height: calc(var(--spacing)*6);` |
| `rb1nhlqsn` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb1nqu7yh` | `@layer utilities` | `width: calc(var(--spacing)*4); height: calc(var(--spacing)*4);` |
| `rb1ozmcp7` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
