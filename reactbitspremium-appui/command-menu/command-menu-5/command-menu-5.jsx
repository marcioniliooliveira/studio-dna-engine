/**
 * React Bits Pro — Application UI (command-menu-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_44647 = [["path",{d:"M3 20.5002C3.28417 16.8058 6.3 13.7193 10.0008 13.5379C10.3134 13.5226 10.6446 13.5097 11 13.5L11.995 13.5663C12.6939 13.6129 13.3665 13.7543 14 13.9777",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 15.5V21.5M21 18.5L15 18.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["circle",{cx:"11",cy:"6.5",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_95735 = [["path",{d:"M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 16H11.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14.5 16L18 16",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 9H22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_92752 = [["path",{d:"M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M5.00006 21H19.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_66575 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_73516 = [["path",{d:"M17 17L21 21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M8 8L11 11M11 11L14 14M11 11L14 8M11 11L8 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_36586 = [["path",{d:"M8.5 14.5H15.5M8.5 9.5H12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_68820 = [["path",{d:"M5 15H12C15.7712 15 17.6569 15 18.8284 13.8284C20 12.6569 20 10.7712 20 7V4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8.99996 20C8.99996 20 4.00001 16.3176 4 15C3.99999 13.6824 9 10 9 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900/80 dark:text-neutral-100/80",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "text-[13px]/[18px] font-normal",
  f = "transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]",
  v = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  k = b(m,h),
  g = b(m,p),
  _ = [{id:"invite",title:"Invite a teammate",detail:"Add someone to the workspace",shortcut:"I",icon:Icon_44647},{id:"billing",title:"Open billing settings",detail:"Plan, invoices, and payment method",shortcut:"B",icon:Icon_95735},{id:"export",title:"Export usage report",detail:"Download last month as a CSV",shortcut:"E",icon:Icon_92752}],
  w = ["Billing settings","Invite a teammate","Usage report"];

function y({children:e}){
  return <kbd className="inline-flex min-h-5 min-w-5 w-fit items-center justify-center gap-1 rounded-[var(--rb-r-xs,4px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-1 font-mono text-[12px]/[16px] tabular-nums text-neutral-900/80 dark:text-neutral-100/80 select-none">{e}</kbd>;
}

function j(){
  let e=useId(),t=useRef(null),r=useRef(null),{ref:o,edges:i,onScroll:s}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:l,clientHeight:n}=t;
      r({start:a>1,end:Math.ceil(a+n)<l-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),m=useRef(null),j=useRef(null),N=useRef(undefined),S=useRef(undefined),[D,A]=useState(true),[C,R]=useState(true),[z,$]=useState("quarterly burn rate by team"),[E,T]=useState(0),M=`${e}-listbox`,K=useMemo(()=>{
    let e=z.trim().toLowerCase();
    return e?_.filter(t=>`${t.title} ${t.detail}`.toLowerCase().includes(e)):_;
  }, [z]),L=0===K.length,W=z.trim(),I=Math.min(E,Math.max(K.length-1,0)),F=K[I],H=F?`${e}-${F.id}`:undefined;
  useEffect(()=>{
    D&&m.current?.focus({preventScroll:true})
  }, [D]),useEffect(()=>{
    let e=o.current,t=e?.querySelector('[data-active="true"]');
    if(!e||!t)return;
    let r=e.getBoundingClientRect(),a=t.getBoundingClientRect();
    if(a.top<r.top+32){
      let t=e.scrollTop-(r.top+32-a.top);
      e.scrollTop=t<32?0:t
    }else if(a.bottom>r.bottom-32){
      let t=e.scrollHeight-e.clientHeight,l=e.scrollTop+(a.bottom-r.bottom+32);
      e.scrollTop=l>t-32?t:l
    }
  }, [I,z,o]),useEffect(()=>()=>{
    cancelAnimationFrame(N.current??0),clearTimeout(S.current)
  }, []);
  let P=useCallback(e=>{
    clearTimeout(S.current),A(true),e?(R(false),N.current=requestAnimationFrame(()=>R(true))):R(true)
  }, []),B=useCallback(()=>{
    R(false),clearTimeout(S.current),S.current=setTimeout(()=>{
      A(false),j.current?.focus({preventScroll:true})
    },140)
  }, []);
  useEffect(()=>{
    let e=t.current?.ownerDocument??document,r=e=>{
      (e.metaKey||e.ctrlKey)&&"k"===e.key.toLowerCase()&&(e.preventDefault(),P(false))
    };
    return e.addEventListener("keydown",r),()=>e.removeEventListener("keydown",r);
  }, [P]);
  let O=useCallback(()=>{
    $(""),T(0),B()
  }, [B]),q=e=>{
    let t=K.length;
    0!==t&&T((I+e+t)%t)
  };
  return (
    <section ref={t} className={b("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[560px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
        <button ref={j} type="button" aria-haspopup="dialog" aria-expanded={D} onClick={()=>P(true)} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",v,"w-64 max-w-full")}>
          <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
          <span className="min-w-0 flex-1 truncate text-left">Search or ask</span>
          <y>⌘K</y>
        </button>
        {D&&<>
          <button type="button" tabIndex={-1} aria-label="Close menu" onClick={B} className={b("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-40 cursor-default",C?"opacity-100":b(f,"opacity-0"))} />
          <div ref={r} role="dialog" aria-modal="true" aria-labelledby={`${e}-title`} onKeyDown={e=>{
            if("Escape"===e.key){
              e.preventDefault(),B();
              return
            }
            if("Tab"!==e.key)return;
            let t=r.current;
            if(!t)return;
            let a=Array.from(t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
            if(0===a.length)return;
            let l=a[0],n=a[a.length-1],o=t.ownerDocument.activeElement;
            e.shiftKey&&o===l?(e.preventDefault(),n.focus({preventScroll:true})):e.shiftKey||o!==n||(e.preventDefault(),focus({preventScroll:true}))
          }} className={b("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","absolute left-1/2 top-[12%] z-50 max-h-[min(80%,calc(100%-4rem))] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2",C?"opacity-100":b(f,"opacity-0"))}>
            <h2 id={`${e}-title`} className="sr-only">Search or ask</h2>
            <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
              <div className={b("flex min-h-10 shrink-0 items-center gap-2 border-b border-neutral-900/8 ps-4 pe-2 text-neutral-900/66 dark:text-neutral-100/66 has-[input:focus-visible]:border-transparent has-[input:focus-visible]:shadow-[inset_0_0_0_1px_var(--rb-accent,oklch(20.5%_0_0))] dark:border-neutral-100/8 dark:has-[input:focus-visible]:shadow-[inset_0_0_0_1px_var(--rb-accent,oklch(100%_0_0))]","h-12")}>
                <HugeiconsIcon icon={Icon_66575} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                <label htmlFor={`${e}-input`} className="sr-only">Search or ask</label>
                <input ref={m} id={`${e}-input`} role="combobox" aria-expanded="true" aria-controls={M} aria-activedescendant={H} aria-autocomplete="list" value={z} onChange={e=>{
                  $(e.target.value),T(0)
                }} onKeyDown={e=>{
                  switch(e.key){case"ArrowDown":e.preventDefault(),q(1);break;case"ArrowUp":e.preventDefault(),q(-1);break;case"Home":e.preventDefault(),T(0);break;case"End":e.preventDefault(),T(Math.max(K.length-1,0));break;case"Enter":e.preventDefault(),O()}
                }} placeholder="Search or ask" className="h-full min-w-0 flex-1 bg-transparent text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-900/66 dark:placeholder:text-neutral-100/66" />
              </div>
              <div className="relative min-h-0 flex-1">
                <div ref={o} onScroll={s} className="h-full overflow-y-auto">
                  {L?<div className="flex flex-col items-center px-6 pb-6 pt-8 text-center sm:pt-10">
                    <div className={b(h,"flex h-10 w-10 items-center justify-center")}>
                      <HugeiconsIcon icon={Icon_73516} size={20} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <p className={b("text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100","mt-3")}>No commands match</p>
                    <p className={b("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1 max-w-sm text-balance")}>
                      Nothing in this workspace matches that. Ask the assistant to answer it from your data instead.
                    </p>
                    <button type="button" onMouseDown={e=>{
                      e.preventDefault(),O()
                    }} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",v,"mt-4 max-w-full")}>
                      <HugeiconsIcon icon={Icon_36586} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                      <span className="truncate">
                        Ask about “
                        {W}
                        ”
                      </span>
                    </button>
                    <p className={b("text-[12px]/[16px] font-normal tabular-nums",p,"mt-6 sm:mt-8")}>Try instead</p>
                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                      {w.map(e=>(
                        <button key={e} type="button" onMouseDown={t=>{
                                            t.preventDefault(),$(e),T(0),m.current?.focus({preventScroll:true})
                                          }} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">{e}</button>
                      ))}
                    </div>
                  </div>:<div id={M} role="listbox" aria-label="Commands" className="p-2">
                    {K.map((t,r)=>{
                      let l=r===I;
                      return (
                        <button key={t.id} id={`${e}-${t.id}`} role="option" aria-selected={l} data-active={l} data-highlighted={l||undefined} type="button" tabIndex={-1} onPointerMove={()=>T(r)} onMouseDown={e=>{
                                            e.preventDefault(),T(r),O()
                                          }} className={b("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","min-h-11")}>
                                            <HugeiconsIcon icon={t.icon} size={16} strokeWidth={1.8} aria-hidden="true" />
                                            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                              <span className="truncate">{t.title}</span>
                                              <span className={b(k,"truncate")}>{t.detail}</span>
                                            </span>
                                            <y>{t.shortcut}</y>
                                          </button>
                      );
                    })}
                  </div>}
                </div>
                <div aria-hidden="true" className={b("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",i.start?"opacity-100":"opacity-0")} />
                <div aria-hidden="true" className={b("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",i.end?"opacity-100":"opacity-0")} />
              </div>
            </div>
            <div className={b(g,"flex h-10 shrink-0 items-center gap-4 px-5")}>
              <span className="inline-flex items-center gap-1.5">
                <y>
                  <HugeiconsIcon icon={Icon_68820} size={12} strokeWidth={1.8} aria-hidden="true" />
                </y>
                {L?"to ask":"to run"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <y>esc</y>
                to close
              </span>
              <span className="ml-auto shrink-0 tabular-nums">
                {K.length}
                {" of "}
                {_.length}
              </span>
            </div>
          </div>
        </>}
      </section>
  );
}


export default j;
