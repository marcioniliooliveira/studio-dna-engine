/**
 * React Bits Pro — Application UI (agent-activity-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[13px]/[18px] font-normal",
  b = "inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none",
  m = d(h,x),
  p = [{label:"Loaded October general ledger",state:"done",seconds:.4},{label:"Pulled bank statement export",state:"done",seconds:1.3},{label:"Normalised 1,284 transactions",state:"done",seconds:2.1},{label:"Split multi-currency lines",state:"done",seconds:1.7},{label:"Matched transactions to ledger",state:"done",seconds:3.6},{label:"Flagged 12 unmatched entries",state:"done",seconds:.8},{label:"Grouped duplicates by reference",state:"done",seconds:.5},{label:"Reconciling flagged entries",state:"running"},{label:"Resolve foreign-exchange rounding",state:"queued"},{label:"Post adjustments to the ledger",state:"queued"},{label:"Generate the reconciliation report",state:"queued"},{label:"Archive the reconciliation run",state:"queued"},{label:"Notify the finance team",state:"queued"}],
  f = p.reduce((e,t)=>e+(t.seconds??0),0);

function v(e){
  return `${e.toFixed(1)}s`;
}

function g(){
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
  }(),[g,k]=useState(0),[w,_]=useState(false),j=useRef(null);
  return useEffect(()=>{
    if(w)return;
    let e=j.current??performance.now();
    j.current=e;
    let t=setInterval(()=>{
      k((performance.now()-e)/1e3)
    },100);
    return ()=>clearInterval(t);
  }, [w]),<div className={d("bg-white dark:bg-neutral-950",c,"relative flex h-full min-h-[560px] w-full flex-col gap-3 overflow-hidden p-4 sm:gap-4 sm:p-6")}>
    <header className="flex shrink-0 items-center gap-3">
      <div className="min-w-0 flex-1">
        <h2 className={d("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Reconcile October invoices</h2>
        <div className="mt-0.5 flex items-center gap-3">
          <span aria-live="polite" className={d("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",w?"text-neutral-900/66 dark:text-neutral-100/66":"text-neutral-900 dark:text-neutral-100")}>
            {!w&&<span className="flex h-lh shrink-0 items-center"><span aria-hidden="true" className={b} /></span>}
            {w?"Stopped":"Running"}
          </span>
          <span className={d(m,"tabular-nums")}>{v(f+g)}</span>
        </div>
      </div>
      <button type="button" onClick={()=>_(true)} disabled={w} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
        <HugeiconsIcon icon={Icon_63163} size={16} strokeWidth={1.8} aria-hidden="true" />
        Stop
      </button>
    </header>
    <div className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
      <div className={d("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
        <div ref={e} onScroll={r} className="h-full overflow-y-auto overscroll-contain py-1">
          <ol>
            {p.map((e,t)=>{
              let r="running"===e.state&&!w,n="running"===e.state&&w;
              return (
                <li key={t} className="flex h-9 items-center gap-3 px-3">
                                <span className="flex size-4 shrink-0 items-center justify-center">
                                  {"done"===e.state?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" className={x} />:r?<span aria-hidden="true" className={d(b,u)} />:n?<HugeiconsIcon icon={Icon_99199} size={12} strokeWidth={1.8} aria-hidden="true" className={x} />:null}
                                </span>
                                <span className={d(h,"min-w-0 flex-1 truncate","done"===e.state&&u,r&&c,(n||"queued"===e.state)&&x)}>{e.label}</span>
                                <span className={d("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","w-16 text-right")}>{"done"===e.state?v(e.seconds??0):r?v(g):n?"Stopped":null}</span>
                              </li>
              );
            })}
          </ol>
        </div>
        <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",t.start?"opacity-100":"opacity-0")} />
        <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
      </div>
    </div>
  </div>;
}


export default g;
