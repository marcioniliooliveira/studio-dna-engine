# Kinetic Skill: khanhnguyen-design--work-horizontal-rail
> Archetype: **magnetic-rail** | Trigger: **scroll-linked** | Criticality: **primary** | Regime: **underdamped-spring**

## 1. UX Intent
- Tactile list item hover tracking with responsive directional arrow indicator.
- Pattern: `magnetic-rail` driven by `scroll-linked` (Priority: `primary`).
- Smooth continuity: switching items crossfades without flashing placeholder backdrop.

## 2. Physical Truth & Curves
- Trajectory: cubic-bezier(0.215, 0.61, 0.355, 1) (Schneider fit).
- Duration: 15000ms | Opacity fade: 300ms ease-out.
- Damping: Underdamped rapid settling without overshoot (zeta = 0.85).

## 3. Parametric Adaptive Math
- Arrow rest: `translate(calc(-1 * var(--scale)), calc(1 * var(--scale))) scale(0.6)`.
- Arrow active: `translate(0) scale(1)` | Origin: left bottom.
- Scale token: Fluid calc(100vw / 144) on desktop, calc(100vw / 39) on mobile.

## 4. Interruption FSM & Resilience
- States: idle -> crossfading -> active -> resetting.
- Overlap prevention: killTweensOf(previousTarget) before triggering new expand.
- Emergency reset: Escape keydown or window blur instantly restores idle state.

## 5. Accessibility & Reduced Motion
- Rule: @media (prefers-reduced-motion: reduce) forces 0.01ms duration and transform: none.
- Instant swap: Visual state toggles immediately without vestibular disorientation.