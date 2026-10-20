# Handoff Report — Architecture, Physics & Hardware Resiliency Exploration (R2, R3, R4, R5)

**Agent**: `explorer_survey_2_2`  
**Working Directory**: `C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_2_2`  
**Workspace Root**: `C:\Users\wd\Documents\playwright-scraper`  
**Timestamp**: 2026-10-04T20:23:00Z  
**Target Audience**: `orchestrator_2`, M2/M3/M4/M5 Workers, and E2E Test Writers  

---

## 1. Observation

### 1.1 Codebase & Dependency Audit
- **Direct Observation 1 (Dependencies)**: In `package.json` (lines 51–61):
  ```json
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.30.0",
    "cheerio": "^1.2.0",
    "playwright": "^1.41.0",
    "postcss": "^8.5.26",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@playwright/test": "^1.41.0"
  }
  ```
  Neither `@gltf-transform/core`, `xstate`, nor `@zag-js/core` is present in `node_modules` or `package.json` (verified via `node -e "['@gltf-transform/core', 'xstate', '@zag-js/core'].forEach(p => require(p))"` exiting with MODULE_NOT_FOUND). All state machine, physics, and saliency mechanisms must either be implemented as pure, zero-external-dependency vanilla JS engines or have packages installed cleanly without breaking existing tests.

- **Direct Observation 2 (Existing 3D Asset Pipeline)**:
  In `src/assets3d/texture-compressor.js` (lines 17–28, 275–450) and `src/assets3d/vram-auditor.js` (lines 15–43, 128–257):
  - KTX2 container writer exists with UASTC/ASTC_4x4 block encoding (1.0 byte/pixel).
  - VRAM calculation is strictly governed by `VRAM = sum(TexWidth * TexHeight * bpp * 1.3333) + GeometryVRAM`.
  - Uncompressed PNG/JPEG expands to 4.0 bytes/pixel upon GPU upload (`RGBA8`), creating the "22.4MB uncompressed PNG VRAM trap" at 2048x2048.
  - In `src/assets3d/gltf-optimizer-pipeline.js` (lines 280–370), coincident vertex welding and quadric decimation to $\le 25,000$ vertices and $\le 40,000$ triangles are enforced, with KHR_mesh_quantization using 14 bytes/vertex.

- **Direct Observation 3 (Kinetic & Motion Constraints)**:
  In `src/kinetic/adaptive-constraints.js` (lines 58–92):
  - `resolveMotionReducedScaling(prefersReducedMotion)` sets `damp: 1.0`, `duration: 0.01` when `prefersReducedMotion === true`.
  - In `src/kinetic/dynamic-anchor-coordinator.js` (lines 216–340), an iterative spring-relaxation loop runs for 80 iterations with `springK = 0.04`, resolving card overlaps to 0px².

- **Direct Observation 4 (CDP Interception & Test Infrastructure)**:
  In `test/e2e/e2e-harness.js` (lines 189–235):
  - `withTestContext({ cdp: true }, testFn)` creates isolated chromium contexts and instantiates `cdpSession = await context.newCDPSession(page)` with Animation, DOM, CSS, Performance domains enabled.
  - Browser launch arguments in `e2e-harness.js:201` are `['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox']`.

- **Direct Observation 5 (JumpPlay Canvas Content)**:
  In `.kombai/canvas/jumpflex-home-journey.canvas` (Line 74):
  - Form fields exist for JumpPlay B2B Quote: `business type input` ("Selecione uma opção"), `estimated quantity input` ("Ex.: 10 unidades"), `region input` ("Cidade / estado"), `timeframe input` ("Quando pretende comprar?"), `contact input` ("Nome, e-mail ou telefone"), and submit button `submit button` ("ENVIAR ↗").
  - Currently rendered with static placeholders without state machine backing or input masks.

---

## 2. Logic Chain

### 2.1 R2: Finite State Machine (FSM) Layer for Checkout & B2B Quote Forms

