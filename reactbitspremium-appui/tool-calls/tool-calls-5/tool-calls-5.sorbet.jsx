/**
 * React Bits Pro — Application UI (tool-calls-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { count, disconnect, id, label, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62714 = [["path",{d:"M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" ");

let _ = "text-neutral-900 dark:text-neutral-100";

let x = "text-neutral-900/78 dark:text-neutral-100/78";

let p = "text-neutral-900/62 dark:text-neutral-100/62";

let b = "text-[13px]/[16px] font-semibold tabular-nums";

let h = "font-mono text-[12px]/[16px] tabular-nums";

let m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let k = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let f = "text-neutral-900 dark:text-neutral-100";

let eg = (...e)=>e.filter(Boolean).join(" ");

let ew = "text-neutral-900 dark:text-neutral-100";

let ey = "text-neutral-900/62 dark:text-neutral-100/62";

let ej = "font-mono text-[12px]/[16px] tabular-nums";

let eN = eg("text-[17px]/[22px] font-extrabold",ew);

let eC = eg(ej,ey);

let eA = eg("text-[13px]/[16px] font-semibold tabular-nums",ey);

let ez = eg("text-[13px]/[16px] font-bold tabular-nums",ey);

let eS = [{id:"stdout",label:"stdout"},{id:"stderr",label:"stderr",count:1}];

let eR = {command:"pnpm test payments --runInBand",stdout:`> payments@1.4.0 test
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


export default function tool_calls_5__Sorbet__Component(){
  let e=useId(),[t,r]=useState("stdout"),[i,l]=useState(false),{ref:o,edges:c,onScroll:d}=function(){
    let e=useRef(null),[t,r]=useState({top:false,bottom:false,left:false,right:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i,scrollLeft:l,scrollWidth:s,clientWidth:o}=t;
      r({top:a>1,bottom:Math.ceil(a+i)<n-1,left:l>1,right:Math.ceil(l+o)<s-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),{command:u,exitCode:_,duration:x}=eR,p=0!==_,b="stdout"===t?eR.stdout:eR.stderr,h=useRef([]),m=useRef(null);
  useEffect(()=>()=>{
    null!==m.current&&window.clearTimeout(m.current)
  }, []);
  let k=useCallback(async()=>{
    try{
      await navigator.clipboard.writeText(u)
    }catch{
      return
    }
    l(true),null!==m.current&&window.clearTimeout(m.current),m.current=window.setTimeout(()=>l(false),2e3)
  }, [u]),f=useCallback((e,t)=>{
    if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;
    e.preventDefault();
    let a=eS.length-1,n="Home"===e.key?0:"End"===e.key?a:"ArrowLeft"===e.key?(t+a)%eS.length:(t+1)%eS.length;
    r(eS[n].id),h.current[n]?.focus({preventScroll:true})
  }, []);
  return (
    <div className={eg("bg-white dark:bg-neutral-950",ew,"relative flex h-full min-h-[560px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-baseline justify-between gap-3">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className={eg(eC,"shrink-0")}>run_terminal</span>
            <h2 className={eg(eN,"truncate")}>Command output</h2>
          </div>
          <span className={eg(eA,"shrink-0")}>{x}</span>
        </header>
        <div className={eg("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
          <div className="flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5">
            <span className="flex min-w-0 flex-1 items-center">
              <span className={eg(ej,"me-[1ch] select-none text-neutral-900/40 dark:text-neutral-100/40","shrink-0")}>$</span>
              <code className={eg(ej,ew,"min-w-0 flex-1 truncate")}>{u}</code>
            </span>
            <span className={eg("inline-flex h-5.5 min-w-5.5 shrink-0 items-center justify-center whitespace-nowrap rounded-[calc(var(--rb-r-md,8px))] px-2 font-mono text-[12px]/[16px] font-medium tabular-nums text-neutral-900 dark:text-neutral-100",p?"bg-[oklch(95.5%_0.03_26)] dark:bg-[oklch(30%_0.065_26)] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":"bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:bg-neutral-100/10","gap-1.5")}>
              <span className={ey}>exit</span>
              <span>{_}</span>
            </span>
            <button type="button" onClick={k} aria-label={i?"Command copied":"Copy command"} className={eg("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-7 rounded-[calc(var(--rb-r-full,999px))]")}>
              <HugeiconsIcon icon={i?Icon_90987:Icon_62714} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <span role="status" className="sr-only">{i?"Copied":""}</span>
          </div>
          <div className={eg("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","min-h-0 flex-1")}>
            <div className="flex shrink-0 items-center">
              <div role="tablist" aria-label="Output stream" className={eg("flex max-w-full min-w-0 items-center gap-1.5 overflow-x-auto shadow-[inset_0_-2px_0_color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] [scrollbar-width:none] dark:shadow-[inset_0_-2px_0_color-mix(in_oklab,var(--color-neutral-100)_9%,transparent)]","flex-1 px-1")}>
                {eS.map((n,i)=>{
                  let l=t===id;
                  return (
                    <button key={id} type="button" role="tab" id={`${e}-tab-${id}`} aria-selected={l} aria-controls={`${e}-panel-${id}`} tabIndex={l?0:-1} ref={e=>{
                                    h.current[i]=e
                                  }} onKeyDown={e=>f(e,i)} onClick={()=>r(id)} className="relative inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[calc(var(--rb-r-lg,10px))] px-3 text-[15px]/[20px] font-bold whitespace-nowrap text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-neutral-900 after:absolute after:inset-x-2.5 after:bottom-0 after:h-[3px] after:rounded-[calc(var(--rb-r-full,999px))] after:bg-transparent after:transition-[background-color] aria-selected:text-neutral-900 aria-selected:after:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:disabled:text-neutral-100/40">
                                    <span className={ej}>{label}</span>
                                    {"count"in n&&count?<span className={ez}>{count}</span>:null}
                                  </button>
                  );
                })}
              </div>
            </div>
            <div className="relative min-h-0 flex-1">
              <div role="tabpanel" id={`${e}-panel-${t}`} aria-labelledby={`${e}-tab-${t}`} tabIndex={0} ref={o} onScroll={d} className={eg("focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","h-full overflow-auto px-3 pt-2 pb-2.5")}>
                <pre className={eg("font-mono text-[13px]/[20px] tabular-nums","text-neutral-900/78 dark:text-neutral-100/78","min-w-max whitespace-pre")}>{b}</pre>
              </div>
              <div aria-hidden="true" className={eg("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",c.top?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={eg("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",c.bottom?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={eg("bg-linear-to-r from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 w-8",c.left?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={eg("bg-linear-to-l from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 w-8",c.right?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
      </div>
  );
}
