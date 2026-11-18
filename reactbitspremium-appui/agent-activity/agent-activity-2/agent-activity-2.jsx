/**
 * React Bits Pro — Application UI (agent-activity-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900/66 dark:text-neutral-100/66",
  c = "text-[13px]/[18px] font-normal",
  u = "shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66",
  x = o(c,d),
  h = [{label:"Prepare export",seconds:4.2,subSteps:[{label:"Validate source schema",seconds:1.1},{label:"Snapshot three tables",seconds:2.4},{label:"Acquire export lock",seconds:.7}]},{label:"Extract records",seconds:12.8,subSteps:[{label:"Read customers",seconds:3.1},{label:"Read subscriptions",seconds:6.4},{label:"Read invoices",seconds:3.3}]},{label:"Transform rows",seconds:8.3,subSteps:[{label:"Normalise currencies",seconds:2.2},{label:"Resolve account owners",seconds:4},{label:"Drop test accounts",seconds:2.1}]},{label:"Load warehouse",seconds:5.1,subSteps:[{label:"Stage to temp table",seconds:1.8},{label:"Merge into reporting schema",seconds:3.3}]},{label:"Verify output",seconds:2,subSteps:[{label:"Compare row counts",seconds:.9},{label:"Check referential integrity",seconds:1.1}]}],
  b = Math.max(...h.flatMap(e=>e.subSteps.map(e=>e.seconds))),
  m = h.reduce((e,t)=>e+t.seconds,0);

function p(e){
  return `${e.toFixed(1)}s`;
}

function f(){
  let{ref:e,edges:t,onScroll:r}=function(){
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
  }(),[f,v]=useState({0:true,1:true,2:true});
  return (
    <div className={o("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[560px] w-full flex-col gap-3 overflow-hidden p-4 sm:gap-4 sm:p-6")}>
        <header className="flex shrink-0 items-center gap-3">
          <div className="min-w-0 flex-1">
            <h2 className={o("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Weekly warehouse export</h2>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className={o("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-neutral-900/80 dark:text-neutral-100/80")}>Succeeded</span>
            </div>
          </div>
          <span className={o(x,"shrink-0 tabular-nums")}>{p(m)}</span>
        </header>
        <div className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
          <div className={o("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
            <div ref={e} onScroll={r} className="h-full overflow-y-auto overscroll-contain">
              <ol className={o("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex flex-col")}>
                {h.map((e,t)=>{
                  let r=!!f[t];
                  return (
                    <li key={t}>
                                    <div className="p-1">
                                      <button type="button" onClick={()=>v(e=>({...e,[t]:!e[t]}))} aria-expanded={r} className={o("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","rounded-[var(--rb-r-sm,6px)]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","group h-8 px-2")}>
                                        <span className="flex size-4 shrink-0 items-center justify-center">
                                          <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" className={d} />
                                        </span>
                                        <span className={o("text-[14px]/[16px] font-[450]","min-w-0 flex-1 truncate")}>{e.label}</span>
                                        <span className={o(u,"w-12 text-right")}>{p(e.seconds)}</span>
                                        <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                      </button>
                                    </div>
                                    {r&&<ul className="pb-1.5 pl-10 pr-9">
                                      {e.subSteps.map((e,t)=>(
                                        <li key={t} className="flex h-8 items-center gap-3">
                                                            <span className={o(c,"text-neutral-900/80 dark:text-neutral-100/80","min-w-0 flex-1 truncate")}>{e.label}</span>
                                                            <span aria-hidden="true" className="hidden w-24 shrink-0 sm:block">
                                                              <span className="relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7">
                                                                <span className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${e.seconds/b*100}%`}} />
                                                              </span>
                                                            </span>
                                                            <span className={o(u,"w-12 text-right")}>{p(e.seconds)}</span>
                                                          </li>
                                      ))}
                                    </ul>}
                                  </li>
                  );
                })}
              </ol>
            </div>
            <div aria-hidden="true" className={o("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",t.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={o("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default f;
