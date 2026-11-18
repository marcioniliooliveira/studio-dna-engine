/**
 * React Bits Pro — Application UI (dashboard-8 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_24513 = [["path",{d:"M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_91162 = [["path",{d:"M7 4V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 19L17 4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M10 6.99998C10 6.99998 7.79053 4.00001 6.99998 4C6.20942 3.99999 4 7 4 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M20 17C20 17 17.7905 20 17 20C16.2094 20 14 17 14 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_12556 = [["path",{d:"M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

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

let aw = (...e)=>e.filter(Boolean).join(" ");

let aj = "text-neutral-900 dark:text-neutral-100";

let aN = "text-neutral-900/62 dark:text-neutral-100/62";

let ay = "text-[15px]/[20px] font-bold";

let aA = "text-[13px]/[16px] font-semibold tabular-nums";

let aM = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let aS = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let az = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let aR = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let a$ = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none";

let aD = "flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]";

let aW = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let aL = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let aC = "stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]";

let aI = (e,a,r)=>Math.min(r,Math.max(a,e));

let aB = (e,a)=>.5*Math.sin(.82*a+e)+.34*Math.sin(.29*a+1.9*e);

let aE = [{label:"Net revenue",scope:"atlas.dev",period:"28 days",value:"$6.2k",delta:12.4,series:Array.from({length:28},(e,a)=>aI(58+34*aB(1.4,a),8,100))},{label:"Signups",scope:"All channels",period:"28 days",value:4238..toLocaleString("en-US"),delta:6.1,series:Array.from({length:28},(e,a)=>aI(54+38*aB(4.1,a),8,100))},{label:"Active licenses",scope:"Atlas Cloud",period:"28 days",value:1907..toLocaleString("en-US"),delta:-2.3,series:Array.from({length:28},(e,a)=>aI(62+30*aB(7.7,a),8,100))}];

let aP = {progress:"In progress",planned:"Planned",backlog:"Backlog",blocked:"Blocked"};

let aO = {progress:"text-neutral-900 dark:text-neutral-100",planned:"text-neutral-900 dark:text-neutral-100",backlog:"text-neutral-900/62 dark:text-neutral-100/62",blocked:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]"};

let aF = [{id:"m1",name:"Access Matrix",kind:"System",owner:"Nora Vale",host:"admin.atlas.dev",done:11,total:26,start:"Apr 22",end:"May 06",window:14,stage:"progress",starred:true},{id:"m2",name:"API Console",kind:"Feature",owner:"Lena Wade",host:"api.atlas.dev",done:29,total:32,start:"Apr 12",end:"Apr 26",window:14,stage:"progress",starred:true},{id:"m3",name:"Block Library",kind:"Feature",owner:"Sofia Romero",host:"blocks.atlas.dev",done:10,total:30,start:"Apr 24",end:"May 10",window:16,stage:"planned",starred:false},{id:"m4",name:"Data Retention",kind:"System",owner:"Kenji Tan",host:"privacy.atlas.dev",done:7,total:32,start:"Apr 27",end:"May 14",window:17,stage:"backlog",starred:false},{id:"m5",name:"Docs Portal",kind:"Area",owner:"Nina Santos",host:"docs.atlas.dev",done:2,total:14,start:"Apr 21",end:"May 05",window:14,stage:"blocked",starred:false},{id:"m6",name:"Help Center",kind:"Area",owner:"Sofia Romero",host:"help.atlas.dev",done:9,total:23,start:"Apr 23",end:"May 11",window:18,stage:"planned",starred:false},{id:"m7",name:"Identity Broker",kind:"System",owner:"Kenji Tan",host:"id.atlas.dev",done:24,total:27,start:"Apr 08",end:"Apr 25",window:17,stage:"progress",starred:false},{id:"m8",name:"Ledger Export",kind:"Feature",owner:"Marco Bianchi",host:"billing.atlas.dev",done:5,total:21,start:"Apr 29",end:"May 19",window:20,stage:"backlog",starred:false},{id:"m9",name:"Notification Hub",kind:"Feature",owner:"Lena Wade",host:"notify.atlas.dev",done:18,total:24,start:"Apr 15",end:"Apr 30",window:15,stage:"progress",starred:true},{id:"m10",name:"Search Index",kind:"System",owner:"Nora Vale",host:"search.atlas.dev",done:13,total:19,start:"Apr 18",end:"May 02",window:14,stage:"progress",starred:false},{id:"m11",name:"Usage Meter",kind:"Feature",owner:"Marco Bianchi",host:"meter.atlas.dev",done:3,total:18,start:"May 02",end:"May 22",window:20,stage:"planned",starred:false},{id:"m12",name:"Webhook Relay",kind:"System",owner:"Nina Santos",host:"hooks.atlas.dev",done:16,total:20,start:"Apr 11",end:"Apr 28",window:17,stage:"progress",starred:false}];

let aT = e=>e.split(/[\s-]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("");

let aU = {blocked:0,progress:1,planned:2,backlog:3};

function aV({series:e}){
  let{stroke:a,fill:r}=useMemo(()=>{
    let a=Math.max(...e),r=Math.min(...e),t=a=>a/(e.length-1)*130+1,l=e=>37-(e-r)/(a-r||1)*32,n=line().x((e,a)=>t(a)).y(e=>l(e)).curve(av.G),s=area().x((e,a)=>t(a)).y0(40).y1(e=>l(e)).curve(av.G);
    return {stroke:n(e)??"",fill:s(e)??""};
  }, [e]);
  return (
    <svg aria-hidden="true" viewBox="0 0 132 40" preserveAspectRatio="none" className="h-10 w-full overflow-visible">
        <path d={r} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
        <path d={a} fill="none" vectorEffect="non-scaling-stroke" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={aC} />
      </svg>
  );
}

let aH = 2*Math.PI*14;

function aK({pct:e}){
  return (
    <svg aria-hidden="true" width={34} height={34} viewBox="0 0 34 34" className="shrink-0 -rotate-90">
        <circle cx={17} cy={17} r={14} fill="none" strokeWidth={3} className="stroke-neutral-900/12 dark:stroke-neutral-100/14" />
        <circle cx={17} cy={17} r={14} fill="none" strokeWidth={3} strokeLinecap="round" strokeDasharray={aH} strokeDashoffset={aH-aI(e,0,100)/100*aH} className={aC} />
      </svg>
  );
}


export default function dashboard_8__Sorbet__Component(){
  let e=useRef(null),[a,r]=useState(""),[i,d]=useState("name"),[x,_]=useState(true),[h,b]=useState(()=>Object.fromEntries(aF.map(e=>[e.id,e.starred]))),[p,u]=useState(null),[m,k]=useState(false),{ref:f,edges:v,onScroll:g}=function(){
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
  }();
  useEffect(()=>{
    if(!p)return;
    let a=e.current?.ownerDocument;
    if(!a)return;
    let r=e=>{
      let a=e.target;
      a?.closest("[data-row-menu]")||u(null)
    },t=e=>{
      "Escape"===e.key&&u(null)
    };
    return a.addEventListener("pointerdown",r),a.addEventListener("keydown",t),()=>{
      a.removeEventListener("pointerdown",r),a.removeEventListener("keydown",t)
    };
  }, [p]);
  let w=useMemo(()=>{
    let e=a.trim().toLowerCase(),r=aF.filter(a=>""===e||a.name.toLowerCase().includes(e)||a.owner.toLowerCase().includes(e)||a.host.toLowerCase().includes(e)),t=x?1:-1;
    return [...r].sort((e,a)=>"progress"===i?(e.done/e.total-a.done/a.total)*t:"window"===i?(e.window-a.window)*t:"stage"===i?(aU[e.stage]-aU[a.stage])*t:e.name.localeCompare(a.name)*t);
  }, [a,i,x]),j=(e,a,r)=>(
    <th scope="col" aria-sort={i===e?x?"ascending":"descending":undefined} className={aw(aW,r)}>
        <button type="button" onClick={()=>{
          i===e?_(e=>!e):(d(e),_(true))
        }} aria-label={`Sort by ${a.toLowerCase()}`} data-sorted={i===e?"":undefined} className="-mx-1.5 inline-flex h-8 min-w-0 cursor-pointer items-center gap-1 rounded-[calc(var(--rb-r-full,999px))] px-1.5 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/5 hover:text-neutral-900 data-sorted:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:data-sorted:text-neutral-100">
          {a}
          <HugeiconsIcon icon={i===e?x?Icon_24513:Icon_20148:Icon_31517} size={14} strokeWidth={2} aria-hidden="true" />
        </button>
      </th>
  );
  return (
    <div ref={e} className={aw("bg-white dark:bg-neutral-950",aj,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[15px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78">
              <li>
                <a href="#" className="rounded-[calc(var(--rb-r-sm,6px))] transition-[color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:text-neutral-100">Home</a>
              </li>
              <li aria-hidden="true" className="text-neutral-900/62 dark:text-neutral-100/62 select-none">/</li>
              <li className={aw("font-bold text-neutral-900 dark:text-neutral-100","truncate")}>Atlas</li>
            </ol>
          </nav>
          <div className="flex shrink-0 items-center gap-3">
            <div className={aw("flex items-center *:not-first:-ms-1.5 *:not-last:[mask-image:radial-gradient(50%_50%_at_calc(150%-6px)_50%,transparent_calc(100%+1.5px),#000_calc(100%+2px))]","hidden sm:flex")}>
              {["Nora Vale","Lena Wade","Kenji Tan"].map(e=><span key={e} title={e} className={aw(a$,"size-[28px]")}><span className={aD}>{aT(e).charAt(0)}</span></span>)}
              <span className={aw(a$,"size-[28px]")}><span className={aD}>+8</span></span>
            </div>
            <button type="button" className={aw(aM,az,"max-sm:hidden")}>
              <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
              Invite
            </button>
            <button type="button" className={aw("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",az)}>
              <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
              Add module
            </button>
          </div>
        </header>
        <div className="shrink-0 px-4 pb-5 sm:px-6">
          <div className="@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1">
            <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
              {aE.map(e=>(
                <div key={e.label} className={aw("flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4","@container")}>
                            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                              <h3 className={aw("text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78","min-w-0 text-pretty")}>{e.label}</h3>
                              <span className={aw("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78","shrink-0")}>
                                <HugeiconsIcon icon={e.delta>=0?Icon_1497:Icon_37502} size={14} strokeWidth={2} aria-hidden="true" />
                                <span className="sr-only">{e.delta>=0?"Up":"Down"}</span>
                                {e.delta>=0?"+":"−"}
                                {Math.abs(e.delta).toFixed(1)}
                                %
                              </span>
                            </div>
                            <div className="mt-auto flex items-end justify-between gap-4">
                              <div className="min-w-0">
                                <p className={aw(aA,aN,"flex min-w-0 gap-2")}>
                                  <span className="truncate">{e.scope}</span>
                                  <span className="shrink-0">{e.period}</span>
                                </p>
                                <p className={aw("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[34px]/[40px] font-extrabold tracking-[-0.02em] tabular-nums text-neutral-900 dark:text-neutral-100","mt-1")}>{e.value}</p>
                              </div>
                              <div className="hidden w-[132px] shrink-0 @min-[17rem]:block"><aV series={e.series} /></div>
                            </div>
                          </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 sm:px-6 sm:pb-6">
          <div className={aw("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
            <div className={aw("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","flex-wrap justify-between py-3 has-[button]:pe-4")}>
              <div className="flex min-w-0 items-center gap-2">
                <h2 className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">Modules</h2>
                <span className={aw("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>{w.length}</span>
              </div>
              <div className="flex flex-1 items-center justify-end gap-2">
                <div className={aw("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10","w-full max-w-[260px] min-w-[140px]")}>
                  <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                    <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <input value={a} onChange={e=>r(e.target.value)} placeholder="Search modules" aria-label="Search modules" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
                </div>
                <button type="button" onClick={()=>_(e=>!e)} className={aw(aM,az)}>
                  <HugeiconsIcon icon={Icon_91162} size={18} strokeWidth={2} aria-hidden="true" />
                  <span className="max-sm:sr-only">{x?"Ascending":"Descending"}</span>
                </button>
                <button type="button" className={aw(aM,az)}>
                  <HugeiconsIcon icon={Icon_68656} size={18} strokeWidth={2} aria-hidden="true" />
                  <span className="max-sm:sr-only">Filters</span>
                </button>
              </div>
            </div>
            <div className={aw("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative min-h-0 flex-1")}>
              <div ref={f} onScroll={g} className="h-full overflow-y-auto">
                <table className="w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium">
                  <thead className={aw("bg-white dark:bg-neutral-950","sticky top-0 z-10")}>
                    <tr className="h-9">
                      {j("progress","Progress","sm:w-[190px]")}
                      {j("name","Module")}
                      {j("window","Window","hidden md:table-cell w-[190px]")}
                      {j("stage","Status","hidden sm:table-cell w-[150px]")}
                      <th scope="col" className={aw(aW,"w-[112px] text-right")}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {w.map(e=>{
                      let a=Math.round(e.done/e.total*100);
                      return (
                        <tr key={e.id} className={aw("group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","h-[68px]")}>
                                            <td className={aL}>
                                              <div className="flex items-center gap-2.5">
                                                <aK pct={a} />
                                                <div className="min-w-0 max-sm:sr-only">
                                                  <p className={aw(ay,aj,"tabular-nums")}>
                                                    {a}
                                                    % ready
                                                  </p>
                                                  <p className={aw(aA,aN,"mt-0.5")}>
                                                    {e.done}
                                                    /
                                                    {e.total}
                                                    {" tasks"}
                                                  </p>
                                                </div>
                                              </div>
                                            </td>
                                            <td className={aw(aL,"w-full max-w-0")}>
                                              <p className={aw(ay,aj,"truncate")}>{e.name}</p>
                                              <div className={aw(aA,aN,"mt-1 flex items-center gap-1.5")}>
                                                <span className="shrink-0">{e.kind}</span>
                                                <span aria-hidden="true" className={aw(a$,"size-[16px]")}><span className={aD}>{aT(e.owner).charAt(0)}</span></span>
                                                <span className="truncate">{e.owner}</span>
                                                <span className={aw("font-mono text-[12px]/[16px] tabular-nums","hidden truncate lg:inline")}>{e.host}</span>
                                              </div>
                                            </td>
                                            <td className={aw(aL,"hidden md:table-cell")}>
                                              <p className="tabular-nums">
                                                {e.start}
                                                {" – "}
                                                {e.end}
                                              </p>
                                              <p className={aw(aA,aN,"mt-0.5")}>
                                                {e.window}
                                                -day window
                                              </p>
                                            </td>
                                            <td className={aw(aL,"hidden sm:table-cell")}>
                                              <span className={aw("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",aO[e.stage])}>
                                                {"progress"===e.stage&&<span className="flex h-lh shrink-0 items-center">
                                                  <span className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" aria-hidden="true" />
                                                </span>}
                                                {aP[e.stage]}
                                              </span>
                                            </td>
                                            <td className={aL}>
                                              <div className="flex items-center justify-end gap-0.5">
                                                <button type="button" aria-label={`Open ${e.name} spec`} className={aw(aS,aR)}>
                                                  <HugeiconsIcon icon={Icon_31964} size={18} strokeWidth={2} aria-hidden="true" />
                                                </button>
                                                <button type="button" aria-label={`${h[e.id]?"Unstar":"Star"} ${e.name}`} aria-pressed={h[e.id]} onClick={()=>b(a=>({...a,[e.id]:!a[e.id]}))} className={aw(aS,aR)}>
                                                  <HugeiconsIcon icon={Icon_12556} size={18} strokeWidth={2} aria-hidden="true" className={aw(h[e.id]&&"[&_path]:fill-current")} />
                                                </button>
                                                <div className="relative" data-row-menu>
                                                  <button type="button" aria-label={`More actions for ${e.name}`} aria-haspopup="menu" aria-expanded={p===e.id} onClick={a=>{
                                                    k((f.current?f.current.getBoundingClientRect().bottom-a.currentTarget.getBoundingClientRect().bottom:1/0)<152),u(a=>a===e.id?null:e.id)
                                                  }} className={aw(aS,aR)}>
                                                    <HugeiconsIcon icon={Icon_59649} size={18} strokeWidth={2} aria-hidden="true" />
                                                  </button>
                                                  {p===e.id&&<div role="menu" aria-label={`${e.name} actions`} className={aw("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute right-0 z-30 w-[168px] min-w-[168px]",m?"bottom-full mb-1":"top-full mt-1")}>
                                                    {["Rename module","Duplicate","Move to area","Archive"].map(e=><button key={e} type="button" role="menuitem" onClick={()=>u(null)} className="relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40">{e}</button>)}
                                                  </div>}
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                      );
                    })}
                  </tbody>
                </table>
                {0===w.length&&<div className="flex h-[280px] flex-col items-center justify-center px-6 text-center">
                  <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">
                    No modules match “
                    {a}
                    ”
                  </p>
                  <p className={aw("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>Try a module name, an owner, or a hostname.</p>
                  <button type="button" onClick={()=>r("")} className={aw(aM,az,"mt-4")}>Clear search</button>
                </div>}
              </div>
              <div aria-hidden="true" className={aw("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-10 h-8",v.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={aw("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",v.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
      </div>
  );
}
