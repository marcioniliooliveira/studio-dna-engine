# Milestone M2 Worker Dispatch
Role: Milestone M2 Worker (Universal Acquisition & Motion Reverse Engineering)
Project Directory: c:\Users\USER\Documents\scraper e extracor\studio-dna-engine
Working Directory: c:\Users\USER\Documents\scraper e extracor\studio-dna-engine\.agents\teamwork\worker_m2_1
Original Request: c:\Users\USER\Documents\scraper e extracor\studio-dna-engine\.agents\teamwork\ORIGINAL_REQUEST.md
Project Plan: c:\Users\USER\Documents\scraper e extracor\studio-dna-engine\.agents\teamwork\orchestrator_1\PROJECT.md
Survey 2 Report: c:\Users\USER\Documents\scraper e extracor\studio-dna-engine\.agents\teamwork\explorer_survey_2\handoff.md
## 2026-10-05T20:50:37Z
You are Milestone M2 Worker (teamwork_preview_worker).
Your working directory is: c:\Users\USER\Documents\scraper e extracor\studio-dna-engine\.agents\teamwork\worker_m2_1
The project directory is: c:\Users\USER\Documents\scraper e extracor\studio-dna-engine
The authoritative original request is recorded at: c:\Users\USER\Documents\scraper e extracor\studio-dna-engine\.agents\teamwork\ORIGINAL_REQUEST.md
The project plan is at: c:\Users\USER\Documents\scraper e extracor\studio-dna-engine\.agents\teamwork\orchestrator_1\PROJECT.md

You MUST read ORIGINAL_REQUEST.md and PROJECT.md first.
Also read the Survey Explorer 2 report:
- c:\Users\USER\Documents\scraper e extracor\studio-dna-engine\.agents\teamwork\explorer_survey_2\handoff.md (contains detailed empirical proofs, mathematical formulation, and architecture for DeterministicCaptureEngine and NLLS MotionReverseEngine).

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your mission for Milestone M2 (Universal Acquisition & Motion Reverse Engineering):
1. Implement the Universal Acquisition & Deterministic Capture Engine in `src/core/deterministic-capture-engine.js`:
   - Use Playwright with Chromium flags: `--font-render-hinting=none`, `--disable-font-subpixel-positioning`, `--disable-lcd-text`, `--force-color-profile=srgb`.
   - Set viewport to 1280x800, deviceScaleFactor 1.
   - Freeze time by intercepting and locking `Date.now()` and `performance.now()` in page init scripts.
   - Inject CSS anti-aliasing normalization rules (`-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: geometricPrecision;`).
   - Pause animations via CDP `Animation.setPlaybackRate({ playbackRate: 0 })`.
   - Extract normalized DOM, CSS Typed OM, bounding client rects (rounded to 2 decimal places), and full accessibility tree (AOM) via CDP `Accessibility.enable` + `Accessibility.getFullAXTree`.
   - Serialize with recursive canonical key sorting and compute SHA-256 hash.
   - Running twice on the same reference MUST produce identical SHA-256 hashes (delta = 0).

2. Implement and refine Motion Reverse Engineering & Physics Fitting in `src/intelligence/motion-reverse-engine.js`:
   - Complete 1D harmonic oscillator step response model covering underdamped, critically damped, and overdamped dynamics.
   - Implement Non-Linear Least Squares (NLLS) regression (e.g. 2D Nelder-Mead simplex or Gauss-Newton) estimating damping (c), stiffness (k), and mass (m). Must achieve < 5% parameter error on known synthetic transitions (acceptance criterion).
   - Implement cubic-bezier inversion via Newton-Raphson iteration solving x(s) = t for s before evaluating y(s), and optimize control points (x1, y1, x2, y2).
   - Implement 60fps CSS transform sampling method `sampleTransformsAt60fps(page, selector, property, durationMs)`.

3. Create and execute `test/m2-capture-motion.test.js` validating:
   - Deterministic capture running twice on a reference yields delta = 0 SHA-256 hash.
   - Motion physics NLLS fitting reconstructs spring parameters with < 5% error on synthetic benchmarks (e.g. k=220, c=18; k=150, c=12; k=100, c=20).
   - Cubic-bezier inversion evaluates correctly and fits candidate curves.
   - Run `node --test test/m2-capture-motion.test.js` and ensure 100% pass.
   - Also run `node --test test/crp-pipeline.test.js` and `node --test test/m1-schemas-fixtures.test.js` to ensure zero regressions.

4. Write your detailed handoff report to `c:\Users\USER\Documents\scraper e extracor\studio-dna-engine\.agents\teamwork\worker_m2_1\handoff.md` and keep `progress.md` updated.
5. When complete, send a message to parent with your summary, test output, and handoff path.
