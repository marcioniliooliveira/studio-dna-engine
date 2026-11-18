/**
 * React Bits Pro — Application UI (dashboard-12 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59309 = [["path",{d:"M2.01733 15C4.2169 15 6.00001 16.7831 6.00001 18.9827",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 18.9827V18.8908C18 16.742 19.742 15 21.8908 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6.00001 5.01733C6.00001 7.2169 4.2169 9.00001 2.01733 9.00001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 5.01733C18 7.19765 19.769 8.96876 21.9423 8.9996",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 5H8C5.17157 5 3.75736 5 2.87868 5.87868C2 6.75736 2 8.17157 2 11V13C2 15.8284 2 17.2426 2.87868 18.1213C3.75736 19 5.17157 19 8 19H16C18.8284 19 20.2426 19 21.1213 18.1213C22 17.2426 22 15.8284 22 13V11C22 8.17157 22 6.75736 21.1213 5.87868C20.2426 5 18.8284 5 16 5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_82270 = [["path",{d:"M12.125 5.75H12M12.25 5.75C12.25 5.88807 12.1381 6 12 6C11.8619 6 11.75 5.88807 11.75 5.75C11.75 5.61193 11.8619 5.5 12 5.5C12.1381 5.5 12.25 5.61193 12.25 5.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5 9V19M9 9V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15 9V19M19 9V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21.3518 9H2.64822C2.29022 9 2 8.70651 2 8.34447C2 8.12259 2.11099 7.91577 2.29495 7.79485L8.73007 3.56485C10.3171 2.52162 11.1107 2 12 2C12.8893 2 13.6829 2.52162 15.2699 3.56485L21.7051 7.79485C21.889 7.91577 22 8.12259 22 8.34447C22 8.70651 21.7098 9 21.3518 9Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M21.0397 20.2929L20.3519 19.5858C20.0707 19.2968 19.9301 19.1522 19.7514 19.0761C19.5726 19 19.3738 19 18.9762 19H5.02382C4.62621 19 4.4274 19 4.24863 19.0761C4.06987 19.1522 3.92929 19.2968 3.64814 19.5858L2.9603 20.2929C2.25356 21.0194 1.9002 21.3827 2.02456 21.6913C2.14893 22 2.64867 22 3.64814 22H20.3519C21.3513 22 21.8511 22 21.9754 21.6913C22.0998 21.3827 21.7464 21.0194 21.0397 20.2929Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_92190 = [["path",{d:"M11 6L21 6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 12L21 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 18L21 18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_95735 = [["path",{d:"M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 16H11.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 16L18 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 9H22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_83838 = [["path",{d:"M14 3H5C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7H18C18 6.07003 18 5.60504 17.8978 5.22354C17.6204 4.18827 16.8117 3.37962 15.7765 3.10222C15.395 3 14.93 3 14 3Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V13C21 10.1716 21 8.75736 20.1213 7.87868C19.2426 7 17.8284 7 15 7H7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12H19C18.535 12 18.3025 12 18.1118 12.0511C17.5941 12.1898 17.1898 12.5941 17.0511 13.1118C17 13.3025 17 13.535 17 14C17 14.465 17 14.6975 17.0511 14.8882C17.1898 15.4059 17.5941 15.8102 18.1118 15.9489C18.3025 16 18.535 16 19 16H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" ");

let x = "text-neutral-900 dark:text-neutral-100";

let _ = "text-neutral-900/62 dark:text-neutral-100/62";

let h = "text-[13px]/[16px] font-semibold tabular-nums";

let b = [28,31,30,36,34,41,44,43,49,52,58,61];

let p = [70,72,71,74,78,79,83,86,88,90,93,97];

let u = [61,59,60,58,57,55,56,54,53,52,51,49];

let m = [12,13,12,14,13,15,14,16,15,17,16,18];

let k = [500,375,250,125,0];

let f = [{key:"Last 3 months",compare:"vs. prior 3 months",months:["Jul","Aug","Sep"],revenue:[448,466,483],metrics:[{label:"Net revenue",value:"$1.40M",delta:"+9.8%",positive:true,spark:b},{label:"Paid accounts",value:"3,914",delta:"+2.1%",positive:true,spark:p},{label:"Average contract",value:"$1,278",delta:"−1.4%",positive:false,spark:u},{label:"Monthly churn",value:"1.8%",delta:"+0.2 pp",positive:false,spark:m}]},{key:"Last 6 months",compare:"vs. prior 6 months",months:["Apr","May","Jun","Jul","Aug","Sep"],revenue:[371,402,419,448,466,483],metrics:[{label:"Net revenue",value:"$2.59M",delta:"+12.4%",positive:true,spark:b},{label:"Paid accounts",value:"3,914",delta:"+4.1%",positive:true,spark:p},{label:"Average contract",value:"$1,284",delta:"−2.3%",positive:false,spark:u},{label:"Monthly churn",value:"1.8%",delta:"+0.3 pp",positive:false,spark:m}]},{key:"Year to date",compare:"vs. same period last year",months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"],revenue:[279,301,318,371,402,419,448,466,483],metrics:[{label:"Net revenue",value:"$3.49M",delta:"+22.8%",positive:true,spark:b},{label:"Paid accounts",value:"3,914",delta:"+14.2%",positive:true,spark:p},{label:"Average contract",value:"$1,292",delta:"−1.8%",positive:false,spark:u},{label:"Monthly churn",value:"1.9%",delta:"+0.4 pp",positive:false,spark:m}]}];

function v({values:e}){
  let a=Math.min(...e),r=Math.max(...e)-a||1,l=e.map((t,l)=>{
    let n=l/(e.length-1)*100;
    return `${n.toFixed(2)},${(92-(t-a)/r*84).toFixed(2)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="hidden h-8 w-16 shrink-0 @min-[13rem]:block">
        <polyline points={l} fill="none" vectorEffect="non-scaling-stroke" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
  );
}

function g({value:e,onChange:a}){
  let[r,o]=useState(false),[c,x]=useState(false),[_,h]=useState(0),b=useRef(null),p=useRef(null),u=useRef(null);
  useEffect(()=>{
    if(!r)return;
    let e=b.current?.ownerDocument??document,a=e=>{
      b.current?.contains(e.target)||o(false)
    };
    return e.addEventListener("pointerdown",a),()=>e.removeEventListener("pointerdown",a);
  }, [r]),useEffect(()=>{
    r&&u.current?.focus({preventScroll:true})
  }, [r]);
  let m=(e,a)=>{
    h(e),x(a),o(true)
  },k=(e=true)=>{
    o(false),e&&p.current?.focus({preventScroll:true})
  },v=e=>{
    a(f[e].key),k()
  };
  return (
    <div ref={b} className="relative shrink-0">
        <button ref={p} type="button" aria-haspopup="listbox" aria-expanded={r} aria-label={`Date range: ${e}`} onClick={()=>r?k():m(0,true)} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),m(0,false)):"ArrowUp"===e.key&&(e.preventDefault(),m(f.length-1,false))
        }} className="inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40">
          {e}
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {r&&<div ref={u} role="listbox" aria-label="Date range" tabIndex={-1} onKeyDown={e=>{
          switch(e.key){case"Escape":e.preventDefault(),k();break;case"ArrowDown":e.preventDefault(),h(e=>(e+1)%f.length);break;case"ArrowUp":e.preventDefault(),h(e=>(e-1+f.length)%f.length);break;case"Home":e.preventDefault(),h(0);break;case"End":e.preventDefault(),h(f.length-1);break;case"Enter":case" ":e.preventDefault(),v(_);break;case"Tab":k(false)}
        }} className={d("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",c&&"transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","absolute right-0 top-full z-30 mt-1.5 w-[192px]")}>
          {f.map((a,r)=>{
            let l=a.key===e;
            return (
              <button key={a.key} type="button" role="option" aria-selected={l} data-highlighted={r===_?"":undefined} tabIndex={-1} onClick={()=>v(r)} onPointerMove={()=>h(r)} className={d("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="min-w-0 flex-1 truncate">{a.key}</span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="absolute end-2" />}
                      </button>
            );
          })}
        </div>}
      </div>
  );
}

let w = (...e)=>e.filter(Boolean).join(" ");

let j = "text-neutral-900 dark:text-neutral-100";

let N = "text-neutral-900/78 dark:text-neutral-100/78";

let y = "text-neutral-900/62 dark:text-neutral-100/62";

let A = "text-[13px]/[16px] font-semibold tabular-nums";

let M = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let tI = (...e)=>e.filter(Boolean).join(" ");

let tB = "text-neutral-900 dark:text-neutral-100";

let tE = "text-neutral-900/62 dark:text-neutral-100/62";

let tP = "text-[14px]/[20px] font-medium";

let tO = "text-[15px]/[20px] font-bold";

let tF = "text-[13px]/[16px] font-semibold tabular-nums";

let tT = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let tU = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let tV = "inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums";

let tH = "bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12";

let tK = "min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100";

let tJ = "text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78";

let tG = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]";

let tq = "flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5";

let tQ = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let tX = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let tY = "fill-neutral-900/60 text-[12px] font-semibold tabular-nums dark:fill-neutral-100/60";

let tZ = "fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] stroke-white stroke-[2.5] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))] dark:stroke-neutral-900";

let t0 = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let t1 = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

function t2(){
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
}

let t5 = (e,a,r,t,l)=>t+(e-a)/(r-a||1)*(l-t);

let t6 = (e,a,r)=>Math.min(r,Math.max(a,e));

let t8 = e=>Math.abs(e)>=1e6?`${(e/1e6).toFixed(Math.abs(e)>=1e7?0:1)}M`:Math.abs(e)>=1e3?`${(e/1e3).toFixed(Math.abs(e)>=1e4?0:1)}k`:`${e}`;

let t4 = e=>`$${e.toLocaleString("en-US")}`;

let t9 = (e,a)=>.5*Math.sin(.36*a+e)+.34*Math.sin(.14*a+1.8*e);

let t3 = Array.from({length:30},(e,a)=>{
  let r=12+a;
  return r>30?`Jun ${r-30}`:`May ${r}`;
});

let t7 = Array.from({length:30},(e,a)=>Math.round(41e3+12500*t9(2.6,a)));

let le = Array.from({length:30},(e,a)=>Math.round(9400+3100*t9(6.4,a)));

let la = [{label:"Released today",meta:"17 payouts",value:t4(212480),Icon:Icon_59309},{label:"Buffer",meta:"Under review",value:t4(83040),Icon:Icon_20484},{label:"Sweep lanes",meta:"Funds moving",value:"3",Icon:Icon_82270},{label:"Moves",meta:"Ledger depth",value:"11",Icon:Icon_92190}];

let lr = [{id:"l1",name:"Studio card",meta:["Daily clear","today"],amount:284650,mask:"•••• 4576",Icon:Icon_95735},{id:"l2",name:"Royalty vault",meta:["Weekly sweep","Friday"],amount:153980,mask:"•••• 9132",Icon:Icon_82270},{id:"l3",name:"Collab wallet",meta:["Creator split","queued"],amount:67240,mask:"•••• 2841",Icon:Icon_83838},{id:"l4",name:"Reserve account",meta:["Month end","holding"],amount:41500,mask:"•••• 7710",Icon:Icon_20484}];

let lt = [{id:"m1",ref:"MV-40812",party:"Halvorsen Studio",channel:"Bank transfer",amount:84200,state:"settled",when:"09:41"},{id:"m2",ref:"MV-40811",party:"Petit Sound Co.",channel:"Instant card",amount:12640,state:"settled",when:"09:12"},{id:"m3",ref:"MV-40809",party:"Aranyi Collective",channel:"Bank transfer",amount:46900,state:"clearing",when:"08:55"},{id:"m4",ref:"MV-40806",party:"L\xf8ken Media",channel:"Wallet split",amount:9180,state:"settled",when:"08:30"},{id:"m5",ref:"MV-40804",party:"Osei & Partners",channel:"Bank transfer",amount:31450,state:"held",when:"08:04"},{id:"m6",ref:"MV-40801",party:"Sundar Archive",channel:"Instant card",amount:5720,state:"settled",when:"07:48"},{id:"m7",ref:"MV-40799",party:"Miralles Press",channel:"Wallet split",amount:18330,state:"clearing",when:"07:22"},{id:"m8",ref:"MV-40795",party:"Brekke Audio",channel:"Bank transfer",amount:24060,state:"settled",when:"06:59"},{id:"m9",ref:"MV-40792",party:"Northlight Rooms",channel:"Instant card",amount:7410,state:"settled",when:"06:31"},{id:"m10",ref:"MV-40788",party:"Fern & Object",channel:"Wallet split",amount:15880,state:"held",when:"06:05"},{id:"m11",ref:"MV-40784",party:"Quiet Harbour Ltd",channel:"Bank transfer",amount:39720,state:"settled",when:"05:44"}];

let ll = {settled:{label:"Settled",tone:"text-neutral-900/78 dark:text-neutral-100/78"},clearing:{label:"Clearing",tone:"text-neutral-900 dark:text-neutral-100"},held:{label:"Held",tone:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]"}};


export default function dashboard_12__Sorbet__Component(){
  let[e,a]=useState(null),[r,s]=useState(false),[i,o]=function(){
    let e=useRef(null),[a,r]=useState({width:0,height:0});
    return useEffect(()=>{
      let a=e.current,t=a?.ownerDocument.defaultView;
      if(!a||!t?.ResizeObserver)return;
      let l=new t.ResizeObserver(([e])=>{
        let a=e.contentRect;
        r({width:a.width,height:a.height})
      });
      return observe(a),()=>disconnect();
    }, []),[e,a];
  }(),{ref:c,edges:d,onScroll:x}=t2(),{ref:_,edges:h,onScroll:b}=t2(),{ref:p,edges:u,onScroll:m}=t2(),k=o.width,f=o.height,v=Math.max(k-46-6,1),g=Math.max(f-12-22,1),{top:w,ticks:j}=useMemo(()=>(function(e,a=4){
    if(!(e>0))return {top:1,ticks:[0,1]};
    let r=e/a,t=10**Math.floor(Math.log10(r)),l=r/t,n=(l<=1?1:l<=2?2:l<=2.5?2.5:l<=5?5:10)*t,s=Math.ceil(e/n)*n,i=[];
    for(let e=0;e<=s+n/1e3;e+=n)i.push(e);
    return {top:s,ticks:i};
  })(1.1*Math.max(...t7),4), []),N=useMemo(()=>{
    if(0===k)return null;
    let e=e=>46+t5(e,0,29,0,v),a=e=>12+g-t5(e,0,w,0,g),r=line().x((a,r)=>e(r)).y(e=>a(e)).curve(av.G),t=area().x((a,r)=>e(r)).y0(12+g).y1(e=>a(e)).curve(av.G);
    return {x:e,y:a,receiptsLine:r(t7)??"",receiptsArea:t(t7)??"",bufferLine:r(le)??""};
  }, [k,v,g,w]),y=Math.round(96370/225e3*100),A=lr.reduce((e,a)=>e+a.amount,0),M=v/4.142857142857143<72?14:7;
  return (
    <div className={tI("bg-white dark:bg-neutral-950",tB,"relative flex h-full min-h-[820px] w-full flex-col overflow-hidden")}>
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[15px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78">
              <li>Finance</li>
              <li aria-hidden="true" className="text-neutral-900/62 dark:text-neutral-100/62 select-none">/</li>
              <li aria-current="page" className={tI("font-bold text-neutral-900 dark:text-neutral-100","truncate")}>Payout studio</li>
            </ol>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <span className={tI(tV,"bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.09),0_1px_2px_rgb(84_62_32/0.08)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.55)] dark:bg-neutral-800","h-auto self-stretch max-sm:hidden")}>May 12 – Jun 10</span>
            <button type="button" className={tI(tT,tU)}>
              <HugeiconsIcon icon={Icon_92752} size={18} strokeWidth={2} aria-hidden="true" />
              Export
            </button>
          </div>
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div ref={p} onScroll={m} className="flex min-h-0 flex-1 flex-col max-lg:overflow-y-auto">
            <div className="flex shrink-0 flex-col gap-4 px-4 pt-1 pb-4 sm:px-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h1 className={tI("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",tB)}>Royalty desk</h1>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={tI(tV,tH)}>Creator finance</span>
                    <span className={tI(tP,tE,"truncate")}>Thursday, Jun 25</span>
                  </div>
                  <p className={tI(tP,tE,"mt-0.5")}>Next payout closes at 4:00 PM.</p>
                </div>
                <div className="flex min-w-0 flex-wrap items-end gap-4">
                  <div className="min-w-0 text-right">
                    <p className={tI(tP,tE)}>Clear to release</p>
                    <p className={tI("text-[44px]/[48px] font-extrabold tracking-[-0.025em] tabular-nums",tB,"mt-0.5")}>{t4(505870)}</p>
                    <p className={tI(tP,tE,"mt-0.5 tabular-nums")}>
                      {t4(49300)}
                      {" still settling"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 pb-1">
                    <button type="button" className={tI("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",tU)}>
                      <HugeiconsIcon icon={Icon_55410} size={18} strokeWidth={2} aria-hidden="true" />
                      Split
                    </button>
                    <button type="button" onClick={()=>s(true)} className={tI(tT,tU)}>
                      <HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" className={r?tE:undefined} />
                      {r?"Synced":"Sync"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1">
                <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
                  {la.map(e=>(
                    <div key={e.label} className="flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4">
                                    <div className={tI("text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78","flex items-start gap-2")}>
                                      <span className="flex h-lh shrink-0 items-center"><HugeiconsIcon icon={e.Icon} size={18} strokeWidth={2} aria-hidden="true" /></span>
                                      <span className="min-w-0 text-pretty">{e.label}</span>
                                    </div>
                                    <div className="mt-auto flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
                                      <span className={tI("text-[14px]/[20px] font-medium text-neutral-900/62 dark:text-neutral-100/62","truncate")}>{e.meta}</span>
                                      <span className={tI("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100","shrink-0")}>{e.value}</span>
                                    </div>
                                  </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 px-4 pb-4 max-lg:flex-none lg:grid-cols-[minmax(0,1fr)_336px] sm:px-6 sm:pb-6">
              <div className={tI(tG,"lg:min-h-0")}>
                <div className={tI(tq,"flex-wrap justify-between py-3")}>
                  <div className="min-w-0">
                    <h2 className={tK}>Royalty pace</h2>
                    <p className={tI(tJ,"mt-0.5 truncate")}>{null===e?"Daily receipts against buffer draw":t3[e]}</p>
                  </div>
                  <div className={tI(tF,tE,"flex shrink-0 items-center gap-4")}>
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true" className={tI("text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:text-[var(--rb-accent,oklch(81%_0.16_163))]","h-1 w-4 bg-current")} />
                      Receipts
                      {" "}
                      <span className={tB}>{null===e?`$${t8(t7[29])}`:`$${t8(t7[e])}`}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true" className={tI("text-neutral-900/40 dark:text-neutral-100/45","h-1 w-4 bg-current")} />
                      Buffer
                      {" "}
                      <span className={tB}>{null===e?`$${t8(le[29])}`:`$${t8(le[e])}`}</span>
                    </span>
                  </div>
                </div>
                <div className={tI(tQ,"min-h-0 flex-1")}>
                  <div ref={i} role="application" tabIndex={0} aria-label="Daily receipts against buffer draw over 30 days" onPointerMove={e=>{
                    let r=i.current;
                    if(!r||v<=0)return;
                    let t=r.getBoundingClientRect();
                    a(t6(Math.round((e.clientX-t.left-46)/v*29),0,29))
                  }} onPointerLeave={()=>a(null)} onKeyDown={e=>{
                    ("ArrowLeft"===e.key||"ArrowRight"===e.key)&&(e.preventDefault(),a(a=>t6((a??29)+("ArrowRight"===e.key?1:-1),0,29)))
                  }} onBlur={()=>a(null)} className={tI("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","relative h-[244px] shrink-0 px-3 pt-3 pb-1")}>
                    {N&&<svg width={k} height={f} className="overflow-visible" aria-hidden="true">
                      {j.map(e=>(
                        <g key={e}>
                                            <line x1={46} x2={k-6} y1={N.y(e)} y2={N.y(e)} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900/6 dark:stroke-neutral-100/8" />
                                            <text x={38} y={N.y(e)} dy={3.5} textAnchor="end" className={tY}>
                                              $
                                              {t8(e)}
                                            </text>
                                          </g>
                      ))}
                      <path d={N.receiptsArea} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
                      <path d={N.bufferLine} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-neutral-900/40 dark:stroke-neutral-100/45" />
                      <path d={N.receiptsLine} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" />
                      {t3.map((e,a)=>a%M==0&&a<27||29===a?<text key={e} x={N.x(a)} y={f-2} textAnchor={0===a?"start":29===a?"end":"middle"} className={tY}>{e}</text>:null)}
                      {null!==e&&<g>
                        <line x1={N.x(e)} x2={N.x(e)} y1={12} y2={12+g} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900/40 dark:stroke-neutral-100/45" />
                        <rect x={N.x(e)-4} y={N.y(le[e])-4} width={8} height={8} className={tZ} />
                        <rect x={N.x(e)-4} y={N.y(t7[e])-4} width={8} height={8} className={tZ} />
                      </g>}
                    </svg>}
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col">
                    <div className="flex shrink-0 items-center justify-between gap-2 px-4 pt-3 pb-2">
                      <h3 className={tK}>Recent moves</h3>
                      <span className="shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">
                        {lt.length}
                        {" today"}
                      </span>
                    </div>
                    <div className="relative min-h-0 flex-1">
                      <div ref={c} onScroll={x} className="h-full overflow-y-auto">
                        <table className="w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium">
                          <thead className={tI("bg-white dark:bg-neutral-950","sticky top-0 z-10")}>
                            <tr>
                              {["Reference","Recipient","Route","State","Amount"].map((e,a)=><th key={e} scope="col" className={tI("h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4",(2===a||3===a)&&"hidden sm:table-cell")}>{4===a?<span className="block text-right">{e}</span>:e}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {lt.map(e=>(
                              <tr key={e.id} className="group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]">
                                                        <td className={tI(tX,"h-11")}>
                                                          <span className={tI("inline-flex h-5.5 min-w-5.5 shrink-0 items-center justify-center whitespace-nowrap rounded-[calc(var(--rb-r-md,8px))] px-2 font-mono text-[12px]/[16px] font-medium tabular-nums text-neutral-900 dark:text-neutral-100","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:bg-neutral-100/10")}>{e.ref}</span>
                                                        </td>
                                                        <td className={tI(tX,"h-11")}>
                                                          <span className={tI(tO,"block truncate")}>{e.party}</span>
                                                          <span className={tI(tF,tE,"mt-0.5 block")}>{e.when}</span>
                                                        </td>
                                                        <td className={tI(tX,"hidden h-11 sm:table-cell")}>{e.channel}</td>
                                                        <td className={tI(tX,"hidden h-11 sm:table-cell")}>
                                                          <span className={tI("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",ll[e.state].tone)}>
                                                            {"clearing"===e.state&&<span className="flex h-lh shrink-0 items-center">
                                                              <span className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" aria-hidden="true" />
                                                            </span>}
                                                            {ll[e.state].label}
                                                          </span>
                                                        </td>
                                                        <td className={tI(tX,"text-right tabular-nums","h-11")}>{t4(e.amount)}</td>
                                                      </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div aria-hidden="true" className={tI(t0,"pointer-events-none absolute inset-x-0 top-10 h-8",d.start?"opacity-100":"opacity-0")} />
                      <div aria-hidden="true" className={tI(t1,"pointer-events-none absolute inset-x-0 bottom-0 h-8",d.end?"opacity-100":"opacity-0")} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={tI(tG,"lg:min-h-0")}>
                <div className={tI(tq,"justify-between py-3")}>
                  <div className="min-w-0">
                    <h2 className={tK}>Release room</h2>
                    <p className={tI(tJ,"mt-0.5 truncate")}>Buffer and sweep lanes</p>
                  </div>
                  <span className={tI(tV,tH)}>Vault sweep</span>
                </div>
                <div className={tI(tQ,"min-h-0 flex-1")}>
                  <div className="shrink-0 px-3 py-3.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className={tI(tP,"text-neutral-900/78 dark:text-neutral-100/78")}>Buffer drawn</span>
                      <span className={tI(tO,"tabular-nums")}>
                        {y}
                        %
                      </span>
                    </div>
                    <span aria-hidden="true" className={tI("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","mt-2 h-1.5")}>
                      <span className="block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{width:`${y}%`}} />
                    </span>
                    <div className={tI(tF,tE,"mt-2 flex items-baseline justify-between gap-2")}>
                      <span>
                        {t4(96370)}
                        {" held"}
                      </span>
                      <span>
                        {t4(225e3)}
                        {" limit"}
                      </span>
                    </div>
                    <button type="button" className={tI(tT,tU,"mt-3.5 w-full")}>
                      <HugeiconsIcon icon={Icon_20484} size={18} strokeWidth={2} aria-hidden="true" />
                      Tune buffer
                    </button>
                  </div>
                  <div className="relative min-h-0 flex-1">
                    <div ref={_} onScroll={b} className="h-full overflow-y-auto">
                      <ul className="divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7">
                        {lr.map(e=>(
                          <li key={e.id} className={tI("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","px-3")}>
                                                <span className={tI("flex size-9 shrink-0 items-center justify-center text-neutral-900/78 dark:text-neutral-100/78","size-9")}><HugeiconsIcon icon={e.Icon} size={18} strokeWidth={2} aria-hidden="true" /></span>
                                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                                  <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.name}</span></p>
                                                  <p data-description className={tI("line-clamp-2 text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","truncate")}>
                                                    <span>{e.meta[0]}</span>
                                                    <span className="ms-2">{e.meta[1]}</span>
                                                  </p>
                                                </div>
                                                <div className="shrink-0 text-right">
                                                  <p className={tI(tO,"tabular-nums")}>{t4(e.amount)}</p>
                                                  <p className={tI("font-mono text-[12px]/[16px] tabular-nums",tE,"mt-0.5")}>{e.mask}</p>
                                                </div>
                                              </li>
                        ))}
                      </ul>
                    </div>
                    <div aria-hidden="true" className={tI(t0,"pointer-events-none absolute inset-x-0 top-0 h-8",h.start?"opacity-100":"opacity-0")} />
                    <div aria-hidden="true" className={tI(t1,"pointer-events-none absolute inset-x-0 bottom-0 h-8",h.end?"opacity-100":"opacity-0")} />
                  </div>
                </div>
                <div className={tI("flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5","justify-between")}>
                  <span>
                    {lr.length}
                    {" lanes queued"}
                  </span>
                  <span className={tI(tO,tB,"tabular-nums")}>{t4(A)}</span>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={tI(t0,"pointer-events-none absolute inset-x-0 top-0 h-8",u.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={tI(t1,"pointer-events-none absolute inset-x-0 bottom-0 h-8",u.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}
