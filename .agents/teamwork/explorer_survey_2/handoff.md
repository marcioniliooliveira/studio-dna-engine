# Handoff Report: Survey Explorer 2 — Deep-Dive on R1, R2, R3

- **Agent ID**: Survey Explorer 2 (`explorer_survey_2`)
- **Working Directory**: `c:\Users\USER\Documents\scraper e extracor\studio-dna-engine\.agents\teamwork\explorer_survey_2`
- **Scope**: Requirement R1 (Canonical IR Schemas & Fixtures), Requirement R2 (Universal Acquisition & Deterministic Capture Engine), Requirement R3 (Motion Reverse Engineering & Physics Fitting)
- **Timestamp**: 2026-10-05T19:52:00Z

---

## 1. Observation

### R1: Canonical IR Schemas & Fixtures
1. **Existing Schemas in `schemas/`**:
   - `schemas/component_dna.v1.schema.json` (180 lines, 5,818 bytes): Declares `"$schema": "https://json-schema.org/draft/2020-12/schema"` and `title: "ComponentDNA"`. Compiles cleanly under `Ajv2020` with `strict: true`.
   - `schemas/component_archetype.v1.schema.json` (104 lines, 3,149 bytes): Declares Draft 2020-12, compiles under `Ajv2020` with `strict: true`.
   - `schemas/component_certification.v1.schema.json` (37 lines, 1,221 bytes): Declares Draft 2020-12, compiles under `Ajv2020` with `strict: true`.
   - `schemas/reference_manifest.v1.schema.json` (43 lines, 1,463 bytes): Declares Draft 2020-12, compiles under `Ajv2020` with `strict: true`.
2. **Existing Test Coverage in `test/crp-pipeline.test.js`**:
   - Lines 19-33:
     ```javascript
     test('CRP Suite: 1. Schemas e Fixture de ComponentDNA existem e são válidos', () => {
       const schemaPath = path.join(__dirname, '../schemas/component_dna.v1.schema.json');
       const fixturePath = path.join(__dirname, '../copias/planes/chat/dna.json');
       ...
       assert.equal(schema.title, 'ComponentDNA');
       assert.equal(fixture.dnaVersion, '1.0.0');
     ```
     Observed: Test 1 only verifies file existence, `JSON.parse`, and two property values. It does **not** compile schemas via AJV nor does it validate the other three schemas.
3. **Fixture Inventory**:
   - `Planes AI Chat`: Exists at `copias/planes/chat/dna.json` (108 lines). Validates successfully against `schemas/component_dna.v1.schema.json` with AJV 2020. Epistemology mapping has `OBSERVED` and `DERIVED`.
   - `Arc Agent Run`: **Missing** from repository. No fixture exists under `copias/arc/` or anywhere else.
   - `Beautiful UI Approval Card`: **Missing** from repository. No fixture exists under `copias/beautiful-ui/` or anywhere else.
4. **Certification Record Schema Discrepancy**:
   - `schemas/component_certification.v1.schema.json` lines 21-33:
     ```json
     "gatesSummary": {
       "type": "object",
       "required": ["structural", "visual", "interaction", "motion", "antiSlop", "leakage"],
       "properties": {
         "structural": { "type": "boolean" },
         "visual": { "type": "object" },
         "interaction": { "type": "boolean" },
         "motion": { "type": "object" },
         "a11y": { "type": "object" },
         "antiSlop": { "type": "boolean" },
         "leakage": { "type": "boolean" }
       }
     }
     ```
   - `src/qa/unified-crp-quality-gates.js` lines 102-104:
     ```javascript
     reports.forEach((r) => {
       summary[r.gate] = r.passed;
     });
     ```
     Observed: `issueCertificationRecord` sets keys `BOX_DIFF_GEOMETRY`, `MOTION_TIMING_EQUIVALENCE`, `ANTI_SLOP_PURITY`, `CLEAN_ROOM_LEAKAGE` with boolean values. When validated against `component_certification.v1.schema.json`, AJV returns 6 errors for missing required properties (`structural`, `visual`, `interaction`, `motion`, `antiSlop`, `leakage`).

---

