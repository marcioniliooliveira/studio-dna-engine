/**
 * React Bits Pro — Application UI (app-shell-9 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_27151 = [["path",{d:"M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_78805 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 15H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21 9H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_86829 = [["ellipse",{cx:"12",cy:"5",rx:"8",ry:"3",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 10.842C7.60158 11.0229 8.27434 11.1718 9 11.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M7 17.842C7.60158 18.0229 8.27434 18.1718 9 18.282",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_67812 = [["path",{d:"M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_81320 = [["path",{d:"M17 8L18.8398 9.85008C19.6133 10.6279 20 11.0168 20 11.5C20 11.9832 19.6133 12.3721 18.8398 13.1499L17 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 8L5.16019 9.85008C4.38673 10.6279 4 11.0168 4 11.5C4 11.9832 4.38673 12.3721 5.16019 13.1499L7 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 4L9.5 20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_87924 = [["path",{d:"M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_92190 = [["path",{d:"M11 6L21 6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 12L21 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 18L21 18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_12556 = [["path",{d:"M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_92916 = [["path",{d:"M17.7458 2.49963C19.3896 2.49963 20.2115 2.49963 20.7646 2.95361C20.8659 3.03672 20.9588 3.12958 21.0419 3.23085C21.4958 3.78402 21.4958 4.60589 21.4958 6.24963C21.4958 7.89338 21.4958 8.71525 21.0419 9.26842C20.9588 9.36969 20.8659 9.46255 20.7646 9.54566C20.2115 9.99963 19.3896 9.99963 17.7458 9.99963L6.74585 9.99963C5.10211 9.99963 4.28024 9.99963 3.72706 9.54565C3.62579 9.46255 3.53294 9.36969 3.44983 9.26842C2.99585 8.71525 2.99585 7.89337 2.99585 6.24963C2.99585 4.60589 2.99585 3.78402 3.44983 3.23085C3.53294 3.12958 3.62579 3.03672 3.72706 2.95361C4.28024 2.49963 5.10211 2.49963 6.74585 2.49963L17.7458 2.49963Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.7459 13.9998C19.3898 13.9997 20.2117 13.9997 20.7649 14.4537C20.8661 14.5368 20.959 14.6296 21.0421 14.7308C21.4961 15.284 21.4961 16.106 21.4961 17.7499C21.4961 19.3936 21.4961 20.2155 21.0421 20.7687C20.959 20.87 20.8662 20.9628 20.765 21.0459C20.2118 21.4999 19.3899 21.4999 17.7461 21.4999L15.7458 21.5C14.1019 21.5 13.28 21.5001 12.7268 21.046C12.6256 20.963 12.5327 20.8701 12.4496 20.7689C11.9956 20.2157 11.9956 19.3938 11.9956 17.7499C11.9956 16.1061 11.9956 15.2842 12.4496 14.731C12.5327 14.6298 12.6255 14.537 12.7267 14.4539C13.2799 13.9999 14.1018 13.9999 15.7456 13.9998L17.7459 13.9998Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5.24559 13.9999C5.94314 13.9999 6.29192 13.9999 6.57574 14.0859C7.21509 14.2798 7.71542 14.7801 7.9093 15.4195C7.99536 15.7033 7.99536 16.0521 7.99536 16.7496V18.7505C7.99536 19.4481 7.99536 19.7968 7.9093 20.0806C7.71542 20.72 7.2151 21.2203 6.57576 21.4142C6.29195 21.5003 5.94317 21.5003 5.24563 21.5003C4.54807 21.5003 4.19929 21.5003 3.91548 21.4142C3.27612 21.2203 2.77579 20.72 2.58191 20.0807C2.49585 19.7968 2.49585 19.4481 2.49585 18.7505L2.49585 16.7496C2.49585 16.0521 2.49585 15.7033 2.58191 15.4195C2.77579 14.7802 3.27611 14.2798 3.91545 14.086C4.19926 13.9999 4.54804 13.9999 5.24559 13.9999Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_85018 = [["path",{d:"M3.49902 14.9656C4.72475 18.4791 8.06749 21 11.999 21C16.9696 21 20.999 16.9706 20.999 12C20.999 7.02944 16.9696 3 11.999 3C8.29827 3 4.8984 5.6756 3.68943 8.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.999 7V12L14.999 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M7.49751 8.74363C7.49751 8.74363 3.81388 9.3026 3.25487 8.7436C2.69585 8.1846 3.25488 4.50098 3.25488 4.50098",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_68686 = [["path",{d:"M7 6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5V11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5V6.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.5 19H11.0828C7.57267 19 4.57706 16.4623 4 13M11.5 19H11.9172C15.4273 19 18.4229 16.4623 19 13M11.5 19V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_40279 = [["path",{d:"M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 3L9.5 21",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 7H6M5 10H6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_71497 = [["path",{d:"M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];
const Icon_1497 = [["path",{d:"M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

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

let M = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let E = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let W = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let nD = (...e)=>e.filter(Boolean).join(" ");

function nR(){
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

let nM = "text-neutral-900 dark:text-neutral-100";

let nE = "text-neutral-900/78 dark:text-neutral-100/78";

let nW = "text-neutral-900/62 dark:text-neutral-100/62";

let nO = "text-[17px]/[22px] font-extrabold";

let nT = "text-[14px]/[20px] font-medium";

let nF = "text-[15px]/[20px] font-bold";

let nI = "text-[13px]/[16px] font-semibold tabular-nums";

let nL = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))]";

let nP = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]";

let nq = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let nH = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] text-neutral-900 dark:text-neutral-100 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] active:not-disabled:translate-y-px active:not-disabled:shadow-[inset_0_1px_3px_rgb(84_62_32/0.16),0_0_0_1px_rgb(84_62_32/0.10)] dark:active:not-disabled:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14),0_0_0_1px_rgb(84_62_32/0.10)] dark:aria-expanded:bg-neutral-800 dark:aria-expanded:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),0_0_0_1px_rgb(0_0_0/0.6)] disabled:bg-none disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] disabled:text-neutral-900/40 disabled:shadow-none dark:disabled:bg-neutral-800/60 dark:disabled:text-neutral-100/40";

let n$ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let nB = "h-10 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-5 text-[15px]/[20px] font-bold";

let nK = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let nU = "size-10 rounded-[calc(var(--rb-r-full,999px))]";

let nV = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)]";

let nJ = "transition-[opacity,scale] duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:scale-[0.94] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:scale-100";

let nQ = "flex h-10 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-left text-[15px]/[20px] font-semibold text-neutral-900/75 transition-[background-color,box-shadow,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-white aria-[current=page]:font-bold aria-[current=page]:text-neutral-900 aria-[current=page]:shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-neutral-100/75 dark:hover:bg-neutral-100/6 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-[color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800))] dark:aria-[current=page]:text-neutral-100 dark:aria-[current=page]:shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)]";

let nG = "bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]";

let nX = "bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]";

let nY = "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[calc(var(--rb-r-lg,10px))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] select-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black)]";

let nZ = [{id:"atlas",name:"Atlas 4",note:"Best for hard reasoning",icon:Icon_27151},{id:"wren",name:"Wren",note:"Fast, good for drafts",icon:Icon_78805},{id:"orbit",name:"Orbit",note:"Long documents",icon:Icon_86829}];

let n0 = [{label:"Draft an email",icon:Icon_67812},{label:"Summarise a file",icon:Icon_31964},{label:"Write a function",icon:Icon_81320},{label:"Plan a trip",icon:Icon_87924}];

let n1 = [{id:"revenue",title:"Quarterly revenue summary",icon:Icon_31964,model:"Atlas 4",count:12,turns:[{role:"user",text:"Pull the headline numbers out of the Q3 close and tell me what actually moved."},{role:"assistant",text:"Revenue landed at 4.62m, up 8.4% on Q2. Almost all of the gain is expansion inside existing accounts rather than new logos, which came in flat at 41. Net retention is 114%, the best of the last four quarters."},{role:"user",text:"What is the risk in that number?"},{role:"assistant",text:"Concentration. The top six accounts now sit at 38% of ARR, up from 31% a year ago. Two of them renew in the same month, so a single bad renewal window would take more off the top line than the whole quarter's growth put back."}]},{id:"auth",title:"Refactor auth middleware",icon:Icon_81320,model:"Atlas 4",count:24,turns:[{role:"user",text:"The session refresh runs on every request. Can it be cheaper?"},{role:"assistant",text:"Yes. Refresh only when the token is inside its last five minutes, and keep the decoded claims on the request so downstream handlers stop re-parsing. That takes the common path from one network call to none."}]},{id:"lisbon",title:"Lisbon trip itinerary",icon:Icon_87924,model:"Wren",count:8,turns:[{role:"user",text:"Four days in Lisbon in October, no rental car."},{role:"assistant",text:"Base yourself in Pr\xedncipe Real so most of it is walkable. Day one Alfama and the viewpoints, day two Bel\xe9m by tram, day three a train out to Sintra, day four the Time Out market and the riverside before your flight."}]},{id:"launch",title:"Launch checklist draft",icon:Icon_92190,model:"Atlas 4",count:5,turns:[{role:"user",text:"What is still open before Thursday?"},{role:"assistant",text:"Three things: the pricing page copy is unreviewed, the status page has no incident template, and nobody owns the first-hour inbox. The rest is either done or does not block the announcement."}]},{id:"vector",title:"Explain vector search",icon:Icon_66575,model:"Orbit",count:9,turns:[{role:"user",text:"Explain vector search without the marketing words."},{role:"assistant",text:"You turn each document into a list of numbers that encodes its meaning, then store them. A query becomes the same kind of list, and you return the documents whose lists point in a similar direction. It finds things that mean the same rather than things that spell the same."}]},{id:"sql",title:"Optimise a slow SQL query",icon:Icon_86829,model:"Orbit",count:16,turns:[{role:"user",text:"This join takes eleven seconds. Where do I start?"},{role:"assistant",text:"Read the plan first. An eleven second join on this row count is almost always a sequential scan on the right-hand table because the join column is not indexed, or is indexed with a different collation than the one you are comparing against."}]}];

let n2 = [{label:"Favourites",icon:Icon_12556,count:2},{label:"Templates",icon:Icon_92916,count:5},{label:"History",icon:Icon_85018},{label:"Clear history",icon:Icon_96037}];

function n5({children:e}){
  return <p className="px-3 pt-5 pb-1.5 text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e}</p>;
}

function n6({value:e,onChange:a}){
  let[r,i]=useState(false),[o,s]=useState(0),c=useRef(null),d=useRef(null),u=useRef([]),_=useCallback(e=>{
    i(false),e&&c.current?.focus({preventScroll:true})
  }, []);
  useEffect(()=>{
    if(!r)return;
    let e=c.current?.ownerDocument??document,a=e=>{
      let a=e.target;
      d.current?.contains(a)||c.current?.contains(a)||i(false)
    },t=e=>{
      "Escape"===e.key&&(e.preventDefault(),_(true))
    };
    e.addEventListener("pointerdown",a),e.addEventListener("keydown",t);
    let n=requestAnimationFrame(()=>u.current[o]?.focus({preventScroll:true}));
    return ()=>{
      cancelAnimationFrame(n),e.removeEventListener("pointerdown",a),e.removeEventListener("keydown",t)
    };
  }, [r,o,_]);
  let x=e=>{
    let a=(e+nZ.length)%nZ.length;
    s(a),u.current[a]?.focus({preventScroll:true})
  };
  return (
    <div className="relative">
        <button ref={c} type="button" aria-haspopup="menu" aria-expanded={r} onClick={()=>{
          s(nZ.findIndex(a=>a.id===e.id)),i(e=>!e)
        }} className={nD(nH,nB)}>
          <HugeiconsIcon icon={e.icon} size={18} strokeWidth={2} aria-hidden="true" />
          {e.name}
          <HugeiconsIcon icon={Icon_20148} size={16} strokeWidth={2} aria-hidden="true" className={nD("shrink-0 text-neutral-900/78 dark:text-neutral-100/78",r&&"rotate-180")} />
        </button>
        {r&&<div ref={d} role="menu" aria-label="Choose a model" className={nD("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","absolute left-0 top-[calc(100%+6px)] z-50 w-64")}>
          {nZ.map((r,n)=>{
            let s=r.id===e.id;
            return (
              <button key={r.id} ref={e=>{
                        u.current[n]=e
                      }} type="button" role="menuitemradio" aria-checked={s} tabIndex={n===o?0:-1} onKeyDown={e=>{
                        "ArrowDown"===e.key?(e.preventDefault(),x(n+1)):"ArrowUp"===e.key?(e.preventDefault(),x(n-1)):"Home"===e.key?(e.preventDefault(),x(0)):"End"===e.key?(e.preventDefault(),x(nZ.length-1)):"Tab"===e.key&&i(false)
                      }} onClick={()=>{
                        a(r),_(true)
                      }} className="relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40">
                        <HugeiconsIcon icon={r.icon} size={18} strokeWidth={2} aria-hidden="true" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate">{r.name}</span>
                          <span className={nD(nT,nE,"block truncate")}>{r.note}</span>
                        </span>
                        {s&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" />}
                      </button>
            );
          })}
        </div>}
      </div>
  );
}

function n8({draft:e,onDraft:a,model:r,inputRef:n}){
  return (
    <div className="relative flex w-full min-w-0 flex-col rounded-[calc(min(var(--rb-r-6xl,26px),min(var(--rb-r-full,999px),16px)_+_8px))] border border-transparent bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] transition-[box-shadow] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:shadow-[0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent),0_8px_22px_-10px_rgb(84_62_32/0.2)] dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] dark:focus-within:shadow-[0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163)),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]">
        <label htmlFor="halden-composer" className="sr-only">Message Halden</label>
        <div className="px-2 pt-2">
          <textarea id="halden-composer" ref={n} rows={1} value={e} onChange={e=>{
            a(e.target.value);
            let r=e.target;
            r.style.height="auto",r.style.height=`${Math.min(r.scrollHeight,160)}px`
          }} placeholder="Message Halden" className={nD("max-h-40 min-h-6 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1.5 field-sizing-content text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/55 dark:placeholder:text-neutral-100/55","block w-full")} />
        </div>
        <div className="flex items-center gap-1 px-2 pb-2 pt-1">
          <button type="button" aria-label="Add an attachment" className={nD(n$,nK)}>
            <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" aria-pressed="false" className={nD(n$,"h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold")}>
            <HugeiconsIcon icon={Icon_78805} size={18} strokeWidth={2} aria-hidden="true" />
            Search
          </button>
          <div className="ml-auto flex items-center gap-1">
            <span className={nD(nI,nW,"hidden shrink-0 pr-1 sm:block")}>{r.name}</span>
            <button type="button" aria-label="Dictate" className={nD(n$,nK)}>
              <HugeiconsIcon icon={Icon_68686} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Send message" disabled={0===e.trim().length} className={nD(nq,nK)}>
              <HugeiconsIcon icon={Icon_40972} size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
  );
}

function n4({model:e,onModel:a,chatId:r,onChat:n,onNew:i,onClose:o,onCollapse:s,collapseRef:c}){
  let d=n1[0],{ref:u,edges:x,onScroll:b}=nR();
  return (
    <>
        <div className="flex h-[60px] shrink-0 items-center gap-2.5 px-3">
          <span aria-hidden="true" className={nD(nY,"size-8",nF)}>H</span>
          <p className={nD(nO,"min-w-0 flex-1 truncate")}>Halden</p>
          {o?<button type="button" aria-label="Close navigation" onClick={o} className={nD(n$,nU)}>
            <HugeiconsIcon icon={Icon_89289} size={18} strokeWidth={2} aria-hidden="true" />
          </button>:<button ref={c} type="button" aria-label="Collapse sidebar" aria-expanded onClick={s} className={nD(n$,nU,"max-lg:hidden")}>
            <HugeiconsIcon icon={Icon_40279} size={18} strokeWidth={2} aria-hidden="true" />
          </button>}
        </div>
        <div className="shrink-0 px-3 pb-3">
          <button type="button" onClick={i} className={nD(nq,nB,"w-full")}>
            <HugeiconsIcon icon={Icon_89886} size={18} strokeWidth={2} aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-left">New chat</span>
          </button>
        </div>
        <div className="relative min-h-0 flex-1">
          <div ref={u} onScroll={b} className="h-full overflow-y-auto px-3 pb-3">
            <div>
              <n5>Model</n5>
              <div role="radiogroup" aria-label="Model" className="grid grid-cols-3 gap-1.5">
                {nZ.map(r=>{
                  let n=r.id===e.id;
                  return (
                    <button key={r.id} type="button" role="radio" aria-checked={n} onClick={()=>a(r)} className={nD(nP,nL,"rounded-[var(--rb-r-4xl,18px)]",n?nD("bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))]","shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)]","border-2 border-neutral-900/30 dark:border-neutral-100/34",nM):nD("hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6","border border-neutral-900/12 dark:border-neutral-100/14",nE),"flex min-w-0 cursor-pointer flex-col items-center justify-center gap-1.5 px-2 py-2.5 select-none")}>
                                    <HugeiconsIcon icon={r.icon} size={18} strokeWidth={2} aria-hidden="true" />
                                    <span className={nD("text-[13px]/[16px] font-bold tabular-nums","w-full truncate text-center")}>{r.name}</span>
                                  </button>
                  );
                })}
              </div>
            </div>
            <div>
              <n5>Pinned</n5>
              <button type="button" onClick={()=>n(d.id)} className={nD(nV,"cursor-pointer hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] dark:hover:bg-neutral-100/6 active:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] dark:active:bg-neutral-100/10",nL,nP,"w-full px-2.5 py-2 text-left")}>
                <span className="flex items-center gap-2">
                  <HugeiconsIcon icon={d.icon} size={18} strokeWidth={2} aria-hidden="true" className={nW} />
                  <span className={nD(nF,"min-w-0 flex-1 truncate")}>{d.title}</span>
                </span>
                <span className="mt-1.5 flex items-center gap-1.5 pl-6">
                  <span className={nD("inline-flex h-5.5 min-w-5.5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] px-2.5 text-[12px]/[16px] font-bold tabular-nums","bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] text-neutral-900 dark:text-neutral-100 dark:bg-neutral-100/12")}>{d.model}</span>
                  <span className={nD(nI,nW)}>
                    {d.count}
                    {" messages"}
                  </span>
                </span>
              </button>
            </div>
            <div>
              <n5>Recent</n5>
              <ul className="space-y-0.5">
                {n1.map(e=>{
                  let a=e.id===r;
                  return (
                    <li key={e.id}>
                                    <button type="button" aria-current={a?"page":undefined} onClick={()=>n(e.id)} className={nQ}>
                                      <HugeiconsIcon icon={e.icon} size={18} strokeWidth={2} aria-hidden="true" />
                                      <span className="min-w-0 flex-1 truncate text-left">{e.title}</span>
                                    </button>
                                  </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <n5>Quick actions</n5>
              <ul className="space-y-0.5">
                {n2.map(e=>(
                  <li key={e.label}>
                                <button type="button" className={nQ}>
                                  <HugeiconsIcon icon={e.icon} size={18} strokeWidth={2} aria-hidden="true" />
                                  <span className="min-w-0 flex-1 truncate text-left">{e.label}</span>
                                  {undefined!==e.count&&<span className="ms-auto text-[13px]/[16px] font-bold tabular-nums text-neutral-900/62 dark:text-neutral-100/62">{e.count}</span>}
                                </button>
                              </li>
                ))}
              </ul>
            </div>
          </div>
          <div aria-hidden="true" className={nD(o?"bg-linear-to-b from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950":nG,"pointer-events-none absolute inset-x-0 top-0 h-8",x.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={nD(o?"bg-linear-to-t from-white to-transparent transition-opacity duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-neutral-950":nX,"pointer-events-none absolute inset-x-0 bottom-0 h-8",x.end?"opacity-100":"opacity-0")} />
        </div>
        <div className="flex h-[60px] shrink-0 items-center gap-2.5 px-3">
          <span className="relative shrink-0">
            <span aria-hidden="true" className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
              <span className="flex size-full items-center justify-center rounded-[inherit] bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_24%,white)] text-[12px]/[16px] font-extrabold tabular-nums text-neutral-900 dark:text-neutral-100 dark:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_22%,var(--color-neutral-900))]">HA</span>
            </span>
          </span>
          <span className="min-w-0 flex-1">
            <span className={nD(nF,"block truncate")}>Assistant</span>
            <span className={nD(nT,nE,"block truncate")}>Online, replies instantly</span>
          </span>
        </div>
      </>
  );
}


export default function app_shell_9__Sorbet__Component(){
  let[e,a]=useState(nZ[0]),[r,i]=useState(null),[o,s]=useState(""),[c,d]=useState(true),[u,_]=useState(false),[x,b]=useState(false),p=useRef(null),h=useRef(null),m=useRef(null),k=useRef(null),f=useRef(false),g=useRef(null),w=useRef(null),{ref:y,edges:j,onScroll:N}=nR(),{ref:A,edges:S,onScroll:z}=nR(),C=useRef(null),D=useRef(false);
  useEffect(()=>{
    if(!f.current)return;
    f.current=false;
    let e=c?k.current:m.current;
    e?.focus({preventScroll:true})
  }, [c]);
  let R=useMemo(()=>n1.find(e=>e.id===r)??null, [r]),M=useCallback(()=>{
    b(false),_(false),D.current&&(h.current?.focus({preventScroll:true}),D.current=false)
  }, []);
  useEffect(()=>{
    if(!u)return;
    let e=g.current,a=e?.ownerDocument??document,r=requestAnimationFrame(()=>b(true)),t=r=>{
      if("Escape"===r.key){
        r.preventDefault(),M();
        return
      }
      if("Tab"!==r.key||!e)return;
      let t=e.querySelectorAll('a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])');
      if(0===t.length)return;
      let n=t[0],l=t[t.length-1];
      r.shiftKey&&a.activeElement===n?(r.preventDefault(),l.focus({preventScroll:true})):r.shiftKey||a.activeElement!==l||(r.preventDefault(),focus({preventScroll:true}))
    };
    return a.addEventListener("keydown",t),()=>{
      cancelAnimationFrame(r),a.removeEventListener("keydown",t)
    };
  }, [u,M]),useEffect(()=>{
    w.current&&(w.current.scrollTop=0)
  }, [r]);
  let E=e=>{
    i(e),M()
  },W=()=>{
    i(null),s(""),M(),C.current?.focus({preventScroll:true})
  };
  return (
    <div ref={p} className={nD("bg-white dark:bg-neutral-950",nM,"relative flex h-full min-h-[720px] w-full overflow-hidden")}>
        <div className={nD("bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900","flex w-full min-w-0 p-3")}>
          <aside inert={!c} className={nD("hidden shrink-0 lg:block",c?"mr-3 w-72":"mr-0 w-0 overflow-hidden")}>
            <div className={nD(nV,"h-full w-72")}>
              <n4 model={e} onModel={a} chatId={r} onChat={E} onNew={W} collapseRef={k} onCollapse={()=>{
                f.current=true,d(false)
              }} />
            </div>
          </aside>
          <div className={nD(nV,"flex-1")}>
            <header className="flex h-[60px] shrink-0 items-center px-3">
              <button ref={h} type="button" aria-label="Open navigation" aria-expanded={u} onClick={()=>{
                D.current=true,_(true)
              }} className={nD(n$,nU,"mr-2 lg:hidden")}><HugeiconsIcon icon={Icon_1836} size={18} strokeWidth={2} aria-hidden="true" /></button>
              <div className={nD("hidden shrink-0 overflow-hidden lg:block",c?"mr-0 w-0":"mr-2 w-9")}>
                <button ref={m} type="button" aria-label="Expand sidebar" aria-expanded={c} tabIndex={c?-1:undefined} onClick={()=>{
                  f.current=true,d(true)
                }} className={nD(n$,nU)}>
                  <HugeiconsIcon icon={Icon_40279} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
              <n6 value={e} onChange={a} />
              <h1 className={nD(nT,nW,"ml-2 hidden min-w-0 flex-1 truncate sm:block")}>{R?R.title:"New chat"}</h1>
              <span className="flex-1 sm:hidden" />
              <button type="button" className={nD(nH,nB,"ml-2")}>
                <HugeiconsIcon icon={Icon_71497} size={18} strokeWidth={2} aria-hidden="true" />
                <span className="hidden sm:inline">Share chat</span>
              </button>
            </header>
            {R?<>
              <div className="relative flex min-h-0 flex-1 flex-col">
                <div ref={e=>{
                  w.current=e,y.current=e
                }} onScroll={N} className="h-full overflow-y-auto px-4 sm:px-6">
                  <div className="mx-auto flex max-w-2xl flex-col gap-5 py-6">
                    {R.turns.map((e,a)=>"user"===e.role?<div key={a} className="flex justify-end">
                      <div className="max-w-[85%]">
                        <p className="w-fit max-w-full rounded-[calc(var(--rb-r-6xl,26px))] rounded-br-[var(--rb-r-xs,4px)] border border-transparent bg-[var(--rb-accent,oklch(84%_0.15_165))] px-4 py-2.5 text-[15px]/[22px] font-medium whitespace-pre-wrap text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_-1.5px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_2px_6px_-3px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,transparent)] [overflow-wrap:anywhere] dark:bg-[var(--rb-accent,oklch(81%_0.16_163))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-none">{e.text}</p>
                      </div>
                    </div>:<p key={a} className={nD("flex min-w-0 flex-col gap-4 text-[15px]/[24px] font-medium text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]","max-w-[95%]")}>{e.text}</p>)}
                  </div>
                </div>
                <div aria-hidden="true" className={nD(nG,"pointer-events-none absolute inset-x-0 top-0 h-8",j.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={nD(nX,"pointer-events-none absolute inset-x-0 bottom-0 h-8",j.end?"opacity-100":"opacity-0")} />
              </div>
              <div className="shrink-0 px-4 pt-2 sm:px-6">
                <div className="mx-auto max-w-2xl"><n8 draft={o} onDraft={s} model={e} inputRef={C} /></div>
              </div>
            </>:<div className="relative flex min-h-0 flex-1 flex-col">
              <div className="flex h-full flex-col items-center justify-center-safe overflow-y-auto px-4 py-6 sm:px-6" ref={A} onScroll={z}>
                <span aria-hidden="true" className={nD(nY,"size-11",nO)}>H</span>
                <h2 className={nD("text-[26px]/[32px] font-extrabold tracking-[-0.015em]","mt-4")}>How can I help?</h2>
                <p className={nD("text-[15px]/[22px] font-medium",nE,"mt-1.5")}>Start typing, or pick one of these to get going.</p>
                <div className="mt-6 w-full max-w-2xl"><n8 draft={o} onDraft={s} model={e} inputRef={C} /></div>
                <div className="mt-3 grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
                  {n0.map(e=>(
                    <button key={e.label} type="button" onClick={()=>{
                                    s(e.label),C.current?.focus({preventScroll:true})
                                  }} className={nD(nH,"h-12 gap-2 rounded-[calc(var(--rb-r-full,999px))] px-6 text-[16px]/[20px] font-extrabold")}>
                                    <HugeiconsIcon icon={e.icon} size={18} strokeWidth={2} aria-hidden="true" className={nW} />
                                    <span className="min-w-0 flex-1 truncate text-left">{e.label}</span>
                                    <HugeiconsIcon icon={Icon_1497} size={18} strokeWidth={2} aria-hidden="true" className={nW} />
                                  </button>
                  ))}
                </div>
              </div>
              <div aria-hidden="true" className={nD(nG,"pointer-events-none absolute inset-x-0 top-0 h-8",S.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={nD(nX,"pointer-events-none absolute inset-x-0 bottom-0 h-8",S.end?"opacity-100":"opacity-0")} />
            </div>}
            <p className={nD(nT,nE,"shrink-0 px-4 pb-3 pt-2 text-center sm:px-6")}>Halden can make mistakes. Check anything important.</p>
          </div>
        </div>
        {u&&<div className="lg:hidden">
          <button type="button" aria-label="Close navigation overlay" onClick={M} tabIndex={-1} className={nD("bg-[oklch(28%_0.02_70/0.3)] dark:bg-neutral-950/70",nJ,"absolute inset-0 z-30 cursor-pointer",x?"opacity-100":"opacity-0")} />
          <aside ref={g} role="dialog" aria-modal="true" aria-label="Navigation" className={nD("flex h-full min-h-0 flex-col bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]",nJ,"absolute inset-y-0 left-0 z-40 w-72 max-w-[85%]",x?"opacity-100":"opacity-0")}>
            <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[calc(var(--rb-r-5xl,22px))] border border-transparent bg-white dark:bg-neutral-950 shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] [&:last-child]:mb-1"><n4 model={e} onModel={a} chatId={r} onChat={E} onNew={W} onClose={M} /></div>
          </aside>
        </div>}
      </div>
  );
}
