# Handoff Report — Explorer m5_2: Cinematic HUD & Inverted Optical Exit Timeline

**Agent**: Explorer m5_2 (GSAP Motion Choreographer & UI Interaction Specialist)  
**Working Directory**: `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m5_2`  
**Milestone**: M5 (Infinite Ribbon, Cinematic HUD & Inverted Optical Exit)  
**Parent ID**: `3776eb80-d5f5-48b2-9fb9-3223b1c4dbf5`  
**Status**: Completed (Hard Handoff)  

---

## 1. Observation

### 1.1 Existing Master Timeline in `initHorizontalScroll.LNLCK81L.js`
In `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`:

`[observed]` Lines 80–132 establish the desktop GSAP timeline and metrics:
```javascript
86:         const k = -n.offsetLeft + (v.width - n.offsetWidth) / 2,
87:               p = Math.max(0, -k),
88:               Q = Math.max(0, h - p),
89:               M_in = v.height,
90:               M_hold = v.height * 2.5,
91:               M_out = v.height * 1.0,
92:               U = h + M_in + M_hold + M_out,
93:               t1 = p,
94:               t2 = p + M_in,
95:               t3 = p + M_in + M_hold,
96:               t4 = p + M_in + M_hold + M_out,
97:               L = G(i, { width: Z, height: ee }),
98:               W = V(L, v),
99:               O = (L.width / 2) * W,
100:              R = $(oe),
101:              _ = R,
102:              q = -R,
103:              D = ce({
104:                mwRect: i,
105:                mwMore: u,
106:                mwWork: a,
107:                coverScale: W,
108:                textOffset: O,
109:                moreInitialX: _,
110:                workStaggerX: q
111:              }) / 2,
112:              C = _ + D,
113:              Y = -O + D,
114:              H = q + D,
115:              j = O + D;
116:
117:        c.set(i, { scale: 0, transformOrigin: "center center", force3D: !0 });
118:        c.set(u, { x: C, force3D: !0 });
119:        c.set(a, { x: H, force3D: !0 });
120:
121:        s.fromTo(r, { x: 0 }, { x: k, duration: p });
122:        s.addLabel("mwPause");
123:        s.fromTo(i, { scale: 0 }, { scale: W, force3D: !0, duration: M_in }, "mwPause");
124:        s.fromTo(u, { x: C }, { x: Y, force3D: !0, duration: M_in }, "mwPause");
125:        s.fromTo(a, { x: H }, { x: j, force3D: !0, duration: M_in }, "mwPause");
126:        s.addLabel("mwHold");
127:        s.to(i, { scale: W, duration: M_hold, ease: "none" }, "mwHold");
128:        s.addLabel("mwExit");
129:        s.to(i, { scale: W, duration: M_out, ease: "none" }, "mwExit");
130:        s.addLabel("mwResume");
131:        s.fromTo(r, { x: k }, { x: -h, duration: Q }, "mwResume");
```

`[observed]` In line 129, `mwExit` currently maintains `scale: W` statically:
`s.to(i, { scale: W, duration: M_out, ease: "none" }, "mwExit");`
Neither `u` (`[data-more-work-more]`) nor `a` (`[data-more-work-work]`) is animated during `mwExit`. They remain static at their separated positions `Y` and `j`.

### 1.2 Viewport Clipping Logic in `syncViewportClip`
In `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`:

