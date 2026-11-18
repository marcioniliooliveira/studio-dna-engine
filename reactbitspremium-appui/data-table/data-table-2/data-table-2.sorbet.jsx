/**
 * React Bits Pro — Application UI (data-table-2 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_99199 = [["path",{d:"M20 12L4 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_22670 = [["path",{d:"M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_58661 = [["path",{d:"M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let h = (...e)=>e.filter(Boolean).join(" ");

let p = "bg-white dark:bg-neutral-950";

let b = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let m = "text-neutral-900/78 dark:text-neutral-100/78";

let k = "text-[15px]/[20px] font-bold";

let f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let v = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let g = "relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40";

let w = "block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]";

let j = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let y = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let N = "text-right tabular-nums";

let C = "sm:first:ps-6 sm:last:pe-6";

let S = [{name:"Sable Ridge Energy",owner:"Mina Kapoor",plan:"Enterprise",status:"Needs review",region:"EMEA",mrr:18420,renewalOn:"2025-08-12"},{name:"North Pier Robotics",owner:"Tomasz Nowak",plan:"Scale",status:"Active",region:"North America",mrr:9860,renewalOn:"2025-09-03"},{name:"Longleaf Clinical Research Network International",owner:"Ari Chen",plan:"Enterprise",status:"Active",region:"APAC",mrr:22190,renewalOn:"2025-09-19"},{name:"Cobalt Field Labs",owner:"Rhea Flores",plan:"Growth",status:"Paused",region:"North America",mrr:4210,renewalOn:"2025-10-01"},{name:"Kite Harbor Logistics",owner:"Devon Okafor",plan:"Scale",status:"Active",region:"LATAM",mrr:7540,renewalOn:"2025-10-08"},{name:"Mossbank Archive Trust",owner:"Lena Ortiz",plan:"Growth",status:"Needs review",region:"EMEA",mrr:3980,renewalOn:"2025-10-22"},{name:"Vantage Grid Systems",owner:"Priya Rao",plan:"Enterprise",status:"Active",region:"North America",mrr:26740,renewalOn:"2025-11-04"},{name:"Harbor & Vale Freight",owner:"Marcus Lund",plan:"Scale",status:"Active",region:"EMEA",mrr:11230,renewalOn:"2025-11-11"},{name:"Tidewater Instruments",owner:"Sofia Martins",plan:"Growth",status:"Active",region:"APAC",mrr:5620,renewalOn:"2025-11-18"},{name:"Redwood Payments",owner:"Jun Park",plan:"Enterprise",status:"Needs review",region:"North America",mrr:19870,renewalOn:"2025-11-29"}];

let A = ["Owner","Plan","Region","Renewal"];

let L = {Active:"text-neutral-900/78 dark:text-neutral-100/78","Needs review":"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Paused:"text-neutral-900/62 dark:text-neutral-100/62"};

let H = (...e)=>e.filter(Boolean).join(" ");

let B = "bg-white dark:bg-neutral-950";

let F = "bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900";

let I = "text-neutral-900 dark:text-neutral-100";

let Y = "text-neutral-900/78 dark:text-neutral-100/78";

let V = "text-neutral-900/62 dark:text-neutral-100/62";

let U = "text-[14px]/[20px] font-medium";

let G = "text-[15px]/[20px] font-bold";

let K = "text-[13px]/[16px] font-semibold tabular-nums";

let $ = "relative inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-[calc(var(--rb-r-full,999px))] border border-transparent px-3 text-[15px]/[20px] font-bold tabular-nums text-neutral-900 dark:text-neutral-100 transition-[background-color,box-shadow,color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.94] motion-reduce:active:scale-100 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-[current=page]:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] aria-[current=page]:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-disabled:pointer-events-none aria-disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/8 dark:aria-[current=page]:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:aria-disabled:text-neutral-100/40";

let q = "text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62";

let Z = "h-10 border-b border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] px-3 text-left align-middle text-[13px]/[16px] font-bold tabular-nums whitespace-nowrap text-neutral-900/62 dark:text-neutral-100/62 first:ps-4 last:pe-4 dark:bg-neutral-100/4";

let J = "h-12 border-b border-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] px-3 align-middle whitespace-nowrap text-neutral-900 dark:text-neutral-100 group-last:border-b-0 first:ps-4 last:pe-4 dark:border-neutral-100/6";

let Q = "text-right tabular-nums";

let X = "inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-[calc(var(--rb-r-full,999px))] bg-white/12 px-3.5 text-[14px]/[18px] font-bold transition-[background-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:bg-white/20 active:scale-[0.96] active:bg-white/28 motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(84%_0.15_165))] dark:bg-neutral-900/10 dark:hover:bg-neutral-900/16 dark:active:bg-neutral-900/24 dark:focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)]";

let ee = "sm:first:ps-6 sm:last:pe-6";

let er = [{id:"PAY-0182",vendor:"Pilot Fiber Transit",owner:"Iris Woods",status:"Needs approval",amount:6420,due:"Aug 6"},{id:"PAY-0183",vendor:"Granite Switchgear Supply",owner:"Niko Bryant",status:"Scheduled",amount:18200,due:"Aug 7"},{id:"PAY-0184",vendor:"Beacon Yard Services",owner:"Marisol Vale",status:"Paid",amount:3140,due:"Aug 9"},{id:"PAY-0185",vendor:"Atlas Thermal Controls",owner:"Jun Park",status:"Scheduled",amount:9880,due:"Aug 11"},{id:"PAY-0186",vendor:"Silverline Security Review Partners",owner:"Mara Singh",status:"Needs approval",amount:2760,due:"Aug 15"},{id:"PAY-0187",vendor:"Lowland Metering Group",owner:"Theo Grant",status:"Paid",amount:14050,due:"Aug 18"},{id:"PAY-0188",vendor:"Cedarworks Freight",owner:"Asha Malik",status:"Scheduled",amount:5310,due:"Aug 20"},{id:"PAY-0189",vendor:"Halden Instrument Rental",owner:"Camille Hart",status:"Paid",amount:1980,due:"Aug 22"},{id:"PAY-0190",vendor:"Northwind Facilities",owner:"Iris Woods",status:"Needs approval",amount:22400,due:"Aug 25"},{id:"PAY-0191",vendor:"Riverbend Testing Lab",owner:"Niko Bryant",status:"Scheduled",amount:7640,due:"Aug 27"},{id:"PAY-0192",vendor:"Cascade Pallet Works",owner:"Marisol Vale",status:"Paid",amount:4380,due:"Aug 28"},{id:"PAY-0193",vendor:"Ironvale Coatings",owner:"Theo Grant",status:"Scheduled",amount:12740,due:"Sep 1"},{id:"PAY-0194",vendor:"Dockside Calibration Services",owner:"Mara Singh",status:"Needs approval",amount:8150,due:"Sep 2"},{id:"PAY-0195",vendor:"Alder Route Analytics",owner:"Jun Park",status:"Scheduled",amount:3290,due:"Sep 4"},{id:"PAY-0196",vendor:"Fenwick Packaging",owner:"Camille Hart",status:"Paid",amount:6710,due:"Sep 5"},{id:"PAY-0197",vendor:"Harborlight Cold Chain",owner:"Iris Woods",status:"Scheduled",amount:19430,due:"Sep 8"},{id:"PAY-0198",vendor:"Quarry Bend Materials",owner:"Niko Bryant",status:"Needs approval",amount:5040,due:"Sep 9"},{id:"PAY-0199",vendor:"Westline Fleet Care",owner:"Asha Malik",status:"Paid",amount:2260,due:"Sep 11"},{id:"PAY-0200",vendor:"Stonecrest Utility Partners",owner:"Marisol Vale",status:"Scheduled",amount:15870,due:"Sep 12"},{id:"PAY-0201",vendor:"Meridian Trade Compliance",owner:"Jun Park",status:"Needs approval",amount:9320,due:"Sep 15"},{id:"PAY-0202",vendor:"Blackpine Yard Equipment",owner:"Theo Grant",status:"Scheduled",amount:7180,due:"Sep 16"},{id:"PAY-0203",vendor:"Verity Audit Group",owner:"Mara Singh",status:"Paid",amount:11600,due:"Sep 18"},{id:"PAY-0204",vendor:"Copperfield Signage",owner:"Camille Hart",status:"Scheduled",amount:1840,due:"Sep 19"},{id:"PAY-0205",vendor:"Northgate Waste Services",owner:"Niko Bryant",status:"Needs approval",amount:4960,due:"Sep 22"},{id:"PAY-0206",vendor:"Trellis Facility Software",owner:"Iris Woods",status:"Paid",amount:20510,due:"Sep 23"},{id:"PAY-0207",vendor:"Sunfield Grounds Care",owner:"Asha Malik",status:"Scheduled",amount:3470,due:"Sep 25"},{id:"PAY-0208",vendor:"Larkspur Legal Retainer",owner:"Jun Park",status:"Needs approval",amount:13250,due:"Sep 26"},{id:"PAY-0209",vendor:"Beacon Ridge Insurance",owner:"Marisol Vale",status:"Scheduled",amount:27890,due:"Sep 29"}];

let ea = e=>e.toLocaleString("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});

let et = {Scheduled:"text-neutral-900 dark:text-neutral-100","Needs approval":I,Paid:"text-neutral-900/78 dark:text-neutral-100/78","On hold":"text-neutral-900/62 dark:text-neutral-100/62"};

function en({status:e}){
  return <span className={H("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums",et[e],"whitespace-nowrap")}>{e}</span>;
}

function el({checked:e,indeterminate:r,onChange:a,label:o}){
  let s=useRef(null),i=!!r&&!e;
  return useEffect(()=>{
    s.current&&(s.current.indeterminate=i)
  }, [i]),<span className="relative inline-flex size-[18px] shrink-0 items-center justify-center">
    <input ref={s} type="checkbox" checked={e} onChange={a} aria-label={o} className="peer size-[18px] shrink-0 cursor-pointer appearance-none rounded-[calc(var(--rb-r-sm,6px))] border-2 border-neutral-900/28 bg-white transition-[background-color,border-color,box-shadow,outline-color,scale] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:scale-[0.86] motion-reduce:active:scale-100 hover:not-checked:not-disabled:border-neutral-900/60 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(84%_0.15_165))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(84%_0.15_165))] checked:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] indeterminate:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/20 disabled:checked:bg-neutral-900/25 disabled:checked:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:border-neutral-100/34 dark:bg-neutral-900 dark:hover:not-checked:not-disabled:border-neutral-100/70 dark:active:not-checked:bg-neutral-100/10 dark:checked:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:indeterminate:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:checked:shadow-none dark:indeterminate:shadow-none dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/24 dark:disabled:checked:bg-neutral-100/28" />
    <HugeiconsIcon icon={i?Icon_99199:Icon_90987} size={14} strokeWidth={2.5} aria-hidden="true" className={H("pointer-events-none absolute scale-50 text-[var(--rb-accent-fg,oklch(26%_0.06_168))] opacity-0 transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:scale-100 peer-indeterminate:opacity-100 peer-active:scale-[0.86] motion-reduce:transition-none dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))]","peer-indeterminate:opacity-100")} />
  </span>;
}

function eo({id:e,value:r,onChange:a,options:o,disabled:s,placeholder:c="Select…",className:d,triggerClassName:u,ariaLabel:_}){
  let h=useId(),[p,b]=useState(false),[m,k]=useState(0),[f,v]=useState(false),[g,w]=useState(),j=useRef(null),y=useRef(null),N=useRef({buffer:"",at:0}),C=o.findIndex(e=>e.value===r),S=C>=0?o[C]:undefined,A=e=>{
    if(s)return;
    let r=j.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,n=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/(auto|scroll|hidden|clip)/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),n=Math.min(n,r.bottom);
        break
      }
      let l=n-e.bottom,s=e.top-t,i=Math.min(32*o.length+10,264),c=l<i+8&&s>l,d=(c?s:l)-8;
      v(c),w(d<i?Math.max(d,40):undefined)
    }
    k(e??(C>=0?C:0)),b(true)
  };
  useEffect(()=>{
    if(!p)return;
    let e=j.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||b(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [p]),useEffect(()=>{
    if(!p)return;
    let e=y.current,r=e?.querySelector(`[data-index="${m}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [p,m]);
  let L=e=>{
    let r=o[e];
    r&&(a(r.value),b(false),j.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={j} className={H("relative",d)}>
        <button id={e} type="button" role="combobox" aria-expanded={p} aria-controls={h} aria-haspopup="listbox" aria-activedescendant={p?`${h}-${m}`:undefined} aria-label={_} disabled={s} onClick={()=>p?b(false):A()} onKeyDown={e=>{
          if(!s){
            if(!p){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),A());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),b(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),k(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),k(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),k(0);else if("End"===e.key)e.preventDefault(),k(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),L(m);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),a=N.current;
              a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
              let t=o.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              t>=0&&k(t)
            }
          }
        }} className={H("inline-flex h-10 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[calc(var(--rb-r-xl,12px))] border border-transparent bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] px-3.5 text-left text-[15px]/[20px] font-semibold whitespace-nowrap text-neutral-900 outline-none select-none transition-[border-color,box-shadow,background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-expanded:border-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-white aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:text-neutral-900/40 disabled:shadow-none dark:text-neutral-100 dark:hover:not-disabled:not-aria-invalid:not-aria-expanded:bg-neutral-900 dark:focus-visible:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:focus-visible:bg-neutral-900 dark:focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-expanded:border-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-900 dark:aria-expanded:shadow-[0_0_0_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:text-neutral-100/40",u)}>
          <span className="grid min-w-0 flex-1 text-left *:[grid-area:1/1]">
            {o.map(e=>(
              <span key={e.value} aria-hidden="true" className="invisible flex min-w-0 items-baseline gap-2">
                        <span className="truncate">{e.label}</span>
                        {e.hint&&<span className="truncate">{e.hint}</span>}
                      </span>
            ))}
            <span className="flex min-w-0 items-baseline gap-2">
              {S?<>
                <span className="truncate">{S.label}</span>
                {S.hint&&<span className={H(V,"truncate")}>{S.hint}</span>}
              </>:<span className={H("text-neutral-900/62 dark:text-neutral-100/62","truncate")}>{c}</span>}
            </span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/78 dark:text-neutral-100/78" />
        </button>
        {p&&<ul ref={y} id={h} role="listbox" tabIndex={-1} style={{maxHeight:g}} className={H("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100","absolute z-30 max-h-[264px] w-full min-w-[100%]",f?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,a)=>{
            let n=e.value===r;
            return (
              <li key={e.value} id={`${h}-${a}`} role="option" aria-selected={n} data-index={a} data-highlighted={a===m?"":undefined} onMouseEnter={()=>k(a)} onClick={()=>L(a)} className={H("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={V}>{e.hint}</span>}
                        </span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let es = [10,25];


export default function data_table_2__Sorbet__Component(){
  let{ref:e,edges:r,onScroll:a}=function(){
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
  }(),[o,s]=useState(new Set),[i,d]=useState(new Set(["PAY-0182","PAY-0185"])),[u,x]=useState(10),[_,h]=useState(1),p=Math.max(1,Math.ceil(er.length/u)),b=Math.min(_,p),m=(b-1)*u,k=er.slice(m,m+u),f=k.map(e=>e.id),v=f.filter(e=>i.has(e)).length,g=v===f.length&&f.length>0,w=useMemo(()=>er.filter(e=>i.has(e.id)).reduce((e,r)=>e+r.amount,0), [i]),j=()=>d(new Set),y=e=>h(Math.min(Math.max(e,1),p));
  return (
    <div className={H(B,I,"relative flex h-full min-h-[680px] w-full flex-col overflow-hidden")}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className={H(F,"flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <h2 className={H("text-[17px]/[22px] font-extrabold","min-w-0 flex-1 truncate")}>Outgoing payments</h2>
            <span className={H(K,V,"shrink-0")}>
              {er.length}
              {" pending"}
            </span>
          </header>
          {i.size>0?<div className={H("bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900","flex h-12 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <span aria-live="polite" className={G}>
              {i.size}
              {" selected"}
            </span>
            <span className={K}>{ea(w)}</span>
            <div className="ml-auto flex items-center gap-1">
              <button type="button" onClick={()=>{
                s(e=>new Set([...e,...i])),j()
              }} className={X}>
                <HugeiconsIcon icon={Icon_22670} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                <span className="max-sm:sr-only">Hold</span>
              </button>
              <button type="button" className={X}>
                <HugeiconsIcon icon={Icon_92752} size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                <span className="max-sm:sr-only">Export</span>
              </button>
              <button type="button" onClick={j} aria-label="Clear selection" className={X}>
                <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>:<div className={H(F,U,Y,"flex h-12 shrink-0 items-center px-4 sm:px-6")}>Select rows to approve, hold, or export a batch.</div>}
          <div className="relative min-h-0 flex-1">
            <div ref={e} onScroll={a} className="h-full overflow-auto">
              <table className={H("w-full border-separate border-spacing-0 text-left text-[15px]/[22px] font-medium","min-w-[720px]")}>
                <caption className="sr-only">Outgoing vendor payments</caption>
                <thead className={H(B,"sticky top-0 z-20")}>
                  <tr>
                    <th scope="col" className={H(Z,ee,"w-12")}>
                      <el checked={g} indeterminate={v>0&&!g} onChange={()=>d(e=>{
                        let r=new Set(e);
                        return g?f.forEach(e=>r.delete(e)):f.forEach(e=>r.add(e)),r;
                      })} label="Select all payments on this page" />
                    </th>
                    <th scope="col" className={H(Z,ee)}>Vendor</th>
                    <th scope="col" className={H(Z,ee,"w-[160px]")}>Owner</th>
                    <th scope="col" className={H(Z,ee,"w-[150px]")}>Status</th>
                    <th scope="col" className={H(Z,ee,"w-[120px] text-right")}>Amount</th>
                    <th scope="col" className={H(Z,ee,"w-[90px] text-right")}>Due</th>
                  </tr>
                </thead>
                <tbody>
                  {k.map(e=>{
                    let r=i.has(e.id);
                    return (
                      <tr key={e.id} aria-selected={r} className="group transition-[background-color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:not-aria-selected:bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] dark:hover:not-aria-selected:bg-neutral-100/4 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]">
                                        <td className={H(J,ee,"w-12")}>
                                          <el checked={r} onChange={()=>{
                                            let r;
                                            return r=e.id,d(e=>{
                                              let a=new Set(e);
                                              return a.has(r)?a.delete(r):a.add(r),a;
                                            });
                                          }} label={`Select ${e.vendor}`} />
                                        </td>
                                        <td className={H(J,ee,"max-w-[260px] py-1.5")}>
                                          <span className={H(G,"block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]")}>{e.vendor}</span>
                                          <span className={H("font-mono text-[12px]/[16px] tabular-nums",V,"block")}>{e.id}</span>
                                        </td>
                                        <td className={H(J,ee,"truncate")}><span className={Y}>{e.owner}</span></td>
                                        <td className={H(J,ee)}><en status={o.has(e.id)?"On hold":e.status} /></td>
                                        <td className={H(J,Q,ee)}>{ea(e.amount)}</td>
                                        <td className={H(J,Q,ee)}><span className={Y}>{e.due}</span></td>
                                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div aria-hidden="true" className={H("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
          </div>
          <footer className={H(F,"flex h-12 shrink-0 items-center gap-3 px-4 sm:px-6")}>
            <div className={H(U,Y,"hidden items-center gap-2 sm:flex")}>
              Rows per page
              <eo value={String(u)} onChange={e=>{
                x(Number(e)),h(1)
              }} options={es.map(e=>({value:String(e),label:String(e)}))} ariaLabel="Rows per page" triggerClassName="min-w-[0px]" />
            </div>
            <span className={q}>
              <span className={I}>
                {m+1}
                –
                {m+k.length}
              </span>
              {" "}
              {"of "}
              {er.length}
            </span>
            <div className="ml-auto flex items-center gap-1">
              <span className={H(q,"sm:hidden")}>
                {b}
                {" / "}
                {p}
              </span>
              <div className="flex items-stretch gap-1">
                <button type="button" aria-disabled={1===b} onClick={()=>y(b-1)} aria-label="Previous page" className={$}>
                  <HugeiconsIcon icon={Icon_58661} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                {Array.from({length:p},(e,r)=>r+1).map(e=><button key={e} type="button" onClick={()=>y(e)} aria-current={e===b?"page":undefined} className={H($,"max-sm:hidden")}>{e}</button>)}
                <button type="button" aria-disabled={b===p} onClick={()=>y(b+1)} aria-label="Next page" className={$}><HugeiconsIcon icon={Icon_5042} size={18} strokeWidth={2} aria-hidden="true" /></button>
              </div>
            </div>
          </footer>
        </div>
      </div>
  );
}
