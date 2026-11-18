/**
 * React Bits Pro — Application UI (agent-activity-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" ");

let d = "text-neutral-900 dark:text-neutral-100";

let _ = "text-neutral-900/78 dark:text-neutral-100/78";

let x = "text-neutral-900/62 dark:text-neutral-100/62";

let u = "text-[14px]/[20px] font-medium";

let b = "inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none";

let p = c(u,x);

let h = [{label:"Loaded October general ledger",state:"done",seconds:.4},{label:"Pulled bank statement export",state:"done",seconds:1.3},{label:"Normalised 1,284 transactions",state:"done",seconds:2.1},{label:"Split multi-currency lines",state:"done",seconds:1.7},{label:"Matched transactions to ledger",state:"done",seconds:3.6},{label:"Flagged 12 unmatched entries",state:"done",seconds:.8},{label:"Grouped duplicates by reference",state:"done",seconds:.5},{label:"Reconciling flagged entries",state:"running"},{label:"Resolve foreign-exchange rounding",state:"queued"},{label:"Post adjustments to the ledger",state:"queued"},{label:"Generate the reconciliation report",state:"queued"},{label:"Archive the reconciliation run",state:"queued"},{label:"Notify the finance team",state:"queued"}];

let m = h.reduce((e,r)=>e+(r.seconds??0),0);

function f(e){
  return `${e.toFixed(1)}s`;
}

let g = (...e)=>e.filter(Boolean).join(" ");

let v = "text-neutral-900/62 dark:text-neutral-100/62";

let w = "text-[14px]/[20px] font-medium";

let j = "shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62";


export default function agent_activity_1__Sorbet__Component(){
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
  }(),[k,g]=useState(0),[v,w]=useState(false),j=useRef(null);
  return useEffect(()=>{
    if(v)return;
    let e=j.current??performance.now();
    j.current=e;
    let r=setInterval(()=>{
      g((performance.now()-e)/1e3)
    },100);
    return ()=>clearInterval(r);
  }, [v]),<div className={c("bg-white dark:bg-neutral-950",d,"relative flex h-full min-h-[560px] w-full flex-col gap-3 overflow-hidden p-4 sm:gap-4 sm:p-6")}>
    <header className="flex shrink-0 items-center gap-3">
      <div className="min-w-0 flex-1">
        <h2 className={c("text-[17px]/[22px] font-extrabold","truncate")}>Reconcile October invoices</h2>
        <div className="mt-0.5 flex items-center gap-3">
          <span aria-live="polite" className={c("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",v?"text-neutral-900/62 dark:text-neutral-100/62":"text-neutral-900 dark:text-neutral-100")}>
            {!v&&<span className="flex h-lh shrink-0 items-center"><span aria-hidden="true" className={b} /></span>}
            {v?"Stopped":"Running"}
          </span>
          <span className={c(p,"tabular-nums")}>{f(m+k)}</span>
        </div>
      </div>
      <button type="button" onClick={()=>w(true)} disabled={v} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
        <HugeiconsIcon icon={Icon_63163} size={18} strokeWidth={2} aria-hidden="true" />
        Stop
      </button>
    </header>
    <div className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
      <div className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative mt-1 min-h-0 flex-1")}>
        <div ref={e} onScroll={t} className="h-full overflow-y-auto overscroll-contain py-1">
          <ol>
            {h.map((e,r)=>{
              let t="running"===e.state&&!v,n="running"===e.state&&v;
              return (
                <li key={r} className="flex h-9 items-center gap-3 px-3">
                                <span className="flex size-[18px] shrink-0 items-center justify-center">
                                  {"done"===e.state?<HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} aria-hidden="true" className={x} />:t?<span aria-hidden="true" className={c(b,_)} />:n?<HugeiconsIcon icon={Icon_99199} size={14} strokeWidth={2} aria-hidden="true" className={x} />:null}
                                </span>
                                <span className={c(u,"min-w-0 flex-1 truncate","done"===e.state&&_,t&&d,(n||"queued"===e.state)&&x)}>{e.label}</span>
                                <span className={c("shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","w-16 text-right")}>{"done"===e.state?f(e.seconds??0):t?f(k):n?"Stopped":null}</span>
                              </li>
              );
            })}
          </ol>
        </div>
        <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
        <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
      </div>
    </div>
  </div>;
}
