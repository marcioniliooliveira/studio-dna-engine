/**
 * React Bits Pro — Application UI (forms-4)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useId, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_82477 = [["path",{d:"M3 4.5V20.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M7.5 4.5V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 4.5V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M16.5 4.5V16.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}],["path",{d:"M21 4.5V20.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"4"}],["path",{d:"M7.625 20.25H7.5M7.75 20.25C7.75 20.3881 7.63807 20.5 7.5 20.5C7.36193 20.5 7.25 20.3881 7.25 20.25C7.25 20.1119 7.36193 20 7.5 20C7.63807 20 7.75 20.1119 7.75 20.25Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"5"}],["path",{d:"M12.125 20.25H12M12.25 20.25C12.25 20.3881 12.1381 20.5 12 20.5C11.8619 20.5 11.75 20.3881 11.75 20.25C11.75 20.1119 11.8619 20 12 20C12.1381 20 12.25 20.1119 12.25 20.25Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"6"}],["path",{d:"M16.625 20.25H16.5M16.75 20.25C16.75 20.3881 16.6381 20.5 16.5 20.5C16.3619 20.5 16.25 20.3881 16.25 20.25C16.25 20.1119 16.3619 20 16.5 20C16.6381 20 16.75 20.1119 16.75 20.25Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"7"}]];
const Icon_69554 = [["path",{d:"M20.3584 13.3567C19.1689 14.546 16.9308 14.4998 13.4992 14.4998C11.2914 14.4998 9.50138 12.7071 9.50024 10.4993C9.50024 7.07001 9.454 4.83065 10.6435 3.64138C11.8329 2.45212 12.3583 2.50027 17.6274 2.50027C18.1366 2.49809 18.3929 3.11389 18.0329 3.47394L15.3199 6.18714C14.6313 6.87582 14.6294 7.99233 15.3181 8.68092C16.0068 9.36952 17.1234 9.36959 17.8122 8.68109L20.5259 5.96855C20.886 5.60859 21.5019 5.86483 21.4997 6.37395C21.4997 11.6422 21.5479 12.1675 20.3584 13.3567Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M13.5 14.5L7.32842 20.6716C6.22386 21.7761 4.433 21.7761 3.32843 20.6716C2.22386 19.567 2.22386 17.7761 3.32843 16.6716L9.5 10.5",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M5.50896 18.5H5.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",key:"2"}]];
const Icon_75699 = [["path",{d:"M4 22H20",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M17 9H14M18 13H14M18 17H14",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M6 22V3.2C6 2.42385 6.47098 2 7.2 2C8.87221 2 9.70832 2 10.4079 2.1108C14.2589 2.72075 17.2793 5.74106 17.8892 9.59209C18 10.2917 18 11.1278 18 12.8V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_87924 = [["path",{d:"M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z",stroke:"currentColor",strokeWidth:"1.5",key:"1"}]];
const Icon_16568 = [["path",{d:"M13.5 13L17 9M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M6 12C6 8.68629 8.68629 6 12 6C13.0929 6 14.1175 6.29218 15 6.80269",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M2.50006 12.0001C2.50006 7.52172 2.50006 5.28255 3.8913 3.8913C5.28255 2.50006 7.52172 2.50006 12.0001 2.50006C16.4784 2.50006 18.7176 2.50006 20.1088 3.8913C21.5001 5.28255 21.5001 7.52172 21.5001 12.0001C21.5001 16.4784 21.5001 18.7176 20.1088 20.1088C18.7176 21.5001 16.4784 21.5001 12.0001 21.5001C7.52172 21.5001 5.28255 21.5001 3.8913 20.1088C2.50006 18.7176 2.50006 16.4784 2.50006 12.0001Z",stroke:"currentColor",strokeWidth:"1.5",key:"2"}]];
const Icon_34951 = [["path",{d:"M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"12",cy:"6.99988",r:"4",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_20484 = [["path",{d:"M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 11.5C9 11.5 10.4079 11.7519 11 13.5C11 13.5 12.5 10.5 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_89886 = [["path",{d:"M12.001 5.00003V19.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M19.002 12.002L4.99998 12.002",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_83605 = [["path",{d:"M16 2V6M8 2V6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M3 10H21",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M10 18.5002L9.99999 13.8474C9.99999 13.6557 9.86325 13.5002 9.69458 13.5002H9M14 18.4983L15.4855 13.8923C15.4951 13.8626 15.5 13.8315 15.5 13.8002C15.5 13.6346 15.3657 13.5002 15.2 13.5002L13 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_89289 = [["path",{d:"M18 6L6.00081 17.9992M17.9992 18L6 6.00085",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_66654 = [["path",{d:"M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11 20H17",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"1"}]];

let g = (...e)=>e.filter(Boolean).join(" "),
  _ = "text-neutral-900 dark:text-neutral-100",
  w = "text-neutral-900/80 dark:text-neutral-100/80",
  y = "text-neutral-900/66 dark:text-neutral-100/66",
  j = "text-[14px]/[20px] font-normal",
  N = "text-[14px]/[16px] font-[450]",
  S = "relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-transparent text-neutral-900 hover:not-disabled:bg-neutral-900/5 active:bg-neutral-900/8 aria-pressed:bg-neutral-900/9 disabled:text-neutral-900/40 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-100/5 dark:active:bg-neutral-100/8 dark:aria-pressed:bg-neutral-100/9 dark:disabled:text-neutral-100/40",
  z = "size-8 rounded-[var(--rb-r-sm,6px)]",
  E = "inline-flex h-5 min-w-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--rb-r-xs,4px)] px-1.5 text-[12px]/[16px] font-[450] tabular-nums",
  A = "bg-neutral-900/9 dark:bg-neutral-100/9 text-neutral-900 dark:text-neutral-100";

function C({id:e,value:a,defaultValue:r,onChange:o,options:d,disabled:c,placeholder:u="Select…",className:b,triggerClassName:p,leading:x,ariaLabel:h}){
  let m=useId(),[v,f]=useState(false),[k,_]=useState(0),[w,j]=useState(false),[N,S]=useState(),[z,E]=useState(r??""),A=useRef(null),C=useRef(null),M=useRef({buffer:"",at:0}),D=a??z,H=d.findIndex(e=>e.value===D),W=H>=0?d[H]:undefined,T=()=>{
    if(c)return;
    let e=A.current,a=e?.ownerDocument.defaultView;
    if(e&&a){
      let r=e.getBoundingClientRect(),t=0,n=a.innerHeight;
      for(let r=e.parentElement;r;r=r.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(r).overflowY)){
        let e=r.getBoundingClientRect();
        t=Math.max(t,e.top),n=Math.min(n,e.bottom);
        break
      }
      let l=n-r.bottom,i=r.top-t,s=Math.min(32*d.length+8,264),o=l<s+8&&i>l,c=(o?i:l)-8;
      j(o),S(c<s?Math.max(c,40):undefined)
    }
    _(H>=0?H:0),f(true)
  };
  useEffect(()=>{
    if(!v)return;
    let e=A.current;
    if(!e)return;
    let a=e.ownerDocument,r=a=>{
      e.contains(a.target)||f(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [v]),useEffect(()=>{
    if(!v)return;
    let e=C.current,a=e?.querySelector(`[data-index="${k}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [v,k]);
  let R=e=>{
    let r=d[e];
    r&&(undefined===a&&E(r.value),o?.(r.value),f(false),A.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={A} className={g("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={v} aria-controls={m} aria-haspopup="listbox" aria-label={h} disabled={c} onClick={()=>v?f(false):T()} onKeyDown={e=>{
          if(!c){
            if(!v){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),T());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),f(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),_(e=>Math.min(e+1,d.length-1));else if("ArrowUp"===e.key)e.preventDefault(),_(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),_(0);else if("End"===e.key)e.preventDefault(),_(d.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),R(k);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=M.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=d.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&_(t)
            }
          }
        }} className={g("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",p)}>
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {x}
            <span className="grid min-w-0 flex-1 text-left">
              {d.map(e=><span key={e.value} aria-hidden="true" className="invisible col-start-1 row-start-1 truncate">{e.label}</span>)}
              <span className={g("col-start-1 row-start-1 truncate",!W&&"text-neutral-900/66 dark:text-neutral-100/66")}>{W?W.label:u}</span>
            </span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {v&&<ul ref={C} id={m} role="listbox" tabIndex={-1} style={{maxHeight:N}} className={g("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",w?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {d.map((e,a)=>{
            let r=e.value===D;
            return (
              <li key={e.value} role="option" aria-selected={r} data-index={a} data-highlighted={a===k?"":undefined} onMouseEnter={()=>_(a)} onClick={()=>R(a)} className={g("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={g("text-[12px]/[16px] font-normal tabular-nums",y,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {r&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let M = [{id:"asset-tag",kind:"text",label:"Asset tag",icon:Icon_82477,value:"EQ-20841"},{id:"model",kind:"text",label:"Model",icon:Icon_69554,value:"Atlas HG-40 compressor"},{id:"site",kind:"select",label:"Site",icon:Icon_75699,value:"riverside",options:[{value:"riverside",label:"Riverside plant"},{value:"eastdock",label:"East dock depot"},{value:"northgate",label:"Northgate yard"}]},{id:"location",kind:"text",label:"Bay location",icon:Icon_87924,value:"Bay C, rack 14"},{id:"condition",kind:"select",label:"Condition",icon:Icon_16568,value:"serviceable",options:[{value:"excellent",label:"Excellent"},{value:"serviceable",label:"Serviceable"},{value:"needs-repair",label:"Needs repair"},{value:"out-of-service",label:"Out of service"}]},{id:"custodian",kind:"text",label:"Custodian",icon:Icon_34951,value:"Priya Nandakumar"},{id:"warranty",kind:"date",label:"Warranty ends",icon:Icon_20484,value:"2026-05-30"},{id:"last-service",kind:"date",label:"Last serviced",icon:Icon_29635,value:"2026-06-18"},{id:"interval",kind:"select",label:"Service interval",icon:Icon_16568,value:"90",options:[{value:"30",label:"Every 30 days"},{value:"90",label:"Every 90 days"},{value:"180",label:"Every 180 days"},{value:"365",label:"Every 365 days"}]}];

function D(e){
  if(!e)return "Not set";
  let[a,r,t]=e.split("-").map(e=>Number.parseInt(e,10));
  return `${t} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r-1]} ${a}`;
}

function H(){
  let[e,a]=useState(M),[r,i]=useState(true),[o,d]=useState(null),[c,u]=useState(""),p=useRef(null),x=useRef({});
  useEffect(()=>{
    o&&p.current&&p.current.focus({preventScroll:true})
  }, [o]);
  let h=e=>{
    d(e.id),u(e.value)
  },H=e=>{
    requestAnimationFrame(()=>x.current[e]?.focus({preventScroll:true}))
  },W=e=>{
    a(a=>a.map(a=>a.id===e?{...a,value:c}:a)),d(null),H(e)
  },T=e=>{
    d(null),H(e)
  },R=a=>e.find(e=>e.id===a),$=R("warranty"),L=R("last-service"),I=R("interval"),B=$.value>="2026-08-07",O=function(e,a){
    let[r,t,n]=e.split("-").map(e=>Number.parseInt(e,10));
    return new Date(Date.UTC(r,t-1,n)+864e5*a).toISOString().slice(0,10);
  }(L.value,Number.parseInt(I.value,10));
  return (
    <div className={g("bg-white dark:bg-neutral-950",_,"flex h-full min-h-[720px] w-full flex-col justify-center-safe overflow-y-auto p-8 sm:p-10")}>
        <div className="mx-auto w-full max-w-[760px]">
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
            <div className={g("border-b border-neutral-900/8 dark:border-neutral-100/8","flex flex-col items-start gap-3 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4 sm:pe-3")}>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className={g("text-[16px]/[20px] font-[450] tracking-[-0.015em]",_)}>Equipment record</h2>
                  <span className={g(E,A)}>Fixed asset</span>
                  <span className={g(E,A)}>Maintenance</span>
                  <span className={g(E,B?A:"border border-[oklch(60%_0.236_26)] dark:border-[oklch(65.2%_0.219_26)] bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100")}>{B?"In warranty":"Warranty expired"}</span>
                </div>
                <p className={g("text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80","mt-1")}>Click a row to edit it. Each change saves on its own, there is no save bar.</p>
              </div>
              <button type="button" className={g("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]")}>
                <HugeiconsIcon icon={Icon_89886} size={16} strokeWidth={1.8} aria-hidden="true" />
                Add note
              </button>
            </div>
            <div className={g("divide-y divide-neutral-900/8 dark:divide-neutral-100/8","flex flex-col p-2")}>
              {e.map(e=>{
                let a=o===e.id;
                return (
                  <div key={e.id}>
                                <div ref={a=>{
                                  x.current[e.id]=a
                                }} role={a?undefined:"button"} tabIndex={a?undefined:0} aria-label={a?undefined:`Edit ${e.label}`} onClick={()=>{
                                  a||null!==o||h(e)
                                }} onKeyDown={r=>{
                                  a||("Enter"===r.key||" "===r.key)&&(r.preventDefault(),null===o&&h(e))
                                }} className={g("transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","rounded-[var(--rb-r-sm,6px)]","grid grid-cols-1 items-center gap-2 px-2 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] sm:gap-4",a?"pt-2.5 pb-1 sm:py-1":"py-2.5",!a&&g("hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","active:bg-neutral-900/8 dark:active:bg-neutral-100/8","focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]"),!a&&"cursor-pointer",null!==o&&!a&&"opacity-60")}>
                                  <span className={g(N,w,"flex items-center gap-2")}>
                                    <HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" className={g(y,"shrink-0")} />
                                    {e.label}
                                  </span>
                                  {a?<div className="flex items-center gap-2">
                                    {"select"===e.kind?<C value={c} onChange={e=>u(e)} options={e.options} className="min-w-0 flex-1" />:<div className={g("relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5","h-8","flex-1")}>
                                      <input ref={e=>{
                                        p.current=e
                                      }} type={"date"===e.kind?"date":"text"} value={c} onChange={e=>u(e.target.value)} onKeyDown={a=>{
                                        "Enter"===a.key&&W(e.id),"Escape"===a.key&&T(e.id)
                                      }} aria-label={e.label} className={g("h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]","date"===e.kind&&"[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0","date"===e.kind&&"tabular-nums")} />
                                      {"date"===e.kind&&<span data-affix className="flex shrink-0 items-center gap-2 text-[14px]/[16px] text-neutral-900/66 dark:text-neutral-100/66 select-none first:ps-3 last:pe-3 has-[button]:first:ps-1 has-[button]:last:pe-1">
                                        <HugeiconsIcon icon={Icon_83605} size={16} strokeWidth={1.8} aria-hidden="true" />
                                      </span>}
                                    </div>}
                                    <button type="button" onClick={()=>W(e.id)} title="Save change" className={g(S,z)}>
                                      <HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" />
                                      <span className="sr-only">
                                        {"Save "}
                                        {e.label}
                                      </span>
                                    </button>
                                    <button type="button" onClick={()=>T(e.id)} title="Discard change" className={g(S,z)}>
                                      <HugeiconsIcon icon={Icon_89289} size={16} strokeWidth={1.8} aria-hidden="true" />
                                      <span className="sr-only">Cancel</span>
                                    </button>
                                  </div>:<span className={g(j,_,"flex items-center gap-2")}>
                                    <span className={g(("date"===e.kind||"asset-tag"===e.id)&&"tabular-nums")}>
                                      {"select"===e.kind?e.options.find(a=>a.value===e.value)?.label??e.value:"date"===e.kind?D(e.value):e.value}
                                    </span>
                                    <HugeiconsIcon icon={Icon_66654} size={14} strokeWidth={1.8} aria-hidden="true" className={g(y,"ml-auto shrink-0")} />
                                  </span>}
                                </div>
                              </div>
                );
              })}
              <div className="grid grid-cols-1 items-center gap-2 px-2 py-2.5 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] sm:gap-4">
                <span className={g(N,w,"flex items-center gap-2")}>
                  <HugeiconsIcon icon={Icon_16568} size={16} strokeWidth={1.8} aria-hidden="true" className={g(y,"shrink-0")} />
                  Condition tracking
                </span>
                <div className="flex items-center justify-between gap-3">
                  <span className={g(j,_)}>{r?"Sensor telemetry on":"Manual checks only"}</span>
                  <button type="button" role="switch" aria-checked={r} aria-label="Condition tracking" onClick={()=>i(e=>!e)} className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-white p-0.5 inset-ring inset-ring-neutral-900/50 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:aria-[checked=false]:not-disabled:inset-ring-neutral-900 active:aria-[checked=false]:bg-neutral-900/8 aria-checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-checked:inset-ring-transparent disabled:cursor-not-allowed disabled:inset-ring-neutral-900/40 disabled:shadow-none disabled:aria-checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:bg-neutral-900 dark:inset-ring-neutral-100/50 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:aria-[checked=false]:not-disabled:inset-ring-neutral-100 dark:active:aria-[checked=false]:bg-neutral-100/8 dark:aria-checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:disabled:inset-ring-neutral-100/40 dark:disabled:aria-checked:bg-neutral-100/40">
                    <span className="pointer-events-none block size-4 rounded-full bg-neutral-900/80 transition-[translate,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-aria-checked:translate-x-4 group-aria-checked:bg-[var(--rb-accent-fg,oklch(100%_0_0))] group-disabled:bg-neutral-900/40 dark:bg-neutral-100/80 dark:group-aria-checked:bg-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:group-disabled:bg-neutral-100/40" />
                  </button>
                </div>
              </div>
            </div>
            <div className={g("bg-neutral-900/5 dark:bg-neutral-100/5","grid grid-cols-1 items-center gap-2 px-4 py-2.5 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] sm:gap-4")}>
              <span className={g(N,w,"flex items-center gap-2")}>
                <HugeiconsIcon icon={Icon_83605} size={16} strokeWidth={1.8} aria-hidden="true" className={g(y,"shrink-0")} />
                Next service due
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className={g(j,_,"tabular-nums")}>{D(O)}</span>
                <span className={g(E,A)}>Calculated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default H;
