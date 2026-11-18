/**
 * React Bits Pro — Application UI (notifications-2)
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

let h = (...e)=>e.filter(Boolean).join(" "),
  m = "text-neutral-900 dark:text-neutral-100",
  f = "text-neutral-900/80 dark:text-neutral-100/80",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  k = h("text-[16px]/[20px] font-[450] tracking-[-0.015em]",m),
  _ = h("text-[13px]/[18px] font-normal","text-neutral-900/66 dark:text-neutral-100/66"),
  g = [.2,0,0,1],
  w = {type:"spring",bounce:0,duration:.35},
  y = [{variant:"success",label:"Success",title:"Deployment live",body:"halcyon-web, production, 42s",undo:true},{variant:"error",label:"Error",title:"Import failed",body:"Row 118 has an unmapped column."},{variant:"info",label:"Info",title:"Wei Chen shared a board",body:"Q3 rollout, you have edit access."},{variant:"loading",label:"Progress",title:"Uploading contacts",body:"2,480 records from Northwind."}],
  j = {success:Icon_94089,error:Icon_27476,info:Icon_46772,loading:Icon_68099},
  N = {success:f,error:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",info:f,loading:f};

function A(){
  let e=useReducedMotion(),r=useRef(0),[t,d]=useState([]),[c,u]=useState(false),x=useCallback(e=>d(r=>r.filter(r=>r.id!==e)), []),b=useCallback(e=>d(r=>r.map(r=>r.id===e?{...r,variant:"success",title:"Contacts imported",body:"2,480 records added to Northwind."}:r)), []),p=t.slice(0,5);
  return (
    <div className={h("bg-white dark:bg-neutral-950",m,"relative flex h-full min-h-[620px] w-full flex-col overflow-hidden")}>
        <div className="flex flex-1 items-center justify-center p-5">
          <div className={h("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","w-full max-w-[420px]")}>
            <div className={h("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","mt-1 px-3 py-3")}>
              <h2 className={k}>Toast notifications</h2>
              <p className={h(_,"mt-1")}>Transient messages stack in the corner, collapse when idle and expand on hover.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {y.map(e=>(
                  <button key={e.variant} type="button" onClick={()=>{
                                let t;
                                return r.current+=1,t=`t${r.current}`,void d(r=>[{id:t,...e,title:e.title,body:e.body},...r]);
                              }} className={h(v,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                                <span className={N[e.variant]}>
                                  <HugeiconsIcon icon={j[e.variant]} size={16} strokeWidth={1.8} aria-hidden="true" />
                                </span>
                                {e.label}
                              </button>
                ))}
              </div>
            </div>
            <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">
              <span className="me-auto">{0===t.length?"No active toasts":`${t.length} active`}</span>
              <button type="button" onClick={()=>d([])} disabled={0===t.length} className={h(v,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>Clear all</button>
            </div>
          </div>
        </div>
        <div aria-live="polite" aria-label="Notifications" onMouseEnter={()=>u(true)} onMouseLeave={()=>u(false)} onFocus={()=>u(true)} onBlur={e=>{
          e.currentTarget.contains(e.relatedTarget)||u(false)
        }} style={{height:76}} className="pointer-events-none absolute right-5 bottom-5 left-5 sm:left-auto sm:w-[360px]">
          <AnimatePresence initial={false}>
            {p.map((r,t)=>{
              let n=Math.min(t,3);
              return (
                <motion.div key={r.id} initial={!e&&{opacity:0}} animate={{opacity:t>3?0:1,y:c?-(84*t):-(10*n),scale:c?1:1-.04*n}} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:g}}} transition={e?{duration:0}:{...w,opacity:{duration:.16,ease:g}}} style={{zIndex:50-t,height:76}} className="pointer-events-auto absolute inset-x-0 bottom-0 origin-bottom">
                            <z item={r} paused={c} onDismiss={x} onSettle={b}>
                              <span className={h("shrink-0",N[r.variant])}>
                                {"loading"===r.variant?<span className="flex size-4 items-center justify-center">
                                  <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />
                                </span>:<HugeiconsIcon icon={j[r.variant]} size={16} strokeWidth={1.8} aria-hidden="true" />}
                              </span>
                            </z>
                          </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
  );
}

function z({item:e,paused:r,onDismiss:t,onSettle:l,children:d}){
  let c=useReducedMotion(),{id:u,variant:x}=e;
  return useEffect(()=>{
    if("loading"!==x)return;
    let e=window.setTimeout(()=>l(u),2200);
    return ()=>window.clearTimeout(e);
  }, [u,x,l]),useEffect(()=>{
    if(r||"loading"===x)return;
    let e=window.setTimeout(()=>t(u),6e3);
    return ()=>window.clearTimeout(e);
  }, [u,r,x,t]),<div className={h("pointer-events-auto grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-x-3 overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 py-3 ps-4 pe-2 text-neutral-900 dark:text-neutral-100 shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","relative h-full")}>
    <div className="flex min-w-0 items-start gap-3 self-center">
      {d}
      <div className="min-w-0 flex-1">
        <p className={h("text-[14px]/[16px] font-[450]","truncate")}>{e.title}</p>
        <p className={h("mt-0.5 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","truncate")}>{e.body}</p>
      </div>
    </div>
    {e.undo&&<button type="button" onClick={()=>t(u)} className={h(v,"h-6 gap-1 rounded-[var(--rb-r-sm,6px)] px-2 text-[12px]/[16px] font-[450] tabular-nums","self-center")}>
      <HugeiconsIcon icon={Icon_62955} size={14} strokeWidth={1.8} aria-hidden="true" />
      Undo
    </button>}
    <button type="button" onClick={()=>t(u)} aria-label="Dismiss" className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-6 rounded-[var(--rb-r-sm,6px)]","col-start-3 self-center")}>
      <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
    </button>
    {"loading"!==x&&!c&&<motion.span key={r?"paused":"running"} initial={{scaleX:1}} animate={{scaleX:+!!r}} transition={{duration:6*!r,ease:"linear"}} className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-neutral-900/66 motion-reduce:hidden dark:bg-neutral-100/66" />}
  </div>;
}


export default A;
