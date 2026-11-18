/**
 * React Bits Pro — Application UI (agent-plan-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[13px]/[18px] font-normal",
  b = "text-[12px]/[16px] font-normal tabular-nums",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100",
  f = "border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14",
  k = d(h,x),
  g = [{title:"Read the billing contract notes",detail:"Collected the pricing rules, renewal terms and license caps.",target:"docs/billing.md",estimate:"2 min"},{title:"Map the entitlement resolver",detail:"Traced how a key resolves to a tier before touching the branch.",target:"lib/registry-auth.ts",estimate:"3 min"},{title:"Patch the tier lookup",detail:"Adding the renewal fallback so expired keys keep access through the grace window, without changing the response shape.",target:"lib/registry-auth.ts",estimate:"6 min"},{title:"Add a renewal-grace test",detail:"Covers the expired-but-in-grace path from key to response.",target:"tests/entitlements.test.ts",estimate:"4 min"},{title:"Run the license checks",detail:"Verifies expired, starter, pro and ultimate keys each branch.",target:"npm test",estimate:"5 min"},{title:"Regenerate the entitlement fixtures",detail:"Skipped in review: the current fixtures already cover the change.",target:"scripts/fixtures.ts",estimate:"4 min",skipped:true},{title:"Update the installation docs",detail:"Describes the renewal fallback in plain language.",target:"docs/installation.md",estimate:"3 min"}],
  v = {done:"Done",running:"Running",paused:"Paused",queued:"Queued",skipped:"Skipped"},
  _ = {done:"text-neutral-900/80 dark:text-neutral-100/80",running:"text-neutral-900 dark:text-neutral-100",paused:p,queued:"text-neutral-900 dark:text-neutral-100",skipped:p},
  w = {done:"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/80 dark:text-neutral-100/80 dark:border-neutral-100/14",running:m,paused:m,queued:f,skipped:f},
  j = {done:u,running:c,paused:c,queued:c,skipped:d(x,"line-through")};

function N(){
  let[e,t]=useState(false),[r,p]=useState(null),{ref:m,edges:f,onScroll:N}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=t;
      r({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),y=useMemo(()=>g.map((t,r)=>g[r].skipped?"skipped":r<2?"done":2===r?e?"paused":"running":"queued"), [e]),z=y.filter(e=>"done"===e).length,S=z/g.length*100,R=null===r?2:r;
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"relative flex h-full min-h-[560px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-center gap-3">
          <h2 className={d("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>Fix billing entitlements</h2>
          <div className="flex shrink-0 items-center gap-2">
            <div aria-hidden="true" className="w-20 max-sm:hidden">
              <div className="relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7">
                <div className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${S}%`}} />
              </div>
            </div>
            <span className={d(k,"tabular-nums")}>
              {z}
              {" of "}
              {g.length}
              {" done"}
            </span>
          </div>
          <button type="button" onClick={()=>t(e=>!e)} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
            <HugeiconsIcon icon={e?Icon_48318:Icon_63163} size={16} strokeWidth={1.8} aria-hidden="true" />
            {e?"Resume":"Stop"}
          </button>
        </header>
        <p className="sr-only" aria-live="polite">{e?`Paused on ${g[2].title}.`:`Working on ${g[2].title}.`}</p>
        <div className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
          <div className={d("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
            <ol ref={m} onScroll={N} className={d("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","h-full overflow-y-auto overscroll-contain")}>
              {g.map((e,t)=>{
                let r=y[t],n=R===t;
                return (
                  <li key={e.title} aria-current={"running"===r||"paused"===r?"step":undefined} className="p-1">
                                <button type="button" aria-expanded={n} onClick={()=>p(n?-1:t)} className={d("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","rounded-[var(--rb-r-sm,6px)]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","h-9 content-center px-2")}>
                                  <span className={d("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums",w[r],"h-7 w-7")}>
                                    {"done"===r?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" />:t+1}
                                  </span>
                                  <span className={d("text-[14px]/[16px] font-[450]",j[r],"min-w-0 flex-1 truncate")}>{e.title}</span>
                                  <span className="flex w-20 shrink-0 items-center justify-end gap-1.5">
                                    <span className={d("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",_[r])}>
                                      {"running"===r&&<span className="flex h-lh shrink-0 items-center">
                                        <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />
                                      </span>}
                                      {v[r]}
                                    </span>
                                  </span>
                                </button>
                                {n&&<div className={d("flex min-w-0 flex-col gap-3 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 px-3 py-2 dark:bg-neutral-100/5","ms-12 me-2 mt-2 mb-2")}>
                                  <p className={d(h,u)}>{e.detail}</p>
                                  <dl className="flex flex-wrap gap-x-8 gap-y-1">
                                    <div className="flex min-w-0 items-center gap-2">
                                      <dt className={d(b,x,"shrink-0")}>Target</dt>
                                      <dd className={d(e.target?d("font-mono text-[12px]/[16px] tabular-nums",u):d(b,"text-neutral-900/66 dark:text-neutral-100/66"),"min-w-0 truncate")}>{e.target??"None"}</dd>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <dt className={d(b,x,"shrink-0")}>Estimate</dt>
                                      <dd className={d(b,u)}>{e.estimate}</dd>
                                    </div>
                                  </dl>
                                </div>}
                              </li>
                );
              })}
            </ol>
            <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",f.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",f.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default N;
