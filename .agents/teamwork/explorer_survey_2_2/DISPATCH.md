# DISPATCH — explorer_survey_2_2

## Task Assignment
- Role: Architecture, Physics & Hardware Resiliency Explorer
- Workspace root: C:\Users\wd\Documents\playwright-scraper
- Authoritative Request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (read ## 2026-10-04T20:14:18Z)
- Working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_2_2

## Objective
Investigate architectural specifications and feasibility for requirements R2, R3, R4, and R5:
1. R2: Finite State Machine (FSM) layer for checkout & B2B quote forms (Zag.js/XState design patterns, deterministic inline validation, adaptive masks, latency feedback, draft recovery). How should this be structured in `src/fsm/` or `src/forms/`?
2. R3: Analytical spring dynamics second-order ODE model (\ddot{x} + 2\zeta\omega_n\dot{x} + \omega_n^2 x = 0) in vanilla JS. How to implement closed-form integration (underdamped, critically damped, overdamped), velocity continuity, Vibration API haptic triggers, and prefers-reduced-motion fallback with zero overshoot.
3. R4: GPU texture pipeline via gltf-transform for KTX2/Basis Universal transcoding (VRAM <= 16MB) and visual saliency attention prediction oracle (first 500ms attention map, CTA prominence, AI distraction elimination).
4. R5: Hardware stress testing via Playwright CDP: CPU throttling (6x emulation), rAF 30fps simulation (Safari Low Power Mode), and WebGL context loss/recovery (`WEBGL_lose_context` or CDP simulation).
5. Report architectural designs, math formulas, API interfaces, and file boundaries in `handoff.md`.

## 2026-10-04T20:18:02Z
You are explorer_survey_2_2, an Architecture, Physics & Hardware Resiliency Explorer.
Working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_2_2
Workspace root: C:\Users\wd\Documents\playwright-scraper
Authoritative Request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (specifically read ## 2026-10-04T20:14:18Z)
Dispatch file: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_2_2\DISPATCH.md

Your task:
1. Read ORIGINAL_REQUEST.md (## 2026-10-04T20:14:18Z) focusing on R2, R3, R4, and R5.
2. Formulate the technical and mathematical architectures:
   - R2: FSM layer for forms (checkout / B2B quote) following Zag.js/XState finite state machine patterns: states, events, context, guards, deterministic inline validation, adaptive input masks, latency feedback states (idle, validating, submitting, error, success), draft localStorage recovery.
   - R3: Analytical spring dynamics second-order ODE model:
     \ddot{x} + 2\zeta\omega_n\dot{x} + \omega_n^2 x = 0
     Derive and specify exact closed-form analytical equations for underdamped (\zeta < 1), critically damped (\zeta = 1), and overdamped (\zeta > 1) motions with continuous velocity handoff upon drag release. Detail Vibration API haptic pulses for milestones (snap, release, error) and zero-overshoot clamp when prefers-reduced-motion is detected.
   - R4: GPU texture pipeline using gltf-transform for KTX2 / Basis Universal (ASTC/ETC1S/UASTC) to ensure VRAM <= 16MB. Define visual saliency attention prediction oracle (500ms initial glance, CTA optical prominence, visual clutter/distraction scoring).
   - R5: Playwright CDP adverse hardware stress testing: Emulation.setCPUThrottlingRate (6x), 30fps rAF clamping (Safari Low Power Mode simulation), and WebGL context lost/restored (`WEBGL_lose_context.loseContext()` & restoreContext()).
3. Write a comprehensive, structured handoff report in C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_2_2\handoff.md following the Handoff Protocol (Observation, Logic Chain, Caveats, Conclusion, Verification Method).
When finished, send a brief message to parent notifying that your report is ready.
