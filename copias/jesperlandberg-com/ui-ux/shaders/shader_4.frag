#version 300 es
#define varying in
layout(location = 0) out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
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
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;
#define OPAQUE
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

// ── The wipe ──
//
// The page transition for every navigation the flip does not cover. The black
// hole's disc (see post/frag.frag), opened from the centre of the screen until
// it has swallowed the corners — with the NEW page inside it instead of
// nothing. The rim is the hole's rim: the same lens on the same leash, the same
// lobed boundary, the same channel split. What differs is that it never sits
// still, and it is capped: the Einstein radius stops growing with the disc, so
// the ring reads the same at a tenth of the width as at half of it, and the
// mirrored sample never leaves the frame.
//
// A stack of up to three SHEETS, back to front, each showing inside its own
// disc; the back sheet's disc is the whole frame. What a sheet IS depends on
// which side of the canvas its page draws on:
//
//   capture  a GL page that has left, rendered once at the moment it went (see
//            Wipe.capture) — frozen pixels, lensed live.
//   live     the scene this frame — a GL page arriving.
//   dom      a page that paints in markup, ABOVE the canvas. Here it is a hole
//            in the composite (black), and the very same disc, written as a
//            clip-path off the same numbers, opens it in the DOM (see
//            Wipe.clip). The two agree to the pixel because they are one
//            formula evaluated twice.

uniform sampler2D u_a;    // capture slot A
uniform sampler2D u_b;    // capture slot B
uniform sampler2D u_live; // the scene, this frame
uniform vec2 u_aspect;
uniform vec2 u_center;
uniform float u_time;
uniform float u_full;   // the radius that clears the corners, width-share

// The stack, back to front. kind: 0 empty, 1 capture A, 2 capture B, 3 live,
// 4 dom. p: the disc's progress, 0 shut, 1 past the corners.
uniform float u_kind[3];
uniform float u_p[3];

uniform float u_lens;  // Einstein radius as a multiple of the disc's...
uniform float u_emax;  // ...capped here, width-share
uniform float u_reach; // how far past a rim the pull survives
uniform float u_wave;  // how far a rim lobes off the circle
uniform float u_aberr; // channel split at the rim, as a share of the lens
uniform float u_bulge; // an arriving page's swell against its own rim
uniform float u_shift; // the rim fringe: how far the channels part, width-share
uniform float u_band;  // ...and how far from the rim the parting reaches
uniform float u_glint;  // the rim's own light: brightness
uniform float u_glintW; // ...and half-width, width-share
uniform float u_px;     // one CSS px, width-share — the hairline's floor
uniform float u_dim;   // how far a page darkens under the rim opening over it

varying vec2 vUv;

#define PI 3.14159265

// Radius as a share of the viewport's WIDTH — the hole's unit, for the hole's
// reason: every constant here is quoted in it, and the fluid rem scale the
// layout runs on is width-driven too.
float widthUnit() {
	return u_aspect.x;
}

// The rim's wander, IDENTICAL to the hole's: three soft lobes beating against
// five. Wipe.lobes is the JS twin the clip-path is cut from, and the two
// must not drift — change one, change both.
float lobes(float a) {
	return sin(a * 3.0 + u_time * 0.7) * 0.6 + sin(a * 5.0 - u_time * 0.45) * 0.4;
}

// A sheet's disc at this angle. The lobes are silenced at both ends by
// sin(PI * p): a shut disc is a point and a finished one is a circle past the
// corners — a boundary still wobbling as it clears the frame would leave a
// corner flickering.
float radius(float p, float n) {
	return p * u_full + n * sin(PI * clamp(p, 0.0, 1.0));
}

// A direction and a radius back to the uv that holds it, then the sheet's
// pixels there. Off the frame there is nothing to have bent: OPAQUE black,
// to match the targets every sheet was cleared to (see Core.tick).
vec4 grab(float kind, vec2 dir, float rad) {
	vec2 uv = (dir * rad * widthUnit()) / u_aspect + u_center;

	if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0, 0.0, 0.0, 1.0);

	if (kind < 1.5) return texture2D(u_a, uv);
	if (kind < 2.5) return texture2D(u_b, uv);
	return texture2D(u_live, uv);
}

// How far a pixel outside a rim is dragged toward it — the hole's one line of
// astrophysics, see post/frag.frag for the working.
float pull(float t, float e, float fall) {
	return fall * (e * e) / max(t, 0.001);
}

