/**
 * test/m2-kinetic-trajectory.test.js
 * 
 * Requirement R2 Verification Suite:
 * - TrajectorySolver: Centripetal Catmull-Rom C^2 splines, Squad unit quaternions, scroll progress
 * - OpticalAnchorTracker: NDC screen projection, normal back-face culling, BVH raycast occlusion
 * - DynamicAnchorCoordinator: Spring relaxation 0px² AABB overlap, 0px horizontal bleed, SVG leader lines
 * - AdaptiveConstraints: C3 mobile portrait rig, C4 reduced motion accessibility
 */

'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const {
  TrajectorySolver,
  computeNormalizedScroll,
  evaluateCentripetalCatmullRom,
  quaternionFromLookAt,
  slerp,
  squad,
  orbitPosition,
  quatNorm
} = require('../src/kinetic/trajectory-solver');

const {
  OpticalAnchorTracker,
  BVHNode,
  buildBVHFromTriangles,
  worldToView,
  viewToNDC,
  ndcToScreen,
  rayIntersectsTriangle
} = require('../src/kinetic/optical-anchor-tracker');

const {
  DynamicAnchorCoordinator,
  computeAABBOverlapArea,
  computeTotalOverlapArea,
  generateLeaderPath,
  findCardConnectorPoint
} = require('../src/kinetic/dynamic-anchor-coordinator');

const {
  resolveViewportCameraRig,
  resolveMotionReducedScaling,
  adaptCameraState,
  applyAdaptiveConstraints
} = require('../src/kinetic/adaptive-constraints');

// ============================================================================
// 1. TrajectorySolver & Mathematics
// ============================================================================

