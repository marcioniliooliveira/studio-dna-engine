/**
 * React Bits Pro — Application UI (list-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { author, id, title, useEffect, useMemo, useRef, useState, words } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_3810 = [["path",{d:"M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.79275 3 5.97733 4.67765 4.38341 7.20327M3.29339 3.00076L3.46556 5.05452C3.58958 6.53384 3.65159 7.27349 4.13359 7.68914C4.61559 8.10479 5.32673 8.03185 6.74899 7.88595L8.79339 7.67625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_60041 = [["path",{d:"M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];

let o = (...e)=>e.filter(Boolean).join(" "),
  d = "text-neutral-900 dark:text-neutral-100",
  c = "text-neutral-900/66 dark:text-neutral-100/66",
  u = "text-[13px]/[18px] font-normal",
  x = (e,t,r)=>Math.min(r,Math.max(t,e)),
  p = [{id:"a-ssr",title:"The quiet return of server-side rendering",author:"Nadia Whitfield",words:"2,140 words"},{id:"a-a11y",title:"What our 2026 accessibility audit actually changed",author:"Theo Marsh",words:"1,780 words"},{id:"a-layers",title:"Migrating the design system to CSS cascade layers",author:"Priya Raman",words:"3,020 words"},{id:"a-pool",title:"A field guide to database connection pooling",author:"Owen Castellano",words:"2,460 words"},{id:"a-flags",title:"Why we deleted forty percent of our feature flags",author:"Mara Lindqvist",words:"1,520 words"},{id:"a-hire",title:"Interviewing engineers without a take-home",author:"Devon Ashby",words:"2,890 words"},{id:"a-oncall",title:"The economics of on-call, three years in",author:"Priya Raman",words:"1,960 words"},{id:"a-onboard",title:"Rewriting our onboarding for the fifth time",author:"Sasha Bloom",words:"2,310 words"}],
  h = ["Today 09:00","Today 13:00","Today 17:00","Tue 09:00","Tue 13:00","Wed 09:00","Wed 15:00","Thu 10:00"],
  b = e=>e.map(e=>e.id).join("|"),
  m = b(p);

function f(){
  let[e,t]=useState(p),[r,f]=useState(null),[k,v]=useState(false),[g,w]=useState(null),[_,y]=useState(""),j=useRef(0),N=useRef(p);
  useEffect(()=>{
    if(!k)return;
    let e=0,t=requestAnimationFrame(()=>{
      e=requestAnimationFrame(()=>v(false))
    });
    return ()=>{
      cancelAnimationFrame(t),cancelAnimationFrame(e)
    };
  }, [k]);
  let A=e.length,z=useMemo(()=>b(e)===m, [e]),S=r?x(r.from+Math.round(r.dy/57),0,A-1):-1,C=(e,r)=>{
    t(t=>{
      if(r===e)return t;
      let a=[...t],[n]=a.splice(e,1);
      return a.splice(r,0,n),a;
    })
  },R=e=>{
    if(!r)return;
    e.currentTarget.hasPointerCapture(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId);
    let t=x(r.from+Math.round(r.dy/57),0,A-1);
    t!==r.from&&(C(r.from,t),y(`Moved to position ${t+1} of ${A}.`),v(true)),f(null)
  };
  return (
    <div className={o("bg-white dark:bg-neutral-950",d,"flex h-full min-h-[640px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className="mx-auto flex w-full max-w-[720px] shrink-0 flex-col">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={o("text-[20px]/[24px] font-[450] tracking-[-0.015em]",d)}>Publishing queue</h2>
              <p className={o(u,c,"mt-1")}>
                {"Drag a handle to change the order these "}
                {A}
                {" drafts go live."}
              </p>
            </div>
            <button type="button" onClick={()=>{
              t(p),w(null),y("Order reset to the original schedule.")
            }} disabled={z} className={o("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","shrink-0")}>
              <HugeiconsIcon icon={Icon_3810} size={16} strokeWidth={1.8} aria-hidden="true" />
              Reset order
            </button>
          </div>
          <ul onPointerDown={t=>{
            if(0!==t.button)return;
            let r=t.target;
            if(!r.closest("[data-drag-handle]"))return;
            let a=r.closest("[data-row-id]"),n=a?.dataset.rowId;
            if(!n)return;
            let i=e.findIndex(e=>e.id===n);
            i<0||(t.currentTarget.setPointerCapture(t.pointerId),t.preventDefault(),v(false),w(null),j.current=t.clientY,f({id:n,from:i,dy:0}))
          }} onPointerMove={e=>{
            f(t=>t?{...t,dy:e.clientY-j.current}:t)
          }} onPointerUp={R} onPointerCancel={R} style={{touchAction:"pan-y"}} className={o("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-4 shrink-0 p-2",r&&"select-none")}>
            {e.map((n,l)=>{
              let d=r?.id===id,p=g===id,b=d||p,m=0;
              if(r&&!d){
                let{from:e}=r;
                e<S&&l>e&&l<=S?m=-57:S<e&&l>=S&&l<e&&(m=57)
              }
              let f=d?r.dy:m;
              return (
                <li key={id} data-row-id={id} style={{transform:f?`translateY(${f}px)`:undefined,zIndex:b?10:undefined}} className={o("relative",!k&&!d&&"transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none")}>
                            <div className={o("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","rounded-[var(--rb-r-sm,6px)]","h-14 py-[0px] pr-2",b&&o("bg-white dark:bg-neutral-900","shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]"))}>
                              <button type="button" data-drag-handle aria-label={p?`${title}, grabbed, position ${l+1} of ${A}. Use the arrow keys to move, space to drop, escape to cancel.`:`Reorder ${title}. Position ${l+1} of ${A}. Press space or enter to pick up.`} onKeyDown={r=>((r,a)=>{
                                let n=e[a];
                                if(n){
                                  if(" "===r.key||"Enter"===r.key){
                                    r.preventDefault(),g===id?(w(null),y(`${title} dropped at position ${a+1} of ${A}.`)):(N.current=e,w(id),y(`${title} grabbed, position ${a+1} of ${A}. Use the arrow keys to move, space to drop, escape to cancel.`));
                                    return
                                  }
                                  if(g===id)if("ArrowUp"===r.key||"ArrowDown"===r.key){
                                    r.preventDefault();
                                    let e=x(a+("ArrowUp"===r.key?-1:1),0,A-1);
                                    e!==a&&(C(a,e),y(`Moved to position ${e+1} of ${A}.`))
                                  }else"Escape"===r.key&&(r.preventDefault(),t(N.current),w(null),y("Reorder cancelled."))
                                }
                              })(r,l)} className={o(c,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","flex h-14 shrink-0 touch-none items-center pl-2 pr-1",r?"cursor-grabbing":"cursor-grab")}>
                                <HugeiconsIcon icon={Icon_60041} size={16} strokeWidth={1.8} aria-hidden="true" />
                              </button>
                              <span className={o("text-[12px]/[16px] font-normal tabular-nums",c,"w-4 shrink-0 text-center")}>{l+1}</span>
                              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{title}</span></p>
                                <p data-description className={o(u,c,"truncate")}>
                                  <span className="text-neutral-900/80 dark:text-neutral-100/80">{author}</span>
                                  <span className="ms-3 tabular-nums">{words}</span>
                                </p>
                              </div>
                              <time className="shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{h[l]}</time>
                            </div>
                          </li>
              );
            })}
          </ul>
          <p aria-live="polite" className="sr-only">{_}</p>
        </div>
      </div>
  );
}


export default f;