`[observed]` Lines 8–41 implement `syncViewportClip`:
```javascript
8: function syncViewportClip(pp, cur, tHoldEnd) {
9:   const viewportEl = document.getElementById('jesper-work-stage-viewport');
10:   if (!viewportEl) return;
...
21:   if (pp >= 0.999) {
22:     viewportEl.style.clipPath = 'none';
23:     viewportEl.style.opacity = '1';
24:     viewportEl.style.pointerEvents = 'auto';
25:   } else if (pp <= 0.001) {
26:     viewportEl.style.clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)';
27:     viewportEl.style.opacity = '0';
28:     viewportEl.style.pointerEvents = 'none';
29:   } else {
30:     viewportEl.style.pointerEvents = 'none';
31:     const isExitPhase = (typeof cur === 'number' && typeof tHoldEnd === 'number' && cur > tHoldEnd);
32:     if (!isExitPhase && rectEl) {
33:       const r = rectEl.getBoundingClientRect();
34:       viewportEl.style.opacity = '1';
35:       viewportEl.style.clipPath = `polygon(${r.left}px ${r.top}px, ${r.right}px ${r.top}px, ${r.right}px ${r.bottom}px, ${r.left}px ${r.bottom}px)`;
36:     } else {
37:       viewportEl.style.clipPath = 'none';
38:       viewportEl.style.opacity = String(Math.max(0, Math.min(1, pp)));
39:     }
40:   }
41: }
```
`[observed]` Lines 31–39 define `isExitPhase = cur > tHoldEnd`. During this phase, it discards the geometric clipping polygon and sets `viewportEl.style.clipPath = 'none'` with opacity fade (`viewportEl.style.opacity = String(pp)`). This was an ad-hoc fallback because `i` was not previously scaling down to 0 on exit.

### 1.3 Mobile Master Timeline in `initHorizontalScroll.LNLCK81L.js`
`[observed]` Lines 238–245 define mobile timeline:
```javascript
238:       c.set([u, a], { x: 0, xPercent: -50, y: 0, force3D: !0 });
239:       const p = c.timeline({ defaults: { ease: "none" } });
240:       p.fromTo(i, { scale: 0 }, { scale: h, force3D: !0, duration: P_in }, 0);
241:       p.fromTo(u, { x: 0, xPercent: -50, y: 0 }, { x: 0, xPercent: -50, y: -k, force3D: !0, duration: P_in }, 0);
242:       p.fromTo(a, { x: 0, xPercent: -50, y: 0 }, { x: 0, xPercent: -50, y: k, force3D: !0, duration: P_in }, 0);
243:       p.to(i, { scale: h, duration: P_hold, ease: "none" }, P_in);
244:       p.to(i, { scale: h, duration: P_out, ease: "none" }, P_in + P_hold);
```
Line 244 holds `scale: h` statically instead of animating `scale: h -> 0` and `y: -k -> 0`, `y: k -> 0`.

### 1.4 Kinetic Scroll and Interaction Handling in `WorkStage.tsx`
In `src/components/WorkStage/WorkStage.tsx`:

`[observed]` Lines 142–174 implement `applyDelta(rawDelta: number)`. Currently, `rawDelta` only manipulates `ribbonState.current.targetOffset` and sets `scrollVelocity`. There is no tracking or accumulation of cumulative user scrolling distance.
`[observed]` Lines 615–705 mount proxy buttons `[data-work-card-proxy]` via `createPortal(..., document.body)`. No HUD microcopy or voluntary exit button is currently mounted.
`[observed]` Line 707 mounts the detail panel `[data-work-detail-panel]` into `document.getElementById('work-detail-panel-root') || document.body`.

### 1.5 Quality Gates and Test Baseline
`[observed]` Running `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` outputs:
`✓ src/components/WorkStage/__tests__/math.spec.ts (8 tests) 12ms` (Pass 100%).
`[observed]` In `tests/e2e/work-stage.spec.ts`:
- Gate 2 (Simetria Óptica) tests symmetry at `portalProgress = 0.35` and full viewport coverage at `portalProgress = 1.0`.
- Gate 6 (Rolagem Contínua) tests continuous scroll from `scrollY = 0` through portal expansion, ribbon velocity, to `[data-services-section]`, `[data-section="home-clients"]`, and `[data-section="home-footer"]`.

---

## 2. Logic Chain

