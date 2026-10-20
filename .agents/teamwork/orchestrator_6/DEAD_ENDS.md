# Dead Ends — orchestrator_6

| Iteration | Approach Tried | Why It Failed | Files Touched |
|-----------|---------------|---------------|---------------|
| 1 | Direct synchronous React `setPortalProgress` calls from GSAP `onUpdate` on every tick, plus un-scoped `[data-more-work-rect]` selector on mobile. | Caused ~13,700 synchronous React re-renders per scroll traversal, triggering GPU driver stall (`GL Driver Message: GPU stall due to ReadPixels`) and freezing CDP/browser main thread (Gate 6 timeout > 120s). On mobile, `[data-more-work-rect]` returned 0x0 rect because of `hidden md:flex`, breaking mobile optical entrance. | `initHorizontalScroll.LNLCK81L.js`, `WorkStage.tsx` |