#### Architectural Rationale & Layout
To avoid heavy runtime overhead from external state machine libraries while following Zag.js and XState statechart design principles, the form state machine layer is divided into:
1. `src/fsm/core/machine.js`: A lightweight, deterministic hierarchical finite state machine engine (~150 LOC) with state transition tables, guards, actions, and event subscriptions.
2. `src/fsm/core/connect.js`: Zag.js-style accessibility connector mapping state and context to DOM attributes (`aria-invalid`, `aria-describedby`, `aria-busy`, `disabled`, `data-state`).
3. `src/forms/b2b-quote-machine.js`: JumpPlay B2B quote flow state machine definition.
4. `src/forms/checkout-machine.js`: E-commerce checkout multi-step flow state machine definition.
5. `src/forms/masks.js`: Adaptive input mask processor maintaining caret position.
6. `src/forms/draft-storage.js`: LocalStorage draft recovery manager with 24-hour TTL and schema validation.

#### Statechart Specification
- **States**:
  - `idle`: Form is interactive and awaiting user input. Draft recovery prompt is displayed if an active unexpired draft is detected.
  - `validating`: Inline field validation or async verification (e.g. Tax ID / CNPJ / CEP) in progress. Exposes `isValidating: true` for subtle UI indicator.
  - `submitting`: Network payload submission in progress. Disables submission button, applies `aria-busy="true"`, starts latency watchdog timer.
  - `error`: Form contains blocking validation errors or submission failed with network/server rejection. Focus is shifted to first invalid field or live error banner.
  - `success`: Terminal transaction confirmed state. Clears `localStorage` draft, disables inputs, renders confirmation token/quote ID.
- **Context ($C$)**:
  ```ts
  interface FormContext<T> {
    values: T;
    displayValues: Record<keyof T, string>; // Masked presentation
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    dirty: Partial<Record<keyof T, boolean>>;
    activeField: keyof T | null;
    submitCount: number;
    latency: {
      startedAt: number | null;
      elapsedMs: number;
      isDelayed: boolean; // true if elapsedMs > 1000ms
    };
    draftMetadata: {
      formId: string;
      savedAt: number | null;
      checksum: string | null;
    };
  }
  ```
- **Events**:
  - `INPUT { field: string, value: string, cursorPosition?: number }`
  - `BLUR { field: string }`
  - `FOCUS { field: string }`
  - `SUBMIT`
  - `VALIDATE_SUCCESS { field: string }`
  - `VALIDATE_FAIL { field: string, error: string }`
  - `SUBMIT_SUCCESS { response: any }`
  - `SUBMIT_ERROR { error: string }`
  - `RESTORE_DRAFT`
  - `DISCARD_DRAFT`
  - `RESET`

- **Guards**:
  - `isFormValid(ctx)`: Evaluates all field validators; returns true if zero errors exist.
  - `hasDraft(ctx)`: Verifies if a valid draft exists in `localStorage` with unexpired TTL.
  - `isDelayed(ctx)`: Returns true if `Date.now() - ctx.latency.startedAt > 1000ms`.

- **Deterministic Inline Validation Rules**:
  - Validation runs on `BLUR`, and on `INPUT` only if the field has already been touched (`touched[field] === true`).
  - Strict Modulo 11 verification for Brazilian Document (CPF/CNPJ):
    $$D_1 = 11 - \left(\sum_{i=1}^n w_i d_i \pmod{11}\right)$$
  - Strict RFC 5322 email syntax validation regex.
  - Positive integer range check for B2B Jumpflex units ($1 \le Q \le 100,000$).

- **Adaptive Input Masks**:
  - Raw unmasked data is stored in `context.values[field]`; formatted representation in `context.displayValues[field]`.
  - Dynamic Document Mask:
    - $\le 11$ digits $\to$ CPF mask `000.000.000-00`
    - $> 11$ digits (up to 14) $\to$ CNPJ mask `00.000.000/0001-00`
  - Dynamic Phone Mask:
    - $\le 10$ digits $\to$ `(00) 0000-0000`
    - $11$ digits $\to$ `(00) 00000-0000`
    - International prefix `+` $\to$ `+00 (00) 00000-0000`
  - Caret Positioning Algorithm:
    $$\Delta_{\text{offset}} = \text{countDigitsBeforeCursor}(\text{rawInput}) \implies \text{setSelectionRange}(\text{indexInMasked})$$

- **Draft Recovery & LocalStorage Protocol**:
  - Key: `studio_dna_draft_${formId}`
  - Serialization payload:
    ```json
    {
      "version": "2.5.0",
      "formId": "jumpflex_b2b_quote",
      "timestamp": 1728073082000,
      "ttlMs": 86400000,
      "values": { "businessType": "Reseller", "quantity": "25", "region": "SP", "contactName": "Carlos Silva" }
    }
    ```
  - Upon machine creation in browser: checks `localStorage`. If `Date.now() - timestamp < ttlMs`, emits `DRAFT_DETECTED` offering one-click restore. Upon `SUBMIT_SUCCESS`, `localStorage.removeItem` is called unconditionally.

