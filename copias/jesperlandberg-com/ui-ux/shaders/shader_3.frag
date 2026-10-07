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

uniform sampler2D u_prev;
uniform vec2 u_texel;   // one texel of THIS buffer, in uv
uniform float u_decay;  // this frame's survival factor, dt-shaped on the CPU
uniform float u_diff;   // this frame's diffusion mix, dt-shaped on the CPU
uniform vec2 u_pos;     // splat centre, uv
uniform float u_amp;    // splat strength — the tension, see syncBall
uniform float u_rad;    // splat radius, width-share
uniform float u_aspect; // ww / wh, for a round splat in a non-square buffer

varying vec2 vUv;

// ── The sheet's memory ──
//
// A height field, accumulated: every frame the previous field survives times
// u_decay, spreads a little into its neighbours (u_diff), and the cursor
// stamps one gaussian on top. That is the whole simulation — no velocity, no
// pressure — and it is enough for what the analytic capsule could not do:
// the field remembers the PATH (a curved stroke stays curved), old ink dies
// while new ink is born, and the edges soften as they fade.
//
// Deliberately NOT a fluid. A stable-fluids build of this exists on the
// metaball-fluid branch and it reads as water — ink carried off the stroke,
// swirling. A ball under a sheet is the opposite bargain: the bump stays
// where the ball made it and dies in place, because fabric has no momentum,
// only tension and relaxation — which is exactly decay and diffusion.
//
// Both rates arrive dt-shaped (exp decays computed on the CPU), so a 120Hz
// frame and a dropped one leave the same cloth behind.
void main() {
	float c = texture2D(u_prev, vUv).r;

	float n = texture2D(u_prev, vUv + vec2(u_texel.x, 0.0)).r
		+ texture2D(u_prev, vUv - vec2(u_texel.x, 0.0)).r
		+ texture2D(u_prev, vUv + vec2(0.0, u_texel.y)).r
		+ texture2D(u_prev, vUv - vec2(0.0, u_texel.y)).r;

	float h = mix(c, n * 0.25, u_diff) * u_decay;

	// The stamp. Distance judged in width-share space — x as-is, y divided
	// by aspect — so the splat is a circle on screen, not an ellipse squeezed
	// by the buffer's shape.
	vec2 d = vUv - u_pos;
	vec2 q = vec2(d.x, d.y / u_aspect);

	h += u_amp * exp(-dot(q, q) / (u_rad * u_rad));

	// Ceiling well above 1, low enough that a hand circling in place cannot
	// wind the field up forever.
	gl_FragColor = vec4(min(h, 1.5), 0.0, 0.0, 1.0);
}