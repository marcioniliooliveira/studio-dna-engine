import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend, ReactThreeFiber } from '@react-three/fiber';
import { BRAND_TOKENS } from './referenceData';

export const ribbonVertexShader = /* glsl */ `
uniform vec2 u_res;
uniform float u_bulgeA;
uniform float u_bulgeH;
uniform float u_leanA;
uniform float u_leanW;
uniform float u_sheetW;
uniform float u_sheetD;
uniform float u_sheetT;
uniform float u_sheetC;
uniform float u_sheetP;
uniform float u_sheetV;
uniform float u_hover;
uniform float u_dent;

varying vec2 vUv;
varying vec3 vFlat;

const float SHEET_PI = 3.141592653589793;
const float SHEET_BANK = -0.16;
const float SHEET_DIAG = 0.03;
const float SHEET_WAVE = 0.0;
const float SHEET_WAVE_F = 0.8;
const float SHEET_WAVE_PH = 0.35;
const float SHEET_REAR_Y = 0.1;
const float SHEET_REAR_Z = 0.2;
const float SHEET_VTWIST = 1.8;
const float SHEET_TAIL = 1.0;
const float SHEET_SHIFT = -0.2;

float leanRamp(float s) {
  s = clamp(s, -1.0, 1.0);
  return s * (1.5 - 0.5 * s * s);
}

float leanSlope(float s) {
  s = min(abs(s), 1.0);
  return 1.5 * (1.0 - s * s);
}

vec4 lean(vec4 w, float k) {
  if (u_leanW > 0.001 && k > 0.001) {
    w.z += u_leanA * leanRamp(w.x / u_leanW) * k;
  }
  return w;
}

float sheetQ(float wx) {
  return wx / max(u_sheetW, 0.0001) * u_sheetT + SHEET_SHIFT;
}

float sheetShape(float q) {
  return mix(1.0 - q * q, sin(SHEET_PI * q), u_sheetC) * exp(-SHEET_TAIL * q * q);
}

float sheetShapeSlope(float q) {
  float g = exp(-SHEET_TAIL * q * q);
  float bowl = -2.0 * q * (1.0 + SHEET_TAIL * (1.0 - q * q));
  float ess = SHEET_PI * cos(SHEET_PI * q) - 2.0 * SHEET_TAIL * q * sin(SHEET_PI * q);
  return mix(bowl, ess, u_sheetC) * g;
}

float sheetZ(float wx) {
  return -u_sheetD * sheetShape(sheetQ(wx));
}

float sheetRoll(float wx) {
  if (u_sheetW < 0.001) return 0.0;
  return SHEET_BANK * sheetShapeSlope(sheetQ(wx)) / SHEET_PI * u_sheetC * u_sheetP;
}

vec4 sheetWind(vec4 w) {
  float a = sheetRoll(w.x);
  if (u_sheetV > 0.001 && u_sheetW > 0.001 && u_sheetP > 0.001) {
    float qe = w.x / u_sheetW;
    a += SHEET_VTWIST * u_sheetV * smoothstep(0.3, 0.9, abs(qe)) * sign(qe) * u_sheetP;
  }
  if (abs(a) < 0.0001) return w;
  float s = sin(a);
  float c = cos(a);
  return vec4(w.x, w.y * c - w.z * s, w.y * s + w.z * c, w.w);
}

vec4 sheet(vec4 w) {
  w = sheetWind(w);
  w.z += sheetZ(w.x) * u_sheetP;
  if (u_sheetW > 0.001) {
    float qw = w.x / u_sheetW;
    w.y += SHEET_DIAG * w.x * u_sheetP;
    w.y += SHEET_WAVE * u_sheetW * sin(SHEET_PI * (qw * SHEET_WAVE_F + SHEET_WAVE_PH)) * u_sheetP;
    if (u_sheetV > 0.001) {
      float m = 1.0 - smoothstep(-1.0, 0.3, qw);
      w.y += SHEET_REAR_Y * u_sheetW * u_sheetV * m * u_sheetP;
      w.z += SHEET_REAR_Z * u_sheetW * u_sheetV * m * u_sheetP;
    }
  }
  return w;
}

float sheetDome(vec2 uv) {
  vec2 q = uv * 2.0 - 1.0;
  return (1.0 - q.x * q.x) * (1.0 - q.y * q.y);
}

void main() {
  vUv = uv;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vFlat = w.xyz;
  w = sheet(w);
  w = lean(w, u_sheetP);
  if (u_hover > 0.0001) {
    w.z -= u_hover * u_dent * u_res.y * sheetDome(uv);
  }
  gl_Position = projectionMatrix * viewMatrix * w;
}
`;

