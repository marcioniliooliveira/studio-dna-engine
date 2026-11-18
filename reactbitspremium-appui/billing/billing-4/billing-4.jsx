/**
 * React Bits Pro — Application UI (billing-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let p = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900/80 dark:text-neutral-100/80",
  h = "text-neutral-900/66 dark:text-neutral-100/66",
  _ = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  f = "text-[13px]/[18px] font-normal",
  g = "text-[14px]/[16px] font-[450]",
  k = "text-[12px]/[16px] font-normal tabular-nums",
  v = "font-mono text-[12px]/[16px] tabular-nums",
  j = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  w = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  N = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  y = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  z = e=>`$${e.toLocaleString("en-US")}`,
  A = [{id:"SUB-4712",customer:"Halcyon Pay",product:"Payments Cloud",status:"Failed",plan:"Enterprise",basis:"Platform fee",owner:"Priya Nandakumar",amount:6200,method:"PM-7741",next:"Jun 18",attempt:"Attempt 3 of 4",urgent:false,invoice:"INV-20418",card:"Visa ending 4242",attempts:[{n:1,reason:"Insufficient funds",code:"insufficient_funds",note:"Retried at the customer's usual top-up hour.",date:"May 29"},{n:2,reason:"Issuer declined",code:"do_not_honor",note:"Issuer blocked a repeat attempt inside 72 hours.",date:"Jun 3"},{n:3,reason:"Card declined",code:"generic_decline",note:"Hosted card update requested by email.",date:"Jun 10"}]},{id:"SUB-4794",customer:"Lumendesk",product:"Database Cloud",status:"Exhausted",plan:"Scale",basis:"Usage based",owner:"Marcus Bell",amount:4800,method:"PM-7743",next:"Retries exhausted",attempt:"Attempt 4 of 4",urgent:true,invoice:"INV-20401",card:"Mastercard ending 8829",attempts:[]},{id:"SUB-4806",customer:"Meridian Labs",product:"Enterprise Grid",status:"Retrying",plan:"Scale",basis:"Seat based",owner:"Sofia Alvarez",amount:5400,method:"PM-7742",next:"Today",attempt:"Attempt 3 of 4",urgent:false,invoice:"INV-20409",card:"Visa ending 1190",attempts:[]},{id:"SUB-4820",customer:"Cedar Labs",product:"Insights",status:"Retrying",plan:"Growth",basis:"Usage based",owner:"Wei Chen",amount:3150,method:"PM-7748",next:"Jun 19",attempt:"Attempt 2 of 4",urgent:false,invoice:"INV-20422",card:"ACH transfer",attempts:[]},{id:"SUB-4833",customer:"Orbital Systems",product:"Edge Delivery",status:"Failed",plan:"Growth",basis:"Seat based",owner:"Tom\xe1s Guerrero",amount:2400,method:"PM-7751",next:"Jun 20",attempt:"Attempt 1 of 4",urgent:false,invoice:"INV-20427",card:"Visa ending 6604",attempts:[]},{id:"SUB-4841",customer:"Atlas Freight",product:"Logistics API",status:"Retrying",plan:"Starter",basis:"Usage based",owner:"Amelia Whitfield",amount:2e3,method:"PM-7756",next:"Jun 21",attempt:"Attempt 2 of 4",urgent:false,invoice:"INV-20430",card:"Mastercard ending 4417",attempts:[]}],
  S = [{label:"Amount at risk",hint:"Open failed charges",value:z(23950),delta:"−8%",deltaTone:"down",fill:72,bar:"warn",cells:[{n:"2",l:"Failed"},{n:"3",l:"Retrying"},{n:"1",l:"Exhausted"}]},{label:"Recovered",hint:"Charges settled this month",value:z(16500),delta:"+12%",deltaTone:"up",fill:58,bar:"ink",cells:[{n:"9",l:"Invoices"},{n:z(8900),l:"Largest"},{n:"2",l:"Playbooks"}]},{label:"Recovery rate",hint:"Smart retries across accounts",value:"25%",delta:"+3%",deltaTone:"up",fill:25,bar:"ink",cells:[{n:"19",l:"Attempts"},{n:"32",l:"Capacity"},{n:"4",l:"Max tries"}]}];

function R(){
  let[e,t]=useState("SUB-4712"),{ref:a,edges:R,onScroll:M}=function(){
    let e=useRef(null),[t,a]=useState({start:false,end:false,left:false,right:false}),r=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:r,scrollHeight:s,clientHeight:n,scrollLeft:l,scrollWidth:i,clientWidth:o}=t;
      a({start:r>1,end:Math.ceil(r+n)<s-1,left:l>1,right:Math.ceil(l+o)<i-1})
    }, []);
    return useEffect(()=>{
      r();
      let t=e.current,a=t?.ownerDocument.defaultView;
      if(!t||!a?.ResizeObserver)return;
      let s=new a.ResizeObserver(r);
      return observe(t),()=>disconnect();
    }, [r]),{ref:e,edges:t,onScroll:r};
  }(),C=useMemo(()=>A.reduce((e,t)=>e+t.amount,0), []);
  return (
    <div className={p("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[800px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className="mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Recovery queue</h2>
              <p className={p(f,h,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>
                  {A.length}
                  {" subscriptions with live retry paths"}
                </span>
                <span className={_}>
                  {z(C)}
                  {" at risk"}
                </span>
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" className={p(j,N)}>
                <HugeiconsIcon icon={Icon_68656} size={16} strokeWidth={1.8} aria-hidden="true" />
                Rules
              </button>
              <button type="button" className={p(j,N)}>
                <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" />
                Export
              </button>
              <button type="button" className={p("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",N)}>
                <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
                Retry due
              </button>
            </div>
          </div>
          <div className={p("@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900","mt-3")}>
            <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
              {S.map(e=>(
                <div key={e.label} className="flex min-w-0 flex-col gap-2 px-4 py-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className={p("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","text-pretty")}>{e.label}</p>
                                <p className={p("text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66","mt-0.5 text-pretty")}>{e.hint}</p>
                              </div>
                              <span className={p("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80","shrink-0")}>
                                <HugeiconsIcon icon={"up"===e.deltaTone?Icon_1497:Icon_37502} size={12} strokeWidth={1.8} aria-hidden="true" />
                                <span className="sr-only">{"up"===e.deltaTone?"Up":"Down"}</span>
                                {e.delta}
                              </span>
                            </div>
                            <p className={p("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[32px]/[36px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100","mt-auto")}>{e.value}</p>
                            <div className="relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7" role="presentation">
                              <div className={"warn"===e.bar?p("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full"):"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100"} style={{width:`${e.fill}%`}} />
                            </div>
                            <dl className="grid grid-cols-[repeat(auto-fit,minmax(64px,1fr))] gap-2">
                              {e.cells.map(e=>(
                                <div key={e.l} className="min-w-0">
                                                <dt className={p(k,h)}>{e.l}</dt>
                                                <dd className={p(g,"mt-0.5 tabular-nums")}>{e.n}</dd>
                                              </div>
                              ))}
                            </dl>
                          </div>
              ))}
            </div>
          </div>
          <div className={p("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mt-3 min-h-0 flex-1")}>
            <div className={p("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","justify-between py-3")}>
              <div className="min-w-0">
                <h3 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Past due subscriptions</h3>
                <p className={p("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>Retry schedule, payment method, and account owner.</p>
              </div>
              <button type="button" className={p(j,N,"max-sm:hidden")}>Manage playbooks</button>
            </div>
            <div className={p("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
              <div ref={a} onScroll={M} className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
                <table className={p("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","min-w-[820px]")}>
                  <caption className="sr-only">Past due subscriptions</caption>
                  <thead className={p("bg-white dark:bg-neutral-950","sticky top-0 z-10")}>
                    <tr>
                      {["Customer","Status","Billing","Owner","Amount","Next retry",""].map((e,t)=><th key={e||t} scope="col" className="h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8"><span className={p("block","Amount"===e&&"text-right")}>{e}</span></th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {A.map(a=>{
                      let l=e===a.id;
                      return (
                        <Fragment key={a.id}>
                                            <tr className={p("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-14")}>
                                              <td className={y}>
                                                <div className="flex items-center gap-2">
                                                  <button type="button" aria-expanded={l} aria-label={`Retry attempts for ${a.customer}`} onClick={()=>t(l?null:a.id)} className={p(w,"size-6 rounded-[var(--rb-r-sm,6px)]","group")}>
                                                    <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                                  </button>
                                                  <div className="min-w-0">
                                                    <p className={p(g,"truncate")}>{a.customer}</p>
                                                    <p className={p(f,h,"mt-0.5 flex min-w-0 gap-x-3")}>
                                                      <span className={v}>{a.id}</span>
                                                      <span className="truncate">{a.product}</span>
                                                    </p>
                                                  </div>
                                                </div>
                                              </td>
                                              <td className={y}>
                                                <span className={p("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","Retrying"===a.status?"text-neutral-900 dark:text-neutral-100":"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]")}>
                                                  {"Retrying"===a.status&&<span className="flex h-lh shrink-0 items-center">
                                                    <span className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" aria-hidden="true" />
                                                  </span>}
                                                  {a.status}
                                                </span>
                                              </td>
                                              <td className={y}>
                                                <p>{a.plan}</p>
                                                <p className={p(f,h,"mt-0.5")}>{a.basis}</p>
                                              </td>
                                              <td className={y}><span className={b}>{a.owner}</span></td>
                                              <td className={p(y,"text-right tabular-nums")}>
                                                <p className={g}>{z(a.amount)}</p>
                                                <p className={p(v,h,"mt-0.5")}>{a.method}</p>
                                              </td>
                                              <td className={y}>
                                                <p className={p("tabular-nums",a.urgent&&_)}>{a.next}</p>
                                                <p className={p(f,h,"mt-0.5 tabular-nums")}>{a.attempt}</p>
                                              </td>
                                              <td className={y}>
                                                <div className="flex items-center justify-end gap-0.5 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-[120ms]">
                                                  <button type="button" aria-label={`Actions for ${a.customer}`} className={p(w,"size-7 rounded-[var(--rb-r-sm,6px)]")}>
                                                    <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                  </button>
                                                </div>
                                              </td>
                                            </tr>
                                            {l&&a.attempts.length>0&&<tr>
                                              <td colSpan={7} className={p("bg-neutral-900/5 dark:bg-neutral-100/5","border-b border-neutral-900/8 dark:border-neutral-100/8","p-3")}>
                                                <div className="flex items-center justify-between gap-3 px-3 py-2">
                                                  <div className="min-w-0">
                                                    <p className={g}>Retry attempts</p>
                                                    <p className={p(f,h,"mt-0.5")}>
                                                      {"Card update requested for "}
                                                      {a.card}
                                                      .
                                                    </p>
                                                  </div>
                                                  <p className={p(v,h,"shrink-0")}>{a.invoice}</p>
                                                </div>
                                                <ul className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
                                                  {a.attempts.map(e=>(
                                                    <li key={e.n} className="flex flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                                                                                <div className="flex min-w-0 items-start gap-2.5">
                                                                                  <HugeiconsIcon icon={Icon_36474} size={14} strokeWidth={1.8} aria-hidden="true" className={p(h,"mt-0.5 shrink-0")} />
                                                                                  <div className="min-w-0">
                                                                                    <p className={p(g,"flex flex-wrap gap-x-3")}>
                                                                                      <span>
                                                                                        {"Attempt "}
                                                                                        {e.n}
                                                                                      </span>
                                                                                      <span className={b}>{e.reason}</span>
                                                                                    </p>
                                                                                    <p className={p(f,h,"mt-0.5")}>{e.note}</p>
                                                                                  </div>
                                                                                </div>
                                                                                <div className="flex shrink-0 items-center gap-4 pl-6 sm:pl-0">
                                                                                  <span className={p(v,h)}>{e.code}</span>
                                                                                  <span className={p(k,h)}>{e.date}</span>
                                                                                </div>
                                                                              </li>
                                                  ))}
                                                </ul>
                                              </td>
                                            </tr>}
                                          </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div aria-hidden="true" className={p("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",R.end?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={p("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 z-20 w-8",R.left?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={p("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 z-20 w-8",R.right?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
      </div>
  );
}


export default R;
