/**
 * React Bits Pro — Application UI (wizard-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = d("text-[13px]/[18px] font-normal",c),
  b = d("text-[12px]/[16px] font-normal tabular-nums",c),
  x = [{id:"volume",title:"How much do you ship a month?",blurb:"This sets your default rate card.",options:["Under 100 parcels","100 to 1,000","1,000 to 10,000","More"]},{id:"regions",title:"Where do you ship to?",blurb:"We enable the right customs forms.",options:["Domestic only","Europe","Worldwide","Not sure yet"]},{id:"handoff",title:"How do parcels leave your site?",blurb:"Pickups can be scheduled automatically.",options:["Courier pickup","Drop-off point","Own fleet","Mixed"]},{id:"system",title:"What do you use for orders today?",blurb:"We can import the last 90 days.",options:["A storefront platform","A spreadsheet","Custom system","Nothing yet"]},{id:"priority",title:"What matters most right now?",blurb:"This orders the dashboard you land on.",options:["Lower cost","Faster delivery","Fewer support tickets","Better tracking"]}];

function h(){
  let[e,r]=useState(1),[a,c]=useState({volume:"100 to 1,000",regions:"Europe"}),h=x[e],p=e===x.length-1,_=a[h.id];
  return (
    <div className={d("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[480px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <section className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","mx-auto my-auto w-full max-w-[420px] shrink-0 p-6")}>
          <div className="flex items-center justify-between gap-3">
            <ol className="flex items-center gap-1.5">
              {x.map((a,l)=>{
                let i=l<e,o=l===e;
                return (
                  <li key={a.id}>
                                <button type="button" onClick={()=>r(l)} aria-current={o?"step":undefined} aria-label={`Go to question ${l+1}${i?", done":o?", current":""}`} className={d("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums",i?"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/80 dark:text-neutral-100/80 dark:border-neutral-100/14":o?"border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100":"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","cursor-pointer")}>
                                  {i?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" />:l+1}
                                </button>
                              </li>
                );
              })}
            </ol>
            <p className={d(b,"shrink-0")}>
              {e+1}
              {" of "}
              {x.length}
            </p>
          </div>
          <h2 className={d("text-[16px]/[20px] font-[450] tracking-[-0.015em]","mt-5")}>{h.title}</h2>
          <p className={d(u,"mt-1")}>{h.blurb}</p>
          <div role="radiogroup" aria-label={h.title} className={d("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-4")}>
            {h.options.map(e=>{
              let r=e===_;
              return (
                <div key={e} className="py-1">
                            <label className={d("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]",r?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","rounded-[var(--rb-r-sm,6px)]","px-3")}>
                              <input type="radio" name={`wz7-${h.id}`} value={e} checked={r} onChange={()=>c(r=>({...r,[h.id]:e}))} className="size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-[5px] checked:border-[var(--rb-accent,oklch(20.5%_0_0))] checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:border-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:border-[var(--rb-accent,oklch(100%_0_0))] dark:checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:border-neutral-100/40" />
                              <span className={d("text-[14px]/[16px] font-[450]","min-w-0 flex-1 truncate")}>{e}</span>
                            </label>
                          </div>
              );
            })}
          </div>
          <div className="mt-5 flex items-center gap-2">
            <button type="button" onClick={()=>r(e=>Math.max(0,e-1))} disabled={0===e} aria-label="Previous question" className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-8 rounded-[var(--rb-r-sm,6px)]")}>
              <HugeiconsIcon icon={Icon_18976} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button type="button" onClick={()=>r(e=>Math.min(x.length-1,e+1))} disabled={!_} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","flex-1")}>
              {p?"Finish":"Continue"}
              {!p&&<HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" />}
            </button>
          </div>
          <button type="button" className={d("inline-flex min-h-6 items-center gap-1 rounded-[var(--rb-r-sm,6px)] text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 decoration-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","mt-3 w-full justify-center")}>Skip and use defaults</button>
        </section>
      </div>
  );
}


export default h;
