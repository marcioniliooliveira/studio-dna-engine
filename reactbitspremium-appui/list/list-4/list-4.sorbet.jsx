/**
 * React Bits Pro — Application UI (list-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { author, id, title, useEffect, useMemo, useRef, useState, words } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_97872 = [["path",{d:"M21 7V12M3 7C3 10.0645 3 16.7742 3 17.1613C3 18.5438 4.94564 19.3657 8.83693 21.0095C10.4002 21.6698 11.1818 22 12 22L12 11.3548",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 19C15 19 15.875 19 16.75 21C16.75 21 19.5294 16 22 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8.32592 9.69138L5.40472 8.27785C3.80157 7.5021 3 7.11423 3 6.5C3 5.88577 3.80157 5.4979 5.40472 4.72215L8.32592 3.30862C10.1288 2.43621 11.0303 2 12 2C12.9697 2 13.8712 2.4362 15.6741 3.30862L18.5953 4.72215C20.1984 5.4979 21 5.88577 21 6.5C21 7.11423 20.1984 7.5021 18.5953 8.27785L15.6741 9.69138C13.8712 10.5638 12.9697 11 12 11C11.0303 11 10.1288 10.5638 8.32592 9.69138Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L8 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M17 4L7 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_59309 = [["path",{d:"M2.01733 15C4.2169 15 6.00001 16.7831 6.00001 18.9827",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 18.9827V18.8908C18 16.742 19.742 15 21.8908 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6.00001 5.01733C6.00001 7.2169 4.2169 9.00001 2.01733 9.00001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 5.01733C18 7.19765 19.769 8.96876 21.9423 8.9996",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M16 5H8C5.17157 5 3.75736 5 2.87868 5.87868C2 6.75736 2 8.17157 2 11V13C2 15.8284 2 17.2426 2.87868 18.1213C3.75736 19 5.17157 19 8 19H16C18.8284 19 20.2426 19 21.1213 18.1213C22 17.2426 22 15.8284 22 13V11C22 8.17157 22 6.75736 21.1213 5.87868C20.2426 5 18.8284 5 16 5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_3810 = [["path",{d:"M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.79275 3 5.97733 4.67765 4.38341 7.20327M3.29339 3.00076L3.46556 5.05452C3.58958 6.53384 3.65159 7.27349 4.13359 7.68914C4.61559 8.10479 5.32673 8.03185 6.74899 7.88595L8.79339 7.67625",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62955 = [["path",{d:"M3 8H15C18.3137 8 21 10.6863 21 14C21 17.3137 18.3137 20 15 20H11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 4L5.8462 4.87652C3.94873 6.31801 3 7.03875 3 8C3 8.96125 3.94873 9.68199 5.8462 11.1235L7 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_60041 = [["path",{d:"M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];

let x = (...e)=>e.filter(Boolean).join(" ");

let b = "text-neutral-900 dark:text-neutral-100";

let p = "text-[14px]/[20px] font-medium";

let h = [{id:"7d",label:"7 days"},{id:"28d",label:"28 days"},{id:"qtd",label:"Quarter"}];

let m = [{id:"fulfilled",label:"Orders fulfilled",icon:Icon_97872,caption:"Picked, packed and handed to a carrier",by:{"7d":{value:"1,284",delta:6.4},"28d":{value:"5,109",delta:11.2},qtd:{value:"14,730",delta:18.9}}},{id:"net",label:"Net revenue",icon:Icon_59309,caption:"Gross receipts less discounts and refunds",by:{"7d":{value:"$92.4k",delta:3.1},"28d":{value:"$374.8k",delta:7.8},qtd:{value:"$1.09M",delta:12.4}}},{id:"basket",label:"Average basket",icon:Icon_3810,caption:"Net revenue divided by fulfilled orders",by:{"7d":{value:"$71.96",delta:-2.9},"28d":{value:"$73.36",delta:-1.4},qtd:{value:"$74.02",delta:.6}}},{id:"returns",label:"Return rate",icon:Icon_62955,caption:"Units sent back within the 30 day window",by:{"7d":{value:"4.1%",delta:-.8},"28d":{value:"4.6%",delta:.5},qtd:{value:"5.2%",delta:1.7}}}];

let k = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=a.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?a.length-1:(t+r+a.length)%a.length;
  a[n].focus(),a[n].click()
};

let g = (...e)=>e.filter(Boolean).join(" ");

let F = (...e)=>e.filter(Boolean).join(" ");

let q = "text-neutral-900 dark:text-neutral-100";

let K = "text-neutral-900/62 dark:text-neutral-100/62";

let U = "text-[14px]/[20px] font-medium";

let V = (e,r,a)=>Math.min(a,Math.max(r,e));

let Y = [{id:"a-ssr",title:"The quiet return of server-side rendering",author:"Nadia Whitfield",words:"2,140 words"},{id:"a-a11y",title:"What our 2026 accessibility audit actually changed",author:"Theo Marsh",words:"1,780 words"},{id:"a-layers",title:"Migrating the design system to CSS cascade layers",author:"Priya Raman",words:"3,020 words"},{id:"a-pool",title:"A field guide to database connection pooling",author:"Owen Castellano",words:"2,460 words"},{id:"a-flags",title:"Why we deleted forty percent of our feature flags",author:"Mara Lindqvist",words:"1,520 words"},{id:"a-hire",title:"Interviewing engineers without a take-home",author:"Devon Ashby",words:"2,890 words"},{id:"a-oncall",title:"The economics of on-call, three years in",author:"Priya Raman",words:"1,960 words"},{id:"a-onboard",title:"Rewriting our onboarding for the fifth time",author:"Sasha Bloom",words:"2,310 words"}];

let G = ["Today 09:00","Today 13:00","Today 17:00","Tue 09:00","Tue 13:00","Wed 09:00","Wed 15:00","Thu 10:00"];

let Q = e=>e.map(e=>e.id).join("|");

let J = Q(Y);


export default function list_4__Sorbet__Component(){
  let[e,r]=useState(Y),[a,l]=useState(null),[o,d]=useState(false),[c,_]=useState(null),[u,x]=useState(""),b=useRef(0),p=useRef(Y);
  useEffect(()=>{
    if(!o)return;
    let e=0,r=requestAnimationFrame(()=>{
      e=requestAnimationFrame(()=>d(false))
    });
    return ()=>{
      cancelAnimationFrame(r),cancelAnimationFrame(e)
    };
  }, [o]);
  let h=e.length,m=useMemo(()=>Q(e)===J, [e]),k=a?V(a.from+Math.round(a.dy/57),0,h-1):-1,f=(e,a)=>{
    r(r=>{
      if(a===e)return r;
      let t=[...r],[n]=t.splice(e,1);
      return t.splice(a,0,n),t;
    })
  },g=e=>{
    if(!a)return;
    e.currentTarget.hasPointerCapture(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId);
    let r=V(a.from+Math.round(a.dy/57),0,h-1);
    r!==a.from&&(f(a.from,r),x(`Moved to position ${r+1} of ${h}.`),d(true)),l(null)
  };
  return (
    <div className={F("bg-white dark:bg-neutral-950",q,"flex h-full min-h-[700px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className="mx-auto flex w-full max-w-[720px] shrink-0 flex-col">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className={F("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",q)}>Publishing queue</h2>
              <p className={F(U,K,"mt-1")}>
                {"Drag a handle to change the order these "}
                {h}
                {" drafts go live."}
              </p>
            </div>
            <button type="button" onClick={()=>{
              r(Y),_(null),x("Order reset to the original schedule.")
            }} disabled={m} className={F("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","shrink-0")}>
              <HugeiconsIcon icon={Icon_3810} size={18} strokeWidth={2} aria-hidden="true" />
              Reset order
            </button>
          </div>
          <ul onPointerDown={r=>{
            if(0!==r.button)return;
            let a=r.target;
            if(!a.closest("[data-drag-handle]"))return;
            let t=a.closest("[data-row-id]"),n=t?.dataset.rowId;
            if(!n)return;
            let i=e.findIndex(e=>e.id===n);
            i<0||(r.currentTarget.setPointerCapture(r.pointerId),r.preventDefault(),d(false),_(null),b.current=r.clientY,l({id:n,from:i,dy:0}))
          }} onPointerMove={e=>{
            l(r=>r?{...r,dy:e.clientY-b.current}:r)
          }} onPointerUp={g} onPointerCancel={g} style={{touchAction:"pan-y"}} className={F("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-4 shrink-0 p-2",a&&"select-none")}>
            {e.map((n,l)=>{
              let s=a?.id===id,d=c===id,u=s||d,b=0;
              if(a&&!s){
                let{from:e}=a;
                e<k&&l>e&&l<=k?b=-57:k<e&&l>=k&&l<e&&(b=57)
              }
              let m=s?a.dy:b;
              return (
                <li key={id} data-row-id={id} style={{transform:m?`translateY(${m}px)`:undefined,zIndex:u?10:undefined}} className={F("relative",!o&&!s&&"transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none")}>
                            <div className={F("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","rounded-[var(--rb-r-4xl,18px)]","h-14 py-[0px] pr-2",u&&F("bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]"))}>
                              <button type="button" data-drag-handle aria-label={d?`${title}, grabbed, position ${l+1} of ${h}. Use the arrow keys to move, space to drop, escape to cancel.`:`Reorder ${title}. Position ${l+1} of ${h}. Press space or enter to pick up.`} onKeyDown={a=>((a,t)=>{
                                let n=e[t];
                                if(n){
                                  if(" "===a.key||"Enter"===a.key){
                                    a.preventDefault(),c===id?(_(null),x(`${title} dropped at position ${t+1} of ${h}.`)):(p.current=e,_(id),x(`${title} grabbed, position ${t+1} of ${h}. Use the arrow keys to move, space to drop, escape to cancel.`));
                                    return
                                  }
                                  if(c===id)if("ArrowUp"===a.key||"ArrowDown"===a.key){
                                    a.preventDefault();
                                    let e=V(t+("ArrowUp"===a.key?-1:1),0,h-1);
                                    e!==t&&(f(t,e),x(`Moved to position ${e+1} of ${h}.`))
                                  }else"Escape"===a.key&&(a.preventDefault(),r(p.current),_(null),x("Reorder cancelled."))
                                }
                              })(a,l)} className={F(K,"transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","flex h-14 shrink-0 touch-none items-center pl-2 pr-1",a?"cursor-grabbing":"cursor-grab")}>
                                <HugeiconsIcon icon={Icon_60041} size={18} strokeWidth={2} aria-hidden="true" />
                              </button>
                              <span className={F("text-[13px]/[16px] font-semibold tabular-nums",K,"w-4 shrink-0 text-center")}>{l+1}</span>
                              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <p className="flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100"><span className="truncate">{title}</span></p>
                                <p data-description className={F(U,K,"truncate")}>
                                  <span className="text-neutral-900/78 dark:text-neutral-100/78">{author}</span>
                                  <span className="ms-3 tabular-nums">{words}</span>
                                </p>
                              </div>
                              <time className="shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{G[l]}</time>
                            </div>
                          </li>
              );
            })}
          </ul>
          <p aria-live="polite" className="sr-only">{u}</p>
        </div>
      </div>
  );
}