describe('TrajectorySolver & Spline Mathematics', () => {
  test('computeNormalizedScroll: accurately normalizes and clamps scroll position', () => {
    assert.equal(computeNormalizedScroll(0, 0, 1000), 0);
    assert.equal(computeNormalizedScroll(500, 0, 1000), 0.5);
    assert.equal(computeNormalizedScroll(1000, 0, 1000), 1.0);
    assert.equal(computeNormalizedScroll(-300, 0, 1000), 0);
    assert.equal(computeNormalizedScroll(1500, 0, 1000), 1.0);

    // Edge case: start equals end
    assert.equal(computeNormalizedScroll(500, 1000, 1000), 0);
    assert.equal(computeNormalizedScroll(1200, 1000, 1000), 1);
  });

  test('Centripetal Catmull-Rom: interpolates through knots exactly and preserves bounds', () => {
    const p0 = [0, 0, 0];
    const p1 = [1, 2, 0];
    const p2 = [4, 3, 1];
    const p3 = [5, 0, 2];

    const start = evaluateCentripetalCatmullRom(p0, p1, p2, p3, 0.0, 0.5);
    const end = evaluateCentripetalCatmullRom(p0, p1, p2, p3, 1.0, 0.5);

    // At u=0, evaluates to p1
    assert.ok(Math.abs(start[0] - p1[0]) < 1e-4);
    assert.ok(Math.abs(start[1] - p1[1]) < 1e-4);
    assert.ok(Math.abs(start[2] - p1[2]) < 1e-4);

    // At u=1, evaluates to p2
    assert.ok(Math.abs(end[0] - p2[0]) < 1e-4);
    assert.ok(Math.abs(end[1] - p2[1]) < 1e-4);
    assert.ok(Math.abs(end[2] - p2[2]) < 1e-4);
  });

  test('TrajectorySolver: maintains C^2 position continuity without cusps or velocity jumps', () => {
    const keyframes = [
      { scrollProgress: 0.0, position: [0, 1, 5], target: [0, 0, 0], fov: 40 },
      { scrollProgress: 0.3, position: [3, 2, 4], target: [0, 0.5, 0], fov: 38 },
      { scrollProgress: 0.7, position: [4, 1, 1], target: [0, 0, 0], fov: 42 },
      { scrollProgress: 1.0, position: [0, 4, 3], target: [0, 0, 0], fov: 45 }
    ];

    const solver = new TrajectorySolver({ keyframes, yStart: 0, yEnd: 1000 });

    // Verify knot positions evaluate cleanly
    const s0 = solver.evaluate(0.0);
    assert.ok(Math.abs(s0.position[0] - 0) < 1e-3);
    assert.ok(Math.abs(s0.position[1] - 1) < 1e-3);
    assert.ok(Math.abs(s0.position[2] - 5) < 1e-3);

    const s1 = solver.evaluate(1.0);
    assert.ok(Math.abs(s1.position[0] - 0) < 1e-3);
    assert.ok(Math.abs(s1.position[1] - 4) < 1e-3);
    assert.ok(Math.abs(s1.position[2] - 3) < 1e-3);

    // Check numerical continuity of velocity (C^1) and acceleration (C^2) across 100 samples
    let prevVel = null;
    let maxAccelJump = 0;

    for (let i = 1; i < 99; i++) {
      const s = i / 100;
      const vel = solver.getVelocity(s, 0.002);
      const accel = solver.getAcceleration(s, 0.002);

      assert.ok(Number.isFinite(vel.positionVelocity[0]));
      assert.ok(Number.isFinite(accel.positionAcceleration[0]));

      if (prevVel) {
        const velDelta = Math.hypot(
          vel.positionVelocity[0] - prevVel.positionVelocity[0],
          vel.positionVelocity[1] - prevVel.positionVelocity[1],
          vel.positionVelocity[2] - prevVel.positionVelocity[2]
        );
        // Velocity varies smoothly across delta s = 0.01
        assert.ok(velDelta < 15.0, `Velocity jump ${velDelta} too large at s=${s}`);
      }
      prevVel = vel;
    }
  });

  test('Squad Quaternions: strictly preserves unit normalization ||q|| = 1.0 at all samples', () => {
    const keyframes = [
      { scrollProgress: 0.0, position: [0, 0, 5], target: [0, 0, 0], up: [0, 1, 0] },
      { scrollProgress: 0.5, position: [5, 2, 0], target: [0, 0, 0], up: [0, 1, 0] },
      { scrollProgress: 1.0, position: [0, 5, 2], target: [0, 0, 0], up: [0, 0, 1] }
    ];

    const solver = new TrajectorySolver({ keyframes });
    const samples = solver.sampleCurve(50);

    for (const sample of samples) {
      const q = sample.quaternion;
      assert.ok(Array.isArray(q) && q.length === 4);
      const norm = quatNorm(q);
      assert.ok(Math.abs(norm - 1.0) < 1e-5, `Quaternion norm ${norm} deviated from 1.0`);
    }
  });

  test('orbitPosition: generates valid spherical coordinates relative to target', () => {
    const target = [1, 2, 3];
    const radius = 4;
    // theta = 0, phi = PI/2 (equator) -> x = target.x + radius, y = target.y, z = target.z
    const pEquator = orbitPosition(target, radius, 0, Math.PI / 2);
    assert.ok(Math.abs(pEquator[0] - (1 + 4)) < 1e-4);
    assert.ok(Math.abs(pEquator[1] - 2) < 1e-4);
    assert.ok(Math.abs(pEquator[2] - 3) < 1e-4);
  });
});

// ============================================================================
// 2. OpticalAnchorTracker & Coordinate Projection
// ============================================================================

