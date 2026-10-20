#version 300 es

#define attribute in
#define varying out
#define texture2D texture
precision highp float;
	precision highp int;
	precision highp sampler2D;
	precision highp samplerCube;
	precision highp sampler3D;
	precision highp sampler2DArray;
	precision highp sampler2DShadow;
	precision highp samplerCubeShadow;
	precision highp sampler2DArrayShadow;
	precision highp isampler2D;
	precision highp isampler3D;
	precision highp isamplerCube;
	precision highp isampler2DArray;
	precision highp usampler2D;
	precision highp usampler3D;
	precision highp usamplerCube;
	precision highp usampler2DArray;
	
#define HIGH_PRECISION
#define SHADER_TYPE ShaderMaterial
#define SHADER_NAME 
#define HAS_NORMAL
#define DOUBLE_SIDED
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;
#ifdef USE_INSTANCING
	attribute mat4 instanceMatrix;
#endif
#ifdef USE_INSTANCING_COLOR
	attribute vec3 instanceColor;
#endif
#ifdef USE_INSTANCING_MORPH
	uniform sampler2D morphTexture;
#endif
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
#ifdef USE_UV1
	attribute vec2 uv1;
#endif
#ifdef USE_UV2
	attribute vec2 uv2;
#endif
#ifdef USE_UV3
	attribute vec2 uv3;
#endif
#ifdef USE_TANGENT
	attribute vec4 tangent;
#endif
#if defined( USE_COLOR_ALPHA )
	attribute vec4 color;
#elif defined( USE_COLOR )
	attribute vec3 color;
#endif
#ifdef USE_SKINNING
	attribute vec4 skinIndex;
	attribute vec4 skinWeight;
#endif

uniform float u_leanK; // how much of the door this surface takes, 0..1
uniform float u_run;   // how far it recedes past the strip, world units

varying vec2 vUv;
varying vec3 vWorld;

// 0 exactly where the cards stand, 1 at the far edge — and NEGATIVE in front
// of them, because the floor carries on toward the camera and off the bottom
// of the frame. Taken from world z rather than from uv.y for that reason: uv
// runs 0..1 over whatever the mesh spans, so it would put 0 at the front edge,
// and 0 has to mean the contact line or the shading has nothing to hang on.
varying float vFar;


uniform float u_leanA; // signed depth at the frustum edge, world units (0 = flat)
uniform float u_leanW; // frustum half-width at z=0

// The door's ramp — and it is a SMOOTH one, not the hard clamp it used to
// be, for a reason the specular found: clamp(s, -1, 1) has a corner at ±1,
// which is a STEP in dz/dx, and under the sheet light's gloss a step in the
// normal is a sharp vertical seam. The frustum edge is a WORLD-x line, and
// the far half of a wide card can pass it while perspective keeps it well on
// screen — so the seam landed mid-card, reading as the shading being clipped.
//
// 1.5s - 0.5s³ over the clamped s: the same ±1 at the ends, slope 0 there
// (the flat beyond the edge is joined, not hit), 1.5× the old slope at the
// centre — the door tilts a touch harder mid-frame, which is where a tilt is
// read anyway. One polynomial, and the normal takes its exact derivative
// (leanSlope), so the lit surface and the drawn one cannot disagree.
float leanRamp(float s) {
	s = clamp(s, -1.0, 1.0);
	return s * (1.5 - 0.5 * s * s);
}

// Its exact d/ds: 1.5(1 - s²) inside the edges, 0 beyond — continuous where
// the clamp's derivative jumped. See sheetNormal.
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


// A real plane in a real perspective camera — the first geometry on this site
// that is not parallel to the screen. Everything else is a DOM rect pushed to
// z=0 and drawn flat; the recession here IS the effect, so it has to be the
// projection doing it rather than a gradient pretending.
void main() {
	vUv = uv;

	vec4 w = modelMatrix * vec4(position, 1.0);

	// Before the lean, which moves z. The door decides where the surface IS;
	// how far along the floor a fragment sits is a fact about the layout, and
	// letting the hinge modulate it would make the fade and the contact band
	// swing with the strip.
	vFar = -w.z / max(u_run, 0.0001);

	// The door, shared with the strip. This is the whole of "tilted the same":
	// LEAN is a function of WORLD X, so the floor and the cards evaluate the
	// identical ramp and hinge as one object. Rotating the floor mesh to
	// match would only ever agree at one x — the two surfaces would visibly
	// disagree about where the hinge is, which is worse than no floor.
	//
	// No BULGE. That one is a function of world Y, and a near-horizontal plane
	// has almost none of it to vary — every vertex would take the same offset
	// and the whole floor would slide toward the camera as the strip bowed,
	// which is not a bow, it is a floor coming loose. The near edge tracks the
	// cards because it is POSITIONED from their rect every frame (see
	// syncFloor), which is the honest version of the same idea.
	w = lean(w, u_leanK);

	// AFTER the lean — the reflection projects this point through the
	// mirrored camera, and it has to be the point actually being drawn.
	vWorld = w.xyz;

	gl_Position = projectionMatrix * viewMatrix * w;
}