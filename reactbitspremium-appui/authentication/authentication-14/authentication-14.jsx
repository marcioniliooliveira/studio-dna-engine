/**
 * React Bits Pro — Application UI (authentication-14)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_56988 = [["path",{d:"M20.4999 16.5V8.5C20.4999 6.14298 20.4999 4.96447 19.7676 4.23223C19.0354 3.5 17.8569 3.5 15.4999 3.5H8.49988C6.14286 3.5 4.96434 3.5 4.23211 4.23223C3.49988 4.96447 3.49988 6.14298 3.49988 8.5V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.9841 20.5H2.01567C1.63273 20.5 1.38367 20.1088 1.55493 19.7764L3.49988 16.5H20.4999L22.4448 19.7764C22.6161 20.1088 22.367 20.5 21.9841 20.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_14775 = [["path",{d:"M11.9922 8L11.9922 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.1172 15.75L11.9922 15.75M12.2422 15.75C12.2422 15.8881 12.1303 16 11.9922 16C11.8541 16 11.7422 15.8881 11.7422 15.75C11.7422 15.6119 11.8541 15.5 11.9922 15.5C12.1303 15.5 12.2422 15.6119 12.2422 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.9922 11.1835V8.28041C20.9922 6.64041 20.9922 5.82041 20.5881 5.28541C20.184 4.75042 19.2703 4.49068 17.4429 3.97122C16.1944 3.61632 15.0938 3.18875 14.2145 2.79841C13.0156 2.26622 12.4161 2.00012 11.9922 2.00012C11.5682 2.00012 10.9688 2.26622 9.7699 2.79841C8.89057 3.18875 7.79002 3.61632 6.54152 3.97122C4.71411 4.49068 3.80041 4.75042 3.3963 5.28541C2.99219 5.82041 2.99219 6.64041 2.99219 8.28041V11.1835C2.99219 16.8086 8.05496 20.1836 10.5861 21.5195C11.1932 21.8399 11.4968 22.0001 11.9922 22.0001C12.4876 22.0001 12.7911 21.8399 13.3982 21.5195C15.9294 20.1836 20.9922 16.8086 20.9922 11.1835Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_87924 = [["path",{d:"M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  b = "text-neutral-900/80 dark:text-neutral-100/80",
  h = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  _ = "text-[20px]/[24px] font-[450] tracking-[-0.015em]",
  m = "text-[14px]/[20px] font-normal",
  k = "text-[13px]/[18px] font-normal",
  f = "text-[14px]/[16px] font-[450]",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  g = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  w = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  j = "bg-neutral-900/5 dark:bg-neutral-100/5",
  N = "rounded-[var(--rb-r-sm,6px)]",
  y = "relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",
  z = "transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none",
  S = [{label:"Device",value:["Windows 11","Edge 126"]},{label:"Location",value:["Rotterdam, Netherlands"]},{label:"IP address",value:["84.29.117.4"]},{label:"Requested",value:["Just now","14:06 CET"]}],
  C = [{device:"MacBook Pro",browser:"Chrome",place:"Lisbon",when:"2 hours ago",flagged:false},{device:"iPhone 15",browser:"Safari",place:"Lisbon",when:"Yesterday",flagged:false},{device:"Unknown",browser:"Firefox",place:"Sofia",when:"3 days ago",flagged:true}];

function A(){
  let[e,a]=useState("pending");
  return (
    <div className={u("bg-white dark:bg-neutral-950",x,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center">
          <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shrink-0 p-6 sm:p-7")}>
            {"pending"===e&&<div className={z}>
              <HugeiconsIcon icon={Icon_56988} size={18} strokeWidth={1.8} aria-hidden="true" className={u(b,"block")} />
              <h1 className={u(_,x,"mt-4")}>Approve this sign-in</h1>
              <p className={u(m,h,"mt-1.5")}>
                A device we have not seen before is trying to open Northwind as
                {" "}
                <span className={u(f,x)}>dana.whitfield@northwind.com</span>
                .
              </p>
              <div className={u(j,N,p,"mt-5")}>
                {S.map(e=>(
                  <div key={e.label} className={u(y,"px-3")}>
                                <span className={u(m,h,"shrink-0")}>{e.label}</span>
                                <span className={u(f,x,"flex min-w-0 flex-1 justify-end gap-2")}>{e.value.map(e=><span key={e} className="truncate">{e}</span>)}</span>
                              </div>
                ))}
              </div>
              <p className={u(k,h,"mt-3")}>The request expires in 4 minutes.</p>
              <button type="button" onClick={()=>a("approved")} className={u(v,w,"mt-4 w-full")}>Yes, that was me</button>
              <button type="button" onClick={()=>a("denied")} className={u(g,w,"mt-2 w-full")}>No, secure my account</button>
            </div>}
            {"approved"===e&&<div className={z}>
              <HugeiconsIcon icon={Icon_90987} size={24} strokeWidth={1.8} aria-hidden="true" className={u(b,"block")} />
              <h1 className={u(_,x,"mt-5")}>Sign-in approved</h1>
              <p className={u(m,h,"mt-1.5")}>
                Edge on Windows 11 is now signed in and has been added to your trusted devices for 30 days.
              </p>
              <button type="button" onClick={()=>a("pending")} className={u(g,w,"mt-6 w-full")}>Back to the request</button>
            </div>}
            {"denied"===e&&<div className={z}>
              <HugeiconsIcon icon={Icon_14775} size={24} strokeWidth={1.8} aria-hidden="true" className={u("text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]","block")} />
              <h1 className={u(_,x,"mt-5")}>Request blocked</h1>
              <p className={u(m,h,"mt-1.5")}>
                We turned that device away. Finish securing the account with the two steps below.
              </p>
              <ol className={u(j,N,p,"mt-5")}>
                {["Change your password","End every other active session"].map((e,a)=>(
                  <li key={e} className={u(y,"px-3")}>
                                <span className={u("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums","border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14","size-[20px]")}>{a+1}</span>
                                <span className={u(k,x)}>{e}</span>
                              </li>
                ))}
              </ol>
              <button type="button" className={u(v,w,"mt-4 w-full")}>Change password</button>
              <button type="button" onClick={()=>a("pending")} className={u(g,w,"mt-2 w-full")}>Back to the request</button>
            </div>}
          </div>
          <div className="mt-5">
            <p className={u("text-[12px]/[16px] font-normal tabular-nums",h)}>Recent sign-ins</p>
            <ul className="mt-2 space-y-1">
              {C.map(e=>(
                <li key={e.device} className="flex items-center gap-3 py-2">
                            <span className={u(k,x,"flex min-w-0 flex-1 gap-2")}>
                              <span className={u("truncate",e.flagged&&"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]")}>{e.device}</span>
                              <span className="shrink-0">{e.browser}</span>
                            </span>
                            <span className={u(k,h,"flex w-20 shrink-0 items-center gap-1")}>
                              <HugeiconsIcon icon={e.flagged?Icon_89289:Icon_87924} size={12} strokeWidth={1.8} aria-hidden="true" />
                              {e.place}
                            </span>
                            <span className={u(k,h,"w-20 shrink-0 text-right")}>{e.when}</span>
                          </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
}


export default A;