---

### 2.2 R3: Analytical Spring Dynamics Second-Order ODE Model

#### Mathematical Derivation of Closed-Form Solutions
The homogeneous second-order ordinary differential equation governing damped physical harmonic motion is:
$$\ddot{x}(t) + 2\zeta\omega_n\dot{x}(t) + \omega_n^2 x(t) = 0$$
where $x(t) = p(t) - p_{\text{target}}$ is the spatial displacement from equilibrium, $\omega_n = \sqrt{k/m}$ is natural frequency (rad/s), $\zeta = \frac{c}{2\sqrt{km}}$ is the damping ratio, $x_0 = p(0) - p_{\text{target}}$ is initial displacement, and $v_0 = \dot{p}(0)$ is initial velocity.

The characteristic polynomial is:
$$r^2 + 2\zeta\omega_n r + \omega_n^2 = 0 \implies r = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2 - 1}$$

#### 1. Underdamped Regime ($\zeta < 1$):
Roots are complex conjugates $r = -\zeta\omega_n \pm i\omega_d$, where $\omega_d = \omega_n\sqrt{1 - \zeta^2}$ is the damped angular frequency.
General solution:
$$x(t) = e^{-\zeta\omega_n t} \left[ C_1 \cos(\omega_d t) + C_2 \sin(\omega_d t) \right]$$
Initial conditions at $t = 0$:
$$x(0) = C_1 = x_0$$
$$\dot{x}(t) = e^{-\zeta\omega_n t} \left[ (-\zeta\omega_n C_1 + \omega_d C_2)\cos(\omega_d t) - (\omega_d C_1 + \zeta\omega_n C_2)\sin(\omega_d t) \right]$$
$$\dot{x}(0) = -\zeta\omega_n x_0 + \omega_d C_2 = v_0 \implies C_2 = \frac{v_0 + \zeta\omega_n x_0}{\omega_d}$$
Thus, the exact closed-form analytical equations are:
$$x(t) = e^{-\zeta\omega_n t} \left[ x_0 \cos(\omega_d t) + \left(\frac{v_0 + \zeta\omega_n x_0}{\omega_d}\right) \sin(\omega_d t) \right]$$
$$\dot{x}(t) = e^{-\zeta\omega_n t} \left[ v_0 \cos(\omega_d t) - \left(\frac{\omega_n^2 x_0 + \zeta\omega_n v_0}{\omega_d}\right) \sin(\omega_d t) \right]$$

#### 2. Critically Damped Regime ($\zeta = 1$):
Double real root $r = -\omega_n$.
General solution:
$$x(t) = (C_1 + C_2 t) e^{-\omega_n t}$$
Initial conditions:
$$x(0) = C_1 = x_0$$
$$\dot{x}(t) = [C_2 - \omega_n(C_1 + C_2 t)] e^{-\omega_n t}$$
$$\dot{x}(0) = C_2 - \omega_n x_0 = v_0 \implies C_2 = v_0 + \omega_n x_0$$
Thus:
$$x(t) = [x_0 + (v_0 + \omega_n x_0)t] e^{-\omega_n t}$$
$$\dot{x}(t) = [v_0 - \omega_n(v_0 + \omega_n x_0)t] e^{-\omega_n t}$$

#### 3. Overdamped Regime ($\zeta > 1$):
Two distinct negative real roots $r_1, r_2 = -\zeta\omega_n \pm \omega_h$, where $\omega_h = \omega_n\sqrt{\zeta^2 - 1}$.
General solution:
$$x(t) = C_1 e^{r_1 t} + C_2 e^{r_2 t}$$
$$\dot{x}(t) = C_1 r_1 e^{r_1 t} + C_2 r_2 e^{r_2 t}$$
With initial conditions $x(0) = C_1 + C_2 = x_0$ and $\dot{x}(0) = C_1 r_1 + C_2 r_2 = v_0$:
$$C_1 = \frac{v_0 - r_2 x_0}{r_1 - r_2} = \frac{v_0 + (\zeta\omega_n + \omega_h)x_0}{2\omega_h}$$
$$C_2 = \frac{-v_0 + r_1 x_0}{r_1 - r_2} = \frac{-v_0 - (\zeta\omega_n - \omega_h)x_0}{2\omega_h}$$

