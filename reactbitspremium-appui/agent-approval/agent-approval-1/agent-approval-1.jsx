/**
 * React Bits Pro — Application UI (agent-approval-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { useReducedMotion } from 'motion/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[13px]/[18px] font-normal",
  b = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  _ = "flex min-w-0 flex-col gap-3 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]",
  h = "flex size-4 shrink-0 items-center justify-center",
  m = "ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/66 dark:text-neutral-100/66",
  f = `delete_projects({
  workspace: "storage-cleanup",
  ids: ["prj_9f2a", "prj_7c10", "prj_5b83", … +9],
  purgeBuildCache: true
})`;

function v(){
  let e=useReducedMotion(),[t,r]=useState("pending"),[v,k]=useState(false),[g,w]=useState(""),{ref:j,edges:y,onScroll:N}=function(){
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
    if(!g)return;
    let e=setTimeout(()=>w(""),2400);
    return ()=>clearTimeout(e);
  }, [g]),useEffect(()=>{
    if("pending"===t)return;
    let r=j.current;
    r&&r.scrollTo({top:r.scrollHeight,behavior:e?"auto":"smooth"})
  }, [t,e,j]),<div className={d("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[480px] w-full flex-col overflow-hidden")}>
    <div className="relative min-h-0 flex-1">
      <div ref={j} onScroll={N} className="h-full overflow-y-auto overscroll-contain [overflow-anchor:none] px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <p className={d("text-[12px]/[16px] font-normal tabular-nums",x,"text-center")}>Today</p>
          <div className="flex justify-end">
            <div className="max-w-[85%]">
              <p className="w-fit max-w-full rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-3.5 py-2 text-[14px]/[20px] whitespace-pre-wrap text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">Clean up the archived projects: we’re over the storage quota again.</p>
            </div>
          </div>
          <p className={_}>
            Twelve archived projects haven’t been opened in over a year. Removing them and their build history frees about 4.2 GB. Because this is permanent, I need you to confirm before I run it.
          </p>
          <div className={d(p,u,"flex h-8 items-center gap-2")}>
            <span className={h}>
              <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" className={x} />
            </span>
            <span className={d("min-w-[6ch] truncate text-neutral-900 dark:text-neutral-100","font-mono text-[12px]/[16px] tabular-nums")}>list_projects</span>
            <span className={m}>0.8s</span>
          </div>
          {"pending"===t?<section aria-labelledby="aa1-title" className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className="flex min-w-0 flex-col gap-1 px-4 pt-3 pb-1">
              <div className="flex h-6 min-w-0 items-center">
                <span className="inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">Needs approval</span>
              </div>
              <p id="aa1-title" className={d("min-w-0 py-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","text-balance")}>Delete 12 archived projects and their build history</p>
            </div>
            <div className={d("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","gap-1 px-3 pt-3",v?"pb-3":"pb-1")}>
              <p className={d(p,u)}>
                Frees 4.2 GB in the storage-cleanup workspace. Active projects are untouched and this can’t be undone.
              </p>
              <button type="button" onClick={()=>k(e=>!e)} aria-expanded={v} className="group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]">
                <span className={h}>
                  <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                </span>
                {v?"Hide request":"Show request"}
              </button>
              {v&&<pre tabIndex={0} className={d("flex min-w-0 flex-col gap-3 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 px-3 py-2 dark:bg-neutral-100/5","min-w-0 overflow-x-auto font-mono text-[12px]/[16px] whitespace-pre-wrap text-neutral-900/80 dark:text-neutral-100/80 [overflow-wrap:anywhere]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","max-h-40 overflow-auto")}>{f}</pre>}
            </div>
            <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">
              <button type="button" onClick={()=>{
                r("rejected"),w("Skipped, not approved.")
              }} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",b)}>Reject</button>
              <button type="button" onClick={()=>{
                r("approved"),w("Approved. Deleted 12 projects and freed 4.2 GB.")
              }} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",b)}>Delete 12 projects</button>
            </div>
          </section>:<div className={d(p,u,"flex min-h-8 items-center gap-2")}>
            <span className={h}>
              <HugeiconsIcon icon={"approved"===t?Icon_90987:Icon_99199} size={12} strokeWidth={1.8} aria-hidden="true" className={x} />
            </span>
            <p className="min-w-0 flex-1 truncate">
              {"approved"===t?"Approved: deleted 12 projects, freed 4.2 GB":"Skipped, not approved"}
            </p>
            <span className={m}>just now</span>
          </div>}
          {"approved"===t&&<p className={_}>
            Done: your archive is cleaned up. I’ll flag projects for review the next time you pass 90% of the quota.
          </p>}
        </div>
      </div>
      <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",y.start?"opacity-100":"opacity-0")} />
      <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",y.end?"opacity-100":"opacity-0")} />
    </div>
    <span className="sr-only" aria-live="polite">{g}</span>
  </div>;
}


export default v;
