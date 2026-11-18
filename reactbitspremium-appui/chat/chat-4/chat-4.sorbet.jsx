/**
 * React Bits Pro — Application UI (chat-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { ResizeObserver, disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_48094 = [["path",{d:"M5.82338 12L4.27922 10.4558C2.57359 8.75022 2.57359 5.98485 4.27922 4.27922C5.98485 2.57359 8.75022 2.57359 10.4558 4.27922L19.7208 13.5442C21.4264 15.2498 21.4264 18.0152 19.7208 19.7208C18.0152 21.4264 15.2498 21.4264 13.5442 19.7208L10.0698 16.2464C9.00379 15.1804 9.00379 13.4521 10.0698 12.386C11.1358 11.32 12.8642 11.32 13.9302 12.386L15.8604 14.3162",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_47744 = [["path",{d:"M2 12.5C2 11.3954 2.89543 10.5 4 10.5C5.65685 10.5 7 11.8431 7 13.5V17.5C7 19.1569 5.65685 20.5 4 20.5C2.89543 20.5 2 19.6046 2 18.5V12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.4787 7.80626L15.2124 8.66634C14.9942 9.37111 14.8851 9.72349 14.969 10.0018C15.0369 10.2269 15.1859 10.421 15.389 10.5487C15.64 10.7065 16.0197 10.7065 16.7791 10.7065H17.1831C19.7532 10.7065 21.0382 10.7065 21.6452 11.4673C21.7145 11.5542 21.7762 11.6467 21.8296 11.7437C22.2965 12.5921 21.7657 13.7351 20.704 16.0211C19.7297 18.1189 19.2425 19.1678 18.338 19.7852C18.2505 19.8449 18.1605 19.9013 18.0683 19.9541C17.116 20.5 15.9362 20.5 13.5764 20.5H13.0646C10.2057 20.5 8.77628 20.5 7.88814 19.6395C7 18.7789 7 17.3939 7 14.6239V13.6503C7 12.1946 7 11.4668 7.25834 10.8006C7.51668 10.1344 8.01135 9.58664 9.00069 8.49112L13.0921 3.96056C13.1947 3.84694 13.246 3.79012 13.2913 3.75075C13.7135 3.38328 14.3652 3.42464 14.7344 3.84235C14.774 3.8871 14.8172 3.94991 14.9036 4.07554C15.0388 4.27205 15.1064 4.37031 15.1654 4.46765C15.6928 5.33913 15.8524 6.37436 15.6108 7.35715C15.5838 7.46692 15.5488 7.5801 15.4787 7.80626Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31581 = [["path",{d:"M2 11.5C2 12.6046 2.89543 13.5 4 13.5C5.65685 13.5 7 12.1569 7 10.5V6.5C7 4.84315 5.65685 3.5 4 3.5C2.89543 3.5 2 4.39543 2 5.5V11.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.4787 16.1937L15.2124 15.3337C14.9942 14.6289 14.8851 14.2765 14.969 13.9982C15.0369 13.7731 15.1859 13.579 15.389 13.4513C15.64 13.2935 16.0197 13.2935 16.7791 13.2935H17.1831C19.7532 13.2935 21.0382 13.2935 21.6452 12.5327C21.7145 12.4458 21.7762 12.3533 21.8296 12.2563C22.2965 11.4079 21.7657 10.2649 20.704 7.9789C19.7297 5.88111 19.2425 4.83222 18.338 4.21485C18.2505 4.15508 18.1605 4.0987 18.0683 4.04586C17.116 3.5 15.9362 3.5 13.5764 3.5H13.0646C10.2057 3.5 8.77628 3.5 7.88814 4.36053C7 5.22106 7 6.60607 7 9.37607V10.3497C7 11.8054 7 12.5332 7.25834 13.1994C7.51668 13.8656 8.01135 14.4134 9.00069 15.5089L13.0921 20.0394C13.1947 20.1531 13.246 20.2099 13.2913 20.2493C13.7135 20.6167 14.3652 20.5754 14.7344 20.1577C14.774 20.1129 14.8172 20.0501 14.9036 19.9245C15.0388 19.728 15.1064 19.6297 15.1654 19.5323C15.6928 18.6609 15.8524 17.6256 15.6108 16.6429C15.5838 16.5331 15.5488 16.4199 15.4787 16.1937Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_12556 = [["path",{d:"M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let eb = (...e)=>e.filter(Boolean).join(" ");

let ep = "text-neutral-900/62 dark:text-neutral-100/62";

let eh = "text-[15px]/[20px] font-bold";

let eu = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let em = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let ek = eb("text-[14px]/[20px] font-medium",ep);

let ev = eb("text-[13px]/[16px] font-semibold tabular-nums",ep);

let ef = [{id:"t1",from:"agent",name:"Halcyon Support",text:"Hi Cedar Labs. I can see invoice INV-20418 failed twice this week. Want me to walk through it?",at:"10:02"},{id:"t2",from:"user",name:"You",text:"Yes. Our card is fine, so I do not understand why it keeps declining.",at:"10:03"},{id:"t3",from:"agent",name:"Halcyon Support",text:"The issuer returned do_not_honor on the second attempt, which usually means a block on repeat charges inside 72 hours rather than a funding problem.",at:"10:05"},{id:"t4",from:"agent",name:"Halcyon Support",text:"I have queued a retry for tomorrow morning and attached the decline log so your bank can lift the block.",at:"10:05",attachment:"decline-log-INV-20418.pdf"}];

let eg = ["Change the card on file","Send the log to my bank","Pause retries for now"];


export default function chat_4__Sorbet__Component(){
  let[e,a]=useState(""),[r,i]=useState(null),{ref:o,edges:s,onScroll:c}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=a;
      r({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }();
  return useEffect(()=>{
    let e=o.current;
    if(!e)return;
    let a=true,r=()=>{
      a&&(e.scrollTop=e.scrollHeight)
    },t=()=>{
      a=e.scrollHeight-e.scrollTop-e.clientHeight<24
    };
    r(),e.addEventListener("scroll",t,{passive:true});
    let n=e.ownerDocument.defaultView,l=ResizeObserver?new ResizeObserver(r):null;
    for(let a of Array.from(e.children))l?.observe(a);
    return ()=>{
      e.removeEventListener("scroll",t),l?.disconnect()
    };
  }, [o]),<div className={eb("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[640px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
    <div className={eb("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","h-full max-h-[560px] w-full max-w-[400px] gap-1")}>
      <div className={eb("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","justify-between gap-3 py-3")}>
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden className={eb("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] select-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black)]","size-8","text-[13px]/[16px] font-bold tabular-nums")}>HS</span>
          <div className="min-w-0">
            <p className={eb(eh,"truncate")}>Halcyon Support</p>
            <p className={eb(ek,"mt-0.5 flex items-center gap-1.5")}>Replies in about 2 minutes</p>
          </div>
        </div>
        <button type="button" aria-label="Minimize chat" className={eb(eu,"size-10 rounded-[calc(var(--rb-r-full,999px))]")}>
          <HugeiconsIcon icon={Icon_20148} size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
      <div className={eb("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative min-h-0 flex-1")}>
        <div ref={o} onScroll={c} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3 [overflow-anchor:none]">
          <p className={eb(ev,"text-center")}>Conversation started 10:02</p>
          {ef.map((e,a)=>(
            <div key={e.id} className={eb("flex","user"===e.from?"justify-end":"justify-start")}>
                        <div className="max-w-[85%]">
                          <div className={"user"===e.from?"w-fit max-w-full rounded-[calc(var(--rb-r-6xl,26px))] rounded-br-[var(--rb-r-xs,4px)] border border-transparent bg-[var(--rb-accent,oklch(84%_0.15_165))] px-4 py-2.5 text-[15px]/[22px] font-medium whitespace-pre-wrap text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_2px_6px_-3px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,transparent)] [overflow-wrap:anywhere] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-none":"flex min-w-0 flex-col gap-4 text-[15px]/[24px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]"}><p>{e.text}</p></div>
                          {e.attachment&&<div className={eb("relative flex h-12 w-fit max-w-full min-w-52 shrink-0 items-center overflow-hidden rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-white pe-3 text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] has-[[data-actions]]:pe-1.5 dark:bg-neutral-800","mt-2")}>
                            <span className="flex size-12 shrink-0 items-center justify-center self-stretch border-r border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-100/6">
                              <HugeiconsIcon icon={Icon_48094} size={18} strokeWidth={2} aria-hidden="true" />
                            </span>
                            <span className="flex min-w-0 flex-1 flex-col gap-0.5 px-3"><span className={eb(eh,"truncate")}>{e.attachment}</span></span>
                          </div>}
                          <p className={eb(ev,"mt-1 flex gap-x-2","user"===e.from&&"justify-end",ef[a+1]?.from===e.from&&"sr-only")}>
                            <span>{e.name}</span>
                            <span>{e.at}</span>
                          </p>
                        </div>
                      </div>
          ))}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {eg.map(e=><button key={e} type="button" className="relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40">{e}</button>)}
          </div>
          <div className="flex items-center gap-2 pt-1">
            <p className={ek}>Was this helpful?</p>
            {[{key:"up",icon:Icon_47744,label:"Helpful"},{key:"down",icon:Icon_31581,label:"Not helpful"}].map(({key:e,icon:a,label:n})=><button key={e} type="button" aria-label={n} aria-pressed={r===e} onClick={()=>i(r===e?null:e)} className={eb(eu,em)}><HugeiconsIcon icon={a} size={18} strokeWidth={2} aria-hidden="true" /></button>)}
          </div>
        </div>
        <div aria-hidden="true" className={eb("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",s.start?"opacity-100":"opacity-0")} />
        <div aria-hidden="true" className={eb("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",s.end?"opacity-100":"opacity-0")} />
      </div>
      <div className="shrink-0 px-1">
        <form onSubmit={e=>{
          e.preventDefault(),a("")
        }} className="relative flex w-full min-w-0 flex-col rounded-[calc(min(var(--rb-r-6xl,26px),min(var(--rb-r-full,999px),16px)_+_8px))] border border-transparent bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] transition-[box-shadow] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:shadow-[0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent),0_8px_22px_-10px_rgb(84_62_32/0.2)] dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] dark:focus-within:shadow-[0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163)),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]">
          <div className="flex min-w-0 items-end gap-1 p-2">
            <label htmlFor="chat-4-composer" className="sr-only">Message support</label>
            <input id="chat-4-composer" value={e} onChange={e=>a(e.target.value)} placeholder="Type your reply" className="max-h-40 min-h-6 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1.5 field-sizing-content text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/55 dark:placeholder:text-neutral-100/55" />
            <button type="button" aria-label="Attach file" className={eb(eu,em)}>
              <HugeiconsIcon icon={Icon_48094} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button type="submit" aria-label="Send message" disabled={!e.trim()} className={eb("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",em)}>
              <HugeiconsIcon icon={Icon_55410} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
      <p className={eb(ek,"flex items-center justify-center gap-1.5 py-1")}>
        <HugeiconsIcon icon={Icon_12556} size={14} strokeWidth={2} aria-hidden="true" />
        Rated 4.8 by 2,140 customers this month
      </p>
    </div>
  </div>;
}
