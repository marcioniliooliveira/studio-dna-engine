/**
 * React Bits Pro — Application UI (notifications-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_94089 = [["path",{d:"M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L10.5 15L16 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_46772 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 16V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 8.25H12M12.25 8.25C12.25 8.11193 12.1381 8 12 8C11.8619 8 11.75 8.11193 11.75 8.25C11.75 8.38807 11.8619 8.5 12 8.5C12.1381 8.5 12.25 8.38807 12.25 8.25Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_68099 = [["path",{d:"M21.9961 12C21.9961 17.5228 17.5189 22 11.9961 22C6.47325 22 1.99609 17.5228 1.99609 12C1.99609 6.47715 6.47325 2 11.9961 2",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62955 = [["path",{d:"M3 8H15C18.3137 8 21 10.6863 21 14C21 17.3137 18.3137 20 15 20H11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 4L5.8462 4.87652C3.94873 6.31801 3 7.03875 3 8C3 8.96125 3.94873 9.68199 5.8462 11.1235L7 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let U = (...e)=>e.filter(Boolean).join(" ");

let H = "text-neutral-900 dark:text-neutral-100";

let $ = "text-neutral-900/78 dark:text-neutral-100/78";

let B = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let Y = U("text-[17px]/[22px] font-extrabold",H);

let F = U("text-[14px]/[20px] font-medium","text-neutral-900/62 dark:text-neutral-100/62");

let V = [.2,0,0,1];

let Q = {type:"spring",bounce:0,duration:.35};

let K = [{variant:"success",label:"Success",title:"Deployment live",body:"halcyon-web, production, 42s",undo:true},{variant:"error",label:"Error",title:"Import failed",body:"Row 118 has an unmapped column."},{variant:"info",label:"Info",title:"Wei Chen shared a board",body:"Q3 rollout, you have edit access."},{variant:"loading",label:"Progress",title:"Uploading contacts",body:"2,480 records from Northwind."}];

let X = {success:Icon_94089,error:Icon_27476,info:Icon_46772,loading:Icon_68099};

let G = {success:$,error:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",info:$,loading:$};

function J({item:e,paused:r,onDismiss:a,onSettle:l,children:c}){
  let d=useReducedMotion(),{id:_,variant:x}=e;
  return useEffect(()=>{
    if("loading"!==x)return;
    let e=window.setTimeout(()=>l(_),2200);
    return ()=>window.clearTimeout(e);
  }, [_,x,l]),useEffect(()=>{
    if(r||"loading"===x)return;
    let e=window.setTimeout(()=>a(_),6e3);
    return ()=>window.clearTimeout(e);
  }, [_,r,x,a]),<div className={U("pointer-events-auto grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-x-3 overflow-hidden rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] py-3.5 ps-4 pe-2 text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","relative h-full")}>
    <div className="flex min-w-0 items-start gap-3 self-center">
      {c}
      <div className="min-w-0 flex-1">
        <p className={U("text-[15px]/[20px] font-extrabold","truncate")}>{e.title}</p>
        <p className={U("mt-0.5 text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","truncate")}>{e.body}</p>
      </div>
    </div>
    {e.undo&&<button type="button" onClick={()=>a(_)} className={U(B,"h-7 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-[13px]/[16px] font-bold tabular-nums","self-center")}>
      <HugeiconsIcon icon={Icon_62955} size={16} strokeWidth={2} aria-hidden="true" />
      Undo
    </button>}
    <button type="button" onClick={()=>a(_)} aria-label="Dismiss" className={U("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-7 rounded-[calc(var(--rb-r-full,999px))]","col-start-3 self-center")}>
      <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
    </button>
    {"loading"!==x&&!d&&<motion.span key={r?"paused":"running"} initial={{scaleX:1}} animate={{scaleX:+!!r}} transition={{duration:6*!r,ease:"linear"}} className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left bg-[var(--rb-accent,oklch(84%_0.15_165))] motion-reduce:hidden dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]" />}
  </div>;
}


export default function notifications_2__Sorbet__Component(){
  let e=useReducedMotion(),r=useRef(0),[a,c]=useState([]),[d,_]=useState(false),x=useCallback(e=>c(r=>r.filter(r=>r.id!==e)), []),b=useCallback(e=>c(r=>r.map(r=>r.id===e?{...r,variant:"success",title:"Contacts imported",body:"2,480 records added to Northwind."}:r)), []),u=a.slice(0,5);
  return (
    <div className={U("bg-white dark:bg-neutral-950",H,"relative flex h-full min-h-[620px] w-full flex-col overflow-hidden")}>
        <div className="flex flex-1 items-center justify-center p-5">
          <div className={U("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","w-full max-w-[420px]")}>
            <div className={U("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","mt-1 px-3 py-3")}>
              <h2 className={Y}>Toast notifications</h2>
              <p className={U(F,"mt-1")}>Transient messages stack in the corner, collapse when idle and expand on hover.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {K.map(e=>(
                  <button key={e.variant} type="button" onClick={()=>{
                                let a;
                                return r.current+=1,a=`t${r.current}`,void c(r=>[{id:a,...e,title:e.title,body:e.body},...r]);
                              }} className={U(B,"h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
                                <span className={G[e.variant]}>
                                  <HugeiconsIcon icon={X[e.variant]} size={18} strokeWidth={2} aria-hidden="true" />
                                </span>
                                {e.label}
                              </button>
                ))}
              </div>
            </div>
            <div className="flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5">
              <span className="me-auto">{0===a.length?"No active toasts":`${a.length} active`}</span>
              <button type="button" onClick={()=>c([])} disabled={0===a.length} className={U(B,"h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold")}>Clear all</button>
            </div>
          </div>
        </div>
        <div aria-live="polite" aria-label="Notifications" onMouseEnter={()=>_(true)} onMouseLeave={()=>_(false)} onFocus={()=>_(true)} onBlur={e=>{
          e.currentTarget.contains(e.relatedTarget)||_(false)
        }} style={{height:76}} className="pointer-events-none absolute right-5 bottom-5 left-5 sm:left-auto sm:w-[360px]">
          <AnimatePresence initial={false}>
            {u.map((r,a)=>{
              let n=Math.min(a,3);
              return (
                <motion.div key={r.id} initial={!e&&{opacity:0}} animate={{opacity:a>3?0:1,y:d?-(84*a):-(10*n),scale:d?1:1-.04*n}} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:V}}} transition={e?{duration:0}:{...Q,opacity:{duration:.16,ease:V}}} style={{zIndex:50-a,height:76}} className="pointer-events-auto absolute inset-x-0 bottom-0 origin-bottom">
                            <J item={r} paused={d} onDismiss={x} onSettle={b}>
                              <span className={U("shrink-0",G[r.variant])}>
                                {"loading"===r.variant?<span className="flex size-4 items-center justify-center">
                                  <span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
                                </span>:<HugeiconsIcon icon={X[r.variant]} size={18} strokeWidth={2} aria-hidden="true" />}
                              </span>
                            </J>
                          </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
  );
}
