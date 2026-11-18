/**
 * React Bits Pro — Application UI (data-table-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_73516 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 8L11 11M11 11L14 14M11 11L14 8M11 11L8 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let eN = (...e)=>e.filter(Boolean).join(" ");

let eC = "bg-white dark:bg-neutral-950";

let eS = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let eA = "text-neutral-900/78 dark:text-neutral-100/78";

let eL = "border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7";

let eM = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let eD = "group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-[oklch(95.5%_0.03_26/0.55)] hover:bg-[oklch(95.5%_0.03_26/0.8)] dark:bg-[oklch(30%_0.065_26/0.4)] dark:hover:bg-[oklch(30%_0.065_26/0.6)]";

let ez = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let eR = "text-right tabular-nums";

let eP = "sm:first:ps-6 sm:last:pe-6";

let eW = [{id:"RUN-8041",job:"Nightly claims ledger reconciliation",owner:"Asha Malik",status:"Passed",duration:"14m 22s",checked:"39,420 rows",summary:"Matched carrier claims against the posted warehouse ledger. Two rounding adjustments were carried forward for manager review.",sources:["ledger.carrier_claims","warehouse.reconciliations","s3://ops-ledger/aug-03"]},{id:"RUN-8042",job:"Cold-chain incident attachment scan",owner:"Theo Grant",status:"Needs review",duration:"6m 09s",checked:"812 incidents",summary:"Temperature excursions clustered by lane. The Atlanta to Tampa route is missing three signed exception forms.",sources:["forms.temperature_exception","drive://regional-quality"]},{id:"RUN-8043",job:"Vendor master duplicate detection",owner:"Camille Hart",status:"Passed",duration:"3m 58s",checked:"1,204 vendors",summary:"No active duplicates found. Four legacy supplier aliases remain archived and do not block payment release.",sources:["postgres.vendor_master","policy://supplier-aliases"]},{id:"RUN-8044",job:"Freight invoice variance audit for Q3 European lanes",owner:"Jun Park",status:"Failed",duration:"1m 12s",checked:"0 rows",summary:"The rate card connector returned an authentication error, so no invoices could be compared. Reconnect the source and rerun.",sources:["connector.rate_card","audit://2026-q3"]},{id:"RUN-8045",job:"Returns disposition rule check",owner:"Ivy Zhang",status:"Passed",duration:"8m 41s",checked:"5,109 returns",summary:"All dispositions matched the current policy. Twelve items were routed to refurbishment as expected.",sources:["returns.dispositions","policy://returns-2026"]},{id:"RUN-8046",job:"Dock appointment overlap detection",owner:"Marcus Lund",status:"Passed",duration:"2m 33s",checked:"684 appointments",summary:"No double-booked dock windows. Two back-to-back slots flagged for a 10-minute buffer.",sources:["scheduling.dock_windows"]},{id:"RUN-8047",job:"Customs paperwork completeness sweep",owner:"Sofia Martins",status:"Needs review",duration:"11m 04s",checked:"2,940 shipments",summary:"Nine cross-border shipments are missing a commercial invoice attachment.",sources:["customs.shipments","mailbox://broker-intake"]},{id:"RUN-8048",job:"Inventory shrink threshold review",owner:"Rhea Flores",status:"Passed",duration:"5m 27s",checked:"18,006 SKUs",summary:"Shrink stayed under target across every site. Columbus returns hub is trending up week over week.",sources:["inventory.counts"]},{id:"RUN-8049",job:"Carrier SLA breach detection",owner:"Devon Okafor",status:"Passed",duration:"4m 15s",checked:"3,377 loads",summary:"Two carriers breached transit SLA on the west lanes. Both are already within the penalty grace window.",sources:["carriers.sla","loads.transit"]}];

let eE = {Passed:"text-neutral-900/78 dark:text-neutral-100/78","Needs review":"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Failed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"};

function eO({status:e}){
  return <span className={eN("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",eE[e],"whitespace-nowrap")}>{e}</span>;
}


export default function data_table_4__Sorbet__Component(){
  let{ref:e,edges:r,onScroll:a}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
      a({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),[o,s]=useState(new Set(["RUN-8041"])),[i,c]=useState(""),u=useMemo(()=>{
    let e=i.trim().toLowerCase();
    return e?eW.filter(r=>r.job.toLowerCase().includes(e)||r.owner.toLowerCase().includes(e)||r.id.toLowerCase().includes(e)):eW;
  }, [i]),x=e=>s(r=>{
    let a=new Set(r);
    return a.has(e)?a.delete(e):a.add(e),a;
  });
  return (
    <div className={eN(eC,"text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={eN(eS,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <h2 className={eN("text-[17px]/[22px] font-extrabold","min-w-0 flex-1 truncate")}>Overnight checks</h2>
            <label className={eN("relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40","h-10","max-sm:hidden sm:w-56")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[15px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 select-none first:ps-3.5 last:pe-3.5 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={18} strokeWidth={2} aria-hidden="true" />
              </span>
              <input value={i} onChange={e=>c(e.target.value)} placeholder="Search checks" className="h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]" />
              <span className="sr-only">Search checks</span>
            </label>
          </header>
          <div className="relative min-h-0 flex-1">
            <div ref={e} onScroll={a} className="h-full overflow-auto">
              <table className={eN("w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium","min-w-[760px]")}>
                <caption className="sr-only">Overnight automation checks, expandable</caption>
                <thead className={eN(eC,"sticky top-0 z-20")}>
                  <tr>
                    <th scope="col" className={eN(eM,eP,"w-[52px]")}><span className="sr-only">Expand</span></th>
                    <th scope="col" className={eN(eM,eP)}>Check</th>
                    <th scope="col" className={eN(eM,eP,"w-[150px]")}>Owner</th>
                    <th scope="col" className={eN(eM,eP,"w-[150px]")}>Result</th>
                    <th scope="col" className={eN(eM,eP,"w-[110px] text-right")}>Duration</th>
                    <th scope="col" className={eN(eM,eP,"w-[150px] text-right")}>Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {u.map(e=>{
                    let r=o.has(e.id),a="Failed"===e.status;
                    return (
                      <Fragment key={e.id}>
                                        <tr aria-selected={r} onClick={()=>x(e.id)} className={eN(a?eD:"group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","cursor-pointer")}>
                                          <td className={eN(ez,eP,"w-[52px] pe-0")}>
                                            <button type="button" aria-expanded={r} aria-label={`${r?"Collapse":"Expand"} ${e.job}`} onClick={r=>{
                                              r.stopPropagation(),x(e.id)
                                            }} className={eN("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-8 rounded-[calc(var(--rb-r-full,999px))]","group")}>
                                              <HugeiconsIcon icon={Icon_5042} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                            </button>
                                          </td>
                                          <td className={eN(ez,eP,"max-w-[300px] py-1.5")}>
                                            <span className={eN("text-[15px]/[20px] font-bold","block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]")}>{e.job}</span>
                                            <span className={eN("font-mono text-[12px]/[16px] tabular-nums","text-neutral-900/62 dark:text-neutral-100/62","block")}>{e.id}</span>
                                          </td>
                                          <td className={eN(ez,eP,"truncate")}><span className={eA}>{e.owner}</span></td>
                                          <td className={eN(ez,eP)}><eO status={e.status} /></td>
                                          <td className={eN(ez,eR,eP)}><span className={eA}>{e.duration}</span></td>
                                          <td className={eN(ez,eR,eP)}><span className={eA}>{e.checked}</span></td>
                                        </tr>
                                        {r&&<tr className={a?eD:"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]"}>
                                          <td className={eN(eL,"w-[52px]")} />
                                          <td colSpan={5} className={eN(eL,"px-3 pb-4 pt-1 pe-4 sm:pe-6")}>
                                            <p className={eN("text-[14px]/[20px] font-medium",eA,"max-w-2xl")}>{e.summary}</p>
                                            <div className="mt-3 flex flex-wrap items-center gap-1.5">
                                              {e.sources.map(e=><span key={e} className={eN("inline-flex h-5.5 min-w-5.5 shrink-0 items-center justify-center whitespace-nowrap rounded-[calc(var(--rb-r-md,8px))] px-2 font-mono text-[12px]/[16px] font-medium tabular-nums text-neutral-900 dark:text-neutral-100","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:bg-neutral-100/10")}>{e}</span>)}
                                            </div>
                                          </td>
                                        </tr>}
                                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
              {0===u.length&&<div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
                <span aria-hidden="true" className={eN(eA,"mb-3 flex h-10 w-10 items-center justify-center")}><HugeiconsIcon icon={Icon_73516} size={20} strokeWidth={2} /></span>
                <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">No checks match that search</p>
                <p className={eN("max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-1")}>Try a job name, an owner, or a run ID.</p>
                <button type="button" onClick={()=>c("")} className={eN("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","mt-4")}>Clear search</button>
              </div>}
            </div>
            <div aria-hidden="true" className={eN("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
          </div>
          <footer className={eN(eS,"text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","flex h-12 shrink-0 items-center px-4 sm:px-6")}>
            {"Showing "}
            {u.length}
            {" of "}
            {eW.length}
            {" overnight checks"}
          </footer>
        </div>
      </div>
  );
}
