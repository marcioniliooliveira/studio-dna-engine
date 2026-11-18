/**
 * React Bits Pro — Application UI (notifications-5)
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

let f = (...e)=>e.filter(Boolean).join(" "),
  v = "text-neutral-900 dark:text-neutral-100",
  k = "text-neutral-900/66 dark:text-neutral-100/66",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  g = "mt-0.5 shrink-0 text-neutral-900/80 dark:text-neutral-100/80",
  w = f("text-[16px]/[20px] font-[450] tracking-[-0.015em]",v),
  y = f("text-[13px]/[18px] font-normal",k),
  j = f("text-[12px]/[16px] font-normal tabular-nums",k),
  N = f("font-mono text-[12px]/[16px] tabular-nums","text-neutral-900/80 dark:text-neutral-100/80"),
  A = f("text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]","mt-0.5 shrink-0"),
  z = f("text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]","mt-0.5 shrink-0"),
  S = f("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full"),
  C = f("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","block h-full"),
  R = [.2,0,0,1],
  E = {info:Icon_46772,warning:Icon_36474,error:Icon_27476,success:Icon_94089,usage:Icon_46176},
  W = {info:g,warning:A,error:z,success:g,usage:g},
  M = [{id:"b1",tone:"info",title:"Scheduled maintenance on Sunday",body:"Halcyon will be read-only from 02:00 to 04:00 UTC while we migrate the ingest cluster.",quiet:"Read the notice"},{id:"b2",tone:"warning",title:"Your card expires in 6 days",body:"Renewal for Cedar Labs is due on 12 November. Update the payment method to avoid an interruption.",action:"Update card",quiet:"Remind me later"},{id:"b3",tone:"error",title:"3 of 5 imports failed",body:"The Northwind sync stopped after repeated schema errors. Nothing was written for the failed files.",action:"Retry failed",details:["contacts-oct.csv: unmapped column at row 118","accounts-eu.csv: duplicate primary key 'NW-4471'","deals-q3.csv: date parsed outside the allowed range"]},{id:"b4",tone:"success",title:"meridian.example is verified",body:"DNS records propagated and the certificate was issued. Outbound mail now sends from this domain.",quiet:"View DNS"},{id:"b5",tone:"usage",title:"You have used 84% of your monthly events",body:"At the current rate the workspace reaches its limit around 26 November.",action:"Increase limit",meter:{used:4.2,limit:5,unit:"M events"}}];

function D(){
  let e=useReducedMotion(),[r,t]=useState(M),[d,c]=useState(null),{ref:u,edges:x,onScroll:b}=function(e){
    let r=useRef(null),[t,a]=useState({start:false,end:false}),i=useCallback(()=>{
      let e=r.current;
      if(!e)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:i}=e;
      a({start:t>1,end:Math.ceil(t+i)<n-1})
    }, []);
    return useEffect(()=>{
      i();
      let e=r.current,t=e?.ownerDocument.defaultView;
      if(!e||!t?.ResizeObserver)return;
      let a=new t.ResizeObserver(i);
      return a.observe(e),()=>a.disconnect();
    }, [i,e]),{ref:r,edges:t,onScroll:i};
  }(`${r.length}-${d}`),k=e=>t(r=>r.filter(r=>r.id!==e));
  return (
    <div className={f("bg-white dark:bg-neutral-950",v,"relative flex h-full min-h-[620px] w-full flex-col overflow-hidden")}>
        <header className={f("border-b border-neutral-900/8 dark:border-neutral-100/8","flex flex-wrap items-center justify-between gap-3 px-5 py-4")}>
          <div>
            <h2 className={w}>System messages</h2>
            <p className={f(y,"mt-1")}>Persistent banners for account, billing and platform state.</p>
          </div>
          <button type="button" onClick={()=>{
            t(M),c(null)
          }} disabled={r.length===M.length} className={f(_,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
            <HugeiconsIcon icon={Icon_3810} size={16} strokeWidth={1.8} aria-hidden="true" />
            Restore all
          </button>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={u} onScroll={b} className="h-full overflow-y-auto p-5">
            {0===r.length?<div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 text-center">
              <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No messages</p>
              <div className="max-w-[30ch]">
                <p className="max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">Dismissed banners do not come back unless the condition repeats.</p>
              </div>
            </div>:<ul className="space-y-3">
              <AnimatePresence initial={false}>
                {r.map(r=>{
                  let t,n=d===r.id;
                  return (
                    <motion.li key={r.id} layout={!e&&"position"} initial={false} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:R}}} transition={{duration:.16,ease:R}} className="overflow-hidden">
                                    <div className="flex w-full min-w-0 items-start gap-3 rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-4 py-3 text-neutral-900 dark:text-neutral-100">
                                      <div className="flex w-full min-w-0 gap-3">
                                        <span className={W[r.tone]}>
                                          <HugeiconsIcon icon={E[r.tone]} size={16} strokeWidth={1.8} aria-hidden="true" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                          <p className="text-[14px]/[20px] font-[450]">{r.title}</p>
                                          <p className={f("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-[68ch]")}>{r.body}</p>
                                          {r.meter&&<div className="mt-3 max-w-[320px]">
                                            <div className="relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7">
                                              <span className={(t=r.meter.used/r.meter.limit)>.95?C:t>.8?S:"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100"} style={{width:`${r.meter.used/r.meter.limit*100}%`}} />
                                            </div>
                                            <p className={f(j,"mt-1.5")}>
                                              {r.meter.used}
                                              {" of "}
                                              {r.meter.limit}
                                              {" "}
                                              {r.meter.unit}
                                            </p>
                                          </div>}
                                          {r.details&&<>
                                            <button type="button" onClick={()=>c(n?null:r.id)} aria-expanded={n} className={f("group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","mt-2")}>
                                              <span className="flex size-4 shrink-0 items-center justify-center">
                                                <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                              </span>
                                              {n?"Hide details":"Show details"}
                                            </button>
                                            {n&&<ul className={f("bg-neutral-900/5 dark:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-2")}>{r.details.map(e=><li key={e} className={f(N,"px-3 py-2")}>{e}</li>)}</ul>}
                                          </>}
                                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                                            {r.action&&<button type="button" className={f(_,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>{r.action}</button>}
                                            {r.quiet&&<button type="button" onClick={()=>k(r.id)} className="inline-flex min-h-6 items-center gap-1 rounded-[var(--rb-r-sm,6px)] text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 decoration-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]">{r.quiet}</button>}
                                          </div>
                                        </div>
                                        <button type="button" onClick={()=>k(r.id)} aria-label={`Dismiss: ${r.title}`} className={f("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]","-mt-1 -mr-1")}>
                                          <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                                        </button>
                                      </div>
                                    </div>
                                  </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>}
          </div>
          <div aria-hidden="true" className={f("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",x.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={f("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",x.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default D;
