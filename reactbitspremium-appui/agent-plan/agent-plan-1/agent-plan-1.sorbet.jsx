/**
 * React Bits Pro — Application UI (agent-plan-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" ");

let c = "text-neutral-900 dark:text-neutral-100";

let _ = "text-neutral-900/78 dark:text-neutral-100/78";

let x = "text-neutral-900/62 dark:text-neutral-100/62";

let b = "text-[14px]/[20px] font-medium";

let u = "text-[13px]/[16px] font-semibold tabular-nums";

let p = "text-neutral-900/62 dark:text-neutral-100/62";

let h = "border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] text-neutral-900 dark:text-neutral-100 dark:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]";

let k = "border-transparent bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900/62 dark:text-neutral-100/62 dark:bg-neutral-100/10";

let m = d(b,x);

let g = [{title:"Read the billing contract notes",detail:"Collected the pricing rules, renewal terms and license caps.",target:"docs/billing.md",estimate:"2 min"},{title:"Map the entitlement resolver",detail:"Traced how a key resolves to a tier before touching the branch.",target:"lib/registry-auth.ts",estimate:"3 min"},{title:"Patch the tier lookup",detail:"Adding the renewal fallback so expired keys keep access through the grace window, without changing the response shape.",target:"lib/registry-auth.ts",estimate:"6 min"},{title:"Add a renewal-grace test",detail:"Covers the expired-but-in-grace path from key to response.",target:"tests/entitlements.test.ts",estimate:"4 min"},{title:"Run the license checks",detail:"Verifies expired, starter, pro and ultimate keys each branch.",target:"npm test",estimate:"5 min"},{title:"Regenerate the entitlement fixtures",detail:"Skipped in review: the current fixtures already cover the change.",target:"scripts/fixtures.ts",estimate:"4 min",skipped:true},{title:"Update the installation docs",detail:"Describes the renewal fallback in plain language.",target:"docs/installation.md",estimate:"3 min"}];

let f = {done:"Done",running:"Running",paused:"Paused",queued:"Queued",skipped:"Skipped"};

let v = {done:"text-neutral-900/78 dark:text-neutral-100/78",running:"text-neutral-900 dark:text-neutral-100",paused:p,queued:"text-neutral-900 dark:text-neutral-100",skipped:p};

let w = {done:"border-transparent bg-[var(--rb-accent,oklch(84%_0.15_165))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-none",running:h,paused:h,queued:k,skipped:k};

let j = {done:_,running:c,paused:c,queued:c,skipped:d(x,"line-through")};


export default function agent_plan_1__Sorbet__Component(){
  let[e,t]=useState(false),[r,p]=useState(null),{ref:h,edges:k,onScroll:N}=function(){
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
  }(),y=useMemo(()=>g.map((t,r)=>g[r].skipped?"skipped":r<2?"done":2===r?e?"paused":"running":"queued"), [e]),C=y.filter(e=>"done"===e).length,z=C/g.length*100,S=null===r?2:r;
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"relative flex h-full min-h-[560px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-center gap-3">
          <h2 className={d("text-[17px]/[22px] font-extrabold","min-w-0 flex-1 truncate")}>Fix billing entitlements</h2>
          <div className="flex shrink-0 items-center gap-2">
            <div aria-hidden="true" className="w-20 max-sm:hidden">
              <div className="relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
                <div className="block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" style={{width:`${z}%`}} />
              </div>
            </div>
            <span className={d(m,"tabular-nums")}>
              {C}
              {" of "}
              {g.length}
              {" done"}
            </span>
          </div>
          <button type="button" onClick={()=>t(e=>!e)} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
            <HugeiconsIcon icon={e?Icon_48318:Icon_63163} size={18} strokeWidth={2} aria-hidden="true" />
            {e?"Resume":"Stop"}
          </button>
        </header>
        <p className="sr-only" aria-live="polite">{e?`Paused on ${g[2].title}.`:`Working on ${g[2].title}.`}</p>
        <div className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
          <div className={d("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative mt-1 min-h-0 flex-1")}>
            <ol ref={h} onScroll={N} className={d("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","h-full overflow-y-auto overscroll-contain")}>
              {g.map((e,t)=>{
                let r=y[t],n=S===t;
                return (
                  <li key={e.title} aria-current={"running"===r||"paused"===r?"step":undefined} className="p-1">
                                <button type="button" aria-expanded={n} onClick={()=>p(n?-1:t)} className={d("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]","cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","rounded-[var(--rb-r-4xl,18px)]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","h-9 content-center px-2")}>
                                  <span className={d("grid size-7 shrink-0 place-items-center rounded-full border-2 text-[13px]/[16px] font-extrabold tabular-nums",w[r],"h-7 w-7")}>
                                    {"done"===r?<HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} aria-hidden="true" />:t+1}
                                  </span>
                                  <span className={d("text-[15px]/[20px] font-bold",j[r],"min-w-0 flex-1 truncate")}>{e.title}</span>
                                  <span className="flex w-20 shrink-0 items-center justify-end gap-1.5">
                                    <span className={d("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",v[r])}>
                                      {"running"===r&&<span className="flex h-lh shrink-0 items-center">
                                        <span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
                                      </span>}
                                      {f[r]}
                                    </span>
                                  </span>
                                </button>
                                {n&&<div className={d("flex min-w-0 flex-col gap-3 rounded-[calc(var(--rb-r-xl,12px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 py-2.5","ms-12 me-2 mt-2 mb-2")}>
                                  <p className={d(b,_)}>{e.detail}</p>
                                  <dl className="flex flex-wrap gap-x-8 gap-y-1">
                                    <div className="flex min-w-0 items-center gap-2">
                                      <dt className={d(u,x,"shrink-0")}>Target</dt>
                                      <dd className={d(e.target?d("font-mono text-[12px]/[16px] tabular-nums",_):d(u,"text-neutral-900/62 dark:text-neutral-100/62"),"min-w-0 truncate")}>{e.target??"None"}</dd>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <dt className={d(u,x,"shrink-0")}>Estimate</dt>
                                      <dd className={d(u,_)}>{e.estimate}</dd>
                                    </div>
                                  </dl>
                                </div>}
                              </li>
                );
              })}
            </ol>
            <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",k.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",k.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}
