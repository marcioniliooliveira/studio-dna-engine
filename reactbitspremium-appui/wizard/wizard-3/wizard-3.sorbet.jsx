/**
 * React Bits Pro — Application UI (wizard-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let Y = (...e)=>e.filter(Boolean).join(" ");

let G = "text-neutral-900 dark:text-neutral-100";

let K = "text-neutral-900/62 dark:text-neutral-100/62";

let J = "divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7";

let Q = "text-[14px]/[20px] font-medium";

let X = "text-[15px]/[20px] font-bold";

let ee = "inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums";

let er = "bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12";

let ea = "rounded-[var(--rb-r-4xl,18px)]";

let et = Y(Q,K);

let eo = Y("text-[13px]/[16px] font-semibold tabular-nums",K);

let en = ["Plan","Seats","Payment","Review"];

let el = [{id:"team",name:"Team",blurb:"Workspace controls for growing product teams.",price:"$49"},{id:"business",name:"Business",blurb:"SAML, audit exports, and priority support.",price:"$72",recommended:true},{id:"enterprise",name:"Enterprise",blurb:"Procurement review and account governance.",price:"$96"}];

let ei = [{label:"Seats",sub:"42 seats, annual",value:"$36,288"},{label:"Term credit",sub:"15% on annual",value:"−$5,443"},{label:"Support",sub:"Priority response",value:"$390"}];

let ec = [{label:"Renewal",value:"May 31, 2026"},{label:"Purchase order",value:"PO-2026-184"}];


export default function wizard_3__Sorbet__Component(){
  let[e,r]=useState(0),[a,l]=useState("business");
  return (
    <div className={Y("bg-white dark:bg-neutral-950",G,"relative h-full min-h-[720px] w-full overflow-y-auto p-6 sm:p-8")}>
        <section className={Y("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","mx-auto w-full max-w-5xl")}>
          <header className={Y("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","shrink-0 px-6 pb-4 pt-5")}>
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-[17px]/[22px] font-extrabold">Billing upgrade</h2>
                <p className={Y(et,"mt-1")}>Change plan, seats, and payment terms before renewal.</p>
              </div>
              <span className={Y("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums","text-neutral-900/62 dark:text-neutral-100/62")}>Draft</span>
            </div>
            <ol className="mt-4 flex items-center gap-3">
              {en.map((a,o)=>{
                let l=o<e,c=o===e;
                return (
                  <li key={a} className={Y("flex min-w-0 items-center gap-3",o<en.length-1&&"flex-1")}>
                                <button type="button" onClick={()=>r(o)} aria-current={c?"step":undefined} className={Y("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]",ea,"flex min-w-0 cursor-pointer items-center gap-2")}>
                                  <span aria-hidden="true" className={Y("grid size-7 shrink-0 place-items-center rounded-full border-2 text-[13px]/[16px] font-extrabold tabular-nums",l?"border-transparent bg-[var(--rb-accent,oklch(84%_0.15_165))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-none":c?"border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] text-neutral-900 dark:text-neutral-100 dark:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"border-transparent bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900/62 dark:text-neutral-100/62 dark:bg-neutral-100/10")}>{l?<HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} />:o+1}</span>
                                  <span className={Y(X,l||c?G:K,"hidden truncate sm:block")}>
                                    {a}
                                    <span className="sr-only">{l?", done":c?", current":""}</span>
                                  </span>
                                </button>
                                {o<en.length-1&&<span aria-hidden="true" className={l?"h-1 min-w-4 flex-1 rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]":"h-1 min-w-4 flex-1 rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:bg-neutral-100/10"} />}
                              </li>
                );
              })}
            </ol>
          </header>
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 px-6 py-5 lg:grid-cols-5">
            <div role="radiogroup" aria-label="Plan" className="min-w-0 lg:col-span-3">
              <h3 className={eo}>Plan</h3>
              <div className={Y(J,"mt-3")}>
                {el.map(e=>{
                  let r=e.id===a;
                  return (
                    <div key={e.id} className="py-1">
                                    <label className={Y("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",r?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10",ea,"px-4 py-3")}>
                                      <input type="radio" name="wz3-plan" value={e.id} checked={r} onChange={()=>l(e.id)} className="size-[18px] shrink-0 cursor-pointer appearance-none rounded-full border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,border-width,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-[6px] checked:border-[var(--rb-accent,oklch(84%_0.15_165))] checked:bg-white checked:shadow-[0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:border-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:bg-neutral-900 dark:checked:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:border-neutral-100/28" />
                                      <span className="min-w-0 flex-1">
                                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                          <span className={Y(X,"truncate")}>{e.name}</span>
                                          {e.recommended&&<span className={Y(ee,er)}>Recommended</span>}
                                        </span>
                                        <span className={Y(et,"mt-0.5 block")}>{e.blurb}</span>
                                      </span>
                                      <span className={Y(X,"shrink-0 tabular-nums")}>
                                        {e.price}
                                        <span className={et}>/seat/mo</span>
                                      </span>
                                    </label>
                                  </div>
                  );
                })}
              </div>
              <p className={Y(et,"mt-3")}>
                Seat count carries over from the current term. You can adjust it on the next step before anything is charged.
              </p>
            </div>
            <aside className="min-w-0 lg:col-span-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className={eo}>Invoice preview</h3>
                <span className={Y(ee,er)}>Annual</span>
              </div>
              <div className={Y("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]",ea,J,"mt-3")}>
                <div className="px-4 py-3.5">
                  <p className={Y(eo,"truncate")}>Due today</p>
                  <p className={Y("text-[22px]/[28px] font-extrabold tracking-[-0.01em]","mt-1 tabular-nums")}>$31,235</p>
                  <p className={Y(eo,"mt-1 flex flex-wrap gap-x-3")}>
                    <span>Business</span>
                    <span>42 seats</span>
                    <span>Billed once</span>
                  </p>
                </div>
                <dl className={Y(J,"px-4 py-1")}>
                  {ei.map(e=>(
                    <div key={e.label} className="flex items-center justify-between gap-3 py-2.5">
                                    <div className="min-w-0">
                                      <dt className={Y(Q,"truncate")}>{e.label}</dt>
                                      <p className={Y(eo,"mt-0.5 truncate")}>{e.sub}</p>
                                    </div>
                                    <dd className={Y(Q,"shrink-0 tabular-nums")}>{e.value}</dd>
                                  </div>
                  ))}
                </dl>
                <dl className="space-y-2 px-4 py-3">
                  {ec.map(e=>(
                    <div key={e.label} className="flex items-center justify-between gap-3">
                                    <dt className={Y(et,"truncate")}>{e.label}</dt>
                                    <dd className={Y(Q,"shrink-0 tabular-nums")}>{e.value}</dd>
                                  </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
          <div className={Y("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex shrink-0 items-center justify-between gap-3 px-6 py-4")}>
            <p className={Y(et,"truncate")}>Nothing is charged until the review step.</p>
            <button type="button" onClick={()=>r(e=>Math.min(en.length-1,e+1))} className={Y("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none","h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold")}>
              Next
              <HugeiconsIcon icon={Icon_55299} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
  );
}
