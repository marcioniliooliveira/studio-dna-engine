/**
 * React Bits Pro — Application UI (dashboard-13 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_77378 = [["path",{d:"M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.99707 16.999C11.5286 16.999 18.9122 15.5348 18.6979 6.43269M16.4886 8.04302L18.3721 6.14612C18.5656 5.95127 18.8798 5.94981 19.0751 6.14286L20.9971 8.04302",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_88294 = [["path",{d:"M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6.99707 5.99902C10.5286 5.999 17.9122 7.46328 17.6979 16.5654M15.4886 14.955L17.3721 16.8519C17.5656 17.0468 17.8798 17.0482 18.0751 16.8552L19.9971 14.955",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_71270 = [["path",{d:"M15.1312 2.5C14.1462 2.17555 13.0936 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.9548 21.8396 9.94704 21.5422 9",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M19.5 4.5L12 12M19.5 4.5V2M19.5 4.5H22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_85585 = [["path",{d:"M5.0249 21C5.04385 19.2643 5.04366 17.5541 5.0366 15.9209M5.0366 15.9209C5.01301 10.4614 4.91276 5.86186 5.19475 4.04271C5.5611 1.67939 9.39301 3.82993 13.9703 5.59842L16.0328 6.48729C17.5508 7.1415 19.7187 8.30352 18.7662 9.66084C18.3738 10.22 17.56 10.8596 16.0575 11.567L5.0366 15.9209Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_84341 = [["path",{d:"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 10.875V13.125M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

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

let lx = (...e)=>e.filter(Boolean).join(" ");

let l_ = "text-neutral-900 dark:text-neutral-100";

let lh = "text-neutral-900/62 dark:text-neutral-100/62";

let lb = "bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]";

let lp = "text-[14px]/[20px] font-medium";

let lu = "text-[13px]/[16px] font-bold tabular-nums";

let lm = "text-[13px]/[16px] font-semibold tabular-nums";

let lk = "text-[34px]/[40px] font-extrabold tracking-[-0.02em] tabular-nums";

let lf = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let lv = "min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100";

let lg = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]";

let lw = "flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5";

let lj = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let lN = "flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5";

let ly = "relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16";

let lA = "flex min-w-0 flex-1 flex-col gap-0.5";

let lM = "flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let lS = "relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]";

let lz = "block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]";

let lR = "fill-neutral-900/60 text-[12px] font-semibold tabular-nums dark:fill-neutral-100/60";

let l$ = "fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]";

let lD = "fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] stroke-white stroke-[2.5] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))] dark:stroke-neutral-900";

let lW = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let lL = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

function lC(){
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

let lI = (e,a,r,t,l)=>t+(e-a)/(r-a||1)*(l-t);

let lB = (e,a,r)=>Math.min(r,Math.max(a,e));

let lE = e=>`${Math.round(e)}%`;

let lP = [{id:"o1",name:"Make the first hour obvious",lead:"Ines Halvorsen",meta:"Activation",results:[{id:"o1r1",name:"Reach first saved project in under 6 minutes",owner:"IH",unit:"percent",start:34,target:70,current:61},{id:"o1r2",name:"Cut setup steps from nine to four",owner:"TM",unit:"count",start:9,target:4,current:5},{id:"o1r3",name:"Lift week-one return visits",owner:"IH",unit:"percent",start:41,target:58,current:47}]},{id:"o2",name:"Earn the second seat",lead:"Dovid Aranyi",meta:"Expansion",results:[{id:"o2r1",name:"Workspaces with two or more editors",owner:"DA",unit:"count",start:820,target:1600,current:1418},{id:"o2r2",name:"Net revenue retention",owner:"PS",unit:"percent",start:104,target:118,current:113},{id:"o2r3",name:"Invites accepted within a day",owner:"DA",unit:"percent",start:52,target:75,current:58}]},{id:"o3",name:"Answer before people ask",lead:"Runa Petit",meta:"Support",results:[{id:"o3r1",name:"Median first reply",owner:"RP",unit:"count",start:240,target:45,current:68},{id:"o3r2",name:"Tickets closed without a handoff",owner:"KO",unit:"percent",start:62,target:85,current:81},{id:"o3r3",name:"Docs deflection rate",owner:"RP",unit:"percent",start:18,target:40,current:22}]},{id:"o4",name:"Ship on a predictable cadence",lead:"Marta L\xf8ken",meta:"Platform",results:[{id:"o4r1",name:"Releases per week",owner:"ML",unit:"count",start:2,target:6,current:5},{id:"o4r2",name:"Change failure rate",owner:"JB",unit:"percent",start:21,target:8,current:11},{id:"o4r3",name:"Build minutes per merge",owner:"ML",unit:"count",start:34,target:15,current:26}]},{id:"o5",name:"Make pricing legible",lead:"Priya Sundar",meta:"Revenue",results:[{id:"o5r1",name:"Plan page visits that reach checkout",owner:"PS",unit:"percent",start:12,target:24,current:19},{id:"o5r2",name:"Support threads asking what a seat costs",owner:"RP",unit:"count",start:180,target:40,current:74},{id:"o5r3",name:"Annual plans as a share of new revenue",owner:"PS",unit:"percent",start:28,target:45,current:39}]},{id:"o6",name:"Keep the editor fast under load",lead:"Jonas Brekke",meta:"Performance",results:[{id:"o6r1",name:"p95 interaction latency",owner:"JB",unit:"count",start:310,target:120,current:168},{id:"o6r2",name:"Documents over 5MB that open cleanly",owner:"ML",unit:"percent",start:71,target:96,current:92},{id:"o6r3",name:"Client bundle size",owner:"JB",unit:"count",start:1240,target:700,current:918}]},{id:"o7",name:"Hire the team we planned for",lead:"Tom\xe1s Miralles",meta:"People",results:[{id:"o7r1",name:"Open roles closed this quarter",owner:"TM",unit:"count",start:0,target:9,current:6},{id:"o7r2",name:"Offer acceptance rate",owner:"TM",unit:"percent",start:64,target:85,current:78},{id:"o7r3",name:"Days from screen to offer",owner:"KO",unit:"count",start:31,target:14,current:21}]}];

let lO = Array.from({length:13},(e,a)=>`W${a+1}`);

let lF = e=>{
  let a=e.target-e.start;
  return 0===a?100:lB((e.current-e.start)/a*100,0,100);
};

let lT = (e,a)=>{
  let r=Math.round(a);
  return "percent"===e.unit?`${r}%`:"money"===e.unit?`$${r.toLocaleString("en-US")}`:r.toLocaleString("en-US");
};

let lU = e=>e.results.reduce((e,a)=>e+lF(a),0)/e.results.length;

let lV = e=>e>=79.23076923076923?"ahead":e>=59.230769230769226?"on":"behind";

let lH = {ahead:{label:"Ahead",Icon:Icon_77378,tone:l_},on:{label:"On pace",Icon:Icon_99199,tone:lh},behind:{label:"Behind",Icon:Icon_88294,tone:lh}};


export default function dashboard_13__Sorbet__Component(){
  let[e,a]=useState(lP[0].id),[r,s]=useState(null),[i,o]=function(){
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
  }(),{ref:c,edges:d,onScroll:x}=lC(),{ref:_,edges:h,onScroll:b}=lC(),p=lP.find(a=>a.id===e)??lP[0],u=useMemo(()=>lP.reduce((e,a)=>e+lU(a),0)/lP.length, []),m=useMemo(()=>lP.flatMap(e=>e.results).filter(e=>"behind"===lV(lF(e))).length, []),k=useMemo(()=>{
    let e=lU(p),a=p.id.charCodeAt(1),r=Array.from({length:9},(r,t)=>{
      let l=t/8;
      return lB(e*(.16+.84*l)+11*(.5*Math.sin(.42*t+a)+.3*Math.sin(.17*t+1.6*a))*(1-.35*l),0,100);
    });
    return r[8]=e,{actual:r,plan:Array.from({length:13},(e,a)=>a/12*100),end:e};
  }, [p]),f=o.width,v=o.height,g=Math.max(f-40-4,1),w=Math.max(v-12-22,1),j=useMemo(()=>{
    if(0===f)return null;
    let e=e=>40+lI(e,0,12,0,g),a=e=>12+w-lI(e,0,100,0,w),r=line().x((a,r)=>e(r)).y(e=>a(e)).curve(av.G),t=area().x((a,r)=>e(r)).y0(12+w).y1(e=>a(e)).curve(av.G);
    return {x:e,y:a,actualLine:r(k.actual)??"",actualArea:t(k.actual)??"",planLine:r(k.plan)??""};
  }, [f,g,w,k]),N=null===r?{label:"Week 9",actual:k.end,plan:k.plan[8]}:{label:`Week ${r+1}`,actual:r<9?k.actual[r]:NaN,plan:k.plan[r]},y=lV(u),A=lH[y].Icon;
  return (
    <div className={lx("bg-white dark:bg-neutral-950",l_,"relative flex h-full min-h-[880px] w-full flex-col overflow-hidden")}>
        <header className="flex shrink-0 flex-wrap items-end justify-between gap-3 px-4 pt-5 pb-4 sm:px-6">
          <div className="min-w-0">
            <h1 className={lx("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",l_)}>Company goals</h1>
            <div className={lx(lp,lh,"mt-1.5 flex items-center gap-2")}>
              <HugeiconsIcon icon={Icon_71270} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
              <span>Q2 scorecard</span>
              <span>
                {"week "}
                9
                {" of "}
                13
              </span>
            </div>
          </div>
          <dl className="flex items-end gap-5">
            <div className="text-right">
              <dt className={lx(lm,lh)}>Overall</dt>
              <dd className={lx(lk,l_,"mt-0.5")}>{lE(u)}</dd>
            </div>
            <div className="text-right">
              <dt className={lx(lm,lh)}>Quarter elapsed</dt>
              <dd className={lx(lk,lh,"mt-0.5")}>{lE(69.23076923076923)}</dd>
            </div>
            <div className="pb-1 text-right">
              <dt className={lx(lm,lh)}>Key results at risk</dt>
              <dd className={lx("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",m>0?"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]":"text-neutral-900/62 dark:text-neutral-100/62","mt-1")}>{m}</dd>
            </div>
          </dl>
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div ref={_} onScroll={b} className="flex min-h-0 flex-1 flex-col max-lg:overflow-y-auto">
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 px-4 pb-4 max-lg:flex-none lg:grid-cols-[340px_minmax(0,1fr)] sm:px-6 sm:pb-6">
              <div className={lx(lg,"lg:min-h-0")}>
                <div className={lx(lw,"justify-between py-3")}>
                  <h2 className={lv}>Objectives</h2>
                  <span className="shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{lP.length}</span>
                </div>
                <div className={lx(lj,"relative min-h-0 flex-1")}>
                  <div ref={c} onScroll={x} className="h-full overflow-y-auto">
                    <ul className="space-y-0.5 p-1">
                      {lP.map(r=>{
                        let l=lU(r),i=lV(l),o=lH[i].Icon,c=r.id===e;
                        return (
                          <li key={r.id}>
                                                <button type="button" aria-current={c?"true":undefined} onClick={()=>{
                                                  a(r.id),s(null)
                                                }} className={lx(ly,c?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10",lf,"rounded-[var(--rb-r-4xl,18px)]","px-2")}>
                                                  <div className={lA}>
                                                    <div className="flex items-start gap-2">
                                                      <HugeiconsIcon icon={Icon_85585} size={16} strokeWidth={2} aria-hidden="true" className={lx(lh,"mt-0.5 shrink-0")} />
                                                      <span className={lx(lM,"flex-1")}>{r.name}</span>
                                                      <HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={2} aria-hidden="true" className={lx(c?"text-neutral-900/78 dark:text-neutral-100/78":lh,"mt-0.5 shrink-0")} />
                                                    </div>
                                                    <div className={lx("shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","mt-1 flex items-center gap-2 pl-5.5")}>
                                                      <span className="truncate">{r.meta}</span>
                                                      <span className="truncate">{r.lead}</span>
                                                    </div>
                                                    <div className="mt-2 flex items-center gap-2 pl-5.5">
                                                      <span aria-hidden="true" className={lx(lS,"flex-1")}>
                                                        <span className={"behind"===i?lx(lb,"block h-full"):lz} style={{width:`${l}%`}} />
                                                      </span>
                                                      <span className={lx(lu,"w-8 shrink-0 text-right")}>{lE(l)}</span>
                                                      <HugeiconsIcon icon={o} size={16} strokeWidth={2} aria-hidden="true" className={lx(lH[i].tone,"shrink-0")} />
                                                    </div>
                                                  </div>
                                                </button>
                                              </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div aria-hidden="true" className={lx(lW,"pointer-events-none absolute inset-x-0 top-0 h-8",d.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={lx(lL,"pointer-events-none absolute inset-x-0 bottom-0 h-8",d.end?"opacity-100":"opacity-0")} />
                </div>
                <div className={lx(lN,"justify-between")}>
                  <span className="inline-flex items-center gap-1.5">
                    <HugeiconsIcon icon={A} size={16} strokeWidth={2} aria-hidden="true" className={lH[y].tone} />
                    {lH[y].label}
                    {" against the quarter"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:min-h-0">
                <div className={lx(lg,"min-h-0 flex-1")}>
                  <div className={lx(lw,"flex-wrap justify-between py-3")}>
                    <div className="min-w-0">
                      <h2 className={lv}>{p.name}</h2>
                      <p className={lx("text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5 flex min-w-0 gap-2")}>
                        <span className="shrink-0">{N.label}</span>
                        <span className="shrink-0">{Number.isNaN(N.actual)?"not reached yet":`${lE(N.actual)} done`}</span>
                        <span className="truncate">
                          {"plan "}
                          {lE(N.plan)}
                        </span>
                      </p>
                    </div>
                    <div className={lx(lm,lh,"flex shrink-0 items-center gap-4")}>
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className={lx("text-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:text-[var(--rb-accent,oklch(81%_0.16_163))]","h-1 w-4 bg-current")} />
                        Actual
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className={lx("text-neutral-900/40 dark:text-neutral-100/45","h-0 w-4 border-t border-dashed border-current")} />
                        Plan
                      </span>
                    </div>
                  </div>
                  <div className={lx(lj,"min-h-0 flex-1")}>
                    <div ref={i} role="application" tabIndex={0} aria-label={`Burn-up of ${p.name} across 13 weeks`} onPointerMove={e=>{
                      let a=i.current;
                      if(!a||g<=0)return;
                      let r=a.getBoundingClientRect();
                      s(lB(Math.round((e.clientX-r.left-40)/g*12),0,12))
                    }} onPointerLeave={()=>s(null)} onKeyDown={e=>{
                      ("ArrowLeft"===e.key||"ArrowRight"===e.key)&&(e.preventDefault(),s(a=>lB((a??8)+("ArrowRight"===e.key?1:-1),0,12)))
                    }} onBlur={()=>s(null)} className={lx(lf,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","relative min-h-[172px] flex-1 p-3")}>
                      {j&&<svg width={f} height={v} className="overflow-visible" aria-hidden="true">
                        {[0,25,50,75,100].map(e=>(
                          <g key={e}>
                                                <line x1={40} x2={f-4} y1={j.y(e)} y2={j.y(e)} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900/6 dark:stroke-neutral-100/8" />
                                                <text x={32} y={j.y(e)} dy={3.5} textAnchor="end" className={lR}>
                                                  {e}
                                                  %
                                                </text>
                                              </g>
                        ))}
                        <rect x={j.x(8)} y={12} width={Math.max(j.x(12)-j.x(8),0)} height={w} className={l$} />
                        <path d={j.planLine} fill="none" strokeWidth={2} strokeDasharray="6 4" className="stroke-neutral-900/40 dark:stroke-neutral-100/45" />
                        <path d={j.actualArea} className={l$} />
                        <path d={j.actualLine} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" />
                        <rect x={j.x(8)-4} y={j.y(k.end)-4} width={8} height={8} className={lD} />
                        {lO.map((e,a)=>a%2==0?<text key={e} x={j.x(a)} y={v-2} textAnchor={0===a?"start":12===a?"end":"middle"} className={lR}>{e}</text>:null)}
                        {null!==r&&<g>
                          <line x1={j.x(r)} x2={j.x(r)} y1={12} y2={12+w} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900/40 dark:stroke-neutral-100/45" />
                          <rect x={j.x(r)-4} y={j.y(r<9?k.actual[r]:k.plan[r])-4} width={8} height={8} className={lD} />
                        </g>}
                      </svg>}
                    </div>
                  </div>
                </div>
                <div className={lx(lg,"shrink-0")}>
                  <div className={lx(lw,"justify-between py-3")}>
                    <h2 className={lv}>Key results</h2>
                    <span className={lx(lp,lh,"truncate")}>Start → target, current in bold</span>
                  </div>
                  <ul className={lx(lj,"divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7")}>
                    {p.results.map(e=>{
                      let a=lF(e),r=lV(a),l=lH[r].Icon;
                      return (
                        <li key={e.id} className={lx(ly,"px-3")}>
                                            <span className={lx("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[28px]")}>
                                              <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{e.owner}</span>
                                            </span>
                                            <div className={lA}>
                                              <p className={lM}><span className="truncate">{e.name}</span></p>
                                              <div className="mt-1.5 flex items-center gap-2">
                                                <span aria-hidden="true" className={lx(lS,"max-w-[220px] flex-1")}>
                                                  <span className={"behind"===r?lx(lb,"block h-full"):lz} style={{width:`${a}%`}} />
                                                </span>
                                                <span className={lx(lm,lh)}>
                                                  {lT(e,e.start)}
                                                  {" →"}
                                                  {" "}
                                                  <strong className={lx(lu,l_)}>{lT(e,e.current)}</strong>
                                                  {" "}
                                                  {"→ "}
                                                  {lT(e,e.target)}
                                                </span>
                                              </div>
                                            </div>
                                            <span className={lx(lu,lH[r].tone,"inline-flex shrink-0 items-center gap-1.5")}>
                                              <HugeiconsIcon icon={l} size={16} strokeWidth={2} aria-hidden="true" />
                                              {lE(a)}
                                            </span>
                                          </li>
                      );
                    })}
                  </ul>
                  <div className={lN}>
                    <HugeiconsIcon icon={Icon_84341} size={16} strokeWidth={2} aria-hidden="true" />
                    {"Pace compares progress with "}
                    {lE(69.23076923076923)}
                    {" of the quarter spent."}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={lx(lW,"pointer-events-none absolute inset-x-0 top-0 h-8",h.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={lx(lL,"pointer-events-none absolute inset-x-0 bottom-0 h-8",h.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}
