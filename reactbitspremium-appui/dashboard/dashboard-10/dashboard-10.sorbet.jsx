/**
 * React Bits Pro — Application UI (dashboard-10 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { area, line } from 'd3-shape';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_35619 = [["path",{d:"M17 21C18.8692 21 19.8038 21 20.5 20.5981C20.9561 20.3348 21.3348 19.9561 21.5981 19.5C22 18.8038 22 17.8692 22 16C22 14.1308 22 13.1962 21.5981 12.5C21.3348 12.0439 20.9561 11.6652 20.5 11.4019C19.8038 11 18.8692 11 17 11H7C5.13077 11 4.19615 11 3.5 11.4019C3.04394 11.6652 2.66523 12.0439 2.40192 12.5C2 13.1962 2 14.1308 2 16C2 17.8692 2 18.8038 2.40192 19.5C2.66523 19.9561 3.04394 20.3348 3.5 20.5981C4.19615 21 5.13077 21 7 21H17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16 6C15.0227 4.77354 13.5929 4 12 4C10.4071 4 8.97726 4.77354 8 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14 8C13.5114 7.38677 12.7965 7 12 7C11.2035 7 10.4886 7.38677 10 8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M5 14V18H6.5M19 18H17V16M17 16V14H19M17 16H18.5M9 14V18M11.5 14L13 18L14.5 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_99519 = [["path",{d:"M15.5 2V6M8.5 6V2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6.00446 7.61331C5.93719 6.74273 6.63957 6 7.53014 6H16.4699C17.3604 6 18.0628 6.74273 17.9955 7.61331L17.8117 9.99197C17.6796 11.7019 17.1011 13.3498 16.132 14.7773L15.5312 15.6622C14.9638 16.4979 14.0077 17 12.9838 17H11.0162C9.99228 17 9.03617 16.4979 8.46881 15.6622L7.86803 14.7773C6.89885 13.3498 6.32041 11.7019 6.18827 9.99197L6.00446 7.61331Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 17V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M11 9H13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_92881 = [["path",{d:"M3 19C3 18.535 3 18.3025 3.05111 18.1118C3.18981 17.5941 3.59413 17.1898 4.11177 17.0511C4.30252 17 4.53501 17 5 17H8C8.46499 17 8.69748 17 8.88823 17.0511C9.40587 17.1898 9.81019 17.5941 9.94889 18.1118C10 18.3025 10 18.535 10 19C10 19.465 10 19.6975 9.94889 19.8882C9.81019 20.4059 9.40587 20.8102 8.88823 20.9489C8.69748 21 8.46499 21 8 21H5C4.53501 21 4.30252 21 4.11177 20.9489C3.59413 20.8102 3.18981 20.4059 3.05111 19.8882C3 19.6975 3 19.465 3 19Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M14 5C14 4.53501 14 4.30252 14.0511 4.11177C14.1898 3.59413 14.5941 3.18981 15.1118 3.05111C15.3025 3 15.535 3 16 3H19C19.465 3 19.6975 3 19.8882 3.05111C20.4059 3.18981 20.8102 3.59413 20.9489 4.11177C21 4.30252 21 4.53501 21 5C21 5.46499 21 5.69748 20.9489 5.88823C20.8102 6.40587 20.4059 6.81019 19.8882 6.94889C19.6975 7 19.465 7 19 7H16C15.535 7 15.3025 7 15.1118 6.94889C14.5941 6.81019 14.1898 6.40587 14.0511 5.88823C14 5.69748 14 5.46499 14 5Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M9 12H8.5C6.567 12 5 10.433 5 8.5C5 6.567 6.56687 5 8.49987 5H14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10 19H15.5C17.433 19 19 17.433 19 15.5C19 13.567 17.4336 12 15.5006 12H15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10.6325 10.467C11.277 9.82235 11.5993 9.50001 11.9998 9.5C12.4003 9.49999 12.7226 9.82229 13.3672 10.4669L13.5332 10.6329C14.1777 11.2774 14.5 11.5997 14.5 12.0002C14.5 12.4007 14.1777 12.723 13.5331 13.3675L13.3673 13.5333C12.7227 14.1778 12.4005 14.5 12 14.5C11.5996 14.5 11.2773 14.1778 10.6328 13.5333L10.4669 13.3674C9.82231 12.7229 9.50003 12.4007 9.5 12.0002C9.49997 11.5997 9.82221 11.2774 10.4667 10.6329L10.6325 10.467Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_10303 = [["path",{d:"M6 12V8C6 7.05719 6 6.58579 6.29289 6.29289C6.58579 6 7.05719 6 8 6H12C12.9428 6 13.4142 6 13.7071 6.29289C14 6.58579 14 7.05719 14 8V12C14 12.9428 14 13.4142 13.7071 13.7071C13.4142 14 12.9428 14 12 14H8C7.05719 14 6.58579 14 6.29289 13.7071C6 13.4142 6 12.9428 6 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2 20V16C2 15.0572 2 14.5858 2.29289 14.2929C2.58579 14 3.05719 14 4 14H8C8.94281 14 9.41421 14 9.70711 14.2929C10 14.5858 10 15.0572 10 16V20C10 20.9428 10 21.4142 9.70711 21.7071C9.41421 22 8.94281 22 8 22H4C3.05719 22 2.58579 22 2.29289 21.7071C2 21.4142 2 20.9428 2 20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M10 20V16C10 15.0572 10 14.5858 10.2929 14.2929C10.5858 14 11.0572 14 12 14H16C16.9428 14 17.4142 14 17.7071 14.2929C18 14.5858 18 15.0572 18 16V20C18 20.9428 18 21.4142 17.7071 21.7071C17.4142 22 16.9428 22 16 22H12C11.0572 22 10.5858 22 10.2929 21.7071C10 21.4142 10 20.9428 10 20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 21.5L21.4142 18.0858C21.7032 17.7968 21.8478 17.6522 21.9239 17.4685C22 17.2847 22 17.0803 22 16.6716V12C22 11.0572 22 10.5858 21.7071 10.2929C21.4142 10 20.9428 10 20 10H18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M6 10L2.58579 13.4142C2.29676 13.7032 2.15224 13.8478 2.07612 14.0315C2 14.2153 2 14.4197 2 14.8284V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M14 13.5L17.317 10.5976C17.6532 10.3035 17.8213 10.1564 17.9106 9.95945C18 9.7625 18 9.53916 18 9.09246V4C18 3.05719 18 2.58579 17.7071 2.29289C17.4142 2 16.9428 2 16 2H11.2604C10.8845 2 10.6965 2 10.5248 2.06528C10.3531 2.13056 10.2126 2.25543 9.93167 2.50518L6.67127 5.40331C6.34077 5.69709 6.17552 5.84398 6.08776 6.03941C6 6.23484 6 6.45594 6 6.89813V9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M14 6L17.5 2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M18 14L21.5 10.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_52975 = [["path",{d:"M15 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V9M20 4L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20 13C20 16.7712 20 18.6569 18.8284 19.8284C17.6569 21 15.7712 21 12 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V12C3 8.22876 3 6.34315 4.17157 5.17157C5.34315 4 7.22876 4 11 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];

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

let ry = (...e)=>e.filter(Boolean).join(" ");

let rA = "text-neutral-900 dark:text-neutral-100";

let rM = "text-neutral-900/62 dark:text-neutral-100/62";

let rS = "divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7";

let rz = "text-[14px]/[20px] font-medium";

let rR = "text-[13px]/[16px] font-semibold tabular-nums";

let r$ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let rD = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let rW = "min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100";

let rL = "text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78";

let rC = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]";

let rI = "flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5";

let rB = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let rE = "relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16";

let rP = "flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let rO = "fill-neutral-900/60 text-[12px] font-semibold tabular-nums dark:fill-neutral-100/60";

let rF = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let rT = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let rU = (e,a,r,t,l)=>t+(e-a)/(r-a||1)*(l-t);

let rV = (e,a,r)=>Math.min(r,Math.max(a,e));

let rH = e=>e.toLocaleString("en-US");

function rK(){
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

let rJ = Array.from({length:28},(e,a)=>{
  let r=28+a;
  return r>31?`${r-31} Sep`:`${r} Aug`;
});

let rG = (e,a,r)=>Array.from({length:28},(t,l)=>Math.round(a+(.5*Math.sin(.44*l+e)+.36*Math.sin(.17*l+1.6*e))*r));

let rq = e=>`${Math.floor(e/60)}:${String(Math.round(e%60)).padStart(2,"0")}`;

let rQ = [{key:"calls",label:"Calls",format:rH,headline:rH,series:rG(1.2,77e3,6400)},{key:"duration",label:"Avg. duration",format:rq,headline:rq,series:rG(3.4,171,22)},{key:"credits",label:"Total credits",unit:"credits",format:rH,headline:rH,series:rG(5.1,33400,4800)},{key:"perCall",label:"Credits per call",unit:"credits",format:e=>e.toFixed(2),headline:e=>e.toFixed(2),series:rG(7.6,43,7).map(e=>e/10)},{key:"llm",label:"Total LLM cost",format:e=>`$${rH(e)}`,headline:e=>`$${rH(e)}`,series:rG(9.3,7258,980)},{key:"avgLlm",label:"Avg. LLM cost",format:e=>`$${e.toFixed(2)}`,headline:e=>`$${e.toFixed(2)}`,series:rG(11.8,258,34).map(e=>e/1)}];

let rX = [{name:"Docs support",scope:"help.center",calls:6424},{name:"Website concierge",scope:"www",calls:3942},{name:"Billing triage",scope:"billing",calls:1820},{name:"Onboarding guide",scope:"app.setup",calls:1194},{name:"Store assistant",scope:"shop",calls:1094},{name:"Returns desk",scope:"shop.returns",calls:812},{name:"Outage responder",scope:"status",calls:604},{name:"Renewal outreach",scope:"crm",calls:421}];

let rY = [{name:"Transcript store",detail:"Response traces and grading",Icon:Icon_36586,live:true},{name:"Escalation channel",detail:"Handoff alerts to on-call",Icon:Icon_35619,live:true},{name:"Voice gateway",detail:"SIP routing and failover",Icon:Icon_99519,live:true},{name:"Workflow runner",detail:"Post-call actions and tickets",Icon:Icon_92881,live:false},{name:"Knowledge index",detail:"Retrieval corpus sync",Icon:Icon_10303,live:false}];


export default function dashboard_10__Sorbet__Component(){
  let[e,a]=useState("calls"),[r,s]=useState(null),[i,o]=function(){
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
  }(),{ref:c,edges:d,onScroll:x}=rK(),{ref:_,edges:h,onScroll:b}=rK(),{ref:p,edges:u,onScroll:m}=rK(),k=rQ.find(a=>a.key===e)??rQ[0],f=o.width,v=o.height,g=Math.max(f-40-1,1),w=Math.max(v-14-22,1),j=useMemo(()=>{
    let e=k.series;
    return {min:Math.min(...e),max:Math.max(...e),last:e[e.length-1]};
  }, [k]),{base:N,top:y,ticks:A}=useMemo(()=>{
    let e=j.max-j.min||j.max||1,a=Math.max(j.max-j.min,.08*j.max),r=10**Math.floor(Math.log10(a/4||1)),t=a/4/r,l=(t<=1?1:t<=2?2:t<=5?5:10)*r,n=Math.max(Math.floor((j.min-.35*e)/l)*l,0),s=Math.ceil((j.max+.25*e)/l)*l,i=[];
    for(let e=n;e<=s+l/1e3;e+=l)i.push(e);
    return {base:n,top:s,ticks:i.length>6?i.filter((e,a)=>a%2==0):i};
  }, [j.max,j.min]),M=useMemo(()=>{
    if(0===f)return null;
    let e=e=>40+rU(e,0,k.series.length-1,0,g),a=e=>14+w-rU(e,N,y,0,w),r=line().x((a,r)=>e(r)).y(e=>a(e)).curve(av.G),t=area().x((a,r)=>e(r)).y0(14+w).y1(e=>a(e)).curve(av.G);
    return {x:e,y:a,stroke:r(k.series)??"",fill:t(k.series)??""};
  }, [f,g,w,N,y,k]),S=Math.ceil(28/rV(Math.floor(g/64),2,7)),z=Math.max(...rX.map(e=>e.calls)),R=rX.reduce((e,a)=>e+a.calls,0),$=null===r?j.last:k.series[r];
  return (
    <div className={ry("bg-white dark:bg-neutral-950",rA,"relative flex h-full min-h-[880px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div ref={p} onScroll={m} className="flex min-h-0 flex-1 flex-col max-lg:overflow-y-auto">
            <div className={ry(rC,"shrink-0")}>
              <div role="tablist" aria-label="Metric" className="grid shrink-0 grid-cols-3 px-1 md:grid-cols-6">
                {rQ.map(r=>{
                  let l=r.key===e,n=r.series[r.series.length-1];
                  return (
                    <button key={r.key} type="button" role="tab" aria-selected={l} onClick={()=>{
                                    a(r.key),s(null)
                                  }} className={ry("relative inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[calc(var(--rb-r-lg,10px))] px-3 text-[15px]/[20px] font-bold whitespace-nowrap text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-neutral-900 after:absolute after:inset-x-2.5 after:bottom-0 after:h-[3px] after:rounded-[calc(var(--rb-r-full,999px))] after:bg-transparent after:transition-[background-color] aria-selected:text-neutral-900 aria-selected:after:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:disabled:text-neutral-100/40","py-3 text-left")}>
                                    <span className="flex w-full min-w-0 flex-col">
                                      <span className={ry(rz,"truncate")}>{r.label}</span>
                                      <span className="mt-1 flex items-baseline gap-1">
                                        <span className={ry("text-[17px]/[22px] font-extrabold","shrink-0 tabular-nums")}>{r.headline(n)}</span>
                                        {r.unit&&<span className={ry("ms-0.5 text-[15px]/[20px] font-bold tracking-normal text-neutral-900/78 dark:text-neutral-100/78","min-w-0 truncate")}>{r.unit}</span>}
                                      </span>
                                    </span>
                                  </button>
                  );
                })}
              </div>
              <div className={ry(rB,"min-h-0 flex-1 p-4")}>
                <div className="flex shrink-0 flex-wrap items-end justify-between gap-x-3 gap-y-2">
                  <div className="min-w-0">
                    <p className={ry(rz,rM,"flex min-w-0 gap-2")}>
                      <span className="truncate">{k.label}</span>
                      <span className="shrink-0">{null===r?"last 28 days":rJ[r]}</span>
                    </p>
                    <p className={ry("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[34px]/[40px] font-extrabold tracking-[-0.02em] tabular-nums text-neutral-900 dark:text-neutral-100","mt-0.5")}>{k.format($)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <p className={ry(rR,rM,"flex gap-3")}>
                      <span>
                        Min
                        {" "}
                        <span className={rA}>{k.format(j.min)}</span>
                      </span>
                      <span>
                        Max
                        {" "}
                        <span className={rA}>{k.format(j.max)}</span>
                      </span>
                    </p>
                    <button type="button" className={ry(r$,rD)}>
                      Open report
                      <HugeiconsIcon icon={Icon_55299} size={18} strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div ref={i} role="application" tabIndex={0} aria-label={`${k.label} over the last 28 days`} onPointerMove={e=>{
                  let a=i.current;
                  if(!a||g<=0)return;
                  let r=a.getBoundingClientRect();
                  s(rV(Math.round((e.clientX-r.left-40)/g*27),0,27))
                }} onPointerLeave={()=>s(null)} onKeyDown={e=>{
                  ("ArrowLeft"===e.key||"ArrowRight"===e.key)&&(e.preventDefault(),s(a=>rV((a??27)+("ArrowRight"===e.key?1:-1),0,27)))
                }} onBlur={()=>s(null)} className={ry("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","relative mt-3 h-[224px] shrink-0")}>
                  {M&&<svg width={f} height={v} className="overflow-visible" aria-hidden="true">
                    {A.map(e=>{
                      let a;
                      return (
                        <g key={e}>
                                            <line x1={40} x2={f-1} y1={M.y(e)} y2={M.y(e)} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900/6 dark:stroke-neutral-100/8" />
                                            <text x={0} y={M.y(e)} dy={-4} textAnchor="start" className={rO}>
                                              {"duration"===k.key?rq(e):Math.abs(a=Math.round(100*e)/100)>=1e6?`${(a/1e6).toFixed(Math.abs(a)>=1e7?0:1)}M`:Math.abs(a)>=1e3?`${(a/1e3).toFixed(Math.abs(a)>=1e4?0:1)}k`:`${a}`}
                                            </text>
                                          </g>
                      );
                    })}
                    <path d={M.fill} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:fill-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_16%,transparent)]" />
                    <path d={M.stroke} fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]" />
                    {rJ.map((e,a)=>a%S==0?<text key={e} x={M.x(a)} y={v-4} textAnchor={0===a?"start":"middle"} className={rO}>{e}</text>:null)}
                    {null!==r&&<g>
                      <line x1={M.x(r)} x2={M.x(r)} y1={14} y2={14+w} strokeWidth={1} shapeRendering="crispEdges" className="stroke-neutral-900/40 dark:stroke-neutral-100/45" />
                      <rect x={M.x(r)-4} y={M.y(k.series[r])-4} width={8} height={8} className="fill-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] stroke-white stroke-[2.5] dark:fill-[var(--rb-accent,oklch(81%_0.16_163))] dark:stroke-neutral-900" />
                    </g>}
                  </svg>}
                </div>
              </div>
            </div>
            <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-4 max-lg:flex-none lg:grid-cols-2">
              <div className={ry(rC,"lg:min-h-0")}>
                <div className={ry(rI,"justify-between py-3")}>
                  <div className="min-w-0">
                    <h3 className={rW}>Busiest agents</h3>
                    <p className={ry(rL,"mt-0.5 flex min-w-0 gap-2")}>
                      <span className="truncate">Call volume</span>
                      <span className="shrink-0">
                        {rH(R)}
                        {" total"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={ry(rB,"relative min-h-0 flex-1")}>
                  <div ref={c} onScroll={x} className="h-full overflow-y-auto">
                    <ul className={rS}>
                      {rX.map((e,a)=>(
                        <li key={e.name} className={ry(rE,"h-10 px-3")}>
                                            <span className={ry(rR,rM,"w-4 shrink-0")}>{a+1}</span>
                                            <div className="relative min-w-0 flex-1">
                                              <span aria-hidden="true" className={ry("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]","rounded-[var(--rb-r-sm,6px)]","absolute inset-y-0 left-0")} style={{width:`${e.calls/z*100}%`}} />
                                              <span className={ry(rP,"relative px-2 py-1")}>
                                                <span className="truncate">{e.name}</span>
                                                <span className={ry("font-mono text-[12px]/[16px] tabular-nums",rM,"shrink-0 truncate")}>{e.scope}</span>
                                              </span>
                                            </div>
                                            <span className={ry("text-[15px]/[20px] font-bold","w-12 shrink-0 text-right tabular-nums")}>{rH(e.calls)}</span>
                                          </li>
                      ))}
                    </ul>
                  </div>
                  <div aria-hidden="true" className={ry(rF,"pointer-events-none absolute inset-x-0 top-0 h-8",d.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={ry(rT,"pointer-events-none absolute inset-x-0 bottom-0 h-8",d.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
              <div className={ry(rC,"lg:min-h-0")}>
                <div className={ry(rI,"justify-between py-3 has-[button]:pe-4")}>
                  <div className="min-w-0">
                    <h3 className={rW}>Integrations</h3>
                    <p className={ry(rL,"mt-0.5 truncate")}>
                      {rY.filter(e=>e.live).length}
                      {" of"}
                      {" "}
                      {rY.length}
                      {" connected"}
                    </p>
                  </div>
                  <button type="button" className={ry(r$,rD)}>
                    Manage
                    <HugeiconsIcon icon={Icon_52975} size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
                <div className={ry(rB,"relative min-h-0 flex-1")}>
                  <div ref={_} onScroll={b} className="h-full overflow-y-auto">
                    <ul className={rS}>
                      {rY.map(e=>(
                        <li key={e.name} className={ry(rE,"h-[52px] px-3")}>
                                            <span className={ry("flex size-9 shrink-0 items-center justify-center text-neutral-900/78 dark:text-neutral-100/78","size-9")}><HugeiconsIcon icon={e.Icon} size={18} strokeWidth={2} aria-hidden="true" /></span>
                                            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                              <p className={rP}><span className="truncate">{e.name}</span></p>
                                              <p className={ry("line-clamp-2 text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","truncate")}>{e.detail}</p>
                                            </div>
                                            {e.live?<span className={ry("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums","text-neutral-900/78 dark:text-neutral-100/78")}>Connected</span>:<button type="button" className={ry(r$,"h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold")}>Connect</button>}
                                          </li>
                      ))}
                    </ul>
                  </div>
                  <div aria-hidden="true" className={ry(rF,"pointer-events-none absolute inset-x-0 top-0 h-8",h.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={ry(rT,"pointer-events-none absolute inset-x-0 bottom-0 h-8",h.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={ry(rF,"pointer-events-none absolute inset-x-0 top-0 h-8",u.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={ry(rT,"pointer-events-none absolute inset-x-0 bottom-0 h-8",u.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}
