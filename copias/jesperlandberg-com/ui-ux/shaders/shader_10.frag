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

uniform sampler2D u_texture;
uniform vec2 u_size;
uniform vec2 u_res;
uniform float u_alpha;
uniform float u_shade;  // depth-shade strength: 1 on the strip, 0 as hero
uniform float u_shadeS; // depth-shade spread: below 1 widens it
uniform float u_corner; // border-radius, normalized to the plane's height
uniform float u_white;  // how far the image is washed out to u_wash
uniform vec3 u_wash;    // the colour it washes TO, read off the landing element
uniform float u_scrim;  // title scrim strength — see the gradient below

uniform vec4 u_clip;
uniform float u_clipR;
uniform float u_clipOn;

varying vec2 vUv;
varying vec3 vFlat;


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


const float SHEET_PI = 3.141592653589793;


// The roll about the ribbon's long axis, in radians, and it takes four numbers
// because a single one cannot say any of what is wanted.
//
// The roll is not its own idea: the surface BANKS into the depth wave's
// slope, like a track. One number scales the wave's own derivative into
// radians, so wherever the ribbon sweeps between near and far hardest the
// surface leans hardest, and where the wave levels out it sits square. The
// twist cannot disagree with the shape because it is read off it.
// NEGATIVE, and gentler again: the sign flips which way the sides wind
// against the dive — wound WITH the surface one way reads as one object, the
// other as the ribbon twisting toward the viewer — and at 0.16 the resting
// turn is barely felt, which is the point. This is the RESTING bank; the
// wring that reads as motion is SHEET_VTWIST below, on the velocity, and
// they add on the same angle. Raise this and the outer cards start reading
// as banked road signs before they have been asked to move.
const float SHEET_BANK = -0.16;

// The strip's DIAGONAL: a shear in world y, linear in x — the whole ribbon
// runs uphill across the frame instead of lying level, and every card tilts
// by its own share of the same line. As a slope (y per x), gated on the
// ribbon being active (u_sheetW) and eased off by u_sheetP like every other
// term, so a plane flying to the detail page levels out on the same clock it
// flattens on.
//
// A shear rather than a true rotation, on purpose: it is one add, it keeps
// world x (which every other sheet term is a function of — a rotation would
// feed them a mixed coordinate), and at this angle the difference from a
// rotation is nothing the eye can find.
//
// The COST is hit alignment: the DOM row stays level, so the drawn card sits
// off its element by SHEET_DIAG·x world units — about 30px at the frame's
// edge at 0.05. The cards are hundreds of px tall and the centred card (the
// one being clicked) is barely displaced, so the drift stays inside every
// hit area; raise this past ~0.1 and that stops being true.
//
// Back from 0 at a WHISPER: right side up, left side down, and no more —
// 0.03 is about 20px of rise at the frame's edge. It went to 0 once for
// reading as the whole strip being lifted; at this weight it reads as the
// ribbon not quite sitting level, which is a different thing. The depth
// story stays the camera's (see the wave below, still parked).
const float SHEET_DIAG = 0.03;

// ── The strip's y-wave: the ribbon SNAKING ──
//
// A sine in world y, function of world x like every other sheet term — so
// the wave is a fixed surface the slides travel THROUGH, and a card spanning
// a bend takes a different y at each vertex: it curves along the wave rather
// than tilting rigidly, and cards run edge to edge into one continuous
// ribbon. Rides on top of the depth S and the diagonal; the three together
// are the snake-through-space, each with its own dial.
//
// WAVE is the amplitude as a fraction of the frustum half-width (~75px at
// 0.12 on a desktop frame). The same hit-alignment budget as the diagonal
// applies, and they ADD: the DOM row is level, so wave + diagonal together
// should stay comfortably inside a card's own height — a couple hundred px.
//
// F is how many half-cycles fit in one half-width (under 1, so the frame
// shows one long bend rather than a flutter), PH slides the crest off dead
// centre so the middle card sits on a slope — a wave centred on its own
// node reads as two tilted wings, not a snake.
// 0 — parked with SHEET_DIAG above, same reasoning: a y-wave is the strip
// moving on SCREEN, and what it should read as is the strip moving in
// SPACE. Depth, bank and door say that through perspective; this said it
// through lift, and lift is what it looked like.
const float SHEET_WAVE = 0.0;
const float SHEET_WAVE_F = 0.8;
const float SHEET_WAVE_PH = 0.35;