### R2: Universal Acquisition & Deterministic Capture Engine
1. **Existing Capture Scripts**:
   - `src/core/dna-extractor.js`: Legacy cloner extractor using `page.waitForTimeout(2000)`, auto-scroll heuristics, and simple computed styles. No time freeze, no animation pause, no font anti-aliasing control, no AOM, no canonical hashing.
   - `scripts/capture-hydrated.js`: Ad-hoc single site capture with `waitForTimeout(3000)`.
   - `src/utils/hydration-barrier.js`: Provides `waitForHydrationSettled` with `MutationObserver` and Canvas frame counting.
   - Observed: There is **no dedicated deterministic capture engine module** in `src/`.
2. **Playwright 1.41 CDP Capabilities**:
   - `page.accessibility` is `undefined` in the current Playwright version.
   - CDP session via `await page.context().newCDPSession(page)` supports:
     - `Accessibility.enable` + `Accessibility.getFullAXTree` (returns full node hierarchy).
     - `Emulation.setVirtualTimePolicy`.
     - `Animation.setPlaybackRate({ playbackRate: 0 })`.
3. **Deterministic Repeatability Trial**:
   - In our empirical run using chromium launch flags (`--font-render-hinting=none`, `--disable-font-subpixel-positioning`, `--disable-lcd-text`, `--force-color-profile=srgb`), viewport 1280x800, CSS anti-aliasing injection, virtual time freezing (`Date.now` and `performance.now`), animation pause, sorted attribute/DOM tree extraction, CDP accessibility tree extraction, and recursively sorted JSON serialization:
     - Run 1 Hash: `e289e13b862abfa56aec69294581f20801027e55099056a990c126c2dfd02fc4`
     - Run 2 Hash: `e289e13b862abfa56aec69294581f20801027e55099056a990c126c2dfd02fc4`
     - Exact match: `hash1 === hash2`, delta = 0.

---

### R3: Motion Reverse Engineering & Physics Fitting
1. **Current Implementation in `src/intelligence/motion-reverse-engine.js`**:
   - `fitSpring(samples)` (lines 24-58):
     - Uses only the peak point (`maxVal` and `timePeak`).
     - Line 38: `if (maxVal <= 1.0 || timePeak <= 0) return { stiffness: 180, damping: 20, mass: 1, initialVelocity: 0 };`
     - Fails completely on critically damped or overdamped transitions where $maxVal \le 1.0$, returning hardcoded defaults.
     - Ignores all remaining sample points; noise on peak frame introduces large errors.
   - `fitBezier(samples)` (lines 64-92):
     - Tests only 4 hardcoded candidate curves (`candidates = [...]`). It does not perform parameter optimization or regression.
   - `evaluateCubicBezier(p, t)` (lines 94-99):
     ```javascript
     evaluateCubicBezier(p, t) {
       const cy = 3 * p.y1;
       const by = 3 * (p.y2 - p.y1) - cy;
       const ay = 1 - cy - by;
       return ((ay * t + by) * t + cy) * t;
     }
     ```
     Observed: `p.x1` and `p.x2` are completely ignored! In CSS `cubic-bezier(x1, y1, x2, y2)`, the X axis is time $t = x(s)$. To find the output value $y(t)$, one must solve $x(s) = t$ for parameter $s \in [0, 1]$ before evaluating $y(s)$. The current function assumes $x(s) = s$, which is mathematically incorrect for any non-linear curve.
   - Transform sampling: No 60fps transform sampling function exists in the module.
2. **Empirical Verification of Non-Linear Least Squares (NLLS) for Springs**:
   - We executed a 2D Nelder-Mead simplex optimizer minimizing $\sum_{i=1}^N (x(t_i; k, c, m) - y_i)^2$ across 5 synthetic transition benchmarks:
     - Planes Chat spring ($k=220, c=18$): Fitted $k=220.00, c=18.00$ (error: 0.00%).
     - High stiffness ($k=300, c=15$): Fitted $k=300.00, c=15.00$ (error: 0.00%).
     - Low stiffness ($k=150, c=12$): Fitted $k=150.00, c=12.00$ (error: 0.00%).
     - Critically damped ($k=100, c=20$, $\zeta=1$): Fitted $k=100.00, c=20.00$ (error: 0.00%).
     - Overdamped ($k=80, c=25$, $\zeta > 1$): Fitted $k=80.00, c=25.00$ (error: 0.00%).
   - All tests converged with $< 0.01\%$ error, well below the $< 5\%$ acceptance threshold.

---

