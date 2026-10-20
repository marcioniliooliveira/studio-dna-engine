/**
 * test/assets3d/shader-slicer.test.js
 * 
 * Studio DNA PRO v2.6 — Unit Test Suite
 * Feature: Two-Phase Backward Program Slicing & GLSL AST Auditor (TASK-B4)
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  sliceProgram,
  computeUniformBlockLayout,
  auditGlslShader,
  computeShaderHash
} = require('../../src/assets3d/shader-slicer.js');

test('TASK-B4: Two-Phase Backward Program Slicing extracts Three.js and WebGL sinks', () => {
  const sampleJs = `
    const scroll = window.scrollY;
    const progress = scroll / (document.body.scrollHeight - window.innerHeight);
    const dampedP = progress * 1.5;
    
    const mouseX = e.clientX;
    const hoverVal = mouseX * 0.01;

    uniforms.u_sheetP.value = dampedP;
    material.uniforms.u_hover.value = hoverVal;
    gl.uniform1f(uTimeLocation, performance.now() * 0.001);
  `;

  const sliced = sliceProgram(sampleJs);
  assert.equal(sliced.sinkCount, 3);
  assert.ok(sliced.uniforms['u_sheetP'], 'Must extract u_sheetP sink');
  assert.ok(sliced.uniforms['u_hover'], 'Must extract u_hover sink');
  assert.ok(sliced.uniforms['u_uTime'], 'Must extract gl.uniform sink');

  // Verify backward dependency tracing
  assert.ok(sliced.uniforms['u_sheetP'].sources.includes('scrollY'));
  assert.ok(sliced.uniforms['u_hover'].sources.includes('pointer'));

  // Verify micro-runtime size budget (<15KB)
  assert.ok(sliced.isCompliantSize, `Micro-runtime must be < 15KB (got ${sliced.estimatedSizeKB} KB)`);
  assert.ok(sliced.microRuntimeCode.includes('class UniformBridge'));
});

test('TASK-B4: Micro-runtime is executable and updates uniforms correctly', () => {
  const sampleJs = `
    const p = progress * 2.0;
    uniforms.u_progress.value = p;
  `;
  const sliced = sliceProgram(sampleJs);
  assert.ok(sliced.microRuntimeCode);

  // Evaluate micro-runtime in isolated scope
  const targetUniforms = { u_progress: { value: 0 } };
  const fn = new Function('targetUniforms', `
    ${sliced.microRuntimeCode}
    const bridge = new UniformBridge(targetUniforms);
    bridge.update({ progress: 0.75 });
    return targetUniforms.u_progress.value;
  `);

  const result = fn(targetUniforms);
  assert.equal(result, 1.5, 'Micro-runtime must evaluate sliced progress formula (0.75 * 2.0 = 1.5)');
});

test('TASK-B4: GLSL std140 layout calculation enforces 16-byte alignment and vec3 padding', () => {
  const members = [
    { name: 'u_intensity', type: 'float' }, // offset 0, size 4
    { name: 'u_color', type: 'vec3' },      // offset must be padded to 16! size 12
    { name: 'u_direction', type: 'vec4' },  // offset 32, size 16
    { name: 'u_scale', type: 'float' }      // offset 48, size 4 -> total size rounded to 64
  ];

  const layout = computeUniformBlockLayout(members, 'std140');
  assert.equal(layout.standard, 'std140');
  assert.equal(layout.members[0].offset, 0);
  assert.equal(layout.members[1].offset, 16, 'vec3 must be aligned to 16 bytes in std140');
  assert.equal(layout.members[1].padding, 12, '12 bytes of padding required before vec3');
  assert.equal(layout.members[2].offset, 32);
  assert.equal(layout.members[3].offset, 48);
  assert.equal(layout.totalSizeBytes, 64, 'Total buffer size must be multiple of 16');
});

test('TASK-B4: auditGlslShader calculates ALU ops, texture fetches, branch divergence, and cycles', () => {
  const sampleGlsl = `
    precision highp float;
    uniform sampler2D u_texture;
    uniform float u_time;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float d = length(uv - 0.5);
      float wave = sin(d * 10.0 + u_time) * cos(uv.x * 5.0);
      
      vec4 tex = texture2D(u_texture, uv + vec2(wave * 0.02));
      
      if (d > 0.4) {
        tex.rgb *= 0.5;
      }

      gl_FragColor = tex;
    }
  `;

  const audit = auditGlslShader(sampleGlsl, { lambda: 4.0 });
  assert.ok(audit.aluOps > 5, 'Must count ALU functions and operators');
  assert.equal(audit.textureFetches, 1, 'Must count 1 texture2D call');
  assert.equal(audit.branchDivergence, 1, 'Must count 1 if statement');
  
  // Cycles = aluOps + 4 * 1 + 4.0 * 1
  assert.equal(audit.estimatedCycles, Math.round(audit.aluOps + 4 + 4));
  assert.equal(audit.is120FpsCapable, true, 'Lightweight shader must be 120 FPS capable');
});

test('TASK-B4: computeShaderHash normalizes whitespace and comments for deduplication', () => {
  const shader1 = `
    // Vertex displacement shader
    /* Multi-line comment */
    uniform float u_time;
    void main() {
      gl_Position = vec4(0.0);
    }
  `;

  const shader2 = `
    uniform float   u_time;
    void main() {
      gl_Position = vec4(0.0);
    }
    // Another comment at bottom
  `;

  const shaderDifferent = `
    uniform float u_time;
    void main() {
      gl_Position = vec4(1.0);
    }
  `;

  const hash1 = computeShaderHash(shader1);
  const hash2 = computeShaderHash(shader2);
  const hashDiff = computeShaderHash(shaderDifferent);

  assert.equal(hash1, hash2, 'Comments and whitespace variations must yield identical canonical hash');
  assert.notEqual(hash1, hashDiff, 'Modified shader logic must yield distinct hash');
});
