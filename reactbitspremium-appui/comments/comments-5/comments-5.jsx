/**
 * React Bits Pro — Application UI (comments-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_22830 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "text-[13px]/[18px] font-normal",
  x = "text-[12px]/[16px] font-normal tabular-nums",
  b = [{id:"n1",author:"Priya Nandakumar",time:"12m",place:"Q3 pricing model",anchor:"Cell D14",body:"@amelia the enterprise tier still assumes the old seat minimum. Can you confirm before this goes to finance?",mention:true},{id:"n2",author:"Marcus Bell",time:"1h",place:"Backfill runbook",anchor:"Step 4",body:"Rewrote the rollback section so it no longer depends on the operator being on call.",mention:false},{id:"n3",author:"Sofia Alvarez",time:"3h",place:"Onboarding redesign",anchor:"Frame 12",body:"@amelia the empty state copy reads a little cold here. Suggested two alternates in the thread.",mention:true},{id:"n4",author:"Wei Chen",time:"5h",place:"query.ts",anchor:"Line 86",body:"Left a suggestion on the worker cap. Not blocking, but nice to land here.",mention:false},{id:"n5",author:"Tom\xe1s Guerrero",time:"Yesterday",place:"Incident 4471",anchor:"Timeline",body:"Added the paging gap between 02:10 and 02:40. That is the part we should fix first.",mention:false}],
  h = ["All","Unresolved","Mentions"],
  p = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let t=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=t.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?t.length-1:(a+r+t.length)%t.length;
  t[n].focus(),t[n].click()
};

function m(){
  let[e,r]=useState("All"),[t,m]=useState(["n5"]),f=useMemo(()=>"Unresolved"===e?b.filter(e=>!t.includes(e.id)):"Mentions"===e?b.filter(e=>e.mention):b, [e,t]),{ref:_,edges:v,onScroll:k}=function(e){
    let r=useRef(null),[t,a]=useState({start:false,end:false}),l=useCallback(()=>{
      let e=r.current;
      if(!e)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=e;
      a({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      l();
      let e=r.current,t=e?.ownerDocument.defaultView;
      if(!e||!t?.ResizeObserver)return;
      let a=new t.ResizeObserver(l);
      return a.observe(e),()=>a.disconnect();
    }, [e,l]),{ref:r,edges:t,onScroll:l};
  }(f.map(e=>e.id).join());
  return (
    <div className={o("bg-white dark:bg-neutral-950",d,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[720px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={o("text-[16px]/[20px] font-[450] tracking-[-0.015em]",d,"flex items-center gap-2")}>
                <HugeiconsIcon icon={Icon_22830} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                Comment inbox
              </h2>
              <p className={o(u,c,"mt-0.5")}>
                {b.length-t.length}
                {" unresolved across 5 documents"}
              </p>
            </div>
            <div role="radiogroup" aria-label="Filter comments" onKeyDown={p} className={o("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
              {h.map(t=><button key={t} type="button" role="radio" aria-checked={e===t} tabIndex={e===t?0:-1} onClick={()=>r(t)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{t}</button>)}
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900">
            <div className={o("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative mt-1")}>
              <div ref={_} onScroll={k} className={o("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","max-h-[400px] overflow-y-auto sm:max-h-none")}>
                {0===f.length?<div className="flex flex-col items-center justify-center gap-1 px-6 py-16 text-center">
                  <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">Nothing left here</p>
                  <p className="max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">Every comment in this view has been resolved.</p>
                </div>:f.map(e=>{
                  let r=t.includes(e.id);
                  return (
                    <div key={e.id} className="p-1">
                                    <article className={o("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","rounded-[var(--rb-r-sm,6px)]","flex gap-3 p-2")}>
                                      <span aria-hidden className={o("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[28px]")}>
                                        <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                                          {e.author.split(/[\s-]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("")}
                                        </span>
                                      </span>
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-baseline gap-2">
                                          <p className={o("text-[14px]/[16px] font-[450]",d,"truncate")}>{e.author}</p>
                                          <span className={o(x,c,"shrink-0")}>{e.time}</span>
                                          {e.mention&&!r&&<span className={o("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","max-sm:hidden")}>Mention</span>}
                                        </div>
                                        <p className={o(x,c,"mt-0.5 flex min-w-0 gap-2")}>
                                          <span className="min-w-0 truncate">{e.place}</span>
                                          <span className="shrink-0">{e.anchor}</span>
                                        </p>
                                        <p className={o(u,r?c:"text-neutral-900/80 dark:text-neutral-100/80","mt-1.5",r&&"line-through")}>{e.body}</p>
                                      </div>
                                      <button type="button" aria-pressed={r} aria-label={r?`Reopen comment from ${e.author}`:`Resolve comment from ${e.author}`} onClick={()=>{
                                        let r;
                                        return r=e.id,m(e=>e.includes(r)?e.filter(e=>e!==r):[...e,r]);
                                      }} className={o("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]")}>
                                        <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />
                                      </button>
                                    </article>
                                  </div>
                  );
                })}
              </div>
              <div aria-hidden="true" className={o("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",v.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={o("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",v.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
      </div>
  );
}


export default m;
