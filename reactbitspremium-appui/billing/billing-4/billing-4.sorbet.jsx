/**
 * React Bits Pro — Application UI (billing-4 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59157 = [["path",{d:"M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_37502 = [["path",{d:"M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9M16.5 16.5L6.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_36474 = [["path",{d:"M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 9V13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let ef = (...e)=>e.filter(Boolean).join(" ");

let ew = "text-neutral-900/78 dark:text-neutral-100/78";

let ej = "text-neutral-900/62 dark:text-neutral-100/62";

let eN = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]";

let ey = "text-[14px]/[20px] font-medium";

let eS = "text-[15px]/[20px] font-bold";

let ez = "text-[13px]/[16px] font-semibold tabular-nums";

let eA = "font-mono text-[12px]/[16px] tabular-nums";

let eC = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let eM = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let eR = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let eW = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let eD = e=>`$${e.toLocaleString("en-US")}`;

let eE = [{id:"SUB-4712",customer:"Halcyon Pay",product:"Payments Cloud",status:"Failed",plan:"Enterprise",basis:"Platform fee",owner:"Priya Nandakumar",amount:6200,method:"PM-7741",next:"Jun 18",attempt:"Attempt 3 of 4",urgent:false,invoice:"INV-20418",card:"Visa ending 4242",attempts:[{n:1,reason:"Insufficient funds",code:"insufficient_funds",note:"Retried at the customer's usual top-up hour.",date:"May 29"},{n:2,reason:"Issuer declined",code:"do_not_honor",note:"Issuer blocked a repeat attempt inside 72 hours.",date:"Jun 3"},{n:3,reason:"Card declined",code:"generic_decline",note:"Hosted card update requested by email.",date:"Jun 10"}]},{id:"SUB-4794",customer:"Lumendesk",product:"Database Cloud",status:"Exhausted",plan:"Scale",basis:"Usage based",owner:"Marcus Bell",amount:4800,method:"PM-7743",next:"Retries exhausted",attempt:"Attempt 4 of 4",urgent:true,invoice:"INV-20401",card:"Mastercard ending 8829",attempts:[]},{id:"SUB-4806",customer:"Meridian Labs",product:"Enterprise Grid",status:"Retrying",plan:"Scale",basis:"Seat based",owner:"Sofia Alvarez",amount:5400,method:"PM-7742",next:"Today",attempt:"Attempt 3 of 4",urgent:false,invoice:"INV-20409",card:"Visa ending 1190",attempts:[]},{id:"SUB-4820",customer:"Cedar Labs",product:"Insights",status:"Retrying",plan:"Growth",basis:"Usage based",owner:"Wei Chen",amount:3150,method:"PM-7748",next:"Jun 19",attempt:"Attempt 2 of 4",urgent:false,invoice:"INV-20422",card:"ACH transfer",attempts:[]},{id:"SUB-4833",customer:"Orbital Systems",product:"Edge Delivery",status:"Failed",plan:"Growth",basis:"Seat based",owner:"Tom\xe1s Guerrero",amount:2400,method:"PM-7751",next:"Jun 20",attempt:"Attempt 1 of 4",urgent:false,invoice:"INV-20427",card:"Visa ending 6604",attempts:[]},{id:"SUB-4841",customer:"Atlas Freight",product:"Logistics API",status:"Retrying",plan:"Starter",basis:"Usage based",owner:"Amelia Whitfield",amount:2e3,method:"PM-7756",next:"Jun 21",attempt:"Attempt 2 of 4",urgent:false,invoice:"INV-20430",card:"Mastercard ending 4417",attempts:[]}];

let eP = [{label:"Amount at risk",hint:"Open failed charges",value:eD(23950),delta:"−8%",deltaTone:"down",fill:72,bar:"warn",cells:[{n:"2",l:"Failed"},{n:"3",l:"Retrying"},{n:"1",l:"Exhausted"}]},{label:"Recovered",hint:"Charges settled this month",value:eD(16500),delta:"+12%",deltaTone:"up",fill:58,bar:"ink",cells:[{n:"9",l:"Invoices"},{n:eD(8900),l:"Largest"},{n:"2",l:"Playbooks"}]},{label:"Recovery rate",hint:"Smart retries across accounts",value:"25%",delta:"+3%",deltaTone:"up",fill:25,bar:"ink",cells:[{n:"19",l:"Attempts"},{n:"32",l:"Capacity"},{n:"4",l:"Max tries"}]}];


export default function billing_4__Sorbet__Component(){
  let[e,a]=useState("SUB-4712"),{ref:r,edges:o,onScroll:c}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false,left:false,right:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n,scrollLeft:i,scrollWidth:s,clientWidth:o}=a;
      r({start:t>1,end:Math.ceil(t+n)<l-1,left:i>1,right:Math.ceil(i+o)<s-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }(),d=useMemo(()=>eE.reduce((e,a)=>e+a.amount,0), []);
  return (
    <div className={ef("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","flex h-full min-h-[800px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className="mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-[22px]/[28px] font-extrabold tracking-[-0.01em]">Recovery queue</h2>
              <p className={ef(ey,ej,"mt-0.5 flex flex-wrap gap-x-3")}>
                <span>
                  {eE.length}
                  {" subscriptions with live retry paths"}
                </span>
                <span className={eN}>
                  {eD(d)}
                  {" at risk"}
                </span>
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" className={ef(eC,eR)}>
                <HugeiconsIcon icon={Icon_68656} size={18} strokeWidth={2} aria-hidden="true" />
                Rules
              </button>
              <button type="button" className={ef(eC,eR)}>
                <HugeiconsIcon icon={Icon_92752} size={18} strokeWidth={2} aria-hidden="true" />
                Export
              </button>
              <button type="button" className={ef("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none",eR)}>
                <HugeiconsIcon icon={Icon_59157} size={18} strokeWidth={2} aria-hidden="true" />
                Retry due
              </button>
            </div>
          </div>
          <div className={ef("@container rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] p-1","mt-3")}>
            <div className="grid grid-cols-2 gap-1 [&>:last-child:nth-child(odd)]:col-span-full @3xl:grid-flow-col @3xl:grid-cols-none @3xl:auto-cols-fr @3xl:[&>:last-child:nth-child(odd)]:col-auto">
              {eP.map(e=>(
                <div key={e.label} className="flex min-w-0 flex-col gap-2 rounded-[calc(var(--rb-r-5xl,22px))] bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 py-3.5 dark:bg-neutral-100/4">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className={ef("text-[14px]/[20px] font-bold text-neutral-900/78 dark:text-neutral-100/78","text-pretty")}>{e.label}</p>
                                <p className={ef("text-[14px]/[20px] font-medium text-neutral-900/62 dark:text-neutral-100/62","mt-0.5 text-pretty")}>{e.hint}</p>
                              </div>
                              <span className={ef("inline-flex min-w-0 flex-wrap items-baseline gap-x-1 text-[13px]/[18px] font-bold tabular-nums [&>svg]:self-center text-neutral-900/78 dark:text-neutral-100/78","shrink-0")}>
                                <HugeiconsIcon icon={"up"===e.deltaTone?Icon_1497:Icon_37502} size={14} strokeWidth={2} aria-hidden="true" />
                                <span className="sr-only">{"up"===e.deltaTone?"Up":"Down"}</span>
                                {e.delta}
                              </span>
                            </div>
                            <p className={ef("flex min-w-0 flex-wrap items-baseline gap-x-1 text-[34px]/[40px] font-extrabold tracking-[-0.02em] tabular-nums text-neutral-900 dark:text-neutral-100","mt-auto")}>{e.value}</p>
                            <div className="relative block h-2.5 w-full overflow-hidden rounded-[calc(var(--rb-r-full,999px))] bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] shadow-[inset_0_1px_2px_rgb(84_62_32/0.12)] dark:bg-neutral-100/12 dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]" role="presentation">
                              <div className={"warn"===e.bar?ef("bg-[oklch(80%_0.152_68)] dark:bg-[oklch(80%_0.152_68)]","block h-full"):"block h-full rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_82%,black)] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none dark:bg-[var(--rb-accent,oklch(81%_0.16_163))]"} style={{width:`${e.fill}%`}} />
                            </div>
                            <dl className="grid grid-cols-[repeat(auto-fit,minmax(64px,1fr))] gap-2">
                              {e.cells.map(e=>(
                                <div key={e.l} className="min-w-0">
                                                <dt className={ef(ez,ej)}>{e.l}</dt>
                                                <dd className={ef(eS,"mt-0.5 tabular-nums")}>{e.n}</dd>
                                              </div>
                              ))}
                            </dl>
                          </div>
              ))}
            </div>
          </div>
          <div className={ef("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]","mt-3 min-h-0 flex-1")}>
            <div className={ef("flex min-h-12 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2.5","justify-between py-3")}>
              <div className="min-w-0">
                <h3 className="min-w-0 truncate text-[16px]/[20px] font-extrabold text-neutral-900 dark:text-neutral-100">Past due subscriptions</h3>
                <p className={ef("text-[14px]/[20px] font-medium text-neutral-900/78 dark:text-neutral-100/78","mt-0.5")}>Retry schedule, payment method, and account owner.</p>
              </div>
              <button type="button" className={ef(eC,eR,"max-sm:hidden")}>Manage playbooks</button>
            </div>
            <div className={ef("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:has(+*)]:mb-0","relative min-h-0 flex-1")}>
              <div ref={r} onScroll={c} className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
                <table className={ef("w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium","min-w-[820px]")}>
                  <caption className="sr-only">Past due subscriptions</caption>
                  <thead className={ef("bg-white dark:bg-neutral-950","sticky top-0 z-10")}>
                    <tr>
                      {["Customer","Status","Billing","Owner","Amount","Next retry",""].map((e,a)=><th key={e||a} scope="col" className="h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4"><span className={ef("block","Amount"===e&&"text-right")}>{e}</span></th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {eE.map(r=>{
                      let i=e===r.id;
                      return (
                        <Fragment key={r.id}>
                                            <tr className={ef("group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]","h-14")}>
                                              <td className={eW}>
                                                <div className="flex items-center gap-2">
                                                  <button type="button" aria-expanded={i} aria-label={`Retry attempts for ${r.customer}`} onClick={()=>a(i?null:r.id)} className={ef(eM,"size-7 rounded-[calc(var(--rb-r-full,999px))]","group")}>
                                                    <HugeiconsIcon icon={Icon_5042} size={16} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                                                  </button>
                                                  <div className="min-w-0">
                                                    <p className={ef(eS,"truncate")}>{r.customer}</p>
                                                    <p className={ef(ey,ej,"mt-0.5 flex min-w-0 gap-x-3")}>
                                                      <span className={eA}>{r.id}</span>
                                                      <span className="truncate">{r.product}</span>
                                                    </p>
                                                  </div>
                                                </div>
                                              </td>
                                              <td className={eW}>
                                                <span className={ef("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums","Retrying"===r.status?"text-neutral-900 dark:text-neutral-100":"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]")}>
                                                  {"Retrying"===r.status&&<span className="flex h-lh shrink-0 items-center">
                                                    <span className="inline-block size-3 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin [animation-duration:700ms] motion-reduce:animate-none" aria-hidden="true" />
                                                  </span>}
                                                  {r.status}
                                                </span>
                                              </td>
                                              <td className={eW}>
                                                <p>{r.plan}</p>
                                                <p className={ef(ey,ej,"mt-0.5")}>{r.basis}</p>
                                              </td>
                                              <td className={eW}><span className={ew}>{r.owner}</span></td>
                                              <td className={ef(eW,"text-right tabular-nums")}>
                                                <p className={eS}>{eD(r.amount)}</p>
                                                <p className={ef(eA,ej,"mt-0.5")}>{r.method}</p>
                                              </td>
                                              <td className={eW}>
                                                <p className={ef("tabular-nums",r.urgent&&eN)}>{r.next}</p>
                                                <p className={ef(ey,ej,"mt-0.5 tabular-nums")}>{r.attempt}</p>
                                              </td>
                                              <td className={eW}>
                                                <div className="flex items-center justify-end gap-0.5 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-[180ms]">
                                                  <button type="button" aria-label={`Actions for ${r.customer}`} className={ef(eM,"size-8 rounded-[calc(var(--rb-r-full,999px))]")}>
                                                    <HugeiconsIcon icon={Icon_59649} size={18} strokeWidth={2} aria-hidden="true" />
                                                  </button>
                                                </div>
                                              </td>
                                            </tr>
                                            {i&&r.attempts.length>0&&<tr>
                                              <td colSpan={7} className={ef("bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)]","border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:border-neutral-100/7","p-3")}>
                                                <div className="flex items-center justify-between gap-3 px-3 py-2">
                                                  <div className="min-w-0">
                                                    <p className={eS}>Retry attempts</p>
                                                    <p className={ef(ey,ej,"mt-0.5")}>
                                                      {"Card update requested for "}
                                                      {r.card}
                                                      .
                                                    </p>
                                                  </div>
                                                  <p className={ef(eA,ej,"shrink-0")}>{r.invoice}</p>
                                                </div>
                                                <ul className="divide-y divide-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:divide-neutral-100/7">
                                                  {r.attempts.map(e=>(
                                                    <li key={e.n} className="flex flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                                                                                <div className="flex min-w-0 items-start gap-2.5">
                                                                                  <HugeiconsIcon icon={Icon_36474} size={16} strokeWidth={2} aria-hidden="true" className={ef(ej,"mt-0.5 shrink-0")} />
                                                                                  <div className="min-w-0">
                                                                                    <p className={ef(eS,"flex flex-wrap gap-x-3")}>
                                                                                      <span>
                                                                                        {"Attempt "}
                                                                                        {e.n}
                                                                                      </span>
                                                                                      <span className={ew}>{e.reason}</span>
                                                                                    </p>
                                                                                    <p className={ef(ey,ej,"mt-0.5")}>{e.note}</p>
                                                                                  </div>
                                                                                </div>
                                                                                <div className="flex shrink-0 items-center gap-4 pl-6 sm:pl-0">
                                                                                  <span className={ef(eA,ej)}>{e.code}</span>
                                                                                  <span className={ef(ez,ej)}>{e.date}</span>
                                                                                </div>
                                                                              </li>
                                                  ))}
                                                </ul>
                                              </td>
                                            </tr>}
                                          </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div aria-hidden="true" className={ef("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",o.end?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={ef("bg-linear-to-r from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 left-0 z-20 w-8",o.left?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={ef("bg-linear-to-l from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-y-0 right-0 z-20 w-8",o.right?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
      </div>
  );
}
