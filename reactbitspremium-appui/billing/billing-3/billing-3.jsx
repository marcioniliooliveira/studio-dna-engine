/**
 * React Bits Pro — Application UI (billing-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { disconnect, observe, useCallback, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_17601 = [["path",{d:"M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 9L11 9M8 13L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 22L22 22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_4086 = [["path",{d:"M14 21L18 3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6 21L10 3",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5 8H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M3 16H19",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_83605 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10 18.5002L9.99999 13.8474C9.99999 13.6557 9.86325 13.5002 9.69458 13.5002H9M14 18.4983L15.4855 13.8923C15.4951 13.8626 15.5 13.8315 15.5 13.8002C15.5 13.6346 15.3657 13.5002 15.2 13.5002L13 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_55299 = [["path",{d:"M18.5 12L4.99997 12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "text-[13px]/[18px] font-normal",
  _ = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  f = "text-[12px]/[16px] font-normal tabular-nums",
  v = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  k = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  g = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  w = "flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1",
  j = "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0";

function N({id:e,value:a,onChange:r,options:o,disabled:d,placeholder:c="Select…",className:u,triggerClassName:b,leading:h,ariaLabel:m}){
  let _=useId(),[v,k]=useState(false),[g,w]=useState(0),[j,N]=useState(false),[y,C]=useState(),S=useRef(null),z=useRef(null),D=useRef({buffer:"",at:0}),E=o.findIndex(e=>e.value===a),A=E>=0?o[E]:undefined,W=e=>{
    if(d)return;
    let a=S.current,r=a?.ownerDocument.defaultView;
    if(a&&r){
      let e=a.getBoundingClientRect(),t=0,l=r.innerHeight;
      for(let e=a.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(e).overflowY)){
        let a=e.getBoundingClientRect();
        t=Math.max(t,a.top),l=Math.min(l,a.bottom);
        break
      }
      let n=l-e.bottom,i=e.top-t,s=Math.min(32*o.length+8,264),d=n<s+8&&i>n,c=(d?i:n)-8;
      N(d),C(c<s?Math.max(c,40):undefined)
    }
    w(e??(E>=0?E:0)),k(true)
  };
  useEffect(()=>{
    if(!v)return;
    let e=S.current,a=e?.ownerDocument;
    if(!a)return;
    let r=a=>{
      e.contains(a.target)||k(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [v]),useEffect(()=>{
    if(!v)return;
    let e=z.current,a=e?.querySelector(`[data-index="${g}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [v,g]);
  let F=e=>{
    let a=o[e];
    a&&(r(a.value),k(false),S.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={S} className={x("relative",u)}>
        <button id={e} type="button" role="combobox" aria-expanded={v} aria-controls={_} aria-haspopup="listbox" disabled={d} onClick={()=>v?k(false):W()} onKeyDown={e=>{
          if(!d){
            if(!v){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),W());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),k(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),w(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),w(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),w(0);else if("End"===e.key)e.preventDefault(),w(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),F(g);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=D.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=o.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&w(t)
            }
          }
        }} aria-label={m} className={x("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",b)}>
          <span className="flex min-w-0 items-center gap-2">
            {h}
            <span className={x("truncate",!A&&"text-neutral-900/66 dark:text-neutral-100/66")}>{A?A.label:c}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {v&&<ul ref={z} id={_} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={x("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",j?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,r)=>{
            let l=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={r} data-highlighted={r===g?"":undefined} onMouseEnter={()=>w(r)} onClick={()=>F(r)} className={x("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={x(f,p,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let y = [{label:"Customer",hint:"Who is billed"},{label:"Line items",hint:"What they owe"},{label:"Tax and discount",hint:"Adjustments"},{label:"Review and send",hint:"Confirm"}],
  C = [{value:"usd",label:"USD",hint:"US dollar"},{value:"eur",label:"EUR",hint:"Euro"},{value:"gbp",label:"GBP",hint:"Pound sterling"},{value:"cad",label:"CAD",hint:"Canadian dollar"}],
  S = [{value:"due",label:"Due on receipt"},{value:"net14",label:"Net 14"},{value:"net30",label:"Net 30"},{value:"net60",label:"Net 60"}],
  z = [{value:"ach",label:"ACH transfer"},{value:"card",label:"Charge card on file"},{value:"wire",label:"Wire transfer"},{value:"manual",label:"Send invoice only"}];

function D({label:e,htmlFor:a,hint:r,children:l}){
  return (
    <div className="min-w-0">
        <label htmlFor={a} className="flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{e}</label>
        <div className="mt-2">{l}</div>
        {r&&<p className={x("max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-2")}>{r}</p>}
      </div>
  );
}

function E(){
  let[e,a]=useState("Northwind Retail"),[r,i]=useState("US-88-2947135"),[E,A]=useState("INV-20437"),[W,F]=useState("PO-4471"),[R,T]=useState("2026-06-16"),[I,M]=useState("2026-06-30"),[H,L]=useState("usd"),[P,B]=useState("net14"),[U,O]=useState("ach"),[V,q]=useState("14 Warren Street, Suite 620"),{ref:G,edges:K,onScroll:Y}=function(){
    let e=useRef(null),[a,r]=useState({start:false,end:false}),t=useCallback(()=>{
      let a=e.current;
      if(!a)return;
      let{scrollTop:t,scrollHeight:l,clientHeight:n}=a;
      r({start:t>1,end:Math.ceil(t+n)<l-1})
    }, []);
    return useEffect(()=>{
      t();
      let a=e.current,r=a?.ownerDocument.defaultView;
      if(!a||!r?.ResizeObserver)return;
      let l=new r.ResizeObserver(t);
      return observe(a),()=>disconnect();
    }, [t]),{ref:e,edges:a,onScroll:t};
  }();
  return (
    <div className={x("bg-white dark:bg-neutral-950",h,"flex h-full min-h-[800px] w-full flex-col overflow-hidden p-4 sm:p-6")}>
        <div className={x("relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-neutral-50 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-900","mx-auto min-h-0 w-full max-w-[900px] flex-1")}>
          <div className={x("flex min-h-10 min-w-0 shrink-0 items-center gap-2 px-4 has-[button]:pe-2","justify-between py-3")}>
            <div className="min-w-0">
              <h2 className="min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">New invoice</h2>
              <p className={x("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5 flex flex-wrap gap-x-3")}>
                <span>
                  {"Step "}
                  1
                  {" of "}
                  {y.length}
                </span>
                <span>{y[0].label}</span>
              </p>
            </div>
            <span className={x("inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums","border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100")}>
              Draft
              <span className="font-mono text-[12px]/[16px] tabular-nums">{E}</span>
            </span>
          </div>
          <div className={x("mx-1 mb-1 flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-sm,6px)] border border-neutral-900/8 bg-white [&:has(+*)]:mb-0 dark:border-neutral-100/8 dark:bg-neutral-950","relative min-h-0 flex-1")}>
            <div ref={G} onScroll={Y} className="min-h-0 flex-1 overflow-y-auto p-5">
              <ol className="flex items-start gap-2">
                {y.map((e,a)=>(
                  <li key={e.label} className="flex min-w-0 flex-1 items-start gap-2">
                                <div className="flex min-w-0 flex-col items-start gap-1.5">
                                  <span aria-current={0===a?"step":undefined} className={x("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums",a<0?"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/80 dark:text-neutral-100/80 dark:border-neutral-100/14":0===a?"border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100":"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14")}>
                                    {a<0?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" />:a+1}
                                  </span>
                                  <div className="hidden min-w-0 sm:block">
                                    <p className={x("text-[14px]/[16px] font-[450]","truncate",0===a?h:p)}>
                                      {e.label}
                                      {a<0&&<span className="sr-only">, done</span>}
                                      {0===a&&<span className="sr-only">, current</span>}
                                    </p>
                                    <p className={x(f,p,"truncate")}>{e.hint}</p>
                                  </div>
                                </div>
                                {a<y.length-1&&<span aria-hidden className={x(a<0?"h-px min-w-4 flex-1 bg-neutral-900 dark:bg-neutral-100":"h-px min-w-4 flex-1 bg-neutral-900/8 dark:bg-neutral-100/8","mt-3")} />}
                              </li>
                ))}
              </ol>
              <section className="mt-7">
                <h3 className={_}>Customer</h3>
                <p className={x(m,p,"mt-0.5")}>Billable account and invoice reference.</p>
                <div className="mt-4 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  <D label="Customer" htmlFor="billing-3-customer">
                    <div className={x(k,"h-8")}>
                      <input id="billing-3-customer" value={e} onChange={e=>a(e.target.value)} className={g} />
                      {e&&<span data-affix className={w}>
                        <button type="button" aria-label="Clear customer" onClick={()=>a("")} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-6 rounded-[var(--rb-r-sm,6px)]")}>
                          <HugeiconsIcon icon={Icon_89289} size={12} strokeWidth={1.8} aria-hidden="true" />
                        </button>
                      </span>}
                    </div>
                  </D>
                  <D label="Tax ID" htmlFor="billing-3-tax">
                    <div className={x(k,"h-8")}>
                      <span data-affix className={w}>
                        <HugeiconsIcon icon={Icon_17601} size={14} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <input id="billing-3-tax" value={r} onChange={e=>i(e.target.value)} className={x(g,"tabular-nums")} />
                    </div>
                  </D>
                  <D label="Invoice number" htmlFor="billing-3-number">
                    <div className={x(k,"h-8")}>
                      <span data-affix className={w}>
                        <HugeiconsIcon icon={Icon_4086} size={14} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <input id="billing-3-number" value={E} onChange={e=>A(e.target.value)} className={x(g,"tabular-nums")} />
                    </div>
                  </D>
                  <D label="PO reference" htmlFor="billing-3-po" hint="Optional. Printed on the invoice header.">
                    <div className={x(k,"h-8")}>
                      <input id="billing-3-po" value={W} onChange={e=>F(e.target.value)} className={x(g,"tabular-nums")} />
                    </div>
                  </D>
                </div>
              </section>
              <section className="mt-7">
                <h3 className={_}>Terms</h3>
                <p className={x(m,p,"mt-0.5")}>Dates, currency, and how the balance is collected.</p>
                <div className="mt-4 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  <D label="Issue date" htmlFor="billing-3-issue">
                    <div className={x(k,"h-8")}>
                      <span data-affix className={w}>
                        <HugeiconsIcon icon={Icon_83605} size={14} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <input id="billing-3-issue" type="date" value={R} onChange={e=>T(e.target.value)} className={x(g,j,"tabular-nums")} />
                    </div>
                  </D>
                  <D label="Due date" htmlFor="billing-3-due">
                    <div className={x(k,"h-8")}>
                      <span data-affix className={w}>
                        <HugeiconsIcon icon={Icon_83605} size={14} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <input id="billing-3-due" type="date" value={I} onChange={e=>M(e.target.value)} className={x(g,j,"tabular-nums")} />
                    </div>
                  </D>
                  <D label="Currency" htmlFor="billing-3-currency"><N id="billing-3-currency" value={H} onChange={L} options={C} /></D>
                  <D label="Payment terms" htmlFor="billing-3-terms"><N id="billing-3-terms" value={P} onChange={B} options={S} /></D>
                  <D label="Collection" htmlFor="billing-3-collection"><N id="billing-3-collection" value={U} onChange={O} options={z} /></D>
                  <D label="Billing address" htmlFor="billing-3-address">
                    <div className={x(k,"h-8")}>
                      <input id="billing-3-address" value={V} onChange={e=>q(e.target.value)} className={g} />
                    </div>
                  </D>
                </div>
              </section>
            </div>
            <div aria-hidden="true" className={x("bg-linear-to-b from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 top-0 h-8",K.start?"opacity-100":"opacity-0")} />
            <div aria-hidden="true" className={x("bg-linear-to-t from-white to-transparent transition-opacity duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] dark:from-neutral-950","pointer-events-none absolute inset-x-0 bottom-0 h-8",K.end?"opacity-100":"opacity-0")} />
          </div>
          <div className="flex min-h-11 min-w-0 items-center gap-2 px-4 py-2 text-[13px]/[18px] text-neutral-900/66 dark:text-neutral-100/66 has-[button]:justify-end has-[button]:pe-2">
            <p className="me-auto hidden sm:block">Saved automatically as a draft.</p>
            <div className="flex items-center gap-2">
              <button type="button" className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",v)}>Save draft</button>
              <button type="button" className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",v)}>
                Next step
                <HugeiconsIcon icon={Icon_55299} size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}


export default E;
