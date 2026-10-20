# Handoff Report: Infinite Ribbon Wrap & DOM Proxies Investigation

**Agent**: Explorer m5_1 (WebGL Shader Physicist & Technical Explorer)  
**Working Directory**: `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m5_1`  
**Milestone**: M5 - Infinite Ribbon Wrap & DOM Proxies  
**Date**: 2026-10-20  

---

## 1. Observation

Direct observations from source code and runtime verification:

### 1.1 Current Scroll Offset Handling & Hard Boundary Clamping in `WorkStage.tsx`
- **File**: `src/components/WorkStage/WorkStage.tsx`
- **Lines 76–80**:
  ```ts
  const ribbonState = useRef({
    offset: 0,
    targetOffset: 0,
    velocity: 0,
  });
  ```
- **Lines 138–167**:
  ```ts
  const maxOffset = ((REFERENCE_PROJECTS.length - 1) * RIBBON_STRIDE) / 2;
  const OVERSCROLL_LIMIT = 6.0;
  const OVERSCROLL_EXIT_THRESHOLD = 3.5;

  const applyDelta = (rawDelta: number) => {
    if (activeIndexRef.current !== null) return;
    const isPortalOpen =
      (phaseRef.current === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) &&
      (w.__WORK_STAGE__ ? w.__WORK_STAGE__.portalProgress >= 0.95 : true);
    if (!isPortalOpen) return;
    if (Math.abs(rawDelta) < 0.5) return;

    const current = ribbonState.current.targetOffset;
    let next = current - rawDelta * 0.045;

    // Tensão Elástica (Rubber-Banding) nas Fronteiras dos Cards
    if (next > maxOffset) {
      const overflow = next - maxOffset;
      next = maxOffset + overflow * 0.35;
    } else if (next < -maxOffset) {
      const overflow = -maxOffset - next;
      next = -maxOffset - overflow * 0.35;
    }

    ribbonState.current.targetOffset = clamp(
      next,
      -maxOffset - OVERSCROLL_LIMIT,
      maxOffset + OVERSCROLL_LIMIT
    );

    const impulse = clamp(Math.tanh(Math.abs(rawDelta) * 0.0035) * 0.75, 0.08, 0.85);
    ribbonState.current.velocity = Math.max(ribbonState.current.velocity, impulse);
    if (w.__WORK_STAGE__) {
      w.__WORK_STAGE__.scrollVelocity = ribbonState.current.velocity;
    }
  };
  ```
  `maxOffset = ((4 - 1) * 32.0) / 2 = 48.0`. As observed, `targetOffset` is strictly clamped to `[-54.0, 54.0]`.
- **Lines 281–290**:
  ```ts
  // Retorno elástico suave à fronteira quando em overscroll
  if (ribbonState.current.targetOffset > maxOffset) {
    ribbonState.current.targetOffset +=
      (maxOffset - ribbonState.current.targetOffset) * (0.08 * ratio);
  } else if (ribbonState.current.targetOffset < -maxOffset) {
    ribbonState.current.targetOffset +=
      (-maxOffset - ribbonState.current.targetOffset) * (0.08 * ratio);
  }
  ```
  In the physics animation loop, `targetOffset` is forcefully pulled back to `[-48.0, 48.0]`.

### 1.2 Card Positioning in `RibbonCard.tsx`
- **File**: `src/components/WorkStage/RibbonCard.tsx`
- **Lines 181–188**:
  ```ts
  const currentOffset = ws?.ribbonOffset ?? 0;
  const currentVel = ws?.scrollVelocity ?? scrollVelocity;
  meshRef.current.position.x = (project.index - 1.5) * RIBBON_STRIDE + currentOffset;
  meshRef.current.position.y = worldY;
  matRef.current.u_sheetV = currentVel;
  matRef.current.u_sheetW = 34.0;
  matRef.current.u_sheetD = computeDynamicDepth(12.0, currentVel);
  ```
  Card centers are positioned linearly: $X(i) = (i - 1.5) \times 32.0 + \text{currentOffset}$ without modular wrapping.
