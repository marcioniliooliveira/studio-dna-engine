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

uniform sampler2D u_scene;
uniform vec2 u_aspect;
uniform float u_time;

uniform vec2 u_center;  // in uv, so the hole can sit wherever its element does
uniform float u_p;      // 0 = untouched page, 1 = hole fully open
uniform float u_radius; // the disc at full size, as a share of viewport WIDTH
uniform float u_lens;   // Einstein radius, as a multiple of the disc's
uniform float u_reach;  // how far past the rim the warp survives
uniform float u_orbit;  // frame dragging at the rim, radians per second
uniform float u_wave;   // how far the rim lobes off the circle
uniform float u_aberr;  // channel split at the rim, as a share of the lens
uniform float u_squash; // >0 tall and narrow, <0 squat and wide
uniform float u_breath; // idle pulse on the radius, as a share of it

// ── The cursor ball's block ──
//
// The ball's shape is not in a uniform any more — it is in u_trail, the
// accumulated height field the cursor paints as it moves (see trail.frag).
// This side only reads slopes off it: where the field climbs, the page is
// pulled uphill, which is the sheet bulging over whatever the ball left
// behind. u_ballA is the global gate — presence, plus the manager's verdict
// that the field still holds any ink at all.
uniform float u_ballA;      // global gate, 0 = untouched page
uniform float u_ballWarp;   // how hard the field's slope pushes, uv units
uniform float u_ballShade;  // how hard the slope is LIT — depth, not smear
uniform vec2 u_ballEdge;    // radial falloff: full inside .x, gone past .y
uniform sampler2D u_trail;  // the height field
uniform vec2 u_trailTexel;  // one texel of that buffer, in uv

varying vec2 vUv;

vec2 spin(vec2 v, float a) {
	float c = cos(a);
	float s = sin(a);

	return mat2(c, -s, s, c) * v;
}

// ── Working space ──
//
// Radius as a share of the viewport's WIDTH. The viewport's own stretch is
// already handled by multiplying uv by u_aspect, so this is purely the unit the
// radii are quoted in — but the unit is not cosmetic, because every constant in
// the effect is expressed in it. (q is not isotropic in general: squash() bends
// it on purpose. That is the one deformation this space is meant to carry.)
//
// Width, not the shorter side, and not the diagonal. Both of those bring
// HEIGHT into the size of the hole and everything around it, so the same
// window made shorter quietly shrinks the warp and the rim's wander. This site
// is already width-driven everywhere else — the fluid rem scale is
// 100vw / --size — so a height-sensitive unit here would be the one place the
// layout answers to something different.
float widthUnit() {
	return u_aspect.x;
}

// ── Squash and stretch ──
//
// A change of BASIS, not a distortion applied to the finished picture. Every
// radius in this pass — the disc, the Einstein ring, the envelope, the rim's
// wander — is measured in the space this returns, so scaling it deforms the
// whole object at once. Squashing the output instead would have flattened the
// ring while leaving the horizon a circle, which is two things happening.
//
// Linear, so it cannot fold: unlike the anisotropic lens described below, the
// strength and the direction are read in the SAME space, and the map back out
// is just the inverse. It has to be applied on the way back (see grab), which
// is why this is a function and not two characters in main().
//
// Positive is tall and narrow — horizontal distance counts for more, so the
// horizon is reached sooner along x. Negative is squat and wide.
vec2 squash() {
	return vec2(1.0 + u_squash, 1.0 - u_squash);
}

// ── The rim is not a circle ──
//
// Lobes in ANGLE, not noise over the frame. The rim used to be fbm sampled in
// screen space, which meant the circle was being dipped into a drifting field
// rather than carrying a shape of its own — so turning it up crinkled the
// boundary instead of bulging it, and the wander did not travel with the blob.
//
// Two sines a few cycles around, drifting at different rates and in opposite
// directions: three-ish soft lobes beating against five, which never repeats
// on any timescale the eye can hold and reads as a shape breathing rather than
// as a texture. Coherent enough to run at four times the amplitude the noise
// managed before it started swallowing the ring. Integer multipliers, so the
// function is 2*PI-periodic and the seam at atan's discontinuity is invisible.
//
// The counts and the drift rates are the SHAPE and belong here. How far it
// goes is a dial and lives with the others in the manager.
//
// Cheaper, incidentally: two sines against three octaves of value noise.
float lobes(float a) {
	return sin(a * 3.0 + u_time * 0.7) * 0.6 + sin(a * 5.0 - u_time * 0.45) * 0.4;
}

