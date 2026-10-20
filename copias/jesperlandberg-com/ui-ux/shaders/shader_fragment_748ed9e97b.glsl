#version 300 es
#define varying in


#define gl_FragDepthEXT gl_FragDepth
#define texture2D texture
#define textureCube texture
#define texture2DProj textureProj
#define texture2DLodEXT textureLod
#define texture2DProjLodEXT textureProjLod
#define textureCubeLodEXT textureLod
#define texture2DGradEXT textureGrad
#define texture2DProjGradEXT textureProjGrad
#define textureCubeGradEXT textureGrad
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
#define DOUBLE_SIDED
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 linearToOutputTexel( vec4 value ) {
	return LinearTransferOETF( vec4( value.rgb * mat3( 1.0000,-0.0000,-0.0000,-0.0000,1.0000,0.0000,0.0000,0.0000,1.0000 ), value.a ) );
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, rgb );
}


precision highp float;

uniform sampler2D u_curves;
uniform float u_alpha;
// The full index's counter-dim: what this row fades to WHERE THE PICTURE
// COVERS IT. Each fragment is ray-cast from the camera into the CARD'S OWN
// PLANE and tested against the identical collapsed rounded box the card's
// fragment shader draws, so the dim's boundary IS the picture's, at any tilt.
uniform float u_dim;
uniform mat4 u_maskM;     // world -> card local (unit plane)
uniform vec3 u_maskCam;   // frustum half-width, half-height at z=0, camera z
uniform vec3 u_maskShape; // card aspect (w/h), corner (height-norm), reveal
uniform vec2 u_maskRes;   // viewport in framebuffer px
uniform float u_mask;     // normalized wrap where the fade begins (1 = no fade)
uniform vec3 u_c0;        // colour the type currently reads as
uniform vec3 u_c1;        // colour it is travelling to
uniform float u_ink;      // 0 = c0, 1 = c1

// A box, in plane px, under which the ink is u_hiC instead. The hire page's
// selection is a white capsule that TRAVELS between options, and the label
// it is passing under has to turn black exactly where the white is — glyph by
// glyph, mid-letter — or the word flips as a block a frame early and the two
// read as separate objects. Same idea as the pill's own disc turning its label
// (see PILL_MASK), driven by a rectangle instead. Width 0 is off.
uniform vec4 u_hi;
uniform float u_hiR;
uniform vec3 u_hiC;

uniform float u_reel;     // 1 on the range readout — see the mask below
uniform float u_gamma;    // coverage exponent for DARK ink
uniform float u_gammaL;   // ...and for light — see the stem note below

// How far the channels come apart under the middle of a pill's lens, in screen
// px at full hover — falling to nothing at its rim, on the lens's own profile.
const float PILL_SPLIT = 3.0;

uniform vec3 u_lens;

// ── The frame's fade ──
//
// A page whose content scrolls under the chrome (see the frame in gl.client)
// dissolves it to black in a band inside each edge, so a heading passing the
// corner labels fades out under them rather than colliding. x is the bottom
// edge and y the top, framebuffer px, y up; z the band's depth; w the switch.
// The fade is here, in the material, because a DOM gradient over the canvas
// would take the chrome down with everything under it.
uniform vec4 u_frame;

float frameFade() {
	if (u_frame.w < 0.5) return 1.0;

	float b = max(u_frame.z, 1.0);
	float y = gl_FragCoord.y;

	return clamp(min((y - u_frame.x) / b, (u_frame.y - y) / b), 0.0, 1.0);
}

// Same rounded-box cut the detail stack takes, in framebuffer px.
uniform vec4 u_clip;
uniform float u_clipR;
uniform float u_clipOn;

in vec2 v_em;
flat in vec2 v_glyph;
flat in vec4 v_bbox;
varying float vWrap;
varying float vP;
varying float vYEl;
varying float vEdgeTop;
varying float vEdgeBot;
varying float vFade;
varying float vBlur;   // this glyph's travel last frame, em
varying vec2 vPx;      // resting position, plane px, top-down

out vec4 fragColor;


float roundedBox(vec2 p, vec2 mid, float r) {
	vec2 q = abs(p - mid) - (mid - r);
	return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}


