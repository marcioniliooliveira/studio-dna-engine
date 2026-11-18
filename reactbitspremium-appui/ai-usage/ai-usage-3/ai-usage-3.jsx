/**
 * React Bits Pro — Application UI (ai-usage-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_46772 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 16V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 8.25H12M12.25 8.25C12.25 8.11193 12.1381 8 12 8C11.8619 8 11.75 8.11193 11.75 8.25C11.75 8.38807 11.8619 8.5 12 8.5C12.1381 8.5 12.25 8.38807 12.25 8.25Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "text-[14px]/[16px] font-[450]",
  x = o("text-[13px]/[18px] font-normal",c),
  p = o("text-[12px]/[16px] font-normal tabular-nums",c),
  b = [{id:"rpm",label:"Requests per minute",hint:"Rolling 60 second window",used:412,cap:500,unit:"req"},{id:"tpm",label:"Tokens per minute",hint:"Input and output combined",used:148e3,cap:4e5,unit:"tok"},{id:"concurrent",label:"Concurrent requests",hint:"In flight right now",used:18,cap:40,unit:"req"},{id:"batch",label:"Queued batch jobs",hint:"Waiting for a worker",used:3,cap:25,unit:"jobs"}],
  h = ["Tier 1","Tier 2","Tier 3"],
  m = {"Tier 1":1,"Tier 2":4,"Tier 3":10};

function k(){
  let[e,a]=useState("Tier 1"),r=m[e],c=b.map(e=>{
    let a=e.cap*r,t=Math.min(100,e.used/a*100);
    return {...e,cap:a,pct:t};
  }),k=c.filter(e=>e.pct>=75).length;
  return (
    <div className={o("bg-white dark:bg-neutral-950",d,"flex h-full min-h-[560px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[620px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Rate limits</h2>
              <p className={o("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",k?"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]":"text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>{k?`${k} limit${k>1?"s":""} near capacity`:"All limits within range"}</p>
            </div>
            <div role="radiogroup" aria-label="Usage tier" onKeyDown={r=>{
              var t,l,n;
              let s;
              return t=h.length,l=h.indexOf(e),n=e=>a(h[e]),void(!((s="ArrowRight"===r.key||"ArrowDown"===r.key?(l+1)%t:"ArrowLeft"===r.key||"ArrowUp"===r.key?(l-1+t)%t:"Home"===r.key?0:"End"===r.key?t-1:-1)<0)&&(r.preventDefault(),n(s),r.currentTarget.querySelectorAll('[role="radio"]')[s]?.focus()));
            }} className={o("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {h.map(r=><button key={r} type="button" role="radio" aria-checked={r===e} tabIndex={r===e?0:-1} onClick={()=>a(r)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{r}</button>)}
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className={o("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-1")}>
              <div>
                {c.map(e=>(
                  <div key={e.id} className="px-3 py-3">
                                <div className="flex items-baseline justify-between gap-3">
                                  <div className="min-w-0">
                                    <p className={o(u,"truncate")}>{e.label}</p>
                                    <p className={o(p,"truncate")}>{e.hint}</p>
                                  </div>
                                  <p className={o(x,"shrink-0 tabular-nums")}>
                                    <span className={o(u,d)}>{e.used.toLocaleString("en-US")}</span>
                                    {" "}
                                    {"/ "}
                                    {e.cap.toLocaleString("en-US")}
                                    {" "}
                                    {e.unit}
                                  </p>
                                </div>
                                <div role="progressbar" aria-valuenow={Math.round(e.pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`${e.label} utilisation`} className={o("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","mt-2 h-1.5")}>
                                  <div className={e.pct>=95?o("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","block h-full"):e.pct>=75?o("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full"):"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100"} style={{width:`${e.pct}%`}} />
                                </div>
                              </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 px-3 py-3">
                <p className={o(x,"flex min-w-0 flex-[1_1_240px] items-start gap-2 text-balance")}>
                  <HugeiconsIcon icon={"Tier 3"===e?Icon_90987:Icon_46772} size={14} strokeWidth={1.8} aria-hidden="true" className="mt-0.5 shrink-0" />
                  <span>
                    {"Tier 3"===e?"Highest tier. Contact us for a bespoke ceiling.":"Limits rise automatically once spend clears the next threshold."}
                  </span>
                </p>
                <button type="button" className={o("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>Request an increase</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default k;
