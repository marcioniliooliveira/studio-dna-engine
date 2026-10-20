# Local Skill Copy: webapp-testing
Original Path: c:\Users\wd\Documents\playwright-scraper\.agents\skills\webapp-testing\SKILL.md

Core Methodology:
E2E testing with Playwright, visual and stress testing, auto-waiting, resilient selectors, non-flaky assertions, testing user behavior rather than implementation details.

Key Checklist for Scroll and Stress Verification:
1. Validate realistic user gestures (mouse wheel, touch, keyboard, drag)
2. Assert progression through all scroll milestones (Hero/Portal -> 3D Stage -> Chapter III -> Chapter IV -> Footer)
3. Catch deadlocks (pointer-events blocking scroll, fixed overlays intercepting wheel events, Lenis / ScrollTrigger pin loops, unreleased pins)
4. Check edge cases: rapid scrolling, reverse scrolling, viewport resizing, zero-deadlock assertions.
