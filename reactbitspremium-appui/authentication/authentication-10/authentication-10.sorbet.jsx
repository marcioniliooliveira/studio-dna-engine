/**
 * React Bits Pro — Application UI (authentication-10 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let aF = (...e)=>e.filter(Boolean).join(" ");

let aP = "text-neutral-900 dark:text-neutral-100";

let aR = "text-neutral-900/62 dark:text-neutral-100/62";

let aM = "text-[15px]/[22px] font-medium";

let aO = "text-[14px]/[20px] font-medium";

let a$ = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let aU = "flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]";

let aL = "rounded-[var(--rb-r-4xl,18px)]";

let aH = "relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16";

let aq = "cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10";

let aV = "flex min-w-0 flex-1 flex-col gap-0.5";

let aY = "flex max-w-full min-w-0 items-baseline gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100";

let aG = "line-clamp-2 text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78";

let aX = [{id:"dana",name:"Dana Whitfield",email:"dana.whitfield@northwind.com",workspace:"Northwind Operations",state:"active",detail:"Signed in 4 hours ago"},{id:"mina",name:"Mina Park",email:"mina.park@northwind.com",workspace:"Northwind Design",state:"active",detail:"Signed in yesterday"},{id:"ardent",name:"D. Whitfield (contractor)",email:"d.whitfield@ardentfreight.co",workspace:"Ardent Freight",state:"expired",detail:"Session expired, sign in again"}];


export default function authentication_10__Sorbet__Component(){
  let[e,a]=useState("dana"),r=aX.find(a=>a.id===e)??aX[0],o="expired"===r.state;
  return (
    <div className={aF("bg-white dark:bg-neutral-950",aP,"relative flex h-full min-h-[740px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center">
          <div className={aF("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","shrink-0 p-6 sm:p-7")}>
            <div className={aF("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] select-none","size-9")}><span className={aU}>N</span></div>
            <h1 className={aF("text-[22px]/[28px] font-extrabold tracking-[-0.01em]",aP,"mt-4")}>Choose an account</h1>
            <p className={aF(aM,aR,"mt-1")}>This browser remembers three Northwind accounts.</p>
            <div className="mt-5 flex flex-col gap-1">
              {aX.map(r=>{
                let n=r.id===e;
                return (
                  <button key={r.id} type="button" aria-pressed={n} onClick={()=>a(r.id)} className={aF(aH,n?"bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]":aq,a$,aL,"px-3")}>
                                <span className={aF("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","size-10")}>
                                  <span className={aU}>
                                    {r.name.replace(/\(.*\)/,"").trim().split(/[\s.]+/).filter(Boolean).slice(0,2).map(e=>e[0]?.toUpperCase()).join("")}
                                  </span>
                                </span>
                                <span className={aV}>
                                  <span className={aY}><span className="truncate">{r.name}</span></span>
                                  <span data-description className={aG}><span className="block truncate">{r.email}</span></span>
                                  <span className={aF(aO,"expired"===r.state?"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]":aR,"mt-1 flex items-center gap-1.5")}><span className="truncate">{r.detail}</span></span>
                                </span>
                                {n&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />}
                              </button>
                );
              })}
              <button type="button" className={aF(aH,aq,a$,aL,"px-3")}>
                <span className={aF("flex size-9 shrink-0 items-center justify-center text-neutral-900/78 dark:text-neutral-100/78","size-10")}>
                  <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className={aV}>
                  <span className={aY}>Use another account</span>
                  <span data-description className={aG}>Sign in with a different email or provider</span>
                </span>
              </button>
            </div>
            <button type="button" className={aF("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold","mt-5 w-full")}>
              {o?<HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" />:null}
              {o?`Sign in again as ${r.name.split(" ")[0]}`:`Continue to ${r.workspace}`}
              {!o&&<HugeiconsIcon icon={Icon_55299} size={18} strokeWidth={2} aria-hidden="true" />}
            </button>
            <p aria-live="polite" className={aF(aO,aR,"mt-3 text-center")}>
              {o?"Sessions for contractor accounts end after 12 hours.":`Signing in as ${r.email}`}
            </p>
          </div>
          <p className={aF(aM,aR,"mt-5 text-center")}>
            Finished on this device?
            {" "}
            <button type="button" className="font-bold text-neutral-900 dark:text-neutral-100 underline decoration-[var(--rb-accent,oklch(84%_0.15_165))] decoration-[3px] underline-offset-[5px] transition-[text-decoration-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:decoration-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:decoration-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:decoration-[var(--rb-accent,oklch(81%_0.16_163))]">Sign out of all accounts</button>
          </p>
        </div>
      </div>
  );
}