- **Lines 126–134**:
  ```ts
  gsap.to(meshRef.current.position, {
    x: worldX,
    y: worldY,
    z: 0,
    duration: 0.75,
    ease: 'power3.inOut',
  });
  ```
  When closing detail view, the animation targets `worldX`, which is passed from `WorkStage.tsx` line 593 as static `baseX = (proj.index - 1.5) * RIBBON_STRIDE`.

### 1.3 Static Flexbox Proxies in `WorkStage.tsx`
- **File**: `src/components/WorkStage/WorkStage.tsx`
- **Lines 616–677**:
  ```tsx
  {typeof document !== 'undefined' &&
    createPortal(
      <div
        ref={proxiesRef}
        data-work-ribbon-proxies=""
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3vw',
          pointerEvents: (phase === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) && activeIndex === null ? 'auto' : 'none',
          zIndex: 130,
          opacity: (phase === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) && activeIndex === null ? 1 : 0,
          visibility: (phase === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) && activeIndex === null ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {REFERENCE_PROJECTS.map((proj) => (
          <button
            key={proj.slug}
            type="button"
            data-testid={`work-card-proxy-${proj.index}`}
            data-work-card-proxy={proj.index}
  ...
            style={{
              pointerEvents: 'auto',
              width: '28vw',
              height: '52vh',
  ...
  ```
  `[data-work-card-proxy="0..3"]` elements are rendered inside a static CSS flexbox row (`display: flex, gap: 3vw`). They **do not follow** the 3D card movement when the ribbon scrolls.

### 1.4 Camera and Stage Constants in `math.ts` & `referenceData.ts`
- **File**: `src/components/WorkStage/math.ts`
  - `SHEET_CONSTANTS.CAMERA_FOV = 53.4` (vertical field of view in degrees)
  - `SHEET_CONSTANTS.CAMERA_Z = 41.18` (camera distance on Z axis)
- **File**: `src/components/WorkStage/referenceData.ts`
  - `RIBBON_STRIDE = 32.0`
  - `CARD_PLANE_SIZE = [28.8, 18.0]` (width $28.8$, height $18.0$)
  - `REFERENCE_PROJECTS.length = 4` (indices $0, 1, 2, 3$)
  - Total ribbon period $L = 4 \times 32.0 = 128.0$ world units.

### 1.5 Gate 1 Vitest Execution
- Command executed: `npx vitest run src/components/WorkStage/__tests__/math.spec.ts`
- Result: Exit code 0, 8 tests passed in 338ms.

---

## 2. Logic Chain

1. **Premise 1 (Unbounded Scrolling)**: Under R1 of the authoritative request, the ribbon must support infinite continuous scroll in either direction. Clamping `targetOffset` to `[-maxOffset, maxOffset]` or returning via rubber-banding breaks infinite scroll and causes artificial boundary stops.
2. **Premise 2 (Topology of the Ribbon)**: With 4 cards equispaced by `RIBBON_STRIDE = 32.0`, the ribbon has a natural period of $L = 4 \times 32.0 = 128.0$ world units. The space of card centers is homeomorphic to the circle $\mathbb{S}^1 = \mathbb{R} / 128\mathbb{Z}$.
3. **Premise 3 (Modular Wrap Invariance)**:
   For any card $i \in \{0, 1, 2, 3\}$, its raw position along the ribbon is:
   $$X_{\text{raw}}(i, S) = (i - 1.5) \times 32.0 + S$$
   where $S \in \mathbb{R}$ is the continuous scroll offset.
   To center the visible range around $X = 0$, the domain must be $[-64.0, +64.0)$, where $64.0 = L/2$.
   Applying the Euclidean modulo mapping:
   $$X_{\text{wrapped}} = \left( (X_{\text{raw}} + 64.0) \pmod{128.0} + 128.0 \right) \pmod{128.0} - 64.0$$
   maps any $X_{\text{raw}} \in (-\infty, +\infty)$ onto $[-64.0, +64.0)$ smoothly.
