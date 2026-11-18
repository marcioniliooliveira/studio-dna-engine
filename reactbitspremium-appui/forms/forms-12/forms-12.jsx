/**
 * React Bits Pro — Application UI (forms-12)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_66654 = [["path",{d:"M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 20H17",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let c = (...e)=>e.filter(Boolean).join(" "),
  u = "text-neutral-900 dark:text-neutral-100",
  b = "text-neutral-900/80 dark:text-neutral-100/80",
  x = "text-neutral-900/66 dark:text-neutral-100/66",
  p = "border-b border-neutral-900/8 dark:border-neutral-100/8",
  h = "text-[13px]/[18px] font-normal",
  m = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",
  v = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",
  _ = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  g = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  f = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  k = "flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  j = "relative inline-flex size-4 shrink-0 items-center justify-center",
  w = "peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40",
  y = "pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]",
  N = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  C = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100";

function E({id:e,value:a,onChange:t,options:o,disabled:d,placeholder:u="Select…",className:b,triggerClassName:p,leading:h,ariaLabel:m}){
  let v=useId(),[_,g]=useState(false),[f,k]=useState(0),[j,w]=useState(false),[y,N]=useState(),C=useRef(null),E=useRef(null),S=useRef({buffer:"",at:0}),A=o.findIndex(e=>e.value===a),z=A>=0?Icon_66654:undefined,D=e=>{
    if(d)return;
    let a=C.current,t=a?.ownerDocument.defaultView;
    if(a&&t){
      let e=a.getBoundingClientRect(),r=0,l=t.innerHeight;
      for(let e=a.parentElement;e;e=e.parentElement)if(/auto|scroll|hidden|clip/.test(t.getComputedStyle(e).overflowY)){
        let a=e.getBoundingClientRect();
        r=Math.max(r,a.top),l=Math.min(l,a.bottom);
        break
      }
      let s=l-e.bottom,n=e.top-r,i=Math.min(32*o.length+8,264),d=s<i+8&&n>s,c=(d?n:s)-8;
      w(d),N(c<i?Math.max(c,40):undefined)
    }
    k(e??(A>=0?A:0)),g(true)
  };
  useEffect(()=>{
    if(!_)return;
    let e=C.current,a=e?.ownerDocument;
    if(!a)return;
    let t=a=>{
      e.contains(a.target)||g(false)
    };
    return a.addEventListener("mousedown",t),a.addEventListener("touchstart",t),()=>{
      a.removeEventListener("mousedown",t),a.removeEventListener("touchstart",t)
    };
  }, [_]),useEffect(()=>{
    if(!_)return;
    let e=E.current,a=e?.querySelector(`[data-index="${f}"]`);
    if(!e||!a)return;
    let t=a.offsetTop,r=t+a.offsetHeight;
    t<e.scrollTop?e.scrollTop=t:r>e.scrollTop+e.clientHeight&&(e.scrollTop=r-e.clientHeight)
  }, [_,f]);
  let M=e=>{
    let a=o[e];
    a&&(t(a.value),g(false),C.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={C} className={c("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={_} aria-controls={v} aria-haspopup="listbox" aria-label={m} disabled={d} onClick={()=>_?g(false):D()} onKeyDown={e=>{
          if(!d){
            if(!_){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),D());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),g(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),k(e=>Math.min(e+1,o.length-1));else if("ArrowUp"===e.key)e.preventDefault(),k(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),k(0);else if("End"===e.key)e.preventDefault(),k(o.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),M(f);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),t=S.current;
              t.buffer=a-t.at>700?e.key:t.buffer+e.key,t.at=a;
              let r=o.findIndex(e=>e.label.toLowerCase().startsWith(t.buffer.toLowerCase()));
              r>=0&&k(r)
            }
          }
        }} className={c("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",p)}>
          <span className="flex min-w-0 items-center gap-2">
            {h}
            <span className={c("truncate",!z&&"text-neutral-900/66 dark:text-neutral-100/66")}>{z?z.label:u}</span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {_&&<ul ref={E} id={v} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={c("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",j?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {o.map((e,t)=>{
            let l=e.value===a;
            return (
              <li key={e.value} role="option" aria-selected={l} data-index={t} data-highlighted={t===f?"":undefined} onMouseEnter={()=>k(t)} onClick={()=>M(t)} className={c("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={c("text-[12px]/[16px] font-normal tabular-nums",x,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {l&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let S = ["Business","Coverage","Property","Review"],
  A = [{value:"retail",label:"Retail",base:1200},{value:"hospitality",label:"Hospitality",base:1600},{value:"professional-services",label:"Professional services",base:900},{value:"manufacturing",label:"Manufacturing",base:2100},{value:"construction",label:"Construction",base:2600}],
  z = [{value:"public-liability",label:"Public liability",cost:240},{value:"employers-liability",label:"Employers liability",cost:180},{value:"professional-indemnity",label:"Professional indemnity",cost:320},{value:"product-liability",label:"Product liability",cost:150},{value:"business-interruption",label:"Business interruption",cost:410}],
  D = [{value:"1m",label:"1,000,000",uplift:0},{value:"2m",label:"2,000,000",uplift:180},{value:"5m",label:"5,000,000",uplift:520}],
  M = [{value:"uk",label:"United Kingdom"},{value:"uk-eu",label:"UK and EU"},{value:"worldwide-ex-us",label:"Worldwide excluding US and Canada"},{value:"worldwide",label:"Worldwide"}],
  B = ["January","February","March","April","May","June","July","August","September","October","November","December"],
  I = {businessName:"Copperline Joinery Ltd",industry:"construction",employees:18,coverages:["public-liability","employers-liability","business-interruption"],limit:"2m",address:"14 Wharf Road, Manchester M1 2AB",territory:"uk",startDate:"2026-09-01",contactName:"Rebecca Nolan",email:"rebecca@copperline.co.uk",phone:"+44 161 496 0208"};

function P(e){
  let[a,t]=Math.abs(e).toFixed(2).split("."),r=a.replace(/\B(?=(\d{3})+(?!\d))/g,",");
  return `${e<0?"-":""}\xa3${r}.${t}`;
}

function W({label:e,value:a}){
  return (
    <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center sm:gap-4">
        <dt className="min-w-0 text-[14px]/[16px] font-[450] text-neutral-900/66 dark:text-neutral-100/66">{e}</dt>
        <dd className="flex min-w-0 flex-wrap items-center gap-2 text-[14px]/[20px] text-neutral-900 dark:text-neutral-100 [overflow-wrap:anywhere]">{a}</dd>
      </div>
  );
}

function R({id:e,label:a,children:t}){
  return (
    <div className="flex flex-col gap-2">
        <label htmlFor={e} className={k}>{a}</label>
        {t}
      </div>
  );
}

function L({id:e,label:a,value:t,options:l,onChange:s}){
  return <R id={e} label={a}><E id={e} value={t} onChange={s} options={l} /></R>;
}

function F({id:e,title:a,read:t,edit:l,openId:n,submitted:i,onEdit:d,onCancel:u,onSave:b}){
  let x=n===e,h=null===n&&!i;
  return (
    <div className={N}>
        <div className={c(p,"flex min-h-14 items-center justify-between gap-4 py-3 ps-4 pe-3")}>
          <h3 className={C}>{a}</h3>
          {!x&&<button type="button" onClick={()=>d(e)} disabled={!h} title={h?undefined:"Finish editing the open section first."} className={c(v,_)}>
            <HugeiconsIcon icon={Icon_66654} size={16} strokeWidth={1.8} aria-hidden="true" />
            Edit
          </button>}
        </div>
        {!x&&<dl className="px-4 py-2">{t}</dl>}
        {x&&<div className="space-y-6 p-4">
          {l}
          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={u} className={c(v,_)}>Cancel</button>
            <button type="button" onClick={b} className={c(m,_)}>Save section</button>
          </div>
        </div>}
      </div>
  );
}

function T(){
  let e,a,t,n,o,E,[T,$]=useState(I),[H,U]=useState(null),[q,J]=useState(null),[K,Q]=useState(false),[Y,O]=useState(false),[V,G]=useState(false),X=(e=A.find(e=>e.value===T.industry),a=(e?.base??0)+45*T.employees,n=a+(t=T.coverages.reduce((e,a)=>{
    let t=z.find(e=>e.value===a);
    return e+(t?.cost??0);
  },0)+(D.find(e=>e.value===T.limit)?.uplift??0)),{base:a,adjustments:t,discount:E=(o=T.coverages.length>=3)?Math.round(.075*n*100)/100:0,discountApplies:o,total:n-E}),Z=e=>{
    U({...T,coverages:[...T.coverages]}),J(e)
  },ee=()=>{
    H&&$(H),J(null),U(null)
  },ea=()=>{
    J(null),U(null)
  },et=(e,a)=>U(t=>t?{...t,[e]:a}:t),er=A.find(e=>e.value===T.industry)?.label??"Not set",el=D.find(e=>e.value===T.limit)?.label??"",es=M.find(e=>e.value===T.territory)?.label??"Not set",en=T.coverages.map(e=>z.find(a=>a.value===e)?.label).filter(Boolean).join(", ")||"None selected",ei=K&&Y&&null===q;
  return (
    <div className={c("bg-white dark:bg-neutral-950",u,"flex h-full min-h-[880px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
        <div className="mx-auto w-full max-w-[1100px]">
          {V?<div className={c(N,"mx-auto max-w-[560px]")}>
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center">
                <HugeiconsIcon icon={Icon_20484} size={24} strokeWidth={1.8} aria-hidden="true" className={b} />
              </div>
              <h2 className="text-[20px]/[24px] font-[450] tracking-[-0.015em]">Quote submitted for binding</h2>
              <p className={c(h,b,"mt-1.5 max-w-sm")}>
                {"Your reference is "}
                <span className="rounded-[var(--rb-r-xs,4px)] bg-neutral-900/5 px-1 py-px font-mono text-[0.9em] leading-none text-neutral-900 dark:text-neutral-100 [box-decoration-break:clone] dark:bg-neutral-100/5">BQ-4471-CL</span>
                . An underwriter will confirm cover for
                {" "}
                <span className={c(u,"tabular-nums")}>{P(X.total)}</span>
                {" "}
                per year within one business day.
              </p>
              <button type="button" onClick={()=>G(false)} className={c(v,_,"mt-5")}>Back to review</button>
            </div>
          </div>:<>
            <ol className="mb-6 flex items-center gap-3">
              {S.map((e,a)=>{
                let t=a<S.length-1,l=a===S.length-1;
                return (
                  <li key={e} className={c("flex min-w-0 items-center gap-3",a<S.length-1&&"flex-1")}>
                                <div className="flex min-w-0 items-center gap-2">
                                  <span aria-hidden="true" className={c("grid size-6 shrink-0 place-items-center rounded-[var(--rb-r-sm,6px)] border text-[12px]/[16px] font-[450] tabular-nums",t?"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/80 dark:text-neutral-100/80 dark:border-neutral-100/14":l?"border-neutral-900 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 dark:border-neutral-100":"border-neutral-900/12 bg-white dark:bg-neutral-900 text-neutral-900/66 dark:text-neutral-100/66 dark:border-neutral-100/14")}>
                                    {t?<HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={1.8} aria-hidden="true" />:a+1}
                                  </span>
                                  <span aria-current={l?"step":undefined} className={c(h,l?u:x,"hidden truncate sm:block")}>{e}</span>
                                </div>
                                {a<S.length-1&&<span aria-hidden="true" className="h-px min-w-4 flex-1 bg-neutral-900 dark:bg-neutral-100" />}
                              </li>
                );
              })}
            </ol>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <F openId={q} submitted={V} onEdit={Z} onCancel={ea} onSave={ee} id="business" title="Business details" read={<>
                  <W label="Legal name" value={T.businessName} />
                  <W label="Industry" value={er} />
                  <W label="Employees" value={<span className="tabular-nums">{T.employees}</span>} />
                </>} edit={H&&<div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <R id="ins-name" label="Legal business name">
                      <div className={c(g,"h-8")}>
                        <input id="ins-name" value={H.businessName} onChange={e=>et("businessName",e.target.value)} className={f} />
                      </div>
                    </R>
                  </div>
                  <L id="ins-industry" label="Industry" value={H.industry} options={A} onChange={e=>et("industry",e)} />
                  <R id="ins-employees" label="Number of employees">
                    <div className={c(g,"h-8")}>
                      <input id="ins-employees" type="number" min={1} value={H.employees} onChange={e=>et("employees",Math.max(0,Number(e.target.value)||0))} className={c(f,"tabular-nums")} />
                    </div>
                  </R>
                </div>} />
                <F openId={q} submitted={V} onEdit={Z} onCancel={ea} onSave={ee} id="coverage" title="Coverage" read={<>
                  <W label="Covers" value={en} />
                  <W label="Aggregate limit" value={<span className="tabular-nums">
                    £
                    {el}
                  </span>} />
                </>} edit={H&&<div className="space-y-6">
                  <fieldset className="space-y-2">
                    <legend className={k}>Covers to include</legend>
                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-x-8">
                      {z.map(e=>(
                        <label key={e.value} className={c(h,"flex cursor-pointer items-center justify-between gap-3 py-2")}>
                                            <span className="flex items-center gap-2">
                                              <span className={j}>
                                                <input type="checkbox" checked={H.coverages.includes(e.value)} onChange={()=>{
                                                  let a;
                                                  return a=e.value,U(e=>e?{...e,coverages:e.coverages.includes(a)?e.coverages.filter(e=>e!==a):[...e.coverages,a]}:e);
                                                }} className={w} />
                                                <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={y} />
                                              </span>
                                              {e.label}
                                            </span>
                                            <span className="shrink-0 text-[13px]/[18px] tabular-nums text-neutral-900/66 dark:text-neutral-100/66">{P(e.cost)}</span>
                                          </label>
                      ))}
                    </div>
                  </fieldset>
                  <L id="ins-limit" label="Aggregate limit" value={H.limit} options={D.map(e=>({value:e.value,label:`\xa3${e.label}`}))} onChange={e=>et("limit",e)} />
                </div>} />
                <F openId={q} submitted={V} onEdit={Z} onCancel={ea} onSave={ee} id="property" title="Property and location" read={<>
                  <W label="Primary address" value={T.address} />
                  <W label="Territory" value={es} />
                  <W label="Cover start date" value={<span className="tabular-nums">
                    {function(e){
                      let[a,t,r]=e.split("-").map(Number);
                      return a&&t&&r?`${r} ${B[t-1]} ${a}`:"Not set";
                    }(T.startDate)}
                  </span>} />
                </>} edit={H&&<div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <R id="ins-address" label="Primary address">
                      <div className={c(g,"h-8")}>
                        <input id="ins-address" value={H.address} onChange={e=>et("address",e.target.value)} className={f} />
                      </div>
                    </R>
                  </div>
                  <L id="ins-territory" label="Territory" value={H.territory} options={M} onChange={e=>et("territory",e)} />
                  <R id="ins-start" label="Cover start date">
                    <div className={c(g,"h-8")}>
                      <input id="ins-start" type="date" value={H.startDate} onChange={e=>et("startDate",e.target.value)} className={c(f,"tabular-nums")} />
                    </div>
                  </R>
                </div>} />
                <F openId={q} submitted={V} onEdit={Z} onCancel={ea} onSave={ee} id="contact" title="Contact" read={<>
                  <W label="Named contact" value={T.contactName} />
                  <W label="Email" value={T.email} />
                  <W label="Phone" value={T.phone} />
                </>} edit={H&&<div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <R id="ins-contact" label="Named contact">
                      <div className={c(g,"h-8")}>
                        <input id="ins-contact" value={H.contactName} onChange={e=>et("contactName",e.target.value)} className={f} />
                      </div>
                    </R>
                  </div>
                  <R id="ins-email" label="Email">
                    <div className={c(g,"h-8")}>
                      <input id="ins-email" type="email" value={H.email} onChange={e=>et("email",e.target.value)} className={f} />
                    </div>
                  </R>
                  <R id="ins-phone" label="Phone">
                    <div className={c(g,"h-8")}>
                      <input id="ins-phone" type="tel" value={H.phone} onChange={e=>et("phone",e.target.value)} className={f} />
                    </div>
                  </R>
                </div>} />
              </div>
              <div className="lg:sticky lg:top-6 lg:self-start">
                <div className={N}>
                  <div className={c(p,"px-4 py-3")}>
                    <h3 className={C}>Premium</h3>
                    <p className={c("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-0.5")}>Recalculated from your selections.</p>
                  </div>
                  <div className="space-y-2.5 px-4 py-4">
                    <div className={c(h,"flex items-center justify-between gap-4")}>
                      <span className={x}>Base premium</span>
                      <span className="tabular-nums">{P(X.base)}</span>
                    </div>
                    <div className={c(h,"flex items-center justify-between gap-4")}>
                      <span className={x}>Coverage adjustments</span>
                      <span className="tabular-nums">{P(X.adjustments)}</span>
                    </div>
                    <div className={c(h,"flex items-center justify-between gap-4")}>
                      <span className={x}>{X.discountApplies?"Multi-cover discount (7.5%)":"Multi-cover discount"}</span>
                      <span className="tabular-nums">{X.discountApplies?P(-X.discount):"Not applied"}</span>
                    </div>
                    <div className={c("bg-neutral-900/5 dark:bg-neutral-100/5","rounded-[var(--rb-r-sm,6px)]","mt-1 flex items-center justify-between gap-4 px-3 py-2.5")}>
                      <span className="text-[14px]/[16px] font-[450]">Annual total</span>
                      <span className={c("text-[16px]/[20px] font-[450] tracking-[-0.015em]","tabular-nums")}>{P(X.total)}</span>
                    </div>
                    {!X.discountApplies&&<p className={c(h,b)}>
                      {"Add "}
                      3
                      {" or more covers to qualify for the multi-cover discount."}
                    </p>}
                  </div>
                </div>
                <div className="mt-4 space-y-2.5">
                  <label className="flex cursor-pointer items-start gap-2">
                    <span className={c(j,"mt-px")}>
                      <input type="checkbox" checked={K} onChange={e=>Q(e.target.checked)} className={w} />
                      <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={y} />
                    </span>
                    <span className={h}>I confirm the information above is accurate to the best of my knowledge.</span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-2">
                    <span className={c(j,"mt-px")}>
                      <input type="checkbox" checked={Y} onChange={e=>O(e.target.checked)} className={w} />
                      <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={y} />
                    </span>
                    <span className={h}>I accept the policy terms and the statement of fact.</span>
                  </label>
                </div>
                <button type="button" onClick={()=>ei&&G(true)} disabled={!ei} title={null!==q?"Save or cancel the open section first.":ei?undefined:"Confirm both statements to continue."} className={c(m,_,"mt-4 w-full")}>Request bound quote</button>
              </div>
            </div>
          </>}
        </div>
      </div>
  );
}


export default T;