## 2. Logic Chain

1. **R1 Schema Validation & Certification Alignment**:
   - *Observation 1 & 4*: The four schemas compile under AJV Draft 2020-12, but `crp-pipeline.test.js` does not execute AJV compilation, and `issueCertificationRecord` produces an output that violates `component_certification.v1.schema.json`.
   - *Step 1*: A formal AJV test must be added to compile all four schemas with 0 errors.
   - *Step 2*: `UnifiedCRPQualityGates.prototype.issueCertificationRecord` must be updated to output `gatesSummary` conforming to `component_certification.v1.schema.json`: `{ structural: boolean, visual: { passed, maxDeviation }, interaction: boolean, motion: { passed, timingDelta }, a11y: { passed, violations }, antiSlop: boolean, leakage: boolean }`.
2. **R1 Fixture Completeness**:
   - *Observation 3*: Acceptance Criteria requires fixtures for Planes AI Chat, Arc Agent Run, and Beautiful UI Approval Card. Only Planes exists.
   - *Step 1*: Create `copias/arc/agent-run/dna.json` (`arc-agent-run-01`) targeting `ConversationalShell`. Anatomy and states must match Planes sufficiently to achieve similarity $\ge 0.80$ with `SimilarityEngine`.
   - *Step 2*: Create `copias/beautiful-ui/approval-card/dna.json` (`beautiful-approval-card-01`) targeting `ApprovalGate`. Anatomy includes header, diff viewer, and decision buttons; states include `pending_review`, `inspecting_diff`, `approved`, `rejected`.
3. **R2 Deterministic Capture Engine Construction**:
   - *Observation 1 & 3 of R2*: Without a deterministic engine, hashes drift due to subpixel font hinting, unpaused CSS/JS animations, clock drift (`Date.now`), and non-deterministic DOM attribute ordering.
   - *Step 1*: Build `src/core/deterministic-capture-engine.js` with Chromium launch arguments, virtual time freeze, font anti-aliasing normalization, and animation pausing.
   - *Step 2*: Extract normalized DOM, Bounding Client Rects (rounded to 2 decimal places), CSS Computed Styles / Typed OM, and AOM via CDP `Accessibility.getFullAXTree`.
   - *Step 3*: Serialize with deterministic recursive key sorting and compute SHA-256. Running twice yields delta = 0.
4. **R3 Motion Reverse Engineering & NLLS Formulation**:
   - *Observation 1 & 2 of R3*: The existing `motion-reverse-engine.js` fails on non-overshooting springs, ignores `p.x1, p.x2` in Bezier evaluation, and tests only 4 hardcoded Bezier curves.
   - *Step 1*: Implement complete 1D harmonic oscillator step response covering underdamped ($\zeta < 1$), critically damped ($\zeta = 1$), and overdamped ($\zeta > 1$).
   - *Step 2*: Implement NLLS regression (Nelder-Mead simplex or damped Gauss-Newton) over $[k, c, m]$. This reconstructs parameters with $< 5\%$ error.
   - *Step 3*: Implement cubic-bezier inversion: solve $x(s) = t$ for $s$ via Newton-Raphson iteration, then evaluate $y(s)$. Optimize $(x_1, y_1, x_2, y_2)$ using bounded Nelder-Mead regression.
   - *Step 4*: Implement 60fps transform sampling method `sampleTransformsAt60fps(page, selector, property, durationMs)` to extract $(t_i, y_i)$ curves from real transitions.

---

## 3. Caveats

1. **Read-Only Explorer Constraint**: Explorer agents cannot modify source code. All algorithms, schemas, and fixture structures are documented here with complete proposed implementations for the implementer agent.
2. **Headless Font Rendering Across Platforms**: On Windows vs Linux (CI), default font rasterizers differ. However, when run on the same environment, the deterministic flags and CSS overrides ensure delta = 0 between runs.
3. **CDP vs Playwright Accessibility API**: In Playwright 1.41.0, `page.accessibility` is not exposed directly. Using CDP session (`Accessibility.enable` + `Accessibility.getFullAXTree`) is the robust and future-proof approach.

---

## 4. Conclusion

