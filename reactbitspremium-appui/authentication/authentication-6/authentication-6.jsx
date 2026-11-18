/**
 * React Bits Pro — Application UI (authentication-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { l, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_79715 = [["path",{d:"M12 3V6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 18V21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12L18 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L3 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M18.3635 5.63672L16.2422 7.75804",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.75804 16.2422L5.63672 18.3635",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M18.3635 18.3635L16.2422 16.2422",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M7.75804 7.75804L5.63672 5.63672",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900 dark:text-neutral-100",
  x = "text-neutral-900/80 dark:text-neutral-100/80",
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  h = "text-[20px]/[24px] font-[450] tracking-[-0.015em]",
  p = "text-[14px]/[20px] font-normal",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  m = "inline-flex min-h-6 items-center gap-1 rounded-[var(--rb-r-sm,6px)] text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 decoration-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  k = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  f = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  v = "max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  g = "transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none",
  w = c("text-[13px]/[18px] font-normal","text-neutral-900 dark:text-neutral-100 underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]");

function j(){
  let e=useId(),a=useId(),[r,j]=useState(Array(6).fill("")),[N,y]=useState("idle"),[z,S]=useState(28),[C,A]=useState(false),[W,D]=useState(""),T=useRef([]),I=useRef(null),B=6===r.join("").length;
  useEffect(()=>{
    if(z<=0)return;
    let e=setInterval(()=>S(e=>e>0?e-1:0),1e3);
    return ()=>clearInterval(e);
  }, [z]),useEffect(()=>()=>{
    I.current&&clearTimeout(I.current)
  }, []);
  let E=(e,a)=>{
    j(e),T.current[Math.min(a,5)]?.focus({preventScroll:true}),e.every(Boolean)&&(I.current&&clearTimeout(I.current),y("checking"),I.current=setTimeout(()=>y("done"),1100))
  },F=e=>{
    let a=e.clipboardData.getData("text").replace(/\D/g,"");
    a&&(e.preventDefault(),E(Array(6).fill("").map((e,r)=>a[r]??""),a.length))
  };
  return (
    <div className={c("bg-white dark:bg-neutral-950",u,"relative flex h-full min-h-[560px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center">
          <div className={c("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shrink-0 p-6 sm:p-7")}>
            {"done"===N?<div className={c(g,"text-center")}>
              <HugeiconsIcon icon={Icon_90987} size={20} strokeWidth={1.8} aria-hidden="true" className={c(x,"mx-auto block")} />
              <h1 className={c(h,u,"mt-4")}>Device verified</h1>
              <p className={c(p,b,"mt-1.5")}>This browser is trusted for 30 days. You will not need a code again until then.</p>
              <div className={c("bg-neutral-900/5 dark:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-5 text-left")}>
                {[{label:"Method",value:"Text message"},{label:"Trusted until",value:"9 September 2026"}].map(e=>(
                  <div key={e.label} className={c("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","px-3")}>
                                <span className={c(p,b,"shrink-0")}>{e.label}</span>
                                <span className="flex min-w-0 flex-1 justify-end">
                                  <span className={c("text-[14px]/[16px] font-[450]",u,"truncate")}>{e.value}</span>
                                </span>
                              </div>
                ))}
              </div>
              <button type="button" className={c(_,k,"mt-5 w-full")}>Continue to Northwind</button>
              <button type="button" onClick={()=>{
                j(Array(6).fill("")),y("idle"),T.current[0]?.focus({preventScroll:true})
              }} className={c(m,"mt-3")}>Verify another device</button>
            </div>:<form onSubmit={e=>{
              e.preventDefault(),"idle"===N&&(y("checking"),I.current&&clearTimeout(I.current),I.current=setTimeout(()=>y("done"),1100))
            }} className={g}>
              <HugeiconsIcon icon={Icon_20484} size={18} strokeWidth={1.8} aria-hidden="true" className={c(x,"block")} />
              <h1 className={c(h,u,"mt-4")}>{C?"Enter a recovery code":"Verify it is you"}</h1>
              <p className={c(p,b,"mt-1.5")}>
                {C?"Use one of the eight codes saved when two-factor sign-in was turned on.":"We sent a six-digit code to the phone ending 4417."}
              </p>
              {C?<div className="mt-6 flex flex-col">
                <label htmlFor={a} className="flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Recovery code</label>
                <div className={c(f,"h-8","mt-2")}>
                  <input id={a} value={W} onChange={e=>D(e.target.value.toUpperCase().slice(0,11))} placeholder="XXXXX-XXXXX" className={c("h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]","font-mono text-[13px]/[20px] tabular-nums")} />
                </div>
                <p className={c(v,"mt-2")}>Each recovery code works once.</p>
              </div>:<div className="mt-6">
                <div role="group" aria-labelledby={e} className="flex items-center gap-2">
                  <span id={e} className="sr-only">Six-digit verification code</span>
                  {r.map((e,a)=>(
                    <div key={a} className="contents">
                                    {3===a&&<span aria-hidden="true" className={c("border-t border-neutral-900/8 dark:border-neutral-100/8","w-3 shrink-0")} />}
                                    <div className={c(f,"h-11")}>
                                      <input ref={e=>{
                                        T.current[a]=e
                                      }} inputMode="numeric" autoComplete={0===a?"one-time-code":"off"} maxLength={1} value={e} onChange={e=>{
                                        let t=e.target.value.replace(/\D/g,"");
                                        if(!t)return;
                                        let n=[...r],l=a;
                                        for(let e of t){
                                          if(l>=6)break;
                                          l=e,l+=1
                                        }
                                        E(n,l)
                                      }} onKeyDown={e=>{
                                        if("Backspace"===e.key){
                                          e.preventDefault();
                                          let t=[...r];
                                          t[a]?(t[a]="",j(t)):a>0&&(t[a-1]="",j(t),T.current[a-1]?.focus({preventScroll:true}));
                                          return
                                        }
                                        "ArrowLeft"===e.key&&a>0&&(e.preventDefault(),T.current[a-1]?.focus({preventScroll:true})),"ArrowRight"===e.key&&a<5&&(e.preventDefault(),T.current[a+1]?.focus({preventScroll:true}))
                                      }} onPaste={F} aria-label={`Digit ${a+1}`} disabled={"checking"===N} className={c("h-full w-full min-w-0 flex-1 bg-transparent px-2 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]","text-[16px]/[20px] font-[450] tracking-[-0.015em]","text-center")} />
                                    </div>
                                  </div>
                  ))}
                </div>
                <p aria-live="polite" className={c(v,"mt-2")}>
                  {"checking"===N?"Checking your code":"Paste the whole code and it fills every box."}
                </p>
              </div>}
              <button type="submit" disabled={"checking"===N||(C?W.length<11:!B)} className={c(_,k,"mt-5 w-full")}>
                {"checking"===N&&<HugeiconsIcon icon={Icon_79715} size={16} strokeWidth={1.8} aria-hidden="true" className="animate-spin [animation-duration:800ms] motion-reduce:animate-none" />}
                {"checking"===N?"Verifying":"Verify and continue"}
              </button>
              <div className="mt-4 flex items-center justify-between gap-3">
                <button type="button" onClick={()=>S(28)} disabled={z>0||C} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",k)}>
                  {z>0?<span className="tabular-nums">
                    {"Resend in "}
                    {`${Math.floor(z/60)}:${String(z%60).padStart(2,"0")}`}
                  </span>:"Resend code"}
                </button>
                <button type="button" onClick={()=>A(e=>!e)} className={c(w,"inline-flex min-h-6 items-center whitespace-nowrap")}>{C?"Use the texted code":"Use a recovery code"}</button>
              </div>
            </form>}
          </div>
          <button type="button" className={c(m,"mx-auto mt-5")}>
            <HugeiconsIcon icon={Icon_18976} size={16} strokeWidth={1.8} aria-hidden="true" />
            Back to sign in
          </button>
        </div>
      </div>
  );
}


export default j;
