/**
 * React Bits Pro — Application UI (agent-approval-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  u = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  b = "flex size-4 shrink-0 items-center justify-center",
  _ = c("text-[13px]/[18px] font-normal",x),
  h = [{id:"customers.read",label:"Read customer records",detail:"Names, emails, plan tier, and invoice status."},{id:"tickets.read",label:"Read recent tickets",detail:"Open and pending tickets from the last 30 days."},{id:"exports.create",label:"Create one export",detail:"A CSV of renewal-risk accounts in the West workspace."}],
  m = `grant_access({
  service: "api.lumendesk.com",
  mode: "read",
  scopes: ["customers.read", "tickets.read", "exports.create"],
  ttlSeconds: 2700
})`;

function f(){
  let e,[t,r]=useState("pending"),[f,v]=useState(h.map(e=>e.id)),[k,g]=useState(2700),[w,j]=useState(false),[y,N]=useState(""),{ref:S,edges:z,onScroll:A}=function(){
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
  }(),[C]=useState(()=>Date.now()+27e5);
  useEffect(()=>{
    if("pending"!==t)return;
    let e=setInterval(()=>{
      let e=Math.max(0,Math.round((C-Date.now())/1e3));
      g(e),0===e&&(r("expired"),N("The request expired before a decision was made."))
    },1e3);
    return ()=>clearInterval(e);
  }, [t,C]),useEffect(()=>{
    if(!y)return;
    let e=setTimeout(()=>N(""),2400);
    return ()=>clearTimeout(e);
  }, [y]);
  let R="pending"!==t,q="granted"===t?[`Access granted for ${f.length} of ${h.length} scopes`,"Expires in 45 min"]:"denied"===t?["Skipped, not approved"]:["Skipped, request expired"];
  return (
    <div className={c("bg-white dark:bg-neutral-950",d,"flex h-full min-h-[560px] w-full flex-col overflow-hidden")}>
        <header className="flex h-14 shrink-0 items-center gap-2 px-4 sm:px-6">
          <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Permission request</h2>
          <span className={c(_,"ml-auto")}>Support agent</span>
        </header>
        <div className="relative min-h-0 flex-1">
          <main ref={S} onScroll={A} className="h-full overflow-y-auto p-4 sm:p-5">
            <section aria-labelledby="aa4-title" className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto w-full max-w-2xl")}>
              <div className="flex min-w-0 flex-col gap-1 px-4 pt-3 pb-1">
                <div className="flex h-6 min-w-0 items-center">
                  {"pending"===t?<span className="inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">Needs approval</span>:<span className={c("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums","granted"===t?"text-neutral-900/80 dark:text-neutral-100/80":"text-neutral-900/66 dark:text-neutral-100/66")}>{"granted"===t?"Granted":"denied"===t?"Skipped":"Expired"}</span>}
                </div>
                <h3 id="aa4-title" className={c("min-w-0 py-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","text-balance")}>Grant read access to customer records for 45 minutes</h3>
              </div>
              <div className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","divide-y divide-neutral-900/8 dark:divide-neutral-100/8")}>
                <div className="px-3 py-3">
                  <p className={c("text-[14px]/[20px] font-normal",u)}>
                    The support agent wants to connect to api.lumendesk.com. Read-only, no billing changes, and access ends automatically when the timer runs out.
                  </p>
                </div>
                <div className={c("flex flex-col px-3 pt-3","pending"===t&&w?"pb-3":"pb-1")}>
                  <p className={c("text-[12px]/[16px] font-normal tabular-nums",x)}>Scopes requested</p>
                  <div className="mt-1 flex flex-col">
                    {h.map(e=>{
                      let t=f.includes(e.id);
                      return (
                        <label key={e.id} className={c("flex items-start gap-3 py-2",R?"cursor-default":"cursor-pointer")}>
                                            <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                                              <input type="checkbox" checked={t} disabled={R} onChange={()=>{
                                                let t;
                                                return t=e.id,v(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t]);
                                              }} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                                              <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                              <span className={c("text-[14px]/[16px] font-[450]",t?d:c(x,"line-through"),"block")}>{e.label}</span>
                                              <span className={c(_,"mt-0.5 block")}>{e.detail}</span>
                                            </span>
                                          </label>
                      );
                    })}
                  </div>
                  {"pending"===t&&<>
                    <button type="button" onClick={()=>j(e=>!e)} aria-expanded={w} className="group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]">
                      <span className={b}>
                        <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                      </span>
                      {w?"Hide request":"Show request"}
                    </button>
                    {w&&<pre tabIndex={0} className={c("flex min-w-0 flex-col gap-3 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 px-3 py-2 dark:bg-neutral-100/5","min-w-0 overflow-x-auto font-mono text-[12px]/[16px] whitespace-pre-wrap text-neutral-900/80 dark:text-neutral-100/80 [overflow-wrap:anywhere]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","mt-1 max-h-40 overflow-auto")}>{m}</pre>}
                  </>}
                </div>
              </div>
              <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">
                {"pending"===t?<>
                  <span className="me-auto inline-flex items-center gap-1.5">
                    <span>Expires in</span>
                    <span className={c(d,"tabular-nums")}>{e=Math.floor(k/60),`${e}:${String(k%60).padStart(2,"0")}`}</span>
                  </span>
                  <button type="button" onClick={()=>{
                    r("denied"),N("Skipped, not approved.")
                  }} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",p)}>Reject</button>
                  <button type="button" disabled={0===f.length} onClick={()=>{
                    r("granted"),N(`Granted access for ${f.length} scopes.`)
                  }} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",p)}>Approve</button>
                </>:<>
                  <span className={b}>
                    <HugeiconsIcon icon={"granted"===t?Icon_90987:Icon_99199} size={12} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <p className={c(u,"flex min-w-0 flex-1 flex-wrap gap-x-3")}>{q.map(e=><span key={e}>{e}</span>)}</p>
                </>}
              </div>
            </section>
          </main>
          <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",z.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",z.end?"opacity-100":"opacity-0")} />
        </div>
        <span className="sr-only" aria-live="polite">{y}</span>
      </div>
  );
}


export default f;
