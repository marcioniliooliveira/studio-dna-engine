/**
 * React Bits Pro — Application UI (agent-activity-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let B = (...e)=>e.filter(Boolean).join(" ");

let H = "text-neutral-900/78 dark:text-neutral-100/78";

let P = "text-neutral-900/62 dark:text-neutral-100/62";

let Z = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let G = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let K = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let Q = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let Y = "text-right tabular-nums";

let J = B("text-[14px]/[20px] font-medium",P);

let U = [{name:"Reconcile October invoices",status:"succeeded",duration:"24.1s",cost:"$0.42",started:"12m ago"},{name:"Sync Northwind CRM accounts",status:"succeeded",duration:"1m 18s",cost:"$1.85",started:"46m ago"},{name:"Refresh churn model features",status:"failed",duration:"8.3s",cost:"$0.11",started:"1h ago"},{name:"Export weekly board metrics",status:"succeeded",duration:"42.7s",cost:"$0.63",started:"2h ago"},{name:"Deduplicate contact records",status:"cancelled",duration:"5.0s",cost:null,started:"3h ago"},{name:"Backfill subscription events",status:"succeeded",duration:"3m 04s",cost:"$2.40",started:"5h ago"},{name:"Retag support conversations",status:"succeeded",duration:"58.9s",cost:"$0.71",started:"6h ago"},{name:"Generate quarterly revenue summary for the finance leadership review",status:"succeeded",duration:"1m 02s",cost:"$0.94",started:"9h ago"},{name:"Rotate warehouse credentials",status:"failed",duration:"2.1s",cost:"$0.03",started:"11h ago"},{name:"Import marketing leads",status:"cancelled",duration:"14.6s",cost:null,started:"14h ago"},{name:"Reindex the product catalogue",status:"succeeded",duration:"2m 41s",cost:"$1.12",started:"18h ago"},{name:"Recompute account health scores",status:"succeeded",duration:"47.5s",cost:"$0.55",started:"1d ago"},{name:"Summarise overnight support volume",status:"succeeded",duration:"31.2s",cost:"$0.38",started:"1d ago"},{name:"Prune stale vector embeddings",status:"cancelled",duration:"9.4s",cost:null,started:"2d ago"}];

let X = {succeeded:"Succeeded",failed:"Failed",cancelled:"Cancelled"};

let ee = {succeeded:"text-neutral-900/78 dark:text-neutral-100/78",failed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",cancelled:"text-neutral-900/62 dark:text-neutral-100/62"};

function er({status:e}){
  return <span className={B("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",ee[e],"whitespace-nowrap")}>{X[e]}</span>;
}


export default function agent_activity_4__Sorbet__Component(){
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
  }();
  return (
    <div className={B("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[700px] w-full flex-col gap-3 overflow-hidden p-4 sm:gap-4 sm:p-6")}>
        <div className="flex shrink-0 items-baseline gap-2">
          <h2 className="text-[17px]/[22px] font-extrabold">Run history</h2>
          <span className={B(J,"tabular-nums")}>
            {U.length}
            {" runs"}
          </span>
        </div>
        <div className={B("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
          <div className={B("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative mt-1 min-h-0 flex-1")}>
            <div ref={e} onScroll={t} className="h-full overflow-y-auto overscroll-contain">
              <ul className={B("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","flex flex-col md:hidden")}>
                {U.map((e,r)=>(
                  <li key={r} className={B("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","failed"===e.status&&"bg-[oklch(95.5%_0.03_26/0.55)] hover:bg-[oklch(95.5%_0.03_26/0.8)] dark:bg-[oklch(30%_0.065_26/0.4)] dark:hover:bg-[oklch(30%_0.065_26/0.6)]","px-3")}>
                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                  <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100">{e.name}</span>
                                  <dl data-description className={B(J,"flex flex-wrap items-baseline gap-x-3 gap-y-1")}>
                                    <div className="flex items-baseline gap-1.5">
                                      <dt className="sr-only">Status</dt>
                                      <dd><er status={e.status} /></dd>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                      <dt>Duration</dt>
                                      <dd className={B(H,"tabular-nums")}>{e.duration}</dd>
                                    </div>
                                    {e.cost&&<div className="flex items-baseline gap-1">
                                      <dt>Cost</dt>
                                      <dd className={B(H,"tabular-nums")}>{e.cost}</dd>
                                    </div>}
                                    <div className="flex items-baseline gap-1">
                                      <dt>Started</dt>
                                      <dd className="tabular-nums">{e.started}</dd>
                                    </div>
                                  </dl>
                                </div>
                                <div className="relative z-10 flex shrink-0 items-center gap-1">
                                  <button type="button" aria-label={`Re-run ${e.name}`} className={B(Z,G)}>
                                    <HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" />
                                  </button>
                                </div>
                              </li>
                ))}
              </ul>
              <table className={B("w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium","hidden table-fixed md:table")}>
                <caption className="sr-only">
                  Run history, newest first. Fourteen agent runs with status, duration, cost and start time.
                </caption>
                <thead>
                  <tr className={B("bg-white dark:bg-neutral-950","sticky top-0 z-20 h-9")}>
                    <th scope="col" className={B(K,"w-[36%]")}>Run</th>
                    <th scope="col" className={B(K,"w-[15%]")}>Status</th>
                    <th scope="col" className={B(K,"w-[13%] text-right")}>Duration</th>
                    <th scope="col" className={B(K,"w-[12%] text-right")}>Cost</th>
                    <th scope="col" className={B(K,"w-[16%] text-right")}>Started</th>
                    <th scope="col" className={B(K,"w-[8%]")}><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {U.map((e,r)=>(
                    <tr key={r} className={B("failed"===e.status?"group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-[oklch(95.5%_0.03_26/0.55)] hover:bg-[oklch(95.5%_0.03_26/0.8)] dark:bg-[oklch(30%_0.065_26/0.4)] dark:hover:bg-[oklch(30%_0.065_26/0.6)]":"group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","h-11")}>
                                    <td className={Q}><span className="block truncate">{e.name}</span></td>
                                    <td className={Q}><er status={e.status} /></td>
                                    <td className={B(Q,Y)}><span className={H}>{e.duration}</span></td>
                                    <td className={B(Q,Y)}>{e.cost&&<span className={H}>{e.cost}</span>}</td>
                                    <td className={B(Q,Y)}><span className={P}>{e.started}</span></td>
                                    <td className={Q}>
                                      <div className="flex items-center justify-end gap-0.5 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-[180ms]">
                                        <button type="button" aria-label={`Re-run ${e.name}`} className={B(Z,G)}>
                                          <HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div aria-hidden="true" className={B("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}
