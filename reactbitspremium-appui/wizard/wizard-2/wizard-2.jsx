/**
 * React Bits Pro — Application UI (wizard-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_46772 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 16V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 8.25H12M12.25 8.25C12.25 8.11193 12.1381 8 12 8C11.8619 8 11.75 8.11193 11.75 8.25C11.75 8.38807 11.8619 8.5 12 8.5C12.1381 8.5 12.25 8.38807 12.25 8.25Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_17601 = [["path",{d:"M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 9L11 9M8 13L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 22L22 22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_4086 = [["path",{d:"M14 21L18 3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6 21L10 3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 8H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 16H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_83605 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10 18.5002L9.99999 13.8474C9.99999 13.6557 9.86325 13.5002 9.69458 13.5002H9M14 18.4983L15.4855 13.8923C15.4951 13.8626 15.5 13.8315 15.5 13.8002C15.5 13.6346 15.3657 13.5002 15.2 13.5002L13 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let h = (...e)=>e.filter(Boolean).join(" "),
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  _ = "border-b border-neutral-900/8 dark:border-neutral-100/8",
  m = "text-[14px]/[16px] font-[450]",
  k = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  f = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  v = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  g = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  w = "flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1",
  j = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  N = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  y = "bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100",
  z = h("text-[13px]/[18px] font-normal",p),
  S = h("text-[12px]/[16px] font-normal tabular-nums",p);

function C({id:e,value:r,onChange:a,options:o,className:d}){
  let c=useId(),[u,b]=useState(false),[x,p]=useState(0),[_,m]=useState(false),[k,f]=useState(),v=useRef(null),g=useRef(null),w=useRef({buffer:"",at:0}),j=o.indexOf(r),N=e=>{
    let r=v.current,a=r?.ownerDocument.defaultView;
    if(r&&a){
      let e=r.getBoundingClientRect(),t=0,l=a.innerHeight;
      for(let e=r.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(e).overflowY)){
        let r=e.getBoundingClientRect();
        t=Math.max(t,r.top),l=Math.min(l,r.bottom);
        break
      }
      let n=l-e.bottom,s=e.top-t,i=Math.min(32*o.length+8,264),d=n<i+8&&s>n,c=(d?s:n)-8;
      m(d),f(c<i?Math.max(c,40):undefined)
    }
    p(e??(j>=0?j:0)),b(true)
  };
  useEffect(()=>{
    if(!u)return;
    let e=v.current,r=e?.ownerDocument;
    if(!r)return;
    let a=r=>{
      e.contains(r.target)||b(false)
    };
    return r.addEventListener("mousedown",a),r.addEventListener("touchstart",a),()=>{
      r.removeEventListener("mousedown",a),r.removeEventListener("touchstart",a)
    };
  }, [u]),useEffect(()=>{
    if(!u)return;
    let e=g.current,r=e?.querySelector(`[data-index="${x}"]`);
    if(!e||!r)return;
    let a=r.offsetTop,t=a+r.offsetHeight;
    a<e.scrollTop?e.scrollTop=a:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [u,x]);
  let y=e=>{
    let r=o[e];
    undefined!==r&&(a(r),b(false),v.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={v} className={h("relative",d)}>
        <button id={e} type="button" role="combobox" aria-expanded={u} aria-controls={c} aria-haspopup="listbox" onClick={()=>u?b(false):N()} onKeyDown={e=>{
          if(!u){
            ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),N());
            return
          }
          if("Escape"===e.key||"Tab"===e.key){
            "Escape"===e.key&&e.stopPropagation(),b(false);
            return
          }
          if("ArrowDown"===e.key)e.preventDefault(),p(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),p(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),p(0);else if("End"===e.key)e.preventDefault(),p(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),y(x);else if(1===e.key.length&&/\S/.test(e.key)){
            let r=Date.now(),a=w.current;
            a.buffer=r-a.at>700?e.key:a.buffer+e.key,a.at=r;
            let t=o.findIndex(e=>e.toLowerCase().startsWith(a.buffer.toLowerCase()));
            t>=0&&p(t)
          }
        }} className={h("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]")}>
          <span className="truncate">{r}</span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {u&&<ul ref={g} id={c} role="listbox" tabIndex={-1} style={{maxHeight:k}} className={h("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",_?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,a)=>{
            let l=e===r;
            return (
              <li key={e} role="option" aria-selected={l} data-index={a} data-highlighted={a===x?"":undefined} onMouseEnter={()=>p(a)} onClick={()=>y(a)} className={h("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="truncate">{e}</span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let A = ["USD","EUR","GBP"],
  E = ["Net 14","Net 30","Due on receipt"],
  W = ["ACH transfer","Card","Wire"];

function D(){
  let{ref:e,edges:r,onScroll:a}=function(){
    let e=useRef(null),[r,a]=useState({start:false,end:false}),t=useCallback(()=>{
      let r=e.current;
      if(!r)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=r;
      a({start:t>1,end:t+n<l-1})
    }, []);
    return useEffect(()=>{
      let r=e.current;
      if(!r)return;
      t();
      let a=r.ownerDocument.defaultView?.ResizeObserver,l=a?new a(t):null;
      return observe(r),()=>disconnect();
    }, [t]),{ref:e,edges:r,onScroll:t};
  }(),[s,i]=useState(1),[D,R]=useState(A[0]),[M,B]=useState(E[0]),[P,T]=useState(W[0]);
  return (
    <div className={h("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[720px] w-full flex-col overflow-hidden")}>
        <header className={h(_,"flex h-14 shrink-0 items-center gap-3 px-4")}>
          <button type="button" aria-label="Close" className={h(k,"size-8 rounded-[var(--rb-r-sm,6px)]")}>
            <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <span aria-hidden="true" className={h("border-r border-neutral-900/8 dark:border-neutral-100/8","h-5 shrink-0")} />
          <h1 className={h(m,"truncate")}>Send invoice</h1>
          <div className="hidden min-w-0 flex-1 justify-center sm:flex">
            <div role="progressbar" aria-valuenow={s} aria-valuemin={1} aria-valuemax={4} aria-label="Invoice progress" className={h("relative block h-1 w-full overflow-hidden bg-neutral-900/7 dark:bg-neutral-100/7","max-w-[240px]")}>
              <div style={{width:`${s/4*100}%`}} className="block h-full bg-neutral-900 transition-[width] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none dark:bg-neutral-100" />
            </div>
          </div>
          <p className={h(S,"ml-auto shrink-0 sm:ml-0")}>
            {s}
            {" / "}
            4
          </p>
        </header>
        <div className="relative min-h-0 flex-1">
          <div ref={e} onScroll={a} className="h-full overflow-y-auto px-4 py-6 sm:px-6">
            <section className={h("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100","mx-auto w-full max-w-[820px]")}>
              <div className={h(_,"flex items-start justify-between gap-3 px-6 py-4")}>
                <div className="min-w-0">
                  <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Customer details</h2>
                  <p className={h(z,"mt-1")}>Customer, invoice references, and billing terms.</p>
                </div>
                <span className={h(N,y)}>USD</span>
              </div>
              <div className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <h3 className={m}>Customer</h3>
                  <span className={h(N,y)}>Required</span>
                </div>
                <p className={h(z,"mt-1")}>Billable account and invoice reference.</p>
                <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="wz2-customer" className={j}>
                      Customer
                      <HugeiconsIcon icon={Icon_46772} size={14} strokeWidth={1.8} aria-hidden="true" className={p} />
                    </label>
                    <div className={h(v,"h-8")}>
                      <input id="wz2-customer" defaultValue="Orchid Ledger Group" className={g} />
                      <span data-affix className={w}>
                        <button type="button" aria-label="Clear customer" className={h(k,"size-6 rounded-[var(--rb-r-sm,6px)]")}>
                          <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="wz2-tax" className={j}>
                      Tax ID
                      <HugeiconsIcon icon={Icon_46772} size={14} strokeWidth={1.8} aria-hidden="true" className={p} />
                    </label>
                    <div className={h(v,"h-8")}>
                      <span data-affix className={w}>
                        <HugeiconsIcon icon={Icon_17601} size={16} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <input id="wz2-tax" defaultValue="US-88-2947135" className={g} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="wz2-number" className={j}>Invoice number</label>
                    <div className={h(v,"h-8")}>
                      <span data-affix className={w}>
                        <HugeiconsIcon icon={Icon_4086} size={16} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <input id="wz2-number" defaultValue="INV-2048" className={g} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="wz2-po" className={j}>PO reference</label>
                    <div className={h(v,"h-8")}><input id="wz2-po" defaultValue="PO-7418" className={g} /></div>
                  </div>
                </div>
                <div aria-hidden="true" className={h(_,"my-6")} />
                <div className="flex items-center gap-2">
                  <h3 className={m}>Terms</h3>
                  <span className={h(N,y)}>Net 14</span>
                </div>
                <p className={h(z,"mt-1")}>Dates, currency, and collection method.</p>
                <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="wz2-issue" className={j}>Issue date</label>
                    <div className={h(v,"h-8")}>
                      <input id="wz2-issue" defaultValue="Apr 24, 2026" className={g} />
                      <span data-affix className={w}>
                        <HugeiconsIcon icon={Icon_83605} size={16} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="wz2-due" className={j}>Due date</label>
                    <div className={h(v,"h-8")}>
                      <input id="wz2-due" defaultValue="May 08, 2026" className={g} />
                      <span data-affix className={w}>
                        <HugeiconsIcon icon={Icon_83605} size={16} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="wz2-currency" className={j}>Currency</label>
                    <C id="wz2-currency" value={D} onChange={R} options={A} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="wz2-terms" className={j}>Payment terms</label>
                    <C id="wz2-terms" value={M} onChange={B} options={E} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="wz2-collection" className={j}>Collection</label>
                    <C id="wz2-collection" value={P} onChange={T} options={W} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="wz2-address" className={j}>Billing address</label>
                    <div className={h(v,"h-8")}>
                      <input id="wz2-address" defaultValue="14 Warren Street, Suite 620, New York, NY" className={g} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div aria-hidden="true" className={h("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",r.start?"opacity-100":"opacity-0")} />
          <div aria-hidden="true" className={h("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",r.end?"opacity-100":"opacity-0")} />
        </div>
        <div className={h("border-t border-neutral-900/8 dark:border-neutral-100/8","flex shrink-0 items-center justify-end gap-3 px-6 py-4")}>
          <button type="button" className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",f)}>Save draft</button>
          <button type="button" onClick={()=>i(e=>4===e?1:e+1)} className={h("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",f)}>
            Next step
            <HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>
  );
}


export default D;