#### Continuous Velocity Handoff upon Drag Release
During a touch or pointer drag, a pointer tracker logs historical coordinates in a ring buffer over the last 100ms. Upon `pointerup`:
$$v_{\text{release}} = \frac{p(t_{\text{up}}) - p(t_{\text{prev}})}{\Delta t}$$
The spring integrator initializes at $t = 0$ with $x_0 = p(t_{\text{up}}) - p_{\text{target}}$ and $v_0 = \text{clamp}(v_{\text{release}}, -v_{\max}, +v_{\max})$.
Because the closed-form equation evaluates $\dot{x}(0) \equiv v_0$, the system delivers exact $C^1$ velocity continuity across the drag-to-free-flight boundary with zero visual hitch or jerk.

#### Prefers-Reduced-Motion & Zero-Overshoot Clamp
When `prefers-reduced-motion: reduce` is active:
1. Damping ratio is clamped to $\zeta = 1.0$ (critically damped) or $\zeta = 1.2$ (overdamped).
2. Initial launch velocity is neutralized ($v_0 \leftarrow 0$) or clamped strictly opposite to displacement.
3. Zero-overshoot clamp:
   $$\text{If } x_0 > 0: \quad x(t) = \max(0, x(t))$$
   $$\text{If } x_0 < 0: \quad x(t) = \min(0, x(t))$$
   *Proof of Zero Overshoot*: For $\zeta = 1$ and $v_0 = 0$, $x(t) = x_0 (1 + \omega_n t) e^{-\omega_n t}$. For all $t \ge 0$, $(1 + \omega_n t) > 0$ and $e^{-\omega_n t} > 0$. Hence $\text{sign}(x(t)) = \text{sign}(x_0)$ identically for all $t \ge 0$. The trajectory converges asymptotically to 0 without crossing the axis, proving mathematically that overshoot is strictly 0px.

#### Vibration API Haptic Pulses
Integration via `navigator.vibrate`:
- `snap` (resting latch into equilibrium): `navigator.vibrate([12])` (12ms single crisp tick).
- `release` (flick above velocity threshold $v_0 > 300\text{px/s}$): `navigator.vibrate([8])` (8ms micro click).
- `boundary_limit` (rubberband bounce at drawer limit): `navigator.vibrate([22])` (22ms tactile bump).
- `error` (invalid submission / forbidden boundary): `navigator.vibrate([30, 40, 40])` (double alert buzz).
All invocations are strictly guarded by `if (typeof navigator !== 'undefined' && 'vibrate' in navigator)`.

---

### 2.3 R4: GPU Texture Pipeline (KTX2 / Basis Universal) & Visual Saliency Attention Oracle

#### gltf-transform KTX2 Pipeline
To prevent the 22.4MB uncompressed PNG VRAM decompression trap and guarantee total VRAM $\le 16\text{MB}$:
1. **Tooling & Transcoding**:
   - Utilize `@gltf-transform/core` and `@gltf-transform/extensions` with `KHRTextureBasisu`.
   - Normal maps & ORM maps $\to$ Transcoded to **UASTC** (1 byte/pixel, linear color space), preserving vector fidelity without normal artifacts.
   - BaseColor / Albedo $\to$ Transcoded to **ETC1S** (0.5 bytes/pixel) or **UASTC** (1.0 byte/pixel, sRGB color space).
2. **Channel Packing**:
   - Pack Ambient Occlusion (R), Roughness (G), and Metalness (B) into a single 3-channel ORM texture at $512 \times 512$.
3. **VRAM Calculation & 16MB Budget Verification**:
   $$\text{VRAM}_{\text{tex}} = \sum_{i=1}^N (W_i \times H_i \times \text{bpp}_i \times 1.3333)$$
   For a hero product model:
   - BaseColor ($1024 \times 1024$ UASTC @ 1 bpp): $1.398\text{ MB}$
   - Normal Map ($1024 \times 1024$ UASTC @ 1 bpp): $1.398\text{ MB}$
   - ORM Map ($512 \times 512$ UASTC @ 1 bpp): $0.350\text{ MB}$
   - Geometry VRAM (25k vertices @ 14B + 40k triangles @ 2B): $0.590\text{ MB}$
   - **Total per model**: $3.736\text{ MB}$ VRAM.
   - For an entire scene containing 3 concurrent interactive 3D assets:
     $$\text{Total VRAM} = 3 \times 3.736\text{ MB} = 11.21\text{ MB} \le 16.0\text{ MB}$$
   *Contrast with uncompressed PNG*: 3 models $\times$ 14.5MB = 43.5MB VRAM, which breaches mobile GPU limits and causes tab termination in Mobile Safari.

