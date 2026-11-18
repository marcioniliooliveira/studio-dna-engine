/**
 * React Bits Pro — Application UI (mobile-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  h = "bg-white dark:bg-neutral-950",
  m = "hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5",
  f = "rounded-[var(--rb-r-sm,6px)]",
  k = "text-neutral-900 dark:text-neutral-100",
  v = "text-neutral-900/66 dark:text-neutral-100/66",
  _ = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  g = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  w = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  j = "size-8 rounded-[var(--rb-r-sm,6px)]",
  y = p(m,"active:bg-neutral-900/8 dark:active:bg-neutral-100/8",g),
  N = {Queued:"text-neutral-900 dark:text-neutral-100",Running:"text-neutral-900 dark:text-neutral-100",Succeeded:"text-neutral-900/80 dark:text-neutral-100/80",Failed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"},
  A = [.2,0,0,1],
  z = ["Queue","Running","Done"],
  C = [{label:"Workflows",children:["All workflows","Templates","Scheduled runs","Archive"]},{label:"Data",children:["Sources","Destinations","Field mapping"]},{label:"Runs",children:null},{label:"Alerts",children:null},{label:"Settings",children:["Workspace","Members","Billing","API keys"]}],
  S = {Queue:[{name:"Nightly ledger export",meta:"Starts in 12m",state:"Queued"},{name:"Cedar Labs backfill",meta:"Starts in 40m",state:"Queued"},{name:"Invoice reconciliation",meta:"Starts at 02:00",state:"Queued"}],Running:[{name:"Warehouse sync",meta:"4m 12s elapsed",state:"Running"},{name:"Contact dedupe",meta:"58s elapsed",state:"Running"},{name:"Harbor Coffee import",meta:"2m 04s elapsed",state:"Running"},{name:"Usage rollup",meta:"6m 41s elapsed",state:"Running"},{name:"Invoice PDF batch",meta:"1m 19s elapsed",state:"Running"},{name:"Northwind field mapping",meta:"3m 55s elapsed",state:"Running"},{name:"Alert rule evaluation",meta:"22s elapsed",state:"Running"},{name:"Ledger checksum",meta:"8m 02s elapsed",state:"Running"}],Done:[{name:"Weekly digest",meta:"Finished 21m ago",state:"Succeeded"},{name:"Region failover drill",meta:"Finished 2h ago",state:"Succeeded"},{name:"Legacy import",meta:"Finished 5h ago",state:"Failed"},{name:"Seat audit",meta:"Finished 9h ago",state:"Succeeded"},{name:"Cedar Labs backfill",meta:"Finished 11h ago",state:"Succeeded"},{name:"Nightly ledger export",meta:"Finished 14h ago",state:"Succeeded"},{name:"Contact enrichment",meta:"Finished 18h ago",state:"Failed"},{name:"Warehouse vacuum",meta:"Finished 21h ago",state:"Succeeded"}]};

function R(){
  let e=useReducedMotion(),[t,a]=useState(false),[R,P]=useState("Running"),[W,E]=useState("Workflows"),I=useRef(null);
  useEffect(()=>{
    if(!t)return;
    let e=I.current?.ownerDocument;
    if(!e)return;
    let r=e=>{
      "Escape"===e.key&&a(false)
    };
    return e.addEventListener("keydown",r),()=>e.removeEventListener("keydown",r);
  }, [t]);
  let L=S[R];
  return (
    <div className={p(h,k,"relative flex h-full min-h-[680px] w-full justify-center overflow-hidden p-5")}>
        <div ref={I} className={p("border border-neutral-900/10 dark:border-neutral-100/14",h,"relative flex h-full w-full max-w-[390px] flex-col overflow-hidden rounded-[28px]")}>
          <header className="relative z-20 flex h-14 shrink-0 items-center justify-between gap-2 px-4">
            <button type="button" aria-label="Open menu" aria-expanded={t} onClick={()=>a(true)} className={p(w,j)}>
              <HugeiconsIcon icon={Icon_1836} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <p className={p(_,k,"min-w-0 truncate")}>Runs</p>
            <button type="button" aria-label="New run" className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",j)}>
              <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </header>
          <div className="shrink-0 px-4 pb-2">
            <div role="radiogroup" aria-label="Run status" className={p("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","w-full")}>
              {z.map(e=>{
                let t=e===R;
                return <button key={e} type="button" role="radio" aria-checked={t} onClick={()=>P(e)} className={p("relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40","flex-1")}>{e}</button>;
              })}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-1 pb-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul key={R} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:A}}} transition={{duration:.16*!e,ease:A}} className="space-y-1">
                {L.map(e=>(
                  <li key={e.name}>
                                <button type="button" className={p("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","w-full cursor-pointer text-left")}>
                                  <span className={p(y,"flex min-h-[60px] w-full items-center gap-3 px-3.5 py-3")}>
                                    <span aria-hidden className="flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80"><HugeiconsIcon icon={Icon_48318} size={14} strokeWidth={1.8} /></span>
                                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                      <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.name}</span></span>
                                      <span className="flex min-w-0 items-center gap-2">
                                        <span className={p("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",N[e.state])}>
                                          {"Running"===e.state&&<span className="flex h-lh shrink-0 items-center">
                                            <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />
                                          </span>}
                                          {e.state}
                                        </span>
                                        <span className={p("text-[13px]/[18px] font-normal",v,"min-w-0 truncate")}>{e.meta}</span>
                                      </span>
                                    </span>
                                  </span>
                                </button>
                              </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {t&&<motion.div role="dialog" aria-modal="true" aria-label="Navigation" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:A}}} transition={{duration:.18*!e,ease:A}} className={p(h,"absolute inset-0 z-40 flex flex-col")}>
              <div className="flex h-14 shrink-0 items-center justify-between px-4">
                <p className={p(_,k)}>Meridian</p>
                <button type="button" aria-label="Close menu" onClick={()=>a(false)} className={p(w,j)}>
                  <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="Sections" className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
                {C.map(e=>{
                  let t=W===e.label;
                  return (
                    <div key={e.label}>
                                    <button type="button" aria-expanded={e.children?t:undefined} onClick={()=>e.children?E(t?null:e.label):a(false)} className={p(f,m,g,"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","group flex min-h-[52px] w-full min-w-0 cursor-pointer items-center justify-between gap-3 px-3 text-left")}>
                                      <span className={p("text-[20px]/[24px] font-[450] tracking-[-0.015em]",k,"min-w-0 truncate")}>{e.label}</span>
                                      {e.children?<HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />:null}
                                    </button>
                                    {e.children&&t&&<ul className="pl-3">
                                      {e.children.map(e=>(
                                        <li key={e}>
                                                            <button type="button" onClick={()=>a(false)} className={p("flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100","min-h-[44px] px-3")}>{e}</button>
                                                          </li>
                                      ))}
                                    </ul>}
                                  </div>
                  );
                })}
              </nav>
              <div className="shrink-0 p-3">
                <button type="button" onClick={()=>a(false)} className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",f,"min-h-[56px] w-full justify-start gap-3 px-3 text-left")}>
                  <span aria-hidden className={p("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[36px]")}>
                    <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">AR</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={p("text-[14px]/[16px] font-[450]",k,"block truncate")}>Ana Reyes</span>
                    <span className={p("text-[12px]/[16px] font-normal tabular-nums",v,"mt-0.5 block truncate")}>ana@meridian.example</span>
                  </span>
                </button>
              </div>
            </motion.div>}
          </AnimatePresence>
        </div>
      </div>
  );
}


export default R;
