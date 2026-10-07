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

uniform vec3 u_c0;      // what it dissolves INTO — the backdrop's own base
uniform vec3 u_c1;      // the surface's near tint
uniform float u_alpha;  // the whole floor's presence, tweened by show/hide
uniform float u_grid;
uniform vec2 u_gridF;   // cells across the mesh, and along the run

// The fake reflection — see the reflection pass in gl/index and the block at
// the bottom here. A tenth-res capture of the card planes through a MIRRORED
// eye, sampled by projecting this fragment's own world point through that
// camera, and only ever added INSIDE the grid lines.
uniform sampler2D u_refl;
uniform float u_reflA;      // its strength; 0 is off and skips the sample
uniform mat4 u_reflVP;      // the mirrored camera's projection * view
uniform float u_reflSpread; // how hard the cast radiates from the lamp, per vFar
uniform float u_reflLX;     // the lamp's world x the cast radiates from

varying vec2 vUv;
varying vec3 vWorld;
varying float vFar;

void main() {
	// Dissolve rather than a horizon. A floor that ends on a LINE has to
	// answer for what is past it, and the answer is always either a hard
	// seam or a sky that has to match the ground exactly where they meet.
	// Fading it into the backdrop's own base makes the far edge simply stop
	// existing, which is both easier and the more dreamlike of the two.
	// Negative in front of the strip, where the floor carries on toward the
	// camera and off the bottom of the frame. Every term below is written to
	// pass that through untouched: smoothstep clamps it to 0 on its own, so
	// the near half is simply "not yet fading", which is what it should be.
	float fade = 1.0 - smoothstep(0.2, 0.95, vFar);

	// Contact. The cards do not touch this — nothing on this site intersects
	// anything, every material runs depthTest false — so the shadow they would
	// cast is the ONLY thing saying they are standing on it rather than
	// floating in front of it. A tight exponential band at the near edge,
	// which is where the strip's own bottom edge is by construction (the near
	// edge is positioned from a card's rect).
	//
	// One band for the whole strip rather than one pool per card. Per-card
	// would need every card's x in here, and the strip wraps — so the honest
	// version is a list of positions that changes length as cards recycle.
	// The band buys most of the read for none of that, and what it loses
	// (gaps between cards being lighter) is under the cards anyway.
	// abs, so the band sits ON the contact line rather than starting there —
	// the floor runs out in front of the cards now, and a one-sided falloff
	// would put the darkest ground at the bottom of the screen instead of
	// under the thing casting it.
	float contact = exp(-abs(vFar) * 14.0);

	vec3 col = mix(u_c1, u_c0, smoothstep(0.0, 0.8, vFar));
	col *= 1.0 - contact * 0.55;

	// ── The grid ──
	//
	// The one thing that makes a receding plane read as a SURFACE. Without it
	// a floor that fades out is indistinguishable from fog, because a smooth
	// gradient carries no information about the angle it is lying at — the
	// eye needs texture whose spacing compresses with distance.
	//
	// Low contrast on purpose: at full strength this is a grid, and a grid is
	// a different genre entirely. It should be something you notice second.
	//
	// Antialiased by fwidth rather than by a fixed width, which is what makes
	// this affordable at all: the lines get softer exactly as fast as
	// perspective crowds them, so they blur into an even wash at the far end
	// instead of aliasing into moire and then being faded out to hide it.
	// Frequencies handed in rather than written here, because the two axes
	// span different distances: uv.x runs across a mesh several frustums wide
	// and vFar runs the length of the RUN. Counting cells per axis in here
	// would make them square at exactly one viewport shape and lozenges at
	// every other. The manager divides both spans by one world-space cell
	// size, so they are square by construction.
	//
	// STATIC. The grid used to be offset by the strip's travel, and it was
	// wrong: the camera is not moving and neither is the ground — the cards
	// are. A floor that slides under a carousel is a treadmill, and a
	// treadmill is the one thing that cannot also be a room.
	vec2 g = vec2(vUv.x * u_gridF.x, vFar * u_gridF.y);
	vec2 gf = abs(fract(g) - 0.5);
	vec2 gw = fwidth(g) * 1.5;

	vec2 lines = vec2(1.0) - smoothstep(vec2(0.0), gw, gf);

	float line = max(lines.x, lines.y);

	col += line * u_grid * fade;

	// ── The reflection, in the lines only ──
	//
	// The slides again, upside down in the wet lines under them — the small
	// detail only good eyes get. This fragment's world point is projected
	// through the MIRRORED camera (the main eye reflected under the floor
	// plane, see syncEnv), and the capture holds what that eye sees — which
	// along this exact sight-line is the card the floor would reflect. The
	// perspective is therefore the room's own: the image leans and
	// converges with the floor instead of hanging straight down. The
	// capture is a tenth of the resolution, and that coarseness IS the blur
	// — a wet floor does not focus.
	//
	// Confined to the grid's own mask, so the surface between the lines
	// stays dead black and the read is "the lines are slightly wet", never
	// "the floor is a mirror". Faded on the contact band's kind of clock:
	// strongest where the cards stand, gone by mid-run — a reflection that
	// reaches the horizon is a lake.
	//
	// The u_reflA branch is a uniform, so it is one answer for the whole
	// draw: pages with no reflection pay one comparison, not one sample.
	if (u_reflA > 0.001) {
		// The cast RADIATES from the lamp rather than leaning one fixed
		// way: the sampled point slides toward the lamp's x as the fragment
		// leaves the contact line, so every streak stretches away from the
		// light — steeper the further the card is from it, near vertical
		// right under it, and the tilt CHANGES as a card scrolls across.
		// One constant lean read as a decal stamped on the floor; a fan of
		// leans is a lamp in the room.
		vec3 wp = vWorld;
		wp.x -= (vWorld.x - u_reflLX) * u_reflSpread * abs(vFar);

		vec4 rp = u_reflVP * vec4(wp, 1.0);
		vec2 ruv = (rp.xy / max(rp.w, 0.0001)) * 0.5 + 0.5;

		// Outside the capture there is nothing to reflect — but the border
		// is EASED, not stepped: the hard clamp read as the reflection
		// being switched off at a line across the floor, worst toward the
		// camera where the mirrored frustum runs out first.
		vec2 soft = smoothstep(vec2(0.0), vec2(0.1), ruv)
			* (vec2(1.0) - smoothstep(vec2(0.9), vec2(1.0), ruv));
		float ok = soft.x * soft.y;

		vec3 refl = texture2D(u_refl, ruv).rgb;

		// The die-off, asymmetric on purpose. Into the run it is QUICK —
		// gone within the first stretch, a reflection that reaches the
		// horizon is a lake. TOWARD the camera it lingers, a long gentle
		// tail instead of a cut: that side is the floor the viewer is
		// standing on, and light dies slowly across a surface it is
		// grazing.
		float fall = exp(-((vFar > 0.0) ? vFar * 6.0 : -vFar * 2.2));

		col += refl * line * u_reflA * fall * ok * fade;
	}

	gl_FragColor = vec4(col, u_alpha * fade);
}