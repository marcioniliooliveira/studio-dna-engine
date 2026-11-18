/**
 * React Bits Pro — Application UI (agent-activity-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let i = (...e)=>e.filter(Boolean).join(" "),
  o = "text-neutral-900/80 dark:text-neutral-100/80",
  d = "text-neutral-900/66 dark:text-neutral-100/66",
  c = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  u = "size-7 rounded-[var(--rb-r-sm,6px)]",
  x = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  h = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  b = "text-right tabular-nums",
  m = i("text-[13px]/[18px] font-normal",d),
  p = [{name:"Reconcile October invoices",status:"succeeded",duration:"24.1s",cost:"$0.42",started:"12m ago"},{name:"Sync Northwind CRM accounts",status:"succeeded",duration:"1m 18s",cost:"$1.85",started:"46m ago"},{name:"Refresh churn model features",status:"failed",duration:"8.3s",cost:"$0.11",started:"1h ago"},{name:"Export weekly board metrics",status:"succeeded",duration:"42.7s",cost:"$0.63",started:"2h ago"},{name:"Deduplicate contact records",status:"cancelled",duration:"5.0s",cost:null,started:"3h ago"},{name:"Backfill subscription events",status:"succeeded",duration:"3m 04s",cost:"$2.40",started:"5h ago"},{name:"Retag support conversations",status:"succeeded",duration:"58.9s",cost:"$0.71",started:"6h ago"},{name:"Generate quarterly revenue summary for the finance leadership review",status:"succeeded",duration:"1m 02s",cost:"$0.94",started:"9h ago"},{name:"Rotate warehouse credentials",status:"failed",duration:"2.1s",cost:"$0.03",started:"11h ago"},{name:"Import marketing leads",status:"cancelled",duration:"14.6s",cost:null,started:"14h ago"},{name:"Reindex the product catalogue",status:"succeeded",duration:"2m 41s",cost:"$1.12",started:"18h ago"},{name:"Recompute account health scores",status:"succeeded",duration:"47.5s",cost:"$0.55",started:"1d ago"},{name:"Summarise overnight support volume",status:"succeeded",duration:"31.2s",cost:"$0.38",started:"1d ago"},{name:"Prune stale vector embeddings",status:"cancelled",duration:"9.4s",cost:null,started:"2d ago"}],
  f = {succeeded:"Succeeded",failed:"Failed",cancelled:"Cancelled"},
  v = {succeeded:"text-neutral-900/80 dark:text-neutral-100/80",failed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",cancelled:"text-neutral-900/66 dark:text-neutral-100/66"};

function g({status:e}){
  return <span className={i("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",v[e],"whitespace-nowrap")}>{f[e]}</span>;
}

function k(){
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
  }();
  return (
    <div className={i("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full flex-col gap-3 overflow-hidden p-4 sm:gap-4 sm:p-6")}>
        <div className="flex shrink-0 items-baseline gap-2">
          <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Run history</h2>
          <span className={i(m,"tabular-nums")}>
            {p.length}
            {" runs"}
          </span>
        </div>
        <div className={i("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
          <div className={i("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
            <div ref={e} onScroll={r} className="h-full overflow-y-auto overscroll-contain">
              <ul className={i("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex flex-col md:hidden")}>
                {p.map((e,t)=>(
                  <li key={t} className={i("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","failed"===e.status&&"bg-[oklch(94.5%_0.027_26/0.4)] hover:bg-[oklch(94.5%_0.027_26/0.6)] dark:bg-[oklch(29%_0.06_26/0.4)] dark:hover:bg-[oklch(29%_0.06_26/0.6)]","px-3")}>
                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                  <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{e.name}</span>
                                  <dl data-description className={i(m,"flex flex-wrap items-baseline gap-x-3 gap-y-1")}>
                                    <div className="flex items-baseline gap-1.5">
                                      <dt className="sr-only">Status</dt>
                                      <dd><g status={e.status} /></dd>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                      <dt>Duration</dt>
                                      <dd className={i(o,"tabular-nums")}>{e.duration}</dd>
                                    </div>
                                    {e.cost&&<div className="flex items-baseline gap-1">
                                      <dt>Cost</dt>
                                      <dd className={i(o,"tabular-nums")}>{e.cost}</dd>
                                    </div>}
                                    <div className="flex items-baseline gap-1">
                                      <dt>Started</dt>
                                      <dd className="tabular-nums">{e.started}</dd>
                                    </div>
                                  </dl>
                                </div>
                                <div className="relative z-10 flex shrink-0 items-center gap-1">
                                  <button type="button" aria-label={`Re-run ${e.name}`} className={i(c,u)}>
                                    <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
                                  </button>
                                </div>
                              </li>
                ))}
              </ul>
              <table className={i("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","hidden table-fixed md:table")}>
                <caption className="sr-only">
                  Run history, newest first. Fourteen agent runs with status, duration, cost and start time.
                </caption>
                <thead>
                  <tr className={i("bg-white dark:bg-neutral-950","sticky top-0 z-20 h-9")}>
                    <th scope="col" className={i(x,"w-[36%]")}>Run</th>
                    <th scope="col" className={i(x,"w-[15%]")}>Status</th>
                    <th scope="col" className={i(x,"w-[13%] text-right")}>Duration</th>
                    <th scope="col" className={i(x,"w-[12%] text-right")}>Cost</th>
                    <th scope="col" className={i(x,"w-[16%] text-right")}>Started</th>
                    <th scope="col" className={i(x,"w-[8%]")}><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {p.map((e,t)=>(
                    <tr key={t} className={i("failed"===e.status?"group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] bg-[oklch(94.5%_0.027_26/0.4)] hover:bg-[oklch(94.5%_0.027_26/0.6)] dark:bg-[oklch(29%_0.06_26/0.4)] dark:hover:bg-[oklch(29%_0.06_26/0.6)]":"group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-11")}>
                                    <td className={h}><span className="block truncate">{e.name}</span></td>
                                    <td className={h}><g status={e.status} /></td>
                                    <td className={i(h,b)}><span className={o}>{e.duration}</span></td>
                                    <td className={i(h,b)}>{e.cost&&<span className={o}>{e.cost}</span>}</td>
                                    <td className={i(h,b)}><span className={d}>{e.started}</span></td>
                                    <td className={h}>
                                      <div className="flex items-center justify-end gap-0.5 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-[120ms]">
                                        <button type="button" aria-label={`Re-run ${e.name}`} className={i(c,u)}>
                                          <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div aria-hidden="true" className={i("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default k;