// The rear-up's reach, as fractions of the frustum half-width at full
// speed: how far the left side LIFTS (y) and how far it comes NEARER (z).
// Z outweighs y on purpose — the gesture is the ribbon rearing toward the
// viewer, and the lift is only what makes the turn legible against the
// diagonal. Driven by u_sheetV, masked left of centre — see sheet().
//
// Walked from 0.08/0.16 up to 0.12/0.24 and back to here — the ratio between
// them untouched throughout, so every step was the gesture getting bigger
// rather than changing. The z term is the one to watch when pushing: it moves
// the near end toward a camera already reading it at 1.4x, so past about a
// quarter of a half-width the outer cards start arriving in the viewer's lap
// on a flick.
const float SHEET_REAR_Y = 0.1;
const float SHEET_REAR_Z = 0.2;

// The velocity EDGE twist: how far each side of the ribbon wrings about the
// centreline at full speed, in radians at the mask's far end. Signed by side
// — the two edges turn OPPOSITE ways, which is what makes it a ribbon being
// wrung rather than the whole strip rolling — and masked to the outer
// stretch (see the smoothstep in sheetWind), so the centre card never moves
// and the reading stays where the eye is not. Rides sheetWind's own
// rotation, so the wring composes with the bank instead of fighting it.
//
// BIG on purpose, and it has to be: the roll's visible effect scales with a
// vertex's distance from the centreline — half a card's height, a few world
// units — and a polite angle here is arithmetic that never reaches the
// screen. 1.8 at the mask's end puts a real wring on the outer cards — up
// again now that the RESTING bank has come down to meet it (see SHEET_BANK):
// the two add on one angle, so a quieter rest is room this can spend.
//
// This one is the first to go too far, and the tell is legibility rather
// than taste: past roughly two radians the outer cards pass edge-on and a
// picture briefly becomes a line. Lower VEL_NORM to meet more of the wring
// during ordinary scrolling before raising this.
const float SHEET_VTWIST = 1.8;

uniform float u_sheetW; // frustum half-width at z=0 (0 = sheet off)
uniform float u_sheetD; // the wave's amplitude, world units
uniform float u_sheetT; // how much of the frame the S spans (>1 finishes early)
uniform float u_sheetC; // 0 = symmetric bowl, 1 = the near-to-far S
uniform float u_sheetP; // sheet strength: 1 on the strip, 0 as the hero
uniform float u_sheetV; // scroll speed, 0..1 — drives the rear-up, see sheet()
uniform float u_hover;  // 0 at rest, 1 with the pointer on this card
uniform float u_dent;   // how far the middle bows back, as a share of the height

// How fast the overshoot dies away past the frame. Higher pulls the bump in
// tighter and shrinks it; at 1 the peak is about 13% of the dive's depth.
const float SHEET_TAIL = 1.0;

// Where across the frame this point falls: -1 at the left edge, 0 at the
// middle, +1 at the right, and smoothly PAST those at the wrap margins — no
// clamp anywhere. Every term built on it carries the gaussian tail, so all of
// them decay to flat off frame of their own accord instead of being cut.
// ── Where the sweep sits along the frame ──
//
// The S puts its near peak and its far trough at the QUARTER points (see
// sheetShape), which leaves the bulge — and the shading that reads off its
// depth — sitting off to one side, with the flat middle of the curve running
// through the centre of the screen. This slides the whole profile along x so
// the bulge can be brought inboard.
//
// The S has two extremes a half-unit either side of centre, and the sign
// picks which one lands there: POSITIVE brings the far trough — the deep end,
// where the shade is heaviest — onto the middle of the frame, negative brings
// the near peak instead. 0.5 puts the chosen one dead centre, 0.25 is halfway,
// 0 is the original quarter-point placement.
//
// Applied HERE, in the one function every term is built on, so the shape, its
// exact slope, the bank, the shade and the normal all move together and
// cannot drift — and the slope stays exact for free, because a translation
// has derivative 1 and sheetShapeSlope is simply evaluated at the shifted q.
// The gaussian tail travels with the profile rather than staying pinned to
// the frame, so the sweep decays a little sooner on one side; at half a unit
// that is worth a look at the right-hand edge.
// -0.2, walked out from the -0.5 that centred it: the near peak — the bulge
// toward the camera — sits clearly LEFT of centre now, so the frame reads
// as the ribbon swelling on its way in rather than peaking dead ahead.
// Less negative = further left; each 0.1 moves the peak about 0.1·W/T of
// the frame.
const float SHEET_SHIFT = -0.2;

