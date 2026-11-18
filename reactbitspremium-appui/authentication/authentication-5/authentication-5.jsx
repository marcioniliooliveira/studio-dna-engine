/**
 * React Bits Pro — Application UI (authentication-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_34195 = [["path",{d:"M1.99609 6L8.90912 9.91697C11.4577 11.361 12.5345 11.361 15.0831 9.91697L21.9961 6",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.9961 20.5C11.0306 20.5 10.0652 20.4878 9.09492 20.4634C5.94643 20.3843 4.37218 20.3448 3.24105 19.2094C2.10992 18.0739 2.07723 16.5412 2.01186 13.4756C1.99084 12.4899 1.99084 11.5101 2.01186 10.5244C2.07723 7.45885 2.10992 5.92608 3.24105 4.79065C4.37218 3.65521 5.94642 3.61566 9.09492 3.53656C11.0354 3.48781 12.9568 3.48781 14.8973 3.53657C18.0458 3.61568 19.62 3.65523 20.7511 4.79066C21.8823 5.92609 21.915 7.45886 21.9803 10.5244C21.9837 10.6831 21.9866 10.8416 21.9888 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.9961 18.3333C14.9961 18.3333 15.8711 18.3333 16.7461 20C16.7461 20 19.5255 15.8333 21.9961 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_52975 = [["path",{d:"M15 3H18C19.4142 3 20.1213 3 20.5607 3.43934C21 3.87868 21 4.58579 21 6V9M20 4L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20 13C20 16.7712 20 18.6569 18.8284 19.8284C17.6569 21 15.7712 21 12 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V12C3 8.22876 3 6.34315 4.17157 5.17157C5.34315 4 7.22876 4 11 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[20px]/[24px] font-[450] tracking-[-0.015em]",
  p = "text-[14px]/[20px] font-normal",
  _ = "text-[13px]/[18px] font-normal",
  m = "text-[14px]/[16px] font-[450]",
  k = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  v = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  g = "transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none",
  w = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function j(){
  let e=useId(),[a,r]=useState(true),[j,N]=useState("dana.whitfield@northwind.com"),[y,z]=useState("dana.whitfield@northwind.com"),[S,C]=useState(false),[A,W]=useState(45),[D,T]=useState(0),I=useRef(null);
  return useEffect(()=>{
    if(!a||A<=0)return;
    let e=setInterval(()=>W(e=>e>0?e-1:0),1e3);
    return ()=>clearInterval(e);
  }, [a,A]),<div className={u("bg-white dark:bg-neutral-950",x,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
    <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center">
      <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shrink-0 p-6 sm:p-7")}>
        {a?<div className={g}>
          <HugeiconsIcon icon={Icon_34195} size={18} strokeWidth={1.8} aria-hidden="true" className={u("text-neutral-900/80 dark:text-neutral-100/80","block")} />
          <h1 className={u(h,x,"mt-4")}>Check your inbox</h1>
          <p className={u(p,b,"mt-1.5")}>
            A sign-in link is on its way to
            {" "}
            <span className={u(m,x)}>{j}</span>
            . It works once and expires in 15 minutes.
          </p>
          <div className={u("bg-neutral-900/5 dark:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-5")}>
            {[{label:"Sent to",value:j},{label:"Expires",value:"15 minutes"},{label:"Requested from",value:"Chrome on macOS, Lisbon"}].map(e=>(
              <div key={e.label} className={u("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","px-3")}>
                            <span className={u(p,b,"shrink-0")}>{e.label}</span>
                            <span className="flex min-w-0 flex-1 justify-end"><span className={u(m,x,"truncate")}>{e.value}</span></span>
                          </div>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            <button type="button" className={u(k,v,"w-full")}>
              Open mail app
              <HugeiconsIcon icon={Icon_52975} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button type="button" onClick={()=>{
              A>0||(W(45),T(e=>e+1))
            }} disabled={A>0} className={u(f,v,"w-full")}>
              <HugeiconsIcon icon={Icon_59157} size={16} strokeWidth={1.8} aria-hidden="true" />
              {A>0?<span className="tabular-nums">
                {"Resend link in "}
                {`${Math.floor(A/60)}:${String(A%60).padStart(2,"0")}`}
              </span>:"Resend link"}
            </button>
          </div>
          <p aria-live="polite" className={u(_,b,"mt-3 text-center")}>
            {D>0?`Link sent again. ${1===D?"1 resend":`${D} resends`} used.`:"No email yet? Check spam, then try a different address."}
          </p>
          <button type="button" onClick={()=>{
            r(false),z(j),setTimeout(()=>I.current?.focus({preventScroll:true}),0)
          }} className={u(f,v,"mt-4 w-full")}>
            <HugeiconsIcon icon={Icon_18976} size={16} strokeWidth={1.8} aria-hidden="true" />
            Use a different email
          </button>
        </div>:<form onSubmit={e=>{
          (e.preventDefault(),w.test(y.trim()))?(C(false),N(y.trim()),W(45),r(true)):C(true)
        }} noValidate className={u(g,"flex flex-col")}>
          <div className={u("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[var(--rb-r-sm,6px)] select-none","size-10")}>
            <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">N</span>
          </div>
          <h1 className={u(h,x,"mt-4")}>Sign in with a link</h1>
          <p className={u(p,b,"mt-1.5")}>No password needed. We send a one-time link to your work address.</p>
          <label htmlFor={e} className={u("flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100","mt-6")}>Work email</label>
          <div className={u("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","mt-2")}>
            <input ref={I} id={e} type="email" autoComplete="email" value={y} onChange={e=>{
              z(e.target.value),C(false)
            }} placeholder="name@company.com" aria-invalid={S} className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
          </div>
          <p className={u(S?"flex items-start gap-2 text-[13px]/[18px] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":"max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-2")}>
            {S&&<HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />}
            {S?"Enter a valid email address.":"Links expire after 15 minutes and can be used once."}
          </p>
          <button type="submit" className={u(k,v,"mt-4 w-full")}>Send sign-in link</button>
          <p className={u(p,b,"mt-4 text-center")}>
            Prefer a password?
            {" "}
            <button type="button" className="text-neutral-900 dark:text-neutral-100 underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]">Sign in the usual way</button>
          </p>
        </form>}
      </div>
      <p className={u(_,b,"mt-5 text-center")}>Requests are rate limited to protect your account.</p>
    </div>
  </div>;
}


export default j;