// One sheet's colour at this pixel, lensed by the two rims that concern it:
//
//   rOut  the disc opening OVER it. Content near that rim is pulled into it —
//         the leaver falling into the ring — and darkens under it, the shadow
//         the arriving page casts.
//   rIn   its own disc, while it is still opening. Content just inside swells
//         toward the rim, magnified out of the centre, and relaxes flat as the
//         disc fills the frame.
//
// A dom sheet is black by construction: the markup is doing its drawing.
vec3 shade(float kind, float rIn, float pIn, float rOut, float t, vec2 dir) {
	if (kind < 0.5 || kind > 3.5) return vec3(0.0);

	float b = t;
	float bR = t;
	float bB = t;

	float fall = 0.0;

	if (rOut > 0.0) {
		float e = min(rOut * u_lens, u_emax);
		float split = e * u_aberr;

		fall = 1.0 - smoothstep(rOut, rOut + u_reach, t);

		b -= pull(t, e, fall);
		bR -= pull(t, e + split, fall);
		bB -= pull(t, e - split, fall);
	}

	if (rIn > 0.0 && rIn < 100.0) {
		float w = (1.0 - smoothstep(rIn - u_reach, rIn, t)) * (1.0 - pIn);
		float s = 1.0 - u_bulge * w;

		b *= s;
		bR *= s;
		bB *= s;
	}

	// ── The fringe ──
	//
	// The channels part along a rim, on both sides of it, and close again
	// within u_band: red sampled a touch nearer the centre than green, blue
	// a touch further — the order the hole's lens splits them in, with a
	// reach of its own so it reads AS the edge rather than as a tint on the
	// page. A sheet between two rims takes the nearer. A dom sheet gets none
	// (markup cannot split), so a rim against one carries the fringe on its
	// GL side only.
	float near = 0.0;

	if (rOut > 0.0) near = max(near, 1.0 - smoothstep(0.0, u_band, abs(t - rOut)));
	if (rIn > 0.0 && rIn < 100.0) near = max(near, 1.0 - smoothstep(0.0, u_band, abs(t - rIn)));

	float part = u_shift * near;

	bR -= part;
	bB += part;

	vec3 col = vec3(grab(kind, dir, bR).r, grab(kind, dir, b).g, grab(kind, dir, bB).b);

	return col * (1.0 - u_dim * fall);
}

// ── The rim's own light ──
//
// Where both sides of a rim are black the edge vanishes: nothing to bend,
// no channels to part. So every rim carries a hairline of its own — a soft
// line of light straddling the boundary, dispersed the way the fringe is:
// red a touch outside, green on the line, blue a touch inside. Content or
// not, the disc has an edge. Never thinner than a pixel and a half, so it
// cannot alias; silenced while the disc is still a point, because a glowing
// dot at screen centre is not an edge. Additive, so on white it simply
// clips and the fringe carries the edge there instead.
vec3 glint(float d, float p) {
	float w = max(u_glintW, 1.5 * u_px);
	float s = w;

	float g = exp(-(d * d) / (w * w));
	float r = exp(-((d - s) * (d - s)) / (w * w));
	float b = exp(-((d + s) * (d + s)) / (w * w));

	return vec3(r, g, b) * u_glint * smoothstep(0.0, 0.03, p);
}

// The disc's edge: a pixel and a half of AA, exactly as the hole cuts its
// horizon.
float inside(float d) {
	float aa = max(fwidth(d), 0.0001);
	return 1.0 - smoothstep(-aa, aa, d);
}

void main() {
	vec2 q = (vUv - u_center) * u_aspect;

	float t = length(q) / widthUnit();
	vec2 dir = length(q) > 0.00001 ? normalize(q) : vec2(1.0, 0.0);
	float n = lobes(atan(q.y, q.x)) * u_wave;

	bool has1 = u_kind[1] > 0.5;
	bool has2 = u_kind[2] > 0.5;

	float r1 = has1 ? radius(u_p[1], n) : -1.0;
	float r2 = has2 ? radius(u_p[2], n) : -1.0;

	// Back to front, each disc mixed over what is behind it. The back sheet
	// has no rim of its own (1e3 skips the swell), only the one opening over
	// it.
	vec3 c = shade(u_kind[0], 1000.0, 1.0, r1, t, dir);

	if (has1) c = mix(c, shade(u_kind[1], r1, u_p[1], r2, t, dir), inside(t - r1));
	if (has2) c = mix(c, shade(u_kind[2], r2, u_p[2], -1.0, t, dir), inside(t - r2));

	// The rims' light, over the composite — see glint().
	if (has1) c += glint(t - r1, u_p[1]);
	if (has2) c += glint(t - r2, u_p[2]);

	// Opaque, for the reason every clear in Core.tick is: the frame IS
	// opaque, and a meaningless alpha carried to the backbuffer darkens
	// everything semi-transparent on the way.
	gl_FragColor = vec4(c, 1.0);
}