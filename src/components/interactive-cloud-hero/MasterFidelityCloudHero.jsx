'use client';

import React, { useEffect, useRef } from 'react';

const VERTEX_SHADER = `#version 300 es
precision highp float;
in vec4 position;
void main() { gl_Position = position; }
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 FragColor;

uniform vec2 resolution;
uniform float time;
uniform vec2 touch;
uniform vec2 move;

#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x, R.y)

// Pseudo-random white noise
float rnd(vec2 p) {
  p = fract(p * vec2(12.9898, 78.233));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

// 2D Value Noise with Hermite Interpolation
float noise(in vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = rnd(i),
        b = rnd(i + vec2(1.0, 0.0)),
        c = rnd(i + vec2(0.0, 1.0)),
        d = rnd(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Multi-octave Fractal Brownian Motion
float fbm(vec2 p) {
  float t = 0.0, a = 1.0;
  mat2 m = mat2(1.0, -0.5, 0.2, 1.2);
  for (int i = 0; i < 5; i++) {
    t += a * noise(p);
    p *= 2.0 * m;
    a *= 0.5;
  }
  return t;
}

// Volumetric cloud density with multi-octave swirls
float clouds(vec2 p) {
  float d = 1.0, t = 0.0;
  for (float i = 0.0; i < 3.0; i++) {
    float a = d * fbm(i * 10.0 + p.x * 0.22 + 0.2 * (1.0 + i) * p.y + d + i * i + p + vec2(T * 0.025, -T * 0.012));
    t = mix(t, d, a);
    d = a;
    p *= 2.0 / (i + 1.0);
  }
  return t;
}

// Independent puffy cloud cluster with smooth ellipsoidal envelope and normal vector
float cloudCluster(vec2 p, vec2 center, vec2 radii, out vec2 normal) {
  vec2 dxy = p - center;
  float dNorm = length(dxy / radii);
  float env = smoothstep(1.0, 0.2, dNorm);
  if (env <= 0.001) {
    normal = vec2(0.0);
    return 0.0;
  }
  float c = clouds(dxy * 1.6) * env;
  normal = -normalize((dxy / radii) + 0.001);
  return c;
}

void main(void) {
  vec2 uv = (FC - 0.5 * R) / MN;

  // Mouse Parallax
  vec2 mouseNorm = (touch / R - 0.5) * 0.12;
  vec2 uv_parallax = uv - mouseNorm;

  float zoom = 1.0 - 0.3 * (sin(T * 0.2) * 0.5 + 0.5);

  // =========================================================================
  // PASS 1: Trajectory of 11 Supersonic Plasma Projectiles & Bow Shock Wake
  // =========================================================================
  vec2 uv_proj = uv * zoom;
  vec2 wakeDisplacement = vec2(0.0);

  vec2 pCoords[11];
  float pDists[11];

  for (float i = 1.0; i < 12.0; i++) {
    int idx = int(i - 1.0);
    uv_proj += 0.1 * cos(i * vec2(0.1 + 0.01 * i, 0.8) + i * i + T * 0.5 + 0.1 * uv_proj.x);
    vec2 p = uv_proj;
    float d = length(p);

    pCoords[idx] = p;
    pDists[idx] = d;

    // Smooth aerodynamic displacement field (no step discontinuities)
    float wakeDist = length(vec2(p.x * 0.7, p.y * 2.2));
    float wakeFactor = exp(-wakeDist * 4.8);
    vec2 bowShock = (p / (d + 0.035)) * 0.028 * wakeFactor;
    vec2 wakePush = vec2(-0.025, 0.0) * wakeFactor;
    vec2 microVortex = vec2(-p.y, p.x * 0.35) * 0.02 * exp(-d * 5.5);
    wakeDisplacement += (bowShock + wakePush + microVortex);
  }

  // =========================================================================
  // PASS 2: Independent Drei-Style Cloud Clusters with Wake Interaction
  // =========================================================================
  vec2 pCloud = uv_parallax + wakeDisplacement;

  vec2 n1, n2, n3, n4, n5;
  // 1. Main cumulus bank traversed directly by supersonic projectiles
  float c1 = cloudCluster(pCloud, vec2(0.35, 0.02), vec2(0.85, 0.65), n1);
  // 2. Floating puffy cumulus upper center-left
  float c2 = cloudCluster(pCloud, vec2(-0.25, 0.45), vec2(0.65, 0.38), n2);
  // 3. Exit cumulus bank on left
  float c3 = cloudCluster(pCloud, vec2(-0.65, -0.25), vec2(0.55, 0.42), n3);
  // 4. Lower-right cumulus bank
  float c4 = cloudCluster(pCloud, vec2(0.65, -0.42), vec2(0.55, 0.35), n4);
  // 5. Upper-right background cumulus
  float c5 = cloudCluster(pCloud, vec2(0.55, 0.55), vec2(0.55, 0.35), n5);

  float cloudDensity = c1 + c2 + c3 + c4 + c5;
  vec2 cloudNormal = normalize(n1 * c1 + n2 * c2 + n3 * c3 + n4 * c4 + n5 * c5 + vec2(0.0001));

  // Realistic vertical shading (ambient light from above, self-shadow below)
  float verticalShading = mix(0.5, 1.3, clamp(uv.y + 0.45, 0.0, 1.0));

  // Base warm amber / mahogany cloud body
  vec3 cloudAmbient = vec3(cloudDensity * 0.22, cloudDensity * 0.12, cloudDensity * 0.04) * verticalShading;

  // =========================================================================
  // PASS 3: Calibrated Direct Light Incidence and Subsurface Scatter
  // =========================================================================
  vec3 cloudIncidence = vec3(0.0);

  for (float i = 1.0; i < 12.0; i++) {
    int idx = int(i - 1.0);
    vec2 p = pCoords[idx];
    float d = pDists[idx];
    vec3 pCol = cos(sin(i) * vec3(1.0, 2.0, 3.0)) + 1.0;

    // Incident light direction vector from projectile to cloud
    vec2 L = -normalize(p + vec2(0.0001));

    // Diffuse surface incidence (Lambertian N . L)
    float NdotL = max(0.0, dot(cloudNormal, L));
    float directIncidence = NdotL * (0.004 / (d + 0.07)) * cloudDensity;

    // Subsurface volumetric scatter inside the vapor
    float internalGlow = (0.0022 / (d * d + 0.055)) * cloudDensity;

    // Soft rim-light along cloud boundary when projectile is behind/inside edge
    float rim = (0.003 / (d + 0.06)) * smoothstep(0.45, 0.05, abs(cloudDensity - 0.35));

    cloudIncidence += pCol * (directIncidence + internalGlow + rim);
  }

  vec3 finalCloud = cloudAmbient + cloudIncidence;

  // =========================================================================
  // PASS 4: Projectiles with Anamorphic Flares and Cloud Transmission
  // =========================================================================
  uv_proj = uv * zoom;
  vec3 projectileEmission = vec3(0.0);

  for (float i = 1.0; i < 12.0; i++) {
    uv_proj += 0.1 * cos(i * vec2(0.1 + 0.01 * i, 0.8) + i * i + T * 0.5 + 0.1 * uv_proj.x);
    vec2 p = uv_proj;
    float d = length(p);
    vec3 pCol = cos(sin(i) * vec3(1.0, 2.0, 3.0)) + 1.0;

    // Fog transmission (projectiles penetrate through the clouds)
    float transmission = mix(1.0, 0.65, clamp(cloudDensity * 1.2, 0.0, 1.0));
    float core = 0.00125 / (d + 0.0005);

    // Original horizontal anamorphic flare equation
    float b = noise(i + p + d);
    float flare = 0.0024 * b / length(max(p, vec2(b * p.x * 0.02, p.y)));

    projectileEmission += (core * transmission + flare) * pCol;
  }

  // =========================================================================
  // PASS 5: Filmic / Reinhard Tone Mapping for Contrast Preservation
  // =========================================================================
  vec3 rawColor = finalCloud + projectileEmission;
  vec3 mappedColor = rawColor / (vec3(1.0) + rawColor * 0.62);

  FragColor = vec4(mappedColor, 1.0);
}
`;

