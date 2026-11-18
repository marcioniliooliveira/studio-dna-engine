/**
 * React Bits Pro — Application UI (app-dialog-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  p = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  h = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  _ = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  m = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  f = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  v = "max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  k = "flex items-start gap-2 text-[13px]/[18px] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  g = [.2,0,0,1],
  w = ["Admin","Editor","Viewer","Billing"];

function y({id:e,value:t,defaultValue:r,onChange:l,options:i,disabled:o,placeholder:u="Select…",className:x,triggerClassName:p,ariaLabel:h}){
  let _=useId(),[m,f]=useState(false),[v,k]=useState(0),[g,w]=useState(false),[y,j]=useState(),[N,S]=useState(r??""),z=useRef(null),E=useRef(null),C=useRef({buffer:"",at:0}),D=t??N,R=i.findIndex(e=>e.value===D),A=R>=0?i[R]:undefined,T=()=>{
    if(o)return;
    let e=z.current,t=e?.ownerDocument.defaultView;
    if(e&&t){
      let r=e.getBoundingClientRect(),a=0,n=t.innerHeight;
      for(let r=e.parentElement;r;r=r.parentElement)if(/auto|scroll|hidden|clip/.test(t.getComputedStyle(r).overflowY)){
        let e=r.getBoundingClientRect();
        a=Math.max(a,e.top),n=Math.min(n,e.bottom);
        break
      }
      let l=n-r.bottom,o=r.top-a,s=Math.min(32*i.length+8,264),d=l<s+8&&o>l,c=(d?o:l)-8;
      w(d),j(c<s?Math.max(c,40):undefined)
    }
    k(R>=0?R:0),f(true)
  };
  useEffect(()=>{
    if(!m)return;
    let e=z.current;
    if(!e)return;
    let t=e.ownerDocument,r=t=>{
      e.contains(t.target)||f(false)
    };
    return t.addEventListener("mousedown",r),t.addEventListener("touchstart",r),()=>{
      t.removeEventListener("mousedown",r),t.removeEventListener("touchstart",r)
    };
  }, [m]),useEffect(()=>{
    if(!m)return;
    let e=E.current,t=e?.querySelector(`[data-index="${v}"]`);
    if(!e||!t)return;
    let r=t.offsetTop,a=r+t.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:a>e.scrollTop+e.clientHeight&&(e.scrollTop=a-e.clientHeight)
  }, [m,v]);
  let P=e=>{
    let r=i[e];
    r&&(undefined===t&&S(r.value),l?.(r.value),f(false),z.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={z} className={b("relative",x)}>
        <button id={e} type="button" role="combobox" aria-expanded={m} aria-controls={_} aria-haspopup="listbox" aria-label={h} disabled={o} onClick={()=>m?f(false):T()} onKeyDown={e=>{
          if(!o){
            if(!m){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),T());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),f(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),k(e=>Math.min(e+1,i.length-1));else if("ArrowUp"===e.key)e.preventDefault(),k(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),k(0);else if("End"===e.key)e.preventDefault(),k(i.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),P(v);else if(1===e.key.length&&/\S/.test(e.key)){
              let t=Date.now(),r=C.current;
              r.buffer=t-r.at>700?e.key:r.buffer+e.key,r.at=t;
              let a=i.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              a>=0&&k(a)
            }
          }
        }} className={b("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",p)}>
          <span className="grid min-w-0 flex-1 text-left">
            {i.map(e=><span key={e.value} aria-hidden="true" className="invisible col-start-1 row-start-1 truncate">{e.label}</span>)}
            <span className={b("col-start-1 row-start-1 truncate",!A&&"text-neutral-900/66 dark:text-neutral-100/66")}>{A?A.label:u}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {m&&<ul ref={E} id={_} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={b("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",g?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {i.map((e,t)=>{
            let r=e.value===D;
            return (
              <li key={e.value} role="option" aria-selected={r} data-index={t} data-highlighted={t===v?"":undefined} onMouseEnter={()=>k(t)} onClick={()=>P(t)} className={b("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e.label}</span>
                        {r&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function j(e){
  return Array.from(e?.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')??[]);
}

function N(){
  let e,t,r,{ref:d,edges:c,onScroll:N}=function(){
    let e=useRef(null),[t,r]=useState({start:false,end:false}),a=useCallback(()=>{
      let t=e.current;
      if(!t)return;
      let{scrollTop:a,scrollHeight:n,clientHeight:l}=t;
      r({start:a>1,end:Math.ceil(a+l)<n-1})
    }, []);
    return useEffect(()=>{
      a();
      let t=e.current,r=t?.ownerDocument.defaultView;
      if(!t||!r?.ResizeObserver)return;
      let n=new r.ResizeObserver(a);
      return observe(t),()=>disconnect();
    }, [a]),{ref:e,edges:t,onScroll:a};
  }(),S=useReducedMotion(),[z,E]=useState(true),[C,D]=useState(""),[R,A]=useState(""),[T,P]=useState(w[1]),[I,W]=useState(false),[K,L]=useState(false),M=useRef(false),[H,F]=useState(false),O=useCallback(()=>E(false), []),{panelRef:B,triggerRef:V}=(e=useRef(null),t=useRef(null),r=useRef(z),useEffect(()=>{
    if(!z)return;
    let t=e.current,r=t?.ownerDocument??document;
    (j(t)[0]??t)?.focus({preventScroll:true});
    let a=e=>{
      if("Escape"===e.key){
        e.preventDefault(),O();
        return
      }
      if("Tab"!==e.key)return;
      let a=j(t);
      if(0===a.length)return;
      let n=a[0],l=a[a.length-1],i=r.activeElement;
      e.shiftKey&&i===n?(e.preventDefault(),l.focus({preventScroll:true})):e.shiftKey||i!==l||(e.preventDefault(),focus({preventScroll:true}))
    };
    return r.addEventListener("keydown",a),()=>r.removeEventListener("keydown",a);
  }, [z,O]),useEffect(()=>{
    r.current&&!z&&t.current?.focus({preventScroll:true}),r.current=z
  }, [z]),{panelRef:e,triggerRef:t});
  useEffect(()=>{
    if(!K)return;
    let e=setTimeout(()=>L(false),2e3);
    return ()=>clearTimeout(e);
  }, [K]);
  let q=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(R.trim()),U=C.trim().length>0,$=I&&!q,J=I&&!U,Y=!S&&!H;
  return (
    <div className={b("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
        <button ref={V} type="button" onPointerDown={()=>{
          M.current=false
        }} onKeyDown={e=>{
          ("Enter"===e.key||" "===e.key)&&(M.current=true)
        }} onClick={()=>{
          D(""),A(""),P(w[1]),W(false),L(false),F(M.current),E(true)
        }} className={b(p,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>Invite member</button>
        <AnimatePresence initial={false}>
          {z&&<>
            <motion.div aria-hidden="true" className={b("bg-neutral-900/25 dark:bg-neutral-950/60","absolute inset-0 z-40")} onClick={O} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:g}}} transition={{duration:.18*!!Y,ease:g}} />
            <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div ref={B} role="dialog" aria-modal="true" aria-labelledby="app-dialog-3-title" tabIndex={-1} className={b("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","pointer-events-auto max-h-full w-full max-w-md")} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:g}}} transition={{duration:.18*!!Y,ease:g}}>
                <div className="mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950">
                  <header className={b("relative flex flex-col gap-1.5 px-5 pt-5 pb-5 has-[button]:pe-14 [&:has(+*)]:pb-0","shrink-0")}>
                    <h2 id="app-dialog-3-title" className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">Invite a member</h2>
                    <p className="text-[14px]/[20px] text-neutral-900/80 dark:text-neutral-100/80">They'll get an email invite to join the Northwind workspace.</p>
                    <div className="absolute end-4 top-4 flex">
                      <button type="button" aria-label="Close dialog" onClick={O} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]")}>
                        <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                      </button>
                    </div>
                  </header>
                  <div className="relative min-h-0 flex-1">
                    <form id="app-dialog-3-form" ref={d} onScroll={N} onSubmit={e=>{
                      e.preventDefault(),W(true),U&&q&&(L(true),E(false))
                    }} noValidate className={b("flex min-w-0 flex-col gap-4 p-5 pt-6","h-full gap-6 overflow-y-auto")}>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="app-dialog-3-name" className={f}>Full name</label>
                        <div className={b(_,"h-8")}>
                          <input id="app-dialog-3-name" value={C} onChange={e=>D(e.target.value)} aria-invalid={J} aria-describedby={J?"app-dialog-3-name-error":undefined} placeholder="Jordan Ellis" className={m} />
                        </div>
                        {J&&<p id="app-dialog-3-name-error" className={k}>
                          <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                          Enter the member's name.
                        </p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="app-dialog-3-email" className={f}>Work email</label>
                        <div className={b(_,"h-8")}>
                          <input id="app-dialog-3-email" type="email" value={R} onChange={e=>A(e.target.value)} aria-invalid={$} aria-describedby={$?"app-dialog-3-email-error":"app-dialog-3-email-help"} placeholder="name@northwind.io" className={m} />
                        </div>
                        {$?<p id="app-dialog-3-email-error" className={k}>
                          <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
                          Enter a valid email, like name@northwind.io.
                        </p>:<p id="app-dialog-3-email-help" className={v}>Invites expire after 7 days.</p>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="app-dialog-3-role" className={f}>Role</label>
                        <y id="app-dialog-3-role" value={T} onChange={P} options={w.map(e=>({value:e,label:e}))} />
                        <p className={v}>Editors can change content but not billing.</p>
                      </div>
                    </form>
                    <div aria-hidden="true" className={b("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",c.start?"opacity-100":"opacity-0")} />
                    <div aria-hidden="true" className={b("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",c.end?"opacity-100":"opacity-0")} />
                  </div>
                </div>
                <footer className={b("flex min-h-11 flex-wrap items-center justify-end gap-2 px-4 py-2 pe-2","shrink-0 flex-col-reverse max-sm:ps-2 sm:flex-row")}>
                  <button type="button" onClick={O} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",h,"w-full sm:w-auto")}>Cancel</button>
                  <button type="submit" form="app-dialog-3-form" className={b(p,h,"w-full sm:w-auto")}>Send invite</button>
                </footer>
              </motion.div>
            </div>
          </>}
        </AnimatePresence>
        <div aria-live="polite" className="pointer-events-none absolute bottom-4 left-4 right-4 z-[60] flex flex-col gap-2 sm:left-auto sm:w-full sm:max-w-sm">
          {K&&<div className={b("pointer-events-auto grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-x-3 overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 py-3 ps-4 pe-2 text-neutral-900 dark:text-neutral-100 shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none")}>
            <div className="min-w-0">
              <p className="text-[14px]/[16px] font-[450]">Invite sent</p>
              <p className="mt-0.5 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">They'll appear as pending until they accept.</p>
            </div>
          </div>}
        </div>
      </div>
  );
}


export default N;
