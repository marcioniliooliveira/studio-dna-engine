/**
 * React Bits Pro — Application UI (app-shell-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, ownerDocument, querySelectorAll, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_22830 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_2605 = [["path",{d:"M15.6 8.40033V12.9003C15.6 14.3915 16.8088 15.6003 18.3 15.6003C19.7912 15.6003 21 14.3915 21 12.9003V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.0265 21 15.8965 20.3302 17.4009 19.2M15.6 12.0003C15.6 13.9886 13.9882 15.6003 12 15.6003C10.0118 15.6003 8.4 13.9886 8.4 12.0003C8.4 10.0121 10.0118 8.40033 12 8.40033C13.9882 8.40033 15.6 10.0121 15.6 12.0003Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_22670 = [["path",{d:"M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_44647 = [["path",{d:"M3 20.5002C3.28417 16.8058 6.3 13.7193 10.0008 13.5379C10.3134 13.5226 10.6446 13.5097 11 13.5L11.995 13.5663C12.6939 13.6129 13.3665 13.7543 14 13.9777",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 15.5V21.5M21 18.5L15 18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11",cy:"6.5",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_13473 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_68656 = [["path",{d:"M3.99963 5.00055L9.99963 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.9996 5.00031L19.9996 5.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M15.9996 9.00031L15.9996 15.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M9.99963 2.00031L9.99963 8.00031",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M11.9996 16.0003L11.9996 22.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M15.9996 12.0001L19.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M3.99963 12.0005L12.9996 12.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M11.9996 19.0003L19.9996 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"7"}],["path",{d:"M3.99963 19.0005L8.99963 19.0003",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"8"}]];
const Icon_96738 = [["path",{d:"M3.99219 10H11.9922C13.8521 10 14.7821 10 15.5451 10.2044C17.6157 10.7592 19.2329 12.3765 19.7877 14.4471C19.9922 15.2101 19.9922 16.1401 19.9922 18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.99219 6L6.83839 6.87652C4.94092 8.31801 3.99219 9.03875 3.99219 10C3.99219 10.9612 4.94092 11.682 6.83839 13.1235L7.99219 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_12556 = [["path",{d:"M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let j = (...e)=>e.filter(Boolean).join(" ");

function N(){
  let e=useRef(null),[t,a]=useState({start:false,end:false}),r=useCallback(()=>{
    let t=e.current;
    if(!t)return;
    let{scrollTop:r,scrollHeight:n,clientHeight:i}=t;
    a({start:r>1,end:Math.ceil(r+i)<n-1})
  }, []);
  return useEffect(()=>{
    r();
    let t=e.current,a=t?.ownerDocument.defaultView;
    if(!t||!a?.ResizeObserver)return;
    let n=new a.ResizeObserver(r);
    return observe(t),()=>disconnect();
  }, [r]),{ref:e,edges:t,onScroll:r};
}

let S = "bg-neutral-900/25 dark:bg-neutral-950/60",
  A = "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]",
  z = "text-neutral-900 dark:text-neutral-100",
  M = "text-neutral-900/80 dark:text-neutral-100/80",
  C = "text-neutral-900/66 dark:text-neutral-100/66",
  I = "text-[14px]/[16px] font-[450]",
  R = "text-[13px]/[18px] font-normal",
  W = "text-[12px]/[16px] font-normal tabular-nums",
  E = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  D = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  q = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  O = "size-8 rounded-[var(--rb-r-sm,6px)]",
  T = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none",
  F = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  L = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  B = "relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",
  P = "flex min-w-0 flex-1 flex-col gap-0.5",
  U = "pointer-events-none inline-flex min-h-6 w-fit max-w-64 items-center gap-2 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-2 py-1 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900",
  K = "transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none",
  G = "border-r border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900",
  H = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  Y = "bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900",
  $ = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900",
  V = [{id:"inbox",label:"Inbox",icon:Icon_22830},{id:"mentions",label:"Mentions",icon:Icon_2605,unread:true},{id:"snoozed",label:"Snoozed",icon:Icon_29635},{id:"sent",label:"Sent",icon:Icon_55410},{id:"archive",label:"Archive",icon:Icon_22670}],
  J = ["All","Unread","Assigned","Escalated"],
  Q = [{id:"c-4821",name:"Priya Raghunathan",email:"priya.raghunathan@lumenfield-logistics.example",subject:"Bulk import of 12,400 supplier records keeps failing at the validation step after the March schema change",preview:"We ran the import again last night and it stopped at 3,180 records. Every rejected row has a value in secondary_contact.",time:"09:24",received:"14 Mar 2025, 09:24",unread:true,assigned:true,escalated:false,body:["We ran the March supplier import last night and it stopped at 3,180 of 12,400 records. The job never fails outright, it sits at the validation step until the two-hour timeout and then reports a partial write.","Every record it rejects has a value in the secondary_contact column. The same rows imported cleanly on 6 March, so I think this is related to the schema change you shipped on the 11th.","I have attached the export we are using, trimmed to the first 500 rows so you can reproduce it without waiting for the full file. The shape is unchanged from the one we agreed at onboarding.","Two questions. Is secondary_contact still accepted, and if it has moved, is there a mapping we should apply before the next run? We have another 9,000 records queued behind this one.","For context on urgency: the queued records cover the four new depots we open on 24 March, and none of those suppliers can be dispatched against until they exist in Portway. Our planners are currently holding the lane assignments in a spreadsheet.","If the fix has to wait for a release, a temporary import path that skips validation on that one column would unblock us. We can clean the data afterwards, and I would rather do that than keep the depots on manual entry for another week.","The Rotterdam team needs them in place before Monday, so if a call today is faster than email I can make time from 14:00 onwards."],attachment:{name:"supplier-import-sample-500.csv",size:"2.4 MB"}},{id:"c-4820",name:"Daniel Okonkwo",email:"daniel.okonkwo@brightsea-freight.example",subject:"Rate card for the Rotterdam lane is showing last quarter's prices",preview:"Our dispatchers are quoting from a card that expired on 28 February. Nothing changed on our side, so I suspect the sync.",time:"08:51",received:"14 Mar 2025, 08:51",unread:true,assigned:false,escalated:false,body:["Our dispatchers are quoting the Rotterdam to Duisburg lane from a rate card that expired on 28 February. Nothing changed on our side, so I suspect the nightly sync is not picking up the new card.","The customer-facing quote tool shows the correct prices, which is the confusing part. It is only the dispatch board that is behind.","We can work around it for a day or two by quoting manually, but I would rather not have twelve people copying numbers out of a spreadsheet."]},{id:"c-4819",name:"Marta Lindqvist",email:"m.lindqvist@nordkust.example",subject:"Two drivers cannot sign in after the SSO migration",preview:"Both accounts were created before we moved to Okta. They get sent back to the login screen with no error message.",time:"Yesterday",received:"13 Mar 2025, 16:07",unread:true,assigned:true,escalated:false,body:["Two of our drivers cannot sign in to the mobile app after Tuesday's SSO migration. Both accounts were created before we moved to Okta.","They get sent back to the login screen with no error message, which makes it hard for them to tell us what went wrong. Everyone else on the same team signs in fine.","I have their employee numbers if that helps you find the accounts. Let me know what you need and I will get it to you today."]},{id:"c-4818",name:"Kenji Watanabe",email:"k.watanabe@harborline.example",subject:"Webhook retries are arriving out of order",preview:"We are seeing shipment.updated land before shipment.created for about one delivery in fifty. Our queue handles it, but the ordering guarantee in the docs says this should not happen.",time:"Yesterday",received:"13 Mar 2025, 11:42",unread:false,assigned:false,escalated:false,body:["We are seeing shipment.updated arrive before shipment.created for roughly one delivery in fifty. Our queue tolerates it, but the ordering guarantee in your documentation says this should not happen.","It started around the same time we increased our endpoint timeout from two to five seconds, so it may be on our side. I would like to rule out the retry logic first.","Is there a way to see the delivery attempts for a single event without opening a ticket each time?"]},{id:"c-4817",name:"Aisha Bello",email:"aisha.bello@sahelgroup.example",subject:"Read-only access for our finance team",preview:"Four people in finance need to see invoices and settlement reports without being able to change a shipment.",time:"Mon",received:"11 Mar 2025, 14:15",unread:false,assigned:true,escalated:false,body:["Four people in our finance team need to see invoices and settlement reports without being able to change a shipment or a rate.","The viewer role looks close, but it also hides the settlement export, which is the one thing they actually need.","Is there a way to grant the export on its own, or should we be looking at a custom role?"]},{id:"c-4816",name:"Tom\xe1s Ferreira",email:"tomas.ferreira@atlanticoport.example",subject:"Signed carrier agreement",preview:"",time:"Mon",received:"11 Mar 2025, 09:03",unread:false,assigned:false,escalated:false,body:["Attached is the countersigned carrier agreement for the 2025 season. No changes from the draft you sent on 4 March."],attachment:{name:"carrier-agreement-2025-signed.pdf",size:"812 KB"}},{id:"c-4815",name:"Hannah Weiss",email:"h.weiss@genoa-forwarding.example",subject:"Customs documents missing from the Genoa shipment",preview:"Container GNOA-77412 arrived without the packing list attached in the portal. The paper copy travelled with the driver.",time:"12 Mar",received:"12 Mar 2025, 08:30",unread:false,assigned:false,escalated:false,body:["Container GNOA-77412 arrived without the packing list attached in the portal. The paper copy travelled with the driver, so nothing was held up, but our broker needs the digital version for the file.","The upload shows as complete in the shipment timeline, which is why nobody noticed until the container was already on the water.","Can you check whether the document was stored and simply not linked?"]},{id:"c-4814",name:"Oliver Grant",email:"oliver.grant@meadowbank.example",subject:"Invoice 2025-0418 was charged twice",preview:"Both charges cleared on 10 March for \xa34,280.00. Our bank shows two separate authorisations, not a pending and a capture.",time:"11 Mar",received:"11 Mar 2025, 17:48",unread:false,assigned:false,escalated:false,body:["Invoice 2025-0418 was charged twice. Both charges cleared on 10 March for \xa34,280.00, and our bank shows two separate authorisations rather than a pending and a capture.","I have the reference numbers for both if you need them. A refund of the duplicate would be ideal, but a credit against the April invoice works as well."]},{id:"c-4813",name:"Sofia Marchetti",email:"s.marchetti@viadria.example",subject:"Filter the dispatch board by trailer type",preview:"We run reefers and dry vans out of the same yard and the planners scroll past most of the board to find the right one.",time:"9 Mar",received:"9 Mar 2025, 10:12",unread:false,assigned:false,escalated:false,body:["We run reefers and dry vans out of the same yard, and the planners scroll past most of the board to find the right trailer.","A filter on trailer type would save each of them a few minutes every hour. Saved views would be even better, but the filter alone would be enough.","Not urgent. I wanted to get it in front of you before the next planning cycle."]}],
  X = [{label:"Mark as unread",icon:Icon_22830},{label:"Snooze until Monday",icon:Icon_29635},{label:"Assign to a teammate",icon:Icon_44647},{label:"Mute this sender",icon:Icon_13473}];

function Z(e,t,a,r,i){
  useEffect(()=>{
    if(!e)return;
    let n=t.current,s=ownerDocument??document,l=()=>Array.from(querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??[]).filter(e=>!e.hasAttribute("disabled"));
    r.current&&(r.current=false,(i?.current??l()[0])?.focus({preventScroll:true}));
    let o=e=>{
      if("Escape"===e.key){
        e.preventDefault(),a();
        return
      }
      if("Tab"!==e.key)return;
      let t=l(),r=t[0],n=t[t.length-1];
      r&&n&&(e.shiftKey&&s.activeElement===r?(e.preventDefault(),focus({preventScroll:true})):e.shiftKey||s.activeElement!==n||(e.preventDefault(),r.focus({preventScroll:true})))
    };
    return s.addEventListener("keydown",o),()=>s.removeEventListener("keydown",o);
  }, [e,t,a,r,i])
}

function ee(){
  let[e,t]=useState("inbox"),[a,l]=useState("All"),[o,d]=useState(""),[u,h]=useState(Q[0].id),[ee,et]=useState([Q[0].id]),[ea,er]=useState([]),[en,ei]=useState([]),[es,el]=useState(false),[eo,ed]=useState(false),[ec,eu]=useState(false),[eh,ep]=useState(false),[ex,eb]=useState(false),[em,ef]=useState(false),[ev,eg]=useState(false),ek=useRef(null),ew=useRef(null),ey=useRef(null),e_=useRef(null),ej=useRef(null),eN=useRef(null),eS=useRef(null),eA=useRef(null),ez=useRef(null),{ref:eM,edges:eC,onScroll:eI}=N(),{ref:eR,edges:eW,onScroll:eE}=N(),{ref:eD,edges:eq,onScroll:eO}=N(),eT=useRef(null),eF=useRef(false),eL=useRef(false),eB=useRef(false),eP=useMemo(()=>{
    let e=o.trim().toLowerCase();
    return Q.filter(t=>!(ea.includes(t.id)||"Unread"===a&&ee.includes(t.id))&&("Assigned"!==a||!!t.assigned)&&("Escalated"!==a||!!t.escalated)&&(!e||t.name.toLowerCase().includes(e)||t.subject.toLowerCase().includes(e)||t.preview.toLowerCase().includes(e)));
  }, [ea,a,o,ee]),eU=Q.find(e=>e.id===u)??Q[0],eK="All"!==a||o.trim().length>0,eG=(e,t)=>{
    h(e),et(t=>t.includes(e)?t:[...t,e]),el(true),eB.current=t
  };
  useEffect(()=>{
    if(!es||!eB.current)return;
    eB.current=false;
    let e=ew.current;
    e&&null!==e.offsetParent&&e.focus({preventScroll:true})
  }, [es,u]);
  let eH=useCallback(()=>{
    ed(false),eu(false),ey.current?.focus({preventScroll:true})
  }, []),eY=useCallback(()=>{
    ef(false),eg(false),eA.current?.focus({preventScroll:true})
  }, []);
  Z(eo,e_,eH,eF),Z(em,ez,eY,eL,eT),useEffect(()=>{
    if(!eo)return;
    let e=requestAnimationFrame(()=>eu(true));
    return ()=>cancelAnimationFrame(e);
  }, [eo]),useEffect(()=>{
    if(!em)return;
    let e=requestAnimationFrame(()=>eg(true));
    return ()=>cancelAnimationFrame(e);
  }, [em]),useEffect(()=>{
    if(!eh)return;
    let e=eS.current,t=e?.ownerDocument??document,a=requestAnimationFrame(()=>eb(true)),r=e=>{
      ep(false),eb(false),e&&ej.current?.focus({preventScroll:true})
    },n=t=>{
      e?.contains(t.target)||r(false)
    },i=e=>{
      let a=Array.from(eN.current?.querySelectorAll('[role="menuitem"]')??[]);
      if(0===a.length)return;
      let n=a.indexOf(t.activeElement);
      "Escape"===e.key?(e.preventDefault(),r(true)):"ArrowDown"===e.key?(e.preventDefault(),a[n<0||n===a.length-1?0:n+1]?.focus({preventScroll:true})):"ArrowUp"===e.key?(e.preventDefault(),a[n<=0?a.length-1:n-1]?.focus({preventScroll:true})):"Home"===e.key?(e.preventDefault(),a[0]?.focus({preventScroll:true})):"End"===e.key&&(e.preventDefault(),a[a.length-1]?.focus({preventScroll:true}))
    };
    return t.addEventListener("pointerdown",n),t.addEventListener("keydown",i),()=>{
      cancelAnimationFrame(a),t.removeEventListener("pointerdown",n),t.removeEventListener("keydown",i)
    };
  }, [eh]);
  let e$=en.includes(eU.id);
  return (
    <div className={j("bg-white dark:bg-neutral-950",z,"relative flex h-full min-h-[720px] w-full overflow-hidden")}>
        <div className={j(G,"hidden w-14 shrink-0 flex-col items-center pb-3 lg:flex")}>
          <div className="flex h-14 shrink-0 items-center"><span className={j(A,"size-8",I)}>P</span></div>
          <nav aria-label="Mailboxes">
            <ul className="flex flex-col items-center gap-1">
              {V.map(({id:a,label:n,icon:s,unread:l})=>{
                let o=a===e;
                return (
                  <li key={a} className="relative">
                                <button type="button" aria-label={n} aria-current={o?"page":undefined} onClick={()=>t(a)} className={j(H,"peer relative justify-center")}>
                                  <HugeiconsIcon icon={s} size={16} strokeWidth={1.8} aria-hidden="true" />
                                  {l&&<span className="sr-only">Unread</span>}
                                </button>
                                <span role="tooltip" className={j(U,K,"absolute left-full top-1/2 z-[70] ml-2 h-7 -translate-y-1/2 whitespace-nowrap opacity-0 peer-hover:opacity-100 peer-focus-visible:opacity-100")}>{n}</span>
                              </li>
                );
              })}
            </ul>
          </nav>
          <div className="relative mt-auto">
            <button type="button" aria-label="Iris Renner, support lead" className={j(T,"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","peer size-9 cursor-pointer")}><span className={F}>IR</span></button>
            <span role="tooltip" className={j(U,K,"absolute bottom-1 left-full z-[70] ml-2 h-7 whitespace-nowrap opacity-0 peer-hover:opacity-100 peer-focus-visible:opacity-100")}>Iris Renner</span>
          </div>
        </div>
        <div className={j("bg-neutral-50 dark:bg-neutral-950","flex min-w-0 flex-1 gap-2 p-2")}>
          <section aria-labelledby="app-shell-5-list-heading" className={j(L,"w-full lg:w-80 lg:shrink-0 xl:w-96",es?"hidden lg:flex":"flex")}>
            <div className="flex h-14 shrink-0 items-center gap-2 px-3">
              <button ref={ey} type="button" aria-label="Open mailboxes" aria-expanded={eo} onClick={()=>{
                eF.current=true,ed(true)
              }} className={j(D,O,"lg:hidden")}>
                <HugeiconsIcon icon={Icon_1836} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <h2 id="app-shell-5-list-heading" className={I}>Inbox</h2>
              <span className={j(W,C)}>{eP.length}</span>
              <div className="ml-auto flex items-center gap-1">
                <button type="button" aria-label="Sort conversations" className={j(D,O)}>
                  <HugeiconsIcon icon={Icon_68656} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <button type="button" aria-label="Compose a reply" className={j(D,O)}>
                  <HugeiconsIcon icon={Icon_96738} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="relative shrink-0 px-3">
              <label htmlFor="app-shell-5-search" className="sr-only">Search conversations</label>
              <div className={j("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                  <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <input id="app-shell-5-search" type="search" value={o} onChange={e=>d(e.target.value)} placeholder="Search conversations" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
              </div>
            </div>
            <div role="radiogroup" aria-label="Filter conversations" className={j("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","mx-3 my-2.5 shrink-0")}>
              {J.map(e=>{
                let t=e===a;
                return <button key={e} type="button" role="radio" aria-checked={t} tabIndex={t?0:-1} onClick={()=>l(e)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e}</button>;
              })}
            </div>
            <div className="relative min-h-0 flex-1">
              <div ref={eM} onScroll={eI} className="h-full overflow-y-auto">
                {0===eP.length?<div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <span className="mb-3 flex h-10 w-10 items-center justify-center">
                    <HugeiconsIcon icon={Icon_22830} size={20} strokeWidth={1.8} aria-hidden="true" className={M} />
                  </span>
                  <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">{eK?"No conversations match":"Inbox is empty"}</p>
                  <p className={j("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>
                    {eK?"Nothing in this mailbox matches the current search and filter.":"Everything here has been deleted. Restore it if that was a mistake."}
                  </p>
                  <button type="button" onClick={()=>{
                    l("All"),d(""),er([])
                  }} className={j(E,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","mt-4")}>{eK?"Clear filters":"Restore conversations"}</button>
                </div>:<ul ref={ek} role="listbox" aria-label="Conversations" onKeyDown={e=>{
                  if(0===eP.length)return;
                  let t=eP.findIndex(e=>e.id===u),a=t;
                  if("ArrowDown"===e.key)a=t<0?0:Math.min(t+1,eP.length-1);else if("ArrowUp"===e.key)a=t<=0?0:t-1;else if("Home"===e.key)a=0;else if("End"===e.key)a=eP.length-1;else{
                    if("Enter"!==e.key)return;
                    e.preventDefault(),eG(u,true);
                    return
                  }
                  e.preventDefault();
                  let r=eP[a].id;
                  h(r),et(e=>e.includes(r)?e:[...e,r]),ek.current?.querySelector(`[data-conversation="${r}"]`)?.focus({preventScroll:true})
                }} className="divide-y divide-neutral-900/8 dark:divide-neutral-100/8">
                  {eP.map(e=>{
                    let t=e.id===eU.id,a=!ee.includes(e.id);
                    return (
                      <li key={e.id} role="presentation">
                                        <button type="button" role="option" aria-selected={t} tabIndex={t?0:-1} data-conversation={e.id} onClick={()=>eG(e.id,true)} className={j(B,t?"bg-neutral-900/9 dark:bg-neutral-100/9":"cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","cursor-pointer px-3")}>
                                          <span className={P}>
                                            <span className={j(I,a?z:M,"block truncate")}>{e.name}</span>
                                            <span className={j(R,"block truncate")}>{e.subject}</span>
                                            {e.preview&&<span data-description className={j("line-clamp-2 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>{e.preview}</span>}
                                          </span>
                                          <span className="flex shrink-0 flex-col items-end self-start">
                                            <span className="shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{e.time}</span>
                                            {a&&<span className={j("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100")}>Unread</span>}
                                          </span>
                                        </button>
                                      </li>
                    );
                  })}
                </ul>}
              </div>
              <div aria-hidden="true" className={j(Y,"pointer-events-none absolute inset-x-0 top-0 h-8",eC.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={j($,"pointer-events-none absolute inset-x-0 bottom-0 h-8",eC.end?"opacity-100":"opacity-0")} />
            </div>
          </section>
          <main className={j(L,"flex-1",es?"flex":"hidden lg:flex")}>
            <header className="flex h-14 shrink-0 items-center gap-2 px-4 sm:px-6">
              <button ref={ew} type="button" aria-label="Back to conversations" onClick={()=>{
                el(false);
                let e=ek.current?.querySelector('[role="option"][aria-selected="true"]');
                e?.focus({preventScroll:true})
              }} className={j(D,O,"lg:hidden")}>
                <HugeiconsIcon icon={Icon_18976} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <h1 className={j("text-[16px]/[20px] font-[450] tracking-[-0.015em]","min-w-0 flex-1 truncate")}>{eU.subject}</h1>
              <div className="flex items-center gap-1">
                <button type="button" aria-label="Reply" className={j(D,O)}>
                  <HugeiconsIcon icon={Icon_96738} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <button type="button" aria-label={e$?"Remove star":"Star this conversation"} aria-pressed={e$} onClick={()=>ei(e=>e.includes(eU.id)?e.filter(e=>e!==eU.id):[...e,eU.id])} className={j(D,O,"max-sm:hidden")}>
                  <HugeiconsIcon icon={Icon_12556} size={16} strokeWidth={1.8} aria-hidden="true" className={j(e$&&"[&_path]:fill-current")} />
                </button>
                <button type="button" aria-label="Archive" className={j(D,O,"max-sm:hidden")}>
                  <HugeiconsIcon icon={Icon_22670} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <button ref={eA} type="button" aria-label="Delete" onClick={()=>{
                  eL.current=true,ef(true)
                }} className={j(D,O,"max-sm:hidden")}>
                  <HugeiconsIcon icon={Icon_96037} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <div ref={eS} className="relative">
                  <button ref={ej} type="button" aria-label="More actions" aria-haspopup="menu" aria-expanded={eh} onClick={()=>{
                    eh?(ep(false),eb(false)):ep(true)
                  }} className={j(D,O)}>
                    <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  {eh&&<div ref={eN} role="menu" aria-label="More actions" className={j("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",K,"absolute right-0 top-full z-30 mt-1 w-56",ex?"opacity-100":"opacity-0")}>
                    {X.map(({label:e,icon:t})=>(
                      <button key={e} type="button" role="menuitem" onClick={()=>{
                                        ep(false),eb(false),ej.current?.focus({preventScroll:true})
                                      }} className="relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40">
                                        <HugeiconsIcon icon={t} size={16} strokeWidth={1.8} aria-hidden="true" />
                                        <span className="truncate">{e}</span>
                                      </button>
                    ))}
                  </div>}
                </div>
              </div>
            </header>
            <div className="relative min-h-0 flex-1">
              <div ref={eR} onScroll={eE} className="h-full overflow-y-auto p-4 sm:p-6">
                <div className="max-w-3xl">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className={I}>{eU.name}</p>
                      <p className={j(R,C,"mt-0.5 truncate")}>{eU.email}</p>
                    </div>
                    <p className={j(W,C,"shrink-0")}>{eU.received}</p>
                  </div>
                  <p className={j(R,C,"mt-2")}>To Portway support</p>
                  <div className={j("text-[14px]/[20px] font-normal","mt-5 space-y-4")}>{eU.body.map(e=><p key={e}>{e}</p>)}</div>
                  {eU.attachment&&<div className="mt-6">
                    <p className={j(W,C)}>Attachment</p>
                    <div className={j(L,"mt-2")}>
                      <div className={j(B,"px-2")}>
                        <span className={j("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","size-9")}>
                          <HugeiconsIcon icon={Icon_31964} size={16} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span className={P}>
                          <span className="flex max-w-full min-w-0 items-baseline gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100"><span className="truncate">{eU.attachment.name}</span></span>
                          <span className={j("text-[12px]/[16px] font-[450] tabular-nums",C)}>{eU.attachment.size}</span>
                        </span>
                        <span className="relative z-10 flex shrink-0 items-center gap-1">
                          <button type="button" aria-label={`Download ${eU.attachment.name}`} className={j(D,O)}>
                            <HugeiconsIcon icon={Icon_92752} size={16} strokeWidth={1.8} aria-hidden="true" />
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>}
                </div>
              </div>
              <div aria-hidden="true" className={j(Y,"pointer-events-none absolute inset-x-0 top-0 h-8",eW.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={j($,"pointer-events-none absolute inset-x-0 bottom-0 h-8",eW.end?"opacity-100":"opacity-0")} />
            </div>
          </main>
        </div>
        {eo&&<div className="lg:hidden">
          <button type="button" aria-label="Close mailboxes overlay" tabIndex={-1} onClick={eH} className={j(S,K,"absolute inset-0 z-30 cursor-pointer",ec?"opacity-100":"opacity-0")} />
          <nav ref={e_} role="dialog" aria-modal="true" aria-label="Mailboxes" className={j(G,"shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",K,"absolute inset-y-0 left-0 z-40 flex w-64 max-w-[85%] flex-col",ec?"opacity-100":"opacity-0")}>
            <div className="flex h-14 shrink-0 items-center gap-2.5 pr-2 pl-4">
              <span className={j(A,"size-8",I)}>P</span>
              <p className={j(I,"min-w-0 flex-1 truncate")}>Portway</p>
              <button type="button" aria-label="Close mailboxes" onClick={eH} className={j(D,O)}>
                <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <ul ref={eD} onScroll={eO} className="h-full space-y-0.5 overflow-y-auto px-2 pb-3">
                {V.map(({id:a,label:n,icon:s,unread:l})=>{
                  let o=a===e;
                  return (
                    <li key={a}>
                                    <button type="button" aria-current={o?"page":undefined} onClick={()=>{
                                      t(a),eH()
                                    }} className={H}>
                                      <HugeiconsIcon icon={s} size={16} strokeWidth={1.8} aria-hidden="true" />
                                      <span className="min-w-0 flex-1 truncate text-left">{n}</span>
                                      {l&&<span className="ms-auto text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">Unread</span>}
                                    </button>
                                  </li>
                  );
                })}
              </ul>
              <div aria-hidden="true" className={j("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",eq.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={j("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",eq.end?"opacity-100":"opacity-0")} />
            </div>
            <div className={j("border-t border-neutral-900/8 dark:border-neutral-100/8","flex shrink-0 items-center gap-2.5 py-2 pr-2 pl-4")}>
              <span className={T}><span className={F}>IR</span></span>
              <span className="min-w-0 flex-1">
                <span className={j(I,"block truncate")}>Iris Renner</span>
                <span className={j(W,C,"block truncate")}>Support lead</span>
              </span>
            </div>
          </nav>
        </div>}
        {em&&<>
          <div className={j(S,K,"absolute inset-0 z-40",ev?"opacity-100":"opacity-0")} />
          <div ref={ez} role="dialog" aria-modal="true" aria-labelledby="app-shell-5-confirm-title" aria-describedby="app-shell-5-confirm-body" className={j("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900",K,"absolute left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2",ev?"opacity-100":"opacity-0")}>
            <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
              <div className={j("relative flex flex-col gap-1.5 px-5 pt-5 pb-5 has-[button]:pe-14 [&:has(+*)]:pb-0","pe-[20px]")}>
                <h2 id="app-shell-5-confirm-title" className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">
                  {"Delete the thread from "}
                  {eU.name}
                  ?
                </h2>
                <p id="app-shell-5-confirm-body" className="text-[14px]/[20px] text-neutral-900/80 dark:text-neutral-100/80">It moves to trash and leaves the shared inbox for everyone on the team.</p>
              </div>
            </div>
            <div className={j("flex min-h-11 flex-wrap items-center justify-end gap-2 px-4 py-2 pe-2","flex-col-reverse max-sm:ps-2 sm:flex-row")}>
              <button ref={eT} type="button" onClick={eY} className={j(E,q,"w-full sm:w-auto")}>Keep it</button>
              <button type="button" onClick={()=>{
                let e=eP.filter(e=>e.id!==eU.id);
                er(e=>[...e,eU.id]),h(e[0]?.id??Q[0].id),ef(false),eg(false),el(false),ey.current?.focus({preventScroll:true})
              }} className={j("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-[oklch(60%_0.236_26)] bg-white text-[oklch(51%_0.18_26)] shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-[oklch(51%_0.18_26)] active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-[oklch(65.2%_0.219_26)] dark:bg-neutral-900 dark:text-[oklch(76%_0.14_26)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-[oklch(76%_0.14_26)] dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",q,"w-full sm:w-auto")}>Delete conversation</button>
            </div>
          </div>
        </>}
      </div>
  );
}


export default ee;
