/**
 * React Bits Pro — Application UI (app-shell-8)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, label, observe, queues, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_68240 = [["path",{d:"M8.00002 4L8 4.99997C7.99998 5.94279 7.99998 6.4142 8.29287 6.7071C8.58577 7 9.05718 7 10 7L14 7C14.9428 7 15.4142 7 15.7071 6.70711C16 6.41421 16 5.94281 16 5V4",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.45 4L13.7149 4.1492C13.7853 4.49569 14.088 4.746 14.4416 4.74995L14.45 4ZM9.54997 4L9.55835 4.74995C9.91188 4.746 10.2146 4.49569 10.285 4.1492L9.54997 4ZM19.1213 4.87868L19.6517 4.34835L19.6517 4.34835L19.1213 4.87868ZM19.1213 21.1213L19.6517 21.6517V21.6517L19.1213 21.1213ZM16 4.01732L16.0226 3.26766C16.0179 3.26752 16.0131 3.26742 16.0084 3.26737L16 4.01732ZM4.87868 4.87868L5.40901 5.40901V5.40901L4.87868 4.87868ZM8 4.01732L7.99162 3.26737C7.98688 3.26742 7.98215 3.26752 7.97741 3.26766L8 4.01732ZM14.45 4L15.185 3.8508C14.8838 2.36703 13.5732 1.25 12 1.25V2V2.75C12.8457 2.75 13.5529 3.35073 13.7149 4.1492L14.45 4ZM12 2V1.25C10.4268 1.25 9.11615 2.36703 8.81496 3.8508L9.54997 4L10.285 4.1492C10.4471 3.35073 11.1542 2.75 12 2.75V2ZM20 10H20.75C20.75 8.60699 20.7516 7.48678 20.6335 6.60825C20.5125 5.70814 20.2536 4.95027 19.6517 4.34835L19.1213 4.87868L18.591 5.40901C18.8678 5.68577 19.0482 6.07435 19.1469 6.80812C19.2484 7.56347 19.25 8.56458 19.25 10H20ZM20 16H20.75V10H20H19.25V16H20ZM20 16H19.25C19.25 17.4354 19.2484 18.4365 19.1469 19.1919C19.0482 19.9257 18.8678 20.3142 18.591 20.591L19.1213 21.1213L19.6517 21.6517C20.2536 21.0497 20.5125 20.2919 20.6335 19.3918C20.7516 18.5132 20.75 17.393 20.75 16H20ZM14 22V22.75C15.393 22.75 16.5132 22.7516 17.3918 22.6335C18.2919 22.5125 19.0497 22.2536 19.6517 21.6517L19.1213 21.1213L18.591 20.591C18.3142 20.8678 17.9257 21.0482 17.1919 21.1469C16.4365 21.2484 15.4354 21.25 14 21.25V22ZM16 4.01732L15.9774 4.76698C17.5421 4.81413 18.1804 4.99842 18.591 5.40901L19.1213 4.87868L19.6517 4.34835C18.7796 3.47633 17.5648 3.31413 16.0226 3.26766L16 4.01732ZM10 22V22.75H14V22V21.25H10V22ZM10 22V21.25C8.56458 21.25 7.56347 21.2484 6.80812 21.1469C6.07434 21.0482 5.68577 20.8678 5.40901 20.591L4.87868 21.1213L4.34835 21.6517C4.95027 22.2536 5.70814 22.5125 6.60825 22.6335C7.48678 22.7516 8.60699 22.75 10 22.75V22ZM4 16H3.25C3.25 17.393 3.24841 18.5132 3.36652 19.3918C3.48754 20.2919 3.74643 21.0497 4.34835 21.6517L4.87868 21.1213L5.40901 20.591C5.13225 20.3142 4.9518 19.9257 4.85315 19.1919C4.75159 18.4365 4.75 17.4354 4.75 16H4ZM4 10H4.75C4.75 8.56458 4.75159 7.56347 4.85315 6.80812C4.9518 6.07435 5.13225 5.68577 5.40901 5.40901L4.87868 4.87868L4.34835 4.34835C3.74643 4.95027 3.48754 5.70814 3.36652 6.60825C3.24841 7.48678 3.25 8.60699 3.25 10H4ZM8 4.01732L7.97741 3.26766C6.43521 3.31413 5.22037 3.47633 4.34835 4.34835L4.87868 4.87868L5.40901 5.40901C5.8196 4.99842 6.4579 4.81413 8.02259 4.76698L8 4.01732ZM4 10H3.25V16H4H4.75V10H4ZM8 4.01732L8.00838 4.76728L9.55835 4.74995L9.54997 4L9.54159 3.25005L7.99162 3.26737L8 4.01732ZM16 4.01732L16.0084 3.26737L14.4583 3.25005L14.45 4L14.4416 4.74995L15.9916 4.76728L16 4.01732Z",fill:"currentColor",key:"1"}],["path",{d:"M12 12H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M12 17H16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M8 12H8.01",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M8 17H8.01",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}]];
const Icon_22830 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_68142 = [["path",{d:"M19.5 17.5C19.5 18.8807 18.3807 20 17 20C15.6193 20 14.5 18.8807 14.5 17.5C14.5 16.1193 15.6193 15 17 15C18.3807 15 19.5 16.1193 19.5 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 17.5C9.5 18.8807 8.38071 20 7 20C5.61929 20 4.5 18.8807 4.5 17.5C4.5 16.1193 5.61929 15 7 15C8.38071 15 9.5 16.1193 9.5 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 17.5H9.5M19.5 17.5H20.2632C20.4831 17.5 20.5931 17.5 20.6855 17.4885C21.3669 17.4036 21.9036 16.8669 21.9885 16.1855C22 16.0931 22 15.9831 22 15.7632V13C22 9.41015 19.0899 6.5 15.5 6.5M2 4H12C13.4142 4 14.1213 4 14.5607 4.43934C15 4.87868 15 5.58579 15 7V15.5M2 12.75V15C2 15.9346 2 16.4019 2.20096 16.75C2.33261 16.978 2.52197 17.1674 2.75 17.299C3.09808 17.5 3.56538 17.5 4.5 17.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 7H8M2 10H6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_32406 = [["path",{d:"M12 22C11.1818 22 10.4002 21.6698 8.83693 21.0095C4.94564 19.3657 3 18.5438 3 17.1613C3 16.7742 3 10.0645 3 7M12 22C12.8182 22 13.5998 21.6698 15.1631 21.0095C19.0544 19.3657 21 18.5438 21 17.1613V7M12 22L12 11.3548",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.32592 9.69138L5.40472 8.27785C3.80157 7.5021 3 7.11423 3 6.5C3 5.88577 3.80157 5.4979 5.40472 4.72215L8.32592 3.30862C10.1288 2.43621 11.0303 2 12 2C12.9697 2 13.8712 2.4362 15.6741 3.30862L18.5953 4.72215C20.1984 5.4979 21 5.88577 21 6.5C21 7.11423 20.1984 7.5021 18.5953 8.27785L15.6741 9.69138C13.8712 10.5638 12.9697 11 12 11C11.0303 11 10.1288 10.5638 8.32592 9.69138Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 12L8 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M17 4L7 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_18327 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M12.1258 14H12.0008M12.1258 18H12.0008M7.625 14H7.5M7.625 18H7.5M16.625 14H16.5M12.2508 14C12.2508 14.1381 12.1389 14.25 12.0008 14.25C11.8628 14.25 11.7508 14.1381 11.7508 14C11.7508 13.8619 11.8628 13.75 12.0008 13.75C12.1389 13.75 12.2508 13.8619 12.2508 14ZM12.2508 18C12.2508 18.1381 12.1389 18.25 12.0008 18.25C11.8628 18.25 11.7508 18.1381 11.7508 18C11.7508 17.8619 11.8628 17.75 12.0008 17.75C12.1389 17.75 12.2508 17.8619 12.2508 18ZM7.75 14C7.75 14.1381 7.63807 14.25 7.5 14.25C7.36193 14.25 7.25 14.1381 7.25 14C7.25 13.8619 7.36193 13.75 7.5 13.75C7.63807 13.75 7.75 13.8619 7.75 14ZM7.75 18C7.75 18.1381 7.63807 18.25 7.5 18.25C7.36193 18.25 7.25 18.1381 7.25 18C7.25 17.8619 7.36193 17.75 7.5 17.75C7.63807 17.75 7.75 17.8619 7.75 18ZM16.75 14C16.75 14.1381 16.6381 14.25 16.5 14.25C16.3619 14.25 16.25 14.1381 16.25 14C16.25 13.8619 16.3619 13.75 16.5 13.75C16.6381 13.75 16.75 13.8619 16.75 14Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_54810 = [["path",{d:"M2.5 13.8333L6 17.5L7.02402 16.4272M16.5 6.5L10.437 12.8517",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 13.8333L11 17.5L21.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_24580 = [["path",{d:"M5.25 5L19.25 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M22.25 12C22.25 6.47715 17.7728 2 12.25 2C6.72715 2 2.25 6.47715 2.25 12C2.25 17.5228 6.72715 22 12.25 22C17.7728 22 22.25 17.5228 22.25 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_85585 = [["path",{d:"M5.0249 21C5.04385 19.2643 5.04366 17.5541 5.0366 15.9209M5.0366 15.9209C5.01301 10.4614 4.91276 5.86186 5.19475 4.04271C5.5611 1.67939 9.39301 3.82993 13.9703 5.59842L16.0328 6.48729C17.5508 7.1415 19.7187 8.30352 18.7662 9.66084C18.3738 10.22 17.56 10.8596 16.0575 11.567L5.0366 15.9209Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_1836 = [["path",{d:"M4 5L20 5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4 12L20 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4 19L20 19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let k = (...e)=>e.filter(Boolean).join(" ");

function v(){
  let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
    let a=e.current;
    if(!a)return;
    let{scrollTop:t,scrollHeight:n,clientHeight:i}=a;
    r({start:t>1,end:Math.ceil(t+i)<n-1})
  }, []);
  return useEffect(()=>{
    t();
    let a=e.current,r=a?.ownerDocument.defaultView;
    if(!a||!r?.ResizeObserver)return;
    let n=new r.ResizeObserver(t);
    return observe(a),()=>disconnect();
  }, [t]),{ref:e,edges:a,onScroll:t};
}

let g = "rounded-[var(--rb-r-sm,6px)]",
  _ = "text-neutral-900 dark:text-neutral-100",
  w = "text-neutral-900/80 dark:text-neutral-100/80",
  y = "text-neutral-900/66 dark:text-neutral-100/66",
  j = "border-t border-neutral-900/8 dark:border-neutral-100/8",
  N = "text-[13px]/[18px] font-normal",
  C = "text-[14px]/[16px] font-[450]",
  S = "text-[12px]/[16px] font-normal tabular-nums",
  A = "font-mono text-[12px]/[16px] tabular-nums",
  W = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  z = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  O = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  R = "size-8 rounded-[var(--rb-r-sm,6px)]",
  T = "relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none",
  D = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  E = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  H = "transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none",
  F = "border-r border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900",
  P = "flex h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 text-left text-[14px]/[16px] font-[450] text-neutral-900/80 transition-[background-color,color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] [&_svg]:shrink-0 hover:bg-neutral-900/5 hover:text-neutral-900 aria-[current=page]:bg-neutral-900/9 aria-[current=page]:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100 dark:aria-[current=page]:bg-neutral-100/9 dark:aria-[current=page]:text-neutral-100",
  B = "bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900",
  M = {Scheduled:"text-neutral-900 dark:text-neutral-100","En route":"text-neutral-900 dark:text-neutral-100","Waiting on parts":"text-[oklch(49%_0.1_68)] dark:text-[oklch(80%_0.13_68)]",Overdue:"text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",Completed:"text-neutral-900/80 dark:text-neutral-100/80"},
  q = [{id:"WO-4821",customer:"Ferngate Dental",service:"Annual boiler service",technician:"Priya Raman",window:"08:00 – 10:00",status:"Completed",day:"today"},{id:"WO-4822",customer:"Halstead Grocers",service:"Walk-in cooler not holding temperature",technician:"Dominic Fuchs",window:"08:30 – 10:30",status:"Completed",day:"today"},{id:"WO-4823",customer:"Riverbend Assisted Living and Rehabilitation Center",service:"Rooftop unit 3 compressor fault",technician:"Dominic Fuchs",window:"09:00 – 12:00",status:"En route",day:"today"},{id:"WO-4824",customer:"Northline Logistics",service:"Loading bay heater inspection",technician:"Amara Osei",window:"10:00 – 11:00",status:"En route",day:"today"},{id:"WO-4825",customer:"Cobb and Wren Bakery",service:"Proofer thermostat replacement",technician:null,window:"10:30 – 12:30",status:"Overdue",day:"today"},{id:"WO-4826",customer:"Aldergate Primary School",service:"Boiler room annual certification",technician:"Priya Raman",window:"11:00 – 13:00",status:"Scheduled",day:"today"},{id:"WO-4827",customer:"Pinebrook Veterinary",service:"Autoclave leaking at the door seal",technician:"Amara Osei",window:"12:00 – 14:00",status:"Waiting on parts",day:"today"},{id:"WO-4828",customer:"Kestrel Sports Centre",service:"Pool dehumidifier service",technician:"Joachim Bauer",window:"13:00 – 15:00",status:"Scheduled",day:"today"},{id:"WO-4829",customer:"Vance and Hollis Solicitors",service:"Air handling unit filter change",technician:null,window:"13:30 – 14:30",status:"Scheduled",day:"today"},{id:"WO-4830",customer:"Sablefield Hotel",service:"Kitchen extraction fan noise",technician:"Joachim Bauer",window:"14:00 – 16:00",status:"Waiting on parts",day:"today"},{id:"WO-4831",customer:"Orchard Park Clinic",service:"Chiller pressure alarm",technician:"Dominic Fuchs",window:"15:00 – 17:00",status:"Scheduled",day:"today"},{id:"WO-4832",customer:"Trenholm Manufacturing",service:"Compressed air line leak survey",technician:null,window:"16:00 – 18:00",status:"Scheduled",day:"today"},{id:"WO-4833",customer:"Ashgrove Retail Park",service:"Quarterly maintenance, units 1 to 6",technician:"Priya Raman",window:"08:00 – 11:00",status:"Scheduled",day:"tomorrow"},{id:"WO-4834",customer:"Merrow Dental Practice",service:"Compressor annual service",technician:"Amara Osei",window:"09:00 – 10:30",status:"Scheduled",day:"tomorrow"},{id:"WO-4835",customer:"Bexley Print Works",service:"Humidity control recalibration",technician:null,window:"10:00 – 12:00",status:"Scheduled",day:"tomorrow"},{id:"WO-4836",customer:"Calderwood Care Home",service:"Hot water cylinder replacement",technician:"Joachim Bauer",window:"11:00 – 15:00",status:"Waiting on parts",day:"tomorrow"},{id:"WO-4837",customer:"Hollowbrook Leisure",service:"Sauna heater fault",technician:"Dominic Fuchs",window:"13:00 – 14:30",status:"Scheduled",day:"tomorrow"},{id:"WO-4838",customer:"Quillon Data Centre",service:"Condensate alarm on cooling unit 2",technician:"Priya Raman",window:"15:00 – 18:00",status:"Scheduled",day:"tomorrow"},{id:"WO-4802",customer:"Bramley Court Apartments",service:"Communal boiler flue repair",technician:"Amara Osei",window:"08:00 – 11:00",status:"Completed",day:"earlier"},{id:"WO-4805",customer:"Thornecroft Garden Centre",service:"Irrigation pump rewire",technician:"Joachim Bauer",window:"09:30 – 11:30",status:"Completed",day:"earlier"},{id:"WO-4809",customer:"Denbury Motors",service:"Spray booth extraction service",technician:"Priya Raman",window:"10:00 – 13:00",status:"Completed",day:"earlier"},{id:"WO-4813",customer:"Whitlock Pharmacy",service:"Fridge temperature logger fault",technician:"Dominic Fuchs",window:"11:00 – 12:00",status:"Completed",day:"earlier"},{id:"WO-4816",customer:"Eastvale Community Pool",service:"Backwash valve replacement",technician:"Amara Osei",window:"13:00 – 16:00",status:"Completed",day:"earlier"},{id:"WO-4818",customer:"Garrick Chambers",service:"Split system decommission",technician:null,window:"15:00 – 16:30",status:"Completed",day:"earlier"}],
  L = [{id:"today",label:"Today",icon:Icon_68240,match:e=>"today"===e.day,emptyTitle:"Nothing booked today",emptyHelp:"New jobs land here as soon as they are scheduled."},{id:"unassigned",label:"Unassigned",icon:Icon_22830,match:e=>null===e.technician&&"earlier"!==e.day,emptyTitle:"Every job has an engineer",emptyHelp:"Jobs without an engineer are collected here."},{id:"progress",label:"In progress",icon:Icon_68142,match:e=>"En route"===e.status,emptyTitle:"No one is on the road",emptyHelp:"Jobs appear here once an engineer starts travelling."},{id:"parts",label:"Waiting on parts",icon:Icon_32406,match:e=>"Waiting on parts"===e.status,emptyTitle:"No jobs are held up",emptyHelp:"Jobs paused for a part are collected here."},{id:"tomorrow",label:"Tomorrow",icon:Icon_18327,match:e=>"tomorrow"===e.day,emptyTitle:"Tomorrow is clear",emptyHelp:"Bookings for tomorrow appear here as they come in."},{id:"week",label:"This week",icon:Icon_18327,match:e=>"earlier"!==e.day,emptyTitle:"This week is clear",emptyHelp:"Bookings for the next seven days appear here."},{id:"completed",label:"Completed",icon:Icon_54810,match:e=>"Completed"===e.status,emptyTitle:"No completed jobs yet",emptyHelp:"Signed-off jobs move here automatically."},{id:"cancelled",label:"Cancelled",icon:Icon_24580,match:()=>false,emptyTitle:"No cancelled jobs",emptyHelp:"Cancelled jobs stay here for 90 days before they are archived."}],
  J = [{label:"Dispatch",queues:["today","unassigned","progress","parts"]},{label:"Upcoming",queues:["tomorrow","week"]},{label:"Archive",queues:["completed","cancelled"]}],
  Q = ["today","unassigned","progress","tomorrow","completed"],
  I = e=>L.find(a=>a.id===e),
  K = [{id:"window",label:"Time"},{id:"customer",label:"Customer"}];

function $({status:e}){
  return (
    <span className={k("inline-flex items-start gap-1.5 text-[14px]/[16px] font-[450] tabular-nums",M[e])}>
        {"En route"===e&&<span className="flex h-lh shrink-0 items-center">
          <span className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" aria-hidden="true" />
        </span>}
        {e}
      </span>
  );
}

function V({flagged:e,onToggle:a,jobId:r,alwaysVisible:n}){
  return (
    <span className={n||e?"flex shrink-0 items-center":k("flex items-center justify-end gap-0.5 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-[120ms]","shrink-0")}>
        <button type="button" aria-pressed={e} aria-label={e?`Clear follow-up on ${r}`:`Flag ${r} for follow-up`} onClick={a} className={k(z,"size-7 rounded-[var(--rb-r-sm,6px)]")}>
          <HugeiconsIcon icon={Icon_85585} size={16} strokeWidth={1.8} aria-hidden="true" className={k(e&&"[&_path]:fill-current")} />
        </button>
      </span>
  );
}

function G({job:e,flagged:a,onToggleFlag:r}){
  return (
    <li className={k("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5",g,"group min-h-11 px-3")}>
        <span className={k(A,y,"hidden w-[4.5rem] shrink-0 lg:block")}>{e.id}</span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className={k(C,"block truncate")}>{e.customer}</span>
          <span className={k(N,y,"block truncate")}>{e.service}</span>
        </span>
        <span className={k(N,w,"hidden w-32 shrink-0 truncate lg:block")}>{e.technician}</span>
        <span className={k(N,w,"text-right tabular-nums","w-[6.5rem] shrink-0")}>{e.window}</span>
        <span className="w-32 shrink-0"><$ status={e.status} /></span>
        <V flagged={a} onToggle={r} jobId={e.id} />
      </li>
  );
}

function U({job:e,flagged:a,onToggleFlag:r}){
  return (
    <li className={k(E,"p-4")}>
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className={k(C,"truncate")}>{e.customer}</p>
            <p className={k(N,y,"mt-0.5 line-clamp-2")}>{e.service}</p>
          </div>
          <V flagged={a} onToggle={r} jobId={e.id} alwaysVisible />
        </div>
        <dl className={k("bg-neutral-900/5 dark:bg-neutral-100/5",g,"mt-3 grid grid-cols-2 gap-x-4 px-3 py-2.5")}>
          <div className="min-w-0">
            <dt className={k(S,y)}>Arrival window</dt>
            <dd className={k(N,"mt-0.5 truncate tabular-nums")}>{e.window}</dd>
          </div>
          <div className="min-w-0">
            <dt className={k(S,y)}>Engineer</dt>
            <dd className={k(N,"mt-0.5 truncate")}>
              {e.technician??<span className="text-neutral-900/66 dark:text-neutral-100/66">None</span>}
            </dd>
          </div>
        </dl>
        <div className="mt-3 flex items-center justify-between gap-3">
          <$ status={e.status} />
          <span className={k(A,y,"shrink-0")}>{e.id}</span>
        </div>
      </li>
  );
}

function X({current:e,counts:a,onSelect:r}){
  return (
    <div>
        {J.map(n=>(
          <div key={label}>
                <p className="px-2 pt-4 pb-1 text-[12px]/[16px] font-normal tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{label}</p>
                <ul className="space-y-0.5">
                  {queues.map(n=>{
                    let s=I(n),l=e===n;
                    return (
                      <li key={n}>
                                  <button type="button" aria-current={l?"page":undefined} onClick={()=>r(n)} className={P}>
                                    <HugeiconsIcon icon={s.icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                                    <span className="min-w-0 flex-1 truncate text-left">{s.label}</span>
                                    {a[n]>0&&<span className="ms-auto text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{a[n]}</span>}
                                  </button>
                                </li>
                    );
                  })}
                </ul>
              </div>
        ))}
      </div>
  );
}

function Y({assigned:e,total:a,onAssign:r}){
  return (
    <div className={k(E,"mt-auto p-3")}>
        <p className={k(S,y)}>Shift coverage</p>
        <p className={k(C,"mt-1")}>
          <span className="tabular-nums">{e}</span>
          {" of"}
          {" "}
          <span className="tabular-nums">{a}</span>
          {" jobs assigned"}
        </p>
        <button type="button" onClick={r} className={k(W,O,"mt-2.5 w-full")}>Assign remaining</button>
      </div>
  );
}

function Z(){
  return <span className={k("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","size-8",C)}>C</span>;
}

let ee = e=>{
  let a="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!a&&"Home"!==e.key&&"End"!==e.key)return;
  let r=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),t=r.indexOf(e.target);
  if(t<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?r.length-1:(t+a+r.length)%r.length;
  r[n].focus(),r[n].click()
};

function ea(){
  let[e,a]=useState("today"),[r,s]=useState(""),[l,o]=useState(false),[c,d]=useState("window"),[u,h]=useState({"WO-4825":true}),[x,g]=useState(false),[N,A]=useState(false),M=useRef(false),J=useRef(null),$=useRef(null),V=useRef(null),ea=useRef(null),{ref:er,edges:et,onScroll:en}=v(),{ref:ei,edges:es,onScroll:el}=v(),{ref:eo,edges:ec,onScroll:ed}=v(),eu=useMemo(()=>{
    let e={};
    for(let a of L)e[a.id]=q.filter(a.match).length;
    return e;
  }, []),eh=I(e),ex=r.trim().toLowerCase(),em=useMemo(()=>{
    let a=q.filter(I(e).match),r=ex?a.filter(e=>`${e.id} ${e.customer} ${e.service} ${e.technician??""}`.toLowerCase().includes(ex)):a;
    return "customer"===c?[...r].sort((e,a)=>e.customer.localeCompare(a.customer)):r;
  }, [e,c,ex]),ep=eu.today,eb=ep-eu.unassigned;
  useEffect(()=>{
    l&&V.current?.focus({preventScroll:true})
  }, [l]),useEffect(()=>{
    if(!x)return;
    let e=ea.current,a=requestAnimationFrame(()=>A(true)),r=e?.ownerDocument??document,t=()=>Array.from(e?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')??[]).filter(e=>!e.hasAttribute("disabled"));
    M.current&&(t()[0]?.focus({preventScroll:true}),M.current=false);
    let n=e=>{
      if("Escape"===e.key){
        e.preventDefault(),g(false),A(false),J.current?.focus({preventScroll:true});
        return
      }
      if("Tab"!==e.key)return;
      let a=t(),n=a[0],i=a[a.length-1];
      n&&i&&(e.shiftKey&&r.activeElement===n?(e.preventDefault(),i.focus({preventScroll:true})):e.shiftKey||r.activeElement!==i||(e.preventDefault(),focus({preventScroll:true})))
    };
    return r.addEventListener("keydown",n),()=>{
      cancelAnimationFrame(a),r.removeEventListener("keydown",n)
    };
  }, [x]);
  let ef=()=>{
    g(false),A(false),J.current?.focus({preventScroll:true})
  },ek=()=>{
    s(""),o(false),$.current?.focus({preventScroll:true})
  },ev=e=>h(a=>({...a,[e]:!a[e]})),eg=e=>{
    a(e),s("")
  };
  return (
    <div className={k("bg-white dark:bg-neutral-950",_,"relative flex h-full min-h-[640px] w-full overflow-hidden")}>
        <aside aria-label="Queues" className={k(F,"hidden w-14 shrink-0 flex-col items-center md:flex lg:hidden")}>
          <div className="flex h-14 shrink-0 items-center"><Z /></div>
          <nav aria-label="Queues" className="flex flex-col items-center gap-0.5 px-2">
            {L.map(a=>{
              let r=e===a.id;
              return (
                <span key={a.id} className="w-8">
                            <button type="button" aria-label={a.label} aria-current={r?"page":undefined} onClick={()=>eg(a.id)} className={k(P,"group relative justify-center")}>
                              <HugeiconsIcon icon={a.icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                              <span aria-hidden="true" className={k("pointer-events-none inline-flex min-h-6 w-fit max-w-64 items-center gap-2 rounded-[var(--rb-r-sm,6px)] bg-neutral-900 px-2 py-1 text-[12px]/[16px] font-[450] tabular-nums text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-100 dark:text-neutral-900",H,"absolute left-full top-1/2 z-[70] ml-2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100")}>{a.label}</span>
                            </button>
                          </span>
              );
            })}
          </nav>
          <div className="mt-auto flex h-14 shrink-0 items-center">
            <span aria-hidden="true" className={T}><span className={D}>RM</span></span>
            <span className="sr-only">Signed in as Rosa Mendel, dispatcher</span>
          </div>
        </aside>
        <aside aria-label="Queues" className={k(F,"hidden w-64 shrink-0 flex-col lg:flex")}>
          <div className="flex h-14 shrink-0 items-center gap-2.5 px-3">
            <Z />
            <div className="min-w-0 flex-1">
              <p className={k(C,"truncate")}>Calder Field</p>
              <p className={k(S,y,"truncate")}>Dispatch</p>
            </div>
          </div>
          <div className="relative flex min-h-0 flex-1 flex-col">
            <div ref={er} onScroll={en} className="flex h-full flex-col overflow-y-auto px-2 pb-2">
              <nav aria-label="Queues"><X current={e} counts={eu} onSelect={eg} /></nav>
              <Y assigned={eb} total={ep} onAssign={()=>eg("unassigned")} />
            </div>
            <div aria-hidden="true" className={k("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",et.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={k("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",et.end?"opacity-100":"opacity-0")} />
          </div>
          <div className={k(j,"flex shrink-0 items-center gap-2.5 px-3 py-2.5")}>
            <span aria-hidden="true" className={T}><span className={D}>RM</span></span>
            <span className="min-w-0 flex-1">
              <span className={k(C,"block truncate")}>Rosa Mendel</span>
              <span className={k(S,y,"block truncate")}>Dispatcher</span>
            </span>
          </div>
        </aside>
        <div className={k("bg-neutral-50 dark:bg-neutral-950","flex min-w-0 flex-1 flex-col p-2")}>
          <div className={k(E,"min-h-0 flex-1")}>
            <header className="flex h-14 shrink-0 items-center gap-2 px-4 sm:px-6">
              <button ref={J} type="button" aria-label="Open queues" aria-expanded={x} onClick={()=>{
                M.current=true,g(true)
              }} className={k(z,R,"md:hidden")}>
                <HugeiconsIcon icon={Icon_1836} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 className={k("text-[16px]/[20px] font-[450] tracking-[-0.015em]","truncate")}>{eh.label}</h1>
                <p className={k(S,y,"flex min-w-0 gap-2")}>
                  <span className="truncate">Tuesday, 12 March</span>
                  <span className="shrink-0">
                    {em.length}
                    {" "}
                    {1===em.length?"job":"jobs"}
                  </span>
                </p>
              </div>
              <button ref={$} type="button" aria-label={l?"Hide search":"Search jobs"} aria-expanded={l} onClick={()=>l?ek():o(true)} className={k(z,R,"md:hidden")}>
                <HugeiconsIcon icon={l?Icon_89289:Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button type="button" className={k("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",O,"max-md:hidden")}>
                <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                Book job
              </button>
            </header>
            <div className={k("h-12 shrink-0 items-center gap-3 px-4 sm:px-6 md:flex",l?"flex":"hidden")}>
              <div className={k("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","flex-1 md:w-64 md:flex-none")}>
                <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                  <HugeiconsIcon icon={Icon_66575} size={14} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <input ref={V} type="search" value={r} onChange={e=>s(e.target.value)} onKeyDown={e=>{
                  "Escape"===e.key&&l&&ek()
                }} aria-label="Search jobs" placeholder="Search jobs" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
              </div>
              <div role="radiogroup" aria-label="Sort jobs" onKeyDown={ee} className={k("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-8","ml-auto shrink-0 max-md:hidden")}>
                {K.map(e=>{
                  let a=c===e.id;
                  return <button key={e.id} type="button" role="radio" aria-checked={a} tabIndex={a?0:-1} onClick={()=>d(e.id)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-2 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e.label}</button>;
                })}
              </div>
            </div>
            <div className="relative flex min-h-0 flex-1 flex-col">
              <main ref={ei} onScroll={el} className="h-full overflow-y-auto px-4 pb-20 pt-2 sm:px-6 md:pb-4 md:pt-1">
                {0===em.length?<div className="flex h-full min-h-[220px] flex-col items-center justify-center px-6 pb-16 text-center md:pb-4">
                  <HugeiconsIcon icon={ex?Icon_66575:eh.icon} size={24} strokeWidth={1.8} aria-hidden="true" className={k(y,"mb-3")} />
                  <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">{ex?"No jobs match that search":eh.emptyTitle}</p>
                  <p className={k("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-[320px]")}>
                    {ex?"Search covers the customer, the job number and the engineer.":eh.emptyHelp}
                  </p>
                  {ex&&<button type="button" onClick={()=>s("")} className={k(W,O,"mt-4")}>Clear search</button>}
                </div>:<>
                  <ul className="flex flex-col gap-3 md:hidden">
                    {em.map(e=><U key={e.id} job={e} flagged={!!u[e.id]} onToggleFlag={()=>ev(e.id)} />)}
                  </ul>
                  <ul className="hidden flex-col gap-1 md:-mx-3 md:flex">
                    {em.map(e=><G key={e.id} job={e} flagged={!!u[e.id]} onToggleFlag={()=>ev(e.id)} />)}
                  </ul>
                </>}
              </main>
              <div aria-hidden="true" className={k("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",es.start?"opacity-100":"opacity-0")} />
              <div aria-hidden="true" className={k(B,"pointer-events-none absolute inset-x-0 bottom-0 h-8",es.end?"opacity-100":"opacity-0")} />
            </div>
          </div>
        </div>
        <div aria-hidden="true" className={k(B,"pointer-events-none absolute inset-x-2 bottom-16 z-20 h-8 md:hidden")} />
        <nav aria-label="Queues" className={k("bg-white dark:bg-neutral-900",j,"absolute inset-x-0 bottom-0 z-20 h-16 md:hidden")}>
          <ul className="flex h-full items-stretch px-1">
            {Q.map(a=>{
              let r=I(a),n=e===a;
              return (
                <li key={a} className="flex-1">
                            <button type="button" aria-current={n?"page":undefined} onClick={()=>eg(a)} className={k("active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",n?_:w,"flex h-full min-h-11 w-full cursor-pointer flex-col items-center justify-center gap-1 px-1")}>
                              <HugeiconsIcon icon={r.icon} size={20} strokeWidth={1.8} aria-hidden="true" />
                              <span className={k(n?"text-[12px]/[16px] font-[450] tabular-nums":S,"w-full truncate text-center")}>{r.label}</span>
                            </button>
                          </li>
              );
            })}
          </ul>
        </nav>
        {x&&<div className="md:hidden">
          <button type="button" aria-label="Close queues overlay" tabIndex={-1} onClick={ef} className={k("bg-neutral-900/25 dark:bg-neutral-950/60",H,"absolute inset-0 z-30 cursor-pointer",N?"opacity-100":"opacity-0")} />
          <aside ref={ea} role="dialog" aria-modal="true" aria-labelledby="app-shell-8-drawer-title" className={k("flex h-full min-h-0 flex-col bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900",H,"absolute inset-y-0 left-0 z-40 w-72 max-w-[85%]",N?"opacity-100":"opacity-0")}>
            <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
              <div className="flex h-14 shrink-0 items-center gap-2.5 pl-3 pr-2">
                <Z />
                <div className="min-w-0 flex-1">
                  <p id="app-shell-8-drawer-title" className={k(C,"truncate")}>Calder Field</p>
                  <p className={k(S,y,"truncate")}>Dispatch</p>
                </div>
                <button type="button" aria-label="Close queues" onClick={ef} className={k(z,R)}>
                  <HugeiconsIcon icon={Icon_89289} size={14} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
              <div className="relative flex min-h-0 flex-1 flex-col">
                <div ref={eo} onScroll={ed} className="flex h-full flex-col overflow-y-auto px-2 pb-2">
                  <nav aria-label="All queues">
                    <X current={e} counts={eu} onSelect={e=>{
                      eg(e),ef()
                    }} />
                  </nav>
                  <Y assigned={eb} total={ep} onAssign={()=>{
                    eg("unassigned"),ef()
                  }} />
                </div>
                <div aria-hidden="true" className={k("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",ec.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={k("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",ec.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2.5 px-4 py-2.5">
              <span aria-hidden="true" className={T}><span className={D}>RM</span></span>
              <span className="min-w-0 flex-1">
                <span className={k(C,"block truncate")}>Rosa Mendel</span>
                <span className={k(S,y,"block truncate")}>Dispatcher</span>
              </span>
            </div>
          </aside>
        </div>}
      </div>
  );
}


export default ea;
