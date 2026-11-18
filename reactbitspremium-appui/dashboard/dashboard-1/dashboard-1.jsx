/**
 * React Bits Pro — Application UI (dashboard-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[12px]/[16px] font-normal tabular-nums",
  p = [28,31,30,36,34,41,44,43,49,52,58,61],
  m = [70,72,71,74,78,79,83,86,88,90,93,97],
  b = [61,59,60,58,57,55,56,54,53,52,51,49],
  f = [12,13,12,14,13,15,14,16,15,17,16,18],
  v = [500,375,250,125,0],
  k = [{key:"Last 3 months",compare:"vs. prior 3 months",months:["Jul","Aug","Sep"],revenue:[448,466,483],metrics:[{label:"Net revenue",value:"$1.40M",delta:"+9.8%",positive:true,spark:p},{label:"Paid accounts",value:"3,914",delta:"+2.1%",positive:true,spark:m},{label:"Average contract",value:"$1,278",delta:"−1.4%",positive:false,spark:b},{label:"Monthly churn",value:"1.8%",delta:"+0.2 pp",positive:false,spark:f}]},{key:"Last 6 months",compare:"vs. prior 6 months",months:["Apr","May","Jun","Jul","Aug","Sep"],revenue:[371,402,419,448,466,483],metrics:[{label:"Net revenue",value:"$2.59M",delta:"+12.4%",positive:true,spark:p},{label:"Paid accounts",value:"3,914",delta:"+4.1%",positive:true,spark:m},{label:"Average contract",value:"$1,284",delta:"−2.3%",positive:false,spark:b},{label:"Monthly churn",value:"1.8%",delta:"+0.3 pp",positive:false,spark:f}]},{key:"Year to date",compare:"vs. same period last year",months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"],revenue:[279,301,318,371,402,419,448,466,483],metrics:[{label:"Net revenue",value:"$3.49M",delta:"+22.8%",positive:true,spark:p},{label:"Paid accounts",value:"3,914",delta:"+14.2%",positive:true,spark:m},{label:"Average contract",value:"$1,292",delta:"−1.8%",positive:false,spark:b},{label:"Monthly churn",value:"1.9%",delta:"+0.4 pp",positive:false,spark:f}]}];

function g({values:e}){
  let a=Math.min(...e),t=Math.max(...e)-a||1,l=e.map((r,l)=>{
    let s=l/(e.length-1)*100;
    return `${s.toFixed(2)},${(92-(r-a)/t*84).toFixed(2)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="hidden h-8 w-16 shrink-0 @min-[13rem]:block">
        <polyline points={l} fill="none" vectorEffect="non-scaling-stroke" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
  );
}

function _({value:e,onChange:a}){
  let[t,o]=useState(false),[d,u]=useState(false),[x,h]=useState(0),p=useRef(null),m=useRef(null),b=useRef(null);
  useEffect(()=>{
    if(!t)return;
    let e=p.current?.ownerDocument??document,a=e=>{
      p.current?.contains(e.target)||o(false)
    };
    return e.addEventListener("pointerdown",a),()=>e.removeEventListener("pointerdown",a);
  }, [t]),useEffect(()=>{
    t&&b.current?.focus({preventScroll:true})
  }, [t]);
  let f=(e,a)=>{
    h(e),u(a),o(true)
  },v=(e=true)=>{
    o(false),e&&m.current?.focus({preventScroll:true})
  },g=e=>{
    a(k[e].key),v()
  };
  return (
    <div ref={p} className="relative shrink-0">
        <button ref={m} type="button" aria-haspopup="listbox" aria-expanded={t} aria-label={`Date range: ${e}`} onClick={()=>t?v():f(0,true)} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),f(0,false)):"ArrowUp"===e.key&&(e.preventDefault(),f(k.length-1,false))
        }} className="inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40">
          {e}
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {t&&<div ref={b} role="listbox" aria-label="Date range" tabIndex={-1} onKeyDown={e=>{
          switch(e.key){case"Escape":e.preventDefault(),v();break;case"ArrowDown":e.preventDefault(),h(e=>(e+1)%k.length);break;case"ArrowUp":e.preventDefault(),h(e=>(e-1+k.length)%k.length);break;case"Home":e.preventDefault(),h(0);break;case"End":e.preventDefault(),h(k.length-1);break;case"Enter":case" ":e.preventDefault(),g(x);break;case"Tab":v(false)}
        }} className={c("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",d&&"transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute right-0 top-full z-30 mt-1.5 w-[192px]")}>
          {k.map((a,t)=>{
            let l=a.key===e;
            return (
              <button key={a.key} type="button" role="option" aria-selected={l} data-highlighted={t===x?"":undefined} tabIndex={-1} onClick={()=>g(t)} onPointerMove={()=>h(t)} className={c("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="min-w-0 flex-1 truncate">{a.key}</span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="absolute end-2" />}
                      </button>
            );
          })}
        </div>}
      </div>
  );
}

function j(){
  let[e,a]=useState(k[1].key),t=k.find(a=>a.key===e)??k[1];
  return (
    <div className={c("bg-white dark:bg-neutral-950",u,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <header className={c("border-b border-neutral-900/8 dark:border-neutral-100/8","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
          <h1 className={c("text-[20px]/[24px] font-[450] tracking-[-0.015em]",u,"truncate")}>Revenue</h1>
          <_ value={e} onChange={a} />
        </header>
        <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-6">
          <div className="@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900">
            <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
              {t.metrics.map(e=>{
                let a,l=(a=e.delta,/^[−-]/.test(a));
                return (
                  <div key={e.label} className={c("flex min-w-0 flex-col gap-2 px-4 py-3","@container")}>
                                <p className={c("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","text-pretty")}>{e.label}</p>
                                <div className="mt-auto flex items-end justify-between gap-3">
                                  <p className={c("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[32px]/[36px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100","truncate")}>{e.value}</p>
                                  <g values={e.spark} />
                                </div>
                                <p className={c("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80","truncate")}>
                                  <HugeiconsIcon icon={l?Icon_37502:Icon_1497} size={12} strokeWidth={1.8} aria-hidden="true" />
                                  <span className="sr-only">{l?"Down":"Up"}</span>
                                  {e.delta}
                                  <span className={c(x,"hidden sm:inline")}>{t.compare}</span>
                                </p>
                              </div>
                );
              })}
            </div>
          </div>
          <div className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","min-h-0 flex-1 p-4")}>
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Net revenue by month</h2>
              <span className={c(h,x,"shrink-0")}>USD, thousands</span>
            </div>
            <div className="mt-4 flex min-h-0 flex-1 gap-3">
              <div className={c(h,x,"-my-2 flex w-10 shrink-0 flex-col justify-between text-right")}>{v.map(e=><span key={e}>{e}</span>)}</div>
              <div className="relative min-h-0 flex-1">
                <svg aria-hidden preserveAspectRatio="none" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                  {v.map(e=>{
                    let a=100-e/500*100;
                    return <line key={e} x1="0" x2="100" y1={a} y2={a} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" className={0===e?"stroke-neutral-900/8 dark:stroke-neutral-100/8":"stroke-neutral-900/5 dark:stroke-neutral-100/5"} strokeWidth={1} />;
                  })}
                </svg>
                <div className="absolute inset-0 flex items-end gap-2 sm:gap-3">
                  {t.revenue.map((e,a)=>(
                    <div key={t.months[a]} className="flex min-w-0 flex-1 justify-center" style={{height:`${e/500*100}%`}}>
                                    <svg aria-hidden="true" className="block h-full w-full min-w-0 max-w-[64px]">
                                      <rect width="100%" height="100%" className="fill-neutral-900 dark:fill-neutral-100" />
                                    </svg>
                                  </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-2 flex gap-3">
              <div className="w-10 shrink-0" aria-hidden />
              <div className="flex min-w-0 flex-1 gap-2 sm:gap-3">
                {t.months.map(e=><span key={e} className={c(h,x,"min-w-0 flex-1 truncate text-center")}>{e}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default j;
