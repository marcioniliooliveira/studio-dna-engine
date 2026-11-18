/**
 * React Bits Pro — Application UI (navbar-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_8051 = [["path",{d:"M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_12556 = [["path",{d:"M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let p = (...e)=>e.filter(Boolean).join(" ");

let h = [.2,0,0,1];

let k = {type:"spring",bounce:0,duration:.35};

let m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let v = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let g = p("text-[13px]/[16px] font-bold tabular-nums","text-neutral-900/62 dark:text-neutral-100/62");

let f = [{label:"Products",icon:true},{label:"Mobile",icon:true},{label:"Checkout Flow",icon:false}];

let w = [{id:"discussion",label:"Discussion",count:3},{id:"tasks",label:"Tasks",count:0},{id:"timeline",label:"Timeline",count:0},{id:"files",label:"Files",count:0},{id:"overview",label:"Overview",count:0}];

let j = ["AM","RK","TN","JD"];

let y = {discussion:[{title:"Open threads",rows:["Payment retries","Guest checkout"]},{title:"Mentions",rows:["Refund copy review"]},{title:"Resolved",rows:["Address autofill","Coupon field"]}],tasks:[{title:"In progress",rows:["Wallet sheet","Card vaulting"]},{title:"In review",rows:["Step-up challenge state"]},{title:"Done",rows:["Order summary","Tax breakdown"]}],timeline:[{title:"This week",rows:["Design freeze","Copy handoff"]},{title:"Next week",rows:["Beta rollout"]},{title:"Later",rows:["Wallet support","Split payments"]}],files:[{title:"Specs",rows:["checkout-flow.pdf","states.fig"]},{title:"Research",rows:["drop-off-study.md"]},{title:"Assets",rows:["icons.zip","brand-marks.svg"]}],overview:[{title:"Goal",rows:["Cut checkout drop-off by 12%"]},{title:"Owners",rows:["Payments","Growth"]},{title:"Status",rows:["On track for the July release"]}]};


export default function navbar_1__Sorbet__Component(){
  let[e,a]=useState("tasks"),[r,N]=useState(false),z=useReducedMotion(),{ref:A,edges:S,onScroll:C}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollLeft:t,scrollWidth:n,clientWidth:l}=a;
      r({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),W=y[e];
  return (
    <div className={p("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[480px] w-full flex-col overflow-hidden")}>
        <header className={p("border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","shrink-0 px-4 pt-5 sm:px-6")}>
          <h1 className="text-[22px]/[28px] font-extrabold tracking-[-0.01em]">Checkout Flow</h1>
          <div className="mt-2 flex min-h-8 items-center gap-2">
            <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
              <ol className={p("flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[15px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78","max-sm:flex-nowrap")}>
                {f.map((e,a)=>{
                  let r=a===f.length-1;
                  return (
                    <li key={e.label} className="flex min-w-0 items-center gap-1.5">
                                    {a>0&&<HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={2} aria-hidden="true" className={p("text-neutral-900/62 dark:text-neutral-100/62 select-none","shrink-0")} />}
                                    {e.icon&&<HugeiconsIcon icon={Icon_8051} size={16} strokeWidth={2} aria-hidden="true" className="shrink-0" />}
                                    {r?<span aria-current="page" className={p("font-bold text-neutral-900 dark:text-neutral-100","truncate")}>{e.label}</span>:<a href="#" className={p("rounded-[calc(var(--rb-r-sm,6px))] transition-[color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:text-neutral-100","truncate")}>{e.label}</a>}
                                  </li>
                  );
                })}
              </ol>
            </nav>
            <div className="flex shrink-0 items-center gap-0.5">
              <button type="button" aria-label="Search this project" className={p(m,v)}>
                <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
              <button type="button" aria-pressed={r} aria-label={r?"Remove from starred":"Add to starred"} onClick={()=>N(e=>!e)} className={p(m,v)}>
                <motion.span key={String(r)} initial={!z&&{scale:.7}} animate={{scale:1}} transition={k} className="inline-flex">
                  <HugeiconsIcon icon={Icon_12556} size={18} strokeWidth={2} aria-hidden="true" className={p(r&&"[&_path]:fill-current")} />
                </motion.span>
              </button>
              <button type="button" aria-label="More project actions" className={p(m,v)}>
                <HugeiconsIcon icon={Icon_59649} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-1 flex items-end justify-between gap-3">
            <div className="relative -mb-px min-w-0">
              <div ref={A} onScroll={C} role="tablist" aria-label="Project sections" onKeyDown={r=>{
                let t=w.findIndex(a=>a.id===e);
                "ArrowRight"===r.key?(r.preventDefault(),a(w[(t+1)%w.length].id)):"ArrowLeft"===r.key?(r.preventDefault(),a(w[(t-1+w.length)%w.length].id)):"Home"===r.key?(r.preventDefault(),a(w[0].id)):"End"===r.key&&(r.preventDefault(),a(w[w.length-1].id))
              }} className="flex min-h-9 items-stretch gap-1 overflow-x-auto">
                {w.map(r=>{
                  let n=r.id===e;
                  return (
                    <button key={r.id} type="button" role="tab" data-tab={r.id} aria-selected={n} tabIndex={n?0:-1} onClick={()=>a(r.id)} className="relative inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[calc(var(--rb-r-lg,10px))] px-3 text-[15px]/[20px] font-bold whitespace-nowrap text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-neutral-900 after:absolute after:inset-x-2.5 after:bottom-0 after:h-[3px] after:rounded-[calc(var(--rb-r-full,999px))] after:bg-transparent after:transition-[background-color] aria-selected:text-neutral-900 aria-selected:after:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:disabled:text-neutral-100/40">
                                    {r.label}
                                    {r.count>0&&<span className={p("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12","h-[18px] min-w-[18px]")}>{r.count}</span>}
                                  </button>
                  );
                })}
              </div>
              <div aria-hidden="true" className={p("bg-linear-to-r from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute top-0 bottom-px left-0 w-8",S.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={p("bg-linear-to-l from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute top-0 right-0 bottom-px w-8",S.end?"opacity-100":"opacity-0")} />
            </div>
            <div className="mb-1 flex shrink-0 items-center gap-2.5">
              <button type="button" aria-label="Invite people to this project" className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",v)}>
                <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
              <span aria-hidden="true" className={p("border-r border-transparent","hidden h-5 w-px sm:block")} />
              <div className="hidden items-center sm:flex">
                <ul className="flex items-center *:not-first:-ms-1.5 *:not-last:[mask-image:radial-gradient(50%_50%_at_calc(150%-6px)_50%,transparent_calc(100%+1.5px),#000_calc(100%+2px))]">
                  {j.map(e=>(
                    <li key={e} className={p("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[28px]")}>
                                    <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">{e.charAt(0)}</span>
                                  </li>
                  ))}
                </ul>
                <span className={p(g,"ml-2")}>+9</span>
              </div>
            </div>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={e} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:h}}} transition={{duration:.16*!z,ease:h}} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {W.map(e=>(
                <section key={e.title} className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
                            <h2 className={p("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100")}>{e.title}</h2>
                            <ul className={p("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7")}>
                              {e.rows.map(e=><li key={e} className={p("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","text-[14px]/[20px] font-medium","px-3")}>{e}</li>)}
                            </ul>
                          </section>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
  );
}
