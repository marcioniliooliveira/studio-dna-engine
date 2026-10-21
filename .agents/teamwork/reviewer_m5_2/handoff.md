# Handoff Report — Reviewer m5_2: GSAP Motion & Optical Exit Symmetry

**Subagent**: `reviewer_m5_2` (GSAP Motion Choreographer & Optical Exit Reviewer)  
**Parent Agent**: `3776eb80-d5f5-48b2-9fb9-3223b1c4dbf5`  
**Working Directory**: `.agents/teamwork/reviewer_m5_2`  
**Date**: 2026-10-20T18:52:00Z  
**Verdict**: **APPROVE**

---

## 1. Observation

### A. Codebase Inspection

1. **Symmetric Inverted Optical Exit Timeline** (`clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`):
   - Lines 120–133:
     ```javascript
     s.fromTo(r, { x: 0 }, { x: k, duration: p });
     s.addLabel("mwPause");
     s.fromTo(i, { scale: 0 }, { scale: W, force3D: !0, duration: M_in }, "mwPause");
     s.fromTo(u, { x: C }, { x: Y, force3D: !0, duration: M_in }, "mwPause");
     s.fromTo(a, { x: H }, { x: j, force3D: !0, duration: M_in }, "mwPause");
     s.addLabel("mwHold");
     s.to(i, { scale: W, duration: M_hold, ease: "none" }, "mwHold");
     s.addLabel("mwExit");
     s.fromTo(i, { scale: W }, { scale: 0, force3D: !0, duration: M_out, ease: "none" }, "mwExit");
     s.fromTo(u, { x: Y }, { x: C, force3D: !0, duration: M_out, ease: "none" }, "mwExit");
     s.fromTo(a, { x: j }, { x: H, force3D: !0, duration: M_out, ease: "none" }, "mwExit");
     s.addLabel("mwResume");
     s.fromTo(r, { x: k }, { x: -h, duration: Q }, "mwResume");
     ```
   - In `mwPause`, `i` scales $0 \to W$, text `u` translates $C \to Y$, text `a` translates $H \to j$.
   - In `mwExit`, `i` scales $W \to 0$, text `u` translates $Y \to C$, text `a` translates $j \to H$. The starting and ending points are exact symmetric mirrors.
   - Mobile exit timeline (`lines 280–285`) mirrors the desktop structure ($i$: $0 \to h \to h \to 0$; $u$: $0 \to -k \to 0$; $a$: $0 \to k \to 0$).

2. **Optical Polygon Clipping** (`clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`):
   - Lines 8–40:
     ```javascript
     function syncViewportClip(pp, cur, tHoldEnd) {
       const viewportEl = document.getElementById('jesper-work-stage-viewport');
       if (!viewportEl) return;
       ...
       if (pp >= 0.999) {
         viewportEl.style.clipPath = 'none';
         viewportEl.style.opacity = '1';
         viewportEl.style.pointerEvents = 'auto';
       } else if (pp <= 0.001) {
         viewportEl.style.clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)';
         viewportEl.style.opacity = '0';
         viewportEl.style.pointerEvents = 'none';
       } else {
         viewportEl.style.pointerEvents = 'none';
         if (rectEl) {
           const r = rectEl.getBoundingClientRect();
           viewportEl.style.opacity = '1';
           viewportEl.style.clipPath = `polygon(${r.left}px ${r.top}px, ${r.right}px ${r.top}px, ${r.right}px ${r.bottom}px, ${r.left}px ${r.bottom}px)`;
         } else {
           viewportEl.style.clipPath = 'none';
           viewportEl.style.opacity = String(Math.max(0, Math.min(1, pp)));
         }
       }
     }
     ```
   - No `isExitPhase` conditional hack exists. The polygon dynamically samples `rectEl.getBoundingClientRect()` during both entrance ($t_1 \le cur \le t_2$) and exit ($t_3 \le cur \le t_4$).
   - When $pp \ge 0.999$, `clipPath = 'none'` prevents sub-pixel boundary artifacts during browsing.
   - When $pp \le 0.001$, `clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)'` and `pointerEvents = 'none'` fully collapse the viewport.