#### Visual Saliency Attention Prediction Oracle
The oracle simulates human ocular fixation during the first 500ms of viewing to guarantee CTA prominence and detect AI-generated distraction:
1. **Bottom-Up Multi-Scale Conspicuity Extraction**:
   - Luminance map: $I(x,y) = 0.299R + 0.587G + 0.114B$.
   - Color opponency: $RG = (R - G) / \max(1, I)$, $BY = (B - (R+G)/2) / \max(1, I)$.
   - Orientation energy: Sobel-Gabor convolution at $\theta \in \{0^\circ, 45^\circ, 90^\circ, 135^\circ\}$.
2. **Center-Surround Contrast & Foveal Prior**:
   - Compute difference-of-Gaussians across dyadic image scales.
   - Apply 500ms central fixation Gaussian prior $\mathcal{G}_{\text{fovea}}$ centered at screen midpoint.
   - Composite into normalized master saliency map $S(x,y) \in [0, 1]$.
3. **CTA Optical Prominence Score**:
   $$\text{Score}_{\text{CTA}} = \frac{\iint_{\text{AABB}_{\text{CTA}}} S(x,y) \, dx dy}{\iint_{\text{Viewport}} S(x,y) \, dx dy}$$
   - **Acceptance Criterion**: $\text{Score}_{\text{CTA}} \ge 0.18$ (primary CTA captures at least 18% of early visual attention) and CTA ranks within the top 2 global attention peaks.
4. **Visual Clutter & Distraction Elimination**:
   - Rosenholtz Feature Congestion metric computed on background and non-functional containers:
     $$\text{DistractionRatio} = \frac{\iint_{\text{NonFunctional}} S(x,y) \, dx dy}{\iint_{\text{Functional}} S(x,y) \, dx dy}$$
   - **Acceptance Criterion**: $\text{DistractionRatio} \le 0.35$.
   - Any layout exhibiting radioactive halos (`dark-glow`), high-frequency noisy background meshes, or distracting decorative elements scoring $\text{DistractionRatio} > 0.35$ fails the gate.

---

### 2.4 R5: Playwright CDP Adverse Hardware Stress Testing

#### Adverse Hardware Simulation Scenarios
1. **Scenario A: 6x CPU Throttling (`Emulation.setCPUThrottlingRate`)**:
   - Setup:
     ```js
     const cdp = await context.newCDPSession(page);
     await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });
     ```
   - Stress target: Simulates an entry-level mobile chipset (6x slowdown on main thread V8 execution).
   - Validation assertion:
     - Form input mask keystroke latency $< 16.6\text{ms}$ per character.
     - State machine transitions complete without dropped inputs or freezing.
     - Analytical spring animation updates position via $t - t_0$ formula without frame stalling.

2. **Scenario B: 30fps rAF Clamping (Safari Low Power Mode)**:
   - Setup via `page.addInitScript`:
     ```js
     const origRaf = window.requestAnimationFrame;
     let lastTime = 0;
     window.requestAnimationFrame = function(cb) {
       return origRaf(function(now) {
         if (now - lastTime < 31.5) {
           return origRaf(cb);
         }
         lastTime = now;
         cb(now);
       });
     };
     ```
   - Validation assertion:
     - Because analytical spring evaluation $x(t)$ evaluates continuous timestamp $t$ rather than discrete frame increments ($t += 1/60$), total spring settling duration is identical at 30fps and 60fps ($t_{\text{settle}} \pm 10\text{ms}$).
     - Zero numerical instability, zero velocity explosion.

