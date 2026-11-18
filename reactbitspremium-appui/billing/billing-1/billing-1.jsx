/**
 * React Bits Pro — Application UI (billing-1)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  h = "text-[13px]/[18px] font-normal",
  m = "text-[14px]/[16px] font-[450]",
  _ = "text-[12px]/[16px] font-normal tabular-nums",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  k = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  g = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  w = "flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1",
  j = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  N = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  y = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  z = {Open:"text-neutral-900 dark:text-neutral-100","Past due":"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",Paid:"text-neutral-900/80 dark:text-neutral-100/80"},
  S = [{id:"INV-20418",customer:"Halcyon Pay",account:"ACC-3092",detail:"May usage and seats",plan:"Scale",amount:890,method:"Visa ending 4242",due:"May 28",relative:"18d overdue",status:"Past due"},{id:"INV-20402",customer:"Lumendesk",account:"ACC-3088",detail:"May usage overage",plan:"Growth",amount:640,method:"Mastercard ending 8829",due:"Jun 10",relative:"6d overdue",status:"Past due"},{id:"INV-20425",customer:"Meridian Labs",account:"ACC-3090",detail:"June seats",plan:"Growth",amount:2480,method:"Mastercard ending 4417",due:"Jun 19",relative:"Due in 3d",status:"Open"},{id:"INV-20429",customer:"Orbital Systems",account:"ACC-3101",detail:"June seats",plan:"Scale",amount:4800,method:"Visa ending 1190",due:"Jun 22",relative:"Due in 6d",status:"Open"},{id:"INV-20419",customer:"Northwind Retail",account:"ACC-3072",detail:"June seats",plan:"Growth",amount:2980,method:"ACH transfer",due:"Jun 25",relative:"Due in 9d",status:"Open"},{id:"INV-20423",customer:"Cedar Labs",account:"ACC-3085",detail:"June usage",plan:"Growth",amount:1950,method:"Visa ending 7732",due:"Jun 28",relative:"Due in 12d",status:"Open"},{id:"INV-20431",customer:"Atlas Freight",account:"ACC-3110",detail:"June seats",plan:"Starter",amount:430,method:"Visa ending 6604",due:"Jun 30",relative:"Due in 14d",status:"Open"},{id:"INV-20396",customer:"Wexler Group",account:"ACC-3061",detail:"May seats",plan:"Scale",amount:5240,method:"ACH transfer",due:"Jun 2",relative:"Paid Jun 1",status:"Paid"}],
  A = e=>`$${e.toLocaleString("en-US")}`;

function C(){
  let[e,a]=useState(""),{ref:r,edges:C,onScroll:O}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false,left:false,right:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:s,clientHeight:n,scrollLeft:l,scrollWidth:i,clientWidth:o}=a;
      r({start:t>1,end:Math.ceil(t+n)<s-1,left:l>1,right:Math.ceil(l+o)<i-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let s=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),M=useMemo(()=>{
    let a=e.trim().toLowerCase();
    return a?S.filter(e=>e.customer.toLowerCase().includes(a)||e.id.toLowerCase().includes(a)):S;
  }, [e]),W=S.filter(e=>"Paid"!==e.status).reduce((e,a)=>e+a.amount,0),$=S.filter(e=>"Past due"===e.status),J=$.reduce((e,a)=>e+a.amount,0);
  return (
    <div className={x("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[800px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className="mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Billing</h2>
              <p className={x(h,b,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>June statement</span>
                <span>
                  {S.length-1}
                  {" invoices outstanding"}
                </span>
              </p>
            </div>
            <button type="button" className={x(f,g)}>
              <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" />
              Export
            </button>
          </div>
          <div className={x(j,"mt-3")}>
            <div className={x(N,"mt-1")}>
              <div className="grid gap-5 px-3 py-4 lg:grid-cols-[1fr_auto]">
                <div className="min-w-0">
                  <p className={x(_,b)}>Outstanding balance</p>
                  <p className={x("text-[40px]/[44px] font-[450] tabular-nums","mt-1")}>{A(W)}</p>
                  <p className={x(h,b,"mt-2.5")}>16 invoices this cycle. Oldest past due 18 days.</p>
                </div>
                <dl className="grid grid-cols-2 gap-x-10 gap-y-3 lg:pl-8">
                  {[{label:"Current",value:A(W-J)},{label:"Overdue",value:A(J)},{label:"Collected",value:A(48480)},{label:"Next payout",value:"Jun 30"}].map(e=>(
                    <div key={e.label}>
                                    <dt className={x(_,b)}>{e.label}</dt>
                                    <dd className={x(m,"mt-0.5 tabular-nums")}>{e.value}</dd>
                                  </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="min-w-0">
                  <span className={p}>
                    {A(J)}
                    {" overdue"}
                  </span>
                  {" "}
                  {"across "}
                  {$.length}
                  {" invoices. Auto-collection is on."}
                </p>
                <div className="flex shrink-0 items-center gap-2">
                  <button type="button" className={x(f,k)}>View statement</button>
                  <button type="button" className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",k)}>
                    Start recovery
                    <HugeiconsIcon icon={Icon_1497} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={x(j,"mt-3 min-h-0 flex-1")}>
            <div className={x("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","py-3")}>
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Invoice ledger</h3>
                  <p className={x("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5 flex flex-wrap gap-x-3")}>
                    <span>
                      {M.length}
                      {" shown"}
                    </span>
                    <span>
                      {$.length}
                      {" past due"}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <div className="sm:w-[200px]">
                    <label htmlFor="billing-1-search" className="sr-only">Search invoices</label>
                    <div className={x("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                      <span data-affix className={w}>
                        <HugeiconsIcon icon={Icon_66575} size={14} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <input id="billing-1-search" value={e} onChange={e=>a(e.target.value)} placeholder="Search customers" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                      {e&&<span data-affix className={w}>
                        <button type="button" aria-label="Clear search" onClick={()=>a("")} className={x(v,"size-6 rounded-[var(--rb-r-sm,6px)]")}>
                          <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                        </button>
                      </span>}
                    </div>
                  </div>
                  <button type="button" className={x(f,g)}>
                    <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                    New invoice
                  </button>
                </div>
              </div>
            </div>
            <div className={x(N,"relative min-h-0 flex-1")}>
              <div ref={r} onScroll={O} className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
                <table className={x("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","min-w-[720px]")}>
                  <caption className="sr-only">Outstanding invoices</caption>
                  <thead className={x("bg-white dark:bg-neutral-950","sticky top-0 z-10")}>
                    <tr>
                      {["Customer","Invoice","Plan","Amount","Due","Status",""].map((e,a)=><th key={e||a} scope="col" className="h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8"><span className={x("block","Amount"===e&&"text-right")}>{e}</span></th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {M.map(e=>(
                      <tr key={e.id} className={x("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-14")}>
                                        <td className={y}>
                                          <p className={m}>{e.customer}</p>
                                          <p className={x("font-mono text-[12px]/[16px] tabular-nums",b,"mt-0.5")}>{e.account}</p>
                                        </td>
                                        <td className={y}>
                                          <span className={x("inline-flex h-5 min-w-5 shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 font-mono text-[12px]/[16px] tabular-nums text-neutral-900 dark:text-neutral-100","bg-neutral-900/9 dark:bg-neutral-100/9")}>{e.id}</span>
                                          <p className={x(h,b,"mt-0.5")}>{e.detail}</p>
                                        </td>
                                        <td className={y}><span className="text-neutral-900/80 dark:text-neutral-100/80">{e.plan}</span></td>
                                        <td className={x(y,"text-right tabular-nums")}>
                                          <p className={m}>{A(e.amount)}</p>
                                          <p className={x(h,b,"mt-0.5")}>{e.method}</p>
                                        </td>
                                        <td className={y}>
                                          <p className="tabular-nums">{e.due}</p>
                                          <p className={x(h,"Past due"===e.status?p:b,"mt-0.5")}>{e.relative}</p>
                                        </td>
                                        <td className={y}>
                                          <span className={x("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",z[e.status])}>{e.status}</span>
                                        </td>
                                        <td className={y}>
                                          <div className="flex items-center justify-end gap-0.5 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-[120ms]">
                                            <button type="button" aria-label={`Actions for ${e.id}`} className={x(v,"size-7 rounded-[var(--rb-r-sm,6px)]")}>
                                              <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                    ))}
                  </tbody>
                </table>
                {0===M.length&&<p className={x("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mx-auto px-4 py-10 text-center")}>No invoices match that search.</p>}
              </div>
              <div aria-hidden="true" className={x("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",C.end?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={x("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 z-20 w-8",C.left?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={x("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 z-20 w-8",C.right?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
      </div>
  );
}


export default C;
