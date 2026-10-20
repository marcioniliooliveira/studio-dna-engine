# Pillar 8: WebGL Context Virtualization & Single-Canvas Scissor Multiplexer

**Document ID:** `DOC-RESEARCH-V26-PILAR-08`  
**System:** Studio DNA PRO v2.6 (`studio-dna-engine`)  
**Status:** Implementation-Grade Architectural Specification  
**Classification:** `[observed]` (codebase tests), `[documented]` (OpenGL 4.6 & WebGL 2.0 specifications), `[inferred]` (mathematical derivations)

---

## 1. Executive Summary & The WebGL Context Limit Problem

In modern modular front-end architectures where multiple `<dna-capsule>` sections are composed into a single long-form landing page or portfolio, each section may embed rich 3D visuals, interactive models, or distorted image planes.

However, all major web browsers enforce strict hardware limits on the number of concurrently active WebGL contexts (`[documented]`):
- **Apple Safari / WebKit (iOS & macOS):** Maximum **8** WebGL contexts.
- **Google Chrome / Chromium:** Maximum **16** WebGL contexts.
- **Mozilla Firefox:** Maximum **16** WebGL contexts.

When an application mounts a 9th canvas on WebKit or a 17th canvas on Chromium, the browser forcibly evicts the oldest context, firing an unrecoverable `webglcontextlost` event and leaving prior sections permanently blank.

Pillar 8 eliminates this hardware bottleneck through a **Two-Tier Virtualization Architecture**:
1. **Tier 1 (rAF Hibernation):** Standalone section canvases hibernate when scrolled out of view (`rootMargin: '250px'`), reducing draw calls and GPU utilization to zero.
2. **Tier 2 (Single-Canvas Scissor Multiplexer):** A single full-screen hardware canvas renders multiple virtual 3D scenes into distinct framebuffer sub-rectangles using the OpenGL Scissor Test (`gl.SCISSOR_TEST`), supporting an unlimited number of 3D capsules with exactly 1 active WebGL context.

---

## 2. Tier 1: IntersectionObserver rAF Hibernation

For standalone canvases that cannot be multiplexed into a single canvas, each capsule registers an `IntersectionObserver`:

```javascript
// [documented] Implementation-Grade Virtualization Hibernation
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const capsule = registry.get(entry.target);
    if (!capsule) continue;
    if (entry.isIntersecting) {
      capsule.resumeRendering();
    } else {
      capsule.pauseRendering();
    }
  }
}, {
  root: null,
  rootMargin: '250px 0px 250px 0px', // Pre-warms 250px before entering viewport
  threshold: 0.0
});
```

### Lifecycle Guarantees:
- **Off-Screen (`isIntersecting == false`):** The `requestAnimationFrame` loop is canceled via `cancelAnimationFrame(rafId)`. GPU draw calls and CPU matrix computations drop to 0. All WebGL buffers, textures, and shader programs remain resident in VRAM to prevent compilation latency when scrolling resumes.
- **Entering Screen (`isIntersecting == true`):** The rAF loop restarts instantly, rendering the first frame before the element enters the user's visible viewport due to the `250px` margin.

---

## 3. Tier 2: Single Shared Canvas Scissor Multiplexer

In the unified multi-capsule architecture, a single full-screen `<canvas id="studio-dna-shared-gl">` is mounted at the document root with `position: fixed; inset: 0; pointer-events: none`. Multiple virtual capsules render into distinct sub-regions of this shared framebuffer.

```
Shared WebGL Framebuffer (H_viewport x W_viewport):
┌──────────────────────────────────────────────────────────┐  OpenGL Y = fbHeight
│                                                          │
│     ┌────────────────────────┐                           │
│     │ Virtual Capsule 2      │                           │
│     │ Scissor Box 2          │                           │
│     └────────────────────────┘                           │
│                                                          │
│                 ┌──────────────────────────────┐         │
│                 │ Virtual Capsule 1            │         │
│                 │ Scissor Box 1                │         │
│                 └──────────────────────────────┘         │
│                                                          │
└──────────────────────────────────────────────────────────┘  OpenGL Y = 0
OpenGL X = 0                                     OpenGL X = fbWidth
```

### 3.1 DPR Clamping & Framebuffer Coordinate Transformation (Equations 26–27)

Let $rect = \text{capsuleElement.getBoundingClientRect()}$ be the viewport-relative bounding box in CSS pixels.  
Let $DPR$ be the device pixel ratio clamped to a maximum of $2.0$ to prevent mobile memory exhaustion:

$$\text{Eq. 26:} \quad DPR = \min(\text{window.devicePixelRatio} \parallel 1.0, \ 2.0)$$

HTML DOM coordinates originate at the top-left corner $(0, 0)$ with $Y$ increasing downwards.  
OpenGL framebuffer coordinates originate at the bottom-left corner $(0, 0)$ with $Y$ increasing upwards.

The exact coordinate transformation equations from CSS DOM pixels to OpenGL framebuffer pixels are:

$$\text{Eq. 27a:} \quad x_{\text{gl}} = \lfloor rect.left \cdot DPR \rfloor$$
$$\text{Eq. 27b:} \quad y_{\text{gl}} = \lfloor (H_{\text{viewport}} - rect.bottom) \cdot DPR \rfloor$$
$$\text{Eq. 27c:} \quad w_{\text{gl}} = \lfloor rect.width \cdot DPR \rfloor$$
$$\text{Eq. 27d:} \quad h_{\text{gl}} = \lfloor rect.height \cdot DPR \rfloor$$

### 3.2 Implementation-Grade Multiplexer Render Loop

