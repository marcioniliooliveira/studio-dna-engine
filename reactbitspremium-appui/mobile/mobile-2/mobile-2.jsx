/**
 * React Bits Pro — Application UI (mobile-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_92190 = [["path",{d:"M11 6L21 6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 12L21 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 18L21 18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_68686 = [["path",{d:"M7 6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5V11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5V6.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.5 19H11.0828C7.57267 19 4.57706 16.4623 4 13M11.5 19H11.9172C15.4273 19 18.4229 16.4623 19 13M11.5 19V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_33276 = [["path",{d:"M12.6974 3.5H11.303C10.5884 3.5 10.2311 3.5 9.91067 3.612C9.71499 3.68039 9.53113 3.77879 9.36568 3.90367C9.09474 4.10816 8.89655 4.40544 8.50018 5L8.50017 5.00001C8.29717 5.30453 7.99794 5.75337 7.87867 5.87871C7.58314 6.18927 7.19563 6.39666 6.77329 6.47029C6.60284 6.5 6.41985 6.5 6.05387 6.5C5.07379 6.5 4.58376 6.5 4.18307 6.61342C3.18074 6.89716 2.39734 7.68055 2.1136 8.68289C2.00018 9.08357 2.00018 9.57361 2.00018 10.5537V14.5C2.00018 17.3284 2.00018 18.7426 2.87886 19.6213C3.75754 20.5 5.17176 20.5 8.00018 20.5H16.0002C18.8286 20.5 20.2428 20.5 21.1215 19.6213C22.0002 18.7426 22.0002 17.3284 22.0002 14.5V10.5537C22.0002 9.57361 22.0002 9.08357 21.8868 8.68289C21.603 7.68055 20.8196 6.89716 19.8173 6.61342C19.4166 6.5 18.9266 6.5 17.9465 6.5C17.5805 6.5 17.3975 6.5 17.2271 6.47029C16.8047 6.39666 16.4172 6.18927 16.1217 5.87871C16.0024 5.75336 15.7032 5.30451 15.5002 5C15.1038 4.40544 14.9056 4.10816 14.6347 3.90367C14.4692 3.77879 14.2854 3.68039 14.0897 3.612C13.7693 3.5 13.412 3.5 12.6974 3.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.0002 13C16.0002 15.2091 14.2093 17 12.0002 17C9.79104 17 8.00018 15.2091 8.00018 13C8.00018 10.7909 9.79104 9 12.0002 9C14.2093 9 16.0002 10.7909 16.0002 13Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M19.1252 9.5H19.0002M19.2502 9.5C19.2502 9.63807 19.1383 9.75 19.0002 9.75C18.8621 9.75 18.7502 9.63807 18.7502 9.5C18.7502 9.36193 18.8621 9.25 19.0002 9.25C19.1383 9.25 19.2502 9.36193 19.2502 9.5Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_48094 = [["path",{d:"M5.82338 12L4.27922 10.4558C2.57359 8.75022 2.57359 5.98485 4.27922 4.27922C5.98485 2.57359 8.75022 2.57359 10.4558 4.27922L19.7208 13.5442C21.4264 15.2498 21.4264 18.0152 19.7208 19.7208C18.0152 21.4264 15.2498 21.4264 13.5442 19.7208L10.0698 16.2464C9.00379 15.1804 9.00379 13.4521 10.0698 12.386C11.1358 11.32 12.8642 11.32 13.9302 12.386L15.8604 14.3162",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_94089 = [["path",{d:"M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L10.5 15L16 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let m = (...e)=>e.filter(Boolean).join(" "),
  f = "bg-white dark:bg-neutral-950",
  k = "text-neutral-900 dark:text-neutral-100",
  v = "text-neutral-900/66 dark:text-neutral-100/66",
  _ = "text-[12px]/[16px] font-normal tabular-nums",
  g = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  w = {type:"spring",bounce:0,duration:.35},
  j = [.2,0,0,1],
  y = [{id:"task",label:"New task",icon:Icon_92190},{id:"note",label:"Voice note",icon:Icon_68686},{id:"photo",label:"Photo",icon:Icon_33276},{id:"file",label:"Attach file",icon:Icon_48094}],
  N = [{id:"s1",title:"Send the Northwind renewal quote",meta:"Due today"},{id:"s2",title:"Review Cedar Labs onboarding notes",meta:"Due today"},{id:"s3",title:"Approve the refund for order 4192",meta:"Tomorrow"},{id:"s4",title:"Draft the Q3 pipeline summary",meta:"Thursday"},{id:"s5",title:"Call Harbor Coffee about seat count",meta:"Friday"},{id:"s6",title:"Close out the Meridian pilot checklist",meta:"Friday"},{id:"s7",title:"Update the Q3 forecast assumptions",meta:"Next week"}];

function A(){
  let e=useReducedMotion(),[t,a]=useState(false),[c,d]=useState(N),[u,x]=useState(0),A=useRef(null);
  return useEffect(()=>{
    if(!t)return;
    let e=A.current?.ownerDocument;
    if(!e)return;
    let r=e=>{
      "Escape"===e.key&&a(false)
    };
    return e.addEventListener("keydown",r),()=>e.removeEventListener("keydown",r);
  }, [t]),<div className={m(f,k,"relative flex h-full min-h-[680px] w-full justify-center overflow-hidden p-5")}>
    <div ref={A} className={m("border border-neutral-900/10 dark:border-neutral-100/14",f,"relative flex h-full w-full max-w-[390px] flex-col overflow-hidden rounded-[28px]")}>
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 px-4">
        <p className={m("text-[16px]/[20px] font-[450] tracking-[-0.015em]",k,"min-w-0 truncate")}>Inbox</p>
        <button type="button" aria-label="Search" className={m("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-8 rounded-[var(--rb-r-sm,6px)]")}>
          <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-28">
        <p className={m(_,v)}>
          {c.length}
          {" open"}
        </p>
        <ul className="mt-2 space-y-1">
          <AnimatePresence initial={false} mode="popLayout">
            {c.map(t=>(
              <motion.li key={t.id} layout={!e} initial={e?{opacity:0}:{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={e?{opacity:0,transition:{duration:.12}}:{opacity:0,x:12,transition:{duration:.16,ease:j}}} transition={e?{duration:.15}:w}>
                            <button type="button" onClick={()=>d(e=>e.filter(e=>e.id!==t.id))} className={m("rounded-[var(--rb-r-sm,6px)]","hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","active:bg-neutral-900/8 dark:active:bg-neutral-100/8",g,"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","group flex min-h-[56px] w-full min-w-0 cursor-pointer items-center gap-3 px-3 text-left")}>
                              <span aria-hidden className={m("size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-[5px] checked:border-[var(--rb-accent,oklch(20.5%_0_0))] checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:border-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:border-[var(--rb-accent,oklch(100%_0_0))] dark:checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:border-neutral-100/40","inline-flex size-[20px] items-center justify-center")}>
                                <HugeiconsIcon icon={Icon_94089} size={12} strokeWidth={1.8} className={m(g,k,"opacity-0 group-hover:opacity-100")} />
                              </span>
                              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{t.title}</span></span>
                                <span data-description className={m(_,v,"truncate")}>{t.meta}</span>
                              </span>
                            </button>
                          </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {0===c.length&&<p className={m("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mx-auto mt-10 text-center")}>Everything is done. Add something with the button below.</p>}
      </div>
      <AnimatePresence>
        {t&&<motion.button type="button" aria-label="Close actions" onClick={()=>a(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:j}}} transition={{duration:.16*!e,ease:j}} className={m("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-30 cursor-default")} />}
      </AnimatePresence>
      <div className="absolute right-5 bottom-5 z-40 flex flex-col items-end gap-2">
        <AnimatePresence>
          {t&&<motion.ul key={"actions"} className="flex flex-col items-end gap-2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:j}}} transition={{duration:.16*!e,ease:j}}>
            {y.map(e=>(
              <li key={e.id}>
                            <button type="button" onClick={()=>{
                              var t;
                              let r;
                              return t=e.label,r=`n${u}`,void(x(u+1),d([{id:r,title:`${t} captured`,meta:"Just now"},...c]),a(false));
                            }} className={m("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-11 gap-2 rounded-[var(--rb-r-sm,6px)] px-5 text-[16px]/[20px] font-[450] tracking-[-0.01em]")}>
                              {e.label}
                              <HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" className="text-neutral-900/80 dark:text-neutral-100/80" />
                            </button>
                          </li>
            ))}
          </motion.ul>}
        </AnimatePresence>
        <button type="button" aria-expanded={t} aria-label={t?"Close quick actions":"Open quick actions"} onClick={()=>a(e=>!e)} className={m("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","size-11 rounded-[var(--rb-r-sm,6px)]")}>
          <motion.span aria-hidden animate={{rotate:t&&!e?45:0}} transition={e?{duration:0}:w} className="inline-flex"><HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} /></motion.span>
        </button>
      </div>
    </div>
  </div>;
}


export default A;
