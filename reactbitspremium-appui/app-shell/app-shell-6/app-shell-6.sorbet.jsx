/**
 * React Bits Pro — Application UI (app-shell-6 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, docs, focus, id, name, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_62714 = [["path",{d:"M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_76021 = [["path",{d:"M17 21C16.3932 20.4102 14 18.8403 14 18C14 17.1597 16.3932 15.5898 17 15M15 18H22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 21C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12V14",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_85018 = [["path",{d:"M3.49902 14.9656C4.72475 18.4791 8.06749 21 11.999 21C16.9696 21 20.999 16.9706 20.999 12C20.999 7.02944 16.9696 3 11.999 3C8.29827 3 4.8984 5.6756 3.68943 8.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.999 7V12L14.999 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M7.49751 8.74363C7.49751 8.74363 3.81388 9.3026 3.25487 8.7436C2.69585 8.1846 3.25488 4.50098 3.25488 4.50098",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_48240 = [["path",{d:"M8 5.5L20 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L20 12.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 19.5L20 19.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M4.375 5.5H4.25M4.5 5.5C4.5 5.63807 4.38807 5.75 4.25 5.75C4.11193 5.75 4 5.63807 4 5.5C4 5.36193 4.11193 5.25 4.25 5.25C4.38807 5.25 4.5 5.36193 4.5 5.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M4.375 12.5H4.25M4.5 12.5C4.5 12.6381 4.38807 12.75 4.25 12.75C4.11193 12.75 4 12.6381 4 12.5C4 12.3619 4.11193 12.25 4.25 12.25C4.38807 12.25 4.5 12.3619 4.5 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M4.375 19.5H4.25M4.5 19.5C4.5 19.6381 4.38807 19.75 4.25 19.75C4.11193 19.75 4 19.6381 4 19.5C4 19.3619 4.11193 19.25 4.25 19.25C4.38807 19.25 4.5 19.3619 4.5 19.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_30322 = [["path",{d:"M10 8C10 9.88562 10 10.8284 9.41421 11.4142C8.82843 12 7.88562 12 6 12C4.11438 12 3.17157 12 2.58579 11.4142C2 10.8284 2 9.88562 2 8C2 6.11438 2 5.17157 2.58579 4.58579C3.17157 4 4.11438 4 6 4C7.88562 4 8.82843 4 9.41421 4.58579C10 5.17157 10 6.11438 10 8Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 7L10 11.4821C10 15.4547 7.48429 18.8237 4 20",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M22 8C22 9.88562 22 10.8284 21.4142 11.4142C20.8284 12 19.8856 12 18 12C16.1144 12 15.1716 12 14.5858 11.4142C14 10.8284 14 9.88562 14 8C14 6.11438 14 5.17157 14.5858 4.58579C15.1716 4 16.1144 4 18 4C19.8856 4 20.8284 4 21.4142 4.58579C22 5.17157 22 6.11438 22 8Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M22 7L22 11.4821C22 15.4547 19.4843 18.8237 16 20",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_81320 = [["path",{d:"M17 8L18.8398 9.85008C19.6133 10.6279 20 11.0168 20 11.5C20 11.9832 19.6133 12.3721 18.8398 13.1499L17 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 8L5.16019 9.85008C4.38673 10.6279 4 11.0168 4 11.5C4 11.9832 4.38673 12.3721 5.16019 13.1499L7 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 4L9.5 20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_33786 = [["path",{d:"M14.9961 17H16.9961C19.7575 17 21.9961 14.7614 21.9961 12C21.9961 9.23858 19.7575 7 16.9961 7H14.9961M8.99609 17H6.99609C4.23467 17 1.99609 14.7614 1.99609 12C1.99609 9.23858 4.23467 7 6.99609 7H8.99609",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.49609 12H15.4961",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_5042 = [["path",{d:"M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_71497 = [["path",{d:"M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];
const Icon_64132 = [["path",{d:"M5 6C5 4.58579 5 3.87868 5.43934 3.43934C5.87868 3 6.58579 3 8 3H12.5789C15.0206 3 17 5.01472 17 7.5C17 9.98528 15.0206 12 12.5789 12H5V6Z",stroke:"currentColor",fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12.4286 12H13.6667C16.0599 12 18 14.0147 18 16.5C18 18.9853 16.0599 21 13.6667 21H8C6.58579 21 5.87868 21 5.43934 20.5607C5 20.1213 5 19.4142 5 18V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_17771 = [["path",{d:"M12 4H19",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 20L16 4",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 20H12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_22244 = [["path",{d:"M4 12H20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 7.66667C17.5 5.08934 15.0376 3 12 3C8.96243 3 6.5 5.08934 6.5 7.66667C6.5 8.15279 6.55336 8.59783 6.6668 9M6 16.3333C6 18.9107 8.68629 21 12 21C15.3137 21 18 19.6667 18 16.3333C18 13.9404 16.9693 12.5782 14.9079 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];

let y = (...e)=>e.filter(Boolean).join(" ");

function j(){
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
}

let N = "text-neutral-900 dark:text-neutral-100";

let A = "text-neutral-900/78 dark:text-neutral-100/78";

let S = "text-neutral-900/62 dark:text-neutral-100/62";

let z = "text-[15px]/[20px] font-bold";

let C = "text-[13px]/[16px] font-semibold tabular-nums";

let D = "font-mono text-[12px]/[16px] tabular-nums";

let R = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let rq = (...e)=>e.filter(Boolean).join(" ");

function rH(){
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
}

let r$ = "text-neutral-900 dark:text-neutral-100";

let rB = "text-neutral-900/78 dark:text-neutral-100/78";

let rK = "text-[17px]/[22px] font-extrabold";

let rU = "text-[15px]/[22px] font-medium";

let rV = "text-[15px]/[20px] font-bold";

let rJ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let rQ = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let rG = "inline-flex w-fit max-w-full items-stretch gap-1 rounded-[calc(var(--rb-r-full,999px)_+_min(4px,var(--rb-r-full,999px)))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] dark:bg-neutral-950 shadow-[inset_0_1px_2px_rgb(84_62_32/0.09),inset_0_0_0_1px_rgb(84_62_32/0.035)] dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.045)] p-1";

let rX = "h-10";

let rY = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let rZ = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let r0 = rq(rV,r$,"hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]");

let r1 = [{id:"product",name:"Product specs",docs:[{id:"checkout",title:"Checkout redesign",updated:"6 March 2025",author:"Priya Raman",words:1420},{id:"saved-methods",title:"Saved payment methods",updated:"27 February 2025",author:"Mara Vogt",words:860},{id:"refunds",title:"Refund policy for marketplace sellers and connected accounts",updated:"12 March 2025",author:"Elena Costa",words:2310},{id:"disputes",title:"Dispute handling",updated:"4 March 2025",author:"Elena Costa",words:1180},{id:"payouts",title:"Payout scheduling",updated:"19 February 2025",author:"Tobias Lindqvist",words:740},{id:"onboarding",title:"Merchant onboarding",updated:"28 January 2025",author:"Priya Raman",words:1960},{id:"currencies",title:"Currency support",updated:"11 February 2025",author:"Tobias Lindqvist",words:520}]},{id:"notes",name:"Meeting notes",docs:[{id:"sync-14-mar",title:"Weekly sync, 14 March",updated:"14 March 2025",author:"Elena Costa",words:430},{id:"q2-planning",title:"Q2 planning",updated:"5 March 2025",author:"Priya Raman",words:980},{id:"postmortem",title:"Payout delay postmortem",updated:"26 February 2025",author:"Tobias Lindqvist",words:1120}]},{id:"engineering",name:"Engineering",docs:[{id:"webhooks",title:"Webhook retry schedule",updated:"14 March 2025",author:"Mara Vogt",words:812},{id:"versioning",title:"API versioning",updated:"9 March 2025",author:"Tobias Lindqvist",words:1340},{id:"ledger",title:"Ledger migration plan",updated:"2 March 2025",author:"Priya Raman",words:3080},{id:"idempotency",title:"Idempotency keys",updated:"21 February 2025",author:"Mara Vogt",words:690},{id:"runbook",title:"Incident runbook",updated:"13 March 2025",author:"Elena Costa",words:1570},{id:"rate-limits",title:"Rate limits",updated:"7 March 2025",author:"Tobias Lindqvist",words:640},{id:"signing-keys",title:"Signing key rotation",updated:"24 February 2025",author:"Mara Vogt",words:1050},{id:"queues",title:"Queue backpressure",updated:"18 February 2025",author:"Priya Raman",words:1490},{id:"sandbox",title:"Sandbox data reset",updated:"9 January 2025",author:"",words:210}]}];

let r2 = r1.flatMap(e=>e.docs);

let r5 = "webhooks";

let r6 = [{label:"Duplicate",icon:Icon_62714},{label:"Move to folder",icon:Icon_76021},{label:"Version history",icon:Icon_85018},{label:"Export as Markdown",icon:Icon_92752},{label:"Move to trash",icon:Icon_96037,danger:true}];

let r8 = [{label:"Bulleted list",icon:Icon_48240},{label:"Quote",icon:Icon_30322},{label:"Code block",icon:Icon_81320},{label:"Link",icon:Icon_33786}];

let r4 = `retry:
  initial_delay: 30s
  multiplier: 3
  max_delay: 6h
  max_attempts: 21
  jitter: 0.2`;

function r9({label:e,items:a,className:r,align:i="end"}){
  let[o,s]=useState(false),[c,d]=useState(false),u=useRef(null),_=useRef(null),b=useRef(null),p=e=>{
    s(false),e&&_.current?.focus({preventScroll:true})
  };
  useEffect(()=>{
    if(!o)return;
    let e=u.current?.ownerDocument??document,a=()=>Array.from(b.current?.querySelectorAll('[role="menuitem"]')??[]);
    a()[0]?.focus({preventScroll:true});
    let r=e=>{
      u.current?.contains(e.target)||p(false)
    },t=r=>{
      let t=a();
      if(0===t.length)return;
      let n=t.indexOf(e.activeElement);
      "Escape"===r.key?(r.preventDefault(),p(true)):"ArrowDown"===r.key?(r.preventDefault(),t[n<0||n===t.length-1?0:n+1]?.focus({preventScroll:true})):"ArrowUp"===r.key?(r.preventDefault(),t[n<=0?t.length-1:n-1]?.focus({preventScroll:true})):"Home"===r.key?(r.preventDefault(),t[0]?.focus({preventScroll:true})):"End"===r.key?(r.preventDefault(),t[t.length-1]?.focus({preventScroll:true})):"Tab"===r.key&&p(false)
    };
    return e.addEventListener("pointerdown",r),e.addEventListener("keydown",t),()=>{
      e.removeEventListener("pointerdown",r),e.removeEventListener("keydown",t)
    };
  }, [o]);
  let h=e=>{
    d(e),s(true)
  };
  return (
    <div ref={u} className={rq("relative shrink-0",r)}>
        <button ref={_} type="button" aria-label={e} aria-haspopup="menu" aria-expanded={o} onClick={()=>o?p(false):h(true)} onKeyDown={e=>{
          "ArrowDown"!==e.key||o||(e.preventDefault(),h(false))
        }} className={rq(rJ,rQ)}>
          <HugeiconsIcon icon={Icon_59649} size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        {o&&<div ref={b} role="menu" aria-label={e} className={rq("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",c&&rY,"absolute top-full z-30 mt-1 w-56","start"===i?"left-0":"right-0")}>
          {a.map(({label:e,icon:a,danger:r})=>(
            <Fragment key={e}>
                    {r&&<div role="separator" className="mx-1 my-2 h-[1.5px] rounded-[calc(var(--rb-r-full,999px))] bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_88%,white)] dark:bg-neutral-100/8" />}
                    <button type="button" role="menuitem" tabIndex={-1} onClick={()=>p(true)} className={r?"relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold outline-none select-none [&_svg]:shrink-0 text-[oklch(51%_0.18_26)] hover:bg-[oklch(96%_0.03_26)] focus-visible:bg-[oklch(96%_0.03_26)] data-[highlighted]:bg-[oklch(96%_0.03_26)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-[oklch(78%_0.13_26)] dark:hover:bg-[oklch(30%_0.065_26)] dark:focus-visible:bg-[oklch(30%_0.065_26)] dark:data-[highlighted]:bg-[oklch(30%_0.065_26)] dark:aria-disabled:text-neutral-100/40":"relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40"}>
                      <HugeiconsIcon icon={a} size={16} strokeWidth={2} aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate">{e}</span>
                    </button>
                  </Fragment>
          ))}
        </div>}
      </div>
  );
}

function r3({titles:e,expanded:a,onToggleFolder:r,selectedId:i,onSelect:o,activeId:s,onActivate:c}){
  let d=useRef(null),u=e=>{
    e&&(e.focus({preventScroll:true}),e.dataset.id&&c(e.dataset.id))
  };
  return (
    <ul ref={d} role="tree" aria-label="Documents" onKeyDown={e=>{
        let a=Array.from(d.current?.querySelectorAll('[role="treeitem"]')??[]);
        if(0===a.length)return;
        let t=d.current?.ownerDocument??document,n=a.indexOf(t.activeElement),l=a[n];
        switch(e.key){case"ArrowDown":e.preventDefault(),u(a[Math.min(n+1,a.length-1)]);break;case"ArrowUp":e.preventDefault(),u(a[Math.max(n-1,0)]);break;case"Home":e.preventDefault(),u(a[0]);break;case"End":e.preventDefault(),u(a[a.length-1]);break;case"ArrowRight":{
          if(!l)return;
          e.preventDefault();
          let t=l.getAttribute("aria-expanded");
          "false"===t&&l.dataset.id?r(l.dataset.id):"true"===t&&u(a[n+1]);
          break
        }case"ArrowLeft":{
          if(!l)return;
          if(e.preventDefault(),"true"===l.getAttribute("aria-expanded")&&l.dataset.id){
            r(l.dataset.id);
            break
          }
          let t=l.dataset.parent;
          if(!t)break;
          u(a.find(e=>e.dataset.id===t))
        }}
      }} className="space-y-0.5">
        {r1.map((n,d)=>{
          let u=a[id];
          return (
            <li key={id} role="none">
                    <button type="button" role="treeitem" data-id={id} aria-expanded={u} aria-selected={false} aria-level={1} aria-posinset={d+1} aria-setsize={r1.length} tabIndex={s===id?0:-1} onClick={()=>{
                      c(id),r(id)
                    }} className={rq(rZ,"group")}>
                      <span className="flex size-4 shrink-0 items-center justify-center">
                        <HugeiconsIcon icon={Icon_5042} size={14} strokeWidth={2} aria-hidden="true" className="shrink-0 text-neutral-900/62 dark:text-neutral-100/62 transition-transform duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-aria-expanded:rotate-90" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-left">{name}</span>
                    </button>
                    {u&&<ul role="group" aria-label={name} className="space-y-0.5 pt-0.5">
                      {docs.map((a,r)=>{
                        let l=a.id===i;
                        return (
                          <li key={a.id} role="none">
                                        <button type="button" role="treeitem" data-id={a.id} data-parent={id} aria-level={2} aria-posinset={r+1} aria-setsize={docs.length} aria-selected={l} aria-current={l?"page":undefined} tabIndex={s===a.id?0:-1} onClick={()=>{
                                          c(a.id),o(a.id)
                                        }} className={rq(rZ,"pl-8")}><span className="min-w-0 flex-1 truncate text-left">{e[a.id]}</span></button>
                                      </li>
                        );
                      })}
                    </ul>}
                  </li>
          );
        })}
      </ul>
  );
}

function r7({titles:e,expanded:a,onToggleFolder:r,selectedId:n,onSelect:i,activeId:o,onActivate:s,onClose:c}){
  let{ref:d,edges:u,onScroll:x}=rH();
  return (
    <>
        <div className="flex h-14 shrink-0 items-center gap-2 pr-2 pl-4">
          <p className={rq(rV,"min-w-0 flex-1 truncate")}>Halden docs</p>
          <button type="button" aria-label="New document" className={rq(rJ,rQ)}>
            <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          {c&&<button type="button" aria-label="Close documents" onClick={c} className={rq(rJ,rQ)}>
            <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
          </button>}
        </div>
        <div className="relative min-h-0 flex-1">
          <nav ref={d} onScroll={x} aria-label="Documents" className="h-full overflow-y-auto px-2 pb-2">
            <r3 titles={e} expanded={a} onToggleFolder={r} selectedId={n} onSelect={i} activeId={o} onActivate={s} />
          </nav>
          <div aria-hidden="true" className={rq(c?"bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950":"bg-linear-to-b from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",u.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={rq(c?"bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950":"bg-linear-to-t from-[var(--rb-n-100,oklch(97.7%_0.0055_80))] to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",u.end?"opacity-100":"opacity-0")} />
        </div>
        <div className="shrink-0 px-2 pb-3 pt-2">
          <button type="button" className={rZ}>
            <HugeiconsIcon icon={Icon_96037} size={18} strokeWidth={2} aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-left">Trash</span>
            <span className="ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">6</span>
          </button>
        </div>
      </>
  );
}

function te({label:e,icon:a,pressed:r,onToggle:n}){
  return <button type="button" aria-label={e} aria-pressed={r} onClick={n} className={rq(rJ,"size-8 rounded-[calc(var(--rb-r-full,999px))]")}><HugeiconsIcon icon={a} size={18} strokeWidth={2} aria-hidden="true" /></button>;
}


export default function app_shell_6__Sorbet__Component(){
  let[e,a]=useState(()=>Object.fromEntries(r2.map(e=>[e.id,e.title]))),[r,i]=useState({product:true,engineering:true,notes:false}),[o,s]=useState(r5),[c,d]=useState(r5),[u,_]=useState({bold:true,italic:false,strikethrough:false,list:false,quote:false,code:false}),[x,b]=useState(false),[p,h]=useState(false),m=useRef(false),k=useRef(null),f=useRef(null),g=useRef(null),{ref:w,edges:y,onScroll:j}=rH(),{ref:N,edges:A,onScroll:S}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollLeft:t,scrollWidth:n,clientWidth:l}=a;
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
  useEffect(()=>{
    let e=(k.current?.ownerDocument.defaultView??window).matchMedia("(max-width: 1023px)"),a=false,r=()=>{
      !a&&e.matches&&(a=true,b(true))
    },t=requestAnimationFrame(r);
    return e.addEventListener("change",r),()=>{
      cancelAnimationFrame(t),e.removeEventListener("change",r)
    };
  }, []),useEffect(()=>{
    if(!x)return;
    let e=f.current,a=requestAnimationFrame(()=>h(true)),r=e?.ownerDocument??document,t=()=>Array.from(e?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??[]).filter(e=>!e.hasAttribute("disabled"));
    m.current&&(t()[0]?.focus({preventScroll:true}),m.current=false);
    let n=e=>{
      if("Escape"===e.key){
        b(false),h(false),k.current?.focus({preventScroll:true});
        return
      }
      if("Tab"!==e.key)return;
      let a=t(),n=a[0],l=a[a.length-1];
      n&&l&&(e.shiftKey&&r.activeElement===n?(e.preventDefault(),l.focus({preventScroll:true})):e.shiftKey||r.activeElement!==l||(e.preventDefault(),focus({preventScroll:true})))
    };
    return r.addEventListener("keydown",n),()=>{
      cancelAnimationFrame(a),r.removeEventListener("keydown",n)
    };
  }, [x]),useEffect(()=>{
    g.current?.scrollTo({top:0})
  }, [o]);
  let z=()=>{
    b(false),h(false),k.current?.focus({preventScroll:true})
  },C=e=>{
    i(a=>({...a,[e]:!a[e]}));
    let a=r1.find(a=>a.id===e);
    r[e]&&a?.docs.some(e=>e.id===c)&&c!==e&&d(e)
  },D=r2.find(e=>e.id===o)??r2[0],R=e[D.id];
  return (
    <div className={rq("bg-white dark:bg-neutral-950",r$,"relative flex h-full min-h-[720px] w-full overflow-hidden")}>
        <aside className={rq("border-r border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","hidden w-64 shrink-0 flex-col lg:flex")}>
          <r7 titles={e} expanded={r} onToggleFolder={C} selectedId={o} onSelect={s} activeId={c} onActivate={d} />
        </aside>
        <div className={rq("bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex min-w-0 flex-1 flex-col p-2")}>
          <div className={rq("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","min-h-0 flex-1")}>
            <header className="flex h-14 shrink-0 items-center gap-2 px-4 sm:px-6">
              <button ref={k} type="button" aria-label="Open documents" aria-expanded={x} onClick={()=>{
                m.current=true,b(true)
              }} className={rq(rJ,rQ,"lg:hidden")}><HugeiconsIcon icon={Icon_1836} size={18} strokeWidth={2} aria-hidden="true" /></button>
              <div className="min-w-0 flex-1">
                <input value={R} aria-label="Document title" onChange={e=>a(a=>({...a,[D.id]:e.target.value}))} className={rq(r0,"h-8 w-full max-w-[20rem] px-2")} />
              </div>
              <span aria-live="polite" className={rq("inline-flex items-start gap-1.5 text-[15px]/[20px] font-bold tabular-nums","text-neutral-900/78 dark:text-neutral-100/78","shrink-0 max-sm:hidden")}>Saved</span>
              <button type="button" className={rq("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none","h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold")}>
                <HugeiconsIcon icon={Icon_71497} size={18} strokeWidth={2} aria-hidden="true" />
                Share
              </button>
              <r9 label="Document actions" items={r6} />
            </header>
            <div className={rq("bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex h-12 shrink-0 items-center gap-2 px-4 sm:px-6")}>
              <div role="group" aria-label="Text style" className={rq(rG,rX,"shrink-0")}>
                <te label="Bold" icon={Icon_64132} pressed={u.bold} onToggle={()=>_(e=>({...e,bold:!e.bold}))} />
                <te label="Italic" icon={Icon_17771} pressed={u.italic} onToggle={()=>_(e=>({...e,italic:!e.italic}))} />
                <te label="Strikethrough" icon={Icon_22244} pressed={u.strikethrough} onToggle={()=>_(e=>({...e,strikethrough:!e.strikethrough}))} />
              </div>
              <div role="group" aria-label="Block style" className={rq(rG,rX,"shrink-0 max-md:hidden")}>
                <te label="Bulleted list" icon={Icon_48240} pressed={u.list} onToggle={()=>_(e=>({...e,list:!e.list}))} />
                <te label="Quote" icon={Icon_30322} pressed={u.quote} onToggle={()=>_(e=>({...e,quote:!e.quote}))} />
                <te label="Code block" icon={Icon_81320} pressed={u.code} onToggle={()=>_(e=>({...e,code:!e.code}))} />
              </div>
              <button type="button" aria-label="Insert link" className={rq(rJ,rQ,"max-md:hidden")}>
                <HugeiconsIcon icon={Icon_33786} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
              <r9 label="More formatting" items={r8} align="start" className="md:hidden" />
              <span className={rq("shrink-0 text-[14px]/[20px] font-semibold tabular-nums text-neutral-900/62 dark:text-neutral-100/62","ml-auto")}>
                {String(D.words).replace(/\B(?=(\d{3})+(?!\d))/g,",")}
                {" words"}
              </span>
            </div>
            <div className="relative flex min-h-0 flex-1 flex-col">
              <main ref={e=>{
                g.current=e,w.current=e
              }} onScroll={j} className="h-full overflow-y-auto">
                <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
                  <h1 className="text-[26px]/[32px] font-extrabold tracking-[-0.015em]">{R}</h1>
                  <p className={rq("text-[14px]/[20px] font-medium","text-neutral-900/62 dark:text-neutral-100/62","mt-2")}>
                    {"Last edited "}
                    {D.updated}
                    {" by"}
                    {" "}
                    {D.author||<span className="text-neutral-900/62 dark:text-neutral-100/62">None</span>}
                  </p>
                  <p className={rq(rU,rB,"mt-6")}>
                    Every webhook Halden sends is retried until the endpoint accepts it or the schedule runs out. This page describes the schedule as it behaves in production today, so support and integration engineers can answer a merchant’s question without reading the delivery service.
                  </p>
                  <p className={rq(rU,rB,"mt-4")}>
                    Retries are tracked per endpoint rather than per account. If a merchant has three endpoints registered and one of them is unreachable, deliveries to the other two are unaffected and stay on time.
                  </p>
                  <h2 className={rq(rK,"mt-8")}>Timing</h2>
                  <p className={rq(rU,rB,"mt-3")}>
                    The first retry is sent 30 seconds after a failed attempt. Each attempt after that waits about three times as long as the one before it, up to a ceiling of six hours. A delivery is abandoned after 21 attempts, which works out to just under three days.
                  </p>
                  <div className={rq("relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]","mt-4")}>
                    <pre ref={N} onScroll={S} className="overflow-auto bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] py-3.5 font-mono text-[13px]/[21px] tabular-nums text-neutral-900 dark:text-neutral-100 [scrollbar-width:thin] dark:bg-neutral-950/60">
                      {r4.split("\n").map((e,a)=><span key={a} className="flex px-4"><span className="min-w-0 flex-1 whitespace-pre">{e}</span></span>)}
                    </pre>
                    <div aria-hidden="true" className={rq("bg-linear-to-r from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-y-0 left-0 w-8",A.start?"opacity-100":"opacity-0")} />
                    <div aria-hidden="true" className={rq("bg-linear-to-l from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-y-0 right-0 w-8",A.end?"opacity-100":"opacity-0")} />
                  </div>
                  <h2 className={rq(rK,"mt-8")}>What counts as a failure</h2>
                  <p className={rq(rU,rB,"mt-3")}>
                    An attempt fails when any of the following happens. Everything else, including a slow but successful response, counts as delivered.
                  </p>
                  <ul className={rq(rU,rB,"mt-3 list-disc space-y-2 pl-5")}>
                    <li>The endpoint returns a status outside the 2xx range, including redirects.</li>
                    <li>The connection is not established within 10 seconds.</li>
                    <li>The response body has not arrived 30 seconds after the request was sent.</li>
                    <li>The TLS certificate cannot be verified against the public trust store.</li>
                  </ul>
                  <h2 className={rq(rK,"mt-8")}>Replaying a delivery</h2>
                  <p className={rq(rU,rB,"mt-3")}>
                    Support can replay a single delivery from the endpoint page. A replay sends the payload as it was recorded when the event happened, so a replayed charge still carries the amount that was charged at the time rather than the amount on the account today.
                  </p>
                  <p className={rq(rU,rB,"mt-4")}>
                    Replays do not reset the retry counter and do not extend the three day window. If a merchant needs deliveries older than that, read them from the events API instead and reconcile against the ledger export.
                  </p>
                </article>
              </main>
              <div aria-hidden="true" className={rq("bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 top-0 h-8",y.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={rq("bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","pointer-events-none absolute inset-x-0 bottom-0 h-8",y.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
        {x&&<div className="lg:hidden">
          <button type="button" aria-label="Close documents overlay" tabIndex={-1} onClick={z} className={rq("bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70",rY,"absolute inset-0 z-30 cursor-pointer",p?"opacity-100":"opacity-0")} />
          <aside ref={f} role="dialog" aria-modal="true" aria-label="Documents" className={rq("flex h-full min-h-0 flex-col bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",rY,"absolute inset-y-0 left-0 z-40 w-72 max-w-[85%]",p?"opacity-100":"opacity-0")}>
            <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:last-child]:mb-1">
              <r7 titles={e} expanded={r} onToggleFolder={C} selectedId={o} onSelect={s} activeId={c} onActivate={d} onClose={z} />
            </div>
          </aside>
        </div>}
      </div>
  );
}
