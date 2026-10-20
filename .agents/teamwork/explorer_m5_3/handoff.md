# Handoff Report — Explorer m5_3: Card-to-Sheet Choreography, Build & Gates

**Author**: Explorer m5_3 (QA Playwright Invariant Verifier & Build Integration Explorer)  
**Date**: 2026-10-20T15:52:00Z  
**Working Directory**: `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m5_3`  
**Milestone**: M5.3 Investigation & Invariant Verification  

---

## 1. Observation

### 1.1 Card-to-Sheet Transition in `src/components/WorkStage/WorkStage.tsx`
- **Existing Blind Timeout Logic**:
  - `src/components/WorkStage/WorkStage.tsx` line 418:
    ```ts
    openTimeoutRef.current = setTimeout(() => {
      phaseRef.current = 'DETAIL_ACTIVE';
      setPhase('DETAIL_ACTIVE');
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.phase = 'DETAIL_ACTIVE';
      }
      const root = document.getElementById('work-detail-panel-root');
      if (root) {
        root.setAttribute('aria-hidden', 'false');
        root.style.opacity = '1';
        root.style.pointerEvents = 'auto';
      }
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      const header = document.querySelector('header[data-intro-header]') as HTMLElement;
      if (header) {
        header.style.setProperty('--header-bg', '#faf9f6');
        header.style.setProperty('--header-text', '#2e2b28');
        header.style.setProperty('--header-border', '#b8b3ac');
        for (const el of header.querySelectorAll('svg rect')) {
          el.setAttribute('fill', '#2e2b28');
        }
      }
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('resize'));
    }, 900);
    ```
  - `src/components/WorkStage/WorkStage.tsx` line 482:
    ```ts
    closeTimeoutRef.current = setTimeout(() => {
      phaseRef.current = 'RIBBON_BROWSE';
      setPhase('RIBBON_BROWSE');
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.phase = 'RIBBON_BROWSE';
      }
    }, 800);
    ```
- **Existing Detail Panel Static DOM & CSS**:
  - `src/components/WorkStage/WorkStage.tsx` lines 712–738:
    ```tsx
    <div
      data-testid="work-detail-panel"
      data-work-detail-panel=""
      data-header-bg="#FAF9F6"
      data-header-text="#2E2B28"
      data-header-border="#b8b3ac"
      aria-hidden={activeIndex === null ? 'true' : 'false'}
      aria-label={`${displayProject.shortName} project details`}
      style={{
        position: 'fixed',
        inset: 0,
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 120,
        pointerEvents: activeIndex === null ? 'none' : 'auto',
        opacity: activeIndex === null ? 0 : 1,
        transition: 'opacity 0.4s ease-out',
        backgroundColor: BRAND_TOKENS.bgSurface,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3.5rem',
        paddingLeft: '5.5rem',
        color: BRAND_TOKENS.textDark,
      }}
    >
    ```
  - All internal DOM children (`header`, `h2[data-detail-title]`, `p` description, `footer`) have no individual entrance animations or motion paths; they enter as a monolithic block via the container's CSS transition `opacity 0.4s ease-out` after `setTimeout(900ms)` expires.

- **WebGL Mesh Flight in `src/components/WorkStage/RibbonCard.tsx`**:
  - `src/components/WorkStage/RibbonCard.tsx` lines 105–125:
    ```ts
    if (isDetailOpen) {
      gsap.to(meshRef.current.position, {
        x: 0,
        y: 0,
        z: 22,
        duration: 0.85,
        ease: 'expo.out',
      });
      gsap.to(matRef.current, {
        u_sheetP: 0.0,
        u_shade: 0.0,
        u_scrim: 0.0,
        duration: 0.85,
        ease: 'expo.out',
      });
      gsap.to(matRef.current, {
        u_white: 1.0,
        duration: 0.78,
        ease: 'expo.out',
      });
    }
    ```

---

### 1.2 Build Pipeline
- `package.json` line 37: `"build:workstage": "vite build --config vite.bundle.config.mjs"`
- `vite.bundle.config.mjs`:
  ```js
  export default defineConfig({
    build: {
      outDir: 'clientes/marcionilio-oliveira/site/assets/_astro',
      emptyOutDir: false,
      lib: {
        entry: path.resolve('src/components/WorkStage/mount.tsx'),
        name: 'WorkStage',
        formats: ['es'],
        fileName: () => 'workStage.bundle.js',
      },
      rollupOptions: {
        output: {
          format: 'es',
        },
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  });
  ```
