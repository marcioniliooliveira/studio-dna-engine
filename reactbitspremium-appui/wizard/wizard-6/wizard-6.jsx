/**
 * React Bits Pro — Application UI (wizard-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  b = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  x = o("text-[13px]/[18px] font-normal",c),
  h = o("text-[12px]/[16px] font-normal tabular-nums",c),
  p = [{id:"snapshot",title:"Snapshot source database",meta:["4.2 GB","38s"],state:"done"},{id:"schema",title:"Rebuild schema and indexes",meta:["126 tables","1m 04s"],state:"done"},{id:"rows",title:"Copy rows",meta:["8.4M of 12.1M rows"],state:"running"},{id:"attachments",title:"Transfer attachments",meta:["Queued","61,208 files"],state:"pending"},{id:"search",title:"Rebuild search index",meta:["Two entries need review"],state:"warning"},{id:"cutover",title:"Switch traffic to the new cluster",meta:["Waiting for approval"],state:"pending"}];

function _(){
  let[e,r]=useState(64);
  return useEffect(()=>{
    let e=setInterval(()=>{
      r(e=>e>=92?64:e+2)
    },1400);
    return ()=>clearInterval(e);
  }, []),<div className={o("bg-white dark:bg-neutral-950",d,"relative h-full min-h-[640px] w-full overflow-y-auto p-6 sm:p-8")}>
    <section className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","mx-auto w-full max-w-2xl")}>
      <div className={o("border-b border-neutral-900/8 dark:border-neutral-100/8","flex shrink-0 items-baseline justify-between gap-3 px-6 py-4")}>
        <div className="min-w-0">
          <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Migrating workspace</h2>
          <p className={o(x,"mt-1")}>Step 3 of 4. You can leave this running and come back.</p>
        </div>
        <p className={o(h,"shrink-0")}>~6 min left</p>
      </div>
      <div className="min-h-0 flex-1 px-6 py-5">
        <div className="flex items-center gap-3">
          <div role="progressbar" aria-valuenow={e} aria-valuemin={0} aria-valuemax={100} aria-label="Migration progress" className={o("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","min-w-0 flex-1")}>
            <div style={{width:`${e}%`}} className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" />
          </div>
          <p className={o(h,"shrink-0")}>
            {e}
            %
          </p>
        </div>
        <ul className={o("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-5")}>
          {p.map(e=>(
            <li key={e.id} className="flex items-center gap-3 py-3">
                        <span aria-hidden="true" className={o("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums","done"===e.state?"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/80 dark:text-neutral-100/80 dark:border-neutral-100/14":"running"===e.state?"border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100":"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14")}>
                          {"done"===e.state&&<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} />}
                          {"running"===e.state&&<span className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />}
                          {"warning"===e.state&&<HugeiconsIcon icon={Icon_36474} size={12} strokeWidth={1.8} className="text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]" />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={o("text-[14px]/[16px] font-[450]","pending"===e.state?c:d,"truncate")}>{e.title}</p>
                          <p className={o(h,"mt-0.5 flex gap-x-3 truncate")}>{e.meta.map(e=><span key={e}>{e}</span>)}</p>
                        </div>
                        {"warning"===e.state&&<button type="button" className={o(u,b)}>Review</button>}
                      </li>
          ))}
        </ul>
        <p className={o(x,"mt-4")}>
          The source workspace stays read-only until cutover. Nothing is deleted, so a failed step can be retried without starting over.
        </p>
      </div>
      <div className={o("border-t border-neutral-900/8 dark:border-neutral-100/8","flex shrink-0 items-center justify-between gap-3 px-6 py-4")}>
        <button type="button" className={o(u,b)}>Cancel migration</button>
        <button type="button" className={o(u,b)}>Run in background</button>
      </div>
    </section>
  </div>;
}


export default _;
