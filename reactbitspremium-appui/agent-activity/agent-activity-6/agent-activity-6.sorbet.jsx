/**
 * React Bits Pro — Application UI (agent-activity-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

let eg = (...e)=>e.filter(Boolean).join(" ");

let ev = "text-neutral-900 dark:text-neutral-100";

let ew = "text-neutral-900/62 dark:text-neutral-100/62";

let ej = "text-[14px]/[20px] font-medium";

let eN = eg(ej,ew);

let ey = [{worker:"Invoices",action:"Reconciling batch 3 of 5",state:"running",rate:42,progress:.62},{worker:"Contacts",action:"Merging duplicate records",state:"running",rate:18,progress:.34},{worker:"Documents",action:"Waiting to delete 240 archived files",state:"approval",rate:null,progress:null},{worker:"Embeddings",action:"Indexing 318 support tickets",state:"running",rate:96,progress:.81},{worker:"Metrics",action:"Aggregating daily revenue",state:"running",rate:63,progress:.47},{worker:"Exports",action:"Waiting for a free slot",state:"queued",rate:null,progress:null}];

let eC = {running:"Running",approval:"Needs approval",queued:"Queued"};

function ez({state:e}){
  return "approval"===e?<span className="inline-flex h-5.5 shrink-0 items-center whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] bg-white px-2.5 text-[12px]/[16px] font-bold tabular-nums text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.09),0_1px_2px_rgb(84_62_32/0.08)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.55)] dark:bg-neutral-800">{eC[e]}</span>:<span className={eg("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums","text-neutral-900 dark:text-neutral-100","shrink-0")}>
    {"running"===e&&<span className="flex h-lh shrink-0 items-center">
      <span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
    </span>}
    {eC[e]}
  </span>;
}


export default function agent_activity_6__Sorbet__Component(){
  let e=useReducedMotion(),[r,t]=useState(0),{ref:s,edges:l,onScroll:o}=function(){
    let e=useRef(null),[r,t]=useState({start:false,end:false}),a=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:s}=r;
      t({start:a>1,end:Math.ceil(a+s)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let r=e.current,t=r?.ownerDocument.defaultView;
      if(!r||!t?.ResizeObserver)return;
      let n=new t.ResizeObserver(a);
      return observe(r),()=>disconnect();
    }, [a]),{ref:e,edges:r,onScroll:a};
  }();
  useEffect(()=>{
    if(e)return;
    let r=setInterval(()=>t(e=>e+1),900);
    return ()=>clearInterval(r);
  }, [e]);
  let i=ey.filter(e=>"running"===e.state).length;
  return (
    <div className={eg("bg-white dark:bg-neutral-950",ev,"relative flex h-full min-h-[600px] w-full flex-col gap-3 overflow-hidden p-4 sm:gap-4 sm:p-6")}>
        <header className="flex shrink-0 items-center gap-3">
          <h2 className={eg("text-[17px]/[22px] font-extrabold","min-w-0 flex-1 truncate")}>Import workers</h2>
          <div className={eg(eN,"flex shrink-0 items-center gap-4")}>
            <span>
              <span className={eg(ev,"tabular-nums")}>{i}</span>
              {" "}
              active
            </span>
            <span>
              <span className={eg(ev,"tabular-nums")}>18</span>
              {" queued"}
            </span>
          </div>
        </header>
        <div className={eg("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
          <div className={eg("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative mt-1 min-h-0 flex-1")}>
            <ul ref={s} onScroll={o} className={eg("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","flex h-full flex-col overflow-y-auto overscroll-contain")}>
              {ey.map((t,n)=>{
                let s="running"===t.state&&null!=t.progress?Math.min(.98,t.progress+(e?0:.004*r)):t.progress;
                return (
                  <li key={n} className="shrink-0 p-1">
                                <div className={eg("hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","rounded-[var(--rb-r-4xl,18px)]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","px-2 py-2")}>
                                  <div className="flex items-center gap-3">
                                    <span className={eg("text-[15px]/[20px] font-bold","min-w-0 flex-1 truncate")}>{t.worker}</span>
                                    <span className={eg(ej,"shrink-0 text-right tabular-nums")}>
                                      {null!=t.rate&&<>
                                        {t.rate}
                                        <span className={ew}>/min</span>
                                      </>}
                                    </span>
                                  </div>
                                  <div className="mt-1.5 flex items-center gap-2">
                                    <span className={eg(ej,"line-clamp-2 min-w-0 flex-1","approval"===t.state?"text-neutral-900/78 dark:text-neutral-100/78":ew)}>{t.action}</span>
                                    <ez state={t.state} />
                                  </div>
                                  {null!=s&&<div aria-hidden="true" className={eg("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","mt-2")}>
                                    <div className="block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{width:`${100*s}%`}} />
                                  </div>}
                                </div>
                              </li>
                );
              })}
            </ul>
            <div aria-hidden="true" className={eg("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",l.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={eg("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",l.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}