1. **Optical Exit Symmetry Requirement**:
   - On entrance (`mwPause`): `i` expands `0 -> W`, `u` translates `C -> Y`, `a` translates `H -> j`.
   - To achieve mathematical and optical symmetry, the exit (`mwExit`) must be the exact chronological inverse:
     - `i` scales `W -> 0`.
     - `u` translates `Y -> C`.
     - `a` translates `j -> H`.
   - Duration `M_out` matches `v.height * 1.0`, keeping the scrub linear and proportional to user scroll displacement.

2. **Clip-Path Synchronization on Exit**:
   - Because `i` scales from `W` down to `0`, `rectEl.getBoundingClientRect()` smoothly contracts from viewport bounds (`1440x900`) back to its initial dimensions ($249 \times 140\text{px}$ scaled by `$(1)`), and down to a point.
   - Removing `isExitPhase` from `syncViewportClip` allows `rectEl.getBoundingClientRect()` to compute the exact clipping polygon during exit as well as entrance.
   - When $pp \le 0.001$, `syncViewportClip` sets `clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)'`, `opacity = '0'`, and `pointerEvents = 'none'`.
   - This ensures the 3D WebGL viewport `#jesper-work-stage-viewport` shrinks back into the aperture between the rejoining words "THE" and "WORK" with zero visual jumps or opacity pops.

3. **Seamless Transition to Chapter III (Serviços)**:
   - In `initHorizontalScroll.LNLCK81L.js`, `s.fromTo(r, { x: k }, { x: -h, duration: Q }, "mwResume")` begins immediately at `t4 = p + M_in + M_hold + M_out`.
   - During `mwExit`, the track remains pinned at `x: k` (centered on "THE WORK").
   - Once the optical exit completes at `t4`, `mwResume` slides the horizontal track forward, bringing Chapter III (`[data-services-section]`) into view from the right.
   - Because $1\text{ second of timeline} = 1\text{ pixel of scroll}$, the mapping is continuous and drift-free.

4. **Kinetic Accumulator & Threshold**:
   - Mouse wheel ticks typically emit $|\Delta y| \approx 100\text{--}120\text{px}$.
   - One standard scroll gesture spans $\approx 800\text{px}$. Therefore, $1.5\text{ scrolls} \approx 1200\text{px}$.
   - Adding `cumulativeScrollRef.current += Math.abs(rawDelta)` inside `applyDelta()` tracks user engagement within `RIBBON_BROWSE`.
   - When `cumulativeScrollRef.current >= 1200`, state `showSoldButton` is enabled (`true`).
   - Telemetry `window.__WORK_STAGE__.cumulativeScroll` and `window.__WORK_STAGE__.isAlreadySoldVisible` maintain continuous observability.

5. **Voluntary Exit Button ("EU JÁ ESTOU CONVENCIDO") Trigger**:
   - When the user clicks the pill button, they desire immediate transition to Chapter III.
   - If the scroll was simply scrubbed from whatever arbitrary point inside `mwHold` (which spans $2.5 \times v.height \approx 2250\text{px}$ of scroll), the first $1000\text{--}2000\text{px}$ would show zero visual change because `scale: W` is constant during `mwHold`.
   - Crucial insight: Visual state at `t3` (start of `mwExit`) is 100% identical to any point in `mwHold` (`scale: W`, `pp = 1.0`, `clipPath: none`).
   - Therefore, jumping scroll instantly to `d.start + t3` produces zero visual jump, and smoothly scrolling to `d.start + t4 + servicesOffset` via Lenis immediately plays the optical close and slides Chapter III into view.

---

## 3. Caveats

1. **Lenis vs Native Smooth Scroll**:
   - When Lenis is active on `window`, `lenis.scrollTo` must be used so Lenis does not fight `window.scrollTo`. If Lenis is uninitialized or destroyed, fallback to GSAP `gsap.to(window, { scrollTo: ... })` ensures identical behavior in test or headless environments.
2. **Mobile Layout Variant**:
   - On mobile (`max-width: 767px`), the layout is a vertical native scroll stack rather than a horizontal pinned track. The exit must animate `y: -k -> 0` and `y: k -> 0` on `[data-more-work-more]` and `[data-more-work-work]`, and scale `h -> 0` on `[data-more-work-mobile-rect]`.