uniform float u_clipBow;
uniform vec3 u_clipWarp;

float clipMask(vec4 box, float radius) {
	vec2 q = gl_FragCoord.xy - u_clipWarp.xy;
	float t = clamp(q.y / max(u_clipWarp.z, 1.0), -1.0, 1.0);
	vec2 p = q * (1.0 - u_clipBow * (1.0 - t * t)) + u_clipWarp.xy - box.xy;

	vec2 mid = box.zw * 0.5;
	float r = min(radius, min(mid.x, mid.y));

	return 1.0 - smoothstep(-1.0, 1.0, roundedBox(p, mid, r));
}


uniform vec3 u_pillDisc; // xy: centre, z: radius at full hover — framebuffer px
uniform float u_pillA;

float pillMask() {
	float d = length(gl_FragCoord.xy - u_pillDisc.xy)
		- mix(-0.04 * u_pillDisc.z, u_pillDisc.z, u_pillA);
	float aa = max(fwidth(d), 0.0001);

	return 1.0 - smoothstep(-aa, aa, d);
}


const int W = 1024;

/* taps in the motion smear — see the note at the call */
const int BLUR = 16;

vec4 fetch(int texel) {
	return texelFetch(u_curves, ivec2(texel % W, texel / W), 0);
}

// Antiderivative of clamp(u, 0, 1).
float F(float u) {
	return u < 0.0 ? 0.0 : (u < 1.0 ? 0.5 * u * u : u - 0.5);
}

/*
 * Signed coverage a segment contributes to the unit pixel centred on the
 * origin: the area to the LEFT of the segment inside the pixel, signed by the
 * segment's direction — which is what a +x ray's winding integrates to over
 * the pixel's height. Exact for a line.
 */
float segment(vec2 a, vec2 b) {
	float dy = b.y - a.y;
	if (abs(dy) < 1e-7) return 0.0;

	// clip to the pixel's row
	float t0 = (-0.5 - a.y) / dy;
	float t1 = (0.5 - a.y) / dy;
	float lo = clamp(min(t0, t1), 0.0, 1.0);
	float hi = clamp(max(t0, t1), 0.0, 1.0);
	if (hi <= lo) return 0.0;

	vec2 A = mix(a, b, lo);
	vec2 B = mix(a, b, hi);
	float d = B.y - A.y;

	// coverage left of x, as a fraction of the pixel
	float u0 = A.x + 0.5;
	float u1 = B.x + 0.5;

	if (abs(u1 - u0) < 1e-5) return clamp(u0, 0.0, 1.0) * d;
	return (F(u1) - F(u0)) / (u1 - u0) * d;
}

/*
 * Coverage along one ray from p, cast in +x. For the vertical ray the caller
 * hands in swapped coordinates, so the same solve runs in +y. Slug's, kept for
 * comparison against the exact-area path below.
 */
float ray(vec2 p, float ppx, int band, bool swap) {
	float cov = 0.0;

	vec4 h = fetch(band);
	int offset = int(h.x + 0.5);
	int count = int(h.y + 0.5);

	float cut = -0.5 / ppx;

	for (int i = 0; i < count; i++) {
		vec4 ix = fetch(offset + (i >> 2));
		int c = int(ix[i & 3] + 0.5);

		int t = c * 2;
		vec4 a = fetch(t);
		vec2 b = fetch(t + 1).xy;

		vec2 p0 = (swap ? a.yx : a.xy) - p;
		vec2 p1 = (swap ? a.wz : a.zw) - p;
		vec2 p2 = (swap ? b.yx : b) - p;

		if (max(p0.x, max(p1.x, p2.x)) < cut) break;

		// which roots are crossings, from the control points' sides
		uint code = (0x2E74u >> ((p0.y > 0.0 ? 2u : 0u) + (p1.y > 0.0 ? 4u : 0u) + (p2.y > 0.0 ? 8u : 0u))) & 3u;
		if (code == 0u) continue;

		vec2 ca = p0 - p1 * 2.0 + p2;
		vec2 cb = p0 - p1;

		float t1, t2;
		if (abs(ca.y) < 1e-5) {
			t1 = t2 = p0.y * 0.5 / cb.y;
		} else {
			float ra = 1.0 / ca.y;
			float d = sqrt(max(cb.y * cb.y - ca.y * p0.y, 0.0));
			t1 = (cb.y - d) * ra;
			t2 = (cb.y + d) * ra;
		}

		if ((code & 1u) != 0u) {
			float x = (ca.x * t1 - cb.x * 2.0) * t1 + p0.x;
			cov += clamp(x * ppx + 0.5, 0.0, 1.0);
		}
		if (code > 1u) {
			float x = (ca.x * t2 - cb.x * 2.0) * t2 + p0.x;
			cov -= clamp(x * ppx + 0.5, 0.0, 1.0);
		}
	}

	return cov;
}

