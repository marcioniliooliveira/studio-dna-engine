/**
 * React Bits Pro — Application UI (authentication-10)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  b = "text-[14px]/[20px] font-normal",
  h = "text-[13px]/[18px] font-normal",
  p = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  _ = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  m = "rounded-[var(--rb-r-sm,6px)]",
  k = "relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",
  f = "cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8",
  v = "flex min-w-0 flex-1 flex-col gap-0.5",
  g = "flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  w = "line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  j = [{id:"dana",name:"Dana Whitfield",email:"dana.whitfield@northwind.com",workspace:"Northwind Operations",state:"active",detail:"Signed in 4 hours ago"},{id:"mina",name:"Mina Park",email:"mina.park@northwind.com",workspace:"Northwind Design",state:"active",detail:"Signed in yesterday"},{id:"ardent",name:"D. Whitfield (contractor)",email:"d.whitfield@ardentfreight.co",workspace:"Ardent Freight",state:"expired",detail:"Session expired, sign in again"}];

function N(){
  let[e,a]=useState("dana"),r=j.find(a=>a.id===e)??j[0],N="expired"===r.state;
  return (
    <div className={c("bg-white dark:bg-neutral-950",u,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center">
          <div className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shrink-0 p-6 sm:p-7")}>
            <div className={c("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[var(--rb-r-sm,6px)] select-none","size-9")}><span className={_}>N</span></div>
            <h1 className={c("text-[20px]/[24px] font-[450] tracking-[-0.015em]",u,"mt-4")}>Choose an account</h1>
            <p className={c(b,x,"mt-1")}>This browser remembers three Northwind accounts.</p>
            <div className="mt-5 flex flex-col gap-1">
              {j.map(r=>{
                let n=r.id===e;
                return (
                  <button key={r.id} type="button" aria-pressed={n} onClick={()=>a(r.id)} className={c(k,n?"bg-neutral-900/9 dark:bg-neutral-100/9":f,p,m,"px-3")}>
                                <span className={c("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-10")}>
                                  <span className={_}>
                                    {r.name.replace(/\(.*\)/,"").trim().split(/[\s.]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("")}
                                  </span>
                                </span>
                                <span className={v}>
                                  <span className={g}><span className="truncate">{r.name}</span></span>
                                  <span data-description className={w}><span className="block truncate">{r.email}</span></span>
                                  <span className={c(h,"expired"===r.state?"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]":x,"mt-1 flex items-center gap-1.5")}><span className="truncate">{r.detail}</span></span>
                                </span>
                                {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />}
                              </button>
                );
              })}
              <button type="button" className={c(k,f,p,m,"px-3")}>
                <span className={c("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","size-10")}>
                  <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className={v}>
                  <span className={g}>Use another account</span>
                  <span data-description className={w}>Sign in with a different email or provider</span>
                </span>
              </button>
            </div>
            <button type="button" className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-5 w-full")}>
              {N?<HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />:null}
              {N?`Sign in again as ${r.name.split(" ")[0]}`:`Continue to ${r.workspace}`}
              {!N&&<HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" />}
            </button>
            <p aria-live="polite" className={c(h,x,"mt-3 text-center")}>
              {N?"Sessions for contractor accounts end after 12 hours.":`Signing in as ${r.email}`}
            </p>
          </div>
          <p className={c(b,x,"mt-5 text-center")}>
            Finished on this device?
            {" "}
            <button type="button" className="text-neutral-900 dark:text-neutral-100 underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]">Sign out of all accounts</button>
          </p>
        </div>
      </div>
  );
}


export default N;
