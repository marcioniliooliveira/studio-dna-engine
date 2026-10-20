/**
 * src/assets3d/shader-slicer.js
 * 
 * Studio DNA PRO v2.6 — Zero-Dependency WebGL Shader Slicer & GLSL AST Auditor (Pillar 6 & 8)
 * 
 * Standards & Implementations:
 * - Two-Phase Backward Program Slicing (Weiser 1984 / Tip 1995 adapted for WebGL render loops)
 *   Phase I: WebGL Uniform Sink Identification (gl.uniform*, uniforms.<name>.value)
 *   Phase II: Backward Dependency Slicing to Reactive Sources (scroll, time, pointer, viewport)
 * - Micro-runtime emitter (<15KB) decoupling WebGL shaders from bloated host frameworks (Nuxt/Next/Vue)
 * - Static GLSL AST Auditor:
 *   - std140 / std430 Uniform Block memory alignment calculation with vec3/mat padding
 *   - GPU cycle cost estimation: Cycles = ALU_Ops + 4 * Texture_Fetches + lambda * Branch_Divergence
 *   - Canonical structural shader hashing (SHA-256) for deduplication
 */

'use strict';

const crypto = require('node:crypto');

// Standard reactive source patterns in creative web development
const SOURCE_PATTERNS = [
  { id: 'scrollY', regex: /\b(window\.)?(scrollY|pageYOffset)\b/ },
  { id: 'scrollProgress', regex: /\b(scroll|progress|p|sheetP)\b/i },
  { id: 'wheelDelta', regex: /\b(deltaY|wheelDelta|wheel)\b/i },
  { id: 'pointer', regex: /\b(pointer|mouse|clientX|clientY|e\.pageX|e\.pageY)\b/i },
  { id: 'time', regex: /\b(performance\.now\(\)|Date\.now\(\)|clock\.getElapsedTime\(\)|time|u_time)\b/i },
  { id: 'viewport', regex: /\b(window\.)?(innerWidth|innerHeight|clientWidth|clientHeight)\b/ }
];

/**
 * Phase I & II: Two-Phase Backward Program Slicing
 * Analyzes JavaScript source code and slices the minimal dependency chain
 * that computes WebGL uniform values.
 * 
 * @param {string} jsSource JavaScript code containing animation / render loop
 * @param {object} [options={}]
 * @returns {object} Sliced result with uniforms, sources, dependency tree, and micro-runtime
 */
