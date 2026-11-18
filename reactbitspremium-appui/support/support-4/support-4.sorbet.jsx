/**
 * React Bits Pro — Application UI (support-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_34951 = [["path",{d:"M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"12",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_27151 = [["path",{d:"M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let ex = (...e)=>e.filter(Boolean).join(" ");

let eb = "text-neutral-900/78 dark:text-neutral-100/78";

let ep = "text-neutral-900/62 dark:text-neutral-100/62";

let eu = "text-[14px]/[20px] font-medium";

let eh = "text-[13px]/[16px] font-semibold tabular-nums";

let ek = "rounded-[var(--rb-r-4xl,18px)]";

let em = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let ev = [{id:"t1",from:"bot",body:"Hi Priya. I can look things up in your workspace and in the docs. What are you running into?"},{id:"t2",from:"user",body:"Our Monday export came through with no rows in it."},{id:"t3",from:"bot",body:"Run 1104 finished at 06:00 and returned 0 rows. The saved view it uses was edited on Sunday at 17:41 and its date range is now a single day, which is the usual cause.",sources:["Why an export can succeed with zero rows","Editing a saved view used by a schedule"]}];

let ef = ["Restore the previous date range","Re-run the export now","Talk to a person"];


export default function support_4__Sorbet__Component(){
  let[e,r]=useState(""),[a,l]=useState(false),{ref:i,edges:s,onScroll:c}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:o,clientHeight:n}=r;
      a({start:t>1,end:Math.ceil(t+n)<o-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let o=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }();
  return useEffect(()=>{
    let e=i.current;
    e&&a&&(e.scrollTop=e.scrollHeight)
  }, [a,i]),<div className={ex("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
    <div className={ex("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","h-full max-h-[560px] w-full max-w-[420px]")}>
      <div className={ex("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","py-2")}>
        {a?<span aria-hidden="true" className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
          <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]"><HugeiconsIcon icon={Icon_34951} size={18} strokeWidth={2} /></span>
        </span>:<span aria-hidden="true" className="relative inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] select-none bg-[oklch(93%_0.06_220)] text-[oklch(38%_0.11_220)] dark:bg-[oklch(32%_0.07_220)] dark:text-[oklch(88%_0.08_220)]"><HugeiconsIcon icon={Icon_27151} size={18} strokeWidth={2} /></span>}
        <div className="min-w-0 flex-1">
          <p className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">{a?"Sofia Alvarez":"Northwind Assistant"}</p>
          <p className={ex(eh,ep,"flex min-w-0 gap-2")}>
            {a?<>
              <span className="shrink-0">Support</span>
              <span className="truncate">Typically replies in a few minutes</span>
            </>:<span className="truncate">Answers from your workspace and the docs</span>}
          </p>
        </div>
        <button type="button" aria-label="Close chat" className={ex("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40",em)}>
          <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
      <div className={ex("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","min-h-0 flex-1")}>
        <div className="relative min-h-0 flex-1">
          <div ref={i} onScroll={c} className="h-full space-y-3 overflow-y-auto p-3">
            {ev.map(e=>"user"===e.from?<div key={e.id} className="ms-auto flex max-w-[80%] justify-end">
              <p className="w-fit max-w-full rounded-[calc(var(--rb-r-6xl,26px))] rounded-br-[var(--rb-r-xs,4px)] border border-transparent bg-[var(--rb-accent,oklch(84%_0.15_165))] px-4 py-2.5 text-[15px]/[22px] font-medium whitespace-pre-wrap text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_2px_6px_-3px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,transparent)] [overflow-wrap:anywhere] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-none">{e.body}</p>
            </div>:<div key={e.id} className="max-w-[88%]">
              <p className="flex min-w-0 flex-col gap-4 text-[15px]/[24px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{e.body}</p>
              {e.sources&&<ul className="-mx-2 mt-1.5 space-y-1">
                {e.sources.map(e=>(
                  <li key={e}>
                                    <button type="button" className={ex("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]","cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10",ek,"focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","px-2")}>
                                      <HugeiconsIcon icon={Icon_31964} size={14} strokeWidth={2} aria-hidden="true" className={ex(ep,"shrink-0")} />
                                      <span className={ex(eu,eb,"block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]","flex-1")}>{e}</span>
                                    </button>
                                  </li>
                ))}
              </ul>}
            </div>)}
            {a&&<div className={ex("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]",ek,"px-3 py-2.5")}>
              <p className={ex(eu,eb)}>
                Sofia has joined and can see everything above. Ticket #4192 was created from this conversation.
              </p>
            </div>}
          </div>
          <div aria-hidden="true" className={ex("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",s.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={ex("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",s.end?"opacity-100":"opacity-0")} />
        </div>
        {!a&&<div className="flex flex-wrap gap-1.5 px-3 pb-3">
          {ef.map(e=>(
            <button key={e} type="button" onClick={()=>"Talk to a person"===e&&l(true)} className="relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40">
                        {e}
                        {"Talk to a person"===e&&<HugeiconsIcon icon={Icon_55299} size={14} strokeWidth={2} aria-hidden="true" />}
                      </button>
          ))}
        </div>}
      </div>
      <div className="mt-1 shrink-0 px-1 pb-1">
        <div className={ex("relative flex w-full min-w-0 flex-col rounded-[calc(min(var(--rb-r-6xl,26px),min(var(--rb-r-full,999px),16px)_+_8px))] border border-transparent bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] transition-[box-shadow] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:shadow-[0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent),0_8px_22px_-10px_rgb(84_62_32/0.2)] dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] dark:focus-within:shadow-[0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163)),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","rounded-[var(--rb-r-5xl,22px)]")}>
          <label htmlFor="support-4-message" className="sr-only">Message</label>
          <div className="flex min-w-0 items-end gap-1 p-2">
            <textarea id="support-4-message" value={e} onChange={e=>r(e.target.value)} rows={2} placeholder={a?"Message Sofia":"Ask about your workspace"} className={ex("max-h-40 min-h-6 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1.5 field-sizing-content text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/55 dark:placeholder:text-neutral-100/55","field-sizing-content min-h-12")} />
          </div>
          <div className="flex items-center justify-between gap-2 px-2 pb-2">
            <span className={ex(eh,ep,"ps-1.5")}>{a?"Replies land in your email too":"AI answers, checked against your data"}</span>
            <button type="button" aria-label="Send message" disabled={0===e.trim().length} className={ex("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",em)}>
              <HugeiconsIcon icon={Icon_55410} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
