/**
 * React Bits Pro — Application UI (agent-plan-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, end, observe, start, useCallback, useEffect, useRef, useState } from 'react';

let eg = (...e)=>e.filter(Boolean).join(" ");

let ef = "text-neutral-900 dark:text-neutral-100";

let ev = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let ew = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let ej = eg("text-[14px]/[20px] font-medium","text-neutral-900/62 dark:text-neutral-100/62");

let eN = [{title:"Investigate",steps:[{title:"Read the billing contract notes",state:"done",duration:"3m"},{title:"Map the entitlement resolver",state:"done",duration:"2m"},{title:"Trace an expired key end to end",state:"done",duration:"4m"},{title:"Collect the failing support tickets",state:"done",duration:"2m"},{title:"Diff the two tier tables",state:"done",duration:"1m"},{title:"Check the renewal webhook log",state:"done",duration:"3m"},{title:"Write up the root cause",state:"done",duration:"2m"}]},{title:"Implement",steps:[{title:"Patch the tier lookup fallback",state:"done",duration:"11m"},{title:"Add the grace-window constant",state:"done",duration:"1m"},{title:"Add a renewal-grace test",state:"running",duration:"4m"},{title:"Cover the expired-key branch",state:"queued",duration:"3m"},{title:"Run the license branch checks",state:"queued",duration:"5m"},{title:"Regenerate the registry payloads",state:"queued",duration:"2m"},{title:"Update the installation docs",state:"queued",duration:"3m"}]},{title:"Verify",steps:[{title:"Deploy to the staging project",state:"queued",duration:"4m"},{title:"Run the smoke tests",state:"queued",duration:"6m"},{title:"Check the billing dashboard",state:"queued",duration:"2m"},{title:"Compare the entitlement counts",state:"queued",duration:"2m"},{title:"Replay the failing tickets",state:"queued",duration:"3m"},{title:"Notify the reviewer channel",state:"queued",duration:"1m"},{title:"Summarize the handoff",state:"queued",duration:"2m"}]}];

let ey = {done:"Done",running:"Running",queued:"Queued"};

let eC = {done:"text-neutral-900/78 dark:text-neutral-100/78",running:"text-neutral-900 dark:text-neutral-100",queued:"text-neutral-900 dark:text-neutral-100"};

let ez = {done:"text-neutral-900/78 dark:text-neutral-100/78",running:ef,queued:ef};

function eS(){
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

function eR({phase:e}){
  let{ref:t,edges:r,onScroll:n}=eS(),l=e.steps.filter(e=>"done"===e.state).length;
  return (
    <section className={eg("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","shrink-0 lg:min-h-0 lg:shrink")}>
        <h3 className={eg("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","h-10")}>
          <span className={eg("min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100","flex-1")}>{e.title}</span>
          <span className="shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">
            {l}
            /
            {e.steps.length}
          </span>
        </h3>
        <div className={eg("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative lg:min-h-0 lg:flex-1")}>
          <ol ref={t} onScroll={n} className={eg("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","overscroll-contain lg:h-full lg:overflow-y-auto")}>
            {e.steps.map(e=>(
              <li key={e.title} className="px-3 py-3">
                        <p className={eg("text-[15px]/[20px] font-bold",ez[e.state],"truncate")}>{e.title}</p>
                        <p className={eg(ej,"mt-0.5 flex items-center gap-2 tabular-nums")}>
                          <span className={eg(eC[e.state],"inline-flex items-center gap-1.5")}>
                            {"running"===e.state&&<span className="flex h-lh shrink-0 items-center">
                              <span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" />
                            </span>}
                            {ey[e.state]}
                          </span>
                          <span className="shrink-0">{e.duration}</span>
                        </p>
                      </li>
            ))}
          </ol>
          <div aria-hidden="true" className={eg(ev,"pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={eg(ew,"pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
        </div>
      </section>
  );
}


export default function agent_plan_5__Sorbet__Component(){
  let e=eN.flatMap(e=>e.steps),t=e.filter(e=>"done"===e.state).length,{ref:r,edges:n,onScroll:l}=eS();
  return (
    <div className={eg("bg-white dark:bg-neutral-950",ef,"relative flex h-full min-h-[620px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-center gap-3">
          <h2 className={eg("text-[17px]/[22px] font-extrabold","min-w-0 flex-1 truncate")}>Fix billing entitlements</h2>
          <span className={eg(ej,"shrink-0 tabular-nums")}>
            {t}
            {" of "}
            {e.length}
            {" done"}
          </span>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={r} onScroll={l} className="flex h-full flex-col gap-3 overflow-y-auto overscroll-contain lg:grid lg:grid-cols-3 lg:overflow-hidden">{eN.map(e=><eR key={e.title} phase={e} />)}</div>
          <div aria-hidden="true" className={eg(ev,"pointer-events-none absolute inset-x-0 top-0 h-8",start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={eg(ew,"pointer-events-none absolute inset-x-0 bottom-0 h-8",end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}
