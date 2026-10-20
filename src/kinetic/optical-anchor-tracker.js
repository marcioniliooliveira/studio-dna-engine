/**
 * src/kinetic/optical-anchor-tracker.js
 * 
 * Requirement R2: Dynamic Optical Anchor Tracker & Screen Projection Pipeline
 * - Transforms 3D world interest points X_w = M_model * X_local to View, Clip, and NDC coordinates
 * - Normal back-face culling: N_w · (P_cam - X_w) > 0 with smooth opacity fade
 * - BVH raycast occlusion gating: marks anchor occluded if mesh geometry blocks line of sight
 * - NDC to Screen mapping:
 *     x_screen = ((X_ndc + 1) / 2) * W
 *     y_screen = ((1 - Y_ndc) / 2) * H
 */

'use strict';

// ============================================================================
// Vector & Matrix Math Helpers
// ============================================================================

function vec3(x = 0, y = 0, z = 0) {
  return [Number(x) || 0, Number(y) || 0, Number(z) || 0];
}

function vAdd(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function vSub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function vScale(a, s) {
  return [a[0] * s, a[1] * s, a[2] * s];
}

function vDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function vCross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function vLength(a) {
  return Math.hypot(a[0], a[1], a[2]);
}

function vNormalize(a) {
  const len = vLength(a);
  if (len < 1e-9) return [0, 0, 1];
  return [a[0] / len, a[1] / len, a[2] / len];
}

/**
 * Multiplies 4x4 matrix (flat 16 array, row-major) with 3D point (w = 1)
 */
function mat4TransformPoint(m, p) {
  if (!m || m.length < 16) return [...p];
  const x = p[0], y = p[1], z = p[2];
  const w = m[12] * x + m[13] * y + m[14] * z + m[15];
  const invW = Math.abs(w) > 1e-9 ? 1 / w : 1;
  return [
    (m[0] * x + m[1] * y + m[2] * z + m[3]) * invW,
    (m[4] * x + m[5] * y + m[6] * z + m[7]) * invW,
    (m[8] * x + m[9] * y + m[10] * z + m[11]) * invW
  ];
}

/**
 * Multiplies 4x4 matrix (upper 3x3) with normal vector
 */
function mat4TransformNormal(m, n) {
  if (!m || m.length < 16) return vNormalize(n);
  const x = n[0], y = n[1], z = n[2];
  const nx = m[0] * x + m[1] * y + m[2] * z;
  const ny = m[4] * x + m[5] * y + m[6] * z;
  const nz = m[8] * x + m[9] * y + m[10] * z;
  return vNormalize([nx, ny, nz]);
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// ============================================================================
// Bounding Volume Hierarchy (BVH) & Raycaster
// ============================================================================

/**
 * Ray-Triangle intersection via Möller–Trumbore algorithm
 */
function rayIntersectsTriangle(rayOrigin, rayDir, v0, v1, v2, maxDist, epsilon = 0.005) {
  const e1 = vSub(v1, v0);
  const e2 = vSub(v2, v0);
  const p = vCross(rayDir, e2);
  const det = vDot(e1, p);

  if (Math.abs(det) < 1e-9) return null;
  const invDet = 1 / det;

  const tvec = vSub(rayOrigin, v0);
  const u = vDot(tvec, p) * invDet;
  if (u < 0 || u > 1) return null;

  const q = vCross(tvec, e1);
  const v = vDot(rayDir, q) * invDet;
  if (v < 0 || u + v > 1) return null;

  const t = vDot(e2, q) * invDet;
  if (t > epsilon && t < maxDist - epsilon) {
    return t;
  }
  return null;
}

/**
 * Ray-AABB intersection via Kay-Kajiya Slab method
 */
function rayIntersectsAABB(rayOrigin, rayDir, box, maxDist) {
  let tmin = 0;
  let tmax = maxDist;

  for (let i = 0; i < 3; i++) {
    const invD = 1.0 / (Math.abs(rayDir[i]) < 1e-9 ? 1e-9 : rayDir[i]);
    let t0 = (box[i] - rayOrigin[i]) * invD;
    let t1 = (box[i + 3] - rayOrigin[i]) * invD;
    if (invD < 0) {
      const tmp = t0; t0 = t1; t1 = tmp;
    }
    tmin = Math.max(tmin, t0);
    tmax = Math.min(tmax, t1);
    if (tmax < tmin) return false;
  }

  return true;
}

/**
 * Lightweight BVH Node for fast raycast occlusion tests
 */
class BVHNode {
  constructor(triangles) {
    this.box = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
    this.left = null;
    this.right = null;
    this.triangles = null;

    for (const tri of triangles) {
      for (const pt of [tri.v0, tri.v1, tri.v2]) {
        this.box[0] = Math.min(this.box[0], pt[0]);
        this.box[1] = Math.min(this.box[1], pt[1]);
        this.box[2] = Math.min(this.box[2], pt[2]);
        this.box[3] = Math.max(this.box[3], pt[0]);
        this.box[4] = Math.max(this.box[4], pt[1]);
        this.box[5] = Math.max(this.box[5], pt[2]);
      }
    }

    if (triangles.length <= 4) {
      this.triangles = triangles;
      return;
    }

    // Split along longest axis
    const extents = [
      this.box[3] - this.box[0],
      this.box[4] - this.box[1],
      this.box[5] - this.box[2]
    ];
    let axis = 0;
    if (extents[1] > extents[0]) axis = 1;
    if (extents[2] > extents[axis]) axis = 2;

    triangles.sort((a, b) => {
      const cA = (a.v0[axis] + a.v1[axis] + a.v2[axis]) / 3;
      const cB = (b.v0[axis] + b.v1[axis] + b.v2[axis]) / 3;
      return cA - cB;
    });

    const mid = Math.floor(triangles.length / 2);
    this.left = new BVHNode(triangles.slice(0, mid));
    this.right = new BVHNode(triangles.slice(mid));
  }

  raycast(rayOrigin, rayDir, maxDist, epsilon = 0.005) {
    if (!rayIntersectsAABB(rayOrigin, rayDir, this.box, maxDist)) {
      return null;
    }

    if (this.triangles) {
      let closest = null;
      for (const tri of this.triangles) {
        const hit = rayIntersectsTriangle(rayOrigin, rayDir, tri.v0, tri.v1, tri.v2, maxDist, epsilon);
        if (hit !== null) {
          if (closest === null || hit < closest) {
            closest = hit;
          }
        }
      }
      return closest;
    }

    let closest = null;
    if (this.left) {
      const hitLeft = this.left.raycast(rayOrigin, rayDir, maxDist, epsilon);
      if (hitLeft !== null) closest = hitLeft;
    }
    if (this.right) {
      const limit = closest !== null ? closest : maxDist;
      const hitRight = this.right.raycast(rayOrigin, rayDir, limit, epsilon);
      if (hitRight !== null && (closest === null || hitRight < closest)) {
        closest = hitRight;
      }
    }
    return closest;
  }
}

function buildBVHFromTriangles(triangles) {
  if (!Array.isArray(triangles) || triangles.length === 0) return null;
  return new BVHNode(triangles);
}

function buildBVHFromGeometry(positions, indices) {
  const triangles = [];
  if (Array.isArray(indices) && indices.length >= 3) {
    for (let i = 0; i < indices.length; i += 3) {
      const i0 = indices[i] * 3;
      const i1 = indices[i + 1] * 3;
      const i2 = indices[i + 2] * 3;
      triangles.push({
        v0: [positions[i0], positions[i0 + 1], positions[i0 + 2]],
        v1: [positions[i1], positions[i1 + 1], positions[i1 + 2]],
        v2: [positions[i2], positions[i2 + 1], positions[i2 + 2]]
      });
    }
  } else if (Array.isArray(positions) && positions.length >= 9) {
    for (let i = 0; i < positions.length; i += 9) {
      triangles.push({
        v0: [positions[i], positions[i + 1], positions[i + 2]],
        v1: [positions[i + 3], positions[i + 4], positions[i + 5]],
        v2: [positions[i + 6], positions[i + 7], positions[i + 8]]
      });
    }
  }
  return buildBVHFromTriangles(triangles);
}

// ============================================================================
// Camera View & Projection Matrix Calculations
// ============================================================================

/**
 * Converts world point X_w to Eye / View coordinates
 */
function worldToView(pointW, eye, target, up) {
  const forward = vNormalize(vSub(target, eye));
  let right = vCross(forward, up);
  if (vLength(right) < 1e-9) {
    right = vCross(forward, [0, 0, 1]);
  }
  right = vNormalize(right);
  const trueUp = vNormalize(vCross(right, forward));
  const zAxis = vScale(forward, -1); // Camera looks down -Z

  const offset = vSub(pointW, eye);
  const xView = vDot(offset, right);
  const yView = vDot(offset, trueUp);
  const zView = vDot(offset, zAxis);

  return [xView, yView, zView];
}

/**
 * Projects View coordinates to Normalized Device Coordinates (NDC)
 * NDC is in [-1, 1]^3
 */
function viewToNDC(viewPoint, fovDeg, aspect, near = 0.1, far = 1000) {
  const [xv, yv, zv] = viewPoint;
  const wClip = -zv; // Since camera looks down -Z, in front of camera zv < 0 -> wClip > 0

  if (wClip <= 1e-6) {
    // Behind camera or at near plane
    return {
      ndc: [0, 0, 2],
      inFrustum: false,
      behindCamera: true
    };
  }

  const f = 1.0 / Math.tan((fovDeg * Math.PI) / 360);
  const xNdc = (f / aspect) * (xv / wClip);
  const yNdc = f * (yv / wClip);
  const zNdc = ((far + near) / (far - near)) + ((2 * far * near) / (near - far)) / wClip;

  const inFrustum = (
    wClip >= near && wClip <= far &&
    xNdc >= -1.0 && xNdc <= 1.0 &&
    yNdc >= -1.0 && yNdc <= 1.0 &&
    zNdc >= -1.0 && zNdc <= 1.0
  );

  return {
    ndc: [xNdc, yNdc, zNdc],
    inFrustum,
    behindCamera: false
  };
}

/**
 * Converts NDC to 2D Screen pixel coordinates
 * x_screen = ((X_ndc + 1) / 2) * W
 * y_screen = ((1 - Y_ndc) / 2) * H
 */
function ndcToScreen(ndc, width, height) {
  const xScreen = ((ndc[0] + 1) / 2) * width;
  const yScreen = ((1 - ndc[1]) / 2) * height;
  return {
    x: Number(xScreen.toFixed(2)),
    y: Number(yScreen.toFixed(2))
  };
}

// ============================================================================
// OpticalAnchorTracker Class
// ============================================================================

class OpticalAnchorTracker {
  /**
   * @param {Object} [options]
   * @param {Array<Object>} [options.anchors] Initial anchors
   * @param {number[]} [options.modelMatrix] 4x4 model matrix
   * @param {BVHNode|Array} [options.geometry] Mesh triangles or BVH
   */
  constructor(options = {}) {
    this.anchors = new Map();
    this.modelMatrix = options.modelMatrix || null;
    this.bvh = null;

    if (options.bvh instanceof BVHNode) {
      this.bvh = options.bvh;
    } else if (Array.isArray(options.geometry)) {
      this.bvh = buildBVHFromTriangles(options.geometry);
    } else if (options.geometry?.positions) {
      this.bvh = buildBVHFromGeometry(options.geometry.positions, options.geometry.indices);
    }

    if (Array.isArray(options.anchors)) {
      for (const a of options.anchors) {
        this.addAnchor(a);
      }
    }
  }

  /**
   * Registers a 3D spatial anchor
   */
  addAnchor(anchor) {
    if (!anchor || !anchor.id) {
      throw new Error('OpticalAnchorTracker: anchor must possess an id');
    }
    const worldPoint = anchor.worldPoint || anchor.localPoint || [0, 0, 0];
    const normal = anchor.normal || [0, 1, 0];

    this.anchors.set(anchor.id, {
      id: String(anchor.id),
      title: anchor.title || anchor.id,
      description: anchor.description || '',
      worldPoint: vec3(worldPoint[0], worldPoint[1], worldPoint[2]),
      normal: vNormalize(vec3(normal[0], normal[1], normal[2])),
      safeArea: anchor.safeArea || { xMin: 0.05, xMax: 0.95, yMin: 0.05, yMax: 0.95 }
    });
  }

  setBVH(bvh) {
    this.bvh = bvh;
  }

  setGeometry(trianglesOrMesh) {
    if (trianglesOrMesh instanceof BVHNode) {
      this.bvh = trianglesOrMesh;
    } else if (Array.isArray(trianglesOrMesh)) {
      this.bvh = buildBVHFromTriangles(trianglesOrMesh);
    } else if (trianglesOrMesh?.positions) {
      this.bvh = buildBVHFromGeometry(trianglesOrMesh.positions, trianglesOrMesh.indices);
    }
  }

  /**
   * Projects a single anchor to screen space with back-face culling and occlusion test
   * 
   * @param {Object} anchor Anchor definition
   * @param {Object} cameraState Camera parameters { position, target, up, fov }
   * @param {Object} viewport Viewport dimensions { width, height }
   * @returns {Object} Tracking result
   */
  project(anchor, cameraState, viewport) {
    const eye = vec3(cameraState.position[0], cameraState.position[1], cameraState.position[2]);
    const target = vec3(cameraState.target[0], cameraState.target[1], cameraState.target[2]);
    const up = vNormalize(vec3(cameraState.up[0], cameraState.up[1], cameraState.up[2]));
    const fov = Number(cameraState.fov) || 45;

    const width = Math.max(1, Number(viewport.width) || 1440);
    const height = Math.max(1, Number(viewport.height) || 900);
    const aspect = width / height;

    // 1. Resolve World Coordinates (apply model matrix if local)
    let pWorld = anchor.worldPoint;
    let nWorld = anchor.normal;
    if (this.modelMatrix) {
      pWorld = mat4TransformPoint(this.modelMatrix, pWorld);
      nWorld = mat4TransformNormal(this.modelMatrix, nWorld);
    }

    // 2. Normal Back-Face Culling: N_w · (P_cam - X_w) > 0
    const viewRay = vSub(eye, pWorld);
    const distToCam = vLength(viewRay);
    const viewRayDir = vNormalize(viewRay);
    const normalDot = vDot(nWorld, viewRayDir);
    const facingCamera = normalDot > 0;

    // Smooth opacity fade at grazing angles [0.0, 0.15]
    let normalOpacity = 0;
    if (normalDot > 0.15) {
      normalOpacity = 1.0;
    } else if (normalDot > 0) {
      normalOpacity = smoothstep(0, 0.15, normalDot);
    }

    // 3. BVH Raycast Occlusion Gating
    let occluded = false;
    if (facingCamera && this.bvh && distToCam > 0.01) {
      // Cast ray from camera eye towards world point
      const rayDir = vScale(viewRayDir, -1); // from eye to world point
      const hitDist = this.bvh.raycast(eye, rayDir, distToCam);
      if (hitDist !== null && hitDist < distToCam - 0.005) {
        occluded = true;
      }
    }

    // 4. Transform World to View space
    const viewPt = worldToView(pWorld, eye, target, up);

    // 5. Transform View to NDC space
    const ndcResult = viewToNDC(viewPt, fov, aspect);
    const inFrustum = ndcResult.inFrustum && !ndcResult.behindCamera;

    // 6. Transform NDC to Screen coordinates
    const screenPt = ndcToScreen(ndcResult.ndc, width, height);

    // 7. Calculate final combined visibility and opacity
    const visible = inFrustum && facingCamera && !occluded;
    const finalOpacity = visible ? Number(normalOpacity.toFixed(3)) : 0;

    return {
      id: anchor.id,
      title: anchor.title,
      description: anchor.description,
      worldPoint: pWorld,
      normal: nWorld,
      viewPoint: viewPt,
      ndc: {
        x: Number(ndcResult.ndc[0].toFixed(4)),
        y: Number(ndcResult.ndc[1].toFixed(4)),
        z: Number(ndcResult.ndc[2].toFixed(4))
      },
      screen: screenPt,
      inFrustum,
      facingCamera,
      normalDot: Number(normalDot.toFixed(4)),
      occluded,
      visible,
      opacity: finalOpacity,
      safeArea: anchor.safeArea
    };
  }

  /**
   * Projects and tracks all registered anchors
   */
  trackAll(cameraState, viewport) {
    const results = [];
    for (const anchor of this.anchors.values()) {
      results.push(this.project(anchor, cameraState, viewport));
    }
    return results;
  }
}

module.exports = {
  OpticalAnchorTracker,
  BVHNode,
  buildBVHFromTriangles,
  buildBVHFromGeometry,
  worldToView,
  viewToNDC,
  ndcToScreen,
  rayIntersectsTriangle,
  rayIntersectsAABB
};
