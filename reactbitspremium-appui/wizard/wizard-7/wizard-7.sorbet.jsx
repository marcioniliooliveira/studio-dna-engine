/**
 * React Bits Pro — Application UI (wizard-7 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let s = (...e)=>e.filter(Boolean).join(" ");

let d = "text-neutral-900 dark:text-neutral-100";

let _ = "text-neutral-900/62 dark:text-neutral-100/62";

let eJ = (...e)=>e.filter(Boolean).join(" ");

let eQ = "text-neutral-900/62 dark:text-neutral-100/62";

let eX = eJ("text-[14px]/[20px] font-medium",eQ);

let e0 = eJ("text-[13px]/[16px] font-semibold tabular-nums",eQ);

let e1 = [{id:"volume",title:"How much do you ship a month?",blurb:"This sets your default rate card.",options:["Under 100 parcels","100 to 1,000","1,000 to 10,000","More"]},{id:"regions",title:"Where do you ship to?",blurb:"We enable the right customs forms.",options:["Domestic only","Europe","Worldwide","Not sure yet"]},{id:"handoff",title:"How do parcels leave your site?",blurb:"Pickups can be scheduled automatically.",options:["Courier pickup","Drop-off point","Own fleet","Mixed"]},{id:"system",title:"What do you use for orders today?",blurb:"We can import the last 90 days.",options:["A storefront platform","A spreadsheet","Custom system","Nothing yet"]},{id:"priority",title:"What matters most right now?",blurb:"This orders the dashboard you land on.",options:["Lower cost","Faster delivery","Fewer support tickets","Better tracking"]}];


export default function wizard_7__Sorbet__Component(){
  let[e,r]=useState(1),[a,l]=useState({volume:"100 to 1,000",regions:"Europe"}),s=e1[e],d=e===e1.length-1,_=a[s.id];
  return (
    <div className={eJ("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[540px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <section className={eJ("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","mx-auto my-auto w-full max-w-[420px] shrink-0 p-6")}>
          <div className="flex items-center justify-between gap-3">
            <ol className="flex items-center gap-1.5">
              {e1.map((a,o)=>{
                let l=o<e,c=o===e;
                return (
                  <li key={a.id}>
                                <button type="button" onClick={()=>r(o)} aria-current={c?"step":undefined} aria-label={`Go to question ${o+1}${l?", done":c?", current":""}`} className={eJ("grid size-7 shrink-0 place-items-center rounded-full border-2 text-[13px]/[16px] font-extrabold tabular-nums",l?"border-transparent bg-[var(--rb-accent,oklch(84%_0.15_165))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-none":c?"border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] text-neutral-900 dark:text-neutral-100 dark:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"border-transparent bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900/62 dark:text-neutral-100/62 dark:bg-neutral-100/10","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","cursor-pointer")}>
                                  {l?<HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} aria-hidden="true" />:o+1}
                                </button>
                              </li>
                );
              })}
            </ol>
            <p className={eJ(e0,"shrink-0")}>
              {e+1}
              {" of "}
              {e1.length}
            </p>
          </div>
          <h2 className={eJ("text-[17px]/[22px] font-extrabold","mt-5")}>{s.title}</h2>
          <p className={eJ(eX,"mt-1")}>{s.blurb}</p>
          <div role="radiogroup" aria-label={s.title} className={eJ("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-4")}>
            {s.options.map(e=>{
              let r=e===_;
              return (
                <div key={e} className="py-1">
                            <label className={eJ("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]",r?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","rounded-[var(--rb-r-4xl,18px)]","px-3")}>
                              <input type="radio" name={`wz7-${s.id}`} value={e} checked={r} onChange={()=>l(r=>({...r,[s.id]:e}))} className="size-[18px] shrink-0 cursor-pointer appearance-none rounded-full border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,border-width,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-[6px] checked:border-[var(--rb-accent,oklch(84%_0.15_165))] checked:bg-white checked:shadow-[0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:border-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:bg-neutral-900 dark:checked:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:border-neutral-100/28" />
                              <span className={eJ("text-[15px]/[20px] font-bold","min-w-0 flex-1 truncate")}>{e}</span>
                            </label>
                          </div>
              );
            })}
          </div>
          <div className="mt-5 flex items-center gap-2">
            <button type="button" onClick={()=>r(e=>Math.max(0,e-1))} disabled={0===e} aria-label="Previous question" className={eJ("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-10 rounded-[calc(var(--rb-r-full,999px))]")}>
              <HugeiconsIcon icon={Icon_18976} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button type="button" onClick={()=>r(e=>Math.min(e1.length-1,e+1))} disabled={!_} className={eJ("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","flex-1")}>
              {d?"Finish":"Continue"}
              {!d&&<HugeiconsIcon icon={Icon_55299} size={18} strokeWidth={2} aria-hidden="true" />}
            </button>
          </div>
          <button type="button" className={eJ("inline-flex min-h-6 items-center gap-1 rounded-[calc(var(--rb-r-sm,6px))] text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100 underline decoration-[var(--rb-accent,oklch(84%_0.15_165))] decoration-[3px] underline-offset-[5px] transition-[text-decoration-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:decoration-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:decoration-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:decoration-[var(--rb-accent,oklch(81%_0.16_163))]","mt-3 w-full justify-center")}>Skip and use defaults</button>
        </section>
      </div>
  );
}