3. **Staggered Card-to-Sheet Choreography ($Kp$)** (`src/components/WorkStage/WorkStage.tsx` and `RibbonCard.tsx`):
   - `RibbonCard.tsx` lines 105–125: At $t = 0$, mesh starts 3D flight to $[0, 0, 22]$ over $0.85$s with `expo.out`, uncurving $u_{\text{sheetP}} \to 0$, $u_{\text{shade}} \to 0$, $u_{\text{scrim}} \to 0$, with white wash $u_{\text{white}} \to 1.0$ at $0.78$s.
   - `WorkStage.tsx` lines 520–559:
     - Nodes initially hidden: `gsap.set(titleRef, { y: 40, opacity: 0 })`, `gsap.set(descRef, { y: 30, opacity: 0 })`, `gsap.set(others, { y: 20, opacity: 0 })`.
     - Title animation: starts at $t = 0.25$s (duration $0.60$s, `y: 40 -> 0`, `opacity: 0 -> 1`, `expo.out`).
     - Description animation: starts at $t = 0.35$s (duration $0.50$s, `y: 30 -> 0`, `opacity: 0 -> 1`, `expo.out`).
     - Close button, meta, footer: starts at $t = 0.50$s (duration $0.35$s, `y: 20 -> 0`, `opacity: 0 -> 1`, `expo.out`).
     - Convergence: All sub-animations converge exactly at $t = 0.85$s ($0.25+0.60 = 0.85$, $0.35+0.50 = 0.85$, $0.50+0.35 = 0.85$).
     - At $t = 0.85$s, `onComplete` transitions phase to `DETAIL_ACTIVE` and applies Astro header theme (`--header-bg: #faf9f6`, `--header-text: #2e2b28`, `--header-border: #b8b3ac`).

4. **Clean Closure on Button and Escape Key** (`src/components/WorkStage/WorkStage.tsx`):
   - Lines 563–623 (`handleCloseProject`):
     - Cancels active open/close timelines: `openTimelineRef.current.kill()`.
     - Immediately switches phase to `DETAIL_CLOSING`.
     - Restores Astro dark theme immediately (`--header-bg: #3A3632`, `--header-text: #f3eee8`, `--header-border: #5a524d`).
     - Content timeline dismisses items down (`y: 20`, `opacity: 0`, duration $0.30$s, `power2.in`).
     - Panel fades out (`duration: 0.35s`, `power2.inOut`).
     - On completion: settles phase to `RIBBON_BROWSE`, unlocks document overflow, restores neighbor cards $u_{\text{alpha}} > 0.99$.
   - Lines 626–634: Escape key listener actively triggers `handleCloseProject()`.

### B. Independent Verification Run

Command:
```powershell
npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4|Gate 5"
```

Result:
```
Running 2 tests using 1 worker

PAGE CONSOLE: warning [.WebGL-0x318c00193c00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels
...
RIGHT AFTER CLICK: {"phase":"DETAIL_FLIGHT","activeProjectIndex":0,"seq":["RIBBON_BROWSE","DETAIL_FLIGHT"]}
PAGE CONSOLE: log HEADER THEME CHECK: {"bg":"#faf9f6","text":"#2e2b28","border":"#b8b3ac"}
  ok 1 [chromium] › tests\e2e\work-stage.spec.ts:283:7 › Gate 4: Voo Espacial Card-to-Sheet e Visão Detalhada › Voo tridimensional do Card 0, descurvatura, fade dos vizinhos e ativação do tema no header Astro (15.5s)
  ok 2 [chromium] › tests\e2e\work-stage.spec.ts:461:7 › Gate 5: Fecho do Detalhe e Restauração da Fita › Fecho via botão e Escape, restauração de curvatura, vizinhos e overflow (18.5s)

  2 passed (35.3s)
```

---

## 2. Logic Chain

1. **Optical Exit Symmetry**:
   - `initHorizontalScroll.LNLCK81L.js` sets initial conditions at start of entrance: $i$ `scale: 0`, $u$ `x: C`, $a$ `x: H`.
   - In entrance tween (`mwPause`), $i$ reaches scale $W$, $u$ reaches $Y$, $a$ reaches $j$.
   - In exit tween (`mwExit`), $i$ interpolates $W \to 0$, $u$ interpolates $Y \to C$, and $a$ interpolates $j \to H$.
   - Because $(W, Y, j)$ and $(0, C, H)$ are the exact endpoints of both tweens with identical linear scrubs (`ease: "none"`), the exit geometry is a mathematical inverse of the entrance.

