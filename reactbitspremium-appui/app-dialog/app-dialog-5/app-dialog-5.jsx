/**
 * React Bits Pro — Application UI (app-dialog-5)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, focus, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];

let b = (...e)=>e.filter(Boolean).join(" "),
  x = "bg-neutral-900/25 dark:bg-neutral-950/60",
  p = "text-[14px]/[16px] font-[450]",
  h = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  _ = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  f = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  k = "mx-1 mt-1 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:last-child]:mb-1 dark:border-neutral-100/8 dark:bg-neutral-950",
  v = "relative flex flex-col gap-1.5 px-5 pt-5 pb-5 has-[button]:pe-14 [&:has(+*)]:pb-0",
  g = "text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100",
  m = "flex min-h-11 flex-wrap items-center justify-end gap-2 px-4 py-2 pe-2",
  w = [.2,0,0,1],
  y = ["Email","Slack","PagerDuty","Webhook"],
  j = "Slack",
  N = "5% / 5 min",
  S = "Page the on-call engineer when errors climb.";

function E({id:e,value:r,defaultValue:a,onChange:n,options:i,disabled:o,placeholder:u="Select…",className:x,triggerClassName:p,ariaLabel:h}){
  let _=useId(),[f,k]=useState(false),[v,g]=useState(0),[m,w]=useState(false),[y,j]=useState(),[N,S]=useState(a??""),E=useRef(null),z=useRef(null),C=useRef({buffer:"",at:0}),D=r??N,R=i.findIndex(e=>e.value===D),T=R>=0?i[R]:undefined,A=()=>{
    if(o)return;
    let e=E.current,r=e?.ownerDocument.defaultView;
    if(e&&r){
      let a=e.getBoundingClientRect(),t=0,l=r.innerHeight;
      for(let a=e.parentElement;a;a=a.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(a).overflowY)){
        let e=a.getBoundingClientRect();
        t=Math.max(t,e.top),l=Math.min(l,e.bottom);
        break
      }
      let n=l-a.bottom,o=a.top-t,s=Math.min(32*i.length+8,264),d=n<s+8&&o>n,c=(d?o:n)-8;
      w(d),j(c<s?Math.max(c,40):undefined)
    }
    g(R>=0?R:0),k(true)
  };
  useEffect(()=>{
    if(!f)return;
    let e=E.current;
    if(!e)return;
    let r=e.ownerDocument,a=r=>{
      e.contains(r.target)||k(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [f]),useEffect(()=>{
    if(!f)return;
    let e=z.current,r=e?.querySelector(`[data-index="${v}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [f,v]);
  let L=e=>{
    let a=i[e];
    a&&(undefined===r&&S(a.value),n?.(a.value),k(false),E.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={E} className={b("relative",x)}>
        <button id={e} type="button" role="combobox" aria-expanded={f} aria-controls={_} aria-haspopup="listbox" aria-label={h} disabled={o} onClick={()=>f?k(false):A()} onKeyDown={e=>{
          if(!o){
            if(!f){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),A());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),k(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),g(e=>Math.min(e+1,i.length-1));else if("ArrowUp"===e.key)e.preventDefault(),g(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),g(0);else if("End"===e.key)e.preventDefault(),g(i.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),L(v);else if(1===e.key.length&&/\S/.test(e.key)){
              let r=Date.now(),a=C.current;
              a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
              let t=i.findIndex(e=>e.label.toLowerCase().startsWith(a.buffer.toLowerCase()));
              t>=0&&g(t)
            }
          }
        }} className={b("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",p)}>
          <span className="grid min-w-0 flex-1 text-left">
            {i.map(e=><span key={e.value} aria-hidden="true" className="invisible col-start-1 row-start-1 truncate">{e.label}</span>)}
            <span className={b("col-start-1 row-start-1 truncate",!T&&"text-neutral-900/66 dark:text-neutral-100/66")}>{T?T.label:u}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {f&&<ul ref={z} id={_} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={b("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",m?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {i.map((e,r)=>{
            let a=e.value===D;
            return (
              <li key={e.value} role="option" aria-selected={a} data-index={r} data-highlighted={r===v?"":undefined} onMouseEnter={()=>g(r)} onClick={()=>L(r)} className={b("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e.label}</span>
                        {a&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

function z(e){
  return Array.from(e?.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')??[]);
}

function C(){
  let{ref:e,edges:r,onScroll:a}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=r;
      a({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let r=e.current,a=r?.ownerDocument.defaultView;
      if(!r||!a?.ResizeObserver)return;
      let l=new a.ResizeObserver(t);
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),d=useReducedMotion(),[c,C]=useState(true),[D,R]=useState(false),[T,A]=useState(false),L=useRef(false),[M,P]=useState(false),[I,H]=useState(j),[F,K]=useState(N),[W,q]=useState(true),[B,O]=useState(S),U=I!==j||F!==N||true!==W||B!==S,V=useRef(null),Y=useRef(null),$=useRef(null),G=useRef(c),J=useCallback(()=>{
    U?R(true):C(false)
  }, [U]);
  useEffect(()=>{
    if(!c)return;
    let e=D?Y.current:V.current,r=e?.ownerDocument??document;
    (z(e)[0]??e)?.focus({preventScroll:true});
    let a=a=>{
      if("Escape"===a.key){
        a.preventDefault(),D?R(false):J();
        return
      }
      if("Tab"!==a.key)return;
      let t=z(e);
      if(0===t.length)return;
      let l=t[0],n=t[t.length-1],i=r.activeElement;
      a.shiftKey&&i===l?(a.preventDefault(),n.focus({preventScroll:true})):a.shiftKey||i!==n||(a.preventDefault(),focus({preventScroll:true}))
    };
    return r.addEventListener("keydown",a),()=>r.removeEventListener("keydown",a);
  }, [c,D,J]),useEffect(()=>{
    G.current&&!c&&$.current?.focus({preventScroll:true}),G.current=c
  }, [c]),useEffect(()=>{
    if(!T)return;
    let e=setTimeout(()=>A(false),2e3);
    return ()=>clearTimeout(e);
  }, [T]);
  let Q=!d&&!M,X=!d,Z=Q?{initial:{opacity:0,x:8},animate:{opacity:1,x:0},exit:{opacity:0,x:8,transition:{duration:.12,ease:w}},transition:{duration:.18,ease:w}}:{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,transition:{duration:.12,ease:w}},transition:{duration:0}};
  return (
    <div className={b("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[640px] w-full items-center justify-center overflow-hidden p-4 sm:p-6")}>
        <button ref={$} type="button" onPointerDown={()=>{
          L.current=false
        }} onKeyDown={e=>{
          ("Enter"===e.key||" "===e.key)&&(L.current=true)
        }} onClick={()=>{
          H(j),K(N),q(true),O(S),R(false),A(false),P(L.current),C(true)
        }} className={b(h,"h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>Edit alert rule</button>
        <AnimatePresence initial={false}>
          {c&&<>
            <motion.div aria-hidden="true" className={b(x,"absolute inset-0 z-30")} onClick={J} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:w}}} transition={{duration:.18*!!Q,ease:w}} />
            <motion.div ref={V} role="dialog" aria-modal="true" aria-labelledby="app-dialog-5-title" tabIndex={-1} className={b("flex h-full min-h-0 flex-col bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","absolute inset-y-0 right-0 z-40 w-full max-w-md overflow-hidden")} {...Z}>
              <div className={k}>
                <header className={b(v,"shrink-0")}>
                  <h2 id="app-dialog-5-title" className={b(g,"truncate")}>Edit alert rule</h2>
                  <div className="absolute end-4 top-4 flex">
                    <button type="button" aria-label="Close drawer" onClick={J} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-7 rounded-[var(--rb-r-sm,6px)]")}>
                      <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                    </button>
                  </div>
                </header>
                <div className="relative min-h-0 flex-1">
                  <div ref={e} onScroll={a} className={b("flex min-w-0 flex-col gap-4 p-5 pt-6","h-full gap-6 overflow-y-auto")}>
                    <div className="flex flex-col gap-2">
                      <span className={f}>Rule name</span>
                      <div className={b("bg-neutral-900/5 dark:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","h-8",p,"flex items-center px-3")}>Error rate spike</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="app-dialog-5-channel" className={f}>Deliver to</label>
                      <E id="app-dialog-5-channel" value={I} onChange={H} options={y.map(e=>({value:e,label:e}))} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="app-dialog-5-threshold" className={f}>Trigger threshold</label>
                      <div className={b("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8")}>
                        <input id="app-dialog-5-threshold" value={F} onChange={e=>K(e.target.value)} className="h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="app-dialog-5-note" className={f}>Note</label>
                      <textarea id="app-dialog-5-note" value={B} onChange={e=>O(e.target.value)} rows={3} className={b("block max-h-[256px] min-h-[76px] w-full min-w-48 resize-none rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 py-2 text-[14px]/[20px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none field-sizing-content transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] placeholder:text-neutral-900/66 hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none read-only:border-transparent read-only:bg-neutral-900/5 read-only:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:placeholder:text-neutral-100/66 dark:hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40 dark:read-only:bg-neutral-100/5","min-h-[80px]")} />
                    </div>
                    <label className="flex cursor-pointer items-center justify-between gap-3">
                      <span className="min-w-0">
                        <span className={b(p,"block")}>Rule enabled</span>
                        <span className={b("max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5 block")}>Turn off to pause without deleting.</span>
                      </span>
                      <button type="button" role="switch" aria-checked={W} aria-label="Rule enabled" onClick={()=>q(e=>!e)} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
                        <span className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
                      </button>
                    </label>
                  </div>
                  <div aria-hidden="true" className={b("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
                  <div aria-hidden="true" className={b("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
                </div>
              </div>
              <footer className={b(m,"shrink-0 flex-col-reverse max-sm:ps-2 sm:flex-row")}>
                <button type="button" onClick={J} className={b(h,_,"w-full sm:w-auto")}>Cancel</button>
                <button type="button" onClick={()=>{
                  A(true),C(false)
                }} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",_,"w-full sm:w-auto")}>Save changes</button>
              </footer>
            </motion.div>
          </>}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {D&&<>
            <motion.div aria-hidden="true" className={b(x,"absolute inset-0 z-40")} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:w}}} transition={{duration:.18*!!X,ease:w}} />
            <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div ref={Y} role="alertdialog" aria-modal="true" aria-labelledby="app-dialog-5-guard-title" aria-describedby="app-dialog-5-guard-desc" tabIndex={-1} className={b("flex max-h-[calc(100%-4rem)] flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)] dark:bg-neutral-900","pointer-events-auto max-h-full w-full max-w-sm")} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.12,ease:w}}} transition={{duration:.18*!!X,ease:w}}>
                <div className={k}>
                  <div className={v}>
                    <h2 id="app-dialog-5-guard-title" className={g}>Discard your changes?</h2>
                    <p id="app-dialog-5-guard-desc" className="text-[14px]/[20px] text-neutral-900/80 dark:text-neutral-100/80">You've edited this rule. Closing now loses what you changed.</p>
                  </div>
                </div>
                <div className={b(m,"shrink-0 flex-col-reverse max-sm:ps-2 sm:flex-row")}>
                  <button type="button" onClick={()=>R(false)} className={b(h,_,"w-full sm:w-auto")}>Keep editing</button>
                  <button type="button" onClick={()=>{
                    R(false),C(false)
                  }} className={b("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-[oklch(60%_0.236_26)] bg-white text-[oklch(51%_0.18_26)] shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-[oklch(51%_0.18_26)] active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-[oklch(65.2%_0.219_26)] dark:bg-neutral-900 dark:text-[oklch(76%_0.14_26)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-[oklch(76%_0.14_26)] dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",_,"w-full sm:w-auto")}>Discard changes</button>
                </div>
              </motion.div>
            </div>
          </>}
        </AnimatePresence>
        <div aria-live="polite" className="pointer-events-none absolute bottom-4 left-4 right-4 z-[60] flex flex-col gap-2 sm:left-auto sm:w-full sm:max-w-sm">
          {T&&<div className={b("pointer-events-auto grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-start gap-x-3 overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 py-3 ps-4 pe-2 text-neutral-900 dark:text-neutral-100 shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","transition-opacity duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)] starting:opacity-0 motion-reduce:transition-none")}>
            <div className="min-w-0">
              <p className="text-[14px]/[16px] font-[450]">Rule updated</p>
              <p className="mt-0.5 text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80">Changes apply to the next alert.</p>
            </div>
          </div>}
        </div>
      </div>
  );
}


export default C;
