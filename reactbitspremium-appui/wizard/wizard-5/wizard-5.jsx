/**
 * React Bits Pro — Application UI (wizard-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66654 = [["path",{d:"M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 20H17",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "bg-neutral-900/5 dark:bg-neutral-100/5",
  c = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  u = "text-[13px]/[18px] font-normal",
  b = "text-[14px]/[16px] font-[450]",
  x = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  h = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  p = "rounded-[var(--rb-r-sm,6px)]",
  _ = o(u,"text-neutral-900/66 dark:text-neutral-100/66"),
  m = o(u,"text-neutral-900/80 dark:text-neutral-100/80"),
  k = ["Details","Schedule","Recipients","Review"],
  f = [{id:"details",title:"Campaign details",rows:[{label:"Name",value:"Spring product update"},{label:"Sender",value:"Kepler Works <news@kepler.works>"},{label:"Reply-to",value:"support@kepler.works"}]},{id:"schedule",title:"Schedule",rows:[{label:"Send at",value:"24 April 2026, 09:00"},{label:"Timezone",value:"Europe/Lisbon"},{label:"Throttle",value:"5,000 per hour"}]},{id:"recipients",title:"Recipients",rows:[{label:"Audience",value:"Product subscribers"},{label:"Size",value:"18,204 contacts"},{label:"Suppressed",value:"412 unsubscribed"}]}];

function v(){
  let[e,r]=useState(false);
  return (
    <div className={o("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative h-full min-h-[720px] w-full overflow-y-auto p-6 sm:p-8")}>
        <section className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","mx-auto w-full max-w-2xl")}>
          <ol className={o("border-b border-neutral-900/8 dark:border-neutral-100/8","flex shrink-0 items-center gap-3 px-6 py-4")}>
            {k.map((e,r)=>{
              let a=r<k.length-1,l=r===k.length-1;
              return (
                <li key={e} className={o("flex min-w-0 items-center gap-3",r<k.length-1&&"flex-1")}>
                            <span aria-current={l?"step":undefined} className="flex min-w-0 items-center gap-2.5">
                              <span aria-hidden="true" className={o("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums",a?"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/80 dark:text-neutral-100/80 dark:border-neutral-100/14":"border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100")}>{a?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} />:r+1}</span>
                              <span className={o(b,"hidden truncate sm:block")}>
                                {e}
                                <span className="sr-only">{a?", done":", current"}</span>
                              </span>
                            </span>
                            {r<k.length-1&&<span aria-hidden="true" className="h-px min-w-4 flex-1 bg-neutral-900 dark:bg-neutral-100" />}
                          </li>
              );
            })}
          </ol>
          <div className="min-h-0 flex-1 px-6 py-5">
            <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Review before sending</h2>
            <p className={o(_,"mt-1")}>Nothing sends until you confirm. Each section can still be changed.</p>
            <div className="mt-5 space-y-3">
              {f.map(e=>(
                <div key={e.id} className={o(d,p,c)}>
                            <div className="flex items-center justify-between gap-3 px-4 py-2.5">
                              <h3 className={o(b,"truncate")}>{e.title}</h3>
                              <button type="button" className={o(x,h)}>
                                <HugeiconsIcon icon={Icon_66654} size={16} strokeWidth={1.8} aria-hidden="true" />
                                Edit
                                <span className="sr-only">
                                  {" "}
                                  {e.title}
                                </span>
                              </button>
                            </div>
                            <dl className={o(c,"px-4 py-1")}>
                              {e.rows.map(e=>(
                                <div key={e.label} className="flex items-baseline justify-between gap-4 py-2.5">
                                                <dt className={o(_,"shrink-0")}>{e.label}</dt>
                                                <dd className={o(u,"min-w-0 text-right [overflow-wrap:anywhere]")}>{e.value}</dd>
                                              </div>
                              ))}
                            </dl>
                          </div>
              ))}
            </div>
            <label className={o(d,p,"mt-5 flex cursor-pointer items-start gap-3 p-4")}>
              <span className={o("relative inline-flex size-4 shrink-0 items-center justify-center","mt-px")}>
                <input type="checkbox" checked={e} onChange={e=>r(e.target.checked)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
              </span>
              <span className={o(m,"min-w-0")}>
                I have checked the audience and schedule. Sending to 18,204 contacts cannot be undone once delivery starts.
              </span>
            </label>
          </div>
          <div className={o("border-t border-neutral-900/8 dark:border-neutral-100/8","flex shrink-0 items-center justify-between gap-3 px-6 py-4")}>
            <button type="button" className={o(x,h)}>Back</button>
            <button type="button" disabled={!e} className={o("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",h)}>Schedule send</button>
          </div>
        </section>
      </div>
  );
}


export default v;