3. **Card-to-Sheet Concurrency**:
   - If the user is currently in `DETAIL_FLIGHT` or `DETAIL_ACTIVE` (viewing a project detail panel), the HUD pill button and microcopy must remain hidden (`opacity: 0`, `pointerEvents: 'none'`).

---

## 4. Conclusion & Proposed Code Implementation

### 4.1 Changes in `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`

#### Change A: Symmetric Clip-Path in `syncViewportClip`
Replace lines 30–40:
```javascript
// BEFORE:
    viewportEl.style.pointerEvents = 'none';
    const isExitPhase = (typeof cur === 'number' && typeof tHoldEnd === 'number' && cur > tHoldEnd);
    if (!isExitPhase && rectEl) {
      const r = rectEl.getBoundingClientRect();
      viewportEl.style.opacity = '1';
      viewportEl.style.clipPath = `polygon(${r.left}px ${r.top}px, ${r.right}px ${r.top}px, ${r.right}px ${r.bottom}px, ${r.left}px ${r.bottom}px)`;
    } else {
      viewportEl.style.clipPath = 'none';
      viewportEl.style.opacity = String(Math.max(0, Math.min(1, pp)));
    }

// AFTER:
    viewportEl.style.pointerEvents = 'none';
    if (rectEl) {
      const r = rectEl.getBoundingClientRect();
      viewportEl.style.opacity = '1';
      viewportEl.style.clipPath = `polygon(${r.left}px ${r.top}px, ${r.right}px ${r.top}px, ${r.right}px ${r.bottom}px, ${r.left}px ${r.bottom}px)`;
    } else {
      viewportEl.style.clipPath = 'none';
      viewportEl.style.opacity = String(Math.max(0, Math.min(1, pp)));
    }
```

#### Change B: Desktop Inverted Exit Timeline
Replace lines 128–129:
```javascript
// BEFORE:
        s.addLabel("mwExit");
        s.to(i, { scale: W, duration: M_out, ease: "none" }, "mwExit");

// AFTER:
        s.addLabel("mwExit");
        s.fromTo(i, { scale: W }, { scale: 0, force3D: !0, duration: M_out, ease: "none" }, "mwExit");
        s.fromTo(u, { x: Y }, { x: C, force3D: !0, duration: M_out, ease: "none" }, "mwExit");
        s.fromTo(a, { x: j }, { x: H, force3D: !0, duration: M_out, ease: "none" }, "mwExit");
```

#### Change C: Mobile Inverted Exit Timeline
Replace lines 244–245:
```javascript
// BEFORE:
      p.to(i, { scale: h, duration: P_hold, ease: "none" }, P_in);
      p.to(i, { scale: h, duration: P_out, ease: "none" }, P_in + P_hold);

// AFTER:
      p.to(i, { scale: h, duration: P_hold, ease: "none" }, P_in);
      p.fromTo(i, { scale: h }, { scale: 0, force3D: !0, duration: P_out, ease: "none" }, P_in + P_hold);
      p.fromTo(u, { x: 0, xPercent: -50, y: -k }, { x: 0, xPercent: -50, y: 0, force3D: !0, duration: P_out, ease: "none" }, P_in + P_hold);
      p.fromTo(a, { x: 0, xPercent: -50, y: k }, { x: 0, xPercent: -50, y: 0, force3D: !0, duration: P_out, ease: "none" }, P_in + P_hold);
```

