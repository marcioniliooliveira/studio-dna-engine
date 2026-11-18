/**
 * React Bits Pro — Application UI (ai-usage-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "text-[14px]/[16px] font-[450]",
  x = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  p = "inline-block size-2 shrink-0",
  b = o("text-[13px]/[18px] font-normal",c),
  h = o("text-[12px]/[16px] font-normal tabular-nums",c),
  m = o("text-neutral-900 dark:text-neutral-100","bg-current"),
  k = o("text-neutral-900/66 dark:text-neutral-100/66","bg-current"),
  f = e=>e>=1e6?`${(e/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)}k`:`${e}`,
  _ = [{id:"scale",name:"Scale",price:400,included:25e7,overage:1.8,perks:["250M tokens included","Tier 2 rate limits","Priority routing on Atlas Pro"]},{id:"enterprise",name:"Enterprise",price:1400,included:1e9,overage:1.2,perks:["1B tokens included","Tier 3 rate limits","Dedicated capacity and a support channel"]}];

function g(){
  let[e,a]=useState("scale"),r=useMemo(()=>Math.round(68.16), [284e5]);
  return (
    <div className={o("bg-white dark:bg-neutral-950",d,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[640px]">
          <div className="mb-3">
            <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">You are over your included tokens</h2>
            <p className={o(b,"mt-0.5")}>
              Requests keep working. Anything past the allowance bills at $
              2.40
              {" per million."}
            </p>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className={o("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
              <div className="p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className={b}>Tokens used</p>
                  <p className={o(b,"tabular-nums")}>
                    <span className={o("text-[20px]/[24px] font-[450] tracking-[-0.015em]",d)}>{f(1284e5)}</span>
                    {" "}
                    {"of "}
                    {f(1e8)}
                    {" included"}
                  </p>
                </div>
                <div className={o("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-3 flex h-2")}>
                  <div className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:"77.88161993769471%"}} />
                  <div className={o(k,"h-full")} style={{width:`${22.11838006230529}%`}} />
                </div>
                <div className={o(b,"mt-3 flex flex-wrap items-center gap-x-4 gap-y-1")}>
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true" className={o(p,m)} />
                    Included
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true" className={o(p,k)} />
                    {"Overage "}
                    {f(284e5)}
                  </span>
                  <span className="tabular-nums">
                    $
                    {r}
                    {" so far"}
                  </span>
                </div>
              </div>
              <div>
                <p className={o(u,"px-3 pt-3 pb-2")}>Move to a larger allowance</p>
                <div role="radiogroup" aria-label="Plan" className="grid gap-1 px-1 pb-1 sm:grid-cols-2">
                  {_.map(r=>{
                    let l=r.id===e;
                    return (
                      <label key={r.id} className={o(l?"bg-neutral-900/9 dark:bg-neutral-100/9":o("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","active:bg-neutral-900/8 dark:active:bg-neutral-100/8"),"rounded-[var(--rb-r-sm,6px)]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","min-w-0 cursor-pointer p-3 text-left")}>
                                        <div className="flex items-center justify-between gap-2">
                                          <span className={u}>{r.name}</span>
                                          <input type="radio" name="ai-usage-6-plan" value={r.id} checked={l} onChange={()=>a(r.id)} className="size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-[5px] checked:border-[var(--rb-accent,oklch(20.5%_0_0))] checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:border-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:border-[var(--rb-accent,oklch(100%_0_0))] dark:checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:border-neutral-100/40" />
                                        </div>
                                        <p className={o(b,"mt-1 flex flex-wrap gap-x-3 tabular-nums")}>
                                          <span>
                                            $
                                            {r.price}
                                            /mo
                                          </span>
                                          <span>
                                            $
                                            {r.overage.toFixed(2)}
                                            {" per M over"}
                                          </span>
                                        </p>
                                        <ul className="mt-3 space-y-1">
                                          {r.perks.map(e=>(
                                            <li key={e} className={o(h,"flex items-start gap-1.5")}>
                                                                  <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" className="mt-0.5 shrink-0" />
                                                                  <span>{e}</span>
                                                                </li>
                                          ))}
                                        </ul>
                                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 px-3 py-3">
                <p className={o(b,"min-w-0 flex-[1_1_240px] text-balance")}>Changes apply immediately and prorate against this cycle.</p>
                <div className="flex shrink-0 items-center gap-2">
                  <button type="button" className={o("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",x)}>Stay on overage</button>
                  <button type="button" className={o("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",x)}>
                    Upgrade
                    <HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default g;
