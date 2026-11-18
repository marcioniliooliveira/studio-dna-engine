/**
 * React Bits Pro — Application UI (comments-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { author, body, disconnect, id, noteId, observe, quote, text, time, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "bg-neutral-900/5 dark:bg-neutral-100/5",
  c = "bg-neutral-900/9 dark:bg-neutral-100/9",
  u = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/80 dark:text-neutral-100/80",
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[13px]/[18px] font-normal",
  p = "text-[12px]/[16px] font-normal tabular-nums",
  m = "rounded-[var(--rb-r-xs,4px)]",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  _ = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  v = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  k = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  g = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950",
  w = [{id:"n1",author:"Sofia Alvarez",time:"3h ago",body:"This promise is stronger than what the contract actually covers. Legal asked us to say response time, not resolution time.",quote:"resolved within four hours",resolved:false},{id:"n2",author:"Marcus Bell",time:"2h ago",body:"Can we name the regions here? Customers on the Frankfurt cluster keep asking whether the guarantee applies to them.",quote:"every supported region",resolved:false},{id:"n3",author:"Priya Nandakumar",time:"1h ago",body:"Fixed the figure and linked the status page in the footer.",quote:"99.9 percent uptime",resolved:true}],
  j = [{text:"Northwind commits to keeping the platform available and responsive for every customer on a paid plan. This document sets out what we measure, how we report it, and what happens when we fall short."},{text:"We target 99.9 percent uptime",noteId:"n3"},{text:" measured monthly across the API, the dashboard, and the webhook delivery pipeline. Scheduled maintenance is announced at least five business days in advance and does not count against the target."},{text:"Support requests raised through the console are acknowledged within one hour and resolved within four hours",noteId:"n1"},{text:" during business hours. Outside those hours an on-call engineer is paged for anything that blocks production traffic."},{text:"The guarantee applies in every supported region",noteId:"n2"},{text:", and credits are issued automatically against the following invoice when a monthly target is missed."},{text:" Credits are capped at thirty percent of the monthly fee and are applied without the customer having to ask for them. A customer who believes a target was missed can open a claim for up to sixty days after the affected month closes."},{text:" We publish a monthly report on the status page with the measured figures, a short note on any incident that consumed error budget, and the remediation work that followed it."},{text:" Support is staffed between 08:00 and 20:00 in the customer's primary region, Monday through Friday, excluding public holidays observed at the registered billing address. Enterprise plans add weekend coverage for anything classified as severity one."},{text:" Either party may propose changes to this document. Changes take effect at the start of the following billing period, and customers are notified at least thirty days before an existing commitment is reduced."}];

function y(){
  let e=useRef(null),[r,t]=useState({start:false,end:false}),a=useCallback(()=>{
    let r=e.current;
    if(!r)return;
    let{scrollTop:a,scrollHeight:n,clientHeight:l}=r;
    t({start:a>1,end:Math.ceil(a+l)<n-1})
  }, []);
  return useEffect(()=>{
    a();
    let r=e.current,t=r?.ownerDocument.defaultView;
    if(!r||!t?.ResizeObserver)return;
    let n=new t.ResizeObserver(a);
    return observe(r),()=>disconnect();
  }, [a]),{ref:e,edges:r,onScroll:a};
}

function N(){
  let[e,r]=useState("n1"),[t,N]=useState(w.filter(e=>e.resolved).map(e=>e.id)),{ref:z,edges:S,onScroll:A}=y(),{ref:C,edges:R,onScroll:W}=y(),M=w.filter(e=>!t.includes(e.id)).length;
  return (
    <div className={o("bg-white dark:bg-neutral-950",u,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[1040px]">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={o("text-[16px]/[20px] font-[450] tracking-[-0.015em]",u)}>Service commitment draft</h2>
              <p className={o(h,b,"mt-0.5 flex items-center gap-3 truncate")}>
                <span>
                  {M}
                  {" open comment"}
                  {1===M?"":"s"}
                </span>
                <span>
                  {w.length}
                  {" total"}
                </span>
              </p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className={_}>
              <div className={o(v,"relative mt-1")}>
                <div ref={z} onScroll={A} className="max-h-[380px] overflow-y-auto p-3 lg:max-h-none">
                  <p className={o("text-[14px]/[20px] font-normal",x)}>
                    {j.map((n,l)=>{
                      if(!noteId)return <span key={l}>{text}</span>;
                      let i=e===noteId,s=t.includes(noteId);
                      return <button key={l} type="button" onClick={()=>r(noteId)} aria-label={`Show comment on "${text}"`} className={o("transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",m,"cursor-pointer px-0.5 text-left underline underline-offset-4 [box-decoration-break:clone]",s?o(b,"decoration-dotted"):i?o(c,u,"decoration-solid"):o(d,u,"decoration-dotted"))}>{text}</button>;
                    })}
                  </p>
                </div>
                <div aria-hidden="true" className={o(k,"pointer-events-none absolute inset-x-0 top-0 h-8",S.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={o(g,"pointer-events-none absolute inset-x-0 bottom-0 h-8",S.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
            <aside className="relative hidden min-w-0 lg:block">
              <div className="absolute inset-0 flex flex-col">
                <p className={o(p,b,"mb-2 px-1")}>Comments</p>
                <div className={o(_,"min-h-0 flex-1")}>
                  <div className={o(v,"relative mt-1 min-h-0 flex-1")}>
                    <div ref={C} onScroll={W} className={o("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","min-h-0 flex-1 overflow-y-auto overscroll-contain")}>
                      {w.map(n=>{
                        let s=e===id,_=t.includes(id);
                        return (
                          <div key={id} className="p-1">
                                                <div className={o(s&&c,"rounded-[var(--rb-r-sm,6px)]","p-2")}>
                                                  <div className="flex items-center gap-2">
                                                    <span aria-hidden className={o("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-[24px]")}>
                                                      <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">
                                                        {((e,r=2)=>e.split(/[\s-]+/).filter(Boolean).slice(0,r).map(e=>e[0]?.toUpperCase()).join(""))(author,1)}
                                                      </span>
                                                    </span>
                                                    <p className={o("text-[14px]/[16px] font-[450]",u,"min-w-0 flex-1 truncate")}>{author}</p>
                                                    <span className={o(p,b,"shrink-0")}>{time}</span>
                                                  </div>
                                                  <div className="mt-1.5 flex flex-col gap-1.5 ps-8">
                                                    <p className={o(d,m,h,b,"truncate px-2 py-1")}>{quote}</p>
                                                    <p className={o(h,_?b:x,_&&"line-through")}>{body}</p>
                                                    <div className="mt-0.5 flex items-center gap-1">
                                                      <button type="button" aria-pressed={_} onClick={()=>{
                                                        let e;
                                                        return e=id,N(r=>r.includes(e)?r.filter(r=>r!==e):[...r,e]);
                                                      }} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                                                        <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={1.8} aria-hidden="true" />
                                                        {_?"Resolved":"Resolve"}
                                                      </button>
                                                      <button type="button" onClick={()=>r(id)} className={o(f,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>Show in text</button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                        );
                      })}
                    </div>
                    <div aria-hidden="true" className={o(k,"pointer-events-none absolute inset-x-0 top-0 h-8",R.start?"opacity-100":"opacity-0")} />
                    <div aria-hidden="true" className={o(g,"pointer-events-none absolute inset-x-0 bottom-0 h-8",R.end?"opacity-100":"opacity-0")} />
                  </div>
                </div>
              </div>
            </aside>
            <div className={o(_,"lg:hidden")}>
              <div className={o(v,"mt-1")}>
                <div className="flex items-center justify-between gap-3 p-3">
                  <p className={o(h,b,"flex min-w-0 items-center gap-2")}>
                    <HugeiconsIcon icon={Icon_36586} size={14} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                    <span className="truncate">
                      {M}
                      {" open comment"}
                      {1===M?"":"s"}
                      {" on this draft"}
                    </span>
                  </p>
                  <button type="button" className={o(f,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>Review</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default N;
