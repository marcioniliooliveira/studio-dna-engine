import{g}from"./setup.ehf6vWB0.js";import{p as R}from"./motion.C0Ky0Fmd.js";const m=1.5,E=-.75,S=.85,A="power1.in",P=`
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,T=`
precision mediump float;
varying vec2 vUv;
uniform float uProgress;
uniform vec3 uColor;

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);
  float a = rand(ip);
  float b = rand(ip + vec2(1.0, 0.0));
  float c = rand(ip + vec2(0.0, 1.0));
  float d = rand(ip + vec2(1.0, 1.0));
  float res = mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  return res * res;
}

void main() {
  float n = noise(vUv * 5.0);
  float edge = 0.185;
  float dissolve = smoothstep(1.0 - uProgress - edge, 1.0 - uProgress + edge, n);
  float alpha = 1.0 - dissolve;
  gl_FragColor = vec4(uColor, alpha);
}
`;let a=null;function h(t,o,e){const r=t.createShader(o);if(!r)throw new Error("createShader failed");if(t.shaderSource(r,e),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS)){const n=t.getShaderInfoLog(r)??"unknown";throw t.deleteShader(r),new Error(`Dissolve shader compile: ${n}`)}return r}function L(t){const o=h(t,t.VERTEX_SHADER,P),e=h(t,t.FRAGMENT_SHADER,T),r=t.createProgram();if(!r)throw new Error("createProgram failed");if(t.attachShader(r,o),t.attachShader(r,e),t.linkProgram(r),t.deleteShader(o),t.deleteShader(e),!t.getProgramParameter(r,t.LINK_STATUS))throw new Error(`Dissolve program link: ${t.getProgramInfoLog(r)}`);return r}function _(){const t=document.getElementById("dissolve-mount"),o=document.createElement("canvas");o.style.cssText="position:fixed;inset:0;width:100%;height:100%;z-index:120;pointer-events:none;visibility:hidden;",(t??document.body).appendChild(o);const e=o.getContext("webgl")??o.getContext("experimental-webgl");if(!e)throw new Error("WebGL not supported");const r=L(e);e.useProgram(r);const n=new Float32Array([-1,-1,1,-1,-1,1,1,1]),s=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,s),e.bufferData(e.ARRAY_BUFFER,n,e.STATIC_DRAW);const i=e.getAttribLocation(r,"aPosition");e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0);const l=e.getUniformLocation(r,"uProgress"),u=e.getUniformLocation(r,"uColor");if(!l||!u)throw new Error("Dissolve uniform not found");e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA);const v={canvas:o,gl:e,program:r,uProgressLoc:l,uColorLoc:u,progress:m,color:[0,0,0],activeTween:null},f=()=>{const d=Math.min(devicePixelRatio,2);o.width=Math.round(window.innerWidth*d),o.height=Math.round(window.innerHeight*d),e.viewport(0,0,o.width,o.height)};return f(),window.addEventListener("resize",f),v}function c(t){const{gl:o,program:e,uProgressLoc:r,uColorLoc:n,progress:s,color:i}=t;o.useProgram(e),o.uniform1f(r,s),o.uniform3f(n,i[0],i[1],i[2]),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),o.drawArrays(o.TRIANGLE_STRIP,0,4)}function p(){return a||(a=_()),a}function C(t){const o=p(),e=parseInt(t.slice(1,3),16)/255,r=parseInt(t.slice(3,5),16)/255,n=parseInt(t.slice(5,7),16)/255;o.color=[e,r,n]}function b(t=S,o){if(R()){o?.();return}const e=p();e.activeTween&&e.activeTween.kill(),e.canvas.style.visibility="visible",c(e),e.activeTween=g.to(e,{progress:E,duration:t,ease:A,onUpdate:()=>c(e),onComplete:()=>{c(e),e.activeTween=null,o?.()}})}function w(){a&&(a.activeTween&&a.activeTween.kill(),a.activeTween=null,a.progress=m,c(a),a.canvas.style.visibility="hidden")}const y="#edeae6",I=.85,U={"/":"#262220","/about":"#faf9f6","/works":"#edeae6"};function O(t,o=y){let e;try{e=t instanceof URL?t:new URL(t,window.location.href)}catch{return o}if(e.origin!==window.location.origin)return o;const r=e.pathname.replace(/\/$/,"")||"/";return r.startsWith("/works/")&&r!=="/works"?"#faf9f6":U[r]??o}function D(t){return t.metaKey||t.ctrlKey||t.shiftKey||t.altKey}function N(t){const o=t.getAttribute("href");if(!o||o.startsWith("#")||t.target&&t.target!=="_self"||t.hasAttribute("download")||t.closest("dialog"))return null;let e;try{e=new URL(o,window.location.href)}catch{return null}if(e.origin!==window.location.origin||e.protocol!=="http:"&&e.protocol!=="https:")return null;const r=new URL(window.location.href);return e.pathname===r.pathname&&e.search===r.search&&e.hash!==r.hash||e.href===r.href?null:e}function k(){let t=!1;const o=r=>{if(r.defaultPrevented||r.button!==0||D(r))return;const n=r.target;if(!(n instanceof Element))return;const s=n.closest("a[href]");if(!s)return;const i=N(s);if(i&&(r.preventDefault(),!t)){t=!0;try{C(s.dataset.transitionColor??O(i)),b(I,()=>{window.location.assign(i.href)})}catch{window.location.assign(i.href)}}},e=()=>{t=!1,w()};return document.addEventListener("click",o),window.addEventListener("pagehide",e),()=>{document.removeEventListener("click",o),window.removeEventListener("pagehide",e),w()}}export{b as c,k as i,O as r,C as s};
