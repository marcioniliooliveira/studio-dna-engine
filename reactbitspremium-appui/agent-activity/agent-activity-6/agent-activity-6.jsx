/**
 * React Bits Pro — Application UI (agent-activity-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

let l = (...e)=>e.filter(Boolean).join(" "),
  i = "text-neutral-900 dark:text-neutral-100",
  o = "text-neutral-900/66 dark:text-neutral-100/66",
  d = "text-[13px]/[18px] font-normal",
  c = l(d,o),
  u = [{worker:"Invoices",action:"Reconciling batch 3 of 5",state:"running",rate:42,progress:.62},{worker:"Contacts",action:"Merging duplicate records",state:"running",rate:18,progress:.34},{worker:"Documents",action:"Waiting to delete 240 archived files",state:"approval",rate:null,progress:null},{worker:"Embeddings",action:"Indexing 318 support tickets",state:"running",rate:96,progress:.81},{worker:"Metrics",action:"Aggregating daily revenue",state:"running",rate:63,progress:.47},{worker:"Exports",action:"Waiting for a free slot",state:"queued",rate:null,progress:null}],
  x = {running:"Running",approval:"Needs approval",queued:"Queued"};

function h({state:e}){
  return "approval"===e?<span className="inline-flex h-5 shrink-0 items-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-1.5 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{x[e]}</span>:<span className={l("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-neutral-900 dark:text-neutral-100","shrink-0")}>
    {"running"===e&&<span className="flex h-lh shrink-0 items-center">
      <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />
    </span>}
    {x[e]}
  </span>;
}

function b(){
  let e=useReducedMotion(),[t,r]=useState(0),{ref:x,edges:b,onScroll:m}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:s}=t;
      r({start:a>1,end:Math.ceil(a+s)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }();
  useEffect(()=>{
    if(e)return;
    let t=setInterval(()=>r(e=>e+1),900);
    return ()=>clearInterval(t);
  }, [e]);
  let p=u.filter(e=>"running"===e.state).length;
  return (
    <div className={l("bg-white dark:bg-neutral-950",i,"relative flex h-full min-h-[560px] w-full flex-col gap-3 overflow-hidden p-4 sm:gap-4 sm:p-6")}>
        <header className="flex shrink-0 items-center gap-3">
          <h2 className={l("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>Import workers</h2>
          <div className={l(c,"flex shrink-0 items-center gap-4")}>
            <span>
              <span className={l(i,"tabular-nums")}>{p}</span>
              {" "}
              active
            </span>
            <span>
              <span className={l(i,"tabular-nums")}>18</span>
              {" queued"}
            </span>
          </div>
        </header>
        <div className={l("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
          <div className={l("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
            <ul ref={x} onScroll={m} className={l("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex h-full flex-col overflow-y-auto overscroll-contain")}>
              {u.map((r,n)=>{
                let s="running"===r.state&&null!=r.progress?Math.min(.98,r.progress+(e?0:.004*t)):r.progress;
                return (
                  <li key={n} className="shrink-0 p-1">
                                <div className={l("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","px-2 py-2")}>
                                  <div className="flex items-center gap-3">
                                    <span className={l("text-[14px]/[16px] font-[450]","min-w-0 flex-1 truncate")}>{r.worker}</span>
                                    <span className={l(d,"shrink-0 text-right tabular-nums")}>
                                      {null!=r.rate&&<>
                                        {r.rate}
                                        <span className={o}>/min</span>
                                      </>}
                                    </span>
                                  </div>
                                  <div className="mt-1.5 flex items-center gap-2">
                                    <span className={l(d,"line-clamp-2 min-w-0 flex-1","approval"===r.state?"text-neutral-900/80 dark:text-neutral-100/80":o)}>{r.action}</span>
                                    <h state={r.state} />
                                  </div>
                                  {null!=s&&<div aria-hidden="true" className={l("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-2")}>
                                    <div className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${100*s}%`}} />
                                  </div>}
                                </div>
                              </li>
                );
              })}
            </ul>
            <div aria-hidden="true" className={l("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",b.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={l("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",b.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default b;