```javascript
// [documented] Scissor Multiplexer Render Loop
function renderMultiplexedFrame(gl, capsules, sharedCanvas, dpr) {
  const fbWidth = Math.floor(window.innerWidth * dpr);
  const fbHeight = Math.floor(window.innerHeight * dpr);

  if (sharedCanvas.width !== fbWidth || sharedCanvas.height !== fbHeight) {
    sharedCanvas.width = fbWidth;
    sharedCanvas.height = fbHeight;
  }

  // Enable scissor testing globally
  gl.enable(gl.SCISSOR_TEST);

  for (const capsule of capsules) {
    if (!capsule.isVisible) continue;

    const rect = capsule.element.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) continue;

    const x_gl = Math.floor(rect.left * dpr);
    const y_gl = Math.floor((window.innerHeight - rect.bottom) * dpr);
    const w_gl = Math.floor(rect.width * dpr);
    const h_gl = Math.floor(rect.height * dpr);

    // Isolate viewport and scissor to capsule sub-region
    gl.viewport(x_gl, y_gl, w_gl, h_gl);
    gl.scissor(x_gl, y_gl, w_gl, h_gl);

    // Selective clearing: Clear depth buffer for this sub-region
    if (capsule.opaqueBackground) {
      gl.clearColor(capsule.bgColor[0], capsule.bgColor[1], capsule.bgColor[2], 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    } else {
      gl.clear(gl.DEPTH_BUFFER_BIT);
    }

    // Synchronize virtual camera aspect ratio
    capsule.camera.aspect = rect.width / rect.height;
    capsule.camera.updateProjectionMatrix();

    // Render capsule scene
    capsule.renderer.render(capsule.scene, capsule.camera);
  }

  // Restore global state
  gl.disable(gl.SCISSOR_TEST);
}
```

---

## 4. Formal Invariance Theorem 4: Scissor State Framebuffer Isolation

### Theorem 4 Statement
*Let $\mathcal{B} \subset \mathbb{R}^2$ be the scissor rectangle defined by $[x_{\text{gl}}, y_{\text{gl}}, w_{\text{gl}}, h_{\text{gl}}]$. For any draw call executed while $\text{gl.enable(gl.SCISSOR\_TEST)}$ is active, the fragment shader output and buffer clears mutate pixel values $P(x, y)$ in the framebuffer if and only if $(x, y) \in \mathcal{B}$.*

### Proof
Per the OpenGL 4.6 Core Specification §17.3.2 and the WebGL 2.0 Specification §5.14.3 (Scissor Test):

During fragment processing, the scissor test is applied prior to blending, depth-buffer testing, stencil testing, and color buffer writing.
Let $(x_w, y_w)$ be the window coordinates of an arbitrary fragment produced by the rasterizer. The scissor test condition is defined as:
$$\text{Pass}(x_w, y_w) \iff \left( x_{\text{gl}} \le x_w < x_{\text{gl}} + w_{\text{gl}} \right) \land \left( y_{\text{gl}} \le y_w < y_{\text{gl}} + h_{\text{gl}} \right)$$

If $\text{Pass}(x_w, y_w)$ evaluates to `true`, the fragment proceeds to the depth and color writing stages.  
If $\text{Pass}(x_w, y_w)$ evaluates to `false`, the fragment is unconditionally discarded. No depth, color, or stencil values in the framebuffer are written.

Furthermore, per OpenGL §17.4.3, `glClear()` commands are restricted by the active scissor box: only pixels $(x, y) \in \mathcal{B}$ are cleared to the clear values.

Consequently, for any pixel $(x, y) \notin \mathcal{B}$, the state remains strictly invariant across all draw calls and clears. Rendering in capsule $A$ cannot corrupt or overwrite the pixels of capsule $B$. $\blacksquare$

---

## 5. Virtual Camera Event Remapping & Raycasting (Equations 28–29)

Because the physical canvas covers the entire window, mouse and touch events must be remapped to the appropriate virtual scene camera:

1. **Active Capsule Identification:**
   For a pointer at window coordinates $(X_p, Y_p)$, find the capsule whose bounding box contains the pointer:
   $$\text{Eq. 28:} \quad rect.left \le X_p \le rect.right \quad \land \quad rect.top \le Y_p \le rect.bottom$$

2. **Normalized Device Coordinates (NDC) Remapping:**
   The pointer coordinates are mapped to the virtual camera's local NDC space $(x_{\text{cam}}, y_{\text{cam}}) \in [-1, 1]^2$:
   $$\text{Eq. 29a:} \quad x_{\text{cam}} = \left( \frac{X_p - rect.left}{rect.width} \right) \cdot 2 - 1$$
   $$\text{Eq. 29b:} \quad y_{\text{cam}} = -\left[ \left( \frac{Y_p - rect.top}{rect.height} \right) \cdot 2 - 1 \right]$$

3. **Raycaster Execution:**
   ```javascript
   raycaster.setFromCamera({ x: x_cam, y: y_cam }, capsule.camera);
   const intersects = raycaster.intersectObjects(capsule.interactiveObjects, true);
   ```
This guarantees that 3D hover states and click events trigger strictly on objects within the targeted capsule scene.

---

## 6. Verification Strategy

1. **Context Loss Prevention Test:** `test/v2.6/webgl-scissor-multiplexer.test.js` loads 12 independent 3D capsule instances on a single test page and verifies that only 1 hardware WebGL context is initialized with zero context loss events.
2. **Scissor Isolation Audit:** Verifies via screenshot pixel comparison that rendering into Capsule 1 does not alter pixels inside Capsule 2's bounding rect.
3. **Raycast Precision Test:** Simulates pointer clicks at sub-pixel coordinates and validates that raycast hits correspond to the target virtual mesh.
