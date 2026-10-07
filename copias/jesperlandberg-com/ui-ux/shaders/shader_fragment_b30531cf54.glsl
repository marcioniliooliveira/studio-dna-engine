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

uniform vec2 u_res;
uniform float u_alpha;
uniform float u_corner;

uniform vec3 u_rest;   // fill at rest, read off the element's CSS
uniform vec3 u_lit;    // fill on hover — one colour, flat, no ramp

// The other hover. A ROUND pill is not a credit, it is the page's one action,
// and it is already the dark thing on the page — there is no colour it can
// turn that a capsule has not already used to mean "a link". So it hollows
// out instead: the same disc opens, and instead of laying a colour down it
// takes the fill away, leaving the outline behind as a rule. The mark inside
// changes hands at the same moment (see below), and so does a label, which is
// the same swap made in syncPill.
//
// One shader rather than two planes: everything above and below this line —
// the rect sync, the entrance, the sheet's cut, the SDF, the mark — is the
// same for both, and all that actually differs is which side of the disc the
// fill ends up on.
uniform float u_ring;  // 1 = the hover hollows this pill instead of filling it
uniform float u_ringW; // the rule it leaves, in `p` units

// The round pills' marks, DRAWN rather than typed.
//
// They were glyphs in text planes, which meant a whole rasterized quad and a
// font to be sure of, for a few straight lines — and, worse, lines that could
// not move independently of each other, because by the time they got here
// they were pixels. As geometry they are strokes with their own ends and
// their own directions, which is what the swap below needs.
//
// Two marks, one machine: the close X and the open-link arrow are both just
// capsules, and both swap the same way.
uniform float u_cross;  // 1 = draw the close mark
uniform float u_arrow;  // 1 = draw the open-link mark
uniform float u_arrowR; // 1 = the same arrow pointed RIGHT (the strip's open mark)
uniform float u_markW;  // stroke weight, in `p` units

// One progress per stroke, 0..1, each on its own tween rather than the
// hover's — the hover is expo, which is nearly all attack, and a mark riding
// it has been and gone before the eye arrives. Two rather than one because
// leaving and arriving want different lengths, and a single value cannot hold
// both. See pills.mark in choreo.js.
uniform float u_markOut; // the stroke on its way out: 0 = in place, 1 = gone
uniform float u_markIn;  // the stroke on its way in: 0 = outside, 1 = landed

uniform sampler2D u_icon; // a silhouette: alpha is the shape, rgb is ignored
uniform float u_iconOn;
uniform vec2 u_iconScale; // icon box in `p` space (plane height = 1)
uniform vec3 u_iconC;     // the mark's ink, read off the element's `color`

// The rim — the newsletter field's border. A band of the outline's own
// SDF: a plain white rule at rest, and on focus the WHEEL — a cosine hue
// palette sampled by the angle around the shape plus the clock, so the
// colours orbit the border. Movement only, no alpha pulse: the rim is a
// black pill's whole silhouette on the hole's black backdrop, and a border
// that dims is a button that flickers. `u_chroma` is the focus crossfade
// (0 rule, 1 wheel), tweened by the component.
uniform float u_glow;   // rim presence: 0 = none, 1 = on (scales width too)
uniform float u_glowW;  // band width, in `p` units
uniform float u_chroma; // 0 = white rule, 1 = the moving wheel (focus)
uniform float u_time;   // the manager's clock, seconds

uniform vec4 u_clip;
uniform float u_clipR;
uniform float u_clipOn;

varying vec2 vUv;


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


// Half the length of a stroke, as a fraction of the pill's height — so a mark
// keeps its proportion at any button size, which is exactly what the WEIGHT
// must not do (see PILL_MARK_PX).
//
// Small, and small against a 2px stroke: a mark is meant to read as a dense
// little glyph sitting in a lot of room, not as one that fills the button. It
// also has further to travel before it clears the rim, which is what gives
// the swap somewhere to happen.
const float MARK_ARM = 0.12;

// How far a mark travels on its way out, same units. Comfortably past the rim
// plus its own length, so the one that leaves is gone rather than parked
// against the edge.
const float MARK_TRAVEL = 0.95;

// How much longer a CROSS stroke gets at the far end of its travel. It is
// moving and it is about to be cut off by the rim, and a line that lengthens
// as it goes reads as speed where one that holds its length reads as a slide.
// The arrow does not take it: stretching a shaft away from its own head is
// not speed, it is a broken arrow.
const float MARK_STRETCH = 0.5;

