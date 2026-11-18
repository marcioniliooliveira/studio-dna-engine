/**
 * React Bits Pro — Application UI (agent-activity-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let g = (...e)=>e.filter(Boolean).join(" ");

let v = "text-neutral-900/62 dark:text-neutral-100/62";

let w = "text-[14px]/[20px] font-medium";

let j = "shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62";

let N = g(w,v);

let y = [{label:"Prepare export",seconds:4.2,subSteps:[{label:"Validate source schema",seconds:1.1},{label:"Snapshot three tables",seconds:2.4},{label:"Acquire export lock",seconds:.7}]},{label:"Extract records",seconds:12.8,subSteps:[{label:"Read customers",seconds:3.1},{label:"Read subscriptions",seconds:6.4},{label:"Read invoices",seconds:3.3}]},{label:"Transform rows",seconds:8.3,subSteps:[{label:"Normalise currencies",seconds:2.2},{label:"Resolve account owners",seconds:4},{label:"Drop test accounts",seconds:2.1}]},{label:"Load warehouse",seconds:5.1,subSteps:[{label:"Stage to temp table",seconds:1.8},{label:"Merge into reporting schema",seconds:3.3}]},{label:"Verify output",seconds:2,subSteps:[{label:"Compare row counts",seconds:.9},{label:"Check referential integrity",seconds:1.1}]}];

let C = Math.max(...y.flatMap(e=>e.subSteps.map(e=>e.seconds)));

let z = y.reduce((e,r)=>e+r.seconds,0);

function S(e){
  return `${e.toFixed(1)}s`;
}


export default function agent_activity_2__Sorbet__Component(){
  let{ref:e,edges:r,onScroll:t}=function(){
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
  }(),[l,i]=useState({0:true,1:true,2:true});
  return (
    <div className={g("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[600px] w-full flex-col gap-3 overflow-hidden p-4 sm:gap-4 sm:p-6")}>
        <header className="flex shrink-0 items-center gap-3">
          <div className="min-w-0 flex-1">
            <h2 className={g("text-[17px]/[22px] font-extrabold","truncate")}>Weekly warehouse export</h2>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className={g("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums","text-neutral-900/78 dark:text-neutral-100/78")}>Succeeded</span>
            </div>
          </div>
          <span className={g(N,"shrink-0 tabular-nums")}>{S(z)}</span>
        </header>
        <div className={g("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
          <div className={g("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative mt-1 min-h-0 flex-1")}>
            <div ref={e} onScroll={t} className="h-full overflow-y-auto overscroll-contain">
              <ol className={g("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","flex flex-col")}>
                {y.map((e,r)=>{
                  let t=!!l[r];
                  return (
                    <li key={r}>
                                    <div className="p-1">
                                      <button type="button" onClick={()=>i(e=>({...e,[r]:!e[r]}))} aria-expanded={t} className={g("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]","cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","rounded-[var(--rb-r-4xl,18px)]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","group h-8 px-2")}>
                                        <span className="flex size-[18px] shrink-0 items-center justify-center">
                                          <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} aria-hidden="true" className={v} />
                                        </span>
                                        <span className={g("text-[15px]/[20px] font-bold","min-w-0 flex-1 truncate")}>{e.label}</span>
                                        <span className={g(j,"w-12 text-right")}>{S(e.seconds)}</span>
                                        <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                      </button>
                                    </div>
                                    {t&&<ul className="pb-1.5 pl-10 pr-9">
                                      {e.subSteps.map((e,r)=>(
                                        <li key={r} className="flex h-8 items-center gap-3">
                                                            <span className={g(w,"text-neutral-900/78 dark:text-neutral-100/78","min-w-0 flex-1 truncate")}>{e.label}</span>
                                                            <span aria-hidden="true" className="hidden w-24 shrink-0 sm:block">
                                                              <span className="relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
                                                                <span className="block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{width:`${e.seconds/C*100}%`}} />
                                                              </span>
                                                            </span>
                                                            <span className={g(j,"w-12 text-right")}>{S(e.seconds)}</span>
                                                          </li>
                                      ))}
                                    </ul>}
                                  </li>
                  );
                })}
              </ol>
            </div>
            <div aria-hidden="true" className={g("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={g("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}
