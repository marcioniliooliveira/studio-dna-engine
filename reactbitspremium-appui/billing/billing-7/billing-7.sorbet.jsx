/**
 * React Bits Pro — Application UI (billing-7 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_46176 = [["path",{d:"M5.22576 11.3294L12.224 2.34651C12.7713 1.64397 13.7972 2.08124 13.7972 3.01707V9.96994C13.7972 10.5305 14.1995 10.985 14.6958 10.985H18.0996C18.8729 10.985 19.2851 12.0149 18.7742 12.6706L11.776 21.6535C11.2287 22.356 10.2028 21.9188 10.2028 20.9829V14.0301C10.2028 13.4695 9.80048 13.015 9.3042 13.015H5.90035C5.12711 13.015 4.71494 11.9851 5.22576 11.3294Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_86829 = [["ellipse",{cx:"12",cy:"5",rx:"8",ry:"3",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 10.842C7.60158 11.0229 8.27434 11.1718 9 11.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M7 17.842C7.60158 18.0229 8.27434 18.1718 9 18.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_67812 = [["path",{d:"M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_13473 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];

let ao = (...e)=>e.filter(Boolean).join(" ");

let ac = "text-neutral-900 dark:text-neutral-100";

let ad = "text-neutral-900/62 dark:text-neutral-100/62";

let a_ = "text-[14px]/[20px] font-medium";

let ax = "text-[15px]/[20px] font-bold";

let ab = "inline-flex items-start gap-1 text-[14px]/[20px] font-bold tabular-nums";

let au = [{id:"seats",icon:Icon_88366,name:"Seats",unit:"seats",used:24,included:20,rate:12},{id:"api",icon:Icon_46176,name:"API calls",unit:"calls",used:468e3,included:5e5,rate:12e-5},{id:"storage",icon:Icon_86829,name:"Storage",unit:"GB",used:96,included:100,rate:.4},{id:"email",icon:Icon_67812,name:"Transactional email",unit:"sends",used:118400,included:25e4,rate:4e-4}];

let ap = ["This cycle","Last cycle","Cycle to date"];

let ah = e=>`$${e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;

let am = e=>{
  let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!a&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=r.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let l="Home"===e.key?0:"End"===e.key?r.length-1:(t+a+r.length)%r.length;
  r[l].focus(),r[l].click()
};


export default function billing_7__Sorbet__Component(){
  let[e,a]=useState("This cycle"),{ref:r,edges:i,onScroll:s}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),o=useMemo(()=>au.map(e=>{
    let a=Math.max(e.used-e.included,0);
    return {...e,over:a,pct:Math.min(e.used/e.included*100,100),cost:a*e.rate,nearing:!a&&e.used/e.included>=.9};
  }), []),c=o.reduce((e,a)=>e+a.cost,0);
  return (
    <div className={ao("bg-white dark:bg-neutral-950",ac,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <div ref={r} onScroll={s} className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto flex w-full max-w-[900px] flex-col">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-[22px]/[28px] font-extrabold tracking-[-0.01em]">Usage and overages</h2>
                <p className={ao(a_,ad,"mt-0.5 flex flex-wrap gap-x-3")}>
                  <span>Growth plan</span>
                  <span>Jun 1 to Jun 30</span>
                  <span>12 days remaining</span>
                </p>
              </div>
              <div className={ao("inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1","h-10","shrink-0")} role="radiogroup" aria-label="Billing cycle" onKeyDown={am}>
                {ap.map(r=><button key={r} type="button" role="radio" aria-checked={r===e} tabIndex={r===e?0:-1} onClick={()=>a(r)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-4 text-[14px]/[18px] font-bold text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40">{r}</button>)}
              </div>
            </div>
            <div className={ao("@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1","mt-4")}>
              <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
                {[{label:"Estimated total",value:ah(1780+c),hint:"Billed Jul 1"},{label:"Plan subscription",value:ah(1780),hint:"20 seats included"},{label:"Metered overage",value:ah(c),hint:`${o.filter(e=>e.over>0).length} meter${1===o.filter(e=>e.over>0).length?"":"s"} over`}].map(e=>(
                  <div key={e.label} className="flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4">
                                <p className="text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78">{e.label}</p>
                                <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[22px]/[28px] font-extrabold tracking-[-0.01em] tabular-nums text-neutral-900 dark:text-neutral-100">{e.value}</p>
                                <p className="text-[14px]/[20px] font-medium text-neutral-900/62 dark:text-neutral-100/62">{e.hint}</p>
                              </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <h3 className={ax}>Metered entitlements</h3>
                <p className={ao(a_,ad,"mt-0.5")}>Anything beyond the included allowance bills at the listed rate.</p>
              </div>
              <button type="button" className={ao("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","max-sm:hidden")}>
                <HugeiconsIcon icon={Icon_13473} size={18} strokeWidth={2} aria-hidden="true" />
                Set an alert
              </button>
            </div>
            <div className={ao("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mt-3")}>
              <div className={ao("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-1")}>
                {o.map(e=>(
                  <div key={e.id} className="p-3">
                                <div className="flex items-start justify-between gap-4">
                                  <p className={ao(ax,"flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1")}>
                                    <HugeiconsIcon icon={e.icon} size={16} strokeWidth={2} aria-hidden="true" className={ao(ad,"shrink-0")} />
                                    <span className="min-w-0">{e.name}</span>
                                    {e.over>0&&<span className={ao(ab,"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]")}>Over allowance</span>}
                                    {e.nearing&&<span className={ao(ab,"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]")}>Nearing limit</span>}
                                  </p>
                                  <p className={ao(a_,ad,"flex shrink-0 gap-3 tabular-nums")}>
                                    <span>
                                      {e.used.toLocaleString("en-US")}
                                      {" of "}
                                      {e.included.toLocaleString("en-US")}
                                      {" "}
                                      {e.unit}
                                    </span>
                                    <span className="w-10 text-right">
                                      {Math.round(e.used/e.included*100)}
                                      %
                                    </span>
                                  </p>
                                </div>
                                <div className={ao("relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]","mt-2.5")} role="presentation">
                                  <div className={e.over>0?ao("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","block h-full"):e.nearing?ao("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full"):"block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]"} style={{width:`${e.pct}%`}} />
                                </div>
                                <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                  <p className={ao(a_,ad)}>
                                    {e.over>0?`${e.over.toLocaleString("en-US")} ${e.unit} over at ${ah(e.rate)} each`:`${(e.included-e.used).toLocaleString("en-US")} ${e.unit} left this cycle`}
                                  </p>
                                  <p className={ao(ax,"tabular-nums",e.over>0?ac:ad)}>{e.over>0?ah(e.cost):ah(0)}</p>
                                </div>
                              </div>
                ))}
              </div>
              <div className="flex min-h-12 min-w-0 items-center gap-2 px-4 py-2 text-[14px]/[20px] font-semibold text-neutral-900/62 dark:text-neutral-100/62 has-[button]:justify-end has-[button]:pe-2.5">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <p>
                    {e}
                    {" closes Jun 30. Overage is invoiced with the next subscription charge."}
                  </p>
                  <p className={ao(ax,ac,"shrink-0 tabular-nums")}>{ah(c)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className={ao("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",i.start?"opacity-100":"opacity-0")} />
        <div aria-hidden="true" className={ao("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
      </div>
  );
}