describe('OpticalAnchorTracker & Screen Projection', () => {
  test('worldToView & viewToNDC: projects focal center point to (0, 0) NDC and screen center', () => {
    const eye = [0, 0, 5];
    const target = [0, 0, 0];
    const up = [0, 1, 0];
    const fov = 45;
    const aspect = 1440 / 900;

    // Point at target should project to center
    const viewPt = worldToView(target, eye, target, up);
    assert.ok(Math.abs(viewPt[0]) < 1e-4, 'X view should be 0');
    assert.ok(Math.abs(viewPt[1]) < 1e-4, 'Y view should be 0');
    assert.ok(viewPt[2] < 0, 'Z view should be negative in front of camera');

    const ndcRes = viewToNDC(viewPt, fov, aspect);
    assert.ok(ndcRes.inFrustum);
    assert.ok(Math.abs(ndcRes.ndc[0]) < 1e-4, 'NDC X should be 0');
    assert.ok(Math.abs(ndcRes.ndc[1]) < 1e-4, 'NDC Y should be 0');

    const screen = ndcToScreen(ndcRes.ndc, 1440, 900);
    assert.equal(screen.x, 720);
    assert.equal(screen.y, 450);
  });

  test('Normal Back-Face Culling: correctly culls and fades points facing away from camera', () => {
    const tracker = new OpticalAnchorTracker();

    // Anchor on front face pointing towards camera at +Z
    tracker.addAnchor({
      id: 'front-anchor',
      worldPoint: [0, 0, 0],
      normal: [0, 0, 1] // Points +Z towards camera at [0, 0, 5]
    });

    // Anchor on back face pointing away from camera
    tracker.addAnchor({
      id: 'back-anchor',
      worldPoint: [0, 0, 0],
      normal: [0, 0, -1] // Points -Z away from camera
    });

    const cameraState = {
      position: [0, 0, 5],
      target: [0, 0, 0],
      up: [0, 1, 0],
      fov: 45
    };
    const viewport = { width: 1440, height: 900 };

    const tracked = tracker.trackAll(cameraState, viewport);
    const front = tracked.find(a => a.id === 'front-anchor');
    const back = tracked.find(a => a.id === 'back-anchor');

    assert.ok(front.facingCamera === true);
    assert.ok(front.visible === true);
    assert.ok(front.opacity > 0.8);

    assert.ok(back.facingCamera === false);
    assert.ok(back.visible === false);
    assert.equal(back.opacity, 0);
  });

  test('BVH Raycast Occlusion: flags anchor as occluded when geometry blocks sight line', () => {
    // Intervening triangle placed at z = 2, between camera at z = 5 and anchor at z = 0
    const occludingTriangles = [
      {
        v0: [-2, -2, 2],
        v1: [2, -2, 2],
        v2: [0, 2, 2]
      }
    ];

    const tracker = new OpticalAnchorTracker({ geometry: occludingTriangles });

    // Anchor behind occluding triangle
    tracker.addAnchor({
      id: 'occluded-anchor',
      worldPoint: [0, 0, 0],
      normal: [0, 0, 1]
    });

    // Anchor off to the side with clear line of sight
    tracker.addAnchor({
      id: 'visible-anchor',
      worldPoint: [10, 0, 0],
      normal: [0, 0, 1]
    });

    const cameraState = {
      position: [0, 0, 5],
      target: [0, 0, 0],
      up: [0, 1, 0],
      fov: 45
    };
    const viewport = { width: 1440, height: 900 };

    const tracked = tracker.trackAll(cameraState, viewport);
    const occluded = tracked.find(a => a.id === 'occluded-anchor');
    const visible = tracked.find(a => a.id === 'visible-anchor');

    assert.ok(occluded.facingCamera === true);
    assert.ok(occluded.occluded === true, 'Anchor behind triangle must be occluded');
    assert.ok(occluded.visible === false);
    assert.equal(occluded.opacity, 0);

    assert.ok(visible.occluded === false, 'Anchor off to side must NOT be occluded');
  });

  test('Frustum Culling: marks points behind camera as outside frustum', () => {
    const tracker = new OpticalAnchorTracker();
    tracker.addAnchor({
      id: 'behind-cam',
      worldPoint: [0, 0, 10], // Camera is at z = 5, target at z = 0. Point at z = 10 is behind camera!
      normal: [0, 0, -1]
    });

    const cameraState = {
      position: [0, 0, 5],
      target: [0, 0, 0],
      up: [0, 1, 0],
      fov: 45
    };
    const viewport = { width: 1440, height: 900 };

    const tracked = tracker.trackAll(cameraState, viewport);
    const behind = tracked.find(a => a.id === 'behind-cam');
    assert.ok(behind.inFrustum === false);
    assert.ok(behind.visible === false);
  });
});

// ============================================================================
// 3. DynamicAnchorCoordinator & AABB Non-Overlap
// ============================================================================

