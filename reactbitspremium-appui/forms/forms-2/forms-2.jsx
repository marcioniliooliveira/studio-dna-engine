/**
 * React Bits Pro — Application UI (forms-2)
 * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.
 */

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

const Icon_31517 = [["path",{d:"M18 14C18 14 13.5811 19 12 19C10.4188 19 6 14 6 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M18 9.99996C18 9.99996 13.5811 5.00001 12 5C10.4188 4.99999 6 10 6 10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_90987 = [["path",{d:"M5 14L8.5 17.5L19 6.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_61020 = [["path",{d:"M12 18V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M10 18L5 22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M14 18L19 22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M2.5 12C2.5 14.8284 2.5 16.2426 3.37868 17.1213C4.25736 18 5.67157 18 8.5 18H15.5C18.3284 18 19.7426 18 20.6213 17.1213C21.5 16.2426 21.5 14.8284 21.5 12V8C21.5 5.17157 21.5 3.75736 20.6213 2.87868C19.7426 2 18.3284 2 15.5 2H8.5C5.67157 2 4.25736 2 3.37868 2.87868C2.5 3.75736 2.5 5.17157 2.5 8V12Z",stroke:"currentColor",strokeWidth:"1.5",key:"3"}],["path",{d:"M8 13V10M12 13V7M16 13V11",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"4"}]];
const Icon_88366 = [["path",{d:"M16.5 20V16.9852C16.5 16.364 16.2184 15.7658 15.6838 15.4494C14.1574 14.546 12.1714 14 10 14C7.82863 14 5.84261 14.546 4.31618 15.4494C3.78162 15.7658 3.5 16.364 3.5 16.9852V20",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["circle",{cx:"10",cy:"7.5",r:"3.5",stroke:"currentColor",strokeWidth:"1.5",key:"1"}],["path",{d:"M20.5 20.001V16.9862C20.5 16.365 20.2184 15.7667 19.6838 15.4504C19.171 15.1468 18.6062 14.8837 18 14.668",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}],["path",{d:"M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547",stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",key:"3"}]];
const Icon_68686 = [["path",{d:"M7 6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5V11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5V6.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.5 19H11.0828C7.57267 19 4.57706 16.4623 4 13M11.5 19H11.9172C15.4273 19 18.4229 16.4623 19 13M11.5 19V22",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_27476 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]];
const Icon_94089 = [["path",{d:"M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M8 12.5L10.5 15L16 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_94936 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}]];
const Icon_29635 = [["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M12 8V12L14 14",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];
const Icon_55410 = [["path",{d:"M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M11.4999 12.5L14.9999 9",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]];

let m = (...e)=>e.filter(Boolean).join(" "),
  _ = "bg-white dark:bg-neutral-950",
  f = "rounded-[var(--rb-r-sm,6px)]",
  k = "text-neutral-900 dark:text-neutral-100",
  v = "text-neutral-900/80 dark:text-neutral-100/80",
  g = "text-neutral-900/66 dark:text-neutral-100/66",
  w = "divide-y divide-neutral-900/8 dark:divide-neutral-100/8",
  j = "text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]",
  N = "text-[13px]/[18px] font-normal",
  y = "text-[14px]/[16px] font-[450]",
  S = "text-[12px]/[16px] font-normal tabular-nums",
  C = "h-8 gap-2 rounded-[var(--rb-r-sm,6px)] px-4 text-[14px]/[16px] font-[450]",
  z = "relative flex w-full min-w-0 cursor-text items-center rounded-[var(--rb-r-sm,6px)] data-concentric:rounded-[var(--rb-r-lg,10px)] border border-neutral-900/12 bg-white text-[14px]/[16px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-900/32 focus-within:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-within:ring-3 focus-within:ring-neutral-900/8 has-[[aria-invalid=true]]:border-[oklch(60%_0.236_26)] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-neutral-900/8 has-[input:disabled]:text-neutral-900/40 has-[input:disabled]:shadow-none has-[input[readonly]]:cursor-default has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-neutral-900/5 has-[input[readonly]]:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-focus-within:not-has-[[aria-invalid=true]]:not-has-[input:disabled]:border-neutral-100/32 dark:focus-within:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-within:ring-neutral-100/8 dark:has-[[aria-invalid=true]]:border-[oklch(65.2%_0.219_26)] dark:has-[input:disabled]:border-neutral-100/8 dark:has-[input:disabled]:text-neutral-100/40 dark:has-[input[readonly]]:bg-neutral-100/5",
  A = "h-full w-full min-w-0 flex-1 bg-transparent px-3 outline-none [[data-affix]+&]:ps-2 [&:has(+[data-affix])]:pe-2 placeholder:text-neutral-900/66 disabled:cursor-not-allowed disabled:placeholder:text-neutral-900/40 dark:placeholder:text-neutral-100/66 dark:disabled:placeholder:text-neutral-100/40 dark:[color-scheme:dark]",
  E = "relative inline-flex size-4 shrink-0 items-center justify-center",
  D = "peer size-4 shrink-0 cursor-pointer appearance-none rounded-[var(--rb-r-xs,4px)] border border-neutral-900/50 bg-white shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] transition-[background-color,border-color,box-shadow,outline-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-checked:not-disabled:border-neutral-900 active:not-checked:bg-neutral-900/8 checked:border-transparent checked:bg-[var(--rb-accent,oklch(20.5%_0_0))] indeterminate:border-transparent indeterminate:bg-[var(--rb-accent,oklch(20.5%_0_0))] aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/40 disabled:shadow-none disabled:checked:bg-neutral-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] dark:border-neutral-100/50 dark:bg-neutral-900 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-checked:not-disabled:border-neutral-100 dark:active:not-checked:bg-neutral-100/8 dark:checked:bg-[var(--rb-accent,oklch(100%_0_0))] dark:indeterminate:bg-[var(--rb-accent,oklch(100%_0_0))] dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/40 dark:disabled:checked:bg-neutral-100/40",
  W = "pointer-events-none absolute text-[var(--rb-accent-fg,oklch(100%_0_0))] opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-100 dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))]",
  F = "relative flex min-w-0 flex-col overflow-hidden rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
  M = "min-w-0 truncate text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100",
  T = "text-[13px]/[18px] text-neutral-900/80 dark:text-neutral-100/80";

function L({id:e,value:a,defaultValue:r,onChange:o,options:d,disabled:c,placeholder:u="Select…",className:b,triggerClassName:x,leading:h,ariaLabel:p}){
  let _=useId(),[f,k]=useState(false),[v,w]=useState(0),[j,N]=useState(false),[y,C]=useState(),[z,A]=useState(r??""),E=useRef(null),D=useRef(null),W=useRef({buffer:"",at:0}),F=a??z,M=d.findIndex(e=>e.value===F),T=M>=0?d[M]:undefined,L=()=>{
    if(c)return;
    let e=E.current,a=e?.ownerDocument.defaultView;
    if(e&&a){
      let r=e.getBoundingClientRect(),t=0,l=a.innerHeight;
      for(let r=e.parentElement;r;r=r.parentElement)if(/auto|scroll|hidden|clip/.test(a.getComputedStyle(r).overflowY)){
        let e=r.getBoundingClientRect();
        t=Math.max(t,e.top),l=Math.min(l,e.bottom);
        break
      }
      let n=l-r.bottom,s=r.top-t,i=Math.min(32*d.length+8,264),o=n<i+8&&s>n,c=(o?s:n)-8;
      N(o),C(c<i?Math.max(c,40):undefined)
    }
    w(M>=0?M:0),k(true)
  };
  useEffect(()=>{
    if(!f)return;
    let e=E.current;
    if(!e)return;
    let a=e.ownerDocument,r=a=>{
      e.contains(a.target)||k(false)
    };
    return a.addEventListener("mousedown",r),a.addEventListener("touchstart",r),()=>{
      a.removeEventListener("mousedown",r),a.removeEventListener("touchstart",r)
    };
  }, [f]),useEffect(()=>{
    if(!f)return;
    let e=D.current,a=e?.querySelector(`[data-index="${v}"]`);
    if(!e||!a)return;
    let r=a.offsetTop,t=r+a.offsetHeight;
    r<e.scrollTop?e.scrollTop=r:t>e.scrollTop+e.clientHeight&&(e.scrollTop=t-e.clientHeight)
  }, [f,v]);
  let I=e=>{
    let r=d[e];
    r&&(undefined===a&&A(r.value),o?.(r.value),k(false),E.current?.querySelector("button")?.focus({preventScroll:true}))
  };
  return (
    <div ref={E} className={m("relative",b)}>
        <button id={e} type="button" role="combobox" aria-expanded={f} aria-controls={_} aria-haspopup="listbox" aria-label={p} disabled={c} onClick={()=>f?k(false):L()} onKeyDown={e=>{
          if(!c){
            if(!f){
              ["Enter"," ","ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),L());
              return
            }
            if("Escape"===e.key||"Tab"===e.key){
              "Escape"===e.key&&e.stopPropagation(),k(false);
              return
            }
            if("ArrowDown"===e.key)e.preventDefault(),w(e=>Math.min(e+1,d.length-1));else if("ArrowUp"===e.key)e.preventDefault(),w(e=>Math.max(e-1,0));else if("Home"===e.key)e.preventDefault(),w(0);else if("End"===e.key)e.preventDefault(),w(d.length-1);else if("Enter"===e.key||" "===e.key)e.preventDefault(),I(v);else if(1===e.key.length&&/\S/.test(e.key)){
              let a=Date.now(),r=W.current;
              r.buffer=a-r.at>700?e.key:r.buffer+e.key,r.at=a;
              let t=d.findIndex(e=>e.label.toLowerCase().startsWith(r.buffer.toLowerCase()));
              t>=0&&w(t)
            }
          }
        }} className={m("inline-flex h-8 w-fit min-w-40 cursor-pointer items-center justify-between gap-2 rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 text-left text-[14px]/[16px] font-[450] whitespace-nowrap text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none select-none transition-[border-color,box-shadow] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] hover:not-disabled:not-aria-invalid:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-expanded:border-[var(--rb-accent,oklch(20.5%_0_0))] aria-expanded:ring-3 aria-expanded:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:not-aria-invalid:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-expanded:border-[var(--rb-accent,oklch(100%_0_0))] dark:aria-expanded:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40","w-full min-w-[100%]",x)}>
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {h}
            <span className="grid min-w-0 flex-1 text-left">
              {d.map(e=><span key={e.value} aria-hidden="true" className="invisible col-start-1 row-start-1 truncate">{e.label}</span>)}
              <span className={m("col-start-1 row-start-1 truncate",!T&&"text-neutral-900/66 dark:text-neutral-100/66")}>{T?T.label:u}</span>
            </span>
          </span>
          <HugeiconsIcon icon={Icon_31517} size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-neutral-900/80 dark:text-neutral-100/80" />
        </button>
        {f&&<ul ref={D} id={_} role="listbox" tabIndex={-1} style={{maxHeight:y}} className={m("min-w-48 max-w-[min(480px,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[var(--rb-r-lg,10px)] border border-neutral-900/10 dark:border-neutral-100/14 bg-white dark:bg-neutral-900 p-1 text-neutral-900 dark:text-neutral-100 outline-none shadow-[0_12px_24px_-12px_rgb(0_0_0/0.2)] dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]","absolute z-30 max-h-[264px] w-full min-w-[100%]",j?"bottom-full mb-1.5":"top-full mt-1.5")}>
          {d.map((e,a)=>{
            let r=e.value===F;
            return (
              <li key={e.value} role="option" aria-selected={r} data-index={a} data-highlighted={a===v?"":undefined} onMouseEnter={()=>w(a)} onClick={()=>I(a)} className={m("relative flex min-h-8 w-full cursor-default items-center gap-2 rounded-[var(--rb-r-sm,6px)] px-2 py-1.5 text-left text-[14px]/[16px] font-[450] text-neutral-900 outline-none select-none [&_svg]:shrink-0 [&_svg]:text-neutral-900/80 hover:bg-neutral-900/5 focus-visible:bg-neutral-900/5 data-[highlighted]:bg-neutral-900/5 aria-selected:bg-neutral-900/9 aria-disabled:cursor-not-allowed aria-disabled:text-neutral-900/40 dark:text-neutral-100 dark:[&_svg]:text-neutral-100/80 dark:hover:bg-neutral-100/5 dark:focus-visible:bg-neutral-100/5 dark:data-[highlighted]:bg-neutral-100/5 dark:aria-selected:bg-neutral-100/9 dark:aria-disabled:text-neutral-100/40","pe-8")}>
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate">{e.label}</span>
                          {e.hint&&<span className={m(S,g,"shrink-0")}>{e.hint}</span>}
                        </span>
                        {r&&<HugeiconsIcon icon={Icon_90987} size={16} strokeWidth={1.8} aria-hidden="true" className="pointer-events-none absolute end-2" />}
                      </li>
            );
          })}
        </ul>}
      </div>
  );
}

let I = [{value:"talk",label:"Conference talk",blurb:"Single speaker, main stage",icon:Icon_61020,minutes:30},{value:"workshop",label:"Hands-on workshop",blurb:"Laptops required, capped room",icon:Icon_88366,minutes:90},{value:"lightning",label:"Lightning slot",blurb:"Back-to-back, no questions",icon:Icon_68686,minutes:10}],
  q = ["Instrumentation","Field robotics","Signal processing","Open hardware"],
  H = [{id:"hdmi",label:"HDMI capture from my own laptop"},{id:"audio",label:"Audio playback through the house system"},{id:"bench",label:"Bench space for hardware demonstration"},{id:"captions",label:"Live captioning"}];

function R({children:e,htmlFor:a,optional:r}){
  return (
    <label htmlFor={a} className="flex items-center justify-between gap-2">
        <span className="flex w-fit items-center gap-2 text-[14px]/[16px] font-[450] text-neutral-900 dark:text-neutral-100">{e}</span>
        {r&&<span className="text-[13px]/[18px] font-normal text-neutral-900/66 dark:text-neutral-100/66">Optional</span>}
      </label>
  );
}

function B({children:e}){
  return e?<p className="flex items-start gap-2 text-[13px]/[18px] text-[oklch(51%_0.18_26)] dark:text-[oklch(76%_0.14_26)]">
    <HugeiconsIcon icon={Icon_27476} size={16} strokeWidth={1.8} aria-hidden="true" className="mt-px shrink-0" />
    {e}
  </p>:null;
}

function O({title:e,description:a,children:r}){
  return (
    <section className={m(F,"overflow-visible p-5")}>
        <h3 className={M}>{e}</h3>
        <p className={m(T,"mt-0.5")}>{a}</p>
        <div className="mt-4 flex flex-col gap-6">{r}</div>
      </section>
  );
}

function $(){
  let[e,a]=useState(false),[r,s]=useState(false),[o,d]=useState(""),[c,u]=useState(""),[$,P]=useState("talk"),[U,Y]=useState(q[0]),[G,K]=useState("intermediate"),[V,J]=useState(""),[Q,X]=useState(""),[Z,ee]=useState(""),[ea,er]=useState(["hdmi"]),[et,el]=useState(false),en=I.find(e=>e.value===$)??I[0],es=useMemo(()=>{
    let e={};
    return o.trim().length<8&&(e.title="Give the session a title of at least 8 characters."),c.trim().length<120?e.abstract=`Abstracts need at least 120 characters. You have ${c.trim().length}.`:c.length>600&&(e.abstract=`Trim ${c.length-600} characters to fit the limit.`),/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(Q.trim())||(e.email="Enter an address the programme committee can reply to."),et||(e.consent="Recording consent is required to submit."),e;
  }, [o,c,Q,et]),ei=[{label:"Session title",done:!es.title},{label:"Abstract",done:!es.abstract},{label:"Contact address",done:!es.email},{label:"Recording consent",done:et}],eo=ei.filter(e=>e.done).length,ed=600-c.length,ec=ed<0,eu=e=>r?es[e]:undefined;
  return e?<div className={m(_,k,"flex h-full min-h-[1280px] w-full flex-col items-center justify-center-safe overflow-y-auto p-6 sm:p-8")}>
    <div className={m(F,"w-full max-w-[420px] p-8 text-center")}>
      <span className="mx-auto flex h-12 w-12 items-center justify-center">
        <HugeiconsIcon icon={Icon_90987} size={24} strokeWidth={1.8} aria-hidden="true" className={v} />
      </span>
      <h2 className={m(y,k,"mt-4")}>Proposal received</h2>
      <p className={m(N,v,"mt-1")}>
        “
        {o.trim()}
        {"” is queued for the "}
        {U.toLowerCase()}
        {" "}
        {"track. The committee replies to "}
        {Q.trim()}
        {" by 14 March."}
      </p>
      <button type="button" onClick={()=>a(false)} className={m("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] border border-neutral-900/12 bg-white text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] hover:not-disabled:border-neutral-900/32 hover:not-disabled:bg-linear-to-b hover:not-disabled:from-neutral-900/3 hover:not-disabled:to-neutral-900/3 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:hover:not-disabled:border-neutral-100/32 dark:hover:not-disabled:from-neutral-100/3 dark:hover:not-disabled:to-neutral-100/3 dark:active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.4)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40",C,"mt-5 w-full")}>Edit this proposal</button>
    </div>
  </div>:<div className={m(_,k,"flex h-full min-h-[800px] w-full flex-col justify-center-safe overflow-y-auto p-6 sm:p-8")}>
    <div className="mx-auto w-full max-w-[1100px]">
      <div className="mb-5">
        <h2 className={m("text-[16px]/[20px] font-[450] tracking-[-0.015em]",k)}>Submit a session</h2>
        <p className={m(N,g,"mt-0.5")}>Proposals for the autumn instrumentation symposium close on 28 February.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <O title="The session" description="What attendees will see on the schedule.">
            <div className="flex flex-col gap-2">
              <R htmlFor="f2-title">Session title</R>
              <div className={m(z,"h-8")}>
                <input id="f2-title" value={o} onChange={e=>d(e.target.value)} placeholder="Calibrating low-cost sensors in the field" aria-invalid={!!eu("title")} className={A} />
              </div>
              <B>{eu("title")}</B>
            </div>
            <div className="flex flex-col gap-2">
              <R htmlFor="f2-abstract">Abstract</R>
              <textarea id="f2-abstract" rows={5} value={c} onChange={e=>u(e.target.value)} placeholder="Describe the problem, what you did, and what an attendee will be able to do afterwards." aria-invalid={!!eu("abstract")} className={m("block max-h-[256px] min-h-[76px] w-full min-w-48 resize-none rounded-[var(--rb-r-sm,6px)] border border-neutral-900/12 bg-white px-3 py-2 text-[14px]/[20px] font-[450] text-neutral-900 shadow-[0_1px_2px_-1px_rgb(0_0_0/0.12)] outline-none field-sizing-content transition-[border-color,box-shadow,background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] placeholder:text-neutral-900/66 hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-900/32 focus-visible:border-[var(--rb-accent,oklch(20.5%_0_0))] focus-visible:ring-3 focus-visible:ring-neutral-900/8 aria-invalid:border-[oklch(60%_0.236_26)] disabled:cursor-not-allowed disabled:border-neutral-900/8 disabled:text-neutral-900/40 disabled:shadow-none read-only:border-transparent read-only:bg-neutral-900/5 read-only:shadow-none dark:border-neutral-100/14 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_1px_2px_-1px_rgb(0_0_0/0.36)] dark:placeholder:text-neutral-100/66 dark:hover:not-focus-visible:not-aria-invalid:not-disabled:not-read-only:border-neutral-100/32 dark:focus-visible:border-[var(--rb-accent,oklch(100%_0_0))] dark:focus-visible:ring-neutral-100/8 dark:aria-invalid:border-[oklch(65.2%_0.219_26)] dark:disabled:border-neutral-100/8 dark:disabled:text-neutral-100/40 dark:read-only:bg-neutral-100/5","min-h-[118px]")} />
              <div className="flex items-start justify-between gap-3">
                <B>{eu("abstract")}</B>
                <span className={m(S,ec?j:g,"ml-auto shrink-0")}>
                  {ed}
                  {" left"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <R>Format</R>
              <div role="radiogroup" aria-label="Session format" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {I.map(e=>{
                  let a=$===e.value;
                  return (
                    <button key={e.value} type="button" role="radio" aria-checked={a} onClick={()=>P(e.value)} className={m(F,"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))]","cursor-pointer text-left")}>
                                        <span className={m(a?"bg-neutral-900/9 dark:bg-neutral-100/9":"hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5","transition-[color,background-color,border-color,box-shadow,outline-color,opacity,scale] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:duration-[60ms]","flex flex-1 flex-col items-start gap-2 p-3")}>
                                          <HugeiconsIcon icon={e.icon} size={16} strokeWidth={1.8} aria-hidden="true" className={v} />
                                          <span className={m(y,k)}>{e.label}</span>
                                          <span className={m(N,v)}>{e.blurb}</span>
                                        </span>
                                      </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <R htmlFor="f2-track">Track</R>
                <L id="f2-track" value={U} onChange={Y} options={q.map(e=>({value:e,label:e}))} />
              </div>
              <div className="flex flex-col gap-2">
                <R htmlFor="f2-level">Audience level</R>
                <L id="f2-level" value={G} onChange={K} options={[{value:"introductory",label:"Introductory"},{value:"intermediate",label:"Intermediate"},{value:"advanced",label:"Advanced"}]} />
              </div>
            </div>
          </O>
          <O title="Speaker" description="Used for scheduling and the printed programme.">
            <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <R htmlFor="f2-speaker">Name as printed</R>
                <div className={m(z,"h-8")}>
                  <input id="f2-speaker" value={V} onChange={e=>J(e.target.value)} placeholder="Marta Enríquez" className={A} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <R htmlFor="f2-email">Contact address</R>
                <div className={m(z,"h-8")}>
                  <input id="f2-email" type="email" value={Q} onChange={e=>X(e.target.value)} placeholder="you@institute.org" aria-invalid={!!eu("email")} className={A} />
                </div>
                <B>{eu("email")}</B>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <R htmlFor="f2-affiliation" optional>Affiliation</R>
              <div className={m(z,"h-8")}>
                <input id="f2-affiliation" value={Z} onChange={e=>ee(e.target.value)} placeholder="Department, lab or company" className={A} />
              </div>
            </div>
          </O>
          <O title="Room requirements" description="Tell the venue team what the session needs on the day.">
            <div className={m(w,"-mx-2 flex flex-col")}>
              {H.map(e=>{
                let a=ea.includes(e.id);
                return (
                  <div key={e.id}>
                                    <label className={m("relative flex min-h-10 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] has-[[data-description]]:min-h-14","cursor-pointer hover:bg-neutral-900/5 dark:hover:bg-neutral-100/5 active:bg-neutral-900/8 dark:active:bg-neutral-100/8",f,"px-2")}>
                                      <span className={E}>
                                        <input type="checkbox" checked={a} onChange={()=>{
                                          let a;
                                          return a=e.id,er(e=>e.includes(a)?e.filter(e=>e!==a):[...e,a]);
                                        }} className={D} />
                                        <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={W} />
                                      </span>
                                      <span className={m(N,v)}>{e.label}</span>
                                    </label>
                                  </div>
                );
              })}
            </div>
          </O>
        </div>
        <aside className="space-y-4">
          <div className={m(F,"p-5")}>
            <h3 className={M}>Before you submit</h3>
            <p className={m(T,"mt-0.5")}>
              {eo}
              {" of "}
              {ei.length}
              {" ready"}
            </p>
            <div className={m(w,"mt-3 flex flex-col")}>
              {ei.map(e=>(
                <div key={e.label} className="relative flex min-h-8 w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-left text-neutral-900 dark:text-neutral-100 transition-[background-color] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]">
                                <HugeiconsIcon icon={e.done?Icon_94089:Icon_94936} size={16} strokeWidth={1.8} aria-hidden="true" className={m(e.done?k:g,"shrink-0")} />
                                <span className={m(N,e.done?k:g)}>{e.label}</span>
                              </div>
              ))}
            </div>
            <div className={m("bg-neutral-900/5 dark:bg-neutral-100/5",f,"mt-4 flex items-center gap-2 px-3 py-2.5")}>
              <HugeiconsIcon icon={Icon_29635} size={16} strokeWidth={1.8} aria-hidden="true" className={m(g,"shrink-0")} />
              <span className={m(N,v)}>
                {en.label}
                {" runs "}
                {en.minutes}
                {" minutes"}
              </span>
            </div>
          </div>
          <div className={m(F,"p-5")}>
            <div className="flex flex-col gap-2">
              <label className="flex cursor-pointer items-start gap-2">
                <span className={m(E,"mt-px")}>
                  <input type="checkbox" checked={et} onChange={()=>el(e=>!e)} aria-invalid={!!eu("consent")} className={D} />
                  <HugeiconsIcon icon={Icon_90987} size={12} strokeWidth={2.5} aria-hidden="true" className={W} />
                </span>
                <span className={m(N,v)}>I agree to the session being recorded and published to the archive.</span>
              </label>
              <B>{eu("consent")}</B>
            </div>
            <button type="button" onClick={()=>{
              Object.keys(es).length?s(true):a(true)
            }} className={m("relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap select-none transition-[color,background-color,border-color,box-shadow,outline-color,scale,filter] duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] active:duration-[60ms] motion-reduce:active:scale-100 disabled:cursor-not-allowed aria-busy:cursor-progress focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rb-accent,oklch(20.5%_0_0))] dark:focus-visible:outline-[var(--rb-accent,oklch(100%_0_0))] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_94%,black))] text-[var(--rb-accent-fg,oklch(100%_0_0))] shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.22),0_2px_5px_-2px_rgb(0_0_0/0.3)] hover:not-disabled:brightness-110 active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(20.5%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] disabled:opacity-40 disabled:shadow-none dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_84%,white),color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_94%,black))] dark:text-[var(--rb-accent-fg,oklch(20.5%_0_0))] dark:shadow-[inset_0_2px_0_-1px_rgb(255_255_255/0.2),inset_0_-2px_0_-1px_rgb(0_0_0/0.3),inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),0_1px_1px_rgb(0_0_0/0.66),0_2px_5px_-2px_rgb(0_0_0/0.9)] dark:active:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rb-accent,oklch(100%_0_0))_88%,black),inset_0_1px_2px_rgb(0_0_0/0.42)] dark:disabled:shadow-none",C,"mt-4 w-full")}>
              <HugeiconsIcon icon={Icon_55410} size={16} strokeWidth={1.8} aria-hidden="true" />
              Submit proposal
            </button>
            {r&&Object.keys(es).length>0&&<p className={m(N,j,"mt-2 text-center")}>
              {Object.keys(es).length}
              {" item"}
              {Object.keys(es).length>1?"s":""}
              {" still need attention."}
            </p>}
          </div>
        </aside>
      </div>
    </div>
  </div>;
}


export default $;
