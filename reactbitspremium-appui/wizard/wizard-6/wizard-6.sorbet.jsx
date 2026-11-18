/**
 * React Bits Pro — Application UI (wizard-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let e$ = (...e)=>e.filter(Boolean).join(" ");

let eq = "text-neutral-900 dark:text-neutral-100";

let eU = "text-neutral-900/62 dark:text-neutral-100/62";

let eZ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let eO = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let eY = e$("text-[14px]/[20px] font-medium",eU);

let eG = e$("text-[13px]/[16px] font-semibold tabular-nums",eU);

let eK = [{id:"snapshot",title:"Snapshot source database",meta:["4.2 GB","38s"],state:"done"},{id:"schema",title:"Rebuild schema and indexes",meta:["126 tables","1m 04s"],state:"done"},{id:"rows",title:"Copy rows",meta:["8.4M of 12.1M rows"],state:"running"},{id:"attachments",title:"Transfer attachments",meta:["Queued","61,208 files"],state:"pending"},{id:"search",title:"Rebuild search index",meta:["Two entries need review"],state:"warning"},{id:"cutover",title:"Switch traffic to the new cluster",meta:["Waiting for approval"],state:"pending"}];


export default function wizard_6__Sorbet__Component(){
  let[e,r]=useState(64);
  return useEffect(()=>{
    let e=setInterval(()=>{
      r(e=>e>=92?64:e+2)
    },1400);
    return ()=>clearInterval(e);
  }, []),<div className={e$("bg-white dark:bg-neutral-950",eq,"relative h-full min-h-[720px] w-full overflow-y-auto p-6 sm:p-8")}>
    <section className={e$("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","mx-auto w-full max-w-2xl")}>
      <div className={e$("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex shrink-0 items-baseline justify-between gap-3 px-6 py-4")}>
        <div className="min-w-0">
          <h2 className="text-[17px]/[22px] font-extrabold">Migrating workspace</h2>
          <p className={e$(eY,"mt-1")}>Step 3 of 4. You can leave this running and come back.</p>
        </div>
        <p className={e$(eG,"shrink-0")}>~6 min left</p>
      </div>
      <div className="min-h-0 flex-1 px-6 py-5">
        <div className="flex items-center gap-3">
          <div role="progressbar" aria-valuenow={e} aria-valuemin={0} aria-valuemax={100} aria-label="Migration progress" className={e$("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","min-w-0 flex-1")}>
            <div style={{width:`${e}%`}} className="block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" />
          </div>
          <p className={e$(eG,"shrink-0")}>
            {e}
            %
          </p>
        </div>
        <ul className={e$("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-5")}>
          {eK.map(e=>(
            <li key={e.id} className="flex items-center gap-3 py-3">
                        <span aria-hidden="true" className={e$("grid size-7 shrink-0 place-items-center rounded-full border-2 text-[13px]/[16px] font-extrabold tabular-nums","done"===e.state?"border-transparent bg-[var(--rb-accent,oklch(84%_0.15_165))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-none":"running"===e.state?"border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] text-neutral-900 dark:text-neutral-100 dark:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"border-transparent bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900/62 dark:text-neutral-100/62 dark:bg-neutral-100/10")}>
                          {"done"===e.state&&<HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} />}
                          {"running"===e.state&&<span className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />}
                          {"warning"===e.state&&<HugeiconsIcon icon={Icon_36474} size={14} strokeWidth={2} className="text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]" />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={e$("text-[15px]/[20px] font-bold","pending"===e.state?eU:eq,"truncate")}>{e.title}</p>
                          <p className={e$(eG,"mt-0.5 flex gap-x-3 truncate")}>{e.meta.map(e=><span key={e}>{e}</span>)}</p>
                        </div>
                        {"warning"===e.state&&<button type="button" className={e$(eZ,eO)}>Review</button>}
                      </li>
          ))}
        </ul>
        <p className={e$(eY,"mt-4")}>
          The source workspace stays read-only until cutover. Nothing is deleted, so a failed step can be retried without starting over.
        </p>
      </div>
      <div className={e$("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex shrink-0 items-center justify-between gap-3 px-6 py-4")}>
        <button type="button" className={e$(eZ,eO)}>Cancel migration</button>
        <button type="button" className={e$(eZ,eO)}>Run in background</button>
      </div>
    </section>
  </div>;
}