export const ribbonFragmentShader = /* glsl */ `
uniform sampler2D u_texture;
uniform vec2 u_size;
uniform vec2 u_res;
uniform float u_alpha;
uniform float u_shade;
uniform float u_shadeS;
uniform float u_corner;
uniform float u_white;
uniform vec3 u_wash;
uniform float u_scrim;
uniform float u_leanA;
uniform float u_leanW;
uniform float u_sheetW;
uniform float u_sheetD;
uniform float u_sheetT;
uniform float u_sheetC;
uniform float u_sheetP;
uniform float u_hover;
uniform float u_dent;

varying vec2 vUv;
varying vec3 vFlat;

const float SHEET_PI = 3.141592653589793;
const float SHEET_BANK = -0.16;
const float SHEET_TAIL = 1.0;
const float SHEET_SHIFT = -0.2;
const vec3 LIGHT_DIR = vec3(-0.3543, 0.4429, 0.8858);
const float LIGHT_GLOSS = 48.0;
const float LIGHT_SPEC = 0.35;
const float LIGHT_DIFF = 0.12;

float leanRamp(float s) {
  s = clamp(s, -1.0, 1.0);
  return s * (1.5 - 0.5 * s * s);
}

float leanSlope(float s) {
  s = min(abs(s), 1.0);
  return 1.5 * (1.0 - s * s);
}

float sheetQ(float wx) {
  return wx / max(u_sheetW, 0.0001) * u_sheetT + SHEET_SHIFT;
}

float sheetShape(float q) {
  return mix(1.0 - q * q, sin(SHEET_PI * q), u_sheetC) * exp(-SHEET_TAIL * q * q);
}

float sheetShapeSlope(float q) {
  float g = exp(-SHEET_TAIL * q * q);
  float bowl = -2.0 * q * (1.0 + SHEET_TAIL * (1.0 - q * q));
  float ess = SHEET_PI * cos(SHEET_PI * q) - 2.0 * SHEET_TAIL * q * sin(SHEET_PI * q);
  return mix(bowl, ess, u_sheetC) * g;
}

float sheetZ(float wx) {
  return -u_sheetD * sheetShape(sheetQ(wx));
}

float sheetRoll(float wx) {
  if (u_sheetW < 0.001) return 0.0;
  return SHEET_BANK * sheetShapeSlope(sheetQ(wx)) / SHEET_PI * u_sheetC * u_sheetP;
}

float sheetDome(vec2 uv) {
  vec2 q = uv * 2.0 - 1.0;
  return (1.0 - q.x * q.x) * (1.0 - q.y * q.y);
}

float sheetShade(float wx, vec2 uv, float resY) {
  if (u_sheetD < 0.001) return 0.0;
  float d = u_sheetW > 0.001 && u_sheetP > 0.001
    ? clamp((u_sheetD - sheetZ(wx)) / (2.0 * u_sheetD), 0.0, 1.0) * u_sheetP
    : 0.0;
  if (u_hover > 0.0001) {
    d += (u_hover * u_dent * resY * sheetDome(uv)) / (2.0 * u_sheetD);
  }
  return clamp(d, 0.0, 1.0);
}

float sheetOffset(float wx, vec2 uv, float resY) {
  float z = 0.0;
  if (u_sheetW > 0.001 && u_sheetP > 0.001 && u_sheetD > 0.001) z += sheetZ(wx) * u_sheetP;
  if (u_leanW > 0.001) z += u_leanA * leanRamp(wx / u_leanW) * u_sheetP;
  if (u_hover > 0.0001) z -= u_hover * u_dent * resY * sheetDome(uv);
  return z;
}

vec3 sheetNormal(float wx, vec2 uv, vec2 res) {
  float dzdx = 0.0;
  float dzdy = 0.0;
  if (u_sheetW > 0.001 && u_sheetP > 0.001 && u_sheetD > 0.001) {
    dzdx += -u_sheetD * sheetShapeSlope(sheetQ(wx)) * u_sheetT / u_sheetW * u_sheetP;
  }
  if (u_leanW > 0.001) {
    dzdx += (u_leanA / u_leanW) * leanSlope(wx / u_leanW) * u_sheetP;
  }
  if (u_hover > 0.0001) {
    vec2 q = uv * 2.0 - 1.0;
    float a = u_hover * u_dent;
    dzdx += 4.0 * a * res.y * q.x * (1.0 - q.y * q.y) / max(res.x, 0.0001);
    dzdy += 4.0 * a * q.y * (1.0 - q.x * q.x);
  }
  vec3 n = normalize(vec3(-dzdx, -dzdy, 1.0));
  float a = sheetRoll(wx);
  if (abs(a) > 0.0001) {
    float s = sin(a);
    float c = cos(a);
    n = vec3(n.x, n.y * c - n.z * s, n.y * s + n.z * c);
  }
  return n;
}

vec3 sheetLit(vec3 col, vec3 n, vec3 v, float amt) {
  if (amt < 0.001) return col;
  float d = dot(n, LIGHT_DIR) * 0.5 + 0.5;
  col *= 1.0 - LIGHT_DIFF * amt * (1.0 - d);
  vec3 h = normalize(LIGHT_DIR + v);
  return col + pow(max(dot(n, h), 0.0), LIGHT_GLOSS) * LIGHT_SPEC * amt;
}

vec2 uvCover(vec2 planeSize, vec2 imageSize, vec2 uv) {
  float planeRatio = planeSize.x / planeSize.y;
  float imageRatio = imageSize.x / imageSize.y;
  vec2 newSize = planeRatio < imageRatio
    ? vec2(imageSize.x * (planeSize.y / imageSize.y), planeSize.y)
    : vec2(planeSize.x, imageSize.y * (planeSize.x / imageSize.x));
  vec2 newOffset = (planeRatio < imageRatio
    ? vec2((newSize.x - planeSize.x) / 2.0, 0.0)
    : vec2(0.0, (newSize.y - planeSize.y) / 2.0)) / newSize;
  return uv * planeSize / newSize + newOffset;
}

float roundedBox(vec2 p, vec2 mid, float r) {
  vec2 q = abs(p - mid) - (mid - r);
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec4 tex = texture2D(u_texture, uvCover(u_res, u_size, vUv));
  if (u_shade > 0.001) {
    float depth = sheetShade(vFlat.x, vUv, u_res.y);
    tex.rgb = mix(tex.rgb, vec3(0.059), u_shade * 0.8 * pow(depth, u_shadeS));
    vec3 p = vFlat + vec3(0.0, 0.0, sheetOffset(vFlat.x, vUv, u_res.y));
    tex.rgb = sheetLit(
      tex.rgb,
      sheetNormal(vFlat.x, vUv, u_res),
      normalize(cameraPosition - p),
      u_shade
    );
  }
  if (u_scrim > 0.001) {
    float g = 1.0 - smoothstep(0.0, 0.5, vUv.y);
    tex.rgb = mix(tex.rgb, vec3(0.0), u_scrim * 0.65 * g * g);
  }
  tex.rgb = mix(tex.rgb, u_wash, u_white);
  float alpha = u_alpha;
  if (u_corner > 0.0001) {
    vec2 sz = vec2(u_res.x / max(u_res.y, 0.0001), 1.0);
    vec2 mid = sz * 0.5;
    float r = min(u_corner, min(mid.x, mid.y));
    float d = roundedBox(vUv * sz, mid, r);
    float aa = max(fwidth(d), 0.0001);
    alpha *= 1.0 - smoothstep(-aa, aa, d);
  }
  gl_FragColor = vec4(tex.rgb, alpha);
}
`;

export const RibbonCardMaterial = shaderMaterial(
  {
    u_texture: new THREE.Texture(),
    u_res: new THREE.Vector2(16.0, 10.0),
    u_size: new THREE.Vector2(1440.0, 810.0),
    u_alpha: 1.0,
    u_shade: 1.0,
    u_shadeS: 1.0,
    u_corner: 0.04,
    u_white: 0.0,
    u_wash: new THREE.Color(...BRAND_TOKENS.washRgb),
    u_scrim: 0.85,
    u_leanA: 2.2,
    u_leanW: 22.0,
    u_sheetW: 22.0,
    u_sheetD: 3.2,
    u_sheetT: 0.9,
    u_sheetC: 1.0,
    u_sheetP: 1.0,
    u_sheetV: 0.0,
    u_hover: 0.0,
    u_dent: 0.12,
    u_bulgeA: 0.0,
    u_bulgeH: 0.0,
  },
  ribbonVertexShader,
  ribbonFragmentShader
);

extend({ RibbonCardMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ribbonCardMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial & Record<string, any>,
        typeof RibbonCardMaterial
      >;
    }
  }
}
