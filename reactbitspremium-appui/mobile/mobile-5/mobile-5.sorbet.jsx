/**
 * React Bits Pro — Application UI (mobile-5 (Sorbet))
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

let eU = (...e)=>e.filter(Boolean).join(" ");

let eK = "bg-white dark:bg-neutral-950";

let eY = "hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6";

let eX = "rounded-[var(--rb-r-4xl,18px)]";

let eZ = "text-neutral-900 dark:text-neutral-100";

let e0 = "text-neutral-900/62 dark:text-neutral-100/62";

let e1 = "text-[17px]/[22px] font-extrabold";

let e2 = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]";

let e5 = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let e6 = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let e8 = eU(eY,"active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10",e2);

let e4 = {Queued:"text-neutral-900 dark:text-neutral-100",Running:"text-neutral-900 dark:text-neutral-100",Succeeded:"text-neutral-900/78 dark:text-neutral-100/78",Failed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

let e9 = [.2,0,0,1];

let e3 = ["Queue","Running","Done"];

let e7 = [{label:"Workflows",children:["All workflows","Templates","Scheduled runs","Archive"]},{label:"Data",children:["Sources","Destinations","Field mapping"]},{label:"Runs",children:null},{label:"Alerts",children:null},{label:"Settings",children:["Workspace","Members","Billing","API keys"]}];

let ae = {Queue:[{name:"Nightly ledger export",meta:"Starts in 12m",state:"Queued"},{name:"Cedar Labs backfill",meta:"Starts in 40m",state:"Queued"},{name:"Invoice reconciliation",meta:"Starts at 02:00",state:"Queued"}],Running:[{name:"Warehouse sync",meta:"4m 12s elapsed",state:"Running"},{name:"Contact dedupe",meta:"58s elapsed",state:"Running"},{name:"Harbor Coffee import",meta:"2m 04s elapsed",state:"Running"},{name:"Usage rollup",meta:"6m 41s elapsed",state:"Running"},{name:"Invoice PDF batch",meta:"1m 19s elapsed",state:"Running"},{name:"Northwind field mapping",meta:"3m 55s elapsed",state:"Running"},{name:"Alert rule evaluation",meta:"22s elapsed",state:"Running"},{name:"Ledger checksum",meta:"8m 02s elapsed",state:"Running"}],Done:[{name:"Weekly digest",meta:"Finished 21m ago",state:"Succeeded"},{name:"Region failover drill",meta:"Finished 2h ago",state:"Succeeded"},{name:"Legacy import",meta:"Finished 5h ago",state:"Failed"},{name:"Seat audit",meta:"Finished 9h ago",state:"Succeeded"},{name:"Cedar Labs backfill",meta:"Finished 11h ago",state:"Succeeded"},{name:"Nightly ledger export",meta:"Finished 14h ago",state:"Succeeded"},{name:"Contact enrichment",meta:"Finished 18h ago",state:"Failed"},{name:"Warehouse vacuum",meta:"Finished 21h ago",state:"Succeeded"}]};


export default function mobile_5__Sorbet__Component(){
  let e=useReducedMotion(),[a,t]=useState(false),[c,d]=useState("Running"),[_,b]=useState("Workflows"),u=useRef(null);
  useEffect(()=>{
    if(!a)return;
    let e=u.current?.ownerDocument;
    if(!e)return;
    let r=e=>{
      "Escape"===e.key&&t(false)
    };
    return e.addEventListener("keydown",r),()=>e.removeEventListener("keydown",r);
  }, [a]);
  let x=ae[c];
  return (
    <div className={eU(eK,eZ,"relative flex h-full min-h-[740px] w-full justify-center overflow-hidden p-5")}>
        <div ref={u} className={eU("border border-transparent ring-1 ring-[rgb(84_62_32/0.1)] dark:ring-neutral-100/12",eK,"relative flex h-full w-full max-w-[390px] flex-col overflow-hidden rounded-[28px]")}>
          <header className="relative z-20 flex h-14 shrink-0 items-center justify-between gap-2 px-4">
            <button type="button" aria-label="Open menu" aria-expanded={a} onClick={()=>t(true)} className={eU(e5,e6)}><HugeiconsIcon icon={Icon_1836} size={18} strokeWidth={2} aria-hidden="true" /></button>
            <p className={eU(e1,eZ,"min-w-0 truncate")}>Runs</p>
            <button type="button" aria-label="New run" className={eU("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",e6)}>
              <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </header>
          <div className="shrink-0 px-4 pb-2">
            <div role="radiogroup" aria-label="Run status" className={eU("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","w-full")}>
              {e3.map(e=>{
                let a=e===c;
                return <button key={e} type="button" role="radio" aria-checked={a} onClick={()=>d(e)} className={eU("relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40","flex-1")}>{e}</button>;
              })}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-1 pb-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul key={c} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:e9}}} transition={{duration:.16*!e,ease:e9}} className="space-y-1">
                {x.map(e=>(
                  <li key={e.name}>
                                <button type="button" className={eU("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","w-full cursor-pointer text-left")}>
                                  <span className={eU(e8,"flex min-h-[60px] w-full items-center gap-3 px-3.5 py-3")}>
                                    <span aria-hidden className="flex size-9 shrink-0 items-center justify-center text-neutral-900/78 dark:text-neutral-100/78"><HugeiconsIcon icon={Icon_48318} size={16} strokeWidth={2} /></span>
                                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                      <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100"><span className="truncate">{e.name}</span></span>
                                      <span className="flex min-w-0 items-center gap-2">
                                        <span className={eU("inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums",e4[e.state])}>
                                          {"Running"===e.state&&<span className="flex h-lh shrink-0 items-center">
                                            <span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
                                          </span>}
                                          {e.state}
                                        </span>
                                        <span className={eU("text-[14px]/[20px] font-medium",e0,"min-w-0 truncate")}>{e.meta}</span>
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
            {a&&<motion.div role="dialog" aria-modal="true" aria-label="Navigation" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:e9}}} transition={{duration:.18*!e,ease:e9}} className={eU(eK,"absolute inset-0 z-40 flex flex-col")}>
              <div className="flex h-14 shrink-0 items-center justify-between px-4">
                <p className={eU(e1,eZ)}>Meridian</p>
                <button type="button" aria-label="Close menu" onClick={()=>t(false)} className={eU(e5,e6)}>
                  <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="Sections" className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
                {e7.map(e=>{
                  let a=_===e.label;
                  return (
                    <div key={e.label}>
                                    <button type="button" aria-expanded={e.children?a:undefined} onClick={()=>e.children?b(a?null:e.label):t(false)} className={eU(eX,eY,e2,"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","group flex min-h-[52px] w-full min-w-0 cursor-pointer items-center justify-between gap-3 px-3 text-left")}>
                                      <span className={eU("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",eZ,"min-w-0 truncate")}>{e.label}</span>
                                      {e.children?<HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />:null}
                                    </button>
                                    {e.children&&a&&<ul className="pl-3">
                                      {e.children.map(e=>(
                                        <li key={e}>
                                                            <button type="button" onClick={()=>t(false)} className={eU("flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]","min-h-[44px] px-3")}>{e}</button>
                                                          </li>
                                      ))}
                                    </ul>}
                                  </div>
                  );
                })}
              </nav>
              <div className="shrink-0 p-3">
                <button type="button" onClick={()=>t(false)} className={eU("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",eX,"min-h-[56px] w-full justify-start gap-3 px-3 text-left")}>
                  <span aria-hidden className={eU("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[36px]")}>
                    <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">AR</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={eU("text-[15px]/[20px] font-bold",eZ,"block truncate")}>Ana Reyes</span>
                    <span className={eU("text-[13px]/[16px] font-semibold tabular-nums",e0,"mt-0.5 block truncate")}>ana@meridian.example</span>
                  </span>
                </button>
              </div>
            </motion.div>}
          </AnimatePresence>
        </div>
      </div>
  );
}
