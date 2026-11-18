/**
 * React Bits Pro — Application UI (authentication-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { l, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_79715 = [["path",{d:"M12 3V6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 18V21",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12L18 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M6 12L3 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M18.3635 5.63672L16.2422 7.75804",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.75804 16.2422L5.63672 18.3635",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M18.3635 18.3635L16.2422 16.2422",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M7.75804 7.75804L5.63672 5.63672",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" ");

let h = "text-neutral-900 dark:text-neutral-100";

let u = "text-neutral-900/62 dark:text-neutral-100/62";

let p = "border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7";

let k = "text-[15px]/[22px] font-medium";

let m = "text-[13px]/[16px] font-semibold tabular-nums";

let v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let f = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let g = "relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40";

let eU = (...e)=>e.filter(Boolean).join(" ");

let eL = "text-neutral-900 dark:text-neutral-100";

let eH = "text-neutral-900/78 dark:text-neutral-100/78";

let eq = "text-neutral-900/62 dark:text-neutral-100/62";

let eV = "text-[22px]/[28px] font-extrabold tracking-[-0.01em]";

let eY = "text-[15px]/[22px] font-medium";

let eG = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let eX = "inline-flex min-h-6 items-center gap-1 rounded-[calc(var(--rb-r-sm,6px))] text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100 underline decoration-[var(--rb-accent,oklch(84%_0.15_165))] decoration-[3px] underline-offset-[5px] transition-[text-decoration-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:decoration-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:decoration-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:decoration-[var(--rb-accent,oklch(81%_0.16_163))]";

let eZ = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let eK = "relative flex w-full min-w-0 cursor-text items-center rounded-[calc(var(--rb-r-xl,12px))] data-concentric:rounded-[var(--rb-r-5xl,22px)] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] text-[15px]/[20px] font-medium text-neutral-900 transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-within:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-within:bg-white focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[[aria-invalid=true]]:bg-[oklch(97.5%_0.016_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:shadow-none dark:text-neutral-100 dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:not-has-[input[readonly]]:bg-neutral-900 dark:focus-within:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-within:bg-neutral-900 dark:focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[[aria-invalid=true]]:bg-[oklch(26%_0.04_26)] dark:has-[input:disabled]:text-neutral-100/40";

let eJ = "max-w-[60ch] text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78";

let eQ = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let e0 = eU("text-[14px]/[20px] font-medium","font-bold text-neutral-900 dark:text-neutral-100 underline decoration-[var(--rb-accent,oklch(84%_0.15_165))] decoration-[3px] underline-offset-[5px] transition-[text-decoration-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:decoration-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:decoration-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:decoration-[var(--rb-accent,oklch(81%_0.16_163))]");


export default function authentication_6__Sorbet__Component(){
  let e=useId(),a=useId(),[r,o]=useState(Array(6).fill("")),[i,c]=useState("idle"),[d,b]=useState(28),[x,h]=useState(false),[u,p]=useState(""),k=useRef([]),m=useRef(null),v=6===r.join("").length;
  useEffect(()=>{
    if(d<=0)return;
    let e=setInterval(()=>b(e=>e>0?e-1:0),1e3);
    return ()=>clearInterval(e);
  }, [d]),useEffect(()=>()=>{
    m.current&&clearTimeout(m.current)
  }, []);
  let f=(e,a)=>{
    o(e),k.current[Math.min(a,5)]?.focus({preventScroll:true}),e.every(Boolean)&&(m.current&&clearTimeout(m.current),c("checking"),m.current=setTimeout(()=>c("done"),1100))
  },g=e=>{
    let a=e.clipboardData.getData("text").replace(/\D/g,"");
    a&&(e.preventDefault(),f(Array(6).fill("").map((e,r)=>a[r]??""),a.length))
  };
  return (
    <div className={eU("bg-white dark:bg-neutral-950",eL,"relative flex h-full min-h-[560px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center">
          <div className={eU("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","shrink-0 p-6 sm:p-7")}>
            {"done"===i?<div className={eU(eQ,"text-center")}>
              <HugeiconsIcon icon={Icon_90987} size={20} strokeWidth={2} aria-hidden="true" className={eU(eH,"mx-auto block")} />
              <h1 className={eU(eV,eL,"mt-4")}>Device verified</h1>
              <p className={eU(eY,eq,"mt-1.5")}>This browser is trusted for 30 days. You will not need a code again until then.</p>
              <div className={eU("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]","rounded-[var(--rb-r-4xl,18px)]","divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7","mt-5 text-left")}>
                {[{label:"Method",value:"Text message"},{label:"Trusted until",value:"9 September 2026"}].map(e=>(
                  <div key={e.label} className={eU("relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16","px-3")}>
                                <span className={eU(eY,eq,"shrink-0")}>{e.label}</span>
                                <span className="flex min-w-0 flex-1 justify-end">
                                  <span className={eU("text-[15px]/[20px] font-bold",eL,"truncate")}>{e.value}</span>
                                </span>
                              </div>
                ))}
              </div>
              <button type="button" className={eU(eG,eZ,"mt-5 w-full")}>Continue to Northwind</button>
              <button type="button" onClick={()=>{
                o(Array(6).fill("")),c("idle"),k.current[0]?.focus({preventScroll:true})
              }} className={eU(eX,"mt-3")}>Verify another device</button>
            </div>:<form onSubmit={e=>{
              e.preventDefault(),"idle"===i&&(c("checking"),m.current&&clearTimeout(m.current),m.current=setTimeout(()=>c("done"),1100))
            }} className={eQ}>
              <HugeiconsIcon icon={Icon_20484} size={18} strokeWidth={2} aria-hidden="true" className={eU(eH,"block")} />
              <h1 className={eU(eV,eL,"mt-4")}>{x?"Enter a recovery code":"Verify it is you"}</h1>
              <p className={eU(eY,eq,"mt-1.5")}>
                {x?"Use one of the eight codes saved when two-factor sign-in was turned on.":"We sent a six-digit code to the phone ending 4417."}
              </p>
              {x?<div className="mt-6 flex flex-col">
                <label htmlFor={a} className="flex w-fit items-center gap-2 text-[15px]/[20px] font-bold text-neutral-900 dark:text-neutral-100">Recovery code</label>
                <div className={eU(eK,"h-10","mt-2")}>
                  <input id={a} value={u} onChange={e=>p(e.target.value.toUpperCase().slice(0,11))} placeholder="XXXXX-XXXXX" className={eU("h-full w-full min-w-0 flex-1 bg-transparent px-3.5 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]","font-mono text-[13px]/[20px] tabular-nums")} />
                </div>
                <p className={eU(eJ,"mt-2")}>Each recovery code works once.</p>
              </div>:<div className="mt-6">
                <div role="group" aria-labelledby={e} className="flex items-center gap-2">
                  <span id={e} className="sr-only">Six-digit verification code</span>
                  {r.map((e,a)=>(
                    <div key={a} className="contents">
                                    {3===a&&<span aria-hidden="true" className={eU("border-t border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","w-3 shrink-0")} />}
                                    <div className={eU(eK,"h-12")}>
                                      <input ref={e=>{
                                        k.current[a]=e
                                      }} inputMode="numeric" autoComplete={0===a?"one-time-code":"off"} maxLength={1} value={e} onChange={e=>{
                                        let t=e.target.value.replace(/\D/g,"");
                                        if(!t)return;
                                        let n=[...r],l=a;
                                        for(let e of t){
                                          if(l>=6)break;
                                          l=e,l+=1
                                        }
                                        f(n,l)
                                      }} onKeyDown={e=>{
                                        if("Backspace"===e.key){
                                          e.preventDefault();
                                          let t=[...r];
                                          t[a]?(t[a]="",o(t)):a>0&&(t[a-1]="",o(t),k.current[a-1]?.focus({preventScroll:true}));
                                          return
                                        }
                                        "ArrowLeft"===e.key&&a>0&&(e.preventDefault(),k.current[a-1]?.focus({preventScroll:true})),"ArrowRight"===e.key&&a<5&&(e.preventDefault(),k.current[a+1]?.focus({preventScroll:true}))
                                      }} onPaste={g} aria-label={`Digit ${a+1}`} disabled={"checking"===i} className={eU("h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:font-medium placeholder:text-neutral-900/55 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/30 dark:placeholder:text-neutral-100/55 dark:disabled:placeholder:text-neutral-100/30 dark:[color-scheme:dark]","text-[17px]/[22px] font-extrabold","text-center")} />
                                    </div>
                                  </div>
                  ))}
                </div>
                <p aria-live="polite" className={eU(eJ,"mt-2")}>
                  {"checking"===i?"Checking your code":"Paste the whole code and it fills every box."}
                </p>
              </div>}
              <button type="submit" disabled={"checking"===i||(x?u.length<11:!v)} className={eU(eG,eZ,"mt-5 w-full")}>
                {"checking"===i&&<HugeiconsIcon icon={Icon_79715} size={18} strokeWidth={2} aria-hidden="true" className="animate-spin [animation-duration:700ms] motion-reduce:animate-none" />}
                {"checking"===i?"Verifying":"Verify and continue"}
              </button>
              <div className="mt-4 flex items-center justify-between gap-3">
                <button type="button" onClick={()=>b(28)} disabled={d>0||x} className={eU("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",eZ)}>
                  {d>0?<span className="tabular-nums">
                    {"Resend in "}
                    {`${Math.floor(d/60)}:${String(d%60).padStart(2,"0")}`}
                  </span>:"Resend code"}
                </button>
                <button type="button" onClick={()=>h(e=>!e)} className={eU(e0,"inline-flex min-h-6 items-center whitespace-nowrap")}>{x?"Use the texted code":"Use a recovery code"}</button>
              </div>
            </form>}
          </div>
          <button type="button" className={eU(eX,"mx-auto mt-5")}>
            <HugeiconsIcon icon={Icon_18976} size={18} strokeWidth={2} aria-hidden="true" />
            Back to sign in
          </button>
        </div>
      </div>
  );
}
