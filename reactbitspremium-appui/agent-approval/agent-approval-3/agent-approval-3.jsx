/**
 * React Bits Pro — Application UI (agent-approval-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, id, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  s = "text-neutral-900/66 dark:text-neutral-100/66",
  c = "text-[13px]/[18px] font-normal",
  d = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  u = "text-neutral-900/66 dark:text-neutral-100/66",
  x = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/80 dark:text-neutral-100/80",
  b = o(c,s),
  _ = [{id:"req-901",title:"Refund 3 duplicate charges to Acme Logistics",detail:["$1,240.00 total","West billing account"],args:`refund_charges({
  account: "acme-logistics",
  chargeIds: ["ch_71a", "ch_802", "ch_9c4"],
  reason: "duplicate"
})`,status:"pending",time:"now"},{id:"req-902",title:"Email the Q3 renewal summary to 4 recipients",detail:["Attaches renewal-risk.pdf"],args:`send_email({
  template: "q3-renewal-summary",
  recipients: 4,
  attachment: "renewal-risk.pdf"
})`,status:"queued",time:"now"},{id:"req-903",title:"Archive 312 paused campaigns older than 18 months",detail:["EU and NA marketing workspaces"],args:`archive_campaigns({
  status: "paused",
  olderThanMonths: 18,
  workspaces: ["EU", "NA"]
})`,status:"queued",time:"now"},{id:"req-904",title:"Add a private note to ticket #4821",detail:["Matched the auto-approve policy for internal notes"],args:"",status:"auto",time:"9:41"},{id:"req-905",title:"Grant read access to analytics for 30 minutes",detail:["Meridian service account"],args:"",status:"approved",time:"9:12"},{id:"req-906",title:"Rotate the production API token",detail:["Payments service"],args:"",status:"denied",time:"Yesterday"},{id:"req-907",title:"Merge the staging config branch",detail:["No response within the 2-hour window"],args:"",status:"expired",time:"Yesterday"},{id:"req-908",title:"Change the invoice retention window to 45 days",detail:["billing-retention-policy.ts"],args:"",status:"denied",time:"Yesterday"},{id:"req-909",title:"Reset QA seed data before the nightly replay",detail:["Matched the auto-approve policy for QA-only tasks"],args:"",status:"auto",time:"Mon"},{id:"req-911",title:"Delete the abandoned import job queue",detail:["No response within the 2-hour window"],args:"",status:"expired",time:"Mon"}],
  h = {pending:x,queued:x,auto:p,approved:p,denied:u,expired:u},
  m = {pending:"Waiting",queued:"Queued",auto:"Auto-approved",approved:"Approved",denied:"Skipped",expired:"Expired"};

function f(){
  let[e,t]=useState(_),[r,u]=useState(false),[x,p]=useState(""),{ref:f,edges:v,onScroll:k}=function(){
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
  }(),g=useMemo(()=>e.find(e=>"pending"===e.status)?.id??null, [e]),w=e.filter(e=>"pending"===e.status||"queued"===e.status).length;
  useEffect(()=>{
    if(!x)return;
    let e=setTimeout(()=>p(""),2400);
    return ()=>clearTimeout(e);
  }, [x]);
  let j=(e,r)=>{
    u(false),t(t=>{
      let a=t.map(t=>t.id===e?{...t,status:r,time:"now"}:t),n=a.find(e=>"queued"===e.status);
      return n?a.map(e=>e.id===id?{...e,status:"pending"}:e):a;
    }),p("approved"===r?"Approved. Next request is ready.":"Skipped, not approved.")
  };
  return (
    <div className={o("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <header className="flex h-14 shrink-0 items-center gap-2 px-4 sm:px-6">
          <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Approvals</h2>
          <span className={o(w>0?"inline-flex h-5 shrink-0 items-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-1.5 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100":b,"ml-auto inline-flex items-center gap-1.5")}>
            <span className="tabular-nums">
              {w}
              {" waiting"}
            </span>
          </span>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={f} onScroll={k} className="h-full overflow-y-auto overscroll-contain">
            <ul className={o("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex flex-col px-4 py-2 sm:px-6")}>
              {e.map(e=>{
                let t=e.id===g;
                return (
                  <li key={e.id} className={t?"py-3":undefined}>
                                {t?<div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
                                  <div className="flex min-w-0 flex-col gap-1 px-4 pt-3 pb-1">
                                    <div className="flex h-6 min-w-0 items-center">
                                      <span className="inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">Needs approval</span>
                                    </div>
                                    <p className={o("min-w-0 py-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","text-balance")}>{e.title}</p>
                                  </div>
                                  <div className={o("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","gap-1 px-3 pt-3",r&&e.args?"pb-3":"pb-1")}>
                                    <p className={o(c,"text-neutral-900/80 dark:text-neutral-100/80","flex flex-wrap gap-x-3")}>{e.detail.map(e=><span key={e}>{e}</span>)}</p>
                                    <button type="button" onClick={()=>u(e=>!e)} aria-expanded={r} className="group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]">
                                      <span className="flex size-4 shrink-0 items-center justify-center">
                                        <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                      </span>
                                      {r?"Hide request":"Show request"}
                                    </button>
                                    {r&&e.args&&<pre tabIndex={0} className={o("flex min-w-0 flex-col gap-3 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 px-3 py-2 dark:bg-neutral-100/5","min-w-0 overflow-x-auto font-mono text-[12px]/[16px] whitespace-pre-wrap text-neutral-900/80 dark:text-neutral-100/80 [overflow-wrap:anywhere]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","max-h-40 overflow-auto")}>{e.args}</pre>}
                                  </div>
                                  <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">
                                    <button type="button" onClick={()=>j(e.id,"denied")} className={o("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",d)}>Reject</button>
                                    <button type="button" onClick={()=>j(e.id,"approved")} className={o("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",d)}>Approve</button>
                                  </div>
                                </div>:<div className="relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14">
                                  <p className={o("text-[14px]/[16px] font-[450]","min-w-0 flex-1 truncate")}>{e.title}</p>
                                  <div className="flex shrink-0 items-baseline gap-3">
                                    <span className={o("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",h[e.status],"w-24 shrink-0 justify-end whitespace-nowrap sm:w-28")}>{m[e.status]}</span>
                                    <span className={o("text-[12px]/[16px] font-normal tabular-nums",s,"hidden w-16 shrink-0 text-right sm:block")}>{e.time}</span>
                                  </div>
                                </div>}
                              </li>
                );
              })}
            </ul>
          </div>
          <div aria-hidden="true" className={o("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",v.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={o("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",v.end?"opacity-100":"opacity-0")} />
        </div>
        <span className="sr-only" aria-live="polite">{x}</span>
      </div>
  );
}


export default f;
