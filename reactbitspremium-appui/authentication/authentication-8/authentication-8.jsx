/**
 * React Bits Pro — Application UI (authentication-8)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useId, useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_79715 = [["path",{d:"M12 3V6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 18V21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12L18 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L3 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M18.3635 5.63672L16.2422 7.75804",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.75804 16.2422L5.63672 18.3635",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M18.3635 18.3635L16.2422 16.2422",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M7.75804 7.75804L5.63672 5.63672",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_79698 = [["path",{d:"M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 6.5L16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_17601 = [["path",{d:"M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 9L11 9M8 13L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 22L22 22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/80 dark:text-neutral-100/80",
  _ = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "text-[13px]/[18px] font-normal",
  k = "text-[14px]/[16px] font-[450]",
  f = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  v = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  g = "min-w-0 text-[14px]/[16px] font-[450] text-neutral-900/66 dark:text-neutral-100/66",
  w = "flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]",
  j = {"northwind.com":{org:"Northwind Operations",provider:"Okta",members:"412 members",session:"8 hours, then re-authenticate",enforced:["Two-factor enforced by your admin","Directory sync adds and removes access","Device posture checked at sign-in"],admin:"it-help@northwind.com"},"ardentfreight.co":{org:"Ardent Freight",provider:"Microsoft Entra ID",members:"1,284 members",session:"12 hours, then re-authenticate",enforced:["Two-factor enforced by your admin","Directory sync adds and removes access","Sign-in restricted to managed devices"],admin:"identity@ardentfreight.co"}},
  N = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function y(){
  let e=useId(),[a,r]=useState("dana.whitfield@northwind.com"),[y,z]=useState(false),S=a.split("@")[1]?.trim().toLowerCase()??"",C=useMemo(()=>j[S], [S]),A=N.test(a.trim());
  return (
    <div className={b("bg-white dark:bg-neutral-950",h,"relative flex h-full min-h-[640px] w-full overflow-hidden")}>
        <div className="flex min-w-0 flex-1 flex-col px-6 py-8 sm:px-10">
          <div className="flex items-center gap-2">
            <span className={b("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","size-8",k)}>N</span>
            <span className={b(k,h)}>Northwind</span>
          </div>
          <div className="flex flex-1 items-center">
            <div className="mx-auto w-full max-w-[380px] py-8">
              <h1 className={b("text-[24px]/[28px] font-[450] tracking-[-0.015em]",h)}>Sign in with your company account</h1>
              <p className={b("text-[14px]/[20px] font-normal",_,"mt-2")}>
                Enter your work email and we route you to the identity provider your organization uses.
              </p>
              <form onSubmit={e=>{
                e.preventDefault(),A&&!y&&(z(true),setTimeout(()=>z(false),1400))
              }} noValidate className="mt-6 flex flex-col">
                <label htmlFor={e} className="flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Work email</label>
                <div className={b("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","mt-2")}>
                  <input id={e} type="email" autoComplete="email" value={a} onChange={e=>r(e.target.value)} placeholder="you@company.com" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                </div>
                <p aria-live="polite" className={b("max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-2")}>
                  {C?`${S} signs in through ${C.provider}.`:A?`No provider is configured for ${S}. You can use a password instead.`:"Try northwind.com or ardentfreight.co to see a matched provider."}
                </p>
                <button type="submit" disabled={!A||y} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",f,"mt-4 w-full")}>
                  {y?<HugeiconsIcon icon={Icon_79715} size={16} strokeWidth={1.8} aria-hidden="true" className="animate-spin [animation-duration:800ms] motion-reduce:animate-none" />:<HugeiconsIcon icon={Icon_79698} size={16} strokeWidth={1.8} aria-hidden="true" />}
                  {y?"Redirecting":C?`Continue with ${C.provider}`:"Continue"}
                  {!y&&<HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" />}
                </button>
                <button type="button" className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",f,"mt-2 w-full")}>Use a password instead</button>
              </form>
              <p className={b(m,_,"mt-6")}>
                Sign-in is logged with the time, device and location, and your admin can review it at any time.
              </p>
            </div>
          </div>
        </div>
        <aside className={b("bg-neutral-50 dark:bg-neutral-900","hidden w-[42%] shrink-0 flex-col p-8 lg:flex")}>
          <p className={b("text-[12px]/[16px] font-normal tabular-nums",_,"flex h-8 items-center")}>{C?"Matched organization":"No match yet"}</p>
          {C?<div className="mt-2 flex flex-1 flex-col">
            <div className="flex items-center gap-3">
              <HugeiconsIcon icon={Icon_17601} size={18} strokeWidth={1.8} aria-hidden="true" className={b(p,"shrink-0")} />
              <div className="min-w-0">
                <p className={b("text-[16px]/[20px] font-[450] tracking-[-0.015em]",h,"truncate")}>{C.org}</p>
                <p className={b(m,_,"truncate")}>{S}</p>
              </div>
            </div>
            <div className={b(v,"mt-5")}>
              <dl className="grid grid-cols-2 gap-1">
                <div className="px-4 py-3">
                  <dt className={b(g,"flex items-center gap-1.5")}>
                    <HugeiconsIcon icon={Icon_88366} size={14} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                    Directory
                  </dt>
                  <dd className={b(w,"mt-1")}>{C.members}</dd>
                </div>
                <div className="px-4 py-3">
                  <dt className={b(g,"flex items-center gap-1.5")}>
                    <HugeiconsIcon icon={Icon_79698} size={14} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                    Provider
                  </dt>
                  <dd className={b(w,"mt-1")}>{C.provider}</dd>
                </div>
                <div className="col-span-2 px-4 py-3">
                  <dt className={b(g,"flex items-center gap-1.5")}>
                    <HugeiconsIcon icon={Icon_29635} size={14} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                    Session length
                  </dt>
                  <dd className={b(w,"mt-1")}>{C.session}</dd>
                </div>
              </dl>
            </div>
            <ul className={b(v,"divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-5")}>
              {C.enforced.map(e=>(
                <li key={e} className={b("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","px-4")}>
                            <HugeiconsIcon icon={Icon_20484} size={14} strokeWidth={1.8} aria-hidden="true" className={b(_,"shrink-0")} />
                            <span className={b(m,p,"min-w-0 flex-1")}>{e}</span>
                          </li>
              ))}
            </ul>
            <p className={b(m,_,"mt-auto pt-6")}>
              Locked out? Your workspace admin is at
              {" "}
              <span className={b(p,"whitespace-nowrap")}>{C.admin}</span>
              .
            </p>
          </div>:<div className="mt-2 flex flex-1 flex-col items-start justify-center">
            <HugeiconsIcon icon={Icon_17601} size={18} strokeWidth={1.8} aria-hidden="true" className={b(_,"block")} />
            <p className={b("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","mt-4")}>We look up your domain</p>
            <p className={b("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1.5")}>
              Once your email matches a configured organization, its provider, directory size and security rules appear here before you continue.
            </p>
          </div>}
        </aside>
      </div>
  );
}


export default y;
