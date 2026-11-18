/**
 * React Bits Pro — Application UI (mobile-3 (Sorbet))
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

let h = (...e)=>e.filter(Boolean).join(" ");

let m = "bg-white dark:bg-neutral-950";

let X = (...e)=>e.filter(Boolean).join(" ");

let Z = "bg-white dark:bg-neutral-950";

let ee = "hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6";

let ea = "text-neutral-900 dark:text-neutral-100";

let et = "text-neutral-900/78 dark:text-neutral-100/78";

let er = "text-neutral-900/62 dark:text-neutral-100/62";

let ei = "text-[13px]/[16px] font-semibold tabular-nums";

let en = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let el = X("size-12 rounded-[calc(var(--rb-r-full,999px))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]");

let eo = {type:"spring",bounce:0,duration:.35};

let es = [.2,0,0,1];

let ec = [{id:"home",label:"Home",icon:Icon_17384},{id:"inbox",label:"Inbox",icon:Icon_22830},{id:"schedule",label:"Schedule",icon:Icon_18327},{id:"reports",label:"Reports",icon:Icon_2972}];

let ed = [{title:"Alder Group signed the pilot",body:"Two regions go live on Monday. Provisioning is already queued.",meta:["Deals","14m ago"]},{title:"Latency back under target",body:"The eu-west read replica caught up after the reindex finished.",meta:["Platform","1h ago"]},{title:"Weekly digest is ready",body:"Retention held at 94% and three accounts moved into expansion.",meta:["Reports","3h ago"]},{title:"Harbor Coffee replied",body:"They want the invoice split across two cost centres from July.",meta:["Support","5h ago"]},{title:"Two seats freed on the Cedar Labs plan",body:"Both were dormant for 60 days, so the July invoice drops by $180.",meta:["Billing","8h ago"]}];

let e_ = [{title:"Alder Group",meta:"Account"},{title:"Renewal pipeline",meta:"Saved view"},{title:"Invoice 4192",meta:"Billing"},{title:"Ana Reyes",meta:"Teammate"},{title:"Latency incident",meta:"Report"},{title:"Harbor Coffee",meta:"Account"}];


export default function mobile_3__Sorbet__Component(){
  let e=useReducedMotion(),a=useId(),[t,c]=useState("home"),[_,b]=useState(false),[u,x]=useState(""),p=useRef(null),h=useRef(null);
  useEffect(()=>{
    if(!_)return;
    let e=h.current?.ownerDocument.defaultView,a=e?.requestAnimationFrame(()=>h.current?.focus());
    return ()=>{
      undefined!==a&&e?.cancelAnimationFrame(a)
    };
  }, [_]),useEffect(()=>{
    if(!_)return;
    let e=p.current?.ownerDocument;
    if(!e)return;
    let a=e=>{
      "Escape"===e.key&&b(false)
    };
    return e.addEventListener("keydown",a),()=>e.removeEventListener("keydown",a);
  }, [_]);
  let m=useMemo(()=>{
    let e=u.trim().toLowerCase();
    return e?e_.filter(a=>a.title.toLowerCase().includes(e)):e_.slice(0,4);
  }, [u]);
  return (
    <div className={X(Z,ea,"relative flex h-full min-h-[720px] w-full justify-center overflow-hidden p-5")}>
        <div ref={p} className={X("border border-transparent ring-1 ring-[rgb(84_62_32/0.1)] dark:ring-neutral-100/12",Z,"relative flex h-full w-full max-w-[390px] flex-col overflow-hidden rounded-[28px]")}>
          <header className="flex h-14 shrink-0 items-center justify-between gap-2 px-5">
            <p className={X("text-[17px]/[22px] font-extrabold",ea,"min-w-0 truncate")}>{ec.find(e=>e.id===t)?.label}</p>
            <span aria-hidden className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
              <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">AR</span>
            </span>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-28">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul key={t} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:es}}} transition={{duration:.16*!e,ease:es}} className="space-y-2">
                {ed.map(e=>(
                  <li key={e.title} className={X(en,"p-4")}>
                                <div className="flex items-start justify-between gap-3">
                                  <p className={X("text-[15px]/[20px] font-bold",ea,"min-w-0")}>{e.title}</p>
                                  <HugeiconsIcon icon={Icon_1497} size={18} strokeWidth={2} aria-hidden="true" className={X(er,"shrink-0")} />
                                </div>
                                <p className={X("text-[14px]/[20px] font-medium",et,"mt-1.5")}>{e.body}</p>
                                <p className={X(ei,er,"mt-2.5 flex gap-2")}>{e.meta.map(e=><span key={e}>{e}</span>)}</p>
                              </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {_&&<motion.button type="button" aria-label="Close search" onClick={()=>b(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:es}}} transition={{duration:.16*!e,ease:es}} className={X("bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70","absolute inset-0 z-30 cursor-default")} />}
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex flex-col items-center gap-2 px-5 pb-5">
            <AnimatePresence>
              {_&&m.length>0&&<motion.ul initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:es}}} transition={{duration:.16*!e,ease:es}} className={X("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","pointer-events-auto w-full p-1.5")}>
                {m.map(a=>(
                  <motion.li key={a.title} layout={!e}>
                                <button type="button" onClick={()=>{
                                  x(a.title),b(false)
                                }} className={X("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","min-h-[44px] gap-3 px-3")}>
                                  <span className="min-w-0 flex-1 truncate">{a.title}</span>
                                  <span className={X(ei,er,"shrink-0")}>{a.meta}</span>
                                </button>
                              </motion.li>
                ))}
              </motion.ul>}
            </AnimatePresence>
            <motion.div layout={!e} transition={e?{duration:0}:eo} className={X(en,"shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","pointer-events-auto flex-row items-center p-1",_?"w-full":"w-auto")}>
              <AnimatePresence mode="wait" initial={false}>
                {_?<motion.div key={"search"} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:es}}} transition={{duration:.16*!e,ease:es}} className="flex w-full items-center gap-2 pl-3">
                  <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" className={X(er,"shrink-0")} />
                  <input ref={h} value={u} onChange={e=>x(e.target.value)} placeholder="Search accounts, views, invoices" aria-label="Search" className="h-full min-w-0 flex-1 bg-transparent text-[16px]/[20px] font-semibold text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/55 dark:placeholder:text-neutral-100/55" />
                  {u?<span className={X(ei,er,"hidden shrink-0 items-center gap-1 sm:flex")}>
                    <HugeiconsIcon icon={Icon_68820} size={14} strokeWidth={2} aria-hidden="true" />
                    open
                  </span>:null}
                  <button type="button" aria-label="Close search" onClick={()=>{
                    b(false),x("")
                  }} className={X(el,et,ee,"inline-flex shrink-0 cursor-pointer items-center justify-center")}>
                    <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                </motion.div>:<motion.nav key={"nav"} aria-label="Primary" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12*!e,ease:es}}} transition={{duration:.16*!e,ease:es}} className="flex items-center gap-0.5">
                  {ec.map(i=>{
                    let n=id===t;
                    return (
                      <button key={id} type="button" aria-label={label} aria-current={n?"page":undefined} onClick={()=>c(id)} className={X(el,n?ea:X(et,ee),"relative inline-flex cursor-pointer items-center justify-center")}>
                                        {n&&<motion.span aria-hidden layoutId={`${a}-dock`} transition={e?{duration:0}:eo} className={X("bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","absolute inset-0 rounded-[inherit]")} />}
                                        <HugeiconsIcon icon={icon} size={18} strokeWidth={2} aria-hidden="true" className="relative" />
                                      </button>
                    );
                  })}
                  <span aria-hidden className={X("border-r border-transparent","mx-1 h-6 w-px")} />
                  <button type="button" aria-label="Search" onClick={()=>b(true)} className={X(el,et,ee,"inline-flex cursor-pointer items-center justify-center")}>
                    <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
                  </button>
                </motion.nav>}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
  );
}
