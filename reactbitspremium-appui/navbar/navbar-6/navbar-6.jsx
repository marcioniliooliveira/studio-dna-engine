/**
 * React Bits Pro — Application UI (navbar-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_63163 = [["path",{d:"M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_80071 = [["path",{d:"M15 9V15H9V9H15Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18V15Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9 15.002H6C4.34315 15.002 3 16.3451 3 18.002C3 19.6588 4.34315 21.002 6 21.002C7.65685 21.002 9 19.6588 9 18.002V15.002Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 9L15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9H15Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M9 9V6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9H9Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_64739 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_13473 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_34951 = [["path",{d:"M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"12",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_65174 = [["path",{d:"M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_83331 = [["path",{d:"M18 18C18 18.4644 18 18.6965 17.978 18.8918C17.7952 20.5145 16.5145 21.7952 14.8919 21.978C14.6965 22 14.4644 22 14 22H11C7.70017 22 6.05025 22 5.02513 20.9749C4 19.9498 4 18.2998 4 15L4.00001 8.99998C4.00001 5.70016 4.00003 4.05024 5.02514 3.02512C6.05027 2 7.70018 2 11 2H14C14.4644 2 14.6965 2 14.8919 2.02201C16.5145 2.20483 17.7952 3.48547 17.978 5.10816C18 5.30347 18 5.53565 18 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.07612 11.1183C8 11.3021 8 11.535 8 12.001C8 12.4669 8 12.6999 8.07612 12.8837C8.17761 13.1287 8.37229 13.3234 8.61732 13.4249C8.80109 13.501 9.03406 13.501 9.5 13.501H14.5C14.5002 15.2503 14.511 16.1299 15.0623 16.3858C15.0829 16.3954 15.1037 16.4042 15.1249 16.4124C15.7045 16.6353 16.3999 16.0139 17.7907 14.7711C19.2576 13.4602 19.9912 12.7851 20 11.957C19.9912 11.1289 19.2576 10.4538 17.7907 9.14301C16.3999 7.90018 15.7045 7.27876 15.1249 7.50171C15.1037 7.50985 15.0829 7.51869 15.0623 7.52822C14.5018 7.78844 14.5 8.69318 14.5 10.501H9.5C9.03406 10.501 8.80109 10.501 8.61732 10.5771C8.37229 10.6786 8.17761 10.8733 8.07612 11.1183Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let f = (...e)=>e.filter(Boolean).join(" "),
  g = [.2,0,0,1],
  w = e=>({initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.12,ease:g}},transition:{duration:.16*!e,ease:g}}),
  j = "text-neutral-900 dark:text-neutral-100",
  y = "text-neutral-900/80 dark:text-neutral-100/80",
  N = "text-neutral-900/66 dark:text-neutral-100/66",
  z = "text-[14px]/[16px] font-[450]",
  A = "text-[13px]/[18px] font-normal",
  S = "text-[12px]/[16px] font-normal tabular-nums",
  C = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  W = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]",
  E = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  P = "size-8 rounded-[var(--rb-r-sm,6px)]",
  L = "flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1",
  R = "min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",
  D = "relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40",
  M = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  B = f(M,"shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]"),
  O = f("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","pointer-events-none absolute -top-0.5 -right-0.5 h-[16px] min-w-[16px] px-[4px]"),
  H = [{id:"n1",who:"Nadia V.",text:"requested review on Billing retry policy",at:"4m"},{id:"n2",who:"Deploy bot",text:"shipped web-app 24.6.1 to production",at:"26m"},{id:"n3",who:"Marcus S.",text:"left three comments on Checkout copy",at:"1h"},{id:"n4",who:"Harbor Coffee",text:"upgraded to the Scale plan",at:"3h"}],
  I = ["Billing retry policy","Checkout drop-off study","Q3 pricing experiment","Webhook signing keys"];

function T(){
  let e=useReducedMotion(),[t,r]=useState(null),[g,T]=useState(""),[F,q]=useState([]),[G,V]=useState(false),$=useRef(null),{ref:K,edges:J,onScroll:U}=function(e){
    let t=useRef(null),[r,a]=useState({start:false,end:false}),i=useCallback(()=>{
      let e=t.current;
      if(!e)return;
      let{scrollTop:r,scrollHeight:n,clientHeight:i}=e;
      a({start:r>1,end:Math.ceil(r+i)<n-1})
    }, []);
    return useEffect(()=>{
      if(!e)return;
      i();
      let r=t.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(i);
      return observe(r),()=>disconnect();
    }, [e,i]),{ref:t,edges:r,onScroll:i};
  }("bell"===t);
  useEffect(()=>{
    if(!t)return;
    let e=$.current?.ownerDocument;
    if(!e)return;
    let a=e=>{
      let t=e.target;
      t?.closest?.("[data-menu-root]")||r(null)
    },n=e=>{
      "Escape"===e.key&&r(null)
    };
    return e.addEventListener("pointerdown",a),e.addEventListener("keydown",n),()=>{
      e.removeEventListener("pointerdown",a),e.removeEventListener("keydown",n)
    };
  }, [t]);
  let Y=e=>{
    r(t=>t===e?null:e)
  },Q=H.filter(e=>!F.includes(e.id)),X=I.filter(e=>e.toLowerCase().includes(g.trim().toLowerCase()));
  return (
    <div ref={$} className={f("bg-white dark:bg-neutral-950",j,"relative flex h-full min-h-[480px] w-full flex-col overflow-hidden")}>
        <header className={f("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","relative z-20 flex h-14 shrink-0 items-center gap-2 px-3 sm:px-4")}>
          <a href="#" className={f(W,"inline-flex shrink-0 items-center gap-2")}>
            <span aria-hidden="true" className={f("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","size-7")}><HugeiconsIcon icon={Icon_63163} size={14} strokeWidth={1.8} /></span>
            <span className={f(z,"hidden sm:block")}>Northwind</span>
          </a>
          <div className={f("relative mx-auto w-full max-w-[420px]",G?"block":"hidden sm:block")} data-menu-root>
            <label htmlFor="navbar-6-search" className="sr-only">Search Northwind</label>
            <div className={f("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
              <span data-affix className={L}>
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <input id="navbar-6-search" value={g} onChange={e=>T(e.target.value)} onFocus={()=>{
                r("search")
              }} placeholder="Search projects, docs and people…" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
              <span data-affix className={f(L,"max-md:hidden")}>
                <kbd className="inline-flex min-h-5 min-w-5 w-fit items-center justify-center gap-1 rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-1 font-mono text-[12px]/[16px] tabular-nums text-neutral-900/80 dark:text-neutral-100/80 select-none">
                  <HugeiconsIcon icon={Icon_80071} size={12} strokeWidth={1.8} aria-hidden="true" />
                  K
                </kbd>
              </span>
            </div>
            <AnimatePresence>
              {"search"===t&&<motion.div {...w(e)} className={f(R,"absolute top-full right-0 left-0 z-30 mt-1.5 origin-top")}>
                <p className="px-2 pt-2 pb-1 text-[12px]/[16px] font-normal tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{g?"Results":"Recent"}</p>
                {0===X.length?<p className={f("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","px-2.5 py-3 text-center")}>
                  Nothing matches “
                  {g}
                  ”.
                </p>:X.map(e=>(
                  <button key={e} type="button" onClick={()=>{
                                T(e),r(null)
                              }} className={D}>
                                <HugeiconsIcon icon={Icon_66575} size={14} strokeWidth={1.8} aria-hidden="true" />
                                <span className="min-w-0 flex-1 truncate">{e}</span>
                              </button>
                ))}
              </motion.div>}
            </AnimatePresence>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-1">
            <button type="button" aria-label={G?"Close search":"Open search"} onClick={()=>V(e=>!e)} className={f(E,P,"sm:hidden")}>
              <HugeiconsIcon icon={G?Icon_89289:Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button type="button" className={f("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]","max-sm:hidden")}>
              <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
              New
            </button>
            <button type="button" aria-label="Help" className={f(E,P,"max-md:hidden")}>
              <HugeiconsIcon icon={Icon_64739} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <div className="relative" data-menu-root>
              <button type="button" aria-haspopup="menu" aria-expanded={"bell"===t} aria-label={`Notifications, ${Q.length} unread`} onClick={()=>Y("bell")} className={f(E,P)}>
                <HugeiconsIcon icon={Icon_13473} size={16} strokeWidth={1.8} aria-hidden="true" />
                {Q.length>0&&<span aria-hidden="true" className={O}>{Q.length}</span>}
              </button>
              <AnimatePresence>
                {"bell"===t&&<motion.div {...w(e)} className="absolute top-full right-0 z-30 mt-1.5 w-[300px] origin-top-right">
                  <div className={B}>
                    <div className={f("flex min-h-10 min-w-0 shrink-0 items-center gap-2 border-b border-neutral-900/8 px-4 has-[button]:pe-2 dark:border-neutral-100/8","justify-between")}>
                      <p className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">Notifications</p>
                      <button type="button" onClick={()=>q(H.map(e=>e.id))} className={f("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-6 gap-1 rounded-[var(--rb-r-sm,6px)] px-2 text-[12px]/[16px] font-[450] tabular-nums")}>Mark all read</button>
                    </div>
                    <div className="relative">
                      <ul ref={K} onScroll={U} className={f(C,"max-h-[240px] overflow-y-auto py-1")}>
                        {H.map(e=>{
                          let t=F.includes(e.id);
                          return (
                            <li key={e.id} className="px-2 py-1">
                                                    <button type="button" onClick={()=>q(t=>t.includes(e.id)?t:[...t,e.id])} className={f("relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","rounded-[var(--rb-r-sm,6px)]","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","px-2")}>
                                                      <span className="min-w-0 flex-1">
                                                        <span className={f(A,t?N:y,"block")}>
                                                          {!t&&<span className="sr-only">{"Unread: "}</span>}
                                                          <span className={f(!t&&j)}>{e.who}</span>
                                                          {" "}
                                                          {e.text}
                                                        </span>
                                                        <span className={f(S,N,"mt-0.5 block")}>
                                                          {e.at}
                                                          {" ago"}
                                                        </span>
                                                      </span>
                                                    </button>
                                                  </li>
                          );
                        })}
                      </ul>
                      <div aria-hidden="true" className={f("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",J.start?"opacity-100":"opacity-0")} />
                      <div aria-hidden="true" className={f("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",J.end?"opacity-100":"opacity-0")} />
                    </div>
                    {0===Q.length&&<p className={f("border-t border-neutral-900/8 dark:border-neutral-100/8",A,N,"flex items-center justify-center gap-1.5 px-3 py-2")}>
                      <HugeiconsIcon icon={Icon_90987} size={14} strokeWidth={1.8} aria-hidden="true" />
                      You are all caught up
                    </p>}
                  </div>
                </motion.div>}
              </AnimatePresence>
            </div>
            <div className="relative" data-menu-root>
              <button type="button" aria-haspopup="menu" aria-expanded={"account"===t} aria-label="Account menu" onClick={()=>Y("account")} className={f("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none",W,"cursor-pointer")}>
                <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">EM</span>
              </button>
              <AnimatePresence>
                {"account"===t&&<motion.div {...w(e)} role="menu" className={f(R,"absolute top-full right-0 z-30 mt-1.5 w-[210px] origin-top-right")}>
                  <div className="px-2 py-2">
                    <p className={f(z,"truncate")}>Elena Marsh</p>
                    <p className={f(S,N,"truncate")}>Workspace admin</p>
                  </div>
                  <div className="-mx-1 my-1 h-px bg-neutral-900/8 dark:bg-neutral-100/8" />
                  <button type="button" role="menuitem" className={D}>
                    <HugeiconsIcon icon={Icon_34951} size={14} strokeWidth={1.8} aria-hidden="true" />
                    Profile
                  </button>
                  <button type="button" role="menuitem" className={D}>
                    <HugeiconsIcon icon={Icon_65174} size={14} strokeWidth={1.8} aria-hidden="true" />
                    Preferences
                  </button>
                  <button type="button" role="menuitem" className={D}>
                    <HugeiconsIcon icon={Icon_83331} size={14} strokeWidth={1.8} aria-hidden="true" />
                    Sign out
                  </button>
                </motion.div>}
              </AnimatePresence>
            </div>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Today</h2>
          <ul className={f(M,C,"mt-3")}>
            {H.map(e=>(
              <li key={e.id} className={f("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","justify-between px-4")}>
                        <span className={f(A,y,"min-w-0 flex-1 truncate")}>
                          <span className={j}>{e.who}</span>
                          {" "}
                          {e.text}
                        </span>
                        <span className="shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">
                          {e.at}
                          {" ago"}
                        </span>
                      </li>
            ))}
          </ul>
        </div>
      </div>
  );
}


export default T;
