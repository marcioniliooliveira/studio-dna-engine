/**
 * React Bits Pro — Application UI (ai-chat-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';

const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_29719 = [["path",{d:"M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_54345 = [["path",{d:"M12 18.502V5.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let p = (...e)=>e.filter(Boolean).join(" ");

let h = "text-neutral-900/62 dark:text-neutral-100/62";

let m = "text-[14px]/[20px] font-medium";

let k = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let f = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let g = "shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90";

let w = "flex size-[18px] shrink-0 items-center justify-center";

let y = p(m,h);

let j = "By plan, Growth accounted for $5,180 of the refunds and Scale for $3,240, with Starter under $900. The renewal failures cluster on Growth annual plans billed on the 12th, so retrying those cards a day later would recover most of the amount.";

let N = [{id:"u1",role:"user",text:"Why did refunds spike last week?"},{id:"a1",role:"assistant",reasoning:"The refund total moved with two things last week: a pricing change that shipped on the 12th, and a batch of failed renewals that were auto-refunded. I checked both before answering.",tool:{name:"Searched 1,284 refunds",result:"reason              count     amount\nRenewal failed         84    $6,240\nDowngrade credit       31    $1,905\nDuplicate charge        9      $612\nCustomer request        7      $438",duration:"1.2s",done:true},text:"Refunds rose 38% week over week, from $6,730 to $9,290. Almost all of the increase came from failed renewals after the card-retry window was shortened on the 12th. Downgrade credits were flat, and duplicate charges stayed in the single digits.",sources:[{id:"1",title:"Billing events"},{id:"2",title:"Pricing change, Jun 12"}]},{id:"u2",role:"user",text:"Break it down by plan tier."},{id:"a2",role:"assistant",text:j}];

function z({text:e}){
  let[r,a]=useState(false);
  return (
    <div className="flex flex-col">
        <button type="button" onClick={()=>a(e=>!e)} aria-expanded={r} className="group -mx-2 flex min-h-9 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[calc(var(--rb-r-lg,10px))] px-2 text-left text-[14px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:hover:bg-neutral-100/6 dark:active:bg-neutral-100/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]">
          <span className={w}>
            <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className={g} />
          </span>
          <span>
            {"Thought for "}
            <span className="tabular-nums">4s</span>
          </span>
        </button>
        {r&&<p className={p(m,"text-neutral-900/78 dark:text-neutral-100/78","mt-2 max-w-prose")}>{e}</p>}
      </div>
  );
}

function S({tool:e}){
  let[r,a]=useState(false);
  return (
    <div>
        <button type="button" onClick={()=>a(e=>!e)} aria-expanded={r} className={p("group -mx-2 flex min-h-9 max-w-[calc(100%+16px)] min-w-0 cursor-pointer items-center gap-2 self-start rounded-[calc(var(--rb-r-lg,10px))] px-2 text-left text-[14px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:hover:bg-neutral-100/6 dark:active:bg-neutral-100/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","w-[calc(100%+16px)]")}>
          <span className={w}>
            <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className={g} />
          </span>
          <span className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78">{e.name}</span>
          <span className={p(h,"min-w-14")}>{e.done?"Done":"Running"}</span>
          <span className="ms-auto flex shrink-0 items-center gap-2 whitespace-nowrap tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e.duration}</span>
        </button>
        {r&&<div className={p("flex min-w-0 flex-col gap-3 rounded-[calc(var(--rb-r-xl,12px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 py-2.5","mt-2 max-h-40 overflow-y-auto")}>
          <pre className="min-w-0 overflow-x-auto font-mono text-[12px]/[18px] whitespace-pre-wrap text-neutral-900/78 dark:text-neutral-100/78 [overflow-wrap:anywhere]">{e.result}</pre>
        </div>}
      </div>
  );
}

function C({sources:e}){
  return (
    <div className="flex flex-wrap items-center gap-1.5">
        <span className={p("text-[13px]/[16px] font-semibold tabular-nums",h)}>Sources</span>
        {e.map(e=><span key={e.id} className={p("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12","h-6")}>{e.title}</span>)}
      </div>
  );
}

let I = (...e)=>e.filter(Boolean).join(" ");

let M = "text-neutral-900/78 dark:text-neutral-100/78";

let D = "text-neutral-900/62 dark:text-neutral-100/62";

let H = "text-[17px]/[22px] font-extrabold";

let T = "font-mono text-[12px]/[16px] tabular-nums";

let L = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let W = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let O = "size-7 rounded-[calc(var(--rb-r-full,999px))]";

let $ = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let q = "inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1";

let F = "relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[calc(var(--rb-r-full,999px))] px-3 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/78 dark:text-neutral-100/78 select-none transition-[background-color,color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.96] motion-reduce:active:scale-100 hover:not-aria-checked:text-neutral-900 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:not-aria-checked:text-neutral-100 dark:aria-checked:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_0_0_1px_rgb(0_0_0/0.6),0_2px_5px_-1px_rgb(0_0_0/0.6)] dark:disabled:text-neutral-100/40";

let P = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

let K = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950";

function B(){
  let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
    let r=e.current;
    if(!r)return;
    let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
    a({start:t>1,end:Math.ceil(t+l)<n-1})
  }, []);
  return useEffect(()=>{
    t();
    let r=e.current,a=r?.ownerDocument.defaultView;
    if(!r||!a?.ResizeObserver)return;
    let n=new a.ResizeObserver(t);
    return observe(r),()=>disconnect();
  }, [t]),{ref:e,edges:r,onScroll:t};
}

let Y = `type Plan = {
  name: string
  price: string
  period: string
  cta: string
}

export function PricingTable({
  plans,
}: {
  plans: Plan[]
}) {
  return (
    <div className="grid gap-4">
      {plans.map((plan) => (
        <article key={plan.name}>
          <h3>{plan.name}</h3>
          <p>{plan.price}</p>
          <span>{plan.period}</span>
          <button>{plan.cta}</button>
        </article>
      ))}
    </div>
  )
}`;

let V = ["Three tiers, billed monthly or annually. Annual saves two months.","Starter covers a single project and one editor seat.","Growth adds unlimited projects, five seats, and priority review.","Scale adds SSO, audit logs, and a named contact.","Every tier includes the component library and future updates."];

let J = ["v3","v2","v1"];

let G = "I marked Growth as the recommended plan without leaning on colour: it now carries a small “Recommended” label, a slightly heavier border, and a touch more vertical padding so it reads as primary.";

let Q = [{id:"u1",role:"user",text:"Build a three-tier pricing table component for the marketing site."},{id:"a1",role:"assistant",text:"Here is a responsive pricing table with Starter, Growth, and Scale. It maps over a plans array so you can edit copy without touching markup.",file:"pricing-table.tsx"},{id:"u2",role:"user",text:"Add a short plan description under each price."},{id:"a2",role:"assistant",text:"Done. I added a description line beneath each price and wrote the copy for all three tiers. This is version 3, so compare it against the earlier versions from the panel."},{id:"u3",role:"user",text:"Can you make the middle plan stand out?"},{id:"a3",role:"assistant",text:G}];

let es = (...e)=>e.filter(Boolean).join(" ");

let ec = "text-neutral-900/62 dark:text-neutral-100/62";

let e_ = "text-[15px]/[20px] font-bold";

let ed = "text-[13px]/[16px] font-semibold tabular-nums";

let ex = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let eb = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let eu = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900/78 dark:text-neutral-100/78 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] hover:not-disabled:text-neutral-900 active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:hover:not-disabled:bg-neutral-100/8 dark:hover:not-disabled:text-neutral-100 dark:active:not-disabled:bg-neutral-100/12 dark:aria-expanded:bg-neutral-100/8 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40";

let ep = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let eh = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let em = [{name:"Atlas",hint:"Balanced, fast"},{name:"Atlas Pro",hint:"Deep reasoning"},{name:"Quill",hint:"Lowest latency"}];

let ek = e=>e>=1e3?`${(e/1e3).toFixed(+(e%1e3!=0))}k`:`${e}`;

let ev = "Onboarding completion reached 71% this quarter, up eight points, driven by a faster setup step; the invite step is the next place to improve.";

let ef = [{id:"u1",role:"user",text:"Compare our onboarding completion rate to last quarter."},{id:"a1",role:"assistant",text:"Completion rose to 71%, up from 63% last quarter. The largest gain came from the shortened setup step, which cut median time to first project from nine minutes to five."},{id:"u2",role:"user",text:"Where do people still drop off?"},{id:"a2",role:"assistant",text:"The biggest remaining drop is at the invite-teammates step, where 22% leave without adding anyone. Making that step optional would likely lift completion by another three to four points based on the last experiment."},{id:"u3",role:"user",text:"Draft a one-line summary for the weekly update."},{id:"a3",role:"assistant",text:ev}];

function eg({label:e,checked:r,onChange:a}){
  return (
    <div className="relative flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] has-[[data-description]]:min-h-16">
        <span className={es(e_,"min-w-0 flex-1")}>{e}</span>
        <button type="button" role="switch" aria-checked={r} aria-label={e} onClick={a} className="group relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] p-0.5 shadow-[inset_0_1px_2px_rgb(84_62_32/0.14),inset_0_0_0_1px_rgb(84_62_32/0.05)] transition-[background-color,box-shadow,outline-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:aria-[checked=false]:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_94%,black)] aria-checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] aria-checked:shadow-[inset_0_1px_2px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_75%,black)] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-neutral-100/16 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)] dark:hover:aria-[checked=false]:not-disabled:bg-neutral-100/24 dark:aria-checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-checked:shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)]">
          <span className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] transition-[translate,width] duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-active:w-6 group-aria-checked:translate-x-4 group-aria-checked:group-active:translate-x-3 group-disabled:shadow-none dark:bg-white" />
        </button>
      </div>
  );
}


export default function ai_chat_4__Sorbet__Component(){
  let e=useReducedMotion(),[r,a]=useState(ef),[s,c]=useState(false),[_,x]=useState(null),[p,h]=useState(0),m=useRef(null),k=useRef(null),v=useRef(null),f=useRef(null),g=useRef(null),[w,y]=useState("Atlas"),[j,N]=useState(true),[z,S]=useState(false),[C,A]=useState(""),[R,I]=useState(0),{text:M,done:D,push:H,end:T,reset:L}=function(){
    let[e,r]=useState(""),[a,t]=useState(false),o=useRef(""),i=useRef(0),s=useRef(false),c=useReducedMotion();
    useEffect(()=>{
      let e=0,a=performance.now(),n=l=>{
        let _=Math.min(l-a,64);
        a=l;
        let d=o.current,x=d.length-i.current;
        if(x>0){
          i.current=c?d.length:Math.min(d.length,i.current+x*(1-Math.exp(-_/180))+45*_/1e3);
          let e=Math.floor(i.current),a=s.current&&e>=d.length,n=a?d.length:function(e,r){
            if(r>=e.length)return e.length;
            let a=e.lastIndexOf(" ",r);
            return -1===a?0:a;
          }(d,e);
          r(d.slice(0,n)),a&&t(true)
        }
        e=requestAnimationFrame(n)
      };
      return e=requestAnimationFrame(n),()=>cancelAnimationFrame(e);
    }, [c]);
    let _=useCallback(e=>{
      o.current+=e
    }, []);
    return {text:e,done:a,push:_,end:useCallback(()=>{
      s.current=true
    }, []),reset:useCallback(()=>{
      o.current="",i.current=0,s.current=false,r(""),t(false)
    }, [])};
  }(),{ref:W,edges:O,onScroll:$}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
      a({start:t>1,end:Math.ceil(t+l)<n-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),{showJump:q,jumpToLatest:F}=function(e){
    let r=useRef(true),[a,t]=useState(false);
    return useEffect(()=>{
      let a=e.current;
      if(!a)return;
      let n=()=>{
        let e=a.scrollHeight-a.clientHeight>1,n=a.scrollHeight-a.scrollTop-a.clientHeight,l=!e||n<24;
        r.current=l,t(e&&!l)
      },l=e=>{
        (!("deltaY"in e)||e.deltaY<0)&&a.scrollHeight-a.clientHeight>1&&a.scrollTop>0&&(r.current=false)
      },o=new ResizeObserver(()=>{
        r.current&&(a.scrollTop=a.scrollHeight),n()
      });
      return o.observe(a),a.firstElementChild&&o.observe(a.firstElementChild),a.addEventListener("wheel",l,{passive:true}),a.addEventListener("touchmove",l,{passive:true}),a.addEventListener("scroll",n,{passive:true}),a.scrollTop=a.scrollHeight,n(),()=>{
        o.disconnect(),a.removeEventListener("wheel",l),a.removeEventListener("touchmove",l),a.removeEventListener("scroll",n)
      };
    }, [e]),{showJump:a,jumpToLatest:useCallback(()=>{
      let a=e.current;
      a&&(r.current=true,t(false),a.scrollTop=a.scrollHeight)
    }, [e])};
  }(W),P=useRef(null),K=useRef(null),B=!D&&!s,Y=Math.round(38.75);
  useEffect(()=>{
    if(e){
      H(ev),T();
      return
    }
    let r=ev.match(/\S+\s*/g)??[],a=0;
    return K.current=window.setInterval(()=>{
      let e=1+Math.floor(3*Math.random());
      H(r.slice(a,a+e).join("")),(a+=e)>=r.length&&(T(),K.current&&window.clearInterval(K.current),K.current=null)
    },130),()=>{
      K.current&&window.clearInterval(K.current)
    };
  }, [e,H,T,R]),useEffect(()=>{
    if(!_)return;
    let e=m.current?.ownerDocument??document,r=e=>{
      "Escape"===e.key&&(e.preventDefault(),x(null),("model"===_?v:g).current?.focus({preventScroll:true}))
    },a=e=>{
      k.current?.contains(e.target)||x(null)
    };
    return e.addEventListener("keydown",r),e.addEventListener("pointerdown",a),()=>{
      e.removeEventListener("keydown",r),e.removeEventListener("pointerdown",a)
    };
  }, [_]),useEffect(()=>{
    "model"===_&&f.current?.focus({preventScroll:true})
  }, [_]);
  let V=(e=true)=>{
    x(null),e&&v.current?.focus({preventScroll:true})
  },J=useCallback(e=>{
    let r=e.trim();
    r&&(a(e=>[...e,{id:`u-${Date.now()}`,role:"user",text:r}]),A(""))
  }, []),G=useCallback(()=>{
    K.current&&(window.clearInterval(K.current),K.current=null),T(),c(true)
  }, [T]),Q=useCallback(()=>{
    L(),c(false),I(e=>e+1)
  }, [L]);
  return (
    <div ref={m} className={es("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full flex-col overflow-hidden")}>
        <header ref={k} className="relative z-30 shrink-0">
          <div className="mx-auto flex h-12 w-full max-w-3xl items-center gap-3 px-4 sm:px-6">
            <h1 className={e_}>Onboarding analysis</h1>
            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <button ref={v} type="button" onClick={()=>"model"===_?V():x("model")} onKeyDown={e=>{
                  "ArrowDown"===e.key?(e.preventDefault(),h(0),x("model")):"ArrowUp"===e.key&&(e.preventDefault(),h(em.length-1),x("model"))
                }} aria-haspopup="listbox" aria-expanded={"model"===_} aria-label={`Model: ${w}`} className={es(eu,ep)}>
                  {w}
                  <HugeiconsIcon icon={Icon_20148} size={14} strokeWidth={2} aria-hidden="true" />
                </button>
                {"model"===_&&<div ref={f} role="listbox" aria-label="Model" tabIndex={-1} onKeyDown={e=>{
                  switch(e.key){case"ArrowDown":e.preventDefault(),h(e=>(e+1)%em.length);break;case"ArrowUp":e.preventDefault(),h(e=>(e-1+em.length)%em.length);break;case"Home":e.preventDefault(),h(0);break;case"End":e.preventDefault(),h(em.length-1);break;case"Enter":case" ":e.preventDefault(),y(em[p].name),V();break;case"Tab":V(false)}
                }} className={es("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute left-0 top-full z-50 mt-1 w-[224px]")}>
                  {em.map((e,r)=>(
                    <button key={e.name} type="button" role="option" aria-selected={w===e.name} data-highlighted={r===p||undefined} tabIndex={-1} onClick={()=>{
                                    y(e.name),V()
                                  }} onPointerMove={()=>h(r)} className={es("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                                    <span className="min-w-0 flex-1">
                                      <span className="block">{e.name}</span>
                                      <span className={es(ed,ec,"block")}>{e.hint}</span>
                                    </span>
                                    {w===e.name&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="absolute end-2" />}
                                  </button>
                  ))}
                </div>}
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <div className="w-28">
                  <div className="relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]">
                    <div className={Y>=95?es("bg-[oklch(65.2%_0.219_26)] dark:bg-[oklch(65.2%_0.219_26)]","block h-full"):Y>=80?es("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full"):"block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]"} style={{width:`${Y}%`}} />
                  </div>
                </div>
                <span className={es(ed,ec)}>
                  {ek(12400)}
                  {" / "}
                  {ek(32e3)}
                  {" "}
                  tokens
                </span>
              </div>
              <div className="relative">
                <button ref={g} type="button" onClick={()=>x(e=>"settings"===e?null:"settings")} aria-label="Conversation settings" aria-haspopup="dialog" aria-expanded={"settings"===_} className={es(eu,"size-10 rounded-[calc(var(--rb-r-full,999px))]")}>
                  <HugeiconsIcon icon={Icon_29719} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                {"settings"===_&&<div className={es("flex max-h-80 w-72 max-w-[calc(100vw-2rem)] flex-col gap-3 overflow-y-auto rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-4 text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute right-0 top-full z-50 mt-1 w-[256px]")}>
                  <p className={es(ed,ec)}>Conversation</p>
                  <div className="divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7">
                    <eg label="Cite sources" checked={j} onChange={()=>N(e=>!e)} />
                    <eg label="Show reasoning" checked={z} onChange={()=>S(e=>!e)} />
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div ref={W} onScroll={$} className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-y-auto overscroll-contain [overflow-anchor:none]">
            <div className="mt-auto flex w-full flex-col gap-6 px-4 py-6 sm:px-6">
              {r.map(e=>{
                if("user"===e.role)return (
                  <div key={e.id} className="flex">
                                <div className="ml-auto max-w-[85%]">
                                  <div className="w-fit max-w-full rounded-[calc(var(--rb-r-6xl,26px))] rounded-br-[var(--rb-r-xs,4px)] border border-transparent bg-[var(--rb-accent,oklch(84%_0.15_165))] px-4 py-2.5 text-[15px]/[22px] font-medium whitespace-pre-wrap text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_2px_6px_-3px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,transparent)] [overflow-wrap:anywhere] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-none">{e.text}</div>
                                </div>
                              </div>
                );
                let r="a3"===e.id&&B,a="a3"===e.id&&!B;
                return (
                  <div key={e.id} className="group space-y-3">
                                <p className={es("flex min-w-0 flex-col gap-4 text-[15px]/[24px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","max-w-prose")}>{r?M:e.text}</p>
                                {a&&<div className="-ms-2 flex min-h-9 min-w-0 items-center gap-0.5 text-[14px]/[20px] font-semibold text-neutral-900/78 dark:text-neutral-100/78 [@media(pointer:fine)]:*:data-reveal:opacity-0 [@media(pointer:fine)]:group-hover:*:data-reveal:opacity-100 *:data-reveal:focus-visible:opacity-100 *:data-reveal:transition-opacity">
                                  <button type="button" data-reveal onClick={Q} className={es(eb,"h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold")}>Regenerate</button>
                                </div>}
                              </div>
                );
              })}
            </div>
          </div>
          <div aria-hidden="true" className={es("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",O.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={es("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",O.end?"opacity-100":"opacity-0")} />
          {q&&<div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
            <motion.button type="button" onClick={F} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.15}} className={es("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40",ep)}>
              <HugeiconsIcon icon={Icon_54345} size={18} strokeWidth={2} aria-hidden="true" />
              Jump to latest
            </motion.button>
          </div>}
        </div>
        <div className="shrink-0">
          <div className="mx-auto w-full max-w-3xl px-4 pb-4 sm:px-6">
            <div className={es("relative flex w-full min-w-0 flex-col rounded-[calc(min(var(--rb-r-6xl,26px),min(var(--rb-r-full,999px),16px)_+_8px))] border border-transparent bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] transition-[box-shadow] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:shadow-[0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent),0_8px_22px_-10px_rgb(84_62_32/0.2)] dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] dark:focus-within:shadow-[0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163)),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","p-2")}>
              <textarea ref={P} rows={1} value={C} onChange={e=>{
                let r;
                A(e.target.value),(r=P.current)&&(r.style.height="auto",r.style.height=`${Math.min(r.scrollHeight,160)}px`)
              }} onKeyDown={e=>{
                "Enter"!==e.key||e.shiftKey||(e.preventDefault(),J(C))
              }} placeholder="Ask anything" className="max-h-40 min-h-6 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1.5 field-sizing-content text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/55 dark:placeholder:text-neutral-100/55" />
              <div className="flex items-center gap-1 pt-1">
                <button type="button" aria-label="Add attachment" className={es(eb,eh)}>
                  <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                <div className="ml-auto flex items-center gap-1">
                  {B?<button key={"stop"} type="button" onClick={G} aria-label="Stop generating" className={es(ex,eh)}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<button key={"send"} type="button" onClick={()=>J(C)} aria-label="Send" disabled={0===C.trim().length} className={es(ex,eh)}>
                    <HugeiconsIcon icon={Icon_40972} size={18} strokeWidth={2} aria-hidden="true" />
                  </button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
