/**
 * React Bits Pro — Application UI (comments-5 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_22830 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let c = (...e)=>e.filter(Boolean).join(" ");

let d = "text-neutral-900 dark:text-neutral-100";

let eh = (...e)=>e.filter(Boolean).join(" ");

let em = "text-neutral-900 dark:text-neutral-100";

let ek = "text-neutral-900/62 dark:text-neutral-100/62";

let ev = "text-[14px]/[20px] font-medium";

let ef = "text-[13px]/[16px] font-semibold tabular-nums";

let eg = [{id:"n1",author:"Priya Nandakumar",time:"12m",place:"Q3 pricing model",anchor:"Cell D14",body:"@amelia the enterprise tier still assumes the old seat minimum. Can you confirm before this goes to finance?",mention:true},{id:"n2",author:"Marcus Bell",time:"1h",place:"Backfill runbook",anchor:"Step 4",body:"Rewrote the rollback section so it no longer depends on the operator being on call.",mention:false},{id:"n3",author:"Sofia Alvarez",time:"3h",place:"Onboarding redesign",anchor:"Frame 12",body:"@amelia the empty state copy reads a little cold here. Suggested two alternates in the thread.",mention:true},{id:"n4",author:"Wei Chen",time:"5h",place:"query.ts",anchor:"Line 86",body:"Left a suggestion on the worker cap. Not blocking, but nice to land here.",mention:false},{id:"n5",author:"Tom\xe1s Guerrero",time:"Yesterday",place:"Incident 4471",anchor:"Timeline",body:"Added the paging gap between 02:10 and 02:40. That is the part we should fix first.",mention:false}];

let ew = ["All","Unresolved","Mentions"];

let ey = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let o="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[o].focus(),a[o].click()
};


export default function comments_5__Sorbet__Component(){
  let[e,r]=useState("All"),[a,l]=useState(["n5"]),i=useMemo(()=>"Unresolved"===e?eg.filter(e=>!a.includes(e.id)):"Mentions"===e?eg.filter(e=>e.mention):eg, [e,a]),{ref:s,edges:c,onScroll:d}=function(e){
    let r=useRef(null),[a,t]=useState({start:false,end:false}),n=useCallback(()=>{
      let e=r.current;
      if(!e)return;
      let{scrollTop:a,scrollHeight:o,clientHeight:n}=e;
      t({start:a>1,end:Math.ceil(a+n)<o-1})
    }, []);
    return useEffect(()=>{
      n();
      let e=r.current,a=e?.ownerDocument.defaultView;
      if(!e||!a?.ResizeObserver)return;
      let t=new a.ResizeObserver(n);
      return t.observe(e),()=>t.disconnect();
    }, [e,n]),{ref:r,edges:a,onScroll:n};
  }(i.map(e=>e.id).join());
  return (
    <div className={eh("bg-white dark:bg-neutral-950",em,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[720px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={eh("text-[17px]/[22px] font-extrabold",em,"flex items-center gap-2")}>
                <HugeiconsIcon icon={Icon_22830} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                Comment inbox
              </h2>
              <p className={eh(ev,ek,"mt-0.5")}>
                {eg.length-a.length}
                {" unresolved across 5 documents"}
              </p>
            </div>
            <div role="radiogroup" aria-label="Filter comments" onKeyDown={ey} className={eh("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")}>
              {ew.map(a=><button key={a} type="button" role="radio" aria-checked={e===a} tabIndex={e===a?0:-1} onClick={()=>r(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{a}</button>)}
            </div>
          </div>
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
            <div className={eh("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative mt-1")}>
              <div ref={s} onScroll={d} className={eh("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","max-h-[400px] overflow-y-auto sm:max-h-none")}>
                {0===i.length?<div className="flex flex-col items-center justify-center gap-1 px-6 py-16 text-center">
                  <p className="text-[19px]/[24px] font-extrabold tracking-[-0.01em] text-neutral-900 dark:text-neutral-100">Nothing left here</p>
                  <p className="max-w-[48ch] text-[15px]/[22px] font-medium text-neutral-900/78 dark:text-neutral-100/78">Every comment in this view has been resolved.</p>
                </div>:i.map(e=>{
                  let r=a.includes(e.id);
                  return (
                    <div key={e.id} className="p-1">
                                    <article className={eh("hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","rounded-[var(--rb-r-4xl,18px)]","flex gap-3 p-2")}>
                                      <span aria-hidden className={eh("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[28px]")}>
                                        <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">
                                          {e.author.split(/[\s-]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("")}
                                        </span>
                                      </span>
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-baseline gap-2">
                                          <p className={eh("text-[15px]/[20px] font-bold",em,"truncate")}>{e.author}</p>
                                          <span className={eh(ef,ek,"shrink-0")}>{e.time}</span>
                                          {e.mention&&!r&&<span className={eh("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.09),0_1px_2px_rgb(84_62_32/0.08)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.55)] dark:bg-neutral-800","max-sm:hidden")}>Mention</span>}
                                        </div>
                                        <p className={eh(ef,ek,"mt-0.5 flex min-w-0 gap-2")}>
                                          <span className="min-w-0 truncate">{e.place}</span>
                                          <span className="shrink-0">{e.anchor}</span>
                                        </p>
                                        <p className={eh(ev,r?ek:"text-neutral-900/78 dark:text-neutral-100/78","mt-1.5",r&&"line-through")}>{e.body}</p>
                                      </div>
                                      <button type="button" aria-pressed={r} aria-label={r?`Reopen comment from ${e.author}`:`Resolve comment from ${e.author}`} onClick={()=>{
                                        let r;
                                        return r=e.id,l(e=>e.includes(r)?e.filter(e=>e!==r):[...e,r]);
                                      }} className={eh("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40","size-8 rounded-[calc(var(--rb-r-full,999px))]")}>
                                        <HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" />
                                      </button>
                                    </article>
                                  </div>
                  );
                })}
              </div>
              <div aria-hidden="true" className={eh("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",c.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={eh("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",c.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
      </div>
  );
}
