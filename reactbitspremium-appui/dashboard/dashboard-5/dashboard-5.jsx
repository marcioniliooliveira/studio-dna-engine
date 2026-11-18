/**
 * React Bits Pro — Application UI (dashboard-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let i = (...e)=>e.filter(Boolean).join(" "),
  o = "text-neutral-900 dark:text-neutral-100",
  d = "text-neutral-900/66 dark:text-neutral-100/66",
  c = "text-[13px]/[18px] font-normal",
  u = "text-[12px]/[16px] font-normal tabular-nums",
  x = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  h = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  p = "text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  m = "stroke-neutral-900 dark:stroke-neutral-100",
  b = "stroke-neutral-900/66 dark:stroke-neutral-100/66",
  f = [{label:"API requests",used:"1.24M",limit:"2M",pct:62},{label:"Seats",used:"18",limit:"20",pct:90},{label:"Storage",used:"41.2 GB",limit:"50 GB",pct:82},{label:"Build minutes",used:"4,820",limit:"5,000",pct:96},{label:"Bandwidth",used:"320 GB",limit:"1 TB",pct:31}],
  v = [9e3,6e3,3e3,0],
  k = [[1,0],[4,900],[7,1750],[10,2600],[13,3450],[16,4300],[18,4820]],
  g = [[18,4820],[22,5900],[26,6980],[31,8330]],
  _ = ["Mar 1","Mar 11","Mar 21","Mar 31"];

function j(e){
  return e.map(([e,a],t)=>`${0===t?"M":"L"}${((e-1)/30*100).toFixed(2)} ${(100-a/9e3*100).toFixed(2)}`).join(" ");
}

function w(){
  return (
    <div className={i("bg-white dark:bg-neutral-950",o,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <header className={i("border-b border-neutral-900/8 dark:border-neutral-100/8","flex h-14 shrink-0 items-center justify-between gap-3 px-4 sm:px-6")}>
          <h1 className={i("text-[20px]/[24px] font-[450] tracking-[-0.015em]",o,"truncate")}>Usage</h1>
          <span className={i(c,d,"shrink-0")}>Mar 1 – Mar 31</span>
        </header>
        <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-6">
          <div className={i(x,"p-4 sm:p-5")}>
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className={h}>Team plan</p>
                <p className={i(p,"mt-0.5 flex flex-wrap gap-x-2")}>
                  <span>$99 / month</span>
                  <span>Renews Mar 31</span>
                </p>
              </div>
              <button type="button" className={i("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                Upgrade plan
                <HugeiconsIcon icon={Icon_1497} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className={i(x,"p-4 sm:p-5")}>
            <h2 className={h}>Included this month</h2>
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {f.map(e=>{
                var a;
                return (
                  <li key={e.label}>
                                <div className={i(c,"flex items-baseline justify-between gap-3")}>
                                  <span className="text-neutral-900/80 dark:text-neutral-100/80">{e.label}</span>
                                  <span className={i(d,"tabular-nums")}>
                                    <span className={o}>{e.used}</span>
                                    {" / "}
                                    {e.limit}
                                  </span>
                                </div>
                                <div className={i("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-1.5 h-1.5")}>
                                  <div className={i((a=e.pct)>=95?"bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]":a>=90?"bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]":"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100","block h-full")} style={{width:`${e.pct}%`}} />
                                </div>
                              </li>
                );
              })}
            </ul>
          </div>
          <div className={i(x,"min-h-0 flex-1 p-4 sm:p-5")}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className={h}>Build minutes burn-down</h2>
                <p className={i(p,"mt-1 flex items-start gap-1.5")}>
                  <HugeiconsIcon icon={Icon_36474} size={16} strokeWidth={1.8} aria-hidden="true" className={i("text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","mt-px shrink-0")} />
                  <span>Projected to exceed the 5,000 minute allowance on Mar 19</span>
                </p>
              </div>
              <div className={i(u,d,"hidden shrink-0 items-center gap-4 pt-1 sm:flex")}>
                <span className="inline-flex items-center gap-1.5">
                  <svg aria-hidden="true" viewBox="0 0 16 2" className="h-0.5 w-4 shrink-0 overflow-visible"><line x1="0" x2="16" y1="1" y2="1" strokeWidth={2} className={m} /></svg>
                  Used
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg aria-hidden="true" viewBox="0 0 16 2" className="h-0.5 w-4 shrink-0 overflow-visible">
                    <line x1="0" x2="16" y1="1" y2="1" strokeWidth={2} strokeDasharray="6 4" className={m} />
                  </svg>
                  Projected
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg aria-hidden="true" viewBox="0 0 16 2" className="h-0.5 w-4 shrink-0 overflow-visible">
                    <line x1="0" x2="16" y1="1" y2="1" strokeWidth={1} strokeDasharray="3 3" className={b} />
                  </svg>
                  Allowance
                </span>
              </div>
            </div>
            <div className="mt-4 flex min-h-0 flex-1 gap-3">
              <div className={i(u,d,"-my-2 flex w-10 shrink-0 flex-col justify-between text-right")}>{v.map(e=><span key={e}>{0===e?"0":`${e/1e3}k`}</span>)}</div>
              <div className="relative min-h-0 flex-1">
                <svg aria-hidden preserveAspectRatio="none" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                  {v.map(e=>{
                    let a=100-e/9e3*100;
                    return <line key={e} x1="0" x2="100" y1={a} y2={a} vectorEffect="non-scaling-stroke" shapeRendering="crispEdges" className={0===e?"stroke-neutral-900/8 dark:stroke-neutral-100/8":"stroke-neutral-900/5 dark:stroke-neutral-100/5"} strokeWidth={1} />;
                  })}
                  <line x1="0" x2="100" y1={44.44444444444444} y2={44.44444444444444} strokeDasharray="3 3" vectorEffect="non-scaling-stroke" className={b} strokeWidth={1} />
                  <path d={j(g)} fill="none" strokeDasharray="6 4" vectorEffect="non-scaling-stroke" className={m} strokeWidth={2} strokeLinecap="round" />
                  <path d={j(k)} fill="none" vectorEffect="non-scaling-stroke" className={m} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="mt-2 flex gap-3">
              <div className="w-10 shrink-0" aria-hidden />
              <div className={i(u,d,"flex min-w-0 flex-1 justify-between")}>{_.map(e=><span key={e}>{e}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default w;
