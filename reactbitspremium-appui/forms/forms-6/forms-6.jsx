/**
 * React Bits Pro — Application UI (forms-6)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { postalHint, postalLabel, postalPattern, regionLabel, regions, useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_67358 = [["path",{d:"M12 14.5V17.5M13 14.5C13 15.0523 12.5523 15.5 12 15.5C11.4477 15.5 11 15.0523 11 14.5C11 13.9477 11.4477 13.5 12 13.5C12.5523 13.5 13 13.9477 13 14.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16.5 9V6.5C16.5 4.01472 14.4853 2 12 2C9.51471 2 7.49999 4.01472 7.49999 6.5V9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "bg-neutral-900/5 dark:bg-neutral-100/5",
  x = "rounded-[var(--rb-r-sm,6px)]",
  h = "text-neutral-900 dark:text-neutral-100",
  p = "text-neutral-900/80 dark:text-neutral-100/80",
  b = "text-neutral-900/66 dark:text-neutral-100/66",
  m = "text-[16px]/[20px] font-[450] tracking-[-0.015em]",
  _ = "text-[13px]/[18px] font-normal",
  f = "text-[14px]/[16px] font-[450]",
  v = "text-[12px]/[16px] font-normal tabular-nums",
  g = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  k = "h-7 gap-1.5 rounded-[var(--rb-r-sm,6px)] px-3 text-[14px]/[16px] font-[450]",
  j = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  N = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  w = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  y = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  C = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  S = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  $ = "text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80";

function A({id:e,value:a,defaultValue:r,onChange:d,options:o,disabled:u,placeholder:x="Select…",className:h,triggerClassName:p,leading:m,ariaLabel:_}){
  let f=useId(),[g,k]=useState(false),[j,N]=useState(0),[w,y]=useState(false),[C,S]=useState(),[$,A]=useState(r??""),D=useRef(null),E=useRef(null),L=useRef({buffer:"",at:0}),z=a??$,F=o.findIndex(e=>e.value===z),M=F>=0?o[F]:undefined,P=()=>{
    if(u)return;
    let e=D.current,a=e?.ownerDocument.defaultView;
    if(e&&a){
      let r=e.getBoundingClientRect(),t=0,l=a.innerHeight;
      for(let r=e.parentElement;r;r=r.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(r).overflowY)){
        let e=r.getBoundingClientRect();
        t=Math.max(t,e.top),l=Math.min(l,e.bottom);
        break
      }
      let s=l-r.bottom,n=r.top-t,i=Math.min(32*o.length+8,264),d=s<i+8&&n>s,c=(d?n:s)-8;
      y(d),S(c<i?Math.max(c,40):undefined)
    }
    N(F>=0?F:0),k(true)
  };
  useEffect(()=>{
    if(!g)return;
    let e=D.current;
    if(!e)return;
    let a=e.ownerDocument,r=a=>{
      e.contains(a.target)||k(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [g]),useEffect(()=>{
    if(!g)return;
    let e=E.current,a=e?.querySelector(`[data-index="${j}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [g,j]);
  let H=e=>{
    let r=o[e];
    r&&(undefined===a&&A(r.value),d?.(r.value),k(false),D.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={D} className={c("relative",h)}>
        <button id={e} type="button" role="combobox" aria-expanded={g} aria-controls={f} aria-haspopup="listbox" aria-label={_} disabled={u} onClick={()=>g?k(false):P()} onKeyDown={e=>{
          if(!u){
            if(!g){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),P());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),k(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),N(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),N(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),N(0);else if("End"===e.key)e.preventDefault(),N(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),H(j);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=L.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=o.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&N(t)
            }
          }
        }} className={c("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",p)}>
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {m}
            <span className="grid min-w-0 flex-1 text-left">
              {o.map(e=><span key={e.value} aria-hidden="true" className="invisible col-start-1 row-start-1 truncate">{e.label}</span>)}
              <span className={c("col-start-1 row-start-1 truncate",!M&&"text-neutral-900/66 dark:text-neutral-100/66")}>{M?M.label:x}</span>
            </span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {g&&<ul ref={E} id={f} role="listbox" tabIndex={-1} style={{maxHeight:C}} className={c("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",w?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,a)=>{
            let r=e.value===z;
            return (
              <li key={e.value} role="option" aria-selected={r} data-index={a} data-highlighted={a===j?"":undefined} onMouseEnter={()=>N(a)} onClick={()=>H(a)} className={c("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={c(v,b,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {r&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let D = [{code:"US",name:"United States",regionLabel:"State",regions:["California","New York","Texas","Washington","Illinois","Massachusetts"],postalLabel:"ZIP code",postalHint:"5 digits, e.g. 94103",postalPattern:/^\d{5}$/},{code:"CA",name:"Canada",regionLabel:"Province",regions:["Ontario","Quebec","British Columbia","Alberta","Nova Scotia"],postalLabel:"Postal code",postalHint:"Format A1A 1A1",postalPattern:/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/},{code:"IE",name:"Ireland",regionLabel:"County",regions:["Dublin","Cork","Galway","Limerick","Kerry","Mayo"],postalLabel:"Eircode",postalHint:"Format D02 X285",postalPattern:/^[A-Za-z]\d{2} ?[A-Za-z0-9]{4}$/},{code:"SG",name:"Singapore",regionLabel:null,regions:null,postalLabel:"Postal code",postalHint:"6 digits, e.g. 049483",postalPattern:/^\d{6}$/}],
  E = e=>D.find(a=>a.code===e)??D[0],
  L = e=>({fullName:"",line1:"",line2:"",city:"",country:e,region:"",postal:""});

function z(e){
  let a=E(e.country),r=a.regions?""!==e.region:""!==e.line1;
  return ""!==e.fullName.trim()&&""!==e.line1.trim()&&""!==e.city.trim()&&r&&a.postalPattern.test(e.postal.trim());
}

let F = [{name:"Merino wool throw blanket",qty:1,unit:12800},{name:"Ceramic pour-over set",qty:2,unit:4600},{name:"Linen tea towels, set of 4",qty:1,unit:3400}],
  M = [{id:"standard",label:"Standard",note:"5 to 7 business days",cents:0},{id:"express",label:"Express",note:"2 to 3 business days",cents:1400},{id:"priority",label:"Priority",note:"Next business day",cents:2800}],
  P = e=>`$${(e/100).toFixed(2)}`;

function H({idPrefix:e,value:a,onChange:r}){
  let l=E(a.country),n=""!==a.postal.trim()&&!postalPattern.test(a.postal.trim());
  return (
    <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor={`${e}-name`} className={y}>Full name</label>
          <div className={c(N,"h-8")}>
            <input id={`${e}-name`} value={a.fullName} onChange={e=>r({fullName:e.target.value})} placeholder="Recipient name" className={w} />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor={`${e}-line1`} className={y}>Street address</label>
          <div className={c(N,"h-8")}>
            <input id={`${e}-line1`} value={a.line1} onChange={e=>r({line1:e.target.value})} placeholder="Number and street" className={w} />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor={`${e}-line2`} className={y}>Apartment or unit</label>
          <div className={c(N,"h-8")}>
            <input id={`${e}-line2`} value={a.line2} onChange={e=>r({line2:e.target.value})} placeholder="Optional" className={w} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${e}-country`} className={y}>Country</label>
          <A id={`${e}-country`} value={a.country} onChange={e=>r({country:e,region:"",postal:""})} options={D.map(e=>({value:e.code,label:e.name}))} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${e}-city`} className={y}>City</label>
          <div className={c(N,"h-8")}>
            <input id={`${e}-city`} value={a.city} onChange={e=>r({city:e.target.value})} placeholder="City or town" className={w} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${e}-region`} className={y}>{regionLabel??"Region"}</label>
          {regions?<A id={`${e}-region`} value={a.region} onChange={e=>r({region:e})} options={regions.map(e=>({value:e,label:e}))} placeholder={`Select ${regionLabel.toLowerCase()}`} />:<div className={c(N,"h-8")}>
            <input id={`${e}-region`} value={a.region} onChange={e=>r({region:e.target.value})} placeholder="District or area" className={w} />
          </div>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${e}-postal`} className={y}>{postalLabel}</label>
          <div className={c(N,"h-8")}>
            <input id={`${e}-postal`} value={a.postal} onChange={e=>r({postal:e.target.value})} aria-invalid={n} aria-describedby={`${e}-postal-help`} placeholder={postalLabel} className={w} />
          </div>
          <p id={`${e}-postal-help`} className={n?"flex items-start gap-2 text-[13px]/[18px] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]":"max-w-[60ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80"}>
            {n&&<HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />}
            {n?`Enter a valid ${postalLabel.toLowerCase()}.`:postalHint}
          </p>
        </div>
      </div>
  );
}

function R(){
  let[e,a]=useState(""),[r,n]=useState(L("US")),[d,A]=useState(true),[D,E]=useState(L("US")),[R,T]=useState("standard"),[W,q]=useState(""),[B,I]=useState(""),[Y,O]=useState(""),[U,Z]=useState(false),[V,G]=useState(false),K=function(e){
    if(""===e)return "";
    let a=e[0];
    return "4"===a?"Visa":"5"===a?"Mastercard":"3"===a?"Amex":"";
  }(W.replace(/\D/g,"")),Q=W.replace(/\D/g,""),X=U?[]:F,J=X.reduce((e,a)=>e+a.qty*a.unit,0),ee=M.find(e=>e.id===R)?.cents??0,ea=Math.round(.085*J),er=J+ee+ea,et=M.find(e=>e.id===R)?.label??"Standard",el=Q.slice(-4),es=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim()),en=Q.length>=15,ei=4===B.replace(/\D/g,"").length,ed=Y.length>=3,eo=!U&&es&&z(r)&&(d||z(D))&&en&&ei&&ed;
  return (
    <div className={c("bg-white dark:bg-neutral-950",h,"relative flex h-full min-h-[1040px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[1100px]">
          {V?<div className={C}>
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <span className="flex h-12 w-12 items-center justify-center">
                <HugeiconsIcon icon={Icon_90987} size={24} strokeWidth={1.8} aria-hidden="true" className={p} />
              </span>
              <h2 className={c(m,h,"mt-4")}>Order confirmed</h2>
              <p className={c("text-[14px]/[20px] font-normal",p,"mt-1 max-w-sm")}>
                {"We sent a receipt to "}
                {e||"your inbox"}
                . Your order ships once payment settles.
              </p>
              <dl className={c(u,x,"mt-5 w-full max-w-sm space-y-2.5 p-4 text-left")}>
                <div className={c(_,"flex items-center justify-between")}>
                  <dt className={b}>Order reference</dt>
                  <dd className={c("font-mono text-[12px]/[16px] tabular-nums",h)}>ORD-2026-5821</dd>
                </div>
                <div className={c(_,"flex items-center justify-between")}>
                  <dt className={b}>Amount charged</dt>
                  <dd className={c(h,"tabular-nums")}>{P(er)}</dd>
                </div>
                <div className={c(_,"flex items-center justify-between")}>
                  <dt className={b}>Shipping</dt>
                  <dd className={h}>{et}</dd>
                </div>
                <div className={c(_,"flex items-center justify-between")}>
                  <dt className={b}>Card charged</dt>
                  <dd className={c(h,"tabular-nums")}>
                    {"•••• "}
                    {el}
                  </dd>
                </div>
              </dl>
              <button type="button" onClick={()=>G(false)} className={c(g,j,"mt-6")}>Back to checkout</button>
            </div>
          </div>:<div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className={C}>
              <div className={c("border-b border-neutral-900/8 dark:border-neutral-100/8","flex items-start justify-between gap-4 px-4 py-3")}>
                <div className="min-w-0">
                  <h2 className={c(m,h)}>Checkout</h2>
                  <p className={c($,"mt-0.5")}>Enter delivery and payment details to complete your order.</p>
                </div>
                <span className={c(_,b,"hidden shrink-0 items-center gap-1.5 sm:inline-flex")}>
                  <HugeiconsIcon icon={Icon_67358} size={14} strokeWidth={1.8} aria-hidden="true" />
                  Secure
                </span>
              </div>
              <div className="space-y-8 p-4 sm:p-5">
                <section>
                  <div className="mb-3">
                    <h3 className={S}>Delivery address</h3>
                    <p className={c($,"mt-0.5")}>Where should we send this order?</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="frm6-email" className={y}>Email for updates</label>
                      <div className={c(N,"h-8")}>
                        <input id="frm6-email" type="email" value={e} onChange={e=>a(e.target.value)} aria-invalid={""!==e&&!es} placeholder="you@example.com" className={w} />
                      </div>
                    </div>
                    <H idPrefix="frm6-del" value={r} onChange={e=>n(a=>({...a,...e}))} />
                  </div>
                </section>
                <section>
                  <label className={c(u,x,"flex cursor-pointer items-center gap-2 px-3 py-2.5")}>
                    <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
                      <input type="checkbox" checked={d} onChange={e=>A(e.target.checked)} className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40" />
                      <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className="pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]" />
                    </span>
                    <span className={c(f,h)}>Billing address matches delivery</span>
                  </label>
                  <div className="grid" style={{gridTemplateRows:d?"0fr":"1fr"}}>
                    <div className={c("overflow-hidden",d&&"invisible")}>
                      <div className="pt-6">
                        <div className="mb-3">
                          <h3 className={S}>Billing address</h3>
                          <p className={c($,"mt-0.5")}>The address on your payment method.</p>
                        </div>
                        <H idPrefix="frm6-bill" value={D} onChange={e=>E(a=>({...a,...e}))} />
                      </div>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="mb-3">
                    <h3 className={S}>Payment</h3>
                    <p className={c($,"mt-0.5")}>Your card is charged when the order ships.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label htmlFor="frm6-card" className={y}>Card number</label>
                      <div className={c(N,"h-8")}>
                        <input id="frm6-card" inputMode="numeric" value={W} onChange={e=>q(e.target.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim())} placeholder="1234 5678 9012 3456" className={c(w,"tabular-nums")} />
                        {K&&<span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">{K}</span>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="frm6-exp" className={y}>Expiry</label>
                      <div className={c(N,"h-8")}>
                        <input id="frm6-exp" inputMode="numeric" value={B} onChange={e=>{
                          let a;
                          return I((a=e.target.value.replace(/\D/g,"").slice(0,4)).length<=2?a:`${a.slice(0,2)} / ${a.slice(2)}`);
                        }} placeholder="MM / YY" className={c(w,"tabular-nums")} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="frm6-cvc" className={y}>CVC</label>
                      <div className={c(N,"h-8")}>
                        <input id="frm6-cvc" inputMode="numeric" value={Y} onChange={e=>O(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="123" className={c(w,"tabular-nums")} />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className={c("border-t border-neutral-900/8 dark:border-neutral-100/8","flex flex-col-reverse items-stretch gap-2 px-4 py-3 sm:min-h-11 sm:flex-row sm:items-center sm:justify-between sm:p-2")}>
                <button type="button" disabled={U} onClick={()=>Z(true)} className={c(g,k)}>Back to cart</button>
                <div className="flex items-center gap-3">
                  {!eo&&<span className={c(_,b,"hidden sm:inline")}>{U?"Your cart is empty":"Complete the required fields to pay"}</span>}
                  <button type="button" disabled={!eo} onClick={()=>G(true)} className={c("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",k,"flex-1 sm:flex-none")}>
                    {"Pay "}
                    {P(er)}
                  </button>
                </div>
              </div>
            </div>
            <aside className={c(C,"p-4 sm:p-5")}>
              <div>
                <h3 className={S}>Order summary</h3>
                {U?<div className="mt-3 flex flex-col items-center px-4 py-8 text-center">
                  <p className="text-[16px]/[20px] font-[450] tracking-[-0.015em] text-neutral-900 dark:text-neutral-100">Your cart is empty.</p>
                  <p className={c("max-w-[48ch] text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>Restore your items to continue checking out.</p>
                  <button type="button" onClick={()=>Z(false)} className={c(g,j,"mt-3")}>Restore items</button>
                </div>:<>
                  <ul className="mt-3 space-y-2.5">
                    {X.map(e=>(
                      <li key={e.name} className="flex items-start justify-between gap-3">
                                        <span className={c(_,p,"min-w-0 flex-1")}>
                                          <span className="block min-w-0 overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)]">{e.name}</span>
                                          <span className={c(v,b,"flex flex-wrap gap-x-2")}>
                                            <span>
                                              {"Qty "}
                                              {e.qty}
                                            </span>
                                            <span>
                                              {P(e.unit)}
                                              {" each"}
                                            </span>
                                          </span>
                                        </span>
                                        <span className={c(_,h,"shrink-0 tabular-nums")}>{P(e.qty*e.unit)}</span>
                                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <p className={c(v,b,"mb-2")}>Shipping speed</p>
                    <div className={c("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","-mx-2 flex flex-col")}>
                      {M.map(e=>(
                        <div key={e.id}>
                                            <label className={c("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8",x,"px-2")}>
                                              <input type="radio" name="frm6-shipping" value={e.id} checked={R===e.id} onChange={()=>T(e.id)} className={c("size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-[5px] checked:border-[var(--rb-accent,oklch(20.5%_0_0))] checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:border-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:border-[var(--rb-accent,oklch(100%_0_0))] dark:checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:border-neutral-100/40","mt-px self-start")} />
                                              <span className="min-w-0 flex-1">
                                                <span className={c(_,h,"block")}>{e.label}</span>
                                                <span className={c(v,b,"block")}>{e.note}</span>
                                              </span>
                                              <span className={c(_,p,"shrink-0 self-start tabular-nums")}>{0===e.cents?"Free":P(e.cents)}</span>
                                            </label>
                                          </div>
                      ))}
                    </div>
                  </div>
                  <dl className="mt-4 space-y-2">
                    <div className={c(_,"flex items-center justify-between")}>
                      <dt className={b}>Subtotal</dt>
                      <dd className={c(h,"tabular-nums")}>{P(J)}</dd>
                    </div>
                    <div className={c(_,"flex items-center justify-between")}>
                      <dt className={b}>Shipping</dt>
                      <dd className={c(h,"tabular-nums")}>{0===ee?"Free":P(ee)}</dd>
                    </div>
                    <div className={c(_,"flex items-center justify-between")}>
                      <dt className={b}>
                        Tax (
                        8.5
                        %)
                      </dt>
                      <dd className={c(h,"tabular-nums")}>{P(ea)}</dd>
                    </div>
                    <div className={c(u,x,f,"mt-1 flex items-center justify-between gap-4 px-3 py-2.5")}>
                      <dt className={h}>Total</dt>
                      <dd className={c(h,"tabular-nums")}>{P(er)}</dd>
                    </div>
                  </dl>
                </>}
              </div>
            </aside>
          </div>}
        </div>
      </div>
  );
}


export default R;
