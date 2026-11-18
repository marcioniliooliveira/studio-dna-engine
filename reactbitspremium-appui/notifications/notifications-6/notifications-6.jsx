/**
 * React Bits Pro — Application UI (notifications-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_2605 = [["path",{d:"M15.6 8.40033V12.9003C15.6 14.3915 16.8088 15.6003 18.3 15.6003C19.7912 15.6003 21 14.3915 21 12.9003V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.0265 21 15.8965 20.3302 17.4009 19.2M15.6 12.0003C15.6 13.9886 13.9882 15.6003 12 15.6003C10.0118 15.6003 8.4 13.9886 8.4 12.0003C8.4 10.0121 10.0118 8.40033 12 8.40033C13.9882 8.40033 15.6 10.0121 15.6 12.0003Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_3980 = [["path",{d:"M6 8L6 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 16V12C18 9.17156 18 7.75735 17.1213 6.87867C16.2426 5.99999 14.8284 5.99999 12 5.99999L11 5.99999M11 5.99999C11 5.29976 12.9943 3.99152 13.5 3.49999M11 5.99999C11 6.70022 12.9943 8.00846 13.5 8.49999",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"6",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"2"}],["circle",{cx:"6",cy:"6",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["circle",{cx:"18",cy:"18",r:"2",stroke:"currentColor",strokeWidth:"1.5",key:"4"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_13473 = [["path",{d:"M16 18C16 20.2091 14.2091 22 12 22C9.79086 22 8 20.2091 8 18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M4.43654 18H19.5625C20.2903 18 20.6542 18 20.8648 17.8951C21.274 17.6913 21.4929 17.2359 21.3964 16.789C21.3468 16.559 21.1194 16.2749 20.6648 15.7066L20.4951 15.4944C20.0392 14.9246 19.8113 14.6397 19.6184 14.3409C19.0187 13.4119 18.6477 12.354 18.5356 11.254C18.4995 10.9002 18.4995 10.5353 18.4995 9.8056V8.5C18.4995 8.03572 18.4995 7.80358 18.4867 7.60758C18.2898 4.60304 15.8965 2.20977 12.892 2.01285C12.696 2 12.4638 2 11.9995 2C11.5353 2 11.3031 2 11.1071 2.01285C8.10258 2.20977 5.70931 4.60304 5.51239 7.60758C5.49954 7.80358 5.49954 8.03572 5.49954 8.5V9.8056C5.49954 10.5353 5.49954 10.9002 5.46349 11.254C5.35143 12.354 4.98035 13.4119 4.38067 14.3409C4.18779 14.6397 3.95985 14.9246 3.50401 15.4944L3.33427 15.7066C2.87964 16.2749 2.65233 16.559 2.60268 16.789C2.50621 17.2359 2.72509 17.6913 3.13431 17.8951C3.3449 18 3.70878 18 4.43654 18Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_54810 = [["path",{d:"M2.5 13.8333L6 17.5L7.02402 16.4272M16.5 6.5L10.437 12.8517",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 13.8333L11 17.5L21.5 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_65174 = [["path",{d:"M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];

let m = (...e)=>e.filter(Boolean).join(" "),
  f = "text-neutral-900 dark:text-neutral-100",
  v = "text-[13px]/[18px] font-normal",
  k = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  _ = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40",
  g = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  w = "size-8 rounded-[var(--rb-r-sm,6px)]",
  y = m(v,"text-neutral-900/66 dark:text-neutral-100/66"),
  j = m(v,"text-neutral-900/80 dark:text-neutral-100/80"),
  N = m("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]"),
  A = m("font-medium",f),
  z = m("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","pointer-events-none absolute -top-0.5 -right-0.5 h-[16px] min-w-[16px] px-[4px]"),
  S = [.2,0,0,1],
  C = ["All","Unread"],
  R = [{id:"p1",icon:Icon_2605,actor:"Ana Reyes",action:"mentioned you in",target:"Q3 rollout plan",time:"12m",unread:true},{id:"p2",icon:Icon_3980,actor:"Wei Chen",action:"requested review on",target:"Billing usage meter",time:"48m",unread:true},{id:"p3",icon:Icon_20484,actor:"Halcyon",action:"recorded a sign-in from",target:"macOS, Lisbon",time:"3h",unread:true},{id:"p4",icon:Icon_36586,actor:"Marco Silva",action:"replied in",target:"Onboarding checklist",time:"5h",unread:false},{id:"p5",icon:Icon_36586,actor:"Sofia Alvarez",action:"resolved your comment in",target:"Meridian import",time:"1d",unread:false}],
  E = ["Overview","Projects","Reports"];

function W({unread:e,children:r}){
  return e?<strong className={A}>{r}</strong>:<span className={f}>{r}</span>;
}

let M = e=>{
  let r="ArrowRight"===e.key||"ArrowDown"===e.key?1:"ArrowLeft"===e.key||"ArrowUp"===e.key?-1:0;
  if(!r&&"Home"!==e.key&&"End"!==e.key)return;
  let t=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),a=t.indexOf(e.target);
  if(a<0)return;
  e.preventDefault();
  let n="Home"===e.key?0:"End"===e.key?t.length-1:(a+r+t.length)%t.length;
  t[n].focus(),t[n].click()
};

function D(){
  let e=useReducedMotion(),[r,t]=useState(R),[d,c]=useState(false),[u,x]=useState("All"),v=useRef(null),A=useRef(null),D=r.filter(e=>e.unread).length,I="Unread"===u?r.filter(e=>e.unread):r,{ref:T,edges:O,onScroll:H}=function(e,r){
    let t=useRef(null),[a,i]=useState({start:false,end:false}),l=useCallback(()=>{
      let e=t.current;
      if(!e)return;
      let{scrollTop:r,scrollHeight:a,clientHeight:n}=e;
      i({start:r>1,end:Math.ceil(r+n)<a-1})
    }, []);
    return useEffect(()=>{
      if(!e)return;
      l();
      let r=t.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let n=new a.ResizeObserver(l);
      return observe(r),()=>disconnect();
    }, [e,l,r]),{ref:t,edges:a,onScroll:l};
  }(d,`${u}-${I.length}`);
  return useEffect(()=>{
    if(!d)return;
    let e=v.current,r=e?.ownerDocument??document,t=r=>{
      e&&!e.contains(r.target)&&c(false)
    },a=e=>{
      "Escape"===e.key&&(c(false),A.current?.focus({preventScroll:true}))
    };
    return r.addEventListener("mousedown",t),r.addEventListener("keydown",a),()=>{
      r.removeEventListener("mousedown",t),r.removeEventListener("keydown",a)
    };
  }, [d]),<div className={m("bg-white dark:bg-neutral-950",f,"relative flex h-full min-h-[560px] w-full flex-col overflow-hidden")}>
    <header className={m("border-b border-neutral-900/8 bg-white dark:border-neutral-100/8 dark:bg-neutral-900","relative flex h-14 shrink-0 items-center justify-between gap-4 px-4")}>
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex items-center gap-2">
          <span className={m("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rb-r-sm,6px)] bg-[var(--rb-accent,oklch(20.5%_0_0))] text-[var(--rb-accent-fg,oklch(100%_0_0))] select-none dark:bg-[var(--rb-accent,oklch(100%_0_0))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]","size-6","text-[12px]/[16px] font-[450] tabular-nums")}>H</span>
          <span className={m("text-[14px]/[16px] font-[450]","truncate")}>Halcyon</span>
        </span>
        <nav className="hidden items-center gap-1 sm:flex">
          {E.map((e,r)=>(
            <a key={e} href="#" onClick={e=>e.preventDefault()} aria-current={0===r?"page":undefined} className={m(_,g)}>
                        {0===r&&<span aria-hidden="true" className={m("bg-neutral-900/9 dark:bg-neutral-100/9","absolute inset-0 rounded-[inherit]")} />}
                        <span className={m("relative",0===r&&f)}>{e}</span>
                      </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-1" ref={v}>
        <div className="sm:relative">
          <button ref={A} type="button" aria-haspopup="dialog" aria-expanded={d} aria-label={`Notifications, ${D} unread`} onClick={()=>c(e=>!e)} className={m(_,w)}>
            <HugeiconsIcon icon={Icon_13473} size={16} strokeWidth={1.8} aria-hidden="true" />
            <AnimatePresence initial={false}>
              {D>0&&<motion.span key={"badge"} initial={!e&&{opacity:0}} animate={{opacity:1}} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:S}}} transition={{duration:.16,ease:S}} aria-hidden="true" className={z}>{D}</motion.span>}
            </AnimatePresence>
          </button>
          <AnimatePresence>
            {d&&<motion.div role="dialog" aria-label="Notifications" initial={!e&&{opacity:0}} animate={{opacity:1}} exit={e?undefined:{opacity:0,transition:{duration:.12,ease:S}}} transition={{duration:.16,ease:S}} className="absolute top-[calc(100%+8px)] right-0 z-40 w-[min(88vw,352px)] max-sm:inset-x-4 max-sm:w-auto">
              <div className={N}>
                <div className="flex items-center justify-between gap-2 px-2 pt-2">
                  <div role="radiogroup" aria-label="Filter" onKeyDown={M} className={m("inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5","h-7")}>
                    {C.map(e=><button key={e} type="button" role="radio" aria-checked={e===u} tabIndex={e===u?0:-1} onClick={()=>x(e)} className="relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40">{e}</button>)}
                  </div>
                  <button type="button" onClick={()=>t(e=>e.map(e=>({...e,unread:false})))} disabled={0===D} className={m(k,"h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]")}>
                    <HugeiconsIcon icon={Icon_54810} size={16} strokeWidth={1.8} aria-hidden="true" />
                    Mark all read
                  </button>
                </div>
                <div className="relative">
                  <ul ref={T} onScroll={H} className="max-h-[264px] overflow-y-auto p-2">
                    {0===I.length?<li className={m("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","px-3 py-8 text-center")}>No unread notifications</li>:I.map(e=>(
                      <li key={e.id}>
                                            <button type="button" onClick={()=>t(r=>r.map(r=>r.id===e.id?{...r,unread:false}:r))} className={m("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","rounded-[var(--rb-r-sm,6px)]","px-2.5")}>
                                              <span className={m("flex size-8 shrink-0 items-center justify-center text-neutral-900/80 dark:text-neutral-100/80","h-[18px] w-[24px] self-start")}><HugeiconsIcon icon={e.icon} size={12} strokeWidth={1.8} aria-hidden="true" /></span>
                                              <span className={m("flex min-w-0 flex-1 flex-col gap-0.5","self-start")}>
                                                <span className={m(j,"block")}>
                                                  {e.unread&&<span className="sr-only">{"Unread: "}</span>}
                                                  <W unread={e.unread}>{e.actor}</W>
                                                  {" "}
                                                  {e.action}
                                                  {" "}
                                                  <W unread={e.unread}>{e.target}</W>
                                                </span>
                                              </span>
                                              <span className={m("shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66","self-start")}>{e.time}</span>
                                            </button>
                                          </li>
                    ))}
                  </ul>
                  <div aria-hidden="true" className={m("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 top-0 h-8",O.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={m("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-900","pointer-events-none absolute inset-x-0 bottom-0 h-8",O.end?"opacity-100":"opacity-0")} />
                </div>
                <div className="p-2 pt-0">
                  <button type="button" onClick={()=>c(false)} className={m(k,g,"w-full")}>Open notification center</button>
                </div>
              </div>
            </motion.div>}
          </AnimatePresence>
        </div>
        <button type="button" aria-label="Settings" className={m(_,w)}>
          <HugeiconsIcon icon={Icon_65174} size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <span className={m("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none","ml-1 size-[28px]")}>
          <span className="flex size-full items-center justify-center rounded-[inherit] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-[12px]/[16px] font-[450] tabular-nums text-neutral-900 dark:text-neutral-100">AR</span>
        </span>
      </div>
    </header>
    <div className="flex flex-1 items-center justify-center p-6">
      <p className={m(y,"max-w-[38ch] text-center")}>
        Open the bell to review recent activity. The panel closes on Escape or on a click outside, and returns focus to the trigger.
      </p>
    </div>
  </div>;
}


export default D;
