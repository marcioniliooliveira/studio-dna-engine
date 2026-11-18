/**
 * React Bits Pro — Application UI (authentication-14 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_56988 = [["path",{d:"M20.4999 16.5V8.5C20.4999 6.14298 20.4999 4.96447 19.7676 4.23223C19.0354 3.5 17.8569 3.5 15.4999 3.5H8.49988C6.14286 3.5 4.96434 3.5 4.23211 4.23223C3.49988 4.96447 3.49988 6.14298 3.49988 8.5V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.9841 20.5H2.01567C1.63273 20.5 1.38367 20.1088 1.55493 19.7764L3.49988 16.5H20.4999L22.4448 19.7764C22.6161 20.1088 22.367 20.5 21.9841 20.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_14775 = [["path",{d:"M11.9922 8L11.9922 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.1172 15.75L11.9922 15.75M12.2422 15.75C12.2422 15.8881 12.1303 16 11.9922 16C11.8541 16 11.7422 15.8881 11.7422 15.75C11.7422 15.6119 11.8541 15.5 11.9922 15.5C12.1303 15.5 12.2422 15.6119 12.2422 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.9922 11.1835V8.28041C20.9922 6.64041 20.9922 5.82041 20.5881 5.28541C20.184 4.75042 19.2703 4.49068 17.4429 3.97122C16.1944 3.61632 15.0938 3.18875 14.2145 2.79841C13.0156 2.26622 12.4161 2.00012 11.9922 2.00012C11.5682 2.00012 10.9688 2.26622 9.7699 2.79841C8.89057 3.18875 7.79002 3.61632 6.54152 3.97122C4.71411 4.49068 3.80041 4.75042 3.3963 5.28541C2.99219 5.82041 2.99219 6.64041 2.99219 8.28041V11.1835C2.99219 16.8086 8.05496 20.1836 10.5861 21.5195C11.1932 21.8399 11.4968 22.0001 11.9922 22.0001C12.4876 22.0001 12.7911 21.8399 13.3982 21.5195C15.9294 20.1836 20.9922 16.8086 20.9922 11.1835Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_87924 = [["path",{d:"M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];

let rH = (...e)=>e.filter(Boolean).join(" ");

let rq = "text-neutral-900 dark:text-neutral-100";

let rV = "text-neutral-900/78 dark:text-neutral-100/78";

let rY = "text-neutral-900/62 dark:text-neutral-100/62";

let rG = "divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7";

let rX = "text-[22px]/[28px] font-extrabold tracking-[-0.01em]";

let rZ = "text-[15px]/[22px] font-medium";

let rK = "text-[14px]/[20px] font-medium";

let rJ = "text-[15px]/[20px] font-bold";

let rQ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let r0 = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let r1 = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let r5 = "bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]";

let r2 = "rounded-[var(--rb-r-4xl,18px)]";

let r6 = "relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16";

let r8 = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let r4 = [{label:"Device",value:["Windows 11","Edge 126"]},{label:"Location",value:["Rotterdam, Netherlands"]},{label:"IP address",value:["84.29.117.4"]},{label:"Requested",value:["Just now","14:06 CET"]}];

let r3 = [{device:"MacBook Pro",browser:"Chrome",place:"Lisbon",when:"2 hours ago",flagged:false},{device:"iPhone 15",browser:"Safari",place:"Lisbon",when:"Yesterday",flagged:false},{device:"Unknown",browser:"Firefox",place:"Sofia",when:"3 days ago",flagged:true}];


export default function authentication_14__Sorbet__Component(){
  let[e,a]=useState("pending");
  return (
    <div className={rH("bg-white dark:bg-neutral-950",rq,"relative flex h-full min-h-[760px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center">
          <div className={rH("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","shrink-0 p-6 sm:p-7")}>
            {"pending"===e&&<div className={r8}>
              <HugeiconsIcon icon={Icon_56988} size={18} strokeWidth={2} aria-hidden="true" className={rH(rV,"block")} />
              <h1 className={rH(rX,rq,"mt-4")}>Approve this sign-in</h1>
              <p className={rH(rZ,rY,"mt-1.5")}>
                A device we have not seen before is trying to open Northwind as
                {" "}
                <span className={rH(rJ,rq)}>dana.whitfield@northwind.com</span>
                .
              </p>
              <div className={rH(r5,r2,rG,"mt-5")}>
                {r4.map(e=>(
                  <div key={e.label} className={rH(r6,"px-3")}>
                                <span className={rH(rZ,rY,"shrink-0")}>{e.label}</span>
                                <span className={rH(rJ,rq,"flex min-w-0 flex-1 justify-end gap-2")}>{e.value.map(e=><span key={e} className="truncate">{e}</span>)}</span>
                              </div>
                ))}
              </div>
              <p className={rH(rK,rY,"mt-3")}>The request expires in 4 minutes.</p>
              <button type="button" onClick={()=>a("approved")} className={rH(rQ,r1,"mt-4 w-full")}>Yes, that was me</button>
              <button type="button" onClick={()=>a("denied")} className={rH(r0,r1,"mt-2 w-full")}>No, secure my account</button>
            </div>}
            {"approved"===e&&<div className={r8}>
              <HugeiconsIcon icon={Icon_90987} size={24} strokeWidth={2} aria-hidden="true" className={rH(rV,"block")} />
              <h1 className={rH(rX,rq,"mt-5")}>Sign-in approved</h1>
              <p className={rH(rZ,rY,"mt-1.5")}>
                Edge on Windows 11 is now signed in and has been added to your trusted devices for 30 days.
              </p>
              <button type="button" onClick={()=>a("pending")} className={rH(r0,r1,"mt-6 w-full")}>Back to the request</button>
            </div>}
            {"denied"===e&&<div className={r8}>
              <HugeiconsIcon icon={Icon_14775} size={24} strokeWidth={2} aria-hidden="true" className={rH("text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]","block")} />
              <h1 className={rH(rX,rq,"mt-5")}>Request blocked</h1>
              <p className={rH(rZ,rY,"mt-1.5")}>
                We turned that device away. Finish securing the account with the two steps below.
              </p>
              <ol className={rH(r5,r2,rG,"mt-5")}>
                {["Change your password","End every other active session"].map((e,a)=>(
                  <li key={e} className={rH(r6,"px-3")}>
                                <span className={rH("grid size-7 shrink-0 place-items-center rounded-full border-2 text-[13px]/[16px] font-extrabold tabular-nums","border-transparent bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900/62 dark:text-neutral-100/62 dark:bg-neutral-100/10","size-[20px]")}>{a+1}</span>
                                <span className={rH(rK,rq)}>{e}</span>
                              </li>
                ))}
              </ol>
              <button type="button" className={rH(rQ,r1,"mt-4 w-full")}>Change password</button>
              <button type="button" onClick={()=>a("pending")} className={rH(r0,r1,"mt-2 w-full")}>Back to the request</button>
            </div>}
          </div>
          <div className="mt-5">
            <p className={rH("text-[13px]/[16px] font-semibold tabular-nums",rY)}>Recent sign-ins</p>
            <ul className="mt-2 space-y-1">
              {r3.map(e=>(
                <li key={e.device} className="flex items-center gap-3 py-2">
                            <span className={rH(rK,rq,"flex min-w-0 flex-1 gap-2")}>
                              <span className={rH("truncate",e.flagged&&"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]")}>{e.device}</span>
                              <span className="shrink-0">{e.browser}</span>
                            </span>
                            <span className={rH(rK,rY,"flex w-20 shrink-0 items-center gap-1")}>
                              <HugeiconsIcon icon={e.flagged?Icon_89289:Icon_87924} size={14} strokeWidth={2} aria-hidden="true" />
                              {e.place}
                            </span>
                            <span className={rH(rK,rY,"w-20 shrink-0 text-right")}>{e.when}</span>
                          </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
}