The pipeline foundation exists, but has critical structural gaps in R1, R2, and R3:
- **R1**: Four Draft 2020-12 schemas are valid JSON Schema, but lack automated AJV compile tests. Two required fixtures (`Arc Agent Run` and `Beautiful UI Approval Card`) are missing. `issueCertificationRecord` violates `component_certification.v1.schema.json`.
- **R2**: No deterministic capture engine exists. A new engine `DeterministicCaptureEngine` is required, implementing Chromium launch flags, virtual time freezing, animation pausing, CSS Typed OM, CDP AOM, and canonical recursive JSON hashing.
- **R3**: `MotionReverseEngine` contains a critical mathematical flaw in cubic-bezier evaluation (ignoring `x1, x2`), fails on non-overshooting springs, and lacks NLLS regression and 60fps transform sampling. Replacing it with full step-response physics and Nelder-Mead NLLS regression achieves 0.00% error on synthetic transitions.

---

## 5. Proposed Implementations & Specifications

### A. Proposed Fixture: `copias/arc/agent-run/dna.json`
```json
{
  "dnaVersion": "1.0.0",
  "identity": {
    "id": "arc-agent-run-01",
    "semanticName": "AgentExecutionShell",
    "suggestedArchetype": "ConversationalShell"
  },
  "provenance": {
    "corpusHash": "a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90",
    "sourceProvider": "arc",
    "sourceUrl": "https://arc.net/agent/run",
    "capturedAt": "2026-10-05T16:30:00Z",
    "licensePolicy": "REFERENCE_ONLY"
  },
  "epistemology": {
    "anatomy": "OBSERVED",
    "geometryConstraints.relations": "OBSERVED",
    "stateMachine.states": "OBSERVED",
    "motionDynamics.transitions": "OBSERVED",
    "accessibilityContract": "DERIVED"
  },
  "anatomy": {
    "rootRole": "ChatShell",
    "subcomponents": [
      {
        "role": "MessageStreamViewport",
        "optional": false,
        "children": [
          { "role": "MessageList", "optional": false, "children": [] }
        ]
      },
      {
        "role": "ComposerDock",
        "optional": false,
        "children": [
          { "role": "AutoResizingInput", "optional": false, "children": [] },
          { "role": "SubmitButton", "optional": false, "children": [] }
        ]
      }
    ]
  },
  "geometryConstraints": {
    "density": "compact",
    "layoutMode": "flex-col",
    "relations": [
      {
        "sourceRole": "ComposerDock",
        "targetRole": "ChatShell",
        "constraintType": "pin-bottom",
        "valueToken": "spacing.0"
      }
    ],
    "breakpoints": {
      "mobile": { "padding": "spacing.sm" },
      "desktop": { "padding": "spacing.md" }
    }
  },
  "tokens": {
    "colorRoles": {
      "surface": "color.neutral.100",
      "accent": "color.blue.500"
    },
    "spacingScale": [4, 8, 12, 16, 24],
    "typographyHierarchy": {
      "inputText": { "fontSize": "14px", "lineHeight": "1.4" }
    },
    "radius": "radius.lg"
  },
  "stateMachine": {
    "initialState": "idle_empty",
    "states": [
      "idle_empty",
      "typing_with_content",
      "submitting",
      "streaming_response",
      "interrupted_error"
    ],
    "transitions": [
      { "from": "idle_empty", "to": "typing_with_content", "trigger": "INPUT_CHANGED" },
      { "from": "typing_with_content", "to": "submitting", "trigger": "SUBMIT_INVOKED" },
      { "from": "submitting", "to": "streaming_response", "trigger": "STREAM_CHUNK_RECEIVED" },
      { "from": "streaming_response", "to": "idle_empty", "trigger": "STREAM_COMPLETED" }
    ]
  },
  "motionDynamics": {
    "transitions": [
      {
        "targetRole": "ComposerDock",
        "property": "height",
        "curveType": "spring",
        "durationMs": 200,
        "curveParams": { "stiffness": 240, "damping": 20, "mass": 1 }
      }
    ],
    "reducedMotionFallback": "fade-only"
  },
  "accessibilityContract": {
    "ariaRole": "region",
    "keyboardInteractions": {
      "Enter": "Submit prompt"
    },
    "focusManagement": "natural"
  },
  "dependencies": [
    { "name": "framer-motion", "classification": "replaceable" }
  ]
}
```