- Command execution observed:
  - Command: `npm run build:workstage`
  - Exit code: `0`
  - Duration: `4.57s`
  - Output file: `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` (Size: `1,301.90 kB`, gzip: `320.35 kB`).
  - Inclusion in Astro site: `clientes/marcionilio-oliveira/site/index.html` line 217: `<script src="./assets/_astro/workStage.bundle.js" type="module"></script>`.

---

### 1.3 Automated Test Suites & Gates

#### Gate 1 (`src/components/WorkStage/__tests__/math.spec.ts`)
- Command: `npx vitest run src/components/WorkStage/__tests__/math.spec.ts`
- Status: **8 passed (8/8)**, Exit Code 0, Duration 1.04s.
- Verifications:
  1. `sheetDome([0.5, 0.5]) === 1.0` and corners/lateral borders = 0.0.
  2. `leanSlope(±1.0) === 0.0` (C^1 continuity), center slope = 1.5.
  3. `leanRamp(0.0) === 0.0`, `leanRamp(±1.0) === ±1.0`.
  4. `evaluateSheetPoint` identity mapping when `u_sheetP: 0, u_sheetV: 0.9`.
  5. `uvCover` ratio preservation.
  6. `roundedBox` SDF interior signed distance $< 0$.
  7. `sheetLit` Blinn-Phong positive RGB illumination vectors.
  8. `computeDynamicDepth(baseDepth, V)` scaling factor $(1 + 1.1 \cdot |V|)$ saturated at $V = 1.0$ ($25.2$ for base $12.0$).

#### Gates 2 through 5 (`tests/e2e/work-stage.spec.ts`)
- Command: `npx playwright test tests/e2e/work-stage.spec.ts`
- **Gate 2: Simetria Óptica e Expansão do Portal "THE WORK"**:
  - Status: **PASSED** (7.4s).
  - Assertion at `pp = 0.35`: $|(rect.left - more.right) - (work.left - rect.right)| \le 2.0\text{px}$ (Observed diff: $0.0002\text{px}$).
  - Assertion at `pp = 1.0`: `rectBox.width >= 1440`, `rectBox.height >= 900`, `rectBox.x <= 0`, `rectBox.y <= 0`.
  - Phase: `__WORK_STAGE__.phase === 'RIBBON_BROWSE'`.
- **Gate 3: Fita 3D com os 4 Projetos, Velocidade e Hover**:
  - Status: **PASSED** (6.8s).
  - Projects: `['0', '1', '2', '3']` mapping to `['evo-money', 'plant-tag', 'swisshaus', 'betahaus']`.
  - Wheel impulse: `scrollVelocity > 0.05`.
  - Proxy 0 hover: `cards[0].uniforms.u_hover > 0.95`.
- **Gate 4: Voo Espacial Card-to-Sheet e Visão Detalhada**:
  - Status: **PASSED** (15.3s).
  - Phase sequence: includes `'DETAIL_FLIGHT'`, settles to `'DETAIL_ACTIVE'`.
  - Shader uniforms Card 0: $u_{\text{sheetP}} < 0.01, u_{\text{white}} > 0.99, u_{\text{shade}} < 0.01, u_{\text{scrim}} < 0.01$.
  - Neighbor cards (1, 2, 3): $u_{\alpha} < 0.01$.
  - Panel DOM: `[data-work-detail-panel]` visible, `aria-hidden="false"`, opacity $> 0$, text matches `/evo\s*[-]?\s*money/i`.
  - Astro Header Theme: `--header-bg: #faf9f6`, `--header-text: #2e2b28`, `--header-border: #b8b3ac`.
  - Scroll lock: document/body `overflow === 'hidden'`.
- **Gate 5: Fecho do Detalhe e Restauração da Fita**:
  - Status: **PASSED** (38.5s).
  - Part A (Button `[data-detail-close]`): phase transitions through `'DETAIL_CLOSING'` $\to$ `'RIBBON_BROWSE'`, $u_{\text{sheetP}} > 0.99, u_{\text{white}} < 0.01, u_{\alpha} > 0.99$, panel closed/hidden, overflow restored `''`.
  - Part B (Escape key): phase transitions to `'RIBBON_BROWSE'`, all uniforms restored, overflow restored `''`.