// How far the cross's second diagonal runs behind its first. Enough to read
// as two things rather than one X sliding, short enough to still be one
// gesture. The arrow travels whole, so it has no use for this.
const float MARK_LEAD = 0.16;

// The arrow's proportions: how far its head sits from the shaft's middle, and
// how long each barb is. Kept a touch shorter than the cross's arm — the mark
// is L-shaped rather than crossed, so the same length reads bigger.
const float ARROW_ARM = 0.1;
const float ARROW_HEAD = 0.11;

// How far the head waits behind the shaft — see arrowMark. Long enough that
// the arrow is plainly a line before it is an arrow, short enough that the
// wait is never a pause.
const float ARROW_LEAD = 0.22;

// One stroke, between two points. The general primitive: everything either
// mark is made of is one of these, and the swap only ever moves the points.
float seg(vec2 q, vec2 a, vec2 b, float w) {
	vec2 pa = q - a;
	vec2 ba = b - a;
	float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.000001), 0.0, 1.0);

	float d = length(pa - ba * h) - w * 0.5;
	float aa = max(fwidth(d), 0.0001);

	return 1.0 - smoothstep(-aa, aa, d);
}

// One cross stroke: a capsule of half-length l, centred c along dir.
float crossArm(vec2 q, vec2 dir, float c, float l, float w) {
	return seg(q, dir * (c - l), dir * (c + l), w);
}

// A diagonal of the CROSS: the stroke that leaves and the stroke that
// replaces it, along the same axis and travelling the same way. Each diagonal
// runs on its own axis, so the mark pulls apart rather than sliding.
//
// No easing here, on purpose — in either mark. Each stroke is handed a
// progress already shaped by its own tween (see pills.mark), and a curve
// applied here would be a second one on top of it, which is how the middle of
// a swap ends up being the part that stalls. What the shader owns is the
// GEOMETRY of the motion: where a stroke sits at a given progress, and how
// much longer it gets on the way. Both fully out at 1, both fully home at 0.
//
// Nothing fades: it is cut off by the pill's own outline (see the call), so a
// mark is always whole, never a ghost of itself.
float crossPair(vec2 q, vec2 dir, float a, float b, float w) {
	return max(
		crossArm(q, dir, a * MARK_TRAVEL, MARK_ARM * (1.0 + MARK_STRETCH * a), w),
		crossArm(q, dir, (b - 1.0) * MARK_TRAVEL, MARK_ARM * (1.0 + MARK_STRETCH * (1.0 - b)), w)
	);
}

// Hold a progress back by `d` and re-normalize what is left, so a stroke can
// run the same 0..1 as the rest but start late and still finish on time.
float lag(float t, float d) {
	return clamp((t - d) / (1.0 - d), 0.0, 1.0);
}

// One stroke of the arrow, between two points, slid along its own axis.
float arrowSeg(vec2 q, vec2 a, vec2 b, vec2 dir, float at, float w) {
	vec2 off = dir * (at * MARK_TRAVEL);

	return seg(q, a + off, b + off, w);
}

// ...and the pair of it: the one leaving and the one replacing it, out along
// its axis and in from the far side of it.
float arrowStroke(vec2 q, vec2 a, vec2 b, vec2 dir, float o, float i, float w) {
	return max(
		arrowSeg(q, a, b, dir, o, w),
		arrowSeg(q, a, b, dir, i - 1.0, w)
	);
}

// The open-link mark: a shaft on the up-right diagonal and two barbs at its
// tip. Three capsules, which is the whole difference between this and a
// chevron — drop the shaft and the same two barbs ARE one.
//
// It does not travel whole. Each stroke leaves along ITS OWN axis — the shaft
// up its diagonal, the barbs out through the sides they point at — and comes
// back in from the far side of the same axis. So the mark is ASSEMBLED rather
// than delivered: the shaft lands first and its head is put on afterwards,
// one barb then the other.
//
// The order reverses with the direction, and that is what the two lags below
// are for. Arriving, the shaft is early and the barbs are late — you see it
// built. Leaving, the barbs go first and the shaft last — it comes apart, and
// the last thing off the button is the line, not a head with nothing to sit
// on. Same two tweens throughout; only who waits changes.
float arrowMark(vec2 q, float o, float i, float w) {
	vec2 dg = vec2(0.7071, 0.7071);
	vec2 tip = dg * ARROW_ARM;

	float m = arrowStroke(q, -tip, tip, dg, lag(o, ARROW_LEAD), i, w);

	m = max(m, arrowStroke(
		q, tip, tip - vec2(ARROW_HEAD, 0.0), vec2(1.0, 0.0),
		o, lag(i, ARROW_LEAD), w
	));

	m = max(m, arrowStroke(
		q, tip, tip - vec2(0.0, ARROW_HEAD), vec2(0.0, 1.0),
		o, lag(i, ARROW_LEAD * 1.7), w
	));

	return m;
}

