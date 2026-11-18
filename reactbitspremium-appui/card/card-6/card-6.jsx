/**
 * React Bits Pro — Application UI (card-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useMemo, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_83838 = [["path",{d:"M14 3H5C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7H18C18 6.07003 18 5.60504 17.8978 5.22354C17.6204 4.18827 16.8117 3.37962 15.7765 3.10222C15.395 3 14.93 3 14 3Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V13C21 10.1716 21 8.75736 20.1213 7.87868C19.2426 7 17.8284 7 15 7H7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 12H19C18.535 12 18.3025 12 18.1118 12.0511C17.5941 12.1898 17.1898 12.5941 17.0511 13.1118C17 13.3025 17 13.535 17 14C17 14.465 17 14.6975 17.0511 14.8882C17.1898 15.4059 17.5941 15.8102 18.1118 15.9489C18.3025 16 18.535 16 19 16H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_95735 = [["path",{d:"M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 16H11.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 16L18 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 9H22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_43755 = [["path",{d:"M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  b = "text-neutral-900 dark:text-neutral-100",
  p = ["7d","30d","90d"],
  _ = [{id:"balance",label:"Available balance",icon:Icon_83838,values:{"7d":{value:"18,420",delta:3.2,series:[42,55,48,61,58,72,80]},"30d":{value:"74,910",delta:8.6,series:[30,44,39,52,66,61,78]},"90d":{value:"213,540",delta:12.4,series:[22,31,45,40,58,70,88]}}},{id:"spend",label:"Card spend",icon:Icon_95735,values:{"7d":{value:"4,180",delta:-1.8,series:[70,62,66,51,55,44,40]},"30d":{value:"16,240",delta:-5.4,series:[82,74,68,60,57,49,41]},"90d":{value:"51,880",delta:2.1,series:[48,52,46,58,55,63,67]}}},{id:"recurring",label:"Recurring revenue",icon:Icon_43755,values:{"7d":{value:"9,760",delta:1.1,series:[58,60,59,63,65,64,68]},"30d":{value:"38,900",delta:4.7,series:[40,46,51,55,60,66,72]},"90d":{value:"112,300",delta:9.9,series:[28,36,44,49,61,68,84]}}},{id:"payers",label:"Active payers",icon:Icon_88366,values:{"7d":{value:"1,284",delta:.6,series:[61,59,63,62,66,65,69]},"30d":{value:"1,342",delta:-2.3,series:[76,71,69,64,61,58,54]},"90d":{value:"1,410",delta:6.8,series:[34,41,48,52,59,67,74]}}}];

function h(){
  let[e,r]=useState("30d"),a=useMemo(()=>_.reduce((r,a)=>r+a.values[e].delta,0).toFixed(1), [e]);
  return (
    <div className={x("bg-white dark:bg-neutral-950",b,"flex h-full min-h-[480px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="flex h-9 shrink-0 items-center gap-3">
          <p className={x("text-[14px]/[16px] font-[450]",b,"min-w-0 flex-1 truncate")}>Accounts overview</p>
          <div role="radiogroup" aria-label="Date range" className={x("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","shrink-0")}>
            {p.map(a=><button key={a} type="button" role="radio" aria-checked={a===e} onClick={()=>r(a)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{a}</button>)}
          </div>
        </div>
        <div className={x("@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900","mt-4 shrink-0")}>
          <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
            {_.map(r=>{
              let a=r.values[e],l=a.delta>=0,i=Math.max(...a.series);
              return (
                <div key={r.id} className="flex min-w-0 flex-col gap-2 px-4 py-3">
                            <p className={x("text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80","flex items-start gap-2")}>
                              <span className="flex h-lh shrink-0 items-center"><HugeiconsIcon icon={r.icon} size={16} strokeWidth={1.8} aria-hidden="true" /></span>
                              <span className="min-w-0 text-pretty">{r.label}</span>
                            </p>
                            <p className={x("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[20px]/[24px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100","mt-auto")}>{a.value}</p>
                            <p className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[12px]/[16px] font-[450] tabular-nums [&>svg]:self-center text-neutral-900/80 dark:text-neutral-100/80">
                              <HugeiconsIcon icon={l?Icon_1497:Icon_37502} size={12} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                              <span className="sr-only">{l?"Up":"Down"}</span>
                              {l?"+":""}
                              {a.delta}
                              %
                              <span className="text-neutral-900/66 dark:text-neutral-100/66">
                                {"vs previous "}
                                {e}
                              </span>
                            </p>
                            <div aria-hidden="true" className="mt-1 flex h-10 items-end gap-1">
                              {a.series.map((e,r)=><span key={r} style={{height:`${Math.round(e/i*100)}%`}} className={x(r===a.series.length-1?"block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100":"relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","rounded-[var(--rb-r-xs,4px)]","min-h-[2px] flex-1")} />)}
                            </div>
                          </div>
              );
            })}
          </div>
        </div>
        <p className={x("text-[13px]/[18px] font-normal","text-neutral-900/80 dark:text-neutral-100/80","mt-3 shrink-0 tabular-nums")}>
          {"Net movement across all four accounts over the last "}
          {e}
          {": "}
          {a}
          %.
        </p>
      </div>
  );
}


export default h;