#### Gate 6 (`tests/e2e/work-stage.spec.ts:654`)
- Status: **FAILED (Timeout 240000ms)**.
- Telemetry trace from task logs:
  - `[Gate 6 Step 0] scrollY=854.0, pp=0.00, phase=PORTAL_EXPAND, vel=0.00, footer=false`
  - `[Gate 6 Step 1] scrollY=1452.0, pp=0.00, phase=PORTAL_EXPAND, vel=0.00, footer=false`
  - `[Gate 6 Step 2] scrollY=2592.0, pp=0.00, phase=PORTAL_EXPAND, vel=0.00, footer=false`
  - At Step 2, `scrollY = 2592.0px`. As the wheel continues towards the boundary ($p = 2880\text{px}$ where `[data-more-work-section]` begins portal expansion), `await page.evaluate(...)` in step 3 hangs until test timeout.

#### Challenger Suite (`tests/e2e/challenger-viewport.spec.ts`)
- Command: `npx playwright test tests/e2e/challenger-viewport.spec.ts`
- Status: **6 passed (6/6)**, Exit Code 0, Duration 2.1m.
- Results per resolution:
  - Standard Desktop (1440x900): Diff = 0.00021px ($\le 2.0\text{px}$), Coverage = 1614.9x908.0px. **PASSED**.
  - Full HD Wide Desktop (1920x1080): Diff = 0.00006px ($\le 2.0\text{px}$), Coverage = 1931.6x1086.0px. **PASSED**.
  - 16:10 Laptop Screen (1280x800): Diff = 0.00006px ($\le 2.0\text{px}$), Coverage = 1442.2x810.8px. **PASSED**.
  - 16:9 Mid Desktop (1600x900): Diff = 0.00021px ($\le 2.0\text{px}$), Coverage = 1610.3x905.4px. **PASSED**.
  - Multi-Viewport Detail Flight & Header Theming across Desktop Resolutions: **PASSED**.
  - WebGL Lifecycle, Context Integrity & Memory Health (`isContextLost: false, glError: 0`): **PASSED**.

---

## 2. Logic Chain

```
[Observation 1.1: openTimeoutRef.current = setTimeout(..., 900)]
       │
       ▼
[Problem: Abrupt jump to DETAIL_ACTIVE at t = 0.9s; monolithic CSS transition: opacity 0.4s on container]
       │
       ▼
[Design: Fluid Staggered GSAP Choreography (Kp)]
  ├── t = 0.00s: WebGL Mesh forward flight (z: 22), uncurving (u_sheetP -> 0), wash (u_white -> 1), duration 0.85s (expo.out)
  ├── t = 0.25s: Project Title h2[data-detail-title] enters (y: 35 -> 0, opacity: 0 -> 1, duration 0.65s, expo.out)
  ├── t = 0.35s: Description p[data-detail-description] enters (y: 25 -> 0, opacity: 0 -> 1, duration 0.65s, expo.out)
  ├── t = 0.50s: Close Button [data-detail-close], tags, category pills enter (y: 15 -> 0, opacity: 0 -> 1, duration 0.55s, expo.out)
  └── t = 0.85s: Phase updates to DETAIL_ACTIVE, Astro header theme is set deterministically
       │
       ▼
[Assertion Match in Gate 4 & Challenger Suite]
  ├── detailPanel becomes visible early (t >= 0.25s) -> satisfies await expect(detailPanel).toBeVisible()
  ├── u_sheetP < 0.01 & u_white > 0.99 settle at t = 0.85s -> satisfies shader assertions
  ├── phaseSequence records ['RIBBON_BROWSE', 'DETAIL_FLIGHT', 'DETAIL_ACTIVE'] -> satisfies phase assertion
  └── header styles --header-bg: #faf9f6 & --header-text: #2e2b28 applied cleanly at t = 0.85s
```

```
[Observation 1.3: Gate 6 timeout at scrollY = 2592px (step 2 -> step 3)]
       │
       ▼
[Analysis: p = 2880px is the trigger for portal expansion in initHorizontalScroll.LNLCK81L.js]
  ├── At scrollY = 2592px + 800px = 3392px, the timeline enters the expand phase (t1 = 2880 to t2 = 3780)
  ├── syncViewportClip and __TEST_SET_PORTAL_PROGRESS__ trigger simultaneously
  ├── In WorkStage.tsx, window.addEventListener('wheel') captures wheel events on the entire window
  ├── Lenis onVirtualScroll encounters pointerEvents transitions on #jesper-work-stage-viewport
  └── Implementation of R1 (Infinite Ribbon Wrap) + R2 (HUD Exit button) + R3 (Inverted Optical Exit scale: W -> 0)
      removes the rigid boundary lock, ensuring continuous scroll traversal to Chapters III & IV without deadlocks
```

