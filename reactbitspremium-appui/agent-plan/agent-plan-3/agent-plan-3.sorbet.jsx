/**
 * React Bits Pro — Application UI (agent-plan-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" ");

let c = "text-neutral-900 dark:text-neutral-100";

let _ = "text-neutral-900/78 dark:text-neutral-100/78";

let x = "text-neutral-900/62 dark:text-neutral-100/62";

let b = "text-[14px]/[20px] font-medium";

let O = (...e)=>e.filter(Boolean).join(" ");

let B = "text-neutral-900 dark:text-neutral-100";

let F = "text-neutral-900/78 dark:text-neutral-100/78";

let T = "text-[15px]/[20px] font-bold";

let H = "text-[14px]/[20px] font-medium";

let U = "divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7";

let I = "rounded-[var(--rb-r-4xl,18px)]";

let Q = "relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

let Z = O(H,"text-neutral-900/62 dark:text-neutral-100/62");

let G = [{id:"prepare",title:"Prepare the data",subs:[{id:"p1",title:"Load the source files",state:"done"},{id:"p2",title:"Validate the schema",state:"done"},{id:"p3",title:"Snapshot the current rows",state:"done"}]},{id:"migrate",title:"Apply the migration",subs:[{id:"m1",title:"Write the migration file",state:"done"},{id:"m2",title:"Backfill the user rows",state:"done"},{id:"m3",title:"Verify the row counts",state:"failed"},{id:"m4",title:"Drop the legacy tier column",state:"queued"}]},{id:"ship",title:"Ship the change",subs:[{id:"s1",title:"Update the changelog",state:"queued"},{id:"s2",title:"Tag the release",state:"queued"},{id:"s3",title:"Publish the registry payloads",state:"queued"}]},{id:"verify",title:"Verify in staging",subs:[{id:"v1",title:"Run the smoke tests",state:"queued"},{id:"v2",title:"Check the billing dashboard",state:"queued"},{id:"v3",title:"Compare the entitlement counts",state:"queued"}]}];

let K = {done:"Done",running:"Running",queued:"Queued",failed:"Failed"};

let J = {done:"text-neutral-900/78 dark:text-neutral-100/78",running:"text-neutral-900 dark:text-neutral-100",queued:"text-neutral-900 dark:text-neutral-100",failed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

let X = {done:"border-transparent bg-[var(--rb-accent,oklch(84%_0.15_165))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-none",running:"border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] text-neutral-900 dark:text-neutral-100 dark:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]",queued:"border-transparent bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900/62 dark:text-neutral-100/62 dark:bg-neutral-100/10",failed:"border-[oklch(60%_0.236_26)] dark:border-[oklch(65.2%_0.219_26)] bg-[oklch(95.5%_0.03_26)] dark:bg-[oklch(30%_0.065_26)] text-neutral-900 dark:text-neutral-100"};

let Y = {done:F,running:B,queued:B,failed:B};


export default function agent_plan_3__Sorbet__Component(){
  let{ref:e,edges:t,onScroll:r}=function(){
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
  }(),[i,o]=useState({prepare:true,migrate:true,ship:false,verify:false}),[d,c]=useState({}),_=e=>d[e.id]?"running":e.state,x=G.flatMap(e=>e.subs),b=x.filter(e=>"done"===_(e)).length;
  return (
    <div className={O("bg-white dark:bg-neutral-950",B,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-center gap-3">
          <h2 className={O("text-[17px]/[22px] font-extrabold","min-w-0 flex-1 truncate")}>Migrate the entitlement tables</h2>
          <span className={O(Z,"shrink-0 tabular-nums")}>
            {b}
            {" of "}
            {x.length}
            {" done"}
          </span>
        </header>
        <div className={O("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
          <div className={O("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative mt-1 min-h-0 flex-1")}>
            <ul ref={e} onScroll={r} className={O(U,"h-full overflow-y-auto overscroll-contain")}>
              {G.map(e=>{
                let t=i[e.id],r=e.subs.filter(e=>"done"===_(e)).length;
                return (
                  <li key={e.id}>
                                <div className="p-1">
                                  <button type="button" aria-expanded={t} aria-controls={`${e.id}-steps`} onClick={()=>o(t=>({...t,[e.id]:!t[e.id]}))} className={O(Q,"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10",I,"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","group h-9 px-2")}>
                                    <span className="flex size-4 shrink-0 items-center justify-center">
                                      <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                    </span>
                                    <span className={O(T,"min-w-0 flex-1 truncate")}>{e.title}</span>
                                    <span className={O(H,F,"w-20 shrink-0 text-right tabular-nums")}>
                                      {r}
                                      {" of "}
                                      {e.subs.length}
                                    </span>
                                  </button>
                                </div>
                                {t&&<ul id={`${e.id}-steps`} className={O(U,"pl-7")}>
                                  {e.subs.map((e,t)=>{
                                    let r=_(e);
                                    return (
                                      <li key={e.id} aria-current={"running"===r?"step":undefined} className="p-1">
                                                          <div className={O(Q,"failed"===r?"bg-[oklch(95.5%_0.03_26/0.55)] hover:bg-[oklch(95.5%_0.03_26/0.8)] dark:bg-[oklch(30%_0.065_26/0.4)] dark:hover:bg-[oklch(30%_0.065_26/0.6)]":"hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6",I,"h-9 content-center px-2")}>
                                                            <span className={O("grid size-7 shrink-0 place-items-center rounded-full border-2 text-[13px]/[16px] font-extrabold tabular-nums",X[r],"h-7 w-7")}>
                                                              {"done"===r?<HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} aria-hidden="true" />:"failed"===r?<HugeiconsIcon icon={Icon_89289} size={14} strokeWidth={2} aria-hidden="true" />:t+1}
                                                            </span>
                                                            <span className={O(T,Y[r],"min-w-0 flex-1 truncate")}>{e.title}</span>
                                                            {"failed"===r&&<button type="button" onClick={()=>c(t=>({...t,[e.id]:true}))} className={O("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold")}>
                                                              <HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" />
                                                              <span className="max-sm:sr-only">Retry</span>
                                                            </button>}
                                                            <span className="flex w-20 shrink-0 items-center justify-end gap-1.5">
                                                              <span className={O("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",J[r])}>
                                                                {"running"===r&&<span className="flex h-lh shrink-0 items-center">
                                                                  <span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
                                                                </span>}
                                                                {K[r]}
                                                              </span>
                                                            </span>
                                                          </div>
                                                        </li>
                                    );
                                  })}
                                </ul>}
                              </li>
                );
              })}
            </ul>
            <div aria-hidden="true" className={O("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",t.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={O("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}
