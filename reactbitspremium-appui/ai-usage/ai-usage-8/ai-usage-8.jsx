/**
 * React Bits Pro — Application UI (ai-usage-8)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let i = (...e)=>e.filter(Boolean).join(" "),
  o = "text-neutral-900/66 dark:text-neutral-100/66",
  d = "relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7",
  c = i("text-[13px]/[18px] font-normal",o),
  u = i("text-[12px]/[16px] font-normal tabular-nums",o),
  x = i("text-neutral-900 dark:text-neutral-100","bg-current"),
  p = i("text-neutral-900/66 dark:text-neutral-100/66","bg-current"),
  b = [{id:"messages",label:"Assistant messages",used:1842,cap:2e3,note:"Resets 1 Jul"},{id:"runs",label:"Agent runs",used:96,cap:250,note:"Resets 1 Jul"},{id:"storage",label:"Indexed documents",used:4310,cap:1e4,note:"Does not reset"},{id:"seats",label:"Member seats",used:12,cap:20,note:"Billed monthly"}],
  h = [18,24,21,33,29,41,38,52,47,61,58,74];

function m(){
  let[e,a]=useState(null),r=b[0],o=Math.round(r.used/r.cap*100),m=Math.max(...h);
  return (
    <div className={i("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[480px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[420px]">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Plan usage</h2>
              <p className={i(c,"mt-0.5 flex gap-x-3 truncate")}>
                <span>Northwind</span>
                <span>Team plan</span>
              </p>
            </div>
            <button type="button" className={i("inline-flex min-h-6 items-center gap-1 rounded-[var(--rb-r-sm,6px)] text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 decoration-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","shrink-0")}>
              Details
              <HugeiconsIcon icon={Icon_1497} size={14} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className={i("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
              <div className="p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className={c}>{r.label}</p>
                    <p className={i("text-[32px]/[36px] font-[450] tabular-nums","mt-0.5")}>
                      {r.used.toLocaleString("en-US")}
                      <span className={i(c,"ml-1.5")}>
                        {"/ "}
                        {r.cap.toLocaleString("en-US")}
                      </span>
                    </p>
                  </div>
                  <div className="flex h-10 shrink-0 items-end gap-[3px]" onMouseLeave={()=>a(null)} aria-hidden="true">
                    {h.map((r,l)=><span key={l} onMouseEnter={()=>a(l)} className={i(e===l?x:"bg-neutral-900/8 dark:bg-neutral-100/8","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","w-[5px] rounded-[2px]")} style={{height:`${r/m*100}%`}} />)}
                  </div>
                </div>
                <div role="progressbar" aria-valuenow={o} aria-valuemin={0} aria-valuemax={100} aria-label={`${r.label} used`} className={i(d,"mt-3 h-1.5")}>
                  <div className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:`${o}%`}} />
                </div>
                <p className={i(u,"mt-2 flex items-center gap-x-3")}>
                  <span>
                    {o}
                    % used
                  </span>
                  <span>{r.note}</span>
                </p>
              </div>
              <div>
                {b.slice(1).map(e=>{
                  let a=Math.round(e.used/e.cap*100);
                  return (
                    <div key={e.id} className="px-3 py-3">
                                    <div className="flex items-baseline justify-between gap-3">
                                      <p className={i("text-[14px]/[16px] font-[450]","truncate")}>{e.label}</p>
                                      <p className={i(c,"shrink-0 tabular-nums")}>
                                        {e.used.toLocaleString("en-US")}
                                        {" / "}
                                        {e.cap.toLocaleString("en-US")}
                                      </p>
                                    </div>
                                    <div className={i(d,"mt-2")}><div className={i(p,"block h-full")} style={{width:`${a}%`}} /></div>
                                  </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 px-3 py-3">
                <p className={i(c,"min-w-0 flex-auto")}>Unlimited messages on Scale.</p>
                <button type="button" className={i("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>Upgrade</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default m;
