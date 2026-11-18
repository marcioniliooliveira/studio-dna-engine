/**
 * React Bits Pro — Application UI (agent-plan-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_62955 = [["path",{d:"M3 8H15C18.3137 8 21 10.6863 21 14C21 17.3137 18.3137 20 15 20H11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 4L5.8462 4.87652C3.94873 6.31801 3 7.03875 3 8C3 8.96125 3.94873 9.68199 5.8462 11.1235L7 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_48318 = [["path",{d:"M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let h = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  k = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  g = "size-7 rounded-[var(--rb-r-sm,6px)]",
  v = h("text-[13px]/[18px] font-normal",p),
  _ = [{id:1,title:"Read the billing contract notes",skipped:false},{id:2,title:"Map the entitlement resolver",skipped:false},{id:3,title:"Patch the tier lookup fallback",skipped:false},{id:4,title:"Add a renewal-grace regression test",skipped:false},{id:5,title:"Run the license branch checks",skipped:false},{id:6,title:"Regenerate the entitlement fixtures",skipped:true},{id:7,title:"Update the installation docs",skipped:false},{id:8,title:"Notify the reviewer channel",skipped:false},{id:9,title:"Summarize the handoff for review",skipped:false}];

function w(){
  let[e,t]=useState(_),[r,w]=useState(""),[j,N]=useState(10),[y,z]=useState(false),[S,R]=useState(""),{ref:C,edges:q,onScroll:A}=function(){
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
  }(),$=useRef(null),M=useRef(null);
  useEffect(()=>{
    let e=M.current,t=$.current;
    if(M.current=null,!e||!t)return;
    let r=r=>t.querySelector(`[data-move="${e.id}:${r}"]`),a=r(e.dir),n=a&&!a.disabled?a:r(-e.dir);
    focus({preventScroll:true})
  }, [e]);
  let W=(r,a)=>{
    let n=r+a;
    if(n<0||n>=e.length)return;
    let l=e[r];
    M.current={id:l.id,dir:a},t(e=>{
      let t=e.slice();
      return [t[r],t[n]]=[t[n],t[r]],t;
    }),R(`${l.title} moved to position ${n+1} of ${e.length}.`)
  },D=()=>{
    let e=r.trim();
    e&&(t(t=>[...t,{id:j,title:e,skipped:false}]),N(e=>e+1),w(""),R(`${e} added to the end of the plan.`))
  },E=e.filter(e=>!e.skipped).length,P=e.length-E;
  return (
    <div className={h("bg-white dark:bg-neutral-950",b,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <header className="mb-3 flex shrink-0 items-center gap-3">
          <h2 className={h("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>Review the plan</h2>
          <span className={h(v,"flex shrink-0 items-center gap-3 tabular-nums")}>
            <span>
              {E}
              {" to run"}
            </span>
            {P>0&&<span>
              {P}
              {" skipped"}
            </span>}
          </span>
        </header>
        <p className="sr-only" aria-live="polite">{S}</p>
        <div className={h("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","min-h-0 flex-1")}>
          <div className={h("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1 min-h-0 flex-1")}>
            <div ref={C} onScroll={A} className="h-full overflow-y-auto overscroll-contain">
              <ol ref={$} className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
                {e.map((r,n)=>(
                  <li key={r.id} className="p-1">
                                <div className={h("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]","hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","h-9 content-center px-2")}>
                                  <span className={h("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums","border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14","h-7 w-7")}>{n+1}</span>
                                  <span className={h("text-[14px]/[16px] font-[450]",r.skipped?h(p,"line-through"):b,"min-w-0 flex-1 truncate")}>
                                    {r.title}
                                    {r.skipped&&<span className="sr-only">: skipped</span>}
                                  </span>
                                  <div className="relative z-10 flex shrink-0 items-center gap-1">
                                    <button type="button" data-move={`${r.id}:-1`} aria-label={`Move ${r.title} up`} disabled={y||0===n} onClick={()=>W(n,-1)} className={h(f,g)}>
                                      <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={1.8} aria-hidden="true" />
                                    </button>
                                    <button type="button" data-move={`${r.id}:1`} aria-label={`Move ${r.title} down`} disabled={y||n===e.length-1} onClick={()=>W(n,1)} className={h(f,g)}>
                                      <HugeiconsIcon icon={Icon_54345} size={16} strokeWidth={1.8} aria-hidden="true" />
                                    </button>
                                    <button type="button" aria-label={r.skipped?`Restore ${r.title}`:`Skip ${r.title}`} disabled={y} onClick={()=>{
                                      let e;
                                      return e=r.id,t(t=>t.map(t=>t.id===e?{...t,skipped:!t.skipped}:t));
                                    }} className={h(f,g)}>
                                      <HugeiconsIcon icon={r.skipped?Icon_62955:Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                                    </button>
                                  </div>
                                </div>
                              </li>
                ))}
              </ol>
            </div>
            <div aria-hidden="true" className={h("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",q.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={h("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",q.end?"opacity-100":"opacity-0")} />
          </div>
        </div>
        <div className="mt-3 flex shrink-0 items-center gap-2">
          <div className={h("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","min-w-0 flex-1")}>
            <input value={r} disabled={y} onChange={e=>w(e.target.value)} onKeyDown={e=>{
              "Enter"===e.key&&D()
            }} placeholder="Add a step" aria-label="Add a step" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
          </div>
          <button type="button" onClick={D} disabled={y||!r.trim()} className={h(m,k)}>
            <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
            Add
          </button>
        </div>
        <footer className="mt-3 flex shrink-0 items-center justify-end gap-3">
          <p className={h(v,"hidden min-w-0 flex-1 truncate sm:block")}>
            {y?"Running. Stop to keep editing the plan.":"Reorder or skip steps, then start the run."}
          </p>
          {y?<button type="button" onClick={()=>z(false)} className={h(m,k)}>
            <HugeiconsIcon icon={Icon_63163} size={16} strokeWidth={1.8} aria-hidden="true" />
            Stop
          </button>:<button type="button" onClick={()=>z(true)} disabled={0===E} className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",k)}>
            <HugeiconsIcon icon={Icon_48318} size={16} strokeWidth={1.8} aria-hidden="true" />
            {"Start "}
            {E}
            {" step"}
            {1===E?"":"s"}
          </button>}
        </footer>
      </div>
  );
}


export default w;