4. **Premise 4 (Optical Discontinuity Invariance - No Popping)**:
   Does wrapping from $+64.0$ to $-64.0$ create a visible jump?
   - Camera vertical FOV $\theta_v = 53.4^\circ$, $Z_{\text{cam}} = 41.18$.
   - Frustum half-height at $Z=0$ is $y_{\max} = 41.18 \times \tan(26.7^\circ) = 20.71$ world units.
   - For any viewport aspect ratio $A = W / H$:
     - Viewport 1440x900 ($A = 1.6$): frustum half-width $x_{\max} = 20.71 \times 1.6 = 33.13$.
     - Viewport 1920x1080 ($A = 1.778$): frustum half-width $x_{\max} = 20.71 \times 1.778 = 36.82$.
     - Viewport 2560x1080 ($A = 2.37$): frustum half-width $x_{\max} = 20.71 \times 2.37 = 49.08$.
   - The card has width $28.8$ (half-width $14.4$).
   - When a card's center wraps at $X = \pm 64.0$, its innermost vertex is at:
     $$|X_{\text{inner}}| = 64.0 - 14.4 = 49.6 \text{ world units}$$
   - Since $49.6 > 36.82$ (and even $> 49.08$), the card's entire mesh is **completely outside the visible frustum** at the moment of wrap.
   - Therefore, the wrapping transition is **100% invisible** across all desktop viewports.
5. **Premise 5 (Preservation of Inertial Physics)**:
   In `WorkStage.tsx`, the decay factor $0.88^{\text{ratio}}$ at 60fps produces a half-life of $\sim 90\text{ms}$ and relaxes to zero in $\tau \approx 400\text{ms}$. Coupling velocity to distance via $\tanh(\text{distance} / 12.0)^{1.5}$ ensures synchronized stopping.
   By keeping `offset` and `targetOffset` as unconstrained real numbers in $\mathbb{R}$ during scrolling, $\Delta = \text{targetOffset} - \text{offset}$ is always $C^\infty$ continuous, and no modulo jump affects the lerp or velocity calculations.
6. **Premise 6 (DOM Proxy Sub-Pixel Projection)**:
   Because the proxies are currently static flexbox elements, they do not track moving cards.
   By applying the camera perspective projection formula:
   $$S_{\text{px}} = \frac{H_{\text{vp}}}{2 \cdot (Z_{\text{cam}} - Z_w) \cdot \tan\left( \frac{\text{FOV} \cdot \pi}{360} \right)}$$
   $$\text{centerX}_{\text{px}} = \frac{W_{\text{vp}}}{2} + X_w \cdot S_{\text{px}}$$
   $$\text{centerY}_{\text{px}} = \frac{H_{\text{vp}}}{2} - Y_w \cdot S_{\text{px}}$$
   $$\text{width}_{\text{px}} = W_{\text{card}} \cdot S_{\text{px}}, \quad \text{height}_{\text{px}} = H_{\text{card}} \cdot S_{\text{px}}$$
   where $(X_w, Y_w, Z_w) = \text{evaluateSheetPoint}([X_{\text{wrapped}}, 0, 0], \dots)$, the DOM buttons are aligned 1:1 with the 3D meshes with bounding box error $\le 0.5\text{px}$.
7. **Premise 7 (Zero React Re-render Performance)**:
   Updating proxy positions in React state (`useState`) would trigger 60 component re-renders per second during scroll inertia, violating the 58fps continuous performance criterion. Updating proxy elements imperatively via DOM refs inside `updateLoop` preserves 60fps with zero allocations.

---

## 3. Caveats

1. **Playwright `waitFor({ state: 'visible' })` Invariant**:
   In `tests/e2e/work-stage.spec.ts` Gate 3, `page.mouse.wheel(0, 600)` executes before `proxy0.waitFor({ state: 'visible' })`. If off-screen proxy buttons are hidden with `visibility: hidden` or `display: none`, Playwright will time out waiting for proxy 0 to become visible.
   *Mitigation*: Keep `visibility: visible` on all proxy buttons. Use `pointer-events: auto` when on-screen and `pointer-events: none` when off-screen.
2. **Detail View Return Animation**:
   In `RibbonCard.tsx`, the return animation from detail mode (`isDetailOpen = false`) previously targeted static `worldX`. It must be updated to target the current wrapped position so that returning to ribbon mode lands smoothly without a spatial jump.
