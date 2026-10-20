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


precision highp float;

// ── One instance: one glyph ──
in vec2 aOrigin; // pen position, px from the plane's top-left (y down)
in float aSize;  // font size, px — per glyph, not per plane: a <sup> or a
                 // pill's label inside a larger block is its own size
in vec4 aBBox;   // ink box, em, y UP
in vec2 aGlyph;  // band table texel, band count
in vec2 aSpan;   // where this glyph sits ACROSS its line: start, width (0..1)

// Per line, carried per instance — the reveal is unchanged from the canvas
// plane, it is simply asked of a letter instead of a row.
in float aLine;  // line index — drives the stagger
in float aPitch; // px: slide distance = the mask window's height
in float aCut;   // px from the plane's top: this line's resting ink top
in float aMid;   // plane-local y of this line's resting centre

// ── The slot machine ──
//
// A digit position is a REEL: the same screen slot carrying all ten glyphs,
// stacked one reel-height apart, of which exactly one is inside the line box
// at rest. Rolling is then a single number per position — which digit is
// currently at the window — and the mask already written for the line reveal
// does the clipping for free.
//
// aReel is which digit this instance is (0..9) and aSlot is which position it
// spins in. A glyph that is not a digit gets aSlot -1, which is the test the
// offset below reads: the currency mark, the k and the dash sit in the line
// like ordinary type, and a reel next to them must not carry them off with it.
// On every plane that is not a reel, u_reel is 0 and the whole term goes.
in float aReel;
in float aSlot;

// Per-instance opacity, 1 unless a reflow is running. See reflow.js: when the
// string changes shape the positions that survive SLIDE, and this is what the
// ones that do not get instead — a digit that has just been born comes up from
// 0 while its neighbours move over to make room, and one whose place has gone
// goes down to 0 where it stood.
in float aFade;

uniform float u_reel;      // 0 = an ordinary text plane, 1 = a reel
uniform float u_reelH;     // one reel step, plane px
uniform float u_roll[16];  // per position: the digit at the window, fractional
uniform float u_spin[16];  // ...and how far it travelled last frame, plane px

uniform float u_tunnelR; // tunnel radius, world units (0 = flat)
uniform float u_tunnelY; // world y of the tunnel axis (viewport center)
uniform float u_tunnelP; // wrap strength: 1 in the list, 0 once flown out
uniform float u_fadeAng; // wrap angle at which a line is fully gone
uniform float u_bow;     // signed scroll velocity, world units

// The full index's mouse field — see the sway below. xy the field's centre in
// world, zw its half-extents, then spread and amplitude, then presence.
uniform vec4 u_avoid;
uniform vec2 u_avoidF;
uniform float u_avoidP;

// The blast: a SECOND field, same shape, for the chosen row's sheet growing in.
uniform vec4 u_avoid2;
uniform vec2 u_avoidF2;
uniform float u_avoidP2;

// The carousel titles' float off the ribbon, toward the camera.
uniform float u_lift;

uniform float u_twist;   // resting roll across a LINE's width, radians
uniform float u_twistIn; // extra roll the reveal unwinds from
uniform float u_riseIn;  // entrance travel, in line heights

uniform float u_progress;
uniform float u_window;  // one line's duration, as a share of the timeline
uniform float u_stagger; // per-line start offset, same units
uniform float u_planeW;  // plane width in css px
uniform float u_planeH;  // plane height in css px

out vec2 v_em;           // this fragment's place in the glyph, em, y up
flat out vec2 v_glyph;   // band table texel, band count
flat out vec4 v_bbox;
varying float vWrap;
varying float vP;
varying float vYEl;      // fragment y in plane px, top-down, AFTER the slide
varying float vEdgeTop;
varying float vEdgeBot;
varying float vFade;
varying float vBlur;
varying vec2 vPx;


uniform float u_bulgeA; // signed amplitude, world units (0 = flat)
uniform float u_bulgeH; // frustum half-height at z=0

vec4 bulge(vec4 w) {
	if (u_bulgeH > 0.001) {
		float t = clamp(w.y / u_bulgeH, -1.0, 1.0);
		w.z += u_bulgeA * (1.0 - t * t);
	}
	return w;
}


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


// across is -0.5…0.5 over the whole ribbon this vertex belongs to, which is
// the plane itself only when the plane is the whole line.
vec4 twist(vec4 w, float across, vec3 pivot, float a) {
	if (abs(a) < 0.0001) return w;

	// The pivot through the model matrix, so the offset from it already
	// carries the mesh's (non-uniform) scale — this rolls the quad as it is
	// actually drawn.
	vec3 c = (modelMatrix * vec4(pivot, 1.0)).xyz;
	vec3 d = w.xyz - c;

	float s = sin(a * across);
	float co = cos(a * across);

	return vec4(c + vec3(d.x, d.y * co - d.z * s, d.y * s + d.z * co), w.w);
}


uniform vec3 u_lens;  // xy: centre in world; z: radius, world units
uniform float u_lensA; // how far the surface gives at the centre of the field
uniform float u_pillA;

