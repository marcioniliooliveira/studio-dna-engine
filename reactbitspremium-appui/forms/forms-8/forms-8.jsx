/**
 * React Bits Pro — Application UI (forms-8)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { label, length, options, slice, type, unit, useEffect, useId, useMemo, useRef, useState,  } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_10303 = [["path",{d:"M6 12V8C6 7.05719 6 6.58579 6.29289 6.29289C6.58579 6 7.05719 6 8 6H12C12.9428 6 13.4142 6 13.7071 6.29289C14 6.58579 14 7.05719 14 8V12C14 12.9428 14 13.4142 13.7071 13.7071C13.4142 14 12.9428 14 12 14H8C7.05719 14 6.58579 14 6.29289 13.7071C6 13.4142 6 12.9428 6 12Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M2 20V16C2 15.0572 2 14.5858 2.29289 14.2929C2.58579 14 3.05719 14 4 14H8C8.94281 14 9.41421 14 9.70711 14.2929C10 14.5858 10 15.0572 10 16V20C10 20.9428 10 21.4142 9.70711 21.7071C9.41421 22 8.94281 22 8 22H4C3.05719 22 2.58579 22 2.29289 21.7071C2 21.4142 2 20.9428 2 20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M10 20V16C10 15.0572 10 14.5858 10.2929 14.2929C10.5858 14 11.0572 14 12 14H16C16.9428 14 17.4142 14 17.7071 14.2929C18 14.5858 18 15.0572 18 16V20C18 20.9428 18 21.4142 17.7071 21.7071C17.4142 22 16.9428 22 16 22H12C11.0572 22 10.5858 22 10.2929 21.7071C10 21.4142 10 20.9428 10 20Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M18 21.5L21.4142 18.0858C21.7032 17.7968 21.8478 17.6522 21.9239 17.4685C22 17.2847 22 17.0803 22 16.6716V12C22 11.0572 22 10.5858 21.7071 10.2929C21.4142 10 20.9428 10 20 10H18",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M6 10L2.58579 13.4142C2.29676 13.7032 2.15224 13.8478 2.07612 14.0315C2 14.2153 2 14.4197 2 14.8284V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M14 13.5L17.317 10.5976C17.6532 10.3035 17.8213 10.1564 17.9106 9.95945C18 9.7625 18 9.53916 18 9.09246V4C18 3.05719 18 2.58579 17.7071 2.29289C17.4142 2 16.9428 2 16 2H11.2604C10.8845 2 10.6965 2 10.5248 2.06528C10.3531 2.13056 10.2126 2.25543 9.93167 2.50518L6.67127 5.40331C6.34077 5.69709 6.17552 5.84398 6.08776 6.03941C6 6.23484 6 6.45594 6 6.89813V9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M14 6L17.5 2.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M18 14L21.5 10.5",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_96037 = [["path",{d:"M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M9.5 16.5L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M14.5 16.5L14.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];

let u = (...e)=>e.filter(Boolean).join(" "),
  h = "text-neutral-900/80 dark:text-neutral-100/80",
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  x = "bg-neutral-900/5 dark:bg-neutral-100/5",
  m = "rounded-[var(--rb-r-sm,6px)]",
  v = "text-[13px]/[18px] font-normal",
  f = "text-[14px]/[16px] font-[450]",
  _ = "text-[12px]/[16px] font-normal tabular-nums",
  g = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  k = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  w = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  y = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  N = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  j = "max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80",
  z = "inline-flex w-fit max-w-full items-stretch gap-0.5 rounded-[var(--rb-r-sm,6px)] bg-neutral-900/5 p-0.5 dark:bg-neutral-100/5",
  C = "relative inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--rb-r-xs,4px)] px-3 text-[14px]/[16px] font-[450] text-neutral-900/80 select-none transition-[background-color,color,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-aria-checked:bg-neutral-900/5 hover:not-aria-checked:text-neutral-900 active:not-aria-checked:bg-neutral-900/8 aria-checked:bg-white aria-checked:text-neutral-900 aria-checked:shadow-[0_1px_2px_rgb(0_0_0/0.1)] disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:text-neutral-100/80 dark:hover:not-aria-checked:bg-neutral-100/5 dark:hover:not-aria-checked:text-neutral-100 dark:active:not-aria-checked:bg-neutral-100/8 dark:aria-checked:bg-neutral-700 dark:aria-checked:text-neutral-100 dark:aria-checked:shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_1px_2px_rgb(0_0_0/0.3)] dark:disabled:text-neutral-100/40",
  A = u(v,b,"shrink-0");

function S(e){
  let a=Array.from(e.currentTarget.querySelectorAll('[role="radio"]:not(:disabled)')),r=a.indexOf(e.target);
  if(r<0)return;
  let t=r;
  if("ArrowRight"===e.key||"ArrowDown"===e.key)t=(r+1)%a.length;else if("ArrowLeft"===e.key||"ArrowUp"===e.key)t=(r-1+a.length)%a.length;else if("Home"===e.key)t=0;else{
    if("End"!==e.key)return;
    t=a.length-1
  }
  e.preventDefault(),a[t].focus(),a[t].click()
}

let B = [{id:"weight",label:"Pallet weight",type:"number",unit:"kg"},{id:"height",label:"Pallet height",type:"number",unit:"cm"},{id:"category",label:"SKU category",type:"enum",options:["Ambient","Chilled","Frozen","Hazardous","Fragile"]},{id:"zone",label:"Destination zone",type:"enum",options:["Bay 1","Bay 2","Bay 3","Bay 4","Cold store","Overflow"]},{id:"carrier",label:"Carrier name",type:"text"},{id:"reference",label:"Reference code",type:"text"},{id:"hazard",label:"Hazardous flag",type:"boolean"}],
  L = e=>B.find(a=>a.id===e)??B[0],
  M = {text:[{id:"is",label:"is"},{id:"is_not",label:"is not"},{id:"contains",label:"contains"}],number:[{id:"equals",label:"equals"},{id:"greater",label:"greater than"},{id:"between",label:"between"}],enum:[{id:"is",label:"is"},{id:"is_not",label:"is not"},{id:"any_of",label:"is any of"}],boolean:[{id:"is",label:"is"}]},
  T = [{id:"route",label:"Route to zone",param:"select",options:["Bay 1","Bay 2","Bay 3","Bay 4","Cold store","Overflow"],phrase:e=>`route it to ${e}`,emptyPhrase:"route it to a zone"},{id:"notify",label:"Notify",param:"select",options:["the floor lead","the receiving team","the shift manager","the cold-chain lead"],phrase:e=>`notify ${e}`,emptyPhrase:"notify someone"},{id:"priority",label:"Set priority",param:"select",options:["Standard","High","Urgent"],phrase:e=>`set priority to ${e.toLowerCase()}`,emptyPhrase:"set a priority"},{id:"hold",label:"Place on hold",param:"none",phrase:()=>"place it on hold",emptyPhrase:"place it on hold"},{id:"note",label:"Add a note",param:"text",placeholder:"Note text",phrase:e=>`add the note "${e}"`,emptyPhrase:"add a note"}],
  E = e=>T.find(a=>a.id===e)??T[0];

function $(e){
  let a=L(e.field).type;
  return "text"===a?""===e.value.trim():"number"===a?"between"===e.operator?""===e.value.trim()||""===e.value2.trim():""===e.value.trim():"enum"===a&&("any_of"===e.operator?0===e.values.length:""===e.value);
}

let P = [{id:"PLT-1042",weight:620,height:142,category:"Frozen",zone:"Cold store",carrier:"Nordic Freight",reference:"INB-77201",hazard:false},{id:"PLT-1043",weight:480,height:118,category:"Frozen",zone:"Bay 3",carrier:"Harbor Logistics",reference:"INB-77202",hazard:false},{id:"PLT-1044",weight:905,height:168,category:"Frozen",zone:"Overflow",carrier:"Nordic Freight",reference:"INB-77203",hazard:true},{id:"PLT-1045",weight:750,height:150,category:"Frozen",zone:"Cold store",carrier:"Meridian Cargo",reference:"INB-77204",hazard:false},{id:"PLT-1046",weight:300,height:96,category:"Ambient",zone:"Bay 1",carrier:"Harbor Logistics",reference:"INB-77205",hazard:false},{id:"PLT-1047",weight:1200,height:184,category:"Frozen",zone:"Cold store",carrier:"Nordic Freight",reference:"INB-77206",hazard:false},{id:"PLT-1048",weight:540,height:128,category:"Chilled",zone:"Bay 2",carrier:"Meridian Cargo",reference:"INB-77207",hazard:false},{id:"PLT-1049",weight:610,height:134,category:"Frozen",zone:"Bay 4",carrier:"Harbor Logistics",reference:"INB-77208",hazard:false}];

function D(e,a){
  let r=L(e.field),t=a[r.id];
  if("text"===r.type){
    let a=String(t??"").toLowerCase(),r=e.value.trim().toLowerCase();
    return ""!==r&&("is_not"===e.operator?a!==r:"contains"===e.operator?a.includes(r):a===r);
  }
  if("number"===r.type){
    let a=Number(t),r=parseFloat(e.value);
    if(Number.isNaN(r))return false;
    if("greater"===e.operator)return a>r;
    if("between"===e.operator){
      let t=parseFloat(e.value2);
      return !Number.isNaN(t)&&a>=Math.min(r,t)&&a<=Math.max(r,t);
    }
    return a===r;
  }
  if("enum"===r.type){
    let a=String(t??"");
    return "any_of"===e.operator?e.values.includes(a):""!==e.value&&("is_not"===e.operator?a!==e.value:a===e.value);
  }
  return !!t===e.bool;
}

function F({id:e,value:a,onChange:r,options:s,disabled:d,placeholder:c="Select…",className:h,triggerClassName:p,leading:x,ariaLabel:m}){
  let v=useId(),[f,g]=useState(false),[k,w]=useState(0),[y,N]=useState(false),[j,z]=useState(),C=useRef(null),A=useRef(null),S=useRef({buffer:"",at:0}),B=s.findIndex(e=>e.value===a),L=B>=0?s[B]:undefined,M=e=>{
    if(d)return;
    let a=C.current,r=a?.ownerDocument.defaultView;
    if(a&&r){
      let e=a.getBoundingClientRect(),t=0,l=r.innerHeight;
      for(let e=a.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(r.getComputedStyle(e).overflowY)){
        let a=e.getBoundingClientRect();
        t=Math.max(t,a.top),l=Math.min(l,a.bottom);
        break
      }
      let n=l-e.bottom,i=e.top-t,o=Math.min(32*s.length+8,264),d=n<o+8&&i>n,c=(d?i:n)-8;
      N(d),z(c<o?Math.max(c,40):undefined)
    }
    w(e??(B>=0?B:0)),g(true)
  };
  useEffect(()=>{
    if(!f)return;
    let e=C.current,a=e?.ownerDocument;
    if(!a)return;
    let r=a=>{
      e.contains(a.target)||g(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [f]),useEffect(()=>{
    if(!f)return;
    let e=A.current,a=e?.querySelector(`[data-index="${k}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [f,k]);
  let T=e=>{
    let a=s[e];
    a&&(r(a.value),g(false),C.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={C} className={u("relative",h)}>
        <button id={e} type="button" role="combobox" aria-expanded={f} aria-controls={v} aria-haspopup="listbox" aria-label={m} disabled={d} onClick={()=>f?g(false):M()} onKeyDown={e=>{
          if(!d){
            if(!f){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),M());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),g(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),w(e=>Math.min(e+1,s.length-1));else if("ArrowUp"===e.key)e.preventDefault(),w(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),w(0);else if("End"===e.key)e.preventDefault(),w(s.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),T(k);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=S.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=s.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&w(t)
            }
          }
        }} className={u("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",p)}>
          <span className="flex min-w-0 items-center gap-2">
            {x}
            <span className={u("truncate",!L&&"text-neutral-900/66 dark:text-neutral-100/66")}>{L?L.label:c}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {f&&<ul ref={A} id={v} role="listbox" tabIndex={-1} style={{maxHeight:j}} className={u("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",y?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {s.map((e,r)=>{
            let l=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={r} data-highlighted={r===k?"":undefined} onMouseEnter={()=>w(r)} onClick={()=>T(r)} className={u("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={u(_,b,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let I = [{id:"c1",field:"weight",operator:"greater",value:"500",value2:"",values:[],bool:true},{id:"c2",field:"category",operator:"is",value:"Frozen",value2:"",values:[],bool:true},{id:"c3",field:"hazard",operator:"is",value:"",value2:"",values:[],bool:false}],
  H = [{id:"a1",action:"route",value:"Cold store"},{id:"a2",action:"notify",value:"the cold-chain lead"}];

function R(){
  let[e,a]=useState(I),[r,i]=useState("all"),[o,R]=useState(H),[W,q]=useState(null),U=useRef(4),[K,O]=useState(false);
  useEffect(()=>{
    if(!K)return;
    let e=window.setTimeout(()=>O(false),2500);
    return ()=>window.clearTimeout(e);
  }, [K]);
  let Y=(e,r)=>{
    q(null),a(a=>a.map(a=>a.id===e?{...a,...r}:a))
  },V=()=>{
    q(null);
    let e=`c${U.current++}`;
    a(a=>{
      let r;
      return [...a,{id:e,field:(r=B[0]).id,operator:M[r.type][0].id,value:"",value2:"",values:[],bool:true}];
    })
  },G=(e,a)=>R(r=>r.map(r=>r.id===e?{...r,...a}:r)),J=useMemo(()=>{
    let a=e.length;
    if(0===a)return "";
    let t=1===a?"When the condition matches":"all"===r?`When all ${a} conditions match`:`When any of the ${a} conditions match`,l=o.map(e=>{
      let a=E(e.action);
      return "none"===a.param?a.phrase(""):""!==e.value.trim()?a.phrase(e.value):a.emptyPhrase;
    });
    return `${t}, ${0===length?"":1===length?l[0]:2===length?`${l[0]} and ${l[1]}`:`${slice(0, -1).join(", ")} and ${l[length-1]}`}.`;
  }, [e.length,r,o]),Q=0===e.length||e.some($),X=e.length<2;
  return (
    <div className={u("bg-white dark:bg-neutral-950","text-neutral-900 dark:text-neutral-100","relative flex h-full min-h-[800px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[1100px] shrink-0">
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
            <div className={u("border-b border-neutral-900/8 dark:border-neutral-100/8","flex items-start justify-between gap-4 px-4 py-3")}>
              <div className="min-w-0">
                <h2 className="text-[16px]/[20px] font-[450] tracking-[-0.015em]">Inbound pallet routing rule</h2>
                <p className={u("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5 truncate")}>Match arriving pallets, then decide where they go.</p>
              </div>
            </div>
            <div className="space-y-6 p-4">
              <section>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className={f}>When</h3>
                  <div role="radiogroup" aria-label="Match mode" title={X?"Add a second condition to choose how they combine":undefined} onKeyDown={S} className={u(z,"h-8")}>
                    {[{id:"all",label:"Match all"},{id:"any",label:"Match any"}].map(e=>{
                      let a=r===e.id;
                      return (
                        <button key={e.id} type="button" role="radio" aria-checked={a} tabIndex={a?0:-1} disabled={X} onClick={()=>{
                                            var a;
                                            return a=e.id,void(q(null),i(a));
                                          }} className={C}>{e.label}</button>
                      );
                    })}
                  </div>
                </div>
                {0===e.length?<div className="flex flex-col items-center px-6 py-12 text-center">
                  <span className="flex h-10 w-10 items-center justify-center">
                    <HugeiconsIcon icon={Icon_10303} size={20} strokeWidth={1.8} aria-hidden="true" className={h} />
                  </span>
                  <p className={u("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-3")}>This rule has no conditions, so it never runs.</p>
                  <button type="button" onClick={V} className={u(g,w,"mt-4")}>
                    <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                    Add the first condition
                  </button>
                </div>:<div className={u(p,"flex flex-col")}>
                  {e.map(e=>{
                    var r;
                    let l,i=L(e.field);
                    return (
                      <div key={e.id} className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center">
                                        <F value={e.field} onChange={a=>{
                                          var r;
                                          let t;
                                          return r=e.id,t=L(a).type,void Y(r,{field:a,operator:M[t][0].id,value:"",value2:"",values:[],bool:true});
                                        }} options={B.map(e=>({value:e.id,label:e.label}))} className="sm:w-[168px] sm:shrink-0" />
                                        <F value={e.operator} onChange={a=>Y(e.id,{operator:a,value:"",value2:"",values:[]})} options={M[i.type].map(e=>({value:e.id,label:e.label}))} className="sm:w-[150px] sm:shrink-0" />
                                        <div className="min-w-0 flex-1">
                                          {"text"===(l=L((r=e).field)).type?<div className={u(y,"h-8")}>
                                            <input value={r.value} onChange={e=>Y(r.id,{value:e.target.value})} aria-label={`${label} value`} placeholder="Enter a value" className={N} />
                                          </div>:"number"===type?"between"===r.operator?<div className="flex items-center gap-2">
                                            <div className={u(y,"h-8")}>
                                              <input value={r.value} onChange={e=>Y(r.id,{value:e.target.value.replace(/[^\d.]/g,"")})} inputMode="decimal" aria-label={`${label} lower bound`} placeholder="Min" className={u(N,"tabular-nums")} />
                                            </div>
                                            <span className={A}>and</span>
                                            <div className={u(y,"h-8")}>
                                              <input value={r.value2} onChange={e=>Y(r.id,{value2:e.target.value.replace(/[^\d.]/g,"")})} inputMode="decimal" aria-label={`${label} upper bound`} placeholder="Max" className={u(N,"tabular-nums")} />
                                            </div>
                                            {unit&&<span className={A}>{unit}</span>}
                                          </div>:<div className={u(y,"h-8")}>
                                            <input value={r.value} onChange={e=>Y(r.id,{value:e.target.value.replace(/[^\d.]/g,"")})} inputMode="decimal" aria-label={`${label} value`} placeholder="0" className={u(N,"tabular-nums")} />
                                            {unit&&<span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">{unit}</span>}
                                          </div>:"enum"===type?"any_of"===r.operator?<div className="flex flex-wrap gap-1.5">
                                            {options.map(e=>{
                                              let a=r.values.includes(e);
                                              return <button key={e} type="button" aria-pressed={a} onClick={()=>Y(r.id,{values:a?r.values.filter(a=>a!==e):[...r.values,e]})} className="relative inline-flex h-7 max-w-full min-w-0 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 px-2.5 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100 select-none shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] transition-[background-color,border-color,color,scale,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 hover:not-disabled:border-neutral-900/32 aria-pressed:border-neutral-900/32 aria-pressed:bg-neutral-900/9 aria-expanded:border-neutral-900/32 disabled:cursor-not-allowed disabled:text-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:hover:not-disabled:border-neutral-100/32 dark:aria-pressed:border-neutral-100/32 dark:aria-pressed:bg-neutral-100/16 dark:aria-expanded:border-neutral-100/32 dark:disabled:text-neutral-100/40">{e}</button>;
                                            })}
                                          </div>:<F value={r.value} onChange={e=>Y(r.id,{value:e})} options={(options??[]).map(e=>({value:e,label:e}))} placeholder="Select a value" />:<div role="radiogroup" aria-label={`${label} value`} onKeyDown={S} className={u(z,"h-8")}>
                                            {[{on:true,label:"Yes"},{on:false,label:"No"}].map(e=>{
                                              let a=r.bool===e.on;
                                              return <button key={e.label} type="button" role="radio" aria-checked={a} tabIndex={a?0:-1} onClick={()=>Y(r.id,{bool:e.on})} className={C}>{e.label}</button>;
                                            })}
                                          </div>}
                                        </div>
                                        <button type="button" onClick={()=>{
                                          var r;
                                          return r=e.id,void(q(null),a(e=>e.filter(e=>e.id!==r)));
                                        }} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40","size-8 rounded-[var(--rb-r-sm,6px)]","self-end sm:self-auto")}>
                                          <HugeiconsIcon icon={Icon_96037} size={16} strokeWidth={1.8} aria-hidden="true" />
                                          <span className="sr-only">Remove condition</span>
                                        </button>
                                      </div>
                    );
                  })}
                </div>}
                {e.length>0&&<button type="button" onClick={V} className={u(g,w,"mt-2")}>
                  <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                  Add condition
                </button>}
                {W&&<div role="status" className={u(x,m,"mt-3 px-4 py-3")}>
                  <p className={u(f,"tabular-nums")}>
                    {W.count}
                    {" of "}
                    {P.length}
                    {" sample pallets match"}
                  </p>
                  <p className={u(v,h,"mt-1")}>{0===W.count?"No sample pallets satisfy the current rule.":W.ids.join(", ")}</p>
                </div>}
              </section>
              <section>
                <div className="mb-2">
                  <h3 className={f}>Then</h3>
                  <p className={u(j,"mt-0.5")}>Actions run in order when the conditions match.</p>
                </div>
                <div className={u(p,"flex flex-col")}>
                  {o.map(e=>{
                    let a=E(e.action);
                    return (
                      <div key={e.id} className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center">
                                        <F value={e.action} onChange={a=>G(e.id,{action:a,value:""})} options={T.map(e=>({value:e.id,label:e.label}))} className="sm:w-[200px] sm:shrink-0" />
                                        <div className="min-w-0 flex-1">
                                          {"select"===a.param&&<F value={e.value} onChange={a=>G(e.id,{value:a})} options={(a.options??[]).map(e=>({value:e,label:e}))} placeholder="Choose" />}
                                          {"text"===a.param&&<div className={u(y,"h-8")}>
                                            <input value={e.value} onChange={a=>G(e.id,{value:a.target.value})} aria-label="Action parameter" placeholder={a.placeholder} className={N} />
                                          </div>}
                                          {"none"===a.param&&<p className={u(j,"px-1")}>No parameters for this action.</p>}
                                        </div>
                                      </div>
                    );
                  })}
                </div>
              </section>
              <section>
                <div className={u(x,m,"px-4 py-3")}>
                  <p className={u(_,b)}>Summary</p>
                  <p className={u("text-[14px]/[20px] font-normal","mt-1")}>{0===e.length?"Add a condition to describe when this rule runs.":J}</p>
                </div>
              </section>
            </div>
            <div className={u("border-t border-neutral-900/8 dark:border-neutral-100/8","flex flex-col-reverse gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between")}>
              <button type="button" onClick={()=>{
                let a=P.filter(a=>"all"===r?e.every(e=>D(e,a)):e.some(e=>D(e,a)));
                q({count:a.length,ids:a.map(e=>e.id)})
              }} disabled={Q} className={u(g,k)}>Test rule</button>
              <div className="flex items-center gap-3">
                {Q&&<span className={u(v,b,"hidden sm:inline")}>{0===e.length?"Add at least one condition":"Fill in every condition value"}</span>}
                <button type="button" onClick={()=>O(true)} disabled={Q} className={u("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",k,"flex-1 sm:flex-none")}>{K?"Rule saved":"Save rule"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default R;
