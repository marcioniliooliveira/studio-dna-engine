/**
 * React Bits Pro — Application UI (empty-state-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let A = (...e)=>e.filter(Boolean).join(" ");

let z = "text-neutral-900 dark:text-neutral-100";

let H = "text-neutral-900/78 dark:text-neutral-100/78";

let V = "text-neutral-900/62 dark:text-neutral-100/62";

let B = [{label:"Resolved",value:"14"},{label:"Assigned on",value:"6"},{label:"Median first reply",value:"9m"}];

let S = [{title:"3 tickets waiting on the customer",body:"Nothing to do until they reply. We will nudge each one after 48 hours."},{title:"2 drafts you never sent",body:"Both are from yesterday afternoon and are still editable."},{title:"Team queue has 5 unassigned",body:"Outside your view, but you have permission to pick them up."}];


export default function empty_state_3__Sorbet__Component(){
  return (
    <div className={A("bg-white dark:bg-neutral-950",z,"flex h-full min-h-[660px] w-full flex-col justify-center-safe overflow-y-auto p-4 sm:p-6")}>
        <div className="mx-auto w-full max-w-[560px] shrink-0">
          <div className="text-center">
            <HugeiconsIcon icon={Icon_90987} size={20} strokeWidth={2} aria-hidden="true" className={A(H,"mx-auto block")} />
            <h2 className={A("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",z,"mt-4")}>Inbox zero, and it is only 3pm</h2>
            <p className={A("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mx-auto mt-2 text-balance")}>
              Nothing is assigned to you and nothing is overdue. New tickets will appear here the moment they are routed.
            </p>
          </div>
          <div className={A("@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1","mt-5")}>
            <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
              {B.map(e=>(
                <div key={e.label} className={A("flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4","items-center text-center")}>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100">{e.value}</p>
                            <p className="text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78">{e.label}</p>
                          </div>
              ))}
            </div>
          </div>
          <p className={A("text-[13px]/[16px] font-semibold tabular-nums",V,"mt-5 px-1")}>If you want something to do</p>
          <div className={A("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mt-2 pt-1")}>
            <ul className={A("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","p-1")}>
              {S.map(e=>(
                <li key={e.title}>
                            <button type="button" className={A("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","rounded-[var(--rb-r-4xl,18px)]","px-3")}>
                              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100">{e.title}</span>
                                <span data-description className="line-clamp-2 text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78">{e.body}</span>
                              </span>
                              <HugeiconsIcon icon={Icon_55299} size={18} strokeWidth={2} aria-hidden="true" className={A(V,"shrink-0")} />
                            </button>
                          </li>
              ))}
            </ul>
          </div>
          <p className={A("text-[14px]/[20px] font-medium",H,"mt-4 flex flex-wrap justify-center gap-x-3")}>
            <span>Last refreshed a moment ago</span>
            <span>Updates arrive automatically</span>
          </p>
        </div>
      </div>
  );
}
