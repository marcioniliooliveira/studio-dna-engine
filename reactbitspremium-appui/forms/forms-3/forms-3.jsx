/**
 * React Bits Pro — Application UI (forms-3)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_17601 = [["path",{d:"M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 9L11 9M8 13L11 13",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2 22L22 22",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_83605 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10 18.5002L9.99999 13.8474C9.99999 13.6557 9.86325 13.5002 9.69458 13.5002H9M14 18.4983L15.4855 13.8923C15.4951 13.8626 15.5 13.8315 15.5 13.8002C15.5 13.6346 15.3657 13.5002 15.2 13.5002L13 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let x = (...e)=>e.filter(Boolean).join(" "),
  p = "bg-neutral-900/5 dark:bg-neutral-100/5",
  b = "rounded-[var(--rb-r-sm,6px)]",
  h = "text-neutral-900 dark:text-neutral-100",
  m = "text-neutral-900/80 dark:text-neutral-100/80",
  f = "text-neutral-900/66 dark:text-neutral-100/66",
  v = "border-b border-neutral-900/8 dark:border-neutral-100/8",
  g = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  _ = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  k = "text-[13px]/[18px] font-normal",
  w = "text-[14px]/[16px] font-[450]",
  j = "text-[12px]/[16px] font-normal tabular-nums",
  N = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  y = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  S = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  C = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  D = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  E = "flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1",
  A = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  F = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  z = "bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100",
  B = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  R = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  T = "text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  P = "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0";

function L({id:e,value:a,defaultValue:r,onChange:o,options:d,disabled:c,placeholder:u="Select…",className:p,triggerClassName:b,leading:h,ariaLabel:m}){
  let v=useId(),[g,_]=useState(false),[k,w]=useState(0),[N,y]=useState(false),[S,C]=useState(),[D,E]=useState(r??""),A=useRef(null),F=useRef(null),z=useRef({buffer:"",at:0}),B=a??D,R=d.findIndex(e=>e.value===B),T=R>=0?d[R]:undefined,P=()=>{
    if(c)return;
    let e=A.current,a=e?.ownerDocument.defaultView;
    if(e&&a){
      let r=e.getBoundingClientRect(),t=0,l=a.innerHeight;
      for(let r=e.parentElement;r;r=r.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(r).overflowY)){
        let e=r.getBoundingClientRect();
        t=Math.max(t,e.top),l=Math.min(l,e.bottom);
        break
      }
      let s=l-r.bottom,n=r.top-t,i=Math.min(32*d.length+8,264),o=s<i+8&&n>s,c=(o?n:s)-8;
      y(o),C(c<i?Math.max(c,40):undefined)
    }
    w(R>=0?R:0),_(true)
  };
  useEffect(()=>{
    if(!g)return;
    let e=A.current;
    if(!e)return;
    let a=e.ownerDocument,r=a=>{
      e.contains(a.target)||_(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [g]),useEffect(()=>{
    if(!g)return;
    let e=F.current,a=e?.querySelector(`[data-index="${k}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [g,k]);
  let L=e=>{
    let r=d[e];
    r&&(undefined===a&&E(r.value),o?.(r.value),_(false),A.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={A} className={x("relative",p)}>
        <button id={e} type="button" role="combobox" aria-expanded={g} aria-controls={v} aria-haspopup="listbox" aria-label={m} disabled={c} onClick={()=>g?_(false):P()} onKeyDown={e=>{
          if(!c){
            if(!g){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),P());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),_(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),w(e=>Math.min(e+1,d.length-1));else if("ArrowUp"===e.key)e.preventDefault(),w(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),w(0);else if("End"===e.key)e.preventDefault(),w(d.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),L(k);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=z.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=d.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&w(t)
            }
          }
        }} className={x("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",b)}>
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {h}
            <span className="grid min-w-0 flex-1 text-left">
              {d.map(e=><span key={e.value} aria-hidden="true" className="invisible col-start-1 row-start-1 truncate">{e.label}</span>)}
              <span className={x("col-start-1 row-start-1 truncate",!T&&"text-neutral-900/66 dark:text-neutral-100/66")}>{T?T.label:u}</span>
            </span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {g&&<ul ref={F} id={v} role="listbox" tabIndex={-1} style={{maxHeight:S}} className={x("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",N?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {d.map((e,a)=>{
            let r=e.value===B;
            return (
              <li key={e.value} role="option" aria-selected={r} data-index={a} data-highlighted={a===k?"":undefined} onMouseEnter={()=>w(a)} onClick={()=>L(a)} className={x("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={x(j,f,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {r&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let M = [{value:"palletised",label:"Palletised dry goods"},{value:"reefer",label:"Temperature-controlled"},{value:"hazmat",label:"Hazardous, class 3"},{value:"machinery",label:"Machinery and parts"},{value:"textiles",label:"Baled textiles"}],
  U = [{value:"northwind",label:"Northwind Traders",origin:"Rotterdam, NL",destination:"Gdansk, PL"},{value:"meridian",label:"Meridian Logistics",origin:"Felixstowe, GB",destination:"Bilbao, ES"},{value:"parcelworks",label:"Parcelworks BV",origin:"Antwerp, BE",destination:"Marseille, FR"}],
  W = [{value:0,label:"0% exempt"},{value:.05,label:"5% reduced"},{value:.12,label:"12% standard"},{value:.18,label:"18% elevated"}],
  q = [{id:1,cargo:"palletised",qty:"18",rate:"42.50",duty:.05},{id:2,cargo:"reefer",qty:"6",rate:"128.00",duty:.12},{id:3,cargo:"machinery",qty:"2",rate:"540.00",duty:.18}],
  H = e=>e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),
  G = e=>Math.round(100*e)/100,
  I = e=>{
  let a=Number.parseFloat(e);
  return Number.isFinite(a)?a:0;
},
  Q = e=>G(I(e.qty)*I(e.rate)),
  O = e=>G(Q(e)*e.duty);

function V(){
  let[e,a]=useState(false),[r,n]=useState("northwind"),[I,V]=useState("SHP-4471"),[X,K]=useState("GB 842 5591 07"),[Y,$]=useState("Lena Ostrowski"),[J,Z]=useState("2026-08-14"),[ee,ea]=useState("2026-08-21"),[er,et]=useState("DAP"),[el,es]=useState("standard"),[en,ei]=useState("EUR"),[eo,ed]=useState(q),[ec,eu]=useState(4),[ex,ep]=useState(false),[eb,eh]=useState(false),em=useRef(null);
  useEffect(()=>()=>{
    em.current&&clearTimeout(em.current)
  }, []);
  let ef=useMemo(()=>{
    let e=0,a=0;
    for(let r of eo)e+=Q(r),a+=O(r);
    return {subtotal:e,dutyTotal:a,grand:e+a};
  }, [eo]),ev=()=>{
    a(true),eh(false)
  },eg=(e,a)=>{
    ed(r=>r.map(r=>r.id===e?{...r,...a}:r)),ev()
  },e_=U.find(e=>e.value===r)??U[0];
  return (
    <div className={x("bg-white dark:bg-neutral-950",h,"flex h-full min-h-[1120px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[1100px]">
          {ex?<div className={x(B,"mx-auto max-w-[520px] items-center px-6 py-14 text-center")}>
            <span className="flex h-12 w-12 items-center justify-center">
              <HugeiconsIcon icon={Icon_90987} size={24} strokeWidth={1.8} aria-hidden="true" className={m} />
            </span>
            <h2 className={x(_,h,"mt-4")}>Shipment booked</h2>
            <p className={x(k,m,"mt-1.5 max-w-sm")}>
              Booking
              {" "}
              <span className={x("rounded-[var(--rb-r-xs,4px)] bg-neutral-900/5 px-1 py-px font-mono text-[0.9em] leading-none text-neutral-900 dark:text-neutral-100 [box-decoration-break:clone] dark:bg-neutral-100/5","tabular-nums")}>{I}</span>
              {" "}
              {"is confirmed on the "}
              {e_.origin}
              {" to"}
              {" "}
              {e_.destination}
              {" lane. The carrier will send collection details shortly."}
            </p>
            <div className={x(p,b,w,"mt-4 flex w-full max-w-[280px] items-center justify-between gap-6 px-3 py-2")}>
              <span className={h}>Total booked</span>
              <span className={x(h,"tabular-nums")}>
                {en}
                {" "}
                {H(ef.grand)}
              </span>
            </div>
            <button type="button" onClick={()=>{
              n("northwind"),V("SHP-4471"),K("GB 842 5591 07"),$("Lena Ostrowski"),Z("2026-08-14"),ea("2026-08-21"),et("DAP"),es("standard"),ei("EUR"),ed(q),eu(4),a(false),eh(false),ep(false)
            }} className={x(N,S,"mt-5")}>Book another shipment</button>
          </div>:<div className={B}>
            <div className={x(v,"flex items-start justify-between gap-4 px-4 py-3")}>
              <div className="min-w-0">
                <h2 className={x(_,h)}>New freight booking</h2>
                <p className={x(T,"mt-0.5")}>Consignor, route and cargo for a single shipment.</p>
              </div>
              <span className={x(F,z)}>Draft</span>
            </div>
            <div className={x(g,"flex flex-col")}>
              <section className="p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className={R}>Consignor</h3>
                    <p className={x(T,"mt-0.5")}>Who is sending the goods and how to reach them.</p>
                  </div>
                  <span className={x(F,z)}>Shipper</span>
                </div>
                <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-account" className={A}>Account</label>
                    <L id="frm3-account" value={r} onChange={e=>{
                      n(e),ev()
                    }} options={U.map(e=>({value:e.value,label:e.label}))} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-reference" className={A}>Booking reference</label>
                    <div className={x(C,"h-8")}>
                      <input id="frm3-reference" value={I} onChange={e=>{
                        V(e.target.value),ev()
                      }} className={x(D,"tabular-nums")} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-taxid" className={A}>Tax identifier</label>
                    <div className={x(C,"h-8")}>
                      <span data-affix className={E}>
                        <HugeiconsIcon icon={Icon_17601} size={16} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <input id="frm3-taxid" value={X} onChange={e=>{
                        K(e.target.value),ev()
                      }} className={x(D,"tabular-nums")} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-contact" className={A}>Booking contact</label>
                    <div className={x(C,"h-8")}>
                      <input id="frm3-contact" value={Y} onChange={e=>{
                        $(e.target.value),ev()
                      }} className={D} />
                    </div>
                  </div>
                </div>
              </section>
              <section className="p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className={R}>Route and terms</h3>
                    <p className={x(T,"mt-0.5")}>Collection window, delivery terms and settlement currency.</p>
                  </div>
                  <span className={x(F,z)}>Transit</span>
                </div>
                <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-pickup" className={A}>Pickup date</label>
                    <div className={x(C,"h-8")}>
                      <input id="frm3-pickup" type="date" value={J} onChange={e=>{
                        Z(e.target.value),ev()
                      }} className={x(D,P,"tabular-nums")} />
                      <span data-affix className={E}>
                        <HugeiconsIcon icon={Icon_83605} size={16} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-delivery" className={A}>Delivery date</label>
                    <div className={x(C,"h-8")}>
                      <input id="frm3-delivery" type="date" value={ee} onChange={e=>{
                        ea(e.target.value),ev()
                      }} className={x(D,P,"tabular-nums")} />
                      <span data-affix className={E}>
                        <HugeiconsIcon icon={Icon_83605} size={16} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-incoterm" className={A}>Incoterm</label>
                    <L id="frm3-incoterm" value={er} onChange={e=>{
                      et(e),ev()
                    }} options={[{value:"EXW",label:"EXW, ex works"},{value:"FCA",label:"FCA, free carrier"},{value:"DAP",label:"DAP, delivered at place"},{value:"DDP",label:"DDP, delivered duty paid"}]} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-service" className={A}>Service level</label>
                    <L id="frm3-service" value={el} onChange={e=>{
                      es(e),ev()
                    }} options={[{value:"economy",label:"Economy road"},{value:"standard",label:"Standard groupage"},{value:"express",label:"Express dedicated"}]} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="frm3-currency" className={A}>Currency</label>
                    <L id="frm3-currency" value={en} onChange={e=>{
                      ei(e),ev()
                    }} options={[{value:"EUR",label:"EUR, euro"},{value:"GBP",label:"GBP, pound sterling"},{value:"USD",label:"USD, US dollar"}]} />
                  </div>
                </div>
              </section>
              <section className="p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className={R}>Cargo lines</h3>
                    <p className={x(T,"mt-0.5")}>Amount per line is quantity times unit rate plus duty.</p>
                  </div>
                  <span className={x(F,z)}>
                    {eo.length}
                    {" "}
                    {1===eo.length?"line":"lines"}
                  </span>
                </div>
                <div className={x(v,"hidden grid-cols-[minmax(0,1fr)_72px_104px_168px_112px_32px] items-center gap-2 px-1 pb-2 md:grid")}>
                  <span className={x(j,f,"ps-3")}>Description</span>
                  <span className={x(j,f,"pe-3 text-right")}>Qty</span>
                  <span className={x(j,f,"pe-3 text-right")}>Unit rate</span>
                  <span className={x(j,f,"ps-3")}>Duty</span>
                  <span className={x(j,f,"pe-1 text-right")}>Amount</span>
                  <span className="sr-only">Actions</span>
                </div>
                <div className={x(g,"flex flex-col")}>
                  {eo.map(e=>{
                    let a=1===eo.length;
                    return (
                      <div key={e.id} className="grid grid-cols-[80px_minmax(0,1fr)_72px] items-center gap-2 px-1 py-3 md:grid-cols-[minmax(0,1fr)_72px_104px_168px_112px_32px] md:py-1.5">
                                        <div className="col-span-2 min-w-0 md:col-span-1">
                                          <L ariaLabel="Cargo description" value={e.cargo} onChange={a=>eg(e.id,{cargo:a})} options={M} />
                                        </div>
                                        <div className={x(C,"h-8")}>
                                          <span data-affix className={x(E,"md:hidden")}>Qty</span>
                                          <input aria-label="Quantity" inputMode="numeric" value={e.qty} onChange={a=>eg(e.id,{qty:a.target.value.replace(/[^0-9]/g,"")})} className={x(D,"text-right tabular-nums")} />
                                        </div>
                                        <div className={x(C,"h-8","col-span-2 md:col-span-1")}>
                                          <span data-affix className={x(E,"md:hidden")}>Unit rate</span>
                                          <input aria-label="Unit rate" inputMode="decimal" value={e.rate} onChange={a=>eg(e.id,{rate:a.target.value.replace(/[^0-9.]/g,"")})} className={x(D,"text-right tabular-nums")} />
                                        </div>
                                        <L ariaLabel="Duty rate" className="col-span-2 md:col-span-1" triggerClassName="tabular-nums" value={String(e.duty)} onChange={a=>eg(e.id,{duty:Number.parseFloat(a)})} options={W.map(e=>({value:String(e.value),label:e.label}))} />
                                        <span className={x(k,h,"pr-1 text-right tabular-nums")}>{H(G(Q(e)+O(e)))}</span>
                                        <button type="button" onClick={()=>{
                                          var a;
                                          return a=e.id,void(ed(e=>e.length>1?e.filter(e=>e.id!==a):e),ev());
                                        }} disabled={a} title={a?"A booking needs at least one cargo line":"Remove line"} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-8 rounded-[var(--rb-r-sm,6px)]","col-start-3 row-start-1 justify-self-end md:col-start-auto md:row-start-auto")}>
                                          <HugeiconsIcon icon={Icon_96037} size={16} strokeWidth={1.8} aria-hidden="true" />
                                          <span className="sr-only">Remove line</span>
                                        </button>
                                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <button type="button" onClick={()=>{
                    ed(e=>[...e,{id:ec,cargo:"palletised",qty:"1",rate:"0.00",duty:.12}]),eu(e=>e+1),ev()
                  }} className={x(N,S)}>
                    <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                    Add line
                  </button>
                  <div className="w-full max-w-[280px] space-y-1.5 sm:w-auto">
                    <div className={x(k,"flex items-center justify-between gap-6 px-3 py-2")}>
                      <span className={f}>Subtotal</span>
                      <span className={x(h,"tabular-nums")}>
                        {en}
                        {" "}
                        {H(ef.subtotal)}
                      </span>
                    </div>
                    <div className={x(k,"flex items-center justify-between gap-6 px-3 py-2")}>
                      <span className={f}>Duty total</span>
                      <span className={x(h,"tabular-nums")}>
                        {en}
                        {" "}
                        {H(ef.dutyTotal)}
                      </span>
                    </div>
                    <div className={x(p,b,w,"flex items-center justify-between gap-6 px-3 py-2")}>
                      <span className={h}>Grand total</span>
                      <span className={x(h,"tabular-nums")}>
                        {en}
                        {" "}
                        {H(ef.grand)}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className={x("border-t border-neutral-900/8 dark:border-neutral-100/8","flex flex-col-reverse items-stretch justify-between gap-3 px-4 py-3 sm:min-h-11 sm:flex-row sm:items-center sm:py-2 sm:pe-2")}>
              <p className={x(k,eb?m:f)} aria-live="polite">{eb?"Draft saved":"Rates are indicative until the carrier confirms capacity."}</p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={()=>{
                  a(false),eh(true),em.current&&clearTimeout(em.current),em.current=setTimeout(()=>eh(false),2500)
                }} className={x(N,y)}>Save draft</button>
                <button type="button" disabled={!e} onClick={()=>ep(true)} className={x("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",y)}>Book shipment</button>
              </div>
            </div>
          </div>}
        </div>
      </div>
  );
}


export default V;