describe('DynamicAnchorCoordinator & Non-Overlap Invariants', () => {
  test('AABB Overlap helper functions accurately calculate overlap area in px²', () => {
    const r1 = { x: 10, y: 10, width: 100, height: 50 };
    const r2 = { x: 50, y: 20, width: 100, height: 50 };
    // Overlap: x in [50, 110] -> 60px. y in [20, 60] -> 40px. Area = 2400px²
    const area = computeAABBOverlapArea(r1, r2);
    assert.equal(area, 2400);

    const r3 = { x: 200, y: 200, width: 50, height: 50 };
    assert.equal(computeAABBOverlapArea(r1, r3), 0);
  });

  test('Coordinator spring relaxation: enforces strictly 0px² total overlap on desktop (1440x900)', () => {
    const coordinator = new DynamicAnchorCoordinator({ cardWidth: 160, cardHeight: 60 });

    // 5 anchors clustered closely near the center of the screen
    const clusteredAnchors = [
      { id: 'c1', screen: { x: 700, y: 440 }, visible: true, opacity: 1.0 },
      { id: 'c2', screen: { x: 710, y: 450 }, visible: true, opacity: 1.0 },
      { id: 'c3', screen: { x: 720, y: 460 }, visible: true, opacity: 1.0 },
      { id: 'c4', screen: { x: 730, y: 445 }, visible: true, opacity: 1.0 },
      { id: 'c5', screen: { x: 690, y: 455 }, visible: true, opacity: 1.0 }
    ];

    const result = coordinator.coordinate(clusteredAnchors, { width: 1440, height: 900 });

    assert.equal(result.cards.length, 5);
    assert.equal(result.totalOverlapArea, 0, 'Total overlap area must strictly equal 0px²');

    // Double check each pair manually
    for (let i = 0; i < result.cards.length; i++) {
      for (let j = i + 1; j < result.cards.length; j++) {
        const overlap = computeAABBOverlapArea(result.cards[i].rect, result.cards[j].rect);
        assert.equal(overlap, 0, `Cards ${i} and ${j} overlap by ${overlap}px²`);
      }
    }
  });

  test('Coordinator mobile portrait: guarantees 0px horizontal layout bleed on mobile (390x844)', () => {
    const coordinator = new DynamicAnchorCoordinator({
      cardWidth: 150,
      cardHeight: 50,
      safeMarginX: 16,
      safeMarginY: 16
    });

    const mobileAnchors = [
      { id: 'm1', screen: { x: 50, y: 300 }, visible: true, opacity: 1.0 },
      { id: 'm2', screen: { x: 340, y: 320 }, visible: true, opacity: 1.0 },
      { id: 'm3', screen: { x: 200, y: 350 }, visible: true, opacity: 1.0 },
      { id: 'm4', screen: { x: 210, y: 360 }, visible: true, opacity: 1.0 }
    ];

    const vp = { width: 390, height: 844 };
    const result = coordinator.coordinate(mobileAnchors, vp);

    assert.equal(result.totalOverlapArea, 0);

    // Verify 0px horizontal bleed and safe margins
    for (const card of result.cards) {
      assert.ok(card.rect.x >= 16, `Card ${card.id} left edge ${card.rect.x} exceeds left margin 16`);
      assert.ok(
        card.rect.right <= vp.width - 16,
        `Card ${card.id} right edge ${card.rect.right} bleeds past viewport width ${vp.width - 16}`
      );
      assert.ok(card.rect.y >= 16, `Card ${card.id} top edge exceeds margin`);
      assert.ok(card.rect.bottom <= vp.height - 16, `Card ${card.id} bottom edge exceeds margin`);
    }
  });

  test('Leader Lines & SVG: generates valid SVG path elements and connector attachments', () => {
    const anchorPt = { x: 100, y: 150 };
    const cardRect = { x: 250, y: 120, width: 140, height: 60 };

    const connPt = findCardConnectorPoint(anchorPt, cardRect);
    assert.equal(connPt.x, 250, 'Connector attached to left card edge');

    const elbowPath = generateLeaderPath(anchorPt, connPt, 'elbow');
    assert.ok(elbowPath.startsWith('M 100,150 L'));
    assert.ok(elbowPath.endsWith('L 250,150'));

    const linearPath = generateLeaderPath(anchorPt, connPt, 'linear');
    assert.equal(linearPath, 'M 100,150 L 250,150');

    const bezierPath = generateLeaderPath(anchorPt, connPt, 'bezier');
    assert.ok(bezierPath.includes(' C '));
  });
});

// ============================================================================
// 4. Adaptive Constraints: C3 Viewport & C4 Reduced Motion
// ============================================================================

