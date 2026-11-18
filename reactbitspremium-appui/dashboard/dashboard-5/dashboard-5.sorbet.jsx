/**
 * React Bits Pro — Application UI (dashboard-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let ej = (...e)=>e.filter(Boolean).join(" ");

let eN = "text-neutral-900 dark:text-neutral-100";

let ey = "text-neutral-900/62 dark:text-neutral-100/62";

let eA = "text-[14px]/[20px] font-medium";

let eM = "text-[13px]/[16px] font-semibold tabular-nums";

let eS = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let ez = "min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100";

let eR = "text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78";

let e$ = "stroke-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:stroke-[var(--rb-accent,oklch(81%_0.16_163))]";

let eD = "stroke-neutral-900/40 dark:stroke-neutral-100/45";

let eW = [{label:"API requests",used:"1.24M",limit:"2M",pct:62},{label:"Seats",used:"18",limit:"20",pct:90},{label:"Storage",used:"41.2 GB",limit:"50 GB",pct:82},{label:"Build minutes",used:"4,820",limit:"5,000",pct:96},{label:"Bandwidth",used:"320 GB",limit:"1 TB",pct:31}];

let eL = [9e3,6e3,3e3,0];

let eC = [[1,0],[4,900],[7,1750],[10,2600],[13,3450],[16,4300],[18,4820]];

let eI = [[18,4820],[22,5900],[26,6980],[31,8330]];

let eB = ["Mar 1","Mar 11","Mar 21","Mar 31"];

function eE(e){
  return e.map(([e,a],r)=>`${0===r?"M":"L"}${((e-1)/30*100).toFixed(2)} ${(100-a/9e3*100).toFixed(2)}`).join(" ");
}


export default function dashboard_5__Sorbet__Component(){
  return (
    <div className={ej("bg-white dark:bg-neutral-950",eN,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <header className={ej("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
          <h1 className={ej("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",eN,"truncate")}>Usage</h1>
          <span className={ej(eA,ey,"shrink-0")}>Mar 1 – Mar 31</span>
        </header>
        <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-6">
          <div className={ej(eS,"p-4 sm:p-5")}>
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className={ez}>Team plan</p>
                <p className={ej(eR,"mt-0.5 flex flex-wrap gap-x-2")}>
                  <span>$99 / month</span>
                  <span>Renews Mar 31</span>
                </p>
              </div>
              <button type="button" className={ej("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
                Upgrade plan
                <HugeiconsIcon icon={Icon_1497} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className={ej(eS,"p-4 sm:p-5")}>
            <h2 className={ez}>Included this month</h2>
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {eW.map(e=>{
                var a;
                return (
                  <li key={e.label}>
                                <div className={ej(eA,"flex items-baseline justify-between gap-3")}>
                                  <span className="text-neutral-900/78 dark:text-neutral-100/78">{e.label}</span>
                                  <span className={ej(ey,"tabular-nums")}>
                                    <span className={eN}>{e.used}</span>
                                    {" / "}
                                    {e.limit}
                                  </span>
                                </div>
                                <div className={ej("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","mt-1.5 h-1.5")}>
                                  <div className={ej((a=e.pct)>=95?"bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]":a>=90?"bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]":"block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]","block h-full")} style={{width:`${e.pct}%`}} />
                                </div>
                              </li>
                );
              })}
            </ul>
          </div>
          <div className={ej(eS,"min-h-0 flex-1 p-4 sm:p-5")}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className={ez}>Build minutes burn-down</h2>
                <p className={ej(eR,"mt-1 flex items-start gap-1.5")}>
                  <HugeiconsIcon icon={Icon_36474} size={18} strokeWidth={2} aria-hidden="true" className={ej("text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","mt-px shrink-0")} />
                  <span>Projected to exceed the 5,000 minute allowance on Mar 19</span>
                </p>
              </div>
              <div className={ej(eM,ey,"hidden shrink-0 items-center gap-4 pt-1 sm:flex")}>
                <span className="inline-flex items-center gap-1.5">
                  <svg aria-hidden="true" viewBox="0 0 16 2" className="h-0.5 w-4 shrink-0 overflow-visible"><line x1="0" x2="16" y1="1" y2="1" strokeWidth={2} className={e$} /></svg>
                  Used
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg aria-hidden="true" viewBox="0 0 16 2" className="h-0.5 w-4 shrink-0 overflow-visible">
                    <line x1="0" x2="16" y1="1" y2="1" strokeWidth={2} strokeDasharray="6 4" className={e$} />
                  </svg>
                  Projected
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg aria-hidden="true" viewBox="0 0 16 2" className="h-0.5 w-4 shrink-0 overflow-visible">
                    <line x1="0" x2="16" y1="1" y2="1" strokeWidth={1} strokeDasharray="3 3" className={eD} />
                  </svg>
                  Allowance
                </span>
              </div>
            </div>
            <div className="mt-4 flex min-h-0 flex-1 gap-3">
              <div className={ej(eM,ey,"-my-2 flex w-10 shrink-0 flex-col justify-between text-right")}>{eL.map(e=><span key={e}>{0===e?"0":`${e/1e3}k`}</span>)}</div>
              <div className="relative min-h-0 flex-1">
                <svg aria-hidden preserveAspectRatio="none" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                  {eL.map(e=>{
                    let a=100-e/9e3*100;
                    return <line key={e} x1="0" x2="100" y1={a} y2={a} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" className={0===e?"stroke-neutral-900/12 dark:stroke-neutral-100/14":"stroke-neutral-900/6 dark:stroke-neutral-100/8"} strokeWidth={1} />;
                  })}
                  <line x1="0" x2="100" y1={44.44444444444444} y2={44.44444444444444} strokeDasharray="3 3" vectorEffect="non-scaling-stroke" className={eD} strokeWidth={1} />
                  <path d={eE(eI)} fill="none" strokeDasharray="6 4" vectorEffect="non-scaling-stroke" className={e$} strokeWidth={2} strokeLinecap="round" />
                  <path d={eE(eC)} fill="none" vectorEffect="non-scaling-stroke" className={e$} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex gap-3">
              <div className="w-10 shrink-0" aria-hidden />
              <div className={ej(eM,ey,"flex min-w-0 flex-1 justify-between")}>{eB.map(e=><span key={e}>{e}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
  );
}
