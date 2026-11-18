/**
 * React Bits Pro — Application UI (tool-calls-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { count, disconnect, id, label, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62714 = [["path",{d:"M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "font-mono text-[12px]/[16px] tabular-nums",
  x = o("text-[16px]/[20px] font-[450] tracking-[-0.015em]",d),
  p = o(u,c),
  m = o("text-[12px]/[16px] font-normal tabular-nums",c),
  b = o("text-[12px]/[16px] font-[450] tabular-nums",c),
  h = [{id:"stdout",label:"stdout"},{id:"stderr",label:"stderr",count:1}],
  f = {command:"pnpm test payments --runInBand",stdout:`> payments@1.4.0 test
> jest --config jest.config.ts --runInBand

 PASS  services/payments/retry.test.ts
   withRetry
     retries on transient errors (18 ms)
     applies exponential backoff with jitter (24 ms)
     gives up after maxAttempts (9 ms)
 PASS  services/payments/idempotency.test.ts
   keyFor
     derives a stable key from the request (6 ms)
 FAIL  services/payments/charge.test.ts
   createCharge
     rejects duplicate idempotency keys (31 ms)

Test Suites: 1 failed, 2 passed, 3 total
Tests:       1 failed, 5 passed, 6 total
Time:        4.12 s`,stderr:`  ● createCharge › rejects duplicate idempotency keys

    expect(received).rejects.toThrow(DuplicateKeyError)

    Received promise resolved instead of rejected
    Resolved to: { id: "ch_3Pd…", status: "succeeded" }

      at Object.<anonymous> (services/payments/charge.test.ts:48:7)
      at processTicksAndRejections (node:internal/process/task_queues:95:5)`,exitCode:1,duration:"4.12s"};

function k(){
  let e=useId(),[t,r]=useState("stdout"),[k,v]=useState(false),{ref:g,edges:_,onScroll:w}=function(){
    let e=useRef(null),[t,r]=useState({top:false,bottom:false,left:false,right:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:s,scrollLeft:i,scrollWidth:l,clientWidth:o}=t;
      r({top:a>1,bottom:Math.ceil(a+s)<n-1,left:i>1,right:Math.ceil(i+o)<l-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),{command:y,exitCode:j,duration:N}=f,z=0!==j,S="stdout"===t?f.stdout:f.stderr,A=useRef([]),R=useRef(null);
  useEffect(()=>()=>{
    null!==R.current&&window.clearTimeout(R.current)
  }, []);
  let C=useCallback(async()=>{
    try{
      await navigator.clipboard.writeText(y)
    }catch{
      return
    }
    v(true),null!==R.current&&window.clearTimeout(R.current),R.current=window.setTimeout(()=>v(false),2e3)
  }, [y]),T=useCallback((e,t)=>{
    if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;
    e.preventDefault();
    let a=h.length-1,n="Home"===e.key?0:"End"===e.key?a:"ArrowLeft"===e.key?(t+a)%h.length:(t+1)%h.length;
    r(h[n].id),A.current[n]?.focus({preventScroll:true})
  }, []);
  return (
    <div className={o("bg-white dark:bg-neutral-950",d,"relative flex h-full min-h-[560px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-baseline justify-between gap-3">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className={o(p,"shrink-0")}>run_terminal</span>
            <h2 className={o(x,"truncate")}>Command output</h2>
          </div>
          <span className={o(m,"shrink-0")}>{N}</span>
        </header>
        <div className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
          <div className="flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2">
            <span className="flex min-w-0 flex-1 items-center">
              <span className={o(u,"me-[1ch] select-none text-neutral-900/40 dark:text-neutral-100/40","shrink-0")}>$</span>
              <code className={o(u,d,"min-w-0 flex-1 truncate")}>{y}</code>
            </span>
            <span className={o("inline-flex h-5 min-w-5 shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 font-mono text-[12px]/[16px] tabular-nums text-neutral-900 dark:text-neutral-100",z?"border border-[oklch(60%_0.236_26)] dark:border-[oklch(65.2%_0.219_26)] bg-neutral-900/9 dark:bg-neutral-100/9":"bg-neutral-900/9 dark:bg-neutral-100/9","gap-1.5")}>
              <span className={c}>exit</span>
              <span>{j}</span>
            </span>
            <button type="button" onClick={C} aria-label={k?"Command copied":"Copy command"} className={o("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-6 rounded-[var(--rb-r-sm,6px)]")}>
              <HugeiconsIcon icon={k?Icon_90987:Icon_62714} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <span role="status" className="sr-only">{k?"Copied":""}</span>
          </div>
          <div className={o("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","min-h-0 flex-1")}>
            <div className="flex shrink-0 items-center">
              <div role="tablist" aria-label="Output stream" className={o("flex max-w-full min-w-0 items-center gap-1 overflow-x-auto shadow-[inset_0_-1px_0_color-mix(in_oklab,var(--color-neutral-900)_8%,transparent)] [scrollbar-width:none] dark:shadow-[inset_0_-1px_0_color-mix(in_oklab,var(--color-neutral-100)_8%,transparent)]","flex-1 px-1")}>
                {h.map((n,s)=>{
                  let i=t===id;
                  return (
                    <button key={id} type="button" role="tab" id={`${e}-tab-${id}`} aria-selected={i} aria-controls={`${e}-panel-${id}`} tabIndex={i?0:-1} ref={e=>{
                                    A.current[s]=e
                                  }} onKeyDown={e=>T(e,s)} onClick={()=>r(id)} className="relative inline-flex min-h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900/80 select-none transition-[color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-neutral-900 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent aria-selected:text-neutral-900 aria-selected:after:bg-neutral-900 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-neutral-100 dark:disabled:text-neutral-100/40">
                                    <span className={u}>{label}</span>
                                    {"count"in n&&count?<span className={b}>{count}</span>:null}
                                  </button>
                  );
                })}
              </div>
            </div>
            <div className="relative min-h-0 flex-1">
              <div role="tabpanel" id={`${e}-panel-${t}`} aria-labelledby={`${e}-tab-${t}`} tabIndex={0} ref={g} onScroll={w} className={o("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","h-full overflow-auto px-3 pt-2 pb-2.5")}>
                <pre className={o("font-mono text-[13px]/[20px] tabular-nums","text-neutral-900/80 dark:text-neutral-100/80","min-w-max whitespace-pre")}>{S}</pre>
              </div>
              <div aria-hidden="true" className={o("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",_.top?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={o("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",_.bottom?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={o("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 w-8",_.left?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={o("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 w-8",_.right?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
      </div>
  );
}


export default k;
