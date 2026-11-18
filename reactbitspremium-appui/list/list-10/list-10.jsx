/**
 * React Bits Pro — Application UI (list-10)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_52975 = [["path",{d:"M15 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V9M20 4L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20 13C20 16.7712 20 18.6569 18.8284 19.8284C17.6569 21 15.7712 21 12 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V12C3 8.22876 3 6.34315 4.17157 5.17157C5.34315 4 7.22876 4 11 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[13px]/[18px] font-normal",
  p = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  h = [{title:"Acknowledge the page and declare an incident",owner:"On-call primary",duration:"2 min"},{title:"Open the incident channel and post the first summary",owner:"Incident commander",duration:"3 min"},{title:"Confirm blast radius from the error-rate dashboard",owner:"SRE",duration:"5 min"},{title:"Roll back the checkout service to the last good deploy",owner:"Release engineer",duration:"8 min"},{title:"Verify error rate and latency have recovered",owner:"SRE",duration:"5 min"},{title:"Post customer-facing update to the status page",owner:"Support lead",duration:"4 min"},{title:"Capture the timeline for the postmortem",owner:"Incident commander",duration:"6 min"},{title:"Stand down responders and close the incident",owner:"On-call primary",duration:"2 min"}];

function b(){
  let[e,t]=useState(()=>h.map(()=>false)),{ref:r,edges:b,onScroll:m}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),f=e.filter(Boolean).length,k=f===h.length,v=Math.round(f/h.length*100),g=t=>0===t||e[t-1];
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"flex h-full min-h-[560px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex h-full w-full max-w-[720px] flex-col">
          <div className="mb-4 shrink-0">
            <h2 className={d("text-[16px]/[20px] font-[450] tracking-[-0.015em]",c)}>Checkout latency spike: SEV2</h2>
            <p className={d(x,u,"mt-1")}>Incident runbook</p>
            <div className="mt-3 flex min-h-[36px] items-center">
              {k?<div className="flex w-full items-center gap-2.5">
                <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center">
                  <HugeiconsIcon icon={Icon_20484} size={16} strokeWidth={1.8} className="text-neutral-900/80 dark:text-neutral-100/80" />
                </span>
                <p className={d(x,c,"min-w-0 flex-1 truncate")} role="status">All steps complete: incident resolved.</p>
                <button type="button" onClick={()=>t(h.map(()=>false))} className={d(p,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","shrink-0")}>Reset runbook</button>
              </div>:<div className="w-full">
                <div className="flex items-center justify-between gap-3">
                  <div className={d("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","h-1.5")} role="progressbar" aria-valuenow={f} aria-valuemin={0} aria-valuemax={h.length} aria-label="Runbook progress">
                    <div className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${v}%`}} />
                  </div>
                  <span className={d(x,u,"shrink-0 tabular-nums")}>
                    {f}
                    {" of "}
                    {h.length}
                    {" steps complete"}
                  </span>
                </div>
              </div>}
            </div>
          </div>
          <div className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","relative min-h-0 flex-1")}>
            <div ref={r} onScroll={m} style={{touchAction:"pan-y"}} className={d("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","min-h-0 flex-1 overflow-y-auto p-2")}>
              {h.map((r,n)=>{
                let l=e[n],h=g(n);
                return (
                  <div key={r.title} aria-disabled={!h} className={d("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","rounded-[var(--rb-r-sm,6px)]",!l&&"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5",!h&&"cursor-not-allowed","h-14 px-2")}>
                                <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                                  <input type="checkbox" checked={l} disabled={!h} aria-label={`Mark step ${n+1} ${l?"incomplete":"complete"}: ${r.title}`} onChange={()=>{
                                    g(n)&&t(e=>{
                                      let t=[...e],r=!t[n];
                                      if(t[n]=r,!r)for(let e=n+1;e<t.length;e++)t[e]=false;
                                      return t;
                                    })
                                  }} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                                  <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                                </span>
                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                  <p className={d("text-[14px]/[16px] font-[450]",l||!h?u:c,l&&"line-through","truncate")}>{r.title}</p>
                                  <p data-description className={d(x,u,"truncate tabular-nums")}>
                                    <span>{r.owner}</span>
                                    <span className="ms-3">{r.duration}</span>
                                  </p>
                                </div>
                                <a href="#" aria-label={`Open runbook for: ${r.title}`} className={d(p,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]","shrink-0")}>
                                  Runbook
                                  <HugeiconsIcon icon={Icon_52975} size={16} strokeWidth={1.8} aria-hidden="true" />
                                </a>
                              </div>
                );
              })}
            </div>
            <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",b.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",b.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default b;