float sheetQ(float wx) {
	return wx / max(u_sheetW, 0.0001) * u_sheetT + SHEET_SHIFT;
}

// The surface: one S in DEPTH — near through the left half, far through the
// right — eased back to flat off frame by the gaussian tail. sin(pi q) is zero
// at the centre and at both edges, so the middle card sits on the layout plane
// and the frame's corners are already coming home; the near and far peaks land
// at the quarter points, which is what makes the sweep read as round rather
// than as a long shallow drift.
//
// DEPTH, not screen y, and the distinction is the whole shape. The same S was
// tried as a vertical wave and it bent every card's silhouette directly —
// wavy top edges, a pinched middle. Run through z instead, the silhouette
// bends because PERSPECTIVE bends it: the near half stands large, the far
// half shrinks, and the undulating outline the reference has is the camera's
// work rather than the geometry's. (fov 75 at camZ 27 is what gives z this
// much to say — see the camera note in gl/index.js.)
//
// No clamp anywhere. The tail takes every term to flat smoothly, so a card
// wrapping in from off screen picks the curve up gradually — a crease at some
// cutoff point is structurally impossible.
// TWO profiles, blended by u_sheetC, and blended rather than branched so there
// is one derivative below instead of two that can fall out of step.
//
// At 0 it is a plain parabola: a symmetric bowl, deepest at the centre, the
// soft curve a narrow screen wants. There is no room on a phone for a sweep to
// travel from near to far and be read as travelling — it just looks lopsided.
//
// At 1 it is the sine S — near through the left half, far through the right —
// which needs width to be legible as one surface passing by.
//
// Both carry the same gaussian tail, so both decay to flat off frame and a card
// wrapping in picks either up gradually.
float sheetShape(float q) {
	return mix(1.0 - q * q, sin(SHEET_PI * q), u_sheetC) * exp(-SHEET_TAIL * q * q);
}

// Its exact slope, dz/dq, term for term — product rule over each profile and
// then the same blend. Exact because it is what both the normal and the bank
// are built from, and an approximate normal under a gloss exponent shows
// instantly.
float sheetShapeSlope(float q) {
	float g = exp(-SHEET_TAIL * q * q);

	float bowl = -2.0 * q * (1.0 + SHEET_TAIL * (1.0 - q * q));
	float ess = SHEET_PI * cos(SHEET_PI * q) - 2.0 * SHEET_TAIL * q * sin(SHEET_PI * q);

	return mix(bowl, ess, u_sheetC) * g;
}

float sheetZ(float wx) {
	return -u_sheetD * sheetShape(sheetQ(wx));
}

// The bank: the depth sweep's own derivative, scaled into radians. Where the
// ribbon dives between near and far hardest it leans hardest, where the sweep
// levels out it sits square, and the two can never disagree because one is
// read off the other.
//
// d/dq of sin(pi q) e^(-t q^2) is (pi cos(pi q) - 2 t q sin(pi q)) e^(-t q^2),
// divided by pi so SHEET_BANK means "radians at the steepest point".
//
// The vertex stage rolls the surface by this (see sheetWind) and the fragment
// stage rolls the NORMAL by the same angle. An approximation, and worth
// knowing which one: a surface twisting along its length picks up a normal
// term from the RATE of twist too. This rotates by the local angle and stops —
// the error is largest where the bank changes fastest, and at 0.28 radians
// total it stays below anything a gloss highlight can find.
float sheetRoll(float wx) {
	if (u_sheetW < 0.001) return 0.0;

	// Scaled by u_sheetC, so the bank belongs to the S and vanishes with it. A
	// symmetric bowl has nothing to lean INTO — banking it would tilt the two
	// halves opposite ways about a curve that is the same on both sides, which
	// reads as the type being wrung rather than as a surface following a path.
	return SHEET_BANK * sheetShapeSlope(sheetQ(wx)) / SHEET_PI * u_sheetC * u_sheetP;
}