// A direction and a radius, back to the UV that holds it. Centred on the hole,
// not on the screen — the two are only the same by default. Undoes squash() on
// the way, since dir and rad are both in its space and the scene is not.
//
// Off the frame there is nothing to have bent — the scene was only ever
// rendered to the viewport. Black rather than clamped: clamping smears the
// outermost row of pixels inward and reads as a streaking artefact rather than
// as empty space.
//
// OPAQUE black, to match the target it is sampling: the scene is composited
// onto an opaque black clear (see Core.tick, and the note there about why),
// so every in-frame sample comes back at alpha 1 and the two have to agree or
// the frame's edge becomes a visible seam in the alpha.
vec4 grab(vec2 dir, float rad) {
	vec2 uv = (dir * rad * widthUnit()) / (squash() * u_aspect) + u_center;

	if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0, 0.0, 0.0, 1.0);

	return texture2D(u_scene, uv);
}

// ── Gravitational lensing, on a leash ──
//
// One line of astrophysics, and it is the reason this pass exists at all. A
// source at true radius b appears to an observer at image radius t:
//
//     b = t - E*E / t
//
// Rendering runs it backwards: for every pixel on screen, ask what the scene
// HAS at the radius this pixel is showing, and sample there. Which is why it
// could never be done by moving geometry — at the rim the answer is often "the
// thing hidden behind the disc", and no vertex can be in two places at once.
//
//   t >> E   b -> t. Untouched.
//   t ->  E  b -> 0. The rim shows the CENTRE of the scene, wrapped all the
//                    way around. That is the ring.
//   t <   E  b < 0. The sign flip walks the sample across the middle and out
//                   the far side: the secondary image, mirrored.
//
// One departure from the physics, deliberate: the 1/t falloff is long-range, so
// left alone the deflection is still visibly bending the page out at the
// corners and the hole reads as something that happened to the whole screen
// rather than as an object sitting on it. So it is multiplied by an envelope
// that reaches u_reach past the rim and no further. The difference between an
// object and a filter.
//
// NO horizontal tails. Two goes at those:
//
//   An emissive accretion disc, which looked right and was thrown away for
//   being a second mechanism painting a picture of this one's job — the page
//   behind it could have been anything.
//
//   Then an anisotropic lens, judging the deflection's strength in a
//   vertically squashed space so content far out along x still gets dragged in
//   while content above the hole is left alone. That one is the honest version
//   — tails made of the site itself — and it tears: strength and direction
//   taken from different spaces is not a smooth map, so it folds, and the folds
//   sample off-frame and punch black notches out of the rim.
//
// Real tails are EMITTED light from a disc of matter. There is nothing behind
// the page for a lens to make them out of, and every warp that fakes it either
// smears or folds. A directional multi-tap smear would do it honestly, at the
// cost of N samples a pixel — worth reaching for only if the tails are the
// point rather than a reference.
// How far this pixel is dragged inward. Split out from bend() because the
// frame dragging below has to be weighted by it — see there.
float pull(float t, float e, float fall) {
	return fall * (e * e) / max(t, 0.001);
}

// ── The cursor ball ──
//
// A ball under the page, not a thing on top of it. ONE disc, riding the
// pointer with no lag, and the only thing it does is push the picture around —
// no colour, no light, no rim. Think of a ball rolling under a rubber sheet:
// the sheet is the page, and what you see is the page's own content sliding
// over the bulge.
//

