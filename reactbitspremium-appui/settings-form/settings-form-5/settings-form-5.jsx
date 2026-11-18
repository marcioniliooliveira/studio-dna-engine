/**
 * React Bits Pro — Application UI (settings-form-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { Fragment, disconnect, observe, useCallback, useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_59649 = [["path",{d:"M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_79698 = [["path",{d:"M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17.5 6.5L16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_56987 = [["path",{d:"M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 3L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_2301 = [["path",{d:"M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_62714 = [["path",{d:"M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900 dark:text-neutral-100",
  p = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  f = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  _ = "size-6 rounded-[var(--rb-r-sm,6px)]",
  k = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  v = "text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  g = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900",
  w = "flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2",
  j = "mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950",
  y = x("text-[16px]/[20px] font-[450] tracking-[-0.015em]",h),
  N = x("text-[14px]/[16px] font-[450]",h),
  C = x("text-[13px]/[18px] font-normal","text-neutral-900/66 dark:text-neutral-100/66"),
  S = [{id:"k1",name:"Production server",token:"sk_live_9f2c7b1e8d5a4a2f6c0b",created:"Mar 2, 2026",lastUsed:"3 minutes ago"},{id:"k2",name:"Staging",token:"sk_test_41ab88de20cf7719ee02",created:"Jan 18, 2026",lastUsed:"Yesterday"},{id:"k3",name:"Data warehouse sync",token:"sk_live_0d3e6a9c1f7b2e5a8c4d",created:"Nov 9, 2025",lastUsed:"Never"}],
  z = [{id:"slack",name:"Slack",detail:"Post alerts to #ops-notifications.",connected:true},{id:"github",name:"GitHub",detail:"Link commits to deployments.",connected:false},{id:"linear",name:"Linear",detail:"Create follow-up issues from incidents.",connected:true}];

function D({checked:e,onChange:r,labelledBy:a,describedBy:n}){
  return (
    <button type="button" role="switch" aria-checked={e} aria-labelledby={a} aria-describedby={n} onClick={()=>r(!e)} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
        <span className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
      </button>
  );
}

function E({label:e,items:r}){
  let[a,s]=useState(false),[o,d]=useState(false),[c,u]=useState(false),[b,h]=useState(0),p=useRef(null),f=useRef(null),_=useRef([]),k=e=>{
    s(false),e&&f.current?.focus({preventScroll:true})
  };
  useEffect(()=>{
    if(!a)return;
    let e=p.current?.ownerDocument??document,r=e=>{
      p.current&&!p.current.contains(e.target)&&k(false)
    },t=e=>{
      "Escape"===e.key&&(e.stopPropagation(),k(true))
    };
    return e.addEventListener("pointerdown",r),e.addEventListener("keydown",t),()=>{
      e.removeEventListener("pointerdown",r),e.removeEventListener("keydown",t)
    };
  }, [a]),useEffect(()=>{
    a&&_.current[b]?.focus({preventScroll:true})
  }, [a,b]);
  let v=(e,a)=>{
    let t=p.current;
    if(t){
      let{above:e,below:a}=function(e){
        let r=e.ownerDocument.defaultView,a=e.getBoundingClientRect(),t=0,n=r?r.innerHeight:a.bottom;
        for(let a=e.parentElement;a&&r;a=a.parentElement){
          if("visible"===r.getComputedStyle(a).overflowY)continue;
          let e=a.getBoundingClientRect();
          t=Math.max(t,e.top),n=Math.min(n,e.bottom)
        }
        return {above:a.top-t,below:n-a.bottom};
      }(t);
      u(a<32*r.length+9*!!r.some(e=>e.danger)+12&&e>a)
    }
    d(a),h(e),s(true)
  },g=e=>h(a=>(a+e+r.length)%r.length);
  return (
    <div ref={p} className="relative shrink-0">
        <button ref={f} type="button" aria-label={e} aria-haspopup="menu" aria-expanded={a} onClick={e=>a?k(false):v(0,0===e.detail)} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),v(0,true)):"ArrowUp"===e.key&&(e.preventDefault(),v(r.length-1,true))
        }} className={x(m,"size-8 rounded-[var(--rb-r-sm,6px)]")}>
          <HugeiconsIcon icon={Icon_59649} size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
        {a?<div role="menu" aria-label={e} onKeyDown={e=>{
          "ArrowDown"===e.key?(e.preventDefault(),g(1)):"ArrowUp"===e.key?(e.preventDefault(),g(-1)):"Home"===e.key?(e.preventDefault(),h(0)):"End"===e.key?(e.preventDefault(),h(r.length-1)):"Tab"===e.key&&k(false)
        }} className={x("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]",!o&&"transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none","absolute right-0 z-30 w-[160px] min-w-[160px]",c?"bottom-9":"top-9")}>
          {r.map((e,r)=>(
            <Fragment key={e.id}>
                    {e.danger?<div role="separator" className="-mx-1 my-1 h-px bg-neutral-900/8 dark:bg-neutral-100/8" />:null}
                    <button ref={e=>{
                      _.current[r]=e
                    }} type="button" role="menuitem" tabIndex={r===b?0:-1} onFocus={()=>h(r)} onClick={()=>{
                      e.run(),k(true)
                    }} className={e.danger?"relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] outline-none select-none [&_svg]:shrink-0 text-[oklch(51%_0.18_26)] hover:bg-[oklch(94.5%_0.027_26)] focus-visible:bg-[oklch(94.5%_0.027_26)] data-[highlighted]:bg-[oklch(94.5%_0.027_26)] aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-[oklch(76%_0.14_26)] dark:hover:bg-[oklch(29%_0.06_26)] dark:focus-visible:bg-[oklch(29%_0.06_26)] dark:data-[highlighted]:bg-[oklch(29%_0.06_26)] dark:aria-disabled:text-neutral-100/40":"relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40"}>{e.label}</button>
                  </Fragment>
          ))}
        </div>:null}
      </div>
  );
}

function A(){
  let{ref:e,edges:r,onScroll:a}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:n,clientHeight:l}=r;
      a({start:t>1,end:t+l<n-1})
    }, []);
    return useEffect(()=>{
      let r=e.current;
      if(!r)return;
      t();
      let a=r.ownerDocument.defaultView?.ResizeObserver,n=a?new a(t):null;
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),[i,A]=useState(S),[R,$]=useState({}),[T,M]=useState(null),[L,W]=useState(Object.fromEntries(z.map(e=>[e.id,e.connected]))),U=useRef(S.length),H=useRef(null);
  useEffect(()=>()=>{
    null!==H.current&&window.clearTimeout(H.current)
  }, []);
  let I=e=>{
    let r="";
    for(let e=0;e<20;e+=1)r+="0123456789abcdef"[Math.floor(16*Math.random())];
    return `${e}${r}`;
  },B=()=>{
    U.current+=1;
    let e=`k${U.current}`;
    A(r=>[{id:e,name:`New key ${U.current}`,token:I("sk_live_"),created:"Just now",lastUsed:"Never"},...r]),$(r=>({...r,[e]:true}))
  };
  return (
    <div className={x("bg-white dark:bg-neutral-950",h,"relative flex h-full min-h-[800px] w-full flex-col overflow-hidden")}>
        <header className="shrink-0 px-4 sm:px-6">
          <div className="mx-auto flex h-14 w-full max-w-2xl items-center gap-3">
            <h2 className={x(y,"truncate")}>API keys</h2>
            <button type="button" onClick={B} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",f,"ml-auto")}>
              <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
              Create key
            </button>
          </div>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={a} className="h-full overflow-y-auto px-4 sm:px-6">
            <div className="mx-auto w-full max-w-2xl space-y-4 pb-4 sm:pb-6">
              <div className={g}>
                <div className={x(w,"py-3")}>
                  <div className="min-w-0">
                    <h3 className={k}>Secret keys</h3>
                    <p className={x(v,"mt-0.5")}>Rotate credentials and copy tokens for server-side services.</p>
                  </div>
                </div>
                {0===i.length?<div className={x(j,"items-center gap-3 px-4 py-10 text-center")}>
                  <HugeiconsIcon icon={Icon_79698} size={16} strokeWidth={1.8} aria-hidden="true" className="text-neutral-900/80 dark:text-neutral-100/80" />
                  <div>
                    <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">No secret keys</p>
                    <p className={x("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Create a key to let a server-side service call the API.</p>
                  </div>
                  <button type="button" onClick={B} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",f,"mt-1")}>
                    <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                    Create key
                  </button>
                </div>:<ul className={x(j,p)}>
                  {i.map(e=>{
                    let r,a=R[e.id];
                    return (
                      <li key={e.id} className="px-3 py-2.5">
                                        <div className="flex items-center justify-between gap-3">
                                          <div className="min-w-0">
                                            <p className={x(N,"truncate")}>{e.name}</p>
                                            <p className={x(C,"mt-0.5")}>
                                              {"Created "}
                                              {e.created}
                                              .
                                              {" "}
                                              {"Never"===e.lastUsed?"Never used.":`Last used ${e.lastUsed}.`}
                                            </p>
                                          </div>
                                          <E label={`Actions for ${e.name}`} items={[{id:"rotate",label:"Rotate key",run:()=>{
                                            var r;
                                            return r=e.id,void(A(e=>e.map(e=>e.id===r?{...e,token:I(e.token.slice(0,8)),created:"Just now",lastUsed:"Never"}:e)),$(e=>({...e,[r]:true})));
                                          }},{id:"revoke",label:"Revoke key",danger:true,run:()=>{
                                            let r;
                                            return r=e.id,A(e=>e.filter(e=>e.id!==r));
                                          }}]} />
                                        </div>
                                        <div className={x("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","mt-2")}>
                                          <input readOnly aria-label={`${e.name} secret`} value={a?e.token:(r=e.token,`${r.slice(0,8)}${"•".repeat(12)}${r.slice(-8)}`)} className={x("h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]","font-mono text-[12px]/[16px] tabular-nums")} />
                                          <span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                                            <button type="button" aria-label={a?`Hide ${e.name}`:`Reveal ${e.name}`} onClick={()=>$(r=>({...r,[e.id]:!r[e.id]}))} className={x(m,_)}>
                                              <HugeiconsIcon icon={a?Icon_56987:Icon_2301} size={16} strokeWidth={1.8} aria-hidden="true" />
                                            </button>
                                            <button type="button" aria-label={`Copy ${e.name}`} onClick={()=>{
                                              navigator.clipboard?.writeText(e.token),M(e.id),null!==H.current&&window.clearTimeout(H.current),H.current=window.setTimeout(()=>M(null),2e3)
                                            }} className={x(m,_)}>
                                              <HugeiconsIcon icon={T===e.id?Icon_90987:Icon_62714} size={16} strokeWidth={1.8} aria-hidden="true" />
                                            </button>
                                            <span className="sr-only" role="status">{T===e.id?`${e.name} copied`:""}</span>
                                          </span>
                                        </div>
                                      </li>
                    );
                  })}
                </ul>}
              </div>
              <div className={g}>
                <div className={x(w,"py-3")}>
                  <div className="min-w-0">
                    <h3 className={k}>Integrations</h3>
                    <p className={x(v,"mt-0.5")}>Allow connected services to act on this account.</p>
                  </div>
                </div>
                <ul className={x(j,p)}>
                  {z.map(e=>{
                    let r=L[e.id];
                    return (
                      <li key={e.id} className="flex items-center justify-between gap-4 px-3 py-2.5">
                                        <div className="min-w-0">
                                          <div className="flex min-h-5 items-center gap-2">
                                            <span id={`integration-${e.id}-label`} className={x(N,"truncate")}>{e.name}</span>
                                            {r?<span className={x("inline-flex items-start gap-1 text-[13px]/[18px] font-[450] tabular-nums","text-neutral-900/80 dark:text-neutral-100/80")}>Connected</span>:null}
                                          </div>
                                          <p id={`integration-${e.id}-hint`} className={x("max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5 truncate")}>{e.detail}</p>
                                        </div>
                                        <D checked={r} onChange={r=>W(a=>({...a,[e.id]:r}))} labelledBy={`integration-${e.id}-label`} describedBy={`integration-${e.id}-hint`} />
                                      </li>
                    );
                  })}
                </ul>
                <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">Key rotations and integration changes are audit logged.</div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className={x("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={x("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
        </div>
      </div>
  );
}


export default A;
