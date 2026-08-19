---
type: project
created: 2026-05-25
updated: 2026-06-25
---

# Project Conventions

## Git Workflow
- Always create a new dedicated branch for major code changes.
- Branch name format should follow: `feature/[task-slug]` or `fix/[bug-slug]`.

## High-Fidelity Site Cloning (Playwright)
- **Interactive Mode:** Always run cloning scripts with `headless: false` and a console prompt wait. This allows manual scrolling/interaction to trigger dynamic animations (like GSAP ScrollTrigger) and load lazy resources.
- **Iframe Handling:** Perform iframe checks/switching *after* manual interaction to prevent timing issues with SPA-rendered wrappers.
- **DOM Capture:** Capture `document.body.innerHTML` rather than parsing and separating leaf elements. This preserves original container wrappers, layout rules (Flexbox/Grid), and animation-driven inline styles.
- **Output Paths:** Save the output to `clone.html` and sync with the `copias/clone.html` path when present.

## Dual-Version Site Cloning Standard (MANDATORY)
- **Always Create Both Versions:** Whenever copying/cloning a website, ALWAYS build two distinct versions:
  1. **HTML/CSS Standalone Version:** Single-file static version (`.html` + Tailwind/CSS) for instant standalone preview and low-overhead delivery.
  2. **Next.js Version:** Full componentized App Router application (`/app`, React components, TypeScript/JS, Framer Motion/Tailwind) for production-grade dynamic features, API routes, and maintainability.

## Next.js Static Clone & GSAP Recovery Protocol (Post-Processing Standard)
When converting scraped Next.js dumps into functional standalone static HTML files:

1. **Remove React Client Hydration Scripts:**
   - Next.js SSR dumps contain hydration scripts (`/_next/static/chunks/main-app-*.js`, `webpack-*.js`, `self.__next_f.push`).
   - **Rule:** Strip all Next.js hydration `<script>` tags from the bottom of static `.html` files. React hydration failures unmount static DOM trees and turn the page gray/blank.

2. **Restore OS Mouse Cursor Defaults:**
   - Scraped CSS often contains `[role=button], a, body, button { cursor: none; }` designed for React custom cursor elements (`.lokai-cursor`).
   - **Rule:** Always inject CSS overrides: `html, body, a, button { cursor: auto !important; }` and `.custom-cursor { display: none !important; }`.

3. **Standalone GSAP & ScrollTrigger Initialization:**
   - React components lock GSAP/ScrollTrigger logic inside `useEffect` hooks in chunk files (e.g. `page-*.js`).
   - **Rule:** Extract the animation parameters (`ScrollTrigger.create`, `pin: true`, `x: -scrollDistance`, `stagger`) and load GSAP + ScrollTrigger via CDN (`gsap.min.js`, `ScrollTrigger.min.js`), initializing them under a vanilla `DOMContentLoaded` listener.

4. **Correct ScrollTrigger Pinning & Spacer Layouts:**
   - Static dumps contain empty spacer divs (e.g. `.hscroll-spacer { height: 450vh }`) that sit below fixed headers.
   - **Rule:** Pin the visible section (`.hscroll`) directly with `pin: true` and `end: () => "+=" + scrollDistance`, while setting static spacer height to `0` / `display: none` to eliminate blank scroll gaps.


