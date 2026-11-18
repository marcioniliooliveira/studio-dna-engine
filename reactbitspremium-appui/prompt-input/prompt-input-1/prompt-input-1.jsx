/**
 * React Bits Pro — Application UI (prompt-input-1)
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
const Icon_48094 = [["path",{d:"M5.82338 12L4.27922 10.4558C2.57359 8.75022 2.57359 5.98485 4.27922 4.27922C5.98485 2.57359 8.75022 2.57359 10.4558 4.27922L19.7208 13.5442C21.4264 15.2498 21.4264 18.0152 19.7208 19.7208C18.0152 21.4264 15.2498 21.4264 13.5442 19.7208L10.0698 16.2464C9.00379 15.1804 9.00379 13.4521 10.0698 12.386C11.1358 11.32 12.8642 11.32 13.9302 12.386L15.8604 14.3162",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_68686 = [["path",{d:"M7 6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5V11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5V6.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.5 19H11.0828C7.57267 19 4.57706 16.4623 4 13M11.5 19H11.9172C15.4273 19 18.4229 16.4623 19 13M11.5 19V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_40972 = [["path",{d:"M12 5.5V19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let m = (...e)=>e.filter(Boolean).join(" "),
  f = "text-neutral-900/66 dark:text-neutral-100/66",
  k = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  g = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  w = "size-7 rounded-[var(--rb-r-sm,6px)]",
  y = "min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",
  j = "relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40",
  N = "transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
  z = m("text-[13px]/[18px] font-normal",f),
  A = ["Low","Medium","High"];

function D({level:e}){
  let r=e/(A.length-1);
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-4.5 w-4.5 shrink-0">
        <path d="M5.94 16.5A7 7 0 1 1 18.06 16.5" pathLength={100} className="stroke-current opacity-30" strokeWidth={2} strokeLinecap="round" />
        <path d="M5.94 16.5A7 7 0 1 1 18.06 16.5" pathLength={100} strokeDasharray={`${Math.max(100*r,.01)} 100`} className="stroke-current" strokeWidth={2} strokeLinecap="round" />
        <line x1="12" y1="13" x2="12" y2="7.5" className={m(N,"origin-[12px_13px] stroke-current")} style={{transform:`rotate(${(r-.5)*240}deg)`}} strokeWidth={2} strokeLinecap="round" />
        <circle cx="12" cy="13" r="1.25" className="fill-current" />
      </svg>
  );
}

function S({level:e,onChange:r}){
  let t=useRef(null),[l,i]=useState(0),[o,s]=useState(false),[c,d]=useState(false);
  useLayoutEffect(()=>{
    let e=t.current;
    e&&i(Math.max(e.clientWidth-16-32,0))
  }, []),useEffect(()=>{
    let e=t.current,r=e?.ownerDocument.defaultView;
    if(!e||!r?.ResizeObserver)return;
    let a=new r.ResizeObserver(()=>i(Math.max(e.clientWidth-16-32,0)));
    a.observe(e);
    let n=r.requestAnimationFrame(()=>d(true));
    return ()=>{
      r.cancelAnimationFrame(n),a.disconnect()
    };
  }, []);
  let u=A.length-1,b=l*e/u,x=a=>{
    let n=t.current;
    if(!n||l<=0)return;
    let i=Math.round(Math.min(Math.max((a-getBoundingClientRect().left-8-16)/l,0),1)*u);
    i!==e&&r(i)
  };
  return (
    <div ref={t} role="slider" tabIndex={0} aria-label="Reasoning effort" aria-valuemin={0} aria-valuemax={u} aria-valuenow={e} aria-valuetext={A[e]} onKeyDown={t=>{
        let a={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1};
        t.key in a?(t.preventDefault(),r(Math.min(Math.max(e+a[t.key],0),u))):"Home"===t.key?(t.preventDefault(),r(0)):"End"===t.key&&(t.preventDefault(),r(u))
      }} onPointerDown={e=>{
        e.currentTarget.setPointerCapture(e.pointerId),s(true),x(e.clientX)
      }} onPointerMove={e=>o&&x(e.clientX)} onPointerUp={()=>s(false)} onPointerCancel={()=>s(false)} className={m("relative h-12 w-full cursor-pointer touch-none rounded-full bg-neutral-900/5 inset-ring inset-ring-neutral-900/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-100/5 dark:inset-ring-neutral-100/8","max-w-sm")}>
        <div className="pointer-events-none absolute inset-x-2 top-1/2 h-8 -translate-y-1/2 overflow-hidden rounded-full">
          <div className={m("absolute inset-0 rounded-full bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black)] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black)]",c&&N)} style={{transform:`translateX(${b-l}px)`}} />
        </div>
        {A.map((r,t)=>t===e?null:<span key={r} aria-hidden className={t<e?"pointer-events-none absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--rb-accent-fg,oklch(100%_0_0))_45%,transparent)] dark:bg-[color-mix(in_oklab,var(--rb-accent-fg,oklch(20.5%_0_0))_45%,transparent)]":"pointer-events-none absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-neutral-900/30 dark:bg-neutral-100/30"} style={{left:`${21+l*t/u}px`}} />)}
        <div aria-hidden className={m("pointer-events-none absolute top-1/2 left-0 size-6 rounded-full bg-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[0_1px_2px_rgb(0_0_0/0.24)] dark:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[0_1px_2px_rgb(0_0_0/0.5)]",c&&N)} style={{left:`${12}px`,transform:`translate(${b}px, -50%)`}} />
      </div>
  );
}

let E = [{name:"Atlas",hint:"Balanced speed and depth"},{name:"Atlas Pro",hint:"Deepest reasoning"},{name:"Quill",hint:"Fastest, for short tasks"}];

function R({label:e,options:r,value:t,onChange:s,triggerMaxWidth:c}){
  let[d,u]=useState(false),[b,x]=useState(false),[_,p]=useState(0),h=useRef(null),f=useRef(null),v=useRef(null),g=useRef(undefined);
  useEffect(()=>{
    if(!d)return;
    let e=h.current?.ownerDocument??document,r=e=>{
      h.current?.contains(e.target)||(u(false),x(false))
    };
    return e.addEventListener("pointerdown",r),()=>e.removeEventListener("pointerdown",r);
  }, [d]),useEffect(()=>{
    d&&v.current?.focus({preventScroll:true})
  }, [d]),useEffect(()=>()=>cancelAnimationFrame(g.current??0), []);
  let w=(e,r)=>{
    p(e),u(true),r?(x(false),g.current=requestAnimationFrame(()=>x(true))):x(true)
  },N=(e=true)=>{
    u(false),x(false),e&&f.current?.focus({preventScroll:true})
  },A=e=>{
    s(r[e].name),N()
  };
  return (
    <div ref={h} className="relative">
        {d&&<div ref={v} role="listbox" aria-label={e} tabIndex={-1} onKeyDown={e=>{
          switch(e.key){case"Escape":e.preventDefault(),N();break;case"ArrowDown":e.preventDefault(),p(e=>(e+1)%r.length);break;case"ArrowUp":e.preventDefault(),p(e=>(e-1+r.length)%r.length);break;case"Home":e.preventDefault(),p(0);break;case"End":e.preventDefault(),p(r.length-1);break;case"Enter":case" ":e.preventDefault(),A(_);break;case"Tab":N(false)}
        }} className={m(y,k,"absolute bottom-full left-0 z-30 mb-2 w-[256px]",b?"opacity-100":"opacity-0")}>
          {r.map((e,r)=>{
            let n=e.name===t;
            return (
              <button key={e.name} type="button" role="option" aria-selected={n} data-highlighted={r===_||undefined} tabIndex={-1} onClick={()=>A(r)} onPointerMove={()=>p(r)} className={m(j,"gap-2.5 pe-8")}>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate">{e.name}</span>
                          <span className={m(z,"block truncate")}>{e.hint}</span>
                        </span>
                        {n&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="absolute end-2" />}
                      </button>
            );
          })}
        </div>}
        <button ref={f} type="button" aria-haspopup="listbox" aria-expanded={d} aria-label={`${e}: ${t}`} onClick={()=>d?N():w(0,true)} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),w(0,false)):"ArrowUp"===e.key&&(e.preventDefault(),w(r.length-1,false))
        }} className={m("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900/80 hover:not-disabled:bg-neutral-900/5 hover:not-disabled:text-neutral-900 active:bg-neutral-900/8 aria-expanded:bg-neutral-900/5 aria-expanded:text-neutral-900 disabled:text-neutral-900/40 dark:text-neutral-100/80 dark:hover:not-disabled:bg-neutral-100/5 dark:hover:not-disabled:text-neutral-100 dark:active:bg-neutral-100/8 dark:aria-expanded:bg-neutral-100/5 dark:aria-expanded:text-neutral-100 dark:disabled:text-neutral-100/40","h-6 gap-1 rounded-[var(--rb-r-sm,6px)] px-2 text-[12px]/[16px] font-[450] tabular-nums")}>
          <span className={m("truncate",c)}>{t}</span>
          <HugeiconsIcon icon={Icon_20148} size={12} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
  );
}

let W = [{command:"/summarize",label:"Summarize the thread",icon:Icon_31964},{command:"/explain",label:"Explain this code",icon:Icon_81320},{command:"/tests",label:"Write unit tests",icon:Icon_17248},{command:"/docs",label:"Search the docs",icon:Icon_96022},{command:"/fix",label:"Fix the failing build",icon:Icon_69554}],
  C = [{name:"auth-service.ts",size:"12 KB"},{name:"billing-invoice-4021.pdf",size:"1.2 MB"}];

function M(){
  let[e,r]=useState(""),[t,i]=useState(C),[o,s]=useState(E[0].name),[c,d]=useState(false),[u,b]=useState(0),[N,M]=useState(false),[$,T]=useState(1),[H,F]=useState(1),[L,K]=useState(false),[B,q]=useState(false),[I,P]=useState(false),[O,U]=useState(),V=useRef(null),X=useRef(null),Q=useRef(null),G=useRef(null),J=useRef(null),Y=useRef(null),Z=useRef(undefined),ee=useRef(undefined),er=useRef(false),et=useId(),ea=useRef(undefined);
  useEffect(()=>{
    let e=G.current;
    if(!e)return;
    let r=()=>{
      e.style.height="auto",0!==e.scrollHeight&&(e.style.height=`${Math.min(e.scrollHeight,200)}px`)
    };
    r();
    let t=requestAnimationFrame(r);
    e.ownerDocument.fonts?.ready.then(r).catch(()=>{});
    let a=e.clientWidth,n=e.ownerDocument.defaultView;
    if(!ResizeObserver)return ()=>cancelAnimationFrame(t);
    let l=new ResizeObserver(()=>{
      e.clientWidth!==a&&(a=e.clientWidth,r())
    });
    return l.observe(e),()=>{
      cancelAnimationFrame(t),l.disconnect()
    };
  }, [e]),useEffect(()=>()=>clearTimeout(ea.current), []),useEffect(()=>()=>{
    cancelAnimationFrame(Z.current??0),clearTimeout(ee.current)
  }, []);
  let en=(e=true)=>{
    cancelAnimationFrame(Z.current??0),clearTimeout(ee.current),er.current=e,q(false),ee.current=setTimeout(()=>K(false),120)
  };
  useEffect(()=>{
    !L&&er.current&&(er.current=false,Y.current?.focus({preventScroll:true}))
  }, [L]),useEffect(()=>{
    if(L)return;
    let e=setTimeout(()=>F($),180);
    return ()=>clearTimeout(e);
  }, [L,$]),useEffect(()=>{
    if(!L)return;
    let e=J.current,r=e?.ownerDocument??document,t=r=>{
      let t=e?.querySelector('[role="slider"]');
      t?.contains(r.target)||(er.current=false,q(false),ee.current=setTimeout(()=>K(false),120))
    };
    return r.addEventListener("pointerdown",t),()=>r.removeEventListener("pointerdown",t);
  }, [L]),useEffect(()=>{
    B&&J.current?.querySelector('[role="slider"]')?.focus({preventScroll:true})
  }, [B]);
  let el=e.startsWith("/")?e.slice(1).toLowerCase():null,ei=useMemo(()=>null===el?[]:W.filter(e=>e.command.slice(1).startsWith(el)), [el]),eo=ei.length>0&&!N&&!c,es=Math.min(u,Math.max(0,ei.length-1)),ec=(e.trim().length>0||t.length>0)&&!N,ed=e=>{
    r(`${e} `),G.current?.focus({preventScroll:true})
  },eu=()=>{
    ec&&(M(true),r(""),i([]),ea.current=setTimeout(()=>M(false),1800))
  };
  return useLayoutEffect(()=>{
    if(!eo)return;
    let e=V.current,r=X.current;
    e&&r&&U(Math.max(r.getBoundingClientRect().top-e.getBoundingClientRect().top-16,96))
  }, [eo,ei.length]),useEffect(()=>{
    if(!eo)return;
    let e=Q.current,r=e?.children[es];
    if(!(r instanceof HTMLElement)||!e)return;
    let t=r.offsetTop,a=t+r.offsetHeight;
    t<e.scrollTop?e.scrollTop=t:a>e.scrollTop+e.clientHeight&&(e.scrollTop=a-e.clientHeight)
  }, [es,eo]),<div ref={V} className={m("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full w-full min-h-[560px] flex-col overflow-hidden")}>
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-8 sm:px-6">
      <div ref={X} className="relative w-full">
        {eo&&<div id={`${et}-menu`} ref={Q} role="listbox" aria-label="Commands" style={{maxHeight:O}} className={m(y,"absolute bottom-full left-0 z-30 mb-2 w-[288px]")}>
          {ei.map((e,r)=>(
            <button key={e.command} id={`${et}-option-${r}`} type="button" role="option" aria-selected={r===es} tabIndex={-1} onClick={()=>ed(e.command)} onPointerMove={()=>b(r)} className={m(j,"gap-2.5")}>
                        <HugeiconsIcon icon={e.icon} size={14} strokeWidth={1.8} aria-hidden="true" />
                        <span className="min-w-0 flex-1 truncate">{e.label}</span>
                        <span className={m("font-mono text-[12px]/[16px] tabular-nums",f,"shrink-0")}>{e.command}</span>
                      </button>
          ))}
        </div>}
        <div className="relative">
          <div inert={L} className={m("relative flex w-full min-w-0 flex-col rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-neutral-900 dark:text-neutral-100 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 dark:border-neutral-100/14 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8",L&&"*:invisible")}>
            {t.length>0&&<div className="flex flex-wrap gap-1.5 px-4 pt-3">
              {t.map(e=>(
                <span key={e.name} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">
                                <HugeiconsIcon icon={Icon_48094} size={14} strokeWidth={1.8} aria-hidden="true" className={f} />
                                <span className="min-w-0 truncate">{e.name}</span>
                                <span className={m(f,"shrink-0 tabular-nums")}>{e.size}</span>
                                <button type="button" aria-label={`Remove ${e.name}`} onClick={()=>i(r=>r.filter(r=>r.name!==e.name))} className="-me-1.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--rb-r-xs,4px)] text-neutral-900/80 dark:text-neutral-100/80 hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:bg-neutral-100/5 dark:hover:text-neutral-100">
                                  <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                                </button>
                              </span>
              ))}
            </div>}
            <textarea ref={G} rows={1} value={e} onChange={e=>{
              var t;
              return t=e.target.value,void(d(false),b(0),r(t));
            }} onKeyDown={e=>{
              if(eo)switch(e.key){case"Escape":e.preventDefault(),d(true);return;case"ArrowDown":e.preventDefault(),b(e=>(e+1)%ei.length);return;case"ArrowUp":e.preventDefault(),b(e=>(e-1+ei.length)%ei.length);return;case"Home":e.preventDefault(),b(0);return;case"End":e.preventDefault(),b(ei.length-1);return;case"Enter":case"Tab":e.preventDefault(),ed(ei[es].command);return}
              "Enter"!==e.key||e.shiftKey||(e.preventDefault(),eu())
            }} placeholder="Ask anything" aria-label="Message" role="combobox" aria-expanded={eo} aria-controls={eo?`${et}-menu`:undefined} aria-activedescendant={eo?`${et}-option-${es}`:undefined} aria-autocomplete="list" className={m("max-h-40 min-h-5 min-w-0 flex-auto resize-none bg-transparent px-1.5 py-1 field-sizing-content text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66","block max-h-[200px] min-h-[52px] w-full px-4 py-3.5")} />
            <div className="flex items-center gap-1 px-2.5 pb-2.5 pt-1">
              <button type="button" aria-label="Attach a file" onClick={()=>{
                i(e=>[...e,{name:`reference-${e.length+1}.md`,size:`${8+3*e.length} KB`}])
              }} className={m(g,w)}>
                <HugeiconsIcon icon={Icon_48094} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <R label="Model" options={E} value={o} onChange={s} triggerMaxWidth="max-w-[10rem]" />
              {N?<button type="button" onClick={()=>{
                clearTimeout(ea.current),M(false)
              }} aria-label="Stop generating" className={m(v,w,"ml-auto")}><span aria-hidden="true" className="size-2.5 rounded-[1px] bg-current" /></button>:<div className="ml-auto flex items-center gap-1">
                <button ref={Y} type="button" aria-haspopup="dialog" aria-expanded={L} aria-label={`Reasoning effort: ${A[$]}`} onClick={e=>{
                  var r;
                  return L?en():(r=e.detail>0,void(clearTimeout(ee.current),K(true),r?(q(false),Z.current=requestAnimationFrame(()=>q(true))):q(true)));
                }} className={m(g,w)}><D level={H} /></button>
                <button type="button" aria-pressed={I} aria-label={I?"Stop recording":"Record voice"} onClick={()=>P(e=>!e)} className={m(g,w)}>
                  <HugeiconsIcon icon={Icon_68686} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <button type="button" aria-label="Send" disabled={!ec} onClick={eu} className={m(v,w)}>
                  <HugeiconsIcon icon={Icon_40972} size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>}
            </div>
          </div>
          {L&&<div ref={J} role="dialog" aria-label="Reasoning effort" onKeyDown={e=>{
            "Escape"===e.key&&(e.preventDefault(),en())
          }} className={m(k,"absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 px-4",B?"opacity-100":"opacity-0")}>
            <p className={m("text-[14px]/[16px] font-[450]","relative")}>{A[$]}</p>
            <S level={$} onChange={T} />
          </div>}
        </div>
        <p className={m(z,"mt-3 px-1")}>{N?"Working on it…":"Type / to run a command, or drop a file to attach it."}</p>
      </div>
    </div>
  </div>;
}


export default M;
