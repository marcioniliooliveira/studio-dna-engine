/**
 * React Bits Pro — Application UI (agent-plan-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_66654 = [["path",{d:"M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 20H17",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let d = ["Read files","Search code","Edit files","Run tests","Shell commands"],
  c = [{name:"Prepare the data",steps:2,time:"5m"},{name:"Apply the migration",steps:3,time:"11m"},{name:"Ship the change",steps:2,time:"4m"},{name:"Verify in staging",steps:3,time:"6m"}],
  u = c.reduce((e,t)=>e+t.steps,0),
  x = "Repairs the tier lookup so expired keys fall back to the renewal grace period before access is revoked.",
  h = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "text-[14px]/[16px] font-[450]",
  f = "text-[12px]/[16px] font-normal tabular-nums",
  k = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  g = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  v = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  _ = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  w = "flex flex-col gap-3 p-4 text-[14px]/[20px]",
  j = "flex min-w-0 flex-col gap-2 px-4 py-3",
  N = "text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80",
  y = h("text-[13px]/[18px] font-normal",p),
  z = h("text-[20px]/[24px] font-[450] tracking-[-0.015em]",b,"flex min-w-0 flex-wrap items-baseline gap-x-1 tabular-nums");

function S(){
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
  }(),[S,R]=useState(x),[C,q]=useState(false),[A,$]=useState(x),[M,W]=useState(false),D=useRef(null);
  return useEffect(()=>{
    C&&D.current?.focus({preventScroll:true})
  }, [C]),<div className={h("bg-white dark:bg-neutral-950",b,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
    <header className="mb-3 flex shrink-0 items-center gap-3">
      <h2 className={h("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>Fix billing entitlements</h2>
      <span className={h(y,"shrink-0 tabular-nums")}>
        {u}
        {" steps"}
      </span>
    </header>
    <div className="relative -mx-1 min-h-0 flex-1">
      <main ref={e} onScroll={r} className="h-full space-y-4 overflow-y-auto overscroll-contain px-1 pb-5">
        <section>
          <h3 className={h(m,"mb-2")}>Goal</h3>
          <div className={_}>
            <div className={w}>
              {C?<>
                <textarea ref={D} rows={3} value={A} onChange={e=>$(e.target.value)} aria-label="Plan goal" className="block max-h-[256px] min-h-[76px] w-full min-w-48 resize-none rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 py-2 text-[14px]/[20px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none field-sizing-content transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] placeholder:text-neutral-900/66 hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none read-only:border-transparent read-only:bg-neutral-900/5 read-only:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:placeholder:text-neutral-100/66 dark:hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40 dark:read-only:bg-neutral-100/5" />
                <div className="flex items-center gap-2">
                  <button type="button" onClick={()=>{
                    R(A.trim()||x),q(false)
                  }} className={h(k,v)}>Save</button>
                  <button type="button" onClick={()=>q(false)} className={h(g,v)}>Cancel</button>
                </div>
              </>:<p className={h("text-[14px]/[20px] font-normal","text-neutral-900/80 dark:text-neutral-100/80")}>{S}</p>}
            </div>
          </div>
        </section>
        <div className="@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900">
          <dl className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
            <div className={j}>
              <dt className={N}>Steps</dt>
              <dd className={z}>{u}</dd>
            </div>
            <div className={j}>
              <dt className={N}>Est. time</dt>
              <dd className={z}>
                26
                <span className="ms-0.5 text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">m</span>
              </dd>
            </div>
            <div className={j}>
              <dt className={N}>Est. cost</dt>
              <dd className={z}>$0.54</dd>
            </div>
          </dl>
        </div>
        <section>
          <h3 className={h(m,"mb-2")}>Tools</h3>
          <div className={_}>
            <div className={w}>
              <ul className="flex flex-wrap gap-1.5">
                {d.map(e=><li key={e} className={h("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>{e}</li>)}
              </ul>
            </div>
          </div>
        </section>
        <section>
          <h3 className={h(m,"mb-2")}>Breakdown</h3>
          <div className={_}>
            <ul className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
              {c.map((e,t)=>(
                <li key={e.name} className={h("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","h-11 px-4")}>
                                <span className={h("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums","border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14","h-7 w-7")}>{t+1}</span>
                                <span className={h(m,"min-w-0 flex-1 truncate")}>{e.name}</span>
                                <span className={h(f,p,"w-16 shrink-0 text-right")}>
                                  {e.steps}
                                  {" steps"}
                                </span>
                                <span className={h(f,p,"w-10 shrink-0 text-right")}>{e.time}</span>
                              </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <div aria-hidden="true" className={h("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",t.start?"opacity-100":"opacity-0")} />
      <div aria-hidden="true" className={h("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",t.end?"opacity-100":"opacity-0")} />
    </div>
    <footer className="mt-3 flex shrink-0 items-center justify-end gap-2">
      <p className={h(y,"hidden min-w-0 flex-1 truncate sm:block")}>
        {M?<>
          Running
          {" "}
          <span className="tabular-nums">
            {"step 1 of "}
            {u}
          </span>
        </>:"Review the plan before it runs."}
      </p>
      {M?<button type="button" onClick={()=>W(false)} className={h(g,v)}>
        <HugeiconsIcon icon={Icon_63163} size={16} strokeWidth={1.8} aria-hidden="true" />
        Stop
      </button>:<>
        <button type="button" onClick={()=>{
          $(S),q(true)
        }} disabled={C} className={h(g,v)}>
          <HugeiconsIcon icon={Icon_66654} size={16} strokeWidth={1.8} aria-hidden="true" />
          Edit plan
        </button>
        <button type="button" onClick={()=>W(true)} disabled={C} className={h(k,v)}>
          <HugeiconsIcon icon={Icon_48318} size={16} strokeWidth={1.8} aria-hidden="true" />
          Run plan
        </button>
      </>}
    </footer>
  </div>;
}


export default S;
