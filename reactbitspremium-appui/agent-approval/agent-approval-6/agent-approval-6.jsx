/**
 * React Bits Pro — Application UI (agent-approval-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let s = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  d = "text-[12px]/[16px] font-normal tabular-nums",
  u = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  p = [{id:"ap-1051",action:"Refunded 3 duplicate charges to Acme Logistics",context:["$1,240.00","West billing"],reviewer:"Maya Chen",outcome:"approved",time:"10:42"},{id:"ap-1050",action:"Added a private note to ticket #4821",context:["Internal notes policy"],reviewer:"Auto policy",outcome:"approved",time:"9:41"},{id:"ap-1049",action:"Rotated the production API token",context:["Payments service"],reviewer:"Sam Rivera",outcome:"denied",time:"9:18"},{id:"ap-1048",action:"Granted read access to analytics for 30 minutes",context:["Meridian service account"],reviewer:"Owen Patel",outcome:"approved",time:"9:12"},{id:"ap-1047",action:"Merged the staging config branch",context:["No response in 2 hours"],reviewer:"",outcome:"expired",time:"Yesterday"},{id:"ap-1046",action:"Changed the invoice retention window to 45 days",context:["billing-retention-policy.ts"],reviewer:"Leah Stone",outcome:"denied",time:"Yesterday"},{id:"ap-1045",action:"Reset QA seed data before the nightly replay",context:["qa_orders, qa_refunds","QA only"],reviewer:"Auto policy",outcome:"approved",time:"Yesterday"},{id:"ap-1044",action:"Archived 312 paused campaigns older than 18 months",context:["EU and NA marketing"],reviewer:"Nina Brooks",outcome:"denied",time:"Mon"}],
  b = ["all","approved","denied","expired"],
  _ = {approved:"Approved",denied:"Skipped",expired:"Expired"},
  h = {approved:"text-neutral-900/80 dark:text-neutral-100/80",denied:x,expired:x};

function m(){
  let[e,t]=useState("all"),[r,x]=useState(""),{ref:m,edges:f,onScroll:v}=function(){
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
  }(),k=useMemo(()=>{
    let t=r.trim().toLowerCase();
    return p.filter(r=>{
      let a="all"===e||r.outcome===e,n=""===t||`${r.action} ${r.context.join(" ")} ${r.reviewer}`.toLowerCase().includes(t);
      return a&&n;
    });
  }, [e,r]);
  return (
    <div className={s("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <header className="flex h-14 shrink-0 items-center gap-2 px-4 sm:px-6">
          <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Approval history</h2>
          <button type="button" className={s("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",u,"ml-auto")}>
            <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" />
            Export
          </button>
        </header>
        <div className="flex shrink-0 flex-col gap-2 px-4 pb-2 sm:h-12 sm:flex-row sm:items-center sm:px-6 sm:pb-0">
          <label htmlFor="aa6-search" className="sr-only">Search history</label>
          <div className={s("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","flex-1 sm:max-w-xs")}>
            <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
              <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <input id="aa6-search" value={r} onChange={e=>x(e.target.value)} placeholder="Search decisions" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
          </div>
          <div role="radiogroup" aria-label="Filter by outcome" onKeyDown={r=>{
            let a="ArrowRight"===r.key||"ArrowDown"===r.key?1:"ArrowLeft"===r.key||"ArrowUp"===r.key?-1:0;
            if(0===a)return;
            r.preventDefault();
            let n=b.indexOf(e),i=b[(n+a+b.length)%b.length];
            t(i),r.currentTarget.querySelectorAll("button")[b.indexOf(i)]?.focus({preventScroll:true})
          }} className={s("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","w-full sm:ml-auto sm:w-fit")}>
            {b.map(r=><button key={r} type="button" role="radio" aria-checked={e===r} tabIndex={e===r?0:-1} onClick={()=>t(r)} className={s("relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40","flex-1 capitalize sm:flex-none")}>{"denied"===r?"skipped":r}</button>)}
          </div>
        </div>
        <div className="relative min-h-0 flex-1">
          <div ref={m} onScroll={v} className="h-full overflow-y-auto overscroll-contain">
            {0===k.length?<div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No decisions match</p>
              <p className={s("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-xs")}>Clear the search or switch the filter to see the full history.</p>
              <button type="button" onClick={()=>{
                x(""),t("all")
              }} className={s("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",u,"mt-4")}>Clear filters</button>
            </div>:<ul className={s("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mx-4 my-2 flex flex-col sm:mx-6")}>
              {k.map(e=>(
                <li key={e.id} className="relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14">
                            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                              <p className={s("text-[14px]/[16px] font-[450]","truncate")}>{e.action}</p>
                              <p data-description className={s(d,c,"flex min-w-0 gap-3")}>
                                {e.context.map(e=><span key={e} className="truncate">{e}</span>)}
                                {e.reviewer&&<span className="shrink-0">{e.reviewer}</span>}
                              </p>
                            </div>
                            <div className="flex shrink-0 items-baseline gap-3">
                              <span className={s("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",h[e.outcome],"w-24 shrink-0 justify-end whitespace-nowrap sm:w-28")}>{_[e.outcome]}</span>
                              <span className={s(d,c,"hidden w-16 shrink-0 text-right sm:block")}>{e.time}</span>
                            </div>
                          </li>
              ))}
            </ul>}
          </div>
          <div aria-hidden="true" className={s("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",f.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={s("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",f.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default m;
