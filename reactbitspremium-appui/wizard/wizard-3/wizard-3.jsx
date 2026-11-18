/**
 * React Bits Pro — Application UI (wizard-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  b = "text-[13px]/[18px] font-normal",
  x = "text-[14px]/[16px] font-[450]",
  h = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  p = "bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100",
  _ = "rounded-[var(--rb-r-sm,6px)]",
  m = o(b,c),
  k = o("text-[12px]/[16px] font-normal tabular-nums",c),
  f = ["Plan","Seats","Payment","Review"],
  v = [{id:"team",name:"Team",blurb:"Workspace controls for growing product teams.",price:"$49"},{id:"business",name:"Business",blurb:"SAML, audit exports, and priority support.",price:"$72",recommended:true},{id:"enterprise",name:"Enterprise",blurb:"Procurement review and account governance.",price:"$96"}],
  g = [{label:"Seats",sub:"42 seats, annual",value:"$36,288"},{label:"Term credit",sub:"15% on annual",value:"−$5,443"},{label:"Support",sub:"Priority response",value:"$390"}],
  w = [{label:"Renewal",value:"May 31, 2026"},{label:"Purchase order",value:"PO-2026-184"}];

function j(){
  let[e,r]=useState(0),[a,j]=useState("business");
  return (
    <div className={o("bg-white dark:bg-neutral-950",d,"relative h-full min-h-[720px] w-full overflow-y-auto p-6 sm:p-8")}>
        <section className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","mx-auto w-full max-w-5xl")}>
          <header className={o("border-b border-neutral-900/8 dark:border-neutral-100/8","shrink-0 px-6 pb-4 pt-5")}>
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Billing upgrade</h2>
                <p className={o(m,"mt-1")}>Change plan, seats, and payment terms before renewal.</p>
              </div>
              <span className={o("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-neutral-900/66 dark:text-neutral-100/66")}>Draft</span>
            </div>
            <ol className="mt-4 flex items-center gap-3">
              {f.map((a,l)=>{
                let i=l<e,u=l===e;
                return (
                  <li key={a} className={o("flex min-w-0 items-center gap-3",l<f.length-1&&"flex-1")}>
                                <button type="button" onClick={()=>r(l)} aria-current={u?"step":undefined} className={o("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",_,"flex min-w-0 cursor-pointer items-center gap-2")}>
                                  <span aria-hidden="true" className={o("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums",i?"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/80 dark:text-neutral-100/80 dark:border-neutral-100/14":u?"border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100":"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14")}>{i?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} />:l+1}</span>
                                  <span className={o(x,i||u?d:c,"hidden truncate sm:block")}>
                                    {a}
                                    <span className="sr-only">{i?", done":u?", current":""}</span>
                                  </span>
                                </button>
                                {l<f.length-1&&<span aria-hidden="true" className={i?"h-px min-w-4 flex-1 bg-neutral-900 dark:bg-neutral-100":"h-px min-w-4 flex-1 bg-neutral-900/8 dark:bg-neutral-100/8"} />}
                              </li>
                );
              })}
            </ol>
          </header>
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 px-6 py-5 lg:grid-cols-5">
            <div role="radiogroup" aria-label="Plan" className="min-w-0 lg:col-span-3">
              <h3 className={k}>Plan</h3>
              <div className={o(u,"mt-3")}>
                {v.map(e=>{
                  let r=e.id===a;
                  return (
                    <div key={e.id} className="py-1">
                                    <label className={o("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",r?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8",_,"px-4 py-3")}>
                                      <input type="radio" name="wz3-plan" value={e.id} checked={r} onChange={()=>j(e.id)} className="size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-[5px] checked:border-[var(--rb-accent,oklch(20.5%_0_0))] checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:border-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:border-[var(--rb-accent,oklch(100%_0_0))] dark:checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:border-neutral-100/40" />
                                      <span className="min-w-0 flex-1">
                                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                          <span className={o(x,"truncate")}>{e.name}</span>
                                          {e.recommended&&<span className={o(h,p)}>Recommended</span>}
                                        </span>
                                        <span className={o(m,"mt-0.5 block")}>{e.blurb}</span>
                                      </span>
                                      <span className={o(x,"shrink-0 tabular-nums")}>
                                        {e.price}
                                        <span className={m}>/seat/mo</span>
                                      </span>
                                    </label>
                                  </div>
                  );
                })}
              </div>
              <p className={o(m,"mt-3")}>
                Seat count carries over from the current term. You can adjust it on the next step before anything is charged.
              </p>
            </div>
            <aside className="min-w-0 lg:col-span-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className={k}>Invoice preview</h3>
                <span className={o(h,p)}>Annual</span>
              </div>
              <div className={o("bg-neutral-900/5 dark:bg-neutral-100/5",_,u,"mt-3")}>
                <div className="px-4 py-3.5">
                  <p className={o(k,"truncate")}>Due today</p>
                  <p className={o("text-[20px]/[24px] font-[450] tracking-[-0.015em]","mt-1 tabular-nums")}>$31,235</p>
                  <p className={o(k,"mt-1 flex flex-wrap gap-x-3")}>
                    <span>Business</span>
                    <span>42 seats</span>
                    <span>Billed once</span>
                  </p>
                </div>
                <dl className={o(u,"px-4 py-1")}>
                  {g.map(e=>(
                    <div key={e.label} className="flex items-center justify-between gap-3 py-2.5">
                                    <div className="min-w-0">
                                      <dt className={o(b,"truncate")}>{e.label}</dt>
                                      <p className={o(k,"mt-0.5 truncate")}>{e.sub}</p>
                                    </div>
                                    <dd className={o(b,"shrink-0 tabular-nums")}>{e.value}</dd>
                                  </div>
                  ))}
                </dl>
                <dl className="space-y-2 px-4 py-3">
                  {w.map(e=>(
                    <div key={e.label} className="flex items-center justify-between gap-3">
                                    <dt className={o(m,"truncate")}>{e.label}</dt>
                                    <dd className={o(b,"shrink-0 tabular-nums")}>{e.value}</dd>
                                  </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
          <div className={o("border-t border-neutral-900/8 dark:border-neutral-100/8","flex shrink-0 items-center justify-between gap-3 px-6 py-4")}>
            <p className={o(m,"truncate")}>Nothing is charged until the review step.</p>
            <button type="button" onClick={()=>r(e=>Math.min(f.length-1,e+1))} className={o("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>
              Next
              <HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
  );
}


export default j;