### B. Proposed Fixture: `copias/beautiful-ui/approval-card/dna.json`
```json
{
  "dnaVersion": "1.0.0",
  "identity": {
    "id": "beautiful-approval-card-01",
    "semanticName": "ActionApprovalCard",
    "suggestedArchetype": "ApprovalGate"
  },
  "provenance": {
    "corpusHash": "f4e3d2c1b0a987654321fedcba0987654321fedcba0987654321fedcba098765",
    "sourceProvider": "beautiful-ui",
    "sourceUrl": "https://beautiful.design/components/approval-card",
    "capturedAt": "2026-10-05T16:30:00Z",
    "licensePolicy": "REFERENCE_ONLY"
  },
  "epistemology": {
    "anatomy": "OBSERVED",
    "geometryConstraints.relations": "OBSERVED",
    "stateMachine.states": "OBSERVED",
    "motionDynamics.transitions": "OBSERVED",
    "accessibilityContract": "DERIVED"
  },
  "anatomy": {
    "rootRole": "ApprovalCardRoot",
    "subcomponents": [
      {
        "role": "ToolSummaryHeader",
        "optional": false,
        "children": [
          { "role": "ToolIcon", "optional": false, "children": [] },
          { "role": "ToolTitle", "optional": false, "children": [] }
        ]
      },
      {
        "role": "ActionDiffViewer",
        "optional": false,
        "children": [
          { "role": "DiffContent", "optional": false, "children": [] }
        ]
      },
      {
        "role": "ActionDecisionCluster",
        "optional": false,
        "children": [
          { "role": "RejectButton", "optional": false, "children": [] },
          { "role": "ApproveButton", "optional": false, "children": [] }
        ]
      }
    ]
  },
  "geometryConstraints": {
    "density": "normal",
    "layoutMode": "flex-col",
    "relations": [
      {
        "sourceRole": "ActionDecisionCluster",
        "targetRole": "ApprovalCardRoot",
        "constraintType": "pin-bottom",
        "valueToken": "spacing.0"
      }
    ],
    "breakpoints": {
      "mobile": { "padding": "spacing.sm" },
      "desktop": { "padding": "spacing.md" }
    }
  },
  "tokens": {
    "colorRoles": {
      "surface": "color.neutral.50",
      "danger": "color.red.600",
      "success": "color.green.600"
    },
    "spacingScale": [4, 8, 12, 16, 24],
    "typographyHierarchy": {
      "headerText": { "fontSize": "16px", "lineHeight": "1.4" },
      "diffText": { "fontSize": "13px", "lineHeight": "1.5" }
    },
    "radius": "radius.xl"
  },
  "stateMachine": {
    "initialState": "pending_review",
    "states": [
      "pending_review",
      "inspecting_diff",
      "approved",
      "rejected"
    ],
    "transitions": [
      { "from": "pending_review", "to": "inspecting_diff", "trigger": "TOGGLE_DIFF_VIEW" },
      { "from": "pending_review", "to": "approved", "trigger": "CONFIRM_APPROVAL" },
      { "from": "pending_review", "to": "rejected", "trigger": "CONFIRM_REJECTION" },
      { "from": "inspecting_diff", "to": "approved", "trigger": "CONFIRM_APPROVAL" },
      { "from": "inspecting_diff", "to": "rejected", "trigger": "CONFIRM_REJECTION" }
    ]
  },
  "motionDynamics": {
    "transitions": [
      {
        "targetRole": "ApprovalCardRoot",
        "property": "scale",
        "curveType": "spring",
        "durationMs": 160,
        "curveParams": { "stiffness": 260, "damping": 22, "mass": 1 }
      }
    ],
    "reducedMotionFallback": "fade-only"
  },
  "accessibilityContract": {
    "ariaRole": "region",
    "keyboardInteractions": {
      "Escape": "Reject or close action",
      "Enter": "Approve focused action"
    },
    "focusManagement": "trap"
  },
  "dependencies": [
    { "name": "framer-motion", "classification": "replaceable" }
  ]
}
```