void main() {
	vec2 q = (vUv - u_center) * u_aspect * squash();

	float t = length(q) / widthUnit();
	vec2 dir = length(q) > 0.00001 ? normalize(q) : vec2(1.0, 0.0);

	// Silenced by sin(PI * p) at both ends so a shut hole leaves the page
	// exactly untouched. Clamped as a guard rather than for anything the drive
	// currently does: p is tweened on a monotonic curve today, but sin turns
	// NEGATIVE past 1, so the day someone reaches for a back or an elastic on
	// the open, the rim's lobes would silently invert for the length of the
	// overshoot — a boundary turning inside out at the moment the eye is on it,
	// and nothing here to say why.
	float n = lobes(atan(q.y, q.x)) * u_wave * sin(3.14159265 * clamp(u_p, 0.0, 1.0));

	// Idle breath. Small and slow, and the point of it is what happens when
	// NOTHING is happening: an open hole holding a fixed radius is a hole, one
	// that keeps swelling very slightly is something with a metabolism. On the
	// radius rather than added to it, so it scales with the disc and is silent
	// while the thing is shut.
	float r = u_p * u_radius * (1.0 + u_breath * sin(u_time * 1.6)) + n;
	float e = r * u_lens;

	// Full at the rim, nothing by u_reach past it. Everything the hole does is
	// gated on this, so the whole effect is contained by one number.
	float fall = 1.0 - smoothstep(r, r + u_reach, t);

	// Frame dragging: the lensed image is rotated about the hole, and the
	// rotation ADVANCES — so what is caught around the disc orbits it instead
	// of sitting there as a still warp. Most of what makes an open hole read as
	// alive rather than as a screenshot with a circle cut out of it.
	//
	// Weighted by the PULL, not by the envelope. Weighted by the envelope it
	// outlives the hole: as p goes to 0 the deflection vanishes but `fall` is
	// still ~1 near the centre, so a disc of the page sat there rotated by
	// orbit x time with nothing left to justify it — and then the pass switched
	// off (see Post.active) and that rotation disappeared in a single frame.
	// That was the snap at the end of the close. Tied to the pull it cannot
	// happen: where nothing is being dragged, nothing turns.
	float draw = pull(t, e, fall);

	// ── The orbit runs, then holds ──
	//
	// The rotation ADVANCES (see above), and an advancing angle with nothing
	// bounding it is a bug on a long fuse. The angle is draw * orbit * t, and
	// `draw` varies across the rim — so the angle's GRADIENT grows with the
	// clock too. A few seconds in, neighbouring pixels sample neighbouring
	// places and it reads as caught light turning. Minutes in, they sample
	// points most of a turn apart, and the ring tears into the rainbow
	// streaking you get from an open profile left alone.
	//
	// So the SPIN sees a capped clock. Fifteen seconds is about ninety degrees
	// of travel at the rim — far longer than anyone watches a ring rotate —
	// and past it the drag simply holds instead of winding up forever.
	//
	// The cap is on this term ONLY. The rim's wander and the idle breath are
	// both periodic in time and are the same at any t, so they keep the real
	// clock: a held orbit still sits inside a boundary that never stops
	// moving, which is what keeps it from reading as a frozen frame.
	vec2 sdir = spin(dir, draw * u_orbit * min(u_time, 15.0));

	// Chromatic split. Not what a real black hole does to white light, but it
	// is what a lens does, and the rim is the one place the eye reads it as
	// depth rather than as a filter. Zero away from the rim by construction,
	// since the deflection carrying it vanishes there.
	float split = e * u_aberr;

	vec4 cr = grab(sdir, t - pull(t, e + split, fall));
	vec4 cg = grab(sdir, t - draw);
	vec4 cb = grab(sdir, t - pull(t, e - split, fall));

	// Alpha 1, NOT the sampled alpha. The target is cleared opaque (see
	// Core.tick), so its RGB is already the correct composite over the page's
	// black — but its ALPHA is not 1: blending leaves srcA*srcA + (1 - srcA),
	// which is 0.75 for a half-transparent source. Carrying that forward meant
	// the pass multiplied a correct colour by a meaningless alpha on the way to
	// the backbuffer, and everything semi-transparent came out ~10% dark. The
	// frame is opaque; say so.
	vec4 col = vec4(cr.r, cg.g, cb.b, 1.0);

	// Inside the horizon the page is simply over. Opaque, not transparent:
	// this is the surface the profile is read against, and the profile is
	// drawn AFTER this pass, so it never goes through any of the above.
	float d = t - r;
	float aa = max(fwidth(d), 0.0001);
	float inside = 1.0 - smoothstep(-aa, aa, d);

	vec4 page = mix(col, vec4(0.0, 0.0, 0.0, 1.0), inside);

	// ── The cursor ball, under everything the hole decided ──
	//
	// After the hole's mix in code but UNDER the page in spirit: nothing is
	// drawn, the page is resampled where the field's slope pushed it. Zero
	// amount is bit-identical to no ball at all — the offset collapses to
	// nothing, so there is no seam to hide when the pass switches off.
	if (u_ballA > 0.001) {
		// The field's gradient, two central differences over the coarse
		// buffer. Widened taps — the buffer's own linear filtering does the
		// smoothing, so this reads a slope, not texel noise.
		vec2 e = u_trailTexel * 1.5;

		vec2 g = vec2(
			texture2D(u_trail, vUv + vec2(e.x, 0.0)).r - texture2D(u_trail, vUv - vec2(e.x, 0.0)).r,
			texture2D(u_trail, vUv + vec2(0.0, e.y)).r - texture2D(u_trail, vUv - vec2(0.0, e.y)).r
		);

		// The room's centre matters more than its corners: the chrome — nav,
		// titles, buttons — lives toward the edges, and type that wobbles
		// while you reach for it is a worse trade than a weaker effect out
		// there. So the push fades on a radial: full inside u_ballEdge.x,
		// gone past u_ballEdge.y, measured from screen centre in width-share
		// so the falloff is a circle and the same size at any viewport.
		vec2 pw = vec2(vUv.x - 0.5, (vUv.y - 0.5) / u_aspect.x);
		float edge = 1.0 - smoothstep(u_ballEdge.x, u_ballEdge.y, length(pw));

		// Uphill pull: sampling toward the ridge magnifies the page over it,
		// which is the sheet bulging. Everything else — where the wake is,
		// how it curves, how it dies — is already in the field. Clamped
		// rather than blacked out at the frame's edge: a smear of the last
		// row reads better under a moving blob than a black bite.
		vec2 off = g * u_ballWarp * u_ballA * edge;
		vec2 buv = clamp(vUv + off, 0.0, 1.0);

		// Mixed by how much this pixel actually moved, so flat field leaves
		// the hole's own lensing untouched when the pointer crosses it.
		float m = smoothstep(0.0, 0.002, length(off));

		vec3 warped = texture2D(u_scene, buv).rgb;

		// ── The depth is painted, not displaced ──
		//
		// The gradient is the bump's slope, so lighting it is one dot
		// product: the surface normal tilts against the uphill direction,
		// a fixed light hangs up and slightly left, and the slope facing it
		// brightens while the far side falls into shadow. This is where the
		// pressed-into-the-page read comes from — it deepens with u_ballShade
		// alone, while the smear stays wherever u_ballWarp put it. Same
		// radial leash as the push, so the shading also stays out of the
		// chrome's corners.
		float shade = dot(-g, normalize(vec2(-0.3, 1.0))) * u_ballShade * u_ballA * edge;

		// ── Shading needs headroom ──
		//
		// The term is multiplicative, so on near-white content the bright
		// half clips invisible while the dark half shows at full strength —
		// the dent on the project sheet read as a one-sided smudge, not a
		// form. So the shading fades out as the pixel approaches white and
		// the lighting only acts where BOTH halves of it can be seen: images
		// and mid tones keep the full 3D read, paper stays paper. Black needs
		// no gate — multiplying black is black already.
		float lum = dot(warped, vec3(0.2126, 0.7152, 0.0722));
		float head = 1.0 - smoothstep(0.7, 0.95, lum);

		warped *= 1.0 + clamp(shade, -0.5, 0.5) * head;

		page = mix(page, vec4(warped, 1.0), m);
	}

	gl_FragColor = page;
}