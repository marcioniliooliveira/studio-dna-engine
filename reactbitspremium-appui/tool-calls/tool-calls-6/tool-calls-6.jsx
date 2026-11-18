/**
 * React Bits Pro — Application UI (tool-calls-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/80 dark:text-neutral-100/80",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  b = "text-[13px]/[18px] font-normal",
  h = "font-mono text-[12px]/[16px] tabular-nums",
  f = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  k = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  v = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  g = "flex size-4 shrink-0 items-center justify-center",
  _ = c("text-[16px]/[20px] font-[450] tracking-[-0.015em]",u),
  w = c("text-[14px]/[16px] font-[450]",u),
  y = c(b,x),
  j = c("text-[12px]/[16px] font-normal tabular-nums",p),
  N = c(h,p),
  z = c(h,u),
  S = c(h,x,"min-w-0 flex-1 whitespace-pre"),
  A = [{id:"call_e1",tool:"send_email",sentence:"Send the Q3 renewal summary to 4 recipients",rawInput:`{
  "to": ["ops@northstar.io", "finance@northstar.io", "cs@northstar.io", "am@northstar.io"],
  "subject": "Q3 renewal summary",
  "attachments": ["q3-renewals.pdf"]
}`,status:"pending"},{id:"call_m1",tool:"run_migration",sentence:"Apply migration 0042_add_idempotency_key to production",rawInput:'{ "target": "production", "file": "0042_add_idempotency_key.sql" }',status:"pending"},{id:"call_r1",tool:"read_file",sentence:"Read services/payments/retry.ts",rawInput:'{ "path": "services/payments/retry.ts" }',status:"approved",auto:true}],
  R = [{label:"Filesystem",perms:[{id:"read_file",tool:"read_file",scope:"Read any file inside the workspace",enabled:true},{id:"edit_file",tool:"edit_file",scope:"Modify files and show a diff before saving",enabled:true},{id:"delete_file",tool:"delete_file",scope:"Remove files, asking before each deletion",enabled:false}]},{label:"Network",perms:[{id:"web_search",tool:"web_search",scope:"Search the web for public documentation",enabled:true},{id:"send_email",tool:"send_email",scope:"Send email, asking approval each time",enabled:false}]}];

function C({on:e,onToggle:t,labelId:r}){
  return (
    <button type="button" role="switch" aria-checked={e} aria-labelledby={r} onClick={t} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
        <span className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
      </button>
  );
}

function T({request:e}){
  let t="denied"===e.status;
  return (
    <div className={c(b,"flex min-h-11 items-center gap-2.5 px-3 py-2.5")}>
        <span className={g}>
          <HugeiconsIcon icon={t?Icon_99199:Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" className={p} />
        </span>
        <span className="flex min-w-0 flex-1 items-baseline gap-2.5">
          <span className={c("shrink-0 text-neutral-900/80 dark:text-neutral-100/80",h)}>{e.tool}</span>
          <span className={c("min-w-[6ch] truncate text-neutral-900 dark:text-neutral-100","flex-1")}>{e.sentence}</span>
        </span>
        <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{t?"Skipped, not approved":e.auto?"Auto-approved":"Approved"}</span>
      </div>
  );
}

function E({request:e,actionable:t,onDecide:r}){
  let[i,u]=useState(false);
  return (
    <div className="p-3">
        <div className="flex items-start gap-2.5">
          <div className="min-w-0 flex-1">
            <p className={w}>{e.sentence}</p>
            <p className={c(N,"mt-0.5")}>{e.tool}</p>
            <button type="button" onClick={()=>u(e=>!e)} aria-expanded={i} className={c("group -mx-2 flex min-h-8 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-900/5 active:bg-neutral-900/8 dark:hover:bg-neutral-100/5 dark:active:bg-neutral-100/8 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","mt-2")}>
              <span className={g}>
                <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
              </span>
              View request
            </button>
            {i&&<div className={c("flex min-w-0 flex-col gap-3 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 px-3 py-2 dark:bg-neutral-100/5","mt-2 max-h-32 overflow-y-auto")}><pre className={S}>{e.rawInput}</pre></div>}
            {t?<div className="mt-3 flex items-center gap-2">
              <button type="button" onClick={()=>r(true)} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",f)}>
                <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />
                Approve
              </button>
              <button type="button" onClick={()=>r(false)} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",f)}>
                <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                Reject
              </button>
            </div>:<p className={c(y,"mt-3")}>Waiting for the request above</p>}
          </div>
        </div>
      </div>
  );
}

function H(){
  let e=useId(),[t,r]=useState(A),[s,i]=useState(()=>Object.fromEntries(R.flatMap(e=>e.perms.map(e=>[e.id,e.enabled])))),l=t.filter(e=>"pending"===e.status),o=l[0]?.id,d=useRef(null),{ref:x,edges:p,onScroll:b}=function(){
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
  }(),h=useCallback((e,t)=>{
    r(r=>r.map(r=>r.id===e?{...r,status:t?"approved":"denied"}:r)),d.current?.focus({preventScroll:true})
  }, []);
  return (
    <div className={c("bg-white dark:bg-neutral-950",u,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className="mx-4 mt-4 mb-1 flex shrink-0 items-center justify-between gap-3 sm:mx-6">
          <h2 className={_}>Tool permissions</h2>
          <span className={j}>
            {l.length}
            {" pending"}
          </span>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={x} onScroll={b} className="h-full overflow-y-auto overscroll-contain [overflow-anchor:none]">
            <section>
              <h3 className={c(j,"px-4 pt-5 pb-1.5 sm:px-6")}>Requests</h3>
              <div className={c(k,"mx-4 sm:mx-6")}>
                <ul ref={d} tabIndex={-1} aria-live="polite" className={c(v,m,"mt-1 focus:outline-none")}>
                  {t.map(e=>(
                    <li key={e.id}>
                                    {"pending"===e.status?<E request={e} actionable={e.id===o} onDecide={t=>h(e.id,t)} />:<T request={e} />}
                                  </li>
                  ))}
                </ul>
              </div>
            </section>
            {R.map(t=>(
              <section key={t.label}>
                        <h3 className={c(j,"px-4 pt-5 pb-1.5 sm:px-6")}>{t.label}</h3>
                        <div className={c(k,"mx-4 sm:mx-6")}>
                          <ul className={c(v,m,"mt-1")}>
                            {t.perms.map(t=>{
                              let r=`${e}-${t.id}`;
                              return (
                                <li key={t.id} className="flex items-center justify-between gap-4 px-3 py-3">
                                                  <div className="min-w-0">
                                                    <p id={r} className={z}>{t.tool}</p>
                                                    <p className={c(y,"mt-0.5 truncate")}>{t.scope}</p>
                                                  </div>
                                                  <C on={s[t.id]} labelId={r} onToggle={()=>i(e=>({...e,[t.id]:!e[t.id]}))} />
                                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </section>
            ))}
            <div className="h-4" />
          </div>
          <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",p.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",p.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default H;
