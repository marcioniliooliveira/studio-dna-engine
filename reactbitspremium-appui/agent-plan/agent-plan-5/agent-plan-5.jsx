/**
 * React Bits Pro — Application UI (agent-plan-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, end, observe, start, useCallback, useEffect, useRef, useState } from 'react';

let l = (...e)=>e.filter(Boolean).join(" "),
  i = "text-neutral-900 dark:text-neutral-100",
  s = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  o = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  d = l("text-[13px]/[18px] font-normal","text-neutral-900/66 dark:text-neutral-100/66"),
  c = [{title:"Investigate",steps:[{title:"Read the billing contract notes",state:"done",duration:"3m"},{title:"Map the entitlement resolver",state:"done",duration:"2m"},{title:"Trace an expired key end to end",state:"done",duration:"4m"},{title:"Collect the failing support tickets",state:"done",duration:"2m"},{title:"Diff the two tier tables",state:"done",duration:"1m"},{title:"Check the renewal webhook log",state:"done",duration:"3m"},{title:"Write up the root cause",state:"done",duration:"2m"}]},{title:"Implement",steps:[{title:"Patch the tier lookup fallback",state:"done",duration:"11m"},{title:"Add the grace-window constant",state:"done",duration:"1m"},{title:"Add a renewal-grace test",state:"running",duration:"4m"},{title:"Cover the expired-key branch",state:"queued",duration:"3m"},{title:"Run the license branch checks",state:"queued",duration:"5m"},{title:"Regenerate the registry payloads",state:"queued",duration:"2m"},{title:"Update the installation docs",state:"queued",duration:"3m"}]},{title:"Verify",steps:[{title:"Deploy to the staging project",state:"queued",duration:"4m"},{title:"Run the smoke tests",state:"queued",duration:"6m"},{title:"Check the billing dashboard",state:"queued",duration:"2m"},{title:"Compare the entitlement counts",state:"queued",duration:"2m"},{title:"Replay the failing tickets",state:"queued",duration:"3m"},{title:"Notify the reviewer channel",state:"queued",duration:"1m"},{title:"Summarize the handoff",state:"queued",duration:"2m"}]}],
  u = {done:"Done",running:"Running",queued:"Queued"},
  x = {done:"text-neutral-900/80 dark:text-neutral-100/80",running:"text-neutral-900 dark:text-neutral-100",queued:"text-neutral-900 dark:text-neutral-100"},
  h = {done:"text-neutral-900/80 dark:text-neutral-100/80",running:i,queued:i};

function b(){
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
}

function p({phase:e}){
  let{ref:t,edges:r,onScroll:n}=b(),i=e.steps.filter(e=>"done"===e.state).length;
  return (
    <section className={l("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","shrink-0 lg:min-h-0 lg:shrink")}>
        <h3 className={l("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","h-10")}>
          <span className={l("min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","flex-1")}>{e.title}</span>
          <span className="shrink-0 text-[14px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">
            {i}
            /
            {e.steps.length}
          </span>
        </h3>
        <div className={l("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative lg:min-h-0 lg:flex-1")}>
          <ol ref={t} onScroll={n} className={l("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","overscroll-contain lg:h-full lg:overflow-y-auto")}>
            {e.steps.map(e=>(
              <li key={e.title} className="px-3 py-3">
                        <p className={l("text-[14px]/[16px] font-[450]",h[e.state],"truncate")}>{e.title}</p>
                        <p className={l(d,"mt-0.5 flex items-center gap-2 tabular-nums")}>
                          <span className={l(x[e.state],"inline-flex items-center gap-1.5")}>
                            {"running"===e.state&&<span className="flex h-lh shrink-0 items-center">
                              <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />
                            </span>}
                            {u[e.state]}
                          </span>
                          <span className="shrink-0">{e.duration}</span>
                        </p>
                      </li>
            ))}
          </ol>
          <div aria-hidden="true" className={l(s,"pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={l(o,"pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
        </div>
      </section>
  );
}

function m(){
  let e=c.flatMap(e=>e.steps),t=e.filter(e=>"done"===e.state).length,{ref:r,edges:n,onScroll:u}=b();
  return (
    <div className={l("bg-white dark:bg-neutral-950",i,"relative flex h-full min-h-[560px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-center gap-3">
          <h2 className={l("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>Fix billing entitlements</h2>
          <span className={l(d,"shrink-0 tabular-nums")}>
            {t}
            {" of "}
            {e.length}
            {" done"}
          </span>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={r} onScroll={u} className="flex h-full flex-col gap-3 overflow-y-auto overscroll-contain lg:grid lg:grid-cols-3 lg:overflow-hidden">{c.map(e=><p key={e.title} phase={e} />)}</div>
          <div aria-hidden="true" className={l(s,"pointer-events-none absolute inset-x-0 top-0 h-8",start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={l(o,"pointer-events-none absolute inset-x-0 bottom-0 h-8",end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default m;
