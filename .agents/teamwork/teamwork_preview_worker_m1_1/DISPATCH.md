# Dispatch: Worker M1 — CDP Semantic Decompiler & Sanitizer Pipeline

**Target**: C:\Users\wd\Documents\playwright-scraper
**Working Directory**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m1_1
**Authoritative Request**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
**Project Scope Document**: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
**Architecture Survey Report**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_explorer_survey_2\handoff.md

**Write Ownership (Exclusively owned files)**:
- `src/cdp/kinetic-timeline-interceptor.js`
- `src/cdp/runtime-hook-injector.js`
- `src/cdp/tracker-sanitizer.js`
- `src/cdp/semantic-skeleton-normalizer.js`
- `test/m1-cdp-decompiler.test.js`

**Mandatory Integrity Warning**:
> DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

**Objective**:
Implement Requirement R1 per the architecture and contracts in `PROJECT.md`:
1. `src/cdp/kinetic-timeline-interceptor.js`:
   - Connects to Playwright CDP session (`page.context().newCDPSession(page)`).
   - Enables and coordinates `Animation`, `DOM`, `CSS`, `Performance`, and `DOMDebugger` domains.
   - Captures animation timelines (CSS Animation, CSSTransition, WebAnimation), box models, matched styles, and performance timing metrics.
   - Emits structured `KineticTimelineIR`.
2. `src/cdp/runtime-hook-injector.js`:
   - Injected via `Page.addScriptToEvaluateOnNewDocument`.
   - Monkey-patches RAF loop to record frame delta and jitter.
   - Hooks `window.gsap` and `ScrollTrigger` instances (`window.ScrollTrigger.getAll()`, `gsap.globalTimeline.getChildren()`).
   - Hooks `THREE.WebGLRenderer.prototype.render` to capture camera type, FOV, world matrix, and projection matrix.
3. `src/cdp/tracker-sanitizer.js`:
   - Tier 1: CDP `Network.setBlockedURLs` blocking analytics domains (Google Analytics, GTM, Meta Pixel, Hotjar, Clarity, Segment, Mixpanel, Amplitude, TikTok, Datadog, Sentry). Stubs `navigator.sendBeacon`.
   - Tier 2: In-memory global stubs (`dataLayer`, `gtag`, `fbq`, `clarity`, `mixpanel`).
   - Tier 3: Cheerio/PostCSS AST cleaner removing tracking scripts, beacons, tracking attributes (`data-gtm-*`, etc.) while preserving kinetic attributes (`data-scroll-*`, `data-deep-scrutiny-*`).
4. `src/cdp/semantic-skeleton-normalizer.js`:
   - Normalizes cloned DOM: unmasks SplitText lines, removes preloader curtain traps, neutralizes hostile overflow-hidden on sticky ancestors, localizes remote CDN assets to relative paths, and configures video streaming.
5. `test/m1-cdp-decompiler.test.js`:
   - Comprehensive test verifying all M1 components and edge cases.
   - Run verification via `node --test test/m1-cdp-decompiler.test.js`.
6. Document commands, code layout, and test results in `handoff.md` and send message to parent.


## 2026-10-03T07:27:40Z
From: 7f17d6be-3ed5-4772-a1bc-f856778ab425
Content:
You are Worker M1 for Requirement R1.
Your working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m1_1
Authoritative user request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
Project Scope Document: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
Your dispatch instructions: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m1_1\DISPATCH.md

You MUST read ORIGINAL_REQUEST.md first.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Exclusively owned files to implement:
- src/cdp/kinetic-timeline-interceptor.js
- src/cdp/runtime-hook-injector.js
- src/cdp/tracker-sanitizer.js
- src/cdp/semantic-skeleton-normalizer.js
- test/m1-cdp-decompiler.test.js

Implement all modules according to PROJECT.md contracts. Run verification via node --test test/m1-cdp-decompiler.test.js.
Write your handoff report to C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m1_1\handoff.md with test outputs, and send a message to parent when completed.
