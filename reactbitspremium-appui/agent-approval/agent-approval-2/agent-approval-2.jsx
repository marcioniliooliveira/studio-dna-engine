/**
 * React Bits Pro — Application UI (agent-approval-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900/80 dark:text-neutral-100/80",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-[13px]/[18px] font-normal",
  p = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  b = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  _ = "flex size-4 shrink-0 items-center justify-center",
  h = c(x,u),
  m = [{label:"Retention window",from:"180 days",to:"45 days"},{label:"Nightly purge",from:"Off",to:"On"},{label:"Grace period before purge",from:"None",to:"7 days"}],
  f = `retention:
- invoiceDraftDays: 180
+ invoiceDraftDays: 45
+ nightlyPurge: true
+ purgeGraceDays: 7
  keepPostedInvoices: true`;

function v(){
  let[e,t]=useState("pending"),[r,v]=useState(false),[k,g]=useState(""),{ref:w,edges:j,onScroll:y}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }();
  return useEffect(()=>{
    if(!k)return;
    let e=setTimeout(()=>g(""),2400);
    return ()=>clearTimeout(e);
  }, [k]),<div className={c("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[560px] w-full flex-col overflow-hidden")}>
    <header className="flex h-14 shrink-0 items-center gap-2 px-4 sm:px-6">
      <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Retention policy update</h2>
      <span className={c(h,"ml-auto")}>Repo maintenance agent</span>
    </header>
    <div className="relative min-h-0 flex-1">
      <main ref={w} onScroll={y} className="h-full overflow-y-auto p-4 sm:p-6">
        <div className="flex min-h-full items-center">
          <section aria-labelledby="aa2-title" className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-2xl")}>
            <div className="flex min-w-0 flex-col gap-1 px-4 pt-3 pb-1">
              <div className="flex h-6 min-w-0 items-center">
                {"pending"===e?<span className="inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">Needs approval</span>:<span className={c("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","denied"===e?"text-neutral-900/66 dark:text-neutral-100/66":"text-neutral-900/80 dark:text-neutral-100/80")}>{"denied"===e?"Skipped":"always"===e?"Always allowed":"Approved"}</span>}
              </div>
              <h2 id="aa2-title" className={c("min-w-0 py-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","text-balance")}>Change the invoice retention window from 180 to 45 days</h2>
            </div>
            <div className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","gap-1 px-3 pt-3","pending"!==e||r?"pb-3":"pb-1")}>
              <p className={c("text-[14px]/[20px] font-normal",d)}>
                Applies to the finance workspace. Invoice drafts older than 45 days will be purged nightly; posted invoices are never touched.
              </p>
              <dl className="mt-1 grid grid-cols-[minmax(0,1fr)_auto_auto_auto] gap-x-2">
                {m.map(e=>(
                  <div key={e.label} className="col-span-full grid min-h-9 grid-cols-subgrid items-center py-1.5">
                                    <dt className={c(x,d,"min-w-0 truncate pe-2")}>{e.label}</dt>
                                    <dd className="col-span-3 grid grid-cols-subgrid items-center tabular-nums">
                                      <span className={c(x,u,"text-right line-through")}>{e.from}</span>
                                      <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={1.8} aria-hidden="true" className={u} />
                                      <span className="text-[14px]/[16px] font-[450]">{e.to}</span>
                                    </dd>
                                  </div>
                ))}
              </dl>
              {"pending"===e&&<>
                <button type="button" onClick={()=>v(e=>!e)} aria-expanded={r} className="group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]">
                  <span className={_}>
                    <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                  </span>
                  {r?"Hide diff":"Show diff"}
                </button>
                {r&&<pre tabIndex={0} className={c("flex min-w-0 flex-col gap-3 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 px-3 py-2 dark:bg-neutral-100/5","min-w-0 overflow-x-auto font-mono text-[12px]/[16px] whitespace-pre-wrap text-neutral-900/80 dark:text-neutral-100/80 [overflow-wrap:anywhere]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","max-h-40 overflow-auto")}>{f}</pre>}
              </>}
            </div>
            <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">
              {"pending"===e?<>
                <button type="button" onClick={()=>{
                  t("denied"),g("Skipped, not approved.")
                }} className={c(p,b)}>Reject</button>
                <button type="button" onClick={()=>{
                  t("always"),g("Always allowed for this project.")
                }} className={c(p,b)}>Always allow</button>
                <button type="button" onClick={()=>{
                  t("once"),g("Approved. The policy was updated.")
                }} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",b)}>Approve</button>
              </>:<>
                <span className={_}>
                  <HugeiconsIcon icon={"denied"===e?Icon_99199:Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <p className={c(d,"min-w-0 flex-1")}>
                  {"denied"===e?"Skipped, not approved":"always"===e?"Always allowed: policy edits in this project now run automatically":"Allowed once, the retention policy was updated"}
                </p>
              </>}
            </div>
          </section>
        </div>
      </main>
      <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",j.start?"opacity-100":"opacity-0")} />
      <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",j.end?"opacity-100":"opacity-0")} />
    </div>
    <span className="sr-only" aria-live="polite">{k}</span>
  </div>;
}


export default v;