function sliceProgram(jsSource, options = {}) {
  if (typeof jsSource !== 'string') {
    throw new TypeError('Source must be a string');
  }

  // Normalize source lines
  const lines = jsSource.split('\n');
  const sinks = [];

  // Phase I: Identify WebGL Sinks
  // Sinks: gl.uniform*(loc, val) or uniforms.<name>.value = expr or material.uniforms.<name>.value = expr
  const threeUniformRegex = /(?:(\w+)\.)?uniforms(?:\[['"](\w+)['"]\]|\.(\w+))\.value\s*=\s*([^;]+);/g;
  const glUniformRegex = /gl\.uniform(\w+)\s*\(\s*([^,]+),\s*([\s\S]+?)\s*\);/g;

  let match;
  while ((match = threeUniformRegex.exec(jsSource)) !== null) {
    const uniformName = match[2] || match[3];
    const expr = match[4].trim();
    sinks.push({
      type: 'threejs',
      uniformName,
      expression: expr,
      fullMatch: match[0],
      index: match.index
    });
  }

  while ((match = glUniformRegex.exec(jsSource)) !== null) {
    const glType = match[1];
    const loc = match[2].trim();
    const expr = match[3].trim();
    // Guess uniform name from loc e.g. uSheetPLocation -> u_sheetP
    let uniformName = loc.replace(/Location$/i, '');
    if (!uniformName.startsWith('u_')) {
      uniformName = 'u_' + uniformName;
    }
    sinks.push({
      type: 'webgl',
      glType,
      uniformName,
      location: loc,
      expression: expr,
      fullMatch: match[0],
      index: match.index
    });
  }

  // Phase II: Backward Traversal to Sources
  const slicedUniforms = {};
  const activeSources = new Set();
  const statementDeps = [];

  // Parse assignment statements: const/let/var x = expr; or x = expr;
  const assignments = [];
  const assignRegex = /(?:(?:const|let|var)\s+)?([a-zA-Z0-9_$]+)\s*=\s*([^;]+);/g;
  while ((match = assignRegex.exec(jsSource)) !== null) {
    assignments.push({
      variable: match[1],
      expr: match[2].trim(),
      fullLine: match[0]
    });
  }

  for (const sink of sinks) {
    const neededVars = new Set();
    const tokenRegex = /[a-zA-Z_$][a-zA-Z0-9_$]*/g;
    let t;
    while ((t = tokenRegex.exec(sink.expression)) !== null) {
      neededVars.add(t[0]);
    }

    const collectedStatements = [];
    const detectedSources = new Set();

    // Check direct sources in expression
    for (const src of SOURCE_PATTERNS) {
      if (src.regex.test(sink.expression)) {
        detectedSources.add(src.id);
        activeSources.add(src.id);
      }
    }

    // Traverse assignments backwards
    for (let i = assignments.length - 1; i >= 0; i--) {
      const a = assignments[i];
      if (neededVars.has(a.variable)) {
        collectedStatements.unshift(a.fullLine);
        // Add variables used in this assignment
        let varToken;
        while ((varToken = tokenRegex.exec(a.expr)) !== null) {
          neededVars.add(varToken[0]);
        }
        for (const src of SOURCE_PATTERNS) {
          if (src.regex.test(a.expr)) {
            detectedSources.add(src.id);
            activeSources.add(src.id);
          }
        }
      }
    }

    slicedUniforms[sink.uniformName] = {
      uniformName: sink.uniformName,
      expression: sink.expression,
      sources: Array.from(detectedSources),
      dependencies: Array.from(neededVars),
      statements: collectedStatements
    };
  }

  // Build minimal micro-runtime (<15KB)
  const runtimeCode = generateMicroRuntime(slicedUniforms, Array.from(activeSources));
  const estimatedSizeKB = Number((Buffer.byteLength(runtimeCode, 'utf8') / 1024).toFixed(2));

  return {
    sinkCount: sinks.length,
    uniforms: slicedUniforms,
    detectedSources: Array.from(activeSources),
    microRuntimeCode: runtimeCode,
    estimatedSizeKB,
    isCompliantSize: estimatedSizeKB < 15.0
  };
}

/**
 * Generates an ultra-lightweight (<15KB) JavaScript micro-runtime
 * that executes the sliced uniform logic with zero framework overhead.
 */
function generateMicroRuntime(uniforms, sources) {
  const uniformKeys = Object.keys(uniforms);
  const codeLines = [
    '/**',
    ' * Studio DNA Sliced WebGL Micro-Runtime',
    ' * Auto-generated by Two-Phase Backward Program Slicer',
    ' */',
    '(function(global) {',
    '  class UniformBridge {',
    '    constructor(targetUniforms) {',
    '      this.target = targetUniforms || {};',
    '      this.state = { scrollY: 0, time: 0, pointerX: 0, pointerY: 0, progress: 0 };',
    '    }',
    '',
    '    update(inputs) {',
    '      Object.assign(this.state, inputs);',
    '      const { scrollY, time, pointerX, pointerY, progress } = this.state;'
  ];

  for (const uName of uniformKeys) {
    const item = uniforms[uName];
    codeLines.push(`      // Compute: ${uName}`);
    for (const stmt of item.statements) {
      codeLines.push(`      ${stmt}`);
    }
    codeLines.push(`      if (this.target.${uName}) {`);
    codeLines.push(`        if (this.target.${uName}.value !== undefined) {`);
    codeLines.push(`          this.target.${uName}.value = ${item.expression};`);
    codeLines.push(`        } else {`);
    codeLines.push(`          this.target.${uName} = ${item.expression};`);
    codeLines.push(`        }`);
    codeLines.push(`      }`);
  }

  codeLines.push(
    '    }',
    '  }',
    '',
    '  if (typeof module !== "undefined" && module.exports) {',
    '    module.exports = { UniformBridge };',
    '  } else {',
    '    global.UniformBridge = UniformBridge;',
    '  }',
    '})(typeof window !== "undefined" ? window : globalThis);'
  );

  return codeLines.join('\n');
}

/**
 * std140 and std430 alignment rules for GLSL types
 */
const TYPE_ALIGNMENT = {
  bool: { size: 4, align140: 4, align430: 4 },
  int: { size: 4, align140: 4, align430: 4 },
  uint: { size: 4, align140: 4, align430: 4 },
  float: { size: 4, align140: 4, align430: 4 },
  vec2: { size: 8, align140: 8, align430: 8 },
  vec3: { size: 12, align140: 16, align430: 16 }, // vec3 padded to 16 bytes!
  vec4: { size: 16, align140: 16, align430: 16 },
  mat2: { size: 32, align140: 16, align430: 8 },
  mat3: { size: 48, align140: 16, align430: 16 },
  mat4: { size: 64, align140: 16, align430: 16 }
};

/**
 * Computes memory layout and padding offsets under std140 or std430 rules.
 * 
 * @param {Array<{ name: string, type: string, arraySize?: number }>} members
 * @param {'std140'|'std430'} [standard='std140']
 * @returns {object} Layout summary with offsets, padding, and total buffer size
 */
function computeUniformBlockLayout(members, standard = 'std140') {
  let currentOffset = 0;
  let totalPadding = 0;
  const layout = [];

  for (const m of members) {
    const info = TYPE_ALIGNMENT[m.type] || { size: 16, align140: 16, align430: 16 };
    const baseAlign = standard === 'std430' ? info.align430 : info.align140;

    // In std140, array elements are aligned to 16-byte boundaries
    const arrayCount = m.arraySize || 1;
    const elemAlign = arrayCount > 1 && standard === 'std140' ? Math.max(16, baseAlign) : baseAlign;

    // Pad offset to multiple of elemAlign
    const remainder = currentOffset % elemAlign;
    const padding = remainder === 0 ? 0 : elemAlign - remainder;
    currentOffset += padding;
    totalPadding += padding;

    const startOffset = currentOffset;
    const memberSize = (arrayCount > 1 && standard === 'std140' ? 16 : info.size) * arrayCount;
    currentOffset += memberSize;

    layout.push({
      name: m.name,
      type: m.type,
      offset: startOffset,
      size: memberSize,
      padding
    });
  }

  // Uniform block size is rounded up to multiple of 16 bytes
  const finalRemainder = currentOffset % 16;
  const finalPadding = finalRemainder === 0 ? 0 : 16 - finalRemainder;
  currentOffset += finalPadding;
  totalPadding += finalPadding;

  return {
    standard,
    totalSizeBytes: currentOffset,
    totalPaddingBytes: totalPadding,
    members: layout
  };
}

/**
 * Audits GLSL shader source code for:
 * 1. ALU operations count
 * 2. Texture fetches
 * 3. Branch divergence
 * 4. Cycle cost estimation: Cycles = ALU_Ops + 4 * Texture_Fetches + lambda * Branch_Divergence
 * 5. Structural canonical hash
 * 
 * @param {string} glslSource
 * @param {object} [options={}]
 * @param {number} [options.lambda=4.0] Penalty weight for branch divergence
 * @returns {object} Shader audit report
 */
function auditGlslShader(glslSource, options = {}) {
  if (typeof glslSource !== 'string') {
    throw new TypeError('GLSL source must be a string');
  }

  const lambda = options.lambda !== undefined ? options.lambda : 4.0;

  // Strip comments for analysis
  const cleaned = glslSource
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '');

  // 1. Count ALU operations
  const mathFunctions = [
    'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'pow', 'exp', 'log', 'sqrt', 'inversesqrt',
    'abs', 'sign', 'floor', 'ceil', 'fract', 'mod', 'min', 'max', 'clamp', 'mix', 'step',
    'smoothstep', 'length', 'distance', 'dot', 'cross', 'normalize'
  ];

  let aluOps = 0;
  for (const fn of mathFunctions) {
    const re = new RegExp(`\\b${fn}\\s*\\(`, 'g');
    const matches = cleaned.match(re);
    if (matches) aluOps += matches.length;
  }

  // Count arithmetic operators (+, -, *, /)
  const opMatches = cleaned.match(/[+\-*/](?!=)/g);
  if (opMatches) {
    aluOps += opMatches.length;
  }

  // 2. Count Texture Fetches
  const texFunctions = ['texture2D', 'texture', 'textureLod', 'textureGrad', 'texelFetch', 'textureCube'];
  let textureFetches = 0;
  for (const fn of texFunctions) {
    const re = new RegExp(`\\b${fn}\\s*\\(`, 'g');
    const matches = cleaned.match(re);
    if (matches) textureFetches += matches.length;
  }

  // 3. Count Branch Divergence (conditionals and loops)
  const branchKeywords = ['if\\s*\\(', 'else\\s+if', 'switch\\s*\\(', 'for\\s*\\(', 'while\\s*\\('];
  let branchDivergence = 0;
  for (const kw of branchKeywords) {
    const re = new RegExp(`\\b${kw}`, 'g');
    const matches = cleaned.match(re);
    if (matches) branchDivergence += matches.length;
  }

  // Cost function
  const estimatedCycles = Math.round(aluOps + 4.0 * textureFetches + lambda * branchDivergence);

  // Performance classification
  let performanceTier = 'EXCELLENT';
  if (estimatedCycles > 150) performanceTier = 'HEAVY';
  else if (estimatedCycles > 60) performanceTier = 'MODERATE';

  // Compute canonical structural hash
  const structuralHash = computeShaderHash(glslSource);

  return {
    aluOps,
    textureFetches,
    branchDivergence,
    estimatedCycles,
    performanceTier,
    structuralHash,
    is120FpsCapable: estimatedCycles <= 80
  };
}

/**
 * Computes canonical structural SHA-256 hash of a shader
 * (normalizing whitespace, comments, and empty lines).
 * 
 * @param {string} glslSource
 * @returns {string} SHA-256 hex digest
 */
function computeShaderHash(glslSource) {
  const normalized = glslSource
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

module.exports = {
  sliceProgram,
  generateMicroRuntime,
  computeUniformBlockLayout,
  auditGlslShader,
  computeShaderHash,
  TYPE_ALIGNMENT
};
