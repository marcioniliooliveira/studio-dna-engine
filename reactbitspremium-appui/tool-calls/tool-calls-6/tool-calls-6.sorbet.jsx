/**
 * React Bits Pro — Application UI (tool-calls-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let u = (...e)=>e.filter(Boolean).join(" ");

let _ = "text-neutral-900 dark:text-neutral-100";

let x = "text-neutral-900/78 dark:text-neutral-100/78";

let eE = (...e)=>e.filter(Boolean).join(" ");

let eT = "text-neutral-900 dark:text-neutral-100";

let eL = "text-neutral-900/78 dark:text-neutral-100/78";

let eM = "text-neutral-900/62 dark:text-neutral-100/62";

let eI = "divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7";

let eW = "text-[14px]/[20px] font-medium";

let eq = "font-mono text-[12px]/[16px] tabular-nums";

let eH = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let eD = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]";

let eO = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let eF = "flex size-[18px] shrink-0 items-center justify-center";

let eB = eE("text-[17px]/[22px] font-extrabold",eT);

let eP = eE("text-[15px]/[20px] font-bold",eT);

let e$ = eE(eW,eL);

let eV = eE("text-[13px]/[16px] font-semibold tabular-nums",eM);

let eK = eE(eq,eM);

let eU = eE(eq,eT);

let eY = eE(eq,eL,"min-w-0 flex-1 whitespace-pre");

let eQ = [{id:"call_e1",tool:"send_email",sentence:"Send the Q3 renewal summary to 4 recipients",rawInput:`{
  "to": ["ops@northstar.io", "finance@northstar.io", "cs@northstar.io", "am@northstar.io"],
  "subject": "Q3 renewal summary",
  "attachments": ["q3-renewals.pdf"]
}`,status:"pending"},{id:"call_m1",tool:"run_migration",sentence:"Apply migration 0042_add_idempotency_key to production",rawInput:'{ "target": "production", "file": "0042_add_idempotency_key.sql" }',status:"pending"},{id:"call_r1",tool:"read_file",sentence:"Read services/payments/retry.ts",rawInput:'{ "path": "services/payments/retry.ts" }',status:"approved",auto:true}];

let eZ = [{label:"Filesystem",perms:[{id:"read_file",tool:"read_file",scope:"Read any file inside the workspace",enabled:true},{id:"edit_file",tool:"edit_file",scope:"Modify files and show a diff before saving",enabled:true},{id:"delete_file",tool:"delete_file",scope:"Remove files, asking before each deletion",enabled:false}]},{label:"Network",perms:[{id:"web_search",tool:"web_search",scope:"Search the web for public documentation",enabled:true},{id:"send_email",tool:"send_email",scope:"Send email, asking approval each time",enabled:false}]}];

function eJ({on:e,onToggle:t,labelId:r}){
  return (
    <button type="button" role="switch" aria-checked={e} aria-labelledby={r} onClick={t} className="group relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] p-0.5 shadow-[inset_0_1px_2px_rgb(84_62_32/0.14),inset_0_0_0_1px_rgb(84_62_32/0.05)] transition-[background-color,box-shadow,outline-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:aria-[checked=false]:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_94%,black)] aria-checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] aria-checked:shadow-[inset_0_1px_2px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_75%,black)] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-neutral-100/16 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)] dark:hover:aria-[checked=false]:not-disabled:bg-neutral-100/24 dark:aria-checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-checked:shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)]">
        <span className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[translate,width] duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-active:w-6 group-aria-checked:translate-x-4 group-aria-checked:group-active:translate-x-3 group-disabled:shadow-none dark:bg-white" />
      </button>
  );
}

function eG({request:e}){
  let t="denied"===e.status;
  return (
    <div className={eE(eW,"flex min-h-11 items-center gap-2.5 px-3 py-2.5")}>
        <span className={eF}>
          <HugeiconsIcon icon={t?Icon_99199:Icon_90987} size={14} strokeWidth={2} aria-hidden="true" className={eM} />
        </span>
        <span className="flex min-w-0 flex-1 items-baseline gap-2.5">
          <span className={eE("shrink-0 text-neutral-900/78 dark:text-neutral-100/78",eq)}>{e.tool}</span>
          <span className={eE("min-w-[6ch] truncate font-bold text-neutral-900 dark:text-neutral-100","flex-1")}>{e.sentence}</span>
        </span>
        <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{t?"Skipped, not approved":e.auto?"Auto-approved":"Approved"}</span>
      </div>
  );
}

function eX({request:e,actionable:t,onDecide:r}){
  let[i,l]=useState(false);
  return (
    <div className="p-3">
        <div className="flex items-start gap-2.5">
          <div className="min-w-0 flex-1">
            <p className={eP}>{e.sentence}</p>
            <p className={eE(eK,"mt-0.5")}>{e.tool}</p>
            <button type="button" onClick={()=>l(e=>!e)} aria-expanded={i} className={eE("group -mx-2 flex min-h-9 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[calc(var(--rb-r-lg,10px))] px-2 text-left text-[14px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:hover:bg-neutral-100/6 dark:active:bg-neutral-100/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","mt-2")}>
              <span className={eF}>
                <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
              </span>
              View request
            </button>
            {i&&<div className={eE("flex min-w-0 flex-col gap-3 rounded-[calc(var(--rb-r-xl,12px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 py-2.5","mt-2 max-h-32 overflow-y-auto")}><pre className={eY}>{e.rawInput}</pre></div>}
            {t?<div className="mt-3 flex items-center gap-2">
              <button type="button" onClick={()=>r(true)} className={eE("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",eH)}>
                <HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" />
                Approve
              </button>
              <button type="button" onClick={()=>r(false)} className={eE("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",eH)}>
                <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
                Reject
              </button>
            </div>:<p className={eE(e$,"mt-3")}>Waiting for the request above</p>}
          </div>
        </div>
      </div>
  );
}


export default function tool_calls_6__Sorbet__Component(){
  let e=useId(),[t,r]=useState(eQ),[i,l]=useState(()=>Object.fromEntries(eZ.flatMap(e=>e.perms.map(e=>[e.id,e.enabled])))),s=t.filter(e=>"pending"===e.status),o=s[0]?.id,c=useRef(null),{ref:d,edges:u,onScroll:_}=function(){
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
  }(),x=useCallback((e,t)=>{
    r(r=>r.map(r=>r.id===e?{...r,status:t?"approved":"denied"}:r)),c.current?.focus({preventScroll:true})
  }, []);
  return (
    <div className={eE("bg-white dark:bg-neutral-950",eT,"relative flex h-full min-h-[880px] w-full flex-col overflow-hidden")}>
        <header className="mx-4 mt-4 mb-1 flex shrink-0 items-center justify-between gap-3 sm:mx-6">
          <h2 className={eB}>Tool permissions</h2>
          <span className={eV}>
            {s.length}
            {" pending"}
          </span>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={d} onScroll={_} className="h-full overflow-y-auto overscroll-contain [overflow-anchor:none]">
            <section>
              <h3 className={eE(eV,"px-4 pt-5 pb-1.5 sm:px-6")}>Requests</h3>
              <div className={eE(eD,"mx-4 sm:mx-6")}>
                <ul ref={c} tabIndex={-1} aria-live="polite" className={eE(eO,eI,"mt-1 focus:outline-none")}>
                  {t.map(e=>(
                    <li key={e.id}>
                                    {"pending"===e.status?<eX request={e} actionable={e.id===o} onDecide={t=>x(e.id,t)} />:<eG request={e} />}
                                  </li>
                  ))}
                </ul>
              </div>
            </section>
            {eZ.map(t=>(
              <section key={t.label}>
                        <h3 className={eE(eV,"px-4 pt-5 pb-1.5 sm:px-6")}>{t.label}</h3>
                        <div className={eE(eD,"mx-4 sm:mx-6")}>
                          <ul className={eE(eO,eI,"mt-1")}>
                            {t.perms.map(t=>{
                              let r=`${e}-${t.id}`;
                              return (
                                <li key={t.id} className="flex items-center justify-between gap-4 px-3 py-3">
                                                  <div className="min-w-0">
                                                    <p id={r} className={eU}>{t.tool}</p>
                                                    <p className={eE(e$,"mt-0.5 truncate")}>{t.scope}</p>
                                                  </div>
                                                  <eJ on={i[t.id]} labelId={r} onToggle={()=>l(e=>({...e,[t.id]:!e[t.id]}))} />
                                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </section>
            ))}
            <div className="h-4" />
          </div>
          <div aria-hidden="true" className={eE("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",u.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={eE("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",u.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}
