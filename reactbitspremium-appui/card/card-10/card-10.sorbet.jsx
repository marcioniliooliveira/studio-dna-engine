/**
 * React Bits Pro — Application UI (card-10 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_58553 = [["path",{d:"M15 17.3497C15 17.3497 8.06166 17.8924 7.08461 16.9154C6.10755 15.9383 6.65037 9 6.65037 9M7.5 16.5L17.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let eB = (...e)=>e.filter(Boolean).join(" ");

let eD = "text-neutral-900 dark:text-neutral-100";

let eT = "text-neutral-900/62 dark:text-neutral-100/62";

let eM = "divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7";

let eR = "text-[13px]/[16px] font-semibold tabular-nums";

let eW = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let e$ = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let eP = [{label:"Pending",value:"$1,204.00"},{label:"Reserved",value:"$380.00"}];

let eF = [{id:"stripe",name:"Stripe payout",when:"Today, 09:14",amount:"+$4,820.00",incoming:true},{id:"aws",name:"Amazon Web Services",when:"Yesterday",amount:"−$612.40",incoming:false},{id:"payroll",name:"March payroll",when:"28 February",amount:"−$18,900.00",incoming:false}];


export default function card_10__Sorbet__Component(){
  return (
    <div className={eB("bg-white dark:bg-neutral-950",eD,"relative flex h-full min-h-[560px] w-full items-center justify-center overflow-hidden p-8 sm:p-10")}>
        <section aria-labelledby="balance-heading" className={eB("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","w-full max-w-[400px]")}>
          <div className={eB("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0",eM,"mt-1")}>
            <div className="p-4">
              <h2 id="balance-heading" className="text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78">Available balance</h2>
              <p className={eB("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100","mt-1.5")}>$46,318.52</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78">
                  <HugeiconsIcon icon={Icon_1497} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                  <span className="sr-only">Up</span>
                  +3.1%
                  <span className={eT}>against last month</span>
                </span>
                <span className={eB(eR,eT)}>Operating</span>
                <span className={eB(eR,eT)}>USD</span>
              </p>
            </div>
            <dl className="grid grid-cols-2">
              {eP.map((e,a)=>(
                <div key={e.label} className={eB(0===a&&"border-r border-transparent","px-4 py-3")}>
                            <dt className={eB(eR,eT,"truncate")}>{e.label}</dt>
                            <dd className={eB("text-[15px]/[20px] font-bold",eD,"mt-0.5 truncate tabular-nums")}>{e.value}</dd>
                          </div>
              ))}
            </dl>
            <div className="px-4 py-1">
              <ul className={eM}>
                {eF.map(e=>(
                  <li key={e.id} className={eB("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","py-3")}>
                                <span aria-hidden="true" className={eB("flex size-9 shrink-0 items-center justify-center text-neutral-900/78 dark:text-neutral-100/78","size-[28px]")}>
                                  <HugeiconsIcon icon={e.incoming?Icon_58553:Icon_1497} size={16} strokeWidth={2} />
                                </span>
                                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                  <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.name}</span></p>
                                  <p className={eB(eR,eT,"truncate")}>{e.when}</p>
                                </div>
                                <p className={eB("text-[15px]/[22px] font-medium",eD,"shrink-0 tabular-nums")}>{e.amount}</p>
                              </li>
                ))}
              </ul>
            </div>
            <div className="px-4 py-3">
              <div className="grid grid-cols-2 gap-2">
                <button type="button" className={eB(eW,e$,"w-full")}>
                  <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
                  Add money
                </button>
                <button type="button" className={eB(eW,e$,"w-full")}>
                  <HugeiconsIcon icon={Icon_55410} size={18} strokeWidth={2} aria-hidden="true" />
                  Transfer
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