---

## 3. Caveats

1. **Gate 6 Current Status**:
   - Gate 6 in `tests/e2e/work-stage.spec.ts` currently fails with a 240s timeout at step 2. This is expected at this stage because the infinite ribbon wrap ($L = 128.0$), HUD exit button, and inverted optical exit timeline (`scale: W -> 0`) from the new user request have not yet been implemented in the codebase.
2. **Build Bundle Synchronization**:
   - Any modification to `src/components/WorkStage/WorkStage.tsx` or `RibbonCard.tsx` must be followed by `npm run build:workstage` to update `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`. Without running this build, Playwright tests will evaluate stale JavaScript.
3. **Detail Panel Background Layering**:
   - The DOM panel `[data-work-detail-panel]` is mounted with `zIndex: 120`. While the mesh in WebGL uncurves and flies forward ($z \to 22$ at `zIndex: 15`), the DOM panel's background must remain transparent or fade in synchronously with $u_{\text{white}}$, otherwise the 3D WebGL flight would be visually occluded behind an opaque DOM sheet.

---

## 4. Conclusion & Concrete Recommendations for Implementation

### 4.1 Card-to-Sheet Staggered Choreography Formulation ($Kp$)

In `src/components/WorkStage/WorkStage.tsx`:
1. **DOM Element Refs**:
   Attach React refs to key structural elements of the detail panel:
   - `panelRef` -> `div[data-work-detail-panel]`
   - `titleRef` -> `h2[data-detail-title]`
   - `descRef` -> `p[data-detail-description]`
   - `closeBtnRef` -> `button[data-detail-close]`
   - `metaRef` -> `header > p` (chapter/category info)
   - `footerRef` -> `footer` (project index and CTA)

2. **GSAP Entrance Timeline (`openTimelineRef`)**:
   In `handleOpenProject(index: number)`:
   - Immediately set phase to `'DETAIL_FLIGHT'`, `activeIndex = index`, `scrollVelocity = 0`.
   - Update global telemetry: `w.__WORK_STAGE__.phase = 'DETAIL_FLIGHT'`.
   - Clear any pending close timeline.
   - Kill any active tween on the elements.
   - Set initial positions:
     ```ts
     gsap.set(panelRef.current, { opacity: 1, pointerEvents: 'auto' });
     gsap.set(titleRef.current, { y: 40, opacity: 0 });
     gsap.set(descRef.current, { y: 30, opacity: 0 });
     gsap.set([closeBtnRef.current, metaRef.current, footerRef.current], { y: 20, opacity: 0 });
     ```
   - Build GSAP timeline:
     ```ts
     const tl = gsap.timeline({
       onComplete: () => {
         updatePhase('DETAIL_ACTIVE');
         // Deterministically enforce Astro header light theme
         const header = document.querySelector('header[data-intro-header]') as HTMLElement;
         if (header) {
           header.style.setProperty('--header-bg', '#FAF9F6');
           header.style.setProperty('--header-text', '#2E2B28');
           header.style.setProperty('--header-border', '#b8b3ac');
           for (const el of header.querySelectorAll('svg rect')) {
             el.setAttribute('fill', '#2E2B28');
           }
         }
       }
     });

     // Staggered sequence:
     // Project title enters at t = 0.25s
     tl.to(titleRef.current, { y: 0, opacity: 1, duration: 0.65, ease: 'expo.out' }, 0.25);
     // Description enters at t = 0.35s
     tl.to(descRef.current, { y: 0, opacity: 1, duration: 0.65, ease: 'expo.out' }, 0.35);
     // Tags, pills & close button enter at t = 0.50s
     tl.to([closeBtnRef.current, metaRef.current, footerRef.current], { y: 0, opacity: 1, duration: 0.55, ease: 'expo.out' }, 0.50);
     ```

3. **GSAP Exit Timeline on `handleCloseProject`**:
   - Immediately set phase to `'DETAIL_CLOSING'`.
   - Sinks down text and controls:
     ```ts
     gsap.to([titleRef.current, descRef.current, closeBtnRef.current, metaRef.current, footerRef.current], {
       y: 20,
       opacity: 0,
       duration: 0.3,
       ease: 'power2.in',
     });
     gsap.to(panelRef.current, {
       opacity: 0,
       duration: 0.35,
       delay: 0.15,
       onComplete: () => {
         panelRef.current.style.pointerEvents = 'none';
         updatePhase('RIBBON_BROWSE');
       }
     });
     ```
   - Immediately restores dark header theme:
     ```ts
     const header = document.querySelector('header[data-intro-header]') as HTMLElement;
     if (header) {
       header.style.setProperty('--header-bg', '#3A3632');
       header.style.setProperty('--header-text', '#f3eee8');
       header.style.setProperty('--header-border', '#5a524d');
       for (const el of header.querySelectorAll('svg rect')) {
         el.setAttribute('fill', '#f3eee8');
       }
     }
     ```

