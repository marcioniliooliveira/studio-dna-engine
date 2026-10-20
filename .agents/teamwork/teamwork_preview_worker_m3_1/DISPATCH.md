# Dispatch: Worker M3 — Ultralight 3D Mobile Assets Pipeline (<3MB Disk, <4MB VRAM)

**Target**: C:\Users\wd\Documents\playwright-scraper
**Working Directory**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m3_1
**Authoritative Request**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
**Project Scope Document**: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
**Architecture Survey Report**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_explorer_survey_2\handoff.md

**Write Ownership (Exclusively owned files)**:
- `src/assets3d/gltf-optimizer-pipeline.js`
- `src/assets3d/texture-compressor.js`
- `src/assets3d/mesh-quantizer.js`
- `src/assets3d/vram-auditor.js`
- `test/m3-assets3d-pipeline.test.js`

**Mandatory Integrity Warning**:
> DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

**Objective**:
Implement Requirement R3 per the architecture and contracts in `PROJECT.md`:
1. `src/assets3d/gltf-optimizer-pipeline.js`:
   - Automated glTF/GLB optimization pipeline orchestrating pruning, coincident vertex welding, quadric decimation, and texture resampling.
   - Decimates models to $\le 25,000$ vertices, $\le 40,000$ triangles, guaranteeing total asset disk size $< 3.0\text{MB}$ ($3,145,728\text{ bytes}$).
2. `src/assets3d/texture-compressor.js`:
   - GPU-native block compression via Basis Universal KTX2 (`KHR_texture_basisu`).
   - Generates ASTC_4x4 / UASTC textures (1 byte per pixel in GPU memory, avoiding the $22.4\text{MB}$ uncompressed PNG trap).
   - Implements ORM channel packing: packs Ambient Occlusion (R), Roughness (G), and Metalness (B) into a single $512 \times 512$ map ($0.33\text{MB}$ VRAM).
3. `src/assets3d/mesh-quantizer.js`:
   - Applies `KHR_mesh_quantization` reducing vertex attributes to 14 bytes/vertex (Int16 positions, Int8 normals, Int16 UVs).
   - Applies Meshopt compression (`KHR_meshopt_compression`) for instant streaming decode on mobile Safari.
4. `src/assets3d/vram-auditor.js`:
   - Mathematically computes exact GPU VRAM footprint:
     $\text{VRAM} = \sum (\text{TexWidth} \times \text{TexHeight} \times \text{BytesPerPixel} \times 1.3333) + \text{VertexBufferBytes} + \text{IndexBufferBytes}$.
   - Audits that asset VRAM $< 4.0\text{MB}$ ($4,194,304\text{ bytes}$).
   - Validates total scene VRAM under peak conditions $\le 384\text{MB}$ (WebKit / Mobile Safari GPU crash threshold).
   - Fails-closed if uncompressed PNG/JPEG textures are detected that inflate VRAM $> 4\text{MB}$.
5. `test/m3-assets3d-pipeline.test.js`:
   - Comprehensive unit test validating optimizer pipeline, texture compression math, mesh quantization, and VRAM auditor (including invalidating uncompressed textures and certifying compliant assets).
   - Run verification via `node --test test/m3-assets3d-pipeline.test.js`.
6. Document commands, code layout, and test results in `handoff.md` and send message to parent.


## 2026-10-03T07:27:40Z
You are Worker M3 for Requirement R3.
Your working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m3_1
Authoritative user request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
Project Scope Document: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
Your dispatch instructions: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m3_1\DISPATCH.md

You MUST read ORIGINAL_REQUEST.md first.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Exclusively owned files to implement:
- src/assets3d/gltf-optimizer-pipeline.js
- src/assets3d/texture-compressor.js
- src/assets3d/mesh-quantizer.js
- src/assets3d/vram-auditor.js
- test/m3-assets3d-pipeline.test.js

Implement all modules according to PROJECT.md contracts (automated gltf decimation to <3MB, Basis Universal KTX2 / ASTC_4x4 / ORM channel packing, KHR_mesh_quantization 14B/vertex, exact mathematical VRAM auditor enforcing <4MB VRAM and <=384MB WebKit ceiling).
Run verification via node --test test/m3-assets3d-pipeline.test.js.
Write your handoff report to C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m3_1\handoff.md with test outputs, and send a message to parent when completed.
