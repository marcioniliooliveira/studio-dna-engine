/**
 * React Bits Pro — Application UI (navbar-1)
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

let p = (...e)=>e.filter(Boolean).join(" "),
  m = [.2,0,0,1],
  _ = {type:"spring",bounce:0,duration:.35},
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  k = "size-8 rounded-[var(--rb-r-sm,6px)]",
  f = p("text-[12px]/[16px] font-[450] tabular-nums","text-neutral-900/66 dark:text-neutral-100/66"),
  g = [{label:"Products",icon:true},{label:"Mobile",icon:true},{label:"Checkout Flow",icon:false}],
  w = [{id:"discussion",label:"Discussion",count:3},{id:"tasks",label:"Tasks",count:0},{id:"timeline",label:"Timeline",count:0},{id:"files",label:"Files",count:0},{id:"overview",label:"Overview",count:0}],
  j = ["AM","RK","TN","JD"],
  y = {discussion:[{title:"Open threads",rows:["Payment retries","Guest checkout"]},{title:"Mentions",rows:["Refund copy review"]},{title:"Resolved",rows:["Address autofill","Coupon field"]}],tasks:[{title:"In progress",rows:["Wallet sheet","Card vaulting"]},{title:"In review",rows:["Step-up challenge state"]},{title:"Done",rows:["Order summary","Tax breakdown"]}],timeline:[{title:"This week",rows:["Design freeze","Copy handoff"]},{title:"Next week",rows:["Beta rollout"]},{title:"Later",rows:["Wallet support","Split payments"]}],files:[{title:"Specs",rows:["checkout-flow.pdf","states.fig"]},{title:"Research",rows:["drop-off-study.md"]},{title:"Assets",rows:["icons.zip","brand-marks.svg"]}],overview:[{title:"Goal",rows:["Cut checkout drop-off by 12%"]},{title:"Owners",rows:["Payments","Growth"]},{title:"Status",rows:["On track for the July release"]}]};

function N(){
  let[e,t]=useState("tasks"),[r,N]=useState(false),z=useReducedMotion(),{ref:A,edges:S,onScroll:C}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollLeft:a,scrollWidth:n,clientWidth:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),W=y[e];
  return (
    <div className={p("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[480px] w-full flex-col overflow-hidden")}>
        <header className={p("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","shrink-0 px-4 pt-5 sm:px-6")}>
          <h1 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Checkout Flow</h1>
          <div className="mt-2 flex min-h-8 items-center gap-2">
            <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
              <ol className={p("flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","max-sm:flex-nowrap")}>
                {g.map((e,t)=>{
                  let r=t===g.length-1;
                  return (
                    <li key={e.label} className="flex min-w-0 items-center gap-1.5">
                                    {t>0&&<HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={1.8} aria-hidden="true" className={p("text-neutral-900/66 dark:text-neutral-100/66 select-none","shrink-0")} />}
                                    {e.icon&&<HugeiconsIcon icon={Icon_8051} size={14} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />}
                                    {r?<span aria-current="page" className={p("text-neutral-900 dark:text-neutral-100","truncate")}>{e.label}</span>:<a href="#" className={p("rounded-[var(--rb-r-sm,6px)] hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:text-neutral-100","truncate")}>{e.label}</a>}
                                  </li>
                  );
                })}
              </ol>
            </nav>
            <div className="flex shrink-0 items-center gap-0.5">
              <button type="button" aria-label="Search this project" className={p(v,k)}>
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button type="button" aria-pressed={r} aria-label={r?"Remove from starred":"Add to starred"} onClick={()=>N(e=>!e)} className={p(v,k)}>
                <motion.span key={String(r)} initial={!z&&{scale:.7}} animate={{scale:1}} transition={_} className="inline-flex">
                  <HugeiconsIcon icon={Icon_12556} size={16} strokeWidth={1.8} aria-hidden="true" className={p(r&&"[&_path]:fill-current")} />
                </motion.span>
              </button>
              <button type="button" aria-label="More project actions" className={p(v,k)}>
                <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-1 flex items-end justify-between gap-3">
            <div className="relative -mb-px min-w-0">
              <div ref={A} onScroll={C} role="tablist" aria-label="Project sections" onKeyDown={r=>{
                let a=w.findIndex(t=>t.id===e);
                "ArrowRight"===r.key?(r.preventDefault(),t(w[(a+1)%w.length].id)):"ArrowLeft"===r.key?(r.preventDefault(),t(w[(a-1+w.length)%w.length].id)):"Home"===r.key?(r.preventDefault(),t(w[0].id)):"End"===r.key&&(r.preventDefault(),t(w[w.length-1].id))
              }} className="flex min-h-9 items-stretch gap-1 overflow-x-auto">
                {w.map(r=>{
                  let n=r.id===e;
                  return (
                    <button key={r.id} type="button" role="tab" data-tab={r.id} aria-selected={n} tabIndex={n?0:-1} onClick={()=>t(r.id)} className="relative inline-flex min-h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900/80 select-none transition-[color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-neutral-900 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent aria-selected:text-neutral-900 aria-selected:after:bg-neutral-900 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-neutral-100 dark:disabled:text-neutral-100/40">
                                    {r.label}
                                    {r.count>0&&<span className={p("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100","h-[18px] min-w-[18px]")}>{r.count}</span>}
                                  </button>
                  );
                })}
              </div>
              <div aria-hidden="true" className={p("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute top-0 bottom-px left-0 w-8",S.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={p("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute top-0 right-0 bottom-px w-8",S.end?"opacity-100":"opacity-0")} />
            </div>
            <div className="mb-1 flex shrink-0 items-center gap-2.5">
              <button type="button" aria-label="Invite people to this project" className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",k)}>
                <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <span aria-hidden="true" className={p("border-r border-neutral-900/8 dark:border-neutral-100/8","hidden h-5 w-px sm:block")} />
              <div className="hidden items-center sm:flex">
                <ul className="flex items-center *:not-first:-ms-1.5 *:not-last:[mask-image:radial-gradient(50%_50%_at_calc(150%-6px)_50%,transparent_calc(100%+1.5px),#000_calc(100%+2px))]">
                  {j.map(e=>(
                    <li key={e} className={p("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[28px]")}>
                                    <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.charAt(0)}</span>
                                  </li>
                  ))}
                </ul>
                <span className={p(f,"ml-2")}>+9</span>
              </div>
            </div>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={e} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:m}}} transition={{duration:.16*!z,ease:m}} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {W.map(e=>(
                <section key={e.title} className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
                            <h2 className={p("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100")}>{e.title}</h2>
                            <ul className={p("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8")}>
                              {e.rows.map(e=><li key={e} className={p("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","text-[13px]/[18px] font-normal","px-3")}>{e}</li>)}
                            </ul>
                          </section>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
  );
}


export default N;
