/**
 * React Bits Pro — Application UI (list-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900 dark:text-neutral-100",
  x = [{id:"compute",name:"Container compute",initials:"CC",team:"Platform",by:{month:{spend:42180,delta:4.2,units:"18,400 vCPU hrs"},quarter:{spend:121460,delta:9.6,units:"54,900 vCPU hrs"}}},{id:"storage",name:"Object storage",initials:"OS",team:"Data",by:{month:{spend:18740,delta:-1.8,units:"312 TB stored"},quarter:{spend:57120,delta:2.4,units:"938 TB stored"}}},{id:"warehouse",name:"Query warehouse",initials:"QW",team:"Analytics",by:{month:{spend:15390,delta:12.7,units:"9,860 credits"},quarter:{spend:41870,delta:21.3,units:"27,140 credits"}}},{id:"egress",name:"Network egress",initials:"NE",team:"Platform",by:{month:{spend:9260,delta:-6.4,units:"74 TB transferred"},quarter:{spend:30480,delta:-3.1,units:"241 TB transferred"}}},{id:"search",name:"Search cluster",initials:"SC",team:"Product",by:{month:{spend:7420,delta:.9,units:"6 nodes"},quarter:{spend:22010,delta:5.5,units:"6 nodes"}}},{id:"observability",name:"Observability",initials:"OB",team:"Platform",by:{month:{spend:5130,delta:3.6,units:"1.4 TB ingested"},quarter:{spend:14980,delta:7.2,units:"4.1 TB ingested"}}}],
  p = [{id:"month",label:"Month"},{id:"quarter",label:"Quarter"}],
  h = e=>e>=1e3?`$${(e/1e3).toFixed(1)}k`:`$${e}`,
  b = e=>{
  let t="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!t&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=r.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(a+t+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function m(){
  let[e,t]=useState("month"),[r,m]=useState(null),{ref:f,edges:k,onScroll:v}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:i}=t;
      r({start:a>1,end:Math.ceil(a+i)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),g=useMemo(()=>[...x].sort((t,r)=>r.by[e].spend-t.by[e].spend), [e]),w=useMemo(()=>g.reduce((t,r)=>t+r.by[e].spend,0), [g,e]);
  return (
    <div className={c("bg-white dark:bg-neutral-950",u,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","mx-auto w-full max-w-[720px] shrink-0")}>
          <div className={c("border-b border-neutral-900/8 dark:border-neutral-100/8","flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-3.5")}>
            <div className="min-w-0">
              <h2 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Infrastructure spend</h2>
              <p className={c("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5 tabular-nums")}>
                {h(w)}
                {" across "}
                {g.length}
                {" services"}
              </p>
            </div>
            <div role="radiogroup" aria-label="Billing period" onKeyDown={b} className={c("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
              {p.map(r=>{
                let n=r.id===e;
                return <button key={r.id} type="button" role="radio" aria-checked={n} tabIndex={n?0:-1} onClick={()=>t(r.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{r.label}</button>;
              })}
            </div>
          </div>
          <div className="relative">
            <div ref={f} onScroll={v} className={c("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex max-h-[292px] flex-col overflow-y-auto px-2 py-1")}>
              {g.map(t=>{
                let{spend:n,delta:d,units:x}=t.by[e],p=r===t.id;
                return (
                  <button key={t.id} type="button" aria-pressed={p} onClick={()=>m(p?null:t.id)} className={c("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","rounded-[var(--rb-r-sm,6px)]",p?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","h-14 shrink-0 cursor-pointer px-3")}>
                                <span className={c("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[var(--rb-r-sm,6px)] select-none","size-9")}>
                                  <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{t.initials}</span>
                                </span>
                                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                  <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{t.name}</span></span>
                                  <span data-description className={c("text-[13px]/[18px] font-normal","text-neutral-900/66 dark:text-neutral-100/66","block truncate")}>
                                    <span>{t.team}</span>
                                    <span className="ms-3">{x}</span>
                                  </span>
                                </span>
                                <span className="shrink-0 text-right">
                                  <span className={c("text-[14px]/[16px] font-[450]",u,"block tabular-nums")}>{h(n)}</span>
                                  <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80">
                                    <HugeiconsIcon icon={d>0?Icon_1497:d<0?Icon_37502:Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" />
                                    <span className="sr-only">{d>0?"Up":d<0?"Down":"No change"}</span>
                                    {`${d>0?"+":d<0?"−":""}${Math.abs(d).toFixed(1)}%`}
                                  </span>
                                </span>
                              </button>
                );
              })}
            </div>
            <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",k.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",k.end?"opacity-100":"opacity-0")} />
          </div>
          <div className="p-2">
            <button type="button" className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","w-full")}>
              <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
              Connect a billing account
            </button>
          </div>
        </div>
      </div>
  );
}


export default m;