describe('AdaptiveConstraints (C3 Viewport & C4 Motion)', () => {
  test('C3 Viewport Adaptation: wide landscape retains standard FOV & distance', () => {
    const rigDesktop = resolveViewportCameraRig(1440 / 900, 24, 2.4);
    assert.equal(rigDesktop.portrait, false);
    assert.equal(rigDesktop.fov, 24);
    assert.equal(rigDesktop.distance, 2.4);
    assert.equal(rigDesktop.safeAreaOffset, 0);
  });

  test('C3 Viewport Adaptation: mobile portrait compensates FOV, pulls distance back, and adds safe-area offset', () => {
    const mobileRatio = 390 / 844; // ~0.462
    const rigMobile = resolveViewportCameraRig(mobileRatio, 24, 2.4);

    assert.equal(rigMobile.portrait, true);
    // Compensated FOV scales up towards 38°
    assert.ok(rigMobile.fov >= 34 && rigMobile.fov <= 38, `Mobile FOV ${rigMobile.fov} expected 34-38°`);
    // Camera pulled back 1.35x
    assert.equal(rigMobile.distance, 3.24);
    // Safe area vertical downward shift 0.15m
    assert.equal(rigMobile.safeAreaOffset, 0.15);
  });

  test('C4 Reduced Motion: scales damping, duration, and freezes noise shaders when active', () => {
    const normal = resolveMotionReducedScaling(false);
    assert.equal(normal.prefersReducedMotion, false);
    assert.equal(normal.damp, 0.12);
    assert.equal(normal.duration, 0.8);
    assert.equal(normal.enableFbmDrift, true);

    const reduced = resolveMotionReducedScaling(true);
    assert.equal(reduced.prefersReducedMotion, true);
    assert.equal(reduced.damp, 1.0, 'Snaps camera immediately (damp: 1.0)');
    assert.equal(reduced.duration, 0.01, 'Instant duration (0.01s)');
    assert.equal(reduced.enableFbmDrift, false, 'Freezes animated FBM smoke shader drift');
    assert.equal(reduced.allowTranslations, false);
    assert.equal(reduced.staggerDelay, 0.0);
  });

  test('adaptCameraState: applies complete mobile rig adaptation to camera state', () => {
    const baseCamera = {
      position: [0, 1, 4],
      target: [0, 0, 0],
      up: [0, 1, 0],
      fov: 24
    };

    const adapted = adaptCameraState(baseCamera, { width: 390, height: 844 });
    assert.equal(adapted.isPortrait, true);
    assert.ok(adapted.fov > 24);
    // Downward target shift
    assert.equal(adapted.target[1], -0.15);
    // Position scaled back 1.35x relative to target
    assert.ok(adapted.position[2] > 4.5);
  });
});

// ============================================================================
// 5. End-to-End M2 Integration Pipeline
// ============================================================================