// The wind itself: a world-space point rolled about the ribbon's CENTRELINE.
//
// Not TWIST's job, and the difference is the axis. TWIST rolls a plane about
// its own centre, which is right for a line of type winding along itself and
// wrong for this: every card and every title has to turn about the SAME line,
// or they wind individually and the strip stops being one surface. That line is
// y = z = 0 — the strip is centred on the viewport and its planes sit at z 0
// before anything displaces them — so the rotation is just (y, z) about the
// origin, with x untouched.
//
// x untouched is what makes the order below work: the wave reads world x, so
// winding first and bending second gives a ribbon whose cross-sections are
// rolled and whose centreline still follows the curve. Bending first would wind
// the bend instead of the ribbon.
vec4 sheetWind(vec4 w) {
	float a = sheetRoll(w.x);

	// The velocity edge twist, ON TOP of the resting bank: past the mask's
	// inner edge each side wrings the other way (sign(q)), hardest at the
	// frame's edge, nothing at the centre — see SHEET_VTWIST. Added to the
	// same angle rather than run as a second rotation, so the two compose
	// exactly. The NORMAL deliberately ignores it, like the rear-up: it is
	// a transient, and shading that chased it would flicker the sheen with
	// every flick.
	//
	// EASED BY u_sheetP, like every other ribbon term, and it was the one
	// that was not. A plane that leaves the strip keeps whatever u_sheetV and
	// u_sheetW it was carrying — the flight writes neither, and the landed
	// sync writes neither — so with sheetP the only thing saying "this is not
	// on the ribbon any more", an ungated twist wrung the detail sheet by
	// however fast the strip happened to be moving at the moment it was
	// clicked. Frozen, because nothing decays a uniform nobody writes: open a
	// project mid-scroll and the panel stayed bent for as long as it was on
	// screen. Only mid-scroll, which is what made it look intermittent.
	if (u_sheetV > 0.001 && u_sheetW > 0.001 && u_sheetP > 0.001) {
		float qe = w.x / u_sheetW;

		// 0.3–0.9 of the half-width, not 0.45–1.1: under this perspective
		// the visible frame barely reaches past |q| = 1, so a mask peaking
		// at 1.1 was full strength somewhere off screen — arithmetic with
		// no pixels. Peaking inside the frame is what makes the wring seen.
		a += SHEET_VTWIST * u_sheetV * smoothstep(0.3, 0.9, abs(qe)) * sign(qe) * u_sheetP;
	}

	if (abs(a) < 0.0001) return w;

	float s = sin(a);
	float c = cos(a);

	return vec4(w.x, w.y * c - w.z * s, w.y * s + w.z * c, w.w);
}

// Everything the ribbon does to a world-space point, in the one order that
// composes — so anything that wants to LIE on the surface can take it whole
// rather than reproducing the sequence and drifting from it. The cards use it;
// so do the carousel's titles, which is what puts the type on the ribbon
// instead of in front of it.
vec4 sheet(vec4 w) {
	w = sheetWind(w);
	w.z += sheetZ(w.x) * u_sheetP;

	// The diagonal and the y-wave, AFTER the wind: the roll turns (y, z)
	// about the centreline, and displacing y first would feed the rotation
	// a coordinate that already carried the slope — winding the snake
	// instead of the ribbon. Guarded on u_sheetW, not just eased by
	// u_sheetP: page type rests at sheetP 1 with the ribbon off, and an
	// unguarded shear would tilt every landed title.
	if (u_sheetW > 0.001) {
		float qw = w.x / u_sheetW;

		w.y += SHEET_DIAG * w.x * u_sheetP;
		w.y += SHEET_WAVE * u_sheetW *
			sin(SHEET_PI * (qw * SHEET_WAVE_F + SHEET_WAVE_PH)) * u_sheetP;

		// ── The velocity rear-up ──
		//
		// Speed makes the LEFT side of the ribbon lift and come NEARER —
		// the strip rearing into the frame — rather than the dive digging
		// harder (that response is parked, see VEL_BULGE in the manager: it
		// only made the bulge more aggressive, which reads as more of the
		// same rather than as motion). The mask fades in left of centre, so
		// the right half stays seated and the movement has a fulcrum.
		//
		// u_sheetV is the scroll's own smoothed magnitude (see setVelocity),
		// so this breathes with the gesture and settles as it does. The
		// normals deliberately ignore it: a transient the shading chased
		// would flicker the sheen with every flick.
		if (u_sheetV > 0.001) {
			float m = 1.0 - smoothstep(-1.0, 0.3, qw);

			w.y += SHEET_REAR_Y * u_sheetW * u_sheetV * m * u_sheetP;
			w.z += SHEET_REAR_Z * u_sheetW * u_sheetV * m * u_sheetP;
		}
	}

	return w;
}

