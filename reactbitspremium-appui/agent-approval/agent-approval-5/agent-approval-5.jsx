/**
 * React Bits Pro — Application UI (agent-approval-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900/80 dark:text-neutral-100/80",
  u = "text-[13px]/[18px] font-normal",
  x = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  p = "flex size-4 shrink-0 items-center justify-center",
  b = c(u,"text-neutral-900/66 dark:text-neutral-100/66"),
  _ = [{label:"Runtime",value:"~40 min",note:"Runs in the background"},{label:"Model usage",value:"up to $18.40",note:"Capped at $25.00"},{label:"Warehouse queries",value:"9,600",note:"Read-only snapshots"}],
  h = `run_forecast({
  horizon: "Q4",
  maxSpendUsd: 25
})`;

function m(){
  let[e,t]=useState("pending"),[r,m]=useState(false),[f,v]=useState("");
  useEffect(()=>{
    if(!f)return;
    let e=setTimeout(()=>v(""),2400);
    return ()=>clearTimeout(e);
  }, [f]);
  let k=Math.round(73.6);
  return (
    <div className={c("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[560px] w-full items-center justify-center overflow-y-auto p-4 sm:p-6")}>
        <section aria-labelledby="aa5-title" className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","w-full max-w-lg")}>
          <div className="flex min-w-0 flex-col gap-1 px-4 pt-3 pb-1">
            <div className="flex h-6 min-w-0 items-center gap-2">
              {"pending"===e?<span className="inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">High-cost operation</span>:<span className={c("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","approved"===e?"text-neutral-900/80 dark:text-neutral-100/80":"text-neutral-900/66 dark:text-neutral-100/66")}>{"approved"===e?"Approved":"Skipped"}</span>}
              <span className={c(b,"ml-auto min-w-0 truncate")}>Demand forecast agent</span>
            </div>
            <h2 id="aa5-title" className={c("min-w-0 py-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","text-balance")}>Run the Q4 demand forecast: about 40 minutes and up to $18 in model usage</h2>
          </div>
          <div className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","px-3 pt-1","pending"!==e||r?"pb-3":"pb-1")}>
            <dl className="flex flex-col">
              {_.map(e=>(
                <div key={e.label} className="flex flex-col gap-0.5 py-2 sm:grid sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-3">
                            <dt className={c(u,d)}>{e.label}</dt>
                            <dd className={c("text-[14px]/[16px] font-[450]","tabular-nums sm:min-w-0")}>{e.value}</dd>
                            <dd className={b}>{e.note}</dd>
                          </div>
              ))}
            </dl>
            <div className="mt-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className={c(u,d)}>Projected spend for this run</span>
                <span className={c(b,"tabular-nums")}>
                  $
                  18.40
                  {" of a $"}
                  25.00
                  {" cap"}
                </span>
              </div>
              <div className={c("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-2")}>
                <div className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${k}%`}} />
              </div>
            </div>
            {"pending"===e&&<>
              <button type="button" onClick={()=>m(e=>!e)} aria-expanded={r} className={c("group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","mt-2")}>
                <span className={p}>
                  <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                </span>
                {r?"Hide request":"Show request"}
              </button>
              {r&&<pre tabIndex={0} className={c("flex min-w-0 flex-col gap-3 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 px-3 py-2 dark:bg-neutral-100/5","min-w-0 overflow-x-auto font-mono text-[12px]/[16px] whitespace-pre-wrap text-neutral-900/80 dark:text-neutral-100/80 [overflow-wrap:anywhere]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","mt-1 max-h-40 overflow-auto")}>{h}</pre>}
            </>}
          </div>
          <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">
            {"pending"===e?<>
              <button type="button" onClick={()=>{
                t("rejected"),v("Skipped, not approved.")
              }} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",x)}>Reject</button>
              <button type="button" onClick={()=>{
                t("approved"),v("Approved. The forecast is running.")
              }} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",x)}>Approve</button>
            </>:<>
              <span className={p}>
                <HugeiconsIcon icon={"approved"===e?Icon_90987:Icon_99199} size={12} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <p className={c(d,"min-w-0 flex-1")}>
                {"approved"===e?"Running in the background. You can stop it any time":"Skipped, not approved"}
              </p>
            </>}
          </div>
        </section>
        <span className="sr-only" aria-live="polite">{f}</span>
      </div>
  );
}


export default m;
