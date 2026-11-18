/**
 * React Bits Pro — Application UI (mobile-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { icon, id, label, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_17384 = [["path",{d:"M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_22830 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_18327 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M12.1258 14H12.0008M12.1258 18H12.0008M7.625 14H7.5M7.625 18H7.5M16.625 14H16.5M12.2508 14C12.2508 14.1381 12.1389 14.25 12.0008 14.25C11.8628 14.25 11.7508 14.1381 11.7508 14C11.7508 13.8619 11.8628 13.75 12.0008 13.75C12.1389 13.75 12.2508 13.8619 12.2508 14ZM12.2508 18C12.2508 18.1381 12.1389 18.25 12.0008 18.25C11.8628 18.25 11.7508 18.1381 11.7508 18C11.7508 17.8619 11.8628 17.75 12.0008 17.75C12.1389 17.75 12.2508 17.8619 12.2508 18ZM7.75 14C7.75 14.1381 7.63807 14.25 7.5 14.25C7.36193 14.25 7.25 14.1381 7.25 14C7.25 13.8619 7.36193 13.75 7.5 13.75C7.63807 13.75 7.75 13.8619 7.75 14ZM7.75 18C7.75 18.1381 7.63807 18.25 7.5 18.25C7.36193 18.25 7.25 18.1381 7.25 18C7.25 17.8619 7.36193 17.75 7.5 17.75C7.63807 17.75 7.75 17.8619 7.75 18ZM16.75 14C16.75 14.1381 16.6381 14.25 16.5 14.25C16.3619 14.25 16.25 14.1381 16.25 14C16.25 13.8619 16.3619 13.75 16.5 13.75C16.6381 13.75 16.75 13.8619 16.75 14Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_2972 = [["path",{d:"M8 9V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 5V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18 13V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 3V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_68820 = [["path",{d:"M5 15H12C15.7712 15 17.6569 15 18.8284 13.8284C20 12.6569 20 10.7712 20 7V4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.99996 20C8.99996 20 4.00001 16.3176 4 15C3.99999 13.6824 9 10 9 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let f = (...e)=>e.filter(Boolean).join(" "),
  k = "bg-white dark:bg-neutral-950",
  v = "hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5",
  _ = "text-neutral-900 dark:text-neutral-100",
  g = "text-neutral-900/80 dark:text-neutral-100/80",
  w = "text-neutral-900/66 dark:text-neutral-100/66",
  j = "text-[12px]/[16px] font-normal tabular-nums",
  y = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  N = f("size-11 rounded-[var(--rb-r-sm,6px)]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]"),
  A = {type:"spring",bounce:0,duration:.35},
  z = [.2,0,0,1],
  C = [{id:"home",label:"Home",icon:Icon_17384},{id:"inbox",label:"Inbox",icon:Icon_22830},{id:"schedule",label:"Schedule",icon:Icon_18327},{id:"reports",label:"Reports",icon:Icon_2972}],
  S = [{title:"Alder Group signed the pilot",body:"Two regions go live on Monday. Provisioning is already queued.",meta:["Deals","14m ago"]},{title:"Latency back under target",body:"The eu-west read replica caught up after the reindex finished.",meta:["Platform","1h ago"]},{title:"Weekly digest is ready",body:"Retention held at 94% and three accounts moved into expansion.",meta:["Reports","3h ago"]},{title:"Harbor Coffee replied",body:"They want the invoice split across two cost centres from July.",meta:["Support","5h ago"]},{title:"Two seats freed on the Cedar Labs plan",body:"Both were dormant for 60 days, so the July invoice drops by $180.",meta:["Billing","8h ago"]}],
  R = [{title:"Alder Group",meta:"Account"},{title:"Renewal pipeline",meta:"Saved view"},{title:"Invoice 4192",meta:"Billing"},{title:"Ana Reyes",meta:"Teammate"},{title:"Latency incident",meta:"Report"},{title:"Harbor Coffee",meta:"Account"}];

function P(){
  let e=useReducedMotion(),t=useId(),[a,c]=useState("home"),[d,u]=useState(false),[x,P]=useState(""),W=useRef(null),E=useRef(null);
  useEffect(()=>{
    if(!d)return;
    let e=E.current?.ownerDocument.defaultView,t=e?.requestAnimationFrame(()=>E.current?.focus());
    return ()=>{
      undefined!==t&&e?.cancelAnimationFrame(t)
    };
  }, [d]),useEffect(()=>{
    if(!d)return;
    let e=W.current?.ownerDocument;
    if(!e)return;
    let t=e=>{
      "Escape"===e.key&&u(false)
    };
    return e.addEventListener("keydown",t),()=>e.removeEventListener("keydown",t);
  }, [d]);
  let I=useMemo(()=>{
    let e=x.trim().toLowerCase();
    return e?R.filter(t=>t.title.toLowerCase().includes(e)):R.slice(0,4);
  }, [x]);
  return (
    <div className={f(k,_,"relative flex h-full min-h-[680px] w-full justify-center overflow-hidden p-5")}>
        <div ref={W} className={f("border border-neutral-900/10 dark:border-neutral-100/14",k,"relative flex h-full w-full max-w-[390px] flex-col overflow-hidden rounded-[28px]")}>
          <header className="flex h-14 shrink-0 items-center justify-between gap-2 px-5">
            <p className={f("text-[16px]/[20px] font-[450] tracking-[-0.015em]",_,"min-w-0 truncate")}>{C.find(e=>e.id===a)?.label}</p>
            <span aria-hidden className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
              <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">AR</span>
            </span>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-28">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul key={a} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:z}}} transition={{duration:.16*!e,ease:z}} className="space-y-2">
                {S.map(e=>(
                  <li key={e.title} className={f(y,"p-4")}>
                                <div className="flex items-start justify-between gap-3">
                                  <p className={f("text-[14px]/[16px] font-[450]",_,"min-w-0")}>{e.title}</p>
                                  <HugeiconsIcon icon={Icon_1497} size={16} strokeWidth={1.8} aria-hidden="true" className={f(w,"shrink-0")} />
                                </div>
                                <p className={f("text-[13px]/[18px] font-normal",g,"mt-1.5")}>{e.body}</p>
                                <p className={f(j,w,"mt-2.5 flex gap-2")}>{e.meta.map(e=><span key={e}>{e}</span>)}</p>
                              </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {d&&<motion.button type="button" aria-label="Close search" onClick={()=>u(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:z}}} transition={{duration:.16*!e,ease:z}} className={f("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-30 cursor-default")} />}
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex flex-col items-center gap-2 px-5 pb-5">
            <AnimatePresence>
              {d&&I.length>0&&<motion.ul initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:z}}} transition={{duration:.16*!e,ease:z}} className={f("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","pointer-events-auto w-full p-1.5")}>
                {I.map(t=>(
                  <motion.li key={t.title} layout={!e}>
                                <button type="button" onClick={()=>{
                                  P(t.title),u(false)
                                }} className={f("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","min-h-[44px] gap-3 px-3")}>
                                  <span className="min-w-0 flex-1 truncate">{t.title}</span>
                                  <span className={f(j,w,"shrink-0")}>{t.meta}</span>
                                </button>
                              </motion.li>
                ))}
              </motion.ul>}
            </AnimatePresence>
            <motion.div layout={!e} transition={e?{duration:0}:A} className={f(y,"shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","pointer-events-auto flex-row items-center p-1",d?"w-full":"w-auto")}>
              <AnimatePresence mode="wait" initial={false}>
                {d?<motion.div key={"search"} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:z}}} transition={{duration:.16*!e,ease:z}} className="flex w-full items-center gap-2 pl-3">
                  <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" className={f(w,"shrink-0")} />
                  <input ref={E} value={x} onChange={e=>P(e.target.value)} placeholder="Search accounts, views, invoices" aria-label="Search" className="h-full min-w-0 flex-1 bg-transparent text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
                  {x?<span className={f(j,w,"hidden shrink-0 items-center gap-1 sm:flex")}>
                    <HugeiconsIcon icon={Icon_68820} size={12} strokeWidth={1.8} aria-hidden="true" />
                    open
                  </span>:null}
                  <button type="button" aria-label="Close search" onClick={()=>{
                    u(false),P("")
                  }} className={f(N,g,v,"inline-flex shrink-0 cursor-pointer items-center justify-center")}>
                    <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </motion.div>:<motion.nav key={"nav"} aria-label="Primary" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:z}}} transition={{duration:.16*!e,ease:z}} className="flex items-center gap-0.5">
                  {C.map(i=>{
                    let n=id===a;
                    return (
                      <button key={id} type="button" aria-label={label} aria-current={n?"page":undefined} onClick={()=>c(id)} className={f(N,n?_:f(g,v),"relative inline-flex cursor-pointer items-center justify-center")}>
                                        {n&&<motion.span aria-hidden layoutId={`${t}-dock`} transition={e?{duration:0}:A} className={f("bg-neutral-900/9 dark:bg-neutral-100/9","absolute inset-0 rounded-[inherit]")} />}
                                        <HugeiconsIcon icon={icon} size={16} strokeWidth={1.8} aria-hidden="true" className="relative" />
                                      </button>
                    );
                  })}
                  <span aria-hidden className={f("border-r border-neutral-900/8 dark:border-neutral-100/8","mx-1 h-6 w-px")} />
                  <button type="button" aria-label="Search" onClick={()=>u(true)} className={f(N,g,v,"inline-flex cursor-pointer items-center justify-center")}>
                    <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </motion.nav>}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
  );
}


export default P;