### 4.2 Exact Gate Selectors and Assertion Contract Table

| Gate | Test File & Name | Target Selectors | Exact Expected Value |
|---|---|---|---|
| **Gate 1** | `src/components/WorkStage/__tests__/math.spec.ts` | Pure Math Functions | 8/8 tests pass (`sheetDome`, `leanSlope`, `leanRamp`, `evaluateSheetPoint`, `uvCover`, `roundedBox`, `sheetLit`, `computeDynamicDepth`) |
| **Gate 2** | `tests/e2e/work-stage.spec.ts` (Gate 2) | `[data-more-work-rect]`, `[data-more-work-more]`, `[data-more-work-work]` | At $p=0.35$: $\Delta \text{gap} \le 2.0\text{px}$; at $p=1.0$: $\text{width} \ge 1440$, $\text{height} \ge 900$, $x \le 0, y \le 0$, phase = `'RIBBON_BROWSE'` |
| **Gate 3** | `tests/e2e/work-stage.spec.ts` (Gate 3) | `[data-work-card-proxy="0..3"]` | 4 cards, slugs match canonical order; wheel event sets `scrollVelocity > 0.05`; hover sets `cards[0].uniforms.u_hover > 0.95` |
| **Gate 4** | `tests/e2e/work-stage.spec.ts` (Gate 4) | `[data-work-card-proxy="0"]`, `[data-work-detail-panel]`, `header[data-intro-header]` | Phase transitions `'DETAIL_FLIGHT'` $\to$ `'DETAIL_ACTIVE'`; $u_{\text{sheetP}} < 0.01, u_{\text{white}} > 0.99, u_{\text{shade}} < 0.01, u_{\text{scrim}} < 0.01$; neighbor $u_{\alpha} < 0.01$; detail panel visible with text `/evo\s*[-]?\s*money/i`; header CSS variables `--header-bg: #faf9f6`, `--header-text: #2e2b28`, `--header-border: #b8b3ac` |
| **Gate 5** | `tests/e2e/work-stage.spec.ts` (Gate 5) | `[data-detail-close]`, keyboard `Escape` | Phase transitions `'DETAIL_CLOSING'` $\to$ `'RIBBON_BROWSE'`; $u_{\text{sheetP}} > 0.99, u_{\text{white}} < 0.01, u_{\alpha} > 0.99$; detail panel closed (`aria-hidden="true"` or opacity 0); document overflow restored to `''` |
| **Gate 6** | `tests/e2e/work-stage.spec.ts` (Gate 6) | `[data-horizontal-pin]`, `[data-section="home-footer"]`, `[data-services-section]`, `[data-section="home-clients"]` | Continuous wheel scroll from $scrollY = 0$ traverses through portal apex (`portalProgress >= 0.95`), Services, Clients, to Footer without deadlock ($\le 7$ stuck ticks); footer settles $\le 100\text{px}$; 0 runtime errors |
| **Challenger** | `tests/e2e/challenger-viewport.spec.ts` | 4 Viewports (1440x900, 1920x1080, 1280x800, 1600x900) | 100% pass across all 4 viewports; optical symmetry $\le 2.0\text{px}$; viewport coverage $100\%$; detail flight across 3 viewports; WebGL context healthy (`isContextLost: false, glError: 0`) |

---

## 5. Verification Method

To independently verify all findings and test suites:

1. **Unit Test Suite (Gate 1)**:
   ```bash
   npx vitest run src/components/WorkStage/__tests__/math.spec.ts
   ```
   *Expected*: 8 passed (8/8), exit code 0.

2. **Challenger Multi-Viewport Suite**:
   ```bash
   npx playwright test tests/e2e/challenger-viewport.spec.ts
   ```
   *Expected*: 6 passed (6/6), exit code 0.

3. **E2E Gates 2 through 5**:
   ```bash
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2|Gate 3|Gate 4|Gate 5"
   ```
   *Expected*: 4 passed, exit code 0.

4. **Build Verification**:
   ```bash
   npm run build:workstage
   ```
   *Expected*: Outputs `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` with exit code 0.