/*
 * Exact-area coverage over the pixel's band, for up to three pixel centres at
 * once.
 *
 * THREE, because of the pill's dispersion. The canvas material answered the
 * lens's magnification by fetching the raster three times at small offsets, so
 * each channel came from its own place. There is no raster to fetch now — but
 * coverage is a FUNCTION, so the same idea is the same function evaluated at
 * three points, and evaluating them together costs one band walk and one
 * flatten instead of three. the offset is 0 for everything that is not a hovered
 * pill's label, which is all of them, nearly always.
 */
vec3 area3(vec2 p, vec2 px, int band, float off) {
	vec3 cov = vec3(0.0);

	vec4 h = fetch(band);
	int offset = int(h.x + 0.5);
	int count = int(h.y + 0.5);

	// a curve entirely left of the pixel contributes nothing — the list is
	// sorted on that. Widened by the split so a ghost cannot lose a curve the
	// centre still sees.
	float cut = -0.5 / px.x - abs(off);
	float half_y = 0.5 / px.y;

	for (int i = 0; i < count; i++) {
		vec4 ix = fetch(offset + (i >> 2));
		int c = int(ix[i & 3] + 0.5);

		int t = c * 2;
		vec4 a = fetch(t);
		vec2 b = fetch(t + 1).xy;

		vec2 q0 = a.xy - p;
		vec2 q1 = a.zw - p;
		vec2 q2 = b - p;

		if (max(q0.x, max(q1.x, q2.x)) < cut) break;

		// outside the pixel's row entirely
		float ymin = min(q0.y, min(q1.y, q2.y));
		float ymax = max(q0.y, max(q1.y, q2.y));
		if (ymax < -half_y || ymin > half_y) continue;

		// to pixel units
		vec2 p0 = q0 * px;
		vec2 p1 = q1 * px;
		vec2 p2 = q2 * px;

		// flatten: segments by the curve's second difference on screen
		vec2 dd = p0 - 2.0 * p1 + p2;
		int n = clamp(int(ceil(sqrt(length(dd) * 0.5))), 1, 8);

		float dx = off * px.x;

		vec2 prev = p0;
		for (int k = 1; k <= n; k++) {
			float s = float(k) / float(n);
			vec2 q = mix(mix(p0, p1, s), mix(p1, p2, s), s);

			cov.g += segment(prev, q);

			if (dx != 0.0) {
				cov.r += segment(prev - vec2(dx, 0.0), q - vec2(dx, 0.0));
				cov.b += segment(prev + vec2(dx, 0.0), q + vec2(dx, 0.0));
			}

			prev = q;
		}
	}

	return cov;
}