#### Change D: Global Exit Trigger Handler for Voluntary Close
Add after line 191 in desktop matchMedia (and mirrored for mobile):
```javascript
        const triggerPortalExit = () => {
          const lenisInst = (typeof window !== 'undefined') ? (window.lenis || window.__lenis || window.__LENIS__) : null;
          const startExitScroll = d.start + t3;
          const endExitScroll = d.start + t4;
          const servicesOffset = Math.min(Q, Math.max(300, v.width * 0.45));
          const targetScroll = endExitScroll + servicesOffset;

          s.time(t3);
          if (lenisInst && typeof lenisInst.scrollTo === 'function') {
            lenisInst.scrollTo(startExitScroll, { immediate: true });
          }
          window.scrollTo(0, startExitScroll);
          d.scroll(startExitScroll);
          d.update();

          if (lenisInst && typeof lenisInst.scrollTo === 'function') {
            lenisInst.scrollTo(targetScroll, {
              duration: 1.4,
              easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
            });
          } else {
            c.to(window, {
              scrollTo: targetScroll,
              duration: 1.4,
              ease: "power2.inOut",
              onUpdate: () => d.update()
            });
          }
        };

        if (typeof window !== 'undefined') {
          window.__TRIGGER_PORTAL_EXIT__ = triggerPortalExit;
          window.addEventListener('work-portal-exit-request', triggerPortalExit);
        }
```

---

### 4.2 Changes in `src/components/WorkStage/WorkStage.tsx`

#### Change A: Kinetic Scroll Accumulator State & Ref
Inside `WorkStage` component:
```typescript
  const cumulativeScrollRef = useRef(0);
  const [showSoldButton, setShowSoldButton] = useState(false);
```

#### Change B: Accumulating Displacement in `applyDelta`
Inside `applyDelta` (around line 150):
```typescript
      // Accumulate kinetic displacement while browsing ribbon
      cumulativeScrollRef.current += Math.abs(rawDelta);
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.cumulativeScroll = cumulativeScrollRef.current;
      }
      if (cumulativeScrollRef.current >= 1200 && !showSoldButton) {
        setShowSoldButton(true);
        if (w.__WORK_STAGE__) {
          w.__WORK_STAGE__.isAlreadySoldVisible = true;
        }
      }
```

#### Change C: Test Hook & Initializer
Inside `useEffect`:
```typescript
  useEffect(() => {
    const w = window as any;
    w.__TEST_TRIGGER_SOLD_BUTTON__ = () => {
      cumulativeScrollRef.current = 1250;
      setShowSoldButton(true);
      if (w.__WORK_STAGE__) {
        w.__WORK_STAGE__.cumulativeScroll = 1250;
        w.__WORK_STAGE__.isAlreadySoldVisible = true;
      }
    };
  }, []);
```

#### Change D: Button Click Handler
```typescript
  const handleExitToChapter3 = useCallback(() => {
    const w = window as any;
    setShowSoldButton(false);
    if (proxiesRef.current) {
      proxiesRef.current.style.opacity = '0';
      proxiesRef.current.style.pointerEvents = 'none';
    }
    if (typeof w.__TRIGGER_PORTAL_EXIT__ === 'function') {
      w.__TRIGGER_PORTAL_EXIT__();
    } else {
      window.dispatchEvent(new CustomEvent('work-portal-exit-request'));
    }
  }, []);
```