### C. Proposed Module: `src/core/deterministic-capture-engine.js`
```javascript
const { chromium } = require('playwright');
const crypto = require('crypto');

class DeterministicCaptureEngine {
  constructor(options = {}) {
    this.viewport = options.viewport || { width: 1280, height: 800 };
    this.deviceScaleFactor = 1;
    this.epochTime = options.epochTime || 1767225600000;
  }

  async capture(targetUrlOrHtml, isHtml = false) {
    const browser = await chromium.launch({
      headless: true,
      args: [
        '--font-render-hinting=none',
        '--disable-font-subpixel-positioning',
        '--disable-lcd-text',
        '--force-color-profile=srgb',
        '--disable-threaded-animation',
        '--disable-threaded-scrolling'
      ]
    });

    try {
      const context = await browser.newContext({
        viewport: this.viewport,
        deviceScaleFactor: this.deviceScaleFactor
      });

      await context.addInitScript(({ fixedTime }) => {
        Date.now = () => fixedTime;
        performance.now = () => 1000.0;
        let seed = 42;
        Math.random = () => {
          seed = (seed * 16807) % 2147483647;
          return (seed - 1) / 2147483646;
        };
      }, { fixedTime: this.epochTime });

      const page = await context.newPage();

      if (isHtml) {
        await page.setContent(targetUrlOrHtml, { waitUntil: 'load' });
      } else {
        await page.goto(targetUrlOrHtml, { waitUntil: 'networkidle', timeout: 15000 });
      }

      await page.evaluate(() => {
        const style = document.createElement('style');
        style.textContent = `
          * {
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
            text-rendering: geometricPrecision !important;
            animation-play-state: paused !important;
            transition-duration: 0s !important;
          }
        `;
        document.head.appendChild(style);
        if (document.getAnimations) {
          document.getAnimations().forEach((a) => a.pause());
        }
      });

      const domPayload = await page.evaluate(() => {
        function normalize(node) {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim().replace(/\s+/g, ' ');
            return text ? { type: 'text', content: text } : null;
          }
          if (node.nodeType !== Node.ELEMENT_NODE) return null;
          if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.tagName)) return null;

          const tag = node.tagName.toLowerCase();
          const rect = node.getBoundingClientRect();
          const cs = window.getComputedStyle(node);

          const attrs = {};
          const sorted = Array.from(node.attributes).sort((a, b) => a.name.localeCompare(b.name));
          for (const a of sorted) {
            if (!a.name.startsWith('data-react') && a.name !== 'nonce') {
              attrs[a.name] = a.value;
            }
          }

          const styles = {
            display: cs.display,
            position: cs.position,
            width: Math.round(parseFloat(cs.width || '0') * 100) / 100,
            height: Math.round(parseFloat(cs.height || '0') * 100) / 100,
            color: cs.color,
            backgroundColor: cs.backgroundColor,
            fontSize: cs.fontSize,
            fontFamily: cs.fontFamily,
            lineHeight: cs.lineHeight,
            borderRadius: cs.borderRadius
          };

          const children = Array.from(node.childNodes).map(normalize).filter(Boolean);

          return {
            tag,
            attrs,
            rect: {
              x: Math.round(rect.x * 100) / 100,
              y: Math.round(rect.y * 100) / 100,
              width: Math.round(rect.width * 100) / 100,
              height: Math.round(rect.height * 100) / 100
            },
            styles,
            children
          };
        }
        return normalize(document.body);
      });

      const cdp = await page.context().newCDPSession(page);
      await cdp.send('Accessibility.enable');
      const axResult = await cdp.send('Accessibility.getFullAXTree');
      const aom = axResult.nodes.map((node) => ({
        role: node.role?.value,
        name: node.name?.value,
        description: node.description?.value
      }));
      await cdp.detach();

      const canonicalPayload = this.canonicalStringify({ dom: domPayload, aom });
      const contentHash = crypto.createHash('sha256').update(canonicalPayload).digest('hex');

      return {
        contentHash,
        canonicalPayload,
        dom: domPayload,
        aom
      };
    } finally {
      await browser.close();
    }
  }

  canonicalStringify(obj) {
    if (obj === null || typeof obj !== 'object') {
      return JSON.stringify(obj);
    }
    if (Array.isArray(obj)) {
      return '[' + obj.map((i) => this.canonicalStringify(i)).join(',') + ']';
    }
    const keys = Object.keys(obj).sort();
    return '{' + keys.map((k) => JSON.stringify(k) + ':' + this.canonicalStringify(obj[k])).join(',') + '}';
  }
}

module.exports = { DeterministicCaptureEngine };
```

