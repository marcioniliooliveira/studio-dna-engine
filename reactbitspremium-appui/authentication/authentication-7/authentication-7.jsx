/**
 * React Bits Pro — Application UI (authentication-7)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useId, useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_56987 = [["path",{d:"M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 3L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_2301 = [["path",{d:"M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  x = "text-neutral-900 dark:text-neutral-100",
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[14px]/[20px] font-normal",
  p = "text-[12px]/[16px] font-normal tabular-nums",
  _ = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  m = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  k = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  f = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  v = [{label:"At least 10 characters",test:e=>e.length>=10},{label:"One uppercase letter",test:e=>/[A-Z]/.test(e)},{label:"One number",test:e=>/\d/.test(e)},{label:"One symbol",test:e=>/[^A-Za-z0-9]/.test(e)}],
  g = ["Too short","Weak","Fair","Good","Strong"];

function w(){
  let e=useId(),a=useId(),r=useId(),w=useId(),[j,N]=useState(""),[y,z]=useState(""),[S,C]=useState(""),[A,W]=useState(false),[D,T]=useState(false),[I,B]=useState(false),E=useMemo(()=>v.map(e=>e.test(S)), [S]),F=E.filter(Boolean).length,H=f.test(y.trim()),P=j.trim().length>1&&H&&F===v.length&&D;
  return (
    <div className={u("bg-white dark:bg-neutral-950",x,"relative flex h-full min-h-[720px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center">
          <div className={u("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shrink-0 p-6 sm:p-7")}>
            <div className={u("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[var(--rb-r-sm,6px)] select-none","size-9")}>
              <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">N</span>
            </div>
            <h1 className={u("text-[20px]/[24px] font-[450] tracking-[-0.015em]",x,"mt-4")}>Create your account</h1>
            <p className={u(h,b,"mt-1")}>Free for 14 days. No card, no seat minimum.</p>
            <form onSubmit={e=>{
              e.preventDefault(),B(true)
            }} noValidate className="mt-6 space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor={e} className={k}>Full name</label>
                <div className={u(_,"h-8")}>
                  <input id={e} autoComplete="name" value={j} onChange={e=>N(e.target.value)} placeholder="Dana Whitfield" className={m} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={a} className={k}>Work email</label>
                <div className={u(_,"h-8")}>
                  <input id={a} type="email" autoComplete="email" value={y} onChange={e=>z(e.target.value)} placeholder="you@company.com" aria-invalid={I&&!H} className={m} />
                </div>
                <p className={I&&!H?"flex items-start gap-2 text-[13px]/[18px] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":"max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80"}>
                  {I&&!H&&<HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />}
                  {I&&!H?"Enter a valid work email address.":"We use this to match you to an existing workspace."}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={r} className={k}>Password</label>
                <div className={u(_,"h-8")}>
                  <input id={r} type={A?"text":"password"} autoComplete="new-password" value={S} onChange={e=>C(e.target.value)} placeholder="Choose a password" aria-describedby={w} className={m} />
                  <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                    <button type="button" onClick={()=>W(e=>!e)} aria-label={A?"Hide password":"Show password"} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-6 rounded-[var(--rb-r-sm,6px)]")}>
                      <HugeiconsIcon icon={A?Icon_56987:Icon_2301} size={14} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-1 gap-1">
                    {v.map((e,a)=>(
                      <span key={e.label} className={u("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","flex-1")}>
                                        <span className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" style={{width:a<F?"100%":"0%"}} />
                                      </span>
                    ))}
                  </div>
                  <span aria-live="polite" className={u(p,b,"h-4 w-16 shrink-0 text-right")}>{S?g[F]:""}</span>
                </div>
                <ul id={w} className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {v.map((e,a)=>(
                    <li key={e.label} className={u(p,E[a]?x:b,"flex items-start gap-1.5")}>
                                    <HugeiconsIcon icon={E[a]?Icon_90987:Icon_99199} size={14} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                                    {e.label}
                                  </li>
                  ))}
                </ul>
              </div>
              <label className={u("text-[13px]/[18px] font-normal","text-neutral-900/80 dark:text-neutral-100/80","flex cursor-pointer items-start gap-2")}>
                <span className={u("relative inline-flex size-4 shrink-0 items-center justify-center","mt-0.5")}>
                  <input type="checkbox" checked={D} onChange={e=>T(e.target.checked)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                  <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                </span>
                <span>
                  {"I agree to the "}
                  <span className={x}>terms of service</span>
                  {" "}
                  {"and the "}
                  <span className={x}>privacy policy</span>
                  .
                </span>
              </label>
              <button type="submit" disabled={!P} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","w-full")}>Create account</button>
            </form>
          </div>
          <p className={u(h,b,"mt-5 text-center")}>
            Already have an account?
            {" "}
            <button type="button" className="text-neutral-900 dark:text-neutral-100 underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]">Sign in</button>
          </p>
        </div>
      </div>
  );
}


export default w;
