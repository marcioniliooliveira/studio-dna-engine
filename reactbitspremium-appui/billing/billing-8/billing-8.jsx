/**
 * React Bits Pro — Application UI (billing-8)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_52042 = [["path",{d:"M17 17H18.6667C19.9128 17 20.5359 17 21 16.7321C21.304 16.5565 21.5565 16.304 21.732 16C22 15.5359 22 14.9128 22 13.6667C22 11.1744 22 9.9282 21.4641 9C21.113 8.39192 20.6081 7.88697 20 7.5359C19.0718 7 17.8256 7 15.3333 7H8.66667C6.17436 7 4.9282 7 4 7.5359C3.39192 7.88697 2.88697 8.39192 2.5359 9C2 9.9282 2 11.1744 2 13.6667C2 14.9128 2 15.5359 2.26795 16C2.44349 16.304 2.69596 16.5565 3 16.7321C3.4641 17 4.08718 17 5.33333 17H7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 7V5C17 3.58579 17 2.87868 16.5607 2.43934C16.1213 2 15.4142 2 14 2H10C8.58579 2 7.87868 2 7.43934 2.43934C7 2.87868 7 3.58579 7 5V7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M17 14V19C17 20.4142 17 21.1213 16.5607 21.5607C16.1213 22 15.4142 22 14 22H10C8.58579 22 7.87868 22 7.43934 21.5607C7 21.1213 7 20.4142 7 19V14H17Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18.8748 10.25H18.7498M18.9998 10.25C18.9998 10.3881 18.8879 10.5 18.7498 10.5C18.6117 10.5 18.4998 10.3881 18.4998 10.25C18.4998 10.1119 18.6117 10 18.7498 10C18.8879 10 18.9998 10.1119 18.9998 10.25Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900/80 dark:text-neutral-100/80",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  b = "text-[13px]/[18px] font-normal",
  p = "text-[14px]/[16px] font-[450]",
  h = "text-[12px]/[16px] font-normal tabular-nums",
  m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  _ = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  f = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  v = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  k = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  g = "text-right tabular-nums",
  w = [{id:"l1",name:"Growth plan",detail:"20 seats, Jun 1 to Jun 30",qty:20,rate:89},{id:"l2",name:"Additional seats",detail:"4 seats added Jun 12, prorated 18 days",qty:4,rate:53.4},{id:"l3",name:"API overage",detail:"48,000 calls beyond the included 500k",qty:48,rate:1.2},{id:"l4",name:"Usage insights add-on",detail:"Monthly add-on, Jun 1 to Jun 30",qty:1,rate:19}],
  j = [{label:"Invoice issued",detail:"Emailed to ap@cedarlabs.com",at:"Jun 16, 09:04",done:true},{label:"Viewed by customer",detail:"Opened twice from New York",at:"Jun 16, 14:22",done:true},{label:"Reminder sent",detail:"Automatic reminder, 3 days before due",at:"Jun 27, 08:00",done:true},{label:"Payment due",detail:"ACH transfer from Northwind Trust 1190",at:"Jun 30",done:false}],
  N = e=>`$${e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;

function y(){
  let{ref:e,edges:a,onScroll:r}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:s,clientHeight:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<s-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let s=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),{ref:y,edges:z,onScroll:S}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollLeft:t,scrollWidth:s,clientWidth:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<s-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let s=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),A=useMemo(()=>{
    let e=w.reduce((e,a)=>e+a.qty*a.rate,0),a=.05*e,r=(e-a)*.0888;
    return {subtotal:e,discount:a,tax:r,total:e-a+r};
  }, []);
  return (
    <div className={d("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <div ref={e} onScroll={r} className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto flex w-full max-w-[1000px] flex-col">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h2 className={d("text-[20px]/[24px] font-[450] tracking-[-0.015em]","tabular-nums")}>INV-20437</h2>
                  <span className={d("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","text-neutral-900 dark:text-neutral-100")}>Awaiting payment</span>
                </div>
                <p className={d(b,u,"mt-0.5 flex flex-wrap gap-x-3")}>
                  <span>Cedar Labs</span>
                  <span>Issued Jun 16</span>
                  <span>Due Jun 30</span>
                  <span>Net 14</span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button type="button" aria-label="Print invoice" className={d(m,"size-8 rounded-[var(--rb-r-sm,6px)]")}>
                  <HugeiconsIcon icon={Icon_52042} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <button type="button" className={d(m,_)}>
                  <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" />
                  PDF
                </button>
                <button type="button" className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",_)}>
                  <HugeiconsIcon icon={Icon_55410} size={16} strokeWidth={1.8} aria-hidden="true" />
                  Send reminder
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_280px]">
              <div className={d(f,"min-w-0")}>
                <div className={d(v,x,"mt-1 flex-1")}>
                  <div className="grid gap-5 px-4 py-5 sm:grid-cols-2">
                    <div className="min-w-0">
                      <p className={d(h,u)}>Billed to</p>
                      <p className={d(b,"mt-2")}>
                        Cedar Labs Inc.
                        <br />
                        14 Warren Street, Suite 620
                        <br />
                        New York, NY 10007
                        <br />
                        <span className={d("font-mono text-[12px]/[16px] tabular-nums",u)}>US-88-2947135</span>
                      </p>
                    </div>
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 self-start">
                      {[{k:"Issued",v:"Jun 16, 2026"},{k:"Due",v:"Jun 30, 2026"},{k:"Terms",v:"Net 14"},{k:"PO",v:"PO-4471"}].map(e=>(
                        <div key={e.k}>
                                            <dt className={d(h,u)}>{e.k}</dt>
                                            <dd className={d(b,"mt-0.5 tabular-nums")}>{e.v}</dd>
                                          </div>
                      ))}
                    </dl>
                  </div>
                  <div className="relative">
                    <div ref={y} onScroll={S} className="overflow-x-auto">
                      <table className={d("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","min-w-[520px]")}>
                        <caption className="sr-only">Invoice line items</caption>
                        <thead>
                          <tr>
                            {["Description","Qty","Rate","Amount"].map(e=><th key={e} scope="col" className="h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8"><span className={d("block","Description"!==e&&"text-right")}>{e}</span></th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {w.map(e=>(
                            <tr key={e.id} className={d("group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","h-14")}>
                                                    <td className={k}>
                                                      <p className={p}>{e.name}</p>
                                                      <p className={d(b,u,"mt-0.5")}>{e.detail}</p>
                                                    </td>
                                                    <td className={d(k,g)}><span className={c}>{e.qty}</span></td>
                                                    <td className={d(k,g)}><span className={c}>{N(e.rate)}</span></td>
                                                    <td className={d(k,g)}><span className={p}>{N(e.qty*e.rate)}</span></td>
                                                  </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div aria-hidden="true" className={d("bg-linear-to-r from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 w-8",z.start?"opacity-100":"opacity-0")} />
                    <div aria-hidden="true" className={d("bg-linear-to-l from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 w-8",z.end?"opacity-100":"opacity-0")} />
                  </div>
                  <div className="flex justify-end px-4 py-5">
                    <dl className="w-full max-w-[280px] space-y-2.5">
                      {[{k:"Subtotal",v:N(A.subtotal)},{k:"Volume discount (5%)",v:`−${N(A.discount)}`},{k:"Sales tax (8.88%)",v:N(A.tax)}].map(e=>(
                        <div key={e.k} className="flex items-baseline justify-between gap-3">
                                            <dt className={d(b,u)}>{e.k}</dt>
                                            <dd className={d(b,"tabular-nums")}>{e.v}</dd>
                                          </div>
                      ))}
                      <div className={d("border-t border-neutral-900/8 dark:border-neutral-100/8","flex items-baseline justify-between gap-3 pt-3")}>
                        <dt className={p}>Amount due</dt>
                        <dd className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{N(A.total)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              <aside className={d(f,"min-w-0 self-start")}>
                <div className={d(v,x,"mt-1")}>
                  <div className="p-4">
                    <p className={d(h,u)}>Activity</p>
                    <ol className="mt-3 space-y-3.5">
                      {j.map((e,a)=>(
                        <li key={e.label} className={d(p,"flex gap-3")}>
                                            <span className="relative flex flex-col items-center">
                                              <span aria-hidden className={e.done?"mt-[0.5lh] size-1.5 shrink-0 -translate-y-1/2 bg-neutral-900 dark:bg-neutral-100":d("border border-neutral-900/50 dark:border-neutral-100/50","mt-[0.5lh] size-1.5 shrink-0 -translate-y-1/2")} />
                                              {a<j.length-1&&<span aria-hidden className={d("border-r border-neutral-900/8 dark:border-neutral-100/8","mt-1 flex-1")} />}
                                            </span>
                                            <div className="min-w-0 pb-0.5">
                                              <p className={e.done?undefined:u}>{e.label}</p>
                                              <p className={d(b,u,"mt-0.5")}>{e.detail}</p>
                                              <p className={d(h,u,"mt-0.5")}>{e.at}</p>
                                            </div>
                                          </li>
                      ))}
                    </ol>
                  </div>
                  <div className="p-4">
                    <p className={d(h,u)}>Collection</p>
                    <dl className="mt-2.5 space-y-2">
                      {[{k:"Method",v:"ACH transfer"},{k:"Account",v:"Northwind 1190"},{k:"Attempt",v:"Jun 30"}].map(e=>(
                        <div key={e.k} className="flex justify-between gap-3">
                                            <dt className={d(b,u)}>{e.k}</dt>
                                            <dd className={d(b,"tabular-nums")}>{e.v}</dd>
                                          </div>
                      ))}
                    </dl>
                    <button type="button" className={d(m,_,"mt-3 w-full")}>Charge now</button>
                  </div>
                  <div className="p-4">
                    <p className={d(b,u)}>
                      Questions about this invoice? Reply to the billing email and it opens a ticket with the account owner attached.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",a.start?"opacity-100":"opacity-0")} />
        <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",a.end?"opacity-100":"opacity-0")} />
      </div>
  );
}


export default y;