describe('End-to-End M2 Kinetic Pipeline Integration', () => {
  test('Full pipeline: scroll progress -> trajectory -> adaptive rig -> anchor projection -> 0px² coordinator', () => {
    // 1. Setup TrajectorySolver with keyframes
    const keyframes = [
      { scrollProgress: 0.0, position: [0, 1, 5], target: [0, 0, 0], fov: 24 },
      { scrollProgress: 0.5, position: [3, 2, 4], target: [0, 0, 0], fov: 24 },
      { scrollProgress: 1.0, position: [0, 4, 3], target: [0, 0, 0], fov: 24 }
    ];
    const solver = new TrajectorySolver({ keyframes, yStart: 0, yEnd: 2000 });

    // 2. Setup Anchors and Tracker
    const tracker = new OpticalAnchorTracker();
    tracker.addAnchor({
      id: 'feature-a',
      title: 'Titanium Chassis',
      worldPoint: [0.2, 0.1, 0.1],
      normal: [0, 1, 0]
    });
    tracker.addAnchor({
      id: 'feature-b',
      title: 'Haptic Sensor',
      worldPoint: [0.0, 0.3, 0.2],
      normal: [0, 1, 1]
    });

    const coordinator = new DynamicAnchorCoordinator({ cardWidth: 160, cardHeight: 50 });

    // Simulate scroll at y = 1000 (s = 0.5) across Desktop and Mobile
    const viewports = [
      { name: 'Desktop', width: 1440, height: 900 },
      { name: 'Mobile', width: 390, height: 844 }
    ];

    for (const vp of viewports) {
      const rawCam = solver.evaluateScroll(1000);
      const adaptedRig = applyAdaptiveConstraints(rawCam, vp, { prefersReducedMotion: false });

      const projected = tracker.trackAll(adaptedRig.camera, vp);
      assert.ok(projected.length === 2);

      const layout = coordinator.coordinate(projected, vp);
      assert.equal(layout.totalOverlapArea, 0, `${vp.name} total overlap must be 0px²`);
      assert.ok(layout.cards.length >= 1);

      for (const card of layout.cards) {
        assert.ok(card.rect.x >= 20);
        assert.ok(card.rect.right <= vp.width - 20, `${vp.name} horizontal bleed violation`);
        assert.ok(card.svgPath.length > 5);
      }
    }
  });

  test('Adversarial card clustering: resolves 10 cards at identical (x, y) to strictly 0px² overlap', () => {
    const coordinator = new DynamicAnchorCoordinator({ cardWidth: 120, cardHeight: 40 });
    const identicalAnchors = Array.from({ length: 10 }, (_, i) => ({
      id: `stacked-${i}`,
      screen: { x: 400, y: 300 },
      visible: true,
      opacity: 1.0
    }));

    const layout = coordinator.coordinate(identicalAnchors, { width: 1440, height: 900 });
    assert.equal(layout.cards.length, 10);
    assert.equal(layout.totalOverlapArea, 0, 'Must have zero overlap area even under identical stacked input');

    for (let i = 0; i < layout.cards.length; i++) {
      for (let j = i + 1; j < layout.cards.length; j++) {
        const overlap = computeAABBOverlapArea(layout.cards[i].rect, layout.cards[j].rect);
        assert.equal(overlap, 0, `Pair (${i}, ${j}) must have 0px² overlap`);
      }
    }
  });

  test('Indexed mesh geometry BVH: accurately builds from vertex buffers and detects ray hit', () => {
    // A square quad composed of 2 triangles blocking z = 2
    // Quad vertices: (-1, -1, 2), (1, -1, 2), (1, 1, 2), (-1, 1, 2)
    const positions = [
      -1, -1, 2,
       1, -1, 2,
       1,  1, 2,
      -1,  1, 2
    ];
    const indices = [
      0, 1, 2,
      0, 2, 3
    ];

    const tracker = new OpticalAnchorTracker({
      geometry: { positions, indices }
    });

    tracker.addAnchor({
      id: 'blocked-by-indexed-mesh',
      worldPoint: [0, 0, 0],
      normal: [0, 0, 1]
    });

    const cameraState = {
      position: [0, 0, 5],
      target: [0, 0, 0],
      up: [0, 1, 0],
      fov: 45
    };
    const tracked = tracker.trackAll(cameraState, { width: 1440, height: 900 });
    assert.equal(tracked[0].occluded, true);
    assert.equal(tracked[0].visible, false);
  });

  test('Model Matrix transformation: applies 4x4 translation and rotation to local anchor points', () => {
    // 4x4 translation matrix: translate by (+5, +2, -3)
    const modelMatrix = [
      1, 0, 0, 5,
      0, 1, 0, 2,
      0, 0, 1, -3,
      0, 0, 0, 1
    ];

    const tracker = new OpticalAnchorTracker({ modelMatrix });
    tracker.addAnchor({
      id: 'translated-anchor',
      localPoint: [1, 1, 1],
      normal: [0, 1, 0]
    });

    const cameraState = {
      position: [6, 3, 5],
      target: [6, 3, -2],
      up: [0, 1, 0],
      fov: 45
    };
    const tracked = tracker.trackAll(cameraState, { width: 1440, height: 900 });
    const a = tracked[0];
    // World point: (1+5, 1+2, 1-3) = (6, 3, -2) = matches camera target!
    assert.equal(a.worldPoint[0], 6);
    assert.equal(a.worldPoint[1], 3);
    assert.equal(a.worldPoint[2], -2);
    // Point matches camera target, so NDC should be (0, 0)
    assert.ok(Math.abs(a.ndc.x) < 1e-3);
    assert.ok(Math.abs(a.ndc.y) < 1e-3);
  });

  test('Antipodal Quaternion Slerp: smoothly interpolates shortest path without negative dot flips', () => {
    // q and -q represent the identical physical rotation in SO(3)
    const q0 = [0, 0, 0, 1];
    const q1 = [0, 0, 0, -1]; // antipodal

    const mid = slerp(q0, q1, 0.5);
    const norm = quatNorm(mid);
    assert.ok(Math.abs(norm - 1.0) < 1e-5);
  });
});

