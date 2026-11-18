/**
 * React Bits Pro — Application UI (authentication-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useId, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_3367 = [["path",{d:"M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_9974 = [["path",{d:"M12 5.75C12 3.75 13.5 1.75 15.5 1.75C15.5 3.75 14 5.75 12 5.75Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.5 8.09001C11.9851 8.09001 11.5867 7.92646 11.1414 7.74368C10.5776 7.51225 9.93875 7.25 8.89334 7.25C7.02235 7.25 4 8.74945 4 12.7495C4 17.4016 7.10471 22.25 9.10471 22.25C9.77426 22.25 10.3775 21.9871 10.954 21.7359C11.4815 21.5059 11.9868 21.2857 12.5 21.2857C13.0132 21.2857 13.5185 21.5059 14.046 21.7359C14.6225 21.9871 15.2257 22.25 15.8953 22.25C17.2879 22.25 18.9573 19.8992 20 16.9008C18.3793 16.2202 17.338 14.618 17.338 12.75C17.338 11.121 18.2036 10.0398 19.5 9.25C18.5 7.75 17.0134 7.25 15.9447 7.25C14.8993 7.25 14.2604 7.51225 13.6966 7.74368C13.2514 7.92646 13.0149 8.09001 12.5 8.09001Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_79698 = [["path",{d:"M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 6.5L16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "border-t border-neutral-900/8 dark:border-neutral-100/8",
  p = "text-[13px]/[18px] font-normal",
  _ = "text-[14px]/[16px] font-[450]",
  m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  k = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  f = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  v = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  g = "text-neutral-900 dark:text-neutral-100 underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]";

function w({className:e}){
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={e} fill="currentColor">
        <path d="M21.35 11.1H12v2.98h5.35c-.24 1.4-1.75 4.1-5.35 4.1a5.95 5.95 0 0 1 0-11.9c1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.68 3.62 14.53 2.7 12 2.7a9.3 9.3 0 1 0 0 18.6c5.25 0 8.73-3.69 8.73-8.88 0-.6-.06-1.05-.14-1.52Z" />
      </svg>
  );
}

let j = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function N(){
  let e=useId(),a=useId(),[r,N]=useState("email"),[y,z]=useState(""),[S,C]=useState(""),[A,W]=useState(false),D="email"===r?y:S,T="email"===r?j.test(y.trim()):S.trim().length>=2,I=A&&D.length>0&&!T;
  return (
    <div className={u("bg-white dark:bg-neutral-950",x,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <header className="flex h-14 shrink-0 items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-2">
            <span className={u("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","size-7",_)}>N</span>
            <span className={u(_,x)}>Northwind</span>
          </div>
          <button type="button" className={u(m,k)}>Create account</button>
        </header>
        <div className="flex flex-1 items-center justify-center px-6 pb-6 sm:px-8">
          <div className="w-full max-w-[420px]">
            <h1 className={u("text-[24px]/[28px] font-[450] tracking-[-0.015em]",x,"text-center")}>Welcome back</h1>
            <p className={u("text-[14px]/[20px] font-normal",b,"mx-auto mt-2 max-w-[340px] text-center")}>
              Sign in to pick up your tasks, timelines, and reviews exactly where you left them.
            </p>
            <div className="mt-7 space-y-2">
              <button type="button" className={u(m,k,"w-full")}>
                <w className="h-4 w-4" />
                Continue with Google
              </button>
              <button type="button" className={u(m,k,"w-full")}>
                <HugeiconsIcon icon={Icon_3367} size={16} strokeWidth={1.8} aria-hidden="true" />
                Continue with GitHub
              </button>
              <button type="button" className={u(m,k,"w-full")}>
                <HugeiconsIcon icon={Icon_9974} size={16} strokeWidth={1.8} aria-hidden="true" />
                Continue with Apple
              </button>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className={u(h,"flex-1")} />
              <span className={u("text-[12px]/[16px] font-normal tabular-nums",b)}>or</span>
              <span className={u(h,"flex-1")} />
            </div>
            <form onSubmit={e=>{
              e.preventDefault(),W(true)
            }} noValidate className="mt-6">
              <div className="flex h-4 items-center justify-between gap-3">
                <label htmlFor={"email"===r?e:a} className="flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{"email"===r?"Work email":"Company domain"}</label>
                <button type="button" onClick={()=>{
                  N(e=>"email"===e?"sso":"email"),W(false)
                }} className="inline-flex min-h-6 items-center gap-1 rounded-[var(--rb-r-sm,6px)] text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 decoration-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]">
                  <HugeiconsIcon icon={Icon_79698} size={14} strokeWidth={1.8} aria-hidden="true" />
                  {"email"===r?"Use single sign-on":"Use email instead"}
                </button>
              </div>
              {"email"===r?<div className={u(f,"h-8","mt-2")}>
                <input id={e} type="email" autoComplete="email" value={y} onChange={e=>z(e.target.value)} placeholder="you@company.com" aria-invalid={I} className={v} />
              </div>:<div className={u(f,"h-8","mt-2")}>
                <input id={a} value={S} onChange={e=>C(e.target.value)} placeholder="northwind" aria-invalid={I} className={v} />
                <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">.northwind.app</span>
              </div>}
              <p className={u(I?"flex items-start gap-2 text-[13px]/[18px] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":"max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-2")}>
                {I&&<HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />}
                {I?"email"===r?"Enter a valid work email address.":"Domains are at least 2 characters.":"email"===r?"We match your email to an existing workspace.":"Your admin set this when the workspace was created."}
              </p>
              <button type="submit" disabled={!T} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",k,"mt-4 w-full")}>
                Continue
                <HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </form>
            <p className={u(p,b,"mt-6 text-center")}>
              By continuing you agree to the
              {" "}
              <button type="button" className={g}>terms of service</button>
              {" "}
              and
              {" "}
              <button type="button" className={g}>privacy policy</button>
              .
            </p>
          </div>
        </div>
        <footer className={u(p,b,"flex h-12 shrink-0 items-center justify-between gap-4 px-6 sm:px-8")}>
          <span>Trouble signing in? Reach the workspace admin.</span>
          <span className={u("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums","text-neutral-900/80 dark:text-neutral-100/80","shrink-0")}>All systems normal</span>
        </footer>
      </div>
  );
}


export default N;
