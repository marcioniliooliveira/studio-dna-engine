/**
 * React Bits Pro — Application UI (dashboard-14 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, label, observe, spark, tone, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_94089 = [["path",{d:"M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L10.5 15L16 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_24580 = [["path",{d:"M5.25 5L19.25 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M22.25 12C22.25 6.47715 17.7728 2 12.25 2C6.72715 2 2.25 6.47715 2.25 12C2.25 17.5228 6.72715 22 12.25 22C17.7728 22 22.25 17.5228 22.25 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_36048 = [["path",{d:"M19 4H5C4.06812 4 3.60218 4 3.23463 4.15224C2.74458 4.35523 2.35523 4.74458 2.15224 5.23463C2 5.60218 2 6.06812 2 7C2 7.93188 2 8.39782 2.15224 8.76537C2.35523 9.25542 2.74458 9.64477 3.23463 9.84776C3.60218 10 4.06812 10 5 10H19C19.9319 10 20.3978 10 20.7654 9.84776C21.2554 9.64477 21.6448 9.25542 21.8478 8.76537C22 8.39782 22 7.93188 22 7C22 6.06812 22 5.60218 21.8478 5.23463C21.6448 4.74458 21.2554 4.35523 20.7654 4.15224C20.3978 4 19.9319 4 19 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 14H5C4.06812 14 3.60218 14 3.23463 14.1522C2.74458 14.3552 2.35523 14.7446 2.15224 15.2346C2 15.6022 2 16.0681 2 17C2 17.9319 2 18.3978 2.15224 18.7654C2.35523 19.2554 2.74458 19.6448 3.23463 19.8478C3.60218 20 4.06812 20 5 20H19C19.9319 20 20.3978 20 20.7654 19.8478C21.2554 19.6448 21.6448 19.2554 21.8478 18.7654C22 18.3978 22 17.9319 22 17C22 16.0681 22 15.6022 21.8478 15.2346C21.6448 14.7446 21.2554 14.3552 20.7654 14.1522C20.3978 14 19.9319 14 19 14Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6.125 7H6M6.25 7C6.25 7.13807 6.13807 7.25 6 7.25C5.86193 7.25 5.75 7.13807 5.75 7C5.75 6.86193 5.86193 6.75 6 6.75C6.13807 6.75 6.25 6.86193 6.25 7Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10.125 7H10M10.25 7C10.25 7.13807 10.1381 7.25 10 7.25C9.86193 7.25 9.75 7.13807 9.75 7C9.75 6.86193 9.86193 6.75 10 6.75C10.1381 6.75 10.25 6.86193 10.25 7Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M6.125 17H6M6.25 17C6.25 17.1381 6.13807 17.25 6 17.25C5.86193 17.25 5.75 17.1381 5.75 17C5.75 16.8619 5.86193 16.75 6 16.75C6.13807 16.75 6.25 16.8619 6.25 17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10.125 17H10M10.25 17C10.25 17.1381 10.1381 17.25 10 17.25C9.86193 17.25 9.75 17.1381 9.75 17C9.75 16.8619 9.86193 16.75 10 16.75C10.1381 16.75 10.25 16.8619 10.25 17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_33126 = [["path",{d:"M7 19H13C15.8284 19 17.2426 19 18.1213 18.1213C19 17.2426 19 15.8284 19 13V10M19 10C19.7002 10 21.0085 11.9943 21.5 12.5M19 10C18.2998 10 16.9915 11.9943 16.5 12.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5 7L5 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"5",cy:"5",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["circle",{cx:"19",cy:"5",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["circle",{cx:"5",cy:"19",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_52975 = [["path",{d:"M15 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V9M20 4L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20 13C20 16.7712 20 18.6569 18.8284 19.8284C17.6569 21 15.7712 21 12 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V12C3 8.22876 3 6.34315 4.17157 5.17157C5.34315 4 7.22876 4 11 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

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

let S = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let z = "text-right tabular-nums";

let R = "stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]";

let $ = "stroke-neutral-900/40 dark:stroke-neutral-100/45";

let D = [700,525,350,175,0];

let W = {"7 days":{total:3102,delta:"+8.2%",positive:true,series:[412,388,455,470,521,498,543],xLabels:["Mar 3","Mar 5","Mar 7","Mar 9"]},"30 days":{total:12847,delta:"+12.4%",positive:true,series:[360,402,388,430,455,470,442,498,512,505,548,560,595,610,640],xLabels:["Feb 8","Feb 15","Feb 22","Mar 1","Mar 8"]},"90 days":{total:41530,delta:"−1.6%",positive:false,series:[520,505,540,560,548,590,575,610,600,585,560,540,505,480,455],xLabels:["Dec 8","Jan 7","Feb 6","Mar 8"]}};

let L = [{source:"Organic search",pct:.4,conv:"3.9%",trend:[30,34,33,38,42,46,51]},{source:"Direct",pct:.24,conv:"5.1%",trend:[40,41,39,43,42,45,47]},{source:"Referral",pct:.17,conv:"2.8%",trend:[22,24,23,21,25,24,26]},{source:"Social",pct:.112,conv:"1.6%",trend:[18,20,24,22,19,17,15]},{source:"Email",pct:.078,conv:"6.4%",trend:[12,13,12,14,15,16,18]}];

let lQ = (...e)=>e.filter(Boolean).join(" ");

let lX = "text-neutral-900 dark:text-neutral-100";

let lY = "text-neutral-900/62 dark:text-neutral-100/62";

let lZ = "rounded-[var(--rb-r-4xl,18px)]";

let l0 = "text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]";

let l1 = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]";

let l2 = "font-mono text-[12px]/[16px] tabular-nums";

let l5 = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let l6 = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let l8 = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let l4 = "inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums";

let l9 = "min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100";

let l3 = "relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16";

let l7 = "flex min-w-0 flex-1 flex-col gap-0.5";

let ne = "flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let na = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let nr = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

function nt(){
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

let nl = (e,a,r,t,l)=>t+(e-a)/(r-a||1)*(l-t);

let nn = (e,a,r)=>Math.min(r,Math.max(a,e));

let ns = [{id:"s1",name:"Checkout API",repo:"core/checkout",region:"eu-west-1",health:"healthy",rps:4820,p95:118,errorRate:.14,saturation:61,version:"v4.18.2",deployedBy:"Ines Halvorsen",deployedAt:"2h ago"},{id:"s2",name:"Ledger writer",repo:"core/ledger",region:"eu-west-1",health:"watch",rps:1290,p95:402,errorRate:1.9,saturation:88,version:"v2.7.0",deployedBy:"Dovid Aranyi",deployedAt:"26m ago"},{id:"s3",name:"Media pipeline",repo:"media/encode",region:"us-east-2",health:"healthy",rps:640,p95:1140,errorRate:.32,saturation:44,version:"v9.3.1",deployedBy:"Runa Petit",deployedAt:"1d ago"},{id:"s4",name:"Search index",repo:"search/index",region:"us-east-2",health:"healthy",rps:3410,p95:74,errorRate:.08,saturation:52,version:"v1.22.9",deployedBy:"Marta L\xf8ken",deployedAt:"5h ago"},{id:"s5",name:"Webhook relay",repo:"core/relay",region:"ap-south-1",health:"down",rps:210,p95:2960,errorRate:14.6,saturation:97,version:"v3.0.4",deployedBy:"Kwame Osei",deployedAt:"12m ago"},{id:"s6",name:"Identity gateway",repo:"core/identity",region:"eu-west-1",health:"healthy",rps:5960,p95:61,errorRate:.05,saturation:39,version:"v6.11.0",deployedBy:"Ines Halvorsen",deployedAt:"3d ago"},{id:"s7",name:"Notification fan-out",repo:"growth/notify",region:"us-east-2",health:"watch",rps:880,p95:318,errorRate:2.4,saturation:79,version:"v5.2.3",deployedBy:"Priya Sundar",deployedAt:"8h ago"},{id:"s8",name:"Billing sync",repo:"core/billing",region:"eu-west-1",health:"healthy",rps:430,p95:205,errorRate:.21,saturation:33,version:"v2.14.6",deployedBy:"Dovid Aranyi",deployedAt:"2d ago"},{id:"s9",name:"Asset CDN edge",repo:"media/edge",region:"global",health:"healthy",rps:9120,p95:28,errorRate:.02,saturation:47,version:"v11.0.1",deployedBy:"Marta L\xf8ken",deployedAt:"6d ago"}];

let ni = {healthy:{label:"Healthy",Icon:Icon_94089,tone:"text-neutral-900/78 dark:text-neutral-100/78",spark:lY},watch:{label:"Degraded",Icon:Icon_36474,tone:"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",spark:l0},down:{label:"Failing",Icon:Icon_24580,tone:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",spark:l1}};

let no = {s1:[{id:"e1",text:"Rolled v4.18.2 to 100% of eu-west-1",meta:["2h ago","deploy"],kind:"healthy"},{id:"e2",text:"Canary held for 14 minutes, no regression",meta:["2h ago","canary"],kind:"healthy"},{id:"e3",text:"Card token cache warmed after restart",meta:["5h ago","runtime"],kind:"healthy"},{id:"e4",text:"p95 crossed 200ms for 3 minutes",meta:["9h ago","latency"],kind:"watch"}],s2:[{id:"e1",text:"Write queue depth above threshold",meta:["26m ago","saturation"],kind:"watch"},{id:"e2",text:"Shipped v2.7.0 with batched commits",meta:["26m ago","deploy"],kind:"healthy"},{id:"e3",text:"Replica lag peaked at 4.2s",meta:["1h ago","database"],kind:"watch"},{id:"e4",text:"Nightly reconciliation finished clean",meta:["7h ago","job"],kind:"healthy"}],s3:[{id:"e1",text:"Encoder pool scaled to 24 workers",meta:["40m ago","autoscale"],kind:"healthy"},{id:"e2",text:"Long-form transcode backlog cleared",meta:["3h ago","queue"],kind:"healthy"},{id:"e3",text:"Two jobs retried after codec timeout",meta:["6h ago","retry"],kind:"watch"}],s4:[{id:"e1",text:"Reindexed 1.4M documents",meta:["5h ago","job"],kind:"healthy"},{id:"e2",text:"Query cache hit rate settled at 94%",meta:["5h ago","runtime"],kind:"healthy"},{id:"e3",text:"Shard rebalance completed",meta:["1d ago","cluster"],kind:"healthy"}],s5:[{id:"e1",text:"Outbound deliveries failing at the edge",meta:["12m ago","incident"],kind:"down"},{id:"e2",text:"Retry budget exhausted for 3 tenants",meta:["18m ago","retry"],kind:"down"},{id:"e3",text:"Deployed v3.0.4 with new signing key",meta:["22m ago","deploy"],kind:"watch"},{id:"e4",text:"Paged the on-call responder",meta:["24m ago","alert"],kind:"down"}],s6:[{id:"e1",text:"Token issuance steady across regions",meta:["1h ago","runtime"],kind:"healthy"},{id:"e2",text:"Rotated signing keys without downtime",meta:["3d ago","security"],kind:"healthy"},{id:"e3",text:"Session store compacted",meta:["3d ago","job"],kind:"healthy"}],s7:[{id:"e1",text:"Provider throttled push delivery",meta:["35m ago","upstream"],kind:"watch"},{id:"e2",text:"Digest batch delayed by 6 minutes",meta:["2h ago","queue"],kind:"watch"},{id:"e3",text:"Template cache invalidated",meta:["8h ago","deploy"],kind:"healthy"}],s8:[{id:"e1",text:"Invoice sync matched 4,182 records",meta:["1h ago","job"],kind:"healthy"},{id:"e2",text:"Dunning retries paused for review",meta:["1d ago","policy"],kind:"healthy"},{id:"e3",text:"Currency table refreshed",meta:["2d ago","job"],kind:"healthy"}],s9:[{id:"e1",text:"Purged 82GB of stale objects",meta:["4h ago","cache"],kind:"healthy"},{id:"e2",text:"Origin shield hit rate at 99.1%",meta:["4h ago","runtime"],kind:"healthy"},{id:"e3",text:"Added two edge locations",meta:["6d ago","network"],kind:"healthy"}]};

let nc = e=>{
  let a=.9*e.id.charCodeAt(1),r="down"===e.health?.55:"watch"===e.health?.3:.16;
  return Array.from({length:40},(t,l)=>Math.max(e.rps*(1+(.5*Math.sin(.38*l+a)+.32*Math.sin(.15*l+1.7*a))*r),.25*e.rps));
};

let nd = e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)}k`:`${Math.round(e)}`;

function nx({values:e,tone:a}){
  let r=Math.min(...e),n=Math.max(...e),s=useMemo(()=>line().x((a,r)=>nl(r,0,e.length-1,.75,59.25)).y(e=>nl(e,r,n,18.5,1.5)).curve(av.G)(e)??"", [e,r,n]);
  return (
    <svg width={60} height={20} aria-hidden="true" className={lQ(a,"shrink-0 overflow-visible")}>
        <path d={s} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
  );
}


export default function dashboard_14__Sorbet__Component(){
  let[e,a]=useState(""),[r,s]=useState(ns[1].id),[i,o]=useState(null),[d,x]=function(){
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
  }(),{ref:_,edges:h,onScroll:b}=nt(),{ref:p,edges:u,onScroll:m}=nt(),{ref:k,edges:f,onScroll:v}=nt(),g=useMemo(()=>{
    let a=e.trim().toLowerCase();
    return a?ns.filter(e=>e.name.toLowerCase().includes(a)||e.repo.toLowerCase().includes(a)||e.region.toLowerCase().includes(a)):ns;
  }, [e]),w=ns.find(e=>e.id===r)??ns[0],j=useMemo(()=>nc(w), [w]),N=no[w.id]??[],y=x.width,A=x.height,M=Math.max(y-36-8,1),S=Math.max(A-12-20,1),z=useMemo(()=>{
    let e=1.12*Math.max(...j)/2,a=10**Math.floor(Math.log10(e)),r=e/a,t=(r<=1?1:r<=2?2:r<=5?5:10)*a;
    return Math.ceil(1.12*Math.max(...j)/t)*t;
  }, [j]),R=useMemo(()=>{
    if(0===y)return null;
    let e=e=>36+nl(e,0,39,0,M),a=e=>12+S-nl(e,0,z,0,S);
    return {x:e,y:a,linePath:line().x((a,r)=>e(r)).y(e=>a(e)).curve(av.G)(j)??"",areaPath:area().x((a,r)=>e(r)).y0(12+S).y1(e=>a(e)).curve(av.G)(j)??""};
  }, [y,M,S,z,j]),$=null===i?j[39]:j[i],D=ni[w.health],W=D.Icon,L=[{label:"Requests",value:`${nd(w.rps)}/s`},{label:"p95 latency",value:`${w.p95.toLocaleString("en-US")}ms`},{label:"Error rate",value:`${w.errorRate}%`,tone:w.errorRate>=5?l1:w.errorRate>=1?l0:undefined},{label:"Saturation",value:`${w.saturation}%`}];
  return (
    <div className={lQ("bg-white dark:bg-neutral-950",lX,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <HugeiconsIcon icon={Icon_36048} size={18} strokeWidth={2} aria-hidden="true" className={lQ(lY,"shrink-0")} />
            <h1 className={lQ("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",lX,"truncate")}>Service health</h1>
            <span className={lQ("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>{ns.length}</span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className={lQ("text-[13px]/[16px] font-semibold tabular-nums",lY,"hidden items-center gap-1.5 sm:inline-flex")}>
              <span>Live</span>
              <span>5s</span>
            </span>
            <button type="button" className={lQ(l6,l8)}>
              <HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" />
              Refresh
            </button>
          </div>
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div ref={k} onScroll={v} className="flex min-h-0 flex-1 flex-col max-lg:overflow-y-auto">
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 px-4 pb-4 max-lg:flex-none lg:grid-cols-[320px_minmax(0,1fr)] sm:px-6 sm:pb-6">
              <div className={lQ("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","lg:min-h-0")}>
                <div className="shrink-0 p-2">
                  <div className={lQ("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10")}>
                    <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                      <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <input type="search" value={e} onChange={e=>a(e.target.value)} placeholder="Filter services" aria-label="Filter services" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
                  </div>
                </div>
                <div className="relative min-h-0 flex-1">
                  <div ref={_} onScroll={b} className="h-full overflow-y-auto">
                    {0===g.length?<div className="flex h-full flex-col items-center justify-center px-6 text-center">
                      <HugeiconsIcon icon={Icon_66575} size={20} strokeWidth={2} aria-hidden="true" className={lY} />
                      <p className={lQ("text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100","mt-2")}>No services match</p>
                      <p className={lQ("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5")}>Try a repo path or a region.</p>
                    </div>:<ul className="space-y-0.5 px-2 pb-2">
                      {g.map(e=>{
                        let a=e.id===r,l=ni[e.health];
                        return (
                          <li key={e.id}>
                                                <button type="button" aria-current={a?"true":undefined} onClick={()=>{
                                                  s(e.id),o(null)
                                                }} className={lQ(l3,a?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10",l5,lZ,"px-2")}>
                                                  <span className={l7}>
                                                    <span className={ne}><span className="truncate">{e.name}</span></span>
                                                    <span data-description className={lQ(l2,lY,"flex min-w-0 gap-2")}>
                                                      <span className="truncate">{e.repo}</span>
                                                      <span className="shrink-0">{e.region}</span>
                                                    </span>
                                                  </span>
                                                  <span className="flex shrink-0 flex-col items-end gap-0.5">
                                                    <span className={lQ(l4,tone)}>{label}</span>
                                                    <nx values={nc(e)} tone={spark} />
                                                  </span>
                                                </button>
                                              </li>
                        );
                      })}
                    </ul>}
                  </div>
                  <div aria-hidden="true" className={lQ("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 top-0 h-8",h.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={lQ("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 bottom-0 h-8",h.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
              <div className={lQ("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","lg:min-h-0")}>
                <div className={lQ("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","flex-wrap justify-between py-3 has-[button]:pe-4")}>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className={l9}>{w.name}</h2>
                      <span className={lQ("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",D.tone,"shrink-0")}>
                        <HugeiconsIcon icon={W} size={16} strokeWidth={2} aria-hidden="true" />
                        {D.label}
                      </span>
                    </div>
                    <p className={lQ("text-[14px]/[20px] font-medium",lY,"mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5")}>
                      <span className={lQ(l2,"inline-flex items-center gap-1")}>
                        <HugeiconsIcon icon={Icon_33126} size={14} strokeWidth={2} aria-hidden="true" />
                        {w.repo}
                      </span>
                      <span className={l2}>{w.version}</span>
                      <span>
                        {w.deployedBy}
                        {", "}
                        {w.deployedAt}
                      </span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button type="button" className={lQ(l6,l8)}>
                      <HugeiconsIcon icon={Icon_52975} size={18} strokeWidth={2} aria-hidden="true" />
                      Logs
                    </button>
                    <button type="button" className={lQ("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",l8)}>
                      Roll back
                      <HugeiconsIcon icon={Icon_1497} size={18} strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className={lQ("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","min-h-0 flex-1")}>
                  <div className="shrink-0 p-1">
                    <dl className="grid grid-cols-2 gap-1 md:grid-cols-4">
                      {L.map(e=>(
                        <div key={e.label} className={lQ("flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4",lZ)}>
                                            <dt className={lQ("text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78","truncate")}>{e.label}</dt>
                                            <dd className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100">{e.tone?<span className={e.tone}>{e.value}</span>:e.value}</dd>
                                          </div>
                      ))}
                    </dl>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col px-1.5">
                    <div className="flex shrink-0 items-baseline justify-between gap-2 px-2.5 pt-3 pb-1.5">
                      <h3 className={l9}>Throughput</h3>
                      <span className={lQ("shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","flex gap-2")}>
                        <span>{null===i?"last 40 min":`t−${39-i} min`}</span>
                        <span className={lX}>
                          {nd($)}
                          /s
                        </span>
                      </span>
                    </div>
                    <div ref={d} role="application" tabIndex={0} aria-label={`Throughput for ${w.name} over the last 40 minutes`} onPointerMove={e=>{
                      let a=d.current;
                      if(!a||M<=0)return;
                      let r=a.getBoundingClientRect();
                      o(nn(Math.round((e.clientX-r.left-36)/M*39),0,39))
                    }} onPointerLeave={()=>o(null)} onKeyDown={e=>{
                      ("ArrowLeft"===e.key||"ArrowRight"===e.key)&&(e.preventDefault(),o(a=>nn((a??39)+("ArrowRight"===e.key?1:-1),0,39)))
                    }} onBlur={()=>o(null)} className={lQ(l5,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","relative min-h-[130px] flex-1 px-1 pb-1")}>
                      {R&&<svg width={y} height={A} className="overflow-visible" aria-hidden="true">
                        {[0,.5,1].map(e=>(
                          <g key={e}>
                                                <line x1={36} x2={y-8} y1={R.y(z*e)} y2={R.y(z*e)} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900/6 dark:stroke-neutral-100/8" />
                                                <text x={0} y={R.y(z*e)} dy={-4} textAnchor="start" className="fill-neutral-900/60 text-[12px] font-semibold tabular-nums dark:fill-neutral-100/60">{nd(z*e)}</text>
                                              </g>
                        ))}
                        <path d={R.areaPath} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
                        <path d={R.linePath} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" />
                        {null!==i&&<g>
                          <line x1={R.x(i)} x2={R.x(i)} y1={12} y2={12+S} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900/40 dark:stroke-neutral-100/45" />
                          <rect x={R.x(i)-4} y={R.y(j[i])-4} width={8} height={8} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] stroke-white stroke-[2.5] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))] dark:stroke-neutral-900" />
                        </g>}
                      </svg>}
                    </div>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col">
                    <h3 className={lQ(l9,"shrink-0 px-4 pt-2.5 pb-1.5")}>Recent activity</h3>
                    <div className="relative min-h-0 flex-1">
                      <div ref={p} onScroll={m} className="h-full overflow-y-auto">
                        <ul className="divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7">
                          {N.map(e=>(
                            <li key={e.id} className={lQ(l3,"px-4")}>
                                                    <span className={l7}>
                                                      <span className={ne}><span className="truncate">{e.text}</span></span>
                                                      <span data-description className={lQ("line-clamp-2 text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","truncate")}>
                                                        <span>{e.meta[0]}</span>
                                                        <span className="ms-2">{e.meta[1]}</span>
                                                      </span>
                                                    </span>
                                                    <span className={lQ(l4,ni[e.kind].tone,"shrink-0")}>{ni[e.kind].label}</span>
                                                  </li>
                          ))}
                        </ul>
                      </div>
                      <div aria-hidden="true" className={lQ(na,"pointer-events-none absolute inset-x-0 top-0 h-6",u.start?"opacity-100":"opacity-0")} />
                      <div aria-hidden="true" className={lQ(nr,"pointer-events-none absolute inset-x-0 bottom-0 h-6",u.end?"opacity-100":"opacity-0")} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={lQ(na,"pointer-events-none absolute inset-x-0 top-0 h-8",f.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={lQ(nr,"pointer-events-none absolute inset-x-0 bottom-0 h-8",f.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}
