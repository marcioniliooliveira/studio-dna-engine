/**
 * React Bits Pro — Application UI (agent-approval-3 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, id, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" ");

let d = "text-neutral-900/78 dark:text-neutral-100/78";

let x = "text-neutral-900/62 dark:text-neutral-100/62";

let b = "text-[14px]/[20px] font-medium";

let p = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let u = "flex min-w-0 flex-col gap-4 text-[15px]/[24px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]";

let C = (...e)=>e.filter(Boolean).join(" ");

let R = "text-neutral-900/62 dark:text-neutral-100/62";

let q = "text-[14px]/[20px] font-medium";

let M = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let W = "text-neutral-900/62 dark:text-neutral-100/62";

let E = "text-neutral-900 dark:text-neutral-100";

let L = "text-neutral-900/78 dark:text-neutral-100/78";

let D = C(q,R);

let I = [{id:"req-901",title:"Refund 3 duplicate charges to Acme Logistics",detail:["$1,240.00 total","West billing account"],args:`refund_charges({
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
})`,status:"queued",time:"now"},{id:"req-904",title:"Add a private note to ticket #4821",detail:["Matched the auto-approve policy for internal notes"],args:"",status:"auto",time:"9:41"},{id:"req-905",title:"Grant read access to analytics for 30 minutes",detail:["Meridian service account"],args:"",status:"approved",time:"9:12"},{id:"req-906",title:"Rotate the production API token",detail:["Payments service"],args:"",status:"denied",time:"Yesterday"},{id:"req-907",title:"Merge the staging config branch",detail:["No response within the 2-hour window"],args:"",status:"expired",time:"Yesterday"},{id:"req-908",title:"Change the invoice retention window to 45 days",detail:["billing-retention-policy.ts"],args:"",status:"denied",time:"Yesterday"},{id:"req-909",title:"Reset QA seed data before the nightly replay",detail:["Matched the auto-approve policy for QA-only tasks"],args:"",status:"auto",time:"Mon"},{id:"req-911",title:"Delete the abandoned import job queue",detail:["No response within the 2-hour window"],args:"",status:"expired",time:"Mon"}];

let T = {pending:E,queued:E,auto:L,approved:L,denied:W,expired:W};

let O = {pending:"Waiting",queued:"Queued",auto:"Auto-approved",approved:"Approved",denied:"Skipped",expired:"Expired"};


export default function agent_approval_3__Sorbet__Component(){
  let[e,a]=useState(I),[r,o]=useState(false),[i,_]=useState(""),{ref:c,edges:d,onScroll:x}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:o}=a;
      r({start:t>1,end:Math.ceil(t+o)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),b=useMemo(()=>e.find(e=>"pending"===e.status)?.id??null, [e]),p=e.filter(e=>"pending"===e.status||"queued"===e.status).length;
  useEffect(()=>{
    if(!i)return;
    let e=setTimeout(()=>_(""),2400);
    return ()=>clearTimeout(e);
  }, [i]);
  let u=(e,r)=>{
    o(false),a(a=>{
      let t=a.map(a=>a.id===e?{...a,status:r,time:"now"}:a),n=t.find(e=>"queued"===e.status);
      return n?t.map(e=>e.id===id?{...e,status:"pending"}:e):t;
    }),_("approved"===r?"Approved. Next request is ready.":"Skipped, not approved.")
  };
  return (
    <div className={C("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <header className="flex h-14 shrink-0 items-center gap-2 px-4 sm:px-6">
          <h2 className="text-[17px]/[22px] font-extrabold">Approvals</h2>
          <span className={C(p>0?"inline-flex h-5.5 shrink-0 items-center whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] bg-white px-2.5 text-[12px]/[16px] font-bold tabular-nums text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.09),0_1px_2px_rgb(84_62_32/0.08)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.55)] dark:bg-neutral-800":D,"ml-auto inline-flex items-center gap-1.5")}>
            <span className="tabular-nums">
              {p}
              {" waiting"}
            </span>
          </span>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={c} onScroll={x} className="h-full overflow-y-auto overscroll-contain">
            <ul className={C("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","flex flex-col px-4 py-2 sm:px-6")}>
              {e.map(e=>{
                let a=e.id===b;
                return (
                  <li key={e.id} className={a?"py-3":undefined}>
                                {a?<div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
                                  <div className="flex min-w-0 flex-col gap-1 px-4 pt-3 pb-1">
                                    <div className="flex h-6 min-w-0 items-center">
                                      <span className="inline-flex h-7 shrink-0 items-center whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] bg-white px-3 text-[14px]/[18px] font-bold tabular-nums text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.09),0_1px_2px_rgb(84_62_32/0.08)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.55)] dark:bg-neutral-800">Needs approval</span>
                                    </div>
                                    <p className={C("min-w-0 py-2.5 text-[15px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100","text-balance")}>{e.title}</p>
                                  </div>
                                  <div className={C("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","gap-1 px-3 pt-3",r&&e.args?"pb-3":"pb-1")}>
                                    <p className={C(q,"text-neutral-900/78 dark:text-neutral-100/78","flex flex-wrap gap-x-3")}>{e.detail.map(e=><span key={e}>{e}</span>)}</p>
                                    <button type="button" onClick={()=>o(e=>!e)} aria-expanded={r} className="group -mx-2 flex min-h-9 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[calc(var(--rb-r-lg,10px))] px-2 text-left text-[14px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:hover:bg-neutral-100/6 dark:active:bg-neutral-100/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]">
                                      <span className="flex size-[18px] shrink-0 items-center justify-center">
                                        <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                      </span>
                                      {r?"Hide request":"Show request"}
                                    </button>
                                    {r&&e.args&&<pre tabIndex={0} className={C("flex min-w-0 flex-col gap-3 rounded-[calc(var(--rb-r-xl,12px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 py-2.5","min-w-0 overflow-x-auto font-mono text-[12px]/[18px] whitespace-pre-wrap text-neutral-900/78 dark:text-neutral-100/78 [overflow-wrap:anywhere]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","max-h-40 overflow-auto")}>{e.args}</pre>}
                                  </div>
                                  <div className="flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5">
                                    <button type="button" onClick={()=>u(e.id,"denied")} className={C("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",M)}>Reject</button>
                                    <button type="button" onClick={()=>u(e.id,"approved")} className={C("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",M)}>Approve</button>
                                  </div>
                                </div>:<div className="relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16">
                                  <p className={C("text-[15px]/[20px] font-bold","min-w-0 flex-1 truncate")}>{e.title}</p>
                                  <div className="flex shrink-0 items-baseline gap-3">
                                    <span className={C("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",T[e.status],"w-24 shrink-0 justify-end whitespace-nowrap sm:w-28")}>{O[e.status]}</span>
                                    <span className={C("text-[13px]/[16px] font-semibold tabular-nums",R,"hidden w-16 shrink-0 text-right sm:block")}>{e.time}</span>
                                  </div>
                                </div>}
                              </li>
                );
              })}
            </ul>
          </div>
          <div aria-hidden="true" className={C("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",d.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={C("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",d.end?"opacity-100":"opacity-0")} />
        </div>
        <span className="sr-only" aria-live="polite">{i}</span>
      </div>
  );
}