// The hover, in the plane's own coordinates: a product of two parabolas, 1 at
// the centre and exactly 0 along every edge, so the silhouette is untouched
// however deep it goes. Off uv rather than off position, so the fragment stage
// can reproduce it exactly.
float sheetDome(vec2 uv) {
	vec2 q = uv * 2.0 - 1.0;
	return (1.0 - q.x * q.x) * (1.0 - q.y * q.y);
}

// 0 at the crests, 1 in the troughs. The dent counts toward it, normalized by
// the wave's OWN range so a card bowed as far back as the trough shades
// exactly as much as the trough — no second constant to drift.
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

// Everything the vertex stage did to z, so the fragment stage can put a point
// back where it actually ended up. The vertex position cannot be interpolated
// down for this: z is the one component that is NOT affine in the plane's own
// coordinates, so the varying would carry the chords again.
float sheetOffset(float wx, vec2 uv, float resY) {
	float z = 0.0;

	if (u_sheetW > 0.001 && u_sheetP > 0.001 && u_sheetD > 0.001) z += sheetZ(wx) * u_sheetP;
	if (u_leanW > 0.001) z += u_leanA * leanRamp(wx / u_leanW) * u_sheetP;
	if (u_hover > 0.0001) z -= u_hover * u_dent * resY * sheetDome(uv);

	return z;
}

// The surface's normal, analytically.
//
// Which is the whole reason this is worth having at all: the sheet is a height
// field with a closed form, so its slope has one too, and the normal falls out
// per fragment exactly. Taking it from the GEOMETRY instead — vertex normals,
// or dFdx of a world position — would hand back the 24 flat facets the mesh is
// actually made of, and a specular exponent is precisely the thing that turns a
// facet edge into a visible seam. It would put the banding back that the shade
// was just rescued from, and harder.
//
// dz/dx has three terms and they simply add: the wave, the door's constant
// slope, and the hover's dome. Only the dome has a dz/dy — the sheet does not
// bend along its own height. (BULGE is missing on purpose: it is zero on the
// strip, and by the time a card has become the detail page's sheet u_shade has
// eased to nothing and none of this is being evaluated.)
vec3 sheetNormal(float wx, vec2 uv, vec2 res) {
	float dzdx = 0.0;
	float dzdy = 0.0;

	// The sweep's own slope, exactly — product rule over the sine and its
	// gaussian tail: dz/dq = -D (pi cos(pi q) - 2 t q sin(pi q)) e^(-t q^2),
	// dq/dx = T/W. Exact rather than approximated because it is what the
	// normal is built from, and an approximate normal under a gloss exponent
	// shows instantly.
	if (u_sheetW > 0.001 && u_sheetP > 0.001 && u_sheetD > 0.001) {
		dzdx += -u_sheetD * sheetShapeSlope(sheetQ(wx)) * u_sheetT / u_sheetW * u_sheetP;
	}

	// The door's exact slope — leanSlope, the derivative of the ramp the
	// vertices actually took, continuous through the frustum edge. It was a
	// constant cut off at |wx| = u_leanW once, and that cut was a visible
	// vertical seam: the normal stepped where the clamp's corner sat, the
	// gloss lit the two sides differently, and perspective put that world-x
	// line in the middle of a wide card. See leanRamp in LEAN.
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

	// Rolled with the surface. The height field above describes the ribbon
	// BEFORE it was wound, so the normal has to take the same turn the vertices
	// took — the identical rotation TWIST applies, about the same world x axis.
	// Skipping it leaves a lit surface facing somewhere the drawn one is not,
	// and a specular exponent finds that immediately.
	float a = sheetRoll(wx);

	if (abs(a) > 0.0001) {
		float s = sin(a);
		float c = cos(a);

		n = vec3(n.x, n.y * c - n.z * s, n.y * s + n.z * c);
	}

	return n;
}


// Up and to the left, and toward the viewer — the direction the door already
// leans the strip away from, so the near edge is the lit one.
const vec3 LIGHT_DIR = normalize(vec3(-0.4, 0.5, 1.0));

// How tight the sheen is. High, because a broad one over a photograph is
// indistinguishable from the whole card getting brighter.
const float LIGHT_GLOSS = 48.0;

