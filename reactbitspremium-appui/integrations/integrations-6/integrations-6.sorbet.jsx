/**
 * React Bits Pro — Application UI (integrations-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_81520 = [["path",{d:"M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" ");

let d = "text-neutral-900/62 dark:text-neutral-100/62";

let eI = (...e)=>e.filter(Boolean).join(" ");

let eZ = "text-neutral-900/62 dark:text-neutral-100/62";

let eT = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let eB = "text-neutral-900/62 dark:text-neutral-100/62";

let eq = "text-neutral-900 dark:text-neutral-100";

let eF = "text-neutral-900/78 dark:text-neutral-100/78";

let eK = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]";

let eQ = eI("text-[14px]/[20px] font-medium",eZ);

let eU = eI("text-[13px]/[16px] font-semibold tabular-nums",eZ);

let eJ = [{id:"s1",source:"Northwind",mark:"NW",target:"events.usage_rollups",rows:41822,progress:62,state:"syncing",last:"running now"},{id:"s2",source:"Alder",mark:"AL",target:"billing.invoices",rows:1204,progress:100,state:"healthy",last:"8 minutes ago"},{id:"s3",source:"Cedar Labs",mark:"CL",target:"ci.check_results",rows:9640,progress:100,state:"healthy",last:"22 minutes ago"},{id:"s4",source:"Meridian",mark:"MD",target:"storage.exports",rows:318,progress:41,state:"error",last:"1 hour ago",note:"Bucket rejected the write: missing s3:PutObject on the export prefix."},{id:"s5",source:"Quarry",mark:"QR",target:"audit.entries",rows:76210,progress:100,state:"paused",last:"yesterday"}];

let eY = {syncing:{label:"Syncing",tone:eq},healthy:{label:"Healthy",tone:eF},paused:{label:"Paused",tone:eB},error:{label:"Failed",tone:eK}};


export default function integrations_6__Sorbet__Component(){
  let e=useId(),[r,a]=useState(eJ),{ref:l,edges:s,onScroll:c}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:o}=r;
      a({start:t>1,end:Math.ceil(t+o)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }();
  useEffect(()=>{
    let e=window.setInterval(()=>{
      a(e=>e.map(e=>"syncing"===e.state?{...e,progress:e.progress>=100?12:Math.min(100,e.progress+4),rows:e.rows+137}:e))
    },900);
    return ()=>window.clearInterval(e);
  }, []);
  let d={healthy:r.filter(e=>"healthy"===e.state).length,syncing:r.filter(e=>"syncing"===e.state).length,error:r.filter(e=>"error"===e.state).length,paused:r.filter(e=>"paused"===e.state).length};
  return (
    <div className={eI("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className={eI("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","shrink-0 px-5 py-4")}>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-[22px]/[28px] font-extrabold tracking-[-0.01em]">Sync status</h2>
              <p className={eI(eQ,"mt-1")}>Five connected sources writing into the warehouse.</p>
            </div>
            <button type="button" className={eI(eT,"h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
              <HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" />
              Sync all
            </button>
          </div>
          <div className={eI("@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1","mt-4")}>
            <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
              {[["Healthy",d.healthy,eF],["Syncing",d.syncing,eq],["Failed",d.error,eK],["Paused",d.paused,eB]].map(([e,r,a])=>(
                <div key={e} className="flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4">
                            <p className={eI("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",a)}>{e}</p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100">{r}</p>
                          </div>
              ))}
            </div>
          </div>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={l} onScroll={c} className="h-full overflow-y-auto px-5 py-4">
            <ul className="space-y-2">
              {r.map(e=>{
                let r=eY[e.state];
                return (
                  <li key={e.id} className={eI("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","p-3.5")}>
                                <div className="flex flex-wrap items-center gap-3">
                                  <span aria-hidden="true" className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] select-none">
                                    <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{e.mark}</span>
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-[15px]/[20px] font-bold">{e.source}</span>
                                      <span aria-hidden="true" className={eZ}>→</span>
                                      <span className={eI("font-mono text-[12px]/[16px] tabular-nums",eZ,"truncate")}>{e.target}</span>
                                    </div>
                                    <p className={eI(eU,"mt-0.5 flex flex-wrap gap-x-3")}>
                                      <span>
                                        <span className="tabular-nums">{e.rows.toLocaleString("en-US")}</span>
                                        {" "}
                                        rows
                                      </span>
                                      <span className="sm:hidden">{e.last}</span>
                                    </p>
                                  </div>
                                  <span className={eI(eQ,"w-28 shrink-0 text-right max-sm:hidden")}>{e.last}</span>
                                  <span className={eI("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums",r.tone,"shrink-0 sm:w-18")}>
                                    {"syncing"===e.state&&<span className="flex h-lh shrink-0 items-center">
                                      <span className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" aria-hidden="true" />
                                    </span>}
                                    {r.label}
                                  </span>
                                  <button type="button" onClick={()=>{
                                    let r;
                                    return r=e.id,a(e=>e.map(e=>e.id===r?{...e,state:"paused"===e.state||"error"===e.state?"syncing":"paused"}:e));
                                  }} aria-label={"paused"===e.state||"error"===e.state?`Resume ${e.source}`:`Pause ${e.source}`} className={eI(eT,"size-8 rounded-[calc(var(--rb-r-full,999px))]")}>
                                    <HugeiconsIcon icon={"paused"===e.state||"error"===e.state?Icon_48318:Icon_81520} size={18} strokeWidth={2} aria-hidden="true" />
                                  </button>
                                </div>
                                <div className={eI("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","mt-3")}>
                                  <div className={"error"===e.state?eI("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","block h-full"):"block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]"} style={{width:`${e.progress}%`}} />
                                </div>
                                {e.note&&<p className={eI("flex items-start gap-2 text-[14px]/[20px] font-bold text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]","mt-2.5")}>
                                  <HugeiconsIcon icon={Icon_36474} size={18} strokeWidth={2} aria-hidden="true" className="mt-px shrink-0" />
                                  {e.note}
                                </p>}
                              </li>
                );
              })}
            </ul>
          </div>
          <div aria-hidden="true" className={eI("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",s.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={eI("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",s.end?"opacity-100":"opacity-0")} />
        </div>
        <footer className={eI("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7",eQ,"flex shrink-0 items-center gap-2 px-5 py-2.5")}>
          <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={2} aria-hidden="true" />
          <span className="flex flex-wrap gap-x-3">
            <span>Warehouse reachable</span>
            <span>Checked 30 seconds ago</span>
          </span>
        </footer>
        <p className="sr-only" aria-live="polite" id={`${e}-live`}>
          {d.error}
          {" failing syncs"}
        </p>
      </div>
  );
}
