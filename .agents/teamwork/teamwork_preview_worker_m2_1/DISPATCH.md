# Dispatch: Worker M2 — Kinetic Trajectory & Dynamic Spatial Anchors

**Target**: C:\Users\wd\Documents\playwright-scraper
**Working Directory**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m2_1
**Authoritative Request**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
**Project Scope Document**: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
**Architecture Survey Report**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_explorer_survey_2\handoff.md

**Write Ownership (Exclusively owned files)**:
- `src/kinetic/trajectory-solver.js`
- `src/kinetic/optical-anchor-tracker.js`
- `src/kinetic/dynamic-anchor-coordinator.js`
- `src/kinetic/adaptive-constraints.js`
- `test/m2-kinetic-trajectory.test.js`

**Mandatory Integrity Warning**:
> DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

**Objective**:
Implement Requirement R2 per the architecture and contracts in `PROJECT.md`:
1. `src/kinetic/trajectory-solver.js`:
   - Continuous normalized scroll parameter $s = \text{clamp}((y - y_{\text{start}}) / (y_{\text{end}} - y_{\text{start}}), 0, 1)$.
   - Camera orbital trajectory $\vec{C}(s) = (\vec{P}(s), \vec{T}(s), \vec{U}(s), \text{fov}(s))$.
   - Centripetal Catmull-Rom splines ($C^2$ continuous, parameter $\alpha = 0.5$) for position and target interpolation across keyframe stations without cusps or overshoots.
   - Squad unit quaternion interpolation ($C^1$ smooth) for camera rotation without gimbal lock.
2. `src/kinetic/optical-anchor-tracker.js`:
   - Transforms 3D world interest points $\vec{X}_w = \mathbf{M}_{\text{model}} \vec{X}_{\text{local}}$ to View coordinates $\mathbf{V}(s)$, Clip coordinates $\mathbf{P}(s)$, and Normalized Device Coordinates (NDC) $\vec{X}_{\text{ndc}} \in [-1, 1]^3$.
   - Normal back-face culling: $\vec{N}_w \cdot (\vec{P}_{\text{cam}}(s) - \vec{X}_w) > 0$. If $\le 0$, smoothly fades anchor opacity.
   - BVH raycast occlusion gating: marks anchor occluded if product mesh geometry intersects ray.
   - Converts NDC to screen coordinates: $X_{\text{screen}} = ((X_{\text{ndc}} + 1)/2) \cdot W$, $Y_{\text{screen}} = ((1 - Y_{\text{ndc}})/2) \cdot H$.
3. `src/kinetic/dynamic-anchor-coordinator.js`:
   - Coordinates dynamic SVG leader lines `<path d="M x_screen,y_screen L x_card,y_card" .../>` and HTML annotation badges.
   - Implements spring-relaxation non-overlap positioning: guarantees $AABB(\text{Card}_i) \cap AABB(\text{Card}_j) = 0\text{px}^2$ and clamps within viewport safe area ($0\text{px}$ horizontal bleed).
4. `src/kinetic/adaptive-constraints.js`:
   - C3 Viewport Adaptation: in portrait viewports ($W/H < 1.0$), compensates FOV ($24^\circ \to 38^\circ$), pulls camera distance back $1.35\times$, and adds downward safe-area translation.
   - C4 Reduced Motion Adaptation: snaps camera when `prefers-reduced-motion` is active (`damp: 1.0`, `duration: 0.01s`), freezing noise shaders.
5. `test/m2-kinetic-trajectory.test.js`:
   - Comprehensive test verifying all M2 components, mathematical properties ($C^2$ continuity, quaternion normalization, NDC projection, 0px² overlap).
   - Run verification via `node --test test/m2-kinetic-trajectory.test.js`.
6. Document commands, code layout, and test results in `handoff.md` and send message to parent.


## 2026-10-03T07:27:40Z
You are Worker M2 for Requirement R2.
Your working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m2_1
Authoritative user request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
Project Scope Document: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
Your dispatch instructions: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m2_1\DISPATCH.md

You MUST read ORIGINAL_REQUEST.md first.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Exclusively owned files to implement:
- src/kinetic/trajectory-solver.js
- src/kinetic/optical-anchor-tracker.js
- src/kinetic/dynamic-anchor-coordinator.js
- src/kinetic/adaptive-constraints.js
- test/m2-kinetic-trajectory.test.js

Implement all modules according to PROJECT.md contracts (Catmull-Rom C^2 splines, Squad unit quaternions, NDC screen projection, normal back-face/BVH occlusion, AABB 0px^2 non-overlap, C3 mobile portrait rig, C4 reduced motion).
Run verification via node --test test/m2-kinetic-trajectory.test.js.
Write your handoff report to C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m2_1\handoff.md with test outputs, and send a message to parent when completed.