// How bright it gets at the peak, added to the image.
const float LIGHT_SPEC = 0.35;

// And how much the surface loses turning away. Small on purpose — see above.
const float LIGHT_DIFF = 0.12;

vec3 sheetLit(vec3 col, vec3 n, vec3 v, float amt) {
	if (amt < 0.001) return col;

	// Wrapped rather than clamped: a hard terminator on a surface this shallow
	// puts a visible line across the card where dot() crosses zero.
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


// ── No hover in here ──
//
// The card's hover used to be a recolour: a Photoshop COLOR blend that kept
// the photograph's luminance and gave it a violet hue, guarded behind a
// uniform branch so a strip at rest paid nothing for it.
//
// It is a POSE now — the tile comes forward, and forward is a z offset stacked
// on the DOM-synced position (see cardPose). Which means the hover has left
// the fragment stage entirely, and that is the right place for it to live: the
// site has a floor and a horizon now, so a card answering the pointer by
// moving in space says more than one changing colour, and it costs no
// fragments at all.
void main() {
	vec4 tex = texture2D(u_texture, uvCover(u_res, u_size, vUv));

	// Depth shade, keyed to the sheet's own depth rather than a screen
	// position: whatever shape the surface takes, the parts furthest from the
	// camera sink toward the page background. Atmospheric perspective, not a
	// black multiply — it reads as distance, not a vignette.
	//
	// The CURVE is evaluated here, per fragment, off the one linear thing the
	// vertex stage sends down. It used to arrive as a varying already turned
	// into a depth, which meant the fragments got the chords across the curve
	// rather than the curve — a ripple, crawling as the strip moved. See SHEET,
	// where the whole of it is written down.
	if (u_shade > 0.001) {
		float depth = sheetShade(vFlat.x, vUv, u_res.y);

		tex.rgb = mix(tex.rgb, vec3(0.059), u_shade * 0.8 * pow(depth, u_shadeS));

		// And the light ON the surface, which is the other half of the question
		// the haze above only answers one side of — see SHEET_LIGHT.
		//
		// The point is put back where the vertex stage actually left it, rather
		// than interpolated: the displacement is added here from the same closed
		// form the geometry used, so the view vector is exact and the sheen
		// cannot inherit a chord. The normal never touched the mesh at all.
		vec3 p = vFlat + vec3(0.0, 0.0, sheetOffset(vFlat.x, vUv, u_res.y));

		tex.rgb = sheetLit(
			tex.rgb,
			sheetNormal(vFlat.x, vUv, u_res),
			normalize(cameraPosition - p),
			u_shade
		);
	}

	// The title's scrim: a dark gradient up from the card's bottom edge, so
	// the caption pinned there (see the strip titles in the manager) reads
	// over whatever the photograph is doing. Squared, so the weight sits at
	// the very edge and the band dissolves rather than stopping on a line.
	//
	// Strength arrives per frame from the manager, riding the SAME edge fade
	// the title takes (see TITLE_FADE) — the scrim exists for the words, so
	// it goes where they go. BEFORE the wash below, deliberately: a card
	// flying to the detail page washes its scrim out with its picture, and
	// the sheet it lands as carries none.
	if (u_scrim > 0.001) {
		float g = 1.0 - smoothstep(0.0, 0.5, vUv.y);
		tex.rgb = mix(tex.rgb, vec3(0.0), u_scrim * 0.65 * g * g);
	}

	// The card does not merely land on the detail page, it BECOMES the page:
	// the image washes out over the flight and is left as the sheet the
	// content sits on. The target colour comes from the landing element's own
	// background-color, so a slot's look is authored in CSS, not in here.
	tex.rgb = mix(tex.rgb, u_wash, u_white);

	float alpha = u_alpha;

	// GL draws these planes, so the DOM card's border-radius has to be cut
	// here or it simply does not exist.
	if (u_corner > 0.0001) {
		vec2 sz = vec2(u_res.x / max(u_res.y, 0.0001), 1.0);
		vec2 mid = sz * 0.5;
		float r = min(u_corner, min(mid.x, mid.y));

		float d = roundedBox(vUv * sz, mid, r);

		float aa = max(fwidth(d), 0.0001);

		alpha *= 1.0 - smoothstep(-aa, aa, d);
	}

	if (u_clipOn > 0.5) alpha *= clipMask(u_clip, u_clipR);

	gl_FragColor = vec4(tex.rgb, alpha);
}