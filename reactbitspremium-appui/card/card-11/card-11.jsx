/**
 * React Bits Pro — Application UI (card-11)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let i = (...e)=>e.filter(Boolean).join(" "),
  s = "text-neutral-900 dark:text-neutral-100",
  o = "text-neutral-900/80 dark:text-neutral-100/80",
  d = "text-neutral-900/66 dark:text-neutral-100/66",
  c = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  u = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  x = "text-[14px]/[20px] font-normal",
  b = "text-[12px]/[16px] font-normal tabular-nums",
  p = [{id:"seats",label:"Team seats",detail:"24 \xd7 $18.00",amount:"$432.00"},{id:"storage",label:"Additional storage",detail:"250 GB \xd7 $0.40",amount:"$100.00"},{id:"support",label:"Priority support",detail:"1 month",amount:"$150.00"}],
  _ = [{id:"subtotal",label:"Subtotal",value:"$682.00"},{id:"tax",label:"VAT (23%)",value:"$156.86"}];

function h(){
  return (
    <div className={i("bg-white dark:bg-neutral-950",s,"relative flex h-full min-h-[640px] w-full items-center justify-center overflow-hidden p-8 sm:p-10")}>
        <article className={i("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","w-full max-w-[400px]")}>
          <div className={i("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",c,"mt-1")}>
            <div className="p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className={i(u,s,"min-w-0 truncate tabular-nums")}>Invoice INV-2024-0318</h2>
                <span className={i("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-neutral-900/80 dark:text-neutral-100/80","shrink-0")}>Paid</span>
              </div>
              <p className={i(b,d,"mt-1 flex min-w-0 gap-2")}>
                <span className="truncate">Meridian Fund</span>
                <span className="shrink-0">Issued 18 March</span>
                <span className="shrink-0">Due 1 April</span>
              </p>
            </div>
            <div className="px-4 py-1">
              <ul className={c}>
                {p.map(e=>(
                  <li key={e.id} className={i("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","justify-between py-2.5")}>
                                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                  <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.label}</span></span>
                                  <span data-description className={i(b,d,"truncate tabular-nums")}>{e.detail}</span>
                                </span>
                                <span className={i(x,o,"shrink-0 tabular-nums")}>{e.amount}</span>
                              </li>
                ))}
              </ul>
            </div>
            <dl className="space-y-1.5 px-4 py-3">
              {_.map(e=>(
                <div key={e.id} className="flex items-center justify-between gap-3">
                            <dt className={i(x,o)}>{e.label}</dt>
                            <dd className={i(x,o,"tabular-nums")}>{e.value}</dd>
                          </div>
              ))}
              <div className="flex items-baseline justify-between gap-3 pt-1.5">
                <dt className={i("text-[14px]/[16px] font-[450]",s)}>Total due</dt>
                <dd className={i(u,s,"tabular-nums")}>$838.86</dd>
              </div>
            </dl>
            <div className="px-4 py-3">
              <button type="button" className={i("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","w-full")}>
                <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" />
                Download PDF
              </button>
            </div>
          </div>
        </article>
      </div>
  );
}


export default h;
