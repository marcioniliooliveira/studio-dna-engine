/**
 * React Bits Pro — Application UI (card-10)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_58553 = [["path",{d:"M15 17.3497C15 17.3497 8.06166 17.8924 7.08461 16.9154C6.10755 15.9383 6.65037 9 6.65037 9M7.5 16.5L17.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  b = "text-[12px]/[16px] font-normal tabular-nums",
  p = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  _ = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  h = [{label:"Pending",value:"$1,204.00"},{label:"Reserved",value:"$380.00"}],
  m = [{id:"stripe",name:"Stripe payout",when:"Today, 09:14",amount:"+$4,820.00",incoming:true},{id:"aws",name:"Amazon Web Services",when:"Yesterday",amount:"−$612.40",incoming:false},{id:"payroll",name:"March payroll",when:"28 February",amount:"−$18,900.00",incoming:false}];

function k(){
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"relative flex h-full min-h-[560px] w-full items-center justify-center overflow-hidden p-8 sm:p-10")}>
        <section aria-labelledby="balance-heading" className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","w-full max-w-[400px]")}>
          <div className={d("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",x,"mt-1")}>
            <div className="p-4">
              <h2 id="balance-heading" className="text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">Available balance</h2>
              <p className={d("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100","mt-1.5")}>$46,318.52</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80">
                  <HugeiconsIcon icon={Icon_1497} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                  <span className="sr-only">Up</span>
                  +3.1%
                  <span className={u}>against last month</span>
                </span>
                <span className={d(b,u)}>Operating</span>
                <span className={d(b,u)}>USD</span>
              </p>
            </div>
            <dl className="grid grid-cols-2">
              {h.map((e,r)=>(
                <div key={e.label} className={d(0===r&&"border-r border-neutral-900/8 dark:border-neutral-100/8","px-4 py-3")}>
                            <dt className={d(b,u,"truncate")}>{e.label}</dt>
                            <dd className={d("text-[14px]/[16px] font-[450]",c,"mt-0.5 truncate tabular-nums")}>{e.value}</dd>
                          </div>
              ))}
            </dl>
            <div className="px-4 py-1">
              <ul className={x}>
                {m.map(e=>(
                  <li key={e.id} className={d("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","py-3")}>
                                <span aria-hidden="true" className={d("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","size-[28px]")}>
                                  <HugeiconsIcon icon={e.incoming?Icon_58553:Icon_1497} size={14} strokeWidth={1.8} />
                                </span>
                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                  <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.name}</span></p>
                                  <p className={d(b,u,"truncate")}>{e.when}</p>
                                </div>
                                <p className={d("text-[14px]/[20px] font-normal",c,"shrink-0 tabular-nums")}>{e.amount}</p>
                              </li>
                ))}
              </ul>
            </div>
            <div className="px-4 py-3">
              <div className="grid grid-cols-2 gap-2">
                <button type="button" className={d(p,_,"w-full")}>
                  <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                  Add money
                </button>
                <button type="button" className={d(p,_,"w-full")}>
                  <HugeiconsIcon icon={Icon_55410} size={16} strokeWidth={1.8} aria-hidden="true" />
                  Transfer
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}


export default k;