2. **Discontinuity-Free Polygon Clipping**:
   - `syncViewportClip` reads `rectEl.getBoundingClientRect()` at each frame.
   - During `mwExit`, `rectEl` stays pinned and scales down symmetrically toward the origin.
   - Viewport clipping polygon tracks `[r.left, r.top, r.right, r.bottom]`, resulting in a shrinking rectangular portal aperture without coordinates jumping or clipping flips.
   - At $pp \le 0.001$, `clipPath` snaps to degenerate polygon `polygon(0 0, 0 0, 0 0, 0 0)` and `pointerEvents` is disabled, handing back interaction to the horizontal pin track smoothly.

3. **Card-to-Sheet Choreography Fidelity**:
   - The Jesper Landberg model requires text emergence during mesh uncurving rather than after a monolithic timeout.
   - The staggered timeline $Kp$ triggers mesh uncurving at $t=0$, project title emergence at $t=0.25$s, body description at $t=0.35$s, and ancillary metadata/close button at $t=0.50$s.
   - Because all tweens share the `expo.out` easing and conclude at $t=0.85$s, visual settling occurs simultaneously with the landing of the mesh at $z=22$, eliminating perceptual lag.
   - At $t=0.85$s, the transition to `DETAIL_ACTIVE` sets the Astro light header variables, and `MutationObserver` locks them against third-party scroll observer collisions.

4. **Integrity Audit**:
   - Source code in `WorkStage.tsx` and `initHorizontalScroll.LNLCK81L.js` was audited for dummy facades, test sniffer heuristics, or hardcoded mock returns. None were found.
   - Shaders, uniforms ($u_{\text{sheetP}}, u_{\text{hover}}, u_{\text{white}}, u_{\text{shade}}, u_{\text{scrim}}, u_{\text{sheetV}}, u_{\text{sheetD}}, u_{\text{alpha}}$), and 3D positions are genuinely computed and rendered via R3F Canvas and GLSL.
   - Test execution independently validated Gate 4 and Gate 5 with exit code 0.

---

## 3. Caveats

- **No caveats.** The implementation satisfies all acceptance criteria in `ORIGINAL_REQUEST.md` (header `## 2026-10-20T15:19:36Z`) and `DISPATCH.md`.
- Hardware note: In headless software WebGL rendering, initial frame readbacks emit `GPU stall due to ReadPixels` diagnostic warnings from Chromium's OpenGL driver; these are expected in virtualization environments and do not affect runtime execution or visual fidelity.

---

## 4. Conclusion

**Verdict: APPROVE**

- Symmetric inverted optical exit: Verified. `mwExit` scales $W \to 0$ and texts return to initial coordinates.
- Polygon clipping: Verified. Dynamic bounding rect polygon tracking without discontinuities or `isExitPhase` hack.
- Card-to-Sheet choreography ($Kp$): Verified. Fluid staggered GSAP timeline ($t=0, 0.25, 0.35, 0.50$s) converging at $0.85$s with Astro light theme activation.
- Closure robustness: Verified. Clean dismissal via close button and Escape key, restoring dark header theme and `RIBBON_BROWSE` without residual scroll locks.
- Independent verification: Gate 4 and Gate 5 pass cleanly (35.3s, exit code 0).

---

## 5. Verification Method

To independently verify this evaluation:

1. **Execute Playwright Gate 4 & 5 E2E Tests**:
   ```bash
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4|Gate 5"
   ```
   *Expected output: 2 passed in ~35s with exit code 0.*

2. **Inspect Exit Timeline Symmetry**:
   Open `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js` lines 120–133. Verify `mwExit` reverses $i$ ($W \to 0$), $u$ ($Y \to C$), and $a$ ($j \to H$).

3. **Inspect Card-to-Sheet Choreography ($Kp$)**:
   Open `src/components/WorkStage/WorkStage.tsx` lines 520–559. Verify staggered offsets at $0.25$s, $0.35$s, and $0.50$s with `expo.out` easing and simultaneous completion at $0.85$s.
