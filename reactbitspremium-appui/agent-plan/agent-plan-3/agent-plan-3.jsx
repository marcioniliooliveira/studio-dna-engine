/**
 * React Bits Pro — Application UI (agent-plan-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/80 dark:text-neutral-100/80",
  h = "text-[14px]/[16px] font-[450]",
  b = "text-[13px]/[18px] font-normal",
  p = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  m = "rounded-[var(--rb-r-sm,6px)]",
  f = "relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]",
  k = c(b,"text-neutral-900/66 dark:text-neutral-100/66"),
  g = [{id:"prepare",title:"Prepare the data",subs:[{id:"p1",title:"Load the source files",state:"done"},{id:"p2",title:"Validate the schema",state:"done"},{id:"p3",title:"Snapshot the current rows",state:"done"}]},{id:"migrate",title:"Apply the migration",subs:[{id:"m1",title:"Write the migration file",state:"done"},{id:"m2",title:"Backfill the user rows",state:"done"},{id:"m3",title:"Verify the row counts",state:"failed"},{id:"m4",title:"Drop the legacy tier column",state:"queued"}]},{id:"ship",title:"Ship the change",subs:[{id:"s1",title:"Update the changelog",state:"queued"},{id:"s2",title:"Tag the release",state:"queued"},{id:"s3",title:"Publish the registry payloads",state:"queued"}]},{id:"verify",title:"Verify in staging",subs:[{id:"v1",title:"Run the smoke tests",state:"queued"},{id:"v2",title:"Check the billing dashboard",state:"queued"},{id:"v3",title:"Compare the entitlement counts",state:"queued"}]}],
  v = {done:"Done",running:"Running",queued:"Queued",failed:"Failed"},
  _ = {done:"text-neutral-900/80 dark:text-neutral-100/80",running:"text-neutral-900 dark:text-neutral-100",queued:"text-neutral-900 dark:text-neutral-100",failed:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]"},
  w = {done:"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/80 dark:text-neutral-100/80 dark:border-neutral-100/14",running:"border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100",queued:"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14",failed:"border-[oklch(60%_0.236_26)] dark:border-[oklch(65.2%_0.219_26)] bg-[oklch(94.5%_0.027_26)] dark:bg-[oklch(29%_0.06_26)] text-neutral-900 dark:text-neutral-100"},
  j = {done:x,running:u,queued:u,failed:u};

function N(){
  let{ref:e,edges:t,onScroll:r}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=t;
      r({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),[N,y]=useState({prepare:true,migrate:true,ship:false,verify:false}),[z,S]=useState({}),R=e=>z[e.id]?"running":e.state,C=g.flatMap(e=>e.subs),q=C.filter(e=>"done"===R(e)).length;
  return (
    <div className={c("bg-white dark:bg-neutral-950",u,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-center gap-3">
          <h2 className={c("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>Migrate the entitlement tables</h2>
          <span className={c(k,"shrink-0 tabular-nums")}>
            {q}
            {" of "}
            {C.length}
            {" done"}
          </span>
        </header>
        <div className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
          <div className={c("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
            <ul ref={e} onScroll={r} className={c(p,"h-full overflow-y-auto overscroll-contain")}>
              {g.map(e=>{
                let t=N[e.id],r=e.subs.filter(e=>"done"===R(e)).length;
                return (
                  <li key={e.id}>
                                <div className="p-1">
                                  <button type="button" aria-expanded={t} aria-controls={`${e.id}-steps`} onClick={()=>y(t=>({...t,[e.id]:!t[e.id]}))} className={c(f,"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8",m,"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","group h-9 px-2")}>
                                    <span className="flex size-4 shrink-0 items-center justify-center">
                                      <HugeiconsIcon icon={Icon_5042} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/66 dark:text-neutral-100/66 transition-transform duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                    </span>
                                    <span className={c(h,"min-w-0 flex-1 truncate")}>{e.title}</span>
                                    <span className={c(b,x,"w-20 shrink-0 text-right tabular-nums")}>
                                      {r}
                                      {" of "}
                                      {e.subs.length}
                                    </span>
                                  </button>
                                </div>
                                {t&&<ul id={`${e.id}-steps`} className={c(p,"pl-7")}>
                                  {e.subs.map((e,t)=>{
                                    let r=R(e);
                                    return (
                                      <li key={e.id} aria-current={"running"===r?"step":undefined} className="p-1">
                                                          <div className={c(f,"failed"===r?"bg-[oklch(94.5%_0.027_26/0.4)] hover:bg-[oklch(94.5%_0.027_26/0.6)] dark:bg-[oklch(29%_0.06_26/0.4)] dark:hover:bg-[oklch(29%_0.06_26/0.6)]":"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5",m,"h-9 content-center px-2")}>
                                                            <span className={c("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums",w[r],"h-7 w-7")}>
                                                              {"done"===r?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" />:"failed"===r?<HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />:t+1}
                                                            </span>
                                                            <span className={c(h,j[r],"min-w-0 flex-1 truncate")}>{e.title}</span>
                                                            {"failed"===r&&<button type="button" onClick={()=>S(t=>({...t,[e.id]:true}))} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>
                                                              <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
                                                              <span className="max-sm:sr-only">Retry</span>
                                                            </button>}
                                                            <span className="flex w-20 shrink-0 items-center justify-end gap-1.5">
                                                              <span className={c("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",_[r])}>
                                                                {"running"===r&&<span className="flex h-lh shrink-0 items-center">
                                                                  <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />
                                                                </span>}
                                                                {v[r]}
                                                              </span>
                                                            </span>
                                                          </div>
                                                        </li>
                                    );
                                  })}
                                </ul>}
                              </li>
                );
              })}
            </ul>
            <div aria-hidden="true" className={c("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",t.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={c("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default N;
