/**
 * React Bits Pro — Application UI (navbar-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_78805 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 15H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M21 9H3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_57887 = [["path",{d:"M15.5 7H8.5M12.499 11H8.49902",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M20 22H6C4.89543 22 4 21.1046 4 20M4 20C4 18.8954 4.89543 18 6 18H20V6C20 4.11438 20 3.17157 19.4142 2.58579C18.8284 2 17.8856 2 16 2H10C7.17157 2 5.75736 2 4.87868 2.87868C4 3.75736 4 5.17157 4 8V20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M19.5 18C19.5 18 18.5 18.7628 18.5 20C18.5 21.2372 19.5 22 19.5 22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_65174 = [["path",{d:"M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_46176 = [["path",{d:"M5.22576 11.3294L12.224 2.34651C12.7713 1.64397 13.7972 2.08124 13.7972 3.01707V9.96994C13.7972 10.5305 14.1995 10.985 14.6958 10.985H18.0996C18.8729 10.985 19.2851 12.0149 18.7742 12.6706L11.776 21.6535C11.2287 22.356 10.2028 21.9188 10.2028 20.9829V14.0301C10.2028 13.4695 9.80048 13.015 9.3042 13.015H5.90035C5.12711 13.015 4.71494 11.9851 5.22576 11.3294Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_34951 = [["path",{d:"M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"12",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_83331 = [["path",{d:"M18 18C18 18.4644 18 18.6965 17.978 18.8918C17.7952 20.5145 16.5145 21.7952 14.8919 21.978C14.6965 22 14.4644 22 14 22H11C7.70017 22 6.05025 22 5.02513 20.9749C4 19.9498 4 18.2998 4 15L4.00001 8.99998C4.00001 5.70016 4.00003 4.05024 5.02514 3.02512C6.05027 2 7.70018 2 11 2H14C14.4644 2 14.6965 2 14.8919 2.02201C16.5145 2.20483 17.7952 3.48547 17.978 5.10816C18 5.30347 18 5.53565 18 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.07612 11.1183C8 11.3021 8 11.535 8 12.001C8 12.4669 8 12.6999 8.07612 12.8837C8.17761 13.1287 8.37229 13.3234 8.61732 13.4249C8.80109 13.501 9.03406 13.501 9.5 13.501H14.5C14.5002 15.2503 14.511 16.1299 15.0623 16.3858C15.0829 16.3954 15.1037 16.4042 15.1249 16.4124C15.7045 16.6353 16.3999 16.0139 17.7907 14.7711C19.2576 13.4602 19.9912 12.7851 20 11.957C19.9912 11.1289 19.2576 10.4538 17.7907 9.14301C16.3999 7.90018 15.7045 7.27876 15.1249 7.50171C15.1037 7.50985 15.0829 7.51869 15.0623 7.52822C14.5018 7.78844 14.5 8.69318 14.5 10.501H9.5C9.03406 10.501 8.80109 10.501 8.61732 10.5771C8.37229 10.6786 8.17761 10.8733 8.07612 11.1183Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let k = (...e)=>e.filter(Boolean).join(" "),
  f = [.2,0,0,1],
  g = e=>({initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.12,ease:f}},transition:{duration:.16*!e,ease:f}}),
  w = "text-neutral-900/66 dark:text-neutral-100/66",
  j = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  y = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40",
  N = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  z = "size-8 rounded-[var(--rb-r-sm,6px)]",
  A = "shrink-0 text-neutral-900/80 dark:text-neutral-100/80",
  S = "flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100",
  C = "min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",
  W = "relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40",
  E = "-mx-1 my-1 h-px bg-neutral-900/8 dark:bg-neutral-100/8",
  P = k("text-[13px]/[18px] font-normal",w),
  L = ["Northwind","Cedar Labs","Harbor Coffee"],
  R = ["web-app","marketing-site","billing-api","mobile-client"],
  D = ["Production","Staging","Preview"];

function M(){
  let e=useReducedMotion(),[t,r]=useState(null),[f,M]=useState(L[0]),[B,O]=useState(R[0]),[H,I]=useState(D[0]),[T,F]=useState(""),q=useRef(null);
  useEffect(()=>{
    if(!t)return;
    let e=q.current?.ownerDocument;
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
  let G=e=>{
    r(t=>t===e?null:e)
  },V=R.filter(e=>e.toLowerCase().includes(T.trim().toLowerCase())),$=<span aria-hidden="true" className={k("text-neutral-900/66 dark:text-neutral-100/66 select-none","px-0.5")}>/</span>;
  return (
    <div ref={q} className={k("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[480px] w-full flex-col overflow-hidden")}>
        <header className={k("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","relative z-20 flex h-14 shrink-0 items-center gap-1 ps-1 pe-3 sm:ps-2 sm:pe-4")}>
          <div className="relative min-w-0" data-menu-root>
            <button type="button" aria-haspopup="menu" aria-expanded={"org"===t} onClick={()=>G("org")} className={k(y,N,"max-w-[min(170px,100%)]")}>
              <span aria-hidden="true" className={k("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","text-[12px]/[16px] font-[450] tabular-nums","size-[20px]")}>{f.charAt(0)}</span>
              <span className="truncate">{f}</span>
              <HugeiconsIcon icon={Icon_31517} size={14} strokeWidth={1.8} aria-hidden="true" className={A} />
            </button>
            <AnimatePresence>
              {"org"===t&&<motion.div {...g(e)} role="menu" className={k(C,"absolute top-full left-0 z-30 mt-1.5 w-[220px] origin-top-left")}>
                {L.map(e=>(
                  <button key={e} type="button" role="menuitemradio" aria-checked={e===f} onClick={()=>{
                                M(e),r(null)
                              }} className={W}>
                                <span aria-hidden="true" className={k("relative inline-flex size-8 shrink-0 overflow-hidden rounded-[var(--rb-r-sm,6px)] select-none","size-[20px]")}><span className={S}>{e.charAt(0)}</span></span>
                                <span className="min-w-0 flex-1 truncate">{e}</span>
                                {e===f&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />}
                              </button>
                ))}
                <div className={E} />
                <button type="button" role="menuitem" className={W}>
                  <HugeiconsIcon icon={Icon_89886} size={14} strokeWidth={1.8} aria-hidden="true" />
                  Create organisation
                </button>
              </motion.div>}
            </AnimatePresence>
          </div>
          {$}
          <div className="relative hidden min-w-0 sm:block" data-menu-root>
            <button type="button" aria-haspopup="menu" aria-expanded={"project"===t} onClick={()=>G("project")} className={k(y,N,"max-w-[min(190px,100%)]")}>
              <HugeiconsIcon icon={Icon_78805} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
              <span className="truncate">{B}</span>
              <HugeiconsIcon icon={Icon_31517} size={14} strokeWidth={1.8} aria-hidden="true" className={A} />
            </button>
            <AnimatePresence>
              {"project"===t&&<motion.div {...g(e)} className={k(C,"absolute top-full left-0 z-30 mt-1.5 w-[240px] origin-top-left")}>
                <div className="relative p-1">
                  <label htmlFor="navbar-3-project" className="sr-only">Search projects</label>
                  <div className={k("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                    <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                      <HugeiconsIcon icon={Icon_66575} size={14} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <input id="navbar-3-project" value={T} onChange={e=>F(e.target.value)} placeholder="Find a project…" className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                  </div>
                </div>
                {0===V.length?<p className={k("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","px-2.5 py-3 text-center")}>No project matches that name.</p>:V.map(e=>(
                  <button key={e} type="button" onClick={()=>{
                                O(e),r(null),F("")
                              }} className={W}>
                                <span className="min-w-0 flex-1 truncate">{e}</span>
                                {e===B&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />}
                              </button>
                ))}
              </motion.div>}
            </AnimatePresence>
          </div>
          <span className="hidden sm:inline">{$}</span>
          <div className="relative hidden min-w-0 md:block" data-menu-root>
            <button type="button" aria-haspopup="menu" aria-expanded={"env"===t} onClick={()=>G("env")} className={k(y,N,"max-w-[min(170px,100%)]")}>
              <span className="truncate">{H}</span>
              <HugeiconsIcon icon={Icon_31517} size={14} strokeWidth={1.8} aria-hidden="true" className={A} />
            </button>
            <AnimatePresence>
              {"env"===t&&<motion.div {...g(e)} role="menu" className={k(C,"absolute top-full left-0 z-30 mt-1.5 w-[190px] min-w-[190px] origin-top-left")}>
                {D.map(e=>(
                  <button key={e} type="button" role="menuitemradio" aria-checked={e===H} onClick={()=>{
                                I(e),r(null)
                              }} className={W}>
                                <span className="min-w-0 flex-1 truncate">{e}</span>
                                {e===H&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />}
                              </button>
                ))}
              </motion.div>}
            </AnimatePresence>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-1">
            <button type="button" aria-label="Documentation" className={k(j,z,"max-sm:hidden")}>
              <HugeiconsIcon icon={Icon_57887} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Settings" className={k(j,z)}>
              <HugeiconsIcon icon={Icon_65174} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button type="button" className={k("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",N,"ml-1")}>
              <HugeiconsIcon icon={Icon_46176} size={16} strokeWidth={1.8} aria-hidden="true" />
              Upgrade
            </button>
            <div className="relative ml-1" data-menu-root>
              <button type="button" aria-haspopup="menu" aria-expanded={"account"===t} aria-label="Account menu" onClick={()=>G("account")} className={k("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","cursor-pointer")}><span className={S}>EM</span></button>
              <AnimatePresence>
                {"account"===t&&<motion.div {...g(e)} role="menu" className={k(C,"absolute top-full right-0 z-30 mt-1.5 w-[210px] origin-top-right")}>
                  <div className="px-2 py-2">
                    <p className={k("text-[14px]/[16px] font-[450]","truncate")}>Elena Marsh</p>
                    <p className={k("text-[12px]/[16px] font-normal tabular-nums",w,"truncate")}>elena@northwind.co</p>
                  </div>
                  <div className={E} />
                  <button type="button" role="menuitem" className={W}>
                    <HugeiconsIcon icon={Icon_34951} size={14} strokeWidth={1.8} aria-hidden="true" />
                    Profile
                  </button>
                  <button type="button" role="menuitem" className={W}>
                    <HugeiconsIcon icon={Icon_65174} size={14} strokeWidth={1.8} aria-hidden="true" />
                    Account settings
                  </button>
                  <button type="button" role="menuitem" className={W}>
                    <HugeiconsIcon icon={Icon_83331} size={14} strokeWidth={1.8} aria-hidden="true" />
                    Sign out
                  </button>
                </motion.div>}
              </AnimatePresence>
            </div>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">{B}</h2>
          <p className={k(P,"mt-0.5 flex flex-wrap gap-x-3")}>
            <span>{f}</span>
            <span>
              {H.toLowerCase()}
              {" deployment"}
            </span>
          </p>
          <div className={k("@container rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900","mt-4")}>
            <div className="grid grid-cols-2 overflow-hidden [&>:last-child:nth-child(odd)]:col-span-full *:-mt-px *:-ml-px *:border-t *:border-l *:border-neutral-900/8 @md:grid-flow-col @md:grid-cols-none @md:auto-cols-fr @md:[&>:last-child:nth-child(odd)]:col-auto dark:*:border-neutral-100/8">
              {[{label:"Deployments",value:"128"},{label:"Median build",value:"42s"},{label:"Last release",value:"6h ago"}].map(e=>(
                <div key={e.label} className="flex min-w-0 flex-col gap-2 px-4 py-3">
                            <p className="text-[14px]/[16px] font-[450] text-neutral-900/80 dark:text-neutral-100/80">{e.label}</p>
                            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1 text-[32px]/[36px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.value}</p>
                          </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}


export default M;
