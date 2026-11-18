/**
 * React Bits Pro — Application UI (billing-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "rounded-[var(--rb-r-sm,6px)]",
  b = "text-[13px]/[18px] font-normal",
  p = "text-[14px]/[16px] font-[450]",
  h = "text-[12px]/[16px] font-normal tabular-nums",
  m = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  _ = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  f = [{label:"New plan",hint:"Pick a tier"},{label:"Timing",hint:"When it applies"},{label:"Confirm",hint:"Review the change"}],
  v = [{id:"starter",name:"Starter",blurb:"Core billing for small teams getting started.",price:29},{id:"growth",name:"Growth",blurb:"Usage analytics and seat management.",price:89,current:true},{id:"scale",name:"Scale",blurb:"SSO, audit exports, and priority support.",price:249,popular:true},{id:"enterprise",name:"Enterprise",blurb:"Procurement review and account governance.",price:399}],
  k = e=>`$${Math.round(e).toLocaleString("en-US")}`;

function g(){
  let[e,a]=useState("scale"),{ref:r,edges:g,onScroll:w}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:s,clientHeight:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<s-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let s=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),j=v.find(e=>e.current),N=v.find(a=>a.id===e),y=useMemo(()=>{
    let e=20*j.price*.6,a=20*N.price*.6;
    return {credit:e,charge:a,due:a-e};
  }, [j.price,N.price]),z=N.price>j.price?"Upgrade":N.price<j.price?"Downgrade":"No change";
  return (
    <div className={d("bg-white dark:bg-neutral-950",c,"flex h-full min-h-[680px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto min-h-0 w-full max-w-[980px] flex-1")}>
          <div className={d("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","justify-between py-3")}>
            <div className="min-w-0">
              <h2 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Change plan</h2>
              <p className={d("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5 flex flex-wrap gap-x-3")}>
                <span>
                  {"Cedar Labs on "}
                  {j.name}
                </span>
                <span>
                  20
                  {" seats"}
                </span>
              </p>
            </div>
            <span className={d(_,"border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100")}>Draft</span>
          </div>
          <div className={d("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
            <div ref={r} onScroll={w} className="min-h-0 flex-1 overflow-y-auto p-5">
              <ol className="flex items-start gap-2">
                {f.map((e,a)=>(
                  <li key={e.label} className="flex min-w-0 flex-1 items-start gap-2">
                                <div className="flex min-w-0 flex-col items-start gap-1.5">
                                  <span aria-current={0===a?"step":undefined} className={d("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums",0===a?"border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100":"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14")}>{a+1}</span>
                                  <div className="hidden min-w-0 sm:block">
                                    <p className={d(p,"truncate",0===a?c:u)}>
                                      {e.label}
                                      {0===a&&<span className="sr-only">, current</span>}
                                    </p>
                                    <p className={d(h,u,"truncate")}>{e.hint}</p>
                                  </div>
                                </div>
                                {a<f.length-1&&<span aria-hidden className={d("h-px min-w-4 flex-1 bg-neutral-900/8 dark:bg-neutral-100/8","mt-3")} />}
                              </li>
                ))}
              </ol>
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
                <fieldset className="min-w-0">
                  <legend className="sr-only">New plan</legend>
                  <div className="flex flex-col gap-1">
                    {v.map(r=>{
                      let s=r.id===e;
                      return (
                        <label key={r.id} className={d("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",x,s?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","px-3")}>
                                            <input type="radio" name="billing-5-plan" value={r.id} checked={s} onChange={()=>a(r.id)} className="size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-[5px] checked:border-[var(--rb-accent,oklch(20.5%_0_0))] checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:border-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:border-[var(--rb-accent,oklch(100%_0_0))] dark:checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:border-neutral-100/40" />
                                            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                              <span className={d("flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","flex-wrap")}>
                                                <span>{r.name}</span>
                                                {r.current&&<span className={d(h,u)}>Current</span>}
                                                {r.popular&&<span className={d(h,u)}>Most picked</span>}
                                              </span>
                                              <span data-description className="line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">{r.blurb}</span>
                                            </span>
                                            <span className={d(p,"flex shrink-0 items-baseline tabular-nums")}>
                                              $
                                              {r.price}
                                              <span className="ms-0.5 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">/seat</span>
                                            </span>
                                          </label>
                      );
                    })}
                  </div>
                </fieldset>
                <aside className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={p}>Proration</h3>
                    <span className={d(_,"bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>
                      {"Upgrade"===z&&<HugeiconsIcon icon={Icon_1497} size={12} strokeWidth={1.8} aria-hidden="true" />}
                      {z}
                    </span>
                  </div>
                  <p className={d(b,u,"mt-0.5")}>Recalculated as you change the tier.</p>
                  <div className={d("bg-neutral-900/5 dark:bg-neutral-100/5",x,"mt-3 p-4")}>
                    <p className={d(h,u)}>Due today</p>
                    <p className={d("text-[32px]/[36px] font-[450] tabular-nums","mt-1")}>{k(Math.max(y.due,0))}</p>
                    <p className={d(b,u,"mt-2")}>
                      {N.name}
                      {", "}
                      20
                      {" seats, prorated "}
                      18
                      {" days."}
                    </p>
                  </div>
                  <dl className="mt-4 space-y-2.5">
                    {[{label:"Current plan credit",hint:`${j.name}, unused 18 days`,value:`−${k(y.credit)}`},{label:"New plan charge",hint:`${N.name}, 18 days`,value:k(y.charge)},{label:"Next full invoice",hint:"Renews Jul 1",value:k(20*N.price)}].map(e=>(
                      <div key={e.label} className="flex items-baseline justify-between gap-3">
                                        <dt className="min-w-0">
                                          <span className={d(b,"block")}>{e.label}</span>
                                          <span className={d(b,u,"mt-0.5 block truncate")}>{e.hint}</span>
                                        </dt>
                                        <dd className={d(p,"shrink-0 tabular-nums")}>{e.value}</dd>
                                      </div>
                    ))}
                  </dl>
                  <ul className="mt-4 space-y-1.5">
                    {["Seat count carries over unchanged.","Effective immediately once confirmed.","Invoices already issued are unaffected."].map(e=>(
                      <li key={e} className={d(b,u,"flex items-start gap-2")}>
                                        <span className="flex h-lh shrink-0 items-center">
                                          <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" />
                                        </span>
                                        {e}
                                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
            <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",g.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",g.end?"opacity-100":"opacity-0")} />
          </div>
          <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">
            <p className="me-auto hidden sm:block">Nothing is charged until you confirm on step 3.</p>
            <div className="flex items-center gap-2">
              <button type="button" className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",m)}>Cancel</button>
              <button type="button" className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",m)}>
                Continue
                <HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}


export default g;
