/**
 * React Bits Pro — Application UI (navbar-11)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_18976 = [["path",{d:"M5.5 12.002H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66654 = [["path",{d:"M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 20H17",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_85018 = [["path",{d:"M3.49902 14.9656C4.72475 18.4791 8.06749 21 11.999 21C16.9696 21 20.999 16.9706 20.999 12C20.999 7.02944 16.9696 3 11.999 3C8.29827 3 4.8984 5.6756 3.68943 8.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.999 7V12L14.999 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M7.49751 8.74363C7.49751 8.74363 3.81388 9.3026 3.25487 8.7436C2.69585 8.1846 3.25488 4.50098 3.25488 4.50098",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_71497 = [["path",{d:"M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["path",{d:"M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495",stroke:"currentColor",strokeWidth:"1.5",key:"3"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62714 = [["path",{d:"M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];

let _ = (...e)=>e.filter(Boolean).join(" "),
  v = [.2,0,0,1],
  k = e=>({initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.12,ease:v}},transition:{duration:.16*!e,ease:v}}),
  f = "text-neutral-900/80 dark:text-neutral-100/80",
  g = "text-[13px]/[18px] font-normal",
  w = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  j = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  y = "size-8 rounded-[var(--rb-r-sm,6px)]",
  N = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  z = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  A = "relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40",
  S = _("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]"),
  C = [{initials:"NV",name:"Nadia V."},{initials:"MS",name:"Marcus S."},{initials:"PR",name:"Priya R."}];

function W(){
  let e=useReducedMotion(),[t,r]=useState("Q3 pricing experiment"),[v,W]=useState(false),[E,P]=useState(t),[L,R]=useState("saved"),[D,M]=useState(null),[B,O]=useState(false),H=useRef(null),I=useRef(null);
  useEffect(()=>{
    if(!D)return;
    let e=H.current?.ownerDocument;
    if(!e)return;
    let t=e=>{
      let t=e.target;
      t?.closest?.("[data-menu-root]")||M(null)
    },r=e=>{
      "Escape"===e.key&&M(null)
    };
    return e.addEventListener("pointerdown",t),e.addEventListener("keydown",r),()=>{
      e.removeEventListener("pointerdown",t),e.removeEventListener("keydown",r)
    };
  }, [D]),useEffect(()=>{
    if(!v)return;
    let e=I.current?.ownerDocument.defaultView,t=e?.requestAnimationFrame(()=>{
      I.current?.focus(),I.current?.select()
    });
    return ()=>{
      undefined!==t&&e?.cancelAnimationFrame(t)
    };
  }, [v]),useEffect(()=>{
    if("saving"!==L)return;
    let e=H.current?.ownerDocument.defaultView,t=e?.setTimeout(()=>R("saved"),900);
    return ()=>{
      undefined!==t&&e?.clearTimeout(t)
    };
  }, [L]),useEffect(()=>{
    if(!B)return;
    let e=H.current?.ownerDocument.defaultView,t=e?.setTimeout(()=>O(false),1600);
    return ()=>{
      undefined!==t&&e?.clearTimeout(t)
    };
  }, [B]);
  let T=()=>{
    let e=E.trim();
    (W(false),e&&e!==t)?(r(e),R("saving")):P(t)
  };
  return (
    <div ref={H} className={_("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[480px] w-full flex-col overflow-hidden")}>
        <header className={_("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","relative z-20 flex h-14 shrink-0 items-center gap-2 px-2 sm:px-3")}>
          <button type="button" aria-label="Back to documents" className={_(w,y)}>
            <HugeiconsIcon icon={Icon_18976} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {v?<>
              <label htmlFor="navbar-11-title" className="sr-only">Document title</label>
              <div className={_(N,"h-8","max-w-[320px]")}>
                <input id="navbar-11-title" ref={I} value={E} onChange={e=>P(e.target.value)} onBlur={T} onKeyDown={e=>{
                  "Enter"===e.key&&T(),"Escape"===e.key&&(P(t),W(false))
                }} className={z} />
              </div>
            </>:<button type="button" onClick={()=>{
              P(t),W(true)
            }} className={_(S,j,"group inline-flex min-w-0 cursor-text items-center text-left")}>
              <span className="min-w-0 truncate">{t}</span>
              <HugeiconsIcon icon={Icon_66654} size={16} strokeWidth={1.8} aria-hidden="true" className={_("flex items-center justify-end gap-0.5 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity duration-[120ms]","text-neutral-900/66 dark:text-neutral-100/66","shrink-0")} />
            </button>}
            <span role="status" className={_("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums","saving"===L?"text-neutral-900 dark:text-neutral-100":"text-neutral-900/80 dark:text-neutral-100/80","shrink-0 max-sm:hidden")}>
              {"saving"===L&&<span className="flex h-lh shrink-0 items-center">
                <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full border border-current border-t-transparent animate-spin motion-reduce:animate-none" />
              </span>}
              {"saving"===L?"Saving":"Saved"}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <div className={_("flex items-center *:not-first:-ms-1.5 *:not-last:[mask-image:radial-gradient(50%_50%_at_calc(150%-6px)_50%,transparent_calc(100%+1.5px),#000_calc(100%+2px))]","max-sm:hidden")}>
              {C.map(e=>(
                <span key={e.initials} title={e.name} className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none">
                            <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">{e.initials}</span>
                          </span>
              ))}
            </div>
            <button type="button" aria-label="Version history" className={_(w,y,"max-md:hidden")}>
              <HugeiconsIcon icon={Icon_85018} size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <div className="relative" data-menu-root>
              <button type="button" aria-haspopup="true" aria-expanded={"share"===D} onClick={()=>{
                M(e=>"share"===e?null:"share")
              }} className={_("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",j)}>
                <HugeiconsIcon icon={Icon_71497} size={16} strokeWidth={1.8} aria-hidden="true" />
                Share
              </button>
              <AnimatePresence>
                {"share"===D&&<motion.div {...k(e)} className={_("flex max-h-80 w-72 max-w-[calc(100vw-2rem)] flex-col gap-3 overflow-y-auto rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-4 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute top-full right-0 z-30 mt-1.5 w-[280px] origin-top-right")}>
                  <p className="text-[14px]/[16px] font-[450]">Share document</p>
                  <p className={_(g,f)}>Anyone at Cedar Labs with the link can comment.</p>
                  <div className={_(N,"h-8")}>
                    <input readOnly aria-label="Share link" value="cedarlabs.app/d/q3-pricing" className={_(z,"font-mono text-[12px]/[16px] tabular-nums")} />
                    <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                      <button type="button" aria-label={B?"Link copied":"Copy link"} onClick={()=>O(true)} className={_(w,"size-6 rounded-[var(--rb-r-sm,6px)]")}>
                        <HugeiconsIcon icon={B?Icon_90987:Icon_62714} size={16} strokeWidth={1.8} aria-hidden="true" />
                      </button>
                    </span>
                  </div>
                  <span role="status" className="sr-only">{B?"Share link copied":""}</span>
                </motion.div>}
              </AnimatePresence>
            </div>
            <div className="relative" data-menu-root>
              <button type="button" aria-haspopup="menu" aria-expanded={"more"===D} aria-label="Document actions" onClick={()=>{
                M(e=>"more"===e?null:"more")
              }} className={_(w,y)}>
                <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <AnimatePresence>
                {"more"===D&&<motion.div {...k(e)} role="menu" className={_("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute top-full right-0 z-30 mt-1.5 w-[180px] min-w-[180px] origin-top-right")}>
                  <button type="button" role="menuitem" className={A}>
                    <HugeiconsIcon icon={Icon_62714} size={14} strokeWidth={1.8} aria-hidden="true" />
                    Duplicate
                  </button>
                  <button type="button" role="menuitem" className={A}>
                    <HugeiconsIcon icon={Icon_85018} size={14} strokeWidth={1.8} aria-hidden="true" />
                    Version history
                  </button>
                  <div className="-mx-1 my-1 h-px bg-neutral-900/8 dark:bg-neutral-100/8" />
                  <button type="button" role="menuitem" className="relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] outline-none select-none [&_svg]:shrink-0 text-[oklch(51%_0.18_26)] hover:bg-[oklch(94.5%_0.027_26)] focus-visible:bg-[oklch(94.5%_0.027_26)] data-[highlighted]:bg-[oklch(94.5%_0.027_26)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-[oklch(76%_0.14_26)] dark:hover:bg-[oklch(29%_0.06_26)] dark:focus-visible:bg-[oklch(29%_0.06_26)] dark:data-[highlighted]:bg-[oklch(29%_0.06_26)] dark:aria-disabled:text-neutral-100/40">
                    <HugeiconsIcon icon={Icon_96037} size={14} strokeWidth={1.8} aria-hidden="true" />
                    Move to trash
                  </button>
                </motion.div>}
              </AnimatePresence>
            </div>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[600px] px-5 py-8">
            <h1 className="text-[24px]/[28px] font-[450] tracking-[-0.015em]">{t}</h1>
            <p className={_(g,f,"mt-3")}>
              We are testing a usage-weighted tier against the current seat price for accounts above 40 seats. The goal is to hold net revenue flat while removing the seat ceiling that blocks expansion in the mid-market segment.
            </p>
            <div className={_("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","divide-y divide-neutral-900/8 dark:divide-neutral-100/8","mt-5")}>
              {["Hypothesis and success metric","Segment definition","Rollout plan"].map(e=><div key={e} className={_("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14",g,"px-4")}>{e}</div>)}
            </div>
          </div>
        </div>
      </div>
  );
}


export default W;
