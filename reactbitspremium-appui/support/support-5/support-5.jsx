/**
 * React Bits Pro — Application UI (support-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = (...e)=>e.filter(Boolean).join(" "),
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "text-[13px]/[18px] font-normal",
  x = "inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums",
  b = {Open:d(x,"text-neutral-900 dark:text-neutral-100"),"Waiting on you":"inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",Resolved:d(x,"text-neutral-900/80 dark:text-neutral-100/80")},
  p = [{id:"4192",subject:"Scheduled export is empty",area:"Reports and exports",status:"Waiting on you",agent:"Sofia Alvarez",updated:"22m ago",replies:4},{id:"4188",subject:"SAML metadata upload fails validation",area:"Accounts and access",status:"Open",agent:"Marcus Bell",updated:"3h ago",replies:7},{id:"4171",subject:"Two invoices issued for March",area:"Billing and plans",status:"Open",agent:"Wei Chen",updated:"Yesterday",replies:2},{id:"4150",subject:"Webhook retries stop after one failure",area:"Integrations",status:"Resolved",agent:"Sofia Alvarez",updated:"4 Aug",replies:11},{id:"4133",subject:"Seat count did not drop after removing a user",area:"Billing and plans",status:"Resolved",agent:"Amelia Whitfield",updated:"1 Aug",replies:3},{id:"4110",subject:"Dashboard filter resets between tabs",area:"Dashboards",status:"Resolved",agent:"Marcus Bell",updated:"28 Jul",replies:5}],
  h = ["All","Open","Resolved"];

function _(){
  let[e,r]=useState("All"),{ref:a,edges:x,onScroll:_}=function(e){
    let r=useRef(null),[a,t]=useState({start:false,end:false}),l=useCallback(()=>{
      let e=r.current;
      if(!e)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=e;
      t({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      l();
      let e=r.current,a=e?.ownerDocument.defaultView;
      if(!e||!a?.ResizeObserver)return;
      let t=new a.ResizeObserver(l);
      return t.observe(e),()=>t.disconnect();
    }, [l,e]),{ref:r,edges:a,onScroll:l};
  }(e),m=useMemo(()=>"Open"===e?p.filter(e=>"Resolved"!==e.status):"Resolved"===e?p.filter(e=>"Resolved"===e.status):p, [e]),f={open:p.filter(e=>"Resolved"!==e.status).length,waiting:p.filter(e=>"Waiting on you"===e.status).length};
  return (
    <div className={d("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className="mx-auto flex w-full max-w-[860px] min-h-0 flex-1 flex-col">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Your requests</h2>
              <p className={d(u,c,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>
                  {f.open}
                  {" open"}
                </span>
                <span>
                  {f.waiting}
                  {" waiting on your reply"}
                </span>
              </p>
            </div>
            <button type="button" className={d("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","w-fit")}>
              <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
              New request
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div role="radiogroup" aria-label="Filter requests" className={d("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8")}>
              {h.map(a=>{
                let n=e===a;
                return <button key={a} type="button" role="radio" aria-checked={n} onClick={()=>r(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{a}</button>;
              })}
            </div>
            <div className={d("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","sm:w-[272px]")}>
              <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <input id="support-5-search" type="search" placeholder="Search by subject or number" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
              <label htmlFor="support-5-search" className="sr-only">Search your requests</label>
            </div>
          </div>
          <div className={d("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","mt-3 flex min-h-0 flex-1 flex-col")}>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className={d("text-[12px]/[16px] font-normal tabular-nums",c,"border-b border-neutral-900/8 dark:border-neutral-100/8","hidden h-8 items-center gap-3 px-4 sm:flex")}>
                <span className="w-14 shrink-0">Ticket</span>
                <span className="min-w-0 flex-1">Subject</span>
                <span className="w-32 shrink-0">Status</span>
                <span className="w-24 shrink-0 text-right">Updated</span>
                <span className="w-4 shrink-0" aria-hidden />
              </div>
              <div className="relative min-h-0 flex-1">
                <ul ref={a} onScroll={_} className={d("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","h-full overflow-y-auto")}>
                  {m.map(e=>(
                    <li key={e.id}>
                                    <button type="button" className={d("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","flex-col items-stretch px-4 sm:flex-row sm:items-center")}>
                                      <span className={d("font-mono text-[12px]/[16px] tabular-nums",c,"w-14 shrink-0")}>
                                        #
                                        {e.id}
                                      </span>
                                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                        <span className={d("text-[14px]/[16px] font-[450]","block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]")}>{e.subject}</span>
                                        <span data-description className={d(u,c,"flex flex-wrap gap-x-3")}>
                                          <span>{e.area}</span>
                                          <span>{e.agent}</span>
                                          <span>
                                            {e.replies}
                                            {" replies"}
                                          </span>
                                        </span>
                                      </span>
                                      <span className="w-32 shrink-0"><span className={b[e.status]}>{e.status}</span></span>
                                      <span className={d("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","w-24 sm:text-right")}>{e.updated}</span>
                                      <HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={1.8} aria-hidden="true" className={d(c,"hidden shrink-0 sm:block")} />
                                    </button>
                                  </li>
                  ))}
                </ul>
                <div aria-hidden="true" className={d("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",x.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={d("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",x.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
          </div>
          <p className={d(u,c,"mt-3 px-1")}>Resolved requests stay readable for 12 months. Replying to one reopens it.</p>
        </div>
      </div>
  );
}


export default _;
