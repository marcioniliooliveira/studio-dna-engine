/**
 * React Bits Pro — Application UI (navbar-12 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_71344 = [["path",{d:"M10.5279 7.13967C11.3077 5.71322 11.6977 5 11.9958 5C12.294 5 12.6839 5.71322 13.4638 7.13967C14.2665 8.60787 15.3392 9.69316 16.8489 10.52C18.2778 11.3026 18.9922 11.6938 18.9922 11.9923C18.9922 12.2908 18.2773 12.6825 16.8475 13.4658C15.3808 14.2693 14.2966 15.3432 13.4706 16.8545C12.6889 18.2848 12.298 19 11.9998 19C11.7017 19 11.3104 18.2844 10.5279 16.853C9.7252 15.3848 8.65247 14.2995 7.14272 13.4727C5.70903 12.6875 4.99219 12.2949 4.99219 11.9964C4.99219 11.6978 5.70903 11.3052 7.14272 10.52C8.65247 9.69316 9.7252 8.60787 10.5279 7.13967Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let p = (...e)=>e.filter(Boolean).join(" ");

let h = [.2,0,0,1];

let rV = (...e)=>e.filter(Boolean).join(" ");

let r$ = {type:"spring",bounce:0,duration:.35};

let rK = [.2,0,0,1];

let rJ = "text-neutral-900 dark:text-neutral-100";

let rU = "text-[15px]/[20px] font-bold";

let rY = "shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]";

let rQ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let rX = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let rZ = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let r0 = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let r1 = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let r2 = ["Product","Customers","Pricing","Docs"];

let r5 = [{id:"Product",heading:"One workspace for the whole release",body:"Plan, review and ship from a single timeline. Every change carries its own context, so nobody has to reconstruct the story later."},{id:"Customers",heading:"Teams that ship weekly",body:"Harbor Coffee, Cedar Labs and Northwind run their release process here. Median cycle time dropped by a third in the first quarter."},{id:"Pricing",heading:"Priced per released change",body:"No seat minimums and no upgrade gate on collaborators. You pay for what actually reaches production."},{id:"Docs",heading:"Start in under five minutes",body:"Install the CLI, point it at a repository, and the first release timeline builds itself from your existing history."}];


export default function navbar_12__Sorbet__Component(){
  let e=useReducedMotion(),a=useId(),[r,c]=useState("Product"),[d,_]=useState(false),[b,x]=useState(false),u=useRef(null),p=useRef(null);
  useEffect(()=>{
    let e=p.current;
    if(!e)return;
    let a=()=>_(e.scrollTop>8);
    return e.addEventListener("scroll",a,{passive:true}),()=>e.removeEventListener("scroll",a);
  }, []),useEffect(()=>{
    if(!b)return;
    let e=u.current?.ownerDocument;
    if(!e)return;
    let a=e=>{
      "Escape"===e.key&&x(false)
    };
    return e.addEventListener("keydown",a),()=>e.removeEventListener("keydown",a);
  }, [b]);
  let h=r5.find(e=>e.id===r)??r5[0];
  return (
    <div ref={u} className={rV("bg-white dark:bg-neutral-950",rJ,"relative flex h-full min-h-[480px] w-full flex-col overflow-hidden")}>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
          <header className={rV(r1,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]",d&&rY,"pointer-events-auto w-full max-w-[680px] p-1.5")}>
            <div className="flex min-w-0 items-center gap-2">
              <a href="#" className={rV("focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","inline-flex shrink-0 items-center gap-2 pr-1 pl-1.5")}>
                <span aria-hidden="true" className={rV("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] select-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black)]","size-7")}><HugeiconsIcon icon={Icon_71344} size={16} strokeWidth={2} /></span>
                <span className={rU}>Halcyon</span>
              </a>
              <nav aria-label="Primary" className="mx-auto hidden items-center gap-0.5 sm:flex">
                {r2.map(n=>(
                  <button key={n} type="button" aria-current={n===r?"page":undefined} onClick={()=>c(n)} className={rV("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900/78 dark:text-neutral-100/78 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] hover:not-disabled:text-neutral-900 active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:hover:not-disabled:bg-neutral-100/8 dark:hover:not-disabled:text-neutral-100 dark:active:not-disabled:bg-neutral-100/12 dark:aria-expanded:bg-neutral-100/8 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40",rZ)}>
                                {n===r&&<motion.span aria-hidden="true" layoutId={`${a}-nav`} transition={e?{duration:0}:r$} className={rV("bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","absolute inset-0 rounded-[inherit]")} />}
                                <span className={rV("relative",n===r&&rJ)}>{n}</span>
                              </button>
                ))}
              </nav>
              <button type="button" className={rV(rQ,rZ,"ml-auto max-sm:hidden")}>
                Get started
                <HugeiconsIcon icon={Icon_55299} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Open menu" aria-expanded={b} onClick={()=>x(true)} className={rV(rX,r0,"ml-auto sm:hidden")}><HugeiconsIcon icon={Icon_1836} size={18} strokeWidth={2} aria-hidden="true" /></button>
            </div>
          </header>
        </div>
        <div ref={p} className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[680px] px-5 pt-24 pb-10">
            <p className={rV("text-[13px]/[16px] font-semibold tabular-nums","text-neutral-900/62 dark:text-neutral-100/62")}>{h.id}</p>
            <h1 className={rV("text-[34px]/[40px] font-extrabold tracking-[-0.02em]","mt-2")}>{h.heading}</h1>
            <p className={rV("text-[15px]/[22px] font-medium","text-neutral-900/78 dark:text-neutral-100/78","mt-3 max-w-[52ch]")}>{h.body}</p>
            <div className="mt-6 space-y-3">
              {[0,1,2,3].map(e=><div key={e} className={rV("rounded-[calc(var(--rb-r-lg,10px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/8","h-[110px]")} />)}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {b&&<>
            <motion.div aria-hidden="true" onClick={()=>x(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:rK}}} transition={{duration:.18*!e,ease:rK}} className={rV("bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70","absolute inset-0 z-30 sm:hidden")} />
            <motion.div initial={{opacity:0,y:e?0:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:e?0:-8,transition:{duration:.12,ease:rK}}} transition={{duration:.18*!e,ease:rK}} className="absolute inset-x-3 top-3 z-40 origin-top sm:hidden">
              <div className={rV(r1,rY,"p-2")}>
                <div className="flex min-h-8 items-center justify-between pl-1.5">
                  <span className={rU}>Halcyon</span>
                  <button type="button" aria-label="Close menu" onClick={()=>{
                    x(false)
                  }} className={rV(rX,r0)}>
                    <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
                <nav aria-label="Primary" className="mt-1">
                  {r2.map(e=>(
                    <button key={e} type="button" onClick={()=>{
                                    c(e),x(false)
                                  }} className="flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]">{e}</button>
                  ))}
                </nav>
                <button type="button" className={rV(rQ,"h-12 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-6 text-[16px]/[20px] font-extrabold","mt-1 w-full")}>
                  Get started
                  <HugeiconsIcon icon={Icon_55299} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </>}
        </AnimatePresence>
      </div>
  );
}
