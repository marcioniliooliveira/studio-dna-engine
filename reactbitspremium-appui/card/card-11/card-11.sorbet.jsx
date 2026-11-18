/**
 * React Bits Pro — Application UI (card-11 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let eI = (...e)=>e.filter(Boolean).join(" ");

let eO = "text-neutral-900 dark:text-neutral-100";

let eU = "text-neutral-900/78 dark:text-neutral-100/78";

let eV = "text-neutral-900/62 dark:text-neutral-100/62";

let eH = "divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7";

let eE = "text-[17px]/[22px] font-extrabold";

let eK = "text-[15px]/[22px] font-medium";

let eL = "text-[13px]/[16px] font-semibold tabular-nums";

let eq = [{id:"seats",label:"Team seats",detail:"24 \xd7 $18.00",amount:"$432.00"},{id:"storage",label:"Additional storage",detail:"250 GB \xd7 $0.40",amount:"$100.00"},{id:"support",label:"Priority support",detail:"1 month",amount:"$150.00"}];

let eY = [{id:"subtotal",label:"Subtotal",value:"$682.00"},{id:"tax",label:"VAT (23%)",value:"$156.86"}];


export default function card_11__Sorbet__Component(){
  return (
    <div className={eI("bg-white dark:bg-neutral-950",eO,"relative flex h-full min-h-[640px] w-full items-center justify-center overflow-hidden p-8 sm:p-10")}>
        <article className={eI("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","w-full max-w-[400px]")}>
          <div className={eI("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0",eH,"mt-1")}>
            <div className="p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className={eI(eE,eO,"min-w-0 truncate tabular-nums")}>Invoice INV-2024-0318</h2>
                <span className={eI("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums","text-neutral-900/78 dark:text-neutral-100/78","shrink-0")}>Paid</span>
              </div>
              <p className={eI(eL,eV,"mt-1 flex min-w-0 gap-2")}>
                <span className="truncate">Meridian Fund</span>
                <span className="shrink-0">Issued 18 March</span>
                <span className="shrink-0">Due 1 April</span>
              </p>
            </div>
            <div className="px-4 py-1">
              <ul className={eH}>
                {eq.map(e=>(
                  <li key={e.id} className={eI("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","justify-between py-2.5")}>
                                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                  <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.label}</span></span>
                                  <span data-description className={eI(eL,eV,"truncate tabular-nums")}>{e.detail}</span>
                                </span>
                                <span className={eI(eK,eU,"shrink-0 tabular-nums")}>{e.amount}</span>
                              </li>
                ))}
              </ul>
            </div>
            <dl className="space-y-1.5 px-4 py-3">
              {eY.map(e=>(
                <div key={e.id} className="flex items-center justify-between gap-3">
                            <dt className={eI(eK,eU)}>{e.label}</dt>
                            <dd className={eI(eK,eU,"tabular-nums")}>{e.value}</dd>
                          </div>
              ))}
              <div className="flex items-baseline justify-between gap-3 pt-1.5">
                <dt className={eI("text-[15px]/[20px] font-bold",eO)}>Total due</dt>
                <dd className={eI(eE,eO,"tabular-nums")}>$838.86</dd>
              </div>
            </dl>
            <div className="px-4 py-3">
              <button type="button" className={eI("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","w-full")}>
                <HugeiconsIcon icon={Icon_92752} size={18} strokeWidth={2} aria-hidden="true" />
                Download PDF
              </button>
            </div>
          </div>
        </article>
      </div>
  );
}
