/**
 * React Bits Pro — Application UI (authentication-9)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_56988 = [["path",{d:"M20.4999 16.5V8.5C20.4999 6.14298 20.4999 4.96447 19.7676 4.23223C19.0354 3.5 17.8569 3.5 15.4999 3.5H8.49988C6.14286 3.5 4.96434 3.5 4.23211 4.23223C3.49988 4.96447 3.49988 6.14298 3.49988 8.5V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.9841 20.5H2.01567C1.63273 20.5 1.38367 20.1088 1.55493 19.7764L3.49988 16.5H20.4999L22.4448 19.7764C22.6161 20.1088 22.367 20.5 21.9841 20.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_20320 = [["path",{d:"M13.5 2H10.5C8.14298 2 6.96447 2 6.23223 2.73223C5.5 3.46447 5.5 4.64298 5.5 7V17C5.5 19.357 5.5 20.5355 6.23223 21.2678C6.96447 22 8.14298 22 10.5 22H13.5C15.857 22 17.0355 22 17.7678 21.2678C18.5 20.5355 18.5 19.357 18.5 17V7C18.5 4.64298 18.5 3.46447 17.7678 2.73223C17.0355 2 15.857 2 13.5 2Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.125 19H12M12.25 19C12.25 19.1381 12.1381 19.25 12 19.25C11.8619 19.25 11.75 19.1381 11.75 19C11.75 18.8619 11.8619 18.75 12 18.75C12.1381 18.75 12.25 18.8619 12.25 19Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_73568 = [["path",{d:"M15.5 6V5.5C15.5 4.09554 15.5 3.39331 15.1629 2.88886C15.017 2.67048 14.8295 2.48298 14.6111 2.33706C14.1067 2 13.4045 2 12 2C10.5955 2 9.89331 2 9.38886 2.33706C9.17048 2.48298 8.98298 2.67048 8.83706 2.88886C8.5 3.39331 8.5 4.09554 8.5 5.5V6",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M6.00446 7.11331C5.93719 6.24273 6.63957 5.5 7.53014 5.5H16.4699C17.3604 5.5 18.0628 6.24273 17.9955 7.11331L17.8117 9.49197C17.6796 11.2019 17.1011 12.8498 16.132 14.2773L15.5312 15.1622C14.9638 15.9979 14.0077 16.5 12.9838 16.5H11.0162C9.99228 16.5 9.03617 15.9979 8.46881 15.1622L7.86803 14.2773C6.89885 12.8498 6.32041 11.2019 6.18827 9.49197L6.00446 7.11331Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 17V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M11 8.5H13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_58690 = [["path",{d:"M7.42857 3.36201C11.3996 0.664089 17.136 2.12432 19.2301 6.41803M10.8571 21.9236C15.5839 22.5822 20 18.8952 20 14.2103V10.3333M7.42857 20.6058C5.35602 19.1977 4 16.8583 4 14.2103V9.75757C4 8.57285 4.27144 7.44988 4.75704 6.44444",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16 13.8C16 16.1196 14.2091 18 12 18C9.79086 18 8 16.1196 8 13.8V10.2C8 9.55584 8.13811 8.94555 8.38493 8.4M12 6C14.2091 6 16 7.8804 16 10.2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 10.5L12 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_67812 = [["path",{d:"M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let h = (...e)=>e.filter(Boolean).join(" "),
  p = "text-neutral-900 dark:text-neutral-100",
  _ = "text-neutral-900/80 dark:text-neutral-100/80",
  m = "text-neutral-900/66 dark:text-neutral-100/66",
  k = "border-t border-neutral-900/8 dark:border-neutral-100/8",
  f = "text-[20px]/[24px] font-[450] tracking-[-0.015em]",
  v = "text-[14px]/[20px] font-normal",
  g = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  w = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  j = "transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none",
  N = [{id:"mac",icon:Icon_56988,name:"MacBook Pro",meta:["Touch ID","Used 2 days ago"]},{id:"phone",icon:Icon_20320,name:"Dana's iPhone",meta:["Face ID","Used 3 weeks ago"]},{id:"key",icon:Icon_73568,name:"Security key",meta:["Hardware key","Used in March"]}];

function y(){
  let[e,a]=useState("mac"),[r,s]=useState("idle"),i=useRef(null),o=N.find(a=>a.id===e)??N[0];
  return useEffect(()=>()=>{
    i.current&&clearTimeout(i.current)
  }, []),<div className={h("bg-white dark:bg-neutral-950",p,"relative flex h-full min-h-[640px] w-full flex-col overflow-hidden p-8 sm:p-10")}>
    <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center">
      <div className={h("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shrink-0 p-6 sm:p-7")}>
        <div className="min-h-[424px]">
          {"idle"===r&&<div className={j}>
            <HugeiconsIcon icon={Icon_58690} size={18} strokeWidth={1.8} aria-hidden="true" className={h(_,"block")} />
            <h1 className={h(f,p,"mt-4")}>Sign in with a passkey</h1>
            <p className={h(v,m,"mt-1.5")}>
              Your device confirms it is you. There is nothing to type and nothing to remember.
            </p>
            <fieldset className="mt-5">
              <legend className="sr-only">Choose a passkey</legend>
              <div className="flex flex-col gap-1">
                {N.map(r=>{
                  let n=r.id===e;
                  return (
                    <button key={r.id} type="button" aria-pressed={n} onClick={()=>a(r.id)} className={h("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",n?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","rounded-[var(--rb-r-sm,6px)]","px-3")}>
                                        <span className="flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80"><HugeiconsIcon icon={r.icon} size={16} strokeWidth={1.8} aria-hidden="true" /></span>
                                        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                          <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{r.name}</span></span>
                                          <span data-description className="line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">{r.meta.map((e,a)=><span key={e} className={h(a>0&&"ms-2")}>{e}</span>)}</span>
                                        </span>
                                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />}
                                      </button>
                  );
                })}
              </div>
            </fieldset>
            <button type="button" onClick={()=>{
              s("waiting"),i.current&&clearTimeout(i.current),i.current=setTimeout(()=>s("done"),2200)
            }} className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",w,"mt-4 w-full")}>
              <HugeiconsIcon icon={Icon_58690} size={16} strokeWidth={1.8} aria-hidden="true" />
              {"Continue with "}
              {o.name}
            </button>
            <div className="mt-5 flex items-center gap-3">
              <span className={h(k,"flex-1")} />
              <span className={h("text-[12px]/[16px] font-normal tabular-nums",m)}>Other ways in</span>
              <span className={h(k,"flex-1")} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" className={h(g,w,"w-full")}>
                <HugeiconsIcon icon={Icon_20484} size={16} strokeWidth={1.8} aria-hidden="true" />
                Password
              </button>
              <button type="button" className={h(g,w,"w-full")}>
                <HugeiconsIcon icon={Icon_67812} size={16} strokeWidth={1.8} aria-hidden="true" />
                Email link
              </button>
            </div>
          </div>}
          {"waiting"===r&&<div className={h(j,"flex h-[424px] flex-col items-center justify-center text-center")}>
            <HugeiconsIcon icon={Icon_58690} size={28} strokeWidth={1.8} aria-hidden="true" className={h(_,"shrink-0")} />
            <h1 className={h(f,p,"mt-6")}>
              {"Confirm on "}
              {o.name}
            </h1>
            <p aria-live="polite" className={h(v,m,"mt-1.5 max-w-[280px]")}>Waiting for your device. This request expires in two minutes.</p>
            <button type="button" onClick={()=>{
              i.current&&clearTimeout(i.current),s("idle")
            }} className={h(g,w,"mt-6")}>
              <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
              Cancel request
            </button>
          </div>}
          {"done"===r&&<div className={h(j,"flex h-[424px] flex-col items-center justify-center text-center")}>
            <HugeiconsIcon icon={Icon_90987} size={24} strokeWidth={1.8} aria-hidden="true" className={h(_,"shrink-0")} />
            <h1 className={h(f,p,"mt-5")}>Signed in</h1>
            <p className={h(v,m,"mt-1.5 max-w-[280px]")}>
              {o.name}
              {" confirmed it was you. Taking you to the Northwind workspace."}
            </p>
            <button type="button" onClick={()=>s("idle")} className={h(g,w,"mt-6")}>Use a different passkey</button>
          </div>}
        </div>
      </div>
      <p className={h("text-[13px]/[18px] font-normal",m,"mt-5 text-center")}>Passkeys stay on your device and are never sent to Northwind.</p>
    </div>
  </div>;
}


export default y;