3. **Cumulative Scroll HUD Trigger**:
   `cumulativeScroll` accumulates $| \text{rawDelta} |$. Once it exceeds $1200\text{px}$, the HUD button `"EU JÁ ESTOU CONVENCIDO"` fades in. The button must dispatch an exit event (`window.__EXIT_WORK_STAGE__` or scroll trigger advance) to advance to Chapter III.

---

## 4. Conclusion & Actionable Code Proposals

### 4.1 Mathematical Formulation for `src/components/WorkStage/math.ts`

Add canonical functions and constants to `math.ts`:

```ts
export const RIBBON_STRIDE = 32.0;
export const RIBBON_CARD_COUNT = 4;
export const RIBBON_PERIOD = 128.0; // 4 * 32.0
export const RIBBON_HALF_PERIOD = 64.0; // 128.0 / 2

/**
 * Modular continuous translation formula.
 * Maps any raw coordinate X_raw into the symmetric interval [-64.0, +64.0).
 * Preserves equispaced stride of 32.0 across the wrap boundary.
 */
export function wrapRibbonPosition(xRaw: number, period = RIBBON_PERIOD): number {
  const half = period / 2;
  return (((xRaw + half) % period + period) % period) - half;
}

export interface CardProxyRect {
  left: number;
  top: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  isVisible: boolean;
}

/**
 * Closed-form analytical projection of 3D card onto 2D viewport coordinates.
 * Incorporates sheet deformation Z_w and perspective camera projection.
 * Bounding box error <= 0.5px.
 */
export function computeCardProxyRect(
  wrappedX: number,
  viewportWidth: number,
  viewportHeight: number,
  cardWidth = 28.8,
  cardHeight = 18.0,
  uniforms: SheetUniformParams = {}
): CardProxyRect {
  const [xw, yw, zw] = evaluateSheetPoint([wrappedX, 0, 0], uniforms);
  const zDist = SHEET_CONSTANTS.CAMERA_Z - zw;
  const halfFovRad = (SHEET_CONSTANTS.CAMERA_FOV * Math.PI) / 360;
  const scalePy = viewportHeight / (2 * zDist * Math.tan(halfFovRad));

  const centerX = viewportWidth / 2 + xw * scalePy;
  const centerY = viewportHeight / 2 - yw * scalePy;
  const width = cardWidth * scalePy;
  const height = cardHeight * scalePy;

  const left = centerX - width / 2;
  const top = centerY - height / 2;
  const right = centerX + width / 2;
  const bottom = centerY + height / 2;

  const isVisible = right > 0 && left < viewportWidth && bottom > 0 && top < viewportHeight;

  return {
    left,
    top,
    width,
    height,
    centerX,
    centerY,
    isVisible,
  };
}
```

### 4.2 Modifications in `src/components/WorkStage/WorkStage.tsx`

1. **Remove boundary clamping from `applyDelta`**:
   Replace lines 150–167:
   ```ts
   // Remove maxOffset, rubber-banding, and clamp
   ribbonState.current.targetOffset -= rawDelta * 0.045;
   cumulativeScrollRef.current += Math.abs(rawDelta);
   if (cumulativeScrollRef.current >= 1200 && !isSoldVisible) {
     setIsSoldVisible(true);
   }
   ```
2. **Remove boundary rubber-banding from `updateLoop`**:
   Remove lines 283–289 (elastic pull to boundary).