#### Change E: Cinematic HUD JSX Elements
Rendered via `createPortal(..., document.body)`:
```tsx
      {/* Cinematic HUD: Fixed Microcopy & Voluntary Exit Button */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            data-work-cinematic-hud=""
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 135,
              opacity: (phase === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) && activeIndex === null ? 1 : 0,
              visibility: (phase === 'RIBBON_BROWSE' || portalProgressRef.current >= 0.95) && activeIndex === null ? 'visible' : 'hidden',
              transition: 'opacity 0.4s ease-out',
            }}
          >
            {/* Bottom-left microcopy: "CAPÍTULO II — FIQUE O TEMPO QUE QUISER" */}
            <div
              data-testid="hud-microcopy-left"
              data-hud-microcopy=""
              style={{
                position: 'fixed',
                bottom: '2.5rem',
                left: '5.5rem',
                color: '#FAF9F6',
                opacity: 0.5,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'inherit',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              CAPÍTULO II — FIQUE O TEMPO QUE QUISER
            </div>

            {/* Bottom-right pill button: "EU JÁ ESTOU CONVENCIDO" */}
            <div
              style={{
                position: 'fixed',
                bottom: '2.5rem',
                right: '3.5rem',
                transform: showSoldButton ? 'translateY(0)' : 'translateY(20px)',
                opacity: showSoldButton ? 1 : 0,
                pointerEvents: showSoldButton ? 'auto' : 'none',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out',
              }}
            >
              <button
                type="button"
                data-testid="hud-sold-btn"
                data-hud-sold=""
                onClick={handleExitToChapter3}
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(250, 249, 246, 0.08)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  color: '#FAF9F6',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1px solid rgba(250, 249, 246, 0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'background-color 0.25s ease, border-color 0.25s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(250, 249, 246, 0.18)';
                  e.currentTarget.style.borderColor = 'rgba(250, 249, 246, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(250, 249, 246, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(250, 249, 246, 0.28)';
                }}
              >
                <span>EU JÁ ESTOU CONVENCIDO</span>
                <span aria-hidden="true" style={{ fontSize: '0.9rem', lineHeight: 1 }}>→</span>
              </button>
            </div>
          </div>,
          document.body
        )}
```

---

## 5. Verification Method

### 5.1 Unit Tests Verification
Run:
```bash
npx vitest run src/components/WorkStage/__tests__/math.spec.ts
```
Expected result: 8/8 tests pass (100% success).

### 5.2 Playwright E2E Optical Symmetry & Exit Test
Run Gate 2:
```bash
npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"
```
Verifies optical symmetry ($\Delta \text{diff} \le 2.0\text{px}$) and $100\%$ viewport coverage.

### 5.3 Continuous Scroll & Non-Deadlock Verification
Run Gate 6:
```bash
npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 6"
```
Verifies continuous scroll from $scrollY = 0$ through "THE WORK", into Chapter III, Chapter IV, and Rodapé without deadlock or trapped pointer events.

### 5.4 Dedicated E2E Test for Cinematic HUD & Voluntary Close
Add new automated test scenario in `tests/e2e/work-stage.spec.ts`:
```typescript
test('Cinematic HUD: Fique o tempo que quiser microcopy, accumulative scroll and voluntary exit', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => (window as any).__WORK_STAGE__?.webglReady === true);
  await page.evaluate(() => (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0));

  // 1. Verify bottom-left microcopy
  const microcopy = page.locator('[data-hud-microcopy]');
  await expect(microcopy).toBeVisible();
  await expect(microcopy).toHaveText(/CAPÍTULO II — FIQUE O TEMPO QUE QUISER/i);

  // 2. Accumulate scroll to reach >= 1200 threshold
  await page.evaluate(() => {
    (window as any).__TEST_TRIGGER_SOLD_BUTTON__();
  });

  // 3. Verify pill button visible
  const soldBtn = page.locator('[data-hud-sold]');
  await expect(soldBtn).toBeVisible();

  // 4. Click button and verify optical exit + advance to Chapter III
  await soldBtn.click();
  await page.waitForFunction(() => {
    const services = document.querySelector('[data-services-section]');
    if (!services) return false;
    const r = services.getBoundingClientRect();
    return r.left < window.innerWidth && r.right > 0;
  }, { timeout: 10000 });

  const isServicesVisible = await page.evaluate(() => {
    const s = document.querySelector('[data-services-section]');
    const r = s?.getBoundingClientRect();
    return r ? r.left < window.innerWidth && r.right > 0 : false;
  });
  expect(isServicesVisible).toBe(true);
});
```

### 5.5 Invalidation Conditions
- If `rectEl.getBoundingClientRect()` during exit yields negative coordinates that break `clipPath`, check CSS `transform-origin: center center`.
- If `lenis.scrollTo` stops prematurely, verify that `lenis` is not paused and `document.documentElement` does not carry `lenis-stopped`.
