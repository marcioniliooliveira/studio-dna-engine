/**
 * React Bits Pro — Application UI (notifications-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_46772 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 16V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 8.25H12M12.25 8.25C12.25 8.11193 12.1381 8 12 8C11.8619 8 11.75 8.11193 11.75 8.25C11.75 8.38807 11.8619 8.5 12 8.5C12.1381 8.5 12.25 8.38807 12.25 8.25Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_94089 = [["path",{d:"M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L10.5 15L16 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_46176 = [["path",{d:"M5.22576 11.3294L12.224 2.34651C12.7713 1.64397 13.7972 2.08124 13.7972 3.01707V9.96994C13.7972 10.5305 14.1995 10.985 14.6958 10.985H18.0996C18.8729 10.985 19.2851 12.0149 18.7742 12.6706L11.776 21.6535C11.2287 22.356 10.2028 21.9188 10.2028 20.9829V14.0301C10.2028 13.4695 9.80048 13.015 9.3042 13.015H5.90035C5.12711 13.015 4.71494 11.9851 5.22576 11.3294Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_3810 = [["path",{d:"M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.79275 3 5.97733 4.67765 4.38341 7.20327M3.29339 3.00076L3.46556 5.05452C3.58958 6.53384 3.65159 7.27349 4.13359 7.68914C4.61559 8.10479 5.32673 8.03185 6.74899 7.88595L8.79339 7.67625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let eX = (...e)=>e.filter(Boolean).join(" ");

let eG = "text-neutral-900 dark:text-neutral-100";

let eJ = "text-neutral-900/62 dark:text-neutral-100/62";

let eZ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let e0 = "mt-0.5 shrink-0 text-neutral-900/78 dark:text-neutral-100/78";

let e1 = eX("text-[17px]/[22px] font-extrabold",eG);

let e2 = eX("text-[14px]/[20px] font-medium",eJ);

let e5 = eX("text-[13px]/[16px] font-semibold tabular-nums",eJ);

let e8 = eX("font-mono text-[12px]/[16px] tabular-nums","text-neutral-900/78 dark:text-neutral-100/78");

let e6 = eX("text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","mt-0.5 shrink-0");

let e4 = eX("text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]","mt-0.5 shrink-0");

let e9 = eX("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full");

let e3 = eX("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","block h-full");

let e7 = [.2,0,0,1];

let re = {info:Icon_46772,warning:Icon_36474,error:Icon_27476,success:Icon_94089,usage:Icon_46176};

let rr = {info:e0,warning:e6,error:e4,success:e0,usage:e0};

let ra = [{id:"b1",tone:"info",title:"Scheduled maintenance on Sunday",body:"Halcyon will be read-only from 02:00 to 04:00 UTC while we migrate the ingest cluster.",quiet:"Read the notice"},{id:"b2",tone:"warning",title:"Your card expires in 6 days",body:"Renewal for Cedar Labs is due on 12 November. Update the payment method to avoid an interruption.",action:"Update card",quiet:"Remind me later"},{id:"b3",tone:"error",title:"3 of 5 imports failed",body:"The Northwind sync stopped after repeated schema errors. Nothing was written for the failed files.",action:"Retry failed",details:["contacts-oct.csv: unmapped column at row 118","accounts-eu.csv: duplicate primary key 'NW-4471'","deals-q3.csv: date parsed outside the allowed range"]},{id:"b4",tone:"success",title:"meridian.example is verified",body:"DNS records propagated and the certificate was issued. Outbound mail now sends from this domain.",quiet:"View DNS"},{id:"b5",tone:"usage",title:"You have used 84% of your monthly events",body:"At the current rate the workspace reaches its limit around 26 November.",action:"Increase limit",meter:{used:4.2,limit:5,unit:"M events"}}];


export default function notifications_5__Sorbet__Component(){
  let e=useReducedMotion(),[r,a]=useState(ra),[c,d]=useState(null),{ref:_,edges:x,onScroll:b}=function(e){
    let r=useRef(null),[a,t]=useState({start:false,end:false}),i=useCallback(()=>{
      let e=r.current;
      if(!e)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i}=e;
      t({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      i();
      let e=r.current,a=e?.ownerDocument.defaultView;
      if(!e||!a?.ResizeObserver)return;
      let t=new a.ResizeObserver(i);
      return t.observe(e),()=>t.disconnect();
    }, [i,e]),{ref:r,edges:a,onScroll:i};
  }(`${r.length}-${c}`),u=e=>a(r=>r.filter(r=>r.id!==e));
  return (
    <div className={eX("bg-white dark:bg-neutral-950",eG,"relative flex h-full min-h-[700px] w-full flex-col overflow-hidden")}>
        <header className={eX("border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","flex flex-wrap items-center justify-between gap-3 px-5 py-4")}>
          <div>
            <h2 className={e1}>System messages</h2>
            <p className={eX(e2,"mt-1")}>Persistent banners for account, billing and platform state.</p>
          </div>
          <button type="button" onClick={()=>{
            a(ra),d(null)
          }} disabled={r.length===ra.length} className={eX(eZ,"h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
            <HugeiconsIcon icon={Icon_3810} size={18} strokeWidth={2} aria-hidden="true" />
            Restore all
          </button>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={_} onScroll={b} className="h-full overflow-y-auto p-5">
            {0===r.length?<div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 text-center">
              <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No messages</p>
              <div className="max-w-[30ch]">
                <p className="max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78">Dismissed banners do not come back unless the condition repeats.</p>
              </div>
            </div>:<ul className="space-y-3">
              <AnimatePresence initial={false}>
                {r.map(r=>{
                  let a,n=c===r.id;
                  return (
                    <motion.li key={r.id} layout={!e&&"position"} initial={false} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:e7}}} transition={{duration:.16,ease:e7}} className="overflow-hidden">
                                    <div className="flex w-full min-w-0 items-start gap-3 rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] px-4 py-3.5 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.11)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.07)]">
                                      <div className="flex w-full min-w-0 gap-3">
                                        <span className={rr[r.tone]}>
                                          <HugeiconsIcon icon={re[r.tone]} size={18} strokeWidth={2} aria-hidden="true" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                          <p className="text-[15px]/[22px] font-extrabold">{r.title}</p>
                                          <p className={eX("text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1 max-w-[68ch]")}>{r.body}</p>
                                          {r.meter&&<div className="mt-3 max-w-[320px]">
                                            <div className="relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
                                              <span className={(a=r.meter.used/r.meter.limit)>.95?e3:a>.8?e9:"block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]"} style={{width:`${r.meter.used/r.meter.limit*100}%`}} />
                                            </div>
                                            <p className={eX(e5,"mt-1.5")}>
                                              {r.meter.used}
                                              {" of "}
                                              {r.meter.limit}
                                              {" "}
                                              {r.meter.unit}
                                            </p>
                                          </div>}
                                          {r.details&&<>
                                            <button type="button" onClick={()=>d(n?null:r.id)} aria-expanded={n} className={eX("group -mx-2 flex min-h-9 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[calc(var(--rb-r-lg,10px))] px-2 text-left text-[14px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:hover:bg-neutral-100/6 dark:active:bg-neutral-100/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","mt-2")}>
                                              <span className="flex size-[18px] shrink-0 items-center justify-center">
                                                <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                              </span>
                                              {n?"Hide details":"Show details"}
                                            </button>
                                            {n&&<ul className={eX("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]","rounded-[var(--rb-r-4xl,18px)]","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-2")}>{r.details.map(e=><li key={e} className={eX(e8,"px-3 py-2")}>{e}</li>)}</ul>}
                                          </>}
                                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                                            {r.action&&<button type="button" className={eX(eZ,"h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold")}>{r.action}</button>}
                                            {r.quiet&&<button type="button" onClick={()=>u(r.id)} className="inline-flex min-h-6 items-center gap-1 rounded-[calc(var(--rb-r-sm,6px))] text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100 underline decoration-[var(--rb-accent,oklch(84%_0.15_165))] decoration-[3px] underline-offset-[5px] transition-[text-decoration-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:decoration-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:decoration-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:decoration-[var(--rb-accent,oklch(81%_0.16_163))]">{r.quiet}</button>}
                                          </div>
                                        </div>
                                        <button type="button" onClick={()=>u(r.id)} aria-label={`Dismiss: ${r.title}`} className={eX("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-8 rounded-[calc(var(--rb-r-full,999px))]","-mt-1 -mr-1")}>
                                          <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
                                        </button>
                                      </div>
                                    </div>
                                  </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>}
          </div>
          <div aria-hidden="true" className={eX("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",x.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={eX("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",x.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}