vec4 pillLens(vec4 w) {
	if (u_pillA < 0.0001 || u_lens.z < 0.0001) return w;

	vec2 q = w.xy - u_lens.xy;

	// dot() rather than length(): the profile is a function of the SQUARED
	// distance either way, so the root would only be squared again.
	float k = max(1.0 - dot(q, q) / (u_lens.z * u_lens.z), 0.0);

	w.xy += q * u_lensA * u_pillA * k * k;

	return w;
}


void main() {
	// ── The glyph's own box ──
	//
	// The ink box, padded so the edge's anti-aliasing has somewhere to land.
	// In EM, so the pad is a real pixel at this glyph's size — and two of
	// them rather than one, because the pill's lens magnifies a label and a
	// one-pixel skirt at rest is half a pixel short once it is stretched.
	float pad = 2.0 / aSize;
	vec2 lo = aBBox.xy - pad;
	vec2 hi = aBBox.zw + pad;

	// ── Motion blur, and why the QUAD has to grow for it ──
	//
	// A reel at speed travels most of a digit's height between two frames, and
	// a digit drawn sharp at each of those places reads as a strobe rather than
	// as a wheel. u_spin is that distance — the roll's own delta, so the smear
	// is the real one and not a guess at it — and the fragment stage averages
	// the glyph's coverage along it.
	//
	// It cannot do that inside the quad it has: the quad is the ink box plus
	// two pixels, so a sample half a digit above the fragment falls outside and
	// comes back empty, and the smear would be sheared off at the letter's own
	// edge. So the box opens by the blur, in em, and v_em stretches with it —
	// the mapping is mix(lo, hi, uv), so widening the range IS the extra room.
	//
	// Capped hard, and the cap is a LOOK rather than a budget. An expo ease
	// leaves the first frame of a spin travelling several digit heights, and
	// past about two thirds of a line more smear adds no information — it is
	// already a band — while costing the taps below a longer stretch of
	// high-contrast signal to sample, which is where the grain comes from. So
	// the smear saturates and the reel reads as a band from there up.
	float blur = 0.0;

	if (u_reel > 0.5 && aSlot > -0.5) {
		blur = min(abs(u_spin[int(aSlot + 0.5)]) / aSize, 0.7);
	}

	lo.y -= blur * 0.5;
	hi.y += blur * 0.5;

	// unit quad corner -> em -> plane px (y down, as the DOM measures)
	vec2 em = mix(lo, hi, uv);
	vec2 gpx = aOrigin + vec2(em.x, -em.y) * aSize;

	// The reel turns. A position showing digit u_roll puts instance aReel that
	// many steps above the window, so the integer part chooses the glyph and
	// the fraction is the travel between two of them. Nothing is hidden here —
	// every one of the ten is drawn every frame and the line mask in the
	// fragment stage keeps the one that is home, which is cheaper than any
	// arrangement that tried to be clever about which to submit.
	//
	// mod() rather than a subtraction, so a roll of 12.5 on a ten-digit reel
	// is the same picture as 2.5 and a tween can keep counting upward through
	// as many laps as it likes without the strip running out.
	//
	// aSlot is negative on every glyph that is not a digit — the currency mark,
	// the k, the dash. Those sit in the line like ordinary type and must not
	// take the offset: reading a roll for them would slide the whole of "$k"
	// off the window the moment the reel next to it moved, which is exactly
	// what it did before this test existed.
	if (u_reel > 0.5 && aSlot > -0.5) {
		float roll = u_roll[int(aSlot + 0.5)];
		float step = mod(aReel - roll, 10.0);

		// the shortest way round, so the strip reads as a wheel rather than
		// nine digits scrolling past on the long side
		if (step > 5.0) step -= 10.0;

		gpx.y += step * u_reelH;
	}

	// ...and into the plane's own frame, which is where every deformation
	// below already speaks. This is the whole structural difference from the
	// canvas plane: there, the position arrived as an attribute of a per-line
	// grid; here it is built per glyph and everything downstream is untouched.
	vec3 p = vec3(gpx.x / u_planeW - 0.5, 0.5 - gpx.y / u_planeH, 0.0);

	// The resting position in plane px, for the highlight box (see u_hi in
	// the fragment): before the slide, so a word still masking in is judged
	// against where it will sit rather than where it is on its way there.
	vPx = gpx;

	// Where this vertex sits across its LINE — what uv.x meant when the quad
	// was the line. The bow and the roll are both parabolas across a line, so
	// a glyph quad has to carry the position it can no longer infer.
	float across01 = aSpan.x + uv.x * aSpan.y;

	// ── Line reveal ──
	// Ordered top-to-bottom stagger, expo out per line. Unchanged: it is a
	// function of a per-line constant and plane-space y, and it never cared
	// whether the quad carrying it was a row or a letter.
	float lp = clamp((u_progress - aLine * u_stagger) / max(u_window, 0.0001), 0.0, 1.0);
	lp = 1.0 - pow(2.0, -10.0 * lp);

	// The quad slides: (1 - p) of its pitch, downward. At rest it sits exactly
	// where the DOM measured it.
	float slide = (1.0 - lp) * aPitch / u_planeH;
	p.y -= slide;

	// The window it rises into. The top edge is the line's resting ink top,
	// starting a touch lower to keep the anti-aliasing out, and lifting as the
	// line lands.
	//
	// The canvas plane also eased the BOTTOM edge down by aOver, to release a
	// descender rather than pop it in. That term is gone because it was always
	// zero: aOver is max(0, h - pitch) and pitch is 1.15h.
	vFade = aFade;
	vBlur = blur;

	// The mask window. For ordinary type it is the line's PITCH — 1.15 line
	// heights, the slack a descender needs to rise into its box without being
	// shaved (see aPitch) — and the top edge walks down with the reveal.
	//
	// A reel takes the line box exactly instead. Its window is not a reveal, it
	// is the machine's aperture: every one of the ten digits is submitted every
	// frame and this is what keeps nine of them off screen. At 1.15 the extra
	// fifteen percent is a band ABOVE and BELOW the line where the neighbouring
	// digits show through, and since the readout is display size that is a
	// dozen px of stray glyph over the heading and the bar. Tight, a digit
	// mid-travel is still cut in half by the aperture, which is the picture
	// that was wanted; it just stops at the line the type sits on.
	vEdgeTop = aCut + (u_reel > 0.5 ? 0.0 : (1.0 - lp) * 1.5);
	vEdgeBot = aCut + (u_reel > 0.5 ? u_reelH : aPitch);
	vYEl = (0.5 - p.y) * u_planeH;
	vP = lp;

	vec4 w = modelMatrix * vec4(p, 1.0);

	// The line's own roll: its top and bottom edges wind past each other across
	// its length. Two sources summed — the resting roll and the reveal's, which
	// every line unwinds as it arrives — so a line settles INTO the roll it is
	// going to keep instead of passing through flat on the way to it.
	//
	// across01 minus a half rather than the plane-local x the canvas plane passed:
	// TWIST's own contract asks for a position across the RIBBON, and on a
	// wrapping block the plane is several ribbons side by side.
	w = twist(w, across01 - 0.5, vec3(0.0, aMid - slide, 0.0), u_twist * u_tunnelP + u_twistIn * (1.0 - lp));

	// The entrance TRAVEL: the line starts below its slot by a real distance
	// and rises on the same eased clock the slide and the window share.
	w.y -= (1.0 - lp) * u_riseIn * (aPitch / u_planeH) * modelMatrix[1][1];

	// Velocity bow: the middle of each line lags behind its ends, so the type
	// flexes like a rope being dragged. Parabolic across the line's own width —
	// zero at both ends, so neighbouring lines never tear apart at the seams.
	float across = across01 * 2.0 - 1.0;
	w.y += u_bow * (1.0 - across * across);

	// ── The sway ──
	//
	// The cursor's field on the full index: a round magnifier, not a starburst.
	// The displacement is the offset from the field's centre itself, scaled.
	if (u_avoidP > 0.0005) {
		vec2 aq = w.xy - u_avoid.xy;
		float t = max(length(aq / u_avoid.zw), 0.001);

		w.xy += aq * u_avoidF.y * exp(-t / max(u_avoidF.x, 0.001)) * u_avoidP;
	}

	// The blast, summed on top — the field the pointer built holds perfectly
	// still while this one shoves.
	if (u_avoidP2 > 0.0005) {
		vec2 aq2 = w.xy - u_avoid2.xy;
		float t2 = max(length(aq2 / u_avoid2.zw), 0.001);

		w.xy += aq2 * u_avoidF2.y * exp(-t2 / max(u_avoidF2.x, 0.001)) * u_avoidP2;
	}

	float th = 0.0;

	if (u_tunnelR > 0.001 && u_tunnelP > 0.001) {
		th = (w.y - u_tunnelY) / u_tunnelR;
		w.y = mix(w.y, u_tunnelY + u_tunnelR * sin(th), u_tunnelP);
		w.z += u_tunnelR * (cos(th) - 1.0) * u_tunnelP;
		th *= u_tunnelP;
	}

	vWrap = u_fadeAng > 0.0001 ? abs(th) / u_fadeAng : 0.0;

	// Onto the ribbon — the same surface the cards lie on, through the same
	// function off the same uniforms. Page text passes no attitude, so u_sheetD
	// stays 0 and both terms fall out.
	w = sheet(w);

	// A small constant float toward the camera, AFTER the curve, so the type
	// rides the identical surface a fixed distance above it.
	w.z += u_lift * u_sheetP;

	// The same door the cards hang off.
	w = lean(w, u_tunnelP);

	// A pill's fisheye, when this label sits on one — the SAME world-space
	// field its fill takes, so the word stretches with the surface under it.
	w = pillLens(w);

	w = bulge(w);

	v_em = em;
	v_glyph = aGlyph;
	v_bbox = aBBox;

	gl_Position = projectionMatrix * viewMatrix * w;
}