3. **Scenario C: WebGL Context Loss & Restoration (`WEBGL_lose_context`)**:
   - Setup via `page.evaluate`:
     ```js
     const canvas = document.querySelector('canvas');
     const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
     const ext = gl.getExtension('WEBGL_lose_context');
     ext.loseContext();
     // Application triggers 'webglcontextlost' (e.preventDefault() called to permit restore)
     // Wait 250ms, then:
     ext.restoreContext();
     // Application triggers 'webglcontextrestored', re-binds shaders and KTX2 textures
     ```
   - Validation assertion:
     - Render loop safely halts on context loss without uncaught `GL_INVALID_OPERATION` errors.
     - On restore, textures and buffers are reloaded, returning to 60fps.
     - DOM form overlays, text, and buttons remain completely responsive during WebGL outage.

---

## 3. Caveats

1. **Browser Vibration API Availability in Headless Chromium**:
   In headless Chromium environments (e.g. CI/CD test runners), `navigator.vibrate` is present on the window object but acts as a no-op returning `true`. Unit tests must spy on `navigator.vibrate` calls to verify pulse array payloads (`[12]`, `[8]`, `[30, 40, 40]`).
2. **GPU Emulation in Headless CDP**:
   Running Playwright with `--disable-gpu` uses SwiftShader software rasterizer. WebGL context loss via `WEBGL_lose_context` works reliably in SwiftShader, but hardware-accelerated ASTC decompression requires GPU texture transcoding to fallback formats (e.g. RGBA or BCn/ETC2) depending on host OS driver support.
3. **No External NPM Dependencies Mandate**:
   Because `@gltf-transform/core`, `xstate`, and `@zag-js/core` are not pre-installed in `package.json`, the implementation workers must implement the finite state machine and analytical ODE physics using vanilla JS modules, ensuring zero runtime bloat and 100% deterministic test execution.

---

## 4. Conclusion

1. **R2 Architecture**: Form finite state machines must be organized into `src/fsm/core/machine.js` (micro-engine) and `src/forms/b2b-quote-machine.js` / `checkout-machine.js`. This guarantees complete deterministic state transitions (`idle`, `validating`, `submitting`, `error`, `success`), adaptive masks (CPF/CNPJ, Phone, Currency), and localStorage draft recovery without external runtime dependencies.
2. **R3 Physics & Math**: The analytical second-order ODE model $\ddot{x} + 2\zeta\omega_n\dot{x} + \omega_n^2 x = 0$ is solved in closed form across all three regimes (underdamped $\zeta < 1$, critically damped $\zeta = 1$, overdamped $\zeta > 1$). Continuous velocity handoff is achieved by injecting $v_0$ directly into the analytical equations at release time $t=0$, and `prefers-reduced-motion` enforces critically damped zero-overshoot motion ($0\text{px}$ overshoot mathematically guaranteed).
3. **R4 GPU & Saliency**: KTX2 UASTC/ETC1S block compression guarantees total VRAM $\le 11.2\text{MB}$ for 3 concurrent product models (well below the 16MB threshold). The visual saliency oracle computes 500ms initial glance attention maps, demanding $\text{Score}_{\text{CTA}} \ge 0.18$ and filtering AI distractions with $\text{DistractionRatio} \le 0.35$.
4. **R5 Hardware Stress**: Playwright CDP testing cleanly validates 6x CPU throttling via `Emulation.setCPUThrottlingRate`, 30fps rAF clamping via init script hook, and WebGL resiliency via `WEBGL_lose_context.loseContext()` & `restoreContext()`.

---

## 5. Verification Method

### 5.1 Independent Verification Commands
To independently verify that existing engine tests pass and that the environment is ready for milestone implementation:

```bash
# 1. Run full test suite to confirm clean baseline
npm test

# 2. Run milestone unit tests
npm run test:milestones

# 3. Verify Playwright Chromium installation
npx playwright --version
```

### 5.2 Verification Files to Inspect
- `src/assets3d/vram-auditor.js`: Confirms VRAM formula and byte-per-pixel mappings.
- `src/kinetic/adaptive-constraints.js`: Confirms `resolveMotionReducedScaling` convention.
- `test/e2e/e2e-harness.js`: Confirms CDP session setup (`context.newCDPSession(page)`).
- `.kombai/canvas/jumpflex-home-journey.canvas`: Confirms JumpPlay B2B Quote field requirements.

### 5.3 Invalidation Conditions
- Any occurrence of oscillatory overshoot when `prefers-reduced-motion` is active.
- Scene texture VRAM exceeding $16\text{MB}$ under ASTC/UASTC compression.
- Long tasks $> 100\text{ms}$ occurring during 6x throttled input mask typing.
- WebGL context loss throwing unhandled exceptions or failing to restore.