void main() {
	int table = int(v_glyph.x + 0.5);
	int bands = int(v_glyph.y + 0.5);

	// The pixel's footprint in em. fwidth rather than the separate derivatives
	// the reference takes: this site SHEARS the type — the ribbon's diagonal
	// leans y with x — and separate dFdx(x)/dFdy(y) only describe a footprint
	// whose axes are still screen-aligned. Before any discard, since a
	// derivative after one is undefined for the quad's helper lanes.
	vec2 fw = max(fwidth(v_em), vec2(1e-6));
	vec2 ppx = 1.0 / fw;

	// The reveal's mask window, its edges computed per line in the vertex
	// stage. The landed-line lift is a safety net: with the edges resolved
	// correctly it changes nothing, but it guarantees resting ink is never
	// clipped even if a face misreports its extents.
	float band = step(vEdgeTop, vYEl) * (1.0 - step(vEdgeBot, vYEl));

	// ── A reel keeps its mask ──
	//
	// The safety net is exactly wrong here. A reel sits at progress 1 for its
	// whole life — it arrives by spinning, not by revealing — so the landed
	// line lift would hold the window open permanently, and the window is the
	// only thing standing between one digit and all ten of them drawn in a
	// column. The clip IS the machine: nine of every ten instances are meant
	// to be outside it at any moment.
	float show = u_reel > 0.5 ? band : max(band, step(0.9995, vP));

	if (show < 0.5) discard;

	// The bands split the ink box evenly, each way.
	int bh = clamp(int((v_em.y - v_bbox.y) / max(v_bbox.w - v_bbox.y, 1e-6) * float(bands)), 0, bands - 1);
	int bv = clamp(int((v_em.x - v_bbox.x) / max(v_bbox.z - v_bbox.x, 1e-6) * float(bands)), 0, bands - 1);

	// Glyph colour comes from uniforms, never from the outline — so a title
	// flying to the detail page cross-fades from the carousel's white to the
	// sheet's near-black with nothing to re-cut.
	float ink_t = u_ink;

	// On a pill, the opening disc decides that ramp PER FRAGMENT rather than
	// the tween deciding it for the whole label: the letters go white where the
	// pink has reached them and stay dark where it has not.
	if (u_pillA > 0.0001) ink_t = pillMask();

	vec3 ink = mix(u_c0, u_c1, ink_t);

	if (u_hi.z > 0.0) {
		// hx rather than half: half is a reserved word in GLSL.
		vec2 hx = u_hi.zw * 0.5;
		float hd = roundedBox(vPx - u_hi.xy, hx, min(u_hiR, min(hx.x, hx.y)));
		float haa = max(fwidth(hd), 0.001);

		ink = mix(ink, u_hiC, 1.0 - smoothstep(-haa, haa, hd));
	}

	// Stem correction. This renderer composites in LINEAR space; the browser
	// does not — it blends text gamma-aware, which thins dark type on a light
	// ground. The same coverage blended linearly therefore lands heavier than
	// the DOM it is mirroring, and at body size that reads as the wrong weight
	// rather than as a rendering difference.
	//
	// Applied in proportion to how DARK the ink is, because the problem is not
	// symmetric: light type on a dark ground is already the thin case. Keying
	// off the ink rather than off a flag also means a title FLYING from the
	// strip to a page picks the correction up as it darkens.
	//
	// The operator is the canvas material's, and it is still the right one:
	// what it corrects is the compositing space, not where coverage came from.
	// The CONSTANTS are not, and they do not even point the same way — see
	// OUTLINE_GAMMA_DARK and OUTLINE_GAMMA_LIGHT in ./index.js for the
	// measurement. Both ends are corrected here, where the canvas material left
	// light ink alone: against true area coverage the browser is heavier at
	// both, and heaviest on a dark ground.
	float dark = 1.0 - clamp(dot(ink, vec3(0.2126, 0.7152, 0.0722)), 0.0, 1.0);
	float gam = mix(u_gammaL, u_gamma, dark);

	// ── Dispersion ──
	//
	// The lens the pill's fill runs on magnifies this word, and the canvas
	// material had a real problem there: a raster cannot be magnified, so the
	// glyph edges went soft exactly where the effect was strongest, and the
	// colour split was the honest way to own that softness.
	//
	// An outline has no such failure — it is re-solved at whatever size the
	// lens asks for. So this stays as a LOOK rather than as a fix: the word
	// drawn the way glass would pass it, each channel from its own place.
	//
	// The offset follows the lens's own squared profile, peaking at the pill's
	// centre and gone by its rim, and runs along x, the way a word runs.
	float split = 0.0;

	if (u_pillA > 0.0001 && u_lens.z > 0.0001) {
		vec2 rad = (gl_FragCoord.xy - u_pillDisc.xy) / max(u_pillDisc.z, 1.0);
		float k = max(1.0 - dot(rad, rad), 0.0);

		split = k * k * PILL_SPLIT * u_pillA * fw.x;
	}

	// ── The smear ──
	//
	// A box average along the travel, which is what a shutter open for the
	// whole frame actually does to something moving at a constant speed. Not a
	// gaussian: the motion is linear and a gaussian would be a softer, wronger
	// version of the same thing.
	//
	// Nine taps. Under a digit's height of travel that is a tap every ninth of
	// the smear, which at this size is well inside a pixel of each other at the
	// speeds that matter; above it the reel is a blur either way. The branch is
	// coherent across a whole glyph — every fragment of an instance shares
	// vBlur — so the fast path costs the still ones nothing.
	vec3 raw;

	if (vBlur > 0.002) {
		raw = vec3(0.0);

		// STRATIFIED AND JITTERED, not evenly spaced. Evenly spaced, a reel at
		// speed draws its taps as separate ghosts — the smear travels several
		// glyph heights and a dozen copies at a fixed spacing is a stack of
		// legible digits, which is worse than no blur at all. One phase offset
		// per fragment turns that banding into a fine grain, and grain at this
		// size is what a smear looks like.
		//
		// The hash is the usual sin-dot one. It only has to be uncorrelated
		// with the stripe spacing, and it is free.
		float j = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);

		for (int i = 0; i < BLUR; i++) {
			float t = ((float(i) + j) / float(BLUR) - 0.5) * vBlur;
			float y = v_em.y + t;

			// The band is chosen PER TAP. A tap a third of an em above the
			// fragment is in a different band from the fragment, and walking
			// the centre's band for it summed the wrong curves — which was a
			// fair share of the grain the smear had.
			int tb = clamp(int((y - v_bbox.y) / max(v_bbox.w - v_bbox.y, 1e-6) * float(bands)), 0, bands - 1);

			raw += abs(area3(vec2(v_em.x, y), ppx, table + tb, split));
		}

		raw /= float(BLUR);
	} else {
		raw = abs(area3(v_em, ppx, table + bh, split));
	}

	float cov = clamp(raw.g, 0.0, 1.0);
	vec3 rgb = vec3(1.0);

	if (split > 0.0) {
		// A real split, not a tint: alpha becomes the WIDEST of the three, so a
		// pixel only red reaches is drawn as red — a coloured ghost each side
		// rather than an existing edge being stained.
		vec3 c = pow(clamp(raw, 0.0, 1.0), vec3(gam));
		float a = max(c.g, max(c.r, c.b));

		rgb = c / max(a, 0.001);
		cov = a;
	} else {
		cov = pow(cov, gam);
	}

	ink *= rgb;

	// The CSS mask-image equivalent: the column dissolves as it rolls around
	// the tube, reaching zero at both ends.
	float mask = 1.0 - smoothstep(u_mask, 1.0, vWrap);

	float clip = u_clipOn > 0.5 ? clipMask(u_clip, u_clipR) : 1.0;

	// The counter-dim, gated by the card itself.
	float dim = 1.0;
	if (u_dim < 0.9995 && u_maskShape.z > 0.001) {
		vec2 ndc = (gl_FragCoord.xy / u_maskRes) * 2.0 - 1.0;
		vec3 C = (u_maskM * vec4(0.0, 0.0, u_maskCam.z, 1.0)).xyz;
		vec3 P = (u_maskM * vec4(ndc.x * u_maskCam.x, ndc.y * u_maskCam.y, 0.0, 1.0)).xyz;
		vec3 dir = P - C;

		float t = -C.z / (abs(dir.z) > 1e-6 ? dir.z : 1e-6);
		vec2 hit = C.xy + t * dir.xy;

		float pr = u_maskShape.z;
		vec2 msz = vec2(u_maskShape.x, 1.0);
		vec2 mq = (hit + 0.5) * msz;
		vec2 mmid = msz * 0.5 * pr;
		float mr = min(u_maskShape.y * pr, min(mmid.x, mmid.y));

		float md = roundedBox(mq - (msz * 0.5 - mmid), mmid, mr);
		float maa = max(fwidth(md), 0.0001);

		float mcov = t > 0.0 ? 1.0 - smoothstep(-maa, maa, md) : 0.0;

		dim = mix(1.0, u_dim, mcov);
	}

	fragColor = vec4(ink, cov * u_alpha * vFade * dim * mask * clip * frameFade());
}