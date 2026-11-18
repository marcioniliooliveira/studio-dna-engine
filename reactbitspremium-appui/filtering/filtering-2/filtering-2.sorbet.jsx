/**
 * React Bits Pro — Application UI (filtering-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, key, left, observe, preventDefault, useCallback, useEffect, useMemo, useRef, useState, width } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_24437 = [["path",{d:"M5.5 20.75C7.433 20.75 9 19.183 9 17.25C9 15.317 7.433 13.75 5.5 13.75C3.567 13.75 2 15.317 2 17.25C2 19.183 3.567 20.75 5.5 20.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18.5 20.75C20.433 20.75 22 19.183 22 17.25C22 15.317 20.433 13.75 18.5 13.75C16.567 13.75 15 15.317 15 17.25C15 19.183 16.567 20.75 18.5 20.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11.9986 19V16.433C11.9986 15.8816 11.9986 15.6059 11.9272 15.3484C11.8838 15.1918 11.821 15.0411 11.7404 14.8997C11.6079 14.6675 11.412 14.4725 11.0201 14.0826L10.9325 13.9955C10.7793 13.8431 10.6398 13.7043 10.5132 13.5763M19.9971 11H18.6523C17.936 11 17.5778 11 17.2526 10.8836C17.1522 10.8477 17.0548 10.8038 16.9615 10.7522C16.6593 10.5854 16.3532 10.4295 15.8814 9.89313L15.6377 9.61598C14.8646 8.73692 14.478 8.2974 14.0073 8.12342C13.6378 7.98687 13.2358 7.96302 12.8526 8.0549C12.3644 8.17197 11.9281 8.56267 11.0554 9.34406C10.1519 10.1531 9.70012 10.5576 9.53345 11.0424C9.40273 11.4226 9.39187 11.8334 9.50232 12.2199C9.61806 12.6249 9.92895 12.9858 10.5132 13.5763M14.9717 9.63338L10.5132 13.5763M10.5132 13.5763L10.5121 13.5772",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["circle",{cx:"16.5",cy:"4.75",r:"1.5",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];
const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];

let d = (...e)=>e.filter(Boolean).join(" ");

let _ = "text-neutral-900/62 dark:text-neutral-100/62";

let b = "border border-neutral-900/12 dark:border-neutral-100/14";

let u = "text-[15px]/[20px] font-bold";

let x = "text-[14px]/[20px] font-medium";

let p = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let h = "relative inline-flex size-[18px] shrink-0 items-center justify-center";

let k = "peer size-[18px] shrink-0 cursor-pointer appearance-none rounded-[calc(var(--rb-r-sm,6px))] border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(84%_0.15_165))] checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] indeterminate:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:bg-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:indeterminate:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:shadow-none dark:indeterminate:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:bg-neutral-100/28";

let m = "pointer-events-none absolute scale-50 text-[var(--rb-accent-fg,oklch(26%_0.06_168))] opacity-0 transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:scale-100 peer-indeterminate:opacity-100 peer-active:scale-[0.86] motion-reduce:transition-none dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))]";

let v = "relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40";

let g = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let $ = (...e)=>e.filter(Boolean).join(" ");

let q = "bg-white dark:bg-neutral-950";

let I = "text-neutral-900 dark:text-neutral-100";

let B = "border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7";

let F = "text-[15px]/[20px] font-bold";

let K = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let O = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let U = "relative inline-flex size-[18px] shrink-0 items-center justify-center";

let V = "peer size-[18px] shrink-0 cursor-pointer appearance-none rounded-[calc(var(--rb-r-sm,6px))] border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(84%_0.15_165))] checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] indeterminate:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:bg-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:indeterminate:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:shadow-none dark:indeterminate:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:bg-neutral-100/28";

let G = "pointer-events-none absolute scale-50 text-[var(--rb-accent-fg,oklch(26%_0.06_168))] opacity-0 transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:scale-100 peer-indeterminate:opacity-100 peer-active:scale-[0.86] motion-reduce:transition-none dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))]";

let Q = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let X = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let Y = "ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62";

let J = "inline-flex h-8 cursor-pointer items-center rounded-[calc(var(--rb-r-full,999px))] px-3 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100";

function Z({min:e,max:a,step:r=1,value:n,onChange:i,format:o,labels:s}){
  let c=useRef(null),[d,_]=useState(null),b=t=>Math.min(a,Math.max(e,Math.round(t/r)*r)),u=r=>(r-e)/(a-e)*100,x=r=>{
    let t=c.current;
    if(!t)return e;
    let l=t.getBoundingClientRect();
    return 0===width?e:b(e+(r-left)/width*(a-e));
  },p=(e,a)=>{
    let[r,t]=n;
    0===e?i([Math.min(a,t),t]):i([r,Math.max(a,r)])
  },h=t=>({role:"slider",tabIndex:0,"aria-label":s[t],"aria-valuemin":e,"aria-valuemax":a,"aria-valuenow":n[t],"aria-valuetext":o(n[t]),style:{left:`${u(n[t])}%`,touchAction:"none"},onPointerDown:e=>{
    e.preventDefault(),e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId),_(t)
  },onPointerMove:e=>{
    d===t&&p(t,x(e.clientX))
  },onLostPointerCapture:()=>_(null),onPointerUp:e=>{
    e.currentTarget.releasePointerCapture(e.pointerId),_(null)
  },onKeyDown:l=>{
    let i=Math.max(r,Math.round((a-e)/10)),o=n[t],s=null;
    "ArrowLeft"===key||"ArrowDown"===key?s=o-r:"ArrowRight"===key||"ArrowUp"===key?s=o+r:"PageDown"===key?s=o-i:"PageUp"===key?s=o+i:"Home"===key?s=e:"End"===key&&(s=a),null!==s&&(preventDefault(),p(t,b(s)))
  },className:"absolute top-1/2 block size-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[scale] duration-[240ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-110 active:cursor-grabbing motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-white"});
  return (
    <div ref={c} onPointerDown={e=>{
        let a=x(e.clientX);
        p(Math.abs(a-n[0])<=Math.abs(a-n[1])?0:1,a)
      }} className="relative flex h-4 w-full cursor-pointer touch-none items-center select-none">
        <div className="relative h-2 w-full grow rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/14 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
          <span className="absolute inset-y-0 rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{left:`${u(n[0])}%`,width:`${u(n[1])-u(n[0])}%`}} />
          <div {...h(0)} />
          <div {...h(1)} />
        </div>
      </div>
  );
}

let ee = [{value:"all",label:"All"},{value:"road",label:"Road"},{value:"gravel",label:"Gravel"},{value:"mountain",label:"Mountain"},{value:"city",label:"City"}];

let ea = [{value:"xs",label:"48 cm"},{value:"s",label:"51 cm"},{value:"m",label:"54 cm"},{value:"l",label:"56 cm"},{value:"xl",label:"58 cm"}];

let er = [{value:"likenew",label:"Like new"},{value:"excellent",label:"Excellent"},{value:"good",label:"Good"},{value:"fair",label:"Fair"}];

let et = [{value:"105",label:"Shimano 105"},{value:"grx",label:"Shimano GRX"},{value:"deore",label:"Shimano Deore"},{value:"rival",label:"SRAM Rival"},{value:"gx",label:"SRAM GX"}];

let el = [{id:"b1",name:"Canyon Endurace 7",discipline:"road",size:"m",price:1450,condition:"excellent",groupset:"105"},{id:"b2",name:"Specialized Allez",discipline:"road",size:"s",price:780,condition:"good",groupset:"105"},{id:"b3",name:"Trek \xc9monda SL",discipline:"road",size:"l",price:2100,condition:"likenew",groupset:"105"},{id:"b4",name:"Giant TCR Advanced",discipline:"road",size:"m",price:1650,condition:"excellent",groupset:"rival"},{id:"b5",name:"Cannondale CAAD13",discipline:"road",size:"s",price:1200,condition:"good",groupset:"rival"},{id:"b6",name:"Bianchi Via Nirone",discipline:"road",size:"xl",price:690,condition:"fair",groupset:"105"},{id:"b7",name:"Cerv\xe9lo \xc1spero",discipline:"gravel",size:"l",price:2600,condition:"likenew",groupset:"grx"},{id:"b8",name:"Salsa Warbird",discipline:"gravel",size:"m",price:1900,condition:"excellent",groupset:"grx"},{id:"b9",name:"Cannondale Topstone",discipline:"gravel",size:"s",price:1350,condition:"good",groupset:"rival"},{id:"b10",name:"Kona Rove AL",discipline:"gravel",size:"l",price:850,condition:"fair",groupset:"grx"},{id:"b11",name:"Santa Cruz Tallboy",discipline:"mountain",size:"l",price:3200,condition:"excellent",groupset:"gx"},{id:"b12",name:"Trek Fuel EX 8",discipline:"mountain",size:"m",price:2400,condition:"good",groupset:"deore"},{id:"b13",name:"Specialized Rockhopper",discipline:"mountain",size:"s",price:620,condition:"good",groupset:"deore"},{id:"b14",name:"Giant Trance X",discipline:"mountain",size:"xl",price:2850,condition:"likenew",groupset:"gx"},{id:"b15",name:"Kona Process 134",discipline:"mountain",size:"m",price:1750,condition:"fair",groupset:"deore"},{id:"b16",name:"Brompton C Line",discipline:"city",size:"m",price:1100,condition:"excellent",groupset:"deore"},{id:"b17",name:"Trek FX 3 Disc",discipline:"city",size:"s",price:480,condition:"good",groupset:"deore"},{id:"b18",name:"Priority Continuum",discipline:"city",size:"l",price:720,condition:"likenew",groupset:"deore"}];

let en = e=>`$${e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}`;

let ei = {size:[],condition:[],groupset:[],price:[400,3500]};

let eo = (e,a,r,t)=>("all"===a||e.discipline===a)&&("size"===t||!r.size.length||!!r.size.includes(e.size))&&("condition"===t||!r.condition.length||!!r.condition.includes(e.condition))&&("groupset"===t||!r.groupset.length||!!r.groupset.includes(e.groupset))&&("price"===t||!(e.price<r.price[0])&&!(e.price>r.price[1]))&&true;

function es({label:e,children:a}){
  return (
    <section className="py-5">
        <h3 className={$(F,"mb-3")}>{e}</h3>
        {a}
      </section>
  );
}


export default function filtering_2__Sorbet__Component(){
  let[e,a]=useState(true),[r,i]=useState("all"),[d,_]=useState(ei),{ref:b,edges:u,onScroll:x}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),p=(e,a)=>_(r=>({...r,[e]:r[e].includes(a)?r[e].filter(e=>e!==a):[...r[e],a]})),h=useMemo(()=>el.filter(e=>eo(e,r,d)), [r,d]),k=(e,a)=>el.filter(t=>eo(t,r,d,e)&&t[e]===a).length,m=400!==d.price[0]||3500!==d.price[1],v=d.size.length+d.condition.length+d.groupset.length+ +("all"!==r)+ +!!m,g=()=>{
    i("all"),_(ei)
  };
  return e?<div className={$(q,I,"relative flex h-full min-h-[760px] w-full flex-col items-center overflow-hidden p-8 sm:p-10")}>
    <div className={$(Q,"w-full max-w-[420px] flex-1")}>
      <header className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <h2 className="text-[17px]/[22px] font-extrabold">Filters</h2>
          <p className={$("text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5 flex flex-wrap gap-x-3")}>
            <span>Second-hand bikes</span>
            {v>0&&<span>
              <span className="tabular-nums">{v}</span>
              {" active"}
            </span>}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={g} disabled={0===v} className={$(J,"disabled:pointer-events-none disabled:opacity-40")}>Clear all</button>
          <button type="button" aria-label="Close filters" onClick={()=>a(false)} className={$("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-10 rounded-[calc(var(--rb-r-full,999px))]")}>
            <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className={$(B,"relative min-h-0 flex-1")}>
        <div ref={b} onScroll={x} className="h-full overflow-y-auto px-5">
          <div className="divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7">
            <es label="Discipline">
              <div role="radiogroup" aria-label="Discipline" className={$("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","w-full")}>
                {ee.map(e=>{
                  let a=r===e.value;
                  return <button key={e.value} type="button" role="radio" aria-checked={a} onClick={()=>i(e.value)} className={$("relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40","grow")}>{e.label}</button>;
                })}
              </div>
            </es>
            <es label="Frame size">
              <ul className="-mx-2 space-y-0.5">
                {ea.map(e=>{
                  let a=k("size",e.value),r=d.size.includes(e.value);
                  return (
                    <li key={e.value}>
                                        <label className={$(X,"h-9",0===a&&!r&&"opacity-40")}>
                                          <span className={U}>
                                            <input type="checkbox" checked={r} onChange={()=>p("size",e.value)} className={V} />
                                            <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2.5} aria-hidden="true" className={G} />
                                          </span>
                                          <span className="min-w-0 flex-1 truncate">{e.label}</span>
                                          <span className={$(Y,"shrink-0")}>{a}</span>
                                        </label>
                                      </li>
                  );
                })}
              </ul>
            </es>
            <es label="Price">
              <div className="mb-4 flex min-h-7 items-center justify-between">
                <span className={$(F,"tabular-nums")}>
                  {en(d.price[0])}
                  {" – "}
                  {en(d.price[1])}
                </span>
                {m&&<button type="button" onClick={()=>_(e=>({...e,price:[400,3500]}))} className={J}>Reset</button>}
              </div>
              <Z min={400} max={3500} step={50} value={d.price} onChange={e=>_(a=>({...a,price:e}))} format={en} labels={["Minimum price","Maximum price"]} />
            </es>
            <es label="Condition">
              <div className="flex flex-wrap gap-2">
                {er.map(e=>{
                  let a=d.condition.includes(e.value),r=k("condition",e.value);
                  return <button key={e.value} type="button" aria-pressed={a} onClick={()=>p("condition",e.value)} className={$("relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40",0===r&&!a&&"opacity-40")}>{e.label}</button>;
                })}
              </div>
            </es>
            <es label="Groupset">
              <ul className="-mx-2 space-y-0.5">
                {et.map(e=>{
                  let a=k("groupset",e.value),r=d.groupset.includes(e.value);
                  return (
                    <li key={e.value}>
                                        <label className={$(X,"h-9",0===a&&!r&&"opacity-40")}>
                                          <span className={U}>
                                            <input type="checkbox" checked={r} onChange={()=>p("groupset",e.value)} className={V} />
                                            <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2.5} aria-hidden="true" className={G} />
                                          </span>
                                          <span className="min-w-0 flex-1 truncate">{e.label}</span>
                                          <span className={$(Y,"shrink-0")}>{a}</span>
                                        </label>
                                      </li>
                  );
                })}
              </ul>
            </es>
          </div>
        </div>
        <div aria-hidden="true" className={$("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 top-0 h-8",u.start?"opacity-100":"opacity-0")} />
        <div aria-hidden="true" className={$("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 bottom-0 h-8",u.end?"opacity-100":"opacity-0")} />
      </div>
      <div className={$(B,"flex items-center gap-2 p-2 ps-3")}>
        <button type="button" onClick={g} disabled={0===v} className={$(J,"disabled:pointer-events-none disabled:opacity-40")}>Reset</button>
        <button type="button" onClick={()=>a(false)} disabled={0===h.length} className={$(K,O,"flex-1")}>
          {0===h.length?"No bikes match":<span>
            {"Show "}
            <span className="tabular-nums">{h.length}</span>
            {" "}
            {1===h.length?"result":"results"}
          </span>}
        </button>
      </div>
    </div>
  </div>:<div className={$(q,I,"relative flex h-full min-h-[760px] w-full flex-col items-center justify-center overflow-hidden p-8 sm:p-10")}>
    <div className={$(Q,"w-full max-w-[420px] items-center px-6 py-10 text-center")}>
      <div className={$("text-neutral-900/78 dark:text-neutral-100/78","mb-3 flex h-10 w-10 items-center justify-center")}>
        <HugeiconsIcon icon={Icon_24437} size={20} strokeWidth={2} aria-hidden="true" />
      </div>
      <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">Filters hidden</p>
      <p className={$("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1 max-w-xs")}>
        <span className="tabular-nums">{h.length}</span>
        {" of"}
        {" "}
        <span className="tabular-nums">{el.length}</span>
        {" bikes match your current filters."}
      </p>
      <button type="button" onClick={()=>a(true)} className={$(K,O,"mt-5")}>
        <HugeiconsIcon icon={Icon_68656} size={18} strokeWidth={2} aria-hidden="true" />
        Show filters
      </button>
    </div>
  </div>;
}
