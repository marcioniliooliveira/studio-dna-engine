/**
 * React Bits Pro — Application UI (paywall-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_67358 = [["path",{d:"M12 14.5V17.5M13 14.5C13 15.0523 12.5523 15.5 12 15.5C11.4477 15.5 11 15.0523 11 14.5C11 13.9477 11.4477 13.5 12 13.5C12.5523 13.5 13 13.9477 13 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.5 9V6.5C16.5 4.01472 14.4853 2 12 2C9.51471 2 7.49999 4.01472 7.49999 6.5V9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  s = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/80 dark:text-neutral-100/80",
  d = "text-neutral-900/66 dark:text-neutral-100/66",
  _ = "text-[13px]/[18px] font-normal",
  x = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  u = ["Every issue in the archive, going back to 2019","The weekly teardown, two days before it goes public","Source files and spreadsheets for each analysis"];

function b(){
  return (
    <div className={o("bg-white dark:bg-neutral-950",s,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[680px] shrink-0">
          <p className={o("text-[12px]/[16px] font-normal tabular-nums",d,"flex flex-wrap gap-x-2")}>
            <span>Issue 84</span>
            <span>Infrastructure</span>
          </p>
          <h2 className={o("text-[24px]/[28px] font-[450] tracking-[-0.015em]",s,"mt-1.5")}>What a database migration actually costs</h2>
          <p className={o(_,d,"mt-1 flex flex-wrap gap-x-2")}>
            <span>Marcus Bell</span>
            <span>14 min read</span>
          </p>
          <div className="relative mt-4 max-h-[92px] overflow-hidden sm:mt-5 sm:max-h-none">
            <div aria-hidden className={o("text-[14px]/[20px] font-normal",c,"space-y-3")}>
              <p>
                Northwind moved 11 terabytes between two managed Postgres clusters last spring. The plan called for four hours of degraded writes on a Saturday night. What the team got instead was nine days of partial availability, an unplanned index rebuild, and a bill roughly three times the estimate.
              </p>
              <p>
                None of that came from the migration itself. The copy finished more or less on schedule. The cost showed up in everything the copy touched: connection pools sized for the old topology, a backfill job competing with production reads, and a rollback path that quietly stopped working once the first schema change landed.
              </p>
              <p>
                This teardown walks through the three decisions that turned a maintenance window into a quarter of remediation work, using the team's own incident timeline and the invoices either side of the cutover.
              </p>
            </div>
            <div aria-hidden className={o("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-40")} />
          </div>
          <div className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","-mt-6 p-4 sm:p-6")}>
            <HugeiconsIcon icon={Icon_67358} size={16} strokeWidth={1.8} aria-hidden="true" className={o(c,"block")} />
            <h3 className={o("text-[16px]/[20px] font-[450] tracking-[-0.015em]",s,"mt-3")}>Keep reading with a membership</h3>
            <p className={o("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>
              The rest of this teardown is for members. Cancel whenever, and keep everything you have downloaded.
            </p>
            <ul className="mt-3 space-y-2 sm:mt-4">
              {u.map(e=>(
                <li key={e} className={o(_,c,"flex gap-2")}>
                            <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={1.8} aria-hidden="true" className={o(d,"mt-0.5 shrink-0")} />
                            {e}
                          </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:items-center">
              <button type="button" className={o("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",x)}>Become a member: $9/mo</button>
              <button type="button" className={o("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",x)}>I already have an account</button>
            </div>
          </div>
        </div>
      </div>
  );
}


export default b;
