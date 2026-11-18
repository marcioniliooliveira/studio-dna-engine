/**
 * React Bits Pro — Application UI (paywall-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_95735 = [["path",{d:"M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 16H11.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 16L18 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 9H22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];

let i = (...e)=>e.filter(Boolean).join(" "),
  o = "bg-neutral-900/5 dark:bg-neutral-100/5",
  s = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  d = "rounded-[var(--rb-r-sm,6px)]",
  _ = "text-[13px]/[18px] font-normal",
  x = "relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",
  u = [["Workspaces","4 kept, read-only"],["Saved views","26 kept"],["Scheduled exports","Paused"],["Team members","7 signed out"]];

function b(){
  return (
    <div className={i("bg-white dark:bg-neutral-950",s,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[560px] shrink-0">
          <div className={i("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","p-5 sm:p-6")}>
            <p className={i("text-[12px]/[16px] font-normal tabular-nums",c)}>Trial ended</p>
            <h2 className={i("text-[20px]/[24px] font-[450] tracking-[-0.015em]",s,"mt-1.5")}>Your 14 days with Pro are up</h2>
            <p className={i("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1.5")}>
              Northwind Analytics is in read-only mode. Reactivate and everything picks up exactly where it stopped, including the exports that were mid-schedule.
            </p>
            <div className={i(o,d,"divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-4")}>
              {u.map(([e,r])=>(
                <div key={e} className={i(x,"justify-between px-3")}>
                            <p className={i(_,"text-neutral-900/80 dark:text-neutral-100/80","truncate")}>{e}</p>
                            <p className={i(_,s,"shrink-0")}>{r}</p>
                          </div>
              ))}
            </div>
            <div className={i(o,d,"mt-4")}>
              <div className={i(x,"px-3")}>
                <HugeiconsIcon icon={Icon_95735} size={16} strokeWidth={1.8} aria-hidden="true" className={i(c,"shrink-0")} />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">Card ending 4471</span></p>
                  <p data-description className="line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">
                    <span className="flex flex-wrap gap-x-2">
                      <span>Expires 08/28</span>
                      <span>Billed to Northwind Ltd</span>
                    </span>
                  </p>
                </div>
                <button type="button" className={i("inline-flex min-h-6 items-center gap-1 rounded-[var(--rb-r-sm,6px)] text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 decoration-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","shrink-0")}>Change</button>
              </div>
            </div>
            <button type="button" className={i("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-4 w-full")}>Reactivate Pro: $168 / yr</button>
            <p className={i(_,c,"mt-2.5 text-center")}>Renews yearly. Cancel any time before the renewal date.</p>
          </div>
        </div>
      </div>
  );
}


export default b;
