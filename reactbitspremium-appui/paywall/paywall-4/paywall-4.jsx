/**
 * React Bits Pro — Application UI (paywall-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let i = (...e)=>e.filter(Boolean).join(" "),
  o = "text-neutral-900 dark:text-neutral-100",
  s = "text-neutral-900/66 dark:text-neutral-100/66",
  c = "text-[13px]/[18px] font-normal",
  d = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  _ = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  x = [{label:"API requests",used:5e4,limit:5e4,unit:""},{label:"Rows processed",used:184e4,limit:2e6,unit:""},{label:"Connected sources",used:3,limit:3,unit:""}],
  u = e=>e>=1e6?`${(e/1e6).toFixed(e>=1e7?0:2)}M`:e>=1e3?`${(e/1e3).toFixed(0)}k`:`${e}`;

function b(){
  return (
    <div className={i("bg-white dark:bg-neutral-950",o,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[620px] shrink-0">
          <div className="flex items-start gap-3">
            <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className={i("text-neutral-900/80 dark:text-neutral-100/80","mt-0.5 shrink-0")} />
            <div className="min-w-0">
              <h2 className={i("text-[16px]/[20px] font-[450] tracking-[-0.015em]",o)}>You have hit the Starter limit</h2>
              <p className={i(c,s,"mt-0.5")}>
                Ingestion is paused until 1 April, or until you raise the limit. Nothing has been deleted, and queries on existing data still work.
              </p>
            </div>
          </div>
          <div className={i(_,"divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-4")}>
            {x.map(e=>{
              let r=Math.min(100,Math.round(e.used/e.limit*100)),a=r>=100;
              return (
                <div key={e.label} className="p-4">
                            <div className="flex items-baseline justify-between gap-3">
                              <p className={i(c,o,"truncate")}>{e.label}</p>
                              <p className={i("text-[12px]/[16px] font-normal tabular-nums",s,"shrink-0")}>
                                <span className={i(a&&"text-[12px]/[16px] font-[450] tabular-nums",a&&o)}>{u(e.used)}</span>
                                {" "}
                                {"/ "}
                                {u(e.limit)}
                                {e.unit}
                              </p>
                            </div>
                            <div className={i("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-2 h-1.5")}>
                              <div className={r>95?i("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","block h-full"):r>80?i("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full"):"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100"} style={{width:`${r}%`}} />
                            </div>
                          </div>
              );
            })}
          </div>
          <div className={i(_,"mt-3 p-4")}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className={i("text-[14px]/[16px] font-[450]",o)}>Pro raises every limit tenfold</p>
                <p className={i("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>500k requests, 20M rows, unlimited sources. $24 per seat / mo.</p>
              </div>
              <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <button type="button" className={i("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",d,"w-full sm:w-auto")}>Buy a one-off top-up</button>
                <button type="button" className={i("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",d,"w-full sm:w-auto")}>Upgrade to Pro</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default b;
