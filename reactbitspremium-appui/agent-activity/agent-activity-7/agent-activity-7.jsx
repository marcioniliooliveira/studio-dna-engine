/**
 * React Bits Pro — Application UI (agent-activity-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_46772 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 16V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 8.25H12M12.25 8.25C12.25 8.11193 12.1381 8 12 8C11.8619 8 11.75 8.11193 11.75 8.25C11.75 8.38807 11.8619 8.5 12 8.5C12.1381 8.5 12.25 8.38807 12.25 8.25Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_42734 = [["path",{d:"M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.9994 15L9 9M9.00064 15L15 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900/80 dark:text-neutral-100/80",
  h = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  m = "text-[13px]/[18px] font-normal",
  p = "text-[14px]/[16px] font-[450]",
  f = "font-mono text-[12px]/[16px] tabular-nums",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  g = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  k = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  w = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  _ = u(m,h),
  j = [{label:"Trigger",value:"Scheduled"},{label:"Dataset",value:"reporting.ledger",mono:true},{label:"Model",value:"Atlas Pro"},{label:"Started",value:"Today at 06:00"},{label:"Requested by",value:"Automation"}],
  N = [{n:1,outcome:"Timed out writing 2,244 rows",duration:"12.0s"},{n:2,outcome:"Timed out writing 1,536 rows",duration:"30.0s"}];

function y({children:e}){
  return <h3 className={u(p,"mb-2 px-0.5")}>{e}</h3>;
}

function z(){
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
  }(),[z,S]=useState(false);
  return (
    <div className={u("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full flex-col gap-3 overflow-hidden p-4 sm:gap-4 sm:p-6")}>
        <header className="flex shrink-0 items-center gap-3">
          <div className="min-w-0 flex-1">
            <h2 className={u("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>Export October ledger</h2>
            <div className="mt-0.5 flex items-center gap-3">
              <span className={u("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]")}>Failed</span>
              <span className={u(_,"tabular-nums")}>42.1s</span>
            </div>
          </div>
          <button type="button" className={u(v,k)}>View log</button>
        </header>
        <div className="relative -mx-1 min-h-0 flex-1">
          <div ref={e} onScroll={r} className="h-full overflow-y-auto overscroll-contain px-1">
            <div className="space-y-4 pb-2">
              <div role={z?undefined:"alert"} aria-live={z?"polite":undefined} className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
                <div className={u("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","mt-1 p-3")}>
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon icon={z?Icon_46772:Icon_42734} size={16} strokeWidth={1.8} aria-hidden="true" className={u(z?x:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]","shrink-0")} />
                    <span className="text-[14px]/[20px] font-[450]">{z?"Retry queued":"Warehouse write timed out"}</span>
                  </div>
                  <p className={u("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>
                    {z?"Attempt 3 starts off-peak at 22:00 with a 512-row batch size.":"Two attempts exceeded the 30s write limit. Retry off-peak or lower the batch size before running again."}
                  </p>
                </div>
                <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">
                  {z?<button type="button" onClick={()=>S(false)} className={u(v,g)}>
                    <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                    Cancel retry
                  </button>:<button type="button" onClick={()=>S(true)} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",g)}>
                    <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
                    Retry run
                  </button>}
                </div>
              </div>
              <section>
                <y>Inputs</y>
                <dl className={u(w,b)}>
                  {j.map(e=>(
                    <div key={e.label} className="flex min-h-10 items-center gap-4 px-4 py-2.5">
                                    <dt className={u("min-w-0 text-[14px]/[16px] font-[450] text-neutral-900/66 dark:text-neutral-100/66","w-28 shrink-0")}>{e.label}</dt>
                                    <dd className={u("flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","flex-1")}>{e.mono?<span className={f}>{e.value}</span>:e.value}</dd>
                                  </div>
                  ))}
                </dl>
              </section>
              <section>
                <y>Attempts</y>
                <div className={u(w,b)}>
                  {N.map(e=>(
                    <div key={e.n} className="flex min-h-10 items-center gap-3 px-4 py-2.5">
                                    <span className={u(p,"shrink-0")}>
                                      {"Attempt "}
                                      {e.n}
                                    </span>
                                    <span className={u(m,x,"min-w-0 flex-1 truncate")}>{e.outcome}</span>
                                    <span className="shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{e.duration}</span>
                                  </div>
                  ))}
                  <p className={u(m,x,"px-4 py-2.5")}>
                    Reduced the batch size after the first timeout, then stopped to avoid partial writes.
                  </p>
                </div>
              </section>
              <section>
                <y>Output</y>
                <ul className={u(w,b)}>
                  {[{name:"ledger-partial.csv",facts:["1,024 of 2,244 rows","84 KB"]},{name:"run.log",facts:["Full trace","12 KB"]}].map(e=>(
                    <li key={e.name} className="flex items-center gap-3 px-4 py-2.5">
                                    <div className="min-w-0 flex-1">
                                      <p className={u(f,"truncate")}>{e.name}</p>
                                      <p className={u("text-[12px]/[16px] font-normal tabular-nums",h,"mt-0.5 flex flex-wrap gap-x-3")}>{e.facts.map(e=><span key={e}>{e}</span>)}</p>
                                    </div>
                                    <button type="button" aria-label={`Download ${e.name}`} className={u(v,k)}>
                                      <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" />
                                      Download
                                    </button>
                                  </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
          <div aria-hidden="true" className={u("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",t.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={u("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default z;