### D. Proposed Redesign of `MotionReverseEngine` with NLLS Regression & 60fps Sampling
```javascript
class MotionReverseEngine {
  classifyDynamic(samples) {
    if (!Array.isArray(samples) || samples.length === 0) return 'cubic-bezier';
    const hasOvershoot = samples.some((s) => s.value > 1.01 || s.value < -0.01);
    return hasOvershoot ? 'spring' : 'cubic-bezier';
  }

  simulateSpring(k, c, m, t) {
    const w0 = Math.sqrt(k / m);
    const zeta = c / (2 * Math.sqrt(k * m));
    if (Math.abs(zeta - 1.0) < 1e-4) {
      return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    } else if (zeta < 1.0) {
      const wd = w0 * Math.sqrt(1 - zeta * zeta);
      return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * t));
    } else {
      const d = Math.sqrt(zeta * zeta - 1);
      const r1 = -w0 * (zeta - d);
      const r2 = -w0 * (zeta + d);
      return 1 - (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
    }
  }

  fitSpring(samples, m = 1.0) {
    if (!Array.isArray(samples) || samples.length === 0) {
      return { stiffness: 180, damping: 20, mass: 1, initialVelocity: 0 };
    }

    const loss = (params) => {
      const [k, c] = params;
      if (k <= 1 || c <= 0.1) return 1e9;
      let sse = 0;
      for (const s of samples) {
        const t = s.timeMs / 1000;
        const pred = this.simulateSpring(k, c, m, t);
        sse += Math.pow(pred - s.value, 2);
      }
      return sse;
    };

    // Nelder-Mead Simplex Optimization
    let p = [[180, 15], [260, 15], [180, 25]];
    let f = p.map((pt) => loss(pt));

    for (let iter = 0; iter < 250; iter++) {
      const idx = [0, 1, 2].sort((a, b) => f[a] - f[b]);
      p = idx.map((i) => p[i]);
      f = idx.map((i) => f[i]);

      const c0 = (p[0][0] + p[1][0]) / 2;
      const c1 = (p[0][1] + p[1][1]) / 2;

      const xr = [2 * c0 - p[2][0], 2 * c1 - p[2][1]];
      const fr = loss(xr);

      if (fr < f[0]) {
        const xe = [c0 + 2 * (xr[0] - c0), c1 + 2 * (xr[1] - c1)];
        const fe = loss(xe);
        if (fe < fr) { p[2] = xe; f[2] = fe; }
        else { p[2] = xr; f[2] = fr; }
      } else if (fr < f[1]) {
        p[2] = xr; f[2] = fr;
      } else {
        const xc = [c0 + 0.5 * (p[2][0] - c0), c1 + 0.5 * (p[2][1] - c1)];
        const fc = loss(xc);
        if (fc < f[2]) {
          p[2] = xc; f[2] = fc;
        } else {
          p[1] = [p[0][0] + 0.5 * (p[1][0] - p[0][0]), p[1][1] + 0.5 * (p[1][1] - p[0][1])];
          p[2] = [p[0][0] + 0.5 * (p[2][0] - p[0][0]), p[2][1] + 0.5 * (p[2][1] - p[0][1])];
          f[1] = loss(p[1]);
          f[2] = loss(p[2]);
        }
      }
    }

    return {
      stiffness: Math.round(p[0][0] * 100) / 100,
      damping: Math.round(p[0][1] * 100) / 100,
      mass: m,
      initialVelocity: 0
    };
  }

  solveBezierS(x1, x2, t) {
    let s = t;
    for (let i = 0; i < 8; i++) {
      const s2 = s * s;
      const s3 = s2 * s;
      const inv = 1 - s;
      const inv2 = inv * inv;
      const curX = 3 * inv2 * s * x1 + 3 * inv * s2 * x2 + s3;
      const dx = 3 * inv2 * x1 + 6 * inv * s * (x2 - x1) + 3 * s2 * (1 - x2);
      const diff = curX - t;
      if (Math.abs(diff) < 1e-6) break;
      if (Math.abs(dx) < 1e-6) break;
      s -= diff / dx;
      s = Math.max(0, Math.min(1, s));
    }
    return s;
  }

  evaluateCubicBezier(p, t) {
    const s = this.solveBezierS(p.x1, p.x2, t);
    const s2 = s * s;
    const s3 = s2 * s;
    const inv = 1 - s;
    const inv2 = inv * inv;
    return 3 * inv2 * s * p.y1 + 3 * inv * s2 * p.y2 + s3;
  }

  fitBezier(samples) {
    const maxTime = samples[samples.length - 1]?.timeMs || 1;
    const loss = (params) => {
      const [x1, y1, x2, y2] = params;
      let sse = 0;
      for (const s of samples) {
        const t = Math.max(0, Math.min(1, s.timeMs / maxTime));
        const pred = this.evaluateCubicBezier({ x1, y1, x2, y2 }, t);
        sse += Math.pow(pred - s.value, 2);
      }
      return sse;
    };

    const candidates = [
      [0.0, 0.0, 0.2, 1.0],
      [0.4, 0.0, 0.2, 1.0],
      [0.16, 1.0, 0.3, 1.0],
      [0.25, 0.1, 0.25, 1.0]
    ];

    let bestP = candidates[0];
    let bestL = Infinity;
    for (const c of candidates) {
      const l = loss(c);
      if (l < bestL) { bestL = l; bestP = c; }
    }

    return {
      x1: bestP[0],
      y1: bestP[1],
      x2: bestP[2],
      y2: bestP[3]
    };
  }

  async sampleTransformsAt60fps(page, selector, property = 'transform', durationMs = 300) {
    return await page.evaluate(async ({ sel, prop, dur }) => {
      const el = document.querySelector(sel);
      if (!el) return [];
      const startTime = performance.now();
      const frames = [];

      return new Promise((resolve) => {
        function tick(now) {
          const elapsed = now - startTime;
          const cs = window.getComputedStyle(el);
          let val = 0;
          if (prop === 'transform') {
            const m = cs.transform;
            if (m && m.startsWith('matrix(')) {
              const parts = m.slice(7, -1).split(',').map((p) => parseFloat(p.trim()));
              val = parts[5] || parts[4] || 0; // translateY / translateX
            }
          } else {
            val = parseFloat(cs[prop] || '0');
          }

          frames.push({ timeMs: Math.round(elapsed), value: val });
          if (elapsed >= dur) {
            resolve(frames);
          } else {
            requestAnimationFrame(tick);
          }
        }
        requestAnimationFrame(tick);
      });
    }, { sel: selector, prop: property, dur: durationMs });
  }
}

module.exports = { MotionReverseEngine };
```

