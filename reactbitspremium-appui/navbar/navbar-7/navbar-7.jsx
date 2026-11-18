/**
 * React Bits Pro — Application UI (navbar-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_87470 = [["path",{d:"M2.49219 12C2.49219 4.02 4.01219 2.5 11.9922 2.5C19.9722 2.5 21.4922 4.02 21.4922 12C21.4922 19.98 19.9722 21.5 11.9922 21.5C4.01219 21.5 2.49219 19.98 2.49219 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_64739 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_65174 = [["path",{d:"M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  m = [.2,0,0,1],
  _ = "border-b border-neutral-900/8 dark:border-neutral-100/8",
  v = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  k = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  f = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  g = "size-8 rounded-[var(--rb-r-sm,6px)]",
  w = [{id:"overview",label:"Overview",sub:["Summary","Activity","Goals"]},{id:"revenue",label:"Revenue",sub:["MRR","Expansion","Churn"]},{id:"customers",label:"Customers",sub:["Accounts","Segments","Health"]},{id:"usage",label:"Usage",sub:["Requests","Storage","Seats"]},{id:"reports",label:"Reports",sub:["Saved","Scheduled","Exports"]}],
  j = {overview:[{label:"Active accounts",value:"1,284",note:"+38 this week"},{label:"Open tasks",value:"62",note:"9 overdue"},{label:"Weekly sessions",value:"18.4k",note:"+6.1%"}],revenue:[{label:"MRR",value:"$248k",note:"+4.2% MoM"},{label:"Expansion",value:"$31k",note:"22 upgrades"},{label:"Net churn",value:"-1.1%",note:"Best this year"}],customers:[{label:"Accounts",value:"1,284",note:"412 on Scale"},{label:"At risk",value:"17",note:"Health below 40"},{label:"Renewals",value:"38",note:"Next 30 days"}],usage:[{label:"Requests",value:"94.2M",note:"Rolling 30 days"},{label:"Storage",value:"8.1 TB",note:"+240 GB"},{label:"Seats used",value:"3,910",note:"of 4,500"}],reports:[{label:"Saved reports",value:"46",note:"12 shared"},{label:"Scheduled",value:"9",note:"Next run 06:00"},{label:"Exports",value:"214",note:"Last 90 days"}]};

function y(){
  let e=useReducedMotion(),[t,r]=useState("revenue"),[y,N]=useState("MRR"),{ref:z,edges:A,onScroll:S}=function(){
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
  }(),C=w.find(e=>e.id===t)??w[0],W=j[t];
  return (
    <div className={p("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[480px] w-full flex-col overflow-hidden")}>
        <div className={p("bg-white dark:bg-neutral-900","sticky top-0 z-20 shrink-0")}>
          <div className="flex h-14 items-center gap-2 px-3 sm:px-4">
            <a href="#" className={p(v,"inline-flex shrink-0 items-center gap-2")}>
              <span aria-hidden="true" className={p("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","size-7")}><HugeiconsIcon icon={Icon_87470} size={14} strokeWidth={1.8} /></span>
              <span className="text-[14px]/[16px] font-[450]">Cedar Labs</span>
            </a>
            <button type="button" className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40",f,"ml-1 max-sm:hidden")}>
              Growth workspace
              <HugeiconsIcon icon={Icon_20148} size={14} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <div className="ml-auto flex shrink-0 items-center gap-1">
              <button type="button" aria-label="Search" className={p(k,g)}>
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Help" className={p(k,g)}>
                <HugeiconsIcon icon={Icon_64739} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Settings" className={p(k,g)}>
                <HugeiconsIcon icon={Icon_65174} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <span aria-hidden="true" className={p("border-r border-neutral-900/8 dark:border-neutral-100/8","mx-1 h-5 w-px")} />
              <button type="button" aria-label="Account menu" className={p("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none",v,"cursor-pointer")}>
                <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">RK</span>
              </button>
            </div>
          </div>
          <div className={p(_,"flex items-end justify-between gap-3 px-3 sm:px-4")}>
            <div className="relative -mb-px min-w-0">
              <div ref={z} onScroll={S} role="tablist" aria-label="Workspace sections" onKeyDown={e=>{
                let a=w.findIndex(e=>e.id===t),n=a;
                if("ArrowRight"===e.key)n=(a+1)%w.length;else{
                  if("ArrowLeft"!==e.key)return;
                  n=(a-1+w.length)%w.length
                }
                e.preventDefault(),r(w[n].id),N(w[n].sub[0])
              }} className="flex h-10 items-stretch gap-1 overflow-x-auto">
                {w.map(e=>{
                  let n=e.id===t;
                  return (
                    <button key={e.id} type="button" role="tab" data-section={e.id} aria-selected={n} tabIndex={n?0:-1} onClick={()=>{
                                    r(e.id),N(e.sub[0])
                                  }} className="relative inline-flex min-h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[var(--rb-r-sm,6px)] px-2 text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900/80 select-none transition-[color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:text-neutral-900 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent aria-selected:text-neutral-900 aria-selected:after:bg-neutral-900 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:text-neutral-100 dark:aria-selected:text-neutral-100 dark:aria-selected:after:bg-neutral-100 dark:disabled:text-neutral-100/40">{e.label}</button>
                  );
                })}
              </div>
              <div aria-hidden="true" className={p("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute top-0 bottom-px left-0 w-8",A.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={p("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute top-0 right-0 bottom-px w-8",A.end?"opacity-100":"opacity-0")} />
            </div>
            <button type="button" className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",f,"mb-1 max-md:hidden")}>
              <HugeiconsIcon icon={Icon_36586} size={16} strokeWidth={1.8} aria-hidden="true" />
              Feedback
            </button>
          </div>
          <div className={p("bg-neutral-50 dark:bg-neutral-900",_,"overflow-x-auto py-1.5 ps-2 pe-3 sm:ps-3 sm:pe-4")}>
            <div role="radiogroup" aria-label={`${C.label} views`} onKeyDown={e=>{
              let t=C.sub.indexOf(y),r=t;
              if("ArrowRight"===e.key)r=(t+1)%C.sub.length;else{
                if("ArrowLeft"!==e.key)return;
                r=(t-1+C.sub.length)%C.sub.length
              }
              e.preventDefault(),N(C.sub[r]),e.currentTarget.querySelectorAll('[role="radio"]')[r]?.focus()
            }} className="flex h-7 w-fit items-stretch gap-0.5">
              {C.sub.map(e=><button key={e} type="button" role="radio" aria-checked={e===y} tabIndex={e===y?0:-1} onClick={()=>N(e)} className={p("relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40","shrink-0")}>{e}</button>)}
            </div>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <h2 className={p("text-[16px]/[20px] font-[450] tracking-[-0.015em]","flex flex-wrap gap-x-2")}>
            <span>{C.label}</span>
            <span className="text-neutral-900/66 dark:text-neutral-100/66">{y}</span>
          </h2>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={t} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:m}}} transition={{duration:.16*!e,ease:m}} className={p("@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900","mt-3")}>
              <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
                {W.map(e=>(
                  <div key={e.label} className="flex min-w-0 flex-col gap-2 px-4 py-3">
                                <p className="text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">{e.label}</p>
                                <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[32px]/[36px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.value}</p>
                                <p className="text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66">{e.note}</p>
                              </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className={p("rounded-[var(--rb-r-sm,6px)] bg-neutral-900/8 dark:bg-neutral-100/8","mt-3 h-[140px]")} />
        </div>
      </div>
  );
}


export default y;