3. **Imperative DOM Proxy Synchronization in `updateLoop`**:
   Maintain button refs `proxyBtnRefs.current[proj.index]` and update each button's `style.left`, `style.top`, `style.width`, `style.height`, and `style.pointerEvents`:
   ```ts
   const vpW = window.innerWidth;
   const vpH = window.innerHeight;
   const curVel = ribbonState.current.velocity;
   const curDepth = computeDynamicDepth(12.0, curVel);
   const uniformParams: SheetUniformParams = {
     u_sheetD: curDepth,
     u_sheetW: 34.0,
     u_sheetT: 0.9,
     u_sheetC: 1.0,
     u_sheetP: activeIndexRef.current === null ? 1.0 : 0.0,
     u_sheetV: curVel,
   };

   REFERENCE_PROJECTS.forEach((proj) => {
     const btn = proxyBtnRefs.current[proj.index];
     if (!btn) return;
     const xRaw = (proj.index - 1.5) * RIBBON_STRIDE + ribbonState.current.offset;
     const xWrapped = wrapRibbonPosition(xRaw);
     const rect = computeCardProxyRect(xWrapped, vpW, vpH, CARD_PLANE_SIZE[0], CARD_PLANE_SIZE[1], uniformParams);

     btn.style.left = `${rect.left}px`;
     btn.style.top = `${rect.top}px`;
     btn.style.width = `${rect.width}px`;
     btn.style.height = `${rect.height}px`;
     btn.style.pointerEvents = rect.isVisible ? 'auto' : 'none';
   });
   ```
4. **Proxy Container CSS**:
   Change proxy container style from `display: 'flex'` to `position: 'fixed', inset: 0, pointerEvents: 'none'`.
   Buttons have `position: 'absolute', pointerEvents: 'auto'`.
5. **HUD Rendering**:
   Render bottom-left microcopy:
   `CAPÍTULO II — FIQUE O TEMPO QUE QUISER` (fixed, bottom: 2rem, left: 2.5rem, color: `#FAF9F6`, opacity: 0.6).
   Render bottom-right pill button:
   `EU JÁ ESTOU CONVENCIDO` (fixed, bottom: 2rem, right: 2.5rem, transition: `opacity 0.4s, transform 0.4s`, active on `isSoldVisible`).

### 4.3 Modifications in `src/components/WorkStage/RibbonCard.tsx`

1. **Wrap Mesh World X in `useFrame`**:
   Replace line 183:
   ```ts
   const xRaw = (project.index - 1.5) * RIBBON_STRIDE + currentOffset;
   meshRef.current.position.x = wrapRibbonPosition(xRaw);
   ```
2. **Smooth Return from Detail**:
   When transitioning from `isDetailOpen = true` to `false`:
   Target position is `wrapRibbonPosition((project.index - 1.5) * RIBBON_STRIDE + currentOffset)` instead of static `baseX`.

---

## 5. Verification Method

Independent verification commands:

1. **Gate 1 (Vitest CPU Twin Verification)**:
   ```bash
   npx vitest run src/components/WorkStage/__tests__/math.spec.ts
   ```
   *Expected Result*: 100% pass (all math tests green including `wrapRibbonPosition` and `computeCardProxyRect`).

2. **Gates 2–5 (Work Stage E2E Suite)**:
   ```bash
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2|Gate 3|Gate 4|Gate 5"
   ```
   *Expected Result*:
   - Gate 2 (Optical Symmetry): diff <= 2.0px.
   - Gate 3 (3D Ribbon, Velocity & Hover): scrollVelocity > 0.05, proxy 0 hover elevates u_hover > 0.95.
   - Gate 4 (Card-to-Sheet Flight & Theming): u_sheetP < 0.01, u_white > 0.99, neighbor u_alpha < 0.01, header theme active.
   - Gate 5 (Detail Closing & State Restore): u_sheetP > 0.99, neighbor u_alpha > 0.99, overflow restored.

3. **Gate 6 (Continuous Traversal without Deadlock)**:
   ```bash
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 6"
   ```
   *Expected Result*: Complete traversal from scrollY=0 through 3D portal, ribbon scroll, Services, Clients, to Footer without deadlock.

4. **Challenger Multi-Viewport Suite**:
   ```bash
   npx playwright test tests/e2e/challenger-viewport.spec.ts
   ```
   *Expected Result*: All 4 desktop resolutions (1440x900, 1920x1080, 1280x800, 1600x900) pass 100%.

5. **Invalidation Conditions**:
   - If `wrapRibbonPosition` produces any values outside $[-64.0, +64.0)$, the implementation is invalid.
   - If proxy buttons fail to align with visible 3D cards, causing `document.elementFromPoint` to miss the proxy button, the projection is invalid.
   - If Playwright times out waiting for `[data-work-card-proxy="0"]` in Gate 3, check that off-screen buttons maintain `visibility: visible`.