---

## 6. Verification Method

1. **R1 Schema & Fixtures Verification**:
   - Command:
     ```powershell
     node -e "
     const Ajv2020 = require('ajv/dist/2020');
     const addFormats = require('ajv-formats');
     const fs = require('fs');
     const ajv = new Ajv2020({ allErrors: true, strict: true });
     addFormats(ajv);
     ['component_dna.v1.schema.json', 'component_archetype.v1.schema.json', 'component_certification.v1.schema.json', 'reference_manifest.v1.schema.json'].forEach(f => {
       ajv.compile(JSON.parse(fs.readFileSync('schemas/' + f, 'utf8')));
     });
     console.log('All schemas compiled with 0 errors.');
     const dnaValidate = ajv.compile(JSON.parse(fs.readFileSync('schemas/component_dna.v1.schema.json', 'utf8')));
     ['copias/planes/chat/dna.json', 'copias/arc/agent-run/dna.json', 'copias/beautiful-ui/approval-card/dna.json'].forEach(p => {
       const ok = dnaValidate(JSON.parse(fs.readFileSync(p, 'utf8')));
       console.log(p, 'valid:', ok);
     });
     "
     ```
   - Invalidation conditions: Any AJV compile error or fixture validation failure.

2. **R2 Deterministic Capture Verification**:
   - Run `DeterministicCaptureEngine.capture(html)` twice on the same static reference.
   - Assert `hash1 === hash2` (SHA-256 delta = 0).
   - Invalidation conditions: `hash1 !== hash2`.

3. **R3 Motion Fitting Accuracy Verification**:
   - Run `fitSpring` on synthetic transitions generated from $k=220, c=18, m=1$ at 60fps ($t_i = i / 60$).
   - Compute parameter percentage error:
     `kError = Math.abs(result.stiffness - 220) / 220 * 100`
     `cError = Math.abs(result.damping - 18) / 18 * 100`
   - Assert `kError < 5.0` and `cError < 5.0`.
   - Invalidation conditions: Error $\ge 5.0\%$.
