/**
 * React Bits Pro — Application UI (comments-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { author, body, disconnect, id, noteId, observe, quote, text, time, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let c = (...e)=>e.filter(Boolean).join(" ");

let d = "text-neutral-900 dark:text-neutral-100";

let _ = "text-neutral-900/78 dark:text-neutral-100/78";

let x = "text-neutral-900/62 dark:text-neutral-100/62";

let b = "text-[14px]/[20px] font-medium";

let j = (...e)=>e.filter(Boolean).join(" ");

let N = "bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]";

let C = "bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]";

let z = "text-neutral-900 dark:text-neutral-100";

let A = "text-neutral-900/78 dark:text-neutral-100/78";

let S = "text-neutral-900/62 dark:text-neutral-100/62";

let M = "text-[14px]/[20px] font-medium";

let L = "text-[13px]/[16px] font-semibold tabular-nums";

let W = "rounded-[var(--rb-r-sm,6px)]";

let R = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let H = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]";

let I = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0";

let E = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let O = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let D = [{id:"n1",author:"Sofia Alvarez",time:"3h ago",body:"This promise is stronger than what the contract actually covers. Legal asked us to say response time, not resolution time.",quote:"resolved within four hours",resolved:false},{id:"n2",author:"Marcus Bell",time:"2h ago",body:"Can we name the regions here? Customers on the Frankfurt cluster keep asking whether the guarantee applies to them.",quote:"every supported region",resolved:false},{id:"n3",author:"Priya Nandakumar",time:"1h ago",body:"Fixed the figure and linked the status page in the footer.",quote:"99.9 percent uptime",resolved:true}];

let T = [{text:"Northwind commits to keeping the platform available and responsive for every customer on a paid plan. This document sets out what we measure, how we report it, and what happens when we fall short."},{text:"We target 99.9 percent uptime",noteId:"n3"},{text:" measured monthly across the API, the dashboard, and the webhook delivery pipeline. Scheduled maintenance is announced at least five business days in advance and does not count against the target."},{text:"Support requests raised through the console are acknowledged within one hour and resolved within four hours",noteId:"n1"},{text:" during business hours. Outside those hours an on-call engineer is paged for anything that blocks production traffic."},{text:"The guarantee applies in every supported region",noteId:"n2"},{text:", and credits are issued automatically against the following invoice when a monthly target is missed."},{text:" Credits are capped at thirty percent of the monthly fee and are applied without the customer having to ask for them. A customer who believes a target was missed can open a claim for up to sixty days after the affected month closes."},{text:" We publish a monthly report on the status page with the measured figures, a short note on any incident that consumed error budget, and the remediation work that followed it."},{text:" Support is staffed between 08:00 and 20:00 in the customer's primary region, Monday through Friday, excluding public holidays observed at the registered billing address. Enterprise plans add weekend coverage for anything classified as severity one."},{text:" Either party may propose changes to this document. Changes take effect at the start of the following billing period, and customers are notified at least thirty days before an existing commitment is reduced."}];

function B(){
  let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
    let r=e.current;
    if(!r)return;
    let{scrollTop:t,scrollHeight:o,clientHeight:n}=r;
    a({start:t>1,end:Math.ceil(t+n)<o-1})
  }, []);
  return useEffect(()=>{
    t();
    let r=e.current,a=r?.ownerDocument.defaultView;
    if(!r||!a?.ResizeObserver)return;
    let o=new a.ResizeObserver(t);
    return observe(r),()=>disconnect();
  }, [t]),{ref:e,edges:r,onScroll:t};
}


export default function comments_2__Sorbet__Component(){
  let[e,r]=useState("n1"),[a,l]=useState(D.filter(e=>e.resolved).map(e=>e.id)),{ref:i,edges:s,onScroll:c}=B(),{ref:d,edges:_,onScroll:x}=B(),b=D.filter(e=>!a.includes(e.id)).length;
  return (
    <div className={j("bg-white dark:bg-neutral-950",z,"flex h-full min-h-[660px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[1040px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={j("text-[17px]/[22px] font-extrabold",z)}>Service commitment draft</h2>
              <p className={j(M,S,"mt-0.5 flex items-center gap-3 truncate")}>
                <span>
                  {b}
                  {" open comment"}
                  {1===b?"":"s"}
                </span>
                <span>
                  {D.length}
                  {" total"}
                </span>
              </p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className={H}>
              <div className={j(I,"relative mt-1")}>
                <div ref={i} onScroll={c} className="max-h-[380px] overflow-y-auto p-3 lg:max-h-none">
                  <p className={j("text-[15px]/[22px] font-medium",A)}>
                    {T.map((o,n)=>{
                      if(!noteId)return <span key={n}>{text}</span>;
                      let l=e===noteId,i=a.includes(noteId);
                      return <button key={n} type="button" onClick={()=>r(noteId)} aria-label={`Show comment on "${text}"`} className={j("transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]",W,"cursor-pointer px-0.5 text-left underline underline-offset-4 [box-decoration-break:clone]",i?j(S,"decoration-dotted"):l?j(C,z,"decoration-solid"):j(N,z,"decoration-dotted"))}>{text}</button>;
                    })}
                  </p>
                </div>
                <div aria-hidden="true" className={j(E,"pointer-events-none absolute inset-x-0 top-0 h-8",s.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={j(O,"pointer-events-none absolute inset-x-0 bottom-0 h-8",s.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
            <aside className="relative hidden min-w-0 lg:block">
              <div className="absolute inset-0 flex flex-col">
                <p className={j(L,S,"mb-2 px-1")}>Comments</p>
                <div className={j(H,"min-h-0 flex-1")}>
                  <div className={j(I,"relative mt-1 min-h-0 flex-1")}>
                    <div ref={d} onScroll={x} className={j("divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","min-h-0 flex-1 overflow-y-auto overscroll-contain")}>
                      {D.map(o=>{
                        let i=e===id,s=a.includes(id);
                        return (
                          <div key={id} className="p-1">
                                                <div className={j(i&&C,"rounded-[var(--rb-r-4xl,18px)]","p-2")}>
                                                  <div className="flex items-center gap-2">
                                                    <span aria-hidden className={j("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px]")}>
                                                      <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">
                                                        {((e,r=2)=>e.split(/[\s-]+/).filter(Boolean).slice(0,r).map(e=>e[0]?.toUpperCase()).join(""))(author,1)}
                                                      </span>
                                                    </span>
                                                    <p className={j("text-[15px]/[20px] font-bold",z,"min-w-0 flex-1 truncate")}>{author}</p>
                                                    <span className={j(L,S,"shrink-0")}>{time}</span>
                                                  </div>
                                                  <div className="mt-1.5 flex flex-col gap-1.5 ps-8">
                                                    <p className={j(N,W,M,S,"truncate px-2 py-1")}>{quote}</p>
                                                    <p className={j(M,s?S:A,s&&"line-through")}>{body}</p>
                                                    <div className="mt-0.5 flex items-center gap-1">
                                                      <button type="button" aria-pressed={s} onClick={()=>{
                                                        let e;
                                                        return e=id,l(r=>r.includes(e)?r.filter(r=>r!==e):[...r,e]);
                                                      }} className="relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40">
                                                        <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={2} aria-hidden="true" />
                                                        {s?"Resolved":"Resolve"}
                                                      </button>
                                                      <button type="button" onClick={()=>r(id)} className={j(R,"h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold")}>Show in text</button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                        );
                      })}
                    </div>
                    <div aria-hidden="true" className={j(E,"pointer-events-none absolute inset-x-0 top-0 h-8",_.start?"opacity-100":"opacity-0")} />
                    <div aria-hidden="true" className={j(O,"pointer-events-none absolute inset-x-0 bottom-0 h-8",_.end?"opacity-100":"opacity-0")} />
                  </div>
                </div>
              </div>
            </aside>
            <div className={j(H,"lg:hidden")}>
              <div className={j(I,"mt-1")}>
                <div className="flex items-center justify-between gap-3 p-3">
                  <p className={j(M,S,"flex min-w-0 items-center gap-2")}>
                    <HugeiconsIcon icon={Icon_36586} size={16} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                    <span className="truncate">
                      {b}
                      {" open comment"}
                      {1===b?"":"s"}
                      {" on this draft"}
                    </span>
                  </p>
                  <button type="button" className={j(R,"h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>Review</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
