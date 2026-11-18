/**
 * React Bits Pro — Application UI (prompt-input-1 (Sorbet))
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { ResizeObserver, getBoundingClientRect, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20148 = [["path",{d:"M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_31964 = [["path",{d:"M8 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 13H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_81320 = [["path",{d:"M17 8L18.8398 9.85008C19.6133 10.6279 20 11.0168 20 11.5C20 11.9832 19.6133 12.3721 18.8398 13.1499L17 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7 8L5.16019 9.85008C4.38673 10.6279 4 11.0168 4 11.5C4 11.9832 4.38673 12.3721 5.16019 13.1499L7 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 4L9.5 20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_17248 = [["path",{d:"M14.4973 2V8.25401C14.4973 8.72617 14.7093 9.1734 15.0747 9.47239L15.7421 10.0184C18.4717 12.2518 20.2277 15.4577 20.6397 18.9604C20.8301 20.5784 19.5659 22 17.9368 22H6.05789C4.42876 22 3.16459 20.5784 3.35494 18.9604C3.76702 15.4577 5.52295 12.2518 8.25261 10.0184L8.91998 9.47239C9.28541 9.1734 9.49734 8.72617 9.49734 8.25401V2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.99707 2H15.9971",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5.49707 14.0183C5.74095 14.0063 5.99072 14 6.24707 14C9.99707 14 13.7471 17 17.4971 17C18.2729 17 18.9332 16.9384 19.4971 16.8334",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_96022 = [["path",{d:"M7.99978 3.5H6.60021C4.43183 3.5 3.34764 3.5 2.67399 4.17362C2.00034 4.84724 2.00029 5.93144 2.00021 8.09982L2 13.3998C1.99992 15.5684 1.99987 16.6526 2.67353 17.3263C3.34719 18 4.43146 18 6.6 18H8.95042C10.4329 18 11.7092 19.0464 11.9999 20.5V5.5C11.0556 4.24097 9.99989 3.5 7.99978 3.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.0001 3.5H17.3997C19.5681 3.5 20.6523 3.5 21.3259 4.17362C21.9996 4.84724 21.9996 5.93144 21.9997 8.09982L21.9999 13.3998C22 15.5684 22 16.6526 21.3264 17.3263C20.6527 18 19.5684 18 17.3999 18H15.0495C13.567 18 12.2907 19.0464 12 20.5V5.5C12.9443 4.24097 14 3.5 16.0001 3.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_69554 = [["path",{d:"M20.3584 13.3567C19.1689 14.546 16.9308 14.4998 13.4992 14.4998C11.2914 14.4998 9.50138 12.7071 9.50024 10.4993C9.50024 7.07001 9.454 4.83065 10.6435 3.64138C11.8329 2.45212 12.3583 2.50027 17.6274 2.50027C18.1366 2.49809 18.3929 3.11389 18.0329 3.47394L15.3199 6.18714C14.6313 6.87582 14.6294 7.99233 15.3181 8.68092C16.0068 9.36952 17.1234 9.36959 17.8122 8.68109L20.5259 5.96855C20.886 5.60859 21.5019 5.86483 21.4997 6.37395C21.4997 11.6422 21.5479 12.1675 20.3584 13.3567Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M13.5 14.5L7.32842 20.6716C6.22386 21.7761 4.433 21.7761 3.32843 20.6716C2.22386 19.567 2.22386 17.7761 3.32843 16.6716L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5.50896 18.5H5.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",key:"2"}]];
const Icon_92916 = [["path",{d:"M17.7458 2.49963C19.3896 2.49963 20.2115 2.49963 20.7646 2.95361C20.8659 3.03672 20.9588 3.12958 21.0419 3.23085C21.4958 3.78402 21.4958 4.60589 21.4958 6.24963C21.4958 7.89338 21.4958 8.71525 21.0419 9.26842C20.9588 9.36969 20.8659 9.46255 20.7646 9.54566C20.2115 9.99963 19.3896 9.99963 17.7458 9.99963L6.74585 9.99963C5.10211 9.99963 4.28024 9.99963 3.72706 9.54565C3.62579 9.46255 3.53294 9.36969 3.44983 9.26842C2.99585 8.71525 2.99585 7.89337 2.99585 6.24963C2.99585 4.60589 2.99585 3.78402 3.44983 3.23085C3.53294 3.12958 3.62579 3.03672 3.72706 2.95361C4.28024 2.49963 5.10211 2.49963 6.74585 2.49963L17.7458 2.49963Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.7459 13.9998C19.3898 13.9997 20.2117 13.9997 20.7649 14.4537C20.8661 14.5368 20.959 14.6296 21.0421 14.7308C21.4961 15.284 21.4961 16.106 21.4961 17.7499C21.4961 19.3936 21.4961 20.2155 21.0421 20.7687C20.959 20.87 20.8662 20.9628 20.765 21.0459C20.2118 21.4999 19.3899 21.4999 17.7461 21.4999L15.7458 21.5C14.1019 21.5 13.28 21.5001 12.7268 21.046C12.6256 20.963 12.5327 20.8701 12.4496 20.7689C11.9956 20.2157 11.9956 19.3938 11.9956 17.7499C11.9956 16.1061 11.9956 15.2842 12.4496 14.731C12.5327 14.6298 12.6255 14.537 12.7267 14.4539C13.2799 13.9999 14.1018 13.9999 15.7456 13.9998L17.7459 13.9998Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5.24559 13.9999C5.94314 13.9999 6.29192 13.9999 6.57574 14.0859C7.21509 14.2798 7.71542 14.7801 7.9093 15.4195C7.99536 15.7033 7.99536 16.0521 7.99536 16.7496V18.7505C7.99536 19.4481 7.99536 19.7968 7.9093 20.0806C7.71542 20.72 7.2151 21.2203 6.57576 21.4142C6.29195 21.5003 5.94317 21.5003 5.24563 21.5003C4.54807 21.5003 4.19929 21.5003 3.91548 21.4142C3.27612 21.2203 2.77579 20.72 2.58191 20.0807C2.49585 19.7968 2.49585 19.4481 2.49585 18.7505L2.49585 16.7496C2.49585 16.0521 2.49585 15.7033 2.58191 15.4195C2.77579 14.7802 3.27611 14.2798 3.91545 14.086C4.19926 13.9999 4.54804 13.9999 5.24559 13.9999Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_2972 = [["path",{d:"M8 9V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 5V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M18 13V17",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 3V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_2775 = [["path",{d:"M3.32352 13.0113C3.6739 10.009 4.18586 7.75784 4.66063 6.15851C5.04994 4.84711 5.24459 4.19141 6.04283 3.5957C6.84107 3 7.65697 3 9.28876 3H14.7113C16.3431 3 17.159 3 17.9572 3.5957C18.7554 4.19141 18.9501 4.84711 19.3394 6.15851C19.8142 7.75784 20.3261 10.009 20.6765 13.0113C21.0895 16.5497 21.2959 18.3189 20.1027 19.6594C18.9095 21 16.9758 21 13.1084 21H10.8916C7.02422 21 5.09052 21 3.89731 19.6594C2.70411 18.3189 2.91058 16.5497 3.32352 13.0113Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_92190 = [["path",{d:"M11 6L21 6",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 12L21 12",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M11 18L21 18",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_48094 = [["path",{d:"M5.82338 12L4.27922 10.4558C2.57359 8.75022 2.57359 5.98485 4.27922 4.27922C5.98485 2.57359 8.75022 2.57359 10.4558 4.27922L19.7208 13.5442C21.4264 15.2498 21.4264 18.0152 19.7208 19.7208C18.0152 21.4264 15.2498 21.4264 13.5442 19.7208L10.0698 16.2464C9.00379 15.1804 9.00379 13.4521 10.0698 12.386C11.1358 11.32 12.8642 11.32 13.9302 12.386L15.8604 14.3162",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_68686 = [["path",{d:"M7 6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5V11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5V6.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.5 19H11.0828C7.57267 19 4.57706 16.4623 4 13M11.5 19H11.9172C15.4273 19 18.4229 16.4623 19 13M11.5 19V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let k = (...e)=>e.filter(Boolean).join(" ");

let m = "text-neutral-900/62 dark:text-neutral-100/62";

let v = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]";

let f = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let g = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let w = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let y = "min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]";

let j = "relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40";

let N = "transition-transform duration-[300ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none";

let z = k("text-[14px]/[20px] font-medium",m);

let A = ["Low","Medium","High"];

function D({level:e}){
  let a=e/(A.length-1);
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4.5 w-4.5 shrink-0">
        <path d="M5.94 16.5A7 7 0 1 1 18.06 16.5" pathLength={100} className="stroke-current opacity-30" strokeWidth={2} strokeLinecap="round" />
        <path d="M5.94 16.5A7 7 0 1 1 18.06 16.5" pathLength={100} strokeDasharray={`${Math.max(100*a,.01)} 100`} className="stroke-current" strokeWidth={2} strokeLinecap="round" />
        <line x1="12" y1="13" x2="12" y2="7.5" className={k(N,"origin-[12px_13px] stroke-current")} style={{transform:`rotate(${(a-.5)*240}deg)`}} strokeWidth={2} strokeLinecap="round" />
        <circle cx="12" cy="13" r="1.25" className="fill-current" />
      </svg>
  );
}

function S({level:e,onChange:a}){
  let r=useRef(null),[l,o]=useState(0),[i,c]=useState(false),[s,_]=useState(false);
  useLayoutEffect(()=>{
    let e=r.current;
    e&&o(Math.max(e.clientWidth-16-32,0))
  }, []),useEffect(()=>{
    let e=r.current,a=e?.ownerDocument.defaultView;
    if(!e||!a?.ResizeObserver)return;
    let t=new a.ResizeObserver(()=>o(Math.max(e.clientWidth-16-32,0)));
    t.observe(e);
    let n=a.requestAnimationFrame(()=>_(true));
    return ()=>{
      a.cancelAnimationFrame(n),t.disconnect()
    };
  }, []);
  let d=A.length-1,b=l*e/d,x=t=>{
    let n=r.current;
    if(!n||l<=0)return;
    let o=Math.round(Math.min(Math.max((t-getBoundingClientRect().left-8-16)/l,0),1)*d);
    o!==e&&a(o)
  };
  return (
    <div ref={r} role="slider" tabIndex={0} aria-label="Reasoning effort" aria-valuemin={0} aria-valuemax={d} aria-valuenow={e} aria-valuetext={A[e]} onKeyDown={r=>{
        let t={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1};
        r.key in t?(r.preventDefault(),a(Math.min(Math.max(e+t[r.key],0),d))):"Home"===r.key?(r.preventDefault(),a(0)):"End"===r.key&&(r.preventDefault(),a(d))
      }} onPointerDown={e=>{
        e.currentTarget.setPointerCapture(e.pointerId),c(true),x(e.clientX)
      }} onPointerMove={e=>i&&x(e.clientX)} onPointerUp={()=>c(false)} onPointerCancel={()=>c(false)} className={k("relative h-12 w-full cursor-pointer touch-none rounded-full bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_58%,white)] shadow-[inset_0_1px_3px_rgb(84_62_32/0.10),inset_0_0_0_1px_rgb(84_62_32/0.04)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:bg-neutral-950 dark:shadow-[inset_0_1px_3px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.05)]","max-w-sm")}>
        <div className="pointer-events-none absolute inset-x-2 top-1/2 h-8 -translate-y-1/2 overflow-hidden rounded-full">
          <div className={k("absolute inset-0 rounded-full bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_75%,black)] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,black)]",s&&N)} style={{transform:`translateX(${b-l}px)`}} />
        </div>
        {A.map((a,r)=>r===e?null:<span key={a} aria-hidden className={r<e?"pointer-events-none absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--rb-accent-fg,oklch(26%_0.06_168))_40%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent-fg,oklch(26%_0.06_168))_40%,transparent)]":"pointer-events-none absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-neutral-900/25 dark:bg-neutral-100/30"} style={{left:`${21+l*r/d}px`}} />)}
        <div aria-hidden className={k("pointer-events-none absolute top-1/2 left-0 size-6 rounded-full bg-white shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_2px_rgb(84_62_32/0.10),0_3px_8px_-2px_rgb(84_62_32/0.20)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_0_0_1px_rgb(0_0_0/0.6),0_2px_6px_-1px_rgb(0_0_0/0.6)] dark:bg-white",s&&N)} style={{left:`${12}px`,transform:`translate(${b}px, -50%)`}} />
      </div>
  );
}

let E = [{name:"Atlas",hint:"Balanced speed and depth"},{name:"Atlas Pro",hint:"Deepest reasoning"},{name:"Quill",hint:"Fastest, for short tasks"}];

function R({label:e,options:a,value:r,onChange:c,triggerMaxWidth:s}){
  let[_,d]=useState(false),[b,x]=useState(false),[u,p]=useState(0),h=useRef(null),m=useRef(null),f=useRef(null),g=useRef(undefined);
  useEffect(()=>{
    if(!_)return;
    let e=h.current?.ownerDocument??document,a=e=>{
      h.current?.contains(e.target)||(d(false),x(false))
    };
    return e.addEventListener("pointerdown",a),()=>e.removeEventListener("pointerdown",a);
  }, [_]),useEffect(()=>{
    _&&f.current?.focus({preventScroll:true})
  }, [_]),useEffect(()=>()=>cancelAnimationFrame(g.current??0), []);
  let w=(e,a)=>{
    p(e),d(true),a?(x(false),g.current=requestAnimationFrame(()=>x(true))):x(true)
  },N=(e=true)=>{
    d(false),x(false),e&&m.current?.focus({preventScroll:true})
  },A=e=>{
    c(a[e].name),N()
  };
  return (
    <div ref={h} className="relative">
        {_&&<div ref={f} role="listbox" aria-label={e} tabIndex={-1} onKeyDown={e=>{
          switch(e.key){case"Escape":e.preventDefault(),N();break;case"ArrowDown":e.preventDefault(),p(e=>(e+1)%a.length);break;case"ArrowUp":e.preventDefault(),p(e=>(e-1+a.length)%a.length);break;case"Home":e.preventDefault(),p(0);break;case"End":e.preventDefault(),p(a.length-1);break;case"Enter":case" ":e.preventDefault(),A(u);break;case"Tab":N(false)}
        }} className={k(y,v,"absolute bottom-full left-0 z-30 mb-2 w-[256px]",b?"opacity-100":"opacity-0")}>
          {a.map((e,a)=>{
            let n=e.name===r;
            return (
              <button key={e.name} type="button" role="option" aria-selected={n} data-highlighted={a===u||undefined} tabIndex={-1} onClick={()=>A(a)} onPointerMove={()=>p(a)} className={k(j,"gap-2.5 pe-8")}>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate">{e.name}</span>
                          <span className={k(z,"block truncate")}>{e.hint}</span>
                        </span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="absolute end-2" />}
                      </button>
            );
          })}
        </div>}
        <button ref={m} type="button" aria-haspopup="listbox" aria-expanded={_} aria-label={`${e}: ${r}`} onClick={()=>_?N():w(0,true)} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),w(0,false)):"ArrowUp"===e.key&&(e.preventDefault(),w(a.length-1,false))
        }} className={k("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900/78 dark:text-neutral-100/78 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] hover:not-disabled:text-neutral-900 active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:hover:not-disabled:bg-neutral-100/8 dark:hover:not-disabled:text-neutral-100 dark:active:not-disabled:bg-neutral-100/12 dark:aria-expanded:bg-neutral-100/8 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-7 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-[13px]/[16px] font-bold tabular-nums")}>
          <span className={k("truncate",s)}>{r}</span>
          <HugeiconsIcon icon={Icon_20148} size={14} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
  );
}

let W = [{command:"/summarize",label:"Summarize the thread",icon:Icon_31964},{command:"/explain",label:"Explain this code",icon:Icon_81320},{command:"/tests",label:"Write unit tests",icon:Icon_17248},{command:"/docs",label:"Search the docs",icon:Icon_96022},{command:"/fix",label:"Fix the failing build",icon:Icon_69554}];

let C = [{name:"auth-service.ts",size:"12 KB"},{name:"billing-invoice-4021.pdf",size:"1.2 MB"}];

let $ = (...e)=>e.filter(Boolean).join(" ");

let T = "text-neutral-900/62 dark:text-neutral-100/62";

let F = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let L = "h-7 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3 text-[13px]/[16px] font-bold tabular-nums";

let H = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let K = $("text-[14px]/[20px] font-medium",T);

let B = [{name:"Atlas",hint:"Best for coding"},{name:"Ember",hint:"Fast, general purpose"},{name:"Atlas Long",hint:"Long context"}];

function q({label:e,options:a,value:r,onChange:c,triggerMaxWidth:s}){
  let[_,d]=useState(false),[b,x]=useState(false),[u,p]=useState(0),h=useRef(null),k=useRef(null),m=useRef(null),v=useRef(undefined);
  useEffect(()=>{
    if(!_)return;
    let e=h.current?.ownerDocument??document,a=e=>{
      h.current?.contains(e.target)||(d(false),x(false))
    };
    return e.addEventListener("pointerdown",a),()=>e.removeEventListener("pointerdown",a);
  }, [_]),useEffect(()=>{
    _&&m.current?.focus({preventScroll:true})
  }, [_]),useEffect(()=>()=>cancelAnimationFrame(v.current??0), []);
  let f=(e,a)=>{
    p(e),d(true),a?(x(false),v.current=requestAnimationFrame(()=>x(true))):x(true)
  },g=(e=true)=>{
    d(false),x(false),e&&k.current?.focus({preventScroll:true})
  },w=e=>{
    c(a[e].name),g()
  };
  return (
    <div ref={h} className="relative">
        {_&&<div ref={m} role="listbox" aria-label={e} tabIndex={-1} onKeyDown={e=>{
          switch(e.key){case"Escape":e.preventDefault(),g();break;case"ArrowDown":e.preventDefault(),p(e=>(e+1)%a.length);break;case"ArrowUp":e.preventDefault(),p(e=>(e-1+a.length)%a.length);break;case"Home":e.preventDefault(),p(0);break;case"End":e.preventDefault(),p(a.length-1);break;case"Enter":case" ":e.preventDefault(),w(u);break;case"Tab":g(false)}
        }} className={$("min-w-52 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--rb-r-3xl,16px))] border border-transparent bg-white dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] p-2 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_0_0_1px_rgb(84_62_32/0.08),0_24px_56px_-20px_rgb(84_62_32/0.34),0_6px_16px_-8px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.65),0_24px_56px_-16px_rgb(0_0_0/0.8)]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale,translate] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms]","absolute bottom-full left-0 z-30 mb-2 w-[256px]",b?"opacity-100":"opacity-0")}>
          {a.map((e,a)=>{
            let n=e.name===r;
            return (
              <button key={e.name} type="button" role="option" aria-selected={n} data-highlighted={a===u||undefined} tabIndex={-1} onClick={()=>w(a)} onPointerMove={()=>p(a)} className={$("relative flex min-h-10 w-full cursor-default items-center gap-2.5 rounded-[calc(var(--rb-r-md,8px))] px-3 py-2 text-left text-[15px]/[20px] font-semibold text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/70 hover:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] focus-visible:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] data-[highlighted]:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/70 dark:hover:bg-neutral-100/7 dark:focus-visible:bg-neutral-100/7 dark:data-[highlighted]:bg-neutral-100/7 dark:aria-selected:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-disabled:text-neutral-100/40","gap-2.5 pe-8")}>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate">{e.name}</span>
                          <span className={$(K,"block truncate")}>{e.hint}</span>
                        </span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={18} strokeWidth={2} aria-hidden="true" className="absolute end-2" />}
                      </button>
            );
          })}
        </div>}
        <button ref={k} type="button" aria-haspopup="listbox" aria-expanded={_} aria-label={`${e}: ${r}`} onClick={()=>_?g():f(0,true)} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),f(0,false)):"ArrowUp"===e.key&&(e.preventDefault(),f(a.length-1,false))
        }} className={$("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900/78 dark:text-neutral-100/78 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] hover:not-disabled:text-neutral-900 active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:hover:not-disabled:bg-neutral-100/8 dark:hover:not-disabled:text-neutral-100 dark:active:not-disabled:bg-neutral-100/12 dark:aria-expanded:bg-neutral-100/8 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40",L)}>
          <span className={$("truncate",s)}>{r}</span>
          <HugeiconsIcon icon={Icon_20148} size={14} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
  );
}

let V = (...e)=>e.filter(Boolean).join(" ");

let X = "text-neutral-900/62 dark:text-neutral-100/62";

let Q = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let G = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let J = "relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40";

let Y = [{label:"Landing page",icon:Icon_92916},{label:"Analytics dashboard",icon:Icon_2972},{label:"Storefront",icon:Icon_2775},{label:"Onboarding flow",icon:Icon_92190}];

let ee = [{key:"tone",label:"Tone",placeholder:"warm, direct, playful"},{key:"audience",label:"Audience",placeholder:"existing customers"},{key:"product",label:"Product",placeholder:"the feature you ship"}];

let ea = (...e)=>e.filter(Boolean).join(" ");

let er = "h-8 gap-1.5 rounded-[calc(var(--rb-r-full,999px))] px-3.5 text-[14px]/[18px] font-bold";

let el = (...e)=>e.filter(Boolean).join(" ");

let eo = "text-neutral-900/62 dark:text-neutral-100/62";

let ei = "rounded-[var(--rb-r-4xl,18px)]";

let ec = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_68%,white),var(--rb-accent,oklch(84%_0.15_165)))] text-[var(--rb-accent-fg,oklch(26%_0.06_168))] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_4px_10px_-4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_80%,transparent)] hover:not-disabled:-translate-y-px hover:not-disabled:brightness-[1.04] hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black),0_7px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_85%,transparent)] active:not-disabled:translate-y-px active:not-disabled:brightness-[0.98] active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_55%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_70%,black)] motion-reduce:hover:translate-y-0 disabled:opacity-45 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_78%,white),var(--rb-accent,oklch(81%_0.16_163)))] dark:text-[var(--rb-accent-fg,oklch(26%_0.06_168))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_6px_16px_-6px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,transparent)] dark:hover:not-disabled:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_58%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black),0_9px_22px_-8px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_60%,transparent)] dark:active:not-disabled:shadow-[inset_0_2px_4px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_45%,black),0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_55%,black)] dark:disabled:shadow-none";

let es = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,translate,filter] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:duration-[90ms] motion-reduce:active:translate-y-0 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] bg-transparent text-neutral-900 hover:not-disabled:bg-[color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white)] active:not-disabled:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/8 dark:active:not-disabled:bg-neutral-100/12 dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:disabled:text-neutral-100/40";

let e_ = "size-8 rounded-[calc(var(--rb-r-full,999px))]";

let ed = "relative flex min-w-0 flex-col overflow-hidden rounded-[calc(var(--rb-r-6xl,26px))] border border-transparent bg-[var(--rb-n-100,oklch(97.7%_0.0055_80))] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-[inset_0_0_0_1px_rgb(84_62_32/0.05)] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]";


export default function prompt_input_1__Sorbet__Component(){
  let[e,a]=useState(""),[r,o]=useState(C),[i,c]=useState(E[0].name),[s,_]=useState(false),[d,b]=useState(0),[N,M]=useState(false),[$,T]=useState(1),[F,L]=useState(1),[H,K]=useState(false),[B,q]=useState(false),[I,P]=useState(false),[O,U]=useState(),V=useRef(null),X=useRef(null),Q=useRef(null),G=useRef(null),J=useRef(null),Y=useRef(null),Z=useRef(undefined),ee=useRef(undefined),ea=useRef(false),er=useId(),et=useRef(undefined);
  useEffect(()=>{
    let e=G.current;
    if(!e)return;
    let a=()=>{
      e.style.height="auto",0!==e.scrollHeight&&(e.style.height=`${Math.min(e.scrollHeight,200)}px`)
    };
    a();
    let r=requestAnimationFrame(a);
    e.ownerDocument.fonts?.ready.then(a).catch(()=>{});
    let t=e.clientWidth,n=e.ownerDocument.defaultView;
    if(!ResizeObserver)return ()=>cancelAnimationFrame(r);
    let l=new ResizeObserver(()=>{
      e.clientWidth!==t&&(t=e.clientWidth,a())
    });
    return l.observe(e),()=>{
      cancelAnimationFrame(r),l.disconnect()
    };
  }, [e]),useEffect(()=>()=>clearTimeout(et.current), []),useEffect(()=>()=>{
    cancelAnimationFrame(Z.current??0),clearTimeout(ee.current)
  }, []);
  let en=(e=true)=>{
    cancelAnimationFrame(Z.current??0),clearTimeout(ee.current),ea.current=e,q(false),ee.current=setTimeout(()=>K(false),120)
  };
  useEffect(()=>{
    !H&&ea.current&&(ea.current=false,Y.current?.focus({preventScroll:true}))
  }, [H]),useEffect(()=>{
    if(H)return;
    let e=setTimeout(()=>L($),180);
    return ()=>clearTimeout(e);
  }, [H,$]),useEffect(()=>{
    if(!H)return;
    let e=J.current,a=e?.ownerDocument??document,r=a=>{
      let r=e?.querySelector('[role="slider"]');
      r?.contains(a.target)||(ea.current=false,q(false),ee.current=setTimeout(()=>K(false),120))
    };
    return a.addEventListener("pointerdown",r),()=>a.removeEventListener("pointerdown",r);
  }, [H]),useEffect(()=>{
    B&&J.current?.querySelector('[role="slider"]')?.focus({preventScroll:true})
  }, [B]);
  let el=e.startsWith("/")?e.slice(1).toLowerCase():null,eo=useMemo(()=>null===el?[]:W.filter(e=>e.command.slice(1).startsWith(el)), [el]),ei=eo.length>0&&!N&&!s,ec=Math.min(d,Math.max(0,eo.length-1)),es=(e.trim().length>0||r.length>0)&&!N,e_=e=>{
    a(`${e} `),G.current?.focus({preventScroll:true})
  },ed=()=>{
    es&&(M(true),a(""),o([]),et.current=setTimeout(()=>M(false),1800))
  };
  return useLayoutEffect(()=>{
    if(!ei)return;
    let e=V.current,a=X.current;
    e&&a&&U(Math.max(a.getBoundingClientRect().top-e.getBoundingClientRect().top-16,96))
  }, [ei,eo.length]),useEffect(()=>{
    if(!ei)return;
    let e=Q.current,a=e?.children[ec];
    if(!(a instanceof HTMLElement)||!e)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [ec,ei]),<div ref={V} className={k("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full w-full min-h-[560px] flex-col overflow-hidden")}>
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-8 sm:px-6">
      <div ref={X} className="relative w-full">
        {ei&&<div id={`${er}-menu`} ref={Q} role="listbox" aria-label="Commands" style={{maxHeight:O}} className={k(y,"absolute bottom-full left-0 z-30 mb-2 w-[288px]")}>
          {eo.map((e,a)=>(
            <button key={e.command} id={`${er}-option-${a}`} type="button" role="option" aria-selected={a===ec} tabIndex={-1} onClick={()=>e_(e.command)} onPointerMove={()=>b(a)} className={k(j,"gap-2.5")}>
                        <HugeiconsIcon icon={e.icon} size={16} strokeWidth={2} aria-hidden="true" />
                        <span className="min-w-0 flex-1 truncate">{e.label}</span>
                        <span className={k("font-mono text-[12px]/[16px] tabular-nums",m,"shrink-0")}>{e.command}</span>
                      </button>
          ))}
        </div>}
        <div className="relative">
          <div inert={H} className={k("relative flex w-full min-w-0 flex-col rounded-[calc(min(var(--rb-r-6xl,26px),min(var(--rb-r-full,999px),16px)_+_8px))] border border-transparent bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_0_0_1px_rgb(84_62_32/0.07),0_1px_2px_rgb(84_62_32/0.06),0_8px_22px_-10px_rgb(84_62_32/0.20)] transition-[box-shadow] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:shadow-[0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent),0_8px_22px_-10px_rgb(84_62_32/0.2)] dark:bg-[color-mix(in_oklab,var(--color-neutral-900)_74%,var(--color-neutral-800))] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_0_0_1px_rgb(0_0_0/0.6),0_10px_24px_-12px_rgb(0_0_0/0.8)] dark:focus-within:shadow-[0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163)),0_0_0_5px_color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)]",H&&"*:invisible")}>
            {r.length>0&&<div className="flex flex-wrap gap-1.5 px-4 pt-3">
              {r.map(e=>(
                <span key={e.name} className="relative inline-flex h-8 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[calc(var(--rb-r-full,999px))] border border-transparent bg-[linear-gradient(180deg,#ffffff,var(--rb-n-100,oklch(97.7%_0.0055_80)))] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)),var(--color-neutral-800))] shadow-[0_0_0_1px_rgb(84_62_32/0.10),0_1px_1px_rgb(84_62_32/0.07),0_2px_5px_-2px_rgb(84_62_32/0.14)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_0_0_1px_rgb(0_0_0/0.6),0_2px_4px_-1px_rgb(0_0_0/0.5)] px-3.5 text-[14px]/[18px] font-bold text-neutral-900 dark:text-neutral-100 select-none transition-[background-color,border-color,box-shadow,color,scale,translate,outline-color] duration-[240ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] active:translate-y-px active:duration-[90ms] motion-reduce:active:translate-y-0 hover:not-disabled:bg-[linear-gradient(180deg,#ffffff,color-mix(in_oklab,var(--rb-n-200,oklch(92.8%_0.009_76))_74%,white))] dark:hover:not-disabled:bg-[linear-gradient(180deg,var(--color-neutral-700),color-mix(in_oklab,var(--color-neutral-700)_55%,var(--color-neutral-800)))] aria-pressed:bg-none aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_22%,transparent)] aria-pressed:shadow-[inset_0_0_0_1.5px_color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] aria-expanded:bg-none aria-expanded:bg-[var(--rb-n-200,oklch(92.8%_0.009_76))] aria-expanded:shadow-[inset_0_1px_3px_rgb(84_62_32/0.14)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:aria-pressed:bg-[color-mix(in_oklab,var(--rb-accent,oklch(81%_0.16_163))_18%,transparent)] dark:aria-pressed:shadow-[inset_0_0_0_1.5px_var(--rb-accent,oklch(81%_0.16_163))] dark:aria-expanded:bg-neutral-800 dark:disabled:text-neutral-100/40">
                                <HugeiconsIcon icon={Icon_48094} size={16} strokeWidth={2} aria-hidden="true" className={m} />
                                <span className="min-w-0 truncate">{e.name}</span>
                                <span className={k(m,"shrink-0 tabular-nums")}>{e.size}</span>
                                <button type="button" aria-label={`Remove ${e.name}`} onClick={()=>o(a=>a.filter(a=>a.name!==e.name))} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[calc(var(--rb-r-full,999px))] text-neutral-900/78 dark:text-neutral-100/78 transition-[background-color,color] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-neutral-900/8 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_oklab,var(--rb-accent,oklch(84%_0.15_165))_58%,black)] dark:focus-visible:outline-[var(--rb-accent,oklch(81%_0.16_163))] dark:hover:bg-neutral-100/12 dark:hover:text-neutral-100">
                                  <HugeiconsIcon icon={Icon_89289} size={14} strokeWidth={2} aria-hidden="true" />
                                </button>
                              </span>
              ))}
            </div>}
            <textarea ref={G} rows={1} value={e} onChange={e=>{
              var r;
              return r=e.target.value,void(_(false),b(0),a(r));
            }} onKeyDown={e=>{
              if(ei)switch(e.key){case"Escape":e.preventDefault(),_(true);return;case"ArrowDown":e.preventDefault(),b(e=>(e+1)%eo.length);return;case"ArrowUp":e.preventDefault(),b(e=>(e-1+eo.length)%eo.length);return;case"Home":e.preventDefault(),b(0);return;case"End":e.preventDefault(),b(eo.length-1);return;case"Enter":case"Tab":e.preventDefault(),e_(eo[ec].command);return}
              "Enter"!==e.key||e.shiftKey||(e.preventDefault(),ed())
            }} placeholder="Ask anything" aria-label="Message" role="combobox" aria-expanded={ei} aria-controls={ei?`${er}-menu`:undefined} aria-activedescendant={ei?`${er}-option-${ec}`:undefined} aria-autocomplete="list" className={k("max-h-40 min-h-6 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1.5 field-sizing-content text-[15px]/[22px] font-medium text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/55 dark:placeholder:text-neutral-100/55","block max-h-[200px] min-h-[52px] w-full px-4 py-3.5")} />
            <div className="flex items-center gap-1 px-2.5 pb-2.5 pt-1">
              <button type="button" aria-label="Attach a file" onClick={()=>{
                o(e=>[...e,{name:`reference-${e.length+1}.md`,size:`${8+3*e.length} KB`}])
              }} className={k(g,w)}>
                <HugeiconsIcon icon={Icon_48094} size={18} strokeWidth={2} aria-hidden="true" />
              </button>
              <R label="Model" options={E} value={i} onChange={c} triggerMaxWidth="max-w-[10rem]" />
              {N?<button type="button" onClick={()=>{
                clearTimeout(et.current),M(false)
              }} aria-label="Stop generating" className={k(f,w,"ml-auto")}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<div className="ml-auto flex items-center gap-1">
                <button ref={Y} type="button" aria-haspopup="dialog" aria-expanded={H} aria-label={`Reasoning effort: ${A[$]}`} onClick={e=>{
                  var a;
                  return H?en():(a=e.detail>0,void(clearTimeout(ee.current),K(true),a?(q(false),Z.current=requestAnimationFrame(()=>q(true))):q(true)));
                }} className={k(g,w)}><D level={F} /></button>
                <button type="button" aria-pressed={I} aria-label={I?"Stop recording":"Record voice"} onClick={()=>P(e=>!e)} className={k(g,w)}>
                  <HugeiconsIcon icon={Icon_68686} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                <button type="button" aria-label="Send" disabled={!es} onClick={ed} className={k(f,w)}>
                  <HugeiconsIcon icon={Icon_40972} size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>}
            </div>
          </div>
          {H&&<div ref={J} role="dialog" aria-label="Reasoning effort" onKeyDown={e=>{
            "Escape"===e.key&&(e.preventDefault(),en())
          }} className={k(v,"absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 px-4",B?"opacity-100":"opacity-0")}>
            <p className={k("text-[15px]/[20px] font-bold","relative")}>{A[$]}</p>
            <S level={$} onChange={T} />
          </div>}
        </div>
        <p className={k(z,"mt-3 px-1")}>{N?"Working on it…":"Type / to run a command, or drop a file to attach it."}</p>
      </div>
    </div>
  </div>;
}
