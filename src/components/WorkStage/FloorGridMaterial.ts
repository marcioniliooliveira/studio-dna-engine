import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend, ReactThreeFiber } from '@react-three/fiber';
import { BRAND_TOKENS } from './referenceData';

export const floorVertexShader = /* glsl */ `
uniform float u_leanK;
uniform float u_run;
uniform float u_leanA;
uniform float u_leanW;

varying vec2 vUv;
varying vec3 vWorld;
varying float vFar;

float leanRamp(float s) {
  s = clamp(s, -1.0, 1.0);
  return s * (1.5 - 0.5 * s * s);
}

vec4 lean(vec4 w, float k) {
  if (u_leanW > 0.001 && k > 0.001) {
    w.z += u_leanA * leanRamp(w.x / u_leanW) * k;
  }
  return w;
}

void main() {
  vUv = uv;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vFar = -w.z / max(u_run, 0.0001);
  w = lean(w, u_leanK);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

export const floorFragmentShader = /* glsl */ `
uniform vec3 u_c0;
uniform vec3 u_c1;
uniform float u_alpha;
uniform float u_grid;
uniform vec2 u_gridF;

varying vec2 vUv;
varying vec3 vWorld;
varying float vFar;

void main() {
  float fade = 1.0 - smoothstep(0.2, 0.95, vFar);
  float contact = exp(-abs(vFar) * 14.0);

  vec3 col = mix(u_c1, u_c0, smoothstep(0.0, 0.8, vFar));
  col *= 1.0 - contact * 0.55;

  vec2 g = vec2(vUv.x * u_gridF.x, vFar * u_gridF.y);
  vec2 gf = abs(fract(g) - 0.5);
  vec2 gw = fwidth(g) * 1.5;
  vec2 lines = vec2(1.0) - smoothstep(vec2(0.0), gw, gf);
  float line = max(lines.x, lines.y);

  col += line * u_grid * fade;

  gl_FragColor = vec4(col, u_alpha * fade);
}
`;

export const FloorGridMaterial = shaderMaterial(
  {
    u_c0: new THREE.Color(...BRAND_TOKENS.floorC0),
    u_c1: new THREE.Color(...BRAND_TOKENS.floorC1),
    u_alpha: 1.0,
    u_grid: 0.08,
    u_gridF: new THREE.Vector2(36.0, 18.0),
    u_leanK: 1.0,
    u_run: 45.0,
    u_leanA: 2.2,
    u_leanW: 22.0,
  },
  floorVertexShader,
  floorFragmentShader
);

extend({ FloorGridMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      floorGridMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial & Record<string, any>,
        typeof FloorGridMaterial
      >;
    }
  }
}
