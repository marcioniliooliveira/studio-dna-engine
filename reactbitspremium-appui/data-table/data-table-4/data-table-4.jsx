/**
 * React Bits Pro — Application UI (data-table-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_73516 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 8L11 11M11 11L14 14M11 11L14 8M11 11L8 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "bg-white dark:bg-neutral-950",
  u = "bg-neutral-50 dark:bg-neutral-900",
  x = "text-neutral-900/80 dark:text-neutral-100/80",
  h = "border-b border-neutral-900/8 dark:border-neutral-100/8",
  p = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  b = "group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] bg-[oklch(94.5%_0.027_26/0.4)] hover:bg-[oklch(94.5%_0.027_26/0.6)] dark:bg-[oklch(29%_0.06_26/0.4)] dark:hover:bg-[oklch(29%_0.06_26/0.6)]",
  m = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  k = "text-right tabular-nums",
  f = "sm:first:ps-6 sm:last:pe-6",
  g = [{id:"RUN-8041",job:"Nightly claims ledger reconciliation",owner:"Asha Malik",status:"Passed",duration:"14m 22s",checked:"39,420 rows",summary:"Matched carrier claims against the posted warehouse ledger. Two rounding adjustments were carried forward for manager review.",sources:["ledger.carrier_claims","warehouse.reconciliations","s3://ops-ledger/aug-03"]},{id:"RUN-8042",job:"Cold-chain incident attachment scan",owner:"Theo Grant",status:"Needs review",duration:"6m 09s",checked:"812 incidents",summary:"Temperature excursions clustered by lane. The Atlanta to Tampa route is missing three signed exception forms.",sources:["forms.temperature_exception","drive://regional-quality"]},{id:"RUN-8043",job:"Vendor master duplicate detection",owner:"Camille Hart",status:"Passed",duration:"3m 58s",checked:"1,204 vendors",summary:"No active duplicates found. Four legacy supplier aliases remain archived and do not block payment release.",sources:["postgres.vendor_master","policy://supplier-aliases"]},{id:"RUN-8044",job:"Freight invoice variance audit for Q3 European lanes",owner:"Jun Park",status:"Failed",duration:"1m 12s",checked:"0 rows",summary:"The rate card connector returned an authentication error, so no invoices could be compared. Reconnect the source and rerun.",sources:["connector.rate_card","audit://2026-q3"]},{id:"RUN-8045",job:"Returns disposition rule check",owner:"Ivy Zhang",status:"Passed",duration:"8m 41s",checked:"5,109 returns",summary:"All dispositions matched the current policy. Twelve items were routed to refurbishment as expected.",sources:["returns.dispositions","policy://returns-2026"]},{id:"RUN-8046",job:"Dock appointment overlap detection",owner:"Marcus Lund",status:"Passed",duration:"2m 33s",checked:"684 appointments",summary:"No double-booked dock windows. Two back-to-back slots flagged for a 10-minute buffer.",sources:["scheduling.dock_windows"]},{id:"RUN-8047",job:"Customs paperwork completeness sweep",owner:"Sofia Martins",status:"Needs review",duration:"11m 04s",checked:"2,940 shipments",summary:"Nine cross-border shipments are missing a commercial invoice attachment.",sources:["customs.shipments","mailbox://broker-intake"]},{id:"RUN-8048",job:"Inventory shrink threshold review",owner:"Rhea Flores",status:"Passed",duration:"5m 27s",checked:"18,006 SKUs",summary:"Shrink stayed under target across every site. Columbus returns hub is trending up week over week.",sources:["inventory.counts"]},{id:"RUN-8049",job:"Carrier SLA breach detection",owner:"Devon Okafor",status:"Passed",duration:"4m 15s",checked:"3,377 loads",summary:"Two carriers breached transit SLA on the west lanes. Both are already within the penalty grace window.",sources:["carriers.sla","loads.transit"]}],
  v = {Passed:"text-neutral-900/80 dark:text-neutral-100/80","Needs review":"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Failed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

function w({status:e}){
  return <span className={d("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",v[e],"whitespace-nowrap")}>{e}</span>;
}

function _(){
  let{ref:e,edges:t,onScroll:r}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:s}=t;
      r({start:a>1,end:Math.ceil(a+s)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),[v,_]=useState(new Set(["RUN-8041"])),[j,N]=useState(""),y=useMemo(()=>{
    let e=j.trim().toLowerCase();
    return e?g.filter(t=>t.job.toLowerCase().includes(e)||t.owner.toLowerCase().includes(e)||t.id.toLowerCase().includes(e)):g;
  }, [j]),S=e=>_(t=>{
    let r=new Set(t);
    return r.has(e)?r.delete(e):r.add(e),r;
  });
  return (
    <div className={d(c,"text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={d(u,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <h2 className={d("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>Overnight checks</h2>
            <label className={d("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","max-sm:hidden sm:w-56")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <input value={j} onChange={e=>N(e.target.value)} placeholder="Search checks" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
              <span className="sr-only">Search checks</span>
            </label>
          </header>
          <div className="relative min-h-0 flex-1">
            <div ref={e} onScroll={r} className="h-full overflow-auto">
              <table className={d("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","min-w-[760px]")}>
                <caption className="sr-only">Overnight automation checks, expandable</caption>
                <thead className={d(c,"sticky top-0 z-20")}>
                  <tr>
                    <th scope="col" className={d(p,f,"w-[52px]")}><span className="sr-only">Expand</span></th>
                    <th scope="col" className={d(p,f)}>Check</th>
                    <th scope="col" className={d(p,f,"w-[150px]")}>Owner</th>
                    <th scope="col" className={d(p,f,"w-[150px]")}>Result</th>
                    <th scope="col" className={d(p,f,"w-[110px] text-right")}>Duration</th>
                    <th scope="col" className={d(p,f,"w-[150px] text-right")}>Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {y.map(e=>{
                    let t=v.has(e.id),r="Failed"===e.status;
                    return (
                      <Fragment key={e.id}>
                                        <tr aria-selected={t} onClick={()=>S(e.id)} className={d(r?b:"group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9","cursor-pointer")}>
                                          <td className={d(m,f,"w-[52px] pe-0")}>
                                            <button type="button" aria-expanded={t} aria-label={`${t?"Collapse":"Expand"} ${e.job}`} onClick={t=>{
                                              t.stopPropagation(),S(e.id)
                                            }} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]","group")}>
                                              <HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                            </button>
                                          </td>
                                          <td className={d(m,f,"max-w-[300px] py-1.5")}>
                                            <span className={d("text-[14px]/[16px] font-[450]","block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]")}>{e.job}</span>
                                            <span className={d("font-mono text-[12px]/[16px] tabular-nums","text-neutral-900/66 dark:text-neutral-100/66","block")}>{e.id}</span>
                                          </td>
                                          <td className={d(m,f,"truncate")}><span className={x}>{e.owner}</span></td>
                                          <td className={d(m,f)}><w status={e.status} /></td>
                                          <td className={d(m,k,f)}><span className={x}>{e.duration}</span></td>
                                          <td className={d(m,k,f)}><span className={x}>{e.checked}</span></td>
                                        </tr>
                                        {t&&<tr className={r?b:"bg-neutral-900/9 dark:bg-neutral-100/9"}>
                                          <td className={d(h,"w-[52px]")} />
                                          <td colSpan={5} className={d(h,"px-3 pb-4 pt-1 pe-4 sm:pe-6")}>
                                            <p className={d("text-[13px]/[18px] font-normal",x,"max-w-2xl")}>{e.summary}</p>
                                            <div className="mt-3 flex flex-wrap items-center gap-1.5">
                                              {e.sources.map(e=><span key={e} className={d("inline-flex h-5 min-w-5 shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 font-mono text-[12px]/[16px] tabular-nums text-neutral-900 dark:text-neutral-100","bg-neutral-900/9 dark:bg-neutral-100/9")}>{e}</span>)}
                                            </div>
                                          </td>
                                        </tr>}
                                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
              {0===y.length&&<div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
                <span aria-hidden="true" className={d(x,"mb-3 flex h-10 w-10 items-center justify-center")}><HugeiconsIcon icon={Icon_73516} size={20} strokeWidth={1.8} /></span>
                <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No checks match that search</p>
                <p className={d("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Try a job name, an owner, or a run ID.</p>
                <button type="button" onClick={()=>N("")} className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-4")}>Clear search</button>
              </div>}
            </div>
            <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
          </div>
          <footer className={d(u,"text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","flex h-12 shrink-0 items-center px-4 sm:px-6")}>
            {"Showing "}
            {y.length}
            {" of "}
            {g.length}
            {" overnight checks"}
          </footer>
        </div>
      </div>
  );
}


export default _;
