/**
 * React Bits Pro — Application UI (agent-plan-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';

let l = (...e)=>e.filter(Boolean).join(" "),
  i = "text-neutral-900 dark:text-neutral-100",
  s = "text-neutral-900/66 dark:text-neutral-100/66",
  o = "flex min-w-0 flex-col gap-2 px-4 py-3",
  d = "text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  c = "ms-0.5 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  u = "h-8 border-b border-neutral-900/8 px-3 text-left align-middle text-[12px]/[16px] font-normal tabular-nums whitespace-nowrap text-neutral-900/66 dark:text-neutral-100/66 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  x = "h-10 border-b border-neutral-900/8 px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/8",
  h = "text-right tabular-nums",
  b = l("text-[13px]/[18px] font-normal",s),
  p = l("text-[20px]/[24px] font-[450] tracking-[-0.015em]",i,"flex min-w-0 flex-wrap items-baseline gap-x-1 tabular-nums"),
  m = [{title:"Read the billing contract notes",planned:2,actual:3},{title:"Map the entitlement resolver",planned:3,actual:2},{title:"Patch the tier lookup fallback",planned:6,actual:11},{title:"Add a renewal-grace test",planned:5,actual:5},{title:"Summarize the handoff",planned:1,actual:null}],
  f = m.reduce((e,t)=>e+t.planned,0),
  k = m.reduce((e,t)=>e+(t.actual??0),0),
  g = k-f,
  v = m.filter(e=>null===e.actual).length,
  _ = Math.max(...m.map(e=>Math.max(e.planned,e.actual??0)));

function w({value:e,unitClassName:t}){
  return (
    <>
        {e>0?"+":e<0?"−":""}
        {Math.abs(e)}
        <span className={t}>m</span>
      </>
  );
}

function j({planned:e,actual:t}){
  return (
    <span aria-hidden="true" className="relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7">
        <span className={l("block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100","absolute inset-y-0 left-0")} style={{width:`${(t??0)/_*100}%`}} />
        <span className={l((t??0)>=e?"text-white dark:text-neutral-900":s,"absolute inset-y-0 w-px bg-current")} style={{left:`${e/_*100}%`}} />
      </span>
  );
}

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
  }();
  return (
    <div className={l("bg-white dark:bg-neutral-950",i,"relative flex h-full min-h-[480px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-center gap-3">
          <h2 className={l("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>Plan vs actual</h2>
          <span className={l(b,"shrink-0 tabular-nums")}>
            {v}
            {" step"}
            {1===v?"":"s"}
            {" left"}
          </span>
        </header>
        <div className={l("@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900","mb-3 shrink-0")}>
          <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
            <div className={o}>
              <p className={d}>Planned</p>
              <p className={p}>
                {f}
                <span className={c}>m</span>
              </p>
            </div>
            <div className={o}>
              <p className={d}>Actual</p>
              <p className={p}>
                {k}
                <span className={c}>m</span>
              </p>
            </div>
            <div className={o}>
              <p className={d}>Drift</p>
              <p className={p}><w value={g} unitClassName={c} /></p>
            </div>
          </div>
        </div>
        <div className={l("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
          <div className={l("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
            <main ref={e} onScroll={r} className="h-full overflow-y-auto overscroll-contain">
              <table className={l("w-full border-separate border-spacing-0 text-left text-[14px]/[20px]","table-fixed")}>
                <caption className="sr-only">Planned versus actual duration for each step</caption>
                <thead>
                  <tr>
                    <th scope="col" className={l(u,"w-[38%]")}>Step</th>
                    <th scope="col" className={l(u,"hidden sm:table-cell")}>Duration</th>
                    <th scope="col" className={l(u,"w-14 text-right sm:w-20")}>Planned</th>
                    <th scope="col" className={l(u,"w-14 text-right sm:w-20")}>Actual</th>
                    <th scope="col" className={l(u,"w-14 text-right sm:w-20")}>Drift</th>
                  </tr>
                </thead>
                <tbody>
                  {m.map(e=>{
                    let t=null===e.actual;
                    return (
                      <tr key={e.title} className="group transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-selected:bg-neutral-900/5 aria-selected:bg-neutral-900/9 dark:hover:not-aria-selected:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9">
                                        <th scope="row" className={l(x,"text-[14px]/[16px] font-[450]","truncate text-left")}>{e.title}</th>
                                        <td className={l(x,"hidden sm:table-cell")}><j planned={e.planned} actual={e.actual} /></td>
                                        <td className={l(x,h)}>
                                          <span className={s}>
                                            {e.planned}
                                            m
                                          </span>
                                        </td>
                                        <td className={l(x,h)}>{t?<span className="sr-only">Not started</span>:`${e.actual}m`}</td>
                                        <td className={l(x,h)}>{!t&&<w value={(e.actual??0)-e.planned} />}</td>
                                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </main>
            <div aria-hidden="true" className={l("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",t.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={l("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
      </div>
  );
}


export default N;