// The strip's arrow, whole: a shaft along +x and two barbs swept back at
// 45° from its tip — the same silhouette arrowMark builds, so the rigid
// copy this draws and the assembled one that replaces it are the one mark.
// No per-stroke axes and no lags: this is the LEAVING half only, slid out
// as one shape. See the u_arrowR block in main.
float rightArrow(vec2 q, float w) {
	vec2 tip = vec2(ARROW_ARM, 0.0);

	float m = seg(q, -tip, tip, w);
	m = max(m, seg(q, tip, tip + ARROW_HEAD * vec2(-0.7071, 0.7071), w));
	m = max(m, seg(q, tip, tip + ARROW_HEAD * vec2(-0.7071, -0.7071), w));

	return m;
}

void main() {
	// Squared to the plane's aspect: the space the outline's corner, the rule
	// and the mark are all measured in, so none of them is smeared along a
	// wide pill. The hover does not use it — see pillMask().
	vec2 sz = vec2(u_res.x / max(u_res.y, 0.0001), 1.0);
	vec2 p = vUv * sz;

	// The outline, first, because the mark is cut to it.
	float d = roundedBox(p, sz * 0.5, min(u_corner, min(sz.x, sz.y) * 0.5));
	float aa = max(fwidth(d), 0.0001);
	float outline = 1.0 - smoothstep(-aa, aa, d);

	// The hover, and only the hover. A pill with no link never lights up, so
	// its u_pillA is pinned at 0 and it pays for none of this — and neither
	// does a linked pill sitting at rest, which is most of them most of the
	// time. The branch is on a uniform, so it is the same answer for every
	// fragment in the draw: no divergence, a real saving.
	//
	// Nothing here cross-fades, it OPENS — a disc out of the middle of the
	// pill, the same one the label is turned by (see PILL_MASK in chunks.js).
	// A fade tells you the pill changed; a front sweeping past tells you
	// something arrived.
	// COVERAGE, not progress: this is 0 or 1 for a given fragment depending on
	// whether the front has swept past it yet, and the tween lives in the
	// uniform behind it. Everything that is a matter of WHERE the front has
	// got to reads this; anything that has to move over the length of a tween
	// — the mark's swap — reads a progress uniform instead, or it sees a value
	// that is only ever both ends of its own animation and never moves.
	float disc = u_pillA > 0.0001 ? pillMask() : 0.0;

	vec3 rgb = mix(u_rest, u_lit, disc * (1.0 - u_ring));

	// The mark — sampled or drawn — inked AFTER the fill, so the hover turns
	// what is under it and the mark stays put. Same deal the label gets, just
	// cheaper: a colour keyed by a coverage, not a picture. The asset's own
	// rgb is never read, so one black-on-transparent file serves any pill,
	// inked by u_iconC the way a label is inked by `color`.
	//
	// On a ring it changes to the RULE's colour as the fill leaves from under
	// it — which is the pill's own resting fill, so the mark ends up drawn in
	// the thing it used to be cut out of. Its coverage is kept, because the
	// hollow underneath is about to stop paying for it.
	//
	// Centred in `p` space, so neither the sampled box nor the drawn strokes
	// are distorted whatever the pill's aspect. Out-of-box reads are guarded
	// rather than left to the sampler: clamp-to-edge would smear the border
	// pixels outward if the asset's own edge ever carried ink.
	float mark = 0.0;

	if (u_iconOn > 0.5) {
		vec2 iuv = (p - sz * 0.5) / u_iconScale + 0.5;
		if (iuv.x >= 0.0 && iuv.x <= 1.0 && iuv.y >= 0.0 && iuv.y <= 1.0) {
			mark = texture2D(u_icon, iuv).a;
		}
	}

	// The drawn marks, which are the same kind of thing as the sampled one — a
	// coverage — and so join it rather than replacing it.
	//
	// Both are cut to the outline, so the leaving and the arriving both happen
	// at the pill's edge and nothing is ever seen crossing the page.
	vec2 q = p - sz * 0.5;

	// The CROSS. Its two diagonals run on the same pair of tweens, one lagging
	// the other, and each travels along its OWN axis — so the strokes pull
	// apart rather than sliding as a pair, and their replacements come in from
	// the far side.
	if (u_cross > 0.5) {
		float lead = 1.0 - MARK_LEAD;

		float m = max(
			crossPair(
				q,
				vec2(0.7071, 0.7071),
				clamp(u_markOut / lead, 0.0, 1.0),
				clamp(u_markIn / lead, 0.0, 1.0),
				u_markW
			),
			crossPair(
				q,
				vec2(-0.7071, 0.7071),
				clamp((u_markOut - MARK_LEAD) / lead, 0.0, 1.0),
				clamp((u_markIn - MARK_LEAD) / lead, 0.0, 1.0),
				u_markW
			)
		);

		mark = max(mark, m * outline);
	}

	// The ARROW, on the same two tweens: out through the top right, the way it
	// points, with its replacement coming in from the bottom left — but built
	// as it lands rather than delivered whole. Shaft first, then its head. No
	// stretch: lengthening a shaft away from its own barbs is not speed, it is
	// a broken arrow.
	if (u_arrow > 0.5) {
		mark = max(mark, arrowMark(q, u_markOut, u_markIn, u_markW) * outline);
	}

	// The RIGHT arrow — the strip's open mark, and its two halves part ways:
	// the one LEAVING goes whole — shaft and barbs rigid, straight out
	// through the right of the circle — while the one ARRIVING is the
	// diagonal arrow's own assembled entrance (shaft first, barbs after,
	// each in along its own axis), turned to point right by the same frame
	// rotation everything shares. A mark that points somewhere leaves that
	// way when answered; the replacement being BUILT is what says something
	// new arrived rather than the same thing bouncing back.
	//
	// arrowMark draws its leaving copies too — parked at full travel by the
	// pinned 1.0, which puts them outside the outline where the cut eats
	// them. Cheaper than a second function that has to be kept in step.
	if (u_arrowR > 0.5) {
		float m = rightArrow(q - vec2(MARK_TRAVEL, 0.0) * u_markOut, u_markW);

		vec2 qr = vec2((q.x - q.y) * 0.7071, (q.x + q.y) * 0.7071);
		m = max(m, arrowMark(qr, 1.0, u_markIn, u_markW));

		mark = max(mark, m * outline);
	}

	// The ink, on the other hand, IS the front's business: the mark changes
	// hands where the disc has reached it, letter-by-letter fashion, the same
	// way a label does.
	rgb = mix(rgb, mix(u_iconC, u_rest, disc * u_ring), mark);

	// The hollow: the same outline again, pushed in by the width of the rule,
	// and the disc is allowed to eat only what falls inside THAT. So the rule
	// is never touched however far the disc has opened, and it stays a rule of
	// exactly u_ringW — no thinner as the hole arrives, and no need for the
	// disc to know where to stop. The mark keeps its own coverage through it,
	// because the fill that was carrying it is on its way out.
	float shape = outline;

	if (u_ring > 0.5) {
		float inner = 1.0 - smoothstep(-aa, aa, d + u_ringW);
		shape = max(shape - inner * disc, mark);
	}

	// The rim, over everything but the alpha — see u_glow above. Branch on a
	// uniform: every pill without one pays a single compare.
	if (u_glow > 0.0001) {
		float gw = u_glowW * u_glow;
		float band = max(outline - (1.0 - smoothstep(-aa, aa, d + gw)), 0.0);

		// The angle is taken in the box NORMALIZED to its half-extents, and
		// that is what makes the colours ORBIT. Raw atan on a capsule parks
		// nearly the whole turn in the two round ends — the long edges span
		// a sliver of angle each, so the gradient sat still along them and
		// only stirred at the tips. Normalized, the shape is a circle as far
		// as the angle is concerned, and equal travel along the border is
		// roughly equal angle everywhere: the wheel's turn reads as colour
		// running AROUND the button, not breathing at its ends.
		vec2 nq = q / (sz * 0.5);
		float ang = atan(nq.y, nq.x) * 0.15915494;

		vec3 wheel = 0.5 + 0.5 * cos(6.2831853 * (ang + u_time * 0.25 + vec3(0.0, 0.333, 0.667)));

		vec3 rim = mix(vec3(1.0), wheel, u_chroma);

		rgb = mix(rgb, rim, band * min(u_glow, 1.0));
	}

	float alpha = u_alpha * shape;

	if (u_clipOn > 0.5) alpha *= clipMask(u_clip, u_clipR);

	gl_FragColor = vec4(rgb, alpha);
}