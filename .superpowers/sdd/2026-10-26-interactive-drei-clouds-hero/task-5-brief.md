# Task 5 Brief: End-to-End Browser Verification & Performance Audit

**Files:**
- Create: `studio-dna-engine/test/interactive-cloud-hero.html`
- Test: Open via Chrome DevTools, verify console logs, FPS, and capture visual screenshot.

**Requirements:**
1. `interactive-cloud-hero.html`:
   - Standalone browser-ready preview file containing Three.js (via CDN r128), OrbitControls, and Tailwind CSS (via CDN).
   - Inlined implementation of `wakeEngine`, `projectileMath`, and `cloudGenerator` so it runs seamlessly out of the box without bundlers.
   - 5 independent Drei-style volumetric cloud clusters rendered via `THREE.InstancedMesh` with soft Gaussian circular puff texture.
   - 4 high-speed glowing projectiles with trails and point lights in harmonic orbits.
   - In the render loop:
     - Updates projectile positions & velocities.
     - Calculates aerodynamic wake displacement and vortex swirl on all cloud puffs.
     - Damped harmonic relaxation restoring puffs to their baseline positions.
     - Full matrix updates on `instancedMesh`.
   - UI Overlay matching 21st.dev Hero:
     - Obsidian black background `#000000`.
     - Pill trust badge with ✨ icon and orange frosted border.
     - Headline line 1: "Launch Your" in orange/yellow/amber gradient.
     - Headline line 2: "Workflow Into Orbit" in yellow/orange/red gradient.
     - Compelling subtitle.
     - Dual CTA buttons (Primary & Secondary) with hover scale and backdrop blur.
   - Adds an FPS counter or console log output verifying render loop execution.
2. Run test and verify:
   - Zero console errors or warnings.
   - Frame rate maintains 60 FPS.
   - Visual screenshot confirming the independent fluffy clouds and projectile interaction.
