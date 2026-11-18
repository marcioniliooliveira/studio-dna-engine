/**
 * React Bits Pro — Application UI (agent-plan-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';

let ee = (...e)=>e.filter(Boolean).join(" ");

let et = "text-neutral-900 dark:text-neutral-100";

let er = "text-neutral-900/62 dark:text-neutral-100/62";

let ea = "flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4";

let en = "text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78";

let el = "ms-0.5 text-[15px]/[20px] font-bold tracking-normal text-neutral-900/78 dark:text-neutral-100/78";

let ei = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let eo = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let es = "text-right tabular-nums";

let ed = ee("text-[14px]/[20px] font-medium",er);

let ec = ee("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",et,"flex min-w-0 flex-wrap items-baseline gap-x-1 tabular-nums");

let e_ = [{title:"Read the billing contract notes",planned:2,actual:3},{title:"Map the entitlement resolver",planned:3,actual:2},{title:"Patch the tier lookup fallback",planned:6,actual:11},{title:"Add a renewal-grace test",planned:5,actual:5},{title:"Summarize the handoff",planned:1,actual:null}];

let ex = e_.reduce((e,t)=>e+t.planned,0);

let eb = e_.reduce((e,t)=>e+(t.actual??0),0);

let eu = eb-ex;

let ep = e_.filter(e=>null===e.actual).length;

let eh = Math.max(...e_.map(e=>Math.max(e.planned,e.actual??0)));

function ek({value:e,unitClassName:t}){
  return (
    <>
        {e>0?"+":e<0?"−":""}
        {Math.abs(e)}
        <span className={t}>m</span>
      </>
  );
}

function em({planned:e,actual:t}){
  return (
    <span aria-hidden="true" className="relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
        <span className={ee("block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]","absolute inset-y-0 left-0")} style={{width:`${(t??0)/eh*100}%`}} />
        <span className={ee((t??0)>=e?"text-white dark:text-neutral-900":er,"absolute inset-y-0 w-px bg-current")} style={{left:`${e/eh*100}%`}} />
      </span>
  );
}


export default function agent_plan_4__Sorbet__Component(){
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
  }();
  return (
    <div className={ee("bg-white dark:bg-neutral-950",et,"relative flex h-full min-h-[480px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-center gap-3">
          <h2 className={ee("text-[17px]/[22px] font-extrabold","min-w-0 flex-1 truncate")}>Plan vs actual</h2>
          <span className={ee(ed,"shrink-0 tabular-nums")}>
            {ep}
            {" step"}
            {1===ep?"":"s"}
            {" left"}
          </span>
        </header>
        <div className={ee("@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1","mb-3 shrink-0")}>
          <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
            <div className={ea}>
              <p className={en}>Planned</p>
              <p className={ec}>
                {ex}
                <span className={el}>m</span>
              </p>
            </div>
            <div className={ea}>
              <p className={en}>Actual</p>
              <p className={ec}>
                {eb}
                <span className={el}>m</span>
              </p>
            </div>
            <div className={ea}>
              <p className={en}>Drift</p>
              <p className={ec}><ek value={eu} unitClassName={el} /></p>
            </div>
          </div>
        </div>
        <div className={ee("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","min-h-0 flex-1")}>
          <div className={ee("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative mt-1 min-h-0 flex-1")}>
            <main ref={e} onScroll={r} className="h-full overflow-y-auto overscroll-contain">
              <table className={ee("w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium","table-fixed")}>
                <caption className="sr-only">Planned versus actual duration for each step</caption>
                <thead>
                  <tr>
                    <th scope="col" className={ee(ei,"w-[38%]")}>Step</th>
                    <th scope="col" className={ee(ei,"hidden sm:table-cell")}>Duration</th>
                    <th scope="col" className={ee(ei,"w-14 text-right sm:w-20")}>Planned</th>
                    <th scope="col" className={ee(ei,"w-14 text-right sm:w-20")}>Actual</th>
                    <th scope="col" className={ee(ei,"w-14 text-right sm:w-20")}>Drift</th>
                  </tr>
                </thead>
                <tbody>
                  {e_.map(e=>{
                    let t=null===e.actual;
                    return (
                      <tr key={e.title} className="group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]">
                                        <th scope="row" className={ee(eo,"text-[15px]/[20px] font-bold","truncate text-left")}>{e.title}</th>
                                        <td className={ee(eo,"hidden sm:table-cell")}><em planned={e.planned} actual={e.actual} /></td>
                                        <td className={ee(eo,es)}>
                                          <span className={er}>
                                            {e.planned}
                                            m
                                          </span>
                                        </td>
                                        <td className={ee(eo,es)}>{t?<span className="sr-only">Not started</span>:`${e.actual}m`}</td>
                                        <td className={ee(eo,es)}>{!t&&<ek value={(e.actual??0)-e.planned} />}</td>
                                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </main>
            <div aria-hidden="true" className={ee("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",t.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={ee("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}
