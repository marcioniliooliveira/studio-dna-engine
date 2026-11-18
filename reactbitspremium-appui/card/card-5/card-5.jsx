/**
 * React Bits Pro — Application UI (card-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/80 dark:text-neutral-100/80",
  u = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  x = "text-[13px]/[18px] font-normal",
  b = [{id:"starter",name:"Starter",price:"$0",cadence:"forever",blurb:"For a single person keeping one project tidy.",specs:[{label:"Seats",value:"1"},{label:"Projects",value:"3"},{label:"History",value:"30 days"},{label:"Support",value:"Community"}],includes:["Unlimited work items","Two integrations"],recommended:false},{id:"team",name:"Team",price:"$18",cadence:"per seat / month",blurb:"For a working team that ships on a weekly cadence.",specs:[{label:"Seats",value:"Up to 50"},{label:"Projects",value:"Unlimited"},{label:"History",value:"2 years"},{label:"Support",value:"Next business day"}],includes:["Everything in Starter","Roles and approvals","Audit trail"],recommended:true},{id:"enterprise",name:"Enterprise",price:"Custom",cadence:"billed annually",blurb:"For organisations with procurement and residency rules.",specs:[{label:"Seats",value:"Unlimited"},{label:"Projects",value:"Unlimited"},{label:"History",value:"Unlimited"},{label:"Support",value:"Dedicated"}],includes:["Everything in Team","SSO and SCIM","Data residency"],recommended:false}];

function p(){
  let[e,r]=useState("team");
  return (
    <div className={o("bg-white dark:bg-neutral-950",d,"h-full min-h-[560px] w-full overflow-y-auto p-6 sm:p-8")}>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {b.map(a=>{
            let l=a.id===e;
            return (
              <li key={a.id} className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
                        <div className={o("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",u,"mt-1 flex-1")}>
                          <div className="px-4 py-4">
                            <p className="flex items-center gap-2">
                              <span className={o("text-[14px]/[16px] font-[450]",d,"min-w-0 flex-1 truncate")}>{a.name}</span>
                              {a.recommended&&<span className={o("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>Recommended</span>}
                            </p>
                            <p className="mt-3 flex items-baseline gap-1.5">
                              <span className={o("text-[20px]/[24px] font-[450] tracking-[-0.015em]",d,"tabular-nums")}>{a.price}</span>
                              <span className={o("text-[12px]/[16px] font-normal tabular-nums","text-neutral-900/66 dark:text-neutral-100/66","min-w-0 truncate")}>{a.cadence}</span>
                            </p>
                            <p className={o(x,c,"mt-2")}>{a.blurb}</p>
                          </div>
                          <dl className={o(u,"flex-1 px-4 py-1")}>
                            {a.specs.map(e=>(
                              <div key={e.label} className="flex items-center justify-between gap-3 py-2.5">
                                              <dt className={o("min-w-0 text-[14px]/[16px] font-[450] text-neutral-900/66 dark:text-neutral-100/66","truncate")}>{e.label}</dt>
                                              <dd className={o("flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","shrink-0 truncate tabular-nums")}>{e.value}</dd>
                                            </div>
                            ))}
                          </dl>
                          <ul className="space-y-2 px-4 py-3">
                            {a.includes.map(e=>(
                              <li key={e} className={o(x,c,"flex items-start gap-2")}>
                                              <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={1.8} aria-hidden="true" className={o(d,"mt-0.5 shrink-0")} />
                                              <span className="min-w-0">{e}</span>
                                            </li>
                            ))}
                          </ul>
                        </div>
                        <button type="button" aria-pressed={l} onClick={()=>r(a.id)} className={o(l?"relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40":"relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","m-1 justify-center")}>
                          {l?"Current plan":`Choose ${a.name}`}
                          {!l&&<HugeiconsIcon icon={Icon_1497} size={16} strokeWidth={1.8} aria-hidden="true" />}
                        </button>
                      </li>
            );
          })}
        </ul>
      </div>
  );
}


export default p;
