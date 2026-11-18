/**
 * React Bits Pro — Application UI (wizard-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_86829 = [["ellipse",{cx:"12",cy:"5",rx:"8",ry:"3",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 10.842C7.60158 11.0229 8.27434 11.1718 9 11.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M7 17.842C7.60158 18.0229 8.27434 18.1718 9 18.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_46176 = [["path",{d:"M5.22576 11.3294L12.224 2.34651C12.7713 1.64397 13.7972 2.08124 13.7972 3.01707V9.96994C13.7972 10.5305 14.1995 10.985 14.6958 10.985H18.0996C18.8729 10.985 19.2851 12.0149 18.7742 12.6706L11.776 21.6535C11.2287 22.356 10.2028 21.9188 10.2028 20.9829V14.0301C10.2028 13.4695 9.80048 13.015 9.3042 13.015H5.90035C5.12711 13.015 4.71494 11.9851 5.22576 11.3294Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36972 = [["path",{d:"M14 16.5V15M14 11.5V10.5M16 19C16 20.1046 15.1046 21 14 21C12.8954 21 12 20.1046 12 19C12 17.8954 12.8954 17 14 17C15.1046 17 16 17.8954 16 19Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 7.00447H16.75C18.8567 7.00447 19.91 7.00447 20.6667 7.51062C20.9943 7.72974 21.2755 8.01131 21.4944 8.33925C22 9.09676 22 10.1513 22 12.2603C22 15.7754 22 17.5329 21.1573 18.7955C20.7926 19.342 20.3238 19.8113 19.7779 20.1765C19.5391 20.3362 19.2827 20.4657 19 20.5706M12 7.00447L11.3666 5.73618C10.8418 4.68546 10.3622 3.62782 9.19926 3.19122C8.6899 3 8.10802 3 6.94427 3C5.1278 3 4.21956 3 3.53806 3.38074C3.05227 3.65215 2.65142 4.05344 2.38032 4.53978C2 5.22204 2 6.13129 2 7.94979V11.0089C2 15.7282 2 18.0879 3.46447 19.554C4.5784 20.6692 6.20875 20.9361 9 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90089 = [["path",{d:"M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20.788 11.0972C20.9293 11.2959 21 11.5031 21 11.7309C21 12.7127 19.6873 13.3109 17.0618 14.5072L15.357 15.284C13.7048 16.0368 12.8786 16.4133 12 16.4133C11.1214 16.4133 10.2952 16.0368 8.64298 15.284L6.93817 14.5072C4.31272 13.3109 3 12.7127 3 11.7309C3 11.5031 3.07067 11.2959 3.212 11.0972",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.3767 16.2661C20.7922 16.5971 21 16.927 21 17.3176C21 18.2995 19.6873 18.8976 17.0618 20.0939L15.357 20.8707C13.7048 21.6236 12.8786 22 12 22C11.1214 22 10.2952 21.6236 8.64298 20.8707L6.93817 20.0939C4.31272 18.8976 3 18.2995 3 17.3176C3 16.927 3.20778 16.5971 3.62334 16.2661",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_57466 = [["path",{d:"M4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 14L9.79289 11.2071C10.1834 10.8166 10.8166 10.8166 11.2071 11.2071L12.7929 12.7929C13.1834 13.1834 13.8166 13.1834 14.2071 12.7929L17 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_78830 = [["path",{d:"M1.99219 7C1.99219 7.94281 1.99219 8.41421 2.28508 8.70711C2.57797 9 3.04938 9 3.99219 9H5.99219V5C5.99219 3.89543 5.09676 3 3.99219 3C2.88762 3 1.99219 3.89543 1.99219 5V7Z",stroke:"currentColor",fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.99219 19V18C9.99219 17.0572 9.99219 16.5858 10.2851 16.2929C10.578 16 11.0494 16 11.9922 16H19.9922C20.935 16 21.4064 16 21.6993 16.2929C21.9922 16.5858 21.9922 17.0572 21.9922 18V19C21.9922 20.1046 21.0968 21 19.9922 21H7.99219C9.09676 21 9.99219 20.1046 9.99219 19Z",stroke:"currentColor",fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18.9922 16V7C18.9922 5.11438 18.9922 4.17157 18.4064 3.58579C17.8206 3 16.8778 3 14.9922 3H3.99219",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99219 8H14.9922",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M9.99219 11H12.9922",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M5.99219 9V19C5.99219 20.1046 6.88762 21 7.99219 21C9.09676 21 9.99219 20.1046 9.99219 19V18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let _ = (...e)=>e.filter(Boolean).join(" "),
  m = "text-neutral-900 dark:text-neutral-100",
  k = "text-neutral-900/66 dark:text-neutral-100/66",
  f = "text-[14px]/[16px] font-[450]",
  v = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  g = _("text-[13px]/[18px] font-normal",k),
  w = _("text-[12px]/[16px] font-normal tabular-nums",k),
  j = _("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","active:bg-neutral-900/8 dark:active:bg-neutral-100/8",v),
  N = _("bg-neutral-900/9 dark:bg-neutral-100/9",v),
  y = ["Region","Services","Limits","Review"],
  z = [{id:"postgres",icon:Icon_86829,name:"Managed Postgres",blurb:"Primary store with nightly snapshots.",boot:12},{id:"cache",icon:Icon_46176,name:"In-memory cache",blurb:"Shared key store for sessions.",boot:4},{id:"objects",icon:Icon_36972,name:"Object storage",blurb:"Buckets for uploads and exports.",boot:6},{id:"queue",icon:Icon_90089,name:"Background queue",blurb:"Retries and dead-letter handling.",boot:8},{id:"cron",icon:Icon_29635,name:"Scheduled jobs",blurb:"Cron runners with a shared log.",boot:5},{id:"search",icon:Icon_66575,name:"Search index",blurb:"Rebuilt from Postgres on write.",boot:14},{id:"metrics",icon:Icon_57466,name:"Metrics pipeline",blurb:"Request, queue, and job counters.",boot:7},{id:"logs",icon:Icon_78830,name:"Log retention",blurb:"Thirty days of searchable output.",boot:3}];

function S(){
  let{ref:e,edges:r,onScroll:a}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=r;
      a({start:t>1,end:t+n<l-1})
    }, []);
    return useEffect(()=>{
      let r=e.current;
      if(!r)return;
      t();
      let a=r.ownerDocument.defaultView?.ResizeObserver,l=a?new a(t):null;
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),[s,i]=useState(["postgres","cache","queue"]),o=z.filter(e=>s.includes(e.id)).reduce((e,r)=>e+r.boot,0);
  return (
    <div className={_("bg-white dark:bg-neutral-950",m,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <header className={_("border-b border-neutral-900/8 dark:border-neutral-100/8","shrink-0")}>
          <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
            <button type="button" aria-label="Back to region" className={_("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-8 rounded-[var(--rb-r-sm,6px)]")}>
              <HugeiconsIcon icon={Icon_18976} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className={_(f,"truncate")}>New environment</h1>
              <p className={_(w,"flex gap-x-3 truncate")}>
                <span>staging</span>
                <span>eu-west</span>
              </p>
            </div>
            <button type="button" className={_("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>Save and exit</button>
          </div>
          <ol className="mx-auto flex w-full max-w-[560px] items-center gap-3 px-4 pb-3 sm:px-6">
            {y.map((e,r)=>{
              let a=r<1,l=1===r;
              return (
                <li key={e} className={_("flex min-w-0 items-center gap-3",r<y.length-1&&"flex-1")}>
                            <span aria-current={l?"step":undefined} className="flex min-w-0 items-center gap-2">
                              <span aria-hidden="true" className={_("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums",a?"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/80 dark:text-neutral-100/80 dark:border-neutral-100/14":l?"border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100":"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14")}>{a?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} />:r+1}</span>
                              <span className={_(f,l||a?m:k,"hidden truncate sm:block")}>
                                {e}
                                <span className="sr-only">{a?", done":l?", current":""}</span>
                              </span>
                            </span>
                            {r<y.length-1&&<span aria-hidden="true" className={a?"h-px min-w-4 flex-1 bg-neutral-900 dark:bg-neutral-100":"h-px min-w-4 flex-1 bg-neutral-900/8 dark:bg-neutral-100/8"} />}
                          </li>
              );
            })}
          </ol>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={a} className="h-full overflow-y-auto px-4 py-6 sm:px-6">
            <div className="mx-auto w-full max-w-[880px]">
              <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Pick the services this environment runs</h2>
              <p className={_(g,"mt-1")}>Anything left out can be attached later without a rebuild.</p>
              <div role="group" aria-label="Available services" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {z.map(e=>{
                  let r=s.includes(e.id);
                  return (
                    <label key={e.id} className={_("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","cursor-pointer")}>
                                    <span className={_(r?N:j,"flex flex-1 flex-col p-4")}>
                                      <span className="flex items-center justify-between gap-3">
                                        <span aria-hidden="true" className={_("text-neutral-900/80 dark:text-neutral-100/80","flex")}><HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} /></span>
                                        <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                                          <input type="checkbox" checked={r} onChange={()=>{
                                            let r;
                                            return r=e.id,i(e=>e.includes(r)?e.filter(e=>e!==r):[...e,r]);
                                          }} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                                          <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                                        </span>
                                      </span>
                                      <span className={_(f,"mt-3 truncate")}>{e.name}</span>
                                      <span className={_(g,"mt-0.5")}>{e.blurb}</span>
                                    </span>
                                  </label>
                  );
                })}
              </div>
              <p className={_(g,"mt-4")}>
                Every selected service is provisioned inside the same private network. Nothing is exposed publicly until you add a route.
              </p>
            </div>
          </div>
          <div aria-hidden="true" className={_("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={_("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
        </div>
        <div className={_("border-t border-neutral-900/8 dark:border-neutral-100/8","flex shrink-0 items-center justify-between gap-3 px-4 py-4 sm:px-6")}>
          <div className="min-w-0">
            <p className={_(f,"truncate tabular-nums")}>
              {s.length}
              {" of "}
              {z.length}
              {" selected"}
            </p>
            <p className={_(g,"truncate tabular-nums")}>
              {0===s.length?"Pick at least one service to continue":`Adds about ${o}s to each deploy`}
            </p>
          </div>
          <button type="button" disabled={0===s.length} className={_("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>Set limits</button>
        </div>
      </div>
  );
}


export default S;
