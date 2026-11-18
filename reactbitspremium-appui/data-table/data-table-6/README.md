# data-table-6

> **Category:** Data Table (`data-table`)  
> **Domain:** Data, Dashboards & Monitoring  
> **Source:** [https://pro.reactbits.dev/docs/app-ui/data-table/data-table-6](https://pro.reactbits.dev/docs/app-ui/data-table/data-table-6)  
> **Native Viewport:** `1280px × 720px`

Table with a synced detail panel

---

## 0. Interactive React Source & Runtime
- **Default Source:** [`data-table-6.jsx`](./data-table-6.jsx) (minHeight: `720px`, hooks: `disconnect`, `observe`, `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState`)
- **Sorbet Source:** [`data-table-6.sorbet.jsx`](./data-table-6.sorbet.jsx) (minHeight: `840px`)
- **Interactive Capsule:** [`capsule.html`](./capsule.html)
---
## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | 164 |
| **Max DOM Depth** | 13 |
| **Atomic/Scoped Classes** | 202 |
| **Buttons** | 13 |
| **Inputs / Textareas / Selects** | 1 / 0 / 0 |
| **Tables / Dialogs / Links** | 0 / 0 / 0 |
| **SVGs / Canvases** | 2 / 0 |
| **ARIA Roles** | None |

### Visible Headings & Interactive Labels
- `Live shipments`
- `Search shipments`
- `Everbranch Foods Fresno → Denver In transit`
- `Meridian Lab Supply Boston → Raleigh At risk`
- `North Pier Robotics Austin → Mesa Delivered`
- `Longleaf Clinical Research Network International Newark → Montreal In transit`
- `Cedar Mill Provisions Portland → Eugene In transit`
- `Bellwether Cold Storage Atlanta → Nashville Delivered`
- `Ridgeway Medical Supply Denver → Cheyenne At risk`
- `Anchor Point Seafood Seattle → Spokane In transit`
- `Harbor Grove Dairy Sacramento → Reno In transit`
- `Vantage Pharma Distribution Chicago → Columbus At risk`
- `Tidewater Produce Norfolk → Richmond Delivered`
- `Everbranch Foods`
- `Notes`
- `Activity`
- `Message driver`
- `Mark delivered`

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **`--rb-*` Theme Tokens:** `--rb-accent`, `--rb-accent-fg`, `--rb-font-sans`, `--rb-n-100`, `--rb-n-200`, `--rb-n-300`, `--rb-n-400`, `--rb-n-50`, `--rb-n-500`, `--rb-n-600`, `--rb-n-700`, `--rb-n-800`, `--rb-n-900`, `--rb-n-950`, `--rb-r-lg`, `--rb-r-sm`, `--rb-section-min-h`
- **`--sc-*` Scoped Tokens:** None
- **Easing Curves:** `cubic-bezier(.2,0,0,1)`, `cubic-bezier(0.2, 0, 0, 1)`
- **JEV 2.0 Classification:** Archetype `tactile-trigger` | Trigger `state-discrete` | Regime `underdamped-spring`

---

## 3. Decompiled CSS Classes (Sample 80 of 201)

| Class | Context | Declarations |
| :--- | :--- | :--- |
| `block-scale-preview` | `base` | `--rb-section-min-h: 100%;` |
| `rb-theme-scope` | `base` | `--color-neutral-50: var(--rb-n-50,oklch(98.5% 0 0)); --color-neutral-100: var(--rb-n-100,oklch(97% 0 0)); --color-neutral-200: var(--rb-n-20` |
| `rb104y8cz` | `@layer utilities` | `min-height: calc(var(--spacing)*0);` |
| `rb112gn09` | `@layer utilities` | `background-color: rgba(0, 0, 0, 0);` |
| `rb11bdu17` | `@layer utilities` | `width: calc(var(--spacing)*1.5); height: calc(var(--spacing)*1.5);` |
| `rb11uyn8i` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-to: #f5f5f508;` |
| `rb11wmjxf` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(245, 245, 245, 0.32);` |
| `rb121ryde` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.09);` |
| `rb127rmwx` | `@layer utilities › @media (min-width: 64rem)` | `display: flex;` |
| `rb12ib5p4` | `@layer utilities` | `color: rgba(245, 245, 245, 0.66);` |
| `rb12jfiya` | `@layer utilities` | `transition-property: opacity; transition-timing-function: var(--tw-ease,var(--default-transition-timing-function)); transition-duration: var` |
| `rb143600o` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb144te3j` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*1);` |
| `rb15bzf7p` | `@layer utilities › @media (hover: hover)` | `border-color: rgba(23, 23, 23, 0.32);` |
| `rb15cy15` | `@layer utilities` | `border-color: var(--rb-accent,oklch(100% 0 0));` |
| `rb15ry6e1` | `@layer utilities` | `padding-block: calc(var(--spacing)*2);` |
| `rb162eyjf` | `@layer utilities` | `transition-property: border-color, box-shadow, background-color; transition-timing-function: var(--tw-ease,var(--default-transition-timing-f` |
| `rb166dqn` | `@layer utilities` | `outline-style: var(--tw-outline-style); outline-width: 2px;` |
| `rb16bxdrz` | `@layer utilities` | `padding-block: calc(var(--spacing)*4);` |
| `rb16lyc6f` | `@layer utilities` | `--tw-shadow: 0 1px 2px -1px var(--tw-shadow-color,#0000005c); box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-o` |
| `rb16ttrwj` | `@layer utilities` | `padding-inline-start: calc(var(--spacing)*2);` |
| `rb16vv2jj` | `@layer utilities` | `overflow-y: auto;` |
| `rb1775mfn` | `@layer utilities` | `background-color: rgba(23, 23, 23, 0.08);` |
| `rb179lagq` | `@layer utilities` | `background-color: var(--color-neutral-900);` |
| `rb17pzpgs` | `@layer utilities` | `font-size: 12px; line-height: 16px;` |
| `rb17qw7iy` | `@layer utilities` | `width: calc(var(--spacing)*2.5); height: calc(var(--spacing)*2.5);` |
| `rb181gofg` | `@layer utilities` | `padding-top: calc(var(--spacing)*4);` |
| `rb18incu` | `@layer utilities` | `display: block;` |
| `rb19b8cbg` | `@layer utilities` | `font-family: var(--font-jetbrains-mono);` |
| `rb19m3ix0` | `@layer utilities` | `opacity: 1;` |
| `rb19zc7z7` | `@layer utilities` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1ay9ntr` | `@layer utilities` | `gap: calc(var(--spacing)*.5);` |
| `rb1aymfpe` | `@layer utilities › @media (min-width: 64rem)` | `flex-shrink: 0;` |
| `rb1btgk7t` | `@layer utilities` | `height: calc(var(--spacing)*12);` |
| `rb1cdfrlr` | `@layer utilities` | `height: calc(var(--spacing)*14);` |
| `rb1cqhuar` | `@layer utilities` | `outline-offset: 2px;` |
| `rb1cu1ik2` | `@layer utilities` | `align-items: flex-start;` |
| `rb1cxeyzp` | `@layer utilities` | `height: calc(var(--spacing)*16);` |
| `rb1ddrell` | `@layer utilities` | `transform-origin: 0px 0px;` |
| `rb1e62hyg` | `@layer utilities` | `--tw-duration: 60ms; transition-duration: 60ms;` |
| `rb1ebbyz3` | `@layer utilities` | `background-color: var(--color-neutral-950);` |
| `rb1ekrk76` | `@layer utilities` | `color-scheme: dark;` |
| `rb1f4prpi` | `@layer utilities` | `font-size: 14px; line-height: 16px;` |
| `rb1faehwh` | `@layer utilities` | `opacity: 0.4;` |
| `rb1fs288l` | `@layer utilities` | `font-size: 13px; line-height: 18px;` |
| `rb1fyhrwv` | `@layer utilities` | `color: rgba(23, 23, 23, 0.66);` |
| `rb1fyk6qa` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1fzv4vn` | `@layer utilities` | `bottom: calc(var(--spacing)*0);` |
| `rb1ggz0a4` | `@layer utilities` | `width: 100%;` |
| `rb1gm0c5j` | `@layer utilities` | `padding-inline-end: calc(var(--spacing)*1);` |
| `rb1gnst8y` | `@layer utilities` | `color: var(--color-neutral-100);` |
| `rb1gpfhz1` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-position: to bottom;` |
| `rb1gxye8l` | `@layer utilities` | `font-size: 14px; line-height: 20px;` |
| `rb1gze05l` | `@layer utilities` | `--tw-gradient-from: var(--color-neutral-900); --tw-gradient-stops: var(--tw-gradient-via-stops,var(--tw-gradient-position),var(--tw-gradient` |
| `rb1hkwp6x` | `@layer utilities` | `--tw-duration: .12s; transition-duration: 0.12s;` |
| `rb1j9gx58` | `@layer utilities` | `box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);` |
| `rb1jaeo4l` | `@layer utilities` | `border-color: var(--rb-accent,oklch(20.5% 0 0));` |
| `rb1jpi912` | `@layer utilities › @media (hover: hover)` | `background-color: rgba(245, 245, 245, 0.05);` |
| `rb1jpuagg` | `@layer utilities` | `text-align: left;` |
| `rb1khyve3` | `@layer utilities` | `border-color: currentcolor;` |
| `rb1knuyr0` | `@layer utilities` | `--tw-ring-color: #17171714;` |
| `rb1kzn6lj` | `@layer utilities` | `color: rgba(23, 23, 23, 0.8);` |
| `rb1l91zgo` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1l9avsd` | `@layer utilities` | `mask-image: linear-gradient(90deg, rgb(0, 0, 0) calc(100% - 24px), rgba(0, 0, 0, 0));` |
| `rb1m5bbsk` | `@layer utilities` | `outline-offset: calc(-2px);` |
| `rb1mc4vhx` | `@layer utilities` | `clip-path: inset(50%); white-space: nowrap; border-width: 0px; width: 1px; height: 1px; margin: -1px; padding: 0px; overflow: hidden;` |
| `rb1mhvolj` | `@layer utilities` | `justify-content: flex-end;` |
| `rb1mpw61y` | `@layer utilities` | `user-select: none;` |
| `rb1nh3fo3` | `@layer utilities › @media (hover: hover)` | `--tw-gradient-from: #f5f5f508;` |
| `rb1npqae7` | `@layer utilities` | `align-items: center;` |
| `rb1nyj4ma` | `@layer utilities` | `color: var(--rb-accent-fg,oklch(100% 0 0));` |
| `rb1o0a5n1` | `@layer utilities` | `top: calc(var(--spacing)*0);` |
| `rb1p8yxyy` | `@layer utilities` | `color: rgba(245, 245, 245, 0.4);` |
| `rb1r515s1` | `@layer utilities` | `border-radius: var(--rb-r-lg,10px);` |
| `rb1rcwwe2` | `@layer utilities` | `--tw-shadow: 0 0 #0000; box-shadow: var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),va` |
| `rb1rejjgw` | `@layer utilities` | `min-height: calc(var(--spacing)*10);` |
| `rb1rtbf2s` | `@layer utilities` | `--tw-font-weight: 450; font-weight: 450;` |
| `rb1rykacr` | `@layer utilities` | `--tw-ring-shadow: var(--tw-ring-inset,)0 0 0 calc(3px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor); box-shadow: var(--tw-` |
| `rb1t1bozg` | `@layer utilities` | `--tw-ring-color: #f5f5f514;` |
| `rb1tcxuyi` | `@layer utilities › @media (prefers-reduced-motion: reduce)` | `animation: auto ease 0s 1 normal none running none;` |