export function MasterFidelityCloudHero({
  trustBadge = { text: "Trusted by forward-thinking teams.", icons: ["✨"] },
  headline = { line1: "Launch Your", line2: "Workflow Into Orbit" },
  subtitle = "Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless, and limitless.",
  buttons = {
    primary: { text: "Get Started for Free" },
    secondary: { text: "Explore Features" },
  },
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { antialias: true, alpha: false });
    if (!gl) return;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, 'resolution');
    const timeLoc = gl.getUniformLocation(program, 'time');
    const touchLoc = gl.getUniformLocation(program, 'touch');
    const moveLoc = gl.getUniformLocation(program, 'move');

    let mouseCoords = [window.innerWidth * 0.5, window.innerHeight * 0.5];
    let mouseMove = [0, 0];

    const onPointerMove = (e) => {
      mouseMove = [e.movementX, e.movementY];
      mouseCoords = [e.clientX, window.innerHeight - e.clientY];
    };
    window.addEventListener('pointermove', onPointerMove);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    let animId;
    function render(now) {
      gl.useProgram(program);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, now * 0.001);
      gl.uniform2f(touchLoc, mouseCoords[0], mouseCoords[1]);
      gl.uniform2f(moveLoc, mouseMove[0], mouseMove[1]);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      mouseMove[0] *= 0.9;
      mouseMove[1] *= 0.9;

      animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div className={`relative w-full min-h-screen overflow-hidden bg-black text-white select-none ${className}`}>
      <div id="canvas-container" className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full object-cover touch-none" style={{ background: '#000' }} />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 pointer-events-none">
        {trustBadge && (
          <div className="mb-8 pointer-events-auto">
            <div className="flex items-center gap-2 px-6 py-2.5 bg-orange-500/10 backdrop-blur-xl border border-orange-300/30 rounded-full shadow-lg shadow-orange-950/30">
              <span className="text-amber-300 text-base">{trustBadge.icons?.[0] || "✨"}</span>
              <span className="text-orange-100/90 text-sm font-medium tracking-wide">{trustBadge.text}</span>
            </div>
          </div>
        )}

        <div className="text-center space-y-4 max-w-5xl mx-auto">
          <div className="space-y-1">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight bg-gradient-to-r from-orange-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-sm">
              {headline.line1}
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 via-orange-400 to-rose-500 bg-clip-text text-transparent drop-shadow-md">
              {headline.line2}
            </h1>
          </div>

          <div className="max-w-2xl mx-auto pt-3">
            <p className="text-lg md:text-xl lg:text-2xl text-orange-100/80 font-light leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 pointer-events-auto">
            <button
              id="btn-primary"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-600 hover:to-amber-500 text-black font-semibold text-base rounded-full shadow-xl shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {buttons.primary.text}
            </button>
            <button
              id="btn-secondary"
              className="px-8 py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/30 hover:border-orange-300/50 text-orange-100 font-semibold text-base rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {buttons.secondary.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MasterFidelityCloudHero;
