/**
 * React Bits Pro — Application UI (empty-state-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let s = (...e)=>e.filter(Boolean).join(" "),
  i = "text-neutral-900 dark:text-neutral-100",
  d = "text-neutral-900/80 dark:text-neutral-100/80",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = [{label:"Resolved",value:"14"},{label:"Assigned on",value:"6"},{label:"Median first reply",value:"9m"}],
  x = [{title:"3 tickets waiting on the customer",body:"Nothing to do until they reply. We will nudge each one after 48 hours."},{title:"2 drafts you never sent",body:"Both are from yesterday afternoon and are still editable."},{title:"Team queue has 5 unassigned",body:"Outside your view, but you have permission to pick them up."}];

function b(){
  return (
    <div className={s("bg-white dark:bg-neutral-950",i,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-4 sm:p-6")}>
        <div className="mx-auto w-full max-w-[560px] shrink-0">
          <div className="text-center">
            <HugeiconsIcon icon={Icon_90987} size={20} strokeWidth={1.8} aria-hidden="true" className={s(d,"mx-auto block")} />
            <h2 className={s("text-[20px]/[24px] font-[450] tracking-[-0.015em]",i,"mt-4")}>Inbox zero, and it is only 3pm</h2>
            <p className={s("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mx-auto mt-2 text-balance")}>
              Nothing is assigned to you and nothing is overdue. New tickets will appear here the moment they are routed.
            </p>
          </div>
          <div className={s("@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900","mt-5")}>
            <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
              {u.map(e=>(
                <div key={e.label} className={s("flex min-w-0 flex-col gap-2 px-4 py-3","items-center text-center")}>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.value}</p>
                            <p className="text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">{e.label}</p>
                          </div>
              ))}
            </div>
          </div>
          <p className={s("text-[12px]/[16px] font-normal tabular-nums",c,"mt-5 px-1")}>If you want something to do</p>
          <div className={s("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mt-2 pt-1")}>
            <ul className={s("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","p-1")}>
              {x.map(e=>(
                <li key={e.title}>
                            <button type="button" className={s("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","rounded-[var(--rb-r-sm,6px)]","px-3")}>
                              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{e.title}</span>
                                <span data-description className="line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">{e.body}</span>
                              </span>
                              <HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" className={s(c,"shrink-0")} />
                            </button>
                          </li>
              ))}
            </ul>
          </div>
          <p className={s("text-[13px]/[18px] font-normal",d,"mt-4 flex flex-wrap justify-center gap-x-3")}>
            <span>Last refreshed a moment ago</span>
            <span>Updates arrive automatically</span>
          </p>
        </div>
      </div>
  );
}


export default b;
