/**
 * React Bits Pro — Application UI (billing-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" ");

let eO = (...e)=>e.filter(Boolean).join(" ");

let eI = "text-neutral-900 dark:text-neutral-100";

let eL = "text-neutral-900/62 dark:text-neutral-100/62";

let e$ = "rounded-[var(--rb-r-4xl,18px)]";

let eJ = "text-[14px]/[20px] font-medium";

let eU = "text-[15px]/[20px] font-bold";

let eV = "text-[13px]/[16px] font-semibold tabular-nums";

let eB = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let eT = "inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums";

let eF = [{label:"New plan",hint:"Pick a tier"},{label:"Timing",hint:"When it applies"},{label:"Confirm",hint:"Review the change"}];

let eG = [{id:"starter",name:"Starter",blurb:"Core billing for small teams getting started.",price:29},{id:"growth",name:"Growth",blurb:"Usage analytics and seat management.",price:89,current:true},{id:"scale",name:"Scale",blurb:"SSO, audit exports, and priority support.",price:249,popular:true},{id:"enterprise",name:"Enterprise",blurb:"Procurement review and account governance.",price:399}];

let eH = e=>`$${Math.round(e).toLocaleString("en-US")}`;


export default function billing_5__Sorbet__Component(){
  let[e,a]=useState("scale"),{ref:r,edges:i,onScroll:o}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),c=eG.find(e=>e.current),d=eG.find(a=>a.id===e),_=useMemo(()=>{
    let e=20*c.price*.6,a=20*d.price*.6;
    return {credit:e,charge:a,due:a-e};
  }, [c.price,d.price]),x=d.price>c.price?"Upgrade":d.price<c.price?"Downgrade":"No change";
  return (
    <div className={eO("bg-white dark:bg-neutral-950",eI,"flex h-full min-h-[740px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={eO("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mx-auto min-h-0 w-full max-w-[980px] flex-1")}>
          <div className={eO("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","justify-between py-3")}>
            <div className="min-w-0">
              <h2 className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">Change plan</h2>
              <p className={eO("text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5 flex flex-wrap gap-x-3")}>
                <span>
                  {"Cedar Labs on "}
                  {c.name}
                </span>
                <span>
                  20
                  {" seats"}
                </span>
              </p>
            </div>
            <span className={eO(eT,"bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.09),0_1px_2px_rgb(84_62_32/0.08)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.55)] dark:bg-neutral-800")}>Draft</span>
          </div>
          <div className={eO("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative min-h-0 flex-1")}>
            <div ref={r} onScroll={o} className="min-h-0 flex-1 overflow-y-auto p-5">
              <ol className="flex items-start gap-2">
                {eF.map((e,a)=>(
                  <li key={e.label} className="flex min-w-0 flex-1 items-start gap-2">
                                <div className="flex min-w-0 flex-col items-start gap-1.5">
                                  <span aria-current={0===a?"step":undefined} className={eO("grid size-7 shrink-0 place-items-center rounded-full border-2 text-[13px]/[16px] font-extrabold tabular-nums",0===a?"border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] text-neutral-900 dark:text-neutral-100 dark:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"border-transparent bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900/62 dark:text-neutral-100/62 dark:bg-neutral-100/10")}>{a+1}</span>
                                  <div className="hidden min-w-0 sm:block">
                                    <p className={eO(eU,"truncate",0===a?eI:eL)}>
                                      {e.label}
                                      {0===a&&<span className="sr-only">, current</span>}
                                    </p>
                                    <p className={eO(eV,eL,"truncate")}>{e.hint}</p>
                                  </div>
                                </div>
                                {a<eF.length-1&&<span aria-hidden className={eO("h-1 min-w-4 flex-1 rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:bg-neutral-100/10","mt-3")} />}
                              </li>
                ))}
              </ol>
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
                <fieldset className="min-w-0">
                  <legend className="sr-only">New plan</legend>
                  <div className="flex flex-col gap-1">
                    {eG.map(r=>{
                      let l=r.id===e;
                      return (
                        <label key={r.id} className={eO("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16",e$,l?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10","px-3")}>
                                            <input type="radio" name="billing-5-plan" value={r.id} checked={l} onChange={()=>a(r.id)} className="size-[18px] shrink-0 cursor-pointer appearance-none rounded-full border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,border-width,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-[6px] checked:border-[var(--rb-accent,oklch(84%_0.15_165))] checked:bg-white checked:shadow-[0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:border-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:bg-neutral-900 dark:checked:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:border-neutral-100/28" />
                                            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                              <span className={eO("flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100","flex-wrap")}>
                                                <span>{r.name}</span>
                                                {r.current&&<span className={eO(eV,eL)}>Current</span>}
                                                {r.popular&&<span className={eO(eV,eL)}>Most picked</span>}
                                              </span>
                                              <span data-description className="line-clamp-2 text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78">{r.blurb}</span>
                                            </span>
                                            <span className={eO(eU,"flex shrink-0 items-baseline tabular-nums")}>
                                              $
                                              {r.price}
                                              <span className="ms-0.5 text-[15px]/[20px] font-bold tracking-normal text-neutral-900/78 dark:text-neutral-100/78">/seat</span>
                                            </span>
                                          </label>
                      );
                    })}
                  </div>
                </fieldset>
                <aside className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={eU}>Proration</h3>
                    <span className={eO(eT,"bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>
                      {"Upgrade"===x&&<HugeiconsIcon icon={Icon_1497} size={14} strokeWidth={2} aria-hidden="true" />}
                      {x}
                    </span>
                  </div>
                  <p className={eO(eJ,eL,"mt-0.5")}>Recalculated as you change the tier.</p>
                  <div className={eO("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]",e$,"mt-3 p-4")}>
                    <p className={eO(eV,eL)}>Due today</p>
                    <p className={eO("text-[34px]/[40px] font-extrabold tracking-[-0.02em] tabular-nums","mt-1")}>{eH(Math.max(_.due,0))}</p>
                    <p className={eO(eJ,eL,"mt-2")}>
                      {d.name}
                      {", "}
                      20
                      {" seats, prorated "}
                      18
                      {" days."}
                    </p>
                  </div>
                  <dl className="mt-4 space-y-2.5">
                    {[{label:"Current plan credit",hint:`${c.name}, unused 18 days`,value:`−${eH(_.credit)}`},{label:"New plan charge",hint:`${d.name}, 18 days`,value:eH(_.charge)},{label:"Next full invoice",hint:"Renews Jul 1",value:eH(20*d.price)}].map(e=>(
                      <div key={e.label} className="flex items-baseline justify-between gap-3">
                                        <dt className="min-w-0">
                                          <span className={eO(eJ,"block")}>{e.label}</span>
                                          <span className={eO(eJ,eL,"mt-0.5 block truncate")}>{e.hint}</span>
                                        </dt>
                                        <dd className={eO(eU,"shrink-0 tabular-nums")}>{e.value}</dd>
                                      </div>
                    ))}
                  </dl>
                  <ul className="mt-4 space-y-1.5">
                    {["Seat count carries over unchanged.","Effective immediately once confirmed.","Invoices already issued are unaffected."].map(e=>(
                      <li key={e} className={eO(eJ,eL,"flex items-start gap-2")}>
                                        <span className="flex h-lh shrink-0 items-center">
                                          <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={2} aria-hidden="true" />
                                        </span>
                                        {e}
                                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
            <div aria-hidden="true" className={eO("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",i.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={eO("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
          </div>
          <div className="flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5">
            <p className="me-auto hidden sm:block">Nothing is charged until you confirm on step 3.</p>
            <div className="flex items-center gap-2">
              <button type="button" className={eO("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",eB)}>Cancel</button>
              <button type="button" className={eO("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",eB)}>
                Continue
                <HugeiconsIcon icon={Icon_55299} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
